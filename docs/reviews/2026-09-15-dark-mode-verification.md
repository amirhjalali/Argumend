# Dark-mode verification sweep — 2026-09-15

Branch `sprint-2026-09-14`, after the systemic opacity-token fix (`99a8a8f`) and the
top-bar / newsletter fix (`f643462`). Same route list as
`docs/reviews/2026-09-15-render-sweep.md`, desktop 1280x800, **dark mode only**
(`document.documentElement.classList.add('dark')` after load, 400 ms settle,
`content-visibility:auto` subtrees forced visible so off-screen cards get real
computed styles).

Method: one `browser_evaluate` per page walks every visible text node (skips
script/style/svg/noscript/`aria-hidden`/`.sr-only`, zero-size and opacity-0
subtrees), composites the text colour and the nearest opaque ancestor background
over the body background, and computes WCAG 2 contrast. Threshold 4.5:1 for normal
text, 3:1 for text >= 24 px or bold >= 19 px. "Light panel" = any element with a
composited background luminance > 0.6 and area > 20 000 px². Screenshots are in the
session scratchpad as `render/dark_<route>.png`.

Two known false positives, excluded from the counts below:

- The breadcrumb separator `/` (`text-stone-300 dark:text-[#3d3a36] select-none`,
  1.55:1). It is a decorative glyph with `select-none`; WCAG exempts pure decoration.
- Blog `TableOfContents` links inside the **closed** `<details>` (reported 1.88:1).
  Chrome returns the un-cascaded colour for closed-details content; the rendered
  sticky rail measures 6.16:1 on `/guides/triangulation` with the same component.

## Route table (before fixes -> after fixes)

"worst" is the lowest ratio among real text; "#fail" is failing elements (not groups).
"after" is only shown for routes re-measured after the fixes; unchanged routes are
listed once.

