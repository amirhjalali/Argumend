# Method-as-Authority Positioning for Argumend

**Date:** 2026-04-29
**Analyst:** Research agent 06/10, brand-voice architecture swarm
**Brief:** How to make the method itself the authority — when there is no founder face, the alternative trust mechanism is "trust the process, and verify it."

## 1. The Method-as-Authority Thesis

Trust on the public internet is delegated through one of three mechanisms: a person ("trust me, I'm an expert"), an institution ("trust us, we're the *New York Times*"), or a method ("trust the process — here's how it works, you can rerun it yourself"). Argumend has no person and no institution. What it has is a process — multi-model AI argument extraction, a structured rubric, a panel of independent judges from competing AI labs, and a public taxonomy of cruxes, fallacies, and evidence with confidence scores.

**Method-as-authority is the most durable form of trust at internet scale.** A person can be discredited or burn out. An institution can be captured. A method, once published, dated, versioned, and reproducible, is the only form of trust that can survive its founders. Wikipedia frames NPOV as a "method of presentation rather than a judgment about truth" — neutrality operates "through careful sourcing and proportional representation" ([Wikipedia:NPOV](https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view)). The trust isn't in any individual editor; it's in the procedure. Peer-reviewed journals work the same way — the brand of *Nature* survives any individual editor because the brand *is* the process. Bitcoin's white paper goes furthest: trust can be replaced by a cryptographic protocol, "enforced through cryptographic rules rather than reliance on a central authority" ([Coinbase](https://www.coinbase.com/learn/crypto-basics/what-is-proof-of-work-or-proof-of-stake)).

Argumend is closer to Bitcoin's situation than to a media brand: a process, no famous founder, an AI substrate that is intrinsically reproducible. Method-as-authority is the positioning that fits the actual asset.

## 2. Five Canonical Method-as-Authority Examples

### 2.1 Wikipedia's NPOV (Neutral Point of View)

