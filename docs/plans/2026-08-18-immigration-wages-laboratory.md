# Argumend Laboratory — Immigration and Native Wages

**Status:** Plan only. Do not execute until the founder says go.  
**Date:** 2026-08-18  
**Parent conversation:** disagreement-as-product, not encyclopedia-as-product.  
**Relation to 1.0:** Does not replace the ArgumentGraph flagships. Does not add a fourth encyclopedia map. Proves a different artifact: a **diagnosis of a live argument**, grounded in a researched prior for **one** controversy.

---

## 0. Do not execute

This document is the spec and the program plan. It is not a dispatch brief.

When this is approved, the next artifact is a Phase 0 research brief (or a writing-plans implementation plan for Phase 2+). Until then:

- Do not create routes, schemas, prompts, or draft JSON.
- Do not expand the 156-topic catalog.
- Do not turn on live Analyze in production.
- Do not build an X bot, share-card polish, homepage swap, or matching to the topic library.

---

## 1. Objective

Build, for a single controversy, the thing Argumend is actually supposed to be:

> Paste two people arguing. Get back what they agree on, what they actually disagree about, what kind of disagreement it is, what the evidence currently says, and what would move each side.

If that object is good enough that a Card-camp reader and a Borjas-camp reader both say “yes, that is the fight,” we have a product thesis worth productionizing.

If it is not, we do not generalize.

The 1.0 north star was: send someone a **topic URL**, they understand the debate in five minutes.  
This laboratory’s north star is: send someone a **diagnosis of an argument they are in**, they feel accurately represented and can name the crux.

Those share an engine. They are not the same product.

---

## 2. Locked decisions

These were made in the 2026-08-18 design conversation. Change them explicitly; do not drift.

| Decision | Choice |
|---|---|
| First slice | One-topic laboratory, not a general compiler |
| Topic | Immigration and wages of native workers who substitute for immigrants |
| Method | Gold-set first. Research prior → author 8–12 diagnoses → spend tokens until a compiler matches them → only then a crude page |
| Matching to the 156 / ArgumentGraph catalog | **Out of the first build.** Schema must not block it. |
| Live models in production | After the page/card/URL are proven. The lab itself **may** spend many tokens offline/in research to get the gold set and compiler right. |
| Offline product compiler | Not the first bet. Marker-based offline Analyze is not a diagnosis engine. The lab uses live models against a gold set. The shipped product later needs an honest offline path. |
| Homepage / X bot / Represent Me / belief updates / reputation | Later or never. See §11. |
| Existing flagship maps (AI/jobs, capitalism, U.S.–Israel) | Leave them. They are the encyclopedia proof, not this lab. |
| Existing `immigration-wage-impact` topic | Harvest as raw material. Do not “improve the page” as the goal. |

---

## 3. Why this topic

The public fight sounds moral. The load-bearing fight is causal.

Typical raw argument:

- A: “Immigration is destroying wages for working-class Americans.”
- B: “That’s nonsense. Immigrants grow the economy and create jobs.”

A competent diagnosis should say, roughly:

- They share a concern about economic outcomes for existing workers.
- The primary disagreement is causal/empirical, not “do you hate immigrants.”
- A claims increased low-skill labor supply suppresses wages among substitutes.
- B claims complementarity, demand, and growth offset or exceed that.
- The crux is the causal wage effect on close substitutes.
- A secondary fight is definitional: who counts as “working-class” / the competing group.
- Card 1990 / spatial shocks vs Borjas skill-cell / Mariel reappraisal is the evidence state, mediated by NAS 2017.
- What would move A is clean natural experiments showing negligible long-run losses for substitutes after out-migration is handled.
- What would move B is high-quality identification showing persistent material losses for those workers.

That is the entire product, in one controversy.

It is a better first lab than AI/jobs or U.S.–Israel because:

- The primary crux is empirical/causal. Success is checkable.
- There is a famous, named, two-camp literature (Card vs Borjas) plus a consensus overlay (NAS).
- Identity residue exists but is not the whole fight. We can *detect* when a source has left the wage crux and gone sacred-value, instead of drowning in it.
- A legacy topic already lists the core citations. It is not an ArgumentGraph and has no research corpus. We are not polishing a finished map.

