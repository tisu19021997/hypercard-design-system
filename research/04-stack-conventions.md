# HyperCard stack visual conventions

Research report, 2026-09-11. Confidence key: **High** = read directly in a primary source (Apple manuals, Goodman 1987/88, DeVoto, the actual ICON resources). **Medium** = consistent across secondary sources or inferred from primary artifacts. **Low** = plausible but not verifiable.

Caveat: the full text of Apple's *HyperCard Stack Design Guidelines* (Addison-Wesley, 1989) is not online. Section 1's specific rules are reconstructed from what Apple's own shipped stacks did, Danny Goodman's *Complete HyperCard Handbook*, Jeanne DeVoto's "Art of Visual Effects", and Jakob Nielsen's 1989 stack review.

## 1. Apple's *HyperCard Stack Design Guidelines* (1989)

**Bibliographic facts (High).** Apple Computer Inc., Addison-Wesley, Apple Technical Library, Nov 1989, ISBN 0-201-51784-1. Chapters cover graphics, buttons, text, sound, stack structure and the user interface.

**Principles (Medium).**
- *Consistency*: same navigation controls in the same place on every card of a background. Nielsen (1989) names the failure mode: the return icon wandering between corners across screens.
- *Card metaphor*: stacks are rings of index cards ("as if they're held together by a ring", User's Guide 1987 p. 15).
- *Feedback*: every button visibly reacts (Auto hilite inverse flash). "With 'Auto hilite' unchecked, you receive no visual feedback when you click a button" (UG 1987 p. 149).
- *Effects carry meaning, not decoration.*

**Navigation button placement (Medium).** Prev/Next arrows at the bottom of the card (UG 1987 p. 30). Home button lower left in the ideas stacks (Goodman); top-left in the Address stack. Help stack: index tabs along the bottom edge plus an Exit tab. A Return (bent arrow) button goes back where you came from, distinct from Prev.

**Visual-effect conventions (Medium; High that the community taught it).**
- Wipe/scroll left = next card; wipe/scroll right = previous card (flipping a card file).
- Zoom open / iris open / barn door open = going deeper; the matching close effect = coming back out. Goodman: the return link uses the opposite of the effect that brought you there.
- Dissolve = soft, non-directional jump (Home, cross-stack). Scroll up/down = new topic.
- Plain cut is the default and "often the most suitable"; effects are "a subtle language of hints" (DeVoto). Nielsen praises fast scroll for page turns within an article and slower scrolls between articles, "to establish different navigational classes."
- Zoom open emanates from the click point; iris always from centre.
- Speeds: very slow | slow | (normal) | fast | very fast. Intermediates: to black | to white | to gray | to inverse (Goodman p. 463).

**Warning against overuse (Medium).** Explicit in DeVoto; implicit in Nielsen.

## 2. The Home stack and Apple's standard stacks

**Home card, 1.x (High).** Centred header "~ Home Card ~", then a grid of 32×32 icon buttons with a one-word Geneva 9 caption under each, 4 rows × 6 columns (Intro, Help, Address, Documents, File Index, Book Shelf / Phone, To Do, Weekly, Calendar, Slide Show, HyperCalc / Art Ideas, Clip Art, Card Ideas, Button Ideas, Stack Ideas, Quotations / Plots … clock). User Preferences is the last card of the Home stack.

**Home stack, 2.x (High).** Five Home cards ("Welcome to HyperCard", "Stack Kit", three blank), three Search Paths cards, Preferences. Row of buttons at the bottom moves through the Home cards. "Welcome to HyperCard" set in bitmap Bookman.

**Standard stacks, 1.2 (High).** Address, Area Codes, Art Ideas, Book Shelf, Button Ideas, Card Ideas, Clip Art, Datebook, Documents, File Index, Help (+ Samples, Index), Home, HyperCalc, Phone, Plots, Quotations, Slide Show, Stack Ideas. "Art Bits" is the 2.x name of Art Ideas/Clip Art.

**Help stack (High).** Tabs along the card's bottom; Exit tab returns to the previous stack. Help fields are locked text.

**Index card / Rolodex metaphor (High).** Address cards drawn as a Rolodex card with a tab edge; Card Ideas held a Rolodex with 26 tab buttons; Datebook uses a spiral-bound drawing. Fields overlay drawn ruled paper or use Show Lines.

**Button Ideas (High).** Text Buttons card shows round-rect buttons named Next Card, Home, Sort, Prev Card, Help, Find, First Card, Last Card, Show Cards, Any Card, Export Text, Return, Import Text.

**Where icons live (High).** `ICON` resources in the stack, Home stack or HyperCard itself; the Icon dialog shows a catalogue (e.g. "Icon ID: 1012 'Return Arrow'"). Susan Kare drew the HyperCard graphics / Art Bits (Medium).

## 3. Built-in 32×32 1-bit icons

**Format (High).** `ICON` resources: 32×32, 1 bit/pixel, 128 bytes, no mask (white is transparent on the card).

**Core built-in IDs (High)** (from WyldCard's `button-icons.xml` dump and HyperCardPreview's `icon_NNNN.tif` set):

| ID | Name | ID | Name |
|---|---|---|---|
| 1000 | Stack (pile of cards) | 1011 | Home (house) |
| 1001 | HyperCard (pile + hand) | 1012 | Return Arrow (bent arrow) |
| 1002 | Paint Doc | 1013 | Next Arrow (block → with drop shadow) |
| 1003 | MacPaint | 1014 | Prev Arrow (block ←) |
| 1004 | Write Doc | 1015 | Small Button (round dither target) |
| 1005 | MacWrite | 1016 | Ex Lge Prev Hand |
| 1006 | Mac | 1017 | Phone |
| 1007 | ImageWriter | 1018 | Marker Cross |
| 1008 | LaserWriter | 1019 | ResEdit |
| 1009 | Eye | 1020 | Good Question (? in diamond) |

Other common built-ins: 2162 Lge Return Arrow · 6043 PREV / 6044 NXT (thin arrows) · 8347/8348 Lt Arrow Prev/Next (hollow) · 8349/8350 Prev./Next Double (chevrons) · 30557 First Card Arrow / 26865 Last Card Arrow · 23717/23718 Small Rt/Left Triangle · 20689 Sml Home, 2181 TINY Home, 20098 White Home, 11045 Sml Black Home · 24694 HC Help, 25002 Med Help, 8980 Blk Help, 2507 White ?, 31685 Black ? · 28654 Search (magnifier over cards) · 20186 Sort · 3071 Close Box · 2478 Tell About (speech balloon) · 18222 Stack Info · 2980 Address · 4432 To Do · 12722 Appointments · 25309 Art Bits · 27056 Button Ideas · 7012 Stack Ideas · 128 Link To · 129 Visual Effect · 2101–2106 Dice. No New Card / Delete Card icons; those were menu commands.

**Style, observed from the bitmaps (High).**
- Pure 1-bit: solid black on white, no anti-aliasing, no gray. Depth faked with 50% stipple dither and hard 2-px offset drop shadows along the bottom-right edge.
- Outline-first: a 1-px black outline with white interior; a minority are solid silhouettes; Apple offered "white" and "black" variants of key glyphs (Home, ?, arrows).
- Isometric-ish 45° fanned stack of cards is the HyperCard brand mark.
- Arrows are fat block arrows (~24 px long, shaft ~8 px, head ~16 px), not thin lines; the Return arrow is a block arrow with a right-angle bend.
- The house (1011): two-storey front elevation, chimney, 2×3 window grid, centred door, roof overhang, 24×22 px footprint.
- Glyphs roughly centred with 2–4 px margin.

## 4. Browse hand, Message Box, Tools/Patterns palettes

**Browse hand (High, bitmap read directly).** 16×16 1-bit + mask, hotspot at the fingertip (6,0). Right hand, back view, index finger up, thumb out left, three curled fingers, black outline, white fill. `#` black, `o` white, `.` transparent:

```
......###.......
.....#oo##......
.....#oo##......
.....#oo##......
.....#oo##......
.....#oo##......
.###.#oo#####...
#oo###oo#o#o###.
.#oo##oo#o#o#o##
..#oo#oooooo#o##
..#oo#oooooooo##
...#oooooooooo##
....#ooooooooo##
....#oooooooo##.
.....#ooooooo##.
.....#ooooooo##.
```

The pointer becomes an I-beam over editable text, an arrow outside the card, a crosshair for shape tools, a spinning beach ball during Find/Sort, a watch during long scripts.

**Message Box (High).** A "windoid": one line of text, 1-px black frame, drop shadow, a thin gray pinstripe drag bar across the top with a close box at left, Cmd-M toggles, appears near the bottom of the screen. Visual effects do not affect windoids.

**Tools palette (High).** Tear-off palette of eighteen tools in 3 columns × 6 rows of 1-px cells: Browse, Button, Field / Select, Lasso, Pencil / Brush, Eraser, Line / Spray, Rectangle, Round Rect / Bucket, Oval, Curve / Text, Regular Polygon, Polygon. A rule separates general tools from paint tools; the selected tool is inverted. Torn off it gains a windoid title strip and close box.

**Patterns palette (High; count Medium).** Tear-off; Tab toggles it while painting; double-click a pattern to edit it in an 8×8 editor. 40 patterns in a 4-wide × 10-tall grid; the selected cell has a heavy border.

## 5. Iconic HyperCard-era details (High unless noted)

- **Card 512 × 342**, 1-bit, extends under the menu bar on the original screen; on larger screens a fixed-size window with no grow box until 2.0.
- **Button styles** (UG 1987 p. 149): Transparent · Opaque (white, no border) · Rectangle (white, 1-px black border) · Shadow (white, 1-px frame, drop shadow right and bottom) · Round rect ("a standard Macintosh button", shadowed rounded rectangle, ~8-px radius) · Check box · Radio button. 2.x added Standard, Default (heavy ring), Oval, Popup. Show Name draws the name centred in Chicago 12.
- **Invert on click.** Auto hilite inverts the whole button rectangle, icon and name, while the mouse is down. Radio hilite = black dot; check box hilite = an X, not a tick.
- **Field styles**: Transparent, Opaque, Rectangle (1-px border), Shadow, Scrolling (Mac scroll bar at right). Show Lines draws a dotted line across the full width at each line pitch, like ruled paper. Wide Margins. Lock Text keeps the hand cursor. Default field font Geneva 12; labels Chicago 12 or Geneva 9/10 bold; display type in New York / Bookman / Venice bitmaps.
- **Card counter.** "Card 3 of 12" convention from `the number of this card` / `the number of cards`. "Recent" shows a 42-thumbnail grid of visited cards.
- **Gray backgrounds.** Ideas stacks fill the area around a drawn index card with the 50% gray pattern so the card reads as an object on a desk.
- **Selection feedback**: marching-ants dotted rectangle under the Button/Field tool.
- Scripts can hide the menu bar for kiosk stacks.

## 6. Manuals

User's Guide (1987/88): white cover, large sans title, Garamond body, 1-bit screenshots, marginal tips and warnings. Home card 1.x header ornamented "~ Home Card ~"; captions Geneva 9.

## Sources

Primary
- Apple, HyperCard User's Guide (1987): https://vintageapple.org/macprogramming/pdf/HyperCard_Users_Guide_1987.pdf
- Apple, HyperCard User's Guide (1988): https://vintageapple.org/macbooks/pdf/HyperCard_Users_Guide_1988.pdf
- Apple, HyperCard 2.3.5 Reference: https://cancel.fm/stuff/share/HyperCard_Reference_1.pdf
- Apple, HyperCard 2.x Installation & New Features: https://download.info.apple.com/Apple_Support_Area/Manuals/software/0340617AHYPERCARDI.PDF
- Danny Goodman, The Complete HyperCard Handbook: https://archive.org/details/tchch
- Jeanne DeVoto, The Art of Visual Effects: http://www.jaedworks.com/hypercard/HT-Masters/visual-effects.html
- WyldCard built-in icon manifests: https://raw.githubusercontent.com/defano/wyldcard/master/src/main/resources/button-icons/button-icons.xml
- HyperCardPreview icon/cursor resources: https://github.com/PierreLorenzi/HyperCardPreview
- hcsimulator.com: https://hcsimulator.com/
- Jakob Nielsen, Three Large HyperCard Stacks: A 1989 Review: https://www.nngroup.com/articles/cdrom/
- WyldCard Properties wiki: https://github.com/defano/wyldcard/wiki/Properties

Guidelines book records (metadata only)
- https://books.google.com/books/about/HyperCard_Stack_Design_Guidelines.html?id=mIN2QgAACAAJ
- https://dl.acm.org/doi/10.5555/575686
- https://newmediamuseum.org/hypermedia/hyperstack-design-2/

Secondary
- https://stonetools.ghost.io/hypercard-mac/
- https://rogerwong.me/2025/09/why-we-still-need-a-hypercard-for-the-ai-era
- https://erinjrimmer.substack.com/p/the-utterly-obscure-history-of-the
- https://www.leadedsolder.com/2026/09/08/hypercard-custom-fonts-in-resources.html
- https://archives.somnolescent.net/web/mari_v2/junk/hypercard/
- https://lobste.rs/s/hrxjbs/art_bits_from_hypercard
- https://www.gregraven.org/articles/md_Ext_index
- https://lowendmac.com/2003/remembering-hypercard/
- https://hc.quibble.com/thread/5352
- https://www.hyperactivesw.com/mctutorial/rrpostimport.html
- https://en.wikipedia.org/wiki/HyperCard
- https://archive.org/details/hypercard_hypercard-20-visual-effects
- https://hypercard.org/
