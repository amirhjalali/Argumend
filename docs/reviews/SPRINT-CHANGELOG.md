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
