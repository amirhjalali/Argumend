export const congestionPricingData = {
  id: "congestion-pricing",
  title: "Congestion Pricing",
  question: "Does congestion pricing cut traffic and fund transit effectively?",
  aliases: [
    "Road pricing",
    "Downtown driving charges",
    "City center entry fees",
    "Motorist charges on central streets",
  ],
  meta_claim:
    "Congestion pricing is an effective policy for cutting urban traffic and funding transit.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Stockholm's 2014 overview reported cordon traffic about 20% below 2005 levels when charges applied through 2013. TfL found London's congestion back at its pre-charging 2002 level in 2007 despite lower traffic volumes. Counting fewer vehicles and measuring faster journeys are different outcomes.",
    confidence: 84,
    source:
      "Eliasson (2014), Table 1; London's primary monitoring report is linked in the evidence",
    sourceUrl: "https://www.transportportal.se/swopec/cts2014-7.pdf",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Congestion pricing charges drivers for entering busy city centers or using crowded roads. Its goals include fewer vehicles, faster journeys and money for buses and other transport. Each outcome needs its own test.",
    "The split concerns whether travel improvements last and whether receipts after costs remain large enough to support transport plans. Compare measures with the same geography, period and baseline.",
  ],
  last_updated: "2026-10-18",
  tags: ["transport", "cities", "traffic", "taxation", "transit"],
  pillars: [
    {
      id: "traffic-reduction",
      title: "Cutting Traffic",
      short_summary:
        "London and Stockholm records report fewer vehicles after pricing. Travel delay and vehicle totals are different measures that need to be tracked separately.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Fewer entries do not guarantee faster journeys when road capacity changes. TfL's 2008 report found that London's early congestion improvement had disappeared against a fixed baseline. The case for caution is to measure travel delay, diversions and conditions outside charging hours, rather than treat a lower vehicle count as the entire result.",
      proponent_rebuttal:
        "The case for pricing is that reducing peak-time driving demand frees road space, even when later works or a deliberate reallocation of lanes absorb that gain. Stockholm's counts show persistence over the reported period. New York's early monitoring also reports lower entries, although its historical comparison is not a long-run controlled study.",
      crux: {
        id: "cordon-traffic-elasticity",
        title: "Does the Traffic Cut Persist?",
        question:
          "Over the years, what lasts: the drop in cars entering the zone, or faster journey times?",
        description:
          "Whether the reduction in vehicles entering a priced zone is durable, or whether traffic rebounds and congestion benefits decay once behavior re-adapts.",
        methodology:
          "Use automated cordon counts and journey-time/speed telemetry before and after pricing, then track them for 5-15 years. Control for fuel prices, ride-hail growth, road-space reallocation, and economic cycles. Compare priced cordons against untolled control corridors.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Automated cordon counts and journey-time telemetry tracked for 5 to 15 years after pricing in several cities, against untolled control corridors, controlling for fuel prices, ride-hail growth and road-space changes.",
        },
        cost_to_verify: "$0 (published government count data)",
        falsification: {
          supporter_flip:
            "If credible comparisons across several cities found repeated rebounds in vehicle entries and no lasting reduction in travel delay, the case for durable traffic benefits would weaken.",
          skeptic_flip:
            "If priced zones maintained lower entries and shorter delays against credible controls over many years, after accounting for capacity changes and diversions, the expectation that benefits fade would need revision.",
          common_ground:
            "Both cases distinguish vehicle entries from travel delay and accept that changes in road capacity affect the comparison.",
          live_disagreement:
            "Whether pricing durably reduces driving demand and travel delay, after accounting for road capacity, other transport changes and trips diverted outside the priced area or hours.",
        },
      },
      evidence: [
        {
          id: "stockholm-persistent-cut",
          title: "Stockholm: Lower Cordon Traffic in Charging Periods Through 2013",
          description:
            "The 2014 overview reports weekday cordon traffic 21.0% below 2005 during the 2006 trial and 22.1% below in 2013. Traffic rebounded when the trial ended and fell again when charges returned in 2007. Adjusted estimates end in 2011; the 2012-2013 figures do not adjust for outside factors.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Jonas Eliasson, 'The Stockholm congestion charges: an overview,' CTS Working Paper 2014:7, Table 1, p. 9",
          sourceUrl: "https://www.transportportal.se/swopec/cts2014-7.pdf",
          reasoning:
            "A dated working paper with published counts and adjustment assumptions. It supports persistence across the years studied, without establishing current traffic levels.",
        },
        {
          id: "nyc-first-year",
          title: "New York: 11% Fewer Entries Against a Historical Baseline, Jan-Oct 2025",
          description:
            "MTA estimated 11% fewer entries from January 5 through October 2025 than a seasonally adjusted historical baseline, including untolled roadways. Weekday morning inbound crossing speeds averaged 23% higher than in 2024; peak-hour speeds in the zone and untolled roadways rose 4.6%. These are different measures and observational comparisons.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 9,
          },
          source:
            "MTA, 'Congestion Relief Zone Tolling: First Evaluation Report' (January 2026), pp. 7-9 and 23-24",
          sourceUrl: "https://www.mta.info/document/195631",
          reasoning:
            "Operator analysis over a short period, not independent replication.",
        },
        {
          id: "london-congestion-decay",
          title: "London: Congestion Returned to Its 2002 Level in 2007 Despite Lower Traffic",
          description:
            "TfL's 2008 report found 21% fewer vehicles with four or more wheels entering the original zone in 2007 than in 2002, but congestion was back at the 2002 level. TfL linked this to lost effective capacity, including roadworks and road-space reallocation, and still estimated relief relative to a scenario without charging.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source:
            "Transport for London, 'Central London Congestion Charging: Impacts Monitoring, Sixth Annual Report' (July 2008), pp. 3-4 and 40",
          sourceUrl:
            "https://content.tfl.gov.uk/central-london-congestion-charging-impacts-monitoring-sixth-annual-report.pdf",
          reasoning:
            "Primary monitoring distinguishes traffic volume, measured congestion and an estimated counterfactual. Returning to an old baseline does not show what would have happened without the charge.",
        },
      ],
    },
    {
      id: "transit-funding",
      title: "Funding Transit",
      short_summary:
        "Compare money available for transport after operating and financing costs with the commitments it must support. Annual receipts and capital borrowing are different quantities.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The case for caution concerns money available after operating, enforcement and financing costs, and whether it will persist. Rates and exemptions can change. New York's 2024 revision changed the initial toll while keeping the stated financing goal; a lower opening toll alone does not establish a capital-funding shortfall.",
      proponent_rebuttal:
        "The case for funding is that a dedicated recurring source can support capital borrowing and transport upgrades. Agency accounts report surpluses, but the money available for new projects must be checked after financing and startup costs. Early receipts show that a stream exists; its future size still needs testing.",
      crux: {
        id: "net-revenue-durability",
        title: "Is the Net Revenue Large and Durable?",
        question:
          "Is net toll revenue large and stable enough to matter for transit funding?",
        description:
          "Whether congestion charges generate net (post-collection-cost) revenue that is both materially large relative to transit needs and stable enough to bond against for decades.",
        methodology:
          "Audit gross receipts minus collection, enforcement, and administration costs over multiple years; compare net revenue to the transit capital/operating gap it is meant to close; assess legal and political durability (litigation, exemptions, rate freezes).",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Audited multi-year receipts net of collection, enforcement and administration costs, set against the transit gap they are meant to close, along with the record of toll cuts, exemptions and litigation.",
        },
        cost_to_verify: "$0 (published agency financial filings)",
        falsification: {
          supporter_flip:
            "If multi-year accounts showed funds available for transport repeatedly falling below the commitments they must support, after all operating and financing costs, the case for a durable funding source would weaken.",
          skeptic_flip:
            "If audited receipts remained large enough after all costs to sustain transport commitments through rate changes and economic cycles, the claim that this is a fragile funding base would need revision.",
          common_ground:
            "Both cases distinguish gross charges, operating costs, financing costs and funds actually available for transport.",
          live_disagreement:
            "How much money remains available for transport over time, and whether that stream can sustain commitments through changes in rates, exemptions, costs and political decisions.",
        },
      },
      evidence: [
        {
          id: "nyc-revenue-target-met",
          title: "New York: $467.8M Net Operating Revenue Through October 2025",
          description:
            "MTA reported unaudited January-October 2025 toll income of $573.1 million minus $105.3 million in operating costs, leaving $467.8 million. Net operating revenue is calculated before infrastructure debt service; some receipts helped pay infrastructure financing costs. This is not a final year-end total.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 8,
          },
          source:
            "MTA, 'Congestion Relief Zone Tolling: First Evaluation Report' (January 2026), Table 6-1 and p. 68",
          sourceUrl: "https://www.mta.info/document/195631",
          reasoning:
            "Same operator report as the traffic card. Financing limits the amount available for new projects.",
        },
        {
          id: "nyc-revenue-shortfall",
          title: "New York's 2024 Revision Lowered the Initial Toll, Keeping Its Financing Goal",
          description:
            "The November 2024 plan lowered the initial daytime car E-ZPass toll from $15 to $9, with higher phases later. It still projected support for $15 billion in transit financing. Rate revisions introduce planning uncertainty, but this document does not establish that capital funding was halved.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 4,
          },
          source:
            "New York Governor's Office, revised congestion-pricing plan announcement (November 14, 2024)",
          sourceUrl:
            "https://www.governor.ny.gov/news/putting-commuters-first-keeping-costs-down-governor-hochul-unveils-plans-future-transit-and",
          reasoning:
            "A policy plan, not an outcome audit. It documents rate changes and financing intent; it cannot by itself establish a cash shortfall or long-term durability.",
        },
        {
          id: "london-revenue-modest",
          title: "London: Net Charging Income Declined in 2024/25",
          description:
            "TfL's accounts show £341.6 million in Congestion Charge income for the year ended March 31, 2025, less £128.0 million for toll facilities and traffic management and £4.1 million for administration, support and depreciation. Net income was £209.5 million, down from £235.6 million the previous year, and supports the Mayor's Transport Strategy. These figures exclude the separate emissions-zone accounts.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Transport for London, 'Annual Report and Statement of Accounts 2024/25,' Note 1(c), p. 138",
          sourceUrl:
            "https://content.tfl.gov.uk/tfl-annual-report-and-statement-of-accounts-2024-25.pdf",
          reasoning:
            "Shows year-to-year variation in net receipts, not failure to cover costs. One decline does not establish chronic funding failure or erase the recorded surplus.",
        },
      ],
    },
  ],
};
