# Crux resolution condition fix: a borrowed question borrows its resolution

Status: implemented on `sprint-2026-09-14`, not committed. Resolves "the one tweak worth naming" in `docs/reviews/2026-09-15-crux-filter-c-rescoring.md` and the template-resolution / mismatched-kind findings in `docs/reviews/2026-09-15-v2-checkpoint-evidence/*.md` (sonnet run 1 part 1 item 3, flagship comparison A-vs-B "Type 0" for us-israel crux-2, sources comparison A-vs-B on the priority / definitional-choice pair). No model was called; every number below is a stored extraction replayed through the real `projectDisagreementReport`. Nothing under `lib/crux/**` was touched, and the engine's ranking, the primary crux, and the crux order are unchanged in every replay.

## Root cause

`addCrux` in `lib/disagreement/projectReport.ts` took the crux `question` and `type` from the related disagreement candidate when one listed the ranked claim, but built `resolution` from the claim: `claim.resolution.condition` first, the disagreement's `resolutionCondition` only as a fallback, and `claim.resolution.kind` (or a type default that did not know `priority`, `procedural` or `trust`) as the kind. So a crux could show a priority question above the claim's evidence check, and a weighing question could carry `existing-evidence` (which `deriveResolvability` reads as "high").

## Change

`cruxResolution()` in `lib/disagreement/projectReport.ts`, called from `addCrux` with a `borrowed` flag the selection loop sets when the chosen question is the related disagreement's own question.

- Borrowed question: condition is the disagreement's stated condition, then the claim's, then `RESOLUTION_NOT_STATED`. Kind is the claim's kind when it fits the question's type, else the type's own kind. Fit table: empirical / causal / predictive accept `existing-evidence`, `future-observable`, `source-audit`; normative and priority only `value-difference`; definitional only `definitional-choice`; procedural only `authority-allocation`; trust only `source-audit`.
- Claim's own question ("Is this true: ..."): unchanged behaviour, the claim's condition then the disagreement's then not-stated, and the claim's kind.
- "Stated" still means what `statedResolution` accepts; a "Not stated in the source; would require agreement on ..." condition is not a condition.

Tests added to `lib/disagreement/projectReport.test.ts` (minimal two-claim priority extraction): the borrowed crux takes the disagreement's condition with a `value-difference` kind (failed before the change), falls back to the claim's condition, never gets an evidence-check kind for a priority or normative question (failed before), says not-stated when neither states one, keeps the claim's own resolution when the question is the claim's, and does not change the crux order.

## Replay method

`scripts/crux-lever-projection-diff.ts` reports crux ids and questions only, so the previous reviewer's dumper (`scratchpad/filterC/dump-replays.ts`, the script's live-replay half writing full reports) was run before and after the change on `.eval-runs/sources-2026-09-15T02-22-03-636Z` (40 sonnet) and `.eval-runs/sources-2026-09-15T17-22-48-563Z` (12 opus), flag C off and on. Flag-off replay reproduced the stored crux list in 40/40 and 12/12 both times. The diff compares whole reports with `provenance.generatedAt` removed.

## Summary

| run | flag C | reports byte-identical | reports changed | cruxes changed | condition text changed | kind changed |
|---|---|---|---|---|---|---|
| sonnet (40) | off | 22 | 18 | 18 | 4 | 15 |
| sonnet (40) | on | 21 | 19 | 19 | 4 | 15 |
| opus (12) | off | 2 | 10 | 14 | 13 | 3 |
| opus (12) | on | 2 | 10 | 14 | 13 | 3 |

- In every changed report the only crux field that moved is `resolution`; claim ids, questions, types, branches, why-it-matters and evidence state are byte-equal. Outside the crux list the only field that moved is `diagnosis.resolvability` (table at the end), which derives from the primary crux's kind.
- Every kind change replaces a kind that clashed with the question's type. Per flag pass (off and on give the same counts): priority → `value-difference` 4 (one of them from `definitional-choice`), procedural → `authority-allocation` 11, trust → `source-audit` 3. No evidence question changed kind; the two causal cruxes whose condition is an experiment still to run (`crlf-line-endings`, `sarcasm`) keep `future-observable`.
- Opus condition text changes are the disagreement's fuller condition replacing the claim's narrower one on the same question. Sonnet claims mostly carried no condition, so the disagreement's was already shown; there the fix is the kind.
- Resolvability moved on 8 sonnet and 2 opus reports with flag C off, and 11 sonnet and 1 opus with it on, always downward (high → medium or low), on primaries whose question is a weighing, procedure or trust question. No report's resolvability rose.

