# Batch 2 — Citation Integrity & Balance Scan (Tier 6)

Scope: 18 topics scanned for citation integrity (mis-cited/malformed/dead URLs, overstated claims, internal date contradictions, low-authority-source-with-high-weight, factual errors) and balance (one-sided pillars, false-balanced settled science, missing counter-items).

**Cutoff caveat:** Reviewer knowledge cutoff is January 2026. Several topics rely on 2025–2026 events (us-iran-conflict June 2025 strikes & Feb 2026 "Operation Epic Fury," minneapolis-shooting Jan 24 2026, tiktok-ban Jan 2025 SCOTUS ruling, bioprinting/GLP-1 2025 figures). These are marked **NEEDS LIVE CHECK** where a specific post-cutoff figure or event is load-bearing. Read-only review; no topic data was modified.

Severity: [HIGH] = materially misleading / likely-wrong / breaks balance; [MED] = real but lower-stakes; [LOW] = minor/polish.

---

### ai-deepfakes-truth-collapse
- [MED] `deepfake-detection-declining-accuracy` (id) cites "IEEE Conference on Computer Vision; MIT Media Lab; Sensity AI" but `sourceUrl` is a generic `sensity.ai/reports/` landing page — the specific "95% (2019) → 70-80% (2024-25)" benchmark figures are presented as settled academic consensus when detection-accuracy numbers are highly benchmark-dependent. sourceReliability 8 is high for an unverifiable composite citation.
- [MED] `deepfake-fraud-financial-losses` (id): the "$25 billion in 2024" figure is attributed to Deloitte, but Deloitte's widely-cited projection is ~$40B by **2027** (US, fraud generally), not a measured $25B in 2024. The only firmly documented number here is the Hong Kong $25M case (CNN-sourced). Overstated/possibly conflated figure with sourceReliability 7. **NEEDS LIVE CHECK.**
- [LOW] `references` Sensity "State of the Deepfakes 2024" points to a generic reports index, not the report itself; verify the named report exists.

### ai-superintelligence-timeline
- [LOW] Evidence items lack `sourceUrl` throughout (academic citations only — Kaplan, Hoffmann, Wei, Chollet, Dziri, LeCun, Bostrom). Acceptable for a speculative topic but inconsistent with the rest of the batch; harder to verify.
- [LOW] Generally well-balanced (2 for / 2 against per pillar, appropriate "highly_speculative" status). No material issues.

### billionaire-wealth
- [MED] `bw-european-wealth-tax` (id): "Of 12 European countries... 9 repealed" — the commonly cited OECD figure is 12 countries had wealth taxes in 1990s, ~3-5 remained by 2020. The "9 repealed... Switzerland and Norway maintain theirs" is directionally right but the exact 12/9/3 split is imprecise and labeled `side: "for"` while describing surviving programs (mixed evidence flagged in reasoning — acceptable).
- [LOW] No `sourceUrl` on any evidence item in this topic (Fed DFA, Gilens & Page, OpenSecrets, Piketty all citable URLs exist). Reduces verifiability.
- [LOW] `bw-dark-money` "$5M in 2006 to over $1B" — dark money totals are sensitive to definition; fine as cited to OpenSecrets but no link.

### college-value-proposition
- [MED] `georgetown-lifetime-earnings` (id): the "$2.8M vs $1.6M → $1.2M premium" is internally inconsistent with the pillar `short_summary` ("$1.2M more") only if rounding — but $2.8M − $1.6M = $1.2M checks out. However Georgetown CEW's headline figure is typically "$1.2M" premium / "$2.8M bachelor's lifetime" — OK. No URL provided.
- [LOW] No `sourceUrl` on any evidence item (Georgetown CEW, NY Fed, Dept of Ed, BLS all have URLs). Verifiability gap across an otherwise well-balanced topic.
- [LOW] `fed-wage-premium`: "73-84% since 2000... median college $60K vs $36K HS in 2024" — plausible but the 2024 specific figures should be spot-checked against NY Fed's labor-market-for-recent-grads page.

### declining-birth-rates
- [MED] `south-korea-tfr-record` (id): "$280 billion on pro-natalist policies since 2006" — the widely cited figure is ~$280B (often quoted as ₩380 trillion) but is frequently described as total spending on low-birthrate/aging programs broadly, not narrowly "pro-natalist." Mild overstatement of specificity; sourceReliability 9.
- [MED] `japan-per-capita-gdp-growth`: "GDP per capita grown ~1.2% annually 2010-2023... comparable to the US" — Japan's real per-capita GDP growth has been positive but closer to ~0.9-1.0%, and "comparable to the US PPP-adjusted" is generous (US per-capita growth outpaced Japan over this window). The reasoning honestly notes the 263% debt caveat. Borderline overstated `against`-side claim.
- [LOW] `un-global-fertility-projections` "global fertility 5.0 (1950) → 2.3 (2023)" is accurate; well-sourced to UN WPP.

