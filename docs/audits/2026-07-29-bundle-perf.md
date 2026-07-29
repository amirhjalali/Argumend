# Bundle / perf audit — 2026-07-29

Scope: `"use client"` components that are large (100+ lines) or pull heavy deps
(`@xyflow/react`, `framer-motion`, `minisearch`, `katex`) and are below-the-fold or
conditionally rendered, but not code-split with `next/dynamic`. Plus a sweep for
non-tree-shaken namespace imports.

Baseline: `npx next build` on `two-axis-confidence` @ `7766a9b`.
`.next/static/chunks` = **9.0 MB** total. Next 16 no longer prints the per-route
First Load JS table, so sizes below are measured from emitted chunk bytes and
source/dep weights, not from the build summary.

---

## Executive summary

The codebase is already *mostly* disciplined: React Flow, the debate view, the
mobile list, the judging results, and KaTeX are all lazy. The two real leaks were
both "eagerly imported by something that renders everywhere / by default":

| # | Leak | Where | Est. impact | Status |
|---|------|-------|-------------|--------|
| 1 | `SearchModal` (MiniSearch + 3 data indexes) in the global shell | `components/TopBar.tsx:9` | ~100–115 KB raw off **every route** | **Fixed** |
| 2 | `TopicDetailView` (1761 lines) eager on the default *read* view | `app/topics/[id]/TopicPageClient.tsx:9` | large chunk off ~157 topic pages' default path | **Fixed** |
| 3 | `ShareVerdictCard` eager inside `JudgingResults` | `components/JudgingResults.tsx:18` | ~475 lines + framer-motion | Recommended |
| 4 | `ConfidenceTimeline` eager, deep below fold | `app/topics/[id]/TopicDetailView.tsx:72` | ~447 lines + framer-motion | Recommended |
| 5 | `ReadModeView` eager on the `?view=graph` path | `app/topics/[id]/TopicPageClient.tsx:7` | ~577 lines | Deliberate — leave eager |

No namespace-import problems were found (see "Tree-shaking" below).

---

## 1. `SearchModal` in `TopBar` — FIXED

**File:** `components/TopBar.tsx:9` (before), `components/TopBar.tsx:131` (render site)

`TopBar` is rendered by `components/AppShell.tsx:27`, which wraps essentially every
page. It statically imported `components/SearchModal.tsx` (705 lines), which in turn
pulls:

- `components/SearchModal.tsx:16` — `MiniSearch` (`minisearch` ~28 KB min)
- `components/SearchModal.tsx:17` — `@/data/topicIndex` (16 KB source, 157 topics)
- `components/SearchModal.tsx:20` — `@/data/blogIndex` (**51 KB source**, 85 articles)
- `components/SearchModal.tsx:21` — `@/data/concepts` (12 KB source)
- `components/SearchModal.tsx:15` — `framer-motion`

Measured: **6 distinct emitted chunks contained `MiniSearch`, totalling 699 KB raw**
(the shared client chunk was 116,500 bytes and was duplicated across route groups).
None of this is needed until the user presses the search button or Cmd+K.

**Fix applied** (`components/TopBar.tsx`):

```tsx
const SearchModal = dynamic(
  () => import("./SearchModal").then((m) => ({ default: m.SearchModal })),
  { ssr: false }
);
```

plus a `hasOpenedSearch` gate on the render site. The gate is the load-bearing half:
`next/dynamic` fetches the chunk when the component is first **rendered**, not when
the module is imported, so leaving `<SearchModal isOpen={false} />` unconditionally
mounted would have fetched it on every page load anyway. `hasOpenedSearch` latches
to `true` on first open and never resets, so the modal keeps its mount across
close/reopen and `AnimatePresence` exit animations still play.

**Est. impact:** ~100–115 KB of raw JS (MiniSearch + three data indexes + the
component) moves out of the shared bundle on *every* route in the app. This is the
single highest-leverage change in the audit — it is paid on 100% of page views and
redeemed by a small minority.

## 2. `TopicDetailView` on the default read path — FIXED

**File:** `app/topics/[id]/TopicPageClient.tsx:9` (before)

`TopicPageClient` reads `?view=` and renders **either** `ReadModeView` (default) **or**
`TopicDetailView` — but statically imported both. `TopicDetailView` is the largest
client component in the repo at **1761 lines** (`app/topics/[id]/TopicDetailView.tsx`)
and transitively pulls `framer-motion`, `ShareButtons`, `EmbedButton`,
`DebateHighlight`, `ControversyMeter`, `ConfidenceTimeline`, `VerdictVoting`, and a
lazily-loaded `JudgingResults`.

Since `view` defaults to `"read"` (`app/topics/[id]/TopicPageClient.tsx:28`), the
overwhelming majority of visits to the ~157 prerendered topic pages downloaded and
hydrated the graph-view component tree without ever rendering it.

**Fix applied:**

```tsx
const TopicDetailView = dynamic(() => import("./TopicDetailView"), {
  ssr: false,
  loading: () => <SkeletonTopicDetail />,
});
```

`ssr: false` is safe here: the graph view is only reachable via `?view=graph`, a
client-only query param that is not part of any prerendered/canonical URL, and its
own canvas (`components/DesktopCanvas.tsx`, via `components/HomeClient.tsx:36`) is
already `ssr: false`. `ReadModeView` is deliberately left **eager** — it is the
default view and the SEO surface, so lazy-loading it would trade a real ranking risk
for a bundle win on a minority path.

