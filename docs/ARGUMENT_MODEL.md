# The Argumend Argument Model (v1.1)

Status: v1.1 specification, 2026-08-11. Author: Fable. v1 was adversarially reviewed by Opus (`docs/reviews/2026-08-11-argument-model-v1-review.md`); all twelve amendments were accepted and are incorporated below. This document is the **stable contract** between AI extraction, stored data, APIs, the crux engine (`docs/CRUX_ENGINE.md`), and the frontend. Changes are breaking and require a `modelVersion` bump.

## Design principles

1. **Fewer types, richer edges.** Five node types, not fourteen. Premise, objection, rebuttal, counterclaim, and assumption are *roles a proposition plays*, derived from how it is wired; prediction, value judgment, and definition are the `epistemicType` field; crux is a *computed* designation. Roles-as-edges lets one proposition play several roles at once, which real propositions do.
2. **The inference is a node.** An objection attacking a premise's truth (`opposes` → CLAIM) differs fundamentally from one granting the premises and attacking the step (`undercuts` → INFERENCE). Reifying the step makes Toulmin/Pollock-style undercutting representable — the distinction today's product promises but cannot store.
3. **Evidence is attackable.** A finding's *interpretation* is as disputable as any claim: "the 700-agents figure is workload equivalence, not headcount," "deaths-per-TWh excludes the fuel-cycle front end," "UBI pilots can't speak to AI-scale displacement." The `limits_scope` edge exists for exactly this move (v1.1; the corpus makes it constantly).
4. **No orphan semantics.** Every edge type has one meaning and one allowed source/target set (matrix below). If an edge needs a footnote to explain what it means *here*, the model or the map is wrong.
5. **Provenance over confidence theater.** No naked numbers (`confidence`/`weight` require a stated basis). Every SOURCE carries an `interest` disclosure slot and a `verification` state with timestamp. Every node records `provenance` — who put it there.
6. **Facts, values, and process are distinguishable at the node level.** `epistemicType` is mandatory on CLAIMs and includes `procedural` (who decides / by what process) — both flagship corpora independently needed it.
7. **Degrade gracefully.** Anything the AI cannot determine is explicitly `unknown`/absent, never fabricated.

---

## 1. Node types

### QUESTION

The root of a topic; a genuinely open interrogative. One per topic graph (sub-questions are CLAIMs). `statement` ends in `?` and must not presuppose its answer. *Invalid:* "Why is nuclear too expensive to matter?" QUESTION participates in **no edges** — positions answer it by topic membership.

### POSITION

A recognizable stance held by real constituencies; 2–5 per topic. Positions are **attractors, not authors** — claims support/oppose positions; positions do not own claims (per-person attribution lives on claims via `attributedTo`). Fields: `label`, `statement`, `constituency`, `steelmanBasis` (what makes this rendering the strongest credible form — review anchor), `displayRank` (explicit Layer-1 ordering; see §10).

Two positions may **not** share an identical supporting-claim set (validator rule 4). Positions that agree on every empirical claim must be differentiated by reified normative/procedural claims they `depends_on` — that reified value claim is precisely what the crux engine needs to see.

### CLAIM

A proposition with a truth value (or assent value). Roles are derived, never stored:

| Traditional name | Expressed as |
|---|---|
| Premise | CLAIM with `premise_of` into an INFERENCE |
| Conclusion | CLAIM targeted by `concludes` |
| Counterclaim / objection | CLAIM with `opposes` (attacks truth) or `undercuts` (attacks a step) |
| Rebuttal | CLAIM opposing/undercutting an objection-role claim |
| Assumption | CLAIM with `implicit: true` that something `depends_on` |
| Prediction / value judgment / definition / process claim | `epistemicType`: `predictive` / `normative` / `definitional` / `procedural` |
| **Crux** | **Computed** (crux engine), curator-adjustable via `cruxOverride` + `overrideBasis` |

Required: `statement` (atomic — §5.1), `epistemicType`, `status`, `statusBasis`.

**CLAIM vs EVIDENCE decision rule (validator-enforced):** a CLAIM may restate a measurement iff it generalizes past the source's specific instrument and sample. **A CLAIM whose `statement` names a source is invalid** — "Lazard puts nuclear LCOE at $141–220/MWh" fails; "U.S. unemployment stayed near 4% through mid-2026" passes (it is a claim about the world an EVIDENCE node then supports). This is how measurements legally become premises.