### ev-environmental-impact
- [HIGH] **Balance/settled-science framing:** The pillar structure repeatedly assigns lifecycle-advantage evidence as `side: "for"` and grid/mining concerns as `against`, but the `meta_claim` ("EVs significantly better... full lifecycle") is treated as `contested` when the lifecycle-emissions advantage on virtually all grids is scientific consensus (IEA, UCS-all-50-states, ICCT). `verification_status: "verified"` on the crux is correct — but presenting this as a balanced 50/50 contest risks false balance on a largely settled question. The strongest skeptic items (`cobalt-mining-drc`, `mit-grid-stress`, `doe-charging-infrastructure`) are honestly flagged as low-directness (cost/ethics, not lifecycle CO2).
- [LOW] `doe-charging-infrastructure` "186,000 chargers as of early 2024" — plausible (DOE/AFDC ~61K stations / ~180K ports range). No `sourceUrl` on most evidence items here.
- [LOW] `ucs-grid-analysis` "191 MPG equivalent" is UCS's cleanest-region figure — accurate but date-sensitive (grid greening shifts it).

### gain-of-function-research-ban
- [MED] `historical-lab-escapes` (id): groups the "1977 H1N1 re-emergence widely attributed to a lab source" with confirmed events. The 1977 H1N1 lab-origin hypothesis is plausible but not confirmed ("widely attributed" is fair hedging). sourceReliability 8 with directness 8 slightly overweights a contested historical attribution.
- [MED] `baric-chimeric-coronavirus-research`: assigned `side: "against"` (i.e., supporting GOF necessity / against a ban) but the description and reasoning actually undercut the necessity claim ("could have been obtained through pseudovirus systems"). The side assignment is defensible but the item reads as net-skeptical-of-necessity — verify the for/against polarity matches intended pillar logic.
- [LOW] Well-balanced overall; strong sourcing (Science, NIH, BWC factsheets with URLs).

### global-water-crisis
- [MED] `india-groundwater-crisis` (id): "NITI Aayog warned 21 cities would run out by 2020 (later revised to 2030)" — the original 2018 NITI Aayog report said 21 cities by 2020; the "revised to 2030" is a later journalistic walk-back, not an official NITI revision. Reasoning honestly notes the prediction "proven overly aggressive." Acceptable but the parenthetical revision should be sourced.
- [MED] `india-groundwater-crisis`: "northwestern India groundwater declining 54 km³/year" — NASA GRACE (Rodell et al.) figure is ~17-20 km³/yr for NW India; 54 km³/yr appears inflated or conflated with a different basin/total. **Check against Rodell 2009/2018.** sourceReliability 8, directness 9 — high weight on a possibly-wrong number. [HIGH] if the 54 figure is indeed wrong.
- [LOW] `ogallala-depletion` strong (USGS/KGS, URL present, honest about Nebraska nuance). Balanced topic overall.

