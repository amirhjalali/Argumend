import type { Topic } from "@/lib/schemas/topic";

export const globalWaterCrisisData = {
  id: "global-water-crisis",
  title: "Is the World Heading for Water Wars?",
  meta_claim:
    "Freshwater scarcity will become the defining geopolitical conflict of the 21st century, potentially triggering wars and mass migration.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Supply Depletion
    // =========================================================================
    {
      id: "supply-depletion",
      title: "Supply Depletion",
      short_summary:
        "Groundwater extraction rates are far exceeding natural recharge in critical aquifers worldwide. The Ogallala Aquifer in the US Great Plains has lost over 400 cubic kilometers of water since the 1950s, India pumps more groundwater than any nation on Earth with water tables dropping 1-3 meters per year in key agricultural states, and Himalayan glaciers that supply water to 1.6 billion people are melting at accelerating rates. Whether these trends constitute an existential crisis or a manageable resource challenge is fiercely debated.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Water scarcity is real but regionally concentrated, not a global crisis. The Earth contains approximately 10.6 million cubic kilometers of fresh groundwater, and total renewable freshwater resources far exceed current human consumption. The Ogallala depletion narrative ignores that portions of the aquifer are being managed sustainably and that agricultural efficiency has improved dramatically — the US produces far more food per unit of water than it did 50 years ago. India's groundwater crisis is primarily a governance problem (free electricity for pumping, lack of metering, perverse subsidies) rather than an absolute scarcity problem. Glacier retreat is concerning but glacial meltwater contributes only 1-10% of total water supply in most downstream basins, with monsoon rainfall being the dominant source. Desalination costs have fallen 80% since 1990, water recycling technology is advancing rapidly, and historical precedent shows that societies adapt to resource constraints through pricing, technology, and institutional reform rather than through conflict.",
      proponent_rebuttal:
        "The aggregate numbers conceal localized catastrophes unfolding right now. The Ogallala Aquifer supplies 30% of US irrigation water, and USGS studies project parts of it will be effectively depleted within 25 years — 'portions being managed sustainably' does not help farmers in western Kansas where the saturated thickness has already dropped below usable levels. India's groundwater crisis may be a governance problem in theory, but in practice 600 million Indians face 'high to extreme water stress' according to NITI Aayog, 21 Indian cities are projected to run out of groundwater by 2030, and the political economy makes subsidy reform nearly impossible. The 'glaciers contribute only 1-10%' framing ignores seasonality: during dry seasons when rivers run low and demand is highest, glacial meltwater can constitute 30-70% of flow in the Indus, Ganges, and Brahmaputra basins. As glaciers shrink, this critical buffer disappears. NASA GRACE satellite data shows that 21 of the world's 37 largest aquifers have passed their tipping points, with extraction exceeding recharge. We are not facing a future crisis — we are already in one, masked by the unsustainable mining of fossil water that took millennia to accumulate.",
      crux: {
        id: "aquifer-depletion-timeline",
        title: "The Aquifer Depletion Timeline Test",
        description:
          "The core disagreement is whether major aquifer depletion will reach critical thresholds within decades, forcing sudden agricultural collapse and displacement, or whether gradual price signals, efficiency gains, and technological substitution will allow smooth adaptation. If depletion outpaces adaptation, regions dependent on fossil water face catastrophic supply failure.",
        methodology:
          "Combine NASA GRACE satellite gravity data with ground-based well monitoring to produce high-resolution depletion models for the 10 most-stressed aquifers (Ogallala, Northwest India, North China Plain, Arabian Peninsula, Central Valley California, etc.). Model extraction rates against recharge rates under multiple climate scenarios. Overlay agricultural dependency data to identify populations at risk of supply failure within 10, 25, and 50 year horizons. Cross-reference with economic models of adaptation cost and technological substitution timelines.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-10M (Satellite data analysis + hydrological modeling + agricultural impact assessment across multiple basins)",
      },
      evidence: [
        {
          id: "ogallala-depletion",
          title:
            "Ogallala Aquifer Has Lost Over 400 Cubic Kilometers Since the 1950s",
          description:
            "The Ogallala (High Plains) Aquifer, which supplies 30% of US agricultural irrigation water across eight states, has experienced cumulative depletion exceeding 400 cubic kilometers since large-scale pumping began in the 1950s. In western Kansas and the Texas Panhandle, saturated thickness has declined by more than 50%, rendering wells uneconomical. A 2023 Kansas Geological Survey study found that at current extraction rates, 70% of the Kansas portion of the aquifer will be unable to support irrigation within 25 years. The aquifer recharges at roughly 25 millimeters per year in most areas — a rate that would require thousands of years to restore what has been extracted in decades.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "USGS; Kansas Geological Survey",
          sourceUrl:
            "https://www.usgs.gov/mission-areas/water-resources/science/high-plains-aquifer",
          reasoning:
            "USGS depletion data is based on direct well measurements and satellite gravity observations. The depletion is physically measured, not modeled. However, the crisis is geographically concentrated in the southern and western portions — the northern Ogallala in Nebraska remains relatively healthy, and critics argue this nuance is lost in aggregate depletion figures.",
        },
        {
          id: "india-groundwater-crisis",
          title:
            "India Extracts More Groundwater Than Any Nation — 600 Million Face Extreme Water Stress",
          description:
            "India extracts approximately 250 cubic kilometers of groundwater annually — more than the US and China combined — accounting for 25% of global groundwater withdrawal. A 2018 report by India's government think tank NITI Aayog warned that 21 major Indian cities would run out of groundwater by 2020 (later revised to 2030), and that 600 million Indians face 'high to extreme water stress.' Satellite data from NASA GRACE shows that northwestern India's groundwater is declining at a rate of 54 cubic kilometers per year. The Punjab and Haryana breadbasket regions, which produce a disproportionate share of India's wheat and rice, have seen water tables drop 1-3 meters per year in some districts.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "NITI Aayog; NASA GRACE Mission",
          sourceUrl:
            "https://www.niti.gov.in/writereaddata/files/document_publication/2018-05-18-Water-Index-Report_vS8-compressed.pdf",
          reasoning:
            "NITI Aayog is India's own government planning body, making this an authoritative domestic assessment rather than an external critique. NASA GRACE satellite data provides independent physical confirmation of depletion. The NITI Aayog timeline predictions have proven overly aggressive (cities have not fully 'run out' as predicted), but the underlying depletion trend is confirmed by multiple data sources.",
        },
        {
          id: "glacier-retreat-asia",
          title:
            "Himalayan Glaciers Losing Ice at Accelerating Rates, Threatening 1.6 Billion People",
          description:
            "A 2023 study in Science found that Himalayan glaciers lost ice 65% faster in the 2010s compared to the 2000s. The Hindu Kush Himalayan region, sometimes called the 'Third Pole,' contains the largest store of frozen freshwater outside the polar regions and feeds 10 major river systems including the Indus, Ganges, Brahmaputra, Yangtze, and Mekong. Under a 2 degrees C warming scenario, the region is projected to lose one-third of its glacier volume by 2100; under 4 degrees C, two-thirds. During dry seasons, glacial meltwater provides 30-70% of river flow in the upper Indus Basin, making it critical for Pakistan's agriculture and India's northern plains.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Science; ICIMOD Hindu Kush Himalayan Assessment",
          sourceUrl:
            "https://www.science.org/doi/10.1126/science.abo1324",
          reasoning:
            "Glacier retreat rates are measured by satellite and ground-based observations with high confidence. The long-term threat to dry-season river flow is physically well-understood. However, the timeline matters enormously — glacier loss is a multi-decadal process, and near-term water supply depends more on monsoon variability than glacier volume. The 'crisis' framing may understate how much adaptation time remains.",
        },
        {
          id: "water-efficiency-gains",
          title:
            "Agricultural Water Efficiency Has Improved Dramatically — More Crop per Drop",
          description:
            "Global agricultural water productivity (crop output per unit of water consumed) has roughly doubled since 1980. Drip irrigation, which can reduce water use by 30-60% compared to flood irrigation, is expanding rapidly — Israel irrigates over 75% of its farmland with drip systems and produces more agricultural output per cubic meter of water than almost any nation on Earth. The US produces approximately 2.4 times more food per acre-foot of water than it did in 1960. Even in stressed regions, efficiency improvements offer substantial headroom: India loses an estimated 40-50% of its water supply to leaky infrastructure and inefficient flood irrigation practices, suggesting that governance and technology reform could dramatically extend existing supplies without new sources.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "FAO; World Bank Water Global Practice",
          sourceUrl:
            "https://www.worldbank.org/en/topic/water",
          reasoning:
            "Efficiency gains are well-documented and represent genuine progress. Israel demonstrates that advanced agriculture is possible in arid conditions. However, the 'Jevons paradox' applies: efficiency gains often enable expanded production rather than reduced consumption, and the political obstacles to reforming water subsidies in countries like India have proven intractable for decades.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Conflict Potential
    // =========================================================================
    {
      id: "conflict-potential",
      title: "Conflict Potential",
      short_summary:
        "Transboundary rivers — the Nile, Indus, Colorado, Tigris-Euphrates, and Mekong — are flashpoints where upstream dams and diversions threaten downstream nations' survival. Historical precedent shows water disputes escalating tensions, but outright 'water wars' between nations remain rare. Whether scarcity will trigger conflict or cooperation is the central geopolitical question.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The 'water wars' thesis has been predicted for decades and has consistently failed to materialize. Political scientist Aaron Wolf's comprehensive database of international water events found that cooperative events outnumber conflictive events by more than 2:1 over the past 60 years, and the last true 'water war' occurred 4,500 years ago between Sumerian city-states. The Nile dispute between Egypt and Ethiopia over the Grand Ethiopian Renaissance Dam (GERD) has been tense but has not led to military conflict despite years of threats. The Indus Waters Treaty between India and Pakistan has survived three wars and remains one of the most durable international agreements in history. Even the Colorado River crisis — where the river no longer reaches the sea — has been managed through interstate compacts and federal intervention, not violence. States have overwhelmingly chosen negotiation, treaties, and institutional frameworks over armed conflict when it comes to shared water resources. The reason is straightforward: water infrastructure is vulnerable to retaliation, agricultural systems require stability, and the economic costs of water conflict far exceed the costs of cooperation.",
      proponent_rebuttal:
        "The historical record of water cooperation was built during an era of relative abundance. We are now entering uncharted territory where absolute scarcity — not just allocation disputes — will define the landscape. Ethiopia's GERD will give it control over 86% of the Nile's flow, threatening Egypt's agricultural lifeline in a country of 110 million people where 95% of the population depends on the Nile. Egypt's president has explicitly warned that the dam is 'an existential threat' and that 'all options are on the table.' The Indus Waters Treaty's durability is being tested as India constructs new dams on tributaries allocated to Pakistan under the treaty, and Pakistan — a nuclear-armed state where agriculture employs 40% of the workforce — views any reduction in Indus flow as a national security threat. The Colorado River compact, negotiated in 1922 based on abnormally wet conditions, allocated more water than the river actually carries, and the resulting crisis forced emergency cuts that have devastated farming communities across the American Southwest. Beyond state-to-state conflict, water scarcity is already driving sub-national violence: in 2022, fighting over shrinking water resources contributed to 700+ deaths in pastoral conflicts in the Horn of Africa. Water does not cause wars the way bullets do — it creates the desperate conditions in which wars become inevitable.",
      crux: {
        id: "scarcity-conflict-threshold",
        title: "The Scarcity-to-Conflict Threshold Test",
        description:
          "The key question is whether there exists a threshold of absolute water scarcity beyond which the historical pattern of cooperation breaks down and armed conflict becomes probable. If cooperation holds even under extreme scarcity, 'water wars' are a myth. If scarcity beyond a critical threshold overwhelms institutional capacity for cooperation, the historical record provides false comfort.",
        methodology:
          "Conduct a comparative case study analysis of all transboundary river basins where per-capita water availability has dropped below 500 cubic meters per year (absolute scarcity). Map institutional capacity (treaty presence, joint commissions, third-party mediation), power asymmetry between riparian states, economic water dependency, and military capability. Model conflict probability under projected 2040 and 2060 scarcity scenarios using climate-adjusted hydrological models. Test whether institutional strength moderates the scarcity-conflict relationship or whether extreme scarcity overwhelms institutions.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$3-5M (Multi-basin geopolitical modeling integrating climate projections, institutional analysis, and conflict risk assessment)",
      },
      evidence: [
        {
          id: "nile-gerd-dispute",
          title:
            "Ethiopia's GERD Dam Threatens Egypt's Existential Water Supply — Negotiations Have Stalled",
          description:
            "The Grand Ethiopian Renaissance Dam on the Blue Nile, which provides 86% of the Nile's flow, began filling in 2020 despite unresolved negotiations with downstream Egypt and Sudan. Egypt receives 90% of its freshwater from the Nile, and the dam's reservoir (74 billion cubic meters) could reduce Egypt's water supply by 12-25% during filling years, depending on hydrological conditions and filling speed. Egyptian President el-Sisi has repeatedly described the dam as an 'existential threat' and Egypt's parliament authorized military action in 2020. After a decade of negotiations mediated by the African Union, the US, and the World Bank, no binding agreement has been reached. Ethiopia views the dam as essential for lifting 65 million people from energy poverty.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "International Crisis Group; Council on Foreign Relations",
          sourceUrl:
            "https://www.crisisgroup.org/africa/horn-africa/ethiopia/271-nile-dam-talks-stalemate",
          reasoning:
            "The GERD dispute is the most prominent active water conflict globally, involving two nations with a combined population of 220 million. The existential framing by Egyptian leadership is not rhetorical — Egypt's agriculture literally depends on the Nile. However, the dispute has not escalated to military action in over a decade, which skeptics cite as evidence that rational deterrence and diplomatic norms restrain conflict even in extreme cases.",
        },
        {
          id: "indus-waters-treaty-stress",
          title:
            "India-Pakistan Indus Waters Treaty Under Growing Strain as India Builds Upstream Dams",
          description:
            "The 1960 Indus Waters Treaty — brokered by the World Bank — allocated the three eastern rivers (Ravi, Beas, Sutlej) to India and the three western rivers (Indus, Jhelm, Chenab) to Pakistan. India's construction of the Kishanganga and Ratle hydroelectric projects on tributaries of the western rivers has prompted Pakistan to invoke international arbitration, arguing the dams violate treaty terms. Pakistan's agriculture, which employs 40% of its workforce and feeds 230 million people, depends on the Indus system for 90% of its irrigation. India issued a notice in 2023 to 'modify' the treaty — the first formal challenge to its terms in 63 years. Both nations possess nuclear weapons.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "World Bank; Stimson Center",
          sourceUrl:
            "https://www.stimson.org/program/south-asia-program/",
          reasoning:
            "The Indus Waters Treaty has been remarkably resilient, surviving three India-Pakistan wars. However, India's formal notice to modify the treaty signals that the institutional framework is under unprecedented strain. Climate change is projected to reduce Indus flow by 30-40% by mid-century as glaciers recede, intensifying competition over a shrinking resource between nuclear-armed rivals. The combination of scarcity, institutional erosion, and nuclear capability makes this arguably the world's most dangerous water flashpoint.",
        },
        {
          id: "historical-cooperation-record",
          title:
            "International Water Cooperation Outnumbers Conflict 2:1 Over 60 Years",
          description:
            "The Transboundary Freshwater Dispute Database maintained by Oregon State University, the most comprehensive record of international water interactions, documents over 1,800 water-related events between nations from 1948 to 2008. Cooperative events (treaties, joint commissions, data sharing, joint infrastructure) outnumber conflictive events (diplomatic protests, sanctions, military threats) by more than 2:1. Of 263 transboundary river basins worldwide, 145 have formal cooperative agreements. Researcher Aaron Wolf has found that 'the last true water war occurred 4,500 years ago between the Sumerian city-states of Lagash and Umma,' and that water scarcity has historically driven institutional innovation rather than conflict.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "Oregon State University Transboundary Freshwater Dispute Database",
          sourceUrl:
            "https://transboundarywaters.science.oregonstate.edu/",
          reasoning:
            "This is the most comprehensive empirical database on international water interactions and it strongly supports the cooperation thesis. However, the dataset primarily covers a period of relative hydrological stability and institutional build-up. Whether these patterns hold under conditions of accelerating scarcity, climate disruption, and state fragility in water-stressed regions is the untested assumption.",
        },
        {
          id: "sub-national-water-violence",
          title:
            "Water Scarcity Already Driving Sub-National Violence in Africa and South Asia",
          description:
            "While interstate water wars remain rare, sub-national water-related violence is escalating. In the Horn of Africa, competition over shrinking water resources between pastoralist and farming communities contributed to over 700 deaths in 2022 alone across Ethiopia, Kenya, and Somalia. In India, the Cauvery River dispute between Karnataka and Tamil Nadu has triggered riots, destruction of property, and deployment of paramilitary forces multiple times since 2016. In Iraq, the drying of the Mesopotamian marshes due to upstream Turkish and Iranian dams has displaced hundreds of thousands. The Pacific Institute's Water Conflict Chronology documents over 900 instances of water-related violence globally since 2000, with incidents increasing sharply over the past decade.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Pacific Institute Water Conflict Chronology; ACLED",
          sourceUrl:
            "https://www.worldwater.org/water-conflict/",
          reasoning:
            "The Pacific Institute database provides systematic documentation of water-related violence. Sub-national violence is less visible than interstate wars but affects millions. The trend of increasing incidents correlates with growing scarcity. However, attributing complex conflicts solely to water scarcity oversimplifies — these events typically involve intersecting ethnic, economic, and governance factors in which water is one stressor among several.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Technology and Adaptation
    // =========================================================================
    {
      id: "technology-adaptation",
      title: "Technology and Adaptation",
      short_summary:
        "Desalination costs have fallen 80% since 1990, Israel recycles 90% of its wastewater, and precision agriculture can cut water use by 30-60%. Techno-optimists argue innovation will solve the water crisis as it has solved previous resource scarcity predictions. Critics counter that technology is too expensive, energy-intensive, and slow to deploy at the scale needed to avert catastrophe in the most vulnerable regions.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Desalination, water recycling, precision agriculture, and atmospheric water harvesting represent real, scalable solutions that are already transforming water management. Israel — a desert nation — has achieved water abundance through technology and policy, producing surplus freshwater from desalination plants powered by natural gas at costs below $0.50 per cubic meter. Singapore meets 40% of its water needs through recycled wastewater (NEWater). Saudi Arabia and the UAE desalinate billions of liters daily. Precision agriculture using soil moisture sensors, drip irrigation, and deficit irrigation strategies routinely achieves 30-60% water savings. Atmospheric water generators are becoming commercially viable in humid regions. The cost trajectory of desalination mirrors solar energy: steady technological improvement and economies of scale are driving exponential cost reduction. Every resource scarcity prediction from Malthus to Paul Ehrlich has underestimated human ingenuity. Water is no different — it is the most abundant molecule on Earth's surface, and the challenge is not absolute scarcity but engineering and economics.",
      proponent_rebuttal:
        "Technology is real but the deployment gap is catastrophic. Israel spends $1.5 billion annually on desalination and water infrastructure — a manageable investment for a wealthy nation of 9 million people. Scaling this to India (1.4 billion), sub-Saharan Africa (1.2 billion), or even Pakistan (230 million) requires investments of hundreds of billions of dollars that these governments cannot finance. Desalination is energy-intensive — producing 1 cubic meter of freshwater requires 3-4 kilowatt-hours of electricity — meaning water security becomes dependent on energy security, creating a compounding vulnerability in regions that lack both. The brine waste from desalination (1.5 liters of toxic brine per liter of freshwater) is already damaging marine ecosystems in the Persian Gulf. Precision agriculture requires capital investment, technical knowledge, and reliable electricity that smallholder farmers in South Asia and Africa — who produce the majority of food in the most water-stressed regions — simply do not have. The comparison to solar energy ignores that solar panels can be deployed modularly and incrementally, while desalination plants require massive centralized infrastructure, coastal access, and energy supply. Technology will help wealthy nations adapt. It will not arrive fast enough to prevent catastrophe in the poorest, most water-stressed regions where the crisis is already unfolding.",
      crux: {
        id: "technology-deployment-gap",
        title: "The Technology Deployment Gap Test",
        description:
          "The decisive question is whether desalination, water recycling, and precision agriculture can be deployed at sufficient scale and speed in the most water-stressed regions — particularly South Asia, Sub-Saharan Africa, and the Middle East — before aquifer depletion and climate disruption trigger irreversible agricultural collapse and mass displacement. If technology scales fast enough, the water crisis is a solvable engineering problem. If the deployment gap persists, technology will save wealthy nations while the poorest face catastrophe.",
        methodology:
          "Model the cost and timeline to deploy sufficient desalination and water recycling capacity to close the projected water deficit in the 20 most water-stressed nations by 2050. Include capital costs, energy requirements (and the energy infrastructure needed to support them), brine disposal capacity, institutional requirements, and financing mechanisms. Compare deployment timelines against aquifer depletion and climate disruption timelines to determine whether technological solutions can arrive before tipping points are reached.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-4M (Techno-economic modeling across 20 water-stressed nations integrating infrastructure, energy, and climate projections)",
      },
      evidence: [
        {
          id: "desalination-cost-decline",
          title:
            "Desalination Costs Have Fallen 80% Since 1990 to Below $0.50/Cubic Meter",
          description:
            "The cost of reverse osmosis desalination has declined from approximately $2.50 per cubic meter in 1990 to below $0.50 per cubic meter at the most efficient modern plants (such as Israel's Sorek B, the world's largest reverse osmosis facility). Energy consumption has fallen from 20 kWh/m3 in the 1970s to 2.5-3.5 kWh/m3 today, approaching the thermodynamic minimum of ~1 kWh/m3. Global desalination capacity exceeds 100 million cubic meters per day across 21,000 plants in 170 countries. The technology is mature, declining in cost, and being deployed at scale — particularly in the Middle East, North Africa, and Australia.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "International Desalination Association; MIT Water Research",
          sourceUrl:
            "https://www.desalination.com/",
          reasoning:
            "Desalination cost trends are well-documented and the technology is proven at scale. The cost decline trajectory is encouraging and mirrors other energy technologies. However, $0.50/m3 remains significantly more expensive than groundwater pumping or surface water treatment, making it economically viable primarily for municipal supply in wealthy coastal nations — not for irrigating crops in landlocked developing countries where the water crisis is most acute.",
        },
        {
          id: "israel-water-model",
          title:
            "Israel Recycles 90% of Wastewater and Has Achieved Water Surplus Through Technology",
          description:
            "Israel recycles approximately 90% of its wastewater for agricultural irrigation — the highest rate in the world (Spain, the second-highest, recycles ~20%). Combined with five large-scale desalination plants that provide over 80% of domestic water supply, Israel has transformed from chronic water scarcity to surplus in under two decades. The country's agricultural sector produces more food per unit of water than almost any nation, using precision drip irrigation on 75% of irrigated land. Israel's water technology sector generates over $2 billion in annual exports. The 'Israeli model' is frequently cited as proof that water scarcity is an engineering problem, not an existential threat.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Israel Water Authority; World Bank",
          sourceUrl:
            "https://www.gov.il/en/departments/israel_water_authority",
          reasoning:
            "Israel's water transformation is genuinely impressive and demonstrates what is technically possible. However, replicability is scored lower because Israel's success depends on factors that are difficult to transfer: a wealthy, technologically advanced economy; a small population (9 million); Mediterranean coastal access for desalination; strong centralized governance; and massive defense-driven R&D investment. India, with 150 times the population and a fraction of the per-capita GDP, faces fundamentally different constraints.",
        },
        {
          id: "desalination-energy-brine",
          title:
            "Desalination Requires Massive Energy and Produces Toxic Brine Waste",
          description:
            "Global desalination plants produce approximately 142 million cubic meters of brine daily — 1.5 times the volume of freshwater produced. This hypersaline waste, often containing chemical additives and heavy metals, is typically discharged into coastal waters, increasing local salinity by up to 20% and damaging marine ecosystems. A 2019 UN study found brine discharge was significantly harming marine environments in the Persian Gulf, Red Sea, and Mediterranean. Desalination also requires 3-4 kWh of electricity per cubic meter of freshwater, meaning that scaling desalination to meet projected global water deficits would require enormous new energy generation capacity — an estimated 50-100 GW, equivalent to 50-100 nuclear power plants — creating a compounding energy-water nexus challenge, particularly in fossil-fuel-dependent regions.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "United Nations University; Nature Sustainability",
          sourceUrl:
            "https://www.nature.com/articles/s41893-019-0235-4",
          reasoning:
            "The energy and brine constraints on desalination are well-quantified and represent genuine limits to scaling. However, these are engineering challenges, not physical impossibilities — brine mining for mineral recovery, solar-powered desalination, and zero-liquid-discharge systems are all under active development. The question is whether these solutions can mature fast enough to keep pace with growing demand.",
        },
        {
          id: "smart-agriculture-adoption",
          title:
            "Precision Agriculture Adoption Remains Below 5% in Water-Stressed Developing Countries",
          description:
            "Despite proven water savings of 30-60%, precision and drip irrigation covers less than 5% of irrigated farmland in South Asia and Sub-Saharan Africa — the regions facing the most acute water stress. In India, which accounts for 25% of global groundwater extraction, drip irrigation covers approximately 10 million hectares out of 70 million hectares of irrigated land (14%), and adoption rates have plateaued despite government subsidies. Barriers include high upfront costs ($1,000-$2,500 per hectare), requirement for pressurized water supply, technical maintenance knowledge, and fragmented smallholder farms averaging less than 2 hectares. A 2023 World Bank analysis concluded that even with aggressive policy support, drip irrigation could reach only 30-40% of Indian farmland by 2040.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "World Bank; International Water Management Institute",
          sourceUrl:
            "https://www.iwmi.cgiar.org/",
          reasoning:
            "Adoption data demonstrates the gap between technological potential and real-world deployment. The barriers are not technological but economic and institutional — which means they are solvable in theory but have proven resistant to policy intervention in practice. This evidence directly addresses whether technology can solve the water crisis 'in time' for the populations most at risk.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "United Nations World Water Development Report 2024 — Water for Prosperity and Peace",
      url: "https://www.unwater.org/publications/un-world-water-development-report-2024",
    },
    {
      title:
        "Rodell et al. — Emerging Trends in Global Freshwater Availability (Nature, 2018)",
      url: "https://www.nature.com/articles/s41586-018-0123-1",
    },
    {
      title:
        "Transboundary Freshwater Dispute Database — Oregon State University",
      url: "https://transboundarywaters.science.oregonstate.edu/",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Will water scarcity trigger the next great wave of mass migration?",
      content:
        "The World Bank estimates that by 2050, water scarcity amplified by climate change could force 216 million people to migrate within their own countries. The Sahel, Central Asia, and South Asia face overlapping crises of aquifer depletion, glacier loss, and population growth. If agricultural regions become unviable — as parts of the Ogallala region and northwestern India are projected to within decades — where do hundreds of millions of farmers go? Unlike sea-level rise, which unfolds visibly over generations, aquifer depletion can trigger sudden agricultural collapse when wells run dry. Is the international system remotely prepared for water-driven displacement at this scale?",
    },
    {
      id: "q2",
      title:
        "Should water be priced as a scarce commodity or guaranteed as a human right?",
      content:
        "The UN recognized access to clean water as a human right in 2010, yet economists argue that the chronic underpricing of water — particularly for agricultural irrigation, which consumes 70% of global freshwater — is the root cause of overextraction. Farmers in India and the American West pay virtually nothing for groundwater pumping, creating a 'tragedy of the commons' that depletes shared aquifers. Raising water prices would incentivize efficiency and reduce waste, but would also disproportionately burden the poorest populations and potentially price subsistence farmers out of their livelihoods. Can water markets and human rights coexist, or are they fundamentally in tension?",
    },
    {
      id: "q3",
      title:
        "Is the 'water wars' narrative a useful warning or a dangerous oversimplification?",
      content:
        "The phrase 'water wars' generates headlines and political attention, but some water policy experts argue it does more harm than good. By framing water as a source of conflict rather than cooperation, it may undermine the very diplomatic frameworks that have historically resolved water disputes peacefully. The securitization of water can justify military spending over infrastructure investment, empower nationalist narratives over shared governance, and obscure the fact that most water crises are caused by domestic mismanagement rather than foreign aggression. Yet proponents argue that only existential threat language generates the political urgency needed to mobilize trillion-dollar investments in water infrastructure before it is too late. Does the framing of the problem shape the solution?",
    },
  ],
};
