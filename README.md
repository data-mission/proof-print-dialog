# PROOF

![A hand holding a printed page up to the window — almost entirely blank, one stray line of text near the middle. Below it, a printer tray full of sheets.](assets/hero.png)

> You already printed it. That's when you find out.

**PROOF is the print dialog, reinvented.** Instead of a stamp-sized thumbnail and a leap of
faith, it shows you every page of the job at readable size, measures how much ink each page
actually costs from the document's real, rendered layout, and flags the sheets that are waste
before you burn paper on them — then it prints what you meant, not what your last edit left
behind.

Built for the Cursor Calgary hackathon (Aug 2026), whose brief was to take a boring, everyday
application format and make it dramatically better — visually, functionally, or both. The
print dialog hasn't meaningfully changed since 1995. This is what it looks like if someone
finally touched it.

---

## The problem, concretely

The print dialog most operating systems ship today gives you a preview pane roughly the size
of a postage stamp. That is the entire visibility you're given into a document that might run
to a dozen-plus pages. At that size you cannot tell that one page is a single orphaned "Terms
and conditions apply." line left behind by a page break, that another is nothing but a
"— continued —" marker that overflowed onto its own sheet, or that a third says "This page
intentionally left blank" in eleven-point serif type. You click Print. Every page comes out.
Several of them are furniture, not content — and you paid for the paper and the toner on all
of them before you ever saw it happen.

That's the failure mode PROOF exists to close: **the dialog you already trust doesn't show you
enough to make the decision it's asking you to make.**

PROOF ships with a realistic demo document — a 20-odd-paragraph quarterly business report,
"Q3_Operating_Review_FINAL_v4.docx," with a table of contents, an executive summary, a real
financial table, a supply-chain section, headcount figures, and an outlook section, plus five
deliberately inserted junk pages of exactly the kind real documents accumulate: an orphaned
"Terms and conditions" footer, a "— continued —" break artefact, a stray copyright line, an
"intentionally left blank" notice, and a lone page number. Loaded and paginated for real, this
document runs to **15 pages**, and PROOF's own live measurement — not a hand-typed figure —
flags **5 of them as waste**, printing 10. Open [`proof/index.html`](./proof/index.html)
yourself and the rail shows the exact same numbers, because they're computed fresh every time
the page loads, not memorized here.

---

## How the numbers are actually produced

This is the part worth being precise about, because it's also the part that makes the whole
idea work: **every figure PROOF shows you is computed from the document as loaded, not typed
in by hand or dressed up to look plausible** — and this holds for the bundled demo document
*and* for any file you drop onto it (see below).

1. **Pagination is measured, not assumed.** The document's HTML is laid out in a real, hidden
   DOM element at real content width, and PROOF walks its block-level children (headings,
   paragraphs, tables, blockquotes) accumulating each one's *actual rendered height*
   (`getBoundingClientRect()`), breaking to a new page whenever the next block would overflow
   a `816×1056px` page box — 8.5"×11" letter paper at 96dpi, with roughly 1in margins. An
   explicit page-break marker in the source forces a break early. The page count is therefore
   an output of layout, not a number anyone chose.
2. **Ink coverage is measured from real text geometry.** For each finished page, PROOF walks
   every text node and asks the browser's own layout engine for the exact rectangles its
   glyphs occupy (`Range.getClientRects()`) — not a pixel-by-pixel canvas scan, but the same
   idea applied to real geometry the browser already computed. Each rectangle's area is
   weighted by a stated glyph-density constant (`GLYPH_DENSITY = 0.16`, i.e. roughly 16% of a
   line box is actual ink for normal text, rising with font weight), and table/blockquote
   border strokes are added on top since they carry ink too. The total, divided by the page's
   content area, is the page's ink coverage percentage.
