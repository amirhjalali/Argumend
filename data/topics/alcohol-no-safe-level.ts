import type { Topic } from "@/lib/schemas/topic";

export const alcoholNoSafeLevelData = {
  id: "alcohol-no-safe-level",
  title: "Alcohol's Safe Level",
  meta_claim:
    "There is no safe level of alcohol consumption for health.",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Alcohol is a Group 1 carcinogen — the same IARC tier as tobacco and asbestos — and there is no established threshold below which the cancer risk switches off: a single daily drink (~10 g) raises a woman's breast-cancer risk by about 7%, and the WHO attributes roughly 740,000 cancer cases a year (4.1% of all new cases) to alcohol. The honest nuance is that 'no safe level' is firmest for cancer specifically; the all-cause-mortality picture at light doses is genuinely contested.",
    confidence: 86,
    source:
      "WHO Europe / IARC, 'No level of alcohol consumption is safe' (2023) and IARC Monographs Vol. 100E; Collaborative Group on Hormonal Factors in Breast Cancer, British Journal of Cancer (2002, 7.1% per 10 g/day)",
    sourceUrl:
      "https://www.who.int/europe/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The carcinogen case is settled and not subtle: ethanol is an IARC Group 1 carcinogen, the breast-cancer dose-response is roughly linear all the way down to one drink (~7.1% relative-risk increase per 10 g/day), and the WHO finds no dose below which the carcinogenic effect 'switches on' — so for cancer specifically, the risk starts from the first drop.",
    "The honest counterpoint is that cancer is only one organ system: a 7% relative increase on a low baseline is a small absolute change, and bias-corrected meta-analysis (Zhao et al., 4.8 million people) found low intake under 25 g/day was not significantly linked to excess all-cause death, while the GBD 2020 update concluded older adults may even see a small net benefit.",
    "So the honest debate isn't whether alcohol can cause cancer at any dose (it can) but whether 'no safe level' holds across all-cause mortality — which turns on whether the apparent flat/protective low-dose curve is real biology or an artifact of sick ex-drinkers being misclassified as non-drinkers.",
  ],
  last_updated: "2026-06-16",
  tags: ["alcohol", "public-health", "cancer", "cardiovascular", "epidemiology"],
  pillars: [
    {
      id: "cancer-no-threshold",
      title: "Cancer Has No Threshold",
      short_summary:
        "Ethanol is a Group 1 carcinogen, and breast-cancer risk rises measurably from the very first grams per day — with no dose below which the effect 'switches off.'",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "If alcohol is a no-threshold carcinogen, then any positive intake raises lifetime risk of at least one of the seven alcohol-linked cancers (breast, bowel, mouth, throat, larynx, oesophagus, liver). The breast-cancer dose-response is roughly linear all the way down to one drink: a single daily drink (~10 g) raises a woman's relative breast-cancer risk by about 7%. Because cancer risk has no safe floor while any cardiovascular upside is small and contested, the honest summary is that the risk to the drinker starts from the first drop.",
      proponent_rebuttal:
        "A statistically detectable relative-risk increase is not the same as a meaningful absolute risk: a ~7% relative increase on a low baseline is a tiny absolute change for one drink, and 'no observed threshold' often just reflects insufficient statistical power to resolve a small floor, not proof that one is absent. Cancer is also only one organ system. Net health is what matters, and for some outcomes (ischaemic heart disease, stroke, diabetes) light intake is associated with lower risk, so a no-safe-level claim that fixes only on carcinogenesis cherry-picks the endpoint.",
      crux: {
        id: "carcinogen-threshold",
        title: "The Carcinogenic Threshold Test",
        description:
          "Whether there exists any daily dose of ethanol below which cancer risk does not rise above the lifetime-abstainer baseline. If the dose-response curve passes through the origin with positive slope, the meta-claim holds for cancer.",
        methodology:
          "Pool individual-participant data from large cohorts with validated lifetime-abstainer reference groups; fit flexible (spline) dose-response models for each alcohol-linked cancer; test whether the lower confidence bound of risk excludes the null at the lowest exposure bins (e.g. <10 g/day).",
        verification_status: "verified" as const,
        cost_to_verify: "$500K (pooled re-analysis of existing cohorts)",
        falsification: {
          supporter_flip:
            "If flexible spline dose-response models on pooled individual-participant data revealed a genuine threshold — a low-exposure band (say below 5-10 g/day) where the lower confidence bound for at least breast and bowel cancer no longer excludes the null — then 'no safe level for cancer' would soften to 'no safe level above a small but real floor.'",
          skeptic_flip:
            "A skeptic who calls the low-dose increase too small to matter should weigh that ethanol's metabolite acetaldehyde is a direct DNA-damaging Group 1 carcinogen with no known repair threshold, and that the measured breast-cancer slope stays positive and statistically significant down to one drink across 53 pooled studies — so 'just statistical noise at the floor' is not what the largest dataset shows.",
          common_ground:
            "Both sides agree alcohol unambiguously causes cancer at moderate-to-heavy intake and that the absolute risk added by a single daily drink is small even if the relative risk is real.",
          live_disagreement:
            "Whether the cancer dose-response truly passes through the origin with positive slope or merely looks that way because studies lack the statistical power to resolve a small floor — resolvable only by a pre-registered pooled spline re-analysis with validated lifetime-abstainer reference groups and former-drinker exclusion.",
        },
      },
      evidence: [
        {
          id: "iarc-group1-no-threshold",
          title: "IARC Group 1 Carcinogen, No Established Threshold",
          description:
            "The WHO/IARC classifies alcoholic beverages as a Group 1 carcinogen (the same tier as tobacco, asbestos, and ionizing radiation). WHO states that available evidence cannot identify a threshold at which the carcinogenic effects 'switch on,' and that roughly half of alcohol-attributable cancers in the WHO European Region arise from 'light' and 'moderate' drinking.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "WHO Europe, 'No level of alcohol consumption is safe for our health' (4 Jan 2023); IARC Monographs Vol. 100E; statement published in The Lancet Public Health",
          sourceUrl:
            "https://www.who.int/europe/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health",
          reasoning:
            "Authoritative international body summarizing the IARC carcinogen evidence. High directness for the cancer claim. Replicability is moderate because the 'no threshold' conclusion is a judgment about absence of evidence for a floor rather than a measured floor.",
        },
        {
          id: "breast-cancer-dose-response",
          title: "Breast-Cancer Risk Rises ~7.1% Per 10 g/day",
          description:
            "A collaborative reanalysis of individual data from 53 epidemiological studies (58,515 women with breast cancer, 95,067 controls) found breast-cancer relative risk increased 7.1% (95% CI 5.5-8.7%, P<0.00001) for each additional 10 g/day of alcohol — a roughly linear dose-response with no identified safe lower bound.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Collaborative Group on Hormonal Factors in Breast Cancer, British Journal of Cancer (2002); pooled reanalysis of 53 studies",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2562507/",
          reasoning:
            "Large individual-participant pooled analysis, the gold standard for dose-response. Strong, tight confidence interval extending to light intake directly supports a no-threshold cancer effect for one major organ system.",
        },
      ],
    },
    {
      id: "net-mortality",
      title: "Net Mortality Across All Causes",
      short_summary:
        "Cancer is one organ system; the meta-claim is about overall health. Genetic (Mendelian randomization) and bias-corrected studies increasingly find risk rising from zero, but the size of any low-dose harm is genuinely contested.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "When you sum every cause of death, the dose that minimizes total health loss is essentially zero. The Global Burden of Disease 2016 analysis of 195 countries concluded that the level of consumption minimizing harm is zero standard drinks. Mendelian-randomization studies — which use genetic variants as 'natural experiments' immune to lifestyle confounding — find a linear increase in all-cause mortality with genetically predicted intake and no protective dip at modest levels. So the all-cause curve, properly de-confounded, has no safe trough.",
      proponent_rebuttal:
        "The strongest bias-corrected observational meta-analysis (Zhao et al., 107 cohorts, 4.8 million people) found that low-volume drinkers (under 25 g/day) had a relative risk of death of 0.93 (95% CI 0.85-1.01) — not significantly different from lifetime abstainers, meaning low intake was not shown to raise mortality. And the GBD 2020 update explicitly concluded that adults aged 40+ without underlying conditions may see net benefit from small amounts (one to two drinks/day) for cardiovascular disease, stroke, and diabetes. 'No safe level' overstates a curve whose low end is statistically flat, not clearly upward.",
      crux: {
        id: "confounding-vs-causation",
        title: "Confounding vs. Causation at Low Doses",
        description:
          "Whether the apparent flatness (or dip) in all-cause mortality at low intake is a true causal floor or an artifact of 'abstainer bias' — sick ex-drinkers and the unwell being misclassified into the non-drinking reference group, making light drinkers look healthier than they are.",
        methodology:
          "Triangulate three designs that fail in different ways: (1) cohorts using strict lifetime-abstainer references with former-drinker exclusion; (2) Mendelian randomization using alcohol-metabolism gene variants (ADH1B/ALDH2); (3) registry-linked natural experiments. Causation is supported only where all three agree on the sign at low dose.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (re-analysis of published cohort and genetic data)",
        falsification: {
          supporter_flip:
            "If all three de-confounded designs converged — strict lifetime-abstainer cohorts, Mendelian-randomization using ADH1B/ALDH2 variants, and registry-linked natural experiments all showing all-cause risk flat or falling at low dose — then the claim that the low-dose harm is real (not an abstainer-bias artifact) would collapse.",
          skeptic_flip:
            "A skeptic leaning on the flat-looking Zhao et al. low-dose estimate should weigh that Mendelian-randomization studies, which are immune to the lifestyle confounding and reverse causation that inflate observational J-curves, find all-cause mortality rising roughly linearly with genetically predicted intake and no protective dip.",
          common_ground:
            "Both sides agree abstainer bias is a real distortion (sick ex-drinkers wrongly counted as non-drinkers), that harm is clear at higher doses, and that the dispute is confined to the lowest exposure band.",
          live_disagreement:
            "Whether the apparent low-dose flatness or dip in all-cause mortality is a true causal floor or an artifact of reference-group contamination — resolvable only where strict-abstainer cohorts, alcohol-gene Mendelian randomization, and natural experiments agree on the sign at the lowest doses.",
        },
      },
      evidence: [
        {
          id: "mendelian-randomization-linear",
          title: "Genetic Studies Show Linear Risk, No Low-Dose Protection",
          description:
            "A linear and non-linear Mendelian-randomization analysis in UK Biobank found each genetically predicted standard unit increase in alcohol raised all-cause mortality (OR 1.27, 95% CI 1.16-1.39) and found no evidence supporting a J-shaped protective dip at modest intake — consistent with risk rising from zero.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Mendelian randomisation study of alcohol and all-cause / cause-specific mortality, UK Biobank (2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10951973/",
          reasoning:
            "MR is resistant to the lifestyle confounding and reverse causation that plague observational alcohol studies. Replicability scored moderate because non-linear MR is statistically fragile and a single-biobank result needs replication.",
        },
        {
          id: "gbd-2016-zero",
          title: "GBD 2016: Zero Minimizes Total Health Loss",
          description:
            "The Global Burden of Disease 2016 analysis (195 countries, 28 million person-years synthesized) concluded that the consumption level minimizing overall health loss is zero standard drinks per week, and attributed nearly 3 million deaths globally to alcohol in 2016.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "GBD 2016 Alcohol Collaborators, 'Alcohol use and burden for 195 countries... 1990-2016,' The Lancet (2018); PubMed 30146330",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/30146330/",
          reasoning:
            "Massive, transparent modeling exercise directly addressing the meta-claim. Marked down on replicability/independence because the 'zero is optimal' conclusion was driven by modeling choices that the GBD authors themselves revised in 2020 (see GBD 2020 evidence below).",
        },
        {
          id: "zhao-2023-flat-low-dose",
          title: "Bias-Corrected Meta-Analysis: Low Intake Not Linked to Excess Death",
          description:
            "Zhao et al. (107 cohorts, 4,838,825 participants) found that after adjusting for median-age and abstainer-bias study characteristics, low-volume drinkers (1.3-24.0 g/day) had an all-cause mortality relative risk of 0.93 (95% CI 0.85-1.01) — i.e. not significantly elevated above lifetime abstainers. Significant excess risk appeared only at 25+ g/day (women) and 45+ g/day (men).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Zhao, Stockwell, Naimi et al., 'Association Between Daily Alcohol Intake and Risk of All-Cause Mortality,' JAMA Network Open (2023); corrected May 2023",
          sourceUrl:
            "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2802963",
          reasoning:
            "Ironically authored by abstainer-bias critics, yet its own headline estimate for low intake is statistically flat (CI crosses 1.0). That undercuts an absolutist 'every drink harms' reading at the all-cause level, so it counts against the meta-claim even though the same paper confirms harm at higher doses.",
        },
        {
          id: "gbd-2020-older-adults",
          title: "GBD 2020: Net Benefit for Older Adults at Small Amounts",
          description:
            "The GBD 2020 update estimated a theoretical-minimum-risk level near zero for ages 15-39 (~0.136 drinks/day) but concluded that adults 40+ without underlying conditions may see net benefit from small amounts (roughly one to two standard drinks/day) via reduced cardiovascular disease, stroke, and diabetes — i.e. a non-zero 'safe' level for part of the population.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "GBD 2020 Alcohol Collaborators, 'Population-level risks of alcohol consumption by amount, geography, age, sex, and year,' The Lancet (2022)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9289789/",
          reasoning:
            "Same modeling team as the GBD 2016 'zero is best' result, but with refined background-disease weighting that yields a non-zero optimum for older adults. Directly contradicts a universal no-safe-level claim. Replicability moderate: TMREL estimates are sensitive to relative-risk curve assumptions.",
        },
      ],
    },
    {
      id: "j-curve-history",
      title: "The Disappearing J-Curve",
      short_summary:
        "Decades of observational data showed moderate drinkers outliving abstainers. The fight is over whether that J-shaped curve is real biology or an artifact of who ends up in the 'non-drinker' group.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "The famous J-curve is largely a measurement artifact. When you split 'non-drinkers' into lifetime abstainers versus former drinkers — many of whom quit because they were already sick — the apparent protection of moderate drinking shrinks or vanishes. Studies that fail to make this distinction systematically flatter light drinkers, so the historical 'moderate drinkers live longer' finding cannot establish a genuinely safe level.",
      proponent_rebuttal:
        "Even in a meta-analysis built by the leading abstainer-bias critics, the unadjusted J-curve was not subtle: across 87 studies, low-volume drinkers had a mortality relative risk of 0.86 (95% CI 0.83-0.90). A signal that large and that consistent across decades and continents is not trivially explained away, and biologically plausible mechanisms (HDL cholesterol, insulin sensitivity, fibrinogen) exist. The honest position is that some of the J-curve is bias and some may be real — which is precisely not 'no safe level, full stop.'",
      crux: {
        id: "reference-group-test",
        title: "The Reference-Group Test",
        description:
          "Whether the J-curve survives when the comparison group is restricted to healthy lifetime abstainers (excluding 'sick quitters'). If the protective dip disappears under a clean reference group, it was an artifact; if it persists, a safe/beneficial low dose may be real.",
        methodology:
          "Re-run the same cohorts twice: once with the conventional 'current non-drinker' reference, once restricting to lifetime abstainers with former drinkers removed. Compare the low-volume relative risk between specifications; the gap quantifies abstainer bias.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (specification re-analysis of existing cohorts)",
        falsification: {
          supporter_flip:
            "If the protective J-curve dip survived intact after restricting the reference group to healthy lifetime abstainers and removing former drinkers — and persisted across cohorts and continents — then dismissing the J-curve as pure 'sick-quitter' artifact would be untenable and a genuinely beneficial low dose could be real.",
          skeptic_flip:
            "A skeptic who treats the J-curve as obvious biology should weigh that Stockwell et al. showed the large unadjusted benefit (RR 0.86) shrinks substantially once the reference group is cleaned of former drinkers — so much of the 'moderate drinkers live longer' signal tracks who lands in the non-drinker group, not the alcohol.",
          common_ground:
            "Both sides agree the raw unadjusted J-curve is large and decades-replicated, and that abstainer bias attenuates it; the fight is over how much survives a clean reference group.",
          live_disagreement:
            "How much of the J-curve remains after restricting to healthy lifetime abstainers with former drinkers excluded — the residual low-volume relative risk under that clean specification is the exact unsettled number, answerable by re-running the same cohorts twice and comparing.",
        },
      },
      evidence: [
        {
          id: "stockwell-unadjusted-jcurve",
          title: "Unadjusted J-Curve: Moderate Drinkers Showed 14% Lower Mortality",
          description:
            "Stockwell et al.'s systematic review of 87 studies replicated the classic J-shaped curve before correction: low-volume drinkers (1.3-24.9 g/day) had an all-cause mortality relative risk of 0.86 (95% CI 0.83-0.90) versus the reference group — a large, consistent apparent benefit that adjustment for abstainer bias substantially attenuated.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Stockwell et al., 'Do Moderate Drinkers Have Reduced Mortality Risk?' Journal of Studies on Alcohol and Drugs (2016); PubMed 26997174",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26997174/",
          reasoning:
            "Weighted modestly because the authors' own conclusion is that this raw J-curve is largely artifactual — but the unadjusted effect is real, large, and decades-replicated, which is genuine (if contested) evidence against an absolute no-safe-level claim. Low directness: it speaks to apparent association, not established causation.",
        },
      ],
    },
  ],
};