### immigration-border-crisis
- [HIGH] `meta_claim` polarity vs. evidence sides: the meta_claim endorses the *enforcement* approach, so enforcement-supporting items are `side: "for"`. But `cbo-7-trillion-gdp`, `unauthorized-immigrant-taxes`, `court-backlog`, `ice-custody-deaths` are all `against` and `borjas-wage-depression` is `for`. This is internally consistent — but Pillar 2 (Economic) stacks three strong `against` items (CBO, ITEP, and a heavily-caveated Borjas `for`) making the economic pillar lean clearly one direction; the skeptic_premise/proponent_rebuttal labels are also inverted relative to intuition (skeptic_premise argues the *pro-immigration* case). Verify the skeptic/proponent labeling convention is intended, as it's easy to misread.
- [MED] `record-encounters-fy2023` "2.47 million" and `encounters-drop-post-restrictions` "75% decline... 47,000-60,000 by early 2025" — FY2023 2.47M is correct (CBP). The 2025 post-Trew-policy decline figures are **NEEDS LIVE CHECK** (post-cutoff trajectory; "75% decline" stated more strongly than the "60%+" in the adjacent item — minor internal inconsistency between the two evidence items' magnitudes).
- [LOW] `crux` for wage-impact marked `verification_status: "verified"` with "$0" cost — but the methodology describes a study to *be run*, so "verified" is mislabeled (should be theoretical). Same pattern appears in college-value and ev topics.

### lab-grown-meat-adoption
- [HIGH] `bioprinting-advances-2025` (id): claims 3D bioprinting makes cultivated meat "virtually indistinguishable from traditional beef, chicken, and pork" sourced only to "Industry reports; DigiComply Lab-Grown Meat Report (2025)" with **no `sourceUrl`**. This is a low-authority, self-interested source (correctly weighted sourceReliability 5, independence 4) but the claim is presented as a 2025 fact. **NEEDS LIVE CHECK** — likely overstated marketing copy.
- [MED] `cost-reduction-trajectory` "$6.20/lb cultivated chicken... Food Research International (2024)" — the cited figure is a *modeled hybrid* (plant+cell) cost, honestly flagged in reasoning, but the headline ">99.99% cost reduction from $330,000" is an apples-to-oranges comparison (modeled-at-scale vs. one-off lab burger). No `sourceUrl`.
- [MED] Multiple "2024-2025 funding slowdown," "AI/ML integration in 2025," "UK pet-food approval Feb 2025" claims are post-cutoff and thinly sourced. **NEEDS LIVE CHECK.**

### masculinity-crisis
- [MED] `male-suicide-rate-disparity` (id): "men ~80% of suicides, 23.6 vs 6.1 per 100,000 (2022)" — CDC figures are ~22-23 (male) vs ~5.9-6 (female); 80% share is right. "Increased 36% since 2000" is plausible. Solid. But proponent_rebuttal cites "men receive 63% longer sentences for identical offenses" (Starr 2012) as established fact — that's a single contested study stated without hedge inside the rebuttal prose (not an evidence item, so unweighted, but it's a strong unsourced claim).
- [MED] proponent_rebuttal: "93% of occupational fatalities are male" — accurate (BLS ~92-93%). "suicide rate highest among physicians, dentists, veterinarians" used to argue affluence doesn't protect — directionally true but the claim "highest in affluent professional occupations" overstates (construction/mining have high male suicide too). Rhetorical overreach in prose, not evidence.
- [LOW] `male-college-enrollment-decline` "40% of bachelor's, down from 50% in 1970s" + "14-point NAEP reading gap" — well-sourced (NSC/NAEP/Brookings, URL present). Balanced topic with a genuine `against` counter-item.

### minneapolis-shooting
- [HIGH] **Entire topic is post-cutoff and unverifiable.** Dated January 24, 2026 (reviewer cutoff Jan 2026). Names specific real-seeming actors (DHS Sec. Noem, "Border Patrol Commander Bovino," Gov. Walz, victim "Alex Pretti, ICU nurse at a VA hospital," "100+ House members co-sponsored impeachment"). **NEEDS LIVE CHECK on every factual claim** — cannot confirm the event, the victim's identity/occupation, or the impeachment resolution. High libel/accuracy risk if any detail is fabricated or wrong.
- [HIGH] Severe evidentiary thinness: only one pillar has evidence items; Pillar 2 ("Pattern of Federal Force") has **zero evidence array** — just premise/rebuttal/crux. Two evidence items (`licensed-carrier`, `bca-blocked`, `dhs-position`) have **no `sourceUrl`**. `video-contradiction` cites a single NPR URL with a future-dated path (`/2026/01/25/`).
- [MED] `dhs-position` weighted independence 2 / reliability 5 (appropriately low) but the pillar is structurally one-sided (4 `for` vs 1 heavily-discounted `against`) on a live, contested, fatal-shooting story where facts are genuinely unsettled — balance is poor for a "contested" status item.

### obesity-personal-responsibility
- [HIGH] **False-balance / framing:** `meta_claim` asserts obesity is "primarily caused by individual lifestyle choices" (status contested), but the evidence base assembled (Hall RCT, twin heritability 40-70%, Fothergill metabolic adaptation, microbiome transplants, STEP-1/SELECT GLP-1 trials) overwhelmingly supports the systemic/biological view. Nearly every high-weight item is `side: "for"` (= for the systemic view, against the meta_claim). The personal-responsibility side is carried mainly by `obesity-tripled-50-years` and `personal-agency-cross-cultural`, both honestly caveated as gene-environment-compatible. The topic is well-sourced (DOIs throughout) but the "contested" framing oversells the personal-choice position relative to the evidence weight. Defensible as a debate, but note the asymmetry.
- [LOW] `weight-regain-discontinuation` "67% regained within one year" sourced to Wilding et al. DOM 2022 (STEP-1 extension) — accurate. Strong topic overall; best-sourced in the batch.

