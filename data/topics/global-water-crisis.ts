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
        "Groundwater observations show substantial depletion in particular regions, with large differences across wells, aquifers and periods. Glacier change adds another source of uncertainty for some river systems. The disagreement is whether feasible reductions in pumping and changes in farming can preserve water supplies and livelihoods before local constraints become severe.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Regional depletion does not establish a single global exhaustion date or an unavoidable path to war. Kansas measurements show that local pumping restrictions can be associated with slower groundwater declines. Better allocation, crop choices and irrigation management may extend the useful life of an aquifer, although benefits and costs differ among users. FAO's water-accounting guidance also makes clear that genuine conservation needs basin-scale evidence: applying less water to a field alone does not establish that more water is available elsewhere.",
      proponent_rebuttal:
        "Successful conservation in one management area does not establish that every stressed region can adapt in time. USGS estimates document a large historical loss of High Plains groundwater storage, while a satellite study found substantial depletion in northwestern India during 2002-2008. Slower decline still means declining water levels, and reduced pumping can impose costs on farmers and communities. The relevant risk is that feasible action may arrive too slowly to preserve viable irrigation, reliable domestic supplies and ecosystems in particular places.",
      crux: {
        id: "aquifer-depletion-timeline",
        title: "The Aquifer Depletion Timeline Test",
        question:
          "Can adaptation keep pace with aquifer depletion before farming in key regions collapses?",
        description:
          "The question is whether aquifer-dependent farming can reduce net depletion while preserving viable livelihoods. Pumping, recharge, return flows and crop-water consumption must be distinguished. Local well yields and costs can become limiting before all groundwater is exhausted; an aggregate storage estimate cannot supply a universal date for agricultural collapse.",
        methodology:
          "Combine local well observations with regional storage estimates and explicit uncertainty. Compare pumping, recharge, crop consumption and recoverable return flows under plausible climate and management changes. Track irrigated area, well yields, farm incomes and who bears adjustment costs. Validate forecasts on withheld years and compare conservation programs with credible counterfactuals. Count reductions in net depletion separately from reductions in water applied per hectare.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Well and pumping records combined with basin water budgets, tested against withheld years and credible conservation comparisons, showing whether net depletion slows enough to preserve viable farming and reliable supplies, with costs and uncertainty reported.",
        },
        cost_to_verify:
          "Not costed here; scope depends on basin data, program evaluation and hydrological validation.",
        falsification: {
          supporter_flip:
            "If independently checked conservation programs and subsequent well records showed durable reductions in net depletion while farming and essential supplies remained viable at manageable costs, the case that local water scarcity must produce catastrophic disruption would weaken.",
          skeptic_flip:
            "If credible program evaluations and well records showed that feasible pumping reductions and adaptation could not prevent severe losses of viable irrigation and essential supplies in heavily dependent regions, confidence in a manageable transition would weaken.",
          common_ground:
            "Both cases distinguish measured water levels from estimated storage, slower depletion from recovery, and field irrigation efficiency from basin-scale conservation.",
          live_disagreement:
            "Whether realistic changes in pumping and farming can preserve reliable water supplies and livelihoods within local hydrological and economic constraints.",
        },
      },
      evidence: [
        {
          id: "ogallala-depletion",
          title:
            "USGS Estimates High Plains Groundwater Storage Loss Through 2019",
          description:
            "USGS's 2024 report estimates recoverable High Plains aquifer storage in 2019 at about 2.91 billion acre-feet, 286.4 million acre-feet below predevelopment conditions around 1950. Water-level changes varied widely by well and region. The storage estimates combine water-level mapping with aquifer properties; they are not a direct satellite measurement or a uniform deadline for when irrigation becomes unviable.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "McGuire and Strauch, USGS Scientific Investigations Report 2023-5143 (published 2024)",
          sourceUrl:
            "https://pubs.usgs.gov/publication/sir20235143",
          reasoning:
            "Well observations support a substantial historical storage decline, with uncertainty from spatial interpolation and aquifer properties. Regional variation and economic pumping constraints matter for local consequences; this report does not estimate a causal effect on conflict.",
        },
        {
          id: "india-groundwater-crisis",
          title:
            "Northwestern India: Satellite-Based Depletion Estimate for 2002-2008",
          description:
            "Rodell and colleagues combined GRACE satellite storage observations with modeled soil-water changes to estimate groundwater depletion of 17.7 ± 4.5 cubic kilometers per year across Rajasthan, Punjab and Haryana, including Delhi, from August 2002 to October 2008. This is a regional storage-change estimate for that period, rather than a current national withdrawal total or a forecast of when particular cities will run out of water.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "Rodell, Velicogna and Famiglietti, Nature 460, 999-1002 (2009)",
          sourceUrl: "https://www.nature.com/articles/nature08238",
          reasoning:
            "Satellite gravity provides regional water-storage information; separating groundwater from other stores requires modeling and carries uncertainty. The result establishes depletion in its study region and period, without directly measuring every local well or remaining usable supply.",
        },
        {
          id: "glacier-retreat-asia",
          title:
            "Hindu Kush Himalayan Glacier Loss Accelerated in 2011-2020",
          description:
            "ICIMOD's 2023 HI-WISE assessment reports glacier loss 65% faster in 2011-2020 than in the previous decade. Its projection of up to 80% volume loss by 2100 depends on the emissions trajectory. The assessment describes 240 million mountain residents and 1.65 billion people downstream receiving water and ecosystem services from the region; those population totals are not counts of people facing the same imminent water shortage. Effects vary by river, season and source of flow.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "ICIMOD, Water, ice, society, and ecosystems in the Hindu Kush Himalaya (HI-WISE, 2023)",
          sourceUrl:
            "https://www.icimod.org/press-release/landmark-report-on-impacts-of-disappearing-snow-and-ice-in-the-hindu-kush-himalaya-current-emissions-path-threatens-two-billion-people-and-is-accelerating-species-extinction/",
          reasoning:
            "Observed glacier change and future scenarios provide evidence of changing water risks. Glacier volume, snowmelt, rainfall and population exposure are different measures, so local supply impacts require basin-specific analysis rather than a blanket flow percentage or deadline.",
        },
        {
          id: "water-efficiency-gains",
          title:
            "Sheridan-6: Slower Water-Level Declines Under Local Pumping Limits",
          description:
            "Kansas Geological Survey's 2023 assessment reports average annual groundwater declines in the Sheridan-6 management area of 0.5 feet during 2013-2022, compared with 2.0 feet during 2002-2012. The program combined local pumping limits, monitoring and farmer adjustments. This observational comparison supports the potential for conservation to slow depletion, while the continued decline and local setting limit claims about full recovery or results elsewhere.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Kansas Geological Survey, 2023 Status of the High Plains Aquifer in Kansas, institutional summary (December 2023)",
          sourceUrl:
            "https://kgs.ku.edu/node/512",
          reasoning:
            "Measured well records and water-use reporting make this a concrete adaptation example. Before-and-after comparisons still require care about climate and land use, and the result concerns a managed area rather than technology alone or a randomized global intervention.",
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
      title: "McGuire and Strauch, High Plains aquifer storage changes through 2019, USGS SIR 2023-5143 (2024)",
      url: "https://pubs.usgs.gov/publication/sir20235143",
    },
    {
      title: "Rodell, Velicogna and Famiglietti, Satellite-based estimates of groundwater depletion in India (2009)",
      url: "https://doi.org/10.1038/nature08238",
    },
    {
      title: "ICIMOD, HI-WISE assessment findings on Hindu Kush Himalayan ice and water (2023)",
      url: "https://www.icimod.org/press-release/landmark-report-on-impacts-of-disappearing-snow-and-ice-in-the-hindu-kush-himalaya-current-emissions-path-threatens-two-billion-people-and-is-accelerating-species-extinction/",
    },
    {
      title: "Kansas Geological Survey, 2023 High Plains aquifer assessment summary",
      url: "https://kgs.ku.edu/node/512",
    },
    {
      title: "FAO, Guidance on realizing real water savings with crop water productivity interventions (2021)",
      url: "https://openknowledge.fao.org/3/cb3844en/cb3844en.pdf",
    },
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
