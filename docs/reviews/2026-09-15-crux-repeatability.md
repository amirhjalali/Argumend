# Crux repeatability, sonnet, 5 identical runs (2026-09-15)

**What this is.** The same three flagship debate transcripts (rendered from the ArgumentGraphs by
`renderDebate.ts`, identical bytes each time) were diagnosed five times each on the `cli` lane with
`sonnet`, sequentially, at 19:14-19:45 EDT, about 30 model requests in total. The engine that picks
the crux is deterministic; the claim set it picks from is model-extracted. This measures how much
that extraction variance moves the crux the reader sees.

**How to read it.** Every number below is a signal, not accuracy (`docs/DISAGREEMENT_LOOP.md` §2).
"Exact-mode share" is how many of the five runs produced the single most common primary-crux
question verbatim. Jaccard is lexical overlap of >3-letter tokens between the primary-crux questions
of each pair of runs. Whether two differently-worded cruxes are "the same disagreement" is a human
judgment; the per-run list is included so a reader can make it.

**Headline.** On two of three maps the primary crux the reader would see changes from run to run,
and so does the diagnosis pattern. On the third (us-israel) the crux is stable in text across four
runs but is the uncontested death-toll sentence the blind reviewers already flagged as not a
disagreement, and the fifth run replaces it with the main question restated. Stability here is not
the same as correctness.


| map | runs | pattern agreement | primary crux exact-mode share | mean pairwise Jaccard(primary) | any run's crux set contains every other run's primary? |
|---|---|---|---|---|---|
| ai-mass-unemployment | 5 | 2/5 (mixed-disagreement:1, priority-tradeoff:2, value-conflict:1, definition-mismatch:1) | 2/5 | 0.17 | no |
| capitalism-after-ai | 5 | 2/5 (definition-mismatch:1, causal-model-split:1, priority-tradeoff:1, forecast-split:2) | 1/5 | 0.08 | no |
| us-israel-support | 5 | 5/5 (value-conflict:5) | 2/5 | 0.58 | no |

## Primary crux per run

### ai-mass-unemployment
1. [mixed-disagreement] Is whether AI produces mass unemployment an empirical question that evidence can settle, or a governance and distributive question about who decides deployment and bears costs?
2. [priority-tradeoff] What explains the early-career, AI-exposed employment decline?
3. [value-conflict] What explains the early-career, AI-exposed employment decline?
4. [definition-mismatch] What should count as 'mass unemployment' or an unemployment 'crisis' caused by AI?
5. [priority-tradeoff] Is AI adoption or macro/tech-cycle factors (interest rates, the tech correction, offshoring) the cause of the early-career employment decline?

### capitalism-after-ai
1. [definition-mismatch] Does a heavily redistributive market economy (UBI, AI taxes, public compute) still count as capitalism?
2. [causal-model-split] Will advanced-AI-driven task automation be absorbed via complementary job creation, or will it structurally shrink labor's income share?
3. [priority-tradeoff] Will workers displaced from AI-exposed tasks re-enter higher-productivity complementary jobs fast enough to avoid sustained underemployment?
4. [forecast-split] Will displaced workers be reinstated into higher-productivity complementary jobs fast enough to avoid sustained aggregate underemployment?
5. [forecast-split] Is this true: Capitalism survives advanced AI in recognizable form because private ownership, profit-seeking firms, and price-mediated markets persist while institutions adapt around the edges.

### us-israel-support
1. [value-conflict] Is this true: The reported Gaza direct-death total had converged near 71,000–73,000 by mid-2026, but the true scale and composition of deaths remain uncertain.
2. [value-conflict] Is this true: The reported direct-death total in Gaza had converged near 71,000–73,000 by mid-2026, but the true scale and composition of Palestinian deaths remain uncertain.
3. [value-conflict] Is this true: The reported direct-death total in Gaza had converged near 71,000–73,000 by mid-2026, but the true scale and composition of Palestinian deaths remain uncertain.
4. [value-conflict] Is this true: The reported direct-death total in Gaza converged near 71,000–73,000 by mid-2026, but the true scale and composition of Palestinian deaths remain uncertain.
5. [value-conflict] Should the U.S. continue, condition, or substantially cut its military and diplomatic support for Israel?

Jaccard is a lexical signal over >3-letter tokens, not a judgment of sameness. "exact-mode share" = how many runs produced the single most common primary-crux question verbatim.


## Interpretation

- **Pattern agreement 2/5, 2/5, 5/5.** ai-mass-unemployment produced four different patterns in five
  runs (mixed, priority x2, value, definitional); capitalism produced four (definition, causal,
  priority, forecast x2). The pattern is derived from model-extracted disagreement types, so it
  inherits the model's variance directly.
- **Primary crux exact match 2/5, 1/5, 2/5.** Even where the underlying disagreement is arguably the
  same (ai-mass runs 2, 3 and 5 all ask what explains the early-career decline), the wording, the
  type label, and therefore the branches and resolution text differ. capitalism runs 3 and 4 are the
  same question reworded; runs 1, 2 and 5 are three different disagreements.
- **Position recovery was 4/4 on every run** (see the run logs); variance is concentrated in the
  crux and pattern boxes, which is consistent with both blind reviews.
- **Implication for the release gate.** The human evaluation kit measures whether participants call
  the crux "genuinely central" (threshold 2). If the crux they see depends on which run they got,
  the study measures the run, not the product. Before the study: either fix the seed of variance
  (extraction prompt determinism, or a consensus step over N extractions that picks the modal claim
  set, which the north star permits because the engine still ranks) or accept and disclose it.
- **Implication for filter C.** The filter takes the next engine-ranked crux when the top one is
  uncontested; with this much variance in the ranked list, its effect will also vary by run. The
  re-scoring evidence (`2026-09-15-crux-filter-c-rescoring.md`) holds for the stored runs it replayed.

## Dog-park live run (the essay's worked example)

One live sonnet run of `docs/research/2026-09-15-v2-human-evaluation-kit/disagreements/04-dog-park-hours.md`
(201 s): pattern `mixed-disagreement` (the kit's expected pattern), 2 positions, 3 cruxes, grounding
1.0. Hero line: "This is several disagreements stacked together." Primary crux as presented: "Is
this true: Bart's opposition is specific to the morning slot, not to extending off-leash hours in
general; he'd support evenings and lights." The sealed answer key names the empirical incident-rate
question stacked on the value question as the crux; the model-presented primary is a claim the
parties agree on, i.e. the same defect family the reviewers named (uncontested claim as crux). This is
the honest state of the product for the essay, not a cherry-pick. Raw report:
`scratchpad/repeat/dogpark-sonnet.json` on the founder's machine (not committed; contains the source).

Raw run directories (gitignored): the five `.eval-runs/corpus-2026-09-15T23-*` directories.
