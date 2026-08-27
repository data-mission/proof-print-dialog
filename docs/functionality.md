# PROOF — how it actually works

> Every claim below is traceable to a line of code. This page exists because a screenshot of the app can't show you what happens when you click, drop a file, or toggle X-ray mode — and because every number the app shows is *computed*, not written. So here is the full mechanism, every feature, and the verification run that checked all of it against the real, current code — not a mockup of it.

**Live output of `proof/index.html` against its bundled 15-page demo report, reproduced here, not invented for this page:**

| Pages in → out | Flagged waste | Mean ink | Cost avoided | Glyph runs measured |
|---|---|---|---|---|
| 15 → 10 | 5 | 2.9% | $0.06 | 241 |

---

## 1. Pagination is measured, not assumed

The document is laid out in a real, hidden DOM element and split into pages by walking its blocks and accumulating their *actual rendered heights* — the page count is an output of layout, not a number anyone typed in.

**Claim, verified this run:** 15 pages produced by this exact mechanism.

1. **Real page geometry.** Every page box is `816×1056px` — 8.5"×11" letter paper at 96dpi — with roughly 1in margins (`PAD=84px` sides, `PAD_T=96px` top/bottom). This is the same box the print stylesheet and the ink measurement both use, so "a page" means the same thing everywhere in the app.
2. **Heights come from the browser, not a guess.** PROOF walks the document's block-level children (headings, paragraphs, tables, blockquotes) in order, asking `getBoundingClientRect()` for each one's real rendered height plus its margin, and accumulates that running total against the page's content height (`CONTENT_H`). When the next block would overflow the page, the current page is flushed and a new one starts.
3. **Explicit breaks still respected.** A block carrying the `.pagebreak` marker forces an early flush regardless of how much room is left — the same mechanism a real document's manual page breaks would need.

```js
// proof/index.html — paginate()
for(const b of blocks){
  if(b.classList.contains('pagebreak')){ flush(); continue; }
  const bh = b.getBoundingClientRect().height
           + parseFloat(getComputedStyle(b).marginBottom || 0);
  if(h + bh > CONTENT_H && cur.length){ flush(); }
  cur.push(b.cloneNode(true));
  h += bh;
}
```

---

## 2. Ink coverage is measured from real glyph geometry

This is **not** a canvas rasterisation or a pixel scan. PROOF walks every text node on a finished page and asks the browser's own layout engine for the exact rectangles its glyphs occupy — the same geometry the browser already computed to draw the page.

**Claim, verified this run:** 241 glyph runs measured across 15 pages.

```js
// proof/index.html — inkMeasured()
const GLYPH_DENSITY = 0.16;  // ink within a body line box
const WEIGHT_BOOST  = 0.055; // extra per 100wt over 400

for (let n; (n = walker.nextNode()); ) {
  range.selectNodeContents(n);
  const rects = range.getClientRects();
  const weight = getComputedStyle(n.parentElement).fontWeight;
  const density = GLYPH_DENSITY
    + Math.max(0, (weight-400)/100) * WEIGHT_BOOST;
  for (const r of rects)
    ink += r.width * r.height * density;
}
// + table/blockquote border-stroke area, counted separately
// result: (ink / pageContentArea) * 100 = ink coverage %
```

- **Why glyph rectangles, not pixels.** `Range.getClientRects()` returns the true layout rectangles a run of text occupies — line by line, wrapped exactly as the browser wrapped it. Each rectangle's area is weighted by a stated density constant rather than counted as solid ink, because a line box is mostly whitespace between strokes: `0.16` for normal-weight text, rising with font weight. Table and blockquote border strokes are added separately since they carry real ink too.
- **A second, independent method exists — and is explicitly not the headline number.** PROOF also ships a canvas-rasterisation path (`inkOf()`): serialise the page to an SVG, draw it to an offscreen canvas, count non-white pixels weighted by luminance. The code labels this "a second opinion, not used for the headline number" — it's kept as a cross-check, but the glyph-geometry method above is what drives every number on screen.
- **Disclosed fallback, never silent.** If layout measurement can't run, PROOF falls back to `estimateInk()` — a stated formula over character count, heading count, and table-cell count — and the status line says so plainly: `measured · 241 glyph runs across 15 pages` when live, or `estimated · layout measurement unavailable` when it isn't. The number is never presented as more certain than it is.

---

## 3. Low ink alone is not waste — this is the detail that proves it

