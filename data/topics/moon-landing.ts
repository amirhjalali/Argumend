export const moonLandingData = {
  id: "moon-landing",
  title: "The Moon Landing",
  question: "Did the Moon landings happen?",
  meta_claim:
    "The Apollo missions successfully landed 12 humans on the lunar surface between 1969 and 1972.",
  status: "settled" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Observatories in six countries, from Grasse in France to Apache Point in the US, fire lasers at the Apollo 11, 14 and 15 landing sites and time the echoes to measure the Earth–Moon distance. No telescope on Earth, Hubble included, can resolve the landers themselves. Both facts are on the record. The open questions are what returns those echoes, and whether Apollo's routes through the Van Allen belts explain the low doses its dosimeters recorded.",
    confidence: 97,
    source:
      "International Laser Ranging Service (ILRS) Lunar Laser Ranging; APOLLO collaboration (Apache Point); Observatoire de la Côte d'Azur (Grasse); NASA Astronomy Picture of the Day on Hubble's lunar resolution",
    sourceUrl: "https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar.html",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that no Earth-based telescope, Hubble included, can resolve the landers, a limit set by optics, and that the Van Allen belts hold dangerous trapped radiation that a slow or badly routed crossing would turn into a harmful dose.",
    "They split over whether the laser echoes from the Apollo 11, 14 and 15 sites need astronaut-placed retroreflectors or could come from natural lunar features, and over whether Apollo's routes and speeds through the belts account for the low doses its dosimeters recorded.",
    "Both can be checked independently: by ranging to points beside the arrays and comparing the echoes, and by recomputing dose from the published trajectories and independent belt data.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "NASA Mission Report (Apollo 11)",
      url: "https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html",
    },
    {
      title: "LRO Imagery Verification",
      url: "https://science.nasa.gov/mission/lro/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Where is the physical evidence?",
      content:
        "What specific physical traces remain on the lunar surface that can be verified from Earth today?",
      imageUrl:
        "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "Laser Ranging Retroreflector Experiment",
          url: "https://en.wikipedia.org/wiki/Lunar_Laser_Ranging_experiment",
        },
      ],
    },
    {
      id: "q2",
      title: "How was radiation handled?",
      content:
        "How did the astronauts survive the lethal Van Allen radiation belts without heavy shielding?",
      imageUrl:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Why haven't we returned?",
      content:
        "If the technology existed in 1969, what economic or political factors have prevented a return mission?",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "physical-trace",
      title: "The Physical Trace",
      short_summary:
        "Laser ranging retroreflectors provide active, testable evidence of human presence on the lunar surface.",
      image_url:
        "https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=800&q=60",
      icon_name: "Target" as const,
      skeptic_premise:
        "Even the Hubble telescope cannot see the flags or the Lunar Module. Without physical confirmation, we only have NASA's word.",
      proponent_rebuttal:
        "While no Earth telescope can resolve the landers (a diffraction limit, not a cover-up), observatories on multiple continents — including non-NASA institutions such as the Observatoire de la Côte d'Azur — routinely bounce lasers off the Laser Ranging Retroreflectors (LRRR) the crews left behind, returning signals from precisely surveyed Apollo coordinates.",
      crux: {
        id: "apache-point",
        title: "The Apache Point Operation",
        question:
          "Do laser echoes from the Moon need astronaut-placed reflectors, or could natural features explain them?",
        description:
          "Observatories on Earth fire lasers at the reported Apollo landing sites and time the echoes. The question is what on the surface sends them back.",
        methodology:
          'Fire a pulse laser at coordinates 0°40\'26.69" N, 23°28\'22.69" E. Measure the return time. Only a manufactured corner-cube prism returns the signal.',
        equation: "D = \\frac{c \\cdot t}{2}",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Compare laser returns from independent observatories aimed at the published Apollo reflector coordinates with returns from nearby bare ground and from the Soviet Lunokhod reflectors: a strong, timed echo only where reflectors were reported points to placed hardware, a similar echo from bare ground to natural features.",
        },
        cost_to_verify:
          "$0 (Amateur astronomers can verify with ~$5K equipment)",
        falsification: {
          supporter_flip:
            "If the laser returns from the Apollo coordinates turned out to be explainable without manufactured corner-cube prisms — e.g., natural lunar regolith or a non-Apollo source produced the same precise, time-resolved retroreflection from those exact surveyed spots — the 'physical trace' proof would collapse.",
          skeptic_flip:
            "If more independent observatories, like those at Grasse in France and Matera in Italy, kept getting sharp corner-cube returns only from the pre-surveyed Apollo coordinates, the claim that it all rests on NASA's word would be hard to hold.",
          common_ground:
            "Both sides agree no Earth-based telescope, including Hubble, can directly resolve the landers — that limit is set by diffraction, not by what's actually on the surface.",
          live_disagreement:
            "Whether the laser returns require human-placed retroreflectors or could arise from some natural lunar feature — resolvable by ranging to off-target coordinates (which return nothing) versus the Apollo arrays (which return a sharp signal).",
        },
      },
      evidence: [
        {
          id: "lrrr-independent",
          title: "Retroreflectors Ranged by Multiple Nations",
          description:
            "Observatories in the USA, France, Germany, Italy, Japan, and China have independently bounced lasers off the Apollo 11, 14, and 15 retroreflector arrays. McDonald Observatory began routine ranging within weeks of Apollo 11.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 10,
          },
          source:
            "Wikipedia: Lunar Laser Ranging experiment (citing McDonald Observatory, Observatoire de la Côte d'Azur, and the APOLLO collaboration)",
          sourceUrl: "https://en.wikipedia.org/wiki/Lunar_Laser_Ranging_experiment",
          reasoning:
            "Multiple independent nations have ranged to the Apollo arrays. Note: the USSR ranged its own Lunokhod reflectors rather than the Apollo arrays, so this is not a direct Cold-War-adversary check of Apollo hardware.",
        },
        {
          id: "lro-imagery",
          title: "Lunar Reconnaissance Orbiter Photos",
          description:
            "NASA's LRO has photographed all Apollo landing sites showing descent stages, equipment, and astronaut tracks.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 8,
            directness: 9,
          },
          source: "NASA Science — Apollo 11 Landing Site (LRO/LROC imagery)",
          sourceUrl: "https://science.nasa.gov/resource/apollo-11-landing-site/",
          reasoning:
            "Direct photographic evidence showing the descent stage and astronaut footprint trails, though from a NASA source.",
        },
        {
          id: "moon-rocks",
          title: "842 Pounds of Lunar Samples",
          description:
            "Six Apollo missions returned 382 kg (842 lbs) of lunar rocks and soil — about 2,200 samples — studied by labs worldwide. Isotopic and mineralogical composition differs from Earth rocks.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 10,
          },
          source: "NASA Astromaterials Curation — Lunar Rocks and Soils from Apollo Missions",
          sourceUrl: "https://curator.jsc.nasa.gov/lunar/",
          reasoning:
            "Physical samples distributed to labs globally; composition impossible to fake.",
        },
        {
          id: "hubble-limitation",
          title: "Cannot See Landing Sites from Earth",
          description:
            "No Earth-based telescope, including Hubble, can resolve objects as small as the lunar modules on the Moon's surface.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 5,
            replicability: 9,
            directness: 8,
          },
          source:
            "NASA Astronomy Picture of the Day, Hubble resolution at lunar distance",
          sourceUrl: "https://apod.nasa.gov/apod/ap020628.html",
          reasoning:
            "True statement of optics, but not evidence of fakery: Hubble's diffraction limit makes a few-meter object unresolvable at 384,000 km. Orbiters like LRO image the sites instead.",
        },
      ],
    },
    {
      id: "radiation-environment",
      title: "The Radiation Environment",
      short_summary:
        "Transit time through the Van Allen belts was minimized, resulting in survivable radiation exposure.",
      image_url:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=60",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The Van Allen belts contain lethal doses of protons and electrons. No human could survive the transit without meters of lead shielding.",
      proponent_rebuttal:
        "Dose is a function of Intensity × Time. The Apollo trajectory crossed the thinner edge of the belts at ~25,000 mph, so the full belt transit took only minutes. Measured whole-mission skin doses ranged from 0.16 rad (Apollo 8) to 1.14 rad (Apollo 14) — most of it accrued during that brief belt crossing — orders of magnitude below the hundreds of rads needed to cause acute harm.",
      crux: {
        id: "dosimeter-audit",
        title: "The Dosimeter Audit",
        question:
          "Do Apollo's flight paths and speeds explain the low radiation doses its dosimeters recorded?",
        description:
          "By reviewing telemetry data from radiation measurements during the Apollo missions and cross-referencing with unmanned probe data, we can calculate exact exposure.",
        methodology:
          "Review raw telemetry data from unmanned probes (Explorer satellites) regarding belt intensity vs. Apollo flight logs. Calculate total exposure.",
        equation: "D_{total} = \\int_{t_{start}}^{t_{end}} I(r(t)) \\, dt",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (Data analysis of public records)",
        falsification: {
          supporter_flip:
            "If independent reconstruction of the Apollo trajectories and belt-intensity data showed the crews must have absorbed hundreds of rads — incompatible with the recorded ~0.16–1.14 rad mission doses — then either the dosimetry was falsified or the transits couldn't have been survived as described, and the radiation rebuttal would fail.",
          skeptic_flip:
            "If independent reconstructions using the published Explorer and probe belt data found minutes-long transits through the thinner belt edge yielding doses near Apollo's recorded ~0.16–1.14 rad, the 'lethal belts' objection would lose its footing.",
          common_ground:
            "Both sides agree the Van Allen belts contain genuinely dangerous trapped radiation and that a slow or poorly routed transit would deliver a far higher, potentially harmful dose.",
          live_disagreement:
            "Whether the actual Apollo flight paths and crossing speeds kept total exposure in the low-single-digit-rad range — resolvable by recomputing dose from published trajectories and independent belt-intensity data and comparing it to the recorded dosimeter readings.",
        },
      },
      evidence: [
        {
          id: "dosimeter-records",
          title: "Astronaut Dosimeter Readings",
          description:
            "Personal dosimeters worn by astronauts recorded roughly 0.16-1.14 rad total mission skin dose (Apollo 11 lowest, Apollo 14 highest), well below dangerous levels.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 7,
            directness: 9,
          },
          source:
            "NASA, Biomedical Results of Apollo / Apollo Experience Report — Protection Against Radiation (NASA Technical Reports Server)",
          sourceUrl: "https://ntrs.nasa.gov/citations/19760005583",
          reasoning:
            "Direct measurement, though NASA-controlled data. Recorded doses are consistent with the short, high-speed belt transits.",
        },
        {
          id: "trajectory-analysis",
          title: "Optimal Trajectory Through Belts",
          description:
            "Apollo trajectories were designed to cross the belts quickly through thinner regions, bypassing the inner belt entirely (with Apollo 14 the partial exception that passed nearer the trapped-radiation core).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 10,
            directness: 8,
          },
          source:
            "Wikipedia: Van Allen radiation belt (Apollo astronauts section, citing NASA mission planning)",
          sourceUrl: "https://en.wikipedia.org/wiki/Van_Allen_radiation_belt",
          reasoning:
            "Physics-based trajectory analysis that can be independently verified from published flight paths.",
        },
        {
          id: "soviet-verification",
          title: "Independent Tracking and Soviet Acquiescence",
          description:
            "Jodrell Bank Observatory (UK) independently received Apollo 11's transmissions and simultaneously tracked the Soviet Luna 15 probe in lunar orbit. The USSR, with every incentive to expose a fake, never disputed the landings' authenticity.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 5,
            directness: 6,
          },
          source:
            "Jodrell Bank Centre for Astrophysics — history of space tracking (Apollo 11 / Luna 15)",
          sourceUrl: "https://www.jb.man.ac.uk/history/tracking/part2.html",
          reasoning:
            "Non-NASA tracking by a third-party observatory, plus the absence of any Soviet challenge despite Cold War incentive, are strongly independent corroboration.",
        },
        {
          id: "belt-intensity-claim",
          title: "Apollo Dosimeters Recorded Non-Lethal Radiation Doses",
          description:
            "NASA's mission dosimetry records show crew-averaged skin doses of 0.16 to 1.14 rad across the nine Apollo lunar missions, averaging 0.46 rad. Much of the dose came from the Van Allen belts, but no crew exceeded recommended annual limits for radiation workers. Transit risk was real and actively monitored; the measured doses contradict the claim that belt passage was necessarily lethal.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source:
            "NASA Apollo mission dosimetry summary and SP-368",
          sourceUrl:
            "https://history.nasa.gov/wp-content/uploads/static/history/alsj/WOTM/WOTM-Radiation.html",
          reasoning:
            "The figures are direct instrument measurements summarized by NASA and match the mission radiation-protection record. Independence is not maximal because NASA operated the missions, but the readings are quantitative, mission-specific, and physically consistent with short transit through lower-intensity regions.",
        },
      ],
    },
  ],
};
