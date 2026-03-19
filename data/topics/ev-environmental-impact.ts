import type { Topic } from "@/lib/schemas/topic";

export const evEnvironmentalImpactData = {
  id: "ev-environmental-impact",
  title: "Electric Vehicles vs. ICE Cars",
  meta_claim:
    "Electric vehicles are significantly better for the environment than internal combustion engine vehicles when considering the full lifecycle.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "manufacturing-battery-impact",
      title: "Manufacturing & Battery Impact",
      short_summary:
        "An EV starts its life with a larger carbon debt than a gas car. It takes 15,000-40,000 miles of driving to break even, depending on the grid.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Battery production requires massive lithium and cobalt mining, causing deforestation, water pollution, and environmental devastation in the DRC, Chile, and Australia. Manufacturing an EV produces 50-70% more CO2 than an equivalent ICE car. Battery disposal remains an unsolved problem with millions of tons of waste expected by 2040.",
      proponent_rebuttal:
        "The higher manufacturing footprint is offset within 1-3 years of typical driving. Battery recycling technology is advancing rapidly, with Redwood Materials and Li-Cycle already recovering 95%+ of critical minerals. The environmental impact of oil extraction — including spills, refinery emissions, and methane leaks — dwarfs lithium mining at comparable energy scales.",
      crux: {
        id: "lifecycle-breakeven",
        title: "Lifecycle Emissions Breakeven Point",
        description:
          "The exact point (in miles or years of driving) at which an EV's total lifecycle emissions drop below those of an equivalent ICE vehicle, across different grid mixes and vehicle classes.",
        methodology:
          "Cradle-to-grave lifecycle assessment comparing matched EV and ICE vehicles, including mining, manufacturing, fuel/electricity production, driving, maintenance, and end-of-life recycling, parameterized by regional grid carbon intensity.",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (Comprehensive LCA with sensitivity analysis)",
      },
      evidence: [
        {
          id: "iea-lifecycle-2023",
          title: "IEA: EVs Produce 50-70% Less Lifecycle Emissions Than ICE",
          description:
            "The International Energy Agency's 2023 Global EV Outlook reports that a medium-sized EV produces roughly 50% fewer lifecycle CO2 emissions than an equivalent ICE car on the average global grid mix, and up to 70% fewer on clean grids. The manufacturing gap is closed within 1.5-2 years of average driving.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "International Energy Agency, Global EV Outlook 2023",
          reasoning:
            "Premier international energy authority with transparent methodology. Results consistent across multiple independent analyses.",
        },
        {
          id: "volvo-lifecycle-study",
          title: "Volvo: EV Manufacturing 70% More Carbon-Intensive, Offset by Driving",
          description:
            "Volvo's own transparent lifecycle study of the C40 Recharge vs. XC40 ICE found the EV requires 70% more energy to manufacture. However, the EV breaks even at 48,000 miles on the European grid mix and at 68,000 miles on a global average grid, well within the expected vehicle lifetime.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 8,
            directness: 9,
          },
          source: "Volvo Cars Lifecycle Assessment (2021)",
          reasoning:
            "Manufacturer-commissioned but transparently published with full methodology. Lower independence score for industry source, but the honest reporting of higher manufacturing impact lends credibility.",
        },
        {
          id: "cobalt-mining-drc",
          title: "DRC Cobalt Mining: Child Labor, Toxic Waste, Ecological Destruction",
          description:
            "70% of the world's cobalt comes from the Democratic Republic of Congo, where artisanal mining employs an estimated 40,000 children, contaminates water supplies, and causes significant ecological damage. While cobalt content in batteries is decreasing, the human and environmental toll of current extraction is severe.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Amnesty International, UNICEF, Dorsen et al. (2016)",
          reasoning:
            "Well-documented human rights and environmental concerns. Directness is moderate because cobalt-free battery chemistries (LFP) are rapidly gaining market share, potentially making this less relevant over time.",
        },
        {
          id: "battery-recycling-advances",
          title: "Battery Recycling Now Recovers 95%+ of Critical Minerals",
          description:
            "Companies like Redwood Materials, Li-Cycle, and CATL's recycling division now achieve 95-98% recovery rates for lithium, nickel, cobalt, and manganese from spent EV batteries. The DOE projects that recycled materials could meet 15-20% of US battery material demand by 2030.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "DOE, Redwood Materials, Li-Cycle corporate reports",
          reasoning:
            "Technology is real but at early scale. Industry sources may overstate commercial readiness. Recovery rates are lab-verified but commercial-scale economics are still developing.",
        },
      ],
    },
    {
      id: "grid-dependency",
      title: "Grid Dependency",
      short_summary:
        "An EV charged in Norway (98% renewable grid) saves 70% of lifecycle emissions. Charged in Poland (coal grid), the savings shrink to 25%.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "EVs charged on coal-heavy grids can produce more lifecycle emissions than efficient hybrid vehicles. The grid is not ready for mass EV adoption — widespread charging would strain infrastructure, cause blackouts, and require billions in upgrades. In regions like West Virginia or Poland, EVs are effectively coal-powered cars.",
      proponent_rebuttal:
        "Even on the average US grid mix, EVs produce 60-68% fewer tailpipe-equivalent emissions than ICE vehicles. Grids are rapidly greening — US coal dropped from 45% to 16% of generation in 15 years. Smart charging during off-peak hours can actually stabilize grids by absorbing excess renewable generation, and vehicle-to-grid technology can provide storage.",
      crux: {
        id: "grid-carbon-threshold",
        title: "Grid Carbon Intensity Threshold for EV Advantage",
        description:
          "The grid carbon intensity (gCO2/kWh) above which an EV no longer has a lifecycle emission advantage over the best available ICE or hybrid vehicle.",
        methodology:
          "Parametric lifecycle model varying grid intensity from 0 to 1000 gCO2/kWh, comparing EVs to both average ICE and best-in-class hybrids. Include grid trajectory projections to determine when currently-dirty grids will cross the threshold.",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Modeling with published grid data)",
      },
      evidence: [
        {
          id: "ucs-grid-analysis",
          title: "UCS: EVs Cleaner Than ICE in All 50 US States",
          description:
            "The Union of Concerned Scientists' 2023 analysis found that driving an average EV produces fewer emissions than driving even the most efficient gasoline car in every single US state. In the cleanest grid regions, an EV is equivalent to a 191 MPG gasoline car.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 9,
          },
          source: "Union of Concerned Scientists",
          reasoning:
            "Environmental advocacy organization, but methodology is transparent and peer-reviewed. Results independently replicated by DOE and EPA analyses. Independence score lowered for pro-EV institutional stance.",
        },
        {
          id: "mit-grid-stress",
          title: "MIT: Mass EV Adoption Could Require $125B in Grid Upgrades",
          description:
            "MIT Energy Initiative research estimates that charging 50 million EVs would increase US electricity demand by 15-20%, requiring $75-125 billion in grid infrastructure upgrades. Without managed charging, peak demand spikes could exceed grid capacity in many regions.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "MIT Energy Initiative",
          reasoning:
            "Highly credible source. Grid costs are real but represent infrastructure investment, not environmental harm. Directness is lower because the question is about environment, not cost.",
        },
        {
          id: "norway-iceland-clean-grid",
          title: "Norway/Iceland: EVs on Clean Grids Achieve Maximum Environmental Benefit",
          description:
            "Norway (98% hydro/renewable electricity, 80% EV market share) and Iceland (100% renewable electricity) demonstrate that EVs on clean grids produce over 85% fewer lifecycle emissions than ICE vehicles. Norway's transport emissions have fallen 10% since EV adoption accelerated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source: "Norwegian Environment Agency, Statistics Iceland",
          reasoning:
            "Compelling real-world case studies. Replicability is limited because few countries have such clean grids, but it demonstrates the ceiling potential.",
        },
        {
          id: "doe-charging-infrastructure",
          title: "DOE: US Needs 1.2 Million Public Chargers by 2030, Currently at 186K",
          description:
            "The Department of Energy estimates the US needs 1.2 million public EV chargers by 2030 to support projected EV sales, but only 186,000 exist as of early 2024. Rural charging deserts and slow installation rates threaten adoption timelines and could strand consumers.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Department of Energy, National Renewable Energy Laboratory",
          reasoning:
            "Authoritative government data on infrastructure gap. Directness is low for the environmental claim — infrastructure readiness affects adoption speed, not per-vehicle environmental impact.",
        },
      ],
    },
  ],
};
