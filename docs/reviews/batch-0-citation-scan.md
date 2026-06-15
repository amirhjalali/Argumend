# Batch 0 — Citation Integrity & Balance Scan (Tier 6)

Scanned 18 topics for citation integrity (mis-citation, malformed/dead URLs, over-confident claims, internal date contradictions, low-authority sources carrying high reliability weights, identifiable factual errors) and pillar balance. Training cutoff is Jan 2026; post-cutoff 2026 figures are flagged "NEEDS LIVE CHECK" rather than counted as errors. Findings report only material issues; clean topics are marked as such.

### affirmative-action-meritocracy
- [LOW] `sat-income-correlation` cites a precise "388 points higher" gap and the r-values (0.42 income, 0.35 GPA) to "College Board data and the UC system" — the UC STTF report is real, but the specific correlation coefficients are stated with more precision than that public report supports; numbers should be re-verified against the linked PDF.
- [LOW] `prop-209-aftermath` evidence dates Bleemer's QJE study as "2022" while the in-text `proponent_rebuttal` calls it "A 2020 study by Bleemer." The QJE article (vol 137, issue 1) is 2022; the rebuttal date is wrong and internally inconsistent with the evidence item.
- [LOW] `diversity-innovation-research` correctly flags McKinsey's correlation-not-causation problem and weights independence/replicability low (6/6) — appropriate; no fix needed but worth noting it's the weakest item and is honestly tagged.

### ai-replacing-doctors
- [MED] `radiology-outperformance` (McKinney et al., Nature 2020) — the description states AI "reducing false positives by 5.7% and false negatives by 9.4%"; those are the US-cohort reduction figures from the paper, but the study's real-world generalizability was later sharply criticized (Nature 2020 reproducibility commentary). Source weight (reliability 9) is fine but the headline "AI Matches Radiologists" overstates a single retrospective study.
- [LOW] Evidence items `radiology-outperformance`, `dermatology-ai`, `distribution-shift-failures`, `rare-disease-limitations` lack `sourceUrl` fields (unlike most other topics). Not an error, but citation traceability is weaker here.
- [LOW] `fda-approvals-accelerating` "over 950 AI/ML-enabled medical devices by 2024" is plausible and on-trend; consistent with FDA's ~2023 list (~690-880). Reasonable.

### artificial-reproduction-ethics
- [MED] Meta-claim and `chop-biobag-lamb-study` describe CHOP Biobag sustaining lambs "equivalent to 23-week human gestation for up to 28 days / 4 weeks." The 2017 Nature Communications paper (Partridge et al.) is correctly cited and the URL is right. Fine. But `q1` says "succeeded to 4 weeks" while pillar text says "up to four weeks" — consistent.
- [LOW] `premature-birth-mortality-who` mixes a "13.4 million in 2020" preterm-birth figure with "900,000 children died in 2019" — two different reference years stated back-to-back. WHO's commonly cited figures are ~13.4M (2020) and ~900K deaths (2019/2020); not contradictory but the mixed years should be harmonized.
- [LOW] Pillar 2 (bodily-autonomy-abortion) has only 2 evidence items (one per side) vs. 4 elsewhere — thin but balanced.

### china-taiwan-invasion
- [LOW] `pla-navy-expansion` "surpassed 370 battle force ships by 2024" attributed to ONI — ONI/DoD figures put PLAN at ~370 by 2025 (projected) and ~340 in 2022-23. The 2024 number is borderline; reasonable but worth a live check.
- [LOW] `2027-centenary-directive` is appropriately weighted (independence 5, replicability 3) and the reasoning correctly notes "'capability by' does not mean 'will invade by'" — honest handling of intelligence sourcing.
- No material citation errors; speculative topic is appropriately tagged `highly_speculative`.

### cryptocurrency-value
- [HIGH] This topic is structurally deficient vs. every other file in the batch: **both pillars contain ZERO evidence items** — only `skeptic_premise`/`proponent_rebuttal`/`crux`. No `evidence` arrays, no sources, no `references` block, no `questions`. The "Digital Scarcity" and "Volatility Problem" pillars make empirical claims (e.g., "Bitcoin varies 50-80%", "outperformed all other assets on any 4-year holding period") with no citations at all. This is the weakest topic in the batch for citation integrity.
- [MED] Only 2 pillars and both are essentially pro/con framings of the same volatility/scarcity axis; missing obvious pillars (regulatory risk, energy/environmental cost, actual store-of-value track record vs. gold). One-sided coverage gap.

