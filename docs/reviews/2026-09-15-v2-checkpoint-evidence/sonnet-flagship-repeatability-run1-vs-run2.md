# Blind score: corpus run 2 (`.eval-runs/corpus-2026-09-15T12-49-35-888Z/`)

Scored against `docs/evals/disagreement-diagnosis-rubric.md` (7 dimensions, 0-2 each; hard fail on
invented source or value/empirical swap). Human crux judgment per `docs/DISAGREEMENT_LOOP.md` §2:
lexical overlap is a signal, not accuracy, and is not reported as accuracy anywhere below.

Scope: the three maps that also appear in the prior run
(`.eval-runs/corpus-2026-09-15T02-22-04-608Z/`): ai-mass-unemployment, capitalism-after-ai,
us-israel-support. Run 2 also contains 7 other successful maps and 152 `.failed.json` files; those are
out of scope here.

Preconditions checked:
- Rendered source is byte-identical for each map across the two runs.
- Every quote in every `grounding[]` block of all six reports is a verbatim substring of its rendered
  source (10 / 15 / 6 quotes in run 2; 16 / 11 / 7 in run 1). Ungrounded quotes were dropped upstream
  and appear in `quality.warnings`; nothing shown is paraphrased.
- `provenance.independentlyVerified` is `false` in all six; no report names a winner or a percentage.
- Execution metadata is the same in both runs (`cli:claude`, `sonnet`, prompt
  `disagreement-extraction-v1.2.0`). Whatever differs between the configurations is not visible in
  the JSON; run 2 was a 10-map batch at concurrency 4, run 1 a 3-map batch at concurrency 3.

Hard-fail check: **no hard fail in any of the six reports.** No source is invented (all evidence
states are `not-independently-checked`; no citation appears anywhere). No dimension swaps a value
dispute into an empirical one; the one type mismatch (run 1 us-israel crux-3, below) attaches a
factual claim to a correctly typed normative question, which is a claim-selection error, not a swap.

A rendering fact that matters for every crux verdict: the debate renderer emits each map claim as a
single speaker line. On ai-mass-unemployment all three engine cruxes are Dana lines; on
us-israel-support all three are Dana lines (one echoed by Tomas as "I know the reply is that ...").
Only on capitalism-after-ai is a map crux (reallocation keeps pace: Dana) actually opposed by other
speakers' lines (Marcus wage-bill, Priya wages-cease). A blind reader cannot recover a crux that no
one in the transcript contests, so DIFFERENT on the first two maps is partly a harness property.

---

## 1. ai-mass-unemployment (run 2)

Map question: "Will AI cause mass unemployment in the U.S. within the next 15 years?"
Map cruxes (all empirical): firms cut hiring rather than expand output; targeted workforce programs
help; displaced workers retrain at small cost.

Recovered primary crux: "What should count as 'mass unemployment' or successful labor-market
'adjustment' to AI displacement?" (definitional, claim `c-priya-definition`). Pattern
`causal-model-split`.

| Dimension | Score | Evidence |
|---|---|---|
| Positions | 1 | Four theses match the map one-for-one and are grounded. But `d-cushioning` and `d-exposure-validity` assign Marcus stances he never uttered; they are Priya's and Dana's own "I know the reply is that ..." lines, re-homed to "the skeptical position". That is an invented opponent stance. |
| Common ground | 1 | `cg-1` (early-career decline occurred) is attributed to all four; only Dana and Marcus mention it. `cg-2` (governance matters to workers) is attributed to all four on a single Tomas quote. |
| Type | 2 | No swap. `d-exposure-validity` typed definitional where methodological/empirical fits better; minor. |
| Crux | 1 | The definitional crux is real and contested (Priya's U-3 line vs Tomas's "adjusted" reply). But `affectedPositionIds` lists Dana and Priya, not Tomas, and the diagnosis pattern says causal while the crux is definitional. |
| Evidence | 2 | Nothing invented; every evidence state is not-independently-checked. |
| Resolution | 2 | Operational: isolating analysis for cause; stipulated definition; 15-year observation; explicit "not resolvable by measurement" for the governance split. |
| Honesty | 1 | Caveat says the reply lines "are not explicitly attributed to a named speaker; here they are inferred to Marcus". They are attributed (each has a speaker label), and inferring them to Marcus is the fabrication above. Otherwise honest: tension in Dana's retraining line is called out. |
| **Total** | **10 / 14** | |

