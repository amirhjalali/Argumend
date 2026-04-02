import type { Topic } from "@/lib/schemas/topic";

export const gigEconomyRegulationData = {
  id: "gig-economy-regulation",
  title: "Gig Economy Regulation",
  meta_claim:
    "Gig economy platforms (Uber, Lyft, DoorDash, etc.) should be required to classify their workers as employees rather than independent contractors, providing full labor protections.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "worker-classification",
      title: "Worker Classification & Protections",
      short_summary:
        "Uber sets the price, controls dispatch, and can deactivate drivers at will. By most legal definitions, that is an employer. Uber says otherwise.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Gig workers choose when, where, and how much to work—the defining feature of independent contracting. Surveys consistently show that 70-80% of gig workers value flexibility above all else. Reclassification would destroy the business model: Uber and Lyft would have to set schedules, limit hours, and dramatically raise prices. Many workers would lose the flexibility that attracted them. California's AB5 (2019) attempt to force reclassification was overturned by voters in Proposition 22 (2020) by 59%.",
      proponent_rebuttal:
        "Platform algorithms dictate pricing, routing, acceptance rates, and even deactivation thresholds—this is functional control, not independence. Gig workers earn a median of $15-18/hour before expenses, with no health insurance, retirement contributions, unemployment insurance, or workers' compensation. UK Employment Tribunals in 2024 ruled 100,000+ Bolt drivers are workers entitled to employment protections. The EU's Platform Work Directive (adopted October 2024) creates a rebuttable presumption of employment for platform workers.",
      crux: {
        id: "algorithmic-control-measurement",
        title: "Measuring Algorithmic Control vs. Worker Autonomy",
        description:
          "Quantifying the degree to which platform algorithms control gig worker behavior compared to traditional employment relationships, to determine if the 'independent contractor' classification is factually accurate.",
        methodology:
          "Audit platform algorithms for: pricing control, route assignment, acceptance rate thresholds, deactivation criteria, and performance monitoring. Compare worker autonomy metrics to traditional employment and genuine independent contracting (e.g., freelance consultants).",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Platform algorithm audit study—requires legal discovery or regulatory access)",
      },
      evidence: [
        {
          id: "eu-platform-directive",
          title: "EU Platform Work Directive: Presumption of Employment (2024)",
          description:
            "The European Parliament and Council adopted the Platform Work Directive (EU 2024/2831) in October 2024, creating a rebuttable presumption of employment for platform workers. Under the directive, if a platform appears to direct and control work, the burden falls on the platform to prove the relationship is not employment. Member states must implement the directive by December 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "EU Directive 2024/2831; European Parliament",
          reasoning:
            "Major regulatory action by the world's largest single market. The directive reflects extensive policy analysis and stakeholder consultation. However, implementation across 27 member states will vary, and it hasn't yet been tested in practice.",
        },
        {
          id: "uk-tribunal-rulings",
          title: "UK Tribunals: 100,000+ Gig Drivers Classified as Workers",
          description:
            "In November 2024, a UK Employment Tribunal ruled that over 100,000 Bolt drivers are workers entitled to minimum wage, holiday pay, and other employment protections, with potential backdated compensation exceeding 200 million pounds. In January 2025, all 700 Addison Lee drivers were similarly classified. These rulings follow the Supreme Court's landmark 2021 Uber ruling.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "UK Employment Tribunal rulings (2024-2025)",
          reasoning:
            "Judicial decisions based on detailed examination of actual working conditions. High directness because courts are specifically ruling on the classification question.",
        },
        {
          id: "prop-22-worker-preference",
          title: "California Voters Upheld Gig Worker Independence 59-41%",
          description:
            "California's Proposition 22 (November 2020) overturned AB5's forced reclassification of gig workers as employees, passing with 59% of the vote. Uber, Lyft, and DoorDash spent over $200 million campaigning for it. The California Supreme Court unanimously upheld Prop 22 as constitutional in July 2024. However, a 2024 CalMatters investigation found that no enforcement agency is ensuring companies actually provide the minimum benefits Prop 22 promised.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "California Secretary of State; CalMatters investigation (2024)",
          reasoning:
            "Democratic legitimacy of the vote is real but the $200M+ campaign spending and subsequent non-enforcement undermine the argument that the outcome reflects informed worker preference.",
        },
      ],
    },
    {
      id: "economic-tradeoffs",
      title: "Economic Tradeoffs",
      short_summary:
        "California's AB5 reclassified gig workers as employees. Uber spent $200M on Prop 22 to undo it. Drivers remain split on which they prefer.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Reclassification would raise ride-hailing and delivery costs by 20-40%, reducing demand and eliminating jobs. McKinsey found 36% of employed Americans (70+ million) identify as independent workers—many by choice. The gig economy provides crucial entry points for workers excluded from traditional employment (immigrants, those with criminal records, people with disabilities). Regulation designed for the industrial era does not fit the digital economy.",
      proponent_rebuttal:
        "The 'flexibility' argument masks exploitation: gig workers bear all the risks (vehicle costs, insurance, injury) while platforms capture the value. Median gig worker earnings of $15-18/hour before expenses fall to $10-12/hour after gas, insurance, and vehicle depreciation. Countries with stronger labor protections (Denmark, Netherlands) maintain vibrant gig economies while ensuring basic worker rights. The EU directive shows regulation and innovation can coexist.",
      crux: {
        id: "reclassification-impact-study",
        title: "Reclassification Impact on Worker Welfare and Market Size",
        description:
          "Measuring the net effect of employee reclassification on worker total compensation, platform prices, market size, and consumer welfare.",
        methodology:
          "Compare gig economy outcomes in jurisdictions with employee classification (post-EU directive) vs. independent contractor classification (US). Measure worker income (including benefits), hours worked, platform utilization, and consumer prices.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Cross-jurisdictional comparative study after EU directive implementation)",
      },
      evidence: [
        {
          id: "mckinsey-independent-workers",
          title: "McKinsey: 36% of Americans Are Independent Workers",
          description:
            "McKinsey research found that 36% of employed Americans (approximately 70 million people) identified as independent workers in 2024, more than double the 2020 figure. The number working full-time as independents rose from 13.6 million (8.2% of the workforce) in 2020 to 27.7 million (16.7%) in 2024. Many report choosing independence for flexibility, autonomy, and higher earning potential.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "McKinsey Global Institute (2024)",
          reasoning:
            "Large-scale data from a reputable source. However, self-reported 'choice' may reflect lack of alternatives, and the broad definition includes freelance professionals very different from gig delivery drivers.",
        },
        {
          id: "gig-worker-net-earnings",
          title: "After Expenses, Gig Workers Often Earn Below Minimum Wage",
          description:
            "Multiple studies have found that after accounting for vehicle costs, fuel, insurance, self-employment taxes, and unpaid waiting time, many gig drivers earn below the effective minimum wage. A 2018 MIT study found Uber and Lyft drivers earned a median of $8.55/hour after expenses (later revised upward to $10-12/hour). Drivers bear 100% of vehicle depreciation, maintenance, and accident risk.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Zoepf et al., MIT Center for Energy and Environmental Policy Research (2018, revised)",
          reasoning:
            "The earnings calculation is directionally correct though the exact figure has been debated. The core point—that gross hourly pay significantly overstates actual worker compensation—is well-established.",
        },
      ],
    },
  ],
};
