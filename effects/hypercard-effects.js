/* HyperCard visual effects for the web.
 *
 * HyperTalk:   visual effect dissolve slowly to black
 *              go to next card
 * Here:        await HyperCardEffects.go(stage, nextCard, 'dissolve slowly to black');
 *
 * The stage is a fixed-size box (`.hc-stage`) holding the current card as a child with `position:absolute; inset:0`.
 * The incoming card is a detached element you built; it is inserted, revealed with the effect, and the old one removed.
 * Effects step in discrete frames (12 fps by default) because a Macintosh redrew in stages, not smoothly.
 * Every effect only ever shows pixels from the old card, the new card, or a destination image (black, white, gray, inverse).
 *
 * Effect names (Apple's 2.x list): barn door close|open · checkerboard · dissolve · iris close|open · plain (cut) ·
 * push left|right|up|down · scroll left|right|up|down · shrink to top|center|bottom · stretch from top|center|bottom ·
 * venetian blinds · wipe left|right|up|down · zoom close|open (zoom in = close, zoom out = open).
 * Speeds: very slowly · slowly · (normal) · fast · very fast.   Destinations: card (default) · black · white · gray · inverse.
 *
 * Also exported: HyperCardEffects.hide(element, 'dissolve fast') removes any element with an effect (useful for popups),
 * and HyperCardEffects.parse('wipe left very fast to gray').
 */
const SPEEDS = { 'very slow': 2400, slow: 1200, normal: 600, fast: 300, 'very fast': 150 };
const GRAY_PATTERN = 'AA55AA55AA55AA55';
// Bayer 8x8 ordered dither: the order in which pixels of a tile turn on. Gives HyperCard's "denser and denser patterns".
const BAYER = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21];

const wait = ms => new Promise(r => setTimeout(r, ms));
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const tileCache = new Map();
/** 8x8 PNG data URL with the first `count` Bayer pixels opaque (as a mask: opaque = visible). */
function ditherTile(count) {
  const key = count; if (tileCache.has(key)) return tileCache.get(key);
  const c = document.createElement('canvas'); c.width = c.height = 8; const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  for (let i = 0; i < 64; i++) if (BAYER[i] < count) ctx.fillRect(i % 8, Math.floor(i / 8), 1, 1);
  const url = `url("${c.toDataURL()}")`; tileCache.set(key, url); return url;
}
function patternTile(hex) {
  const key = 'p' + hex; if (tileCache.has(key)) return tileCache.get(key);
  const c = document.createElement('canvas'); c.width = c.height = 8; const ctx = c.getContext('2d'); ctx.fillStyle = '#000';
  for (let y = 0; y < 8; y++) { const byte = parseInt(hex.slice(y * 2, y * 2 + 2), 16); for (let x = 0; x < 8; x++) if (byte & (128 >> x)) ctx.fillRect(x, y, 1, 1); }
  const url = `url("${c.toDataURL()}")`; tileCache.set(key, url); return url;
}
function setMask(el, image, size = '8px 8px') {
  el.style.webkitMaskImage = image; el.style.maskImage = image; el.style.webkitMaskSize = size; el.style.maskSize = size;
  el.style.webkitMaskRepeat = 'repeat'; el.style.maskRepeat = 'repeat';
}
function clearFx(el) {
  if (!el) return;
  for (const p of ['webkitMaskImage', 'maskImage', 'webkitMaskSize', 'maskSize', 'webkitMaskRepeat', 'maskRepeat', 'clipPath', 'transform', 'transformOrigin', 'mixBlendMode']) el.style[p] = '';
}
function layer(kind, stage) {
  const el = document.createElement('div'); el.className = 'hc-effect-layer'; el.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
  if (kind === 'black') el.style.background = '#000';
  else if (kind === 'white') el.style.background = '#fff';
  else if (kind === 'gray') { el.style.background = `#fff ${patternTile(GRAY_PATTERN)}`; el.style.backgroundSize = '8px 8px'; }
  else if (kind === 'inverse') { el.style.background = '#fff'; el.style.mixBlendMode = 'difference'; }
  return el;
}
/** Run fn(t) for t in (0,1] over `duration` ms in discrete frames. */
async function frames(duration, fps, fn, signal) {
  const n = Math.max(2, Math.round(duration / 1000 * fps)), dt = duration / n;
  for (let i = 1; i <= n; i++) { if (signal?.aborted) return false; fn(i / n, i, n); await wait(dt); }
  return !signal?.aborted;
}

