import type { Topic } from "@/lib/schemas/topic";

export const moonLandingData = {
  id: "moon-landing",
  title: "The Moon Landing",
  meta_claim:
    "The Apollo missions successfully landed 12 humans on the lunar surface between 1969 and 1972.",
  status: "settled" as const,
  category: "philosophy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "NASA Mission Report (Apollo 11)",
      url: "https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html",
    },
    {
      title: "LRO Imagery Verification",
      url: "https://www.nasa.gov/mission_pages/LRO/main/index.html",
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
        "While we cannot resolve the landers visually due to diffraction limits, we can interact with the Laser Ranging Retroreflectors (LRRR) left by the crew.",
      crux: {
        id: "apache-point",
        title: "The Apache Point Operation",
        description:
          "The retroreflectors placed on the Moon by Apollo astronauts can be pinged with lasers from Earth, providing physical proof of human activity on the lunar surface.",
        methodology:
          'Fire a pulse laser at coordinates 0°40\'26.69" N, 23°28\'22.69" E. Measure the return time. Only a manufactured corner-cube prism returns the signal.',
        equation: "D = \\frac{c \\cdot t}{2}",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (Amateur astronomers can verify with ~$5K equipment)",
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
            sourceReliability: 3,
            independence: 5,
            replicability: 2,
            directness: 2,
          },
          source:
            "Diffraction-limit optics (Hubble's ~0.05 arcsec resolution corresponds to ~90 m at lunar distance, far larger than a 4 m lander)",
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
        "Dose is a function of Intensity × Time. The Apollo trajectory bypassed the inner belt and traversed the outer belt at 25,000mph, resulting in a total transit dose of ~1.8 rads (survivable).",
      crux: {
        id: "dosimeter-audit",
        title: "The Dosimeter Audit",
        description:
          "By reviewing telemetry data from radiation measurements during the Apollo missions and cross-referencing with unmanned probe data, we can calculate exact exposure.",
        methodology:
          "Review raw telemetry data from unmanned probes (Explorer satellites) regarding belt intensity vs. Apollo flight logs. Calculate total exposure.",
        equation: "D_{total} = \\int_{t_{start}}^{t_{end}} I(r(t)) \\, dt",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (Data analysis of public records)",
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
          title: "Van Allen Belts Are Lethal",
          description:
            "Hoax claim that Van Allen belt radiation would kill astronauts during transit.",
          side: "against" as const,
          weight: {
            sourceReliability: 2,
            independence: 4,
            replicability: 1,
            directness: 3,
          },
          source:
            "Debunked: contradicted by measured Apollo dosimeter doses (~0.16-1.14 rad; NASA SP-368)",
          reasoning:
            "Misunderstands that dose = intensity × time; the fast belt transit produced only ~1-2 rad, far below a lethal (hundreds of rad) dose.",
        },
      ],
    },
  ],
};
