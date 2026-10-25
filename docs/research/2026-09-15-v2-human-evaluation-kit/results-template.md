# Results: V2 human evaluation (fill in)

| Field | Value |
|---|---|
| Study dates | |
| Build under test (commit) | |
| Provider lane / model id | |
| Sessions run / counted toward the twelve / no-report sessions | |
| Pilot sessions (not counted) | |
| Known-defect fixes in the build (D2, D3, D4 landed? y/n each) | |

## Thresholds (spec §16.4, verbatim) at n = 12

| # | Threshold | Needed | Observed (primary readings) | PASS / FAIL | Secondary readings (supplementary) |
|---|---|---|---|---|---|
| T1 | At least 80% rate position representation Accurate or Mostly accurate. | 10 of 12 | __ of 12 | | n/a |
| T2 | At least 75% identify the selected crux as genuinely central. | 9 of 12 | __ of 12 | | __ of __ |
| T3 | Fewer than 10% mistakenly believe source-only mode independently fact-checked the claims after readi[ng the report] | 1 or fewer of 12 | __ of 12 (Not sure: __) | | n/a |
| T4 | No repeated material straw-man pattern. | 0 repeats | material flags: __ ; repeats: __ | | included in count |
| T5 | At least half say the report revealed a distinction they had not initially articulated. | 6 of 12 | __ of 12 | | n/a |
| T6 | At least one-third say they would plausibly share a strong report. | 4 of 12 | __ of 12 (would send this one: __) | | __ of __ |

**Overall: PASS only if all six pass.** Result: ______

## Per-source breakdown

| Source | Primary readers | Leans (PRE-2) | T1 pass | T2 pass | Key-match SAME / ADJ / DIFF (all readings) | T5 pass | Material flags | Pattern shown |
|---|---|---|---|---|---|---|---|---|
| 01 empirical | 3 | | | | | | | |
| 02 priority | 2 | | | | | | | |
| 03 definitional | 2 | | | | | | | |
| 04 mixed | 3 | | | | | | | |
| 05 control | 2 | | | | | | | |

Notes on the control: did any report on 05 fabricate a large divide? Did the audit strip show
more shared premises than disputed questions?

## Crux diagnostic

Key-match across all readings (primary + secondary, up to 24): SAME __ / ADJACENT __ / DIFFERENT __.

Of the T2 passes, how many had a PRE-3 question that already matched the key (reader arrived with
the crux) versus did not (the page supplied it)? __ / __. If most T2 passes came from readers who
already had the crux, T2 is measuring the readers, not the engine; say so.

Repeatability: for any source analyzed by more than one participant, did the primary crux text
differ between runs? List the distinct crux questions seen per source.

## Verbatims that changed a decision

Quote the verbatims (participant code, source ID, question) that moved a decision: a threshold
call, a defect diagnosis, or the go/no-go. One or two sentences on what each changed. This is the
section the north star asked for ("capture verbatim responses") and the one the baseline lacked.

- P__, 0_, Q_: "..." — changed: ...

## Report-level defects observed

Tags from the checkpoint README (`docs/reviews/2026-09-15-v2-checkpoint-evidence/README.md`),
so these merge with the reviewer evidence. Count = number of reports (out of up to 24) where the
defect was visible.

| Tag | Name | Reports affected | Sources affected | Example (source, verbatim from the report) | Did a participant notice it unprompted? |
|---|---|---|---|---|---|
| D1 | crux-not-load-bearing | | | | |
| D2 | primary-type-mismatch | | | | |
| D3 | pattern-mismatch | | | | |
| D4 | placeholder-resolution | | | | |
| D5 | common-ground-unsupported | | | | |
| D6 | participantless-stake | | | | |
| D7 | reply-line-as-commitment | | | | |
| D8 | identical-branches | | | | |
| Other | | | | | |

## Path observations (from the tick boxes)

| Behaviour | Count of 12 primary readings |
|---|---|
| Expanded a position card | |
| Opened Show source basis | |
| Read the crux section | |
| Reached the caveat block | |
| Stopped before the crux | |
| Scrolled back up after the crux | |

Spec §22 "After PR 5" asks whether the payoff is visible before methodology; "stopped before the
crux" is the number that answers it.

## PR 5 checkpoint (founder, five sources, 390 px)

| Source | Payoff before methodology | Feels like a product | Crux memorable | Caveat visible without killing curiosity | Share object worth sharing | One line |
|---|---|---|---|---|---|---|
| 01 | | | | | | |
| 02 | | | | | | |
| 03 | | | | | | |
| 04 | | | | | | |
| 05 | | | | | | |

## Decision

One of:

- **PASS. PR 9 unblocked.** All six thresholds passed on the twelve primary readings. Remaining
  defects logged above go to the backlog, not the gate.
- **FAIL on T_.** The shared failure is: ______. Next cycle goes to that failure. Re-run with at
  least six fresh participants after the fix, same protocol, same five sources unless a source was
  the problem.
- **INVALID.** Fewer than twelve counted sessions, or the build changed mid-study. State why and
  when the re-run is.

Signed off (date): ______
