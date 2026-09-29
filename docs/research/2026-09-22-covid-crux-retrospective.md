# Covid Crux Ledger: A Retrospective on Which Disagreements Ended

**Status: DRAFT, fact-checked.** First written 2026-09-22 on `north-star/covid-retrospective` as an
8-minute time-boxed outline. Every row was then source-checked on 2026-09-22 against pages that were
actually opened (journal abstracts, agency releases, court opinions, inquiry reporting). Corrections
are listed row by row in the **Verification log** at the end. Nothing below is written from memory
any more; where a claim could not be checked, the log says so.

**Machine-readable form:** the 15 rows are CLAIMs in `data/topics/drafts/covid-what-ended.draft.json` (a v1.1 draft graph, deliberately not registered as a page), and their dated movement is in `data/argument/covid-what-ended.ledger.json`; `lib/argument/covidLedger.test.ts` checks that both validate.

## Why this document exists

Argumend's premise is that disagreements can end, and that it is possible to say *how*. Covid is the
best available retrospective case: a mass disagreement, fought in public, at high stakes, now far
enough behind us that some of its cruxes have a known answer. If we cannot say what ended and what
did not for Covid, we have no basis for claiming a live map of the AI debate is doing anything
useful.

This is a crux ledger, not a verdict. It names no winners. Its unit is the crux — the question whose
answer would have moved someone — not the slogan people actually shouted.

The fact-check changed the shape of the ledger more than its conclusions. The draft called six
rows "mostly resolved". One of them (row 10) holds up as resolved. Two (3, 4) were already hedged
("narrowly", "with limits") and map to **narrowed**. Four (5, 7, 9, 14) overstated what the
evidence settled and are now **narrowed**, or **open** at the policy level for row 7. The evidence
on those four moved, but not all the way. That is itself the lesson the ledger is for: "resolved"
is the status that most tempts a writer to round up.

### Sourcing

Repo maps consulted (existing ArgumentGraphs):

- `data/topics/covid-origins.ts` — "COVID-19 Lab Leak Origin". **Note: there is no
  `data/topics/lab-leak-theory.ts`** and no `data/argument/covid-origins.ts` in this repo;
  `data/topics/covid-origins.ts` is the lab-leak map. Its named cruxes: *Why has no intermediate
  host been conclusively identified?*, *Can we distinguish an engineered virus from a naturally
  evolved one?*, *What would it take to resolve this question definitively?*, *Has the
  gain-of-function oversight system been reformed enough to prevent future incidents?* Pillars:
  Geographic & Institutional Coincidence, The Furin Cleavage Site, Intelligence & Transparency
  Failures.
- `data/topics/vaccine-mandates.ts` — "Government Vaccine Mandates". Cruxes: *Do Mandates Actually
  Raise Uptake?* (The Counterfactual Uptake Test), *Do Mandates Protect Other People?* (The
  Transmission Externality Test), *Are Mandates Lawful and Trust-Preserving?* (The Net Legitimacy
  Test). Evidence nodes include mandate announcements raising weekly first doses 60%+ (Karaivanov
  et al.), California's SB277 removing non-medical exemptions, Austria's adult mandate abandoned
  before enforcement, vaccination reducing onward transmission then waning (Eyre et al.), Jacobson
  (1905), the OSHA employer mandate, and a trust-erosion/backfire node (Bardosh et al.). Two of
  these node texts need wording fixes; see Open items.
- `data/topics/pandemic-preparedness.ts` — cruxes on preparedness cost-benefit under uncertainty,
  institutional decay between crises, and gain-of-function restriction.
- `data/topics/gain-of-function-research-ban.ts` — adjacent, surfaced by the same grep.

External sources are cited per row in **Sources by row**, keyed `[1a]`, `[1b]`, and so on. Each
entry gives title, URL and date, and each was opened during the check. Journal abstracts were read
through the Europe PMC record because several publisher sites refuse automated fetches; the
Europe PMC link is given alongside the DOI.

---

## How to read the status columns

Two columns carry the ledger's meaning, and they answer different questions.

**Ledger status** uses the four values from the crux-ledger spec
(`docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md` §1.1): `open`, `narrowed`,
`resolved`, `unresolvable`. It says how much of the disagreement is still live.

**How it left the argument** says *why* it is no longer live, or why it cannot become so. This is
the distinction the retrospective exists to draw:

- **resolved by evidence**: a measurement arrived that met the resolution condition.
- **stopped mattering**: the policy or decision the crux fed expired, whether or not the evidence
  had arrived. The crux can still be open or resolved; it simply no longer moves anything.
- **value fork**: no observation can settle it; it is a disagreement about weights, rights or who
  decides (`resolutionKind` of `value-difference` or `authority-allocation`).
- **access-blocked**: the settling evidence exists or could exist, but is held by a party that
  will not release it.
- **measurement-blocked**: evidence exists, but the experiments that could be run measured
  something adjacent to the crux, not the crux itself.

A row can carry more than one. Several do.

Types: **empirical** (what is the case), **causal** (what caused what), **predictive** (what will
happen), **definitional** (what do we mean), **value** (what matters more), **trust** (whose report
counts).

---

## The ledger