| Route | worst | #fail | light panels | after fixes | notes |
|---|---|---|---|---|---|
| `/` | 2.24 | 15 | 0 | 4.11 / 7 / 0 | verdict chip 2.24 -> 4.52; residual: bare `text-deep` links (2.51-2.83), `text-muted` 10px 4.11 |
| `/about` | 2.51 | 10 | 0 | - | `text-deep` "high weight" 2.51, rust-500 3.79-4.29, `text-stone-400/80` numerals 4.48 |
| `/analyses` | 2.63 | 3 | 0 | - | `text-deep` pill + link |
| `/analysis/does-not-exist` (404) | 3.66 | 1 | 0 | - | 404 footer tagline `text-muted dark:text-stone-500` 10px |
| `/analyze` | 1.88 | 8 | 0 | - | privacy pill `text-deep/70` 1.88; disabled button 2.16 (exempt); word counter 2.28; `text-deep` 2.51-2.83 |
| `/analyze-v2` | 2.45 | 1 | 0 | - | only the disabled submit button (`disabled:opacity-60`, exempt). Clean. |
| `/auth/signin` -> `/saved` | 2.83 | 1 | 0 | - | sidebar "View all" only |
| `/blog` | 2.32 | 28 | **12** | 2.32 / 28 / **0** | image placeholders were `bg-stone-100` with no dark variant; fixed. Residual: category pills and "Read article" `text-deep` |
| `/blog/did-covid-come-from-a-lab` | **1.55** | **38** | 0 | - | **article body `<p class="... text-primary">` 1.55:1 (x24 incl. `<em>`)** — see F1 |
| `/blog/could-ai-be-conscious` | **1.55** | **37** | 0 | - | same as above |
| `/blog/category/analysis` | 2.32 | 45 | 0 | 2.32 / 21 / 0 | tag chips `text-stone-500` 2.82 fixed; residual `text-deep` |
| `/blog/tag/critical-thinking` | 2.32 | 66 | 0 | (same fix) | tag chips fixed; residual `text-deep` pills/links |
| `/community` | 1.42 | 9 | 0 | - | decorative step numerals `text-deep/40` and roman numerals; h1 accent passes large-text |
| `/concepts` | 1.99 | 14 | 0 | - | filter-pill counts/numerals with `opacity-60/70` (design), `deep-light` pills 3.15 |
| `/concepts/steel-manning` | 2.83 | 3 | 0 | - | "View all" only. Clean. |
| `/d/any-slug` (404) | 3.66 | 1 | 0 | - | as `/analysis` 404 |
| `/dashboard` -> `/saved` | 2.83 | 1 | 0 | - | |
| `/embed/ai-mass-unemployment` | 404 | - | - | - | 404 page, as above |
| `/embed/gun-control-effectiveness` | 3.36 | 1 | 0 | fixed | "Verdict" `dark:text-deep-light` -> `deep-bright` |
| `/fallacies` | 1.99 | 33 | 0 | - | filter pills (design), card "No." `text-muted/70 dark:text-stone-500/70` 2.32 (x22) |
| `/fallacies/ad-hominem` | 2.45 | 4 | 0 | - | "No." 2.45 |
| `/faq` | 2.61 | 49 | 0 | - | FAQ answer links bare `text-deep` (x46) |
| `/for-educators` | 2.83 | 2 | 0 | - | Clean apart from "View all" |
| `/for-educators/worksheets/argument-map-template` | 3.24 | 5 | 0 | **clean / 0 / 0** | labels `text-stone-500` fixed |
| `/glossary` | 1.99 | 11 | 0 | - | filter pills (design), `deep-light` / `skeptic-light` pills |
| `/guides` | 1.99 | 30 | 0 | partly fixed | "Start here" + step numbers -> `deep-bright`; residual filter pills, "No." |
| `/guides/triangulation` | 2.45 | 4 | 0 | - | "No." 2.45; body and TOC fine |
| `/how-it-works` | 2.13 | 12 | 0 | 2.83 / 3 / 0 | diagram captions + score legend fixed; residual `text-deep` links |
| `/is` | 2.24 | **141** | 0 | 4.52 / **1** / 0 | verdict chips fixed (Contested 4.52, Moderate 4.68, Settled 5.07); residual is the breadcrumb glyph |
| `/is/climate-change-real` | 2.51 | 4 | 0 | - | `text-deep` eyebrow + category pill |
| `/is/nuclear-energy-safe` | 2.51 | 4 | 0 | - | same |
| `/lessons-from-the-deep` | 2.32 | 10 | 0 | - | category pills bare `text-deep` (x7) |
| `/library` | 1.99 | 24 | 0 | - | filter pills, "No.", 10px type badges `deep-light` 2.86 |
| `/methodology` | 2.27 | 18 | 0 | - | inline-styled step numerals and score badges (crux/rust hex), `text-deep` monograms |
| `/perspectives` | 1.89 | 9 | 0 | - | inline-styled lens pills + `opacity-70` numerals |
| `/questions` | 1.99 | 53 | 0 | - | section headers `dark:text-deep-light` 3.71 (x28) / `skeptic-light` 4.34 (x18) come from `lib/collectionStyles.ts` |
| `/questions/is-nuclear-energy-safe` | 3.15 | 4 | 0 | - | category pill `deep-light` |
| `/research` | 1.81 | 51 | 0 | 2.83 / 43 / 0 | "In this article" box (light-only bg + `text-stone-500` links) fixed; residual: 35 citation links bare `text-deep` |
| `/saved` | 2.83 | 1 | 0 | - | |
| `/topics` | 2.79 | 82 | 0 | 2.79 / 27 / 0 | card descriptions/counts/controls `text-stone-500` fixed (x55); residual tag chips `deep-light` 2.79 (lib/categoryColors) + `text-deep` links |
| `/topics/ai-mass-unemployment` | 4.81 | 0 | 0 | - | **Clean** |
| `/topics/capitalism-after-ai` | 4.50 | 0 | 0 | - | **Clean** |
| `/topics/us-israel-support` | 4.81 | 0 | 0 | - | **Clean** |
| `/topics/gun-control-effectiveness` (legacy view) | 2.13 | 29 | 0 | 2.13 / 12 / 0 | eyebrow labels fixed; residual: `GlossaryTerm` inherits bare `text-secondary` (2.13), vote buttons white-on-`stone-400`/`rust-400` (2.52/2.98, also fails in light), "?" help 2.99, pill 3.15 |
| `/topics/category/policy` | 2.24 | 77 | 0 | (same fix as /topics) | chips + cards fixed; residual `deep-light` tag chips |
| `/topics/compare` | 3.03 | 35 | 0 | - | category chips `deep-light` 3.38 / `skeptic-light` 3.92 (lib/categoryColors), `text-deep` links |
| `/topics/compare/ai-mass-unemployment/vs/capitalism-after-ai` | 404 | - | - | - | flagship ids not resolvable (pre-existing F4) |
| `/topics/compare/gun-control-effectiveness/vs/death-penalty-deterrence` | 2.63 | 17 | 0 | - | `ComparisonView` inline `QUADRANT_STYLE.color` verdict labels 2.7; `text-deep` numbers/links; `text-rust-600` "Full analysis" 3.49 |
| `/topics/tag/policy` | 2.24 | 76 | 0 | (same fix as /topics) | |