/** Parse HyperTalk-ish syntax: "[visual [effect]] <name> [speed] [to <image>]". */
export function parse(text) {
  let s = String(text).toLowerCase().replace(/^visual\s+(effect\s+)?/, '').replace(/\s+/g, ' ').trim();
  let to = 'card'; const m = s.match(/\s+to\s+(card|black|white|gr[ae]y|inverse)$/); if (m) { to = m[1].startsWith('gr') ? 'gray' : m[1]; s = s.slice(0, m.index); }
  let speed = 'normal';
  for (const k of ['very slowly', 'very slow', 'very fast', 'slowly', 'slow', 'fast']) { if (s.endsWith(' ' + k)) { speed = k.replace('slowly', 'slow'); s = s.slice(0, -k.length - 1); break; } }
  const alias = { 'zoom in': 'zoom close', 'zoom out': 'zoom open', cut: 'plain', 'barndoor open': 'barn door open', 'barndoor close': 'barn door close', 'venetian blind': 'venetian blinds' };
  return { effect: alias[s] ?? s, speed, to };
}

const EFFECTS = {
  // ---- cut ----
  'plain'(ctx) { ctx.show(ctx.to); return Promise.resolve(); },
  // ---- dissolve: to on top, revealed through denser and denser dither tiles ----
  async 'dissolve'(ctx) {
    ctx.show(ctx.to); setMask(ctx.to, ditherTile(0));
    await ctx.frames(t => setMask(ctx.to, ditherTile(Math.min(64, Math.round(t * 64)))));
    clearFx(ctx.to);
  },
  // ---- wipes: a line sweeps across; nothing moves ----
  'wipe left'(ctx) { return ctx.reveal(t => `inset(0 0 0 ${(1 - t) * 100}%)`); },
  'wipe right'(ctx) { return ctx.reveal(t => `inset(0 ${(1 - t) * 100}% 0 0)`); },
  'wipe up'(ctx) { return ctx.reveal(t => `inset(${(1 - t) * 100}% 0 0 0)`); },
  'wipe down'(ctx) { return ctx.reveal(t => `inset(0 0 ${(1 - t) * 100}% 0)`); },
  // ---- barn door: double wipe from the centre (open) or to the centre (close) ----
  'barn door open'(ctx) { return ctx.reveal(t => `inset(0 ${(1 - t) * 50}%)`); },
  'barn door close'(ctx) { return ctx.conceal(t => `inset(0 ${t * 50}%)`); },
  // ---- iris: rectangular aperture, always from/to the centre ----
  'iris open'(ctx) { return ctx.reveal(t => `inset(${(1 - t) * 50}% ${(1 - t) * 50}%)`); },
  'iris close'(ctx) { return ctx.conceal(t => `inset(${t * 50}% ${t * 50}%)`); },
  // ---- checkerboard: 16x9 grid, odd squares first (top-to-bottom wipe), then even ----
  async 'checkerboard'(ctx) {
    const cols = 16, rows = 9;
    await ctx.gridMask((t, cell, col, row) => { const odd = (col + row) % 2 === 0; const phase = odd ? Math.min(1, t * 2) : Math.max(0, t * 2 - 1); cell.height = phase; }, cols, rows);
  },
  // ---- venetian blinds: nine horizontal strips, all replaced at once from the top of each strip ----
  async 'venetian blinds'(ctx) { await ctx.gridMask((t, cell) => { cell.height = t; }, 1, 9); },
  // ---- scroll: the new card slides in over the old, which stays put ----
  'scroll left'(ctx) { return ctx.slide(ctx.to, t => `translate(${(1 - t) * 100}%, 0)`); },
  'scroll right'(ctx) { return ctx.slide(ctx.to, t => `translate(${-(1 - t) * 100}%, 0)`); },
  'scroll up'(ctx) { return ctx.slide(ctx.to, t => `translate(0, ${(1 - t) * 100}%)`); },
  'scroll down'(ctx) { return ctx.slide(ctx.to, t => `translate(0, ${-(1 - t) * 100}%)`); },
  // ---- push (2.2): both cards move ----
  'push left'(ctx) { return ctx.slide(ctx.to, t => `translate(${(1 - t) * 100}%, 0)`, t => `translate(${-t * 100}%, 0)`); },
  'push right'(ctx) { return ctx.slide(ctx.to, t => `translate(${-(1 - t) * 100}%, 0)`, t => `translate(${t * 100}%, 0)`); },
  'push up'(ctx) { return ctx.slide(ctx.to, t => `translate(0, ${(1 - t) * 100}%)`, t => `translate(0, ${-t * 100}%)`); },
  'push down'(ctx) { return ctx.slide(ctx.to, t => `translate(0, ${-(1 - t) * 100}%)`, t => `translate(0, ${t * 100}%)`); },
  // ---- shrink / stretch (2.x): the card squashes vertically toward an edge ----
  'shrink to top'(ctx) { return ctx.squash(ctx.from, 'top', t => 1 - t); },
  'shrink to center'(ctx) { return ctx.squash(ctx.from, 'center', t => 1 - t); },
  'shrink to bottom'(ctx) { return ctx.squash(ctx.from, 'bottom', t => 1 - t); },
  'stretch from top'(ctx) { return ctx.squash(ctx.to, 'top', t => t, true); },
  'stretch from center'(ctx) { return ctx.squash(ctx.to, 'center', t => t, true); },
  'stretch from bottom'(ctx) { return ctx.squash(ctx.to, 'bottom', t => t, true); },
  // ---- zoom: expanding rectangles from the click point then cut (open); cut then contracting rectangles (close) ----
  async 'zoom open'(ctx) { await ctx.zoomRects(t => t); ctx.show(ctx.to); },
  async 'zoom close'(ctx) { ctx.show(ctx.to); await ctx.zoomRects(t => 1 - t); }
};

