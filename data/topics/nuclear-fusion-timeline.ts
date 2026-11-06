export const nuclearFusionTimelineData = {
  id: "nuclear-fusion-timeline",
  title: "Fusion Power Within Two Decades",
  question:
    "Will fusion plants be putting real power on the grid by the mid-2040s?",
  meta_claim:
    "Commercial fusion power will be a meaningful part of the energy mix within the next two decades.",
  status: "highly_speculative" as const,
  category: "science" as const,
  // As of 3 November 2026: NIF's record is 8.6 MJ from 2.08 MJ of laser
  // energy (7 April 2025), with 7.9 MJ on 20 June 2026; ITER's 2024
  // baseline puts deuterium-tritium operation in 2039; Commonwealth Fusion
  // Systems has raised $4 billion (30 July 2026) and says SPARC will reach
  // Q>1 in 2027; Helion reported D-T fusion in Polaris (13 February 2026)
  // and has been building its Orion plant for Microsoft since July 2025.
  // No fusion device has yet put electricity on a grid.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "On 7 April 2025, Lawrence Livermore's National Ignition Facility got 8.6 MJ of fusion energy from 2.08 MJ of laser light, its record since first reaching ignition in December 2022. That gain counts only the laser energy reaching the fuel, not the far larger amount drawn from the grid to fire the lasers. No fusion machine has yet put electricity on a grid. Private companies now promise grid power in the early 2030s; ITER, the public flagship, plans its first deuterium-tritium runs in 2039. The fight is over whether working power plants, and then a fleet of them, can follow within 20 years.",
    confidence: 90,
    source:
      "Lawrence Livermore National Laboratory, 'Achieving fusion ignition' (shot record through June 2026); World Nuclear News on laser versus grid energy (8 August 2023); ITER Organization schedule",
    sourceUrl: "https://lmf.llnl.gov/science/achieving-fusion-ignition",
  },
  simple_case: [
    "If fusion works at scale, it adds a carbon-free source that runs day and night; investors have put billions into it and companies such as Google, Eni and Microsoft have signed to buy power from plants not yet built. If it slips to the 2050s, that money and those power deals buy little for the climate before mid-century.",
    "The two sides split over whether a whole plant can put out more electricity than it draws; whether a reactor can breed more tritium fuel than it burns; and whether fusion can grow from a first grid-connected plant to about 1% of world power within two decades.",
  ],
  aliases: [
    "Will fusion power be a meaningful part of the energy mix within 20 years?",
    "Is fusion always 30 years away?",
  ],
  tags: ["fusion", "energy", "technology", "iter", "decarbonization"],
  pillars: [
    // =========================================================================
    // PILLAR 1: Physics to plant — the wall-plug gap
    // =========================================================================
    {
      id: "scientific-feasibility",
      title: "Physics: Can a Machine Make More Power Than It Uses?",
      short_summary:
        "Fusion has crossed the lab's net-energy line: NIF has released more fusion energy than its lasers deliver on at least ten shots, up to 8.6 MJ from 2.08 MJ. But the lasers draw far more from the grid than they deliver, and no machine has yet exported net electricity. Private tokamaks promise to close that gap within this decade.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "No fusion device has ever produced net usable electricity. NIF's 'gain' compares fusion output only with the laser energy hitting the target, not with the energy 'pulled off the grid to power the system, which is much higher.' Scientists estimate a commercial laser plant would need reactions yielding 30 to 100 times the laser energy; NIF's best so far is about 4 times. The largest public tokamak, ITER, will not burn deuterium-tritium fuel until 2039. The private milestones are company claims: Commonwealth Fusion's SPARC has not yet run, and Helion's February 2026 results came in a press release, not a peer-reviewed paper. A fraction-of-a-second physics shot is a long way from a plant that runs for decades.",
      proponent_rebuttal:
        "The physics question, whether a controlled reaction can release more energy than is put into the fuel, has been answered yes, and the answer keeps improving: NIF has repeated ignition at least ten times since December 2022, from 3.15 MJ to a record 8.6 MJ in April 2025 and 7.9 MJ in June 2026. Magnetic machines are close behind. Commonwealth Fusion says SPARC, built with high-temperature superconducting magnets in Devens, Massachusetts, will produce net energy (Q>1) in 2027. Helion reported in February 2026 that its Polaris machine had made measurable deuterium-tritium fusion at 150 million degrees Celsius. Turning plasma gain into wall-plug gain is an engineering target with known terms, not an open mystery.",
      crux: {
        id: "engineering-gain",
        title: "Wall-Plug Energy Gain (Q_eng > 1)",
        question:
          "Can a complete fusion plant put out more electricity than it draws from the grid?",
        description:
          "The load-bearing question is not whether fusion reactions release net energy relative to energy delivered to the fuel (demonstrated), but whether an integrated machine can put more electricity onto the grid than it draws from it, continuously.",
        methodology:
          "Measure total electricity consumed by the full plant (magnets, lasers, cryogenics, heating, balance-of-plant) against net electricity exported over a sustained run. Engineering gain Q_eng = electricity out / electricity in must exceed 1 with margin to be commercial.",
        equation:
          "Q_{\\text{eng}} = \\frac{P_{\\text{electric out}}}{P_{\\text{electric in}}} > 1",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A sustained run of an integrated pilot plant that meters every draw (magnets, lasers, cryogenics, heating, balance-of-plant) against the electricity it exports, so engineering gain Q_eng can be read directly.",
        },
        cost_to_verify: "$1B+ (build and operate a net-electricity pilot plant)",
        falsification: {
          supporter_flip:
            "If SPARC failed to reach Q>1 by around 2027, or a pilot plant ran but its metered Q_eng stayed well below 1 once magnets, cryogenics, heating and balance-of-plant were counted, wall-plug gain would look like an open research problem rather than engineering.",
          skeptic_flip:
            "If SPARC reached Q>1 on schedule and a pilot plant such as Helion's Orion or CFS's ARC exported more metered electricity than it drew over a sustained run, the gap between lab gain and wall-plug gain would be closed in practice.",
          common_ground:
            "Both sides agree NIF showed scientific (fuel-relative) gain, that no device has yet exported net electricity to a grid, and that Q_eng > 1 with margin is the real commercial bar.",
          live_disagreement:
            "Whether an integrated machine can turn plasma gain into positive wall-plug electricity this decade, which only a full pilot plant metering its exports against its total draw over a sustained run can show.",
        },
      },
      evidence: [
        {
          id: "nif-ignition-repeated",
          title: "NIF Has Repeated Ignition at Least Ten Times, Peaking at 8.6 MJ From 2.08 MJ (April 2025)",
          description:
            "Lawrence Livermore's National Ignition Facility first reached ignition on 5 December 2022, delivering 2.05 MJ of laser energy and producing 3.15 MJ of fusion energy. It has repeated it on later shots: 3.88 MJ in July 2023, 5.0 MJ in February 2025, and on 7 April 2025 'a yield of 8.6 MJ with a measurement uncertainty of +/- 0.45 MJ' from 2.08 MJ of laser energy, a target gain of 4.13. A shot on 20 June 2026 produced 7.9 MJ. The gain is measured against laser energy delivered to the target.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "Lawrence Livermore National Laboratory, 'Achieving fusion ignition' (shot record through June 2026)",
          sourceUrl: "https://lmf.llnl.gov/science/achieving-fusion-ignition",
          reasoning:
            "A national-lab result repeated many times with rising yields, so the physics milestone is solid. Directness is moderate: target gain is not wall-plug gain, and NIF is a research facility, not a power plant design.",
        },
        {
          id: "sparc-net-energy-target",
          title: "Commonwealth Fusion Says SPARC Will Reach Net Energy (Q>1) in 2027",
          description:
            "Commonwealth Fusion Systems states that SPARC, which it is building at its 60-acre campus in Devens, Massachusetts with high-temperature superconducting magnets, 'in 2027' will become 'the world's first commercially relevant fusion energy machine,' producing more fusion energy than is needed to run the process, 'a threshold called net energy generation or Q>1.' In July 2026 the company said it was 'completing the assembly' of SPARC.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 7,
          },
          source: "Commonwealth Fusion Systems, SPARC technology page (accessed November 2026); CFS funding release (30 July 2026)",
          sourceUrl: "https://cfs.energy/technology/sparc/",
          reasoning:
            "On point for near-term feasibility, but it is a company's own target for a machine that has not yet run. Low independence and reliability: weighted as a dated claim to check in 2027, not as a result. Even Q>1 in plasma is not net electricity.",
        },
        {
          id: "helion-polaris-dt",
          title: "Helion Says Polaris Made Measurable D-T Fusion at 150 Million °C (February 2026), Not Yet Peer-Reviewed",
          description:
            "On 13 February 2026 Helion announced that its Polaris machine was the 'first privately developed fusion energy machine to demonstrate measurable deuterium-tritium (D-T) fusion,' after switching to D-T fuel in January, and had reached 'plasma temperatures of 150 million degrees Celsius.' Helion's commercial plan rests on recovering electricity directly from the plasma; the release gives no figure for energy recovered. Outside researchers quoted in the release said they had reviewed diagnostic data; the results have not appeared in a peer-reviewed paper.",
          side: "for" as const,
          weight: {
            sourceReliability: 4,
            independence: 3,
            replicability: 3,
            directness: 5,
          },
          source: "Helion Energy, 'Helion Achieves New Industry-First Fusion Energy Milestones' (13 February 2026)",
          sourceUrl: "https://www.helionenergy.com/newsroom/helion-achieves-new-fusion-energy-milestones",
          reasoning:
            "If confirmed, private machines are reaching fusion conditions faster than the public programs. It is a press release with no independent publication, no gain figure and no electricity figure, so it is weighted as a claim. Measurable fusion is far short of net energy.",
        },
        {
          id: "nif-wall-plug-gap",
          title: "Lab 'Gain' Ignores the Grid Power Behind It; Commercial Laser Fusion Needs 30 to 100 Times Laser Energy",
          description:
            "NIF's gain 'only compares the energy generated to the energy in the lasers, not to the total amount of energy pulled off the grid to power the system, which is much higher.' Scientists estimate commercial fusion 'will require reactions that generate between 30 and 100 times the energy in the lasers' (World Nuclear News, 8 August 2023). NIF's best shot, in April 2025, reached a target gain of about 4.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "World Nuclear News, 'LLNL researchers achieve fusion ignition for second time' (8 August 2023); LLNL shot record",
          sourceUrl:
            "https://www.world-nuclear-news.org/Articles/LLNL-researchers-achieve-fusion-ignition-for-secon",
          reasoning:
            "Separates scientific gain from engineering gain, which is the crux. The 30-100x figure applies to laser (inertial) fusion; magnetic machines face a different but analogous gap from magnet, heating and cryogenic loads.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 2: Fuel and materials
    // =========================================================================
    {
      id: "engineering-and-fuel",
      title: "Fuel: Can a Reactor Breed the Tritium It Burns?",
      short_summary:
        "A deuterium-tritium plant burns tritium, which barely exists in nature, so each reactor must breed its own in a lithium blanket. That has never been shown at scale: a 2025 experiment measured a breeding ratio about four orders of magnitude short. Materials that survive decades of fusion neutrons are also unproven.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Deuterium-tritium plants burn tritium, which barely exists: a single ~2 GW-thermal plant would consume more than four times the entire current global tritium stockpile every year. The only viable supply is for each reactor to breed its own tritium in a lithium blanket, and a 2025 peer-reviewed study states that 'tritium self-sufficiency on a large scale has never been demonstrated'; its own experiment bred about 3.57 x 10^-4 tritium atoms per atom needed. Structural materials that survive decades of 14-MeV neutron flux without unacceptable degradation also do not yet exist. The DOE's own 2025 roadmap lists these as critical gaps.",
      proponent_rebuttal:
        "These are engineering gaps, not physics impossibilities, and they are now the explicit target of coordinated programs. The DOE's October 2025 Fusion Science and Technology Roadmap aims for commercial fusion on the grid by the mid-2030s and directs money at structural materials, plasma-facing components, the fuel cycle and breeding blankets. The low breeding ratio came from a small benchtop experiment never designed for self-sufficiency; full blankets with neutron multipliers such as beryllium or lead are designed to breed more than they burn, and ITER's test blanket program is built to check them.",
      crux: {
        id: "tritium-self-sufficiency",
        title: "Demonstrated Tritium Breeding Ratio (TBR > 1)",
        question:
          "Can a full-scale breeding blanket make more tritium fuel than the reactor burns?",
        description:
          "A D-T fusion economy cannot run unless each reactor breeds at least as much tritium as it burns (TBR > 1, with margin for losses, startup, and decay). This has never been shown at scale, and it is the single hardest external constraint on whether D-T fusion can be deployed widely within two decades.",
        methodology:
          "Operate a full-scale lithium breeding blanket around a sustained D-T plasma; measure tritium bred and recovered versus tritium consumed over time, accounting for radioactive decay, blanket coverage gaps, port penetrations, and extraction losses.",
        equation:
          "\\text{TBR} = \\frac{\\text{tritium atoms bred}}{\\text{tritium atoms consumed}} > 1",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Measured tritium output from breeding-blanket test modules, first in ITER's test blanket program and then from a full blanket on a working reactor, compared with the tritium burned plus what is lost in handling.",
        },
        cost_to_verify: "$500M+ (integrated breeding-blanket test facility)",
        falsification: {
          supporter_flip:
            "If an integrated full-coverage lithium blanket around a sustained D-T plasma could not reach a recovered TBR above 1 once port penetrations, gaps, decay and extraction losses were counted, a near-term D-T fusion economy would be blocked on fuel whatever the plasma does.",
          skeptic_flip:
            "If integrated blanket tests pushed the recovered breeding ratio above 1 with neutron multipliers such as beryllium or lead, the low ratios from small experiments never built for self-sufficiency would say little, and fuel would look like a neutronics and materials problem.",
          common_ground:
            "Both sides agree tritium is scarce, that a D-T plant must breed essentially all the tritium it burns (TBR > 1 with margin), and that self-sufficiency has never been demonstrated at scale.",
          live_disagreement:
            "Whether a real, full-scale breeding blanket can recover more tritium than the reactor consumes after all losses, which only an integrated blanket test measuring tritium bred and recovered against tritium burned can show.",
        },
      },
      evidence: [
        {
          id: "tritium-not-demonstrated",
          title: "BABY Experiment (2025): Breeding Ratio of 3.57x10^-4, and Self-Sufficiency 'Never Been Demonstrated'",
          description:
            "A peer-reviewed Nuclear Fusion study (BABY experiment, 2025) measured a tritium breeding ratio of 3.57x10^-4, about four orders of magnitude below the TBR >= 1 a commercial reactor needs, and states plainly that 'tritium self-sufficiency on a large scale has never been demonstrated.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Delaporte-Mathurin et al., 'Advancing tritium self-sufficiency in fusion power plants: insights from the BABY experiment,' Nuclear Fusion 65(2), 2025",
          sourceUrl: "https://iopscience.iop.org/article/10.1088/1741-4326/ada2ab",
          reasoning:
            "Peer-reviewed and squarely on the hardest fuel constraint. The authors' statement that self-sufficiency is undemonstrated is the strong part; the measured ratio comes from a small benchtop setup not designed to breed enough, so it shows how early the work is rather than a ceiling on full blankets.",
        },
        {
          id: "doe-critical-gaps",
          title: "DOE's 2025 Roadmap Itself Lists Materials, Fuel Cycle and Blankets as Unsolved Gaps",
          description:
            "Even as it targets the mid-2030s, the DOE roadmap identifies critical unsolved gaps that must be closed first (structural materials, plasma-facing components, fuel cycle, and breeding blankets) before any power plant can run for decades.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 8,
          },
          source:
            "US Department of Energy, Fusion Science and Technology Roadmap (October 2025)",
          sourceUrl:
            "https://www.energy.gov/articles/energy-department-announces-fusion-science-and-technology-roadmap-accelerate-commercial",
          reasoning:
            "Telling because it comes from the program's own champion: the document that sets the optimistic date also lists what must be solved first.",
        },
        {
          id: "doe-roadmap-target",
          title: "DOE's 2025 Roadmap Targets Commercial Fusion on the Grid by the Mid-2030s",
          description:
            "The US Department of Energy's October 2025 Fusion Science and Technology Roadmap defines a 'Build-Innovate-Grow' strategy to deliver commercial fusion power to the grid by the mid-2030s, coordinating national labs, industry, and more than $9 billion in private investment, with money aimed at materials, the fuel cycle and blankets.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source:
            "US Department of Energy, Fusion Science and Technology Roadmap (October 2025)",
          sourceUrl:
            "https://www.energy.gov/articles/energy-department-announces-fusion-science-and-technology-roadmap-accelerate-commercial",
          reasoning:
            "An official plan to close the fuel and materials gaps on a deadline. A roadmap is a goal and a funding plan, not a result, and the agency is an advocate for the program it funds.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 3: From one plant to a share of the grid
    // =========================================================================
    {
      id: "deployment-timeline",
      title: "Scale: From One Plant to a Share of the Grid",
      short_summary:
        "Two private plants are sited and paid for in part: Helion's Orion in Washington for Microsoft, and Commonwealth Fusion's ARC in Virginia, with Google and Eni signed for more than half its power. Both target the late 2020s to early 2030s. ITER, the public flagship, slipped deuterium-tritium operation to 2039. One plant is not a share of the energy mix.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Even on the companies' own schedules, the first grid-connected plants arrive in the late 2020s to early 2030s, and a meaningful share of world power needs fleets of them after that. ITER, the most scrutinized fusion project, now plans full magnetic energy in 2036, three years later than its 2016 reference, and deuterium-tritium operation in 2039, four years later; its 2024 rebaseline added about €5 billion. Fusion has missed its dates for decades. And a first plant still has to show it runs reliably for years before anyone orders a fleet.",
      proponent_rebuttal:
        "ITER is a one-off international science machine, not the commercial path. The private plants are real projects with buyers. Commonwealth Fusion has raised $4 billion, is building ARC at its Fall Line Fusion Power Station in Chesterfield County, Virginia, and says it is 'on track to put power on the grid in the early 2030s'; Google and Eni have signed to buy more than half of ARC's output. Helion began building Orion in Malaga, Washington, in July 2025 to deliver fusion electricity to Microsoft. If even a few first plants work in the early 2030s, a build-out over the following decade, the pace solar and gas turbines once managed, could reach a meaningful share by the mid-2040s.",
      crux: {
        id: "fleet-vs-pilot",
        title: "Pilot Plant vs. Energy-Mix Share",
        question:
          "Can fusion go from a first grid-connected plant to about 1% of world power in two decades?",
        description:
          "The claim turns on 'meaningful part of the energy mix,' not on a single demo. The decisive question is whether multiple economically competitive plants can be built and operated at scale within ~20 years, versus one-off demonstrations that prove feasibility but contribute negligible generation.",
        methodology:
          "Track cumulative fusion generation as a share of total electricity (TWh) over time; compare the gap between first grid connection of a pilot and the date fusion exceeds ~1% of global generation, using deployment-rate and learning-curve analysis.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Track fusion's share of world electricity year by year after the first grid-connected pilot, with the build rate and cost curve of follow-on plants: a share passing about 1% within twenty years, or a stall at one-off demonstrations.",
        },
        cost_to_verify: "$0 (forecast and deployment-rate analysis)",
        falsification: {
          supporter_flip:
            "If Orion and ARC slipped well past the early 2030s the way ITER has, or came in so costly that no utility ordered a second plant, fusion would miss a meaningful share of the energy mix within two decades even if one demonstrator eventually worked.",
          skeptic_flip:
            "If ARC and Orion delivered power to their buyers on schedule, and follow-on orders came at falling costs within a few years, ITER's delays would say little about the commercial path and a 1% share by the mid-2040s would be within reach.",
          common_ground:
            "Both sides agree one pilot plant is not an energy-mix share, that a meaningful share requires many economically competitive plants, and that fusion's history is one of repeated schedule slippage.",
          live_disagreement:
            "Whether fusion can move from a first grid-connected plant to roughly 1% of world generation within about two decades, which only real build rates and per-plant costs, once the first commercial plants operate, can show.",
        },
      },
      evidence: [
        {
          id: "iter-delay",
          title: "ITER Pushed Deuterium-Tritium Operation to 2039, Four Years Late, and Added About €5 Billion (2024 Baseline)",
          description:
            "ITER's current schedule starts research operation in 2034, reaches full magnetic energy in 2036, 'a delay of three years relative to the 2016 reference,' and starts deuterium-tritium operation in 2039, 'a delay of four years' (ITER Organization). Physics World reported in 2024 that the rebaseline added about €5 billion in cost, citing supply-chain disruption, manufacturing defects and safety-authority requirements.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "ITER Organization, 'ITER in a few lines' (schedule after the November 2024 Council); Physics World (2024) on the cost increase",
          sourceUrl: "https://www.iter.org/proj/inafewlines",
          reasoning:
            "Concrete, official evidence of the slippage that has marked fusion for decades. Directness is moderate: ITER is a science machine built by seven partners, and the private companies argue their compact designs and funding avoid its problems.",
        },
        {
          id: "arc-grid-target",
          title: "Commonwealth Fusion Raised $4 Billion; Google and Eni Signed for Over Half of ARC's Power (July 2026)",
          description:
            "On 30 July 2026 Commonwealth Fusion Systems announced a further $1 billion, bringing its total raised to $4 billion, while 'completing the assembly' of SPARC and developing ARC 'at the company's Fall Line Fusion Power Station in Chesterfield County, Virginia.' The company says it is 'on track to put power on the grid in the early 2030s.' Google and Eni, both investors, have 'signed power purchase agreements (PPAs) to buy more than half the power the plant will produce.'",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 3,
            directness: 6,
          },
          source:
            "Commonwealth Fusion Systems, 'Commonwealth Fusion Systems raises another $1 billion, bringing total capital raised to $4 billion' (30 July 2026)",
          sourceUrl:
            "https://cfs.energy/news-and-media/commonwealth-fusion-systems-raises-another-1-billion-bringing-total-capital-raised-to-4-billion/",
          reasoning:
            "Real money and signed buyers move ARC beyond a slide deck. It is still one company's plan for an unbuilt plant, announced by the company, and the buyers are also its investors; one plant is far from a share of the energy mix.",
        },
        {
          id: "helion-orion-microsoft",
          title: "Helion Began Building Orion in Washington in July 2025 to Supply Microsoft",
          description:
            "Helion says Orion, under construction in Malaga, Washington, since July 2025, 'will deliver electricity from fusion to the grid for Microsoft' (Helion, 13 February 2026). Helion and Microsoft signed what they called the world's first fusion power purchase agreement in May 2023, for power from 2028. Washington state regulators issued further licences for the project in June 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 4,
            independence: 3,
            replicability: 3,
            directness: 6,
          },
          source:
            "Helion Energy newsroom (13 February 2026 milestone release; May 2023 Microsoft agreement; June 2026 licensing update)",
          sourceUrl: "https://www.helionenergy.com/news/",
          reasoning:
            "A plant under construction with a named buyer is the most aggressive dated test in the field: it either delivers around 2028 or it does not. Helion has not yet shown net electricity from any machine, and the schedule is the company's own, so weights are low.",
        },
        {
          id: "industry-investment",
          title: "Fusion Industry Association: Most Members Expect Commercial Fusion by the Mid-2030s",
          description:
            "The Fusion Industry Association reports the majority of private fusion companies anticipate commercial fusion by the mid-2030s, with cumulative private investment reaching about $10.5 billion by 2025, up roughly fivefold since 2021.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 2,
            replicability: 4,
            directness: 5,
          },
          source: "Fusion Industry Association, 'Fusion is Coming' (2025)",
          sourceUrl: "https://www.fusionindustryassociation.org/fusion-is-coming/",
          reasoning:
            "Shows capital and momentum, but these are the industry trade body's members forecasting their own success, so independence is very low. A survey of optimism is not a forecast.",
        },
      ],
    },
  ],
};
