# Render sweep — 2026-09-15

Verify-by-render pass over every `app/**/page.tsx` route on branch `sprint-2026-09-14`
at commit `87e90eb`, run from a detached worktree against a dev server on port 3105
with `ENABLE_DISAGREEMENT_V2=true NEXT_PUBLIC_ENABLE_DISAGREEMENT_V2=true
ARGUMEND_DISAGREEMENT_PROVIDER=fake`. No database, no API keys.

Environment note: Turbopack refuses a `node_modules` symlink that points outside the
project root (`Symlink [project]/node_modules is invalid, it points out of the
filesystem root`), so the server was started with `next dev --webpack`. This is a
worktree artefact, not a product defect. Screenshots live under
`/private/tmp/claude-501/-Users-amirjalali-argumend/5e3583cb-7683-4c2f-b6c5-019efb2c77cf/scratchpad/render/shots/`
(prefix `d1_`/`d2_`/`d3_` desktop, `m1_`/`m2_` mobile, `v2_` diagnosis, `dark_`/`dark2_` dark mode).

Checks per route at 1280x800 and 390x844: HTTP status, console errors and warnings,
hydration-mismatch text, horizontal overflow (`scrollWidth > innerWidth`), broken
images (`naturalWidth === 0`), visible `undefined` / `NaN` / `[object Object]`.

## Route table

Console column lists only messages that are not dev noise (see "Dev-only noise").
Dark column is "-" where dark mode was not exercised on that route.

| Route | Desktop | Mobile | Console | Dark | Notes |
|---|---|---|---|---|---|
| `/` | 200 | 200, no overflow | clean | header stays parchment (F1) | h1 "The whole fight, not a verdict." |
| `/about` | 200 | 200 | clean | header stays parchment (F1), footer card unreadable (F2) | |
| `/analyses` | 200 | 200 | clean | - | empty list without DB, renders fine |
| `/analysis/[id]` (`does-not-exist`) | 404 | 404 | 404 resource only | - | crawl-safe "Insufficient Evidence for This Page" |
| `/analyze` | 200 | 200 | clean | - | |
| `/analyze-v2` | 200 | 200 | clean | header (F1), footer (F2), teal "Edit" link 2.8:1 (F7) | see Diagnosis flow below |
| `/auth/signin` | 200 -> `/saved` | same | clean | - | signed-out redirect lands on Saved Topics |
| `/blog` | 200 | 200 | clean | - | 9 lazy images pending, none broken |
| `/blog/did-covid-come-from-a-lab` | 200 | 200 | clean | - | |
| `/blog/could-ai-be-conscious` | 200 | 200 | clean | - | |
| `/blog/category/analysis` | 200 | 200 | clean | - | title "analysis Articles", h1 "analysis" lowercase (F8) |
| `/blog/tag/critical-thinking` | 200 | 200 | clean | - | |
| `/community` | 200 | 200 | clean | - | |
| `/concepts` | 200 | 200 | clean | - | |
| `/concepts/steel-manning` | 200 | 200 | clean | - | |
| `/d/[slug]` (`any-slug`) | 404 | 404 | React script-tag error (F5) | - | "Report not found", crawl-safe |
| `/dashboard` | 200 -> `/saved` | same | clean | - | |
| `/embed/ai-mass-unemployment` | **404** | - | 404 resource | - | flagship id not resolvable (F4) |
| `/embed/gun-control-effectiveness` | 200 | 200 | clean | - | legacy id works |
| `/fallacies` | 200 | 200 | clean | - | |
| `/fallacies/ad-hominem` | 200 | 200 | clean | - | |
| `/faq` | 200 | 200 | clean | - | |
| `/for-educators` | 200 | 200 | clean | - | |
| `/for-educators/worksheets/argument-map-template` | 200 | 200 | clean | - | |
| `/glossary` | 200 | 200 | clean | - | |
| `/guides` | 200 | 200 | clean | - | |
| `/guides/triangulation` | 200 | 200 | clean | - | |
| `/how-it-works` | 200 | 200 | clean | - | |
| `/is` | 200 | 200 | clean | - | |
| `/is/climate-change-real` | 200 | 200 | clean | - | |
| `/is/nuclear-energy-safe` | 200 | 200 | clean | - | |
| `/lessons-from-the-deep` | 200 | 200 | clean | - | |
| `/library` | 200 | 200 | clean | - | |
| `/methodology` | 200 | 200 | clean | - | |
| `/perspectives` | 200 | 200 | 2x next/image `sizes` warning, 1x framer-motion scroll-offset warning (F6) | - | |
| `/questions` | 200 | 200 | clean | - | |
| `/questions/is-nuclear-energy-safe` | 200 | 200 | clean | - | |
| `/research` | 200 | 200 | clean | - | |
| `/saved` | 200 | 200 | clean | - | signed-out state |
| `/topics` | 200 | 200 | clean | - | |
| `/topics/ai-mass-unemployment` | 200 | 200 | clean | clean (no header bg, no contrast hits) | |
| `/topics/capitalism-after-ai` | 200 | 200 | clean | - | "undefined" match is prose ("'survive' is undefined"), false positive |
| `/topics/us-israel-support` | 200 | 200 | clean | - | |
| `/topics/gun-control-effectiveness` (legacy) | 200 | 200 | clean | - | |
| `/topics/category/policy` | 200 | 200 | clean | - | |
| `/topics/compare` | 200 | 200 | clean | - | |
| `/topics/compare/ai-mass-unemployment/vs/capitalism-after-ai` | **404** | - | 404 resource | - | flagship ids not resolvable (F4) |
| `/topics/compare/gun-control-effectiveness/vs/death-penalty-deterrence` | - | 200 | clean | - | legacy pair works |
| `/topics/tag/policy` | 200 | 200 | clean | - | |

