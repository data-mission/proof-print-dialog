/* ═══════════════════════════════════════════════════════════════════
 * PROOF — shared document model
 *
 * This is the SAME job rendered by /Users/vlad/repos/cursor-2/proof/index.html,
 * loading /Users/vlad/repos/cursor-2/proof/sample-document.js and paginating it
 * for real (real DOM, real page-box heights — no hardcoded page array on
 * that side either). The MCP server imports this module so its tool
 * results and the web UI can never quietly drift apart.
 *
 * INK MEASUREMENT — WHY THIS IS HARDCODED DATA, NOT A FORMULA
 * The browser UI measures ink by walking every text node of each
 * finished, laid-out page, asking the layout engine for the actual
 * glyph-run rectangles (Range.getClientRects()), and summing their
 * area against the page box, weighted by measured glyph density
 * (see index.html's `inkMeasured()`: GLYPH_DENSITY=0.16,
 * WEIGHT_BOOST=0.055/100 over weight 400). That pipeline needs a real
 * browser layout engine and does not exist in a plain Node/stdio
 * process — there is no equivalent formula to port this time (unlike
 * the previous 12-page build, whose estimate was a simple block-count
 * formula that WAS portable). So this module hardcodes the actual
 * numbers the browser produced, captured directly by driving the live
 * page in Chromium via Playwright and reading `PAGES` after
 * `measuredAll === true`:
 *
 *   > navigate to index.html, wait for window.measuredAll === true,
 *   > read PAGES.map(p => ({ n, ink: p.ink, waste, reason, text }))
 *
 * Observed: measuredAll=true, "241 glyph runs across 15 pages",
 * pages_total=15, keep=10, dropped=5, mean ink 3%, cost avoided $0.06 —
 * all cross-checked against the page's own #vA/#vB/#stInk/#stCost DOM
 * output, not just the in-memory PAGES array.
 *
 * This is disclosed, not hidden: method is reported as
 * "measured_in_browser_layout" with a note, never passed off as a
 * live Node-side measurement it cannot actually perform.
 * ═══════════════════════════════════════════════════════════════════ */

export const DOCUMENT_ID = 'Q3_Operating_Review_FINAL_v4.docx';
export const DOCUMENT_TITLE = 'Northgate Holdings — Q3 Operating Review';
export const WASTE_THRESHOLD_PCT = 2.0; // % ink coverage below which a sheet MAY be waste (see classifier note)
export const INK_METHOD = 'measured_in_browser_layout';
export const INK_METHOD_NOTE =
  'Figures were produced by the browser layout engine (Range.getClientRects() glyph-run measurement in index.html) and are mirrored here as data, not recomputed by this server.';
export const GLYPH_RUNS_TOTAL = 241; // as reported by index.html's #methodTxt at capture time

/* ── COST BASIS — shared constants with index.html, not reinvented ───
 * These are the literal COST_SHEET / COST_INK_PT constants defined in
 * /Users/vlad/repos/cursor-2/proof/index.html. Copied here (not
 * re-derived) so the app and this server always quote the same money.
 * Formula (also index.html's, verbatim): cost per sheet =
 *   COST_SHEET_USD + ink_pct * COST_INK_PT_USD
 * Note ink_pct is used as its raw percentage number (e.g. 6.92), not
 * divided by 100 — that is how index.html's paint() computes it, and
 * this mirrors it exactly rather than "fixing" it into a different
 * number than the UI shows. */
export const COST_SHEET_USD = 0.012;   // $/sheet, 20lb bond, bulk
export const COST_INK_PT_USD = 0.0009; // $/percentage-point of ink coverage per sheet

/* Waste classification codes the app's classify() can produce.
 * Only orphaned_footer / break_artefact / intentionally_blank fire
 * for this document instance; page_number_only and low_coverage are
 * real codes in index.html's classifier that simply don't happen to
 * match any page in this particular job (page 13's lone "14" has no
 * literal "page" text, so it falls into the generic short-orphan
 * branch and is classified orphaned_footer, not page_number_only —
 * confirmed against the live page, not assumed). */
export const REASON_CODES = [
  'orphaned_footer',
  'break_artefact',
  'intentionally_blank',
  'page_number_only',
  'low_coverage',
];

/* Every page, as measured. `text` is the page's full rendered text
 * content (whitespace-collapsed), captured live — used to build a
 * preview, never re-typeset. */
