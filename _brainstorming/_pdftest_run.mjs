import { chromium } from 'playwright';
import fs from 'node:fs';

const b = await chromium.launch();
const pg = await b.newPage();
const errs = [];
pg.on('pageerror', e => errs.push('PAGEERROR: '+e.message));
pg.on('console', m => errs.push(m.type()+': '+m.text()));
await pg.goto('file:///tmp/pdftest/test.html', {waitUntil:'load'});
await pg.waitForTimeout(500);
const buf = fs.readFileSync('/tmp/pdftest/Q3_Operating_Review_FINAL_v4.pdf');
const b64 = buf.toString('base64');
const result = await pg.evaluate(async (b64) => {
  try {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
    const doc = await pdfjsLib.getDocument({data: bytes}).promise;
    const n = doc.numPages;
    const page = await doc.getPage(1);
    const tc = await page.getTextContent();
    const vp = page.getViewport({scale:1});
    const canvas = document.createElement('canvas');
    canvas.width = vp.width; canvas.height = vp.height;
    const ctx = canvas.getContext('2d');
    await page.render({canvasContext: ctx, viewport: vp}).promise;
    return { ok:true, numPages:n, items: tc.items.length, sample: tc.items.slice(0,3), vpw: vp.width, vph: vp.height, dataUrlLen: canvas.toDataURL().length };
  } catch(e) {
    return { ok:false, error: String(e && e.stack || e) };
  }
}, b64);
console.log(JSON.stringify(result, null, 2));
console.log('console/errs:', errs.slice(0,10));
await b.close();
