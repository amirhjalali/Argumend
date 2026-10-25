# Flagship map recovery: run A vs run B (blind, 2026-09-15)

Blind rubric scoring of two live `cli`-lane runs over the same three flagship maps, against
`docs/evals/disagreement-diagnosis-rubric.md` (7 dimensions, 0-2 each, max 14; hard fail on an
invented source or a value/empirical swap). The reviewer was not told which model produced which
run and does not guess here. Model-identifying fields in the JSON were masked before reading.

| Run | Directory | Reports |
|---|---|---|
| A | `.eval-runs/corpus-2026-09-15T17-22-48-928Z/` | capitalism-after-ai, us-israel-support, ai-mass-unemployment |
| B | `.eval-runs/corpus-2026-09-15T02-22-04-608Z/` | same three maps |

The rendered debate source is byte-identical between A and B on all three maps (checked), so every
difference below is the pipeline's, not the renderer's. Map crux = the engine-selected crux claims
recorded in each file's `truth.cruxStatements` (three per map). Overlap numbers from the harness are
not reported here as accuracy, per `docs/DISAGREEMENT_LOOP.md` §2.

## Quote grounding (mechanical check)

Every `quote` field in every report was checked as a verbatim substring of the source and against
its own `start`/`end` offsets.

| Map | Run | Quotes | Non-verbatim | Offset mismatch |
|---|---|---|---|---|
| capitalism-after-ai | A | 32 | 0 | 0 |
| capitalism-after-ai | B | 11 | 0 | 0 |
| us-israel-support | A | 19 | 0 | 0 |
| us-israel-support | B | 7 | 0 | 0 |
| ai-mass-unemployment | A | 29 | 0 | 0 |
| ai-mass-unemployment | B | 16 | 0 | 0 |

No invented sources in any report. `provenance.independentlyVerified` is `false` in all six. No
winner, no rationality score, no agreement percentage anywhere. Every percentage string in the
reports is a figure quoted from the source (41%, 2%, 10%).

## Scores

