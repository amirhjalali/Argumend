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

### Iter 20 — 2026-06-22 — Phase 20 (flagship: ai-risk)
- ai-risk (Existential Risk from AGI): keystone = "the scary parts aren't only theory"
  (2024 alignment-faking + shutdown-resistance evals + 10%-by-2027 survey); falsification
  on all 3 cruxes (instrumental convergence / deceptive alignment / scaling timeline).
- tsc; **253 tests**; clean build; renders. **8 flagship topics** now.
- **Next:** likely 1-2 more (lab-leak, fluoride) then shift off flagship to other work.

### Iter 21 — 2026-06-22 — Phase 21 (flagship: lab-leak-theory / covid-origins.ts)
- covid-origins: keystone = the honest crux of why it's unresolved (China took the WIV
  virus database offline in 2019 + withheld data; both sides circumstantial) — chosen so it
  doesn't contradict the topic's lab-le-leaning verdict. Keystone sourceUrl omitted (no
  precise verified URL; source cited as text). Falsification on all 3 cruxes.
- tsc; **257 tests**; clean build; renders. **9 flagship topics** now.
- **Next:** 1 more (fluoride) → 10, then shift to other improvement types (content, etc.).

### Iter 22 — 2026-06-22 — Phase 22 (flagship: fluoride-water-supplies) — 10 TOPICS
- fluoride: keystone = "it's about margins, not myths" (0.7 vs ~1.5 mg/L NTP-2024 IQ
  threshold; Cochrane-2024 shrinking benefit); falsification on all 3 cruxes
  (systemic-vs-topical / low-dose neuro risk / consent-alternatives). NTP sourceUrl verified.
- tsc; **261 tests**; clean build; renders. **10 FLAGSHIP TOPICS** — comprehensive set:
  nuclear, rent-control, death-penalty, gmo, climate, vaccines, AI-consciousness, AI-risk,
  lab-leak, fluoride (covers energy/econ/policy/science/tech/philosophy + the 2 AI launch topics).
- Note: 5h window reset to ~0% mid-iteration (pacing stayed well clear of cap all session).
- **Flagship rollout now sufficient.** Next: shift to OTHER improvement types — candidates:
  (a) glossary terms for the new concepts (falsification / keystone / steelman),
  (b) a blog post on "what would change your mind" as a reasoning tool,
  (c) tighter internal linking. Will pick highest-value next iteration.

### Iter 23 — 2026-06-22 — Phase 23 (blog post: "What Would Change Your Mind?")
- New blog post `what-would-change-your-mind` (data/blog.ts, 57→58): ~1900 words on
  falsifiability + the crux + double-crux as the test for honest belief; worked examples
  from flagship topics; 12 internal links to /topics/{nuclear,lab-leak,ai-risk,rent-control},
  /is hub, and the steel-manning post. On-mission content that anchors the flagship concept.
- tsc; blog test (29) passes; clean build; post route renders.
- **Next:** more content/polish — candidates: glossary terms (falsification/crux/double-crux),
  a fallacy explainer, or tighter cross-linking. Both major goals long done.

### Iter 24 — 2026-06-22 — Phase 24 (glossary: reasoning vocabulary)
- Added Falsifiability, Double crux, Burden of proof to BOTH glossary sources:
  `data/glossaryTerms.ts` (inline GlossaryTerm tooltips) and `app/glossary/page.tsx`
  (standalone /glossary page — separate dataset; richer, categorized). On the page they're
  in the "reasoning" category with example links to flagship topics + a learn-more link to
  the new blog post. tsc; 261 tests; clean build; /glossary renders all three.
- **Note:** the two glossary datasets are separate (tooltip vocab vs page) — a future
  cleanup could unify them; kept parallel for now (low risk).
- **Next:** continue content/polish — diminishing-returns territory; staying value-first.

### Iter 25 — 2026-06-22 — Phase 25 (blog post: "Fact or Value?")
- New blog post `fact-or-value` (data/blog.ts, 58→59): ~1700 words on the fact/value
  (is–ought) distinction as the untangler for stuck arguments; worked examples from
  death-penalty / nuclear / assisted-dying; 16 internal links to topics + /is + the
  "what would change your mind" post. Distinct from existing posts (verified vs title list).
