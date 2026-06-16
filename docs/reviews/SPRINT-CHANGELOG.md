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