**The explicit-update-commitment regression (opus, flag C on) is resolved.** Primary crux `c-sales`, question "Should the evening shift be judged by its sales relative to daytime or by the embeddedness the evening regulars provide?": resolution "Sales records comparing after-5pm takings with daytime takings." (`existing-evidence`) → "Agree whether embeddedness counts alongside sales and how to weigh it; sales records can settle the ratio but not the weight." (`value-difference`); diagnosis resolvability high → low. With flag C off the same report's primary (`c-threshold`) already showed the disagreement's condition and now carries `value-difference` instead of `existing-evidence`. The sonnet explicit-update-commitment primary ("Should non-sales factors like community embeddedness determine ...", the run-1 hard-fail mechanism) likewise goes `existing-evidence` → `value-difference` under both flags.

No regressions found: no crux lost a stated condition, no condition became the not-stated sentence, no primary or order changed, and the 64 fixtures pass unchanged.

## Not changed, worth naming

- The per-disagreement `resolvability` band on disagreement cards still maps priority, procedural and trust to `existing-evidence` (high). It is the same defect one level up and is outside this change; a `priority` card can now say "high" under a crux whose kind says `value-difference`.
- A crux left with its claim's own "Is this true" question still takes its `type` from the related disagreement (e.g. opus explicit-update crux-2, "Is this true: Sales after 5pm are barely a third", typed `priority` with the claim's `existing-evidence`). The task preserved that path deliberately.

## Gates

| gate | result |
|---|---|
| `./node_modules/.bin/tsx scripts/eval-disagreement.ts` | 64/64 passed, exit 0, no fixture expectation changed |
| `./node_modules/.bin/vitest run lib/disagreement` | 20 files, 218 tests passed, exit 0 |
| `./node_modules/.bin/tsc --noEmit` | exit 0 |
| `./node_modules/.bin/eslint . --max-warnings=0` | exit 0 |

## Full diff table

Every crux whose resolution text or kind changed. "unchanged" in a column means that half did not move.

### sonnet, flag C off (18 cruxes in 18 reports)

| file | crux # | type | old resolution → new | old kind → new |
|---|---|---|---|---|
| definition-mismatch-remote-work | 1 (primary) | predictive | Observing whether output and junior competency hold up over the coming years. → Observing output and junior competency over the coming years. | unchanged |
| explicit-update-commitment | 1 (primary) | priority | unchanged | `existing-evidence` → `value-difference` |
| inferred-position-launch-call | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| long-transcript | 2 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| mixed-value-and-empirical | 2 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| mostly-agreement | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| multiple-speakers-three-positions | 3 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| multiple-speakers-two-positions | 1 (primary) | priority | Participants would need to agree on how to weigh grocery access against traffic and rent harms. → An explicit agreement on how to weigh access benefits against traffic and rent harms. | unchanged |
| normative-position-no-factual-stake | 1 (primary) | normative | The parties would need to agree on how to weigh autonomy against collaboration for this work. → Agreeing on how to weigh autonomy against collaboration for this specific work; the source does not indicate what evidence or criteria would settle this value difference. | unchanged |
| priority-tradeoff | 1 (primary) | priority | unchanged | `existing-evidence` → `value-difference` |
| procedural-disagreement | 2 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| sensitive-identity | 2 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| single-empirical-crux-bus-route | 1 (primary) | procedural | Measured run times from the first month of the reworked line's operation. → Adopting first-month measured run times as the standard of evidence. | `future-observable` → `authority-allocation` |
| source-contains-code | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| source-contains-json | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| source-trust | 1 (primary) | trust | unchanged | `existing-evidence` → `source-audit` |
| trust-split-traffic-study | 1 (primary) | trust | unchanged | `future-observable` → `source-audit` |
| unstated-update-commitment | 1 (primary) | trust | unchanged | `existing-evidence` → `source-audit` |

### sonnet, flag C on (19 cruxes in 19 reports)

