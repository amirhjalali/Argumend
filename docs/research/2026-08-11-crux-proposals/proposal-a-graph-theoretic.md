**Proposal: Graph-Theoretic Crux Identification For Argumend**

A crux should be a contested claim with high counterfactual leverage over the disagreement, especially where the leverage helps some positions and hurts others. I would make the core engine deterministic: graph scoring, signed propagation, and counterfactual intervention. LLMs should only fill semantic metadata and explanatory text.

## 1. Signal Definitions With Formulas

Let `C` be claims, `P` positions, and `G` the typed argument graph.

### 1.1 Contestedness

For each claim `c`, compute:

```text
Contestedness(c) =
  clamp(
    0.55 * StatusScore(c) +
    0.25 * EdgeDispute(c) +
    0.20 * EvidenceDispute(c),
    0, 1
  )
```

Recommended `StatusScore`:

```text
contested          = 1.00
unresolved         = 0.75
superseded         = 0.15
uncontested        = 0.10
broadly_accepted   = 0.05
missing            = 0.35
```

Incoming edge dispute:

```text
posEdge(c) = sum weights of incoming supports / positive depends_on / positive inference influence
negEdge(c) = sum weights of incoming opposes / contradicts / undercut-derived negative influence

EdgeDispute(c) =
  if posEdge + negEdge = 0: 0
  else:
    2 * min(posEdge, negEdge) / (posEdge + negEdge)
    * (1 - exp(-(posEdge + negEdge) / tauEdge))
```

Default `tauEdge = 2`.

Evidence dispute:

```text
E+ = total supporting evidence weight
E- = total challenging evidence weight
Eq = total qualifying evidence weight
T = E+ + E- + Eq

EvidenceDispute(c) =
  if T = 0: 0
  else:
    NormalizedEntropy(E+/T, E-/T, Eq/T)
    * (1 - exp(-T / tauEvidence))
```

Default `tauEvidence = 1`.

This makes a claim contested if it is explicitly marked contested, if the graph contains serious pro and con structure, or if evidence polarity is mixed.

### 1.2 Impact

Use **counterfactual flip analysis** as the primary impact signal.

Build a signed influence graph over claims and positions:

```text
supports      => +1.0
opposes       => -1.0
contradicts   => -1.0
depends_on    => +0.8
qualifies     => weak signed modifier, default -0.35 unless typed more specifically
premise_of + concludes => premise claim influences conclusion claim
undercuts + concludes  => undercutter claim negatively influences conclusion claim
```

For inference nodes, collapse:

```text
claim p --premise_of--> inference i --concludes--> claim y
=> p influences y with sign +, weight wInferencePremise

claim u --undercuts--> inference i --concludes--> claim y
=> u influences y with sign -, weight wUndercut
```

Default:

```text
wInferencePremise = 0.7
wUndercut = 0.9
```

Then run deterministic signed propagation:

```text
activation_v = tanh((baseEvidence_v + lambda * incomingInfluence_v) / temperature)
```

Defaults:

```text
lambda = 0.8
temperature = 1.0
iterations <= 40 or until max delta < 0.001
```

For each candidate claim `c`, intervene twice:

```text
do(c = true):  clamp activation(c) = +1
do(c = false): clamp activation(c) = -1
```

Then compute per-target effect:

```text
d_c(t) = (activation_true_c(t) - activation_false_c(t)) / 2
```

Impact components:

```text
PositionImpact(c) = mean over positions p of abs(d_c(p))

ClaimImpact(c) =
  min(1, sum over downstream claims t != c of abs(d_c(t)) / tauClaimImpact)
```

Default `tauClaimImpact = 3`.

Flip bonus:

```text
FlipRate(c) =
  count targets t where sign(activation_true_c(t)) != sign(activation_false_c(t))
  / number of eligible downstream targets
```

Combined impact:

