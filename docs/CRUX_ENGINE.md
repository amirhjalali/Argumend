# The Crux Engine (v1 decision document)

Status: decided 2026-08-11. Synthesis by Fable from three independent proposals: A (Codex, graph-theoretic — counterfactual signed propagation), B (Codex, hybrid — judgment-as-data architecture), C (Sonnet, content-grounded — scoring derived from seven real corpus disputes). Full proposals archived in `docs/research/2026-08-11-crux-proposals/`.

## Definition

A **crux** is an unresolved proposition whose resolution would significantly change the structure or conclusion of the wider disagreement. Operationally, on the `ARGUMENT_MODEL.md` graph: a CLAIM that is genuinely contested, whose counterfactual resolution materially moves position support, and which *separates* positions — helping some and hurting others — with an explanation derivable entirely from computed values.

## Decision summary

| Question | Decision | Source |
|---|---|---|
| Impact engine | **Counterfactual signed propagation** (clamp claim to true/false, damped fixed-point, measure per-target deltas) — not plain reachability, not centrality | A |
| Score form | Additive weighted core `w·[C,R,D,T]` with multiplicative implicit-boost; discrimination weighted highest (0.35) | C (form), A (components) |
| Definitional/scoping cruxes | **Scoping propagation**: claims inherit max R/D of the claims they `qualify`/gate via `depends_on`; detector is structural, not epistemicType-gated | C |
| Value-difference cruxes | First-class. Tractability T confined to a **0.65–1.0 band** — a tie-breaker, never a burier | C |
| Implicit assumptions | Admitted to candidacy regardless of status; ×1.15 boost compensating the balance-term blind spot | C |
| Contestedness | Editorial `status` is the primary term (never manufactured from edge counts); edge/evidence balance modulates; `undercuts` routed back to the concluded claim as strong opposition | C + A |
| Selection | Top 3–5 with redundancy control (penalize overlap of affected-downstream sets, ρ=0.35) + `cruxOverride` pin/suppress | A |
| LLM boundary | Five call sites only (below); ranking is 100% deterministic; **judgment-as-data**: every model output stored with content hash, prompt/model version, validator result, human override | B |
| Semantic dedup | Embed → candidate pairs → LLM adjudication → merge only on `same_proposition` ∧ confidence ≥0.9 ∧ no blocking difference (actor/timeframe/threshold/modality/value-standard). **Bad merge > missed merge**, so bias against | B |
| Explanations | Template filled from computed values; optional LLM polish is fact-locked (validator rejects new ids/numbers/claims); deterministic fallback always available | B |
| Degradation | Model-unavailable mode: exact-text canonicalization, epistemicType→resolution-kind fallback mapping, deterministic-only pipeline still ranks | B |

## The algorithm

### Candidacy

`status ∈ {contested, unresolved}` OR `implicit: true`. Excluded: `uncontested`, `broadly_accepted`, `superseded`. Evidence density is **not** a signal in either direction — well-evidenced claims tend to be converged (that's why they're evidenced), and the offshoring-rival case showed thin-evidence claims can be central precisely because they're unresolved. Instead, low `evidenceCoverage` on a top-5 crux surfaces as an **"evidence-starved crux"** annotation — triage info, outside the score.

### Signals

1. **Contestedness** `C(n) = statusWeight(n.status) × (0.5 + 0.5·balance(n))` where balance is min/max of weighted support-vs-opposition inflow (supports/evidences:supporting vs opposes/undercuts-routed/contradicts/evidences:challenging), and statusWeight = {contested: 1.0, unresolved: 1.0, broadly_accepted: 0.3, else 0}.
2. **Impact & reach** — build the signed influence graph (inference chains collapsed: premise→conclusion +0.7, undercutter→conclusion −0.9; `depends_on` **reversed** — influence flows target→dependent; `qualifies` ±0.5). Run damped propagation `activation = tanh((base + 0.8·inflow)/1.0)`, ≤40 iterations. For each candidate, clamp `do(n=+1)` and `do(n=−1)`, take per-target deltas `d_n(t)`. Then `R(n)` = saturating sum of |d| over downstream claims + positions.
3. **Discrimination** `D(n)`: 1.0 if positions reached with **opposite signs** (a true fork); 0.4 if ≥2 positions same-sign; 0.2 if one; 0 otherwise. Computed from the counterfactual position deltas, not path-sign products (equivalent in acyclic regions, better behaved with cycles).
4. **Scoping propagation**: where `scopedSet(n) = {m : m —qualifies/depends_on→ n}` is non-empty, `R(n) := max(R_direct, max R(m))`, same for D. This is how "what counts as mass unemployment" (zero direct position edges) inherits the reach of every predictive claim it scopes.
5. **Tractability** `T` from `resolution.kind`: existing-evidence 1.0 · future-observable 0.9 · definitional-choice 0.8 · authority-allocation 0.75 (v1.1: procedural cruxes resolve by allocating decision rights) · missing 0.7 · value-difference 0.65.

