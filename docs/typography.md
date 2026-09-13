# Typography

## Roles

| Role | Original | Size / line | CSS | Used for |
|---|---|---|---|---|
| System | Chicago 12 | 12 / 16 px | `.hc-chicago`, `var(--hc-font-chicago)` | Menu bar, menu items, window titles, button names, dialog text, checkbox and radio labels |
| Text | Geneva 12 | 12 / 16 px | `.hc-geneva`, `var(--hc-font-geneva)` | Fields, Message box, body copy; the only role safe for Vietnamese and other diacritics |
| Small | Geneva 9 | 9 / 12 px | `.hc-geneva-9`, `var(--hc-font-geneva-small)` | Card counters, icon captions, footnotes |
| Script | Monaco 9 | 9 / 12 px | `.hc-monaco`, `.hc-script` (keeps line breaks) | HyperTalk, code samples |
| Serif | New York 12 | 12 / 16 px | `.hc-serif` | Optional book-like body text; never in chrome |

Chicago 12 metrics (high confidence, from the bitmap strike): ascent 12, descent 3, leading 1 → 16 px line; cap height 9, x-height 7, 2 px stems, 4 px space. Geneva 12: ascent 12, descent 3, leading 1 → 16 px. Geneva 9: 10 + 2 → 12 px. Monaco 9: 6 px advance, 9 + 3 → 12 px.

## Sizes

HyperCard's Style menu offers 9, 10, 12, 14, 18, 24. The paired line heights are 12, 12, 16, 18, 22, 28 (`.hc-size-9` … `.hc-size-24`). HyperCard's field `textHeight` default is `trunc(4/3 × textSize)`, which is why Geneva 12 lands on 16.

## Styles

`.hc-style-bold`, `-italic`, `-underline`, `-outline`, `-shadow`, `-condense`, `-extend`. Outline and shadow were algorithmic on the Mac (the bitmap was traced or offset); the CSS uses a 1 px text stroke and a 1 px hard text shadow. Condense and extend change letter spacing by exactly 1 px.

## Fonts on the web

Apple's Chicago, Geneva, Monaco and New York are copyrighted and trademarked and are not in this repo.

`css/fonts.css` defines three role faces and maps them to sources in order:

1. Files you place in `fonts/` (see `fonts/FONTS.md`): `ChicagoKare.woff2`, `FindersKeepers.woff2`, `Monaco9.woff2`. These are open, pixel-exact recreations drawn at 16 px; the stylesheet uses `size-adjust` so that `font-size: 12px` puts every glyph on the 16 px grid.
2. Fonts installed on the machine (`local()`): Chicago Kare, ChiKareGo2, FindersKeepers, Geneva 9.1, Monaco 9.
3. macOS system fonts: Krungthep and Silom carry Chicago's Latin glyphs; Geneva.ttf and Monaco.ttf still ship with macOS and cover Vietnamese; Times stands in for New York (Apple's New York is unreachable from Chromium).

Crispness: `.hc` sets `-webkit-font-smoothing: none`, which produces true 1-bit text in Chromium and WebKit on macOS. Other platforms anti-alias; only bitmap-style recreations look right there.

## Do / don't

- Do keep system text in Chicago and user text in Geneva. A field in Chicago reads as a button; a menu in Geneva reads as a web page.
- Do write button names in Title Case with a real ellipsis ("Print…").
- Don't use weights other than normal/bold, don't use sizes outside the six, don't apply `letter-spacing` other than ±1 px, don't `text-transform`.
- Don't put Vietnamese in a Chicago stand-in; the macOS stand-ins lack the diacritics and will fall back mid-word.
