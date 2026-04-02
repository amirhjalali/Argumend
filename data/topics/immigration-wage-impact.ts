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
          source: "David Card, Industrial and Labor Relations Review (1990)",
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
          source: "George Borjas, Industrial and Labor Relations Review (2017)",
          reasoning:
            "Harvard labor economist with deep expertise. Criticized for narrowing sample to a small subgroup (non-Hispanic male dropouts) that may introduce noise. The Card vs. Borjas debate remains unresolved.",
        },
        {
          id: "nas-report-2017",
          title: "NAS: Immigration Has Small Negative Short-Term Effects on Prior Immigrants",
          description:
            "The National Academies of Sciences 2017 comprehensive report found that immigration has little long-term effect on native wages overall, but does reduce wages for prior immigrants and native high school dropouts in the short run (1-2% decline). Long-run effects are near zero or slightly positive.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "National Academies of Sciences, Engineering, and Medicine (2017)",
          reasoning:
            "Gold-standard consensus report synthesizing decades of research. Conclusion that effects are small and concentrated undercuts the 'significantly depresses' framing of the meta-claim.",
        },
        {
          id: "cbo-fiscal-impact",
          title: "CBO: Immigration Raises GDP and Has Mixed Fiscal Effects",
          description:
            "The Congressional Budget Office estimates that immigration raises real GDP substantially (projected 3.3% increase by 2034 from recent immigration surge). Fiscal effects are positive at the federal level but often negative at state and local levels in the short term.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source: "Congressional Budget Office (2024)",
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
            "Giovanni Peri and Chad Sparber find that low-skilled immigrants specialize in manual/physical tasks while native workers shift to communication-intensive jobs. This task specialization means immigration makes native workers more productive rather than displacing them, raising native wages by 0.6-1.7%.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Peri & Sparber, American Economic Journal (2009)",
          reasoning:
            "Influential research from a leading immigration economist. Task-based framework is theoretically compelling but hard to verify empirically at scale.",
        },
        {
          id: "fair-cost-estimates",
          title: "FAIR: Immigration Costs $150B+ Annually at State/Local Level",
          description:
            "The Federation for American Immigration Reform estimates that state and local governments spend $150 billion annually on services for immigrants (education, healthcare, law enforcement), exceeding tax contributions by roughly $80 billion at the sub-federal level.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source: "Federation for American Immigration Reform (FAIR)",
          reasoning:
            "Advocacy organization with restrictionist stance. Methodology criticized for including US citizen children of immigrants as costs, inflating estimates. Low independence and reliability due to clear agenda.",
        },
        {
          id: "immigrant-entrepreneurship",
          title: "Immigrants Are 80% More Likely to Found Companies",
          description:
            "Research from the National Bureau of Economic Research finds immigrants are 80% more likely to found a firm than native-born Americans. 55% of US billion-dollar startups have at least one immigrant founder. Immigrants hold patents at 2-3x the rate of native-born Americans.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "NBER, National Foundation for American Policy",
          reasoning:
            "Strong data on immigrant entrepreneurship, but this primarily reflects high-skilled immigrants and doesn't directly address wage effects on low-skilled native workers.",
        },
        {
          id: "cbo-2024-immigration",
          title: "CBO 2024: Recent Immigration Surge Projected to Add $7T to GDP",
          description:
            "The CBO projects that the recent immigration surge will add 3.3% to real GDP and 5.2 million workers by 2033, boost federal revenues by $1 trillion, and help sustain Social Security solvency. Per-capita GDP effects are more modest at +0.1-0.2%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 4,
          },
          source: "Congressional Budget Office (2024)",
          reasoning:
            "Highly authoritative. Aggregate GDP gains don't address whether low-skill native workers share in them — directness is low for the specific meta-claim about wage depression.",
        },
      ],
    },
  ],
};
