import type { Topic } from "@/lib/schemas/topic";

export const nuclearFusionTimelineData = {
  id: "nuclear-fusion-timeline",
  title: "Fusion Power Within Two Decades",
  meta_claim:
    "Commercial fusion power will be a meaningful part of the energy mix within the next two decades.",
  status: "highly_speculative" as const,
  category: "science" as const,
  last_updated: "2026-06-16",
  tags: ["fusion", "energy", "technology", "iter", "decarbonization"],
  pillars: [
    {
      id: "scientific-feasibility",
      title: "Scientific Feasibility",
      short_summary:
        "Fusion finally crossed the scientific net-energy threshold in the lab — but lab ignition is a long way from a power plant that beats its own wall-plug draw.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "No fusion device has ever produced net usable electricity. The 2022 NIF 'ignition' compared fusion output only to the laser energy hitting the target — not to the ~300+ MJ drawn from the grid to fire those lasers, so the system remained deeply energy-negative overall. The largest public tokamak, ITER, will not even start deuterium-tritium burning until 2039 on its 2024 baseline. Going from a fraction-of-a-second physics demonstration to a machine that delivers Q tens-of-times higher, continuously, for decades, is an unproven leap.",
      proponent_rebuttal:
        "The core physics question — can a controlled reaction release more fusion energy than is delivered to the fuel — was answered yes, and answered repeatedly: NIF achieved ignition in December 2022 and again on four subsequent shots through February 2024, with one 2023 shot reaching 3.88 MJ out for 2.05 MJ in. Privately funded high-field-magnet tokamaks like Commonwealth Fusion's SPARC are engineered to hit net energy (Q>1) on a single device, and the engineering gain target is well-characterized rather than mysterious.",
      crux: {
        id: "engineering-gain",
        title: "Wall-Plug Energy Gain (Q_eng > 1)",
        description:
          "The load-bearing question is not whether fusion reactions release net energy relative to energy delivered to the fuel (demonstrated), but whether an integrated machine can put more electricity onto the grid than it draws from it, continuously.",
        methodology:
          "Measure total electricity consumed by the full plant (magnets, lasers, cryogenics, heating, balance-of-plant) against net electricity exported over a sustained run. Engineering gain Q_eng = electricity out / electricity in must exceed 1 with margin to be commercial.",
        equation:
          "Q_{\\text{eng}} = \\frac{P_{\\text{electric out}}}{P_{\\text{electric in}}} > 1",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1B+ (build and operate a net-electricity pilot plant)",
      },
      evidence: [
        {
          id: "nif-ignition-repeated",
          title: "NIF Achieved and Repeated Fusion Ignition",
          description:
            "On 5 Dec 2022, Lawrence Livermore's National Ignition Facility delivered 2.05 MJ of laser energy and produced 3.15 MJ of fusion energy — the first lab net energy gain relative to laser energy. It then repeated ignition on four later shots through Feb 2024, with a July 2023 shot reaching ~3.88 MJ out.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Lawrence Livermore National Laboratory; reported by World Nuclear News (2023)",
          sourceUrl:
            "https://www.world-nuclear-news.org/Articles/LLNL-researchers-achieve-fusion-ignition-for-secon",
          reasoning:
            "Authoritative national-lab result, independently reported and repeated multiple times. Directness is moderate, not high: ignition relative to laser energy is a real physics milestone but does not demonstrate net electricity, the actual commercial threshold.",
        },
        {
          id: "sparc-net-energy-target",
          title: "Private Tokamaks Engineered to Hit Net Energy on One Device",
          description:
            "Commonwealth Fusion Systems states SPARC, using high-temperature superconducting magnets, is built to produce more fusion energy than is needed to run the process (Q>1), with the company targeting 2027, ahead of its grid-connected ARC plant.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 7,
          },
          source: "Commonwealth Fusion Systems, SPARC technology page (accessed 2026)",
          sourceUrl: "https://cfs.energy/technology/sparc/",
          reasoning:
            "Directly on-point for near-term feasibility, but this is a company's own forward-looking target for an unbuilt machine, not an independent or replicated result. Low independence and reliability; the 2027 date is attributed and unverified, so it is weighted as an aspiration rather than evidence of fact.",
        },
        {
          id: "nif-wall-plug-gap",
          title: "Lab 'Gain' Ignores the Grid Power Behind It",
          description:
            "NIF's gain compares fusion output only to laser energy on target, not to the much larger grid energy used to fire the lasers; the overall system was energy-negative. Estimates put the gain needed for commercial inertial fusion at roughly 30-100x laser energy.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Lawrence Livermore National Laboratory context, via World Nuclear News (2023)",
          sourceUrl:
            "https://www.world-nuclear-news.org/Articles/LLNL-researchers-achieve-fusion-ignition-for-secon",
          reasoning:
            "Directly undercuts the strongest 'for' headline by distinguishing scientific gain from engineering (wall-plug) gain. The 30-100x figure is a sourced estimate of the remaining gap, so high directness with solid reliability.",
        },
      ],
    },
    {
      id: "engineering-and-fuel",
      title: "Engineering & Fuel Cycle",
      short_summary:
        "Even a working reactor needs materials that survive intense neutron bombardment and a fuel cycle that breeds its own tritium — neither of which has been demonstrated at power-plant scale.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Deuterium-tritium plants burn tritium, which barely exists: a single ~2 GW-thermal plant would consume more than four times the entire current global tritium stockpile every year. The only viable supply is for each reactor to breed its own tritium in a lithium blanket, and tritium self-sufficiency at scale has never been demonstrated — measured breeding ratios in experiments remain orders of magnitude short of what is required. Structural materials that survive decades of 14-MeV neutron flux without unacceptable degradation also do not yet exist.",
      proponent_rebuttal:
        "These are recognized engineering gaps, not physics impossibilities, and they are now the explicit focus of coordinated public-private programs. The US DOE's 2025 Fusion Science and Technology Roadmap aims to deliver commercial fusion to the grid by the mid-2030s and directs investment specifically at structural materials, plasma-facing components, fuel cycle, and breeding blankets, backed by more than $9 billion in private investment. Small-scale breeding experiments are beginning to produce experimental validation that can be scaled up.",
      crux: {
        id: "tritium-self-sufficiency",
        title: "Demonstrated Tritium Breeding Ratio (TBR > 1)",
        description:
          "A D-T fusion economy cannot run unless each reactor breeds at least as much tritium as it burns (TBR > 1, with margin for losses, startup, and decay). This has never been shown at scale, and it is the single hardest external constraint on whether D-T fusion can be deployed widely within two decades.",
        methodology:
          "Operate a full-scale lithium breeding blanket around a sustained D-T plasma; measure tritium bred and recovered versus tritium consumed over time, accounting for radioactive decay, blanket coverage gaps, port penetrations, and extraction losses.",
        equation:
          "\\text{TBR} = \\frac{\\text{tritium atoms bred}}{\\text{tritium atoms consumed}} > 1",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500M+ (integrated breeding-blanket test facility)",
      },
      evidence: [
        {
          id: "doe-roadmap-target",
          title: "US DOE Roadmap Targets Grid Power by Mid-2030s",
          description:
            "The US Department of Energy's 2025 Fusion Science and Technology Roadmap defines a 'Build-Innovate-Grow' strategy to deliver commercial fusion power to the grid by the mid-2030s, coordinating national labs, industry, and more than $9 billion in private investment.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 4,
            directness: 7,
          },
          source:
            "US Department of Energy, Fusion Science and Technology Roadmap (Oct 2025)",
          sourceUrl:
            "https://www.energy.gov/articles/energy-department-announces-fusion-science-and-technology-roadmap-accelerate-commercial",
          reasoning:
            "Official government strategy directly addressing the timeline. But a roadmap is a stated goal and funding plan, not a demonstrated outcome; replicability is low because it is a forward-looking target. Moderate independence: the agency is an advocate for the program it funds.",
        },
        {
          id: "industry-investment",
          title: "Industry Expects Commercial Fusion by Mid-2030s; $10.5B Raised",
          description:
            "The Fusion Industry Association reports the majority of private fusion companies anticipate commercial fusion by the mid-2030s, with cumulative private investment reaching about $10.5 billion by 2025, up roughly fivefold since 2021.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 2,
            replicability: 4,
            directness: 6,
          },
          source: "Fusion Industry Association, 'Fusion is Coming' (2025)",
          sourceUrl: "https://www.fusionindustryassociation.org/fusion-is-coming/",
          reasoning:
            "Demonstrates real capital and momentum, and survey timelines bear directly on the claim. But the FIA is the industry's own trade body reporting its members' self-stated projections — very low independence, so weighted as a signal of investment and optimism rather than a neutral forecast.",
        },
        {
          id: "tritium-not-demonstrated",
          title: "Tritium Self-Sufficiency Never Demonstrated at Scale",
          description:
            "A peer-reviewed Nuclear Fusion study (BABY experiment, 2025) measured a tritium breeding ratio of 3.57x10^-4 — about four orders of magnitude below the TBR >= 1 a commercial reactor needs — and states plainly that 'tritium self-sufficiency on a large scale has never been demonstrated.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Delaporte-Mathurin et al., 'Advancing tritium self-sufficiency in fusion power plants: insights from the BABY experiment,' Nuclear Fusion 65(2), 2025",
          sourceUrl: "https://iopscience.iop.org/article/10.1088/1741-4326/ada2ab",
          reasoning:
            "Peer-reviewed, independent, and squarely on the single hardest deployment constraint. The authors themselves state self-sufficiency has never been shown at scale, and quantify how far current breeding is from the requirement. High marks across the board.",
        },
        {
          id: "doe-critical-gaps",
          title: "DOE Roadmap Itself Warns of Unsolved Critical Gaps",
          description:
            "Even as it targets the mid-2030s, the DOE roadmap identifies critical unsolved gaps that must be closed first — structural materials, plasma-facing components, fuel cycle, and breeding blankets — required before any power plant can run for decades.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 8,
          },
          source:
            "US Department of Energy, Fusion Science and Technology Roadmap (Oct 2025)",
          sourceUrl:
            "https://www.energy.gov/articles/energy-department-announces-fusion-science-and-technology-roadmap-accelerate-commercial",
          reasoning:
            "Strong because it comes from the program's own proponent: the same roadmap that sets the optimistic timeline enumerates the materials and fuel-cycle problems that remain unsolved, directly tempering the timeline claim.",
        },
      ],
    },
    {
      id: "deployment-timeline",
      title: "Deployment & Scale",
      short_summary:
        "A single first-of-a-kind plant by the 2030s is not the same as fusion being a 'meaningful part of the energy mix' — that requires fleets of plants, and the flagship public project keeps slipping.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Even on optimistic schedules, the first grid-connected demonstration plants are expected in the early-to-mid 2030s, while a meaningful share of global generation is generally projected for the 2040s and beyond. ITER, the largest and most-scrutinized public project, slipped its deuterium-tritium operation from 2035 to 2039 in its 2024 baseline, with a ~€5 billion cost increase — a pattern of delay that has characterized fusion for decades. One pilot plant is a milestone, not an energy-mix share.",
      proponent_rebuttal:
        "ITER is a one-off international science machine, not the commercial path; privately funded companies are deliberately moving faster with compact high-field designs. Commonwealth Fusion has selected a Virginia site for its ARC plant, targeting roughly 400 MW of net electricity to the grid in the early 2030s, and dozens of companies are building in parallel. If even a few first-of-a-kind plants succeed in the early 2030s, a learning-curve buildout over the following decade could plausibly reach a meaningful share by the mid-2040s.",
      crux: {
        id: "fleet-vs-pilot",
        title: "Pilot Plant vs. Energy-Mix Share",
        description:
          "The claim turns on 'meaningful part of the energy mix,' not on a single demo. The decisive question is whether multiple economically competitive plants can be built and operated at scale within ~20 years, versus one-off demonstrations that prove feasibility but contribute negligible generation.",
        methodology:
          "Track cumulative fusion generation as a share of total electricity (TWh) over time; compare the gap between first grid connection of a pilot and the date fusion exceeds ~1% of global generation, using deployment-rate and learning-curve analysis.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (forecast and deployment-rate analysis)",
      },
      evidence: [
        {
          id: "iter-delay",
          title: "Flagship Public Project ITER Delayed Again",
          description:
            "In its 2024 revised baseline, ITER pushed full deuterium-tritium operation from 2035 to 2039 and added about €5 billion in cost, citing supply-chain disruption, manufacturing defects, and safety-authority requirements.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "ITER Organization 2024 baseline; reported by Physics World (2024)",
          sourceUrl:
            "https://physicsworld.com/a/iter-fusion-reactor-hit-by-massive-decade-long-delay-and-e5bn-price-hike/",
          reasoning:
            "Concrete, independently reported evidence of the chronic schedule-and-cost slippage that has defined fusion. Directness is high-moderate: ITER is a science machine, not the commercial path, so proponents can reasonably argue private timelines differ.",
        },
        {
          id: "arc-grid-target",
          title: "First Commercial Plant Sited, Targeting Early-2030s Grid Power",
          description:
            "Commonwealth Fusion Systems has selected a site in Chesterfield County, Virginia for its ARC plant, intended to deliver roughly 400 MW of net electricity to the grid in the early 2030s — a concrete step from physics toward a power plant.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 3,
            directness: 6,
          },
          source:
            "Commonwealth Fusion Systems / reporting on ARC Virginia siting (2026)",
          sourceUrl:
            "https://www.ans.org/news/2026-01-08/article-7659/cfs-working-with-nvidia-siemens-on-sparc-digital-twin/",
          reasoning:
            "A real, sited project moving toward deployment supports the near-term case. But it is a single company's announced plan for an unbuilt plant on an aggressive schedule; low independence and replicability, and one plant is far from an energy-mix share, so weighted modestly.",
        },
      ],
    },
  ],
};
