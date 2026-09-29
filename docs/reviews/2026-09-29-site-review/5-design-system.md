# Design-system consistency (measured in code): evaluation

## Verdict (≤6 lines)
Argumend has the vocabulary of a design system (tokens, `label-caps`, rust and teal) but not the system itself. No shared page component exists (there is no `components/ui/`), so each of the ~46 routes writes its own shell, header, container, button and card by hand. Measured: **6 shell implementations, 12 page-header patterns, 18 h1 size signatures, 26 h2 signatures, 7 container widths, 36 card signatures, 14 filled-button signatures**. The 8 `.btn-*` classes are used **0 times**, and `.surface-card` accounts for 15 of about 190 card-like boxes. The 09-22 redesign made the newest pages good one at a time, but each one added its own arbitrary sizes, so the site as a whole became *less* consistent. The one change that matters most: put every route in one working shell (fix the sticky bug, fix the dead hamburger, give /is and /questions a shell). Then add `PageHeader`, `Section` and `Button` in `components/ui/`, modelled on /ai and /analyze-v2 with their numbers normalised, and move the pages onto them.

## Page scorecard (per-route pattern table)
Codes are defined below the table. Consistency is scored against the target pattern: DOC/ED header, tokens only, one shell, one rust fill. Other evaluators score clarity, phone and vision fit, so those columns are omitted here.

