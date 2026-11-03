export const spaceColonizationFeasibilityData = {
  id: "space-colonization-feasibility",
  title: "Space Colonization Feasibility",
  question:
    "Can we build self-sustaining colonies on Mars or the Moon within 50 years?",
  meta_claim:
    "Establishing permanent, self-sustaining human colonies on Mars or the Moon is technically and economically feasible within the next 50 years.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Mars has no breathable air, about 38% of Earth's gravity, an average temperature around −60°C and soil laced with toxic perchlorates. Only robotic landers and rovers have touched down there (NASA's Perseverance rover weighs 1,025 kg), though NASA's MOXIE made about 122 grams of oxygen from Martian air across 16 runs. Both sides accept these facts. What divides them is whether transport and life support can turn an outpost into a colony that survives without Earth within 50 years.",
    confidence: 84,
    source:
      "NASA Mars facts; NASA JPL MOXIE mission summary (2023); NASA Perseverance rover specifications",
    sourceUrl: "https://science.nasa.gov/mars/facts/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that as of October 2026 Starship had reached orbit only once, ship-to-ship refueling had not been demonstrated and nothing larger than a robotic rover had landed on Mars, that launch costs have fallen sharply, that no closed life-support system has yet run without resupply — Biosphere 2 needed outside oxygen — and that MOXIE proved the oxygen-from-CO₂ chemistry at tiny scale.",
    "They split over whether SpaceX's Starship will demonstrate orbital refueling and Mars cargo landings this decade, and whether in-situ resource use and closed-loop life support can scale into a Mars or Moon settlement that survives being cut off from Earth, or leave a resupply-dependent outpost.",
  ],
  pillars: [
    {
      id: "transport-technology",
      title: "Transportation Technology",
      short_summary:
        "SpaceX projects Starship will carry 100+ tonnes to Mars. It first reached orbit and deployed a payload in September 2026, but as of October 2026 it had not demonstrated the orbital refueling a Mars trip needs, and SpaceX has put its Mars mission behind a lunar landing. Getting humans there and back alive is a harder problem still.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Even SpaceX's Starship—the most advanced heavy-lift vehicle in development—reached orbit for the first time only on Flight 14 (September 2026), after 13 suborbital test flights; as of October 2026 ship-to-ship propellant transfer, which a Mars trip depends on, had not been demonstrated, and in February 2026 SpaceX put off its planned 2026 Mars mission to prioritize a lunar landing. A conventional Mars transit takes 6-9 months, and the RAD instrument aboard the Mars Science Laboratory implies on the order of 0.66 Sv of dose-equivalent for a round trip with comparable shielding—a meaningful fraction of a career limit before any surface stay is counted. The cost of standing up a colony is plausibly in the hundreds of billions, with no demonstrated economic return to amortize it.",
      proponent_rebuttal:
        "Reusable rockets have already driven launch costs down by roughly an order of magnitude over the past 15 years, and Falcon 9 turned booster reuse from a stunt into routine—so the trajectory of the technology, not just one vehicle, is encouraging. Starship is designed for 100-150 tonnes to orbit (a SpaceX target; its first orbital flight, in September 2026, deployed 26 Starlink V3 satellites), and a peer-reviewed Scientific Reports (2025) trajectory study finds 90-104 day Earth-Mars transfers that stay within NASA's ~600 mSv career radiation limit—contingent on Starship-class performance and in-space refueling that have not yet been demonstrated. SpaceX says it will attempt Mars after an uncrewed lunar landing it targets for March 2027; those dates are company projections, but the engineering path to them is concrete rather than speculative.",
      crux: {
        id: "starship-mars-landing",
        title: "Successful Uncrewed Mars Landing",
        question:
          "Will Starship-class transport, with orbital refueling and Mars landings, be demonstrated this decade?",
        description:
          "Demonstrating that Starship can successfully land on Mars with a full cargo payload, proving the transportation link is viable.",
        methodology:
          "Track SpaceX Starship development milestones: orbital refueling demonstration, lunar landing (Artemis HLS), and uncrewed Mars landing. Measure payload delivered vs. planned.",
        equation:
          "P(\\text{colony}) = P(\\text{transport}) \\times P(\\text{habitat}) \\times P(\\text{ISRU}) \\times P(\\text{funding})",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Public flight records of Starship missions: a completed ship-to-ship orbital refueling, then an uncrewed Mars landing with cargo intact, with the date of each set against the dates SpaceX announced.",
        },
        cost_to_verify: "$0 (Monitor SpaceX mission outcomes)",
        falsification: {
          supporter_flip:
            "If Starship-class vehicles failed for another decade to demonstrate orbital refueling and an uncrewed Mars cargo landing, the 'feasible within 50 years' timeline would slip badly, since nothing downstream works without reliable transport.",
          skeptic_flip:
            "If Starship-class vehicles carried the ~10× launch-cost cut and routine booster reuse of reusable rockets on to orbital refueling, at the performance where the radiation and transit math closes, 'we can't even get there' would lose its footing.",
          common_ground:
            "Both sides agree that as of October 2026 nothing larger than a robotic rover had landed on Mars and ship-to-ship propellant transfer hadn't been demonstrated, while launch costs have fallen sharply.",
          live_disagreement:
            "Whether Starship-class transport (orbital refueling + Mars cargo landing) will actually be demonstrated this decade, or stall — which only SpaceX's mission record will settle.",
        },
      },
      evidence: [
        {
          id: "starship-progress",
          title: "SpaceX Starship: Rapid Iteration Toward Mars Capability",
          description:
            "SpaceX's Starship has flown 14 integrated test flights since 2023, has caught the Super Heavy booster at the launch tower on three of them (first on Flight 5, October 2024), and on Flight 14 (28 September 2026) reached orbit for the first time and deployed 26 Starlink V3 satellites. SpaceX advertises a target payload of 100-150 tonnes to low Earth orbit, and Starship is the baseline for NASA's Artemis HLS lunar lander. As of October 2026, however, ship-to-ship propellant transfer had not been demonstrated, and in February 2026 SpaceX put off its planned 2026 Mars mission to prioritize an uncrewed lunar landing targeted for March 2027, so a Mars cargo landing remains a company projection, not a demonstrated capability.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 5,
            directness: 7,
          },
          source:
            "SpaceX, \"Starship\" vehicle page (advertised payload); NASA Artemis HLS contract award; Space.com (29 Oct 2026) and Astronomy (30 Sep 2026) on Flight 14; Wall Street Journal via AIAA (9 Feb 2026) on the Mars delay",
          sourceUrl: "https://www.spacex.com/vehicles/starship/",
          reasoning:
            "Booster catches and the first orbital flight are real and independently observed, but the 100-150 t payload figure and any Mars timeline are unverified vendor projections from SpaceX itself. Weights de-inflated for low independence and for post-cutoff, undemonstrated claims.",
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
        {
          id: "gao-hls-propellant-transfer",
          title: "GAO (Nov 2023): SpaceX Had Made 'Limited Progress' on the In-Orbit Refueling Its Lander Needs, and 8 of 13 Key Events Had Slipped",
          description:
            "The Government Accountability Office's review of NASA's Artemis landing program (GAO-24-106256, 30 November 2023) found that SpaceX's Human Landing System, a Starship variant, depends on launching 'multiple tankers' to fill an orbital depot, and that NASA documents indicate 'SpaceX has made limited progress maturing the technologies needed to support this aspect of its plan.' As of September 2023 the program had delayed 'eight of 13 key events by at least 6 months.' GAO judged the crewed landing 'is unlikely to occur in 2025' and, at the average pace of NASA major projects, 'would likely occur in early 2027.' As of October 2026 ship-to-ship propellant transfer still had not been demonstrated.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "U.S. Government Accountability Office, 'NASA Artemis Programs: Crewed Moon Landing Faces Multiple Challenges', GAO-24-106256 (30 Nov 2023)",
          sourceUrl: "https://www.gao.gov/products/gao-24-106256",
          reasoning:
            "An independent auditor with access to NASA's internal schedule documents, on the exact capability the crux turns on: refueling is the step between a Starship in orbit and a Starship at Mars. Directness is 6 because it audits the lunar lander rather than a Mars mission, and the report is from 2023; SpaceX has since reached orbit (September 2026), though refueling remained undemonstrated as of October 2026.",
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
        question:
          "Can a Mars settlement become self-sufficient enough to survive being cut off from Earth?",
        description:
          "Demonstrating that water extraction, oxygen production, and construction materials can be produced from Martian resources at a scale sufficient to support a small crew.",
        methodology:
          "Deploy ISRU demonstration payloads on Mars. Measure water extraction rates from regolith/ice, oxygen production from CO₂, and structural integrity of regolith-based construction materials over 2+ year periods.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Mars surface missions that extract water and make oxygen and building material from local resources at crew-supporting scale for months, building on NASA's MOXIE experiment, plus closed-habitat trials on Earth that run without resupply.",
        },
        cost_to_verify: "$500M (Robotic ISRU demonstration mission)",
        falsification: {
          supporter_flip:
            "If ISRU and closed-loop life support repeatedly failed to scale on Mars — oxygen, water, food, and construction never reaching the volumes a crew needs without constant Earth resupply — then 'self-sustaining colony' would prove infeasible, leaving only a permanently dependent outpost.",
          skeptic_flip:
            "If ISRU plants scaled MOXIE's end-to-end oxygen production from Martian CO₂ with more power and bigger reactors, without new physics, the Biosphere 2 objection would shrink to an engineering scale-up problem rather than an impossibility.",
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
          id: "iss-98-percent-water-recovery",
          title: "NASA (June 2023): The Space Station's Life Support Reached 98% Water Recovery With a New Brine Processor",
          description:
            "NASA reported on 20 June 2023 that the International Space Station's Environmental Control and Life Support System 'can reach total water recovery of 98%, thanks to the brine processor', which pulls the remaining water out of the brine left after urine processing. The agency tied the goal directly to missions beyond Earth orbit: 'The inability of resupply during exploration means we need to be able to reclaim all the resources,' and 'The less water and oxygen we have to ship up, the more science that can be added to the launch vehicle.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 7,
            directness: 5,
          },
          source:
            "NASA, 'NASA Achieves Water Recovery Milestone on International Space Station' (20 June 2023)",
          sourceUrl:
            "https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/",
          reasoning:
            "A measured, operating result in the hardest closed-loop environment so far, showing that the water loop of a settlement can be closed almost completely. Directness is 5: water is one loop of several, the station still depends on resupply for food, spare parts and other consumables, and NASA is reporting on its own hardware (independence 5).",
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
        {
          id: "mit-mars-one-assessment",
          title: "MIT (2014): A Crop-Fed Mars One Habitat Would Suffocate Its First Settler in About 68 Days, and Spare Parts Would Reach 62% of Payloads From Earth",
          description:
            "An MIT team (Sydney Do, Koki Ho, Andrew Owens, Samuel Schreiner and Olivier de Weck) modelled the Mars One settlement plan and presented it at the International Astronautical Congress in October 2014. If crops supplied all the food they would 'produce unsafe levels of oxygen' above fire-safety limits; venting it means adding nitrogen, which runs out, so pressure falls and the first settler would 'suffocate... within an estimated 68 days.' As the colony grows, spare parts would make up 'as much as 62 percent of payloads from Earth', and the initial supplies would take an estimated 15 Falcon Heavy launches rather than the plan's six.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 9,
            replicability: 5,
            directness: 6,
          },
          source:
            "MIT News (14 Oct 2014), on the independent assessment of Mars One by Do, Ho, Owens, Schreiner & de Weck, International Astronautical Congress (2014)",
          sourceUrl: "https://news.mit.edu/2014/technical-feasibility-mars-one-1014",
          reasoning:
            "Independent systems modelling of a concrete settlement plan, and it puts numbers on why a settlement cut off from Earth fails: integrating the loops (crops, atmosphere, spares) is harder than any one loop. Directness is 6 because it models one under-engineered private plan with 2014 technology, so a better design could avoid the oxygen trap; the spares result, that resupply mass grows with the colony, is the more general finding. A conference model, not a peer-reviewed journal article.",
        },
      ],
    },
  ],
};
