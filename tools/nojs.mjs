// Screenshot a page with JavaScript disabled: shows exactly what the server rendered.
import { chromium } from 'playwright';
const [url, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_BIN });
const ctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1200, height: 900 } });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'load' });
await p.screenshot({ path: out, fullPage: true });
await b.close();
console.log('wrote', out);