| Route | Shell | Header pattern | h1 size | Container | Primary CTA | Cards | Crumbs | Bottom block | Consistency 1-5 | Keep / Merge / Demote / Remove |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | HOME (own copy of shell) | ED | custom 2.5→3.25→3.75rem | 5xl | flat rust-600 `rounded-lg` | none; hairline rows | N | Footer | 4 | Keep (model) |
| `/topics` | AS | ED/PLAIN | custom 2.5→3.25rem | 5xl | text links | hairline rows | Y | Footer | 4 | Keep (hub model) |
| `/topics/[id]` flagship | AS-R | DOC | custom 2.25rem→5xl | 2xl | none | surface-card/paper | **N** | Footer | 3 (37 raw hex) | Keep |
| `/topics/[id]` legacy | AS | DOC-ish | 4xl→5xl | [88rem] / 72ch | `bg-deep` pill | surface-card + white | Y | Footer | 3 | Keep |
| `/ai` | AS-R | DOC | custom 2.6→3.6rem | [44rem] | none | ruled rows | N | Footer | 4 | Keep (document model) |
| `/analyze-v2` | TB, **dead ☰** | DOC | custom 2.375rem→5xl | 5xl / 3xl | flat rust-600 **pill** | none | N | Footer | 3 | Keep (the one analyze) |
| `/reply` | TB, **dead ☰** | DOC | custom 2.375rem→5xl | 3xl | flat rust-600 pill | none | N | Footer | 3 | Keep; share v2's shell |
| `/d/[slug]` | TB, **dead ☰** | DOC (report) | 3xl→4xl | 5xl | underline link | surface-card | N | Footer | 3 | Keep |
| `/analyze` | HAND (copy of AppShell) | PILL-C | A, Title Case | 3xl | gradient `rounded-xl` + teal segmented | `bg-white rounded-2xl shadow` | N | Footer | 1 | Merge into /analyze-v2 |
| `/analyses` | AS | PILL-C | A | 3xl | 2× gradient xl | white | Y | Footer | 2 | Remove (500 in dev) |
| `/analysis/[id]` | AS | PILL (left) | A | 3xl | gradient xl | surface-card + white + 11 gradients | N | Footer | 1 | Demote |
| `/about` | AS | BAND-L | A+ | 3xl | none | white + `#faf8f5` | Y (in band) | Footer | 2 | Keep, re-template |
| `/how-it-works` | AS | BAND-C, two-tone | A+ | 4xl | gradient xl | `#faf8f5` + white | Y | centred sections | 2 | Merge into /about |
| `/methodology` | AS | BAND-C, two-tone | A+ | 4xl | gradient lg | `#fefcf9` + white, 10 gradients, 27 hex | Y | centred sections | 1 | Keep, re-template |
| `/community` | AS | BAND-L, two-tone | A+ | 4xl | gradient lg + dark `#3d3a36` card | white | Y | dark CTA card | 2 | Merge into /about |
| `/for-educators` | AS | BAND-L, two-tone | A+ | 4xl | **2×** gradient lg | `#faf8f5` ×5 + white | Y | centred sections | 2 | Demote |
| `/for-educators/worksheets/[id]` | BARE (print) | print header | 3xl bold | 3xl | gradient lg | none | N | own footer | n/a | Keep (print, exempt) |
| `/lessons-from-the-deep` | AS | BAND-L + gradient icon tile | A+ | 3xl | none | white; 27 hex, 5 gradients | Y | none | 1 | Remove |
| `/research` | AS | PLAIN, two-tone + label-caps | A | 3xl | gradient lg | `#faf8f5` | Y | centred hairline CTA | 3 | Merge with /library, /methodology |
| `/library` | AS | PILL (teal, left) | A | 3xl | gradient xl | `white/80` | Y | CTA card | 2 | Merge into /research |
| `/faq` | AS | PLAIN | A | 3xl | none | hairline | Y | Footer | 4 | Keep |
| `/privacy`, `/terms` | AS | PLAIN + "Last updated" | A (leading 1.1) | 3xl | none | `#faf8f5` notice | Y | Footer | 4 | Keep |
| `/blog` | AS | TINT + label-caps | A, Title Case | 4xl | none | `#faf8f5` | Y | Footer | 3 | Keep |
| `/blog/[slug]` | AS (via client.tsx) | TINT + teal pill | A | 3xl | none | `#faf8f5` related cards | Y | **2nd newsletter** | 2 | Keep |
| `/blog/category/*`, `/blog/tag/*` | AS | TINT + label-caps | A | 4xl | none | `#faf8f5` | Y | pagination | 3 | Demote (a filter on /blog) |
| `/concepts` | AS | PLAIN | A, Title Case | 3xl | none | white | Y | none | 3 | Keep (one Learn template) |
| `/concepts/[slug]` | AS | SPEC | A | 3xl | gradient xl | white | Y | centred hairline CTA | 3 | Keep (Learn) |
| `/fallacies` | AS | PLAIN + label-caps | A, Title Case | 4xl | none | white | Y | none | 3 | Keep (Learn) |
| `/fallacies/[slug]` | AS | SPEC | A | 3xl | gradient xl | white ×5 | Y | centred hairline CTA | 3 | Keep (Learn) |
| `/glossary` | AS | ICON + label-caps | B | 4xl | gradient lg | white + `#faf8f5` | Y | CTA card | 2 | Keep (Learn) |
| `/guides` | AS | PLAIN + label-caps | A, Title Case | 5xl | teal fill | white; `teal-300`; 12 hex | Y | gradient box | 2 | Keep (Learn) |
| `/guides/[id]` | AS | SPEC | A | 3xl | none | gradient callout | Y | none | 3 | Keep (Learn) |
| `/perspectives` | AS | DISPLAY, centred, animated | `display-text` | 4xl / 6xl | gradient xl | gradients | N | none | 1 | Remove or demote |
| `/is` | **NONE** | AEO | C (bold) | 4xl | gradient lg | surface-card + panel | Y | rust box + own `<footer>` | 1 | Put in shell; merge with /questions |
| `/is/[slug]` | **NONE** | AEO + uppercase pill | C | 3xl | gradient lg | panel | Y | rust box + own `<footer>` | 1 | Same |
| `/questions` | **NONE** | AEO | C | 4xl | gradient lg | panel | Y | rust box + own `<footer>` | 1 | Merge with /is |
| `/questions/[slug]` | **NONE** | AEO + category chips | C | 3xl | gradient lg | panel | Y | rust box + own `<footer>` | 1 | Merge with /is/[slug] |
| `/topics/category/[slug]` | AS | PLAIN + label-caps | A | **6xl** | none | white `card-hover` | Y | pagination | 3 | Demote (= `/topics?category=`) |
| `/topics/tag/[slug]` | AS | PLAIN + label-caps | A | 6xl | none | white | Y | pagination | 3 | Demote |
| `/topics/compare` | AS; **crumbs above TopBar** | PILL-C (uppercase) | A, Title Case | 5xl | gradient toggle | white; dark `#121210` | broken | none | 1 | Demote / remove |
| `/topics/compare/[a]/vs/[b]` | AS; **crumbs above TopBar** | PILL-C; h1 rust vs teal | A | 6xl | none | `#faf8f5`; `#121210` | broken | none | 1 | Remove |
| `/saved` | AS | ICON (rust tile) | B, Title Case | 5xl | gradient lg | white | N | none | 3 | Keep |
| `/dashboard` | AS (redirects to /saved with auth off) | ACCT | B | 5xl | **2×** gradient lg | white | N | none | 2 | Demote (auth-gated) |
| `/auth/signin` | BARE (redirects with auth off) | centred logo-as-h1 | 3xl medium | sm | gradient xl | white | N | none | n/a | Keep (gated) |
| `/embed/[id]` | BARE | compact | xl→2xl | 600px | none | none | N | none | n/a | Keep (exempt) |
| 404 (`app/not-found.tsx`) | none | centred, Title Case | A | none | gradient xl + 2 outline | none | N | none | 2 | Keep; use RouteNotFound |

**Shell codes.** AS = `AppShell` browse (sidebar opens on desktop after hydration). AS-R = `AppShell layout="reading"`. HOME = `SidebarLayout` in `components/HomeClient.tsx:50`. HAND = hand copy at `app/analyze/page.tsx:450-497`. TB = `<TopBar/>` + `<Footer/>` only. NONE = no top bar, no nav, no site footer. BARE = intentionally chromeless.

