# Crux-recall gate failure: diagnosis memo (2026-09-14)

Status: diagnosis only. No source, test, data, or engine file was changed. The crux formula in `lib/crux/**` stays untuned pending founder review, as `docs/CRUX_ENGINE.md` requires. Simulations below were run on a scratchpad copy of the scoring logic that reproduces `identifyCruxes` output exactly (verified identical on all three graphs) and were never applied to the repo.

Inputs read: `docs/CRUX_ENGINE.md`, `lib/crux/{influence,propagate,signals,rank}.ts`, `scripts/validate-crux-recall.ts`, `data/evals/crux-recall/flagship-propositions.json`, the three draft graphs, `docs/plans/2026-08-12-argumentgraph-north-star.md`, `docs/research/2026-08-11-crux-proposals/proposal-c-content-grounded.md` §6 (the original pre-registration), `docs/research/2026-08-11-flagship-graph-validation.md`, `docs/reviews/2026-08-12-three-flagship-audit.md`, and the research corpora's proposition lists.

## Summary

1. The engine is not mis-weighted; it is doing what the spec says, and the spec's definition of a crux (deep counterfactual leverage, gating, hidden assumptions) systematically disagrees with the human proposition lists, which are explicit, position-facing claims that sit at the leaves of the graph.
2. Two engine mechanisms explain 5 of the 9 primary misses: a gate always outranks the claims it gates (scoping inheritance plus the S bonus), and reach normalization gives position-adjacent claims R of 0.05 to 0.13 versus 0.4 to 0.6 for upstream hub assumptions.
3. Three misses (cap-p5, cap-p6, and secondary israel-cd5) are authoring gaps, not engine faults: normative and procedural claims are wired only to the positions that assert them, so discrimination D collapses to 0.2 or 0.4. The fix is adding `opposes` edges, which the spec says must be human-approved.
4. The answer key is not the pre-registered one. Proposal C pre-registered ten AI-jobs propositions scored per sub-question (one top-5 per research report). The harness scores one top-5 per whole topic against 4 AI-jobs propositions chosen by mapping convenience plus 6 capitalism propositions, three of which have questionable derived mappings. With 6 propositions competing for 5 slots and 2 to 3 slots reserved by design for implicit or definitional cruxes, 0.6 is approximately the ceiling, not a target.
5. No single fix, and no combination simulated, reaches Recall@5 0.6. The best observed is 0.3 at 5 and 0.7 at 10, and that requires revising the derived mappings. The founder's decision is therefore primarily about the validation design (key, slot budget, what counts as recovery), and only secondarily about two candidate engine changes.

## 1. Harness output (verbatim, run 2026-09-14 with `./node_modules/.bin/tsx scripts/validate-crux-recall.ts`)

```
=== Crux-engine pre-registered validation ===

ai-mass-unemployment [primary] — 4 mapped propositions
  Recall@5: 0/4  Recall@10(+misses beyond): 2/4
  MISS aijobs-p1: none of [c-decline-caused-by-ai] in top-15
  MISS aijobs-p2: none of [c-time-horizons-keep-doubling] in top-15
  Hard gate (no uncontested/broadly_accepted claims in top-5): PASS
  Named test named-2-normative-survives: FAIL (rank 8)
  Named test named-3-offshoring-top10: PASS (rank 10)
  Named test named-4-implicit-assumption-ranked: PASS (rank 1)

capitalism-after-ai [primary] — 6 mapped propositions
  Recall@5: 1/6  Recall@10(+misses beyond): 3/6
  MISS cap-p5: none of [c-citizens-deserve-ai-rents] in top-15
  MISS cap-p6: none of [c-high-tax-ubi-still-capitalism] in top-15
  Hard gate (no uncontested/broadly_accepted claims in top-5): PASS

us-israel-support [secondary] — 3 mapped propositions
  Recall@5: 2/3  Recall@10(+misses beyond): 0/3
  MISS israel-cd5: none of [c-arms-transfer-review-threshold-gap, c-review-process-should-match-other-states] in top-15
  Hard gate (no uncontested/broadly_accepted claims in top-5): PASS

=== Pooled primary recall ===
  Recall@5:  1/10 = 0.100  (target >= 0.6)
  Recall@10: 6/10 = 0.600  (target >= 0.8)
  RECALL@5 BELOW PRE-REGISTERED THRESHOLD
  RECALL@10 BELOW PRE-REGISTERED THRESHOLD

RESULT: FAIL
```