### electoral-college-reform
- [MED] `popular-vote-losses` states Bush "lost the popular vote to Al Gore by 543,895 votes" — the widely cited certified figure is ~543,895 (Gore margin). Correct. Trump-Clinton "2,868,686" is also the standard figure. Accurate. Weight sourceReliability 10/directness 9 is justified.
- [LOW] `npvic-progress` "As of February 2025... 209 electoral votes" — the NPVIC has stood at 209 EV (17 states + DC) since ~2024; "as of February 2025" is fine and pre-cutoff. Accurate.
- [LOW] Both pillars lean "for" in evidence count (Pillar 1: 2 for / 1 against; Pillar 2: 1 for / 1 against). The federalism/against side is comparatively thin — `federalism-protection` is the only structural counter and is weighted low (7s). Could use a stronger small-state/anti-NPVIC empirical item.

### four-day-work-week
- [MED] `uk-4dwg-trial` description says "56 of 61 companies (92%) chose to continue" while the `proponent_rebuttal` in the same pillar says "56 of 61 companies (92%)" — consistent. But the rebuttal earlier cites "a 2024 meta-analysis of 30 trials across 15 countries found 91% of firms rated the trial successful" with no corresponding evidence item or source — an uncited claim embedded in argument text.
- [LOW] `france-35-hour-week` gives very specific 2023 productivity figures ("$74.60 US vs $72.30... $61.40 UK" — note the labels appear swapped in narration: it reads "French workers produced $74.60... compared to $72.30 (US)"). The ordering is fine but these precise per-hour dollar values should be re-checked against the linked OECD series; OECD GDP-per-hour is usually indexed/PPP, not raw dollars.
- [LOW] `cipd-reversion-rate` "31%" reverted — the linked CIPD flexible-working URL is generic; the specific 31%/18-month statistic should be confirmed against the actual CIPD report.

### gig-economy-regulation
- [MED] `uk-tribunal-rulings` states "In January 2025, all 700 Addison Lee drivers were similarly classified" and "November 2024... 100,000+ Bolt drivers." These are very recent, specific litigation outcomes; the Bolt tribunal ruling is real (2024) but the Addison Lee Jan-2025 detail is near/just-past cutoff and should be flagged NEEDS LIVE CHECK for the exact numbers/date.
- [LOW] `gig-worker-net-earnings` honestly notes the 2018 MIT (Zoepf) "$8.55/hour" figure was "later revised upward to $10-12/hour" after methodology criticism — good transparency; weight (reliability 7) is appropriate.
- [LOW] Several evidence items lack `sourceUrl`. Traceability weaker than the science topics.

### homeschooling-effectiveness
- [LOW] `hs-nheri-test-data` and `hs-ray-2010` correctly carry LOW reliability/independence (5/3) because NHERI is an advocacy org and Ray is its founder — exactly the right handling; the upward-bias caveat is explicit.
- [LOW] `category: "economics"` is mis-categorized — this is an education-policy topic, not economics. (Same mislabel appears on a few topics.) Minor metadata issue, not citation.
- No material citation-integrity problems; the topic is unusually honest about its weak sources.

### iran-war-justification
- [MED] `iaea-enrichment-data` states "408 kg of 60% enriched uranium" with sourceReliability 10. IAEA quarterly figures for 60% HEU moved over 2023-2024 (roughly ~120-180kg of 60% reported in various 2023-24 reports; 408kg figures generally refer to total enriched stockpile across levels, not 60% specifically). The "408 kg of 60%" framing risks conflating total-enriched with 60%-enriched — should be verified against the specific IAEA report and likely corrected.
- [LOW] `nie-no-weapons-program` (2007 NIE) is correctly weighted lower on independence (5) with reasoning that the same community erred on Iraq — balanced.
- [LOW] Multiple high-stakes evidence items lack `sourceUrl` (inspector-expulsion, proxy-attacks-escalation, hezbollah-arsenal-growth, etc.), reducing traceability on a sensitive topic.

### longevity-science
- [MED] `mayo-mouse-senolytic` title says "(2016)" and body says "landmark 2016 study published in Nature... Baker et al." — correct (Baker et al., Nature 2016, INK-ATTAC). But the pillar `proponent_rebuttal` attributes the original proof-of-concept to "2011... van Deursen's lab" — the 2011 paper (Baker, Nature 2011) and 2016 paper are different studies; the rebuttal's "25%" and the evidence's "25-35%" should be reconciled (2011 was healthspan in progeroid mice; 2016 was lifespan in normal mice).
- [LOW] `dq-human-pilot` sourceUrl points to thelancet.com EBioMedicine path — EBioMedicine is Lancet-family, URL plausible. Fine.
- [LOW] No `references`-level issues; strong sourcing overall. Senolytic/reprogramming cancer-risk counter-items present and well-weighted — good balance.