3. **A canvas-rasterization path exists too, but isn't the headline number.** PROOF also
   ships a second, independent method (`inkOf()`): serialize the page to an SVG, rasterise it
   to an offscreen canvas, and count non-white pixels weighted by luminance-darkness. The code
   keeps this explicitly labeled "a second opinion, not used for the headline number" — worth
   knowing if you read the source, since it's the more intuitive of the two methods but isn't
   the one driving what's on screen.
4. **Low ink alone is not waste.** Below **2.0% ink coverage** (`WASTE_THRESHOLD`) is necessary
   but not sufficient. A page is only flagged when it's *also* either a recognized piece of
   pagination furniture (an "intentionally left blank" notice, a "— continued —" marker, a
   copyright line, a lone page number) or has no structural element at all
   (`h1,h2,h3,table,ul,ol,svg,img,blockquote`) and under 120 characters of text. This is what
   keeps a title page or a table of contents from being wrongly flagged just for being sparse —
   in the bundled demo, the title page measures 2.06% ink and the table of contents measures
   1.0%, both technically thin, and both print anyway because each one has a heading.
5. **The reason, not just the flag.** A flagged page's actual text is pattern-matched against
   the kinds of furniture real documents accumulate — "intentionally left blank" notices,
   "— continued —" markers, copyright lines, lone page numbers, or a short trailing line with
   no clear category — so the reason shown for each waste page is derived from what that page
   actually says, not a caption written for a specific demo.

**Said plainly, because it matters for trust:** if the layout-based measurement can't run for
some reason, PROOF does **not** silently show you nothing or quietly make something up — it
falls back to a disclosed, deterministic estimate (`estimateInk()`: a stated formula over
character count, heading count, and table-cell count) documented in the code as exactly that,
an estimate, not a measurement. **The UI's status line tells you which one produced the
numbers you're looking at** — it reads either `measured · N glyph runs across N pages` or
`estimated · layout measurement unavailable`, so you are never looking at a guess that was
presented as a measurement. The per-sheet detail panel's own "method" readout agrees with it,
reading `measured · glyph-run geometry` or `estimated · block model` for that specific sheet.

Everything downstream — which pages are flagged, the sheets-saved count, the mean ink
percentage, the per-page reason shown when you open a sheet, and the cost figure — is derived
from this pipeline running against whatever document is currently loaded. Nothing on screen is
a hard-coded result dressed up as a computation.

---

## What you actually see

- **The verdict, first.** Pages in, pages out, with the dropped-sheet count and the mean ink
  percentage stated as a headline stat in the rail — not buried in a settings panel.
- **The sheet wall.** Every page of the job as a live thumbnail — the *actual* rendered page,
  scaled down with CSS `transform: scale()`, not a placeholder graphic or a miniature redrawn
  from scratch — with waste pages visibly stamped and a per-page ink gauge.
- **The nested reveal.** Click any sheet and it opens into its own explanation: how it was
  classified, its measured ink coverage against the 2.0% threshold, and — for a flagged page —
  which specific kind of furniture it is and why dropping it changes nothing you meant to
  print. This is the design's spine: document → pages → one flagged sheet → the reason, each
  level revealing the next. From that same panel you can restore or drop that one sheet
  individually.
- **Proof another file, for real.** The rail has a genuine drop zone: drag in your own
  `.html`, `.txt`, or `.md` file (or click to pick one) and PROOF paginates and measures *that*
  document with the exact same pipeline described above — this isn't a second demo mode, it's
  the same `load()` function the bundled document runs through.
- **A real Print button.** "Print" calls the browser's real `window.print()` against a hidden
  print root that mirrors the on-screen job; dropped/waste pages carry `display:none` under
  `@media print`, so the sheets you decided not to print genuinely don't print. There's also
  an explicit "Print everything anyway" escape hatch, and print CSS hides the app chrome so
  only the document itself goes to the printer.
- **Before / after.** The 1995 dialog is rendered honestly on the presentation deck
  (`proof/deck.html`), side by side with what PROOF shows instead, so the contrast is stated
  explicitly rather than only implied.

## Platforms

