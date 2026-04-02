import type { Topic } from "@/lib/schemas/topic";

export const labDiamondsEthicsData = {
  id: "lab-diamonds-ethics",
  title: "Are Lab-Grown Diamonds More Ethical Than Mined Diamonds?",
  meta_claim:
    "Lab-grown diamonds are the ethical choice — they avoid the human rights abuses and environmental destruction of diamond mining.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Human Rights and Conflict
    // =========================================================================
    {
      id: "human-rights-conflict",
      title: "Human Rights and Conflict",
      short_summary:
        "The diamond industry has a documented history of fueling civil wars and relying on exploitative artisanal mining labor. Lab-grown diamonds avoid these supply chains entirely, but the Kimberley Process and industry reforms have significantly reduced conflict diamond trade since 2003. The debate centers on whether current safeguards are sufficient or whether the structural incentives for exploitation persist.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The 'blood diamond' narrative is largely a relic of the 1990s civil wars in Sierra Leone, Angola, and the DRC. The Kimberley Process Certification Scheme, established in 2003 and now encompassing 85 countries representing 99.8% of global rough diamond production, has dramatically curtailed conflict diamond trade from an estimated 15% of global supply in the 1990s to less than 1% today. Major producers like De Beers and ALROSA have implemented blockchain-based traceability systems (De Beers' Tracr platform) that track stones from mine to retail. Artisanal and small-scale mining (ASM) employs an estimated 1.5 million people across Africa, and many of these communities depend on diamond income. Blanket condemnation of mined diamonds ignores the real progress made and the livelihoods at stake. Furthermore, lab-grown diamond factories in India and China — where the majority are produced — have their own labor concerns, including low wages and poor working conditions in cutting and polishing facilities.",
      proponent_rebuttal:
        "The Kimberley Process is widely acknowledged as deeply flawed — it defines 'conflict diamonds' narrowly as stones funding rebel groups fighting recognized governments, which excludes diamonds mined under state-sanctioned violence. Zimbabwe's Marange diamond fields, where security forces killed over 200 artisanal miners in 2008, were certified as conflict-free under the Kimberley Process. Global Witness, a founding member of the Kimberley Process, withdrew from the scheme in 2011, calling it 'an accomplice to diamond laundering.' An estimated 1 million artisanal diamond miners in sub-Saharan Africa work without basic safety equipment, earn less than $2 per day, and face chronic exposure to silicosis-causing dust. Child labor remains endemic in artisanal mining — the US Department of Labor lists diamonds from the Central African Republic, DRC, Guinea, Liberia, and Sierra Leone as produced with child labor. Lab-grown diamonds, whatever their imperfections, categorically eliminate the risk of funding violence or relying on exploitative mining labor.",
      crux: {
        id: "supply-chain-traceability",
        title: "The Supply Chain Traceability Test",
        description:
          "Whether existing certification and traceability systems can reliably guarantee that a mined diamond was not produced under conditions of violence, forced labor, or child labor. If the Kimberley Process and blockchain traceability platforms can provide mine-to-market verification for the majority of diamonds, the human rights case for lab-grown becomes weaker. If significant gaps in traceability persist — especially for artisanal production — the ethical advantage of lab-grown diamonds remains substantial.",
        methodology:
          "Conduct an independent audit of diamond supply chains from major producing countries (Botswana, Russia, Canada, DRC, Angola, Zimbabwe). Trace a random sample of 1,000 certified diamonds from retail back to their mine of origin using existing Kimberley Process documentation and blockchain platforms. Assess what percentage can be verified to the specific mine, what percentage have gaps in chain of custody, and cross-reference with documented human rights violations at origin sites.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Independent supply chain audit across multiple producing countries)",
      },
      evidence: [
        {
          id: "kimberley-process-limitations",
          title:
            "Kimberley Process Excludes State-Sanctioned Violence from 'Conflict' Definition",
          description:
            "The Kimberley Process defines conflict diamonds only as rough diamonds used to finance rebel movements against recognized governments. This narrow definition allowed diamonds from Zimbabwe's Marange fields — where the military killed over 200 artisanal miners and used forced labor — to be certified as conflict-free. Global Witness withdrew from the Kimberley Process in 2011 over this issue.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "Global Witness; Human Rights Watch",
          sourceUrl:
            "https://www.globalwitness.org/en/archive/global-witness-leaves-kimberley-process-calls-diamond-trade-be-held-accountable/",
          reasoning:
            "Global Witness was a founding member of the Kimberley Process and its withdrawal is a matter of public record. The Marange abuses are documented by multiple independent human rights organizations. Directly demonstrates that existing certification cannot guarantee ethical sourcing.",
        },
        {
          id: "artisanal-mining-child-labor",
          title:
            "US Department of Labor Lists Diamonds from 5 African Nations as Produced with Child Labor",
          description:
            "The US Department of Labor's List of Goods Produced by Child Labor or Forced Labor includes diamonds from the Central African Republic, the Democratic Republic of the Congo, Guinea, Liberia, and Sierra Leone. An estimated 200,000 children work in artisanal diamond mining in sub-Saharan Africa, according to UNICEF and the ILO. These children face hazardous conditions including collapsing mine shafts, mercury exposure, and loss of educational opportunity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "US Department of Labor; UNICEF; International Labour Organization",
          sourceUrl:
            "https://www.dol.gov/agencies/ilab/reports/child-labor/list-of-goods",
          reasoning:
            "The US DOL list is a government-compiled, evidence-based resource. ILO and UNICEF are authoritative international bodies. Child labor in artisanal diamond mining is a well-documented phenomenon that lab-grown production categorically avoids.",
        },
        {
          id: "kimberley-process-progress",
          title:
            "Conflict Diamond Trade Reduced from 15% to Under 1% Since Kimberley Process",
          description:
            "Before the Kimberley Process, conflict diamonds were estimated to represent 4-15% of global diamond trade, funding civil wars that killed millions in Sierra Leone, Angola, and the DRC. Since its implementation in 2003, conflict diamonds are estimated at less than 1% of global trade. Major producers Botswana and Canada have strong regulatory frameworks, and De Beers' Tracr blockchain platform now tracks over a third of global production from mine to retail.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Kimberley Process; World Diamond Council; De Beers Group",
          reasoning:
            "The reduction in conflict diamond trade is real and significant. However, industry self-reporting raises independence concerns, the narrow definition of 'conflict' understates ongoing abuses, and the 1% figure excludes state violence and exploitative artisanal mining conditions.",
        },
        {
          id: "lab-diamond-labor-concerns",
          title:
            "Lab-Grown Diamond Cutting and Polishing Concentrated in Low-Wage Indian Facilities",
          description:
            "Over 90% of the world's diamonds — both mined and lab-grown — are cut and polished in Surat, India, where workers earn $150-300 per month and face occupational hazards including repetitive strain injuries and silicosis from diamond dust. Lab-grown diamonds do not eliminate downstream labor concerns, as they pass through the same cutting centers as mined stones.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Reuters; The Guardian; Gem & Jewellery Export Promotion Council of India",
          reasoning:
            "Valid point that lab-grown diamonds share post-production labor concerns with mined diamonds. However, directness is moderate because this is a shared industry problem, not a reason to prefer mined over lab-grown — it affects both equally and does not offset the upstream mining abuses that lab-grown avoids.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Environmental Impact
    // =========================================================================
    {
      id: "environmental-impact",
      title: "Environmental Impact",
      short_summary:
        "Diamond mining causes massive land disruption, water contamination, and significant carbon emissions. Lab-grown diamonds avoid land destruction but require enormous energy — often sourced from coal-fired grids in India and China. The true environmental comparison depends heavily on the energy source powering lab production.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Lab-grown diamond producers market themselves as the green alternative, but the energy math tells a different story. Growing a single one-carat diamond by Chemical Vapor Deposition (CVD) requires approximately 250-750 kWh of electricity, depending on the process and equipment. The majority of lab-grown diamonds are produced in India and China, where the electrical grid is 60-75% coal-powered. A 2023 analysis by Trucost (an S&P Global division) estimated that lab-grown diamonds produced on India's grid generate roughly 510 kg of CO₂ per polished carat — comparable to or exceeding the carbon footprint of efficiently mined diamonds from producers like Botswana's Debswana (160 kg CO₂ per carat). HPHT (High Pressure, High Temperature) production is even more energy-intensive. Furthermore, lab-grown diamond factories consume significant quantities of methane gas and industrial chemicals. The 'zero environmental impact' marketing claims by lab-grown producers are misleading at best.",
      proponent_rebuttal:
        "The comparison must account for the full scope of mining's environmental destruction, not just carbon emissions. Open-pit diamond mines like Mirny (Russia), Jwaneng (Botswana), and Catoca (Angola) create craters visible from space — the Mirny mine is 525 meters deep and 1.2 kilometers wide. Diamond mining globally disturbs an estimated 1,750 acres of land per million carats produced, destroys ecosystems, and generates billions of tons of waste rock. The 2023 collapse of a tailings dam at an Angola diamond mine contaminated rivers serving millions of people. Water usage in diamond mining averages 480 liters per carat, often in water-scarce regions. While lab-grown production is energy-intensive, the energy source is a solvable problem — companies like Diamond Foundry use 100% hydroelectric power, producing diamonds at under 20 kg CO₂ per carat. Mining's land destruction and water contamination are inherent and irreversible. As electrical grids decarbonize, the environmental gap between lab-grown and mined diamonds will widen decisively in favor of lab-grown.",
      crux: {
        id: "lifecycle-carbon-comparison",
        title: "The Full Lifecycle Carbon and Environmental Comparison",
        description:
          "Whether lab-grown diamonds have a lower total environmental footprint than mined diamonds when accounting for carbon emissions, land use, water consumption, ecosystem disruption, and waste generation across the full production lifecycle. If lab-grown production on current grids already matches or beats mining, the environmental case is clear. If coal-powered lab production exceeds mining's carbon footprint, the advantage depends on grid decarbonization timelines.",
        methodology:
          "Commission an independent, ISO 14044-compliant comparative life cycle assessment (LCA) covering: (1) cradle-to-gate carbon emissions for lab-grown diamonds produced on grids of varying carbon intensity (India, China, US, renewable-powered), (2) cradle-to-gate carbon emissions for mined diamonds from major producers (Botswana, Russia, Canada, Australia), (3) land use change and ecosystem disruption, (4) water consumption and contamination, (5) waste rock and tailings generation. Normalize all metrics per polished carat.",
        equation:
          "E_{total} = E_{energy} + E_{land} + E_{water} + E_{waste} + E_{transport}",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Independent comparative LCA with site-specific data from major producers)",
      },
      evidence: [
        {
          id: "mining-land-destruction",
          title:
            "Diamond Mining Creates Massive Land Disruption — 1,750 Acres per Million Carats",
          description:
            "Open-pit diamond mines create some of the largest human-made excavations on Earth. The Mirny mine in Russia is 525 meters deep and 1.2 km across. Globally, diamond mining disturbs an estimated 1,750 acres of land per million carats, displaces local communities, destroys habitats, and generates billions of tons of waste rock. Ecosystem restoration at former mine sites takes decades and is rarely completed to pre-mining conditions.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Environmental Science & Technology; UNEP Mining Reports",
          reasoning:
            "Land destruction is inherent to open-pit mining and well-documented through satellite imagery. Lab-grown production requires only factory floor space, categorically eliminating this impact.",
        },
        {
          id: "lab-grown-coal-power",
          title:
            "Majority of Lab-Grown Diamonds Produced on Coal-Heavy Grids (India, China)",
          description:
            "An estimated 60-70% of lab-grown diamonds are produced in India and China, where electrical grids rely on coal for 60-75% of generation. A Trucost (S&P Global) analysis estimated lab-grown diamonds produced on India's grid generate approximately 510 kg CO₂ per polished carat. Some HPHT processes consume up to 750 kWh per carat. Marketing claims of 'zero carbon' or 'sustainable' production often fail to account for the actual grid mix.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Trucost (S&P Global); Diamond Producers Association",
          reasoning:
            "The energy consumption data is credible, though industry-funded studies may overstate lab-grown emissions. The core point — that coal-powered lab production has a significant carbon footprint — is valid. However, this compares only one dimension (carbon) while ignoring land, water, and ecosystem impacts where mining performs worse.",
        },
        {
          id: "renewable-powered-lab-diamonds",
          title:
            "Renewable-Powered Lab Diamonds Achieve Under 20 kg CO₂ per Carat",
          description:
            "Diamond Foundry, a US-based lab-grown producer, operates using 100% hydroelectric power and has been certified carbon-neutral by third-party auditors. Their production emits under 20 kg CO₂ per carat — roughly 8-10x less than the most efficient mining operations (Debswana at ~160 kg CO₂) and 25x less than coal-grid lab production. As renewable energy expands, all lab producers can eventually achieve similar footprints.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Diamond Foundry; SCS Global Services certification",
          reasoning:
            "Demonstrates that the energy problem is solvable with current technology. Independence score is lower because the data comes partly from the company itself. Replicability depends on access to renewable energy, which is expanding but not yet universal for lab-grown production.",
        },
        {
          id: "mining-water-contamination",
          title:
            "Diamond Mining Consumes 480 Liters per Carat and Risks Water Contamination",
          description:
            "Diamond mining operations consume an average of 480 liters of water per carat produced, often in water-scarce regions of sub-Saharan Africa. Tailings dams holding mining waste have failed catastrophically — a 2023 dam collapse at Angola's Catoca mine sent contaminated waste into rivers serving millions. Acid mine drainage from abandoned diamond mines continues to pollute groundwater decades after closure.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "UNEP; Water Resources Research; Angolan Ministry of Environment",
          reasoning:
            "Water impacts of mining are well-documented and inherent to the extraction process. Lab-grown production uses minimal water by comparison. The Catoca dam failure demonstrates the catastrophic tail risk of mining waste infrastructure.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Economic Impact on Mining Communities
    // =========================================================================
    {
      id: "economic-impact-mining-communities",
      title: "Economic Impact on Mining Communities",
      short_summary:
        "Diamond mining is a pillar of national economies in Botswana, Namibia, and several other African nations. Botswana's diamond industry accounts for roughly 25% of GDP and has funded the country's transformation from one of the world's poorest nations to an upper-middle-income country. The shift to lab-grown diamonds threatens these livelihoods. Critics argue the ethical calculus must weigh the harm of displacing mining communities against the abuses lab-grown production avoids.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The push toward lab-grown diamonds as 'ethical' ignores the devastating economic consequences for the developing nations that depend on diamond revenue. Botswana — often cited as Africa's greatest development success story — derives approximately 25% of its GDP, 80% of its export earnings, and 33% of government revenue from diamond mining through its partnership with De Beers (Debswana). Diamond revenues have funded universal education, healthcare infrastructure, and one of the continent's highest per-capita incomes. Namibia's Namdeb Holdings employs 3,000 workers directly and supports an estimated 20,000 dependents. Across southern Africa, an estimated 10 million people depend directly or indirectly on diamond mining for their livelihoods. Declaring lab-grown diamonds 'ethical' while destroying the economic foundation of some of Africa's most stable nations is a form of economic colonialism dressed in progressive language. The 'ethical' choice is to support responsible mining that lifts communities out of poverty, not to eliminate their primary industry.",
      proponent_rebuttal:
        "The economic dependency argument is real but incomplete. First, it conflates Botswana's relatively well-regulated mining sector with the artisanal mining that employs millions in far worse conditions across the DRC, Sierra Leone, and the Central African Republic — the very supply chains most associated with exploitation. Second, economic dependency on a finite, depleting resource is itself a vulnerability. Botswana's diamond reserves are expected to be significantly depleted by 2050, and the country is already pursuing economic diversification. Third, the 'economic colonialism' framing ignores that the diamond industry was itself a product of colonial extraction — De Beers was founded by Cecil Rhodes. Fourth, market data shows mined diamond demand is shifting toward high-end luxury while lab-grown captures the mid-market — this is a market restructuring, not elimination. Countries that invest in diversification now will be better positioned than those that cling to a declining industry.",
      crux: {
        id: "economic-dependency-alternatives",
        title: "The Economic Transition Feasibility Test",
        description:
          "Whether diamond-dependent economies can successfully diversify before lab-grown market share erodes mining revenue to economically damaging levels. If Botswana, Namibia, and others can transition to alternative revenue sources while maintaining living standards, the ethical case for lab-grown is strengthened. If the transition proves too slow or costly, the shift to lab-grown diamonds may inflict net harm on vulnerable populations.",
        methodology:
          "Model the projected decline in mined diamond demand under various lab-grown market share scenarios (20%, 40%, 60% by 2035). For each major diamond-producing country, assess: (1) current economic dependency on diamond revenue, (2) diversification progress and alternative revenue sources, (3) social safety net capacity to absorb displaced workers, (4) timeline for diamond reserve depletion regardless of lab-grown competition. Compare the economic impact of gradual lab-grown displacement against the counterfactual of reserve depletion.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-700K (Economic modeling with country-specific data from World Bank, IMF, and producing nations)",
      },
      evidence: [
        {
          id: "botswana-development-success",
          title:
            "Botswana's Diamond-Funded Development: From Poorest to Upper-Middle Income",
          description:
            "At independence in 1966, Botswana had 12 km of paved road and a per-capita GDP of $70. Diamond mining, launched through the Debswana partnership in 1967, transformed the country into Africa's longest-running democracy with a per-capita GDP of over $7,000. Diamond revenue funded universal primary education, one of Africa's best healthcare systems, and foreign exchange reserves exceeding $5 billion. The Botswana model is frequently cited as evidence that resource extraction can drive development when paired with good governance.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "World Bank; IMF Country Reports; Acemoglu & Robinson (2012)",
          reasoning:
            "Botswana's development story is one of the best-documented cases in development economics. The causal role of diamond revenue is well-established. Directly demonstrates that diamond mining has delivered enormous positive outcomes for at least one African nation. Replicability is lower because Botswana's success depended on uniquely good governance that other diamond-producing nations have not replicated.",
        },
        {
          id: "artisanal-mining-livelihoods",
          title:
            "10 Million People in Africa Depend on Diamond Mining Livelihoods",
          description:
            "An estimated 1.5 million artisanal and small-scale diamond miners work across sub-Saharan Africa, supporting approximately 10 million dependents. In countries like Sierra Leone and the DRC, artisanal mining is one of few available income sources in rural areas. While conditions are often poor, eliminating demand for mined diamonds without providing alternative livelihoods would deepen poverty for these communities.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Diamond Development Initiative; World Bank Artisanal Mining Report",
          reasoning:
            "Livelihood dependency data comes from credible development organizations. The ethical tension is real — poor mining conditions are bad, but no income is often worse. However, this argument implicitly accepts exploitation as preferable to unemployment, rather than demanding better alternatives.",
        },
        {
          id: "lab-grown-market-disruption",
          title:
            "Lab-Grown Diamonds Captured 20% of Engagement Ring Market by 2025",
          description:
            "Lab-grown diamonds grew from under 2% of the diamond jewelry market in 2018 to approximately 20% of the US engagement ring market by 2025, driven by 70-85% lower prices per carat. Morgan Stanley projected lab-grown could reach 30-40% of the bridal market by 2030. Mined diamond prices have declined 20-30% in response to lab-grown competition, directly reducing revenue for producing nations.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Morgan Stanley; Bain & Company Diamond Industry Report; Edahn Golan Diamond Research",
          reasoning:
            "Market data from major financial institutions is reliable. The rapid market share growth demonstrates that consumer preferences are already shifting, making the economic transition question urgent regardless of ethical arguments. Directness is moderate because market disruption is economic data, not a direct measure of ethical impact.",
        },
        {
          id: "resource-depletion-diversification",
          title:
            "Botswana's Diamond Reserves Expected to Deplete Significantly by 2050",
          description:
            "Botswana's major diamond mines, including the flagship Jwaneng mine, are projected to see significant production declines by 2040-2050 as reserves deplete. The Botswana government has acknowledged this timeline and launched Vision 2036, a national development plan emphasizing economic diversification into financial services, technology, and tourism. The need for diversification exists regardless of lab-grown competition — lab-grown merely accelerates an inevitable transition.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Botswana Vision 2036; De Beers Annual Reports; World Bank Botswana Assessment",
          reasoning:
            "Resource depletion timelines are based on geological surveys and production data. The argument that mining communities face economic transition regardless of lab-grown competition is logically strong and reframes the ethical question from 'should we protect mining jobs' to 'should we help communities transition sooner or later.'",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Global Witness: Why We Left the Kimberley Process (2011)",
      url: "https://www.globalwitness.org/en/archive/global-witness-leaves-kimberley-process-calls-diamond-trade-be-held-accountable/",
    },
    {
      title:
        "Bain & Company: The Global Diamond Industry 2023-2024 Report",
      url: "https://www.bain.com/insights/global-diamond-industry-report-2024/",
    },
    {
      title:
        "Trucost (S&P Global): Environmental Impact of Diamond Production — Mined vs Lab-Grown",
      url: "https://www.spglobal.com/esg/trucost",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Can the Kimberley Process be reformed to address state violence and artisanal mining abuses?",
      content:
        "The Kimberley Process reduced conflict diamond trade from 15% to under 1%, but its narrow definition of 'conflict' excludes state-sanctioned violence and exploitative artisanal mining conditions. Global Witness withdrew from the scheme in 2011, and child labor persists in multiple producing countries. Can the certification system be reformed to cover all forms of abuse, or is supply chain opacity inherent to an industry that spans dozens of countries and millions of informal workers?",
    },
    {
      id: "q2",
      title:
        "Does the energy source of lab-grown production determine the environmental winner?",
      content:
        "Lab-grown diamonds produced on India's coal-heavy grid may emit 510 kg CO₂ per carat — comparable to mined diamonds. But renewable-powered producers like Diamond Foundry achieve under 20 kg CO₂ per carat, far below any mining operation. Meanwhile, mining causes irreversible land destruction, water contamination, and ecosystem loss that carbon accounting alone does not capture. Should environmental comparisons focus solely on carbon, or must they include land, water, and biodiversity impacts?",
    },
    {
      id: "q3",
      title:
        "Is it ethical to accelerate the decline of diamond mining economies in southern Africa?",
      content:
        "Botswana transformed from one of the world's poorest nations to an upper-middle-income country largely through diamond revenue. Across Africa, 10 million people depend on diamond mining livelihoods. But diamond reserves are depleting regardless, and the industry's colonial origins complicate the 'protecting livelihoods' narrative. Should consumers factor the economic impact on producing nations into their diamond purchasing decisions, or is that a form of coerced dependency?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
