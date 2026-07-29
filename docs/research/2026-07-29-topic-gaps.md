# Topic Content Gaps — 18 Candidates for the Gift-Map Pipeline

**Date:** 2026-07-29
**Scope:** Prioritized candidate list only. This does **not** build topic maps — it feeds the existing gift-map / topic-extraction pipeline (`docs/research/2026-04-28-current-controversies/` is the format precedent).
**Baseline:** 156 topic files in `data/topics/` as of this date.

---

## 1. The bar a candidate has to clear

Reading the existing corpus (`data/topics/tipping-culture.ts` is a good exemplar), a publishable Argumend topic needs five things:

1. **A meta-claim both sides would recognize as the actual disagreement** — not a strawman of either side.
2. **No obvious factual answer.** If a competent, honest analyst lands on one side within an hour, it's a blog post, not a map.
3. **Real evidence on both sides.** Ideally quantitative, ideally with named studies that point in opposite directions.
4. **A falsifiable crux** — a study you could actually run (with a cost estimate) that would move a reasonable person. The `crux.methodology` + `cost_to_verify` fields are the hard part; a topic that can't fill them isn't ready.
5. **Both tribes are somewhat wrong.** The best existing maps (tipping, meritocracy-myth, obesity-personal-responsibility) work because the honest answer embarrasses everyone.

Two failure modes the corpus deliberately avoids: **pure values conflicts** with no empirical crux (abortion personhood, most of Israel–Palestine), and **settled questions with a loud minority** (moon landing and lab-leak are in the corpus, but as *epistemics* maps, not "is it true" maps).

**Volume gauge caveat:** no keyword tool was available. Bands below are inferred from live-news presence (verified via web search for the Tier 1 items), the breadth of the constituency that cares, and whether the phrase is one a person would actually type into a search box. Treat as ordinal, not cardinal.

---

## 2. Priority list

| # | Candidate | Volume | Crux quality | Risk |
|---|---|---|---|---|
| 1 | Is the AI capex boom a bubble? | Very high | Strong | Low |
| 2 | Do chip export controls work? | High | Very strong | Low |
| 3 | Housing First vs. treatment-first | High | Very strong | Medium |
| 4 | Do voter ID laws suppress turnout? | High | Very strong | Medium |
| 5 | Does gerrymandering cause polarization? | Very high (2026) | Strong | Medium |
| 6 | Age verification laws | High | Strong | Low |
| 7 | Universal school vouchers / ESAs | High | Very strong | Medium |
| 8 | H-1B and high-skilled immigration | High | Strong | Medium |
| 9 | Saturated fat and heart disease | Very high | Strong | Low |
| 10 | Menopause hormone therapy | High | Very strong | Low |
| 11 | Bail reform | Medium-high | Very strong | Medium |
| 12 | Science of reading vs. balanced literacy | Medium-high | Very strong | Low |
| 13 | Did lockdowns and school closures work? | Very high | Strong | High |
| 14 | Induced demand / highway widening | Medium | Very strong | Low |
| 15 | Can a grid run on ~100% renewables? | Medium-high | Very strong | Low |
| 16 | Do parents matter? (shared environment) | Medium-high | Strong | Medium |
| 17 | Prediction markets: forecasting or gambling? | Medium | Strong | Low |
| 18 | Private equity in healthcare | Medium | Very strong | Low |

---

## Tier 1 — ship first (high volume, clean crux, strong audience fit)

### 1. Is the AI infrastructure buildout a bubble?
**Meta-claim:** *The 2025–26 hyperscaler AI capital expenditure cycle will not earn its cost of capital.*
Genuinely two-sided: hyperscalers committed roughly $660–775B for 2026 (~78% YoY growth) and defend it with real revenue growth and capacity constraints; skeptics point to ~$662B in signed-but-not-commenced datacenter leases (Moody's, early 2026), circular vendor-financing flows, memory-price inflation eating margin (~$25B of Microsoft's $190B), and the absence of a measurable AI contribution to US GDP growth. Nobody knows the answer, and both camps have real numbers.
**Crux:** GPU/accelerator economic depreciation life. The bull case needs 5–6 year useful life; the bear case says 2–3. Measurable from resale markets and utilization telemetry.
**Volume:** Very high — one of the dominant financial-press stories of 2026, and directly upstream of every reader's retirement account.
**Gap check:** `ai-job-displacement`, `ai-superintelligence-timeline`, `ai-energy-water-footprint` are all adjacent; none covers the *financial* claim.

