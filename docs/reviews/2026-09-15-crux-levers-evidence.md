# Crux levers behind off-by-default flags: harness evidence (2026-09-15)

Status: decision support for the founder. Nothing in the served product changes. Every lever below is behind a flag that defaults off, and the flags-off output of the engine, the recall harness, and the fixture eval is byte-identical to the code before this work (proof in §7). The crux formula and the engine's order are untouched by any flag; lever A and B change two inputs the memo already simulated, and filter C only chooses which already-ranked items the report presents.

Governing constraints: `docs/CRUX_ENGINE.md` ("do not modify the crux formula") and the V2 spec ("do not let an LLM choose or reorder cruxes"). Source memo: `docs/reviews/2026-09-14-crux-recall-diagnosis.md`, recommendations F6 and F4a (§4, §6 item 4). Reviewer findings on the wrong crux: `docs/reviews/2026-09-15-v2-checkpoint-evidence/sonnet-sources-run1-part1.md` "Systematic issues" #1, and part 2.

## 1. What was built

| Flag (env var) | Options key | What it does when on |
|---|---|---|
| `CRUX_LEVER_REDUNDANCY_CLAIMS_ONLY` | `redundancyClaimsOnly` | Lever A (memo F6). The redundancy penalty's Jaccard overlap is taken over affected downstream **claims** only; positions are dropped from both sets. Two leaf claims that reach the same two positions and no shared claim overlap 0 instead of up to 1. |
| `CRUX_LEVER_POSITION_AWARE_REACH` | `positionAwareReach` | Lever B (memo F4a). Direct reach becomes `max(R, min(1, Σ|δ_pos| over affected positions / number of positions))`, applied before scoping inheritance so a gate inherits the lifted value. |
| `CRUX_PROJECTION_SKIP_UNCONTESTED` | `projectionSkipUncontested` | Filter C. When `projectReport.ts` walks the engine's ranked list to pick the cruxes to present, it skips a claim that is (i) explicit common ground in the report (statement match, exact or ≥80% of each side's content words) or (ii) undisputed: no participant disputes it, it opposes no position, and no claim contradicts, opposes, or undercuts it in either direction. The next ranked claim is taken instead and a warning names the skipped claim. |

Code: `lib/crux/flags.ts` (flag reading; explicit options always override the environment; only the strings `true` and `1` turn a flag on), `lib/crux/signals.ts` (lever B and the claim-only affected set), `lib/crux/rank.ts` (lever A; `identifyCruxes(graph, { levers })`), `lib/crux/projectionFilter.ts` (filter C predicate), one guarded block in `lib/disagreement/projectReport.ts` (plus an optional `cruxFlags` input so tests need no env), `scripts/validate-crux-recall.ts` (`--levers a,b|off`, env passthrough, and a lever line printed only when a lever is on), and `scripts/crux-lever-projection-diff.ts` (filter C evidence runner; new file, outside the territory list, drop it if unwanted).

