# Nuclear Flagship — Autonomous Loop Work Log

Goal: build the Nuclear flagship user-journey experience per
`docs/plans/2026-06-22-nuclear-flagship-journey-design.md`, then continue broader
Argumend improvement. Self-paced loop. Verify every change (tsc + vitest + routes),
commit incrementally, **do not push**.

Branch: `nuclear-flagship` (off `main`).

---

## Pacing notes (data-driven — I CAN read real usage)
- Real numbers live at `/tmp/claude/statusline-usage-cache.json` (monclaude refreshes
  every ~180s via the OAuth `/api/oauth/usage` endpoint). Read `.five_hour.utilization`,
  `.five_hour.resets_at`, `.seven_day.utilization`, `.seven_day.resets_at`.
- TWO windows: **5h rolling = rate cap** (keep < 80%); **7d = budget envelope to spend**
  (was 12% used at start, resets ~2026-06-24T02:00Z — the founder's "1d 19h" reset).
- Policy: 5h < 70% → full speed, big chunks, ~60s sleeps. 70–80% → stretch sleeps.
  ≥ 80% → sleep until `five_hour.resets_at`, then resume. Burn the weekly down meanwhile.
- One meaningful, verified, committed chunk per iteration.

---

## Iteration log

### Iter 0 — 2026-06-22 — Phase 0 (design + setup)
- Assessed repo: 142 topics, 57 blog posts, 19 guides; tsc clean; 207 tests green.
- Found + parked the breadth play: 132/142 topics lack an `/is/` AEO page (scoped, batched).
- Founder redirect → depth on one flagship topic. Chose **nuclear-energy-safety**.
- Mapped current Read-Mode journey; identified 3 gaps (buried wow, no crisp atomic
  facts w/ confidence, crux is "what settles it" not "what would change your mind").
- Wrote design doc (5-stage journey + falsification crux model + phased plan).
- Created branch, work log. Baseline verified.
- **Next:** Phase 1 — additive schema (`CruxSchema.falsification`,
  `Topic.keystone_fact`, `Topic.simple_case`); confirm all 142 topics still validate.

### Iter 1 — 2026-06-22 — Phases 1 + 2 (schema + nuclear content)
- Discovered I can read real usage (monclaude cache) → switched to data-driven pacing.
  5h was 7–8% throughout (huge headroom); old 20-min naps were far too slow.
- Phase 1: added optional `CruxSchema.falsification`, `Topic.keystone_fact`,
  `Topic.simple_case`. tsc clean; 207 tests pass (all topics still validate).
- Phase 2: authored nuclear `keystone_fact`, `simple_case`, and falsification for both
  pillars (safety; climate-effectiveness). tsc clean; 207 tests pass. Committed `1ebc7a3`.
- **Next:** Phase 3 — `FalsificationCrux` component + atomic-fact confidence tiers,
  wired into `ReadModeView` gated on data presence (no regression for other topics).

### Iter 2 — 2026-06-22 — Phase 3 (falsification crux + atomic-fact tiers)
- `confidenceTier()` helper; `FalsificationCrux` component (gated on `crux.falsification`,
  falls back to the old test view); `EvidenceItem` now shows tier + "% confidence".
- Wired into `ReadModeView`. tsc clean; 207 tests; eslint clean; **full production
  build passed** and nuclear HTML verified to contain the falsification + confidence
  content. Committed `2a34dd7`. 5h usage ~9%.
- **Next:** Phase 4 — render Stage-1 keystone hero (`topic.keystone_fact`) above the
  claim + Stage-2 `simple_case`, gated on presence so other topics are unaffected.

### Iter 3 — 2026-06-22 — Phase 4 (keystone hero + simple case)
- `FlagshipIntro` component (Stage 1 keystone fact w/ confidence pill + Stage 2
  simple case), wired into `ReadModeView` above the claim, gated on data.
- tsc clean; 207 tests; eslint clean; **build passed**. Verified nuclear HTML shows
  hero + simple case + "90% confidence"; rent-control HTML has NO keystone block
  (gating correct, no regression). Committed `52fa6f9`. 5h ~9%.
- **Full Stage 1–5 journey now live for nuclear.**
- **Next:** Phase 6 — tests (confidenceTier unit test; nuclear data-integrity test
  for keystone_fact/simple_case/falsification; component render+gating tests).
  Then Phase 5 polish (copy, a11y, mobile, dark mode, reduced-motion, visual QA),
  then Phase 7 roll-out to 2–3 more empirical topics.

### Iter 4 — 2026-06-22 — Phase 6 (tests)
- `lib/schemas/flagship.test.ts` (confidenceTier boundaries; falsification + keystone/
  simple_case schema accept/reject; nuclear data-integrity).
- `components/FlagshipIntro.test.tsx` + `components/FalsificationCrux.test.tsx`
  (render-when-present + gating/fallback). First .test.tsx files in the repo.
- 221 tests pass (+14); tsc + eslint clean. Committed `7ee0eae`. 5h ~10%.
- **Next:** Phase 5 — verify the DEFAULT topic landing view shows the flagship intro
  (not hidden behind the read/graph toggle), then visual QA via dev-server screenshot,
  then polish (a11y, mobile, dark mode, reduced-motion). Then Phase 7 roll-out.

### Iter 5 — 2026-06-22 — Phase 5 (verify default view + visual QA)
- Confirmed topic page DEFAULTS to read view (`?view=graph` opt-in), so FlagshipIntro
  is the first thing a visitor sees. Positioning correct.
- Dev server (`:3007`) + Playwright screenshots: desktop light, desktop dark, mobile
  (390px) all render the keystone hero + "Established · 90% confidence" pill + simple
  case cleanly and on-brand. Wow lands; dark + mobile good; a11y labels present; no
  animations (reduced-motion N/A).
- **No code changes** — implementation already polished (honest QA outcome).
- **Pre-existing (NOT mine):** React hydration-mismatch warning on ALL topic pages
  (verified on rent-control too) + GA-blocked-by-CSP + favicon 404 in local dev.
  Out of scope for the flagship; flagged for a separate look.
- Cleaned up dev artifacts. 5h ~11%.
- **Next:** Phase 7 — roll the flagship pattern (keystone_fact, simple_case,
  falsification cruxes) to 2–3 more strong empirical topics:
  rent-control-effectiveness, death-penalty-deterrence, gmo-crops-safety.

### Iter 6 — 2026-06-22 — Phase 7a (rent-control + death-penalty)
- rent-control-effectiveness: keystone = IGM economist near-consensus; falsification on
  all 3 cruxes. death-penalty-deterrence: keystone = NRC "not informative" finding;
  falsification on both cruxes. Faithful to each topic's existing evidence.
- Generalized `flagship.test.ts` to `describe.each(FLAGSHIP_TOPIC_IDS)` (18 tests) so
  every flagship topic is guaranteed keystone + simple_case + falsification on all cruxes.
- tsc clean; 221 tests; build passed; both topics' HTML render keystone + falsification.
  Committed `31926a8`. 5h ~12%.
- **Next:** Phase 7b — gmo-crops-safety (strong safety consensus vs loud opposition,
  a nuclear-like wow). Then flagship goal complete; move to the PARKED breadth play
  (132 topics lacking `/is/` AEO pages) — propose a multi-agent workflow (parallel;
  needs founder opt-in).

### Iter 7 — 2026-06-22 — Phase 7b (gmo) + FLAGSHIP GOAL COMPLETE
- gmo-crops-safety: keystone = the 25-yr National Academies safety consensus; simple_case
  concedes the agronomic (herbicide/superweed) and glyphosate hazard-vs-risk caveats;
  falsification on all 3 cruxes. Added to FLAGSHIP_TOPIC_IDS.
- tsc clean; 233 tests; build passed; gmo HTML renders keystone + falsification.
  Committed `644f5d1`. 5h ~13%.
- **✅ FLAGSHIP GOAL COMPLETE:** full Stage 1–5 journey built, tested (component +
  schema + data-integrity), visually QA'd (desktop light/dark + mobile), and proven to
  generalize across 4 topics. Schema is fully additive — other 138 topics unaffected.

## Broader-improvement roadmap (the "continue" clause)
Priority order, all in-loop unless a workflow is opted into:
1. **Roll flagship to top empirical, high-search topics** (most on-mission: wow + simplicity
   + falsification). Queue: climate-change, vaccine-mandates, fluoride-water-supplies,
   lab-leak-theory, seed-oils-health, ai-risk. ~1–2 topics/iteration.
2. **Breadth /is/ AEO play** (parked): 132 topics lack an "is X true?" page. Embarrassingly
   parallel → ideal for a multi-agent **workflow** (needs founder opt-in; I'll surface it).
3. Other menu items (blog fallacy explainers, glossary, internal linking) as filler.
- **Next:** Phase 8 — roll flagship pattern to climate-change (highest-traffic showcase).

### Iter 8 — 2026-06-22 — Phase 8 (climate-change)
- climate-change: keystone = the triple chemical fingerprint (δ¹³C / O₂ / ocean pH),
  confidence 97; simple_case = attribution settled, live fight is sensitivity + policy;
  falsification on all 3 cruxes — a strong demo that even SETTLED science states what
  would change its mind. tsc clean; 237 tests; build passed; renders. Committed `317a127`.
- **Flagship pattern now covers 5 topics** across energy/economics/policy/science.
  This is a sufficient, diverse showcase set.
- **Decision point (surfaced to founder in summary):** the big remaining win is the
  PARKED breadth /is/ play (132 topics lack an "is X true?" page). Options: grind in-loop,
  or a multi-agent **workflow** (parallel; spends the abundant weekly budget; needs opt-in).
- **Next:** Phase 9 — one more flagship topic (vaccine-mandates: high traffic, MAHA-
  relevant), then pivot to the breadth /is/ play.

### Iter 9 — 2026-06-22 — Phase 9 (vaccine-mandates) + PIVOT to breadth
- vaccine-mandates: keystone = "it depends on the disease" (measles vs COVID transmission);
  falsification on all 3 cruxes. tsc clean; 241 tests; build passed; renders. `fcaf6e9`.
- **Flagship pattern now covers 6 topics** (nuclear, rent-control, death-penalty, gmo,
  climate-change, vaccine-mandates). Pausing rollout — sufficient showcase.
- **PIVOT → breadth /is/ play.** 132 of 142 topics lack an "is X true?" AEO page. Plan:
  author `data/is-claims.ts` entries in batches (~15–20/iter), faithful to each topic's
  meta_claim orientation (question = natural interrogative; claim = de-hedged affirmative
  of meta_claim; slug = descriptive kebab, no "is-" prefix). Page + QAPage/ClaimReview
  schema + sitemap inclusion already built. Prioritize the 6 flagship topics first (so
  "is X safe?" queries land on the wow experience), then high-search, then the long tail.
- **Next:** Phase 10 — breadth batch 1 (flagship topics still lacking /is/ + first ~15).

### Iter 10 — 2026-06-22 — Phase 10 (breadth /is/ batch 1)
- +13 `/is/` pages (10 → 23): rent-control, vaccine-mandates, minimum-wage, drug-
  decriminalization, seed-oils, ai-job-displacement, social-media/teens, student-debt,
  4-day-week, EVs, covid-lab-leak, psychedelics, ultra-processed-food.
- Editorial rule applied: claim oriented to topic's confidence so the verdict reads right.
  **SKIPPED** gmo-crops-safety (blended 47 would mislabel the strong safety consensus) and
  organic-food-health (would overstate vs consensus) — flagged for topic-score review.
- Added `data/is-claims.test.ts` (unique slugs / kebab / valid topicIds / non-empty).
  tsc clean; 245 tests; build passed; pages generate. Committed `661fd39`. 5h ~17%.
- **~119 topics still lack /is/.** Next: batch 2 (~15 more high-search topics).
- **Note:** flagged for review — gmo & organic topic confidence_scores; consider splitting
  GMO's meta_claim (safe-to-eat vs beneficial-for-agriculture) so it can get an honest /is/.

### Iter 11 — 2026-06-22 — Phase 11 (breadth /is/ batch 2)
- +14 `/is/` pages (23 → 37): tiktok-ban, police-reform, wealth-tax, billionaires,
  self-driving safety, embryo gene-editing, space exploration, factory farming,
  homeschooling, congestion pricing, right-to-repair, assisted dying, sex-work decrim,
  carbon tax. Skipped immigration-border-crisis (awkward meta_claim mapping) — flagged.
- tsc clean; is-claims integrity test passes; **clean** build exit 0. Committed `7fb62f3`.
- **BUILD-FLAKE LESSON:** repeated incremental `bun run build` (reusing `.next`) can hit
  an ENOENT copying a `@vercel/og` edge chunk into `.next/standalone`. It's a stale-artifact
  flake — `rm -rf .next && bun run build` passes. Future iters: clean `.next` before the
  build verification, or treat that exact ENOENT as benign.
- **~105 topics still lack /is/.** Next: batch 3 (~15 more).

### Iter 12 — 2026-06-22 — Phase 12 (breadth /is/ batch 3)
- +14 `/is/` pages (37 → 51): mandatory voting, reparations, immigration/wages, open
  borders, standardized testing, electoral college, surveillance/crime, China-Taiwan,
  social-media/elections, nuclear deterrence, school phone bans, pandemic prep, water
  wars, sugar taxes. tsc; 245 tests; clean build exit 0. Committed `030215f`.
- Skipped (flagged): us-iran-conflict, iran-war-justification, immigration-border-crisis
  (idiosyncratic/fast-moving), epstein-files (conspiracy-magnet framing).
- Full remaining list dumped to /tmp/nf_remaining.txt (was 105; now ~91).
- **Next:** batch 4 (~15 more from the remaining list).

### Iter 13 — 2026-06-22 — Phase 13 (breadth /is/ batch 4)
- +13 `/is/` pages (51 → 64): social-media age limits, AI labeling, break-up big tech,
  cancel culture, media bias, space colonization, lab-grown meat, AI in education, AI
  regulation, e/acc, superintelligence timeline, SMRs, short-form-video brain rot.
- Skipped ai-white-collar-displacement (near-dup of ai-replace-white-collar-jobs).
  tsc; 245 tests; clean build exit 0. Committed `e636038`. ~78 remaining.
- **Next:** batch 5 (~15 more). Going forward, fold the per-iter log update into the
  data commit to halve commit noise.

### Iter 14 — 2026-06-22 — Phase 14 (breadth /is/ batch 5)
- +13 `/is/` pages (64 → 77): AI replacing doctors, digital privacy, veganism/env,
  longevity, microplastics, GLP-1 drugs, obesity/responsibility, loneliness, remote work,
  college worth-it, foreign aid, crypto regulation, gig workers. tsc; tests; clean build.
- Skipped: organic-food-health (overstates vs consensus), lithium-mining-ev-impact
  (near-dup of EV topic), **gender-affirming-care-minors** (too sensitive/fast-moving for
  a blunt static /is/ verdict — full topic page keeps nuance; flagged for founder).
- **~65 remaining.** Next: batch 6.

### Iter 15 — 2026-06-22 — Phase 15 (breadth /is/ batch 6)
- +15 `/is/` pages (77 → 92): moon-landing (debunk), AI-consciousness (canonical topic),
  simulation, inflation cause, housing bubble, US debt, RTO productivity, lab diamonds,
  degrowth, gov-fix-housing, meaning w/o religion, meritocracy myth, hard problem of
  consciousness, kids smartphone ban, artificial wombs.
- Skipped government-platform-bans (dup of tiktok-ban) and minneapolis-shooting
  (fast-moving news, not evergreen). tsc; 245 tests; clean build. ~50 remaining.
- **Next:** batch 7 (remaining ~50, incl. alternatives-to-democracy, geoengineering,
  gain-of-function, and the long tail).

### Iter 16 — 2026-06-22 — Phase 16 (breadth /is/ batch 7)
- +11 `/is/` pages (92 → 103): gain-of-function ban, alternatives to democracy,
  geoengineering, CBDC surveillance, masculinity crisis, deepfakes/truth, birth-rate
  collapse, new nuclear arms race, animal rights, open-weight AI, 2nd Amendment.
- **SKIP/FLAG cluster (need founder judgment, not auto-published):** fast-moving partisan
  current-politics (trump-tariffs, rfk-health-policy, doge-federal-cuts, ukraine-peace-terms)
  and polarized/sensitive (transgender-athletes, affirmative-action, immigration-national-
  identity, gender-affirming-care-minors); near-dups (longevity-anti-aging, psychedelic-
  therapy-hype); plus earlier flags (us-iran, iran-war, epstein, immigration-border-crisis,
  government-platform-bans, minneapolis-shooting, ai-white-collar-displacement, organic-food,
  lithium-mining). tsc; 245 tests; clean build. Committed.
- **~20 includable topics remain** (rest are intentional skips). Next: batch 8 (likely the
  last bulk batch), then a SKIP-LIST summary for founder review.

### Iter 17 — 2026-06-22 — Phase 17 (breadth /is/ batch 8) — BREADTH PLAY COMPLETE
- +18 `/is/` pages (103 → 121): net neutrality, AI-art copyright, facial recognition,
  fusion timeline, SSRIs, retirement age, estate tax, occupational licensing, encryption
  backdoors, Section 230, autonomous weapons, AI energy footprint, ADHD overdiagnosis,
  vaping, term limits, effective altruism, alcohol, MMT. tsc; 245 tests; clean build.
- **✅ BREADTH /is/ PLAY COMPLETE: 121 pages (was 10).** Every cleanly-includable topic
  now has an "is X true?" AEO page. The 21 uncovered topics are ALL intentional skips:

## SKIP-LIST — /is/ pages deliberately NOT created (founder review)
**A. Score-mapping issues — fix the topic, then add /is/:**
- `gmo-crops-safety` (47): blended "safe to eat + beneficial for ag" mislabels the strong
  *safety* consensus as "Insufficient evidence". → Recommend splitting the meta_claim.
- `organic-food-health` (61): "significantly healthier" overstates vs scientific consensus.
- `dark-matter-vs-mond` (46): "Insufficient evidence" understates the dark-matter consensus.

**B. Near-duplicates (avoid keyword cannibalization) — already covered by a sibling page:**
- `ai-white-collar-displacement` ≈ ai-replace-white-collar-jobs
- `lithium-mining-ev-impact` ≈ evs-better-than-gas-cars
- `longevity-anti-aging` ≈ longevity-extend-lifespan
- `psychedelic-therapy-hype` ≈ psychedelics-treat-depression
- `government-platform-bans` ≈ tiktok-ban-justified

**C. Polarized / sensitive — a blunt static verdict is risky; full topic page keeps nuance:**
- `gender-affirming-care-minors`, `transgender-athletes-sports`, `affirmative-action-meritocracy`,
  `immigration-national-identity`, `epstein-files` (conspiracy-magnet framing).

**D. Fast-moving / current-politics — verdict would go stale or read as partisan:**
- `trump-tariffs`, `rfk-health-policy`, `doge-federal-cuts`, `ukraine-peace-terms`,
  `us-iran-conflict`, `iran-war-justification`, `immigration-border-crisis`,
  `minneapolis-shooting` (specific 2026 news event).

- **Next:** breadth done → return to broader improvement. Options: (1) a few more flagship
  topics, (2) blog/glossary/internal-linking, (3) wrap with a session memory + summary.

### Iter 18 — 2026-06-22 — Phase 18 (/is discoverability — fix orphan pages)
- Found the 121 `/is/` pages were ORPHANS (no index, no internal links, only in sitemap).
- Built `app/is/page.tsx` — an "Is it true?" hub: all 121 questions grouped by category,
  each linking to its /is/ page with a confidence badge (tone via confidenceTier; no amber).
  CollectionPage JSON-LD, metadata, breadcrumbs, OG image, CTA. Modeled on /questions.
- Added `/is` to `app/sitemap.ts` (priority 0.8).
- Added BOTH "Is It True?" (/is) and "Questions" (/questions) to the global Footer
  Explore column — both hubs were previously unlinked. Now every page links to them.
- tsc; 245 tests; clean build; /is index renders all 121 links. Committed.
- Saved cross-session memory `nuclear-flagship-2026-06.md` (+ MEMORY.md pointer).
- **Next:** more broader improvement — candidates: a couple more flagship topics, or
  blog/glossary content. Both major goals (flagship journey + /is breadth) are DONE.

### Iter 19 — 2026-06-22 — Phase 19 (flagship: consciousness-ai-systems)
- Gave the CANONICAL featured/launch topic the flagship treatment. For a speculative
  topic the keystone = legible uncertainty ("no agreed test, yet serious labs take it
  seriously — Nature/Anthropic/17% of researchers"); falsification framing shines
  (substrate-dependence flip; sentience-indicators flip). Added to FLAGSHIP_TOPIC_IDS.
- tsc; **249 tests**; clean build; renders. 7 flagship topics now (incl. featuredTopicId).
- **Next:** continue broader improvement (more flagship topics and/or content).