```text
Impact(c) =
  0.60 * PositionImpact(c) +
  0.30 * ClaimImpact(c) +
  0.10 * FlipRate(c)
```

Why recommend counterfactual flip analysis:

- Plain reachability is interpretable but overcounts weak and irrelevant downstream paths.
- Weighted path decay is better, but still double-counts diamond structures unless carefully saturated.
- Betweenness centrality finds bridges, not necessarily belief-changing propositions.
- Counterfactual intervention directly matches the crux definition: “if this changed, what else changes?”

At Argumend scale, the counterfactual method is cheap.

### 1.3 Position Discrimination

A crux should not merely affect all positions in the same direction. It should separate positions.

For candidate `c`, let:

```text
d_p = d_c(position p)
posMass = sum max(0, d_p)
negMass = sum max(0, -d_p)
```

Then:

```text
SignDiscrimination(c) =
  min(1, posMass / tauPos)
  * min(1, negMass / tauPos)
```

Default `tauPos = 0.25`.

Variance term:

```text
VarianceDiscrimination(c) =
  min(1, stdev(d_p) / tauVariance)
```

Default `tauVariance = 0.35`.

Combined:

```text
Discrimination(c) =
  0.75 * SignDiscrimination(c) +
  0.25 * VarianceDiscrimination(c)
```

For primary cruxes, require:

```text
Discrimination(c) >= 0.25
PositionImpact(c) >= 0.10
Contestedness(c) >= 0.35
status != superseded
```

### 1.4 Final Crux Score

```text
RawCruxScore(c) =
  100
  * Contestedness(c)^alpha
  * Impact(c)^beta
  * (0.25 + 0.75 * Discrimination(c))
  * AtomicityModifier(c)
```

Defaults:

```text
alpha = 1.0
beta = 1.0
AtomicityModifier = 1.0 normally
AtomicityModifier = 0.75 for highly composite conclusion claims
```

Composite claims are still allowed, but the UI should expand them into their strongest disputed premises.

Selection should use redundancy control:

```text
AdjustedScore(c) =
  RawCruxScore(c)
  * (1 - rho * maxOverlapWithAlreadySelected(c))
```

Default `rho = 0.35`.

Overlap should be computed over significantly affected downstream claims, not merely shared positions, because all good cruxes usually affect the same final positions.

## 2. Stepwise Algorithm With Pseudocode

```ts
type ClaimId = string;
type PositionId = string;
type NodeId = string;

interface CandidateScore {
  claimId: ClaimId;
  contestedness: number;
  impact: number;
  positionImpact: number;
  claimImpact: number;
  discrimination: number;
  rawScore: number;
  adjustedScore: number;
  affectedClaims: Array<{ id: ClaimId; effect: number }>;
  affectedPositions: Array<{ id: PositionId; effect: number }>;
  explanationFacts: string[];
}

function identifyCruxes(graph: ArgumentGraph): CandidateScore[] {
  const normalized = normalizeGraph(graph);

  const influenceGraph = buildSignedInfluenceGraph(normalized);
  const contestedness = computeContestedness(normalized, influenceGraph);

  const baseActivations = propagateActivations(influenceGraph, {
    clamps: new Map(),
  });

  const candidates = normalized.claims.filter(c =>
    contestedness[c.id] >= 0.35 &&
    c.status !== "superseded"
  );

  const scored: CandidateScore[] = [];

  for (const c of candidates) {
    const trueRun = propagateActivations(influenceGraph, {
      clamps: new Map([[c.id, +1]]),
    });

    const falseRun = propagateActivations(influenceGraph, {
      clamps: new Map([[c.id, -1]]),
    });

    const effects = computeCounterfactualEffects(
      c.id,
      trueRun,
      falseRun,
      normalized
    );

    const positionImpact = meanAbs(effects.positions);
    const claimImpact = Math.min(
      1,
      sumAbs(effects.claims) / 3.0
    );

    const flipRate = computeFlipRate(effects, trueRun, falseRun);

    const impact =
      0.60 * positionImpact +
      0.30 * claimImpact +
      0.10 * flipRate;

    const discrimination = computePositionDiscrimination(
      effects.positions
    );

    if (positionImpact < 0.10 || discrimination < 0.25) continue;

    const atomicity = computeAtomicityModifier(c, normalized);

    const rawScore =
      100 *
      contestedness[c.id] *
      impact *
      (0.25 + 0.75 * discrimination) *
      atomicity;

    scored.push({
      claimId: c.id,
      contestedness: contestedness[c.id],
      impact,
      positionImpact,
      claimImpact,
      discrimination,
      rawScore,
      adjustedScore: rawScore,
      affectedClaims: topAffectedClaims(effects.claims),
      affectedPositions: topAffectedPositions(effects.positions),
      explanationFacts: buildDeterministicExplanationFacts(
        c,
        contestedness[c.id],
        effects,
        normalized
      ),
    });
  }

  return selectSmallDiverseSet(scored, {
    minCount: 3,
    maxCount: 5,
    redundancyPenalty: 0.35,
  });
}
```

