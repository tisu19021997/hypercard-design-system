# HyperCard Design System

A standalone, reusable reproduction of Apple HyperCard's look (1987–1998, on the 1-bit Macintosh): design tokens, CSS components, the 28 visual effects, the 40 paint patterns, the browse-hand cursor, and rules written for both people and coding agents.

**Scope, honestly:** about half of this is HyperCard proper (the 512 × 342 card, the 11 button styles, the 5 field styles, the Tools and Patterns palettes, the Message box, the 28 visual effects, the stack conventions). The other half is System 6/7 Macintosh chrome that HyperCard inherited from Apple's Toolbox and that every Mac app of the era shared: menu bar and menus, document windows, dialog frames, scroll bars, check boxes and radio buttons, Chicago and Geneva, and the 1-bit rules. It is called a HyperCard design system because that is what the whole set looks like together: a stack running on a Mac.

Everything is measured from primary sources (Apple's Toolbox source, *Inside Macintosh*, the *HyperCard Stack Design Guidelines*, the HyperCard 2.x reference, System 6/7 screenshots) and the source and confidence level of every number is recorded in [research/](research/). Nothing in this repo depends on a framework or a build step; it is plain CSS and one ES module.

```
css/hypercard.css      ← import this one file (it pulls in tokens, fonts, patterns, cursors)
effects/hypercard-effects.js   ← `go(stage, nextCard, 'dissolve slowly to black')`
tokens/hypercard.tokens.json   ← every measurement, W3C DTCG-style, with descriptions
AGENTS.md              ← the rules an AI agent must follow when building in this style
docs/                  ← principles, typography, components, effects, layout
```

## Quick start

```html
<link rel="stylesheet" href="hypercard-design-system/css/hypercard.css">

<body class="hc">                      <!-- .hc turns on 1-bit rendering for everything inside -->
  <div class="hc-card">                <!-- 512 × 342 -->
    <div class="hc-chicago hc-size-18">Welcome</div>
    <button class="hc-button hc-button--roundrect">OK</button>
    <label class="hc-checkbox"><input type="checkbox"><span>Show Lines</span></label>
    <div class="hc-field hc-field--rectangle hc-field--lines">Field text</div>
  </div>
</body>
```

```js
import { HyperCardEffects } from 'hypercard-design-system/effects';
await HyperCardEffects.go(stage, nextCardElement, 'visual effect dissolve slowly');
await HyperCardEffects.hide(popup, 'wipe left fast');
```

Open [examples/index.html](examples/index.html) over HTTP (`npx serve .` or `python3 -m http.server`) for a kitchen sink of every component and an interactive effects tester. ES modules do not load from `file://`.

## The five rules (see [AGENTS.md](AGENTS.md) for the full list)

1. **Two colors.** `#000` and `#fff`. Gray is a pattern (`--hc-pattern-22`) or a dither mask (`.hc-dimmed`), never `#808080`, never opacity.
2. **Whole pixels.** Every size in [tokens](tokens/hypercard.tokens.json) is an integer CSS px at 1×. No rems, no 4/8-pt grid, no rounding.
3. **Hard edges.** 1 px black borders; shadows are solid black offsets (1 px windows and menus, 2 px shadow-style parts); corners are the fixed radii in the tokens; no blur, no gradients, no anti-aliasing (`-webkit-font-smoothing: none`).
4. **Bitmap type.** Chicago 12 for anything the system says (menus, titles, button names); Geneva 12 for anything the user says (fields); Geneva 9 for small labels; Monaco 9 for scripts. Line heights 16 / 16 / 12 / 12 px.
5. **Stepped motion.** Nothing eases. Transitions between cards are the HyperCard visual effects, drawn in discrete frames (12 fps default). Popups leave by dissolve or wipe, never by fading.

## What is in the box

| Folder | Contents |
|---|---|
| `css/hypercard.css` | Menu bar and menus, document window (title bar stripes, close/zoom boxes, grow box), windoid + Message box, dialog frames (dBoxProc / plain / alt), all 11 HyperCard button styles + checkbox + radio, all 5 field styles (+ showLines, wideMargins, locked), scroll bar, Tools and Patterns palettes, icon slots, hilite/dimmed/marching-ants/blink states. |
| `css/tokens.css` | 125 `--hc-*` custom properties generated from the JSON tokens. |
| `css/fonts.css` | `@font-face` role fonts (`HC Chicago`, `HC Geneva 9`, `HC Monaco`) that use pixel-exact open recreations if you drop them in `fonts/`, otherwise macOS fonts. Role classes `.hc-chicago .hc-geneva .hc-geneva-9 .hc-monaco .hc-serif`, size classes `.hc-size-9…24`, text styles. |
| `css/patterns.css` | The 40 HyperCard palette patterns and 38 System `PAT#` patterns as 8×8 PNG data URIs (`--hc-pattern-N`, `.hc-pattern-N`), plus QuickDraw `--qd-white/ltGray/gray/dkGray/black`. |
| `css/cursors.css` | The browse hand at 1× and 2× with hotspot (6,0). |
| `effects/hypercard-effects.js` | barn door, checkerboard, dissolve, iris, plain, push, scroll, shrink, stretch, venetian blinds, wipe, zoom — with speeds and `to black/white/gray/inverse`, HyperTalk-syntax parser, reduced-motion fallback. |
| `patterns/` | The pattern hex tables (`*.json`) and PNG tiles. |
| `cursors/` | Browse hand bitmap as text and PNG. |
| `tokens/` | The source of truth for every measurement. |
| `research/` | Four reports with sources and confidence: HyperCard UI, classic Mac metrics, fonts, stack conventions. |
| `docs/` | Human documentation. |
| `examples/` | Kitchen sink. |

## Fonts

Apple's Chicago, Geneva, Monaco and New York cannot be redistributed, so this repo ships no font files. It falls back to fonts that are already on macOS (Krungthep and Silom carry Chicago's Latin glyphs; Geneva and Monaco ship with the system and cover Vietnamese). For pixel-exact Chicago and Geneva 9 on every platform, download the open recreations listed in [fonts/FONTS.md](fonts/FONTS.md) into `fonts/`; `css/fonts.css` picks them up automatically with the right `size-adjust`.

## Scripts

```bash
npm run build   # regenerate css/patterns.css, css/cursors.css, css/tokens.css from the JSON sources
npm run check   # verify the generated CSS is in sync, braces balance, tokens parse, effects module loads
```

## Scope and honesty

- Sizes come from Apple's code where it exists (menu bar 20 px, title bar 19 + 1 px, buttons 20 px, OK/Cancel 59 px, scroll bar 16 px, dialog border 1/2/2/3, checkbox 12 px, default ring 3 px + 1 px gap). Where they come from screenshots or prose, the token description says *medium* or *low* confidence.
- HyperCard's Tools palette icons and the 32×32 button icons are not included; they are Apple bitmaps. The palette layout, cell sizes and icon slot are.
- Effects are reconstructed from Apple's descriptions and screen recordings, not from the original code. Speeds (very slow 2400 ms … very fast 150 ms) are calibrated by eye to a Mac Plus and are tunable via `options.speeds`.
- Chromium only honors `-webkit-font-smoothing: none` on macOS. On other platforms text will be anti-aliased unless you ship the bitmap-style recreations.

## License

MIT for everything authored here (CSS, JS, tokens, docs, generated PNGs). HyperCard, Macintosh, Chicago, Geneva, Monaco and New York are trademarks of Apple Inc.; this project is an independent recreation of a visual style and includes none of Apple's fonts, icons or code. See [LICENSE](LICENSE).
