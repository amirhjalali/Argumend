# Three-flagship evidence, crux, and fairness audit

> **Audit snapshot and remediation status.** The detailed findings below preserve the
> graph state inspected earlier on August 12, 2026. The same sprint subsequently
> implemented the recommended capitalism resolutions and balanced direct edges,
> added direct/qualifying leverage and regional-stability relationships in the
> U.S.-Israel graph, corrected the public copy and source URLs, and added release
> contracts. Current validation is zero-error for all three graphs. The historical
> scores below remain useful as an audit trail; they are not the current release
> scores. Post-remediation capitalism leads with ownership concentration (.828) and
> reallocation (.750); U.S.-Israel leads with regional stability (.811), followed by
> death-toll uncertainty (.771), combatant share (.615), value priority (.562), and
> leverage (.559). The remaining Israel veto-to-credibility warrant warning was not
> papered over with an irrelevant edge.

Date: 2026-08-12
Scope: `ai-mass-unemployment`, `capitalism-after-ai`, `us-israel-support`
Method: schema/graph validation, deterministic crux inspection, source-URL GET audit, primary-source spot verification of public headline facts, and an adversarial four-position review of the U.S.-Israel map.

## Executive verdict

**Do not ship the three pages unchanged.** The graph structures are valid and the source corpus is unusually strong, but three public quantitative claims need correction before release:

1. Capitalism's `-13 pts` labor-share card does not match its cited FRED series. Q1 2000 was 112.828 and Q2 2026 was 93.547: a fall of **19.281 index points**, or **17.1% relative**, not 13 points.
2. AI/jobs' original `2.7x` card copy was underspecified and mixed denominators. The corrected card now says exactly what the encoded ILO–NASK evidence supports: in high-income countries, 9.6% of women's employment versus 3.5% of men's employment was in the highest-exposure category, roughly 2.7x. This is distinct from the separate 29% versus 16% occupation-level statistic.
3. The U.S.-Israel map initially misattributed the substantive NSM-20 finding to a Senate press release that said something materially different. This was corrected during the audit to cite the full State/Defense report. The new OCHA casualty source and reframing were also corrected during the audit. The product metadata still needs to reflect those corrected facts and the February 2025 rescission of NSM-20.

There are no schema or graph-validation errors. The current drafts produce 91 warnings, nearly all editorial atomicity warnings rather than graph failures. All fifteen emitted cruxes are marked `evidenceStarved`, but that label should not be rendered as an ordinary-language claim that the evidence is absent: the engine defines it solely as fewer than three **directly attached evidence nodes with weights**.

## Reproducible validation result

Command:

```bash
node_modules/.bin/tsx scripts/validate-argument-draft.ts data/topics/drafts/<topic>.draft.json
```

| Topic | Positions | Claims | Inferences | Evidence | Edges | Errors | Warnings |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| AI mass unemployment | 4 | 54 | 6 | 50 | 146 | 0 | 39 |
| Capitalism after AI | 4 | 40 | 6 | 30 | 110 | 0 | 25 |
| U.S.-Israel support | 4 | 41 | 5 | 30 | 121 | 0 | 27 |

The warning mix is:

- 86 `claim-atomicity-conjunction` warnings. Some identify genuinely compound claims, but many are harmless because the conjunction is intrinsic to the proposition. These should be triaged around load-bearing claims, not mechanically eliminated.
- Four same-polarity evidence-density warnings. These are prompts to check source independence, not evidence-count errors.
- One `unexamined-warrant` warning: `i-vetoes-credibility` in the Israel graph has an implicit warrant and no incoming undercut. This one is substantive. The map should encode the counterargument that UN voting isolation does not necessarily cause a transferable loss of U.S. credibility or policy capacity.

## What `evidenceStarved` actually means

`evidenceCoverageFor()` counts only direct `evidences` edges whose evidence node has a `weight`; coverage is `min(1, weightedCount / 3)`. It does not count:

