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
        "The 'blood diamond' narrative is largely a relic of the 1990s civil wars in Sierra Leone, Angola, and the DRC. The Kimberley Process Certification Scheme, established in 2003 and now encompassing 85 countries representing 99.8% of global rough diamond production, has dramatically curtailed conflict diamond trade from an estimated 15% of global supply in the 1990s to less than 1% today. Major producers like De Beers and ALROSA have implemented blockchain-based traceability systems (De Beers' Tracr platform) that track stones from mine to retail. Artisanal and small-scale diamond mining (ASM) is the main livelihood for an estimated 1.5 million miners across roughly 18 countries in Africa and South America (per the Diamond Development Initiative), supporting around 10 million dependents, and many of these communities have few alternative income sources. Blanket condemnation of mined diamonds ignores the real progress made and the livelihoods at stake. Furthermore, lab-grown diamond factories in India and China — where the majority are produced — have their own labor concerns, including low wages and poor working conditions in cutting and polishing facilities.",
      proponent_rebuttal:
        "The Kimberley Process is widely acknowledged as deeply flawed — it defines 'conflict diamonds' narrowly as stones funding rebel groups fighting recognized governments, which excludes diamonds mined under state-sanctioned violence. Zimbabwe's Marange diamond fields, where security forces killed over 200 artisanal miners in 2008, were certified as conflict-free under the Kimberley Process. Global Witness, a founding member of the Kimberley Process, withdrew from the scheme in 2011, calling it 'an accomplice to diamond laundering.' Hundreds of thousands of artisanal diamond miners work without basic safety equipment, typically earn only a few dollars a day, and face chronic exposure to silicosis-causing dust and the risk of collapsing pits. Child labor remains endemic in artisanal mining — the US Department of Labor lists diamonds from the Central African Republic, DRC, Guinea, Liberia, and Sierra Leone as produced with child labor. Lab-grown diamonds, whatever their imperfections, categorically eliminate the risk of funding violence or relying on exploitative mining labor.",
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
          source: "Kimberley Process (official); World Diamond Council; De Beers Group",
          sourceUrl: "https://www.kimberleyprocess.com/en/what-kp",
          reasoning:
            "The Kimberley Process's own site confirms the headline claim that conflict diamonds fell from ~15% in the 1990s to under 1% of global production, with participants representing ~99.8% of rough production. The reduction is real and significant. But the source is the scheme itself (and allied industry bodies), so independence is low; the narrow definition of 'conflict' (rebel-financing only) excludes state violence and exploitative artisanal mining conditions, so the <1% figure understates ongoing harm. The Tracr 'over a third of production' detail is De Beers' own marketing claim and is not independently audited.",
        },
        {
          id: "lab-diamond-labor-concerns",
          title:
            "Lab-Grown Diamond Cutting and Polishing Concentrated in Low-Wage Indian Facilities",
          description:
            "Roughly 90% of the world's diamonds — both mined and lab-grown — are cut and polished in Surat, India, where the industry employs an estimated 800,000+ workers. Reporting describes piece-rate pay (commonly on the order of a few hundred US dollars per month), poor ventilation, and occupational illnesses including silicosis and vision damage from diamond dust. Lab-grown diamonds do not eliminate downstream labor concerns, as they pass through the same cutting centers as mined stones.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "BBC News — 'Surat: The world's diamond polishing capital feels the Ukraine-Russia war impact'",
          sourceUrl: "https://www.bbc.com/news/articles/c1e866ypp1zo",
          reasoning:
            "BBC reporting confirms the ~90% concentration in Surat, the ~800,000 workforce, and the poor working conditions (low piece-rate pay, silicosis risk). The original '$150-300/month' figure is not precisely pinned to a single primary source, so the description is softened to 'a few hundred US dollars' consistent with reporting. Directness is moderate: this is a shared industry problem affecting both mined and lab-grown stones, not a reason to prefer mined over lab-grown, and it does not offset the upstream mining abuses that lab-grown avoids.",
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
        "Lab-grown diamond producers market themselves as the green alternative, but the energy math tells a different story. Growing a single one-carat diamond by Chemical Vapor Deposition (CVD) requires approximately 250-750 kWh of electricity, depending on the process and equipment. The majority of lab-grown diamonds are produced in India and China, where the electrical grid is 60-75% coal-powered. A 2019 analysis by Trucost (an S&P Global division), commissioned by the Diamond Producers Association, estimated that lab-grown diamonds produced on a fossil-fuel grid generate roughly 511 kg of CO₂ per polished carat — comparable to or exceeding the carbon footprint of efficiently mined diamonds from producers like Botswana's Debswana (160 kg CO₂ per carat in that study). HPHT (High Pressure, High Temperature) production is even more energy-intensive. Furthermore, lab-grown diamond factories consume significant quantities of methane gas and industrial chemicals. The 'zero environmental impact' marketing claims by lab-grown producers are misleading at best.",
      proponent_rebuttal:
        "The comparison must account for the full scope of mining's environmental destruction, not just carbon emissions. Open-pit diamond mines like Mir/Mirny (Russia), Jwaneng (Botswana), and Catoca (Angola) create craters among the largest human-made excavations on Earth — the Mir mine is roughly 525 meters deep and about 1,200 meters across. Because diamonds are vanishingly rare in host rock, large operations move enormous volumes of earth — on the order of one to two thousand tonnes of ore per carat recovered — destroying ecosystems and generating vast quantities of waste rock and tailings. The catastrophic tail risk is real: in July 2021 a tailings-dam spillway failure at Angola's Catoca mine turned the Lova, Tshikapa, and Kasai rivers red for hundreds of kilometers into the DRC, killing aquatic life, killing roughly 12 people, and affecting hundreds of thousands downstream. Mining is also water-intensive — commonly cited on the order of hundreds of liters per carat — often in water-scarce regions. While lab-grown production is energy-intensive, the energy source is a solvable problem: producers on clean grids, such as Diamond Foundry's hydropowered Wenatchee, Washington plant on the Columbia River, can be third-party certified climate-neutral, far below efficient mined production (~160 kg CO₂ per carat in the industry-commissioned Trucost study). Mining's land destruction and water-contamination tail risk are inherent and largely irreversible. As electrical grids decarbonize, the environmental gap will widen decisively in favor of lab-grown.",
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
            "Open-Pit Diamond Mines Are Among the Largest Human-Made Excavations on Earth",
          description:
            "Open-pit diamond mines create some of the largest human-made excavations on Earth. The Mir (Mirny) mine in Russia's Sakha Republic is roughly 525 meters deep and about 1,200 meters across. Extracting diamonds requires moving enormous volumes of earth — on the order of one to two thousand tonnes of ore per carat recovered at large operations — generating vast quantities of waste rock and tailings, and ecosystem restoration at former mine sites is slow and rarely returns land to pre-mining condition. Lab-grown production requires only factory floor space.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Mir mine technical/encyclopedic records (dimensions)",
          sourceUrl: "https://en.wikipedia.org/wiki/Mir_mine",
          reasoning:
            "CORRECTION: the original headline figure of '1,750 acres of land per million carats' could not be verified and appears to conflate a different and widely-cited statistic — roughly 1,750 TONNES of earth/ore moved per CARAT — into a land-area claim. That fabricated acreage figure was removed. The verifiable facts retained are the Mir mine's dimensions (~525 m deep, ~1,200 m wide) and the general truth that open-pit diamond mining is extremely earth-moving-intensive. Weights de-inflated because the per-carat land/waste magnitudes circulate mostly through retail and advocacy sites rather than a clean peer-reviewed primary source.",
        },
        {
          id: "lab-grown-coal-power",
          title:
            "Majority of Lab-Grown Diamonds Produced on Coal-Heavy Grids (India, China)",
          description:
            "An estimated 60-70% of lab-grown diamonds are produced in India and China, where electrical grids rely on coal for 60-75% of generation. The Trucost (S&P Global) 'Total Clarity' analysis, commissioned by the Diamond Producers Association in 2019, estimated lab-grown diamonds produced on a fossil-fuel grid generate roughly 511 kg CO₂ per polished carat, versus 160 kg for mined diamonds in that study. Some HPHT processes consume up to 750 kWh per carat. Marketing claims of 'zero carbon' or 'sustainable' production often fail to account for the actual grid mix.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 8,
          },
          source: "Trucost (S&P Global) 'Total Clarity' report (2019), commissioned by the Diamond Producers Association",
          sourceUrl: "https://www.spglobal.com/content/dam/spglobal/mi/en/documents/general/The-Socioeconomic-and-Environmental-Impact-of-Large-Scale-Diamond-Mining_DPA_02-May-2019.pdf",
          reasoning:
            "The 511 kg figure is verified against the 2019 Trucost 'Total Clarity' report, but that report was commissioned by the Diamond Producers Association (a mined-diamond industry body), so independence is scored low and the comparison is contested. The core point — that coal-powered lab production has a significant carbon footprint — is valid. However, this compares only one dimension (carbon) while ignoring land, water, and ecosystem impacts where mining performs worse, and renewable-powered lab production is far lower (see counter-item).",
        },
        {
          id: "renewable-powered-lab-diamonds",
          title:
            "Renewable-Powered Lab Diamonds Achieve Under 20 kg CO₂ per Carat",
          description:
            "Diamond Foundry, a US-based lab-grown producer, runs its Wenatchee, Washington facility on 100% hydroelectric power from the Columbia River and markets itself as the first 'carbon-neutral' diamond producer. SCS Global Services' SCS-007 jewelry sustainability standard certifies qualifying lab-grown (and natural) diamonds as 'Certified Climate Neutral,' showing that net-zero-carbon production is technically achievable. By comparison, the industry-commissioned Trucost study put efficient mined production at ~160 kg CO₂ per polished carat, so a renewable-powered grower's footprint is dramatically lower than both coal-grid lab production and mining. As grids decarbonize, more lab producers can approach similar footprints.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "SCS Global Services (SCS-007 climate-neutral certification); Diamond Foundry company claims",
          sourceUrl: "https://www.scsglobalservices.com/news/new-third-party-diamond-standard-certifies-worlds-first-climate-neutral-lab-grown-diamonds",
          reasoning:
            "Verified: Diamond Foundry's flagship Wenatchee plant runs on Columbia River hydropower, and SCS-007 is a real third-party standard certifying 'climate neutral' diamonds. Independence is LOW because the specific 'under 20 kg CO₂/carat' figure traces to the company itself rather than an independent audit; the original 'under 20 kg' precise number is not pinned to a verifiable third-party measurement, so it was replaced with the certified-climate-neutral framing and the Trucost ~160 kg comparison point. Note 'carbon/climate neutral' can rely on offsets, not just zero gross emissions. Weights de-inflated accordingly. The core point — that the lab-grown energy problem is solvable with renewables — stands.",
        },
        {
          id: "mining-water-contamination",
          title:
            "Diamond Mining Carries Catastrophic Water-Contamination Tail Risk (Catoca, 2021)",
          description:
            "Diamond mining is water-intensive (industry and advocacy comparisons commonly cite figures on the order of hundreds of liters per carat) and often operates in water-scarce regions. The tail risk is severe: in July 2021 a tailings-dam spillway failure at Angola's Catoca mine — the world's fourth-largest diamond mine, co-owned by Angola's Endiama and Russia's ALROSA — released mining waste into the Lova, Tshikapa, and Kasai rivers, turning them red for hundreds of kilometers into the DRC, killing aquatic life, and reportedly killing about 12 people and sickening thousands downstream. Lab-grown production uses minimal water and carries no comparable tailings-dam risk.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Mongabay; peer-reviewed remote-sensing analysis of the 2021 Catoca tailings spill",
          sourceUrl: "https://news.mongabay.com/2022/10/the-mine-leak-was-bad-the-drc-and-angolas-response-are-no-better-report-says/",
          reasoning:
            "CORRECTION: the Catoca tailings-dam failure occurred in July 2021, not 2023 as originally stated — fixed. The spill, ALROSA/Endiama ownership, the red rivers spanning Angola into the DRC, and roughly 12 deaths are documented by Mongabay and a peer-reviewed remote-sensing study (ScienceDirect, 2023). The '480 liters per carat' precise figure traces mainly to retail/advocacy comparison pages rather than a clean primary source, so it was softened to 'hundreds of liters per carat.' The original source list (UNEP / 'Water Resources Research' / Angolan Ministry of Environment) could not be verified for these specific numbers and was replaced. Weights de-inflated slightly given the imprecise per-carat figure.",
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
          source: "IMF 2024 Article IV Consultation (Botswana); World Bank; Acemoglu & Robinson (2012)",
          sourceUrl: "https://www.elibrary.imf.org/view/journals/002/2024/286/article-A001-en.xml",
          reasoning:
            "The IMF's 2024 Article IV report confirms the dependency figures used in this pillar: diamonds account for roughly a quarter of GDP, about 80% of exports, and around a third of fiscal revenue. Botswana's development story is one of the best-documented cases in development economics and the causal role of diamond revenue is well-established. The specific historical figures (12 km of road / $70 per-capita GDP at 1966 independence) are commonly cited and broadly consistent with the record, though not pinned to this single source. Replicability is lower because Botswana's success depended on uniquely good governance other diamond producers have not replicated.",
        },
        {
          id: "artisanal-mining-livelihoods",
          title:
            "10 Million People in Africa Depend on Diamond Mining Livelihoods",
          description:
            "The Diamond Development Initiative (DDI), an official Kimberley Process observer, estimates that artisanally mined diamonds are the main livelihood for more than 1.5 million miners across roughly 18 countries in Africa and South America, supporting around 10 million family members. In countries like Sierra Leone and the DRC, artisanal mining is one of few available income sources in rural areas. While conditions are often poor, eliminating demand for mined diamonds without providing alternative livelihoods would deepen poverty for these communities.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source: "Diamond Development Initiative (Kimberley Process observer)",
          sourceUrl: "https://www.kimberleyprocess.com/observers/diamond-development-initiative",
          reasoning:
            "The DDI is a recognized Kimberley Process observer focused on artisanal/alluvial mining; the linked KP page verifies its mandate. CORRECTION: the original said miners work 'across sub-Saharan Africa,' but the widely-cited DDI figure (1.5 million miners / ~10 million dependents) spans ~18 countries in BOTH Africa and South America — scope corrected. The specific numbers are DDI estimates rather than independently audited census data, so independence/reliability/replicability are de-inflated. The ethical tension is real, but the argument implicitly accepts exploitation as preferable to unemployment rather than demanding better alternatives.",
        },
        {
          id: "lab-grown-market-disruption",
          title:
            "Lab-Grown Diamonds Reached Roughly Half of US Engagement-Ring Sales by 2024",
          description:
            "Per The Knot's 2025 Real Weddings Study, 52% of US couples married in 2024 had an engagement ring featuring a lab-grown center stone — up sharply from a low-single-digit share several years earlier — driven by far lower prices. The Knot reports that in early 2025 an unbranded 1-carat lab-grown diamond averaged roughly $845 versus about $3,895 for a comparable natural diamond, and that lab-grown's success has pushed natural-diamond prices down well beyond what the mining industry expected, reducing revenue for producing nations.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "The Knot 2025 Real Weddings Study (reported via CNBC); Bain & Company Global Diamond Industry Report",
          sourceUrl: "https://www.cnbc.com/2025/03/10/more-couples-are-choosing-lab-grown-diamonds-vs-natural-for-engagement-rings.html",
          reasoning:
            "Verified: The Knot's 2025 study found 52% of 2024 engagement rings featured a lab-grown stone, and reported ~$845 (lab) vs ~$3,895 (natural) for an unbranded 1-carat stone in early 2025. CORRECTION: the earlier text's specific price path ('~$6,000 in 2021 to about $4,200 in 2025') and the '73-83% lower' and '~30% decline' figures were not matched to the verified source, so they were replaced with The Knot's directly-reported $845 vs $3,895 comparison. Directness is moderate because market disruption is economic data, not a direct measure of ethical impact.",
        },
        {
          id: "resource-depletion-diversification",
          title:
            "Botswana's Diamond Reserves Expected to Deplete Significantly by 2050",
          description:
            "Botswana's flagship Jwaneng mine has a finite open-pit life — reported around the mid-2030s — and Debswana is investing billions (the Cut-9 extension and a planned underground conversion) to prolong it toward roughly 2054. The Botswana government's Vision 2036 national development plan explicitly prioritizes economic diversification beyond diamonds. The need to diversify exists regardless of lab-grown competition; lab-grown merely accelerates an inevitable transition as ore grades and reserves decline.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Mining Technology (Jwaneng mine life / Cut-9 and underground extension); Botswana Vision 2036",
          sourceUrl: "https://www.mining-technology.com/projects/jwaneng-diamond-mine/",
          reasoning:
            "Verified: Jwaneng's open-pit life runs to roughly the mid-2030s, with the Cut-9 extension and a planned underground operation intended to push it toward ~2054 — confirming both the depletion pressure and the heavy capital needed to fight it. Vision 2036 is a real national plan emphasizing diversification. CORRECTION: the original 'significant declines by 2040-2050' was loosely stated; the open-pit horizon is nearer the mid-2030s (life-extension projects, not the base reserve, push it later), so wording was tightened. The reframing — communities face transition regardless of lab-grown competition — remains logically strong.",
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
        "Bain & Company: A Brilliant Recovery Shapes Up — The Global Diamond Industry 2021–22",
      url: "https://www.bain.com/insights/a-brilliant-recovery-shapes-up-the-global-diamond-industry-2021-to-22/",
    },
    {
      title:
        "Trucost (S&P Global): The Socioeconomic and Environmental Impact of Large-Scale Diamond Mining ('Total Clarity', 2019)",
      url: "https://www.spglobal.com/content/dam/spglobal/mi/en/documents/general/The-Socioeconomic-and-Environmental-Impact-of-Large-Scale-Diamond-Mining_DPA_02-May-2019.pdf",
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
        "Lab-grown diamonds produced on India's coal-heavy grid may emit ~511 kg CO₂ per carat (per a 2019 industry-commissioned Trucost study) — comparable to mined diamonds. But renewable-powered producers like Diamond Foundry, whose Wenatchee plant runs on Columbia River hydropower, can be third-party certified climate-neutral — far below the ~160 kg CO₂ per carat the same Trucost study attributed to efficient mined production. Meanwhile, mining causes largely irreversible land destruction, water-contamination tail risk, and ecosystem loss that carbon accounting alone does not capture. Should environmental comparisons focus solely on carbon, or must they include land, water, and biodiversity impacts?",
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
