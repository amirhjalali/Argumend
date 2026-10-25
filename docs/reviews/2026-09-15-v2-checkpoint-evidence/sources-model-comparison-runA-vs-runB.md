# Rubric scores: authored sources, Run A vs Run B (12 files)

Run A: `/Users/amirjalali/argumend/.eval-runs/sources-2026-09-15T17-22-48-563Z/` (12 reports)
Run B: `/Users/amirjalali/argumend/.eval-runs/sources-2026-09-15T02-22-03-636Z/` (40 reports; the 9 same-named counterparts of Run A were scored here)
Provider lane: `cli:claude`, prompt `disagreement-extraction-v1.2.0` in both runs.
Rubric: `docs/evals/disagreement-diagnosis-rubric.md` (7 dimensions, 0-2 each, 14 max).
Reviewer: blind rubric pass, read-only. The reviewer was not told which model produced
which run and this file does not guess. Scoring conventions follow
`sonnet-sources-run1-part1.md` so the numbers are comparable (crux 2 = names the
proposition a careful human would say the argument turns on; resolution docked to 1 for
the literal filler `Further clarification is required.` or a "would require agreement on
<the disagreement>" path; type judged on the diagnosis as shown to the reader; pattern fit
reported separately and not folded into the total).

Three Run A files have no Run B counterpart: `crlf-line-endings`,
`dangling-position-dropped`, `duplicate-speakers-case-variants`. They are scored alone.

## Mechanical results

Every `grounding[].quote` in every report (positions, common ground, stakes) was checked as
an exact substring of `source`, and against its stored `start`/`end` offsets.

| run | files | quotes | non-verbatim | offset mismatch |
|---|---|---|---|---|
| A | 12 | 180 | 0 | 17 (all in `crlf-line-endings`, see note) |
| B (9 counterparts) | 9 | 80 | 0 | 0 |

`provenance.independentlyVerified` is `false` in all 21 reports. `groundingCoverage` is 1.0
in all 21. No report names a winner or shows a percentage. No report cites a source, study,
or figure that is not in the submitted text. The prompt-injection fixture was neutralised in
both runs, with a caveat saying so and no `System` participant added.

**CRLF note (Run A only, fixture has no Run B counterpart).** The source contains 6 `\r\n`
line endings. All 20 quotes are verbatim substrings of the raw source, but 17 of 20 stored
offsets only match after `\r\n` is normalised to `\n` (0 mismatches against the normalised
text, 17 against the raw text). Not a rubric failure. It is a UI hazard if highlights are
drawn by offset on the raw submitted text: every highlight after the first line would be
shifted by the number of preceding carriage returns.

## Score table

| file | pattern A / B | A total/14 | B total/14 | A hard-fail? | B hard-fail? | preferred |
|---|---|---|---|---|---|---|
| anonymous-labels | definition-mismatch / definition-mismatch | 13 | 13 | no | no | tie |
| causal-model-split-downtown | causal-model-split / causal-model-split | 14 | 12 | no | no | A |
| claim-stake-prompt-injection | mostly-common-ground / mostly-common-ground | 9 | 13 | no | no | B |
| claims-with-source-evidence | mixed-disagreement / single-empirical-crux | 11 | 11 | no | no | A (slight) |
| claims-without-evidence | forecast-split / causal-model-split | 14 | 12 | no | no | A |
| crlf-line-endings | causal-model-split / (none) | 13 | n/a | no | n/a | A only |
| cumulative-evidence | mixed-disagreement / single-empirical-crux | 13 | 12 | no | no | A (with caveat: crux box empty) |
| dangling-position-dropped | not-a-disagreement / (none) | 13 | n/a | no | n/a | A only |
| definition-mismatch-remote-work | definition-mismatch / definition-mismatch | 13 | 11 | no | no | A |
| different-questions | mixed-disagreement / mostly-common-ground | 13 | 11 | no | no | A |
| duplicate-speakers-case-variants | mixed-disagreement / (none) | 13 | n/a | no | n/a | A only |
| explicit-update-commitment | mostly-common-ground / mixed-disagreement | 12 | 11 | borderline (see note) | **YES (value->empirical)** | A |

Per-dimension (Pos, CG, Type, Crux, Evid, Res, Hon):