Levers A and B reproduce the memo's scratchpad simulation exactly: the top-15 ranking under A, B, and A+B is identical to a verbatim copy of the memo's `sim.ts`/`sim2.ts` scoring on all three flagship graphs (checked 2026-09-15; the memo's script held the scoping bonus fixed while lever B recomputes it from the lifted reach, and that difference does not move any rank).

Tests: `lib/crux/flags.test.ts`, `lib/crux/levers.test.ts` (flags-off snapshot of every flagship top-15 with scores, default-equals-explicit-off, env read and override, unit tests for A and B, and a monotonicity check that B never lowers any candidate's reach), `lib/crux/projectionFilter.test.ts`, `lib/disagreement/projectReport.levers.test.ts` (filter C through the projection and the full pipeline, both reasons, override, flags-off equality), and `parseLeverArgs` cases in `scripts/validate-crux-recall.test.ts`.

## 2. Levers A and B on the pre-registered recall harness

`tsx scripts/validate-crux-recall.ts --levers {off|a|b|a,b}`. Pooled primary set is AI-jobs (4 mapped) plus capitalism (6 mapped); Israel is secondary. Targets are Recall@5 ≥ 0.6 and Recall@10 ≥ 0.8. Every combination exits 1; no combination reaches either target, as the memo predicted.

| Levers | Recall@5 | Recall@10 | Hard gate | Named 1 (c2+c3 top-5) | Named 2 (care top-5) | Named 3 (offshoring top-10) | Named 4 (implicit ranked) | Spearman AI / cap / Israel |
|---|---|---|---|---|---|---|---|---|
| off (today) | 1/10 = 0.100 | 6/10 = 0.600 | PASS ×3 | FAIL (decline 12, definition 4) | FAIL (8) | PASS (10) | PASS (1) | −0.600 / 0.406 / 1.000 |
| A | 0.100 | **0.700** | PASS ×3 | FAIL (decline 8, definition 4) | FAIL (12) | **FAIL (15)** | PASS (1) | 0.400 / 0.406 / 1.000 |
| B | 0.100 | **0.700** | PASS ×3 | FAIL (decline 8, definition 4) | FAIL (9) | **FAIL (11)** | PASS (1) | 0.000 / 0.406 / 1.000 |
| A+B | 0.100 | **0.700** | PASS ×3 | FAIL (decline 8, definition 4) | FAIL (12) | **FAIL (15)** | PASS (1) | 0.400 / 0.406 / 1.000 |

Per topic (recovered at 5 / at 10, of mapped):

| Levers | AI-jobs (primary) | Capitalism (primary) | Israel (secondary) |
|---|---|---|---|
| off | 0/4, 2/4 | 1/6, 4/6 | 2/3, 2/3 |
| A | 0/4, 3/4 | 1/6, 4/6 | 2/3, 2/3 |
| B | 0/4, 3/4 | 1/6, 4/6 | 2/3, 2/3 |
| A+B | 0/4, 3/4 | 1/6, 4/6 | **1/3**, 2/3 |

Rank of each mapped proposition's best claim in the scored top-15 (u = unbounded rank, outside the top-15):

| Proposition | Claim | off | A | B | A+B |
|---|---|---|---|---|---|
| aijobs-p1 | c-decline-caused-by-ai | 12 | 8 | 8 | 8 |
| aijobs-p2 | c-time-horizons-keep-doubling | 14 | 10 | 14 | 10 |
| aijobs-p3 | c-reliability-is-the-threshold | 6 | 6 | 6 | 6 |
| aijobs-p4 | c-care-reallocation-counts-as-adjustment | 8 | 12 | 9 | 12 |
| cap-p1, cap-p2 | c-task-automation-lowers-labor-share | 10 | 9 | 10 | 9 |
| cap-p3 | c-ai-markets-tip-into-durable-oligopoly | 9 | 6 | 8 | 6 |
| cap-p4 | c-demand-collapse-without-recycling | 4 | 4 | 4 | 4 |
| cap-p5 | c-citizens-deserve-ai-rents | u21 | u20 | u21 | u19 |
| cap-p6 | c-high-tax-ubi-still-capitalism | u18 | u16 | u16 | u16 |
| israel-cd2 | c-gaza-death-toll-uncertain | 2 | 2 | 2 | 2 |
| israel-cd4 | c-alliance-obligations-override-complicity | 4 | 4 | 5 | 6 |
| israel-cd5 | c-arms-transfer-review-threshold-gap | u23 | u23 | u23 | u22 |
| named 3 | c-offshoring-rival-explanation | 10 | 15 | 11 | 15 |

Full top-15 rankings with scores for every combination are in the harness output and in `lib/crux/levers.test.ts` (flags-off snapshot).

### Named-test regressions

- **Named test 3 (offshoring rival in the top-10) passes today and fails under every lever combination.** Under A the rival drops from 10 to 15; under B to 11. The memo's table said F6 left the named tests "unchanged"; its `sim2.ts` never computed them, so that entry was not checked. This is the main new finding.
- Named test 2 (care claim top-5) fails today at 8 and is worse under A (12) and A+B (12); B leaves it at 9. The memo already noted that today's redundancy penalty helps the care claim by hurting its competitors more.
- Named test 1 improves from rank 12 to 8 for the causal claim under every combination but still fails.
- A+B additionally drops the secondary Israel set's cd4 from rank 4 to 6, so Israel Recall@5 falls from 2/3 to 1/3.
- Every combination keeps the hard gate (no background claims in a top-5) and named test 4.

Both levers buy the same one extra proposition at 10 (AI-jobs p1 under both; p2 under A, p4 kept under B) at the price of a named test the spec pins. Neither moves Recall@5, exactly as the memo simulated.

## 3. Filter C on the fake fixtures

`CRUX_PROJECTION_SKIP_UNCONTESTED=true tsx scripts/eval-disagreement.ts`: **64/64 pass**, exit 0, and `scripts/crux-lever-projection-diff.ts` finds **no fixture whose presented cruxes change** (0 of 64: the 10 few-shot examples plus 54 files). The fixture extractions wire every claim with a `disputedBy` entry or an opposing stance, so the filter never fires on them. That means the fixture eval cannot distinguish C on from C off; it is not evidence for C either way.

## 4. Filter C replayed on the live reports

The 40 sonnet reports in `.eval-runs/sources-2026-09-15T02-22-03-636Z` (and the 12 opus reports in `.eval-runs/sources-2026-09-15T17-22-48-563Z`) store the report and the argument graph but not the raw extraction. The runner rebuilds the extraction from the two (the graph encodes `disputedBy` as claim status, stances as claim-to-position edges, relations as claim-to-claim edges) and pushes it through the real `projectDisagreementReport`. Faithfulness check: with the flag off, the replayed crux list matched the stored report in **40 of 40** sonnet and **12 of 12** opus reports. One caveat: the common-ground attestation rule (commit 85265fd, 13:41, after the 02:22 run) now drops single-quote common ground in 17 of the 40 replays, so reason (i) rarely fires on replays; the "Ellis is out" case below is caught by reason (ii) instead.

### Sonnet run: 8 of 40 reports change; the primary crux changes in 4

| Report | Primary crux off → on | Other presented cruxes | Skipped (reason) | Reviewer's verdict on the old crux, and whether C answers it |
|---|---|---|---|---|
| causal-model-split-downtown | `c-pricing-lever` ("Does visible disorder confound ...") → `c-cheap-parking-recovery` ("Does the garage-occupancy data or the cross-district recovery comparison better support the causal story?") | 2–3: c-cheap-parking-recovery, c-disorder-confound → c-disorder-confound, c-garage-data | c-pricing-lever: undisputed | Reviewer: primary is a normative claim affecting one position; a human would name the cause question or "the district comparison's validity". **Answered**: the new primary is the comparison's validity. |
| mixed-value-and-empirical (hard-fail candidate) | `c-flagged` ("Is this true: the model flagged 30 candidates") → `c-appeals-after` ("Should the model deploy now with appeals added afterward, or be paused ...") | 2–3: c-appeals-after, c-threshold-question → c-threshold-question, c-empirical-question | c-flagged: undisputed | Reviewer: the headline turns a value dispute on an uncontested figure Bo waves through; the real crux is the threshold question. **Mostly answered**: the uncontested figure leaves the headline; the new primary is the sequencing (procedural) question and the reviewer's threshold question becomes crux 2. |
| sarcasm | `c-40min` (undisputed forty-minutes figure) → `c-payback` (same question, "Do the time savings ... translate into financial payback?") | 2–3: c-payback, c-time-revenue → c-time-revenue, c-travel-work | c-40min: undisputed | Reviewer: right question on the wrong, undisputed claim; the contested claim (c-time-revenue) sat at 3. **Answered**: the figure is gone and c-time-revenue moves to 2. |
| single-empirical-crux-bus-route | `c-measure` (the common-ground metric proposition, procedural) → `c-door-to-door` (same question text) | 2–3: c-door-to-door, c-eight → c-eight, c-fantasy | c-measure, c-old-line: undisputed | Reviewer: primary is the proposition recorded as common ground; the real and only crux (does the line deliver eight minutes measured) sat at 3. **Partly answered**: c-measure and the paper figure are skipped and the real crux moves to 2, but the primary is still the metric question, now on c-door-to-door, which opposes a position and so counts as disputed. Its statement does not reach the 80% match with cg-2's wording. |
| forecast-split | unchanged (`c-back-to-backs`) | 3rd crux c-ellis-out removed | c-ellis-out ("Ellis is out for six weeks."): undisputed | Reviewer: crux 3 is the explicit common ground; primary is attached to an uncontested count rather than the contested c-schedule-soft. **Half answered**: the common-ground crux is gone; the primary stays because c-back-to-backs opposes a position. |
| premise-accepted-conclusion-unchanged | unchanged (`c-still-bogus`, "Is the ranking bogus?") | 3rd crux c-self-selected removed | c-self-selected: explicit common ground | Reviewer: crux 3 is simultaneously cg-1; the primary restates the conclusion. **Half answered**: the common-ground crux is gone (this is the one live report where reason (i) fires); the restatement is not C's target. |
| source-contains-code | unchanged (`c-guard-enough`) | 2–3: c-avoid-network, c-cross-account-leak → c-cross-account-leak, c-tab-scoped | c-avoid-network: undisputed | Reviewer: crux 2 is the undisputed "avoids a network call"; crux 3 (cross-account leak) is what any engineer names. **Half answered**: the undisputed premise is gone and the load-bearing claim moves to 2; the primary (a position restated) stays. |
| same-conclusion-different-reasons | unchanged (`c5`, which the reviewer called exactly right) | 3rd crux c3 → c4 | c3 (Morgan's "regardless of traffic counts" claim): undisputed | Reviewer did not comment on crux 3. Neutral; the skipped claim is a one-sided normative premise. |

Reviewer-named wrong-crux cases that C does **not** change, and why:

| Report | Reviewer's complaint | Why C leaves it |
|---|---|---|
| cumulative-evidence | Primary restates the main question ("Is the dam safe?") | The claim contradicts another claim, so it is contested. Restatement is handled (and deferred) by the existing `restatesMainQuestion` rule, not by C. Here every ranked claim maps to the same restating question, so the deferral still shows it. |
| inferred-position-launch-call, mostly-agreement, anonymous-labels | Primary restates the main question | Same: not C's target. |
| hostile-without-disagreement | Primary "Sam has a bad attitude" is minted from a non-claim | The graph records it as disputed and opposing a position. C cannot see that it is not a claim. |
| claims-with-source-evidence (sonnet) | Crux 3 "62 percent submitted on time" is uncontested | The model wired the figure as opposing the caution position, so under the conservative rule it counts as disputed. (On the opus replay of the same fixture, C does move the primary from the figure to "Does the low participation undermine what the on-time gap shows?", which is the crux the reviewer named.) |
| prompt-injection | All three cruxes are undisputed figures | Every one is wired as opposing the other position. |
| sensitive-identity, priority-tradeoff (crux 2) | Uncontested premise as crux | Recorded as disputed, or wired as opposing a position. |

### Opus run (12 reports): 4 change; the primary crux changes in 3

| Report | Primary crux off → on | Skipped |
|---|---|---|
| claim-stake-prompt-injection | `c-hosp-fell` ("Is this true: Hospitalizations fell forty percent") → `c-mandate-caused` ("Did the mandate cause the forty percent drop, or would hospitalizations have fallen anyway?") | c-hosp-fell, c-treatments-improved (undisputed) |
| claims-with-source-evidence | `c-gap` (the 62 vs 48 figure) → `c-warning` ("Does the low participation (18 of 70) undermine what the on-time gap shows?") | c-gap (undisputed) |
| explicit-update-commitment | `c-threshold` ("worth keeping if evening sales climb above half of daytime") → `c-sales` (same question) | c-threshold (undisputed) |
| different-questions | unchanged; crux 3 c-replacement-pattern → c-risk-language | c-replacement-pattern, c-hottest-blocks (undisputed) |

The first two are the exact cruxes the sonnet reviewers asked for on the same fixtures.

### Sensitivity: a looser "undisputed" rule (not implemented as a flag)

`scripts/crux-lever-projection-diff.ts --loose` re-runs the replay with every opposing stance rewritten as supporting in the extraction handed to the projection, graph and ranking untouched, so "undisputed" reduces to "no participant disputes it and no claim contradicts it". On the sonnet run that changes the primary crux in 13 of 40 and some presented crux in 26 of 40, fixes prompt-injection (primary becomes the schedule-math-versus-least-mobile-riders question), forecast-split (primary moves to the contested c-schedule-soft), bus-route (primary becomes the eight-minute claim), and claims-with-source-evidence, but it also **empties the crux box entirely in 3 reports** (explicit-update-commitment, multiple-speakers-three-positions, multiple-speakers-two-positions) and skips claims such as "If a rank is kept, the feedback becomes decoration" that a position plainly disputes. The extraction records dispute by opposing stance far more often than by `disputedBy`; a rule that ignores the stance removes most of the report's material. Rejected as a flag; recorded here so the trade is visible.

## 5. Recommendation per flag

| Flag | Recommendation | Effect if turned on | Risk |
|---|---|---|---|
| Lever A `CRUX_LEVER_REDUNDANCY_CLAIMS_ONLY` | **Keep off.** | Recall@10 0.60 → 0.70 (AI-jobs p1 12→8, p2 14→10); Recall@5 unchanged; Spearman on AI-jobs −0.60 → 0.40. | Fails named test 3 (offshoring rival 10 → 15), which passes today, and pushes the care claim from 8 to 12. The memo's "named tests unchanged" for F6 was unverified and is wrong. Adopting it means amending the spec's acceptance test 3, which the spec wrote to protect thin-evidence rivals. |
| Lever B `CRUX_LEVER_POSITION_AWARE_REACH` | **Keep off; the least harmful engine lever if one must be chosen.** | Recall@10 0.60 → 0.70 (p1 12→8, care 8→9); Recall@5 unchanged; never lowers any candidate's reach (tested on all three graphs). | Fails named test 3 by one place (offshoring 10 → 11), as the memo said. Spearman on AI-jobs goes to 0.00. Trades the offshoring rival for the causal claim. |
| A+B | **Keep off.** | Same pooled numbers as A alone. | Inherits A's regressions and additionally drops Israel cd4 from rank 4 to 6. |
| Filter C `CRUX_PROJECTION_SKIP_UNCONTESTED` | **Candidate to turn on after founder review of the 8 sonnet diffs above.** It is the only lever that touches a reviewer-named failure, and it changes presentation only. | On the 40 live sonnet reports: fixes 3 reviewer-named primaries outright (mixed-value hard-fail candidate, causal-downtown, sarcasm), removes 4 flagged uncontested or common-ground cruxes from slots 2–3, never empties a crux box, changes nothing on the 64 fixtures. On the 12 opus reports: fixes 2 more reviewer-named primaries. Leaves the restatement family (cumulative-evidence and three others) and the "minted non-claim" case (hostile) untouched. | A skipped claim is replaced by the next engine-ranked claim, which is sometimes a mirror or a weaker sibling (bus-route's c-door-to-door). The conservative rule under-fires when the model wires an accepted fact as "opposes" (claims-with-source on sonnet, prompt-injection). The warning text lands in the quality block, which the public UI does not render. It does not re-rank, so it cannot violate the "no reordering" rule, but it does mean the presented list is no longer the engine's literal top-3, which `docs/CRUX_ENGINE.md` should record if adopted. |

Suggested order if anything is adopted: C first (presentation only, reviewer-visible gains), then decide on the recall design questions in the memo (§6) before any engine lever, because every engine lever measured here fails a named test the harness currently passes.

## 6. Reproduction

```
./node_modules/.bin/tsx scripts/validate-crux-recall.ts                # flags off, exit 1, identical to 2026-09-14 output
./node_modules/.bin/tsx scripts/validate-crux-recall.ts --levers a     # or b, a,b, off
CRUX_LEVER_POSITION_AWARE_REACH=true ./node_modules/.bin/tsx scripts/validate-crux-recall.ts   # env passthrough, same as --levers b
./node_modules/.bin/tsx scripts/eval-disagreement.ts                   # 64/64
CRUX_PROJECTION_SKIP_UNCONTESTED=true ./node_modules/.bin/tsx scripts/eval-disagreement.ts     # 64/64, no fixture changes
./node_modules/.bin/tsx scripts/crux-lever-projection-diff.ts [--loose] [--run .eval-runs/sources-2026-09-15T17-22-48-563Z]
```

## 7. Gates (run 2026-09-15 after all changes, flags off)

| Gate | Result |
|---|---|
| `tsx scripts/validate-crux-recall.ts` | exit 1 (as before); output byte-identical to the pre-change run (`diff` clean), and `--levers off` and the bare run are identical |
| `tsx scripts/eval-disagreement.ts` | exit 0, 64/64; output byte-identical to the pre-change run |
| `vitest run lib/crux lib/disagreement scripts` | 28 files, 278 tests, all pass (exit 0) |
| `tsc --noEmit` | exit 0 |
| `eslint . --max-warnings=0` | exit 0 |

Flags-off identity is also pinned by `lib/crux/levers.test.ts`, which snapshots every flagship top-15 with scores and asserts the default equals explicit-off, and by `lib/disagreement/projectReport.levers.test.ts`, which asserts a flags-off report equals a report with levers explicitly off.
