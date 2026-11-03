export const housingAffordabilityCrisisData = {
  id: "housing-affordability-crisis",
  title: "Housing Supply & Affordability",
  question:
    "Would building more homes make housing affordable?",
  aliases: [
    "Why is housing so expensive?",
    "Is there a housing shortage?",
    "YIMBY vs NIMBY",
    "Does upzoning lower rents?",
    "Does new luxury housing lower rents?",
    "Should the government build public housing?",
  ],
  meta_claim:
    "Building more homes, by loosening zoning and land-use rules and by public construction where the market will not build, is the main way to make housing affordable, including for lower-income renters.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: Harvard JCHS, State of the Nation's Housing 2026
  // (17 June 2026): 22.7 million cost-burdened renter households in 2024,
  // median home price nearly five times median income, prices up 54% since
  // 2020. Freddie Mac 30-year rate 7.24% (week of 29 Oct 2026). Pew (18 Mar
  // 2026) on Austin: 120,000 homes added 2015-2024, median rent down more
  // than 16% from 2021 to 2026.
  last_updated: "2026-11-03",
  keystone_fact: {
    statement:
      "The typical US home now costs nearly five times the typical household's income, against about 3.2 times in the 1990s, and in 2024 a record 22.7 million renter households spent more than 30% of their income on housing. Austin added 120,000 homes from 2015 to 2024, and its median rent fell more than 16% from 2021 to 2026. The fight is over whether building more brings rents down for lower-income renters everywhere, how fast, and who has to do the building.",
    confidence: 84,
    source:
      "Harvard Joint Center for Housing Studies, The State of the Nation's Housing 2026, via Enterprise Community Partners (17 June 2026); Pew Charitable Trusts on Austin, via Smart Cities Dive (19 March 2026)",
    sourceUrl:
      "https://www.enterprisecommunity.org/story/five-key-takeaways-2026-state-nations-housing-report",
  },
  simple_case: [
    "The stakes are the biggest bill most households pay. Home prices rose 54% from 2020 to 2026, the 30-year mortgage rate was 7.24% at the end of October 2026, and among renters earning under $30,000 a year, 83% spend more than 30% of their income on housing.",
    "The argument runs in three steps: whether high prices come from too few homes or from demand that would outrun any building; whether new market-rate homes lower rents for people who cannot afford them; and whether government has to build where the market will not.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Is it a shortage? (new, 2026-11-03)
    // =========================================================================
    {
      id: "shortage-or-demand",
      title: "Too few homes, or too much demand?",
      short_summary:
        "The supply story says rules that block building drive prices far above what homes cost to build. A 2025 study by Federal Reserve and academic economists finds cities that build easily saw prices rise just as fast when incomes rose, which would mean the rules matter less than people think. Which is right decides whether building is the cure.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Prices follow demand, and building does not change that much. Louie, Mondragon and Wieland find that from 2000 to 2020, faster income growth predicted the same growth in house prices, housing quantity and population in cities whatever their estimated supply flexibility, and the same for rents, over 1980 to 2020 as well. Their conclusion is that estimated supply constraints are unimportant in explaining why prices rose more in some cities than others, and that relaxing them may not materially affect affordability. Since 2020 the biggest swing in what a home costs has come from mortgage rates, which were 7.24% at the end of October 2026, not from zoning rules.",
      proponent_rebuttal:
        "Where building is hard, prices float far above what it costs to build. Glaeser and Gyourko compare market prices with the cost of producing a home and read the gap as a regulatory tax, which they find is higher in many places than any reasonable estimate of the harm new building does to neighbors. The low end of the market has shrunk: units renting for under $1,000 a month fell 30% between 2014 and 2024. Studies that follow what happens when building is allowed, in Auckland and Austin and at the level of single buildings, find rents lower than they would otherwise be. One cross-city study, still a working paper, does not overturn that evidence.",
      crux: {
        id: "supply-constraints-test",
        title: "The Supply-Constraint Test",
        question:
          "Do rules that limit building explain why housing costs rose so much more in some cities than others?",
        description:
          "If land-use rules are the main reason prices rose in high-cost cities, then loosening them should slow price and rent growth when demand rises. If prices and rents rise just as fast in easy-building cities when incomes grow, as Louie, Mondragon and Wieland report for 2000 to 2020, the rules explain less and building more would do less for affordability than reformers expect.",
        methodology:
          "Measure supply elasticity city by city with several methods (geography, regulation indices, permitting times). Regress house-price, rent and quantity growth on income or demand shocks, interacted with elasticity, over 1980-2020 and 2020-2026. Compare the price-to-construction-cost gap across cities and its change after reforms.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Replications of the Louie-Mondragon-Wieland test by other teams using different measures of how easily each city can build, set beside the gap between home prices and construction costs, and price and rent growth in cities that loosened their rules after 2016 against matched cities that did not.",
        },
        cost_to_verify: "$100K-300K (re-analysis of public price, rent, income and permit data)",
        falsification: {
          supporter_flip:
            "If other teams' replications found prices and rents rising just as fast in easy-building cities when demand rose, and cities that loosened their rules saw no slower rent growth, the claim that building more is the main route to affordability would weaken.",
          skeptic_flip:
            "If replications found that rents and prices rose much more slowly in easy-building cities facing the same demand, and the price-to-cost gap shrank where rules were loosened, the demand-only reading would lose its footing.",
          common_ground:
            "Home prices rose 54% from 2020 to 2026 and the median home now costs nearly five times the median household income, against about 3.2 times in the 1990s; demand and interest rates move prices along with supply.",
          live_disagreement:
            "Whether land-use rules explain much of why some cities became so expensive, or whether demand would have pushed prices up nearly as far even if those cities had built freely.",
        },
      },
      evidence: [
        {
          id: "louie-mondragon-wieland",
          title:
            "Louie, Mondragon & Wieland 2025: income growth predicted the same price and rent growth in cities whatever their supply flexibility",
          description:
            "From 2000 to 2020, higher income growth predicted the same growth in house prices, housing quantity and population regardless of a city's estimated housing supply elasticity. The authors find the same for rents, for 1980 to 2020, with different elasticity measures and with plausibly exogenous demand shifts. They conclude estimated supply constraints are unimportant in explaining differences in rising house prices among US cities, and that relaxing regulatory constraints may not materially affect affordability.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "Louie, Mondragon & Wieland, 'Supply Constraints do not Explain House Price and Quantity Growth Across U.S. Cities,' NBER Working Paper 33576 (March 2025, revised August 2025)",
          sourceUrl: "https://www.nber.org/papers/w33576",
          reasoning:
            "Tests the supply story directly and in many ways. It is a recent working paper; its result rests on how well existing elasticity measures capture how easily a city can build, which other economists dispute.",
        },
        {
          id: "glaeser-regulatory-tax",
          title:
            "Glaeser & Gyourko 2018: in many markets the gap between home prices and building costs exceeds any reasonable cost of new construction to neighbors",
          description:
            "Glaeser and Gyourko compare market prices with the cost of producing a housing unit. Where prices roughly equal production cost, the market delivers homes efficiently; the gap between price and production cost can be read as a regulatory tax. They conclude the available evidence suggests, but does not definitively prove, that this implicit tax is higher in many areas than any reasonable negative externalities of new construction.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Glaeser & Gyourko, 'The Economic Implications of Housing Supply,' Journal of Economic Perspectives 32(1) (2018)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/jep.32.1.3",
          reasoning:
            "Peer-reviewed work by two of the most cited housing economists, with its own hedge stated plainly. Part of a price-cost gap can reflect land that is scarce for reasons other than regulation, such as coastlines and amenities.",
        },
        {
          id: "low-rent-units-shrinking",
          title:
            "Units renting for under $1,000 a month fell 30% from 2014 to 2024, while asking rents were 29% above 2020 in early 2026 (Harvard JCHS)",
          description:
            "Harvard's 2026 State of the Nation's Housing report found the number of US units renting for under $1,000 a month fell 30% between 2014 and 2024. Average asking rents for professionally managed apartments were 29% higher in the first quarter of 2026 than in 2020, although national rents fell 0.5% over the year to that quarter. Total new housing construction declined 1% in 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "Harvard JCHS, The State of the Nation's Housing 2026, as summarized by the National Low Income Housing Coalition (13 July 2026)",
          sourceUrl:
            "https://nlihc.org/resource/jchss-2026-state-nations-housing-report-finds-cost-burdens-renters-continue-rise-amid",
          reasoning:
            "Shows the cheapest part of the stock shrinking. Rising rents and incomes move units above $1,000 without any home being lost, so it does not by itself show a shortage of homes.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Does new building lower rents? (id kept: paste crux eval)
    // =========================================================================
    {
      id: "zoning-supply-constraints",
      title: "Does new building lower rents?",
      short_summary:
        "Critics say new buildings are luxury units that do nothing for people who cannot afford them. A run of recent studies finds the opposite effect at three scales: nearby rents fall about 6% around a new building, each 100 new market-rate homes open the equivalent of 70 in below-median-income neighborhoods, and Auckland's citywide upzoning left rents well below trend. A Minneapolis Fed study warns that the most famous US example may owe more to falling demand.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Upzoning mainly delivers market-rate apartments, not homes priced for low-income families. The famous US case is weaker than it looks: Minneapolis Fed economists found its slow rent growth after 2020 owed more to a drop in demand in the city than to new supply, with vacancies peaking at 9.5% in October 2020, and they say the data do not show whether the 2040 plan has worked. Moving chains break: a new apartment taken by someone leaving a parent's home, or by a second-home buyer, frees nothing, and landlords can leave units empty rather than cut rents. Even supportive researchers say benefits take two to five years to reach the poorest neighborhoods and cannot push rents below what a habitable home costs to run. Families facing eviction this year need vouchers, public housing or rent protections, not a promise.",
      proponent_rebuttal:
        "New buildings lower rents nearby, and the effect travels down the income ladder. Asquith, Mast and Reed find large new apartment buildings in low-income areas cut rents in nearby units by about 6% and draw residents from low-income areas. Tracing 52,000 residents of new buildings back through their previous homes, Mast finds every 100 new market-rate units open the equivalent of 70 in below-median-income neighborhoods and 40 in the poorest. Auckland upzoned about three-quarters of its residential land in 2016; six years later rents for three-bedroom homes were 22 to 35% below a synthetic control. Austin grew its housing stock by 120,000 homes, 30%, from 2015 to 2024, and its median rent fell more than 16% from 2021 to 2026. Building does not work overnight, but it works at every scale it has been measured.",
      crux: {
        id: "upzoning-affordability-impact",
        title: "The Upzoning Affordability Test",
        question:
          "Does upzoning lower rents for median and lower-income renters within 5–10 years?",
        description:
          "If upzoning lowers rents at the median and below within 5-10 years, not just at the luxury tier, then market building reaches lower-income renters. If rents fall only at the top, lower-income renters need public construction or demand-side help such as vouchers and rent stabilization. Legalizing apartments near transit, ending single-family-only zoning and dropping parking minimums are the reforms most often tested: Minneapolis, Auckland, Austin and Oregon.",
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
            "If well-controlled studies of upzoned cities showed rents falling only at the top while the median and 25th percentile held or rose for a decade, market building alone could not be the main route to affordability for lower-income renters.",
          skeptic_flip:
            "If more natural experiments matched Auckland's rents below trend and Austin's fall, with moving-chain studies tracing new high-end units to cheaper vacancies, the claim that new supply does not help lower-income renters would be hard to hold.",
          common_ground:
            "Restrictive zoning raises prices, and more housing eventually eases market-wide pressure; the dispute is how fast and how far down the income ladder the benefit reaches.",
          live_disagreement:
            "Whether new market-rate building lowers rents at the median and below within a 5-10 year window, or works too slowly and too unevenly to help the renters most at risk.",
        },
      },
      evidence: [
        {
          id: "asquith-mast-reed-nearby-rents",
          title:
            "Asquith, Mast & Reed 2023: new large apartment buildings in low-income areas cut nearby rents by about 6%",
          description:
            "Using microdata on large new apartment buildings, rents and migration, the authors find new buildings decrease rents in nearby units by about 6% relative to units slightly farther away or near sites developed later, and increase in-migration from low-income areas. The buildings absorb many high-income households and add substantially to the local stock; any amenity boost is too small to raise nearby rents.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Asquith, Mast & Reed, 'Local Effects of Large New Apartment Buildings in Low-Income Areas,' Review of Economics and Statistics 105(2): 359-375 (2023)",
          sourceUrl: "https://econpapers.repec.org/RePEc:tpr:restat:v:105:y:2023:i:2:p:359-375",
          reasoning:
            "A peer-reviewed design comparing near and slightly farther units, which answers the 'luxury buildings raise nearby rents' worry directly. It measures neighborhood effects of single buildings, not citywide affordability.",
        },
        {
          id: "mast-moving-chains",
          title:
            "Mast: every 100 new market-rate units open the equivalent of 70 in below-median-income neighborhoods and 40 in the poorest",
          description:
            "Tracking 52,000 residents of new market-rate buildings in 12 large US cities back to their previous homes and through the chain of moves that followed, Evan Mast finds each 100 new market-rate units open the equivalent of 70 units in neighborhoods below the area's median income and 40 in the poorest. Mast notes the chain can break, through second homes or young adults leaving a parent's home, and that lower costs in the poorest neighborhoods take about two to five years to appear.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Mast, 'The Effect of New Market-Rate Housing Construction on the Low-Income Housing Market,' Journal of Urban Economics 133 (2023), as summarized by the W.E. Upjohn Institute",
          sourceUrl:
            "https://www.upjohn.org/research-highlights/new-construction-makes-homes-more-affordable-even-those-who-cant-afford-new-units",
          reasoning:
            "Direct evidence on the filtering mechanism. It measures vacancies opened, not rents, and the author lists the ways the chain can fail.",
        },
        {
          id: "auckland-upzoning-results",
          title:
            "Auckland upzoned three-quarters of its residential land in 2016; six years on, three-bedroom rents were 22-35% below a synthetic control",
          description:
            "In 2016 Auckland upzoned approximately three-quarters of its residential land, setting off a construction boom. Comparing Auckland with a weighted average of other New Zealand urban areas that tracked it before the reform, Greenaway-McGrevy finds that six years after full implementation, rents for three-bedroom dwellings were 22 to 35% below the synthetic control, statistically significant at 5%; two-bedroom rents were 14 to 22% below, significant at 10% in only some specifications.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source:
            "Greenaway-McGrevy, 'Can Zoning Reform Reduce Housing Costs? Evidence from Rents in Auckland,' University of Auckland Economic Policy Centre Working Paper 016 (May 2023)",
          sourceUrl:
            "https://cdn.auckland.ac.nz/assets/business/about/our-research/research-institutes-and-centres/Economic-Policy-Centre--EPC-/WP016.pdf",
          reasoning:
            "The most comprehensive upzoning experiment studied so far, measuring rents directly. It is a working paper with one author and a synthetic control built from smaller New Zealand cities; an earlier version of this card misstated its range.",
        },
        {
          id: "austin-building-boom",
          title:
            "Austin grew its housing stock 30% from 2015 to 2024, and its median rent fell more than 16% from 2021 to 2026 (Pew)",
          description:
            "Pew reported in March 2026 that Austin added 120,000 homes from 2015 to 2024, a 30% increase against 9% nationally, after rezoning, cutting parking minimums and loosening rules for accessory dwelling units. Median rent fell more than 16% from 2021 to 2026, and rents in buildings of 50 or more units dropped 7% from 2023 to 2024, the largest drop recorded in any large metro area.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Pew Charitable Trusts (18 March 2026), as reported by Smart Cities Dive (19 March 2026)",
          sourceUrl: "https://www.smartcitiesdive.com/news/austin-texas-housing-policy-reform-rent/815208/",
          reasoning:
            "The largest recent US case of building followed by falling rents. It is a before-and-after comparison, not a causal estimate; Austin's population boom also slowed, and the 2021 starting point was a peak.",
        },
        {
          id: "minneapolis-mixed-results",
          title:
            "Minneapolis Fed 2025: the city's slow rent growth after its 2040 plan owed more to a drop in demand than to new supply",
          description:
            "Minneapolis rents grew more slowly than in comparison cities after 2019: Apartment List showed them falling 3.5% from January 2019 to December 2023 while comparison-city rents rose 22.4%, and Census medians rose 25.7%, slightly less than peers. Minneapolis Fed economists found vacancies peaked at 9.5% in October 2020 and concessions were more common than elsewhere, and concluded that slow rent growth 'may result more from a negative housing demand shock' than from supply. They add that the findings 'do not imply that the 2040 Plan has or has not been successful.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Hembre, Horowitz, Starling & Xu, 'Unpacking supply and demand in rent trends since the Minneapolis 2040 Plan,' Federal Reserve Bank of Minneapolis (25 August 2025)",
          sourceUrl:
            "https://www.minneapolisfed.org/article/2025/unpacking-supply-and-demand-in-rent-trends-since-the-minneapolis-2040-plan",
          reasoning:
            "A careful look at the most cited US example by economists with no stake in either side. It weakens Minneapolis as proof that zoning reform lowers rents, without showing the reform failed.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Public housing (id kept: paste crux eval)
    // =========================================================================
    {
      id: "public-housing",
      title: "Should government build?",
      short_summary:
        "Even if market building helps, it may not reach the bottom fast enough. Vienna houses nearly three in five residents in social housing funded partly by a 1% tax on Austrian paychecks; US public housing carries a capital backlog of about $70 billion and three in four low-income renters who need federal help do not get it. The dispute is whether Vienna's results come from a design the US could copy.",
      icon_name: "Users" as const,
      skeptic_premise:
        "US public housing is a cautionary tale. The 1949 Housing Act promised 'a decent home' for every American and produced concentrated poverty, segregation and decay; Pruitt-Igoe in St. Louis and Cabrini-Green in Chicago became symbols of failure. The remaining stock carries a capital backlog of about $70 billion. Government is slow to build and worse at maintaining, and the money would house more people as vouchers in private buildings. Vienna's model rests on a century of political consensus and land the city has owned for generations, conditions no American city can recreate.",
      proponent_rebuttal:
        "The failure of US public housing was a choice: it was built for the poorest alone, segregated and then starved of money. Vienna did the opposite. Nearly three in five residents live in social housing, households earning up to twice the average salary qualify, most pay no more than 25% of their income in rent, and a 1% tax on every Austrian paycheck helps fund it. Vouchers are no substitute in a market short of homes: about three in four low-income renters who need federal rental assistance do not receive it, and a voucher adds no home. Where the market will not build for the bottom, someone has to.",
      crux: {
        id: "public-housing-quality-at-scale",
        title: "The Public Housing Quality-at-Scale Test",
        question:
          "Did Vienna and Singapore's public housing succeed through transferable design, or conditions unique to them?",
        description:
          "If government-built housing can achieve high resident satisfaction, physical quality and mixed incomes at scale, as Vienna and Singapore claim, then public housing is a viable answer to the affordability crisis. If these models depend on cultural or political conditions that cannot transfer to the US, it is not a general answer.",
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
            "If a careful comparison found Vienna's and Singapore's results depend on conditions that cannot transfer, such as century-old municipal land and a dedicated tax, and comparably funded US projects still produced concentrated poverty and decay, public housing would not be a general answer here.",
          skeptic_flip:
            "If well-funded, mixed-income US developments kept residents satisfied and buildings sound, the US failures would look like a product of underfunding and design rather than of public provision itself.",
          common_ground:
            "US public housing has been chronically underfunded, and some systems abroad deliver good housing at scale; the dispute is whether those successes can be copied in the US.",
          live_disagreement:
            "Whether the gap between Vienna and US public housing comes from transferable choices about funding and who is eligible, or from conditions the US cannot recreate.",
        },
      },
      evidence: [
        {
          id: "vienna-social-housing",
          title:
            "Vienna: nearly three in five residents live in social housing, open to households earning up to twice the average salary",
          description:
            "Nearly three out of five Viennese live in social housing, and subsidized housing is a 44% share of the city's rental stock. The city owns 1,800 apartment complexes. Households can earn up to twice the average Vienna salary and still qualify, most residents pay no more than 25% of their income in rent, and 1% of every Austrian paycheck goes to fund social housing, almost $300 million a year for Vienna.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "Marketplace, 'In Vienna, public housing is affordable and desirable' (3 May 2021)",
          sourceUrl:
            "https://www.marketplace.org/story/2021/05/03/in-vienna-public-housing-is-affordable-and-desirable",
          reasoning:
            "Well documented and long-running. Vienna has owned much of its land for a century and enjoys broad political support, which is exactly what the other side says cannot be copied; the figures are from 2021 reporting.",
        },
        {
          id: "us-public-housing-backlog",
          title: "US public housing carries a capital repair backlog of about $70 billion",
          description:
            "Housing authorities told Congress the US public housing stock carries an estimated $70 billion capital repair backlog, built up over years in which appropriations fell short of what the buildings needed.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Congressional hearing record; National Association of Housing and Redevelopment Officials capital-needs estimate",
          sourceUrl: "https://www.congress.gov/event/117th-congress/house-event/LC66633/text",
          reasoning:
            "The hearing record preserves the housing-authority estimate. It shows the US system's condition; whether that reflects public provision as such or decades of underfunding is the crux.",
        },
        {
          id: "section-8-voucher-limitations",
          title: "Three in four low-income renters who need federal rental assistance do not get it (CBPP)",
          description:
            "CBPP's analysis of 2023 housing survey data and 2024 assistance records estimates that 76% of low-income renters needing federal rental assistance do not receive it. Need includes spending more than 30% of monthly income on housing or living in overcrowded or substandard housing.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Center on Budget and Policy Priorities, 'Three Out of Four Low-Income At-Risk Renters Do Not Receive Federal Rental Assistance'",
          sourceUrl: "https://www.cbpp.org/research/housing/three-out-of-four-low-income-at-risk-renters-do-not-receive-federal-rental-assistance",
          reasoning:
            "Shows how little the demand-side alternative reaches at current funding. It does not show public construction would do better per dollar.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Enterprise Community Partners: Five key takeaways from the 2026 State of the Nation's Housing report (17 June 2026)",
      url: "https://www.enterprisecommunity.org/story/five-key-takeaways-2026-state-nations-housing-report",
    },
    {
      title: "Freddie Mac 30-year fixed mortgage rate via FRED (MORTGAGE30US)",
      url: "https://fred.stlouisfed.org/series/MORTGAGE30US",
    },
    {
      title: "The Economic Implications of Housing Supply — Glaeser & Gyourko (2018)",
      url: "https://www.aeaweb.org/articles?id=10.1257/jep.32.1.3",
    },
    {
      title: "Municipal Housing in Vienna (Gemeindebau) — Wiener Wohnen, City of Vienna",
      url: "https://www.wienerwohnen.at/wiener-gemeindebau/municipal-housing-in-vienna.html",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is housing a commodity or a right?",
      content:
        "If housing is primarily a market good, the answer is to remove barriers to building and let prices adjust. If it is a right, governments owe access whatever the market does. The answer shapes which policies each side treats as legitimate: freeing private building, building public housing, or both.",
    },
    {
      id: "q2",
      title: "Can zoning reform alone solve the affordability crisis?",
      content:
        "Reformers argue that legalizing more homes is enough: build and prices will ease. But land, labor and financing set a floor under what a new home costs, and at a 7.24% mortgage rate, many projects do not pencil out even where they are legal. If that floor sits above what low-income households can pay, building alone will not close the gap without subsidy.",
    },
    {
      id: "q3",
      title: "Why has US public housing failed while Vienna succeeds?",
      content:
        "The US built public housing for the poorest alone, funded it poorly and then cut it further. Vienna built for a broad middle class, funded it with a dedicated tax and kept it in repair. Is the US failure a verdict on public housing, or on how America chose to do it?",
    },
  ],
};
