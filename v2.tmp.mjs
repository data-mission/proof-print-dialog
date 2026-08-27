import { chromium } from 'playwright';
import path from 'node:path';
const url = 'file://' + path.resolve('proof/docs.html');
const b = await chromium.launch();
const errs = [];
async function shot(name, selector){
  const ctx = await b.newContext({ viewport: {width:1440,height:900}, deviceScaleFactor: 2 });
  const pg = await ctx.newPage();
  pg.on('console', m => { if(m.type()==='error') errs.push(name+': '+m.text()); });
  pg.on('pageerror', e => errs.push(name+' PAGEERROR: '+e.message));
  await pg.goto(url, { waitUntil:'load' });
  await pg.waitForTimeout(300);
  const el = await pg.$(selector);
  if(el) await el.scrollIntoViewIfNeeded();
  await pg.waitForTimeout(200);
  await pg.screenshot({ path: `dtmp-${name}.png` });
  await ctx.close();
}
await shot('agentview', '#agentview');
await shot('since1995', '#since1995');
await shot('verify-print', '#verify');
const ctx = await b.newContext({viewport:{width:1440,height:900}});
const pg = await ctx.newPage();
await pg.goto(url); await pg.waitForTimeout(200);
const h = await pg.evaluate(()=>document.documentElement.scrollHeight);
await ctx.close();
console.log('height', h, 'errors', JSON.stringify(errs));
await b.close();
