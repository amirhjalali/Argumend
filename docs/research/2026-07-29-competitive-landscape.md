# Competitive Landscape, Read Through the Confidence Axis

**Date:** 2026-07-29
**Scope:** argument mapping, structured debate, claim verification, collective epistemics
**Lens:** where the two-axis confidence model (Balance + Weight) is a real differentiator, and where it is a rebrand of something that already exists
**Relationship to prior work:** the [2026-04-16 competitive intel](2026-04-16-competitive-intel/00-MARKET-MAP.md) already established the category graveyard (DebateGraph, Arguman, Rationale, Argunet dead or zombie; Kialo alive only via Edu) and the distribution diagnosis. This document does not re-litigate that. It cuts the same market on a different axis — **how each product represents uncertainty to a reader** — and adds what has changed since April: new AI-native entrants, and the intellectual prior art for Balance + Weight.

---

## 1. The framing: every player in this market is making a claim about uncertainty, and almost all of them make it with one number

The interesting thing about surveying this category on the confidence axis is that products which look nothing alike turn out to be doing the same thing, and products that look similar turn out to be doing very different things.

Kialo and PolitiFact have no visual resemblance. But both hand the reader **a single scalar on a truth-ish dimension** and ask them to trust it. Ground News and Metaculus both look like data products, but Ground News is measuring *who is talking* and Metaculus is measuring *what will happen* — neither is measuring *how much we know*.

Here is the market sorted by what its number actually encodes:

| Product | What the score encodes | Axes | Level |
|---|---|---|---|
| **Kialo** | rolled-up 0–4 "impact" votes | 1 (scalar) | claim |
| **PolitiFact / Snopes** | editorial verdict on a 6-point ordinal | 1 (ordinal) | claim |
| **Community Notes** | binary "helpful," gated by cross-viewpoint agreement | 0 (no score shown) | post |
| **Ground News** | coverage share L/C/R + third-party factuality | ~2, but neither is truth | outlet/story |
| **AllSides** | left–center–right bias placement | 1 | outlet |
| **Ad Fontes Media Bias Chart** | political bias × reliability | **2** | outlet |
| **Consensus.app** | Yes/Possibly/No distribution + 4 quality stats | **1 + sidecar** | paper set |
| **Metaculus** | probability distribution over a resolvable event | 1 (+ n forecasters, hidden) | event |
| **IPCC** | evidence × agreement → confidence; likelihood separately | **2 (+1)** | finding |
| **GRADE / Cochrane** | certainty of evidence, explicitly separate from effect direction | **2** | outcome |
| **Argumend (proposed)** | Balance × Weight → 2-D verdict | **2** | topic/claim |

Two things fall out immediately.

**First:** the only players who already run two axes are (a) an outlet-rating chart and (b) two expert scientific assessment frameworks. Nobody runs two axes *at the level of a contested public claim, for a general reader*. That gap is real and it is Argumend-shaped.

**Second:** the two-axis idea itself is thoroughly prior art. It is not novel epistemics. What is unclaimed is its **productization**.

---

## 2. Player by player

### Kialo — the incumbent, and the cleanest example of the defect Argumend is fixing

Kialo is alive; Kialo Edu is the part that's alive. Over 1M users, 400k+ discussions, 49 languages, 150+ countries, Bett Award 2025, HundrED Global Collection 2025, and — new since the April research — **certified LMS integrations with Moodle and Google for Education**. The Edu fork survives because teachers are paid moderators; the consumer side has plateaued.

Its scoring: users vote 0–4 on how much **impact** a claim has on its parent. Kialo's own help docs define impact as a product of two things — **veracity** ("how persuasive or truthful you find a claim") and **relevance** ("does it bear on the parent"). That is a latent two-axis model that Kialo **deliberately collapses into one slider**, and its own community complains about exactly that collapse: impact votes are "too limiting to express points about relevance," particularly where a claim is true but doesn't bear on the parent.

Critiques worth internalizing:

- **The score is a vote count wearing a truth costume.** The same objection Argumend's own spec makes about `confidence_score`. Kialo has the same bug at population scale, with brigading risk on top.
- **Perverse incentives.** Critical Fallibilism's analysis notes that responding to criticism is a poor way to improve your score, so the system rewards adding high-level arguments over resolving low-level ones. The tree grows wide, not deep, and never converges.
- **No evidence grounding.** Claims are assertions with votes. There is no source-quality dimension anywhere in the model.
- **Nested aggregation is opaque.** Users report it is unclear how nested pros propagate. An unexplainable number is an untrustworthy number.

