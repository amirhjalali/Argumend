# Candidate evidence cards for the quadrant-changed topics (2026-09-21)

Drafter: Fable. Branch `jev/evidence-drafts`. Nothing in `data/` is touched by this
branch — every card below is a **proposal for founder review**, written as a
paste-ready TypeScript object.

## Why this document exists

`jev/evidence-adjudication` (`docs/reviews/2026-09-21-evidence-side-adjudication.md`)
corrected 23 evidence `side` labels. Topics changed verdict quadrant as a
consequence — five at the time this work was commissioned, four after the branch's
own second-reader pass — and in every case the cause was the same: once mislabelled
cards were moved off a side, that side turned out to be thin. The adjudication's own
founder note said the remedy is **"to commission stronger `for` evidence, not to
restore the wrong labels."** This document is that commission. It also fills the one
pillar in the library with no evidence at all, and closes out the 16 cards with no
`sourceUrl`.

| topic | quadrant now | thin side | cards drafted |
|---|---|---|---|
| `us-iran-conflict` | settled, favors the counterclaim | `for` | 3 |
| `obesity-personal-responsibility` | settled, favors the counterclaim | `for` | 3 |
| `doge-federal-cuts` | settled, favors the counterclaim | `for` | 4 |
| `scott-cost-disease` | settled, favors the claim | `against` | 3 |
| `housing-affordability-crisis` | **contested** (reverted — see §5) | `against` | 4 |
| `minneapolis-shooting` / `pattern-of-force` | pillar has **no** cards | both | 3 |

Plus §8: the 16 cards library-wide with no `sourceUrl`.

**Baseline pin.** All "current state" figures and the §9 arithmetic are computed
against `jev/evidence-adjudication` at **`b5587c0`** ("second-reader pass — two
reverts, three further flips, one declined"), which landed while this document was
being drafted. Two things changed under me and both are reflected below:
`housing-affordability-crisis` was reverted to *contested* (so the adjudication's
headline is now **four** quadrant changes, not five), and
`obesity-personal-responsibility` and `scott-cost-disease` each moved one card
further, making their thin sides thinner. If the adjudication branch moves again,
re-run the arithmetic before acting on §9.

## Rules I held myself to

1. **Result, not reason.** The adjudication's dominant error class was filing "the
   problem is real" as evidence that "the policy worked." Every `for` card below on
   a *did-it-work* meta claim describes an outcome after the policy, not a
   justification for it.
2. **Fetched or it doesn't exist.** Every `sourceUrl` was retrieved during this pass
   and the supporting sentence is quoted verbatim from the retrieved page in the
   "URL check" line under each card. Where a publisher bot-blocks automated fetches
   (Health Affairs, SAGE, Elsevier, congress.gov's product pages) I say so and give
   the URL I *did* read.
3. **Primary and peer-reviewed first.** 18 of the 20 drafts rest on peer-reviewed
   papers, official statistics, or government primary documents — CRS, GAO, OPM,
   BLS, NCES, HUD, CBP, a federal district court, and the Supreme Court. The two
   that do not are the College Board's annual pricing series (4.2) and an SSA press
   release (3.4), and both say so on the card. **No card rests on journalism.**
4. **Weak is allowed; hidden weakness is not.** Where the honest best card for a
   side is weak, it is drafted anyway and its weakness is stated in the card's own
   `description` and `reasoning`, and priced into `directness`.
5. **Weights are argued, not asserted.** Every card carries a one-line justification
   per dimension, per the rubric in `docs/ARGUMENT_MODEL.md` §4.

## How to read a card

All 20 objects below were extracted from this file and validated against the repo's
own `EvidenceSchema` from `lib/schemas/topic.ts` — 20/20 parse and pass — so they
can be pasted into a topic's `evidence` array without editing. (The first pass
caught one card whose description contained unescaped double quotes; it is fixed.)

Each card has: a checkbox, the paste-ready object, a per-dimension weight
justification table, a "URL check" line with the verbatim quote, and a "Known
weakness" line. Accept or reject in one pass; the summary table in §9 recomputes the
topic's balance on the assumption that everything is accepted.

---

## 1. `us-iran-conflict` — 3 cards on the `for` side

**Meta claim:** "US policy toward Iran — combining maximum-pressure sanctions,
covert operations, and military deterrence — has made the Middle East safer and
advanced American strategic interests."

**Current state:** 3 `for` / 9 `against`, balance 23, weight 76.

**The drafting problem.** This meta claim has two conjuncts and they came apart in
2024-26. "Made the Middle East safer" is very hard to defend: the region has seen
two direct US-Iran exchanges of fire, and the IAEA has lost continuity of knowledge
over Iran's program. "Advanced American strategic interests" is defensible on the
record. All three cards below are therefore about the second conjunct, and each says
so. A founder who thinks the map should only score the first conjunct should reject
all three and reword the meta claim instead — that is a legitimate call and the
cheaper fix.

### 1.1 — [ ] `un-snapback-2025`

```ts
{
  id: "un-snapback-2025",
  title: "UN Sanctions on Iran Snapped Back Indefinitely (September 2025)",
  description:
    "On August 28, 2025 France, Germany and the United Kingdom invoked the JCPOA's snapback mechanism, and on September 27, 2025 the six pre-2015 UN Security Council sanctions resolutions on Iran returned automatically. Per CRS, the 2025 invocation 'reimposed previously terminated sanctions and extended them and Iran's nuclear program as a subject of Security Council consideration, indefinitely' — closing the October 18, 2025 sunset that Resolution 2231 had written into the deal. This is the outcome the US failed to obtain when it attempted snapback alone in August 2020 and was rebuffed by the Council. China, Iran and Russia formally contested the E3's standing in an October 18, 2025 letter, and Iran responded by ending JCPOA-mandated transparency measures beyond its basic safeguards agreement.",
  side: "for" as const,
  weight: {
    sourceReliability: 9,
    independence: 7,
    replicability: 9,
    directness: 6,
  },
  source:
    "Congressional Research Service, 'Iran's Nuclear Program and UN Sanctions Reimposition,' IF11583 (version 27, updated April 6, 2026), by Paul K. Kerr",
  sourceUrl:
    "https://www.congress.gov/crs_external_products/IF/PDF/IF11583/IF11583.27.pdf",
  reasoning:
    "A concrete diplomatic outcome under the pressure track, not a justification for it: the sanctions architecture the 2015 deal dismantled is back and no longer expires. It advances a declared US strategic objective, which is the meta claim's second conjunct. Directness is held to 6 because restoring sanctions is not the same as making the region safer, and the same CRS product records that Iran answered by curtailing IAEA monitoring — a security regression that runs the other way.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 9 | CRS is Congress's nonpartisan research arm; the product is authored, versioned, and cites the underlying Council record. |
| independence | 7 | CRS is a US legislative-branch agency reporting on a US-aligned diplomatic action; not a party, but not disinterested either. |
| replicability | 9 | Pure documentary record — the E3 letter, the failed 19 September draft, and the reimposition date are all checkable against UN documents. |
| directness | 6 | Establishes a diplomatic win, not regional safety; the meta claim's first conjunct is untouched. |

**URL check:** fetched and read in full (CRS In Focus IF11583, version 27, 3 pp.).
Verbatim: *"Although that effort failed, France, Germany, and the United Kingdom (UK)
(collectively known as the "E3") invoked the snapback mechanism on August 28, 2025,
which resulted in the sanctions' reimposition on September 27, 2025."* And: *"The
2025 invocation of snapback reimposed previously terminated sanctions and extended
them and Iran's nuclear program as a subject of Security Council consideration,
indefinitely."* And: *"An October 18, 2025, letter to the Security Council from
China, Iran, and Russia argues that E3 lacks standing to invoke the snapback
mechanism."* Note: the stable product page `https://www.congress.gov/crs-product/IF11583`
returns HTTP 403 to automated clients; the versioned PDF above returns 200.

**Known weakness:** the E3, not the US, pulled the trigger, so attribution to *US*
policy is one inferential step. And the card's own closing fact (Iran ending
transparency measures) is a cost the map's `against` side could reasonably claim.

### 1.2 — [ ] `iran-regional-position-2024`