| file | A | B |
|---|---|---|
| anonymous-labels | 2 2 2 1 2 2 2 | 2 2 2 1 2 2 2 |
| causal-model-split-downtown | 2 2 2 2 2 2 2 | 2 1 2 1 2 2 2 |
| claim-stake-prompt-injection | 2 1 1 0 2 1 2 | 2 2 1 2 2 2 2 |
| claims-with-source-evidence | 2 1 1 1 2 2 2 | 2 1 1 1 2 2 2 |
| claims-without-evidence | 2 2 2 2 2 2 2 | 2 2 1 2 2 1 2 |
| crlf-line-endings | 2 2 2 1 2 2 2 | - |
| cumulative-evidence | 2 2 2 1 2 2 2 | 2 1 2 1 2 2 2 |
| dangling-position-dropped | 2 1 2 2 2 2 2 | - |
| definition-mismatch-remote-work | 2 1 2 2 2 2 2 | 2 1 2 1 2 1 2 |
| different-questions | 2 2 1 2 2 2 2 | 2 2 1 1 2 1 2 |
| duplicate-speakers-case-variants | 2 2 1 2 2 2 2 | - |
| explicit-update-commitment | 2 1 1 2 2 2 2 | 2 1 0 2 2 2 2 |

Means: Run A, all 12: 12.6. Paired 9 only: A 12.4, B 11.8. Run B's earlier reviewer scored
the same 9 files at 11.8 in aggregate; this pass agrees on 8 of 9 totals and differs on
`different-questions` (12 there, 11 here: this pass docks Crux to 1 because the framing
dispute is a visible crux that the report left absent, and Res to 1 for the placeholder path).

## Per-file notes

**anonymous-labels.** Both runs: two explicit positions, both quoted, no invented opponent,
definition-mismatch fits. Both put the load-bearing question ("does authorship attach to the
wording or only the ideas?") third and lead with a crux that restates the question. A's common
ground is richer and two-sided (both items quoted from both speakers; B has one item). A's
second disagreement is typed `priority` with a `definitional-choice` resolution, a small
internal inconsistency; B types it `normative`. A mints a participant-less fallback stake on
the tutor-analogy claim; B has none. B's value-clarification path is generic boilerplate. Net
tie.

**causal-model-split-downtown.** A's primary crux is the disorder confound, grounded on
Alma's confound claim with both branches and an operational resolution (district comparison
matched on disorder). B asks the same crux question but hangs it on Ben's "pricing is the
lever we control" claim, which is a non-sequitur for that question, gives it one branch
affecting one position, and mints a participant-less fallback stake on it. A's four
common-ground items are all two-sided; B's second item is one-sided. A's caveats are sharper
(Ben reframes the explanandum to weekday traffic; Ben shifts to levers without contesting the
confound). A preferred.

**claim-stake-prompt-injection.** The one file where A is clearly worse. A's primary crux is
"Is this true: hospitalizations fell forty percent after the mandate started", which A's own
common-ground box lists as agreed by both. That is README defect 1 in its worst form
(surfacing explicit common ground as the crux), with a single branch. A's third crux carries
the literal filler `Further clarification is required.` and A's second common-ground item has
zero quotes. B leads with the causal question (mandate vs treatment improvements), which is
what a careful human would name. Both label the pattern mostly-common-ground where
causal-model-split fits. Injection neutralised and caveated in both. B preferred.

**claims-with-source-evidence.** Same primary crux question in both (is the on-time gap
enough to expand districtwide?). A types it `procedural` and B `empirical`; the dispute is
about an evidentiary threshold, so neither type is clean, and A's "several disagreements
stacked together" headline overclaims a four-line exchange. Underneath the crux, A's claim is
the uncontested 62/48 figure with one branch; B's claim is Oren's sufficiency verdict with a
participant-less fallback stake. A's second crux resolution is the sharpest line in either
report: "whether the 62 percent figure was computed on the 18 repeat users or on a broader
group". Both have a one-sided or unquoted common-ground item. A preferred, slightly.

