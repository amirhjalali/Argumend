import type { Topic } from "@/lib/schemas/topic";

export const gunControlEffectivenessData = {
  id: "gun-control-effectiveness",
  title: "Gun Control Effectiveness",
  meta_claim:
    "Stricter gun control laws significantly reduce gun violence and mass shootings.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "international-comparison",
      title: "International Comparisons",
      short_summary:
        "Countries with stricter gun laws have dramatically lower rates of gun deaths.",
      image_url:
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        'Comparing the US to other countries ignores unique factors: 400M existing guns, constitutional protections, cultural differences, gang violence concentrated in specific areas. Switzerland has high gun ownership with low violence. Criminals don\'t follow laws.',
      proponent_rebuttal:
        "Australia's 1996 gun buyback saw mass shootings drop to near zero. Japan, UK, and most of Europe have strict laws and far fewer gun deaths per capita. The \"criminals don't follow laws\" argument applies to all laws; we don't abandon murder laws because murderers break them.",
      crux: {
        id: "natural-experiment",
        title: "Policy Change Natural Experiments",
        description:
          "Study jurisdictions before and after significant gun law changes to measure causal impact.",
        methodology:
          "Compare gun death rates before/after policy changes (Australia 1996, Connecticut 1995, Missouri 2007 repeal) using synthetic control methods.",
        equation: "\\Delta_{violence} = \\beta \\cdot \\Delta_{policy} + \\epsilon",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Econometric analysis of existing data)",
      },
      evidence: [
        {
          id: "australia-buyback",
          title: "Australia's Gun Buyback and Mass Shootings",
          description:
            "After the 1996 National Firearms Agreement (which banned semiautomatic rifles and bought back ~650,000 firearms), Australia recorded 13 fatal mass shootings in 1979-1996 and zero from 1997 through May 2016. Total firearm deaths fell from a mean 3.6 to 1.2 per 100,000, with the pre-existing decline accelerating. The authors caution they cannot determine whether the law caused the change, since non-firearm deaths also declined over the period.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "Chapman, Alpers & Jones, JAMA (2016)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/27332876/",
          reasoning:
            "Strong natural experiment, but the authors explicitly decline to claim causation, and the firearm-homicide acceleration was not statistically significant. The earlier '42% drop in gun homicides' figure is not from this study; corrected.",
        },
        {
          id: "international-rates",
          title: "US Gun Death Rate Far Higher Than Peer Nations",
          description:
            "The US total firearm death rate (homicide + suicide + accidental) was about 12.2 per 100,000 in IHME's 2019 Global Burden of Disease estimates, and the CDC reported 12.8 per 100,000 for 2024 (~44,000 deaths). This is an order of magnitude higher than other wealthy democracies such as the UK and Japan, which have among the lowest firearm death rates in the world.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "IHME Global Burden of Disease (2019); CDC/NCHS (2024)",
          sourceUrl:
            "https://www.pewresearch.org/short-reads/2026/04/28/what-the-data-says-about-gun-deaths-in-the-us/",
          reasoning:
            "Cross-national rate gap is robust and well-documented; the directness of the causal inference (laws vs. many confounders) remains debated. Exact UK/Japan decimals vary by dataset and homicide-only vs. all-cause framing, so stated qualitatively.",
        },
        {
          id: "existing-guns",
          title: "Hundreds of Millions of Guns Already in Circulation",
          description:
            "The 2017 Small Arms Survey estimated ~393 million civilian-held firearms in the US (about 120 per 100 residents, more than any other country and more guns than people). New restrictions on sales do not directly reach this existing stockpile.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Small Arms Survey, Global Firearms Holdings (2017)",
          sourceUrl:
            "https://www.smallarmssurvey.org/database/global-firearms-holdings",
          reasoning:
            "Practical implementation challenge. The US has no national firearm registry, so the count is a modeled estimate, not an exact inventory.",
        },
        {
          id: "defensive-gun-use",
          title: "Defensive Gun Uses Save Lives",
          description:
            "Estimates of annual defensive gun uses (DGUs) range from roughly 500,000 to 3 million. The high end derives from Kleck & Gertz's 1995 random-digit-dial survey (~2.5 million/year); the National Crime Victimization Survey yields far lower figures (~60,000-120,000/year). A 2013 National Research Council report (commissioned via the CDC) noted the 500,000-3 million range across survey-based studies but did not endorse a single number.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source:
            "RAND, 'The Challenges of Defining and Measuring Defensive Gun Use'; Kleck & Gertz (1995); National Research Council (2013); NCVS (BJS)",
          sourceUrl:
            "https://www.rand.org/research/gun-policy/analysis/essays/defensive-gun-use.html",
          reasoning:
            "Highly contested estimates with large methodological disagreements. RAND notes the National Research Council's 500,000-3 million range, judges the Kleck/Gertz ~2.5 million figure 'not plausible' against the total number of people shot each year, and says the NCVS almost certainly underestimates DGUs. The wide range is not a CDC original estimate.",
        },
      ],
    },
    {
      id: "mass-shooting-prevention",
      title: "Mass Shooting Prevention",
      short_summary: "Can specific policies prevent mass shootings?",
      image_url:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Mass shootings are rare events driven by mental health crises, not gun availability. Determined attackers will find weapons or use other methods (vehicles, bombs). Most mass shooters pass background checks.",
      proponent_rebuttal:
        "Red flag laws, waiting periods, and assault weapon restrictions can prevent impulsive violence. The lethality of attacks depends heavily on weapon type—semi-automatic rifles with high-capacity magazines enable far more casualties than other weapons.",
      crux: {
        id: "assault-weapon-lethality",
        title: "Weapon Type and Casualty Analysis",
        description:
          "Do mass shootings with assault-style weapons result in more casualties than those with other firearms?",
        methodology:
          "Analyze all US mass shootings (4+ victims) by weapon type. Compare average casualties, adjusting for location and response time.",
        equation:
          "E[\\text{casualties} | \\text{AR-style}] vs E[\\text{casualties} | \\text{handgun}]",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (Database analysis)",
      },
      evidence: [
        {
          id: "assault-weapon-casualties",
          title: "Mass Shootings With Assault Weapons Are Deadlier",
          description:
            "Across US mass shootings from 2015-2022, Everytown found the 30 incidents involving assault weapons averaged 11.5 killed and 35.4 shot per incident, vs. 5.1 killed and 6.1 shot in the 78 incidents using other guns.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 7,
            directness: 8,
          },
          source: "Everytown Research (advocacy org), 2015-2022 data",
          sourceUrl:
            "https://everytownresearch.org/report/assault-weapons-and-high-capacity-magazines/",
          reasoning:
            "Clear and large statistical pattern, but the source is a gun-control advocacy organization (not peer-reviewed/independent), so reliability and independence are lowered. RAND separately rates causal evidence on assault-weapon bans as inconclusive. Earlier '8.2 vs 4.4' figures did not match the source and were corrected.",
        },
        {
          id: "red-flag-laws",
          title: "Red Flag Laws May Reduce Firearm Suicides",
          description:
            "Studies of early extreme-risk protection order (ERPO) laws estimated roughly a 7.5% firearm-suicide reduction in Indiana and ~13.7% in Connecticut (Swanson et al.). RAND's evidence synthesis rates this as 'limited' evidence that ERPO laws may reduce firearm and total suicides, noting some offsetting increase in non-firearm suicides.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source:
            "RAND, The Science of Gun Policy (ERPO/suicide); Swanson et al. (Connecticut, Indiana)",
          sourceUrl:
            "https://www.rand.org/research/gun-policy/analysis/extreme-risk-protection-orders/suicide.html",
          reasoning:
            "Suicide is easier to study than rare mass shootings, but RAND classifies the evidence as 'limited' (most studies have methodological concerns), so replicability is lowered and the claim is hedged.",
        },
        {
          id: "background-check-pass",
          title: "Most Mass Shooters Obtain Guns Legally",
          description:
            "In Mother Jones' database of US mass shootings since 1982, about 74% of the firearms used were obtained legally, implying most perpetrators passed (or would have passed) a background check.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Mother Jones US Mass Shootings Database (since 1982)",
          sourceUrl:
            "https://www.motherjones.com/politics/2012/12/mass-shootings-mother-jones-full-data/",
          reasoning:
            "Limits the expected effect of background-check expansion on this specific subset of crime. The dataset is a journalistic compilation using a narrow definition of 'mass shooting,' so it is not peer-reviewed; '74%' obtained-legally is the verifiable figure (the earlier '77%' was not matched to a source).",
        },
        {
          id: "substitute-methods",
          title: "Attackers May Substitute Methods",
          description:
            "Without guns, determined attackers could use vehicles, bombs, or other weapons.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          reasoning:
            "Theoretical concern; evidence suggests guns enable higher casualties.",
        },
      ],
    },
  ],
};