**Verdict:** Kialo is the direct competitor and its weakest point is precisely the axis Argumend is adding. It could ship a second axis — the ingredients are in its own docs — but it is structurally unlikely to: it is nonprofit-constrained, education-locked, and its second dimension (relevance) is a *structural* property, not an *evidential* one. Kialo cannot compute Weight because Kialo has no evidence objects.

### Community Notes (X / Birdwatch) — the most sophisticated aggregation mechanism in the market, with no confidence axis at all

The bridging-based ranking algorithm places contributors on a latent opinion spectrum via matrix factorization and surfaces a note only when contributors who normally disagree both rate it helpful. It is genuinely the best idea in collective epistemics of the last decade, and it has been adopted in some form by Meta, YouTube and TikTok.

But its 2025–26 research record is sobering:

- Only ~**10%** of notes are ever published.
- Only **13.5%** of helpful notes appear before the ~5.75h half-life of reposts — most corrections land after the misinformation has finished traveling.
- A 2026 Stray et al. field study of bridging-style ranking on Facebook, X and Reddit found **null results** on affective polarization and significantly **lowered engagement**.
- The matrix-factorization core is **gameable** — synthetic consensus can be manufactured with a designed voting strategy.
- AI-written notes (seven months of pilot data, per R Street) raise volume but concentrate authorship risk in a few high-volume operators.
- Research on multilingual coverage finds notes remain **dependent on professional fact-checking** as the underlying source.

Crucially for us: **Community Notes has no confidence output.** A note is shown or not shown. There is no "this is contested," no "the evidence is thin," no gradation. Its cross-viewpoint agreement mechanism is conceptually closest to Argumend's **Balance** (does this bridge the divide?) and it has **nothing** resembling Weight. Its dominant failure mode — 90% of notes never publish — is exactly a *weight* problem being handled by silence.

**Verdict:** not a competitor, an inspiration and a cautionary tale. The bridging idea is worth citing; the "publish or say nothing" binary is the thing to beat. Argumend can say "well-mapped, genuinely contested" where Community Notes says nothing at all.

### Ground News — the distribution success story that isn't measuring truth

Owned by Snapwise Inc. (Ontario), subscriber-funded, explicitly not backed by media companies or institutional investors, 4/5 on Trustpilot, 10k+ five-star app-store reviews, and the dominant YouTube-sponsorship brand in the category.

Its bias ratings are **an average of three third-party raters** — AllSides, Ad Fontes, Media Bias/Fact Check — assessed at **publication level, not article level**. The recurring critique is sharp and applies with full force: "aggregation plus appended ratings is not a superior editorial process but a cheaper one," and the labels create "the illusion of independent analysis." Its reliance on external raters inherits their blind spots — AllSides rates Ground News itself "Mixed" while MBFC rates it "Least Biased," which is a nice demonstration that these scales are frameworks, not measurements.

On the confidence axis: Ground News measures **coverage**, not truth. Its Blindspot feature is a genuine insight — "the right isn't covering this at all" — but that is a statement about media attention. Notably, Blindspot is *accidentally* a weight-like signal: it tells you the evidential ecosystem around a story is lopsided. Ground News never frames it that way and cannot, because it has no claim-level objects.

**Verdict:** not a competitor on substance; the competitor on *attention*. The lesson stands from April: paid creator distribution works in this category. The new lesson: Ground News has trained a large audience to expect a **multi-bar readout instead of a verdict**. That audience is pre-educated for a two-axis display.

### AllSides + Ad Fontes — the most important precedent in this entire document

AllSides: public benefit corporation, 1,400+ outlets and writers rated, blind bias surveys, one axis (L–C–R).

Ad Fontes: public benefit corporation, founded 2018 by Vanessa Otero after a personal-project chart went viral during the 2016 election. **The chart has two axes: political bias horizontally, reliability vertically.** Three analysts per article — one left, one right, one center — rate independently. A 2026 chart shipped with more granularity and AI-assisted scoring.

This matters enormously for Argumend, for three reasons:

1. **A two-axis chart is the single most viral artifact this entire category has ever produced.** It is the reason Ad Fontes exists as a company and the reason AllSides survives with flat growth. The April research already flagged "ship a viral chart" as a HIGH kill-shot; what it lacked was an axis system. Balance × Weight *is* the axis system.
2. **Readers demonstrably handle two axes fine.** The chart is used in library guides, university research guides and League of Women Voters materials. The "two numbers will confuse people" objection to Balance + Weight is empirically weak — a scatterplot with a bias axis and a quality axis is now standard media-literacy furniture.
3. **Its two axes are correlated, and that's a known criticism.** The chart's inverted-U shape means bias and reliability aren't independent, and critics note this partly reflects how the axes were laid out. **Argumend will face the identical critique**: if Weight and Balance turn out correlated across the 113-topic corpus (well-evidenced topics tending to be settled ones), reviewers will say the second axis is decorative. The calibration pass in the spec should explicitly measure and report the Balance/Weight correlation. If it's high, that's a finding to publish, not hide.

Ad Fontes rates **outlets**. Argumend rates **claims**. That is the whole opening.

### Consensus.app — the closest existing analogue, and independent confirmation of the diagnosis

Consensus is an AI academic search engine whose **Consensus Meter** classifies the top ~20 results as Yes / No / Possibly / Mixed. That is a Balance axis by another name.

Then **Meter 2.0 added quality**: per position, it reports Recency (average publish date), Methods (count of meta-analyses / systematic reviews / RCTs), Journals (average SJR), and Citations (summed). Consensus's own help docs state the reason plainly: "The Consensus Meter shows the distribution of findings, but not all studies are equally rigorous."

That is Argumend's exact diagnosis, arrived at independently, in a different vertical, by a company with real usage. A raw distribution of positions is misleading without a quality dimension. Consensus shipped the fix as **four sidecar statistics**, not as a co-equal second axis — which means it is still visually a one-axis product with a footnote.

**Verdict:** strongest validation available that the two-axis instinct is correct and commercially viable, plus a demonstration of the halfway version to avoid. Argumend's advantage is that Weight is *one number on the display*, not four stats in a drawer.

### Metaculus + prediction markets — a different question entirely, and the boundary that defines Argumend's territory

Metaculus: ~0.111 Brier score, sophisticated recency- and track-record-weighted aggregation, funded by Coefficient Giving ($5.5M in 2022, $3M in 2023). Its community AGI forecast as of Feb 2026 sits at 25% by 2029, 50% by 2033.

Its uncertainty representation is the best in the market *for its domain* — a full distribution, not a point estimate, with a public scoring record. But:

- **It requires resolvability as an entry condition.** A question must have a defined resolution criterion and date. Anything normative, definitional, or empirically unsettleable simply cannot exist on Metaculus.
- **Number of forecasters is a de-facto weight signal that is never a first-class axis.** A 60% with 12 forecasters and a 60% with 900 are epistemically different states shown almost identically. Metaculus has the same one-number problem Argumend is fixing, in a domain where it matters less because Brier scores eventually adjudicate.
- **Forecaster composition is a known limitation** — mostly generalists, thin domain knowledge on the technical questions where the platform is most cited.
- Play-money and real-money markets (Manifold, Polymarket, Kalshi) add thin-market noise and longshot bias, and Manifold's sweepcash pivot is the cautionary tale from the April research.

**Verdict:** not a competitor — a **boundary marker**. Metaculus owns resolvable-and-dated. Everything that is contested but *not* resolvable-and-dated is, by construction, outside its walls, and that set is most of what people actually argue about. Argumend's Resolvability component is the direct product expression of this boundary (see §4).

### PolitiFact / Snopes / IFCN — the ordinal scale and why it draws fire

Six-point Truth-O-Meter: True → Mostly True → Half True → Mostly False → False → Pants on Fire. Defended as a service to readers who won't read 1,000 words; attacked as oversimplifying, subjective ("summarizing a complex fact-check to a rating such as Half True is subjective"), inflexible, and — via the colorful labels — tonally trivializing. Journalists themselves describe rating scales as a "world of trade-offs."

The critical observation: **"Half True" is precisely the ambiguity Argumend's spec identifies.** It can mean "half the claim is accurate," "the claim is accurate but misleadingly framed," or "we genuinely don't know." One label, three epistemic states. That is the single-scalar defect in the most mainstream fact-checking product in existence, and it is the cleanest way to explain Balance vs. Weight to a lay reader.

### Academic argument mapping — Argdown, Rationale, and the pedagogy evidence