Totals: 47 route instances swept at desktop, 47 at mobile. Zero horizontal overflow at
390px on every route (scrollWidth 382 or 390 vs innerWidth 390). Zero broken images.
Zero hydration-mismatch text. Zero genuine stray `undefined`/`NaN`/`[object Object]`.

## Diagnosis flow (`/analyze-v2`, fake lane)

Pasted the `source` from `data/evals/disagreement/trust-split-traffic-study.json`
(679 characters, counter showed "679 / 20,000 characters"), clicked "Find what it turns
on", report arrived in about 14 seconds via `POST /api/disagreements/analyze` 200
(server log: provider `fake`, model `fake-disagreement-v1`).

What rendered (screenshots `v2_report_desktop.jpg`, `v2_report_mobile.jpg`):

- Diagnosis h1: "This text does not contain a disagreement." Sub-line "What is being
  discussed?" and label "DISAGREEMENT · UNKNOWN". At-a-glance: Positions 0, Shared
  premises 0, Disputed questions 0, Cruxes 0.
- Sections: "What they agree on", "The positions", "What could move this forward",
  "What this report does not establish", "Share". Four content boxes, not six. No crux
  box, no evidence-state box.
- Stake ledger: DOM search for "stake" (text, class, id, aria-label) found nothing.
- Winner / percentage: no `%` anywhere; the only "right" match is the source-only
  disclaimer "It does not fact-check claims, identify motives, or judge who is right."
  Pass.
- Mobile: no overflow, no console errors. Desktop: no console errors.

Why six boxes and the ledger did not render: `pickFixture` in
`lib/disagreement/model/fake.ts` keys on hard-coded keywords ("uninsured",
"capitalism", "bike lane", ...) and falls through to few-shot example 5 (the
non-disagreement fixture) for any other text, including this trust-split fixture. So
the fake lane cannot exercise the full report for this input. See F3. The six-box
and stake-ledger render therefore remains **unverified** by this sweep.

## Dark mode

