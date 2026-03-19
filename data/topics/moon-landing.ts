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
          title: "Retroreflector Verified by 12+ Countries",
          description:
            "Observatories in USA, France, Germany, Italy, Australia, Japan, and others have independently bounced lasers off Apollo retroreflectors since 1969.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 10,
          },
          source: "Apache Point Observatory",
          reasoning:
            "Multiple independent nations, including Cold War adversaries, have verified the retroreflectors.",
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
          source: "NASA LRO",
          sourceUrl:
            "https://www.nasa.gov/mission_pages/LRO/news/apollo-sites.html",
          reasoning: "Direct photographic evidence, though from NASA source.",
        },
        {
          id: "moon-rocks",
          title: "842 Pounds of Lunar Samples",
          description:
            "Apollo missions returned 842 pounds of lunar rocks studied by scientists worldwide. Isotopic composition differs from Earth rocks.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 10,
          },
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
          reasoning:
            "This is a misunderstanding of optics, not evidence of fakery. Diffraction limits apply.",
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
            "Personal dosimeters worn by astronauts recorded 0.18-1.14 rad total exposure, well below dangerous levels.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 7,
            directness: 9,
          },
          reasoning: "Direct measurement, though NASA-controlled data.",
        },
        {
          id: "trajectory-analysis",
          title: "Optimal Trajectory Through Belts",
          description:
            "Apollo trajectories were specifically designed to minimize time in radiation belts, passing through thinnest regions at high speed.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 10,
            directness: 8,
          },
          reasoning:
            "Physics-based analysis that can be independently verified.",
        },
        {
          id: "soviet-verification",
          title: "Soviet Union Tracked Missions",
          description:
            "The USSR, with every incentive to expose a fake, tracked Apollo missions with their own radar and never disputed their authenticity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 10,
            replicability: 6,
            directness: 7,
          },
          reasoning: "Cold War adversary verification is highly independent.",
        },
        {
          id: "belt-intensity-claim",
          title: "Van Allen Belts Are Lethal",
          description:
            "Claims that Van Allen belt radiation would kill astronauts instantly.",
          side: "against" as const,
          weight: {
            sourceReliability: 2,
            independence: 4,
            replicability: 1,
            directness: 3,
          },
          reasoning:
            "Misunderstands that dose = intensity × time; fast transit means low dose.",
        },
      ],
    },
  ],
};
