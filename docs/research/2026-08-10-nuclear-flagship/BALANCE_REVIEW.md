# Adversarial Balance Review (Opus, 2026-08-10)

Five-direction attack on the research corpus by an independent Opus reviewer. Verbatim findings below; the two follow-up research runs (e-lenses, f-corrections) implement the fix list.

---

**Corpus:** `a-economics.md`, `b-reliability.md`, `c-risk-valuation.md`, `d-deployment.md` (~7,760 words, ~154 unique citations)
**Method:** Five independent advocacy passes, each arguing the corpus is skewed against the position named. Findings are stated as an advocate would state them; the consolidated list at the end is my own adjudication.

**Corpus-level source profile (relevant to several attacks):** 26 citations to `nrc.gov`, 15 to `eia.gov`, 14 to `energy.gov` — 55 of ~183 citation instances, roughly 30%, come from three U.S. federal energy agencies, two of which (NRC as the incumbent regulator, DOE-NE as a statutorily promotional office) have institutional stakes in the adequacy of the current nuclear regime. Advocacy sources are paired in A (`worldnuclearreport.org` vs `world-nuclear.org`) and D (`ucs.org` vs `thebreakthrough.org`), but **C has no skeptic-side advocacy or NGO source at all**.

**Disagreement-proposition census (relevant to Attack 4):** 20 propositions across four reports. Exactly one — C's #3 — is tagged purely `[NORMATIVE]`. All five of A's and all five of D's are cost, schedule, or feasibility questions.

---

## Attack 1 — The corpus unfairly favors nuclear expansion

**Verdict: strongest of the five attacks.** Four substantive findings.

### 1.1 Report C classifies the entire anti-nuclear case as psychology before the argument starts

C: *"The strongest anti-nuclear valuation argument is not that nuclear's expected deaths are obviously higher; it is that per-TWh accounting can underweight dread, involuntary exposure..."* and then sources that entire section to Slovic's psychometric paradigm — a **descriptive** literature about how laypeople perceive risk.

This is a framing choice that pre-decides the answer. It concedes the empirical field to nuclear in the opening clause, then represents opposition as a finding about *lay cognition* rather than as a defensible normative position with its own philosophical literature. Conspicuously absent: Kristin Shrader-Frechette (*Risk and Rationality*, *Burying Uncertainty*) — the leading philosopher of nuclear risk ethics; Charles Perrow's *Normal Accidents*; Scott Sagan's *The Limits of Safety*. C gestures at *"organizational drift"* in §5 without citing any of the organizational-accident literature that coined the concept. A section on whether PRA can bound tail risk that cites NRC's own PRA fact sheet three times and Perrow/Sagan zero times is not a steelman.

### 1.2 The German phase-out study is the corpus's decisive normative move and receives no counter

C deploys Jarvis/Deschenes/Jha twice (LSE working paper + NBER version) as *"The strongest pro-nuclear counter"* — €3–8B/yr, then *"about $12 billion per year in social costs"* — and adds *"even large estimates of avoided nuclear accident and waste costs are far smaller."* No challenge is offered.

The strongest known challenges are omitted entirely: (a) the estimate depends on a counterfactual in which retained nuclear displaces coal roughly one-for-one, when German coal generation fell steeply after 2015 on renewables buildout and carbon pricing; (b) the mortality term applies PM2.5 concentration–response functions linearly at low exposures — the same low-dose-linearity assumption C spends §3 problematizing when LNT is used *against* nuclear. The corpus applies dose-response skepticism asymmetrically depending on which side the linearity helps.

### 1.3 Barakah's $4,000/kW is presented as the pro-nuclear benchmark with none of its known deflators

A: *"four Korean APR1400 units totaling 5.6 GWe were reported in a peer-reviewed source as costing $22.4 billion, or about $4,000/kW gross"* — then A elevates it: *"the relevant benchmark is not Vogtle as a one-off but Barakah, South Korea, China..."*

Every known challenge to that figure is missing: the headline number excludes financing (a large concessional Korean export-credit facility), the labor model relies on imported migrant labor under conditions with documented rights concerns, KEPCO's fixed-price contract is widely reported to have been loss-making, and the APR1400 supply chain was the subject of Korea's 2012–13 parts-certification forgery scandal. Note the asymmetry within the same report: A carefully deflates Vogtle's number in both directions (*"the exact final all-in denominator should be treated as partly **UNVERIFIED**"*), applies the Cour des comptes all-in convention to Flamanville, and flags Hinkley as *"excluding interim interest"* — but Barakah's number passes through unadjusted.

