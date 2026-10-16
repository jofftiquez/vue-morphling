// usage: node pageshot.mjs <url> <out.png> [width] [--wait selector]
// Prints console messages + page errors; exits 1 if any error.
import { chromium } from 'playwright';
const args = process.argv.slice(2);
const [url, out, width = '1200'] = args;
const wi = args.indexOf('--wait'); const waitSel = wi > -1 ? args[wi + 1] : null;
const b = await chromium.launch({ executablePath: process.env.CHROME_BIN });
const p = await b.newPage({ viewport: { width: +width, height: 800 } });
const msgs = []; let errors = 0;
p.on('console', m => { msgs.push(`[console.${m.type()}] ${m.text()}`); if (m.type() === 'error') errors++; });
p.on('pageerror', e => { msgs.push(`[pageerror] ${e.message}`); errors++; });
await p.goto(url, { waitUntil: 'networkidle' });
if (waitSel) await p.waitForSelector(waitSel);
await p.waitForTimeout(500);
await p.screenshot({ path: out, fullPage: true });
console.log(msgs.join('\n') || '(no console output)');
console.log('wrote', out, 'errors:', errors);
await b.close();
process.exit(errors ? 1 : 0);
