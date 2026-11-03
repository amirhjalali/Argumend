export const minimumWageEffectsData = {
  id: "minimum-wage-effects",
  title: "Raising the Minimum Wage",
  question:
    "Would a $15 federal minimum wage help workers without costing many jobs?",
  aliases: [
    "Should the federal minimum wage be raised?",
    "Does raising the minimum wage kill jobs?",
    "Raise the Wage Act",
    "Hawley-Welch $15 minimum wage bill",
    "California $20 fast-food minimum wage",
  ],
  meta_claim:
    "Raising the federal minimum wage to $15/hour or higher would significantly benefit low-wage workers without causing substantial job losses.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: the federal minimum is still $7.25 (since 24 July
  // 2009). The Labor Department's state table (updated 1 July 2026) lists 17
  // states at $15 or more and 17 paying $7.25 or relying on it. Oklahoma
  // voters rejected a $15-by-2029 question on 16 June 2026. Two federal bills
  // sit in committee: Hawley-Welch ($15, indexed, June 2025) and the Raise the
  // Wage Act ($17 by 2030, April 2025). Clemens et al.'s two-year estimate
  // for California's $20 fast-food wage was revised in October 2026.
  last_updated: "2026-11-03",
  keystone_fact: {
    statement:
      "The federal minimum wage has been $7.25 an hour since 24 July 2009. Prices have risen 56% since then, so it buys what $4.63 did that summer. As of July 2026, 17 states still pay $7.25 or rely on it, while 17 others pay $15 or more, up to $17.13 in Washington. A $15 national floor would mean $7.75 more an hour, about $16,000 a year for a full-time worker. The fight is over how many of those jobs would survive it where pay is lowest.",
    confidence: 90,
    source:
      "US Department of Labor, State Minimum Wage Laws (updated 1 July 2026) and federal minimum wage history; BLS CPI-U via FRED (July 2009 to September 2026)",
    sourceUrl: "https://www.dol.gov/agencies/whd/minimum-wage/state",
  },
  simple_case: [
    "Both sides accept that some minimum wage is high enough to cut jobs, and that the federal $7.25 now binds for few workers: 1.0% of hourly workers, about 843,000 people, were paid $7.25 or less in 2024, 43% of them under 25.",
    "They split over four things: whether the raises of the past 30 years cost jobs at all; whether $15 would cost many where it binds hardest, in low-wage states; how much of a raise reaches poor families rather than teenagers, second earners or higher prices; and whether one national floor should apply in Mississippi and Massachusetts alike.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The record of past increases (new, 2026-11-03)
    // =========================================================================
    {
      id: "past-increases",
      title: "What past raises did",
      short_summary:
        "For 30 years economists have fought over the same data. Card and Krueger found New Jersey's 1992 raise cost no fast-food jobs; Neumark and Wascher, using payroll records, found a 4.6% relative drop. Cengiz and co-authors found 138 state increases left the number of low-wage jobs unchanged; Neumark and Shirley's survey of the literature finds a clear majority of negative estimates. Most of these raises were modest.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The headline job-loss prediction has not shown up in the best natural experiments. When New Jersey raised its minimum to $5.05 in 1992, Card and Krueger found fast-food employment held up against Pennsylvania's, and when they redid the test with the government's own payroll data in 2000, New Jersey's employment grew as fast or slightly faster. Cengiz, Dube, Lindner and Zipperer counted jobs around 138 state increases: jobs paying below the new minimum disappeared, but almost as many appeared just above it, and the number of low-wage jobs was essentially unchanged five years later. Employers have other margins: lower turnover, fewer vacancies, slightly higher prices, thinner profits. Where a few employers dominate hiring, a higher floor can even draw more people into work.",
      proponent_rebuttal:
        "The no-effect studies are the famous ones, not the typical ones. Neumark and Wascher re-ran New Jersey with payroll records from 230 restaurants and found employment fell 4.6% relative to Pennsylvania, an elasticity of -0.24, against a 17.6% rise in Card and Krueger's phone survey. Surveying the US literature, Neumark and Shirley find a clear preponderance of negative estimates, stronger for teenagers, young adults and the less educated, and strongest in studies that track the workers a raise actually affects. Studies of whole industries find less, because an industry can keep its headcount while replacing the least skilled workers it was meant to help. And Cengiz's 138 increases were far smaller jumps than the 107% rise from $7.25 to $15.",
      crux: {
        id: "moderate-increase-record",
        title: "The Past-Increases Ledger",
        question:
          "Did the minimum-wage increases of the past 30 years cost low-wage jobs?",
        description:
          "Decide what the US record of state and federal increases since 1979 shows about jobs for the workers who earn near the minimum. The studies disagree about data (phone surveys or payroll records), about comparison groups (neighbouring counties, synthetic controls, or the whole country) and about whom to count (teenagers, restaurant workers, or everyone paid below the new floor).",
        methodology:
          "Pool the state increases since 1979 and estimate employment and hours for workers earning below the new minimum, using bunching, border-county and synthetic-control designs on the same data. Pre-register the samples and specifications, and have teams from both literatures run them.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A pre-registered re-analysis of state increases since 1979, run by researchers from both camps on the same payroll and survey data, reporting jobs and hours for teenagers and for all workers paid below the new floor under bunching, border-county and synthetic-control designs.",
        },
        cost_to_verify: "$200K (re-analysis of existing state employment data)",
        falsification: {
          supporter_flip:
            "If a shared, pre-registered re-analysis found job or hours losses for workers paid near the minimum across most designs, the near-zero reading of past raises would fail.",
          skeptic_flip:
            "If the shared re-analysis found no loss of jobs or hours for teenagers and for workers paid below the new floor across designs, the negative studies would look like artifacts of their comparison groups.",
          common_ground:
            "Some minimum wage is high enough to cut jobs. The increases studied most were modest ones, from low bases, so they say less about $15 than either side would like.",
          live_disagreement:
            "Whether the modest raises of the past cost jobs for the least-skilled workers they cover, or mainly moved those workers up the pay scale.",
        },
      },
      evidence: [
        {
          id: "card-krueger-nj-study",
          title:
            "Card & Krueger 1994: New Jersey's raise to $5.05 cost no fast-food jobs, and government payroll data in 2000 agreed",
          description:
            "New Jersey raised its minimum from $4.25 to $5.05 in April 1992 while Pennsylvania did not. Surveying fast-food restaurants by phone, Card and Krueger found no fall in New Jersey employment relative to Pennsylvania. Answering critics in 2000 with the Bureau of Labor Statistics' ES-202 payroll data, they found similar or slightly faster employment growth in New Jersey, and no relative job loss in Pennsylvania after the 1996 federal increase that hit it but not New Jersey.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Card & Krueger, American Economic Review 84(4) (1994); Card & Krueger, 'Reply,' American Economic Review 90(5): 1397-1420 (2000), NBER Working Paper 6386",
          sourceUrl: "https://www.nber.org/papers/w6386",
          reasoning:
            "The study that started the modern debate, re-tested with government payroll data. It covers one modest increase in one industry in one region, so directness for a $15 national floor is limited.",
        },
        {
          id: "neumark-wascher-payroll",
          title:
            "Neumark & Wascher: payroll records from 230 restaurants showed New Jersey employment fell 4.6% relative to Pennsylvania",
          description:
            "Re-evaluating Card and Krueger's experiment with payroll records from 230 Burger King, KFC, Wendy's and Roy Rogers restaurants, Neumark and Wascher found a 4.6% decrease in New Jersey employment relative to Pennsylvania, statistically significant, with an employment elasticity of -0.24. Card and Krueger's phone data had shown a 17.6% relative increase, with a spread of employment changes three times as large as in the payroll data.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Neumark & Wascher, NBER Working Paper 5224 (1995); published as 'Comment,' American Economic Review 90(5): 1362-1396 (2000)",
          sourceUrl: "https://www.nber.org/papers/w5224",
          reasoning:
            "Better data on hours and staff than a phone survey. Card and Krueger's reply traced the gap to a small set of restaurants owned by one franchisee, so the sample is contested; like the original, it covers one modest raise.",
        },
        {
          id: "cengiz-dube-bunching-analysis",
          title:
            "Cengiz et al. 2019: after 138 state increases, the number of low-wage jobs was unchanged five years later",
          description:
            "Cengiz, Dube, Lindner and Zipperer studied 138 state minimum-wage increases from 1979 to 2016 with a bunching estimator: they counted jobs lost just below the new minimum and jobs gained at or just above it. Jobs paying below the new minimum fell sharply, but almost as many appeared just above it, so the total number of low-wage jobs was essentially unchanged for five years after each increase.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Cengiz, Dube, Lindner & Zipperer, Quarterly Journal of Economics 134(3), 2019, pp. 1405–1454",
          sourceUrl:
            "https://academic.oup.com/qje/article-abstract/134/3/1405/5484905",
          reasoning:
            "Peer-reviewed in a top journal, with a large sample and a design that tracks where jobs go. The increases studied were historically modest, not $7.25 to $15, so directness for this map's question is trimmed.",
        },
        {
          id: "neumark-shirley-review",
          title:
            "Neumark & Shirley 2022: US minimum-wage studies show a clear preponderance of negative job estimates, strongest for directly affected workers",
          description:
            "Neumark and Shirley collected the US studies of state and local minimum-wage variation since the early 1990s and identified each one's preferred estimate, often with the original authors' help. They conclude there is a clear preponderance of negative estimates; the evidence is stronger for teens, young adults and the less educated; it points even more strongly to job losses in studies of directly affected workers; and studies of low-wage industries are less one-sided.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "Neumark & Shirley, 'Myth or Measurement,' Industrial Relations 61(4): 384-417 (2022); NBER Working Paper 28388",
          sourceUrl: "https://econpapers.repec.org/RePEc:nbr:nberwo:28388",
          reasoning:
            "A systematic tally by one side's leading researcher, which lowers independence. It counts studies rather than weighing their designs, and the studies it counts are mostly of modest increases.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: $15 where pay is lowest (id kept: paste crux eval)
    // =========================================================================
    {
      id: "employment-effects",
      title: "Jobs at $15 where pay is lowest",
      short_summary:
        "A $15 floor would barely touch Seattle and would more than double pay in rural Mississippi. The closest tests of a high minimum are Seattle's step to $13 in 2016 and California's $20 fast-food wage in 2024, and both are disputed. The Congressional Budget Office's estimate for $15 spans roughly zero to 3.7 million jobs lost.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The high-minimum experiments have not produced the collapse that was predicted. California raised fast-food pay to $20 in April 2024, 69% of the state's median full-time wage; Reich and Sosinskiy found average weekly wages for covered workers rose 10 to 11% with no reduction in employment, and prices rose 2.1%, about 8 cents on a $4 item. In Seattle, the University of Washington team's own method finds an effect of zero on restaurant employment, the sector most earlier studies used. Seventeen states have gone to $15 or more on their own. A federal floor phased in over several years gives employers in low-wage states time to adjust.",
      proponent_rebuttal:
        "Low-wage places are where $15 bites, and the evidence from high minimums points to losses. Using administrative data on hours, the University of Washington team found Seattle's step to $13 in 2016 raised hourly wages in low-wage jobs by about 3% but cut hours by 6 to 7%, lowering pay for those jobs by an average of $74 a month. Clemens, Edwards, Meer and Nguyen estimate California's $20 fast-food wage cut employment in the sector by about 3% after one year and about 3.5% after two, relative to the rest of the country. CBO's median estimate for $15 by 2025 was 1.4 million fewer jobs. A rural diner in Mississippi cannot raise prices like a burger chain in Los Angeles; it cuts shifts, or it closes.",
      crux: {
        id: "employment-elasticity-measurement",
        title: "Employment Elasticity at High Minimum Wage Levels",
        question:
          "Does a minimum wage that is high relative to local wages, like $15 in a low-cost region, cost jobs?",
        description:
          "Determine how jobs and hours respond when the minimum wage is high relative to local pay, as $15 would be in rural Mississippi or Alabama, rather than the modest raises most studies cover. The closest evidence is Seattle's climb past $13 and $15, California's $20 fast-food wage, and states that have gone to $15. Count both lost jobs and slower hiring, and hours as well as headcount.",
        methodology:
          "Natural experiments comparing employment trends in counties/states that raised minimum wages to $15+ versus neighboring jurisdictions that did not. Use synthetic control methods and border discontinuity designs.",
        equation:
          "\\epsilon = \\frac{\\%\\Delta \\text{Employment}}{\\%\\Delta \\text{Minimum Wage}}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compare employment and hours in low-wage regions that adopted a minimum wage high relative to local pay with similar regions that did not, counting both job losses and slower hiring, as studies of recent state and city increases can.",
        },
        cost_to_verify: "$200K (Analysis of existing state/county employment data)",
        falsification: {
          supporter_flip:
            "If studies of large increases in low-wage places, such as $15 against a low local median, found sizable losses of jobs and hours, the claim that $15 costs few jobs would fail where it matters most.",
          skeptic_flip:
            "If increases as large relative to local pay as $15 would be in Mississippi showed the near-zero job effects found for modest raises, the prediction of large losses would lose its footing.",
          common_ground:
            "A $15 floor would bind far harder in low-wage states than in high-wage cities, and no US study has yet observed a minimum that high relative to local pay across a whole low-wage state.",
          live_disagreement:
            "How jobs and hours respond when the minimum is high relative to local wages, which data on Seattle, California and modest past increases cannot pin down for a low-wage state.",
        },
      },
      evidence: [
        {
          id: "seattle-minimum-wage-study",
          title:
            "Seattle 2016: the step to $13 cut hours in low-wage jobs 6-7% and pay per job by $74 a month (University of Washington)",
          description:
            "The University of Washington team used Washington's administrative records, which report hours. Seattle's second increase, to $13 in 2016, raised hourly wages in low-wage jobs by about 3% but cut hours worked in those jobs by 6 to 7%, so pay to low-wage jobs fell by an average of $74 a month per job. The first increase had more modest effects. Limited to restaurants, the sector earlier studies used, their method estimates an effect of zero.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Jardim, Long, Plotnick, van Inwegen, Vigdor & Wething, NBER Working Paper 23532 (2017)",
          sourceUrl: "https://www.nber.org/papers/w23532",
          reasoning:
            "One of the few studies of a high minimum with hours data. Seattle is a high-wage city, so $13 bit less there than $15 would in a low-wage state. Its zero estimate for restaurants shows how much the answer depends on which jobs a study counts.",
        },
        {
          id: "california-fast-food-nber",
          title:
            "California's $20 fast-food wage: employment about 3% below the counterfactual after one year, 3.5% after two (Clemens et al.)",
          description:
            "California raised the minimum for large fast-food chains from $16 to $20 an hour in April 2024. Comparing limited-service restaurant employment with the rest of the country, Clemens, Edwards, Meer and Nguyen estimate a median decline of 3% after one year in the Quarterly Census of Employment and Wages and 1.5% in the Quarterly Workforce Indicators, and about 3.5% in both after two years. An earlier version put the one-year loss at about 18,000 jobs.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Clemens, Edwards, Meer & Nguyen, 'Did California's Fast Food Minimum Wage Reduce Employment?', NBER Working Paper 34033 (July 2025, revised October 2026)",
          sourceUrl: "https://www.nber.org/papers/w34033",
          reasoning:
            "Uses official employment counts and two-year horizons. It is a working paper; the result depends on comparing California with the rest of the US over a period when California's economy and population grew slowly, which the Berkeley authors dispute.",
        },
        {
          id: "california-fast-food-berkeley",
          title:
            "California's $20 fast-food wage raised weekly pay 10-11% with no fall in employment; prices rose 2.1% (Reich & Sosinskiy)",
          description:
            "California's $20 floor for large chains equals 69% of the state's median full-time wage. Reich and Sosinskiy found average weekly wages for covered fast-food workers rose 10 to 11% and employment did not fall. Compared with control states, prices rose 2.1% two quarters after the policy, about 8 cents on a $4 item; employers passed on about 63% of the higher wage costs.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Reich & Sosinskiy, 'A $20 Minimum Wage: Effects on Wages, Employment and Prices,' UC Berkeley IRLE working paper (September 2025)",
          sourceUrl:
            "https://irle.berkeley.edu/publications/working-papers/sectoral-wage-setting-in-california/",
          reasoning:
            "A working paper from the centre most associated with the no-job-loss literature. It covers one high-wage state and one industry; a sector minimum in a large state is not the same as a national floor in a low-wage one.",
        },
        {
          id: "cbo-15-minimum-analysis",
          title:
            "CBO 2021: $15 by 2025 would raise pay for 17 million, lift 0.9 million out of poverty, and cut 1.4 million jobs (range: about 0 to 3.7 million)",
          description:
            "The Congressional Budget Office's February 2021 analysis of the Raise the Wage Act of 2021 (the federal minimum to $15 by June 2025) estimated it would directly raise wages for 17 million workers and lift 0.9 million people out of poverty, but reduce employment by 1.4 million workers in its median estimate. CBO judged a two-thirds chance the employment change would fall between roughly zero and 3.7 million jobs lost.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "Congressional Budget Office, 'The Budgetary Effects of the Raise the Wage Act of 2021' (Feb. 2021)",
          sourceUrl: "https://www.cbo.gov/publication/56975",
          reasoning:
            "Nonpartisan and the number both sides quote. The wide range is the honest part: CBO's median sits between the studies, and critics on each side say it leaned too far toward the other.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Who gets the money (id kept: paste crux eval)
    // =========================================================================
    {
      id: "poverty-economic-effects",
      title: "Who gets the money",
      short_summary:
        "Few workers earn exactly $7.25 now, but a $15 or $17 floor would reach tens of millions who earn more than that. Whether that money lands in poor households, or with teenagers and second earners in comfortable ones, and whether a tax credit would do the job better, is the second fight.",
      icon_name: "Target" as const,
      skeptic_premise:
        "A minimum wage is a poor anti-poverty tool. Only 1.0% of hourly workers were paid $7.25 or less in 2024, and 43% of them were under 25. A higher wage does nothing for a poor household with no one in work, and it reaches teenagers in comfortable homes as readily as parents in poor ones. The earned income tax credit targets families by income and size, rewards work, and puts no cost on employers or customers. Part of a higher wage comes back as higher prices, which low-income families pay too, and part is lost as shorter hours.",
      proponent_rebuttal:
        "The $7.25 count understates who would get a raise: the Economic Policy Institute estimates a $17 floor by 2030 would raise pay for about 22 million workers. They work in an economy where pay has not kept up with output: from 1979 to 2019, net productivity grew about 60% and typical hourly compensation about 16%. The EITC and the minimum wage work together, and a tax credit alone lets employers pay less, knowing taxpayers will make up the difference. CBO's own estimate put 0.9 million people out of poverty at $15.",
      crux: {
        id: "poverty-reduction-efficiency",
        title: "Minimum Wage vs. EITC Poverty Reduction Efficiency",
        question:
          "How much of a minimum-wage raise reaches poor households, and does it overlap the earned income tax credit?",
        description:
          "Comparing the poverty reduction efficiency of minimum wage increases versus Earned Income Tax Credit expansion, accounting for both direct effects and behavioral responses. Who are the workers paid under $15: teenagers in middle-class homes and second earners, or adults who are a family's main breadwinner?",
        methodology:
          "Simulate the poverty impact of a $15 minimum wage versus equivalent-cost EITC expansion using CPS microdata. Compare coverage, targeting accuracy, take-up rates, and behavioral responses (labor force participation, hours worked).",
        equation:
          "\\text{Efficiency} = \\frac{\\Delta \\text{Poverty Rate}}{\\text{Total Cost to Economy}}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Household survey and tax data, of the kind the Congressional Budget Office used in its 2019 estimates, showing what share of the extra pay from a minimum-wage increase reaches families below the poverty line, compared with the share for an EITC expansion of equal cost.",
        },
        cost_to_verify: "$150K (Microsimulation using existing survey data)",
        falsification: {
          supporter_flip:
            "If microsimulations showed the EITC cutting poverty far more per dollar than a minimum-wage increase, with wage gains largely lost to prices or shorter hours, the case for the minimum wage as a poverty tool would weaken.",
          skeptic_flip:
            "If microsimulations found the EITC lets employers push wages down, and that most workers paid under $15 live in low-income families, the EITC would look like a complement rather than a substitute.",
          common_ground:
            "The EITC is a well-targeted, work-rewarding anti-poverty tool, and many low-wage workers are adults supporting families, not teenagers.",
          live_disagreement:
            "How much of a minimum-wage raise reaches poor households, rather than teens, second earners and higher prices, and whether it complements or partly duplicates the EITC.",
        },
      },
      evidence: [
        {
          id: "raise-the-wage-22-million",
          title:
            "EPI estimate: a $17 federal minimum by 2030 would raise pay for about 22 million workers",
          description:
            "The Raise the Wage Act of 2025, introduced on 8 April 2025 by Senator Bernie Sanders and Representative Bobby Scott, would raise the federal minimum from $7.25 to $17 by 2030, index it to median wage growth, and phase out subminimum wages for tipped workers, teenagers and workers with disabilities. Citing Economic Policy Institute estimates, its sponsors say roughly 22 million workers would get a raise.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 7,
            directness: 6,
          },
          source:
            "Office of Rep. Bobby Scott, press release (8 April 2025), citing Economic Policy Institute estimates",
          sourceUrl:
            "https://bobbyscott.house.gov/media-center/press-releases/labor-leaders-introduce-bill-raise-minimum-wage-1",
          reasoning:
            "Shows how many workers earn between $7.25 and $17, which the narrow federal count misses. It comes from the bill's sponsors citing an advocacy institute, and counts raises, not net income after any lost hours or jobs.",
        },
        {
          id: "bls-wage-distribution",
          title:
            "BLS 2024: 1.0% of hourly workers, about 843,000, were paid $7.25 or less, and 43% of them were under 25",
          description:
            "The Bureau of Labor Statistics counted 82,000 hourly workers paid exactly $7.25 in 2024 and 760,000 paid less, mostly tipped workers and others legally exempt. Together that is 1.0% of hourly workers, down from 13.4% in 1979. Workers under 25 were one-fifth of hourly workers but 43% of those paid the federal minimum or less.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "BLS, 'Characteristics of Minimum Wage Workers, 2024'",
          sourceUrl: "https://www.bls.gov/opub/reports/minimum-wage/2024/home.htm",
          reasoning:
            "The official count. It shows how little the current federal floor binds and how young its workers skew; it does not describe the larger group a $15 floor would reach, so directness is moderate.",
        },
        {
          id: "productivity-wage-divergence",
          title:
            "EPI: from 1979 to 2019 net productivity grew about 60%, typical hourly pay about 16%",
          description:
            "Economic Policy Institute analysis of BLS and BEA data finds that from 1979 to 2019 net productivity grew about 59.7% while the typical worker's hourly compensation grew about 15.8%, productivity rising roughly 3.5 times as fast as pay. EPI argues that had the minimum wage tracked productivity since the late 1960s it would be far above $7.25.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 4,
          },
          source:
            "Economic Policy Institute, 'The Productivity–Pay Gap' (updated through 2019)",
          sourceUrl: "https://www.epi.org/productivity-pay-gap/",
          reasoning:
            "Built on government data by an advocacy think tank; the size of the gap depends on which price index and pay measure are used. It is an argument about fairness, not evidence about jobs or poverty at $15.",
        },
        {
          id: "eitc-comparison-effectiveness",
          title:
            "CBPP: the EITC lifted about 5.6 million people, including 3 million children, out of poverty in 2018",
          description:
            "Per the Center on Budget and Policy Priorities, the Earned Income Tax Credit lifted about 5.6 million people out of poverty in 2018, including roughly 3 million children. Unlike the minimum wage, the EITC targets benefits by family income and size, places no cost on employers, and rewards work. Some economists argue it reduces poverty more efficiently per dollar than a minimum-wage increase; many favor both.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Center on Budget and Policy Priorities, 'Policy Basics: The Earned Income Tax Credit' (2018 data)",
          sourceUrl:
            "https://www.cbpp.org/research/policy-basics-the-earned-income-tax-credit",
          reasoning:
            "Census- and IRS-based figures from a left-of-center think tank. It shows the EITC's reach; it does not show the minimum wage does less per dollar, and the two are not exclusive.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: One floor for the whole country? (new, 2026-11-03)
    // =========================================================================
    {
      id: "national-or-local-floor",
      title: "One floor for the whole country?",
      short_summary:
        "Washington pays $17.13; 17 states pay $7.25 or rely on it. A national $15 would leave the high-wage states untouched and remake pay in the low-wage South. Congress has two bills, Hawley-Welch at $15 and Raise the Wage at $17, and neither has moved; voters keep deciding it state by state, and in June 2026 Oklahoma said no.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "States are already setting their own floors, and the results fit their economies. Seventeen states pay $15 or more; others chose not to, and when Oklahoma voters were asked in June 2026 to go to $15 by 2029, with automatic inflation increases after that, 55% said no. A single national number cannot be right for both Seattle and rural Alabama: what is a modest floor in one is close to what a typical job pays in the other. The federal floor can stay low as a backstop while states and cities set the real level, or Congress can index it regionally rather than pick one figure.",
      proponent_rebuttal:
        "A national floor exists because the workers with the least bargaining power often live in the states least likely to raise it. Since July 2009 the federal $7.25 has lost 36% of its buying power, so standing still has been a pay cut every year for workers in the 17 states that use it. A $15 floor phased in over years, then indexed, is what both a Republican senator, Josh Hawley, and a Democrat, Peter Welch, proposed in June 2025. Lower living costs in the South are real, but a full-time job at $7.25 pays $15,080 a year before tax anywhere.",
      crux: {
        id: "one-floor-or-many",
        title: "The National-Floor Test",
        question:
          "Should Congress set one national minimum wage, or leave the real level to states and cities?",
        description:
          "Even with agreement on the job effects, people disagree on who should set the floor. A national minimum guarantees a level in every state, including those that would never raise it; local floors fit local wages and prices but leave workers in low-wage states at $7.25. Evidence can show how the bite of one national number varies by state and how state increases have turned out; the choice between a uniform guarantee and local choice is a value judgment.",
        methodology:
          "Map a proposed national floor against each state's median wage and cost of living to show where it binds. Compare employment, earnings and prices in border counties across states with different floors. Separate what evidence can show (the bite and its effects) from the choice of who decides.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Evidence can show how a national $15 compares with each state's median wage and living costs, and what state floors have done to jobs and pay along state borders. Whether workers in every state are owed the same floor, or each state should choose its own, is a value judgment no data makes for the reader.",
          kind: "value-difference" as const,
        },
        cost_to_verify:
          "State wage and price data are public; no study can choose between a national guarantee and local choice.",
        falsification: {
          supporter_flip:
            "If border-county comparisons found that a floor near a state's median wage cut jobs sharply in low-wage states while barely raising family incomes, a single high national number would be harder to defend.",
          skeptic_flip:
            "If border-county comparisons found low-wage states that raised floors toward $15 kept their jobs while raising family incomes, the case for leaving the level to each state would lose its practical footing.",
          common_ground:
            "The federal minimum has been $7.25 since July 2009 and has lost about a third of its buying power since; a $15 floor would bind far harder in some states than others.",
          live_disagreement:
            "Whether workers in every state are owed the same wage floor, set by Congress, or each state and city should set its own, with the federal floor as a low backstop.",
        },
      },
      evidence: [
        {
          id: "federal-floor-real-value",
          title:
            "Since July 2009 the federal $7.25 has lost 36% of its buying power: it buys what $4.63 did then",
          description:
            "The federal minimum rose to $7.25 on 24 July 2009 and has not changed since. The consumer price index (CPI-U) was 215.351 in July 2009 and 336.940 in September 2026, a 56% rise. In 2009 dollars, $7.25 is now worth about $4.63; keeping the 2009 buying power would take about $11.34 an hour. A full-time year at $7.25 (2,080 hours) pays $15,080.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 5,
          },
          source:
            "US Department of Labor, federal minimum wage history; BLS CPI-U (not seasonally adjusted) via FRED series CPIAUCNS; Argumend's arithmetic",
          sourceUrl: "https://fred.stlouisfed.org/series/CPIAUCNS",
          reasoning:
            "Official price data and simple arithmetic. It shows how far the federal floor has fallen in real terms; it says nothing about what level is right or what a higher floor would do to jobs.",
        },
        {
          id: "state-minimums-2026",
          title:
            "July 2026: 17 states and DC pay $15 or more; 17 states pay $7.25 or have no minimum of their own",
          description:
            "The Labor Department's state table, updated 1 July 2026, lists 17 states at $15 or more, led by Washington at $17.13, Connecticut at $16.94 and California at $16.90, plus the District of Columbia at $18.40. Twelve states set $7.25 and five (Alabama, Louisiana, Mississippi, South Carolina and Tennessee) have no state minimum, so the federal $7.25 applies.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 4,
          },
          source: "US Department of Labor, State Minimum Wage Laws (updated 1 July 2026)",
          sourceUrl: "https://www.dol.gov/agencies/whd/minimum-wage/state",
          reasoning:
            "Shows how differently states have chosen and how unevenly one national number would bind. It is a description of policy, not evidence of effects.",
        },
        {
          id: "oklahoma-sq-832",
          title: "Oklahoma voters rejected a $15-by-2029 minimum wage, 55.4% to 44.6%, in June 2026",
          description:
            "State Question 832 would have raised Oklahoma's minimum from $7.25 to $15 an hour by 2029, with automatic increases tied to national inflation after that. It failed in the 16 June 2026 primary, about 55.4% no to 44.6% yes. The Tulsa Regional Chamber said it supported raising wages but that indexing to national inflation rather than Oklahoma's economy was not balanced; the NFIB argued higher labor costs would mean higher prices and fewer entry-level jobs.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 3,
          },
          source: "FOX23 News (17 June 2026)",
          sourceUrl:
            "https://fox23.com/news/local/oklahomans-vote-no-to-state-question-832-minimum-wage-will-not-be-raised-06-17-2026",
          reasoning:
            "A vote shows what a low-wage state's voters chose, not what $15 would do there. It counts as evidence on who should decide, not on jobs.",
        },
      ],
    },
  ],
  references: [
    {
      title: "US Department of Labor: Federal minimum wage history chart",
      url: "https://www.dol.gov/agencies/whd/minimum-wage/history/chart",
    },
    {
      title: "S. 2013, Higher Wages for American Workers Act of 2025 (Hawley, Welch): $15, then indexed to inflation",
      url: "https://www.govinfo.gov/bulkdata/BILLS/119/1/s/BILLS-119s2013is.xml",
    },
    {
      title: "Card & Krueger, 'Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey and Pennsylvania,' AER (1994)",
      url: "https://www.jstor.org/stable/2118030",
    },
    {
      title: "KQED: California's $20 fast-food minimum wage sees no job loss, slight price hikes (first Reich-Sosinskiy estimate, 3.7% prices)",
      url: "https://www.kqed.org/news/12007150/californias-20-fast-food-minimum-wage-sees-no-job-loss-slight-price-hikes",
    },
  ],
};