### 1.4 MIT's NOAK curve is quoted from an industry outlet with no falsification history

A: *"a next U.S. AP1000 series could plausibly fall to about $4,300/kW and a 10th unit to about $2,900/kW"* — sourced to `world-nuclear-news.org`, the WNA's news arm. The strongest known challenge is that NOAK learning projections have a near-perfect record of failure in U.S. nuclear specifically, which is exactly what Report D independently establishes: *"recent U.S. nuclear plant labor productivity was up to 13 times lower than industry expectations"* (Eash-Gates et al., Joule). **The corpus contains its own rebuttal and never connects it.** A's skeptic paragraph loads three distinct claims onto a single unnamed ScienceDirect URL (`S0301421518303446`) while the optimistic case gets MIT, Lovering et al., and WNA.

### 1.5 (minor) Chernobyl's upper range is truncated

C caps the range at WHO/IARC's *"25,000 potential excess cancers... of which 16,000 could be fatal."* The higher published estimates (TORCH, Yablokov et al.) are omitted. Including them **with** their methodological demolition would be fairer than omitting them — as written, a reader cannot see that the skeptic side has a maximal position, or why it fails.

---

## Attack 2 — The corpus unfairly favors anti-nuclear positions

**Verdict: real but narrower than Attack 1.** Three findings, one of them structural and serious.

### 2.1 The cheapest pathway to "substantially more nuclear" is missing from the corpus

The topic question is *"a substantially larger role in U.S. electricity generation."* The corpus answers a narrower question: *can new reactors be built economically?* Uprates appear once in D, in a list (*"Palisades, Crane, Duane Arnold, uprates, gas, renewables..."*). Grep hits for "license renewal": zero. "80 years": zero.

This is the single largest structural skew against nuclear in the corpus. Subsequent license renewal to 80 years and power uprates deliver incremental firm clean TWh at a small fraction of new-build $/kW, with no construction risk, no HALEU constraint, no siting fight, and no licensing clock — the entire skeptic apparatus assembled across A and D simply does not apply to them. By scoping the economics report exclusively onto FOAK new large builds, the corpus forces the whole question onto its most expensive and slowest pathway.

### 2.2 Supply-chain scrutiny is applied to nuclear and to nothing else

D interrogates nuclear's bottlenecks in forensic detail — 67,900 workers, *"42- to 54-month lead times"* on forgings, HALEU at *"more than 1,900 kg cumulatively"* — and then compares against alternatives with a bare capacity-addition count: *"Compared with renewables and storage, the speed difference is stark... 62.8 GW in 2024."*

No comparable constraint audit is performed on the alternatives anywhere in the corpus. Absent: heavy-duty gas turbine order books (effectively sold out into the late 2020s, with prices sharply up — directly relevant because gas is the default near-term substitute); large power transformer and HV breaker lead times; battery cell supply and critical-mineral/tariff exposure. B supplies interconnection-queue and siting-ordinance data, but D — the report whose entire job is deployment realism — grades on a curve. The reader is shown nuclear's gates at high resolution and everything else at nameplate resolution.

### 2.3 Sovacool's 182,794 fatalities is quoted without its composition

C: *"his 1950-2014 database of 686 low-carbon energy accidents found 182,794 fatalities."* The overwhelming majority of that total is a single event — the 1975 Banqiao dam cascade — not nuclear, not wind, not solar. The report's caveat is generic (*"accident databases are sensitive to thresholds, media reporting, and attribution rules"*) and never states the composition. A reader scanning a nuclear-safety brief will bind that number to nuclear. Likewise *"categorized hydro, wind, and nuclear as 'high' accident risk"* is passed through without defining the classifier or noting that it is frequency/consequence-class based, not per-TWh.

### 2.4 (weak) LCOE lifetime asymmetry

A correctly flags EIA's *"30-year cost recovery period and 7.27% after-tax WACC"* and its sensitivity, but never states the corollary: a 30-year recovery window on an asset now routinely licensed to 60 and increasingly to 80 years is an accounting convention that materially inflates nuclear's LCOE relative to its physical life. A gets partial credit for raising WACC sensitivity; it does not close the loop.

---

## Attack 3 — The corpus unfairly favors renewables-first positions

**Verdict: substantive, mostly through steelman-selection.** Three findings.

### 3.1 The renewables-first side is represented by its most attackable advocate

B builds the 100% case on Jacobson: *"The Jacobson wind-water-solar position is the most aggressive version of this side,"* then Clack's rebuttal, then a rescue — *"A steelman version does not need every Jacobson assumption to be correct."*