| file | crux # | type | old resolution → new | old kind → new |
|---|---|---|---|---|
| definition-mismatch-remote-work | 1 (primary) | predictive | Observing whether output and junior competency hold up over the coming years. → Observing output and junior competency over the coming years. | unchanged |
| explicit-update-commitment | 1 (primary) | priority | unchanged | `existing-evidence` → `value-difference` |
| inferred-position-launch-call | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| long-transcript | 2 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| mixed-value-and-empirical | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| mostly-agreement | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| multiple-speakers-three-positions | 3 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| multiple-speakers-two-positions | 1 (primary) | priority | Participants would need to agree on how to weigh grocery access against traffic and rent harms. → An explicit agreement on how to weigh access benefits against traffic and rent harms. | unchanged |
| normative-position-no-factual-stake | 1 (primary) | normative | The parties would need to agree on how to weigh autonomy against collaboration for this work. → Agreeing on how to weigh autonomy against collaboration for this specific work; the source does not indicate what evidence or criteria would settle this value difference. | unchanged |
| priority-tradeoff | 1 (primary) | priority | unchanged | `existing-evidence` → `value-difference` |
| procedural-disagreement | 2 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| sarcasm | 1 (primary) | causal | Measure actual trip reduction and whether recovered time offsets the cost after purchase. → Track actual trip reduction and any measurable productivity or revenue effect after purchase. | unchanged |
| sensitive-identity | 2 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| single-empirical-crux-bus-route | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| source-contains-code | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| source-contains-json | 1 (primary) | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| source-trust | 1 (primary) | trust | unchanged | `existing-evidence` → `source-audit` |
| trust-split-traffic-study | 1 (primary) | trust | unchanged | `future-observable` → `source-audit` |
| unstated-update-commitment | 1 (primary) | trust | unchanged | `existing-evidence` → `source-audit` |

### opus, flag C off (14 cruxes in 10 reports)

| file | crux # | type | old resolution → new | old kind → new |
|---|---|---|---|---|
| anonymous-labels | 3 | priority | Whether 'authorship' for this assignment refers to the wording, the ideas, or both. → Clarify what the assignment is designed to assess: ideas, wording, or both. | `definitional-choice` → `value-difference` |
| causal-model-split-downtown | 2 | empirical | Day-of-week foot-traffic counts before and after remote work normalized. → Day-of-week commuter and foot-traffic counts compared with pre-remote-work baselines. | unchanged |
| claim-stake-prompt-injection | 2 | causal | Evidence isolating the mandate's effect from other changes over the same period, such as comparable populations without a mandate. → Evidence separating the mandate's effect from treatment improvements, such as hospitalization trends in comparable populations without a mandate or the timing of treatment changes relative to the mandate's start. | unchanged |
| claims-with-source-evidence | 1 (primary) | procedural | The spring report itself, including which students the 62 percent figure covers. → Agree on the evidentiary threshold a districtwide rollout requires, or obtain results from a larger, non-opt-in group. | `existing-evidence` → `authority-allocation` |
| claims-with-source-evidence | 2 | empirical | Whether the 62 percent figure was computed on the 18 repeat users or on a broader group, as stated in the report. → Clarify which students the 62 percent figure covers and whether the gap holds across broader participation. | unchanged |
| claims-without-evidence | 1 (primary) | empirical | Evidence on whether current users still rely on the footer convention. → Data on where current users actually look for help. | unchanged |
| crlf-line-endings | 1 (primary) | causal | Fix the heater and keep the timer; if splitting continues, the watering explanation is supported, and if it stops, it is not. → Fix the heater while keeping the timer and observe whether the splitting continues (supports watering) or stops (supports cold). | unchanged |
| crlf-line-endings | 3 | empirical | Restore heat while keeping the timer and observe whether the splitting stops. → The agreed test separates the two coincident changes by restoring heat while leaving the timer in place. | unchanged |
| definition-mismatch-remote-work | 1 (primary) | definitional | The parties would have to agree whether 'working' refers to present performance or to sustained capacity. → Agree on a stipulated time horizon and set of criteria for 'working' before comparing evidence. | unchanged |
| different-questions | 1 (primary) | procedural | Agreement on whether an individual removal decision is scoped to that tree's hazard or to a canopy policy. → Agree whether removal decisions are made case by case or under a canopy policy, and in which forum the policy question is heard. | unchanged |
| different-questions | 3 | causal | Parks department records of mature-tree removals and the size of replacement plantings. → Records of removals justified by risk assessments, replacement sizes, and canopy change by block, especially the hottest blocks. | unchanged |
| duplicate-speakers-case-variants | 1 (primary) | empirical | Reconcile the board with the record of Monday's re-pointing session. → Correct the board and check it against the Monday re-pointing record; both agree this comes first. | unchanged |
| duplicate-speakers-case-variants | 3 | empirical | Board edit history compared against Priya's written numbers. → Board edit history and the re-pointing session's record or attendees. | unchanged |
| explicit-update-commitment | 1 (primary) | priority | unchanged | `existing-evidence` → `value-difference` |

### opus, flag C on (14 cruxes in 10 reports)