### microplastics-health-crisis
- [LOW] `nejm-arterial-plaque-study` (Marfella et al., NEJM 2024, "4.53-fold", n=257, 34 months) — accurately cited including the correct NEJMoa2309822 DOI. Skeptic premise honestly frames it as observational. Strong.
- [LOW] `un-plastics-treaty` says "As of early 2026, the treaty negotiations remain ongoing" — this is a near-cutoff/post-cutoff status claim; flag NEEDS LIVE CHECK (treaty status may have changed after the late-2024 Busan INC-5).
- [LOW] `regulatory-safety-thresholds` correctly cuts FDA independence to 6 citing "documented industry influence on the CLARITY-BPA study design" — fair; the EFSA 20,000-fold TDI reduction is accurately described. Well-balanced pillar.

### nuclear-renaissance-smr
- [MED] `vogtle-delays-precedent` title says "7 Years Late and $19B Over Budget" but the body says "$35 billion, more than doubling the $14 billion estimate" (i.e., ~$21B over) and "14 years (2009-2023)." The title's "$19B over" and "7 Years late" don't match the body's ~$21B-over / 14-yr-total framing. Internal inconsistency between title and description; figures should be reconciled (original ~2009 estimate and final cost are themselves contested).
- [LOW] `nuscale-cancellation` "costs rose 76% to $9.3 billion... $89/MWh" and `smr-economics` skeptic premise "$5.3 billion to $9.3 billion" — the $5.3B→$9.3B is ~75%, consistent with "76%." Accurate.
- [LOW] `nuscale-design-certification` says "January 2023, the NRC issued the first-ever Standard Design Approval" — NuScale's design was certified via rulemaking (effective 2023); calling it "Standard Design Approval" vs. "design certification" is loosely worded but substantively correct.

### police-reform
- [LOW] `pr-international-comparison` says US police kill "30-60x higher per capita" than UK/Germany/Japan/Australia, while the pillar `short_summary` uses "US ~1,100/yr vs Germany ~10/yr" — the per-capita multiplier and the raw counts are roughly internally consistent (Germany ~1/4 US population). Reasonable, though "30-60x" is a wide self-sourced range from advocacy outlets (Guardian/Amnesty) carried at reliability 8.
- [LOW] `pr-mapping-police-violence` "98% of police killings 2013-2023 did not result in officers being charged" and "1,096 in 2023" are Mapping Police Violence figures — an advocacy-adjacent database carried at reliability 8/independence 7; reasonable given WaPo corroboration, but the "98%" stat is MPV-specific.
- [LOW] `pr-defunding-crime-spikes` correctly weighted low on directness/replicability (5/5) with explicit confounding caveat — honest.

### reparations-slavery
- [LOW] Internal wealth-gap figure inconsistency: this topic's `short_summary` says "8x" and `fed-racial-wealth-gap` says "$171,000 vs $17,100 — a 10:1 ratio," while the affirmative-action topic cites "$171,000 vs $17,600." The white median ($171K) is consistent across files; the Black median wobbles ($17,100 here vs $17,600 there) and the ratio is described as both "8x" (summary) and "10:1" (evidence) within this one file. Harmonize to the 2022 SCF figures.
- [LOW] `german-holocaust-reparations` "$80 billion since 1952" — plausible cumulative figure; replicability correctly cut to 5 for context-transfer.
- No fabricated sources; the implementation-cost-range and eligibility counter-items provide genuine balance.

### social-media-elections
- [MED] `stanford-nyu-no-impact` is titled "Stanford/NYU Study" and sourced "Eady et al., Nature Communications (2023)" — the actual Eady et al. paper is "Exposure to the Russian Internet Research Agency foreign influence campaign..." (Nature Communications 2023). Correct journal/DOI path. But the body says "matching Twitter data to survey responses from over 1,500 individuals" — the study sample was ~1,496 respondents; fine. Accurate.
- [MED] `meta-2020-rct-no-effect` says "randomly assigned 23,000 Facebook users" — the Guess et al. Science 2023 chronological-feed study assigned ~23,000; correct. Good. The independence-6 weighting (Meta-funded) is appropriately flagged.
- [LOW] `trump-2020-ad-volume` "5.9 million unique Facebook ads" vs "Biden ~218,000" — these are widely reported NYT/Ad-Library figures; reasonable. Pillar honestly notes "Trump lost despite this," undercutting its own 'for' side — good faith.