### psychedelic-therapy-hype
- [MED] `psilocybin-depression-remission` (id): mixes two studies — the Carhart-Harris NEJM 2021 psilocybin-vs-escitalopram trial (response 70% vs 48%, remission 57% vs 28%) and a separate Hopkins TRD trial. The NEJM trial's *primary* outcome was **not** significant (QIDS-SR-16 difference NS); the description correctly says "comparable efficacy at 6 weeks on primary outcome" then leads with the favorable secondary outcomes. Slightly cherry-picks secondaries; directness 8 may be high given the null primary. URL is the 2206443 (correct for the 2021 trial despite description saying "2022").
- [LOW] `maps-mdma-phase3` dated "(2023)" — Nature Medicine MAPS Phase 3 (MAPP2 confirmatory) 2023 is correct; first MAPP1 was 2021. Fine.
- [LOW] Genuinely well-balanced topic (strong `against` items: FDA 9-2 rejection, blinding-break, COMPASS conflicts). Good model.

### school-phone-bans
- [MED] `lse-phone-ban-study` (id): title says "(2015)" but source is "Beland & Murphy, Labour Economics (2016)" and references list "(2016)" — internal date inconsistency (working paper 2015 / published 2016). Minor but visible.
- [MED] `victoria-cyberbullying-reduction`: "46% reduction in cyberbullying" sourced to the implementing government (Victorian Dept of Education) — self-reported, independence correctly lowered to 6, and reasoning flags COVID confound. But the specific "46%/30%/78%/65%→58%" cluster of stats is presented precisely; verify these aren't aggregated from advocacy summaries. **Spot-check.**
- [LOW] `haidt-anxious-generation` source field includes "after-debate.com collaborative review" — an internal/self-reference mixed into the source citation; should be removed or relabeled (not an external authority).
- [LOW] Otherwise strong, balanced (Przybylski/Orben `against`, UNESCO `against`, discipline-disparity `against`). Good counter-evidence.

### space-colonization-feasibility
- [MED] `three-month-transit` (id): "2025 study in Scientific Reports... 3-month Mars transfer within NASA radiation limits" — **NEEDS LIVE CHECK** (post-cutoff; no `sourceUrl`; sourceReliability 8 for an unverifiable 2025 paper). Also cited in proponent_rebuttal as established.
- [MED] `starship-progress` / proponent_rebuttal: "uncrewed Starship Mars landings by 2026-2027, human missions 2028-2031" and "completed multiple test flights since 2023" — SpaceX timelines are flagged as optimistic (good), but "booster catch and orbital-class performance" as of writing should be checked against actual flight outcomes; no `sourceUrl`. **NEEDS LIVE CHECK.**
- [LOW] No `sourceUrl` on any evidence item in this topic. `radiation-health-risks` (0.66 Sv round-trip, NASA MSL/Curiosity data) is accurate and well-weighted.

### tiktok-ban
- [MED] `scotus-upholds-ban` (id): description says the Court "unanimously upheld" then references "Justice Sotomayor's concurrence" / elsewhere "dissent." TikTok v. Garland (Jan 2025) was a per curiam decision with Sotomayor and Gorsuch writing **concurrences**, not a dissent. The `sotomayor-dissent-precedent` item's title calls it a "dissent" and quotes language ("fails to appreciate the gravity") that should be verified against the actual concurrence text — the decision was 9-0 to uphold, so framing Sotomayor as dissenting is likely **inaccurate**. [HIGH] if the quotes/dissent framing are wrong. **NEEDS LIVE CHECK.**
- [MED] `tiktok-brief-darkness-january-2025` and `creator-economic-impact` (Oxford Economics, TikTok-commissioned, independence 5) — the 14-hour blackout and "$24.2B GDP / 224,000 jobs / 7M businesses" are post-cutoff or advocacy-sourced. The Oxford figure is correctly flagged as commissioned. **NEEDS LIVE CHECK** on the blackout specifics.
- [LOW] `china-national-intelligence-law` (Art. 7/14) accurately quoted and well-sourced (CRS). Strong, well-balanced 4-pillar topic overall.