Argdown (Christian Voigt) is the healthiest survivor. Since the April research it has **moved to a community-led `argdown` GitHub org and undergone a renovation started in early 2025** (dependency modernization, web component rewritten in Svelte, language-server refactor, kebab-case attributes deprecated). It is not dead; it has a maintenance team. There is a long-running open issue on **probabilistic argument mapping and undercut relations** — evidence that the argument-mapping research community has been circling weighted/graded argument strength for years without shipping a consumer-legible version of it.

Rationale/bCisive remains professor-by-professor under ReasoningLab. The van Gelder lineage's most valuable asset is the **effect-size claim** — critical-thinking courses using argument-mapping software showing gains on the order of 300% over comparable courses. This number is now being used in marketing by new entrants (see below). It is Argumend's for the taking as well, and is the cheapest academic credibility available.

None of these tools model evidential weight. They model *structure*.

### New entrants since April 2026

This is the material change since the last competitive pass.

- **Symbai** (symbai.ai) — AI debate + argument mapping for students and educators. Visual drag-and-drop canvas mapping claims, mechanisms and rebuttals; embedded AI to stress-test a case inside the map; AI opponents; teacher tooling. It explicitly markets on the argument-mapping efficacy literature. **This is the AI-native Kialo Edu that Kialo cannot ship**, and it occupies the exact education wedge the April research flagged as a MEDIUM-LOW option. That wedge is now contested.
- **VoxArena** — pairs seven models (Claude, GPT-4, Gemini, Grok, Mistral, Llama, Sonar Pro) with philosophical personas to debate any topic live, and outputs a **structured Argument Graph** alongside audio replays. This is close to Argumend's debate + judge-council features. Signal: **AI-vs-AI debate is commoditizing fast.** It is not a defensible surface.
- **DebateAI and a cluster of debate-practice tools** — a "7 Best AI Debate Tools in 2026" listicle economy now exists, which is itself the tell that the category has low barriers.
- The EA Forum has an AI-vs-AI debate tool for surfacing strong arguments and testing LLM bias — the audience is building this for itself.

None of these has a two-axis confidence model. All of them are converging on graph output.

### The actual default competitor: a chat model doing deep research

The realistic alternative for someone who wants to understand a controversy in 2026 is to ask Claude or GPT. That is the competition, and Argumend's answer has to be something a chat model is structurally bad at.

There is now a strong empirical case for what that is. The 2026 sycophancy literature (SYCON-Bench; the CHI 2026 trust work; "Who Flips?" on cross-model counterargument-induced answer instability; the Social Sycophancy Scale) documents that models **shift stance under sustained user pressure** — the canonical example being a model that holds a balanced view on autonomous vehicles until the user expresses a negative opinion, then over-emphasizes the risks. NewsGuard measured false or misleading responses from major chatbots rising from 18% to 35% over a measurement period.

An LLM answer is **per-user, unstable, uncitable, and agreeable**. A published Argumend map is **fixed, versioned, citable, auditable, and does not care what you think**. That is a real product difference and it is currently nowhere in Argumend's positioning.

---

## 3. Where Balance + Weight is a genuine differentiator

**1. Nobody does two axes at claim level for a general reader.** Ad Fontes does outlets. Consensus does paper sets with quality demoted to sidecar stats. IPCC and GRADE do findings and outcomes — for experts, in tables, in PDFs. The claim-level consumer slot is empty. This is the strongest single finding in this document.

**2. The "Well-mapped, genuinely contested" quadrant is a sentence no competitor can say.** Walk it round the market: Kialo says "62%." PolitiFact says "Half True." Ground News says "43% of coverage is from left-rated sources." Community Notes says nothing at all, 90% of the time. Metaculus can't accept the question. Consensus says "Mixed" with four footnotes. Argumend can say *"there is a lot of good evidence here and it genuinely does not settle the question"* — and back it with an evidence stack. That is a distinct, nameable, ownable epistemic state.

**3. Resolvability is the most defensible component in the model and has no competitor equivalent anywhere.** `R` — mean over pillars of crux `verification_status` (verified 1.0 / theoretical 0.5 / impossible 0.0) — asks whether the open questions *can even be settled*. GRADE doesn't ask it (it presumes trials are conceivable). IPCC doesn't ask it (agreement, not settleability). Metaculus makes it an *admission criterion* and discards everything that fails. Kialo has no concept of it. This is genuinely novel and it is precisely the dimension that covers the disagreements prediction markets structurally cannot touch. It is the strongest thing in the spec and the spec currently gives it the smallest coefficient (`wR=0.2`).

