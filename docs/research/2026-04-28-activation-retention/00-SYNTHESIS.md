# Activation & Retention Research — Synthesis

**Date:** 2026-04-28
**Companion to:** `docs/research/2026-04-28-distribution/00-SYNTHESIS.md`, `docs/research/2026-04-28-visual-design/00-SYNTHESIS.md`, `docs/research/2026-04-28-codex-image-pipeline/00-SYNTHESIS.md`
**Inputs:** 10 parallel research files in this directory (~30k words)
**Reader context:** Distribution swarm got users to the door. Visual + Codex swarms made the door look nice. This swarm answers "what happens when they walk in." It also surfaced more production bugs than any prior swarm — Argumend's funnel is leaking before the first user even arrives.

## 1. The single biggest finding

**Cycle 1's distribution plan is about to pour traffic into a leaky bucket.** The activation/retention swarm uncovered five live bugs and disabled features that would silently waste every visitor cycle 1's plan brings in:

1. **Email capture is wired only into `/blog/*`** (file 04). Topic pages — where 100% of cycle 1 distribution traffic will land (ACX classifieds, X shares, oEmbed widgets, Show HN) — have zero email capture. Schema, queries, and component all exist. **The fix is moving `<NewsletterSignup>` to the global `<Footer>`. ~30 minutes.** This is the highest-leverage half-hour available on the entire roadmap.

2. **`SaveTopicButton.tsx` is rendered disabled at 50% opacity** (file 05) because auth is off. The single highest-intent share/retention moment — the user wanting to come back to a topic — is broken at the UI level. The whole component is "rendered but inert."

3. **`app/analyze/page.tsx:497` advertises "Not stored after processing"** but `app/api/analyze/route.ts:109` saves every analysis to Postgres (file 09). **This is a live privacy disclosure lie.** Fix today: either change the disclosure or change the storage.

4. **`/explore` and `/topics` are functionally redundant** (file 06). Two routes, same data, confused IA.

5. **`app/feed.xml/route.ts` exists but only emits blog articles** (file 10). 109 topics — Argumend's evergreen assets — are invisible to RSS readers. ACX/LessWrong audience runs on RSS. This is a 2-hour fix.

These five aren't research recommendations — they're production bugs that have to be fixed before any growth investment makes sense.

## 2. The activation event

File 01 recommends **first crux read within 30 seconds of topic page load** as Argumend's phase-1 activation event. Phase-2 graduates to first analysis submission once `ENABLE_LIVE_ANALYZE_API` flips.

Why this and not the alternatives:
- First save: gated by broken auth (point 1.2 above)
- First analyze submission: gated by disabled live-analyze flag
- First share: too late in session, power-user signal
- 3-topic browse: misses bounce-heavy cold traffic from cycle 1

Instrumentation cost is small: append four events to `lib/analytics.ts`, add `IntersectionObserver` to crux-variant `RichNode.tsx`, fire from `CruxModal.tsx` and `FeaturedTopicHero.tsx`, sessionStorage counter for view sequencing. Add PostHog free tier alongside the existing GA4 for retention-cohort UI.

## 3. The onboarding decision

File 02 is unambiguous: **keep the zero-onboarding browse-first model that already exists.** The deletion of `OnboardingOverlay` in commit `2d5e396` was directionally correct. The wedge audience (ACX/LessWrong/rationalist-adjacent) is the most signup-allergic demographic on the open web, and every cerebral product they actually use ships browse-free with signup gated only at the contribute step.

The single addition: a one-line, non-modal, dismissable "how to read this canvas" hint anchored above `MapLegend` on first React Flow load (~1 day, localStorage-flagged). Forbid coachmark/tour libraries (Pendo / Appcues / Chameleon) from the codebase.

## 4. The reframe of "the topic page"

File 03 surfaced a reframe most agents underweighted: **`/topics/[id]` is not the canvas.** It's `TopicDetailView.tsx` — a 1,924-line prose article with the React Flow graph one click away at `/?topic=...`. So the first-30-second friction is article-comprehension and section-redundancy, not graph literacy.

