import type { Topic } from "@/lib/schemas/topic";

export const congestionPricingData = {
  id: "congestion-pricing",
  title: "Congestion Pricing",
  meta_claim:
    "Congestion pricing is an effective policy for cutting urban traffic and funding transit.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Congestion pricing isn't the political third rail people assume: in Stockholm, public support flipped from roughly 36% before the 2006 trial to about 66-70% after residents lived with it, and the ~20% cut in cars crossing the cordon has held for nearly two decades. The honest catch is that fewer cars doesn't automatically mean lasting time savings — London's headline congestion benefit decayed from about 30% to roughly 7% within a few years as freed road space got reallocated and exempt ride-hail trips surged.",
    confidence: 84,
    source:
      "Eliasson, J. (2014), 'The Stockholm congestion charges: an overview', CTS Working Paper 2014:7 (KTH); Transport for London monitoring reports",
    sourceUrl: "https://swopec.hhs.se/ctswps/abs/ctswps2014_007.htm",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Every major scheme — London, Stockholm, Singapore, and now New York — has produced a real, measured drop in vehicles entering the charged zone (typically 10-25%), the one variable a price directly controls, and Stockholm's cut has held for ~20 years while public support roughly doubled once people experienced it.",
    "But cutting car counts is not the same as durably cutting congestion: London's reported journey-time benefit fell from ~30% to ~7% within a few years, and net revenue earmarked for transit can be halved, paused, or sued over — New York's relaunched 2025 program targets ~$500M, about half the original ~$1B/year plan.",
    "So the honest debate isn't whether pricing reduces the number of cars (it reliably does) but whether the time savings and the transit funding are large and durable enough — once road space is reallocated, exemptions multiply, and politics intervenes — to justify the charge.",
  ],
  last_updated: "2026-06-16",
  tags: ["transport", "cities", "traffic", "taxation", "transit"],
  pillars: [
    {
      id: "traffic-reduction",
      title: "Cutting Traffic",
      short_summary:
        "Cordon pricing has reliably cut the number of vehicles entering charged zones — typically 10-25% — across London, Stockholm, Singapore, and New York.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Pricing reduces vehicle counts at the cordon, but the headline congestion benefit erodes. London's vehicle entries fell ~21%, yet TfL's own data show the congestion (journey-time) improvement decayed from ~30% in 2003 to roughly 7% by 2006-07, and central-London speeds later returned close to pre-charge levels as road reallocation, roadworks, and exempt private-hire vehicles filled the freed space. A charge can shrink car counts while leaving people no better off on the clock — and it can simply displace trips to the boundary and untolled hours rather than eliminate them.",
      proponent_rebuttal:
        "Every major scheme has produced a durable, measured cut in traffic entering the zone, which is the variable pricing directly controls. Stockholm's cordon traffic dropped ~20% on day one of the 2006 trial and the reduction has held — even grown slightly — for nearly two decades. New York's first-year program (2025) saw roughly 11-12% fewer vehicles and morning crossing times up to ~50% faster at some tunnels. London's later speed decline was driven by deliberate road-space reallocation to buses, bikes, and pedestrians and by an Uber-era surge in exempt private-hire cars — fixable design choices, not failure of the price mechanism itself.",
      crux: {
        id: "cordon-traffic-elasticity",
        title: "Does the Traffic Cut Persist?",
        description:
          "Whether the reduction in vehicles entering a priced zone is durable, or whether traffic rebounds and congestion benefits decay once behavior re-adapts.",
        methodology:
          "Use automated cordon counts and journey-time/speed telemetry before and after pricing, then track them for 5-15 years. Control for fuel prices, ride-hail growth, road-space reallocation, and economic cycles. Compare priced cordons against untolled control corridors.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (published government count data)",
        falsification: {
          supporter_flip:
            "If long-run cordon counts and speed telemetry showed the traffic cut consistently rebounding to baseline within a few years once drivers re-adapt — the way London's journey-time benefit decayed from ~30% to ~7% — across multiple cities rather than just one, the 'durable cut' case would weaken to 'a transient shock that fades.'",
          skeptic_flip:
            "A skeptic who expects rebound should weigh that Stockholm's ~20% cordon reduction has held — even grown slightly — for nearly two decades after the charge was made permanent, and that London's later speed decline tracks deliberate road-space reallocation and exempt private-hire growth, not the price losing its grip.",
          common_ground:
            "Both sides agree pricing produces an immediate, measurable drop in vehicles entering the cordon; the dispute is about what happens to congestion (journey times) over the following years.",
          live_disagreement:
            "Whether the durable variable is the car-count reduction or the time-savings benefit — which only multi-city cordon counts and journey-time telemetry tracked for 5-15 years, controlling for road reallocation, ride-hail growth, and exemptions, can settle.",
        },
      },
      evidence: [
        {
          id: "stockholm-persistent-cut",
          title: "Stockholm: ~20% Cordon Traffic Cut, Sustained 15+ Years",
          description:
            "Traffic across the Stockholm cordon fell ~20% when charges launched in 2006; after a referendum made them permanent in 2007 the reduction held and, controlling for external factors, increased slightly over time. About a quarter of person-trips across the cordon shifted off the road, roughly 10 percentage points to transit.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Eliasson, J. (2014), 'The Stockholm congestion charges: an overview', CTS Working Paper 2014:7, Centre for Transport Studies (KTH)",
          sourceUrl: "https://swopec.hhs.se/ctswps/abs/ctswps2014_007.htm",
          reasoning:
            "Peer-reviewed-grade synthesis by a lead researcher, drawing on official cordon counts over many years. Directly addresses both the size and the persistence of the traffic cut, the load-bearing question.",
        },
        {
          id: "nyc-first-year",
          title: "New York: ~11-12% Fewer Vehicles in Year One (2025)",
          description:
            "After tolling Manhattan below 60th St from Jan 5, 2025, the official program reported on the order of 11-12% fewer vehicles entering the zone (tens of millions fewer over the year), morning crossing times up to ~50% faster at some tunnels, and a ~14% drop in crashes within the zone.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 9,
          },
          source:
            "Office of NY Governor Hochul, press release, Sept 9, 2025 (MTA monitoring data)",
          sourceUrl:
            "https://www.governor.ny.gov/news/less-traffic-safer-streets-summer-comes-end-governor-hochul-highlights-continued-success",
          reasoning:
            "Recent and very direct, but the source is the program's own government sponsor, so independence is moderate; figures are first-year and dated, not yet replicated by long-run independent study.",
        },
        {
          id: "london-congestion-decay",
          title: "London: Congestion Benefit Decayed from ~30% to ~7%",
          description:
            "Vehicle entries fell ~21% after 2003, but TfL's reported congestion (journey-time) improvement fell from ~30% to ~22% in 2006 and to roughly 7% by 2006-07; central-London speeds later returned close to pre-charge levels as road space was reallocated and exempt private-hire trips surged.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source:
            "Transport for London monitoring reports, summarized with citations in 'London congestion charge', Wikipedia; corroborated by The Conversation (2018)",
          sourceUrl: "https://en.wikipedia.org/wiki/London_congestion_charge",
          reasoning:
            "Shows the steelman against durability directly using TfL's own figures. Marked down because the primary numbers reach us via an encyclopedia synthesis of TfL reports rather than a single peer-reviewed paper; the underlying TfL data are nonetheless real and widely cited.",
        },
      ],
    },
    {
      id: "transit-funding",
      title: "Funding Transit",
      short_summary:
        "Net toll revenue is earmarked for public transport, but whether the sums are large, stable, and politically durable enough to count as a transit funding source is disputed.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Tolls fund operations and skimming before transit. London's charge has often barely covered its own collection and enforcement costs, leaving modest net surpluses. New York's program was originally pitched to back ~$15 billion in MTA capital bonds (implying roughly $1 billion/year), but the relaunched 2025 scheme targets only ~$500 million net — about half — and remains legally and politically contested. Revenue that can be halved, paused, or sued out of existence is a fragile funding base for multi-decade infrastructure.",
      proponent_rebuttal:
        "The schemes do raise real, ring-fenced money for transit and active travel. New York hit its ~$500 million net-revenue target in its first year and is using it to back MTA capital investment, while London channels its surplus into bus and transport improvements. Even a 'halved' New York take is a large, recurring, dedicated stream that no fare increase or general tax was willing to provide — and the traffic-cutting and funding goals reinforce each other, since fewer cars also speed up the buses the revenue supports.",
      crux: {
        id: "net-revenue-durability",
        title: "Is the Net Revenue Large and Durable?",
        description:
          "Whether congestion charges generate net (post-collection-cost) revenue that is both materially large relative to transit needs and stable enough to bond against for decades.",
        methodology:
          "Audit gross receipts minus collection, enforcement, and administration costs over multiple years; compare net revenue to the transit capital/operating gap it is meant to close; assess legal and political durability (litigation, exemptions, rate freezes).",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (published agency financial filings)",
        falsification: {
          supporter_flip:
            "If audited multi-year filings showed net (post-collection-cost) revenue is chronically small relative to the transit gap it is meant to close, or repeatedly slashed by toll cuts, exemptions, litigation, or rate freezes — as New York's drop from a ~$1B/year plan to a ~$500M target hints — then 'a large, durable funding source' would collapse to 'a modest, fragile one.'",
          skeptic_flip:
            "A skeptic who calls the revenue fragile should weigh that New York hit and exceeded its ~$500M net target in year one (~$548M) and is bonding against it, and that even a 'halved' take is a large, recurring, dedicated stream no fare hike or general tax was willing to provide.",
          common_ground:
            "Both sides agree the schemes do raise real, ring-fenced money for transit; the dispute is whether the net amount is materially large and politically/legally durable enough to bond against for decades.",
          live_disagreement:
            "Whether net revenue stays both sizeable relative to transit needs and stable across litigation, exemptions, and rate changes — which only multi-year audited gross-minus-cost filings compared against the funding gap can resolve.",
        },
      },
      evidence: [
        {
          id: "nyc-revenue-target-met",
          title: "New York Met Its ~$500M Net-Revenue Target (2025)",
          description:
            "The MTA set a 2025 net-revenue goal of about $500 million after expenses and reported roughly $548 million by year-end, earmarked to support its capital program.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 8,
          },
          source:
            "Office of NY Governor Hochul / MTA, Sept 9, 2025 press release and MTA financial reporting",
          sourceUrl:
            "https://www.governor.ny.gov/news/less-traffic-safer-streets-summer-comes-end-governor-hochul-highlights-continued-success",
          reasoning:
            "Directly shows real, dedicated transit revenue at the targeted level, but the figure comes from the program's sponsor and is a single dated year, so independence and replicability are moderate.",
        },
        {
          id: "nyc-revenue-shortfall",
          title: "Relaunched Program Raises ~Half the Original Plan",
          description:
            "The 2025 program's ~$500 million net target is roughly half the ~$1 billion/year implied by the original design meant to back ~$15 billion in MTA capital bonds, after the toll was cut from $15 to $9 and litigation delayed the launch.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Reporting on the MTA's revised toll and revenue plan (e.g., 6sqft summary of MTA figures); original $15B bonding goal in MTA capital documents",
          sourceUrl:
            "https://www.6sqft.com/one-year-of-congestion-pricing-in-nyc-27-million-fewer-vehicles-less-traffic/",
          reasoning:
            "Captures the genuine gap between promised and delivered funding. Down-weighted because it relies on secondary reporting rather than a single audited filing, though the $15B/$9-toll facts are well documented.",
        },
        {
          id: "london-revenue-modest",
          title: "London's Net Surplus Is Modest Relative to Costs",
          description:
            "A large share of London's gross charge income is consumed by collection and enforcement; the scheme's primary purpose is traffic management, with the net surplus reinvested in transport but small relative to London's overall transit budget.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Transport for London monitoring/financial reporting, summarized in 'London congestion charge', Wikipedia",
          sourceUrl: "https://en.wikipedia.org/wiki/London_congestion_charge",
          reasoning:
            "Supports the 'fragile funding base' steelman, but the precise cost-ratio varies by year and reaches us via encyclopedia synthesis rather than a primary audited statement, so weights are moderate.",
        },
      ],
    },
  ],
};
