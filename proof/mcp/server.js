#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
 * PROOF MCP server
 *
 * Exposes the same measurement PROOF's web UI shows a human — ink
 * coverage, fill, and the waste verdict for every page of a print job —
 * as MCP tools, so an agent can proof a document before a single sheet
 * moves. Data model lives in ./document.js and is the single source of
 * truth shared with the (future) rest of the project.
 *
 * Transport: stdio (the standard local-process MCP transport).
 * ═══════════════════════════════════════════════════════════════════ */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  DOCUMENT_ID,
  DOCUMENT_TITLE,
  WASTE_THRESHOLD_PCT,
  INK_METHOD,
  INK_METHOD_NOTE,
  GLYPH_RUNS_TOTAL,
  COST_SHEET_USD,
  COST_INK_PT_USD,
  getPages,
  getWastePages,
  pageCostUsd,
  resolveDocument,
} from './document.js';

const server = new McpServer({
  name: 'proof',
  version: '1.0.0',
  title: 'PROOF — print job measurement',
});

function jsonResult(payload) {
  return { content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }] };
}

function meanInk(pages) {
  if (pages.length === 0) return 0;
  return +(pages.reduce((a, p) => a + (p.ink_pct ?? p.ink), 0) / pages.length).toFixed(2);
}

/* ── proof ──────────────────────────────────────────────────────────
 * Every page of the document, with its measured ink coverage, waste
 * flag, and (for waste pages) the reason it was flagged. */
server.registerTool(
  'proof',
  {
    title: 'Proof a document',
    description:
      "Measure every page of a document before printing it: ink coverage %, whether it's waste (an orphaned footer, a break artefact, an intentionally-blank notice, or a lone page number), and a short content preview.",
    inputSchema: {
      doc: z.string().describe('Document identifier or filename to proof (e.g. "Q3_Operating_Review_FINAL_v4.docx").'),
    },
  },
  async ({ doc }) => {
    const docId = resolveDocument(doc);
    const pages = getPages();
    return jsonResult({
      doc: docId,
      title: DOCUMENT_TITLE,
      pages_total: pages.length,
      threshold_pct: WASTE_THRESHOLD_PCT,
      method: INK_METHOD,
      method_note: INK_METHOD_NOTE,
      pages,
    });
  },
);

/* ── waste_report ──────────────────────────────────────────────────
 * Only the flagged pages, each with the reason it was flagged. */
server.registerTool(
  'waste_report',
  {
    title: 'Waste report',
    description:
      'Return only the pages flagged as waste for a document, each with its measured ink coverage and the reason it is waste (orphaned_footer, break_artefact, intentionally_blank, or page_number_only).',
    inputSchema: {
      doc: z.string().describe('Document identifier or filename to check.'),
    },
  },
  async ({ doc }) => {
    const docId = resolveDocument(doc);
    const pages = getPages();
    const flagged = getWastePages();
    return jsonResult({
      doc: docId,
      pages_total: pages.length,
      pages_printing: pages.length - flagged.length,
      threshold_pct: WASTE_THRESHOLD_PCT,
      method: INK_METHOD,
      method_note: INK_METHOD_NOTE,
      glyph_runs_measured: GLYPH_RUNS_TOTAL,
      flagged,
    });
  },
);

/* ── drop_pages ────────────────────────────────────────────────────
 * Take explicit page numbers to drop and return the remaining job: the
 * pages that will actually print, the new total, and sheets saved. */
server.registerTool(
  'drop_pages',
  {
    title: 'Drop pages from the job',
    description:
      'Remove the given page numbers from a document and return the remaining job: the pages that will actually print, the new page total, and how many sheets were saved. Pages are removed, not reflowed — surviving pages keep their original content.',
    inputSchema: {
      doc: z.string().describe('Document identifier or filename.'),
      pages: z
        .array(z.number().int().positive())
        .min(1)
        .describe('Page numbers to drop from the print job, e.g. [4, 6, 9, 11, 13].'),
    },
  },
  async ({ doc, pages: dropPages }) => {
    const docId = resolveDocument(doc);
    const all = getPages();
    const dropSet = new Set(dropPages);

    const unknown = dropPages.filter((n) => !all.some((p) => p.page === n));
    const dropped = all.filter((p) => dropSet.has(p.page));
    const printing = all.filter((p) => !dropSet.has(p.page));

    return jsonResult({
      doc: docId,
      pages_total_before: all.length,
      pages_total_after: printing.length,
      sheets_saved: all.length - printing.length,
      dropped: dropped.map((p) => ({ page: p.page, ink: p.ink_pct, reason: p.reason })),
      pages_printing: printing.map((p) => p.page),
      unknown_pages: unknown.length ? unknown : undefined,
    });
  },
);

/* ── ink_cost ──────────────────────────────────────────────────────
 * Sheets, mean coverage, and cost for the job as-is versus as-proposed
 * (defaults to dropping the flagged waste pages if none are given). */
server.registerTool(
  'ink_cost',
  {
    title: 'Ink and paper cost',
    description:
      'Compute sheets, mean ink coverage, and cost for a document as it stands versus as proposed (dropping the given page numbers, or the flagged waste pages by default).',
    inputSchema: {
      doc: z.string().describe('Document identifier or filename.'),
      drop_pages: z
        .array(z.number().int().positive())
        .optional()
        .describe('Page numbers to drop for the "as-proposed" side. Defaults to the waste-flagged pages.'),
    },
  },
  async ({ doc, drop_pages }) => {
    const docId = resolveDocument(doc);
    const all = getPages();
    const dropSet = new Set(drop_pages && drop_pages.length ? drop_pages : all.filter((p) => p.waste).map((p) => p.page));
    const proposed = all.filter((p) => !dropSet.has(p.page));

    const summarize = (pages) => ({
      sheets: pages.length,
      mean_ink_pct: meanInk(pages),
      cost_usd: +pages.reduce((a, p) => a + pageCostUsd(p.ink_pct), 0).toFixed(4),
    });

    const as_is = summarize(all);
    const as_proposed = summarize(proposed);

    return jsonResult({
      doc: docId,
      cost_basis: {
        cost_per_sheet_usd: COST_SHEET_USD,
        cost_per_ink_point_usd: COST_INK_PT_USD,
        formula: 'cost_per_sheet_usd + ink_pct * cost_per_ink_point_usd, summed per sheet',
        note: 'Shared constants with index.html\'s COST_SHEET / COST_INK_PT — this server quotes the same money the UI does, not an independently invented figure.',
      },
      as_is,
      as_proposed,
      sheets_saved: as_is.sheets - as_proposed.sheets,
      cost_saved_usd: +(as_is.cost_usd - as_proposed.cost_usd).toFixed(4),
    });
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`[proof-mcp] running over stdio · document "${DOCUMENT_ID}" loaded`);
