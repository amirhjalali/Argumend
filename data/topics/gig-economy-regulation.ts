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
        "Gig workers choose when, where, and how much to work—the defining feature of independent contracting, and one no traditional employer offers: a driver can log off mid-shift, work two competing apps at once, and answer to no manager. Surveys consistently find that a large majority of gig workers value this flexibility above all else, and many use the work as a supplemental income stream rather than a primary job. Reclassification would erode the model: to control labor costs, platforms would likely move toward set shifts, capped hours, and fewer onboarded drivers—pricing some workers out entirely. California's AB5 (2019) tried to force reclassification, but app-based drivers were carved back out by Proposition 22 (2020), which passed with 58.6% of the vote and was unanimously upheld as constitutional by the California Supreme Court in Castellanos v. State of California (July 2024).",
      proponent_rebuttal:
        "Platform algorithms set the fare, assign the trip, score acceptance and cancellation rates, and can deactivate a driver without appeal—functional control that looks far more like employment than genuine self-employment, where a contractor sets prices and chooses clients. Drivers also bear costs no contractor running a real business would accept blindly: fuel, insurance, depreciation, and injury risk, and once those are netted out, take-home pay is materially lower than the gross fare suggests. Courts examining the day-to-day reality, not the contract label, have repeatedly sided with workers: on 8 November 2024 a UK Employment Tribunal ruled that Bolt drivers are 'workers' (an intermediate UK category entitling them to minimum wage, holiday pay, and rest breaks, though short of full 'employee' status), a decision affecting more than 100,000 drivers. The EU's Platform Work Directive (EU 2024/2831, adopted October 2024) goes further, creating a rebuttable presumption of employment when a platform directs and controls the work.",
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
        "California's AB5 reclassified gig workers as employees. The industry spent over $200M on Prop 22 to carve drivers back out—and won, 58.6% to 41.4%. Drivers themselves remain split on which model they prefer.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Reclassification raises labor costs sharply, and those costs flow through to riders and to drivers' own hours: industry and academic estimates put the price impact in the rough range of 20-40%, which depresses demand and the number of available shifts. The independent-work model is also large and growing by choice—McKinsey's 2022 survey found 36% of employed Americans (roughly 58 million people, up from about 27% in 2016) identify as independent workers, spanning freelancers and side-hustlers as well as app drivers. For workers often shut out of W-2 jobs (recent immigrants, people with criminal records, people with disabilities or caregiving constraints), the gig model offers a low-barrier on-ramp that rigid employment rules can foreclose. Labor law built for the factory floor does not map cleanly onto on-demand digital work.",
      proponent_rebuttal:
        "The 'flexibility' framing obscures who bears the risk: drivers absorb vehicle costs, insurance, and injury exposure while the platform keeps the algorithmic upside, and 'choice' is thin when better alternatives are scarce. Gross hourly pay also overstates take-home—after fuel, insurance, depreciation, self-employment taxes, and unpaid waiting time, net earnings fall well below the headline figure. Crucially, employee status need not kill flexibility: the question is whether basic protections (minimum-wage floors, injury coverage, paid leave) can be attached to flexible work, and several European economies with stronger labor rules still sustain active platform sectors. The EU directive is a live test of whether regulation and on-demand innovation can coexist rather than a foregone tradeoff.",
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
