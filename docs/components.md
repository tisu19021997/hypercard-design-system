# Components

All classes are in `css/hypercard.css`; all numbers are in `tokens/hypercard.tokens.json`. Wrap the styled region in `.hc`.

## Menu bar and menus

```html
<div class="hc-menubar"><span class="hc-apple"></span><span class="is-open">File</span><span>Edit</span><span>Go</span></div>
<ul class="hc-menu" style="left: 29px; top: 20px">
  <li>New Stack…</li>
  <li>Open Stack…<span class="hc-key">⌘O</span></li>
  <li class="hc-separator"></li>
  <li class="is-dimmed hc-dimmed">Save a Copy…</li>
  <li class="is-checked">Plain</li>
</ul>
```

- Bar: 20 px = 19 white rows + 1 px black line; Chicago 12 with baseline at row 14; first title's text 7 px from the left; each title cell is text width + 13. An open title inverts rows 1 to 18; row 0 stays white.
- Pulled menu: 1 px border with no top line (the menu hangs from the bar's line, so `top: 20px` puts the first item right under it), 1 px hard shadow, items 16 px tall, 14 px left padding (checkmark column) and 13 px right; separators are a dotted 1-on/1-off rule.
- Hilite (`.is-hilite`, `:hover`) inverts the item. Dimmed items are dithered.

## Window

```html
<div class="hc-window" style="width: 514px">
  <div class="hc-titlebar"><button class="hc-close"></button><span class="hc-title">Home</span><button class="hc-zoom"></button></div>
  <div class="hc-window-content"><div class="hc-card">…</div><div class="hc-growbox"></div></div>
</div>
```

- Frame 1 px black + 1 px hard shadow right/bottom. Title bar 19 px, 1 px line beneath.
- Six 1 px stripes on rows 4, 6, 8, 10, 12, 14. Title in Chicago 12 centered with 6 px of white on each side.
- Close box: 11 × 11 hollow square 10 px in from the frame. Zoom box: same on the right with a 6 px inner square top-left. Pressing fills the box.
- `.is-inactive`: stripes and boxes disappear, title is dithered.
- Grow box: 15 × 15 at bottom right with the two overlapping squares.

## Windoid and Message box

```html
<div class="hc-windoid hc-message-box"><div class="hc-dragbar"><button class="hc-close"></button></div><input value="go to card 3"></div>
```

An 11 px pinstriped drag bar with a small close box; Message box body is 22 px Geneva 12.

## Dialogs

```html
<div class="hc-dialog">
  <div class="hc-dialog-body"><div class="hc-chicago">Delete this card?</div></div>
  <div class="hc-dialog-buttons"><button class="hc-button hc-button--standard">Cancel</button><button class="hc-button hc-button--default">OK</button></div>
</div>
```

- `.hc-dialog` = dBoxProc: 1 black, 2 white, 2 black, 3 white (8 px total).
- `.hc-dialog-plain` = plainDBox: 1 px border. `.hc-dialog-alt` = altDBoxProc: 1 px border + 2 px shadow.
- Body padding 13 px. Buttons 12 px apart, OK rightmost and default.

## Buttons

Eleven HyperCard 2.x styles as modifiers on `.hc-button` (20 px tall, Chicago 12, browse-hand cursor):

| Modifier | Look |
|---|---|
| `--transparent` | Name only, no frame (the default for icon buttons on cards) |
| `--opaque` | White fill, no frame |
| `--rectangle` | 1 px frame |
| `--shadow` | 1 px frame + 2 px shadow |
| `--roundrect` | HyperCard 1.x push button: 7 px corners + 2 px shadow, min 59 px |
| `--standard` | Toolbox push button: 5 px corners, no shadow, min 59 px |
| `--default` | Standard + 3 px ring 1 px outside (ring radius 8) |
| `--oval` | Ellipse frame |
| `--popup` | Frame + shadow + ▼ |
| `--icon` | Column of `.hc-icon` (32 × 32) + Geneva 9 caption |

States: `:active` / `.is-hilite` inverts the whole rectangle; `disabled` / `.is-dimmed` dithers it. No hover.

Checkbox and radio: `label.hc-checkbox > input + span`, `label.hc-radio > input + span`. 12 × 12 box 2 px in, label at 16 px; on = corner-to-corner X or 6 px dot; pressed = 2 px frame.

## Fields

`.hc-field` on a `div`, `p` or `textarea`. Geneva 12/16, 1 px side margin.

| Modifier | Look |
|---|---|
| (none) | transparent |
| `--opaque` | white fill |
| `--rectangle` | 1 px frame |
| `--shadow` | frame + 2 px shadow |
| `--scrolling` | frame + 16 px scroll bar (WebKit pseudo-element styled) |
| `--lines` | showLines: dotted rule under every 16 px line |
| `--wide` | wideMargins: 6 px sides, 8 px top |
| `--locked` | browse hand, no selection |

## Scroll bar

Real scrollers inside `.hc` are styled via `::-webkit-scrollbar`: 16 px wide, 25 % gray track (`ltGray`, pattern 13), hollow arrows, a fixed white thumb with 1 px lines. A decorative `.hc-scrollbar` exists for mockups.

## Palettes

- `.hc-palette--tools`: 3 × 6 cells of 28 × 20 with 1 px black grid; `.is-selected` inverts a cell. Tool icons are not included; draw them as 1-bit SVG or text.
- `.hc-palette--patterns`: 4 × 10 cells of 24 × 16. Fill order is top-to-bottom then left-to-right (pattern 1 top-left, 11 top of column 2, …). Children carry `.hc-pattern-N`.

## Patterns

`--hc-pattern-1` … `--hc-pattern-40` (transparent black-on-clear) and `--hc-pattern-N-opaque` (white-backed). QuickDraw: `--qd-white`, `--qd-ltGray` (=13), `--qd-gray` (=22), `--qd-dkGray` (=23), `--qd-black`. Always `background-size: 8px 8px`.

## Utilities

`.hc-hilite` (inverse), `.hc-dimmed` (dither), `.hc-ants` (marching selection), `.hc-blink`, `.hc-rule`, `.hc-rule--dotted`, `.hc-shadow`, `.hc-frame`, `.hc-center`, `.hc-nav` (bottom navigation row), `.hc-counter`, `.hc-desktop` (50 % gray desktop pattern), `.hc-smooth` (opt back into anti-aliasing for a block).
