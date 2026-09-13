# Classic Macintosh (System 6/7, 1-bit, 72 dpi) UI pixel metrics

Research report, 2026-09-11. Confidence key: **high** = Apple primary source or actual Apple/System code; **medium** = faithful reimplementation (Executor emulator, written from screenshots and Inside Macintosh in 1986–96) or HIG prose; **low** = modern recreation or inference.

Two primary sources anchor this: Apple's System 7 document-window WDEF assembly source (`StandardWDEF.a`, Beta-4) and the Executor emulator's WDEF/CDEF/MDEF C code. Where they agree the fact is rated high.

## 1. Menu bar and pull-down menus

| Fact | Value | Source | Conf. |
|---|---|---|---|
| Menu bar height | **20 px**, white, 1-px black bottom border (row 19) | IM Toolbox-128, Toolbox-92 | high |
| Derivation | `MBarHeight = ascent + descent + leading + 4` = 12+3+1+4 = 20 for Chicago 12 | Executor `stdmbdf.c` | medium |
| Font | Chicago 12, plain | IM Toolbox-92; HIG | high |
| Title baseline | y = 14 from top of screen | Executor `stdmbdf.c` | medium |
| First title left edge | text starts 7 px in (`MENULEFT = 10`, minus 3) | Executor | medium |
| Spacing between titles | each title cell = `StringWidth + 13` (≈6–7 px padding each side) | Executor `menu.h` | medium |
| Highlighted title | title cell inverted, white on black, the full white area above the black line | Executor; screenshots | medium |
| Disabled title/item | painted with `gray` pattern in `notPatBic`: 50% dither knocks out alternate pixels | Executor; HIG-146 | high |
| Pull-down menu frame | 1-px black frame; 1-px drop shadow right and bottom, starting 3 px down / 3 px in | Executor `stdmbdf.c` | medium |
| Item height | **16 px** = Chicago line height | Executor `stdmdef.c`; Kelsidavis | high |
| Item text x-offset | `left + checksize + 2`; checkmark at `left + 2` | Executor | medium |
| Checkmark glyph | Chicago char $12, left of text | IM Toolbox-93 | high |
| Command-key equivalent | `⌘` (Chicago $11) then key char, right-aligned at `right − (2·cloverWidth + 1)` | Executor | medium |
| Submenu indicator | right triangle 6 × 11 at `right − 14`, `top + 2` | Executor | medium |
| Separator | full-width **dotted line** at `baseline − 4`, always dimmed | IM Toolbox-93; HIG-81 | high |
| Chosen item | item row inverted, full width | Executor | high |

## 2. Windows

**Title bar geometry.** Apple's WDEF: `titleHeight = ascent + descent + 4`, forced odd and ≥ 19 → **19 rows** for Chicago 12, from the top frame line (row 0) to the separator above the content (row 18). Executor: same 19 rows. Inside Macintosh prose says "20 pixels"; treat that as 19 rows plus the content's top frame line.

| Fact | Value | Source | Conf. |
|---|---|---|---|
| Window border | 1-px black frame; line under title bar | Apple WDEF; Executor | high |
| Drop shadow | **1 px** black, right and bottom, offset (1,1); altDBoxProc gets 2 px; dBoxProc none | Apple WDEF | high |
| Racing stripes | six 1-px black horizontal lines, 2-px pitch, pattern `$FF00`; rows **4, 6, 8, 10, 12, 14** from the top frame line; x from `left+1` to `right−2`; close-box top and bottom edges coincide with stripes 1 and 6 | Apple WDEF; Executor | high (pattern), medium (row) |
| Stripe gaps | stripes stop **6 px** either side of the title; left region ≥ 32 px with close box, right ≥ 26 px with zoom box | Apple WDEF | high |
| Close box | **11×11** hollow black square in a 13×13 cell (1-px white margin); rows 4–14; box at x = frame + 10 … + 20 | Apple WDEF `PlotGoAway`; Executor | high |
| Zoom box (System 7) | same 11×11 with an inner 6×6 sub-box top-left; cell left = title-bar right − 20 | Apple WDEF `PlotZoom` | high |
| Pressed close/zoom | inverted | Apple WDEF | high |
| Title | Chicago 12, centred, never < 32 px from left with a close box; baseline row 13 (Apple) / 14 (Executor); 6 px white padding each side | Apple WDEF | high |
| Inactive window | stripes removed, boxes hidden, title dimmed, frame stays 1-px black, scroll bars outline only | IM Toolbox-190; HIG-114 | high |
| Size (grow) box | 15×15 bottom-right; two overlapping squares (7×7 and 9×9 offset (4,4)) | IM Toolbox-233; Executor | high |
| Modal dialog frame (dBoxProc) | double outline, from outside in: 1 black, 2 white, 2 black, 3 white (8 px total) | HIG-132; Executor; Apple WDEF | high |
| plainDBox | 1-px black frame, no shadow | Executor | medium |
| altDBoxProc | 1-px frame + 2-px shadow | Apple WDEF | high |
| Alert box | dBoxProc frame; default button gets the bold ring | IM Toolbox-373 | high |