const PAGES_DATA = [
  { n: 1, ink: 2.05, reason: null,
    text: "Confidential — Prepared for the Board of Directors Northgate Holdings Q3 Operating Review Fiscal Third Quarter Ended September 30, 2026 Prepared for the Board of Directors Northgate Holdings, Inc. Denver, Colorado October 14, 2026" },
  { n: 2, ink: 1.03, reason: null,
    text: "Table of Contents 1. Executive Summary3 2. Financial Performance5 3. Operations & Supply Chain8 4. Headcount & Talent10 5. Outlook & Risk Factors13 6. Signature & Approvals14 Appendix A: Headcount by Location15" },
  { n: 3, ink: 6.92, reason: null,
    text: "Section One Executive Summary Northgate Holdings delivered consolidated revenue of $184.6 million in the third quarter of fiscal 2026, an increase of 12.0% over the $164.8 million reported in the prior-year quarter." },
  { n: 4, ink: 0.11, reason: { code: 'orphaned_footer', detail: 'A copyright line that broke away from the page it belonged to.' },
    text: "© 2026 Northgate Holdings, Inc. All rights reserved." },
  { n: 5, ink: 6.43, reason: null,
    text: "Section Two Financial Performance Consolidated revenue for the third quarter was $184.6 million, up 12.0% from $164.8 million in the prior-year quarter. Table 1. Revenue by reportable segment." },
  { n: 6, ink: 0.05, reason: { code: 'break_artefact', detail: 'A continuation marker that overflowed onto its own sheet.' },
    text: "— continued —" },
  { n: 7, ink: 1.95, reason: null,
    text: "Segment revenue trend The chart below sets out quarterly segment revenue against the prior-year comparable period. Figure 1. Revenue by segment — Q3 2026 vs. Q3 2025 ($ in millions)" },
  { n: 8, ink: 6.46, reason: null,
    text: "Section Three Operations & Supply Chain The Calgary distribution center is the largest single facility investment Northgate has made since the Memphis expansion in fiscal 2022." },
  { n: 9, ink: 0.10, reason: { code: 'intentionally_blank', detail: '"This page intentionally left blank." The sheet exists to say it is empty.' },
    text: "This page intentionally left blank." },
  { n: 10, ink: 6.43, reason: null,
    text: "Section Four Headcount & Talent Total headcount at quarter end was 3,412, an increase of 222 from 3,190 in the prior-year quarter." },
  { n: 11, ink: 0.06, reason: { code: 'orphaned_footer', detail: 'A single trailing line of furniture — a footer that overflowed.' },
    text: "Terms and conditions apply." },
  { n: 12, ink: 5.46, reason: null,
    text: "Section Five Outlook & Risk Factors “Calgary is the clearest proof point we have that this operating model travels.” — Miriam Castellano, Chief Executive Officer, third-quarter earnings call" },
  { n: 13, ink: 0.01, reason: { code: 'orphaned_footer', detail: 'A single trailing line of furniture — a footer that overflowed.' },
    text: "14" },
  { n: 14, ink: 1.97, reason: null,
    text: "Section Six Signature & Approvals The undersigned certify that this operating review has been prepared in accordance with Northgate Holdings' internal reporting standards." },
  { n: 15, ink: 5.46, reason: null,
    text: "Appendix A Headcount by Location The table below supplements Section 4 with a full breakdown of quarter-end headcount by primary work location, including the Calgary facility discussed throughout this review." },
];

function preview(text, max = 100) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

/* Build the full, computed page list. `waste` is derived from having a
 * reason (the app's isWaste()/classify() already decided this — a
 * sparse-but-structured page like the title page or TOC is correctly
 * NOT waste even though its coverage is also under threshold). */
export function getPages() {
  return PAGES_DATA.map((p) => ({
    page: p.n,
    ink_pct: p.ink,
    waste: p.reason !== null,
    reason: p.reason ? p.reason.code : null,
    reason_detail: p.reason ? p.reason.detail : null,
    preview: preview(p.text),
  }));
}

export function getWastePages() {
  return getPages()
    .filter((p) => p.waste)
    .map((p) => ({ page: p.page, ink: p.ink_pct, reason: p.reason }));
}

export function pageCostUsd(inkPct) {
  return COST_SHEET_USD + inkPct * COST_INK_PT_USD;
}

/* doc identifier is accepted for API shape/future-multi-doc-support,
 * but this build has exactly one loaded document — mirroring
 * index.html, which also loads a single sample document. Any
 * identifier resolves to it. */
export function resolveDocument(_docId) {
  return DOCUMENT_ID;
}
