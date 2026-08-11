# Flagship graph: first validation + crux run (2026-08-11)

`data/topics/drafts/ai-mass-unemployment.draft.json` — 101 nodes (1 question, 4 positions, 45 claims, 6 inferences, 40 evidence + 5 derived), 122 edges. Drafted by Sonnet from the six-report research corpus; wiring completed on resume; normalized (evidence/inference `statement` aliasing, question into `nodes`, one attribution-rule reword) and validated.

## Validation result

- Schema: **pass**. Graph validation: **0 errors**, 37 warnings (36 are the atomicity conjunction heuristic firing on comparative statements — the documented false-positive mode; 1 same-polarity evidence-density note on the early-career-decline claim, which `statusBasis` already addresses).
- Every evidence node wired (40 `evidences`, 10 `undercuts`, 4 `limits_scope`); all four positions carry support and opposition with distinct supporting sets; the forbidden supports/depends_on pair appears nowhere.

## First real crux-engine output

| rank | claim | score | notes |
|---|---|---|---|
| 1 | `c-firms-cut-hiring-not-output` | 0.835 | **implicit assumption**, D=1.0, boosted |
| 2 | `c-mass-unemployment-definition-strict` | 0.714 | **definitional**, via scoping propagation |
| 3 | `c-insider-forecasts-discounted` | 0.674 | source-credibility crux |
| 4 | `c-reliability-is-the-threshold` | 0.669 | the P50/P80 interpretive crux |
| 5 | `c-displaced-workers-can-retrain-costlessly` | 0.652 | **implicit assumption** |

All five flagged **evidence-starved** — consistent with the theory (cruxes are contested precisely where evidence is thin), and also a signal that the draft concentrates its `evidences` edges on broadly-accepted premise claims rather than on the contested layer.

## Calibration findings (recorded, not silently tuned)

1. **Acceptance-test divergence:** the pre-registered expectation (CRUX_ENGINE.md, named test 1 analog) was that the causal-attribution claim (`c-decline-caused-by-ai`) ranks top-5. It does not. Likely mechanism: it `depends_on` the #1 implicit assumption, so scoping propagation hands the assumption its reach/discrimination, and the redundancy penalty then demotes the dependent claim whose affected set overlaps. Defensible ("the assumption under the headline dispute IS the deeper crux") but a real divergence to revisit when tuning against human judgment. The unit-level acceptance tests on the spec's worked example still pass.
2. The normative care-adjustment claim (`c-care-reallocation-counts-as-adjustment`) also lands outside top-5 on the full graph (named test 2 analog). Same review queue.
3. Low absolute reach values (R 0.12–0.30) suggest the reach calibration constant is tight for ~100-node graphs; relative ranking is unaffected.

Disposition: findings go to the Wave-5 adversarial QA + a future calibration pass with human rankings; per the engine's own design, weight-vector tuning is NOT the first lever (scoping/redundancy interaction is).
