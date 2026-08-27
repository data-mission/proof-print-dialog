# Vendored pdf.js

Source: `pdfjs-dist@4.10.38` (legacy build), fetched from unpkg and
rebundled locally. Not a CDN dependency at runtime — both files below
are plain, self-contained scripts committed into this repo so the app
keeps working with no network access, opened straight from `file://`.

## Files

- `pdf.esm.mjs` / `pdf.worker.esm.mjs` — the original ES-module files as
  published by pdfjs-dist. Kept only as the bundler input; not loaded
  by the app.
- `pdf.js` / `pdf.worker.js` — esbuild IIFE bundles of the two files
  above, exposing `window.pdfjsLib` and `window.pdfjsWorker` as plain
  globals. **These are what `index.html` actually loads.**

Rebuild with:

```sh
npx esbuild pdf.esm.mjs        --bundle --format=iife --global-name=pdfjsLib    --outfile=pdf.js        --minify
npx esbuild pdf.worker.esm.mjs --bundle --format=iife --global-name=pdfjsWorker --outfile=pdf.worker.js --minify
```

## Why not just use pdf.js normally

The upstream package has shipped ES-module-only builds since v4 — there
is no UMD/global build anymore. Two things then collide with "this app
must work by double-clicking an HTML file":

1. Chrome refuses to load `<script type="module" src="...">` from a
   `file://` document at all: *"Cross origin requests are only
   supported for protocol schemes: http, https, ..."* Every local file
   has its own opaque origin, so a module import is treated as
   cross-origin and blocked outright. That's why `pdf.js`/`pdf.worker.js`
   are re-bundled as plain IIFEs — a classic `<script src>` has no such
   restriction.

2. Even with a classic script, pdf.js's main thread hard-codes
   `new Worker(url, { type: "module" })` when it spins up its own
   background worker — so a *real* worker thread would hit the exact
   same file:// module restriction, this time for the worker script.

The fix for (2) doesn't require making workers work at all: pdf.js has
a documented, built-in fallback usually called the "fake worker" path.
Its `PDFWorker._initialize()` checks, before ever touching
`GlobalWorkerOptions.workerSrc` or spawning a `Worker`, whether
`globalThis.pdfjsWorker?.WorkerMessageHandler` already exists — and if
so, runs the worker's own message-handling code inline on the main
thread instead. Loading `pdf.worker.js` as an ordinary `<script>` tag
(right after `pdf.js`, before any `getDocument()` call) is enough to
set that global and take this path automatically. No `new Worker()`
call ever happens under `file://`, so there is nothing for the CORS
restriction to block.

`index.html` still sets `pdfjsLib.GlobalWorkerOptions.workerSrc` for
forward-compatibility (if this app is ever served over http(s) instead
of opened as a file, a real worker thread would parse PDFs off the main
thread) — but that line is inert under `file://`; the fake-worker path
above is what actually runs PDF parsing in this app today, confirmed by
pdf.js's own `"Setting up fake worker."` console warning.