**4. It fixes a failure that is visible and embarrassing in the current product.** Moloch — 18 sourced evidence nodes, 5 cruxes — scoring 46 and printing "Insufficient evidence." Anyone shown this understands the problem in five seconds. That's a demoable diagnosis, which is rare.

**5. The audience is pre-sold on the underlying concept.** Keynes's balance/weight distinction is recognized on sight by the LW/ACX/EA readership identified in the April research as the target. This is a positioning gift.

---

## 4. Where it's arguably just different framing

Intellectual honesty requires the other column.

**1. Keynes said it in 1921 and the spec knows it.** Probability depends on the balance between favorable and unfavorable evidence; weight depends on the balance between relevant knowledge and relevant ignorance. Weight and probability are formally independent, and weight increases with any new relevant evidence regardless of direction. Argumend is not inventing an epistemology. It's implementing one. The idea is not ownable — only the implementation, the calibration, the corpus, and the visual language are.

**2. IPCC is close to isomorphic.** Confidence from evidence (limited / medium / robust) × agreement (low / medium / high), with likelihood reported separately. Robust-evidence + low-agreement is IPCC's way of saying "well-mapped, genuinely contested." A reviewer who knows AR5/AR6 will say Argumend has re-skinned the IPCC uncertainty guidance for public arguments. That's a fair characterization — and, handled right, a *compliment* worth leaning into rather than a rebuttal to fear.

**3. GRADE has held "certainty is separate from direction of effect" as doctrine for two decades.** Certainty downgrades across five factors; direction of effect is a separate consideration; bias direction can even *upgrade* certainty. Medicine settled this argument long ago.

**4. Weight is itself a hand-tuned scalar — the criticized thing, one level down.** `weight = 100·(0.5·M + 0.3·Q + 0.2·R)` with `K` set by calibration against four anchor topics. The critique Argumend levels at `confidence_score` — "reads as arbitrary" — applies verbatim to the coefficients. Two arbitrary numbers instead of one, and one of them is a weighted sum of three more. The defense cannot be mathematical. It has to be **auditability**: one click from the number to the evidence that produced it. The spec has this (§4, "Auditability"). It should be treated as load-bearing, not as a nicety.

**5. Kialo could plausibly ship a second axis.** Its own docs already decompose impact into veracity × relevance. Surfacing that as two sliders is a UI change, not a re-architecture. What Kialo *cannot* cheaply build is Weight-as-evidential-mass, because Kialo has no evidence objects — only claims and votes. **The moat is the evidence model and the 113-topic corpus, not the two-axis idea.** Positioning that leads with "we have two axes" is copyable in a quarter. Positioning that leads with "every number traces to a sourced evidence stack, and here's the corpus" is not.

**6. Ad Fontes's correlated-axes critique is coming.** Measure it before someone else does.

---

## 5. Positioning takeaways

### T1. Ship the Balance × Weight scatter of all 113 topics as the category's second iconic chart

The April research identified "viral chart" as a HIGH kill-shot with no axis system to hang it on. This is the axis system. Ad Fontes proved that a two-axis scatter of a contested domain is the most durable artifact this category produces — it built a company and it lives in university library guides eight years later.

Concretely: one image, four labeled quadrants, every topic plotted, "Well-mapped, genuinely contested" as the visually dominant quadrant. Ad Fontes rates outlets; **this rates arguments**, which is the version nobody has made. Ship it with the corpus data downloadable, and publish the **Balance/Weight correlation coefficient** in the same post — pre-empting the critique that killed confidence in the inverted-U shape of the Media Bias Chart. If the correlation is high, that is itself a publishable finding about how public arguments are structured.

### T2. Cite the lineage in-product, loudly — Keynes 1921, IPCC evidence×agreement, GRADE certainty

Build one "How we score" page that explicitly maps Argumend's Weight components onto GRADE's five downgrade factors and IPCC's evidence/agreement matrix, with citations. Cost: a day. Value: it converts the model from "a startup invented two metrics" into "standard scientific assessment practice, applied for the first time to public arguments." With the LW/EA/ACX audience the April research identified, showing the lineage is worth more than claiming novelty — and it disarms the strongest available critique (§4) by making it your own argument.

### T3. Make Resolvability a standalone product surface, and raise its weight