function makeContext(stage, from, to, duration, fps, origin, signal) {
  const ctx = {
    from, to, duration, signal,
    get aborted() { return Boolean(signal?.aborted); },
    frames: fn => frames(duration, fps, fn, signal),
    /** Put `to` on top (attached above `from`). */
    show(el) { if (el && el.parentNode !== stage) stage.append(el); if (el) el.style.visibility = ''; },
    /** Reveal `to` on top through a growing clip-path. */
    async reveal(clip) { ctx.show(ctx.to); ctx.to.style.clipPath = clip(0); await ctx.frames(t => { ctx.to.style.clipPath = clip(t); }); clearFx(ctx.to); },
    /** Keep `from` on top and shrink its clip until `to` (inserted underneath) shows. */
    async conceal(clip) { if (ctx.to) stage.insertBefore(ctx.to, ctx.from); ctx.from.style.clipPath = clip(0); await ctx.frames(t => { ctx.from.style.clipPath = clip(t); }); clearFx(ctx.from); },
    /** SVG mask made of a grid of cells whose visible height is set per frame (0..1). */
    async gridMask(update, cols, rows) {
      ctx.show(ctx.to);
      const w = stage.clientWidth, h = stage.clientHeight, cw = w / cols, ch = h / rows, cells = [];
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>`;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ col: c, row: r, height: 0 });
      const render = () => { let body = ''; for (const cell of cells) if (cell.height > 0) body += `<rect x='${(cell.col * cw).toFixed(2)}' y='${(cell.row * ch).toFixed(2)}' width='${cw.toFixed(2)}' height='${(cell.height * ch).toFixed(2)}' fill='black'/>`; return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg + body + '</svg>')}")`; };
      setMask(ctx.to, render(), `${w}px ${h}px`); ctx.to.style.maskRepeat = ctx.to.style.webkitMaskRepeat = 'no-repeat';
      await ctx.frames(t => { for (const cell of cells) update(t, cell, cell.col, cell.row); setMask(ctx.to, render(), `${w}px ${h}px`); ctx.to.style.maskRepeat = ctx.to.style.webkitMaskRepeat = 'no-repeat'; });
      clearFx(ctx.to);
    },
    async slide(el, toTransform, fromTransform) {
      ctx.show(el); el.style.transform = toTransform(0); if (fromTransform) ctx.from.style.transform = fromTransform(0);
      await ctx.frames(t => { el.style.transform = toTransform(Math.round(t * stage.clientWidth) / stage.clientWidth); if (fromTransform) ctx.from.style.transform = fromTransform(t); });
      clearFx(el); clearFx(ctx.from);
    },
    async squash(el, edge, scale, isTo) {
      if (isTo) ctx.show(el); else if (ctx.to) stage.insertBefore(ctx.to, ctx.from);
      el.style.transformOrigin = `50% ${edge === 'top' ? '0%' : edge === 'bottom' ? '100%' : '50%'}`;
      el.style.transform = `scaleY(${scale(0)})`;
      await ctx.frames(t => { el.style.transform = `scaleY(${Math.max(0, scale(t))})`; });
      clearFx(el);
    },
    /** Finder-style zoom rectangles: 1-px outlines between the origin point and the full stage. */
    async zoomRects(size) {
      const w = stage.clientWidth, h = stage.clientHeight, ox = origin ? origin.x : w / 2, oy = origin ? origin.y : h / 2;
      const outlines = Array.from({ length: 3 }, () => { const d = document.createElement('div'); d.className = 'hc-effect-layer'; d.style.cssText = 'position:absolute;border:1px solid #000;pointer-events:none;box-sizing:border-box;'; stage.append(d); return d; });
      let i = 0;
      await ctx.frames(t => {
        const s = size(t), d = outlines[i++ % outlines.length];
        const left = ox - ox * s, top = oy - oy * s, right = ox + (w - ox) * s, bottom = oy + (h - oy) * s;
        d.style.left = `${Math.round(left)}px`; d.style.top = `${Math.round(top)}px`; d.style.width = `${Math.round(right - left)}px`; d.style.height = `${Math.round(bottom - top)}px`;
      });
      outlines.forEach(o => o.remove());
    }
  };
  return ctx;
}

