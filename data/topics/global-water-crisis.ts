export const globalWaterCrisisData = {
  id: "global-water-crisis",
  title: "Is the World Heading for Water Wars?",
  question: "Is the world heading for water wars?",
  meta_claim:
    "Freshwater scarcity will become the defining geopolitical conflict of the 21st century, potentially triggering wars and mass migration.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The Pacific Institute's November 2025 update catalogued 420 reported water-related violent incidents in 2024. Its categories include water as a trigger, a weapon and a casualty of violence. That is not a count of wars caused by shortages. The disagreement concerns when pressure on shared water supplies escalates into armed violence, and how institutions can prevent it.",
    confidence: 84,
    source:
      "Pacific Institute, Water Conflict Chronology update (November 11, 2025)",
    sourceUrl: "https://pacinst.org/announcement/pacific-institute-analysis-finds-surge-in-reported-water-related-violence/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both cases distinguish a water shortage from a dispute and a dispute from armed violence. Cooperation is part of the historical record, while water systems can also be attacked in existing conflicts. Physical depletion, affordability and governance therefore need separate evidence.",
    "The map asks how quickly institutions and infrastructure can respond as water supply, demand and reservoir operations change. The disagreements concern local aquifer depletion, the risk of violent escalation on shared rivers, and who can afford effective adaptation. A hydrological deficit alone does not establish that war will follow.",
  ],
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
        question:
          "Can adaptation keep pace with aquifer depletion before farming in key regions collapses?",
        description:
          "The core disagreement is whether major aquifer depletion will reach critical thresholds within decades, forcing sudden agricultural collapse and displacement, or whether gradual price signals, efficiency gains, and technological substitution will allow smooth adaptation. If depletion outpaces adaptation, regions dependent on fossil water face catastrophic supply failure.",
        methodology:
          "Combine NASA GRACE satellite gravity data with ground-based well monitoring to produce high-resolution depletion models for the 10 most-stressed aquifers (Ogallala, Northwest India, North China Plain, Arabian Peninsula, Central Valley California, etc.). Model extraction rates against recharge rates under multiple climate scenarios. Overlay agricultural dependency data to identify populations at risk of supply failure within 10, 25, and 50 year horizons. Cross-reference with economic models of adaptation cost and technological substitution timelines.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "High-resolution depletion models for the most stressed aquifers, combining NASA GRACE satellite gravity data with well monitoring, that set extraction against recharge and against how fast efficiency gains and price signals are cutting demand.",
        },
        cost_to_verify:
          "$5-10M (Satellite data analysis + hydrological modeling + agricultural impact assessment across multiple basins)",
        falsification: {
          supporter_flip:
            "If high-resolution depletion models combining GRACE data and well monitoring showed that price signals, efficiency gains, and substitution were closing the gap faster than aquifers are drawn down — so stressed basins reach a new equilibrium well before wells run dry — the 'existential crisis' framing would soften to 'a costly but manageable regional adjustment.'",
          skeptic_flip:
            "If GRACE and well data kept placing major fossil-water aquifers like the Ogallala, which recharge at ~25 mm/yr, past their tipping points, scarcity would look less like a regional governance problem and more like a loss no reform can reverse on a human timescale.",
          common_ground:
            "Both sides agree groundwater depletion is real and physically measured in specific basins (Ogallala, northwest India, North China Plain), and that current extraction in those basins exceeds natural recharge.",
          live_disagreement:
            "Whether adaptation (efficiency, pricing, substitution, recharge management) can keep pace with depletion before critical aquifers cross thresholds that force abrupt agricultural collapse — resolvable only by basin-by-basin models comparing depletion timelines against realistic adaptation rates.",
        },
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
            "India extracts approximately 250 cubic kilometers of groundwater annually — more than the US and China combined — accounting for 25% of global groundwater withdrawal. A 2018 report by India's government think tank NITI Aayog warned that 21 major Indian cities would run out of groundwater by 2020 (later revised to 2030), and that 600 million Indians face 'high to extreme water stress.' Satellite data from NASA GRACE (Rodell et al., Nature 2009) shows that groundwater in northwestern India — the Punjab, Haryana, Delhi and Rajasthan region — was depleting at roughly 17.7 ± 4.5 cubic kilometers per year over 2002–2008. The Punjab and Haryana breadbasket regions, which produce a disproportionate share of India's wheat and rice, have seen water tables drop 1-3 meters per year in some districts.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "NITI Aayog; NASA GRACE Mission (Rodell et al., Nature 2009)",
          sourceUrl: "https://www.nature.com/articles/nature08238",
          reasoning:
            "NITI Aayog is India's own government planning body, making this an authoritative domestic assessment rather than an external critique. NASA GRACE satellite data provides independent physical confirmation of depletion. The depletion rate is given as the peer-reviewed Rodell et al. (2009) estimate of ~17.7 km³/yr for the three-state northwestern region; an earlier draft cited ~54 km³/yr, which overstated the published figure roughly threefold. The NITI Aayog timeline predictions have proven overly aggressive (cities have not fully 'run out' as predicted), but the underlying depletion trend is confirmed by multiple data sources.",
        },
        {
          id: "glacier-retreat-asia",
          title:
            "Himalayan Glaciers Losing Ice at Accelerating Rates, Threatening 1.6 Billion People",
          description:
            "ICIMOD's 2023 Hindu Kush Himalaya assessment (HI-WISE) found that the region's glaciers disappeared 65% faster in 2011–2020 than in the previous decade. The Hindu Kush Himalayan region, sometimes called the 'Third Pole,' contains the largest store of frozen freshwater outside the polar regions and feeds 12 major river systems including the Indus, Ganges, Brahmaputra, Yangtze, and Mekong, supplying water to roughly 240 million mountain residents and 1.65 billion people downstream. ICIMOD projects that at 1.5–2 degrees C of warming the region will lose 30–50% of its glacier volume by 2100, rising to up to 75–80% on current emissions trajectories. The peer-reviewed Rounce et al. (Science, 2023) global glacier model reinforces that every increment of warming sharply increases projected loss. During dry seasons, glacial meltwater provides 30-70% of river flow in the upper Indus Basin, making it critical for Pakistan's agriculture and India's northern plains.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "ICIMOD HI-WISE Hindu Kush Himalaya Assessment (2023); Rounce et al., Science (2023)",
          sourceUrl:
            "https://www.icimod.org/press-release/landmark-report-on-impacts-of-disappearing-snow-and-ice-in-the-hindu-kush-himalaya-current-emissions-path-threatens-two-billion-people-and-is-accelerating-species-extinction/",
          reasoning:
            "Glacier retreat rates are measured by satellite and ground-based observations with high confidence. The '65% faster' acceleration and the downstream population and volume-loss figures come from ICIMOD's 2023 HI-WISE regional assessment; an earlier draft attributed the 65% figure to the Science (Rounce et al.) paper, which actually models global glacier loss by temperature scenario rather than reporting the HKH decadal acceleration. The long-term threat to dry-season river flow is physically well-understood. However, the timeline matters enormously — glacier loss is a multi-decadal process, and near-term water supply depends more on monsoon variability than glacier volume. The 'crisis' framing may understate how much adaptation time remains.",
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
        "Shared rivers such as the Nile and Indus connect upstream dam operations with downstream water needs. Historical diplomatic interactions often involved cooperation, while newer violence records include attacks on water infrastructure. The question is which pressures and institutional failures lead to armed escalation.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The historical record challenges the idea that scarcity automatically produces war. Yoffe, Wolf and Giordano's study of international water events from 1948 to 1999 found cooperation more common than conflict; most events were verbal exchanges. This is evidence of diplomatic activity, not proof that institutions will always succeed. Reservoir coordination can offer shared benefits, and the existence of a serious allocation dispute does not establish that fighting is unavoidable.",
      proponent_rebuttal:
        "Cooperation can be put under serious strain by changing flows, new dams and wider political disputes. Nile simulations show why coordinating reservoir releases during prolonged drought matters. India's 2025 decision to hold the Indus Waters Treaty in abeyance shows that a longstanding framework can become contested. Recent records also document violence involving water systems. These cases warrant attention, while leaving open how much scarcity contributes independently of other causes.",
      crux: {
        id: "scarcity-conflict-threshold",
        title: "The Scarcity-to-Conflict Threshold Test",
        question:
          "Is there a level of water scarcity beyond which cooperation breaks down into war?",
        description:
          "The question is whether worsening shortages increase armed-conflict risk under identifiable political and institutional conditions. Water availability, access and reservoir operations differ across basins; a single per-person threshold cannot establish when war becomes likely. Diplomatic hostility, armed violence and damage to water systems must be measured separately.",
        methodology:
          "Predefine comparable basin histories, hydrological shocks, allocation changes and outcomes. Separate interstate armed conflict from threats, local violence and attacks during existing wars. Measure treaty institutions, prior political relations, power asymmetry and economic dependence before the shock, account for reporting coverage, and validate predictions on withheld cases. Compare whether similar pressures produce different outcomes under different institutions; do not infer causation from a rising incident count alone.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A predefined comparison of basin histories linking measured water shocks to subsequent armed-conflict outcomes, accounting for prior political tensions, institutions and reporting coverage, with predictions checked on withheld cases.",
        },
        cost_to_verify:
          "Not costed here; scope depends on basin coverage, event coding and independent validation.",
        falsification: {
          supporter_flip:
            "If comparable basins experiencing severe water shocks consistently avoided armed escalation through workable allocation and dispute-resolution institutions, the claim that scarcity makes water wars unavoidable would weaken.",
          skeptic_flip:
            "If well-supported comparisons found that severe water shocks substantially increased armed-conflict risk even where credible cooperation mechanisms existed, confidence that institutions could contain the risk would weaken.",
          common_ground:
            "Both cases distinguish diplomatic conflict from armed violence, and water contributing to a conflict from water being damaged during an existing war.",
          live_disagreement:
            "How water shocks interact with political tensions and institutions to change armed-conflict risk, rather than whether any single scarcity threshold makes war inevitable.",
        },
      },
      evidence: [
        {
          id: "nile-gerd-dispute",
          title:
            "GERD Modeling: Drought Risk Depends on Reservoir Coordination",
          description:
            "Wheeler and colleagues' 2020 Nile simulations examined GERD filling, subsequent operation and prolonged drought. Their modeled normal operation benefited Ethiopia and Sudan without significantly affecting Egyptian water users, while multi-year drought required careful reservoir coordination to reduce harmful impacts. These are conditional hydrological scenarios, not observed post-inauguration outcomes or a model predicting war. They show why operating rules matter, without establishing inevitable downstream catastrophe.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "Wheeler et al., Nature Communications 11, 5222 (2020)",
          sourceUrl:
            "https://doi.org/10.1038/s41467-020-19089-x",
          reasoning:
            "The model identifies conditional water-management risks and shared benefits. Results depend on flows and operating assumptions; they do not identify political motives or establish a causal effect on armed conflict.",
        },
        {
          id: "indus-waters-treaty-stress",
          title:
            "Indus: India's 2025 Abeyance Decision and Continuing Arbitration",
          description:
            "India announced in April 2025 that the Indus Waters Treaty would be held in abeyance. On 27 June 2025, the treaty's Court of Arbitration ruled that its competence over the hydropower dispute was unaffected. India had challenged that competence. The PCA registry lists further proceedings and awards in 2026, including a treaty-status award on 31 August. This is evidence of a contested institutional framework, not proof that water caused military conflict.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "PCA, supplemental competence award release (June 27, 2025), and case 2023-01 registry",
          sourceUrl:
            "https://docs.pca-cpa.org/2025/06/b2159e4f-2023-01-20250627-press-release.pdf",
          reasoning:
            "The records establish procedural events and attributed positions. They do not measure a scarcity-driven causal effect, forecast river flows or show that dispute-resolution proceedings guarantee compliance.",
        },
        {
          id: "historical-cooperation-record",
          title:
            "1948-1999 Study: Cooperative Water Events Outnumbered Conflictive Ones",
          description:
            "Yoffe, Wolf and Giordano's 2003 study classified 1,831 reported international water events from 1948 to 1999: 1,228 cooperative, 507 conflictive and the rest neutral. Most were verbal exchanges. These counts describe coded interactions, not numbers of wars or conflict probabilities. They belong to the original study, not the expanded 1948-2008 database, and cannot establish how future disputes will unfold.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "Yoffe, Wolf and Giordano, JAWRA 39(5), 1109-1126 (2003), especially p. 1112",
          sourceUrl:
            "https://transboundarywaters.ceoas.oregonstate.edu/sites/transboundarywaters.ceoas.oregonstate.edu/files/Publications/Yoffe_Wolf_Giordano.pdf",
          reasoning:
            "A defined historical sample supports the cooperation finding for its period and coding rules. Source coverage and event definitions limit generalization; it is not a controlled test of what scarcity causes.",
        },
        {
          id: "sub-national-water-violence",
          title:
            "Pacific Institute Catalogued 420 Water-Linked Violent Incidents in 2024",
          description:
            "The Pacific Institute's November 2025 update reported 420 water-related violent incidents in 2024. The chronology includes disputes where water contributes to violence, deliberate use of water as a weapon, and damage to water systems during existing conflicts. Its reported-event totals are neither a count of interstate water wars nor an estimate of violence caused solely by scarcity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "Pacific Institute, Water Conflict Chronology update (November 11, 2025)",
          sourceUrl:
            "https://pacinst.org/announcement/pacific-institute-analysis-finds-surge-in-reported-water-related-violence/",
          reasoning:
            "Open-source incident documentation shows forms of water-related harm. Reporting coverage, retrospective additions and overlapping causes limit causal claims and comparisons with other event datasets.",
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
        question:
          "Can water technology reach the poorest, most stressed regions before their tipping points?",
        description:
          "The decisive question is whether desalination, water recycling, and precision agriculture can be deployed at sufficient scale and speed in the most water-stressed regions — particularly South Asia, Sub-Saharan Africa, and the Middle East — before aquifer depletion and climate disruption trigger irreversible agricultural collapse and mass displacement. If technology scales fast enough, the water crisis is a solvable engineering problem. If the deployment gap persists, technology will save wealthy nations while the poorest face catastrophe.",
        methodology:
          "Model the cost and timeline to deploy sufficient desalination and water recycling capacity to close the projected water deficit in the 20 most water-stressed nations by 2050. Include capital costs, energy requirements (and the energy infrastructure needed to support them), brine disposal capacity, institutional requirements, and financing mechanisms. Compare deployment timelines against aquifer depletion and climate disruption timelines to determine whether technological solutions can arrive before tipping points are reached.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Cost-and-timeline models for desalination, recycling and precision irrigation in the 20 most water-stressed nations, counting energy, brine disposal and financing, set against each region's aquifer depletion timeline.",
        },
        cost_to_verify:
          "$2-4M (Techno-economic modeling across 20 water-stressed nations integrating infrastructure, energy, and climate projections)",
        falsification: {
          supporter_flip:
            "If techno-economic modeling showed desalination, recycling, and precision irrigation could realistically be financed and built fast enough — given energy, brine-disposal, and institutional constraints — to close the projected deficit in the 20 most-stressed nations before aquifer and climate tipping points, then the 'deployment gap dooms the poorest' argument would collapse into a financing-and-engineering problem with a solvable timeline.",
          skeptic_flip:
            "If desalination stayed near $0.50/m³ and 3–4 kWh/m³, far above the groundwater farmers use, and drip irrigation stayed under 5% of farmland in South Asia and Sub-Saharan Africa despite subsidies, 'technology will scale like solar' would not reach landlocked smallholders in time.",
          common_ground:
            "Both sides agree the core technologies work and are getting cheaper (Israel and Singapore prove it at national scale), and that the binding constraints in poor regions are cost, energy, and institutions rather than physics.",
          live_disagreement:
            "Whether deployment in the most water-stressed, low-income regions can outpace depletion and climate disruption timelines — resolvable by modeling realistic capital, energy, and adoption curves against basin-specific tipping-point dates.",
        },
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
            "Desalination Produces More Brine Than Fresh Water, and Disposing of It Is Costly",
          description:
            "A 2019 global synthesis by the United Nations University counted 15,906 operational desalination plants producing about 95 million cubic meters of fresh water a day, nearly half of it in the Middle East and North Africa. The same plants discharge about 142 million cubic meters of hypersaline brine a day, roughly 1.5 times the fresh water they make and about 50% more than earlier estimates. Saudi Arabia, the UAE, Kuwait and Qatar alone account for 55% of the world's brine. The authors conclude that brine disposal is both costly and associated with negative environmental impacts, and that better brine management is needed to support further desalination.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "Jones et al., \"The state of desalination and brine production: A global outlook,\" Science of the Total Environment (2019), United Nations University (UNU-INWEH)",
          sourceUrl: "https://doi.org/10.1016/j.scitotenv.2018.12.076",
          reasoning:
            "The brine constraint on desalination is well quantified and is a genuine limit to scaling, concentrated in the regions that rely on desalination most. However, it is an engineering and cost challenge, not a physical impossibility: brine mining for mineral recovery and zero-liquid-discharge systems are under active development. The question is whether these solutions can mature fast enough to keep pace with growing demand.",
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
      title: "Wheeler et al., Understanding and managing new risks on the Nile with the Grand Ethiopian Renaissance Dam (2020)",
      url: "https://doi.org/10.1038/s41467-020-19089-x",
    },
    {
      title: "Yoffe, Wolf and Giordano, Conflict and cooperation over international freshwater resources (2003)",
      url: "https://transboundarywaters.ceoas.oregonstate.edu/sites/transboundarywaters.ceoas.oregonstate.edu/files/Publications/Yoffe_Wolf_Giordano.pdf",
    },
    {
      title: "Pacific Institute, reported water-related violence, November 2025 update",
      url: "https://pacinst.org/announcement/pacific-institute-analysis-finds-surge-in-reported-water-related-violence/",
    },
    {
      title: "PCA, Indus Waters Western Rivers Arbitration, supplemental competence award release (June 2025)",
      url: "https://docs.pca-cpa.org/2025/06/b2159e4f-2023-01-20250627-press-release.pdf",
    },
    {
      title: "PCA case 2023-01, registry of decisions and procedural developments",
      url: "https://pca-cpa.org/en/cases/284/",
    },
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
        "International Water Event Database, expanded 1948-2008 collection, Oregon State University",
      url: "https://transboundarywaters.ceoas.oregonstate.edu/international-water-event-database",
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