```ts
{
  id: "iran-regional-position-2024",
  title: "Iran's Regional Deterrent Network Was Gutted in 2024",
  description:
    "CRS assesses that in 2024 Iran's regional position 'weakened significantly, raising questions about the future viability of the axis of resistance': Israel killed Hezbollah leader Hassan Nasrallah in September 2024, Hezbollah lost 'as much as 80% of its once-vaunted drone and missile arsenal,' Hamas was degraded in Gaza, and the December 2024 fall of the Asad regime removed Iran's land bridge to Lebanon — described by one Iranian observer as 'the backbone of our regional presence.' CRS adds that these setbacks, plus the underwhelming performance of Iran's ballistic-missile strikes on Israel, 'suggest that Iran's leaders may no longer be able to rely as much on these traditional asymmetric methods of Iranian power projection.' The proximate agent in every case was Israeli military action or, in Syria, an opposition offensive — not US sanctions.",
  side: "for" as const,
  weight: {
    sourceReliability: 9,
    independence: 7,
    replicability: 7,
    directness: 7,
  },
  source:
    "Congressional Research Service, 'Iran: Background and U.S. Policy,' R47321 (updated May 22, 2025), by Clayton Thomas",
  sourceUrl:
    "https://www.congress.gov/crs_external_products/R/PDF/R47321/R47321.21.pdf",
  reasoning:
    "The single largest change in the regional balance since the map was written, and it runs in the direction of US strategic interests. It is the outcome-side counterweight to the map's `houthi-red-sea` and `tower-22-attack` cards, which describe the proxy network at its peak. Directness is 7 rather than 9 because US policy is a contributing rather than proximate cause — the card says so in its own last sentence — and because 'Iran weaker' and 'the region safer' are not the same proposition.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 9 | CRS, authored and sourced; the 80% arsenal figure is CRS's own characterisation of the reporting, not a press claim repeated. |
| independence | 7 | US legislative-branch agency writing about an adversary's setbacks; the underlying facts are widely corroborated, the framing is not neutral. |
| replicability | 7 | Nasrallah's death and Asad's fall are hard facts; "as much as 80% of the arsenal" is an estimate CRS itself hedges with "as much as." |
| directness | 7 | Directly on "advanced American strategic interests"; causally one step removed from US policy specifically. |

**URL check:** downloaded and read in full (CRS R47321, 22 May 2025, Clayton Thomas,
Specialist in Middle Eastern Affairs). Verbatim from the Summary: *"In 2024, Iran's
regional position weakened significantly, raising questions about the future
viability of the "axis of resistance": Israel severely degraded Hezbollah in Lebanon
and Hamas in Gaza, and regime change in Syria removed a longtime Iranian ally."*
Verbatim from the "Assessing Impact" section: *"For Iran, Hezbollah's weakening is
damaging not just because Iran's most valued and supposedly powerful ally has lost
most of its senior leaders, thousands of fighters, and as much as 80% of its
once-vaunted drone and missile arsenal to Israeli operations, but also because that
ally has failed to prevent or deter direct Israeli attacks, including on Iran
itself."* And: *"The fall of the Asad regime in Syria arguably represents an even
more critical blow to Iran's regional outlook; one Iranian observer described Syria
as 'the backbone of our regional presence.'"*

**Known weakness:** attribution. Nothing in the CRS text credits maximum-pressure
sanctions with these outcomes; the causal chain runs through Israeli operations and
the Syrian opposition. A reviewer who reads the meta claim strictly as "US policy
caused X" should mark this card's directness down further or reject it.

### 1.3 — [ ] `houthi-us-truce-2025`

```ts
{
  id: "houthi-us-truce-2025",
  title: "US-Houthi Truce Has Held Since May 2025 After Operation Rough Rider",
  description:
    "From March to May 2025 US forces expanded strikes on the Houthis (Operation Rough Rider) 'seeking to compel a lasting end to Houthi maritime attacks.' The campaign ended under an Oman-brokered agreement in which the Houthis agreed to stop targeting US vessels and the US agreed to halt strikes. As of CRS's July 21, 2026 update, 'a U.S.-Houthi truce has held since May 2025' — the clearest case in the map of military pressure producing a durable, verifiable behavioural change by an Iran-backed group. The limits are severe and specific: the truce covers US vessels only. The Houthis renewed attacks on some non-US ships in July 2025, continued strikes on Israel until October 2025 and resumed them during the 2026 conflict, and in June and July 2026 threatened Israel-linked and Saudi-linked shipping.",
  side: "for" as const,
  weight: {
    sourceReliability: 9,
    independence: 7,
    replicability: 8,
    directness: 7,
  },
  source:
    "Congressional Research Service, 'Yemen: Conflict, Red Sea Security, and U.S. Policy,' IF12581 (updated July 21, 2026)",
  sourceUrl:
    "https://www.congress.gov/crs_external_products/IF/PDF/IF12581/IF12581.19.pdf",
  reasoning:
    "This is the strongest available outcome-evidence for the deterrence half of the meta claim, and it sits in the `proxy-warfare` pillar directly opposite `houthi-red-sea`. A fourteen-month truce is a measurable result of having acted, which is the test the adjudication set. Directness is capped at 7 because the truce is narrow — it protects US hulls and nothing else — and the card states that limit rather than burying it.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 9 | CRS, updated within two months of this draft, describing the operation, the agreement, and its durability. |
| independence | 7 | US legislative-branch source on a US military outcome; CRS hedges the agreement's terms with "reportedly" in its longer Yemen product. |
| replicability | 8 | The absence of Houthi attacks on US vessels since May 2025 is checkable against CENTCOM, UKMTO and Lloyd's incident reporting. |
| directness | 7 | Direct evidence on proxy deterrence; silent on the nuclear file and on regional safety overall. |

**URL check:** downloaded and read in full (CRS In Focus IF12581, updated July 21,
2026). Verbatim: *"From March to May 2025, U.S. forces expanded strikes against the
Houthis seeking to compel a lasting end to Houthi maritime attacks. The U.S.
campaign ended under an agreement brokered by neighboring Oman in which the Houthis
agreed to cease targeting U.S. vessels and the United States agreed to halt
strikes."* And: *"A U.S.-Houthi truce has held since May 2025, but Houthi attacks on
Israel did not end until October 2025 and resumed during the 2026 U.S.-Israel-Iran
conflict."* And: *"The Houthis renewed attacks on some non-U.S. ships in July 2025."*

**Known weakness:** a truce that protects only US-flagged and US-linked vessels while
Red Sea traffic stays depressed for everyone else is a narrow win, and the map's
existing `houthi-red-sea` card (`against`) arguably already prices the broader
failure. If the founder judges the two cards to be two halves of one finding, the
right fix is to split `houthi-red-sea` rather than add this.

---

## 2. `obesity-personal-responsibility` — 3 cards on the `for` side

**Meta claim:** "The obesity epidemic is primarily caused by individual lifestyle
choices, and framing it as a disease or systemic issue undermines personal
responsibility."

**Current state:** 2 `for` / 10 `against`, balance 18, weight 72. This is the
thinnest `for` side in the set — the second-reader pass moved
`personal-agency-cross-cultural` to `against`, leaving only `obesity-tripled-50-years`
and `weight-regain-discontinuation`.

**The drafting problem — read this before scoring the cards.** The first conjunct
("primarily caused by individual lifestyle choices") is, on the current literature,
the losing side of a settled question, and I could not find a strong honest card for
it. Hall's metabolic-ward RCT, twin heritability, metabolic adaptation and the GLP-1
trials are all real and all point the other way. The second conjunct ("framing it as
a disease undermines personal responsibility") is a different proposition and is
actually *supported* by experimental evidence. Two of the three cards below therefore
attack the boundary — genes and environment are not destiny — rather than asserting
that choice is the primary cause, and one goes at the framing conjunct head-on. This
is the honest maximum. If the founder wants a genuinely balanced map here, the
structural fix is to split the meta claim into its two conjuncts; the causation
conjunct would then read "settled against" and the framing conjunct "contested,"
which is what the evidence actually says.

### 2.1 — [ ] `disease-label-self-regulation`

```ts
{
  id: "disease-label-self-regulation",
  title: "Experiments: 'Obesity Is a Disease' Messaging Weakened Diet Self-Regulation",
  description:
    "Across three experiments, Hoyt, Burnette and Auster-Gussman exposed participants to a real New York Times article on the American Medical Association's 2013 classification of obesity as a disease. Relative to an information-based message, the disease-based message 'weakened the importance placed on health-focused dieting and reduced concerns about weight among obese individuals — the very people whom such public-health messages are targeting,' and that reduced concern predicted higher-calorie food choices in a subsequent selection task. The disease message also lowered body-image dissatisfaction, which the authors count as a benefit, but that too predicted higher-calorie choices. These are single-session laboratory studies measuring stated attitudes and a hypothetical food choice, not weight outcomes over time.",
  side: "for" as const,
  weight: {
    sourceReliability: 8,
    independence: 8,
    replicability: 5,
    directness: 8,
  },
  source:
    "Hoyt, C. L., Burnette, J. L., & Auster-Gussman, L. (2014). '\"Obesity Is a Disease\": Examining the Self-Regulatory Impact of This Public-Health Message.' Psychological Science, 25(4), 997-1002. doi:10.1177/0956797613516981",
  sourceUrl: "https://scholarship.richmond.edu/jepson-faculty-publications/507/",
  reasoning:
    "This is the only card in the map that tests the meta claim's second conjunct — that disease framing undermines personal responsibility — experimentally rather than rhetorically, which is why directness is high. Replicability is scored low: three small single-lab experiments in the 2014 social-psychology literature, with no direct replication located; a 2024 national cross-sectional survey reaches a compatible conclusion (disease framing does not raise weight-loss motivation) but is not a replication of this design.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 8 | Peer-reviewed in *Psychological Science*, a top journal — discounted from 9 for the 2014 vintage and small-N experimental social psychology. |
| independence | 8 | Academic authors with no commercial stake; the finding cuts against the AMA position rather than flattering a funder. |
| replicability | 5 | Three single-session lab studies from one lab; no direct replication found; effect is on stated attitudes and a hypothetical choice. |
| directness | 8 | Tests the meta claim's framing conjunct almost verbatim. |

**URL check:** fetched (HTTP 200) and the abstract read in full from the page.
Verbatim: *"A disease-based, relative to an information-based, weight-management
message weakened the importance placed on health-focused dieting and reduced
concerns about weight among obese individuals—the very people whom such public-health
messages are targeting. Further, the decreased concern about weight predicted
higher-calorie food choices."* The DOI `https://doi.org/10.1177/0956797613516981`
returns HTTP 403 to automated clients (SAGE bot-block); the Richmond institutional
repository page returns 200 and carries the full abstract and citation.

**Known weakness:** it measures a messaging effect, not a cause of obesity. Read
strictly, it supports "the disease frame has psychological costs," which is weaker
than "the disease frame undermines personal responsibility" and much weaker than
"obesity is primarily caused by individual choices."

### 2.2 — [ ] `fto-activity-interaction`

```ts
{
  id: "fto-activity-interaction",
  title: "Physical Activity Cuts the FTO Obesity Gene's Effect by 27% (218,166 adults)",
  description:
    "The largest test of gene-by-lifestyle interaction in obesity pooled 45 adult studies (n=218,166) and nine child studies (n=19,268) using a common analysis plan rather than published effect sizes. In adults, each copy of the FTO rs9939609 risk allele raised the odds of obesity 1.30-fold in the physically inactive group but only 1.22-fold in the physically active group — an attenuation of 27% (p-interaction = 0.001). The authors conclude that 'the view of genetically determined obesity not being amenable to exercise is incorrect and should be challenged.' Two limits are load-bearing: no such interaction was found in children and adolescents, and physical activity had to be collapsed into a crude active/inactive binary because the source studies measured it in incompatible ways.",
  side: "for" as const,
  weight: {
    sourceReliability: 9,
    independence: 9,
    replicability: 8,
    directness: 6,
  },
  source:
    "Kilpeläinen, T. O., Qi, L., Brage, S., et al. (2011). 'Physical Activity Attenuates the Influence of FTO Variants on Obesity Risk: A Meta-Analysis of 218,166 Adults and 19,268 Children.' PLoS Medicine, 8(11), e1001116. doi:10.1371/journal.pmed.1001116",
  sourceUrl:
    "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1001116",
  reasoning:
    "Directly limits the map's `twin-study-heritability` card: heritability estimates describe variance in a fixed environment, and this shows the strongest known obesity locus has a 27% smaller effect in people who move. That is the most defensible empirical form of the personal-responsibility case — behaviour modifies genetic risk. Directness is only 6 because attenuating a single common variant's odds ratio is a long way from showing that individual choice is the *primary cause* of a population-level epidemic.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 9 | *PLoS Medicine*; individual-participant meta-analysis with a pre-specified common analysis plan, the strongest design available for interaction detection. |
| independence | 9 | 54 contributing cohorts across many institutions and countries; no single group's data can drive the result. |
| replicability | 8 | Built precisely to settle a literature where earlier single studies disagreed; data sources are named cohorts. Docked 2 for the self-reported, dichotomised activity measure. |
| directness | 6 | Shows genes are not destiny; does not show choice dominates. Cross-sectional interaction, mostly single-timepoint. |

**URL check:** fetched (HTTP 200) and the abstract and Editors' Summary read in full.
Verbatim: *"The association of the FTO risk allele with the odds of obesity is
attenuated by 27% in physically active adults, highlighting the importance of PA in
particular in those genetically predisposed to obesity."* And: *"No such interaction
was found in children and adolescents."* And, from the Editors' Summary: *"This study
demonstrates that people who carry the susceptibility gene for obesity can benefit
from physical activity."*

**Known weakness:** a 27% attenuation of a 1.30 odds ratio is a small absolute
effect, and FTO explains only a sliver of BMI variance. The card is evidence against
strong genetic determinism, not evidence for the meta claim's "primarily caused by
individual lifestyle choices."

### 2.3 — [ ] `dpp-lifestyle-trial`

```ts
{
  id: "dpp-lifestyle-trial",
  title: "Diabetes Prevention Program RCT: Lifestyle Change Beat the Drug (n=3,234)",
  description:
    "The NIH Diabetes Prevention Program randomised 3,234 adults with prediabetes (mean BMI 34.0) to placebo, metformin, or an intensive lifestyle programme targeting 7% weight loss and 150 minutes of activity per week. Over a mean 2.8 years the lifestyle arm cut diabetes incidence by 58% (95% CI 48-66) versus 31% (95% CI 17-43) for metformin, and was significantly more effective than the drug; mean weight loss was 5.6 kg versus 2.1 kg on metformin and 0.1 kg on placebo. The honest qualifications are large: 'intensive lifestyle' meant a 16-lesson curriculum with individual case managers — a structural intervention, not unaided willpower — and only 38% of that arm still held a 7% loss at their most recent visit.",
  side: "for" as const,
  weight: {
    sourceReliability: 10,
    independence: 9,
    replicability: 8,
    directness: 5,
  },
  source:
    "Diabetes Prevention Program Research Group (2002). 'Reduction in the Incidence of Type 2 Diabetes with Lifestyle Intervention or Metformin.' New England Journal of Medicine, 346(6), 393-403. doi:10.1056/NEJMoa012512",
  sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1370926/",
  reasoning:
    "A large multi-centre RCT is the strongest evidence class in the map, and it shows that changing what individuals eat and how much they move produces real, measurable metabolic benefit — the empirical core of the personal-responsibility position. Directness is deliberately low at 5 because the trial delivered behaviour change through an expensive institutional programme, which is closer to the systemic-intervention thesis than to the meta claim, and because diabetes incidence is a proxy for the weight outcome actually at issue.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 10 | NEJM; 27-centre NIH-funded randomised controlled trial, stopped early for efficacy; the canonical trial in the field. |
| independence | 9 | Publicly funded, multi-centre, no commercial sponsor with a stake in the lifestyle arm winning. |
| replicability | 8 | Results match the Finnish DPS and the Da Qing trial, which the paper itself compares against; long follow-up published as DPPOS. |
| directness | 5 | Delivered by professionals at scale; outcome is diabetes incidence, not obesity causation. The card argues against its own headline here. |

**URL check:** fetched (HTTP 200) and the full text read from PubMed Central.
Verbatim: *"The lifestyle intervention reduced the incidence by 58 percent (95
percent confidence interval, 48 to 66 percent) and metformin by 31 percent (95
percent confidence interval, 17 to 43 percent), as compared with placebo; the
lifestyle intervention was significantly more effective than metformin."* And: *"The
average weight loss was 0.1, 2.1, and 5.6 kg in the placebo, metformin, and
lifestyle-intervention groups, respectively."* And: *"38 percent had a weight loss of
at least 7 percent at the time of the most recent visit."*

**Known weakness:** the sharpest counter to this card is the map's existing
`weight-regain-discontinuation` card and the Look AHEAD trial, in which a comparable
intensive lifestyle intervention produced 8.6% weight loss at one year, about 6% at
the end of intervention, and **no** reduction in cardiovascular events. A reviewer
may reasonably judge DPP to be evidence that supported behaviour change works, which
is a systemic claim, not a personal-responsibility one.

---

## 3. `doge-federal-cuts` — 4 cards on the `for` side

**Meta claim:** "The Department of Government Efficiency's mass workforce cuts,
contract terminations, and spending freezes have eliminated waste, fraud, and abuse
and made the federal government leaner and more effective."

**Current state:** 4 `for` / 12 `against`, balance 25, weight 78.

**The drafting problem.** This is the hardest of the set, for a structural reason
the adjudication already named. The meta claim has three verbs — *eliminated waste,
fraud and abuse*, *made leaner*, *made more effective* — and the map's four existing
`for` cards answer none of them. `gao-improper-payments` measures how much fraud
*exists* (a reason to act), `performance-review-anomaly` measures how badly
performance appraisal works (another reason to act), and `scotus-workforce-stay` and
`trump-v-slaughter` are rulings about *who may fire*, which §8 of the adjudication
separately flagged as the "legal-authority cards scored as substantive evidence"
error. Two of the four `for` cards are the error classes the adjudication
catalogued.

So the side needs outcome measures, one per verb. They are very unequal:

- **Leaner** — cleanly, officially true (cards 3.1, 3.2).
- **Eliminated waste** — one small, agency-estimated dollar figure survives
  (card 3.3). The best available government-wide outcome measure moved the *wrong*
  way: GAO reported on 27 April 2026 that agencies identified **$186 billion** in
  FY2025 improper payments, *"a $24 billion increase in improper payments from the
  previous fiscal year"*
  (`https://www.gao.gov/press-release/gao-reports-improper-payments-rose-estimated-186-billion-across-federal-government-fiscal-year-2025`).
- **More effective** — one self-reported agency press release whose own authors
  credit something other than the cuts (card 3.4).

**One tempting card I deliberately did not draft.** GAO-26-108615 (6 Aug 2026)
contains the single best-looking sentence for DOGE in the whole audit record:
*"DOGE followed its stated methodology for 7,710 contracts associated with 27.5
percent, or $16.8 billion, of the reported savings."* I verified it. I am not
proposing it as a `for` card, because the report it sits in is titled *"More
Transparency Needed on How Savings Are Derived"* and concludes that *"DOGE did not
use its stated methodology to calculate the majority of savings associated with the
contracts reported as terminated,"* that for grants *"DOGE did not provide
sufficient information to verify the method used to calculate 96 percent of
DOGE-reported savings,"* and that one claimed *"more than $1.7 billion in savings on
a DOD Defense Health Agency contract"* evaporated because *"no action was taken to
completely or partially terminate the contract...Thus, no savings were achieved."*
Lifting the favourable clause out of an adverse report is exactly error class §7(a).
If the founder wants it on the map, it belongs on the `against` side with the 27.5%
figure as its qualifier.

**Three disconfirming facts a reviewer should hold alongside all four cards.**
(i) Federal outlays *rose*: Treasury's Final Monthly Treasury Statement for FY2025
puts total outlays at $7,009,974 million against $6,734,896 million in FY2024
(`https://fiscaldata.treasury.gov/static-data/published-reports/mts/MonthlyTreasuryStatement_202509.pdf`).
(ii) Contract obligations *rose*: GAO, 5 May 2026 — *"In fiscal year 2025, the
federal government committed about $793 billion on contracts, a $17.8 billion
increase from fiscal year 2024 after adjusting for inflation."*
(iii) The voluntary route was expensive up front: GAO-26-108477 (15 Sept 2026) —
*"federal agencies in our review spent $9.5 billion in salary costs on paid
administrative leave in 2025"*, of which *"about $6.7 billion of that amount was
associated with deferred resignation program."*

### 3.1 — [ ] `federal-workforce-contraction`

```ts
{
  id: "federal-workforce-contraction",
  title: "Federal Civilian Employment Fell 13.8% Between January 2025 and August 2026",
  description:
    "BLS Current Employment Statistics series CES9091100001 (federal, excluding the U.S. Postal Service, seasonally adjusted) stood at 2,405.7 thousand in January 2025 and 2,072.8 thousand in August 2026 — a fall of 332,900 positions, or 13.8%. Including the Postal Service, federal payrolls went from 3,010 thousand to 2,674 thousand. OPM's own workforce dashboard reports a net change of -271,363 employees since January 20, 2025 on data through July 2026, and states that 'the size of the federal workforce has generally expanded over time. This is changing.' The 'leaner' verb in the claim is therefore straightforwardly true and independently measured. The other two verbs are not: headcount says nothing about output, cost, or service quality, and federal outlays rose by roughly $275 billion over the same fiscal year.",
  side: "for" as const,
  weight: {
    sourceReliability: 10,
    independence: 9,
    replicability: 10,
    directness: 6,
  },
  source:
    "U.S. Bureau of Labor Statistics, Current Employment Statistics, series CES9091100001 (federal except U.S. Postal Service, seasonally adjusted); corroborated by U.S. Office of Personnel Management, Workforce Changes dashboard (data as of July 2026)",
  sourceUrl: "https://data.bls.gov/timeseries/CES9091100001?output_view=data",
  reasoning:
    "The only one of the meta claim's three verbs with a clean, monthly, independently produced official statistic behind it, and an unambiguous result rather than a reason to act. Source reliability and replicability are maxed because CES is the federal payroll benchmark and the series is public and continuously revised. Directness is capped at 6 because 'leaner' is one third of the claim; nothing here bears on waste eliminated or effectiveness gained.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 10 | BLS CES is the benchmark US payroll series, produced by an independent federal statistical agency on a fixed monthly schedule. |
| independence | 9 | BLS has no stake in DOGE's success; the corroborating OPM figure does, and is used only as a cross-check. |
| replicability | 10 | The whole series is public and queryable; anyone can reproduce both endpoints in a minute. |
| directness | 6 | Answers "leaner" and nothing else. Headcount is not output, cost, or effectiveness. |

**URL check:** fetched (HTTP 200). The series page identifies itself as *"All
employees, thousands, federal, except u.s. postal service, seasonally adjusted"* and
returns **2,405.7** for January 2025 and **2,072.8** for August 2026 (preliminary).
The Table B-1 release at `https://www.bls.gov/news.release/empsit.t17.htm` (also
fetched) shows total federal at 2,916 thousand in August 2025 and 2,674 thousand in
August 2026. OPM's dashboard
(`https://data.opm.gov/explore-data/analytics/workforce-changes`, fetched) reports
*"-271,363"* since January 20, 2025, *"Data as of July 2026"*, with the narrative
line *"The size of the federal workforce has generally expanded over time. This is
changing."* Because these are data tables there is no prose sentence to quote for
the headline numbers themselves; the figures above are read directly off the series.

**Known weakness:** nearly half the drop lands in a single month, October 2025, when
the deferred-resignation cohort came off payroll — so the series measures when people
stopped being paid, not when work stopped being done. Hiring resumed during 2026.

### 3.2 — [ ] `deferred-resignation-uptake`

```ts
{
  id: "deferred-resignation-uptake",
  title: "The Workforce Reduction Was Mostly Voluntary and Largely Not Backfilled",
  description:
    "OPM reports 139,963 enrollees in the Deferred Resignation Program and 20,557 subsequent hires it classifies as backfills, concluding that 'more than 85 percent of employees who took the program are not matched to any subsequent hire.' GAO independently records that 'roughly 144,000 employees were approved for a deferred resignation program and would end their federal employment by the end of 2025.' The reduction was therefore achieved mainly through voluntary separations rather than involuntary firings, and it has largely not been reversed by re-hiring — which distinguishes it from the roughly 25,000 essential-worker rehires the map's `essential-rehires` card records. Note that the widely repeated figure of 154,000 traces to press reporting, not to OPM; OPM's own number is about 140,000.",
  side: "for" as const,
  weight: {
    sourceReliability: 7,
    independence: 5,
    replicability: 8,
    directness: 6,
  },
  source:
    "U.S. Office of Personnel Management, 'Last Year's Workforce Reductions Were Real' (Secrets of OPM); corroborated by U.S. Government Accountability Office, GAO-26-108719 (Feb. 24, 2026)",
  sourceUrl:
    "https://www.opm.gov/news/secrets-of-opm/last-year-s-workforce-reductions-were-real",
  reasoning:
    "Speaks to whether the leaner workforce is durable, which is the natural objection to card 3.1, and it is a result rather than a reason. Independence is scored 5 and must be disclosed: OPM implemented the programme and is publicly defending it in the very post being cited; the card rests on OPM's count only because GAO's independent figure (~144,000) is consistent with it. Directness is 6 for the same reason as 3.1 — durable leanness is still only one of the claim's three verbs.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 7 | An agency communications post, not an audited report — but its headline count is corroborated within 3% by GAO. |
| independence | 5 | OPM designed and ran the programme and the cited page exists to defend it. Record as `interest` on the source. |
| replicability | 8 | Separation and hiring counts are derivable from OPM's own FedScope cubes and the BLS series; GAO already checked the headline. |
| directness | 6 | Establishes durability of the reduction, not waste eliminated or effectiveness gained. |

**URL check:** fetched (HTTP 200). Verbatim from the OPM post: *"more than 85
percent of employees who took the program are not matched to any subsequent hire."*
Verbatim from GAO-26-108719 (`https://www.gao.gov/products/gao-26-108719`, fetched):
*"roughly 144,000 employees were approved for a deferred resignation program and
would end their federal employment by the end of 2025."*

**Known weakness:** the voluntary route carried a large up-front bill. GAO-26-108477
found federal agencies spent *"$9.5 billion in salary costs on paid administrative
leave in 2025"*, about *"$6.7 billion"* of it tied to the deferred resignation
programme — a sixfold increase over 2023 — while noting OPM *"does not know the
actual costs of paid administrative leave used for workforce reduction efforts."*
A reviewer could reasonably treat that as making this card two-directional and ask
for a split.

### 3.3 — [ ] `gsa-lease-terminations`

```ts
{
  id: "gsa-lease-terminations",
  title: "GSA Estimates $112 Million in Annual Savings from 260+ Lease Terminations",
  description:
    "Reviewing the real-property strand of DOGE's work, GAO reported that 'GSA estimates $112 million in annual costs savings from over 260 completed lease terminations or leases for which GSA has sent an intent to terminate.' This is the most concrete dollar figure in the audit record that has survived review, and it is a result rather than a projection. Two things keep it small. GAO relays GSA's own estimate without independently confirming it. And GAO found that 108 of the 264 leases were already in the termination pipeline before DOGE existed, inflating the attributable saving by roughly $15.3 million. For scale, $112 million is about 0.0016% of FY2025 federal outlays.",
  side: "for" as const,
  weight: {
    sourceReliability: 8,
    independence: 5,
    replicability: 6,
    directness: 6,
  },
  source:
    "U.S. Government Accountability Office, GAO-26-108785, 'Federal Real Property' (Dec. 11, 2025)",
  sourceUrl: "https://files.gao.gov/reports/GAO-26-108785/index.html",
  reasoning:
    "The only verified-through-GAO dollar saving on the map, and it bears on the 'eliminated waste' verb that nothing else answers. It is deliberately weighted low: the number is GSA's own estimate rather than an audited figure, 41% of the leases were already being terminated anyway, and the magnitude is negligible against the claim's rhetoric. Including it honestly means including its scale.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 8 | GAO, the federal audit authority; the report explicitly flags the pre-existing-pipeline problem rather than hiding it. |
| independence | 5 | The dollar figure is GSA's self-estimate; GAO transmits rather than certifies it. |
| replicability | 6 | Lease-by-lease terminations are traceable in GSA inventory data, but the annualised saving depends on GSA's assumptions. |
| directness | 6 | On-claim (waste eliminated) but three orders of magnitude smaller than the claim implies. |

**URL check:** fetched (HTTP 200). Verbatim: *"GSA estimates $112 million in annual
costs savings from over 260 completed lease terminations or leases for which GSA has
sent an intent to terminate."*

**Known weakness:** scale. A founder could reasonably decide that a $112 million
agency estimate does not belong on a map about whether mass cuts "eliminated waste,
fraud, and abuse," because accepting it invites the reader to treat a rounding error
as vindication. I would still include it, precisely because its smallness is
informative.

### 3.4 — [ ] `ssa-service-metrics`

```ts
{
  id: "ssa-service-metrics",
  title: "SSA Service Metrics Improved Sharply While Its Workforce Shrank",
  description:
    "The Social Security Administration reported in June 2026 that it had cut 'the National 800 Number average speed of answer from 34 minutes in 2024 to 8 minutes to date, a 75 percent reduction,' brought the initial disability claims backlog down from nearly 1.3 million in 2024 to 853,000, reduced field office waits about 30 percent, and processed 385 million online transactions in the fiscal year to date. These are the only service-quality improvements in the record that coincide with the cuts, and they matter because SSA service collapse is the map's `ssa-service-collapse` card. The causal link to DOGE is not established and SSA does not assert one: the release credits leadership, straight-through processing, and an interactive voice response system now handling nearly 40% of calls — technology investments, not workforce reduction. The agency is also grading its own work.",
  side: "for" as const,
  weight: {
    sourceReliability: 5,
    independence: 2,
    replicability: 4,
    directness: 5,
  },
  source:
    "Social Security Administration press release, June 29, 2026 (retrieved via the Internet Archive; ssa.gov blocks automated retrieval)",
  sourceUrl:
    "https://web.archive.org/web/20260904200826/https://www.ssa.gov/news/en/press/releases/2026-06-29.html",
  reasoning:
    "This is the honest floor of the 'more effective' verb: it is the only outcome evidence that exists, and it is weak. Independence is 2 because SSA is both the subject and the scorer, and the agency attributes the gains to something other than the policy under test. Source reliability is 5 because a press release is not an audited performance report. I am drafting it rather than leaving the verb empty, and the description states its own defeat condition.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 5 | Agency press release, not an IG or GAO performance audit; no methodology published for the wait-time measures. |
| independence | 2 | SSA is a party to the claim and is reporting on itself; the release is promotional in form. |
| replicability | 4 | Some metrics (backlog counts) appear in SSA's published operational data; the 800-number figures do not have an external check. |
| directness | 5 | On the right verb, but the agency's own causal story points away from workforce reduction. |

**URL check:** the live page at
`https://www.ssa.gov/news/en/press/releases/2026-06-29.html` returns HTTP 403 to
automated clients (Akamai bot-block); the Internet Archive snapshot dated 4 Sept
2026 returns HTTP 200 and was fetched. Verbatim: *"Reducing the National 800 Number
average speed of answer from 34 minutes in 2024 to 8 minutes to date, a 75 percent
reduction."*

**Known weakness:** every weakness, stated. Self-reported, unaudited, and causally
disclaimed by its own author. If the founder's bar is "no card whose source denies
the inference the card is used for," reject this one and leave the "more effective"
verb formally unevidenced — which is itself the honest finding.

**Not drafted, available if wanted:** the GAO-26-108615 27.5% / $16.8 billion clause
(see above — belongs on `against`); the SSA Numident death-record cleanup (**not
verified** — no SSA-published count of corrected records could be retrieved, ssa.gov
403s, and the one primary product reachable, an SSA OIG audit dated 2 July 2026,
found 45% of corrected death records lacked required documentation); a CBO product
crediting DOGE (**not found** — the only relevant CBO estimate, on H.R. 7256
separation incentives, projects a $393 million *increase* in direct spending over
2026-2036); and a peer-reviewed or think-tank study measuring a positive effect
(**not found**, of any political valence — no card should imply one exists).

---
## 4. `scott-cost-disease` — 3 cards on the `against` side

**Meta claim:** "Since roughly 1960, the real (inflation-adjusted) cost of U.S.
health care, K-12 and higher education, and infrastructure has risen several-fold
with little or no matching gain in measured output — a genuine 'cost disease' — and
it is produced by a stack of reinforcing causes rather than any single villain."

**Current state:** 13 `for` / 3 `against`, balance 85, weight 81. The second-reader
pass moved `haircut-counterexample` to `for`, leaving only three `against` cards
(`admin-is-real-coordination`, `medicine-improved`, `scope-geography`) — and two of
those three are `Synthesis / inference` cards with no source URL at all (see §8).
This is the most one-sided map in the set.

**The drafting problem.** This meta claim is a conjunction of three separable
propositions: (a) real costs rose several-fold; (b) measured output did not match;
(c) the cause is a stack, not one villain. Proposition (a) is essentially
uncontested. The live target is (b), and that is where all three cards go. One card
each for the three named sectors that have a genuine counter-case: health care,
higher education, and K-12. Infrastructure has no honest counter-card I could find —
the Transit Costs Project and Brooks & Liscow findings stand — and I am not going to
manufacture one. Proposition (c) is also attackable (Helland & Tabarrok's own
conclusion is closer to "one villain, and it's Baumol"), but the map already carries
that source on the `for` side and adding a second card from the same book on the
opposite side is the atomicity defect the adjudication catalogued, not a fix.

Note for the reviewer: three of the map's existing `for` cards (`flat-output`,
`naep-flat`, `k12-counterexample`) cite the **same** NCES URL. That already trips the
model's §5.5 balance warning ("≥3 `evidences` edges sharing `source.institution`
warns regardless of polarity"). Card 4.3 is the direct counterweight.

**This is the one topic where three cards are not enough to move the quadrant.**
Accepting all three takes balance from 85 to **70** — and 70 is exactly the settled
boundary (d = |70 − 50| = 20 = `VERDICT.SETTLED_D`), so the verdict stays "Settled —
evidence strongly favors the claim" by a single point. A fourth `against` card of
any plausible weight (total strength ≥ 7) would tip it to "contested." I did not
draft one, because the two candidates I worked up do not survive the honesty test:
(a) Anderson et al., "It's the Prices, Stupid" (Health Affairs 2003), is a genuine
single-villain claim against the meta claim's third conjunct, but it explains the
US–peer *level* gap, not growth since 1960; (b) BEA's Health Care Satellite Account
disease-based price indexes are official statistics and directly on point, but BEA's
own published results run in both directions depending on period (disease-based
prices grew 4.4% vs 6.1% annually for individual treatments in 2003-05, yet the
2000-10 HCSA results produced *higher* PCE health prices), so a card would have to
misrepresent the literature to be usable. If the founder wants this map out of
"settled," the honest lever is to re-examine `k12-counterexample` and
`haircut-counterexample`, both of which attack a *pillar's sub-hypothesis* rather
than the meta claim — the exact error class §7(c) of the adjudication catalogued.

### 4.1 — [ ] `tech-change-worth-the-cost`

```ts
{
  id: "tech-change-worth-the-cost",
  title: "Cutler & McClellan: Four of Five Conditions Bought More Than They Cost",
  description:
    "Cutler and McClellan priced the costs and health benefits of technological change at the disease level rather than for medicine as a whole, for five conditions. For four of them — heart attacks, low-birthweight infants, depression and cataracts — 'the estimated benefit of technological change is much greater than the cost'; for the fifth, breast cancer, costs and benefits were roughly equal. Their aggregate conclusion is stronger still: the gains from lower infant mortality and better heart-attack treatment alone 'are about equal to the entire cost increase for medical care over time.' If that holds, the health-care leg of the cost-disease claim is a measurement artifact, exactly as the `measurement-artifact` pillar's skeptic premise contends. The analysis covers five conditions to roughly 2000 and does not attempt to value the other ~80% of health spending.",
  side: "against" as const,
  weight: {
    sourceReliability: 9,
    independence: 7,
    replicability: 7,
    directness: 8,
  },
  source:
    "Cutler, D. M., & McClellan, M. (2001). 'Is Technological Change In Medicine Worth It?' Health Affairs, 20(5), 11-29. doi:10.1377/hlthaff.20.5.11",
  sourceUrl:
    "https://users.wfu.edu/daltonc/docs/Readings/cutler_technologicalchange.pdf",
  reasoning:
    "The strongest quantified version of the quality-adjustment defence, aimed squarely at the meta claim's 'little or no matching gain in measured output' clause in the flagship sector. It is the empirical content the map's `medicine-improved` card currently asserts without a source. Independence is 7 because both authors are long-standing public advocates of the 'medical spending is worth it' position and McClellan went on to run CMS; replicability is 7 because disease-level cost-benefit accounting requires contestable valuations of a life-year.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 9 | Peer-reviewed in *Health Affairs*, the leading health-policy journal; the disease-level method it introduced became standard. |
| independence | 7 | Both authors are identified with the pro-technology reading; McClellan joined the Council of Economic Advisers in 2001 and later led CMS. |
| replicability | 7 | Method is transparent and has been repeated for other conditions, but results hinge on the dollar value assigned to a life-year. |
| directness | 8 | Directly answers "did output match?" in the sector that dominates the cost-disease story. |

**URL check:** fetched (HTTP 200) and the article's first pages read directly.
Verbatim from the abstract: *"We analyze technological change in five conditions to
determine if this is so. In four of the conditions—heart attacks, low-birthweight
infants, depression, and cataracts—the estimated benefit of technological change is
much greater than the cost. In the fifth condition, breast cancer, costs and
benefits are about of equal magnitude."* Verbatim from p. 12: *"The benefits from
lower infant mortality and better treatment of heart attacks have been sufficiently
great that they alone are about equal to the entire cost increase for medical care
over time."* The canonical DOI page `https://doi.org/10.1377/hlthaff.20.5.11`
returns HTTP 403 to automated clients (Health Affairs bot-block); the copy above is
the published article as scanned, hosted on a Wake Forest course page.

**Known weakness:** the source URL is a university course mirror rather than the
publisher. If the founder wants a publisher-hosted link, `healthaffairs.org/doi/10.1377/hlthaff.20.5.11`
is live in a browser but bot-blocked, which in the model's vocabulary is
`verification: "bot-blocked-assumed-live"`. Substantively: the paper predates the
2000s cost surge and says nothing about the education or infrastructure legs.

### 4.2 — [ ] `net-tuition-falling`

```ts
{
  id: "net-tuition-falling",
  title: "Net Tuition at Public Four-Years Has Fallen 48% in Real Terms Since 2012-13",
  description:
    "Published sticker prices and the price students actually pay have moved in opposite directions for more than a decade. In constant 2025 dollars, average net tuition and fees for first-time full-time in-state students at public four-year institutions 'peaked in 2012-13 at $4,450 and declined to an estimated $2,300 in 2025-26' — a 48% real fall. At private nonprofit four-years, net tuition fell from $19,810 (2006-07) to an estimated $16,910. Over the decade to 2025-26 inflation-adjusted published tuition also fell 7% at public four-years and 10% at public two-years. Even published prices rose about 2x in real terms at public four-years across the whole 1995-96 to 2025-26 span ($5,940 to $11,950) — substantial, but not the 'several-fold' the meta claim asserts, and the net figure is the one families face.",
  side: "against" as const,
  weight: {
    sourceReliability: 8,
    independence: 6,
    replicability: 9,
    directness: 7,
  },
  source:
    "College Board, 'Trends in College Pricing and Student Aid 2025' (October 2025), Highlights and Figures CP-2, CP-4, CP-9, CP-10",
  sourceUrl:
    "https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2025-final_1.pdf",
  reasoning:
    "The higher-education leg of the meta claim rests on sticker prices, and the price actually paid has been falling in real terms for thirteen years. That is a direct, measured contradiction of 'cost has risen several-fold' for the sector, published annually with underlying tables. Independence is scored 6 because the College Board is an interested party — it administers the tests and aid forms whose cost is under discussion — and directness is 7 because net price shifts cost to taxpayers and institutions rather than eliminating it, so the resource cost of producing a degree may still be rising.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 8 | The standard annual reference series for US college pricing; underlying tables published alongside. Not peer-reviewed. |
| independence | 6 | College Board is a sector body with a commercial stake in enrolment and in the perception of affordability. Disclose as `interest`. |
| replicability | 9 | Built from IPEDS and the College Board's own annual survey; every figure has a downloadable table. |
| directness | 7 | Measures price to students, not the resource cost of producing education — the quantity the meta claim is really about. |

**URL check:** fetched (HTTP 200), downloaded and read. Verbatim from the Highlights
(p. 3): *"The average net tuition and fees paid by first-time full-time in-state
students enrolled in public four-year institutions peaked in 2012-13 at $4,450 (in
2025 dollars) and declined to an estimated $2,300 in 2025-26. (Figure CP-9)"* And:
*"Over the decade between 2015-16 and 2025-26, average inflation-adjusted tuition
and fees declined by 10% for public two-year in-district students, declined by 7%
for public four-year in-state students, and increased by 2% for private nonprofit
four-year students. (Figure CP-4)"* And: *"Between 1995-96 and 2025-26, the average
published tuition and fees increased from $2,810 to $4,150 for public two-year
in-district students, from $5,940 to $11,950 for public four-year in-state
students..."* — Table CP-2 confirms this series is stated in 2025 dollars.

**Known weakness:** the strongest rebuttal is that grant aid is a transfer, not a
cost reduction: if net price falls because state appropriations and institutional
discounting rose, society's real cost per degree can be flat or rising while the
student's bill falls. The card says this in its `reasoning` and it is why directness
is 7 rather than 9.

### 4.3 — [ ] `naep-ltt-age9-gains`

```ts
{
  id: "naep-ltt-age9-gains",
  title: "NAEP Long-Term Trend: 9-Year-Olds' Math Is 18 Points Above 1973",
  description:
    "The map's flat-output cards all rest on the 17-year-old NAEP long-term-trend series, which was last administered in 2012. The series that is still running tells a different story: in the 2025 long-term-trend assessment the average mathematics score for 9-year-olds was '18 points higher than in 1973' on the 0-500 scale, and 'in comparison to 1978, the 2025 mathematics scores for 9-year-olds were higher on average and at all five selected percentiles.' Thirteen-year-olds' 2025 math scores were also higher than in 1978 for middle- and higher-performing students. The honest scale check cuts both ways: an 18-point gain against a roughly doubled real per-pupil spend is a poor return, and 2025 scores remain below their 2020 pre-pandemic peak — but 'little or no matching gain in measured output' is not what the currently-administered series shows.",
  side: "against" as const,
  weight: {
    sourceReliability: 9,
    independence: 9,
    replicability: 9,
    directness: 5,
  },
  source:
    "National Center for Education Statistics, 2025 NAEP Long-Term Trend Reading and Mathematics Assessment at Age 9 and 13 (released June 10, 2026)",
  sourceUrl:
    "https://www.nationsreportcard.gov/ltt/2025/mathematics/scores-percentiles/?age=9",
  reasoning:
    "A direct scope limit on the three existing cards that build the map's strongest claim out of one flat age-17 series from a test that stopped running in 2012. The same instrument, same agency, same scale, still running, shows real gains at ages 9 and 13. Directness is held to 5 deliberately: 18 points on a 500-point scale is a small gain relative to the spending increase, so the card limits the output claim rather than refuting it, and it says so.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 9 | NCES / NAEP is the US federal statistical authority on student achievement; the long-term-trend instrument is deliberately held constant across decades. |
| independence | 9 | Federal statistical agency governed by the National Assessment Governing Board; no stake in the cost-disease argument. |
| replicability | 9 | Full technical and results files are published with the release; the whole time series is queryable. |
| directness | 5 | Shows *some* measured gain, not a gain matching the spending increase, and covers only two of the three tested ages. |

**URL check:** fetched (HTTP 200) and the page text read directly. Verbatim: *"In
comparison to 1978, the 2025 mathematics scores for 9-year-olds were higher on
average and at all five selected percentiles."* And: *"the 2025 average mathematics
score for 9-year-old students was 3 points higher [than 2022]. The 2025 average
mathematics score was also 18 points higher than in 1973."* And: *"In comparison to
1978, the 2025 mathematics scores were higher for middle- and higher-performing
13-year-olds, but not significantly different for lower-performing students."* The
page's own metadata names the release: *"2025 Long-Term Trend Reading and
Mathematics Assessment at Age 9 and 13"*, publisher NCES, published 2026-06-10. The
NAGB release corroborates: *"Today's 9-year-olds are outperforming students who took
those initial assessments in both math and reading."*
(`https://www.nagb.gov/news-and-events/news-releases/2026/naep-long-term-trend-assessments-show-different-trends-for-9-and-13-year-olds.html`,
also fetched.) The claim that the age-17 series stopped in 2012 is confirmed at
`https://nces.ed.gov/nationsreportcard/ltt/moreabout.aspx` (fetched): *"The most
recent NAEP long-term trend assessments in reading and mathematics were administered
throughout the nation in 2011-2012 to students at ages 9, 13, and 17."*

**Known weakness:** the age-17 series matters most for the cost-disease argument
because it measures the output of a whole K-12 career, and it really was flat
through 2012. This card limits the inference rather than overturning it; a reviewer
could reasonably score directness lower still.

---

## 5. `housing-affordability-crisis` — 4 cards on the `against` side

**Meta claim:** "Government intervention through zoning reform, rent control, and
public housing is necessary to solve the housing affordability crisis, as the free
market alone cannot provide adequate affordable housing."

**Current state:** 8 `for` / 4 `against`, balance 66, weight 73, quadrant
**contested**.

**Read this first: this topic is no longer quadrant-changed.** The adjudication's
own second-reader pass (`b5587c0`, landed while this document was being written)
reverted the `minneapolis-mixed-results` flip that had carried the topic to balance
74 and "settled," reclassifying that card as two-directional/ambiguous. Housing is
back at 66 and "Well-mapped, genuinely contested," and the adjudication's headline
is now four quadrant changes, not five. I have kept the four drafts below anyway,
for two reasons: the topic sits 4 balance points from the settled threshold and the
adjudication's own §12 reports that the median single-card balance swing is 9 points,
so this verdict is one edit away from moving either way; and the `against` side here
is genuinely thin on its merits regardless of the quadrant.

**The drafting problem.** This meta claim bundles a deregulation (zoning reform)
with two interventions (rent control, public housing) and then asserts a market
failure. That makes "against" ambiguous: evidence that markets deliver when
permitted cuts against the second clause while arguably *supporting* the first. I
have split the difference: two cards attack the named instruments (rent control,
subsidised public supply) and two show market-rate provision delivering affordability
in the exact place the claim says it cannot — at the bottom of the market and for
low-income households. If the founder reads "zoning reform" as itself government
intervention, cards 5.3 and 5.4 should be scored as limiting the second clause only.

### 5.1 — [ ] `cambridge-decontrol-spillovers`

```ts
{
  id: "cambridge-decontrol-spillovers",
  title: "Ending Cambridge Rent Control Added $1.8B in Value, Mostly to Never-Controlled Homes",
  description:
    "Cambridge, Massachusetts lost stringent rent control overnight in a 1995 statewide referendum — an unanticipated shock. Pooling assessed values and every residential transaction from 1988 to 2005, Autor, Palmer and Pathak found that 'elimination of rent control added about $1.8 billion to the value of Cambridge's housing stock between 1994 and 2004, equal to nearly a quarter of total Cambridge residential price appreciation in this period,' and that 'positive spillovers to never-controlled properties account for more [than] half of the induced price appreciation.' Residential investment explains only a small fraction of the gain. The implication is that rent control's costs did not stay inside the controlled stock: it suppressed the value and, by inference, the quality and investment of housing it never covered.",
  side: "against" as const,
  weight: {
    sourceReliability: 9,
    independence: 9,
    replicability: 8,
    directness: 6,
  },
  source:
    "Autor, D. H., Palmer, C. J., & Pathak, P. A. (2014). 'Housing Market Spillovers: Evidence from the End of Rent Control in Cambridge, Massachusetts.' Journal of Political Economy, 122(3), 661-717. NBER Working Paper 18125. doi:10.1086/675536",
  sourceUrl: "https://www.nber.org/papers/w18125",
  reasoning:
    "Top-five-journal identification off a genuinely exogenous policy shock, and it establishes something the map's existing `stanford-sf-rent-control` card does not: the externality runs outside the regulated stock entirely. Directness is 6 because the outcome variable is capitalised property value, which is a landlord's gain and a buyer's cost — the paper does not measure renter welfare, and higher house prices are not obviously an affordability win.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 9 | *Journal of Political Economy*; three senior labour/urban economists; administrative assessment and transaction microdata. |
| independence | 9 | Academic, publicly funded (NSF, Sloan, Lincoln Institute); no landlord or tenant organisation involvement. |
| replicability | 8 | Uses a natural experiment with public administrative records; Sims (2007) reaches compatible conclusions on the same Massachusetts decontrol. |
| directness | 6 | Measures capitalised values, not rents paid or renter welfare; the mapping from "values rose" to "affordability improved" is contestable. |

**URL check:** fetched (HTTP 200) and the abstract read directly from the NBER page.
Verbatim: *"Elimination of rent control added about $1.8 billion to the value of
Cambridge's housing stock between 1994 and 2004, equal to nearly a quarter of total
Cambridge residential price appreciation in this period. Positive spillovers to
never-controlled properties account for more half of the induced price
appreciation."* (The "more half" typo is in the published abstract.) The page also
confirms the JPE publication: *"Journal of Political Economy, University of Chicago
Press, vol. 122(3), pages 661 - 717."* The UChicago DOI page returns HTTP 403 to
automated clients.

**Known weakness:** this is the card most open to a reversal reading. A tenant
advocate can accept every number and say it proves rent control was doing its job —
holding prices down — and that $1.8bn of appreciation is $1.8bn of reduced
affordability. The card should be accepted only if the founder is comfortable that
the operative finding is the *spillover onto never-controlled units*, which is a
deadweight distortion rather than a transfer.

### 5.2 — [ ] `lihtc-crowd-out`

```ts
{
  id: "lihtc-crowd-out",
  title: "LIHTC Construction Is Offset by Nearly One Lost Market Unit Per Subsidised Unit",
  description:
    "The Low-Income Housing Tax Credit is the largest source of subsidised construction in US history and funds about a third of recent multifamily building. Eriksen and Rosenthal estimated crowd-out at three geographic scales (MSA, county, and 10-mile radius) using political variables as instruments. Their conclusion: 'our most robust IV estimates indicate that nearly 100% of LIHTC development is offset by a reduction in the number of newly built unsubsidized rental units, although the confidence band around this point estimate allows for less dramatic assessments.' The authors are explicit that the programme may still change where low-income housing is located even if it barely changes how much exists. The caveat is load-bearing: crowd-out estimates fall toward zero at the MSA scale, and later work using different designs finds substantially less displacement.",
  side: "against" as const,
  weight: {
    sourceReliability: 8,
    independence: 8,
    replicability: 6,
    directness: 8,
  },
  source:
    "Eriksen, M. D., & Rosenthal, S. S. (2010). 'Crowd out effects of place-based subsidized rental housing: New evidence from the LIHTC program.' Journal of Public Economics, 94(11-12), 953-966. doi:10.1016/j.jpubeco.2010.07.002",
  sourceUrl:
    "https://ideas.repec.org/a/eee/pubeco/v94y2010i11-12p953-966.html",
  reasoning:
    "Directly attacks the meta claim's public-supply leg on its own terms: if subsidised construction mostly displaces private construction, government building is not adding the units the claim says the market cannot provide. Directness is high for that reason. Replicability is only 6 because the headline estimate is scale-dependent by the authors' own account and the literature has not converged — an industry rebuttal (Novogradac) and later academic work both read the evidence as showing much less crowd-out.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 8 | *Journal of Public Economics*, a top field journal; IV design with explicit instrument discussion. |
| independence | 8 | Academic authors; no developer, syndicator, or housing-advocacy funding identified. |
| replicability | 6 | The authors themselves report the estimate collapses at MSA scale and flag a wide confidence band; the literature disagrees. |
| directness | 8 | Precisely the question the `public-housing` pillar asks — does government-built supply add net units? |

**URL check:** fetched (HTTP 200) and the full published abstract read from the
RePEc record. Verbatim: *"Our most robust IV estimates indicate that nearly 100% of
LIHTC development is offset by a reduction in the number of newly built unsubsidized
rental units, although the confidence band around this point estimate allows for
less dramatic assessments."* And: *"Overall, while LIHTC development may well affect
the location of low-moderate income rental housing opportunities, our estimates
suggest that the impact of the program on the number of newly developed rental
housing units appears to be small."* The Elsevier page
(`sciencedirect.com/science/article/abs/pii/S0047272710000885`) returns HTTP 403 to
automated clients.

**Known weakness:** the finding is genuinely contested, and the card says so. If the
founder wants only settled evidence on the map, reject this one; if the map is
meant to show live disagreement, this is exactly the kind of card that belongs.

### 5.3 — [ ] `market-rate-supply-cuts-nearby-rents`

```ts
{
  id: "market-rate-supply-cuts-nearby-rents",
  title: "New Market-Rate Buildings Cut Nearby Rents ~6% in Low-Income Areas",
  description:
    "Asquith, Mast and Reed studied large new market-rate apartment buildings completed in low-income neighbourhoods across major US cities, using rent microdata and address-level migration records. Their finding: 'new buildings decrease rents in nearby units by about 6 percent relative to units slightly farther away or near sites developed later, and they increase in-migration from low-income areas.' The comparison against sites developed slightly later is what makes this credible — it holds constant the neighbourhood trajectory that makes new buildings and rising rents co-occur. The authors note the effect is local and short-range, and that any amenity improvement the buildings create is 'not large enough to increase rents,' possibly because most such buildings go into already-changing neighbourhoods.",
  side: "against" as const,
  weight: {
    sourceReliability: 9,
    independence: 8,
    replicability: 7,
    directness: 8,
  },
  source:
    "Asquith, B. J., Mast, E., & Reed, D. (2023). 'Local Effects of Large New Apartment Buildings in Low-Income Areas.' The Review of Economics and Statistics, 105(2), 359-375. doi:10.1162/rest_a_01055",
  sourceUrl: "https://research.upjohn.org/jrnlarticles/219/",
  reasoning:
    "The meta claim's operative assertion is that 'the free market alone cannot provide adequate affordable housing.' This is the cleanest causal test of that proposition at the bottom of the market: unsubsidised, unmandated, market-rate construction lowered rents for existing low-income neighbours within a few years, not the 30-50 years the pillar's skeptic premise asserts filtering takes. Directness 8; the honest limit is that a 6% local effect does not close a national affordability gap, and the study cannot speak to city-wide or long-run magnitudes.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 9 | *Review of Economics and Statistics*; address-level rent and migration microdata; a Federal Reserve Bank of Philadelphia co-author. |
| independence | 8 | Academic and central-bank authors; data partly from Zillow and Real Capital Analytics, which is disclosed in the acknowledgements. |
| replicability | 7 | Depends on proprietary rent and migration microdata that other researchers cannot freely obtain; the design itself is straightforward. |
| directness | 8 | Tests the exact proposition at issue — can market-rate supply improve affordability for low-income renters — with a credible counterfactual. |

**URL check:** the Upjohn Institute record page fetched (HTTP 200) and confirms
authors, journal, volume 105(2), pages 359-375, 2023, DOI 10.1162/rest_a_01055, but
does not reproduce the abstract. I therefore also fetched and read the accepted
manuscript PDF at `https://gwern.net/doc/economics/2021-asquith.pdf`, whose title
page carries the *Review of Economics and Statistics* "Just Accepted MS" header and
DOI 10.1162/rest_a_01055. Verbatim from that abstract: *"New buildings decrease
rents in nearby units by about 6 percent relative to units slightly farther away or
near sites developed later, and they increase in-migration from low-income areas."*
And: *"If buildings improve nearby amenities, the effect is not large enough to
increase rents."*

**Known weakness:** a *relative* 6% local effect is not a statement about the level
of rents in a city, and the map's `rent-burden-crisis-data` card (11 million
severely cost-burdened households) is unaffected by it. Supply working locally and
supply being sufficient nationally are different claims.

### 5.4 — [ ] `houston-lot-size-reform`

```ts
{
  id: "houston-lot-size-reform",
  title: "Houston Cut Minimum Lot Sizes by Two-Thirds and Land Values Did Not Rise",
  description:
    "In 1998 Houston cut its by-right minimum lot size from 5,000 square feet to 1,400 inside the I-610 Loop, extending the reform citywide in 2013; 'since those reforms, tens of thousands of small-lot, single-family houses have been built across the city.' Critics of upzoning predict that granting development rights raises land values and so worsens affordability. Using a difference-in-differences design across the I-610 policy border, Hamilton found the opposite: 'across many specifications, no evidence emerged that the reform increased land values, and in some models, the evidence showed that the reform reduced land values relative to land in the control group,' which she attributes to the volume of construction the reform unlocked. Houston is the only major US city without use zoning, so the setting is unusual and the outcome measured is assessed land value rather than rents or sale prices.",
  side: "against" as const,
  weight: {
    sourceReliability: 7,
    independence: 5,
    replicability: 7,
    directness: 6,
  },
  source:
    "Hamilton, E. (2024). 'The Effects of Minimum-Lot-Size Reform on Houston Land Values.' Cityscape: A Journal of Policy Development and Research, 26(3), 159-186. U.S. Department of Housing and Urban Development, Office of Policy Development and Research",
  sourceUrl:
    "https://www.huduser.gov/portal/periodicals/cityscape/vol26num3/ch9.pdf",
  reasoning:
    "The strongest US case of a market delivering large volumes of entry-level ownership housing under the lightest land-use regime in the country — the counterexample to 'the free market alone cannot provide adequate affordable housing.' Independence is scored low at 5 and should be disclosed: the author is at the Mercatus Center, a market-oriented think tank with a declared position on land-use deregulation, although the paper is a refereed article in HUD's own journal. Directness is 6 because the outcome variable is land value, not housing cost to households.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 7 | Refereed paper in HUD PD&R's journal *Cityscape*; transparent difference-in-differences across a policy border. Not a top-field economics journal. |
| independence | 5 | Author is at the Mercatus Center, which advocates land-use liberalisation. Record as `interest` on the source. |
| replicability | 7 | Uses public Harris County appraisal data; the author notes estimates are "sensitive to specification," which is an honest self-limit. |
| directness | 6 | Land values are a proxy; the affordability claim needs prices or rents. The "tens of thousands of houses" supply fact is the more directly relevant part. |

**URL check:** downloaded (HTTP 200) and read directly. Verbatim from the abstract:
*"In 1998, Houston policymakers cut minimum-lot-size requirements by about
two-thirds—from 5,000 square feet to 1,400 square feet—within the center city."* And:
*"Across many specifications, no evidence emerged that the reform increased land
values, and in some models, the evidence showed that the reform reduced land values
relative to land in the control group. This result may have occurred because
Houston's reform has facilitated a large amount of housing construction."* Verbatim
from the introduction: *"Since those reforms, tens of thousands of small-lot,
single-family houses have been built across the city."* The journal footer confirms:
*"Cityscape: A Journal of Policy Development and Research • Volume 26, Number 3 •
2024 • U.S. Department of Housing and Urban Development • Office of Policy
Development and Research."*

**Known weakness:** the weakest of the four, and I would accept a founder rejecting
it. Houston's setting is *sui generis*, the author has a declared interest, the
outcome is land value rather than housing cost, and the reform is itself a change to
government rules — so a reviewer can fairly say it shows policy working, not the
market working alone.

---
## 6. `minneapolis-shooting` / `pattern-of-force` — 3 cards for an empty pillar

**Meta claim:** "Whether federal agents used excessive force in the fatal shooting
of Alex Pretti in Minneapolis on January 24, 2026 is disputed: independent video and
eyewitness accounts conflict sharply with the federal self-defense account."

**Current state:** the topic has two pillars. `conflicting-accounts` carries four
cards (3 `for`, 1 `against`; topic balance 86, weight 49). `pattern-of-force`
carries **none** — it has a `short_summary`, a `skeptic_premise`, a
`proponent_rebuttal` and a crux, and no `evidence` array at all. A pillar with no
evidence contributes nothing to balance and everything to the appearance of one.

**Read this before scoring: the meta claim cannot grade these cards.** §7(d) of the
adjudication already flagged it — this meta claim *asserts that a dispute exists*,
so evidence from either direction confirms it and `side` becomes close to
meaningless. Recommendation 4 of the adjudication is to reword it to the substantive
proposition. I have scored each card below against that rewording — **"federal
agents used excessive force in the Pretti shooting, and it reflects a pattern"** —
and stated separately what the card shows. If the founder declines the rewording,
re-derive these `side` values rather than pasting them.

**A correction the pillar text needs regardless of the cards.** The
`proponent_rebuttal` says "More than 100 House Democrats co-sponsored a resolution
to impeach Secretary Noem after the shooting." The sequencing is wrong. H.Res. 996
was introduced on **14 January 2026** — ten days *before* Pretti was killed, a week
after Renée Good. Its Article II(E) describes the 7 January shooting: *"On January
7, 2026, an ICE agent fired his weapon at a vehicle attempting to get out of the way
of agents, killing the driver, a U.S. Citizen."* It has 80 original cosponsors plus
the sponsor in the introduced text
(`https://www.govinfo.gov/content/pkg/BILLS-119hres996ih/pdf/BILLS-119hres996ih.pdf`,
fetched). Cosponsors grew afterwards, but the resolution is not a response to the
Pretti shooting and the pillar should not say it is. The current cosponsor count
could **not** be verified — congress.gov and GovTrack both return HTTP 403 to
automated clients; a search snippet reported 187 and I am not willing to print an
unverified number.

### 6.1 — [ ] `midway-blitz-force-findings`

```ts
{
  id: "midway-blitz-force-findings",
  title: "Court Found Bovino's Force Testimony Not Credible — Findings Later Vacated",
  description:
    "Ruling on Operation Midway Blitz in Chicago, Judge Sara Ellis wrote after an evidentiary hearing that 'turning to Bovino, the Court specifically finds his testimony not credible,' and that 'most tellingly, Bovino admitted in his deposition that he lied multiple times about the events that occurred in Little Village that prompted him to throw tear gas at protesters.' The 233-page opinion holds that a range of agent conduct 'shocks the conscience,' including 'shooting a pepper ball at a protester from about five feet away.' Gregory Bovino is the same Border Patrol commander quoted in this topic's own skeptic premise. The decisive limit: the Seventh Circuit vacated the injunction on March 5, 2026 under Munsingwear after the plaintiffs voluntarily dismissed, calling it an 'overbroad, constitutionally suspect injunction.' The findings were never reviewed on the merits and carry no legal force; Bovino's deposition admission remains a fact of record.",
  side: "for" as const,
  weight: {
    sourceReliability: 8,
    independence: 9,
    replicability: 5,
    directness: 5,
  },
  source:
    "Chicago Headline Club v. Noem, No. 1:25-cv-12173 (N.D. Ill.), Opinion and Order, Dkt. 281 (Nov. 20, 2025) (Ellis, J.), vacated as moot, No. 25-3023 (7th Cir. Mar. 5, 2026) (per curiam)",
  sourceUrl:
    "https://www.loevy.com/wp-content/uploads/2025/11/CHC-v.-Noem-281.-Opinion-and-Order-for-PI.pdf",
  reasoning:
    "The only adversarial, sworn-testimony record in existence about the force practices of the specific commander this topic names, and the strongest available evidence that the pillar's 'pattern' framing is more than two data points. Independence is 9 — an Article III judge after cross-examination. Replicability is cut to 5 and source reliability to 8 precisely because of the Munsingwear vacatur: vacated findings are not precedent and were never tested on appeal. Directness is 5 because the conduct is Chicago's, not Minneapolis's.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 8 | A federal district court opinion built on 233 pages of factfinding after an evidentiary hearing — discounted from 10 because it was vacated and never merits-reviewed. |
| independence | 9 | Article III factfinder; the credibility determination rests on the defendant's own deposition admission, not on plaintiff assertion. |
| replicability | 5 | Vacatur means no appellate court ever tested these findings, and the plaintiffs withdrew rather than defend them. |
| directness | 5 | Different city, different operation; probative of the commander and of pattern, not of what happened to Alex Pretti. |

**URL check:** downloaded (HTTP 200) and the full 233-page opinion text extracted
and searched directly. The file carries the court stamp *"Case: 1:25-cv-12173
Document #: 281 Filed: 11/20/25 Page 1 of 233 PageID #:7215"*. Verbatim at p. 553 of
the extracted text: *"Turning to Bovino, the Court specifically finds his testimony
not credible."* Verbatim: *"Most tellingly, Bovino admitted in his deposition that he
lied multiple times about the events that occurred in Little Village that prompted
him to throw tear gas at protesters."* Verbatim: *"Shooting a pepper ball at a
protester from about five feet away shocks the conscience."* The vacatur was
verified independently from the Seventh Circuit's own opinion
(`https://storage.courtlistener.com/recap/gov.uscourts.ca7.55235/gov.uscourts.ca7.55235.48.0.pdf`,
downloaded; caption *"No. 25-3023 ... DECIDED MARCH 5, 2026 ... Before BRENNAN,
Chief Judge, and EASTERBROOK and SCUDDER, Circuit Judges. PER CURIAM"*): *"For the
reasons below, we vacate the district court's preliminary injunction order and then
dismiss this appeal."* And: *"Working on a highly compressed timeline, the district
court granted an overbroad, constitutionally suspect injunction."* Note the opinion
PDF is hosted by plaintiffs' counsel (Loevy + Loevy); it is the file-stamped court
document, but a founder may prefer a CourtListener/PACER copy for the published map.

**Known weakness:** it is vacated. A reasonable reviewer can say that citing
vacated findings on a live public map is exactly the kind of thing Argumend exists
to stop. My counter is that the card says so in its own title and second half, and
that the deposition admission is a primary fact the vacatur does not erase — but
this is a genuine editorial call, not a technical one.

### 6.2 — [ ] `cbp-use-of-force-decline`

```ts
{
  id: "cbp-use-of-force-decline",
  title: "CBP's Own Data: Use-of-Force Incidents Fell 44% From FY2023 to FY2025",
  description:
    "CBP publishes every officer/agent use-of-force incident as a line-level dataset. Counting unique incident IDs: 974 incidents in FY2022, 1,081 in FY2023, 757 in FY2024 and 609 in FY2025 — a 44% fall from the FY2023 peak, with the Border Patrol component falling from 948 to 479, roughly half. On the raw counts the agency is using force less often, not more, which is the strongest available answer to the pillar's 'pattern' framing. Three limits matter: encounters fell far faster over the same period (3.20 million in FY2023 to 0.69 million in FY2025), so incidents per encounter — the crux's own R_force metric — rose rather than fell; the data covers CBP only and excludes ICE entirely; and FY2025 ended on 30 September 2025, before either Minnesota shooting.",
  side: "against" as const,
  weight: {
    sourceReliability: 7,
    independence: 4,
    replicability: 9,
    directness: 5,
  },
  source:
    "U.S. Customs and Border Protection, 'Use of Force Incidents and Officers/Agents Using Force,' FY2022-FY2025 incident dataset; encounter denominators from CBP Nationwide Enforcement Encounters statistics",
  sourceUrl:
    "https://www.cbp.gov/document/stats/use-force-incidents-and-officers/agents-using-force",
  reasoning:
    "The pillar has no skeptic-side evidence at all, and this is the only credible quantitative answer to the pattern thesis: the agency's own published incident counts are falling steeply. Independence is scored 4 because CBP is reporting on its own officers with no external audit — GAO-23-105927 and DHS OIG-17-22 both found DHS cannot reliably collect and analyse its own use-of-force data. Directness is 5 because the fiscal years end before both Minneapolis shootings and exclude ICE.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 7 | Official agency statistics published as machine-readable data — discounted because watchdogs have repeatedly found DHS's force-data collection inadequate. |
| independence | 4 | CBP is the subject of the pattern allegation and the sole collector, definer and publisher of the counts. |
| replicability | 9 | The CSV is public; I re-derived all four annual figures independently from unique incident IDs and confirmed all four years carry 12 months of data. |
| directness | 5 | Ends before the incidents in question, excludes ICE, and the same data supports the opposite reading once normalised by encounters. |

**URL check:** the landing page and the linked CSV both fetched (HTTP 200). Verbatim
from the landing page: *"These statistics represent uses of force against on-duty
officers and agents only; off-duty incidents are not included."* I downloaded
`https://www.cbp.gov/sites/default/files/2025-11/use-of-force-incidents-officer-agent-fy22-fy25.csv`
and counted unique incident IDs per fiscal year myself: **FY2022 974 (Border Patrol
821), FY2023 1,081 (948), FY2024 757 (628), FY2025 609 (479)**, each year containing
12 months of data. Encounter denominators from
`https://www.cbp.gov/newsroom/stats/cbp-enforcement-statistics-fy2025` (fetched).

**Known weakness:** this card and its normalised twin point opposite ways, which by
`docs/ARGUMENT_MODEL.md` §5.7 means the underlying claim is not atomic. I have
drafted only the raw-count version, as `against`, and put the rate calculation in
the description as an explicit limit rather than as a second headline. If the
founder wants the rate on the map it should be its own `for` card — but note that
the incidents-per-million-encounters figure (352 in FY2022, 338 in FY2023, 261 in
FY2024, 880 in FY2025) is **my arithmetic over two CBP series**, not a published
finding, and the denominator counts immigration encounters rather than all public
interactions, which understates exposure during interior operations like Midway
Blitz and Metro Surge. That is why I did not make it a card.

### 6.3 — [ ] `no-federal-pattern-remedy`

```ts
{
  id: "no-federal-pattern-remedy",
  title: "No Damages Remedy and No Pattern-or-Practice Authority Reaches Federal Agents",
  description:
    "Two structural facts determine whether a pattern of federal force could ever be established or checked. First, in Egbert v. Boule (2022) the Supreme Court held that 'Bivens does not extend to create causes of action for Boule's Fourth Amendment excessive-force claim and First Amendment retaliation claim,' reaffirming 'that a Bivens cause of action may not lie where, as here, national security is at issue' and treating Border Patrol's internal grievance process as the adequate alternative remedy. Second, the Justice Department's pattern-or-practice authority does not reach federal agencies: 34 U.S.C. 12601 'authorizes the Attorney General to sue local law enforcement agencies.' So the two mechanisms that produced findings against Minneapolis Police and dozens of other departments are both unavailable here. This bears on whether a pattern can be detected and remedied, not on whether one exists.",
  side: "for" as const,
  weight: {
    sourceReliability: 10,
    independence: 9,
    replicability: 10,
    directness: 4,
  },
  source:
    "Egbert v. Boule, 596 U.S. 482 (2022) (No. 21-147, decided June 8, 2022); Congressional Research Service Legal Sidebar LSB10494, 'Reforming Patterns of Unconstitutional Policing: Enforcement of 34 U.S.C. § 12601' (June 15, 2020)",
  sourceUrl: "https://www.supremecourt.gov/opinions/21pdf/21-147_g31h.pdf",
  reasoning:
    "The pillar's crux asks for an audit of federal training and rules of engagement compared with local police. This card establishes why no such audit has a legal trigger: the civil-rights damages route is closed and the structural-reform statute stops at the state and local line. It is the strongest support for the proponent's 'systemic issues with training, rules of engagement, or supervision' framing precisely because it is not an allegation — it is settled law. Directness is only 4: an accountability gap is not a use of excessive force.",
}
```

| dimension | score | justification |
|---|---|---|
| sourceReliability | 10 | A Supreme Court opinion and a CRS legal analysis of the governing statute; nothing is more authoritative on what the law is. |
| independence | 9 | Neither source is a party; CRS is Congress's nonpartisan legal-analysis arm. |
| replicability | 10 | Published law. Anyone can read the holding and the statute. |
| directness | 4 | Bears on detection and remedy, not on conduct. It cannot show a pattern exists; it shows nobody is positioned to find out. |

**URL check:** the Supreme Court slip opinion was downloaded (HTTP 200) and its text
extracted directly. Verbatim from the syllabus: *"Held: Bivens does not extend to
create causes of action for Boule's Fourth Amendment excessive-force claim and First
Amendment retaliation claim."* Verbatim from the opinion: *"...where, as here,
national security is at issue."* The CRS sidebar
(`https://www.congress.gov/crs_external_products/LSB/PDF/LSB10494/LSB10494.1.pdf`,
fetched) states: *"Section 12601 authorizes the Attorney General to sue local law
enforcement agencies for '[engaging] in a pattern or practice of conduct' that
'deprives persons of rights, privileges, or immunities secured or protected by the
Constitution or laws of the United States.'"* Searches for any DOJ Civil Rights
Division pattern-or-practice finding against federal immigration agents returned
none; the statutory reason above is why, and the absence is the citable fact.

**Known weakness:** it is the least direct card in this document. A reviewer who
wants the pillar to carry only evidence about force, not about accountability
architecture, should reject it — though in that case the pillar's crux (an
independent training and rules-of-engagement audit) has no evidentiary footing at
all.