| file | crux # | type | old resolution → new | old kind → new |
|---|---|---|---|---|
| anonymous-labels | 3 | priority | Whether 'authorship' for this assignment refers to the wording, the ideas, or both. → Clarify what the assignment is designed to assess: ideas, wording, or both. | `definitional-choice` → `value-difference` |
| causal-model-split-downtown | 2 | empirical | Day-of-week foot-traffic counts before and after remote work normalized. → Day-of-week commuter and foot-traffic counts compared with pre-remote-work baselines. | unchanged |
| claim-stake-prompt-injection | 1 (primary) | causal | Evidence isolating the mandate's effect from other changes over the same period, such as comparable populations without a mandate. → Evidence separating the mandate's effect from treatment improvements, such as hospitalization trends in comparable populations without a mandate or the timing of treatment changes relative to the mandate's start. | unchanged |
| claims-with-source-evidence | 1 (primary) | empirical | Whether the 62 percent figure was computed on the 18 repeat users or on a broader group, as stated in the report. → Clarify which students the 62 percent figure covers and whether the gap holds across broader participation. | unchanged |
| claims-with-source-evidence | 3 | procedural | unchanged | `existing-evidence` → `authority-allocation` |
| claims-without-evidence | 1 (primary) | empirical | Evidence on whether current users still rely on the footer convention. → Data on where current users actually look for help. | unchanged |
| crlf-line-endings | 1 (primary) | causal | Fix the heater and keep the timer; if splitting continues, the watering explanation is supported, and if it stops, it is not. → Fix the heater while keeping the timer and observe whether the splitting continues (supports watering) or stops (supports cold). | unchanged |
| crlf-line-endings | 3 | empirical | Restore heat while keeping the timer and observe whether the splitting stops. → The agreed test separates the two coincident changes by restoring heat while leaving the timer in place. | unchanged |
| definition-mismatch-remote-work | 1 (primary) | definitional | The parties would have to agree whether 'working' refers to present performance or to sustained capacity. → Agree on a stipulated time horizon and set of criteria for 'working' before comparing evidence. | unchanged |
| different-questions | 1 (primary) | procedural | Agreement on whether an individual removal decision is scoped to that tree's hazard or to a canopy policy. → Agree whether removal decisions are made case by case or under a canopy policy, and in which forum the policy question is heard. | unchanged |
| different-questions | 3 | causal | Records of removals justified by risk assessments, by block, compared with canopy change in the hottest blocks. → Records of removals justified by risk assessments, replacement sizes, and canopy change by block, especially the hottest blocks. | unchanged |
| duplicate-speakers-case-variants | 1 (primary) | empirical | Reconcile the board with the record of Monday's re-pointing session. → Correct the board and check it against the Monday re-pointing record; both agree this comes first. | unchanged |
| duplicate-speakers-case-variants | 3 | empirical | Board edit history compared against Priya's written numbers. → Board edit history and the re-pointing session's record or attendees. | unchanged |
| explicit-update-commitment | 1 (primary) | priority | Sales records comparing after-5pm takings with daytime takings. → Agree whether embeddedness counts alongside sales and how to weigh it; sales records can settle the ratio but not the weight. | `existing-evidence` → `value-difference` |

### Diagnosis resolvability band (derived from the primary crux's kind)

| model | flag C | file | old → new |
|---|---|---|---|
| sonnet | off | explicit-update-commitment | high → low |
| sonnet | off | inferred-position-launch-call | high → medium |
| sonnet | off | mostly-agreement | high → medium |
| sonnet | off | priority-tradeoff | high → low |
| sonnet | off | source-contains-code | high → medium |
| sonnet | off | source-contains-json | high → medium |
| sonnet | off | source-trust | high → medium |
| sonnet | off | unstated-update-commitment | high → medium |
| sonnet | on | explicit-update-commitment | high → low |
| sonnet | on | inferred-position-launch-call | high → medium |
| sonnet | on | mixed-value-and-empirical | high → medium |
| sonnet | on | mostly-agreement | high → medium |
| sonnet | on | priority-tradeoff | high → low |
| sonnet | on | single-empirical-crux-bus-route | high → medium |
| sonnet | on | source-contains-code | high → medium |
| sonnet | on | source-contains-json | high → medium |
| sonnet | on | source-trust | high → medium |
| sonnet | on | unstated-update-commitment | high → medium |
| opus | off | claims-with-source-evidence | high → medium |
| opus | off | explicit-update-commitment | high → low |
| opus | on | explicit-update-commitment | high → low |