export const immigrationWageImpactData = {
  id: "immigration-wage-impact",
  title: "Immigration and Wages",
  question:
    "Does large-scale immigration significantly cut low-skilled native wages?",
  meta_claim:
    "Large-scale immigration significantly depresses wages for native-born low-skilled workers.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "David Card's 1990 study found little wage change for less-skilled Miami workers after the Mariel boatlift. George Borjas's 2017 reanalysis estimated a 10-30% relative decline for non-Hispanic men aged 25-59 without a high school diploma. These are different samples of the Current Population Survey. Later research disputes how sample composition affects the comparison.",
    confidence: 80,
    source:
      "Card (1990); reanalysis and methodological debate linked in the evidence and further reading",
    sourceUrl:
      "https://davidcard.berkeley.edu/papers/mariel-impact.pdf",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both cases distinguish national output from the wages of particular workers. A rise in total GDP can coexist with losses for some groups.",
    "The wage dispute asks which workers lose, over what period, and whether a measured change reflects immigration or sampling. Card's local Mariel study, Borjas's Mariel reanalysis and his separate 2003 national study examine different worker groups and comparisons.",
    "Long-run gains also have to be traced to the workers bearing short-run costs.",
  ],
  pillars: [
    {
      id: "labor-market-economics",
      title: "Labor Market Economics",
      short_summary:
        "Studies disagree about wage losses for specific workers. The Mariel papers use different local samples; the national study groups workers by education and experience.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The counterargument is complementarity: immigrants can fill different roles, make native workers more productive and create extra demand for goods and services. Those effects can offset the added labor supply. Card's Mariel study found little wage change for the less-skilled Miami workers it examined, though that result does not settle every episode or worker group.",
      proponent_rebuttal:
        "In this view, a labor-supply shock can depress the wages of directly competing native workers even when demand and total output grow. Local comparisons can miss losses if workers move away. Borjas's 2003 national study estimated a 3-4% wage reduction for competing workers when their group's labor supply rose 10%. His separate 2017 Miami reanalysis reported larger losses in a narrow subgroup. The size of any loss depends on which workers and comparisons are used.",
      crux: {
        id: "wage-elasticity-immigration",
        title: "Labor Demand Elasticity for Low-Skill Workers",
        question:
          "Does immigration barely move the wages of directly competing workers, or cut them meaningfully?",
        description:
          "For a defined group of native workers and time horizon, compare wages after an immigration shock with credible controls. Check whether the result survives changes in sample composition, native migration and comparison groups.",
        methodology:
          "Instrumental variable regressions exploiting exogenous immigration shocks (refugee resettlement, visa lotteries) to measure causal wage effects on native workers in the same skill cell (education x experience), controlling for local demand shocks.",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (Econometric analysis of existing Census and ACS data)",
        falsification: {
          supporter_flip:
            "If reliable comparisons repeatedly found little wage loss for the most directly competing workers after accounting for migration and changes in who was sampled, the case for substantial wage cuts would weaken.",
          skeptic_flip:
            "If meaningful wage losses persisted for those workers across credible comparison groups and stable samples, the claim that immigration has little effect on their wages would need revision.",
          common_ground:
            "Both cases accept that effects can differ across workers and time periods, and that higher total GDP does not establish whether low-skilled native workers gained.",
          live_disagreement:
            "Which wage losses are caused by immigration, for which workers and over what period? The Mariel debate concerns local survey samples and controls; the 2003 national study compares education and experience groups.",
        },
      },
      evidence: [
        {
          id: "card-mariel-boatlift",
          title: "Card: Mariel Boatlift Had No Significant Wage Effect",
          description:
            "Using Current Population Survey data for 1979-1985, Card found little effect on the wages or unemployment of less-skilled Miami workers after the boatlift, including earlier Cuban immigrants. The study compares Miami with other cities.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source:
            "David Card, 'The Impact of the Mariel Boatlift on the Miami Labor Market,' Industrial and Labor Relations Review, Vol. 43, No. 2 (1990), pp. 245-257",
          sourceUrl: "https://davidcard.berkeley.edu/papers/mariel-impact.pdf",
          reasoning:
            "A natural-experiment comparison using public survey data. Its findings concern the sampled Miami groups and period; they do not establish the effect of every later immigration episode.",
        },
        {
          id: "borjas-reanalysis",
          title: "Borjas (2017): Estimated 10-30% Wage Drop in One Miami Group",
          description:
            "Borjas's 2017 reanalysis estimated a 10-30% relative wage decline among non-Hispanic men aged 25-59 without a high school diploma. This subgroup proxies for native workers because the early survey did not record birthplace. The estimate varies with the sample and comparison cities; it is not a national average.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 9,
          },
          source:
            "George J. Borjas, 'The Wage Impact of the Marielitos: A Reappraisal,' ILR Review, Vol. 70, No. 5 (2017), pp. 1077-1110 (NBER WP 21588)",
          sourceUrl: "https://gborjas.scholars.harvard.edu/file_url/183",
          reasoning:
            "Clemens and Hunt (2019) attribute the measured decline to a changing racial mix in small survey samples; Borjas (2019) disputes that explanation and reports recovery by 1990. Both papers are linked in further reading. A local subgroup estimate does not establish a permanent nationwide loss.",
        },
        {
          id: "borjas-national-2003",
          title: "Borjas (2003): National Estimates for Competing Worker Groups",
          description:
            "Borjas grouped men by education and experience using national Census and pooled CPS data. He estimated a 3-4% wage reduction for competing workers per 10% increase in their group's labor supply. This is a separate design from his Miami reanalysis.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "George J. Borjas, 'The Labor Demand Curve Is Downward Sloping: Reexamining the Impact of Immigration on the Labor Market,' Quarterly Journal of Economics 118(4), 1335-1374 (2003)",
          sourceUrl: "https://gborjas.scholars.harvard.edu/file_url/187",
          reasoning:
            "Peer-reviewed analysis of public data, with results dependent on skill-group and substitution assumptions. It shares an author and some survey sources with the Miami study, rather than independently replicating it.",
        },
        {
          id: "nas-report-2017",
          title: "National Academies: Small Overall Wage Effects Over 10+ Years",
          description:
            "The National Academies' report finds very small wage effects for native-born workers overall when measured over 10 years or more. Where negative wage effects are found, prior immigrants and native-born workers without a high school diploma are most likely to be affected. An overall average does not establish the effect on every subgroup.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'The Economic and Fiscal Consequences of Immigration' (2017)",
          sourceUrl:
            "https://www.nationalacademies.org/news/new-report-assesses-the-economic-and-fiscal-consequences-of-immigration",
          reasoning:
            "Gold-standard consensus report synthesizing decades of research. Conclusion that effects are small and concentrated undercuts the 'significantly depresses' framing of the meta-claim.",
        },
        {
          id: "peri-sparber-complementarity",
          title: "Peri and Sparber: Task Specialization Can Limit Wage Pressure",
          description:
            "Using occupational task data and U.S. Census data, Peri and Sparber find that less-educated immigrants specialize in manual and physical tasks while similarly educated native workers shift toward communication-intensive jobs. They argue that this adjustment helps explain modest wage effects. It does not establish that no native worker faces competition.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Giovanni Peri and Chad Sparber, 'Task Specialization, Immigration, and Wages,' American Economic Journal: Applied Economics 1(3), 135-169 (2009)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/app.1.3.135",
          reasoning:
            "An empirical test of a task-specialization mechanism. Its findings concern adjustment among less-educated workers, rather than a guarantee that all immigration raises all native wages.",
        },
      ],
    },
    {
      id: "long-term-economic-effects",
      title: "Long-Term Economic Effects",
      short_summary:
        "Entrepreneurship and growth projections can show gains while local budgets bear costs. The question is whether the same workers eventually benefit.",
      icon_name: "Target" as const,
      skeptic_premise:
        "In the case against substantial wage harm, entrepreneurship, complementary jobs and additional demand can expand opportunities for native workers. The evidence below includes a national firm-founding study and CBO's projection of higher total output. Whether these gains reach low-skilled native workers has to be tested separately.",
      proponent_rebuttal:
        "The case for concern separates output from distribution. A larger economy does not guarantee higher wages for directly competing workers. Public-service costs can arise before tax revenues catch up, and federal gains need not cover state and local costs. CBO's 2025 analysis estimated net state and local costs in 2023. Neither that fiscal estimate nor entrepreneurial success identifies the full long-run effect on low-skilled native wages.",
      crux: {
        id: "distributional-impact",
        title: "Distributional Analysis of Immigration Benefits and Costs",
        question:
          "Do long-run growth gains outweigh short-term costs for low-skill native workers?",
        description:
          "Track wages, taxes and service use for matched low-skilled worker cohorts and receiving communities over a decade or more. Compare places with different immigration exposure, accounting for worker mobility and local demand.",
        methodology:
          "General equilibrium modeling with heterogeneous agents calibrated to US data, tracing how immigration-driven GDP growth is distributed across native workers by skill level, region, and over 1, 5, 10, and 30 year horizons.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-year modeling project with panel data)",
        falsification: {
          supporter_flip:
            "If credible comparisons showed that low-skilled native workers and receiving communities gained over time after accounting for early wage and public-service costs, the case for lasting concentrated losses would weaken.",
          skeptic_flip:
            "If the same workers and communities bore persistent net losses across credible comparisons, higher aggregate output would not establish that they benefited.",
          common_ground:
            "Both cases distinguish total output from the distribution of wages and public-service costs.",
          live_disagreement:
            "Whether low-skilled native workers and receiving communities share enough in long-run gains to offset costs they bear, using consistent worker groups, geography and time horizons.",
        },
      },
      evidence: [
        {
          id: "cbo-local-2025",
          title: "CBO (2025): Immigration Surge Added Net State and Local Costs in 2023",
          description:
            "CBO estimated that the surge beginning in 2021 added $10.1 billion in state and local revenues and $19.3 billion in spending in 2023, a direct net cost of $9.2 billion. Its alternative measure, including broader effects and nonbudgetary costs, estimated a potential net cost of $9.8 billion. These estimates cover one year and a specific surge, rather than all immigration.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Congressional Budget Office, 'Effects of the Surge in Immigration on State and Local Budgets in 2023' (June 2025)",
          sourceUrl: "https://www.cbo.gov/publication/61256",
          reasoning:
            "A nonpartisan estimate with explicit accounting limits. It shares an agency and some assumptions with the federal projection, but covers different budgets and a different period. Fiscal costs are not a direct estimate of native workers' wage losses.",
        },
        {
          id: "fair-cost-estimates",
          title: "FAIR (2023): $150.7B Net Cost Estimate Across All Government Levels",
          description:
            "The restrictionist advocacy group FAIR estimated $182.1 billion in annual public spending and $31.4 billion in tax receipts, a net cost of $150.7 billion across federal, state and local governments. Its population includes an estimated 15.5 million unauthorized residents and 5.4 million U.S.-born children. This is not a state/local-only figure or an estimate for all immigrants.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source:
            "Federation for American Immigration Reform (FAIR), 'The Fiscal Burden of Illegal Immigration on United States Taxpayers' (2023)",
          sourceUrl:
            "https://www.fairus.org/issue/publications-resources/fiscal-burden-illegal-immigration-united-states-taxpayers-2023",
          reasoning:
            "An advocacy estimate whose population and accounting choices matter. Its annual totals cannot be compared directly with CBO's estimate for the incremental effect of a recent surge. Including U.S.-born children also differs from measuring only immigrants' own fiscal contributions.",
        },
        {
          id: "immigrant-entrepreneurship",
          title: "Azoulay and Colleagues: Higher Immigrant Firm-Founding Rates in 2005-2010",
          description:
            "For firms founded in 2005-2010 and surviving at least five years, Azoulay, Jones, Kim and Miranda estimated firm-founding rates of 0.83% among immigrants in the U.S. workforce and 0.46% among native-born workers, about 80% higher. Firms with an immigrant founder were 35% more likely to hold a patent. These are findings about the studied firms and period, not a current startup count.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Pierre Azoulay, Benjamin F. Jones, J. Daniel Kim and Javier Miranda, 'Immigration and Entrepreneurship in the United States,' American Economic Review: Insights 4(1), 71-88 (2022), previously NBER WP 27778 (2020)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aeri.20200588",
          reasoning:
            "Administrative and firm data support an entrepreneurship comparison across firm sizes. This does not by itself show whether low-skilled native workers receive higher wages, or establish the causal effect of changing immigration policy.",
        },
        {
          id: "cbo-2024-immigration",
          title: "CBO 2024: Recent Immigration Surge Projected to Add ~$8.9T to GDP",
          description:
            "In July 2024, CBO projected that its defined 2021-2026 surge would add $8.9 trillion to cumulative nominal GDP over 2024-2034, compared with a scenario without the surge. It projected $1.2 trillion more federal revenue and $0.9 trillion lower deficits, excluding discretionary spending changes and state/local budgets. These are projections from that report, not measured gains or a current forecast.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 4,
          },
          source:
            "Congressional Budget Office, 'Effects of the Immigration Surge on the Federal Budget and the Economy' (2024)",
          sourceUrl: "https://www.cbo.gov/publication/60165",
          reasoning:
            "A model-based comparison with substantial uncertainty. Cumulative nominal GDP is not annual income or GDP per person. The federal-budget result and aggregate output do not establish whether low-skilled native workers benefit.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Clemens and Hunt (2019): critique of Mariel sample composition",
      url: "https://journals.sagepub.com/doi/10.1177/0019793918824597",
    },
    {
      title: "Borjas (2019): reply on the role of race and timing",
      url: "https://gborjas.scholars.harvard.edu/file_url/172",
    },
  ],
};
