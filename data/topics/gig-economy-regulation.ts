export const gigEconomyRegulationData = {
  id: "gig-economy-regulation",
  title: "Gig Economy Regulation",
  question: "Should gig platforms have to classify their workers as employees?",
  meta_claim:
    "Gig economy platforms (Uber, Lyft, DoorDash, etc.) should be required to classify their workers as employees rather than independent contractors, providing full labor protections.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "California's Proposition 22, which keeps app-based drivers as independent contractors rather than employees, passed with 58.6% of the vote in 2020 and was upheld by the state Supreme Court in 2024. California's labor agency now says it lacks jurisdiction over non-employee claims, so most complaints under Prop 22's minimum-earnings and health-stipend promises go unresolved. The fight is over whether flexibility is worth what drivers give up by not being employees.",
    confidence: 88,
    source:
      "Castellanos v. State of California (Cal. Supreme Court, 25 July 2024; Prop 22 passed 58.6% in Nov 2020); CalMatters investigation, 'California companies wrote their own gig worker law. Now no one is enforcing it' (4 Sept 2024)",
    sourceUrl: "https://calmatters.org/economy/2024/09/gig-work-california-prop-22-enforcement/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that gig work offers schedule flexibility traditional jobs rarely do, that the legal test should turn on the day-to-day working relationship rather than the contract's label, and that reclassifying drivers as employees would raise platform labor costs, some of which would reach prices, hours or the number of shifts.",
    "They split over how much control platform algorithms really exert over fares, dispatch and deactivation compared with employers and true contractors — the question behind California's Prop 22 vote, the UK's Uber and Bolt rulings and the EU's 2024 Platform Work Directive; and over whether employee status would leave gig workers better off overall once pay, hours and market size are counted.",
  ],
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
        question:
          "How much control do platform algorithms really exert, compared with employers and true contractors?",
        description:
          "Quantifying the degree to which platform algorithms control gig worker behavior compared to traditional employment relationships, to determine if the 'independent contractor' classification is factually accurate.",
        methodology:
          "Audit platform algorithms for: pricing control, route assignment, acceptance rate thresholds, deactivation criteria, and performance monitoring. Compare worker autonomy metrics to traditional employment and genuine independent contracting (e.g., freelance consultants).",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Platform data, released to regulators or researchers, on how often drivers and couriers are penalized, deactivated or nudged for declining jobs or choosing their hours, compared with the discretion employees and true contractors have in similar work.",
        },
        cost_to_verify: "$500K (Platform algorithm audit study—requires legal discovery or regulatory access)",
        falsification: {
          supporter_flip:
            "If an algorithm audit showed drivers genuinely operate like independent businesses — setting their own prices, choosing clients, facing no acceptance-rate scoring or unilateral deactivation, and bearing no more control than a freelance consultant — then the 'misclassification' case would collapse and the contractor label would be factually accurate.",
          skeptic_flip:
            "If audits confirmed that platforms set the fare, assign the trip, score acceptance and cancellation and deactivate without appeal, the levers courts weighed in Uber v Aslam and the 2024 Bolt tribunal, 'they choose their hours' would no longer settle that drivers are independent.",
          common_ground:
            "Both sides agree gig work offers schedule flexibility that traditional employment rarely does, and that the legal test should turn on the actual day-to-day working relationship rather than the contract's label.",
          live_disagreement:
            "How much functional control platform algorithms actually exert relative to traditional employment and genuine independent contracting — which only a transparent audit of pricing, dispatch, monitoring, and deactivation criteria (requiring legal discovery or regulatory access) could quantify.",
        },
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
            "On 8 November 2024, a UK Employment Tribunal ruled that Bolt drivers are 'workers' (not employees) entitled to minimum wage, holiday pay, and other protections—a ruling covering all of the 100,000-plus drivers who work through the Bolt app, with Leigh Day estimating that compensation for its 15,000 claimants could exceed 200 million pounds. In January 2025 a tribunal ruled that Addison Lee drivers, about 700 of whom had brought claims, are workers, with passenger, courier and executive drivers working whenever they are logged on to the company's app; after a March 2026 remedy ruling, with more than 900 drivers in the claim, Leigh Day estimated their compensation was likely to exceed 20 million pounds. These rulings follow the Supreme Court's landmark 2021 Uber v Aslam ruling.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "UK Employment Tribunal rulings (Bolt, 8 Nov 2024; Addison Lee, Jan 2025 and 19 Mar 2026), as reported by claimants' firm Leigh Day",
          sourceUrl: "https://www.leighday.co.uk/news/press-releases/2024-news/bolt-drivers-win-ruling-that-they-are-workers-in-legal-claim-believed-to-be-worth-more-than-200-million/",
          reasoning:
            "Judicial decisions based on detailed examination of actual working conditions. High directness because courts are specifically ruling on the classification question.",
        },
        {
          id: "prop-22-worker-preference",
          title: "California Voters Upheld Gig Worker Independence 59-41%",
          description:
            "California's Proposition 22 (November 2020) exempted app-based drivers from AB5's reclassification of gig workers as employees, passing with 58.6% of the vote. Uber, DoorDash, Lyft, Instacart and Postmates put $205.7 million into the Yes campaign—at the time the most an initiative campaign had ever received in California, a record since passed by the 2022 sports-betting measures. The California Supreme Court unanimously upheld Prop 22 as constitutional in Castellanos v. State of California (25 July 2024). However, a September 2024 CalMatters investigation found that no state agency is enforcing the minimum benefits Prop 22 promised: the Department of Industrial Relations says it lacks jurisdiction over independent contractors, and at least 32 of the 54 Prop 22 claims workers had filed with it since December 2020 were unresolved.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "CalMatters investigation, 'California companies wrote their own gig worker law. Now no one is enforcing it' (4 Sept 2024); Castellanos v. State of California (Cal. Supreme Court, 25 July 2024); certified vote and campaign-finance totals as compiled by Ballotpedia",
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
        "Reclassification raises labor costs sharply, and those costs flow through to riders and to drivers' own hours: industry and academic estimates put the price impact in the rough range of 20-40%, which depresses demand and the number of available shifts. The independent-work model is also large and growing—McKinsey's 2022 survey found 36% of employed Americans (roughly 58 million people, up from about 27% in 2016) identify as independent workers, spanning freelancers and side-hustlers as well as app drivers. For workers often shut out of W-2 jobs (recent immigrants, people with criminal records, people with disabilities or caregiving constraints), the gig model offers a low-barrier on-ramp that rigid employment rules can foreclose. Labor law built for the factory floor does not map cleanly onto on-demand digital work.",
      proponent_rebuttal:
        "The 'flexibility' framing obscures who bears the risk: drivers absorb vehicle costs, insurance, and injury exposure while the platform keeps the algorithmic upside, and 'choice' is thin when better alternatives are scarce. Gross hourly pay also overstates take-home—after fuel, insurance, depreciation, self-employment taxes, and unpaid waiting time, net earnings fall well below the headline figure. Crucially, employee status need not kill flexibility: the question is whether basic protections (minimum-wage floors, injury coverage, paid leave) can be attached to flexible work, and several European economies with stronger labor rules still sustain active platform sectors. The EU directive is a live test of whether regulation and on-demand innovation can coexist rather than a foregone tradeoff.",
      crux: {
        id: "reclassification-impact-study",
        title: "Reclassification Impact on Worker Welfare and Market Size",
        question:
          "Would employee status leave gig workers better off overall, once pay, hours and market size are counted?",
        description:
          "Measuring the net effect of employee reclassification on worker total compensation, platform prices, market size, and consumer welfare.",
        methodology:
          "Compare gig economy outcomes in jurisdictions with employee classification (post-EU directive) vs. independent contractor classification (US). Measure worker income (including benefits), hours worked, platform utilization, and consumer prices.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compare pay, hours worked, number of active workers, prices and wait times before and after places reclassified gig workers, such as Spain under its 2021 rider law, against similar places that did not, using platform and tax data.",
        },
        cost_to_verify: "$1M (Cross-jurisdictional comparative study after EU directive implementation)",
        falsification: {
          supporter_flip:
            "If post-directive data from the EU showed reclassification sharply shrank the market — platforms cutting onboarded drivers, capping hours, and raising consumer prices enough that total worker earnings and available work fell — then mandating employee status would be a net loss for the very workers it aims to protect.",
          skeptic_flip:
            "If European economies with stronger labor rules kept active platform sectors after reclassification, and take-home pay net of fuel, insurance, depreciation and unpaid waiting time came in well below headline gross pay, 'reclassification destroys the model' would lose its footing.",
          common_ground:
            "Both sides agree reclassification raises platform labor costs and that some of that cost flows through to prices, hours, or the number of available shifts; the dispute is the magnitude and who ultimately bears it.",
          live_disagreement:
            "The net effect of employee status on total worker compensation (wages plus benefits), hours worked, market size, and consumer prices — which only a cross-jurisdictional comparison of EU-directive outcomes against US contractor markets, after implementation, can resolve.",
        },
      },
      evidence: [
        {
          id: "mckinsey-independent-workers",
          title: "McKinsey: 36% of Employed Americans Identify as Independent Workers",
          description:
            "McKinsey's 2022 American Opportunity Survey found that 36% of employed respondents—roughly 58 million Americans—identified as independent workers, up from an estimated 27% in 2016. The category spans gig platform workers, freelancers, temps and side-hustlers. About a quarter said they do independent work for the autonomy and flexibility it offers; just over a quarter said they do it out of necessity to support basic family needs, up from 14% in McKinsey's 2016 research. Note: the survey's broad self-report includes high-earning freelance professionals (a third of employed respondents earning more than $150,000 a year also said they work independently), not only app-based gig drivers.",
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
            "Large self-reported survey from a reputable firm (5,280 independent-worker respondents), but it measures 'independent work' very broadly. As many respondents cited necessity as cited flexibility, and the broad definition lumps freelance professionals with gig delivery drivers—weakening its directness for the gig-classification debate.",
        },
        {
          id: "gig-worker-net-earnings",
          title: "After Vehicle Costs, 41-54% of Surveyed Ride-Hail Drivers Earned Below Minimum Wage (Revised MIT Estimate)",
          description:
            "After vehicle costs (insurance, maintenance, fuel and depreciation), many ride-hail drivers earn below their state's minimum wage. A February 2018 MIT CEEPR working paper (Zoepf, Chen, Adu and Pozo), built on a survey of more than 1,100 Uber and Lyft drivers, initially reported a median pretax profit of $3.37/hour, with 74% of drivers below minimum wage and 30% losing money. After Uber's chief economist criticized how the survey's income answers had been interpreted, lead author Stephen Zoepf restated the median as $8.55/hour (or $10/hour under an alternative method), with 54% (or 41%) of drivers still earning less than their state's minimum wage and 8% (or 4%) losing money. The figures are before taxes, and drivers carry those vehicle costs themselves.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Zoepf, Chen, Adu & Pozo, 'The Economics of Ride-Hailing: Driver Revenue, Expenses and Taxes,' MIT CEEPR working paper (Feb 2018, under revision); revised figures from Zoepf's statement as reported by NPR, 'Researcher Says Criticism Is Valid, Will Revise Study Finding Low Driver Pay' (7 Mar 2018)",
          sourceUrl: "https://www.npr.org/sections/thetwo-way/2018/03/07/591430857/researcher-says-criticism-is-valid-will-revise-study-finding-low-uber-and-lyft-p",
          reasoning:
            "The exact figure has been openly debated—the headline number was revised upward from $3.37 to $8.55-$10/hour within days of a methodological critique, and Lyft said even the revised figures understate earnings—so it should be cited with that caveat. The paper is still listed by MIT CEEPR as under revision. The core point, that gross hourly pay overstates net driver compensation once vehicle costs are counted, survives the revision.",
        },
      ],
    },
  ],
};
