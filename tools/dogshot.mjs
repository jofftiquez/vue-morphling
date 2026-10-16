// usage: node dogshot.mjs <url> <out.png> [--click sel1,sel2] [--width 1200]
// Loads a dogfood page, optionally clicks buttons, waits for the self-checks,
// screenshots the full page and prints console output + the check summary.
import { chromium } from 'playwright';
const args = process.argv.slice(2);
const [url, out] = args;
const opt = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
const clicks = (opt('--click', '') || '').split(',').filter(Boolean);
const b = await chromium.launch({ executablePath: process.env.CHROME_BIN });
const p = await b.newPage({ viewport: { width: +opt('--width', '1200'), height: 900 } });
const logs = []; let errors = 0;
p.on('console', m => { const t = m.text(); if (/Download the Vue Devtools|development mode|vite\] connect/.test(t)) return; logs.push(`[console.${m.type()}] ${t}`); if (m.type() === 'error' || /\[Vue warn\]|[Hh]ydration/.test(t)) errors++; });
p.on('pageerror', e => { logs.push(`[pageerror] ${e.message}`); errors++; });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.__dogfood, null, { timeout: 15000 });
for (const sel of clicks) { await p.click(sel); await p.waitForTimeout(300); }
await p.waitForTimeout(400);
const res = await p.evaluate(() => window.__dogfood);
await p.screenshot({ path: out, fullPage: true });
console.log(logs.join('\n') || '(no console output)');
console.log(`RESULT ${res.label}: ${res.pass}/${res.total}${res.failures.length ? ' FAIL ' + res.failures.join(' | ') : ''} · console errors: ${errors}`);
await b.close();
process.exit(errors || res.pass !== res.total ? 1 : 0);