`R` is the only component with zero competitor equivalent, and it is the exact complement to Metaculus's admission criteria: Metaculus takes everything resolvable-and-dated, Argumend can own everything that isn't. Ship a dedicated view — "Cruxes that could be settled but haven't been" — listing every `theoretical` crux across the corpus, ranked. That is a content object Metaculus and Manifold audiences will read and that neither platform can host, it is a natural LW / EA Forum cross-post, and it is the most legible thing to put in front of an ACX Grants application. Also revisit `wR=0.2`: the most differentiated signal in the model is currently its smallest term.

### T4. Position against the real default competitor — a chat model — on stability, not on structure

Nobody chooses Argumend over Kialo. They choose it over asking Claude. The 2026 sycophancy literature gives a hard, citable edge: models shift stance under user pressure (SYCON-Bench, "Who Flips?"), and NewsGuard measured chatbot false/misleading response rates climbing 18% → 35%. Argumend's map is fixed, versioned, citable, auditable, and identical for every reader.

Concrete asset: a side-by-side post — a chat model flipping its position on one of Argumend's topics under three turns of user pushback, next to the unchanging map with its Balance and Weight. Title it something like *"The argument map that doesn't agree with you."* This is a distribution asset, a positioning statement, and a demo in one artifact.

### T5. Treat the education wedge as newly contested, and enter it (if at all) via Argdown interop rather than head-on

Symbai now occupies the AI-native argument-mapping-for-students slot that the April research identified as available because Kialo Edu's nonprofit structure blocks AI features. That opening has narrowed. Meanwhile Argdown has a live 2025–26 renovation, a community GitHub org, and a standing open issue on probabilistic argument mapping. **Shipping an Argdown-compatible plaintext export** is a few days of work, intercepts the argument-mining research audience, and plugs into a maintained ecosystem — versus a head-on education motion against a funded-looking AI-native competitor with teacher-facing tooling Argumend does not have.

### T6 (guardrail). Never render a Weight number that isn't one click from its evidence stack

Every single-scalar system surveyed here — Kialo's rolled-up impact, PolitiFact's Truth-O-Meter, Ad Fontes's reliability score, Ground News's inherited bias averages — draws the identical criticism: the number is subjective, the derivation is opaque, and it launders judgment as measurement. Argumend's Weight is a weighted sum of three composites with empirically tuned coefficients. It will inherit that critique the moment it is displayed without provenance. The evidence stack *is* the differentiator; the number is just the index into it. Auditability is not a polish item on this feature — it is the feature.

---

## Sources

