# Test Coverage Gap Audit — `lib/` and `components/`

**Date:** 2026-07-29
**Scope:** every `lib/**/*.ts` and `components/**/*.tsx` with no sibling `.test.ts` / `.test.tsx`.
**Excluded from the gap list:** pure barrels / re-export files and pure type-definition modules (listed at the bottom as "correctly untested").

## Method

A file counts as a gap if `<name>.test.ts` or `<name>.test.tsx` does not exist next to it (the repo's convention — see `lib/fallacyMeta.test.ts`, `components/BalanceWeight.test.tsx`). Ranking is by a rough risk score:

- **LOC** — bigger files hide more untested paths.
- **`br`** — branch-ish tokens (`if`, `switch`, `??`, `&&`, `||`, `for`, `while`). High = real decision logic.
- **`hooks`** — React hook call sites. High = stateful, effect-driven, expensive to test well and lower ROI per hour.
- **`fns`** — exported runtime functions. High = a wide public surface that other modules depend on.

Priority tiers reflect *value per unit of test effort*, not raw size. A 700-line component with 24 hook calls is a bigger gap than a 100-line pure module, but it is a much worse first test to write.

**Baseline before this audit:** 35 test files, none covering the modules in Tier 1 or Tier 2 below.

---

## Tier 1 — pure logic, high value, cheap to test (DONE in this pass)

These are the highest ROI in the repo: real branching logic, zero React, zero I/O.

| Rank | File | LOC | br | fns | Status |
|---|---|---|---|---|---|
| 1 | `lib/judge/rubric.ts` | 231 | — | 3 | ✅ **test added** |
| 2 | `lib/nav.ts` | 151 | — | 0 (derived consts) | ✅ **test added** |
| 3 | `lib/topic-links.ts` | 118 | 6 | 2 | ✅ **test added** |
| 4 | `lib/textUtils.ts` | 78 | 3 | 6 | ✅ **test added** |
| 5 | `lib/utils.ts` | 58 | 4 | 4 | ✅ **test added** |

Why these five: all pure functions or pure derived data, all consumed by multiple call sites, and all had *zero* coverage despite sitting under scoring, navigation IA, and cross-linking — three areas where a silent regression is invisible in review.

**Finding surfaced while writing these tests** (see "Bugs found" below): `getTopicMentions` silently never links any topic whose title ends in a non-word character.

---

## Tier 2 — pure / near-pure logic, still untested (next up)

Same shape as Tier 1: testable without rendering or mocking React. Highest remaining ROI.

| Rank | File | LOC | br | fns | Notes |
|---|---|---|---|---|---|
| 1 | `lib/questions.ts` | 531 | 3 | 4 | `questionToSlug` (slugification — round-trip + collision tests), `findQuestionBySlug`, `getQuestionVariations`. Mostly a big data table + 4 pure lookups. **Best remaining target.** |
| 2 | `lib/judge/panel.ts` | 578 | 24 | 1 | Highest branch count in `lib/`. Single export `judgeWithClaudePanel`, but the prompt/parse/aggregate helpers inside are where the risk is. Needs an SDK mock; `lib/judge/council.test.ts` already shows the pattern. |
| 3 | `lib/rate-limit.ts` | 101 | 6 | 1 | Sliding-window limiter with a module-level `Map` and a cleanup-every-100-requests side effect. Very testable with `vi.useFakeTimers()`. **Untested rate limiting is a live production risk.** |
| 4 | `lib/debate/offline.ts` | 96 | 5 | 1 | `generateOfflineDebate` — deterministic, offline-mode default path. Sibling `lib/debate/programmatic.ts` is already tested; this is the obvious parity gap. |
| 5 | `lib/moltbook/apiHelpers.ts` | 85 | 1 | 6 | Six tiny response-normalizing helpers. Trivial to cover exhaustively; ~30 min for full coverage. |
| 6 | `lib/topicTimelines.ts` | 196 | 0 | 2 (+1 const) | Mostly data. Worth a **data-integrity** test: years monotonic, confidence in 0–100, `hasTimeline`/`getTimeline` agree, every id resolves to a real topic. Mirror `data/topics.test.ts`. |
| 7 | `lib/agents/generate.ts` | 90 | 1 | 4 | Prompt/config builders — pure string assembly. |
| 8 | `lib/constants.ts` | 131 | 0 | 0 | Pure config. Low value alone, but a guard test (thresholds ordered, ranges valid) would catch bad edits. |
| 9 | `lib/animationVariants.ts` | 43 | 0 | 0 | Framer Motion variant objects. Very low value. |
| 10 | `lib/analytics.ts` | 27 | 1 | 1 | `trackEvent` — one `window.gtag` guard. Low value. |

## Tier 3 — logic with I/O or SDK dependencies (needs mocking)

Real logic, but each test costs a mock harness. Worth doing after Tier 2.

| File | LOC | br | fns | Notes |
|---|---|---|---|---|
| `lib/agents/executor.ts` | 321 | 12 | 2 | `executeAgent` / `executeAgentsInParallel`. Retry + parallel-fanout logic is genuinely worth covering; failure/partial-failure paths are the risk. |
| `lib/moltbook/client.ts` | 304 | 2 | 1 | HTTP client. Needs `fetch` mocking. |
| `lib/moltbook/debate-integration.ts` | 293 | 1 | 1 | Orchestration over the client above. |
| `lib/db/queries.ts` | 285 | 1 | 21 | 21 exported queries. Widest untested surface in `lib/`, but needs a DB or a Drizzle mock — high cost. |
| `lib/agents/cruxtacean.ts` | 180 | 1 | 1 | Agent definition + prompt. |
| `lib/debate/shared.ts` | 117 | 7 | 6 | Lazy SDK singletons + `isLiveDebateEnabled()`. **The env-flag reader is pure and should be tested now** — it gates live-API behavior and is a one-liner to cover. |
| `lib/db/index.ts` | 58 | 4 | 1 | `getDb()` lazy init + unavailability handling. Small but load-bearing per CLAUDE.md. |
| `lib/auth.ts` | 53 | 2 | 0 | NextAuth config; JWT-fallback branch is the interesting part. |

## Tier 4 — presentational components, low state (cheap RTL tests, moderate value)

Little or no hook usage; render-and-assert works. Good "next batch" if the goal is breadth.

| File | LOC | hooks | Notes |
|---|---|---|---|
| `components/BalanceWeightReadout.tsx` | 136 | 0 | Pure props → markup. Sibling `BalanceWeight.test.tsx` exists; this is the direct parity gap. **Top Tier-4 pick.** |
| `components/SkeletonTopicDetail.tsx` | 218 | 0 | Static skeleton. Low value (no logic). |
| `components/Skeleton.tsx` | 118 | 0 | 11 exported skeleton variants. Low value. |
| `components/TableOfContents.tsx` | 112 | 0 | 2 exports incl. heading extraction — the extraction logic is worth testing. |
| `components/icons/LLMIcons.tsx` | 170 | 0 | 7 icon components. Very low value. |
| `components/BalanceWeightChip.tsx` | 74 | 0 | Props → label/color mapping. Cheap, real. |
| `components/SynopticTable.tsx` | 73 | 0 | Props → table. Cheap. |
| `components/Footer.tsx` | 82 | 0 | Now derives from `lib/nav`; partially covered by the new `lib/nav.test.ts` SOT guard. |
| `components/Breadcrumbs.tsx` | 61 | 0 | Path → crumb derivation. Cheap, real. |
| `components/ConfidenceBar.tsx` | 43 | 0 | Value → width/color. Cheap. |
| `components/LinkedText.tsx` | 39 | 0 | Renders `topic-links` segments — pairs well with the new `topic-links.test.ts`. |
| `components/ControversyMeter.tsx` | 180 | 2 | Score → meter geometry; mostly pure. |
| `components/MapLegend.tsx` | 174 | 2 | Mostly static. |
| `components/CruxModal.tsx` | 142 | 4 | Modal shell. |
| `components/ConfidenceGauge.tsx` | 129 | 0 | Value → arc math. Cheap, real. |
| `components/nodes/EvidenceNode.tsx` | 150 | 0 | React Flow node; needs a `ReactFlowProvider` wrapper. |
| `components/InteractiveContent.tsx` | 129 | 3 | Bracketed-keyword rendering — the parser half is now covered via `lib/utils.test.ts`. |

## Tier 5 — deeply stateful / hook-heavy (highest LOC, lowest test ROI per hour)

Real gaps, but each needs router/session/React-Flow/store mocking. Test these last, or only around specific bugs.

| File | LOC | hooks | br |
|---|---|---|---|
| `components/DebateView.tsx` | 729 | 7 | 2 |
| `components/SearchModal.tsx` | 706 | 24 | 16 |
| `components/ReadModeView.tsx` | 578 | 16 | 15 |
| `components/ScalesOfEvidence.tsx` | 523 | 7 | 4 |
| `components/JudgingResults.tsx` | 504 | 2 | 1 |
| `components/ShareVerdictCard.tsx` | 476 | 12 | 7 |
| `components/ConfidenceTimeline.tsx` | 448 | 19 | 13 |
| `components/HeroMiniCanvas.tsx` | 383 | 23 | 7 |
| `components/VerdictVoting.tsx` | 380 | 10 | 18 |
| `components/DebateHighlight.tsx` | 361 | 15 | 11 |
| `components/MobileArgumentList.tsx` | 361 | 11 | 1 |
| `components/ShareToMoltbook.tsx` | 337 | 5 | 3 |
| `components/HomeClient.tsx` | 286 | 14 | 9 |
| `components/ShareButtons.tsx` | 273 | 3 | 2 |
| `components/Sidebar.tsx` | 245 | 4 | 4 |
| `components/TopicIntroPanel.tsx` | 207 | 14 | 6 |
| `components/DesktopCanvas.tsx` | 195 | 24 | 6 |
| `components/FeaturedTopicHero.tsx` | 195 | 4 | 7 |
| `components/nodes/RichNode.tsx` | 190 | 8 | 1 |
| `components/DiamondDiagram.tsx` | 182 | 12 | 1 |
| `components/CitationCard.tsx` | 158 | 6 | 4 |
| `components/MiniGraphPreview.tsx` | 143 | 2 | 3 |
| `components/NewsletterSignup.tsx` | 143 | 5 | 4 |
| `components/TopBar.tsx` | 135 | 7 | 1 |
| `components/TrendingTopics.tsx` | 131 | 6 | 4 |
| `components/EmbedButton.tsx` | 124 | 8 | 4 |
| `components/nodes/MetaNode.tsx` | 124 | 5 | 1 |
| `components/NavigationPath.tsx` | 118 | 7 | 8 |
| `components/AnimateOnScroll.tsx` | 114 | 8 | 3 |
| `components/ReadGraphToggle.tsx` | 95 | 8 | 5 |
| `components/AppShell.tsx` | 93 | 4 | 1 |
| `components/HeroAnalyze.tsx` | 93 | 11 | 2 |
| `components/GlossaryTerm.tsx` | 87 | 2 | 2 |
| `components/ZoomIndicator.tsx` | 79 | 4 | 1 |
| `components/ThemeToggle.tsx` | 72 | 4 | 1 |
| `components/ViewToggle.tsx` | 67 | 6 | 1 |
| `components/SkeletonTopicCard.tsx` | 44 | 0 | 0 |
| `components/SaveTopicButton.tsx` | 35 | 0 | 0 |
| `components/icons/MenuIcon.tsx` | 29 | 0 | 0 |
| `components/GAPageView.tsx` | 27 | 4 | 1 |
| `components/SubscribeButton.tsx` | 24 | 0 | 0 |
| `components/ThemeProvider.tsx` | 20 | 0 | 0 |
| `components/UserMenu.tsx` | 19 | 0 | 0 |
| `components/JsonLd.tsx` | 17 | 0 | 0 |
| `components/SessionProvider.tsx` | 8 | 0 | 0 |

Also worth noting: **the `hooks/` directory has zero test files.** `hooks/useLogicGraph.ts` is described in CLAUDE.md as the core state store, and `hooks/useDebateOrchestrator.ts` drives debate sessions. Neither is in this audit's `lib`/`components` scope, but both are larger gaps than most of Tier 4/5. Recommend a follow-up audit.

---

## Correctly untested (excluded — not gaps)

Pure barrels / re-export files with no runtime logic of their own:

- `lib/judge/index.ts`
- `lib/moltbook/index.ts`
- `lib/agents/index.ts`
- `lib/analyze/index.ts`
- `components/icons/index.ts`

Effectively type/schema declaration modules (covered indirectly, no branching logic to exercise):

- `lib/db/schema.ts` (387 LOC — Drizzle table definitions; validated by migrations, not unit tests)
- `lib/agents/types.ts` (100 LOC — one trivial helper alongside type declarations)

---

## Bugs / limitations found while writing the Tier 1 tests

**1. `getTopicMentions` silently drops topics whose title ends in a non-word character** — `lib/topic-links.ts`

The matcher escapes the title correctly, then wraps it: `new RegExp(`\\b${escaped}\\b`, "i")`. The **trailing** `\b` requires a word character at the end of the match, so any title ending in `+`, `?`, `)`, etc. can never match:

```js
new RegExp('\\bC\\+\\+\\b', 'i').test('I like C++ a lot')            // false
new RegExp('\\bWhy now\\?\\b', 'i').test('Asking Why now? today')    // false
```

The same applies to the leading `\b` for titles *starting* with a non-word character. No error is thrown — the topic just never cross-links. Fix: make each boundary conditional on whether the title's first/last character is a word character (or use lookarounds). A red-flippable test documenting the current behavior is in `lib/topic-links.test.ts` ("KNOWN LIMITATION").

**2. `BRACKETED_KEYWORD_PATTERN` is a shared global regex** — `lib/utils.ts`

It carries the `g` flag and is exported as a module-level singleton, so `lastIndex` persists across `.test()` / `.exec()` calls by any consumer. Safe for the `.split()` usage it was written for; a hazard for anyone reaching for `.test()`. Documented with an explicit test in `lib/utils.test.ts`.

**3. No bug, but worth knowing:** `clamp(v, min, max)` in `lib/textUtils.ts` is `Math.max(min, Math.min(max, v))`, so an inverted range (`min > max`) silently returns `min` rather than throwing. Documented in the test.

---

## Tests added in this pass

| Test file | Assertions | Covers |
|---|---|---|
| `lib/textUtils.test.ts` | 26 | `clamp`, `normalize`, `splitSentences`, `countMarkers`, `extractKeywords`, `keywordSet`, marker-vocabulary invariants |
| `lib/topic-links.test.ts` | 14 | `getTopicMentions` (longest-title precedence, first-occurrence-only, case preservation, word boundaries, regex escaping, overlap rejection, round-tripping), `buildTopicLinkTargets` |
| `lib/judge/rubric.test.ts` | 18 | `DEFAULT_RUBRIC` weight-sum + id uniqueness, `calculateTotalScore` (weighting vs. averaging, subset renormalization, unknown ids), `hasSignificantDisagreement` boundaries, `determineWinner` threshold + antisymmetry |
| `lib/utils.test.ts` | 20 | `buildSearchParams` (nullish filtering vs. falsy retention, encoding), bracketed-keyword parse/split/round-trip, global-regex hazard |
| `lib/nav.test.ts` | 17 | href/label uniqueness, exact group partitioning, icon guarantees, highlight/prefetch policy, footer-column resolution against the raw source declaration, Sidebar/Footer SOT import guard |

**Total: 100 assertions, 5 files, all green.**

## Recommended next steps

1. `lib/rate-limit.ts` — untested rate limiting is a live production risk; fully testable with fake timers.
2. `lib/questions.ts` — 4 pure functions incl. slugification; highest remaining pure-logic ROI.
3. `lib/debate/offline.ts` — parity gap with the already-tested `lib/debate/programmatic.ts`.
4. `lib/topicTimelines.ts` — data-integrity test in the style of `data/topics.test.ts`.
5. `components/BalanceWeightReadout.tsx` — direct parity gap with `components/BalanceWeight.test.tsx`.
6. Separate audit of `hooks/` — currently at **zero** coverage.