| # | Crux, as a question | Type | Ledger status | How it left the argument | Dated to | What moved it, or why nothing could | What the public argument was actually about *(editorial)* |
|---|---|---|---|---|---|---|---|
| 1 | Does SARS-CoV-2 transmit through the air at room scale, or mainly via large droplets and surfaces? | empirical, with a definitional core | `resolved` (existing-evidence) | resolved by evidence; then the droplet/aerosol vocabulary itself was retired | 2021-05-07 (CDC brief); 2024-04-18 (WHO terminology) | Outbreak reconstructions: the Skagit County choir (32 confirmed and 20 probable cases among 60 attendees, 2 deaths) [1a]; a Zhejiang bus where 34.3% of 67 riders on the index patient's bus were infected versus 0% of 60 on a second bus [1b]; a Guangzhou restaurant whose own investigators framed it as droplets carried by air-conditioner airflow [1c], an early case of the same data read both ways. An organised scientific argument also moved things: 239 scientists backed a July 2020 call to address airborne transmission [1d]. WHO's 9 July 2020 brief said short-range aerosol transmission in crowded, poorly ventilated spaces "cannot be ruled out" [1e]; by May 2021 CDC listed inhalation of very fine droplets and aerosol particles as one of three principal modes, with infection possible beyond six feet [1f], and judged that surfaces "do not contribute substantially" (per-contact fomite risk "generally less than 1 in 10,000") [1g]. WHO's public Q&A (dated 23 Dec 2021) described short- and long-range airborne transmission [1h]. In April 2024 WHO, US CDC, ECDC, China CDC and Africa CDC replaced the droplet/aerosol split with "infectious respiratory particles" and "transmission through the air" [1i][1j]. | Hygiene theatre, plexiglass, and whether officials had misled the public earlier. The public fought about deference, not aerosol physics. |
| 2 | Do the vaccines substantially reduce severe disease and death? | empirical | `resolved` (existing-evidence) | resolved by evidence | 2020-12-10 (first Phase III publication); 2021-02-24 (nationwide cohort) | Phase III trials: BNT162b2 95% efficacy against symptomatic Covid (8 vs 162 cases; severe cases after dose 1: 1 vs 9) [2a]; mRNA-1273 94.1% (all 30 severe cases in the placebo arm) [2b]. The trials were powered for symptomatic disease; the severe-outcome evidence was strengthened by a 596,618-pair matched cohort in Israel (92% effectiveness against severe disease 7+ days after dose 2) [2c]. A modelling study estimated 14.4 million deaths averted in the first year using reported deaths, 19.8 million using excess deaths [2d]; those counts depend on the model's counterfactual. Protection against *infection* waned and varied by variant (row 3). | Whether *you personally* had to take one. The efficacy question was rarely the real dispute. |
| 3 | Do the vaccines stop onward transmission enough to justify coercion on others' behalf? | empirical → value | `narrowed` | empirical half resolved by evidence; the "enough to justify" half is a value fork | 2022-01-05 (Alpha/Delta); 2023-01-02 (Omicron) | The repo's node *"Vaccination Did Reduce Onward Transmission (Then Waned)"* rests on Eyre et al.: among 146,243 tested contacts, two BNT162b2 doses cut onward transmission of Alpha (adjusted rate ratio 0.32) and Delta (0.50), with the Delta effect waning within about 12 weeks [3a]. For Omicron, a study of 35 California prisons estimated that any vaccination cut an infected person's risk of infecting contacts by 22%, prior infection by 23%, and both by 40% [3b]. The effect was real, modest, and time-limited. That narrows the externality case for mandates without deciding it, because "large enough to license compulsion" is a threshold no measurement sets. | Framed as "do vaccines work." It was really about whether the externality was large enough to license compulsion, which is a different question. |
| 4 | Do mandates actually raise uptake? | causal, with a definitional core | `narrowed` | resolved by evidence for certificate-style requirements where uptake was low; Austria's general mandate *stopped mattering* before it could be tested | 2021-12-13; 2022-06-02 | Staggered timing let researchers observe the counterfactual. In Canadian provinces, announcing proof-of-vaccination requirements was followed by a more-than-60% rise in weekly first doses, with estimated gains of 4.7 to 12 percentage points in Germany, France and Italy [4a]. A synthetic-control study of six countries found certification raised uptake from about 20 days before to 40 days after introduction, more where prior uptake was below average, with no effect in Germany and an unclear one in Denmark [4b]; the two studies disagree about Germany. Most of this evidence concerns *access certificates* (vaccinated, tested or recovered), not a general duty to be vaccinated; "mandate" covered both. Austria's adult mandate entered force in February 2022, was suspended on 9 March 2022 before fines began [4c], and was scrapped on 23 June 2022, with the health minister citing changed circumstances [4d]; it is evidence about political durability, not about enforced uptake. Pre-Covid, California's removal of non-medical school exemptions (SB277) raised kindergarten MMR coverage by about 3.3 percentage points against a synthetic control [4e]. | "My body, my choice" versus "do your part." Uptake elasticity was almost never the thing being argued. |
| 5 | Did school closures cost children more than they bought in transmission reduction? | causal + value | `narrowed` | cost side resolved by evidence; the net balance is a value-weighted comparison and remains open | 2022 (NAEP); 2023-01-30 (meta-analysis) | The cost side was measured. On NAEP long-term trend tests, US 9-year-olds lost 5 points in reading (the largest drop since 1990) and 7 in maths (the first maths decline ever recorded), with lower performers losing more [5a]. A meta-analysis of 42 studies in 15 countries found a learning deficit of about 0.14 standard deviations, larger for low-income children and in maths [5b]. Across 10,000 US schools, remote instruction was a primary driver of widening achievement gaps; maths gaps did not widen where schools stayed in person [5c]. The benefit side is less clear. ECDC (July 2021) judged that closures "can contribute to a reduction" in transmission but are insufficient alone, and that their harms "would likely outweigh the benefits", making closure a last resort [5d]. Sweden's commission endorsed keeping schools largely open in the first wave [6d]. Setting learning loss against infections averted still takes a weighting, and the UK inquiry's children's module had not reported in the sources checked (see log). | Teachers' unions, and whether concern for kids was a cover for concern about the economy. |
| 6 | Did lockdowns, as implemented, reduce total deaths relative to lighter alternatives? | causal | `open` | measurement-blocked (no clean counterfactual); official reviews disagree in framing | 2023-08 (Royal Society); 2025-11-20 (UK inquiry Module 2) | There is no clean counterfactual: behaviour changed voluntarily before and alongside mandates, and country comparisons are confounded by demography, household structure and care-home policy. The reviews disagree. The Royal Society (Aug 2023) found early, stringent *packages* of interventions "unequivocally effective" at reducing *infections*, mostly on observational evidence, and did not assess costs [6a]. A 2022 working-paper meta-analysis estimated that lockdowns in Europe and the US cut Covid *mortality* by about 0.2% (stringency-index studies) [6b]. The UK Covid Inquiry's Module 2 report (20 Nov 2025) concluded, on the basis of modelling, that locking down on 16 rather than 23 March 2020 would have meant about 23,000 fewer first-wave deaths in England (−48%), and that earlier restrictions might have made the mandatory lockdown shorter or unnecessary [6c][6e]. Sweden's commission (Feb 2022) called reliance on advice "fundamentally right" but said measures in February and March 2020 were "too few" and "too late" [6d]. No review estimated *total* deaths, including indirect ones, against a specified lighter alternative. | Freedom versus safety, and elite hypocrisy. The counterfactual was never recoverable, and both sides argued as if it were. |
| 7 | Did masks — cloth, surgical, N95 — reduce transmission, individually and as policy? | empirical | `open` (policy level); individual level `narrowed` | measurement-blocked: the trials measured mask *promotion* with low adherence, not mask *wearing* | 2022-01 (Bangladesh RCT); 2023-01-30 (Cochrane); 2024-07-24 (Norway RCT) | Randomised evidence is small-effect and contested. Bangladesh (600 villages, 342,183 adults): promotion raised proper mask-wearing from 13.3% to 42.3% and reduced symptomatic seroprevalence (adjusted prevalence ratio 0.91, 0.82–1.00), with a larger effect for surgical masks among people 60 and over (0.65) [7a]. Cochrane (Jan 2023) found community masking "probably makes little or no difference" to influenza-like illness (RR 0.95) or lab-confirmed infection (RR 1.01), was "very uncertain" about N95 versus medical masks, and noted low adherence [7b]. Cochrane's editor-in-chief then said reading this as "masks don't work" was "inaccurate and misleading": the review tested *interventions to promote* masks, and the results were "inconclusive" [7c]. Among 1,009 health workers, medical masks were non-inferior to fit-tested N95s (hazard ratio 1.14, 0.77–1.69), with estimates varying by country [7d]. A Norwegian trial (2023, published 2024) found surgical masks in public cut self-reported respiratory symptoms (odds ratio 0.71) but showed no significant effect on Covid infection [7e]. Observational studies "consistently, though not universally" found masks and mandates effective [6a]. The respirator's laboratory filtration advantage is not in dispute; its real-world advantage is not established by RCTs. | Obedience and identity. The mask became a signal, which made the residual empirical question hard to ask in public. |
| 8 | Did SARS-CoV-2 arise from natural spillover or from a research-related incident? | empirical (+ trust) | `open` | access-blocked | 2025-06-27 (WHO SAGO); 2026-06-18 (ODNI release) | No intermediate host has been identified (`covid-origins.ts` q1), and the map's crux *"Can we distinguish an engineered virus from a naturally evolved one?"* answers, in effect, not from sequence alone. WHO's SAGO (June 2025) said "the weight of available evidence" suggests zoonotic spillover, but that "all hypotheses must remain on the table" because China had not shared early patient sequences, market-animal data, or lab biosafety information [8a]. Market environmental samples place SARS-CoV-2 positivity near a wildlife stall along with DNA from raccoon dogs, civets and bamboo rats [8b]. Official bodies split. The 2023 ODNI declassification had the FBI and Energy Department leaning towards a lab origin and four other elements towards natural origin [8c]. The CIA (Jan 2025) assessed "with low confidence" that a research-related origin is more likely [8d]. The House Select Subcommittee majority (Dec 2024) concluded a lab leak is the most likely origin, while the ranking member said the parties left "with different impressions" [8e][8f]. On 18 June 2026 ODNI released internal intelligence documents under the headline "Fauci Funded Wuhan Lab Research That Sparked COVID" [8g][8h]; critics argue the documents concern process and funding, not the origin itself [8i]. None of the sources reviewed reports a progenitor virus, an infected intermediate animal, or a laboratory record of the virus. Resolution needs records and samples held by a party that will not release them. The crux is well-formed; the evidence is access-blocked, which is a different failure from row 6. | Racism accusations in 2020, then "we were right all along" claims from 2023 on. The public argument was about who was allowed to ask. |
| 9 | Were early dismissals of the lab-leak hypothesis a scientific judgment or a reputational one? | trust | `narrowed` | the documentary record is established; motive attribution is contested along institutional lines | 2021-06-21 (Lancet addendum); 2023-07-11 (House hearing); 2026-07-22 (Senate release) | The record now shows private uncertainty alongside public confidence. *The Proximal Origin of SARS-CoV-2* (Nature Medicine, March/April 2020) stated that its analyses "clearly show that SARS-CoV-2 is not a laboratory construct or a purposefully manipulated virus", while also writing that "it is currently impossible to prove or disprove the other theories of its origin described here", which included selection during passage in a lab [9a]. Its authors' Slack messages, released by the Senate Homeland Security committee chair on 22 July 2026, include Andersen putting a 30% probability on a lab origin and Holmes 20%, later 10%, plus "less confidence… at this stage" [9b]. The Feb 2020 *Lancet* statement supporting Chinese scientists declared no competing interests; in June 2021 the *Lancet* published an addendum after readers questioned that disclosure for co-author Peter Daszak [9c][9d]. At the 11 July 2023 House hearing with two of the authors, the committee minority called the inquiry "political theater" and said the records showed Fauci and Collins "played no role in the drafting of the paper" [9e]. The record settles *what was said privately and publicly*. It does not settle *why*: whether the gap reflects evolving scientific judgment or reputational management is still argued. This resolves a question about **process**, not about **origins**; conflating the two is the most common error in this debate. | Treated as evidence for the lab-leak hypothesis itself. It is not. It is evidence about institutional behaviour. |
| 10 | Does prior infection confer protection comparable to vaccination? | empirical | `resolved` (existing-evidence) | resolved by evidence; in the US it *stopped mattering* at almost the moment the evidence landed | 2022-01-19 (CDC MMWR Early Release; weekly issue 28 Jan); 2023-02-16 (Lancet meta-analysis) | Surveillance cohorts and a meta-analysis of cohort and test-negative studies. In California and New York during Delta, by the week of 3 Oct 2021, case rates were 29.0-fold (CA) and 14.7-fold (NY) lower among unvaccinated people with a prior diagnosis, against 6.2- and 4.5-fold lower among vaccinated people without one [10a]. A meta-analysis of 65 studies put protection against pre-Omicron reinfection at 78.6% at 40 weeks, lower for Omicron BA.1 (36.1%), and protection against severe disease at about 89–90% at 40 weeks for all variants [10b]. Policy diverged. The EU Digital COVID Certificate credited recovery from 1 July 2021 until the regulation expired on 30 June 2023 [10c]. OSHA's employer rule (5 Nov 2021) declined a prior-infection exception, citing scientific uncertainty and operational infeasibility [10d]; that rule was stayed on 13 Jan 2022, six days before the CDC data were first posted (MMWR Early Release, 19 Jan 2022), and withdrawn on 26 Jan 2022 [12b][12d]. A crux can resolve just after it stops mattering. | Whether the unvaccinated-but-recovered were being treated unfairly. |
| 11 | How lethal was the virus, per infection, by age — and for a healthy adult under 50? | empirical | `resolved` (existing-evidence), for the pre-vaccine era | resolved by evidence | 2020-10 (Levin et al. preprint); 2022-02-24 (Lancet) | Seroprevalence surveys matched to deaths pinned infection-fatality ratios by age. A 2022 analysis using 718 age-specific surveys found a J-shaped curve: 0.0023% at age 7, 0.057% at 30, 1.0% at 60, 20.3% at 90 [11a]. An earlier meta-analysis put it at 0.4% at 55, 1.3% at 65, 4.5% at 75 and 15% at 85, and called the rise exponential [11b]. That is roughly a 350-fold rise from age 30 to 90, and about four orders of magnitude from school age to 90. Caveats: these are population averages by age, not estimates for *healthy* people, whose risk is lower but was not separately estimated here; and they describe the ancestral virus before vaccines, so per-infection fatality has since changed with immunity and variants. | Rarely argued directly. Each side assumed an answer and used it to justify a position already held; neither "it's just a flu" nor "everyone is at risk" described the age gradient the surveys found. |
| 12 | Should a person's freedom of movement and work be conditioned on a medical decision? | value | `unresolvable` (value-difference; authority-allocation) | value fork; courts allocated authority but did not decide the value | 1905-02-20; 2022-01-13 | No fact settles it. The repo's *Net Legitimacy Test* has this shape. *Jacobson v. Massachusetts* (1905) upheld a compulsory smallpox-vaccination law with a $5 penalty [12a]. On 13 Jan 2022 the Supreme Court **stayed** the OSHA vaccine-or-test rule (not a final merits ruling), finding challengers likely to prevail on the argument that the rule exceeded OSHA's statutory authority [12b], and OSHA withdrew the rule on 26 Jan 2022 [12d]. The same day, the Court let the CMS health-care-worker vaccination rule take effect [12c]. The split outcome shows courts deciding *who may mandate what*, not whether mandating is right. | This was the actual disagreement for most people, and it wore empirical clothes the entire time. |
| 13 | How much present welfare should be sacrificed for statistical lives, and whose? | value | `unresolvable` (value-difference) | value fork | 2020-10-04 / 2020-10-14 | A question about distributive weights, with no empirical form. Its two best-known public statements were written largely in epidemiological terms. The Great Barrington Declaration (4 Oct 2020) proposed "Focused Protection" of the vulnerable while lower-risk people resumed normal life [13a]; the John Snow Memorandum (*Lancet*, published online 14 Oct 2020) argued the opposite case [13b]. How consistently the value question was recast as a forecasting dispute is an editorial reading, not a checkable fact; see Pattern 2. | Framed as competence ("they got the model wrong") because the value question had no acceptable public vocabulary. |
| 14 | Did the establishment's Covid conduct damage its standing enough to reduce future compliance? | predictive → causal | `narrowed` | the outcome is observed; the causal attribution is contested and may be unresolvable | 2024-08-07 (Gallup); 2025-11-10 (PAHO); 2026-08-17 (CDC) | The outcome arrived. US kindergarten MMR coverage fell from 95.2% (2019–20) to 92.5% (2024–25) and 92.4% (2025–26), and exemptions rose to a record 4.2% [14a][14b]. The US had 2,289 measles cases in 2025 and 3,471 in 2026 as of 17 Sept [14c]. Canada lost measles elimination status on 10 Nov 2025, and with it the Americas region [14d]; PAHO will review US status in November 2026 [14e][14f]. Attitudes moved on partisan lines: the share of Americans calling childhood vaccination "extremely important" fell from 58% (2019) to 40% (2024), and among Republicans roughly halved to 26% while Democrats barely changed; Gallup ties the split to pandemic-era trust in medical authorities [14g]. UNICEF found perceived importance of childhood vaccines fell in 52 of 55 countries, naming uncertainty about the pandemic response, misleading information, declining trust in expertise and polarisation, and cautioning that confidence is "volatile and time specific" [14h]. *Attribution* to Covid-era conduct, and to mandates in particular, is not isolated by any of this. Service disruption, misinformation and polarisation co-occur, and 2025 federal changes (the reconstitution of ACIP, framed by HHS as restoring trust [14i]) now confound later years. The backfire prediction was in print by Feb 2022 [14j] and is a node in the repo's own mandate map. | Argued at the time mainly by mandate critics, and absent from most of the public fight. A prediction whose outcome can be observed but whose cause cannot yet be separated from others. |
| 15 | Is gain-of-function work worth its risk, and has oversight been fixed? | value + predictive | `open` | value fork plus a prediction that can only resolve by the absence of future incidents; the policy moved by executive action, not by evidence | 2025-05-05 (EO 14292); 2026-07-28 (new USG policy) | The repo crux (`covid-origins.ts` q4) is echoed in `pandemic-preparedness.ts`. Since 2024: HHS debarred EcoHealth Alliance and Peter Daszak (Daszak ineligible through 20 May 2029) [15a]. Executive Order 14292 (5 May 2025) ended federal funding of "dangerous gain-of-function research" in countries of concern and ordered the 2024 dual-use oversight policy revised [15b]. The *USG Policy for Stopping High-Risk Life Sciences Research* (28 July 2026) replaced the dual-use and enhanced-pandemic-pathogen policy; research flagged as potentially dangerous remains paused pending implementation [15c]. That changes who decides and what is funded, which is authority allocation. It does not measure whether risk fell, and the value split over scientific freedom and risk tolerance persists. The risk estimate also partly depends on row 8. | Argued as a proxy for the origins fight rather than on its own risk-governance terms. |

