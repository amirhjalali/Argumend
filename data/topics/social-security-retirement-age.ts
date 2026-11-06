export const socialSecurityRetirementAgeData = {
  id: "social-security-retirement-age",
  title: "Raising the Retirement Age",
  question:
    "Should the retirement age be raised to keep Social Security solvent?",
  // The map's question before the round-15 rewrite stays findable.
  aliases: [
    "Is raising the retirement age a fair, necessary fix for Social Security?",
    "Should the full retirement age go up to 70?",
  ],
  meta_claim:
    "Raising the retirement age is a necessary and fair way to keep Social Security solvent.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: the Trustees' 2026 reports (released 9 June 2026)
  // put the retirement (OASI) fund's depletion in 2032 and the combined
  // funds' in 2034, with a 75-year shortfall of 4.42% of taxable payroll, up
  // from 3.82% a year earlier.
  // ── Stage 1: the fact shown above everything ──
  keystone_fact: {
    statement:
      "Social Security's trustees reported in June 2026 that its retirement fund runs dry in 2032, and the combined funds in 2034, when benefits would be cut about 17% automatically. CBO estimates raising the full retirement age to 70 would close about 35% of the 75-year gap; taxing wages above $250,000 would close about 70%. The fight is over who should carry the fix, and whether a later retirement age lands hardest on people who die younger.",
    confidence: 90,
    source:
      "Committee for a Responsible Federal Budget, 'Analysis of the 2026 Social Security Trustees' Report' (9 June 2026); CRFB, 'CBO's Options to Improve Social Security Solvency' (24 March 2025)",
    sourceUrl:
      "https://www.crfb.org/papers/analysis-2026-social-security-trustees-report",
  },
  // ── Stage 2: the crux-sheet lede ──
  simple_case: [
    "Anyone now in their late 50s will reach retirement around the date the trust funds run out. Unless Congress acts, benefits then fall automatically; CRFB puts the cut for a typical couple retiring in 2033 at $18,400 a year.",
    "A later retirement age is one way to close the gap. Higher payroll taxes and smaller benefits for richer retirees are others. Each puts the cost on different people.",
  ],
  last_updated: "2026-11-03",
  tags: ["social-security", "retirement", "fiscal-policy", "aging", "inequality"],
  pillars: [
    // =========================================================================
    // PILLAR 1: The shortfall — how much would a later retirement age fix?
    // =========================================================================
    {
      id: "fiscal-necessity",
      title: "The Shortfall: How Much Would It Fix?",
      short_summary:
        "The 75-year gap grew to 4.42% of taxable payroll in the 2026 report, driven mostly by lower fertility and immigration. A rise to 70 closes about a third of it; a payroll tax on wages above $250,000 closes about 70%.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A higher retirement age is neither necessary nor enough. CBO's own option, raising the age to 70, closes about 35% of the 75-year gap, leaving two-thirds unsolved. Applying the payroll tax to wages above $250,000 closes about 70% and cuts no one's benefits. The gap also grew this year for reasons a retirement age cannot touch: lower fertility and lower immigration did most of the damage in the 2026 report, and Congress's own 2025 tax law cut the program's revenue from taxing benefits, worsening the gap by 0.16% of payroll. Calling an age increase 'necessary' turns one policy choice into arithmetic.",
      proponent_rebuttal:
        "The gap is too large to close with any one tool, and an age increase is one of the few that grows with the problem. The 2026 report put the 75-year shortfall at 4.42% of taxable payroll, up 16% in a year, with costs rising from 15.2% of payroll in 2025 to 16.9% by 2050. Raising the full retirement age to 70 closes about a third of that and saves $150 billion in the first decade, without raising anyone's taxes. A payroll tax on wages above $250,000 is a large tax rise on a narrow group and still leaves 30% of the gap. Taking the age off the table means closing the rest with taxes on everyone else or deeper cuts elsewhere.",
      crux: {
        id: "solvency-gap-share",
        title: "Share of the Solvency Gap Closed",
        question:
          "How much of Social Security's gap would a later retirement age close, compared with taxing high earners?",
        description:
          "Whether a higher retirement age does enough of the work to be called necessary depends on a measurable quantity: what share of the 75-year gap each option closes when scored alone. That is settled by official scoring. Which mix to choose, once the shares are known, is a judgment about who should pay.",
        methodology:
          "Use CBO's long-term model and the SSA Chief Actuary's scoring to score each option alone against the 2026 Trustees' baseline: the full retirement age raised to 69 or 70, the payroll tax applied to wages above $250,000, the taxable maximum raised to cover 90% of wages, and a higher payroll tax rate. Compare the share of the 75-year gap each closes and its effect on the depletion date.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "CBO and SSA Chief Actuary scores, against the 2026 Trustees' baseline, of each option alone as a share of the 75-year gap: retirement age to 69 or 70, payroll tax on wages above $250,000, and a higher tax rate.",
        },
        cost_to_verify: "$0 (existing SSA and CBO scoring)",
        falsification: {
          supporter_flip:
            "If official scoring showed revenue options alone, such as taxing wages above $250,000, could close the whole gap and stay in place without cutting into growth, the claim that a higher retirement age is necessary would fall.",
          skeptic_flip:
            "If official scoring showed that revenue options together still left a large gap, or that a cap increase lost much of its yield as high earners shifted pay away from wages, an age increase would look like a needed part of the fix.",
          common_ground:
            "The 2026 Trustees project the combined funds run dry in 2034, with an automatic cut of about 17%, and no single option closes the whole 75-year gap on its own.",
          live_disagreement:
            "Whether a later retirement age is a needed part of the fix, because it closes about a third of the gap without new taxes, or an optional benefit cut, when taxing high earners closes twice as much.",
        },
      },
      evidence: [
        {
          id: "trustees-depletion",
          title: "2026 Trustees: retirement fund runs dry in 2032, combined funds in 2034; 75-year gap up 16% to 4.42% of payroll",
          description:
            "The trustees' June 2026 reports project the retirement (OASI) trust fund depleted in 2032, when benefits would be cut 22%, and the combined retirement and disability funds in 2034, with a 17% cut growing to 35% by 2100. The 75-year shortfall rose from 3.82% to 4.42% of taxable payroll. CRFB's breakdown of the change: lower assumed fertility (from 1.9 to 1.75 children per woman) worsened it by 0.35% of payroll, lower immigration by 0.21%, and the 2025 One Big Beautiful Bill Act's cut to revenue from taxing benefits by 0.16%; mortality updates improved it by 0.09%. Program costs were 15.2% of payroll in 2025 and are projected to reach 16.9% by 2050.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "Committee for a Responsible Federal Budget, 'Analysis of the 2026 Social Security Trustees' Report' (9 June 2026)",
          sourceUrl:
            "https://www.crfb.org/papers/analysis-2026-social-security-trustees-report",
          reasoning:
            "The official projection, read through a fiscal-hawk group's summary, so independence is 7. It shows the gap is real, dated and growing; it does not show that a later retirement age is the right fix, and its main drivers are births and immigration, not longevity.",
        },
        {
          id: "cbo-fra70-share",
          title: "CBO option: raising the full retirement age to 70 closes about 35% of the 75-year gap and saves $150 billion over a decade",
          description:
            "Among CBO's options compiled by CRFB, raising the full retirement age to 70, by two months a year, 'would save $150 billion over a decade and close 35 percent of Social Security's solvency gap.' By comparison, switching cost-of-living adjustments to the chained CPI closes about 10%, and cutting the benefit formula for the top half of earners about 40%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "Committee for a Responsible Federal Budget, 'CBO's Options to Improve Social Security Solvency' (24 March 2025), summarizing CBO scores",
          sourceUrl: "https://www.crfb.org/blogs/cbos-options-improve-social-security-solvency",
          reasoning:
            "Nonpartisan scoring of the option this map is about: a large, durable share of the gap. It leaves about two-thirds unsolved and was scored before the 2026 report enlarged the gap, so directness is 7.",
        },
        {
          id: "payroll-cap-alternative",
          title: "CBO option: applying the payroll tax to wages above $250,000 closes about 70% of the gap",
          description:
            "In the same CBO options, subjecting wages above $250,000 to the payroll tax, without crediting extra benefits, would raise $1.6 trillion over 2026-2035 and 'close 70 percent of the 75-year solvency gap.' Raising the taxable maximum to cover 90% of wages, with added benefits, closes about 20%. CRFB notes the options are a menu, not its recommendations.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "Committee for a Responsible Federal Budget, 'CBO's Options to Improve Social Security Solvency' (24 March 2025), summarizing CBO scores",
          sourceUrl: "https://www.crfb.org/blogs/cbos-options-improve-social-security-solvency",
          reasoning:
            "Shows a revenue option closes about twice the share of the age increase, which undercuts 'necessary'. It is a large tax rise on high earners and does not close the whole gap either.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Can people work longer? Health, physical work and disability
    // =========================================================================
    {
      id: "work-capacity",
      title: "Can People Work Longer?",
      short_summary:
        "GAO found most workers could likely work to a later age, but about a quarter of 60-61-year-olds report a health limit on work and two-thirds of those working have physically demanding jobs. A later age pushes some onto disability rolls instead.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Many people in their 60s cannot keep going. In GAO's analysis of the Health and Retirement Study, 27.7% of 60-61-year-olds said their health limited their ability to work, and 63.6% of those still working had physically demanding jobs. Disability is common by 64: about 43% of adults reported one, and 67.7% of those in the lowest income quartile. GAO concluded that raising the retirement ages 'would likely increase the number of workers applying for and receiving DI benefits', adding to a disability caseload that 'already faces a serious backlog.' For a roofer or a warehouse worker, a later retirement age is a longer wait on a smaller check.",
      proponent_rebuttal:
        "Most people can work longer than they used to. GAO found that improvements in longevity, health and workplace conditions 'suggest that most workers would be capable of working to a later retirement age.' Of 60-61-year-olds with physically demanding jobs, only 6.4% also reported fair or poor health. Those who genuinely cannot work have a separate program: people who first claim through disability insurance are exempt from a retirement-age change, which is the safety valve the system was built with. A later age mostly affects people who are healthy enough to choose when to claim.",
      crux: {
        id: "can-work-longer",
        title: "The Work-Capacity Test",
        question:
          "Can most people in their 60s keep working, or would a later retirement age push the sick and worn-out onto disability?",
        description:
          "If most workers near retirement can keep working, a later retirement age mainly shifts when healthy people claim. If many cannot, it cuts benefits for people who have no choice, or moves them onto disability rolls and erodes the savings.",
        methodology:
          "Use the Health and Retirement Study to track work-limiting conditions and physically demanding jobs among 60-67-year-olds by income and occupation. Compare disability applications and awards at ages 62-66 for cohorts whose full retirement age rose from 65 to 66 and 67 under the 1983 law, against earlier cohorts.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Disability applications and awards at ages 62-66 for cohorts whose full retirement age rose to 66 and 67 under the 1983 law, compared with earlier cohorts, beside Health and Retirement Study data on work limits by income.",
        },
        cost_to_verify: "Not costed here; it uses existing SSA records and survey data.",
        falsification: {
          supporter_flip:
            "If cohorts whose retirement age rose to 66 and 67 showed sharply higher disability awards and earlier claiming at reduced benefits among low earners, the claim that most people can simply work longer would weaken.",
          skeptic_flip:
            "If those cohorts kept working longer with little rise in disability awards, even in physical jobs, the worry that a later age punishes people who cannot work would weaken.",
          common_ground:
            "About a quarter of workers aged 60-61 report a health condition that limits work, disability insurance does not depend on the retirement age, and disability rates rise with age.",
          live_disagreement:
            "Whether most people near retirement can work a few more years, so a later age mainly shifts claiming, or whether enough cannot that it becomes a cut for the people least able to bear it.",
        },
      },
      evidence: [
        {
          id: "gao-most-can-work",
          title: "GAO: most workers 'would be capable of working to a later retirement age'; 6.4% of those in physical jobs report poor health",
          description:
            "GAO wrote that 'general improvements in longevity, health, and workplace conditions over recent decades suggest that most workers would be capable of working to a later retirement age.' Among adults aged 60-61 from 1998 to 2008, 57.9% were working for pay, and of those with a physically demanding job, only 6.4% also reported fair or poor health.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "U.S. GAO, 'Social Security Reform: Raising the Retirement Ages Would Have Implications for Older Workers and SSA Disability Rolls', GAO-11-125 (November 2010), highlights and appendix I",
          sourceUrl: "https://www.gao.gov/products/gao-11-125",
          reasoning:
            "An independent audit agency's reading of national survey data. The data run to 2008, before the age reached 67, so directness is 6.",
        },
        {
          id: "gao-health-limits",
          title: "GAO: 27.7% of 60-61-year-olds report a work-limiting health condition; 63.6% of those working have physical jobs",
          description:
            "In the same analysis, 25.6% of 60-61-year-olds reported fair or poor health and 27.7% said their health limited their ability to work; 63.6% of those working had a job that was physically demanding at least some of the time. Those who might struggle to work longer 'have less education and lower household income'. By age 64, about 43% of adults reported a disability, rising to 61.3% of those who did not finish high school and 67.7% of the lowest income quartile.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "U.S. GAO, GAO-11-125 (November 2010), highlights and appendix I, citing the Health and Retirement Study and an Urban Institute study",
          sourceUrl: "https://www.gao.gov/products/gao-11-125",
          reasoning:
            "Shows the people least able to work longer are the lower-income workers who rely most on the program. The data predate the current age of 67, and a health limit is not always an inability to work.",
        },
        {
          id: "gao-disability-shift",
          title: "GAO: raising the retirement ages 'would likely increase' disability applications and awards",
          description:
            "GAO found that raising the retirement ages 'would likely increase the number of workers applying for and receiving DI benefits', adding to an SSA disability caseload 'which already faces a serious backlog.' In 2008-2009, workers 60 and older made up 22% of disability applicants and 29% of initial approvals. Average annual disability incidence rose from 9.4 per 1,000 insured workers at 50-54 to 17.2 at 60-64.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "U.S. GAO, GAO-11-125 (November 2010), highlights and appendix I",
          sourceUrl: "https://www.gao.gov/products/gao-11-125",
          reasoning:
            "Some of the savings leak to the disability program, and the backlog means waiting. Supporters read the same finding as the safety valve working for those who cannot work, so directness is 6.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Fairness — who loses most over a lifetime?
    // =========================================================================
    {
      id: "fairness-distribution",
      title: "Fairness: Who Loses Most?",
      short_summary:
        "For men born in 1960, the life-expectancy gap at 50 between top and bottom earners is projected at 12.7 years, up from 5.1 for the 1930 cohort. A rise to 70 cuts lifetime benefits about 25% for bottom earners and 20% for top earners.",
      icon_name: "Users" as const,
      skeptic_premise:
        "A later retirement age cuts everyone's benefits, but it takes the most from those who live the shortest. The National Academies projected that for men born in 1960, top earners at 50 will outlive bottom earners by 12.7 years, up from 5.1 years for men born in 1930; bottom earners' life expectancy barely moved. The 'people live longer' case is true mainly for the affluent. The Academies' simulation of raising the full retirement age to 70 found it cuts lifetime benefits by 25% for the bottom fifth of men born in 1960 against 20% for the top fifth. Rich people live longer; a roofer or a warehouse worker is not lifting boxes at 69.",
      proponent_rebuttal:
        "In dollars, the cut falls mostly on higher earners: the Academies' same simulation has the top fifth losing $59,000 and the bottom fifth $30,000. SSA's Office of Retirement Policy projected that a higher retirement age would cut median scheduled benefits about 3% for the top four earnings quintiles and 2% for the bottom one in 2050, slightly progressive, because people who first claim through disability insurance are exempt and they tend to earn less. The longevity gap is real, but it is a feature of the whole benefit formula, not something an age increase uniquely creates, and it can be offset with a higher minimum benefit for low earners.",
      crux: {
        id: "lifetime-incidence",
        title: "Distribution of the Lifetime Benefit Cut",
        question:
          "Over a lifetime, does raising the retirement age cut benefits evenly, or fall hardest on lower earners?",
        description:
          "The fairness dispute is partly empirical: measured year by year, a higher retirement age cuts benefits roughly evenly; measured over a lifetime, the longevity gap makes it take a larger share from low earners. The answer depends on that choice of measure, on whether disability insurance is counted, and on whether a minimum-benefit offset comes with it.",
        methodology:
          "Run a microsimulation, such as SSA's MINT or the Urban Institute's DYNASIM, that combines mortality by lifetime earnings with claiming behavior, to compute the change in expected lifetime benefits by earnings quintile under a rise to 69 or 70, with and without the disability carve-out and a minimum-benefit offset.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "A microsimulation such as SSA's MINT or Urban's DYNASIM that combines mortality by lifetime earnings with claiming behavior, giving the change in expected lifetime benefits by earnings quintile, with and without a disability carve-out.",
        },
        cost_to_verify: "$0 (existing microsimulation models)",
        falsification: {
          supporter_flip:
            "If microsimulations with mortality by lifetime earnings showed that, even after the disability carve-out and a minimum-benefit offset, bottom earners lose a much larger share of lifetime benefits than top earners, the 'fair' half of the claim would fail.",
          skeptic_flip:
            "If microsimulations that include disability insurance and a minimum-benefit offset showed lifetime cuts roughly equal in share across earnings quintiles, the regressive charge would rest on the bare age change alone.",
          common_ground:
            "A higher retirement age is a benefit cut for every new retiree, top earners lose more in dollars, and the life-expectancy gap between top and bottom earners has widened sharply.",
          live_disagreement:
            "Whether a later retirement age is a roughly even cut, slightly progressive once disability insurance is counted, or a regressive one, because people who die younger lose a larger share of what they would have collected.",
        },
      },
      evidence: [
        {
          id: "nas-longevity-gap",
          title: "National Academies 2015: top-vs-bottom earner life-expectancy gap at 50 widens from 5.1 years (men born 1930) to 12.7 (born 1960)",
          description:
            "For men, life expectancy at 50 in the bottom fifth of lifetime earnings was about 26.6 years for the 1930 cohort and is projected at about 26.1 for the 1960 cohort. In the top fifth it rises from about 31.7 to 38.8 years. The gap grows from 5.1 to 12.7 years. Higher earners will collect benefits for more years, which widens the gap in lifetime benefits.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'The Growing Gap in Life Expectancy by Income: Implications for Federal Programs and Policy Responses' (2015), Summary",
          sourceUrl: "https://www.nationalacademies.org/read/19015/chapter/2",
          reasoning:
            "A consensus report using SSA earnings records linked to survey data. It undercuts 'people live longer, so should work longer' for low earners. The 1960 figures are projections.",
        },
        {
          id: "nas-nra70-lifetime-cut",
          title: "National Academies: raising the full retirement age to 70 cuts lifetime benefits 25% for bottom earners, 20% for top (men born 1960)",
          description:
            "The Academies simulated raising the normal retirement age to 70. For men born in 1960, 'benefits fall by $30,000 (25%) for bottom quintile workers and by $59,000 (20%) for top quintile workers.' For men born in 1930, the cut was about 25% for the lowest-income group and 22% for the highest.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "National Academies, 'The Growing Gap in Life Expectancy by Income' (2015), Chapter 5, 'Policy Responses to an Aging Population'",
          sourceUrl: "https://www.nationalacademies.org/read/19015/chapter/7",
          reasoning:
            "The most direct lifetime measure available: as a share, low earners lose more. In dollars, top earners lose about twice as much, which is the other side's point, so the card supports 'regressive in share' only.",
        },
        {
          id: "crfb-progressive",
          title: "SSA projection (via CRFB): a higher retirement age cuts median scheduled benefits ~3% for top quintiles, ~2% for the bottom in 2050",
          description:
            "CRFB's 2012 analysis reports SSA Office of Retirement Policy projections for 2050: raising the full retirement age changes median scheduled benefits by about -3% for each of the top four shared-earnings quintiles and -2% for the bottom one. CRFB concludes the change 'affects people of all income roughly equally (and indeed is slightly progressive)', because people who first collect through disability insurance, who tend to earn less, are exempt.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Committee for a Responsible Federal Budget, 'Actually, Raising the Retirement Age Is Not Regressive' (19 October 2012), citing SSA Office of Retirement Policy projections",
          sourceUrl: "https://www.crfb.org/blogs/actually-raising-retirement-age-not-regressive",
          reasoning:
            "The best case that the cut is even, from SSA's own model, but it measures benefits in one year rather than over a lifetime, so it misses the mortality gap the other side stresses. It is a 2012 projection read by an advocacy group.",
        },
      ],
    },
  ],
  references: [
    {
      title: "CRFB, Analysis of the 2026 Social Security Trustees' Report (9 June 2026)",
      url: "https://www.crfb.org/papers/analysis-2026-social-security-trustees-report",
    },
    {
      title: "CRFB, CBO's Options to Improve Social Security Solvency (24 March 2025)",
      url: "https://www.crfb.org/blogs/cbos-options-improve-social-security-solvency",
    },
    {
      title: "GAO-11-125, Raising the Retirement Ages Would Have Implications for Older Workers and SSA Disability Rolls (2010)",
      url: "https://www.gao.gov/products/gao-11-125",
    },
    {
      title: "National Academies, The Growing Gap in Life Expectancy by Income (2015)",
      url: "https://www.nationalacademies.org/read/19015/chapter/2",
    },
  ],
};