## 3. Worked Example

Question:

```text
Q1: Should the city adopt congestion pricing?
```

Positions:

```text
P1: Adopt congestion pricing
P2: Reject congestion pricing
```

Claims:

```text
C1: Drivers are price-sensitive for peak trips.                 empirical, contested
C2: Peak traffic will fall.                                    predictive, contested
C3: Reduced traffic lowers emissions and delay.                 empirical, broadly_accepted
C4: Revenue will improve transit.                              predictive, unresolved
C5: Benefits exceed implementation costs.                      normative/predictive, contested
C6: Low-income commuters bear unfair burden.                   normative/empirical, contested
C7: Rebates and exemptions mitigate the burden.                 predictive, unresolved
C8: Privacy/admin burden is manageable.                        empirical, contested
C9: Downtown businesses will lose customers.                   predictive, contested
C10: Existing congestion creates large social costs.            empirical, broadly_accepted
C11: Equity should constrain efficiency gains.                  normative, contested
C12: Transit can absorb shifted commuters.                      empirical, unresolved
```

Inferences:

```text
I1: C1 + C3 => C2
I2: C2 + C4 + C10 + C12 => C5
```

Evidence:

```text
E1 supports C1, weight 0.6
E2 challenges C1, weight 0.5
E3 supports C6, weight 0.7
E4 challenges C7, weight 0.6
```

Key influence edges after inference collapse:

```text
C1 -> C2   +0.70
C3 -> C2   +0.50
C2 -> C5   +0.60
C4 -> C5   +0.50
C10 -> C5  +0.50
C12 -> C5  +0.50
C5 -> P1   +1.00
C5 -> P2   -1.00
C6 -> P1   -0.90
C6 -> P2   +0.90
C7 -> C6   -0.70
C8 -> P1   +0.50
C8 -> P2   -0.30
C9 -> P1   -0.70
C9 -> P2   +0.80
C11 -> C6  +0.60
```

Illustrative computed scores:

| Claim | Contestedness | Main counterfactual effects | Impact | Discrimination | Raw score |
|---|---:|---|---:|---:|---:|
| C5 benefits exceed costs | 0.72 | P1 +1.00, P2 -1.00 | 0.65 | 1.00 | 46.8 |
| C6 unfair burden | 0.67 | P1 -0.90, P2 +0.90 | 0.59 | 1.00 | 39.2 |
| C1 price-sensitive drivers | 0.65 | C2 +0.70, C5 +0.42, P1 +0.42, P2 -0.42 | 0.48 | 1.00 | 31.2 |
| C2 traffic will fall | 0.55 | C5 +0.60, P1 +0.60, P2 -0.60 | 0.50 | 1.00 | 27.5 |
| C9 business loss | 0.55 | P1 -0.70, P2 +0.80 | 0.49 | 1.00 | 26.9 |
| C7 rebates mitigate burden | 0.41 | C6 -0.70, P1 +0.63, P2 -0.63 | 0.53 | 1.00 | 21.7 |
| C12 transit capacity | 0.41 | C5 +0.50, P1 +0.50, P2 -0.50 | 0.42 | 1.00 | 17.2 |