Two problems. First, the serious modern 100%/high-RE modeling literature that is *not* Jacobson is absent: Clack's own Vibrant Clean Energy WIS:dom work, Breyer/LUT's global 100% RE studies, Ram et al. Choosing the field's most litigated advocate as the standard-bearer makes the position look weaker than its best current version. Second, the omitted context — Jacobson's subsequent $10M defamation suit against Clack and PNAS, its withdrawal, and the anti-SLAPP fee award against him — materially bears on how much standing that 2015 result retains in the field, and a reader deciding how much weight to give *"Jacobson et al. reaffirmed that conclusion"* is entitled to know it.

Note the asymmetric courtesy: B rescues Jacobson from his own assumptions. Nobody rescues NuScale/CFPP in A.

### 3.2 The strongest academic anti-nuclear-*because*-pro-renewables argument is absent from all four reports

Zero corpus hits for Lovins, for RMI, or for the opportunity-cost-of-capital argument (that a dollar-year spent on nuclear buys less carbon abatement than the same dollar-year in efficiency or renewables, so nuclear is *climate-counterproductive* even if safe and clean). Likewise absent is Sovacool, Stirling et al.'s Nature Energy finding of an inverse association between national nuclear commitment and emissions-reduction rates — and its published rebuttals. This is not a fringe position; it is the dominant argument in the environmental-NGO and much of the academic energy-policy world, and the corpus does not know it exists.

Relatedly: energy efficiency and demand-side management as a *first* resource appears only as a grid-flexibility input in B (NREL Electrification Futures) — never as a rival claimant on the same capital.

### 3.3 Nuclear-favorable framings in B go unchallenged where renewable-favorable ones do not

B's firm-resource section does real work, but two figures pass without their strongest challenges. *"EIA's 2024 data show nuclear at a 92.3% capacity factor, wind at 34.3%, and solar PV at 23.4%"* is followed by a correct caveat — but the omitted rejoinder is that nuclear's capacity factor is an *average over units not in refueling or extended outage*, and that a single 1.1 GW unit tripping is a larger correlated contingency than any single renewable asset, which is why grids size reserves against the largest single unit. B raises correlated *weather* risk in detail and correlated *unit* risk not at all.

Conversely, the report never notes that NREL's siting-ordinance extrapolation — *"could reduce available wind and solar resources by up to 87% and 38%"* — is a scenario-based upper bound from extrapolating restrictive local rules nationwide, not a measured constraint. It is quoted as if it were the latter, in a paragraph titled to support the firm-resource case.

---

## Attack 4 — Economic framing crowds out non-economic considerations

**Verdict: strongest structural finding in the review.** The census is the argument.

### 4.1 Nineteen of twenty disagreement propositions resolve to cost, schedule, or feasibility

A's five propositions are entirely economic, down to the framing of the policy question: *"Whether policy can reduce nuclear cost or only shift it."* D's five are entirely feasibility. B's five are cost/technical, including #5, which converts the social question into process metrics: *"comparable permitting, cancellation, litigation, and community-benefit data across all resource classes"* — i.e., social constraint measured as friction cost, not as a claim about legitimacy. Only C's #3 is tagged `[NORMATIVE]`.

No proposition anywhere in the corpus asks **who should decide**, **on what terms consent is given**, or **what is owed to a host community or to future generations independent of expected cost**. A reader could complete the corpus believing that "should the U.S. build more nuclear?" is a well-posed engineering-finance question with a hidden answer.

### 4.2 Even the normative report resolves through monetization

C explicitly declares an `[EMPIRICAL]`/`[NORMATIVE]` split in its first paragraph — good structure — and then adjudicates the normative section with two dollar figures (*"€3-8 billion per year in social costs"*, *"about $12 billion per year"*). Slovic's psychometrics are presented as *"a normative challenge to simple expected-value comparisons, not just an empirical error"* and then are given no advocate, no policy implication, and no defender. The section's closing sentence is a cost-benefit instruction: *"'catastrophic risk aversion' must be compared not to zero risk, but to the chronic and climate risks of the replacement grid."*

### 4.3 The intergenerational problem is stated as governance, never as ethics

C's proposition 5: *"Are dry casks, geologic repositories, safeguards, and once-through fuel cycles institutionally reliable over the relevant time horizons?"* — an institutional-competence question. The word "discount" does not appear anywhere in the corpus. The central technical fact about very-long-horizon harms — that any standard discount rate reduces a 10,000-year waste hazard to approximately zero present value, which is why the ethics literature (Parfit, Broome, Gardiner) treats it as a case where NPV fails rather than answers — is never raised. The precautionary principle is never named, in either its Sunsteinian critique or its defenses.

