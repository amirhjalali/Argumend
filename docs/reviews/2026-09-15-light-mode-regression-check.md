# Light-mode regression check — 2026-09-15

Question: did the three dark-mode passes on `sprint-2026-09-14` change **light mode**?

Answer: yes, in two ways. One is a real regression that reaches every card on the
site; the other is a latent bug that the branch fixed as a side effect. No text
colour changed in light mode on any of the 15 routes.

## Method

Two detached worktrees, each with its own dev server (`next dev --webpack`,
`ENABLE_DISAGREEMENT_V2=true NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2=true
ARGUMEND_DISAGREEMENT_PROVIDER=fake`):

| server | ref | commit |
|---|---|---|
| baseline, port 3120 | `main` | `0bc2fc5` |
| branch, port 3121 | `sprint-2026-09-14` | `0c777cc` (the tip `17fb901` adds only `.work/HANDOFF.md`) |

Playwright (chromium headless shell 1223, driven by a node script), viewport
1280x800, `colorScheme: light`, no `dark` class (verified on every page), all
animations and transitions disabled, `content-visibility:auto` forced visible,
500 ms settle, full-page PNG. Every route returned 200 on both servers; nothing
was skipped.

Three comparisons per route:

1. **Pixel diff** (Python PIL): count of pixels whose RGB differs at all.
2. **Colour-pair census**: the most common (main colour -> branch colour) pairs
   among differing pixels, to tell a text-colour change from a background one.
3. **DOM computed-style diff**: every visible element on both servers, aligned in
   document order (element counts matched exactly on every route), compared on
   `color`, `backgroundColor`, `borderTopColor`, `backgroundImage`, `boxShadow`,
   `opacity`, `fill`, `stroke`, `outlineColor`, then grouped by class list.

Screenshots: session scratchpad `render/lightdiff/<port>_<route>.png`, diff masks
`render/lightdiff/diff_<route>.png`, grouped style diffs
`render/lightdiff/domdiff.json`.

## Per-route table

| Route | page px | differing px | % | style-diff groups | cause |
|---|---|---|---|---|---|
| `/` | 1280x2660 | 0 | 0.000 | 0 | identical |
| `/topics` | 1280x3628 | 170,534 | 3.672 | 2 | shadow (27 cards) |
| `/topics/nuclear-energy-safety` | 1280x6121 | 14,635 | 0.187 | 1 | shadow (3 related-topic links) |
| `/topics/ai-mass-unemployment` | 1280x4489 | 115,675 | 2.013 | 5 | shadow (15 `surface-card` blocks) |
| `/blog` | 1280x6584 | 155,231 | 1.842 | 2 | shadow (12 article cards) |
| `/blog/did-covid-come-from-a-lab` | 1280x5164 | 0 | 0.000 | 0 | identical |
| `/is` | 1280x9466 | 1,030,935 | 8.509 | 1 | shadow (140 question rows) |
| `/faq` | 1280x6929 | 3,364,577 | 37.936 | 1 | closed-card background (72 `<details>`) |
| `/questions` | 1280x13732 | 0 | 0.000 | 0 | identical |
| `/research` | 1280x6548 | 0 | 0.000 | 0 | identical |
| `/how-it-works` | 1280x4561 | 0 | 0.000 | 0 | identical |
| `/about` | 1280x4933 | 0 | 0.000 | 0 | identical |
| `/guides` | 1280x6075 | 217,121 | 2.792 | 6 | shadow (22 cards) |
| `/fallacies` | 1280x4893 | 158,331 | 2.528 | 4 | shadow (22 cards) |
| `/analyze-v2` | 1280x1358 | 0 | 0.000 | 0 | identical |

Across all 15 routes the DOM diff found **zero** `color` differences. Every
non-zero row is explained by exactly one of the two findings below; there is no
residual.

## Finding 1 (regression): `shadow-card` now renders a white shadow in light mode

**What the screenshots show.** On main every card has a soft grey drop shadow
(`rgba(0,0,0,0.1) 0 2px 8px -2px`). On the branch the same elements compute
`box-shadow: rgb(255,255,255) 0 2px 8px -2px`, a white glow that is invisible on
the parchment canvas. Pixel census on `/is`: `#edeae4 -> #f7f5f0`,
`#e9e6e0 -> #f9f7f4` (the shadow band under each row goes from darker-than-canvas
to lighter-than-canvas, max channel delta 20). Zoomed crop:
`render/lightdiff/crop_is_shadow_zoom.png` (top = main, bottom = branch).