**Header codes.** ED = editorial split (`HomeLanding.tsx:36-47`). DOC = label-caps eyebrow + serif h1 + serif lede, left (`AiLivingMap.tsx:91-104`, `argument/DebateView.tsx:101-115`, `DisagreementAnalyzeClient.tsx:138-154`, `reply/page.tsx:40-53`, `ReadModeView.tsx:265-280`). BAND-L/-C = `bg-gradient-to-b from-[#f4f1eb]/80` band, left or centred (`about:49`, `community:71`, `for-educators:230`, `lessons:146`, `how-it-works:84`, `methodology:146`). TINT = `bg-[#faf8f5]/60 border-b` band (`blog:125`, `blog/category:153`, `blog/tag:154`, `blog/[slug]:332`). PLAIN = left, optional label-caps. ICON = icon tile beside h1 (`glossary:77`, `SavedClient:61`, `lessons:153`). SPEC = icon circle + chip + "No. 07" (`concepts/[slug]:141`, `fallacies/[slug]:128`, `guides/[id]:~215`). PILL-C = centred sans pill-badge hero (`analyze:506-529`, `analyses:84-92`, `CompareIndexView:528-539`, `ComparisonView:313-325`; left variant `AnalysisView:572-590`). AEO = `font-bold` serif h1 + sans lede, no shell (`is:121`, `is/[slug]:249`, `questions:176`, `questions/[slug]:260`). DISPLAY = `perspectives:391-401`. ACCT = `dashboard:83`.

**h1 codes.** A = `text-3xl sm:text-4xl lg:text-5xl` (25 h1s). A+ = A + `xl:text-[3.5rem]` (6). B = `text-3xl sm:text-4xl` (6). C = `text-4xl sm:text-5xl font-bold` (4). "custom" = arbitrary rem values; the five most recent pages use five different scales.

## Findings (ranked, most severe first)

### F1. The top bar and sidebar scroll away on every page, leaving a blank 245px column
- Severity: high     Scope: system     Effort: S
- Where: every AppShell route at ≥768px. Measured with Playwright on `/glossary` and `/topics/ai-mass-unemployment` at scrollY 2307: header `getBoundingClientRect().top = -2307` although `position: sticky`; the sidebar `<nav>` is 12,601px and 5,839px tall and has scrolled off screen; `#main-content` never scrolls. Screenshot `eval/extra/_glossary--scrolled-2500.png`. Code: `app/globals.css:142-145` (`html, body { overflow-x: hidden }` makes `<body>` the scroll container, so `sticky` on `components/TopBar.tsx:68` has nothing to stick to); `components/AppShell.tsx:44` (`overflow-hidden` row) and `:98` (`main … overflow-y-auto`, which never scrolls because the root is `min-h-[100svh]`, not `h-`).
- Problem: after one screen of scrolling the reader has no navigation, no search and no theme control. On desktop the left 245px becomes an empty parchment strip beside the content (visible in the screenshot above), so every long page looks broken.
- Fix: change the rule to `overflow-x: clip` on `html, body` (clip does not create a scroll container), or drop it from `body`. Make the sidebar's inner wrapper `sticky top-[57px] h-[calc(100svh-57px)] overflow-y-auto`. Delete the `overflow-y-auto` on `main` in AppShell, HomeClient and `analyze/page.tsx`. The reading-progress workaround in `app/blog/[slug]/client.tsx:19-27` can then assume window scroll.