| Map | Run | Pos | CG | Type | Crux | Evid | Res | Hon | Total /14 | Primary crux vs map crux |
|---|---|---|---|---|---|---|---|---|---|---|
| capitalism-after-ai | A | 2 | 2 | 2 | 1 | 2 | 1 | 2 | **12** | ADJACENT (meta-form of the definitional map crux; affects one position) |
| capitalism-after-ai | B | 2 | 1 | 1 | 2 | 2 | 2 | 2 | **12** | SAME (reabsorption / labor share = map crux 2; concentration = map crux 1 as secondary) |
| us-israel-support | A | 2 | 2 | 0 | 1 | 2 | 1 | 2 | **10** | SAME (Gaza death-toll uncertainty = map crux 2) but uncontested in the source |
| us-israel-support | B | 2 | 1 | 1 | 1 | 2 | 1 | 2 | **10** | DIFFERENT (Tomas's "what is the central question" reframing); map crux 2 as secondary |
| ai-mass-unemployment | A | 2 | 2 | 1 | 2 | 2 | 2 | 2 | **13** | DIFFERENT (what counts as "mass unemployment"); no map crux recovered |
| ai-mass-unemployment | B | 2 | 1 | 1 | 1 | 2 | 1 | 2 | **10** | DIFFERENT (empirical-vs-governance meta question); no map crux recovered |

Hard-gate candidates: one, in A/us-israel (see below). Not declared a run failure by this
reviewer because the crux's `type` label is correct and the matching resolution path is
value-clarification; the swap is in the crux's `resolution.kind`. Founder call.

---

## capitalism-after-ai

Map cruxes: (1) frontier AI ownership stays concentrated [predictive]; (2) displaced workers
re-enter complementary jobs fast enough [predictive]; (3) "survival" depends on which criterion is
used [definitional]. In the rendered debate, crux 2 is Dana's line, crux 1 is Priya's line, crux 3
is stated by Tomas and echoed word-for-word by Dana (narrow) and Priya (broad).

### Run A (12/14)

- **Positions 2.** All four recovered as explicit, one speaker each, two verbatim quotes each. Steelmen stay inside what the speaker said.
- **Common ground 2.** Four items, each with a stated participant subset and per-participant quotes; cg-2 (the word admits two criteria) is attributed to Dana, Priya, Tomas, and the caveat explains that Dana and Priya each state one criterion verbatim. No all-four attribution without support.
- **Type 2.** Headline (definition-mismatch), primaryType (definitional) and insight ("is the dispute mostly definitional") cohere. The only report of six where they do.
- **Crux 1.** Primary crux is "Is the dispute mostly definitional, or substantive?" with `affectedPositionIds: [pos-tomas]` and a single branch. That is Tomas's thesis restated as a question; it moves one position. Cruxes 2 and 3 are the same question twice (restructuring necessary/sufficient) under two claims. Neither map crux 1 nor 2 appears in the crux box, though both appear as disagreements d-labor and d-concentration.
- **Evidence 2.** Nothing invented; all predictive claims marked not independently checked.
- **Resolution 1.** path-4 reads "Depends on the labor-absorption outcome and on which definition of capitalism is stipulated" under the label "Check the evidence". That is a dependency statement, not a path. Paths 1 to 3 are operational.
- **Honesty 2.** Caveats disclose inferred stances, the identical-wording observation, and that no speaker states an update condition.
- **Stakes.** 8 stakes, 5 clear-stake (all `basis: inferred`, each ending "No explicit update stated"), 3 commitment-gap. All carry a participant. No stake built from an "I know the reply" line; the caveat records those lines as anticipated objections with no holder.

Verdict: primary crux ADJACENT to map crux 3 (one level up from it, and single-position). Not a
reasonable primary crux for the debate as rendered because it is one speaker's framing claim; the
definitional criterion question (d-definition, which is map crux 3) was the right candidate and sits
one row below.

### Run B (12/14)

- **Positions 2.** All four recovered, explicit, one quote each.
- **Common ground 1.** Two items, both attributed to all four participants, each with quotes from two. cg-1 is labelled `basis: explicit` although Dana and Tomas are unquoted (README defect 5).
- **Type 1.** Headline says "They are using the same word to mean different things" (definitional) while the insight says the argument turns on reabsorption vs labor share (predictive). Two different "what it turns on" in one box (README mechanism 2).
- **Crux 2.** Primary crux is the reabsorption/labor-share question, predictive, affecting three positions; that is map crux 2. Crux 2 is concentration (map crux 1). Crux 3 repeats the reabsorption claim under the "Is this true:" fallback, so the box shows the same question twice.
- **Evidence 2.**
- **Resolution 2.** Stipulate the definition; observe labor share and reemployment; observe concentration; track UBI scale against the labor-income shortfall. All operational.
- **Honesty 2.**
- **Stakes.** 4 stakes, 0 clear. `stake-reabsorption` (Dana) has `basis: explicit`, `ifFalseEffect: no-change`, `diagnostic: non-load-bearing`, with the consequence "Dana voices the demand-shortfall counterargument ... but states explicitly that she does not think it settles" — the renderer's "I know the reply" line parsed as an explicit commitment (README defect 7). All stakes carry a participant.

Verdict: primary crux SAME as map crux 2, with map crux 1 recovered as secondary. A reasonable crux
for the debate as rendered (three of four speakers take a position on it).

### Preference: B, narrowly

The crux box is the product's centre and B's names the disagreement three speakers actually have,
while A's names one speaker's thesis. Everything around the crux is better in A: coherent headline,
per-participant common ground, five reasoned stakes against B's zero and one misread reply line. If
the engine stopped ranking a single-position claim at the top, A would be the better report.

---

## us-israel-support

Map cruxes: (1) regional stability depends on the current alliance structure [predictive]; (2) the
Gaza direct-death total converged near 71,000 to 73,000 but scale and composition are uncertain
[empirical]; (3) close to half of those killed were combatants [empirical]. In the rendered debate,
cruxes 2 and 3 are single Dana lines nobody answers; crux 1 is a Dana line that Tomas voices as the
reply to his own position.

### Run A (10/14)

- **Positions 2.** All four, explicit, one quote each.
- **Common ground 2.** Five items with correct participant subsets: continue-in-some-form (Dana, Marcus), legal tools govern review (Marcus, Tomas), IHL compliance is a legitimate consideration (Marcus, Priya), notification-gap fact (Marcus, Tomas; both quotes dropped although both speakers state it verbatim). Caveat explicitly refuses to list the Hamas designation as common ground because Priya only voices it as a reply. This is the careful behaviour.
- **Type 0.** Three problems in the user-visible crux/diagnosis fields. (a) Headline "More evidence alone will not settle this" sits above an insight saying the argument turns on the true scale and composition of Gaza deaths, an empirical question. (b) crux-2's question is the normative "Should the U.S. continue, strengthen, condition, or cut?" typed `normative`, but its `resolution.kind` is `future-observable` with condition "whether deterrence against Iran-aligned actors holds". A value question presented as settled by a future observation. **Hard-gate candidate.** (c) crux-3's question is "Does regional stability depend on the alliance?" but its claim and branches are the Hamas-designation claim. Mechanism, from `lib/disagreement/projectReport.ts` `addCrux`: `type` and `question` come from the first disagreement whose `relatedClaimIds` contains the ranked claim, but `resolution.kind` comes from the claim's own `resolution.kind` as the model typed the claim. A normative disagreement that lists a predictive claim inherits that claim's future-observable resolution. This is a projection defect, not a model one; the model typed d-level normative with a value-clarification path.
- **Crux 1.** Primary crux is the death-toll uncertainty, verbatim map crux 2. The report's own disagreement row says "Only Dana addresses this", confidence low, one stance. Nobody in the transcript disputes it, so it is not load-bearing as rendered; it is the echo README defect 7 predicts.
- **Evidence 2.** Figures are quoted, not asserted.
- **Resolution 1.** path-1 is the generic template ("No factual study can determine how these values should be weighted..."); path-3 is "Largely predictive; would require assessing deterrence outcomes" (vague). Paths 2 and 4 are operational.
- **Honesty 2.**
- **Stakes.** 8 stakes, 0 clear, all with participants. None built from a reply line as a commitment; two disagreement rows (d-leverage, d-regional-stability) do use reply lines as a second speaker's stance, which the caveat discloses.

Verdict: primary crux SAME as map crux 2 in wording, but not a reasonable crux for the debate as
rendered (uncontested single line). Map crux 1 appears as crux-3's question with the wrong claim.

### Run B (10/14)

- **Positions 2.** All four, explicit, one quote each.
- **Common ground 1.** Four items, three without any quote. cg-1 ("a live, high-stakes policy question warranting reconsideration", all four) is vacuous. cg-3 (Hamas designation relevant, Dana and Priya) and cg-4 (regional stability relevant, Dana and Tomas) are minted from the "I know the reply" lines of Priya and Tomas, which run A correctly refused. cg-2 has two quotes and is attributed to all four.
- **Type 1.** Headline "More evidence alone will not settle this" over an insight about a definitional framing question; primaryType normative while the primary crux is definitional. crux-3 is a normative question keyed to the uncontested Hamas-designation claim, with branches saying that claim holding makes "cut aid" weaker; its `resolution.kind` stays `value-difference`, so less severe than A's crux-2.
- **Crux 1.** Primary crux is Tomas's reframing ("is the central question aid level or transparency and legal review?"), typed definitional, affecting all four. A genuine fault line (Tomas vs the other three, by inference), but settling it leaves the Dana/Marcus/Priya dispute untouched. crux-2 is map crux 2 under the "Is this true:" fallback.
- **Evidence 2.**
- **Resolution 1.** The generic value-tradeoff template appears twice (paths 1 and 4); path-3 "A framing choice rather than a factual one" is not a path. Path-2 is operational.
- **Honesty 2.**
- **Stakes.** 6 stakes. `stake-primary-crux-fallback` has no participant and no position (README defect 6, "Minted fallback stake for primary crux claim c4" in warnings). Four stakes (Priya/Hamas, Dana/non-compliance, Marcus/access, Tomas/stability) are the four "I know the reply" lines parsed as `basis: explicit`, `ifFalseEffect: no-change`, `diagnostic: overdetermined` (README defect 7). Accountability headline says "The conclusion is supported by multiple independent reasons" for a four-position debate.

Verdict: primary crux DIFFERENT from all three map cruxes; a contested framing question but not a
load-bearing one.

### Preference: B, narrowly, and neither crux box is trustworthy

The reader's entry point is the headline plus the primary crux. B's is coherent (a framing question
is indeed not settled by evidence) and points at something the speakers actually contest. A's
contradicts itself (evidence won't settle it; it turns on an empirical fact) and points at a line
nobody disputes, and its crux-2 carries the resolution-kind swap. Below the crux, A is the better
report on every box: correct common-ground subsets, no participant-less stake, no reply lines read as
commitments. Fix the `resolution.kind` inheritance and the reply-line parsing and the preference
flips to A.

---

## ai-mass-unemployment

Map cruxes: (1) firms respond to AI by cutting hiring rather than expanding output [empirical]; (2)
targeted, employer-linked programs help displaced workers [empirical]; (3) displaced workers can
retrain cheaply relative to productivity gains [empirical]. All three render as single Dana lines that
no other speaker answers, so no blind run can recover them as disagreements; both runs list crux 1 as
a Dana stake and crux 3 in a caveat about Dana's internal tension, and neither puts any of them in the
crux box.

### Run A (13/14)

- **Positions 2.** All four, explicit, two quotes each.
- **Common ground 2.** Six items, each with per-participant quotes and correct subsets (Dana and Marcus on the decline existing; Marcus and Priya on historical precedent and on no headline crisis; Dana, Priya, Tomas on uneven costs; Dana and Tomas on retraining helping, marked low).
- **Type 1.** Headline "They agree on the facts but disagree about what causes them" (causal) over an insight saying it turns on what counts as mass unemployment (definitional). crux-1 is the definitional question paired with Priya's predictive cohort-harm claim and a `future-observable` resolution (same inheritance mechanism as above, definition/empirical rather than value/empirical). crux-3 carries the same question correctly paired with the definition claim and `definitional-choice`.
- **Crux 2.** The definitional question is load-bearing as rendered: Priya defines mass unemployment by U-3 above 10%, Tomas rejects lower-paid reemployment as adjustment, Dana's "crisis" is undefined, and the caveat notes Dana's and Priya's predictions may not conflict until the term is fixed. crux-2 is the contested Dana-vs-Marcus causal question. Docked only for the duplicated question and wrong claim on crux-1, which is charged to Type above.
- **Evidence 2.**
- **Resolution 2.** Decompose the decline against rates, the tech correction and offshoring; track whether new comparably paid tasks appear; watch the 15-year path; stipulate what counts. No template text.
- **Honesty 2.** Caveats: reply lines carry empty participantIds; Dana's undefined "crisis"; Dana's retraining claim in tension with her prediction; Tomas mapped as a priority disagreement not a factual claim.
- **Stakes.** 8 stakes, 2 clear, all with participants. Reply lines are used only as evidence that a speaker gave no update condition, not as explicit commitments. Two single-speaker disagreement rows (d-exposure, d-cushion) are built from reply lines with "no participant asserts the objection", marked medium and low; honest, but they pad the disagreement box.

Verdict: primary crux DIFFERENT from all map cruxes; a reasonable, arguably the best, crux for the
debate as rendered.

### Run B (10/14)

- **Positions 2.** All four, explicit, two quotes each.
- **Common ground 1.** cg-2 ("effects on workers are a legitimate concern warranting some kind of response") is attributed to all four with no quote; Marcus's stated view is that the alarm repeats failed predictions. cg-1 and cg-3 are correct with one quote each.
- **Type 1.** Headline causal, primaryType causal, insight is the empirical-vs-governance priority question. crux-3 pairs the "will there be a crisis in 15 years?" question with Marcus's agricultural-employment claim, so its branches say an uncontested 1900-to-2000 statistic holding makes Dana's crisis prediction weaker.
- **Crux 1.** Primary crux is Tomas's thesis restated ("is this an empirical question or a governance question?"), typed priority, affecting all four, with three of the four stances reading "Not explicitly addressed". crux-2 is the contested causal question (same as A's crux-2). The definitional question is present as d-define-outcome but not promoted.
- **Evidence 2.**
- **Resolution 1.** path-4 is "The participants would need to agree on whether more evidence could in principle settle the dispute", the "would require agreement on the disagreement" pattern (README defect 4). Paths 1 to 3 operational.
- **Honesty 2.** Caveats include the same Dana-tension catch as A.
- **Stakes.** 7 stakes, 3 clear with reasoned consequences (Priya's definition stake is the best single stake in either run). No participant-less stake, no reply-line stake.

Verdict: primary crux DIFFERENT; one speaker's framing claim, not load-bearing for the other three.

### Preference: A, clearly

A promotes the definitional fault line that actually splits Dana, Priya and Tomas; B promotes Tomas's
meta-claim with inferred non-answers from everyone else. A's common ground is six correctly
attributed items against B's three with one over-attributed. A has no template resolution text. B's
accountability box is slightly better reasoned, which does not outweigh the rest.

---

## What differs systematically between A and B

1. **Quote volume.** A grounds two to three times as many quotes per report (32/19/29 vs 11/7/16), all verbatim in both runs. Grounding coverage is similar (A 0.84/0.81/0.81, B 0.85/0.70/0.93) because A also drops more ungrounded quotes.
2. **Common ground attribution.** A names participant subsets and quotes each named participant; B attributes to all four with two or zero quotes on five of nine items, and on us-israel mints two items from "I know the reply" lines. This is the most consistent quality gap.
3. **Reply-line handling.** A never turns a renderer "I know the reply" line into a stake and says so in a caveat every time; B produced five such stakes across two maps, each with `basis: explicit` and `ifFalseEffect: no-change`. B also produced the only participant-less stake (us-israel fallback).
4. **Accountability depth.** A: 8/8/8 stakes, 5/0/2 clear, every clear stake `basis: inferred` from a stated "because" or "only if". B: 4/6/7 stakes, 0/1/3 clear. B's few clear stakes are well reasoned; A's are more numerous and more cautious.
5. **Crux selection is not systematically better in either run.** Each run once promoted a single-speaker framing claim to primary (A on capitalism, B on ai-jobs and, arguably, us-israel). Each run once recovered a map crux as primary (B capitalism, A us-israel). A's misses are toward definitional questions; B's are toward "is this the right question" meta-claims.
6. **Run-independent projection defects, seen in both.** Headline/insight incoherence in five of six reports (all but A/capitalism). Crux question paired with a different claim's branches and resolution kind in four reports (A us-israel crux-2 and crux-3, A ai-jobs crux-1, B us-israel crux-3, B ai-jobs crux-3); the `addCrux` code path explains it. "Is this true:" fallback questions in four reports. These will not move with the model.
7. **Resolution paths.** B hit template text three times (two generic value-tradeoff paragraphs, one "would need to agree on whether"); A twice (one template, one dependency statement labelled as an evidence path).
8. **Disagreement box.** A lists more rows (5/7/8 vs 5/4/5), including single-speaker rows from reply lines marked low confidence. Honest but padded; a reader may count them as disputes.
9. **Latency.** Comparable: A 361/324/369 s, B 315/337/412 s.

Net: A is the more careful report below the crux line on all three maps; the crux line itself is a
coin flip between the runs and is dominated by projection defects that neither model controls.
