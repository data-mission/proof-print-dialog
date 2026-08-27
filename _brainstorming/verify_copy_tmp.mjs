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

  // ── Pass 1: no clipboard permission granted (default file:// context) ──
  const ctx1 = await browser.newContext();
  await ctx1.grantPermissions([]); // explicitly withhold clipboard perms
  const pg1 = await ctx1.newPage({ viewport: { width: 1280, height: 900 } });
  const errs1 = [];
  pg1.on('pageerror', e => errs1.push(e.message));
  await pg1.goto(url, { waitUntil: 'load' });
  await pg1.waitForTimeout(400);

  const hasClipboardWrite = await pg1.evaluate(() => !!(navigator.clipboard && navigator.clipboard.writeText));
  console.log(`\n=== ${file} ===`);
  console.log('navigator.clipboard.writeText present on file://:', hasClipboardWrite);

  await pg1.click('#btnCopyMd');
  await pg1.waitForTimeout(300);

  // Did clipboard actually receive it? Try reading it back (may itself fail w/o permission -> that's fine, we check via other signals too)
  let clipboardText = null, clipboardReadErr = null;
  try {
    clipboardText = await pg1.evaluate(async () => {
      try { return await navigator.clipboard.readText(); } catch (e) { return '__READ_FAILED__:' + e.message; }
    });
  } catch (e) { clipboardReadErr = e.message; }

  const btnTextAfterClick = await pg1.$eval('#btnCopyMd', b => b.textContent);
  const revealVisible = await pg1.$('#mdReveal') !== null;
  let revealValue = null;
  if (revealVisible) revealValue = await pg1.$eval('#mdRevealTa', ta => ta.value);

  console.log('button text right after click:', JSON.stringify(btnTextAfterClick));
  console.log('clipboard readText() result:', clipboardText === expectedMd ? 'MATCHES expected md' : (typeof clipboardText === 'string' ? clipboardText.slice(0,60) : clipboardText));
  console.log('fallback reveal textarea shown:', revealVisible, revealValue ? (revealValue === expectedMd ? '(content matches md)' : '(content differs!)') : '');

  // wait for "Copied" -> revert cycle to confirm feedback timing
  await pg1.waitForTimeout(1700);
  const btnTextAfterRevert = await pg1.$eval('#btnCopyMd', b => b.textContent);
  console.log('button text after revert (~1.5s+):', JSON.stringify(btnTextAfterRevert));
  if (btnTextAfterRevert !== 'Copy as Markdown') { console.log('  !! FAIL: button did not revert'); allOk = false; }

  const pageErrsAfterCopy = errs1.filter(Boolean);
  if (pageErrsAfterCopy.length) { console.log('  !! Page errors:', pageErrsAfterCopy); allOk = false; }

  // Determine overall correctness: either clipboard has correct text, OR reveal textarea has correct text
  const copySucceededSomehow = (clipboardText === expectedMd) || (revealVisible && revealValue === expectedMd);
  console.log('COPY PATH RESULT:', copySucceededSomehow ? 'PASS (content delivered via clipboard or fallback)' : 'FAIL');
  if (!copySucceededSomehow) allOk = false;

  await ctx1.close();

  // ── Pass 2: WITH clipboard permission granted (secure-context-like) ──
  const ctx2 = await browser.newContext();
  try { await ctx2.grantPermissions(['clipboard-read', 'clipboard-write']); } catch (e) { console.log('grantPermissions error:', e.message); }
  const pg2 = await ctx2.newPage({ viewport: { width: 1280, height: 900 } });
  await pg2.goto(url, { waitUntil: 'load' });
  await pg2.waitForTimeout(300);
  await pg2.click('#btnCopyMd');
  await pg2.waitForTimeout(250);
  let clip2 = null;
  try { clip2 = await pg2.evaluate(() => navigator.clipboard.readText()); } catch (e) { clip2 = '__ERR__:' + e.message; }
  console.log('WITH clipboard permission granted -> clipboard content matches md:', clip2 === expectedMd);
  if (clip2 !== expectedMd) { allOk = false; console.log('  !! mismatch, got:', typeof clip2 === 'string' ? clip2.slice(0,80) : clip2); }
  await ctx2.close();

  // ── Pass 3: Download button ──
  const ctx3 = await browser.newContext();
  const pg3 = await ctx3.newPage({ viewport: { width: 1280, height: 900 } });
  await pg3.goto(url, { waitUntil: 'load' });
  await pg3.waitForTimeout(300);
  const [download] = await Promise.all([
    pg3.waitForEvent('download'),
    pg3.click('#btnDownloadMd'),
  ]);
  const suggested = download.suggestedFilename();
  const dlPath = await download.path();
  const dlContent = fs.readFileSync(dlPath, 'utf8');
  console.log('download suggestedFilename:', suggested, '(expected', dlName + ')');
  console.log('download content matches md:', dlContent === expectedMd);
  if (suggested !== dlName || dlContent !== expectedMd) allOk = false;
  await ctx3.close();
}

await browser.close();
console.log('\n\n==========');
console.log(allOk ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED');
process.exit(allOk ? 0 : 1);
