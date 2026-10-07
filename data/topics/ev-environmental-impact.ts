export const evEnvironmentalImpactData = {
  id: "ev-environmental-impact",
  title: "Electric Vehicles vs. ICE Cars",
  question:
    "Are EVs significantly greener than gas cars over their full lifecycle?",
  meta_claim:
    "Electric vehicles are significantly better for the environment than internal combustion engine vehicles when considering the full lifecycle.",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Volvo's own footprint report found its electric C40 Recharge generates about 70% more greenhouse gas in production than the gas-powered XC40, then breaks even after roughly 48,000 miles on the EU28 grid mix and 68,300 on the global average. About 70% of the world's cobalt is mined in the Democratic Republic of Congo. The fight is over how fast that carbon debt is repaid where EVs are actually driven, and how much the mining harms weigh.",
    confidence: 88,
    source:
      "Volvo Cars, C40 Recharge Carbon Footprint Report (2021); Amnesty International & Afrewatch (2016)",
    sourceUrl:
      "https://www.volvocars.com/assets/volvocm/globalpages/live/6298CA92D97B4769AAA54A1D1FABF81C/volvo_carbonfootprintreport_ec40.pdf",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that an EV is more carbon-intensive to build than a comparable gas car, mainly because of its battery, and that its emissions advantage over a full lifecycle depends on the grid that charges it: smallest where coal dominates, largest where power is clean.",
    "They split over how quickly a given driver's EV repays its battery's carbon debt and how much weight the human and environmental harms of cobalt and lithium mining should carry; and over whether the grids where EVs are actually driven will decarbonize fast enough, or lock in coal-powered charging in some regions.",
  ],
  pillars: [
    {
      id: "manufacturing-battery-impact",
      title: "Manufacturing & Battery Impact",
      short_summary:
        "An EV starts its life with a larger carbon debt than a gas car. By Volvo's own accounting it takes roughly 30,000 miles on a clean grid to about 68,000 miles on the global average grid to break even.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Battery production requires lithium, nickel, and cobalt mining, with real impacts: water-intensive lithium extraction in Chile, hard-rock mining in Australia, and cobalt mining in the DRC tied to toxic waste and child labor. Building an EV emits substantially more CO2 up front than building an equivalent gas car — Volvo's own figures put battery-EV manufacturing about 70% higher. And large volumes of spent batteries are projected by 2040, so end-of-life recycling must scale far beyond today before the loop is genuinely closed.",
      proponent_rebuttal:
        "The higher manufacturing footprint is offset well within the vehicle's lifetime — at typical US mileage that is a matter of a few years of driving, and sooner on cleaner electricity. Battery recycling is scaling: Redwood Materials and Li-Cycle report recovering 95%+ of critical minerals, even if recycled material is still a small share of supply today. And the impacts of oil extraction and refining — spills, refinery emissions, and methane leaks — are large and ongoing, not a one-time manufacturing cost.",
      crux: {
        id: "lifecycle-breakeven",
        title: "Lifecycle Emissions Breakeven Point",
        question:
          "How fast does an EV make up its battery's emissions?",
        description:
          "The exact point (in miles or years of driving) at which an EV's total lifecycle emissions drop below those of an equivalent ICE vehicle, across different grid mixes and vehicle classes.",
        methodology:
          "Cradle-to-grave lifecycle assessment comparing matched EV and ICE vehicles, including mining, manufacturing, fuel/electricity production, driving, maintenance, and end-of-life recycling, parameterized by regional grid carbon intensity.",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (Comprehensive LCA with sensitivity analysis)",
        falsification: {
          supporter_flip:
            "If rigorous cradle-to-grave assessments showed the manufacturing carbon debt was large enough that, at real-world mileages and grid mixes, most EVs never broke even within their service life — or that battery-production impacts had been systematically undercounted — the lifecycle case would break.",
          skeptic_flip:
            "If new independent lifecycle assessments, testing the IEA, ICCT and Volvo estimates, kept finding the up-front battery debt repaid within tens of thousands of miles, the manufacturing penalty would look real but bounded and one-time.",
          common_ground:
            "Both sides agree an EV is more carbon-intensive to BUILD than a comparable gas car, mainly because of the battery.",
          live_disagreement:
            "How fast break-even arrives for a given driver, which depends on annual mileage and how clean the local grid is.",
        },
      },
      evidence: [
        {
          id: "iea-lifecycle-2023",
          title: "IEA: A Medium EV Has About Half the Lifecycle Emissions of an Equivalent ICE Car",
          description:
            "The International Energy Agency's Global EV Outlook 2024 reports that, on the global average grid mix, a medium-size battery electric car has roughly half the lifecycle CO2-eq emissions of an equivalent oil-fueled ICE car (~15 t CO2-eq vs ~38 t over a ~200,000 km lifetime). The savings are larger on cleaner grids and smaller on coal-heavy grids.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "International Energy Agency, Global EV Outlook 2024 — Outlook for emissions reductions",
          sourceUrl:
            "https://www.iea.org/reports/global-ev-outlook-2024/outlook-for-emissions-reductions",
          reasoning:
            "Premier international energy authority with transparent methodology. Results consistent across multiple independent analyses. Claim restated to the IEA's published ~50% global-average figure; the earlier '70% on clean grids' and '1.5-2 year breakeven' specifics were not in the IEA report and were removed.",
        },
        {
          id: "volvo-lifecycle-study",
          title: "Volvo: EV Manufacturing ~70% More Carbon-Intensive, Offset by Driving",
          description:
            "Volvo's own transparent carbon footprint report for the C40 Recharge vs. the XC40 ICE found the EV's production generates about 70% more greenhouse gas emissions. The EV then breaks even at roughly 48,000 miles charged on the EU28 grid mix and at about 68,300 miles on the global average grid — within the expected vehicle lifetime, and sooner on cleaner electricity.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 8,
            directness: 9,
          },
          source: "Volvo Cars, C40 Recharge Carbon Footprint Report (2021)",
          sourceUrl:
            "https://www.volvocars.com/assets/volvocm/globalpages/live/6298CA92D97B4769AAA54A1D1FABF81C/volvo_carbonfootprintreport_ec40.pdf",
          reasoning:
            "Manufacturer-commissioned but transparently published with full methodology. Lower independence score for industry source, but the honest reporting of higher manufacturing impact lends credibility. Breakeven mileages restated to the report's exact figures (~48,000 mi EU mix, ~68,300 mi global mix).",
        },
        {
          id: "greet-model-lifecycle",
          title: "Argonne GREET Model: EVs Produce 50-70% Fewer Lifecycle Emissions on US Grid",
          description:
            "The Greenhouse gases, Regulated Emissions, and Energy use in Technologies (GREET) model developed by Argonne National Laboratory — funded by the US Department of Energy and used by EPA and CARB for regulatory analysis — finds that a midsize BEV on the 2023 US average grid produces approximately 50-70% fewer lifecycle greenhouse gas emissions than an equivalent ICE vehicle over 173,000 miles. The model accounts for vehicle manufacturing (including battery production), fuel production and delivery, vehicle operation, and end-of-life. Battery manufacturing adds roughly 30-40% to production-phase emissions, but this is offset within 1.5-3 years of average driving.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "Argonne National Laboratory, US Department of Energy",
          sourceUrl: "https://greet.anl.gov/",
          reasoning:
            "GREET is the most widely used and peer-reviewed transportation LCA model globally, maintained by a DOE national laboratory. Its methodology is transparent, publicly available, and regularly updated. High directness because it explicitly models the full lifecycle comparison including mining and manufacturing. Independence is slightly lower because DOE has policy interests in EV adoption, though the model's open-source nature allows independent verification.",
        },
        {
          id: "battery-manufacturing-carbon-debt",
          title: "Battery Manufacturing Produces ~65-200 kg CO2/kWh (Median ~100) — A Significant Carbon Debt",
          description:
            "A 2023 meta-analysis in Nature Energy synthesizing 51 lifecycle studies found that lithium-ion battery manufacturing produces 65-200 kg CO2-equivalent per kWh of capacity, with a median of approximately 100 kg/kWh. For a 75 kWh battery pack, this translates to 7.5 tonnes of CO2 — roughly 30-50% of the total manufacturing emissions for an EV. The wide range reflects differences in battery chemistry (NMC vs LFP), energy sources used in manufacturing (Chinese factories using coal electricity vs European factories using renewables), and whether cathode active material processing is included. This carbon debt is real and must be 'repaid' through cleaner operation.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Nature Energy; IVL Swedish Environmental Research Institute",
          sourceUrl: "https://www.nature.com/articles/s41560-023-01355-z",
          reasoning:
            "The meta-analysis approach synthesizing 51 studies provides robust estimates. The wide range (65-200 kg/kWh) reflects genuine uncertainty and variation in manufacturing conditions. This evidence is important for the 'against' side because it quantifies the real environmental cost of battery manufacturing. However, it does not negate the finding that this debt is repaid during vehicle operation in most markets.",
        },
        {
          id: "battery-recycling-advances",
          title: "Battery Recyclers Report Recovering 95%+ of Critical Minerals",
          description:
            "Redwood Materials states it recovers more than 95% of the critical elements (lithium, cobalt, nickel, copper) in the batteries it processes, and Li-Cycle has reported comparable recovery rates. These are company-reported figures at still-early commercial scale; US lithium-ion recycling overall remains a small share of supply today.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 6,
            directness: 6,
          },
          source: "Redwood Materials (company statement); Li-Cycle reported recovery rates",
          sourceUrl:
            "https://www.redwoodmaterials.com/resources/how-battery-recycling-works/",
          reasoning:
            "Technology is real but at early commercial scale, and the recovery figures are self-reported by industry, so reliability and independence are lowered. An unverifiable 'DOE projects 15-20% of US demand by 2030' claim was removed; CATL was dropped as it was not the verified source.",
        },
      ],
    },
    {
      id: "grid-dependency",
      title: "Grid Dependency",
      short_summary:
        "An EV on Norway's near-100% renewable grid cuts lifecycle emissions by roughly 75-80%. On Poland's coal-heavy grid the advantage shrinks dramatically — close to break-even with a gas car.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "On the dirtiest coal-heavy grids, an EV's lifecycle advantage can shrink to near parity with an efficient hybrid — ICCT finds EVs in Poland barely beat, or roughly match, a comparable gasoline car. Unmanaged charging concentrated at evening peaks could also force costly new generation capacity. In coal-reliant places like West Virginia or Poland, an EV is, in carbon terms, largely a coal-powered car.",
      proponent_rebuttal:
        "Even on the average US grid mix, ICCT puts an EV's lifecycle emissions roughly 60-68% below a comparable gasoline car, and the average US EV is already as clean as a hypothetical 94 MPG gas car (UCS, 2024). Grids are greening fast — US coal fell from a ~48% share of generation around 2007 to about 16% by 2023. And MIT finds that delayed home charging plus workplace charging can smooth peaks and soak up midday solar, so the grid-strain worry is largely a management problem, not an inherent barrier.",
      crux: {
        id: "grid-carbon-threshold",
        title: "Grid Carbon Intensity Threshold for EV Advantage",
        question:
          "Will the grids where EVs are driven decarbonize fast enough, or lock in coal-powered charging?",
        description:
          "The grid carbon intensity (gCO2/kWh) above which an EV no longer has a lifecycle emission advantage over the best available ICE or hybrid vehicle.",
        methodology:
          "Parametric lifecycle model varying grid intensity from 0 to 1000 gCO2/kWh, comparing EVs to both average ICE and best-in-class hybrids. Include grid trajectory projections to determine when currently-dirty grids will cross the threshold.",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Modeling with published grid data)",
        falsification: {
          supporter_flip:
            "If grids stopped decarbonizing — or EV adoption concentrated in coal-heavy regions whose grids stayed dirty — so that real-world charging carbon stayed above the threshold where EVs beat efficient hybrids, the 'cleaner almost everywhere' claim would fail in those places.",
          skeptic_flip:
            "If grid data kept matching an EV on the average US grid to a car near 94 MPG, with the most efficient EV beating any gas car in all 50 states, and coal's share kept falling after its drop from about 48% to 16% in 15 years, the 'coal car' objection would weaken each year.",
          common_ground:
            "Both sides agree the EV emissions advantage depends on grid carbon intensity — smallest on coal-heavy grids, largest on clean ones.",
          live_disagreement:
            "Whether the grids where EVs are actually driven will decarbonize fast enough that the dirty-grid exception keeps shrinking, versus locking in coal-powered charging in specific regions.",
        },
      },
      evidence: [
        {
          id: "ucs-grid-analysis",
          title: "UCS: The Average EV Now Equals a ~94 MPG Gasoline Car Nationally",
          description:
            "The Union of Concerned Scientists' 2024 update finds the average US EV produces global-warming emissions equal to a hypothetical 94 MPG gasoline car, reaching about 219 MPG-equivalent in the cleanest regions (e.g., upstate New York). For 93% of the country the average EV beats the most efficient gasoline car (57 MPG), and everywhere in the US the most efficient EV beats any gasoline-only car available.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 8,
            directness: 9,
          },
          source: "Union of Concerned Scientists (Reichmuth, 2024)",
          sourceUrl:
            "https://blog.ucs.org/dave-reichmuth/driving-on-electricity-is-now-much-cleaner-than-using-a-gasoline-car/",
          reasoning:
            "Advocacy organization but with transparent, replicable methodology using EPA/eGRID power-plant data. Independence lowered for pro-EV institutional stance. Claim corrected: the prior '191 MPG' and 'cleaner in all 50 states' figures were inaccurate — the average EV beats the most efficient gas car in 93% of the country, while the most efficient EV beats any gas car everywhere.",
        },
        {
          id: "mit-grid-stress",
          title: "MIT: Unmanaged Charging Could Need ~20% More Generation — But Managed Charging Avoids It",
          description:
            "MIT Energy Initiative research found that if EV charging is left unmanaged, evening peaks could require installing upwards of 20% more power-generation capacity. Crucially, the same study concludes that delayed home charging plus workplace charging can mitigate or eliminate that need, smoothing peaks and absorbing midday solar — so the grid strain is largely a management problem, not an inherent barrier.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "MIT Energy Initiative (Trancik group)",
          sourceUrl:
            "https://energy.mit.edu/news/minimizing-electric-vehicles-impact-on-the-grid/",
          reasoning:
            "Highly credible source. Claim corrected: the prior '$75-125B / 50 million EVs / 15-20% demand' specifics are not in MIT's research and were removed. The study's actual finding is that unmanaged charging could need ~20% more capacity but managed charging largely avoids it — so this is weak as an 'EVs are bad' point. Directness lowered: it concerns grid logistics, not per-vehicle environmental impact.",
        },
        {
          id: "norway-iceland-clean-grid",
          title: "Clean Grids (Norway/Iceland) Push EV Lifecycle Savings Toward the Ceiling",
          description:
            "Norway generates about 98% of its electricity from renewables (mostly hydro) with new-car sales now overwhelmingly electric, and Iceland's grid is nearly 100% renewable. ICCT lifecycle analysis finds EVs already cut lifecycle GHG emissions by roughly two-thirds versus gasoline on average European/US grids, with the reduction approaching ~80% or more where the grid is essentially carbon-free — illustrating the upper bound of the EV advantage.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "ICCT, A Global Comparison of the Life-Cycle GHG Emissions of Combustion Engine and Electric Passenger Cars (2021); IEA on Norway's grid mix",
          sourceUrl:
            "https://theicct.org/publication/a-global-comparison-of-the-life-cycle-greenhouse-gas-emissions-of-combustion-engine-and-electric-passenger-cars/",
          reasoning:
            "Compelling clean-grid illustration anchored to ICCT's peer-reviewed lifecycle analysis (66-69% EU / 60-68% US reductions, higher on near-zero-carbon grids). Replicability limited because few countries have such clean grids. Removed the unverified 'Norway transport emissions fell 10%' and the stale '80% EV market share' point (now far higher), and corrected the loosely sourced '85%' to ICCT's supported range.",
        },
        {
          id: "doe-charging-infrastructure",
          title: "NREL/DOE: A National Network Could Need ~1.2 Million Public Charging Ports by 2030",
          description:
            "NREL's 2023 analysis for the DOE Joint Office estimates a national network could require about 1.2 million publicly accessible charging ports by 2030 (plus ~26.8 million private ports) to support about 33 million light-duty EVs on the road (a scenario in which half of new sales are electric). The current public network is far smaller, so rural charging gaps and installation pace could slow adoption.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 3,
          },
          source:
            "National Renewable Energy Laboratory, The 2030 National Charging Network (2023)",
          sourceUrl: "https://doi.org/10.2172/1988020",
          reasoning:
            "Authoritative government modeling of the infrastructure build-out needed. Directness lowered further: charger availability affects adoption speed and convenience, not per-vehicle lifecycle emissions, so it is weak as evidence on the environmental question. The specific 'only 186,000 exist as of early 2024' count was removed as it was unsourced here.",
        },
        {
          id: "coal-grid-diminished-benefit",
          title: "EVs on Coal-Heavy Grids Show Minimal or No Lifecycle Advantage Over Hybrids",
          description:
            "Research from the University of Toronto (2022) found that in regions where coal generates more than 60% of electricity — including parts of Poland, India, Indonesia, and some US states — EVs may produce comparable or even slightly higher lifecycle emissions than modern hybrid vehicles (not conventional ICE). In Poland, where coal provides ~70% of electricity, an EV produces roughly 25% fewer emissions than a conventional ICE car but only 5-10% less than a modern hybrid. This challenges the blanket claim that EVs are always the cleanest option and suggests that in the most carbon-intensive grids, plug-in hybrids or grid decarbonization should be prioritized.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "University of Toronto; Energy Policy journal",
          sourceUrl: "https://doi.org/10.1016/j.enpol.2022.112814",
          reasoning:
            "Peer-reviewed academic research with transparent methodology. The comparison to hybrids (not just conventional ICE) is more challenging for the pro-EV position. However, directness is slightly lower because few major auto markets have 60%+ coal grids, and those that do are actively decarbonizing. The finding applies to a shrinking subset of the global market.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Mining Environmental & Human Costs (folded in from the retired
    // lithium-mining-ev-impact map, 2026-10-06)
    // =========================================================================
    {
      id: "mining-environmental-human-costs",
      title: "Mining Environmental & Human Costs",
      short_summary:
        "EV battery production depends on lithium, cobalt, nickel, and manganese extraction — each with significant environmental and human rights concerns. Lithium brine extraction in South America depletes aquifers in fragile desert ecosystems. Cobalt mining in the DRC involves documented child labor and toxic exposure. Nickel processing in Indonesia destroys rainforest and dumps acid tailings. The question is whether these costs are intrinsic to the technology or solvable through better practices and alternative chemistries.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The hidden costs of EV supply chains are staggering. Lithium extraction in Chile's Atacama Desert consumes 21 million liters of water per day in one of the driest places on Earth, devastating indigenous Atacameno communities and collapsing fragile ecosystems. In the DRC, Amnesty International and UNICEF have documented children as young as 7 mining cobalt in artisanal mines — cobalt that ends up in Tesla, BMW, and VW batteries. Indonesia's nickel boom has cleared thousands of hectares of tropical forest for nickel mines, and fishers near the smelters report polluted water and shrinking catches. Rare earth processing in China has created toxic wastelands around Baotou, Inner Mongolia. We are not eliminating environmental destruction by switching to EVs — we are merely relocating it from oil fields to lithium fields, from refineries to smelters, from the Global North's air to the Global South's water and soil.",
      proponent_rebuttal:
        "Mining impacts are real but must be compared honestly against the alternative: the oil and gas industry. Petroleum extraction has caused more than 7,000 oil spills in the Niger Delta since 1958, contaminating a region of some 30 million people and devastating local fishing and farming livelihoods. The Deepwater Horizon spill released roughly 134 million gallons of oil (3.19 million barrels, the court-determined figure) into the Gulf of Mexico. Fracking has contaminated groundwater across the US. Refineries are disproportionately located in communities of color, causing elevated cancer rates. The mining footprint per unit of energy delivered is far smaller for EV minerals than for fossil fuels because batteries are recyclable and reusable while oil is burned once. LFP (lithium iron phosphate) batteries — now 40% of the global market — eliminate cobalt entirely. Sodium-ion batteries eliminate lithium. The mining industry is rapidly improving: dry lithium extraction reduces water use by 90%, and responsible sourcing certifications (IRMA, RMI) are being adopted by major automakers. The trajectory is toward cleaner mining; the trajectory of oil extraction is toward dirtier, harder-to-reach reserves.",
      crux: {
        id: "mining-externalities-reduction",
        title: "The Mining Externality Trajectory Assessment",
        question:
          "Will mining's water, land and labor harms fall fast enough to be acceptable within a decade?",
        description:
          "If mining externalities (water depletion, habitat destruction, human rights abuses) can be reduced to acceptable levels through technology improvements, alternative battery chemistries, and enforceable regulation within the next decade, the environmental case for EVs strengthens considerably. If these externalities are structurally embedded in the supply chain and resistant to reform, EVs represent a problematic tradeoff rather than a clear improvement.",
        methodology:
          "Conduct a comparative externality assessment across three time horizons (2024, 2030, 2035) evaluating: (1) water consumption per GWh of battery capacity for brine extraction, hard rock mining, and direct lithium extraction technologies; (2) hectares of habitat disturbed per GWh for nickel laterite vs. sulfide deposits; (3) documented child labor and unsafe working conditions in cobalt supply chains before and after due diligence regulations (EU Battery Regulation, US Uyghur Forced Labor Prevention Act); (4) adoption rates of cobalt-free (LFP) and lithium-free (sodium-ion) chemistries. Compare these trajectories against equivalent externality trends for oil and gas (deepwater drilling, tar sands, fracking expansion).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Multi-country field research, supply chain auditing, and satellite imagery analysis)",
        falsification: {
          supporter_flip:
            "If a comparative externality assessment showed mining harms staying flat or worsening through 2035 — water use per GWh not falling as direct lithium extraction stalls, cobalt child labor persisting despite EU and US due-diligence rules, nickel deforestation accelerating — then EVs would look like relocating environmental damage rather than reducing it, and the 'cleaner overall' case would fail on everything but tailpipe CO2.",
          skeptic_flip:
            "If LFP (about 40% of the market) and sodium-ion, which drop cobalt, nickel or lithium, kept gaining share, recycling took hold, and full comparisons counted oil's harms such as 7,000+ Niger Delta spills and Deepwater Horizon, mining harms would look smaller than the extraction they displace.",
          common_ground:
            "Both sides agree current mining causes real and serious harms (Atacama water depletion, DRC cobalt child labor, Indonesian rainforest loss) and that cleaner chemistries and extraction methods exist but are not yet universally deployed.",
          live_disagreement:
            "Whether these externalities fall fast enough through technology, alternative chemistries, and enforceable regulation to be acceptable within a decade — measurable by tracking water per GWh, hectares disturbed per GWh, documented labor abuses, and LFP/sodium-ion adoption against oil-and-gas externality trends over 2024-2035.",
        },
      },
      evidence: [
        {
          id: "lithium-triangle-water-crisis",
          title: "Lithium Brine Extraction Consumes 21M Liters/Day in Atacama Desert",
          description:
            "Lithium extraction in Chile's Salar de Atacama — part of the 'Lithium Triangle' spanning Chile, Argentina, and Bolivia, which holds 58% of global lithium resources — uses evaporation ponds that consume approximately 21 million liters of water per day. A 2023 study in Science of the Total Environment found that lithium mining has contributed to a 20-30% decline in groundwater levels in surrounding aquifers over two decades. Indigenous Atacameno communities have reported drying of pastures, reduced flamingo populations, and loss of traditional water sources. Argentina's rapidly expanding lithium operations in Jujuy and Salta provinces face similar concerns, with over 40 new projects approved since 2020.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Science of the Total Environment; FARN Argentina; OPSAL Chile",
          sourceUrl: "https://doi.org/10.1016/j.scitotenv.2023.162789",
          reasoning:
            "Peer-reviewed research combined with on-the-ground reporting from environmental organizations. The water impact is well-documented and directly relevant to the mining externality question. Replicability is slightly lower because aquifer dynamics are complex and site-specific. This evidence is strong for the 'against' side but applies primarily to brine-based extraction, not hard rock mining or direct lithium extraction.",
        },
        {
          id: "cobalt-mining-drc",
          title: "DRC Cobalt Mining: Child Labor, Toxic Waste, Ecological Destruction",
          description:
            "Roughly 70% of the world's cobalt is mined in the Democratic Republic of Congo. Amnesty International's 2016 report documented hazardous artisanal mining, water contamination, and child labour (UNICEF estimated about 40,000 children working in southern DRC mines). While cobalt content per battery is falling, the human and environmental toll of current extraction is severe.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            'Amnesty International & Afrewatch, "This Is What We Die For" (2016); UNICEF child-labour estimate',
          sourceUrl: "https://www.amnesty.org/en/documents/afr62/3183/2016/en/",
          reasoning:
            "Well-documented human rights and environmental concerns. Directness is moderate because cobalt-free battery chemistries (LFP) are rapidly gaining market share, reducing relevance over time. Note this is a mining-harm concern, not evidence that EV lifecycle emissions exceed ICE.",
        },
        {
          id: "indonesia-nickel-rainforest",
          title: "Indonesia's Nickel Boom Is Clearing Tropical Forest and Running on Coal",
          description:
            "Indonesia is the world's largest nickel producer, supplying 48% of global demand in 2022, and demand is climbing with EV batteries. A January 2024 Climate Rights International report on the Indonesia Weda Bay Industrial Park (IWIP) on Halmahera found, using geospatial analysis with UC Berkeley, that at least 5,331 hectares of tropical forest had been cut within nickel mining concessions on the island, releasing about 2.04 million metric tons of CO2e. IWIP had built at least five captive coal-fired power plants and plans twelve, which once running would burn more coal in a year than Spain or Brazil. Of 45 residents interviewed, many described polluted water, shrinking fish catches, and land taken through coercion and intimidation, sometimes with police and military involvement.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Climate Rights International, \"Nickel Unearthed: The Human and Climate Costs of Indonesia's Nickel Industry\" (January 2024)",
          sourceUrl: "https://cri.org/reports/nickel-unearthed/",
          reasoning:
            "A field investigation with satellite-based deforestation estimates is solid evidence of local harm, though it comes from an advocacy organization and covers one island and one industrial park. Replicability is moderate because conditions vary across hundreds of mining concessions. The coal-powered smelting is directly relevant to lifecycle emissions, not just to mining harm. It applies specifically to Indonesian laterite nickel; sulfide deposits (Canada, Australia) and nickel-free LFP batteries have smaller footprints.",
        },
        {
          id: "lfp-cobalt-free-batteries",
          title: "LFP Batteries Now 40% of Global Market — Eliminating Cobalt Entirely",
          description:
            "Lithium iron phosphate (LFP) batteries — which contain zero cobalt and zero nickel — reached 40% of global EV battery installations in 2023, up from 6% in 2019, driven primarily by Chinese manufacturers (CATL, BYD). Tesla's Model 3 Standard Range and all BYD models use LFP. These batteries are cheaper ($80-100/kWh vs $120-150/kWh for NMC), have longer cycle life (3,000-5,000 cycles vs 1,500-2,000), and do not require problematic cobalt or nickel supply chains. While LFP has lower energy density (160 Wh/kg vs 250 Wh/kg for NMC), ongoing improvements and cell-to-pack designs are narrowing the range gap. CATL's Shenxing LFP battery achieves 400+ miles of range.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "BloombergNEF; CnEVPost; Battery industry data",
          sourceUrl: "https://about.bnef.com/electric-vehicle-outlook/",
          reasoning:
            "Market share data is objective and verifiable from multiple industry sources. The elimination of cobalt and nickel from LFP chemistry directly addresses two of the most serious mining externalities. High replicability because production and market data is transparent. This evidence is strong for the 'for' side because it shows the technology is already shifting away from the most problematic supply chains, not merely theoretical.",
        },
        {
          id: "oil-industry-comparison",
          title: "Oil Extraction Causes Environmental Devastation at Far Greater Scale",
          description:
            "A comparative analysis requires examining petroleum's footprint: more than 7,000 oil spills in the Niger Delta since 1958 have contaminated a region of some 30 million people, devastating local fishing and farming livelihoods (UNEP). The Deepwater Horizon spill released roughly 134 million gallons (3.19 million barrels, the court-determined figure) into the Gulf of Mexico, killing 11 workers and causing $65 billion in damages. Oil refineries are disproportionately located in communities of color — 'Cancer Alley' in Louisiana has cancer rates 50x the national average. An ICE car burning 12,000 gallons of gasoline over its lifetime requires extracting and refining roughly 18,000 gallons of crude oil. Global fossil fuel subsidies reached $7 trillion in 2022 according to the IMF. The oil industry's externalities are larger in scale, more geographically dispersed, and more difficult to mitigate than mining externalities.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "UNEP; National Commission on the BP Deepwater Horizon; IMF",
          sourceUrl: "https://www.unep.org/resources/report/environmental-assessment-ogoniland",
          reasoning:
            "The comparative framing is essential — mining impacts cannot be evaluated in isolation; they must be weighed against the alternative (continued oil dependence). Sources are authoritative (UNEP, IMF). Directness is slightly lower because this is a comparative argument rather than a direct assessment of mining impacts, but the comparison is logically necessary for evaluating the meta claim.",
        },
        {
          id: "sodium-ion-mass-production",
          title: "Sodium-Ion Batteries Enter Mass Production — No Lithium, No Cobalt, No Nickel",
          description:
            "CATL, the world's largest battery manufacturer, began mass production of sodium-ion batteries in 2023 and delivered them in the Chery iCar 03 and JAC Yiwei EVs. BYD's Seagull — the world's best-selling EV in Q1 2024 — offers a sodium-ion variant priced under $10,000. Sodium-ion batteries use abundant, globally distributed materials (sodium, iron, manganese) with no lithium, cobalt, or nickel. Current energy density is 140-160 Wh/kg (vs 250 Wh/kg for NMC), suitable for city cars and energy storage but not yet for long-range vehicles. HiNa Technology and Farasis Energy project 200 Wh/kg sodium-ion cells by 2026. BloombergNEF projects sodium-ion will capture 10-20% of the global battery market by 2030.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "BloombergNEF; CATL; Battery industry reports",
          sourceUrl: "https://about.bnef.com/blog/sodium-ion-batteries/",
          reasoning:
            "Sodium-ion commercialization is no longer theoretical — products are shipping. This directly addresses the resource dependency concern because sodium is 1,000x more abundant than lithium and available on every continent. Independence is slightly lower because some data comes from manufacturer announcements. The energy density gap means sodium-ion currently complements rather than replaces lithium-ion for passenger EVs, but the trajectory is promising.",
        },
        {
          id: "recycling-rate-5-percent",
          title: "Only 5% of Lithium-Ion Batteries Are Currently Recycled Globally",
          description:
            "The International Energy Agency estimates that less than 5% of lithium-ion batteries are currently recycled globally, though this figure is expected to improve rapidly as first-generation EV batteries reach end-of-life in the late 2020s. The EU Battery Regulation (effective 2027) mandates minimum recycled content (16% cobalt, 6% lithium, 6% nickel by 2031, rising to 26%, 12%, 15% by 2036) and 95% collection rates. Companies like Redwood Materials (US), Li-Cycle (Canada), and Brunp Recycling (China, CATL subsidiary) report 95%+ recovery rates for cobalt, nickel, copper, and lithium using hydrometallurgical processes. The nascent recycling industry is scaling but remains far from circular — by 2030, only 5-8% of battery mineral demand can be met through recycling.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "International Energy Agency; EU Battery Regulation; Redwood Materials",
          sourceUrl: "https://www.iea.org/reports/global-ev-outlook-2024/trends-in-batteries",
          reasoning:
            "The current 5% recycling rate is a legitimate concern — the industry is far from circular. However, this is partly because most EV batteries have not yet reached end-of-life (EVs are young as a mass-market product). The regulatory and technological trajectory is positive, but the 'against' side is correct that recycling will not meaningfully offset mining demand before 2035. Directness is slightly lower because recycling rates are a future trajectory question rather than a current environmental impact.",
        },
      ],
    },
  ],
  // The retired lithium-mining-ev-impact map asked the same question with
  // mining counted (merged 2026-10-06); its names stay findable here.
  aliases: [
    "Lithium Mining & EV Environmental Impact",
    "Are EVs clearly greener than gas cars once mining is counted?",
    "Are electric vehicles still better for the environment once lithium mining is counted?",
  ],
  references: [
    {
      title: "GREET Model — Argonne National Laboratory, US Department of Energy",
      url: "https://greet.anl.gov/",
    },
    {
      title: "A Global Comparison of the Life-Cycle Greenhouse Gas Emissions of Combustion Engine and Electric Passenger Cars — ICCT (2021)",
      url: "https://theicct.org/publication/a-global-comparison-of-the-life-cycle-greenhouse-gas-emissions-of-combustion-engine-and-electric-passenger-cars/",
    },
    {
      title: "Global EV Outlook 2024 — International Energy Agency",
      url: "https://www.iea.org/reports/global-ev-outlook-2024",
    },
    {
      title: "This Is What We Die For: Human Rights Abuses in the DRC — Amnesty International (2016)",
      url: "https://www.amnesty.org/en/documents/afr62/3183/2016/en/",
    },
    {
      title: "Lithium Mineral Commodity Summaries 2024 — US Geological Survey",
      url: "https://pubs.usgs.gov/periodicals/mcs2024/mcs2024-lithium.pdf",
    },
    {
      title: "Environmental Assessment of Ogoniland — UN Environment Programme",
      url: "https://www.unep.org/resources/report/environmental-assessment-ogoniland",
    },
    {
      title: "Nickel Unearthed: The Human and Climate Costs of Indonesia's Nickel Industry — Climate Rights International (2024)",
      url: "https://cri.org/reports/nickel-unearthed/",
    },
    {
      title: "Electric Vehicle Outlook — BloombergNEF",
      url: "https://about.bnef.com/electric-vehicle-outlook/",
    },
    {
      title: "The Role of Critical Minerals in Clean Energy Transitions — International Energy Agency (2023)",
      url: "https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions",
    },
  ],
};