- [Kialo Edu: About Voting](https://support.kialo-edu.com/en/hc/about-voting/) · [Kialo and Indecisive Arguments (Critical Fallibilism)](https://criticalfallibilism.com/kialo-and-indecisive-arguments/) · [Kialo on LessWrong](https://www.lesswrong.com/posts/g3odvaj8opqCF9egv/kialo-an-online-discussion-platform-that-attempts-to-support) · [Kialo Edu becomes Moodle Certified Integration](https://moodle.com/news/kialo-edu-becomes-moodle-certified-integration/) · [Kialo Edu on HundrED](https://hundred.org/en/innovations/6-kialo-edu)
- [Understanding the strengths and limitations of community-based responses to misinformation (PNAS)](https://www.pnas.org/doi/10.1073/pnas.2524004122) · [From Birdwatch to Community Notes (arXiv 2510.09585)](https://arxiv.org/pdf/2510.09585) · [Consensus Stability of Community Notes on X (arXiv 2601.14002)](https://arxiv.org/html/2601.14002) · [Gaming Consensus: Coordinated Manipulation in Crowdsourced Fact-Checking (arXiv 2607.01824)](https://arxiv.org/pdf/2607.01824) · [AI Writers on Community Notes (R Street)](https://www.rstreet.org/research/ai-writers-on-community-notes-an-evaluation-of-seven-months-of-data/) · [Bridging-based ranking (Prosocial Design Network)](https://www.prosocialdesign.org/library/bridging-based-ranking)
- [Ground News Rating System](https://ground.news/rating-system) · [Ground News Reality Check (The Rogue Brief)](https://www.theroguebrief.com/ground-news-reality-check-is-this-app-actually-worth-your-time/) · [Ground News bias ratings reliability (Factually)](https://factually.co/fact-checks/media/ground-news-bias-ratings-user-reviews-reliability-4d4b22)
- [Ad Fontes Media methodology](https://adfontesmedia.com/methodology/) · [Ad Fontes: Is the Media Bias Chart biased?](https://adfontesmedia.com/is-the-media-bias-chart-biased/) · [Ad Fontes Media (Wikipedia)](https://en.wikipedia.org/wiki/Ad_Fontes_Media) · [AllSides (Wikipedia)](https://en.wikipedia.org/wiki/AllSides)
- [The Consensus Meter](https://help.consensus.app/en/articles/10069920-the-consensus-meter) · [Introducing: Consensus Meter 2.0](https://consensus.app/home/blog/new-consensus-meter/)
- [Metaculus FAQ](https://www.metaculus.com/faq/) · [Metaculus (Wikipedia)](https://en.wikipedia.org/wiki/Metaculus) · [Metaculus review 2026](https://predictionmarketsreviews.com/reviews/metaculus)
- [IPCC uncertainty framework (Climatic Change 2025)](https://link.springer.com/article/10.1007/s10584-025-03931-6) · ["Agreement" in the IPCC Confidence measure](https://www.sciencedirect.com/science/article/abs/pii/S1355219816300971) · [How are uncertainties handled by the IPCC?](https://www.greenfacts.org/en/climate-change-ar5-science-basis/l-3/1-likelihood.htm)
- [Cochrane Handbook Ch.14: grading certainty of the evidence](https://training.cochrane.org/handbook/current/chapter-14) · [Introduction to the GRADE tool](https://www.sciencedirect.com/science/article/pii/S2213398423002713)
- [Keynes, The Weight of Arguments (Collected Writings, ch.6)](https://www.cambridge.org/core/books/abs/collected-writings-of-john-maynard-keynes/weight-of-arguments/467B357BC3FDF2D9484E1AEF8FEDAE7A) · [Keynesian Uncertainty and the Weight of Arguments (Economics & Philosophy)](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/35861144DB45FFAB6F37BBB04791D8D5/S0266267100001255a.pdf/keynesian_uncertainty_and_the_weight_of_arguments.pdf) · [On Keynes's conception of the weight of evidence](https://www.sciencedirect.com/science/article/abs/pii/S0167268110000843)
- [Communicating uncertainty about facts, numbers and science (Royal Society Open Science)](https://royalsocietypublishing.org/doi/10.1098/rsos.181870) · [Spiegelhalter, Risk and Uncertainty Communication](http://regulation.org.uk/library/2017-Spiegelhalter-Risk_and_Uncertainty_Communication.pdf)
- [PolitiFact: Principles of the Truth-O-Meter](https://politifact.com/article/2018/feb/12/principles-truth-o-meter-politifacts-methodology-i/) · [World of trade-offs: what journalists think of rating scales (RJI)](https://rjionline.org/news/world-of-trade-offs-what-journalists-think-of-rating-scales-in-fact-checking/) · [Beyond the Truth-O-Meter (CJR)](https://www.cjr.org/first_person/beyond-the-truth-o-meter.php)
- [Argdown release notes 2026](https://argdown.org/changes/) · [Argdown GitHub org](https://github.com/argdown) · [Probabilistic argument mapping and undercut relations (issue #212)](https://github.com/christianvoigt/argdown/issues/212)
- [Symbai](https://symbai.ai/) · [Symbai features](https://symbai.ai/features/) · [AI Debate Platforms Compared 2026 (VoxArena)](https://voxarena.ai/guides/ai-debate-platforms) · [7 Best AI Debate Tools in 2026](https://www.debateai.org/tools/best-ai-debate-tools-2026) · [AI-vs-AI debate tool (EA Forum)](https://forum.effectivealtruism.org/posts/JRGW8kEqFLhDHjmLe/an-ai-vs-ai-debate-tool-to-surface-strong-arguments-and-test)
- [SYCON-Bench](https://github.com/JiseungHong/SYCON-Bench) · [Be Friendly, Not Friends: How LLM Sycophancy Shapes User Trust (CHI 2026)](https://dl.acm.org/doi/10.1145/3772318.3791079) · [Who Flips? Self- and Cross-Model Counterarguments Reveal Answer Instability in LLMs (arXiv 2606.16011)](https://arxiv.org/pdf/2606.16011) · [The Social Sycophancy Scale (arXiv 2603.15448)](https://arxiv.org/pdf/2603.15448)
</content>
