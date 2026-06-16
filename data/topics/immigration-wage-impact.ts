import type { Topic } from "@/lib/schemas/topic";

export const immigrationWageImpactData = {
  id: "immigration-wage-impact",
  title: "Immigration and Wages",
  meta_claim:
    "Large-scale immigration significantly depresses wages for native-born low-skilled workers.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "labor-market-economics",
      title: "Labor Market Economics",
      short_summary:
        "George Borjas says immigration costs native low-skill workers $800/year in lost wages. David Card's Nobel-winning work found no such effect. Same data, opposite conclusions.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "David Card's Mariel boatlift study and subsequent research show minimal wage effects from even sudden, large immigration flows. Immigrants create jobs, start businesses at higher rates than natives, and fill complementary roles that make native workers more productive rather than displacing them.",
      proponent_rebuttal:
        "George Borjas's reanalysis of the Mariel boatlift, focusing on the most directly competing workers (male high school dropouts), found a 10-30% wage decline for that group. Basic supply and demand dictates that adding labor supply at a given skill level, holding demand constant, puts downward pressure on wages. National Academy of Sciences found short-term negative effects on prior immigrants.",
      crux: {
        id: "wage-elasticity-immigration",
        title: "Labor Demand Elasticity for Low-Skill Workers",
        description:
          "Determining the precise wage elasticity — how much a 1% increase in immigrant labor supply at a given skill level changes wages for competing native workers.",
        methodology:
          "Instrumental variable regressions exploiting exogenous immigration shocks (refugee resettlement, visa lotteries) to measure causal wage effects on native workers in the same skill cell (education x experience), controlling for local demand shocks.",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (Econometric analysis of existing Census and ACS data)",
      },
      evidence: [
        {
          id: "card-mariel-boatlift",
          title: "Card: Mariel Boatlift Had No Significant Wage Effect",
          description:
            "David Card's landmark 1990 study of the Mariel boatlift — when 125,000 Cubans arrived in Miami in 1980, increasing the labor force by 7% — found virtually no effect on wages or unemployment for native low-skilled workers in Miami compared to control cities.",
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
            "Nobel Prize-winning economist, landmark study. Replicability debated due to Borjas's reanalysis reaching different conclusions with different sample definitions.",
        },
        {
          id: "borjas-reanalysis",
          title: "Borjas: Mariel Boatlift Depressed Low-Skill Wages 10-30%",
          description:
            "George Borjas reanalyzed the Mariel boatlift in 2017, focusing specifically on non-Hispanic male high school dropouts (the group most directly competing with Cuban arrivals). He found wages for this group fell 10-30% relative to comparison cities — a significant and lasting depression.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 9,
          },
          source:
            "George J. Borjas, 'The Wage Impact of the Marielitos: A Reappraisal,' ILR Review, Vol. 70, No. 5 (2017), pp. 1077-1110 (NBER WP 21588)",
          sourceUrl: "https://www.nber.org/papers/w21588",
          reasoning:
            "Harvard labor economist with deep expertise. Criticized for narrowing sample to a small subgroup (non-Hispanic male dropouts) that may introduce noise. The implied wage-supply elasticity of -0.5 to -1.5 rests on small annual CPS samples. The Card vs. Borjas debate remains unresolved.",
        },
        {
          id: "nas-report-2017",
          title: "NAS: Immigration Has Small Negative Short-Term Effects on Prior Immigrants",
          description:
            "The National Academies of Sciences 2017 consensus report ('The Economic and Fiscal Consequences of Immigration') found that the long-term impact of immigration on the wages and employment of native-born workers overall is very small, and that when negative wage effects do occur they are most likely concentrated among prior immigrants and native-born workers without a high school degree.",
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
        "Immigrants are net fiscal contributors over their lifetimes and their children even more so. Innovation rates among immigrants are disproportionately high — immigrants are 80% more likely to found a company and account for 36% of US patent filings. H-1B workers raise wages for complementary native workers with different skills.",
      proponent_rebuttal:
        "Short-term fiscal costs are real, particularly at the state and local level where education, healthcare, and housing costs land. Integration costs, school overcrowding, and housing price pressure are felt acutely by communities even if aggregate GDP grows. The benefits accrue to capital owners and high-skill workers while costs fall on low-wage native workers.",
      crux: {
        id: "distributional-impact",
        title: "Distributional Analysis of Immigration Benefits and Costs",
        description:
          "Who specifically gains and who loses from immigration — broken down by income quintile, skill level, geographic area, and timeframe.",
        methodology:
          "General equilibrium modeling with heterogeneous agents calibrated to US data, tracing how immigration-driven GDP growth is distributed across native workers by skill level, region, and over 1, 5, 10, and 30 year horizons.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-year modeling project with panel data)",
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
};
