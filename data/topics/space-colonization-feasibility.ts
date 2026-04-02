import type { Topic } from "@/lib/schemas/topic";

export const spaceColonizationFeasibilityData = {
  id: "space-colonization-feasibility",
  title: "Space Colonization Feasibility",
  meta_claim:
    "Establishing permanent, self-sustaining human colonies on Mars or the Moon is technically and economically feasible within the next 50 years.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "transport-technology",
      title: "Transportation Technology",
      short_summary:
        "SpaceX's Starship can theoretically carry 100 tons to Mars. Getting humans back alive is a different problem entirely.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Even SpaceX's Starship, the most advanced heavy-lift vehicle, has not yet completed a full orbital mission profile. Mars transit takes 6-9 months with current propulsion, exposing crews to cosmic radiation at minimum 0.66 sieverts per round trip—well above safe annual limits. The cost of establishing a colony is estimated in the hundreds of billions, with no clear economic return.",
      proponent_rebuttal:
        "SpaceX has reduced launch costs by 90% in 15 years through reusable rockets. Starship is designed to carry 100+ tonnes to Mars. Research published in Scientific Reports (2025) found trajectories allowing 3-month transfers within NASA career radiation limits. SpaceX plans uncrewed Starship Mars landings by 2026-2027, with human missions targeted for 2028-2031.",
      crux: {
        id: "starship-mars-landing",
        title: "Successful Uncrewed Mars Landing",
        description:
          "Demonstrating that Starship can successfully land on Mars with a full cargo payload, proving the transportation link is viable.",
        methodology:
          "Track SpaceX Starship development milestones: orbital refueling demonstration, lunar landing (Artemis HLS), and uncrewed Mars landing. Measure payload delivered vs. planned.",
        equation:
          "P(\\text{colony}) = P(\\text{transport}) \\times P(\\text{habitat}) \\times P(\\text{ISRU}) \\times P(\\text{funding})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Monitor SpaceX mission outcomes)",
      },
      evidence: [
        {
          id: "starship-progress",
          title: "SpaceX Starship: Rapid Iteration Toward Mars Capability",
          description:
            "SpaceX's Starship has completed multiple test flights since 2023, demonstrating booster catch and orbital-class performance. The vehicle is designed to carry 100-150 tonnes to low Earth orbit and is the baseline for NASA's Artemis lunar lander. SpaceX targets uncrewed Mars cargo missions by 2026-2027.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 8,
          },
          source: "SpaceX mission reports; NASA Artemis HLS contract",
          reasoning:
            "Demonstrated hardware progress is real, but timelines are from SpaceX (historically optimistic). Independence is limited as primary source is the company itself.",
        },
        {
          id: "three-month-transit",
          title: "Scientific Reports: 3-Month Mars Transit Is Feasible",
          description:
            "A 2025 study published in Scientific Reports found trajectories allowing human Mars transfer in approximately 3 months, which would keep radiation exposure within NASA career limits. This is a significant improvement over the traditional 6-9 month transit.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Scientific Reports, Nature (2025)",
          reasoning:
            "Peer-reviewed trajectory analysis. Theoretical but based on known physics and Starship performance parameters.",
        },
        {
          id: "radiation-health-risks",
          title: "Mars Colonists Face Serious Radiation Exposure",
          description:
            "Mars lacks a global magnetic field and has a thin atmosphere, exposing surface inhabitants to galactic cosmic rays and solar particle events. A round-trip minimum radiation dose is 0.66 sieverts, and surface habitation adds continuous exposure. Long-term cancer and neurological risks are not yet fully understood.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "NASA Human Research Program; Cucinotta et al.",
          reasoning:
            "Well-established radiation physics. The health risks are real and currently unsolved for long-duration surface stays.",
        },
      ],
    },
    {
      id: "habitat-sustainability",
      title: "Habitat & Self-Sustainability",
      short_summary:
        "Mars has water ice, CO2, and regolith for building. It lacks a magnetic field, breathable air, and the ability to grow food at scale. Self-sufficiency is decades away at best.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Every life support system tested (Biosphere 2, ISS) has required constant resupply or failed to maintain atmospheric balance. Mars soil contains toxic perchlorates. Growing food in Martian conditions has never been demonstrated at scale. A colony dependent on Earth resupply every 26 months is not self-sustaining—it is an outpost.",
      proponent_rebuttal:
        "A 2024 comprehensive blueprint published in Heliyon details feasible approaches to Martian concrete using sulfur binders, aeroponics for food production, and algae bioreactors for oxygen generation. NASA's MOXIE experiment on Perseverance successfully produced oxygen from Martian CO₂. In-situ resource utilization reduces resupply mass by orders of magnitude.",
      crux: {
        id: "isru-demonstration",
        title: "Mars In-Situ Resource Utilization at Scale",
        description:
          "Demonstrating that water extraction, oxygen production, and construction materials can be produced from Martian resources at a scale sufficient to support a small crew.",
        methodology:
          "Deploy ISRU demonstration payloads on Mars. Measure water extraction rates from regolith/ice, oxygen production from CO₂, and structural integrity of regolith-based construction materials over 2+ year periods.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500M (Robotic ISRU demonstration mission)",
      },
      evidence: [
        {
          id: "moxie-success",
          title: "NASA MOXIE Produced Oxygen on Mars",
          description:
            "The Mars Oxygen In-Situ Resource Utilization Experiment (MOXIE) aboard NASA's Perseverance rover successfully produced oxygen from Martian atmospheric CO₂ across 16 runs in 2021-2023, demonstrating the core ISRU principle works on Mars.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "NASA JPL; Science Advances (2023)",
          reasoning:
            "Direct demonstration on Mars, though at tiny scale (6-8 grams/hour vs. tonnes needed for a colony).",
        },
        {
          id: "biosphere-2-failure",
          title: "Biosphere 2 Failed to Maintain Closed Ecosystem",
          description:
            "The $200M Biosphere 2 experiment (1991-1993) failed to maintain a self-sustaining closed ecosystem for 8 people on Earth. Oxygen levels dropped dangerously, requiring external injection. Food production was insufficient. If a sealed habitat failed on Earth with unlimited access to repair, Mars conditions would be far more challenging.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Columbia University; Nelson & Dempster (1996)",
          reasoning:
            "Directly relevant precedent for closed-loop life support. Technology has advanced since 1993, but no full-scale success has been demonstrated.",
        },
      ],
    },
  ],
};
