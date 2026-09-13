// Sanity checks for the design system. Run: node scripts/check.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
let failures = 0;
const ok = (cond, msg) => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${msg}`); if (!cond) failures++; };

// 1. Tokens parse and every leaf has $value.
const tokens = JSON.parse(read('tokens/hypercard.tokens.json'));
let leaves = 0;
(function walk(n) { for (const [k, v] of Object.entries(n)) { if (k.startsWith('$')) continue; if (v && typeof v === 'object' && '$value' in v) leaves++; else if (v && typeof v === 'object') walk(v); } })(tokens);
ok(leaves >= 90, `tokens: ${leaves} leaf tokens`);

// 2. Generated CSS is in sync with the generators.
const before = { tokens: read('css/tokens.css'), patterns: read('css/patterns.css'), cursors: read('css/cursors.css') };
execFileSync(process.execPath, [path.join(root, 'scripts/build-tokens.mjs')], { stdio: 'ignore' });
execFileSync(process.execPath, [path.join(root, 'scripts/build-patterns.mjs')], { stdio: 'ignore' });
ok(read('css/tokens.css') === before.tokens, 'css/tokens.css matches tokens JSON');
ok(read('css/patterns.css') === before.patterns && read('css/cursors.css') === before.cursors, 'css/patterns.css and css/cursors.css match patterns JSON');

// 3. Component CSS: balanced braces, 1-bit only.
const css = read('css/hypercard.css') + read('css/fonts.css');
ok((css.match(/\{/g) || []).length === (css.match(/\}/g) || []).length, 'hypercard.css braces balance');
const colors = [...css.matchAll(/#([0-9a-f]{3,8})\b/gi)].map(m => m[1].toLowerCase()).filter(c => !['000', 'fff', '000000', 'ffffff'].includes(c));
ok(colors.length === 0, `hypercard.css uses only #000/#fff${colors.length ? ` (found ${[...new Set(colors)].join(', ')})` : ''}`);
ok(!/\btransition\s*:(?!\s*none)/.test(css), 'hypercard.css has no CSS transitions');
ok(!/box-shadow:[^;]*\b\d+px\s+\d+px\s+[1-9]\d*px/.test(css), 'hypercard.css shadows have no blur');
const props = new Set([...read('css/tokens.css').matchAll(/--hc-[\w-]+/g)].map(m => m[0]));
const used = [...new Set([...css.matchAll(/var\((--hc-(?!pattern|cursor)[\w-]+)/g)].map(m => m[1]))];
const missing = used.filter(p => !props.has(p));
ok(missing.length === 0, `every --hc-* var used in CSS is defined${missing.length ? ` (missing ${missing.join(', ')})` : ''}`);

// 4. Effects module loads, parses, lists 28 effects.
const fx = await import(path.join(root, 'effects/hypercard-effects.js'));
ok(fx.HyperCardEffects.effects.length === 28, `effects: ${fx.HyperCardEffects.effects.length} effects`);
const p = fx.parse('visual effect wipe left very fast to gray');
ok(p.effect === 'wipe left' && p.speed === 'very fast' && p.to === 'gray', 'effects: parser');
ok(fx.parse('zoom in').effect === 'zoom close' && fx.parse('dissolve slowly').speed === 'slow', 'effects: aliases');

// 5. Patterns: 40 + 38 PNGs.
ok(fs.readdirSync(path.join(root, 'patterns/png')).filter(f => f.startsWith('hc-')).length === 40, 'patterns: 40 HyperCard PNGs');
ok(fs.readdirSync(path.join(root, 'patterns/png')).filter(f => f.startsWith('sys-')).length === 38, 'patterns: 38 System PNGs');

// 6. Docs exist.
for (const f of ['README.md', 'AGENTS.md', 'CLAUDE.md', 'docs/principles.md', 'docs/typography.md', 'docs/components.md', 'docs/effects.md', 'docs/layout.md', 'fonts/FONTS.md', 'examples/index.html']) ok(fs.existsSync(path.join(root, f)), `exists: ${f}`);

console.log(failures ? `\n${failures} check(s) failed` : '\nall checks passed');
process.exit(failures ? 1 : 0);
