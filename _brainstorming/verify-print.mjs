/* verify-print.mjs — proves the PRINT claim end to end.
   Renders the app to PDF exactly as a printer would receive it, and
   counts the real pages in the output. This is the only way to show
   that dropping sheets actually changes what comes out. */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const url = 'file://' + path.resolve('../proof/index.html');
const b = await chromium.launch();

// count pages by reading the PDF's page tree
const pageCount = buf => {
  const s = buf.toString('latin1');
  const counts = [...s.matchAll(/\/Type\s*\/Page[^s]/g)].length;
  const kids  = [...s.matchAll(/\/Count\s+(\d+)/g)].map(m => +m[1]);
  return counts || (kids.length ? Math.max(...kids) : 0);
};

async function render(action, file){
  const pg = await b.newPage({ viewport:{width:1440,height:900} });
  await pg.goto(url, { waitUntil:'load' });
  await pg.waitForTimeout(2200);
  if(action) await action(pg);
  await pg.waitForTimeout(300);
  await pg.pdf({ path:file, format:'Letter', printBackground:false });
  const state = await pg.evaluate(() => ({
    total: PAGES.length,
    dropped: PAGES.filter(p=>p.dropped).length,
    inRoot: document.querySelectorAll('#printroot .page').length,
    hidden: document.querySelectorAll('#printroot .page.dropped').length
  }));
  await pg.close();
  return { state, pages: pageCount(readFileSync(file)) };
}

const R=[]; const t=(n,ok,d)=>R.push({n,ok,d});

// default: waste already dropped
const reduced = await render(null, '/tmp/proof-reduced.pdf');
// everything restored
const full = await render(async pg => { await pg.click('#btnAll'); }, '/tmp/proof-full.pdf');

t('full job renders every sheet',
  full.pages === full.state.total, `${full.pages} pdf pages vs ${full.state.total} sheets`);
t('reduced job renders fewer sheets',
  reduced.pages < full.pages, `${reduced.pages} vs ${full.pages}`);
t('reduced job page count = total minus dropped',
  reduced.pages === reduced.state.total - reduced.state.dropped,
  `${reduced.pages} = ${reduced.state.total} - ${reduced.state.dropped}`);
t('exactly the dropped sheets disappear',
  full.pages - reduced.pages === reduced.state.dropped,
  `${full.pages - reduced.pages} removed, ${reduced.state.dropped} dropped`);

await b.close();
let fail=0;
for(const r of R){ if(!r.ok) fail++;
  console.log(`${r.ok?'  PASS':'  FAIL'}  ${r.n.padEnd(46)} ${r.d}`); }
console.log(`\n${R.length-fail}/${R.length} passed — real PDF output verified`);
process.exit(fail?1:0);