**Not drafted, available if wanted.** Four further verified items, each of which
would improve the topic without being a `pattern-of-force` card:

1. **`Minnesota v. DOJ` upgrades the existing `bca-blocked` card.** That card
   currently rests on a news report of a spoken statement. The State of Minnesota,
   Hennepin County Attorney Mary Moriarty and BCA Superintendent Drew Evans filed
   suit on 24 March 2026 (No. 1:26-cv-01007-EGS, D.D.C.) alleging: *"At the scene of
   the third shooting—the killing of Alex Pretti—federal immigration officers
   physically blocked investigators of the Minnesota Bureau of Criminal Apprehension
   ('BCA') from accessing the scene."* Complaint PDF verified with its file stamp at
   `https://static.foxnews.com/foxnews.com/content/uploads/2026/03/minnesota-et-al-v.-doj-et-al-complaint.pdf`;
   docket corroborated at `https://clearinghouse.net/case/47964/`. It is a
   **pleading**, so it is an allegation by an adverse party, not a finding — but it
   is a better source than a news paraphrase for the same fact.
2. **DHS stopped publishing its use-of-force series.** The DHS Office of Homeland
   Security Statistics' most recent annual report covers FY2023 (published 29 March
   2024, recording 472 CBP incidents with 8 subject deaths and 78 ICE incidents with
   2 deaths). There is no FY2024 or FY2025 edition on the OHSS landing page
   (`https://ohss.dhs.gov/topics/law-enforcement/use-of-force-incidents`, checked).
   The government's own transparency series stops two fiscal years before the
   Minneapolis shootings.