After redundancy control, `C2` is demoted because it sits downstream of `C1` and mostly affects the same `C5 -> positions` route.

Ranked primary crux list:

```text
1. C5: Benefits exceed implementation costs.
   Impacts both positions directly. Composite summary crux; expand into C2, C4, C10, C12.

2. C6: Low-income commuters bear unfair burden.
   Strongly separates P1 and P2. Contested by C7 and supported by C11/E3.

3. C1: Drivers are price-sensitive for peak trips.
   Mixed evidence; affects C2, C5, and both positions through the main benefits chain.

4. C9: Downtown businesses will lose customers.
   Directly hurts adoption and helps rejection.

5. C7: Rebates and exemptions mitigate the burden.
   Resolves much of the C6 equity branch; selected despite lower contestedness because its position effect is large.
```

Example explanation for `C1`:

```text
C1 is contested because status=contested and evidence is mixed:
supporting evidence weight 0.6, challenging evidence weight 0.5.
If C1 is true rather than false, the model increases support for C2 by 0.70,
C5 by 0.42, P1 by 0.42, and decreases support for P2 by 0.42.
It separates positions because it helps P1 and hurts P2.
```

## 4. Where LLMs Are Allowed

Allowed call sites:

1. **Fill missing `epistemicType`**
   - Input: claim text only.
   - Output: empirical, predictive, normative, definitional, confidence.
   - Reason: semantic classification is not recoverable from graph topology.

2. **Detect possible duplicate or paraphrased claims**
   - Output should be suggestions, not automatic merges.
   - Deterministic graph scoring runs only after accepted graph edits.

3. **Suggest missing contradiction / qualification / depends_on edges**
   - LLM may propose candidate edges with rationale.
   - Human or rules engine must accept before scoring.

4. **Generate “what would resolve this?” text**
   - Example: “For C1, look for local elasticity studies or pilot-program traffic response data.”
   - The LLM explains resolution paths; it does not rank cruxes.

5. **Natural-language explanation**
   - The LLM can turn computed facts into prose.
   - All numbers, affected nodes, and rankings come from deterministic computation.

Forbidden call:

```text
“Given this graph, what are the cruxes?”
```

That would make the LLM the ranking engine, which violates the design constraint.

## 5. Failure Modes And Mitigations

1. **Hub claim looks important but is uncontested**
   - Example: “Evidence matters” supports many claims.
   - Mitigation: contestedness gate; uncontested hubs cannot be primary cruxes.

2. **Contested but isolated claim ranks too high**
   - Example: side dispute with mixed evidence but no downstream effect.
   - Mitigation: require `PositionImpact >= 0.10`.

3. **Diamond dependency double-counting**
   - Example: C1 affects C5 through C2 and C4, then both converge.
   - Mitigation: bounded propagation, tanh saturation, and redundancy-aware target counting.

4. **Composite conclusion crowds out actionable premises**
   - Example: “Benefits exceed costs” may rank above “traffic will fall.”
   - Mitigation: mark highly composite claims, apply optional atomicity modifier, and expose “expand this crux into drivers.”

5. **Bad graph structure produces bad cruxes**
   - Missing `opposes` or `undercuts` edges will distort impact.
   - Mitigation: edge provenance, graph QA checks, and LLM-assisted edge suggestions before scoring.

6. **Normative claims are treated like empirical claims**
   - Example: “Fairness matters more than efficiency” is not resolved by more data alone.
   - Mitigation: type-specific resolution UX. Normative cruxes need value tradeoff clarification, not evidence collection.