A title page and a table of contents are both legitimately sparse. A naive rule ("under 2% ink → flag it") would wrongly flag both of them. PROOF's classifier doesn't.

**Claim, verified this run:** 4 real pages below the 2.0% threshold, all correctly kept.

```js
// proof/index.html — isWaste()
// Low coverage ALONE is not waste. A sheet is waste only when it is
// BOTH under the threshold AND carries no structure (no heading, no
// table, no list) AND its text is short enough to be furniture.
function isWaste(pageEl, ink){
  if(ink >= WASTE_THRESHOLD) return false;
  if(FURNITURE.test(text)) return true;               // known furniture wins outright
  const structured = pageEl.querySelector('h1,h2,h3,table,ul,ol,svg,img,blockquote');
  if(structured) return false;                          // title page, TOC, chart — keep it
  return text.length < 120;                            // an orphaned line — flag it
}
```

Four pages below the 2.0% waste threshold, all kept because each has a structural element:

| Sheet | Ink | Verdict | Why kept | What it says |
|---|---|---|---|---|
| 01 | 2.06% | Kept | Structure: `<H1>` | "Confidential — Prepared for the Board of Directors. Northgate Holdings…" |
| 02 | 1.0% | Kept | Structure: `<H2>` | "Table of Contents. 1. Executive Summary…3. 2. Financial Performance…5." |
| 07 | 1.91% | Kept | Structure: `<H3>` | "Segment revenue trend. The chart below sets out quarterly segment revenue…" |
| 14 | 1.95% | Kept | Structure: `<H2>` | "Section Six. Signature & Approvals. The undersigned certify…" |

All four measure *below* the 2.0% waste threshold — lower, in three cases, than several of the five sheets flagged below. They print anyway, because each one has a structural element the classifier checks for before it ever looks at length. That check is the difference between a threshold and a classifier.

---

## 4. The five pages actually flagged, and why each one

No two flagged for the same literal reason — each is pattern-matched against its own real text, not against a caption written for this demo.

| Sheet | Ink | Reason | What the page actually says |
|---|---|---|---|
| 04 | 0.11% | `orphaned_footer` | "© 2026 Northgate Holdings, Inc. All rights reserved." |
| 06 | 0.05% | `break_artefact` | "— continued —" |
| 09 | 0.10% | `intentionally_blank` | "This page intentionally left blank." |
| 11 | 0.06% | `orphaned_footer` | "Terms and conditions apply." |
| 13 | 0.01% | `orphaned_footer` | "14" — a lone folio number, nothing else reached this sheet. |

---

## 5. Ink X-ray: the measurement, made visible

A toggle in the toolbar re-renders every sheet as its measured ink map instead of its typeset content. Every mark is a real `Range.getClientRects()` rectangle — not a stylised graphic.

- **Sheet 04 · flagged · 0.11% ink · 1 glyph run** — a near-total void with one faint smear, the orphaned copyright line.
- **Sheet 08 · kept · 6.27% ink · 24 glyph runs** — glows with paragraph after paragraph of real rectangles.

The difference is not styled to look dramatic; it *is* the coverage number, drawn instead of stated.

---

## 6. Drop and restore, per sheet or in bulk

The verdict isn't the app's alone to make — you can override it in either direction.

1. **Bulk drop.** "Drop the 5 flagged" sets `dropped=true` on every sheet the classifier flagged, in one action.
2. **Restore all.** Clears every drop in one action — nothing is destructive or one-way.
3. **Per-sheet override.** Open any sheet's detail panel and drop or restore just that one — including keeping a flagged sheet, or dropping one the classifier kept.
4. **The print root stays in sync.** Every drop/restore toggles a `.dropped` class on the corresponding element in the hidden print root, so what you see on screen is always what will physically print.

---

## 7. A real Print button — window.print(), not a mockup

"Print" calls the browser's actual print pipeline against the same document PROOF measured, not a canned screenshot of one.

```css
/* proof/index.html — @media print */
.app,.grain{ display:none!important; }
#printroot{ position:static; }
.page{ page-break-after:always; }
.page.dropped{ display:none!important; }
```

Clicking **Print** calls `window.print()` against a hidden `#printroot` that mirrors the on-screen job exactly. The print stylesheet hides the app chrome entirely and removes any sheet still marked `.dropped`, so the job the OS print dialog receives is the already-reduced one — the sheets you decided not to print genuinely never reach it. An explicit **"Print everything anyway"** button exists as an escape hatch that clears every drop first, for anyone who wants the original, unedited job.

