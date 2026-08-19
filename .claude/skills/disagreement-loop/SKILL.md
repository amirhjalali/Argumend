---
name: disagreement-loop
description: Use when working on Argumend's disagreement diagnosis (the /analyze-v2 paste-to-diagnosis product, lib/disagreement/*, the crux projection, the eval fixtures, or the map-recovery harness) — running the loop without an API key, generating founder-checkpoint reports, or changing anything that shapes a diagnosis report.
---

# Argumend disagreement loop

Governing spec: `docs/plans/2026-08-18-argumend-v2-disagreement-diagnosis-spec.md`.
Operating guide: `docs/DISAGREEMENT_LOOP.md`. Read the spec section you are
touching before changing behavior; it is the plan of record, not a suggestion.

## The product in one line

Paste a disagreement, get six boxes: positions, common ground, disagreement
types, the crux, evidence state, resolution paths. **Source-only** — it analyzes
the submitted text and never claims to have verified the world.

## Invariants that must never break

These are product integrity rules, not preferences. A change that violates one
is wrong even if every test passes.

- No winner, no rationality score, no agreement percentage.
- Never fabricate a participant, position, source, quote, or concession. A
  one-sided article has one position; do not invent an opponent for symmetry.
- Never infer motive or sensitive traits (politics, religion, ethnicity, health,
  immigration status, criminality, good or bad faith).
- Every quote shown must be a verbatim substring of the submitted source.
- Every inferred position is labelled inferred.
- `provenance.independentlyVerified` stays `false` in source-only mode.
- Never silently fall back to the offline parser after a live-model failure.
- Never persist or log the submitted source. Schema issue *paths* are loggable;
  content is not.
- The crux comes from the deterministic engine (`identifyCruxes`), never from
  whatever the model called most important, and is never pinned by the model.

## Running it without an API key

The founder's standing directive is **do not externalize** — no
`ANTHROPIC_API_KEY`. Use the local subscription lane:

```bash
# Fixture eval, deterministic, no model, seconds
./node_modules/.bin/tsx scripts/eval-disagreement.ts

# The loop against our own topic maps, on the subscription
./node_modules/.bin/tsx scripts/disagreement/run-corpus.ts --provider cli --model sonnet --timeout 900

# One map
./node_modules/.bin/tsx scripts/disagreement/run-corpus.ts --provider cli --only capitalism-after-ai

# Widen to the legacy three-pillar topics (weaker ground truth), bounded
./node_modules/.bin/tsx scripts/disagreement/run-corpus.ts --provider cli --include-legacy --limit 15
```

Output lands in `.eval-runs/` (gitignored). That is the founder-checkpoint
review material.

Expect **5 to 15 minutes per dense map**. This lane is offline batch only; the
provider refuses to run when `NODE_ENV=production` because a subprocess per
request is not a serving architecture.

## Map recovery: our maps are the answer key

The flagship ArgumentGraphs already contain steelmanned positions, typed claims,
and engine-selected cruxes. `lib/disagreement/corpus/renderDebate.ts` renders one
as a debate transcript that leaks no map vocabulary (no node ids, no position
labels, no mention of cruxes); the pipeline diagnoses it blind;
`lib/disagreement/corpus/recovery.ts` scores the result against the source map.

**Report the overlap number as a signal, never as accuracy.** Lexical overlap
shows two texts discuss the same subject matter; whether the recovered crux *is*
the map's crux is a human judgement, and the spec keeps that with the founder.

## Gates (there is no `bun` on this machine)

Run each separately and report the real exit code — never chain with `&&` when
reporting status:

```bash
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/eslint . --max-warnings=0
./node_modules/.bin/vitest run
./node_modules/.bin/next build
./node_modules/.bin/tsx scripts/eval-disagreement.ts
```

## Where things live

| Concern | File |
|---|---|
| Report + extraction contracts | `types/disagreement.ts`, `lib/schemas/disagreement.ts` |
| Orchestration | `lib/disagreement/analyze.ts` |
| Model lanes | `lib/disagreement/model/{anthropic,cli,fake}.ts` |
| Quote grounding | `lib/disagreement/grounding.ts` |
| Graph build + crux projection | `lib/disagreement/{buildGraph,projectReport}.ts` |
| Diagnosis pattern selection | `lib/disagreement/diagnosis.ts` |
| Map recovery | `lib/disagreement/corpus/` |
| Fixtures | `data/evals/disagreement/` |

## Known state

- Founder checkpoints (spec §22) are still open: 15 reports reviewed after PR 3,
  5 real disagreements after PR 5, a 12-person test after PR 8. PR 9 (making V2
  the default `/analyze`) is gated on them.
- `INSUFFICIENT_ARGUMENT_STRUCTURE` is defined but never raised. That is
  deliberate: §10.4 prefers returning an honest `insufficient-context` report
  over erroring. Do not "fix" it into a throw.
- `deriveDiagnosis` has no procedural pattern, so procedural disputes surface as
  `mixed-disagreement`. That matches the spec's pattern list.