3. **Watchdogs have repeatedly found DHS cannot measure its own force.** DHS OIG-17-22
   (12 Jan 2017): *"DHS has not done enough to minimize the risk of improper use of
   force by law enforcement officers."* GAO-23-105927 (24 July 2023) and GAO-24-106148
   (13 May 2024), the latter finding that Border Patrol Critical Incident Teams
   responded to an estimated 2,351 incidents FY2010-2022 and that *"OPR has limited
   guidance or formal training regarding independence."*
4. **CRS has already written up these two killings.** CRS Insight IN12646 (2 Feb
   2026) opens: *"On January 7 and January 24, 2026, U.S. Immigration and Customs
   Enforcement (ICE) and U.S. Customs and Border Protection (CBP) law enforcement
   officers (LEOs) were involved in shootings during immigration enforcement
   operations in Minneapolis, MN, that resulted in the deaths of two individuals."*
   congress.gov is Cloudflare-blocked; verified at
   `https://www.everycrsreport.com/files/2026-02-02_IN12646_824b7d01db331e01ae6896486df81977b5a80b20.pdf`.

---
## 7. Three structural findings that no card can fix

These came out of the drafting and are cheaper to act on than any of the cards above.

**(a) Two of the five maps have meta claims that cannot grade their own evidence.**
`minneapolis-shooting` asserts that a dispute exists, so both sides' evidence
confirms it (already in the adjudication's recommendation 4).
`obesity-personal-responsibility` is a conjunction whose two halves point opposite
ways on the current literature — causation is settled against the claim, framing is
genuinely contested — so any single balance number for the topic is a weighted
average of two different verdicts. Splitting that meta claim would do more for the
map's honesty than the three cards in §2.

**(b) `us-iran-conflict` has the same defect, one level down.** "Has made the Middle
East safer" and "advanced American strategic interests" came apart in 2024-26: Iran
is materially weaker and its sanctions isolation is back, and the region has seen
two rounds of direct US-Iran strikes and the loss of IAEA continuity of knowledge.
All three §1 cards score the second conjunct because the first has no honest `for`
evidence I could find.

**(c) The thin sides are thin partly because nobody was asked to fill them.** Half
the drafts here rest on work that long predates the maps: Cutler & McClellan (2001),
the Diabetes Prevention Program (2002), Eriksen & Rosenthal (2010), Kilpeläinen
(2011), Hoyt (2014), Autor/Palmer/Pathak (2014), Egbert v. Boule (2022). None of it
is obscure. The evidence was available; the maps were built one side at a time. That
is a process finding more than a data fix: when a pillar is authored, both
`skeptic_premise` and `proponent_rebuttal` should be required to name at least one
card each, and a pillar with zero evidence — as `pattern-of-force` has been — should
fail validation rather than render.

## 8. The 16 cards with no `sourceUrl`

**First, the finding that changes how to read this list: none of the 16 is an
oversight.** Every one of them carries a `source` string beginning "Synthesis /
inference," and several say in their own `reasoning` field that the omission was
deliberate — `ai-risk/alignment-parallel` reads *"deliberately left without a
sourceUrl rather than fabricating one"*, and `tiktok-brain-rot/variable-ratio-reinforcement`
records that a previously listed citation *"could not be verified and was
removed."* Somebody has already been here and chose honesty over a link. The
question for this pass is therefore not "why is the URL missing" but "is there a
real anchor that could now be attached without overstating what it shows."

**Result: 15 of 16 have a proposed URL that was fetched and quote-verified; 1 is
"not found" for its central claim.** But read the caveats. Most of these cards are
normative claims, absence-of-evidence claims, or mechanism arguments, and in those
cases the honest description of the proposed URL is *"the closest anchor,"* not
*"the source." I have marked each accordingly. Attaching a URL to a normative card
can make it look more empirical than it is, which is a real cost; for cards 8, 11,
14 and 16 the founder may reasonably prefer to leave `sourceUrl` empty and instead
tighten the `source` string.

| # | topic / card | proposed `sourceUrl` | verdict |
|---|---|---|---|
| 1 | `ai-2027` / `serial-bottleneck` | `https://www.nber.org/papers/w23928` | closest anchor |
| 2 | `ai-2027` / `experiment-latency` | `https://arxiv.org/abs/2309.11690` | weak anchor |
| 3 | `ai-2027` / `deployment-ramp-lag` | `https://www.aeaweb.org/articles?id=10.1257/aer.100.5.2031` | good anchor |
| 4 | `ai-2027` / `ai-winter-history` | `https://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm` | good (primary) |
| 5 | `scott-cost-disease` / `haircut-counterexample` | `https://fred.stlouisfed.org/graph/?id=CUUR0000SEGC,CUUR0000SAM2,CUUR0000SEEB` | good (official stats) |
| 6 | `scott-cost-disease` / `admin-is-real-coordination` | `https://www.nejm.org/doi/full/10.1056/NEJMsa063979` | partial anchor |
| 7 | `scott-cost-disease` / `medicine-improved` | `https://www.healthaffairs.org/doi/10.1377/hlthaff.20.5.11` | **strong — direct source** |
| 8 | `sugar-tax-effectiveness` / `paternalism-autonomy` | `https://www.nuffieldbioethics.org/publication/public-health-ethical-issues/` | standard-setter only |
| 9 | `gun-control-effectiveness` / `substitute-methods` | `https://www.nationalacademies.org/read/10881/chapter/2` | **strong — exact match** |
| 10 | `return-to-office-productivity` / `cre-lease-correlation` | — | **not found** |
| 11 | `ai-risk` / `alignment-parallel` | `https://www.anthropic.com/news/core-views-on-ai-safety` | interested party |
| 12 | `seed-oils-health` / `aldehyde-below-threshold` | `https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2021.711640/full` | one side of the dispute |
| 13 | `tiktok-brain-rot` / `variable-ratio-reinforcement` | `https://pmc.ncbi.nlm.nih.gov/articles/PMC7910435/` | good anchor |
| 14 | `degrowth-economics` / `no-voluntary-degrowth-precedent` | `https://portalrecerca.uab.cat/en/publications/research-on-degrowth/` | closest anchor |
| 15 | `cancel-culture` / `canceled-people-outcomes` | `https://www.fire.org/research-learn/scholars-under-fire-attempts-sanction-scholars-2000-2022` | **cuts against the card** |
| 16 | `cancel-culture` / `historical-accountability-comparison` | `https://press.uchicago.edu/ucp/books/book/chicago/B/bo6682337.html` | partial anchor |

### The detail

**1. `ai-2027` / `serial-bottleneck` — "Research has serial bottlenecks cognition
can't skip"** (current source: *Synthesis / inference — Amdahl's law applied to an
unmeasured R&D pipeline*).
Proposed: Aghion, Jones & Jones, "Artificial Intelligence and Economic Growth," NBER
Working Paper 23928 (2017) — `https://www.nber.org/papers/w23928`.
Quote: *"growth may be constrained not by what we are good at but rather by what is
essential and yet hard to improve."*
Kind: NBER working paper, later a chapter in the NBER/Chicago AI volume.
Caveat: this is the Baumol-bottleneck form of the argument applied to aggregate
growth, not Amdahl's law applied to an R&D pipeline, and it supplies no serial-fraction
estimate — which is the card's own admitted gap.