**v1.1 edge handling:** `limits_scope` (CLAIM→EVIDENCE) attenuates that evidence node's outgoing `evidences` influence (×0.5 per unrebutted limiter) rather than opposing the evidenced claim — scope attacks weaken support without adding opposition. `undercuts` from EVIDENCE routes identically to claim-undercuts. Superseded nodes are excluded before scoring.

### Score, selection, explanation

```
score(n) = I(n) · (0.30·C + 0.20·R + 0.35·D + 0.05·T) + 0.15·S(n)
```

`I(n)` = 1.15 iff implicit. `S(n)` = normalized scoping bonus (drives the "Gates:" line in the UI). Selection: rank, penalize redundancy `(1 − 0.35·overlapWithSelected)` over affected-downstream sets, apply `cruxOverride`, emit top 3–5 above a floor.

Every crux card renders from the template: what's disputed (actual counter-statements from the graph) · why it matters (per-position deltas with paths) · what would resolve it (from `resolution`; for value-difference: *"Nothing does — this is a standing value disagreement; the map holds both horns"*) · gates (scoped candidates). All numbers from the computation; prose polish fact-locked.

### LLM call sites (complete list)

1. `epistemicType`/`status` classification at **extraction** time (upstream of this engine)
2. Semantic dedup adjudication of embedding-retrieved candidate pairs (enum output, merge-biased-against, human review for high-impact merges)
3. Resolvability classification → `resolution.kind` enum (only when the field is absent; validated, low-confidence + high-impact routed to review)
4. Missing-edge **suggestions** (contradicts/depends_on candidates) — proposals only, never auto-applied
5. Explanation polish, fact-locked

Forbidden: "given this graph, what are the cruxes?" — the ranking is never model-derived.

## Alternatives considered and rejected

- **Pure LLM identification**: unexplainable, unstable run-to-run, and violates the auditable-over-authoritative rule. Rejected outright (all three proposals concurred).
- **Dung-style extension semantics / h-categorizer**: attack-only, all-or-nothing acceptability; can't represent evidence polarity, position discrimination, or graded support. Kept as literature inspiration for the damped propagation.
- **Betweenness/centrality as impact**: finds bridges, not belief-changers; an uncontested hub ranks high. Rejected as primary; usable as a diagnostic.
- **Bayesian networks / value-of-information**: the conceptually perfect frame, but requires calibrated CPTs Argumend doesn't have. Revisit if the platform ever elicits probabilities.
- **Multiplicative score form** (proposal A): punishes any zero component absolutely; with scoping propagation in place the additive form + candidacy gates achieves the filtering without silently zeroing definitional/normative cruxes.
- **Wide tractability range / resolvability gating**: would systematically bury normative cruxes — the exact failure the platform exists to avoid.

## Failure modes tracked (with mitigations)

1. **Default-contested flooding** from extraction (§8.3 of the model defaults status to contested) → `sourceDiversity` pre-gate at candidacy, outside the score.
2. **Topology reflects authoring choices** — hub-wiring inflates R/D → `cruxOverride` exists for exactly this; validation is against human judgment, not internal consistency.
3. **Mis-tuned scoping detector** silently drops definitional cruxes → acceptance test 1 (below) pins this.
4. **Unexamined warrants**: an inference with `warrantImplicit: true` and zero incoming `undercuts` is a dispute the graph can't see → pre-pass flag routed to extraction review ("unexamined warrant"), not a score fix.
5. **Atomicity fragmentation**: one real crux split across 3 claims, each below cutoff → shared-attack-target merge heuristic + LLM dedup (call site 2); this is the one place semantics earns its keep.
6. **Cycles** → damped iteration, SCC detection, warn when a cycle dominates a score.
7. **Model drift** → judgment-as-data cache; rankings change only on explicit version migration.

## Validation & acceptance (pre-registered)

Ground truth: the flagship corpus's ~28 human-identified disagreement propositions (the two explicit end-of-report lists = 10 "primary", plus inline-tagged disputes). After encoding, an annotator maps each to nearest CLAIM(s); a proposition is "recovered" if any mapped claim ranks.

- **Recall@5 ≥ 60%, Recall@10 ≥ 80%** on primary propositions, pooled per sub-question.
- **Zero background/uncontested claims in any top-5** — a hard failure, not a tuning nudge.
- **Named tests**: (1) the causal-attribution claim `c2` AND the definitional claim `c3` both top-5 for their sub-question — required, since `ARGUMENT_MODEL.md` §6 asserts this outcome; (2) the normative "$80K-clerical→$34.9K-care counts as adjusted" claim lands top-5 despite value-difference tractability; (3) the offshoring rival hypothesis reaches top-10 despite thin evidence; (4) the implicit hiring-vs-output assumption appears in the ranked output at all.
- Failing (1) or (2) localizes the fix to scoping propagation / the T-band respectively — not the weight vector.

## Complexity

At 80 claims / 150 edges / 40 iterations: ~10⁶ edge updates per full recompute — trivial server-side or in-browser. Full recompute on every graph edit is acceptable; incremental is a UI-responsiveness optimization only. LLM budget: dedup + resolvability ≤ ~60 calls per topic recompute, all cached by content hash thereafter.
