# Fonts

This folder is intentionally empty of font files. Apple's Chicago, Geneva, Monaco and New York are Apple's property (Chicago and New York are registered trademarks; the TrueType outlines are © Apple / Bigelow & Holmes) and may not be redistributed. `css/fonts.css` therefore works in three tiers: files you drop here → fonts installed on the machine → macOS system fonts.

## Drop-in recreations (recommended)

Download these yourself, convert to WOFF2 if needed (e.g. with `fonttools` / `woff2_compress`), and save them under the exact names below. The stylesheet already references them and applies `size-adjust` so a 12 px role lands on the 16 px pixel grid the fonts were drawn on.

| File to create | Recreates | Author, year | License | Source |
|---|---|---|---|---|
| `ChicagoKare.woff2` (or `.ttf`) | Chicago 12, faithful, native 16 px | Duane King, 2024 | MIT (repo) | https://github.com/KingDuane/Chicago-Kare |
| `FindersKeepers.woff2` | Geneva 9, native 16 px | Giles Booth, 2017 | CC BY 4.0 | https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=3809 |
| `Monaco9.woff2` | Monaco 9 (optional) | Techstar01 (FontStruct) | CC BY-SA 3.0 | https://fontstruct.com/fontstructions/show/1744750/monaco-4-4 |

Alternatives that also match the `local()` names in `fonts.css`:

| Font | Recreates | License | Notes |
|---|---|---|---|
| ChiKareGo2 (Giles Booth) | Chicago 12 | CC BY | Some punctuation guessed; known glyph errors N Ñ z F |
| Geneva 9.1 (Kelsey Higham) | Geneva 9 | CC BY 3.0 | "Modernised"; used by hcsimulator.com |
| Sysfont (Alina Sava) | Chicago 12 | SIL OFL | Native size is 13.5 px, so it never sits on whole pixels; not recommended |
| ChicagoFLF | Chicago (vector revival) | Public domain | Smooth outlines; never pixel-exact |

None of the recreations cover Vietnamese. That is why the Geneva 12 role maps to Apple's Geneva.ttf (on macOS) rather than to a recreation.

## What the CSS does without any files

- `--hc-font-chicago`: `"HC Chicago"` (the @font-face above; fails silently if no file/local) → Krungthep → Silom → Chicago → Geneva. Krungthep and Silom ship with macOS and contain Chicago's Latin glyphs (they are Thai fonts built on Chicago); they lack Vietnamese diacritics.
- `--hc-font-geneva`: Geneva (macOS `/System/Library/Fonts/Geneva.ttf`, full Vietnamese) → Helvetica Neue → Arial.
- `--hc-font-geneva-small`: `"HC Geneva 9"` → Geneva.
- `--hc-font-monaco`: Monaco (macOS) → `"HC Monaco"` → Menlo.
- `--hc-font-serif`: Times → Times New Roman → Georgia. Apple's New York (2019) is hidden from Chromium.

Chromium on macOS renders Geneva's outline, not the embedded bitmap strikes, so with `-webkit-font-smoothing: none` you get a crisp 1-bit rasterisation of the outline: very close to, but not identical with, the original strike.

## Licensing reminders

- Do not commit Apple font files (`Chicago.ttf`, `Geneva.ttf`, `Charcoal.woff2`, etc.) to this or any dependent repo.
- CC BY fonts need attribution in your app's credits; CC BY-SA additionally requires derivative fonts to stay share-alike.
- The MIT license of this repository covers the CSS/JS/tokens only, not third-party fonts you add.
