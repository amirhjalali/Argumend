import type { Topic } from "@/lib/schemas/topic";

export const nuclearEnergySafetyData = {
  id: "nuclear-energy-safety",
  title: "Nuclear Energy for Climate",
  meta_claim:
    "Nuclear energy should be expanded as a key tool for decarbonizing electricity generation.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "safety-record",
      title: "Safety Record",
      short_summary:
        "Nuclear power has the lowest death rate per TWh of any energy source, including renewables.",
      image_url:
        "https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Chernobyl, Fukushima, and Three Mile Island demonstrate catastrophic risks. Long-lived radioactive waste remains dangerous for millennia. A single disaster can render large areas uninhabitable.",
      proponent_rebuttal:
        "Per TWh generated, nuclear causes 0.03 deaths vs. 24.6 for coal, 18.4 for oil, and even 0.04 for wind. Fukushima's radiation killed approximately 1 person directly; the evacuation killed ~2,000. Modern reactor designs (Gen III+, SMRs) have passive safety features making meltdowns physically impossible.",
      crux: {
        id: "deaths-per-twh",
        title: "Deaths Per TWh Analysis",
        description:
          "Comprehensive accounting of deaths from each energy source including mining, construction, pollution, and accidents.",
        methodology:
          "Aggregate studies on: (1) Air pollution deaths (coal, gas, biomass), (2) Mining/construction accidents, (3) Major disasters, (4) Long-term radiation exposure. Normalize per TWh.",
        equation:
          "\\text{Deaths/TWh} = \\frac{\\sum \\text{all attributed deaths}}{\\text{Total energy generated}}",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (Meta-analysis of existing studies)",
      },
      evidence: [
        {
          id: "deaths-comparison",
          title: "Nuclear Safest Energy Per TWh",
          description:
            "Nuclear: 0.03 deaths/TWh. Coal: 24.6. Oil: 18.4. Gas: 2.8. Wind: 0.04. Solar: 0.05.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 10,
          },
          source: "Our World in Data, Markandya & Wilkinson",
          reasoning: "Peer-reviewed meta-analysis with transparent methodology.",
        },
        {
          id: "fukushima-deaths",
          title: "Fukushima Radiation: ~1 Direct Death",
          description:
            "WHO estimates zero acute deaths and minimal long-term cancer increase from Fukushima radiation.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "WHO, UNSCEAR",
          reasoning: "Authoritative international assessment.",
        },
        {
          id: "chernobyl-deaths",
          title: "Chernobyl Caused Thousands of Deaths",
          description:
            "WHO estimates 4,000 eventual cancer deaths from Chernobyl; some estimates reach 60,000.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          reasoning: "Worst-case historical disaster; estimates vary widely.",
        },
        {
          id: "waste-storage",
          title: "Waste Remains Dangerous for Millennia",
          description:
            "High-level nuclear waste requires secure storage for 10,000+ years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          reasoning: "Real challenge, though volume is small and contained.",
        },
      ],
    },
    {
      id: "climate-effectiveness",
      title: "Climate Effectiveness",
      short_summary:
        "Nuclear provides reliable, carbon-free baseload power that renewables struggle to match.",
      image_url:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Nuclear is too slow and expensive. New plants take 10-15 years to build and cost $10B+. Renewables are cheaper and faster to deploy. Battery storage is solving intermittency.",
      proponent_rebuttal:
        "France built 56 reactors in 15 years, achieving 75% nuclear electricity and among the lowest carbon intensities in Europe. Nuclear provides 24/7 baseload without the storage requirements of renewables. Countries that closed nuclear (Germany) saw emissions rise.",
      crux: {
        id: "grid-decarbonization",
        title: "Grid Decarbonization Speed",
        description:
          "Compare historical speed of grid decarbonization via nuclear (France, Sweden) vs. renewables (Germany, California).",
        methodology:
          "Track gCO₂/kWh over time for countries pursuing different strategies. Account for imports/exports.",
        equation:
          "\\frac{d(\\text{gCO}_2/\\text{kWh})}{dt} \\text{ for nuclear vs. renewable strategies}",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (Data analysis)",
      },
      evidence: [
        {
          id: "france-decarbonization",
          title: "France Decarbonized Fastest",
          description:
            "France went from 0 to 75% nuclear in 15 years, achieving 50 gCO₂/kWh (vs. Germany's 350).",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 7,
            directness: 9,
          },
          source: "IEA, Our World in Data",
          reasoning: "Historical fact demonstrating speed and effectiveness.",
        },
        {
          id: "capacity-factor",
          title: "Nuclear 93% Capacity Factor",
          description:
            "US nuclear plants operate at 93% capacity factor vs. 25% solar, 35% wind.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 8,
          },
          source: "EIA",
          reasoning: "Higher reliability means fewer backup requirements.",
        },
        {
          id: "cost-overruns",
          title: "New Nuclear Has Massive Cost Overruns",
          description:
            "Vogtle 3&4 came in at $35B, more than double original estimate. Hinkley Point C similar.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          reasoning: "Recent Western projects have serious cost issues.",
        },
        {
          id: "renewable-costs",
          title: "Solar/Wind Now Cheapest",
          description:
            "Levelized cost of solar ($30/MWh) and wind ($40/MWh) now below nuclear ($150-200/MWh).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Lazard LCOE Analysis",
          reasoning:
            "Cost comparison excludes storage/integration costs for renewables.",
        },
      ],
    },
  ],
};
