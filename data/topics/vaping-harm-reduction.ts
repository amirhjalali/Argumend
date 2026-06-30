import type { Topic } from "@/lib/schemas/topic";

export const vapingHarmReductionData = {
  id: "vaping-harm-reduction",
  title: "Vaping as Harm Reduction",
  meta_claim:
    "E-cigarettes are an effective and acceptable harm-reduction tool for smokers.",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Most people assume vaping is just a new way to get hooked, but the highest tier of medical evidence says the opposite for smokers: the 2024 Cochrane review rates nicotine e-cigarettes as MORE effective than nicotine patches/gum at quitting — about 4 extra quitters per 100 — and UK health bodies estimate vaping is at least ~95% less harmful than smoking. The honest catch: most users don't fully switch, becoming long-term 'dual users' who keep smoking and capture little of that benefit, and millions of never-smoking teens took up nicotine along the way.",
    confidence: 84,
    source:
      "Lindson et al., Cochrane Database of Systematic Reviews (2024, RR 1.59, high certainty); Royal College of Physicians 'Nicotine without Smoke' (2016) and Public Health England (2015/2018, ~95% less harmful)",
    sourceUrl:
      "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD010216.pub8/full",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The strongest case is that for a current smoker, switching to vaping is a large, evidence-backed harm cut: the gold-standard Cochrane review (high certainty, RR 1.59) finds nicotine e-cigarettes beat nicotine-replacement therapy at producing 6-month-plus quitting, and biomarker trials show exclusive switchers drop a key lung carcinogen (NNAL) ~90% — because the combustion toxicants that drive smoking disease are largely absent from vapour.",
    "The honest limitation is that the ideal 'clean switch' is not the typical outcome: dual users — who keep smoking some cigarettes — are the most common pattern and show cardiovascular risk profiles no better than smoking alone, long-term disease effects of chronic vaping are still unknown because the products are too new, and mass-marketed flavoured devices recruited millions of never-smoking adolescents to nicotine.",
    "So the honest debate isn't 'is vaping safe?' (it isn't safe, just far less harmful than smoking) but 'does it produce more complete switching than new nicotine dependence at the population level?' — an empirical question about real-world use patterns, not about whether the device can help a motivated smoker quit.",
  ],
  last_updated: "2026-06-16",
  tags: ["vaping", "smoking", "harm-reduction", "public-health", "nicotine"],
  pillars: [
    {
      id: "cessation-efficacy",
      title: "Cessation Efficacy",
      short_summary:
        "Randomised trials find nicotine e-cigarettes help more smokers quit than traditional nicotine-replacement therapy — but most users do not fully switch.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Even where e-cigarettes outperform patches in trials, the absolute effect is modest (about 4 extra quitters per 100), the long-term abstinence base rate is low, and a large share of 'switchers' become dual users who keep smoking some cigarettes — capturing little of the promised health benefit while sustaining nicotine dependence. Trial populations (motivated quitters given support) may not generalise to the real-world market, where flavoured disposables are marketed heavily and many people vape indefinitely rather than quitting nicotine.",
      proponent_rebuttal:
        "The 2024 Cochrane review — the highest tier of evidence synthesis, covering dozens of randomised trials and tens of thousands of participants — rates nicotine e-cigarettes as MORE effective than nicotine-replacement therapy at producing 6-month-plus abstinence, with HIGH certainty (RR 1.59). A modest per-attempt edge compounds across a population of a billion smokers, and even partial switching that fully displaces combustion in some users prevents disease. 'Effective' is a comparative claim against the existing standard of care, and e-cigarettes clear that bar.",
      crux: {
        id: "abstinence-rate-vs-standard-care",
        title: "Quit Rate vs. Standard Cessation Care",
        description:
          "The load-bearing disagreement is whether e-cigarettes produce more sustained smoking abstinence than the best available alternative (nicotine-replacement therapy), measured at 6+ months with biochemical verification.",
        methodology:
          "Pool randomised controlled trials that allocate smokers to nicotine e-cigarettes vs. NRT (or other active comparators) and measure carbon-monoxide-verified continuous abstinence at >= 6 months. Compute relative risk and absolute risk difference; grade certainty via GRADE.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (existing meta-analysis)",
        falsification: {
          supporter_flip:
            "If newer, larger head-to-head trials (or a Cochrane downgrade) showed nicotine e-cigarettes do NOT beat nicotine-replacement therapy on biochemically verified 6-month-plus abstinence — or that the trial edge vanishes once real-world dual use and relapse are counted — the 'more effective than standard care' claim would collapse to 'no better than the patch.'",
          skeptic_flip:
            "A skeptic who calls the effect modest should weigh that the 2024 Cochrane review rates the e-cigarette advantage over NRT as HIGH certainty (RR 1.59), the single strongest tier of evidence — a 4-per-100 edge is large for cessation, where almost everything fails, and it compounds across hundreds of millions of smokers.",
          common_ground:
            "Both sides agree that randomised trials show nicotine e-cigarettes produce at least as many quitters as NRT, and that long-term continuous-abstinence base rates for any method are low.",
          live_disagreement:
            "Whether the controlled-trial quit-rate advantage survives translation to the real-world market (flavoured disposables, minimal support, indefinite vaping) — which only large pragmatic trials and biochemically verified long-term cohort follow-up can settle.",
        },
      },
      evidence: [
        {
          id: "cochrane-2024-rr",
          title: "Cochrane: E-cigarettes Beat NRT for Quitting (High Certainty)",
          description:
            "The 2024 Cochrane systematic review found nicotine e-cigarettes increase 6-month+ quit rates vs. nicotine-replacement therapy (RR 1.59, 95% CI 1.30-1.93; 7 studies, 2,544 participants), about 4 extra quitters per 100, rated HIGH-certainty evidence.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 10,
          },
          source:
            "Lindson et al., Cochrane Database of Systematic Reviews, 'Electronic cigarettes for smoking cessation' (2024 update, CD010216.pub8)",
          sourceUrl:
            "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD010216.pub8/full",
          reasoning:
            "Gold-standard evidence synthesis with pre-registered methods and GRADE assessment, independent of industry. The high-certainty rating and direct head-to-head against the standard of care make this the strongest single 'for' item. Weights are near-maximal but not perfect because real-world generalisability and long-term abstinence remain open.",
        },
        {
          id: "nnal-biomarker-rct",
          title: "Switching Cuts a Major Lung Carcinogen (Randomised Trial)",
          description:
            "In a randomised trial of 186 Black and Latinx smokers, those assigned pod e-cigarettes showed far greater reduction in urinary NNAL (a tobacco-specific lung carcinogen) than controls who kept smoking (RR 0.36); exclusive switchers fell ~92% from baseline (RR 0.08).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Pulvers et al., 'Effect of Pod e-Cigarettes vs Cigarettes on Carcinogen Exposure...', JAMA Network Open (2020)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7675102/",
          reasoning:
            "A randomised, biomarker-based design giving objective exposure data rather than self-report, in a major journal. Directness is high but not maximal: it measures a carcinogen-exposure surrogate over 6 weeks, not disease endpoints, and dual users captured only partial reductions.",
        },
        {
          id: "rcp-phe-95-percent",
          title: "Expert Bodies: Vaping ~95% Less Harmful Than Smoking",
          description:
            "Public Health England (2015) and the Royal College of Physicians ('Nicotine without Smoke', 2016) concluded e-cigarette use is around 95% less harmful than smoking and recommended promoting switching, because the toxicants driving smoking disease are largely absent from vapour.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 9,
          },
          source:
            "McNeill et al. for Public Health England, 'E-cigarettes: an evidence update' (2015); Royal College of Physicians, 'Nicotine without Smoke: Tobacco Harm Reduction' (2016)",
          sourceUrl:
            "https://www.rcp.ac.uk/policy-and-campaigns/policy-documents/e-cigarettes-and-harm-reduction-an-evidence-review/",
          reasoning:
            "Authoritative national medical bodies endorsing the acceptability of harm reduction — directly on the 'acceptable tool' half of the claim. Weighted down because the headline '95%' figure derives partly from an expert-elicitation estimate that critics (e.g. in The Lancet) argued rested on weak sourcing, so replicability is limited.",
        },
      ],
    },
    {
      id: "net-harm-and-acceptability",
      title: "Net Harm & Acceptability",
      short_summary:
        "Switching completely reduces toxicant exposure, but dual use, long-term unknowns, and youth uptake complicate whether vaping is an acceptable population-level tool.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "An 'acceptable' tool must be safe and net-beneficial across the whole population, not just for an ideal switcher. Dual users — the most common real-world outcome — show cardiovascular risk profiles no better than smoking alone. The 2019 EVALI outbreak (2,807 hospitalisations, 68 deaths) showed how vaping products can cause acute lethal harm. And mass-marketed flavoured devices recruited millions of adolescents to nicotine, raising a new generation of dependent users. Long-term disease outcomes from chronic vaping remain unknown because the products are too new.",
      proponent_rebuttal:
        "Acceptability is judged against the realistic alternative — continued smoking, which kills roughly half of long-term users. Complete switching sharply cuts carcinogen and carbon-monoxide exposure. The EVALI outbreak was traced overwhelmingly to vitamin E acetate in illicit THC products from informal sources, not regulated nicotine e-liquids, and ended once that adulterant was identified. US youth vaping has fallen by roughly two-thirds from its 2019 peak under tighter rules, showing the youth problem is tractable through regulation rather than a reason to deny the tool to adult smokers.",
      crux: {
        id: "complete-switch-vs-dual-use",
        title: "Complete Switch vs. Persistent Dual Use",
        description:
          "Whether the population using e-cigarettes mostly switches completely (capturing the harm reduction) or mostly becomes long-term dual users / never-smoking initiates (diluting or reversing the benefit) determines net acceptability.",
        methodology:
          "Track longitudinal cohorts of smokers offered e-cigarettes: measure rates of complete switching vs. dual use vs. relapse, biomarker exposure by group, and separately measure initiation among never-smoking youth. Net benefit = (smoking-attributable harm averted by switchers) minus (harm from dual users + new nicotine initiation).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5M+ (multi-year prospective cohort with biomarkers and disease follow-up)",
        falsification: {
          supporter_flip:
            "If long-term cohorts showed most e-cigarette users settle into persistent dual use (keeping smoking-level cardiovascular risk) rather than switching completely, and that flavoured products keep pulling never-smoking youth into durable nicotine dependence, the population-level 'acceptable harm-reduction tool' claim would fail even if the device helps individual quitters.",
          skeptic_flip:
            "A skeptic citing dual use, EVALI, and youth uptake should weigh that the realistic counterfactual is continued smoking (which kills ~half of long-term users), that EVALI was traced overwhelmingly to vitamin E acetate in illicit THC vapes rather than regulated nicotine e-liquids, and that US youth vaping has fallen ~two-thirds from its 2019 peak under tighter rules — so the youth harm looks regulable, not inherent.",
          common_ground:
            "Both sides agree that exclusive switching sharply reduces toxicant exposure, that dual use captures little of that benefit, and that youth nicotine initiation is a genuine cost that needs to be controlled.",
          live_disagreement:
            "The net population balance — how much smoking-attributable harm switchers actually avert versus the harm from long-term dual users plus new never-smoker nicotine initiation — which only multi-year prospective cohorts with biomarkers, disease endpoints, and separate youth-initiation tracking can resolve.",
        },
      },
      evidence: [
        {
          id: "dual-use-cardiovascular",
          title: "Dual Use Carries Smoking-Level Cardiovascular Risk",
          description:
            "Population research summarised by the American Heart Association finds people who use both cigarettes and e-cigarettes have cardiovascular disease risk similar to smoking alone — dual use, the most common real-world pattern, does not deliver the expected reduction in tobacco-exposure harm.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "American Heart Association news release on dual-use cardiovascular risk (2022); see also Wang et al., Korean dual-use cardiovascular study (PMC7101350)",
          sourceUrl:
            "https://www.heart.org/en/news/2022/05/06/smoking-both-traditional-and-e-cigarettes-may-carry-same-heart-risks-as-cigarettes-alone",
          reasoning:
            "Directly undercuts 'effective' for the majority pattern of use. Weighted moderately because most dual-use evidence is observational/cross-sectional with confounding (sicker or heavier smokers may be likelier to add vaping), limiting causal and replicability strength.",
        },
        {
          id: "evali-outbreak",
          title: "EVALI Outbreak: 2,807 Hospitalised, 68 Deaths",
          description:
            "The 2019-2020 US outbreak of e-cigarette/vaping product use-associated lung injury caused 2,807 hospitalisations and 68 confirmed deaths. CDC identified vitamin E acetate as the primary cause, concentrated in illicit THC-containing products from informal sources.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "CDC, final EVALI surveillance update (Feb 18, 2020); Blount et al., 'Vitamin E Acetate in Bronchoalveolar-Lavage Fluid Associated with EVALI', NEJM (2020)",
          sourceUrl:
            "https://archive.cdc.gov/www_cdc_gov/media/releases/2020/s0225-EVALI-cases-deaths.html",
          reasoning:
            "Authoritative government surveillance showing vaping products can cause acute lethal harm. Directness is reduced because CDC traced the cause overwhelmingly to vitamin E acetate in illicit THC vapes, not regulated nicotine e-liquids — so it indicts the unregulated market more than nicotine harm reduction per se.",
        },
        {
          id: "youth-uptake",
          title: "Millions of Youth Took Up Vaping",
          description:
            "Youth e-cigarette use surged to over 5 million US students at its 2019 peak; the 2024 National Youth Tobacco Survey reported 1.63 million current youth users (1.21 million high-schoolers, 7.8%), most using flavoured products — a large non-smoker population newly exposed to nicotine.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "CDC / FDA National Youth Tobacco Survey 2024, 'E-Cigarette Use Among Youth'",
          sourceUrl: "https://www.cdc.gov/tobacco/e-cigarettes/youth.html",
          reasoning:
            "Robust national survey data on the central 'acceptability' objection: harm reduction for adult smokers came packaged with mass nicotine initiation among never-smoking youth. Directness is moderate because youth uptake speaks to net population acceptability and externalities, not to whether the device helps an individual smoker quit; the post-2019 decline also shows the risk is regulable.",
        },
      ],
    },
  ],
};