**2. `ai-2027` / `experiment-latency` — "The best ideas still need slow physical
experiments"** (*Synthesis / inference — qualitative constraint from experiment and
compute latency*).
Proposed: Erdil & Besiroglu, "Explosive growth from AI automation: A review of the
arguments," arXiv:2309.11690 (2023) — `https://arxiv.org/abs/2309.11690`.
Quote: *"Key questions remain about the intensity of regulatory responses to AI,
physical bottlenecks in production, the economic value of superhuman abilities, and
the rate at which AI automation could occur."*
Kind: preprint, not peer-reviewed. Caveat: names physical bottlenecks as an open
question rather than measuring experiment latency. No source found gives a measured
latency coefficient. Weakest of the 15.

**3. `ai-2027` / `deployment-ramp-lag` — "Physical deployment imposes a hard ramp"**
(*Synthesis / inference — physical supply-chain constraints applied to takeoff*).
Proposed: Comin & Hobijn, "An Exploration of Technology Diffusion," *American
Economic Review* 100(5) (2010) —
`https://www.aeaweb.org/articles?id=10.1257/aer.100.5.2031`.
Quote: *"on average, countries have adopted technologies 45 years after their
invention"*.
Kind: peer-reviewed. Caveat: measures cross-country diffusion lags, not fabs, power
or robotics supply chains — the card's actual mechanism.

