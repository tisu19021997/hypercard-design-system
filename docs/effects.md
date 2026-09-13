# Visual effects

HyperTalk:

```
visual effect dissolve slowly to black
go to next card
```

Web:

```js
import { HyperCardEffects } from './effects/hypercard-effects.js';
await HyperCardEffects.go(stage, nextCard, 'visual effect dissolve slowly to black');
```

`stage` is a fixed-size box (`.hc-stage`, 512 × 342 by default) holding the current `.hc-card` as an absolutely positioned child. `nextCard` is an element you built; it is inserted, revealed through the effect, and the old card is removed. Returns a promise that resolves when the effect ends.

## Grammar

```
[visual [effect]] <name> [very slowly | slowly | fast | very fast] [to card | black | white | gray | inverse]
```

Multiple effects queue, as in HyperCard: `go(stage, card, ['wipe left fast to black', 'dissolve'])`.

| Name | What happens (all in discrete frames) |
|---|---|
| `plain` | Cut. |
| `dissolve` | New card revealed through increasingly dense 8 × 8 ordered-dither tiles (Bayer order). |
| `wipe left/right/up/down` | A line sweeps across; nothing moves. |
| `barn door open` / `close` | Double wipe from / to the vertical centre. |
| `iris open` / `close` | Rectangular aperture from / to the centre. |
| `checkerboard` | 16 × 9 grid; odd squares wipe first, then even. |
| `venetian blinds` | Nine horizontal strips replaced at once, top down. |
| `scroll left/right/up/down` | New card slides in over the old, which stays put. |
| `push left/right/up/down` | Both cards move (HyperCard 2.2). |
| `shrink to top/center/bottom` | Old card squashes vertically toward an edge, revealing the new one. |
| `stretch from top/center/bottom` | New card grows from an edge over the old. |
| `zoom open` / `close` | Finder-style expanding (or contracting) 1 px rectangles from the click point, then cut. Pass `options.origin = {x, y}` for the point. |

Aliases: `zoom in` = close, `zoom out` = open, `cut` = plain.

Speeds (ms): very slow 2400, slow 1200, normal 600, fast 300, very fast 150. Override with `options.speeds`. Frame rate: `options.fps` (default 12).

Destinations: `to black|white|gray|inverse` runs the effect to a full-card image, then cuts to the new card, exactly as HyperCard does (gray is the 50 % pattern; inverse is the old card with every pixel flipped).

## Hiding an element

```js
await HyperCardEffects.hide(popup, 'dissolve fast');   // also: wipe *, iris close, barn door close, shrink to *, zoom close, plain
```

Sets `hidden` on the element when done. Use it for bubbles, popups and tooltips that should leave the HyperCard way. Show them with a cut.

## Parsing

`HyperCardEffects.parse('wipe left very fast to gray')` → `{ effect: 'wipe left', speed: 'very fast', to: 'gray' }`. `HyperCardEffects.effects` lists the 28 names.

## Reduced motion

When `prefers-reduced-motion: reduce` is set, every effect becomes a cut and `hide` is immediate. Don't add motion around the module that ignores this.

## Fidelity notes

- The module never blends. Every frame shows only pixels of the old card, the new card or the destination image. Dissolve uses a mask, not opacity.
- 12 fps is a calibration to how a Mac Plus looked, not a measurement; Apple never documented frame timing. Tune `fps` and `speeds` if you have a reference recording.
- HyperCard 1.x had a shorter list (no push, shrink, stretch); the 2.x list is implemented.