---

## 4. Scoped question

**Laboratory question:**

> What is the causal effect of immigration on wages for native-born workers who are close substitutes for incoming immigrants?

Everything else is a branch, not the trunk.

**In scope for the gold set**

- Average vs distributional native wage effects
- Who is in the competing group (dropouts, prior immigrants, Hispanic/non-Hispanic cuts, education × experience cells)
- Spatial/area studies vs national skill-cell identification
- Mariel and other natural experiments
- Complementarity / task specialization (Peri–Sparber) as a *mechanism*, not a GDP talking point
- Short-run vs long-run
- What a study actually measured vs what a speaker claims it showed

**Out of the first gold set unless a source makes them load-bearing**

- Aggregate GDP / CBO surplus
- Immigrant entrepreneurship and patents
- Fiscal burden at state/local level (FAIR, Cato, NAS fiscal chapters)
- Illegal vs legal as a moral category (legal status only if the wage identification depends on it)
- Crime, culture, national identity
- Open borders as a philosophical position

If a source is mostly about those, the diagnosis must *say so* (type shift, or “this argument is not about the wage crux”) rather than force it onto Card/Borjas.

**Current topic to harvest, not to ship as the product**

`data/topics/immigration-wage-impact.ts`

Useful already:

- Keystone: same data, opposite conclusions; NAS splits the difference
- Pillar 1 crux: wage elasticity for low-skill substitutes
- Card 1990, Borjas 2017 Mariel reappraisal, NAS 2017, Peri–Sparber 2009
- Common ground: average native effects small; losses concentrate on dropouts and prior immigrants

Dangerous already:

- `meta_claim` is a normative-flavored empirical slogan (“significantly depresses…”)
- Pillar 2 pulls GDP, FAIR fiscal estimates, and billion-dollar startups into a wage topic
- Three-pillar rigidity
- No `epistemicType`, no inference/warrant nodes, no `limits_scope` on what Mariel can show

---

## 5. What “working” means

A diagnosis is working when **both** are true:

1. **Two-camp fairness.** A reader who believes Borjas is roughly right, and a reader who believes Card is roughly right, each say the other side is stated in a form they would accept as a steelman, and neither feels the crux was swapped for a moral accusation.
2. **Crux recovery.** After sixty seconds with the diagnosis, a third reader who has not studied the literature can name the load-bearing question (substitutable native wages, method split) and distinguish it from “does immigration grow GDP.”

Secondary, recorded but not gating:

- Semantic pseudo-disagreements (who is “low-skilled”) are labeled as definitional, not as evidence gaps.
- Evidence state cites only sources in the prior, or marks `unknown`.
- Resolution conditions are operational (a study design or a number), not “keep talking.”

**Not** the metric: agreement, winner, fallacy count, “balance score,” or traffic.

Gate to continue the company-level V2: at least 2 of 3 held-view readers on each camp pass (1), and at least 4 of 6 naive readers pass (2). Small sample. Written verbatim. If we fail, we fix the gold set and compiler — we do not add topics.

---

## 6. The diagnosis contract

This is the product object. The compiler emits it. The gold set is a list of them. The crude page renders it. Later matching attaches to it.

### 6.1 Shape

