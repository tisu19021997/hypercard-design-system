# HyperCard 1.x/2.x visual design: widgets, effects, cursors, fonts

Research report, 2026-09-11. Confidence: **H** = Apple primary source or Apple source code; **M** = near-primary/secondary (Goodman, DeVoto, recreations reading the file format) or inferred from figures; **L** = recreation-only or inference.

## 1. Card, window, menu bar, Message box, palettes

- Card size **512 × 342 px** in 1.x; the card extends under the menu bar on the original screen; on larger screens it is a fixed-size window with no grow box and no scroll (Goodman ch.4) **H**. Bitmaps are 1-bit (WOBA compressed); the stack header stores 40 patterns × 8 bytes (hypercard.org file format) **M**.
- 2.x allowed arbitrary card sizes with width a multiple of 16; New Stack / Resize dialogs offer presets (e.g. "Classic 9-inch") and a drag corner showing pixel dimensions (Ref 2.3.5) **H**. The window's horizontal position snaps to a multiple of 16 (SLG) **H**.
- 2.x card window "has neither scroll bars nor a visible size box"; it has a title bar, zoom box, and a close box when more than one stack is open (SLG ch.2) **H**.
- Title bar: Apple's System 7 WDEF computes ascent + descent + 4, forced odd, minimum 19 → **19 px** for Chicago 12 (`StandardWDEF.a`) **H**. HIG 1992: utility title bars "at least 19 pixels high, the height of a document window title bar"; untitled utility drag region 11 px filled with a 25% pattern **H**. Inside Macintosh says "20 pixels" (includes the frame line) **H**. Close box 13-px cell placed 9 px from the left; zoom box inset ~20 px from the right; stripes are a pattern fill aligned mod 8 **H**.
- Menu bar always present in 1.x at the top of the screen; scripts may hide/show it; height **20 px**; text 12-point Chicago (IM Toolbox-128; HIG) **H**. Tear-off menus detach after a 3-px drag (HIG) **H**.
- Message box: special window with a close box and drag area, "room for one line of text", appears near the bottom of the screen (Ref 2.3.5; UG 1987) **H**; "a thin grey bar" where a title bar would be (Goodman) **M**. Default font Geneva 12 (HTRef 2.4 textFont/textSize) **H**. Exact pixel dimensions not documented **L**.
- Tools palette: eighteen tools, 3 columns × 6 rows: Browse, Button, Field / Select, Lasso, Pencil / Brush, Eraser, Line / Spray, Rectangle, Rounded Rectangle / Bucket, Oval, Curve / Paint Text, Regular Polygon, Polygon (Ref 2.3.5 figure) **H**. HyperTalk names: browse, button, field, select, lasso, pencil, brush, eraser, line, spray, rect, roundRect, bucket, oval, curve, text, reg poly, poly **H**. Tear off by dragging past the bottom; Option-Tab summons Tools; Tab shows Patterns while painting **H/M**.
- Patterns palette: forty patterns; black preselected; the selected pattern has a white border (Goodman) **M**; IDs 1–40 top-to-bottom then left-to-right → 4 columns × 10 rows **M**. Windows are script-addressable (`pattern window`, `tool window`, `scroll window`, `window "Fatbits"`, `window "navigator"`) **H**. 2.0+ palettes use HyperCard's windoid WDEF 128; variant 2054 gives a 12-pt Chicago title, 1984 a 9-pt Geneva title (DeVoto) **M**.

## 2. Button styles

- Complete 2.x list (SLG, Style): **transparent, opaque, rectangle, roundRect, shadow, checkBox, radioButton, standard, default, oval, popup** **H**. File codes: transparent 0, opaque 1, rectangle 2, roundrect 3, shadow 4, checkbox 5, radiobutton 6, standard 8, default 9, oval 10, popup 11 **M**. 1.x had only the first seven; standard, default, oval, popup arrived in 2.x **H**.
- Transparent: no border, no fill ("invisible" until named/iconed) **H**. Only Transparent and Oval are truly transparent **H**.
- Opaque: white fill, no border **M**.
- Rectangle: single-line (1-px) black border, opaque white interior **M**.
- Shadow: rectangle plus a drop shadow right and below **M**; ~2 px (recreations) **L**.
- Round Rect (the 1.x push button): "a shadowed round rectangle … used commonly in dialog boxes" (Goodman) **M**: 1-px rounded frame plus drop shadow. Corner: WyldCard arc diameter 14 (radius 7) **L**; system.css 6 px **L**.
- Standard (2.x): Toolbox push button, round rect without drop shadow **M/L**. HIG: height **20 px**, OK/Cancel width **59 px**, names 12-point Chicago, ≥ 8 px padding each side **H**. Shift-resizing a roundRect or standard button snaps it to the New Button standard height **H**.
- Default (2.x): Standard plus the Toolbox ring: "three black pixels, separated by a border of one white pixel" (HIG) **H**.
- Check box: square with label; on = an **X** in the box (HIG; SLG Hilite) **H**; 12×12 Toolbox convention **L**; thicker outline while the mouse is down **M**.
- Radio button: on = solid dot in the circle **H**. Families (2.2+) auto-unhilite siblings **H**.
- Oval (2.x): transparent ellipse; hilite inverts the ellipse **M**.
- Popup (2.x): collapsed menu with a title area (Title Width in pixels), always behaves as auto-hilite **H**; Toolbox look: 1-px border, 1-px drop shadow, downward triangle, 12-pt Chicago (HIG) **H**.
- Hilite = inverse video of the whole button while the mouse is down (toggle for check/radio); keyboard activation inverts for 8 ticks; disabled = dithered 50% gray (SLG; HIG) **H**. Auto Hilite default false **H**.
- New Button defaults: style roundRect, name "New Button" shown, no icon, textFont Chicago, textSize 12, textAlign center, plain **H**. Default rectangle in pixels not documented **L**.