### 4.4 Labor appears only as a supply constraint

D's *"67,900 U.S. nuclear energy workers"* and *"more than 80% of employers... had at least 'some' hiring difficulty"* are framed exclusively as bottleneck inputs. Job quality, union density, the distributional politics of who captures a buildout's wages, and the historical occupational-health record of the fuel cycle are absent. A's one genuine distributive datum — South Carolina's *"nine rate increases from 2009 to 2017 for the project before it produced electricity"* — is immediately reframed economically: *"construction risk was shifted toward ratepayers."* Who those ratepayers were, and what it means to have charged them for a plant that was never built, is not asked.

---

## Attack 5 — Environmental/climate framing crowds out other lenses

**Verdict: the corpus's largest coverage hole, measurable by grep.** Corpus-wide hits: **"justice" 0. "indigenous" 0. "Navajo" 0. "energy security" 0 as a phrase. "tribal" 1** (a single subordinate clause). **"drought" 0. "sea level" 0. "heatwave" 0.** Water appears only as a reactor-design descriptor.

### 5.1 The fuel cycle's front end does not exist in this corpus

All four reports begin at the reactor. There is no uranium mining, milling, or tailings content anywhere — and therefore no Navajo Nation (hundreds of abandoned uranium mines under long-running EPA cleanup), no 1979 Church Rock tailings release (by volume the largest accidental release of radioactive material in U.S. history, larger than TMI, and absent from a corpus that discusses TMI at length), and no RECA compensation history. This is not a marginal omission in a brief whose §1 is titled *"Comparative Mortality"* and whose central table is deaths per TWh: those per-TWh figures rest on fuel-cycle boundary choices that the report never states.

### 5.2 Consent and siting are one clause with no citation

D: *"Consent-based siting remains important because NRC licensing does not eliminate state, local, tribal, environmental, water, transmission, and emergency-planning politics."* No source, no development, no case.

Absent from the corpus: the Western Shoshone treaty objection to Yucca Mountain — C reduces the entire Nevada consent question to *"the political process remains unresolved"*; the Texas/New Mexico consolidated interim storage fights and the 2025 Supreme Court ruling on the ISP license; Skull Valley Goshute and Prairie Island as the standing U.S. cases of nuclear facilities sited on tribal land. C's proposition 5 asks whether long-lived stewardship obligations may be imposed on *future* generations while never asking about the present communities on whom siting burdens actually fall.

### 5.3 Land use is deployed as a weapon against renewables only

B, explicitly: *"Transmission and land constraints strengthen the firm-resource case"* — NREL ordinances, setbacks, an 87%/38% resource reduction. The same lens is never turned around: no emergency planning zone footprint, no uranium mining land disturbance, no exclusion-area or repository land commitment. A lens applied to one resource class and not the other is not a lens; it is an argument.

### 5.4 Water and climate-vulnerability of nuclear itself are absent

Nuclear is the most water-intensive thermal generator, sited overwhelmingly on rivers and coasts. Recurring European reactor derates during heatwaves and low-river-flow events, drought exposure in the U.S. West and Southeast, and coastal sea-level/storm-surge exposure (Turkey Point being the standing U.S. example) are all missing. C treats Fukushima's tsunami as an external-hazard one-off rather than as the leading instance of a general class — *climate-correlated stress on thermal siting* — even as B builds an entire section on climate-correlated stress applied to wind and solar.

### 5.5 Energy security is present only as an input cost, never as a value

D's *"Russia supplied about 44% of global enrichment services"* and the import ban appear solely as HALEU supply risk. The corpus never states the geopolitical/alliance argument that is among the most-cited live pro-nuclear cases in 2026 — that U.S. absence from the export market cedes reactor sales, and with them safeguards and safety norm-setting, to Rosatom and CNNC. That argument is not climate, not cost, and not reliability, so the corpus's three-lens frame has no slot for it. It is missing not by oversight but by construction, which is the point of this attack.

---

## Consolidated prioritized fix list

Ordered by fairness gain per unit of work. "Strengthens" names the side the fix helps, so the net balance is visible.