**Bonus:** this put `components/SkeletonTopicDetail.tsx` to use. It was written to
"mirror the actual TopicDetailView layout" (its own docblock) but had **zero import
sites** — dead code until now, and an exact-fit loading state.

**Est. impact:** the 1761-line component plus its subtree leaves the initial payload
of every default topic-page view, at the cost of one extra round-trip (behind a
full-page skeleton) when a user explicitly switches to graph mode.

---

## Remaining candidates (not applied — 2-conversion cap)

### 3. `ShareVerdictCard` inside `JudgingResults`

`components/JudgingResults.tsx:18` eagerly imports `components/ShareVerdictCard.tsx`
(475 lines, `framer-motion`). `JudgingResults` is *itself* already lazy — it is
`dynamic()`-loaded from four places (`app/analyze/page.tsx:32`,
`app/analysis/[id]/AnalysisView.tsx:28`, `app/topics/[id]/TopicDetailView.tsx:76`,
`components/DebateView.tsx:24`) — so this does not hit the initial bundle. But the
share card is a click-to-open export/share affordance, so it is a second-order
conditional inside an already-conditional chunk. Splitting it shrinks the judging
chunk by ~475 lines for the majority who never share. **Low risk, moderate payoff.**

### 4. `ConfidenceTimeline` in `TopicDetailView`

`app/topics/[id]/TopicDetailView.tsx:72`, rendered at
`app/topics/[id]/TopicDetailView.tsx:1564` — inside an IIFE guard, in a
"Historical Context" section far below the fold, and only when `timelineEvents`
exist. 447 lines, `framer-motion` + `useInView`.

Deferred deliberately: the timeline renders event labels that are real page text, so
`ssr: false` has a (small) SEO cost on the site's main content surface. The right fix
is `dynamic()` with a fixed-height skeleton, ideally combined with an intersection
gate — worth doing, but it needs a judgement call on SSR that a rushed conversion
should not make.

### 5. Other conditional-but-eager clients (lower value, listed for completeness)

- `components/DebateHighlight.tsx` (360 lines) — `app/topics/[id]/TopicDetailView.tsx:68`, rendered only when `hasMockDebate(topic.id)` (`:1570`).
- `components/VerdictVoting.tsx` (379 lines) — imported by both `TopicDetailView.tsx:73` and `ReadModeView.tsx:13`; below the fold on both.
- `components/ShareToMoltbook.tsx` (336 lines) — share affordance.
- `components/MapLegend.tsx` / `components/TopicIntroPanel.tsx` — `components/DesktopCanvas.tsx:21,24`. Already inside the `ssr:false` canvas chunk, so low priority.
- `app/topics/compare/[id1]/vs/[id2]/ComparisonView.tsx` (562 lines) — the whole route is this component, so there is nothing to defer to.

### Correctly left eager (do **not** convert)

- `components/HomeClient.tsx` (285) — the home route's shell.
- `components/FeaturedTopicHero.tsx` (194), `components/Sidebar.tsx` (244), `components/TopBar.tsx` (134) — above the fold / global chrome.
- `components/ReadModeView.tsx` (577) — default view, SEO surface (see §2).
- `components/nodes/*` (`RichNode` 189, `EvidenceNode` 149, `MetaNode` 123) — already inside the lazy React Flow chunk; splitting further would only add waterfalls.
- All `app/**/error.tsx` (~59–181 lines) — error boundaries must be present to catch.

---

## Tree-shaking / namespace imports

**Clean.** The sweep found exactly one `import * as` in application code:

- `lib/db/index.ts:3` — `import * as schema from "./schema"`. This is the required
  Drizzle idiom and is server-only, never bundled for the client. **No action.**

All ~25 `lucide-react` import sites use named imports (`import { ArrowRight, Clock }
from "lucide-react"`), which tree-shake correctly — e.g. `app/blog/page.tsx:3`,
`app/perspectives/page.tsx:6`, `components/TopBar.tsx:5`. No
`import * as Icons from "lucide-react"` anywhere.

`framer-motion` is imported by 19 client components but always as named imports
(`{ motion, AnimatePresence }`). `framer-motion` is a single shared chunk, so the
count is not itself a problem — the fix for framer-motion weight is deferring the
*components*, which is what §1–§4 do.

---

## Already-good prior art (leave alone)

Worth recording so a future audit does not "re-fix" these:

- `components/HomeClient.tsx:20–45` — `ScalesOfEvidence`, `DebateView`,
  `MobileArgumentList`, `DesktopCanvas`, `HeroMiniCanvas` all `ssr: false`. React
  Flow + its CSS never ship to mobile sessions.
- `components/CruxModal.tsx:11` — `react-katex` lazy (~300 KB); KaTeX CSS was already
  moved out of `app/globals.css:1` and is loaded with the component.
- `hooks/useLogicGraph.ts` — the ~500 KB `data/topics` module is lazy-loaded.
- `app/topics/[id]/page.tsx` — topic + related topics resolved server-side and passed
  as props specifically so `TopicPageClient` never imports the topic corpus
  (`app/topics/[id]/TopicPageClient.tsx:12–15`).

---

## Verification

- `npx tsc --noEmit -p tsconfig.json` — clean
- `npx eslint components/TopBar.tsx "app/topics/[id]/TopicPageClient.tsx"` — clean
- `npx vitest run` — green
- `npx next build` — succeeds (re-run after both conversions; a bad `ssr:false`
  boundary fails here, not in typecheck)