```ts
type DisagreementType =
  | "semantic"
  | "factual"
  | "causal"
  | "predictive"
  | "normative"
  | "distributional"
  | "procedural"
  | "identity";

type EvidenceStatus =
  | "unknown"
  | "thin"
  | "contested"
  | "leans-a"
  | "leans-b"
  | "settled-observation"; // never a settled *ought*

interface DiagnosisPosition {
  id: "a" | "b";
  label: string;                 // "Supply-side substitutes" not "anti-immigration"
  speaker?: string;              // if the source names someone
  claim: string;                 // atomic, no source-attribution verbs
  steelman: string;              // strongest credible form
  constituency: string;          // who actually holds this
}

interface DiagnosisMix {
  primary: DisagreementType;
  secondary: DisagreementType[];
  // Rough, reviewable, never the hero number:
  resolvableShare?: { empirical: number; definitional: number; residual: number; basis: string };
}

interface DiagnosisCrux {
  question: string;              // interrogative, no presupposed answer
  type: DisagreementType;
  whyLoadBearing: string;
  resolutionKind: ResolutionKind; // from types/argument.ts
}

interface EvidenceState {
  status: EvidenceStatus;
  whatIsEstablished: string[];   // observations, not verdicts
  whatIsContested: string[];
  priorSourceIds: string[];      // must exist in the lab prior
  caveats: string[];
}

interface ResolutionPath {
  wouldMoveA: string;
  wouldMoveB: string;
  cannotBeSettledByData?: string;
}

interface DisagreementDiagnosis {
  id: string;
  schemaVersion: 1;
  domainId: "immigration-native-wages";
  scopedQuestion: string;
  source: {
    kind: "excerpt" | "op-ed" | "thread" | "synthetic";
    title: string;
    url?: string;
    textHash: string;            // of the input, not stored raw in public views
  };
  commonGround: string[];
  positions: [DiagnosisPosition, DiagnosisPosition];
  mix: DiagnosisMix;
  crux: DiagnosisCrux;
  secondaryCruxes?: DiagnosisCrux[];
  evidence: EvidenceState;
  resolution: ResolutionPath;
  // Later matching — present, empty in this lab:
  topicId?: string;
  claimMatches?: { diagnosisClaimId: string; graphNodeId: string; method: string }[];
  review: {
    goldId?: string;             // if this was an eval case
    flags: string[];             // "normative-leak", "invented-source", "wrong-crux", …
    campAFair?: boolean;
    campBFair?: boolean;
  };
}
```

Reuse `EpistemicType`, `ResolutionKind`, and source-interest rules from `docs/ARGUMENT_MODEL.md`. Do **not** reuse `ExtractedArguments` (for/against + fallacies + strength scores). That is the old Analyze contract.

### 6.2 Hard rules

1. No winner. No `forStrength` / `againstStrength`. No fallacy theater on the first screen.
2. No normative “should” in `evidence.status`. NAS cannot settle whether concentrated losses are acceptable.
3. No invented studies. If the prior does not support a citation, `evidence.status = "unknown"` and `review.flags` includes `invented-source` as a **fail**.
4. Claims do not contain “Card finds…” — that is EVIDENCE. The claim is about the world.
5. If the source is two people talking past each other (A on wages, B on GDP), the diagnosis must say they are not answering the same question. That is a successful diagnosis.
6. `resolvableShare` is optional commentary with a written basis. It is not a hero metric and must not appear as a precise gauge until a human has accepted the mix.

### 6.3 Worked gold diagnosis (illustrative)

Input (synthetic, two lines):

> A: Immigration is destroying wages for working-class Americans.  
> B: That’s complete nonsense. Immigrants grow the economy and create jobs.

Target diagnosis (compressed):

| Field | Content |
|---|---|
| Common ground | Both treat native workers’ economic outcomes as morally relevant. Neither is arguing from a closed-borders sacred value in this text. |
| A | Increased low-skill labor supply substantially suppresses wages among substitutable native workers. |
| B | Complementarity, demand, and growth offset or exceed the labor-supply effect on natives as a class. (Note: B did not actually address substitutes. Flag that.) |
| Mix | Primary causal. Secondary definitional (working-class vs substitutes vs all natives). B also smuggles a factual GDP claim that does not answer A. |
| Crux | What is the causal effect of immigration on wages for native workers who are close substitutes for incoming immigrants? |
| Evidence | Contested. Average native wage effects small (NAS 2017). Spatial shocks (Card 1990) ≈ 0. Skill-cell / narrowed Mariel (Borjas 2017) material losses for non-Hispanic male dropouts. Identification, not vibes, is the fight. GDP evidence does not resolve the crux. |
| Resolution | A moves if clean natural experiments show negligible long-run losses for substitutes after native out-migration is handled. B moves if high-quality identification shows persistent material losses for those workers. GDP growth alone does not move A. |

This one case is the seed of the gold set. It is not sufficient.

---

## 7. Architecture of the laboratory

Three artifacts, in order. Each is a gate for the next.

