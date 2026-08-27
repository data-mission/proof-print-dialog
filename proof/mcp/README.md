# PROOF MCP server

Exposes PROOF's print-job measurement — ink coverage, fill, and the
waste verdict for every page — as MCP tools over stdio, so an agent can
proof a document before a single sheet prints.

Data model: `document.js` mirrors the 15-page job PROOF's web UI
paginates for real from `/Users/vlad/repos/cursor-2/proof/sample-document.js`
("Northgate Holdings — Q3 Operating Review", `Q3_Operating_Review_FINAL_v4.docx`),
including which pages are waste (4, 6, 9, 11, 13) and why. `server.js`
imports it, so the server and the web UI never drift out of sync.

Ink coverage here is NOT recomputed by this server — it can't be: the
web UI measures it by walking every text node of the real, laid-out
page and summing actual glyph-run rectangles (`Range.getClientRects()`),
which requires a browser layout engine Node doesn't have. Instead, the
real numbers the browser produced were captured by driving the live
page (Playwright) and are hardcoded as data in `document.js`, disclosed
as `"method": "measured_in_browser_layout"` with a note in every tool
result — mirrored, not re-derived, and never passed off as something
this process measured itself.

Cost basis (`cost_basis` in `ink_cost`'s response) uses the exact same
constants as `index.html` — `COST_SHEET = $0.012/sheet`,
`COST_INK_PT = $0.0009` per ink-coverage point per sheet — copied, not
reinvented, so the app and this server always quote the same dollar
figure. Verified: this server's `ink_cost` reports mean ink 2.97%
(as-is) and $0.0603 saved for the 5 flagged pages, matching the live
UI's own `#stInk` ("3%") and `#stCost` ("$0.06") to rounding.

## Tools

| Tool | Purpose |
|---|---|
| `proof` | Every page of a document: ink %, waste flag, reason (if waste), and a content preview. |
| `waste_report` | Only the flagged pages, each with `{page, ink, reason}`. |
| `drop_pages` | Drop given page numbers, return the remaining job (pages printing, new total, sheets saved). Pages are removed, not reflowed. |
| `ink_cost` | Sheets, mean coverage, and cost — as-is vs. as-proposed. Cost basis is stated in the response (`cost_basis` field) and documented in `document.js`. |

## Install

```bash
cd /Users/vlad/repos/cursor-2/proof/mcp
npm install
```

## Connect it

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "proof": {
      "command": "node",
      "args": ["/Users/vlad/repos/cursor-2/proof/mcp/server.js"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "proof": {
      "command": "node",
      "args": ["/Users/vlad/repos/cursor-2/proof/mcp/server.js"]
    }
  }
}
```

Restart the client after editing its config.

## Smoke test

Runs the server as a real child process over stdio, does the MCP
handshake, lists tools, and calls all four:

```bash
cd /Users/vlad/repos/cursor-2/proof/mcp && node smoke_test.mjs
```

Expect a `tools/list` with 4 tools, then `proof`/`waste_report` results
flagging pages `4, 6, 9, 11, 13`, a `drop_pages` result with
`pages_printing: [1,2,3,5,7,8,10,12,14,15]`, and an `ink_cost` result
showing `sheets_saved: 5` and `cost_saved_usd: 0.0603`.

Minimal one-line check (raw JSON-RPC over stdio, no SDK client needed):

```bash
printf '%s\n' \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"cli","version":"0"}}}' \
  '{"jsonrpc":"2.0","method":"notifications/initialized"}' \
  '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' \
  | node /Users/vlad/repos/cursor-2/proof/mcp/server.js
```

should print a `result.tools` array with `proof`, `waste_report`,
`drop_pages`, and `ink_cost`.
