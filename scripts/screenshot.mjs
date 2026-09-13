// Regenerates the README images from examples/index.html. Run: npm run shots
//
// Serves the repo over HTTP (the example imports an ES module, which file:// refuses) and drives the page
// with the system Chrome through playwright-core, so nothing has to be downloaded. The effect stills are
// captured mid-animation from the real effects module, not mocked up.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'docs/images');
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png' };

let chromium;
try { ({ chromium } = await import('playwright-core')); }
catch { console.error('playwright-core is not installed. Run `npm install` first.'); process.exit(1); }

const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.statusCode = 404; return res.end('not found'); }
  res.setHeader('Content-Type', TYPES[path.extname(file)] ?? 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1120, height: 1400 }, deviceScaleFactor: 2 });
// This repo ships no font files on purpose (Apple's are not redistributable), so the optional ./fonts/
// sources 404 and the local()/macOS fallbacks take over. Anything else is a real problem.
const problems = [], missingFonts = [];
page.on('pageerror', e => problems.push(String(e)));
page.on('response', r => { if (r.status() >= 400) (r.url().includes('/fonts/') ? missingFonts : problems).push(r.url()); });
await page.goto(`${base}/examples/index.html`);
await page.waitForTimeout(400);

const shot = async (name, selector, pad = 8) => {
  const file = path.join(outDir, `${name}.png`);
  if (!selector) await page.screenshot({ path: file, fullPage: true });
  else {
    const b = await page.locator(selector).first().boundingBox();
    await page.screenshot({ path: file, fullPage: true, clip: { x: b.x - pad, y: b.y - pad, width: b.width + pad * 2, height: b.height + pad * 2 } });
  }
  console.log(`  docs/images/${name}.png  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
};

await shot('kitchen-sink', null);
await shot('window', '.hc-window');
await shot('controls', '.demo > section:nth-child(2)');
await shot('fields', '.demo > section:nth-child(3)');
await shot('dialogs', '.demo > section:nth-child(4)');
await shot('patterns', '.demo > section:nth-child(5)');
await shot('type', '.demo > section:nth-child(6)');

// Two effects caught mid-flight, straight out of effects/hypercard-effects.js.
for (const [name, effect] of [['effect-dissolve', 'dissolve'], ['effect-checkerboard', 'checkerboard']]) {
  await page.evaluate(e => { document.getElementById('fx-name').value = e; document.getElementById('fx-speed').value = 'very slowly'; }, effect);
  const running = page.evaluate(() => window.hcDemo.run());
  await page.waitForTimeout(1100);
  await shot(name, '#stage', 0);
  await running;
}

if (missingFonts.length) console.log('  ' + missingFonts.length + ' optional font file(s) absent, as expected (see fonts/FONTS.md)');
console.log(problems.length ? 'WARNING: ' + problems.length + ' page error(s): ' + problems.join('; ') : '  no other page errors');
await browser.close();
server.close();