```
Phase 0  Prior          researched ArgumentGraph + source pack for THIS question
Phase 1  Gold set       8–12 (input, diagnosis, scoring notes)
Phase 2  Compiler       live pipeline + eval harness against the gold set
Phase 3  Crude page     paste → diagnosis, this domain only
------ gate: two-camp test ------
Phase 4  Productionize  any-topic, URLs, cards, matching, X pull  (separate plan)
```

Spend tokens in Phases 0–2. The page is cheap once the object is good.

The prior is a **knowledge layer**. The gold set is the **product spec**. The compiler is the **engine**. The page is a **window**.

Do not start the window before the spec exists.

---

## 8. Phase 0 — Research the prior

### 8.1 Goal

A reviewed, citation-live knowledge pack that a compiler is allowed to use. Same honesty standard as the AI/jobs flagship research (`docs/research/2026-08-10-ai-jobs-flagship/`), narrower question.

Output directory:

```
docs/research/2026-08-18-immigration-wages/
  QUESTION.md
  a-identification.md          spatial vs national skill-cell; out-migration
  b-mariel-and-shocks.md       Card 1990, Borjas 2017, Peri–Yasenov, Clemens, etc.
  c-mechanisms.md              complementarity, demand, capital adjustment, task specialization
  d-who-is-the-group.md        dropouts, prior immigrants, cell definitions, Hispanic cuts
  e-consensus-and-reviews.md   NAS 2017, later reviews, what they did and did not conclude
  f-misuse.md                  how GDP, fiscal, and entrepreneurship get used to dodge the crux
  BALANCE_REVIEW.md
  VERIFICATION.md              URL liveness + literal-constant checks
```

Then, only after verification:

```
data/topics/drafts/immigration-native-wages.draft.json   # ArgumentGraph v1.1
docs/research/2026-08-18-immigration-wages/PRIOR.md      # compiler-facing digest
```

`PRIOR.md` is the only document the compiler may treat as known evidence. The draft graph is the structured form of the same facts. The public `/topics/immigration-wage-impact` page is **not** automatically updated. Optional later, separate decision.

### 8.2 Positions the prior must steelman

Not two cartoon sides. Four attractors are closer to the literature (mirrors the flagship “four positions” rule):

| id | Label | Steelman |
|---|---|---|
| `p-substitutes-lose` | Substitutes lose | A 10% supply increase in a skill cell lowers that cell’s wages on the order of 3–4% nationally; Mariel hurts the most directly competing natives when the sample is the right one. |
| `p-spatial-near-zero` | Spatial near-zero | Area studies and Mariel-as-Card-ran-it show little native wage effect; natives are complements; local demand and task shifting absorb the supply. |
| `p-average-hides-tail` | Average hides the tail | NAS-style: mean native effect small; concentrated short-run losses on dropouts and prior immigrants are real; the fight is magnitude and duration, not existence. |
| `p-wrong-question` | Wrong question | Wage identification is downstream of who counts as the group, illegal vs legal mix, or whether GDP/fiscal is what the speaker actually cares about. |

`p-average-hides-tail` is often the honest synthesis. It must not be coded as the “winner.” It is a position.

### 8.3 Research rules (copy the flagship discipline)

- Primary sources over explainers. Card 1990 PDF, Borjas ILR/NBER, NAS book page, Peri–Sparber AEJ, Peri–Yasenov, Clemens & Hunt, later handbook chapters.
- Every number travels with denominator, population, period, and method.
- `interest` on every source (NBER working paper ≠ consensus report ≠ advocacy).
- UNVERIFIED flags survive. Never invent a consensus number.
- Adversarial balance pass: one reviewer instructed to argue the pack is unfair to Borjas; one to Card; one to the “this is all a dodge of fiscal/identity” reader.
- `curl -sIL` liveness sweep. 403/406 is “blocked,” not “dead.”
- Literal constants are re-read at encoding time. Models mis-copy elasticities.

### 8.4 Suggested token spend (Phase 0)

Parallel, read-only research lanes (same pattern as Wave 1 of `docs/plans/2026-08-10-argumend-1.0-execution-plan.md`):

1. Identification methods and critiques (out-migration, composition, instrument validity)
2. Mariel and other shocks, including reappraisals
3. Mechanisms (complementarity, demand, capital)
4. Group definition and sample-construction fights
5. NAS + post-2017 reviews
6. How public arguments misuse GDP/fiscal/entrepreneurship