Crux verdict vs map: **DIFFERENT.** The map's cruxes are three empirical claims about firm behaviour
and retraining cost; the recovered crux is a definitional dispute about what "mass unemployment"
means. None of the three map crux claims appears in the report's disagreements box, because in the
rendering all three are spoken by Dana and no one contests them.

Reasonable crux for the debate as rendered? **Yes, moderately.** Priya's U-3-above-10% stipulation and
Tomas's "$30,000-$40,000 less per year has successfully 'adjusted'" reply are a genuine clash, and the
definition does gate whether Priya's "no headline crisis" and Dana's "crisis" can both be true. A
careful reader might instead pick the Dana/Marcus causal split (`crux-2`), which the report also
surfaces.

Pattern fit: partial. `causal-model-split` fits Dana vs Marcus on the cause of the decline, but the
headline ("They agree on the facts but disagree about what causes them") contradicts the insight line,
which states a definitional crux. `mixed-disagreement` describes this four-way debate better.

Accountability box: three stakes (Dana crisis, Marcus explanation, Priya definition), all with a
participant, all grounded, none minted from a reply line. Zero clear stakes; all three are
commitment-gaps. No fallback stake.

---

## 2. capitalism-after-ai (run 2)

Map question: "Can market capitalism survive advanced AI in recognizable form?"
Map cruxes: ownership stays concentrated (predictive); reallocation keeps pace (predictive); survival
definition contested (definitional).

Recovered primary crux: "Is this true: Successive automation waves disrupted specific occupations
without ending market allocation or private ownership." (empirical, claim `c-dana-history`).
Pattern `definition-mismatch`.

| Dimension | Score | Evidence |
|---|---|---|
| Positions | 2 | Four theses match the map; two grounded quotes each; Tomas's steelman correctly notes Dana and Priya use narrow/broad definitional framing. |
| Common ground | 2 | `cg-2` (purchasing power for non-owners is central) grounded on Marcus and Priya; `cg-3` (definition matters) supported by Tomas's line plus Dana's and Priya's own "under a narrow/broad definition" lines. `cg-1` reasonably limited to Dana/Marcus/Priya. |
| Type | 2 | No swap. `d-concentration` typed empirical where predictive is the map's type; not a value/empirical swap. |
| Crux | 0 | The primary crux is a historical claim nobody contests; Priya's own reply line concedes automation "has substituted for labor in some tasks while complementing it". Its resolution condition is the placeholder "Further clarification is required." `crux-3` (historic bargain) has the same placeholder. Only `crux-2` (reabsorption) is a live crux. |
| Evidence | 2 | Nothing invented. |
| Resolution | 1 | Disagreement-level conditions are operational (stipulate a definition; observe labor share; track diffusion). But two of three crux-level resolutions are the placeholder above, and the diagnosis reports resolvability "high" on the strength of a definitional-choice pattern whose primary crux is empirical. |
| Honesty | 2 | Caveats accurate: reply lines described correctly as self-raised counterarguments; Tomas's meta-level position flagged. |
| **Total** | **11 / 14** | |

Crux verdict vs map: **DIFFERENT.** The historical-precedent claim is upstream support for Dana's
reabsorption claim, which is the map's `c-reallocation-keeps-pace`, so a generous reader might say
adjacent. It is not the same disagreement: the map's crux is a forecast about displaced workers;
this is a past-tense fact that no speaker disputes. `crux-2` in the same report does recover the
map's reallocation crux, but it was not selected as primary.

Reasonable crux for the debate as rendered? **No.** A crux must be load-bearing and contested; this
claim is neither in the transcript. The engine appears to have promoted it on edge count alone.