## 3. Field styles

- List: **transparent, opaque, rectangle, shadow, scrolling** (SLG; UG 1987) **H**. Codes 0, 1, 2, 4, 7 **M**.
- Transparent (default for new fields, narrow margins, no lines, Geneva 12) **H**. Opaque: white, no border **M**. Rectangle: 1-px black border **M**. Shadow: border plus drop shadow **M** (~2 px **L**). Scrolling: rectangle plus a **16-px** Mac scroll bar at right (IM Toolbox-313; WDEF `scrollBarSize EQU 16`) **H**.
- textFont default Geneva, textSize 12 (pixels), textAlign left, textStyle plain; styles plain, bold, italic, underline, outline, shadow, condense, extend, group **H**.
- textHeight = baseline spacing in pixels; LiveCode documents the inherited default `trunc(4/3 × textSize)` → **16 px for size 12** **M**. fixedLineHeight default false in 2.x, true for pre-2.0 fields; showLines forces it true **H**.
- showLines: dotted line across the full field width at each baseline, not in scrolling fields (Goodman; Ref 2.3.5) **H/M**; 1-on/1-off pixel dash **L**.
- wideMargins: extra space left and right "approximately one character" and top "about one-half line" (Goodman) **M**; recreations use 6 px (WyldCard code) or 15 px (its wiki) **L**.
- Other options: Lock Text (hand cursor, no I-beam), Auto Tab, Don't Wrap, Don't Search, Auto Select, Multiple Lines, Shared Text **H**. Group-style text shows a gray 2-px underline with `show groups` **H**.

## 4. Visual effects

- 2.x syntax: `visual [effect] effectName [speed] [to image]`. Effects: **barn door close | open; checkerboard; dissolve; iris close | open; plain; push left | right | up | down; scroll left | right | up | down; shrink to top | center | bottom; stretch from top | center | bottom; venetian blinds; wipe left | right | up | down; zoom close | open; zoom in | out** (SLG, Visual) **H**. `zoom out` = open, `zoom in` = close **M**; `push` added in 2.2 **H**; 1.x had nine: dissolve, zoom, iris, scroll, wipe, barn door, checkerboard, venetian blinds, plain **M/H**; `cut` is a synonym for plain **M**.
- Speeds: very slowly, slowly, normal (default), fast, very fast **H/M**. Apple never published durations. "No visible difference between fast and very fast except on a Macintosh II"; scroll/zoom run in stages and look jerky at very slow (DeVoto) **M**. WyldCard uses very fast 250 ms, fast 800, slow 1500, very slow 3500 **L**.
- Destination images: black, card (default), gray, inverse, white **H**. With a non-card image the effect runs to that image then cuts to the card; effects chain; only on `go`/find/pop; forgotten at idle; only push, scroll, shrink, stretch, zoom work with `go this card`; windoids unaffected; 1-bit only **H/M**.
- Drawing (DeVoto) **M**: dissolve = successively denser scattered-pixel patterns replacing pixels, altering only pixels that differ · zoom open = expanding rectangles from the last click point, then cut; zoom close = cut, then contracting rectangles to centre · iris = rectangular aperture following the window contour, from/to centre · scroll = destination slides in over the original; push (2.2) = old pushed off as new slides in · wipe = a line sweeps across, destination replaces source behind it, nothing moves · barn door open = double wipe from centre outward; close = edges to centre · checkerboard = **16 × 9** grid, odd squares first then even, each square a top-to-bottom wipe · venetian blinds = **nine horizontal strips** replaced at once, top of each strip down · shrink to / stretch from top, center, bottom (2.x) **L on drawing** · plain = cut.

## 5. Cursors