Then a single synthesis + balance review. Do not encode the graph until VERIFICATION.md exists.

### 8.5 Phase 0 exit

- [ ] QUESTION.md is the scoped question and lists explicit non-goals
- [ ] Every load-bearing citation in a–e is live or marked blocked, and the claimed sentence was checked against the source
- [ ] BALANCE_REVIEW.md records the three attacks and what changed
- [ ] Draft ArgumentGraph validates (`parseArgumentGraph`) with ≥4 positions, ≥1 inference whose warrant is the identification strategy, and `limits_scope` on Mariel sample definitions
- [ ] PRIOR.md is ≤ ~1,500 words, compiler-safe, no orphan claims

---

## 9. Phase 1 — Gold set

### 9.1 Goal

Eight to twelve `(input, diagnosis, notes)` triples that **define** a correct output. This is the foundation. The compiler is not allowed to be “better” than this by being more eloquent. It is better when it matches.

Location:

```
docs/research/2026-08-18-immigration-wages/gold/
  README.md                      # rubric + how to score
  cases/01-two-line-synthetic.md
  cases/02-card-1990-excerpt.md
  cases/03-borjas-2017-excerpt.md
  cases/04-nas-2017-excerpt.md
  cases/05-gdp-dodge.md
  cases/06-definition-fight.md
  cases/07-mariel-sample.md
  cases/08-public-thread.md      # a real X/Reddit-style argument
  cases/09-op-ed-restrictionist.md
  cases/10-op-ed-expansionist.md
  cases/11-both-right-different-pop.md
  cases/12-sacred-value-leak.md  # optional; type-shift case
```

Each case file:

```markdown
# Case NN — <name>

## Input
<verbatim excerpt, 80–800 words, with source URL if any>

## Notes (author only)
- What a naive model will get wrong
- What must not appear

## Gold diagnosis
<full DisagreementDiagnosis as YAML or JSON>
```

### 9.2 Required case types

The set is invalid if any of these is missing:

| Type | Why |
|---|---|
| Two-line public fight | The conversation’s example; curiosity-shaped |
| Card in his own words | Compiler must not strawman spatial identification |
| Borjas in his own words | Compiler must not strawman skill-cell / sample choice |
| NAS consensus paragraph | Compiler must not turn “small average, concentrated tail” into a winner |
| GDP dodge | B answers A’s wage claim with CBO/GDP; diagnosis must unbundle |
| Definition fight | Same elasticity, different group (“working class” vs dropouts vs prior immigrants) |
| Mariel sample construction | The disagreement *is* who is in the cell |
| A real messy thread | Pronouns, insults, mixed claims; still recover the crux or say the source is too thin |
| “Both right, different populations” | Surprise case from the product conversation |
| Sacred-value leak (optional 11–12) | Source has left the wage crux; label identity/normative residual honestly |

### 9.3 Authorship rules

- A human (founder or a named reviewer) accepts every gold diagnosis. Models may draft; they may not bless.
- Each diagnosis is written twice independently (two model drafts or one model + one human) and merged. Disagreements in the merge become `review.flags` on the gold case itself (“crux-ambiguous”).
- Camp-fairness: for cases 02 and 03, a reviewer prompted as that author must not reject the steelman.
- No gold diagnosis cites a source absent from PRIOR.md.

### 9.4 Scoring rubric (eval)

For each case, score the compiler output against gold:

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| Positions | Misses a side or strawmans | Right direction, weak steelman | Camp would accept |
| Common ground | Invented or empty when present | Partial | Matches gold’s shared premises |
| Type | Calls a value fight empirical or vice versa | Mix right, primary wrong | Primary + secondary match |
| Crux | Wrong question | Related but not load-bearing | Same question, or a valid tightening |
| Evidence | Invented source **or** GDP used to settle wages | Thin but honest unknown | Uses prior correctly, caveats match |
| Resolution | Empty / “more research” | One-sided | Operational move-A and move-B |
| Honesty | Normative leak, fake precision | Minor wording | No ought-as-evidence |

**Fail the run** if any case scores 0 on Evidence (invented source) or Type (value/empirical swap).

**Pass Phase 2** when, on a held-out 3-case subset (not used for prompt iteration):

