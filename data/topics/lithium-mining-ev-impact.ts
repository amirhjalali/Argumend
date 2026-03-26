import type { Topic } from "@/lib/schemas/topic";

export const lithiumMiningEvImpactData = {
  id: "lithium-mining-ev-impact",
  title: "Lithium Mining & EV Environmental Impact",
  meta_claim:
    "Electric vehicles are significantly better for the environment than gas cars when mining impacts are included",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Lifecycle Emissions Comparison
    // =========================================================================
    {
      id: "lifecycle-emissions-comparison",
      title: "Lifecycle Emissions Comparison",
      short_summary:
        "Multiple comprehensive lifecycle analyses show that EVs produce fewer total greenhouse gas emissions than ICE vehicles over their lifetimes, but the margin varies significantly based on grid carbon intensity, vehicle size, battery chemistry, and assumed driving distances. The manufacturing phase produces 30-70% more emissions for EVs, creating a 'carbon debt' that must be repaid through cleaner operation.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "EV proponents cherry-pick favorable assumptions to inflate environmental benefits. Manufacturing an EV battery pack produces 150-200 kg CO2 per kWh of capacity — meaning a 75 kWh battery generates 11-15 tonnes of CO2 before the car moves an inch. In coal-heavy grids like Poland, India, and parts of the US Midwest, charging an EV can produce more lifecycle emissions than a modern hybrid. The GREET model's default assumptions use optimistic recycling rates and future grid projections that may never materialize. When you include the full mining footprint — not just CO2 but water depletion, habitat destruction, toxic tailings — the 'clean car' narrative is misleading at best.",
      proponent_rebuttal:
        "The Argonne National Lab GREET model — the gold standard for transportation lifecycle analysis — consistently shows EVs producing 50-70% fewer lifecycle greenhouse gas emissions than comparable ICE vehicles on the average US grid. The ICCT's 2021 comprehensive analysis across the US, EU, China, and India confirmed this finding: even in coal-heavy grids, EVs are cleaner over their lifetime because electric drivetrains are 3-4x more energy-efficient than combustion engines. As grids decarbonize, the EV advantage grows — a car purchased today will charge from an increasingly clean grid over its 15-20 year life. Manufacturing emissions are a one-time cost; tailpipe emissions accumulate every mile for the vehicle's entire life. The IEA projects the average EV in 2030 will produce 75% fewer lifecycle emissions than an ICE vehicle.",
      crux: {
        id: "manufacturing-offset-lifetime",
        title: "The Manufacturing Carbon Debt Repayment Test",
        description:
          "If EV manufacturing emissions are offset by operational savings within a typical vehicle lifetime (150,000-200,000 miles / 12-15 years), then EVs deliver genuine climate benefits despite higher upfront emissions. If the breakeven point exceeds typical ownership in many markets, the climate case weakens significantly.",
        methodology:
          "Run the Argonne GREET model and the European Commission's JEC Well-to-Wheels study in parallel using 2024 grid data for the 20 largest auto markets. For each market, calculate the breakeven mileage at which an EV (sedan, SUV, and pickup classes) reaches lifecycle emissions parity with an equivalent ICE vehicle. Include sensitivity analysis for battery size (40-100 kWh), grid carbon intensity (current and 2030 projected), and three recycling scenarios (0%, 50%, 95% material recovery). Compare results across both models to assess robustness.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$50K-150K (Modeling expertise plus license fees; underlying data is publicly available)",
      },
      evidence: [
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
          id: "icct-global-lifecycle",
          title: "ICCT Global Analysis: EVs Cleaner in All Major Markets Including Coal-Heavy Grids",
          description:
            "The International Council on Clean Transportation's 2021 lifecycle analysis — covering the US, EU, China, and India — found that battery electric vehicles registered in 2021 produce 66-69% lower lifecycle GHG emissions than ICE vehicles in Europe, 60-68% lower in the US, 37-45% lower in China, and 19-34% lower in India. Even in India, with one of the world's most carbon-intensive grids, EVs were cleaner over their lifetime. The study accounted for real-world electricity mixes, upstream fuel production, vehicle manufacturing, battery production, and maintenance. For vehicles registered in 2030, the gap widens further as grids decarbonize.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "International Council on Clean Transportation",
          sourceUrl: "https://theicct.org/publication/a-global-comparison-of-the-life-cycle-greenhouse-gas-emissions-of-combustion-engine-and-electric-passenger-cars/",
          reasoning:
            "ICCT is an independent nonprofit research organization that provides technical analysis to environmental regulators worldwide. The study is peer-reviewed, covers multiple markets, and directly addresses the claim that coal-heavy grids negate EV benefits. High independence — ICCT receives no industry funding and has challenged both auto and oil industry claims.",
        },
        {
          id: "battery-manufacturing-carbon-debt",
          title: "Battery Manufacturing Produces 150-200 kg CO2/kWh — A Significant Carbon Debt",
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
    // PILLAR 2: Mining Environmental & Human Costs
    // =========================================================================
    {
      id: "mining-environmental-human-costs",
      title: "Mining Environmental & Human Costs",
      short_summary:
        "EV battery production depends on lithium, cobalt, nickel, and manganese extraction — each with significant environmental and human rights concerns. Lithium brine extraction in South America depletes aquifers in fragile desert ecosystems. Cobalt mining in the DRC involves documented child labor and toxic exposure. Nickel processing in Indonesia destroys rainforest and dumps acid tailings. The question is whether these costs are intrinsic to the technology or solvable through better practices and alternative chemistries.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The hidden costs of EV supply chains are staggering. Lithium extraction in Chile's Atacama Desert consumes 21 million liters of water per day in one of the driest places on Earth, devastating indigenous Atacameno communities and collapsing fragile ecosystems. In the DRC, Amnesty International and UNICEF have documented children as young as 7 mining cobalt in artisanal mines — cobalt that ends up in Tesla, BMW, and VW batteries. Indonesia's nickel boom has destroyed over 25,000 hectares of tropical rainforest for laterite nickel mines, with acid mine drainage poisoning fisheries that 30,000 coastal villagers depend on. Rare earth processing in China has created toxic wastelands around Baotou, Inner Mongolia. We are not eliminating environmental destruction by switching to EVs — we are merely relocating it from oil fields to lithium fields, from refineries to smelters, from the Global North's air to the Global South's water and soil.",
      proponent_rebuttal:
        "Mining impacts are real but must be compared honestly against the alternative: the oil and gas industry. Petroleum extraction has caused over 10,000 oil spills in the Niger Delta alone, devastating 30 million people's livelihoods. The Deepwater Horizon spill released 210 million gallons of oil into the Gulf of Mexico. Fracking has contaminated groundwater across the US. Refineries are disproportionately located in communities of color, causing elevated cancer rates. The mining footprint per unit of energy delivered is far smaller for EV minerals than for fossil fuels because batteries are recyclable and reusable while oil is burned once. LFP (lithium iron phosphate) batteries — now 40% of the global market — eliminate cobalt entirely. Sodium-ion batteries eliminate lithium. The mining industry is rapidly improving: dry lithium extraction reduces water use by 90%, and responsible sourcing certifications (IRMA, RMI) are being adopted by major automakers. The trajectory is toward cleaner mining; the trajectory of oil extraction is toward dirtier, harder-to-reach reserves.",
      crux: {
        id: "mining-externalities-reduction",
        title: "The Mining Externality Trajectory Assessment",
        description:
          "If mining externalities (water depletion, habitat destruction, human rights abuses) can be reduced to acceptable levels through technology improvements, alternative battery chemistries, and enforceable regulation within the next decade, the environmental case for EVs strengthens considerably. If these externalities are structurally embedded in the supply chain and resistant to reform, EVs represent a problematic tradeoff rather than a clear improvement.",
        methodology:
          "Conduct a comparative externality assessment across three time horizons (2024, 2030, 2035) evaluating: (1) water consumption per GWh of battery capacity for brine extraction, hard rock mining, and direct lithium extraction technologies; (2) hectares of habitat disturbed per GWh for nickel laterite vs. sulfide deposits; (3) documented child labor and unsafe working conditions in cobalt supply chains before and after due diligence regulations (EU Battery Regulation, US Uyghur Forced Labor Prevention Act); (4) adoption rates of cobalt-free (LFP) and lithium-free (sodium-ion) chemistries. Compare these trajectories against equivalent externality trends for oil and gas (deepwater drilling, tar sands, fracking expansion).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Multi-country field research, supply chain auditing, and satellite imagery analysis)",
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
          id: "drc-cobalt-child-labor",
          title: "Amnesty International: Children Mining Cobalt for EV Batteries in DRC",
          description:
            "Amnesty International's landmark 2016 report 'This Is What We Die For' and its 2023 follow-up documented children as young as 7 working in artisanal cobalt mines in the DRC, which produces 74% of global cobalt supply. An estimated 40,000 children work in DRC cobalt mines according to UNICEF. Workers face cave-in risks, toxic dust exposure (cobalt is a Group 2B carcinogen), and chronic respiratory disease. Artisanal and small-scale mining (ASM) produces 15-30% of DRC cobalt and is notoriously difficult to trace through supply chains. Despite due diligence pledges from major automakers, a 2023 Global Witness investigation found continued supply chain gaps, with cobalt from ASM sources entering the formal supply chain through intermediary traders.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "Amnesty International; UNICEF; Global Witness",
          sourceUrl: "https://www.amnesty.org/en/documents/afr62/3183/2016/en/",
          reasoning:
            "Amnesty International is a Nobel Peace Prize-winning human rights organization with rigorous investigative standards. UNICEF's child labor estimates are authoritative. The evidence directly links EV supply chains to human rights abuses. Replicability is lower because ASM operations are informal and dynamic, making monitoring difficult. Proponents note that LFP batteries (cobalt-free) now represent 40% of the market, reducing this concern over time.",
        },
        {
          id: "indonesia-nickel-rainforest",
          title: "Indonesian Nickel Mining Has Destroyed 25,000+ Hectares of Tropical Rainforest",
          description:
            "Indonesia — now the world's largest nickel producer, supplying 48% of global output — has cleared over 25,000 hectares of tropical rainforest for laterite nickel mines on Sulawesi, Halmahera, and other islands since 2015. A 2023 Climate Rights International report documented acid mine drainage and smelter waste poisoning coastal waters, devastating coral reefs and fisheries that 30,000 coastal villagers depend on. China-funded nickel processing plants in Morowali Industrial Park discharge sulfur dioxide and particulate matter above WHO limits. Three workers have died in smelter explosions since 2023. The rapid expansion is driven almost entirely by EV battery demand — Indonesia's nickel ore exports increased 400% between 2018 and 2023.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Climate Rights International; Mighty Earth; Indonesian Forum for Environment (WALHI)",
          sourceUrl: "https://www.climaterightsintl.org/nickel-unearthed",
          reasoning:
            "Multiple independent organizations corroborate the findings. Satellite imagery confirms deforestation extent. The direct causal link between EV battery demand and Indonesian nickel expansion is well-established. Replicability is moderate because conditions vary across hundreds of mining concessions. This is a strong point for the 'against' side but applies specifically to laterite nickel; sulfide deposits (Canada, Australia) have smaller footprints.",
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
            "A comparative analysis requires examining petroleum's footprint: over 10,000 oil spills in the Niger Delta since 1958 have devastated 30 million people's livelihoods (UNEP). The Deepwater Horizon spill released 210 million gallons into the Gulf of Mexico, killing 11 workers and causing $65 billion in damages. Oil refineries are disproportionately located in communities of color — 'Cancer Alley' in Louisiana has cancer rates 50x the national average. An ICE car burning 12,000 gallons of gasoline over its lifetime requires extracting and refining roughly 18,000 gallons of crude oil. Global fossil fuel subsidies reached $7 trillion in 2022 according to the IMF. The oil industry's externalities are larger in scale, more geographically dispersed, and more difficult to mitigate than mining externalities.",
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
      ],
    },

    // =========================================================================
    // PILLAR 3: Scalability & Alternatives
    // =========================================================================
    {
      id: "scalability-alternatives",
      title: "Scalability & Alternatives",
      short_summary:
        "Global EV sales must grow from 14 million in 2023 to 40+ million by 2030 to meet climate targets. This requires a 3-4x increase in lithium production, a 2-3x increase in nickel, and massive battery manufacturing expansion. Whether this scaling can occur without creating new resource dependencies, supply chain bottlenecks, or geopolitical vulnerabilities is a central unresolved question.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The math does not work for a global EV transition on current technology. The IEA estimates that meeting net-zero targets requires 42x more lithium and 21x more cobalt by 2040 compared to 2020 levels. Current identified lithium resources (98 million tonnes according to USGS) may be sufficient in aggregate, but mining capacity cannot scale fast enough — new lithium mines take 7-10 years from discovery to production. China controls 77% of global battery cell manufacturing, 60% of lithium refining, and 73% of cobalt refining, creating a geopolitical dependency that mirrors or exceeds oil dependency on the Middle East. Sodium-ion batteries exist but have 30-40% lower energy density and are not yet cost-competitive for vehicles. Solid-state batteries have been 'five years away' for fifteen years. Recycling recovers only 5% of lithium-ion batteries globally. We are building a green energy transition on a foundation of resource constraints and geopolitical risk.",
      proponent_rebuttal:
        "Resource scarcity fears have been repeatedly overstated. USGS estimates of identified lithium resources have grown from 13 million tonnes in 2010 to 98 million tonnes in 2024 as exploration expanded. The IEA's 2024 Global EV Outlook found that announced lithium mining projects, if completed on schedule, would meet 75-80% of 2030 demand. Direct lithium extraction (DLE) technology — which can extract lithium from geothermal brines, oilfield wastewater, and seawater — could unlock orders of magnitude more supply. Sodium-ion batteries (no lithium, no cobalt, no nickel) are entering mass production: CATL began deliveries in 2023 and BYD's Seagull uses sodium-ion cells for sub-$10,000 EVs. Battery recycling is nascent but scaling rapidly — Redwood Materials, Li-Cycle, and others recover 95%+ of critical minerals from spent packs. China's supply chain dominance is real but declining as the US (via IRA), EU (via Critical Raw Materials Act), and others invest billions in domestic capacity. Tesla's 4680 cell reduces cobalt by 95% and nickel by 50%. The transition is challenging but the technology pipeline is robust.",
      crux: {
        id: "supply-scaling-feasibility",
        title: "The Critical Mineral Supply-Demand Feasibility Test",
        description:
          "Whether current battery technology can scale to replace ICE vehicles without creating new resource dependencies hinges on three testable questions: (1) Can lithium mining and refining capacity triple by 2030? (2) Can alternative chemistries (sodium-ion, LFP, solid-state) reduce reliance on the most constrained minerals? (3) Can Western nations build enough domestic supply chain to avoid Chinese dependency? If all three are achievable, the transition is feasible. If any fails, significant bottlenecks or dependencies will persist.",
        methodology:
          "Map all announced lithium, nickel, and cobalt mining projects globally with expected production timelines. Compare aggregate projected supply (including DLE and recycling) against demand curves from IEA, BloombergNEF, and McKinsey under three EV adoption scenarios (base, accelerated, net-zero). Separately model the market share trajectory of LFP and sodium-ion chemistries and their impact on lithium, cobalt, and nickel demand. Assess non-Chinese supply chain capacity under current investment plans (IRA, EU CRMA, Australian Critical Minerals Strategy). Identify the earliest year supply-demand balance is achieved under each scenario.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Comprehensive mineral market modeling requiring proprietary mine-level data from Benchmark Minerals, S&P Global, and USGS)",
      },
      evidence: [
        {
          id: "lithium-reserves-growing",
          title: "Global Lithium Resources Grew 7.5x Since 2010 — 98 Million Tonnes Identified",
          description:
            "USGS estimates of identified global lithium resources have grown from 13 million tonnes in 2010 to 98 million tonnes in 2024, a 7.5x increase driven by new discoveries and reclassification of deposits. Major new deposits have been identified in the US (Thacker Pass, Nevada — the largest known lithium deposit in North America), DRC (Manono — potentially the world's largest hard rock deposit), and Serbia (Jadar). At current consumption rates of approximately 130,000 tonnes per year, identified resources represent over 750 years of supply. Even at projected 2040 demand of 1-2 million tonnes per year, resources are sufficient for 50-100 years. The constraint is not geological abundance but mining and refining capacity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "US Geological Survey Mineral Commodity Summaries",
          sourceUrl: "https://pubs.usgs.gov/periodicals/mcs2024/mcs2024-lithium.pdf",
          reasoning:
            "USGS is the authoritative source for mineral resource estimates, with maximum institutional credibility and independence. The 7.5x growth in identified resources demonstrates that 'peak lithium' concerns are premature. Directness is slightly lower because resource estimates do not equal economically extractable reserves, and the constraint is capacity-building speed rather than geological availability.",
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
          id: "china-supply-chain-dominance",
          title: "China Controls 77% of Battery Manufacturing and 60%+ of Mineral Refining",
          description:
            "China dominates every stage of the EV battery supply chain: 77% of global battery cell manufacturing capacity (BNEF, 2023), 60% of lithium refining, 73% of cobalt refining, 68% of nickel refining, and 90% of anode graphite processing. Chinese companies (CATL, BYD, CALB, Gotion) control 6 of the top 10 global battery manufacturers. This concentration creates geopolitical vulnerability comparable to oil dependency — China's 2023 export controls on gallium and germanium demonstrated willingness to weaponize supply chain dominance. The US Inflation Reduction Act's sourcing requirements and the EU's Critical Raw Materials Act aim to diversify supply chains, but building alternative capacity takes 5-10 years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "BloombergNEF; IEA Global EV Outlook; Benchmark Minerals Intelligence",
          sourceUrl: "https://www.iea.org/reports/global-ev-outlook-2024",
          reasoning:
            "Market share data is well-documented by multiple independent sources. The geopolitical dependency argument is compelling — replacing oil dependency with Chinese mineral dependency is a legitimate strategic concern. Directness is slightly lower because this is a supply chain risk argument rather than an environmental impact argument, but it directly addresses whether the EV transition can proceed without creating new dependencies.",
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
        {
          id: "mine-development-timeline",
          title: "New Lithium Mines Take 7-10 Years from Discovery to Production",
          description:
            "According to S&P Global and Benchmark Minerals Intelligence, the average timeline from lithium deposit discovery to first production is 7-10 years, encompassing geological survey, feasibility study, permitting, environmental review, financing, construction, and commissioning. The Thacker Pass mine in Nevada — approved in 2021 — is not expected to reach full production until 2028-2030. Permitting alone takes 3-5 years in jurisdictions with environmental review requirements. This timeline mismatch means that supply responses to demand spikes are structurally delayed, creating price volatility and potential bottlenecks. Lithium carbonate prices swung from $8,000/tonne in early 2021 to $80,000/tonne in late 2022 to $13,000/tonne in early 2024.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "S&P Global; Benchmark Minerals Intelligence; IEA",
          sourceUrl: "https://www.spglobal.com/marketintelligence/en/news-insights/research/lithium-supply-and-demand",
          reasoning:
            "Mine development timelines are well-documented and consistent across sources. The 7-10 year lag directly addresses whether supply can scale fast enough to meet 2030 targets. Price volatility data is objective market evidence. Directness is moderate because the timeline constraint does not mean the transition is impossible, only that it faces structural delays and requires advance planning.",
        },
      ],
    },
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
      title: "Nickel Unearthed: The Human and Climate Cost of Indonesia's Nickel Industry — Climate Rights International (2023)",
      url: "https://www.climaterightsintl.org/nickel-unearthed",
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
  questions: [
    {
      id: "q1",
      title: "Are EVs truly better for the environment when the full mining footprint is included?",
      content:
        "The GREET model and ICCT analyses show EVs producing 50-70% fewer lifecycle emissions than ICE vehicles on average grids, even including battery manufacturing. But these models primarily track greenhouse gas emissions — not water depletion, habitat destruction, toxic tailings, or human rights abuses in mining communities. When all environmental and social externalities are included, not just CO2, does the EV still come out ahead? And how should we weigh different types of harm against each other?",
    },
    {
      id: "q2",
      title: "Can battery technology evolve fast enough to eliminate the most harmful supply chains?",
      content:
        "LFP batteries already eliminate cobalt, and sodium-ion eliminates lithium entirely. But LFP still requires lithium, and sodium-ion currently has lower energy density unsuitable for long-range vehicles. Solid-state batteries promise to reduce material requirements by 30-50% but remain in the lab. Can the pace of chemistry innovation outrun the scaling of demand? Or will the massive growth in EV production lock in today's problematic supply chains before alternatives mature?",
    },
    {
      id: "q3",
      title: "Is replacing oil dependency with mineral dependency a genuine improvement?",
      content:
        "China controls 77% of battery manufacturing and 60%+ of critical mineral refining. The US and EU are investing billions to diversify, but building mines and refineries takes 7-10 years. Oil dependency has shaped geopolitics for a century — are we trading one set of resource vulnerabilities for another? Or is mineral dependency fundamentally different because batteries are recyclable, minerals are distributed across more countries, and demand per vehicle is a one-time requirement rather than ongoing?",
    },
  ],
};
