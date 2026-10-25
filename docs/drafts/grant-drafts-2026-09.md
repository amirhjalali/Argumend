# Argumend grant application drafts, September 2026 revision

> **DRAFTS. Founder fills `[ASK]` and `[FOUNDER]` placeholders and submits. Not auto-submitted.**
>
> Supersedes `grant-drafts.md` (June 2026), which pitched the topic encyclopedia and a multi-model judge council. The product is now disagreement diagnosis: paste a real argument, get a source-only report (positions, common ground, disagreement types, one primary crux, evidence state, resolution paths), no winner, no independent verification. [spec §1, §3.3] The old structure (Manifund, ACX Grants, FLF stub, SFF stub, founder notes) is kept where it still fits.
>
> Voice: the applications are written in the first-person plural ("we", "Argumend"). Where a funder form demands a named applicant, the founder's legal name goes on the form and nowhere in the narrative, per the anonymous-brand-voice policy. Every number in this file carries a bracketed source, listed at the end. Dollar figures other than the study incentive are `[ASK]` placeholders because no repository file supports them; the June draft's recommended $25,000 to $50,000 range is carried forward as a starting point only. [old-grants]

---

## 1. Manifund (regrants)

*Format: project summary, what you will do, why this team, funding ask and use, track record. Target 500 to 800 words.*

**Project title:** Argumend: a source-only diagnosis of what two people are actually arguing about

**Funding requested:** `[ASK: $..., June draft recommended $25,000 to $50,000]`

### The problem

Most unproductive online disagreement is not a shortage of evidence. It is a failure to notice what kind of claim is being contested: empirical, causal or predictive, definitional, or value. One person brings a count to a value dispute; the other brings a principle to a factual one. The thread cannot end because no proposition has been agreed as decisive. Tools that "fact-check" or "score" an argument make this worse: the score becomes the argument, and the typed structure underneath it is never read.

### What exists

Argumend (argumend.org) has a working disagreement-diagnosis pipeline behind a feature flag. A user pastes a conversation, article, or exchange and receives six boxes: the positions (with inferred positions labeled as such), explicit common ground with quotations, the distinct disagreements classified by type, one primary crux and up to two secondary ones, the state of the evidence as the participants presented it, and what could resolve each disagreement. [spec §3.2] The hero line is chosen by deterministic rules from a fixed list; the crux ranking is a deterministic engine that the model cannot reorder. [spec §3.4; north-star]

Hard rules, all enforced by automated invariants: every quotation must be a verbatim substring of the source; no participant, position, source, or quote may be fabricated; no counter-position may be invented to create "both sides"; no winner, score, or agreement percentage; no claim of independent fact-checking; no hidden-motive or sensitive-trait inference. [spec §3.3, §16.2]

### What is measured

We blind-scored live reports against a 14-point rubric, with the scorers given only the rubric, the spec, and the raw report JSON. [evidence]

| Measure | Result | Source |
|---|---|---|
| Reports on authored sources, blind-scored | 40, mean 11.7 of 14 | [evidence] |
| Quotations verbatim to source | 390 of 390 | [evidence] |
| Invented sources, invented opponents, winner or percentage anywhere | zero | [evidence] |
| Hard-gate failures (value dispute shown as empirical) | 3 of 40; run fails until fixed | [evidence] |
| Primary crux judged not load-bearing, two independent reviews | 12 of 17 and 12 of 23 | [evidence] |
| Flagship map recovery, same model, two runs | different primary crux on all 3 maps | [evidence] |
| Stronger model on 9 paired sources | higher on 8 of 9; 12.6 mean over 12 reports vs 11.8; passes the hard gate; about 1.7x the grounded quotes; about 30% more latency | [evidence] |

The honest reading: grounding and integrity are solved; crux selection is not. The crux is wrong about half the time, and that is the box the whole product depends on.

### What the money does

Three workstreams, in this order, over about three months.