/**
 * Go to `next` (an element) inside `stage` with one or more effects.
 * effects: a string ('dissolve slowly'), an object {effect, speed, to}, or an array of those (HyperCard queues them).
 * options: { fps, origin: {x, y} (for zoom open), speeds: {...}, signal: AbortSignal }
 * Aborting stops at the next frame and leaves whatever is on the stage; the caller decides what to show instead.
 */
export async function go(stage, next, effects = 'plain', options = {}) {
  const list = (Array.isArray(effects) ? effects : [effects]).map(e => typeof e === 'string' ? parse(e) : { speed: 'normal', to: 'card', ...e });
  const fps = options.fps ?? 12, speeds = { ...SPEEDS, ...(options.speeds ?? {}) };
  let current = stage.querySelector(':scope > .hc-card') ?? stage.firstElementChild;
  if (next) { next.style.position = 'absolute'; next.style.inset = '0'; next.classList.add('hc-card'); }
  const signal = options.signal;
  if (reduced() || signal?.aborted) { if (next) stage.append(next); if (current && current !== next) current.remove(); stage.querySelectorAll(':scope > .hc-effect-layer').forEach(l => l.remove()); return; }
  for (let i = 0; i < list.length; i++) {
    if (signal?.aborted) break;
    const step = list[i], last = i === list.length - 1;
    const target = step.to === 'card' ? next : layer(step.to, stage);
    if (!target) continue;
    const run = EFFECTS[step.effect];
    if (!run) throw new Error(`Unknown visual effect: ${step.effect}`);
    const ctx = makeContext(stage, current, target, speeds[step.speed] ?? SPEEDS.normal, fps, options.origin, signal);
    await run(ctx);
    if (current && current !== target) current.remove();
    current = target;
    if (last && step.to !== 'card' && next) { stage.append(next); current.remove(); current = next; } // HyperCard cuts from the image to the card
  }
  stage.querySelectorAll(':scope > .hc-effect-layer').forEach(l => { if (l !== current) l.remove(); });
}

/** Remove `element` with an effect (dissolve, wipe, iris close, barn door close, shrink, zoom close, plain).
 * options: { duration, fps, signal: AbortSignal }. An aborted hide stops at the next frame, clears the effect
 * styles and leaves the element visible, so the caller decides what happens instead. Resolves true when hidden. */
export async function hide(element, effect = 'dissolve', options = {}) {
  const step = typeof effect === 'string' ? parse(effect) : { speed: 'normal', ...effect };
  const duration = options.duration ?? (SPEEDS[step.speed] ?? SPEEDS.normal), fps = options.fps ?? 12, signal = options.signal;
  const done = () => { element.hidden = true; clearFx(element); return true; };
  const stopped = () => { clearFx(element); return false; };
  if (signal?.aborted) return stopped();
  if (reduced() || step.effect === 'plain') return done();
  const rect = element.getBoundingClientRect();
  if (step.effect === 'dissolve') return await frames(duration, fps, t => setMask(element, ditherTile(Math.max(0, 64 - Math.round(t * 64)))), signal) ? done() : stopped();
  const clips = {
    'wipe left': t => `inset(0 ${t * 100}% 0 0)`, 'wipe right': t => `inset(0 0 0 ${t * 100}%)`, 'wipe up': t => `inset(0 0 ${t * 100}% 0)`, 'wipe down': t => `inset(${t * 100}% 0 0 0)`,
    'iris close': t => `inset(${t * 50}% ${t * 50}%)`, 'barn door close': t => `inset(0 ${t * 50}%)`
  };
  if (clips[step.effect]) return await frames(duration, fps, t => { element.style.clipPath = clips[step.effect](t); }, signal) ? done() : stopped();
  if (step.effect.startsWith('shrink to')) { const edge = step.effect.split(' ').pop(); element.style.transformOrigin = `50% ${edge === 'top' ? '0%' : edge === 'bottom' ? '100%' : '50%'}`; return await frames(duration, fps, t => { element.style.transform = `scaleY(${1 - t})`; }, signal) ? done() : stopped(); }
  if (step.effect === 'zoom close') { element.style.transformOrigin = '50% 50%'; return await frames(duration, fps, t => { element.style.clipPath = `inset(${t * 50}% ${t * 50}%)`; }, signal) ? done() : stopped(); }
  void rect; return done();
}

export const HyperCardEffects = { go, hide, parse, speeds: SPEEDS, effects: Object.keys(EFFECTS) };
if (typeof window !== 'undefined') window.HyperCardEffects = HyperCardEffects;
export default HyperCardEffects;