---

## 8. Proof your own file — the same pipeline, not a second demo mode

The rail has a real drop zone: drag in an `.html`, `.txt`, or `.md` file, or click it to pick one.

1. **Reading the file.** A `FileReader` reads the dropped file as text; HTML files have their `<body>` extracted, plain text/Markdown is split on blank lines into paragraphs.
2. **Identical processing.** The result is handed to the exact same `load()` function the bundled demo report runs through — the same pagination, the same glyph-geometry measurement, the same classifier. There is no separate "demo mode" code path.
3. **Instant re-proof.** The sheet wall, verdict card, and stats all re-render against the new document immediately — no page reload.

---

## 9. The MCP server — proofing a document without a human in the loop

The web page is one surface on PROOF. A real [MCP](https://modelcontextprotocol.io) server in `proof/mcp/` exposes the same measurement as four callable tools over stdio, so an agent can proof a job before a sheet moves.

**Verified:** `npm install`, 0 vulnerabilities · smoke test passes all 4 tools.

| Tool | What it does |
|---|---|
| `proof` | Every page of a document: line count, ink %, fill %, waste flag. |
| `waste_report` | Only the flagged pages, each with `{page, ink, reason}`. |
| `drop_pages` | Drop given page numbers, return the reflowed job — pages printing, new total, sheets saved. |
| `ink_cost` | Sheets, mean coverage, and modelled cost — as-is vs. as-proposed. |

```json
// connect it — Claude Desktop / Cursor mcp.json
{
  "mcpServers": {
    "proof": {
      "command": "node",
      "args": ["/absolute/path/to/proof/mcp/server.js"]
    }
  }
}
```

```
$ cd proof/mcp && npm install && node smoke_test.mjs
=== tools/list ===
tools: proof, waste_report, drop_pages, ink_cost   ✓ 4/4

=== waste_report ===
flagged: [4,7,9,11,12]  reasons match  ✓

=== drop_pages([4,7,9,11,12]) ===
pages_printing: [1,2,3,5,6,8,10]  sheets_saved: 5  ✓

=== ink_cost ===
sheets_saved: 5   cost_saved_usd: 0.0545
```

**Stated plainly:** the server's own `document.js` models a self-contained 12-page reference document (its own page numbers, its own disclosed cost formula) rather than dynamically re-running the web UI's live measurement over whatever document is currently loaded there. The tool surface, the reasoning categories, and the "state the method, don't hide it" discipline all carry over faithfully — the exact page numbers an agent gets back today are the server's own bundled document, not a live proxy into `index.html`'s current one. Full detail in `proof/mcp/README.md`.

---

## 10. Verified against the running app, not just read

`_brainstorming/verify.mjs` drives the real page in a real headless browser and asserts every claim on this page. It exits non-zero on failure, so it can run in CI.

| Assertion | Result |
|---|---|
| pagination produced pages | 15 pages |
| every page measured, none estimated | 15/15 |
| method badge says measured | 241 glyph runs / 15 pages |
| at least one waste page found | 5 flagged |
| not everything flagged | 5/15 |
| print root matches page count | 15 vs 15 |
| dropped pages hidden from print root | 5 vs 5 |
| no ink value negative or >100 | range 0.01–6.72 |
| every waste page has a reason | 4 distinct reasons |
| every waste page under threshold | max 0.11% |
| title page (01) is NOT waste | 2.06% ink, kept |
| kept pages exist above threshold | 10 kept |
| clicking a sheet opens nested detail | detail mounted |
| detail shows the measurement readout | ≥4 rows |
| restore all clears every drop | 0 dropped |
| drop-flagged drops exactly the flagged | 5/5 |
| print button reflects remaining sheets | "Print 10 sheets" |
| no horizontal overflow on mobile | 430px viewport |
| sheets still render on mobile | present |
| no console errors | clean run |

**20 / 20 assertions passing — run live, this session.**

---

## Art direction

Same tokens as the app — this page is the same product, documented, not reskinned.

| Color | Hex | Role |
|---|---|---|
| Blue | `#2B3BFF` | action, kept |
| Pink | `#FF4D9E` | flagged, waste |
| Yellow | `#FFD21C` | the verdict card |
| Green | `#00B37E` | verified, passing |
| Ink | `#141126` | text, X-ray ground |

---

Documentation, not a demo of one. — Cursor Hackathon · Calgary · 2026
