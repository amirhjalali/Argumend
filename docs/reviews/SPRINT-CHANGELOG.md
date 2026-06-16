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
