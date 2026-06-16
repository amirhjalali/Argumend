# Citation Moat Sprint — Changelog

Running log of the autonomous hardening sprint (2026-06-16). Each batch: web-verified edits, tsc + 206 tests green, pushed to main.

## Baseline (2026-06-16)
- Citation coverage: **56%** (641/1136 evidence items with a real sourceUrl).
- Infra added: `scripts/citation-coverage.ts` (targeting metric), `scripts/audit-confidence.ts`.
- Prior rounds (pre-sprint): fabricated cites corrected, launch topic URLs backfilled, ~30 mis-cites fixed (see `docs/reviews/00-INDEX.md`).

## Iteration 1 (2026-06-16) — coverage 56% → 65%
Hardened 10 AI-cluster + flagship maps (1 web-agent each, every claim source-verified):
ai-risk, ai-superintelligence-timeline, ai-replacing-doctors, climate-change,
nuclear-energy-safety, minimum-wage-effects, drug-decriminalization,
death-penalty-deterrence, gene-editing-embryos, free-will.
Notable corrections beyond URL backfill: ai-risk "GPT-4 no goal-seeking" countered by
Apollo scheming research; Seattle min-wage study re-coded (UW found hours/earnings LOSS);
Oregon M110 de-causalized (implementation failure, not causal overdose harm); free-will
Vohs & Schooler flagged with its failed preregistered replication; climate-change 12/12 at
100% with no false balance. Many weights de-inflated where reliability rested on bad attribution.

## Iteration 2 (2026-06-16) — coverage 65% → 73%
Hardened 12 zero-coverage maps (1 web-agent each, every claim source-verified):
big-tech-antitrust, billionaire-wealth, cancel-culture, china-taiwan-invasion,
college-value-proposition, electoral-college-reform, ev-environmental-impact,
foreign-aid-effectiveness, gig-economy-regulation, global-housing-bubble,
homeschooling-effectiveness, immigration-wage-impact. 96 evidence items moved 0→verified URL.
Notable corrections beyond URL backfill: cancel-culture "62% self-censor" re-attributed
Pew→Cato/YouGov + fabricated CSPI "75/15 faculty" and "91% Fortune-500 DEI" figures removed;
ev-environmental-impact false-balance fixed (UCS "191 MPG"/"cleaner in all 50 states" and a
phantom MIT "$75-125B grid cost" stripped, anti-EV items down-weighted to match lifecycle
evidence); big-tech-antitrust EU-DMA "forced Amazon structural separation" (false — DMA is
conduct regulation) corrected, Apple opt-out 96% re-attributed Lotame→Flurry; immigration-wage
Card/Borjas Mariel dispute represented precisely, CBO GDP figures corrected; homeschooling
Ray-2010 "persists across income" claim reversed (sample 92% white/64% college-degree), Cardus
voting claim flipped (homeschool grads vote *less* locally); foreign-aid Mozambique tuna-bond
corrected ($1B→~$2B, were commercial loans not aid); global-housing first-time-buyer-low
re-dated 2023→2022, Airbnb "15-30% rent" → ~1.9% avg (García-López). Weights de-inflated
throughout where reliability rested on advocacy sources or unverifiable figures.

## Iteration 3 (2026-06-16) — coverage 73% → 83%
Hardened 12 zero-coverage maps (1 web-agent each): inflation-monetary-policy, mandatory-voting,
media-bias-democracy, meritocracy-myth, nuclear-renaissance-smr, open-borders, organic-food-health,
police-reform, psychedelics-mental-health, remote-work-permanence, reparations-slavery,
return-to-office-productivity. 106 evidence items moved 0→verified URL.
Notable corrections beyond URL backfill (factual errors caught): psychedelics FDA vote was
**2-9 against efficacy** (file said "9-2 against approval" — inverted); inflation Bernanke-Blanchard
**side flipped** (NBER WP 31417 found supply shocks, not labor tightness, drove the 2021 surge — was
coded "for" demand-driven); reparations Fed wealth-gap figures corrected ($171K/$17.1K/10:1 → 2022 SCF
~$285K/$45K/~6.3:1); RTO-productivity fabricated claims stripped (Envoy "2.3x with 10yr leases" and a
phantom "12 companies 33-50% top-quartile" replaced with the real SSRN Brain-Drain paper); police-reform
US-vs-Australia gap corrected (~4x, not "30-60x"), Rialto body-cam result caveated with null DC RCT;
mandatory-voting "OECD Democracy Index" (doesn't exist) → EIU index, two journals mis-cited fixed;
meritocracy legacy-admissions "45% boost/160 SAT pts" unverifiable → real Chetty 2023 (top-1% ~5x);
remote-work Google/Meta "5-day mandate" false (were 3-day hybrid); media-bias Reuters "trust down from
44%" false (stable 40%). Many weights de-inflated; one RTO item left URL-less + low-weight (no source found).
