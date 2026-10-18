export const globalWaterCrisisData = {
  id: "global-water-crisis",
  title: "Is the World Heading for Water Wars?",
  question: "Is the world heading for water wars?",
  meta_claim:
    "Freshwater scarcity will become the defining geopolitical conflict of the 21st century, potentially triggering wars and mass migration.",
  status: "contested" as const,
  category: "policy" as const,
  last_updated: "2026-10-18",
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
        "Desalination and wastewater reuse can supplement water supplies, but success in one setting does not establish affordable access everywhere. Costs depend on location, infrastructure and financing. Irrigation efficiency also needs water accounting: reducing field withdrawals does not necessarily reduce basin depletion. The disagreement concerns how quickly workable combinations can reach the people most exposed to shortages.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Water scarcity is not a fixed technological ceiling. The World Bank's desalination review documents operating plants and substantial differences in production costs. OECD's Israel review describes extensive wastewater treatment and reuse. These examples support adaptation as a practical possibility. Comparing locally suitable supply projects with conservation and demand management is more useful than assuming a shortage must become a catastrophe.",
      proponent_rebuttal:
        "Technical feasibility does not establish timely, affordable delivery. Desalination projects need financing, energy, transport infrastructure and brine management. Israel's experience also involves institutions and sustained investment, rather than equipment alone. For irrigation, lower application rates may leave basin consumption unchanged if return flows fall or farming expands. A successful transition must therefore demonstrate reliable service and lower depletion, including for users who cannot readily finance new systems.",
      crux: {
        id: "technology-deployment-gap",
        title: "The Technology Deployment Gap Test",
        question:
          "Can water technology reach the poorest, most stressed regions before their tipping points?",
        description:
          "Test whether locally suitable investments and conservation can maintain essential supplies and viable livelihoods before specific service or farming constraints become severe. Define those constraints by basin and population, rather than assuming a shared tipping-point date. A low plant price, installed capacity or improved field efficiency alone does not establish successful adaptation.",
        methodology:
          "Predefine representative coastal and inland cases, service needs and local hydrological limits. Compare supply projects, reuse, leakage reduction, pumping limits and crop changes using consistent water budgets. Include construction schedules, financing, energy reliability, transport, maintenance, environmental safeguards and household or farm affordability. Check modeled delivery against completed projects and subsequent service records. Report who gains access, who bears costs and whether basin depletion actually falls under alternative climate and demand scenarios.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Comparable basin plans checked against completed projects and service records, showing whether feasible investment and conservation deliver reliable, affordable water before defined local constraints, with net depletion, costs and distributional effects reported.",
        },
        cost_to_verify:
          "Not costed here; scope depends on the selected basins, project records and affordability analysis.",
        falsification: {
          supporter_flip:
            "If independently checked projects and conservation programs delivered reliable, affordable supplies to vulnerable users before defined local constraints while reducing net depletion, the claim that the deployment gap must cause catastrophic disruption would weaken.",
          skeptic_flip:
            "If credible project and service records showed persistent delivery failures, unaffordable costs or continuing net depletion despite feasible investment and management changes, confidence that technology could secure a manageable transition would weaken.",
          common_ground:
            "Both cases distinguish working technology from affordable delivery, installed capacity from reliable service, and irrigation efficiency from basin conservation.",
          live_disagreement:
            "Whether locally feasible investment and management changes can deliver reliable water to vulnerable users quickly enough, at costs they and their institutions can sustain.",
        },
      },
      evidence: [
        {
          id: "desalination-cost-decline",
          title:
            "World Bank's 2019 Review: Desalination Costs Vary Substantially by Site",
          description:
            "The World Bank's 2019 review reports seawater reverse-osmosis production costs ranging from US$0.64 to US$2.86 per cubic meter in its sample, at 2016 values. The report cautions that the lowest first-year bid prices involved special delivery conditions and later price increases. This is a historical project comparison, not a current universal price or a delivered tariff for households and farms.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "World Bank, The Role of Desalination in an Increasingly Water-Scarce World (2019), Table ES.1 and chapter 4",
          sourceUrl:
            "https://documents1.worldbank.org/curated/en/476041552622967264/pdf/135312-WP-PUBLIC-14-3-2019-12-3-35-W.pdf",
          reasoning:
            "Operating projects demonstrate a supply option. Differences in geography, financing, subsidies and utilization limit transferring the cheapest price to another setting or forecasting a universal cost trajectory.",
        },
        {
          id: "israel-water-model",
          title:
            "OECD's 2023 Israel Review Reports Extensive Wastewater Reuse",
          description:
            "OECD's 2023 review reports that about 94% of Israel's wastewater is collected and treated, and 87% is reused, primarily for agriculture. These are wastewater shares, not shares of total freshwater demand. The review also describes tariff-funded infrastructure and long-term public-private desalination arrangements. This demonstrates substantial reuse within a particular institutional system, without establishing a universal water surplus or easy transfer to other countries.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "OECD Environmental Performance Reviews: Israel 2023, water management and infrastructure investment",
          sourceUrl:
            "https://www.oecd.org/en/publications/oecd-environmental-performance-reviews-israel-2023_0175ae95-en/full-report/component-6.html",
          reasoning:
            "The national example supports the feasibility of extensive reuse. Infrastructure, water quality, institutions and financing affect transferability; a wastewater reuse percentage alone does not measure universal access or ecological recovery.",
        },
        {
          id: "desalination-energy-brine",
          title:
            "2019 Global Inventory Estimates Substantial Brine Production",
          description:
            "Jones and colleagues' 2019 synthesis identified 15,906 operational desalination plants producing about 95 million cubic meters of fresh water and an estimated 142 million cubic meters of brine daily. The authors identify disposal costs and environmental impacts as constraints. The roughly 1.5-to-1 ratio is an aggregate across the inventory, not a fixed ratio for every technology or plant, and these figures are not a current plant count.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "Jones et al., The state of desalination and brine production: A global outlook, Science of the Total Environment 657 (2019)",
          sourceUrl: "https://doi.org/10.1016/j.scitotenv.2018.12.076",
          reasoning:
            "The inventory supports including waste management in expansion plans. It does not establish identical local ecosystem damage at every outfall or show that environmentally managed desalination is impossible.",
        },
        {
          id: "smart-agriculture-adoption",
          title:
            "FAO: Irrigation Efficiency Alone Does Not Establish Real Water Savings",
          description:
            "FAO's 2021 guidance distinguishes lower water withdrawals from real savings in consumption and non-recoverable return flows. Field improvements can reduce water applied without making more water available to other users. Evaluating irrigation technology therefore needs district or basin accounting, including return flows and changes in crop consumption, rather than an assumed universal savings percentage.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Van Opstal et al., FAO, Guidance on realizing real water savings with crop water productivity interventions (2021)",
          sourceUrl:
            "https://openknowledge.fao.org/3/cb3844en/cb3844en.pdf",
          reasoning:
            "This is methodological guidance for measuring conservation, not an adoption survey or a prediction that irrigation programs must fail. Its relevance is to the claimed hydrological benefit of adaptation.",
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
      title: "World Bank, The Role of Desalination in an Increasingly Water-Scarce World (2019)",
      url: "https://documents1.worldbank.org/curated/en/476041552622967264/pdf/135312-WP-PUBLIC-14-3-2019-12-3-35-W.pdf",
    },
    {
      title: "OECD Environmental Performance Reviews: Israel 2023, water management and investment",
      url: "https://www.oecd.org/en/publications/oecd-environmental-performance-reviews-israel-2023_0175ae95-en/full-report/component-6.html",
    },
    {
      title: "Jones et al., The state of desalination and brine production: A global outlook (2019)",
      url: "https://doi.org/10.1016/j.scitotenv.2018.12.076",
    },
    {
      title: "World Bank, Groundswell: Acting on Internal Climate Migration, findings (2021)",
      url: "https://www.worldbank.org/en/news/feature/2021/09/13/millions-on-the-move-in-their-own-countries-the-human-face-of-climate-change",
    },
    {
      title: "Alex de Sherbinin, Groundswell lead author's explanation of the migration scenarios (2021)",
      url: "https://news.climate.columbia.edu/2021/09/14/climate-migration-projections/",
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
        "What does the 216 million climate-migration projection say about water?",
      content:
        "The World Bank's 2021 Groundswell findings describe up to 216 million internal climate migrants by 2050 across six regions. A lead author identifies that figure as the high end of the pessimistic scenario. The modeling includes water availability, crop productivity and sea-level rise; it is not a count of people displaced by water scarcity alone, a cross-border migration forecast or an observed outcome. Emissions, development and adaptation assumptions change the results. The useful question is which local water and livelihood changes increase pressure to move, and how policy can support people who stay or relocate.",
    },
    {
      id: "q2",
      title:
        "How can water conservation and affordable essential access work together?",
      content:
        "Compare policies on both net depletion and access to essential services. Prices, pumping limits, infrastructure investment and support for low-income users can distribute costs differently. A smaller irrigation withdrawal is not automatically a basin saving if recoverable return flows also fall. A credible proposal should specify the water budget, who pays, how essential access is protected and whether households or farmers can adapt. The disagreement is over workable combinations and their distributional effects, rather than a choice between charging for every use and allowing unlimited extraction.",
    },
    {
      id: "q3",
      title:
        "What does calling a dispute a 'water war' explain?",
      content:
        "Separate water contributing to a dispute, water being used as a weapon, and water infrastructure being damaged during another conflict. Those categories require different evidence and responses. Historical cooperation does not guarantee future peace, while a rising count of reported water-linked incidents does not establish that shortages caused more interstate wars. A useful account identifies the actors, water shock, prior political tensions and institutions, then asks what would have happened without that shock. The framing should help compare plausible responses rather than assume either inevitable war or effortless cooperation.",
    },
  ],
};
