export const evEnvironmentalImpactData = {
  id: "ev-environmental-impact",
  title: "Electric Cars vs. Gas Cars: The Whole Life",
  question:
    "Are electric cars really greener than gas cars, batteries and mines included?",
  meta_claim:
    "Electric vehicles are significantly better for the environment than internal combustion engine vehicles when considering the full lifecycle.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: ICCT's July 2025 EU lifecycle update (BEVs 73%
  // below gasoline; about 40% more to build; paid back after ~17,000 km);
  // UCS's August 2026 US update (average EV = a 100 mpg gasoline car; EPA
  // has paused its eGRID data); Ember's April 2026 review (coal below a
  // third of world power in 2025); USGS February 2026 (Congo 73% of mined
  // cobalt in 2025, export ban then quotas).
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Building an electric car emits about 40% more greenhouse gas than building a gasoline one, mostly because of the battery, the International Council on Clean Transportation estimated in July 2025. On the EU's average grid, it found, the electric car pays that back after about 17,000 km and ends with 73% lower lifetime emissions. On coal-heavy grids the payback takes longer, and the cobalt in many batteries comes from Congo, which mined about 73% of the world's supply in 2025. The fight is over how far the grid and the mines cut into that advantage, and how much the mines should weigh.",
    confidence: 88,
    source:
      "ICCT, 'Life-cycle greenhouse gas emissions from passenger cars in the European Union: A 2025 update' (Negri and Bieker, 8 July 2025); USGS Mineral Commodity Summaries 2026, Cobalt",
    sourceUrl:
      "https://theicct.org/publication/electric-cars-life-cycle-analysis-emissions-europe-jul25/",
  },
  simple_case: [
    "The answer bears on what a family buying its next car does for the climate, on whether governments keep paying people to switch, and on mining towns from Congo's copper belt to Indonesia's Halmahera island that supply the batteries.",
    "The two sides split over how many miles an electric car needs to repay its battery and whether real cars get there; whether one charged from coal still beats an efficient hybrid; and whether the harms of mining cobalt, nickel and lithium shrink fast enough to weigh less than the oil they replace.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The carbon debt
    // =========================================================================
    {
      id: "manufacturing-battery-impact",
      title: "The Carbon Debt: How Fast Does the Battery Pay Back?",
      short_summary:
        "An electric car starts life with a bigger carbon footprint than a gas car, mostly from its battery: about 40% bigger in ICCT's 2025 EU estimate, about 70% in Volvo's own figures for a large SUV. Estimates of the miles needed to repay it run from about 11,000 to more than 68,000, depending on the car, the battery and the grid.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Every electric car is born in debt. Mining and refining lithium, nickel and cobalt and making the cells takes so much energy that Argonne National Laboratory puts an EV's manufacturing emissions 30-100% above a comparable gas car's, depending on battery size. Volvo's own report found its electric C40 emitted about 70% more to build than the gasoline XC40 and broke even only after about 68,300 miles on the world's average grid, several years of typical driving. Bigger batteries mean bigger debts, and the trend is toward heavier electric SUVs and pickups. A car that is scrapped early, or driven little, may never repay it.",
      proponent_rebuttal:
        "The debt is real and small next to a lifetime of burning gasoline. ICCT's July 2025 study of cars sold in the EU found electric cars' lifecycle emissions 73% below gasoline cars': the roughly 40% extra from production is 'more than offset after about 17,000 km of use in the first one or two years.' Hybrids cut 20% and plug-in hybrids 30%. The Union of Concerned Scientists found in August 2026 that the average US electric car repays its extra manufacturing emissions in under 18,000 miles and 'still produces less than half the lifetime emissions of a comparable gasoline car.' Even Volvo's worst case breaks even well within a car's life, and every year the grids that charge the cars get cleaner.",
      crux: {
        id: "lifecycle-breakeven",
        title: "Lifecycle Emissions Breakeven Point",
        question:
          "How many miles does an EV need to repay its battery's extra emissions, and do most cars get there?",
        description:
          "The exact point (in miles or years of driving) at which an EV's total lifecycle emissions drop below those of an equivalent ICE vehicle, across different grid mixes and vehicle classes.",
        methodology:
          "Cradle-to-grave lifecycle assessment comparing matched EV and ICE vehicles, including mining, manufacturing, fuel/electricity production, driving, maintenance, and end-of-life recycling, parameterized by regional grid carbon intensity.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Lifecycle studies of matched EV and gasoline models that use measured battery-factory emissions and the actual grid where cars charge, reporting breakeven mileage by region, as the IEA and Argonne National Laboratory publish, checked against how far cars are really driven.",
        },
        cost_to_verify: "$200K (Comprehensive LCA with sensitivity analysis)",
        falsification: {
          supporter_flip:
            "If cradle-to-grave studies using measured factory emissions found breakeven distances for typical electric cars beyond what most cars are driven before scrapping, or found battery production undercounted, the lifecycle case would fail for those cars.",
          skeptic_flip:
            "If new independent studies kept finding the battery debt repaid within about 20,000 miles for typical cars, as ICCT and UCS do, and larger-battery models within their lifetime, the manufacturing penalty would look real but bounded.",
          common_ground:
            "Both sides agree building an electric car emits more than building a comparable gas car, mainly because of the battery, and that how fast driving repays the gap depends on battery size, mileage and the grid.",
          live_disagreement:
            "How long the battery debt takes to repay for real cars, from small hatchbacks to heavy electric SUVs, and whether most are driven far enough to clear it by a wide margin.",
        },
      },
      evidence: [
        {
          id: "icct-eu-2025",
          title: "ICCT 2025: EU Electric Cars Emit 73% Less Over Their Life, Repaying the Battery After About 17,000 km",
          description:
            "The International Council on Clean Transportation's July 2025 update for medium-size cars sold in the EU found battery electric cars' lifecycle emissions 73% lower than gasoline cars' (estimated at 235 g CO2e/km), and 78% lower on renewable electricity only. 'Although BEVs were estimated to have about 40% higher production emissions than ICEVs due to emissions from production of the battery, these additional emissions are more than offset after about 17,000 km of use in the first one or two years.' Hybrids came out 20% below gasoline cars and plug-in hybrids 30% below. BEV lifecycle emissions were 24% lower than in ICCT's 2021 study, reflecting a cleaner EU grid.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "ICCT, 'Life-cycle greenhouse gas emissions from passenger cars in the European Union: A 2025 update and key factors to consider' (Marta Negri and Georg Bieker, 8 July 2025)",
          sourceUrl:
            "https://theicct.org/publication/electric-cars-life-cycle-analysis-emissions-europe-jul25/",
          reasoning:
            "The most recent large, transparent lifecycle study, and it reports the production penalty the skeptics stress alongside the payback. It covers the EU's average grid, cleaner than China's or India's, and a sales-weighted medium car rather than heavy SUVs, so it bounds the typical European case, not every car everywhere.",
        },
        {
          id: "iea-lifecycle-2023",
          title: "IEA 2024: A Medium EV Has About Half the Lifecycle Emissions of a Gas Car on the World's Average Grid",
          description:
            "The International Energy Agency's Global EV Outlook 2024 reports that, on the global average grid mix, a medium-size battery electric car has roughly half the lifecycle CO2-eq emissions of an equivalent oil-fueled car (about 15 t CO2-eq against about 38 t over a roughly 200,000 km lifetime). The savings are larger on cleaner grids and smaller on coal-heavy ones.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "International Energy Agency, Global EV Outlook 2024 — Outlook for emissions reductions",
          sourceUrl:
            "https://www.iea.org/reports/global-ev-outlook-2024/outlook-for-emissions-reductions",
          reasoning:
            "A world-average figure, so it includes coal-heavy grids where most of the skeptics' cases sit. It is a modeled average for one car size; individual results vary with battery size and where the car is driven.",
        },
        {
          id: "volvo-lifecycle-study",
          title: "Volvo: Its Electric C40 Emitted About 70% More to Build and Needed 68,300 Miles to Break Even on the World Grid",
          description:
            "Volvo's own published carbon footprint report for the C40 Recharge against the gasoline XC40 found the electric model's production generates about 70% more greenhouse gas. It breaks even at roughly 48,000 miles charged on the EU28 grid mix and about 68,300 miles on the global average grid, within the expected vehicle lifetime but far later than ICCT's figure for an average EU car.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 8,
            directness: 8,
          },
          source: "Volvo Cars, C40 Recharge Carbon Footprint Report (2021)",
          sourceUrl:
            "https://www.volvocars.com/assets/volvocm/globalpages/live/6298CA92D97B4769AAA54A1D1FABF81C/volvo_carbonfootprintreport_ec40.pdf",
          reasoning:
            "A carmaker publishing an unflattering number for its own electric car lends it credibility. It is one premium crossover with a large battery, measured on 2021 grids, so it shows how much the debt grows with battery size rather than the typical case. It still breaks even within the car's life.",
        },
        {
          id: "greet-model-lifecycle",
          title: "Argonne: Building an EV Emits 30-100% More Than a Comparable Gas Car, Depending on Battery Size",
          description:
            "Carbon Brief's August 2025 review of EV myths cites the US Argonne National Laboratory's GREET lifecycle model: manufacturing-phase emissions of electric cars are 'some 30-100% higher, depending on battery size,' than those of comparable gas cars, a gap projected to narrow to 5-50% by 2030-2035 as factories and grids clean up. Carbon Brief's own estimate is that 'it takes less than two years for a typical EV to pay off the carbon debt from its battery.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Carbon Brief, 'Factcheck: 21 misleading myths about electric vehicles' (Simon Evans; updated 28 August 2025), citing Argonne National Laboratory's GREET model",
          sourceUrl: "https://interactive.carbonbrief.org/factcheck/electric-vehicles/index.html",
          reasoning:
            "The US government's lifecycle model puts a number on the skeptics' core point: big batteries can double a car's manufacturing footprint. The same source finds the debt repaid quickly in typical use, so the card supports the existence and size of the debt, not the claim that it is never repaid.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 2: The grid
    // =========================================================================
    {
      id: "grid-dependency",
      title: "The Grid: What if the Power Comes From Coal?",
      short_summary:
        "An electric car is as clean as the power that charges it. On Norway's hydro grid it cuts lifecycle emissions by about four-fifths; on Poland's coal-heavy grid by about two-fifths, and the payback takes longer. Coal fell below a third of world electricity for the first time in 2025.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Where coal dominates, an electric car is largely a coal-powered car. In Poland, where coal supplied 69% of power in 2022, Carbon Brief's estimate puts the lifecycle saving at about two-fifths and the battery payback at about 18,000 miles; in China, with 61% coal, about 22,000 miles, double Europe's figure. That is closer to what an efficient hybrid already achieves without a battery mine. And the US data needed to check is thinning: EPA has paused updates to eGRID, its power-plant emissions database. Unmanaged evening charging could also need upwards of 20% more generating capacity, much of it fossil.",
      proponent_rebuttal:
        "Even on coal-heavy grids the electric car comes out ahead, and the grids are getting cleaner every year. Coal's share of world electricity fell below a third for the first time in 2025, and solar generation rose 30% in one year (Ember, April 2026). In the US, the Union of Concerned Scientists found in August 2026 that driving the average electric car equals a hypothetical 100 mpg gasoline car, and that it beats the most efficient gas car (57 mpg) in regions home to 96% of Americans. A gas car's emissions are fixed when it is built; an electric car's fall as its grid decarbonizes. MIT found that delayed home charging and workplace charging can absorb midday solar and avoid the extra capacity.",
      crux: {
        id: "grid-carbon-threshold",
        title: "Grid Carbon Intensity Threshold for EV Advantage",
        question:
          "Does an EV charged on a coal-heavy grid still beat an efficient hybrid over its life?",
        description:
          "The grid carbon intensity (gCO2/kWh) above which an EV no longer has a lifecycle emission advantage over the best available ICE or hybrid vehicle.",
        methodology:
          "Parametric lifecycle model varying grid intensity from 0 to 1000 gCO2/kWh, comparing EVs to both average ICE and best-in-class hybrids. Include grid trajectory projections to determine when currently-dirty grids will cross the threshold.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Year-by-year carbon intensity of electricity in the regions where EVs are sold, from grid operators and the IEA, weighted by when cars actually charge, compared with the intensity at which an EV stops beating a hybrid.",
        },
        cost_to_verify: "$100K (Modeling with published grid data)",
        falsification: {
          supporter_flip:
            "If lifecycle studies for Poland, China or India, using the hours when cars actually charge, found electric cars no better than efficient hybrids over their life, and those grids stopped cleaning up, the claim that EVs are greener nearly everywhere would fail there.",
          skeptic_flip:
            "If grid data kept showing coal's share falling after dipping below a third in 2025, and studies on coal-heavy grids kept finding electric cars ahead of hybrids over a full life, the coal-car objection would shrink each year.",
          common_ground:
            "Both sides agree the electric car's advantage is smallest on coal-heavy grids such as Poland's and China's and largest on clean ones such as Norway's, and that coal's share of world electricity has been falling.",
          live_disagreement:
            "Whether grids in the places where electric cars sell fastest clean up quickly enough that the coal exception keeps shrinking, or lock in coal-powered charging for a car's whole life.",
        },
      },
      evidence: [
        {
          id: "ucs-grid-analysis",
          title: "UCS 2026: The Average US EV Equals a 100 MPG Gas Car and Beats the Best Gas Car Where 96% of Americans Live",
          description:
            "The Union of Concerned Scientists' August 2026 update, using 2024 power-plant data, found that driving the average US electric car is 'equal to a hypothetical 100 mile per gallon gasoline car,' and that it beats the most efficient gasoline car (57 mpg) in grid regions home to 96% of the US population, up from 94 mpg and 93% in its 2024 analysis. Counting manufacturing, the average EV makes up its extra production emissions in under 18,000 miles and 'still produces less than half the lifetime emissions of a comparable gasoline car.' The update used an independent 2024 dataset because EPA has paused its eGRID power-plant database, with no update posted since eGRID2023.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 8,
            directness: 9,
          },
          source:
            "Union of Concerned Scientists, David Reichmuth, 'EPA Stopped Updating the Data Behind Electric Vehicle Emissions. The Numbers Still Show EVs Are Winners' (3 August 2026)",
          sourceUrl:
            "https://blog.ucs.org/dave-reichmuth/epa-stopped-updating-the-data-behind-electric-vehicle-emissions-the-numbers-still-show-evs-are-winners/",
          reasoning:
            "Transparent, region-by-region and repeated over years with improving results as the US grid cleans up. UCS advocates for clean vehicles, so independence is discounted, and the comparison is driving emissions; the lifecycle figure comes from the author's earlier analysis.",
        },
        {
          id: "ember-coal-below-third",
          title: "Ember 2026: Coal Fell Below a Third of World Electricity for the First Time in 2025",
          description:
            "Ember's Global Electricity Review 2026 (21 April 2026) found coal generated 33.0% of the world's electricity in 2025: 'the share of coal power fell below a third for the first time in history.' Solar generation rose a record 636 TWh, 30% in one year, and renewables reached 33.8% of global generation. Fossil generation fell 0.9% in China and 3.3% in India.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "Ember, Global Electricity Review 2026 (21 April 2026)",
          sourceUrl: "https://ember-energy.org/latest-insights/global-electricity-review-2026/",
          reasoning:
            "Measured generation data from a respected independent think tank, and on point for whether the coal exception is shrinking. Directness is moderate: a falling world average says little about the hours a given car charges, and a third of the world's power is still coal.",
        },
        {
          id: "carbonbrief-coal-grids",
          title: "Carbon Brief: On Poland's Coal Grid an EV Saves About Two-Fifths; Payback Takes 18,000-22,000 Miles in Poland and China",
          description:
            "Carbon Brief's EV factcheck (updated August 2025) estimates an electric car cuts lifecycle emissions by about two-thirds in the UK, four-fifths in Norway, but only about two-fifths in coal-heavy Poland. Coal supplied 69% of Poland's power and 61% of China's in 2022. It puts the battery payback at about 18,000 miles (28,000 km) in Poland and 22,000 miles (35,000 km) in China, against an ICCT estimate of around 11,000 miles for Europe.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Carbon Brief, 'Factcheck: 21 misleading myths about electric vehicles' (Simon Evans; updated 28 August 2025)",
          sourceUrl: "https://interactive.carbonbrief.org/factcheck/electric-vehicles/index.html",
          reasoning:
            "Puts numbers on the coal-grid objection: on the dirtiest major grids the saving roughly halves and payback doubles. The same numbers show the electric car still ahead of a gasoline car there; whether it beats an efficient hybrid on such grids is the open part, since ICCT puts hybrids about 20% below gasoline cars on the EU grid.",
        },
        {
          id: "mit-grid-stress",
          title: "MIT: Unmanaged Evening Charging Could Need Over 20% More Generating Capacity",
          description:
            "MIT researchers (Needell, Wei and Trancik, 2023) found that if evening EV charging peaks are left unmitigated, they 'could require installing upwards of 20% more power-generation capacity.' Delayed home charging and workplace charging that soaks up midday solar can reduce the peak, so that 'not everyone is charging at the same time.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "MIT Energy Initiative (Trancik group), Cell Reports Physical Science (29 June 2023)",
          sourceUrl:
            "https://energy.mit.edu/news/minimizing-electric-vehicles-impact-on-the-grid/",
          reasoning:
            "Shows a real cost if charging is left unmanaged, and the same study shows how to avoid it, so it is weak as a case against EVs. Directness is low: it concerns grid planning, not the lifecycle emissions of a car.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 3: The mines (folded in from the retired lithium-mining-ev-impact
    // map, 2026-10-06)
    // =========================================================================
    {
      id: "mining-environmental-human-costs",
      title: "The Mines: Congo's Cobalt, Indonesia's Nickel, and the Oil They Replace",
      short_summary:
        "Batteries need cobalt, nickel and lithium. Congo mined about 73% of the world's cobalt in 2025, with child labour documented in its artisanal mines; Indonesia's nickel boom has cleared tropical forest and runs on new coal plants. Supporters answer that cobalt-free batteries are spreading and that the oil an electric car replaces is mined and burned on a far larger scale.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Electric cars do not end extraction; they move it. Congo mined an estimated 73% of the world's cobalt in 2025 (USGS), and Amnesty International documented children working in its artisanal cobalt mines. On Indonesia's Halmahera island, a January 2024 investigation found nickel mining had cleared at least 5,331 hectares of tropical forest, and the industrial park that smelts it has built at least five captive coal plants and plans twelve, which would burn more coal a year than Spain or Brazil (Climate Rights International). Residents described polluted water, falling fish catches and land taken by intimidation. Lithium brine is pumped from under salt flats such as Chile's Atacama, one of the driest places on Earth, and evaporated in ponds. Clean air in rich suburbs is being bought with dirty water in the places that mine.",
      proponent_rebuttal:
        "Mining harms are real and have to be set against the extraction they replace. Some 15 billion tonnes of fossil fuels are dug up and burned each year; under a 1.5C pathway, the IEA puts critical mineral needs at about 30 million tonnes a year by 2030, 500 times less (Carbon Brief). Metal in a battery can be recovered: Redwood Materials says it recovers more than 95% of the lithium, cobalt, nickel and copper. Oil is burned once. And chemistry is moving away from the worst supply chains: the USGS reports cobalt content in lithium-ion batteries is falling and cobalt-free iron-phosphate batteries hold a significant share of China's market. The answer to bad mines is better rules and cleaner chemistries, not more gasoline.",
      crux: {
        id: "mining-externalities-reduction",
        title: "The Mining Externality Trajectory Assessment",
        question:
          "Will cobalt-free batteries and audited supply chains cut mining harms per car within a decade?",
        description:
          "If mining externalities (water depletion, habitat destruction, human rights abuses) can be reduced to acceptable levels through technology improvements, alternative battery chemistries, and enforceable regulation within the next decade, the environmental case for EVs strengthens considerably. If these externalities are structurally embedded in the supply chain and resistant to reform, EVs represent a problematic tradeoff rather than a clear improvement.",
        methodology:
          "Compare, for 2025, 2030 and 2035: water use per GWh of battery capacity for brine, hard-rock and direct lithium extraction; hectares disturbed per GWh for laterite and sulfide nickel; documented child labour and unsafe conditions in cobalt supply chains before and after due-diligence rules (EU Battery Regulation, US Uyghur Forced Labor Prevention Act); and the share of cobalt-free and lithium-free chemistries. Set those trends beside the equivalent ones for oil and gas extraction.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Audited, mine-level figures on water use, land cleared and labor abuses per tonne of lithium, cobalt and nickel, tracked year by year through supply-chain disclosure rules such as the EU Battery Regulation's due-diligence duties, alongside the share of batteries using chemistries that need less of those metals.",
        },
        cost_to_verify:
          "$500K-1M (Multi-country field research, supply chain auditing, and satellite imagery analysis)",
        falsification: {
          supporter_flip:
            "If mine-level audits through 2035 showed cobalt child labour persisting despite EU and US due-diligence rules, nickel deforestation and coal-fired smelting expanding, and water use per tonne of lithium not falling, EVs would look like relocating harm more than reducing it.",
          skeptic_flip:
            "If cobalt-free chemistries kept gaining share, recycling grew into a real source of metal, and audits showed abuses falling where due-diligence rules apply, mining harms per car would look smaller and shrinking beside the oil extraction they displace.",
          common_ground:
            "Both sides agree most of the world's cobalt is mined in Congo, where child labour has been documented, that Indonesian nickel mining has cleared tropical forest, and that battery makers are using less cobalt.",
          live_disagreement:
            "Whether mining harms per car fall fast enough through new chemistries, recycling and enforced rules, and how much weight local harm in mining regions should carry against global climate gains, which is partly a value judgment no audit settles.",
        },
      },
      evidence: [
        {
          id: "cobalt-mining-drc",
          title: "USGS 2026: Congo Mined About 73% of the World's Cobalt in 2025; Amnesty Documented Child Labour in Its Mines",
          description:
            "The US Geological Survey's 2026 cobalt summary estimates Congo (Kinshasa) produced 230,000 of the world's 310,000 tonnes of mined cobalt in 2025, 'an estimated 73% of world total.' In February 2025 Congo temporarily banned cobalt exports over oversupply and low prices, replacing the ban in October with quotas of up to 96,600 tonnes a year for 2026 and 2027. Amnesty International's 2016 investigation 'This Is What We Die For' documented that 'thousands of children' work in Congo's artisanal cobalt mines, and traced how such cobalt enters the supply chains of major brands.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "US Geological Survey, Mineral Commodity Summaries 2026: Cobalt (February 2026); Amnesty International & Afrewatch, 'This Is What We Die For' (19 January 2016)",
          sourceUrl: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-cobalt.pdf",
          reasoning:
            "Official production data and a field investigation establish where the cobalt comes from and the human cost of the worst mines. Directness is moderate: not all cobalt goes into car batteries, much Congolese output is industrial rather than artisanal, the child-labour evidence dates from 2016, and cobalt-free batteries are spreading.",
        },
        {
          id: "indonesia-nickel-rainforest",
          title: "Indonesia's Nickel Boom Cleared 5,331 Hectares of Halmahera Forest and Runs on New Coal Plants (2024)",
          description:
            "Indonesia is the world's largest nickel producer, supplying about 48% of global demand in 2022, and demand is climbing with EV batteries. A January 2024 Climate Rights International report on the Indonesia Weda Bay Industrial Park (IWIP) on Halmahera found, using geospatial analysis with UC Berkeley, that at least 5,331 hectares of tropical forest had been cut within nickel mining concessions on the island, releasing about 2.04 million metric tons of CO2e. IWIP had built at least five captive coal-fired power plants and plans twelve, which once running would use more coal in a year than Spain or Brazil. Of 45 residents interviewed, many described polluted water, shrinking fish catches, and land taken through coercion and intimidation, sometimes with police and military involvement.",
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
            "A field investigation with satellite-based deforestation estimates is solid evidence of local harm, though it comes from an advocacy organization and covers one island. The coal-fired smelting bears on lifecycle emissions, not just mining harm. Sulfide nickel elsewhere and nickel-free iron-phosphate batteries have smaller footprints.",
        },
        {
          id: "oil-industry-comparison",
          title: "Carbon Brief: 15 Billion Tonnes of Fossil Fuels a Year, Against About 30 Million Tonnes of Critical Minerals by 2030",
          description:
            "Carbon Brief's EV factcheck notes that 'some 15bn tonnes of fossil fuels are extracted and burnt each year,' while under a 1.5C pathway the IEA puts critical mineral needs for clean energy at about 30 million tonnes a year by 2030, '500 times lower.' The Energy Transitions Commission found in 2023 that 'geological resources exceed the total projected cumulative demand from 2022-50 for all key materials.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Carbon Brief, 'Factcheck: 21 misleading myths about electric vehicles' (updated 28 August 2025), citing the IEA Critical Minerals Market Review 2023 and the Energy Transitions Commission (July 2023)",
          sourceUrl: "https://interactive.carbonbrief.org/factcheck/electric-vehicles/index.html",
          reasoning:
            "Puts the two kinds of extraction on one scale, which the mining argument needs. Tonnage is a rough proxy for harm: a tonne of cobalt from an artisanal pit and a tonne of coal from a strip mine do different damage to different people, so the comparison informs the weighing without deciding it.",
        },
        {
          id: "lfp-cobalt-free-batteries",
          title: "USGS 2026: Battery Cobalt Content Is Falling, and Cobalt-Free Iron-Phosphate Cells Hold a Significant Share in China",
          description:
            "The US Geological Survey's 2026 cobalt summary reports that 'the cobalt content of lithium-ion batteries, the leading global use for cobalt, was being decreased,' and that 'cobalt-free substitutes that use iron and phosphorus held significant market share in China.' Lithium iron phosphate (LFP) cells contain neither cobalt nor nickel.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "US Geological Survey, Mineral Commodity Summaries 2026: Cobalt (February 2026)",
          sourceUrl: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-cobalt.pdf",
          reasoning:
            "An official, neutral source confirming the chemistry shift away from the most contested metal. It gives no market-share figure and LFP batteries still need lithium, so it bears on cobalt harms, not on mining harms generally.",
        },
        {
          id: "battery-recycling-advances",
          title: "Redwood Materials Says It Recovers More Than 95% of Battery Lithium, Cobalt, Nickel and Copper",
          description:
            "Redwood Materials states: 'we can recover more than 95% of the critical elements found in batteries, including lithium, cobalt, nickel, and copper.' These are company-reported figures at still-early commercial scale; few electric-car batteries have yet reached the end of their life.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 6,
            directness: 5,
          },
          source: "Redwood Materials (company statement)",
          sourceUrl:
            "https://www.redwoodmaterials.com/resources/how-battery-recycling-works/",
          reasoning:
            "Shows the metal in a battery is recoverable in principle, which oil is not. The rate is self-reported by a recycler, and recycled metal is a small share of supply until large numbers of car batteries retire in the 2030s.",
        },
      ],
    },
  ],
  // The retired lithium-mining-ev-impact map asked the same question with
  // mining counted (merged 2026-10-06); its names stay findable here.
  aliases: [
    "Are EVs significantly greener than gas cars over their full lifecycle?",
    "Lithium Mining & EV Environmental Impact",
    "Are EVs clearly greener than gas cars once mining is counted?",
    "Are electric vehicles still better for the environment once lithium mining is counted?",
  ],
  references: [
    {
      title: "Life-cycle greenhouse gas emissions from passenger cars in the European Union: A 2025 update — ICCT (July 2025)",
      url: "https://theicct.org/publication/electric-cars-life-cycle-analysis-emissions-europe-jul25/",
    },
    {
      title: "EPA Stopped Updating the Data Behind Electric Vehicle Emissions. The Numbers Still Show EVs Are Winners — Union of Concerned Scientists (August 2026)",
      url: "https://blog.ucs.org/dave-reichmuth/epa-stopped-updating-the-data-behind-electric-vehicle-emissions-the-numbers-still-show-evs-are-winners/",
    },
    {
      title: "Factcheck: 21 misleading myths about electric vehicles — Carbon Brief (updated August 2025)",
      url: "https://interactive.carbonbrief.org/factcheck/electric-vehicles/index.html",
    },
    {
      title: "Global Electricity Review 2026 — Ember",
      url: "https://ember-energy.org/latest-insights/global-electricity-review-2026/",
    },
    {
      title: "Mineral Commodity Summaries 2026: Cobalt — US Geological Survey",
      url: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-cobalt.pdf",
    },
    {
      title: "GREET Model — Argonne National Laboratory, US Department of Energy",
      url: "https://greet.anl.gov/",
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
      title: "Nickel Unearthed: The Human and Climate Costs of Indonesia's Nickel Industry — Climate Rights International (2024)",
      url: "https://cri.org/reports/nickel-unearthed/",
    },
  ],
};
