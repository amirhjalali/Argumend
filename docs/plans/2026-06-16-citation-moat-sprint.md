# Citation Moat Sprint — autonomous, parallel, ~18h budget deploy

Date: 2026-06-16. Goal: deploy the remaining token budget on the single highest-leverage token-bound work — making all 114 maps **trustworthy and LLM-citable** — plus launch-cluster maps, anti-regression infra, and a launch dossier. Run maximally parallel; auto-apply web-verified edits; verify + commit + **push** per batch.

## Why this (strategic)
Per `docs/plans/2026-05-19-comprehensive-plan.md` §3/§18, the compounding distribution mechanism is being a trustworthy, **LLM-citable** reference work. Verification found fabricated cites, missing URLs, overstated claims. A map a gatekeeper will share — or an LLM will cite — must be bulletproof. So: harden the corpus first.

## Execution model (each loop iteration)
1. `bun scripts/citation-coverage.ts` → current overall % + worst topics.
2. Take the worst ~8–10 topics with <85% coverage. Dispatch **1 web-enabled agent per topic** (file-partitioned → no conflicts), each: for every evidence item, WebSearch/WebFetch the real primary source, add a verified `sourceUrl`, correct the `source`/title/numbers to match, de-inflate weights based on mis-attribution, fix any mis-cite found. **Only web-verified edits.** Never fabricate a URL — if none found, make `source` honest + lower weight.
3. `./node_modules/.bin/tsc --noEmit` clean + `vitest run` 206 pass + `bun scripts/regen-summaries.ts`.
4. `git add -A && git commit && git push origin main`. Append to `docs/reviews/SPRINT-CHANGELOG.md`.
5. ScheduleWakeup (short delay) → repeat.

## Workstreams (interleave; WS1 leads)
- **WS1 — Citation Integrity (all 114).** Backfill/verify every evidence `sourceUrl`. Metric: overall coverage. **Baseline 56% (641/1136). Target ≥90%.**
- **WS2 — Adversarial Strengthening.** Per map (worst-flagged + AI/rationalist cluster first): steelman both sides harder, add the missing strong evidence/cruxes the `docs/reviews/` flagged, rebalance. Re-verify sources for anything added.
- **WS3 — Launch Cluster.** Build/upgrade 6–10 bulletproof maps in the AI-safety/rationalist cluster (ai-superintelligence-timeline, ai-risk, ai-regulation, open-weight-ai-models, consciousness-ai-systems[done], + alignment/related). Every item web-sourced.
- **WS4 — Anti-regression infra.** (a) a vitest that fails if coverage drops below a ratchet threshold; (b) expand `/llms.txt` with hardened key facts; (c) per-topic extractable "key facts" block for AEO. Build the coverage ratchet once WS1 ≥85%.
- **WS5 — Launch dossier + changelog.** Consolidate the hardened launch map + `docs/drafts/` into a founder launch pack; maintain `SPRINT-CHANGELOG.md`.

## Guardrails
- Web-verified edits ONLY. Conservative: when a check is inconclusive, leave + annotate, don't guess.
- tsc + 206 tests green every batch; per-batch commit+push (reversible).
- Don't assert post-cutoff (2026) facts as verified in the forward-looking new topics — fix citation hygiene only.
- Keep `as const` + schema shape; regen summaries when evidence/weights change.

## Loop state (update each wake)
- **2026-06-16 start:** coverage 56%. Infra: `scripts/citation-coverage.ts` live. Next: WS1 batch over worst-coverage topics.