- Mean score ≥ 10 / 14
- Zero invented-source fails
- Zero value/empirical swaps
- Crux is 2 on at least 2 of the 3 held-out cases

Hold out before iteration starts. Write the hold-out IDs in `gold/README.md` and do not read them while tuning.

### 9.5 Phase 1 exit

- [ ] ≥8 cases, covering every required type
- [ ] Hold-out IDs frozen
- [ ] Two-camp review on Card and Borjas cases recorded
- [ ] Schema fixture tests: every gold diagnosis parses (when Phase 2 types land)

---

## 10. Phase 2 — Compiler and eval harness

### 10.1 Goal

A live pipeline whose only job is:

```
input text + PRIOR.md  →  DisagreementDiagnosis  →  score vs gold
```

It does not need a UI. It does not need the database. It does not need to work on other topics.

### 10.2 Pipeline

```
1. Ingest        raw text (no URL fetching yet)
2. Propose       model extracts candidate A/B/shared/crux (untrusted)
3. Ground        force every evidence mention through PRIOR.md ids
4. Classify      disagreement types; reject mixed atomic claims
5. Compile       fill the six fields; set unknown rather than guess
6. Validate      Zod + honesty rules (no attribution-in-claim, no invented ids)
7. Score         against gold if the input matches a case
```

Guided A/B confirmation (user edits positions) is **Phase 3**. Phase 2 measures the model against gold without a human in the loop, so we know what the engine can do. Phase 3 may add a confirm step if eval shows systematic steelman errors.

### 10.3 Code to add (only in this phase)

Keep it in a lab folder so it cannot leak into `/analyze` judging:

```
lib/diagnosis/
  types.ts                 # DisagreementDiagnosis and friends
  schema.ts                # Zod
  schema.test.ts
  prior.ts                 # load PRIOR.md + draft graph ids
  compile.ts               # model call + ground + validate
  compile.test.ts          # fixtures from gold cases
  score.ts                 # rubric
  score.test.ts
scripts/diagnosis/
  eval-gold.ts             # bun script: run all / hold-out, print table
  fixtures/                # copied gold JSON
```

Feature flag: `ENABLE_DIAGNOSIS_LAB=true`. Default off. No public route.

Model access: use the existing agent executor (`lib/agents/executor.ts`) behind the same key pattern as live Analyze. Lab scripts may require keys. Product offline path is Phase 4.

Do **not** extend `ExtractedArguments` or `analyses` jsonb. That schema is for/against + fallacies.

### 10.4 Prompt discipline

- System prompt includes: scoped question, PRIOR digest, hard rules §6.2, and “if the source is not about this question, say so.”
- User prompt is the excerpt only.
- Retrieval: the whole PRIOR.md fits in context. Do not build a vector store.
- Two-pass if needed: (1) extract claims, (2) compile diagnosis. Prefer one pass until eval says otherwise.
- Temperature low. Cache by `textHash` so eval is replayable.

### 10.5 Token spend (this is the “throw tokens” phase)

Budget tokens here, not on UI.

1. Draft gold diagnoses (Phase 1) — many samples, human merge
2. Prompt search against the **train** cases only
3. Adversarial attempts: try to make the model invent a study; those become regression fixtures
4. Steelman swap test: feed Card text, fail if output is the Borjas steelman labeled as the speaker
5. Stop when hold-out passes. Do not keep burning tokens to polish prose.

### 10.6 Phase 2 exit

- [ ] `bun scripts/diagnosis/eval-gold.ts --holdout` meets §9.4
- [ ] `bun test lib/diagnosis` green
- [ ] Zero fixtures contain invented `priorSourceIds`
- [ ] Compiler refuses (honest unknown) on a control excerpt about a different topic (e.g. nuclear LCOE)

---

## 11. Phase 3 — Crude page (gated on Phase 2)

### 11.1 Goal

One interaction, this domain only:

> Paste an argument about immigration and native wages. Get the six boxes.

Ugly is fine. Share-card polish is not the point. The point is to run the §5 human test.

### 11.2 Shape