- tsc; blog test (29); clean build; post renders.
- **State:** both major goals long done; blog now 59 posts. Genuinely incremental from here.
  Everything verified + committed, unpushed (49+ commits on nuclear-flagship).

### Iter 26 — 2026-06-22 — Phase 26 (3 new fallacies)
- Added cherry-picking, moving-the-goalposts, appeal-to-nature to data/fallacies.ts (17→20).
  All genuine gaps; thematically coherent with the flagship work (moving-the-goalposts ties
  to the crux/"what would change your mind" framing; appeal-to-nature links GMO/organic/
  seed-oils; cherry-picking ties to "weigh all evidence"). relatedTopicIds + relatedFallacies
  cross-link to existing content. tsc; 261 tests; clean build; all 3 /fallacies/ pages render.
- **Next:** continue value-first incremental work (more content, or pause if nothing high-value).

### Iter 27 — 2026-06-22 — Phase 27 (blog: "Are Vaccine Mandates Justified?")
- New post `are-vaccine-mandates-justified` (data/blog.ts, 59→60, category "Public Health"):
  topic-explainer reusing the flagship "it depends on the disease" insight (measles vs COVID
  transmission externality as the crux). Fills a gap — top-traffic flagship topic had no post.
  9 internal links to /topics/vaccine-mandates, /is, and the "change your mind" post.
- tsc; blog test (29); clean build; post renders. Cadence now ~20min (incremental phase).
- **Next:** reassess for genuinely high-value work; otherwise space further / await direction.

### Iter 28 — 2026-06-22 — Phase 28 (blog: "Are GMOs Safe to Eat?")
- New post `are-gmos-safe` (data/blog.ts, 60→61, "Science & Health"): captures the high-search
  "are GMOs safe" query that GMO's /is/ page couldn't (its blended score was skipped). Three
  questions: safe-to-eat (settled yes, NAS 2016), agronomic (trait-dependent), glyphosate
  (hazard-vs-risk). 11 internal links incl. the new appeal-to-nature fallacy + fact-or-value
  post — content web is cohering. tsc; blog test (29); clean build; renders.
- **Next:** likely 1-2 more topic-explainers for flagship topics lacking posts (rent-control,
  AI-consciousness, lab-leak, fluoride), then reassess / await direction. ~20min cadence.

### Iter 29 — 2026-06-22 — Phase 29 (blog: "Is Fluoride in Your Water Safe?")
- Skipped rent-control (already covered by housing-crisis-zoning-rent-control-data — avoided
  cannibalization). Wrote fluoride explainer `is-fluoride-in-water-safe` (61→62, "Public
  Health"): reuses "it's about margins" (0.7 vs 1.5 mg/L NTP-2024; Cochrane-2024 shrinking
  benefit; consent values question). 20 internal links. tsc; blog test (29); clean build; renders.
- Remaining flagship topics without posts: AI-consciousness, lab-leak/covid-origins,
  superintelligence-timeline. Will do AI-consciousness next (strategic — launch topic).
- **Next:** AI-consciousness explainer, then reassess whether to continue or slow further.

### Iter 30 — 2026-06-22 — Phase 30 (blog: "Could AI Be Conscious?")
- New post `could-ai-be-conscious` (~62 entries, "Technology & Society"): the strategic
  launch-topic explainer. Reuses the flagship framing (no agreed test / Nature+Anthropic+17%
  / substrate-vs-function crux / consciousness ≠ danger / moral caution under uncertainty).
  19 internal links incl. /topics/consciousness-ai-systems, /topics/ai-risk, fact-or-value,
  change-your-mind. tsc; blog test (29); clean build; renders.
- **Reassessment:** content web now very dense (6 new posts this session, all cross-linked).
  Remaining flagship topics without posts: lab-leak, superintelligence — lower marginal value.
  Genuinely approaching the end of clearly-high-value autonomous solo work. Plan: 1 more if
  clearly valuable, else slow cadence further and await founder direction (review/push, the
  flagged score fixes, or a new goal). Nothing needing founder judgment will be auto-done.

