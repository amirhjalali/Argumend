import type { Topic } from "@/lib/schemas/topic";

export const carbonCaptureViabilityData = {
  id: "carbon-capture-viability",
  title: "Is Carbon Capture a Viable Climate Solution?",
  meta_claim:
    "Carbon capture and removal is a necessary and viable tool for reaching net-zero climate targets",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Every IPCC scenario that limits warming to 1.5°C or 2°C relies on carbon removal — yet a 2022 analysis of 13 flagship capture projects found 10 had failed or fallen short of their targets, and most captured CO2 has been pumped underground to push out more oil. The honest position is uncomfortable for both sides: the climate math appears to require carbon removal, while the real-world track record so far has been mostly disappointing.",
    confidence: 80,
    source:
      "IPCC AR6 WGIII (2022, CDR in all 1.5°C/2°C pathways); IEEFA, 'The Carbon Capture Crux' (2022, 10 of 13 flagship projects underperformed/failed)",
    sourceUrl:
      "https://www.ipcc.ch/report/ar6/wg3/downloads/outreach/IPCC_AR6_WGIII_Factsheet_CDR.pdf",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The IPCC is unambiguous that some carbon removal is now required, not optional: essentially every modelled pathway that holds warming to 1.5°C or 2°C uses carbon dioxide removal to cancel out residual emissions from hard-to-abate sectors like cement, steel, and aviation, and to claw back temperatures after any overshoot.",
    "But the real-world record is sobering — an IEEFA review of the 13 largest capture projects found 10 missed their targets, flagships like Boundary Dam have averaged closer to 50% capture against a 90% design rating, and direct air capture still costs hundreds of dollars per tonne while operating at a tiny fraction of design capacity.",
    "So the genuine debate is not whether carbon capture can work in principle — Norway's Sleipner has stored CO2 safely since 1996 — but whether it can scale fast enough and cheaply enough to matter, and whether subsidizing it mostly extends the life of fossil fuels rather than replacing them.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Is Carbon Removal Actually Necessary?
    // =========================================================================
    {
      id: "climate-math-necessity",
      title: "Is Carbon Removal Actually Necessary?",
      short_summary:
        "Every IPCC pathway to 1.5°C or 2°C uses carbon dioxide removal to offset residual emissions from sectors like cement, steel, and aviation that have no cheap clean substitute, and to reverse temperature overshoot. Proponents argue this makes removal unavoidable, not optional. Skeptics counter that this same logic functions as a moral hazard — letting polluters promise future removals that may never materialize, slowing the deep emissions cuts that remain the only proven lever.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Treating carbon capture as a climate solution risks a dangerous bait-and-switch. The IPCC pathways assume large-scale removal partly because integrated assessment models find it cheaper on paper to defer cuts and remove later — but a model assumption is not an engineering plan. In practice, the promise of future capture has repeatedly been used to justify continued and expanded fossil fuel production: oil and gas companies cite CCS to license new fields, and the great majority of CO2 captured to date has been used for enhanced oil recovery, pumping more crude out of the ground. Banking the climate on a technology that must scale from roughly 50 million tonnes per year today to multiple gigatonnes per year — a 20-to-100-fold increase — is a gamble that could lock in warming if it underdelivers, while the certain, proven path is to cut emissions at the source through electrification and renewables.",
      proponent_rebuttal:
        "The necessity is a conclusion of the physics, not a corporate talking point. The IPCC AR6 found that essentially every scenario limiting warming to 1.5°C or 2°C deploys carbon dioxide removal, for two reasons that do not go away with cheaper solar: some emissions are genuinely hard to abate (the chemistry of cement, high-temperature industrial heat, long-haul aviation, some agriculture), and any temperature overshoot can only be reversed by net-negative emissions — i.e., removal. Removal is a complement to deep decarbonization, not a substitute, and serious proponents agree it must not slow emission cuts. The moral-hazard concern is real and is an argument for guardrails — counting only durable storage, barring removal credits from licensing new fossil capacity — not for abandoning a tool the climate math says we will need. Refusing to build removal capacity now, when residual and legacy emissions clearly require it later, is itself a bet that deep cuts alone will suffice everywhere, which no credible pathway supports.",
      crux: {
        id: "residual-emissions-floor",
        title: "The Residual-Emissions Floor Test",
        description:
          "Whether there is a genuine floor of hard-to-abate residual emissions (and a legacy overshoot) that only carbon removal can neutralize, or whether deep decarbonization plus electrification can drive emissions close enough to zero that large-scale removal is unnecessary. If sectors like cement, steel, and aviation retain large unavoidable emissions through mid-century, removal is required to reach net zero. If clean alternatives mature fast enough to drive those sectors near zero, removal becomes a marginal cleanup tool rather than a pillar.",
        methodology:
          "Build sector-by-sector decarbonization roadmaps for the hard-to-abate sectors (cement, steel, chemicals, aviation, shipping, agriculture) using technology-readiness and cost-curve data. For each, estimate the technically achievable emission floor by 2050 under aggressive but feasible deployment of clean substitutes (green hydrogen, electrification, clean fuels, alternative cement chemistries). Sum the residual floors and add the legacy-overshoot drawdown implied by a given temperature target to derive the minimum required removal. Compare against scenarios where breakthrough substitutes eliminate residuals, to test how sensitive the 'removal is necessary' conclusion is to optimistic technology assumptions.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-2M (Integrated sectoral decarbonization modeling and technology-readiness assessment across hard-to-abate industries)",
        falsification: {
          supporter_flip:
            "If sector roadmaps showed clean substitutes could drive cement, steel, aviation, and agriculture near zero by mid-century — leaving only a tiny residual and no overshoot to reverse — then the 'removal is unavoidable' case would collapse to 'a minor cleanup tool,' and heavy investment in it would be misallocated.",
          skeptic_flip:
            "A skeptic who calls removal a moral hazard should weigh that every IPCC 1.5°C/2°C pathway includes it precisely because some emissions resist abatement and overshoot can only be undone by net-negative emissions — so 'just cut at the source' isn't a complete plan unless those residual floors are shown to be eliminable.",
          common_ground:
            "Both sides agree that deep, immediate emission cuts are the priority and that removal must not be used as an excuse to keep emitting.",
          live_disagreement:
            "Whether the residual hard-to-abate floor plus legacy overshoot is large enough to genuinely require gigatonne-scale removal — which only credible sector-by-sector roadmaps to 2050 can settle.",
        },
      },
      evidence: [
        {
          id: "ipcc-cdr-unavoidable",
          title:
            "IPCC AR6: Carbon Removal Appears in Every 1.5°C/2°C Pathway and Is 'Unavoidable' for Net Zero",
          description:
            "The IPCC's Sixth Assessment Report (Working Group III, 2022) concluded that the deployment of carbon dioxide removal (CDR) to counterbalance hard-to-abate residual emissions is unavoidable if net-zero CO2 or greenhouse-gas emissions are to be achieved. CDR is a feature of essentially all modelled pathways that limit warming to 1.5°C or 2°C, used both to offset residual emissions from sectors such as cement, steel, and aviation and — in overshoot pathways — to draw temperatures back down after a peak. The IPCC stresses that CDR cannot substitute for deep, immediate emission reductions; it complements them.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "IPCC AR6 WGIII (2022), Carbon Dioxide Removal factsheet and Summary for Policymakers",
          sourceUrl:
            "https://www.ipcc.ch/report/ar6/wg3/downloads/outreach/IPCC_AR6_WGIII_Factsheet_CDR.pdf",
          reasoning:
            "The IPCC is the most authoritative synthesis of climate science, drawing on thousands of peer-reviewed studies and hundreds of modelled scenarios with broad international review. The conclusion that CDR is unavoidable for net zero is a consensus finding across the scenario ensemble, not a single model. Directness is high because the claim addresses the necessity question head-on, though it rests on integrated-assessment-model assumptions that critics legitimately probe.",
        },
        {
          id: "eor-fossil-prolongation",
          title:
            "Most Captured CO2 Has Been Used to Extract More Oil (Enhanced Oil Recovery)",
          description:
            "The large majority of CO2 captured at commercial scale to date has been sold for enhanced oil recovery (EOR) — injected into aging oil fields to push out additional crude. The IEEFA analysis of flagship projects found that most were designed around EOR rather than permanent climate storage, and the U.S. flagship Petra Nova shipped its captured CO2 about 82 miles to the West Ranch oil field, where injection raised production roughly fiftyfold to around 15,000 barrels per day. This means a technology marketed as climate mitigation has, in aggregate, helped produce more fossil fuel, undermining the net climate benefit and lending weight to the moral-hazard critique.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "IEEFA, 'The Carbon Capture Crux: Lessons Learned' (2022); Petra Nova project documentation",
          sourceUrl:
            "https://ieefa.org/resources/carbon-capture-crux-lessons-learned",
          reasoning:
            "IEEFA is an energy-finance research institute that is critical of CCS, so its framing leans skeptical, but the underlying facts — that most historical captured CO2 went to EOR and that Petra Nova fed an oil field — are widely documented and not seriously disputed. Directly supports the prolongation/moral-hazard concern. The weight reflects strong documentation tempered by the source's advocacy stance.",
        },
        {
          id: "hard-to-abate-sectors",
          title:
            "Cement, Steel, and Aviation Lack Cheap Clean Substitutes at Scale",
          description:
            "Cement production emits CO2 not just from energy but from the chemistry of calcining limestone, making roughly half its emissions process-inherent and unavoidable through clean electricity alone. Steel, high-temperature industrial heat, long-haul aviation, and shipping similarly lack mature, cost-competitive zero-carbon substitutes deployable at global scale today. The IEA and IPCC both treat these as 'hard-to-abate,' and it is precisely the residual emissions from such sectors that removal is meant to neutralize on the path to net zero, supporting the argument that some removal capacity will be needed regardless of how fast renewables grow.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "IEA, Energy System / Industry analysis; IPCC AR6 WGIII (2022)",
          sourceUrl:
            "https://www.iea.org/energy-system/carbon-capture-utilisation-and-storage",
          reasoning:
            "The existence of process emissions in cement and the immaturity of clean substitutes in heavy industry are well-established engineering facts reported by the IEA and IPCC. Directness is moderate because the existence of hard-to-abate emissions establishes a need for some mitigation but does not by itself prove that capture (versus demand reduction or material substitution) is the best answer.",
        },
        {
          id: "model-assumption-critique",
          title:
            "Integrated Assessment Models May Overstate Removal by Treating It as a Cheap Backstop",
          description:
            "A recurring critique in the literature is that the prominence of carbon removal in IPCC pathways is partly an artifact of how integrated assessment models work: by representing large-scale removal (especially bioenergy with carbon capture, BECCS) as an available, affordable future option, the models find least-cost solutions that defer near-term cuts and lean on removal later. Reviews in journals such as WIREs Climate Change have raised concerns that this builds optimistic, possibly unachievable removal volumes into the scenarios, so the modelled 'necessity' of removal is conditional on assumptions about its cost and feasibility that may not hold in reality.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Luczak et al., WIREs Climate Change (2026), 'Concerns and Questions About Carbon Dioxide Removal Technologies'; IAM methodology critiques",
          sourceUrl: "https://wires.onlinelibrary.wiley.com/doi/10.1002/wcc.70063",
          reasoning:
            "Peer-reviewed critiques of integrated-assessment-model treatment of CDR are credible and address a genuine methodological limitation. Directness is moderate because the critique qualifies how strongly the IPCC 'necessity' should be read rather than showing removal is unnecessary — the residual hard-to-abate emissions remain real even if the modelled volumes are debatable.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Does It Actually Work at Scale?
    // =========================================================================
    {
      id: "track-record-scale",
      title: "Does It Actually Work at Scale?",
      short_summary:
        "Norway's Sleipner project has stored over 20 million tonnes of CO2 safely under the North Sea since 1996, proving geological storage is feasible. But a 2022 review of the 13 largest flagship projects found 10 underperformed or failed, Boundary Dam has averaged closer to 50% capture against its 90% design rating, and Petra Nova was mothballed for years. The crux is whether these are early teething failures of a maturing technology or evidence of a fundamental scaling problem.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Carbon capture has been promised as imminent for decades, and the project record is a long history of failure. IEEFA's 2022 review of 13 flagship CCS/CCUS projects — the industry's own showcases — found 10 underperformed or failed outright, mostly by large margins. The world's first commercial coal CCS plant, SaskPower's Boundary Dam 3, was designed to capture 90% of its CO2 but has averaged closer to 50% over nine years, never sustaining the design rate. The U.S. flagship Petra Nova was shut down in 2020 and sat idle for years. Total operational capture capacity worldwide is only around 50 million tonnes per year, against the gigatonnes the IPCC pathways assume — and to claim this scales, you have to believe a technology that has missed targets at small scale for 25 years will suddenly succeed when scaled up 20-to-100-fold.",
      proponent_rebuttal:
        "The 'history of failure' framing conflates two different things: capturing CO2 from a smokestack, and storing it underground — and the storage half has an excellent record. Norway's Sleipner has injected over 20 million tonnes of CO2 into a saline aquifer beneath the North Sea continuously since 1996, with extensive seismic monitoring showing no leakage — the world's first commercial CCS project, still running after a quarter century. The capture-side underperformance at Boundary Dam and Petra Nova reflects early-of-a-kind engineering, economics tied to volatile oil prices, and projects built around oil recovery rather than optimized for climate; these are correctable. Capture rates above 90% have been demonstrated at well-run facilities, and operational capacity is now set to more than double as projects under construction come online. Every transformative technology — solar, wind, batteries — looked uneconomic and underperforming at the equivalent stage; the question is the trajectory, not the snapshot.",
      crux: {
        id: "scaling-trajectory-test",
        title: "The Scaling-Trajectory Test",
        description:
          "Whether capture-side underperformance reflects correctable early-of-a-kind problems that improve with deployment, or a persistent structural failure mode. If newer, purpose-built capture facilities reliably hit high capture rates (90%+) and availability while costs fall along a learning curve, the technology is on a viable scaling path. If projects keep missing targets and stalling regardless of generation and funding, the gigatonne-scale assumptions in climate pathways are unfounded.",
        methodology:
          "Assemble a complete registry of operating and retired capture projects with their design capture rates, actual measured capture rates, availability (fraction of hours operating), and lifetime CO2 captured versus stored. Segment by vintage (year of commissioning) and design intent (EOR versus dedicated storage) to test whether more recent and purpose-built projects perform measurably better than first-of-a-kind plants. Separately track verified geological storage integrity (e.g., Sleipner, Snøhvit) via independent monitoring data. Fit a learning curve to observed performance and cost across vintages to estimate whether the trajectory supports scaling to gigatonne levels by 2050.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Independent project-performance audit using operator data, monitoring records, and learning-curve analysis)",
        falsification: {
          supporter_flip:
            "If a vintage-by-vintage audit showed newer, purpose-built capture plants keep missing their design rates and stalling on availability just like the first-of-a-kind ones — no learning curve — then the gigatonne-scale assumptions would be unfounded and 'it scales' would be falsified.",
          skeptic_flip:
            "A skeptic pointing to 10-of-13 failures should weigh that Sleipner has stored 20+ million tonnes leak-free since 1996 and that the failures cluster in EOR-driven, first-of-a-kind capture plants — so the storage half is proven and the capture half may be an early-deployment problem, not a permanent one.",
          common_ground:
            "Both sides agree the historical capture-side track record has been poor and that geological storage at sites like Sleipner has been demonstrably safe and durable.",
          live_disagreement:
            "Whether capture-side failures are correctable early-deployment problems on a learning curve or a structural ceiling — which only a vintage-segmented performance audit across many projects can resolve.",
        },
      },
      evidence: [
        {
          id: "ieefa-13-projects",
          title:
            "10 of 13 Flagship Capture Projects Failed or Underperformed (IEEFA 2022)",
          description:
            "IEEFA's 2022 report 'The Carbon Capture Crux' examined 13 of the largest, longest-running flagship CCS/CCUS projects across the gas, industrial, and power sectors — together accounting for about 55% of global capture capacity. It found 10 of the 13 either failed or underperformed against their design capacities, mostly by wide margins: seven underperformed, two failed outright, and one was mothballed. Specific examples include the Shute Creek gas-processing facility, which underperformed its capture capacity by about 36% over its lifetime, and the Gorgon project off Western Australia, which missed its targets by roughly 50% over its first five years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "IEEFA, 'The Carbon Capture Crux: Lessons Learned' (2022)",
          sourceUrl:
            "https://ieefa.org/resources/carbon-capture-crux-lessons-learned",
          reasoning:
            "IEEFA is openly skeptical of CCS, lowering independence, but its underlying performance figures are drawn from operators' own reported data and have been widely cited without successful rebuttal of the core numbers. Directly addresses the scaling/track-record question. The result is one of the most cited datapoints in the CCS debate.",
        },
        {
          id: "boundary-dam-50-percent",
          title:
            "Boundary Dam 3 Designed for 90% Capture, Has Averaged Closer to 50%",
          description:
            "SaskPower's Boundary Dam Unit 3 in Saskatchewan, the world's first commercial coal-fired CCS plant (operational 2014), was designed to capture 90% of the unit's CO2. SaskPower and the International CCS Knowledge Centre acknowledged in 2022 that the plant had not sustained its 90% target since 2015; independent analysis of SaskPower's own data found the overall capture rate over its first nine years was closer to 50%, with the capture unit available for only about 80% of operating hours and the 90% rate never met over any extended period.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source:
            "IEEFA analysis of SaskPower data; International CCS Knowledge Centre / SaskPower (2022)",
          sourceUrl:
            "https://ieefa.org/resources/carbon-capture-boundary-dam-3-still-underperforming-failure",
          reasoning:
            "The capture-rate figures derive from SaskPower's own reported data, and the operator itself acknowledged missing the 90% target. The gap between a 90% design rating and ~50% realized capture is a concrete, directly relevant illustration of capture-side underperformance. IEEFA's skeptical framing slightly lowers independence, but the numbers are operator-sourced.",
        },
        {
          id: "sleipner-storage-success",
          title:
            "Sleipner Has Stored 20+ Million Tonnes of CO2 Safely Since 1996",
          description:
            "At Norway's Sleipner gas field, CO2 separated from produced gas has been injected into the Utsira Sand saline aquifer more than 800 metres beneath the North Sea continuously since 1996 — the world's first commercial CCS operation. More than 20 million tonnes have been stored (around 1 million tonnes per year), and decades of time-lapse seismic and pressure monitoring have shown the CO2 remaining securely trapped beneath the caprock with no detected leakage. Sleipner is the foundational evidence that dedicated geological storage of CO2 is technically feasible, safe, and durable over multi-decade timescales.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Equinor / Sleipner project; Geoenergy (Lyell Collection, 2024), '26 years of Sleipner monitoring'",
          sourceUrl:
            "https://www.lyellcollection.org/doi/full/10.1144/geoenergy2024-015",
          reasoning:
            "Sleipner's storage performance is documented in peer-reviewed monitoring studies spanning more than 25 years and is corroborated by independent geoscience. It directly establishes that the storage half of CCS works, which is the strongest point in favor of viability. It does not by itself prove the capture half scales, so it is decisive for storage but not for end-to-end deployment.",
        },
        {
          id: "capacity-doubling-pipeline",
          title:
            "Operational Capacity Is Set to More Than Double as New Projects Come Online",
          description:
            "The Global CCS Institute's 2024 status report found a record number of projects in the CCS pipeline, with operational capture capacity (around 50 million tonnes per year) on track to more than double to over 100 million tonnes per year once facilities currently under construction come online. While still far below the gigatonnes assumed in climate pathways, the rapid growth in announced and under-construction capacity is the proponents' evidence that the technology is now entering a genuine scaling phase rather than remaining a collection of one-off demonstrations.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "Global CCS Institute, 'Global Status of CCS 2024'",
          sourceUrl:
            "https://www.globalccsinstitute.com/resources/global-status-report/",
          reasoning:
            "The Global CCS Institute is an industry-aligned body, so independence is lower, and 'announced' or 'under-construction' capacity has historically been an unreliable predictor given the field's record of cancellations. Weighted modestly for that reason, but the operational-capacity figures and the project-pipeline growth are real and directly relevant to whether the technology is scaling.",
        },
        {
          id: "petra-nova-shutdown",
          title:
            "Petra Nova, a U.S. Flagship, Was Mothballed in 2020 on Oil-Price Economics",
          description:
            "Petra Nova, a $1 billion coal-plant capture project in Texas (including about $195 million in U.S. government funding), captured CO2 for enhanced oil recovery and reportedly needed oil prices near $75 per barrel to break even. NRG shut it down on May 1, 2020 when oil prices collapsed during the COVID-19 pandemic, and the plant sat idle for years before a later restart attempt. The shutdown illustrates how capture projects tied to oil-recovery economics are vulnerable to commodity-price swings, a structural fragility distinct from the technology's engineering performance.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "NRG Energy statements; IEEFA Petra Nova post-mortem (2020); Petra Nova project documentation",
          sourceUrl: "https://en.wikipedia.org/wiki/Petra_Nova",
          reasoning:
            "The Petra Nova shutdown and its EOR-linked break-even economics are well documented across industry and journalistic sources. Directness is moderate because the failure was economic (oil-price dependence) rather than a pure capture-technology failure — supporters note the capture system itself worked, while skeptics note that the economics that killed it are inherent to the EOR business model.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Is the Cost and Energy Penalty Survivable?
    // =========================================================================
    {
      id: "cost-energy-penalty",
      title: "Is the Cost and Energy Penalty Survivable?",
      short_summary:
        "Direct air capture still costs roughly $300-1,000 per tonne and Climeworks' flagship Mammoth plant reportedly captured only about 105 tonnes in its first ten months against a 36,000-tonne design. Capture on power plants imposes a 10-30% energy penalty. Proponents point to steep learning-curve cost declines and 2030 targets near $250-350 per tonne; skeptics argue the thermodynamics of pulling 0.04%-concentration CO2 from air set a stubborn cost and energy floor.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The economics of carbon capture remain brutal, and the worst case — direct air capture — runs into physics, not just engineering. Pulling CO2 from ambient air, where it is only about 0.04% of the atmosphere, is intrinsically energy-hungry; Climeworks' Orca plant sequesters CO2 at over $1,000 per tonne, and its larger Mammoth flagship reportedly captured only around 105 tonnes in its first ten months against a 36,000-tonne annual design rating — and has at times emitted more CO2 than it removed. Point-source capture on power plants imposes a 10-30% energy penalty, meaning a plant must burn substantially more fuel to power the capture equipment, raising the cost of the resulting electricity. At these prices, every dollar spent on capture buys far more emissions reduction if spent instead on wind, solar, storage, or efficiency — making capture an expensive distraction from cheaper, proven options.",
      proponent_rebuttal:
        "High early costs are exactly what a technology at the bottom of its learning curve looks like — the relevant question is the slope, not today's price. The IEA estimates a large-scale DAC plant built today at roughly $335 per tonne, and Climeworks targets $250-350 per tonne capture cost by 2030, with the trajectory pointing toward under $100 per tonne with deployment and innovation, mirroring the 90% cost declines seen in solar and batteries. The energy penalty is real but shrinking with better solvents and process design, and capture powered by clean electricity does not undermine the climate benefit. Crucially, the comparison to renewables is a false choice for the residual emissions that have no clean substitute: you cannot run a cement kiln's calcination chemistry on solar, and overshoot can only be reversed by removal at any cost. For those specific tonnes, the alternative to expensive capture is not cheap renewables — it is no solution at all.",
      crux: {
        id: "cost-learning-curve-floor",
        title: "The Cost Learning-Curve Floor Test",
        description:
          "Whether carbon capture and direct air capture costs fall steeply along a learning curve toward $100-300 per tonne as deployment scales, or whether thermodynamic and engineering limits impose a stubborn floor that keeps capture far more expensive than emission reductions. If observed costs decline at solar-like learning rates as cumulative capacity grows, capture becomes affordable for residual emissions. If costs plateau well above the social cost of carbon despite scaling, capture remains a niche tool that diverts resources from cheaper mitigation.",
        methodology:
          "Compile cost-per-tonne data for capture and DAC projects against cumulative deployed capacity over time to estimate a learning rate (percentage cost decline per doubling of capacity), as has been done for solar PV and batteries. Separate capital cost, energy cost, and operations cost so the energy-penalty contribution can be tracked against improving solvent and process efficiency. Compare the projected cost trajectory to the marginal cost of alternative mitigation (renewables, efficiency) and to the social cost of carbon, and stress-test against thermodynamic minimum-energy bounds for separating CO2 from air and flue gas to identify any hard floor.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Techno-economic and learning-curve analysis using project cost data and thermodynamic modeling)",
        falsification: {
          supporter_flip:
            "If cost data across growing cumulative capacity showed capture/DAC costs plateauing well above the social cost of carbon — hitting a thermodynamic or engineering floor rather than a solar-like learning curve — then the 'costs will fall enough to matter' case would fail and the money would be better spent on cheaper mitigation.",
          skeptic_flip:
            "A skeptic citing $1,000-per-tonne DAC should weigh that solar and batteries also looked hopeless at the same deployment stage and fell ~90%, that the IEA already pegs a large new DAC plant near $335/tonne, and that for residual emissions with no clean substitute the alternative isn't cheap renewables but no solution at all.",
          common_ground:
            "Both sides agree that capture today is far more expensive per tonne than wind, solar, or efficiency, and that emission cuts should be prioritized where cheaper options exist.",
          live_disagreement:
            "Whether capture costs will follow a steep learning curve toward $100-300/tonne or hit a stubborn floor — and whether the relevant comparison is to cheap renewables or to the hard-to-abate tonnes that have no other fix.",
        },
      },
      evidence: [
        {
          id: "dac-cost-1000",
          title:
            "Direct Air Capture Still Costs Roughly $300-1,000 per Tonne Today",
          description:
            "Direct air capture remains very expensive. Climeworks' Orca plant in Iceland sequesters CO2 at a cost reported to exceed $1,000 per tonne, and the IEA estimates a large-scale DAC plant built today at around $335 per tonne, with current real-world costs spanning roughly $250-600 per tonne depending on technology and energy source. By comparison, avoiding a tonne of CO2 through renewables or efficiency is often far cheaper, which is the core of the skeptical 'opportunity cost' argument that capture dollars buy less mitigation than alternatives.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "IEA, 'Direct Air Capture: A key technology for net zero' (2022); Climeworks Orca cost reporting",
          sourceUrl:
            "https://www.iea.org/energy-system/carbon-capture-utilisation-and-storage/direct-air-capture",
          reasoning:
            "Cost ranges come from the IEA, an authoritative and relatively neutral energy body, corroborated by company and journalistic reporting on Orca. Directly relevant to viability. The wide range ($335 large-scale to $1,000+ for early plants) honestly reflects that costs depend heavily on scale and vintage, which is itself central to the learning-curve dispute.",
        },
        {
          id: "mammoth-underdelivery",
          title:
            "Climeworks' Mammoth Flagship Captured ~105 Tonnes in 10 Months Against a 36,000-Tonne Design",
          description:
            "Climeworks inaugurated Mammoth, billed as the world's largest direct air capture plant, in Iceland in May 2024, with a design capacity of up to 36,000 tonnes of CO2 per year. Reporting based on Icelandic verification data found the plant captured only about 105 tonnes of CO2 in its first ten months of operation, and analyses noted that Climeworks' DAC operations have at times emitted more CO2 than they removed. This is a stark, current example of a flagship removal project operating at a tiny fraction of its design rating during ramp-up.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "Heimildin (Icelandic investigative reporting, 2025) based on Puro.earth verification data; Climeworks plant specifications",
          sourceUrl:
            "https://heimildin.is/grein/24581/climeworks-capture-fails-to-cover-its-own-emissions/",
          reasoning:
            "The 105-tonne figure comes from third-party verification data reported by Icelandic investigative journalists, not from Climeworks' marketing. Directly illustrates ramp-up underperformance. Replicability and independence are moderate because the figures cover an early ramp-up period and Climeworks disputes some framings, but the gap between ~105 tonnes and 36,000-tonne design capacity is large and well-sourced.",
        },
        {
          id: "energy-penalty",
          title:
            "Power-Plant Capture Imposes a 10-30% Energy Penalty",
          description:
            "Post-combustion capture on a power plant consumes a large share of the plant's own output — primarily to regenerate the amine solvent and compress the captured CO2. Engineering analyses put this 'energy penalty' at roughly 10-30% of gross output, with figures around 11% for natural-gas combined-cycle plants and roughly 16% for coal plants. The penalty means a plant must burn more fuel per net unit of electricity delivered, raising both cost and the fuel-cycle emissions that partly offset the captured CO2, which underpins concerns that capture is an inefficient use of energy and capital.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "Peer-reviewed techno-economic analyses of amine-based capture (e.g., GHGT-15 proceedings; Journal of Cleaner Production)",
          sourceUrl: "https://www.osti.gov/servlets/purl/1781605",
          reasoning:
            "The energy penalty is a well-characterized, repeatedly measured engineering parameter reported across many independent studies. Directness is moderate because a high penalty raises cost without proving capture is unviable — proponents argue clean-powered capture and better solvents shrink the penalty, while skeptics treat it as evidence of fundamental inefficiency.",
        },
        {
          id: "point-source-cheap",
          title:
            "Capture from Concentrated Industrial Streams Already Costs Only $15-25 per Tonne",
          description:
            "Not all capture is created equal. Where the CO2 stream is already concentrated — natural-gas processing, ethanol fermentation, and ammonia production — the IEA reports capture costs as low as roughly $15-25 per tonne, because the gas requires little separation and far less energy than pulling dilute CO2 from a power-plant flue (about $40-120 per tonne) or from ambient air. Point-source capture already operates at over 40 commercial sites worldwide capturing on the order of 45-50 million tonnes per year, demonstrating that for the right sources capture is cheap and proven today, even if dilute-stream and air capture remain expensive.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "IEA, 'Is carbon capture too expensive?' (2021); Congressional Budget Office, 'Carbon Capture and Storage in the United States' (2023)",
          sourceUrl:
            "https://www.iea.org/commentaries/is-carbon-capture-too-expensive",
          reasoning:
            "The cost-by-source breakdown comes from the IEA and the nonpartisan U.S. Congressional Budget Office, both authoritative and neutral. Directly rebuts the blanket 'capture is too expensive' claim by showing concentrated-stream capture is already cheap. The honest caveat, which the evidence makes explicit, is that these cheap sources are a limited slice of total emissions and many were tied to enhanced oil recovery.",
        },
        {
          id: "learning-curve-targets",
          title:
            "Cost Targets Aim for $250-350 per Tonne by 2030, Citing Solar-Like Learning Curves",
          description:
            "Climeworks states that its next-generation technology aims to reach a capture cost of $250-350 per tonne and a total cost of $400-600 per tonne of net removal by 2030, with the longer-run goal of falling below $100 per tonne. Proponents argue this trajectory mirrors solar PV and lithium-ion batteries, which fell roughly 90% in cost as cumulative deployment scaled, and the IEA's expectation that DAC costs could drop under $100 per tonne with sufficient deployment and innovation supports the learning-curve case for eventual affordability.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source:
            "Climeworks cost-reduction roadmap; IEA DAC outlook (2022)",
          sourceUrl:
            "https://climeworks.com/news/2024-year-in-review",
          reasoning:
            "These are forward-looking targets from a company with a strong commercial interest, so independence and replicability are low — the cost declines are projected, not yet demonstrated at scale. Included as the strongest articulation of the optimistic case, but weighted modestly precisely because it rests on as-yet-unrealized learning-curve assumptions rather than achieved results.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "IPCC AR6 WGIII (2022) — Carbon Dioxide Removal Factsheet",
      url: "https://www.ipcc.ch/report/ar6/wg3/downloads/outreach/IPCC_AR6_WGIII_Factsheet_CDR.pdf",
    },
    {
      title:
        "In-depth Q&A: The IPCC's sixth assessment on how to tackle climate change — Carbon Brief",
      url: "https://www.carbonbrief.org/in-depth-qa-the-ipccs-sixth-assessment-on-how-to-tackle-climate-change/",
    },
    {
      title:
        "The Carbon Capture Crux: Lessons Learned — IEEFA (2022)",
      url: "https://ieefa.org/resources/carbon-capture-crux-lessons-learned",
    },
    {
      title:
        "Carbon Capture at Boundary Dam 3 Still an Underperforming Failure — IEEFA",
      url: "https://ieefa.org/resources/carbon-capture-boundary-dam-3-still-underperforming-failure",
    },
    {
      title:
        "26 years of Sleipner CO2 storage monitoring — Geoenergy (Lyell Collection, 2024)",
      url: "https://www.lyellcollection.org/doi/full/10.1144/geoenergy2024-015",
    },
    {
      title:
        "Direct Air Capture — IEA Energy System",
      url: "https://www.iea.org/energy-system/carbon-capture-utilisation-and-storage/direct-air-capture",
    },
    {
      title:
        "Climeworks' capture fails to cover its own emissions — Heimildin (2025)",
      url: "https://heimildin.is/grein/24581/climeworks-capture-fails-to-cover-its-own-emissions/",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Is carbon removal genuinely necessary, or a moral hazard that prolongs fossil fuels?",
      content:
        "Every IPCC pathway that limits warming to 1.5°C or 2°C deploys carbon dioxide removal to offset residual emissions from hard-to-abate sectors like cement, steel, and aviation, and to reverse any overshoot — which the IPCC calls unavoidable for net zero. Yet most CO2 captured so far has been used to extract more oil, and critics argue the promise of future removal is used to license continued fossil expansion. Is removal a physics-driven necessity, or a convenient backstop that lets emissions continue while the deep cuts that actually work get deferred?",
    },
    {
      id: "q2",
      title:
        "Are capture failures early teething problems, or a fundamental scaling barrier?",
      content:
        "Norway's Sleipner has stored over 20 million tonnes of CO2 safely under the North Sea since 1996, proving geological storage works. But an IEEFA review found 10 of the 13 flagship projects underperformed or failed, Boundary Dam 3 averaged closer to 50% capture against its 90% design rating, and Petra Nova was mothballed when oil prices fell. With total operational capacity around 50 million tonnes per year and pathways assuming gigatonnes, is the world watching a maturing technology climb a learning curve, or a 25-year pattern of missed targets that will not scale?",
    },
    {
      id: "q3",
      title:
        "Will capture costs fall enough to matter, or hit a stubborn floor?",
      content:
        "Direct air capture still costs roughly $300-1,000 per tonne, Climeworks' Mammoth flagship reportedly captured only about 105 tonnes in ten months against a 36,000-tonne design, and power-plant capture carries a 10-30% energy penalty. Proponents point to $250-350-per-tonne targets by 2030 and solar-like learning curves; skeptics argue that pulling 0.04%-concentration CO2 from the air sets a thermodynamic floor and that every dollar buys more mitigation if spent on renewables. Will capture follow solar's cost collapse, or stay too expensive for anything but the residual emissions that have no other fix?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