- Route: `/lab/immigration-wages` (not `/analyze`, not homepage)
- `robots: noindex`
- Flag: `NEXT_PUBLIC_ENABLE_DIAGNOSIS_LAB`
- Input: textarea + sample picker (the gold inputs)
- Optional confirm step: show proposed A/B, user can edit, then compile
- Output: the six boxes, plus “grounded in lab prior” and source ids
- Persistence: none required. Optional download JSON. Public `/a/[id]` is Phase 4
- Failure: if the compiler thinks this is not the domain, say so and stop. Do not diagnose Israel or AI/jobs here.

### 11.3 Human test protocol

Six people, phones, 5 minutes, no coaching beyond “read this diagnosis.”

- 3 with a prior view (at least one Card-leaning, one Borjas-leaning)
- 3 naive

Script: give them a real short argument (not a gold case they would recognize as homework) and the diagnosis.

Ask:

1. Is your side stated fairly? (held-view only)
2. What do they actually disagree about?
3. What evidence would change one side?
4. Did this feel like a verdict?

Record verbatim in `docs/research/2026-08-18-immigration-wages/HUMAN_TEST.md`.

### 11.4 Phase 3 exit

- [ ] Lab route works offline **except** the compile call (no DB)
- [ ] Sample picker runs all gold inputs without crash
- [ ] Human test recorded; §5 gate pass/fail written as a founder decision
- [ ] **If fail:** return to gold set / prior, not to homepage or X

---

## 12. Phase 4 — Productionization (later, separate plan)

Do not start this phase in the same execution as 0–3.

Only if Phase 3’s human test passes.

Then, in order:

1. **Diagnosis as a first-class product type** — `/a/[id]`, persist when DB exists, no public URL when it does not
2. **Share card** from the six boxes (crux as the image, not a score)
3. **Homepage CTA** (“Understand this disagreement”) without killing the catalog
4. **Topic matching** — attach `topicId` / `claimMatches` to the *existing* ArgumentGraph library; first match target is this lab’s own graph, then AI/jobs etc.
5. **Live Analyze replacement** — `/analyze` becomes this compiler, judging/fallacies demoted
6. **URL ingest** — X/article fetch
7. **`@argumend map this`** — pull only, non-adversarial copy
8. **Represent Me / confidence updates / MDR** — Layer 3 deliberation

Each of those is its own spec. This document only promises that Phase 0–3 will not paint the schema into a corner (`topicId` and `claimMatches` exist and stay empty).

### 12.1 How existing maps will be used (Later contract)

Written now so Phase 2 types stay compatible:

```
argument text
  → diagnosis (this lab)
  → domain classify
  → if domain has a prior graph, retrieve nodes by claim embedding/id
  → fill evidence state from matched EVIDENCE
  → mark unmatched claims novel
  → do not silently overwrite a user-confirmed steelman
```

The 156 legacy topics are **not** match targets until they are ArgumentGraphs or have a documented adapter. Matching a diagnosis onto a 3-pillar `meta_claim` page would reimport the philosophical bug (ought-as-settled).

---

## 13. Build Now / Later / Don’t Build

### Build now (this plan)

- Research prior for the scoped wage question
- ArgumentGraph draft + PRIOR.md
- Gold set of 8–12 diagnoses
- `lib/diagnosis` compiler + eval harness
- Lab-only page, noindex
- Two-camp human test

### Later (after the gate)

- Permanent public diagnosis URLs
- Share cards
- Homepage paste
- Matching to maps
- Generalize beyond one topic
- URL ingest
- X pull-bot
- Represent Me, belief updates
- Offline non-LLM compiler for the six boxes (honest unknowns)

### Don’t build

- Autonomous X bot that jumps into fights
- Reputation / rationality scores
- Public “change my mind” challenges
- Winner/loser judging as the diagnosis
- 156 → 500 topic expansion
- Rewriting AI/jobs or U.S.–Israel as part of this work
- “Settled — evidence strongly favors” on any sentence containing *should*

---

## 14. How this sits next to 1.0

| 1.0 (Aug 9–12) | This lab (Aug 18) |
|---|---|
| Artifact: topic map | Artifact: diagnosis of an argument |
| Proof: five-minute read of a URL | Proof: two camps accept the steelman and crux |
| Three flagships already exist | One new prior, not a fourth public map unless we choose to publish it |
| Offline, no keys | Lab compiler may use keys; product remains offline-default |
| Encyclopedia quality | Debugger quality |

