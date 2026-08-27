/* verify-consistency.mjs — the drift catcher.
   Numbers have drifted between the app, the deck, the docs, the MCP
   server and the README three times already. This reads the LIVE app
   as the single source of truth, then greps every other artifact for
   contradictory figures. */
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const b = await chromium.launch();
const pg = await b.newPage({ viewport:{width:1440,height:900} });
await pg.goto('file://' + path.resolve('../proof/index.html'), {waitUntil:'load'});
await pg.waitForTimeout(2600);

const truth = await pg.evaluate(() => ({
  total: PAGES.length,
  waste: PAGES.filter(p=>p.waste).map(p=>p.n),
  inks:  PAGES.filter(p=>p.waste).map(p=>p.ink),
  keep:  PAGES.filter(p=>!p.waste).length,
  threshold: WASTE_THRESHOLD,
  mean: +(PAGES.reduce((a,p)=>a+p.ink,0)/PAGES.length).toFixed(1)
}));
await b.close();

console.log('LIVE APP (source of truth)');
console.log(`  ${truth.total} pages → ${truth.keep} print · waste [${truth.waste}] · threshold ${truth.threshold}% · mean ${truth.mean}%\n`);

const FILES = [
  '../proof/deck.html', '../proof/docs.html', '../proof/process.html',
  '../proof/mcp/document.js', '../proof/mcp/README.md', '../README.md'
];

/* Stale figures from earlier revisions. Any of these appearing in a
   shipped artifact means it was written against a dead version. */
const STALE = [
  [/\b12 pages\b/i,          '"12 pages" — old page count'],
  [/12\s*(→|->|&rarr;)\s*7/, '"12 → 7" — old verdict'],
  [/\b15\s*(→|->|&rarr;)\s*7\b/, '"15 → 7" — mixed old/new'],
  /* Only flag POSITIVE claims of rasterisation. "Not rasterised" and
     "never from rasterising" are correct contrast copy, not drift. */
  [/(?<!not\s)(?<!never\sfrom\s)\brasterised\s*·\s*pixels counted/i,
    'claims "rasterised · pixels counted" — method is glyph geometry'],
  [/\$0\.42\b/,              '$0.42 — old cost figure'],
  [/\b3\.1\s*%/,             '3.1% — old mean ink'],
  [/pages?\s*4[,/]\s*7[,/]\s*9/, 'old waste page list (4,7,9,...)'],
];

let issues = 0;
for(const f of FILES){
  const p = path.resolve(f);
  if(!existsSync(p)){ console.log(`  SKIP  ${f} (not written yet)`); continue; }
  const s = readFileSync(p,'utf8');
  const hits = [];
  for(const [re,msg] of STALE) if(re.test(s)) hits.push(msg);

  // positive checks: does it state the right page count anywhere?
  const mentionsTotal = new RegExp(`\\b${truth.total}\\b`).test(s);
  if(!mentionsTotal) hits.push(`never mentions the real page count (${truth.total})`);

  if(hits.length){ issues += hits.length;
    console.log(`  FAIL  ${f}`);
    hits.forEach(h => console.log(`          ↳ ${h}`));
  } else console.log(`  PASS  ${f}`);
}
console.log(`\n${issues ? issues + ' inconsistencies found' : 'all artifacts agree with the live app'}`);
process.exit(issues?1:0);