- unweighted direct evidence;
- evidence attached to upstream premises or a concluding inference;
- the quality or independence of a source;
- a paired counterclaim's evidence;
- whether a definitional or normative crux is the kind of proposition evidence could settle.

Consequences visible here:

- `c-targeted-programs-can-help` has a directly attached randomized evaluation but scores 0 coverage because that evidence lacks a `weight` object.
- Capitalism's demand-collapse and wage-channel cruxes each have two direct sources but score 0 because those sources are unweighted.
- A definition such as `c-survival-definition-contested` correctly has no direct empirical evidence and is still marked starved.
- A standing value disagreement such as `c-alliance-obligations-override-complicity` is marked starved even though adding three weighted sources would not resolve the moral priority.

Recommendation: retain this as an internal authoring diagnostic, but rename it `fewerThanThreeWeightedDirectEvidenceNodes` in diagnostics or render a more precise user-facing phrase. At minimum, suppress the warning for `definitional-choice` and `value-difference` resolutions and separately report direct evidence, indirect evidence, and source diversity.

## Current top-five crux audit

### AI mass unemployment

1. `c-firms-cut-hiring-not-output` — score 0.782; C .606, R .097, D 1, T 1, coverage .667. This is a good hidden-mechanism crux: does productivity reduce labor demand or expand output? It has one weak interested supporting source (Klarna's own workload-equivalence press release) and one much stronger challenging firm-level NBER source. "Starved" means two rather than three weighted nodes, not no evidence. The low raw reach is lifted by a scoping bonus because it gates AI attribution.
2. `c-targeted-programs-can-help` — .770; C .5, R .513, D 1, T 1, coverage 0. It directly cites a large randomized WIA evaluation, but the node is unweighted. The claim also leans on a meta-analysis described in `statusBasis` but not encoded as evidence. This is a real encoding gap: either add the cited meta-analysis as a node or narrow the basis to what the existing WIA source establishes.
3. `c-displaced-workers-can-retrain-costlessly` — .750; C .5, R .513, D 1, T 1, coverage .333. The wording is too absolute: "costlessly" is contradicted by its own longer statement, which says cost and delay are merely small relative to gains. The single weighted direct source challenges the premise. This is intentionally a hidden optimistic assumption, but the display text should say "at tolerable cost" rather than "costlessly."
4. `c-mass-unemployment-definition-strict` — .664; C .5, R .077, D 1, T .8, coverage 0. Correctly a definitional crux and correctly not an empirical evidence contest. Its rank comes from gating two predictive disputes. Evidence-starved is semantically inapplicable.
5. `c-credential-pathway-narrows` — .566; C .833, R .203, D 1, T .9, coverage 0. It has a direct Dallas Fed source, but it is unweighted. The source supports an association between exposure and wage-growth differences, not the full future causal pathway in the claim. Keep future-observable status and phrase the public explanation conditionally.

Assessment: the ordering is defensible and captures a mechanism, a remedy, an adjustment assumption, a definition, and a distributional pathway. It is not merely picking the five most dramatic findings.

### Capitalism after AI

1. `c-ai-ownership-stays-concentrated` — .759; C .5, R .625, D 1, T .7, coverage 0. This is the highest-value hidden assumption in the map, but it has no resolution field and no directly attached evidence even though the graph contains model, cloud, chip, antitrust, and open-model evidence. This is genuinely under-encoded. Add a resolution condition and direct supporting/challenging evidence before calling it empirically tractable.
2. `c-survival-definition-contested` — .719; C .5, R .310, D 1, T .8, coverage 0. Strong definitional crux. It gates three other candidates and exposes why identical outcomes can produce opposite verdicts. Evidence-starved is inapplicable.
3. `c-reallocation-keeps-pace` — .663; C .5, R .426, D 1, T .7, coverage 0. Strong hidden assumption, but it also lacks a resolution field and direct evidence. Historical automation evidence exists elsewhere in the graph and should be connected explicitly, with a limiter that historical reallocation does not establish AI-era pace.
4. `c-demand-collapse-without-recycling` — .615; C .875, R .254, D 1, T .9, coverage 0. Two direct historical/theoretical sources are unweighted. They establish the mechanism's intellectual basis, not that its AI-scale trigger conditions will occur. The future-observable resolution is honest.
5. `c-wage-channel-loses-primacy` — .552; C .875, R .310, D 1, T .65, coverage 0. Two direct sources are unweighted and chiefly theoretical. Its `value-difference` resolution is not quite right: whether wages remain the primary income channel is empirically measurable, while what threshold counts as "loses primacy" is definitional. Split the measurable forecast from the threshold choice.

Assessment at audit time: the crux set was conceptually excellent but empirically thinner than AI/jobs. The same sprint subsequently added explicit future-observable resolutions and balanced direct relationships for both hidden assumptions; the paragraph is retained to show what the remediation addressed.

### U.S.-Israel support

The current output reflects corrections made during this audit; the now-broadly-accepted NSM-20 factual claim correctly drops out of candidacy.

1. `c-gaza-death-toll-uncertain` — .773; C .5, R .367, D 1, T 1, coverage .667. The revised wording is materially fairer: reported direct-death toplines converged near 71,000-73,000, while undercount, identification, indirect mortality, and civilian/combatant composition remain uncertain. Four direct nodes exist; two are weighted. Avoid turning "not independently verified death by death" into "the topline is arbitrary."
2. `c-casualty-figures-mostly-combatants` — .717; C .813, R .367, D 1, T 1, coverage .333. This is load-bearing for maintain versus reduce, but its supporting estimate is an Israeli political claim reported by CBS, and the ACLED qualifier covered a much earlier phase of the war. "Potentially close to half" must be clearly attributed and dated, never presented as the map's estimate. A current independent status-classification dataset would materially improve this node.
3. `c-regional-stability-depends-on-alliance` — .591; C .5, R .26, D 1, T .9, coverage 0. This is the maintain case's central hidden premise. It currently has no direct evidence and the graph's sole inference is an untested causal generalization. It should link missile-defense, Iranian threat, and Abraham Accords evidence as support, and entanglement/escalation evidence as challenge, without pretending either side supplies a controlled counterfactual.
4. `c-alliance-obligations-override-complicity` — .564; C .8, R .31, D 1, T .65, coverage 0. This is a genuine value disagreement. Evidence can change whether complicity is credible, but cannot supply the priority rule. Its mirror claim exists, which is good. Evidence-starved is inapplicable.
5. `c-aid-buys-leverage` — .558; C .5, R .19, D 1, T 1, coverage 0. This is the map's most important omitted-evidence crux. Both the conditioning position and the public closer identify it as the hinge, yet it has no direct evidence. The bomb-pause episode, private-access claim, failure-to-secure-compliance claim, and conditioning counterclaim should all feed it explicitly. The observable is also multidimensional: tactical access, short-term operational change, and durable strategic compliance are different outcomes.

Assessment at audit time: the revised top five were balanced between humanitarian facts, strategic prediction, normative priority, and leverage, but leverage and regional stability were direct-evidence-empty. Those topology gaps were repaired later in the sprint with explicit limitations on what the available evidence can establish.

## Exact plain-language `cruxNotes` recommendations

These are the fact-locked recommendations produced from the audit snapshot. They
were implemented and then refined in the shipped metadata; the runtime registry,
not this historical block, is the current source of public copy.

### Capitalism after AI

```ts
{
  "c-ai-ownership-stays-concentrated": {
    fight: "Today's frontier models, chips, and cloud capacity are concentrated. The real bet is whether that concentration survives cheaper models, open weights, antitrust, and new entrants over the next decade.",
    soWhat: "If ownership stays narrow, AI income can pool at the top even while output rises. If it diffuses, the demand-collapse and post-capitalist cases lose their key mechanism."
  },
  "c-survival-definition-contested": {
    fight: "One side calls it capitalism as long as firms remain privately owned and prices still allocate goods. Another says the wage channel is part of the bargain, so markets plus mass transfers would already be a different system.",
    soWhat: "The same future could count as survival or collapse depending on the definition. Pick the test before scoring the prediction."
  },
  "c-reallocation-keeps-pace": {
    fight: "Past automation destroyed tasks and created new ones. The live question is speed: will complementary jobs appear soon enough, in the right places, for displaced workers to reach them without years of lost income?",
    soWhat: "If reallocation keeps pace, adaptation is a painful transition. If it lags, rising output can coexist with durable underemployment and a broken wage channel."
  },
  "c-demand-collapse-without-recycling": {
    fight: "If wages shrink, purchasing power can still return through lower prices, new jobs, investment, dividends, or transfers. The dispute is whether those channels expand fast enough to buy what AI-rich firms can produce.",
    soWhat: "This separates a distribution problem from a macroeconomic one. Failure to recycle income means productive capacity can rise while demand and employment remain weak."
  },
  "c-wage-channel-loses-primacy": {
    fight: "Wages can lose share without disappearing. The argument is over when that decline becomes a change in kind: when most non-owners can no longer rely on work as their main claim on output.",
    soWhat: "If wages remain primary, capitalism mostly adapts. If dividends or transfers have to replace them, the system needs structural redesign even if markets and private firms remain."
  }
}
```

### U.S.-Israel support

```ts
{
  "c-gaza-death-toll-uncertain": {
    fight: "By mid-2026, official Israeli and Gaza health-authority toplines had moved into a similar 71,000-73,000 range for reported direct deaths. What remains unresolved is who has been identified, who is missing, indirect mortality, and the civilian-combatant breakdown.",
    soWhat: "The uncertainty is real, but it is not permission to treat every number as equally unsupported. Different uncertainties answer different moral and legal questions."
  },
  "c-casualty-figures-mostly-combatants": {
    fight: "Israeli officials have argued that combatants make up a large share of the dead. Independent coding has not verified a share close to the highest official claims, and the available estimates cover different periods and use different rules.",
    soWhat: "The civilian-combatant mix strongly changes how people judge proportionality and complicity, even though it does not by itself decide whether any particular strike was lawful."
  },
  "c-regional-stability-depends-on-alliance": {
    fight: "Supporters see the alliance as deterrence against Iran and its partners. Critics argue the same visible backing can entangle the U.S., invite retaliation, and reduce diplomatic room. There is no clean counterfactual.",
    soWhat: "If current support is load-bearing, reducing it risks a wider war. If it is part of the escalation mechanism, maintaining it carries the risk the policy is supposed to prevent."
  },
  "c-alliance-obligations-override-complicity": {
    fight: "Even after agreeing on Hamas's crimes and evidence of civilian harm, people can rank two duties differently: stand by a threatened ally, or avoid enabling a partner's serious violations.",
    soWhat: "No casualty study resolves this priority rule. Evidence can establish the stakes; it cannot choose which obligation comes first."
  },
  "c-aid-buys-leverage": {
    fight: "One side says continued aid preserves private access and influence. Another says leverage exists only when Washington credibly withholds something. A third reads years of policy disagreement as evidence that neither approach reliably changes strategy.",
    soWhat: "This is the hinge between maintaining, conditioning, and reducing support. The answer may differ for a temporary operational pause and a durable change in settlements, aid access, or war aims."
  }
}
```

## Source URL audit

The corpus contained 110 evidence nodes and 109 unique URLs before the concurrent source replacements. A parallel GET audit with redirects enabled produced:

- 91 direct partial-content or normal success responses (`200`/`206`);
- 15 access-control responses (`403`/`406`), overwhelmingly publisher, government bot protection, or paywall behavior;
- 3 transport timeouts in the batch (the FRED raw-data path and two Washington Post pages);
- 12 redirecting URLs;
- **zero `404` or `410` results in the original corpus pass.**

The 403/406 group must be classified as **blocked, not dead**. It included BLS, Congress/CRS, Defense, DSCA, IMF, OECD, ICC, ScienceDirect, AEA/OUP/Wiley/Taylor & Francis/Informs, SAG-AFTRA, Time, Upwork, and BenchmarkList URLs depending on the request pattern. Search indexing and browser retrieval confirmed several of these. Do not delete authoritative URLs solely because a curl probe gets 403.

Material URL maintenance findings:

- Use `https://fred.stlouisfed.org/series/PRS85006173`, not the raw `/data/PRS85006173` path, for a stable human-readable labor-share citation.
- Strip `?os=qtfT_2` from the CRS RL33222 URL; the query-bearing PDF path redirects to the product page.
- Replace the mutable Mondragon "letters from the president" page with the immutable 2024 PDF: `https://www.mondragon-corporation.com/people/site/assets/files/103207/annual-report-2024.pdf`. The live page has already rolled over to 2025 figures, while the draft finding is about 2024.
- DOI redirects are expected and healthy. Cookie-wall redirects on Wiley/Taylor pages are access behavior, not evidence that the DOI is dead.
- The exact current OCHA PDF is `https://www.ochaopt.org/sites/default/files/Gaza_Reported_Impact_Snapshot_17_June_2026.pdf`; the briefly introduced `%20final` variant returned 404 and was corrected during this audit.
- The full NSM-20 report mirror responds as a PDF and is the primary government document, despite being hosted by Just Security.

## Headline fact verification

### AI/jobs

- **16%:** Supported by the Stanford Digital Economy Lab/ADP paper, specifically a relative employment decline for ages 22-25 in the most exposed occupations after controls. It is not a 16% decline in all entry-level hiring and is not, by itself, causal proof that AI produced the entire decline.
- **4.2%:** Correct for U.S. U-3 unemployment in June 2026. The phrase "barely moved since 2022" is misleading: the graph itself records 3.5% in December 2022 and 4.2% in June 2026, while participation fell from 62.3% to 61.5%. Prefer "still far below a mass-unemployment threshold."
- **700 agents:** Correctly described as Klarna's workload-equivalence claim, not 700 audited layoffs. Keep the qualification as prominent as the number.
- **2.7x:** Supported by `e-ilo-nask-refined-index-2025` when scoped precisely to the share of women's versus men's employment in the highest-exposure category in high-income countries (9.6% versus 3.5%). Do not conflate it with the separate 29% versus 16% exposure comparison for female- versus male-dominated occupations. The corrected public card now makes the denominator explicit and removes the unsupported `70–92% female` range.
- **$34,900 / largest growth:** Supported by BLS 2024-34 projections: 739,800 additional home-health and personal-care-aide jobs, the largest numerical projected gain, at a 2024 median wage of $34,900. Do not say displaced office workers are in fact landing there; that is an illustrative distributional comparison, not an observed transition flow.

### Capitalism

- **Labor share:** The cited series supports a long decline, but the card's magnitude is wrong. Use `-19.3 index points, Q1 2000 to Q2 2026` or `-17.1% relative`. An index-point change is not a percentage-point change in labor's literal share of national income.
- **40% / 27%:** Menlo Ventures reports estimated 2025 enterprise LLM spend of Anthropic 40%, OpenAI 27%, Google 21%. It surveyed roughly 500 U.S. enterprise decision-makers and used a bottom-up market model. Say "estimated enterprise LLM spend," not a measured share of all foundation-model use, ownership, or the overall AI market.
- **Mondragon:** The 2024 annual report supports over EUR11.2B in sales, more than 70,000 employees, and EUR632M profit. The cited web page is mutable and now displays 2025; cite the fixed PDF. Also avoid implying all 70,000 employees are worker-owners without a source for that denominator.
- **$1,000/month RCT:** Supported: 1,000 treated low-income adults for three years, with a 2,000-person $50/month control group. The source is an NBER working paper, not yet appropriately labeled `peer-reviewed` on the evidence node. Its directness is limited because the trial occurred in an economy where labor demand still existed.
- **"Forty years":** Broadly supported by the global labor-share literature, but the public U.S. number uses a 2000 baseline. Keep those two scopes distinct.

### U.S.-Israel

- **$38B:** Correct as the 2016 political MOU pledge for FY2019-28, subject to congressional appropriations: $33B FMF plus $5B missile defense. It is not a single appropriation or a complete total of aid during the Gaza war.
- **$3.5B:** Correct as the FY2024 supplemental FMF appropriation for Israel and related expenses, not the whole Israel-related supplemental package.
- **100+:** Supported by Washington Post reporting on sales approved and delivered from October 7, 2023 through early March 2024. It is a dated five-month snapshot derived from a classified congressional briefing, not the current cumulative total. "Most below notification thresholds" is supported; "threshold splitting" or evasion is not established merely by being below threshold.
- **Casualties:** OCHA's June 17, 2026 snapshot reports 73,016 deaths and says 71,444 were identified by December 31, 2025, with unverified figures attributed to their source. A January 2026 report attributed a roughly 71,000 total to an Israeli military official. The sharper disputes are undercount, indirect mortality, and status classification.
- **NSM-20:** The May 2024 report really did say it was reasonable to assess that covered defense articles were used in instances inconsistent with IHL obligations **or** civilian-harm best practices, while finding recipient assurances credible and reliable enough for aid to continue. The report is public and inspectable. NSM-20 was an executive memorandum, not a statute, and was rescinded in February 2025. Current-law copy must separately discuss Leahy, FAA Section 620I, AECA, and other authorities.

## U.S.-Israel four-position symmetry review

### Structural balance

Direct incoming claim edges are numerically balanced enough to avoid an obvious topology thumb:

| Position | Supporting claims | Opposing claims | Explicit dependency |
| --- | ---: | ---: | --- |
| Maintain full support | 11 | 11 | regional stability depends on alliance |
| Condition continued aid | 5 | 4 | aid buys usable leverage |
| Substantially reduce | 12 | 8 | complicity overrides alliance |
| Enforce existing law/process | 4 | 2 | review should match other states |

Counts are not fairness by themselves. The maintain and reduce positions have the deepest symmetric contest. The conditioning and procedural positions are thinner and share several supporting claims, making them feel partly like degrees of one critique rather than fully independent theories.

### Maintain-support perspective

What the map gets right: it includes October 7 atrocities, Hamas's FTO/Iran support, missile-defense co-development, U.S.-source procurement, Abraham Accords, deterrence, and the access-versus-pressure argument. It also gives this camp the normative alliance-obligation horn rather than reducing it to material interest.

What remains weak: the strongest strategic premise—current alliance structure causes regional stability—has no direct evidence and an unexamined causal warrant. "One reliable partner" is advocacy copy, not an encoded comparative finding. The position should distinguish defensive missile-defense support from offensive munitions and diplomatic shielding; a reader can favor one and oppose another.

### Conditional-support perspective

What the map gets right: it recognizes that conditioning is not equivalent to abandonment, includes legal-review mechanisms, and makes leverage explicit.

What remains weak: it simultaneously uses "aid has not bought compliance" to support conditioning, even though failure of unconditional aid does not prove conditional leverage will work. The single 2024 bomb pause establishes tactical capacity to withhold, not durable influence. The map needs direct evidence on historical conditionality episodes and must separate access, tactical modification, and strategic compliance.

### Substantially-reduce perspective

What the map gets right: it includes complicity, civilian harm, legal findings, opportunity cost, UN credibility, normalization/soft-power, entanglement, public opinion, and the possibility that conditioning fails.

What remains weak: some strategic costs are predictive and indirectly sourced. The ICJ July 2024 conclusion must always be labeled an advisory opinion; it is authoritative but nonbinding. The map should not let the severity of the casualty record substitute for a causal claim that U.S. reduction would improve outcomes. It should also distinguish ending diplomatic vetoes, reducing offensive arms, reducing FMF, and ending missile-defense cooperation.

### Procedural/legal perspective

What the map gets right: it identifies a real prior question—what rules govern transfers and how transparent is their application? The corrected primary NSM-20 document materially improves this branch.

What remains weak or legally misleading:

- NSM-20 was an executive policy and was rescinded in February 2025. It cannot anchor a present-tense claim that "the strings in current law" are NSM-20 strings.
- The Leahy Law is primarily unit-specific vetting, not an automatic countrywide arms cutoff. "Most cases remediated" and disagreement over remediation standards should remain explicit.
- Israel has statutory/administrative notification treatment that is not simply identical to every other state. "Same treatment applied to other states" is normative; the baseline law itself contains categories and thresholds.
- Below-threshold cases do not prove illegal threshold-splitting. The graph can argue that the process limits individualized oversight, but should not imply illegality without transaction-level proof.
- FAA Section 620I, AECA, Leahy, conventional-arms-transfer policy, end-use monitoring, and now-rescinded NSM-20 apply different tests. Avoid collapsing them into one generic "existing law."

Verdict: the graph is substantially more symmetric than typical public treatments, but its procedural camp needs a current-law rewrite and its maintain/condition strategic mechanisms need direct evidence. The narrative metadata should stop describing institutional categories as if they were named advocates.

## Priority fixes

### P0 — public correctness

1. Correct capitalism's labor-share number and distinguish index points from percentage points.
2. Keep AI/jobs' gender multiplier explicitly scoped to 9.6% versus 3.5% in the highest-exposure category, and soften the unemployment-baseline label.
3. Propagate the corrected NSM-20 and OCHA facts into tagline, hook, highlights, takeaways, closer, and crux notes.
4. State that NSM-20 was rescinded in February 2025 and do not call it current law.
5. Date the `100+` sales fact to March 2024.

### P1 — graph integrity

1. Attach direct balanced evidence and resolution fields to capitalism's concentration and reallocation cruxes.
2. Attach direct balanced evidence to Israel's leverage and regional-stability cruxes.
3. Add a real undercut to `i-vetoes-credibility`.
4. Reclassify the NBER guaranteed-income working paper from `peer-reviewed` unless a journal publication is supplied.
5. Split empirical and definitional parts of `c-wage-channel-loses-primacy`.

### P2 — source durability and ongoing maintenance

1. Use stable FRED series, fixed Mondragon PDF, clean CRS URL, and exact OCHA PDF paths.
2. Add `publishedAt` and `verifiedAt` consistently, especially for all ongoing-war and current-market evidence.
3. Establish a freshness rule for ongoing topics: public fact cards need an explicit "as of" date and re-verification cadence.
4. Do not treat 403/406 as dead links; record `bot-blocked-assumed-live` when independently confirmed.

## Ship gate

The maps pass the structural gate. They should pass the editorial/evidence gate when:

- all three public-number corrections are merged;
- U.S.-Israel public copy reflects the corrected primary documents and current legal status;
- the two evidence-empty strategic cruxes in Israel and two evidence-empty hidden cruxes in capitalism either gain direct balanced evidence or explicitly disclose that the map has not found decisive direct evidence;
- no user-facing text equates the engine's narrow `evidenceStarved` flag with "there is no evidence";
- all time-sensitive headline facts display a date or period.

At that point the remaining warning count is not a blocker by itself. The more meaningful standard is whether each top crux accurately says what is known, what is inferred, what is a value choice, and what observation could actually move the disagreement.
