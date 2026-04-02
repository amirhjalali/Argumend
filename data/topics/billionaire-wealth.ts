import type { Topic } from "@/lib/schemas/topic";

export const billionaireWealthData = {
  id: "billionaire-wealth",
  title: "Should Billionaires Exist?",
  meta_claim:
    "The concentration of extreme wealth in billionaires is harmful to society and should be prevented through taxation or structural reform.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "economic-impact",
      title: "Economic Impact",
      short_summary:
        "The top 0.001% hold more wealth than the bottom 50% combined. One side sees a rigged game; the other sees the reward for building Amazon.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Billionaires create jobs, fund innovation, and drive economic growth. Gates, Musk, and Bezos built platforms that millions depend on. Wealth taxes cause capital flight and are administratively impractical — every European country that tried one repealed it.",
      proponent_rebuttal:
        "The top 0.001% now hold more wealth than the bottom 50%. This concentration reduces social mobility, captures political power, and distorts markets. Innovation happens in labs and garages funded by public research grants, not in billionaire bank accounts. Most billionaire wealth comes from rent extraction, not value creation.",
      crux: {
        id: "wealth-concentration-mobility",
        title: "Wealth Concentration vs. Social Mobility",
        description:
          "Is there a causal relationship between extreme wealth concentration and declining social mobility, or are both symptoms of other structural factors?",
        methodology:
          "Cross-national panel regression comparing wealth Gini coefficients with intergenerational earnings elasticity, controlling for education, tax policy, and institutional quality.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1.5M (Multi-country longitudinal economic study)",
      },
      evidence: [
        {
          id: "bw-fed-wealth-data",
          title: "Federal Reserve Wealth Distribution Data",
          description:
            "The top 1% of US households hold 31% of total wealth while the bottom 50% hold just 2.6%. This gap has widened dramatically since 1980.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "Federal Reserve Distributional Financial Accounts",
          reasoning:
            "Gold-standard official data. Directly establishes the concentration claim but less direct on whether concentration is harmful.",
        },
        {
          id: "bw-job-creation",
          title: "Billionaire Job Creation Studies",
          description:
            "Amazon employs 1.5M+ people; Microsoft 220K+. Entrepreneurial billionaires create firms that employ millions and generate substantial economic activity.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 6,
          },
          source: "Company filings, Bureau of Labor Statistics",
          reasoning:
            "Employment numbers are real, but attribution is complicated — these jobs would likely exist under different ownership structures. Low independence as often cited by wealth-defense advocates.",
        },
        {
          id: "bw-european-wealth-tax",
          title: "European Wealth Tax Outcomes",
          description:
            "Of 12 European countries that implemented wealth taxes, 9 repealed them due to capital flight and low revenue. However, Switzerland and Norway maintain theirs successfully.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source: "OECD Tax Policy Studies, EU Tax Observatory",
          reasoning:
            "Mixed evidence — supports both sides depending on framing. Repeal history is real, but surviving programs suggest design matters more than concept.",
        },
        {
          id: "bw-piketty-analysis",
          title: "Piketty r>g Analysis",
          description:
            "Thomas Piketty's analysis shows that when the rate of return on capital (r) exceeds economic growth (g), wealth concentrates mechanically, creating a self-reinforcing oligarchy.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Piketty, Capital in the Twenty-First Century (2014)",
          reasoning:
            "Influential and data-rich, but contested by economists like Acemoglu & Robinson. The r>g framework is a simplification of complex dynamics.",
        },
      ],
    },
    {
      id: "political-power",
      title: "Political Power",
      short_summary:
        "Billionaires fund campaigns, buy media outlets, and lobby Congress. Is that free speech or legalized oligarchy?",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Billionaire philanthropy fills gaps government can't — the Gates Foundation has saved millions of lives from malaria and polio. Campaign finance is regulated. Many billionaires advocate for higher taxes on themselves. Private initiative is more agile than government bureaucracy.",
      proponent_rebuttal:
        "Billionaires exert outsized influence through lobbying ($3.7B annually), media ownership, and political donations. Gilens & Page showed US policy responds to elite preferences, not the median voter. This is plutocracy, not democracy. The philanthropy model makes public goods dependent on private whims — unaccountable and undemocratic.",
      crux: {
        id: "policy-responsiveness-test",
        title: "Policy Responsiveness to Wealth vs. Median Voter",
        description:
          "Does US policy systematically favor the preferences of wealthy elites over the median voter?",
        methodology:
          "Extend Gilens & Page methodology: compare policy outcomes with preferences of different income groups across a larger sample of policy issues.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$800K (Updated policy responsiveness study)",
      },
      evidence: [
        {
          id: "bw-gilens-page",
          title: "Gilens & Page Oligarchy Study",
          description:
            "Analysis of 1,779 policy issues found that economic elites and organized business groups have substantial impact on policy, while average citizens have little or no independent influence.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source: "Gilens & Page, Perspectives on Politics 2014",
          reasoning:
            "Highly cited and published in top journal. Criticized for measurement choices but findings are directionally consistent with follow-up studies.",
        },
        {
          id: "bw-gates-foundation",
          title: "Gates Foundation Global Health Impact",
          description:
            "The Gates Foundation has contributed over $60B to global health, helping reduce malaria deaths by 60% and supporting polio eradication in all but two countries.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 7,
            directness: 6,
          },
          source: "Gates Foundation Annual Reports, WHO",
          reasoning:
            "Impact is real and measurable. But low independence — foundation self-reports outcomes, and WHO depends on Gates funding. Directness is moderate: shows philanthropy works, not that billionaires are necessary for it.",
        },
        {
          id: "bw-dark-money",
          title: "Dark Money in Politics Data",
          description:
            "Undisclosed political spending has increased from $5M in 2006 to over $1B in recent election cycles. Billionaire-funded super PACs now dominate campaign spending.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "OpenSecrets, Center for Responsive Politics",
          reasoning:
            "Nonpartisan tracking organization with transparent methodology. Spending data is reliable but the influence-to-outcome causal link is debated.",
        },
        {
          id: "bw-giving-pledge",
          title: "Giving Pledge Outcomes",
          description:
            "Over 230 billionaires have signed the Giving Pledge to donate the majority of their wealth. However, signatories' combined wealth has grown faster than their giving, and the pledge is not legally binding.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 5,
          },
          source: "Giving Pledge, Institute for Policy Studies",
          reasoning:
            "Pledge demonstrates intent but is non-binding. IPS analysis shows wealth growth outpacing donations. Low independence as data is self-reported by pledgers.",
        },
      ],
    },
  ],
};