Desktop and mobile are both designed as first-class layouts, not one scaled down from the
other — the sheet wall, the hero stat row, and the nested detail view all have dedicated
breakpoints down to phone width.

---

## The MCP server — proofing a document without a human in the loop

The web page is one surface on PROOF. Underneath, PROOF is meant to be usable by an AI agent
directly: an [MCP](https://modelcontextprotocol.io) server exposes the same document model
the web UI uses, so a coding agent, a document pipeline, or Claude itself can proof a job
*before a single sheet moves* — no screenshot, no human reading a preview pane.

The server lives in [`proof/mcp/`](./proof/mcp) and mirrors the exact same 15-page document the
web app measures — same filename (`Q3_Operating_Review_FINAL_v4.docx`), same 5 waste pages
(4, 6, 9, 11, 13) with the same reasons, and the same cost constants
(`cost_per_sheet_usd: 0.012`, `cost_per_ink_point_usd: 0.0009`) `index.html` itself uses, so a
call to `ink_cost` quotes the same money the UI shows on screen (mean ink 2.97% and $0.0603
saved here, "2.9%" and "$0.06" rounded in the UI). One thing stated plainly rather than hidden:
the ink percentages in the server's `document.js` are captured values mirrored from a real
browser measurement, not recomputed by the server itself — there's no portable Node
equivalent of `index.html`'s `Range.getClientRects()` glyph-geometry method, since that API
only exists in a real layout engine, so the server discloses its numbers as
`"method": "measured_in_browser_layout"` rather than pretending to re-derive them independently.
Wiring the server to measure an arbitrary document handed to it — the same way the web UI's
drop zone already does — is the natural next step.

The four tools it exposes, verified against a live smoke-test run
(`node proof/mcp/smoke_test.mjs`):

| Tool | What it does |
|---|---|
| `proof` | Measures a document and returns every page with its ink coverage and fill percentage. |
| `waste_report` | Returns just the flagged sheets, each with the specific reason it's waste. |
| `drop_pages` | Removes the flagged sheets — returns the job that would actually print. Pages are removed, not reflowed. |
| `ink_cost` | Sheets, ink coverage, and modelled cost for the job as it stands versus as it started. |

**To connect it** to Claude Desktop, Claude Code, or any MCP-compatible client, point the
client at the server directory:

```bash
cd proof/mcp
npm install
```

Then add it as an MCP server (stdio transport) in your client's config, e.g. for Claude
Desktop's `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "proof": {
      "command": "node",
      "args": ["/absolute/path/to/proof/mcp/server.js"]
    }
  }
}
```

There is no network hop and nothing to deploy: the server is a local stdio process, exactly
like any other MCP server you'd run for local tools. This was a deliberate constraint on the
whole project — see "No backend," below — extended to the agent layer: agentic capability
without a hosting dependency that can fail during a demo.

To verify the server actually works end to end without wiring up a full client, run the
included smoke test — it spawns `server.js` as a real child process over stdio, performs the
MCP handshake, lists all four tools, and calls each one:

```bash
cd proof/mcp
node smoke_test.mjs
```

Fuller connection instructions (including a Cursor-specific config) live in
[`proof/mcp/README.md`](./proof/mcp/README.md).

---

## How to run it

**The product is static HTML/CSS/JS. There is no build step, no bundler, and no server.**

```bash
open proof/index.html
```

or just double-click `proof/index.html` in Finder/Explorer. That's the entire installation
procedure — no `npm install`, no dev server, no dependency on this repo's `node_modules` at
all, and no external fonts, CDN scripts, or network images.

The page pairs with [`proof/sample-document.js`](./proof/sample-document.js), which supplies
the full 15-page demo report (`window.SAMPLE_DOC`) — keep the two files together in `proof/`
and it loads automatically via a plain `<script src>` tag. If that file is ever missing,
`index.html` doesn't break: it falls back to a smaller, self-contained demo document
(`FALLBACK`) built into the page itself, so the app never shows a blank screen, just a
shorter document. Either way, ink measurement works identically whether you open the file
directly (`file://`) or serve it, because nothing in the pipeline depends on cross-origin
network access.