### INFERENCE

A reified reasoning step: **given** [premises] **it follows that** [conclusion] **because** [warrant]. ≥1 `premise_of` in, exactly one `concludes` out.

**When to mint one (v1.1 rule — attack-driven):** create an INFERENCE where (a) some party in the source material attacks the *step* rather than the data, or (b) the step is non-obvious. Otherwise wire EVIDENCE→CLAIM or CLAIM→CLAIM directly. Do **not** reify every link — that doubles the graph with tautologous warrants.

**Warrant quality:** `warrant` is the licensing principle, and it is inadequate if recoverable by concatenating the premises and conclusion ("if tasks are hard to automate, gains will be small" is a paraphrase, not a warrant; "aggregate TFP equals the exposure-weighted sum of task-level savings" is a warrant — and the thing Acemoglu's critics actually attack). Fields: `warrant`, `warrantImplicit: boolean`, and `warrantKind`: `statistical-generalization` | `causal-identification` | `analogy` | `aggregation-model` | `is-to-ought` | `normative-principle-application` | `authority`. The kind determines which objections bite (a representativeness attack means nothing against an is-to-ought step) and is the hook for Phase 6 fallacy annotation.

Exhaustive case analyses ("if X then A; if instead Y then B") are two INFERENCEs sharing premises, plus a CLAIM asserting exhaustiveness ("X and Y are the only relevant cases") that `qualifies` both conclusions.

### EVIDENCE

An empirical anchor: a finding, dataset, event, or measurement. EVIDENCE reports; CLAIMs argue. Required: `finding`, `source` (SOURCE object), `relevance` (why it bears on what it touches — the AI must explain the connection). One EVIDENCE node per finding, reused via multiple edges — never duplicated. Weight sub-scores (`sourceReliability`, `independence`, `replicability`, `directness`, 0–10) optional but all-or-nothing with `weightBasis`; the legacy collapsed 0–40 score is deprecated. EVIDENCE can be **superseded** (status field, v1.1) — the Stanford follow-up superseding its own timing claim, RECA's expiry superseded by reauthorization — and superseded nodes are excluded from crux scoring and default rendering, shown only in provenance/history views.

### Rejected node types

PREMISE/COUNTERCLAIM/OBJECTION/REBUTTAL (roles); ASSUMPTION (`implicit: true`); CRUX (computed output; storing it freezes what must stay recomputable); VALUE_JUDGMENT/PREDICTION/DEFINITION (`epistemicType` values).

---

## 2. Edge types

| Edge | From → To | Meaning |
|---|---|---|
| `supports` | CLAIM → CLAIM/POSITION | Source true ⇒ rational assent to target rises. |
| `opposes` | CLAIM → CLAIM/POSITION | Source true ⇒ assent falls (attacks **truth**). |
| `premise_of` | CLAIM → INFERENCE | Premise of the step. |
| `concludes` | INFERENCE → CLAIM | The step's conclusion (exactly one). |
| `undercuts` | CLAIM/EVIDENCE → INFERENCE | Attacks the **warrant/step** while possibly granting premises. (EVIDENCE may undercut directly — the METR-vs-productivity-RCTs pattern: both findings true, the generalization attacked.) |
| `evidences` | EVIDENCE → CLAIM | Bears on the claim; `polarity`: `supporting` \| `challenging` \| `qualifying` required. |
| `limits_scope` | CLAIM → EVIDENCE | **(v1.1)** The finding does not measure, or does not generalize to, what it is offered for — without disputing the finding itself. ("The 700-agents figure is workload equivalence, not layoffs"; "deaths/TWh excludes fuel-cycle front-end harms"; "UBI pilots ran in full-employment economies.") |
| `qualifies` | CLAIM → CLAIM/EVIDENCE | Limits scope/strength without opposing. |
| `depends_on` | CLAIM/POSITION → CLAIM | Presupposition: if target falls, source is unfooted. |
| `contradicts` | CLAIM ↔ CLAIM | Cannot both be true. Symmetric; stored once, **lexicographically by node id** (stable Phase-7 diffs). |
| `supersedes` | CLAIM → CLAIM, EVIDENCE → EVIDENCE | Newer replaces older (same type only). |

**Allowed-pair matrix** (single source of truth; the prose above must agree with it):

| from \ to | →CLAIM | →POSITION | →INFERENCE | →EVIDENCE | →QUESTION |
|---|---|---|---|---|---|
| CLAIM | supports, opposes, depends_on, qualifies, contradicts, supersedes | supports, opposes | premise_of, undercuts | limits_scope, qualifies | — |
| EVIDENCE | evidences | — | undercuts | supersedes | — |
| INFERENCE | concludes | — | — | — | — |
| POSITION | depends_on | — | — | — | — |

Nothing points at QUESTION; nothing points from it. EVIDENCE never touches POSITION directly — evidence bears on claims, claims support positions.

**Distinctions that must never blur:**

- `opposes` (truth) vs `undercuts` (step): attacking "Vogtle's costs were real" vs "Vogtle's costs generalize."
- `opposes` vs `qualifies`: "renewables can't do reliability" opposes; "the dispute is only the last 10%" qualifies. Extraction pressure flattens qualifiers into opposition — see §5.7's split rule.
- **`depends_on` vs `supports` — decision rule (v1.1):** `depends_on` iff removing the target makes the source *false or unintelligible*, not merely less supported. Encoder test: *can you state the source's strongest defense without mentioning the target?* Yes → `supports`. No → `depends_on`. (Corrected example: "nuclear expansion is warranted" merely `supports`-links to "firm capacity is needed" — the energy-security case warrants expansion independently; it `depends_on` "nuclear generation is acceptably safe," without which the position is unfooted on every route.) **The pair `A supports B` + `B depends_on A` is forbidden** — dependence subsumes support, and the pair double-counts in crux scoring. A node with ≥2 outgoing `depends_on` to mutually independent targets draws a validator warning.
- `evidences(challenging)` vs `limits_scope`: challenging says the finding cuts *against* the claim; limits_scope says the finding doesn't bear the load it's carrying *for* it.

---

## 3. Epistemic classification and status

`epistemicType` (CLAIM, required): **`empirical`** (settleable by observation of what is/was) · **`predictive`** (settleable eventually, not now) · **`normative`** (how to value; no observation settles it) · **`definitional`** (what words/thresholds mean; settled by stipulation) · **`procedural`** (**v1.1** — who decides, by what process, with what standing; distinct from normative: there are institutional facts about legitimacy and precedent — WGA/SAG-AFTRA AI provisions, *NRC v. Texas* — that bear on it without settling it).

Mixed propositions get **split**; the corpora's "BOTH"-tagged disputes map to two linked CLAIMs (e.g. "communities are owed enforceable benefits" [normative] + "current processes deliver only hearings" [empirical]), usually joined by `depends_on` or a shared INFERENCE. When a package proposition's force is a *contrast* ("...not merely hearings"), the sufficiency claim ("hearings are insufficient") must be emitted as its own node — splitting may not delete the claim actually in dispute.

`status` (CLAIM and EVIDENCE): `uncontested` · `broadly_accepted` · `contested` · `unresolved` · `superseded`. An **editorial judgment with mandatory `statusBasis`**, never derived from edge counts — ten crank objections don't make a claim contested. Superseded nodes are excluded from crux scoring and default rendering.

`resolution` (CLAIM; expected on contested/unresolved): `{ kind, condition }` with `kind`: `existing-evidence` | `future-observable` | `definitional-choice` | `value-difference` | **`authority-allocation`** (v1.1 — resolved by allocating decision rights, not by evidence or values converging). This is the field the crux engine reads.

---

## 4. Node metadata

```ts
interface NodeBase {
  id: string;                  // stable slug, unique per topic
  type: "question" | "position" | "claim" | "inference" | "evidence";
  statement: string;           // self-contained; for EVIDENCE this is `finding`
  summary?: string;            // ≤140 chars, Layers 1–2
  tags?: string[];             // content taxonomy ("clerical-work", "care-work", "economics", …)
  provenance: {                // v1.1 — who put this node here
    origin: "source" | "extracted" | "curator";
    modelId?: string;          // when origin = extracted
    sourceRef?: string;        // where in the source material
  };
  createdAt: string;
  updatedAt?: string;
  modelVersion: 2;             // v1.1 schema (v1 was never shipped)
}

interface Claim extends NodeBase {
  type: "claim";
  epistemicType: "empirical" | "predictive" | "normative" | "definitional" | "procedural";
  status: "uncontested" | "broadly_accepted" | "contested" | "unresolved" | "superseded";
  statusBasis: string;
  implicit?: boolean;
  attributedTo?: string[];     // v1.1 — named holders ("Acemoglu", "UCS") when the map records who argues this
  resolution?: { kind: "existing-evidence" | "future-observable" | "definitional-choice"
                     | "value-difference" | "authority-allocation";
                 condition: string };
  confidence?: { value: number; basis: string };   // both or neither
  cruxOverride?: "pin" | "suppress";
  overrideBasis?: string;      // v1.1 — required iff cruxOverride set (no longer overloads statusBasis)
}

interface Position extends NodeBase {
  type: "position";
  label: string;
  constituency: string;
  steelmanBasis: string;       // v1.1 — why this is the strongest credible rendering
  displayRank: number;         // v1.1 — explicit Layer-1 ordering
}

interface Inference extends NodeBase {
  type: "inference";
  warrant: string;
  warrantImplicit: boolean;
  warrantKind: "statistical-generalization" | "causal-identification" | "analogy"
             | "aggregation-model" | "is-to-ought" | "normative-principle-application" | "authority";
}

interface Source {
  title: string;
  url?: string;
  author?: string;
  institution?: string;
  publishedAt?: string;
  kind: "peer-reviewed" | "government" | "institutional" | "industry" | "advocacy"
      | "journalism" | "primary-document" | "other";
  interest?: string;           // the disclosure line; absence = none identified
  verification: "verified-live" | "verified-content" | "bot-blocked-assumed-live" | "unverified";
  verifiedAt?: string;         // v1.1 — when verification state was established
}

interface Evidence extends NodeBase {
  type: "evidence";
  finding: string;             // = statement
  source: Source;
  relevance: string;           // REQUIRED — why this bears on what it evidences
  status?: "current" | "superseded";   // v1.1
  weight?: { sourceReliability: number; independence: number; replicability: number;
             directness: number; weightBasis: string };
  unverifiedFlags?: string[];  // research-layer honesty markers; survive into the UI
}
```

Edges: `{ id, from, to, type, polarity?, note? }`. `note` encouraged on `undercuts`, `depends_on`, `qualifies`, `limits_scope`.

---

## 5. Authoring rules

1. **Atomicity** (review + validator warning): one proposition per CLAIM; split on separable assertions. The conjunction flag has a known high false-positive rate ("caused by AI *rather than* the tech cycle" is one proposition) — reviewers may dismiss; dismissals are recorded so warning fatigue is measurable.
2. **Connectivity** (validator, v1.1 — satisfiable form): every CLAIM and EVIDENCE lies in the weakly-connected component containing at least one POSITION; every EVIDENCE has ≥1 outgoing edge (`evidences` or `undercuts`); POSITIONs are roots by topic membership. (QUESTION is edgeless by design and exempt.)
3. **Inference shape** (validator): ≥1 premise, exactly 1 conclusion; no cycles through `premise_of`/`concludes`/`depends_on`. Curator override exists for documented real-world feedback loops, with justification.
4. **Position discrimination** (validator, v1.1): every POSITION has ≥1 supporting chain AND ≥1 opposing claim; **no two POSITIONs share an identical supporting-claim set**. Strength of steelmanning is review's job, anchored on `steelmanBasis`.
5. **Balance signals** (validator warnings): a CLAIM with ≥3 same-polarity `evidences` edges warns (one-sided world or incomplete map — say which in `statusBasis`); ≥3 `evidences` edges sharing `source.institution`/`author` warns regardless of polarity (five citations tracing to one paper is not corroboration).
6. **No naked numbers** (validator): `confidence` and `weight` require their basis fields.
7. **Ambiguous polarity is an atomicity problem** (v1.1, operational rule): if a finding's polarity toward a claim is arguable ("slowing, not collapsing" — challenging or qualifying?), the claim is not atomic — **split the claim until every attached finding has an unambiguous polarity**. Validator flags any claim receiving both `supporting` and `challenging` edges from the same institution.
8. **No source attributions inside claims** (validator, v1.1): enforced via attribution-verb patterns plus the topic's own source gazetteer (§1 CLAIM rule).
9. **UNVERIFIED flags survive** extraction into `unverifiedFlags` — never silently dropped.
10. **Unexamined warrants** (pre-pass flag): every INFERENCE with `warrantImplicit: true` and zero incoming `undercuts` surfaces as "unexamined warrant" for review — a dispute the graph can't see until someone reifies it.

---

## 6. Worked example (valid v1.1 fragment)

AI-jobs flagship, 12 nodes:

```
QUESTION  q1  "Will AI cause mass unemployment in the U.S. within 15 years?"
POSITION  p1  "Displacement-now"      (displayRank 1, steelmanBasis: Stanford/ADP + Census QWI cell declines)
POSITION  p2  "Automation-panic redux" (displayRank 2, steelmanBasis: 250-year base rate + confound evidence)
CLAIM  c1  [empirical, contested]    "Early-career workers in AI-exposed occupations have suffered a
                                      relative employment decline since 2022"
CLAIM  c2  [empirical, contested]    "That decline is caused by AI adoption rather than the tech cycle
                                      or offshoring"
CLAIM  c3  [definitional, contested] "'Mass unemployment' means sustained U-3 above 10%"
CLAIM  c4  [empirical, contested, implicit] "Firms respond to AI capability primarily by reducing
                                      hiring rather than expanding output"
CLAIM  c5  [empirical, broadly_accepted] "Nearly half the tech-postings decline predates ChatGPT"
INFERENCE i1  warrantKind: causal-identification, warrantImplicit: false
              warrant: "occupation-level relative declines concentrated in exposed cells, robust to
              firm-time controls, license causal attribution"
EVIDENCE  e1  Stanford/ADP 16% relative decline (institutional, verified-live)
EVIDENCE  e2  Indeed Hiring Lab: ~half of postings decline pre-ChatGPT (industry,
              interest: "job-listings platform", verified-live)
EVIDENCE  e3  Klarna press release: assistant "did the equivalent work of 700 agents"
              (industry, interest: "company promoting its own AI deployment")
CLAIM  c6  [empirical, broadly_accepted] "Klarna's 700-agents figure measures workload equivalence,
                                      not eliminated positions"

EDGES
e1 —evidences(supporting)→ c1       c1 —premise_of→ i1        i1 —concludes→ c2
p1 —depends_on→ c2                  c5 —undercuts→ i1         c5 —supports→ p2
e2 —evidences(supporting)→ c5       c2 —depends_on→ c4        c3 —qualifies→ c2
c6 —limits_scope→ e3
```

What this shows: p1's case runs through i1 and is unfooted without c2 (`depends_on`, not a redundant supports-pair); c5 undercuts the *attribution step* while granting the decline, and the same claim is p2's supporting chain — one proposition, two roles; c4 is the inspectable hidden assumption; c3 scopes the whole predictive layer; c6 attacks what e3 is *taken to show* without disputing what it *says* — the `limits_scope` move. Both positions have support and opposition; their supporting sets differ. The crux engine finds c2 (contested, undercut, position-fork) and c3 (scoping propagation) — consistent with `CRUX_ENGINE.md` acceptance test 1.

## 7. Invalid examples

1. `{type: "objection"}` — roles are wired, not typed.
2. `X —undercuts→ c1` where c1 is a CLAIM and X disputes its *truth* — that's `opposes`; undercuts targets INFERENCE.
3. `statement: "AI is displacing juniors and firms are lying about it"` — two propositions.
4. `{type: "claim", statement: "Stanford finds a 16% relative decline"}` — source attribution inside a claim; the generalized proposition is the claim, the study is EVIDENCE.
5. `confidence: { value: 0.7 }` without basis.
6. An INFERENCE with two `concludes` edges — split, share premises.
7. A loaded QUESTION ("Why does the corpus ignore workers?").
8. `{type: "crux"}` — computed, never stored.
9. `A —supports→ B` coexisting with `B —depends_on→ A` — double-counted influence; keep the dependence.
10. `warrant: "if premises then conclusion"` restated — fails the adequacy test; articulate the licensing principle.

## 8. AI-extraction guidelines (the Analyze contract)

1. Extract atomically; prefer many small claims. Apply §5.7 when polarity is ambiguous.
2. Mint INFERENCEs **attack-driven** (§1): where the source material disputes a step, or the step is non-obvious. `A therefore B` with an obvious step is a direct edge, not an inference node.
3. Articulate warrants that pass the adequacy test; set `warrantKind`; mark `warrantImplicit` honestly.
4. Never invent status — default `contested` + basis "extracted from single adversarial source; uncorroborated."
5. Classify `epistemicType` per claim; split mixed propositions (§3); preserve contrast claims when splitting packages.
6. **Measurements**: emit the finding as EVIDENCE, the generalized proposition as CLAIM (no attributions in claims), wire `evidences` with the polarity the source claims — and when the source *itself* flags a scope limit ("these trials cannot show…"), emit the limiting CLAIM with `limits_scope`.
7. **Evidence-vs-warrant attacks**: a finding that grants another finding but breaks its generalization is `EVIDENCE —undercuts→ INFERENCE` (METR pattern), not `evidences(challenging)` on the premise claim.
8. Record source `interest` even for the extractor's own side's sources; carry hedges into `unverifiedFlags`; stamp `provenance` on every node.
9. Schema-invalid output is retried with validator errors in-context (max 2), then rejected; partial graphs allowed at extraction, resolved at merge.

## 9. Migration from the current topic format (honest accounting)

**Mechanical:** `questions[]` → summary/tag material (their `references[]` attach as SOURCE-bearing EVIDENCE, not dropped) · `evidence[]` → EVIDENCE with weight sub-scores preserved · topic `references[]` → topic-level source list.

**Requires inference or generation (adapter flags for review; does not guess):**
- `meta_claim` → QUESTION requires rewording declarative→interrogative, and **breaks the verdict copy** ("evidence strongly favors the claim" refers to a proposition the graph no longer stores) — the presentation layer needs the meta-claim retained as topic metadata alongside the QUESTION.
- `pillars[].skeptic_premise`/`proponent_rebuttal` → CLAIM pairs: mechanical-ish, but **synthesizing POSITIONs from pillars fabricates constituencies** — a cost-skeptic and a consent-skeptic are different positions. Position synthesis is editorial, per topic, with `constituency`/`steelmanBasis` written by a human or flagged.
- `crux` → CLAIM is **generation, not mapping**: no `CruxSchema` field contains a proposition (`title`/`description`/`methodology`/`cost_to_verify` describe a *test*). The claim statement must be written, then `resolution` derived from `verification_status`+`falsification`, `cruxOverride: "pin"` + `overrideBasis`.
- `evidence[].side` → `evidences.polarity` requires **per-edge inversion**: `side` is relative to the meta-claim; polarity is relative to the target claim. A "for" item attached to a skeptic claim is `challenging`. Mapped mechanically it corrupts every skeptic-side attachment. `qualifying` will be empty across migrated topics (two-valued source) — expected, documented.
- `falsification.supporter_flip`/`skeptic_flip` → two `resolution.condition` directions (concatenating is lossy; keep both in the condition text); `common_ground` → a `broadly_accepted` CLAIM both positions `depends_on` — exactly the shared-facts structure §1's discrimination rule needs.

**Mapped-or-dropped table:** `balance`/`weight`/`verdict` → topic presentation metadata, computed for new-model topics by a new function over `evidences` polarities and weights (natively-authored topics **must** populate `weight` on load-bearing evidence, or the verdict layer honestly renders "unscored" — never a fake 50) · `keystone_fact`/`simple_case` → Layer-1/2 presentation fields on topic metadata (Wave 4 consumes them; not graph nodes) · `icon_name`/`imageUrl`/`aliases` → topic metadata, unchanged · `confidence_score` → already deprecated, dies here.

**Adapters:** old→new as above. A **new→old adapter is required** for UI coexistence and is lossy by design: shared EVIDENCE has no single `side` (computed per its strongest path to the meta-claim, flagged approximate); `Source.interest`/`verification` have no old-format home and appear only in new UI. The 109 legacy topics keep rendering through the existing pipeline untouched; migration is opt-in per topic, flagship first.

## 10. Contracts for downstream waves

- **Crux engine input contract:** scoring reads `status`, `resolution`, `epistemicType`, `implicit`, edge types/polarities, and optional evidence `weight` — **never raw degree counts** as a contestedness source (§3). Edges are unweighted in v1.1; if scoring needs graded strength it uses evidence weight where present and treats edges uniformly otherwise.
- **Render ordering (Wave 4):** POSITIONs by `displayRank`; claims within Layer 2–3 by crux-engine rank, then `status` severity, then id. No implicit array-order semantics.
- **Cross-topic evidence identity (Wave 5):** SOURCE gains a global registry id when the evidence subsystem lands; `Source.url` is the provisional join key. EVIDENCE `id` stays topic-scoped in v1.1.
- **Explicitly deferred:** locale/i18n, unit normalization, multi-language sources, contributor reputation. Not v1.1 concerns.