Top three first-30-second fixes (file 03):
- Promote `meta_claim` to a "what this page is" subhead under H1 and rewrite it (1 day)
- Collapse `KeyTakeawaysBox` + `QuickStatsBar` + the "30-Second Summary" verdict banner into one above-fold hero block. The page currently shows the same confidence number three times in three sections (2 days).
- Add a "Screenshot this crux" button to every `CruxCard` via `html2canvas-pro`, exporting a 1200×630 branded PNG (2-3 days; slots into cycle 3 file 04's OG pipeline)

## 5. The 90-day execution plan

| Day/Wk | Action | File | Effort | Why |
|---|---|---|---|---|
| Today | Move `<NewsletterSignup>` from blog-only to global `<Footer>` | 04 | 30 min | Stop the cycle-1 traffic leak |
| Today | Fix `app/analyze/page.tsx:497` disclosure to match actual storage behavior | 09 | 10 min | Live privacy lie |
| Today | Add per-topic items to `app/feed.xml/route.ts` | 10 | 2 hr | ACX/LW audience runs on RSS |
| Day 2 | Fix `SaveTopicButton.tsx` with LocalStorage-first save (no auth required) + sync prompt on 3rd save | 05, 08 | 1 day | Closes the dead-button leak; captures highest-intent share/retention moment |
| Day 3 | Append 4 events to `lib/analytics.ts` + PostHog free-tier wire-up | 01 | 1 day | Activation-event instrumentation |
| Wk 1 | Add Resend magic-link provider to `lib/auth.ts:18` alongside Google | 08 | 15 lines code | Rationalists distrust Google sign-in; magic-link expected |
| Wk 1 | Rewrite `meta_claim` subhead under topic H1 + rewrite copy generator | 03 | 1 day | First-30-second comprehension |
| Wk 1 | One-line "how to read this canvas" hint over `MapLegend` (localStorage-flagged) | 02 | 1 day | Only onboarding addition |
| Wk 1 | Migrate `lib/schemas/topic.ts` — add `tags`, `fallaciesPresent`, `judgeConsensus`, `addedAt`, `aliases` | 06 | 2 days | Unlocks facets, related-topics, programmatic SEO |
| Wk 2 | Replace `SearchModal.tsx:137-141` `String.includes()` with MiniSearch + build-time `searchIndex.json` | 06 | 1 day | Real search at 109+ topics |
| Wk 2 | Ship `/topics/category/[slug]` and `/topics/tag/[slug]` programmatic SEO landing pages | 06 | 2 days | Long-tail Google traffic compounds for years |
| Wk 2 | Sign up for Buttondown ($9/mo); bridge `/api/newsletter` to write Postgres + Buttondown; first issue live | 04 | 2 days | Owned email channel before cycle-1 traffic spike |
| Wk 2 | Mobile audit: reading-mode-as-default below 768px (suppress canvas CTAs); kill 200KB `lw-background.webp` on mobile; code-split `@xyflow/react` from mobile homepage | 07 | 2-3 days | Mobile is 50-65% of cerebral traffic |
| Wk 2 | Collapse `KeyTakeawaysBox` + `QuickStatsBar` + verdict banner into one above-fold hero block | 03 | 2 days | Stop showing the same number three times |
| Wk 3 | Ship `/fallacies/[slug]` programmatic SEO hub | 06 | 3 days | Highest-leverage SEO play — Argumend's automated fallacy detection beats Wikipedia-tier explainers |
| Wk 3 | "Screenshot this crux" via `html2canvas-pro` on every `CruxCard` | 03, 05 | 2-3 days | Atomic-unit shareable artifact; cheapest viral mechanism |
| Wk 3 | OG image pipeline ship from cycle 3 file 04 | cycle 3 | 1 wk | 1.5-3× link-share CTR uplift |
| Wk 4 | Live-analyze prep sprint: prompt caching, content-hash dedupe, OpenAI Moderation pre-flight, tiered rate limits, streaming SSE | 09 | 1 wk | Required before public flip |
| Wk 5-6 | Live-analyze rollout: week 1 auth-only (cost-controlled), week 2 email-gated anonymous, week 3 hero CTA flip with cycle-1 distribution shot | 09 | 3 wks | Conversion-rate gate at 25-40% per file 04 |
| Wk 7 | Topic subscriptions UI + email digest cron using existing `topicSubscriptions` schema | 08, 10 | 1 wk | Schema exists; no HTTP route or UI yet |
| Wk 8 | oEmbed widget for LessWrong/EA Forum/Substack (cycle 1 file 02 — "lane is empty") | 10 | 1 wk | Years-of-compounding pull-side bet |
| Wk 9-10 | pgvector embeddings for related-topics ($0.02 one-time embed cost) | 06 | 1 wk | Cross-link compounding |
| Wk 11 | Calendar-driven 48-hour-news topic pipeline (SCOTUS / election / AI policy beats) feeding weekly digest | 10 | 1 wk | The ACX retention pattern, applied |
| Wk 12 | Cohort analysis on activation-event metric; iterate | 01 | 3 days | Decide what to invest in next |

## 6. The five gaps cycle 1 doesn't see

This swarm makes visible what cycle 1's distribution plan would not have flagged:

1. **The cycle-1 ACX classifieds submission is currently scheduled to run *before* email capture is on topic pages.** That's a one-time spike of high-intent traffic landing on a page with no capture mechanism. The order matters — fix capture first.
2. **The cycle-1 Show HN launch needs the `SaveTopicButton` to actually work.** HN visitors are exactly the audience who'd save a topic to revisit; a 50%-opacity disabled button is a brand-credibility hit on the highest-attention launch surface.
3. **The cycle-1 "pre-extract AI 2027 debate" play (LW agent) needs the live-analyze API to be on.** Currently it's off. File 09's 1-week prep sprint is a hard prerequisite for the LW play, not parallel work.
4. **The cycle-1 oEmbed widget for LessWrong** depends on the file-04 schema migration (adding `addedAt`, `tags`, `judgeConsensus`) for embed metadata. Schema work is upstream of distribution work.
5. **The cycle-1 Asterisk Magazine pitch** ("What we learned mapping 100 AI-safety arguments") references analyses that need to be reachable via search — currently `/explore` and `/topics` are redundant and search is broken `String.includes()`. File 06 is upstream.

In other words: **the right order is activation/retention fixes first, then visual brand work, then cycle-1 distribution moves.** The cycle-1 plan presumed the funnel was working. The funnel is not working.

## 7. The full four-swarm execution order (cumulative recommendation)

| Wk | Cycle 1 (distribution) | Cycle 2 (visual) | Cycle 3 (Codex pipeline) | **Cycle 4 (this — activation/retention)** |
|---|---|---|---|---|
| Wk 0 (today) | — | — | Hotfix `/icon.png` 404, fix "50 Topics" stale | **Move newsletter to footer; fix analyze disclosure; fix RSS** |
| Wk 1 | — | Defended color commit; OG generator | Codex scaffold; canvas backgrounds | **Save button works; activation events live; magic-link auth; H1 reframe; schema migration** |
| Wk 2 | — | 30s magic-moment demo | OG batch on top 12 topics | **Search via MiniSearch; programmatic SEO routes; Buttondown live; mobile reading-mode default** |
| Wk 3 | ACX classifieds submitted | Reading mode in MDX | Full 109-topic OG batch | **Fallacy hub; "screenshot this crux"** |
| Wk 4 | Asterisk Magazine pitch | Anatomy of a Fallacy explainer | Replace Unsplash hot-links | **Live-analyze prep sprint** |
| Wk 5-6 | Pre-extract AI 2027 debate | Information design pass | Fallacy badge set | **Live-analyze rollout** |
| Wk 7-8 | Hear This Idea pitch | Crux mark commission | Page-section backgrounds | **Topic subscriptions; oEmbed widget** |
| Wk 9-10 | Show HN launch | Crux mark deployed | — | **Calendar-driven topic pipeline; pgvector related** |
| Wk 11-12 | NSDA pipeline | — | — | **Cohort analysis; iterate** |

**Total founder bandwidth required: ~25-35 hours/week sustained.** That's higher than the cycle-2 estimate (10-15 hr/wk for visual stack). The activation/retention work is genuinely engineering-heavy because the existing product is half-shipped — most schemas exist, most components exist, most APIs exist, but they're not connected to each other or to a public surface.

## 8. Confidence

- **Highest confidence:** the five production bugs are real and 30-min-to-2-hour fixes. Email-on-footer is the highest-leverage half-hour available. Browse-first onboarding is correct. RSS extension is uncontroversial.
- **High confidence:** Buttondown is the right newsletter platform. MiniSearch handles 109+ topics fine. Magic-link auth fits the audience. Reading-mode-as-default-on-mobile is correct.
- **Medium confidence:** Live-analyze as hero CTA is the right activation play (depends on whether prompt-caching gets per-call costs to ~$0.015 — the linchpin). Programmatic SEO ranks (depends on schema-migration getting `judgeConsensus` populated cleanly).
- **Low confidence:** The full 25-35 hr/wk cadence is sustainable for a solo founder in observation mode (per memory: "in orbit, not climbing"). The reading-mode-by-default decision (it's a meaningful UX shift; might A/B test instead of ship straight).
- **Honest unknown:** Whether fixing the funnel before doing more cycle-1 distribution actually improves conversion, or whether the fundamental issue is product-market fit and no funnel optimization rescues that. The activation-event instrumentation in week 1 is what answers this — week 12's cohort analysis is the decision point.