## Findings, ranked

1. **F1 — Blog article bodies are unreadable in dark mode (1.55:1).** `lib/markdown.ts`
   emits `<p class="mb-6 leading-[1.8] text-primary">` (and the same on `<ul>`/`<ol>`),
   a fixed light-mode hex with no dark variant, inside `.prose-custom` whose own colour
   *does* flip. Every paragraph on `/blog/[slug]` fails. Fix (out of this task's edit
   scope, so **not applied**): append `dark:text-[var(--text-primary)]` to the three
   class strings in `lib/markdown.ts` (lines ~91, 97, 99). Guides use a separate renderer
   and are fine.
2. **F2 — Verdict chip labels (`BalanceWeightChip`) 2.24-3.4:1 on every listing.**
   Inline `style={{ color }}` from `QUADRANT_STYLE` never flipped. **Fixed**: added a
   `textClass` per quadrant (`text-crux dark:text-crux-light`, `text-deep
   dark:text-deep-bright`, `text-rust-500 dark:text-rust-400`, open -> `stone-400`),
   applied on the chip; `color` kept for SVG fills in `BalanceWeightReadout` /
   `ScalesOfEvidence`. Measured on `/is`: 4.52 / 4.68 / 5.07 (was 2.24 / 3.40 / 2.32).
   `ComparisonView` and `TopicDetailView` still use `QUADRANT_STYLE.color` inline for
   two verdict labels (2.7:1) — same treatment applies; left for a follow-up.