1. **The 12-person human evaluation that gates release.** The spec makes the diagnosis page the default only after twelve people, using real disagreements on a phone, clear six pass-or-fail thresholds: at least 10 of 12 rate positions accurate; at least 9 of 12 call the crux genuinely central; at most 1 of 12 believes anything was fact-checked; no repeated straw-man; at least 6 of 12 report a distinction they had not articulated; at least 4 of 12 would share. All six must pass; a near miss is a fail plus a diagnosis. [kit; spec §16.4] The kit is written (protocol, screener, five disagreements with sealed answer keys, scoring sheet, results template). It needs participants. Direct cost: 14 gift cards at $30, $420; about 16 moderator hours over two weeks. [kit] Funding lets us recruit strangers rather than friends, which the kit requires.
2. **The served-lane model choice.** The stronger model passes the hard gate the smaller one fails, at about 30 percent higher latency. [evidence] We need to run the release candidate, not the cheap one, through the study, and to carry its per-analysis cost through the closed beta at the spec's limits (3 analyses per hour, 10 per day per hashed address). [spec §11.3] `[ASK: model spend line]`
3. **The crux work.** Two engine levers were measured on a pre-registered recall harness and rejected: recall at ten moved from 0.60 to 0.70, recall at five stayed at 0.10, and each broke a named test the current engine passes. A presentation-only filter fixed 3 reviewer-named wrong primaries on the 40-report run and 2 on the 12-report run without touching the engine's order. [levers] The next step is a human crux-ranking set from the study, compared against the engine before any weight changes, as the north star requires. [north-star P2.3]

### Milestones

| When | Milestone | Evidence it happened |
|---|---|---|
| Month 1 | Three mechanical defects landed (type mismatch, count-driven pattern selection, placeholder resolution text); build frozen; pilot of two run | `results-template.md` filled for the pilot [kit, run order] |
| Month 2 | Twelve sessions run and coded; pass/fail per threshold recorded | Filled results template with verbatims |
| Month 2 | Decision: release switch (PR 9) or the named shared failure | The decision line at the bottom of the results file [kit] |
| Month 3 | If pass: diagnosis page at `/analyze`, legacy at `/analyze/legacy`, rollback by flag. If fail: the shared failure fixed and a six-person re-run | Production smoke test; six fresh participants [kit; spec PR 9] |

### Why this team

The pipeline, the rubric, the harness, and the evaluation kit are all in the public repository, and the measurements above include the failures. We are asking for money to run a study we might fail, and we have written down in advance what failure means. That is the posture we think this funder rewards.

### Track record (honest)

`[FOUNDER: launch date, current audience, or "pre-audience". The June draft's diagnosis of "in orbit, not climbing" still applies; say so.]` [old-grants] Kill criterion carried from June: if there is no community traction, citation, or grant by 2026-12-31, the project is downsized honestly.

---

## 2. ACX Grants

*Format: what it is, why it matters, what the money does, who you are. Target 500 to 800 words.*

**Project:** Argumend: typed diagnosis of real disagreements, with no winner

**Amount requested:** `[ASK: $..., June draft recommended $25,000 to $50,000]`

### What it is

Paste an argument. Get back who holds what, what they already agree on, which distinct disagreements are stacked inside the surface fight and what kind each one is, the single question somebody has actually committed to update on, and what would resolve each. Every quotation is verbatim from the pasted text. Inferred positions are labeled. There is no winner, no score, no agreement percentage, and no claim to have checked a fact. [spec §3.2, §3.3]

### Why it matters

The rationalist case for this is the old one: arguments end when they reach the proposition both parties would update on, and most never do. What we add is that the useful artifact is a typed diagnosis, not a verdict. A verdict cannot be checked. A typed diagnosis can be held against the source by anyone, including the participants, who are the people it helps most.

The reason to fund it rather than merely admire it is that we have measured it and it is not good enough yet. Across 40 blind-scored reports, quote grounding was perfect (390 of 390) and nothing was fabricated, but the primary crux was judged not load-bearing in about half (12 of 17 and 12 of 23 in two independent reviews), and the same model gave a different primary crux on all three of our flagship maps between two runs. [evidence] Three of 40 reports presented a value dispute as an empirical one, which the rubric treats as a hard failure. [evidence]

### What the money does