**4. `ai-2027` / `ai-winter-history` — "Confident short timelines have failed
before"** (*Synthesis / inference — historical base-rate comparison across AI
winters*).
Proposed: Lighthill, "Artificial Intelligence: A General Survey" (1972) —
`https://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm`.
Quote: *"Workers entered the field around 1950, and even around 1960, with high
hopes that are very far from having been realised in 1972."*
Kind: primary document, on a computing-history archive rather than a government
site. Caveat: documents one winter, not a base rate. The peer-reviewed alternative —
Armstrong, Sotala & Ó hÉigeartaigh (2014), *Journal of Experimental & Theoretical
AI*, DOI 10.1080/0952813X.2014.895105 — could not be quote-verified because Taylor &
Francis blocks fetching and Semantic Scholar elides its abstract.

**5. `scott-cost-disease` / `haircut-counterexample` — "The haircut counterexample"**
(*Synthesis / inference — cross-sector price comparison, not a single study*).
Proposed: BLS CPI series via FRED, three series on one chart —
`https://fred.stlouisfed.org/graph/?id=CUUR0000SEGC,CUUR0000SAM2,CUUR0000SEEB`.
Quote from the fetched page: *"Consumer Price Index for All Urban Consumers:
Personal Care Services in U.S. City Average"*. August 2026 values (1982-84 = 100, not
seasonally adjusted): personal care services 374.9, medical care services 653.6,
tuition/other school fees/childcare 927.0.
Kind: official statistics. Caveats: nominal indices, so the card's "real prices"
wording needs the reader to deflate; "personal care services" is broader than
haircuts; restaurant meals sit in a separate food-away-from-home series not on this
chart. Note this card is now on the **`for`** side after the second-reader pass.

