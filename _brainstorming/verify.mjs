/* verify.mjs — adversarial self-check. Drives the real app in a real
   browser and asserts the claims we make. Exits non-zero on failure so
   a reviewer can run it in CI. */
import { chromium } from 'playwright';
import path from 'node:path';

const url = 'file://' + path.resolve('../proof/index.html');
const b = await chromium.launch();
const pg = await b.newPage({ viewport:{width:1440,height:900} });
const errs = [];
pg.on('console', m => { if(m.type()==='error') errs.push(m.text()); });
pg.on('pageerror', e => errs.push('PAGEERROR: '+e.message));

await pg.goto(url,{waitUntil:'load'});
await pg.waitForTimeout(2500);

const R=[]; const t=(n,ok,d)=>{R.push({n,ok,d});};

const s = await pg.evaluate(() => ({
  pages: PAGES.length,
  measured: PAGES.filter(p=>p.measured).length,
  waste: PAGES.filter(p=>p.waste).length,
  dropped: PAGES.filter(p=>p.dropped).length,
  inks: PAGES.map(p=>p.ink),
  reasons: PAGES.filter(p=>p.waste).map(p=>[p.n,p.reason&&p.reason[0],p.ink]),
  kept: PAGES.filter(p=>!p.waste).map(p=>[p.n,p.ink]),
  printRoot: document.querySelectorAll('#printroot .page').length,
  droppedInRoot: document.querySelectorAll('#printroot .page.dropped').length,
  method: document.getElementById('methodTxt').textContent,
}));

t('pagination produced pages', s.pages>0, `${s.pages} pages`);
t('every page measured, none estimated', s.measured===s.pages, `${s.measured}/${s.pages}`);
t('method badge says measured', /measured/.test(s.method), s.method);
t('at least one waste page found', s.waste>0, `${s.waste} flagged`);
t('not everything flagged', s.waste<s.pages, `${s.waste}/${s.pages}`);
t('print root matches page count', s.printRoot===s.pages, `${s.printRoot} vs ${s.pages}`);
t('dropped pages hidden from print root', s.droppedInRoot===s.dropped, `${s.droppedInRoot} vs ${s.dropped}`);
t('no ink value is negative or >100', s.inks.every(i=>i>=0&&i<=100), `range ${Math.min(...s.inks)}..${Math.max(...s.inks)}`);
t('every waste page has a reason', s.reasons.every(r=>!!r[1]), JSON.stringify(s.reasons));
t('every waste page is under threshold', s.reasons.every(r=>r[2]<2.0), JSON.stringify(s.reasons.map(r=>r[2])));
t('title page (01) is NOT waste', !s.reasons.some(r=>r[0]===1), 'page 1');
t('kept pages exist above threshold', s.kept.some(k=>k[1]>=2.0), `${s.kept.length} kept`);

/* interaction flows */
await pg.click('.sh[data-page="4"]');
await pg.waitForTimeout(350);
t('clicking a sheet opens nested detail', await pg.locator('.detail').count()===1, 'detail mounted');
t('detail shows the measurement readout', (await pg.locator('.readout div').count())>=4, 'readout rows');

await pg.click('#btnAll'); await pg.waitForTimeout(250);
t('restore all clears every drop', await pg.evaluate(()=>PAGES.every(p=>!p.dropped)), 'none dropped');

await pg.click('#btnDrop'); await pg.waitForTimeout(250);
const after = await pg.evaluate(()=>({d:PAGES.filter(p=>p.dropped).length,w:PAGES.filter(p=>p.waste).length}));
t('drop-flagged drops exactly the flagged', after.d===after.w, `${after.d}/${after.w}`);

t('print button reflects remaining sheets',
  /Print \d+ sheet/.test(await pg.textContent('#btnPrint')), await pg.textContent('#btnPrint'));

/* mobile */
await pg.setViewportSize({width:430,height:932}); await pg.waitForTimeout(500);
t('no horizontal overflow on mobile',
  await pg.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),
  await pg.evaluate(()=>document.documentElement.scrollWidth+'px vs '+window.innerWidth));
t('sheets still render on mobile', (await pg.locator('.sh').count())>0, 'sheets present');

t('no console errors', errs.length===0, errs.slice(0,3).join(' | ')||'clean');

await b.close();
let fail=0;
for(const r of R){ if(!r.ok) fail++;
  console.log(`${r.ok?'  PASS':'  FAIL'}  ${r.n.padEnd(44)} ${r.d}`); }
console.log(`\n${R.length-fail}/${R.length} passed`);
process.exit(fail?1:0);
