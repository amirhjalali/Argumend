export const housingAffordabilityCrisisData = {
  id: "housing-affordability-crisis",
  title: "The Housing Affordability Crisis",
  meta_claim:
    "Government intervention through zoning reform, rent control, and public housing is necessary to solve the housing affordability crisis, as the free market alone cannot provide adequate affordable housing.",
  status: "contested" as const,
  category: "economics" as const,
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
        "Upzoning primarily benefits developers and produces luxury units, not affordable housing. When Minneapolis eliminated single-family zoning in 2019, the result was mostly market-rate triplexes priced above the median, not affordable units. In New York, despite decades of development, the median rent reached $3,500 by 2024 — the highest in history. Filtering theory (new expensive units free up cheaper ones) takes 30-50 years and does not help families facing eviction today. Without mandatory affordability requirements, inclusionary zoning, or public housing, zoning reform is a supply-side subsidy for the real estate industry disguised as progressive policy.",
      proponent_rebuttal:
        "The economics are clear: restrictive zoning is the primary driver of housing costs. Research by Edward Glaeser and Joseph Gyourko at Harvard and Wharton demonstrates that in cities like San Francisco, regulatory constraints add over $400,000 to the median home price. Japan's permissive zoning system — where housing construction is a national right — kept Tokyo rents flat for 20 years while comparable global cities saw 50-100% increases. When Auckland, New Zealand, upzoned in 2016, new housing construction tripled and rents fell 22-35% relative to comparable cities. The filtering mechanism works when supply is abundant: every unit of new housing, regardless of price point, reduces pressure on existing stock.",
      crux: {
        id: "upzoning-affordability-impact",
        title: "The Upzoning Affordability Test",
        description:
          "If upzoning produces measurable decreases in rents across all income levels within 5-10 years — not just at the luxury tier — then supply-side reform is sufficient. If rents decline only at the top while remaining unaffordable at the median and below, demand-side or public-supply interventions are necessary.",
        methodology:
          "Conduct a natural experiment analysis of cities that enacted significant upzoning reforms (Minneapolis, Auckland, Austin, Oregon) compared to matched control cities that did not. Track rent levels at the 25th, 50th, and 75th percentiles for 10 years post-reform, controlling for population growth, income changes, and macroeconomic conditions using difference-in-differences regression.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Multi-city longitudinal housing market analysis requiring proprietary rental data)",
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
          title: "Auckland Upzoning Led to Tripled Construction and Relative Rent Declines (2016-2023)",
          description:
            "Auckland, New Zealand implemented major upzoning reforms in 2016, allowing density across 75% of residential land. By 2022, new housing construction had tripled compared to pre-reform levels. A study by economists Ryan Greenaway-McGrevy and Peter C.B. Phillips found that rents in Auckland fell 22-35% relative to comparable cities (Wellington and Christchurch) that did not upzone. The effect was concentrated in areas where the most new housing was built.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Greenaway-McGrevy & Phillips (2023), Journal of Urban Economics",
          sourceUrl: "https://www.sciencedirect.com/science/article/pii/S0094119023000487",
          reasoning:
            "This is a peer-reviewed natural experiment with a clear policy treatment and control cities. The 22-35% relative decline is large and statistically significant. However, Auckland's baseline supply deficit was extreme, and the results may be less dramatic in cities with more moderate shortfalls.",
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
          title: "Minneapolis 2040 Zoning Reform Produced Modest Results (2020-2024)",
          description:
            "Minneapolis became the first major US city to eliminate single-family-only zoning in its Minneapolis 2040 plan, effective January 2020. By 2024, the reform had produced fewer than 200 new duplex and triplex units — far below projections. Most new units were market-rate, priced at or above the median. While a University of Minnesota study found rents grew 3.5% slower than comparable Midwestern cities, housing advocates argued the reform was insufficient without subsidies for low-income construction. Minnesota's legislature preempted the reform with state-level restrictions in 2024.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "University of Minnesota Humphrey School; Pew Research Center; Minnesota Public Radio",
          sourceUrl: "https://www.pewtrusts.org/en/research-and-analysis/articles/2023/06/12/minneapolis-ended-single-family-zoning-2-years-ago-heres-what-happened",
          reasoning:
            "The Minneapolis experiment is the most directly relevant US case study. The modest results suggest that simply legalizing density may be necessary but not sufficient — financing, construction costs, and market conditions also constrain supply. This tempers the strongest claims about zoning reform as a silver bullet.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Rent Control & Tenant Protections
    // =========================================================================
    {
      id: "rent-control",
      title: "Rent Control & Tenant Protections",
      short_summary:
        "Rent control directly protects existing tenants from displacement, but economists overwhelmingly warn it reduces housing supply, misallocates units, and raises rents for non-controlled tenants in the long run.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The near-unanimous consensus among economists is that rent control reduces housing quality and supply. A landmark Stanford study of San Francisco's rent control found that while controlled tenants saved 2-5% in rent, landlords responded by converting 15% of controlled units to condos or demolishing them, reducing rental supply by 6% citywide. The resulting scarcity increased market-rate rents by 5-7% for tenants in non-controlled units. A 2012 IGM Forum survey found 81% of economists agreed that rent ceilings reduce housing quantity and quality. Rent control treats symptoms while worsening the underlying disease.",
      proponent_rebuttal:
        "Rent control is a necessary emergency measure in a market that has failed low-income tenants for decades. In the US, 11 million renter households spend more than 50% of income on rent — the crisis is now, not in some theoretical long run. Newer forms of rent stabilization — vacancy decontrol, inflation-indexed increases, exemptions for new construction — avoid the worst distortions of hard rent ceilings. Oregon's 2019 statewide rent cap (7% + CPI) did not reduce construction; permits actually increased. The theoretical harm of rent control must be weighed against the immediate, concrete harm of displacement: each eviction increases a family's risk of homelessness by 400% and a child's risk of changing schools by 200%.",
      crux: {
        id: "modern-rent-stabilization-effects",
        title: "The Modern Rent Stabilization Impact Test",
        description:
          "The key question is whether modern rent stabilization designs (inflation-indexed caps with new-construction exemptions) avoid the supply-reducing effects of traditional hard rent ceilings while still protecting tenants. If Oregon-style soft caps demonstrably prevent displacement without reducing construction starts, modern rent control is viable; if supply effects emerge even under soft caps, the policy is counterproductive.",
        methodology:
          "Compare housing construction permits, rental vacancy rates, and rent levels in Oregon (which enacted a statewide rent cap in 2019) against matched control states (Washington, Idaho) from 2015-2028. Separately analyze the effect on tenant stability by tracking eviction rates and involuntary move rates using American Community Survey microdata. Control for COVID-era distortions, remote work shifts, and population changes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-600K (Multi-state housing market and tenant stability analysis)",
      },
      evidence: [
        {
          id: "stanford-sf-rent-control",
          title: "Stanford Study: San Francisco Rent Control Reduced Supply by 6% (2019)",
          description:
            "A Stanford study by Diamond, McQuade, and Qian examined San Francisco's 1994 expansion of rent control to small multi-family buildings. They found that rent control reduced tenant displacement by 15% and saved controlled tenants 2-5% on rent. However, landlords responded by converting 15% of controlled units to condos, redeveloping buildings, or removing them from the rental market, reducing rental supply by 6% and increasing market-rate rents by 5-7% citywide. The net effect was a transfer from new renters to incumbent renters.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "Diamond, McQuade & Qian, American Economic Review (2019)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
          reasoning:
            "Published in the top economics journal, this study uses a natural experiment with a clear identification strategy. The finding that rent control simultaneously helps existing tenants while reducing overall supply is robust and widely cited. However, San Francisco's extreme land constraints and pre-existing housing shortage may amplify the supply effects compared to other markets.",
        },
        {
          id: "igm-economist-consensus",
          title: "81% of Economists Agree Rent Control Reduces Housing Quality and Quantity (2012)",
          description:
            "The University of Chicago's IGM Forum surveyed 41 leading economists on whether local ordinances limiting rent increases reduce the quantity and quality of housing. 81% agreed or strongly agreed, 2% disagreed, and 17% were uncertain. Nobel laureate Paul Krugman has called rent control 'among the best-understood issues in all of economics.' This represents one of the strongest professional consensus positions in economics, comparable to consensus on free trade benefits.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "University of Chicago IGM Forum",
          sourceUrl: "https://www.igmchicago.org/surveys/rent-control/",
          reasoning:
            "The IGM Forum surveys are a respected barometer of expert economic opinion. The consensus is strong but the survey was conducted in 2012, before modern soft-cap designs like Oregon's became widespread. The consensus may apply to traditional hard ceilings more than to inflation-indexed stabilization with new-construction exemptions.",
        },
        {
          id: "oregon-rent-cap-permits",
          title: "Oregon's Statewide Rent Cap Did Not Reduce Construction Permits (2019-2023)",
          description:
            "Oregon became the first US state to enact a statewide rent cap in 2019, limiting increases to 7% plus inflation annually with exemptions for new construction (first 15 years). Between 2019 and 2023, Oregon's housing construction permits did not decline relative to comparable states — in fact, Portland-area permits increased 12% from 2019 to 2022. Landlord groups had predicted the cap would 'destroy rental housing investment,' but investment capital continued flowing, partly because the new-construction exemption preserved returns for developers.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Oregon Office of Economic Analysis; US Census Building Permits Survey",
          sourceUrl: "https://www.census.gov/construction/bps/",
          reasoning:
            "Census building permit data is independently verifiable. The new-construction exemption in Oregon's law is a critical design feature that addresses the classic supply objection. However, the 2019-2023 period included COVID-era distortions, low interest rates, and pandemic-driven migration to Oregon, complicating causal attribution.",
        },
        {
          id: "rent-burden-crisis-data",
          title: "11 Million US Renter Households Spend Over 50% of Income on Rent (2024)",
          description:
            "The Joint Center for Housing Studies at Harvard University reported that 11 million US renter households were severely cost-burdened in 2024, spending more than half their income on rent and utilities. An additional 10.5 million were moderately cost-burdened (30-50% of income). The affordable housing gap — units affordable and available to extremely low-income renters — stood at 7.3 million units. Median rents rose 26% from 2019 to 2023 while median renter income rose only 11%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Harvard Joint Center for Housing Studies, 'The State of the Nation's Housing 2024'",
          sourceUrl: "https://www.jchs.harvard.edu/state-nations-housing-2024",
          reasoning:
            "Harvard JCHS is the most authoritative independent source on US housing data. The 7.3 million unit gap and 11 million severely burdened households are well-documented. This evidence demonstrates the scale of the crisis but does not directly prove that rent control is the correct solution — supply expansion, subsidies, or public housing could also address the gap.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Public Housing & Government-Built Supply
    // =========================================================================
    {
      id: "public-housing",
      title: "Public Housing & Government-Built Supply",
      short_summary:
        "Public housing in the US has a troubled history of underfunding and segregation, but international models — Vienna, Singapore, Finland — demonstrate that government-built housing can succeed at scale when properly designed and funded.",
      icon_name: "Users" as const,
      skeptic_premise:
        "US public housing is a cautionary tale of government failure. The 1949 Housing Act promised a 'decent home for every American' but produced concentrated poverty, racial segregation, and physical deterioration. The Pruitt-Igoe complex in St. Louis and the Cabrini-Green projects in Chicago became international symbols of failed policy. Federal funding for public housing fell 75% in real terms between 1976 and 2020. The current public housing stock of 970,000 units has a $70 billion maintenance backlog. Government cannot build or manage housing efficiently — it should instead subsidize private-market solutions through Section 8 vouchers.",
      proponent_rebuttal:
        "The failure of US public housing was a political choice, not an inherent feature of public provision. Vienna's social housing system houses 62% of the city's population in high-quality, architecturally celebrated buildings. Singapore's Housing Development Board houses 80% of citizens in publicly built apartments. Finland's Housing First policy reduced homelessness by 40% through government-provided permanent housing. The US spent $70 billion annually on the mortgage interest deduction — a subsidy overwhelmingly benefiting high-income homeowners — while spending only $50 billion on all rental assistance. The question is not whether government can build housing, but whether American political will exists to fund it.",
      crux: {
        id: "public-housing-quality-at-scale",
        title: "The Public Housing Quality-at-Scale Test",
        description:
          "If government-built housing can achieve high resident satisfaction, physical quality, and mixed-income integration at scale — as Vienna and Singapore claim — then public housing is a viable solution to the affordability crisis. If these international models depend on unique cultural or political conditions that cannot transfer to the US context, public housing is not a generalizable answer.",
        methodology:
          "Conduct a comparative policy analysis of public housing systems in Vienna, Singapore, Helsinki, and the US. Measure resident satisfaction (survey data), physical quality (maintenance backlogs per unit), income mixing (Gini coefficient within developments), fiscal sustainability (operating costs vs. revenue), and waiting list lengths. Identify the specific policy design features and funding levels that distinguish successful from unsuccessful systems.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$400K-800K (Multi-country comparative housing policy study with resident surveys)",
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
          source: "City of Vienna Housing Department; Economist Intelligence Unit; European Urban Knowledge Network",
          sourceUrl: "https://socialhousing.wien/the-vienna-model",
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
          source: "National Council of State Housing Agencies; HUD Capital Needs Assessment; Government Accountability Office",
          sourceUrl: "https://www.gao.gov/products/gao-23-105380",
          reasoning:
            "GAO and HUD data are authoritative government sources. The $70 billion backlog is a devastating indictment of US public housing policy. However, it reflects deliberate underfunding — Congress appropriated $3.2 billion annually when $6 billion was needed — rather than inherent impossibility of public housing. Well-funded developments (e.g., New York's NYCHA Queensbridge Houses) maintain high satisfaction.",
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
      title: "The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality — Diamond et al. (2019)",
      url: "https://www.aeaweb.org/articles?id=10.1257/aer.20181289",
    },
    {
      title: "The Vienna Model of Social Housing — City of Vienna",
      url: "https://socialhousing.wien/the-vienna-model",
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
        "If housing is primarily a market commodity, the solution is to remove barriers to supply and let prices self-correct. If housing is a fundamental right, governments have an obligation to ensure access regardless of market conditions. The answer to this philosophical question determines which policy interventions are considered legitimate — and the current crisis suggests the market-only approach has failed millions of families.",
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