### sugar-tax-effectiveness
- [MED] `consumption-impact` crux is marked `verification_status: "verified"` yet the meta-claim's core health outcome remains contested — and `no-obesity-reduction-evidence` (against) explicitly states no jurisdiction has shown attributable obesity reduction. The "verified" tag on the consumption crux is defensible (purchasing declines ARE well-replicated), but readers may conflate it with the health-outcome claim. Worth confirming the verified tag is scoped to consumption only.
- [LOW] `uk-childhood-obesity-signal` "statistically significant reduction in obesity among year-6 girls" cites Scarborough et al. BMJ 2024 (correct study, correct URL) but the original finding was specifically among girls in the most-deprived areas and did not hold for boys — the evidence item slightly overstates generality; reasoning does note "confounders exist."
- [LOW] `philadelphia-cross-border` (Seiler et al., QJE 2021) "38% in-city decline, ~22% net" — accurately reflects the study; good.

### universal-basic-income
- [LOW] `yang-freedom-dividend-cost` says "$2.8 trillion" while the pillar `short_summary` and `skeptic_premise` say "$3.1 trillion" for $1,000/mo to all adults. The gap is real: $2.8T uses Yang's 18+ adult count with his offsets; $3.1T is the gross-er figure. Both appear, which could read as inconsistent — clarify that $2.8T is net-of-design and $3.1T is gross.
- [LOW] `stockton-seed-employment-increase` "full-time employment rose 28%→40%" (West et al. 2021) is correctly cited; honest caveats on small n=125 and temporary-program bias. The SIME/DIME counter-item and the debunked-divorce correction (Cain & Wissoker 1990) show strong, balanced sourcing.
- [LOW] `roosevelt-institute-gdp-growth` 12.56% figure correctly carries low independence (6) noting progressive think-tank and Levy-model assumptions — appropriately hedged.

## Top priority fixes across this batch
1. **[HIGH] cryptocurrency-value** — both pillars have zero evidence items, no sources, no references; all empirical claims (volatility ranges, "outperformed all assets") are uncited. Add evidence arrays + sources to match the rest of the corpus; this is the single biggest integrity gap.
2. **[MED] iran-war-justification / `iaea-enrichment-data`** — "408 kg of 60% enriched uranium" likely conflates total-enriched-stockpile with 60%-specific stockpile; carried at sourceReliability 10. Verify against the specific IAEA report and correct the enrichment-level attribution.
3. **[MED] nuclear-renaissance-smr / `vogtle-delays-precedent`** — title ("7 yrs late, $19B over") contradicts body ("$35B, doubling $14B est, 14 yrs"); reconcile the cost/schedule figures.
4. **[MED] longevity-science / senolytics pillar** — rebuttal attributes proof-of-concept to "2011 van Deursen" while evidence cites "Baker et al. Nature 2016"; these are distinct studies (2011 healthspan/progeroid vs 2016 lifespan/normal). Reconcile dates and the 25% vs 25-35% figures.
5. **[MED] cryptocurrency-value (balance)** — only 2 same-axis pillars; missing regulatory-risk and energy/environmental-cost pillars makes coverage one-sided.
6. **[MED] gig-economy-regulation / `uk-tribunal-rulings`** — "Jan 2025 all 700 Addison Lee drivers" is near/post-cutoff; flag NEEDS LIVE CHECK and verify the exact count/date.
7. **[MED] four-day-work-week** — uncited "2024 meta-analysis of 30 trials / 91% success" claim embedded in rebuttal text with no evidence item or source; either add a sourced evidence item or qualify it.
8. **[MED] sugar-tax-effectiveness** — `consumption-impact` crux tagged "verified" sits next to a meta-claim about health outcomes that is explicitly unproven; ensure the verified scope can't be read as endorsing the obesity-reduction claim.
9. **[MED] ai-replacing-doctors / `radiology-outperformance`** — single 2020 retrospective (McKinney/Nature) headlined as "AI Matches Radiologists" at reliability 9; later reproducibility critiques warrant softening the headline or noting the deployment caveat already in `reasoning`.
10. **[MED] social-media-elections** — strong topic overall; lowest-confidence item is `youtube-radicalization-pipeline` (volunteer RegretsReporter methodology, reliability 7) — acceptable but the highest-priority spot-check if any.

### Summary
- File written: `/Users/amirjalali/argumend/docs/reviews/batch-0-citation-scan.md`
- Topics with [HIGH] issues: **1** (cryptocurrency-value)
- Issue counts by severity: **[HIGH] 1 · [MED] ~12 · [LOW] ~30** (per-topic bullets above; many LOW items are traceability/metadata, not factual errors)
