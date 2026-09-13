// Builds design/*.dc.html (Claude Design artboards) from design/src/*.html by inlining the design system CSS.
// Artboards run in a sandboxed iframe with no network, so every stylesheet must be inline.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url)), root = path.join(here, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const css = ['css/tokens.css', 'css/fonts.css', 'css/patterns.css', 'css/cursors.css', 'css/hypercard.css']
  .map(read).join('\n')
  .replace(/@import[^;]+;\n?/g, '')
  .replace(/url\("\.\.\/fonts\/[^"]+"\) format\("[^"]+"\),?\s*/g, ''); // no files in the sandbox; local() stays
const shared = read('design/src/_shared.css');
for (const f of fs.readdirSync(path.join(here, 'src')).filter(f => f.endsWith('.html'))) {
  const body = read(`design/src/${f}`);
  const out = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <style>
${css}
${shared}
  </style>
</helmet>
${body.trim()}
</x-dc>
</body>
</html>
`;
  fs.writeFileSync(path.join(here, f.replace(/\.html$/, '.dc.html')), out);
  console.log(`design/${f.replace(/\.html$/, '.dc.html')} ${(out.length / 1024).toFixed(0)} KB`);
}
