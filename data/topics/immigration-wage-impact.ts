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
      "Card (1990); Borjas (2017); methodological critique and reply linked in further reading",
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
          id: "cbo-fiscal-impact",
          title: "CBO: Immigration Raises GDP and Has Mixed Fiscal Effects",
          description:
            "The Congressional Budget Office estimates that the 2021-2026 immigration surge raises GDP substantially — boosting nominal GDP by $8.9 trillion (2.4%) over 2024-2034 and by about 3.2% in 2034 alone. Net federal fiscal effects are positive (deficits lowered by roughly $0.9 trillion over the decade), but effects are often negative at state and local levels in the short term.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Congressional Budget Office, 'Effects of the Immigration Surge on the Federal Budget and the Economy' (2024)",
          sourceUrl: "https://www.cbo.gov/publication/60165",
          reasoning:
            "Highly authoritative and nonpartisan. GDP effects don't directly address distributional wage impacts on low-skill natives, reducing directness.",
        },
      ],
    },
    {
      id: "long-term-economic-effects",
      title: "Long-Term Economic Effects",
      short_summary:
        "Immigrants started 55% of U.S. billion-dollar startups. They also compete for entry-level jobs. Both facts are true simultaneously.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Immigrants are net fiscal contributors over their lifetimes and their children even more so. Innovation rates among immigrants are disproportionately high — immigrants are about 80% more likely to found a firm than native-born Americans (Azoulay, Jones, Kim & Miranda), and immigrant-founded firms are roughly 35% more likely to hold a patent. H-1B and other high-skill workers tend to raise wages for complementary native workers with different skills rather than displacing them.",
      proponent_rebuttal:
        "Aggregate GDP gains say little about distribution. The National Academies' 2017 consensus report finds that when immigration does depress wages, the losses concentrate on prior immigrants and native-born workers without a high-school degree — exactly the groups least able to absorb them. Short-term fiscal costs are also real and unevenly borne: education, healthcare, and housing costs land disproportionately on state and local governments, while school overcrowding and housing-price pressure are felt acutely by receiving communities even as national output grows. The gains tend to accrue to capital owners and high-skill workers; the costs fall on low-wage natives and earlier arrivals.",
      crux: {
        id: "distributional-impact",
        title: "Distributional Analysis of Immigration Benefits and Costs",
        question:
          "Do long-run growth gains outweigh short-term costs for low-skill native workers?",
        description:
          "Who specifically gains and who loses from immigration — broken down by income quintile, skill level, geographic area, and timeframe.",
        methodology:
          "General equilibrium modeling with heterogeneous agents calibrated to US data, tracing how immigration-driven GDP growth is distributed across native workers by skill level, region, and over 1, 5, 10, and 30 year horizons.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-year modeling project with panel data)",
        falsification: {
          supporter_flip:
            "If general-equilibrium analysis showed immigration's gains are broadly shared — reaching low-skill natives and receiving communities, not just capital owners and high-skill workers — the 'costs fall on the most vulnerable' argument would weaken.",
          skeptic_flip:
            "If distributional data found the wage and local-fiscal costs concentrated on prior immigrants, native dropouts and receiving communities, testing the National Academies' account, aggregate GDP gains would no longer answer the worry about who pays.",
          common_ground:
            "Both sides agree immigration raises aggregate GDP and that immigrants found firms and patent at high rates; the dispute is who captures the gains and who bears the costs.",
          live_disagreement:
            "How immigration's net benefits distribute across skill levels, regions, and time horizons — whether the concentrated short-term costs to low-skill natives are outweighed for them by long-run growth, which heterogeneous-agent models estimate but haven't settled.",
        },
      },
      evidence: [
        {
          id: "peri-sparber-complementarity",
          title: "Peri & Sparber: Immigrants Complement Rather Than Compete With Natives",
          description:
            "Giovanni Peri and Chad Sparber find that less-educated immigrants specialize in manual/physical tasks while comparably-educated natives shift toward communication-language-intensive jobs. This task specialization reallocation substantially reduces the downward wage pressure immigration would otherwise place on less-educated native workers, helping explain why measured wage effects are modest.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Giovanni Peri & Chad Sparber, 'Task Specialization, Immigration, and Wages,' American Economic Journal: Applied Economics, Vol. 1, No. 3 (2009), pp. 135-169",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/app.1.3.135",
          reasoning:
            "Influential research from a leading immigration economist. Task-based framework is theoretically compelling but hard to verify empirically at scale; the paper's contribution is the specialization mechanism rather than a single headline native wage-gain figure.",
        },
        {
          id: "fair-cost-estimates",
          title: "FAIR: Immigration Costs $150B+ Annually at State/Local Level",
          description:
            "The Federation for American Immigration Reform's 2023 study estimates the net cost of illegal immigration at about $150.7 billion annually — roughly $182 billion in gross costs for services (K-12 education ~$78B, healthcare ~$43B, law enforcement) offset by only ~$31 billion in taxes paid by an estimated 15.5 million illegal aliens and their dependents. Most of these costs fall on state and local governments.",
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
            "Advocacy organization with restrictionist stance; covers illegal immigration specifically, not all immigration. Methodology criticized (e.g., by the Cato Institute) for counting US-citizen children of immigrants as costs and undercounting tax revenue, inflating estimates. Low independence and reliability due to clear agenda.",
        },
        {
          id: "immigrant-entrepreneurship",
          title: "Immigrants Are 80% More Likely to Found Companies",
          description:
            "An NBER study (Azoulay, Jones, Kim & Miranda) finds immigrants are about 80% more likely to found a firm than native-born Americans (0.83% vs 0.46% of the workforce launched a business in 2005-2010), and immigrant-founded firms were ~35% more likely to hold a patent than native-founded firms. A separate National Foundation for American Policy analysis found 55% (50 of 91) of US billion-dollar startups had at least one immigrant founder.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Pierre Azoulay, Benjamin F. Jones, J. Daniel Kim & Javier Miranda, 'Immigration and Entrepreneurship in the United States,' NBER WP 27778 (2020); National Foundation for American Policy (2022)",
          sourceUrl: "https://www.nber.org/papers/w27778",
          reasoning:
            "Strong data on immigrant entrepreneurship, but this primarily reflects high-skilled immigrants and doesn't directly address wage effects on low-skilled native workers.",
        },
        {
          id: "cbo-2024-immigration",
          title: "CBO 2024: Recent Immigration Surge Projected to Add ~$8.9T to GDP",
          description:
            "The CBO projects that the 2021-2026 immigration surge will increase nominal GDP by about $8.9 trillion (2.4%) over 2024-2034, add roughly 5.2 million people to the labor force by 2033, boost federal revenues by about $1.2 trillion, and lower deficits by roughly $0.9 trillion over the decade. Per-capita GDP effects are far more modest than the aggregate figures.",
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
            "Highly authoritative. Aggregate GDP gains don't address whether low-skill native workers share in them — directness is low for the specific meta-claim about wage depression.",
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