### 2. Do semiconductor export controls slow China down or accelerate it?
**Meta-claim:** *US semiconductor export controls have set back China's AI capability more than they have accelerated its domestic substitution.*
This is the rare policy question where the two sides are both credentialed and both citing the same facts. China's semiconductor-equipment self-sufficiency target moved from 13.6% (2024) toward ~50%; Huawei chip revenue is tracking ~$12B in 2026 vs. $7.5B in 2025 — controls-are-backfiring evidence. The counter-case (CSIS, War on the Rocks) is that lithography and equipment chokepoints are structurally hard to route around and the lag is real. The Trump administration's 2026 relaxation makes it live policy, not history.
**Crux:** Frontier-node yield and volume at SMIC/Huawei versus TSMC on a fixed calendar — a directly observable gap that either widens or narrows.
**Volume:** High, and unusually high-quality audience (tech, policy, rationalist).

### 3. Housing First vs. treatment-first for chronic homelessness
**Meta-claim:** *Housing First should remain the default federal approach to chronic homelessness.*
RCTs genuinely support Housing First on *housing retention* (>80% housed at one year for high-need clients) and genuinely fail to show comparable gains on *substance use and serious mental illness* — which is exactly the Manhattan Institute / Cicero critique. The 2026 CoC NOFO shift toward treatment-compliance requirements and the July 2025 attempt to defund Housing First make this operationally live. This is a textbook "both tribes are measuring different outcomes" map.
**Crux:** Whether housing stability is a necessary precondition for treatment engagement, or a substitute for it — resolvable with a randomized trial measuring treatment initiation and 3-year sobriety/psychiatric outcomes, not just tenancy.
**Volume:** High, especially West Coast metros.
**Risk:** Medium — encampment politics are hot, but the evidence base is genuinely bipartisan-citable.

### 4. Do voter ID and election-integrity laws suppress turnout?
**Meta-claim:** *Strict voter ID requirements measurably reduce turnout among eligible voters.*
The best map in this list for the "everyone is miscalibrated" thesis: the most rigorous work (Cantoni & Pons, QJE) finds effects statistically indistinguishable from zero on both turnout *and* fraud, which contradicts both parties' headline claims simultaneously. Massive constituencies on both sides, near-zero honest coverage.
**Crux:** Whether counter-mobilization effects offset access effects — separable with administrative voter-file data across staggered state adoptions.
**Volume:** High and perennial, spiking every even year (2026 midterms).

### 5. Does gerrymandering explain congressional polarization?
**Meta-claim:** *Partisan redistricting is a primary cause of US congressional polarization.*
The 2026 mid-decade redistricting war (Texas, Missouri, Florida; California and New York retaliating; *Louisiana v. Callais*) gives this enormous news volume. The genuine dispute is empirical and under-reported: political scientists (Chen & Rodden, McCarty/Poole/Rosenthal) find that residential geographic sorting produces most of the seat bias, and that the Senate — which cannot be gerrymandered — polarized on the same trajectory. That finding sits uncomfortably with the reform movement's core claim without vindicating the gerrymanderers.
**Crux:** The Senate control. If polarization tracks identically in a chamber with fixed districts, redistricting cannot be the primary driver.
**Volume:** Very high through November 2026.

### 6. Do age-verification laws protect minors or just create a surveillance surface?
**Meta-claim:** *Mandatory online age verification reduces minors' exposure to harmful content by enough to justify its privacy cost.*
25 states have active laws as of January 2026, ~10 more pending, and SCOTUS upheld the constitutional question in June 2025 — so the debate has shifted entirely to the empirical one, which is unsettled. Supporters have the most bipartisan policy in the country; EFF and civil-liberties groups have real evidence on VPN substitution, breach exposure, and traffic displacement to non-compliant sites. The EU zero-knowledge-proof wallet pilot is a genuine third path that neither US camp discusses.
**Crux:** Post-mandate change in minors' *total* exposure (compliant + non-compliant + VPN), not just compliant-site traffic.
**Volume:** High; near-universal parent constituency.

