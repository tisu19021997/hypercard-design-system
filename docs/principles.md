# Principles

HyperCard's look is a consequence of its hardware and of Apple's *Human Interface Guidelines* as they stood in 1987. Reproducing the look means reproducing the constraints.

## 1. One bit per pixel

The compact Macintosh had a 512 × 342 screen of pure black and white pixels. There was no gray, no alpha, no anti-aliasing. Every visual device in HyperCard exists to work within that:

- **Gray is a pattern.** QuickDraw's `ltGray`, `gray` and `dkGray` are 8 × 8 dither tiles (25 %, 50 %, 75 % coverage). HyperCard's Patterns palette is 40 such tiles. Scroll bar tracks, the desktop, inactive titles, disabled text are all patterns, never a color.
- **Selection is inversion.** Highlighting a menu item, a pressed button or selected text flips every pixel of its rectangle.
- **Depth is a hard shadow.** A window casts a 1 px black line at its right and bottom. A shadow-style button casts 2 px. That is the whole vocabulary of depth.
- **Softness is dither.** A disabled button is drawn through a 50 % mask so that half its pixels disappear. A dissolve is a dither that gets denser each frame.

In CSS this means two colors, `-webkit-font-smoothing: none`, `image-rendering: pixelated`, pattern backgrounds and mask images. It never means `opacity`, `rgba`, `blur` or a gray hex.

## 2. Whole pixels at 72 dpi

Apple's Toolbox draws with integer coordinates, and the metrics are exact: a 20 px menu bar (19 white rows and 1 black line), a 19 px title bar plus its 1 px bottom line, a 20 px push button, a 16 px scroll bar, a 59 px OK button, a 12 px checkbox whose label starts 16 px in. `tokens/hypercard.tokens.json` records each of these with its source. A modern 4 or 8 pt spacing grid is not HyperCard; use the numbers.

## 3. Two voices of type

The Macintosh had a *system font* and *application fonts*. Chicago 12 speaks for the machine: menus, titles, button names, alerts. Geneva 12 speaks for the user's content: fields, the Message box, body copy. Geneva 9 is for small labels and Monaco 9 for scripts. Everything sits on a 16 px (or 12 px for the 9 pt sizes) line. Bold Chicago does not exist as a separate face; Chicago *is* bold-looking. Keeping the two voices apart is the single most recognisable trait of a HyperCard stack.

## 4. Cards, not pages

The unit of design is a fixed 512 × 342 card. Content that does not fit goes on the next card, reached by an arrow at the bottom. A scrolling field is the only scrolling surface. Layout is absolute: every object has a `rect` in card coordinates, and a background keeps the same objects at the same pixels across all its cards. Web layout tools (flex, grid) are fine as implementation, but the result must be a fixed-size, absolutely-composed card.

## 5. Stepped motion

A Mac Plus redrew the screen in visible stages. HyperCard turned that into a feature: *visual effects*. A dissolve is a sequence of increasingly dense dither patterns; a wipe is a line marching across the card; a checkerboard replaces 16 × 9 squares in two passes; venetian blinds drop nine strips. Nothing eases, nothing fades through gray, nothing overshoots. The effects module reproduces this at a default 12 frames per second. When you want something to appear or vanish, cut or use an effect; never `transition`.

## 6. Nothing hovers

There was one mouse button and no hover state. Feedback is: the browse hand cursor over things you can click, inverse video while the button is held, and the effect when the card changes. Adding hover colors or focus glows breaks the illusion faster than anything else.

## 7. Where the numbers come from

Each token carries a confidence:

- **High**: read from Apple's source (e.g. the System 7 `MenuMgr`, `WindowMgr`, `ControlMgr` CDEFs and WDEFs), *Inside Macintosh* volumes I and V, or the HyperCard 2.x *Script Language Guide*.
- **Medium**: measured from multiple screenshots or emulator captures that agree within a pixel.
- **Low**: reconstructed from prose or a single image.

The full reports are in `research/01-hypercard-ui.md`, `02-classic-mac-metrics.md`, `03-fonts.md`, `04-stack-conventions.md`.
