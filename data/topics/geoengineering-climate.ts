import type { Topic } from "@/lib/schemas/topic";

export const geoengineeringClimateData = {
  id: "geoengineering-climate",
  title: "Geoengineering & Carbon Capture",
  meta_claim:
    "Geoengineering interventions — particularly stratospheric aerosol injection and direct air carbon capture — are now a necessary complement to emissions reduction, not a dangerous distraction from it.",
  status: "contested" as const,
  category: "science" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Reflecting Sunlight: Recommendations for Solar Geoengineering Research — National Academies",
      url: "https://nap.nationalacademies.org/catalog/25762/reflecting-sunlight-recommendations-for-solar-geoengineering-research-and-research-governance",
    },
    {
      title: "The State of Carbon Dioxide Removal — CO2RE",
      url: "https://www.stateofcdr.org/",
    },
    {
      title: "Geoengineering the Climate: Science, Governance, and Uncertainty — Royal Society",
      url: "https://royalsociety.org/topics-policy/publications/2009/geoengineering-climate/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can solar radiation management buy time without catastrophic side effects?",
      content:
        "Models suggest stratospheric aerosol injection could cool the planet 1-2 degrees Celsius, but risks include ozone depletion, altered monsoon patterns affecting billions, and 'termination shock' — rapid warming if injection is stopped abruptly. Is this an acceptable risk given the alternative of unchecked warming?",
    },
    {
      id: "q2",
      title: "Is direct air carbon capture economically viable at the scale needed?",
      content:
        "Current cost: $400-600 per ton of CO2. We need to remove 10+ gigatons per year. The total annual cost could exceed global military spending. Is this a realistic pathway, or an expensive distraction from emission reduction?",
    },
    {
      id: "q3",
      title: "Does geoengineering create a moral hazard that delays emissions reductions?",
      content:
        "If we believe we can engineer our way out of climate change, do we lose urgency to cut fossil fuels? Fossil fuel companies fund carbon capture research while lobbying against emissions regulations — is geoengineering a genuine solution or a delay tactic?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Necessity Argument
    // =========================================================================
    {
      id: "necessity-argument",
      title: "The Necessity Argument",
      short_summary:
        "Even with the most aggressive emissions cuts, we have already locked in warming that exceeds safe thresholds. The IPCC states that all pathways to limiting warming to 1.5 degrees Celsius require carbon dioxide removal at scale. The question is not whether geoengineering is ideal, but whether it is necessary given the reality of accumulated emissions.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The necessity framing is premature and self-serving. We have not yet tried aggressive emissions reduction — global fossil fuel subsidies still exceed $7 trillion annually (IMF 2023), and no major economy has implemented carbon pricing at levels economists recommend. Declaring geoengineering 'necessary' before exhausting conventional mitigation gives political cover for inaction on emissions. The IPCC scenarios that require carbon removal assume we fail to cut emissions fast enough — they describe a failure mode, not a preferred pathway. Direct air capture at current costs ($400-600/ton) is orders of magnitude more expensive than preventing emissions in the first place (~$50-100/ton through renewable energy deployment). Every dollar spent on geoengineering R&D is a dollar not spent on proven emission reduction strategies.",
      proponent_rebuttal:
        "The either-or framing is a false choice that ignores atmospheric physics. Even if the world achieved net-zero emissions tomorrow, the 1.5 trillion tons of CO2 already in the atmosphere will continue warming the planet for centuries. The carbon budget for 1.5 degrees Celsius has already been largely exhausted — the IPCC's AR6 report gives a remaining budget of only 500 gigatons of CO2, roughly 12 years of current emissions. This arithmetic reality means carbon removal is not an alternative to emission cuts but a necessary complement. Waiting until we have 'tried hard enough' on emissions means waiting until it is too late for removal to matter. The National Academies of Sciences recommended a major research program in solar geoengineering precisely because the gap between current emissions trajectories and safe warming levels is growing, not shrinking.",
      crux: {
        id: "carbon-budget-arithmetic",
        title: "The Carbon Budget Reality Check",
        description:
          "The crux is whether the remaining carbon budget for 1.5 or 2 degrees Celsius can be stayed within through emissions reduction alone, or whether the math requires carbon dioxide removal at scale regardless of how aggressively emissions are cut. If the arithmetic shows removal is physically necessary to meet any safe warming target, the necessity argument is settled. If aggressive emissions cuts alone can stay within budget, geoengineering becomes optional.",
        methodology:
          "Commission an independent analysis of the remaining carbon budget under various emissions reduction scenarios (immediate net-zero, linear reduction to 2050, current trajectory). Calculate the quantity of accumulated CO2 that must be removed to return to safe atmospheric concentrations under each scenario. Compare removal requirements against the maximum theoretical capacity of natural sinks (oceans, forests, soil) to determine whether technological carbon removal is required.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Carbon budget modeling with multiple independent research groups)",
      },
      evidence: [
        {
          id: "ipcc-ar6-carbon-removal",
          title: "IPCC AR6: All 1.5C Pathways Require Carbon Dioxide Removal",
          description:
            "The IPCC's Sixth Assessment Report (2021-2023) states that all assessed pathways that limit warming to 1.5 degrees Celsius with limited or no overshoot require carbon dioxide removal (CDR) ranging from 100-1000 gigatons of CO2 over the 21st century. Even 2-degree pathways require significant CDR. The report explicitly states that CDR is 'unavoidable' as a complement to deep emission reductions to achieve net-zero CO2 emissions.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "Intergovernmental Panel on Climate Change",
          sourceUrl: "https://www.ipcc.ch/report/ar6/syr/",
          reasoning:
            "The IPCC represents the highest scientific authority on climate change, synthesizing thousands of studies with rigorous review. The finding that CDR is required in all 1.5C pathways is as direct and authoritative as climate science gets.",
        },
        {
          id: "fossil-fuel-subsidies-imf",
          title: "IMF: Global Fossil Fuel Subsidies Reached $7 Trillion in 2022",
          description:
            "The International Monetary Fund estimated that global fossil fuel subsidies (explicit and implicit) reached $7 trillion in 2022 — roughly 7.1% of global GDP. This includes both direct production subsidies and the failure to price externalities like air pollution and climate damage. Critics argue that declaring geoengineering 'necessary' while massively subsidizing the cause of the problem is incoherent — the first priority should be eliminating subsidies that actively worsen emissions.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "International Monetary Fund",
          sourceUrl: "https://www.imf.org/en/Topics/climate-change/energy-subsidies",
          reasoning:
            "IMF data is highly reliable and independent. The fossil fuel subsidy figure powerfully illustrates untapped emission reduction potential. However, directness is moderate because the existence of subsidies does not determine whether CDR is also necessary — both subsidy removal and CDR could be required simultaneously.",
        },
        {
          id: "climeworks-orca-plant",
          title: "Climeworks' Orca DAC Plant Captures 4,000 Tons CO2/Year at ~$600/Ton",
          description:
            "Climeworks' Orca plant in Iceland, operational since 2021, is the world's largest direct air capture facility, removing approximately 4,000 tons of CO2 per year. At an estimated cost of $600/ton, removing the 40 gigatons the world emits annually would cost $24 trillion — exceeding the US GDP. The successor Mammoth plant aims to capture 36,000 tons/year, still minuscule against the scale required. Costs must drop 90%+ for DAC to be viable at climate-relevant scale.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Climeworks; IEA; MIT Technology Review",
          sourceUrl: "https://www.iea.org/reports/direct-air-capture-2022",
          reasoning:
            "Real operational data from the world's largest DAC facility. This directly demonstrates both the technological feasibility and the massive cost barrier to climate-relevant scale. Independence is slightly lower because some performance data comes from Climeworks itself.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Unintended Consequences
    // =========================================================================
    {
      id: "unintended-consequences",
      title: "Unintended Consequences & Governance",
      short_summary:
        "Geoengineering affects global weather systems, meaning unilateral deployment by one nation could harm others. No international governance framework exists for interventions that affect the entire planet. The risks include altered monsoon patterns affecting billions, ozone depletion, and termination shock if interventions are suddenly stopped.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Solar radiation management would introduce entirely new categories of global risk. Climate models show that stratospheric aerosol injection would reduce rainfall in monsoon regions that support billions of people in South and Southeast Asia and sub-Saharan Africa. A 2024 Nature study found that SRM sufficient to cool the Northern Hemisphere by 1 degree Celsius could reduce rainfall in the Sahel by up to 10%, threatening food security for hundreds of millions. The 'termination shock' problem is equally severe: if aerosol injection were stopped abruptly (due to war, economic crisis, or political change), temperatures would spike by 2-4 degrees Celsius within a decade — faster than any natural warming — devastating ecosystems and agriculture. No international governance framework exists, meaning any nation could unilaterally deploy SRM, affecting every other nation without consent.",
      proponent_rebuttal:
        "The unintended consequences argument applies equally to the unmitigated climate change it seeks to prevent. Unchecked warming of 3-4 degrees Celsius will cause far more devastating monsoon disruption, agricultural failure, and ecosystem collapse than any geoengineering side effect. The question is not 'geoengineering vs. a stable climate' but 'geoengineering vs. catastrophic unmanaged warming.' Climate models do show regional precipitation changes from SRM, but they also show these effects are smaller and more manageable than the effects of unmitigated warming. Termination shock is a governance challenge, not a physical law — adequate international agreements with redundant deployment systems and gradual phase-down protocols can prevent abrupt cessation. The governance gap is an argument for building governance, not for abandoning research.",
      crux: {
        id: "regional-impact-modeling",
        title: "The Regional Impact Comparison",
        description:
          "The crux is whether the regional side effects of geoengineering (particularly SRM's impact on monsoon patterns and precipitation) are smaller than the regional impacts of unmitigated climate change. If modeling shows that SRM produces net benefits across all major regions compared to a no-intervention baseline, the risk-benefit calculus favors deployment. If some regions are made significantly worse off by SRM, the governance challenge becomes paramount.",
        methodology:
          "Run high-resolution climate models comparing three scenarios: (1) unmitigated warming at 3-4C, (2) SRM sufficient to limit warming to 1.5-2C, and (3) aggressive emission cuts without SRM. Evaluate regional outcomes across all major population centers for precipitation, agriculture, extreme weather frequency, sea level rise, and heat stress. Identify regions that would be net winners and net losers under each scenario. Engage climate modeling groups from multiple countries to ensure no single group's assumptions dominate results.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-15M (Multi-model ensemble regional climate impact analysis)",
      },
      evidence: [
        {
          id: "srm-monsoon-disruption",
          title: "Studies Show SRM Could Reduce Monsoon Rainfall by 5-10%",
          description:
            "Multiple climate modeling studies, including a 2022 Nature Geoscience paper, find that stratospheric aerosol injection designed to offset global warming would reduce precipitation in tropical monsoon regions by 5-10%. The Indian and West African monsoon systems, which support food production for over 2 billion people, would be disproportionately affected. This creates a fundamental equity problem: the nations most vulnerable to geoengineering side effects are those least responsible for climate change.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Nature Geoscience; Geoengineering Model Intercomparison Project",
          sourceUrl: "https://www.nature.com/articles/s41561-022-00999-6",
          reasoning:
            "Published in top-tier journals using established climate models, this research directly quantifies the regional harm from SRM. However, model uncertainty remains significant — different models produce different regional projections, and none have been validated against real-world geoengineering deployment because none has occurred.",
        },
        {
          id: "mt-pinatubo-natural-experiment",
          title: "Mount Pinatubo Eruption Provides Natural Analog for SRM (1991)",
          description:
            "The 1991 eruption of Mount Pinatubo injected roughly 20 million tons of sulfur dioxide into the stratosphere, cooling global temperatures by approximately 0.5 degrees Celsius for two years. The event provides the closest natural analog to stratospheric aerosol injection. While cooling was confirmed, side effects included reduced global precipitation, ozone depletion, and disrupted monsoon patterns in South Asia. The Pinatubo data both validates the cooling mechanism of SRM and illustrates its potential side effects.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "NASA; NOAA; Journal of Geophysical Research",
          sourceUrl: "https://earthobservatory.nasa.gov/images/1510/global-effects-of-mount-pinatubo",
          reasoning:
            "Pinatubo is the best available natural experiment for SRM effects. The data is from independent scientific agencies observing a natural event, giving it high reliability and independence. It simultaneously validates the cooling mechanism (supporting SRM feasibility) and documents side effects (supporting concern about unintended consequences).",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Moral Hazard
    // =========================================================================
    {
      id: "moral-hazard",
      title: "The Moral Hazard Problem",
      short_summary:
        "Fossil fuel companies actively fund carbon capture and geoengineering research while lobbying against emissions regulations. If geoengineering is perceived as a viable fallback, it may reduce political urgency for emission cuts — the most effective and least risky climate strategy.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The fossil fuel industry's strategic investment in geoengineering is not a coincidence. ExxonMobil, Chevron, Shell, and Occidental Petroleum all have significant investments in carbon capture technology while continuing to expand oil and gas production. The American Petroleum Institute has endorsed carbon capture as a climate solution while lobbying against methane regulations, clean energy standards, and carbon taxes. Carbon capture at the point of emission (CCS) has been promoted for two decades but captures less than 0.1% of global emissions because it is enormously expensive and provides a justification for continued fossil fuel use. The moral hazard is not hypothetical — it is the documented strategy of the world's most powerful industry to maintain the fossil fuel economy under the guise of technological optimism.",
      proponent_rebuttal:
        "The moral hazard argument assumes that political will for emission cuts exists and that geoengineering research is what is holding it back. In reality, we have had 30 years of climate negotiations and global emissions are still rising. The COP process has produced targets that no major emitter is on track to meet. The political obstacles to emission reduction — energy costs, economic competitiveness, developing nation aspirations — exist independently of geoengineering. Rejecting carbon removal research because fossil fuel companies also support it is genetic fallacy — the validity of CDR does not depend on who funds the research. Solar panels were initially developed with oil company funding; that does not make solar energy a fossil fuel conspiracy. The real moral hazard is refusing to research backup options while the primary strategy demonstrably fails to meet its own targets.",
      crux: {
        id: "political-will-displacement",
        title: "The Political Will Displacement Test",
        description:
          "The crux is whether investment in and public communication about geoengineering measurably reduces political support for emission reduction policies. If survey experiments and natural experiments show that exposure to geoengineering messaging decreases willingness to pay for carbon taxes or support emission regulations, the moral hazard is empirically real. If support for emission cuts is unaffected by awareness of geoengineering options, the moral hazard is theoretical.",
        methodology:
          "Conduct randomized survey experiments across 10+ countries where participants are exposed to information about geoengineering feasibility and then asked about their support for emission reduction policies, carbon pricing, and personal behavioral changes. Compare with control groups who receive only emission reduction messaging. Additionally, analyze natural experiments where countries or states that have invested heavily in CCS show different trajectories in emission reduction policy support compared to those that have not.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Multi-country survey experiment with natural experiment analysis)",
      },
      evidence: [
        {
          id: "fossil-fuel-ccs-investment",
          title: "Fossil Fuel Companies Invest in CCS While Expanding Production",
          description:
            "Major oil and gas companies have invested billions in carbon capture and storage while simultaneously expanding fossil fuel production. Shell's Quest CCS project in Canada captures 1 million tons of CO2 annually — while Shell's global operations produce over 1.3 billion tons of CO2-equivalent emissions per year. Occidental Petroleum's Stratos DAC project received $600 million in tax credits while the company increased oil production. The ratio of captured to emitted CO2 across the industry is less than 0.1%, suggesting CCS functions more as a narrative tool than a meaningful climate solution.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "Global CCS Institute; Carbon Tracker; The Guardian",
          sourceUrl: "https://www.globalccsinstitute.com/resources/global-status-of-ccs-2023/",
          reasoning:
            "The disproportion between CCS investment/capture and continued emissions expansion is well-documented across multiple independent sources. This directly supports the moral hazard thesis by showing that industry behavior is consistent with using CCS as political cover for continued production.",
        },
        {
          id: "moral-hazard-survey-evidence",
          title: "Study: Geoengineering Awareness Does Not Reduce Emission Reduction Support",
          description:
            "A 2023 study published in Nature Climate Change found that informing participants about solar geoengineering did not significantly reduce their support for emission reduction policies. Participants maintained or slightly increased support for carbon taxes and clean energy mandates after learning about SRM as a potential complement. The researchers concluded that the moral hazard concern, while theoretically plausible, is not supported by available experimental evidence.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "Nature Climate Change",
          sourceUrl: "https://www.nature.com/articles/s41558-023-01668-5",
          reasoning:
            "This directly tests the moral hazard hypothesis using experimental methods and finds no support for it. Published in a top climate journal with strong methodology. Replicability is lower because survey experiments may not capture long-term political dynamics — people may maintain abstract support while becoming less willing to bear concrete costs if they believe a technological fix exists.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