### Iter 31 — 2026-06-22 — Phase 31 (blog: "Did COVID Come From a Lab?")
- New post `did-covid-come-from-a-lab` ("Science"): balanced explainer — crux is withheld
  data; strongest case each side; "we can't tell yet" is the accurate position. 11 internal
  links. tsc; blog test (29); clean build; renders.
- **MILESTONE: flagship-topic explainer posts now complete.** All 10 flagship topics either
  had a post or now have one (gmo, vaccines, fluoride, AI-consciousness, lab-leak added this
  session; nuclear/climate/death-penalty/rent-control pre-existing; ai-risk via adjacent post).
- Content this session: 7 blog posts, 3 glossary terms, 3 fallacies — all cross-linked.
- **Posture shift:** clearly-high-value autonomous solo work is essentially exhausted.
  Going to ~30min cadence; will do only genuinely valuable items (else re-verify + wait).
  Highest-value next step is FOUNDER action: review/push the branch (43 commits), decide the
  flagged score fixes (gmo/organic/dark-matter) + sensitive /is/ topics, or set a new goal.

### Iter 32 — 2026-06-22 — Phase 32 (4 more fallacies)
- Added equivocation, sunk-cost, appeal-to-ignorance, red-herring to data/fallacies.ts
  (18→22 entries). All classic, high-search, distinct; cross-linked to topics + sibling
  fallacies (appeal-to-ignorance ties to the burden-of-proof glossary term). tsc; 261 tests;
  clean build; all 4 /fallacies/ pages render.
- **Next:** ~30min cadence, value-only. Genuinely near the end of high-value solo work;
  prefer awaiting founder direction (review/push the 44-commit branch).

### Iter 33 — 2026-06-22 — Phase 33 (E2E browser verification + sidebar hydration fix)
- **First-ever end-to-end browser verification of the flagship journey.** Started dev server,
  loaded /topics/nuclear-energy-safety in Playwright (headless, 1280px). Confirmed every
  journey stage renders correctly: Stage-1 keystone hero ("THE FACT MOST PEOPLE GET WRONG" +
  800×-safer fact + "Established · 90% confidence" pill + source); Stage-2 "THE HONEST VERSION,
  IN THREE SENTENCES"; meta-claim + BOTTOM LINE + controversy meter at Contested; proponent/
  skeptic columns; CRUXES list; both pillars with the "CRUX — WHAT WOULD CHANGE YOUR MIND"
  falsification block (supporter-flip / skeptic-flip / both-agree / live-fight); evidence with
  confidence tiers; Community Verdict; related topics; footer. Deliverable is verified working.
- **Found + fixed a real pre-existing bug:** every AppShell page threw a React hydration
  mismatch (sidebar). `useSidebarState` read `window.innerWidth` in its `useState` initializer,
  so SSR rendered the sidebar closed but the client's first render opened it on desktop →
  tabIndex/className mismatch + a "1 Issue" Next.js dev error badge. Fix: render closed on SSR
  and first client render (hydration matches), apply the responsive value in a client layout
  effect before paint (no flash), expose `mounted`, gate AppShell enter-transitions on it.
  Hook fix removes the mismatch globally (also benefits HomeClient + analyze page).
- Verified: tsc clean; 261 tests; browser console 0 errors (was 2: hydration + favicon);
  sidebar still open by default on desktop, no visual regression, no dev "1 Issue" badge.
  Commit be71f06. Artifacts (screenshots, .playwright-mcp) removed, not committed.
- **Posture:** the flagship is now not just built but *verified rendering correctly*. This was
  the highest-value remaining solo item (validates the whole deliverable + fixed a shell-wide
  bug). Back to ~30min value-only cadence; still prefer founder action next (review/push the
  now 45-commit branch; decide flagged score fixes + sensitive /is/ topics; or set a new goal).