- **Runs the release gate.** A 12-person study on real disagreements with six pass-or-fail thresholds. [kit; spec §16.4] Incentives $420; about 16 moderator hours over two weeks. [kit] The kit exists; the participants do not.
- **Pays for the model that passes the gate.** The stronger model passed the rubric's hard gate where the smaller failed, at about 30 percent more latency. [evidence] `[ASK: model spend]`
- **Funds the crux work the study will demand.** Engine changes measured so far fail named tests; a presentation-only filter helps and does not re-rank. [levers] The next step is a human crux-ranking set, built from the study, before any weights move. [north-star P2.3]

### What we will not do with it

Add topics, add a fact-checking layer, add a score, or add an X bot. Each is explicitly deferred in the spec until the source-only diagnosis is shown to be valued. [spec §4.2, §23, §24]

### Who we are

`[FOUNDER: one paragraph in the plural voice. Legal name on the form only.]`

### Why now

The pipeline, rubric, harness, and study kit are done. The one thing between the current state and a release decision is twelve strangers and two weeks. [kit]

---

## 3. Stub: FLF "AI for Human Reasoning" fellowship

Argumend uses a model to extract the structure of a disagreement (participants, positions, claims, quotations, stated update conditions) and a deterministic engine to rank the cruxes. The model never chooses or reorders cruxes and never assesses truth; the human keeps every judgment. [spec §3.3; north-star] A fellowship term would fund the human crux-ranking dataset the north star requires before any engine tuning, built from the 12-person study and expanded with fellowship reviewers, and the comparison of engine order against it. [north-star P2.3] Current state: quote grounding 390 of 390, primary crux not load-bearing in about half of blind-scored reports. [evidence] **Ask:** `[ASK]`. **To expand:** the fellowship's output expectations and a week-by-week plan.

## 4. Stub: Survival and Flourishing Fund

Argumend is infrastructure for telling empirical, causal, definitional, and value disagreement apart in public, with no verdict layer that could be captured. The MVP is deliberately source-only; external evidence, if added, will operate on named cruxes with participant representation frozen first, so truth-assessment can never rewrite what someone said. [spec §23] The 12-month budget would cover the release study, the served-lane model cost at closed-beta limits, the crux-ranking dataset, and a second study of six fresh participants after any change. [kit; spec §11.3] **Ask:** `[ASK]`. **To expand:** the S-process framing and a 12-month budget.

---

## Budget line items (all funders; fill the placeholders)

| Line | Amount | Basis |
|---|---|---|
| Study incentives, 14 sessions at $30 | $420 | [kit] |
| Moderator time, about 16 hours over two weeks | `[ASK]` | hours from [kit]; rate is the founder's |
| Six-person re-run after any product change | `[ASK]` | 6 sessions at $30 is $180 by the same rate; hours not estimated in any file |
| Served-lane model spend through closed beta | `[ASK]` | limits in [spec §11.3]; the kit calls the study's own model cost "negligible" [kit] |
| Phone-reachable preview deployment for the study | `[ASK]` | [kit, run order step 3] |
| Engineering time: three mechanical defects, then crux dataset work | `[ASK]` | defects 2 to 4 in [evidence]; dataset in [north-star P2.3] |

---

## Notes for the founder

- **Every number above is from a repository file.** If a funder asks for one that is not (traffic, citations, revenue), give the true answer, including zero.
- **Do not reuse the June narrative.** It promised flagship maps, embeddable iframes, and a judge council. None of those is the current product and the spec defers most of them. [spec §4.2]
- **Size the ask to the study first.** The study is cheap and decisive; the model spend and engineering time are where the ask actually goes.
- **The kill criterion stays.** Funders in this space read a stated stopping rule as calibration.

### Sources

- [spec] `docs/plans/2026-08-18-argumend-v2-disagreement-diagnosis-spec.md` §1, §3.2, §3.3, §3.4, §4.2, §11.3, §16.2, §16.4, §23, §24, PR 9.
- [north-star] `docs/plans/2026-08-12-argumentgraph-north-star.md`, P2 step 3 and "What not to expand yet".
- [evidence] `docs/reviews/2026-09-15-v2-checkpoint-evidence/README.md`.
- [levers] `docs/reviews/2026-09-15-crux-levers-evidence.md` §2, §4, §5.
- [kit] `docs/research/2026-09-15-v2-human-evaluation-kit/README.md`.
- [old-grants] `docs/drafts/grant-drafts.md` (June 2026; the $25,000 to $50,000 range and the "in orbit, not climbing" phrase).