3. **F3 — Bare `text-deep` links and eyebrows (2.51-2.83:1) — systemic.** 253 sites
   across app/components use `text-deep` (#3a6965) with no `dark:` variant. It fails on
   every dark surface. Visible everywhere: sidebar "View all", "Read article", "Browse
   all topics", FAQ answers (x46), research citations (x35). Recommended: a repo-wide
   pass adding `dark:text-deep-bright` (6.2:1 on canvas, 5.1:1 on cards), ideally
   ratcheted like the text-token test. Not done here (too broad for a token-swap pass).
4. **F4 — `dark:text-deep-light` used as a *text* tint (3.15-3.71:1).** `deep.light`
   (#4f7b77) is documented in `tailwind.config.ts` as "decorative/large text only";
   `deep.bright` is the dark-mode text tint. **Fixed** the 9 in-scope text sites
   (`FeaturedTopicHero` x3, `embed/[topicId]`, `blog/[slug]` x2, `guides` x2,
   `dashboard`). Remaining sources are `lib/collectionStyles.ts` (questions section
   headers, filter pills: `text-deep dark:text-deep-light`, `text-skeptic-dark
   dark:text-skeptic-light`) and `lib/categoryColors.ts` (topic tag chips) — out of
   scope, same one-token swap.
5. **F5 — Light-only `text-stone-500` on dark cards (3.24-3.66:1).** **Fixed**: topic
   cards + filter controls (`TopicsPageClient`, `topics/category`, `topics/tag`),
   `how-it-works` score legend (x5), blog category/tag chips, worksheet labels (x9),
   research TOC links, `VerdictVoting` prompt. Pattern: `text-stone-500
   dark:text-stone-400`.
6. **F6 — Residual light panel: blog image placeholders.** `app/blog/page.tsx` used
   `bg-stone-100` with no dark variant under lazy images (12 panels, 91-388 k px² each).
   **Fixed** to match `app/guides/page.tsx`: `dark:border-[var(--border-default)]
   dark:bg-[var(--bg-overlay)]`. `/blog` now reports 0 light panels.
7. **F7 — Research "In this article" box** was `bg-[#faf8f3]/60` with `text-primary`
   heading and `text-stone-500` links (1.81:1). **Fixed** with `dark:bg-card/60`,
   `dark:border-[var(--border-default)]`, `dark:text-[var(--text-primary)]`,
   `dark:text-stone-400`.
8. **F8 — Flagship read-mode eyebrow labels** (`ReadModeView`, `FalsificationCrux`,
   `SynopticTable`, `FlagshipIntro`): `text-rust-700` (2.16-2.33) and 10px bare
   `text-deep` (2.58-2.83). **Fixed** with `dark:text-rust-400` / `dark:text-deep-bright`.
   `/topics/gun-control-effectiveness` 29 -> 12 failing elements.
9. **F9 — `DiamondDiagram` captions** on `/how-it-works`: bare `text-secondary` (2.13) and
   `text-crux` (2.70). **Fixed** (`dark:text-stone-400`, `dark:text-crux-light`).
10. Left for design judgement (not token swaps):
    - Filter-pill counts and roman numerals rendered with `opacity-60` / `opacity-70`
      on already-tinted text (`/concepts`, `/fallacies`, `/glossary`, `/guides`,
      `/library`, `/questions`, `/perspectives`): 1.9-3.0:1. Dropping the opacity
      modifier or using `text-muted` would fix it.
    - Card index numbers "No." `text-muted/70 dark:text-stone-500/70` (2.32-2.45),
      same opacity pattern, on `/fallacies`, `/guides`, `/library` and detail pages.
    - `/methodology` and `/perspectives` inline-styled crux/rust/deep hex numerals and
      badges (2.27-3.5).
    - `VerdictVoting` buttons: white on `bg-stone-400` (2.52) and `bg-rust-400` (2.98)
      fail in both themes.
    - `/analyze` privacy pill `text-deep/70` (1.88) and word counter
      `text-stone-500/70` (2.28).
    - `/community` decorative step numerals `text-deep/40` (1.42) and roman numerals.
    - `GlossaryTerm` dotted-underline button inherits the surrounding `text-secondary`
      without a dark variant (2.13) on the legacy topic view.
    - 404 page footer tagline `dark:text-stone-500` at 10px (3.66).
    - Sidebar/meta labels at `text-muted` 10px measure 4.11 on cards (just under).

## Fixes applied (22 files, all in `components/**` and `app/**`)

Ratios are measured in the browser with the dark class; "before -> after".

| Site | before | after |
|---|---|---|
| `components/BalanceWeightChip.tsx` verdict chip text (Contested / Moderate / Settled) | 2.24 / 3.40 / 2.32 | 4.52 / 4.68 / 5.07 |
| `app/topics/TopicsPageClient.tsx` card descriptions, counts, 13 control labels | 3.24 / 3.66 | 6.16 / 6.97 |
| `app/topics/category/[slug]/page.tsx`, `app/topics/tag/[slug]/page.tsx` cards + status | 3.24 | 6.16 |
| `app/blog/page.tsx` image placeholders (12 light panels) | light panel | dark overlay, 0 panels |
| `app/blog/category/[category]/page.tsx`, `app/blog/tag/[tag]/page.tsx` tag chips | 2.82 | 5.37 |
| `app/how-it-works/page.tsx` score legend (x5) | 3.24 | 6.16 |
| `components/DiamondDiagram.tsx` captions (x3) + crux caption | 2.13 / 2.70 | 6.97 / 5.44 |
| `app/research/page.tsx` "In this article" box, links, numerals, cite | 1.81 / 2.29 / 4.27 | 6.16 / 6.16 / 12+ |
| `app/for-educators/worksheets/[id]/page.tsx` labels (x9) | 3.24-3.66 | 6.16-6.97 |
| `components/FeaturedTopicHero.tsx` (x3), `app/embed/[topicId]/page.tsx`, `app/blog/[slug]/page.tsx` (x2), `app/guides/page.tsx` (x2), `app/dashboard/page.tsx` `deep-light` -> `deep-bright` | 2.86-3.71 | 5.1-6.2 (token spec) |
| `components/ReadModeView.tsx` (x4), `FalsificationCrux.tsx` (x2), `SynopticTable.tsx` (x2), `FlagshipIntro.tsx` eyebrows | 2.16-2.83 | 5.2-6.2 |
| `components/VerdictVoting.tsx` prompt | 3.66 | 6.97 |

Light mode is unchanged: every edit only adds a `dark:` variant, except the chip,
whose light-mode classes resolve to the identical hex values the inline style used.

## Gates

- `./node_modules/.bin/tsc --noEmit` — exit 0
- `./node_modules/.bin/eslint . --max-warnings=0` — exit 0
- `./node_modules/.bin/vitest run lib components` — 146 files, 1910 tests passed
  (includes `darkModeOpacityRatchet` and `darkModeTextTokenRatchet`)