**6. `scott-cost-disease` / `admin-is-real-coordination` — "Some admin is genuine
coordination cost"** (*Synthesis / inference — qualitative steelman of administrative
output*).
Proposed: Pham et al., "Care Patterns in Medicare and Their Implications for Pay for
Performance," *NEJM* (2007) — `https://www.nejm.org/doi/full/10.1056/NEJMsa063979`.
Quote: *"Beneficiaries saw a median of two primary care physicians and five
specialists working in four different practices."* (Verified through the Europe PMC
REST record for PMID 17360991; nejm.org itself was not fetched.)
Kind: peer-reviewed. Caveat: establishes that the coordination *load* is real, not
that administrative *spending* efficiently buys coordination — which is the card's
actual claim. A fetch-verified alternative, Cutler & Ly, *JEP* (2011),
`https://pmc.ncbi.nlm.nih.gov/articles/PMC4511963/` (*"For every office-based
physician in the United States, there are 2.2 administrative workers"*), cuts
against the steelman rather than for it.

**7. `scott-cost-disease` / `medicine-improved` — "Health care really did improve"**
(*Synthesis / inference — broad historical quality adjustment across treatments*).
Proposed: Cutler & McClellan, "Is Technological Change In Medicine Worth It?",
*Health Affairs* 20(5): 11-29 (2001) — DOI `10.1377/hlthaff.20.5.11`.
Quote: *"In four of the conditions—heart attacks, low-birthweight infants,
depression, and cataracts—the estimated benefit of technological change is much
greater than the cost."*
Kind: peer-reviewed. **This is the strongest match in the set** and it is the same
paper I propose as new card 4.1, which is not a coincidence: the assertion this card
makes without a source is exactly the finding that paper establishes. Note
healthaffairs.org returns HTTP 403 to automated clients; I verified the full text
directly at `https://users.wfu.edu/daltonc/docs/Readings/cutler_technologicalchange.pdf`
(fetched, HTTP 200). **Recommendation:** attach the URL *and* upgrade the card's
`source` and weights, or accept card 4.1 and retire this one as a duplicate.

**8. `sugar-tax-effectiveness` / `paternalism-autonomy` — "Tax Reduces Consumer
Autonomy Without Addressing Root Causes"** (*Synthesis / inference — normative
autonomy and policy-scope critique*).
Proposed: Nuffield Council on Bioethics, "Public health: ethical issues" (2007) —
`https://www.nuffieldbioethics.org/publication/public-health-ethical-issues/`.
Quote: *"Any intervention should be proportionate to the effect that it is intended
to achieve, and should be supported by evidence."*
Kind: expert-body primary document. Caveat, and it is decisive: the card is a
normative claim, so **no** source can establish it. This supplies the
intervention-ladder standard the critique appeals to and says nothing about sugar
taxes, food deserts, or corn subsidies. The card's own `reasoning` already says it
"carries no sourceUrl" because it is normative. My recommendation is to **leave it
empty** and keep the honest `source` string.

**9. `gun-control-effectiveness` / `substitute-methods` — "Attackers May Substitute
Methods"** (*Synthesis / inference — method-substitution possibility, not an observed
effect estimate*).
Proposed: National Research Council, *Firearms and Violence: A Critical Review*
(2005), Executive Summary —
`https://www.nationalacademies.org/read/10881/chapter/2`.
Quote: *"The issue of substitution (of the means of committing homicide or suicide)
has been almost entirely ignored in the literature."*
Kind: official consensus report, primary document. **This is the cleanest fix in the
set:** the National Academies sentence says precisely what the card says — that
substitution is an unexamined possibility, not a measured effect. Attach it. (Note
nap.nationalacademies.org 301-redirects; use the nationalacademies.org form.)