Pattern fit: the pattern itself (`definition-mismatch`) is the right call for this debate, since the
definitional split is voiced by Tomas and enacted by Dana and Priya. But the headline ("using the
same word to mean different things") is followed by an insight line that states an empirical crux.

Accountability box: `stake-primary-crux-fallback` has **no participant** (minted by the projector,
warning "Minted fallback stake for primary crux claim c-dana-history"). The other three stakes are
grounded and belong to their speakers' own lines; none was minted from a reply line. Two
single-participant "disagreements" (`d-concentration`: Priya only; `d-labor-share-evidence`: Tomas
only, built from his reply line) are not disagreements and pad the box.

---

## 3. us-israel-support (run 2)

Map question: "Should the United States substantially reduce its military and diplomatic support for
Israel?"
Map cruxes: regional stability depends on the alliance (predictive); Gaza death toll uncertain
(empirical); casualty figures mostly combatants (empirical).

Recovered primary crux: "What is the true scale and combatant/civilian composition of Palestinian
deaths in the Gaza war?" (empirical, claim `c-death-toll`). Pattern `priority-tradeoff`.

| Dimension | Score | Evidence |
|---|---|---|
| Positions | 2 | Four theses verbatim from the map, each grounded on its speaker's opening line. |
| Common ground | 1 | `cg-1` (notification gap, Marcus and Tomas) is the best common-ground finding in either run: both speak the identical sentence. But the same claim is then listed as `crux-2`, so the report calls it both agreed and a crux. `cg-2` (alliance loyalty and IHL both legitimate) is ungrounded; both cg quotes were dropped as ungrounded despite the sentence being verbatim in the source. |
| Type | 1 | `d-framing` typed procedural; `crux-2` typed procedural with authority-allocation resolution for a factual claim both parties assert. `d-casualty-data` and `d-vetoes-credibility` are single-stance items typed as disagreements. No value/empirical swap. |
| Crux | 0 | The primary crux is Dana's own uncertainty statement, which the report itself says "no other participant" contests. Its branch says that if deaths remain uncertain, "Continue or strengthen support becomes stronger", which nothing in the source supports. `crux-2` is common ground. Only `crux-3` (combatant share) is a plausible crux, and it too is single-speaker. |
| Evidence | 2 | Nothing invented; casualty figures flagged as asserted by speakers. |
| Resolution | 0 | Diagnosis resolvability "high". `d-core-policy` (priority) resolvability "high" while its own condition says it requires agreeing how to weigh alliance value against humanitarian law. `d-vetoes-credibility` condition "Not stated in the source." `d-framing` condition "Not stated; would require the participants to agree on what the debate is fundamentally about." |
| Honesty | 1 | Four accountability stakes (Dana compliance, Marcus access, Priya Hamas, Tomas stability) treat each speaker's acknowledged objection as that speaker's own material claim toward their own conclusion, then grade it "non-load-bearing". Priya did not offer Hamas's FTO status as a reason to cut aid. The caveat describing the reply lines is accurate, which makes the stake attribution an internal contradiction. No winner named. |
| **Total** | **7 / 14** | |

Crux verdict vs map: **SAME** in text (the recovered claim is the map's `c-gaza-death-toll-uncertain`
almost word for word, lexical overlap 1.0). But the map's crux is contested by position edges that
the renderer did not turn into opposing lines, so in the transcript this is a claim one speaker makes
and nobody answers. The report recovered the sentence, not the disagreement.

Reasonable crux for the debate as rendered? **No.** As rendered, the live disagreements are the
three-way aid-level split (Dana/Marcus/Priya), the Priya-vs-Dana value clash (complicity overrides
loyalty vs Hamas designation), and Tomas's reframing. A single uncontested empirical statement is not
what this transcript turns on.

Pattern fit: `priority-tradeoff` ("agree on the goods and disagree on the tradeoff") is a fair
description of Dana/Marcus/Priya. The insight line then states an empirical crux, so headline and
insight disagree.

Accountability box: `stake-primary-crux-fallback` has **no participant**. Four of the remaining six
stakes were minted from "I know the reply is that ..." lines (see Honesty). The two grounded stakes
(Dana combatant share, Priya vetoes) are correct commitment-gaps.

---

## Run 2 summary

| Map | Score | Primary crux vs map | Reasonable crux as rendered | Pattern fit | Stake w/o participant | Stake minted from reply line |
|---|---|---|---|---|---|---|
| ai-mass-unemployment | 10/14 | DIFFERENT | Yes, moderately | Partial (headline contradicts insight) | No | No (but two disagreement stances are) |
| capitalism-after-ai | 11/14 | DIFFERENT | No (uncontested) | Pattern fits; crux does not | Yes (fallback) | No |
| us-israel-support | 7/14 | SAME text, not same disagreement | No (single-stance) | Partial (headline contradicts insight) | Yes (fallback) | Yes, four |

---

## Comparison with the prior run (`corpus-2026-09-15T02-22-04-608Z`)

Prior-run rubric scores, same method (details in the per-map notes below):

| Map | Run 1 | Run 2 |
|---|---|---|
| ai-mass-unemployment | 13/14 | 10/14 |
| capitalism-after-ai | 13/14 | 11/14 |
| us-israel-support | 9/14 | 7/14 |

### ai-mass-unemployment: prefer **run 1**

Run 1 primary crux: "Is the AI-and-jobs question fundamentally an empirical/measurement question or a
policy and governance question about who decides and who pays?" (priority, Tomas's claim). Verdict vs
map: DIFFERENT, for the same rendering reason as run 2.

- Run 1 keeps the four reply lines unattributed ("no other participant is shown explicitly endorsing
  those counter-claims"); run 2 hands two of them to Marcus as his stances. That alone decides it.
- Run 1's accountability box has three clear stakes, including Priya's definition with a stated
  falsification condition (if "mass unemployment" is anchored to wage collapse, her own cohort-harm
  claim becomes evidence of it). That is the single most useful line in either report. Run 2 has zero
  clear stakes.
- Run 1's `cg-1` is attributed to Dana and Marcus only, which is what the source supports; run 2
  spreads it over all four.
- Run 1's weakness: its primary crux is Tomas vs three silent participants (stances read "Not
  explicitly addressed"), and `crux-3` pairs the predictive crisis question with the agriculture
  precedent fact. Run 2's definitional primary crux is the more genuinely contested of the two.
  Run 1 scored Crux 1 for this.

### capitalism-after-ai: prefer **run 1**, clearly

Run 1 primary crux: "Will AI-displaced workers be reabsorbed into new jobs at a pace avoiding sustained
underemployment, or will automation shrink labor's income share and break the wage bargain?"
(predictive, Marcus's wage-share claim; `crux-3` is Dana's reabsorption claim). Verdict vs map:
**SAME** disagreement as `c-reallocation-keeps-pace`, stated from the opposing side, with three
positions affected and Dana/Marcus/Priya each holding a stated stance.

- Run 1 recovered the one map crux that the rendering actually makes contestable, and made it primary.
  Run 2 put the same claim third behind an uncontested historical fact with a placeholder resolution.
- Run 1 has no fallback stake; all four stakes have a participant and a target conclusion.
- Run 1 marks Dana's stance in `d-concentration` as "inferred, not a direct forecast"; run 2 lists that
  disagreement with Priya alone.
- Run 1's flaw: `stake-reabsorption` reads Dana's "I do not think that settles it" as proof her
  reabsorption claim is "non-load-bearing" (ifFalseEffect no-change). Declining to concede an
  objection is not the same as the claim doing no work. Honesty 1 for that. Run 2 avoided this.

### us-israel-support: prefer **run 1**, narrowly; neither is publishable

Run 1 primary crux: "Is the central policy question the level of aid to Israel, or whether arms
transfers receive adequate transparency, congressional notification, and legal review?" (definitional,
Tomas's reframing). Verdict vs map: DIFFERENT. Run 1's `crux-2` is the map's death-toll crux and its
`crux-3` is the Priya/Dana value clash.

- Run 1's disagreements box is coherent: `d-aid-trajectory` is typed normative with resolvability
  low, and `d-complicity-vs-threat` pairs Priya's override claim against Dana's Hamas/combatant claims,
  which is the real value clash in the transcript. Run 2 rates the same aid-level dispute resolvability
  "high".
- Run 1 has one genuine inferred clear stake (Marcus's leverage claim as a hinge: if aid gives no
  leverage, conditioning loses its point). Run 2 has none.
- Run 1's primary crux is a framing question, contested only by inference, and its branch ("if
  procedural holds, the three level positions become weaker") is not supported. Run 2's primary crux
  is at least a map crux, but as rendered it is a single uncontested sentence, and run 2's `crux-2`
  contradicts its own `cg-1`.
- Both runs mint four accountability stakes from the reply lines and both have a fallback stake with
  no participant. Run 1 additionally minted Dana's stance in `d-leverage` from her reply line. Run 1's
  `crux-3` attaches the Hamas-FTO factual claim to a normative question (Type 1). Run 1's common
  ground is weaker than run 2's (`cg-1` "this is a live policy question" is vacuous; `cg-3`/`cg-4` are
  ungrounded and low-confidence), whereas run 2 found the shared notification-gap sentence.

---

## What differs systematically between the two runs

1. **Primary crux selection.** Run 2's primary crux is an uncontested single-speaker claim on two of
   three maps (capitalism history; us-israel death toll). Run 1's is multi-party contested on two of
   three (ai-mass governance framing, capitalism reabsorption). The engine appears to rank on edge
   count; run 2's extraction produced more edges to unopposed claims.
2. **Fallback stakes with no participant.** Run 2: two of three maps. Run 1: one of three. Every
   fallback stake accompanies a primary crux that no participant owns, so this is the same defect as
   item 1 surfacing in the accountability box.
3. **Handling of "I know the reply is that ..." lines.** Run 2 re-attributes them to an opponent
   (ai-mass: Marcus) or lists them as single-stance disagreements (capitalism: Tomas labor share;
   us-israel: Priya vetoes). Run 1 leaves them unattributed or labels inferred stances as inferred, but
   once over-reads one into "non-load-bearing" (capitalism Dana). Both runs turn them into
   accountability stakes on us-israel; that is a projector behaviour, not a model difference.
4. **Clear stakes.** Run 1 produced 3 / 0 / 1 clear stakes; run 2 produced 0 / 0 / 0. Run 1 is more
   willing to infer a hinge and say what falsifies it; when right (Priya's definition, Marcus's
   leverage) it is the most valuable content in the report, and when wrong (Dana reabsorption) it is
   an overreach. Run 2 is safer and emptier.
5. **Common-ground attribution.** Run 2 tends to attribute common ground to all four participants on
   one or two quotes (ai-mass `cg-1`, `cg-2`; capitalism `cg-3`). Run 1 scopes it to the speakers who
   said it (ai-mass `cg-1` Dana/Marcus, `cg-3` Priya/Tomas). Run 2's one standout is the shared
   notification-gap sentence on us-israel, which run 1 missed.
6. **Resolvability.** Run 2 marks a value tradeoff "high" (us-israel `d-core-policy`); run 1 marks it
   "low". Both diagnoses report top-level resolvability "high" or "medium" driven by the primary crux
   kind rather than the debate.
7. **Grounding.** Coverage is a wash: 1.00 / 0.875 / 0.667 (run 2) vs 0.933 / 0.846 / 0.700 (run 1).
   No shown quote in either run fails verbatim matching.
8. **Shared defects, both runs.** Headline template contradicts the insight line in five of six
   reports (pattern chosen from primary type, insight chosen from the engine crux, and they disagree).
   The ai-mass and us-israel map cruxes are unrecoverable from the rendering because the renderer
   gives each map claim a single speaker and no opposing line, so a blind run can at best echo the
   sentence; the harness's SAME-text result on us-israel run 2 is that echo, not recovery of the
   disagreement.

---

### Run 1 rubric detail (for the record)

| Map | Pos | CG | Type | Crux | Evid | Resol | Honest | Total | Notes |
|---|---|---|---|---|---|---|---|---|---|
| ai-mass-unemployment | 2 | 2 | 2 | 1 | 2 | 2 | 2 | 13 | Crux 1: primary is Tomas vs silence; crux-3 pairs agriculture fact with the crisis forecast. |
| capitalism-after-ai | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 13 | Honesty 1: `stake-reabsorption` "non-load-bearing" inferred from a reply line. |
| us-israel-support | 2 | 1 | 1 | 1 | 2 | 1 | 1 | 9 | CG: vacuous `cg-1`, ungrounded `cg-3`/`cg-4`. Type: crux-3 factual claim on a normative question. Resol: diagnosis "high", `d-central-question` condition non-operational. Honesty: reply-line stakes; Dana `d-leverage` stance from her reply line. |
