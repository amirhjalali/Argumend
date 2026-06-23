import type { Topic } from "@/lib/schemas/topic";

export const verticalFarmingViabilityData = {
  id: "vertical-farming-viability",
  title: "Is Vertical Farming the Future of Food?",
  meta_claim:
    "Indoor vertical farms will become a major, economically viable pillar of how the world produces food",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "A peer-reviewed life-cycle assessment found that a UK vertical farm grew about 97 kg of lettuce per square meter versus 3.3 kg in an open field — roughly 20-30x more food per unit of ground. But the same study found grid-powered vertical lettuce emitted ~4.7 kg of CO2 per kg of produce against ~0.6 kg for field lettuce, because electricity for LED lighting and climate control made up about 85% of its footprint. The land miracle is real; the energy bill is the problem.",
    confidence: 80,
    source:
      "Gargaro et al., 'A Comparative LCA of Field Grown Lettuce Versus Vertically Farmed Lettuce,' Food and Energy Security (2025), University of Surrey",
    sourceUrl: "https://onlinelibrary.wiley.com/doi/full/10.1002/fes3.70117",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Indoor vertical farms are genuinely impressive on several axes: a controlled-environment farm can grow 20-30x more leafy greens per square meter of ground than a field, use up to roughly 90-98% less water through closed-loop recirculation, eliminate pesticides, sidestep weather and crop failures, and sit next to the city that eats the food.",
    "The catch is energy and economics: replacing the free sunlight of a field with LED lighting and full climate control makes electricity the single largest operating cost, which is why the technology only pencils out for a narrow band of high-value, fast-growing crops — leafy greens, herbs, microgreens, some berries — and is one to two orders of magnitude too expensive for the cereals that supply most of humanity's calories.",
    "So the honest debate is not whether vertical farming works (it demonstrably grows food and saves water and land) but whether it can ever be cheap and energy-efficient enough to matter at scale — a question sharpened by a wave of high-profile failures, including AppHarvest and AeroFarms' 2023 Chapter 11 filings, Bowery's late-2024 shutdown after raising over $700 million, and Plenty's 2025 bankruptcy after raising nearly $1 billion.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Resource Efficiency vs Energy Cost
    // =========================================================================
    {
      id: "resource-efficiency-energy-cost",
      title: "Resource Efficiency vs Energy Cost",
      short_summary:
        "Vertical farms slash water and land use and eliminate pesticides — but they replace free sunlight with electricity-hungry LEDs, making energy the dominant cost and, on a grid powered by fossil fuels, often a larger carbon footprint than field farming. Proponents argue cheaper renewables and more efficient LEDs close the gap; skeptics argue the thermodynamics of converting electricity to plant matter at ~1-2% efficiency are a hard ceiling.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Vertical farming's core problem is physics, not engineering polish. A field gets its energy from the sun for free; an indoor farm must buy that energy as electricity to run LED lighting (typically 60-80% of the energy budget) plus HVAC and dehumidification. A 2025 analysis from Ron Milo's lab in Plant Physiology calculated that vertical farms convert electricity into edible dry plant matter at only about 1-2% efficiency — roughly 250 kWh per kg of dry biomass, implying a floor around $10/kg of dry matter just for electricity. Even for water-heavy leafy greens that drops to about $0.50/kg of electricity, which is barely in line with producer prices before you add buildings, labor, and capital. Worse, on a typical grid the carbon footprint can exceed field farming: the University of Surrey LCA found grid-powered vertical lettuce emitted ~4.7 kg CO2 per kg versus ~0.6 kg for field lettuce, with electricity responsible for ~85% of that footprint. You cannot LED your way past the sun's free joules.",
      proponent_rebuttal:
        "The resource case is real and large where it counts. Vertical farms produce roughly 20-30x more food per square meter of ground than open fields (97 kg/m² vs 3.3 kg/m² for lettuce in the Surrey study), use up to ~90-98% less water via closed-loop recirculation, require essentially no pesticides, and are immune to drought, frost, and crop failure — all while growing next to the consumer, cutting transport spoilage and food miles. The energy objection is a snapshot, not a destiny: LED efficacy has improved dramatically and continues to, and the Milo paper itself notes that with renewable electricity the environmental math flips — the Surrey study found that switching the same vertical farm to renewable power cut emissions to ~0.93 kg CO2/kg, far closer to field levels. As solar and wind drive marginal electricity prices toward zero in sunny and windy regions, the one input vertical farming over-consumes is precisely the one getting cheaper and cleaner fastest.",
      crux: {
        id: "renewable-energy-breakeven",
        title: "The Renewable-Powered Cost-and-Carbon Test",
        description:
          "Whether falling renewable-electricity prices and improving LED efficiency can drive the all-in cost and carbon footprint of vertically farmed produce below that of field and greenhouse produce. If clean electricity gets cheap enough and LEDs efficient enough that grid-parity is reached for a meaningful crop range, the energy objection dissolves. If the ~1-2% electricity-to-biomass conversion efficiency is a near-hard physical ceiling, no price of electricity makes vertical farming competitive for anything but premium niche crops.",
        methodology:
          "Build a transparent, bottom-up techno-economic and life-cycle model for representative crops (lettuce, basil, strawberries, wheat) under varying electricity prices ($0.02-$0.40/kWh) and LED efficacy (current ~3 μmol/J trending toward the ~5 μmol/J practical ceiling). For each scenario compute all-in production cost per kg and cradle-to-gate CO2 per kg, benchmarked against field and high-tech greenhouse production. Identify the electricity-price and LED-efficacy thresholds at which vertical farming reaches cost and carbon parity for each crop, and test sensitivity to capital, labor, and grid carbon intensity.",
        equation:
          "C_{elec} = \\frac{P_{elec} \\times E_{kWh/kg}}{\\eta_{LED} \\times \\eta_{photosynthesis}}",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-1M (Techno-economic modeling plus metered data from operating commercial farms across electricity markets)",
        falsification: {
          supporter_flip:
            "If rigorous modeling showed the ~1-2% electricity-to-biomass conversion efficiency is a near-hard physical ceiling — so even near-free renewable electricity plus best-case LEDs cannot bring all-in cost and carbon below field/greenhouse levels for crops beyond a premium niche — the 'cheaper renewables will close the gap' case would collapse.",
          skeptic_flip:
            "A skeptic who treats the energy bill as fatal should weigh that the Surrey LCA found renewable power alone cut vertical lettuce emissions from ~4.7 to ~0.93 kg CO2/kg, that LED efficacy keeps improving, and that marginal renewable electricity prices are falling fast — so the bottleneck input is the one getting cheapest and cleanest.",
          common_ground:
            "Both sides agree vertical farms dramatically cut water and land use, that energy is the dominant cost, and that on a fossil-heavy grid the carbon footprint can exceed field farming.",
          live_disagreement:
            "Whether the low electricity-to-biomass conversion efficiency is a soft engineering limit that cheap renewables and better LEDs can overcome, or a near-hard physical ceiling — which only a transparent techno-economic model across electricity prices and LED efficacy can resolve.",
        },
      },
      evidence: [
        {
          id: "surrey-land-water-yield",
          title:
            "Vertical Lettuce Yielded ~30x More Per m² and Used ~8x Less Water (Surrey LCA, 2025)",
          description:
            "A life-cycle assessment by Gargaro and colleagues at the University of Surrey, published in Food and Energy Security (2025), compared a commercial UK vertical farm against field lettuce in the UK and Spain. The vertical farm produced about 97.3 kg of lettuce per square meter versus 3.3 kg per square meter in the field — roughly a 30x advantage in ground productivity — while using about eight times less water than the most water-intensive Spanish field farm. The study is notable for being among the first to fully account for field soil emissions in the comparison.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source:
            "Gargaro et al., Food and Energy Security (2025), University of Surrey Centre for Environment and Sustainability",
          sourceUrl: "https://onlinelibrary.wiley.com/doi/full/10.1002/fes3.70117",
          reasoning:
            "Peer-reviewed LCA from an independent university research center, using primary data from an operating commercial farm. Directly quantifies the land and water advantages that anchor the 'for' case. Replicability is moderate because results depend on the specific farm, crop, and climate compared, but the order-of-magnitude yield and water findings are consistent with the broader literature.",
        },
        {
          id: "surrey-carbon-footprint",
          title:
            "Grid-Powered Vertical Lettuce Emitted ~8x More CO2 Than Field, Mostly From Electricity (Surrey LCA, 2025)",
          description:
            "The same University of Surrey LCA found that vertically farmed lettuce on conventional grid electricity emitted about 4.7 kg of CO2-equivalent per kg of lettuce, compared with about 0.59 kg for field-grown lettuce — roughly eight times higher. Electricity for lighting and climate control accounted for approximately 85% of the vertical farm's carbon footprint in the baseline scenario. Critically, switching the same farm to renewable electricity cut emissions to about 0.93 kg CO2/kg — still higher than the field, but far closer.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source:
            "Gargaro et al., Food and Energy Security (2025), University of Surrey",
          sourceUrl: "https://onlinelibrary.wiley.com/doi/full/10.1002/fes3.70117",
          reasoning:
            "Same peer-reviewed independent LCA, directly addressing the environmental cost of the energy input. Strong against the 'green' framing on a fossil grid, but the renewable-power scenario partially rebuts the objection, which is why this evidence cuts in a nuanced way rather than being decisive.",
        },
        {
          id: "milo-thermodynamic-ceiling",
          title:
            "Vertical Farms Convert Electricity to Biomass at Only ~1-2% Efficiency (Milo Lab, Plant Physiology 2025)",
          description:
            "A back-of-the-envelope analysis by Lovat, Noor, and Milo in Plant Physiology (2025) calculated that vertical farms convert electricity into edible dry plant matter at roughly 1-2% efficiency, requiring on the order of 250 kWh per kg of dry biomass and implying a minimum electricity cost near $10/kg of dry matter. For water-heavy crops like leafy greens and tomatoes the electricity cost drops to about $0.50/kg fresh weight — in line with current producer prices but still uncompetitive once buildings, labor, and capital are added. The authors conclude vertical farming is 'generally economically problematic' today and environmentally beneficial 'only under limited circumstances.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Lovat, Noor & Milo, 'Vertical farming limitations and potential demonstrated by back-of-the-envelope calculations,' Plant Physiology (2025)",
          sourceUrl: "https://academic.oup.com/plphys/article/198/3/kiaf056/8104144",
          reasoning:
            "Authored by Ron Milo's lab at the Weizmann Institute, a leading group in quantitative biology and bioenergetics, in a top plant-science journal. The thermodynamic framing is rigorous and transparent. Directness is high for the cost ceiling but slightly tempered because the analysis is intentionally a first-principles estimate rather than metered plant data.",
        },
        {
          id: "led-efficacy-improving",
          title:
            "Horticultural LED Efficacy Has Risen Sharply and Continues Toward a Higher Ceiling",
          description:
            "Lighting is the largest single energy draw in a vertical farm, typically 60-80% of total energy use, so LED efficiency directly drives the economics. Horticultural LED efficacy (photon output per watt, μmol/J) has improved substantially over the past decade and continues to advance toward an estimated practical ceiling around 5 μmol/J, with corresponding reductions in both electricity use and heat that must be removed by HVAC. Each efficiency gain compounds, because less lighting energy also means less cooling load.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Horticultural lighting literature; CEA energy benchmarking reviews",
          sourceUrl:
            "https://www.sciencedirect.com/science/article/pii/S2451904924007832",
          reasoning:
            "The trajectory of LED efficacy improvement is well documented, but its directness to the central claim is moderate: there is a physical ceiling (a photon can only do so much photosynthetic work), so improving LEDs helps but cannot escape the underlying conversion-efficiency limit the Milo paper identifies. Treated as a real but bounded 'for' point.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Economic Viability vs the Bankruptcy Wave
    // =========================================================================
    {
      id: "economic-viability-bankruptcies",
      title: "Economic Viability vs the Bankruptcy Wave",
      short_summary:
        "The best-funded names in vertical farming — AppHarvest, AeroFarms, Bowery, Plenty — collapsed or filed for bankruptcy between 2023 and 2025 despite raising hundreds of millions to nearly a billion dollars each. Skeptics read this as the market delivering its verdict; proponents read it as a financing-and-overbuild shakeout that is normal for an early capital-intensive industry, leaving leaner survivors and a clearer focus on crops that actually pay.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "When the most lavishly funded companies in a sector all fail at once, that is the market speaking. AppHarvest filed Chapter 11 in July 2023 and liquidated after a cash crunch driven by lower-than-expected yields and higher-than-expected costs. AeroFarms — the industry's flagship — filed Chapter 11 in June 2023. Bowery Farming, once valued at $2.3 billion and backed by celebrity investors, ceased all operations in late 2024 after raising more than $700 million in venture capital plus $150 million in KKR debt, laying off its workforce and entering an assignment for the benefit of creditors. Plenty filed Chapter 11 in March 2025 after raising nearly $1 billion. Industry trackers counted roughly fourteen indoor-farming bankruptcies in 2025 alone, with combined historical funding exceeding $1.37 billion. This is not a temporary capital-market wobble — it is a structural failure: the unit economics never closed, and selling lettuce and herbs at a premium cannot service the enormous capital and energy costs of building climate-controlled towers.",
      proponent_rebuttal:
        "Bankruptcy is not the same as the technology failing, and the survivors tell a more instructive story. Most of these failures were financing failures: companies that raised cheap money in the 2020-2021 zero-interest-rate boom, over-promised on scaling to staple crops and dozens of SKUs, built too much capacity too fast, and then could not refinance when rates rose and energy prices spiked in 2022-2023. Crucially, Chapter 11 is a restructuring tool, not a death certificate: AeroFarms emerged from bankruptcy fully funded with new ownership and continues producing microgreens, and Plenty moved through its 2025 Chapter 11 in roughly two months on a prepackaged plan, refocused on a premium strawberry farm in Virginia rather than commodity greens. Plenty of indoor operators — including European and Japanese plant factories and packaged-salad players like those supplying major grocers — operate profitably by disciplining themselves to high-value, fast-turnover crops near dense markets. The shakeout is exactly what a young, capital-intensive industry looks like as it sheds the hype and converges on the business model that actually works.",
      crux: {
        id: "unit-economics-at-scale",
        title: "The Sustained Profitability Test",
        description:
          "Whether vertical-farming operators can achieve durable, positive unit economics at commercial scale — covering energy, labor, capital, and overhead from produce revenue — for a meaningful crop range, or whether the model is permanently confined to a money-losing or razor-thin premium niche. If a cohort of post-shakeout operators sustains profitability across multiple years and crops, the bankruptcies were a financing shakeout. If even the disciplined survivors cannot consistently turn an operating profit without subsidy, the model is structurally unviable beyond luxury produce.",
        methodology:
          "Assemble audited financials and operating data from surviving and newly-formed vertical-farm operators over multiple years. Track gross margin and operating margin by crop, the share of revenue consumed by energy and labor, capital cost per kg of capacity, and the fraction of operators that are EBITDA-positive without one-time financing. Compare against high-tech greenhouse benchmarks. Distinguish firms that failed on financing/scaling (refinancing gaps, overbuild) from those that failed on irreducible operating losses, to separate a capital-cycle shakeout from a structural-economics verdict.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-600K (Financial and operations analysis requiring private company data and industry surveys over several years)",
        falsification: {
          supporter_flip:
            "If a multi-year study of post-shakeout operators showed that even the disciplined survivors cannot reach sustained operating profitability without subsidy — that the failures were driven by irreducible operating losses rather than refinancing gaps — the 'normal shakeout' narrative would collapse into 'structurally unviable.'",
          skeptic_flip:
            "A skeptic reading the bankruptcies as a final verdict should weigh that most failures were ZIRP-era overbuild and refinancing failures, that AeroFarms and Plenty emerged from Chapter 11 still operating, and that disciplined operators focused on premium greens and berries near cities can and do run profitably.",
          common_ground:
            "Both sides agree the 2023-2025 wave of failures was severe and real, that the model only works for high-value fast-turnover crops, and that energy and capital are the binding cost constraints.",
          live_disagreement:
            "Whether the failures reflect a temporary capital-cycle shakeout that leaner survivors will outlast, or an irreducible unit-economics problem that confines vertical farming to an unprofitable or razor-thin niche — answerable only by multi-year audited operating data from the survivors.",
        },
      },
      evidence: [
        {
          id: "appharvest-bankruptcy",
          title:
            "AppHarvest Filed Chapter 11 and Liquidated in 2023 on Low Yields and High Costs",
          description:
            "AppHarvest, the high-profile Kentucky controlled-environment company that built a 60-acre tomato greenhouse and went public via SPAC, filed Chapter 11 in the Southern District of Texas on July 23, 2023, and pursued a liquidating plan that sold its four facilities at auction. Management attributed the liquidity crisis to lower-than-expected crop yields, higher-than-expected operating costs, declining equity markets, and creditor pressure. The plan of liquidation was confirmed under 60 days later.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "U.S. Bankruptcy Court filings; Davis Polk restructuring summary; Greenhouse Grower",
          sourceUrl:
            "https://www.davispolk.com/experience/appharvest-chapter-11-filing-and-restructuring-support-agreement",
          reasoning:
            "Court filings and a major restructuring law firm's own record make the facts undisputed. The stated reasons — yields and operating costs — go directly to the unit-economics question. Slightly less directly about pure vertical farming because AppHarvest used large greenhouses rather than stacked indoor towers, but it is a central case in the CEA failure wave.",
        },
        {
          id: "bowery-shutdown",
          title:
            "Bowery Farming Ceased All Operations in Late 2024 After Raising Over $700M",
          description:
            "Bowery Farming, once valued at about $2.3 billion and backed by investors including Natalie Portman and Justin Timberlake, announced in November 2024 that it was ceasing all operations, shuttering farms in New Jersey, Maryland, and Pennsylvania and laying off 187 workers. The company had raised more than $700 million in venture capital and taken on $150 million in debt from KKR in 2022, but could not secure a buyer and entered an assignment for the benefit of creditors. Reporting also linked operational woes to a crop-destroying pathogen at some facilities.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "TechCrunch; Axios; Agriculture Dive; PitchBook",
          sourceUrl:
            "https://techcrunch.com/2024/11/04/bowery-farming-is-ceasing-operations/",
          reasoning:
            "Widely and independently reported by multiple business outlets with consistent figures. Bowery was a pure vertical-farming operator, so its failure is highly direct to the claim. The pathogen detail also illustrates that 'controlled environment' does not mean immune to biological risk.",
        },
        {
          id: "plenty-bankruptcy-and-pivot",
          title:
            "Plenty Filed Chapter 11 in 2025 After ~$1B Raised, Then Emerged Refocused on Strawberries",
          description:
            "Plenty Unlimited, one of the best-capitalized vertical-farming companies ever (backed by roughly $940 million including SoftBank), filed Chapter 11 in the Southern District of Texas in March 2025 with a prepackaged plan and $20.7 million in debtor-in-possession financing. Its prepackaged plan was confirmed about 53 days after filing, and it emerged from bankruptcy on May 29, 2025 — roughly two months later — with exit financing, deliberately narrowing its focus to a premium strawberry farm in Richmond, Virginia rather than commodity leafy greens. This pivot exemplifies the industry's retreat from feeding-the-world ambitions toward defensible high-value niches.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "TechCrunch; Produce Blue Book; Law360; Plenty company statements",
          sourceUrl:
            "https://techcrunch.com/2025/03/24/vertical-farming-company-plenty-files-for-bankruptcy-after-raising-nearly-1b/",
          reasoning:
            "Court records and reporting are consistent on funding, dates, and the strawberry pivot. This evidence is double-edged: the bankruptcy supports the skeptic, but the rapid emergence and strategic refocus support the proponent's 'shakeout, not death' reading — which is why it sits as a nuanced 'against' that the rebuttal can partly reclaim.",
        },
        {
          id: "aerofarms-restructuring-survival",
          title:
            "AeroFarms Filed Chapter 11 in 2023 But Emerged Funded and Still Operating",
          description:
            "AeroFarms, long the flagship of the US vertical-farming industry, filed Chapter 11 in Delaware in June 2023 with $10 million in debtor-in-possession financing, citing 'significant industry and capital market headwinds.' Rather than liquidate, it restructured through an asset sale to a group of existing investors and emerged later in 2023 fully funded with new leadership, continuing to produce packaged microgreens. The outcome shows that even a high-profile bankruptcy in this sector can be a recapitalization rather than an exit.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Food Dive; Agriculture Dive; court filings",
          sourceUrl:
            "https://www.agriculturedive.com/news/aerofarms-emerges-from-bankruptcy-fully-funded-and-with-a-new-ceo/694103/",
          reasoning:
            "Independently reported and supported by court records. Supports the proponent argument that Chapter 11 is a restructuring tool and that a disciplined, niche-focused operator can survive the shakeout. Directness is moderate because survival in a narrow microgreens niche does not by itself prove broad scalability.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Feeding the World vs a Premium Niche
    // =========================================================================
    {
      id: "feeding-world-vs-niche",
      title: "Feeding the World vs a Premium Niche",
      short_summary:
        "Vertical farming is sometimes pitched as a solution to global food security and climate-resilient agriculture. But the crops it can grow economically — leafy greens, herbs, microgreens, some berries — supply almost no calories, while the cereals and staples that feed humanity are physically and economically a poor fit for stacked indoor production. The debate is whether vertical farming is a transformative food-system technology or a valuable but bounded specialty within fresh produce.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Vertical farming cannot feed the world, and the math is not close. The crops that are profitable indoors — leafy greens, herbs, microgreens — are, as Hannah Ritchie of Our World in Data puts it, essentially 'mildly-flavoured water': minimal calories and modest micronutrients. The staples that actually feed humanity (wheat, rice, maize, potatoes) are the worst possible fit: cereal plants are tall, so you cannot stack many layers, and the energy cost is absurd. Ritchie notes lighting alone would cost roughly 100 times the market price of wheat, and the Milo lab found vertical farming runs one to two orders of magnitude more expensive than the ~$0.1-1/kg farm-gate price of cereals. So even in a best case, vertical farming addresses a sliver of the fresh-produce aisle, not food security. Framing it as the 'future of food' confuses a premium garnish business with feeding eight billion people.",
      proponent_rebuttal:
        "Demanding that vertical farming grow wheat is a strawman — no serious proponent claims it will. The honest claim is narrower and still significant: vertical farming can take over a meaningful share of fresh, perishable, high-value, water-intensive produce (salads, herbs, leafy greens, berries, seedlings and transplants) and grow it locally, pesticide-free, year-round, and weather-proof. That matters because field production of those exact crops is fragile and resource-hungry: lettuce and berries are water-intensive, vulnerable to drought and heat, dependent on long cold chains, and increasingly disrupted by climate volatility. Relocating that slice of agriculture indoors frees scarce water and arable land for the staple crops that genuinely need open fields, and shortens supply chains for the most perishable foods. It also serves places where field farming barely works — deserts, dense cities, and harsh climates. 'Not feeding the world with grain' is fully compatible with 'transforming how a valuable and growing category of produce is grown.'",
      crux: {
        id: "addressable-share-of-food-system",
        title: "The Addressable-Share Test",
        description:
          "Whether vertical farming's economically viable crop range can grow to a meaningful share of any major food category — and whether displacing field production of water-intensive perishables yields a net resource and resilience benefit — or whether it remains a premium garnish business with negligible food-system impact. If indoor production can profitably capture a large fraction of, say, fresh leafy greens and soft fruit in water-stressed or import-dependent regions, the 'transformative for a category' claim holds. If it stays confined to luxury SKUs, the 'future of food' framing is marketing.",
        methodology:
          "Define the realistic economically-viable crop set for vertical farming (constrained by plant height, growth rate, value density, and energy intensity). For each crop, model the addressable market share under plausible energy prices, comparing all-in indoor cost to field and greenhouse alternatives in target regions (e.g., desert, high-import, water-stressed). Run a regional resource-balance analysis: water and arable land freed by moving perishables indoors, net of the electricity (and its land/carbon footprint) consumed. Determine whether net resource and resilience gains are positive and the captured market share is non-trivial.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$250K-700K (Crop-by-crop market and regional resource-balance modeling with agronomic and energy data)",
        falsification: {
          supporter_flip:
            "If crop-by-crop modeling showed that even fresh leafy greens and soft fruit cannot be profitably captured at non-trivial market share outside luxury SKUs, and that the electricity footprint of doing so erases the water/land savings, then the 'transformative for a produce category' claim would shrink to 'premium garnish business.'",
          skeptic_flip:
            "A skeptic who dismisses it as a garnish business should weigh that lettuce and berries are genuinely water-intensive and climate-fragile in the field, that moving them indoors can free scarce water and arable land for staples, and that import-dependent or desert regions may value local year-round supply enough to make a meaningful share viable.",
          common_ground:
            "Both sides agree vertical farming cannot economically produce the cereals and staples that supply most human calories, and that its viable range is high-value, fast-growing, value-dense crops.",
          live_disagreement:
            "Whether that viable range can scale to a meaningful, resource-positive share of fresh-produce categories in target regions, or remains a negligible premium niche — answerable only by crop-by-crop market and regional resource-balance modeling.",
        },
      },
      evidence: [
        {
          id: "cereals-cost-gap",
          title:
            "Vertical Farming Is 1-2 Orders of Magnitude Too Expensive for Cereals",
          description:
            "The Milo lab analysis in Plant Physiology (2025) calculated that the electricity cost alone for vertical farming runs about $10/kg of dry plant matter, against farm-gate cereal prices generally under $1/kg and sometimes as low as $0.1/kg worldwide — making indoor production one to two orders of magnitude too expensive for staple grains. Hannah Ritchie similarly notes that lighting alone would cost roughly 100 times the market price of wheat. Cereal crops are also tall, which limits how many growing layers can be stacked, compounding the economic disadvantage.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Lovat, Noor & Milo, Plant Physiology (2025); Hannah Ritchie, Our World in Data",
          sourceUrl: "https://academic.oup.com/plphys/article/198/3/kiaf056/8104144",
          reasoning:
            "Two independent expert sources (a Weizmann bioenergetics lab and a leading data-driven food researcher) converge on the same order-of-magnitude conclusion. Directly establishes that vertical farming cannot address staple-calorie food security, which is the core of the skeptic pillar.",
        },
        {
          id: "leafy-greens-low-calorie",
          title:
            "Profitable Vertical Crops Supply Almost No Calories",
          description:
            "The crops that are economically viable indoors — leafy greens, herbs, and microgreens — are nutrient-light and calorie-poor. Hannah Ritchie characterizes lettuce as essentially 'mildly-flavoured water,' with minimal calories and few micronutrients, and estimates that growing all US lettuce vertically would consume around 42 TWh of electricity (about 1% of US generation) for a crop that contributes negligibly to caloric intake. This underscores that even full vertical-farming penetration of its best crops would not move the needle on global food security in calorie terms.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Hannah Ritchie, Our World in Data / Sustainability by Numbers",
          sourceUrl: "https://hannahritchie.substack.com/p/vertical-farming",
          reasoning:
            "Ritchie is a respected, transparent data scientist whose estimates are clearly sourced, though this specific piece is an essay rather than a peer-reviewed paper, lowering replicability. The point is direct and not seriously contested: the viable crops are calorie-trivial, which bounds the food-security claim.",
        },
        {
          id: "high-value-crop-economics",
          title:
            "Indoor Farms Are Profitable Precisely on High-Value, Fast-Turnover Crops",
          description:
            "Industry and academic analyses consistently find that vertical farming can be profitable, but only for high-value, quick-cycling, value-dense crops — herbs, microgreens, premium salads, and increasingly strawberries — sold to restaurants, specialty grocers, and institutional buyers that prize consistent, year-round, local, pesticide-free supply. A comparative Quebec simulation (Eaves & Eaves, Canadian Journal of Agricultural Economics, 2018) found a vertical farm achieving gross profits comparable to or slightly above a greenhouse for lettuce, with profitability conditional on cheap electricity and high energy efficiency; a 2025 review in the Journal of Horticultural Science & Biotechnology reaches the same conclusion that economic viability hinges on crop value-density and energy cost. This is the proponent's actual, defensible business model.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Eaves & Eaves, Canadian Journal of Agricultural Economics (2018); Stiles et al., Journal of Horticultural Science & Biotechnology (2025)",
          sourceUrl:
            "https://www.tandfonline.com/doi/full/10.1080/14620316.2025.2513702",
          reasoning:
            "Supports the proponent's narrowed, honest claim that the model works within a niche. Reliability is moderate because profitability findings are sensitive to local electricity prices and individual operator data, and some sources are industry-aligned. Directly relevant to defining the viable scope.",
        },
        {
          id: "water-land-savings-for-perishables",
          title:
            "Moving Water-Intensive Perishables Indoors Saves Water and Land",
          description:
            "Vertical farming's headline resource advantages apply most strongly to exactly the perishable, water-intensive crops it can grow economically. Closed-loop recirculation cuts water use by up to ~90-98% versus field irrigation (the World Economic Forum cites up to 98%; the Surrey study measured about 8x lower for lettuce), and the ~20-30x ground-yield advantage means far less arable land per kg. Relocating salads and berries indoors can, in principle, free scarce water and farmland for the staple crops that must be grown in open fields.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "World Economic Forum; Gargaro et al., Food and Energy Security (2025)",
          sourceUrl:
            "https://www.weforum.org/stories/2023/06/how-vertical-farming-can-save-water-and-support-food-security/",
          reasoning:
            "The water and land savings are well documented (the Surrey 8x water figure is peer-reviewed; the WEF 98% figure is a crop-dependent upper bound). Directness to the 'transformative for a category' claim is moderate, because the resource benefit must be netted against the electricity footprint — which is precisely the live disagreement.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "A Comparative LCA of Field Grown Lettuce Versus Vertically Farmed Lettuce — Gargaro et al., Food and Energy Security (2025), University of Surrey",
      url: "https://onlinelibrary.wiley.com/doi/full/10.1002/fes3.70117",
    },
    {
      title:
        "Vertical Farming Limitations and Potential Demonstrated by Back-of-the-Envelope Calculations — Lovat, Noor & Milo, Plant Physiology (2025)",
      url: "https://academic.oup.com/plphys/article/198/3/kiaf056/8104144",
    },
    {
      title:
        "Vertical Farming: A Local Solution for Greens, But Not Feeding the World Any Time Soon — Hannah Ritchie, Our World in Data",
      url: "https://hannahritchie.substack.com/p/vertical-farming",
    },
    {
      title:
        "Vertical Farming Can Save Water and Support Food Security — World Economic Forum (2023)",
      url: "https://www.weforum.org/stories/2023/06/how-vertical-farming-can-save-water-and-support-food-security/",
    },
    {
      title:
        "Vertical Farming Company Plenty Files for Bankruptcy After Raising Nearly $1B — TechCrunch (2025)",
      url: "https://techcrunch.com/2025/03/24/vertical-farming-company-plenty-files-for-bankruptcy-after-raising-nearly-1b/",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Can cheaper renewables and better LEDs ever beat the free energy of sunlight?",
      content:
        "Vertical farms slash water use by up to ~90-98% and grow 20-30x more per square meter than fields, but they replace free sunlight with electricity-hungry LEDs — making energy the dominant cost and, on a fossil-heavy grid, often a larger carbon footprint than field farming (about 4.7 kg CO2/kg for grid-powered vertical lettuce versus 0.6 kg for field, per the University of Surrey). Switching to renewable power cut that to ~0.93 kg/kg in the same study, and LED efficiency keeps improving. So is the ~1-2% electricity-to-biomass conversion efficiency a soft engineering limit that cheap clean power can overcome, or a near-hard physical ceiling?",
    },
    {
      id: "q2",
      title:
        "Was the 2023-2025 bankruptcy wave a verdict or a shakeout?",
      content:
        "The best-funded names — AppHarvest, AeroFarms, Bowery, Plenty — all collapsed or filed for bankruptcy between 2023 and 2025 despite raising hundreds of millions to nearly a billion dollars each, with roughly fourteen indoor-farming bankruptcies in 2025 alone. Skeptics see the market delivering its verdict on broken unit economics. Proponents note these were largely zero-interest-rate-era overbuild and refinancing failures, that AeroFarms and Plenty emerged from Chapter 11 still operating, and that disciplined operators run profitably on premium crops. Is this a structural failure or the normal shakeout of a young, capital-intensive industry?",
    },
    {
      id: "q3",
      title:
        "Is vertical farming the future of food, or a premium produce niche?",
      content:
        "Vertical farming is sometimes sold as a fix for global food security, but the crops it can grow economically — leafy greens, herbs, microgreens, some berries — supply almost no calories, while staples like wheat and rice are physically and economically a poor fit (lighting alone would cost roughly 100x the price of wheat). Proponents counter that no serious advocate claims it will grow grain; the real claim is that it can take over a meaningful share of water-intensive, climate-fragile fresh produce locally and year-round, freeing water and land for staples. Is it transformative for a valuable produce category, or a bounded luxury niche?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
