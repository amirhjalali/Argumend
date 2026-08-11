**Proposal: Hybrid Crux Identification for Argumend**

Core position: use LLMs only for semantic judgments that are not graph-computable, then freeze those judgments as auditable data. Ranking, propagation, impact, and explanation facts should be deterministic. This follows the lesson from gradual / weighted bipolar argumentation: graph semantics are well-suited to explainable support/attack strength propagation, while NLP relation models remain useful but imperfect and domain-sensitive. See weighted bipolar argumentation and gradual semantics work by Amgoud/Ben-Naim and Baroni/Rago/Toni, plus argument-relation classification results showing cross-domain limits. ([ijcai.org](https://www.ijcai.org/proceedings/2018/720?utm_source=openai)) ([sciencedirect.com](https://www.sciencedirect.com/science/article/pii/S0888613X18304651?utm_source=openai)) ([discovery.dundee.ac.uk](https://discovery.dundee.ac.uk/en/publications/transformer-based-models-for-automatic-identification-of-argument/))

```text
                          MODEL STAGES                         DETERMINISTIC STAGES
Raw graph
  |
  v
[Graph validation / ontology normalization] ------------------------------+
  |                                                                       |
  v                                                                       |
[Embedding candidate retrieval]  --> [LLM duplicate / entailment judge]    |
  |                                                                       |
  v                                                                       |
[Canonical proposition clusters + alias table] <--------------------------+
  |
  v
[Canonical signed argument graph]
  |
  +--> [LLM resolvability classifier: enum only]
  |
  v
[Deterministic impact propagation]
  |    - position dependency vectors
  |    - counterfactual true/false deltas
  |    - contestedness
  |    - discrimination across positions
  |    - breadth / bottleneck paths
  v
[Rank 3-5 cruxes]
  |
  +--> [Template explanation packet]
           |
           +--> optional LLM polish, fact-locked
           v
      Final crux cards
```

**Division Of Labor**

Model-required judgments:

- Semantic deduplication: “Congestion will rise on nearby streets” and “lane removal causes spillover traffic” may be the same proposition; string rules will miss this.
- Entailment vs duplicate vs contradiction: use NLI-style labels because natural language equivalence is directional and polarity-sensitive. NLI is explicitly framed as entailment / contradiction / neutral classification. ([nlp.stanford.edu](https://nlp.stanford.edu/projects/snli/))
- Resolvability type: deciding whether a dispute is empirical, predictive, definitional, or value-based requires understanding the proposition, not just graph topology.
- Dispute basis: evidence conflict vs missing evidence vs value priority conflict.
- Optional wording polish for final explanations, but only from a locked fact packet.

Deterministic-only judgments:

- Impact propagation.
- Position discrimination.
- Ranking.
- Path attribution.
- Counterfactual “if resolved true / false” deltas.
- Merge constraints.
- Final score arithmetic.
- Explanation factual claims.

Boundary rule: if the answer must be stable, numeric, graph-local, or auditable, it is deterministic. If the answer depends on linguistic meaning, modality, time, quantifiers, or value/fact distinction, use a constrained model judgment and store it.

**Scoring**

Candidate cruxes are canonical proposition clusters with `status in {contested, unresolved}` or meaningful incoming contradiction / challenging evidence.

Expose component scores, not a black box:

```text
crux_score =
  contestedness
  * structural_impact
  * position_discrimination
  * resolution_leverage
```

Where:

- `contestedness`: derived from status, opposing edges, challenging evidence, contradiction edges.
- `structural_impact`: max counterfactual change in position margins if the proposition resolves true vs false.
- `position_discrimination`: how differently positions depend on the proposition.
- `resolution_leverage`: `observable_evidence_exists=1.00`, `future_observable=0.85`, `definitional_choice=0.65`, `value_difference=0.55`.

Also show `hangs_on_percent`: share of total unresolved downstream position influence passing through this proposition cluster.

**Semantic Dedup Pipeline**

Run at ingest time, then incrementally at score time for changed neighborhoods.

1. Embed each CLAIM text plus compact context: question, epistemic type, immediate parent/child claims, edge polarity.
2. Retrieve candidate pairs by cosine similarity and lexical overlap. High recall here is fine.
3. LLM adjudicates only candidate pairs, batched.
4. Deterministic cluster builder merges only high-confidence `same_proposition` pairs.
5. Human review required for high-impact merges or low-margin candidates.

Bad merge is worse than missed merge because a bad merge permanently conflates evidence, opposition, and downstream dependencies. The propagation engine then treats two distinct claims as one bottleneck. A missed merge merely splits impact across aliases; it can be detected later and reviewed.

Merge bias:

- Merge only if bidirectional truth conditions match.
- Do not merge if actor, timeframe, threshold, modality, quantifier, or normative standard differs.
- `strict_entailment` is not a merge; represent it as `depends_on` or `qualifies`.
- `contradiction` is not a merge; create or confirm a `contradicts` relation.

**Model Call Sites**

1. `embed_claim_context`

Input: `{claim_id, text, question_text, epistemicType, local_context}`  
Output: fixed-dimension vector.  
Validation: dimension, finite numbers, model version recorded.  
Fallback: exact normalized-text matching only.

2. `judge_claim_pair`

Input:

```json
{
  "pair_id": "C7:C19",
  "question": "...",
  "claim_a": {"id": "C7", "text": "...", "epistemicType": "...", "local_context": "..."},
  "claim_b": {"id": "C19", "text": "...", "epistemicType": "...", "local_context": "..."}
}
```

Output schema:

```json
{
  "pair_id": "string",
  "relation": "same_proposition | strict_entailment | contradiction | related_distinct | unrelated",
  "canonical_text": "string | null",
  "confidence": 0.0,
  "merge_allowed": false,
  "blocking_difference": "actor | timeframe | threshold | modality | polarity | value_standard | none"
}
```

Validation: enum only; `merge_allowed=true` only when `relation=same_proposition`, `confidence>=0.90`, and `blocking_difference=none`.  
Fallback: no semantic merges; preserve existing graph nodes.

3. `classify_resolvability`

Prompt contract:

```text
You classify how this proposition could be resolved in principle.
Return JSON only. Choose exactly one resolution_type.

observable_evidence_exists:
  Present or historical evidence, measurement, expert analysis, or records could settle it enough for this debate.

future_observable:
  Truth depends mainly on future outcomes not yet observable.

definitional_choice:
  Resolution requires choosing a definition, category boundary, metric, or threshold.

value_difference:
  Facts may inform the debate, but the proposition turns mainly on priority among values or preferences.

Do not explain in prose. Do not rank importance. Do not infer graph impact.
```

Input:

```json
{
  "proposition_id": "K12",
  "canonical_text": "...",
  "epistemicType": "empirical | predictive | normative | definitional",
  "question": "...",
  "supporting_evidence_summaries": [],
  "challenging_evidence_summaries": [],
  "nearby_claims": []
}
```

Output:

```json
{
  "proposition_id": "string",
  "resolution_type": "observable_evidence_exists | future_observable | definitional_choice | value_difference",
  "dispute_basis": "evidence_conflict | missing_evidence | prediction_uncertainty | definition_dispute | value_priority",
  "confidence": "low | medium | high",
  "needs_human_review": true
}
```

Validation: exact enum; proposition id must match; if confidence low and candidate is top-10 structural impact, route to review.  
Fallback: map `empirical -> observable_evidence_exists`, `predictive -> future_observable`, `normative -> value_difference`, `definitional -> definitional_choice`.

4. `polish_explanation`

Input: deterministic fact packet only.  
Output: short text fields.  
Validation: no new node ids, no changed numbers, no unsupported claims, no extra positions.  
Fallback: deterministic template.

**Consistency And Drift**

Recommended architecture: judgment-as-data.

Every model judgment is stored with:

- normalized input content hash
- graph neighborhood hash
- prompt version
- schema version
- model name/version
- raw output
- validator result
- human override, if any

Use temperature 0 by default. Use majority vote only for high-impact borderline cases, such as a potential merge with `0.82-0.90` confidence or a low-confidence resolvability label for a top structural candidate. Do not majority-vote routine calls; caching and versioning matter more for product stability. This is also a response to LLM-as-judge reliability findings: position bias and other biases are real, so model output must not be treated as an invisible oracle. ([papers.app.nz](https://papers.app.nz/view/paper?id=608459)) ([ethics.nd.edu](https://ethics.nd.edu/news-and-events/publications/jiayi-ye-yanbo-wang-yue-huang-dongping-chen-qihui-zhang-nuno-moniz-tian-gao-werner-geyer-chao-huang-pin-yu-chen-nitesh-v-chawla-xiangliang-zhang-iclr-2025-justice-or-prejudice-quantifying-biases-in-llm-as-a-judge/))

**Worked Example**

Toy graph: question is “Should the city replace two downtown car lanes with a protected bus-bike corridor?”

Positions:

- `P1`: build full corridor
- `P2`: run two-avenue pilot first
- `P3`: do not build

Claims:

- `C1`: corridor reduces peak bus trip times by at least 15%
- `C2`: protected corridor cuts peak bus trips about 15%
- `C3`: lane removal increases parallel-street congestion over 10%
- `C4`: mode shift offsets congestion within 12 months
- `C5`: project costs $48M
- `C6`: $48M is an unacceptable opportunity cost
- `C7`: protected lanes reduce severe crashes
- `C8`: crash reduction justifies reallocating road space
- `C9`: removing curb parking reduces small retail revenue
- `C10`: transit and bike customer gains offset parking losses
- `C11`: city should prioritize transit access over driver convenience
- `C12`: affected drivers lack practical alternatives
- `C13`: a two-avenue pilot can reveal ridership and congestion risk

Model judgments:

- `C1` and `C2` -> `same_proposition`, canonical `K1`.
- `C5` and `C6` -> `related_distinct`, because one is empirical cost and the other is normative acceptability.
- `K1` -> `future_observable`, dispute basis `prediction_uncertainty`.
- `C3` -> `future_observable`.
- `C6` -> `value_difference`.
- `C9` -> `observable_evidence_exists`.
- `C11` -> `value_difference`.
- `C13` -> `observable_evidence_exists`.

Deterministic propagation:

- `K1` supports `P1`, weakly supports `P2`, opposes `P3`.
- `C3` supports `P3`, supports `P2`, opposes `P1`.
- `C9` supports `P3`, supports `P2`, opposes `P1`.
- `C6` supports `P3`, weakly supports `P2`, opposes `P1`.
- `C13` strongly supports `P2`.

Ranked crux output:

1. `C3`: “Lane removal increases parallel-street congestion over 10%”
   - Score: `0.78 = contestedness 1.00 * impact 0.86 * discrimination 0.92 * resolution 0.85`.
   - Hangs on: 31% of unresolved downstream influence.
   - Why: if true, `P3` becomes strongest and `P1` loses its main feasibility path; if false, the main objection to `P1` collapses and `P2` loses some rationale.
   - Would resolve: future traffic counts / modeled-or-observed spillover after comparable lane removal.

2. `K1`: “The corridor reduces peak bus trip times by about 15%”
   - Score: `0.69`.
   - Hangs on: 24%.
   - Why: `P1` depends on this for the practical-benefit case; `P3` depends on denying it; `P2` treats it as testable.
   - Would resolve: observed pilot or comparable-corridor travel-time measurements.

3. `C9`: “Removing curb parking reduces small retail revenue”
   - Score: `0.61`.
   - Hangs on: 18%.
   - Why: it is the strongest business-harm path into `P3` and a major reason `P2` prefers a pilot.
   - Would resolve: merchant revenue / footfall data before and after comparable curb changes.

4. `C6`: “$48M is an unacceptable opportunity cost”
   - Score: `0.43`.
   - Hangs on: 15%.
   - Why: structurally important, but lower resolution leverage because the disagreement is mainly value priority, not a missing fact.
   - Would resolve: explicit budget-priority agreement, not evidence alone.

**Failure Modes And Mitigations**

- Bad semantic merge: require high-confidence same-proposition, blocking-difference checks, no automatic merge for entailment, review high-impact merges.
- Missed duplicate: show alias candidates in review; recompute after merge; use score-time duplicate sweep for top candidates.
- Model drift changes ranking: judgment-as-data cache; prompt/model version pinning; recompute only on explicit version migration.
- Explanation says more than computation proved: deterministic fact packet; LLM polish validator; raw template fallback.
- Value dispute mislabeled as empirical dispute: resolvability confidence gating; human override; compare label against `epistemicType`.
- Propagation overcounts cycles or repeated paths: collapse canonical clusters; cap path contribution; use cycle-aware iterative gradual semantics with convergence checks.
- Sparse or biased graph structure hides a crux: surface “low graph confidence” when many contested claims have no position paths or evidence.
- Model unavailable: exact-match canonicalization, epistemicType fallback for resolvability, deterministic ranking still works.

**Validation Plan**

Build a benchmark of 50-100 real Argumend graphs. Have at least three trained human annotators mark canonical proposition clusters, resolution type, and top 3-5 cruxes with rationales.

Measure:

- top-k crux precision / recall against human consensus
- NDCG and Kendall tau for ranking
- pairwise preference accuracy: did the system rank human-preferred crux higher?
- canonicalization precision first, recall second
- resolvability enum accuracy
- explanation faithfulness: every sentence traceable to graph paths or stored model judgment
- stability under repeated runs, node reordering, paraphrase edits, and model-version migration

Run ablations: deterministic-only, hybrid without dedup, hybrid without resolvability, full hybrid. The full hybrid should win mainly by avoiding duplicate crux splitting and by distinguishing evidence-resolvable cruxes from deep value cruxes.