**10. `return-to-office-productivity` / `cre-lease-correlation`** — **NOT FOUND.**
No study tests whether return-to-office mandate timing tracks lease-renewal dates,
or whether firms with long-dated leases mandate return-to-office more.
Tried: searches for RTO mandates and commercial-real-estate lease-renewal
correlation; the Envoy office-utilization analytics claim the card already flags as
unlocatable; sunk-cost office-lease RTO econometrics. Candidate sources that failed:
`papers.ssrn.com` returns HTTP 403 to automated fetches, `researchgate.net` blocks,
`journals.aom.org` paywalls the abstract. The closest anchor — for *motives*, which
is the card's fallback position — is Ding & Ma, "Return-to-Office Mandates" (2024),
`https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4675401` (SSRN 403s; record
verified through Crossref for DOI 10.2139/ssrn.4675401), whose abstract says
managers use such mandates to *"reassert control over employees and blame employees
as a scapegoat for bad firm performance."* A fully fetchable secondary account is
`https://www.utimes.pitt.edu/news/study-return-office`: *"there were no significant
changes in financial performance or firm values after the mandates were
implemented."* That is a university news page, not a primary source.
**Recommendation:** leave `sourceUrl` empty. The card already says the magnitude is
unverified and the weights are already floored at 3/4/3/4; that is the correct
state.

**11. `ai-risk` / `alignment-parallel` — "Alignment Research Can Proceed in
Parallel"** (*Synthesis / inference — diffuse optimistic position with no canonical
empirical source*).
Proposed: Anthropic, "Core Views on AI Safety" (2023) —
`https://www.anthropic.com/news/core-views-on-ai-safety`.
Quote: *"we also cannot let excessive caution make it so that the most
safety-conscious research efforts only ever engage with systems that are far behind
the frontier, thereby dramatically slowing down what we see as vital research."*
Kind: first-party company position statement — not independent and not empirical.
Caveat: it is the clearest *named articulation* of the position by an organisation
that acts on it, which is different from evidence for it. Attaching it means citing
an interested party on a map that is partly about that party's industry. If it is
attached, the card must say so. My recommendation is to leave it empty.

**12. `seed-oils-health` / `aldehyde-below-threshold` — "Typical-Cooking Aldehyde
Safety Margin Remains Uncertain"** (*Synthesis / inference — contested dose-response
literature with no verified margin estimate*).
Proposed: Grootveld, *Frontiers in Nutrition* (2021) —
`https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2021.711640/full`.
Quote: *"Unfortunately, many assessments of the toxicities and toxicologies of
α,β-unsaturated aldehydes have focused on their very limited dietary availabilities
as food flavouring agents only"*.
Kind: peer-reviewed, open access. Caveat: this is *the contesting side* — the
Grootveld group the card names by name. It establishes that a dispute exists, which
is what the card claims, but a reader may take a single-side citation as the card's
verdict. The reassuring counterpart (Abraham et al. 2011, *Molecular Nutrition &
Food Research*, DOI 10.1002/mnfr.201100481, with a WHO tolerable intake of
7.5 µg/kg bw/day) could not be fetched — Wiley blocks — and is therefore **not**
proposed.

**13. `tiktok-brain-rot` / `variable-ratio-reinforcement` — "Algorithmic Feeds Use
Variable-Ratio Reinforcement"** (*Synthesis / inference — variable-ratio reinforcement
theory applied to algorithmic feeds*).
Proposed: Lindström et al., "A computational reward learning account of social media
engagement," *Nature Communications* (2021) —
`https://pmc.ncbi.nlm.nih.gov/articles/PMC7910435/`.
Quote: *"human behavior on social media conforms qualitatively and quantitatively to
the principles of reward learning."* The same page also carries: *"the popular
portrayal of social media engagement as a Skinner Box for the modern human suggests
it represents a form of reinforcement learning driven by social rewards."*
Kind: peer-reviewed, open access. Caveat: it tests reward-rate maximisation, not
variable-ratio schedules as such, and it studies *posting*, not short-form video
*consumption*. Secondary, also verified: Ferster & Skinner, *Schedules of
Reinforcement* (1957), B. F. Skinner Foundation reprint —
`https://www.bfskinner.org/product/schedules-of-reinforcement/`.

**14. `degrowth-economics` / `no-voluntary-degrowth-precedent` — "No Modern Democracy
Has Voluntarily Chosen Economic Contraction"** (*Synthesis / inference —
absence-of-precedent claim across historical cases*).
Proposed: Kallis, Kostakis, Lange, Muraca, Paulson & Schmelzer, "Research on
Degrowth," *Annual Review of Environment and Resources* 43 (2018) — verified record
at `https://portalrecerca.uab.cat/en/publications/research-on-degrowth/`
(annualreviews.org 403s).
Quote: *"The degrowth hypothesis posits that such a trajectory of social
transformation is necessary, desirable, and possible; the conditions of its
realization require additional study."*
Kind: peer-reviewed review. Caveat: no single source can establish an exhaustive
absence claim, and the card's own `reasoning` says so. This is degrowth *scholars*
conceding the realisation conditions are unstudied, which is the strongest honest
version. Secondary, verified: the Maddison Project Database 2023 —
`https://www.rug.nl/ggdc/historicaldevelopment/maddison/releases/maddison-project-database-2023`
(*"The 2023 version of this database covers 169 countries and the period up to
2022."*) — which is the dataset anyone would use to test the absence claim.

**15. `cancel-culture` / `canceled-people-outcomes` — "Many High-Profile 'Canceled'
Figures Retain Their Platforms"** (*Synthesis / inference — illustrative cases with no
systematic outcome dataset*).
Proposed: Frey & Stevens, *Scholars Under Fire: Attempts to Sanction Scholars from
2000 to 2022*, Foundation for Individual Rights and Expression (2023) —
`https://www.fire.org/research-learn/scholars-under-fire-attempts-sanction-scholars-2000-2022`.
Quote: *"Nearly two-thirds of sanction attempts (698 of 1,080, or 65%) resulted in
some form of sanction ranging from investigation to termination."* Also: *"More than
1 in 5 sanction attempts (225 of 1,080, or 21%) resulted in termination."*
Kind: advocacy-organisation dataset — the only systematic outcome dataset located.
**Caveat, and it is the important one in this whole section: this source substantially
cuts against the card it would be attached to.** The card says many targets keep
their platforms; the dataset says 65% of attempts produced *some* sanction and 21%
produced termination. It also covers academics, not the celebrities the card names
(Rowling, Chappelle, Rogan). Attaching it as a supporting URL would misrepresent it.
**Recommendation:** attach it and rewrite the card to say what the data says, or
leave both alone — but do not attach it under the current title.

**16. `cancel-culture` / `historical-accountability-comparison` — "Social
Consequences for Speech Predate the Internet"** (*Synthesis / inference — broad
historical analogy rather than an effect estimate*).
Proposed: Lawrence B. Glickman, *Buying Power: A History of Consumer Activism in
America*, University of Chicago Press (2009) —
`https://press.uchicago.edu/ucp/books/book/chicago/B/bo6682337.html`.
Quote: *"Taking the Boston Tea Party as his starting point, Lawrence Glickman argues
that the rejection of British imports by revolutionary patriots inaugurated a
continuous series of consumer boycotts, campaigns for safe and ethical consumption,
and efforts to make goods more broadly accessible."*
Kind: canonical academic book, publisher page. Caveat: it covers boycotts and
consumer activism — the card's own example — but not public shaming or ostracism for
speech more broadly, which is the card's wider claim.

### Fetch failures worth recording so nobody repeats them

`healthaffairs.org` 403 · `nature.com` 303 to an identity-provider URL ·
`annualreviews.org` 403 · `papers.ssrn.com` 403 · `pubmed.ncbi.nlm.nih.gov` serves a
cookie wall to fetchers while its Europe PMC REST mirror works · `europepmc.org`
article pages 403 although the REST API works · `scholar.harvard.edu` 403 ·
`doaj.org` 403 · `researchgate.net` blocked · `api.semanticscholar.org` 429 and
abstracts elided for the Health Affairs and Taylor & Francis DOIs ·
`economics-files.pomona.edu` 404 · `www.sciencedirect.com` 403 ·
`www.journals.uchicago.edu` 403 · `journals.sagepub.com` 403 · `doi.org` 403 for the
SAGE DOI · `www.congress.gov/crs-product/*` 403 while
`www.congress.gov/crs_external_products/*` PDFs return 200 · `www.pew.org` 403 ·
`www.ssa.gov` 403 (Akamai) · `www.gao.gov` 403 to curl but 200 via the fetch tool ·
FRED series `CUSR0000SEGB` 404 — the correct personal-care-services id is
`CUUR0000SEGC`.

---
## 9. Summary — what accepting everything would do

Arithmetic is the repo's own: `computeBalance` and `computeWeight` from
`lib/schemas/topic.ts`, over `calculateEvidenceScore` (the 0-40 sum of the four
weight dimensions) from `lib/evidenceMetrics.ts`, with `VERDICT.HIGH_WEIGHT = 65`,
`VERDICT.SETTLED_D = 20`, `WEIGHT.MASS_K = 250` and the component weights
0.5/0.3/0.2 from `lib/constants.ts`. I reimplemented both functions over the topic
files at `jev/evidence-adjudication@b5587c0` and reproduced every current value in
`data/topicSummaries.json` exactly before computing the "after" column, so the
before-figures below are a check on the method, not an assertion.

| topic | side drafted | cards | strongest proposed weight | balance / weight before | balance / weight if all accepted | quadrant before → after |
|---|---|---|---|---|---|---|
| `us-iran-conflict` | `for` | 3 | 31/40 — `un-snapback-2025` and `houthi-us-truce-2025` (tie) | 23 / 76 · 3 for, 9 against | **38 / 79** · 6 for, 9 against | settled (counterclaim) → **contested** |
| `obesity-personal-responsibility` | `for` | 3 | 32/40 — `fto-activity-interaction` and `dpp-lifestyle-trial` (tie) | 18 / 72 · 2 for, 10 against | **34 / 75** · 5 for, 10 against | settled (counterclaim) → **contested** |
| `doge-federal-cuts` | `for` | 4 | 35/40 — `federal-workforce-contraction` | 25 / 78 · 4 for, 12 against | **38 / 80** · 8 for, 12 against | settled (counterclaim) → **contested** |
| `scott-cost-disease` | `against` | 3 | 32/40 — `naep-ltt-age9-gains` | 85 / 81 · 13 for, 3 against | **70 / 83** · 13 for, 6 against | settled (claim) → **settled (claim)** — see note |
| `housing-affordability-crisis` | `against` | 4 | 32/40 — `cambridge-decontrol-spillovers` and `market-rate-supply-cuts-nearby-rents` (tie) | 66 / 73 · 8 for, 4 against | **51 / 77** · 8 for, 8 against | contested → contested (balance moves 15 points) |
| `minneapolis-shooting` | both (2 `for`, 1 `against`) | 3 | 33/40 — `no-federal-pattern-remedy` | 86 / 49 · 3 for, 1 against | **79 / 58** · 5 for, 2 against | moderate → moderate (weight +9) |

**Totals:** 20 cards drafted across six topics — 12 `for`, 8 `against`.

**The one topic that does not move.** `scott-cost-disease` lands at balance **70**,
and 70 is exactly the settled threshold (d = 20 = `VERDICT.SETTLED_D`), so the
verdict stays "Settled — evidence strongly favors the claim" by a single point of
balance. §4 explains why I did not manufacture a fourth card to push it over, and
names the two candidates I rejected. The honest lever is re-examining
`k12-counterexample` and `haircut-counterexample`, which attack pillar
sub-hypotheses rather than the meta claim.

**Three of the four "settled" verdicts revert to "contested" if these cards are
accepted.** That is the outcome the adjudication's founder-call 2 asked for: the
maps read "settled" because their `for` sides were propped up by mislabelled cards,
and the remedy was to commission real evidence rather than restore wrong labels.
Whether the evidence commissioned here is *good enough* to justify moving three
politically hot verdicts is the decision this document exists to put in front of a
human. My own view, card by card: I would accept 1.1, 1.2, 1.3, 2.2, 2.3, 3.1, 4.1,
4.2, 5.1, 5.3 and 6.3 without hesitation; 2.1, 3.2, 3.3, 4.3, 5.2, 5.4, 6.1 and 6.2
are defensible but each has a named weakness a reviewer might not accept; and 3.4 is
the one I would understand rejecting outright.

**If only the strong subset is accepted** (the eleven above), computed the same
way: `us-iran-conflict` still reaches **contested** (38 / 79) — all three of its
cards are in the strong set. `obesity-personal-responsibility` does **not** (30 /
74, still settled). `doge-federal-cuts` does **not** (30 / 79, still settled).
`scott-cost-disease` goes to 75 / 83, still settled.
`housing-affordability-crisis` goes to 57 / 75, still contested.
`minneapolis-shooting` goes to 89 / 53 — note that accepting only card 6.3 makes
that map *more* one-sided, so 6.2 should be accepted with it or neither.

Two quadrant changes therefore hang on cards I have flagged as arguable: DOGE
depends on 3.2/3.3/3.4 and obesity on 2.1. That is consistent with §12 of the
adjudication — the median single-card balance swing is 9 points against a 20-point
threshold — and it is the right place for a founder's judgement rather than a
model's.

## 10. Recommendations

1. Decide the 20 cards. Anything accepted goes into `data/topics/<id>.ts` and
   `data/topicSummaries.json` is regenerated.
2. Reword three meta claims before adding cards to those maps, because the cards
   cannot be scored coherently against the current wording:
   `minneapolis-shooting` (asserts a dispute), `obesity-personal-responsibility`
   (split the causation and framing conjuncts), `us-iran-conflict` (split "safer"
   from "advanced American strategic interests").
3. Fix the `minneapolis-shooting` `pattern-of-force` `proponent_rebuttal`: H.Res. 996
   was introduced ten days *before* the Pretti shooting and cannot be a response to
   it (§6).
4. On the 16 sourceUrl-less cards, adopt four now (#7 Cutler & McClellan, #9
   National Academies, #13 Lindström, #3 Comin & Hobijn), leave four deliberately
   empty (#8, #10, #11, and #15 unless the card is rewritten), and treat the rest as
   "closest anchor" with the caveat written into `source` rather than implied by a
   bare link.
5. Re-run the side audit after any batch of these edits. §7(b) of the adjudication
   is the reason: adding a contrary finding to a description is how labels go stale.
