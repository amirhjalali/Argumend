export const alcoholNoSafeLevelData = {
  id: "alcohol-no-safe-level",
  title: "Alcohol: Is Any Amount Safe?",
  question: "Is even one drink a day bad for your health?",
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "Is any amount of drinking harmful to health?",
    "Is a glass of red wine a day good for your heart?",
    "Is moderate drinking good for you?",
    "Is there a safe level of alcohol?",
  ],
  meta_claim:
    "There is no safe level of alcohol consumption for health.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: the 2025-2030 Dietary Guidelines (7 January 2026)
  // dropped the one-drink / two-drink daily limits for "consume less alcohol
  // for better overall health"; the Surgeon General's January 2025 advisory
  // called for the limits to be reconsidered; NASEM (December 2024) found
  // moderate drinkers had lower all-cause mortality than never drinkers.
  last_updated: "2026-11-03",
  tags: ["alcohol", "public-health", "cancer", "cardiovascular", "epidemiology"],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "For decades US dietary guidelines said up to one drink a day for women and two for men. The 2025-2030 guidelines, released in January 2026, dropped those numbers and now say only: 'Consume less alcohol for better overall health.' Alcohol causes cancer, and US cancer researchers estimate that a daily drink raises a woman's lifetime chance of an alcohol-related cancer from about 17 in 100 to 19. The fight is over what a drink or two a day does to your overall health, once heart disease and the problems with comparing drinkers to non-drinkers are counted.",
    confidence: 88,
    source:
      "US Departments of Agriculture and Health and Human Services, Dietary Guidelines for Americans 2025-2030 (January 2026); National Cancer Institute, 'Alcohol and Cancer Risk' fact sheet (reviewed 2 May 2025), citing the Surgeon General's Advisory on alcohol and cancer risk",
    sourceUrl:
      "https://www.cancer.gov/about-cancer/causes-prevention/risk/alcohol/alcohol-fact-sheet",
  },
  simple_case: [
    "The answer shapes what doctors tell patients about a nightly glass of wine, whether bottles carry cancer warnings, and whether the next US guidelines put a number back.",
    "The two sides split over whether cancer risk starts from the first drink, whether light drinkers really outlive people who never drank, and whether a small but real risk deserves the words 'low risk'.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Does a drink a day raise cancer risk? (what we know)
    // =========================================================================
    {
      id: "cancer-no-threshold",
      title: "Does a Drink a Day Raise Cancer Risk?",
      short_summary:
        "Alcohol is a Group 1 carcinogen, like tobacco, and causes at least seven cancers. For breast cancer the risk climbs about 7% for each daily drink, with no level found where it stops. But for most cancers, the largest site-by-site pooling found no clear rise at one drink a day, and the added absolute risk is small. The question is whether the cancer risk starts at zero, or at a small amount studies are too weak to see.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "A statistically detectable relative-risk increase is not the same as a meaningful absolute risk. A 7% rise in breast cancer risk per daily drink, on a low baseline, is a small absolute change: US cancer researchers put a woman's lifetime chance of any alcohol-related cancer at about 17 in 100 below one drink a week and 19 in 100 at one drink a day. The largest site-by-site meta-analysis, 572 studies, found that at about one drink a day risk rose for mouth and throat, oesophageal squamous cell and breast cancer, but not for bowel or larynx, and fell for kidney and thyroid cancer and lymphoma. 'No threshold has been found' often means studies lack the power to see a small one, not that none exists. And cancer is one organ system; net health is what matters.",
      proponent_rebuttal:
        "The International Agency for Research on Cancer puts alcohol in Group 1, the tier for agents known to cause cancer in humans, alongside tobacco and asbestos. The mechanism needs no threshold: the body turns ethanol into acetaldehyde, which damages DNA. The breast-cancer evidence is as strong as epidemiology gets: a pooled reanalysis of individual data from 53 studies, 58,515 women with breast cancer, found risk rose 7.1% for each extra 10 g of alcohol a day, a roughly straight line down to the lowest intakes. WHO Europe reports that about half of alcohol-attributable cancers in its region come from 'light' and 'moderate' drinking, because that is where most drinkers are. Two extra cancers per 100 women is not trivial when tens of millions of women drink daily.",
      crux: {
        id: "carcinogen-threshold",
        title: "The Threshold Test",
        question:
          "Does cancer risk rise from the first daily drink, or only above some small amount?",
        description:
          "If the dose-response line runs through zero, every drink adds some cancer risk, and 'no safe level' holds for cancer. If there is a small floor below which risk does not rise, a low-risk amount exists, at least for cancer.",
        methodology:
          "Pool individual-participant data from large cohorts with validated lifetime-abstainer reference groups; fit flexible (spline) dose-response models for each alcohol-linked cancer; test whether the lower confidence bound of risk excludes the null at the lowest exposure bins (e.g. under 10 g a day). Pre-register the analysis.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Pooled individual-participant cohorts with validated lifetime-abstainer reference groups, fitted with flexible dose-response curves for each alcohol-linked cancer, checking whether risk is above baseline in the lowest bins (below 10 g/day).",
        },
        cost_to_verify: "$500K (pooled re-analysis of existing cohorts)",
        falsification: {
          supporter_flip:
            "If pooled spline models found a band below about 5 to 10 g a day where breast and bowel cancer risk did not rise above lifetime abstainers, 'no safe level for cancer' would soften to 'no safe level above a small floor.'",
          skeptic_flip:
            "If larger pooled datasets kept the breast-cancer rise significant down to a few grams a day, and other cancers showed the same straight line once statistical power grew, 'just noise at the floor' would be hard to hold.",
          common_ground:
            "Both sides agree alcohol causes cancer at moderate-to-heavy intake and that the absolute risk added by one daily drink is small even if the relative risk is real.",
          live_disagreement:
            "Whether the cancer risk line runs through zero or flattens below about one drink a day, which current studies lack the power to settle.",
        },
      },
      evidence: [
        {
          id: "iarc-group1-no-threshold",
          title:
            "WHO Europe 2023: alcohol is a Group 1 carcinogen and no safe threshold for cancer has been identified",
          description:
            "IARC classifies alcoholic beverages in Group 1, the same tier as tobacco, asbestos and ionizing radiation. In a January 2023 statement published in The Lancet Public Health, WHO Europe said the evidence cannot identify a threshold at which alcohol's carcinogenic effects 'switch on', and that about half of alcohol-attributable cancers in the WHO European Region are caused by 'light' and 'moderate' drinking.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "WHO Europe, 'No level of alcohol consumption is safe for our health' (4 January 2023); IARC Monographs Vol. 100E",
          sourceUrl:
            "https://www.who.int/europe/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health",
          reasoning:
            "The authoritative cancer-classification body, directly on the cancer claim. Replicability is 7 because 'no threshold identified' is a judgment that no floor has been found, not a measurement showing there is none.",
        },
        {
          id: "breast-cancer-dose-response",
          title:
            "53-study pooling (2002): breast cancer risk rose 7.1% for each extra 10 g of alcohol a day",
          description:
            "The Collaborative Group on Hormonal Factors in Breast Cancer reanalysed individual data from 53 studies, 58,515 women with breast cancer and 95,067 controls. Relative risk rose 7.1% (95% CI 5.5-8.7%, P<0.00001) for each additional 10 g of alcohol a day, about one drink, in a roughly linear dose-response with no safe lower bound identified.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Collaborative Group on Hormonal Factors in Breast Cancer, British Journal of Cancer (2002)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2562507/",
          reasoning:
            "Individual-participant pooling is the strongest design for a dose-response, and the interval is tight. It covers one cancer in women, so it shows the no-threshold pattern for breast cancer, not for every cancer or for overall health.",
        },
        {
          id: "bagnardi-site-specific-light",
          title:
            "572-study meta-analysis (2015): at about one drink a day, risk rose for 3 cancers, not for bowel or larynx, and fell for 3 others",
          description:
            "Bagnardi et al. (British Journal of Cancer, 2015) pooled 572 studies with 486,538 cancer cases. At light drinking (12.5 g a day or less, about one drink), risk was raised for oral cavity and pharynx (RR 1.13, 95% CI 1.00-1.26), oesophageal squamous cell carcinoma (RR 1.26) and female breast (RR 1.04, 95% CI 1.01-1.07). Colorectal and laryngeal cancer rose with moderate and heavy drinking but not light drinking, and light drinking was inversely associated with kidney cancer (RR 0.92), thyroid cancer (RR 0.81) and non-Hodgkin's lymphoma (RR 0.88).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Bagnardi et al., 'Alcohol consumption and site-specific cancer risk: a comprehensive dose-response meta-analysis', British Journal of Cancer (2015)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4453639/",
          reasoning:
            "The widest site-by-site look, and at one drink a day it finds a rise for only a few cancers, which supports the skeptic's point that the no-threshold case rests on a handful of sites with small relative risks. A null at light doses can mean too little power rather than a floor, the inverse associations are observational and unexplained, and the breast-cancer rise is still there, so directness is 6.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Do light drinkers live longer? (the J-curve)
    // =========================================================================
    {
      id: "net-mortality",
      title: "Do Light Drinkers Live Longer?",
      short_summary:
        "For decades, studies found that light drinkers die at lower rates than non-drinkers: the 'J-curve' behind the red-wine-for-your-heart idea. The National Academies confirmed it in 2024 against people who never drank. Critics say the curve is mostly an illusion: many 'non-drinkers' quit because they were already sick, and genetic studies that sidestep lifestyle find no protective dip.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The strongest bias-corrected observational meta-analysis still does not find light drinking deadly, and the newest federal review finds it protective. In December 2024 the National Academies, asked by Congress to inform the Dietary Guidelines, compared moderate drinkers with people who had never drunk, the clean comparison critics demand, and found 16% lower all-cause mortality (RR 0.84, 95% CI 0.81-0.87) across eight studies, a conclusion it rated moderate certainty. Before any correction, 87 studies show light drinkers with 14% lower mortality, a pattern that has held for decades and across continents. The Global Burden of Disease team, which in 2018 called zero the healthiest amount, revised its estimate in 2022: for adults over 40 without health problems, small amounts may bring a net benefit through lower heart disease, stroke and diabetes. Biology offers mechanisms, such as higher HDL cholesterol and better insulin sensitivity. Some of the J-curve may be bias; that is not the same as all of it.",
      proponent_rebuttal:
        "The J-curve is largely a measurement artifact. Many 'non-drinkers' in older studies quit because they were already ill, which makes drinkers look healthier by comparison. A 2007 meta-analysis found that in the few studies that kept former and occasional drinkers out of the abstainer group, light and moderate drinkers were at no lower risk of death. When the same research group corrected 107 cohorts of 4.8 million people for this bias in 2023, the benefit for light drinkers shrank to a statistically insignificant 7%. Genetic studies cut through lifestyle differences entirely: in 278,093 UK Biobank participants, each genetically predicted 8 g a day raised the odds of death by 27%, and the authors found 'no evidence for any protective benefit at modest intake levels.' The 2018 Global Burden of Disease analysis of 195 countries found the amount that minimises overall health loss is zero. Even the National Academies rated none of its conclusions high certainty, and people who never drink can differ in ways no adjustment captures.",
      crux: {
        id: "confounding-vs-causation",
        title: "The Sick-Quitter Test",
        question:
          "Do light drinkers outlive people who never drank, once sick ex-drinkers are left out of the comparison?",
        description:
          "If light drinkers still live longer than healthy lifelong abstainers, and genetic studies agree, a small amount of alcohol may do net good for some people and 'no safe level' fails for overall health. If the benefit vanishes under a clean comparison, it was an artifact of who counted as a non-drinker.",
        methodology:
          "Triangulate three designs that fail in different ways: (1) cohorts using strict lifetime-abstainer references with former drinkers excluded; (2) Mendelian randomization using alcohol-metabolism gene variants (ADH1B/ALDH2); (3) registry-linked natural experiments such as alcohol tax or availability changes. Causation is supported only where all three agree on the sign at low doses.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Three designs that fail in different ways: strict lifetime-abstainer cohorts excluding former drinkers, Mendelian randomization using ADH1B/ALDH2 variants, and registry-linked natural experiments, read for agreement at low doses.",
        },
        cost_to_verify: "$0 (re-analysis of published cohort and genetic data)",
        falsification: {
          supporter_flip:
            "If strict lifetime-abstainer cohorts, Mendelian randomization with ADH1B and ALDH2 variants, and natural experiments all found death rates flat or lower at one drink a day, the claim that light drinking shortens life would fail.",
          skeptic_flip:
            "If more never-drinker cohorts found the benefit shrinking toward zero as health at baseline was better measured, and genetic studies outside UK Biobank kept finding a straight rise, the National Academies' 16% would look like confounding.",
          common_ground:
            "Both sides agree counting sick ex-drinkers as non-drinkers distorts the comparison, that harm is clear at higher doses, and that the dispute is confined to about one or two drinks a day.",
          live_disagreement:
            "How much of the J-curve survives a clean comparison with healthy lifelong abstainers, and whether genetic studies or never-drinker cohorts are the better guide where they disagree.",
        },
      },
      evidence: [
        {
          id: "nasem-2024-never-drinkers",
          title:
            "National Academies 2024: moderate drinkers had 16% lower all-cause mortality than never drinkers (8 studies)",
          description:
            "The National Academies' 'Review of Evidence on Alcohol and Health' (December 2024), requested by Congress to inform the Dietary Guidelines for Americans, compared moderate drinking (up to two drinks a day for men, one for women) with never drinking. Finding 3-1 reports 'a 16 percent lower risk of all-cause mortality' (RR 0.84, 95% CI 0.81-0.87) in a meta-analysis of eight eligible studies, and Conclusion 3-1 rates the association moderate certainty. The same review found moderate drinking associated with a higher risk of female breast cancer, and none of its conclusions reached high certainty.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'Review of Evidence on Alcohol and Health' (2024), Finding 3-1 and Conclusion 3-1",
          sourceUrl: "https://www.nationalacademies.org/read/28582/chapter/5",
          reasoning:
            "A systematic review that uses never drinkers, the clean reference group this crux turns on, and still finds a lower death rate. It pools eight observational studies, the committee rates it below high certainty, and people who never drink may differ in ways adjustment misses, so replicability is 6.",
        },
        {
          id: "stockwell-unadjusted-jcurve",
          title:
            "87-study review (2016): before correction, light drinkers showed 14% lower mortality",
          description:
            "Stockwell et al.'s systematic review of 87 studies reproduced the classic J-curve before correction: low-volume drinkers (1.3-24.9 g a day) had an all-cause mortality relative risk of 0.86 (95% CI 0.83-0.90) against the reference group. Adjusting for abstainer bias and study quality substantially weakened it.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Stockwell et al., 'Do Moderate Drinkers Have Reduced Mortality Risk?' Journal of Studies on Alcohol and Drugs (2016); PubMed 26997174",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26997174/",
          reasoning:
            "The raw signal is large and consistent across decades, which is why the J-curve is not easily dismissed. Its own authors conclude it is largely artifact, and it shows association, not cause, so directness is 5.",
        },
        {
          id: "gbd-2020-older-adults",
          title:
            "Global Burden of Disease 2022: for adults over 40, small amounts may carry a net benefit",
          description:
            "The GBD 2020 update (The Lancet, 2022) estimated the healthiest level for ages 15-39 at near zero (about 0.136 drinks a day) but concluded that adults 40 and older without underlying conditions may see net benefit from small amounts, roughly one to two standard drinks a day, through lower cardiovascular disease, stroke and diabetes.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "GBD 2020 Alcohol Collaborators, 'Population-level risks of alcohol consumption by amount, geography, age, sex, and year', The Lancet (2022)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9289789/",
          reasoning:
            "The same team that called zero the healthiest amount in 2018 now finds a non-zero optimum for older adults, which contradicts a universal no-safe-level claim. Replicability is 6 because the estimate depends on the relative-risk curves fed into the model, which inherit the observational J-curve the other side disputes.",
        },
        {
          id: "fillmore-misclassification",
          title:
            "2007 meta-analysis: in studies that kept ex-drinkers out of the abstainer group, light drinkers had no lower death rate",
          description:
            "Fillmore, Stockwell, Chikritzhs, Bostrom and Kerr (Annals of Epidemiology, 2007) meta-analysed prospective studies for one systematic error: contaminating 'the abstainer category with occasional or former drinkers.' In the few studies without that error, abstainers and light or moderate drinkers were at equal risk of all-cause and coronary heart disease death.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source:
            "Fillmore et al., 'Moderate alcohol use and reduced mortality risk: systematic error in prospective studies and new hypotheses', Annals of Epidemiology 17(5 Suppl): S16-S23 (2007)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/17478320/",
          reasoning:
            "This is the crux's own test, and the dip did not survive it. It rests on the few studies that met the standard, and its authors include Tim Stockwell, whose group argues the J-curve is an artifact, so independence is 6.",
        },
        {
          id: "mendelian-randomization-linear",
          title:
            "UK Biobank genetic study (2024): each 8 g a day raised the odds of death 27%, with no protective dip",
          description:
            "Kassaw, Hyppönen and colleagues (International Journal of Epidemiology, 2024) used gene variants that shape how much people drink, in up to 278,093 UK Biobank participants with 20,834 deaths over a median 12.6 years. Each genetically predicted 8 g a day increase raised the odds of all-cause death (OR 1.27, 95% CI 1.16-1.39). The usual observational analysis showed a J-shape; the genetic analysis did not, and the authors found 'no evidence for any protective benefit at modest intake levels.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Kassaw et al., 'Alcohol consumption and the risk of all-cause and cause-specific mortality: a linear and nonlinear Mendelian randomization study', International Journal of Epidemiology 53(2):dyae046 (2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10951973/",
          reasoning:
            "Genes are assigned at conception, so this design sidesteps the sick-quitter problem and lifestyle confounding. Replicability is 6 because non-linear Mendelian randomization is statistically fragile, the sample is white British adults from one biobank, and gene variants can affect health through routes other than drinking.",
        },
        {
          id: "gbd-2016-zero",
          title:
            "Global Burden of Disease 2018: across 195 countries, the amount that minimises health loss is zero",
          description:
            "The GBD 2016 alcohol analysis (The Lancet, 2018), covering 195 countries, concluded that the level of consumption minimising overall health loss is zero standard drinks a week, and attributed nearly 3 million deaths worldwide to alcohol in 2016.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "GBD 2016 Alcohol Collaborators, 'Alcohol use and burden for 195 countries and territories, 1990-2016', The Lancet (2018); PubMed 30146330",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/30146330/",
          reasoning:
            "The analysis that launched the 'no safe level' headline. Replicability is 5 because the same team revised the conclusion for older adults in 2022 with different modelling choices, which shows how much the answer depends on them.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: What should drinkers be told? (values and trade-offs)
    // =========================================================================
    {
      id: "drinking-guidelines",
      title: "What Should Drinkers Be Told?",
      short_summary:
        "Governments now give very different advice on the same evidence. Canada said in 2023 that two drinks a week or fewer is low risk. The US dropped its one-and-two-a-day limits in January 2026 for 'consume less alcohol.' Americans are moving too: in August 2025 Gallup found a record-low 54% drink, and for the first time a majority, 53%, said moderate drinking is bad for health. The fight here is less about data than about what risk counts as low.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Telling everyone that any drink is harmful treats a small risk as a large one and spends public trust. On the US cancer researchers' own figures, a man's lifetime chance of an alcohol-related cancer moves from 10 in 100 below a drink a week to 11 in 100 at a drink a day. The largest bias-corrected meta-analysis found no significant rise in death until about 25 g a day for women and 45 g for men, roughly two and three drinks, which is a defensible place for a number. Adults can weigh a small risk against the pleasure and social value of a drink, as they do with other choices. A guideline that says 'less is better' without a number gives people nothing to aim at, and 'no safe level' reads to many as a moral message rather than a measured one.",
      proponent_rebuttal:
        "People cannot weigh a risk they have not been told about. The Surgeon General's advisory called for the daily limits to be reconsidered because cancer risk rises 'at or below the guideline levels': two more women in every hundred getting an alcohol-related cancer at one drink a day is a real cost when counted across a whole population. Canada's 2023 guidance, built on the same evidence, put the line at two drinks a week and said 'for your health, less alcohol is better', with risk of several cancers rising at three to six. The new US guidelines now say the same thing in fewer words. Honest advice can tell people that drinking is a choice with a cost, without telling them a nightly glass is good for them, which the evidence no longer supports.",
      crux: {
        id: "low-risk-label",
        title: "The 'Low Risk' Question",
        question:
          "Should official advice name a 'low-risk' amount of drinking, or say only that less is better?",
        description:
          "The numbers are largely shared: about 2 extra alcohol-related cancers per 100 women and 1 per 100 men at a drink a day, and no clear rise in death until two or three drinks. Whether that earns the words 'low risk', and whether a government should give a number at all, depends on how much absolute risk counts as acceptable and how much weight people's own choices get. No study settles that.",
        methodology:
          "Separate the empirical part from the value part. Empirically: publish absolute lifetime risk of death and of each alcohol-related disease at 0, 1, 2 and 3 drinks a day, by sex and age, using lifetime-abstainer references. Then state the value choice openly: which lifetime risk level counts as 'low', and whether the same rule is applied to other everyday risks such as diet and driving.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "No study settles it: the absolute risks at one and two drinks a day are largely agreed, and what remains is which added lifetime risk counts as low and whether official advice should give a number. Each side would need to state that threshold and apply it to other everyday risks.",
          kind: "value-difference" as const,
        },
        cost_to_verify:
          "$0 for the risk tables (existing cohort data); the threshold is a value choice",
        falsification: {
          supporter_flip:
            "If well-corrected cohorts showed one drink a day added well under 1 in 100 lifetime risk of serious disease for both sexes, a 'low risk' label for that amount would be hard to argue against.",
          skeptic_flip:
            "If clean comparisons showed one drink a day adding several extra cancers or deaths per 100 drinkers, larger than other risks the guidelines warn about, naming it 'low risk' would be hard to defend.",
          common_ground:
            "Both sides agree alcohol causes cancer, that the added absolute risk at one drink a day is small but not zero, and that pregnant women and people with alcohol use disorder should not drink.",
          live_disagreement:
            "Whether a small, real absolute risk should be called 'low', and whether guidelines should give drinkers a number to aim for or only a direction.",
        },
      },
      evidence: [
        {
          id: "nci-absolute-risk",
          title:
            "NCI (2025): a daily drink moves a woman's lifetime alcohol-related cancer risk from about 17 to 19 in 100",
          description:
            "The National Cancer Institute's fact sheet, reviewed 2 May 2025, reports figures from the recent Surgeon General's Advisory, which used Australian data recalculated in US standard drinks: 'among 100 women who have less than one drink per week, about 17 will develop an alcohol-related cancer'; 19 at one drink a day; about 22 at two. For men the figures are 10, 11 and 13 per 100. NCI estimates alcohol caused nearly 100,000 of the 1.8 million US cancer cases diagnosed in 2019 and nearly 25,000 cancer deaths. It says the advisory 'called for reconsidering the recommended limits for alcohol' to account for cancer risk 'at or below the guideline levels.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "National Cancer Institute, 'Alcohol and Cancer Risk' fact sheet (reviewed 2 May 2025), citing the US Surgeon General's Advisory on Alcohol and Cancer Risk (January 2025)",
          sourceUrl:
            "https://www.cancer.gov/about-cancer/causes-prevention/risk/alcohol/alcohol-fact-sheet",
          reasoning:
            "Absolute numbers are what a drinker can use, and they show risk rising from one drink a day. The same numbers support the skeptic's point that the step is small, especially for men. Replicability is 6 because they are recalculated from Australian data rather than measured in US cohorts.",
        },
        {
          id: "canada-guidance-2023",
          title:
            "Canada 2023: two drinks a week or fewer is low risk; at three to six, several cancers rise",
          description:
            "Canada's Guidance on Alcohol and Health (Canadian Centre on Substance Use and Addiction, January 2023) sets out a continuum: at 2 or fewer standard drinks a week 'you are likely to avoid alcohol-related consequences'; at 3 to 6 'your risk of developing several types of cancer, including breast and colon cancer, increases'; at 7 or more 'your risk of heart disease or stroke increases significantly.' It adds: 'No matter where you are on the continuum, for your health, less alcohol is better.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Canadian Centre on Substance Use and Addiction, Canada's Guidance on Alcohol and Health (2023)",
          sourceUrl: "https://www.ccsa.ca/canadas-guidance-alcohol-and-health",
          reasoning:
            "A national body that reviewed the evidence and moved its line far below the old one-to-two-a-day limits. Replicability is 5 because the line reflects a chosen level of acceptable risk, and other countries drew it elsewhere from the same studies.",
        },
        {
          id: "dga-2025-2030-less-alcohol",
          title:
            "US Dietary Guidelines 2025-2030 dropped the daily limits: 'Consume less alcohol for better overall health'",
          description:
            "The Dietary Guidelines for Americans 2025-2030, announced on 7 January 2026, replace the previous advice to limit drinking to two drinks or fewer a day for men and one for women with a single line: 'Consume less alcohol for better overall health.' They say pregnant women, people recovering from alcohol use disorder or unable to control their drinking, and people taking medications or with conditions that interact with alcohol should avoid it completely. They give no number and do not mention cancer.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 4,
            directness: 5,
          },
          source:
            "US Departments of Agriculture and Health and Human Services, Dietary Guidelines for Americans 2025-2030 (January 2026), 'Limit Alcoholic Beverages'",
          sourceUrl: "https://cdn.realfood.gov/DGA.pdf",
          reasoning:
            "The official US position now leans toward 'less is better' and no longer offers a daily allowance. Weights are low because this is a policy document, not new evidence, it was written by political appointees, so independence is 5, and it neither endorses 'no safe level' nor cites the cancer evidence.",
        },
        {
          id: "zhao-2023-flat-low-dose",
          title:
            "107-cohort meta-analysis (2023): death risk was not significantly higher until 25 g a day for women and 45 g for men",
          description:
            "Zhao, Stockwell, Naimi and colleagues (JAMA Network Open, March 2023) analysed 107 cohort studies of 4,838,825 people and 425,564 deaths, correcting for abstainer bias and study quality. Low-volume drinkers (1.3-24.0 g a day) had an all-cause mortality relative risk of 0.93 (95% CI 0.85-1.01) against lifetime non-drinkers: no significant difference either way. Risk rose significantly from 25 g a day in women and from 45 g a day in men (RR 1.15 for 45-64 g).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Zhao, Stockwell, Naimi et al., 'Association Between Daily Alcohol Intake and Risk of All-Cause Mortality', JAMA Network Open 6(3) (published 31 March 2023)",
          sourceUrl:
            "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2802963",
          reasoning:
            "Written by leading critics of the J-curve, it removes the protective effect and still finds no significant harm below about two drinks a day for women and three for men, which gives a numeric limit an evidence base. 'Not significant' is not 'zero': the interval allows a small rise or a small benefit, so directness is 7.",
        },
      ],
    },
  ],
};
