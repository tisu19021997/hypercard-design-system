# Rules for agents building in the HyperCard design system

You are styling a web UI so that it is indistinguishable from Apple HyperCard running on a 1-bit Macintosh (System 6/7, 512×342 card). Follow these rules exactly. When a rule and your taste disagree, the rule wins. When two rules seem to conflict, the more specific one wins. If something is not covered, look it up in `tokens/hypercard.tokens.json` and `research/`, and copy what HyperCard did, not what a modern UI would do.

## 0. Setup

- Import one stylesheet: `css/hypercard.css`. Do not copy its rules into your own CSS; use its classes and custom properties.
- Put `class="hc"` on the root element of the HyperCard-styled region (usually `<body>` or the card). Everything below it renders 1-bit.
- For card transitions import `effects/hypercard-effects.js` and call `go(stage, nextCard, effectString)`.
- Class prefix is `hc-`. Custom property prefix is `--hc-`. Never invent new `hc-*` names in app code; put app-specific classes under your own prefix.

## 1. Color

- Use exactly two colors: `var(--hc-color-black)` (#000) and `var(--hc-color-white)` (#fff).
- Never write any other hex, `rgb()`, `hsl()`, named color, `opacity`, `rgba` alpha, or `filter: brightness/grayscale`. Not for text, not for borders, not for hover states.
- Gray does not exist. To mean gray:
  - as a fill: a pattern, `background: #fff var(--hc-pattern-22); background-size: 8px 8px;` (13 = 25 %, 22 = 50 %, 23 = 75 %).
  - as a disabled/dimmed state: `.hc-dimmed` or the `disabled` attribute on `.hc-button` (a 50 % dither mask over the element).
  - as an inactive window title: `.hc-window.is-inactive`.
- "Selected" and "pressed" are inverse video: black background, white text, the whole rectangle. Use `.is-hilite` or `.hc-hilite`. No tinted backgrounds, no outlines.

## 2. Geometry

- All sizes are integer CSS px at 1×. Use the token values; do not round to a 4/8 px grid and do not use rem/em for layout.
- Card: 512 × 342 (`.hc-card`). Content that must scroll lives in a `.hc-field--scrolling`, not in a scrolling card.
- Borders are `1px solid` black. The only thicker lines are: the dialog inner border (2 px), the pressed checkbox frame (2 px), and the default-button ring (3 px). Nothing else is ever 1.5 px or 2 px.
- Shadows are solid black offsets with no blur: `1px 1px 0` for windows and menus, `2px 2px 0` for shadow-style buttons/fields and the round-rect button, `2px 2px 0` for alt dialogs. Never `box-shadow` with a blur radius, never `drop-shadow()`.
- Corner radii are fixed: round-rect button 7 px, standard/default push button 5 px, default ring 8 px, radio button 50 %, oval button 50 %. Everything else is square.
- Spacing comes from the tokens, e.g. checkbox box at +2, label at +16; menu item padding 14 left / 13 right; title 6 px of white each side of the text.

## 3. Type

- Chicago 12 / 16 px line (`.hc-chicago`, `var(--hc-font-chicago)`): menu titles and items, window titles, button names, dialog messages, checkbox and radio labels, palette labels. Anything the *system* says.
- Geneva 12 / 16 px (`.hc-geneva`): field text, Message box, body copy on cards. Anything the *user* says or reads at length. Geneva covers Vietnamese and other Latin diacritics; Chicago stand-ins do not, so never put user-entered text in Chicago.
- Geneva 9 / 12 px (`.hc-geneva-9`): small labels, card counters, icon-button captions.
- Monaco 9 / 12 px (`.hc-monaco`, `.hc-script`): HyperTalk scripts, code.
- Serif (`.hc-serif`, New York stand-in): only when the card is deliberately "typeset" (a book-like stack). Never in chrome.
- Sizes are only 9, 10, 12, 14, 18, 24 (`.hc-size-N`), with their paired line heights. No other font sizes.
- Styles are only bold, italic, underline, outline, shadow, condense, extend (`.hc-style-*`). No weights other than normal/bold, no letter-spacing values other than ±1 px, no text-transform.
- Do not set `font-smoothing` to anything; `.hc` already turns it off. Add `.hc-smooth` to a block only when the product decides readability beats fidelity (long Vietnamese passages qualify).

## 4. Components: use these, do not restyle them

| Need | Markup |
|---|---|
| Menu bar | `.hc-menubar` > `span`s (`.is-open` for the pulled-down title). Pulled menu: `ul.hc-menu` > `li` (`.hc-key` for ⌘ keys, `.hc-separator`, `.is-dimmed.hc-dimmed`, `.is-checked`). |
| Document window | `.hc-window` > `.hc-titlebar` (`button.hc-close`, `span.hc-title`, `button.hc-zoom`) + `.hc-window-content` (+ `.hc-growbox`). `.is-inactive` when not frontmost. |
| Palette / Message box | `.hc-windoid` > `.hc-dragbar` (+ `button.hc-close`) + content. Message box adds `.hc-message-box` and one `input`. |
| Alert / dialog | `.hc-dialog` > `.hc-dialog-body` + `.hc-dialog-buttons` (Cancel = `--standard`, OK = `--default`, OK on the right). |
| Button | `button.hc-button.hc-button--{transparent|opaque|rectangle|shadow|roundrect|standard|default|oval|popup}`. Icon + caption: `.hc-button--icon` > `.hc-icon` + text. |
| Check box / radio | `label.hc-checkbox` / `label.hc-radio` > `input` + `span`. |
| Field | `.hc-field.hc-field--{transparent (none)|opaque|rectangle|shadow|scrolling}` + optional `--lines`, `--wide`, `--locked`. Works on `div`, `textarea`, `p`. |
| Scroll bar | Real scrolling elements get the look automatically inside `.hc`. Decorative: `.hc-scrollbar` > `.hc-arrow--up`, `.hc-thumb`, `.hc-arrow--down`. |
| Palettes | `.hc-palette.hc-palette--tools` (3 × 6), `.hc-palette.hc-palette--patterns` (4 × 10, `.hc-pattern-N` children, `.is-selected`). |
| Nav arrows / counter | `.hc-nav` at the card bottom; `.hc-counter` for "Card 3 of 12". |
| Rules | `hr.hc-rule` (solid) / `.hc-rule--dotted`. |

Rules for using them:
- Button names are verbs or nouns in Title Case with no icons inside push buttons; ellipsis "…" (one character) when a dialog follows.
- Exactly one default button per dialog. Cancel is 59 px wide, standard style, left of OK.
- Do not add hover states. HyperCard has none. The browse hand is the only hover feedback (`.hc-button` already sets it).
- Pressed = `:active` inverse video (already in the CSS). Do not animate presses.
- A dialog is centered on the card (or screen) with an 8 px total frame (1 black, 2 white, 2 black, 3 white; `.hc-dialog` draws it).
- Icons are 32 × 32, 1-bit, white transparent, drawn with `shape-rendering: crispEdges`. Put them in `.hc-icon`.

## 5. Motion

- No CSS `transition`. No easing. No `opacity` animation. No transform-based slide-ins except the ones inside the effects module.
- Card to card: `HyperCardEffects.go(stage, next, 'visual effect <name> [speed] [to black|white|gray|inverse]')`.
  - Names: `barn door open|close`, `checkerboard`, `dissolve`, `iris open|close`, `plain`, `push left|right|up|down`, `scroll left|right|up|down`, `shrink to top|center|bottom`, `stretch from top|center|bottom`, `venetian blinds`, `wipe left|right|up|down`, `zoom open|close`.
  - Speeds: `very slowly`, `slowly`, (none), `fast`, `very fast`.
- Element appearing or leaving (popup, bubble, tooltip): `HyperCardEffects.hide(el, 'dissolve fast')` or a wipe/iris/barn door/shrink. Show with a cut.
- Idle indicators: `.hc-blink` (2-step) or `.hc-ants` (marching selection). Nothing pulses smoothly.
- Respect `prefers-reduced-motion`: the module already cuts instead of animating; your own code must not add motion behind its back.

## 6. Layout conventions from Apple's stack guidelines

- Navigation lives at the bottom of the card: Prev arrow bottom-left, Next arrow bottom-right, Home/Return near them. Put a card counter in Geneva 9 between them if the stack is linear.
- Consistent placement across cards: the same control is at the same pixel on every card of a background.
- Keep text in fields, not in paint. Fields can be searched and copied.
- Titles in Chicago 18 or 24 at the top; body in Geneva 12; captions in Geneva 9.
- Buttons that go somewhere use icon + caption (`.hc-button--icon`). Buttons that do something are round-rect with a name.
- One idea per card. If it does not fit in 512 × 342, add a card, not a scroll bar.

## 7. Checklist before you finish

- [ ] Only `#000`/`#fff` appear in your CSS (grep for `#[0-9a-f]{3,6}`, `rgb`, `hsl`, `opacity`).
- [ ] No `border-radius` except the tokens' values; no `box-shadow` with blur; no `transition`; no `filter`.
- [ ] Every font declaration is a role class or `--hc-font-*` with the paired line height.
- [ ] Sizes are integers from the tokens.
- [ ] Every disabled thing is dithered, every selected thing is inverse video.
- [ ] Card transitions go through `HyperCardEffects.go`; nothing fades.
- [ ] User text is in Geneva (Vietnamese-safe), system text in Chicago.
- [ ] `class="hc"` is on the root of the styled region.

## 8. Do / don't at a glance

| Do | Don't |
|---|---|
| `background: #fff var(--hc-pattern-22); background-size: 8px 8px` | `background: #888` or `opacity: .5` |
| `box-shadow: 2px 2px 0 #000` | `box-shadow: 0 4px 12px rgba(0,0,0,.2)` |
| `.hc-button.hc-button--roundrect` | a styled `<div>` with `border-radius: 12px` |
| `HyperCardEffects.go(stage, card, 'wipe left fast')` | `transition: opacity .3s ease` |
| `.hc-chicago` for a title | `font-weight: 600; letter-spacing: .02em` |
| `.hc-dimmed` | `color: #999` |
| `:active` inverse video (built in) | hover color changes |
| 512 × 342 card, several cards | one long scrolling page |
