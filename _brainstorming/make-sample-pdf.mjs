/* Renders the real sample document to a real PDF, so there is an
   actual file to drag into PROOF. Uses the same page geometry the
   app paginates against. */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const doc = readFileSync('../proof/sample-document.js','utf8');
const b = await chromium.launch();
const pg = await b.newPage();
await pg.setContent('<!doctype html><meta charset="utf-8"><body><script>'+doc+'</script><div id=m></div><script>document.getElementById("m").outerHTML="<style>"+SAMPLE_DOC.css+"</style><div class=doc>"+SAMPLE_DOC.html+"</div>";document.title=SAMPLE_DOC.title;</script>', {waitUntil:'load'});
await pg.waitForTimeout(600);
const out = path.resolve('../proof/Q3_Operating_Review_FINAL_v4.pdf');
await pg.pdf({ path: out, format:'Letter', printBackground:true,
  margin:{top:'1in',bottom:'1in',left:'1in',right:'1in'} });
await b.close();
const buf = readFileSync(out);
const pages = [...buf.toString('latin1').matchAll(/\/Type\s*\/Page[^s]/g)].length;
console.log(`wrote ${out}`);
console.log(`${(buf.length/1024).toFixed(0)} KB · ${pages} pages`);
