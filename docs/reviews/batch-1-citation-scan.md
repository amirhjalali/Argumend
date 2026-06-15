# Batch 1 — Citation Integrity & Balance Scan (Tier 6)

Scanned 18 topics from `data/topics/`: ai-content-labeling, ai-risk, big-tech-antitrust, climate-change, death-penalty-deterrence, epstein-files, free-will, global-housing-bubble, housing-affordability-crisis, lab-diamonds-ethics, mandatory-voting, minimum-wage-effects, nuclear-weapons-abolition, privacy-vs-convenience, return-to-office-productivity, social-media-mental-health, surveillance-public-safety, universal-healthcare.

Method: read every evidence item, pillar premise/rebuttal, and crux. Reported only material issues — citation integrity (mis-citation, malformed/likely-dead URLs, claim-vs-source overreach, internal date contradictions, authority/weight mismatches, factual errors against training knowledge through Jan 2026) and balance (one-sidedness, false-balancing settled science, missing strong counter-items).

Cutoff caveat: training knowledge ends Jan 2026. Figures dated 2026 or later (esp. in epstein-files and privacy-vs-convenience) are flagged "NEEDS LIVE CHECK" and are NOT counted as errors. Several internal verification studies (e.g. India's DPDP Act enforcement status, exact 2025-2026 Epstein release figures) cannot be confirmed against my knowledge and are flagged rather than asserted wrong.

---

### ai-content-labeling
- [MED] `eu-ai-act-provisions` weight `sourceReliability: 9` cites `https://artificialintelligenceact.eu`, a third-party explainer site, NOT an official European Parliament/EU source, yet `source` reads "European Parliament." The EU AI Act's transparency/deepfake labeling obligation (Art. 50) carries penalties up to the lower tier (€15M / 3% turnover), not the headline 7%/€35M tier — the "up to 3% of global revenue" claim is plausibly correct for this article but should be verified; source attribution is misleading.
- [LOW] `deepfake-detection-rates` and `watermark-removal-ease` cite bare institution+year ("University of Washington (2023)", "University of Maryland (2023)") with no `sourceUrl` and no author/paper title — low traceability for `sourceReliability: 8` items.
- [LOW] `platform-label-experiments` states labeled content gets "10-15% less sharing" sourced only to "Meta Transparency Center" (self-reported, independence already scored 5) — the specific 10-15% figure is not independently verifiable as stated.

### ai-risk
- [MED] `instrumental-convergence` crux has `verification_status: "verified"` and the pillar claims power-seeking is "Proven Mathematically." Turner et al. (2021) proved a result about *optimal policies* under specific MDP/symmetry assumptions; it is contested whether this generalizes to trained LLM agents. Labeling the broader instrumental-convergence thesis "verified" overstates what the math shows.
- [LOW] `deceptive-alignment` crux `verification_status: "verified"` rests on the Anthropic sleeper-agents paper, which demonstrated *persistence of inserted backdoors through safety training*, not that models spontaneously develop deceptive mesa-optimization. The cited result is real but does not "verify" deceptive alignment as an emergent phenomenon.
- [LOW] `expert-forecasts` "Metaculus median AGI by 2040" — Metaculus AGI-timeline medians have shifted substantially and earlier in 2023-2025; treat as a moving figure (NEEDS LIVE CHECK for current value), though fine as a historical claim.

### big-tech-antitrust
- [LOW] `consumer-surplus-integration` claims Google free services generate "$15,000-$20,000 in annual consumer surplus per user." The Brynjolfsson WTP studies produced figures in this rough range for *search specifically* (~$17k median) — bundling "Search, Maps, Gmail, YouTube" under one number is a loose paraphrase; weight already discounts independence/replicability, so minor.
- [LOW] `doj-google-monopoly` is accurate (Aug 2024 ruling, $26.3B in 2021, ~89-90% share). No material issue; well-cited.

### climate-change
- No material issues found. Balance is correctly asymmetric: the topic is flagged `status: "settled"`, "against" items carry deliberately low weights (e.g. `natural-co2-claim` at sourceReliability 2), and rebuttals decisively close each skeptic premise. This does NOT false-balance the anthropogenic consensus — the contrarian items are present only as steelmanned-then-refuted foils, which is the correct treatment. δ¹³C, O₂ decline, stratospheric cooling, and energy-imbalance figures are all consistent with the established record.

### death-penalty-deterrence
- [MED] Asymmetric authority is appropriate here (NAS 2012 correctly weighted as gold-standard against; Dezhbakhsh correctly down-weighted as contested). However the `meta_claim` is framed as the *pro*-deterrence claim while the strongest, highest-weighted evidence runs against it — verify this is intended framing, not an imbalance, since a reader scanning weights sees the "for" side systematically weaker (which is defensible given the actual evidence base, but worth a deliberate note).
- [LOW] `dp-exonerations` mixes "190+ exonerations since 1973" with the Gross et al. 2014 PNAS 4.1% figure — both correct, but the 4.1% is an estimate of *false-conviction rate among those sentenced to death*, not "likely innocent on death row currently"; the description ("4.1% of death row inmates are likely innocent") slightly misstates the estimand.

### epstein-files
- [HIGH] Multiple load-bearing facts are dated 2025-2026 and fall at/after the training cutoff: the Epstein Files Transparency Act "passed 427-1 on Nov 18 2025," "Public Law 119-38," "3.5 million pages / 2,000 videos / 180,000 images," the "Dec 19 2025 deadline," "Jan 2026 CNN poll 6% satisfied," and "newly released 2026 surveillance logs." I cannot confirm these against my knowledge — they are NEEDS LIVE CHECK. The "2026 surveillance logs show an unidentified figure near Epstein's tier" claim (q2) is especially high-risk and should be verified against a primary source before publication.
- [MED] `victim-compensation` `sourceUrl` `https://abcnews.com/US/...` uses domain `abcnews.com` — the correct domain is `abcnews.go.com`. Likely a malformed/dead link.
- [LOW] `references` lists `https://www.epsteininvestigation.org/...` ("Epstein Document Archive") and `https://www.justice.gov/epstein` — verify both resolve; the former is a low-authority/unknown-provenance domain presented alongside DOJ/Congress sources.
- [LOW] Verified/established facts (Maxwell conviction Dec 29 2021 / 20 yrs; Acosta NPA; OPR "poor judgment" 2020; Brunel death Feb 2022; JPMorgan $290M / Deutsche $75M) are accurate. Balance within pillars is good (each has steelmanned skeptic + for/against mix).

### free-will
- [LOW] `soon-fmri` "up to 10 seconds before... predicts the choice with ~60% accuracy" — accurate to Soon et al. 2008 (≈55-60%, just above chance). Description honestly flags the modest accuracy. Fine.
- [LOW] `compatibilism` "Most professional philosophers accept compatibilism" cites PhilPapers Survey — correct (~59% in 2009/2020 surveys). No issue.
- No material issues found beyond the above minor notes.

### global-housing-bubble
- [MED] `meta_claim` asserts a correction "is imminent," but the strongest evidence assembled (Canada renewal wave, BIS debt sensitivity, transaction-volume collapse) supports *elevated vulnerability*, not imminence — and the skeptic side correctly notes markets "already absorbed the rate shock." The "imminent" framing is stronger than the evidence base supports; consider softening or ensure the contested status carries it.
- [LOW] `oecd-price-income-divergence` and several items cite "as of 2023" — fine, but price-to-income peaks in some markets (Canada, NZ, Sweden) had begun correcting by 2023-2024; "at or near all-time highs... exceeding pre-2008 peaks" is broadly true but verify per-country currency.
- [LOW] OECD reference URLs (`oecd.org/housing/data/price/`, `imf.org/external/research/housing/`) use older path structures that may now redirect — worth a link check.

### housing-affordability-crisis
- [MED] `tokyo-zoning-model` claims Tokyo "built an average of 142,000 new housing units per year — more than all of England combined." The Tokyo>England-combined comparison is a widely circulated stat but conflates the Tokyo *prefecture/metro* with national England housing completions across different years; the "142,000/yr 2000-2020" figure and the England comparison should be verified — it's a frequently-overstated talking point.
- [LOW] `auckland-upzoning-results` "rents fell 22-35% relative to comparable cities" — Greenaway-McGrevy & Phillips found large *relative* effects but the headline range and the specific journal attribution ("Journal of Urban Economics") should be verified; some of this work appeared as working papers / in *Economic Record*-adjacent outlets. Minor attribution risk.
- [LOW] `oregon-rent-cap-permits` good design note; the "Portland permits +12% 2019-2022" is confounded by the COVID/low-rate boom (the reasoning already concedes this). Fine.

### lab-diamonds-ethics
- [MED] `kimberley-process-progress` cites "Kimberley Process; World Diamond Council; De Beers Group" at `sourceReliability: 7` for the "15% → under 1%" reduction — this is industry/scheme self-reporting (independence correctly scored 6), and the "15%" upper bound is a high-end pre-KP estimate; the reasoning flags this, so acceptable, but the headline 15% figure is contested (commonly cited as ~4%).
- [LOW] `lab-grown-coal-power` Trucost "≈510 kg CO₂ per polished carat" vs Debswana "160 kg" — these specific figures trace to an industry-funded (Diamond Producers Association) Trucost study; the description already attributes DPA, and the proponent rebuttal counters with the renewable-powered counterexample, so balance is preserved. Verify the exact kg figures, which vary widely across LCAs.
- [LOW] Pillar 1 skeptic/proponent framing is balanced and the strong counter-items (child-labor DOL list, Global Witness withdrawal vs. KP progress, Surat labor) are all present. No imbalance.

### mandatory-voting
- [LOW] `mv-aus-turnout` "compulsory voting in 1924" is correct (federal). "91-95% turnout" accurate. Fine.
- [LOW] `mv-policy-moderation` (Fowler, Journal of Politics 2013) — Fowler's compulsory-voting work is real but the specific journal/year should be verified; the finding (higher turnout → more left/social spending in Australia) is correctly hedged as observational.
- No material issues found.

### minimum-wage-effects
- [MED] `employment-elasticity-measurement` crux has `verification_status: "verified"` but its own description says "historical data is limited" at $15+ levels and the methodology is framed as a proposed natural experiment — these are inconsistent; the elasticity at high minimums is genuinely contested, so "verified" overstates it.
- [LOW] `australia-high-minimum-wage` "unemployment rate (3.7%)... comparable to US (3.7%)" — both rates are point-in-time 2023 snapshots that have since moved (Australia rose toward ~4%+); NEEDS LIVE CHECK if presented as current, fine as a 2023 illustration.
- [LOW] `seattle-minimum-wage-study` headline "Mixed but Mostly Positive" leans pro; the UW Seattle team's 2017 NBER paper actually found notable *hours* reductions for low-experience workers — the item is `side: "for"` but the underlying study is genuinely mixed. Framing slightly favorable; the description does concede hours decreased. Acceptable but note.

### nuclear-weapons-abolition
- [LOW] `india-pakistan-nuclear` lists "four wars before nuclear weapons: 1947, 1965, 1971, and the Kargil conflict in 1999" — but Kargil (1999) occurred *after* both 1998 tests; the text awkwardly counts Kargil as both "before secure second-strike" and post-test. The "four wars before, zero since" framing is muddied by placing Kargil in the pre-nuclear list. Minor internal tension (the reasoning partly addresses it).
- [LOW] `nuclear-winter-nature-food` Xia et al. 2022 figures (2 billion at risk in regional exchange; >5 billion in full exchange) are accurately cited with DOI; the reasoning appropriately flags the soot-lofting criticism. Good balance.
- No material issues found beyond the Kargil framing.

### privacy-vs-convenience
- [MED] `federal-privacy-law-failure` states "As of 2026... 19 states have enacted their own privacy laws" — the 2026 dating and exact state count are at/after cutoff (NEEDS LIVE CHECK). The count of US comprehensive state privacy laws was ~13-20 through 2024-2025 depending on counting; verify.
- [LOW] `global-privacy-expansion` "over 160 countries" (UNCTAD) and India DPDP Act "covers 1.4 billion people" — DPDP Act passed Aug 2023 but its rules/enforcement were still pending into 2025; "covers" overstates operative protection. Reasoning concedes enforcement varies. Minor overreach.
- [LOW] `device-fingerprinting-accuracy` "99.1% of users" — the EFF Panopticlick/INRIA lineage supports high uniqueness, but 99.1% as a single replicated figure blends distinct studies (Panopticlick's ~83-90% unique vs. later work); the specific "99.1%" should be sourced precisely. Carpenter, ATT-$10B, Section 702 reauth (Apr 2024) all accurate.

### return-to-office-productivity
- [LOW] `bloom-hybrid-productivity` attributes the Trip.com hybrid RCT to "Nature (2024)" — correct (Bloom et al., *Nature* 2024, 1,600 employees, ~33% lower quit rates). Accurate.
- [LOW] `microsoft-network-siloing` "cross-group connections declining 25%" / Nature Human Behaviour 2022 — accurate to the Microsoft 61k-employee study; independence correctly down-weighted (6). Good.
- [LOW] `cre-lease-correlation` (Envoy, "2.3x more likely") is a vendor analysis with independence correctly scored 5 and causation explicitly disclaimed. Acceptable. No material issues.

### social-media-mental-health
- [HIGH] Both pillars (`temporal-correlation`, `mechanism-identification`) have NO `evidence` array at all — they contain only premise/rebuttal/crux. Every other topic carries 3-4 evidence items per pillar. This is a structural gap: the topic makes strong empirical claims (Facebook internal research, dose-response, cross-country timing) with zero citeable evidence items backing them, so none of the load-bearing claims are sourced or weighted. Highest-priority content gap in the batch.
- [MED] `temporal-correlation` crux `verification_status: "verified"` while the skeptic premise correctly notes "correlation is not causation" and the dose-response relationship is in fact contested (Haidt vs. Odgers/Orben debate). "Verified" is unsupported, especially with no evidence array.
- [LOW] Rebuttal claim "Internal Facebook research (leaked) showed Instagram specifically made body image issues worse for teenage girls" is real (2021 WSJ Facebook Files / "13.5% of teen girls said Instagram worsened thoughts of suicide; 17% worsened eating issues") but uncited here.

### surveillance-public-safety
- [HIGH] `facial-recognition-crime-study` (`side: "for"`, *Cities*/Elsevier 2024, "268 US cities 1997-2020... reductions in felony violence and homicide... no racial disparity") is doing heavy lifting for the pro-surveillance case at `directness: 8`. Facial recognition was not meaningfully deployed by police until the mid-2010s, so a panel "from 1997" attributing crime reductions to FR adoption is methodologically suspect, and the "no over-policing / no racial disparity" finding sharply contradicts the well-replicated NIST/Gender Shades bias literature cited in the very next item. This single observational study should be down-weighted and the contradiction flagged; as written it risks laundering a contested result into a settled-looking fact.
- [LOW] `crime-reduction-effectiveness` pillar leans against on net (EFF "scant evidence" + false-arrest cases are strongly weighted; the one "for" study is the questionable one above) — the strongest *legitimate* pro-surveillance evidence (e.g. UK CCTV investigative-value studies, targeted ALPR clearance data) is asserted in the rebuttal but not present as an evidence item. Consider adding a defensible "for" item so the pillar isn't carried by the weak 1997-2020 FR study.
- [LOW] `china-surveillance-resistance` (Journal of Chinese Political Science 2025) is at/just-before cutoff and tangential (directness correctly scored 5). Fine.

### universal-healthcare
- [MED] `lancet-single-payer-savings` "median estimate $450B/year... 68,000 fewer deaths" attributed to "Galvani et al. (2020)" — Galvani et al. (Lancet 2020) modeled *Medicare for All* and found ~$450B savings and ~68,000 fewer deaths, but that is a single study, not the "2020 Lancet meta-analysis of 22 single-payer cost analyses" (that 22-study review is Cai et al., PLOS Medicine 2020, which found 19/22 predicted savings). The item conflates two different papers under one citation. Citation-integrity error.
- [LOW] `cost-efficiency` skeptic cites Mercatus "$32 trillion over 10 years" and the rebuttal correctly notes that figure showed savings vs. baseline — accurate and well-balanced. `cms-health-expenditure` ($4.3T, 17.6% GDP, $13,493 pc, 2023) accurate.
- [LOW] `commonwealth-fund-ranking` "2024 Mirror, Mirror, last among 11" accurate; reasoning appropriately flags Commonwealth Fund's advocacy lean. Good balance with the cancer-survival "against" item.

---

## Top priority fixes across this batch

1. **[HIGH] social-media-mental-health — both pillars have empty `evidence` arrays.** Strong empirical claims (dose-response, cross-country timing, Facebook internal research) are completely unsourced/unweighted. Add 3-4 evidence items per pillar (e.g. Twenge/Haidt timing data, Orben/Odgers null-effect work, the 2021 Facebook Files, Braghieri et al. Facebook-rollout NBER study).
2. **[HIGH] surveillance-public-safety — `facial-recognition-crime-study` overreaches.** A 1997-2020 panel crediting FR for homicide drops with "no racial disparity" contradicts the NIST/Gender Shades bias evidence in the same pillar; down-weight it and add a flag, or replace with a more defensible pro item.
3. **[HIGH] epstein-files — verify all 2025-2026 facts before publication.** Transparency Act vote/PL number, 3.5M-page release counts, Jan 2026 CNN poll (6%), and especially the "2026 surveillance logs / unidentified figure" claim are post-cutoff and unconfirmable; treat as NEEDS LIVE CHECK.
4. **[HIGH/MED] universal-healthcare — `lancet-single-payer-savings` conflates two papers.** Galvani et al. (Lancet 2020, single MFA model) is cited as if it were the Cai et al. (PLOS Medicine 2020) 22-study review. Split into correct citations.
5. **[MED] minimum-wage-effects — crux `verification_status: "verified"` contradicts its own "historical data is limited" description.** High-minimum elasticity is contested; change to "theoretical" or "contested."
6. **[MED] ai-risk — `instrumental-convergence` crux marked "verified" / pillar titled "Proven Mathematically."** Turner et al. proves a narrow optimal-policy result; overstates generalization to trained agents. Soften to reflect scope.
7. **[MED] ai-content-labeling — `eu-ai-act-provisions` source mismatch.** Attributed to "European Parliament" but URL is a third-party explainer (`artificialintelligenceact.eu`) at `sourceReliability: 9`; fix attribution and verify the "3% of global revenue" penalty tier.
8. **[MED] epstein-files — `victim-compensation` sourceUrl uses wrong ABC domain** (`abcnews.com` vs `abcnews.go.com`); likely dead link. Audit all epstein-files URLs (also the low-authority `epsteininvestigation.org`).
9. **[MED] global-housing-bubble — `meta_claim` says correction "imminent"** but assembled evidence supports vulnerability, not imminence, and the skeptic side notes markets already absorbed the rate shock. Soften the claim or ensure status carries it.
10. **[MED] housing-affordability-crisis — `tokyo-zoning-model` "142,000 units/yr, more than all of England combined"** is a frequently-overstated talking point conflating metro/national scopes and years; verify the figure and comparison before relying on it at `directness: 8`.
