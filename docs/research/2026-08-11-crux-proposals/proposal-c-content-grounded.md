# Crux-Identification for Argumend: A Content-Grounded Design

*Proposer C (Sonnet) — designed from the ontology and corpus backward, not from graph theory forward. Archived verbatim; synthesis in `docs/CRUX_ENGINE.md`.*

---

## 0. Method

I read `ARGUMENT_MODEL.md` (the five-node/ten-edge ontology, epistemic typing, resolution kinds) and the two AI-jobs flagship corpus files, and pulled out real disagreement propositions those documents already treat as cruxes — several explicitly, in the "Propositions the Sides Actually Disagree About" lists at the end of each file. I encode each one as it would actually sit in the graph (which node, what edges, what `status`/`epistemicType`/`resolution`), and only then derive scoring components — so every formula below is answering "what pattern would this specific real dispute produce," not "what's a generically plausible graph metric."

---

## 1. Seven propositions, encoded, with the signature that should rank them highly

### A. The definitional crux: what counts as "mass unemployment"

> *"'Mass unemployment' should mean sustained U-3 above 10%, not wage collapse, participation decline, or underemployment."*

**Signature:** CLAIM, `epistemicType: definitional`, `status: contested`, `statusBasis`: "corpus offers three distinct thresholds (U-3>10%, U-3>15-20%, broader participation/wage measures) with no convergence." `resolution: { kind: "definitional-choice", condition: "sides stipulate a metric before forecasting" }`. Edges: `qualifies` into multiple downstream predictive claims (e.g., "AI will cause mass unemployment by 2041" is only well-formed once this resolves); no direct `supports`/`opposes` edge to either POSITION — it acts on *other claims*, not on positions directly.

**Ranking signal:** this claim has near-zero direct position reach (it doesn't argue for or against anyone's stance) but enormous *indirect* reach through `qualifies`/`depends_on` fan-out into every predictive claim about whether "it" will happen. A naive reach metric that only follows edges into POSITION nodes will miss it entirely — which is the central design problem definitional cruxes pose (see §2.4, §5.3).

### B. The causal-attribution crux (the worked-example undercut)