- `set cursor to` a `CURS` ID or name: 1 I-beam, 2 cross, 3 plus, 4 watch; by name: hand, arrow, busy, none. Reset to the tool cursor at idle. Busy is a beach ball rotating 45° per set (SLG) **H**.
- Guidance: none hides; busy for long handlers; watch for moderate; arrow for selecting objects; cross for painting; hand for links; I-beam for text; plus for cells **M**.
- Browse tool = pointing hand; Button/Field tools = arrow; field drag = crosshair; the hand becomes an I-beam over unlocked text, not over locked text; Find spins the beach ball **H**. Mac cursors are 16×16 with mask and hot spot **H**. HyperCard popularised animated cursors (beach ball) **M**.

## 6. Text sizes and fonts

- Sizes are points = screen pixels; Style menu lists installed sizes: **9, 10, 12, 14, 18, 24** plus Other… **M**.
- Classic System fonts: Chicago, Geneva, Monaco, New York, Courier, Helvetica, Times, Symbol, Venice, London, Athens, San Francisco, Cairo (plus Toronto, Los Angeles, Palatino, Seattle, Taliesin); all by Susan Kare except Venice (Bill Atkinson) **M**. Guaranteed present: Geneva 9 and 12, Monaco 9, Chicago 12 (Goodman) **M**.
- Roles: **Chicago 12** = menus, titles, dialogs, button names **H**; **Geneva 12** = fields, Paint text, Message box **H**; **Monaco 9** = script editor **H**; Geneva = print font, size 10 **H**; Geneva 9 = small utility text (palette titles) **M**. LaserWriter substitution New York→Times, Geneva→Helvetica, Monaco→Courier **M**.
- Dimmed text on 1-bit screens is dithered 50% gray; Chicago was designed to survive it, Geneva was not (HIG) **H**.

## Disagreements and gaps

- Title bar 19 px (HIG, WDEF) vs 20 px (IM prose).
- wideMargins pixels: ~one character (Goodman) vs 6 or 15 px (WyldCard).
- Round-rect radius, shadow offset and default-ring geometry inside HyperCard are not numerically documented by Apple; HIG gives the Toolbox ring (3 black + 1 white) and 20-px height.
- Effect durations: none published.
- Not found: Message box, Tools and Patterns palette pixel dimensions; New Button/New Field default rectangles; 2.x card-size presets.

## Sources

- Apple, HyperCard Script Language Guide: https://cancel.fm/stuff/share/HyperCard_Script_Language_Guide_1.pdf
- Apple, HyperCard 2.3.5 Reference: https://cancel.fm/stuff/share/HyperCard_Reference_1.pdf
- Apple, HyperTalk Reference 2.4 stack export: https://hypercard.org/HyperTalk%20Reference%202.4.pdf
- Apple, HyperCard User's Guide 1987: https://vintageapple.org/macprogramming/pdf/HyperCard_Users_Guide_1987.pdf
- Apple, HyperCard 2.x Installation and New Features: http://www.kenichimaehashi.com/hypercard/mirrors/manuals.info.apple.com/Apple_Support_Area/Manuals/software/0340617AHYPERCARDI.PDF
- Apple, Macintosh Human Interface Guidelines (1992): https://vintageapple.org/inside_r/pdf/Human_Interface_Guidelines_1992.pdf
- Apple, System 7.0 WDEF sample, StandardWDEF.a: https://developer.apple.com/library/archive/samplecode/System_7.0_WDEF/Listings/StandardWDEF_a.html
- Inside Macintosh: Toolbox-189 (title bar), Toolbox-128 (menu bar), Toolbox-299 (buttons), Toolbox-313 (scroll bar); QuickDraw-405 and QuickDraw-370 (cursors)
- Danny Goodman, The Complete HyperCard Handbook: https://archive.org/details/tchch
- Jeanne DeVoto: http://www.jaedworks.com/hypercard/HT-Masters/visual-effects.html · http://www.jaedworks.com/hypercard/scripts/hypertalk-bnf.html · http://www.jaedworks.com/hypercard/scripts/palette.html
- hypercard.org file format: https://hypercard.org/hypercard_file_format/ ; Commands.txt: https://hypercard.org/Pantechnicon/HyperCard/Syntax/Commands.txt
- The HyperCard Center (snippets only): https://www.hypercard.center/HyperTalkReference/pattern · /cursor · /style
- Orange Juice Liberation Front, How HyperCard got its Color Back: https://orangejuiceliberationfront.com/how-hypercard-got-its-color-back/
- hcsimulator.com; sakofchit/system.css; defano/wyldcard (button styles, field styles, cursor, VisualEffectSpeed.java); defano/jsegue; ViperCard reference; hc.quibble.com thread 9053; LiveCode wiki TextHeight; Wikipedia Spinning pinwheel; HandWiki Fonts on Macintosh; Stories of Apple; Macintosh Garden; Low End Mac
