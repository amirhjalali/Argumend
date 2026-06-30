export const housingAffordabilityCrisisData = {
  id: "housing-affordability-crisis",
  title: "The Housing Affordability Crisis",
  meta_claim:
    "Government intervention through zoning reform, rent control, and public housing is necessary to solve the housing affordability crisis, as the free market alone cannot provide adequate affordable housing.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The most counterintuitive finding in housing economics is that building more market-rate housing — even pricey 'luxury' units — reliably lowers rents, including for lower-income renters, through moving chains: new high-end units free up cheaper older ones. When Auckland upzoned three-quarters of its residential land in 2016, construction surged (~4% of the city's housing stock in five years) and rents fell well below trend. The catch is that filtering takes years to reach the bottom of the market, so supply alone doesn't help a family facing eviction today.",
    confidence: 84,
    source:
      "Greenaway-McGrevy & Phillips, Journal of Urban Economics (2023, Auckland upzoning); Mast, JUE (2021, moving chains); Bratu et al., JUE (2023, Helsinki); Glaeser & Gyourko, JEP (2018, regulatory cost)",
    sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/jep.32.1.3",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The economics are unusually settled: restrictive zoning is the single biggest driver of high housing costs — Glaeser and Gyourko estimate it adds over $400,000 to a home's price in the most constrained cities — and the fix is to let more housing get built, since added supply (even at the top of the market) filters down and lowers rents broadly, as Auckland, Tokyo, and U.S. moving-chain studies show.",
    "The honest limitation is timing and reach: filtering can take years to relieve the bottom of the market, new construction can't be built below roughly $300,000–$500,000 per unit in most U.S. cities, and Minneapolis showed that ending single-family zoning alone produced only modest new supply — so the lowest-income renters, 11 million of whom already spend over half their income on rent, may still need subsidies or public supply.",
    "So the honest debate isn't 'does building more housing lower rents' (it does) but 'is supply alone fast enough and deep enough to reach the poorest renters, or are rent stabilization, vouchers, and government-built housing also required to close the gap that the market floor leaves open.'",
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
        falsification: {
          supporter_flip:
            "If well-controlled studies of upzoned cities showed rents falling only at the luxury tier while the median and 25th-percentile stayed flat or rose for a decade-plus — with filtering never reaching the bottom — then the claim that supply-side reform is sufficient would collapse to 'necessary but not sufficient without subsidies or public supply.'",
          skeptic_flip:
            "A skeptic who says upzoning just builds luxury units should weigh the Auckland natural experiment (construction up ~4% of stock in five years, rents below trend), Tokyo's two decades of flat rents under permissive national zoning, and U.S. moving-chain studies showing new high-end units free up cheaper ones within a few moves — so 'new supply doesn't help the non-rich' is contradicted by the strongest evidence.",
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
          title: "Ending Single-Family Zoning Alone Had Modest Impact in Minneapolis (Pew, 2024)",
          description:
            "Minneapolis became the first major US city to eliminate single-family-only zoning in its Minneapolis 2040 plan, effective January 2020. A 2024 Pew Charitable Trusts analysis found that legalizing duplexes and triplexes on former single-family lots accounted for only about 1% of new units — most new supply (roughly 87%) came from buildings with 20+ units, driven by allowing apartments along commercial and transit corridors and eliminating parking minimums. From 2017 to 2022, Minneapolis grew its housing stock 12% while rents rose just 1%, versus 14% rent growth in the rest of Minnesota. The evidence suggests ending single-family zoning is, on its own, necessary but far from sufficient.",
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
    // PILLAR 2: Rent Control & Tenant Protections
    // =========================================================================
    {
      id: "rent-control",
      title: "Rent Control & Tenant Protections",
      short_summary:
        "Rent control directly protects existing tenants from displacement, but economists overwhelmingly warn it reduces housing supply, misallocates units, and raises rents for non-controlled tenants in the long run.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The near-unanimous consensus among economists is that rent control reduces housing quality and supply. A landmark Stanford study of San Francisco's rent control found that while it lowered displacement of incumbent tenants, landlords responded by selling to owner-occupants and redeveloping buildings, reducing the rental housing supply by 15% — which the authors conclude likely drove up market-rate rents over the long run, ultimately undermining the policy's goals. In a 2012 IGM Forum survey, only 1 of roughly 32 leading economists who took a position agreed that rent control in cities like San Francisco and New York had a positive impact on the amount and quality of affordable housing. Rent control treats symptoms while worsening the underlying disease.",
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
        falsification: {
          supporter_flip:
            "If long-run data showed that even soft, inflation-indexed caps with new-construction exemptions (the Oregon design) still reduced construction starts, shrank the rental stock, or pushed up rents for non-covered tenants once COVID-era distortions are netted out, then 'modern rent stabilization avoids the old harms' would fail and the policy would look counterproductive.",
          skeptic_flip:
            "A skeptic citing the near-unanimous economist consensus against rent control should weigh that the 2012 IGM survey predates modern soft-cap designs, that Oregon's permits rose ~12% after its 2019 cap, and that the Stanford SF study found rent control did reduce displacement of incumbent tenants — so the blanket verdict may apply to hard ceilings, not to inflation-indexed caps with exemptions.",
          common_ground:
            "Both sides agree traditional hard rent ceilings reduce supply over time and that displacement imposes real, immediate harm on tenants; the dispute is whether newer designs escape the supply trap.",
          live_disagreement:
            "Whether Oregon-style soft caps prevent displacement without reducing construction once the pandemic boom, low rates, and in-migration are controlled for — which only a multi-state difference-in-differences analysis of permits, vacancy, and eviction rates over 2015–2028 can resolve.",
        },
      },
      evidence: [
        {
          id: "stanford-sf-rent-control",
          title: "Stanford Study: San Francisco Rent Control Reduced Supply by 6% (2019)",
          description:
            "A Stanford study by Diamond, McQuade, and Qian examined San Francisco's 1994 expansion of rent control to small multi-family buildings. They found that rent control limited renters' mobility by 20% and lowered displacement from San Francisco for incumbent tenants. However, landlords subject to rent control reduced the rental housing supply by 15% — by selling units to owner-occupants and redeveloping buildings — which the authors conclude likely drove up market-rate rents in the long run, ultimately undermining the law's goals. The net effect was a transfer from prospective and future renters to incumbent renters.",
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
          title: "Economists Overwhelmingly Reject That Rent Control Helps Affordability (IGM, 2012)",
          description:
            "The University of Chicago's IGM Forum asked leading economists whether local ordinances limiting rent increases (such as in New York and San Francisco) 'have had a positive impact over the past three decades on the amount and quality of broadly affordable rental housing.' Of those who took a position, only one agreed; roughly 79% of all respondents disagreed or strongly disagreed, with the remainder uncertain or not answering. Nobel laureate Paul Krugman has called rent control 'among the best-understood issues in all of economics.' This represents one of the strongest professional consensus positions in economics, comparable to consensus on free trade benefits.",
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
        falsification: {
          supporter_flip:
            "If a careful comparative study found that Vienna's and Singapore's results depend on conditions that cannot transfer — a century of dedicated payroll-tax funding, vast pre-existing municipal land ownership, or high state capacity and social cohesion — and that comparably funded U.S. attempts still produced concentrated poverty and deterioration, then public housing would not be a generalizable answer to American affordability.",
          skeptic_flip:
            "A skeptic pointing to Pruitt-Igoe and the $70 billion U.S. maintenance backlog should weigh that the backlog tracks deliberate underfunding (Congress appropriated ~$3.2B when ~$6B was needed) rather than inherent impossibility, that well-funded U.S. developments keep satisfaction high, and that Vienna houses 62% of residents in award-winning units — so 'government can't build housing' is a verdict on the U.S. funding model, not on public provision as such.",
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
