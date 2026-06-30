import type { Topic } from "@/lib/schemas/topic";

export const gunControlEffectivenessData = {
  id: "gun-control-effectiveness",
  title: "Gun Control Effectiveness",
  meta_claim:
    "Stricter gun control laws significantly reduce gun violence and mass shootings.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "RAND's review of thousands of studies found that for most gun laws the rigorous causal evidence is limited or inconclusive — the strongest evidence is narrow: safe-storage (child-access-prevention) laws reduce youth firearm deaths, and stand-your-ground laws are linked to more homicides.",
    confidence: 85,
    source: "RAND Corporation, 'The Science of Gun Policy' (evidence synthesis)",
    sourceUrl: "https://www.rand.org/research/gun-policy/analysis.html",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The gun debate is loud, but the evidence is quieter and more specific than either side admits — when RAND reviewed thousands of studies, it found that for most policies the rigorous causal evidence is limited or inconclusive, neither 'gun laws clearly work' nor 'gun laws clearly fail.'",
    "A few things are well-established: the US firearm-death rate (~12–13 per 100,000) is an order of magnitude above peer democracies, guns make both suicides and mass-shooting casualties far more lethal, and safe-storage laws measurably cut youth firearm deaths.",
    "So the honest disagreement isn't about the scale of the problem — the US gun-death rate dwarfs peer nations — but about which specific policies actually reduce it without simply burdening lawful owners, given ~393 million guns already in circulation and a Second Amendment that constrains the options.",
  ],
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
        'Comparing the US to other countries ignores unique factors: ~393M existing guns already in circulation, constitutional protections, cultural differences, and violence concentrated in specific areas. Switzerland has high gun ownership with comparatively low violence. Guns are also used defensively: even the conservative National Crime Victimization Survey records tens of thousands of defensive uses a year, and a 2013 National Research Council review put survey-based estimates in a wide 500,000-3 million range. New sales restrictions barely reach the existing stockpile, and criminals do not follow laws.',
      proponent_rebuttal:
        "After Australia's 1996 National Firearms Agreement, fatal mass shootings fell from 13 in the prior 18 years to zero for the next two decades, and total firearm deaths fell from a mean 3.6 to 1.2 per 100,000 (the study's authors caution they cannot prove the law caused this, since non-firearm deaths also fell). Japan, the UK, and most of Europe pair strict laws with far fewer gun deaths per capita. The \"criminals don't follow laws\" argument applies to all laws; we don't abandon murder laws because murderers break them.",
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
        falsification: {
          supporter_flip:
            "If the strongest natural experiments (Australia 1996, Connecticut's permit law, the Missouri repeal) consistently failed to show gun-law changes reducing firearm deaths once you account for pre-existing trends and confounders — i.e. the cross-national gap turned out to be driven by non-policy factors (violence concentration, drug markets, inequality) — the 'stricter laws cut violence' claim would weaken.",
          skeptic_flip:
            "A skeptic who cites American exceptionalism should weigh that the cross-national gap is enormous and consistent, and that specific before/after changes (Australia's mass-shooting drop to zero for two decades) line up with the policy — so the burden is to explain why the US would be immune to measures that track with lower deaths almost everywhere else.",
          common_ground:
            "Both sides agree the US has far more guns and far higher firearm-death rates than peer democracies, and that ~393 million existing guns make any new restriction slow to reach the stockpile.",
          live_disagreement:
            "How much of the US's exceptional firearm-death rate is caused by gun availability and laws versus other factors (violence concentration, mental health, drug markets) — and therefore how much a given law would actually change the number.",
        },
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
        "Mass shootings are rare events often driven by mental-health crises, not gun availability. Determined attackers will find weapons or use other methods (vehicles, bombs). In Mother Jones' database of mass shootings since 1982, roughly 74% of the guns used were obtained legally, so most perpetrators passed (or would have passed) a background check.",
      proponent_rebuttal:
        "Red flag laws, waiting periods, and assault-weapon restrictions can prevent impulsive violence. Lethality depends heavily on weapon type: across US mass shootings from 2015-2022, Everytown found incidents involving assault weapons averaged 11.5 killed versus 5.1 for incidents with other guns. Even where most shooters buy legally, removing high-capacity weapons from the legal market lowers the ceiling on casualties.",
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
        falsification: {
          supporter_flip:
            "If careful analysis showed mass-shooting casualty counts don't actually fall when high-capacity/assault weapons are restricted — because shooters substitute handguns with little loss of lethality, or because the casualty gap reflects target choice rather than the weapon — the case for assault-weapon and magazine limits would weaken (RAND already rates that causal evidence inconclusive).",
          skeptic_flip:
            "A skeptic who says weapon type doesn't matter should weigh that mass shootings with assault weapons average more than twice the deaths per incident (Everytown: 11.5 vs 5.1) and that high-capacity magazines mechanically raise the ceiling on how many can be shot before reload — so weapon type plausibly affects lethality even if a ban's net effect is hard to isolate.",
          common_ground:
            "Both sides agree most mass shooters obtain their guns legally (~74%), so background-check expansion alone would miss most of them.",
          live_disagreement:
            "Whether restricting assault weapons and high-capacity magazines actually lowers mass-shooting casualties, or whether determined attackers substitute other weapons with similar results — a question the inconclusive ban-evaluation literature hasn't settled.",
        },
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