If you'd rather serve it over HTTP for any reason (some browser extensions or stricter local
security policies can interfere with `file://` pages), any static file server works, e.g.:

```bash
npx serve proof
```

### Screenshots and the capture harness

The `_brainstorming/` directory holds this project's working notes, including
[`capture.mjs`](./_brainstorming/capture.mjs), a small Playwright script used to take
frame-exact screenshots of the page at specific scroll positions and viewport sizes (desktop
and phone) for the hackathon submission. It requires the `playwright` devDependency declared
in this repo's root `package.json`:

```bash
npm install
node _brainstorming/capture.mjs proof/index.html --out shots
```

This is a development tool, not part of the product — PROOF itself needs none of it to run.

---

## No backend, on purpose

PROOF has no server, no database, and no deploy step for the product itself. Its bundled demo
"data" is a hand-built, realistic quarterly report shipped as static content
(`sample-document.js`, with a smaller built-in fallback if that file is absent) so that every
number computed from it — page count, ink coverage, waste flags, cost — is real arithmetic
over real content the moment the page loads, not a fetch to a backend that could be down,
slow, or absent during a demo. It also genuinely accepts a file you drop on it, run through
the identical pipeline. The MCP server is the one process that runs outside the browser, and
it's a local stdio process rather than a hosted one, so it carries none of a web backend's
deploy risk.

## Why the print dialog

Roughly a dozen other "boring format" candidates were considered and rejected during design,
for several distinct, individually stated reasons: a subscription manager, a package tracker,
and a utility bill were dropped because reinventing them honestly would mean inventing data
with no legitimate source (a bank balance, a carrier's real tracking state, a meter reading);
a cancellation flow and a CAPTCHA were dropped for adding no real information; a browser-tab
manager and an airline seat map were dropped as already well-served by existing products
(OneTab/Arc, SeatGuru); a cookie banner was too small a canvas for the intended layered,
scroll-driven reveal; and an earlier prescription-dosing concept was cut for failing an
instant-comprehension test. The print dialog is the one candidate that cleared all of these
bars at once: instantly recognizable, adds real information the current dialog hides, and
every dramatic number on screen — pages, blank-page detection, ink coverage — is something a
browser can actually compute from a real document, live, with nothing faked. The full
decision record, including the rejected candidates and the reasoning at each step, is in
[`_brainstorming/SPEC.md`](./_brainstorming/SPEC.md).

---

## Repository layout

```
proof/
  index.html          the product — open this
  sample-document.js   the 15-page demo report loaded into the product
  deck.html            a short, seven-slide product presentation, same art direction
  docs.html             the full feature-by-feature reference, verified against live output
  mcp/
    server.js           the MCP server entrypoint (stdio transport)
    document.js          MCP server's document model — mirrors index.html's live document
    smoke_test.mjs        end-to-end check: spawns the server, calls all four tools
    package.json          MCP server package (@modelcontextprotocol/sdk, zod)
    README.md             MCP-specific install/connect instructions
_brainstorming/
  SPEC.md             the full design/decision record for this project
  capture.mjs          Playwright screenshot harness used for the submission
  ...                  earlier design drafts and research notes, kept for the record
shots/                desktop + mobile submission screenshots of proof/index.html
shots-deck/           submission screenshots of proof/deck.html
```

`proof/deck.html` is a short, standalone product-presentation page — open it the same way as
`index.html` — walking through why the print dialog is broken, how PROOF measures ink
coverage (measured vs. rasterised), and the classifier's kept-despite-low-ink logic, in seven
slides in the same visual language as the product itself. `proof/docs.html` is the deeper,
scrollable reference: every feature — including the MCP server — documented against the
current code with real, live-verified numbers.

Built for the Cursor Calgary hackathon, August 2026.