Wikipedia is, by some measures, the most-trusted reference on the open web — and **no individual editor is "the face."** The trust mechanism is the literal NPOV policy, one of three "core content policies" along with Verifiability and No Original Research ([Wikipedia:Core content policies](https://en.wikipedia.org/wiki/Wikipedia:Core_content_policies)). Jimmy Wales has called NPOV "non-negotiable" and the policy explicitly states that its principles "cannot be superseded by other policies or guidelines, nor by editor consensus." Larry Sanger drafted the original "Non-bias policy" for Nupedia in 2000 and added the canonical NPOV statement to Wikipedia in December 2001.

The five operational principles of NPOV: (1) avoid stating opinions as facts, (2) avoid stating seriously contested assertions as facts, (3) avoid stating facts as opinions, (4) prefer nonjudgmental language, (5) indicate the relative prominence of opposing views. These read like Argumend's argument-extraction rubric, and they are enforced procedurally — by checking citations, reverting edits, tagging weasel words. It is a method anyone can run.

The contrast with **Encyclopædia Britannica** is instructive. Britannica's authority was "expert authors with bylines" — a person-as-authority model. By 2012 Britannica stopped printing. Wikipedia's method-as-authority model scaled to 6.9M English articles; Britannica's topped out around 120,000. Method scales; people don't.

### 2.2 Peer-Reviewed Scientific Journals

A *Nature* paper is trusted not because Nature's editor-in-chief is famous, but because of the published review process. Nature's policy describes a procedure: manuscripts are pre-screened, then sent to "two or three reviewers" if they pass, with about 8% acceptance ([Nature Peer Review](https://www.nature.com/nature/editorial-policies/peer-review)). Nature publishes the procedure, acceptance rate, reviewer guidelines, conflict-of-interest rules, and (since June 2025) a "Transparent Peer Review" scheme where the review file is published alongside the paper ([Nature Editorial Process](https://www.nature.com/nature/for-authors/editorial-criteria-and-processes)).

The journal *brand* is the method. *NEJM*'s prestige isn't its editorial board; it's the procedure the board enforces. When you cite a paper, you cite the journal because the journal *is* the method certificate.

### 2.3 Wirecutter's Testing Methodology

Wirecutter (a *New York Times* property since 2016) is the canonical commerce-content example of method-as-authority. Tagline: "We rigorously test every product we recommend (or don't recommend)." Every recommendation links back to a "How We Test" page documenting research (20-40 hours per category), selection (50-100 candidates → 10-15 finalists), weeks-to-months of real-world testing, expert consultation, and periodic re-testing ([Wikipedia: Wirecutter](https://en.wikipedia.org/wiki/Wirecutter_(website)), [Wirecutter "How We Test"](https://www.youtube.com/watch?v=aX2IOJT15vY)).

Two elements matter: every review **links back to the methodology**, and Wirecutter publicly maintains editorial independence from its commerce operation. The method is what the consumer trusts. Affiliate publishers without an articulated method compete with Amazon listicles; Wirecutter competes with Consumer Reports and beats it on methodology pages alone.

### 2.4 Pre-Registered RCTs (AsPredicted, OSF, ClinicalTrials.gov)

In experimental science, **pre-registration is a methodological commitment that mechanically increases trust** by removing the experimenter's degrees of freedom after the fact. The Center for Open Science: "Opportunistic use of 'researcher degrees of freedom'… increases the likelihood of obtaining and publishing false-positive results, and preregistration is a mechanism for reducing such degrees of freedom" ([COS Preregistration](https://www.cos.io/initiatives/prereg)).

Three platforms: **AsPredicted** (Wharton Credibility Lab — 9 questions, time-stamped PDF, unique URL), **OSF Registries** (Center for Open Science, the most widely used), and **ClinicalTrials.gov** (US National Library of Medicine — ICMJE journals require registration as a *condition of consideration for publication*; [JMIR](https://support.jmir.org/hc/en-us/articles/115001389307)).

Trust uplift comes from the timestamp. The protocol is locked before the data is seen. You can't trust a person more than that — the timestamp is the method's signature.

### 2.5 Blockchain Consensus / Proof-of-Stake

Blockchain is the purest form of method-as-authority because it removes the human entirely. Ethereum's docs on proof-of-stake: validators "stake capital in the form of ETH into a smart contract… If they try to defraud the network… some or all of their staked ETH can be destroyed" ([Ethereum.org PoS](https://ethereum.org/developers/docs/consensus-mechanisms/pos/)). Coinbase: "agreement is enforced through cryptographic rules rather than reliance on a central authority" ([Coinbase](https://www.coinbase.com/learn/crypto-basics/what-is-proof-of-work-or-proof-of-stake)).

Bitcoin's Satoshi Nakamoto is the limit case: founder *gone*, possibly never a single person, and the network is fine. The protocol is the authority. The strongest form of "trust the method, not the person," holding a multi-trillion-dollar market for 16 years.

## 3. Argumend's Existing Methodological Assets

Argumend's codebase already contains a methodology that nobody outside the codebase can see. The following four files *are* the brand's authority — but none of them is currently surfaced on the public site.

### 3.1 The Multi-Model Judge Council
**File:** [`lib/judge/council.ts`](file:///Users/amirhjalali/argumend/lib/judge/council.ts)

The `JudgeCouncil` class (council.ts:257) coordinates multiple AI judges that run in parallel (council.ts:303), aggregates their scores (council.ts:101), explicitly **detects significant disagreement** (council.ts:160 — `findDisagreements`), and surfaces "consensus" vs. "no consensus" outcomes (council.ts:219). The default council is three judges from three competing labs ([`lib/agents/types.ts:80`](file:///Users/amirhjalali/argumend/lib/agents/types.ts) — Claude, GPT-4, Gemini). The disagreement detection threshold is 3 points on a 1-10 dimension ([`lib/judge/rubric.ts:213`](file:///Users/amirhjalali/argumend/lib/judge/rubric.ts) — `hasSignificantDisagreement`).

This is the single most defensible methodological asset Argumend owns. No competitor has it.

### 3.2 The Argument-Extraction Pipeline
**File:** [`lib/analyze/extractor.ts`](file:///Users/amirhjalali/argumend/lib/analyze/extractor.ts)

The extraction prompt (extractor.ts:145) is a 100-line system prompt that defines, in operational detail, what "extracting an argument" means: identify the topic, identify both sides, score arguments on a 1-10 scale with a strength rationale (extractor.ts:222), identify cruxes ("a crux is not just any disagreement — it's the core issue that, if resolved, would significantly change the debate" — extractor.ts:218), tag fallacies with severity levels (extractor.ts:228 — confirmed/likely/possible), detect biases with impact scores (extractor.ts:233), and report a confidence score on the extraction itself (extractor.ts:239). This is a publishable methodology document already.

### 3.3 The Six-Dimension Scoring Rubric
**File:** [`lib/judge/rubric.ts`](file:///Users/amirhjalali/argumend/lib/judge/rubric.ts)

`DEFAULT_RUBRIC` (rubric.ts:119) is a six-dimension weighted rubric: Logical Validity (22%), Evidence Quality (22%), Bias & Source Credibility (14%), Rebuttal Strength (17%), Crux Identification (13%), Clarity (12%). Each dimension has explicit low/medium/high guidelines. This is structurally identical to a peer-review rubric — it's just hidden in a TypeScript file.

### 3.4 The Crux/Fallacy/Evidence/Confidence Taxonomy
**Files:** [`types/graph.ts`](file:///Users/amirhjalali/argumend/types/graph.ts), [`types/logic.ts`](file:///Users/amirhjalali/argumend/types/logic.ts), [`lib/analyze/extractor.ts:104`](file:///Users/amirhjalali/argumend/lib/analyze/extractor.ts)

The seven node variants (graph.ts:1: meta, pillar, skeptic, proponent, crux, evidence, question), the evidence weighting model (graph.ts:33 — side, score 0-40, source, sourceUrl), and the five-tier confidence taxonomy (extractor.ts:110: very-high / high / moderate / low / very-low) are a public ontology. They should be cited, not buried.

**Argumend's methodology already exists; it just isn't legible to outsiders.** The work is curation, not invention.

## 4. The "How Argumend Works" Methodology Page

Argumend should ship a single page at `/methodology` (or `/how-it-works`) that turns the assets in §3 into something a visitor, a journalist, or an academic advisor can read in 5 minutes and cite in a footnote. Outline:

```
/methodology  —  "How Argumend Works"  —  v1.0, 2026-04-XX

1. THE QUESTION WE'RE ANSWERING
   "How do you analyze a contested topic without trusting any single source?"
   1-paragraph framing of multi-model disagreement as the unit of neutrality.

2. THE MODELS WE USE  (versioned table)
   | Provider   | Model              | Role                  | Version date |
   | Anthropic  | Claude 4.7 Opus    | Judge + Extractor     | 2026-XX-XX   |
   | OpenAI     | GPT-5              | Judge                 | 2026-XX-XX   |
   | Google     | Gemini 3 Pro       | Judge                 | 2026-XX-XX   |
   (Versions get stamped on every analysis output, like Wirecutter dates its tests.)

3. THE EXTRACTION PIPELINE
   Input → system prompt (link to lib/analyze/extractor.ts) →
   structured output (positions, cruxes, fallacies, biases, confidence).
   Show the actual JSON schema. Show the prompt.

4. THE RUBRIC  (the six dimensions, as in §3.3)
   Logical Validity (22%) | Evidence Quality (22%) | Bias & Source
   Credibility (14%) | Rebuttal Strength (17%) | Crux Identification (13%)
   | Clarity (12%). Embed the literal table from rubric.ts.

5. THE JUDGING ALGORITHM
   - Run all 3 judges in parallel
   - Each judge scores both sides on all 6 dimensions
   - Aggregate via weighted average
   - Detect disagreements where any dimension spreads > 3 points
   - Flag for review if disagreements exist OR consensus < majority

6. THE INTER-MODEL DISAGREEMENT METRIC
   "Consensus is not unanimity. We name what the judges disagreed on."
   Show a real example. Disagreement is the proof of method.

7. WHAT WE DON'T DO
   We don't editorialize. We don't suppress dissent. We don't run a
   single model. We don't claim certainty we don't have.

8. SOURCE CODE
   Every line in this page is implemented in code at:
   github.com/argumend/argumend/lib/judge/  and  /lib/analyze/

9. VERSION HISTORY
   v1.0 — 2026-04-XX — initial publication
   (every change to the rubric, model versions, or pipeline gets a row.)

10. OPEN QUESTIONS / KNOWN LIMITATIONS
    Honest disclosure of where the method is weakest.
    (e.g., "we don't yet test for jailbreak-style prompt-injection attacks
    on the judges; we don't yet handle non-English content.")
```

The format pattern to copy is **the journal style guide + Wikipedia's policy page + Wirecutter's "How We Test" combined**. Date it. Version it. Link to source.

## 5. Citing Everything as a Trust Mechanism

Methodology pages alone won't shift trust. **Every individual analysis page also needs to behave like a peer-reviewed article**: every claim has a footnote, every evidence node has a source URL, and the UI distinguishes the strength of the source.

Concrete UI proposals:

**(a) Source citations on every Evidence node.** The schema already has `source` and `sourceUrl` fields ([`types/graph.ts:36-37`](file:///Users/amirhjalali/argumend/types/graph.ts)). Surface them in the EvidenceNode component. No source URL → render a visible "[unsourced]" tag, the way Wikipedia uses `[citation needed]`.

**(b) Confidence tier in the UI.** The five-tier confidence taxonomy from `extractor.ts:110` should map to a visible UI badge:
- **Very High** — peer-reviewed, large-N study, replicated.
- **High** — peer-reviewed or large reputable outlet.
- **Moderate** — credible journalism, working paper, or single study.
- **Low** — opinion piece, advocacy source, or small-N study.
- **Very Low** — commentator opinion, social media, or anonymous source.

The tier is *visually distinct*, not just numeric. Use the existing palette: deep teal (`#3a6965`) for very-high, rust (`#C4613C`) for moderate, brown (`#8B5A3C`) for low (per [`CLAUDE.md`](file:///Users/amirhjalali/argumend/CLAUDE.md)).

**(c) "Method footer" on every analysis.** Each topic page ends with: *"Analyzed 2026-04-29 by Claude 4.7 + GPT-5 + Gemini 3 using methodology v1.0. Inter-judge disagreement on [Evidence Quality]: 4 points. [See full judge transcripts.]"* This is the academic-paper "Methods" section adapted for a web audience — and it makes every page self-auditing.

## 6. Third-Party Verification Options

A method only becomes authoritative when third parties endorse it. Five candidates, ranked by accessibility:

**6.1 Academic advisor review.** Cycle 1, file 09 of the brand-voice swarm identifies **Tim van Gelder** (rationale.online founder, argument-mapping pioneer) and **Maralee Harrell** (CMU Argument Diagrammer / iLogos creator) as the two natural candidates. A short methodology audit by either one — even an unpaid email exchange that ends with "I reviewed v1.0 of this and find it methodologically sound" — would be the highest-impact single endorsement Argumend could obtain. The ask is small (one hour of reading) and the asymmetric upside is huge.

**6.2 Open Phil / SFF / FLI grant funding.** A grant from Open Philanthropy's AI-safety pool, the Survival and Flourishing Fund, or the Future of Life Institute is **third-party validation by funder**. Argumend's "multi-model disagreement detection" framing is on-thesis for several active AI-safety RFP themes. Even a $25K micro-grant becomes a permanent footer-line: "Supported in part by [funder]." Apply.

**6.3 Reproducibility — "rerun the council on this analysis."** Add a button to every analysis page: **[Re-run the judge council with current models]**. The result is a new dated transcript, possibly different from the historical one. The button itself is the trust statement: *if you don't believe us, run it again*. This is the closest Argumend can get to Bitcoin-style protocol-as-authority. Cost: medium. Trust uplift: enormous, because no other argument-mapping site does this.

**6.4 Audit page.** A public `/audits` page that lists periodic methodology reviews, model-version updates, prompt revisions, and any bugs found in the rubric. Every entry is dated. This is the "changelog as accountability" pattern Stripe and Linear use to good effect, applied to a methodology.

**6.5 Structured public corrections.** Wikipedia has Talk pages; Nature has correction notices. Argumend should have a `/corrections` page where every retraction or correction is logged, dated, and linked from the original analysis. Mistakes admitted publicly *increase* trust; mistakes hidden destroy it.

## 7. The "Neutrality by Method, Not Person" Statement

Draft for the `/about` page:

> Argumend doesn't ask you to trust an editor. We name every model that contributed to every analysis — Claude, GPT-5, and Gemini, with versions and timestamps. We disagree publicly when our judges disagree, and we surface the disagreement instead of hiding it. The neutrality isn't a person; it's a process — and the process is open. Read the methodology, run the council yourself, and audit the code.

This paragraph does five things at once: (1) names the absence of a person ("doesn't ask you to trust an editor"), (2) names the actors (the three labs by name), (3) commits to versioning, (4) reframes disagreement as a feature, (5) issues an explicit invitation to verify. It is the brand-voice equivalent of Bitcoin's "don't trust, verify."

## 8. The "Show the Disagreement" UX

The most under-exploited asset in Argumend's codebase is `findDisagreements` ([`lib/judge/council.ts:160`](file:///Users/amirhjalali/argumend/lib/judge/council.ts)). When the three judges disagree by more than 3 points on a dimension, the disagreement is detected and stored — but not currently surfaced. **It should be the headline feature.**

When the judges agree, render a quiet "consensus" indicator. When they disagree, render it *prominently*. Concrete UX:

- **"Judges Disagree" banner** when `disagreements.length > 0`: *"The three judges disagreed on [dimension] by N points. See the divergence."*
- **Per-dimension judge-score chart** showing each model's score with spread highlighted.
- **Links to each judge's reasoning** — the verdict objects already contain `overallReasoning` per judge ([`lib/judge/rubric.ts:77`](file:///Users/amirhjalali/argumend/lib/judge/rubric.ts)). Surface them.
- **The "honest uncertainty" stance.** Disagreement isn't a bug; it's proof no single model is being trusted. Cycle 4 and cycle 6 file 05 (multi-model angle) both converge: **the visible disagreement is the brand**.

This is the move competitors cannot copy without rebuilding the multi-judge architecture. Kialo has no models. Wikipedia shows disagreement only on Talk pages. Argumend can show it on the front page.

## 9. Recommended Priorities — Top 5 Method-as-Authority Moves

Ranked by `(trust uplift) × (1 / effort)`:

| # | Move | Trust uplift | Effort | Notes |
|---|---|---|---|---|
| 1 | **Ship `/methodology` page (§4) with versioned model table, rubric, and link to source code** | Very high | 2-3 days | The "How We Test" pattern works because it's available to be linked. Single highest-leverage move. |
| 2 | **Surface judge disagreement in the analysis UI (§8)** | Very high | 1 week | Differentiator no one can copy. Turns a hidden feature into the brand. |
| 3 | **Add the "Method footer" + confidence tier badges to every analysis page (§5)** | High | 3-4 days | Makes every page self-auditing. Schema already supports it. |
| 4 | **Get one academic advisor (Tim van Gelder or Maralee Harrell) to review v1.0 of the methodology page (§6.1)** | High | 1 hour of writing + 1-2 weeks waiting | Asymmetric. The ask is tiny. The footer-line is permanent. |
| 5 | **Add the "Re-run the judge council" button on every analysis (§6.3)** | High | 1-2 weeks | The Bitcoin move. Not "trust us"; "verify us." Highest brand asymmetry vs. Kialo, Argdown, Arguman, all of whom can't offer it. |

Honorable mentions: `/audits` and `/corrections` pages (§6.4-6.5), `/methodology/changelog`, and an Open Phil / SFF / FLI grant application (§6.2). All cheap, all deferred-able.

## Sources

- [Wikipedia:Neutral point of view](https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view)
- [Wikipedia:Core content policies](https://en.wikipedia.org/wiki/Wikipedia:Core_content_policies)
- [Wikipedia:Verifiability](https://en.wikipedia.org/wiki/Wikipedia:Verifiability)
- [Wikipedia: Wirecutter (website)](https://en.wikipedia.org/wiki/Wirecutter_(website))
- [Wirecutter "How Wirecutter Tests Products" — YouTube](https://www.youtube.com/watch?v=aX2IOJT15vY)
- [Nature — Editorial criteria and processes](https://www.nature.com/nature/for-authors/editorial-criteria-and-processes)
- [Nature — Peer Review policy](https://www.nature.com/nature/editorial-policies/peer-review)
- [Nature Portfolio — Peer Review](https://www.nature.com/nature-portfolio/editorial-policies/peer-review)
- [Center for Open Science — Preregistration](https://www.cos.io/initiatives/prereg)
- [Wikipedia — Preregistration (science)](https://en.wikipedia.org/wiki/Preregistration_(science))
- [JMIR — Does my trial (RCT) have to be registered?](https://support.jmir.org/hc/en-us/articles/115001389307-Does-my-trial-RCT-have-to-be-registered)
- [PMC — Ensuring the quality and specificity of preregistrations](https://pmc.ncbi.nlm.nih.gov/articles/PMC7725296/)
- [Coinbase — What is proof of work or proof of stake](https://www.coinbase.com/learn/crypto-basics/what-is-proof-of-work-or-proof-of-stake)
- [Ethereum.org — Proof-of-stake (PoS)](https://ethereum.org/developers/docs/consensus-mechanisms/pos/)
- [Wikipedia — Proof of stake](https://en.wikipedia.org/wiki/Proof_of_stake)
- [MIT Technology Review — Ethereum's big switch to proof of stake](https://www.technologyreview.com/2022/03/04/1046636/ethereum-blockchain-proof-of-stake/)

### Argumend internal references (file paths, absolute)

- `/Users/amirhjalali/argumend/CLAUDE.md`
- `/Users/amirhjalali/argumend/lib/judge/council.ts` (esp. lines 160-214: `findDisagreements`; 257-410: `JudgeCouncil` class)
- `/Users/amirhjalali/argumend/lib/judge/rubric.ts` (esp. lines 119-186: `DEFAULT_RUBRIC`; 213-217: `hasSignificantDisagreement`)
- `/Users/amirhjalali/argumend/lib/judge/prompts.ts`
- `/Users/amirhjalali/argumend/lib/analyze/extractor.ts` (esp. lines 110-116: confidence tiers; 145-245: extraction system prompt)
- `/Users/amirhjalali/argumend/lib/agents/types.ts` (esp. lines 80-99: `DEFAULT_JUDGE_AGENTS`)
- `/Users/amirhjalali/argumend/types/graph.ts`
- `/Users/amirhjalali/argumend/types/logic.ts`
