import type { Topic } from "@/lib/schemas/topic";

export const spaceColonizationFeasibilityData = {
  id: "space-colonization-feasibility",
  title: "Space Colonization Feasibility",
  meta_claim:
    "Establishing permanent, self-sustaining human colonies on Mars or the Moon is technically and economically feasible within the next 50 years.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Even after the worst plausible catastrophe — nuclear war, an asteroid strike, runaway warming — Earth would still be vastly more habitable than Mars, which has no breathable air, lethal radiation, ~38% gravity, average −60°C, and toxic perchlorate soil. A Mars base is real engineering, but as of 2025 no rocket has even landed cargo there, and 'self-sufficient' is decades away — so it's an outpost, not a backup planet.",
    confidence: 84,
    source:
      "NASA Mars facts (radiation, gravity, atmosphere, perchlorates); SpaceX Starship status (2025); NASA MOXIE/ISRU results",
    sourceUrl: "https://science.nasa.gov/mars/facts/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The 'Mars as humanity's backup' pitch undersells how brutal Mars is: it has no breathable air, no magnetic field to block lethal radiation, about 38% of Earth's gravity, an average temperature around −60°C, and soil laced with toxic perchlorates — meaning even a post-nuclear, post-asteroid Earth would still be far easier to live on.",
    "The engineering is advancing for real — reusable rockets cut launch costs ~10× in 15 years, and NASA's MOXIE proved you can make oxygen from Martian air — but as of 2025 no vehicle has landed cargo on Mars, orbital refueling hasn't been demonstrated, and every closed life-support system tried on Earth (Biosphere 2) needed constant resupply or failed.",
    "So the honest debate isn't whether humans can ever reach Mars (probably) but whether a self-sustaining colony — one that survives if Earth resupply stops — is feasible within 50 years, or whether what's actually achievable is an expensive, Earth-dependent outpost.",
  ],
  pillars: [
    {
      id: "transport-technology",
      title: "Transportation Technology",
      short_summary:
        "SpaceX projects Starship will carry 100+ tonnes to Mars, but as of 2025 it has demonstrated a booster catch, not a full orbital flight with payload deploy. Getting humans there and back alive is a harder problem still.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Even SpaceX's Starship—the most advanced heavy-lift vehicle in development—had, as of 2025, demonstrated a Super Heavy booster catch (Flight 5, Oct 2024) but not a full orbital flight with payload deployment, and orbital propellant transfer remains undemonstrated. A conventional Mars transit takes 6-9 months, and the RAD instrument aboard the Mars Science Laboratory implies on the order of 0.66 Sv of dose-equivalent for a round trip with comparable shielding—a meaningful fraction of a career limit before any surface stay is counted. The cost of standing up a colony is plausibly in the hundreds of billions, with no demonstrated economic return to amortize it.",
      proponent_rebuttal:
        "Reusable rockets have already driven launch costs down by roughly an order of magnitude over the past 15 years, and Falcon 9 turned booster reuse from a stunt into routine—so the trajectory of the technology, not just one vehicle, is encouraging. Starship is designed for 100-150 tonnes to orbit (a SpaceX target, not yet flown with payload), and a peer-reviewed Scientific Reports (2025) trajectory study finds 90-104 day Earth-Mars transfers that stay within NASA's ~600 mSv career radiation limit—contingent on Starship-class performance and in-space refueling that have not yet been demonstrated. SpaceX projects uncrewed Mars landings around 2026-2027 and crewed missions later; those dates are company projections, but the engineering path to them is concrete rather than speculative.",
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
        falsification: {
          supporter_flip:
            "If Starship-class vehicles kept failing to demonstrate orbital refueling and an uncrewed Mars cargo landing within the next decade — the transport link never closing despite years of attempts — the 'feasible within 50 years' timeline would slip badly, since nothing downstream works without reliable transport.",
          skeptic_flip:
            "A skeptic who says it's a fantasy should weigh that reusable rockets already cut launch costs ~10× and made booster reuse routine, and that the radiation/transit math closes under Starship-class performance — so 'we can't even get there' understates a concrete, fast-moving engineering trajectory.",
          common_ground:
            "Both sides agree that as of 2025 no rocket has landed cargo on Mars and orbital propellant transfer hasn't been demonstrated, while launch costs have fallen sharply.",
          live_disagreement:
            "Whether Starship-class transport (orbital refueling + Mars cargo landing) will actually be demonstrated this decade, or stall — which only SpaceX's mission record will settle.",
        },
      },
      evidence: [
        {
          id: "starship-progress",
          title: "SpaceX Starship: Rapid Iteration Toward Mars Capability",
          description:
            "SpaceX's Starship has flown multiple integrated test flights since 2023 and has caught the Super Heavy booster at the launch tower (first achieved on Flight 5, October 2024). SpaceX advertises a target payload of 100-150 tonnes to low Earth orbit, and Starship is the baseline for NASA's Artemis HLS lunar lander. As of 2025, however, Starship had not yet completed a full orbital flight with payload deployment, and SpaceX's uncrewed Mars cargo target of 2026-2027 is a company projection, not a demonstrated capability.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 5,
            directness: 7,
          },
          source:
            "SpaceX, \"Starship\" vehicle page (advertised payload); NASA Artemis HLS contract award",
          sourceUrl: "https://www.spacex.com/vehicles/starship/",
          reasoning:
            "Booster-catch hardware progress is real and independently observed, but the 100-150 t payload figure and the 2026-2027 Mars timeline are unverified vendor projections from SpaceX itself. Weights de-inflated for low independence and for post-cutoff, undemonstrated claims.",
        },
        {
          id: "three-month-transit",
          title: "Scientific Reports: 3-Month Mars Transit Is Feasible",
          description:
            "A 2025 study published in Scientific Reports (Kingdon, UC Santa Barbara) identifies two ~90-104 day Earth-Mars transfer trajectories that would keep crew radiation exposure within NASA's ~600 mSv career limit, whereas conventional 180-day trajectories would not. The analysis assumes Starship-class performance and in-space refueling, neither of which has yet been demonstrated.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source:
            "Kingdon, J. \"3 months transit time to Mars for human missions using SpaceX Starship,\" Scientific Reports 15 (2025), DOI 10.1038/s41598-025-00565-7",
          sourceUrl: "https://www.nature.com/articles/s41598-025-00565-7",
          reasoning:
            "Peer-reviewed trajectory analysis grounded in known orbital mechanics. Replicability de-inflated because the result is contingent on Starship performance and orbital refueling that remain undemonstrated, making it a feasibility study rather than a verified capability.",
        },
        {
          id: "radiation-health-risks",
          title: "Mars Colonists Face Serious Radiation Exposure",
          description:
            "Mars lacks a global magnetic field and has a thin atmosphere, exposing surface inhabitants to galactic cosmic rays and solar particle events. The Radiation Assessment Detector (RAD) aboard the Mars Science Laboratory measured an in-transit dose-equivalent rate that implies roughly 0.66 ± 0.12 Sv for the shortest round-trip transit with current propulsion and comparable shielding; surface habitation adds continuous exposure. Long-term cancer and CNS risks remain incompletely characterized.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "Zeitlin et al., \"Measurements of Energetic Particle Radiation in Transit to Mars on the Mars Science Laboratory,\" Science 340 (2013) 1080-1084",
          sourceUrl: "https://www.science.org/doi/10.1126/science.1235989",
          reasoning:
            "Direct, in-situ measurement of the deep-space radiation environment from NASA's RAD instrument; the 0.66 Sv round-trip figure is sourced to this peer-reviewed Science paper. Corrected mis-attribution (Zeitlin et al., not Cucinotta). Health risks are real and unsolved for long-duration stays.",
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
        "Self-sufficiency need not be all-or-nothing: in-situ resource utilization (ISRU) reduces the mass that must be shipped from Earth by orders of magnitude, which is what makes a Mars outpost economically conceivable at all. NASA's MOXIE experiment on Perseverance proved the core chemistry end-to-end on Mars, electrolyzing oxygen from atmospheric CO₂ across 16 runs—at a peak of ~12 g/hour and ~122 g total, a deliberately small demonstrator whose process scales with power and reactor size rather than new physics. Published engineering studies sketch plausible (not yet demonstrated) approaches to the remaining pieces—sulfur-based or regolith-based construction, high-efficiency food production, and biological oxygen generation—so the open questions are scale-up and integration, not feasibility in principle.",
      crux: {
        id: "isru-demonstration",
        title: "Mars In-Situ Resource Utilization at Scale",
        description:
          "Demonstrating that water extraction, oxygen production, and construction materials can be produced from Martian resources at a scale sufficient to support a small crew.",
        methodology:
          "Deploy ISRU demonstration payloads on Mars. Measure water extraction rates from regolith/ice, oxygen production from CO₂, and structural integrity of regolith-based construction materials over 2+ year periods.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500M (Robotic ISRU demonstration mission)",
        falsification: {
          supporter_flip:
            "If ISRU and closed-loop life support repeatedly failed to scale on Mars — oxygen, water, food, and construction never reaching the volumes a crew needs without constant Earth resupply — then 'self-sustaining colony' would prove infeasible, leaving only a permanently dependent outpost.",
          skeptic_flip:
            "A skeptic citing Biosphere 2's failures should weigh that MOXIE already made oxygen from Martian CO₂ end-to-end and that ISRU scales with power and reactor size rather than new physics — so the barrier is engineering scale-up, not impossibility in principle.",
          common_ground:
            "Both sides agree no closed life-support system has yet been sustained without resupply, and that MOXIE proved the core oxygen-from-CO₂ chemistry at tiny scale on Mars.",
          live_disagreement:
            "Whether ISRU and life support can be scaled and integrated to true self-sufficiency (surviving a cut-off from Earth), or whether a Mars settlement remains a resupply-dependent outpost — which only large-scale ISRU and closed-loop demonstrations can resolve.",
        },
      },
      evidence: [
        {
          id: "moxie-success",
          title: "NASA MOXIE Produced Oxygen on Mars",
          description:
            "The Mars Oxygen In-Situ Resource Utilization Experiment (MOXIE) aboard NASA's Perseverance rover produced oxygen from Martian atmospheric CO₂ across 16 runs in 2021-2023, generating a cumulative total of about 122 grams and reaching a peak rate of roughly 12 grams per hour, demonstrating the core ISRU principle works on Mars.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Hecht et al., \"Mars Oxygen ISRU Experiment (MOXIE),\" Science Advances (2022); NASA JPL mission summary (2023)",
          sourceUrl: "https://www.jpl.nasa.gov/news/nasas-oxygen-generating-experiment-moxie-completes-mars-mission/",
          reasoning:
            "Direct demonstration on Mars, but at tiny scale: peak ~12 g/hour and ~122 g total over the mission, versus the tonnes of oxygen a crewed colony would require. Corrected the production rate (was overstated/garbled as 6-8 g/hour).",
        },
        {
          id: "biosphere-2-failure",
          title: "Biosphere 2 Failed to Maintain Closed Ecosystem",
          description:
            "The ~$150M Biosphere 2 experiment (first closure 1991-1993) could not maintain a self-sustaining closed ecosystem for its 8 crew. Atmospheric oxygen fell from 20.9% to about 14% over roughly 16 months—driven largely by soil-microbe respiration and CO₂ uptake by exposed concrete—requiring external oxygen injection, and food production was insufficient. A sealed habitat that struggled on Earth with full access to repair underscores how much harder closed-loop life support would be on Mars.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Biosphere 2 mission record, summarized by the University of Arizona (current operator) and contemporaneous reporting",
          sourceUrl: "https://en.wikipedia.org/wiki/Biosphere_2",
          reasoning:
            "Directly relevant precedent for closed-loop life support. Corrected the cost (~$150M, not $200M) and added the documented oxygen decline (to ~14%) and its cause. Could not web-verify the prior \"Nelson & Dempster (1996)\" citation, so the source is now an honest pointer to the well-documented public record rather than a possibly-fabricated reference. Technology has advanced since 1993, but no full-scale closed-loop success has been demonstrated.",
        },
      ],
    },
  ],
};
