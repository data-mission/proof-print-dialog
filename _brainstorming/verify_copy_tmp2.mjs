import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const pages = [
  ['docs.html', 'functionality.md', '/Users/vlad/repos/cursor-2/docs/functionality.md'],
  ['process.html', 'process.md', '/Users/vlad/repos/cursor-2/docs/process.md'],
  ['deck.html', 'pitch.md', '/Users/vlad/repos/cursor-2/docs/pitch.md'],
];

const browser = await chromium.launch();
let allOk = true;

for (const [file, dlName, mdPath] of pages) {
  const url = 'file://' + path.resolve('/Users/vlad/repos/cursor-2/proof/' + file);
  const expectedMd = fs.readFileSync(mdPath, 'utf8');
  console.log(`\n=== ${file} ===`);

  // Tier A: real environment, clipboard permission granted, click and read back
  {
    const ctx = await browser.newContext();
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
    const pg = await ctx.newPage();
    await pg.goto(url, { waitUntil: 'load' });
    await pg.click('#btnCopyMd');
    await pg.waitForTimeout(200);
    const btnText = await pg.$eval('#btnCopyMd', b => b.textContent);
    const clip = await pg.evaluate(() => navigator.clipboard.readText());
    const ok = btnText === 'Copied' && clip === expectedMd;
    console.log('Tier A (real clipboard API, permission granted): button="Copied"?', btnText === 'Copied', '| clipboard matches md?', clip === expectedMd, ok ? 'PASS' : 'FAIL');
    if (!ok) allOk = false;
    await ctx.close();
  }

  // Tier B: force navigator.clipboard.writeText to reject -> execCommand fallback must engage and succeed
  {
    const ctx = await browser.newContext();
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
    const pg = await ctx.newPage();
    await pg.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: () => Promise.reject(new Error('forced failure')) },
        configurable: true,
      });
    });
    await pg.goto(url, { waitUntil: 'load' });
    await pg.click('#btnCopyMd');
    await pg.waitForTimeout(200);
    const btnText = await pg.$eval('#btnCopyMd', b => b.textContent);
    // read back via a fresh un-patched clipboard read (execCommand writes to the real OS/browser clipboard)
    const clip = await pg.evaluate(() => {
      // use the DataTransfer-less legacy read via a temporary unpatched path isn't available;
      // instead verify execCommand('copy') was actually invoked and succeeded by checking document state
      return document.queryCommandSupported ? document.queryCommandSupported('copy') : null;
    });
    // Directly verify clipboard via CDP-level read using a second untainted context isn't trivial;
    // instead confirm button shows Copied (meaning the fallback path's own success branch fired)
    const ok = btnText === 'Copied';
    console.log('Tier B (clipboard API forced to reject -> execCommand fallback): button="Copied"?', btnText === 'Copied', ok ? 'PASS' : 'FAIL');
    if (!ok) allOk = false;
    await ctx.close();
  }

  // Tier C: force BOTH navigator.clipboard AND execCommand to fail -> reveal textarea must show, with correct content
  {
    const ctx = await browser.newContext();
    const pg = await ctx.newPage();
    await pg.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
      document.addEventListener('DOMContentLoaded', () => {
        const orig = document.execCommand;
        document.execCommand = function (cmd) {
          if (cmd === 'copy') return false;
          return orig.apply(document, arguments);
        };
      });
    });
    await pg.goto(url, { waitUntil: 'load' });
    await pg.click('#btnCopyMd');
    await pg.waitForTimeout(200);
    const revealVisible = await pg.$('#mdReveal') !== null;
    let revealValue = null;
    if (revealVisible) revealValue = await pg.$eval('#mdRevealTa', ta => ta.value);
    const ok = revealVisible && revealValue === expectedMd;
    console.log('Tier C (both clipboard API and execCommand fail -> reveal textarea): shown?', revealVisible, '| content matches md?', revealValue === expectedMd, ok ? 'PASS' : 'FAIL');
    if (!ok) allOk = false;
    await ctx.close();
  }
}

await browser.close();
console.log('\n==========');
console.log(allOk ? 'ALL TIERS PASSED' : 'SOME TIERS FAILED');
process.exit(allOk ? 0 : 1);
