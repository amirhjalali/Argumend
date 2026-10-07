import type { TopicInput } from "@/lib/schemas/topic";

export const geoengineeringClimateData = {
  id: "geoengineering-climate",
  title: "Solar Geoengineering: Buy Time or Distraction?",
  question:
    "Is solar geoengineering now a necessary complement to cutting emissions?",
  meta_claim:
    "Solar geoengineering, particularly stratospheric aerosol injection, is now a necessary complement to emissions reduction, not a dangerous distraction from it.",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "In 1991 Mount Pinatubo put roughly 20 million tons of sulfur dioxide into the stratosphere and cooled the planet by about 0.5°C for two years, while global rainfall fell and South Asia's monsoon was disrupted. Both sides accept that record: sunlight reflection can cool the planet within years, and it shifts rainfall as it does. The fight is over whether doing it on purpose would buy real time while emission cuts and carbon removal catch up, or ease the pressure to cut emissions.",
    confidence: 88,
    source: "NASA; NOAA; Journal of Geophysical Research",
    sourceUrl:
      "https://earthobservatory.nasa.gov/images/1510/global-effects-of-mount-pinatubo",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that cutting emissions is the lower-risk path, that current CO2 levels are dangerously high, that solar geoengineering would alter regional rainfall and that stopping it abruptly would cause catastrophic termination shock, and that no adequate international framework exists to govern it.",
    "They split over whether emission cuts plus carbon removal can arrive fast enough to hold warming at tolerable levels without reflecting sunlight; whether solar geoengineering would leave every major region better off or create net losers, such as the monsoon belts of South Asia and West Africa; and whether the option of an engineered fix weakens public support for cutting emissions.",
  ],
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
      title: "Can solar geoengineering be governed so it never stops abruptly?",
      content:
        "If stratospheric aerosol injection were halted suddenly, by war, economic crisis or political change, the warming it masked would return within about a decade, faster than any natural warming. No international framework governs deployment today, so one nation could act alone and affect every other. Is termination shock a governance problem that agreements, redundant deployment and gradual phase-down can manage, or a risk no institution can credibly rule out for as long as the aerosols would have to stay up?",
    },
    {
      id: "q3",
      title: "Does solar geoengineering create a moral hazard that delays emissions reductions?",
      content:
        "If we believe dimming the sun can get us out of climate change, do we lose urgency to cut fossil fuels? Critics point to fossil fuel companies backing engineered fixes such as carbon capture while lobbying against emissions regulations. Is a sunlight-reflection option a genuine backup or a delay tactic?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The Buying-Time Argument
    // =========================================================================
    {
      id: "necessity-argument",
      title: "The Buying-Time Argument",
      short_summary:
        "Proponents argue that even aggressive emission cuts leave warming above safe thresholds for decades, and that carbon removal, which the IPCC builds into every 1.5°C pathway, cannot be scaled fast enough to close that gap on its own, so reflecting sunlight may be needed to shave the peak. Skeptics answer that the gap is a product of failing to cut, not of physics. Whether carbon capture and removal can work at scale and at what cost is the broader question of its own map, \"Is carbon capture a necessary and viable tool for reaching net zero?\" This pillar asks only whether cuts and removal together arrive in time without sunlight reflection.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The necessity framing is premature and self-serving. We have not yet tried aggressive emissions reduction: global fossil fuel subsidies still exceed $7 trillion annually (IMF 2023), and no major economy has implemented carbon pricing at levels economists recommend. Declaring solar geoengineering 'necessary' before exhausting conventional mitigation gives political cover for inaction on emissions. The IPCC scenarios that lean on carbon removal assume we fail to cut emissions fast enough; they describe a failure mode, not a preferred pathway, and the answer to a failure mode is to stop failing, not to dim the sun. Every dollar and every year of political attention spent on sunlight reflection is one not spent on proven emission reduction strategies.",
      proponent_rebuttal:
        "The either-or framing is a false choice that ignores atmospheric physics. Even if the world achieved net-zero emissions tomorrow, the 1.5 trillion tons of CO2 already in the atmosphere will continue warming the planet for centuries. The carbon budget for 1.5 degrees Celsius has already been largely exhausted: the IPCC's AR6 report gives a remaining budget of only 500 gigatons of CO2, roughly 12 years of current emissions. Carbon removal is the IPCC's answer to that overshoot, but drawing down hundreds of gigatons takes decades of build-out, and warming does its damage in the meantime. Solar geoengineering is the one known lever that could cool the planet within years, which is why it is argued for as a bridge alongside cuts and removal, not a replacement for them. The National Academies of Sciences recommended a major research program in solar geoengineering precisely because the gap between current emissions trajectories and safe warming levels is growing, not shrinking.",
      crux: {
        id: "carbon-budget-arithmetic",
        title: "The Time-Gap Test",
        question:
          "Can emission cuts plus carbon removal arrive fast enough that sunlight reflection is never needed?",
        description:
          "The crux is whether deep emission cuts, together with carbon removal built at a realistic pace, can keep peak warming within the 1.5-2 degree Celsius range without a long overshoot, or whether the arithmetic leaves decades of excess warming that only a fast-acting cooling measure could blunt. If cuts and removal can hold the peak in time, solar geoengineering becomes an insurance option at most. If they leave a long overshoot regardless of how aggressively emissions are cut, the case for reflecting sunlight as a bridge is much stronger.",
        methodology:
          "Commission independent modeling of peak warming and overshoot duration under several emissions reduction scenarios (immediate net-zero, linear reduction to 2050, current trajectory). In each, add carbon removal at build-out rates drawn from observed deployment rather than the volumes integrated assessment models assume, include the maximum plausible uptake by natural sinks (oceans, forests, soil), and report how many years warming stays above 1.5 and 2 degrees Celsius. Compare those overshoot periods with the cooling a solar geoengineering program could deliver over the same years.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Independent modeling of peak temperature and overshoot length under immediate net-zero, linear-to-2050 and current-trajectory scenarios, with removal added at observed build-out rates rather than assumed volumes, plus natural-sink uptake.",
        },
        cost_to_verify:
          "$200K-500K (Peak-warming and overshoot modeling with multiple independent research groups)",
        falsification: {
          supporter_flip:
            "If independent modeling showed that aggressive emission cuts plus carbon removal built at realistic rates could keep peak warming within 1.5-2°C without a long overshoot, the case for sunlight reflection as a necessary bridge would shrink to an insurance option that might never be used.",
          skeptic_flip:
            "If budget work confirmed a remaining 1.5°C budget of about 12 years of current emissions, and showed removal at realistic build-out rates leaving decades of overshoot even under deep cuts, calling a fast-acting cooling bridge self-serving would be hard to hold.",
          common_ground:
            "Both sides agree emission cuts are the lower-risk path, that fossil fuel subsidies should be eliminated, and that current CO2 levels are dangerously high.",
          live_disagreement:
            "Whether cuts plus carbon removal can hold peak warming down in time, or leave an overshoot that only reflecting sunlight could blunt: resolvable by independent modeling of peak warming and overshoot length across immediate-net-zero, linear-to-2050, and current-trajectory scenarios.",
        },
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
            directness: 7,
          },
          source: "Intergovernmental Panel on Climate Change",
          sourceUrl: "https://www.ipcc.ch/report/ar6/syr/",
          reasoning:
            "The IPCC represents the highest scientific authority on climate change, synthesizing thousands of studies with rigorous review. On this map the finding bears on timing: if every 1.5C pathway needs 100-1000 gigatons of removal over the century, warming would keep rising while removal capacity is built, which is the gap proponents say sunlight reflection could bridge. Whether that removal can be built at all, and at what cost, is weighed on the carbon-capture map.",
        },
        {
          id: "fossil-fuel-subsidies-imf",
          title: "IMF: Global Fossil Fuel Subsidies Reached $7 Trillion in 2022",
          description:
            "The International Monetary Fund estimated that global fossil fuel subsidies (explicit and implicit) reached $7 trillion in 2022 — roughly 7.1% of global GDP. This includes both direct production subsidies and the failure to price externalities like air pollution and climate damage. Critics argue that declaring solar geoengineering 'necessary' while massively subsidizing the cause of the problem is incoherent — the first priority should be eliminating subsidies that actively worsen emissions.",
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
            "IMF data is highly reliable and independent. The fossil fuel subsidy figure powerfully illustrates untapped emission reduction potential. However, directness is moderate because the existence of subsidies does not determine whether a cooling bridge is also needed: subsidy removal and sunlight reflection could both be required.",
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
        "Solar geoengineering affects global weather systems, meaning unilateral deployment by one nation could harm others. No international governance framework exists for interventions that affect the entire planet. The risks include altered monsoon patterns affecting billions, ozone depletion, and termination shock if interventions are suddenly stopped.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Solar radiation management would introduce entirely new categories of global risk. Climate models show that stratospheric aerosol injection would reduce rainfall in monsoon regions that support billions of people in South and Southeast Asia and sub-Saharan Africa. A 2024 Nature study found that SRM sufficient to cool the Northern Hemisphere by 1 degree Celsius could reduce rainfall in the Sahel by up to 10%, threatening food security for hundreds of millions. The 'termination shock' problem is equally severe: if aerosol injection were stopped abruptly (due to war, economic crisis, or political change), temperatures would spike by 2-4 degrees Celsius within a decade — faster than any natural warming — devastating ecosystems and agriculture. No international governance framework exists, meaning any nation could unilaterally deploy SRM, affecting every other nation without consent.",
      proponent_rebuttal:
        "The unintended consequences argument applies equally to the unmitigated climate change it seeks to prevent. Unchecked warming of 3-4 degrees Celsius will cause far more devastating monsoon disruption, agricultural failure, and ecosystem collapse than any geoengineering side effect. The question is not 'geoengineering vs. a stable climate' but 'geoengineering vs. catastrophic unmanaged warming.' Climate models do show regional precipitation changes from SRM, but they also show these effects are smaller and more manageable than the effects of unmitigated warming. Termination shock is a governance challenge, not a physical law — adequate international agreements with redundant deployment systems and gradual phase-down protocols can prevent abrupt cessation. The governance gap is an argument for building governance, not for abandoning research.",
      crux: {
        id: "regional-impact-modeling",
        title: "The Regional Impact Comparison",
        question:
          "Would solar geoengineering benefit every major region, or leave some regions worse off?",
        description:
          "The crux is whether the regional side effects of geoengineering (particularly SRM's impact on monsoon patterns and precipitation) are smaller than the regional impacts of unmitigated climate change. If modeling shows that SRM produces net benefits across all major regions compared to a no-intervention baseline, the risk-benefit calculus favors deployment. If some regions are made significantly worse off by SRM, the governance challenge becomes paramount.",
        methodology:
          "Run high-resolution climate models comparing three scenarios: (1) unmitigated warming at 3-4C, (2) SRM sufficient to limit warming to 1.5-2C, and (3) aggressive emission cuts without SRM. Evaluate regional outcomes across all major population centers for precipitation, agriculture, extreme weather frequency, sea level rise, and heat stress. Identify regions that would be net winners and net losers under each scenario. Engage climate modeling groups from multiple countries to ensure no single group's assumptions dominate results.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A high-resolution multi-model ensemble comparing each major populated region, including the South Asian and West African monsoon belts, under SRM held to 1.5-2°C, under unmitigated 3-4°C warming, and under deep cuts alone.",
        },
        cost_to_verify:
          "$5-15M (Multi-model ensemble regional climate impact analysis)",
        falsification: {
          supporter_flip:
            "If a multi-model ensemble showed that SRM sufficient to limit warming to 1.5-2°C leaves at least one major populated region (e.g. the South Asian or West African monsoon belt) significantly worse off than even a 3-4°C no-intervention world, the 'side effects are smaller than unmitigated warming' rebuttal would fail and the governance problem of harming non-consenting nations would dominate.",
          skeptic_flip:
            "If model ensembles found 3-4°C warming hitting the same monsoon regions at least as hard, with the cooling mechanism Mount Pinatubo demonstrated holding and termination shock treatable as a governance risk, the comparison would run against catastrophic warming rather than a stable climate.",
          common_ground:
            "Both sides agree SRM would alter regional precipitation, that termination shock would be catastrophic if injection stopped abruptly, and that no adequate international governance framework currently exists.",
          live_disagreement:
            "Whether SRM produces net regional benefits across all major population centers relative to a no-intervention baseline, or leaves identifiable net losers — resolvable only by high-resolution, multi-country climate model ensembles comparing unmitigated warming, SRM, and aggressive-cuts scenarios.",
        },
      },
      evidence: [
        {
          id: "srm-monsoon-disruption",
          title: "Climate Models Show Solar Geoengineering Could Cut Monsoon Rainfall by 5-7%",
          description:
            "A 2013 study of 12 Earth system models in the Geoengineering Model Intercomparison Project (GeoMIP) simulated dimming sunlight enough to cancel the warming from a quadrupling of CO2. Temperatures stayed close to preindustrial levels, but global precipitation fell by about 4.5%, with significant reductions over monsoonal land regions: East Asia (6%), North America (7%), South America (6%) and southern Africa (5%). Months of heavy rainfall became up to 20% less frequent. The authors describe the result as a considerable weakening of the hydrological cycle in a geoengineered world.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Tilmes et al., \"The hydrological impact of geoengineering in the Geoengineering Model Intercomparison Project (GeoMIP),\" Journal of Geophysical Research: Atmospheres (2013)",
          sourceUrl: "https://doi.org/10.1002/jgrd.50868",
          reasoning:
            "A multi-model intercomparison is the strongest evidence modeling can offer, and the monsoon reductions are the ones the models agree on. Directness is moderate: the experiment is idealized (an instant solar dimming against an instant CO2 quadrupling, not a realistic aerosol injection), and no model result has been validated against real-world deployment because none has occurred. If the pattern holds, the regions that depend on monsoon rain would bear side effects of a decision they may not control.",
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
        "If dimming the sun is perceived as a viable fallback, it may reduce political urgency for emission cuts, the most effective and least risky climate strategy. Critics point to the fossil fuel industry's backing of other engineered fixes, carbon capture above all, as the pattern to fear; whether carbon capture itself prolongs fossil fuel use is argued on the carbon-capture map, \"Is carbon capture a necessary and viable tool for reaching net zero?\" This pillar asks only whether a sunlight-reflection option weakens support for cuts.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Solar geoengineering offers the most tempting fallback of all: a way to cool the planet within years without touching the energy system. The fear is that an engineered thermostat lets governments and industry defer costly cuts while CO2 keeps accumulating behind the mask. The industry's record with an earlier engineered fix shows the pattern: ExxonMobil, Chevron, Shell, and Occidental Petroleum all have significant investments in carbon capture technology while continuing to expand oil and gas production, and the American Petroleum Institute has endorsed carbon capture as a climate solution while lobbying against methane regulations, clean energy standards, and carbon taxes. A sunlight-reflection option would offer the same cover at planetary scale. The moral hazard is not hypothetical; it is the documented strategy of the world's most powerful industry to maintain the fossil fuel economy under the guise of technological optimism.",
      proponent_rebuttal:
        "The moral hazard argument assumes that political will for emission cuts exists and that geoengineering research is what is holding it back. In reality, we have had 30 years of climate negotiations and global emissions are still rising. The COP process has produced targets that no major emitter is on track to meet. The political obstacles to emission reduction — energy costs, economic competitiveness, developing nation aspirations — exist independently of geoengineering. Rejecting solar geoengineering research because fossil fuel companies back other engineered fixes is a genetic fallacy: the validity of a research program does not depend on who funds adjacent work. Solar panels were initially developed with oil company funding; that does not make solar energy a fossil fuel conspiracy. The real moral hazard is refusing to research backup options while the primary strategy demonstrably fails to meet its own targets.",
      crux: {
        id: "political-will-displacement",
        title: "The Political Will Displacement Test",
        question:
          "Does the option of solar geoengineering weaken public support for cutting emissions?",
        description:
          "The crux is whether investment in and public communication about solar geoengineering measurably reduces political support for emission reduction policies. If survey experiments and follow-up panels show that exposure to geoengineering messaging decreases willingness to pay for carbon taxes or support emission regulations, the moral hazard is empirically real. If support for emission cuts is unaffected by awareness of geoengineering options, the moral hazard is theoretical.",
        methodology:
          "Conduct randomized survey experiments across 10+ countries where participants are exposed to information about geoengineering feasibility and then asked about their support for emission reduction policies, carbon pricing, and personal behavioral changes. Compare with control groups who receive only emission reduction messaging. Additionally, follow a panel of the same respondents for a year or more, re-measuring their support after major solar geoengineering news, to test whether any effect appears or grows over time.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Randomized survey experiments in 10+ countries that show some people solar geoengineering feasibility and others emission-cut messaging only, then re-measure the same respondents' support for carbon pricing and regulation a year later.",
        },
        cost_to_verify:
          "$300K-800K (Multi-country survey experiment with a year-long follow-up panel)",
        falsification: {
          supporter_flip:
            "If well-powered, long-horizon survey experiments and panels showed that exposure to solar geoengineering feasibility reliably lowers willingness to pay for carbon taxes or support emission regulations — especially when concrete costs are at stake — the 'genuine complement' framing would yield to the 'dangerous distraction' charge, and research promotion itself would carry a real political cost.",
          skeptic_flip:
            "If further survey experiments matched the UK, US and Singapore findings of no average drop in support for emission cuts after learning about solar geoengineering, and emissions had flattened in the 30 years before any such talk, the distraction charge would lose its footing.",
          common_ground:
            "Both sides agree fossil fuel companies fund engineered fixes such as carbon capture while expanding production, that political will for deep emission cuts has been chronically inadequate, and that moral hazard is at least a plausible risk worth measuring.",
          live_disagreement:
            "Whether exposure to a solar geoengineering option measurably erodes support for emission reduction over the long run, or leaves it intact: resolvable only by randomized multi-country survey experiments with long-horizon follow-up panels.",
        },
      },
      evidence: [
        {
          id: "fossil-fuel-ccs-investment",
          title: "Fossil Fuel Companies Invest in CCS While Expanding Production",
          description:
            "Major oil and gas companies have invested billions in carbon capture and storage while simultaneously expanding fossil fuel production. Shell's Quest CCS project in Canada captures 1 million tons of CO2 annually — while Shell's global operations produce over 1.3 billion tons of CO2-equivalent emissions per year. Occidental Petroleum's Stratos DAC project received $600 million in tax credits while the company increased oil production. The ratio of captured to emitted CO2 across the industry is less than 0.1%, suggesting CCS functions more as a narrative tool than a meaningful climate solution.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "Global CCS Institute; Carbon Tracker; The Guardian",
          sourceUrl: "https://www.globalccsinstitute.com/resources/global-status-of-ccs-2023/",
          reasoning:
            "The disproportion between CCS investment/capture and continued emissions expansion is well-documented across multiple independent sources. The card is about carbon capture, not sunlight reflection; it bears here as the industry pattern critics expect a solar geoengineering option to repeat, using an engineered fix as political cover for continued production, and therefore counts against the meta-claim that solar geoengineering is a genuine necessary complement rather than a distraction.",
        },
        {
          id: "moral-hazard-survey-evidence",
          title: "Study: Geoengineering Awareness Does Not Reduce Emission Reduction Support",
          description:
            "Survey experiments, including a nationally representative study in Britain and balanced-information experiments in the US and Singapore, found that informing participants about solar geoengineering did not on average reduce their support for emission reduction policies, taxing polluting energy, or trust in climate science. Participants maintained or in some cases increased support after learning about SRM as a potential complement. The researchers concluded that the moral hazard concern, while theoretically plausible, is not supported by the available experimental evidence — though findings are mixed and effects could differ over longer time horizons.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "Climatic Change (Fairbrother 2016); Scientific Reports (2023)",
          sourceUrl: "https://www.nature.com/articles/s41598-023-46952-w",
          reasoning:
            "These experiments directly test the moral hazard hypothesis and find no average support for it, which undercuts the 'dangerous distraction' charge and therefore supports the meta-claim. Replicability is lower because survey experiments may not capture long-term political dynamics — people may maintain abstract support while becoming less willing to bear concrete costs if they believe a technological fix exists — and the broader literature reports mixed results.",
        },
      ],
    },
  ],
} satisfies TopicInput;
