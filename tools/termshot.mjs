// usage: node termshot.mjs <log> <out.png> "<title>"
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import Convert from 'ansi-to-html';
const [log, out, title = 'terminal'] = process.argv.slice(2);
const text = readFileSync(log, 'utf8');
const html = new Convert({ escapeXML: true, fg: '#e6e6e6', bg: '#1e1e2e' }).toHtml(text);
const page = `<html><body style="margin:0;background:#fff;padding:0;font-family:ui-monospace,Menlo,monospace">
<div style="background:#1e1e2e;border-radius:10px;overflow:hidden;box-shadow:0 4px 20px #0008;width:fit-content;min-width:900px">
<div style="background:#313244;padding:8px 12px;color:#cdd6f4;font-size:13px">
<span style="color:#f38ba8">●</span> <span style="color:#f9e2af">●</span> <span style="color:#a6e3a1">●</span>&nbsp;&nbsp;${title.replace(/</g, '&lt;')}</div>
<pre style="margin:0;padding:14px 16px;color:#e6e6e6;font-size:13px;line-height:1.45;white-space:pre">${html}</pre></div></body></html>`;
const b = await chromium.launch({ executablePath: process.env.CHROME_BIN });
const p = await b.newPage({ viewport: { width: 1000, height: 400 }, deviceScaleFactor: 1 });
await p.setContent(page);
await p.locator('body > div').screenshot({ path: out });
await b.close();
console.log('wrote', out);