**Why.** Commit `99a8a8f` ("replace 81 non-compiling opacity classes with
registered rgb tokens") added a colour token to `tailwind.config.ts`:

```ts
card: "rgb(var(--bg-card-rgb) / <alpha-value>)",
```

Tailwind's `boxShadowColor` scale defaults to `theme('colors')`, so the new colour
generates a `shadow-card` utility that collides with the existing `boxShadow.card`
utility. The branch stylesheet contains both rules, and the colour one is emitted
later and wins:

```css
/* rule 1208, from boxShadow.card — same as main */
.shadow-card { --tw-shadow: 0 2px 8px -2px rgba(0,0,0,0.1); --tw-shadow-colored: 0 2px 8px -2px var(--tw-shadow-color); box-shadow: ...var(--tw-shadow); }
/* rule 1215, new, from colors.card via boxShadowColor */
.shadow-card { --tw-shadow-color: rgb(var(--bg-card-rgb) / 1); --tw-shadow: var(--tw-shadow-colored); }
```

Probe on a `/is` row, branch server: `--tw-shadow-color: rgb(255 255 255 / 1)`,
`--tw-shadow: 0 2px 8px -2px rgb(255 255 255 / 1)`. Baseline server:
`--tw-shadow-color` empty, `--tw-shadow: 0 2px 8px -2px rgba(0,0,0,0.1)`.

`.surface-card` (`app/globals.css`) does `@apply ... shadow-card`, so it inherits
the same broken value; that is why `/topics/ai-mass-unemployment`, `/is` and the
related-topics list on the topic page changed although their class lists did not.

**Scope.** 20 `shadow-card` usages in 16 files under `app/` and `components/`,
plus `.surface-card`, which is used far more widely. Every card on the site loses
its light-mode shadow. In dark mode the same collision makes the shadow
`#252420`, which happens to read as a dark shadow, so the dark-mode sweep could
not have caught it.

**Fix options** (not applied; this check does not edit source):

- Smallest change: keep the colour token but exclude it from the shadow-colour
  scale, e.g. in `tailwind.config.ts`
  `boxShadowColor: ({ theme }) => { const { card, ...rest } = theme("colors"); return rest; }`.
  Zero class edits. Needs a build to verify `shadow-card` compiles once.
- Alternative: rename the boxShadow key (`card` -> e.g. `lift`) and update the 20
  `shadow-card` usages plus the `.surface-card` `@apply`. Renaming the colour token
  instead is the expensive path: `bg-card` and its opacity variants appear ~180
  times in 74 files.

Either way, re-run this check afterwards; the `/is`, `/topics`, `/blog`,
`/guides`, `/fallacies` and both topic pages should drop to 0.000 %.

## Finding 2 (behaviour change, arguably a fix): FAQ closed cards gained a background

`app/faq/page.tsx` changed the `<details>` class from `bg-[var(--bg-card)]/70` to
`bg-card/70`. On main the old class does not compile (Tailwind cannot apply an
opacity modifier to an arbitrary `var()` value), so closed FAQ items had
`background-color: rgba(0,0,0,0)` and showed the canvas colour `#f4f1eb` inside
their border. On the branch they compute `rgba(255,255,255,0.7)`, i.e. `#fcfbf9`
over the canvas. 72 `<details>` elements, 351k sampled pixels, which is the 38 % on
`/faq`. This restores what the class was evidently meant to do, but it is a visible
light-mode change on that page and should be a deliberate decision.

Related pre-existing bug, unchanged by the branch: the same element's
`open:shadow-[var(--shadow-card)]` compiles as a shadow **colour**
(`--tw-shadow-color: var(--shadow-card)`), not a shadow, on both main and branch.
The open card therefore never had the intended shadow. Finding 1's fix will not
address this; use `open:shadow-card` (once Finding 1 is fixed) instead.

## What did not change

- Text colour: no `color` difference on any element of any route.
- `bg-white/80 -> bg-card/80`, `dark:bg-[var(--bg-card)]/N -> dark:bg-card/N`,
  `dark:text-*` additions, chip class rewrites: all resolve to identical light-mode
  computed values (no `backgroundColor` diff outside `/faq`).
- Blog "Analysis" category label: not visible on `/blog` or the post checked at
  1280 px, so it contributed nothing here.

## Light-mode contrast walker (branch, same walker as the dark-mode report)

Same `audit.js` walker, run with the `dark` class removed, on both servers.
Results are identical on main and branch for all three routes: same element
count, same fail count, same worst-five, no fail present on one side only.

| Route | elements | fails (main / branch) | worst 5 (identical on both) |
|---|---|---|---|
| `/` | 112 | 29 / 29 | 1.06 "Subscribe"; 1.13 "Open the interactive map"; 2.31 "Find what it turns on"; 3.01 "Featured analysis" (`text-deep/70`, 12 px); 3.64 "Argument maps for difficult questions" (`text-deep/80`, 12 px) |
| `/topics` | 232 | 36 / 36 | 1.06 "Subscribe"; 1.32 breadcrumb "/" (`text-stone-300`, decorative); 4.26 sidebar "Explore"; 4.26 "About"; 4.26 "Search" |
| `/faq` | 225 | 24 / 24 | same five as `/topics` |

Notes on the worst entries, all pre-existing on main:

- The 1.06 / 1.13 "Subscribe" and "Open the interactive map" rows are walker
  artefacts: white text on a rust gradient button. The walker cannot read gradient
  backgrounds (flagged `+img`) and composites against the panel behind the button.
- "Find what it turns on" (2.31) is the disabled analyze CTA (`text-stone-400` on
  `stone-100`), exempt as a disabled control.
- The real light-mode borderline is the sidebar nav labels at 4.26:1
  (`rgb(120,113,108)` = stone-500 on `#f4f1eb`, 14 px) and the two 12 px
  `text-deep/70` and `text-deep/80` eyebrow lines on `/` (3.01 and 3.64). None of
  these were touched by the branch.

Conclusion: light-mode AA was not degraded by the branch. It was not improved
either; the branch's contrast work was dark-only, as intended.

## Cleanup

Both dev servers were stopped, the `render-wt-head` worktree was removed, and
`render-wt` remains at `main` (`0bc2fc5`). Nothing was committed.