7. **Cycles cause unstable propagation**
   - Mitigation: damped fixed-point iteration, SCC detection, convergence threshold, and warning when a cycle dominates a score.

## 6. Complexity And Incremental Recompute

At target scale:

```text
Claims: 30-80
Positions: 2-5
Edges: 50-150
```

Costs:

```text
Normalize graph:              O(V + E)
Contestedness:                O(E + evidence)
One propagation run:          O(K * E), K usually <= 40
Counterfactual for all claims: O(2 * |C| * K * E)
```

Worst normal case:

```text
80 claims * 2 runs * 40 iterations * 150 edges
= 960,000 edge updates
```

That is trivial in-browser or server-side.

Incremental recompute:

- Claim status or evidence change: recompute contestedness for that claim, then rerun counterfactuals for candidates whose downstream set intersects affected nodes.
- Edge change: recompute influence graph locally, then dirty all ancestors of the target and descendants of the source.
- New claim: compute local contestedness, update reachability caches, rerun affected counterfactuals.
- Given the small graph sizes, full recompute is acceptable; incremental recompute is mainly for UI responsiveness.

## 7. Validation Against Human Judgment

Measure:

```text
Precision@3 and Precision@5 against expert-labeled cruxes
nDCG@5 for ranked agreement
Kendall tau / Spearman correlation with facilitator rankings
Coverage: percent of human crux clusters represented in top 5
Explanation faithfulness: do explanations cite actual graph features?
Ablation: remove contestedness, impact, or discrimination and measure degradation
Type calibration: empirical vs normative vs definitional crux performance
Resolution usefulness: did resolving top-ranked claims change downstream map structure?
```

Human labeling should ask raters separately:

```text
Is this claim contested?
Would resolving it change position support?
Does it separate positions?
Is it actionable/resolvable?
```

That lets you validate each signal, not only the final ranking.

## 8. Literature Consulted

- Dung, “On the acceptability of arguments…”: foundational abstract argumentation framework. Relevant for attacks and acceptability, but too all-or-nothing for Argumend’s mixed support/evidence graph.  
  https://www.sciencedirect.com/science/article/pii/000437029400041X

- Survey of abstract argumentation reasoning methods. Useful for understanding extension semantics; not recommended as the crux ranking engine.  
  https://pmc.ncbi.nlm.nih.gov/articles/PMC4318991/

- Gradual argumentation / ranking-based semantics. Relevant as inspiration for bounded iterative strength scoring.  
  https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume23/cayrol05a-html/

- h-categorizer / categoriser-style ranking semantics. Useful idea, but attack-only semantics do not capture position discrimination or evidence polarity.  
  https://ojs.aaai.org/index.php/AAAI/article/view/5697

- Betweenness centrality / Brandes algorithm. Useful diagnostic, but not sufficient for cruxes because “bridge in graph” is not the same as “belief-changing proposition.”  
  https://networkx.org/documentation/networkx-2.3/reference/algorithms/generated/networkx.algorithms.centrality.betweenness_centrality.html

- Bayesian value of information and sensitivity analysis. Strong conceptual match: prioritize uncertainties that affect decisions. Full Bayesian treatment is not recommended unless Argumend later collects calibrated probabilities and conditional probability tables.  
  https://pmc.ncbi.nlm.nih.gov/articles/PMC7034331/

- Bayesian networks overview with value of information / counterfactual queries. Relevant analogy for intervention-based impact.  
  https://pmc.ncbi.nlm.nih.gov/articles/10698603/

- CFAR / LessWrong Double Crux. Informal ancestor: a crux is a belief that would change the higher-level disagreement if changed. The proposed algorithm operationalizes that idea as contestedness plus counterfactual position-discriminating impact.  
  https://www.lesswrong.com/posts/exa5kmvopeRyfJgCy/double-crux-a-strategy-for-resolving-disagreement/