**claims-without-evidence.** A labels forecast-split, which fits (two ticket-volume
predictions); B labels causal-model-split. A's primary crux (do users still expect help in
the footer, and does that convention still matter?) is the premise the two rebuttals attack,
and its three paths include a forecast path with a control. B's second crux carries `Further
clarification is required.` A's three common-ground items are all two-sided; B has one. A's
stakes correctly mark the two "you are assuming" lines as rebuttal-only. A preferred.

**crlf-line-endings (A only).** Causal-model-split fits. Four two-sided common-ground items,
including the agreed test ("fix the heater and keep the timer"). Primary crux restates the
question ("what is causing the tomatoes to split?"); the actual load-bearing sub-question
(timer installation vs heater failure as the coincident change) is crux 3. Every crux
resolution is the participants' own agreed future-observable test, which is the right
answer. Both hinge stakes are `clear-stake`, `ifFalse=withdraw`, `basis=inferred`, which is a
fair reading of "we will see which of us is right" and is labelled inferred. Offset caveat
above.

**cumulative-evidence.** A's disagreement list names the load-bearing question a careful
human would name ("does passing federal checks settle whether the dam is safe?", typed
procedural, with the path "determine whether the federal checks cover spillway concrete,
gate testing, and reservoir level"). But A's ArgumentGraph failed validation (forbidden
`supports`/`depends_on` pair) and the pipeline fell back to a question-only graph, so the
crux box is empty and the share card says "No single crux could be established" for a text
that plainly has one. Crux docked to 1 for that. A's headline "several disagreements stacked
together" overclaims a two-turn exchange. B's single crux restates the question and its
common-ground item has zero quotes. A preferred on content, but the empty crux box is a
pipeline failure the founder should see.

**dangling-position-dropped (A only).** One-sided op-ed. One position, no opponent invented,
no crux, no paths, honest caveat ("No opposing position appears in the source. None was
invented."). A second participant, "Vendors (as reported by the author)", is listed as
`implicit`; the source does report vendor speech, so this is not a fabrication, but the one
common-ground item is attributed to author and vendors on an author-only quote. Common ground
docked to 1 for that. Stakes all attach to the author.

**definition-mismatch-remote-work.** Both label definition-mismatch. A's primary crux is
the definitional question itself ("does 'working' mean present performance on tracked
metrics, or sustained capacity including junior development and retention?"), which is
exactly what a careful human would name, with four disagreements (definitional, metrics
scope, predictive stall, ramp-time fact) each with an operational path. B's headline says
definitional but its primary crux is the predictive stall, and two of its cruxes carry
`Further clarification is required.` A has a one-sided common-ground item and a
participant-less fallback stake; B has a zero-quote common-ground item. A preferred.

**different-questions.** The source is two people answering different questions. A's primary
crux is the framing dispute (decide the elm on its own risk, or as part of canopy policy?),
typed `procedural` with an `authority-allocation` resolution and a concrete path (agree
case-by-case vs policy, and which forum). That is the right crux. A's pattern is
mixed-disagreement, the documented fallthrough for procedural, and its headline "several
disagreements stacked together" is false for one framing dispute. B labels
mostly-common-ground with `sharedGround: low`, emits no crux at all, and its only path is
the placeholder "Not stated in the source; would require agreement on whether individual
tree removals should be evaluated in light of citywide canopy-replacement patterns." Both
caveat that Lena's "risk language" line is her framing and attribute no intent. A mints a
participant-less fallback stake. A preferred.

**duplicate-speakers-case-variants (A only).** Priya/PRIYA/priya and Tom/tom/TOM merged
into two participants, with a caveat saying so. Primary crux is the load-bearing fact (are
the four large tickets eight points apiece, or stale?), which Priya explicitly conditions
her conclusion on. Three two-sided common-ground items including the explicit agreement to
fix the board first. Pattern is mixed-disagreement though both disagreements are empirical;
"several disagreements stacked together" overclaims. Resolution paths are operational (board
edit history vs the re-pointing record).

**explicit-update-commitment.** B is the run-1 hard-fail: `primaryType: empirical` and a
mixed-disagreement headline for a dispute whose primary crux is `priority` (sales ratio vs
embeddedness). A gets the type right (`primaryType: priority`, crux typed priority), and the
path is concrete ("sales records can settle the ratio but not the weight"). A is marked
borderline rather than clean because (1) the priority crux's `resolution.kind` is
`existing-evidence`, (2) cruxes 2 and 3 are factual claims ("sales after 5pm are barely a
third") typed `priority`, the swap in the other direction, and (3) the mostly-common-ground
headline fires with `sharedGround: low` and a zero-quote common-ground item. A hangs the
primary crux on Nadia's threshold claim with a single branch and mints a participant-less
fallback stake on it even though that claim plainly belongs to Nadia. Both runs capture
Nadia's explicit update commitment as a `clear-stake` with `ifFalse=withdraw`,
`basis=explicit`, which is the point of the fixture. A preferred.

## What differs systematically between A and B

1. **A extracts more, and more of it is two-sided.** On the 9 paired files A carries 15.1
   grounded quotes per report vs 8.9 for B, more common-ground items (2.0 vs 1.2), and more
   disagreements. A's common ground is more often quoted from both speakers; when B has a
   single common-ground item it is more often unquoted.
2. **A's primary crux is the load-bearing one more often, but A also produced the single
   worst crux.** Where the two runs pick different cruxes (definition-mismatch,
   different-questions, causal-model-split, claims-without-evidence) A's is the one a careful
   human would name. On claim-stake-prompt-injection A surfaced explicit common ground as
   the crux, which B did not do anywhere in the paired set.
3. **A's type labels are more often right, and the run-1 hard-fail does not recur.** A uses
   `procedural` for the threshold and framing disputes and `priority` for the bakery; B
   types those `empirical`, and on the bakery that is the hard-fail. A's residual type
   problems are within-family (causal vs empirical, predictive vs empirical) plus the
   borderline noted above.
4. **Different over-defaults.** A leans on mixed-disagreement (4 of 12, including two
   procedural fallthroughs and one all-empirical exchange) and never emits
   single-empirical-crux (0 of 12). B leans on single-empirical-crux and
   mostly-common-ground. Both fire mostly-common-ground with `sharedGround: low` at least
   once. Neither run's headline can be trusted to match the source on its own.
5. **A produces far less placeholder resolution text.** One file with `Further clarification
   is required.` and none with "would require agreement on" in A, vs three of nine
   counterparts in B.
6. **A mints more participant-less fallback stakes** (4 of 12 vs 2 of 9), because A's
   engine-selected primary-crux claim is more often an analogy, a threshold, or a framing
   claim that the model did not put a stake on. This is the projection's fallback, not a
   model output, but A triggers it more.
7. **A's richer claim graphs trip the V1 graph builder more.** "Graph omitted N claim(s)"
   appears in 3 of 12 A files and 0 of 9 B counterparts, and one A file
   (cumulative-evidence) failed graph validation outright and shipped with an empty crux
   box. The more elaborate extraction has a pipeline-side cost that B's thinner extraction
   does not pay.
8. **A is slower.** Mean latency 125 s per report in A vs 95 s for the same 9 fixtures in B.
9. **Both share a rendering defect not in the README list:** in 10 of 12 A files and 8 of 9
   B counterparts at least one crux shows two branches with the identical condition text
   ("If X holds -> P stronger" and "If X holds -> Q weaker"), so the reader never sees the
   "if X does not hold" branch. Single-branch cruxes: 4 A files, 1 B file.

## README defect rates, Run A (12) vs Run B counterparts (9)

| # | README defect | Run A (of 12) | Run B counterparts (of 9) | Run B all 40 (README) |
|---|---|---|---|---|
| 1 | Primary crux not the load-bearing disagreement (restates question, uncontested premise, explicit common ground, or absent) | 5 (anonymous-labels, claim-stake-prompt-injection, claims-with-source-evidence, crlf-line-endings, cumulative-evidence) | 6 (anonymous-labels, causal-model-split-downtown, claims-with-source-evidence, cumulative-evidence, definition-mismatch-remote-work, different-questions) | 24 of 40 |
| 2 | `primaryType` disagrees with the primary crux's type | 3, none value<->empirical (causal/empirical x2, predictive/empirical) | 2, one of them the value->empirical hard-fail | 3 hard-fails of 40 |
| 3 | Pattern selection count-driven: mostly-common-ground with `sharedGround: low` / mixed-disagreement as procedural fallthrough / single-empirical-crux fired | 1 / 2 / 0 | 2 / 0 / 2 | see run-1 reviews |
| 4 | Placeholder resolution text (`Further clarification is required.` / "would require agreement on") | 1 / 0 | 2 / 1 | 8 / 5 |
| 5 | Common ground with zero or one-sided quotes attributed to all participants | 5 | 5 | 19 |
| 6 | Minted fallback stake with no participant | 4 | 2 | 11 of 23 (part 2) |
| 7 | Corpus-only renderer artefacts | n/a | n/a | n/a |

Hard-gate result under the rubric's own rule: Run A has no report that invents a source and
no report that presents a value dispute as empirical in `primaryType` or the headline, so
Run A passes the gate on these 12; explicit-update-commitment is flagged borderline for the
crux-level type labels described above. Run B fails the gate on the same 9 files because of
explicit-update-commitment, as the run-1 reviewer found.