### 7. Do universal school vouchers / ESAs improve outcomes?
**Meta-claim:** *Universal education savings accounts improve academic outcomes for participating students.*
The literature is genuinely split by outcome measure and by era: older city-level lottery studies and attainment research (Milwaukee, DC college enrollment) look positive; the modern statewide programs look negative or null on test scores (Louisiana, Indiana, and 2026 Tennessee ESA results showing participants underperforming public-school peers). Meanwhile Arizona's universal ESA requires no standardized testing at all — an accountability gap that is itself a first-class crux.
**Crux:** Test-score effects vs. attainment effects diverge in this literature more than almost any other in education economics. Which is the right outcome, and does the divergence survive when programs go universal (shifting from oversubscribed-lottery to already-private populations)?
**Volume:** High; ~30 states with live legislation.

### 8. Does high-skilled immigration (H-1B) displace American workers?
**Meta-claim:** *H-1B admissions lower wages or employment for comparable US workers.*
The $100k proclamation fee — vacated by the District of Massachusetts on June 8, 2026, then stayed and back in effect June 12 — makes this maximally live. Genuinely contested economics: the complementarity literature (Peri, Kerr) versus displacement findings in specific IT-outsourcing segments (Hira, Matloff), with 20 states suing on the grounds that the fee harms *their* hiring of teachers, researchers, and clinicians. Rare topic where the tech-right and the labor-left partially swap sides.
**Crux:** Whether the program's marginal user is a frontier researcher or a body-shop staffing substitute — separable by employer type in USCIS disclosure data.
**Volume:** High, with an intensely engaged diaspora audience.

---

## Tier 2 — strong candidates, evidence-rich

### 9. Does saturated fat cause heart disease?
Arguably the highest-search-volume unresolved question in nutrition. The dietary-guidelines consensus (Hooper Cochrane review, LDL mechanism) versus PURE, the Minnesota Coronary Experiment reanalysis, and the 2020 *JACC* dissent. `seed-oils-health`, `ultra-processed-food`, and `organic-food-health` are covered; the central nutrition controversy is not. **Crux:** Whether LDL-C is a sufficient surrogate endpoint for hard cardiovascular outcomes when saturated fat also raises HDL and shifts particle size. **Volume:** Very high, evergreen.

### 10. Should more women take menopause hormone therapy?
A genuine scientific reversal in progress: the 2002 WHI headline drove a ~80% collapse in HRT use; subsequent age-stratified reanalyses suggest net benefit for women initiating within ten years of menopause, and the FDA removed the boxed warning. Still genuinely contested on breast-cancer risk magnitude and formulation. Enormous, underserved, high-intent audience and almost no honest argument mapping anywhere. **Crux:** The timing hypothesis — whether initiation window rather than HRT itself explains the WHI harm signal.

### 11. Does bail reform increase crime?
Clean natural experiments (New Jersey 2017, New York 2020, Illinois 2023) that produced genuinely mixed results, plus a large first-principles literature on pretrial detention's own criminogenic effect (Dobbie, Goldin & Yang). Both sides cite real numbers; both cherry-pick the jurisdiction. **Crux:** Failure-to-appear and re-arrest rates for the *marginal* released defendant, which requires the judge-leniency IV design rather than aggregate crime trends.