## 3. Controls (standard CDEF 0)

| Fact | Value | Source | Conf. |
|---|---|---|---|
| Push button size | **59 × 20 px** standard for OK/Cancel; width fits label otherwise | HIG-146 | high |
| Button shape | rounded rect, 1-px black frame; oval size `min(width, height/2)` → **10×10** for 20-px height (Kelsidavis: 12) | Executor | medium |
| Label | Chicago 12 centred | Executor; HIG-146 | high |
| Pressed | body and text inverted | Executor; HIG-146 | high |
| Default button ring | inset −4, pen 3, `FrameRoundRect(16,16)` → **3-px black ring, 1-px white gap, 4 px outside, 16×16 oval**; disabled ring uses `gray` pen | IM Toolbox-383; HIG-146 | high |
| Checkbox | **12×12** 1-px square at `left+2`, vertically centred; label at `left+16`; checked = corner-to-corner X; pressed = 2-px frame | Executor; HIG-148 | high |
| Radio button | **12×12** circle; on = **6×6** filled dot (inset 3); pressed = 2-px frame; label at `left+16` | Executor; HIG-147 | high |
| Disabled controls | frame in `gray` pen, text dithered 50% | Executor; HIG-146 | high |

## 4. Scroll bars

| Fact | Value | Source | Conf. |
|---|---|---|---|
| Width | **16 px** including 1-px frame (15-px strip inside the window edge) | Apple WDEF; IM Toolbox-303 | high |
| Arrow boxes | 16×16 squares, arrow = 12-wide head 6 rows + 6-wide shaft 4 rows; hollow when inactive | Executor; HIG-121 | high |
| Track | `ltGray` (25%, `88 22`) pattern; many recreations wrongly use 50% | Executor `ctlArrows.c` | medium |
| Thumb | fixed **16×16** square, 1-px black frame, white interior | Executor | high |
| Inactive | frame only: no gray, no thumb, hollow arrows | HIG-121 | high |

## 5. Text

From the actual NFNT/FONT resources (jcs/classic-mac-fonts BDFs):

| Font | Ascent | Descent | Line height | Notes | Conf. |
|---|---|---|---|---|---|
| Chicago 12 | 12 | 3 | **16** (leading 1) | cap height 9, x-height 7, space 4, max advance 14 | high |
| Geneva 9 | 10 | 2 | 12 | cap 7, space 3 | medium |
| Geneva 10 | 10 | 2 | ~12 | | medium |
| Geneva 12 | 12 | 3 | 16 | cap 9 | medium |
| Monaco 9 | 9 | 2 | 11 | advance **6** | high |
| Monaco 12 | 12 | 3 | 15 | advance **7** | high |

- Points = pixels at 72 dpi. System font Chicago 12 (ID 0), application font Geneva (ID 3). Standard sizes 9, 10, 12, 14, 18, 24. Selection highlight is inverse video. No anti-aliasing.

## 6. QuickDraw patterns and the System `PAT#` 0 (38 patterns)

QuickDraw globals (high): `white` 00×8 · `black` FF×8 · `gray` (50%) `AA 55` · `ltGray` (25%) `88 22` · `dkGray` (75%) `77 DD`.

