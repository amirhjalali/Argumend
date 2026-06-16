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
          source: "Directive (EU) 2024/2831, Official Journal of the EU (adopted 23 Oct 2024; in force 1 Dec 2024)",
          sourceUrl: "https://eur-lex.europa.eu/eli/dir/2024/2831/oj",
          reasoning:
            "Major regulatory action by the world's largest single market. The directive reflects extensive policy analysis and stakeholder consultation. However, implementation across 27 member states will vary (transposition deadline 2 Dec 2026), and it hasn't yet been tested in practice.",
        },
        {
          id: "uk-tribunal-rulings",
          title: "UK Tribunals: 100,000+ Gig Drivers Classified as Workers",
          description:
            "On 8 November 2024, a UK Employment Tribunal ruled that Bolt drivers are 'workers' (not employees) entitled to minimum wage, holiday pay, and other protections—a ruling potentially affecting over 100,000 drivers, with lawyers estimating compensation exceeding 200 million pounds. Around the same time, roughly 700 Addison Lee drivers were similarly ruled to be workers, with estimated compensation exceeding 20 million pounds. These rulings follow the Supreme Court's landmark 2021 Uber v Aslam ruling.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "UK Employment Tribunal rulings (Bolt, Nov 2024; Addison Lee, 2024) — Leigh Day",
          sourceUrl: "https://www.leighday.co.uk/news/press-releases/2024-news/bolt-drivers-win-ruling-that-they-are-workers-in-legal-claim-believed-to-be-worth-more-than-200-million/",
          reasoning:
            "Judicial decisions based on detailed examination of actual working conditions. High directness because courts are specifically ruling on the classification question.",
        },
        {
          id: "prop-22-worker-preference",
          title: "California Voters Upheld Gig Worker Independence 59-41%",
          description:
            "California's Proposition 22 (November 2020) exempted app-based drivers from AB5's reclassification of gig workers as employees, passing with 58.6% of the vote. Uber, Lyft, DoorDash and allies spent over $200 million backing it—the most expensive ballot measure in state history. The California Supreme Court unanimously upheld Prop 22 as constitutional in Castellanos v. State of California (25 July 2024). However, a September 2024 CalMatters investigation found that no state agency is enforcing the minimum benefits Prop 22 promised, as the Department of Industrial Relations says it lacks jurisdiction over non-employee earnings.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "Castellanos v. State of California (Cal. Supreme Court, 2024); CalMatters investigation (Sept 2024)",
          sourceUrl: "https://calmatters.org/economy/2024/09/gig-work-california-prop-22-enforcement/",
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
            "McKinsey's 2022 American Opportunity Survey found that 36% of employed respondents—roughly 58 million Americans—identified as independent workers, up from an estimated 27% in 2016. The category spans gig platform workers, freelancers, and side-hustlers; many report choosing independence for flexibility and autonomy. Note: the survey's broad self-report includes high-earning freelance professionals, not only app-based gig drivers.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source: "McKinsey, 'Freelance, side hustles, and gigs' (American Opportunity Survey, 2022)",
          sourceUrl: "https://www.mckinsey.com/featured-insights/sustainable-inclusive-growth/future-of-america/freelance-side-hustles-and-gigs-many-more-americans-have-become-independent-workers",
          reasoning:
            "Large self-reported survey from a reputable firm, but it measures 'independent work' very broadly. Self-reported 'choice' may reflect lack of alternatives, and the broad definition lumps freelance professionals with gig delivery drivers—weakening its directness for the gig-classification debate.",
        },
        {
          id: "gig-worker-net-earnings",
          title: "After Expenses, Gig Workers Often Earn Below Minimum Wage",
          description:
            "After accounting for vehicle costs, fuel, insurance, self-employment taxes, and unpaid waiting time, many gig drivers earn below the effective minimum wage. A 2018 MIT CEEPR working paper (Zoepf et al.) initially reported a median profit of $3.37/hour before taxes; after the authors revised the cost methodology in response to Uber's critique, the median was restated to roughly $8.55/hour (or about $10/hour under an alternative method). Drivers bear vehicle depreciation, maintenance, and accident risk.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Zoepf, Chen, Adu & Pozo, 'The Economics of Ride-Hailing,' MIT CEEPR Working Paper 2018-005 (Feb 2018, revised)",
          sourceUrl: "https://www.semanticscholar.org/paper/The-economics-of-ride-hailing:-driver-revenue,-and-Zoepf-Chen/9511179f75d533e6d075f8ff079b5fe9b65110af",
          reasoning:
            "The exact figure has been openly debated—the headline number was revised upward from $3.37 to ~$8.55/hour after methodological critique—so it should be cited with that caveat. The core point, that gross hourly pay significantly overstates actual net worker compensation, is well-established.",
        },
      ],
    },
  ],
};