### 12. Science of reading vs. balanced literacy
Rare case where one side is *mostly* right and the honest map is about how much: phonics has strong RCT and meta-analytic support for decoding, and the *Sold a Story* effect drove ~40 states to legislate; the live disagreement is whether the reforms deliver comprehension gains at scale (Mississippi's NAEP gains vs. retention-policy confounds) and what happens to the top of the distribution. Good "settled-ish but the implementation crux is real" map. **Volume:** Medium-high, extremely high parent/teacher intent.

### 13. Did COVID lockdowns and school closures do more good than harm?
**Volume: very high.** The counterfactual is genuinely unresolvable from aggregate data — Sweden's outcomes, the Herby/Hanke meta-analysis and its critics, and NAEP learning-loss magnitudes versus mortality-averted estimates. Real evidence on both sides, and a clean structural crux (voluntary vs. mandated behavior change). **Risk: high** — this is the `rfk-health-policy` category of tar. Recommend sequencing it after two or three Tier 1 maps have banked credibility, and framing narrowly on *school closures*, where the evidence is strongest and the tribal charge is lowest.

### 14. Does widening highways reduce congestion?
The induced-demand literature (Duranton & Turner's near-unit elasticity) is strong but the policy inference is contested — critics note the elasticity does not imply *zero* welfare gain from added capacity, since more trips taken is partly a benefit, not purely a loss. Good map because the popular version of the "correct" side overstates its own result. Complements `congestion-pricing`. **Volume:** Medium but a devoted urbanist/YIMBY audience overlapping the existing wedge.

### 15. Can a grid run on ~100% renewables without nuclear or gas?
The Jacobson vs. Clack *PNAS* exchange is one of the most literally litigated scientific disputes in energy, and the 2026 datacenter load growth has made it operational rather than academic. `nuclear-renaissance-smr`, `climate-change`, and `hydrogen-economy-viability` are covered; the firm-vs-variable capacity question is the crux underneath all three and isn't mapped. **Crux:** Cost and feasibility of multi-day to seasonal storage at grid scale.

### 16. Do parents matter? (the shared-environment question)
Behavioral genetics finds near-zero shared-environment effect on adult personality and IQ (twin and adoption studies, Harris's *The Nurture Assumption*), while adoption and natural-experiment work finds real effects on attainment, health behaviors, and values. Evergreen, extremely high personal salience, and the corpus has nothing in this space. **Crux:** Whether shared-environment estimates are attenuated by restricted range of parenting in study samples. **Risk:** Medium — adjacent to heritability debates; keep the frame on parenting, not group differences.

### 17. Prediction markets: better forecasting or regulated gambling?
Strong audience fit (rationalist/forecasting wedge overlaps the AI-2027 readership) and genuinely live — CFTC rulemaking, a 2026 lobbying war between Kalshi/Polymarket and the casino industry, and state-by-state sports-contract fights. Two-sided on evidence, not just values: the accuracy case is real, but a 2026 LBS/Yale study finds ~3% of Polymarket traders account for the platform's accuracy while ~93% of participants lose money — i.e. the epistemic good is financed by a gambling-shaped transfer. **Crux:** Whether calibration survives when volume shifts from political/economic contracts to sports and entertainment.

### 18. Is private equity ownership bad for healthcare?
Unusually clean evidence on both sides: PE-acquired nursing homes show elevated mortality (Gupta et al.) and hospitals show increased adverse events (Kannan et al., *JAMA*), against a real counterfactual that many acquired facilities were distressed and would otherwise have closed. **Crux:** The right comparison group — matched distressed non-acquired facilities, not the average facility. **Volume:** Medium but rising with 2026 hospital-closure coverage.

---

## 3. Considered and deliberately excluded

- **Abortion** — the disagreement is about personhood, not evidence. No crux survives contact with the actual dispute. (A narrow `fetal-viability-limits` map is possible but low-value.)
- **Israel–Gaza** — very high volume, but currently the highest tribal-tar risk on the board and the core disputes are moral/definitional. Same reasoning the 2026-04-28 synthesis applied to `rfk-health-policy`. Defer.
- **UAP disclosure, raw milk, ivermectin** — evidence is one-sided; would read as false balance.
- **IQ heritability across groups** — genuine scientific dispute, unacceptable reputational cost-benefit for a young brand. Candidate #16 captures the interesting adjacent question at a fraction of the risk.
- **Stablecoins / GENIUS Act, single-family zoning, safe injection sites, sanctions effectiveness, ranked-choice voting, Medicare drug-price negotiation, kidney markets, quantum-computing hype, Copenhagen vs. many-worlds** — all reasonable; each is either substantially subsumed by an existing map (`cryptocurrency-regulation`, `housing-affordability-crisis`, `drug-decriminalization`) or lower volume than the 18 above. Hold as the next batch.

## 4. Suggested batching for the pipeline

- **Batch A (immediate):** 1, 2, 5, 6 — all four are pegged to news cycles running now through the November 2026 midterms.
- **Batch B (evergreen SEO):** 9, 10, 12, 14, 16 — no news peg, compounding long-tail search, low risk.
- **Batch C (policy-evidence showcase):** 3, 4, 7, 8, 11, 18 — the maps that best demonstrate "both tribes are wrong," which is the product's actual differentiator.
- **Batch D (sequenced later):** 13, 15, 17.
