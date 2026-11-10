import type { TopicInput } from "@/lib/schemas/topic";

export const geoengineeringClimateData = {
  id: "geoengineering-climate",
  title: "Solar Geoengineering: Buy Time or Distraction?",
  question: "Is dimming the sun a necessary backup to cutting emissions?",
  meta_claim:
    "Solar geoengineering, particularly stratospheric aerosol injection, is now a necessary complement to emissions reduction, not a dangerous distraction from it.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: WMO judged 2024 likely the first calendar year
  // above 1.5°C (1.55 ± 0.13°C); Forster et al. (June 2025) put the
  // remaining 1.5°C budget at 130 GtCO2, a little over three years of
  // 2024 emissions; the UK's ARIA is funding 22 teams (£56.8m) including
  // small outdoor experiments; Florida banned acts meant to change sunlight
  // or weather from 1 July 2025; EU science advisers urged a Europe-wide
  // moratorium on use (9 December 2024).
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In June 1991 Mount Pinatubo put about 15 million tons of sulfur dioxide into the stratosphere, and the world's average temperature fell about 0.6°C over the next 15 months. Rain over land fell too, and river flow into the oceans dropped by a record amount from October 1991 to September 1992. Copying that on purpose is now a live idea. 2024 was likely the first calendar year more than 1.5°C above pre-industrial levels; Britain is funding small outdoor experiments, Florida has banned them, and EU science advisers have urged a moratorium on use. The fight is over whether reflecting sunlight would buy time while emissions fall, or add new dangers and an excuse to delay.",
    confidence: 88,
    source:
      "NASA Earth Observatory, 'Global Effects of Mount Pinatubo'; Trenberth and Dai, Geophysical Research Letters (2007); WMO (10 January 2025)",
    sourceUrl:
      "https://science.nasa.gov/earth/earth-observatory/global-effects-of-mount-pinatubo-1510",
  },
  simple_case: [
    "The answer bears on whether governments fund experiments that could one day cool every country's weather, who gets to decide, and whether the billions of people who depend on monsoon rain would gain or lose from a cooler but drier world.",
    "The two sides split over whether cutting emissions plus pulling carbon out of the air can keep warming tolerable without reflecting sunlight; whether doing it would leave some regions, such as the monsoon belts, worse off; whether the option weakens support for cutting emissions; and whether experiments should go ahead before any global agreement on who decides.",
  ],
  aliases: [
    "Is solar geoengineering now a necessary complement to cutting emissions?",
    "Should we dim the sun to fight climate change?",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Reflecting Sunlight: Recommendations for Solar Geoengineering Research and Research Governance — National Academies (2021)",
      url: "https://www.nationalacademies.org/publications/25762",
    },
    {
      title: "Solar radiation modification — Group of Chief Scientific Advisors and European Group on Ethics (December 2024)",
      url: "https://scientificadvice.eu/advice/solar-radiation-modification/",
    },
    {
      title: "Exploring Climate Cooling programme — ARIA",
      url: "https://www.aria.org.uk/opportunity-spaces/future-proofing-our-climate-and-weather/exploring-climate-cooling",
    },
    {
      title: "Indicators of Global Climate Change 2024 — Forster et al., Earth System Science Data (2025)",
      url: "https://essd.copernicus.org/articles/17/2641/2025/",
    },
    {
      title: "Effects of Mount Pinatubo volcanic eruption on the hydrological cycle as an analog of geoengineering — Trenberth and Dai, GRL (2007)",
      url: "https://doi.org/10.1029/2007GL030524",
    },
    {
      title: "The State of Carbon Dioxide Removal — CO2RE",
      url: "https://www.stateofcdr.org/",
    },
    {
      title: "Geoengineering the Climate: Science, Governance, and Uncertainty — Royal Society",
      url: "https://royalsociety.org/topics-policy/publications/2009/geoengineering-climate/",
    },
    {
      title: "Asymmetric forcing from stratospheric aerosols impacts Sahelian rainfall — Haywood et al., Nature Climate Change (2013)",
      url: "https://doi.org/10.1038/nclimate1857",
    },
    {
      title: "The impact of abrupt suspension of solar radiation management (termination effect) in GeoMIP experiment G2 — Jones et al., JGR Atmospheres (2013)",
      url: "https://doi.org/10.1002/jgrd.50762",
    },
    {
      title: "Potentially dangerous consequences for biodiversity of solar geoengineering implementation and termination — Trisos et al., Nature Ecology & Evolution (2018)",
      url: "https://doi.org/10.1038/s41559-017-0431-0",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can solar radiation management buy time without catastrophic side effects?",
      content:
        "Models suggest stratospheric aerosol injection could cool the planet 1-2 degrees Celsius, but risks include ozone depletion, altered monsoon patterns affecting billions, and 'termination shock': rapid warming if injection is stopped abruptly. Is this an acceptable risk given the alternative of unchecked warming?",
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
        "If we believe dimming the sun can get us out of climate change, do we lose urgency to cut fossil fuels? A 2016 survey experiment in Britain found hearing about it did not lower most people's willingness to pay carbon taxes, while EU science advisers warned in 2024 that presenting it as a solution could damage efforts to cut emissions. Is a sunlight-reflection option a genuine backup or a delay tactic?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The time gap
    // =========================================================================
    {
      id: "necessity-argument",
      title: "Time: Can Cuts and Carbon Removal Alone Hold Warming Down?",
      short_summary:
        "The world passed 1.5°C for a calendar year in 2024, and at 2024 emissions the remaining 1.5°C carbon budget runs out in a little over three years. Proponents say cuts and carbon removal cannot close that gap fast enough, so reflecting sunlight may be needed to shave the peak. Skeptics answer that the gap comes from failing to cut, not from physics. Whether carbon capture works at scale is argued on its own map, \"Is carbon capture a necessary and viable tool for reaching net zero?\"",
      icon_name: "Target" as const,
      skeptic_premise:
        "The necessity framing is premature and self-serving. The world has not yet tried hard to cut emissions: the IMF puts fossil fuel subsidies at $0.73 trillion in explicit support and $6.7 trillion in unpriced damage in 2024, and few economies price carbon anywhere near what economists recommend. The IPCC scenarios that lean on carbon removal describe a failure to cut fast enough, not a preferred path; the answer to a failure is to stop failing, not to dim the sun. Every dollar and every year of political attention spent on sunlight reflection is one not spent on proven ways to cut emissions.",
      proponent_rebuttal:
        "The either-or framing ignores the arithmetic. In June 2025 the annual climate indicators update put the remaining 1.5°C carbon budget at 130 billion tonnes of CO2, which 'would be exhausted in a little more than 3 years if global CO2 emissions remain at 2024 levels.' WMO found 2024 likely the first calendar year above 1.5°C. Carbon removal is the IPCC's answer to overshoot, but drawing down hundreds of billions of tonnes takes decades of build-out, and warming does its damage in the meantime. Sunlight reflection is the one known lever that could cool the planet within years, which is why it is argued for as a bridge alongside cuts and removal, not a replacement for them.",
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
            "If overshoot modeling with removal at observed build-out rates showed decades above 2°C even under deep cuts, after a 1.5°C budget measured in a few years of emissions, calling a fast-acting cooling bridge self-serving would be hard to hold.",
          common_ground:
            "Both sides agree emission cuts are the lower-risk path, that fossil fuel subsidies should be eliminated, and that current CO2 levels are dangerously high.",
          live_disagreement:
            "Whether cuts plus carbon removal can hold peak warming down in time, or leave an overshoot that only reflecting sunlight could blunt.",
        },
      },
      evidence: [
        {
          id: "forster-budget-2025",
          title: "Forster et al. 2025: The 1.5°C Budget of 130 Gt CO2 Runs Out in a Little Over Three Years at 2024 Emissions",
          description:
            "The Indicators of Global Climate Change 2024 update (Earth System Science Data, June 2025), which follows IPCC AR6 methods, estimates a remaining carbon budget of 130 Gt CO2 for a 50% chance of holding warming to 1.5°C, which 'would be exhausted in a little more than 3 years if global CO2 emissions remain at 2024 levels (42 Gt CO2 yr−1).' Human-induced warming reached 1.36°C in 2024 and has been rising at 0.27°C per decade over 2015-2024, 'a rate that is unprecedented in the instrumental record.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "Forster et al., 'Indicators of Global Climate Change 2024: annual update of key indicators of the state of the climate system and human influence,' Earth System Science Data 17, 2641 (19 June 2025)",
          sourceUrl: "https://essd.copernicus.org/articles/17/2641/2025/",
          reasoning:
            "The most current, IPCC-method estimate of how little room is left, which is the proponents' premise. It does not show that sunlight reflection is the right response to overshoot, only that an overshoot of 1.5°C is close to certain without it or very large removals.",
        },
        {
          id: "ipcc-ar6-carbon-removal",
          title: "IPCC: Every 1.5°C Pathway Needs Large-Scale Carbon Dioxide Removal",
          description:
            "The IPCC states that all assessed pathways that limit warming to 1.5 degrees Celsius with limited or no overshoot require carbon dioxide removal (CDR) ranging from 100-1000 gigatons of CO2 over the 21st century. Even 2-degree pathways require significant CDR. The Sixth Assessment Report describes CDR as 'unavoidable' as a complement to deep emission reductions to achieve net-zero CO2 emissions.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Intergovernmental Panel on Climate Change",
          sourceUrl: "https://www.ipcc.ch/report/ar6/syr/",
          reasoning:
            "The highest scientific authority on climate. On this map it bears on timing: if every 1.5°C pathway needs hundreds of billions of tonnes of removal, warming keeps rising while that capacity is built, the gap proponents say sunlight reflection could bridge. Whether removal can be built at all is weighed on the carbon-capture map.",
        },
        {
          id: "fossil-fuel-subsidies-imf",
          title: "IMF: Fossil Fuels Got $0.73 Trillion in Explicit Subsidies and $6.7 Trillion in Unpriced Damage in 2024",
          description:
            "The International Monetary Fund estimates that in 2024 explicit fossil fuel subsidies totalled $0.73 trillion, 0.6% of global GDP, and implicit subsidies, the unpriced costs of pollution and climate damage, $6.7 trillion, 5.8% of global GDP. Critics argue that declaring solar geoengineering necessary while still subsidizing the cause of the problem gets the order wrong: remove the subsidies first.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "International Monetary Fund, Energy Subsidies (2024 figures)",
          sourceUrl: "https://www.imf.org/en/Topics/climate-change/energy-subsidies",
          reasoning:
            "Reliable, independent data showing how much cheap emission cutting is still undone. Directness is moderate: unused room to cut does not show that a cooling bridge will not also be needed; both could be true.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 2: Side effects
    // =========================================================================
    {
      id: "unintended-consequences",
      title: "Side Effects: Would Some Regions End Up Worse Off?",
      short_summary:
        "Reflecting sunlight cools the planet but weakens the water cycle: after Pinatubo, rain over land fell sharply, and models of full cancellation cut monsoon rainfall by 5-7%. A 2019 study found that halving warming, rather than cancelling it, left no major region worse off on average. Stopping abruptly would bring the masked warming back fast.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Sunlight reflection would add new risks on top of warming. After Pinatubo, 'there was a substantial decrease in precipitation over land and a record decrease in runoff and river discharge into the ocean'; Trenberth and Dai concluded 'major adverse effects, including drought, could arise from geoengineering solutions.' Twelve climate models that dimmed sunlight to cancel a quadrupling of CO2 cut monsoon rainfall over East Asia, North America, South America and southern Africa by 5-7%. A 2013 study (Haywood et al.) found aerosols concentrated in the Northern Hemisphere are a precursor of Sahel drought, so where the aerosols go could decide which vulnerable region gains rain and which loses it. And if injection stopped, through war or political change, the masked warming would return fast; a 2018 study found sudden termination would more than double the speeds at which species must move to keep up with climate in biodiversity hotspots.",
      proponent_rebuttal:
        "The comparison is not with a stable climate but with unchecked warming, which brings its own droughts, floods and crop failures. The drying results come from experiments that cancel all the warming from a huge CO2 rise. Used moderately, the picture changes: in 2019 Irvine, Keith and colleagues halved the warming from doubled CO2 in a storm-resolving model and 12 others, and found that 'neither temperature, water availability, extreme temperature nor extreme precipitation are exacerbated' averaged over any IPCC region, with less than 0.4% of ice-free land seeing worse extreme rain or water availability. Termination shock is a governance problem, not a law of physics: redundant deployment and gradual phase-down can prevent an abrupt stop.",
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
            "If a multi-model ensemble showed SRM held to 1.5-2°C leaving a major populated region, such as the South Asian or West African monsoon belt, worse off than a 3-4°C world without it, the claim that side effects are smaller than unchecked warming would fail there.",
          skeptic_flip:
            "If realistic aerosol-injection ensembles, not only idealized dimming, kept finding moderate use leaving no major region worse off than unchecked warming, as the 2019 half-warming study did, the regional-losers objection would weaken to a question of dosage.",
          common_ground:
            "Both sides agree SRM would alter regional precipitation, that termination shock would be catastrophic if injection stopped abruptly, and that no adequate international governance framework currently exists.",
          live_disagreement:
            "Whether SRM used at a realistic dose leaves identifiable regional losers compared with unchecked warming, or improves things almost everywhere.",
        },
      },
      evidence: [
        {
          id: "srm-monsoon-disruption",
          title: "GeoMIP 2013: Dimming the Sun to Cancel 4x CO2 Cut Monsoon Rainfall 5-7% in Four Regions",
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
            "A multi-model intercomparison, and the monsoon reductions are the ones the models agree on. The experiment is idealized (instant dimming against an instant CO2 quadrupling, cancelling all warming), so it marks the heavy-dose end of the range.",
        },
        {
          id: "mt-pinatubo-natural-experiment",
          title: "Pinatubo 1991: About 15 Million Tons of SO2 Cooled the World 0.6°C, and Rain Over Land Fell Sharply",
          description:
            "The June 1991 eruption of Mount Pinatubo 'injected about 15 million tons of sulfur dioxide into the stratosphere,' and global average temperature fell 'about 1 degree F (0.6 degrees C)' over the following 15 months (NASA). Trenberth and Dai (2007) found that afterwards 'there was a substantial decrease in precipitation over land and a record decrease in runoff and river discharge into the ocean from October 1991–September 1992,' and concluded that 'major adverse effects, including drought, could arise from geoengineering solutions.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source:
            "NASA Earth Observatory, 'Global Effects of Mount Pinatubo'; Trenberth and Dai, 'Effects of Mount Pinatubo volcanic eruption on the hydrological cycle as an analog of geoengineering,' Geophysical Research Letters (2007)",
          sourceUrl:
            "https://science.nasa.gov/earth/earth-observatory/global-effects-of-mount-pinatubo-1510",
          reasoning:
            "The best real-world analogue: it confirms both that stratospheric aerosols cool fast and that they dry the land. A one-time pulse that faded in two years differs from a sustained, managed program, so it shows the direction of side effects more than their size under deliberate use.",
        },
        {
          id: "half-sg-no-region-worse",
          title: "Halving Warming, Not Cancelling It, Left No IPCC Region Worse Off in Models (2019)",
          description:
            "Irvine, Emanuel, He, Horowitz, Vecchi and Keith ran a high-resolution model that resolves tropical cyclones (GFDL's HiFLOR) alongside 12 GeoMIP models, but instead of cancelling all the warming from doubled CO2 they dimmed sunlight enough to halve it. In their words, 'neither temperature, water availability, extreme temperature nor extreme precipitation are exacerbated under half-SG when averaged over any Intergovernmental Panel on Climate Change (IPCC) Special Report on Extremes (SREX) region,' and for extreme precipitation and water availability 'less than 0.4% of the ice-free land surface sees exacerbation.' Half-SG also offset most of the CO2-driven rise in simulated tropical cyclone intensity.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Irvine et al., 'Halving warming with idealized solar geoengineering moderates key climate hazards,' Nature Climate Change 9, 295-299 (2019)",
          sourceUrl: "https://www.nature.com/articles/s41558-019-0398-8",
          reasoning:
            "The proponents' strongest direct answer to the crux. Its limits are real: idealized dimming, not aerosol injection with its ozone and uneven-spread effects; region-wide averages can hide local losers; and nothing on termination shock or governance. Independence is discounted because David Keith, a leading advocate of solar geoengineering research, is a co-author.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 3: Moral hazard
    // =========================================================================
    {
      id: "moral-hazard",
      title: "Moral Hazard: Would a Backup Weaken the Will to Cut?",
      short_summary:
        "The fear is that a cheap thermostat would let governments and industry put off costly cuts while CO2 keeps building up behind the mask. A 2016 survey experiment in Britain found hearing about it did not change most people's willingness to pay carbon taxes; EU science advisers warned in 2024 that presenting it as a solution could still damage emission cuts.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Solar geoengineering offers the most tempting fallback of all: a way to cool the planet within years without touching the energy system. The danger is less that voters change their minds in a survey than that governments and fossil fuel interests use the promise of a fix to slow costly cuts while CO2 keeps accumulating behind the mask. The EU's chief scientific advisers warned in December 2024 that 'presenting them as solutions could damage the efforts that are already underway to reduce greenhouse gas emissions.' A one-off survey cannot measure how a lobby would use a cheap thermostat over decades of negotiations.",
      proponent_rebuttal:
        "The moral hazard argument assumes that political will for cuts exists and that geoengineering research is what holds it back. In fact emissions kept rising through three decades of climate talks with no sunlight reflection on the table. When the idea has been tested, the feared effect has not appeared: Malcolm Fairbrother's survey experiments on a nationally representative British sample found a brief introduction to it 'had no impact on most people's willingness to pay taxes, nor on their trust in climate science,' and for conservatives asked first about taxes, hearing about it increased trust in climate science. Refusing to study a backup while the main strategy misses its targets carries its own risk.",
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
            "If well-powered, long-horizon experiments and panels found exposure to solar geoengineering lowering support for carbon taxes or regulation, especially once concrete costs were at stake, the backup framing would yield to the distraction charge and promoting research would carry a real political cost.",
          skeptic_flip:
            "If multi-country experiments with year-long follow-up matched Fairbrother's British finding of no effect on willingness to pay carbon taxes, and governments that funded research kept or tightened their emission targets, the distraction charge would lose its footing.",
          common_ground:
            "Both sides agree that political will for deep emission cuts has been chronically inadequate, and that moral hazard is at least a plausible risk worth measuring.",
          live_disagreement:
            "Whether a solar geoengineering option erodes the will to cut emissions over the long run, among voters and among governments and industry, or leaves it intact.",
        },
      },
      evidence: [
        {
          id: "moral-hazard-survey-evidence",
          title: "Fairbrother 2016: In Britain, Hearing About Solar Geoengineering Did Not Change Willingness to Pay Carbon Taxes",
          description:
            "Survey experiments on a nationally representative British sample tested 'whether hearing about solar radiation management (SRM) affects people's support for taxing polluting energy and/or their trust in climate science.' A brief introduction to SRM 'had no impact on most people's willingness to pay taxes, nor on their trust in climate science,' so that 'hearing about this form of geoengineering therefore appears unlikely to erode support for emissions reductions.' For conservatives asked first about paying taxes, hearing about SRM increased trust in climate science.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Malcolm Fairbrother, 'Geoengineering, moral hazard, and trust in climate science: evidence from a survey experiment in Britain,' Climatic Change (2016)",
          sourceUrl: "https://doi.org/10.1007/s10584-016-1818-7",
          reasoning:
            "A randomized test aimed squarely at the crux, and it finds no effect on voters. It measures one country's public at one moment after a brief text, not how governments or industries would act over decades, which is where skeptics locate the hazard.",
        },
        {
          id: "eu-advisers-mitigation-risk",
          title: "EU Science Advisers 2024: Presenting Solar Geoengineering as a Solution 'Could Damage' Emission Cuts",
          description:
            "The EU's Group of Chief Scientific Advisors and European Group on Ethics, drawing on a SAPEA evidence review, advised on 9 December 2024 that 'presenting them as solutions could damage the efforts that are already underway to reduce greenhouse gas emissions,' and that Europe should 'continue to focus on reducing greenhouse gas emissions and adapting to climate change as the highest priorities.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source:
            "Group of Chief Scientific Advisors and European Group on Ethics in Science and New Technologies, 'Solar radiation modification' (9 December 2024)",
          sourceUrl: "https://scientificadvice.eu/advice/solar-radiation-modification/",
          reasoning:
            "An expert body's judgment after a formal evidence review, on point for the hazard. It is a warning, not a measurement: it does not report evidence that the effect has happened, so replicability is low.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 4: Who decides
    // =========================================================================
    {
      id: "governance-who-decides",
      title: "Governance: Experiment Now, or Wait for Rules?",
      short_summary:
        "Britain's ARIA is funding 22 teams with £56.8m, including small outdoor experiments; the US National Academies urged a research program under strict governance in 2021. EU science advisers called for a Europe-wide moratorium on use in 2024, and Florida banned attempts to alter sunlight or weather from July 2025. No global body decides who may touch the planet's thermostat.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A technology that changes every country's weather cannot be governed by whichever country, company or billionaire moves first. EU science advisers concluded in December 2024 that the global governance framework it needs does not exist and 'it is not clear how one could be created,' and urged Europe to 'announce a Europe-wide moratorium on using solar radiation modification technologies.' Outdoor experiments build the know-how and the constituency for deployment before anyone has agreed on the rules. Voters are pushing back too: Florida's 2025 law prohibits acts 'intended to affect the temperature, the weather, or the intensity of sunlight' in the state's atmosphere.",
      proponent_rebuttal:
        "Ignorance is not safety. If a desperate government ever reaches for sunlight reflection, the world will want the science done openly and in advance. The US National Academies recommended in 2021 that the United States 'develop a transdisciplinary research program, in collaboration with other nations,' under 'robust research governance' with a code of conduct, a public registry and permits for outdoor experiments. Britain's ARIA is funding 22 research teams with £56.8m, including 'small-scale, carefully controlled outdoor experiments' only where models cannot answer the question, with 'stringent requirements for safety, respectful engagement, and transparency.' A moratorium on use is compatible with careful research; a ban on research leaves the field to the least careful.",
      crux: {
        id: "research-governance-first",
        title: "The Who-Decides Question",
        question:
          "Should small outdoor solar geoengineering experiments go ahead before any global agreement on who decides?",
        description:
          "Even with better science, one side holds that open, governed research now is the safest path, since a crisis could bring deployment anyway; the other that experiments build momentum toward a planet-wide intervention that no legitimate body has authorized. Evidence on risks informs the choice but does not make it.",
        methodology:
          "Set the measurable pieces side by side: what outdoor experiments at the scales proposed could reveal that models cannot, their physical footprint, and how research programs with registries and permits have handled public consent. Then the reader weighs the value of knowledge before a crisis against the risk of momentum toward deployment without a mandate.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "What small experiments reveal and how well registries and permits work can be observed; who has the standing to approve research on a technology that would change every country's climate is a question of legitimate authority that no measurement answers.",
          kind: "authority-allocation" as const,
        },
        cost_to_verify: "The pieces can be measured, but no study settles who should decide.",
        falsification: {
          supporter_flip:
            "If governed outdoor experiments such as ARIA's turned out to build commercial or political pressure toward deployment, or a private group used them as cover for unapproved releases, the case for research before rules would weaken sharply.",
          skeptic_flip:
            "If ARIA's experiments ran with open registries and local consent, answered questions models cannot, and produced no push toward deployment, the claim that research must wait for global rules would rest on principle alone.",
          common_ground:
            "Both sides agree no global framework governs solar geoengineering today, that cutting emissions and adapting remain the first priorities, and that any outdoor research should be small, public and governed.",
          live_disagreement:
            "Whether open research under national rules is the safest way to prepare, or whether any outdoor work before a global agreement takes a planet-wide decision out of the hands of the people it would affect.",
        },
      },
      evidence: [
        {
          id: "aria-outdoor-experiments",
          title: "UK's ARIA Funds 22 Teams With £56.8m, Including Small Controlled Outdoor Experiments",
          description:
            "Britain's Advanced Research and Invention Agency runs a '£56.8m programme' on climate cooling, 'funding 22 research teams' from atmospheric physics to governance and ethics. It funds 'small-scale, carefully controlled outdoor experiments' only where models cannot answer key questions, with 'stringent requirements for safety, respectful engagement, and transparency.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source:
            "ARIA, 'Exploring Climate Cooling' programme page (accessed November 2026)",
          sourceUrl:
            "https://www.aria.org.uk/opportunity-spaces/future-proofing-our-climate-and-weather/exploring-climate-cooling",
          reasoning:
            "A government showing what governed research looks like in practice. It is the funder describing its own program, so independence is moderate, and whether its safeguards work is not yet known.",
        },
        {
          id: "nas-research-program",
          title: "US National Academies 2021: Build a Solar Geoengineering Research Program Under Robust Governance",
          description:
            "The National Academies' 2021 report 'Reflecting Sunlight' recommended that 'the United States should develop a transdisciplinary research program, in collaboration with other nations,' operating 'under robust research governance' with a research code of conduct, a public registry, permitting for outdoor experiments and inclusive public engagement. It called emission cuts and adaptation 'the first line of defense.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'Reflecting Sunlight: Recommendations for Solar Geoengineering Research and Research Governance' (2021)",
          sourceUrl: "https://www.nationalacademies.org/publications/25762",
          reasoning:
            "A consensus report from the US scientific establishment backing research with governance attached. It recommends research, not deployment, and puts emission cuts first, so it supports the research-now side without endorsing use.",
        },
        {
          id: "eu-advisers-moratorium",
          title: "EU Science Advisers Urged a Europe-Wide Moratorium on Using Solar Radiation Modification (December 2024)",
          description:
            "The EU's Group of Chief Scientific Advisors and European Group on Ethics advised on 9 December 2024 that Europe should 'announce a Europe-wide moratorium on using solar radiation modification technologies,' since 'none of the technologies is mature' and the global governance framework needed does not exist: 'it is not clear how one could be created.' They asked that research be 'rigorous, ethical and explicit about uncertainties,' and that the EU argue in global talks against deployment given current knowledge.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 4,
            directness: 7,
          },
          source:
            "Group of Chief Scientific Advisors and European Group on Ethics in Science and New Technologies, 'Solar radiation modification' (9 December 2024)",
          sourceUrl: "https://scientificadvice.eu/advice/solar-radiation-modification/",
          reasoning:
            "The most authoritative call to hold back. The moratorium covers use, not research, so it stands against deployment more than against careful experiments; it is a judgment, not a measurement.",
        },
        {
          id: "florida-geoengineering-ban",
          title: "Florida Banned Acts Meant to Alter Temperature, Weather or Sunlight, From 1 July 2025",
          description:
            "Florida's CS/CS/SB 56, 'Geoengineering and Weather Modification Activities,' prohibits 'certain acts intended to affect the temperature, the weather, or the intensity of sunlight' within the state's atmosphere and repeals the state's weather modification licensing. It was approved by the governor on 20 June 2025 and took effect on 1 July 2025.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source: "Florida Senate, CS/CS/SB 56 (2025), bill history",
          sourceUrl: "https://www.flsenate.gov/Session/Bill/2025/56",
          reasoning:
            "Shows that public consent for outdoor work cannot be assumed: a large US state has outlawed it. Directness is low: the law speaks to politics, not to whether experiments are safe or useful.",
        },
      ],
    },
  ],
} satisfies TopicInput;