Note on method: the theme provider hydrates after load and rewrites the `<html>`
class from `localStorage`, so a class added before hydration is discarded. Valid dark
results come from clicking the "Dark mode" toggle (persists `theme=dark`) and from the
class added after hydration on `/analyze-v2`. The first `dark_home.jpg` and
`dark_topic_*.jpg` captures were taken before the reset and are light mode; use the
`dark2_*` and `dark_home_via_toggle.jpg` captures instead.

Contrast scan (computed text colour vs nearest opaque ancestor background, WCAG ratio,
gradient backgrounds skipped), worst unique hits:

| Page | Element | fg on bg | Ratio | Finding |
|---|---|---|---|---|
| `/`, `/about`, `/analyze-v2` | header wordmark "ARGUMEND" | rgb(231,229,228) on rgb(244,241,235) | 1.11 | F1 |
| same | header nav "Explore", "Search", tagline "Disagree better." | rgb(168,162,158) on rgb(244,241,235) | 2.24 | F1 |
| `/`, `/about`, `/analyze-v2` | footer newsletter h3 "Stay curious" | rgb(61,58,54) on rgb(32,31,28) | 1.46 | F2 |
| same | footer newsletter body "Weekly debates, new topics..." | rgb(86,77,69) on rgb(32,31,28) | 2.00 | F2 |
| `/`, `/about` | crux-crimson labels "Contested", "low weight" | rgb(162,59,59) on rgb(37,36,32) | 2.39 | F7 |
| `/about` | deep-teal "high weight / strong lean" | rgb(58,105,101) on rgb(37,36,32) | 2.51 | F7 |
| `/analyze-v2` | teal "Edit" link | rgb(58,105,101) on rgb(26,25,23) | 2.83 | F7 |
| `/topics/ai-mass-unemployment` | none | | | clean |

## Findings, ranked

### F1 (High) Top bar stays parchment in dark mode; wordmark and nav become unreadable

- Repro: any page using `TopBar` (`/`, `/about`, `/analyze-v2`), 1280 wide, click the
  "Dark mode" toggle. `getComputedStyle(header).backgroundColor` returns
  `rgba(244, 241, 235, 0.9)` while `body` is `rgb(26, 25, 23)`.
- Evidence: `shots/dark_analyze-v2_report.jpg` (parchment band across the top with the
  wordmark barely visible), `shots/dark2_about.jpg`, `shots/dark2_home.jpg`.
- Cause: `components/TopBar.tsx:68` uses `dark:bg-[var(--bg-canvas)]/90`. Tailwind
  cannot apply an opacity modifier to an arbitrary CSS-variable colour, so no dark
  background rule is generated and the light `bg-[#f4f1eb]/90` wins. The same pattern
  is used for the border (`dark:border-[var(--border-divider)]/60`).
- Fix direction: use an explicit dark colour with alpha (for example
  `dark:bg-[#1a1917]/90`) or expose the canvas colour as an RGB-channel variable.

### F2 (High) Footer newsletter card text invisible in dark mode

- Repro: any page with the site footer in dark mode, scroll to "Get new arguments in
  your inbox". Heading "Stay curious" is 1.46:1, body copy is 2.0:1.
- Evidence: bottom of `shots/dark_analyze-v2_report.jpg`, `shots/dark2_about.jpg`.
- Cause: the card uses the `text-primary` / `text-secondary` Tailwind aliases, which
  resolve to the light-mode stone values with no `dark:` variant, inside a card whose
  background does switch to dark.

### F3 (High for verification, not a UI bug) Fake lane cannot produce a full report for the trust-split fixture

- Repro: `/analyze-v2` with `ARGUMEND_DISAGREEMENT_PROVIDER=fake`, paste
  `trust-split-traffic-study.json` source, submit. Result is "This text does not
  contain a disagreement." with 0 positions and 0 cruxes.
- Cause: `pickFixture` in `lib/disagreement/model/fake.ts` falls through to the
  non-disagreement few-shot example for unmatched text.
