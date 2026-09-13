# Layout and stack conventions

Distilled from Apple's *HyperCard Stack Design Guidelines* (1989), the Home stack and Apple's bundled stacks. Full notes with sources: `research/04-stack-conventions.md`.

## The card

- 512 × 342 px. HyperCard 2.x allows other sizes but widths snap to multiples of 16 (`--hc-card-width-step`).
- Objects are positioned absolutely in card coordinates. A *background* holds the objects shared by many cards; a *card* holds the ones unique to it. Keep shared controls at identical pixels across cards.
- White card, black ink. A desktop behind the card window is 50 % gray (`.hc-desktop`).

## Zones

```
┌──────────────────────────────────────────────┐
│ Title (Chicago 18/24, top, centered)          │  y ≈ 16–40
│                                              │
│ Content: fields (Geneva 12), pictures,       │
│ icon buttons in rows with Geneva 9 captions  │
│                                              │
│ ◁  Card 3 of 12                          ▷   │  bottom 4 px: nav row
└──────────────────────────────────────────────┘
```

- Navigation at the bottom: Prev bottom-left, Next bottom-right (Susan Kare's block arrows with 2 px drop shadows), Home and Return near them. `.hc-nav` places this row.
- Card counters in Geneva 9 (`.hc-counter`).
- Groups of go-somewhere buttons are icon + caption grids with 24–32 px gutters (`.hc-button--icon`).
- Do-something buttons are round-rect with a name, usually right-aligned in a column.
- Fields are rectangles or shadows with showLines when the user is expected to type; transparent when they display fixed text.

## Dialogs and alerts

- Centered on the card or screen, dBoxProc frame, 13 px inner padding, Chicago 12 message, Cancel (59 px, standard) then OK (default) at bottom right, 12 px apart.
- The default button responds to Return; Cancel to Escape and ⌘-period.

## Menus

- Titles in Chicago 12: Apple, File, Edit, Go, Tools, Objects, Font, Style. Keyboard equivalents in a right column (`.hc-key`).
- Dimmed items dither; checked items show a ✓ in the 12 px checkmark column.

## Icons

- 32 × 32, 1-bit, white transparent, about 2–4 px margin inside the cell. Apple's `ICON` resources are not included; draw your own with `shape-rendering: crispEdges` inside `.hc-icon`.
- The browse hand cursor (16 × 16, hotspot at the fingertip 6,0) is applied to `.hc-button`, links and buttons inside `.hc-card`.

## Gray areas

- Round-rect button radius (7 px), wide-margin field insets (6 / 8 px) and effect timings are medium-confidence values from screenshots; adjust only with a better source and record it in `research/`.
- Tools palette icons and the 18 tool glyphs are omitted.