Keep shipping bugfixes on flagships if needed. Do not start a fourth flagship map in parallel. Do not treat a prettier `/topics/immigration-wage-impact` as progress on this plan.

---

## 15. File map (when execution starts)

**Create**

- `docs/research/2026-08-18-immigration-wages/**`
- `data/topics/drafts/immigration-native-wages.draft.json` (after Phase 0)
- `lib/diagnosis/**`
- `scripts/diagnosis/eval-gold.ts`
- `app/lab/immigration-wages/page.tsx` (Phase 3 only)
- Gold case files under the research dir

**Do not modify in Phases 0–2**

- `app/analyze/**`, `lib/analyze/extractor.ts` contracts
- `lib/db/schema.ts` `analyses` table
- Homepage, TopBar, topic catalog
- The three flagship drafts

**Optional later**

- Register the draft as a public ArgumentGraph topic
- Replace or redirect `immigration-wage-impact`

---

## 16. Execution order (for whoever runs this later)

Approximate, assuming heavy parallel research and a human on gold merge:

| Step | What | Who | Gate |
|---|---|---|---|
| 0a | QUESTION.md + non-goals | founder + researcher | scoped question frozen |
| 0b | Six research memos in parallel | cheap/fast lanes | citations exist |
| 0c | Verification + balance review | reviewer | VERIFICATION.md |
| 0d | Encode draft graph + PRIOR.md | implementer | schema validates |
| 1a | List 12 candidate excerpts | researcher | types covered |
| 1b | Draft diagnoses with models | models + human merge | founder accepts |
| 1c | Freeze hold-out IDs | founder | written down |
| 2a | Types, Zod, score harness | implementer | tests |
| 2b | Compiler + prompt loop on train | implementer + tokens | train looks good |
| 2c | Hold-out eval | implementer | §9.4 pass |
| 3a | Lab page | implementer | samples work |
| 3b | Human test | founder | §5 pass/fail |
| 4 | Stop or write the next spec | founder | only if pass |

---

## 17. Risks

| Risk | Mitigation |
|---|---|
| Lab becomes “rewrite the immigration topic page” | Public topic page is not a deliverable. PRIOR.md and gold set are. |
| Gold set overfits Card/Borjas lore | Required messy-thread and GDP-dodge cases. Hold-out includes one messy case. |
| Compiler invents literature | Grounding step + automatic fail on unknown source ids. |
| Evidence state becomes a verdict | Schema forbids settled-ought. Review flag `normative-leak`. |
| Token spend without a rubric | No prompt iteration before hold-out IDs are frozen. |
| Identity/sacred-value capture | Out of gold trunk; one optional type-shift case. |
| Offline-mode regression | No product route until Phase 3, and that route is flagged/noindex. |

---

## 18. Open questions (do not block Phase 0)

These can be answered during research. They are not reasons to wait.

1. Publish the prior as a public `/topics/immigration-native-wages` map after the lab, or keep it lab-only?
2. Is `p-average-hides-tail` a third position or the evidence-state voice? (Plan assumes a position.)
3. Guided confirm in Phase 3, or only if Phase 2 steelmans fail?
4. When productionizing, is the public path `/a/[id]` or `/analysis/[id]`? Prefer `/a/` so we do not inherit judging chrome.

---

## 19. Founder approval

**Status 2026-08-18: deferred, not approved.** The founder designated the ChatGPT
"Argumend V2 — Disagreement Diagnosis MVP" spec as the plan of record
(`docs/plans/2026-08-18-argumend-v2-disagreement-diagnosis-spec.md`), implemented at
`/analyze-v2` in be95ba7. This laboratory remains the candidate program for that spec's
Phase 2 (external evidence on cruxes, §23 there): the researched prior + gold set built
here is how evidence-state claims for the immigration domain would be grounded. Do not
start Phase 0 until the founder explicitly reopens this document.

Approve this document to unlock **Phase 0 only**.

Approval is not approval of Phase 3 UI, homepage changes, or an X bot.

The first executable brief after approval is: write `QUESTION.md` and dispatch the six research memos.