> *"That decline is caused by AI adoption rather than the tech cycle or offshoring."* (= `c2` in the model's own worked example)

**Signature:** CLAIM, `epistemicType: empirical`, `status: contested`. Structurally: `c1 —premise_of→ i1`, `i1 —concludes→ c2`, `c2 —supports→ p1`, and critically `c5 —undercuts→ i1` where `c5` = "nearly half the tech-postings decline predates ChatGPT" (grants `c1`, attacks the *inferential step*, not the underlying decline). `p1 —depends_on→ c2`.

**Ranking signal:** this is the textbook high-value crux shape — a CLAIM that is (a) the `concludes` target of an INFERENCE, (b) directly `supports`-linked to a POSITION, (c) that POSITION also `depends_on` it (double-strength position linkage), and (d) it is under live `undercuts` attack rather than mere `opposes`. The undercut is structurally the strongest contestedness signal in the ontology, because it means credible parties grant every premise and still reject the conclusion — a purer disagreement than a factual dispute over the premises themselves.

### C. The offshoring rival hypothesis

> *"U.S. junior white-collar decline is partly offshoring/GCC reallocation, not just automation."*

**Signature:** CLAIM, `epistemicType: empirical`, `status: unresolved` (the corpus is explicit: "UNVERIFIED as a causal split... plausible but not cleanly identified in public data"). `resolution: { kind: "existing-evidence", condition: "firm-level data linking U.S. entry-level cuts to simultaneous India/Philippines/GCC hiring in the same functions; absent that, remains UNVERIFIED" }`. Would carry `unverifiedFlags: ["causal split not identified in public data"]`. Edge: `c_offshoring —undercuts→ i1` (same inference node as B — it's a *second, independent* rival explanation attacking the same causal step as the tech-cycle claim `c5`).

**Ranking signal:** this is the case that stress-tests whether evidence *volume* should drive the score. It has thin, uncorroborated evidence (deliberately, per the corpus author) yet is exactly the kind of claim a good crux engine must surface, because its resolution would flip whether the policy conclusion is "labor-demand crisis" or "trade/geography reallocation" — two entirely different remedies. If scoring weights evidence-weight directly, this claim loses to well-evidenced but lower-stakes claims. That is a design trap (see §5).

### D. The reinstatement / comparative-advantage-bound crux

> *"Human comparative advantage is unbounded enough that reinstatement will continue."*

**Signature:** CLAIM, `epistemicType: predictive`, `status: contested`, `resolution: { kind: "future-observable", condition: "evidence that new, sizable labor-intensive task categories emerge after AI deployment, paying comparable wages" }`. This is the CLAIM both steelmen (`§3` "this time is different" and `§4` "this time is like last time" in `b-theory-history.md`) are actually arguing about underneath their historical-analogy rhetoric — Acemoglu-Restrepo's "reinstatement effect" vs. Korinek-Suh's "no remaining comparative advantage." It sits at the fork of two INFERENCE chains, one concluding toward each POSITION.

**Ranking signal:** two INFERENCE nodes both premised (in part) on this claim, concluding to opposite-polarity claims that `support` opposite POSITIONs. This is the cleanest case of **position discrimination** — resolving it one way doesn't just support one side, it *simultaneously* strengthens one POSITION's inference chain and severs the other's.

### E. The normative "has it adjusted" crux

> *"An economy where displaced $75,000–$80,000 administrative workers become $34,900 care workers has 'adjusted.'"*

**Signature:** CLAIM, `epistemicType: normative`, `status: contested`, `statusBasis`: "corpus explicitly frames as unresolvable by data." `resolution: { kind: "value-difference", condition: "agreement on whether adjustment means any reemployment, comparable earnings, comparable autonomy, or socially useful work with wage insurance" }`. Depends on (via `depends_on`) two EVIDENCE-backed empirical claims (BLS $47,460 secretary median; $34,900 home-health median) but is itself unsettleable by more data.

**Ranking signal:** the case that tests whether `value-difference` resolution kind gets systematically buried by a scorer that (wrongly) treats "resolvable" as a proxy for "important." This claim has **maximal downstream normative weight** — it's what "has AI's labor transition gone okay" *cashes out to* — and near-zero empirical resolvability. A design that conflates those two things will rank it near the bottom. §3 and §4 below are built specifically so this doesn't happen.

### F. The reframing/scope crux: displacement vs. algorithmic management

> *"AI will be experienced by most workers first as algorithmic management, not unemployment."*

**Signature:** CLAIM, `epistemicType: empirical`, `status: contested`, `resolution: { kind: "future-observable", condition: "worker surveys and administrative data show growth in automated scheduling/quota/pay/monitoring systems exceeding AI-attributable layoffs" }`. This claim doesn't attack any single inference; it `qualifies` the entire QUESTION's framing ("is the harm mass unemployment, or is that even the right axis") — similar structural role to the definitional crux (A) but tagged empirical rather than definitional, because it's a claim about what *is happening*, not about word meaning.

**Ranking signal:** this is deliberately included to show that "scopes other cruxes" is not synonymous with `epistemicType: definitional` — a claim can play the scoping role (many downstream claims `qualify`/`depends_on` through it) while being empirically tagged. The algorithm must detect the *structural* pattern (fan-out via `qualifies`/`depends_on`), not gate scoping-detection on epistemic type.

### G. The implicit assumption

> *"Firms respond to AI capability primarily by reducing hiring rather than by expanding output."* (= `c4`, `implicit: true`)

**Signature:** CLAIM, `epistemicType: empirical`, `implicit: true`, `status: contested` (per the model's own worked example), reached via `c2 —depends_on→ c4`.

**Ranking signal:** no one in either source document states this outright; it's the load-bearing assumption underneath the entire causal-attribution dispute (B). Structurally it looks *under*-contested — no one has bothered to attack a claim nobody has noticed — so a naive opposition-count signal would score it near zero. This is the case that motivates a deliberate, separate "implicit boost" rather than relying on graph opposition density (§2.5).

---

## 2. Scoring components, derived from the seven signatures above

Each signature above pointed at a different graph pattern; here's what generalizes.

### 2.1 Contestedness `C(n)` — from B, C, E

Never derived from raw edge counts (`ARGUMENT_MODEL.md` §3 forbids this — "a claim with ten crank objections is not thereby contested"). Start from the editorial `status` field, then use edge structure only to *modulate*, not manufacture, contestedness:

```
statusWeight = { contested: 1.0, unresolved: 1.0, broadly_accepted: 0.3,
                 uncontested: 0.0, superseded: 0.0 }[n.status]

support = count(edges into n with polarity ∈ {supports, evidences:supporting})
oppose  = count(edges into n with polarity ∈ {opposes, undercuts, evidences:challenging, contradicts})
balance = (support == 0 and oppose == 0) ? 0 : min(support,oppose) / max(support,oppose,1)

C(n) = statusWeight * (0.5 + 0.5 * balance)
```

`undercuts` counts as strong opposition even though it targets the claim's downstream INFERENCE rather than the claim itself — undercutting is *routed back* to the concluded claim's contestedness, because that's what a reader experiences as "this conclusion is disputed" (case B).

### 2.2 Downstream reach `R(n)` — from B, D

Build a directed **influence graph** from the argument graph by orienting every edge in the direction "if `n`'s truth-value changed, what changes downstream":

| Edge as stored | Influence-graph direction |
|---|---|
| `supports`, `opposes` (CLAIM/EVIDENCE→CLAIM/POSITION) | same direction |
| `premise_of` → `concludes` | chained through the INFERENCE node |
| `undercuts` (CLAIM→INFERENCE) | chained to the INFERENCE's `concludes` target |
| `qualifies` (CLAIM→CLAIM) | same direction, weight 0.5 |
| `contradicts` | both directions |
| `depends_on` (source depends on target) | **reversed** — if the target falls, the source is unfooted, so influence flows target→source |

```
reachSet = BFS(influenceGraph, from=n, maxDepth=6, decay=0.6^(depth-1))
R(n) = min(1.0, Σ decay(depth) for each node in reachSet / calib)
  where calib ≈ 0.15 * |claims in topic|   # keeps R comparable across 30- vs 80-claim topics
```

### 2.3 Position discrimination `D(n)` — from D (and why B, E differ)

This is the direct formalization of "crux" as *the thing that would change which side you're on* — not just "this matters," but "this matters differently to different sides."

```
for each POSITION p in reachSet:
    polarity[p] = sign(product of edge-polarities along the influence path n→p)
        # supports=+1, opposes/undercuts/contradicts=-1, depends_on=+1 (strong), qualifies=+0.5

signs = distinct(polarity.values())
D(n) = 1.0   if |signs| ≥ 2                     # reaches ≥2 positions with opposite sign — a real fork (case D)
     = 0.4   if |reachSet ∩ POSITIONS| ≥ 2       # reaches multiple positions, same direction (informative, not adjudicating)
     = 0.2   if |reachSet ∩ POSITIONS| == 1
     = 0.0   otherwise
```

Case D scores `D=1.0` (two INFERENCE chains, opposite conclusions). Case B scores `D≈0.4–0.6` in practice (it directly supports p1 via one path; whether it also reaches p2 negatively depends on whether p2's chain is wired through the same inference or a separate one — in the worked example graph, only p1 is directly reached, so `D≈0.2`, which is a real signal: **the causal-attribution claim is high-C, high-R, but only moderate-D**, because as drawn it mostly matters to one side's case rather than adjudicating between two active chains — an honest finding, not a bug).

### 2.4 Definitional-claim reach propagation — from A, F

Direct position-reach systematically fails for scoping claims (A: zero direct `supports`/`opposes` edges to any POSITION) and for empirically-tagged framing claims (F: same shape). Rather than a separate scoring *path* keyed on `epistemicType`, use a structural detector keyed on the **fan-out pattern**, applied uniformly:

```
scopedSet(n) = { m ∈ candidates | edge(m, n, type ∈ {qualifies, depends_on}) exists }
```

For claims where `scopedSet(n)` is non-trivial, `R(n)` and `D(n)` are computed *both* directly and as the **max aggregate over `scopedSet(n)`'s own R/D** — i.e., a definitional claim inherits the best position-reach of everything it scopes, because that's the reach it actually has once you trace one hop further:

```
R(n)  = max(R_direct(n), max(R_direct(m) for m in scopedSet(n)))
D(n)  = max(D_direct(n), max(D_direct(m) for m in scopedSet(n)))
```

This is why **case A ranks near the top despite zero direct position edges**: it inherits the reach/discrimination of proposition D and B, both of which are only well-formed once "mass unemployment" is defined. `epistemicType: definitional` is a strong *prior* that this propagation will matter (nearly all definitional claims act this way), but the detector itself is structural (fan-in via `qualifies`/`depends_on`), so an empirically-tagged scoping claim like F gets the same treatment. **Answer to the posed question:** normative and empirical claims do not need a different core formula (C/R/D are epistemic-type-agnostic graph properties); definitional claims — and any claim exhibiting the same fan-out shape regardless of tag — need this one propagation step, and `resolution.kind` (next section) needs type-aware handling.

### 2.5 Resolution-kind tractability `T(n)` and epistemic-type-aware explanation — from E, C

`resolution.kind` should **not** gate whether something is a crux (E must not be buried), only which explanation template renders and a small tie-break weight:

```
T(n) = { existing-evidence: 1.0, future-observable: 0.9, definitional-choice: 0.8,
         value-difference: 0.65, (missing): 0.7 }[n.resolution?.kind]
```

Kept in a narrow 0.65–1.0 band deliberately — wide enough to nudge actionable cruxes ahead of vague ones as a tie-breaker, narrow enough that a `value-difference` claim with high `C`, `R`, `D` (case E) still lands top-3. This is the direct answer to "do normative claims need a separate path": **not a separate score, a separate downstream rendering** — see §3.3.

### 2.6 Implicit-assumption boost `I(n)` — from G

Opposition-balance (§2.1) is structurally unavailable for an assumption nobody has contested, because nobody has *noticed* it enough to write a counter-claim. Rather than let this silently zero out C(n), apply a flat multiplier when `implicit: true`:

```
I(n) = 1.15 if n.implicit else 1.0
```

This is a deliberate compensation for a known blind spot in the balance term, not a generic "surprise bonus" — it exists because §2.1's `balance` term structurally penalizes exactly the claims implicit-assumption status is meant to surface.

### 2.7 Scoping bonus `S(n)` — from A vs. everything else

Separate from the reach-propagation in §2.4 (which fixes A's *own* score), `S(n)` is reported as metadata to drive the **"Gates:" line** in the explanation template — which other ranked candidates does this crux sit upstream of:

```
S(n) = Σ over m in candidates, m≠n, where edge(m,n,{qualifies,depends_on}) exists: weight(score(m))
     normalized to [0,1]
```

---

## 3. The algorithm

### 3.1 Candidate filtering

```
candidates = { n ∈ CLAIM nodes |
    n.status ∈ {contested, unresolved}  OR  n.implicit == true }
```

`broadly_accepted` and `uncontested` are excluded even from candidacy — per the ontology, disagreement is what makes something crux-eligible at all; `superseded` is excluded outright.

### 3.2 Scoring and ranking

```
w = { C: 0.30, R: 0.20, D: 0.35, T: 0.05 }   # discrimination weighted highest: it's the
                                               # closest formal match to "changes the disagreement's structure"

for n in candidates:
    reachSet = influenceBFS(n)
    C = contestedness(n)
    R = reach(n, reachSet)          # with §2.4 propagation if scopedSet(n) nonempty
    D = discrimination(n, reachSet) # with §2.4 propagation if scopedSet(n) nonempty
    T = tractability(n.resolution)
    S = scopingBonus(n, candidates)

    score(n) = I(n) * (w.C*C + w.R*R + w.D*D + w.T*T) + 0.15*S

ranked = sort(candidates, by score, desc)
ranked = mergeNearDuplicates(ranked)
ranked = applyCruxOverrides(ranked, graph)  # cruxOverride: "pin" forces inclusion + top rank,
                                             # "suppress" removes regardless of score
output = ranked[:5]   # 3-5 per constraint; drop below 3 only if <3 candidates clear a floor score
```

Every term above is a stored or computed value on the node/edge set — nothing here needs an LLM call. LLM usage is reserved for:

- classifying `epistemicType`/`status` at extraction time (already the model's job, not the crux engine's),
- writing the natural-language "what's disputed" / "why it matters" prose in the explanation template, *filled from* the computed values below, never inventing new ones,
- optionally, a semantic near-duplicate check in `mergeNearDuplicates` when graph structure alone is ambiguous (two claims that aren't `contradicts`-linked but are paraphrases — a structural miss the LLM can catch, graph logic can't).

### 3.3 Explanation template (filled from computed values)

```
### {rank}. {n.statement}

Type: {n.epistemicType} · status: {n.status} ({n.statusBasis})
Score {score:.2f} — contestedness {C:.2f}, downstream reach {R:.2f}
  ({|reachSet ∩ POSITIONS|} positions / {|reachSet ∩ CLAIMS|} claims affected),
  position discrimination {D:.2f}, tractability {T:.2f}{" [implicit assumption, +15%]" if n.implicit}

What's disputed: {claims/edges opposing or undercutting n, rendered as the actual counter-statements}

Why it matters: {for each POSITION p in reachSet: "{p.label} {+/-} via {path}"} —
  if D == 1.0: "resolving this moves {position A} and {position B} in opposite directions"
  if D == 0.4: "resolving this matters to {N} positions but doesn't adjudicate between them"

Positions depending on this: {reachSet ∩ POSITIONS, each with net polarity and the edge path}

What would resolve it:
  if resolution.kind in {existing-evidence, future-observable, definitional-choice}:
     "{resolution.condition}"
  if resolution.kind == value-difference:
     "Nothing does — this is a standing value disagreement ({resolution.condition}).
      The map should hold both horns rather than await resolution."
  if resolution is absent:
     "Not yet specified. Flagged for curator input."

Gates: {S(n) > 0.3: list lower-ranked candidates m with edge(m,n,{qualifies,depends_on}), i.e.
        "resolving this changes the applicability of: {m.statement}, ..."}
```

### 3.4 Worked score sketch on the seven cases

| Case | C | R | D | T | I | S | Rough rank driver |
|---|---|---|---|---|---|---|---|
| A. Definitional "mass unemployment" | 0.85 | high, via §2.4 propagation | high, via propagation | 0.8 | 1.0 | high (gates ≥3 others) | Top — gating breadth carries it despite zero direct position edges |
| B. Causal attribution (`c2`) | 0.95 (undercut = strong opposition) | high | 0.2–0.4 as drawn | 0.9 | 1.0 | low | Top-3 — C and R alone carry it |
| C. Offshoring rival | 0.6 | moderate | ~0.3 | 1.0 | 1.0 | low | Mid-tier — correctly *not* buried by thin evidence |
| D. Reinstatement bound | 0.9 | high | **1.0** | 0.9 | 1.0 | low-moderate | Top — highest D in the set |
| E. Normative "adjusted" | 0.85 | moderate-high | 0.4 | 0.65 | 1.0 | low | Top-5 — survives despite low T |
| F. Algorithmic mgmt reframe | 0.7 | high via propagation | 0.4 | 0.9 | 1.0 | moderate | Mid-tier |
| G. Implicit assumption (`c4`) | 0.6 before boost | moderate | low direct | 0.7 | **1.15** | low | Middle — visible, not top, arguably correct |

---

## 4. Edge cases from the real content

**Implicit claims as candidates.** Admitted by `implicit == true` alone regardless of status — an un-noticed assumption may never have been assigned contested status at all. The boost counteracts §2.1's balance-term blindness to un-attacked assumptions.

**`value-difference` — are these cruxes?** Yes, without hedging. Nothing in the crux definition requires resolution to be *achievable*. Case E is arguably the single most important proposition in the H addendum precisely because it's where the empirical debate cashes out into an unavoidable value call. Burying value-difference cruxes would be a bug.

**Evidence-heavy, inference-light regions.** Well-evidenced background facts are typically uncontested → correctly filtered at candidacy; evidence density is not a crux signal — heavily evidenced claims tend to have converged. The inverse (contested, central, evidence-thin — case C) is the crux signature. Surface **"evidence-starved crux"** as a non-score annotation via `evidenceCoverage(n)`.

---

## 5. Failure modes

1. **Status-field flooding from default-contested extraction** → `sourceDiversity` pre-gate at candidacy, outside the score.
2. **Topology reflects authoring choices, not reality** — hub-wiring inflates R/D; no purely structural fix; this is why `cruxOverride` exists and validation is against human judgment.
3. **Definitional/scoping claims still under-rank if propagation mis-tuned** — silent wrong ranking; highest-risk failure; pinned by acceptance test 1.
4. **Warrant-only disputes invisible if never reified** — pre-pass flag: every INFERENCE with `warrantImplicit: true` and zero incoming `undercuts` → "unexamined warrant" routed to extraction review.
5. **Atomicity fragments a single real crux** — shared-attack-target merge heuristic + LLM semantic check; can over- or under-merge; the one place an LLM earns its keep over graph logic.
6. **Compound claims misroute the explanation template** — flag coordinating conjunctions for review; can't fully correct upstream extraction failures.

---

## 6. Validation plan

Ground truth: the corpus's ~28 human-identified disagreement propositions (10 "primary" from the two explicit end-of-report lists + inline-tagged disputes), annotator-mapped to nearest CLAIM(s) post-encoding; recovered = any mapped claim ranks.

- **Recall@5 ≥ 60%, Recall@10 ≥ 80%** on primary propositions, pooled per sub-question.
- **Zero false positives among top-5** (background/uncontested claims) — hard failure, not a tuning nudge.
- **Rank correlation** (Spearman) vs. human importance ranking — sanity check, not a gate.

**Named acceptance tests:** (1) cases B and A both top-5 for the theory sub-question — hard requirement, since `ARGUMENT_MODEL.md` §6 asserts this outcome; (2) case E top-5 despite value-difference; (3) case C top-10 despite thin evidence; (4) case G ranked at all. Failures of 1/2 localize to §2.4/§2.5 respectively, not the weight vector.