### Iter 34 — 2026-06-22 — Phase 34 (home-page E2E verification + 2nd hydration fix)
- **Verified the home page (the entry-point "wow") in-browser for the first time.** Confirmed
  the HeroMiniCanvas showpiece renders on desktop (live "Could AI systems be conscious?" mini-
  map, 3 pillars), featured analysis, sidebar, etc.
- **Found + fixed a SECOND hydration mismatch** (distinct from Iter 33's sidebar one), on the
  home page: `useMediaQuery` read `window.matchMedia` in its `useState` initializer, so SSR
  rendered `isMobile=true` (mini-canvas hidden) but the desktop client rendered `isMobile=false`
  (mini-canvas shown) → mismatch in the hero. Fixed at root: render `false` on SSR + first
  client render, sync after mount. Fixes both consumers (HomeClient `useIsMobile`, MapLegend
  `isLargeScreen`). Also gated HomeClient's sidebar enter-transitions on `mounted`, matching
  AppShell. Commit d1030a1.
- Verified: tsc; 261 tests; browser console 0 errors (was 2); desktop hero canvas still renders;
  sidebar open by default; no visual regression. Artifacts removed, not committed.
- **FLAGGED for founder (not auto-done — visible brand asset):** the site has NO favicon at all
  (no app/icon.*, no app/favicon.ico, no public/icon.png) → `/favicon.ico` 404 on every page,
  AND the JSON-LD Organization `logo` (app/layout.tsx:167) points to a nonexistent
  `https://argumend.org/icon.png` (broken structured-data logo). Ready-to-implement fix:
  add `app/icon.tsx` via `next/og` `ImageResponse` (mirror app/opengraph-image.tsx), e.g. a
  serif "A" monogram in cream (#f4f1eb) on deep-teal (#3a6965) — faithful to the approved
  palette; then repoint the JSON-LD logo to a stable icon URL. Left for founder sign-off since
  it's a visible brand mark.
- **Posture:** two genuine, verified correctness bugs fixed this session (both hydration
  mismatches affecting every page / the entry point) — clearly more than filler. Both headline
  goals remain done + now verified rendering. ~30min value-only cadence continues; top founder
  actions still: review/push the now-48-commit branch; green-light the favicon; decide the
  flagged score fixes (gmo/organic/dark-matter) + sensitive /is/ topics; or set a new goal.

### Iter 35 — 2026-06-22 — Phase 35 (/is AEO pages: verified + related-links SEO fix)
- **Verified the /is AEO deliverable in-browser/curl for the first time** (121 pages I built
  but never rendered). Confirmed: QAPage + Question + Answer + Article JSON-LD all present and
  valid; verdict logic correct (nuclear-energy-safe → "Evidence leans toward, but contested" at
  54, which is right for the claim "safe enough to scale as a climate solution" — not a
  mislabel). Skipped-topic discipline (gmo/organic/dark-matter absent from is-claims) holding.
- **Found + fixed a real SEO/UX bug:** every /is/<slug> rendered links to ALL ~120 other claims
  under "More questions people ask" (complete-graph interlinking) → ~340KB pages, buried CTA,
  diluted link equity. Fixed: same-category questions first, fill with others, cap at 8. Now
  genuinely relevant (policy→policy, science→science, tech→tech) and pages drop to ~135KB.
  JSON-LD unchanged. Commit 530f89e.
- Verified: tsc; 261 tests; clean build (all /is/<slug> prerender as SSG); curl-confirmed 8
  same-category links on nuclear/fluoride/ai pages.
- **Note (reinforces the favicon flag):** the Article JSON-LD `publisher.logo.url` on every /is
  page is the same nonexistent `https://argumend.org/icon.png` — a broken logo across 121 pages
  that can disqualify Article rich results. Founder should fix alongside the favicon.
- **Posture:** 3 genuine verified fixes this session (2 hydration + this SEO one), all found by
  actually rendering pages. ~30min value-only cadence continues. Branch now ~50 commits ahead,
  unpushed. Top founder actions unchanged: push; green-light favicon + logo; decide flagged
  score/sensitive items; or set a new goal.

### Iter 36 — 2026-06-22 — Phase 36 (route sweep + 2 more real bugs fixed)
- **HTTP+size sweep of all key routes:** all return 200 (no broken pages); /explore 308-redirects
  as expected. Sizes explainable; investigated /blog (dev 2.1MB → prod 833KB) and confirmed it's
  NOT a leak — full post bodies do not appear in the prod index (0 occurrences); the dev bloat is
  dev-only flight-payload data, tree-shaken in prod. Heavy-but-correct; pagination would be a
  founder-level UX change, so not forced.
- **Browser console pass on untested page TYPES → found 2 real bugs:**
  1. **ShareButtons hydration mismatch** (every blog post + analysis + topic-detail page): read
     `navigator.share` in a `useState` initializer → server omitted the native-share button,
     client rendered it → mismatch. Fixed: default false, detect after mount. Commit 10ab6ce.
  2. **Glossary duplicate React key** ("Burden of Proof" listed twice — I introduced the dup when
     adding glossary terms): caused "two children with the same key" + risked a dropped card.
     Merged the better phrasing into one entry, removed the dup. Commit 970707c.
- Fallacy and guide pages verified clean (0 console errors).
- Verified: tsc; 261 tests; clean build; in-browser console 0 errors on blog/glossary (was 2 each).
- **Tally:** this session's render-verification has now found+fixed FOUR real bugs invisible to
  tsc/vitest — 3 hydration mismatches (sidebar/every page, useMediaQuery/home hero,
  ShareButtons/blog+topic) + 1 dup-key + 1 SEO bloat (/is). Strong evidence the verify-by-render
  pass was worth doing. Branch ~55 commits ahead, unpushed.
- **Posture:** ~30min value-only cadence. Remaining untested surfaces are few; next tick I'll do
  a final sweep (analysis page, /questions, category/tag pages) then likely settle into
  await-founder mode. Founder actions unchanged: push; favicon+logo (404 across all pages); the
  flagged score/sensitive items; or a new goal.

### Iter 37 — 2026-06-22 — Phase 37 (verification sweep complete — convergence)
- Console-checked the LAST untested page TYPES: /questions/[slug], /blog/category/[slug],
  /blog/tag/[slug], /questions index, /topics index. **All clean (0 console errors.)**
- **No new bugs found — the verify-by-render bug hunt has converged.** Every page type has now
  been rendered and checked: home, /topics/[id], /is + /is/[slug], /blog + /blog/[slug] +
  category + tag, /fallacies/[slug], /guides/[id], /glossary, /questions + /questions/[slug].
  (Skipped /analysis/[id] — DB-backed/dynamic, empty in offline dev.)
- The only residual console line anywhere is the /favicon.ico 404 (already flagged; founder
  territory — it's a brand asset + the broken JSON-LD logo).
- No code change this iteration: the right outcome is recording that the surface is healthy and
  the bug hunt is exhausted, not manufacturing a change. (Noted: page-title counts use "N+"
  floors — "140+ topics", "248+ questions" — intentional, not stale.)
- **Session result (Iters 33-37):** verify-by-render found + fixed 5 real bugs invisible to
  tsc/vitest — 3 hydration mismatches (sidebar→every page; useMediaQuery→home hero;
  ShareButtons→blog/analysis/topic), 1 duplicate React key (glossary), 1 SEO bloat (/is
  related-links). Branch 54 commits ahead of main, tree clean, all verified, UNPUSHED.
- **Posture: clearly-high-value autonomous solo work is now genuinely exhausted.** Both headline
  goals done + verified rendering; bug hunt converged. Strongly prefer founder action next:
  push the 54-commit branch; green-light favicon + fix the broken /icon.png logo (hits every
  page's JSON-LD); decide the flagged score (gmo/organic/dark-matter) + sensitive /is/ items;
  or set a new goal. Will keep ticking but mostly re-verify + wait unless something clearly
  valuable appears.

### Iter 38 — 2026-06-22 — Phase 38 (broken internal-link audit + fix)
- Audited every hardcoded `/topics/<id>` reference in app/ + data/ + components/ against the 142
  real topic IDs. Found **3 broken internal links (silent 404s)** and fixed them:
  - glossary "Pillar" example: `/topics/covid-origins` → `/topics/lab-leak-theory`
  - blog social-media post: `/topics/ban-tiktok` → `/topics/tiktok-ban`
  - blog social-media post: `/topics/ai-consciousness` → `/topics/consciousness-ai-systems`
- All other flagged paths were external source URLs (rand.org/topics/…, chainalysis.com/blog/…,
  fcc.gov/…/guides/…) — false positives, not internal links. Also validated /guides, /blog,
  /concepts internal links and every is-claim `topicId` — all resolve.
- Verified: tsc; 261 tests; clean build; corrected targets return 200 and render in-page; grep
  confirms NO page in .next still contains the broken links. Commit f14fe19.
- **Session bug tally (Iters 33-38): 6 real bugs fixed** — 3 hydration mismatches, 1 dup React
  key, 1 SEO bloat (/is), 1 set of broken internal links — all found by verification, none
  catchable by tsc/vitest. Branch 56 commits ahead of main, tree clean, all verified, UNPUSHED.
- **Posture:** verification surface now thoroughly swept (render + links). Genuinely at the end
  of clearly-high-value solo work. Continue ~30min ticks but mostly health-check + await founder:
  push the branch; favicon + broken /icon.png JSON-LD logo (every page); flagged score/sensitive
  items; or a new goal.

### Iter 39 — 2026-06-22 — Phase 39 (data-integrity audit — all clean; convergence)
- Cheap data-integrity sweep, all CLEAN: no duplicate is-claim questions; no duplicate
  fallacy slugs/names; no duplicate blog slugs; no duplicate topic IDs or titles (142 topics);
  every is-claim question ends in "?"; /questions index + [slug] both derive from
  `getAllQuestionVariations(topics)` so those links can't 404 by construction.
- **First fully-clean iteration — no bug found.** Rendering (all page types), internal links
  (all route types), and data integrity are now all verified healthy. The only known residual
  is the founder-territory favicon + broken /icon.png JSON-LD logo.
- No code change (correct outcome — not manufacturing filler).
- **Decision: stretching the loop cadence to ~60min.** Clearly-high-value solo work is genuinely
  exhausted and audits now return clean; 30-min ticks that find nothing are pure overhead.
  Keeping the loop alive (health-check + await founder) at a longer interval. Founder actions
  unchanged: push the 56-commit branch; favicon + logo; flagged score/sensitive /is items; or
  a new goal.

### Iter 40 — 2026-06-22 — Phase 40 (SEO/OG-image audit + blog social-card fix)
- Audited og:image + canonical across page types. Canonicals correct everywhere; the
  path-param OG route /api/og/[id] (200, image/png) and the query-param route /api/og?title=…
  (200) both work; /, /topics, /is, /questions all emit correct og:image.
- **Found + fixed a real social/SEO bug on blog posts (62 pages):** they had a
  summary_large_image Twitter card but NO og:image/twitter:image (the post's generateMetadata
  openGraph object replaced — not merged — the blog layout's inherited image), and the post
  JSON-LD `image` used /api/og/blog/<slug> which 404s (route is topic-only /api/og/[id]).
  Fixed by generating a per-post card via the working query-param route
  /api/og?title=<title>&subtitle=<category> and wiring it into openGraph.images,
  twitter.images, and the BlogPosting JSON-LD. Commit fd02d9c.
- Verified: og:image+twitter:image now present; URL returns 200 image/png (18.7KB); no
  /api/og/blog/ refs remain; tsc; 261 tests; clean build. (Dev server had crashed mid-iter;
  restarted and re-verified.)
- **Session bug tally (Iters 33-40): 7 real bugs fixed** — 3 hydration, 1 dup-key, 1 SEO bloat,
  1 broken-internal-links set, 1 blog OG-image. Branch 58 commits ahead, tree clean, UNPUSHED.
- **Posture:** SEO/OG surface now audited too. Genuinely converging again; will keep ~60min
  ticks (health-check + occasional cheap audit) and await founder (push; favicon + the broken
  /icon.png JSON-LD logo that's still site-wide; flagged score/sensitive items; or a new goal).
