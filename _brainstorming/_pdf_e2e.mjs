import { chromium } from 'playwright';
import path from 'node:path';

const url = 'file://' + path.resolve('../proof/index.html');
const pdfPath = path.resolve('../proof/Q3_Operating_Review_FINAL_v4.pdf');

const b = await chromium.launch();
const pg = await b.newPage({ viewport:{width:1440,height:900} });
const errs = [];
pg.on('console', m => { if(m.type()==='error') errs.push(m.text()); else if(/fake worker/i.test(m.text())) errs.push('LOG:'+m.text()); });
pg.on('pageerror', e => errs.push('PAGEERROR: '+e.message));

await pg.goto(url, { waitUntil:'load' });
await pg.waitForTimeout(1500);

// drive the real drop path via the hidden file input (equivalent to a
// user dropping the file; browsers don't let scripts synthesize a real
// OS drag, but this exercises the exact same readFile()->loadPdf() code).
const fileInput = await pg.$('#fileIn');
await fileInput.setInputFiles(pdfPath);

// wait for the PDF parse (20 pages, rendered canvases) to finish
await pg.waitForFunction(() => typeof DOC !== 'undefined' && DOC && DOC.isPDF && typeof PAGES !== 'undefined' && PAGES.length > 0, { timeout: 30000 });
await pg.waitForTimeout(500);

const R=[]; const t=(n,ok,d)=>R.push({n,ok,d});

const s = await pg.evaluate(() => ({
  isPDF: DOC.isPDF,
  filename: DOC.filename,
  pages: PAGES.length,
  measured: PAGES.filter(p=>p.measured).length,
  unmeasured: PAGES.filter(p=>!p.measured).length,
  waste: PAGES.filter(p=>p.waste).length,
  dropped: PAGES.filter(p=>p.dropped).length,
  inks: PAGES.map(p=>p.ink),
  hasHeading: PAGES.map(p=>p.hasHeading),
  reasons: PAGES.filter(p=>p.waste).map(p=>[p.n,p.reason&&p.reason[0],p.ink]),
  method: document.getElementById('methodTxt').textContent,
  methodLive: document.getElementById('method').classList.contains('live'),
  printRootPages: document.querySelectorAll('#printroot .page').length,
  page1DataUrlLen: PAGES[0].dataUrl ? PAGES[0].dataUrl.length : 0,
}));

console.log(JSON.stringify(s, null, 2));

t('DOC flagged as PDF', s.isPDF === true, String(s.isPDF));
t('filename matches dropped file', s.filename === 'Q3_Operating_Review_FINAL_v4.pdf', s.filename);
t('20 pages extracted', s.pages === 20, `${s.pages} pages`);
t('all pages measured (real text layer)', s.unmeasured === 0, `${s.unmeasured} unmeasured`);
t('method badge honestly labels pdf text geometry', /pdf text geometry/.test(s.method), s.method);
t('method dot is live', s.methodLive === true, String(s.methodLive));
t('page 1 (title/cover) is NOT flagged waste despite likely low ink', !s.reasons.some(r=>r[0]===1), JSON.stringify(s.reasons.find(r=>r[0]===1)||'not flagged - good'));
t('at least one page rendered a real thumbnail (dataUrl present)', s.page1DataUrlLen > 1000, `${s.page1DataUrlLen} chars`);
t('print root built for PDF (imgs, one per page)', s.printRootPages === s.pages, `${s.printRootPages} vs ${s.pages}`);
t('ink values in sane range', s.inks.every(i => i==null || (i>=0 && i<=100)), `min/max ${Math.min(...s.inks.filter(x=>x!=null))}..${Math.max(...s.inks.filter(x=>x!=null))}`);

// open a sheet's detail view, check readout
await pg.click('.sh[data-page="1"]');
await pg.waitForTimeout(400);
const detail = await pg.evaluate(() => {
  const rows = [...document.querySelectorAll('.readout div')].map(d => d.textContent);
  return { count: document.querySelectorAll('.detail').length, rows, tag: document.querySelector('.detail .tag')?.textContent };
});
t('clicking a PDF sheet opens detail', detail.count === 1, JSON.stringify(detail));
t('detail readout shows pdf text geometry method', detail.rows.some(r=>/pdf text geometry/.test(r)), JSON.stringify(detail.rows));

// toggle X-ray and check it renders map-driven marks for a PDF page
await pg.click('#btnXray');
await pg.waitForTimeout(400);
const xray = await pg.evaluate(() => {
  const firstPaper = document.querySelector('.sh .paper');
  return { xrCount: document.querySelectorAll('.xr').length, marks: document.querySelectorAll('.xr i').length, htmlSample: firstPaper ? firstPaper.innerHTML.slice(0,200) : null };
});
t('xray mode renders .xr containers for PDF pages', xray.xrCount > 0, `${xray.xrCount} .xr containers`);
t('xray mode renders glyph-rect marks from the pdf text map', xray.marks > 0, `${xray.marks} marks`);

await b.close();
let fail=0;
for(const r of R){ if(!r.ok) fail++;
  console.log(`${r.ok?'  PASS':'  FAIL'}  ${r.n.padEnd(56)} ${r.d}`); }
console.log(`\n${R.length-fail}/${R.length} passed`);
console.log('console/errs:', errs.slice(0,10));
process.exit(fail?1:0);
