export const gunControlEffectivenessData = {
  id: "gun-control-effectiveness",
  title: "Gun Control Effectiveness",
  question: "Do stricter gun laws save lives?",
  meta_claim:
    "Stricter gun laws, such as permits to buy, background checks, safe-storage rules and limits on assault weapons and large magazines, would cut US gun deaths substantially.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: CDC counted 44,447 gun deaths in 2024 (62%
  // suicides); homicide fell 21% in big cities in 2025 and another 18% in the
  // first half of 2026 (Council on Criminal Justice); RAND's fourth edition
  // of The Science of Gun Policy (2024) is the newest full evidence review.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "About 44,400 Americans died by gunfire in 2024. Most of them, 62%, were suicides, and gun suicides hit a record 27,593 that year even as gun homicides fell 27% from their 2021 peak. Big-city murder then fell 21% in 2025 and kept falling in 2026, with no new federal gun restriction. The fight is over which gun laws, if any, would save a meaningful share of those lives, and at what cost to the tens of millions of Americans who own guns.",
    confidence: 90,
    source:
      "Pew Research Center, 'What the data says about gun deaths in the U.S.' (28 April 2026), from CDC data; Council on Criminal Justice, year-end 2025 and mid-year 2026 crime trends",
    sourceUrl:
      "https://www.pewresearch.org/short-reads/2026/04/28/what-the-data-says-about-gun-deaths-in-the-us/",
  },
  simple_case: [
    "The answer bears on the laws states are passing and repealing now: permits to buy, safe-storage and red-flag laws, permitless carry and bans on AR-15-style rifles.",
    "Mass shootings drive the headlines, but they are a small share of the deaths; most of the toll is suicide and everyday homicide.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The US gap. Guns, or something else? (what we know)
    // =========================================================================
    {
      id: "international-comparison",
      title: "The US Gap: More Guns, or More Violence?",
      short_summary:
        "The US loses far more people to gunfire than other rich democracies: 13.2 per 100,000 in 2023, about 10,000 more gun deaths than Brazil, the country with the next-highest total. It also holds more guns than people. Whether the guns cause the gap, or a violence problem the guns only make deadlier, is the first split.",
      image_url:
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "America's gun deaths come from violence and despair concentrated in particular places, and tighter laws on lawful owners would barely touch them. Gun deaths are concentrated: in 2024 Mississippi's gun death rate was 28.0 per 100,000 and Hawaii's 3.7, and the US gun homicide rate of 6.2 per 100,000 in 2023 was below more than two dozen countries and territories, many of them with strict gun laws. Australia's 1996 buyback is the case everyone cites, yet its own authors could not show the law caused the decline, because deaths by other means fell too. With about 400 million guns already in private hands and no national registry, a new sales law here reaches the stockpile slowly. And guns are used to stop crimes as well as commit them: a 2021 survey of 16,708 gun owners estimated about 1.67 million defensive uses a year, most without a shot fired. Laws that make it harder for law-abiding people to arm themselves have a cost the death statistics do not show.",
      proponent_rebuttal:
        "Where guns are easier to get, more people die by them, in other countries and between US states. The US had 13.2 gun deaths per 100,000 people in 2023, and about 10,000 more gun deaths than Brazil, the country with the next-highest total; its gun suicide rate was second only to Greenland's. After Australia's 1996 National Firearms Agreement banned semi-automatic rifles and bought back about 660,000 guns, the country went from 13 fatal mass shootings in 18 years to none for two decades, and its firearm death rate fell from 3.6 to 1.2 per 100,000. Within the US, the 2024 rate ran from 3.7 per 100,000 in Hawaii, which requires a permit to buy any gun, to 28.0 in Mississippi, which requires no permit to carry one. Defensive gun use is real, but the survey counts behind the largest estimates are self-reported and far above what crime-victim surveys find. The 'criminals don't follow laws' reply applies to every law; it is an argument for enforcing laws well, not for having none.",
      crux: {
        id: "natural-experiment",
        title: "The Natural Experiment Test",
        question:
          "How much of the US firearm death rate comes from gun availability and laws versus other factors?",
        description:
          "Study places before and after a major change in gun law, against comparison places that did not change, to separate the effect of the law from crime trends, poverty, drug markets and culture.",
        methodology:
          "Synthetic-control and difference-in-differences studies of large legal changes (Australia 1996, Connecticut's 1995 permit law, Missouri's 2007 repeal), with tests for trends that predate the law and for changes in non-gun deaths, read alongside RAND's ongoing review of which law types have consistent evidence.",
        equation: "\\Delta_{violence} = \\beta \\cdot \\Delta_{policy} + \\epsilon",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Before-and-after studies of major gun law changes, such as Australia's 1996 buyback and state permit-to-purchase laws, using synthetic comparison groups and checking whether deaths by other means moved too, read alongside RAND's ongoing review of which law types have consistent evidence.",
        },
        cost_to_verify: "$100K (Econometric analysis of existing data)",
        falsification: {
          supporter_flip:
            "If careful before-and-after studies of Australia 1996, Connecticut's permit law and the Missouri repeal kept finding that deaths by other means moved as much as gun deaths, the gap with peer countries would look driven by violence and despair, not gun access.",
          skeptic_flip:
            "If those studies found gun deaths falling after stricter laws while deaths by other means stayed flat, and rising after looser laws, the claim that the US gap is about violence rather than guns would be hard to hold.",
          common_ground:
            "Both sides agree the US has far more guns and a far higher gun death rate than other rich democracies, and that about 400 million guns already in circulation make any new sales law slow to reach the stockpile.",
          live_disagreement:
            "How much of the US's exceptional gun death rate is caused by gun availability and laws, and how much by other factors such as concentrated violence, despair and drug markets, and so how much a given law would change the number.",
        },
      },
      evidence: [
        {
          id: "international-rates",
          title: "Pew 2026: US Had 13.2 Gun Deaths per 100,000 in 2023, 10,000 More Than Brazil",
          description:
            "Using IHME's global estimates for 2023, Pew reports a US gun death rate of 13.2 per 100,000, below Venezuela, El Salvador, Haiti and several other Latin American countries but far above other rich democracies. The US had about 10,000 more total gun deaths than Brazil, the country with the next-highest total. The US gun suicide rate (6.7) was second only to Greenland's; its gun homicide rate (6.2) was below more than two dozen countries and territories. CDC counted 44,447 US gun deaths in 2024.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source:
            "Pew Research Center, 'What the data says about gun deaths in the U.S.' (28 April 2026), citing CDC and IHME data",
          sourceUrl:
            "https://www.pewresearch.org/short-reads/2026/04/28/what-the-data-says-about-gun-deaths-in-the-us/",
          reasoning:
            "The size of the gap is not in dispute. What it shows about laws is: a cross-country comparison cannot separate gun laws from everything else that differs between countries, and the US gun homicide rate sits below many countries with strict laws. Directness is moderate for that reason.",
        },
        {
          id: "australia-buyback",
          title: "Australia After 1996: 13 Mass Shootings in 18 Years, Then None for 20",
          description:
            "After the 1996 National Firearms Agreement (which banned semi-automatic rifles and pump-action shotguns and rifles, and by August 2001 had bought back and destroyed 659,940 newly prohibited guns), Australia recorded 13 fatal mass shootings in 1979-1996 and none from 1997 through May 2016. Total firearm deaths fell from a mean 3.6 to 1.2 per 100,000, with the pre-existing decline accelerating. The authors caution they cannot determine whether the law caused the change, since non-firearm deaths also declined over the period.",
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
            "The strongest national natural experiment, and the mass-shooting break is stark. But it is one country, its authors decline to claim causation, the firearm-homicide acceleration was not statistically significant, and a buyback of that scale in a country of 400 million guns would be a different policy.",
        },
        {
          id: "existing-guns",
          title: "Small Arms Survey 2017: About 393 Million Guns, 120 per 100 Residents",
          description:
            "The 2017 Small Arms Survey estimated about 393 million civilian-held firearms in the US (about 120 per 100 residents, more than any other country and more guns than people). A 2021 national survey put the total above 415 million. New restrictions on sales do not directly reach this existing stockpile.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Aaron Karp, 'Estimating Global Civilian-Held Firearms Numbers,' Small Arms Survey Briefing Paper (June 2018), 2017 estimates; William English, '2021 National Firearms Survey: Updated Analysis' (2022)",
          sourceUrl:
            "https://www.smallarmssurvey.org/sites/default/files/resources/SAS-BP-Civilian-Firearms-Numbers.pdf",
          reasoning:
            "A practical limit on any law that works through new sales. The US has no national registry, so these are modelled or survey estimates, not counts. It argues that sales laws act slowly, not that they do nothing.",
        },
        {
          id: "defensive-gun-use",
          title: "2021 Survey of 16,708 Gun Owners: About 1.67 Million Defensive Uses a Year",
          description:
            "William English's 2021 National Firearms Survey (about 54,000 adults, 16,708 of them gun owners) found that 31.1% of owners said they had used a gun to defend themselves or their property, and estimated about 1.67 million defensive incidents a year. In 81.9% of them no shot was fired. Estimates from the government's National Crime Victimization Survey are far lower, about 108,000 to 116,000 a year in the studies the National Research Council and RAND cite, and a 2013 National Research Council review reported survey estimates ranging from about 500,000 to more than 3 million.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source:
            "William English, '2021 National Firearms Survey: Updated Analysis' (Georgetown McDonough School of Business Research Paper, SSRN, May 2022); RAND, 'The Challenges of Defining and Measuring Defensive Gun Use'; National Research Council, 'Priorities for Research to Reduce the Threat of Firearm-Related Violence' (2013)",
          sourceUrl:
            "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4109494",
          reasoning:
            "If even the low estimates are right, defensive use is a benefit that death counts leave out. But the estimates differ by more than tenfold, self-reported 'defensive' incidents are hard to verify, and RAND judged that the survey behind the highest earlier figure implied more defensive shootings than the number of people treated for gunshot wounds each year, and called the government count an almost certain undercount. The weights are low because no estimate commands agreement.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Most gun deaths are suicides. Does access matter?
    // =========================================================================
    {
      id: "suicide-and-access",
      title: "Most Gun Deaths Are Suicides",
      short_summary:
        "In 2024, 27,593 Americans killed themselves with a gun, a record, against 15,364 gun homicides. Gun owners are far more likely to die by suicide than their neighbours. Whether keeping guns from people in crisis lowers total suicides, or people find another way, is the biggest crux by body count.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Suicide is driven by despair, and despair finds a way. South Korea, where civilians rarely own guns, recorded 26.2 suicides per 100,000 people in the OECD's Health at a Glance 2025, far above the OECD average of 10.8. Gun owners may differ from non-owners in ways a study cannot see, including plans already made. A 2019 review by criminologist Gary Kleck found that the soundest research shows gun prevalence affects gun suicides but not total suicides, and his own state-level analysis found no significant effect on the total. RAND rates the evidence that red-flag laws reduce suicides as only limited, and their effect on suicides by other means as uncertain. Laws that take guns from adults who have not been found dangerous by a court burden millions to reach a few, and the money might save more lives in mental health care.",
      proponent_rebuttal:
        "Many suicide attempts come with little planning during a short crisis, and most people who survive an attempt do not go on to die by suicide later, so the method used in that hour decides who lives. A study of 26.3 million Californians followed from 2004 to 2016 found that men who acquired handguns were eight times as likely as other men to die by self-inflicted gunshot, and women 35 times as likely; they had no higher rate of suicide by other methods, which is the opposite of what pure substitution would predict. RAND's 2024 review gives its highest rating, 'supportive', to child-access prevention laws for cutting self-inflicted gun injuries and deaths among young people, and to higher minimum purchase ages for cutting youth gun suicides. It finds moderate evidence that waiting periods reduce firearm suicides. Red-flag laws let families ask a judge to pause access during a crisis, with a hearing. These are narrow laws aimed at the largest group of gun deaths.",
      crux: {
        id: "suicide-substitution",
        title: "The Method-Substitution Test",
        question:
          "When people in crisis lose easy access to a gun, do total suicides fall, or do people switch methods?",
        description:
          "Measure total suicides, not only gun suicides, before and after a change in access: a new safe-storage or minimum-age law, a red-flag order, or a household acquiring a handgun. If total suicides fall, access matters; if other methods rise to fill the gap, it does not.",
        methodology:
          "Cohort studies linking handgun purchase records to death records (as in California), and state panel studies of child-access prevention, minimum-age, waiting-period and red-flag laws, with total suicide and non-firearm suicide as outcomes, and tests for pre-existing trends.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Studies that link gun purchase or red-flag records to death records and report total suicides and non-gun suicides as well as gun suicides, before and after a change in access, with comparison groups that share the same neighborhood and health history.",
        },
        cost_to_verify: "$0-$500K (linked administrative records exist in several states)",
        falsification: {
          supporter_flip:
            "If linked-record studies found that people who lose easy access to guns die by suicide at the same total rate, with other methods rising to fill the gap, the case for access laws as suicide prevention would weaken.",
          skeptic_flip:
            "If studies tracking total suicides found them falling after safe-storage, minimum-age or red-flag laws, with no matching rise in other methods, the view that despair simply finds another way would be hard to hold.",
          common_ground:
            "Both sides agree suicides are the majority of US gun deaths (27,593 of 44,447 in 2024) and that gun suicides reached a record that year while gun homicides fell.",
          live_disagreement:
            "Whether limiting access lowers total suicides or only changes the method, and whether laws that pause gun access for people who have not committed a crime are a fair price for the lives saved.",
        },
      },
      evidence: [
        {
          id: "handgun-owner-suicide-cohort",
          title: "Stanford 2020: Men Who Bought Handguns Were 8 Times as Likely to Die by Gun Suicide",
          description:
            "Following 26.3 million adult Californians who had not owned handguns, from 2004 through 2016, researchers found that men who acquired handguns were eight times as likely as men who did not to die of self-inflicted gunshot wounds, and women more than 35 times as likely. Overall suicide rates among owners were nearly four times higher than among same-neighbourhood non-owners. Handgun owners did not have higher rates of suicide by other methods or higher death rates generally.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Studdert et al., 'Handgun Ownership and Suicide in California,' New England Journal of Medicine (2020), as summarised by Stanford Medicine",
          sourceUrl:
            "https://med.stanford.edu/news/all-news/2020/06/handgun-ownership-associated-with-much-higher-suicide-risk.html",
          reasoning:
            "The largest individual-level study, and the absence of extra non-gun suicides cuts against simple substitution. It is still an association: the authors note it is hard to know whether some buyers already planned to harm themselves, and the senior author, Matthew Miller, said 'There appears to be some of both happening.' It measures owning a gun, not the effect of any law.",
        },
        {
          id: "rand-cap-supportive",
          title: "RAND 2024: 'Supportive' Evidence That Child-Access Laws Cut Youth Self-Inflicted Gun Injuries",
          description:
            "RAND's fourth edition of The Science of Gun Policy, covering research published from 1995 to February 2023 across 18 policy classes, gives its highest rating, supportive evidence, to child-access prevention (safe-storage) laws for reducing self-inflicted firearm injuries and deaths, unintentional firearm injuries and deaths, and firearm homicides among young people (with moderate evidence that they cut youth firearm suicides specifically), and to raising the minimum purchase age above the federal threshold for reducing youth firearm suicides. It finds moderate evidence that waiting periods reduce firearm suicides and total homicides.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Smart et al., 'The Science of Gun Policy, Fourth Edition,' RAND Health Quarterly 12(1) (December 2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11630101/",
          reasoning:
            "RAND applies the same evidence bar to every law, and 'supportive' requires consistent results across at least three studies. The strongest findings are for young people and for narrow laws, which supports targeted measures more than broad ones.",
        },
        {
          id: "red-flag-laws",
          title: "Red Flag Laws: Indiana's Gun Suicides 7.5% Below Its Comparison, Evidence Rated 'Limited'",
          description:
            "In the decade after Indiana enacted its extreme-risk protection order (ERPO) law in 2006, its firearm suicide rate was about 7.5% lower than that of a synthetic comparison state, which RAND calls 'a suggestive decline' (Kivisto & Phalen, 2018). The same study found larger but imprecise declines in Connecticut after enforcement stepped up in 2007, with uncertain effects on non-firearm suicide. A multi-state study (Dalafave, 2021) found reductions of about 4% in total suicides and 6% in firearm suicides. RAND concludes there is 'limited evidence that extreme-risk protection orders reduce total and firearm suicides.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source:
            "RAND, 'Effects of Extreme Risk Protection Orders on Suicide' (Gun Policy in America), reviewing Kivisto & Phalen (2018) and Dalafave (2021)",
          sourceUrl:
            "https://www.rand.org/research/gun-policy/analysis/extreme-risk-protection-orders/suicide.html",
          reasoning:
            "Suicide is easier to study than rare mass shootings, but RAND classifies the evidence as limited: the main study could evaluate only two states, and the effect on non-firearm suicide was uncertain, so replicability is lowered and the effect size is uncertain.",
        },
        {
          id: "kleck-total-suicide",
          title: "Kleck 2019: Gun Prevalence Affects Gun Suicides but Not Total Suicides",
          description:
            "Reviewing earlier macro-level research, criminologist Gary Kleck found that prior studies relied on small samples of large, mixed units, weak measures of gun prevalence and few controls. He concluded that 'the methodologically soundest prior research indicates that gun prevalence affects rates of gun suicides, but not total suicides,' and his new state-level analysis, using direct survey measures of gun ownership, likewise found no significant effect of gun prevalence on total suicide rates.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source:
            "Gary Kleck, 'Macro-Level Research on the Effect of Firearms Prevalence on Suicide Rates: A Systematic Review and New Evidence,' Social Science Quarterly 100(3), 936-950 (2019)",
          sourceUrl: "https://ideas.repec.org/a/bla/socsci/v100y2019i3p936-950.html",
          reasoning:
            "The strongest published case for substitution, from a peer-reviewed journal. It is a cross-sectional comparison of states, a weaker design than the California cohort, which followed individuals and found no rise in other methods among new handgun owners. It is still the best published evidence that total suicides may not follow gun access.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Which state laws move homicide?
    // =========================================================================
    {
      id: "state-laws-homicide",
      title: "Which State Laws Move Homicide?",
      short_summary:
        "States run the experiments: some require a permit to buy a handgun, most now let adults carry without one. RAND finds evidence that looser carry laws raise homicide and that background checks lower it, but rates most laws inconclusive. Meanwhile murder fell 21% in big cities in 2025 and kept falling in 2026, under both strict and loose regimes.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The best evidence is that almost nothing on the gun-control wish list has been shown to work. RAND's 2024 review, the most careful in the field, rates the evidence on assault-weapon bans and sales registration as inconclusive, and finds only limited evidence that licensing laws reduce homicide. The famous Connecticut permit study built its 'synthetic Connecticut' from a comparison group that was 72% Rhode Island, and similar drops in gun murder happened in most other states. And the biggest change in American violence in decades has nothing to do with gun law: homicide in large cities fell 21% in 2025 and another 18% in the first half of 2026, putting the national rate on course for its lowest level since 1900, while no new federal gun restriction passed. Policing, the end of the pandemic and community violence programs explain murder better than gun statutes do.",
      proponent_rebuttal:
        "Where states have changed gun laws, homicide has moved in the direction the laws predict. RAND's 2024 review finds supportive evidence, its highest rating, that stand-your-ground laws increase firearm homicides and that shall-issue carry laws increase total homicides, firearm homicides and violent crime; and moderate evidence that dealer background checks reduce firearm homicides. A synthetic-control study of right-to-carry laws estimated violent crime 13% to 15% higher ten years after adoption. Connecticut's 1995 handgun permit-to-purchase law was associated with a 40% fall in firearm homicides over ten years, about 296 fewer deaths, with no matching fall in other homicides. The 2025-26 drop in murder is welcome, but a falling national tide does not show that state laws make no difference to how high it runs in each state.",
      crux: {
        id: "state-law-homicide-effects",
        title: "The State Law Homicide Test",
        question:
          "Do permit-to-buy and background-check laws cut gun homicides, and do looser carry laws raise them?",
        description:
          "Compare states that tightened or loosened purchase and carry laws with similar states that did not, over long enough periods to see effects, and check that results hold across methods and comparison groups.",
        methodology:
          "Difference-in-differences and synthetic-control studies of permit-to-purchase, universal background check, shall-issue, permitless-carry and stand-your-ground laws, with pre-trend tests, sensitivity to the choice of comparison states, and the 2022-2026 homicide decline as a common shock.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Studies of states that adopted permitless carry since 2015 or repealed purchase permits, compared with similar states that did not, run by teams with opposing priors on the same data and comparison rules agreed in advance.",
        },
        cost_to_verify: "$100K-$300K (public crime and mortality data)",
        falsification: {
          supporter_flip:
            "If studies of the states that adopted permitless carry since 2015 found no rise in homicide or violent crime against matched states, and permit-to-buy effects vanished under other reasonable comparison groups, the case that state laws drive homicide would weaken.",
          skeptic_flip:
            "If those studies found homicide rising after looser carry laws and falling after permit-to-buy laws, across methods and comparison groups, the claim that gun statutes do not move murder would be hard to hold.",
          common_ground:
            "Both sides agree homicide fell sharply after 2021, by 21% in large cities in 2025 and another 18% in the first half of 2026, and that RAND rates the evidence on most gun laws as limited or inconclusive.",
          live_disagreement:
            "Whether the laws with the strongest evidence, on carry rules, background checks and permits, change homicide enough to matter, or whether policing, social conditions and the post-pandemic recovery dwarf them.",
        },
      },
      evidence: [
        {
          id: "rand-shall-issue-syg",
          title: "RAND 2024: 'Supportive' Evidence That Stand-Your-Ground and Shall-Issue Laws Raise Homicide",
          description:
            "RAND's fourth edition finds supportive evidence, its highest rating, that stand-your-ground laws are associated with increases in firearm homicides, and that shall-issue concealed-carry laws are linked to increased total homicides, firearm homicides and violent crime. It finds moderate evidence that dealer background checks reduce firearm homicides, and that checks covering both dealer and private sales reduce total homicides. Most other policy-outcome pairs it rates limited or inconclusive.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Smart et al., 'The Science of Gun Policy, Fourth Edition,' RAND Health Quarterly 12(1) (December 2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11630101/",
          reasoning:
            "The firmest findings in the field point to looser laws costing lives. The review covers research only through February 2023, before most permitless-carry states had several years of data, and its rating of 'inconclusive' on many popular proposals is just as much a part of the record.",
        },
        {
          id: "donohue-rtc",
          title: "Donohue 2019: Violent Crime 13-15% Higher Ten Years After Right-to-Carry Laws",
          description:
            "Using state panel data through 2014, John Donohue, Abhay Aneja and Kyle Weber found that right-to-carry concealed handgun laws significantly increase overall violent crime. Their synthetic-control analysis estimated violent crime about 13% to 15% higher ten years after adoption. They estimated the average adopting state would need to roughly double its prison population to offset the added crime.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Donohue, Aneja & Weber, 'Right-to-Carry Laws and Violent Crime,' Journal of Empirical Legal Studies 16(2) (2019); NBER Working Paper 23510",
          sourceUrl: "https://nber.org/papers/w23510",
          reasoning:
            "Peer-reviewed, and it reverses the 1990s 'more guns, less crime' finding, whose model failed the parallel-trends test that Donohue's preferred model passes. The data stop in 2014, before most states moved to permitless carry, a further step from shall-issue.",
        },
        {
          id: "connecticut-ptp",
          title: "Connecticut's 1995 Permit-to-Purchase Law: 40% Fewer Gun Homicides Over 10 Years",
          description:
            "Comparing Connecticut with a synthetic control built from other states, Kara Rudolph, Daniel Webster and colleagues estimated the handgun permit-to-purchase law was associated with a 40% reduction in firearm homicide rates during its first ten years, about 296 fewer firearm homicides from 1996 to 2005. They found no evidence of a reduction in non-firearm homicides.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source:
            "Rudolph, Stuart, Vernick & Webster, 'Association Between Connecticut's Permit-to-Purchase Handgun Law and Homicides,' American Journal of Public Health 105(8) (2015)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4504296",
          reasoning:
            "A direct test of one law, and the flat non-gun homicide trend argues against a general crime decline. But it is one state, and critics note the synthetic Connecticut was 72% Rhode Island, so the estimate rests heavily on one comparison.",
        },
        {
          id: "homicide-decline-2025-26",
          title: "CCJ 2026: Big-City Homicide Fell 21% in 2025 and 18% More in the First Half of 2026",
          description:
            "The Council on Criminal Justice found the average homicide rate in its 35 study cities was 21% lower in 2025 than in 2024, falling in 31 of them. In the first half of 2026 it was 18% lower again, and 51% below the 2022 rate; the authors expect the 2026 national rate 'will very likely continue to be below levels not seen since 1900', pending FBI data. They add that 'There is no single or easy explanation for these historic lows.' Gun assaults fell 22% in 2025.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source:
            "Council on Criminal Justice, 'Crime Trends in U.S. Cities: Year-End 2025 Update' (January 2026) and 'Mid-Year 2026 Update' (July 2026)",
          sourceUrl: "https://counciloncj.org/crime-trends-in-u-s-cities-mid-year-2026-update/",
          reasoning:
            "The fastest fall in murder on record came without new federal gun restrictions, which shows that other forces can move homicide more than any statute studied. It does not show that state gun laws have no effect: the decline happened in strict and loose states alike, and CCJ itself says the report is not evidence of any policy's success or failure.",
        },
        {
          id: "ct-synthetic-critique",
          title: "Critics: 'Synthetic Connecticut' Was 72% Rhode Island, and Other States Saw Similar Drops",
          description:
            "Writing in Reason in June 2015, Brian Doherty noted that the synthetic comparison state in the Connecticut permit study 'ends up being 72 percent Rhode Island, with a mix of Maryland and California tossed in,' and that 'very similar gun murder rate drops happened in most other states' during the same period. RAND's 2024 review finds only limited evidence that licensing and permitting laws reduce homicides, and inconclusive evidence on suicide.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Brian Doherty, '5 Problems with the New Study 'Proving' that More Background Checks Lowered Connecticut's Gun Murder Rate by 40 Percent,' Reason (24 June 2015); RAND, The Science of Gun Policy, 4th ed. (2024)",
          sourceUrl: "https://reason.com/2015/06/24/5-questions-about-the-new-study-purporti/",
          reasoning:
            "An opinion magazine, not a peer-reviewed reanalysis, so reliability is low. The point it makes about how much one comparison state drives the result is a real methodological concern, and RAND's 'limited' rating for licensing shows the field has not settled it.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Mass shootings and the guns used in them
    // =========================================================================
    {
      id: "mass-shooting-prevention",
      title: "Mass Shootings: Does the Weapon Matter?",
      short_summary:
        "Mass shootings are a small share of gun deaths, 510 of about 44,000 in 2024 by the broadest count, but they drive the politics. Attacks with large-capacity magazines kill more people. Whether bans on assault weapons and large magazines lower the toll, or attackers switch weapons, is unresolved.",
      image_url:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Assault-weapon bans target the guns least used in crime. Before the 1994 federal ban, assault weapons were rarely used in gun crimes, and the evaluation the Justice Department funded concluded that if renewed, the ban's effects on gun violence 'are likely to be small at best and perhaps too small for reliable measurement.' Of the 11,717 gun murders the FBI tallied for 2024, rifles of every kind were involved in 3% and handguns in 53%; most of the rest did not record the type. About 24.6 million Americans own AR-15-style rifles, up to 44 million of them, and there are up to 542 million magazines holding more than ten rounds: these are among the most common guns in the country. In 74% of the mass shootings in Mother Jones' database from 1982 to 2019, the guns were obtained legally, so most shooters would pass any background check. RAND rates the evidence on assault-weapon bans as inconclusive.",
      proponent_rebuttal:
        "The weapon sets the death toll. In high-fatality mass shootings from 1990 to 2017, attacks with large-capacity magazines had a 62% higher average death toll, and states without a magazine ban had more than double the rate of such shootings and more than three times the deaths. Across US mass shootings from 2016 to 2025, Everytown found incidents involving assault weapons or large magazines averaged 24.4 people shot, against 5.6 when neither was used. Large magazines let a shooter fire for longer before reloading, and reloads are when victims flee and bystanders tackle the shooter. The 1994 ban exempted millions of guns and magazines already owned and expired after ten years, so it never had a fair test. Most shooters buying legally is an argument for changing what is legal to buy.",
      crux: {
        id: "assault-weapon-lethality",
        title: "The Weapon-and-Magazine Test",
        question:
          "Do limits on assault weapons and large magazines cut mass-shooting casualties, or do attackers substitute?",
        description:
          "Compare mass shootings by weapon and magazine type, and compare states with and without magazine and assault-weapon bans, to see whether the death toll per attack and the number of attacks fall where the weapons are restricted.",
        methodology:
          "Analyse all US mass shootings (4+ killed, and 6+ killed) by weapon and magazine type, adjusting for location, target and police response time; and run state panel studies of magazine and assault-weapon bans with controls, testing sensitivity to the fatality threshold used.",
        equation:
          "E[\\text{casualties} | \\text{AR-style}] vs E[\\text{casualties} | \\text{handgun}]",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Every US mass shooting with four or more victims sorted by weapon and magazine type, comparing casualties per incident after adjusting for location and police response time, plus state panel studies of magazine bans tested at more than one fatality threshold.",
        },
        cost_to_verify: "$50K (Database analysis)",
        falsification: {
          supporter_flip:
            "If incident-level analysis showed shooters with handguns and standard magazines killing as many people once target, location and police response are held equal, and state magazine bans showed no effect at lower fatality thresholds, the case for those limits would weaken.",
          skeptic_flip:
            "If the higher death tolls with large magazines held after adjusting for target and response time, and magazine-ban states kept recording fewer high-fatality attacks, the view that weapon type does not affect lethality would be hard to hold.",
          common_ground:
            "Both sides agree mass shootings are a small share of US gun deaths, that most mass shooters obtain their guns legally (74% of shootings in one count), and that the 1994 federal ban exempted the millions of guns and magazines already owned.",
          live_disagreement:
            "Whether restricting assault weapons and large magazines lowers mass-shooting casualties, or whether attackers substitute other weapons with similar results; and whether banning guns that millions of law-abiding owners keep is a fair price for that gain.",
        },
      },
      evidence: [
        {
          id: "lcm-ban-study",
          title: "AJPH 2019: States Without Magazine Bans Had Double the Rate of High-Fatality Mass Shootings",
          description:
            "Louis Klarevas, Andrew Conner and David Hemenway analysed the 69 high-fatality mass shootings (six or more killed) in the US from 1990 to 2017. Attacks involving large-capacity magazines had a 62% higher mean death toll. The incidence of these shootings in states without a magazine ban was more than double the rate in ban states, and annual deaths more than three times higher. They concluded that magazine bans 'appear to reduce both the incidence of, and number of people killed in, high-fatality mass shootings.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source:
            "Klarevas, Conner & Hemenway, 'The Effect of Large-Capacity Magazine Bans on High-Fatality Mass Shootings, 1990-2017,' American Journal of Public Health 109(12) (2019)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6836798/",
          reasoning:
            "Peer-reviewed, with ten controls and state fixed effects. It rests on 69 events, so a few shootings can move the result, and critics question the six-death threshold. RAND rates the evidence that magazine bans reduce mass shootings as limited.",
        },
        {
          id: "assault-weapon-casualties",
          title: "Everytown 2016-2025: 24.4 Shot per Mass Shooting With Assault Weapons or Large Magazines, 5.6 Without",
          description:
            "Across US mass shootings (four or more killed) from 2016 to 2025, Everytown counted 52 incidents involving an assault weapon or high-capacity magazine, with 482 killed and 785 wounded, an average of 9.3 killed and 24.4 shot per incident. The 178 incidents involving neither left 799 killed and 198 wounded, an average of 5.6 shot per incident (about 4.5 killed). All 10 of the highest-casualty mass shootings since 2016 involved both an assault weapon and a high-capacity magazine.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 7,
            directness: 8,
          },
          source: "Everytown Research (advocacy org), 'Assault Weapons and High-Capacity Magazines' (updated 24 June 2026), 2016-2025 data",
          sourceUrl:
            "https://everytownresearch.org/report/assault-weapons-and-high-capacity-magazines/",
          reasoning:
            "A large gap, but from a gun-control advocacy group, not peer-reviewed, and not adjusted for target or setting. It shows that attacks with these guns are deadlier, not what a ban would change.",
        },
        {
          id: "koper-awb-1994",
          title: "Justice Department-Funded Study 2004: Renewed Ban's Effects 'Likely to Be Small at Best'",
          description:
            "The federally funded evaluation of the 1994-2004 assault weapons ban found the share of gun crimes involving assault weapons fell 17% to 72% in the cities studied, mostly through fewer assault pistols. But use of other guns with large magazines held steady or rose, because millions of pre-ban magazines were exempt. Christopher Koper concluded 'we cannot clearly credit the ban with any of the nation's recent drop in gun violence' and that, if renewed, its effects 'are likely to be small at best and perhaps too small for reliable measurement.' Assault weapons were rarely used in gun crimes even before the ban.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Christopher S. Koper, 'An Updated Assessment of the Federal Assault Weapons Ban: Impacts on Gun Markets and Gun Violence, 1994-2003,' report to the National Institute of Justice (2004)",
          sourceUrl: "https://www.ojp.gov/pdffiles1/nij/grants/204431.pdf",
          reasoning:
            "The official evaluation of the only federal ban. It is about total gun violence, where assault weapons are rare; Koper noted that large magazines matter more and that the exemptions meant effects would come slowly. It says little about the deadliest mass shootings specifically.",
        },
        {
          id: "background-check-pass",
          title: "Mother Jones Data: 74% of Mass Shootings Since 1982 Involved Legally Obtained Guns",
          description:
            "A 2019 public-radio analysis of Mother Jones' database found that of the 114 US mass shootings since 1982, 85 (74%) 'involved firearms obtained by legal means'; in 12 the source of the guns was unknown. That implies most perpetrators passed (or would have passed) a background check.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "Luis Melgar & Lisa Dunn, 'Since 1982, 74 Percent Of Mass Shooters Obtained Their Guns Legally,' Guns & America / KCUR (13 August 2019), from the Mother Jones US Mass Shootings Database",
          sourceUrl:
            "https://www.kcur.org/2019-08-13/since-1982-74-percent-of-mass-shooters-obtained-their-guns-legally",
          reasoning:
            "Limits what background-check expansion can do about this kind of attack. It is a journalistic compilation with a narrow definition of mass shooting, and it says nothing about laws that restrict what may be bought.",
        },
        {
          id: "ar15-ownership-common",
          title: "2021 Survey: 24.6 Million Americans Have Owned AR-15-Style Rifles",
          description:
            "William English's 2021 National Firearms Survey estimated that 30.2% of gun owners, about 24.6 million people, have owned an AR-15 or similarly styled rifle (up to 44 million such rifles in total), and that 48.0%, about 39 million people, have owned magazines holding more than 10 rounds (up to 542 million such magazines).",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 4,
            directness: 5,
          },
          source:
            "William English, '2021 National Firearms Survey: Updated Analysis Including Types of Firearms Owned' (Georgetown McDonough School of Business Research Paper, SSRN, May 2022); filed in September 2024 as an exhibit to the Illinois state defendants' motion to preclude it in Barnett v. Raoul (S.D. Ill.)",
          sourceUrl:
            "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4109494",
          reasoning:
            "If roughly right, a ban would reach tens of millions of lawful owners and a stockpile no buyback could quickly retire, and courts weigh how common a weapon is when deciding whether it is protected. The survey has been used in litigation against gun laws, states defending those laws have asked courts to exclude it, and its online sample is contested, so the weights are low.",
        },
      ],
    },
  ],
  aliases: [
    "Do stricter gun laws significantly reduce gun violence and mass shootings?",
    "Does gun control work?",
    "Would an assault weapons ban reduce mass shootings?",
  ],
  references: [
    {
      title: "What the data says about gun deaths in the U.S. - Pew Research Center (28 April 2026)",
      url: "https://www.pewresearch.org/short-reads/2026/04/28/what-the-data-says-about-gun-deaths-in-the-us/",
    },
    {
      title: "The Science of Gun Policy, Fourth Edition - RAND Health Quarterly (December 2024)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11630101/",
    },
    {
      title: "Crime Trends in U.S. Cities: Mid-Year 2026 Update - Council on Criminal Justice (July 2026)",
      url: "https://counciloncj.org/crime-trends-in-u-s-cities-mid-year-2026-update/",
    },
    {
      title: "Crime Trends in U.S. Cities: Year-End 2025 Update - Council on Criminal Justice (January 2026)",
      url: "https://counciloncj.org/crime-trends-in-u-s-cities-year-end-2025-update/",
    },
  ],
};
