# Citation Moat Sprint — Changelog

Running log of the autonomous hardening sprint (2026-06-16). Each batch: web-verified edits, tsc + 206 tests green, pushed to main.

## Baseline (2026-06-16)
- Citation coverage: **56%** (641/1136 evidence items with a real sourceUrl).
- Infra added: `scripts/citation-coverage.ts` (targeting metric), `scripts/audit-confidence.ts`.
- Prior rounds (pre-sprint): fabricated cites corrected, launch topic URLs backfilled, ~30 mis-cites fixed (see `docs/reviews/00-INDEX.md`).

## Iteration 1 (2026-06-16) — coverage 56% → 65%
Hardened 10 AI-cluster + flagship maps (1 web-agent each, every claim source-verified):
ai-risk, ai-superintelligence-timeline, ai-replacing-doctors, climate-change,
nuclear-energy-safety, minimum-wage-effects, drug-decriminalization,
death-penalty-deterrence, gene-editing-embryos, free-will.
Notable corrections beyond URL backfill: ai-risk "GPT-4 no goal-seeking" countered by
Apollo scheming research; Seattle min-wage study re-coded (UW found hours/earnings LOSS);
Oregon M110 de-causalized (implementation failure, not causal overdose harm); free-will
Vohs & Schooler flagged with its failed preregistered replication; climate-change 12/12 at
100% with no false balance. Many weights de-inflated where reliability rested on bad attribution.

## Iteration 2 (2026-06-16) — coverage 65% → 73%
Hardened 12 zero-coverage maps (1 web-agent each, every claim source-verified):
big-tech-antitrust, billionaire-wealth, cancel-culture, china-taiwan-invasion,
college-value-proposition, electoral-college-reform, ev-environmental-impact,
foreign-aid-effectiveness, gig-economy-regulation, global-housing-bubble,
homeschooling-effectiveness, immigration-wage-impact. 96 evidence items moved 0→verified URL.
Notable corrections beyond URL backfill: cancel-culture "62% self-censor" re-attributed
Pew→Cato/YouGov + fabricated CSPI "75/15 faculty" and "91% Fortune-500 DEI" figures removed;
ev-environmental-impact false-balance fixed (UCS "191 MPG"/"cleaner in all 50 states" and a
phantom MIT "$75-125B grid cost" stripped, anti-EV items down-weighted to match lifecycle
evidence); big-tech-antitrust EU-DMA "forced Amazon structural separation" (false — DMA is
conduct regulation) corrected, Apple opt-out 96% re-attributed Lotame→Flurry; immigration-wage
Card/Borjas Mariel dispute represented precisely, CBO GDP figures corrected; homeschooling
Ray-2010 "persists across income" claim reversed (sample 92% white/64% college-degree), Cardus
voting claim flipped (homeschool grads vote *less* locally); foreign-aid Mozambique tuna-bond
corrected ($1B→~$2B, were commercial loans not aid); global-housing first-time-buyer-low
re-dated 2023→2022, Airbnb "15-30% rent" → ~1.9% avg (García-López). Weights de-inflated
throughout where reliability rested on advocacy sources or unverifiable figures.