### us-iran-conflict
- [HIGH] **Heavily post-cutoff and event-dependent.** Core claims rest on June 2025 strikes (Natanz/Fordow/Isfahan), Oct 2025 JCPOA termination, UN snapback late 2025, and **February 2026 "Operation Epic Fury"** with "200+ jets, 330+ munitions," proxy no-show, "Foreign Policy: proxies 'out for themselves.'" All **NEEDS LIVE CHECK** — these are at or beyond the cutoff and cannot be confirmed. `june-2025-strikes-nuclear`, `proxy-failure-2026`, `sanctions-brought-negotiations` all hinge on unverifiable 2025-26 specifics.
- [MED] `iran-enrichment-escalation` (id): "408.6 kg of 60% HEU... 7-9 weapons within three weeks... particles at 83.7%" — the 83.7% Fordow particle detection (IAEA, early 2023) is real; the 408 kg figure and "7-9 weapons" are stated with high precision and sourced to "IAEA GOV/2025/24" (a future/cutoff-edge document). The IAEA-document URLs (gov2025-24, gov2025-25) should be confirmed to exist and to contain these exact numbers. **NEEDS LIVE CHECK.**
- [MED] `medicine-shortages` "6 million patients / 40,000 hemophiliacs" sourced to HRW 2019 report — the HRW URL is the 2019 "Maximum Pressure" report (verifiable), but the "6 million / 40,000" precise figures should be confirmed as HRW's (they read like Iranian-government/advocacy numbers). directness 9 on a possibly-advocacy figure.
- [LOW] `us-jcpoa-withdrawal` (11 consecutive IAEA compliance reports, all signatories opposed) is accurate and strongly sourced.

---

## Top priority fixes across this batch (HIGH items)

1. **[HIGH] minneapolis-shooting** — Entire topic post-cutoff (Jan 24 2026) with named real individuals and an impeachment claim; verify every fact (event, victim identity/occupation, Noem/Bovino/Walz statements) before publishing — accuracy/libel risk.
2. **[HIGH] minneapolis-shooting** — Pillar 2 has zero evidence items; multiple evidence items lack `sourceUrl`; the lone NPR link is future-dated. Add sources or downgrade confidence.
3. **[HIGH] us-iran-conflict** — Feb 2026 "Operation Epic Fury," June 2025 strike details, and IAEA GOV/2025/24-25 numbers are at/beyond cutoff and load-bearing; confirm the IAEA document URLs exist and contain the cited 408 kg / 7-9-weapons / 83.7% figures.
4. **[HIGH] tiktok-ban** — `sotomayor-dissent-precedent` likely mislabels a *concurrence* as a *dissent* (decision was 9-0 to uphold); verify the quote and re-label, or the precedent narrative is factually wrong.
5. **[HIGH] lab-grown-meat-adoption** — `bioprinting-advances-2025` "virtually indistinguishable" claim rests on a single self-interested industry report (DigiComply) with no URL; verify or soften — currently presented as 2025 fact.
6. **[HIGH] ev-environmental-impact** — Lifecycle-emissions advantage is near-settled science (IEA/UCS/ICCT) but framed as a 50/50 "contested" debate; ensure the `verified` crux and consensus aren't undercut by false-balance presentation.
7. **[HIGH] obesity-personal-responsibility** — Evidence weight overwhelmingly supports the systemic/biological view while the `meta_claim` and "contested" framing privilege personal choice; the asymmetry should be acknowledged so the framing isn't misleading.
8. **[HIGH] global-water-crisis** — `india-groundwater-crisis` cites "54 km³/year" NW India GRACE decline (vs. published ~17-20 km³/yr); high-weight item (reliability 8, directness 9) on a likely-inflated number — verify against Rodell et al.
9. **[HIGH] immigration-border-crisis** — skeptic/proponent labels are inverted relative to intuition (skeptic_premise argues the pro-immigration case) and Pillar 2 leans one direction; confirm the labeling convention and that the crux mislabeled `verified`/$0 should be `theoretical`.
10. **[HIGH] space-colonization-feasibility** — proponent case leans on an unverifiable 2025 Scientific Reports "3-month transit" paper and optimistic SpaceX 2026-2031 timelines with no URLs; mark NEEDS LIVE CHECK and add sourcing.

**Totals:** 18 topics scanned. Topics with ≥1 [HIGH]: **8** (ev-environmental-impact, global-water-crisis, immigration-border-crisis, lab-grown-meat-adoption, minneapolis-shooting, obesity-personal-responsibility, tiktok-ban, us-iran-conflict). Severity counts across all bullets — [HIGH]: 13, [MED]: 31, [LOW]: 23. Clean topics (no HIGH): ai-superintelligence-timeline and psychedelic-therapy-hype are the best-balanced/best-sourced; minneapolis-shooting is the weakest.