**Tally.** `resolved`: 4 (rows 1, 2, 10, 11). `narrowed`: 6 (3, 4, 5, 9, 14, and 7 at the individual level).
`open`: 3 (6, 8, 15, plus 7 at the policy level). `unresolvable`: 2 (12, 13). Of the four
resolved rows, one (10) also stopped mattering before its evidence landed. Of the narrowed rows,
three (3, 5, 14) are narrowed *because* a value weighting or an unisolatable cause sits under a
settled empirical half.

---

## Three patterns in how cruxes resolved

**Pattern 1: Cruxes resolved when something could be measured, not when the rhetoric improved.**
The four resolved rows resolved through measurement: designed trials (row 2), seroprevalence surveys
(row 11), large cohorts (row 10), and outbreak reconstructions (row 1). Row 4 narrowed because
jurisdictions acted at different times, which created a natural experiment. Argument was not
irrelevant. In row 1 an organised case by aerosol scientists pressed agencies in public [1d], and the
settlement came partly by *redefining* the terms [1i]. But argument mattered by changing what got
measured and named, not by persuading on its own. The rows that stayed open are not rows where no
experiment was run. Masks got several RCTs. They are rows where the available experiments measured
something next to the crux: mask *promotion* with 42% adherence rather than mask *wearing* (row 7),
stringency indices rather than specified alternatives (row 6). Corollary for the product: the most
valuable thing a map can do for an open crux is state the observation that *would* settle it, and
check that proposed evidence measures that observation rather than a neighbour. The repo maps
already name tests, not sides ("The Counterfactual Uptake Test", "The Transmission Externality
Test").

**Pattern 2: The public argument was often not about the crux, and the gap had a direction.**
*(Editorial reading; the rows supply examples, not proof.)* Value disagreements (12, 13) often
presented themselves as empirical ones, because empirical claims are socially sayable and "I weight
liberty above marginal mortality reduction" is not. Two widely circulated public statements of the
row 13 fork were written as epidemiology [13a][13b]. Several narrowed rows (3, 5) show the same
thing from the other side: the empirical half settled, and the disagreement did not end with it,
because the remaining half was a weighting. A map earns its keep by separating these and by saying
plainly which rows will never close.

**Pattern 3: Access-blocked and measurement-blocked cruxes fail differently.** Row 8 is blocked by
access: the crux is sharp, the test is known, and the samples and records sit with a party that
will not release them. New *documents* keep arriving (2023, 2024, 2026) without new *evidence of
origin*, and the same release has been read in opposite ways [8g][8i]. Row 7 is blocked by
measurement: the evidence exists and is partial, and trials that could separate wearing from
promotion at useful power are hard to run. Identity made row 7 hard to discuss; the sources reviewed
point to design limits (adherence, outcome ascertainment) as what kept it open. A conjecture from two
cases, not a finding: access-blocked cruxes can resolve suddenly if a door opens, while
measurement-blocked cruxes tend to decay, abandoned rather than answered, then relitigated as memory. Row 14
adds a third failure: a prediction whose outcome arrived and was observed, but whose cause cannot be
isolated from its neighbours. A retrospective can confirm the *what* and still not settle the *why*.

---

## What this predicts for the AI debate

Three live cruxes, taken from `data/topics/ai-white-collar-displacement.ts` and
`data/topics/ai-job-displacement.ts`. (There is no `data/topics/ai-mass-unemployment.ts`. The
flagship graph for that slot, and the `/ai` page's target in the ledger spec, is
`data/topics/drafts/ai-mass-unemployment.draft.json`. That draft does not use the three test names
below, so the ledger for `/ai` will need its own claim ids.)

1. **The Professional Task Parity Test**: *can AI perform whole professional tasks, not benchmark
   slices?* A **Pattern 1** candidate: the world runs this experiment continuously and in public,
   so it is `future-observable`. Row 7 carries the warning: the measurements that arrive first
   (bar-exam percentiles, share of code written by assistants) sit next to the crux rather than on
   it, and a map should say so when it files them. What would settle it is sustained, audited
   performance on whole tasks in deployment. The map's own counter-evidence already points there:
   Watson for Oncology, and hallucination rates in professional settings. No date is predicted
   here; the draft's three-to-five-year guess had no basis in the Covid record.

2. **The New Job Category Emergence Test** (the map's historical-precedent nodes: ATMs and bank
   tellers; US employment 60M→160M, as the map states them; not re-checked here): *does this wave create replacement categories like the last ones?*
   The settling evidence lies in the future (`future-observable`), and meanwhile each side reasons
   from a base rate it has chosen. Expect it to stay open for years, argued through historical
   analogy. It is the AI debate's equivalent of Sweden in row 6.

3. **The Augmentation-to-Displacement Transition Point**: *at what capability level does a tool
   stop adding to a worker and start replacing them?* Partly **definitional**. "Replaced" can mean
   fired, reassigned, or never hired, and the repo's Klarna node shows the definition doing the
   work. Klarna's February 2024 release said its assistant did "the equivalent work of 700
   full-time agents" [A1]; the map node's title turns that into "Replaced 700 Agents". In May 2025
   the CEO said the company was investing in human support again after cost-focused automation had
   lowered quality [A2]. Row 12 suggests the disagreement underneath may be a value question (how
   much transitional harm is acceptable for aggregate gain, and who absorbs it) presented as a
   forecast. Row 3 suggests the empirical half can settle while that value half does not.

The implication, stated as carefully as the Covid record allows: these three cruxes have different
*kinds* of resolution condition. One is observable now if the measurements target the crux, one is
observable only later, and one is partly a definition sitting on a value. A map that shows all
three the same way hides that. The Covid ledger's product lesson is that **status and resolution
kind are fields worth showing**. "Resolvable, and here is the test" versus "never resolvable, and
here is the value split" tells a reader more than evidence stacked on both sides. The fact-check
adds a second lesson: **`narrowed` was the most common honest status here**, and is likely to be on
the AI maps too. A ledger that lacks it will round rows up to `resolved`, as the first draft of
this document did for rows 5, 7, 9 and 14.

## Open items

- Decide whether "status today" and "how it left the argument" belong in the ArgumentGraph schema
  as first-class crux fields. The spec's `CruxLedgerStatus` covers the first. The second maps only
  partly onto `ResolutionKind`: "stopped mattering" and "access-blocked" have no field.
- Row 14 deserves its own map, framed as a causal-attribution crux, not a confirmed prediction.
- Repo map fixes surfaced by this check (not made here; they belong to a map-hygiene PR):
  `vaccine-mandates.ts` node "Supreme Court Struck Down the OSHA Employer Mandate" (it was a stay,
  followed by OSHA's withdrawal); `vaccine-mandates.ts` SB277 node wording "Herd-Immunity Levels"
  and "approached 95% in nearly all counties" (not in the cited abstract); and the
  `ai-white-collar-displacement.ts` Klarna title "Replaced 700 Agents" (Klarna said "equivalent
  work of").
- Re-check row 5 when the UK Covid Inquiry's Module 8 (children and young people) report is
  published, and row 14 after PAHO's November 2026 review of US measles status.

---

## Sources by row

All accessed 2026-09-22. "EPMC" = the Europe PMC record read for the abstract.

**Row 1**
- [1a] Hamner et al., "High SARS-CoV-2 Attack Rate Following Exposure at a Choir Practice — Skagit County, Washington, March 2020", *MMWR* 69(19), Early Release 12 May 2020 (weekly issue 15 May). https://www.cdc.gov/mmwr/volumes/69/wr/mm6919e6.htm
- [1b] Shen et al., "Community Outbreak Investigation of SARS-CoV-2 Transmission Among Bus Riders in Eastern China", *JAMA Internal Medicine*, online 1 Sept 2020. https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2770172
- [1c] Lu et al., "COVID-19 Outbreak Associated with Air Conditioning in Restaurant, Guangzhou, China, 2020", *Emerging Infectious Diseases* 26(7), July 2020. https://wwwnc.cdc.gov/eid/article/26/7/20-0764_article
- [1d] Morawska & Milton, "It Is Time to Address Airborne Transmission of Coronavirus Disease 2019 (COVID-19)", *Clinical Infectious Diseases*, online 6 July 2020 (239 supporting scientists). https://academic.oup.com/cid/article/71/9/2311/5867798
- [1e] WHO scientific brief, "Transmission of SARS-CoV-2: implications for infection prevention precautions", 9 July 2020. https://www.who.int/news-room/commentaries/detail/transmission-of-sars-cov-2-implications-for-infection-prevention-precautions
- [1f] CDC, "Scientific Brief: SARS-CoV-2 Transmission", updated 7 May 2021 (archived). https://archive.cdc.gov/www_cdc_gov/coronavirus/2019-ncov/science/science-briefs/sars-cov-2-transmission.html
- [1g] CDC, "Science Brief: SARS-CoV-2 and Surface (Fomite) Transmission for Indoor Community Environments", updated 5 April 2021 (archived). https://archive.cdc.gov/www_cdc_gov/coronavirus/2019-ncov/more/science-and-research/surface-transmission.html
- [1h] WHO Q&A, "Coronavirus disease (COVID-19): How is it transmitted?", 23 Dec 2021. https://www.who.int/news-room/questions-and-answers/item/coronavirus-disease-covid-19-how-is-it-transmitted
- [1i] WHO news release, "Leading health agencies outline updated terminology for pathogens that transmit through the air", 18 April 2024. https://www.who.int/news/item/18-04-2024-leading-health-agencies-outline-updated-terminology-for-pathogens-that-transmit-through-the-air
- [1j] WHO, *Global technical consultation report on proposed terminology for pathogens that transmit through the air* (2024; statement of support from Africa CDC, China CDC, ECDC, US CDC). https://cdn.who.int/media/docs/default-source/documents/emergencies/global-technical-consultation-report-on-proposed-terminology-for-pathogens-that-transmit-through-the-air.pdf

**Row 2**
- [2a] Polack et al., "Safety and Efficacy of the BNT162b2 mRNA Covid-19 Vaccine", *NEJM* 383(27), online 10 Dec 2020. https://doi.org/10.1056/NEJMoa2034577 (EPMC: https://europepmc.org/article/MED/33301246)
- [2b] Baden et al., "Efficacy and Safety of the mRNA-1273 SARS-CoV-2 Vaccine", *NEJM* 384(5), online 30 Dec 2020. https://doi.org/10.1056/NEJMoa2035389 (EPMC: https://europepmc.org/article/MED/33378609)
- [2c] Dagan et al., "BNT162b2 mRNA Covid-19 Vaccine in a Nationwide Mass Vaccination Setting", *NEJM* 384(15), online 24 Feb 2021. https://doi.org/10.1056/NEJMoa2101765 (EPMC: https://europepmc.org/article/MED/33626250)
- [2d] Watson et al., "Global impact of the first year of COVID-19 vaccination: a mathematical modelling study", *Lancet Infectious Diseases* 22(9), online 23 June 2022. https://doi.org/10.1016/S1473-3099(22)00320-6 (EPMC: https://europepmc.org/article/MED/35753318)

**Row 3**
- [3a] Eyre et al., "Effect of Covid-19 Vaccination on Transmission of Alpha and Delta Variants", *NEJM* 386(8), online 5 Jan 2022. https://doi.org/10.1056/NEJMoa2116597 (EPMC: https://europepmc.org/article/MED/34986294)
- [3b] Tan et al., "Infectiousness of SARS-CoV-2 breakthrough infections and reinfections during the Omicron wave", *Nature Medicine* 29(2), online 2 Jan 2023. https://doi.org/10.1038/s41591-022-02138-x (EPMC: https://europepmc.org/article/MED/36593393)

**Row 4**
- [4a] Karaivanov, Kim, Lu & Shigeoka, "COVID-19 vaccination mandates and vaccine uptake", *Nature Human Behaviour* 6(12), online 2 June 2022. https://doi.org/10.1038/s41562-022-01363-1 (EPMC: https://europepmc.org/article/MED/35654962)
- [4b] Mills & Rüttenauer, "The effect of mandatory COVID-19 certificates on vaccine uptake: synthetic-control modelling of six countries", *Lancet Public Health* 7(1), online 13 Dec 2021. https://doi.org/10.1016/S2468-2667(21)00273-5 (EPMC: https://europepmc.org/article/MED/34914925)
- [4c] Euronews, "Austria to suspend its controversial COVID vaccine mandate", 9 March 2022. https://www.euronews.com/2022/03/09/austria-to-suspend-its-controversial-covid-vaccine-mandate
- [4d] Brussels Reporter, "'No longer necessary': Austria scraps suspended COVID-19 vaccine mandate", 23 June 2022. https://brusselsreporter.com/europe/2022/no-longer-necessary-austria-scraps-suspended-covid-19-vaccine-mandate/
- [4e] Nyathi et al., "The 2016 California policy to eliminate nonmedical vaccine exemptions and changes in vaccine coverage: An empirical policy analysis", *PLOS Medicine* 16(12), 23 Dec 2019. https://doi.org/10.1371/journal.pmed.1002994 (EPMC: https://europepmc.org/article/MED/31869328)

**Row 5**
- [5a] NCES, "NAEP Long-Term Trend Assessment Results: Reading and Mathematics" (2022 highlights, age 9). https://www.nationsreportcard.gov/highlights/ltt/2022/
- [5b] Betthäuser, Bach-Mortensen & Engzell, "A systematic review and meta-analysis of the evidence on learning during the COVID-19 pandemic", *Nature Human Behaviour* 7(3), online 30 Jan 2023. https://doi.org/10.1038/s41562-022-01506-4 (EPMC: https://europepmc.org/article/MED/36717609)
- [5c] Goldhaber, Kane, McEachin, Morton, Patterson & Staiger, "The Consequences of Remote and Hybrid Instruction During the Pandemic", NBER Working Paper 30010, May 2022. https://www.nber.org/papers/w30010
- [5d] ECDC, *COVID-19 in children and the role of school settings in transmission — second update*, 8 July 2021. https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-in-children-and-the-role-of-school-settings-in-transmission-second-update.pdf

**Row 6**
- [6a] Royal Society, "Packages of non-pharmaceutical interventions with complementary effects unequivocally reduced COVID-19 infections, finds major Royal Society report", Aug 2023. https://royalsociety.org/news/2023/08/npi-report-launch/
- [6b] Herby, Jonung & Hanke, "A Literature Review and Meta-Analysis of the Effects of Lockdowns on COVID-19 Mortality", Studies in Applied Economics No. 200, Johns Hopkins Institute for Applied Economics, 2022 (working paper, not peer-reviewed). https://ideas.repec.org/p/ris/jhisae/0200.html
- [6c] Irish Times, "UK Covid inquiry: Earlier lockdown may have saved 23,000 lives", 20 Nov 2025. https://www.irishtimes.com/world/uk/2025/11/20/uk-covid-inquiry-earlier-lockdown-may-have-saved-23000-lives/
- [6d] The Local Sweden, "Sweden's pandemic strategy 'fundamentally correct': Coronavirus Commission", 25 Feb 2022. https://www.thelocal.se/20220225/swedens-pandemic-strategy-fundamentally-correct-coronavirus-commission-2
- [6e] BMA, "23,000 COVID deaths could have been avoided with earlier lockdown, inquiry finds", Nov 2025. https://www.bma.org.uk/news-and-opinion/23-000-covid-deaths-could-have-been-avoided-with-earlier-lockdown-inquiry-finds

**Row 7**
- [7a] Abaluck et al., "Impact of community masking on COVID-19: A cluster-randomized trial in Bangladesh", *Science* 375(6577), Jan 2022. https://doi.org/10.1126/science.abi9069 (EPMC: https://europepmc.org/article/MED/34855513)
- [7b] Jefferson et al., "Physical interventions to interrupt or reduce the spread of respiratory viruses", *Cochrane Database of Systematic Reviews* 2023(1):CD006207, 30 Jan 2023. https://doi.org/10.1002/14651858.CD006207.pub6 (EPMC: https://europepmc.org/article/MED/36715243)
- [7c] Cochrane, "Statement on 'Physical interventions to interrupt or reduce the spread of respiratory viruses' review", 10 March 2023 (June 2024 update). https://www.cochrane.org/about-us/news/statement-physical-interventions-interrupt-or-reduce-spread-respiratory-viruses-review
- [7d] Loeb et al., "Medical Masks Versus N95 Respirators for Preventing COVID-19 Among Health Care Workers: A Randomized Trial", *Annals of Internal Medicine* 175(12), online 29 Nov 2022. https://doi.org/10.7326/M22-1966 (EPMC: https://europepmc.org/article/MED/36442064)
- [7e] Solberg et al., "Personal protective effect of wearing surgical face masks in public spaces on self-reported respiratory symptoms in adults: pragmatic randomised superiority trial", *BMJ* 386, 24 July 2024. https://doi.org/10.1136/bmj-2023-078918 (EPMC: https://europepmc.org/article/MED/39048132)

**Row 8**
- [8a] WHO news release, "WHO Scientific advisory group issues report on origins of COVID-19", 27 June 2025. https://www.who.int/news/item/27-06-2025-who-scientific-advisory-group-issues-report-on-origins-of-covid-19
- [8b] Crits-Christoph et al., "Genetic tracing of market wildlife and viruses at the epicenter of the COVID-19 pandemic", *Cell* 187(19), Sept 2024. https://doi.org/10.1016/j.cell.2024.08.010 (EPMC: https://europepmc.org/article/MED/39303692)
- [8c] CIDRAP, "US intelligence agency releases declassified Wuhan SARS-CoV-2 lab leak assessments", 23 June 2023. https://www.cidrap.umn.edu/covid-19/us-intelligence-agency-releases-declassified-wuhan-sars-cov-2-lab-leak-assessments
- [8d] CBS News, "CIA now says COVID most likely originated from a lab leak but has 'low confidence' in its assessment", 25 Jan 2025. https://www.cbsnews.com/news/cia-covid-likely-originated-lab-low-confidence-assessment/
- [8e] House Committee Print, *After Action Review of the COVID-19 Pandemic: The Lessons Learned and a Path Forward* (business meeting, 4 Dec 2024; Chairman Wenstrup: "a lab leak is the most likely origin scenario"). https://www.govinfo.gov/content/pkg/CPRT-118HPRT57717/html/CPRT-118HPRT57717.htm
- [8f] House Oversight Democrats, "Ranking Member Ruiz's Statement at Select Subcommittee Final Report Markup", 4 Dec 2024. https://oversightdemocrats.house.gov/news/press-releases/ranking-member-ruizs-statement-select-subcommittee-final-report-markup
- [8g] ODNI newsroom, "Fauci Funded Wuhan Lab Research That Sparked COVID", 18 June 2026. https://www.odni.gov/index.php/newsroom/reports-publications/reports-publications-2026/4165-fauci-funded-wuhan-lab-research-that-sparked-covid
- [8h] ODNI, "Document Index: 18 June 2026 Release of COVID-19 Documents". https://archive.dni.gov/files/documents/Newsroom/Reports%20and%20Pubs/COVID-19_Release_DNI_Gabbard_6-18_Index.pdf
- [8i] Renée DiResta, "Tulsi Gabbard's Fauci Files Don't Prove What She Says They Prove", *Lawfare*, 23 June 2026. https://www.lawfaremedia.org/article/tulsi-gabbard-s-fauci-files-don-t-prove-what-she-says-they-prove

**Row 9**
- [9a] Andersen, Rambaut, Lipkin, Holmes & Garry, "The proximal origin of SARS-CoV-2", *Nature Medicine* 26(4), 2020. https://doi.org/10.1038/s41591-020-0820-9 (EPMC full text: https://europepmc.org/article/PMC/PMC7095063)
- [9b] Senate Homeland Security & Governmental Affairs Committee (majority), "New Doc Drop: Slack Messages Reveal Proximal Origin Authors Privately Doubted the Science Behind Their Own Paper…", 22 July 2026. https://www.hsgac.senate.gov/media/reps/new-doc-drop-slack-messages-reveal-proximal-origin-authors-privately-doubted-the-science-behind-their-own-paper-coordinated-with-intelligence-community-and-nih/
- [9c] Calisher et al., "Statement in support of the scientists, public health professionals, and medical professionals of China combatting COVID-19", *Lancet* 395(10226), online 19 Feb 2020. https://doi.org/10.1016/S0140-6736(20)30418-9 (EPMC: https://europepmc.org/article/MED/32087122)
- [9d] The Editors of *The Lancet*, "Addendum: competing interests and the origins of SARS-CoV-2", *Lancet* 397(10293), 21 June 2021. https://doi.org/10.1016/S0140-6736(21)01377-5 (EPMC full text: https://europepmc.org/article/PMC/PMC8215723)
- [9e] House Oversight Democrats, "Ranking Member Ruiz's Opening Statement at Select Subcommittee Hearing", 11 July 2023. https://oversightdemocrats.house.gov/news/press-releases/ranking-member-ruiz-s-opening-statement-at-select-subcommittee-hearing-2

**Row 10**
- [10a] León et al., "COVID-19 Cases and Hospitalizations by COVID-19 Vaccination Status and Previous COVID-19 Diagnosis — California and New York, May–November 2021", *MMWR* 71(4), 28 Jan 2022. https://doi.org/10.15585/mmwr.mm7104e1 (EPMC: https://europepmc.org/article/MED/35085222)
- [10b] COVID-19 Forecasting Team, "Past SARS-CoV-2 infection protection against re-infection: a systematic review and meta-analysis", *Lancet* 401(10379), online 16 Feb 2023. https://doi.org/10.1016/S0140-6736(22)02465-5 (EPMC: https://europepmc.org/article/MED/36930674)
- [10c] European Commission, "EU Digital COVID Certificate" (in application 1 July 2021 – 30 June 2023). https://commission.europa.eu/strategy-and-policy/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en
- [10d] OSHA, "COVID-19 Vaccination and Testing; Emergency Temporary Standard", 86 FR 61402, 5 Nov 2021 (section "Employees Who Were Previously Infected With SARS-CoV-2"). https://www.federalregister.gov/documents/2021/11/05/2021-23643/covid-19-vaccination-and-testing-emergency-temporary-standard (read via the full text: https://www.federalregister.gov/documents/full_text/text/2021/11/05/2021-23643.txt)

**Row 11**
- [11a] COVID-19 Forecasting Team, "Variation in the COVID-19 infection–fatality ratio by age, time, and geography during the pre-vaccine era: a systematic analysis", *Lancet* 399(10334), online 24 Feb 2022. https://doi.org/10.1016/S0140-6736(21)02867-1 (EPMC: https://europepmc.org/article/MED/35219376)
- [11b] Levin, Meyerowitz-Katz, Owusu-Boaitey, Cochran & Walsh, "Assessing the Age Specificity of Infection Fatality Rates for COVID-19: Systematic Review, Meta-Analysis, and Public Policy Implications", SSRN preprint, Oct 2020. https://doi.org/10.2139/ssrn.3684447

**Row 12**
- [12a] *Jacobson v. Massachusetts*, 197 U.S. 11, decided 20 Feb 1905. https://www.law.cornell.edu/supremecourt/text/197/11
- [12b] *National Federation of Independent Business v. Department of Labor, OSHA*, Nos. 21A244 & 21A247, per curiam, 13 Jan 2022 (stay granted). https://www.supremecourt.gov/opinions/21pdf/21a244_hgci.pdf
- [12c] *Biden v. Missouri*, Nos. 21A240 & 21A241, per curiam, 13 Jan 2022 (stays of injunctions granted; CMS rule in effect). https://www.supremecourt.gov/opinions/21pdf/21a240_d18e.pdf
- [12d] OSHA, "COVID-19 Vaccination and Testing; Emergency Temporary Standard" (interim final rule; withdrawal), effective 26 Jan 2022, FR Doc. 2022-01532. https://www.federalregister.gov/documents/2022/01/26/2022-01532/covid-19-vaccination-and-testing-emergency-temporary-standard (read via the full text: https://www.federalregister.gov/documents/full_text/text/2022/01/26/2022-01532.txt)

**Row 13**
- [13a] Kulldorff, Gupta & Bhattacharya, "Great Barrington Declaration", 4 Oct 2020. https://gbdeclaration.org/
- [13b] Alwan et al., "Scientific consensus on the COVID-19 pandemic: we need to act now" (the John Snow Memorandum), *Lancet* 396(10260), online 15 Oct 2020. https://doi.org/10.1016/S0140-6736(20)32153-X (EPMC: https://europepmc.org/article/MED/33069277)

**Row 14**
- [14a] CDC, "SchoolVaxView: Vaccination Coverage and Exemptions among Kindergartners" (2025–26 school year), updated 17 Aug 2026. https://www.cdc.gov/schoolvaxview/data/index.html
- [14b] CIDRAP, "US childhood vaccination rates continue to fall, CDC data show" (2024–25 school year: MMR 92.5%, 95.2% in 2019–20). https://www.cidrap.umn.edu/childhood-vaccines/us-childhood-vaccination-rates-continue-fall-cdc-data-show
- [14c] CDC, "Measles Cases and Outbreaks", data as of 17 Sept 2026. https://www.cdc.gov/measles/data-research/index.html
- [14d] PAHO, "PAHO calls for regional action as the Americas lose measles elimination status", 10 Nov 2025. https://www.paho.org/en/news/10-11-2025-paho-calls-regional-action-americas-lose-measles-elimination-status
- [14e] PAHO, "Measles elimination status in the United States and Mexico", 16 Jan 2026. https://www.paho.org/en/news/16-1-2026-measles-elimination-status-united-states-and-mexico
- [14f] PAHO, "Update on the review of measles elimination status", 2 March 2026 (review moved to November 2026). https://www.paho.org/en/news/2-3-2026-update-review-measles-elimination-status
- [14g] Gallup, "Far Fewer in U.S. Regard Childhood Vaccinations as Important", 7 Aug 2024. https://news.gallup.com/poll/648308/far-fewer-regard-childhood-vaccinations-important.aspx
- [14h] UNICEF press release, "New data indicates declining confidence in childhood vaccines of up to 44 percentage points in some countries during the COVID-19 pandemic", 20 April 2023. https://www.unicef.org/press-releases/sowc_2023_immunization
- [14i] CIDRAP, "Kennedy removes all ACIP members, eyes replacements", June 2025. https://www.cidrap.umn.edu/adult-non-flu-vaccines/kennedy-removes-all-acip-members-eyes-replacements
- [14j] Bardosh et al., "The Unintended Consequences of COVID-19 Vaccine Policy: Why Mandates, Passports, and Segregated Lockdowns May Cause more Harm than Good", SSRN preprint, 1 Feb 2022 (the repo's trust-erosion node cites the later *BMJ Global Health* version, doi 10.1136/bmjgh-2022-008684, which was not opened). https://doi.org/10.2139/ssrn.4022798

**Row 15**
- [15a] HHS Suspension and Debarment Official, "Notice of Debarment of Dr. Peter Daszak", 17 Jan 2025. https://oversight.house.gov/wp-content/uploads/2025/01/Dr.-Peter-Daszak-HHS-Notice_Jan-17-2025_Redacted.pdf
- [15b] Executive Order 14292, "Improving the Safety and Security of Biological Research", 5 May 2025. https://www.whitehouse.gov/presidential-actions/2025/05/improving-the-safety-and-security-of-biological-research/
- [15c] NIH, NOT-OD-26-101, "USG Policy for Stopping High-Risk Life Sciences Research", released 28 July 2026. https://grants.nih.gov/grants/guide/notice-files/NOT-OD-26-101.html

**AI section**
- [A1] Klarna press release, "Klarna AI assistant handles two-thirds of customer service chats in its first month", 27 Feb 2024. https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/
- [A2] CX Dive, "Klarna changes its AI tune and again recruits humans for customer service", 9 May 2025 (reporting a Bloomberg interview). https://www.customerexperiencedive.com/news/klarna-reinvests-human-talent-customer-service-AI-chatbot/747586/

---

## Verification log

Scope: every row, every date, number, study, agency and status claim in the 2026-09-22 draft.
Method: web search to locate sources, then each cited page opened (WebFetch, Europe PMC REST
abstracts, or local `pdftotext` on downloaded PDFs). A source is cited above only if it was opened.
Publisher pages that refused automated access (NEJM, Lancet, Science, Nature, PubMed/PMC, CNN, the
UK Covid Inquiry site, osha.gov, hhs.gov) were read through Europe PMC, the Federal Register API, or
secondary reporting, as noted.

Summary: 15 of 15 rows checked, and every row now carries at least one opened citation. Twelve
rows had factual corrections or material additions (1, 3, 4, 5, 7, 8, 9, 10, 11, 12, 14, 15);
three had sourcing and wording changes only (2, 6, 13). Four statuses moved down because the draft
overstated them: rows 5, 7, 9 and 14 to `narrowed`, or `open` at the policy level for row 7. Row 10
moved up from "mostly resolved" to `resolved`. The draft's hedged "mostly resolved" labels on rows 3
and 4 were mapped to `narrowed`. No row was wholly unverifiable; the sub-claims that could not be
checked are listed at the end.

| # | Draft said | Changed to | Why |
|---|---|---|---|
| 1 | Resolved; "the failure of surface transmission to produce cases"; WHO/CDC shifted "over 2020–2021" (dates unverified) | Resolved, dated 2021-05-07 (CDC) and 2024-04-18 (WHO terminology); surface claim restated as CDC's "does not contribute substantially" and "<1 in 10,000" per contact | Surfaces were judged low-risk, not shown to produce no cases [1f][1g]. Added the 2024 terminology change [1i][1j], which shows the crux had a definitional core. Added the 239-scientist letter [1d] because it bears on Pattern 1. The Guangzhou restaurant study framed its finding as droplets on airflow [1c]; kept as an example of the same data read both ways. |
| 2 | Resolved; "the cleanest resolution"; "repeated across countries and variants" (effect sizes unverified) | Resolved; trial and cohort numbers added; "across variants" removed; the model-dependence of deaths-averted counts noted | Effect sizes verified [2a–2d]. The trials were powered for symptomatic disease, with small severe-case counts, so the severe-outcome evidence leans on observational data [2c]. No Omicron-era severe-disease vaccine-effectiveness source was opened, so "across variants" was dropped. |
| 3 | "Mostly resolved, narrowly"; "Delta and Omicron supplied the test" | `narrowed`; empirical half resolved, "enough to justify" half a value fork; Omicron figures added | Eyre et al. covers Alpha and Delta, not Omicron [3a]. Omicron evidence added from a prison-system study [3b]. Split the status because the normative threshold cannot be measured. |
| 4 | "Mostly resolved, yes"; SB277 raised MMR "to herd-immunity levels"; Austria "abandoned before enforcement" | `narrowed`; herd-immunity wording removed; the certificate-versus-mandate definitional issue flagged; Austria dated | The SB277 abstract reports +3.3 points MMR against a synthetic control and says nothing of herd-immunity levels [4e]. The two uptake studies disagree about Germany [4a][4b]. Most evidence concerns access certificates, not general mandates. Austria's dates were verified (suspended 9 March 2022, scrapped 23 June 2022) [4c][4d]. |
| 5 | "Mostly resolved: costs larger than defenders expected"; "cross-jurisdiction comparison with places that reopened early" | `narrowed`: cost side measured, net balance open and value-laden | "Larger than defenders expected" is a claim about beliefs that cannot be checked, and it reads as a verdict. The cost side is verified [5a][5b][5c]. The early-reopening comparison is supported in a narrower form (remote versus in-person districts) [5c]. The benefit side is partial [5d]. |
| 6 | Still open; "competing meta-analyses disagree on method" | Still open; Royal Society 2023, Herby et al. 2022, UK Inquiry Module 2 (Nov 2025) and Swedish commission (Feb 2022) added | The draft predates the UK inquiry's Module 2 finding (earlier lockdown, about 23,000 fewer first-wave deaths in England, on modelling) [6c][6e]. That finding and Sweden's "fundamentally right… too few, too late" [6d] show official bodies framing this differently, which supports `open`. |
| 7 | "Split: mostly resolved for N95/individual, still open at population level"; "the Bangladesh trial, the Cochrane review fight" | `open` at the policy level, `narrowed` individually; the N95 claim withdrawn; trial figures and the Cochrane statement added | An RCT in health workers found medical masks non-inferior to N95s [7d], and Cochrane rates N95 versus medical as "very uncertain" [7b]. Laboratory filtration is not the crux. The Cochrane "fight" is documented by the editor-in-chief's statement [7c]. A 2024 Norwegian RCT was added [7e]. "Adherence is the binding variable" was restated as the documented low adherence (42% in Bangladesh; "low" per Cochrane). |
| 8 | Still open; no intermediate host; access-blocked | Unchanged status; added WHO SAGO (June 2025), market genetics (2024), IC split (2023, CIA Jan 2025), House majority report (Dec 2024) and minority dissent, the ODNI June 2026 release and a critique | The draft had no dated external sources. The 2025–2026 developments strengthen "access-blocked": document releases continue without new origin evidence. The ODNI release is represented by its own headline [8g][8h] and by a critic's reading [8i], without choosing between them. |
| 9 | "Mostly resolved: partly reputational" | `narrowed`: record of private uncertainty versus public confidence established; motive contested | "Partly reputational" is a verdict on motives that the sources do not settle: the committee minority and the investigated parties contest it [9e][8f]. Added the July 2026 Senate Slack release [9b], the Lancet addendum [9d] and the July 2023 hearing [9e]. Reading the paper's full text showed it was itself partly hedged: confident against engineering, but calling other origin theories, including selection during lab passage, impossible "to prove or disprove" at the time [9a]. The row now says so, because "public confidence" alone overstates the gap. The process-versus-origins point is kept. |
| 10 | "Mostly resolved"; "large post-Omicron seroprevalence cohorts"; "the policy that depended on it had mostly expired" | `resolved`; evidence restated as cohort and test-negative studies with dates; the policy point made precise | The evidence came from surveillance cohorts [10a] and a meta-analysis [10b], not post-Omicron seroprevalence surveys. The policy point holds for the US (OSHA declined a prior-infection exception [10d]; the rule was stayed 13 Jan and withdrawn 26 Jan 2022; the CDC data appeared 28 Jan) but not for the EU, which credited recovery from July 2021 [10c]. |
| 11 | Resolved; "roughly a thousandfold from young adults to the very old"; "both 'it's just a flu' and 'everyone is at risk' were wrong" | `resolved` for the pre-vaccine era; magnitude restated (about 350-fold from 30 to 90; about four orders of magnitude from age 7 to 90); "healthy" caveat added; "wrong" removed | Figures verified [11a][11b]. "Thousandfold" depends on the endpoints chosen. The sources give population averages by age, not for healthy people. The slogan sentence was rewritten to describe what the data show without scoring the sides. |
| 12 | Never resolvable; "the OSHA employer mandate was struck down" | `unresolvable` (value-difference, authority-allocation); OSHA rule **stayed**, then withdrawn; *Biden v. Missouri* added | The Court granted a stay on the likely-to-prevail standard [12b], and OSHA withdrew the rule [12d]. The same day the CMS rule was allowed [12c], which strengthens the "courts allocated authority" reading. Jacobson verified (20 Feb 1905, $5 fine) [12a]. |
| 13 | Never resolvable; "consistently laundered into forecasting disputes" | `unresolvable`; GBD and John Snow Memorandum cited as dated public statements of the fork; the "laundered" claim marked editorial | There is no factual core to verify beyond the documents. The generalisation is interpretive and now labelled as such. |
| 14 | "Mostly resolved, yes"; "a prediction made in 2021 by mandate skeptics that later years substantially confirmed"; "almost nobody argued this in 2021" | `narrowed`: outcome observed, attribution contested; data updated to 2026; internal contradiction removed | The draft said both that skeptics predicted it in 2021 and that almost nobody argued it. The earliest documented statement found is Feb 2022 [14j], and the repo's own map carries it as a node. The coverage and outbreak outcome is verified and larger than the draft said [14a–14f]. Attribution to Covid-era conduct, let alone to mandates, is not isolated: UNICEF names several drivers and warns the data are "volatile" [14h], and 2025 federal changes confound later years [14i]. "Confirmed" was verdict language on a causal claim. |
| 15 | Still open | Still open; EcoHealth/Daszak debarment (Jan 2025), EO 14292 (May 2025) and the USG high-risk research policy (July 2026) added | The draft had no post-2024 facts. The policy changed by executive authority, not by new risk evidence, so the status stays `open` and the value fork stays. |
| AI | "no `ai-mass-unemployment.ts` in this repo"; Klarna "700 agents replaced"; "resolves, and resolves against whoever is currently arguing from benchmarks"; "within three to five years" | File note corrected (the draft JSON exists); Klarna wording from the primary release; the losing-side prediction and the timeline removed | `data/topics/drafts/ai-mass-unemployment.draft.json` exists and is the `/ai` target. Klarna said "equivalent work of 700 full-time agents" [A1]. Naming which side a future result will go against is verdict language Argumend does not use, and the Covid record gives no basis for a timeline. |
| Patterns | P1: every resolved row resolved from outside variation, none from a better case; open rows lacked any experiment. P3: row 7 "identity-blocked"; row 14 "the most durable checkable finding" | P1: resolution came from measurement, including designed trials; argument mattered by changing what was measured and named; open rows are those whose experiments measured an adjacent quantity. P3: row 7 is measurement-blocked; row 14 recast as an observed outcome with a contested cause | Row 2 was settled by designed RCTs, not outside variation. Row 1 moved partly through organised argument and a terminology change. Masks did get RCTs. Row 14's status changed. |

**Could not verify (claims kept out of, or hedged in, the ledger):**

- WHO's April 2021 public acknowledgement of airborne transmission, reported in secondary sources.
  Not opened, so row 1 cites WHO's 23 Dec 2021 Q&A and CDC's 7 May 2021 brief instead.
- The exact online publication date of *Proximal Origin* (commonly given as 17 March 2020). Only the
  Europe PMC record (issue 26(4), April 2020) was read; the Nature page redirected to a login.
- The UK Covid Inquiry's own report page (HTTP 403). The Module 2 findings are cited through the
  Irish Times and BMA; the two give the publication date as 20 and 21 Nov 2025 respectively, and
  the ledger uses 20 Nov. Secondary reports attribute the 23,000 estimate to Imperial College modelling; the pages opened say only "modelling", so the ledger does too. The Module 8 (children) report timing, "first half of 2027", comes from
  search-result summaries and Wikipedia, not the inquiry site, so it is not stated as fact in row 5.
- Confidence levels for the FBI and Energy Department origin assessments. The CIDRAP summary [8c]
  gives positions without reliable confidence detail, so the ledger states positions only. The
  reported German BND 2020 assessment (80–95% lab) appeared only in secondary and partisan sources
  and is not cited.
- Criticism of the Herby–Jonung–Hanke meta-analysis. It was located but not opened, so row 6 notes
  only that the paper is an unreviewed working paper that other reviews contradict.
- A primary laboratory filtration study for N95 versus surgical masks. The one located carried a
  published comment and was not used; row 7 relies on the uncontested point that certified
  respirators meet a filtration standard.
- Omicron-era vaccine effectiveness against severe disease. A source was located (Collie et al.,
  NEJM 2022), but no abstract was available, so it is not cited and row 2 does not make the claim.
- The "What the public argument was actually about" column is editorial characterisation
  throughout. It is labelled as such in the table header and was not fact-checked as fact.