System `PAT#` 0, 38 patterns, one byte per row, bit 7 = leftmost pixel, 1 = black (Paul Smith's DeRez of System 6, high):

```
idx  hex               black%  description
 0  FFFFFFFFFFFFFFFF  100%   black
 1  DDFF77FFDDFF77FF   88%   near-black, sparse white dots
 2  DD77DD77DD77DD77   75%   dkGray-style
 3  AA55AA55AA55AA55   50%   gray checker (default desktop)
 4  55FF55FF55FF55FF   75%   solid rows / checker rows
 5  AAAAAAAAAAAAAAAA   50%   vertical 1-px lines
 6  EEDDBB77EEDDBB77   75%   dense diagonal
 7  8888888888888888   25%   vertical lines, 4-px pitch
 8  B130031BD8C00C8D   38%   woven/brick texture
 9  8010022001084004   13%   sparse scattered dots
10  FF888888FF888888   44%   grid (bricks 4×4)
11  FF808080FF080808   34%   running-bond brick wall
12  8000000000000000    2%   single dot per 8×8
13  8040200002040800    9%   short diagonal dashes
14  8244394482010101   23%   chain-link
15  F87422478F172271   47%   basket weave
16  55A04040550A0404   25%   herringbone
17  2050888888880502   22%   roof-tile
18  BF00BFBFB0B0B0B0   52%   tiles/boxes
19  0000000000000000    0%   white
20  8000080080000800    6%   sparse dot
21  8800220088002200   13%   sparse dots offset
22  8822882288228822   25%   ltGray
23  AA00AA00AA00AA00   25%   dotted rows every other line
24  FF00FF00FF00FF00   50%   horizontal 1-px lines
25  1122448811224488   25%   diagonal lines (/) 4-px pitch
26  FF000000FF000000   25%   horizontal lines 4-px pitch
27  0102040810204080   13%   diagonal (/) 8-px pitch
28  AA00800088008000   13%   irregular dots
29  FF80808080808080   23%   large grid 8×8
30  081C22C180010204   20%   waves
31  881422418800AA00   22%   diamonds and dots
32  40A00000040A0000    9%   sparse triangles
33  038448300C020101   20%   diagonal wave
34  8080413E080814E3   28%   bamboo/knot
35  102054AAFF020408   31%   tree/arrow
36  77898F8F7798F8F8   59%   heavy tile
37  0008142A552A1408   25%   diamond outline
```

**HyperCard's Patterns palette: 40 patterns, 4 columns × 10 rows, numbered 1–40 top-to-bottom then left-to-right (1 top-left, 10 bottom-left, 31 top-right, 40 bottom-right; 1 = white, 12 = black, 22 = gray).** From WyldCard's embedded HyperCard pattern table (medium: clone data, but format and count match HyperCard's stack `PAT` block):

```
HC#  hex              black%  = System PAT# idx
 1  0000000000000000   0%   19 (white)
 2  8000000008000000   3%   —  (2 dots)
 3  8800220088002200  13%   21
 4  8888222288882222  25%   —
 5  88AA22AA88AA22AA  38%   —  (density ramp)
 6  CCAA33AACCAA33AA  50%   —  (density ramp)
 7  EEAABBAAEEAABBAA  63%   —  (density ramp)
 8  EEBBBBEEEEBBBBEE  75%   —  (density ramp)
 9  FFBBFFEEFFBBFFEE  88%   —  (density ramp)
10  FFBBFFFFFFBBFFFF  94%   —  (near black)
11  8010022001084004  13%    9
12  FFFFFFFFFFFFFFFF 100%    0 (black)
13  8822882288228822  25%   22 (ltGray)
14  1122448811224488  25%   25
15  C4800C6843023026  28%   —
16  B130031BD8C00C8D  38%    8
17  AA00AA00AA00AA00  25%   23
18  8822552288225522  31%   —
19  8855225588552255  38%   —
20  77DD77DD77DD77DD  75%   —  (dkGray)
21  8000000000000000   2%   12
22  AA55AA55AA55AA55  50%    3 (gray)
23  038448300C020101  20%   33
24  8244394482010101  23%   14
25  8814224188412214  25%   —
26  8080413E080814E3  28%   34
27  22048C7422179810  31%   —
28  BE808808EB088880  31%   —
29  25C8328964244C92  36%   —
30  A29C41BE2AC914EB  47%   —
31  40A00000040A0000   9%   32
32  8040200002040800   9%   13
33  AA00800088008000  13%   28
34  FF80808080808080  23%   29
35  081C22C180010204  20%   30
36  FF808080FF080808  34%   11
37  F87422478F172271  47%   15
38  BF00BFBFB0B0B0B0  52%   18
39  FF7FBE5DA2418000  50%   —
40  FAF5FAF5A050A050  50%   —
```

HyperCard's set is not MacPaint's 38 plus 2: 21 of the 40 are System patterns, the first column is a 10-step gray-density ramp unique to HyperCard, and 19 are HyperCard-only. Patterns are stored per stack and editable by double-clicking a palette cell. The HyperTalk `pattern` property ranges 1–40.

## 7. Desktop and 1-bit conventions

- Default desktop pattern on B&W Macs: the 50% checker (QuickDraw `gray`, PAT# 3). high
- Pixels are exactly `#000000` or `#FFFFFF`. No anti-aliasing anywhere; gray only ever simulated by 8×8 patterns or by painting `gray` in `patBic`/`notPatBic` mode over drawn text (the "dimmed" look). high
- Patterns are drawn relative to the port origin so adjacent fills tile seamlessly. high

## Conflicts worth flagging for the CSS system

1. Title bar 19 rows (code) vs "20 pixels" (IM prose): build a 19-px bar plus a 1-px content top line.
2. Racing stripe first row: Executor 4 vs Apple beta 3. Row 4 makes the close box edges coincide with stripes 1 and 6, matching screenshots.
3. Scroll track: Executor `ltGray` (25%) vs many recreations' 50%.
4. Button corner: 10×10 oval (Executor) vs 12×12 (Kelsidavis); the default ring's 16×16 is fixed by Apple's listing.
5. Chicago ascent 12 (jcs BDF, WDEF math) vs 9 (danfe BDF). Use 12/3/1.
6. system.css and Benchoff's CSS are scaled approximations (22-px scrollbars, 1.5-px borders) and are not measurements.

## Sources

- Apple System 7.0 WDEF sample: https://developer.apple.com/library/archive/samplecode/System_7.0_WDEF/Introduction/Intro.html and https://developer.apple.com/library/archive/samplecode/System_7.0_WDEF/Listings/StandardWDEF_a.html
- IM Toolbox Essentials: https://developer.apple.com/library/archive/documentation/mac/Toolbox/Toolbox-92.html · Toolbox-128 · Toolbox-93 · Toolbox-189 · Toolbox-190 · Toolbox-191 · Toolbox-233 · Toolbox-295 · Toolbox-299 · Toolbox-303 · Toolbox-373 · Toolbox-383
- IM QuickDraw patterns: https://dev.os9.ca/techpubs/mac/QuickDraw/QuickDraw-59.html ; coordinates: https://developer.apple.com/library/archive/documentation/mac/QuickDraw/QuickDraw-11.html
- IM Text: https://developer.apple.com/library/archive/documentation/mac/Text/Text-155.html · Text-145 · Text-190 · Text-232
- Macintosh Human Interface Guidelines (1992): https://dev.os9.ca/techpubs/mac/HIGuidelines/HIGuidelines-146.html · -147 · -148 · -121 · -114 · -132 · -81 · -76 · -139 ; PDF: https://vintageapple.org/inside_r/pdf/Human_Interface_Guidelines_1992.pdf
- Executor emulator: https://github.com/ctm/executor (`src/windDocdef.c`, `src/ctlStddef.c`, `src/ctlArrows.c`, `src/stdmbdf.c`, `src/stdmdef.c`, `src/menu.c`, `src/qGrafport.c`, `src/include/rsys/menu.h`, `src/go_away.map`, `src/zoom.map`, `src/grow.map`, `src/thumb_vert.map`, `src/arrow_up_active.map`)
- Kelsidavis/System7: https://github.com/Kelsidavis/System7
- Paul Smith, classic Mac patterns: https://www.pauladamsmith.com/blog/2025/09/classic-mac-patterns.html ; https://github.com/paulsmith/classic-mac-patterns ; https://paulsmith.github.io/classic-mac-patterns/
- WyldCard pattern table: https://github.com/defano/wyldcard (`WyldCardPatternFactory.java`, `PatternPalette.java`)
- Classic Mac fonts as BDF: https://github.com/jcs/classic-mac-fonts ; https://github.com/danfe/fonts/blob/master/Chicago-12.bdf
- system.css: https://github.com/sakofchit/system.css ; Benchoff System 7 CSS: http://bbenchoff.com/pages/system7.html
- MacPaint PAT# format: https://preserve.mactech.com/articles/mactech/Vol.03/03.05/PaintFiles/index.html ; https://www.fileformat.info/format/macpaint/egff.htm
- QuickDraw 72 dpi: https://apple.fandom.com/wiki/QuickDraw
