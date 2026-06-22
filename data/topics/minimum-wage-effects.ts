import type { Topic } from "@/lib/schemas/topic";

export const minimumWageEffectsData = {
  id: "minimum-wage-effects",
  title: "Raising the Minimum Wage",
  meta_claim:
    "Raising the federal minimum wage to $15/hour or higher would significantly benefit low-wage workers without causing substantial job losses.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The same nonpartisan CBO report found a $15 federal minimum would raise pay for 17 million workers and lift ~900,000 out of poverty — and cost about 1.4 million jobs (range: roughly 0 to 3.7 million). It is a real tradeoff, not a free lunch or a catastrophe.",
    confidence: 78,
    source:
      "Congressional Budget Office, 'The Budgetary Effects of the Raise the Wage Act of 2021' (Feb. 2021)",
    sourceUrl: "https://www.cbo.gov/publication/56975",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The minimum-wage fight is usually framed as a free raise versus a job-killing disaster, but the nonpartisan CBO's own numbers show a tradeoff: a $15 federal minimum would raise pay for ~17 million workers and lift ~900,000 out of poverty while costing an estimated ~1.4 million jobs.",
    "The deeper surprise from 30 years of research is that the textbook prediction of large job losses keeps failing to show up at moderate increases — Card & Krueger and a 138-policy study (Cengiz et al.) find employment effects near zero — while the genuinely hard case is jumping to a high minimum fast, where Seattle's evidence is still disputed.",
    "So the honest question isn't 'does the minimum wage kill jobs?' but 'how high, how fast, and where?' — small-to-moderate increases look close to a free lunch, while a rapid $7.25→$15 jump in low-cost regions is where the real disemployment risk lives.",
  ],
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
        "Card and Krueger's 1994 natural experiment found no job losses when New Jersey raised its minimum wage while neighboring Pennsylvania did not. Cengiz, Dube, Lindner and Zipperer's bunching analysis of 138 state increases found the total number of low-wage jobs essentially unchanged for five years afterward — an employment elasticity near zero. Seattle is the genuine hard case: the University of Washington team found the step to $13 cut hours and net pay for low-wage jobs, but a parallel UC Berkeley study of food-service workers found pay gains and no job loss, so even the most-studied high minimum is contested rather than a clear disemployment verdict. Across the modern literature the textbook prediction of large job losses is not consistently borne out.",
      crux: {
        id: "employment-elasticity-measurement",
        title: "Employment Elasticity at High Minimum Wage Levels",
        description:
          "Determining the employment elasticity of minimum wage increases at levels significantly above the current federal minimum, where historical data is limited.",
        methodology:
          "Natural experiments comparing employment trends in counties/states that raised minimum wages to $15+ versus neighboring jurisdictions that did not. Use synthetic control methods and border discontinuity designs.",
        equation:
          "\\epsilon = \\frac{\\%\\Delta \\text{Employment}}{\\%\\Delta \\text{Minimum Wage}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$200K (Analysis of existing state/county employment data)",
        falsification: {
          supporter_flip:
            "If high-quality natural experiments of LARGE increases ($15+ from a low base) consistently showed sizable job and hours losses — i.e. Seattle's disemployment result replicated across many high-minimum cities rather than being offset by Berkeley-style null findings — the 'no significant job losses' claim would fail at the levels actually proposed.",
          skeptic_flip:
            "A skeptic predicting big job losses should weigh that the textbook prediction has repeatedly failed to appear in modern studies of moderate increases (near-zero elasticity across Cengiz et al.'s 138 cases) — so the burden is on showing why a given increase is large enough to break that pattern.",
          common_ground:
            "Both sides agree there exists SOME minimum-wage level high enough to cut employment; the dispute is where that threshold sits and whether $15 crosses it in a given local labor market.",
          live_disagreement:
            "The employment elasticity at high minimum-wage levels relative to local median wages — which data on modest historical increases can't pin down, leaving the $15-in-a-low-cost-region case genuinely uncertain.",
        },
      },
      evidence: [
        {
          id: "card-krueger-nj-study",
          title: "Card & Krueger: No Job Losses in NJ Minimum Wage Increase",
          description:
            "David Card and Alan Krueger's 1994 study compared fast-food employment in New Jersey (which raised its minimum wage from $4.25 to $5.05 in April 1992) to neighboring Pennsylvania. Their telephone survey found no reduction in employment — if anything a slight relative increase in NJ. This challenged the textbook competitive-labor-market prediction. A later reanalysis using payroll records (Neumark & Wascher, 2000) disputed the result, finding a modest employment decline, so the finding remains contested.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 5,
            directness: 9,
          },
          source:
            "Card & Krueger, American Economic Review 84(4), 1994, pp. 772–793",
          sourceUrl: "https://www.jstor.org/stable/2118030",
          reasoning:
            "Field-defining research that reshaped the empirical debate (Card later shared the 2021 Nobel). Replicability lowered to 5: it studied a modest increase from a low baseline, relied on a phone survey, and Neumark & Wascher's payroll-data reanalysis reached the opposite sign.",
        },
        {
          id: "cbo-15-minimum-analysis",
          title: "CBO: $15 Minimum Would Cut 1.4 Million Jobs",
          description:
            "The Congressional Budget Office's February 2021 analysis of the Raise the Wage Act of 2021 (raising the federal minimum to $15 by June 2025) estimated it would directly raise wages for 17 million workers and lift 0.9 million people out of poverty, but reduce employment by 1.4 million workers (median estimate). CBO judged a two-thirds chance the employment change would fall between roughly zero and 3.7 million jobs lost.",
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
            "Nonpartisan, authoritative source. The wide two-thirds range (≈0 to 3.7M) reflects genuine uncertainty; critics argue CBO underweighted recent low-elasticity studies.",
        },
        {
          id: "seattle-minimum-wage-study",
          title: "Seattle UW Study: $13 Minimum Cut Hours and Net Earnings",
          description:
            "The University of Washington team's NBER study of Seattle's minimum wage, using administrative payroll data, found the second step (to $13 in 2016) raised hourly wages in low-wage jobs by ~3% but cut hours worked in those jobs by ~6–7%. Because hours fell more than wages rose, total payroll to low-wage jobs declined, lowering the amount paid to those workers by an average of about $74 per month per job in 2016. A competing UC Berkeley study (Reich et al.) that looked only at food-service workers found pay gains and no job loss, and a later UW follow-up tracking individual workers found small net earnings gains, so the Seattle evidence is genuinely disputed.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source:
            "Jardim, Long, Plotnick, van Inwegen, Vigdor & Wething, NBER Working Paper 23532 (2017)",
          sourceUrl: "https://www.nber.org/papers/w23532",
          reasoning:
            "One of the most detailed studies of a high minimum wage, using individual hours data. Its headline finding cut against the proponent case; the dueling Berkeley result (different sample, restaurants only) is why replicability is set to 6.",
        },
        {
          id: "cengiz-dube-bunching-analysis",
          title: "Cengiz et al.: Minimum Wage Hikes Don't Shrink Low-Wage Jobs",
          description:
            "Cengiz, Dube, Lindner & Zipperer studied 138 state-level minimum wage increases (1979–2016) with a bunching estimator: they counted jobs lost just below the new minimum and jobs gained at or just above it. The number of jobs paying below the new minimum fell sharply, but an almost equal number appeared just above it, so the total count of low-wage jobs was essentially unchanged for five years after each increase. The implied employment elasticity was near zero.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Cengiz, Dube, Lindner & Zipperer, Quarterly Journal of Economics 134(3), 2019, pp. 1405–1454",
          sourceUrl:
            "https://academic.oup.com/qje/article-abstract/134/3/1405/5484905",
          reasoning:
            "Methodologically influential, peer-reviewed in a top-five journal, and based on a large sample of policy changes. The bunching design directly measures where jobs go, though it covers historically modest increases, not $15-from-$7.25 jumps.",
        },
      ],
    },
    {
      id: "poverty-economic-effects",
      title: "Poverty & Economic Effects",
      short_summary:
        "A $15 minimum wage would raise pay for 17 million workers. The CBO estimates 1.4 million would lose their jobs. Both numbers are in the same report.",
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
        falsification: {
          supporter_flip:
            "If microsimulations consistently showed the EITC reduces poverty far more per dollar than a minimum-wage hike AND that wage gains are largely eaten by price pass-through or lost hours, the case for the minimum wage as a poverty tool (versus tax credits) would weaken.",
          skeptic_flip:
            "A skeptic who prefers the EITC should weigh that ~32% of workers earn under $15 (not the oft-cited ~2% at the exact minimum), that the EITC can subsidize employers and push wages down, and that most economists treat the two as complements — so 'use the EITC instead' isn't a clean substitute.",
          common_ground:
            "Both sides agree the EITC is a well-targeted, work-rewarding antipoverty tool, and that many low-wage workers are adults supporting families, not teenagers.",
          live_disagreement:
            "How much of a minimum-wage raise actually reaches poor households (versus teens, secondary earners, and price pass-through), and whether it complements or partly duplicates the EITC.",
        },
      },
      evidence: [
        {
          id: "bls-wage-distribution",
          title: "Tens of Millions Earn Below $15/Hour",
          description:
            "BLS reports that in 2019 only about 1.9% of hourly workers (1.6 million people) were paid at or below the federal minimum of $7.25. But far more earn below $15: an Oxfam America analysis estimated roughly 32% of the US workforce — about 52 million workers — made under $15/hour, including about 47% of Black workers and 46% of Hispanic workers. The narrow '~2% at the minimum' figure understates how many workers a $15 floor would reach.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "BLS, 'Characteristics of Minimum Wage Workers, 2019'; Oxfam America, 'The Crisis of Low Wages in the US' (2022)",
          sourceUrl:
            "https://www.bls.gov/opub/reports/minimum-wage/2019/home.htm",
          reasoning:
            "BLS supplies the authoritative at-the-minimum count; the much larger 'under $15' headcount and demographic breakdown are Oxfam's broader estimate (it includes tipped, gig and farm workers), so reliability and directness are trimmed and the source is attributed honestly.",
        },
        {
          id: "productivity-wage-divergence",
          title: "Worker Productivity Has Outpaced Pay Since 1979",
          description:
            "Economic Policy Institute analysis of BLS and BEA data finds that from 1979 to 2019 net productivity grew about 59.7% while the typical worker's hourly compensation grew only about 15.8% — productivity rising roughly 3.5 times as fast as pay. EPI also argues that had the minimum wage tracked productivity growth since the late 1960s it would be far above today's $7.25. The divergence is presented as a transfer of value from workers to owners.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          source:
            "Economic Policy Institute, 'The Productivity–Pay Gap' (updated through 2019)",
          sourceUrl: "https://www.epi.org/productivity-pay-gap/",
          reasoning:
            "The productivity–pay gap is real and rests on government data, but EPI is an advocacy think tank and the exact gap depends on which deflators and compensation measures are used. Directness is low: the gap is a normative/macro argument and does not establish that $15 is the right level or that it avoids job loss.",
        },
        {
          id: "australia-high-minimum-wage",
          title: "Australia's High Minimum Hasn't Caused Economic Collapse",
          description:
            "Australia's Fair Work Commission set the national minimum wage at AUD $23.23/hour (about $15–16 USD) from 1 July 2023 — among the highest in the world — and it has risen further since. Around that time Australia's unemployment rate (~3.7%) was comparable to the US, and its restaurant and retail sectors operated normally. Proponents argue this shows a high minimum wage is compatible with a healthy economy.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 5,
          },
          source:
            "Fair Work Commission (Australia), National Minimum Wage Order 2023; OECD/ABS labour-force data",
          sourceUrl:
            "https://www.fwc.gov.au/hearings-decisions/major-cases/annual-wage-reviews/annual-wage-review-2022-23/national-minimum-wage",
          reasoning:
            "A real, verifiable comparison, but it is a single-country anecdote: structural differences (universal healthcare, centralized award wages, different industry mix, exchange-rate sensitivity of the USD figure) limit how much it transfers to the US, so replicability and directness are low.",
        },
        {
          id: "eitc-comparison-effectiveness",
          title: "EITC Is a More Targeted Poverty Reduction Tool",
          description:
            "Per the Center on Budget and Policy Priorities, the Earned Income Tax Credit lifted about 5.6 million people out of poverty in 2018, including roughly 3 million children, making it one of the largest anti-poverty programs for working families. Unlike the minimum wage, the EITC targets benefits by family income and size, places no cost on employers, and rewards work. Some economists argue it reduces poverty more efficiently per dollar than a minimum wage hike, though the two policies are complements, not substitutes.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Center on Budget and Policy Priorities, 'Policy Basics: The Earned Income Tax Credit' (2018 data)",
          sourceUrl:
            "https://www.cbpp.org/research/policy-basics-the-earned-income-tax-credit",
          reasoning:
            "Well-documented that the EITC targets poverty efficiently. CBPP is a left-of-center think tank but the figure derives from Census/IRS data. Directness trimmed: the EITC and minimum wage are not mutually exclusive — many economists favor both.",
        },
      ],
    },
  ],
};