| # | Report | Change | Strengthens |
|---|---|---|---|
| **1** | **All / new §** | Add front-end fuel cycle and consent/justice coverage: uranium mining and tailings legacy (Navajo abandoned mines, Church Rock 1979, RECA), Western Shoshone objection to Yucca, the Texas/New Mexico interim-storage litigation and 2025 SCOTUS ruling, tribal-land siting cases. Currently 0 corpus hits for "justice," "indigenous," "Navajo." Largest single hole. | Anti-nuclear / justice lens |
| **2** | **A** (scope) | Add the existing-fleet pathway: subsequent license renewal to 80 years and power uprates, with $/kW and incremental TWh. The topic asks about nuclear's *role*, and the corpus scopes it entirely onto FOAK new-build — the most expensive route. 0 hits for "license renewal." | Pro-nuclear |
| **3** | **C §4–5** | Replace the psychology-only treatment of the normative case with actual normative literature: Shrader-Frechette, Perrow's *Normal Accidents*, Sagan's *Limits of Safety*, and the discounting problem for multi-millennial harms. Add at least one skeptic-side advocacy source (C currently has none). | Anti-nuclear |
| **4** | **D** | Apply D's supply-chain method symmetrically: gas turbine order books and pricing, transformer/HV equipment lead times, battery cell and critical-mineral exposure. Currently nuclear's gates are audited at high resolution and alternatives' at nameplate resolution. | Pro-nuclear |
| **5** | **A** | Deflate Barakah's $4,000/kW with the same rigor applied to Vogtle/Flamanville/Hinkley: financing exclusion, concessional export credit, labor model, KEPCO contract losses, APR1400 parts-certification scandal. | Anti-nuclear |
| **6** | **A** | Cross-link MIT's NOAK curve ($4,300 → $2,900/kW) to D's Joule productivity finding (*"up to 13 times lower than industry expectations"*), and name the Lovering et al. critics rather than loading three claims onto one unnamed URL. The corpus already contains this rebuttal and never connects it. | Anti-nuclear |
| **7** | **C** | Counter Jarvis/Deschenes/Jha with its known challenges (coal-displacement counterfactual; low-dose-linear PM2.5 response used in the same brief that problematizes LNT). Add INWORKS (Richardson et al., BMJ 2023) as the leading recent *pro*-LNT evidence — currently 0 corpus hits, while the LNT-critical side is cited. | Anti-nuclear |
| **8** | **B** | Add the non-Jacobson high-RE modeling literature (Clack/VCE WIS:dom, LUT/Breyer) as the renewables-first standard-bearer, and disclose the Jacobson v. Clack litigation history where Jacobson's reaffirmation is cited. Add Lovins/RMI opportunity-cost-of-capital and the Sovacool–Stirling Nature Energy finding *with* its rebuttals. 0 corpus hits for Lovins. | Renewables-first |
| **9** | **B / C** | Apply the climate-stress lens to nuclear: water intensity, heatwave and low-flow derates, drought and coastal/sea-level exposure. Currently climate-correlated stress is analyzed only for wind and solar. Add battery-side counterweights B omits (energy vs power capacity, degradation/augmentation, Moss Landing 2025). | Mixed — anti-nuclear on siting, pro-firm on storage |
| **10** | **C §1** | State that Sovacool's 182,794 figure is dominated by a single hydro event (Banqiao), and define the "high accident risk" classifier. As written the number binds to nuclear in a nuclear-safety brief. | Pro-nuclear |
| **11** | **D** | Add energy security/geopolitics as an independent lens, not an input cost: export-market and norm-setting arguments vs. Rosatom/CNNC, and the counterargument that domestic buildout is neither necessary nor sufficient for export competitiveness. | Pro-nuclear (with its counter) |
| **12** | **All — propositions** | Rebalance the 20 disagreement propositions: currently 19 resolve to cost/schedule/feasibility. Add at least three genuinely normative ones — who decides; what host communities are owed; how multi-millennial harms should be weighed against near-term mortality. | Non-economic lenses generally |

**Net balance of the fix list:** 5 fixes strengthen the pro-nuclear side, 5 strengthen anti-nuclear/renewables-first, 2 are mixed or structural. The corpus is closer to balanced on the *nuclear vs. anti-nuclear* axis than on the *economic vs. non-economic* axis. Items 1, 3, and 12 are the ones that change what kind of question the reader thinks they are answering.

**Where the attacks found less:** Attack 2 (anti-nuclear skew) is the weakest of the five on rhetoric and framing — A and D both open by naming the pro-nuclear steelman, and both pair advocacy sources across the aisle. Its force comes almost entirely from two scoping decisions (fix #2, #4) rather than from tilted presentation. I did not find manufactured or misquoted figures anywhere in the corpus, and the inline `**UNVERIFIED**` flags on Vogtle's final cost, NuScale CFPP escalation, and the DOE New Jersey moratorium contradiction are honest and should be preserved.
