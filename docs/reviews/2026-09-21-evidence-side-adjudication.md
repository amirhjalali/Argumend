# Evidence `side` adjudication across the topic library (2026-09-21)

Reviewer: Fable. Branch `jev/evidence-adjudication`. Follows the 2026-09-17 side audit
(`docs/reviews/2026-09-16-jev-typesafe-probe.md`, addendum F), which fixed three wholesale-inverted
maps. This pass widened the net to confidence 0.8, added per-topic agreement to the harness, and
adjudicated every flagged card plus every card on every topic below 75% agreement.

**Result:** 236 cards read in full against their pillar framing and meta claim. 23 labels were wrong
and are fixed. 27 were judged genuinely ambiguous (two-directional cards that should be split, not
relabelled). The remaining 186 were correct — Jev's disagreements on them are model artifacts, not
data errors. Four topics change verdict quadrant.

An independent second reader reviewed the flips; §2 records the four changes that came out of that
exchange (two of my calls reverted, three further flips applied, one declined). §11 lists the cards
that should be removed or split rather than relabelled, and §12 records how little separates
"contested" from "settled" on these maps.

---

## 1. What `side` means

`side: "for" | "against"` is **for or against the topic's `meta_claim`**. It is not relative to the
pillar's thesis, not relative to the pillar's `skeptic_premise`, and not a statement about whether
the finding is good news. The site computes `balance` (and through it the public verdict) by summing
`calculateEvidenceScore(weight)` over the `for` cards against the `against` cards
(`lib/schemas/topic.ts`), so a mislabelled card moves the headline verdict of a live page.

## 2. Method

1. `bun scripts/jev-probe/expF-side-audit.ts 0.8` over all 1,567 cards in 156 topics. The script was
   extended to group agreement by topic, print every topic under 90%, mark those under 75% as
   whole-map candidates, and persist every scored card (not just the flagged ones) so adjudication
   and false-negative sampling could run off one API pass.
2. Adjudication set = the 80 cards where Jev disagreed at confidence ≥ 0.8, **plus** all 185 cards on
   the 18 topics below 75% agreement, **plus** one card referred by the second reader
   (`scott-cost-disease` / `haircut-counterexample`, which Jev flagged only at 0.43). Union: 236 cards.
3. Each card was read in full — title, description, source — alongside its pillar's `skeptic_premise`
   and `proponent_rebuttal` and the topic's `meta_claim`, then judged **label correct / label wrong /
   genuinely ambiguous**. Jev is a flag, not a verdict: 58 of the 80 flagged labels survived —
   31 outright correct, 27 defensible-but-two-directional — and 22 were changed; the 23rd change came
   from outside the flagged set.
4. Bonus: 60 cards where Jev and the label agree, sampled one-per-topic with a fixed seed, read for
   false negatives (§8).

### Second reader

An independent reader agreed with 20 of the original 22 flips. Four changes came out of that
exchange, each re-read from the card text before acting:

- **Reverted `housing-affordability-crisis` / `minneapolis-mixed-results` to `against`.** It was my
  lowest-confidence call and the reader is right that the card is two-directional: the title and the
  "1% of new units" finding point one way, the rent outcome the other. Reclassified `AMB`. This
  restores the topic to "contested."
- **Reverted `rfk-health-policy` / `ntp-fluoride-monograph` to `for`.** My own inconsistency. Both the
  pillar's `skeptic_premise` and its `proponent_rebuttal` explicitly invoke the NTP monograph — the
  skeptic as "harm only above twice the US dose," the proponent as "a documented dose-dependent risk"
  justifying fresh review. That is the identical shared-fact structure I left alone on the PFAS GenX
  card, and the "Crucially… more than twice" clause is a scope qualifier, which elsewhere in this
  review I treated as limiting force without reversing direction. Reclassified `AMB`.
- **Applied three further flips** (`scott-cost-disease` / `haircut-counterexample`,
  `obesity-personal-responsibility` / `personal-agency-cross-cultural`, `pandemic-preparedness` /
  `strategic-national-stockpile-depletion`). Rationale for each is in the §5 table.
- **Declined one.** The reader also proposed `pandemic-preparedness` / `cdc-test-failure` → `for`, on
  the ground that the cards' own reasoning concedes the investment argument. That is true of the
  stockpile card, whose `reasoning` field ends "However, proponents argue this demonstrates the need
  for institutional reforms… rather than against investment itself," and whose core finding is a
  quantified under-investment (12M N95 masks against a projected need of 3.5 billion — a purchasable
  gap). It is not true of the test-kit card, whose `reasoning` field reads "Directly demonstrates that
  institutional failure can negate preparedness investment," and whose failure modes — a contaminated
  reagent at a CDC facility and an FDA authorisation bottleneck — are capability failures that no
  budget line buys. The two cards look alike and are not: one is a shortfall, the other is a botch.
  `cdc-test-failure` stays `AMB`.

### Decision rule used

To keep 236 judgments consistent:

- **Wrong** — no available reading of the card's own text supports its label. Typically the
  description was later hardened for accuracy and now refutes its own headline, or the card records
  an outcome that contradicts the claim it is filed under.
- **Ambiguous** — the headline supports the label but the body materially qualifies or reverses it,
  or the card explicitly carries findings in both directions. These are atomicity defects
  (`docs/ARGUMENT_MODEL.md` §5.7): the fix is to split the card, not to flip the sign. Left unchanged.
- **Correct** — the card supports its label on the plain reading, whatever Jev said.

### Jev's `confidence` is certainty, not class probability

Worth recording because it governs how the threshold should be read. Three control probes on a
synthetic for/against pair returned `confidence` 1.0 with `probabilities {for: 1, against: 0}`, and
0.7 with `{for: 0.15, against: 0.85}`. So for a binary choice `confidence ≈ 2·p_max − 1`: the 0.8
threshold is p ≥ 0.90, and a disagreement at confidence 0.02 is a coin flip, not a claim. Several of
the low-agreement topics are low purely because of near-zero-confidence disagreements
(`nuclear-regulatory-capture` at 0.00, `remote-job-listings` at 0.02, `mv-policy-moderation` at 0.03).

## 3. Headline numbers

| | 2026-09-17 (threshold 0.9) | 2026-09-21 (threshold 0.8) |
|---|---|---|
| cards scored | 1,567 | 1,567 |
| agreement with the library label | 1,353 = 86.3% | 1,379 = **88.0%** |
| disagreements at/above threshold | 79 across 44 topics | **80 across 55 topics** |
| topics below 75% agreement | not computed | **18** |

The 1.7-point agreement gain is the three maps fixed on 2026-09-17 (`open-weight-ai-models` now 88.2%,
`transgender-athletes-sports` 87.5%, `obesity-personal-responsibility` 66.7% — the last still low,
see §6).

**Adjudication outcome across the 235 cards read:**

| decision | count |
|---|---|
| label correct | 186 |
| label wrong (fixed) | 23 |
| genuinely ambiguous (left; card should be split) | 27 |

