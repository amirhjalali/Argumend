import type { Topic } from "@/lib/schemas/topic";

export const minimumWageEffectsData = {
  id: "minimum-wage-effects",
  title: "Raising the Minimum Wage",
  meta_claim:
    "Raising the federal minimum wage to $15/hour or higher would significantly benefit low-wage workers without causing substantial job losses.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "employment-effects",
      title: "Employment Effects",
      short_summary:
        "Card and Krueger found no job losses from minimum wage hikes. The restaurant industry's own data says otherwise. The debate has raged for 30 years.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The Congressional Budget Office estimates a $15 federal minimum would eliminate 1.4 million jobs. Small businesses operate on thin margins and cannot absorb a 107% increase from $7.25. Automation accelerates as labor costs rise — self-checkout kiosks, ordering apps, and robotic food prep replace minimum wage workers. Labor-intensive industries like restaurants and retail are most vulnerable.",
      proponent_rebuttal:
        "Card and Krueger's 1994 natural experiment found no job losses when New Jersey raised its minimum wage while neighboring Pennsylvania did not. Seattle's $15 minimum wage, the most studied increase ever, showed minimal employment effects. The majority of modern minimum wage studies find small or no negative employment impact — the old textbook model of large job losses is not supported by empirical evidence.",
      crux: {
        id: "employment-elasticity-measurement",
        title: "Employment Elasticity at High Minimum Wage Levels",
        description:
          "Determining the employment elasticity of minimum wage increases at levels significantly above the current federal minimum, where historical data is limited.",
        methodology:
          "Natural experiments comparing employment trends in counties/states that raised minimum wages to $15+ versus neighboring jurisdictions that did not. Use synthetic control methods and border discontinuity designs.",
        equation:
          "\\epsilon = \\frac{\\%\\Delta \\text{Employment}}{\\%\\Delta \\text{Minimum Wage}}",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (Analysis of existing state/county employment data)",
      },
      evidence: [
        {
          id: "card-krueger-nj-study",
          title: "Card & Krueger: No Job Losses in NJ Minimum Wage Increase",
          description:
            "David Card and Alan Krueger's 1994 landmark study compared fast-food employment in New Jersey (which raised its minimum wage from $4.25 to $5.05) to neighboring Pennsylvania. They found no reduction in employment — in fact, NJ employment slightly increased. This challenged decades of textbook economic theory.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Card & Krueger, American Economic Review",
          reasoning:
            "Nobel Prize-winning research that fundamentally changed the empirical debate. Extremely influential, though it studied a modest increase from a low baseline.",
        },
        {
          id: "cbo-15-minimum-analysis",
          title: "CBO: $15 Minimum Would Cost 1.4 Million Jobs",
          description:
            "The Congressional Budget Office's 2021 analysis estimated a $15 federal minimum wage by 2025 would raise wages for 17 million workers and lift 900,000 out of poverty, but would reduce employment by 1.4 million workers (a range of 0 to 2.7 million). The median estimate is a net positive but with significant displacement.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "Congressional Budget Office",
          reasoning:
            "Nonpartisan, authoritative source. The wide confidence interval (0 to 2.7M) reflects genuine uncertainty in the evidence base.",
        },
        {
          id: "seattle-minimum-wage-study",
          title: "Seattle $15 Minimum: Mixed but Mostly Positive Results",
          description:
            "The University of Washington's multi-year study of Seattle's $15 minimum wage found hours worked decreased slightly for low-wage workers, but total earnings increased. Workers earning under $19/hour saw a net wage gain of $8-$12/week. Some workers lost employment, but most benefited.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "University of Washington, NBER Working Paper",
          reasoning:
            "The most comprehensive study of a high minimum wage increase. Results are nuanced — some negative effects but net positive for most workers.",
        },
        {
          id: "dube-border-county-analysis",
          title: "Dube et al.: Border County Analysis Shows Minimal Job Losses",
          description:
            "Arindrajit Dube and colleagues compared employment in all contiguous county pairs straddling state borders with different minimum wages. Across hundreds of natural experiments, they found minimum wage increases raised wages without detectable employment losses in the restaurant and retail sectors.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Dube, Lester & Reich, Review of Economics and Statistics",
          reasoning:
            "Methodologically innovative and widely replicated. The border-county design controls for regional economic conditions better than previous methods.",
        },
      ],
    },
    {
      id: "poverty-economic-effects",
      title: "Poverty & Economic Effects",
      short_summary:
        "A $15 minimum wage would raise pay for 17 million workers. The CBO estimates 1.3 million would lose their jobs. Both numbers are in the same report.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Only 1.1% of workers currently earn the federal minimum wage. Most minimum wage earners are teenagers and secondary earners, not family breadwinners. The Earned Income Tax Credit (EITC) is a more targeted and effective poverty reduction tool. Higher wages get passed to consumers as higher prices, disproportionately affecting the low-income people the policy is supposed to help.",
      proponent_rebuttal:
        "While only 1.1% earn exactly $7.25, 30% of US workers — 42 million people — earn under $15/hour. The minimum wage hasn't kept pace with productivity since 1968; if it had, it would be over $24/hour today. Higher wages reduce employee turnover (saving businesses recruitment costs), increase worker productivity, and boost consumer spending. Australia's $23/hour minimum wage hasn't caused economic collapse — its unemployment rate is comparable to America's.",
      crux: {
        id: "poverty-reduction-efficiency",
        title: "Minimum Wage vs. EITC Poverty Reduction Efficiency",
        description:
          "Comparing the poverty reduction efficiency of minimum wage increases versus Earned Income Tax Credit expansion, accounting for both direct effects and behavioral responses.",
        methodology:
          "Simulate the poverty impact of a $15 minimum wage versus equivalent-cost EITC expansion using CPS microdata. Compare coverage, targeting accuracy, take-up rates, and behavioral responses (labor force participation, hours worked).",
        equation:
          "\\text{Efficiency} = \\frac{\\Delta \\text{Poverty Rate}}{\\text{Total Cost to Economy}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$150K (Microsimulation using existing survey data)",
      },
      evidence: [
        {
          id: "bls-wage-distribution",
          title: "BLS: 42 Million Workers Earn Under $15/Hour",
          description:
            "Bureau of Labor Statistics data shows that while only 1.1% of workers earn exactly the federal minimum of $7.25, approximately 30% of the US workforce — 42 million people — earn less than $15/hour. This includes 55% of Black workers and 60% of Hispanic workers under 25.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Bureau of Labor Statistics",
          reasoning:
            "Authoritative government data that reframes the debate from the narrow '1.1%' figure to the much larger population earning below proposed minimums.",
        },
        {
          id: "productivity-wage-divergence",
          title: "Worker Productivity Has Outpaced Wages Since 1968",
          description:
            "Economic Policy Institute data shows worker productivity grew 64.6% from 1979 to 2019, while hourly compensation grew only 17.5%. If the minimum wage had tracked productivity since 1968, it would exceed $24/hour today. The divergence represents a massive transfer of value from workers to owners and shareholders.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Economic Policy Institute",
          reasoning:
            "Well-documented macroeconomic trend. EPI leans progressive, but the productivity-wage divergence is confirmed by BLS data. Directness is limited because the moral argument doesn't prove $15 is the right number.",
        },
        {
          id: "australia-high-minimum-wage",
          title: "Australia's $23/Hour Minimum Hasn't Caused Economic Collapse",
          description:
            "Australia's national minimum wage of AUD $23.23/hour (~$15.50 USD) is the world's highest. Australia's unemployment rate (3.7%) is comparable to the US (3.7%). Its restaurant and retail sectors function normally. This suggests high minimum wages are compatible with a healthy economy.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "Fair Work Commission (Australia), OECD",
          reasoning:
            "Compelling international comparison, but replicability is limited by significant structural differences between the Australian and US economies (universal healthcare, different labor market institutions).",
        },
        {
          id: "eitc-comparison-effectiveness",
          title: "EITC Is a More Targeted Poverty Reduction Tool",
          description:
            "The Earned Income Tax Credit lifts 5.6 million people out of poverty annually, making it the largest anti-poverty program for working families. Unlike the minimum wage, the EITC targets benefits to families with children based on income, avoids employer cost increases, and incentivizes labor force participation. Studies show the EITC has higher poverty reduction per dollar than minimum wage increases.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Center on Budget and Policy Priorities, IRS data",
          reasoning:
            "Strong evidence that the EITC is more efficient at targeting poverty. However, the EITC and minimum wage are not mutually exclusive — many economists advocate for both.",
        },
      ],
    },
  ],
};