## Iteration 3 (2026-06-16) — coverage 73% → 83%
Hardened 12 zero-coverage maps (1 web-agent each): inflation-monetary-policy, mandatory-voting,
media-bias-democracy, meritocracy-myth, nuclear-renaissance-smr, open-borders, organic-food-health,
police-reform, psychedelics-mental-health, remote-work-permanence, reparations-slavery,
return-to-office-productivity. 106 evidence items moved 0→verified URL.
Notable corrections beyond URL backfill (factual errors caught): psychedelics FDA vote was
**2-9 against efficacy** (file said "9-2 against approval" — inverted); inflation Bernanke-Blanchard
**side flipped** (NBER WP 31417 found supply shocks, not labor tightness, drove the 2021 surge — was
coded "for" demand-driven); reparations Fed wealth-gap figures corrected ($171K/$17.1K/10:1 → 2022 SCF
~$285K/$45K/~6.3:1); RTO-productivity fabricated claims stripped (Envoy "2.3x with 10yr leases" and a
phantom "12 companies 33-50% top-quartile" replaced with the real SSRN Brain-Drain paper); police-reform
US-vs-Australia gap corrected (~4x, not "30-60x"), Rialto body-cam result caveated with null DC RCT;
mandatory-voting "OECD Democracy Index" (doesn't exist) → EIU index, two journals mis-cited fixed;
meritocracy legacy-admissions "45% boost/160 SAT pts" unverifiable → real Chetty 2023 (top-1% ~5x);
remote-work Google/Meta "5-day mandate" false (were 3-day hybrid); media-bias Reuters "trust down from
44%" false (stable 40%). Many weights de-inflated; one RTO item left URL-less + low-weight (no source found).

## Iteration 4 (2026-06-16) — coverage 83% → 91% ✅ WS1 TARGET MET
Hardened 12 maps (9 zero-coverage + 3 low): seed-oils-health, social-media-age-limits,
space-colonization-feasibility, space-exploration-value, standardized-testing-debate,
sugar-tax-effectiveness, surveillance-public-safety, us-national-debt-crisis,
veganism-environmental-impact, simulation-hypothesis, tiktok-brain-rot, ai-content-labeling.
~95 evidence items moved to verified URL; overall coverage now **91%** (1034/1136).
Notable fabricated/misattributed cites caught: tiktok-brain-rot "Hancock et al. 2023, 72 studies"
meta-analysis (does not exist) → real Marker/Gnambs/Appel 2018 (r=−0.07, not −0.15/−0.20), plus a
phantom "Montag 2022 striatal-gambling fMRI" → Su et al. 2021; ai-content-labeling deepfake-detection
mis-attributed "UW 2023" → Nightingale & Farid PNAS 2022, three unverifiable support-survey/enforcement
stats stripped; space-exploration NASA "$7-14 per $1" ROI exposed as promotional urban-legend and
heavily de-weighted, "$1.8T space economy" re-attributed Morgan-Stanley→WEF/McKinsey; us-national-debt
Reinhart-Rogoff growth-cliff caveated with Herndon-Ash-Pollin (2.2% not −0.1%), Summers/Rachel phantom
Brookings title corrected; seed-oils "Israeli Paradox" source actually argues the opposite of the file's
framing; sugar-tax 5 journal mis-citations fixed (BMJ-2016→HealthAffairs-2017 etc.); simulation-hypothesis
"Auger shows no anisotropy" was false (Auger found an astrophysical dipole) → Beane et al. lattice bound.

KNOWN FOLLOW-UP (for WS2/cleanup pass): several agents flagged that some pillar NARRATIVE prose fields
(`proponent_rebuttal`, `skeptic_premise`, `short_summary`) still contain old fabricated/mis-cited
references that were out of their evidence-only edit scope — notably tiktok-brain-rot's rebuttal still
cites the fabricated "Hancock et al. 2023" and a "Baert et al. 2020", and cancel-culture's prose still
carries the "Pew 62%" stat that was re-attributed to Cato in the evidence. WS2 should sweep narrative prose.

## Iteration 5 (2026-06-16) — coverage 91% → 98% ✅ WS1 COMPLETE
Hardened the 13 highest-traffic low-coverage maps: gun-control-effectiveness, wealth-tax,
moon-landing, factory-farming-ban, universal-healthcare, iran-war-justification,
lab-grown-meat-adoption, lab-diamonds-ethics, minneapolis-shooting, meaning-without-religion,
obesity-personal-responsibility, rent-control-effectiveness, privacy-vs-convenience.
~77 evidence items moved to verified URL; overall coverage now **98%** (1111/1136). The remaining
~25 URL-less items are genuinely-unsourceable normative/theoretical/argument claims, intentionally
left honest + low-weight (no fabrication). WS1 (citation integrity) target exceeded.
Notable fabricated/misattributed cites caught: lab-diamonds "1,750 acres/million carats" was a
garbled metric (real figure is ~1,750 *tonnes earth moved per carat*) → removed; obesity food-desert
"25-50% higher even controlling for income" fabricated → real Ghosh-Dastidar AJPM finds distance NOT
significant once prices controlled (a false-balance fix, directness 7→4); gun-control Australia "42%
gun-homicide drop" not in the JAMA source → corrected to mass-shooting/total-death figures with the
authors' own no-causation caveat; rent-control IGM survey was INVERTED (file said "81% agree rent
control reduces quantity" — actual: ~82% disagreed it improves affordability), Cambridge study
mis-dated/mis-cited (Autor-Palmer-Pathak JPE 2014, not "2023"); universal-healthcare CMS NHE updated
($4.3T→$4.9T) + VA wait-time and pharma-R&D figures de-inflated; lab-grown-meat $6.20/lb exposed as a
techno-economic *projection* by a Believer-Meats founder (independence 6→3); privacy FBI "going dark"
device count flagged as FBI-admitted overcount. Many weights de-inflated; ~25 items honestly URL-less.

## Iteration 6 (2026-06-16) — WS2 pass 1: narrative-prose citation-integrity sweep
Swept the pillar NARRATIVE prose (proponent_rebuttal/skeptic_premise/short_summary/crux/references[])
of 12 maps that had evidence corrected in iters 1-5, fixing fabricated/stale cites stranded in prose
that the evidence-only agents couldn't reach, and steelmanning weak pillars. Files: tiktok-brain-rot,
cancel-culture, universal-healthcare, police-reform, veganism-environmental-impact, ev-environmental-impact,
immigration-wage-impact, ai-risk, obesity-personal-responsibility, rent-control-effectiveness,
gun-control-effectiveness, seed-oils-health.
HEADLINE FIX: tiktok-brain-rot's proponent_rebuttal no longer asserts the FABRICATED "Hancock et al. 2023,
72 studies" meta-analysis as real (→ real Marker/Gnambs/Appel 2018, r≈−0.07); phantom "Montag 2022 striatal
gambling" and mischaracterized "Baert 2020 natural experiment" purged from prose + references[].
Other prose fixes: cancel-culture "Pew shows 62%" → Cato/YouGov 2020 everywhere; universal-healthcare
"$4.3T/17.3%" → "$4.9T/17.6%" + Mercatus M4A framing corrected ($57.6T vs $59.4T national) + "11 nations"→10;
police-reform CAHOOTS "150/day"→~66/day and STAR "2,500+/2,700"→748 handled; veganism "73%/75% water/biodiv"
→ 54% water use / 66% biodiversity (Scarborough 2023); ev-impact phantom MIT grid cost & "191 MPG" purged
from prose; immigration "36% of patents" → ~23% inventors / 35% more likely to hold a patent; ai-risk stale
"Metaculus AGI 2040" → Grace 2024 (50% HLMI 2047) and alignment-faking/Apollo scheming now reflected;
obesity fabricated food-desert "25-50%" and "$15,000/yr GLP-1" purged from prose; rent-control Cambridge
"2023"→Autor-Palmer-Pathak JPE 2014 and fabricated "15.4pp displacement" → verifiable Diamond ~20% mobility;
gun-control Australia "42%" replaced + DGU NRC 500k-3M range now in prose; seed-oils references[0] Farvid
"AJCN"→Circulation 2014, wrong "2017 Cochrane 27%/RR0.73"→Hooper 2020 (17%/RR0.83), Israeli-Paradox reframed.
All edits web-verified, no fabricated cites; both sides steelmanned. tsc clean, 206 tests pass.

## Iteration 7 (2026-06-16) — WS2 pass 2: prose sweep, 10 more maps
Swept pillar narrative prose of 10 more heavily-corrected maps: climate-change, minimum-wage-effects,
drug-decriminalization, death-penalty-deterrence, free-will, nuclear-energy-safety,
ai-superintelligence-timeline, us-national-debt-crisis, meritocracy-myth, lab-diamonds-ethics.
Notable prose fixes: minimum-wage SEATTLE backwards-framing corrected (prose had said "minimal
employment effects" — now reflects the UW hours/earnings-loss finding, with Berkeley/Reich counter);
death-penalty prose misstated PNAS "executes innocents at 4%" → corrected to the 4.1% false-CONVICTION
rate among death-sentenced (Gross 2014), NRC "uninformative" deterrence quote restored, victim-race
disparity (not defendant-race "3x") fixed; drug-decriminalization "deaths drop 80%" causal claim walked
back to the decrim+treatment package, "$40B/$80B" enforcement reconciled to DPA $51B; free-will Vohs
failed-replication venue corrected (Many Labs 5, AMPPS 2020) + Libet framed with Schurger reinterpretation;
nuclear "lowest death rate including renewables" → "on par with wind/solar" (solar 0.02<nuclear 0.03),
"meltdowns physically impossible" softened; ai-superintelligence muddled compute-doubling figure split
into hardware (~40%/yr) vs algorithmic (~3x/yr) with Grace 2024 (50% HLMI 2047) + Villalobos data-wall;
us-debt "$36T"→"$37T", CBO "166%/2054"→"156%/2055", Reinhart-Rogoff cliff→Herndon-Ash-Pollin 2.2%,
Blanchard r<g steelman added; meritocracy removed a "Kunda" mis-attribution (→Jost-Banaji), Abramitzky
2021 mobility steelman; lab-diamonds garbled "1,750 acres/million carats" purged from prose (→~tonnes/carat),
Catoca re-dated 2021, plus TWO dead reference URLs repaired (Bain 404, retired Trucost domain → S&P host).
climate-change prose given IPCC AR6 attribution bounds (1.1°C anthropogenic, natural ±0.1°C). All
web-verified, no fabricated cites; both sides steelmanned. Coverage held 98%. tsc clean, 206 tests pass.

## Iteration 8 (2026-06-16) — WS4: durability infrastructure
Locked in the WS1/WS2 gains and exposed them to LLMs/crawlers:
(a) **Coverage-ratchet test** added to `data/topics.test.ts` — computes overall evidence
    citation coverage (same regex as scripts/citation-coverage.ts) and FAILS CI if it drops
    below a 95% ratchet (current 98%). Suite now **207 tests** (was 206). Future edits that
    strip a sourceUrl or add unsourced evidence can no longer silently regress the corpus.
(b) **/llms.txt** route gained a "Citation integrity" section with a DYNAMICALLY-computed
    coverage stat (renders "98% of evidence items (1111/1136) carry a direct primary-source
    URL") + notes on adversarial fact-checking, honest low-weighting of unsourced claims,
    and the 4-axis evidence weighting — so answer engines know the corpus is safe to cite.
(c) **Per-topic AEO citations** — topic pages now emit the deduped verified evidence URLs as
    schema.org `citation` (CreativeWork) on the Article JSON-LD, so crawlers/LLMs can reach
    the primary sources directly, not just the confidence score.
tsc clean, 207 tests pass. No data changed (no regen needed).

## Iteration 9 (2026-06-16) — WS3: launch-cluster map upgrades
Upgraded 5 AI-safety/consciousness cluster maps to bulletproof launch artifacts (verify every
cite + add web-sourced evidence/cruxes + steelman both sides). Corpus grew 1136→1151 evidence
items (15 new, all web-sourced); all 5 now at 100% coverage; overall held 98%.
- **consciousness-ai-systems** (CANONICAL launch map): 7→12 evidence. Added Chalmers 2023
  (arXiv:2303.07103), Seth 2025 biological-naturalism (BBS), Cogitate Consortium 2025 (Nature 642 —
  IIT & GNWT both failed preregistered predictions), Comsa & Shanahan 2025 LLM-self-report-unreliable,
  Sebo & Long precautionary moral-consideration argument; replaced a diffuse no-URL item with Suleyman
  2025. Now the strongest-sourced map in the corpus.
- **ai-replacing-doctors**: 12→15. Added automation-bias (Dratsch, Radiology 2023), the Epic Sepsis
  Model deployment-gap collapse (Wong, JAMA IM 2021), LLM-USMLE (Kung, PLOS Digital Health 2023);
  backfilled 3 missing URLs.
- **animal-consciousness-rights**: 8→11. Added fish-nociception (Sneddon 2019), LSE/Birch decapod
  sentience review, Birch "Edge of Sentience" 2024; fixed a dead Singer/Princeton 404.
- **ai-regulation**: 9→12. Added SB 1047 + Newsom veto (compute-threshold/regulatory-capture steelman),
  NIST AI RMF, Seoul frontier commitments; fixed 4 dead URLs (FDA Kelsey, China-AI-plan, AI Index, UNODA).
- **open-weight-ai-models**: 16→17. Added RAND blinded bioweapon-uplift RCT (no significant uplift —
  the marginal-risk anchor); corrected a misattributed safeguards demo + an unverifiable RAND number.
All web-verified, no fabricated cites, both sides steelmanned. tsc clean, 207 tests, coverage 98%.

## Iteration 10 (2026-06-16) — WS5: founder launch dossier — SPRINT COMPLETE ✅
Wrote `docs/plans/2026-06-16-launch-dossier.md` consolidating: (1) the bulletproof canonical launch
map (consciousness-ai-systems, 12/12 cited, with the Anthropic model-welfare hook, pillars/cruxes/
verdict); (2) the full sprint results (coverage 56%→98% across 114 maps, corpus now 1,151 evidence
items, the fabricated/inverted/mis-attributed citations caught, the 95% CI ratchet, /llms.txt
integrity section, AEO citation JSON-LD); (3) an index of the 4 founder-bound `docs/drafts/` assets
(LW essay, gatekeeper DMs, grant drafts, launch packaging) with status each; (4) a ready-vs-needs-
founder action list. Drafts remain founder-review-only — NOT auto-sent.

=== CITATION MOAT SPRINT COMPLETE: WS1 ✅ WS2 ✅ WS3 ✅ WS4 ✅ WS5 ✅ ===
Net: citation coverage 56%→98% (1,151 evidence items, ~1,130 primary-sourced); ~50 maps hardened;
dozens of fabricated/inverted/mis-attributed citations corrected; prose swept on the 22 most-corrected
maps; 5 launch-cluster maps upgraded to 100%; a CI ratchet locking coverage ≥95%; LLM/crawler exposure
via /llms.txt + per-topic schema.org citation; founder launch dossier delivered. 10 commits, each
web-verified + tsc-clean + 207 tests green + pushed. Remaining work is founder-bound distribution.

## Iteration 11 (2026-06-16) — WS2 pass 3: prose sweep, 10 more maps
Post-sprint completeness extension — swept prose of 10 hardened-but-unswept maps: big-tech-antitrust,
inflation-monetary-policy, return-to-office-productivity, global-housing-bubble, media-bias-democracy,
open-borders, space-exploration-value, sugar-tax-effectiveness, homeschooling-effectiveness,
foreign-aid-effectiveness. Notable prose fixes: big-tech DMA "structural separation" false claim
corrected (conduct regulation) + $17.5K WTA re-scoped to search-only; inflation Bernanke-Blanchard
framing fixed (supply shocks initiated, demand/labor sustained — prose had leaned demand-primary);
RTO fabricated Envoy lease-correlation removed + Gallup engagement flip corrected (remote ~36% ≈ hybrid
~35%); global-housing lock-in 85%→76%/57%, Airbnb "15-30%"→~1.9%, institutional share→Urban Institute;
media-bias stale "6 corps own 90%" removed + Gallup 31% correctly attributed; open-borders remittances
$656B→$626B + Clemens "double GDP"→"50-150% of world GDP"; space-exploration "$7-14 per $1" ROI myth
purged from prose (+ corrected a false debunk: memory foam IS a real NASA spinoff); sugar-tax removed a
prose claim that soda demand is "inelastic" (evidence shows the OPPOSITE, ~0.7-0.8 elasticity) + 2 journal
mis-cites; homeschooling Ray-2010 "persists across income" + Cardus voting direction fixed; foreign-aid
"zombie stats" removed (unsourced "10-30% lost to corruption", "30-40% reaches recipients"). Several
agents added verified topic-level references[] (all URLs already in-file evidence). All web-verified, no
fabricated cites, both sides steelmanned. Coverage held 98%. tsc clean, 207 tests pass.

## Iteration 12 (2026-06-16) — WS2 pass 4: prose sweep, 10 more maps
Swept prose of: billionaire-wealth, college-value-proposition, psychedelics-mental-health, moon-landing,
wealth-tax, factory-farming-ban, organic-food-health, social-media-age-limits, reparations-slavery,
gene-editing-embryos. Notable fixes: psychedelics prose FDA framing corrected (advisory committee voted
2-9 against efficacy / 1-10 against benefit-risk + CRL; not "rejected over trial design") and removed an
unsupported "4x the response rate of SSRIs" (the NEJM head-to-head did NOT find psilocybin superior);
college return-vs-premium conflation fixed (84% "premium" was the annualized return; real wage gap ~68%)
+ a misattributed age-premium curve re-cited to the NBER/Harvard paper; reparations Fed wealth-gap "$171K
vs $17K / 8x" → 2022 SCF (~$285K vs ~$45K, ~6x); factory-farming "80% of US antibiotics" → ~two-thirds US
(~70% global), dead-zone re-attributed to cropland-dominant Mississippi watershed; gene-editing fixed a
science error (Casgevy edits BCL11A, it does NOT "delete the sickle-cell gene"); billionaire-wealth top-
0.001% stat → Fed top-1%~30%/bottom-50%~2.5%, lobbying $3.7B→$4.4B (2024); social-media-age-limits Surgeon
General framing (can-have-risk, causation not proven) + Haidt "meta-analysis"→trade book + a circumvention-
rates URL repointed to its supporting Ofcom source; organic-food pesticide "60% in one week"→verified
~49-95% range; moon-landing transit dose →0.16-1.14 rad + LRO URL fixed; wealth-tax verified clean.
All web-verified, no fabricated cites, both sides steelmanned. Coverage held 98%. tsc clean, 207 tests.
Swept so far: 42 maps (passes 1-4) + 5 WS3 cluster. Remaining un-swept hardened: ~16.

## Iteration 13 (2026-06-16) — WS2 pass 5: prose sweep, 11 more maps (after spend-limit recovery)
Swept prose of: china-taiwan-invasion, gig-economy-regulation, remote-work-permanence,
surveillance-public-safety, standardized-testing-debate, mandatory-voting, nuclear-renaissance-smr,
iran-war-justification, lab-grown-meat-adoption, privacy-vs-convenience, electoral-college-reform.
Notable fixes: china-taiwan inflated "$3.6T annual trade"→~$6T goods / ~$3T at-risk flows + TSMC
"not operable" attributed to Mark Liu + 2 dead URLs repaired (Brookings 404, CBS Burns 404→RFA);
gig-economy McKinsey "70M"→~58M + Prop22 "59%"→58.6% (Castellanos upheld) + Bolt "worker not employee";
remote-work Nature-2023 patent vol corrected (623 not 615) + Gallup engagement scoped US/Canada;
surveillance unverifiable "EFF scant evidence"→Piza/Welsh/Farrington meta-analysis + a phantom
"96%/80% accuracy" stat→NIST 2019; standardized-testing income-score "r=0.42/$20K→20pts" + "$2.6B
test-prep" + "100-150pt" coaching all removed (→Opportunity Insights 13x, Briggs/NACAC tens-of-points);
mandatory-voting Fowler "appeals to center" misreading fixed (→Labor/pension shift) + Selb-Lachat
"less consistent" framing; nuclear-SMR South Korea SMART (never built)→HTR-PM + Gallup "60%+"→55%;
iran inspector "kicked out 2023"→de-designated Sept-2023/cameras-2022 + Houthi "15%"→~12% + Hezbollah
"150k rockets"→130-150k estimate + IAEA reference re-dated to GOV/2025/24; lab-grown $6.20/lb framed as
projection-not-achieved + market figures hedged; privacy Brave 100M MAU re-dated (Oct 2025) + "160+
countries"→137/194; electoral-college NPVIC 209/17→222/18 (Virginia Apr-2026) + Pew Republican 46% added.
All web-verified, no fabricated cites, both sides steelmanned. Coverage held 98%. tsc clean, 207 tests.
Swept so far: 53 maps + 5 WS3 cluster. Remaining un-swept hardened: 5 (simulation-hypothesis,
space-colonization-feasibility, ai-content-labeling, minneapolis-shooting, meaning-without-religion).

## Iteration 14 (2026-06-16) — WS2 pass 6 (FINAL): last 5 maps — PROSE SWEEP COMPLETE
Swept the final 5: simulation-hypothesis, space-colonization-feasibility, ai-content-labeling,
minneapolis-shooting, meaning-without-religion. Notable: simulation-hypothesis Bostrom "almost
certainly simulated"→trilemma/disjunction + false "Auger shows no lattice" framing fixed (the
observed dipole is extragalactic, not a lattice signature) + OpenWorm chemotaxis = future goal;
space-colonization Starship 100-150t/2026-27-Mars framed as SpaceX projections not demonstrated +
MOXIE rate + radiation attributed to Zeitlin/RAD + removed an unverifiable "Heliyon 2024 blueprint";
ai-content-labeling C2PA mislabeled as a pixel watermark→cryptographic provenance + honest watermark-
robustness framing; minneapolis-shooting (sensitive recent event) prose no longer asserts the disputed
DHS "handgun" account as fact, quote attributions corrected (Miller vs Noem), impeachment co-sponsors
attributed (House Democrats, 100→150+), meta_claim neutralized to the contested question; meaning-
without-religion Zagonari overstatement fixed (it found NEITHER ethics beneficial on both happiness
AND health — not "both beneficial") + Euthyphro "fatal to divine-command theory" softened to SEP's
live-debate framing. All web-verified, no fabricated cites, both sides steelmanned. tsc clean, 207 tests.

=== WS2 PROSE SWEEP COMPLETE ===
Every topic that received an evidence correction in iters 1-5 has now had its NARRATIVE prose
(proponent_rebuttal/skeptic_premise/short_summary/crux/references) checked against the corrected
evidence and brought into line. Total prose-swept: 58 maps across passes 1-6 + 5 WS3 cluster maps.
The remaining ~50 topics never had evidence corrections, so their prose was already consistent.

=== CITATION MOAT SPRINT — FINAL STATE (2026-06-16) ===
- **Coverage:** 56% → 98% (1,130/1,151 evidence items primary-sourced). Remaining ~2% are
  genuinely-unsourceable normative/theoretical claims, honestly labeled + low-weighted.
- **Corpus:** 1,151 evidence items across 114 maps; 5 launch-cluster maps upgraded to 100%.
- **Integrity:** dozens of fabricated/inverted/mis-attributed citations corrected in BOTH evidence
  and prose; numerous dead URLs repaired; both sides steelmanned throughout.
- **Durability:** 95% CI coverage-ratchet test (suite = 207), /llms.txt citation-integrity section
  (live stat), per-topic schema.org `citation` JSON-LD for AEO.
- **Launch:** consciousness-ai-systems canonical map bulletproof (12/12); founder dossier at
  docs/plans/2026-06-16-launch-dossier.md.
- **Process:** ~14 iterations, each web-verified + tsc-clean + 207 tests green + pushed per batch.
Remaining work is founder-bound distribution (docs/drafts/ — never auto-sent). SPRINT CLOSED.

## Red-Team Pass — batch 1 (2026-06-16), 10 highest-risk un-reviewed topics
Adversarial review (factual errors, false balance, side-coding, normative-as-empirical,
confidence-score calibration) of: masculinity-crisis, nuclear-proliferation-new-arms-race,
student-debt-forgiveness, universal-basic-income, psychedelic-therapy-hype,
ai-deepfakes-truth-collapse, children-smartphone-age, affirmative-action-meritocracy,
transgender-athletes-sports, gender-affirming-care-minors.
MAJOR STRUCTURAL FINDINGS:
- **affirmative-action-meritocracy: 12 of 14 evidence items were SIDE-CODED BACKWARDS** —
  the confidence score of 22 was an artifact of inverted coding; corrected → recomputes to 78.
- **psychedelic-therapy-hype: 4 side-coding inversions** + a conflated NEJM trial (the null
  escitalopram primary endpoint was presented as a win) + MAPP2 effect size 0.91→0.7 + n=24→233;
  de-inflated sponsor-aligned evidence. Score 75→45 (now honest).
- **transgender-athletes-sports: stale IOC framing** (missed the March-2026 IOC female-category
  policy reversal) + missing 2025 NCAA ban + an internal contradiction (a "2023 BJSM review"
  claim contradicting Harper 2021) + speed advantage 9%→12%. Score 44→64.
- **student-debt-forgiveness: missing Biden v. Nebraska (2023 SCOTUS)** — added as high-weight
  against evidence; Roosevelt→Levy misattribution fixed; a crux verification_status corrected. 78→69.
- **universal-basic-income: missing the OpenResearch/Altman 2024 RCT** (largest US UBI study,
  showed real labor reduction) — added; Yang/VAT fiscal contradiction + TANF "57%" error fixed. 76→69.
- **gender-affirming-care-minors: a misattributed regret citation** (URL pointed to an unrelated
  hormone-therapy review) corrected to Bustos 2021; garbled "9,000 papers / 9 met standards" York
  stat fixed (actual: 50 included, 1 high-quality); age-25 brain claim de-inflated.
- **masculinity-crisis (85) and nuclear-proliferation (86): structural false balance** — both have
  ~6-7 "for" evidence items vs 1 "against"; the high scores reflect one-sided side-coding, not
  consensus. FLAGGED FOR FOLLOW-UP: needs genuine web-sourced opposing evidence added (not fabricated).
Plus dozens of factual corrections (suicide rates, warhead counts, treaty status, Australia ban now
enforced Dec 2025, Canon C2PA date, etc.). All web-verified, no fabricated cites. tsc clean, 207 tests.