All 27 ambiguous cards and 22 of the 23 wrong labels were in the flagged 80; of the 156 non-flagged
cards read (155 on the sub-75% topics plus the second reader's referral), one was wrong.

## 4. Per-topic agreement, topics under 90%

`!!` marks the 18 whole-map candidates (under 75%). Every card on every `!!` topic was read.

| topic | agreement | agree/cards | flagged ≥0.8 |
|---|---|---|---|
| !! seed-oils-health | 50.0% | 6/12 | 2 |
| !! simulation-hypothesis | 50.0% | 6/12 | 1 |
| !! remote-work-permanence | 50.0% | 4/8 | 2 |
| !! death-penalty-deterrence | 62.5% | 5/8 | 1 |
| !! social-media-age-limits | 62.5% | 5/8 | 0 |
| !! space-exploration-value | 62.5% | 5/8 | 1 |
| !! homeschooling-effectiveness | 62.5% | 5/8 | 1 |
| !! eacc-vs-tech-regulation | 64.3% | 9/14 | 2 |
| !! us-iran-conflict | 66.7% | 8/12 | 4 |
| !! microplastics-health-crisis | 66.7% | 8/12 | 0 |
| !! obesity-personal-responsibility | 66.7% | 8/12 | 4 |
| !! rent-control-effectiveness | 66.7% | 8/12 | 2 |
| !! immigration-national-identity | 66.7% | 4/6 | 1 |
| !! rfk-health-policy | 68.8% | 11/16 | 2 |
| !! doge-federal-cuts | 68.8% | 11/16 | 4 |
| !! mandatory-voting | 71.4% | 5/7 | 1 |
| !! gain-of-function-research-ban | 71.4% | 5/7 | 2 |
| !! central-bank-digital-currency | 71.4% | 5/7 | 0 |
| school-phone-bans | 75.0% | 9/12 | 1 |
| sugar-tax-effectiveness | 75.0% | 9/12 | 0 |
| consciousness-ai-systems | 75.0% | 9/12 | 2 |
| drug-decriminalization | 75.0% | 6/8 | 0 |
| big-tech-antitrust | 75.0% | 6/8 | 0 |
| ev-environmental-impact | 75.0% | 6/8 | 0 |
| college-value-proposition | 75.0% | 6/8 | 0 |
| billionaire-wealth | 75.0% | 6/8 | 2 |
| government-platform-bans | 75.0% | 6/8 | 0 |
| longevity-anti-aging | 75.0% | 6/8 | 1 |
| minneapolis-shooting | 75.0% | 3/4 | 1 |
| artificial-reproduction-ethics | 77.8% | 7/9 | 0 |
| pandemic-preparedness | 78.6% | 11/14 | 2 |
| tiktok-ban | 78.9% | 15/19 | 0 |
| ai-white-collar-displacement | 78.9% | 15/19 | 3 |
| immigration-border-crisis | 80.0% | 8/10 | 2 |
| ai-in-education | 80.0% | 8/10 | 1 |
| standardized-testing-debate | 80.0% | 4/5 | 0 |
| space-colonization-feasibility | 80.0% | 4/5 | 0 |
| veganism-environmental-impact | 80.0% | 4/5 | 0 |
| psychedelics-mental-health | 80.0% | 4/5 | 1 |
| scott-cost-disease | 81.3% | 13/16 | 2 |
| trump-tariffs | 81.3% | 13/16 | 2 |
| ai-job-displacement | 82.4% | 14/17 | 1 |
| pfas-forever-chemicals | 83.3% | 10/12 | 1 |
| intermittent-fasting-efficacy | 83.3% | 10/12 | 0 |
| vertical-farming-viability | 83.3% | 10/12 | 1 |
| epstein-files | 83.3% | 10/12 | 1 |
| china-taiwan-invasion | 83.3% | 10/12 | 1 |
| ai-risk | 83.3% | 10/12 | 1 |
| ai-regulation | 83.3% | 10/12 | 1 |
| ai-superintelligence-timeline | 83.3% | 10/12 | 0 |
| tiktok-brain-rot | 83.3% | 10/12 | 2 |
| loneliness-epidemic | 83.3% | 10/12 | 0 |
| return-to-office-productivity | 83.3% | 10/12 | 1 |
| lab-diamonds-ethics | 83.3% | 10/12 | 2 |
| free-will | 83.3% | 10/12 | 0 |
| meaning-without-religion | 83.3% | 5/6 | 1 |
| alternatives-to-democracy | 83.3% | 5/6 | 0 |
| lab-leak-theory | 85.7% | 18/21 | 1 |
| affirmative-action-meritocracy | 85.7% | 12/14 | 1 |
| cryptocurrency-value | 85.7% | 6/7 | 0 |
| ai-deepfakes-truth-collapse | 85.7% | 6/7 | 0 |
| assisted-dying-euthanasia | 85.7% | 6/7 | 0 |
| ukraine-peace-terms | 87.5% | 14/16 | 0 |
| police-reform | 87.5% | 7/8 | 1 |
| immigration-wage-impact | 87.5% | 7/8 | 0 |
| ai-content-labeling | 87.5% | 7/8 | 1 |
| organic-food-health | 87.5% | 7/8 | 0 |
| gene-editing-embryos | 87.5% | 7/8 | 0 |
| moon-landing | 87.5% | 7/8 | 0 |
| transgender-athletes-sports | 87.5% | 7/8 | 1 |
| psychedelic-therapy-hype | 87.5% | 7/8 | 1 |
| facial-recognition-policing | 87.5% | 7/8 | 1 |
| open-weight-ai-models | 88.2% | 15/17 | 0 |
| moloch | 88.9% | 16/18 | 1 |
| four-day-work-week | 88.9% | 8/9 | 0 |
| nuclear-fusion-timeline | 88.9% | 8/9 | 0 |

**No topic below 75% turned out to be wholesale inverted.** That is the important negative result: the
three-map pattern found in September was real but is not repeating. Low agreement now tracks
meta-claim wording (§7), not systematic authoring error.

---

## 5. Adjudication — the 80 flagged cards, plus one referral

`WRONG` = fixed in this branch. `AMB` = genuinely ambiguous, left unchanged. `OK` = label correct,
Jev wrong.

| topic | pillar | card | old | Jev | verdict | rationale |
|---|---|---|---|---|---|---|
| seed-oils-health | oxidation-and-processing | Industrial Seed Oil Extraction Uses Hexane Solvent | for | against 0.98 | **WRONG → against** | Every fact in the body defuses the headline: residues capped at 1 mg/kg and "orders of magnitude lower" than harmful; the only harm named (peripheral neuropathy) is not in the meta claim at all. Nothing here supports "major driver of inflammation, obesity, metabolic disease." |
| seed-oils-health | epidemiological-evidence | Seed Oil Consumption Rose 1,000-Fold Alongside Obesity | for | against 0.88 | OK | The parallel rise is genuinely offered in support; the confounding sentence limits its force without reversing it. A qualifier, not a defusal. |
| simulation-hypothesis | trilemma | Hypothesis Risks Being Unfalsifiable | against | for 0.94 | OK | Unfalsifiability cuts against the simulation claim. Jev is misled by the meta claim's own second sentence ("whether the claim is even testable, remains contested"), which an unfalsifiability card superficially confirms. |
| remote-work-permanence | economic-social-dynamics | US Office Vacancy Rate Hits Record ~20% | against | for 0.87 | **WRONG → for** | A record office vacancy rate four years after 2020 is direct evidence the office shift is durable. The label confuses "this is costly" with "this won't happen"; the pillar's proponent text itself does not dispute the vacancy, only its implication. |
| remote-work-permanence | productivity-innovation | Patent Filing Rates Roughly Stable | for | against 0.99 | AMB | Headline (flat patents = no innovation collapse) is pro; the body concedes "the link to remote work is not established" and appends a Nature finding that distributed teams produce fewer breakthroughs. Two findings of opposite polarity in one card — split it. |
| death-penalty-deterrence | justice-and-error | Victim Family 'Closure' Claims | for | against 0.97 | **WRONG → against** | The card debunks the closure argument ("empirical research finds little support… can be retraumatizing… many families actively oppose"). The map's own proponent text concedes the rationale is "empirically weak." Filed as pro-death-penalty evidence it credits the claim with its own refutation. |
| us-iran-conflict | nuclear-program | Iran Amasses 408 kg of 60% HEU by 2025 | for | against 1.00 | **WRONG → against** | Opens "After the US withdrawal, Iran progressively exceeded JCPOA limits." Escalation from verified compliance to 408 kg *under* maximum pressure is evidence the policy did not make the region safer. Filed pro because the proponent cites the stockpile as justification — justification is not outcome. |
| us-iran-conflict | nuclear-program | US-Israel Strikes on Natanz, Fordow, Isfahan | for | against 0.91 | **WRONG → against** | One pro clause (surface infrastructure destroyed) against three anti: deepest halls disputed, DIA assessed the setback as "months rather than years," and the IAEA lost continuity of knowledge — a monitoring regression, not a safety gain. |
| us-iran-conflict | proxy-warfare | Iran-Backed Militia Kills 3 US Soldiers at Tower 22 | for | against 1.00 | **WRONG → against** | Americans killed by Iranian proxies under maximum pressure is an outcome against "has made the Middle East safer." Decisive tell: the sibling `houthi-red-sea` describes the same phenomenon (proxy aggression despite sanctions) and is correctly labelled `against`. |
| us-iran-conflict | sanctions-effectiveness | Iran's GDP Halved and Currency Collapsed | for | against 0.85 | AMB | Coherent both ways: an adversary's economy halved is a strategic interest advanced (pro), and it is the core of the humanitarian objection (anti). The map already carries the humanitarian reading separately as `medicine-shortages`, so the pro label is not double-counting. Left. |
| obesity-personal-responsibility | glp1-revolution | GLP-1 Drugs Carry ~$1,000-1,350/Month List Prices | for | against 1.00 | **WRONG → against** | Drug pricing says nothing about what causes obesity; the only causal language in the card is "a condition shaped by the food environment," which is the counterclaim, and the access-inequity argument is a structural-determinants argument. |
| obesity-personal-responsibility | glp1-revolution | 67% of Weight Regained After Discontinuation | for | against 0.99 | AMB | The card itself states both readings ("Proponents argue… biological defense; skeptics argue… pharmaceutical dependency"). A shared fact, not a mislabel. |
| obesity-personal-responsibility | food-environment-design | Countries with Similar Food Industries Differ | for | against 1.00 | **WRONG → against** | *Initially marked AMB; changed on second reading, after reading the `reasoning` field.* The author already downgraded this card for false balance — `directness` cut to 3, and the reasoning states outright that "as evidence for the 'personal choice' thesis they are weak," that Japan and Korea's outcomes reflect "themselves systemic solutions," and that "the comparison cannot support the inference that personal choice dominates." Description, reasoning and weight were all corrected; only `side` was left, and the 2026-09-17 whole-map flip then moved it the wrong way. |
| obesity-personal-responsibility | genetics-and-biology | US Obesity Tripled in 50 Years | for | against 0.80 | OK | Anti-genetic-determinism evidence supports the meta claim's second clause ("framing it as a disease… undermines personal responsibility"). Jev reads "environmental change" as systemic and misses that the claim is partly about the disease framing. |
| rfk-health-policy | fluoridation | 2024 NTP Monograph: Harm Above 1.5 mg/L | for | against 0.82 | AMB | *Initially marked WRONG; reverted on second reading.* Both pillar texts explicitly claim the monograph — the skeptic as "harm only above 1.5 mg/L, more than double the US recommendation," the proponent as "a real inverse association… at higher doses" justifying fresh review. Same shared-fact structure as the PFAS GenX card. The "Crucially… more than twice" clause limits the finding's scope without reversing it. |
| rfk-health-policy | institutional-reform | Two-Thirds of MAHA Reviewers Had Industry Ties | for | against 1.00 | **WRONG → against** | Ends "MAHA's own process replicated rather than cured them." The same Nestlé finding is cited by the sibling `nestle-no-policy`, correctly labelled `against` — an internal contradiction within one map. |
| doge-federal-cuts | service-disruption | Congress and Courts Blocked the Deepest Cuts | for | against 0.98 | **WRONG → against** | The factual content is that DOGE's proposals were rejected as excessive. The pro reading is a spin the card attributes to proponents, not a finding. |
| doge-federal-cuts | claimed-vs-verified-savings | GAO Estimates $233-521B Annual Fraud Losses | for | against 1.00 | AMB | Off-claim rather than mis-signed. The card's own caveat says the figure "cannot be read as money DOGE actually identified or recovered," so it establishes the problem, not the achievement — but it is not evidence against the achievement either. Recommend reframe or removal. |
| doge-federal-cuts | reform-vs-capacity | 99.8% Receive Positive Performance Reviews | for | against 0.98 | AMB | Same shape as above: evidence the reform was warranted, not that it worked. Treated consistently with the GAO card. |
| doge-federal-cuts | legality-due-process | Trump v. Slaughter Could Overturn Humphrey's Executor | for | against 0.87 | OK | Within the legality pillar, expanded removal power vindicates the theory underpinning DOGE. Consistent with the sibling `scotus-workforce-stay` (`for`, Jev only 0.30 against). Speculative, but correctly signed. |
| eacc-vs-tech-regulation | democratic-governance | EU AI Act: First Comprehensive AI Law, but Outdated | for | against 0.98 | OK | The title's operative clause and the substantive content (three years to negotiate, drafted pre-ChatGPT, enforcement not until 2027) are the anti-regulation case. Jev anchors on "first comprehensive AI law." |
| eacc-vs-tech-regulation | democratic-governance | Congressional Hearings Reveal Tech Illiteracy | for | against 0.98 | OK | Legislative incompetence supports "unregulated advancement creates more benefit than harm." A second-order card: the evidence bears on the regulator, not the technology, which is what Jev misses. |
| gain-of-function-research-ban | enforcement-verification | BWC Has No Verification Mechanism | against | for 0.85 | OK | In the enforcement pillar the operative question is whether a ban would work; fifty years of an unverifiable BWC says no. Jev reads persistent bioweapons programs as confirming the risk. |
| gain-of-function-research-ban | enforcement-verification | DNA Synthesis Screening Could Monitor GOF | for | against 0.86 | OK | Supply-chain screening is the proponent's feasibility answer to the unenforceability objection, quoted almost verbatim in the `proponent_rebuttal`. |
| homeschooling-effectiveness | socialization-development | Civic Participation Comparisons | for | against 0.89 | AMB | Two pro findings (giving, volunteering) and two anti (registration, local voting), plus an explicit debunk of a pro-homeschool talking point. Also orthogonal to a meta claim about test scores. Split or drop. |
| immigration-national-identity | social-cohesion-trust | Putnam: Ethnic Diversity Reduces Social Trust | for | against 0.86 | OK | Diversity lowering social trust is the meta claim's core ("transform… social cohesion"). Jev over-weights "Initially" and the closing note about long-run inclusive identities. |
| mandatory-voting | practical-implementation | Voter Suppression Counterfactual Analysis | against | for 0.96 | **WRONG → for** | The card's own final sentence: "Proponents argue an enforced compulsory-voting regime… would blunt these tactics." It argues *for* compulsory voting and was filed against it. |
| rent-control-effectiveness | alternative-approaches | Vienna's Social Housing Model | for | against 0.98 | OK | Consistent with the map's treatment of Auckland and Minneapolis: supply-side success supports the meta claim's causal mechanism (supply drives rents, so supply-suppressing policy raises them). Weak and indirect, but coherent with its siblings. |
| rent-control-effectiveness | alternative-approaches | Auckland Upzoning Lowered Rents 22-28% | for | against 0.84 | OK | Direct support for the mechanism the meta claim names ("by discouraging new construction and reducing housing supply"). Jev penalises it for not mentioning rent control. |
| space-exploration-value | scientific-strategic-value | Robotic Missions Cost a Fraction of Crewed | against | for 0.83 | AMB | Both readings hold: robotic science per dollar supports "sufficient returns" (Jev), while an internal-allocation critique of a human-spaceflight-heavy budget supports the label. Left. |
| ai-content-labeling | free-expression-impact | China Mandated AI Content Labeling From 2023 | against | for 1.00 | **WRONG → for** | The card's own summary is a feasibility precedent — "establishes that a major jurisdiction has imposed mandatory labeling, offering a real-world precedent." The guilt-by-association reading that would justify `against` appears nowhere in the text. |
| ai-in-education | learning-outcomes | Khanmigo Piloted at Scale, Efficacy Limited | for | against 1.00 | **WRONG → against** | The card is a null finding: no controlled efficacy trial, and the one pilot examined surfaced "equity and infrastructure barriers… rather than measured learning gains." Adoption is not outcome, and the meta claim is about closing achievement gaps. |
| ai-job-displacement | labor-market-impact | Upwork Finds Uneven Early Displacement | for | against 1.00 | OK | Documents AI-attributable earnings declines of 8-10% in two occupations — genuine support for "fundamentally transform." The "not a broad collapse" line corrects the card's own stale id (`freelance-rate-collapse`), not the meta claim. |
| ai-regulation | innovation-stifling | NIST AI RMF: A Non-Binding Middle Path | for | against 1.00 | **WRONG → against** | The card explicitly presents a voluntary framework as "a 'third option' between heavy pre-deployment licensing and no governance at all" — an argument that pharma/nuclear-style regulation is *not* required. |
| ai-risk | orthogonality-thesis | Current AI Shows Little Spontaneous Goal-Seeking | against | for 0.98 | AMB | The card annotates itself: "this 'against' claim is now contested," and the source line says "now partly contradicted." A true core (base models) plus a strong counter-finding (Apollo scheming evals). Split: the Apollo result deserves its own `for` card. |
| ai-white-collar-displacement | historical-precedent | Goldman: 300 Million Jobs Exposed | for | against 0.93 | AMB | Goldman's exposure estimate (pro) with the ILO's augment-not-destroy conclusion appended (anti). |
| ai-white-collar-displacement | economic-incentives | Klarna Replaced 700 Agents, Then Reversed | for | against 0.91 | AMB | The card states its own two-sidedness: "evidence of both aggressive AI substitution and its real-world limits." |
| ai-white-collar-displacement | economic-incentives | McKinsey: Timeline Accelerated by a Decade | for | against 0.94 | OK | Headline finding (60-70% of activities automatable, timeline pulled in ten years) is direct support; the "activities ≠ occupations" note is a qualifier. |
| affirmative-action-meritocracy | race-conscious-vs-neutral | Texas Top 10%: Diversity Through Segregation | for | against 0.94 | OK | The card's subject is the *limits* of the race-neutral alternative (capped at 75%, no departmental diversity, works only because schools are segregated) — the necessity argument. Jev reads only the first clause. |
| billionaire-wealth | economic-impact | European Wealth Tax Outcomes | for | against 0.97 | **WRONG → against** | Twelve OECD wealth taxes down to four, repealed for capital flight and disappointing revenue, is the skeptic's case against the meta claim's remedy ("should be prevented through taxation"), quoted almost verbatim in the `skeptic_premise`. |
| billionaire-wealth | political-power | Giving Pledge Outcomes | against | for 0.95 | **WRONG → for** | An IPS finding that signatories' wealth outgrows their giving under a legally unenforceable pledge debunks the philanthropy defence. It supports the meta claim, not the counterclaim. |
| china-taiwan-invasion | us-deterrence-credibility | US Wargames Project Heavy Losses | for | against 0.85 | AMB | Heavy US losses erode deterrence credibility (pro); "still, in most runs, repelling the invasion" cuts the other way. |
| consciousness-ai-systems | functional-consciousness | Butlin & Long: No Current AI Conscious, No Barrier | against | for 0.97 | AMB | The card says it "cuts both ways." Against "current," for "near-future… could" — the meta claim is a disjunction the card straddles. |
| consciousness-ai-systems | functional-consciousness | Chalmers: Not Now, Successors Might Be | against | for 0.99 | AMB | Same shape. "Non-trivial chance within a decade" maps onto the meta claim's "near-future… could," while the concrete obstacles map onto "current." The conjunct "creating moral obligations toward them" is unsupported either way. |
| consciousness-hard-problem | competing-theories | GWT: Prefrontal Broadcast Explains Access | against | for 0.90 | OK | The body is the empirical success of a physicalist theory; the closing concession that GWT does not address phenomenal consciousness is a qualifier the map already carries elsewhere. |
| cryptocurrency-regulation | regulatory-framework-design | EU MiCA: First Comprehensive Framework | against | for 0.93 | OK | Turns on the meta claim's qualifier — "regulated **like traditional financial instruments**." MiCA is the bespoke alternative the skeptics advocate. Easy to misread; Jev does. |
| epstein-files | accountability-gap | Maxwell Convicted, Sentenced to 20 Years | against | for 0.89 | OK | A conviction is the accountability the claim says was not achieved; "only one person was held accountable" is carried separately by `no-further-prosecutions`. |
| facial-recognition-policing | accuracy-and-bias | Near-Perfect Algorithms, Bias Not Erased | against | for 0.95 | AMB | Title is literally "X, but Y": threefold error reduction (anti-restriction) and persistent relative disparity (pro-restriction). |
| global-housing-bubble | institutional-foreign-investment | Short-Term Rentals Pushing Up Rents | for | against 0.97 | OK | Speculation-driven rent pressure is one of the three drivers the meta claim names; "real but localized" limits magnitude, not direction. |
| housing-affordability-crisis | zoning-supply-constraints | Ending Single-Family Zoning Had Modest Impact | against | for 0.87 | AMB | *Initially marked WRONG; reverted on second reading.* Two-directional: the title and the "only about 1% of new units" finding support the label, the rent outcome (12% stock growth, 1% rent growth against 14% statewide) supports the flip. Split it. Topic stays "contested." |
| immigration-border-crisis | border-security-enforcement | Record 2.47M Encounters in FY2023 | for | against 0.99 | AMB | FY2023 precedes the asylum restrictions the meta claim bundles in, so this is the baseline the companion card measures against — a problem-statement card, like the DOGE GAO card, rather than a mis-signed one. |
| immigration-border-crisis | humanitarian-concerns | Only 14% of Asylum Cases Granted | for | against 0.89 | AMB | Headline supports the exploitation argument; the caveats (5%-to-90% judge variation, 5× representation effect) undercut the inference that grant rates measure merit. |
| iran-war-justification | diplomatic-alternatives | Post-JCPOA Initiatives Have Stalled | for | against 0.90 | OK | Exhausted diplomatic alternatives is the justification argument this pillar exists to test. Note the contrast with `us-iran-conflict` above: that map asks whether the policy *worked*, this one whether force is *justified*, so the same facts legitimately take opposite sides. |
| jones-act | national-security | A Documented Mariner Shortage | for | against 0.82 | OK | A century of protection coinciding with a mariner shortfall undercuts the security benefit the meta claim says is outweighed. Consistent with siblings `turbo-activation` and `fleet-collapse`. |
| lab-diamonds-ethics | economic-impact | Lab-Grown Reached ~Half of US Ring Sales | for | against 0.88 | **WRONG → against** | Adoption is explicitly price-driven, not ethics-driven, and the card's only normative content is that it is "reducing revenue for producing nations" — the harm this pillar's skeptic argues. Nothing in it supports "lab-grown is the ethical choice." |
| lab-diamonds-ethics | economic-impact | Botswana's Reserves Deplete by 2050 | for | against 0.86 | OK | The proponent's rebuttal to the economic-dependency objection: the transition was coming regardless, so lab-grown is not the cause of the harm. |
| lab-leak-theory | furin-cleavage | 2025 Research on FCS and Pathogenesis | for | against 0.84 | OK (weak) | Sits in the FCS pillar as support for the insertion's functional significance. Bears on origin only at one remove; a weight review would serve it better than a side change. |
| longevity-anti-aging | biological-mechanisms | Senolytics Tested in Early Human Trials | for | against 1.00 | **WRONG → against** | A null result filed as support. The 2019 pilot had no control arm; the 2023 randomised placebo-controlled trial "found NO statistically significant changes in frailty, pulmonary, or physical function," and the card concludes the only controlled trial "did not demonstrate functional benefit." |
| meaning-without-religion | ethics-without-god | Both Religious and Secular Ethics Have Roles | for | against 0.98 | AMB | Finds secular ethics beneficial (pro) but not alone sufficient (anti), and says so explicitly. The symmetry matters: the same finding applies to religious ethics. |
| meritocracy-myth | social-mobility-data | Immigrant Families Show Upward Mobility | against | for 0.80 | AMB | Headline (mobility is real) is anti; the mechanism the card names — "immigrants settling in higher-opportunity areas, not innate cultural advantage" — is place-determines-outcomes, which is the meta claim. |
| minneapolis-shooting | conflicting-accounts | DHS Claims Self-Defense | against | for 0.99 | OK | Correct under the operative reading (excessive force vs justified). Jev is right on the literal meta claim, which asserts *that a dispute exists* — so the federal account confirms it. The meta claim needs rewording (§7). |
| moloch | cooperation-has-expanded | Arms-Control Treaties Reversed a Race | against | for 0.96 | AMB | The compound meta claim makes coordination successes unassignable: a counterexample to "systematically pushes toward bad equilibria" (anti) *and* an instance of "a coordination mechanism strong enough to override the incentives" (pro). |
| nuclear-renaissance-smr | smr-economics | Vendors Claim Factory Fabrication Will Cut Costs | for | against 0.89 | OK (weak) | Vendor marketing, explicitly flagged unvalidated. Correctly signed but low-value; the right fix is its `weight`, not its `side`. |
| pandemic-preparedness | institutional-readiness | CDC Botched Initial COVID Test Kit | against | for 0.99 | AMB *(flip declined)* | The failure modes are a contaminated reagent at a CDC facility and an FDA authorisation bottleneck — capability failures no budget line buys, which is exactly the pillar's point and the card's own stated reasoning ("Directly demonstrates that institutional failure can negate preparedness investment"). Unlike the stockpile card above, nothing here describes a shortfall money would have closed. But "we were unprepared" still reads naturally as an argument to invest, so: ambiguous, not correct. |
| pandemic-preparedness | institutional-readiness | Strategic National Stockpile Depleted | against | for 0.99 | **WRONG → for** | *Initially marked AMB; changed on second reading.* The core finding is a quantified under-investment — 12M N95 masks against a projected need of 3.5 billion, with the HHS OIG finding the SNS "had not maintained adequate supplies." Under a claim that governments *should* invest heavily, a 290-fold shortfall is the canonical argument for. "Lacks political constituency" is about the difficulty of sustaining investment, not its desirability, and the card's own reasoning concedes the proponent reading. |
| pfas-forever-chemicals | cleanup-bans-feasibility-cost | GenX: Replacement EPA Judged More Toxic | against | for 0.87 | AMB | Both pillar texts explicitly claim this fact — the skeptic as futility, the proponent as "the strongest argument *for* regulating PFAS as a class." A shared fact by the map's own admission. |
| police-reform | use-of-force-accountability | Body Camera RCT Results | for | against 0.93 | AMB | Rialto's 50% reduction (pro) against the DC null (anti), in one card. |
| psychedelic-therapy-hype | clinical-evidence | Psilocybin Efficacy Signals, Head-to-Head Missed | for | against 0.97 | AMB | Four trials in one card with opposite signs, and a title that says so. The clearest split candidate in the library. |
| psychedelics-mental-health | policy-regulatory-path | Oregon: First State to Legalize Psilocybin | for | against 0.96 | OK (weak) | Genuine policy movement toward the meta claim's "should be approved" clause, though the card disclaims clinical approval and outcome data. |
| return-to-office-productivity | retention-vs-control | Gallup: Remote and Hybrid Above On-Site | for | against 1.00 | **WRONG → against** | The card's conclusion is explicit: "Rather than showing that more office time raises engagement, the data suggests that flexibility… not strict full-time RTO, tracks with the best outcomes." Filed as evidence RTO improves outcomes. |
| school-phone-bans | academic-performance | Norway: Girls' Grades Improve, Boys' Don't | for | against 0.93 | OK | Real gains on three of the meta claim's outcomes (grades, wellbeing, 46% less bullying) for half the population. "Significantly" is qualified; the direction is not. |
| scott-cost-disease | baumol-effect | Flat Output Breaks the Pure-Baumol Story | against | for 0.85 | **WRONG → for** | Flat NAEP against doubled real per-pupil spending *is* the meta claim ("cost rose several-fold with little or no matching gain in measured output"), and "Baumol alone doesn't explain it" is the meta claim's second clause ("a stack of reinforcing causes rather than any single villain"). Labelled against the pillar's sub-hypothesis instead of the topic claim. |
| scott-cost-disease | bennett-hypothesis | K-12 Has the Disease Without the Subsidy | against | for 0.97 | **WRONG → for** | Same error. It affirms cost disease in a named sector and affirms multi-causality. |
| scott-cost-disease | baumol-effect | The Haircut Counterexample *(not flagged — Jev 0.43; referred by the second reader)* | against | for 0.43 | **WRONG → for** | The third instance of the same pillar-relative error, which I had skipped on scope grounds rather than substance. The card says "Baumol alone can't explain the outliers" — verbatim the meta claim's second clause ("a stack of reinforcing causes rather than any single villain") — and says nothing against the first clause, since haircuts are not among the named sectors. |
| tiktok-brain-rot | educational-outcomes | Largest-Ever Drop in PISA Reading | for | against 0.92 | OK | Documents the degradation the meta claim asserts; the COVID confound is carried as its own `against` card, so the pairing is coherent. |
| tiktok-brain-rot | educational-outcomes | Meta-Analysis Shows Small Negative Association | for | against 0.97 | OK | r = −0.07 with a CI excluding zero is small but correctly signed; the card reports its own modesty honestly. |
| transgender-athletes-sports | retained-physiological | Hemoglobin Normalizes, Muscle Declines Partly | for | against 1.00 | AMB | Deliberately two-directional: endurance markers converge in four months (pro), strength and muscle area remain above cisgender-female levels at 36 months (anti). Split, don't flip — the map was already wholesale-corrected on 2026-09-17 and re-inverting one card would undo part of that. |
| trump-tariffs | inflation-passthrough | HBS Finds Consumers Absorb 43% | for | against 1.00 | AMB | The card says outright that it "complicat[es] both the 'China pays' claim and the 'tariffs are a pure consumer tax' claim." |
| trump-tariffs | strategic-decoupling | November 2025 US-China Truce at 10%-on-10% | for | against 0.80 | OK | The map's steelman for the leverage argument; the de-escalation from 125% is double-edged but the label is defensible. |
| us-national-debt-crisis | reserve-currency-privilege | Foreign Share of US Debt Declining | for | against 0.95 | OK | The pillar's stated risk is that eroding foreign demand triggers a repricing; a fall from ~50% to ~30% is that signal. |
| vertical-farming-viability | feeding-world-vs-niche | Profitable on High-Value Crops | for | against 0.92 | OK | The card names itself: "This is the proponent's actual, defensible business model." It supports "economically viable"; the "major pillar" clause is contested by its siblings. |

## 6. Adjudication — remaining cards on the 18 sub-75% topics

All 155 non-flagged cards on these maps were read. None required a change. Grouped findings, with
every card individually judged:

**seed-oils-health** (10 remaining) — all correct. `ratio-shift-historical` and
`eicosanoid-imbalance-animal` are Jev coin flips (0.07, 0.52) on cards that legitimately support the
harm claim. `aldehyde-below-threshold` (against, Jev for 0.15) and `israel-paradox` (against, Jev for
0.32) are honestly hedged cards whose operative first claim still cuts against harm; the remaining six
agree at ≥0.93.

**simulation-hypothesis** (11 remaining) — all correct. Every disagreement is sub-0.71 confidence.
The 50% agreement is entirely a meta-claim artifact: the claim is a disjunction that ends "whether the
claim is even testable, remains contested," so sceptical cards look like confirmations of the claim's
own hedge.

**remote-work-permanence** (6 remaining) — all correct. `remote-job-listings` (for, Jev against 0.02)
and `gallup-employee-engagement` (for, Jev against 0.59) are plainly pro-durability.

**death-penalty-deterrence** (7 remaining) — all correct. `dp-nas-review` (against, Jev for 0.63) is
the clearest meta-claim artifact in the set: the NRC's "not informative" finding literally restates
the meta claim's own hedge ("whether it actually deters is empirically unresolved") while weakening
the justification the claim asserts. `dp-plea-bargain` (Jev against 0.09) is noise.

**social-media-age-limits** (all 8) — all correct, 0 flagged. Jev misreads feasibility and
enforcement cards (`australia-implementation` 0.49, `age-verification-tech` 0.69,
`coppa-effectiveness` 0.22) because they bear on whether a ban *can* work rather than whether children
*are* harmed. A normative meta claim with a feasibility pillar.

**space-exploration-value** (7 remaining) — all correct. `nasa-spinoff-analysis` (for, Jev against
0.64) still reports a positive 2-3:1 ROI after its own deflation. `opportunity-cost-analysis`
(against, Jev for 0.59) states the objection then calls the zero-sum framing weak — defensible but
self-undercutting; a split candidate.

**homeschooling-effectiveness** (7 remaining) — all correct. `hs-kunzman-gaither` (against, Jev for
0.57) is another instance of the claim's own hedge ("it is contested whether homeschooling causes the
gap") making a methodological critique look like a confirmation.

**eacc-vs-tech-regulation** (12 remaining) — all correct. `nuclear-regulatory-capture` disagrees at
confidence 0.00 — a perfect coin flip. `gdpr-startup-impact` (0.15) and `crispr-governance-debates`
(0.78) are second-order cards: the evidence is about regulators failing, which supports "unregulated
is better" only through a step Jev does not take.

**us-iran-conflict** (8 remaining) — all correct; six agree at ≥0.99.

**microplastics-health-crisis** (all 12) — all correct, 0 flagged. Low agreement comes from cards that
support the claim through a two-step argument (`un-plastics-treaty` 0.77, `industry-recycling-deception`
0.61: regulatory capture → the lead-exposure analogy → crisis). `regulatory-safety-thresholds` has a
title that overstates its body (EFSA in fact contradicts FDA), which is a copy defect, not a side
defect.

**obesity-personal-responsibility** (8 remaining) — all correct, all `against`, seven at ≥0.99. The
2026-09-17 wholesale flip holds up.

**rent-control-effectiveness** (10 remaining) — all correct. `displacement-prevention` (against, Jev
for 0.61) and `minneapolis-upzoning` (for, Jev against 0.75) are both defensible in the map's own
logic. `stockholm-queue` agrees at 0.08 confidence.

**immigration-national-identity** (5 remaining) — all correct. `borjas-wage-impact` (for, Jev against
0.73) is an economic card under a meta claim about cultural identity and democratic consent — an
off-claim pillar, not a mis-signed card.

**rfk-health-policy** (14 remaining) — all correct. `cochrane-shrinking-benefit` (for, Jev against
0.05) and `accelerated-approval-failures` (for, Jev against 0.20) are noise-level disagreements on
cards that plainly support MAHA's diagnosis.

**doge-federal-cuts** (12 remaining) — all correct; eleven agree at 1.00. `scotus-workforce-stay`
(for, Jev against 0.30) is legal vindication, correctly signed.

**mandatory-voting** (6 remaining) — all correct. `mv-policy-moderation` disagrees at 0.03.

**gain-of-function-research-ban** (5 remaining) — all correct, all at ≥0.89.

**central-bank-digital-currency** (all 7) — all correct, 0 flagged, but the map has a structural
problem: the meta claim is about *surveillance*, while two of three pillars test financial inclusion
and dollar dominance. `mpesa-financial-inclusion` (against, Jev against 0.98) says nothing about
surveillance at all; both the label and Jev are scoring it against an implied claim ("CBDCs are bad")
rather than the written one. Recommend rewriting the meta claim or re-scoping the pillars.

---

## 7. What pattern the errors follow

Four causes, in descending order of how much damage they do.

### (a) Labelled by who cites the card, not by what it shows — 13 of 23 fixes

The dominant error. An author writing a pillar puts each card on the side of whichever voice invokes
it, which produces two systematic failures:

- **Justification mistaken for outcome.** Where a meta claim asserts a policy *worked*
  ("has made the Middle East safer," "have eliminated waste," "will improve American health
  outcomes"), evidence that the problem is real gets filed as `for`. Iran's post-withdrawal
  enrichment, Tower 22, the June 2025 strikes, and DOGE's blocked cuts are all outcomes *under* the
  policy that were filed as arguments *for* it. The Strategic National Stockpile card is the mirror
  image: under a claim that governments *should* invest, a documented 290-fold shortfall was filed as
  evidence against investing, because the pillar's skeptic uses it to argue that investment decays.
  Test: **does the card describe a reason to act, or a result of having acted?** Only results bear on
  a "has worked" claim; only desirability bears on a "should" claim.
- **`skeptic_premise` has no fixed polarity.** This is the trap. On `seed-oils-health`,
  `obesity-personal-responsibility` and `congressional-term-limits`, the `skeptic_premise` argues
  *for* the meta claim; on `rfk-health-policy`, `gain-of-function-research-ban`,
  `central-bank-digital-currency` and `remote-work-permanence` it argues *against* it. An author who
  reasons "this is the skeptic's evidence, so it is `against`" is right on roughly half the library
  and inverted on the other half. The three maps fixed in September and several fixed here are that
  habit leaving a trace.

### (b) Card corrected, label left stale — 7 of 23 fixes

Someone hardened a description for accuracy — added the null result, the failed replication, the dose
that does not apply — and did not revisit `side`. The card now refutes its own headline while still
scoring for the original side: the Khanmigo pilot with no efficacy evidence, the senolytic trial that
found nothing, the NTP fluoride finding that applies only above twice the US dose, the Gallup data
that cuts against RTO, the hexane residues that are orders of magnitude below harm. **Any edit that
adds a contrary finding to a description must re-check `side`.**

The sharpest case is `obesity-personal-responsibility` / `personal-agency-cross-cultural`, where the
description, the `reasoning` field and the `directness` weight were all revised for false balance —
the reasoning says in terms that the data "cannot support the inference that personal choice
dominates" — and `side` alone was left behind, then moved the *wrong* way by the September whole-map
flip. A whole-map inversion can over-correct individual cards just as a per-card pass can
under-correct them. **`reasoning` is the field to read when `side` is in doubt: it records what the
author thought the card showed, and when it contradicts `side`, `side` is usually the stale one.**

### (c) Labelled against the pillar's sub-hypothesis — 3 of 23 fixes

`scott-cost-disease` runs each pillar as "is *this* the cause?" and signs cards for and against that
sub-hypothesis. All three fixed cards — `flat-output`, `k12-counterexample` and
`haircut-counterexample` — affirm the topic claim (cost disease is real, and multi-causal) while
denying a single pillar's explanation, so all three were signed backwards. Any map whose pillars are
competing explanations rather than competing positions is exposed to this, and the exposure is
total: on `scott-cost-disease` it hit every counterexample card in the map.

### (d) Meta-claim wording, which produces low agreement without producing errors

Three shapes account for most of the 18 sub-75% topics while causing almost no actual mislabels:

- **Self-hedging claims.** `simulation-hypothesis`, `death-penalty-deterrence`,
  `homeschooling-effectiveness`, `us-national-debt-crisis` and `nuclear-renaissance-smr` all end with
  a clause like "though whether X is true remains contested." Evidence that X is unresolved then
  *confirms the meta claim as written* while *weakening the position it exists to test*. Jev takes the
  literal reading; the library takes the operative one.
- **Claims that assert a dispute exists.** `minneapolis-shooting`'s meta claim says the accounts
  conflict — so both sides' evidence confirms it and `side` becomes meaningless. Reword to the
  substantive proposition ("federal agents used excessive force").
- **Compound and disjunctive claims.** `consciousness-ai-systems` ("current **or near-future**…
  could… **creating moral obligations**"), `moloch` ("Moloch dominates **and** escape requires a
  strong coordination mechanism") and `scott-cost-disease` make "not now but plausibly soon" and
  "coordination worked here" cards unassignable. Seven of the 27 ambiguous cards sit on these
  topics.
- **Pillars that do not test the claim.** `central-bank-digital-currency` (surveillance claim,
  inclusion pillars), `immigration-national-identity` (cultural-identity claim, economics pillar) and
  `pandemic-preparedness` ("should invest" claim, "does funding fix it" pillar) generate disagreement
  that no side label can resolve.

### The ambiguous twenty-seven are an atomicity problem, not a labelling problem

Almost every card left `AMB` carries findings of opposite sign (the exceptions are three
problem-statement cards — DOGE's GAO fraud estimate and performance-review anomaly, and immigration's
FY2023 encounters — which establish that a problem exists without bearing on whether the policy
worked). Several say so in their own text ("cuts both
ways," "evidence of both… and its real-world limits," "complicating both"). §5.7 of
`docs/ARGUMENT_MODEL.md` already covers this: ambiguous polarity means the underlying claim is not
atomic. The fix is to split the card, which is a content change outside this pass's scope. The worst
offenders are `psilocybin-depression-remission` (four trials, opposite signs), `current-ai-narrow`
(annotates itself as contradicted), and `klarna-700-agents`.

---

## 8. False-negative estimate

60 cards on which Jev and the label **agree** were sampled one-per-topic with a fixed seed and read in
full against their meta claim and pillar framing.

**Clear sign errors found: 0 of 60.** Point estimate 0%; by the rule of three, the 95% upper bound is
about 5%, i.e. at most ~70 of the 1,379 agreed cards library-wide, and almost certainly far fewer. The
audit is not missing a large hidden population of inverted labels.

Four cards (6.7%) had a real defect that is not a sign error, and they cluster:

- **Legal-authority cards scored as substantive evidence** — `student-debt-forgiveness`
  (*Biden v. Nebraska*) and `net-neutrality` (*CTIA v. FCC*) both file a ruling about *who may write
  the rule* as evidence against a claim about whether the policy is *warranted*. The net-neutrality
  map's own `proponent_rebuttal` names the error: "A court ruling on agency authority addresses who
  may write the rules, not whether open-internet protections are needed." Worth a targeted sweep.
- **Claim-wording slack** — `consciousness-hard-problem`'s embodied-cognition card supports the
  literal "not physical brain processes alone" but not the "new fundamental theories of reality"
  clause; `scott-cost-disease`'s Helland & Tabarrok card supports "cost disease is real" while sitting
  in tension with "no single villain."

One incidental confirmation worth recording: `iran-war-justification` and `us-iran-conflict` assign the
same IAEA 408 kg finding to **opposite sides**, and both are right — one map asks whether force is
justified, the other whether the policy worked. `side` is meta-claim-relative, exactly as intended.

---

## 9. Before/after, every topic changed

Sixteen topics move. Four change verdict quadrant.

| topic | balance | weight | for/against | quadrant | verdict after |
|---|---|---|---|---|---|
| us-iran-conflict | 48 → **23** | 76 | 6/6 → 3/9 | contested → **settled** | Settled — evidence strongly favors the counterclaim |
| obesity-personal-responsibility | 31 → **18** | 72 | 4/8 → 2/10 | contested → **settled** | Settled — evidence strongly favors the counterclaim |
| doge-federal-cuts | 31 → **25** | 78 | 5/11 → 4/12 | contested → **settled** | Settled — evidence strongly favors the counterclaim |
| scott-cost-disease | 67 → **85** | 81 | 10/6 → 13/3 | contested → **settled** | Settled — evidence strongly favors the claim |
| pandemic-preparedness | 57 → 65 | 75 | 6/8 → 9/5 | contested | Well-mapped, genuinely contested |
| rfk-health-policy | 44 → 39 | 72 | 7/9 → 6/10 | contested | Well-mapped, genuinely contested |
| seed-oils-health | 46 → 40 | 66 | 6/6 → 5/7 | contested | Well-mapped, genuinely contested |
| ai-regulation | 59 → 51 | 75 | 7/5 → 6/6 | contested | Well-mapped, genuinely contested |
| lab-diamonds-ethics | 60 → 52 | 69 | 7/5 → 6/6 | contested | Well-mapped, genuinely contested |
| remote-work-permanence | 58 → 74 | 57 | 5/3 → 6/2 | moderate | Leans toward the claim — moderately evidenced |
| mandatory-voting | 76 → 86 | 53 | 5/2 → 6/1 | moderate | Leans toward the claim — moderately evidenced |
| ai-content-labeling | 63 → 74 | 56 | 5/3 → 6/2 | moderate | Leans toward the claim — moderately evidenced |
| billionaire-wealth | 68 → 66 | 59 | 5/3 → 5/3 | moderate | Leans toward the claim — moderately evidenced |
| longevity-anti-aging | 61 → 52 | 62 | 5/3 → 4/4 | moderate | **Balanced** — moderately evidenced |
| ai-in-education | 45 → 39 | 64 | 5/5 → 4/6 | moderate | **Leans toward the counterclaim** — moderately evidenced |
| return-to-office-productivity | 36 → 27 | 64 | 4/8 → 3/9 | moderate | Leans toward the counterclaim — moderately evidenced |
| death-penalty-deterrence | 22 → 17 | 56 | 3/5 → 2/6 | moderate | Leans toward the counterclaim — moderately evidenced |

`housing-affordability-crisis` appears in no row: its one change was reverted and the topic is
unmodified at balance 66, "contested."

### Founder calls worth making

1. **The hottest surviving quadrant change hangs on a single card.** `us-iran-conflict` moved on
   three flips, and the weakest of them — `june-2025-strikes-nuclear`, the one the second reader
   agreed with least readily — is load-bearing. The card is an account of a strike with one pro
   clause (surface infrastructure and centrifuge halls destroyed) against three anti (damage to the
   deepest halls disputed, a DIA assessment of "months rather than years," IAEA continuity of
   knowledge lost). I keep the flip: the title is a neutral event name rather than a pro claim, and
   the later, stronger findings all cut against a safety gain. But it is the one card to re-read
   before this map ships as "settled."
2. **Three maps now read "Settled — evidence strongly favors the counterclaim" on politically hot
   topics** (`us-iran-conflict`, `obesity-personal-responsibility`, `doge-federal-cuts`). Each is
   arithmetically correct given the evidence sets (9-12 `against` cards against 2-4 `for`). But three
   of the library's most contested subjects turning "settled" in one pass is a presentation question
   as much as a data question. The honest reading is that these maps' `for` sides were propped up by
   mislabelled cards; the remedy is to commission stronger `for` evidence, not to restore wrong
   labels. `obesity-personal-responsibility` is now at balance 18 with 2 `for` cards out of 12, which
   is less a verdict than a statement that the map was never built to steelman its own claim.
3. **`scott-cost-disease` at 85 is the least troubling of the four.** "Costs rose several-fold with
   little matching output gain, from several reinforcing causes" is close to consensus; the map read
   as contested only because every counterexample card in it was signed against the pillar it sat in
   rather than against the topic claim.
4. **`mandatory-voting` at 86 and `minneapolis-shooting` at 86** are one-sided enough to read as
   advocacy. Both are weight < 65 so the verdict stays "moderate," but they need counter-evidence,
   not relabelling.

## 10. Recommendations

1. Adopt the `## Conventions` section added to `docs/ARGUMENT_MODEL.md` and run its check in review.
2. Act on §11 — the removals and splits are a bigger quality win than any remaining relabelling.
3. Sweep for legal-authority cards scored as substantive evidence (§8) — at least
   `student-debt-forgiveness` and `net-neutrality`.
4. Reword four meta claims: `minneapolis-shooting` (asserts a dispute rather than a proposition),
   `central-bank-digital-currency` (surveillance claim, inclusion pillars), and the self-hedging
   tails on `simulation-hypothesis` and `death-penalty-deterrence`.
5. Re-run the audit after any batch of description edits — it costs about a minute and a few cents,
   and §7(b) shows description edits are how labels go stale. Read `reasoning` alongside `side`.

## 11. Recommended removals and splits (founder decision)

Nothing was removed or split in this pass — both are content changes beyond a labelling audit. These
are the candidates. For the first group **removal is the right fix, not relabelling**: the cards bear
on something other than the meta claim, so neither side value is correct and either one distorts
`balance`.

**Remove — off-claim (5).**

- `doge-federal-cuts` / `gao-improper-payments` — a modelled estimate of the federal fraud pool. It
  establishes the problem was real; its own caveat says the figure "cannot be read as money DOGE
  actually identified or recovered." Not evidence the cuts worked, nor evidence they did not.
- `doge-federal-cuts` / `performance-review-anomaly` — 99.8% positive performance reviews. Same
  shape: evidence the reform was warranted, not that it succeeded.
- `immigration-border-crisis` / `record-encounters-fy2023` — FY2023 precedes the asylum restrictions
  the meta claim bundles in, so it is the baseline its companion card measures against, not an
  outcome of the policy.
- `remote-work-permanence` / `patent-innovation-data` — aggregate patent counts the card itself calls
  "only suggestive," with the link to remote work "not established," plus an appended Nature finding
  pointing the other way.
- `obesity-personal-responsibility` / `glp1-cost-equity-barrier` — flipped to `against` in this pass,
  but dropping it is arguably better than relabelling it: drug list prices say nothing about what
  *causes* obesity. It reads as `against` only through the incidental phrase "a condition shaped by
  the food environment," which is doing all the work.

**Flip or split — genuinely two-directional, currently scoring one way (2).**

- `transgender-athletes-sports` / `muscle-mass-convergence` — currently `for`. Hemoglobin reaches
  cisgender-female levels in about four months (pro), but the same review finds strength and muscle
  area still above cisgender-female levels at 36 months and strength "may be well preserved" (anti),
  which contradicts the meta claim's "sufficiently reduces **any** physiological advantages." I left
  it because the map was wholesale-corrected on 2026-09-17 and I did not want to partially re-invert
  that fix, but splitting endurance from strength is the right answer and would move this map (§12).
- `ai-risk` / `current-ai-narrow` — currently `against`. The card annotates itself ("this 'against'
  claim is now contested") and its source line reads "now partly contradicted by Meinke et al." The
  Apollo in-context-scheming result deserves its own `for` card.

**Dedupe (1).**

- `rfk-health-policy` double-counts one source. `dietary-guidelines-conflicts` and `nestle-no-policy`
  both rest on Marion Nestlé's January 2026 finding that roughly two-thirds of the MAHA
  dietary-guidelines reviewers had industry ties, from the same Food Politics source. Both are now
  `against`, so one finding is counted twice on the same side of `balance`. This is what §5.5 of
  `docs/ARGUMENT_MODEL.md` warns about — "five citations tracing to one paper is not corroboration."
  Merge them or drop the weaker.

## 12. Verdict fragility

The second reader's sharpest finding, verified here against the live scoring functions: **these maps
are too small for the verdict thresholds they feed.**

Flipping one card moves `balance` by a **median of 9 points** across all 1,567 cards (p25 7, p75 12,
max 31), while the gap between "contested" and "settled" is 20 points of `|balance − 50|`. On a
12-to-16-card map, one ordinary card is roughly half the distance between a genuinely contested
verdict and a settled one.

**Thirty topics** with `weight ≥ 65` currently sit within 8 points of the settled threshold — inside
one card's reach. Simulating the flip of cards this review deliberately left `AMB`:

| topic | card left `AMB` | balance now | if flipped | quadrant |
|---|---|---|---|---|
| pandemic-preparedness | cdc-test-failure | 65 | 73 | contested → **settled (claim)** |
| transgender-athletes-sports | muscle-mass-convergence | 36 | 24 | contested → **settled (counterclaim)** |
| immigration-border-crisis | record-encounters-fy2023 | 40 | 29 | contested → **settled (counterclaim)** |

So three further quadrant flips sit behind judgment calls this review declined, and the near-threshold
list (`pfas-forever-chemicals` d=18, `global-housing-bubble` d=18, `sugar-tax-effectiveness` d=19,
`consciousness-hard-problem` d=19, `daylight-saving-time-abolition` d=19, `social-media-elections`
d=19, `sex-work-decriminalization` d=19, `artificial-reproduction-ethics` d=19, and 22 others) means
routine editorial work will keep tipping verdicts in both directions.

This is not an argument for different labels. It is an argument that a headline as strong as "Settled
— evidence strongly favors the claim" should not turn on a dozen cards. A separate branch is
addressing the verdict computation; until it lands, treat every "settled" verdict on a map with fewer
than about 20 cards as provisional, and read §9 and this section together before shipping any of the
four quadrant changes.
