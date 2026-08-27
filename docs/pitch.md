# PROOF — the print dialog, reinvented

> PROOF paginates your document for real, measures the ink every page actually carries, and drops the sheets that are waste — before a page moves.

**Proof · this job**

| Pages in → out | You were about to print |
|---|---|
| 15 → 10 | 5 sheets of nothing |

| Mean ink | Cost avoided |
|---|---|
| 2.9% | $0.06 |

---

## 1. The App

# Print what you meant.

PROOF paginates your document for real, measures the ink every page actually carries, and drops the sheets that are waste — before a page moves.

---

## 2. The Problem

## You can't see a page at 104 pixels.

The print dialog shows a thumbnail smaller than an app icon, then sends every sheet to the tray. On a real 15-page document, that's how a title page, a table of contents, and five pages of pagination furniture all print looking identical.

**The old dialog:** Printer: HP LaserJet · Copies: 1 · Pages: All · Scale: 100%

✕ Page 1 of 15, at 104px wide. No measurement. No warning.

---

## 3. Before / After

## Same document. Same printer.

One asks you to trust a stamp-sized guess. The other is a real print dialog that did the work.

**Before:** Pages: All · Copies: 1 · Scale: 100% · "Print 15 pages"
✕ No measurement, no warning. Prints all fifteen — five of them waste.

**After:** Verdict card reads 15 → 10, "5 sheets of nothing." Sheet wall shows every page with waste sheets stamped.
✓ Every page legible, waste flagged with the measurement behind it.

---

## 4. How It Works

## Measured. Not rasterised.

Every text node's real glyph-run rectangles are read straight from the layout engine — `Range.getClientRects` — and summed against the page box, weighted by measured glyph density. It is not a screenshot. It's the same layout the browser will hand the printer.

**Method badge:** measured · 241 glyph runs across 15 pages

**Example detail — Sheet 04 of 15 · Flagged · waste · `orphaned_footer`**

Why this sheet is waste:
1. **It is furniture, not content.** A single trailing line — a footer that overflowed onto its own sheet.
2. **Below the ink threshold.** Measured coverage is 0.11% of the page area. Anything under 2.0% is a sheet spent on almost nothing.
3. **Dropping it changes nothing.** The content you meant to print is unaffected. Pagination reflows and the sheet never leaves the tray.

| Readout | Value |
|---|---|
| ink coverage | 0.11% |
| threshold | 2.0% |
| method | measured · glyph rectangles |
| page geometry | 8.5×11in @ 96dpi |

---

## 5. The Classifier

## Low ink isn't the whole rule.

A title page and a table of contents are both legitimately sparse — and both must print. PROOF only flags a sheet when it's under the threshold **and** carries no structure: no heading, no table, no list.

- **Table of contents · Keeping · 1.00% ink** — Under the 2.0% threshold on ink alone — but it carries a structured list, so it prints.
- **Title page · Keeping · 2.06% ink** — Sparse by design. Above threshold and carries a heading — kept without a second thought.

---

## 6. The Full Job

## Fifteen sheets in. Ten sheets out.

Every sheet, at readable size, with its measured coverage where it was measured. Five are stamped and dropped before a sheet moves.

| Sheet | Kind | Ink | Reason |
|---|---|---|---|
| 01 | title page | 2.06% | — |
| 02 | table of contents | 1.00% | — |
| 03 | content | — | — |
| 04 | **waste** | 0.11% | orphaned_footer |
| 05 | content | — | — |
| 06 | **waste** | 0.05% | break_artefact |
| 07 | content | — | — |
| 08 | content | — | — |
| 09 | **waste** | 0.10% | intentionally_blank |
| 10 | content | — | — |
| 11 | **waste** | 0.06% | orphaned_footer |
| 12 | content | — | — |
| 13 | **waste** | 0.01% | orphaned_footer |
| 14 | content | — | — |
| 15 | content | — | — |

---

## 7. Close

# Print what you meant.

| Sheets | Printing | Dropping | Threshold | Mean ink | Cost avoided |
|---|---|---|---|---|---|
| 15 | 10 | 5 | 2.0% | 2.9% | $0.06 |

---

Print what you meant. — Cursor Hackathon · Calgary · 2026