- Consequence: the six-box layout, crux box, evidence-state box and the stake ledger
  were not rendered and are unverified by this sweep. The fake lane needs a fixture
  keyed on "interchange" / "traffic" (or a generic two-position fallback) before this
  checkpoint can be render-verified offline.
- Secondary copy issue on the zero-position report: the sub-line "What is being
  discussed?" and the label "DISAGREEMENT · UNKNOWN" read as unfinished placeholders.

### F4 (Medium) Flagship topic ids 404 on `/embed/[topicId]` and `/topics/compare/[id1]/vs/[id2]`

- Repro: `/embed/ai-mass-unemployment` -> 404; `/topics/compare/ai-mass-unemployment/vs/capitalism-after-ai` -> 404.
  Legacy ids work: `/embed/gun-control-effectiveness` 200,
  `/topics/compare/gun-control-effectiveness/vs/death-penalty-deterrence` 200.
- Both routes resolve ids through `topicSummaries` / `loadTopicById` from
  `data/topicIndex.ts`, which does not include the three flagship ArgumentGraph topics
  served by `/topics/[id]`. Either add flagship ids to those routes or make sure nothing
  links flagship topics into embed or compare.

### F5 (Medium) `/d/[slug]` not-found page logs a React script-tag error

- Repro: `/d/any-slug` at either width. Status 404, page renders "Report not found",
  but the console shows `Encountered a script tag while rendering React component.
  Scripts inside React components are never executed when rendering on the client.`
- No `<script>` appears in `app/d/[slug]/not-found.tsx`; the tag most likely comes
  from a JSON-LD or analytics `<script>` in a shared layout that is re-rendered
  client-side when the not-found boundary triggers. Harmless to the visitor, but it
  means that script (structured data or GA) is not executing on this page.

### F6 (Low) `/perspectives` image and scroll warnings

- `Image with src "/images/perspectives/moment.jpg" has "fill" but is missing "sizes"`
  and the same for `rewind.jpg` (both widths). Performance only.
- framer-motion: `Please ensure that the container has a non-static position ... scroll
  offset is calculated correctly` (both widths). A `useScroll` target container needs
  `position: relative`; scroll-linked animation may be mis-timed.

### F7 (Low) Brand colours used as fixed text colours fail contrast in dark mode

- Crux crimson `#a23b3b` text on dark cards is 2.39:1 ("Contested", "low weight" on
  `/`, `/about`). Deep teal `#3a6965` text is 2.5 to 2.8:1 ("high weight", the "Edit"
  link on `/analyze-v2`). These are hard-coded `text-[#a23b3b]` / `text-[#3a6965]`
  classes with no lighter `dark:` variant.

### F8 (Low) Blog category label case

- `/blog/category/analysis` renders title "analysis Articles" and h1 "analysis" while
  sibling categories are "Both Sides" and "Case Studies". Data inconsistency in
  `data/blog.ts` category strings.

## Dev-only noise (ignored)

- `Failed to load resource: the server responded with a status of 404` on every
  intentional 404 page. Expected.
- `The resource .../_next/static/media/*.woff2 was preloaded using link preload but not
  used within a few seconds` (four fonts, seen on `/analyses` and `/analyze-v2`). Timing
  artefact of dev font loading, not present as a rendering problem.
- Next.js dev badge (`nextjs-portal`) present on every page; no error toasts were
  raised on any route.

## Sitemap check

`curl` of all 294 URLs from `/sitemap.xml` against port 3105: 294 x 200, zero
non-200. Note the sitemap intentionally advertises only the pruned core surface
(`/`, `/topics`, 291 topic URLs, `/analyze`, `/about`) per the comment in
`app/sitemap.ts`; blog, guides, `/is`, concepts and the other content routes are
served but not listed.

## Not covered

- Six-box report, crux box and stake ledger render (blocked by F3).
- Signed-in states of `/saved` and `/dashboard` (no database).
- `/analysis/[id]` with a real id (no database).
- Dark mode was exercised on `/`, `/about`, `/analyze-v2` and
  `/topics/ai-mass-unemployment` only.
