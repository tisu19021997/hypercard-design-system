# Fonts for a 1-bit HyperCard recreation

Research report, 2026-09-11. Confidence: **high** = primary source or verified on this machine (macOS 26.4.1, fontTools dumps, headless Chrome 153 pixel counts); **medium** = one secondary source or derived; **low** = inference.

## 1. The original Apple bitmap fonts

- Designers: all original 1984 fonts (Chicago, Geneva, New York, Monaco, Athens, London, San Francisco, Cairo, Los Angeles, Toronto, Mobile) by Susan Kare, except **Venice by Bill Atkinson**; Monaco with Kris Holmes and Charles Bigelow. **high**
- Sizes shipped: Chicago 12 only. Geneva 9, 10, 12, 14, 18, 24. Monaco 9 and 12. At 9–12 pt Geneva has top serifs on i/j/l, a flat-topped 3 and parallel-sided y that the TrueType outline does not reproduce. **high**
- **Chicago 12 metrics** (from the real NFNT via `Chicago-12.bdf`): cap height **9 px**, x-height **7 px**, stem **2 px**; max ink above baseline 12 (accented caps), descent 3 → 15 rows of ink; advances H/x/b/p/g 8 px, i/l 4 px, I/! 6 px, space 4 px; 122 of 132 alphanumerics have exactly 1 px right side-bearing. Line height **16 px** (12 + 3 + 1 leading) **medium**.
- **Geneva / Monaco metrics** from Apple's 1-bit strikes still embedded in `/System/Library/Fonts/Geneva.ttf` and `Monaco.ttf` (`bloc`/`bdat`): Geneva 9: 10/−2 → 12 px; Geneva 10: 12 px; **Geneva 12: 12/−3 → 15 px (+1 leading → 16)**; Geneva 14: 18; 18: 22; 24: 28. Monaco 9: 9/−3 → **12 px**; Monaco 12: 16 px. **high**
- Ownership: Apple owns them; "Chicago" is a registered Apple trademark; "New York is a trademark of Apple Inc."; TrueType Chicago/Geneva/Monaco outlines by Bigelow & Holmes (1991). macOS SLA §2.E permits using bundled fonts to display content while running macOS; **none of Apple's originals are freely redistributable as web fonts**. Repos redistributing Apple's actual files exist (nikdog/chicago-font; Infinite Mac's Charcoal.woff2) and should not be reused. **high**

## 2. Stand-ins shipping with current macOS (verified on macOS 26.4.1)

| Font | Present | Notes |
|---|---|---|
| **Geneva** | `/System/Library/Fonts/Geneva.ttf`, 3742 glyphs, **full Vietnamese** | outline + embedded strikes 9/10/12/14/18/20/24 ppem; Chromium renders the outline, not the strikes |
| **Monaco** | `/System/Library/Fonts/Monaco.ttf`, Vietnamese yes | strikes 9/10/12/14 |
| **Charcoal** | not installed (download-on-demand "Charcoal CY" only) | falls back |
| **Chicago** | not installed | |
| **Krungthep / Silom** | `/System/Library/Fonts/Supplemental/` (© Apple 1992–2011) | Wikipedia: "use Chicago for their Latin letters"; identical Latin ink at 12 px; outline (hinted), **no Vietnamese** (Latin-1 accents only) |
| **New York (2019)** | `NewYork.ttf` exists but family is `.New York` (hidden); `'New York'`, `ui-serif`, `-apple-system-ui-serif` all fall back in Chromium (MDN: `ui-serif` Chrome unsupported) | Safari-only; unreachable in Chromium/Electron |

## 3. Free / open recreations (inspected with fontTools; "native px" = size at which glyphs land on whole pixels)

| Name | Author | License | Recreates | Native px | Vietnamese | URL |
|---|---|---|---|---|---|---|
| **Sysfont** (hcsimulator's "Chicago") | Alina Sava, 2021 | **SIL OFL** | Chicago 12 | 13.51 px (74 units/px, awkward) | no | https://fontsarena.com/sysfont-by-alina-sava/ |
| **Chicago Kare** | Duane King, 2024 | repo **MIT** (name table says OFL) | Chicago 12, "faithful" | **16 px** (64 u/px); cap 9 px; hhea 768/−256 = 16 px line | no (Mac Roman accents) | https://github.com/KingDuane/Chicago-Kare |
| **ChiKareGo2** | Giles Booth, 2017 | **CC BY** | Chicago 12; some punctuation guessed; known errors N Ñ z F | **16 px** | no | https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=3780 |
| **FindersKeepers** | Giles Booth, 2017 | **CC BY** | **Geneva 9** | **16 px**; cap 7; 133 glyphs | no, almost no accents | https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=3809 |
| **Geneva 9.1** (hcsimulator's "GenevaNine") | Kelsey Higham, 2016 | **CC BY 3.0** | Geneva 9, modernised | **16 px**; hhea 640/−128 = 12 px | no | https://fontstruct.com/fontstructions/show/1304775/geneva-9 |
| **bitgeneva12** (hcsimulator's "Geneva") | unknown, no name table | **unknown** | Geneva 12 | 12 px | no | only inline in hcsimulator; do not reuse without provenance |
| **ChicagoFLF** | Casady & Greene; digitised by Richard A. Ware | public domain (secondary sources) | **vector** revival, never pixel-exact | any | no | https://fontlibrary.org/en/font/chicagoflf |
| Pix Chicago | Etienne Desclides | dafont free | iPod-era Chicago | | | https://www.dafont.com/pix-chicago.font |
| Chicago 12.1 | kamekku14 | CC BY-SA 3.0 | Chicago, extended Latin | | claimed | https://fontstruct.com/fontstructions/show/2230457/chicago-12-13-11 |
| Monaco 9 (FontStruct) | Techstar01 | CC BY-SA 3.0 | Monaco 9, WGL4 | | no | https://fontstruct.com/fontstructions/show/1744750/monaco-4-4 |
| system.css "Monaco" | Jamie Place, 2012 | CC BY-SA 3.0 (uncredited by system.css) | Monaco 9, 100 glyphs | 16 px | no | http://fontstruct.com/fontstructions/show/753435 |

system.css bundles ChicagoFLF (as Chicago), ChiKareGo2 (Chicago_12), FindersKeepers (Geneva_9) and Jamie Place's Monaco; its MIT license does not cover the fonts; it sets `.btn` to 18 px (off-grid) with no smoothing hints. Infinite Mac preloads ChicagoFLF plus proprietary Charcoal, Apple Garamond and Lucida Grande.

**No recreation covers Vietnamese.** Only Apple's Geneva, Monaco and New York do.

## 4. How hcsimulator.com renders text

- All CSS inline; fonts are `@font-face` with inlined base64 `src` (the original file paths 404). `'Chicago'` → Sysfont C v1.011; `'GenevaNine'` → Geneva 9.1 ("needs to be used as 18px"); `'Geneva'` → bitgeneva12. Only `Dossier-Regular.woff2` loads by URL and is unused.
- Title bar font `12px Chicago` (18 px on coarse pointers); captions `18px GenevaNine` with `line-height: 0.8em`, `text-rendering: geometricPrecision`; card `--card-width: 512px; --card-height: 342px`, whole dialog scaled with `transform: scale(s)`, `stackzoom = min(2, s)`.
- Bitmaps get the full `image-rendering` cascade; **no `-webkit-font-smoothing` anywhere**; Sysfont at 12 px is off its 13.5 px grid, so the text is antialiased outline text, not true 1-bit.

## 5. Crisp 1-bit text in Chromium/Electron on macOS (measured)

- **`-webkit-font-smoothing: none` works**: 0 gray pixels per row at DPR 1 and 2 in headless Chrome 153 (default rows 35–80% gray). macOS-only, non-standard; Firefox has no equivalent. `font-smooth: never` is not supported.
- **Native integer sizes matter more than smoothing**: with smoothing off the rasteriser thresholds the outline, so an off-grid size mangles shapes. Sysfont at 12 px scaled 5.0× between DPR 1 and 2 (broken), Chicago Kare at 16 px scaled exactly 4× (clean 2×2 blocks). Use Chicago Kare / ChiKareGo2 / FindersKeepers / Geneva 9.1 / FontStruct Monaco at **16 px** (32 px for 2×); bitgeneva12 at 12 px. Set `line-height` explicitly (Chicago 12 → 16 px; Geneva 9, Monaco 9 → 12 px; Geneva 12 → 16 px) because hhea/lineGap values are inconsistent.
- Retina: either render at doubled CSS size with smoothing off (a 16 px font at DPR 2 rasterises pixel-doubled and gray-free) or lay out at 1× and `transform: scale(2)` the container; raster images need `image-rendering: pixelated`; snap to whole device pixels.
- Avoid fractional `letter-spacing` and `text-rendering: geometricPrecision`. Outside macOS `-webkit-font-smoothing` has no effect; guaranteed 1-bit needs glyph sprites or a canvas renderer.

## Sources

hcsimulator.com (HTML + script.js) · fontsarena.com/sysfont-by-alina-sava · fontsinuse.com/typefaces/162416/sysfont · github.com/KingDuane/Chicago-Kare · chicagokare.xyz · suppertime.co.uk/blogmywiki/2017/04/chicago · suppertime.co.uk/blogmywiki/2017/04/finderskeepers · pentacom.jp BitFontMaker2 gallery ids 3780, 3778, 3809 · fontstruct.com/fontstructions/show/1304775, 2230457, 1744750, 753435 · fontlibrary.org/en/font/chicagoflf · fontsarena.com/chicago-flf-by-robin-casady · luc.devroye.org/fonts-27509.html · dafont.com/pix-chicago.font · github.com/sakofchit/system.css · github.com/mihaip/infinite-mac · github.com/nikdog/chicago-font · github.com/danfe/fonts/blob/master/Chicago-12.bdf · github.com/bzotto/ClassicMacTypography · Wikipedia: Chicago, Geneva, Monaco, Charcoal, Fonts on Macintosh, New York (1983), San Francisco (decorative), List of typefaces included with macOS · storiesofapple.net/the-first-fonts-of-the-macintosh.html · support.apple.com/en-us/108939 · support.apple.com/en-us/122869 · apple.com/legal/sla/docs/macOSTahoe.pdf · developer.apple.com IM Text-232, Text-277 · developer.mozilla.org font-smooth · MDN browser-compat-data font-family.json, font-smooth.json, image-rendering.json · issues.chromium.org/issues/40635769 · dbushell.com/2024/11/05/webkit-font-smoothing · blog.jim-nielsen.com/2022/font-family-and-supports · matthew-jackson.com/blog/using-apples-new-york-font-in-css · local fontTools dumps of Geneva.ttf, Monaco.ttf, NewYork.ttf, Krungthep.ttf, Silom.ttf