Harness nit: the `MISS ... in top-15` message is misleading. The harness scores top-10; `c-decline-caused-by-ai` is at rank 12 and `c-time-horizons-keep-doubling` at rank 14 in the top-15 list it computes. Named test 1 from the spec (`c2` and `c3` both top-5) is not encoded in the harness at all; on the full graph it currently fails (`c-decline-caused-by-ai` rank 12, `c-mass-unemployment-definition-strict` rank 4).

## 2. Per-proposition trace

Score = I × (0.30·C + 0.20·R + 0.35·D + 0.05·T) + 0.15·S. "Base rank" is the order before the redundancy penalty; "rank" is the harness's final rank at its limit of 15. Reach normalizer is 0.15 × claim count (8.1 for AI-jobs with 54 claims, 6.0 for capitalism with 40, 6.3 for Israel with 42).

### AI mass unemployment (31 candidates, 4 positions)

| Prop | Claim | Rank (base) | C | R | D | T | S | Why it lands there | Who outranks it and why |
|---|---|---|---|---|---|---|---|---|---|
| aijobs-p1 | c-decline-caused-by-ai | 12 (11) | 0.571 | 0.052 | 1.0 | 1.0 | 0 | Downstream set is just two positions (+0.30, −0.12). Base 0.582, cut to 0.446 by a 0.667 overlap with c-offshoring-rival-explanation. | Its own two gates: c-firms-cut-hiring-not-output (#1, implicit; its S of 0.607 is derived entirely from c-decline's mass) and c-mass-unemployment-definition-strict (#4, S 1.0). Also two pure-inheritance gates (#5, #6) and three hub claims with R 0.41 to 0.51. |
| aijobs-p2 | c-time-horizons-keep-doubling | 14 (13) | 0.5 | 0.062 | 1.0 | 0.9 | 0 | Base 0.557, cut 35% to 0.362: its affected set {p-displacement-now, p-automation-panic-redux} is identical to c-decline's, so Jaccard overlap is 1.0. | Its two qualifiers c-insider-forecasts-discounted (#5) and c-reliability-is-the-threshold (#6). Both have zero direct reach and zero direct discrimination; their entire R and D are inherited from c-time-horizons, plus S 0.581 on top. |
| aijobs-p3 | c-reliability-is-the-threshold | 6 (7) | 0.5 | 0.062* | 1.0* | 0.9 | 0.581 | Pure scoping beneficiary (*inherited). Misses top-5 by 0.005 to c-insider-forecasts-discounted, which is the T difference between existing-evidence (1.0) and future-observable (0.9). | Recovered at 10. |
| aijobs-p4 | c-care-reallocation-counts-as-adjustment | 8 (15) | 0.5 | 0.045 | 1.0 | 0.65 | 0 | Lowest R of any D=1 claim in the graph. T costs it 0.0175 against an existing-evidence claim; its gap to slot 5 is 0.17. Named test 2 fails on reach, not on the T-band. | Same population as above. Redundancy penalties on others actually lift it from base 15 to final 8. |

Top-6 composition: #1 implicit gate, #2 gate (c-targeted-programs-can-help, whose S 0.783 comes from qualifying the implicit retraining assumption), #3 implicit, #4 definitional gate, #5 and #6 gates with zero direct reach. No explicit, position-facing empirical claim is in the top 6.

### Capitalism after AI (26 candidates, 4 positions)

| Prop | Claim(s) | Rank (base) | C | R | D | T | S | Why | Who outranks it |
|---|---|---|---|---|---|---|---|---|---|
| cap-p1 | c-labor-share-declining-us | never a candidate | — | — | — | — | — | Status is broadly_accepted, so excluded at candidacy by design. The proposition ("AI is already reducing labor share materially") has no carrier claim that asserts the causal attribution. | — |
| cap-p1, cap-p2 | c-task-automation-lowers-labor-share | 10 (8) | 0.5 | 0.455 | 1.0 | 0.7 | 0 | Base 0.626 cut to 0.462 by 0.75 overlap with c-ai-ownership-stays-concentrated. Missing `resolution` costs 0.015. | Two implicit hubs (#1, #2), the definitional gate (#3), and three leaf claims with C 0.875 (both have opposing in-edges). |
| cap-p2 | c-wages-plummet-under-agi-scenario | 17 (17) | 0.5 | 0.133 | 0.4 | 0.7 | 0 | Supports two positions with the same sign, opposes none, so D is 0.4. A consequence claim, not the substitution claim itself. | Everything with D=1. |
| cap-p3 | c-ai-markets-tip-into-durable-oligopoly | 9 (10) | 0.643 | 0.129 | 1.0 | 0.9 | 0 | Downstream is two positions only. Base 0.614 cut to 0.470 by 0.667 overlap with c-demand-collapse. | Its gate c-survival-definition-contested (#3, S 1.0 for gating three claims) and the hub claims. |
| cap-p4 | c-demand-collapse-without-recycling | 4 (5) | 0.875 | 0.235 | 1.0 | 0.9 | 0 | Recovered. High C because it has real opposition in-edges. | — |
| cap-p5 | c-citizens-deserve-ai-rents | 21 (22) | 0.5 | 0.097 | 0.2 | 0.7 | 0 | Reaches one position only (p-breaks-fundamentally +0.58). No position opposes it in the graph. Simulated `opposes → p-adapts-as-always` gives D=1 and base 0.574, but base rank is still 16 because R stays 0.195. | Everything. |
| cap-p6 | c-high-tax-ubi-still-capitalism | 16 (16) | 0.5 | 0.118 | 0.4 | 0.8 | 0 | p-definitional-skeptic +0.56 and p-requires-restructuring +0.14, same sign. p-breaks-fundamentally's rejection of it is not encoded. Simulated `opposes → p-breaks-fundamentally` gives base 0.584 and rank 7. | c-survival-definition-contested (#3) carries the same definitional dispute at the criterion level. |

### U.S.-Israel support (secondary, 26 candidates)

| Prop | Claim(s) | Rank | D | Notes |
|---|---|---|---|---|
| israel-cd2 | c-gaza-death-toll-uncertain | 2 | 1.0 (inherited) | Zero direct reach; ranks entirely through gating both casualty-composition claims. |
| israel-cd4 | c-alliance-obligations-override-complicity | 4 | 1.0 | Recovered. |
| israel-cd5 | c-arms-transfer-review-threshold-gap / c-review-process-should-match-other-states | 23 / 26 | 0.4 / 0.2 | Both support p-conditional-leverage and p-enforce-existing-law only; nothing opposes them. Same one-sided wiring as cap-p5 and cap-p6. Simulated `opposes → p-maintain-support` lifts the first to rank 12. |
| israel-cd1, cd3, cd6, cd7 | unmapped | — | — | Four of seven core disagreements have no carrier claim in the graph. |

## 3. Mechanisms, ranked by explanatory power

### M1. The validation design does not match the pre-registration, and its ceiling is near the target

- Proposal C §6 (the source of the spec's acceptance section) pre-registered ground truth from the AI-jobs corpus: about 28 propositions, 10 primary from "the two explicit end-of-report lists", scored "pooled per sub-question", where a sub-question is a research report (the "theory sub-question" in named test 1). That means one top-5 per report, roughly 20 to 30 slots for 10 primary propositions.
- The harness instead scores one top-5 per whole topic. Its AI-jobs primary set is 4 propositions drawn from four different report lists (a, c, c, h; those lists hold 5, 5, 4, and 5 propositions), selected because they happen to carry verbatim `sourceRef` mappings. Capitalism's list of 6 is the only intact "end-of-report list" in the key, and capitalism's research postdates the pre-registration.
- Slot arithmetic: capitalism has 6 propositions for 5 slots (ceiling 5/6). The engine is required by named test 4 and by the spec's design to surface implicit assumptions, and by named test 1 to surface definitional gates; those are never in explicit human lists. In practice they hold 2 to 3 of 5 slots in every topic (AI-jobs: implicit #1, #3, definitional #4; capitalism: implicit #1, #2, definitional #3; Israel: implicit #1, #5). Leaving 2 explicit slots per topic gives a realistic ceiling of 4/10, and even a perfect explicit ranking with 3 free slots per topic gives 6/10, which is the target.
- Diagnostic runs: removing implicit claims from candidacy entirely (not a proposed fix) only raises Recall@5 to 0.2. Counting a proposition as recovered if its claim, a claim that gates it, or a claim it gates ranks ("crux-family recall") gives 0.4 at 5 and 0.8 at 10. So the design mismatch is the largest single factor but does not explain everything.
- The Spearman rank-correlation sanity check from the pre-registration was never implemented.

### M2. A gate always outranks what it gates (explains aijobs-p1, aijobs-p2, cap-p3, and the near-miss aijobs-p3)

`signals.ts` sets a gate's R and D to the max of its own and every gated claim's, then adds 0.15·S on top. The gated claim gets nothing back. So for any `qualifies` or `depends_on` pair of candidates, the gate weakly dominates on R and D and strictly dominates on S; the gated claim can only win on C or T. Then, because selection is greedy in base-score order, the gate is picked first and the gated claim can be penalized for overlapping with it (though in practice gates with zero direct reach have empty affected sets and are immune both ways).

Consequences on the AI-jobs graph: 4 of the top 6 are gates. Two of them, c-insider-forecasts-discounted and c-reliability-is-the-threshold, have zero direct reach and zero direct discrimination; every point of their score other than C and T is inherited from c-time-horizons-keep-doubling, which they push to rank 14. The number 1 crux's S bonus is derived entirely from c-decline-caused-by-ai's mass, and c-decline itself lands at 12. The spec's own worked example expected c2 (the gated causal claim) and c3 (the gate) both in the top 5; the 12-node unit test passes because there are no competing hubs, and the full graph breaks it.

This is the spec's tracked failure mode 2 ("topology reflects authoring choices, hub-wiring inflates R/D") showing up through the `qualifies` edge specifically: seven candidate-to-candidate `qualifies` edges exist in the AI-jobs graph, and the spec treats every one as a definitional-style gate, which is the intended design ("detector is structural, not epistemicType-gated").

### M3. Reach normalization favors upstream hubs over position-facing claims (explains aijobs-p1, p2, p4, cap-p3, cap-p5)

R = Σ|δ| over downstream claims and positions ÷ (0.15 × claim count). The human propositions are mostly wired directly to positions with no downstream claims, so their R is 0.045 to 0.13. Implicit assumptions sit upstream of chains and score 0.41 to 0.59. Position deltas are counted the same as claim deltas, so a claim that moves two positions by 0.3 each scores far below one that nudges eight intermediate claims. The 2026-08-11 validation note already flagged that "low absolute reach values suggest the reach calibration constant is tight for about 100-node graphs" and said relative ranking was unaffected; it is affected, because it decides which of the 15 D=1 claims win.

### M4. One-sided position wiring collapses D (explains cap-p5, cap-p6, israel-cd5, and cap-p2's first mapping)

The graphs wire normative, definitional, and procedural claims only to the positions that assert them. No position `opposes` them, so the counterfactual never moves a position negatively and D falls to 0.4 (two positions, same sign) or 0.2 (one position), a loss of 0.21 to 0.28 points that nothing else can recover. This is an authoring gap, and per the spec (LLM call site 4) missing-edge suggestions are proposals only and never auto-applied. Candidate edges, all of which read as obviously true of the positions as written:

- c-citizens-deserve-ai-rents `opposes` p-adapts-as-always
- c-high-tax-ubi-still-capitalism `opposes` p-breaks-fundamentally
- c-wages-plummet-under-agi-scenario `opposes` p-adapts-as-always
- c-arms-transfer-review-threshold-gap `opposes` p-maintain-support
- c-review-process-should-match-other-states `opposes` p-maintain-support

Simulated together, they lift cap-p6 to rank 7 and israel-cd5 to rank 12, but cap-p5 stays outside the top 15 because of M3 (R 0.195 even with D=1). They also drop c-task-automation-lowers-labor-share from 10 to 11, so applied alone they lower Recall@10 from 0.6 to 0.4.

### M5. Redundancy penalty over position-only affected sets (explains aijobs-p2's fall from 13 to 14 and part of aijobs-p1)

`rank.ts` computes Jaccard overlap over affected sets thresholded at |δ| > 0.1. For leaf claims the set is two positions, so any other claim touching the same two positions overlaps 0.5 to 1.0 and costs up to 35%. Hubs with eight affected claims get small Jaccard. c-time-horizons loses 35% (identical set to c-decline), c-decline 23%, c-offshoring 23%. Simulations: turning the penalty off lowers Recall@10 to 0.5 (c-care-reallocation falls to 15, because the penalty currently hurts its competitors more than it); computing overlap over affected claims only (positions excluded) raises Recall@10 to 0.7 with no change at 5.

### M6. Signal saturation (context, not a fix target)

D is 1.0 for 15 of 31 AI-jobs candidates, 12 of 26 capitalism, 20 of 26 Israel. C is exactly 0.500 for 24, 21, and 21 candidates respectively, because most contested claims have no incoming support or opposition edges and the balance term is zero. So 65% of the weight vector is constant across the contest and the ranking inside the top 15 is decided by R (0.20), S (0.15), the implicit multiplier, and T (0.05). This is why M2, M3, and M5 dominate; changing the weight vector would not add information.

### M7. What is not the cause

- The T-band. c-care-reallocation loses 0.0175 to tractability and 0.17 to reach. The spec's claim that a named-test-2 failure "localizes to the T-band" does not hold on this graph.
- Evidence count. It is not in the score, as designed. The offshoring rival (thin evidence) reaches rank 10.
- Missing `resolution` fields on c-task-automation-lowers-labor-share, c-wages-plummet-under-agi-scenario, c-citizens-deserve-ai-rents (T 0.7). Cost 0.01 to 0.015 each; worth filling but immaterial.

## 4. Candidate fixes with simulated effects

All effects simulated in the scratchpad against the current key unless noted. Baseline is 0.10 / 0.60. Named tests: N2 = care claim top-5, N3 = offshoring top-10, N4 = implicit assumption ranked, N1 = spec's c2+c3 top-5 (not in harness; evaluated by hand).

| Fix | Kind | Recall@5 | Recall@10 | Named tests | Risk |
|---|---|---|---|---|---|
| F1 Redundancy penalty off (ρ=0) | engine | 0.10 | 0.50 | N2 fails at 15 | Duplicate cruxes; makes things worse. Reject. |
| F2 Exempt gate/gated pairs from redundancy | engine | 0.10 | 0.60 | unchanged | No effect: zero-reach gates have empty affected sets. |
| F3a Gate inherits R and D at 0.8 instead of 1.0 | engine | 0.20 | 0.60 | N4 rank 2; N1 breaks (c-mass-unemployment-definition-strict falls to 7) | Demotes the definitional cruxes the spec exists to protect. |
| F3b Gate gets S only, no R/D inheritance | engine | 0.20 | 0.60 | N2 passes (4), N3 passes (3), N4 rank 15; N1 breaks; Israel's death-toll crux falls out of top-5 | Same as above, harder. Forbidden by acceptance test 1 as written. |
| F4a Position-aware reach: R = max(R, Σ|δ_pos| / n_positions) | engine | 0.10 | 0.70 | N3 fails at 11 | Small; trades offshoring for time-horizons. |
| F4b Blend R = 0.5·R + 0.5·Σ|δ_pos|/n_pos | engine | 0.10 | 0.40 | — | Worse. Reject. |
| F5 D for same-sign two-position reach 0.4 → 0.7 | engine | 0.10 | 0.60 | unchanged | Weakens the fork definition for nothing. Reject. |
| F6 Redundancy overlap over affected claims only | engine | 0.10 | 0.70 | unchanged | Mild; two position-only claims could both appear. Cheapest defensible engine change. |
| T1 Add the five `opposes` edges in M4 | authoring | 0.10 | 0.40 alone; 0.60 with F2+F4a | unchanged | Needs human sign-off per spec. Lifts cap-p6 to 7, israel-cd5 to 12. |
| K1 Revise derived mappings (cap-p1 add c-labor-share-measurement-disputed and drop the broadly_accepted claim; cap-p2 add c-ai-task-generality-breaks-analogy and c-reallocation-keeps-pace; cap-p6 add c-survival-definition-contested) | key | 0.30 | 0.70 | unchanged | Legitimate only if the founder agrees these claims carry the propositions; it is not tuning to pass. |
| C4 F2+F3a+F4a+T1 | mixed | 0.20 | 0.60 | N1 breaks | — |
| C5 F2+F4a+T1+K1 | mixed | 0.30 | 0.70 | N3 fails at 11 | Best engine+authoring+key combination found. |
| C7 T1+K1, engine untouched | authoring+key | 0.30 | 0.60 | unchanged | — |
| M2 Crux-family recall (scoring rule, not a fix) | metric | 0.40 | 0.80 | — | Counts a proposition as found if its gate or gated claim ranks. Passes Recall@10, not Recall@5. |

Nothing simulated reaches 0.6 at 5. Every engine-side lever that moves Recall@5 does so by demoting definitional gates, which the spec forbids.

## 5. Is the answer key the problem?

Partly, and in three distinct ways.

1. **Not the pre-registered set.** See M1. The primary pool should be either rebuilt as pre-registered (ten AI-jobs propositions from two report lists, scored per sub-question) or the thresholds should be re-derived for the per-topic slot budget actually in use. Scoring per sub-question would need either per-report subgraphs or a sub-question tag on claims, which the model currently lacks (ARGUMENT_MODEL says sub-questions are claims).
2. **Derived mappings in capitalism.** cap-p1's first claim is broadly_accepted and can never rank; the graph has no claim asserting that AI is *already* causing the labor-share decline, so the honest options are "unmapped" or authoring the missing claim. cap-p2 ("frontier AI will substitute for most economically valuable labor") is mapped to a wage-consequence claim and a labor-share claim while c-ai-task-generality-breaks-analogy (rank 6) and the implicit c-reallocation-keeps-pace (rank 2) state the substitution dispute more directly. cap-p6 ("still capitalism") is mapped only to the applied claim; c-survival-definition-contested (rank 3) is the same dispute at the criterion level and is what the engine, by design, prefers.
3. **Selection by convenience.** The four AI-jobs propositions are correct verbatim mappings, but they are 4 of 19 explicit list items, chosen because they had `sourceRef`s. Two other list items that the engine ranks high are absent from the key: a-empirical-record #2 ("fewer workers or more output?") is c-firms-cut-hiring-not-output at rank 1, and g-timeline #1 (the 10% U-3 definition) is c-mass-unemployment-definition-strict at rank 4. A key built from the full lists would score differently in both directions.

The Israel set shows the encoding-gap rate: 4 of 7 core disagreements have no carrier claim. That is a graph-completeness finding, independent of the engine.

## 6. Decisions for the founder

1. **Validation design.** Choose one: (a) rebuild the key as pre-registered (AI-jobs, ten primary from two report lists, per-sub-question top-5), which requires sub-question tagging; (b) keep per-topic scoring and re-derive thresholds for a 5-slot budget shared with implicit and definitional cruxes (for example Recall@5 ≥ 0.4 and Recall@10 ≥ 0.8, or crux-family recall); (c) keep the harness as is and record the engine as failing. Recommendation: (b) with crux-family recall as a secondary metric, and add the pre-registered Spearman check.
2. **Derived mappings.** Approve or reject the three K1 revisions and decide whether cap-p1 becomes "unmapped" or gets a new carrier claim.
3. **Authoring fixes.** Approve or reject the five `opposes` edges in M4; fill the missing `resolution` fields; decide whether to author carrier claims for the four unmapped Israel disagreements.
4. **Engine changes, if any.** In priority order: F6 (redundancy over claims only), then F4a (position-aware reach). Both are small, neither demotes definitional gates, together they move Recall@10 to 0.7 and leave Recall@5 alone. Do not adopt F3a/F3b without first amending acceptance test 1, because they trade the definitional crux for the causal one.
5. **Named test 1.** Add it to the harness; it is in the spec, currently fails on the full graph (c-decline rank 12), and its failure is explained by M2 and M3, not by scoping being "mis-tuned".
6. **Harness message.** Change "in top-15" to "in top-10" in the miss line.

## Appendix: reproduction

Scratchpad scripts (not in the repo): `dump.ts` prints every candidate's C, R, D, T, S, gates, and position deltas per topic; `sim.ts` and `sim2.ts` reimplement `identifyCruxes` (verified identical output) and run the variants in section 4. Outputs are in `dump-output.txt`, `sim-output.txt`, and `sim2-output.txt` alongside them under the session scratchpad directory.