### F2. Six shell implementations make the frame itself differ from page to page
- Severity: high     Scope: system     Effort: M
- Where:
  - (1) `AppShell` browse, imported by 37 route files.
  - (2) `AppShell layout="reading"` on /ai and flagship topics.
  - (3) `components/HomeClient.tsx:50-100, 182, 206`, a copy of AppShell (300ms cubic easing against AppShell's 500ms spring).
  - (4) `app/analyze/page.tsx:450-497`, a second hand copy.
  - (5) `<TopBar/>` + `<Footer/>` only: `app/analyze-v2/page.tsx:19-27`, `app/reply/page.tsx:35-60`, `app/d/[slug]/page.tsx:58-100`. The hamburger renders unconditionally (`TopBar.tsx:71-80`) with `onClick={undefined}`. Verified: clicking "Toggle sidebar" on /analyze-v2 and /reply does nothing, and no nav exists in the DOM.
  - (6) No shell at all: `app/is/page.tsx:117`, `app/is/[slug]/page.tsx:237`, `app/questions/page.tsx:165`, `app/questions/[slug]/page.tsx:247`. No top bar, no search, and their own `<footer>` (`is/page.tsx:152` etc.). See `eval/is--1440.png`, `eval/questions--1440.png` and `extra/ds-heroes-B.png`.
  - Also: `app/topics/compare/page.tsx:139-145` and `compare/[id1]/vs/[id2]/page.tsx:212-219` render `<Breadcrumbs>` outside AppShell, so the trail sits **above the top bar** (`extra/ds-heroes-A.png`, `extra/ds-phone-heroes.png`).
- Problem: /is and /questions (140 and 248 SEO landing pages) are dead ends with no way into the product. The paste tools show a menu button that does nothing. AppShell is mounted inside each page rather than in a layout, so the sidebar resets on every navigation. It also renders closed on the server and opens after hydration on desktop (`hooks/useSidebarState.ts`, `getServerHydrationSnapshot` = false), so content jumps 260px on load. That is the "legacy sidebar pops in" item from 09-22, still open.
- Fix, in two steps. **S:** wrap the four AEO pages and the three TB pages in `<AppShell layout="reading">`, and move the compare breadcrumbs inside the view components. **M:** put AppShell in a route-group layout (`app/(site)/layout.tsx`, with a `(reading)` group for flagship, /ai and the tools). Delete the HomeClient and /analyze copies, and have TopBar hide the menu button when no handler is passed.

### F3. Two navigation bars that disagree, and a sidebar topic list that goes to the wrong place
- Severity: high     Scope: system     Effort: S
- Where:
  - At ≥1024px the top bar (Explore, Analyze, About, Search, theme) and the sidebar (Home, Explore, Analyze Text, Saved, About) are on screen together.
  - Labels differ ("Analyze" vs "Analyze Text"). Targets differ too: TopBar goes to `/analyze-v2` when the flag is on (`TopBar.tsx:133`), the sidebar goes to `/analyze` (`lib/nav.ts:56`), and v2's own error link goes back to `/analyze` (`DisagreementAnalyzeClient.tsx:225`). The footer has no Analyze link at all (`nav.ts:89-98`).
  - `TopBar.tsx:123-149` hard-codes its links, although `lib/nav.ts:1-11` says it is the single source.
  - The sidebar "Topics" list is `topicSummaries.slice(0, 8)` (`Sidebar.tsx:195`): Legalizing Sports Betting, PFAS, Intermittent Fasting, not the flagships. It is rendered as `<button>`s that `router.push('/?topic=X&view=logic-map')` (`Sidebar.tsx:64-71`), which is the legacy graph canvas. Every other topic link on the site goes to `/topics/[id]`.
  - The theme toggle is three 44px radio buttons in a pill (`ThemeToggle.tsx:34-69`, `TopBar.tsx:164-166`), the widest control in the header for the least-used setting.
- Problem: the same destination appears twice with two names and sometimes two URLs. A new visitor clicking a sidebar topic lands in the old canvas UI, not the page the rest of the site links to.
- Fix:
  - TopBar maps `primaryNav` from `lib/nav.ts`. Add a single `ANALYZE_HREF` there, used by the top bar, the sidebar, the footer and the v2 error link.
  - On desktop, drop the persistent sidebar. The top bar is the nav; keep the drawer for phones only, built from the same `navItems`.
  - If the topic list stays, make it the three flagship maps as `<Link href="/topics/[id]">`.
  - Replace ThemeToggle in the bar with one icon button that cycles light, dark and system, or move it to the footer.

### F4. Twelve page-header patterns, including a centred SaaS hero on the tool the vision cares about most
- Severity: high     Scope: system     Effort: M
- Where: the header codes in the table above. Counts: **18 h1 size/weight signatures** over 57 h1s and **26 h2 signatures** over 134 h2s.
  - Centred sans pill-badge hero: `/analyze` (`app/analyze/page.tsx:506-529`), `/analyses`, `/topics/compare`, the compare pair.
  - Two-tone h1 with a grey second line: about, community, for-educators, how-it-works, methodology, research.
  - `font-bold` Garamond only on the four AEO pages (`is/page.tsx:122` etc.).
  - Title Case h1s: "Analyze Any Argument", "Compare Debates Side by Side", "Critical Thinking Guides", "The Argumend Blog", "Logical Fallacies", "Key Concepts", "Saved Topics", "Insufficient Evidence for This Page". Sentence case elsewhere ("Explore topics", "Reply with the map"). Topic titles mix too: legacy "Nuclear Energy for Climate" vs flagship "Will AI cause mass unemployment?".
  - Heading ink comes in three spellings: `text-primary dark:text-stone-200` (most), `text-[var(--text-heading)]` (analyze-v2, reply, report), `text-stone-900 dark:text-stone-50` (flagship, /ai).
  - Ledes are sans `text-lg text-secondary` on older pages and serif `text-xl` on the new ones.
- Problem: moving from /analyze-v2 (editorial, left, serif) to /analyze (centred, pill badges, white card, Title Case) or from /about (gradient band) to /is (bold, no shell) reads as moving between products. Headings are almost all Garamond (only 26 of 98 h3s are sans), so the inconsistency comes from alignment, size, weight, case, decoration and ink, not from font family.
- Fix: one `PageHeader` (API below). Always left-aligned. The eyebrow is always `label-caps`. Use sentence case everywhere and no `font-bold`. Delete the gradient bands, pills, icon tiles and two-tone h1s.

### F5. The button system is unused, and it does not define the brand CTA anyway
- Severity: high     Scope: system     Effort: S
- Where: `app/globals.css:296-333` defines `.btn`, `.btn-sm/md/lg`, `.btn-primary`, `.btn-crux`, `.btn-ghost`, `.btn-outline` and `.btn-deep`. There are **0 uses** in app, components and lib; only `.btn-lift` (a hover transform) is used, 9 times. `.btn-primary` is **ink** `#3d3a36` (`globals.css:315-317`), not rust. Instead, 52 filled buttons follow 14 signatures:
  - rust-600→700 gradient `rounded-xl`, 15 files: not-found, analysis/[id], analyses, signin, library, perspectives, how-it-works, fallacies/[slug], concepts/[slug], RouteNotFound, RouteErrorState, DiamondDiagram, TopicIntroPanel, ShareVerdictCard, analysis not-found.
  - the same gradient `rounded-lg`, 14 files: research, saved, for-educators, PrintWorksheetButton, methodology, is, is/[slug], dashboard, glossary, community, questions, questions/[slug], ShareButtons, CitationCard.
  - flat rust-600 `rounded-full`, 4 files, the newest: `DisagreementAnalyzeClient.tsx:188`, `MapReplyForm.tsx:100`, `MapReplyFooter.tsx`, `ShareReport.tsx`.
  - flat rust-600 `rounded-lg`: FeaturedTopicHero, legacy DebateView.
  - `bg-[#3d3a36] rounded-2xl` (community), `bg-deep` pills (ReadModeView, FlagshipIntro), `bg-[#a23b3b]` (TopicIntroPanel).
  - More than one rust fill on a page: /for-educators, /dashboard, /analyses.
- Problem: the same "primary action" has three shapes and two finishes depending on page age. The "one rust fill per page" rule cannot be enforced because there is nothing to enforce it with. The quiet secondary action (`inline-flex min-h-11 items-center font-sans text-sm text-deep underline underline-offset-2 hover:text-deep-dark dark:text-accent-text`) is pasted about 10 times across analyze-v2 and reply.
- Fix: make `.btn-primary` rust (founder decision needed: flat `rust-600` pill as on the newest pages, or the approved 600→700 gradient; pick one radius). Add `<Button>` and `<TextAction>` (below) and replace the 35 hand-rolled rust CTAs listed above.

### F6. 36 card recipes; `.surface-card` covers under 10% of them
- Severity: medium     Scope: system     Effort: M
- Where: most common recipes are `bg-white rounded-xl border` (37 uses, 24 files), `bg-white rounded-xl shadow border` (17 uses, 14 files), `surface-card` (15 uses, 10 files, three of them dead: `disagreement/DiagnosisHero`, `PositionsSection`, `DisagreementsSection`), `bg-[#fefcf9] rounded-xl border` (6 files), `bg-[#faf8f5] rounded-xl border` (10), `bg-rust-50 rounded-xl/lg border` (15 files), `bg-[#faf8f5] rounded-2xl` (6), `bg-white rounded-2xl shadow` (/analyze input `app/analyze/page.tsx:580`), and 28 more. `.surface-paper` has 4 files and `.card-hover` 6.
- Problem: home and /topics moved to hairline-ruled rows with no boxes. About, methodology, how-it-works, for-educators, glossary and the Learn pages still box every paragraph in white cards with shadows, which is the "template chrome" look the 09-22 audit removed from landing pages.
- Fix: two surfaces only. Use (a) hairline-ruled rows, the `HomeLanding.tsx:50-68` / `TopicsPageClient` pattern, for lists. Use (b) `.surface-card` for a box that is actually needed (evidence, crux, form). Delete the `#faf8f5`/`#fefcf9`/`white` recipes during the page sweep.

### F7. Off-system colour: a dozen dark-mode teals, crimson used for categories, and raw hex even on the flagship
- Severity: medium     Scope: system     Effort: S
- Where:
  - **No amber, orange, yellow, green, red, blue or purple Tailwind classes remain** (0 hits). The purge held.
  - **Dark teals:** 12 variants hand-coded in 47 files: `#8bb5b1` ×30, `#9bc7c3` ×28, `#8fc0bb` ×16, `#7fb5b0` ×14, `#6fa39e` ×14, plus `#b7d9d6`, `#5a8a86`, `#a9cbc8` and others. Tailwind `teal-200/300/400` (neon mint `#5eead4` in dark mode) appears in `app/guides/page.tsx` ×10, `questions/[slug]` ×8, `guides/[id]` ×7, `IsHubClient` ×6, `QuestionsSearch` ×5, `is/[slug]` ×4 and `auth/signin` ×3. The token `text-accent-text` exists and is used in only 29 files.
  - **Crimson as a category:** `lib/conceptMeta.ts:70` ("Stress-Testing the Reasoning"), `lib/fallacyMeta.ts:88` ("False Structure"), `lib/glossaryMeta.ts:107` ("Logical Fallacies & Biases"), `lib/guideMeta.ts:92` ("Reasoning Under Uncertainty"). The sibling `lib/categoryColors.ts:16-19` says crimson "never labels a category".
  - **Raw hex:** 538 occurrences in 94 files. The flagship `components/argument/DebateView.tsx` writes `text-[#8B5A3C]`, `[#3a6965]`, `[#a23b3b]` and `[#C4613C]` (lines 249, 364, 391, 682, 700) where the `skeptic`, `deep`, `crux` and `rust` tokens exist.
  - **Canvas in three spellings:** `bg-canvas` (28 files), `bg-[var(--bg-canvas)]` (12), `bg-[#f4f1eb]` (16, including `TopBar.tsx:68`). Compare pages and the worksheet use dark `#121210` (`CompareIndexView.tsx:525`, `ComparisonView.tsx:310`, `worksheets/[id]/page.tsx:593`), which is not the canvas `#1a1917`, so those pages are a different black.
  - **Gradients:** 119 in 44 files (AnalysisView 11, methodology 10, /analyze 9).
  - `bg-white` without a dark partner: only 2 of 102 (lessons). This is fine.
- Problem: dark mode shows three or four slightly different teals on one page, and mint on the Learn and AEO pages. Crimson is meant to mean "this is a crux", but it also marks a guide track and a glossary chapter.
- Fix: bulk-replace the dark teal hexes and `teal-\d` with `text-accent-text` / `ring-accent-text/60`. Switch the four crux-tone chips to `skeptic` or `plum`. Use `bg-canvas` everywhere. Add a contract test in the style of the existing `lib/*` token guards that fails on `-[#` for palette colours in `className` and on `\bteal-\d`.

### F8. Seven container widths, so the h1's left edge moves between sibling pages
- Severity: medium     Scope: system     Effort: S
- Where: widths `max-w-2xl` (flagship), `[44rem]` (/ai), `3xl` (about, concepts, library, faq, legal, detail pages, reply), `4xl` (blog, fallacies, glossary, methodology, how-it-works, community, for-educators, /is, /questions), `5xl` (home, topics, guides, saved, dashboard, analyze-v2), `6xl` (topics/category, topics/tag, compare pair), `[88rem]` (legacy topics). Gutters come in five patterns (`px-4 md:px-8`, `px-4 sm:px-6 lg:px-8`, `px-5 sm:px-8`, `px-4 sm:px-6`, `px-4`), and top padding ranges from `py-6` to `py-20`.
- Problem: the four Learn hubs alone use 3xl, 4xl, 4xl and 5xl, so moving between them shifts the heading left and right. The same happens between /topics (5xl) and a category filter of it (6xl).
- Fix: `PageContainer` with two widths, reading (44rem) and default (5xl), plus one gutter and one vertical rhythm.

### F9. Bottom-of-page blocks: five closing-CTA styles and a duplicated newsletter
- Severity: medium     Scope: template     Effort: S
- Where:
  - Rust-tinted boxes: `is/page.tsx:136`, `is/[slug]`, `questions`, `questions/[slug]`.
  - Centred hairline CTA with an italic note: concepts/[slug], fallacies/[slug], research.
  - White or `#faf8f5` CTA cards: library, glossary.
  - A dark `#3d3a36 rounded-2xl` card: community.
  - A gradient box: guides.
  - Blog posts render `<NewsletterSignup>` in the article (`app/blog/[slug]/page.tsx:431-434`) and again in the Footer (`components/Footer.tsx:44`).
- Problem: every page ends differently. Blog readers see the same signup twice within one scroll.
- Fix: delete the in-article signup. Replace the closing boxes with one `Section` that holds a single `TextAction` or `Button`, or with nothing, since the footer already closes every page.

### F10. Body prose is serif on new pages and sans on old ones
- Severity: medium     Scope: system     Effort: S
- Where: serif on the flagship, /ai, the analyze-v2 and reply ledes, blog posts and guides (`.prose-custom` / `.reading-body`, `globals.css:368-377`, 2 uses each). Sans `text-lg text-secondary` on about, methodology, how-it-works, faq, research, privacy, terms, /is and /questions.
- Problem: CLAUDE.md and the globals.css comment assign body prose to Garamond. Half the editorial pages ignore that, so "about Argumend" pages read like marketing and the maps read like a journal.
- Fix: the `PageHeader` lede is serif. Apply `.reading-body` to the long-form bodies of about, methodology, faq, research and the legal pages.

### F11. Five eyebrow styles, 96 hand-rolled pills and six copies of the same chip palette
- Severity: medium     Scope: system     Effort: S
- Where:
  - `label-caps` is well adopted: 31 files, 70 uses. That is the success to copy.
  - Competing eyebrows: teal `rounded-full bg-deep/10` pills (analyze ×2, analyses, library, analysis/[id], blog post category); uppercase stone pills (both compare views); uppercase teal pill (`is/[slug]:250`); icon tiles.
  - 96 `rounded-full px-*` pills across the codebase.
  - `lib/{concept,fallacy,glossary,guide,library}Meta.ts` each re-declare the same three or four `chip:` strings; only `questionMeta.ts` reuses `categoryColors`.
- Fix: every eyebrow uses `label-caps`. Add `<Chip tone>` backed by one tone map (extend `lib/categoryColors.ts`) and point the six meta files at it.

### F12. Dead code inflates every count and will mislead the sweep
- Severity: low     Scope: system     Effort: S
- Where: `app/topics/[id]/TopicDetailView.tsx` (1,761 lines, not imported; it takes `ConfidenceTimeline` and `DebateHighlight` with it), `components/SkeletonTopicDetail.tsx`, `SkeletonTopicCard.tsx`, `ShareToMoltbook.tsx`, `SessionProvider.tsx`, and `components/disagreement/{AuditStrip,CruxSection,DiagnosisHero,DisagreementsSection,PositionsSection,PublicDisagreementView}.tsx`.
- Fix: delete them before the primitive sweep, so grep counts reflect only live pages. (All counts in this report already exclude them.)

### Nits (low, grouped)
- `TopBar.tsx:68` uses `bg-[#f4f1eb]/90`; `bg-canvas/90` works in both modes.
- The sidebar "Home" item uses the `Compass` icon, which reads as Explore (`lib/nav.ts:54`).
- `app/d/[slug]/not-found.tsx:8` uses a raw `text-[#C4613C]` link.
- The root `app/not-found.tsx` is bespoke (no shell, Title Case, three bordered buttons) while 11 segment `not-found.tsx` files share `RouteNotFound`.
- `.display-text` has one use (perspectives).
- `Breadcrumbs` carries a built-in `mb-4` but is placed at four different offsets: inside a band, above an eyebrow, in its own `pt-3` strip (`TopicPageClient.tsx:16`), and outside the shell.
- `/analyses` returns 500 in dev (`postgres` external module failed to resolve; `eval/analyses--1440.png`). This belongs to the other evaluators.

## Proposed primitives (new `components/ui/`)

**Primitives that exist but are under-used:** `.btn-*` (0 uses; redefine rather than add), `.surface-card` (7 live files), `.surface-paper` (4), `.card-hover` (6), `.link-underline` (11), `.reading-body` and `.prose-custom` (2 each), `text-accent-text` (29 files, against 47 files hand-coding teals). Well adopted and worth keeping: `label-caps` (31 files), `Breadcrumbs` (33), `RouteErrorState`/`RouteNotFound` (about 40 error and not-found files), `CollectionPagination`.

### P0. One shell (fix, not new)
`app/(site)/layout.tsx` renders `<AppShell>` once, with a `(reading)` route group for `layout="reading"`. AppShell gets the F1 sticky fix. TopBar reads `lib/nav.ts`, and its menu button renders only when a handler exists.
- Replaces: the `SidebarLayout` and two TopBars in `components/HomeClient.tsx:50-230`; `app/analyze/page.tsx:450-497`; `app/analyze-v2/page.tsx:19-27`; `app/reply/page.tsx:35-60`; `app/d/[slug]/page.tsx:58-100`. Adds a shell to `is/page.tsx`, `is/[slug]`, `questions/page.tsx` and `questions/[slug]`, whose private `<footer>`s go. Removes the `<AppShell>` wrapper from 37 page files, `TopicPageClient.tsx` and `blog/[slug]/client.tsx`.
- Model: `AppShell layout="reading"` as used by /ai and flagship topics.

### P1. `PageHeader`
```tsx
<PageHeader
  breadcrumbs?: BreadcrumbItem[]   // rendered first, inside the container
  eyebrow?: ReactNode              // always .label-caps, never a pill or icon tile
  title: ReactNode                 // h1, font-serif font-normal text-primary, sentence case
  size?: "display" | "page"        // display: 2.5→3.25→3.75rem (home, flagship, /ai); page: 2.375rem→3rem
  lede?: ReactNode                 // font-serif text-xl leading-[1.5] text-secondary max-w-[36rem]
  meta?: ReactNode                 // font-sans text-sm text-muted: dates, counts, "Last updated"
  children?: ReactNode             // chips or actions under the lede
/>   // always left-aligned; no band, gradient, pill, icon tile or two-tone title
```
- Model: `components/ai/AiLivingMap.tsx:91-104` (eyebrow, h1, serif lede) plus `DisagreementAnalyzeClient.tsx:138-154`. Normalise their numbers to the two sizes above and their ink to `text-primary`.
- Replaces the header blocks at: `about:47-62`, `analyses:84-95`, `analyze/page.tsx:506-535`, `AnalysisView:572-592`, `blog:125-143`, `blog/[slug]:332-360`, `blog/category:153-171`, `blog/tag:154-172`, `community:69-85`, `concepts:38-55`, `concepts/[slug]:140-157`, `dashboard:83-89`, `fallacies:67-85`, `fallacies/[slug]:128-150`, `faq:10-28`, `for-educators:228-246`, `glossary:73-90`, `guides:97-118`, `guides/[id]:~215-240`, `how-it-works:82-99`, `is:119-130`, `is/[slug]:249-260`, `lessons:144-165`, `library:54-70`, `methodology:144-160`, `perspectives:391-401`, `privacy:89-98`, `questions:168-184`, `questions/[slug]:260-282`, `research:129-146`, `SavedClient:60-72`, `terms:71-80`, `TopicsPageClient:285-299`, `topics/category:174-192`, `topics/tag:214-234`, `CompareIndexView:528-540`, `ComparisonView:313-326`, `reply/page.tsx:40-53`, `DisagreementAnalyzeClient:138-154`, `AiLivingMap:91-104`, `argument/DebateView:101-115`, `ReadModeView:265-280`, `HomeLanding:36-47`. That is 43 blocks, 12 patterns collapsed to 1 with 2 sizes.

### P2. `PageContainer`
```tsx
<PageContainer width?: "reading" | "default" as?: "div" | "article" | "section">
// reading = max-w-[44rem] (legal, faq, detail pages, blog post, flagship, /ai, /reply)
// default = max-w-5xl (home, hubs, /topics, /analyze-v2 results)
// one gutter: px-4 sm:px-6 lg:px-8; one rhythm: pt-8 sm:pt-12 pb-16
```
- Replaces the outer `mx-auto max-w-* px-* py-*` wrapper in every file in the table: 7 widths and 5 gutters become 2 and 1. Drop `min-h-[100svh] bg-[#f4f1eb] dark:bg-[#121210]` wrappers (CompareIndexView, ComparisonView, dashboard) because the shell owns the background.
- Model: `TopicsPageClient.tsx:282-283`, with the width given as a named choice.

### P3. `Section` (lift what already exists twice)
```tsx
<Section id? title lede? aside? level?: 2 | 3>
// border-t border-divider pt-8; h2 font-serif text-[1.75rem] sm:text-[2rem] text-primary;
// lede font-sans text-[0.9375rem] text-secondary max-w-[36rem]; aside right-aligned muted
```
- Model: `components/disagreement/ReportSection.tsx:10-37` and `components/mapReply/ResultSection.tsx:12-31`, which are already the same component under two names.
- Replaces: both of those, plus the hand-rolled hairline sections in `HomeLanding.tsx:92-105`, `FeaturedTopicHero`, `HeroAnalyze`, and the h2 blocks of about, how-it-works, methodology, for-educators, community, research, library, lessons, perspectives, CompareIndexView and ComparisonView. 26 h2 signatures become 1 or 2.

### P4. `Button` and `TextAction`
```tsx
<Button variant?: "primary" | "secondary" | "quiet" size?: "md" | "lg" href? type? disabled?>
// primary = the one rust fill per page (bg-rust-600 hover:bg-rust-700 text-white, one radius, founder picks);
// secondary = today's .btn-outline; quiet = .btn-ghost. min-h-11 always.
<TextAction href? onClick?>  // text-deep underline underline-offset-2 hover:text-deep-dark dark:text-accent-text min-h-11
```
Or, as a minimum, redefine `.btn-primary` in `globals.css:315` to rust and use the class.
- Replaces the 31 gradient-CTA files listed in F5, the 4 flat-pill files, the `bg-[#3d3a36]`/`bg-deep`/`bg-[#a23b3b]` one-offs, and about 10 pasted underline-action strings in `DisagreementAnalyzeClient.tsx:163,199,225,248` and `MapReplyForm.tsx:73`.
- Model: `DisagreementAnalyzeClient.tsx:182-202`: one filled action followed by one underlined quiet action.

### P5. `Chip`
```tsx
<Chip tone?: "neutral" | "teal" | "rust" | "brown" | "plum" | "ink" size?: "sm" icon? href?>
// tones from one map (extend lib/categoryColors.ts); no "crux" tone; crux labels use the crux components
```
- Replaces the `chip:` strings in `lib/conceptMeta.ts`, `fallacyMeta.ts`, `glossaryMeta.ts`, `guideMeta.ts`, `libraryMeta.ts` and `questionMeta.ts`, plus the pill badges in `app/analyze/page.tsx:510-520`, `analyses:85`, `library:61`, `AnalysisView:573`, `blog/[slug]:346`, `CompareIndexView:529`, `ComparisonView:314`, `is/[slug]:250`, `questions/[slug]:262-267`, and dashboard and saved. That is about 96 pills.
- Model: `lib/categoryColors.ts`, which already has the palette discipline and the written rule.

### P6. Surfaces: adopt, do not invent
Two surfaces only: the hairline-ruled list (`HomeLanding.tsx:50-68`, `TopicsPageClient` rows) and `.surface-card` for real boxes. No new component is needed. Enforce this in the page sweep by deleting the other 34 recipes (F6).

## Patterns worth copying
- **Hub page:** `app/topics/TopicsPageClient.tsx` (crumbs, a plain left header, hairline groups, no cards) and `components/home/HomeLanding.tsx` (ruled rows instead of tiles). Keep the pattern, not the numbers: the h1 sizes there are arbitrary rem values.
- **Document or reading page:** `components/ai/AiLivingMap.tsx:88-104` and `components/argument/DebateView.tsx:85-115`. Eyebrow in `label-caps`, serif h1, serif lede at 36rem, one column. Their inks (`text-stone-900`) and the flagship's 37 raw hexes need normalising.
- **Tool page:** `components/disagreement/DisagreementAnalyzeClient.tsx:136-202` and `app/reply/page.tsx`. One filled rust action, a quiet underlined second action, the consent line at the click, no card around the textarea. Good models once they are inside the shell (F2).
- **Section:** `components/disagreement/ReportSection.tsx`, the best single primitive in the repo; promote it to `components/ui/Section.tsx`.
- **Token discipline:** `lib/categoryColors.ts` (written rules, light and dark in one string) and `.label-caps` in `globals.css:344-352` (the one shared class the whole site actually adopted).
- **Shared states:** `components/RouteErrorState.tsx` and `components/RouteNotFound.tsx`, used by about 40 segment files. This is the proof that a shared component spreads when it exists; point the root `app/not-found.tsx` at it too.

**Are the redesigned pages good models?** Yes for direction: they are left-aligned, use type and hairlines instead of boxes, and have one rust fill, no pills and no gradients. No as literal code: the five newest pages (home, /topics, /ai, flagship, /reply and /analyze-v2) use five different h1 scales and three heading-ink spellings. /analyze-v2 and /reply sit outside the shell with a dead menu button. Copy their structure into the primitives above and let the primitives own the numbers.
