export const housingAffordabilityCrisisData = {
  id: "housing-affordability-crisis",
  title: "Housing Supply & Affordability",
  question:
    "Would building more homes make housing affordable?",
  meta_claim:
    "Building more homes, by loosening zoning and land-use rules and by public construction where the market will not build, is the main way to make housing affordable, including for lower-income renters.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "In San Francisco, Manhattan and Los Angeles, Glaeser and Gyourko found the gap between home prices and construction costs exceeds $400,000 per unit. Across the US, 11 million renter households spent more than half their income on rent and utilities in 2024. Both sides take these numbers as given. The fight is over whether building more homes brings rents down for lower-income renters, how fast, and who has to build them.",
    confidence: 84,
    source:
      "Glaeser & Gyourko, 'The Economic Implications of Housing Supply,' Journal of Economic Perspectives (2018); Harvard Joint Center for Housing Studies, 'The State of the Nation's Housing 2024'",
    sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/jep.32.1.3",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that restrictive zoning raises housing prices, that more housing eventually eases market-wide pressure, and that US public housing has been chronically underfunded even as some systems abroad deliver good housing at scale.",
    "They split over whether upzoning, as in Auckland and Minneapolis, lowers rents for median and lower-income renters within five to ten years, and whether Vienna's and Singapore's public building succeeded through design the US could copy, or conditions unique to them.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Zoning & Supply Constraints
    // =========================================================================
    {
      id: "zoning-supply-constraints",
      title: "Zoning & Supply Constraints",
      short_summary:
        "Restrictive zoning laws limit housing construction in high-demand areas, creating artificial scarcity. Reformers argue that legalizing density is the single most impactful policy lever, while critics warn that market-rate development alone will not produce housing affordable to low-income residents.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Upzoning primarily benefits developers and produces luxury units, not affordable housing. When Minneapolis ended single-family-only zoning (effective 2020), duplexes and triplexes on former single-family lots made up only about 1% of new units; the growth came from large market-rate apartment buildings, not homes priced for low-income families. In New York, despite decades of development, the median rent reached $3,500 by 2024 — the highest in history. Filtering theory (new expensive units free up cheaper ones) takes 30-50 years and does not help families facing eviction today. Without mandatory affordability requirements or rent subsidies for the lowest-income tenants, zoning reform is a supply-side subsidy for the real estate industry disguised as progressive policy.",
      proponent_rebuttal:
        "The economics are clear: restrictive zoning is the primary driver of housing costs. Research by Edward Glaeser and Joseph Gyourko at Harvard and Wharton demonstrates that in cities like San Francisco, regulatory constraints add over $400,000 to the median home price. Japan's permissive zoning system — where housing construction is a national right — kept Tokyo rents flat for 20 years while comparable global cities saw 50-100% increases. When Auckland, New Zealand, upzoned about three-quarters of its residential land in 2016, extra dwelling consents reached roughly 4-9% of the housing stock within several years, and a synthetic-control study put rents roughly 20-28% below where they would otherwise have been. The filtering mechanism works when supply is abundant: every unit of new housing, regardless of price point, reduces pressure on existing stock.",
      crux: {
        id: "upzoning-affordability-impact",
        title: "The Upzoning Affordability Test",
        question:
          "Does upzoning lower rents for median and lower-income renters within 5–10 years?",
        description:
          "If upzoning lowers rents at the median and below within 5-10 years, not just at the luxury tier, then market building reaches lower-income renters. If rents fall only at the top, lower-income renters need public construction or demand-side help such as vouchers and rent stabilization, and the second crux asks whether public construction can carry that load.",
        methodology:
          "Conduct a natural experiment analysis of cities that enacted significant upzoning reforms (Minneapolis, Auckland, Austin, Oregon) compared to matched control cities that did not. Track rent levels at the 25th, 50th, and 75th percentiles for 10 years post-reform, controlling for population growth, income changes, and macroeconomic conditions using difference-in-differences regression.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Rents at the 25th, 50th and 75th percentiles, tracked for a decade in cities that upzoned (Minneapolis, Auckland, Austin, Oregon) against matched cities that did not, with population, income and interest-rate changes held constant.",
        },
        cost_to_verify:
          "$500K-1M (Multi-city longitudinal housing market analysis requiring proprietary rental data)",
        falsification: {
          supporter_flip:
            "If well-controlled studies of upzoned cities showed rents falling only at the luxury tier while the median and 25th percentile stayed flat or rose for a decade or more, with filtering never reaching the bottom, then market building alone could not be the main route to affordability for lower-income renters; the claim would rest on public construction, or give way to subsidies.",
          skeptic_flip:
            "If more natural experiments matched Auckland's (construction up about 4% of stock in five years, rents below trend) and Tokyo's flat rents, and moving-chain studies kept tracing new high-end units to cheaper vacancies, 'new supply doesn't help the non-rich' would be hard to hold.",
          common_ground:
            "Both sides agree restrictive zoning raises prices and that, eventually, more housing reduces market-wide pressure; the dispute is how fast and how far down the income ladder the benefit reaches.",
          live_disagreement:
            "Whether the filtering/moving-chain mechanism lowers rents at the median and below within a 5–10 year policy-relevant window, or operates too slowly to help low-income renters — which only difference-in-differences tracking of rents by income percentile across matched upzoned and control cities can settle.",
        },
      },
      evidence: [
        {
          id: "tokyo-zoning-model",
          title: "Tokyo's National Zoning System Keeps Rents Flat for Two Decades",
          description:
            "Japan's zoning system, controlled at the national rather than local level, allows far greater density than comparable global cities. Between 2000 and 2020, Tokyo built an average of 142,000 new housing units per year — more than all of England combined. During this period, real rents in Tokyo remained essentially flat while rents in London increased 56%, San Francisco 80%, and Sydney 88%. Tokyo achieved this despite being the world's largest metropolitan area with 37 million residents.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "OECD Housing Database; Nikkei Asia; Urban Reform Institute",
          sourceUrl: "https://www.oecd.org/en/topics/housing.html",
          reasoning:
            "OECD housing data is independently compiled and widely cited. Tokyo's success is a powerful natural experiment. However, Japan's unique demographics (declining population), cultural factors (homes depreciate), and economic context (post-bubble stagnation) limit direct applicability to growing Western cities.",
        },
        {
          id: "auckland-upzoning-results",
          title: "Auckland Upzoning Raised Construction and Lowered Rents Roughly 20-28% Below Counterfactual (2016-2023)",
          description:
            "Auckland's 2016 Unitary Plan upzoned about three-quarters of the city's residential land for higher-density housing. Two strands of work by Greenaway-McGrevy and co-authors study the effects. On construction, Greenaway-McGrevy & Phillips ('The Impact of Upzoning on Housing Construction in Auckland,' Journal of Housing Economics, 2023) find the reform added tens of thousands of additional dwelling consents within several years (on the order of ~4-9% of the housing stock). On rents, 'Can Zoning Reform Reduce Housing Costs? Evidence from Rents in Auckland' (Greenaway-McGrevy, with So) uses a synthetic-control design and estimates that rents for comparable properties are roughly 20-28% lower than they would otherwise have been several years post-reform, with cumulative Auckland rent growth (~20% over 2016-2023) well below comparable NZ cities.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Greenaway-McGrevy & Phillips, Journal of Housing Economics (2023) — construction; Greenaway-McGrevy, 'Can Zoning Reform Reduce Housing Costs? Evidence from Rents in Auckland' (working paper) — rents",
          sourceUrl:
            "https://cdn.auckland.ac.nz/assets/business/about/our-research/research-institutes-and-centres/Economic-Policy-Centre--EPC-/WP016.pdf",
          reasoning:
            "The synthetic-control design is rigorous and the Auckland reform is one of the most comprehensive upzoning experiments globally. An earlier draft of this card attributed the rent finding to 'Greenaway-McGrevy & Phillips' in the Journal of Urban Economics and cited 22-35%; the rent result is from the separate 'Evidence from Rents in Auckland' paper (Greenaway-McGrevy, with So), which estimates rents roughly 20-28% below counterfactual. Phillips is a co-author on the construction paper. Effects took several years to materialize, so supply expansion works but not quickly enough to protect all vulnerable tenants in the interim.",
        },
        {
          id: "glaeser-regulatory-tax",
          title: "Zoning Adds $400,000+ to Median Home Price in Constrained Cities (Glaeser & Gyourko)",
          description:
            "Harvard economist Edward Glaeser and Wharton economist Joseph Gyourko calculated that in cities like San Francisco, Manhattan, and Los Angeles, the gap between housing prices and construction costs — the 'regulatory tax' — exceeds $400,000 per unit. In San Francisco, construction costs for a housing unit are approximately $300,000, but the median home price exceeds $1.3 million. The difference is almost entirely attributable to land-use regulations that restrict supply.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Glaeser & Gyourko, 'The Economic Implications of Housing Supply,' Journal of Economic Perspectives (2018)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/jep.32.1.3",
          reasoning:
            "Peer-reviewed research from two of the most cited housing economists. The methodology comparing construction costs to sale prices is transparent and replicable. Critics note that some of the price premium reflects desirable neighborhood amenities, not just regulatory constraint.",
        },
        {
          id: "minneapolis-mixed-results",
          title: "Ending Single-Family Zoning Alone Had Modest Impact in Minneapolis (Pew, 2024)",
          description:
            "Minneapolis became the first major US city to eliminate single-family-only zoning in its Minneapolis 2040 plan, effective January 2020. A 2024 Pew Charitable Trusts analysis found that legalizing duplexes and triplexes on former single-family lots accounted for only about 1% of new units — most new supply (roughly 87%) came from buildings with 20+ units, driven by allowing apartments along commercial and transit corridors and eliminating parking minimums.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "The Pew Charitable Trusts; City of Minneapolis permit data",
          sourceUrl: "https://www.pew.org/en/research-and-analysis/articles/2024/01/04/minneapolis-land-use-reforms-offer-a-blueprint-for-housing-affordability",
          reasoning:
            "The Minneapolis experiment is the most directly relevant US case study. The modest results suggest that simply legalizing density may be necessary but not sufficient — financing, construction costs, and market conditions also constrain supply. This tempers the strongest claims about zoning reform as a silver bullet.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Public Housing & Government-Built Supply
    // =========================================================================
    {
      id: "public-housing",
      title: "Public Housing & Government-Built Supply",
      short_summary:
        "Public housing in the US has a troubled history of underfunding and segregation, while Vienna, Singapore and Finland house large shares of residents in government-built or government-funded homes. The dispute is whether those results come from design the US could copy.",
      icon_name: "Users" as const,
      skeptic_premise:
        "US public housing is a cautionary tale of government failure. The 1949 Housing Act promised a 'decent home for every American' but produced concentrated poverty, racial segregation, and physical deterioration. The Pruitt-Igoe complex in St. Louis and the Cabrini-Green projects in Chicago became international symbols of failed policy. Federal funding for public housing fell 75% in real terms between 1976 and 2020. The current public housing stock of 970,000 units has a $70 billion maintenance backlog. Government cannot build or manage housing efficiently — it should instead subsidize private-market solutions through Section 8 vouchers.",
      proponent_rebuttal:
        "The failure of US public housing was a political choice, not an inherent feature of public provision. Vienna's social housing system houses 62% of the city's population in high-quality, architecturally celebrated buildings. Singapore's Housing Development Board houses 80% of citizens in publicly built apartments. Finland's Housing First policy reduced homelessness by 40% through government-provided permanent housing. The US spent $70 billion annually on the mortgage interest deduction — a subsidy overwhelmingly benefiting high-income homeowners — while spending only $50 billion on all rental assistance. The question is not whether government can build housing, but whether American political will exists to fund it.",
      crux: {
        id: "public-housing-quality-at-scale",
        title: "The Public Housing Quality-at-Scale Test",
        question:
          "Did Vienna and Singapore's public housing succeed through transferable design, or conditions unique to them?",
        description:
          "If government-built housing can achieve high resident satisfaction, physical quality, and mixed-income integration at scale — as Vienna and Singapore claim — then public housing is a viable solution to the affordability crisis. If these international models depend on unique cultural or political conditions that cannot transfer to the US context, public housing is not a generalizable answer.",
        methodology:
          "Conduct a comparative policy analysis of public housing systems in Vienna, Singapore, Helsinki, and the US. Measure resident satisfaction (survey data), physical quality (maintenance backlogs per unit), income mixing (Gini coefficient within developments), fiscal sustainability (operating costs vs. revenue), and waiting list lengths. Identify the specific policy design features and funding levels that distinguish successful from unsuccessful systems.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A comparison of Vienna, Singapore, Helsinki and US public housing on resident satisfaction, maintenance backlogs, income mixing, operating costs and waiting lists, tied to each system's funding and land ownership.",
        },
        cost_to_verify:
          "$400K-800K (Multi-country comparative housing policy study with resident surveys)",
        falsification: {
          supporter_flip:
            "If a careful comparative study found that Vienna's and Singapore's results depend on conditions that cannot transfer — a century of dedicated payroll-tax funding, vast pre-existing municipal land ownership, or high state capacity and social cohesion — and that comparably funded U.S. attempts still produced concentrated poverty and deterioration, then public housing would not be a generalizable answer to American affordability.",
          skeptic_flip:
            "If well-funded U.S. developments kept satisfaction high, the $70 billion backlog traced to appropriations near $3.2B when about $6B was needed, and Vienna's model held up under comparable funding, Pruitt-Igoe would reflect the U.S. funding model rather than public provision as such.",
          common_ground:
            "Both sides agree U.S. public housing has been chronically underfunded and that some international systems deliver high-quality housing at scale; the dispute is whether those successes are replicable in the U.S. political and fiscal context.",
          live_disagreement:
            "Whether the gap between successful (Vienna, Singapore) and failed (U.S.) public housing is driven by transferable design-and-funding choices or by non-transferable cultural/political conditions — which only a structured comparison isolating funding level, land ownership, income-mixing rules, and resident satisfaction across systems can determine.",
        },
      },
      evidence: [
        {
          id: "vienna-social-housing",
          title: "Vienna's Social Housing System Houses 62% of Residents in Quality Public Units",
          description:
            "The City of Vienna owns or subsidizes approximately 440,000 housing units, housing 62% of the city's population. Rents in social housing average 30-50% below private-market rates. The system operates without income testing for existing tenants, creating mixed-income communities. Vienna consistently ranks as the world's most livable city (Economist Intelligence Unit, 2022-2024). The program has operated continuously since 1919 and is funded through a dedicated housing tax of approximately 1% of payroll. New developments are architecturally competitive, winning international design awards.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Wiener Wohnen (City of Vienna municipal housing); Economist Intelligence Unit",
          sourceUrl: "https://www.wienerwohnen.at/wiener-gemeindebau/municipal-housing-in-vienna.html",
          reasoning:
            "Vienna's model is well-documented and has operated for over a century. The quality and scale are independently verifiable. However, Vienna benefits from unique factors: a century of political commitment, a dedicated funding stream, extensive municipal land ownership, and Austria's strong social consensus. Replicability in the US political context is the key uncertainty.",
        },
        {
          id: "us-public-housing-backlog",
          title: "US Public Housing Has a $70 Billion Maintenance Backlog (2024)",
          description:
            "The US public housing stock of approximately 970,000 units has an estimated $70 billion capital repair backlog, according to the National Council of State Housing Agencies. Federal capital funding covers less than 30% of annual maintenance needs. Between 2000 and 2020, the US lost over 250,000 public housing units to demolition and disposition. The average public housing development is 55 years old. HUD's Resident Assessment of Management survey shows satisfaction rates varying from 85% at well-maintained developments to below 40% at severely underfunded ones.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Congressional hearing record; National Association of Housing and Redevelopment Officials capital-needs estimate",
          sourceUrl: "https://www.congress.gov/event/117th-congress/house-event/LC66633/text",
          reasoning:
            "The congressional hearing record directly preserves the housing-authority estimate and its funding context. The $70 billion backlog is a devastating indictment of US public housing policy. However, it reflects deliberate underfunding — Congress appropriated $3.2 billion annually when $6 billion was needed — rather than inherent impossibility of public housing. Well-funded developments (e.g., New York's NYCHA Queensbridge Houses) maintain high satisfaction.",
        },
        {
          id: "finland-housing-first",
          title: "Finland's Housing First Policy Reduced Homelessness by 40% (2008-2023)",
          description:
            "Finland adopted a Housing First approach in 2008, providing permanent government-funded housing to homeless individuals without preconditions like sobriety or employment. By 2023, homelessness had fallen approximately 40%, from 8,000 to under 4,800 — making Finland the only EU country to significantly reduce homelessness during this period. The cost per housed person was approximately $15,000/year, compared to $50,000/year for emergency shelters and crisis services. The model was funded through converting shelters into permanent housing and building new social housing units.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Y-Foundation (Finland); OECD Social Policy Division; European Commission",
          sourceUrl: "https://www.oecd.org/en/publications/oecd-affordable-housing-database_5f752991-en.html",
          reasoning:
            "Finland's results are independently documented by the OECD and EU. The cost savings are substantial and well-measured. However, Finland's homelessness population is small compared to the US (580,000+), and its social welfare infrastructure is far more developed. Scaling Housing First to the US context faces different political and fiscal constraints.",
        },
        {
          id: "section-8-voucher-limitations",
          title: "Section 8 Vouchers: 75% of Eligible Households Receive No Assistance (2024)",
          description:
            "Only 25% of households eligible for federal rental assistance through Housing Choice Vouchers (Section 8) actually receive it due to funding limitations. Wait lists average 2-5 years and many are closed entirely. Among those who receive vouchers, landlord acceptance rates average only 36% nationwide — and below 20% in tight housing markets — effectively nullifying the subsidy. The National Low Income Housing Coalition estimates that fully funding Section 8 would cost an additional $22 billion annually.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Center on Budget and Policy Priorities; National Low Income Housing Coalition; HUD",
          sourceUrl: "https://www.cbpp.org/research/housing/three-out-of-four-low-income-at-risk-renters-do-not-receive-federal-rental-assistance",
          reasoning:
            "CBPP is a nonpartisan research institute and HUD data is authoritative. The 75% exclusion rate demonstrates that the current market-based approach to affordable housing — vouchers for private rentals — is severely inadequate. This supports the argument that government must build supply directly, not just subsidize demand in an undersupplied market.",
        },
      ],
    },
  ],
  references: [
    {
      title: "The State of the Nation's Housing 2024 — Harvard Joint Center for Housing Studies",
      url: "https://www.jchs.harvard.edu/state-nations-housing-2024",
    },
    {
      title: "The Economic Implications of Housing Supply — Glaeser & Gyourko (2018)",
      url: "https://www.aeaweb.org/articles?id=10.1257/jep.32.1.3",
    },
    {
      title: "Municipal Housing in Vienna (Gemeindebau) — Wiener Wohnen, City of Vienna",
      url: "https://www.wienerwohnen.at/wiener-gemeindebau/municipal-housing-in-vienna.html",
    },
    {
      title: "OECD Affordable Housing Database",
      url: "https://www.oecd.org/en/publications/oecd-affordable-housing-database_5f752991-en.html",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is housing a commodity or a right?",
      content:
        "If housing is primarily a market commodity, the solution is to remove barriers to supply and let prices self-correct. If housing is a fundamental right, governments have an obligation to ensure access regardless of market conditions. The answer shapes which policies each side treats as legitimate: freeing private building, building public housing, or both.",
    },
    {
      id: "q2",
      title: "Can zoning reform alone solve the affordability crisis?",
      content:
        "YIMBY advocates argue that legalizing density is sufficient: build enough housing and prices will fall. But construction costs, labor shortages, and material prices mean that new market-rate housing cannot be built for less than $300,000-$500,000 per unit in most US cities. If the floor on construction costs exceeds what low-income households can afford, supply-only approaches will never close the gap without subsidies.",
    },
    {
      id: "q3",
      title: "Why has US public housing failed while Vienna and Singapore succeed?",
      content:
        "The US built public housing as poverty-concentrated last-resort warehousing, funded it inadequately, and then defunded it further as a political strategy. Vienna and Singapore built social housing as a universal service available to the middle class, funded it through dedicated revenue streams, and maintained it as a civic asset. Is the US model's failure a verdict on public housing, or on the specific way America chose to do it?",
    },
  ],
};
