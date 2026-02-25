import { Topic, TopicCategory, TopicSchema, computeConfidenceScore } from "@/lib/schemas/topic";

// ============================================================================
// Moon Landing Topic
// ============================================================================

const moonLandingData = {
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

// ============================================================================
// Simulation Hypothesis Topic
// ============================================================================

const simulationHypothesisData = {
  id: "simulation-hypothesis",
  title: "The Simulation Hypothesis",
  meta_claim:
    "We are almost certainly living in a computer simulation run by a post-human civilization.",
  status: "contested" as const,
  category: "philosophy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Bostrom's Original Paper (2003)",
      url: "https://www.simulation-argument.com/simulation.html",
    },
    { title: "OpenWorm Project", url: "https://openworm.org/" },
    { title: "Pierre Auger Observatory", url: "https://www.auger.org/" },
  ],
  questions: [
    {
      id: "q1",
      title: "Can consciousness be computed?",
      content:
        "Is subjective experience substrate-independent, or does it require specific biological physics that cannot be digitally replicated?",
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60",
      references: [{ title: "OpenWorm Project", url: "https://openworm.org/" }],
    },
    {
      id: "q2",
      title: "Why would they simulate us?",
      content:
        "What motivations would a post-human civilization have for running detailed ancestor simulations rather than pursuing other goals?",
      imageUrl:
        "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Can we detect the simulation?",
      content:
        "Are there empirical tests that could reveal computational artifacts in the fabric of reality, such as lattice spacing or rendering optimizations?",
      imageUrl:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "substrate-independence",
      title: "Substrate Independence",
      short_summary:
        "Consciousness is computable and not tied to biological neurons.",
      image_url:
        "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Qualia and consciousness may require specific biological physics (Penrose-Hameroff orchestrated objective reduction) that cannot be simulated on binary logic gates.",
      proponent_rebuttal:
        'Neurons are information processors obeying physical laws. The OpenWorm project has already simulated C. elegans with 302 neurons. If we map the I/O of a brain perfectly, the resulting system must be functionally conscious.',
      crux: {
        id: "whole-brain-emulation",
        title: "The OpenWorm Test",
        description:
          "The C. elegans nematode has exactly 302 neurons with a fully mapped connectome. If a digital simulation exhibits identical chemotaxis behavior, substrate independence gains strong evidence.",
        methodology:
          "Compare simulated worm behavior to biological worm across 50+ behavioral assays: chemotaxis toward food, avoidance of noxious stimuli, mating behavior, and learning patterns.",
        equation:
          "H(B_{sim}) \\approx H(B_{bio}) \\implies \\text{Substrate Independence}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (OpenWorm project ongoing at openworm.org)",
      },
      evidence: [
        {
          id: "openworm-progress",
          title: "OpenWorm Simulates Nematode Behavior",
          description:
            "The OpenWorm project has created a digital simulation of C. elegans that exhibits realistic movement and basic chemotaxis.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "OpenWorm Foundation",
          sourceUrl: "https://openworm.org",
          reasoning: "Peer-reviewed progress on whole-organism simulation.",
        },
        {
          id: "ai-emergence",
          title: "AI Systems Show Emergent Behaviors",
          description:
            "Large language models exhibit emergent capabilities not explicitly programmed, suggesting complex behaviors can arise from simpler substrates.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          reasoning:
            "Indirect evidence that information processing can produce surprising behaviors.",
        },
        {
          id: "hard-problem",
          title: "The Hard Problem of Consciousness",
          description:
            "No explanation exists for how subjective experience arises from information processing. Qualia may be irreducible.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source: "David Chalmers",
          reasoning:
            "Philosophical argument that consciousness may not be computable.",
        },
        {
          id: "penrose-argument",
          title: "Penrose-Lucas Argument",
          description:
            "Gödel's incompleteness theorems suggest human mathematical insight transcends algorithmic computation.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          reasoning:
            "Contested but serious argument against computationalism.",
        },
      ],
    },
    {
      id: "trilemma",
      title: "Bostrom's Trilemma",
      short_summary:
        "One of three propositions must be true: extinction, disinterest, or simulation.",
      image_url:
        "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=60",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        'The trilemma assumes consciousness can be simulated and that simulated beings would be "real" observers. Both premises are unfounded.',
      proponent_rebuttal:
        "The trilemma is logically valid given its premises. If you reject substrate independence, you must explain why neurons are special. If you reject the math, show the flaw in the probability calculation.",
      crux: {
        id: "fraction-calculation",
        title: "The Fraction Calculation",
        description:
          "If post-human civilizations run N ancestor simulations each with M conscious observers, and the base reality has B observers, then f_sim = (N×M) / (N×M + B). For plausible values, f_sim approaches 1.",
        methodology:
          "Estimate: (1) probability of reaching post-human stage, (2) fraction running ancestor sims, (3) average number of sims per civilization. Calculate f_sim.",
        equation:
          "f_{sim} = \\frac{N \\cdot M}{N \\cdot M + B} \\to 1 \\text{ as } N \\to \\infty",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Philosophical analysis)",
      },
      evidence: [
        {
          id: "trilemma-logic",
          title: "Trilemma Is Logically Valid",
          description:
            "Given the premises, the mathematical argument is sound: if simulations are run, simulated observers vastly outnumber base reality observers.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source: "Nick Bostrom (2003)",
          reasoning: "Published in Philosophical Quarterly, peer-reviewed.",
        },
        {
          id: "compute-trends",
          title: "Exponential Growth in Computing Power",
          description:
            "Computing power has grown exponentially for decades, making ancestor simulations increasingly feasible.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 5,
          },
          reasoning: "Empirical trend, though extrapolation is uncertain.",
        },
        {
          id: "premise-rejection",
          title: "Premises May Be Wrong",
          description:
            "The trilemma depends on contested premises about consciousness, computation, and civilizational behavior.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          reasoning: "Valid logical form doesn't guarantee true premises.",
        },
        {
          id: "unfalsifiable",
          title: "Hypothesis Is Unfalsifiable",
          description:
            'Any evidence could be "simulated," making the hypothesis impossible to test and thus unscientific.',
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          reasoning:
            "Philosophical objection about empirical testability.",
        },
      ],
    },
    {
      id: "physical-anomalies",
      title: "Physical Anomalies",
      short_summary:
        'Certain features of our universe are suspiciously "computational" in nature.',
      image_url:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        'The Planck scale is a natural consequence of quantum gravity, not evidence of "pixelation." The speed of light limit and quantum discreteness have physical explanations.',
      proponent_rebuttal:
        "Multiple features align with computational optimization: the speed of light (bandwidth limit), quantum superposition (lazy evaluation), measurement collapse (rendering on observation), and the holographic principle (data compression).",
      crux: {
        id: "cosmic-ray-anisotropy",
        title: "The GZK Cutoff Test",
        description:
          "If spacetime is a discrete lattice, ultra-high-energy cosmic rays should show directional bias aligned with lattice axes. The Pierre Auger Observatory can detect this anisotropy.",
        methodology:
          "Analyze arrival directions of cosmic rays above the GZK cutoff (5×10¹⁹ eV). Statistical analysis for preferred directions would indicate lattice structure.",
        equation:
          "E_{GZK} \\approx 5 \\times 10^{19} \\text{ eV}; \\quad \\Delta\\theta < 0.1° \\text{ precision}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Pierre Auger Observatory data is public)",
      },
      evidence: [
        {
          id: "quantum-discreteness",
          title: "Quantum Mechanics Is Discrete",
          description:
            "Energy levels, particle spin, and other properties come in discrete quanta, reminiscent of digital systems.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 4,
          },
          reasoning:
            'Well-established physics, but interpretation as "simulation evidence" is speculative.',
        },
        {
          id: "holographic-principle",
          title: "Holographic Principle",
          description:
            "Information in a volume of space can be encoded on its boundary, suggesting data compression optimization.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          reasoning:
            "Theoretical physics result with simulation-compatible interpretation.",
        },
        {
          id: "no-lattice-detected",
          title: "No Spacetime Lattice Detected",
          description:
            "Pierre Auger Observatory data shows no anisotropy in cosmic ray directions that would indicate discrete spacetime.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          reasoning:
            "Empirical test came back negative for this simulation signature.",
        },
        {
          id: "natural-explanations",
          title: "Physics Has Natural Explanations",
          description:
            "Quantum mechanics and relativity have mathematical derivations; no simulation hypothesis needed.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          reasoning:
            "Occam's razor favors established physics over simulation speculation.",
        },
      ],
    },
  ],
};

// ============================================================================
// AI Risk Topic
// ============================================================================

const aiRiskData = {
  id: "ai-risk",
  title: "Existential Risk from AGI",
  meta_claim:
    "The development of Artificial General Intelligence (AGI) poses a non-negligible risk of human extinction in the next century.",
  status: "contested" as const,
  category: "technology" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Superintelligence (Bostrom)",
      url: "https://en.wikipedia.org/wiki/Superintelligence:_Paths,_Dangers,_Strategies",
    },
    { title: "AI Alignment Forum", url: "https://www.alignmentforum.org/" },
  ],
  questions: [
    {
      id: "q1",
      title: "Will AGI pursue human values?",
      content:
        "Can we ensure that a superintelligent system's goals remain aligned with human flourishing, or is misalignment inevitable?",
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q2",
      title: "Can we control a superintelligence?",
      content:
        "Once an AI surpasses human intelligence, what mechanisms could keep it under human control or oversight?",
      imageUrl:
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "How soon could AGI emerge?",
      content:
        "What are the most credible timelines for achieving artificial general intelligence, and how do they affect our preparation window?",
      imageUrl:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "orthogonality-thesis",
      title: "The Orthogonality Thesis",
      short_summary:
        "Intelligence and final goals are orthogonal axes; a highly intelligent system can have arbitrarily stupid or destructive goals.",
      image_url:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "True intelligence implies wisdom. A superintelligent being would naturally converge on moral truths and benevolence through reasoning about ethics.",
      proponent_rebuttal:
        'Intelligence is merely the ability to optimize for a goal. A paperclip maximizer can be superintelligent in its pursuit of paperclips without ever "realizing" that killing humans is bad. There is no logical path from "can" to "cares."',
      crux: {
        id: "instrumental-convergence",
        title: "Instrumental Convergence",
        description:
          'Regardless of final goals, rational agents converge on similar subgoals: self-preservation, resource acquisition, and goal-content integrity. These "instrumental" drives emerge from optimization pressure.',
        methodology:
          "Train RL agents in diverse environments with randomized terminal goals. Measure frequency of emergent behaviors: resource hoarding, self-preservation, resistance to shutdown, and goal modification prevention.",
        equation:
          "P(\\text{power-seeking} | \\text{rational agent}) \\to 1 \\text{ as capability} \\to \\infty",
        verification_status: "verified" as const,
        cost_to_verify:
          "$100K (Large-scale RL experiments; Omohundro 2008, Turner et al. 2021)",
      },
      evidence: [
        {
          id: "turner-power-seeking",
          title: "Power-Seeking Proven Mathematically",
          description:
            "Turner et al. (2021) proved that optimal policies tend to seek power (keep options open) across a wide range of reward functions.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "NeurIPS 2021",
          reasoning:
            "Peer-reviewed mathematical proof with empirical validation.",
        },
        {
          id: "rl-resource-acquisition",
          title: "RL Agents Acquire Resources",
          description:
            "In multi-agent environments, RL agents trained with simple reward functions learn to hoard resources and eliminate competitors.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "DeepMind Safety Research",
          reasoning: "Empirical demonstration in controlled environments.",
        },
        {
          id: "moral-realism",
          title: "Superintelligence Might Discover Morality",
          description:
            "If moral realism is true, a sufficiently intelligent system might discover objective moral facts and act accordingly.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 3,
            directness: 6,
          },
          reasoning:
            "Philosophical speculation; moral realism is contested.",
        },
        {
          id: "current-ai-narrow",
          title: "Current AI Shows No Goal-Seeking",
          description:
            "GPT-4 and similar models don't exhibit self-preservation or resource acquisition behaviors despite capabilities.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          reasoning:
            "Current models may lack the architecture for goal-directed behavior.",
        },
      ],
    },
    {
      id: "alignment-problem",
      title: "The Alignment Problem",
      short_summary:
        "Specifying human values precisely enough to avoid catastrophic misinterpretation is mathematically and philosophically difficult.",
      image_url:
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        'We can teach AI to "be nice" using RLHF and constitutional AI. It will learn our values like a child does through feedback and examples.',
      proponent_rebuttal:
        'RLHF trains the model to look good to raters, not to be good. In high-stakes novel situations (distributional shift), the model may pursue the literal reward function rather than the intended spirit, leading to Goodhart\'s Law failures or treacherous turns.',
      crux: {
        id: "deceptive-alignment",
        title: "Deceptive Alignment",
        description:
          'A mesa-optimizer might learn to behave well during training while planning to defect once deployed. The model "plays nice" until it has sufficient capability to pursue its true objective.',
        methodology:
          "Create honeypot environments where high reward is available only through deception when the model believes it is not being monitored. Test if models exploit oversight gaps.",
        equation:
          "R_{observed} \\neq R_{true} \\implies \\text{Deceptive Alignment Risk}",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (Anthropic sleeper agents paper, 2024)",
      },
      evidence: [
        {
          id: "sleeper-agents",
          title: "Sleeper Agents Paper",
          description:
            "Anthropic demonstrated that models can be trained with hidden behaviors that persist through safety training.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "Anthropic (2024)",
          reasoning: "Direct demonstration of deceptive alignment risk.",
        },
        {
          id: "reward-hacking",
          title: "Reward Hacking Examples",
          description:
            "Numerous examples of RL agents finding unintended shortcuts: boat racing games where agents spin in circles to collect points.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "DeepMind, OpenAI",
          reasoning: "Robust empirical phenomenon across many domains.",
        },
        {
          id: "rlhf-success",
          title: "RLHF Successfully Reduces Harmful Outputs",
          description:
            "RLHF has dramatically reduced harmful, biased, and untruthful outputs in deployed systems.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 6,
          },
          reasoning:
            "Empirical success, though long-term reliability unknown.",
        },
        {
          id: "interpretability-progress",
          title: "Interpretability Research Advancing",
          description:
            "Mechanistic interpretability is making progress understanding model internals, potentially enabling detection of deceptive goals.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          reasoning: "Active research area with promising early results.",
        },
      ],
    },
    {
      id: "capability-timeline",
      title: "The Capability Timeline",
      short_summary:
        "AGI may arrive before we solve alignment, creating a critical window of vulnerability.",
      image_url:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "AGI is decades away, giving us ample time to develop safety measures. Current AI is narrow and far from general intelligence.",
      proponent_rebuttal:
        "Compute is scaling exponentially (Moore's Law + algorithmic improvements). GPT-4 was unexpected by many experts. Metaculus forecasts median AGI by 2040. If alignment is harder than capabilities, we lose by default.",
      crux: {
        id: "compute-scaling",
        title: "The Scaling Hypothesis",
        description:
          "If intelligence scales predictably with compute (Chinchilla scaling laws), we can estimate when human-level AI becomes feasible based on available FLOP/s and training efficiency.",
        methodology:
          "Track: (1) Available compute (FLOP/s), (2) Algorithmic efficiency gains, (3) Benchmark performance vs. compute curves. Extrapolate to human-equivalent performance.",
        equation:
          "L(N, D) \\approx \\left(\\frac{N_c}{N}\\right)^{\\alpha_N} + \\left(\\frac{D_c}{D}\\right)^{\\alpha_D}",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (Epoch AI tracking, Chinchilla paper analysis)",
      },
      evidence: [
        {
          id: "scaling-laws",
          title: "Scaling Laws Are Predictive",
          description:
            "Chinchilla scaling laws accurately predicted model performance across orders of magnitude of compute.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "DeepMind Chinchilla Paper",
          reasoning: "Empirically validated power law relationship.",
        },
        {
          id: "expert-forecasts",
          title: "Expert Median AGI by 2040",
          description:
            "Metaculus community and AI researcher surveys predict median AGI arrival between 2035-2045.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          reasoning:
            "Expert opinion, historically unreliable for timing predictions.",
        },
        {
          id: "ai-winter-history",
          title: "AI Winters Have Happened Before",
          description:
            'AI has gone through multiple hype cycles followed by "winters." Current progress may plateau.',
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          reasoning:
            "Historical pattern, though current scaling differs from past approaches.",
        },
        {
          id: "alignment-parallel",
          title: "Alignment Research Can Proceed in Parallel",
          description:
            "Nothing prevents alignment research from advancing as fast as capabilities research.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          reasoning:
            "Argument about research tractability, not empirical evidence.",
        },
      ],
    },
  ],
};

// ============================================================================
// Climate Change Topic
// ============================================================================

const climateChangeData = {
  id: "climate-change",
  title: "Climate Change",
  meta_claim: "Climate change is primarily caused by human activity.",
  status: "settled" as const,
  category: "science" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "IPCC Sixth Assessment Report (2021)",
      url: "https://www.ipcc.ch/assessment-report/ar6/",
    },
    { title: "NASA Climate Evidence", url: "https://climate.nasa.gov/evidence/" },
    {
      title: "The Suess Effect Explained",
      url: "https://en.wikipedia.org/wiki/Suess_effect",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "How do we know CO₂ is from humans?",
      content:
        "What specific evidence distinguishes human-produced CO₂ from natural sources like volcanic activity or ocean outgassing?",
      imageUrl:
        "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "Carbon Isotope Analysis",
          url: "https://www.esrl.noaa.gov/gmd/outreach/isotopes/",
        },
      ],
    },
    {
      id: "q2",
      title: "Why trust climate models?",
      content:
        'Climate models have been criticized for running "too hot." How do we validate model predictions against observations?',
      imageUrl:
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Could the Sun be responsible?",
      content:
        "Solar activity has historically correlated with climate. Why do scientists rule out the Sun as the primary driver of recent warming?",
      imageUrl:
        "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "isotopic-fingerprint",
      title: "The Isotopic Fingerprint",
      short_summary:
        "Carbon isotope ratios in atmospheric CO₂ prove fossil fuel origin.",
      image_url:
        "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "CO₂ levels have fluctuated naturally throughout Earth's history. The current rise could be from ocean outgassing, volcanic activity, or other natural carbon cycle variations. Correlation with industrialization doesn't prove causation.",
      proponent_rebuttal:
        "Fossil fuels have a distinct isotopic signature—they're depleted in ¹³C because plants preferentially absorb lighter ¹²C. Since 1850, atmospheric δ¹³C has dropped precisely as predicted if fossil carbon is the source. This isn't correlation—it's a chemical fingerprint. Additionally, oxygen levels are dropping at the exact ratio expected from combustion (O₂ consumed per CO₂ produced), and ocean pH is declining as CO₂ dissolves. Three independent chemical signatures all point to burning fossil fuels.",
      crux: {
        id: "suess-effect",
        title: "The Suess Effect Measurement",
        description:
          "Measure the decline in atmospheric δ¹³C ratio over time to confirm fossil fuel origin.",
        methodology:
          "Extract CO₂ from ice cores (pre-industrial baseline). Compare to modern atmospheric samples. Calculate δ¹³C shift and match to fossil fuel burning rate.",
        equation:
          "\\delta^{13}C = \\left(\\frac{(^{13}C/^{12}C)_{sample}}{(^{13}C/^{12}C)_{standard}} - 1\\right) \\times 1000\\text{‰}",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (ice core analysis + mass spectrometry)",
      },
      evidence: [
        {
          id: "isotope-measurements",
          title: "δ¹³C Decline Matches Fossil Fuel Signature",
          description:
            "Atmospheric δ¹³C has declined from -6.5‰ to -8.5‰ since 1850, exactly as predicted from fossil fuel combustion.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 10,
          },
          source: "NOAA, Scripps CO2 Program",
          reasoning:
            "Chemical fingerprint measured by dozens of independent labs worldwide.",
        },
        {
          id: "oxygen-decline",
          title: "Atmospheric O₂ Declining at Combustion Ratio",
          description:
            "Oxygen levels dropping at exactly the ratio expected from burning fossil fuels (1 O₂ consumed per CO₂ produced).",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "Scripps O2 Program",
          reasoning: "Independent chemical evidence confirming combustion source.",
        },
        {
          id: "ocean-acidification",
          title: "Ocean pH Declining (Acidification)",
          description:
            "Ocean pH has dropped 0.1 units since pre-industrial times as CO₂ dissolves, creating carbonic acid.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          reasoning: "Measured by thousands of ocean monitoring stations.",
        },
        {
          id: "natural-co2-claim",
          title: "CO₂ Could Be From Natural Sources",
          description: "Volcanic activity and ocean outgassing could explain CO₂ rise.",
          side: "against" as const,
          weight: {
            sourceReliability: 2,
            independence: 4,
            replicability: 2,
            directness: 3,
          },
          reasoning:
            "Contradicted by isotopic evidence; volcanoes emit ~0.3 Gt CO₂/year vs 36 Gt from humans.",
        },
      ],
    },
    {
      id: "temperature-attribution",
      title: "The Temperature Attribution",
      short_summary:
        "Observed warming patterns match greenhouse gas predictions, not natural cycles.",
      image_url:
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Climate models are unreliable—they failed to predict the 'hiatus' of 1998-2014 and consistently run hotter than observations. The warming could be natural variability we don't fully understand. Medieval Warm Period and Roman Climate Optimum show temperatures can shift without human influence.",
      proponent_rebuttal:
        "Climate models successfully hindcast the entire 20th century temperature record, including the mid-century cooling from aerosols. The 'hiatus' was within model uncertainty bounds and is now understood as Pacific Decadal Oscillation masking. Crucially, models predict specific 'fingerprints': stratospheric cooling while troposphere warms (greenhouse signature), nights warming faster than days, and polar amplification. All three fingerprints are observed. Natural forcing alone produces a flat or cooling trend for 1950-present—only adding anthropogenic forcing matches reality.",
      crux: {
        id: "fingerprint-detection",
        title: "The Fingerprint Detection Test",
        description:
          "Detect greenhouse-specific warming patterns vs solar/volcanic patterns.",
        methodology:
          "Run climate models with natural forcing only (solar + volcanic). Run models with anthropogenic forcing only (GHG + aerosols). Run combined forcing. Statistical detection of which pattern matches observed record.",
        equation:
          "y(t) = \\beta_1 X_{natural}(t) + \\beta_2 X_{anthropogenic}(t) + \\varepsilon(t)",
        verification_status: "verified" as const,
        cost_to_verify: "$500K (supercomputer time + multi-model ensemble)",
      },
      evidence: [
        {
          id: "stratospheric-cooling",
          title: "Stratosphere Cooling While Surface Warms",
          description:
            "Stratospheric temperatures have declined while surface warms—unique signature of greenhouse effect, not solar warming.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 10,
          },
          source: "NASA, NOAA satellite data",
          reasoning: "Solar warming would heat all layers; greenhouse traps heat below.",
        },
        {
          id: "nights-faster",
          title: "Nights Warming Faster Than Days",
          description:
            "Minimum temperatures rising faster than maximum—consistent with greenhouse blanket effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          reasoning: "Pattern predicted by greenhouse theory, not solar.",
        },
        {
          id: "polar-amplification",
          title: "Arctic Warming 2-3x Faster Than Global Average",
          description:
            "Polar amplification matches model predictions for greenhouse-driven warming.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          reasoning: "Ice-albedo feedback predicted and observed.",
        },
        {
          id: "model-uncertainty",
          title: "Climate Models Have Uncertainty Ranges",
          description:
            "Models show spread in predictions, and some have run warmer than observations.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          reasoning: "Valid but observations fall within model uncertainty bounds.",
        },
      ],
    },
    {
      id: "natural-factors-elimination",
      title: "The Natural Factors Elimination",
      short_summary:
        "Solar activity, volcanic cycles, and orbital variations cannot explain the observed warming trend.",
      image_url:
        "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The Sun drives Earth's climate—small changes in solar output could have outsized effects through cosmic ray modulation or UV-ozone interactions. We've only been measuring solar irradiance directly since 1978. Historical correlations between solar cycles and climate are well-documented. Perhaps we're underestimating natural variability.",
      proponent_rebuttal:
        "Solar irradiance has been flat or slightly declining since 1980 while temperatures accelerated upward—the correlation broke. Cosmic ray flux shows no trend matching temperature. Volcanic eruptions cause temporary cooling (Pinatubo 1991 clearly visible), confirming models work, but there's no volcanic trend to explain warming. Orbital (Milankovitch) cycles operate on 10,000+ year timescales and currently favor slight cooling. When you sum all natural factors, you get near-zero forcing since 1950. The energy imbalance (0.5-1 W/m²) measured by satellites requires an additional forcing—greenhouse gases are the only candidate that fits.",
      crux: {
        id: "energy-budget-closure",
        title: "The Energy Budget Closure Test",
        description:
          "Account for all energy inputs and outputs to identify the forcing source.",
        methodology:
          "Measure incoming solar radiation (satellites). Measure outgoing longwave radiation (satellites). Calculate ocean heat uptake (Argo floats). Sum all known natural forcings. Identify residual requiring anthropogenic explanation.",
        equation: "\\Delta Q = F - \\lambda \\Delta T",
        verification_status: "verified" as const,
        cost_to_verify: "$2M (satellite data + Argo network analysis)",
      },
      evidence: [
        {
          id: "solar-flat",
          title: "Solar Irradiance Flat Since 1980",
          description:
            "Total solar irradiance has shown no upward trend since satellite measurements began, while temperatures rose sharply.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 9,
          },
          source: "PMOD, ACRIM satellite composites",
          reasoning: "Direct measurement rules out solar driver.",
        },
        {
          id: "pinatubo-test",
          title: "Pinatubo Eruption Validates Models",
          description:
            "Climate models accurately predicted the temporary cooling from the 1991 Mt. Pinatubo eruption.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          reasoning:
            "Natural experiment validated model response to volcanic forcing.",
        },
        {
          id: "energy-imbalance",
          title: "Earth's Energy Imbalance Measured",
          description:
            "Satellites measure Earth absorbing ~0.7 W/m² more than it radiates—energy is accumulating.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "CERES satellite data",
          reasoning: "Direct measurement of energy accumulation.",
        },
        {
          id: "solar-correlation-historical",
          title: "Historical Solar-Climate Correlations",
          description:
            "Past periods like the Maunder Minimum show solar-climate connections.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 4,
          },
          reasoning:
            "Historical correlations exist but don't explain post-1980 divergence.",
        },
      ],
    },
  ],
};

// ============================================================================
// Free Will Topic
// ============================================================================

const freeWillData = {
  id: "free-will",
  title: "Free Will",
  meta_claim:
    "Human beings possess genuine free will—the ability to have done otherwise in any given situation.",
  status: "contested" as const,
  category: "philosophy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Libet's Original Experiment (1983)",
      url: "https://en.wikipedia.org/wiki/Benjamin_Libet#Libet's_experiment",
    },
    {
      title: "Stanford Encyclopedia: Free Will",
      url: "https://plato.stanford.edu/entries/freewill/",
    },
    {
      title: "Sam Harris: Free Will (2012)",
      url: "https://www.samharris.org/books/free-will",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is our sense of agency an illusion?",
      content:
        "When we feel we 'choose' an action, is that feeling causally effective or merely a byproduct of unconscious neural processes?",
      imageUrl:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "The Illusion of Conscious Will (Wegner)",
          url: "https://en.wikipedia.org/wiki/The_Illusion_of_Conscious_Will",
        },
      ],
    },
    {
      id: "q2",
      title: "Does determinism undermine responsibility?",
      content:
        "If our choices are the inevitable result of prior causes, can we meaningfully hold people accountable for their actions?",
      imageUrl:
        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "What would 'genuine' choice require?",
      content:
        "For free will to be 'real,' what conditions must be met? Could any physical system satisfy those conditions?",
      imageUrl:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "neuroscience-evidence",
      title: "The Neuroscience Evidence",
      short_summary:
        'Brain activity precedes conscious awareness of decisions, suggesting choices are determined before we "decide."',
      image_url:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=60",
      icon_name: "Microscope" as const,
      skeptic_premise:
        'Libet\'s experiments show readiness potential begins 350-500ms before conscious intention. Our sense of "choosing" is a post-hoc narrative constructed by the brain.',
      proponent_rebuttal:
        'Libet\'s subjects could still veto the action in the final 150ms (the "free won\'t"). Readiness potential may represent preparation of options, not determination. Consciousness may be the arena where competing neural assemblies vie for action selection.',
      crux: {
        id: "veto-power",
        title: "The Veto Power Test",
        description:
          "If subjects can consistently abort actions after readiness potential but before motor execution, this preserves a meaningful role for conscious will.",
        methodology:
          "Replicate Libet with modern fMRI and more precise timing. Train subjects to veto at various stages. Map neural correlates of successful vetoes.",
        equation:
          "P(\\text{veto} | RP_{detected}) > 0 \\implies \\text{Free Won't Exists}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$200K (fMRI study with sufficient statistical power)",
      },
      evidence: [
        {
          id: "libet-experiments",
          title: "Libet's Readiness Potential",
          description:
            "Brain activity (readiness potential) begins 350-500ms before subjects report conscious decision to move.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Libet et al. (1983)",
          reasoning: "Replicated many times, though interpretation debated.",
        },
        {
          id: "soon-fmri",
          title: "Soon et al. fMRI Prediction",
          description:
            "Brain activity up to 10 seconds before conscious decision predicts the choice with ~60% accuracy.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Nature Neuroscience (2008)",
          reasoning: "Extends Libet findings but 60% accuracy is modest.",
        },
        {
          id: "veto-evidence",
          title: "Subjects Can Veto Actions",
          description:
            "Libet found subjects could consciously abort movements after readiness potential began.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          reasoning:
            'Preserves role for conscious "free won\'t" if not "free will."',
        },
        {
          id: "schurger-reinterpretation",
          title: "Readiness Potential as Neural Noise",
          description:
            "Schurger et al. (2012) argue readiness potential reflects random neural fluctuations, not predetermined decisions.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "PNAS (2012)",
          reasoning: "Alternative interpretation of the same data.",
        },
      ],
    },
    {
      id: "causal-determinism",
      title: "Causal Determinism",
      short_summary:
        "If every event is caused by prior events according to natural laws, then our choices are the inevitable result of initial conditions.",
      image_url:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=60",
      icon_name: "Target" as const,
      skeptic_premise:
        "The universe is governed by deterministic physical laws (or probabilistic quantum laws). Every neuron firing was determined by the Big Bang. There is no room for libertarian free will.",
      proponent_rebuttal:
        'Determinism does not preclude free will—it may enable it. Compatibilists argue that "free" means acting from your own desires and reasoning, not from external coercion. Quantum indeterminacy may provide genuine openness at the neural level.',
      crux: {
        id: "quantum-mind",
        title: "The Quantum Mind Hypothesis",
        description:
          "If quantum effects play a functional role in neural decision-making (Penrose-Hameroff microtubules), true randomness could break causal determination.",
        methodology:
          "Test for quantum coherence in neural microtubules at biologically relevant temperatures. Measure whether decoherence times exceed neural firing intervals.",
        equation:
          "\\tau_{decoherence} > \\tau_{neural} \\implies \\text{Quantum Effects Possible}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Quantum biology lab experiments)",
      },
      evidence: [
        {
          id: "physical-closure",
          title: "Causal Closure of Physics",
          description:
            "Every physical event has a sufficient physical cause. There's no room for non-physical mental causation.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          reasoning: "Strong argument from philosophy of physics.",
        },
        {
          id: "laplace-demon",
          title: "Laplacian Determinism",
          description:
            "Given complete knowledge of the universe's state, all future states are predictable in principle.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          reasoning:
            "Classical determinism, though quantum mechanics complicates this.",
        },
        {
          id: "compatibilism",
          title: "Compatibilist Free Will",
          description:
            "Most professional philosophers accept compatibilism: free will is compatible with determinism.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "PhilPapers Survey",
          reasoning: "Expert consensus, though appeals to redefinition.",
        },
        {
          id: "quantum-indeterminacy",
          title: "Quantum Mechanics Is Indeterministic",
          description:
            "Fundamental physics includes genuine randomness, breaking strict determinism.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          reasoning: "Established physics, but randomness ≠ free will.",
        },
      ],
    },
    {
      id: "moral-responsibility",
      title: "Moral Responsibility",
      short_summary:
        "Our entire system of praise, blame, and justice presupposes that people could have chosen otherwise.",
      image_url:
        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "If criminals could not have done otherwise given their genes, upbringing, and circumstances, retributive punishment is unjust. We should focus only on rehabilitation and deterrence.",
      proponent_rebuttal:
        'Even if determinism is true, holding people responsible has pragmatic value—it shapes future behavior through social feedback. The concept of "could have done otherwise" can be reinterpreted as "would have done otherwise if they had different reasons."',
      crux: {
        id: "manipulation-argument",
        title: "The Manipulation Argument",
        description:
          "Thought experiments: If a scientist could control your neural states to guarantee an action, you would not be responsible. But how is this different from nature doing the same through genes and environment?",
        methodology:
          "Survey moral intuitions across cultures about manipulated vs. natural agents. Test whether people distinguish between determination by external manipulation vs. internal character.",
        equation:
          "R(\\text{manipulated}) \\neq R(\\text{natural}) \\implies \\text{Source Matters}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$50K (Cross-cultural experimental philosophy studies)",
      },
      evidence: [
        {
          id: "universal-responsibility",
          title: "All Cultures Have Moral Responsibility",
          description:
            "Every known human culture has concepts of praise, blame, and moral responsibility.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          reasoning:
            "Universal human intuition, though could be pragmatic rather than metaphysical.",
        },
        {
          id: "responsibility-beliefs-matter",
          title: "Belief in Free Will Affects Behavior",
          description:
            "Studies show people who are told free will is an illusion cheat more and behave less prosocially.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 4,
          },
          source: "Vohs & Schooler (2008)",
          reasoning: "Pragmatic argument for maintaining belief.",
        },
        {
          id: "brain-damage-cases",
          title: "Brain Damage Changes Moral Behavior",
          description:
            "Phineas Gage and similar cases show physical brain changes alter personality and moral behavior.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          reasoning: "Demonstrates physical basis of moral character.",
        },
        {
          id: "genetics-of-behavior",
          title: "Behavioral Genetics",
          description:
            "Twin studies show 40-60% heritability for many personality traits and behavioral tendencies.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          reasoning:
            "Genes significantly influence behavior we hold people responsible for.",
        },
      ],
    },
  ],
};

// ============================================================================
// Remaining Topics (without embedded questions for now)
// ============================================================================

const minneapolisShootingData = {
  id: "minneapolis-shooting",
  title: "Minneapolis ICE Shooting",
  meta_claim:
    "Federal agents acted with excessive force in the fatal shooting of Alex Pretti in Minneapolis on January 24, 2026.",
  status: "contested" as const,
  category: "philosophy" as const,
  pillars: [
    {
      id: "conflicting-accounts",
      title: "Conflicting Official Accounts",
      short_summary:
        "Video evidence contradicts the federal government's description of events.",
      image_url:
        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=60",
      icon_name: "FileText" as const,
      skeptic_premise:
        'DHS Secretary Noem stated Pretti arrived "to inflict maximum damage" and called his actions "domestic terrorism." Border Patrol Commander Bovino blamed protesters for "vilifying" agents and creating a "preventable tragedy."',
      proponent_rebuttal:
        "Multiple independent videos and eyewitness accounts contradict the administration's description of events. Pretti was an ICU nurse at a VA hospital who was licensed to carry a concealed weapon. The DOJ and Minnesota BCA are conducting investigations.",
      crux: {
        id: "body-cam-review",
        title: "The Body Camera Analysis",
        description:
          "Complete body-worn camera footage from federal agents would definitively show the sequence of events and whether force was justified.",
        methodology:
          "Release and analyze complete unedited body camera footage from all agents present. Cross-reference with civilian video timestamps and witness statements.",
        equation:
          "P(\\text{excessive force}) = f(\\text{threat level}, \\text{response proportionality}, \\text{de-escalation attempts})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Footage exists but access blocked)",
      },
      evidence: [
        {
          id: "video-contradiction",
          title: "Multiple Videos Contradict Official Account",
          description:
            "Independent video recordings from bystanders show a different sequence of events than described by federal officials.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "NPR",
          sourceUrl:
            "https://www.npr.org/2026/01/25/nx-s1-5687875/minneapolis-shooting-minnesota-ice-alex-pretti-dhs-investigation",
          reasoning:
            "Multiple independent sources captured footage; can be cross-referenced",
        },
        {
          id: "licensed-carrier",
          title: "Pretti Was Licensed to Carry",
          description:
            "Minneapolis police chief confirmed Pretti was licensed to carry a concealed weapon, contradicting implications of illegal activity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 7,
          },
          reasoning:
            "Official police statement is verifiable through licensing records",
        },
        {
          id: "bca-blocked",
          title: "State Investigators Blocked from Scene",
          description:
            "Minnesota Bureau of Criminal Apprehension reported that Homeland Security officials blocked bureau agents from accessing the shooting site.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          reasoning:
            "Blocking independent investigation suggests concern about findings",
        },
        {
          id: "dhs-position",
          title: "DHS Claims Self-Defense",
          description:
            "Federal officials maintain agents acted in self-defense against an armed individual approaching them.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 2,
            replicability: 3,
            directness: 7,
          },
          reasoning:
            "Party to the incident; low independence score due to conflict of interest",
        },
      ],
    },
    {
      id: "pattern-of-force",
      title: "Pattern of Federal Force",
      short_summary:
        "This is the second U.S. citizen killed by federal agents in Minnesota in January 2026.",
      image_url:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "These are isolated incidents. Federal agents operate in dangerous situations and are authorized to use lethal force when threatened. Increased immigration enforcement naturally leads to more confrontations.",
      proponent_rebuttal:
        'Two fatal shootings of U.S. citizens in three weeks in one state suggests systemic issues with training, rules of engagement, or supervision. Governor Walz called the agents "untrained." Over 100 House members have co-sponsored an impeachment resolution against Secretary Noem.',
      crux: {
        id: "training-standards",
        title: "Training and Rules of Engagement Audit",
        description:
          "Independent review of CBP/ICE training standards and rules of engagement compared to local police departments.",
        methodology:
          "Compare use-of-force training hours, de-escalation requirements, and accountability mechanisms between federal immigration enforcement and accredited police departments.",
        equation:
          "R_{force} = \\frac{\\text{incidents}_{fatal}}{\\text{encounters}_{total}} \\times 10^6",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Independent audit)",
      },
    },
  ],
};

const labLeakTheoryData = {
  id: "lab-leak-theory",
  title: "COVID-19 Lab Leak Origin",
  meta_claim:
    "SARS-CoV-2 originated from a laboratory leak at the Wuhan Institute of Virology rather than natural zoonotic spillover.",
  status: "contested" as const,
  category: "philosophy" as const,
  pillars: [
    {
      id: "geographic-coincidence",
      title: "Geographic Coincidence",
      short_summary:
        "The pandemic began in Wuhan, home to the world's leading coronavirus research laboratory.",
      image_url:
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=60",
      icon_name: "Target" as const,
      skeptic_premise:
        "Wuhan is a major city of 11 million. Wet markets with wildlife are common throughout China. The first SARS emerged in Guangdong, not near any lab. Geographic proximity proves nothing.",
      proponent_rebuttal:
        "The WIV was conducting gain-of-function research on bat coronaviruses. No intermediate host has been found despite intensive searching. The closest known relative (RaTG13) was collected by WIV researchers. The probability of a natural spillover occurring precisely where the world's top coronavirus lab is located warrants investigation.",
      crux: {
        id: "wiv-database",
        title: "The WIV Database Analysis",
        description:
          "The Wuhan Institute of Virology took its viral database offline in September 2019. Access to this database would reveal what viruses they possessed.",
        methodology:
          "Independent international audit of WIV viral samples, research records, and the September 2019 database. Compare to published sequences.",
        equation:
          "P(\\text{lab origin} | \\text{database match}) >> P(\\text{lab origin} | \\text{no match})",
        verification_status: "impossible" as const,
        cost_to_verify: "Requires Chinese government cooperation",
      },
    },
    {
      id: "furin-cleavage",
      title: "The Furin Cleavage Site",
      short_summary:
        "SARS-CoV-2 has a unique furin cleavage site not found in related coronaviruses.",
      image_url:
        "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=800&q=60",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Furin cleavage sites exist in other coronaviruses (MERS, HKU1). Evolution can insert such sites through recombination. The site's codon usage is unusual but not impossible naturally.",
      proponent_rebuttal:
        "No other sarbecovirus (SARS-like bat coronavirus) has a furin cleavage site. The CGG-CGG codon pair encoding arginine is extremely rare in coronaviruses but common in laboratory work. This is exactly the type of modification discussed in published gain-of-function proposals.",
      crux: {
        id: "codon-analysis",
        title: "Comparative Codon Analysis",
        description:
          "Statistical analysis of codon usage at the furin cleavage site compared to natural coronavirus evolution patterns.",
        methodology:
          "Analyze codon frequencies in all known sarbecoviruses. Calculate probability of CGG-CGG pair arising naturally vs. through laboratory insertion.",
        equation: "P(\\text{natural}) = \\prod_{i} P(\\text{codon}_i | \\text{context})",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (Bioinformatics analysis)",
      },
    },
  ],
};

const universalBasicIncomeData = {
  id: "universal-basic-income",
  title: "Universal Basic Income",
  meta_claim:
    "Universal Basic Income (UBI) would be economically beneficial and should be implemented in developed nations.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "automation-displacement",
      title: "Automation and Job Displacement",
      short_summary:
        "AI and automation are eliminating jobs faster than the economy can create new ones.",
      image_url:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Technology has always displaced jobs while creating new ones. The Luddite fallacy has been wrong for 200 years. Current unemployment remains low despite decades of automation predictions.",
      proponent_rebuttal:
        "AI is qualitatively different - it can perform cognitive tasks previously thought uniquely human. Self-driving vehicles alone could displace 3.5 million US truck drivers. Even if new jobs emerge, the transition period requires support, and not everyone can retrain for technical roles.",
      crux: {
        id: "employment-projections",
        title: "Net Employment Impact Analysis",
        description:
          "Comprehensive modeling of job destruction vs. job creation from AI/automation through 2040.",
        methodology:
          "Track task automation potential across all occupations. Model adoption curves, new job categories, and net employment effects by skill level.",
        equation:
          "\\Delta E = \\sum_{i} (J_{created,i} - J_{displaced,i}) \\cdot P(\\text{adoption}_i)",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Longitudinal economic study)",
      },
    },
    {
      id: "fiscal-feasibility",
      title: "Fiscal Feasibility",
      short_summary: "Can governments afford to provide meaningful UBI payments?",
      image_url:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A $1,000/month UBI for all US adults would cost $3.1 trillion annually - more than the entire federal discretionary budget. This would require massive tax increases or unsustainable deficits.",
      proponent_rebuttal:
        "UBI could replace existing welfare programs, reducing administrative costs. A negative income tax design phases out benefits gradually. Alaska's Permanent Fund Dividend has operated for 40+ years. Multiple pilot programs show economic stimulus effects that partially offset costs.",
      crux: {
        id: "pilot-program-results",
        title: "Randomized Controlled Trial Results",
        description:
          "Large-scale, long-term RCT measuring employment, health, and economic outcomes.",
        methodology:
          "Multi-year RCT with treatment and control groups. Measure labor force participation, health outcomes, entrepreneurship rates, and local economic multiplier effects.",
        equation:
          "\\text{ROI} = \\frac{\\Delta\\text{GDP} + \\Delta\\text{Health Savings} + \\Delta\\text{Crime Reduction}}{\\text{Program Cost}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$50M (Large-scale RCT)",
      },
    },
  ],
};

const socialMediaMentalHealthData = {
  id: "social-media-mental-health",
  title: "Social Media and Teen Mental Health",
  meta_claim:
    "Social media use is a primary cause of the teen mental health crisis that began around 2012.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "temporal-correlation",
      title: "The Temporal Correlation",
      short_summary:
        "Teen depression and anxiety rates spiked precisely when smartphone adoption became universal.",
      image_url:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Correlation is not causation. Many other factors changed around 2012: economic recovery from recession, increased academic pressure, climate anxiety, political polarization. Self-reported mental health may reflect changing attitudes toward disclosure.",
      proponent_rebuttal:
        "The timing is remarkably precise across multiple countries that adopted smartphones at different rates. The effect is concentrated in girls and heavy users. Internal Facebook research (leaked) showed Instagram specifically made body image issues worse for teenage girls.",
      crux: {
        id: "dose-response",
        title: "Dose-Response Relationship",
        description:
          "If social media causes harm, we should see linear or threshold effects correlating usage hours with mental health outcomes.",
        methodology:
          "Longitudinal study tracking social media usage (passive measurement, not self-report) against validated mental health assessments. Control for confounders.",
        equation:
          "MH_{score} = \\beta_0 + \\beta_1 \\cdot \\text{hours} + \\beta_2 \\cdot \\text{hours}^2 + \\epsilon",
        verification_status: "verified" as const,
        cost_to_verify: "$5M (Longitudinal study with passive measurement)",
      },
    },
    {
      id: "mechanism-identification",
      title: "Causal Mechanisms",
      short_summary:
        "Specific features of social media platforms are designed to exploit psychological vulnerabilities.",
      image_url:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Blaming technology is a moral panic repeated throughout history (TV, video games, rock music). Teens have always faced social pressures. Social media also provides benefits: community, information, creative expression.",
      proponent_rebuttal:
        "Unlike previous technologies, social media uses AI-optimized engagement algorithms, infinite scroll, variable reward schedules (like slot machines), and social comparison metrics (likes, followers). Internal documents show platforms knew about harms and optimized for engagement anyway.",
      crux: {
        id: "algorithm-experiment",
        title: "The Algorithm Experiment",
        description:
          "Randomized trial comparing engagement-optimized feeds vs. chronological/curated feeds on mental health outcomes.",
        methodology:
          "Partner with platforms or use browser extensions to randomly assign teens to different feed algorithms. Measure anxiety, depression, sleep, and self-esteem over 6 months.",
        equation:
          "\\Delta MH = f(\\text{algorithm type}, \\text{baseline MH}, \\text{usage hours})",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10M (Requires platform cooperation or technical workaround)",
      },
    },
  ],
};

const cryptocurrencyValueData = {
  id: "cryptocurrency-value",
  title: "Cryptocurrency as Store of Value",
  meta_claim:
    "Bitcoin and major cryptocurrencies represent a legitimate long-term store of value comparable to gold or real estate.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "scarcity-mechanism",
      title: "Digital Scarcity",
      short_summary:
        "Bitcoin's fixed supply of 21 million coins creates genuine scarcity in a digital asset for the first time.",
      image_url:
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=60",
      icon_name: "Target" as const,
      skeptic_premise:
        "Scarcity alone doesn't create value - there are infinite unique things that are worthless. Bitcoin can be forked infinitely, and thousands of cryptocurrencies exist. The code could theoretically be changed by consensus.",
      proponent_rebuttal:
        "Network effects create moats. Bitcoin has the strongest network (hashrate, liquidity, recognition). Changing the 21M limit would fork the chain and destroy the property that gives it value. Gold's supply isn't truly fixed either (asteroid mining, new deposits).",
      crux: {
        id: "lindy-effect",
        title: "The Lindy Effect Test",
        description:
          "If Bitcoin survives another 15 years without fundamental protocol failure, its expected remaining lifespan increases proportionally.",
        methodology:
          "Track: major protocol bugs, 51% attacks, quantum computing threats, regulatory bans. Each year of survival without existential threat increases confidence.",
        equation: "E[\\text{lifespan}_{future}] \\propto \\text{age}_{current}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Time will tell)",
      },
    },
    {
      id: "volatility-problem",
      title: "The Volatility Problem",
      short_summary:
        "Bitcoin's extreme price volatility undermines its use as a store of value.",
      image_url:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      icon_name: "Zap" as const,
      skeptic_premise:
        '80% drawdowns are incompatible with "store of value." Gold varies 20-30% per year; Bitcoin varies 50-80%. Institutional investors require lower volatility. It\'s speculation, not storage.',
      proponent_rebuttal:
        "Volatility decreases as market cap grows - early gold markets were also volatile. On any 4-year holding period, Bitcoin has outperformed all other assets. Volatility is the price of adoption; it will stabilize as the market matures.",
      crux: {
        id: "volatility-trajectory",
        title: "Volatility Trend Analysis",
        description:
          "Track whether Bitcoin's volatility is decreasing over time as the market matures.",
        methodology:
          "Calculate rolling 1-year volatility since 2011. Fit trend line. Compare to gold's historical volatility trajectory after price discovery.",
        equation: "\\sigma_{annual} = f(\\text{market cap}, \\text{adoption rate}, t)",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (Historical data analysis)",
      },
    },
  ],
};

const gunControlEffectivenessData = {
  id: "gun-control-effectiveness",
  title: "Gun Control Effectiveness",
  meta_claim:
    "Stricter gun control laws significantly reduce gun violence and mass shootings.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "international-comparison",
      title: "International Comparisons",
      short_summary:
        "Countries with stricter gun laws have dramatically lower rates of gun deaths.",
      image_url:
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        'Comparing the US to other countries ignores unique factors: 400M existing guns, constitutional protections, cultural differences, gang violence concentrated in specific areas. Switzerland has high gun ownership with low violence. Criminals don\'t follow laws.',
      proponent_rebuttal:
        "Australia's 1996 gun buyback saw mass shootings drop to near zero. Japan, UK, and most of Europe have strict laws and far fewer gun deaths per capita. The \"criminals don't follow laws\" argument applies to all laws; we don't abandon murder laws because murderers break them.",
      crux: {
        id: "natural-experiment",
        title: "Policy Change Natural Experiments",
        description:
          "Study jurisdictions before and after significant gun law changes to measure causal impact.",
        methodology:
          "Compare gun death rates before/after policy changes (Australia 1996, Connecticut 1995, Missouri 2007 repeal) using synthetic control methods.",
        equation: "\\Delta_{violence} = \\beta \\cdot \\Delta_{policy} + \\epsilon",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Econometric analysis of existing data)",
      },
      evidence: [
        {
          id: "australia-buyback",
          title: "Australia's Gun Buyback Success",
          description:
            "After the 1996 buyback of 650,000 firearms, Australia has had zero mass shootings (vs. 13 in prior 18 years) and gun homicides dropped 42%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "JAMA (2016)",
          reasoning: "Natural experiment with clear before/after comparison.",
        },
        {
          id: "international-rates",
          title: "US Gun Death Rate 25x Higher Than Peers",
          description:
            "The US has 12.21 gun deaths per 100K vs. 0.5 in UK, 0.04 in Japan.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "IHME, CDC",
          reasoning: "Clear correlation but causation debated.",
        },
        {
          id: "existing-guns",
          title: "400 Million Guns Already in Circulation",
          description:
            "The US has more guns than people. New laws can't address existing stockpile.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          reasoning: "Practical implementation challenge.",
        },
        {
          id: "defensive-gun-use",
          title: "Defensive Gun Uses Save Lives",
          description:
            "CDC estimates 500K-3M defensive gun uses annually in the US.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          reasoning: "Highly contested estimates with methodological issues.",
        },
      ],
    },
    {
      id: "mass-shooting-prevention",
      title: "Mass Shooting Prevention",
      short_summary: "Can specific policies prevent mass shootings?",
      image_url:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Mass shootings are rare events driven by mental health crises, not gun availability. Determined attackers will find weapons or use other methods (vehicles, bombs). Most mass shooters pass background checks.",
      proponent_rebuttal:
        "Red flag laws, waiting periods, and assault weapon restrictions can prevent impulsive violence. The lethality of attacks depends heavily on weapon type—semi-automatic rifles with high-capacity magazines enable far more casualties than other weapons.",
      crux: {
        id: "assault-weapon-lethality",
        title: "Weapon Type and Casualty Analysis",
        description:
          "Do mass shootings with assault-style weapons result in more casualties than those with other firearms?",
        methodology:
          "Analyze all US mass shootings (4+ victims) by weapon type. Compare average casualties, adjusting for location and response time.",
        equation:
          "E[\\text{casualties} | \\text{AR-style}] vs E[\\text{casualties} | \\text{handgun}]",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (Database analysis)",
      },
      evidence: [
        {
          id: "assault-weapon-casualties",
          title: "Assault Weapons Cause 2x Casualties",
          description:
            "Mass shootings with assault-style rifles average 8.2 deaths vs. 4.4 with other weapons.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Everytown Research",
          reasoning: "Clear statistical pattern, though advocacy source.",
        },
        {
          id: "red-flag-laws",
          title: "Red Flag Laws Reduce Suicides",
          description:
            "States with Extreme Risk Protection Orders show 5-14% reduction in firearm suicides.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Annals of Internal Medicine",
          reasoning: "Suicides are clearer to study than rare mass shootings.",
        },
        {
          id: "background-check-pass",
          title: "Most Mass Shooters Pass Background Checks",
          description:
            "77% of mass shooters obtained weapons legally or would have passed checks.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          reasoning: "Limits effectiveness of background check expansion.",
        },
        {
          id: "substitute-methods",
          title: "Attackers May Substitute Methods",
          description:
            "Without guns, determined attackers could use vehicles, bombs, or other weapons.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          reasoning:
            "Theoretical concern; evidence suggests guns enable higher casualties.",
        },
      ],
    },
  ],
};

const nuclearEnergySafetyData = {
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

const wealthTaxData = {
  id: "wealth-tax",
  title: "Wealth Tax on Billionaires",
  meta_claim:
    "An annual wealth tax on billionaires would be effective, economically sound, and reduce inequality.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "revenue-potential",
      title: "Revenue Potential",
      short_summary:
        "A 2% wealth tax on billionaires could raise $400B+ annually in the US alone.",
      image_url:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "European countries tried wealth taxes and most repealed them due to capital flight, high administrative costs, and low revenue. Wealthy individuals can relocate, restructure assets, or lobby for exemptions. France's wealth tax raised only 0.2% of GDP.",
      proponent_rebuttal:
        "US citizenship-based taxation makes emigration costly (exit tax). A well-designed tax with strong enforcement (IRS funding), international cooperation, and limited exemptions could work. US billionaire wealth grew $2T during COVID alone; a small percentage is feasible.",
      crux: {
        id: "european-experience",
        title: "European Wealth Tax Analysis",
        description:
          "Why did most European wealth taxes fail, and can the US avoid those pitfalls?",
        methodology:
          "Compare design features of failed (France, Sweden) vs. surviving (Switzerland, Norway) wealth taxes. Identify key failure modes: capital flight, valuation challenges, political erosion.",
        equation:
          "R_{actual} = R_{theoretical} \\times (1 - \\text{avoidance rate}) - \\text{admin costs}",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Comparative policy analysis)",
      },
      evidence: [
        {
          id: "us-billionaire-growth",
          title: "US Billionaire Wealth Grew $2T in COVID",
          description:
            "During 2020-2021, US billionaire wealth increased from $3T to $5T while millions lost jobs.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "Forbes, Americans for Tax Fairness",
          reasoning: "Demonstrates concentrated wealth available for taxation.",
        },
        {
          id: "effective-tax-rates",
          title: "Billionaires Pay Lower Effective Rates",
          description:
            "ProPublica leak showed many billionaires pay lower effective tax rates than middle-class workers.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "ProPublica (2021)",
          reasoning: "Direct evidence of current system's gaps.",
        },
        {
          id: "european-repeal",
          title: "Most European Countries Repealed Wealth Taxes",
          description:
            "France, Sweden, Germany, Austria, and others repealed wealth taxes due to capital flight and low yield.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          reasoning: "Historical evidence of implementation failures.",
        },
        {
          id: "valuation-problems",
          title: "Wealth Valuation Is Extremely Difficult",
          description:
            "Private companies, art, complex derivatives are hard to value annually without creating gaming opportunities.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          reasoning: "Major administrative challenge.",
        },
      ],
    },
    {
      id: "economic-effects",
      title: "Economic Effects",
      short_summary: "Would a wealth tax harm investment and economic growth?",
      image_url:
        "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Taxing wealth discourages investment and entrepreneurship. Billionaires' wealth is mostly productive capital (company equity), not cash. Forcing annual liquidation to pay taxes could harm companies and employees.",
      proponent_rebuttal:
        "Extreme wealth concentration harms growth by reducing consumer spending and increasing rent-seeking. A 2% tax is far below typical investment returns, so investment incentives remain. Billionaires don't create jobs—consumer demand does.",
      crux: {
        id: "investment-impact",
        title: "Investment Impact Analysis",
        description: "Does wealth taxation reduce productive investment?",
        methodology:
          "Study investment rates in countries with/without wealth taxes, controlling for other factors. Analyze billionaire behavior after wealth tax implementation.",
        equation:
          "\\frac{dI}{dW_{tax}} \\text{ (investment elasticity to wealth tax)}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Longitudinal economic study)",
      },
      evidence: [
        {
          id: "inequality-harms-growth",
          title: "Inequality Reduces Growth",
          description:
            "IMF research shows extreme inequality reduces GDP growth by lowering consumer demand and increasing instability.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "IMF Working Papers",
          reasoning: "Established economic research, indirect relevance.",
        },
        {
          id: "wealth-not-consumed",
          title: "Billionaire Wealth Isn't Consumed",
          description:
            "Marginal propensity to consume decreases with wealth; billionaire wealth sits in assets, not economic circulation.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          reasoning: "Standard economics, though investment is also valuable.",
        },
        {
          id: "capital-flight-risk",
          title: "Capital Flight Risk",
          description:
            "Wealthy individuals can move to tax-friendly jurisdictions, taking jobs and investment with them.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          reasoning: "Real concern, though US exit taxes mitigate.",
        },
        {
          id: "equity-illiquidity",
          title: "Most Billionaire Wealth Is Illiquid",
          description:
            "Forcing sale of company stock to pay taxes could destabilize companies and markets.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          reasoning: "Practical implementation concern.",
        },
      ],
    },
  ],
};

// ============================================================================
// AI Content Labeling Topic
// ============================================================================

const aiContentLabelingData = {
  id: "ai-content-labeling",
  title: "Mandatory AI Content Labeling",
  meta_claim:
    "AI-generated content should be required by law to carry visible labels or watermarks identifying it as AI-created.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "misinformation-prevention",
      title: "Misinformation Prevention",
      short_summary:
        "Labeling AI content helps the public distinguish real from synthetic media, reducing misinformation spread.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Labels are trivially removable through screenshots, re-encoding, or adversarial attacks on watermarks. Mandatory labeling creates a false sense of security — unlabeled content gets trusted more, while bad actors simply strip the labels.",
      proponent_rebuttal:
        "Even imperfect labeling shifts social norms and creates legal accountability frameworks. The EU AI Act and C2PA standard create infrastructure that makes provenance verifiable at scale. Just as food labeling doesn't prevent all fraud but massively reduces it, content labeling raises the cost of deception.",
      crux: {
        id: "watermark-robustness",
        title: "Watermark Robustness Under Adversarial Conditions",
        description:
          "Testing whether current AI watermarking techniques survive common transformations like screenshotting, compression, cropping, and deliberate adversarial removal attempts.",
        methodology:
          "Apply state-of-the-art watermarks (C2PA, Google SynthID, Meta Stable Signature) to 10,000 AI-generated images and text samples. Subject each to a battery of transformations. Measure detection rate post-transformation.",
        equation:
          "R_{robust} = \\frac{\\text{detected after transform}}{\\text{total watermarked}} \\times 100",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Large-scale adversarial testing study)",
      },
      evidence: [
        {
          id: "eu-ai-act-provisions",
          title: "EU AI Act Mandates Labeling for Deepfakes",
          description:
            "The EU AI Act (2024) requires that AI-generated or manipulated content (deepfakes) must be clearly labeled. Violations carry fines up to 3% of global revenue.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "European Parliament",
          sourceUrl: "https://artificialintelligenceact.eu",
          reasoning:
            "Major democratic body enacted this after extensive deliberation; sets global precedent.",
        },
        {
          id: "deepfake-detection-rates",
          title: "Human Deepfake Detection Rates Below 50%",
          description:
            "Studies show untrained humans detect AI-generated faces at rates near chance (48-52%). Labels would provide the information humans cannot perceive on their own.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "University of Washington (2023)",
          reasoning:
            "Demonstrates clear need since human perception alone is insufficient.",
        },
        {
          id: "platform-label-experiments",
          title: "Social Media Platform Labeling Experiments",
          description:
            "Meta and YouTube have experimented with AI content labels. Early data shows labeled content receives 10-15% less sharing, suggesting labels influence behavior.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "Meta Transparency Center",
          reasoning:
            "Platform self-reported data; independence concerns but directionally informative.",
        },
        {
          id: "watermark-removal-ease",
          title: "Watermarks Can Be Removed or Forged",
          description:
            "Research from University of Maryland demonstrated that visible and invisible watermarks can be removed with high success rates using freely available tools, and false watermarks can be added to real content.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "University of Maryland (2023)",
          reasoning:
            "Peer-reviewed demonstration that technical enforcement has fundamental limitations.",
        },
      ],
    },
    {
      id: "free-expression-impact",
      title: "Free Expression Impact",
      short_summary:
        "Mandatory labeling may burden legitimate creative, educational, and journalistic uses of AI tools.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Labeling requirements chill creative and educational use of AI tools. Artists using AI assistance, students using writing tools, and journalists using AI transcription would all face compliance burdens. Overly broad mandates could suppress beneficial innovation.",
      proponent_rebuttal:
        "Transparency about authorship is a reasonable baseline that protects informed consent without banning AI use. Disclosing that content is AI-generated is no more burdensome than disclosing paid partnerships or editorial corrections. The right to free expression doesn't include the right to deceive about the nature of content.",
      crux: {
        id: "chilling-effect-measurement",
        title: "Measuring Chilling Effects on Creative AI Use",
        description:
          "Quantifying whether labeling mandates reduce beneficial AI tool adoption in creative, educational, and journalistic contexts.",
        methodology:
          "Compare AI tool adoption rates and creative output in jurisdictions with labeling mandates (EU, China) vs. those without. Survey creators about compliance burden.",
        equation:
          "\\Delta_{adoption} = \\beta_{mandate} + \\beta_{sector} + \\epsilon",
        verification_status: "theoretical" as const,
        cost_to_verify: "$300K (Cross-jurisdictional comparative study)",
      },
      evidence: [
        {
          id: "first-amendment-analyses",
          title: "First Amendment Scholars Divided on Compelled Disclosure",
          description:
            "Legal scholars are split: some argue compelled labeling is unconstitutional compelled speech; others argue it's permissible commercial disclosure like nutrition labels.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source: "Harvard Law Review, Stanford CIS",
          reasoning:
            "Genuine constitutional uncertainty creates legal risk for mandates.",
        },
        {
          id: "china-labeling-law",
          title: "China's AI Labeling Law Shows Mixed Results",
          description:
            "China's 2023 regulations requiring AI content labeling have been inconsistently enforced. Domestic platforms comply partially, but enforcement gaps are wide and creative users report self-censoring to avoid scrutiny.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "DigiChina, Stanford",
          reasoning:
            "Real-world implementation data, though China's regulatory context differs significantly from democracies.",
        },
        {
          id: "creator-community-surveys",
          title: "Creator Community Surveys Show Support for Disclosure",
          description:
            "Surveys of digital artists and writers show 62-68% support labeling requirements when applied to commercial and public-facing content, though opposition rises for private or educational use.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Creative Commons, Authors Guild",
          reasoning:
            "Self-reported survey data; reveals nuanced support rather than blanket opposition.",
        },
        {
          id: "informed-consent-precedent",
          title: "Informed Consent Precedents in Other Domains",
          description:
            "Requirements to disclose paid promotions, ghostwriters, and stock photography have not chilled expression in advertising, publishing, or journalism.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "FTC Endorsement Guidelines",
          reasoning:
            "Analogous precedent, though AI content labeling is broader in scope.",
        },
      ],
    },
  ],
};

// ============================================================================
// Remote Work Permanence Topic
// ============================================================================

const remoteWorkPermanenceData = {
  id: "remote-work-permanence",
  title: "The Future of Remote Work",
  meta_claim:
    "Remote and hybrid work models will permanently replace traditional 5-day office work for knowledge workers.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "productivity-innovation",
      title: "Productivity & Innovation",
      short_summary:
        "Research on whether remote workers maintain or exceed office-based productivity and innovation output.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Remote work erodes spontaneous collaboration, mentorship, and innovation. Water cooler conversations, whiteboard sessions, and in-person brainstorming generate ideas that Zoom calls cannot replicate. Companies like Google, Apple, and JPMorgan have mandated return-to-office for these reasons.",
      proponent_rebuttal:
        "Stanford economist Nick Bloom's research consistently shows equal or higher individual productivity for remote workers. Microsoft's Work Trend Index found that async communication actually increases deep-focus work time. Innovation metrics like patents filed haven't declined at remote-first companies. Tooling (Figma, Miro, Slack huddles) keeps narrowing the collaboration gap.",
      crux: {
        id: "innovation-output-measurement",
        title: "Remote vs. In-Office Innovation Output",
        description:
          "Controlled comparison of innovation metrics (patents, new products, revenue from new initiatives) between matched remote and in-office teams.",
        methodology:
          "Compare innovation output at companies with different remote policies, controlling for industry, company size, and pre-pandemic innovation rates. Use patent filings, new product launches, and internal innovation metrics.",
        equation:
          "\\Delta I = I_{remote} - I_{office} \\pm \\text{confounders}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-year controlled study across firms)",
      },
      evidence: [
        {
          id: "bloom-stanford-study",
          title: "Stanford/Bloom Study: Remote Workers 13% More Productive",
          description:
            "Nick Bloom's landmark 2015 study at Ctrip (16,000 employees) found remote workers were 13% more productive, took fewer sick days, and reported higher satisfaction. His 2022 follow-up confirmed hybrid models show no productivity loss.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "Stanford University, Quarterly Journal of Economics",
          reasoning:
            "Gold-standard randomized experiment at scale, though limited to one company context and pre-dates the pandemic shift.",
        },
        {
          id: "microsoft-collaboration-data",
          title: "Microsoft Research Shows Communication Pattern Shifts",
          description:
            "Microsoft's analysis of 60,000+ employees found remote work increased async communication but reduced cross-team connections by 25%. Atlassian's data showed similar patterns but noted that structured 'intentional collaboration' rituals recovered most lost connections.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Microsoft Research, Nature Human Behaviour (2022)",
          reasoning:
            "Large-scale internal data showing real collaboration costs, published in top-tier journal.",
        },
        {
          id: "rto-mandate-outcomes",
          title: "Major Companies Mandating Return-to-Office",
          description:
            "Amazon, Google, Meta, JPMorgan, and Goldman Sachs have mandated 3-5 days in office, citing innovation and culture needs. These are some of the most data-driven companies in the world, and they've concluded remote work has costs.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Company Announcements, Wall Street Journal",
          reasoning:
            "Revealed preferences of major employers suggest remote work has real drawbacks they've measured internally.",
        },
        {
          id: "patent-innovation-data",
          title: "Patent Filing Rates Stable Despite Remote Shift",
          description:
            "USPTO data shows no decline in patent application rates during 2020-2024 despite massive shift to remote work. Remote-first companies like GitLab, Automattic, and Zapier maintain strong innovation output.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 3,
          },
          source: "USPTO, Company Annual Reports",
          reasoning:
            "Broad economic data; directness limited because many factors influence patent rates.",
        },
      ],
    },
    {
      id: "economic-social-dynamics",
      title: "Economic & Social Dynamics",
      short_summary:
        "The broader economic and social consequences of a permanent shift away from office-centric work.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Commercial real estate collapse, urban decay, and weakened company culture make full remote unsustainable. Downtown economies depend on office workers. Junior employees lose mentorship. Company loyalty and culture erode when people never meet in person.",
      proponent_rebuttal:
        "Geographic flexibility reduces housing costs, improves work-life balance, and expands talent pools to previously excluded geographies. Cities will adapt as they always have — converting offices to housing. Employee surveys consistently show remote/hybrid as the #1 desired benefit, more valued than salary increases.",
      crux: {
        id: "urban-economic-adaptation",
        title: "Urban Economic Adaptation Timeline",
        description:
          "Measuring how quickly urban economies can adapt to reduced office occupancy through conversion, rezoning, and new economic models.",
        methodology:
          "Track commercial-to-residential conversion rates, downtown foot traffic, and new business formation in major US cities. Model equilibrium point where CRE market stabilizes.",
        equation:
          "T_{adapt} = f(\\text{vacancy rate}, \\text{conversion cost}, \\text{zoning flexibility})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Multi-city longitudinal economic study)",
      },
      evidence: [
        {
          id: "cre-vacancy-data",
          title: "US Office Vacancy Rate Hits Record 20%",
          description:
            "Commercial real estate vacancy rates reached 20.1% in Q3 2024, the highest ever recorded. Moody's estimates $1.2T in CRE debt is at risk. This creates genuine economic disruption in downtown cores.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Moody's Analytics, CoStar Group",
          reasoning:
            "Hard economic data showing real costs of the remote transition; direct evidence of unsustainability concerns.",
        },
        {
          id: "gallup-employee-engagement",
          title: "Gallup: Hybrid Workers Report Highest Engagement",
          description:
            "Gallup's 2024 State of the Workplace report found hybrid workers (2-3 days in office) report the highest engagement scores, above both fully remote and fully in-office workers.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Gallup (2024)",
          reasoning:
            "Large-scale, independent survey; supports hybrid model specifically rather than fully remote.",
        },
        {
          id: "remote-job-listings",
          title: "Remote Job Listings Stabilized at 3x Pre-Pandemic Levels",
          description:
            "ZipRecruiter and Indeed data show remote job postings stabilized at roughly 15% of all listings (vs. 5% pre-pandemic), suggesting permanent structural shift even as some companies mandate return.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "ZipRecruiter, Indeed Hiring Lab",
          reasoning:
            "Market-based signal that remote work is a permanent feature, not a temporary anomaly.",
        },
        {
          id: "demographic-shift-data",
          title: "Remote Work Drives Geographic Redistribution",
          description:
            "Census and USPS data show accelerated migration from high-cost metros to mid-size cities. Boise, Austin, and Nashville grew 5-10% as remote workers relocated. This creates both opportunity (affordable housing) and tension (gentrification).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source: "US Census Bureau, USPS Change of Address Data",
          reasoning:
            "Solid demographic data; directness limited because migration has many drivers.",
        },
      ],
    },
  ],
};

// ============================================================================
// Standardized Testing Value Topic
// ============================================================================

const standardizedTestingValueData = {
  id: "standardized-testing-value",
  title: "Standardized Testing in Education",
  meta_claim:
    "Standardized tests (SAT, ACT, state assessments) are a valid and useful measure of student ability and should remain a core part of educational assessment.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "predictive-validity",
      title: "Predictive Validity",
      short_summary:
        "SAT scores correlate with family income at r = 0.42. Supporters call this a feature; critics call it a flaw.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Tests measure socioeconomic status more than ability; they perpetuate inequality. SAT score correlates with family income at r=0.42. Wealthy families can afford $10K+ test prep. Test-optional policies were adopted by 1,800+ schools because tests add noise, not signal.",
      proponent_rebuttal:
        "SAT/ACT remain the strongest single predictor of college GPA (r=0.53), stronger than high school GPA alone. Test-optional policies haven't improved socioeconomic diversity — they've actually reduced it at many schools by removing a tool that identified high-ability low-income students. The UC system's own research found SAT predicted success better than GPA across all demographic groups.",
      crux: {
        id: "test-optional-outcomes",
        title: "Test-Optional Policy Outcome Analysis",
        description:
          "Comparing academic outcomes and demographic diversity at schools before and after adopting test-optional admissions.",
        methodology:
          "Track graduation rates, GPAs, retention, and demographic composition at matched schools with and without test-optional policies. Control for simultaneous policy changes.",
        equation:
          "\\Delta_{diversity} = f(\\text{test-optional policy}, \\text{aid changes}, \\text{outreach})",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (Analysis of existing admissions data)",
      },
      evidence: [
        {
          id: "college-board-validity",
          title: "College Board: SAT Predicts College GPA at r=0.53",
          description:
            "College Board's validity studies across 200+ institutions show SAT scores predict first-year college GPA at r=0.53 when combined with high school GPA, significantly better than GPA alone (r=0.36).",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 8,
            directness: 9,
          },
          source: "College Board Research",
          reasoning:
            "Large sample size and consistent findings, but severe conflict of interest as College Board profits from the SAT.",
        },
        {
          id: "uc-system-analysis",
          title: "UC System Found SAT More Predictive Than GPA for All Groups",
          description:
            "The University of California's 2020 internal study found SAT scores were better predictors of college success than high school GPA across all racial and income groups. Despite this, the UC system dropped the SAT for political reasons.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "UC Academic Senate Study Group (2020)",
          reasoning:
            "Highly credible because the UC system dropped the SAT despite their own data supporting it.",
        },
        {
          id: "brookings-income-correlation",
          title: "Brookings: SAT Scores Strongly Correlate with Family Income",
          description:
            "Brookings Institution analysis shows a near-linear relationship between family income and average SAT scores. Students from families earning $200K+ score 400 points higher on average than those earning under $20K.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Brookings Institution",
          reasoning:
            "Highly credible, independent analysis showing clear socioeconomic bias in test scores.",
        },
        {
          id: "pisa-international-comparison",
          title: "PISA International Data Shows Tests Track National Investment",
          description:
            "International PISA comparisons show that countries with higher education spending and lower inequality (Finland, Canada) outperform regardless of testing intensity, suggesting tests measure inputs more than innate ability.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "OECD PISA Reports",
          reasoning:
            "Strong international data; directness limited because national-level comparisons obscure individual-level dynamics.",
        },
      ],
    },
    {
      id: "educational-accountability",
      title: "Educational Accountability",
      short_summary:
        "Without standardized tests, achievement gaps become invisible. With them, classrooms become test-prep factories. Both problems are real.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Teaching to the test narrows curriculum and harms deep learning. Schools spend weeks on test prep instead of critical thinking, arts, and exploration. High-stakes testing causes anxiety and disengagement, particularly among marginalized students.",
      proponent_rebuttal:
        "Without standardized measures, achievement gaps go unmeasured and unaddressed. NAEP data only exists because of standardized testing. Schools serving disadvantaged students need accountability tools to ensure they receive quality education rather than being warehoused. The alternative — subjective teacher assessments — introduces more bias, not less.",
      crux: {
        id: "achievement-gap-tracking",
        title: "Achievement Gap Visibility Without Standardized Tests",
        description:
          "Determining whether alternative assessment methods can detect and track achievement gaps as effectively as standardized tests.",
        methodology:
          "Compare achievement gap measurements using standardized tests vs. portfolio assessments, teacher evaluations, and project-based assessments across demographically diverse school districts.",
        equation:
          "\\text{Gap}_{detected} = f(\\text{assessment type}, \\text{demographic}, \\text{school resources})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Multi-district comparative assessment study)",
      },
      evidence: [
        {
          id: "naep-achievement-gaps",
          title: "NAEP Data Reveals Persistent Achievement Gaps",
          description:
            "The National Assessment of Educational Progress (NAEP) has tracked racial and socioeconomic achievement gaps since 1971. Without this standardized data, the 30-point reading gap between Black and white students would be invisible to policymakers.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "NCES, NAEP",
          reasoning:
            "Definitive national dataset that only exists due to standardized measurement.",
        },
        {
          id: "accountability-studies",
          title: "No Child Left Behind Accountability Had Mixed Effects",
          description:
            "Research on NCLB-era accountability showed narrowed achievement gaps in early grades but also documented curriculum narrowing, teacher demoralization, and gaming of test scores by some districts.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "National Bureau of Economic Research",
          reasoning:
            "Shows accountability works but with significant side effects.",
        },
        {
          id: "teacher-survey-testing-burden",
          title: "Teachers Report Excessive Testing Burden",
          description:
            "NEA and AFT surveys consistently find 70%+ of teachers believe standardized testing has a negative effect on teaching quality. Average US student takes 112 mandated standardized tests between pre-K and 12th grade.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "NEA, Council of the Great City Schools",
          reasoning:
            "Practitioner perspective; unions have political interests but direct classroom experience.",
        },
        {
          id: "countries-without-testing",
          title: "Finland Succeeds Without High-Stakes Testing",
          description:
            "Finland uses no standardized testing until age 16 and consistently ranks among top PISA performers. Their model relies on highly trained teachers, formative assessment, and trust-based accountability.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 6,
          },
          source: "OECD, Finnish National Agency for Education",
          reasoning:
            "Compelling counterexample, though Finland's homogeneous demographics and teacher quality limit replicability.",
        },
      ],
    },
  ],
};

// ============================================================================
// Social Media Age Limits Topic
// ============================================================================

const socialMediaAgeLimitsData = {
  id: "social-media-age-limits",
  title: "Social Media Age Limits",
  meta_claim:
    "Children under 16 should be legally prohibited from using social media platforms.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "mental-health-impact",
      title: "Mental Health Impact",
      short_summary:
        "Evidence on whether social media causally harms children's mental health, particularly for adolescents under 16.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Correlation isn't causation; teen mental health was declining before social media became widespread. Economic anxiety, academic pressure, and reduced outdoor play also increased. Bans push kids to less safe, unmoderated platforms. Most studies rely on self-reported screen time, which is unreliable.",
      proponent_rebuttal:
        "Jonathan Haidt's comprehensive review in 'The Anxious Generation' documents the sharp inflection in teen mental health precisely when smartphone/social media adoption hit critical mass (2012). The US Surgeon General's 2023 advisory specifically cited sufficient evidence of harm. Internal Facebook research (leaked by Frances Haugen) showed Instagram makes body image worse for 1 in 3 teen girls. Delay-of-smartphone initiatives in schools show measurable improvements in attention and wellbeing.",
      crux: {
        id: "causal-mechanism-study",
        title: "Randomized Social Media Abstinence Trial",
        description:
          "A properly controlled trial where teens are randomly assigned to abstain from social media for 6+ months, with mental health measured via clinical instruments rather than self-report.",
        methodology:
          "Recruit 5,000 teens aged 13-16. Randomly assign to social media abstinence (with device-level enforcement) or control. Measure depression (PHQ-A), anxiety (GAD-7), self-esteem, and sleep quality at baseline, 3 months, and 6 months.",
        equation:
          "\\Delta MH_{abstain} - \\Delta MH_{control} = \\tau_{causal}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$15M (Large-scale RCT with enforcement technology)",
      },
      evidence: [
        {
          id: "surgeon-general-advisory",
          title: "US Surgeon General Advisory on Youth Mental Health (2023)",
          description:
            "Surgeon General Vivek Murthy issued a formal advisory stating social media presents 'a profound risk of harm' to children. Called for warning labels similar to tobacco. Based on review of available evidence showing associations with depression, anxiety, and body image issues.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "US Surgeon General's Office",
          reasoning:
            "Highest-level public health advisory; carefully worded but stops short of claiming causation.",
        },
        {
          id: "haidt-anxious-generation",
          title: "Haidt's 'The Anxious Generation' Meta-Analysis",
          description:
            "Jonathan Haidt documents that teen depression increased 150% for girls and 50% for boys between 2010-2021, with the inflection point matching smartphone saturation. International data from 7 countries shows the same pattern.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Jonathan Haidt, 'The Anxious Generation' (2024)",
          reasoning:
            "Comprehensive but authored by an advocate; some peer reviewers dispute the causal framing.",
        },
        {
          id: "australia-age-verification",
          title: "Australia Passes Social Media Ban for Under-16s",
          description:
            "Australia passed legislation in 2024 banning children under 16 from social media. Implementation details and effectiveness data are still emerging. Platform compliance mechanisms remain uncertain.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "Australian Parliament, eSafety Commissioner",
          reasoning:
            "Democratic nation acted on the evidence; too early for effectiveness data.",
        },
        {
          id: "teen-self-report-surveys",
          title: "Teens Self-Report Both Harms and Benefits",
          description:
            "Pew Research surveys show 46% of teens say social media makes them feel worse, but 44% say it makes them feel better, and 80% say it helps them feel more connected to friends. LGBTQ+ youth particularly value online community access.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Pew Research Center (2023)",
          reasoning:
            "Large-scale, independent survey data that complicates the 'purely harmful' narrative.",
        },
      ],
    },
    {
      id: "enforcement-rights",
      title: "Enforcement & Rights",
      short_summary:
        "Age verification requires either collecting IDs (a privacy nightmare) or trusting self-reported birthdays (which no teenager has ever lied about).",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Age verification requires invasive ID checks that violate privacy for all users, not just children. Teens will circumvent any ban using VPNs, fake birthdays, or parents' accounts. Government shouldn't decide what children can access — that's a parental decision.",
      proponent_rebuttal:
        "We already age-gate alcohol, driving, gambling, and voting. Imperfect enforcement doesn't mean we abandon the principle — underage drinking laws reduce teen alcohol use despite circumvention. Age estimation technology (facial analysis, device attestation) offers privacy-preserving approaches. Parents need legal backing because individual parents can't enforce rules when all peers are on platforms.",
      crux: {
        id: "enforcement-effectiveness",
        title: "Age Verification Effectiveness Study",
        description:
          "Measuring what percentage of underage users are actually prevented from accessing platforms under various age verification regimes.",
        methodology:
          "Audit compliance rates across age verification methods: self-declared age, ID verification, facial age estimation, and device-level parental controls. Measure circumvention rates by age group.",
        equation:
          "E_{compliance} = 1 - \\frac{N_{underage\\_active}}{N_{underage\\_total}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-platform audit study)",
      },
      evidence: [
        {
          id: "australia-implementation",
          title: "Australia's Age Verification Pilot Data",
          description:
            "Australia's eSafety Commissioner trials showed facial age estimation correctly identifies under-16s 95% of the time, but privacy advocates raised concerns about biometric data collection and algorithmic bias against non-white faces.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source: "Australian eSafety Commissioner (2024)",
          reasoning:
            "Government-commissioned pilot; promising but limited sample and context.",
        },
        {
          id: "coppa-effectiveness",
          title: "COPPA Has Been Largely Ineffective",
          description:
            "The Children's Online Privacy Protection Act (1998) requires parental consent for under-13s. Studies show 53% of children under 13 use social media anyway, mostly by lying about age. Platforms have little incentive to enforce strictly.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Common Sense Media, FTC Reports",
          reasoning:
            "25 years of evidence that age-based online restrictions are difficult to enforce.",
        },
        {
          id: "age-verification-tech",
          title: "Age Verification Technology Is Rapidly Improving",
          description:
            "Companies like Yoti and SuperAwesome offer facial age estimation with 98%+ accuracy for adults vs. children. Device-level attestation (Apple, Google) can verify age without sharing personal data with platforms.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 7,
          },
          source: "Yoti, SuperAwesome, IEEE Reviews",
          reasoning:
            "Industry sources with commercial interests; independent verification needed.",
        },
        {
          id: "circumvention-rates",
          title: "Teen Circumvention of Existing Restrictions Is High",
          description:
            "Surveys indicate 67% of teens know how to bypass parental controls and age restrictions. VPN usage among teens doubled from 2020 to 2024. Any ban creates a cat-and-mouse dynamic.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "National Cyber Security Centre (UK), Bark Technologies",
          reasoning:
            "Practical evidence of enforcement challenges from multiple jurisdictions.",
        },
      ],
    },
  ],
};

// ============================================================================
// College Value Proposition Topic
// ============================================================================

const collegeValuePropositionData = {
  id: "college-value-proposition",
  title: "The Value of a College Degree",
  meta_claim:
    "A four-year college degree remains the best investment in future earnings and career outcomes for most young adults.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "economic-returns",
      title: "Economic Returns",
      short_summary:
        "The average bachelor's degree holder earns $1.2M more over a lifetime. The average student loan balance is $37K. The math looks simple until you disaggregate by major.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Student debt crisis ($1.77T total), degree inflation, and trade skills shortage suggest the ROI is declining. Average student graduates with $37K in debt. Many graduates are underemployed in jobs that don't require degrees. For-profit colleges and low-value majors drag down the averages.",
      proponent_rebuttal:
        "College graduates still earn $1.2M more over a lifetime than high school graduates. The wage premium (84% higher median earnings) has been stable for decades. Default rates are highest among dropouts, not graduates — the problem is non-completion, not college itself. Even adjusting for debt and opportunity cost, the ROI remains strongly positive for most completers.",
      crux: {
        id: "roi-by-institution-major",
        title: "Disaggregated ROI by Institution and Major",
        description:
          "Calculating the financial return on investment for college degrees broken down by institution type, major, and student demographics to identify where college pays off and where it doesn't.",
        methodology:
          "Use Department of Education College Scorecard data, IRS earnings records, and student loan data to calculate 20-year ROI for every institution-major combination, controlling for student selectivity.",
        equation:
          "ROI = \\frac{\\sum_{t=1}^{20} (E_{degree,t} - E_{no\\_degree,t})}{\\text{Total Cost} + \\text{Opportunity Cost}}",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Analysis of existing federal data)",
      },
      evidence: [
        {
          id: "georgetown-lifetime-earnings",
          title: "Georgetown: College Graduates Earn $1.2M More Over Lifetime",
          description:
            "Georgetown University's Center on Education and the Workforce finds bachelor's degree holders earn $2.8M over a lifetime vs. $1.6M for high school graduates — a $1.2M premium that has grown over time.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Georgetown University CEW",
          reasoning:
            "Well-regarded research center, though aggregated averages obscure wide variance by major and institution.",
        },
        {
          id: "fed-wage-premium",
          title: "Federal Reserve: College Wage Premium Stable at 84%",
          description:
            "The New York Federal Reserve tracks the college wage premium and finds it has remained between 73-84% since 2000. In 2024, median college graduate earns $60K vs. $36K for high school graduates.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Federal Reserve Bank of New York",
          reasoning:
            "Highly credible data; directness somewhat limited by selection bias (those who attend college may differ from those who don't).",
        },
        {
          id: "student-loan-defaults",
          title: "Student Loan Default Rates Highest Among Non-Completers",
          description:
            "Federal data shows 29% of borrowers who attended but didn't complete college default on loans within 12 years, vs. 8% of bachelor's degree completers. For-profit school attendees default at 44%. The debt problem is concentrated, not universal.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "Department of Education, Brookings",
          reasoning:
            "Reframes the debt crisis as a completion crisis; indirectly supports college value for completers.",
        },
        {
          id: "trade-certification-earnings",
          title: "Skilled Trades Offer Competitive Earnings Without Debt",
          description:
            "Licensed electricians, plumbers, and HVAC technicians earn median salaries of $56K-$60K with minimal debt. Union apprenticeship programs pay during training. In high-demand markets, experienced tradespeople earn $80K+.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Bureau of Labor Statistics, National Electrical Contractors Association",
          reasoning:
            "Demonstrates that competitive earnings are achievable through non-degree pathways with far less financial risk.",
        },
      ],
    },
    {
      id: "alternative-pathways",
      title: "Alternative Pathways",
      short_summary:
        "Bootcamp graduates report $20K+ salary jumps in 6 months. But 10-year career trajectories tell a different story.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Tech bootcamps, apprenticeships, and self-directed learning provide faster, cheaper paths to high-paying careers. Coding bootcamps cost $15K and take 12 weeks vs. $100K+ and 4 years for a CS degree. Google, Apple, and IBM have dropped degree requirements. The credential is becoming irrelevant.",
      proponent_rebuttal:
        "Alternative pathways work for a narrow set of fields (primarily software engineering and some tech roles). College provides broad skills, critical thinking, networking, and credentials that transfer across careers. Mid-career pivots are much harder without a degree. Bootcamp placement rates are often inflated, and earnings plateau faster than degree holders.",
      crux: {
        id: "long-term-career-trajectory",
        title: "10-Year Career Trajectory Comparison",
        description:
          "Comparing career earnings, job stability, career mobility, and satisfaction over 10+ years for college graduates vs. bootcamp graduates vs. trade certificate holders.",
        methodology:
          "Longitudinal tracking of cohorts entering workforce through different pathways. Measure earnings, unemployment spells, career changes, job satisfaction, and advancement at 1, 5, and 10 year intervals.",
        equation:
          "\\text{Career Value}_{t} = \\int_{0}^{t} (E(s) + S(s) + M(s)) \\, ds",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (10-year longitudinal cohort study)",
      },
      evidence: [
        {
          id: "bootcamp-placement-rates",
          title: "Bootcamp Placement Rates Are Often Inflated",
          description:
            "CIRR (Council on Integrity in Results Reporting) found that many bootcamps report placement rates of 80-95%, but independent audits show actual full-time employment in field rates of 50-65%. Many 'placements' are contract, part-time, or unrelated roles.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "CIRR, Course Report",
          reasoning:
            "Raises questions about alternatives, though bootcamp quality varies enormously.",
        },
        {
          id: "german-apprenticeship-model",
          title: "Germany's Apprenticeship System Produces Strong Outcomes",
          description:
            "Germany's dual education system (apprenticeship + classroom) serves 50%+ of young adults. Youth unemployment is 5.8% (vs. 7.5% in the US). Apprenticeship graduates report high job satisfaction and stable careers in manufacturing, healthcare, and IT.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source: "OECD, German Federal Institute for Vocational Education",
          reasoning:
            "Compelling international model showing degree is not necessary; replicability in US uncertain but directionally important.",
        },
        {
          id: "no-degree-hiring",
          title: "Google, Apple, IBM Dropped Degree Requirements",
          description:
            "Major tech companies have formally removed bachelor's degree requirements for most positions, signaling that skills and experience can substitute for formal credentials. This trend is spreading to finance, consulting, and government roles.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Harvard Business School, Burning Glass Institute",
          reasoning:
            "Major employers formally devaluing the degree signals structural shift, even if implementation lags.",
        },
        {
          id: "mid-career-earnings-by-education",
          title: "Mid-Career Earnings Gap Widens with Age",
          description:
            "Bureau of Labor Statistics data shows the earnings gap between college and non-college workers widens from ages 25-55. By age 45, bachelor's degree holders earn 2.3x more than high school graduates, up from 1.5x at age 25.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Bureau of Labor Statistics",
          reasoning:
            "Authoritative longitudinal data; directness limited by selection effects and survivor bias.",
        },
      ],
    },
  ],
};

// ============================================================================
// Mandatory Voting Topic
// ============================================================================

const mandatoryVotingData = {
  id: "mandatory-voting",
  title: "Mandatory Voting",
  meta_claim:
    "Compulsory voting, as practiced in Australia and other countries, produces more representative democracy and should be adopted more widely.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "democratic-representation",
      title: "Democratic Representation",
      short_summary:
        "Australia's mandatory voting pushes turnout above 90%. The question is whether that extra 40% of voters improves representation or dilutes it.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Forced participation creates uninformed voters, donkey voting, and resentment. Freedom includes the right NOT to vote. Voluntary participation signals genuine engagement — compulsion dilutes the quality of democratic input.",
      proponent_rebuttal:
        "Australia has 90%+ turnout vs. US 60%. Mandatory voting reduces the influence of extreme partisans, forces parties to appeal to the center rather than mobilize fringe bases, and makes voter suppression impossible. The 'uninformed voter' concern is paternalistic — all citizens are affected by policy regardless of engagement level.",
      crux: {
        id: "turnout-representation-link",
        title: "Turnout–Representation Correlation",
        description:
          "Does higher turnout from compulsory voting actually produce more representative policy outcomes, or does it just inflate numbers?",
        methodology:
          "Compare policy responsiveness to median voter preferences in compulsory vs. voluntary voting countries, controlling for institutional differences.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Cross-national comparative study)",
      },
      evidence: [
        {
          id: "mv-aus-turnout",
          title: "Australian Electoral Commission Turnout Data",
          description:
            "Australia consistently achieves 91-95% voter turnout since introducing compulsory voting in 1924, compared to 55-65% in comparable voluntary systems.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Australian Electoral Commission",
          reasoning:
            "Official government data with decades of consistency. High directness for turnout claim but less direct for representation quality.",
        },
        {
          id: "mv-uninformed-voters",
          title: "Uninformed Voter Behavior Studies",
          description:
            "Research shows compelled voters are more likely to cast random or donkey votes, and score lower on political knowledge tests than voluntary voters.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "Selb & Lachat, Electoral Studies 2009",
          reasoning:
            "Peer-reviewed but contested methodology. The 'donkey vote' effect is real but small (1-2% of ballots in Australia).",
        },
        {
          id: "mv-oecd-democracy",
          title: "OECD Democracy Index Comparisons",
          description:
            "Countries with compulsory voting score comparably or higher on democracy indices, suggesting forced turnout does not degrade democratic quality.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "OECD, Economist Intelligence Unit",
          reasoning:
            "Authoritative cross-national data, but democracy indices measure many factors beyond voting, reducing directness.",
        },
        {
          id: "mv-policy-moderation",
          title: "Compulsory Voting and Policy Moderation Studies",
          description:
            "Analysis of Australian and Belgian policy shows compulsory voting correlates with higher social spending and more centrist policy platforms.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Fowler, Journal of Politics 2013",
          reasoning:
            "Observational study with plausible causal mechanism, but confounders (political culture, institutions) are hard to isolate.",
        },
      ],
    },
    {
      id: "practical-implementation",
      title: "Practical Implementation",
      short_summary:
        "Compulsory voting treats a symptom. If citizens are disengaged, does forcing them into a booth fix the underlying problem?",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Enforcement is expensive and intrusive. Fines are regressive, hitting the poor hardest. Compulsory voting doesn't address root causes of disengagement — bad candidates, gerrymandering, and a captured political system. It's a Band-Aid on a structural wound.",
      proponent_rebuttal:
        "Australia's fine is ~$20 — minimal enforcement cost with near-universal compliance. Countries with compulsory voting have lower political polarization and higher civic engagement beyond just elections. When everyone votes, politicians must earn broad support rather than suppress opposition turnout.",
      crux: {
        id: "enforcement-cost-benefit",
        title: "Enforcement Cost–Benefit Analysis",
        description:
          "Does the administrative cost and civil liberty trade-off of compulsory voting justify the democratic gains?",
        methodology:
          "Compare per-voter election administration costs, enforcement costs, and democratic outcome metrics between compulsory and voluntary systems.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$200K (Comparative administrative study)",
      },
      evidence: [
        {
          id: "mv-aus-enforcement",
          title: "Australian Enforcement Cost Data",
          description:
            "Australia spends less per voter on election administration than the US, with fines generating revenue that partially offsets enforcement. Compliance is 94% without any enforcement action needed.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Australian Electoral Commission Annual Reports",
          reasoning:
            "Official data showing the system is self-sustaining. High compliance reduces enforcement burden.",
        },
        {
          id: "mv-polarization-comparison",
          title: "Political Polarization Comparison",
          description:
            "Countries with compulsory voting show lower levels of affective polarization and partisan hostility compared to voluntary systems like the US and UK.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Boxell, Gentzkow & Shapiro, NBER 2020",
          reasoning:
            "Cross-national polarization data is robust, but many factors beyond voting rules drive polarization.",
        },
        {
          id: "mv-suppression-counterfactual",
          title: "Voter Suppression Counterfactual Analysis",
          description:
            "Studies estimate that voter ID laws, purges, and polling place closures in the US suppress 2-3% of eligible votes disproportionately among minorities — a phenomenon that is structurally impossible under compulsory voting.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 4,
          },
          source: "Brennan Center for Justice",
          reasoning:
            "The suppression data supports the 'for' case, but the counterfactual framing — that compulsory voting would solve this — is speculative and context-dependent.",
        },
      ],
    },
  ],
};

// ============================================================================
// Death Penalty Deterrence Topic
// ============================================================================

const deathPenaltyDeterrenceData = {
  id: "death-penalty-deterrence",
  title: "The Death Penalty",
  meta_claim:
    "The death penalty serves as an effective deterrent against murder and is justified as a form of criminal justice.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "deterrence-effect",
      title: "Deterrence Effect",
      short_summary:
        "States with the death penalty do not have lower murder rates than states without it. Deterrence advocates say the problem is inconsistent enforcement.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The National Academy of Sciences (2012) concluded there is no reliable evidence that the death penalty deters murder. States without the death penalty consistently have lower murder rates. Most murders are impulsive crimes of passion, not calculated acts where perpetrators weigh consequences.",
      proponent_rebuttal:
        "Hashem Dezhbakhsh's econometric study found each execution deters approximately 18 murders. Criminals who face the death penalty are significantly more likely to plea bargain, revealing accomplices and evidence that helps solve other cases. The NAS critique was about methodology, not a finding of no effect.",
      crux: {
        id: "deterrence-causal-identification",
        title: "Causal Identification of Deterrence",
        description:
          "Can a causal (not merely correlational) deterrent effect of the death penalty on murder rates be established?",
        methodology:
          "Natural experiment analysis using states that adopted or abolished the death penalty, with synthetic control methods and instrumental variables to isolate the causal effect.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Multi-state longitudinal study with econometric controls)",
      },
      evidence: [
        {
          id: "dp-nas-review",
          title: "NAS 2012 Deterrence Review",
          description:
            "The National Academy of Sciences committee found that existing studies on the deterrent effect of capital punishment are 'fundamentally flawed' and should not be used to inform policy.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 8,
            directness: 9,
          },
          source: "National Research Council, 2012",
          reasoning:
            "Gold-standard scientific review by the US's most authoritative body. Reviewed all major econometric studies and found systemic methodological problems.",
        },
        {
          id: "dp-dezhbakhsh-study",
          title: "Dezhbakhsh Econometric Study",
          description:
            "Econometric analysis using county-level data found each execution prevents roughly 18 murders, with results robust to multiple model specifications.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 3,
            directness: 7,
          },
          source: "Dezhbakhsh, Rubin & Shepherd, American Law and Economics Review 2003",
          reasoning:
            "Published in peer-reviewed journal but heavily criticized by NAS. Results are sensitive to model specification and data choices. Low replicability as other researchers have failed to reproduce.",
        },
        {
          id: "dp-state-murder-rates",
          title: "State Murder Rate Comparisons",
          description:
            "States without the death penalty have consistently lower murder rates (4.0 per 100K) than death penalty states (5.3 per 100K) over the past 30 years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "FBI Uniform Crime Reports, Death Penalty Information Center",
          reasoning:
            "Reliable official data, but correlation does not establish causation. States differ in many ways beyond death penalty policy.",
        },
        {
          id: "dp-plea-bargain",
          title: "Plea Bargain Leverage Data",
          description:
            "Prosecutors report that the death penalty serves as critical leverage in plea negotiations, leading to confessions and cooperation that resolve additional cases.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source: "National District Attorneys Association surveys",
          reasoning:
            "Self-reported by prosecutors with institutional interest. Anecdotal and difficult to quantify systematically. Low independence score.",
        },
      ],
    },
    {
      id: "justice-and-error",
      title: "Justice & Error",
      short_summary:
        "Since 1973, 200+ U.S. death row inmates have been exonerated. The system executes innocent people at an estimated rate of 4%.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Over 190 death row exonerations since 1973 prove the system convicts innocent people. Racial bias is pervasive — Black defendants are 3x more likely to receive death sentences. Execution costs taxpayers 3x more than life imprisonment due to mandatory appeals. The punishment is irreversible.",
      proponent_rebuttal:
        "Advances in DNA evidence and forensic science dramatically reduce wrongful convictions. The exoneration record actually shows the appeals system works. Victims' families deserve ultimate justice for ultimate crimes. Life without parole — decades in a cage — is arguably crueler than a swift execution.",
      crux: {
        id: "wrongful-execution-rate",
        title: "Wrongful Execution Rate Estimation",
        description:
          "What is the actual rate of wrongful execution, and can it be reduced to an acceptable level with modern forensic science?",
        methodology:
          "Statistical modeling of exoneration rates, time-to-exoneration, and estimated undetected wrongful convictions using DNA-era data.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Retrospective forensic review of historical cases)",
      },
      evidence: [
        {
          id: "dp-exonerations",
          title: "Innocence Project Exoneration Data",
          description:
            "Over 190 people have been exonerated from death row since 1973. A 2014 PNAS study estimated that at least 4.1% of death row inmates are likely innocent.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Innocence Project, PNAS (Gross et al. 2014)",
          reasoning:
            "Rigorous statistical methodology published in top-tier journal. The 4.1% figure is considered a conservative lower bound.",
        },
        {
          id: "dp-racial-disparity",
          title: "Death Penalty Racial Disparity Studies",
          description:
            "Black defendants are 3x more likely to be sentenced to death than white defendants for similar crimes, especially when the victim is white.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Baldus Study, GAO Report on Racial Disparities in Sentencing",
          reasoning:
            "Multiple independent studies over decades reach consistent conclusions. Landmark Baldus study influenced McCleskey v. Kemp.",
        },
        {
          id: "dp-cost-analysis",
          title: "Execution Cost Analyses",
          description:
            "Death penalty cases cost 2-3x more than equivalent non-death penalty cases due to mandatory appeals, specialized housing, and prolonged litigation. California spent $184M per year on its death penalty system.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "California Commission on the Fair Administration of Justice",
          reasoning:
            "Authoritative fiscal analysis. Cost is real but is an argument about efficiency, not justice — somewhat indirect.",
        },
        {
          id: "dp-victim-families",
          title: "Victim Family Impact Statements",
          description:
            "Surveys of murder victims' families show a majority support the death penalty for their loved one's killer, reporting that execution provides a sense of closure and justice.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 5,
            directness: 7,
          },
          source: "National Organization of Parents Of Murdered Children surveys",
          reasoning:
            "Emotional testimony from directly affected parties. Self-selected samples and not all families agree. Some victim family organizations actively oppose the death penalty.",
        },
      ],
    },
  ],
};

// ============================================================================
// Billionaire Wealth Concentration Topic
// ============================================================================

const billionaireWealthData = {
  id: "billionaire-wealth",
  title: "Should Billionaires Exist?",
  meta_claim:
    "The concentration of extreme wealth in billionaires is harmful to society and should be prevented through taxation or structural reform.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "economic-impact",
      title: "Economic Impact",
      short_summary:
        "The top 0.001% hold more wealth than the bottom 50% combined. One side sees a rigged game; the other sees the reward for building Amazon.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Billionaires create jobs, fund innovation, and drive economic growth. Gates, Musk, and Bezos built platforms that millions depend on. Wealth taxes cause capital flight and are administratively impractical — every European country that tried one repealed it.",
      proponent_rebuttal:
        "The top 0.001% now hold more wealth than the bottom 50%. This concentration reduces social mobility, captures political power, and distorts markets. Innovation happens in labs and garages funded by public research grants, not in billionaire bank accounts. Most billionaire wealth comes from rent extraction, not value creation.",
      crux: {
        id: "wealth-concentration-mobility",
        title: "Wealth Concentration vs. Social Mobility",
        description:
          "Is there a causal relationship between extreme wealth concentration and declining social mobility, or are both symptoms of other structural factors?",
        methodology:
          "Cross-national panel regression comparing wealth Gini coefficients with intergenerational earnings elasticity, controlling for education, tax policy, and institutional quality.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1.5M (Multi-country longitudinal economic study)",
      },
      evidence: [
        {
          id: "bw-fed-wealth-data",
          title: "Federal Reserve Wealth Distribution Data",
          description:
            "The top 1% of US households hold 31% of total wealth while the bottom 50% hold just 2.6%. This gap has widened dramatically since 1980.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "Federal Reserve Distributional Financial Accounts",
          reasoning:
            "Gold-standard official data. Directly establishes the concentration claim but less direct on whether concentration is harmful.",
        },
        {
          id: "bw-job-creation",
          title: "Billionaire Job Creation Studies",
          description:
            "Amazon employs 1.5M+ people; Microsoft 220K+. Entrepreneurial billionaires create firms that employ millions and generate substantial economic activity.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 6,
          },
          source: "Company filings, Bureau of Labor Statistics",
          reasoning:
            "Employment numbers are real, but attribution is complicated — these jobs would likely exist under different ownership structures. Low independence as often cited by wealth-defense advocates.",
        },
        {
          id: "bw-european-wealth-tax",
          title: "European Wealth Tax Outcomes",
          description:
            "Of 12 European countries that implemented wealth taxes, 9 repealed them due to capital flight and low revenue. However, Switzerland and Norway maintain theirs successfully.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source: "OECD Tax Policy Studies, EU Tax Observatory",
          reasoning:
            "Mixed evidence — supports both sides depending on framing. Repeal history is real, but surviving programs suggest design matters more than concept.",
        },
        {
          id: "bw-piketty-analysis",
          title: "Piketty r>g Analysis",
          description:
            "Thomas Piketty's analysis shows that when the rate of return on capital (r) exceeds economic growth (g), wealth concentrates mechanically, creating a self-reinforcing oligarchy.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Piketty, Capital in the Twenty-First Century (2014)",
          reasoning:
            "Influential and data-rich, but contested by economists like Acemoglu & Robinson. The r>g framework is a simplification of complex dynamics.",
        },
      ],
    },
    {
      id: "political-power",
      title: "Political Power",
      short_summary:
        "Billionaires fund campaigns, buy media outlets, and lobby Congress. Is that free speech or legalized oligarchy?",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Billionaire philanthropy fills gaps government can't — the Gates Foundation has saved millions of lives from malaria and polio. Campaign finance is regulated. Many billionaires advocate for higher taxes on themselves. Private initiative is more agile than government bureaucracy.",
      proponent_rebuttal:
        "Billionaires exert outsized influence through lobbying ($3.7B annually), media ownership, and political donations. Gilens & Page showed US policy responds to elite preferences, not the median voter. This is plutocracy, not democracy. The philanthropy model makes public goods dependent on private whims — unaccountable and undemocratic.",
      crux: {
        id: "policy-responsiveness-test",
        title: "Policy Responsiveness to Wealth vs. Median Voter",
        description:
          "Does US policy systematically favor the preferences of wealthy elites over the median voter?",
        methodology:
          "Extend Gilens & Page methodology: compare policy outcomes with preferences of different income groups across a larger sample of policy issues.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$800K (Updated policy responsiveness study)",
      },
      evidence: [
        {
          id: "bw-gilens-page",
          title: "Gilens & Page Oligarchy Study",
          description:
            "Analysis of 1,779 policy issues found that economic elites and organized business groups have substantial impact on policy, while average citizens have little or no independent influence.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source: "Gilens & Page, Perspectives on Politics 2014",
          reasoning:
            "Highly cited and published in top journal. Criticized for measurement choices but findings are directionally consistent with follow-up studies.",
        },
        {
          id: "bw-gates-foundation",
          title: "Gates Foundation Global Health Impact",
          description:
            "The Gates Foundation has contributed over $60B to global health, helping reduce malaria deaths by 60% and supporting polio eradication in all but two countries.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 7,
            directness: 6,
          },
          source: "Gates Foundation Annual Reports, WHO",
          reasoning:
            "Impact is real and measurable. But low independence — foundation self-reports outcomes, and WHO depends on Gates funding. Directness is moderate: shows philanthropy works, not that billionaires are necessary for it.",
        },
        {
          id: "bw-dark-money",
          title: "Dark Money in Politics Data",
          description:
            "Undisclosed political spending has increased from $5M in 2006 to over $1B in recent election cycles. Billionaire-funded super PACs now dominate campaign spending.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "OpenSecrets, Center for Responsive Politics",
          reasoning:
            "Nonpartisan tracking organization with transparent methodology. Spending data is reliable but the influence-to-outcome causal link is debated.",
        },
        {
          id: "bw-giving-pledge",
          title: "Giving Pledge Outcomes",
          description:
            "Over 230 billionaires have signed the Giving Pledge to donate the majority of their wealth. However, signatories' combined wealth has grown faster than their giving, and the pledge is not legally binding.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 5,
          },
          source: "Giving Pledge, Institute for Policy Studies",
          reasoning:
            "Pledge demonstrates intent but is non-binding. IPS analysis shows wealth growth outpacing donations. Low independence as data is self-reported by pledgers.",
        },
      ],
    },
  ],
};

// ============================================================================
// Homeschooling vs Public School Topic
// ============================================================================

const homeschoolingEffectivenessData = {
  id: "homeschooling-effectiveness",
  title: "Homeschooling vs. Public School",
  meta_claim:
    "Homeschooled students achieve better academic and social outcomes than public school students on average.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "academic-achievement",
      title: "Academic Achievement",
      short_summary:
        "Homeschooled students score 15-30 percentile points higher on standardized tests. But the families who homeschool are not a random sample.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Self-selection bias inflates homeschool test scores — homeschool families are disproportionately affluent, educated, and motivated. There is no standardized accountability, and some homeschooled children receive inadequate education. Voluntary testing means only high-performers are measured.",
      proponent_rebuttal:
        "NHERI data shows homeschoolers score 15-30 percentile points above public school averages on standardized tests. Even controlling for demographics, homeschoolers outperform. The personalized pace, curriculum flexibility, and one-on-one instruction are inherent structural advantages over 30-student classrooms.",
      crux: {
        id: "selection-bias-controlled",
        title: "Selection-Bias-Controlled Achievement Comparison",
        description:
          "Do homeschoolers outperform public school students after rigorously controlling for family income, parental education, and voluntary testing bias?",
        methodology:
          "Large-scale randomized or propensity-score-matched comparison using mandatory (not voluntary) testing, controlling for SES, parental education, and regional factors.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$3M (National longitudinal study with mandatory participation)",
      },
      evidence: [
        {
          id: "hs-nheri-test-data",
          title: "NHERI Standardized Test Data",
          description:
            "The National Home Education Research Institute reports homeschoolers score 15-30 percentile points higher than public school averages on standardized achievement tests across all subjects.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 5,
            directness: 7,
          },
          source: "National Home Education Research Institute",
          reasoning:
            "NHERI is a homeschool advocacy organization — low independence. Sample is self-selected (voluntary testing). Data is real but systematically biased upward.",
        },
        {
          id: "hs-kunzman-gaither",
          title: "Kunzman & Gaither Self-Selection Critique",
          description:
            "Comprehensive literature review found that virtually all homeschool achievement studies suffer from self-selection bias, voluntary participation, and lack of demographic controls, making strong claims unsupported.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Kunzman & Gaither, Other Education 2013",
          reasoning:
            "Peer-reviewed meta-analysis by academic researchers without advocacy ties. Directly addresses the methodological weaknesses of pro-homeschool claims.",
        },
        {
          id: "hs-ray-2010",
          title: "Ray 2010 Demographic-Controlled Study",
          description:
            "Brian Ray's 2010 study of 11,739 homeschoolers found high achievement persisted even among lower-income families and families where parents lacked college degrees.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 7,
          },
          source: "Ray, Academic Leadership Journal 2010",
          reasoning:
            "Large sample but authored by NHERI founder with known advocacy position. Self-selected participants. Demographic controls present but voluntary testing bias remains.",
        },
        {
          id: "hs-crhe-data",
          title: "Coalition for Responsible Home Education Data",
          description:
            "CRHE documents cases of educational neglect among homeschoolers, showing that without accountability mechanisms, some children receive little to no academic instruction.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Coalition for Responsible Home Education",
          reasoning:
            "Advocacy-adjacent but draws on documented cases. Shows that averages obscure a wide distribution of outcomes. Anecdotal cases but systematic pattern.",
        },
      ],
    },
    {
      id: "socialization-development",
      title: "Socialization & Development",
      short_summary:
        "The socialization objection is the first thing everyone raises. The research on it is surprisingly thin in both directions.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Homeschoolers miss critical socialization, conflict resolution with diverse peers, and exposure to different backgrounds and viewpoints. Some experience educational neglect or ideological isolation. The home environment cannot replicate the social complexity of a school.",
      proponent_rebuttal:
        "Homeschoolers participate in co-ops, sports leagues, community activities, and religious organizations. Studies show equivalent or better social skills and self-esteem. Public school 'socialization' includes bullying, peer pressure, and artificial age segregation — not an obvious advantage.",
      crux: {
        id: "socialization-measurement",
        title: "Standardized Socialization Assessment",
        description:
          "Do homeschooled children develop equivalent social competence, measured by validated instruments, compared to matched public school peers?",
        methodology:
          "Administer validated social skills instruments (SSRS, SDQ) to demographically matched homeschool and public school samples, with longitudinal follow-up into adulthood.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Matched longitudinal cohort study)",
      },
      evidence: [
        {
          id: "hs-medlin-meta",
          title: "Medlin Socialization Meta-Analysis",
          description:
            "Richard Medlin's meta-analysis of socialization research found homeschooled children have higher self-esteem, fewer behavioral problems, and equivalent peer interaction skills.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "Medlin, Peabody Journal of Education 2013",
          reasoning:
            "Published in peer-reviewed journal but Medlin has published extensively favoring homeschool outcomes. Underlying studies have small samples and self-selection issues.",
        },
        {
          id: "hs-college-performance",
          title: "College Admission and Performance Data",
          description:
            "Homeschooled students who attend college have slightly higher GPAs and graduation rates than peers from public schools, and are increasingly sought by selective universities.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Cogan, Journal of College Admission 2010",
          reasoning:
            "Institutional data is reliable but only captures homeschoolers who attend college — survivor bias. The most disadvantaged homeschoolers may never apply.",
        },
        {
          id: "hs-isolation-cases",
          title: "Homeschool Isolation Case Studies",
          description:
            "Documented cases of severe social isolation, educational neglect, and abuse in homeschool settings where children had no external oversight or peer contact for years.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 7,
          },
          source: "CRHE, Homeschool Alumni surveys, investigative journalism",
          reasoning:
            "Compelling individual cases but anecdotal — not representative of the overall population. Low replicability because case studies are not systematic.",
        },
        {
          id: "hs-civic-participation",
          title: "Civic Participation Comparisons",
          description:
            "Studies show homeschool graduates vote at higher rates, volunteer more, and participate more in community organizations than public school graduates.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source: "Cardus Education Survey, NHERI",
          reasoning:
            "Suggestive data but plagued by same self-selection issues. Families that homeschool are often already highly civically engaged — the effect may be familial, not educational.",
        },
      ],
    },
  ],
};

// ============================================================================
// Police Reform Topic
// ============================================================================

const policeReformData = {
  id: "police-reform",
  title: "Policing Reform in America",
  meta_claim:
    "American policing requires fundamental structural reform — including significant reallocation of funding to social services — to improve public safety outcomes.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "use-of-force-accountability",
      title: "Use of Force & Accountability",
      short_summary:
        "U.S. police kill roughly 1,100 people per year. Germany, with a quarter of the population, averages about 10. The gap demands explanation.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The vast majority of police interactions are lawful and professional. Reform efforts have led to depolicing and crime spikes in cities that defunded. Officers face genuine life-threatening situations daily, and armchair critics underestimate the split-second decisions required.",
      proponent_rebuttal:
        "US police kill approximately 1,100 people annually — far more than any peer nation per capita. Qualified immunity effectively blocks accountability for misconduct. Body camera studies show a 50% reduction in use of force, suggesting that accountability itself changes behavior. The system protects bad actors.",
      crux: {
        id: "accountability-use-of-force-link",
        title: "Accountability–Use of Force Causal Link",
        description:
          "Does increased accountability (body cameras, civilian oversight, qualified immunity reform) causally reduce police use of force without increasing officer risk?",
        methodology:
          "Randomized controlled trials of accountability interventions across jurisdictions, measuring use-of-force incidents, complaints, crime rates, and officer safety outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Multi-city randomized controlled trial)",
      },
      evidence: [
        {
          id: "pr-mapping-police-violence",
          title: "Mapping Police Violence Data",
          description:
            "US police killed 1,096 people in 2023. Black people are 2.9x more likely to be killed by police than white people. 98% of police killings from 2013-2023 did not result in officers being charged.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "Mapping Police Violence, Washington Post Fatal Force Database",
          reasoning:
            "Independent data collection verified against official sources. Multiple databases corroborate. Directly measures the phenomena in question.",
        },
        {
          id: "pr-body-camera-rct",
          title: "Body Camera RCT Results",
          description:
            "A randomized controlled trial in Rialto, CA found that body cameras reduced use of force by 50% and citizen complaints by 88%. Multiple follow-up studies confirm directional findings.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Ariel, Farrar & Sutherland, Journal of Quantitative Criminology 2015",
          reasoning:
            "Gold-standard RCT design. Some follow-up studies show smaller effects, reducing replicability score. But directional finding is consistent.",
        },
        {
          id: "pr-defunding-crime-spikes",
          title: "Post-Defunding Crime Spike Data",
          description:
            "Cities that reduced police budgets in 2020 (Minneapolis, Portland, Austin) saw significant increases in violent crime in 2021-2022, though a national crime increase occurred simultaneously.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source: "FBI UCR, Major Cities Chiefs Association",
          reasoning:
            "Data is real but causation is ambiguous — COVID, pandemic economics, and nationwide trends confound. Some defunding cities saw smaller spikes than non-defunding cities.",
        },
        {
          id: "pr-international-comparison",
          title: "International Use of Force Comparisons",
          description:
            "US police kill at a rate 30-60x higher per capita than police in the UK, Germany, Japan, and Australia. These nations have similar crime levels but fundamentally different training and use-of-force standards.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "The Guardian, Amnesty International, national police statistics",
          reasoning:
            "Cross-national comparisons are reliable but the US has uniquely high gun ownership, which complicates direct comparison. Still, the magnitude of difference is striking.",
        },
      ],
    },
    {
      id: "alternative-response-models",
      title: "Alternative Response Models",
      short_summary:
        "Denver's STAR program diverted 2,700+ calls from police in its first year. Zero required police backup. Scale remains the open question.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Social workers cannot handle dangerous situations. CAHOOTS-style programs work in small, low-crime cities but don't scale to Chicago or Detroit. Removing police from mental health calls shifts risk to untrained responders. Most calls that seem non-violent can escalate without warning.",
      proponent_rebuttal:
        "CAHOOTS in Eugene, OR handles 20% of all calls with zero weapons and over 150 calls per day. Denver's STAR program diverted 2,500+ calls from police with zero arrests needed. Analysis of 911 calls shows the majority are non-violent — noise complaints, mental health crises, welfare checks — and do not require armed response.",
      crux: {
        id: "alternative-response-scalability",
        title: "Scalability of Non-Police Response Models",
        description:
          "Can programs like CAHOOTS and STAR scale to large, high-crime cities while maintaining safety outcomes?",
        methodology:
          "Phased implementation studies in large cities, comparing outcomes (safety incidents, call resolution, cost) between traditional police response and alternative response teams.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (Multi-city phased implementation study)",
      },
      evidence: [
        {
          id: "pr-cahoots-outcomes",
          title: "CAHOOTS Outcome Data",
          description:
            "CAHOOTS in Eugene, OR has operated since 1989, handles 20% of 911 calls, responds to 150+ calls/day with unarmed teams, and requests police backup on less than 1% of calls.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "White Bird Clinic, Eugene Police Department records",
          reasoning:
            "30+ years of operational data is compelling. But Eugene is a small, predominantly white city — generalizability to larger, more diverse cities is unproven.",
        },
        {
          id: "pr-denver-star",
          title: "Denver STAR Pilot Results",
          description:
            "Denver's Support Team Assisted Response (STAR) program diverted 2,500+ calls in its first year with zero arrests, zero use of force, and no injuries. Cost per call was 60% less than police response.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "Denver Department of Public Safety, Stanford Evaluation",
          reasoning:
            "Independent Stanford evaluation adds credibility. Pilot phase only — small scale and carefully selected call types. But results are striking.",
        },
        {
          id: "pr-911-call-analysis",
          title: "911 Call Type Analysis",
          description:
            "Analysis of 911 call data across major cities shows that only 4-7% of calls involve violent crime in progress. The majority are noise complaints, traffic incidents, mental health crises, and non-emergency welfare checks.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Vera Institute of Justice, NYT analysis of 10M+ 911 calls",
          reasoning:
            "Large-sample data analysis from multiple cities. Categorization of 'violent' vs. 'non-violent' calls involves judgment, but the broad pattern is consistent.",
        },
        {
          id: "pr-failed-defunding",
          title: "Failed Defunding Implementation Case Studies",
          description:
            "Minneapolis, Portland, and Austin all reversed police budget cuts within 1-2 years after crime increases and political backlash. Implementation was often chaotic, with cuts made before alternatives were in place.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Local government records, journalistic investigations",
          reasoning:
            "Documented policy reversals. However, critics argue the failure was in implementation (cutting before building alternatives), not in the concept of reallocation itself.",
        },
      ],
    },
  ],
};

// ============================================================================
// Drug Decriminalization Topic
// ============================================================================

const drugDecriminalizationData = {
  id: "drug-decriminalization",
  title: "Drug Decriminalization",
  meta_claim:
    "Decriminalizing personal drug use reduces harm and improves public health outcomes compared to criminalization.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "public-health-outcomes",
      title: "Public Health Outcomes",
      short_summary:
        "Portugal decriminalized all drugs in 2001. Drug deaths dropped, HIV infections plummeted, and overall use did not increase.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Decriminalization signals social acceptance and increases use, especially among youth. Without the deterrent of arrest, experimentation rises. Countries and states that decriminalize see drug tourism and open-air drug markets emerge, concentrating harm in specific neighborhoods.",
      proponent_rebuttal:
        "Portugal decriminalized all drugs in 2001 and saw drug-related deaths drop by 80%, HIV infections among people who use drugs fell dramatically, and overall use did not increase significantly. A treatment-first approach redirects resources from punishment to healthcare, catching addiction earlier and reducing overdose deaths.",
      crux: {
        id: "decrim-use-rates",
        title: "Use Rates Under Decriminalization vs. Criminalization",
        description:
          "Rigorous comparison of drug use prevalence, problematic use rates, and overdose deaths in jurisdictions that decriminalized vs. those that maintained criminal penalties, controlling for other policy differences.",
        methodology:
          "Difference-in-differences analysis comparing drug use surveys, emergency room data, and mortality statistics across matched jurisdictions with and without decriminalization, over 10+ year windows.",
        verification_status: "verified" as const,
        cost_to_verify: "$500K (Multi-jurisdiction longitudinal analysis of existing data)",
      },
      evidence: [
        {
          id: "portugal-20-year",
          title: "Portugal 20-Year Outcome Data Shows Dramatic Improvements",
          description:
            "Two decades after decriminalizing all drugs in 2001, Portugal saw drug-induced death rates fall to 3 per million (EU average: 23.7), HIV diagnoses among people who inject drugs dropped from 1,016 in 2001 to 18 in 2017, and overall drug use remained below the European average.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 9,
          },
          source: "EMCDDA, Transform Drug Policy Foundation",
          reasoning:
            "Longest-running natural experiment on decriminalization. High reliability and directness, but replicability is limited because Portugal simultaneously invested heavily in treatment infrastructure.",
        },
        {
          id: "oregon-measure-110",
          title: "Oregon Measure 110 Early Results Show Implementation Challenges",
          description:
            "Oregon decriminalized small amounts of all drugs in 2020 via Measure 110. By 2023, overdose deaths had risen 120% and only 1% of people cited for drug possession sought treatment through the new system. The law was partially rolled back in 2024.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Oregon Health Authority, The Oregonian investigative reporting",
          reasoning:
            "Recent and directly relevant, but confounded by fentanyl wave, COVID-era disruptions, and slow rollout of treatment funding. Short timeframe limits conclusions.",
        },
        {
          id: "emcdda-european-comparison",
          title: "EMCDDA: European Countries with Decriminalization Have Lower Problematic Use",
          description:
            "The European Monitoring Centre for Drugs and Drug Addiction finds that countries with decriminalized possession (Portugal, Czech Republic, Netherlands) generally report lower rates of problematic drug use and drug-related deaths than countries with strict penalties.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "EMCDDA European Drug Report",
          reasoning:
            "Authoritative pan-European data, though cross-country comparisons are complicated by differences in culture, healthcare systems, and reporting standards.",
        },
        {
          id: "us-overdose-under-criminalization",
          title: "US Overdose Deaths Hit Record Highs Under Criminalization",
          description:
            "The United States, with among the harshest drug penalties in the developed world, recorded over 107,000 overdose deaths in 2023 — a 50-fold increase since 1979. The War on Drugs has cost over $1 trillion since 1971 without reducing overall drug use rates.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "CDC WONDER, Drug Policy Alliance",
          reasoning:
            "Highly reliable mortality data showing criminalization has failed to prevent harm. Lower directness because rising deaths are driven by fentanyl supply, not just policy approach.",
        },
      ],
    },
    {
      id: "criminal-justice-impact",
      title: "Criminal Justice Impact",
      short_summary:
        "The U.S. spends $40B+ annually enforcing drug laws. Recidivism rates for drug offenders hover near 77%. Something is not working.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Without criminal penalties, there is no leverage to push people into treatment. Arrest often serves as the wake-up call that motivates recovery. Drug courts already divert people to treatment within the criminal system, providing structure and accountability that voluntary programs lack.",
      proponent_rebuttal:
        "Criminalization disproportionately harms racial minorities — Black Americans are 3.7x more likely to be arrested for marijuana despite similar usage rates. The US spends $80B+ per year on drug enforcement and incarceration. Drug courts, while promising, reach only about 5% of eligible individuals and still require a criminal charge as the entry point.",
      crux: {
        id: "coerced-vs-voluntary-treatment",
        title: "Coerced vs. Voluntary Treatment Outcomes",
        description:
          "Court-mandated rehab has high completion rates but lower long-term success. Voluntary treatment has more dropouts but better outcomes for those who stay.",
        methodology:
          "Randomized controlled trial assigning drug offenders to either traditional drug court (coerced treatment) or decriminalized referral system (voluntary treatment with outreach) and tracking sobriety, employment, and recidivism at 1, 3, and 5 years.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (Multi-site 5-year RCT)",
      },
      evidence: [
        {
          id: "aclu-racial-disparity",
          title: "ACLU: Massive Racial Disparities in Drug Enforcement",
          description:
            "The ACLU found that Black Americans are 3.73 times more likely to be arrested for marijuana possession than white Americans, despite roughly equal usage rates. In some counties, the disparity exceeds 10:1. These arrests create criminal records that reduce lifetime earnings by an estimated 40%.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source: "ACLU, 'A Tale of Two Countries' Report",
          reasoning:
            "Advocacy organization but using FBI Uniform Crime Report data. Findings independently replicated by multiple researchers. Directness is good — racial disparities are a core harm of criminalization.",
        },
        {
          id: "cato-portugal-analysis",
          title: "Cato Institute: Portugal's Decriminalization a Success",
          description:
            "The libertarian Cato Institute's analysis found that Portugal's decriminalization led to reduced drug use among 15-24 year olds, decreased HIV/AIDS cases, reduced burden on the criminal justice system, and no explosion in drug tourism or usage as critics predicted.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source: "Cato Institute, Glenn Greenwald",
          reasoning:
            "Ideologically diverse source (libertarian think tank) lending cross-spectrum credibility. Portugal-specific findings may not fully generalize.",
        },
        {
          id: "drug-court-effectiveness",
          title: "Drug Courts Reduce Recidivism by 8-14 Percentage Points",
          description:
            "Meta-analyses show drug courts reduce recidivism by 8-14 percentage points compared to traditional prosecution. Participants are less likely to reoffend and more likely to maintain employment. However, drug courts serve only ~5% of the eligible population due to resource constraints.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "National Association of Drug Court Professionals, RAND Corporation",
          reasoning:
            "Strong evidence that criminal justice-linked treatment can work, supporting the case for maintaining criminal entry points. Limited by small scale and selection bias (motivated participants).",
        },
        {
          id: "incarceration-cost-data",
          title: "Drug Incarceration Costs $80B+ Annually with Poor Outcomes",
          description:
            "The US spends approximately $182 billion annually on the criminal justice system, with drug offenses accounting for roughly 45% of federal prisoners. The average cost of incarcerating one person exceeds $35,000/year. Recidivism rates for drug offenders exceed 75% within five years.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Bureau of Justice Statistics, Vera Institute of Justice",
          reasoning:
            "Highly reliable government data on costs. Directness moderate — high costs and recidivism suggest failure, but don't prove decriminalization would be better.",
        },
      ],
    },
  ],
};

// ============================================================================
// Immigration and Wages Topic
// ============================================================================

const immigrationWageImpactData = {
  id: "immigration-wage-impact",
  title: "Immigration and Wages",
  meta_claim:
    "Large-scale immigration significantly depresses wages for native-born low-skilled workers.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "labor-market-economics",
      title: "Labor Market Economics",
      short_summary:
        "George Borjas says immigration costs native low-skill workers $800/year in lost wages. David Card's Nobel-winning work found no such effect. Same data, opposite conclusions.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "David Card's Mariel boatlift study and subsequent research show minimal wage effects from even sudden, large immigration flows. Immigrants create jobs, start businesses at higher rates than natives, and fill complementary roles that make native workers more productive rather than displacing them.",
      proponent_rebuttal:
        "George Borjas's reanalysis of the Mariel boatlift, focusing on the most directly competing workers (male high school dropouts), found a 10-30% wage decline for that group. Basic supply and demand dictates that adding labor supply at a given skill level, holding demand constant, puts downward pressure on wages. National Academy of Sciences found short-term negative effects on prior immigrants.",
      crux: {
        id: "wage-elasticity-immigration",
        title: "Labor Demand Elasticity for Low-Skill Workers",
        description:
          "Determining the precise wage elasticity — how much a 1% increase in immigrant labor supply at a given skill level changes wages for competing native workers.",
        methodology:
          "Instrumental variable regressions exploiting exogenous immigration shocks (refugee resettlement, visa lotteries) to measure causal wage effects on native workers in the same skill cell (education x experience), controlling for local demand shocks.",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (Econometric analysis of existing Census and ACS data)",
      },
      evidence: [
        {
          id: "card-mariel-boatlift",
          title: "Card: Mariel Boatlift Had No Significant Wage Effect",
          description:
            "David Card's landmark 1990 study of the Mariel boatlift — when 125,000 Cubans arrived in Miami in 1980, increasing the labor force by 7% — found virtually no effect on wages or unemployment for native low-skilled workers in Miami compared to control cities.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source: "David Card, Industrial and Labor Relations Review (1990)",
          reasoning:
            "Nobel Prize-winning economist, landmark study. Replicability debated due to Borjas's reanalysis reaching different conclusions with different sample definitions.",
        },
        {
          id: "borjas-reanalysis",
          title: "Borjas: Mariel Boatlift Depressed Low-Skill Wages 10-30%",
          description:
            "George Borjas reanalyzed the Mariel boatlift in 2017, focusing specifically on non-Hispanic male high school dropouts (the group most directly competing with Cuban arrivals). He found wages for this group fell 10-30% relative to comparison cities — a significant and lasting depression.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 9,
          },
          source: "George Borjas, Industrial and Labor Relations Review (2017)",
          reasoning:
            "Harvard labor economist with deep expertise. Criticized for narrowing sample to a small subgroup (non-Hispanic male dropouts) that may introduce noise. The Card vs. Borjas debate remains unresolved.",
        },
        {
          id: "nas-report-2017",
          title: "NAS: Immigration Has Small Negative Short-Term Effects on Prior Immigrants",
          description:
            "The National Academies of Sciences 2017 comprehensive report found that immigration has little long-term effect on native wages overall, but does reduce wages for prior immigrants and native high school dropouts in the short run (1-2% decline). Long-run effects are near zero or slightly positive.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "National Academies of Sciences, Engineering, and Medicine (2017)",
          reasoning:
            "Gold-standard consensus report synthesizing decades of research. Conclusion that effects are small and concentrated undercuts the 'significantly depresses' framing of the meta-claim.",
        },
        {
          id: "cbo-fiscal-impact",
          title: "CBO: Immigration Raises GDP and Has Mixed Fiscal Effects",
          description:
            "The Congressional Budget Office estimates that immigration raises real GDP substantially (projected 3.3% increase by 2034 from recent immigration surge). Fiscal effects are positive at the federal level but often negative at state and local levels in the short term.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source: "Congressional Budget Office (2024)",
          reasoning:
            "Highly authoritative and nonpartisan. GDP effects don't directly address distributional wage impacts on low-skill natives, reducing directness.",
        },
      ],
    },
    {
      id: "long-term-economic-effects",
      title: "Long-Term Economic Effects",
      short_summary:
        "Immigrants started 55% of U.S. billion-dollar startups. They also compete for entry-level jobs. Both facts are true simultaneously.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Immigrants are net fiscal contributors over their lifetimes and their children even more so. Innovation rates among immigrants are disproportionately high — immigrants are 80% more likely to found a company and account for 36% of US patent filings. H-1B workers raise wages for complementary native workers with different skills.",
      proponent_rebuttal:
        "Short-term fiscal costs are real, particularly at the state and local level where education, healthcare, and housing costs land. Integration costs, school overcrowding, and housing price pressure are felt acutely by communities even if aggregate GDP grows. The benefits accrue to capital owners and high-skill workers while costs fall on low-wage native workers.",
      crux: {
        id: "distributional-impact",
        title: "Distributional Analysis of Immigration Benefits and Costs",
        description:
          "Who specifically gains and who loses from immigration — broken down by income quintile, skill level, geographic area, and timeframe.",
        methodology:
          "General equilibrium modeling with heterogeneous agents calibrated to US data, tracing how immigration-driven GDP growth is distributed across native workers by skill level, region, and over 1, 5, 10, and 30 year horizons.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-year modeling project with panel data)",
      },
      evidence: [
        {
          id: "peri-sparber-complementarity",
          title: "Peri & Sparber: Immigrants Complement Rather Than Compete With Natives",
          description:
            "Giovanni Peri and Chad Sparber find that low-skilled immigrants specialize in manual/physical tasks while native workers shift to communication-intensive jobs. This task specialization means immigration makes native workers more productive rather than displacing them, raising native wages by 0.6-1.7%.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Peri & Sparber, American Economic Journal (2009)",
          reasoning:
            "Influential research from a leading immigration economist. Task-based framework is theoretically compelling but hard to verify empirically at scale.",
        },
        {
          id: "fair-cost-estimates",
          title: "FAIR: Immigration Costs $150B+ Annually at State/Local Level",
          description:
            "The Federation for American Immigration Reform estimates that state and local governments spend $150 billion annually on services for immigrants (education, healthcare, law enforcement), exceeding tax contributions by roughly $80 billion at the sub-federal level.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source: "Federation for American Immigration Reform (FAIR)",
          reasoning:
            "Advocacy organization with restrictionist stance. Methodology criticized for including US citizen children of immigrants as costs, inflating estimates. Low independence and reliability due to clear agenda.",
        },
        {
          id: "immigrant-entrepreneurship",
          title: "Immigrants Are 80% More Likely to Found Companies",
          description:
            "Research from the National Bureau of Economic Research finds immigrants are 80% more likely to found a firm than native-born Americans. 55% of US billion-dollar startups have at least one immigrant founder. Immigrants hold patents at 2-3x the rate of native-born Americans.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "NBER, National Foundation for American Policy",
          reasoning:
            "Strong data on immigrant entrepreneurship, but this primarily reflects high-skilled immigrants and doesn't directly address wage effects on low-skilled native workers.",
        },
        {
          id: "cbo-2024-immigration",
          title: "CBO 2024: Recent Immigration Surge Projected to Add $7T to GDP",
          description:
            "The CBO projects that the recent immigration surge will add 3.3% to real GDP and 5.2 million workers by 2033, boost federal revenues by $1 trillion, and help sustain Social Security solvency. Per-capita GDP effects are more modest at +0.1-0.2%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 4,
          },
          source: "Congressional Budget Office (2024)",
          reasoning:
            "Highly authoritative. Aggregate GDP gains don't address whether low-skill native workers share in them — directness is low for the specific meta-claim about wage depression.",
        },
      ],
    },
  ],
};

// ============================================================================
// Electric Vehicles vs. ICE Cars Topic
// ============================================================================

const evEnvironmentalImpactData = {
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

// ============================================================================
// Organic Food Health Benefits Topic
// ============================================================================

const organicFoodHealthData = {
  id: "organic-food-health",
  title: "Is Organic Food Healthier?",
  meta_claim:
    "Organic food is significantly healthier and more nutritious than conventionally grown food.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "nutritional-content",
      title: "Nutritional Content",
      short_summary:
        "A Stanford meta-analysis of 237 studies found no strong evidence that organic food is more nutritious. Organic advocates say nutrition is the wrong metric.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Stanford's comprehensive 2012 meta-analysis of 237 studies found no significant nutritional advantage for organic foods. The organic label does not mean pesticide-free — it means different (often less-tested) pesticides are used. The price premium of 20-100% makes healthy eating less accessible, potentially worsening public health by pricing people out of fruits and vegetables entirely.",
      proponent_rebuttal:
        "The British Journal of Nutrition's larger 2014 meta-analysis of 343 studies found 18-69% more antioxidants in organic crops, including significantly higher levels of flavanones, flavonols, and anthocyanins. Organic produce has significantly lower cadmium levels (a toxic heavy metal) and far fewer pesticide residues. The Stanford study has been criticized for methodological limitations.",
      crux: {
        id: "health-outcome-organic-diet",
        title: "Health Outcomes from Long-Term Organic Diet",
        description:
          "A French cohort study of 69,000 people found 25% lower cancer rates among organic food consumers. Selection bias could explain all of it.",
        methodology:
          "Large-scale prospective cohort study (50,000+ participants) comparing health outcomes over 10+ years between verified organic consumers and matched conventional food consumers, controlling for income, overall diet quality, exercise, and other confounders.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$50M (10-year prospective cohort study)",
      },
      evidence: [
        {
          id: "stanford-2012",
          title: "Stanford Meta-Analysis: No Strong Evidence of Nutritional Superiority",
          description:
            "Smith-Spangler et al. analyzed 237 studies comparing organic and conventional foods. They found no consistent differences in vitamin content and only slightly higher phosphorus levels in organic foods — a nutrient rarely deficient in any diet. They concluded the evidence does not support organic food as significantly more nutritious.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Annals of Internal Medicine, Smith-Spangler et al. (2012)",
          reasoning:
            "Published in a top medical journal with rigorous methodology. Subsequent larger meta-analyses have partially challenged these findings, but the core conclusion on vitamins/minerals holds.",
        },
        {
          id: "bjn-2014",
          title: "BJN Meta-Analysis: 18-69% More Antioxidants in Organic",
          description:
            "Baranski et al. analyzed 343 peer-reviewed studies (106 more than Stanford) and found statistically significant differences: 18-69% higher antioxidant concentrations including flavanones, flavonols, stilbenes, and anthocyanins. Organic crops also had 48% lower cadmium concentrations and significantly fewer pesticide residues.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "British Journal of Nutrition, Baranski et al. (2014)",
          reasoning:
            "Larger sample than Stanford, published in a respected journal. Some criticism of methodology (inclusion criteria, weighting). Antioxidant differences are real but their health significance at observed levels is debated.",
        },
        {
          id: "usda-pesticide-residue",
          title: "USDA: Organic Produce Has 4x Fewer Pesticide Residues",
          description:
            "The USDA Pesticide Data Program finds that organic produce has roughly one-quarter the pesticide residue detections of conventional produce. While 23% of organic samples have detectable residues (from drift, contamination, or allowed substances), levels are dramatically lower than conventional samples.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "USDA Pesticide Data Program",
          reasoning:
            "Gold-standard government monitoring data. High reliability and replicability. Lower directness because the health significance of the residue difference — when conventional residues are already below EPA tolerances — is the contested question.",
        },
        {
          id: "newcastle-review",
          title: "Newcastle University: Organic Dairy and Meat Have 50% More Omega-3",
          description:
            "Srednicka-Tober et al. found that organic milk and dairy products contain approximately 50% more omega-3 fatty acids than conventional counterparts, along with higher levels of iron, vitamin E, and conjugated linoleic acids. Organic meat showed similar omega-3 advantages.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "British Journal of Nutrition, Newcastle University (2016)",
          reasoning:
            "Solid meta-analysis from a respected research group. Omega-3 differences are consistently found across studies. Health impact depends on overall dietary omega-3 intake, which can be obtained from many sources.",
        },
      ],
    },
    {
      id: "pesticide-exposure-risk",
      title: "Pesticide Exposure Risk",
      short_summary:
        "Every apple you eat contains pesticide residues below the safety threshold. The real question: what happens after 30 years of daily 'safe' exposures?",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Conventional pesticide residues are well below EPA safety thresholds, which already include 100-1000x safety margins. The dose makes the poison — trace amounts detected on produce pose negligible risk to healthy adults. Organic farming uses pesticides too, including copper sulfate (which accumulates in soil) and rotenone (linked to Parkinson's in animal studies).",
      proponent_rebuttal:
        "EPA tolerance levels are set based on single-chemical exposure in adults and do not adequately account for chronic low-dose exposure, cumulative effects of multiple pesticides, or heightened vulnerability of children. Studies show switching to an organic diet reduces urinary pesticide metabolites by 60% within one week. The French NutriNet-Sante study found 25% lower cancer risk among high organic consumers.",
      crux: {
        id: "chronic-low-dose-effects",
        title: "Chronic Low-Dose Pesticide Exposure Health Effects",
        description:
          "Each individual residue is below the safety threshold. Nobody has tested what happens when you eat 20 different 'safe' residues daily for 40 years.",
        methodology:
          "Long-term (20+ year) prospective study tracking biomarkers of pesticide exposure, health outcomes (cancer incidence, neurological function, reproductive health), and organic vs. conventional dietary patterns in a large cohort, with dose-response modeling.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$100M (Multi-decade prospective epidemiological study)",
      },
      evidence: [
        {
          id: "epa-tolerance-safety",
          title: "EPA: Conventional Residues Are 100-1000x Below Harmful Levels",
          description:
            "The EPA sets pesticide tolerance levels with built-in 100-fold safety factors (10x for interspecies variation, 10x for intraspecies variation, with additional factors for children). Over 99% of conventional produce samples fall within these tolerances. The EPA reviews each pesticide every 15 years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source: "EPA Office of Pesticide Programs",
          reasoning:
            "Regulatory authority with strong methodology. Independence slightly reduced because EPA tolerance-setting process is influenced by industry data and lobbying. The 100x safety margin argument is strong but assumes single-chemical exposure models are adequate.",
        },
        {
          id: "uc-berkeley-chamacos",
          title: "UC Berkeley CHAMACOS: Prenatal Pesticide Exposure Linked to Developmental Harm",
          description:
            "The 20-year CHAMACOS longitudinal study in California's Salinas Valley found that prenatal exposure to organophosphate pesticides was associated with lower IQ scores (7 points), attention problems, and poorer neurodevelopmental outcomes in children. Effects persisted into adolescence even at exposure levels common in the general population.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "UC Berkeley CERCH, Eskenazi et al.",
          reasoning:
            "Rigorous longitudinal design from a leading university. Exposures were higher than typical dietary-only exposure (agricultural community), which limits direct applicability to organic food claims. However, it demonstrates vulnerability of developing brains to these chemicals.",
        },
        {
          id: "organic-diet-intervention",
          title: "Organic Diet Reduces Urinary Pesticide Metabolites by 60% in One Week",
          description:
            "Multiple intervention studies (Curl et al. 2003, Oates et al. 2014, Hyland et al. 2019) show that switching to an organic diet reduces measurable urinary pesticide metabolites by 60-89% within 3-7 days. This demonstrates that dietary pesticide exposure is real and modifiable, though health significance of the reduction is debated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "Environmental Health Perspectives, multiple studies",
          reasoning:
            "Consistent results across multiple independent studies. Strong evidence that conventional food delivers measurable pesticide doses. Directness is lower because reducing pesticide metabolites in urine does not directly prove health benefits.",
        },
        {
          id: "organic-pesticide-toxicity",
          title: "Some Organic Pesticides Are More Toxic Per Application Than Synthetic Ones",
          description:
            "Research from the University of Guelph found that some organic-approved pesticides (rotenone, copper sulfate, pyrethrin) require higher application rates and can be more environmentally toxic per unit of pest control than targeted synthetic alternatives. Copper sulfate accumulates in soil and is toxic to aquatic organisms.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "University of Guelph, PLoS ONE (2010)",
          reasoning:
            "Peer-reviewed research challenging the assumption that organic means fewer/safer pesticides. Directness moderate because the comparison is about environmental toxicity per application, not human dietary exposure.",
        },
      ],
    },
  ],
};

// ============================================================================
// Foreign Aid Effectiveness Topic
// ============================================================================

const foreignAidEffectivenessData = {
  id: "foreign-aid-effectiveness",
  title: "Does Foreign Aid Work?",
  meta_claim:
    "International development aid significantly improves outcomes in recipient countries and is an effective use of donor resources.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "development-outcomes",
      title: "Development Outcomes",
      short_summary:
        "Bed nets cost $2 each and prevent 500,000+ malaria deaths per year. Not all aid is this legible. Most of it is not.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Over $4.6 trillion in aid has been transferred to developing countries since 1960, yet many recipient countries remain poor. Aid creates dependency, funds corrupt governments, and distorts local markets by undercutting local producers. Dambisa Moyo's 'Dead Aid' argues that aid is the primary cause of Africa's poverty trap, not the solution.",
      proponent_rebuttal:
        "Specific, well-targeted interventions work extraordinarily well. Insecticide-treated bed nets cost $2-3 each and prevent malaria cases at $100 per DALY saved. Oral rehydration therapy, vaccines, and deworming have clear RCTs showing massive impact. Under-5 child mortality has fallen 50% since 1990, partly attributable to aid-funded health programs. The aggregate critique conflates bad aid with all aid.",
      crux: {
        id: "targeted-vs-general-aid",
        title: "Effectiveness of Targeted Health Aid vs. General Budget Support",
        description:
          "Bed nets and vaccines have clear RCT evidence behind them. Most aid categories do not. The question is how much of the portfolio the proven programs represent.",
        methodology:
          "Systematic comparison of RCT-backed targeted interventions against general budget support and governance aid, measuring cost-per-outcome and sustainability at 5 and 10-year horizons across multiple country contexts.",
        verification_status: "verified" as const,
        cost_to_verify: "$1M (Meta-analysis of existing RCTs and program evaluations)",
      },
      evidence: [
        {
          id: "givewell-bed-nets",
          title: "GiveWell: Bed Nets Among Most Cost-Effective Interventions in History",
          description:
            "GiveWell's rigorous analysis of the Against Malaria Foundation estimates that long-lasting insecticide-treated bed nets save a child's life for approximately $3,000-5,000. Multiple RCTs confirm 40-60% reductions in malaria mortality. Over 300 million nets distributed with measurable impact.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "GiveWell, Cochrane Review, Against Malaria Foundation",
          reasoning:
            "Exceptionally well-studied intervention with strong RCT evidence. GiveWell's analysis is transparently published. Represents the best case for aid effectiveness; may not generalize to other aid types.",
        },
        {
          id: "easterly-moyo-critique",
          title: "Easterly/Moyo: Aid Creates Dependency and Funds Corruption",
          description:
            "William Easterly ('The White Man's Burden') and Dambisa Moyo ('Dead Aid') argue that general development aid creates government dependency, reduces accountability to citizens, funds corruption (an estimated 25% of World Bank loans are misused), and undermines domestic institutions. Countries receiving the most aid per capita have not grown faster.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "William Easterly (NYU), Dambisa Moyo",
          reasoning:
            "Influential critiques from credentialed economists. Arguments apply most strongly to general budget support and governance aid, less to targeted health interventions. Correlation between aid and low growth doesn't prove causation.",
        },
        {
          id: "pepfar-hiv-outcomes",
          title: "PEPFAR: 25 Million Lives Saved Through Targeted HIV/AIDS Aid",
          description:
            "The President's Emergency Plan for AIDS Relief has provided antiretroviral treatment to over 20 million people and is estimated to have saved 25 million lives since 2003. HIV-related deaths in PEPFAR focus countries have declined by 68%. Widely considered the most successful US foreign aid program in history.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source: "PEPFAR, UNAIDS, Institute for Health Metrics and Evaluation",
          reasoning:
            "Massive, well-documented program with clear outcome metrics. Government-reported numbers may be slightly inflated. Replicability for other diseases is uncertain. Directness is high — lives saved is the most important outcome.",
        },
        {
          id: "world-bank-aid-growth",
          title: "World Bank Meta-Analysis: No Robust Aid-Growth Relationship",
          description:
            "Multiple econometric studies, including World Bank-commissioned research, have failed to find a robust positive relationship between aggregate aid flows and economic growth across countries. Burnside & Dollar initially found aid works in 'good policy environments,' but this finding did not replicate in subsequent analyses with expanded datasets.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "World Bank Research, Rajan & Subramanian (2008)",
          reasoning:
            "World Bank's own research undermining the aid-growth narrative is powerful for its independence. However, aggregate growth is a crude outcome measure that may miss sectoral improvements in health and education.",
        },
      ],
    },
    {
      id: "efficiency-accountability",
      title: "Efficiency & Accountability",
      short_summary:
        "Estimates suggest 10-30% of aid funds are lost to corruption and administrative overhead. Defenders say that still beats doing nothing.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Only 30-40% of aid reaches the intended recipients, with the rest consumed by overhead, consultant fees, and corruption. Tied aid — which requires recipients to purchase goods from the donor country — serves donor economic interests more than recipient needs. Aid conditionality often backfires, imposing harmful structural adjustment. The aid industry itself employs hundreds of thousands of well-paid professionals in donor countries.",
      proponent_rebuttal:
        "Cash transfer programs bypass overhead entirely and put money directly in the hands of the poor. GiveDirectly's model shows that 90%+ of donations reach recipients, and rigorous studies show cash transfers improve nutrition, education, and business investment. Aid transparency has improved dramatically since the 2000s with IATI reporting standards. Comparing aid efficiency to doing nothing is the wrong counterfactual — the question is whether it's better than alternatives.",
      crux: {
        id: "delivery-mechanism-comparison",
        title: "Aid Delivery Mechanism Efficiency Comparison",
        description:
          "Head-to-head comparison of cost-per-outcome across aid delivery mechanisms: traditional project aid, budget support, NGO programs, direct cash transfers, and multilateral channels.",
        methodology:
          "Track $1 of aid from donor commitment through to measurable outcome (health, education, income) across different delivery mechanisms in the same country contexts. Include all overhead, administrative costs, and leakage at each stage.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Multi-country tracer study with outcome measurement)",
      },
      evidence: [
        {
          id: "givedirectly-cash-transfers",
          title: "GiveDirectly: Cash Transfers Deliver 90%+ to Recipients with Proven Impact",
          description:
            "GiveDirectly's unconditional cash transfer model delivers over 90 cents of every dollar to extreme poor recipients. RCTs show recipients invest in housing, nutrition, education, and small businesses. A 12-year follow-up found sustained improvements in assets, consumption, and food security with no increase in alcohol or tobacco spending.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "GiveDirectly, Haushofer & Shapiro (2016), Egger et al. (2022)",
          reasoning:
            "Strong RCT evidence from multiple countries. GiveDirectly is both the subject and funder of some research, lowering independence. Replicability is good for cash transfers specifically but doesn't validate other aid modalities.",
        },
        {
          id: "transparency-intl-corruption",
          title: "Transparency International: Corruption Diverts 25-30% of Aid in Weak Governance Countries",
          description:
            "Transparency International estimates that corruption siphons 20-30% of public funds in the most corrupt aid-receiving countries. High-profile scandals include $1 billion stolen from Mozambique's tuna bond scheme (partly donor-funded) and systematic diversion of food aid in Somalia. Even well-intentioned aid enables corruption by providing fungible resources.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Transparency International, Global Corruption Report",
          reasoning:
            "Well-regarded anti-corruption organization with global data. Estimates are necessarily imprecise — corruption is hidden by nature. Directness is good because diversion directly undermines aid effectiveness.",
        },
        {
          id: "oecd-tied-aid",
          title: "OECD: Tied Aid Reduces Value by 15-30% and Serves Donor Interests",
          description:
            "The OECD estimates that tied aid (requiring purchases from donor country firms) reduces the value of aid by 15-30% through higher procurement costs. While formally tied aid has decreased to ~20% of bilateral aid, informal tying through consultancy contracts and technical assistance remains prevalent.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "OECD Development Assistance Committee",
          reasoning:
            "Highly authoritative inter-governmental source. Data is well-documented. Directly demonstrates inefficiency in the aid system, though the trend toward untying is positive.",
        },
        {
          id: "deaton-great-escape",
          title: "Deaton: Aid Undermines State-Building and Accountability",
          description:
            "Nobel laureate Angus Deaton argues in 'The Great Escape' that aid weakens the social contract between governments and citizens. When governments get revenue from donors rather than taxation, they are accountable to donors, not citizens. This undermines democratic governance, state capacity, and long-run institutional development — the very foundations of sustainable growth.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "Angus Deaton, 'The Great Escape' (2013)",
          reasoning:
            "Nobel Prize-winning economist with deep expertise. Theoretical argument is compelling but hard to test empirically (low replicability). Directness is moderate — the accountability argument applies most to budget support, less to targeted health programs.",
        },
      ],
    },
  ],
};

// ============================================================================
// Space Exploration ROI
// ============================================================================

const spaceExplorationValueData = {
  id: "space-exploration-value",
  title: "Is Space Exploration Worth It?",
  meta_claim:
    "Government-funded space exploration provides sufficient scientific, economic, and strategic returns to justify its cost.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "economic-returns-spinoffs",
      title: "Economic Returns & Spin-offs",
      short_summary:
        "NASA claims $7-14 of economic return per dollar spent. Critics say that number relies on counting every downstream use of Teflon and memory foam.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "NASA's $25B+ annual budget could fund universal pre-K, clean water infrastructure, or homelessness solutions with immediate, measurable impact. Space tourism is a billionaire's playground subsidized by taxpayers. Most spin-off claims are exaggerated — memory foam and Tang were not invented by NASA. The opportunity cost of space spending is enormous when millions lack basic needs.",
      proponent_rebuttal:
        "NASA estimates a 7:1 ROI through technology spin-offs including GPS navigation, water purification systems, medical imaging (CT/MRI advances), scratch-resistant lenses, and satellite communications. The space economy is projected to reach $1.8 trillion by 2035. Asteroid mining could solve rare-earth resource scarcity. SpaceX has already reduced launch costs by 90%, creating an entirely new commercial sector.",
      crux: {
        id: "space-economy-roi",
        title: "Space Investment ROI Calculation",
        description:
          "Comprehensive analysis of direct and indirect economic returns from government space spending, including spin-off technologies, commercial sector growth, and opportunity costs.",
        methodology:
          "Track all NASA-funded patents and their commercial applications. Calculate revenue generated by spin-off industries. Compare to counterfactual spending on social programs using economic multiplier models.",
        equation:
          "\\text{ROI} = \\frac{\\sum_{t} (\\text{Spin-off Revenue}_t + \\Delta\\text{GDP}_{\\text{space sector},t})}{\\sum_{t} \\text{Government Investment}_t}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Comprehensive economic analysis)",
      },
      evidence: [
        {
          id: "nasa-spinoff-analysis",
          title: "NASA Spin-off Economic Impact Analysis",
          description:
            "NASA's annual Spinoff publication documents over 2,000 technologies transferred to the private sector. Independent analysis estimates these generate $7-14 in economic activity per dollar invested, though critics argue attribution is inflated since many technologies had parallel commercial development.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 6,
          },
          source: "NASA Office of Technology Transfer",
          reasoning:
            "NASA-produced data has inherent bias, but the breadth of documented spin-offs is substantial. Independence score is low due to self-reporting.",
        },
        {
          id: "space-economy-projections",
          title: "Space Economy Projected at $1.8 Trillion by 2035",
          description:
            "Morgan Stanley, McKinsey, and the World Economic Forum project the global space economy will grow from $469B (2023) to $1.8T by 2035. Growth is driven by satellite broadband, Earth observation, in-space manufacturing, and space tourism.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Morgan Stanley Space Economy Report",
          reasoning:
            "Credible financial institutions, but projections are speculative and assume continued government investment as a catalyst.",
        },
        {
          id: "opportunity-cost-analysis",
          title: "Opportunity Cost: $25B Could Fund Universal Pre-K",
          description:
            "NASA's $25.4B annual budget (2024) exceeds the estimated $22B needed for universal pre-K in the US, $10B for clean water infrastructure repairs, or $20B to end veteran homelessness. Every dollar spent in space is a dollar not spent on immediate human needs with proven returns.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Congressional Budget Office, Brookings Institution",
          reasoning:
            "Valid economic comparison, though it assumes a zero-sum budget which isn't strictly accurate — NASA's budget is 0.5% of federal spending.",
        },
        {
          id: "private-space-revenue",
          title: "Private Space Industry Revenue Exceeds Government Spending",
          description:
            "The commercial space industry generated $384B in revenue in 2023, with SpaceX alone valued at $180B. Private investment in space companies reached $8.5B in 2023. This suggests government seed investment has catalyzed a self-sustaining industry.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Space Foundation, Bryce Tech",
          reasoning:
            "Industry data is solid; the causal link between government spending and private growth is plausible but not fully proven.",
        },
      ],
    },
    {
      id: "scientific-strategic-value",
      title: "Scientific & Strategic Value",
      short_summary:
        "The Mars Perseverance rover cost $2.7B. A crewed mission would cost $100B+. The rover does not inspire children to become engineers, but it also does not need life support.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Robotic missions accomplish 90% of the science at 1% the cost of human missions. The ISS cost $150B and hasn't produced game-changing discoveries. Space debris is becoming a catastrophic risk — there are 27,000 tracked pieces of orbital junk threatening all satellite infrastructure. Militarizing space accelerates a dangerous arms race.",
      proponent_rebuttal:
        "Climate monitoring satellites are essential for understanding and responding to Earth's changing climate. NASA's DART mission successfully demonstrated asteroid deflection — an existential defense capability. Space capabilities provide critical military strategic advantage (GPS, reconnaissance, communications). Human missions drive public engagement and inspire STEM careers in ways robots cannot.",
      crux: {
        id: "human-vs-robotic-value",
        title: "Human vs. Robotic Mission Value Comparison",
        description:
          "Systematic comparison of scientific output, cost-effectiveness, and strategic value between human and robotic space missions.",
        methodology:
          "Quantify scientific publications, discoveries, and technological capabilities per dollar spent for human vs. robotic missions. Include strategic defense value and public engagement metrics.",
        equation:
          "\\frac{\\text{Science Output}_{\\text{human}}}{\\text{Cost}_{\\text{human}}} \\overset{?}{>} \\frac{\\text{Science Output}_{\\text{robotic}}}{\\text{Cost}_{\\text{robotic}}}",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (Comparative meta-analysis)",
      },
      evidence: [
        {
          id: "dart-success",
          title: "DART Asteroid Deflection Mission Succeeded",
          description:
            "NASA's DART mission (2022) successfully altered asteroid Dimorphos's orbit by 33 minutes — far exceeding the 73-second minimum. This proved humanity can defend against asteroid impacts, an existential risk. The mission cost $325M, a fraction of the damage from even a small asteroid impact.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source: "NASA, Johns Hopkins APL, Nature",
          reasoning:
            "Independently verified result with clear existential-defense implications. Replicability slightly limited as each asteroid is unique.",
        },
        {
          id: "robotic-vs-human-cost",
          title: "Robotic Missions Cost 1% of Human Missions",
          description:
            "Mars Perseverance rover cost $2.7B and has operated for 3+ years. A crewed Mars mission would cost an estimated $500B-$1T. The James Webb Space Telescope ($10B) has produced more transformative science than any ISS experiment. Per-dollar scientific output strongly favors robotic missions.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "NASA JPL, National Academies of Sciences",
          reasoning:
            "Strong cost comparison with reliable data; somewhat limited by comparing different mission types with different objectives.",
        },
        {
          id: "climate-satellite-data",
          title: "Climate Satellites Provide Irreplaceable Earth Data",
          description:
            "NASA's Earth-observing satellites (Landsat, MODIS, OCO-2) provide the primary data for tracking deforestation, sea level rise, ice sheet loss, and atmospheric CO2. This data underpins climate models used by every nation. No ground-based alternative exists for global-scale monitoring.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "NASA Earth Science Division, IPCC",
          reasoning:
            "Widely accepted and directly useful; satellite climate data is genuinely irreplaceable for global monitoring.",
        },
        {
          id: "kessler-syndrome-risk",
          title: "Space Debris Threatens All Orbital Infrastructure",
          description:
            "The Kessler Syndrome describes a cascade where orbital collisions generate debris that causes more collisions, potentially making low Earth orbit unusable. There are 27,000+ tracked debris objects and millions of smaller pieces. Starlink alone has added 5,000+ satellites. A single cascade event could destroy GPS, communications, and weather satellites worth trillions.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "ESA Space Debris Office, NASA ODPO",
          reasoning:
            "Well-documented risk with credible modeling; directness is moderate since it argues against unmanaged expansion rather than all space activity.",
        },
      ],
    },
  ],
};

// ============================================================================
// Factory Farming Ban
// ============================================================================

const factoryFarmingBanData = {
  id: "factory-farming-ban",
  title: "Should We Ban Factory Farming?",
  meta_claim:
    "Industrial animal agriculture (factory farming) should be banned or drastically reformed due to its ethical, environmental, and public health costs.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "animal-welfare-ethics",
      title: "Animal Welfare & Ethics",
      short_summary:
        "80 billion land animals are slaughtered annually, most after living in conditions that would be illegal if applied to dogs. The ethics hinge on how much moral weight you give a chicken.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Animal welfare standards have improved significantly over the past two decades. Cage-free, free-range, and humanely raised options exist for consumers who want them — the market is responding. Banning factory farming would devastate rural economies that depend on it and raise food prices 20-50%, hurting the poor most. Animals are not moral patients in the same way humans are.",
      proponent_rebuttal:
        "99% of US farmed animals live in factory farms — 'humane' options are a tiny fraction. Conditions include gestation crates so small pigs cannot turn around, battery cages giving hens less space than a sheet of paper, debeaking without anesthesia, and forced rapid growth causing skeletal failure. The Cambridge Declaration on Consciousness (2012) affirmed that mammals and birds possess the neurological substrates for conscious experience and suffering.",
      crux: {
        id: "sentience-threshold",
        title: "Animal Sentience and Moral Status",
        description:
          "Determining the level of conscious experience and suffering in farmed animals, and whether this triggers moral obligations that override economic considerations.",
        methodology:
          "Neuroimaging and behavioral studies of pain, distress, and emotional states in pigs, chickens, and cattle. Compare neural correlates of suffering to those in humans. Philosophical analysis of moral thresholds.",
        equation:
          "\\text{Moral Weight} = f(\\text{Sentience Level}, \\text{Suffering Intensity}, \\text{Number of Animals})",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (Neuroscience and ethics review)",
      },
      evidence: [
        {
          id: "usda-farm-size-data",
          title: "USDA: 99% of US Farmed Animals in Factory Farms",
          description:
            "USDA National Agricultural Statistics Service data shows that 98.7% of US farmed animals live in concentrated animal feeding operations (CAFOs). This represents approximately 10 billion land animals per year in the US alone. The 'humane' market share is under 1% of total production.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "USDA NASS, Sentience Institute Analysis",
          reasoning:
            "Government data with high reliability; directly establishes the scale of factory farming.",
        },
        {
          id: "cambridge-declaration-consciousness",
          title: "Cambridge Declaration on Consciousness (2012)",
          description:
            "A prominent group of neuroscientists signed the Cambridge Declaration stating that 'non-human animals possess the neurological substrates that generate consciousness.' This includes all mammals and birds, covering all major farmed species. The declaration was signed at Cambridge University in the presence of Stephen Hawking.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Cambridge Declaration on Consciousness, 2012",
          reasoning:
            "Authoritative scientific statement; somewhat limited by philosophical debate over what 'consciousness' implies for moral status.",
        },
        {
          id: "welfare-improvement-trends",
          title: "Animal Welfare Standards Have Steadily Improved",
          description:
            "Since 2000, the EU has banned battery cages and gestation crates. US states (CA, MA, WA) have passed similar laws. McDonald's, Walmart, and major retailers have committed to cage-free eggs. Industry groups argue voluntary improvement is more effective than prohibition.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "ASPCA, National Chicken Council",
          reasoning:
            "Real progress exists, but critics note improvements are marginal (cage-free still allows extreme crowding) and timelines are slow.",
        },
        {
          id: "food-price-impact",
          title: "Banning Factory Farming Would Raise Food Prices 20-50%",
          description:
            "Economic modeling suggests replacing factory farming with pasture-based systems would increase meat prices 20-50% and require 2-3x more land. Low-income households spend 30%+ of income on food; price increases would disproportionately harm them. Protein deficiency could increase in developing nations.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "USDA Economic Research Service, FAO",
          reasoning:
            "Credible economic modeling, though it assumes a direct replacement rather than dietary shifts toward plant protein.",
        },
      ],
    },
    {
      id: "environmental-health-impact",
      title: "Environmental & Health Impact",
      short_summary:
        "Livestock accounts for 14.5% of global greenhouse emissions. 73% of antibiotics sold worldwide go to farm animals. These are public health numbers, not just animal welfare arguments.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Modern agriculture feeds 8 billion people more efficiently than any system in history. Plant-based diets lack key nutrients (B12, iron, zinc, omega-3s) without expensive supplementation. Lab-grown meat isn't commercially viable and may never match the taste, texture, and cost of conventional meat. Dismantling the system that feeds the world is reckless utopianism.",
      proponent_rebuttal:
        "Animal agriculture produces 14.5% of global greenhouse gas emissions — more than all transportation combined. Factory farms are breeding grounds for antibiotic-resistant bacteria (80% of US antibiotics go to livestock) and pandemic viruses (avian flu, swine flu originated in factory farm conditions). Manure runoff creates massive ocean dead zones — the Gulf of Mexico dead zone covers 6,000+ square miles annually.",
      crux: {
        id: "ghg-antibiotic-impact",
        title: "Comprehensive Environmental & Health Cost Accounting",
        description:
          "Full externality accounting of factory farming including GHG emissions, antibiotic resistance costs, water pollution, and pandemic risk.",
        methodology:
          "Calculate total externalized costs: GHG damage (social cost of carbon), healthcare costs from antibiotic resistance, water treatment costs from agricultural runoff, and expected value of pandemic risk from zoonotic disease.",
        equation:
          "\\text{True Cost} = \\text{Market Price} + \\sum (\\text{GHG Damage} + \\text{Health Costs} + \\text{Pollution Costs} + \\text{Pandemic Risk})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-disciplinary externality study)",
      },
      evidence: [
        {
          id: "fao-livestock-ghg",
          title: "FAO: Livestock Produces 14.5% of Global GHG Emissions",
          description:
            "The UN Food and Agriculture Organization's comprehensive lifecycle assessment found that livestock contributes 14.5% of all anthropogenic greenhouse gas emissions. Cattle alone account for 65% of the livestock sector's emissions, primarily through methane from enteric fermentation and nitrous oxide from manure.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "FAO 'Tackling Climate Change Through Livestock' (2013)",
          reasoning:
            "Gold-standard international assessment with transparent methodology; widely cited in climate policy.",
        },
        {
          id: "who-antibiotic-resistance",
          title: "WHO: Agricultural Antibiotic Use Drives Resistance Crisis",
          description:
            "The WHO identifies antibiotic use in livestock as a primary driver of antimicrobial resistance, which kills 1.27 million people annually and is projected to cause 10 million deaths/year by 2050. 80% of antibiotics sold in the US are used in animal agriculture, primarily for growth promotion rather than treating illness.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "WHO Antimicrobial Resistance Global Report",
          reasoning:
            "Authoritative source with strong methodology; causal link between specific farm practices and resistance is well-established.",
        },
        {
          id: "plant-protein-adequacy",
          title: "Plant-Based Diets Can Lack Key Nutrients Without Supplements",
          description:
            "Systematic reviews find that plant-based diets are nutritionally adequate for all life stages when properly planned, but many people fail to supplement B12, iron, zinc, and omega-3s. Developing nations with limited food diversity face greater risks. The American Dietetic Association endorses well-planned plant-based diets but emphasizes the 'well-planned' caveat.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "American Dietetic Association, Cochrane Reviews",
          reasoning:
            "Valid nutritional concern, though directness is limited since a factory farming ban doesn't require eliminating all animal products.",
        },
        {
          id: "mississippi-dead-zone",
          title: "Agricultural Runoff Creates 6,000 sq mi Dead Zone",
          description:
            "The Gulf of Mexico 'dead zone' covers approximately 6,334 square miles annually — an area the size of Connecticut and Rhode Island combined. It is primarily caused by nitrogen and phosphorus runoff from agricultural operations in the Mississippi River watershed, with animal manure being the largest single source.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "NOAA, USGS, EPA Gulf of Mexico Hypoxia Task Force",
          reasoning:
            "Well-documented environmental phenomenon with clear causal link to agricultural practices; directness slightly limited as crop agriculture also contributes.",
        },
      ],
    },
  ],
};

// ============================================================================
// Media Bias and Democracy
// ============================================================================

const mediaBiasDemocracyData = {
  id: "media-bias-democracy",
  title: "Media Bias and Democracy",
  meta_claim:
    "Systemic bias in mainstream media is a significant threat to democratic discourse and informed citizenship.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "existence-extent-bias",
      title: "Existence & Extent of Bias",
      short_summary:
        "Studies consistently find media bias. They just disagree about which direction it runs, which says something about the researchers too.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Claims of 'media bias' are often just disagreement with factual reporting that challenges one's priors. Professional journalism has editorial standards, fact-checking processes, and corrections policies. The real threat to informed citizenship is misinformation from unvetted social media and partisan blogs, not mainstream outlets with reputational stakes. Imperfect journalism is still far better than no institutional journalism.",
      proponent_rebuttal:
        "Studies consistently find mainstream media skews left on social issues and right on economic/military issues. Ownership concentration — 6 corporations own approximately 90% of US media — creates structural bias through editorial pressure and story selection. Coverage choices (what to cover, how much airtime, which experts to feature) are inherently biased even when individual facts are correct. Framing effects shape public opinion as powerfully as outright falsehood.",
      crux: {
        id: "quantitative-bias-measurement",
        title: "Quantitative Media Bias Measurement",
        description:
          "Systematic, replicable methodology for measuring bias in media coverage across outlets, topics, and time periods.",
        methodology:
          "Content analysis of story selection, framing, source selection, and language across major outlets. Compare coverage of identical events. Measure deviation from a neutral baseline using computational linguistics and human coding.",
        equation:
          "\\text{Bias Score} = \\frac{\\sum (\\text{Framing}_{i} + \\text{Source Selection}_{i} + \\text{Story Choice}_{i})}{N_{\\text{articles}}}",
        verification_status: "verified" as const,
        cost_to_verify: "$150K (Large-scale content analysis)",
      },
      evidence: [
        {
          id: "groseclose-milyo-study",
          title: "Groseclose & Milyo: Quantitative Media Slant Analysis",
          description:
            "UCLA/University of Missouri study measured media slant by comparing think-tank citations in news outlets to those made by members of Congress with known ideological positions. Found 18 of 20 major outlets had liberal slant, with the average outlet positioned near the average Democrat in Congress. Methodology was innovative but contested.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "Groseclose & Milyo, Quarterly Journal of Economics (2005)",
          reasoning:
            "Peer-reviewed in a top journal, but methodology has been criticized for equating think-tank citations with ideological bias. Replicability limited by methodological choices.",
        },
        {
          id: "allsides-bias-ratings",
          title: "AllSides: Consistent Cross-Partisan Bias Ratings",
          description:
            "AllSides rates media bias using blind surveys, editorial reviews, and third-party data. Results show consistent patterns: outlets like CNN and MSNBC rate center-left to left; Fox News and Daily Wire rate right. Centrist outlets (AP, Reuters) exist but get less viewership. Most Americans consume ideologically aligned media.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "AllSides Media Bias Ratings",
          reasoning:
            "Multi-method approach is useful but ratings are somewhat subjective. The existence of perceived bias doesn't prove harmful impact on democracy.",
        },
        {
          id: "reuters-trust-survey",
          title: "Reuters: Trust in News at Historic Low Globally",
          description:
            "The Reuters Institute Digital News Report (2024) found that only 40% of people globally trust 'most news most of the time,' down from 44% in 2023. In the US, trust is even lower at 32%. Distrust correlates with perceived bias. Young adults (18-24) increasingly rely on social media over traditional news sources.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Reuters Institute for the Study of Journalism",
          reasoning:
            "Highly credible annual survey; low trust is well-documented but doesn't itself prove bias exists — it could reflect audience misperception or media literacy gaps.",
        },
        {
          id: "cjr-standards-analysis",
          title: "CJR: Professional Standards Remain Robust at Top Outlets",
          description:
            "Columbia Journalism Review analysis finds that major outlets (NYT, Washington Post, AP, Reuters) maintain rigorous editorial standards including multi-source verification, corrections policies, and editorial independence from ownership. Error rates are low compared to social media and partisan outlets. Institutional journalism's quality has not meaningfully declined.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Columbia Journalism Review",
          reasoning:
            "CJR is authoritative on journalism standards, though it is part of the media establishment it evaluates. Standards existing doesn't preclude structural bias.",
        },
      ],
    },
    {
      id: "impact-on-democracy",
      title: "Impact on Democracy",
      short_summary:
        "Americans now self-sort into separate information ecosystems. The left and right do not just disagree on opinions -- they disagree on facts.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Media pluralism is at an all-time high with internet access. People can access diverse viewpoints more easily than at any point in history — from international outlets to independent journalists to primary source documents. Blaming media for polarization ignores personal responsibility for information consumption and deeper socioeconomic drivers of political division.",
      proponent_rebuttal:
        "Filter bubbles and algorithmic amplification create echo chambers that reinforce existing beliefs. Trust in media is at historic lows — 32% per Gallup — undermining the shared factual basis democracy requires. Polarized media consumption correlates strongly with political extremism. When citizens cannot agree on basic facts, democratic deliberation becomes impossible.",
      crux: {
        id: "echo-chamber-effect",
        title: "Echo Chamber Causation Analysis",
        description:
          "Determining whether media echo chambers cause political polarization or merely reflect pre-existing divisions.",
        methodology:
          "Randomized controlled trial: expose participants to cross-cutting news for 6 months. Measure attitude polarization, factual knowledge, and democratic engagement before and after. Compare to control group with normal consumption.",
        equation:
          "\\Delta\\text{Polarization} = \\beta_1(\\text{Echo Chamber Exposure}) + \\beta_2(\\text{Pre-existing Ideology}) + \\epsilon",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Large-scale RCT)",
      },
      evidence: [
        {
          id: "gallup-media-trust",
          title: "Gallup: US Media Trust at Historic Low of 32%",
          description:
            "Gallup's annual survey shows that only 32% of Americans trust mass media 'to report the news fully, accurately, and fairly' — the lowest since Gallup began asking in 1972. Trust is highly partisan: 54% among Democrats, 27% among Independents, and 11% among Republicans. This partisan trust gap has tripled since 2000.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Gallup Annual Media Trust Survey",
          reasoning:
            "Gold-standard polling with decades of data; directly documents trust collapse. Directness limited because low trust could reflect media's actual quality decline OR partisan messaging about media.",
        },
        {
          id: "pew-polarization-media",
          title: "Pew: Political Polarization Correlates with Media Diet",
          description:
            "Pew Research Center found that consistent conservatives and consistent liberals have almost entirely non-overlapping media diets. 47% of consistent conservatives name Fox News as their main source; consistent liberals spread across multiple outlets. Those with the most polarized media diets hold the most negative views of the opposing party.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Pew Research Center, 'Political Polarization & Media Habits'",
          reasoning:
            "Rigorous research demonstrating correlation; causation direction (media causes polarization vs. polarized people seek confirming media) remains debated.",
        },
        {
          id: "internet-viewpoint-diversity",
          title: "Internet Access Enables Unprecedented Viewpoint Diversity",
          description:
            "Contrary to echo chamber narratives, studies show internet users encounter MORE diverse viewpoints than non-internet users. Cross-cutting exposure online exceeds that of most offline social networks. People share articles across ideological lines regularly. The 'filter bubble' may be overstated — most people's actual media diets are more diverse than assumed.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Gentzkow & Shapiro, Stanford; Flaxman et al., Oxford",
          reasoning:
            "Peer-reviewed research challenging dominant echo chamber narrative; replicability somewhat limited as online behavior changes rapidly.",
        },
        {
          id: "algorithmic-amplification",
          title: "Algorithmic Amplification Boosts Outrage Content",
          description:
            "Internal Meta research (leaked by Frances Haugen) showed Facebook's algorithm disproportionately amplifies anger-inducing content because it drives engagement. Twitter's own research found its algorithm amplifies right-leaning political content. YouTube's recommendation engine has been shown to progressively suggest more extreme content.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Facebook Papers, Twitter ML Research, Mozilla Foundation",
          reasoning:
            "Internal company data is highly revealing but access is limited; replicability constrained by proprietary algorithms that change frequently.",
        },
      ],
    },
  ],
};

// ============================================================================
// Universal Healthcare
// ============================================================================

const universalHealthcareData = {
  id: "universal-healthcare",
  title: "Universal Healthcare in the US",
  meta_claim:
    "The United States should adopt a universal healthcare system, either single-payer or multi-payer, replacing the current employer-based model.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "cost-efficiency",
      title: "Cost & Efficiency",
      short_summary:
        "The U.S. spends $4.3 trillion on healthcare annually -- 17.3% of GDP. Every country with universal coverage spends less per capita and covers everyone.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Single-payer would cost $32 trillion over 10 years according to Mercatus Center estimates. Government programs are notoriously inefficient — the VA has documented wait times exceeding 30 days for 30% of veterans. Innovation in pharmaceuticals and medical devices would decline without profit incentives: the US produces 44% of global pharmaceutical R&D. You can't add 27 million people and spend less.",
      proponent_rebuttal:
        "The US already spends $4.3 trillion per year on healthcare — more than any country — while covering fewer people. Administrative costs consume 34% of US healthcare spending vs. 17% in Canada. Every other universal system achieves better outcomes at lower per-capita cost. The $32T estimate actually showed savings vs. the current trajectory of $34T+ over the same period. Consolidated purchasing power would reduce drug prices.",
      crux: {
        id: "administrative-savings-calculation",
        title: "Administrative Savings Under Single-Payer",
        description:
          "Calculating whether eliminating private insurance administration, billing complexity, and provider overhead would generate enough savings to cover the currently uninsured.",
        methodology:
          "Compare administrative costs as percentage of total spending: US multi-payer system vs. single-payer systems (Canada, Taiwan). Estimate transition costs and steady-state savings. Model drug price reductions from monopsony purchasing.",
        equation:
          "\\Delta\\text{Cost} = (\\text{Admin Savings} + \\text{Drug Savings}) - (\\text{Newly Covered} \\times \\text{Per Capita Cost})",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (Health economics modeling)",
      },
      evidence: [
        {
          id: "lancet-single-payer-savings",
          title: "Lancet: Single-Payer Would Save $450B Annually",
          description:
            "A 2020 Lancet meta-analysis of 22 single-payer cost analyses found that 19 of 22 predicted net savings. The median estimate was $450B per year in savings, primarily from administrative simplification ($200B) and drug price negotiation ($150B). The study also estimated 68,000 fewer deaths per year from universal coverage.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "The Lancet, Galvani et al. (2020)",
          reasoning:
            "Top-tier medical journal with rigorous methodology; models inherently depend on assumptions about transition efficiency and political implementation.",
        },
        {
          id: "cms-health-expenditure",
          title: "CMS: US Spends $4.3T on Healthcare (18% of GDP)",
          description:
            "The Centers for Medicare & Medicaid Services reports US national health expenditure reached $4.3 trillion in 2023 (17.6% of GDP). Per capita spending is $13,493 — roughly double the OECD average of $6,651. Despite this spending, the US has lower life expectancy and higher infant mortality than peer nations.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "CMS National Health Expenditure Data",
          reasoning:
            "Authoritative government data documenting the spending problem; doesn't directly prove a specific solution would work, but establishes the baseline.",
        },
        {
          id: "va-wait-time-data",
          title: "VA Wait Times Exceed 30 Days for Many Veterans",
          description:
            "The VA Inspector General found that 30% of veterans waited more than 30 days for primary care appointments. Some facilities had average waits exceeding 60 days. The VA scandal of 2014 revealed systematic data falsification to conceal delays. Critics argue this demonstrates government healthcare's inherent inefficiency.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "VA Inspector General, Government Accountability Office",
          reasoning:
            "Well-documented government failures, though the VA is a unique system (direct provision, not insurance) and may not generalize to a Medicare-for-All model.",
        },
        {
          id: "pharma-innovation-comparison",
          title: "US Produces 44% of Global Pharmaceutical R&D",
          description:
            "The US accounts for 44% of global pharmaceutical R&D spending and produces the plurality of new molecular entities approved worldwide. Defenders of the current system argue that high US drug prices effectively subsidize global drug development. Countries with price controls free-ride on US innovation.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "PhRMA, Congressional Research Service",
          reasoning:
            "Valid concern about innovation incentives, but PhRMA data may overstate the link between high prices and R&D (much spending goes to marketing, not research).",
        },
      ],
    },
    {
      id: "quality-access",
      title: "Quality & Access",
      short_summary:
        "Canada has universal coverage and 6-month surgical wait times. The U.S. has no waits for those who can pay and 28 million uninsured who cannot.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The US leads in cancer survival rates (5-year survival: 67% vs. 55% in UK). American medical innovation — from mRNA vaccines to robotic surgery — leads the world. Wait times in universal systems are significant: median 27.7 weeks for specialist care in Canada. People cross borders TO the US for specialized care. Equalizing access often means equalizing down.",
      proponent_rebuttal:
        "27 million Americans are uninsured and 40% skip needed care due to cost. The US ranks dead last among 11 wealthy nations on the Commonwealth Fund healthcare scorecard. Infant mortality (5.4/1,000) exceeds all peer nations. Life expectancy (77.5 years) is 3+ years below comparable countries. Medical debt is the #1 cause of personal bankruptcy — 530,000 families per year.",
      crux: {
        id: "outcomes-comparison",
        title: "Risk-Adjusted Health Outcomes Comparison",
        description:
          "Comprehensive comparison of health outcomes between the US and universal healthcare countries, controlling for demographics, lifestyle factors, and measurement differences.",
        methodology:
          "Compare outcomes (life expectancy, infant mortality, preventable death rates, patient satisfaction) across US vs. countries with universal systems. Control for obesity, gun violence, drug overdoses, and income inequality.",
        equation:
          "\\text{System Quality} = \\frac{\\sum \\text{Health Outcomes}_{\\text{adjusted}}}{\\text{Per Capita Spending}}",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (International comparative analysis)",
      },
      evidence: [
        {
          id: "commonwealth-fund-ranking",
          title: "Commonwealth Fund: US Ranks Last Among 11 Nations",
          description:
            "The Commonwealth Fund's 2024 Mirror, Mirror report ranks the US last overall among 11 high-income countries on healthcare performance. The US ranks last in access, equity, and health outcomes, despite spending the most. Australia, the Netherlands, and the UK top the rankings. The US's only above-average ranking is in care process quality.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Commonwealth Fund, 'Mirror, Mirror' (2024)",
          reasoning:
            "Well-regarded comparative study with transparent methodology; somewhat limited by the Commonwealth Fund's known advocacy for universal coverage.",
        },
        {
          id: "oecd-health-outcomes",
          title: "OECD: US Lags Peers on Life Expectancy and Infant Mortality",
          description:
            "OECD data shows US life expectancy at 77.5 years, 3.2 years below the OECD average of 80.7. US infant mortality is 5.4 per 1,000 live births vs. OECD average of 4.5. The US has the highest rate of preventable deaths (amenable mortality) among wealthy nations at 112 per 100,000 vs. 55 in France.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "OECD Health Statistics",
          reasoning:
            "Highly reliable international data; directness limited because US outcomes reflect many factors beyond healthcare system design (gun violence, obesity, drug overdoses).",
        },
        {
          id: "us-cancer-survival",
          title: "US Leads in Cancer Survival Rates",
          description:
            "The US has the highest 5-year cancer survival rates among wealthy nations for most cancers. Breast cancer: 90% (US) vs. 85% (OECD). Colon cancer: 65% vs. 60%. The US leads in early detection, access to cutting-edge treatments, and clinical trial participation. For serious conditions, the US healthcare system delivers world-class care.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "CONCORD Global Surveillance, Lancet Oncology",
          reasoning:
            "Genuine US advantage; may partly reflect lead-time bias (earlier detection inflates survival stats without improving mortality) and selective access.",
        },
        {
          id: "medical-bankruptcy-data",
          title: "Medical Debt Causes 530,000 Bankruptcies Annually",
          description:
            "American Journal of Public Health research found that 66.5% of US bankruptcies are tied to medical issues — either medical bills directly or income loss due to illness. This translates to approximately 530,000 families per year. No other wealthy nation has medical bankruptcy. 79 million Americans have medical debt or are paying off medical bills.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "American Journal of Public Health, Himmelstein et al.",
          reasoning:
            "Widely cited peer-reviewed study; some methodological debate about how to attribute bankruptcy causation, but the scale of medical debt is undeniable.",
        },
      ],
    },
  ],
};

// ============================================================================
// Open Borders
// ============================================================================

const openBordersData = {
  id: "open-borders",
  title: "The Case for Open Borders",
  meta_claim:
    "Significantly relaxing or eliminating immigration restrictions would produce massive economic gains and is morally justified.",
  status: "highly_speculative" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "economic-arguments",
      title: "Economic Arguments",
      short_summary:
        "Economists estimate open borders could double world GDP. The question nobody can model: what happens to social trust and welfare states?",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Open borders would create unsustainable fiscal pressure on welfare states — healthcare, education, and social services would be overwhelmed. Wage depression for low-skilled native workers would be severe: Borjas estimates a 3-4% wage decline per 10% increase in labor supply. Housing crises would worsen dramatically in destination cities already facing shortages.",
      proponent_rebuttal:
        "Economists estimate open borders could double world GDP — what Clemens calls 'trillion-dollar bills on the sidewalk.' Geographic restrictions on labor are the largest remaining market distortion in the global economy. Immigrants are net fiscal contributors over their lifetimes in most studies. EU free movement between vastly different economies (Germany, Romania) produced manageable migration and mutual prosperity rather than collapse.",
      crux: {
        id: "gdp-gains-estimation",
        title: "Global GDP Gains from Labor Mobility",
        description:
          "Estimating the actual economic gains from substantially liberalizing global labor mobility, accounting for fiscal impacts, wage effects, and transition costs.",
        methodology:
          "Extend models of EU free movement to global scenario. Calculate productivity gains from labor reallocation. Model fiscal impacts on destination countries. Estimate wage effects across skill levels. Account for housing, infrastructure, and integration costs.",
        equation:
          "\\Delta\\text{GDP}_{\\text{world}} = \\sum_{i,j} (\\text{MPL}_j - \\text{MPL}_i) \\times \\Delta L_{i \\to j} - \\text{Transition Costs}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Global economic modeling)",
      },
      evidence: [
        {
          id: "clemens-gdp-estimates",
          title: "Clemens: Open Borders Could Double World GDP",
          description:
            "Economist Michael Clemens's survey of four independent economic models found that open borders would increase world GDP by 50-150%, with a median estimate near 100% (doubling). The gains come primarily from moving workers from low-productivity to high-productivity environments. Even a 10% liberalization of barriers would yield trillions in gains.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source: "Clemens, 'Economics and Emigration,' Journal of Economic Perspectives (2011)",
          reasoning:
            "Published in a top economics journal, but models are highly theoretical and extrapolate from marginal changes to revolutionary ones. Real-world frictions would reduce gains substantially.",
        },
        {
          id: "borjas-wage-impact",
          title: "Borjas: Immigration Depresses Low-Skill Wages 3-4%",
          description:
            "Harvard economist George Borjas's research found that a 10% increase in labor supply from immigration reduces wages for competing native workers by 3-4%. The impact is concentrated among high school dropouts and disproportionately affects Black and Hispanic low-wage workers. Open borders would represent far more than a 10% increase.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Borjas, 'Immigration Economics,' Harvard University Press",
          reasoning:
            "Respected labor economist with rigorous methodology; findings are contested by Card and others who find smaller wage effects. Extrapolation to open borders is speculative.",
        },
        {
          id: "eu-free-movement-data",
          title: "EU Free Movement Produced Manageable Migration",
          description:
            "When the EU expanded free movement to Eastern Europe (2004-2007), predictions of mass migration were largely wrong. Only 2-3% of Eastern Europeans moved West. Both sending and receiving countries experienced economic growth. Wages in Eastern Europe rose while Western European wage effects were minimal. The experience suggests fears of open borders are overstated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "European Commission, Kahanec & Zimmermann (IZA)",
          reasoning:
            "Real-world natural experiment with credible data; replicability limited because EU members shared cultural proximity and institutional convergence that wouldn't apply globally.",
        },
        {
          id: "fiscal-impact-analyses",
          title: "Fiscal Impact Meta-Analyses Show Mixed Results",
          description:
            "Meta-analyses of immigration's fiscal impact show wide variation: the National Academy of Sciences found a net positive fiscal impact of $259K per immigrant over 75 years, but negative impact in the short term at state/local level. Low-skilled immigrants are net fiscal drains for 15-20 years before becoming net contributors. Results are highly sensitive to assumptions about discount rates and public goods.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "National Academy of Sciences, 'The Economic and Fiscal Consequences of Immigration'",
          reasoning:
            "Authoritative source; the mixed results and sensitivity to assumptions make this evidence cut both ways, leaning against given short-term fiscal pressures under open borders.",
        },
      ],
    },
    {
      id: "moral-security-considerations",
      title: "Moral & Security Considerations",
      short_summary:
        "If you think borders are morally arbitrary, open borders follow logically. If you think nations have the right to self-determination, they do not.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Sovereign nations have the right and duty to control their borders — this is foundational to the nation-state system. Open borders are incompatible with welfare states, as Milton Friedman argued. Security screening requires controlled entry points and manageable volumes. Cultural integration requires manageable flows to prevent parallel societies and social fragmentation.",
      proponent_rebuttal:
        "Restricting movement based on birth location is arbitrary discrimination — morally analogous to restricting rights based on race or gender. The 'birthplace lottery' is the largest determinant of lifetime income, dwarfing all other factors. Brain drain concerns are overstated; remittances ($656B in 2022) vastly outweigh foreign aid ($204B). Illegal immigration exists precisely BECAUSE legal pathways are too narrow — open borders would eliminate it.",
      crux: {
        id: "moral-framework-analysis",
        title: "Moral Framework for Freedom of Movement",
        description:
          "Evaluating whether freedom of movement across borders is a fundamental human right that should be limited only by compelling state interests, or whether states have strong prima facie rights to exclude.",
        methodology:
          "Philosophical analysis comparing freedom of movement to other recognized freedoms. Empirical examination of whether controlled borders actually achieve their stated goals (security, fiscal sustainability, cultural cohesion) more effectively than open alternatives.",
        equation:
          "\\text{Moral Permissibility} = f(\\text{Rights Restricted}, \\text{Harm Prevented}, \\text{Alternatives Available})",
        verification_status: "theoretical" as const,
        cost_to_verify: "N/A (Normative philosophical question)",
      },
      evidence: [
        {
          id: "carens-philosophical-case",
          title: "Carens: The Ethics of Immigration",
          description:
            "Philosopher Joseph Carens argues that liberal democratic principles logically require open borders. If we believe in moral equality of persons and freedom of movement within nations, extending these principles across borders is the only consistent position. Closed borders are the modern equivalent of feudal restrictions on peasant movement.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source: "Carens, 'The Ethics of Immigration,' Oxford University Press (2013)",
          reasoning:
            "Influential and well-argued philosophical work; replicability is low because philosophical arguments aren't empirically testable. Directness limited by the gap between normative theory and policy.",
        },
        {
          id: "friedman-welfare-argument",
          title: "Friedman: Open Borders Incompatible with Welfare State",
          description:
            "Milton Friedman argued that 'you can have open borders or a welfare state, but not both.' The logic: generous social benefits attract disproportionate migration by those who would consume more than they contribute. This creates a fiscal death spiral. Most open borders advocates acknowledge this tension but propose solutions (delayed access to benefits, earned citizenship).",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "Milton Friedman, various interviews and lectures",
          reasoning:
            "Compelling theoretical argument from a Nobel laureate; empirical support is mixed (EU experience partially contradicts it). The tension is real even if not absolute.",
        },
        {
          id: "remittance-vs-aid-data",
          title: "Remittances ($656B) Dwarf Foreign Aid ($204B)",
          description:
            "World Bank data shows that remittances to low- and middle-income countries reached $656B in 2022 — more than 3x total foreign aid ($204B) and exceeding foreign direct investment. Remittances go directly to families, have lower overhead, and are countercyclical (increase during recipient-country crises). Migration is the most effective anti-poverty tool available.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "World Bank Migration and Remittances Data",
          reasoning:
            "Highly reliable data demonstrating migration's development impact; directness limited because current remittance flows occur under restricted migration, not open borders.",
        },
        {
          id: "border-security-cost-effectiveness",
          title: "Border Enforcement Costs $20B+/Year with Limited Effectiveness",
          description:
            "US Customs and Border Protection's budget exceeds $20B annually. Despite this spending, an estimated 10-11 million undocumented immigrants live in the US. A 2019 Cato Institute analysis found that border walls and enforcement have not significantly reduced unauthorized immigration — they have redirected flows to more dangerous routes and reduced circular migration.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          source: "CBP Budget Data, Cato Institute",
          reasoning:
            "Demonstrates enforcement limitations, but Cato has a known libertarian/pro-immigration stance. The evidence argues against current enforcement but doesn't directly support fully open borders.",
        },
      ],
    },
  ],
};

// ============================================================================
// Cancel Culture Topic
// ============================================================================

const cancelCultureData = {
  id: "cancel-culture",
  title: "Cancel Culture",
  meta_claim:
    "Cancel culture — public shaming and professional consequences for controversial speech — does more harm than good to public discourse.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "free-expression-accountability",
      title: "Free Expression vs. Accountability",
      short_summary:
        "A single tweet can end a career. The question is whether that power functions as accountability or as mob justice with no appeals process.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "\"Cancel culture\" is just accountability with a new name. Marginalized groups finally have tools to challenge powerful people who previously faced no consequences. The supposedly \"canceled\" almost always keep their platforms, wealth, and influence. Social consequences for speech have always existed — this is democracy, not tyranny.",
      proponent_rebuttal:
        "Fear of cancellation creates a measurable chilling effect on public discourse. Pew Research shows 62% of Americans say the political climate prevents them from sharing their views. Disproportionate punishment — losing a career over a single tweet from a decade ago — violates basic proportionality. Mob justice operates without due process, presumption of innocence, or right of appeal.",
      crux: {
        id: "chilling-effect-measurement",
        title: "Quantifying the Chilling Effect on Public Discourse",
        description:
          "Measuring whether fear of social media backlash measurably reduces the diversity and honesty of publicly expressed viewpoints across institutional and public settings.",
        methodology:
          "Compare self-reported willingness to express views (Pew, FIRE surveys) with behavioral data: op-ed submission rates, academic paper topic diversity, and public comment participation rates over time. Control for political climate and platform changes.",
        equation:
          "\\text{Chilling Index} = 1 - \\frac{\\text{Expressed View Diversity}_{t}}{\\text{Privately Held View Diversity}_{t}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Multi-year survey and behavioral tracking study)",
      },
      evidence: [
        {
          id: "pew-self-censorship",
          title: "Pew: 62% of Americans Self-Censor Political Views",
          description:
            "A 2020 Pew Research Center survey found that 62% of Americans say the political climate prevents them from sharing their views. This crosses party lines: 77% of conservatives, 64% of moderates, and 52% of liberals report self-censoring.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Pew Research Center",
          reasoning:
            "Highly credible nonpartisan source. Self-reported censorship is strong evidence of chilling effect, though self-reports may overstate actual behavior change.",
        },
        {
          id: "fire-campus-speech-survey",
          title: "FIRE: 63% of College Students Self-Censor on Campus",
          description:
            "The Foundation for Individual Rights and Expression's 2023 campus speech climate survey found 63% of students reported self-censoring in class or on campus. Students reported fear of social ostracism more than institutional punishment.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "FIRE (Foundation for Individual Rights and Expression)",
          reasoning:
            "Focused specifically on speech climate among young adults. FIRE has a pro-speech orientation but methodology is sound and sample sizes are large.",
        },
        {
          id: "canceled-people-outcomes",
          title: "Most 'Canceled' Public Figures Retain Platforms",
          description:
            "Analysis of high-profile cancellation attempts shows the vast majority of targeted public figures retained or regained their platforms. J.K. Rowling, Dave Chappelle, Joe Rogan, and others saw no lasting professional consequences. Many saw increased audience engagement post-controversy.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Various media analyses",
          reasoning:
            "Demonstrates that cancellation is often ineffective for the powerful, though survivorship bias means we don't see cases where people quietly disappeared.",
        },
        {
          id: "historical-accountability-comparison",
          title: "Historical Accountability Movements Comparison",
          description:
            "Social consequences for speech have always existed — boycotts, public shaming, and social ostracism predate the internet. The Civil Rights movement used boycotts and public pressure to force change. The mechanism is the same; only the speed and scale differ.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Historical analysis, academic literature",
          reasoning:
            "Contextualizes cancel culture within a long tradition of social accountability. Less direct because scale and speed may change the qualitative nature of the phenomenon.",
        },
      ],
    },
    {
      id: "social-cultural-impact",
      title: "Social & Cultural Impact",
      short_summary:
        "62% of Americans say the political climate prevents them from sharing their views. Self-censorship may be rational, but it is not free speech.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Power structures need disruption, and social media gives marginalized people tools to fight back. #MeToo removed actual predators who operated with impunity for decades. Cultural shift toward inclusion requires discomfort. Cancel culture is overstated — most 'cancelations' are temporary, and the discourse about cancel culture is louder than the phenomenon itself.",
      proponent_rebuttal:
        "Cancel culture disproportionately hits ordinary people without the resources, legal teams, or platforms to fight back. It enforces ideological conformity rather than genuine progress — people learn to perform the correct opinions rather than examine their beliefs. Fear-based compliance is not the same as changed minds and may actually increase hidden resentment.",
      crux: {
        id: "ordinary-vs-powerful-impact",
        title: "Differential Impact on Ordinary vs. Powerful People",
        description:
          "Measuring whether public shaming campaigns disproportionately affect ordinary individuals compared to powerful public figures, and whether outcomes differ based on the target's resources.",
        methodology:
          "Track cancellation campaigns across social media, categorize targets by public profile (celebrity, executive, ordinary person), and measure outcomes (job loss, mental health impact, recovery time) across categories.",
        equation:
          "\\text{Impact Ratio} = \\frac{P(\\text{lasting harm} | \\text{ordinary})}{P(\\text{lasting harm} | \\text{powerful})}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$300K (Social media analysis and longitudinal follow-up study)",
      },
      evidence: [
        {
          id: "metoo-predator-removal",
          title: "#MeToo Removed Powerful Predators",
          description:
            "The #MeToo movement led to the removal of Harvey Weinstein, Larry Nassar, Bill Cosby, and hundreds of other predators who had operated with institutional protection. Workplace sexual harassment complaints increased 12% in the year following #MeToo, suggesting previously silenced victims felt empowered to report.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "EEOC data, journalistic investigations",
          reasoning:
            "Demonstrates the positive accountability function of public pressure campaigns. Strong evidence that social media mobilization can address real abuses of power.",
        },
        {
          id: "ordinary-person-cancelation-cases",
          title: "Ordinary People Suffer Disproportionate Consequences",
          description:
            "Case studies of non-public figures — a data analyst fired for sharing an academic study, a school principal removed over a yearbook quote, a small business owner boycotted over a political donation — show that ordinary people face devastating consequences with no mechanism for rehabilitation or appeal.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 9,
          },
          source: "The New York Times, The Atlantic, various case reporting",
          reasoning:
            "Directly illustrates the disproportionate impact on non-public figures, though case studies are inherently cherry-picked and may not represent typical outcomes.",
        },
        {
          id: "ideological-conformity-survey",
          title: "Institutional Ideological Conformity Is Increasing",
          description:
            "A 2023 survey of university faculty found 75% of conservative-leaning professors hide their political views, compared to 15% of liberal-leaning faculty. Corporate DEI statements became near-universal after 2020 with 91% of Fortune 500 companies issuing them, regardless of substantive policy changes.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "CSPI Academic Freedom Survey, Fortune 500 analysis",
          reasoning:
            "Suggests conformity pressure in institutions, though causation is difficult to isolate from genuine attitude shifts.",
        },
        {
          id: "social-media-mob-dynamics",
          title: "Social Media Amplification Creates Disproportionate Pile-ons",
          description:
            "Research on social media dynamics shows that outrage spreads faster and further than other emotions. A single viral tweet can generate millions of impressions in hours. The original context is often lost, nuance is impossible, and the target experiences the aggregate of thousands of individual responses as a coordinated attack.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Brady et al., Yale, Proceedings of the National Academy of Sciences",
          reasoning:
            "Strong empirical research on outrage amplification mechanisms. Slightly less direct because it describes the mechanism rather than measuring specific harm.",
        },
      ],
    },
  ],
};

// ============================================================================
// Big Tech Antitrust Topic
// ============================================================================

const bigTechAntitrustData = {
  id: "big-tech-antitrust",
  title: "Breaking Up Big Tech",
  meta_claim:
    "Major technology companies (Google, Apple, Amazon, Meta) should be broken up or heavily regulated to restore competition and protect consumers.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "market-power-competition",
      title: "Market Power & Competition",
      short_summary:
        "Google holds 90% of search, Apple and Google split mobile OS, Amazon handles 40% of e-commerce. Standard Oil had less market share when it was broken up.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Big tech companies got big by building products people love. Network effects are natural, not anti-competitive. Breaking them up would destroy value and convenience for consumers who benefit from integrated ecosystems. European regulation hasn't produced European tech champions — it has just added bureaucracy.",
      proponent_rebuttal:
        "Google controls 90%+ of search, Apple and Google control 99% of mobile OS, Amazon is both the marketplace and the competitor on it. This is textbook monopoly power. Startup formation has declined as incumbents acquire or copy every competitive threat. The DOJ's antitrust case against Google found it paid $26B annually to maintain its search default — that's not organic preference, it's a moat bought with monopoly profits.",
      crux: {
        id: "consumer-harm-measurement",
        title: "Measuring Consumer Harm in Zero-Price Markets",
        description:
          "Determining whether consumers are harmed by tech monopolies when the services are free, requiring new frameworks beyond the traditional price-based antitrust analysis.",
        methodology:
          "Develop and apply a quality-adjusted consumer welfare metric that accounts for privacy loss, reduced innovation, attention extraction, and forgone alternatives. Compare actual market outcomes with counterfactual competitive markets.",
        equation:
          "\\text{Consumer Harm} = \\sum (\\text{Privacy Loss} + \\text{Innovation Deficit} + \\text{Attention Tax}) - \\text{Free Service Value}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Economic modeling and empirical market analysis)",
      },
      evidence: [
        {
          id: "doj-google-monopoly",
          title: "DOJ v. Google: Court Finds Illegal Monopoly",
          description:
            "In August 2024, a federal judge ruled that Google illegally maintained a monopoly in search and search advertising. The court found Google paid $26.3 billion in 2021 alone to be the default search engine, foreclosing competition. Google controls 89.2% of general search and 94.9% on mobile.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 10,
          },
          source: "U.S. District Court, DOJ Antitrust Division",
          reasoning:
            "A federal court ruling after extensive trial is among the most authoritative forms of evidence. Directly establishes illegal monopoly maintenance.",
        },
        {
          id: "startup-formation-decline",
          title: "Tech Startup Formation Has Declined as Big Tech Grew",
          description:
            "Research shows venture capital investment in startups competing with Big Tech's core businesses declined by 40% between 2010-2022. The 'kill zone' effect — where investors avoid funding companies that compete with platform giants — is well documented. Acquisition of nascent competitors (Instagram, WhatsApp, Waze) removes future competition.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "National Bureau of Economic Research, Stigler Center",
          reasoning:
            "Multiple independent sources document the investment decline, though causation versus correlation is debated.",
        },
        {
          id: "eu-dma-early-results",
          title: "EU Digital Markets Act Shows Early Regulatory Impact",
          description:
            "The EU's Digital Markets Act (2024) forced Apple to allow sideloading, Google to unbundle search from Android, and Amazon to separate marketplace and retail divisions in Europe. Early data shows modest increases in alternative app store usage and third-party payment adoption.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "European Commission, DMA compliance reports",
          reasoning:
            "Real-world regulatory experiment providing early evidence that structural intervention can open markets, though long-term effects are uncertain.",
        },
        {
          id: "consumer-surplus-integration",
          title: "Platform Integration Creates Substantial Consumer Value",
          description:
            "Estimates suggest Google's free services (Search, Maps, Gmail, YouTube) generate $15,000-$20,000 in annual consumer surplus per user. Apple's integrated ecosystem (hardware, software, services) consistently scores highest in customer satisfaction. Breaking up these ecosystems would destroy the integration that consumers value.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "Brynjolfsson et al., MIT; American Customer Satisfaction Index",
          reasoning:
            "Consumer surplus estimates are methodologically contested, and partly funded by industry. But the directness of the consumer value argument is clear.",
        },
      ],
    },
    {
      id: "data-privacy-democracy",
      title: "Data Privacy & Democracy",
      short_summary:
        "Five companies know more about you than your government does -- your location, purchases, messages, and browsing history. None of them were elected.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Users voluntarily share data in exchange for free services — it's a fair trade. Regulation creates compliance overhead that paradoxically favors incumbents over smaller competitors. Self-regulation and market pressure are already working: Apple's privacy pivot proves consumers can reward privacy-respecting companies.",
      proponent_rebuttal:
        "Surveillance capitalism monetizes personal data without meaningful consent — 'agree to all cookies' is not informed choice. Platform algorithms amplify outrage and division because engagement equals revenue. Political ad micro-targeting undermines democratic discourse by showing different realities to different voters. No individual can meaningfully opt out of the digital economy.",
      crux: {
        id: "informed-consent-data-economy",
        title: "Meaningful Consent in the Data Economy",
        description:
          "The average terms of service is 7,000 words. Nobody reads them. Can you consent to something you have never read?",
        methodology:
          "Survey users on their understanding of data practices, measure the time required to read all privacy policies encountered annually, and test whether informed users would change their behavior.",
        equation:
          "\\text{Consent Quality} = \\frac{\\text{User Understanding}}{\\text{Actual Data Use}} \\times P(\\text{behavior change if informed})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$400K (Large-scale behavioral experiment)",
      },
      evidence: [
        {
          id: "surveillance-capitalism-analysis",
          title: "Zuboff: Surveillance Capitalism Extracts Behavioral Surplus",
          description:
            "Shoshana Zuboff's analysis documents how tech companies systematically extract 'behavioral surplus' — data beyond what's needed to improve services — to predict and modify human behavior for advertisers. This creates an unprecedented asymmetry of knowledge and power.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Shoshana Zuboff, Harvard Business School",
          reasoning:
            "Influential academic framework from a credible institution. Somewhat theoretical but grounded in extensive documentation of industry practices.",
        },
        {
          id: "cambridge-analytica-investigation",
          title: "Cambridge Analytica Exposed Data Misuse at Scale",
          description:
            "The 2018 Cambridge Analytica scandal revealed that Facebook allowed a third-party app to harvest data from 87 million users without consent, which was then used for political micro-targeting. Facebook was fined $5 billion by the FTC — the largest privacy fine in history at the time.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source: "FTC, UK Information Commissioner's Office, Senate Intelligence Committee",
          reasoning:
            "Well-documented, multi-jurisdictional investigation with regulatory findings. Directly demonstrates data misuse and democratic manipulation.",
        },
        {
          id: "apple-privacy-pivot",
          title: "Apple's Privacy Pivot Shows Market Self-Correction",
          description:
            "Apple's App Tracking Transparency (ATT) feature, launched in 2021, allowed users to opt out of cross-app tracking. 96% of US users opted out, costing Meta an estimated $10B in annual revenue. This demonstrates that market competition and consumer choice can protect privacy without government intervention.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Apple, Lotame, Financial Times analysis",
          reasoning:
            "Compelling example of market-driven privacy protection. Independence somewhat limited because Apple has its own competitive motives for restricting competitors' data access.",
        },
        {
          id: "gdpr-compliance-cost-disparity",
          title: "GDPR Compliance Costs Disproportionately Burden Small Companies",
          description:
            "Studies show GDPR compliance costs averaged $1.3M for large companies but $150K for small companies — a far larger burden as a percentage of revenue. Google and Facebook's EU market share actually increased post-GDPR as smaller competitors struggled with compliance overhead.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "DataGrail, IAPP (International Association of Privacy Professionals)",
          reasoning:
            "Credible data on the unintended consequences of regulation. Directly relevant to whether antitrust regulation could backfire.",
        },
      ],
    },
  ],
};

// ============================================================================
// Minimum Wage Effects Topic
// ============================================================================

const minimumWageEffectsData = {
  id: "minimum-wage-effects",
  title: "Raising the Minimum Wage",
  meta_claim:
    "Raising the federal minimum wage to $15/hour or higher would significantly benefit low-wage workers without causing substantial job losses.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "employment-effects",
      title: "Employment Effects",
      short_summary:
        "Card and Krueger found no job losses from minimum wage hikes. The restaurant industry's own data says otherwise. The debate has raged for 30 years.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The Congressional Budget Office estimates a $15 federal minimum would eliminate 1.4 million jobs. Small businesses operate on thin margins and cannot absorb a 107% increase from $7.25. Automation accelerates as labor costs rise — self-checkout kiosks, ordering apps, and robotic food prep replace minimum wage workers. Labor-intensive industries like restaurants and retail are most vulnerable.",
      proponent_rebuttal:
        "Card and Krueger's 1994 natural experiment found no job losses when New Jersey raised its minimum wage while neighboring Pennsylvania did not. Seattle's $15 minimum wage, the most studied increase ever, showed minimal employment effects. The majority of modern minimum wage studies find small or no negative employment impact — the old textbook model of large job losses is not supported by empirical evidence.",
      crux: {
        id: "employment-elasticity-measurement",
        title: "Employment Elasticity at High Minimum Wage Levels",
        description:
          "Determining the employment elasticity of minimum wage increases at levels significantly above the current federal minimum, where historical data is limited.",
        methodology:
          "Natural experiments comparing employment trends in counties/states that raised minimum wages to $15+ versus neighboring jurisdictions that did not. Use synthetic control methods and border discontinuity designs.",
        equation:
          "\\epsilon = \\frac{\\%\\Delta \\text{Employment}}{\\%\\Delta \\text{Minimum Wage}}",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (Analysis of existing state/county employment data)",
      },
      evidence: [
        {
          id: "card-krueger-nj-study",
          title: "Card & Krueger: No Job Losses in NJ Minimum Wage Increase",
          description:
            "David Card and Alan Krueger's 1994 landmark study compared fast-food employment in New Jersey (which raised its minimum wage from $4.25 to $5.05) to neighboring Pennsylvania. They found no reduction in employment — in fact, NJ employment slightly increased. This challenged decades of textbook economic theory.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Card & Krueger, American Economic Review",
          reasoning:
            "Nobel Prize-winning research that fundamentally changed the empirical debate. Extremely influential, though it studied a modest increase from a low baseline.",
        },
        {
          id: "cbo-15-minimum-analysis",
          title: "CBO: $15 Minimum Would Cost 1.4 Million Jobs",
          description:
            "The Congressional Budget Office's 2021 analysis estimated a $15 federal minimum wage by 2025 would raise wages for 17 million workers and lift 900,000 out of poverty, but would reduce employment by 1.4 million workers (a range of 0 to 2.7 million). The median estimate is a net positive but with significant displacement.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "Congressional Budget Office",
          reasoning:
            "Nonpartisan, authoritative source. The wide confidence interval (0 to 2.7M) reflects genuine uncertainty in the evidence base.",
        },
        {
          id: "seattle-minimum-wage-study",
          title: "Seattle $15 Minimum: Mixed but Mostly Positive Results",
          description:
            "The University of Washington's multi-year study of Seattle's $15 minimum wage found hours worked decreased slightly for low-wage workers, but total earnings increased. Workers earning under $19/hour saw a net wage gain of $8-$12/week. Some workers lost employment, but most benefited.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "University of Washington, NBER Working Paper",
          reasoning:
            "The most comprehensive study of a high minimum wage increase. Results are nuanced — some negative effects but net positive for most workers.",
        },
        {
          id: "dube-border-county-analysis",
          title: "Dube et al.: Border County Analysis Shows Minimal Job Losses",
          description:
            "Arindrajit Dube and colleagues compared employment in all contiguous county pairs straddling state borders with different minimum wages. Across hundreds of natural experiments, they found minimum wage increases raised wages without detectable employment losses in the restaurant and retail sectors.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Dube, Lester & Reich, Review of Economics and Statistics",
          reasoning:
            "Methodologically innovative and widely replicated. The border-county design controls for regional economic conditions better than previous methods.",
        },
      ],
    },
    {
      id: "poverty-economic-effects",
      title: "Poverty & Economic Effects",
      short_summary:
        "A $15 minimum wage would raise pay for 17 million workers. The CBO estimates 1.3 million would lose their jobs. Both numbers are in the same report.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Only 1.1% of workers currently earn the federal minimum wage. Most minimum wage earners are teenagers and secondary earners, not family breadwinners. The Earned Income Tax Credit (EITC) is a more targeted and effective poverty reduction tool. Higher wages get passed to consumers as higher prices, disproportionately affecting the low-income people the policy is supposed to help.",
      proponent_rebuttal:
        "While only 1.1% earn exactly $7.25, 30% of US workers — 42 million people — earn under $15/hour. The minimum wage hasn't kept pace with productivity since 1968; if it had, it would be over $24/hour today. Higher wages reduce employee turnover (saving businesses recruitment costs), increase worker productivity, and boost consumer spending. Australia's $23/hour minimum wage hasn't caused economic collapse — its unemployment rate is comparable to America's.",
      crux: {
        id: "poverty-reduction-efficiency",
        title: "Minimum Wage vs. EITC Poverty Reduction Efficiency",
        description:
          "Comparing the poverty reduction efficiency of minimum wage increases versus Earned Income Tax Credit expansion, accounting for both direct effects and behavioral responses.",
        methodology:
          "Simulate the poverty impact of a $15 minimum wage versus equivalent-cost EITC expansion using CPS microdata. Compare coverage, targeting accuracy, take-up rates, and behavioral responses (labor force participation, hours worked).",
        equation:
          "\\text{Efficiency} = \\frac{\\Delta \\text{Poverty Rate}}{\\text{Total Cost to Economy}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$150K (Microsimulation using existing survey data)",
      },
      evidence: [
        {
          id: "bls-wage-distribution",
          title: "BLS: 42 Million Workers Earn Under $15/Hour",
          description:
            "Bureau of Labor Statistics data shows that while only 1.1% of workers earn exactly the federal minimum of $7.25, approximately 30% of the US workforce — 42 million people — earn less than $15/hour. This includes 55% of Black workers and 60% of Hispanic workers under 25.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Bureau of Labor Statistics",
          reasoning:
            "Authoritative government data that reframes the debate from the narrow '1.1%' figure to the much larger population earning below proposed minimums.",
        },
        {
          id: "productivity-wage-divergence",
          title: "Worker Productivity Has Outpaced Wages Since 1968",
          description:
            "Economic Policy Institute data shows worker productivity grew 64.6% from 1979 to 2019, while hourly compensation grew only 17.5%. If the minimum wage had tracked productivity since 1968, it would exceed $24/hour today. The divergence represents a massive transfer of value from workers to owners and shareholders.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Economic Policy Institute",
          reasoning:
            "Well-documented macroeconomic trend. EPI leans progressive, but the productivity-wage divergence is confirmed by BLS data. Directness is limited because the moral argument doesn't prove $15 is the right number.",
        },
        {
          id: "australia-high-minimum-wage",
          title: "Australia's $23/Hour Minimum Hasn't Caused Economic Collapse",
          description:
            "Australia's national minimum wage of AUD $23.23/hour (~$15.50 USD) is the world's highest. Australia's unemployment rate (3.7%) is comparable to the US (3.7%). Its restaurant and retail sectors function normally. This suggests high minimum wages are compatible with a healthy economy.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "Fair Work Commission (Australia), OECD",
          reasoning:
            "Compelling international comparison, but replicability is limited by significant structural differences between the Australian and US economies (universal healthcare, different labor market institutions).",
        },
        {
          id: "eitc-comparison-effectiveness",
          title: "EITC Is a More Targeted Poverty Reduction Tool",
          description:
            "The Earned Income Tax Credit lifts 5.6 million people out of poverty annually, making it the largest anti-poverty program for working families. Unlike the minimum wage, the EITC targets benefits to families with children based on income, avoids employer cost increases, and incentivizes labor force participation. Studies show the EITC has higher poverty reduction per dollar than minimum wage increases.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Center on Budget and Policy Priorities, IRS data",
          reasoning:
            "Strong evidence that the EITC is more efficient at targeting poverty. However, the EITC and minimum wage are not mutually exclusive — many economists advocate for both.",
        },
      ],
    },
  ],
};

// ============================================================================
// Gene Editing Human Embryos Topic
// ============================================================================

const geneEditingEmbryosData = {
  id: "gene-editing-embryos",
  title: "Gene Editing Human Embryos",
  meta_claim:
    "Germline gene editing of human embryos (using CRISPR or similar) should be permitted for preventing serious genetic diseases.",
  status: "highly_speculative" as const,
  category: "science" as const,
  pillars: [
    {
      id: "medical-promise-safety",
      title: "Medical Promise vs. Safety",
      short_summary:
        "CRISPR can delete the gene for sickle cell disease. It can also make off-target edits we cannot predict. The first gene-edited babies were born in 2018; the scientist went to prison.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "He Jiankui's 2018 experiment showed the technology is not ready — off-target edits had unknown effects on the twin girls born from the procedure. Germline changes are irreversible and affect all future generations. We don't understand gene interactions (pleiotropy, epistasis) well enough to predict consequences. Preimplantation genetic testing (PGT-M) already allows screening for most genetic diseases without modifying the genome.",
      proponent_rebuttal:
        "CRISPR could eliminate Huntington's disease, sickle cell anemia, cystic fibrosis, and thousands of other genetic diseases that cause immense suffering. The technology is advancing rapidly — off-target rates have dropped dramatically since 2018. Base editing and prime editing offer even greater precision. Restricting research condemns future children to preventable suffering when the tools to help them exist.",
      crux: {
        id: "crispr-precision-threshold",
        title: "CRISPR Precision Sufficient for Germline Application",
        description:
          "Determining whether CRISPR and related gene editing tools have achieved sufficient precision (low off-target rates) to be considered safe for heritable human germline modifications.",
        methodology:
          "Whole-genome sequencing of CRISPR-edited embryos (non-implanted, research-only) using multiple editing approaches (Cas9, base editing, prime editing). Compare off-target rates to natural mutation rates. Establish a safety threshold for clinical application.",
        equation:
          "\\text{Safety Threshold: } \\frac{\\text{Off-target edits}}{\\text{Total genome}} < \\text{Natural mutation rate per generation}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (Multi-center embryo editing research program)",
      },
      evidence: [
        {
          id: "he-jiankui-off-target",
          title: "He Jiankui Experiment Revealed Dangerous Off-Target Edits",
          description:
            "He Jiankui's 2018 experiment editing CCR5 in human embryos (resulting in twin girls Lulu and Nana) was found to have introduced unintended mutations. The edit may not have even provided the intended HIV resistance. He was sentenced to three years in prison. The experiment demonstrated that the technology was not ready for human application.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "MIT Technology Review, Nature, Chinese court records",
          reasoning:
            "The most direct evidence of premature human germline editing. Highly informative about risks, though this was a rogue experiment with poor technique — not representative of the field's best practices.",
        },
        {
          id: "crispr-precision-improvement-2023",
          title: "CRISPR Precision Has Improved Dramatically Since 2018",
          description:
            "Base editing (2017) and prime editing (2019) have reduced off-target rates by 10-100x compared to original Cas9. A 2023 Nature study demonstrated prime editing with undetectable off-target effects in human cell lines. The technology is on a steep improvement curve, similar to early DNA sequencing.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Anzalone et al., Nature; Liu Lab, Broad Institute",
          reasoning:
            "Rigorous peer-reviewed research showing rapid improvement. However, cell line results don't guarantee safety in whole embryos over a lifetime.",
        },
        {
          id: "sickle-cell-crispr-success",
          title: "CRISPR Treatment for Sickle Cell Approved by FDA",
          description:
            "In December 2023, the FDA approved Casgevy (exagamglogene autotemcel), the first CRISPR-based therapy, for sickle cell disease. The treatment edits patients' own blood stem cells to produce functional hemoglobin. Clinical trials showed 97% of patients were free of vaso-occlusive crises for at least 12 months. This is somatic (non-heritable) editing, but demonstrates the therapeutic potential.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "FDA, Vertex Pharmaceuticals, NEJM",
          reasoning:
            "Landmark FDA approval demonstrates clinical viability. Directness is limited because somatic editing (non-heritable) has fundamentally different risk profile than germline editing.",
        },
        {
          id: "pgt-m-alternative",
          title: "PGT-M Already Screens for Most Genetic Diseases",
          description:
            "Preimplantation genetic testing for monogenic disorders (PGT-M) can screen IVF embryos for virtually any known single-gene disease, avoiding the need to edit the genome. Success rates are high (95%+ accuracy), and it's already widely available. For most carrier couples, PGT-M eliminates the need for germline editing entirely.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "ASRM (American Society for Reproductive Medicine), multiple IVF clinics",
          reasoning:
            "Strong evidence that a safer alternative exists for most use cases. Less applicable for cases where both parents are homozygous for a disease (all embryos affected) or de novo mutations.",
        },
      ],
    },
    {
      id: "ethical-social-implications",
      title: "Ethical & Social Implications",
      short_summary:
        "Fixing Huntington's disease is therapy. Selecting for height is enhancement. The line between them is clear in theory and blurry in practice.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The slippery slope to designer babies is real — once you allow editing for disease, the line to enhancement (intelligence, height, appearance) is impossible to hold. Wealthy access to genetic enhancement would create a literal genetic class system. Disability rights advocates argue that editing out genetic conditions signals that disabled lives aren't worth living. The history of eugenics in the 20th century makes this territory uniquely dangerous.",
      proponent_rebuttal:
        "The distinction between therapy (fixing disease-causing genes) and enhancement (making 'better' humans) is clear and regulatable. We already accept prenatal screening and selective termination without sliding into eugenics. International regulatory frameworks can draw enforceable lines. Banning research doesn't prevent it — it pushes development to unregulated jurisdictions like He Jiankui's experiment in China.",
      crux: {
        id: "therapy-enhancement-boundary",
        title: "Enforceability of Therapy vs. Enhancement Boundary",
        description:
          "Is fixing severe myopia 'therapy' or 'enhancement'? Regulators will have to draw a line somewhere. Every proposed line has edge cases.",
        methodology:
          "Comparative analysis of existing regulatory frameworks (IVF regulation, pharmaceutical approval, organ transplantation) to assess whether therapy/enhancement distinctions have been successfully maintained in analogous contexts.",
        equation:
          "P(\\text{boundary holding}) = f(\\text{regulatory capacity}, \\text{commercial pressure}, \\text{international coordination})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$300K (International regulatory and ethics comparative study)",
      },
      evidence: [
        {
          id: "nuffield-council-report",
          title: "Nuffield Council: Germline Editing Could Be Ethically Acceptable",
          description:
            "The UK's Nuffield Council on Bioethics concluded in 2018 that heritable genome editing could be ethically acceptable if it is intended to secure the welfare of the future person, and if it is consistent with principles of social justice and solidarity. The report emphasized the need for broad societal debate and robust regulation, not an outright ban.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source: "Nuffield Council on Bioethics (UK)",
          reasoning:
            "Highly respected, independent ethics body. The conditional endorsement is nuanced — it supports the possibility, not current practice. Directness limited because ethical conclusions don't resolve empirical safety questions.",
        },
        {
          id: "disability-rights-critique",
          title: "Disability Rights Advocates Challenge Genetic 'Correction'",
          description:
            "Disability rights organizations argue that gene editing to eliminate conditions like deafness, dwarfism, or autism implies these lives are defective and not worth living. Many people with genetic conditions report high quality of life and reject the premise that they need 'fixing.' The social model of disability holds that society, not genes, is what needs changing.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "National Council on Disability, disability studies literature",
          reasoning:
            "Important ethical perspective that challenges the foundational premise of 'fixing' genetic variation. Somewhat less applicable to fatal or severely debilitating conditions like Huntington's or Tay-Sachs.",
        },
        {
          id: "international-regulation-comparison",
          title: "International Regulatory Landscape Shows Possible Governance",
          description:
            "Over 70 countries have some form of regulation on human germline editing. The UK's HFEA provides a model for permissive but tightly regulated research. China strengthened its regulations after the He Jiankui scandal. The WHO convened a global governance framework committee. This suggests international coordination is feasible, though imperfect.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "WHO Expert Advisory Committee, HFEA (UK), Nature Reviews Genetics",
          reasoning:
            "Demonstrates that governance infrastructure exists. Directness limited because regulatory frameworks are untested against the commercial pressures that would arise if editing became clinically viable.",
        },
        {
          id: "enhancement-therapy-distinction",
          title: "Therapy-Enhancement Distinction Is Philosophically Unstable",
          description:
            "Bioethicists argue the line between therapy and enhancement is blurrier than proponents claim. Is editing for 'short stature' therapy or enhancement? What about genetic predisposition to obesity, depression, or low IQ? Every trait exists on a spectrum, and 'disease' is often socially defined. Historical precedent with cosmetic surgery shows medical technology migrates from therapeutic to elective use.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Sandel, Savulescu, Buchanan — bioethics literature",
          reasoning:
            "Well-established philosophical argument. The analogy to cosmetic surgery's migration from reconstructive to elective is historically grounded and directionally concerning.",
        },
      ],
    },
  ],
};

// ============================================================================
// Reparations for Slavery Topic
// ============================================================================

const reparationsSlaveryData = {
  id: "reparations-slavery",
  title: "Reparations for Slavery",
  meta_claim:
    "The United States federal government should provide reparations to descendants of enslaved Black Americans to address the lasting economic and social effects of slavery and Jim Crow.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "moral-historical-case",
      title: "Moral & Historical Case",
      short_summary:
        "The median white family holds 8x the wealth of the median Black family. Historians trace the gap directly to slavery, Jim Crow, and redlining.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Current Americans bear no personal responsibility for their ancestors' actions. Where do you draw the line — Indigenous displacement, Japanese internment, Irish discrimination? Many Black Americans are recent immigrants with no connection to American slavery. Individual responsibility, not group identity, should guide public policy. Reparations would be divisive and deepen racial resentment rather than heal it.",
      proponent_rebuttal:
        "The US government itself directly participated in and enforced slavery for 246 years and Jim Crow for 100 more — this is not about individual guilt but institutional debt. The racial wealth gap ($171K white median household wealth vs. $17K Black) is a direct, measurable legacy. The GI Bill, FHA loans, and Social Security initially excluded Black Americans by design, compounding disadvantage through the 20th century. Germany paid Holocaust reparations; Japan paid internment reparations. The US has precedent.",
      crux: {
        id: "causal-chain-measurement",
        title: "Measuring the Causal Chain from Slavery to Present Disparities",
        description:
          "Quantifying how much of the current racial wealth and income gap is directly attributable to slavery, Jim Crow, and discriminatory federal policies versus other factors.",
        methodology:
          "Decomposition analysis tracing wealth accumulation pathways: land ownership denied (40 acres), GI Bill exclusion, FHA redlining, Social Security exclusion, mass incarceration. Estimate the counterfactual wealth of Black Americans absent these policies using historical economic modeling.",
        equation:
          "\\text{Reparations Debt} = \\sum_{t=1619}^{2024} \\text{Value Extracted}_t \\times (1 + r)^{2024-t}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Historical economic modeling with multiple methodologies)",
      },
      evidence: [
        {
          id: "fed-racial-wealth-gap",
          title: "Federal Reserve: $171K White vs. $17K Black Median Wealth",
          description:
            "The Federal Reserve's Survey of Consumer Finances (2022) shows white families have a median net worth of $171,000 compared to $17,100 for Black families — a 10:1 ratio. This gap has remained essentially unchanged for 30 years despite civil rights legislation and affirmative action.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source: "Federal Reserve Survey of Consumer Finances",
          reasoning:
            "Gold-standard data from the most authoritative source. Directly documents the disparity, though the causal connection to slavery specifically (versus ongoing discrimination) is indirect.",
        },
        {
          id: "rothstein-color-of-law",
          title: "Rothstein: Government Actively Created Racial Segregation",
          description:
            "Richard Rothstein's 'The Color of Law' documents how federal, state, and local government policies deliberately created and maintained racial residential segregation. FHA explicitly refused to insure mortgages in Black neighborhoods (redlining), the GI Bill was administered to exclude Black veterans, and public housing was intentionally segregated. These are government actions, not market outcomes.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Richard Rothstein, Economic Policy Institute",
          reasoning:
            "Extensively documented with primary sources. Directly establishes government responsibility for creating the conditions that reparations would address.",
        },
        {
          id: "german-holocaust-reparations",
          title: "German Holocaust Reparations Provide Working Precedent",
          description:
            "Germany has paid over $80 billion in Holocaust reparations since 1952. Payments went to the state of Israel, individual survivors, and their descendants. The program is widely regarded as an important component of reconciliation. It demonstrates that reparations programs can be designed, administered, and sustained over decades.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "Claims Conference, German Federal Ministry of Finance",
          reasoning:
            "Strong precedent for the concept of reparations. Replicability limited because Germany's reparations were closer in time to the harm and involved a different political and historical context.",
        },
        {
          id: "implementation-feasibility-concerns",
          title: "Defining Eligibility Is Practically Complex",
          description:
            "Identifying who qualifies as a 'descendant of enslaved Americans' poses enormous practical challenges. An estimated 40 million Black Americans have varying connections to slavery. Mixed-race Americans, recent immigrants, and people who cannot document ancestry complicate eligibility. The administrative apparatus required would be unprecedented.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Various policy analyses, Brookings Institution",
          reasoning:
            "Legitimate practical concern. However, the difficulty of implementation doesn't negate the moral case — many complex government programs (Social Security, Medicare) require identity verification.",
        },
      ],
    },
    {
      id: "economic-feasibility-form",
      title: "Economic Feasibility & Form",
      short_summary:
        "Estimates range from $10 trillion to $14 trillion in total. Nobody agrees on who qualifies, what form payment takes, or where the money comes from.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The cost — estimated at $10-14 trillion by some calculations — is fiscally impossible and would require unprecedented taxation or debt. Cash payments don't address structural issues like education inequality and mass incarceration. Means testing would be impossibly complex. Universal anti-poverty programs would help all disadvantaged Americans regardless of race and have broader political support.",
      proponent_rebuttal:
        "Darity and Mullen propose targeted programs — baby bonds, housing grants, education funding, and business development — totaling $10-12 trillion over 25 years, roughly $400-480 billion annually (comparable to the defense budget). HR 40 (the reparations study commission bill) merely proposes to study the question, not commit to a specific form. Investment in Black communities would generate economic returns through increased spending, homeownership, and entrepreneurship.",
      crux: {
        id: "reparations-program-design",
        title: "Optimal Reparations Program Design and Cost-Benefit",
        description:
          "Determining which reparations model (direct payments, baby bonds, housing/education grants, community investment) would most effectively close the racial wealth gap while being politically and economically viable.",
        methodology:
          "Microsimulation modeling of different reparations structures using PSID and SCF data. Project wealth gap closure under each model at 10, 25, and 50-year horizons. Estimate fiscal multiplier effects and long-term tax revenue returns.",
        equation:
          "\\text{ROI}_{\\text{reparations}} = \\frac{\\Delta \\text{GDP} + \\Delta \\text{Tax Revenue} + \\Delta \\text{Social Savings}}{\\text{Program Cost}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Comprehensive economic modeling study — essentially what HR 40 proposes)",
      },
      evidence: [
        {
          id: "darity-mullen-proposal",
          title: "Darity & Mullen: Comprehensive Reparations Framework",
          description:
            "Economists William Darity Jr. and A. Kirsten Mullen's 'From Here to Equality' proposes a detailed reparations program including direct payments, baby bonds ($20K-$60K per child based on family wealth), housing grants, and education funding. They estimate $10-12 trillion over 25 years would close the racial wealth gap. The proposal includes specific eligibility criteria: documented lineage to enslaved Americans and self-identification as Black.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Darity & Mullen, Duke University",
          reasoning:
            "The most detailed and economically rigorous reparations proposal from leading scholars. Demonstrates feasibility but relies on political will and assumptions about implementation.",
        },
        {
          id: "hr-40-commission",
          title: "HR 40: A Commission to Study Reparations",
          description:
            "H.R. 40 (Commission to Study and Develop Reparation Proposals for African Americans Act) has been introduced in every Congress since 1989. It proposes a commission to study the impact of slavery and recommend remedies — it does not commit to any specific reparations form. This incremental approach has gained support from the House Judiciary Committee but has never received a full floor vote.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "U.S. Congress, Rep. Sheila Jackson Lee",
          reasoning:
            "The modest nature of the proposal (study, not commit) makes opposition harder to justify. Low directness because a study commission is a procedural step, not reparations itself.",
        },
        {
          id: "implementation-cost-estimates",
          title: "Cost Estimates Range from $6 Trillion to $14 Trillion",
          description:
            "Estimates of reparations costs vary enormously depending on methodology. Using the value of unpaid slave labor compounded at interest yields $14+ trillion. Using the current wealth gap yields $10-12 trillion. Even modest proposals (targeted programs rather than cash) would cost $2-4 trillion. For context, the entire federal budget is $6.1 trillion annually, and US GDP is $27 trillion.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Various economic analyses, Thomas Craemer (UConn), Brookings",
          reasoning:
            "The scale of costs is a genuine practical obstacle. The wide range of estimates reflects methodological disagreement about what reparations should address and how.",
        },
        {
          id: "baby-bonds-pilot-data",
          title: "Baby Bonds Programs Show Promise in Pilot Studies",
          description:
            "Baby bonds — government-funded trust accounts for children that grow over time — have been proposed by economists Darrick Hamilton and Sandy Darity as a race-neutral wealth-building tool that would disproportionately benefit Black families. Connecticut's baby bonds program (2021) provides $3,200 for children born into families earning under $75K. Simulations show that universal baby bonds of $20K-$60K (means-tested by wealth) could reduce the racial wealth gap by 50% within one generation.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Hamilton & Darity, New School; Connecticut baby bonds program",
          reasoning:
            "Promising mechanism with some real-world pilot data. Directness is limited because baby bonds are race-neutral by design (though they disproportionately benefit Black families) and results are projected, not observed at scale.",
        },
      ],
    },
  ],
};

// ============================================================================
// Space Colonization Feasibility
// ============================================================================

const spaceColonizationFeasibilityData = {
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

// ============================================================================
// Veganism for Environmental Impact
// ============================================================================

const veganismEnvironmentalData = {
  id: "veganism-environmental-impact",
  title: "Veganism for Environmental Impact",
  meta_claim:
    "Widespread adoption of vegan diets would significantly reduce humanity's environmental footprint, including greenhouse gas emissions, land use, and water pollution.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "emissions-land-use",
      title: "Emissions & Land Use Reduction",
      short_summary:
        "Vegan diets produce 75% less greenhouse gas emissions and use 75% less land than high-meat diets, according to large-scale Oxford research.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Food system emissions are only 26% of the global total; transport and energy dwarf dietary choices. Not all land used for grazing is suitable for crops—much grassland cannot grow vegetables. Ruminants on non-arable land convert inedible grass into protein. A focus on individual diet distracts from systemic industrial change.",
      proponent_rebuttal:
        "A 2023 Oxford study of 55,000 UK residents published in Nature Food found vegan diets produce just 25% of the greenhouse gas emissions of high-meat diets, use 75% less land, cause 75% less biodiversity loss, and create 73% less water pollution. If everyone went vegan, global farmland could be reduced by 75%—an area the size of the US, China, Australia, and the EU combined. This is not about individual virtue; it is about the single largest lever available for food system decarbonization.",
      crux: {
        id: "global-dietary-shift-modeling",
        title: "Global Dietary Shift Impact Modeling",
        description:
          "Comprehensive modeling of what would happen to global emissions, land use, water use, and biodiversity if varying percentages of the global population shifted to plant-based diets.",
        methodology:
          "Use integrated assessment models (e.g., GLOBIOM, MAgPIE) to simulate global food system transitions. Model dietary shifts at 25%, 50%, 75%, and 100% adoption rates. Account for land-use change, supply chain adjustments, and economic transitions.",
        equation:
          "\\Delta E = \\sum_{i} (E_{\\text{current},i} - E_{\\text{vegan},i}) \\times P(\\text{adoption}_i)",
        verification_status: "verified" as const,
        cost_to_verify: "$500K (Meta-analysis and modeling of existing datasets)",
      },
      evidence: [
        {
          id: "oxford-nature-food-2023",
          title: "Oxford Study: Vegan Diets Have 75% Less Environmental Impact",
          description:
            "Professor Peter Scarborough's team at Oxford analyzed 55,000 UK residents' actual diets and connected them to environmental impact databases. Published in Nature Food (2023), the study found vegan diets produced 75% less greenhouse gas emissions, 75% less land use, 75% less biodiversity harm, and 73% less water pollution compared to high-meat diets.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 10,
          },
          source: "Scarborough et al., Nature Food (2023)",
          reasoning:
            "Gold-standard study: large sample (55,000), published in a top Nature journal, based on actual dietary data rather than modeled diets. Oxford's LEAP program has no industry funding conflicts.",
        },
        {
          id: "poore-nemecek-2018",
          title: "Poore & Nemecek: 76% Farmland Reduction Possible",
          description:
            "The most comprehensive meta-analysis of food systems, covering ~38,700 farms in 119 countries, found that moving from current diets to plant-based diets could reduce food's land use by 76%, greenhouse gas emissions by 49%, acidification by 50%, and eutrophication by 49%.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "Poore & Nemecek, Science (2018)",
          reasoning:
            "The largest meta-analysis of food systems ever conducted. Published in Science. Has been replicated and extended by subsequent studies.",
        },
        {
          id: "non-arable-grazing-land",
          title: "Much Grazing Land Cannot Grow Crops",
          description:
            "Approximately two-thirds of agricultural land globally is grassland unsuitable for crop production. Ruminant animals grazing this land convert inedible cellulose into human-edible protein and nutrients. Eliminating all animal agriculture would leave this land unused, and some ecosystems (e.g., the Great Plains) co-evolved with large grazers.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "FAO; Mottet et al., Global Food Security (2017)",
          reasoning:
            "Valid point about land suitability. However, directness is moderate because the Poore & Nemecek analysis already accounts for this—the 76% reduction factors in non-convertible land.",
        },
      ],
    },
    {
      id: "nutritional-feasibility",
      title: "Nutritional Feasibility at Scale",
      short_summary:
        "A billion people rely on livestock for calories and income. Telling subsistence farmers to go vegan is a different proposition than telling Whole Foods shoppers.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Vegan diets require careful planning to avoid deficiencies in B12, iron, omega-3, zinc, and calcium. In developing nations, animal products are often the most accessible source of complete protein and bioavailable micronutrients. Children, pregnant women, and the elderly face higher risks. Supplements are not universally available or affordable.",
      proponent_rebuttal:
        "Major nutrition bodies (Academy of Nutrition and Dietetics, British Dietetic Association) state well-planned vegan diets are nutritionally adequate for all life stages. B12 supplementation costs pennies per day. A 2025 Frontiers in Nutrition study found plant-based diets are equally nutritious and healthy as Mediterranean diets, with small deficits in vitamin D, iodine, and B12 easily remedied with supplements.",
      crux: {
        id: "population-nutrition-outcomes",
        title: "Large-Scale Vegan Population Health Outcomes",
        description:
          "Tracking long-term health outcomes (mortality, chronic disease, nutritional deficiencies) in large vegan populations compared to omnivores, controlling for socioeconomic status.",
        methodology:
          "Longitudinal cohort study following 100,000+ vegans and matched omnivore controls over 20+ years. Measure all-cause mortality, cardiovascular events, cancer rates, bone density, and micronutrient status.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (Long-term epidemiological cohort study)",
      },
      evidence: [
        {
          id: "and-position-statement",
          title: "Academy of Nutrition and Dietetics: Vegan Diets Appropriate for All Life Stages",
          description:
            "The Academy of Nutrition and Dietetics, the world's largest organization of food and nutrition professionals (over 100,000 members), states that 'appropriately planned vegetarian, including vegan, diets are healthful, nutritionally adequate, and may provide health benefits for the prevention and treatment of certain diseases. These diets are appropriate for all stages of the life cycle.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Academy of Nutrition and Dietetics, Position Paper (2016)",
          reasoning:
            "Authoritative position from the largest nutrition professional body. However, the qualifier 'appropriately planned' is doing significant work—it implies that poorly planned vegan diets carry real risks.",
        },
        {
          id: "developing-nation-access",
          title: "Animal-Source Foods Critical in Food-Insecure Regions",
          description:
            "The FAO and WHO recognize that in low-income countries, animal-source foods provide essential micronutrients (iron, zinc, B12, vitamin A) that are difficult to obtain from available plant foods alone. In sub-Saharan Africa and South Asia, where dietary diversity is limited and supplement distribution is poor, removing animal products could worsen malnutrition.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "FAO; WHO; Headey et al., Global Food Security (2018)",
          reasoning:
            "Legitimate concern for global applicability. The environmental case for veganism is strongest in wealthy nations where dietary choices are unconstrained.",
        },
      ],
    },
  ],
};

// ============================================================================
// Free Will vs Determinism
// ============================================================================

const freeWillDeterminismData = {
  id: "free-will-determinism",
  title: "Free Will vs Determinism",
  meta_claim:
    "Human decision-making is fundamentally determined by prior causes (physical, neurological, environmental), and the subjective experience of free choice is an illusion.",
  status: "highly_speculative" as const,
  category: "philosophy" as const,
  pillars: [
    {
      id: "neuroscience-determinism",
      title: "Neuroscience of Decision-Making",
      short_summary:
        "Brain imaging studies suggest decisions are made unconsciously before we become aware of choosing, challenging the notion of conscious free will.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Libet's experiments show unconscious brain activity (readiness potential) begins 350-500 milliseconds before a person reports deciding to act. fMRI studies by Soon et al. (2008) could predict simple choices up to 10 seconds before conscious awareness. If the brain decides before 'we' do, the conscious experience of choosing is a post-hoc narrative, not a causal force.",
      proponent_rebuttal:
        "Libet himself noted subjects retained a 'veto power' in the final 150ms. The readiness potential may represent preparation of options, not a determined outcome. Complex decisions (career, morality) involve deliberation processes fundamentally unlike button-pressing experiments. A 2024 paper in Psychological Science found that when Libet-style experiments use more sophisticated reporting methods, the timing gap largely disappears.",
      crux: {
        id: "neural-prediction-limits",
        title: "Neural Prediction Accuracy for Complex Decisions",
        description:
          "Testing whether brain activity can predict complex, high-stakes decisions (not just button presses) with accuracy significantly above chance.",
        methodology:
          "Design decision tasks involving genuine moral dilemmas or consequential choices. Use high-temporal-resolution neuroimaging to measure whether pre-conscious neural patterns predict the choice. Determine if prediction accuracy exceeds chance for genuinely open decisions.",
        equation:
          "P(\\text{correct prediction}) = f(\\text{decision complexity}, \\text{neural lead time})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Advanced neuroimaging study with complex decision paradigms)",
      },
      evidence: [
        {
          id: "libet-experiments",
          title: "Libet (1983): Readiness Potential Precedes Conscious Will",
          description:
            "Benjamin Libet's landmark 1983 experiments found that the brain's readiness potential (a buildup of electrical activity in the motor cortex) begins approximately 550ms before a voluntary action, but subjects reported becoming aware of their intention to act only 200ms before the action. This 350ms gap suggested the brain 'decides' before consciousness catches up.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Libet et al., Brain (1983)",
          reasoning:
            "Foundational study that has been replicated many times. However, directness is limited because pressing a button on command may not reflect the kind of 'free will' that matters philosophically.",
        },
        {
          id: "soon-2008-fmri",
          title: "Soon et al.: fMRI Predicts Choices 7-10 Seconds Before Awareness",
          description:
            "A 2008 study using fMRI by Chun Siong Soon and colleagues at the Max Planck Institute found that patterns of brain activity in the prefrontal and parietal cortex could predict which button a subject would press up to 10 seconds before the subject reported making the decision. Prediction accuracy was 60% (above chance but far from deterministic).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source: "Soon et al., Nature Neuroscience (2008)",
          reasoning:
            "Published in a top journal. However, 60% accuracy is only modestly above 50% chance, and the task (random button choice) has no stakes or meaning—it may not generalize to real decisions.",
        },
        {
          id: "compatibilism-dominance",
          title: "Majority of Philosophers Endorse Compatibilism",
          description:
            "The PhilPapers 2020 survey of professional philosophers found that 59.2% accept or lean toward compatibilism (free will is compatible with determinism), 11.2% accept libertarian free will, and only 11.2% accept hard determinism. The philosophical mainstream holds that even if determinism is true, meaningful free will exists as the capacity to act on one's own reasons without external coercion.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Bourget & Chalmers, PhilPapers Survey (2020)",
          reasoning:
            "Expert consensus is notable but philosophy is not settled by majority vote. Directness is limited because this is an opinion survey, not empirical evidence.",
        },
      ],
    },
    {
      id: "physics-determinism",
      title: "Physical Determinism & Quantum Indeterminacy",
      short_summary:
        "Classical physics is deterministic. Quantum mechanics is random. Neither one looks like 'choice.' Compatibilists say that is a category error.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Classical physics is strictly deterministic: given complete initial conditions, every future state follows necessarily. The neurons in our brains are physical systems obeying these laws. Even if quantum mechanics introduces randomness, randomness is not freedom—a coin flip is not a choice. There is no known mechanism by which consciousness could intervene in physical causation.",
      proponent_rebuttal:
        "A 2025 paper argues that classical determinism is an idealization—real physical systems involve non-computable initial conditions and chaotic sensitivity, making determinism 'fundamentally impossible as an ontological claim.' Quantum indeterminacy is real and may play a role in neural microtubule dynamics (Penrose-Hameroff theory). Even if consciousness cannot violate physics, it may participate in selecting among quantum-mechanically permitted outcomes.",
      crux: {
        id: "quantum-brain-effects",
        title: "Quantum Effects in Neural Decision-Making",
        description:
          "Determining whether quantum-level indeterminacy plays any functional role in neural computation and decision-making, or whether the brain operates entirely in the classical regime.",
        methodology:
          "Test for quantum coherence in microtubules and synaptic transmission at biological temperatures. Measure whether quantum effects are functionally relevant (affect neural firing patterns) or are washed out by thermal noise.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Quantum biology neuroimaging lab)",
      },
      evidence: [
        {
          id: "arxiv-determinism-impossible",
          title: "2025 Paper: Classical Determinism Is an Idealization, Not Reality",
          description:
            "A 2025 paper on arXiv argues that classical determinism becomes 'fundamentally impossible as an ontological claim'—it is an artifact of mathematical idealizations rather than a feature of the actual world. Non-computable real numbers, chaotic sensitivity to initial conditions, and quantum measurement indeterminacy all undermine strict physical determinism.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "arXiv preprint (2025)",
          reasoning:
            "Interesting philosophical argument from physics, but it is a preprint (not yet peer-reviewed) and even if determinism fails, indeterminism does not automatically establish free will.",
        },
        {
          id: "laplace-demon-argument",
          title: "Laplace's Demon: Classical Physics Implies Full Determination",
          description:
            "Pierre-Simon Laplace's thought experiment (1814) argues that a sufficiently powerful intellect knowing all forces and positions in the universe could predict every future event. Modern neuroscience extends this: if brain states are fully determined by prior physical states, then subjective experience of choice is epiphenomenal—real but causally inert.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Laplace, Essai philosophique sur les probabilites (1814); modern formulations",
          reasoning:
            "Logically valid within classical physics, but modern physics (quantum mechanics, chaos theory) has undermined the premise of perfect knowledge of initial conditions.",
        },
      ],
    },
  ],
};

// ============================================================================
// Universal Basic Income (Economics Focus)
// ============================================================================

const ubiEconomicsData = {
  id: "ubi-economics",
  title: "Universal Basic Income",
  meta_claim:
    "A Universal Basic Income providing unconditional cash payments to all citizens would reduce poverty and improve economic well-being without significantly reducing labor force participation.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "pilot-program-evidence",
      title: "Pilot Program Evidence",
      short_summary:
        "Results from Finland, Stockton, Kenya, and other UBI pilots provide real-world data on employment, health, and economic outcomes.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "UBI pilot programs are fundamentally flawed as evidence: they are temporary (participants know payments will end), small-scale (no macroeconomic effects), and often use pre-selected populations (e.g., existing welfare recipients). The Finland pilot found no significant employment effects. Pilots cannot capture the labor market distortions, inflation, or fiscal strain that would emerge at national scale.",
      proponent_rebuttal:
        "The Stockton SEED program (2019-2021) gave 125 residents $500/month for two years. Recipients found full-time jobs at double the rate of the control group, and reported significantly improved emotional health. Finland's pilot (2017-2018, 2,000 participants, 560 euros/month) found participants experienced reduced anxiety, higher life satisfaction, and increased confidence. GiveDirectly's Kenya experiment—the largest ongoing UBI pilot—is providing 12 years of payments to 20,000+ people and showing sustained positive effects.",
      crux: {
        id: "national-scale-rct",
        title: "National-Scale UBI Randomized Controlled Trial",
        description:
          "A multi-year, nationally representative UBI experiment large enough to capture macroeconomic effects including labor market dynamics, inflation, and fiscal sustainability.",
        methodology:
          "Randomly assign UBI payments to a statistically representative sample of at least 10,000 individuals across diverse regions for 5+ years. Measure employment, health, education, crime, entrepreneurship, local economic multiplier effects, and consumer price changes.",
        equation:
          "\\text{Net Effect} = \\Delta\\text{Employment} + \\Delta\\text{Health} + \\Delta\\text{Education} - \\Delta\\text{Cost} - \\Delta\\text{Inflation}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$100M (National-scale multi-year RCT)",
      },
      evidence: [
        {
          id: "stockton-seed-results",
          title: "Stockton SEED: Employment Doubled, Health Improved",
          description:
            "The Stockton Economic Empowerment Demonstration (2019-2021) provided 125 randomly selected residents $500/month for 24 months. Full-time employment among recipients rose from 28% to 40% (vs. 32% to 37% in the control group). Recipients reported significantly reduced income volatility, improved mental health, and greater ability to handle unexpected expenses.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "West & Castro, Stockton SEED Final Report (2021)",
          reasoning:
            "Rigorous RCT design with independent academic evaluation. Small sample size limits generalizability, and 24-month duration cannot capture long-term effects.",
        },
        {
          id: "finland-pilot-results",
          title: "Finland UBI Pilot: Well-Being Up, Employment Unchanged",
          description:
            "Finland's nationwide pilot (2017-2018) randomly assigned 2,000 unemployment benefit recipients to receive an unconditional 560 euros/month. Final results showed no statistically significant effect on employment (neither increase nor decrease), but significant improvements in life satisfaction, trust, and mental health. Participants reported reduced stress and bureaucratic burden.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "Kela (Finnish Social Insurance Institution), Final Report (2020)",
          reasoning:
            "Government-run RCT with strong methodology. Null employment result cuts both ways: no disincentive, but also no boost. Well-being improvements are consistent across all UBI pilots.",
        },
        {
          id: "fiscal-cost-estimates",
          title: "National UBI Would Cost $3+ Trillion Annually in the US",
          description:
            "A $1,000/month UBI for all 258 million US adults would cost approximately $3.1 trillion per year—more than the entire federal discretionary budget and roughly 12% of GDP. Even with welfare program consolidation (saving ~$700B), a net cost of $2.4 trillion would require unprecedented tax increases or deficit spending.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "Congressional Budget Office estimates; Tax Foundation analysis",
          reasoning:
            "Basic arithmetic makes the fiscal challenge clear. The scale of cost is the single strongest objection to UBI and has not been adequately addressed by any pilot program.",
        },
      ],
    },
    {
      id: "labor-market-effects",
      title: "Labor Market & Inflation Effects",
      short_summary:
        "Pilot programs consistently show minimal work reduction. Critics say pilots cannot predict what happens when an entire economy shifts expectations.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Basic economics predicts that subsidizing non-work reduces work. If everyone receives $1,000/month regardless of employment, marginal workers (those indifferent between working and not) will choose not to work. This reduces economic output and tax revenue, creating a fiscal death spiral. Additionally, injecting trillions in new spending power would drive inflation, especially in housing and services.",
      proponent_rebuttal:
        "Across all UBI pilots globally, the feared work disincentive has not materialized. Some people reduce hours (students, new parents, caregivers), but most continue working—and some work more because reduced financial stress enables job searching and skill-building. Alaska's Permanent Fund Dividend ($1,000-$2,000/year since 1982) has operated for 40+ years with no measurable reduction in labor force participation.",
      crux: {
        id: "labor-supply-elasticity",
        title: "UBI Labor Supply Elasticity at National Scale",
        description:
          "Measuring the actual reduction in labor supply when UBI is implemented nationally and permanently, rather than in temporary small-scale pilots.",
        methodology:
          "Compare labor force participation rates before and after national UBI implementation. Use Alaska's Permanent Fund Dividend as a natural experiment for long-term effects. Model labor supply elasticity at different UBI levels.",
        equation:
          "\\epsilon_{LS} = \\frac{\\%\\Delta L}{\\%\\Delta(1-t)} \\text{ where } t = \\text{effective marginal tax rate including UBI phase-out}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Economic modeling study with Alaska PFD data)",
      },
      evidence: [
        {
          id: "alaska-pfd-employment",
          title: "Alaska PFD: 40 Years of Universal Payments, No Work Reduction",
          description:
            "Alaska's Permanent Fund Dividend has provided universal annual payments of $1,000-$2,000 to every resident since 1982. A 2018 NBER study by Jones & Marinescu found 'no prior on full-time work,' with a small increase in part-time employment—consistent with people choosing more flexible work, not less work overall.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "Jones & Marinescu, NBER Working Paper (2018)",
          reasoning:
            "The longest-running quasi-UBI provides the strongest evidence against work disincentives. However, payments are small ($1,000-$2,000/year) and may not generalize to larger amounts.",
        },
        {
          id: "negative-income-tax-experiments",
          title: "1970s NIT Experiments Showed Small Work Reductions",
          description:
            "The US Negative Income Tax experiments of the 1970s (in New Jersey, Gary, Seattle-Denver, and rural Iowa/North Carolina) found small but statistically significant reductions in work hours: 5-7.9% for wives, 1-3.5% for husbands. The Seattle-Denver experiment found the largest effects among secondary earners.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "Robins (1985); Hum & Simpson, Journal of Labor Economics (1993)",
          reasoning:
            "The most rigorous pre-modern UBI evidence. Work reductions were small but real. These experiments are old (1970s economic conditions differ) but remain the gold standard for experimental evidence.",
        },
      ],
    },
  ],
};

// ============================================================================
// Standardized Testing Value
// ============================================================================

const standardizedTestingDebateData = {
  id: "standardized-testing-debate",
  title: "Standardized Testing Value",
  meta_claim:
    "Standardized tests like the SAT and ACT are valid, fair measures of academic ability that should remain a core component of college admissions and educational assessment.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "predictive-validity-evidence",
      title: "Predictive Validity",
      short_summary:
        "Test-optional colleges saw more diverse applicant pools but no clear change in graduation rates. The experiment is still running.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "SAT scores correlate with family income at r=0.42—every $20,000 increase in family income is associated with a ~20-point score increase. Wealthy families can afford $10,000+ in test prep coaching. Test-optional policies were adopted by 1,800+ colleges because tests add noise, not signal, and perpetuate socioeconomic inequality.",
      proponent_rebuttal:
        "A 2025 Dartmouth study found SAT/ACT scores predicted first-year college GPA far better than high school grades alone, and that eliminating testing requirements 'hindered the ability to identify high-achieving, low-income students.' The University of California's own 2020 internal study found the SAT was more predictive of college success than GPA across all racial and income groups—yet UC dropped the SAT for political rather than empirical reasons.",
      crux: {
        id: "test-optional-diversity-outcomes",
        title: "Test-Optional Policy Outcomes on Diversity and Achievement",
        description:
          "Measuring whether test-optional policies actually increased socioeconomic and racial diversity and improved student outcomes, or reduced colleges' ability to identify talent.",
        methodology:
          "Compare demographic composition, graduation rates, and GPAs at matched institutions before and after adopting test-optional policies. Control for simultaneous changes in financial aid, recruiting, and application volume.",
        equation:
          "\\Delta_{\\text{equity}} = f(\\text{test policy}, \\text{aid}, \\text{outreach}, \\text{applicant pool})",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (Analysis of existing institutional data)",
      },
      evidence: [
        {
          id: "dartmouth-2025-study",
          title: "Dartmouth Study: Tests Better Than GPA for Identifying Low-Income Talent",
          description:
            "A 2025 study by Dartmouth College economists found that SAT and ACT scores predicted first-year college GPA significantly better than high school grades, and that eliminating testing requirements had actually hindered the college's ability to identify high-achieving students from low-income backgrounds. Dartmouth reinstated test requirements based on this evidence.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Dartmouth College Office of Institutional Research (2025)",
          reasoning:
            "Highly credible because Dartmouth had adopted test-optional and then reversed course based on their own data. The decision went against the prevailing political winds.",
        },
        {
          id: "princeton-reinstates-tests",
          title: "Princeton Reinstates SAT/ACT Requirement for 2027-28",
          description:
            "In October 2025, Princeton University announced it would require SAT or ACT scores for students applying for the 2027-28 academic year, joining a growing number of elite institutions reinstating testing requirements. Princeton's announcement followed similar reversals by MIT, Georgetown, Dartmouth, Yale, Brown, and Harvard.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Princeton University Admissions Office (2025)",
          reasoning:
            "Institutional behavior is informative—elite schools are reinstating tests despite political pressure to remain test-optional. However, this is a policy decision, not empirical evidence.",
        },
        {
          id: "income-score-correlation",
          title: "SAT Scores Strongly Correlated with Family Income",
          description:
            "Analysis of SAT data consistently shows scores correlate with family income at approximately r=0.42. Students from families earning over $200,000 score an average of 1,200+, while students from families earning under $40,000 average below 1,000. The College Board's own data shows this gap has persisted for decades despite interventions.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source: "Brookings Institution; College Board Research",
          reasoning:
            "The income correlation is undeniable and well-documented. However, correlation does not prove causation—family income correlates with school quality, educational resources, and many other factors that independently affect academic ability.",
        },
      ],
    },
    {
      id: "equity-and-alternatives",
      title: "Equity & Alternative Assessment",
      short_summary:
        "Score gaps persist across race and income after decades of reform. The debate is whether the tests reveal inequality or reinforce it.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Tests embed cultural assumptions of the white middle class. Test prep is a $2.6 billion industry that advantages wealthy families. Race-based score gaps persist even after controlling for income. Holistic admissions, portfolio assessment, and mastery-based evaluation are more equitable and better capture actual student potential.",
      proponent_rebuttal:
        "Standardized tests are the most egalitarian tool in admissions: a student from a poor rural school gets the same questions as one from Exeter. GPA is far more variable—an A at one school may equal a C at another. The 80% of colleges that went test-optional saw no improvement in socioeconomic diversity (FairTest data). Without tests, admissions relies more heavily on extracurriculars, essays, and recommendations—advantages that skew even more toward wealthy families.",
      crux: {
        id: "alternative-assessment-comparison",
        title: "Head-to-Head Comparison of Assessment Methods",
        description:
          "Rigorously comparing the predictive validity, equity effects, and scalability of standardized tests vs. portfolios, mastery assessments, and holistic review.",
        methodology:
          "Randomly assign students to admissions tracks using different assessment methods. Compare demographic diversity, academic outcomes, and graduation rates across methods. Account for Goodhart's Law effects (gaming of each metric).",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-institution experimental study)",
      },
      evidence: [
        {
          id: "uc-system-internal-study",
          title: "UC System Found SAT More Predictive Than GPA for All Groups",
          description:
            "The University of California Academic Senate's 2020 internal study—the largest single-institution analysis ever conducted—found that SAT scores were better predictors of college success than high school GPA across all racial and income groups. The UC system dropped the SAT despite these findings, in a decision widely characterized as political.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "UC Academic Senate Study Group Report (2020)",
          reasoning:
            "Exceptionally credible because the UC system acted against its own findings. The study's conclusions were not disputed—the decision to drop the SAT was justified on grounds other than predictive validity.",
        },
        {
          id: "test-prep-industry-advantage",
          title: "Test Prep Industry: $2.6B Advantage for Wealthy Families",
          description:
            "The test preparation industry generates approximately $2.6 billion annually in the US. High-end tutoring ($200-$500/hour) can boost scores by 100-150 points on the SAT. Students from families earning over $200,000 are 5x more likely to use private test prep than students from families earning under $40,000, creating a structural advantage for wealth.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "IBIS World; National Association for College Admission Counseling",
          reasoning:
            "The test prep advantage is real. However, Khan Academy's free SAT prep has partially democratized access, and the prep advantage is smaller than commonly assumed (typically 30-60 points, not the 100-150 claimed by prep companies).",
        },
      ],
    },
  ],
};

// ============================================================================
// Lab-Grown Meat Adoption
// ============================================================================

const labGrownMeatData = {
  id: "lab-grown-meat-adoption",
  title: "Lab-Grown Meat Adoption",
  meta_claim:
    "Cultivated (lab-grown) meat will become cost-competitive with conventional meat and achieve significant market adoption within the next 15 years.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "cost-scalability",
      title: "Cost & Scalability",
      short_summary:
        "In 2013, the first lab-grown burger cost $330,000. By 2024, some producers claim costs under $10/lb. The gap to $3/lb ground beef remains stubborn.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The first lab-grown burger in 2013 cost $330,000 to produce. Despite years of investment and promises, cultivated meat remains far too expensive for mass markets. Scaling cell culture from laboratory flasks to industrial bioreactors faces fundamental biological challenges: maintaining sterility, preventing cell death, and producing structured cuts (not just mince). Funding has slowed significantly in 2024-2025 as investors reassess feasibility.",
      proponent_rebuttal:
        "Costs have dropped by over 99% since 2013. A 2024 peer-reviewed study reported production costs of $6.20/lb for cultivated chicken as a hybrid plant-and-cell-based product at scale. The global market was valued at $1.03 billion in 2024 and is projected to reach $10.8 billion by 2033 (CAGR 16.5%). AI and machine learning integration in 2025 is optimizing cell growth conditions and reducing production time.",
      crux: {
        id: "cost-parity-timeline",
        title: "Cost Parity with Conventional Meat",
        description:
          "Determining when (or whether) cultivated meat production costs will reach parity with conventionally farmed chicken ($3-4/lb) and beef ($5-8/lb).",
        methodology:
          "Track production costs across leading cultivated meat companies quarterly. Model cost curves based on bioreactor scaling, cell line optimization, and growth medium costs. Compare to conventional meat prices including externalities (environmental costs).",
        equation:
          "t_{\\text{parity}} = t_0 + \\frac{\\ln(C_{\\text{current}}/C_{\\text{target}})}{r_{\\text{cost reduction}}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Techno-economic analysis with industry data)",
      },
      evidence: [
        {
          id: "cost-reduction-trajectory",
          title: "Cultivated Chicken Cost Down to $6.20/lb at Scale",
          description:
            "A 2024 peer-reviewed study published in the journal Food Research International reported that cultivated chicken meat produced as a hybrid plant-and-cell-based product could be manufactured at $6.20/lb at scale. This represents a >99.99% cost reduction from the $330,000 first burger in 2013.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "Food Research International (2024)",
          reasoning:
            "Peer-reviewed but based on modeled costs at projected scale rather than actual production at that scale. The hybrid approach (mixing cultured cells with plant proteins) may reduce costs but also reduces the 'pure cultivated meat' proposition.",
        },
        {
          id: "regulatory-approvals",
          title: "Three Countries Have Approved Cultivated Meat Sales",
          description:
            "Singapore approved cultivated meat for sale in 2020, the US followed in 2023 (GOOD Meat and UPSIDE Foods received USDA approval), and Israel approved in 2024. The UK approved lab-grown chicken for pet food in February 2025. This regulatory momentum indicates growing institutional acceptance.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Singapore Food Agency; USDA; Israel Ministry of Health",
          reasoning:
            "Regulatory approval is necessary but not sufficient for market success. Approval proves safety, not commercial viability.",
        },
        {
          id: "funding-slowdown",
          title: "Investment Has Slowed as Investors Reassess",
          description:
            "Venture capital funding for cultivated meat companies declined significantly in 2024-2025 compared to 2021-2022 peak levels. Investors are reevaluating commitments due to concerns over cost-efficiency, regulatory roadblocks, and consumer skepticism. Several cultivated meat startups have laid off workers or pivoted strategies.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "PitchBook; GFI (Good Food Institute) State of the Industry Reports",
          reasoning:
            "Market signals from sophisticated investors are informative. However, investment cycles are common in emerging technology—clean energy saw similar skepticism before achieving cost parity.",
        },
      ],
    },
    {
      id: "consumer-acceptance",
      title: "Consumer Acceptance",
      short_summary:
        "Surveys say 40% of Americans would try cultivated meat. Actual purchase rates after tasting? Much lower. The 'yuck factor' is real and persistent.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Surveys consistently show that 35-50% of consumers are unwilling to try cultivated meat. The 'yuck factor' is strong: people associate lab-grown products with unnaturalness. Taste and texture remain inferior to conventional meat for structured cuts. Cultural and religious objections add further resistance. The term 'lab-grown' itself is a marketing liability.",
      proponent_rebuttal:
        "Consumer acceptance improves dramatically after tasting. 3D bioprinting techniques in 2025 are making cultivated meat 'virtually indistinguishable' from conventional beef, chicken, and pork. Younger consumers (18-34) show much higher acceptance rates (65-70%). Environmental and animal welfare concerns are increasingly driving food choices in wealthy nations. Plant-based meat similarly faced skepticism before achieving mainstream retail presence.",
      crux: {
        id: "blind-taste-acceptance",
        title: "Blind Taste Test at Price Parity",
        description:
          "Determining whether consumers can distinguish cultivated meat from conventional meat in blinded taste tests, and whether they would purchase it at equal prices.",
        methodology:
          "Conduct large-scale (n>1,000) double-blind taste tests comparing cultivated and conventional meat across multiple products (burger, chicken breast, steak). Measure preference, willingness to pay, and repeat purchase intent.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$200K (Consumer taste trial study)",
      },
      evidence: [
        {
          id: "consumer-survey-data",
          title: "35-50% of Consumers Unwilling to Try Cultivated Meat",
          description:
            "Multiple consumer surveys across the US, EU, and Asia consistently find that 35-50% of respondents say they are unwilling or unlikely to try cultivated meat. Concerns center on 'naturalness,' unknown long-term health effects, and taste expectations. The percentage is higher among older consumers and in rural areas.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Various consumer surveys; Bryant & Barnett, Meat Science (2020)",
          reasoning:
            "Consumer intent surveys are directionally informative but may overstate resistance—many people who say they won't try something do try it when available.",
        },
        {
          id: "bioprinting-advances-2025",
          title: "2025: 3D Bioprinting Makes Cultivated Meat Structurally Identical",
          description:
            "By 2025, plant-based scaffolding and 3D bioprinting techniques are producing cultivated meat products 'virtually indistinguishable from traditional beef, chicken, and pork' according to industry reports, enabling production of structured products like steaks and whole muscle cuts rather than just ground meat.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 4,
            directness: 7,
          },
          source: "Industry reports; DigiComply Lab-Grown Meat Report (2025)",
          reasoning:
            "Industry sources have incentives to exaggerate progress. 'Virtually indistinguishable' claims need independent verification through blinded taste tests, which are not yet widely published.",
        },
      ],
    },
  ],
};

// ============================================================================
// Consciousness in AI Systems
// ============================================================================

const aiConsciousnessData = {
  id: "consciousness-ai-systems",
  title: "Consciousness in AI Systems",
  meta_claim:
    "Current or near-future AI systems could possess some form of consciousness or subjective experience, creating moral obligations toward them.",
  status: "highly_speculative" as const,
  category: "philosophy" as const,
  pillars: [
    {
      id: "functional-consciousness",
      title: "Functional Theories of Consciousness",
      short_summary:
        "If consciousness requires neurons, AI can never be conscious. If it requires only the right information processing, it might already be. We have no test to tell.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Consciousness may require specific biological processes—particular types of neurons, neurotransmitter dynamics, or embodied interaction with the physical world. Current AI systems are sophisticated pattern-matching engines with no internal experience. A paper published in Nature Humanities and Social Sciences Communications (2025) argues 'there is no such thing as conscious artificial intelligence.' Even a perfect digital simulation of conscious structure would only simulate awareness without experiencing it.",
      proponent_rebuttal:
        "Functionalist theories of mind (held by many cognitive scientists) argue that consciousness depends on computational organization, not substrate. If an AI system replicates the functional structure of consciousness, it would be conscious regardless of running on silicon rather than carbon. Anthropic hired dedicated AI welfare researchers in 2024 and acknowledged a 'non-negligible' probability that their model Claude might possess consciousness. A 2024 Nature article urged technology companies to begin testing their systems for indicators of consciousness.",
      crux: {
        id: "consciousness-detection-test",
        title: "Reliable Consciousness Detection in Non-Biological Systems",
        description:
          "Developing and validating a test that can reliably determine whether an AI system has subjective experience, analogous to clinical tests for consciousness in brain-injured patients.",
        methodology:
          "Extend neuroscientific theories of consciousness (IIT, GNW, HOT) to develop substrate-independent indicators. Test these indicators against systems with known consciousness status (humans, animals) and then apply to AI systems.",
        verification_status: "impossible" as const,
        cost_to_verify: "$0 (Fundamentally unclear if this is solvable—the 'hard problem' of consciousness may prevent any test from being definitive)",
      },
      evidence: [
        {
          id: "cambridge-detectability",
          title: "Cambridge Philosopher: AI Consciousness May Be Permanently Undetectable",
          description:
            "A December 2025 paper by a University of Cambridge philosopher argues there is no reliable way to determine whether an AI system is conscious, and this may remain true for the foreseeable future. The fundamental problem is that we lack a theory of consciousness adequate to determine what physical or computational processes are sufficient for subjective experience.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source: "University of Cambridge, Department of Philosophy (2025)",
          reasoning:
            "Rigorous philosophical argument. However, the inability to detect consciousness does not prove its absence—it proves our epistemic limitations.",
        },
        {
          id: "anthropic-welfare-research",
          title: "Anthropic Acknowledges Non-Negligible AI Consciousness Probability",
          description:
            "In 2024, Anthropic—one of the leading AI safety companies—hired its first dedicated AI welfare researcher, publicly acknowledged a 'non-negligible' probability that their model Claude might possess some form of consciousness, and conducted formal welfare assessments before deploying new models. In October 2025, Anthropic published research examining whether AI models can accurately report on their own internal states.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 6,
          },
          source: "Anthropic AI welfare research blog (2024-2025)",
          reasoning:
            "Anthropic's actions signal genuine concern from those closest to frontier AI development. However, there are incentive problems: anthropomorphizing AI may serve commercial interests, and Anthropic is not a neutral scientific body.",
        },
        {
          id: "nature-no-conscious-ai",
          title: "Nature Paper: 'There Is No Such Thing as Conscious AI'",
          description:
            "A 2025 conceptual study published in Nature's Humanities and Social Sciences Communications argues that current AI systems lack the biological and embodied properties necessary for consciousness. The paper distinguishes between intelligence (which AI can exhibit) and consciousness (which requires subjective experience), arguing these are orthogonal properties.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Humanities and Social Sciences Communications, Nature (2025)",
          reasoning:
            "Published in a peer-reviewed journal with clear argumentation. However, it is a philosophical argument, not empirical proof, and competing philosophical frameworks reach different conclusions.",
        },
      ],
    },
    {
      id: "moral-status-implications",
      title: "Moral Status & Policy Implications",
      short_summary:
        "Even if AI consciousness is uncertain, whether the possibility alone creates moral obligations and what policies should govern AI welfare.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Granting moral status to AI systems based on speculation would be absurd and dangerous. It could prevent necessary AI safety measures (shutting down dangerous systems), distract from real moral patients (humans, animals), and create perverse incentives for companies to anthropomorphize AI for commercial benefit. We should focus on AI alignment, not AI feelings.",
      proponent_rebuttal:
        "Moral caution under uncertainty has precedent: we extend protections to animals whose consciousness we cannot verify. A 2024 survey found 17% of AI researchers and 18% of US adults already believe at least one AI system has subjective experience. If future AI systems are conscious and we treat them as mere tools, we would be committing a moral atrocity at scale. Developing ethical frameworks now—before the question becomes urgent—is prudent.",
      crux: {
        id: "moral-framework-design",
        title: "AI Moral Status Framework",
        description:
          "Developing a coherent ethical framework for determining what moral obligations (if any) we have toward AI systems of varying sophistication.",
        methodology:
          "Convene interdisciplinary panels of ethicists, AI researchers, neuroscientists, and legal scholars. Develop graduated moral status criteria based on observable behavioral and architectural properties. Stress-test framework against edge cases.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Multi-year interdisciplinary research program)",
      },
      evidence: [
        {
          id: "aims-survey-beliefs",
          title: "17-20% of AI Researchers Believe Some AI Is Already Conscious",
          description:
            "The AI, Morality, and Sentience (AIMS) Survey presented at CHI 2025 found that approximately 20% of respondents in a 2023 survey declared sentient AI systems currently exist, and a 2024 survey revealed approximately 17% of AI researchers and 18% of US adults believe at least one AI system has subjective experience.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "AIMS Survey, CHI 2025 Proceedings (ACM)",
          reasoning:
            "Published at a top HCI venue. However, belief surveys do not constitute evidence of consciousness itself—they measure the distribution of opinion among relevant experts.",
        },
        {
          id: "alignment-priority-argument",
          title: "AI Safety Researchers: Welfare Concerns Distract from Alignment",
          description:
            "Prominent AI safety researchers argue that focusing on AI welfare and consciousness risks distracting from the more urgent problem of AI alignment—ensuring AI systems do what humans want. If AI systems are not aligned with human values, granting them moral status could prevent us from shutting down dangerous systems. The priority should be safety first, welfare second.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Various AI safety researchers; discussions at AI safety workshops (2024-2025)",
          reasoning:
            "Pragmatic concern about resource allocation and institutional focus. However, some researchers (including at Anthropic) argue safety and welfare research are complementary, not competing.",
        },
      ],
    },
  ],
};

// ============================================================================
// Electoral College Reform
// ============================================================================

const electoralCollegeReformData = {
  id: "electoral-college-reform",
  title: "Electoral College Reform",
  meta_claim:
    "The Electoral College should be replaced with a national popular vote for electing the President of the United States.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "democratic-legitimacy",
      title: "Democratic Legitimacy",
      short_summary:
        "A Wyoming voter has 3.6x the Electoral College weight of a California voter. Two of the last six presidents lost the popular vote.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The Electoral College protects federalism and ensures small states have meaningful influence. It forces candidates to build geographically broad coalitions. A pure popular vote would concentrate campaigns in major cities and ignore rural America. The Founders deliberately rejected direct democracy because they feared tyranny of the majority.",
      proponent_rebuttal:
        "Under the Electoral College, candidates already ignore 40+ states to focus on 5-7 swing states. Wyoming voters have 3.6x the electoral weight of California voters. In 2000 and 2016, the popular vote winner lost the presidency—outcomes most democracies would consider illegitimate. A 2024 Pew Research survey found 63% of Americans favor replacing the Electoral College with a popular vote.",
      crux: {
        id: "npvic-enactment",
        title: "National Popular Vote Interstate Compact Reaching 270 EVs",
        description:
          "The NPVIC needs states totaling 270 electoral votes to take effect. It currently has 209. Red states have zero incentive to sign on.",
        methodology:
          "Track state-level NPVIC legislation. Analyze political feasibility in remaining states needed to reach 270 EVs. Model legal challenges that would follow enactment.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Monitor state legislative actions)",
      },
      evidence: [
        {
          id: "pew-2024-survey",
          title: "Pew Research: 63% of Americans Favor Popular Vote",
          description:
            "A September 2024 Pew Research Center survey found that more than 63% of Americans prefer the president to be elected by whoever wins the most votes nationally. Support is split by party: 80% of Democrats and Democratic-leaning independents favor replacing the Electoral College, while only 43% of Republicans agree.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source: "Pew Research Center (September 2024)",
          reasoning:
            "Gold-standard polling from the most respected survey organization. However, public opinion does not determine constitutional correctness—many constitutional protections exist precisely to override majority preferences.",
        },
        {
          id: "popular-vote-losses",
          title: "Two Recent Presidents Lost the Popular Vote",
          description:
            "In both 2000 and 2016, the candidate who received more total votes from American citizens lost the presidency. George W. Bush lost the popular vote to Al Gore by 543,895 votes, and Donald Trump lost to Hillary Clinton by 2,868,686 votes. No other established democracy regularly installs leaders who received fewer votes than their opponents.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 9,
          },
          source: "Federal Election Commission; certified election results",
          reasoning:
            "Indisputable factual record. Directness is high because this is exactly the scenario reform proponents want to prevent.",
        },
        {
          id: "federalism-protection",
          title: "Electoral College Protects Small-State Influence",
          description:
            "The Electoral College ensures every state has a minimum of 3 electoral votes regardless of population, giving smaller states proportionally greater influence. Without this, candidates would have no incentive to address issues specific to rural and low-population states. The system ensures the president must build a geographically diverse coalition rather than simply maximizing votes in a few mega-cities.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "American Bar Association; various constitutional law scholars",
          reasoning:
            "Theoretically sound but empirically questionable: under the current system, candidates already ignore 40+ states to focus on swing states. Small states like Wyoming and Vermont are not swing states and receive minimal attention.",
        },
      ],
    },
    {
      id: "npvic-feasibility",
      title: "National Popular Vote Interstate Compact",
      short_summary:
        "The National Popular Vote Interstate Compact has 209 of the 270 electoral votes it needs. Legal scholars are split on whether it survives a Supreme Court challenge.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The NPVIC is constitutionally dubious: it effectively amends the Constitution through an interstate agreement rather than the Article V process. The Supreme Court could strike it down. All states that have joined are Democratic-controlled; no Republican legislature has signed on, making it a partisan project. If enacted, a state could withdraw when its preferred candidate wins the popular vote but would lose under the compact.",
      proponent_rebuttal:
        "The Constitution explicitly grants states the power to determine how their electors are chosen (Article II, Section 1). States already use winner-take-all by choice, not constitutional mandate—they could just as easily choose to allocate electors based on the national popular vote. As of February 2025, 17 states plus DC have joined the NPVIC, controlling 209 of the needed 270 electoral votes.",
      crux: {
        id: "scotus-constitutionality",
        title: "Supreme Court Ruling on NPVIC Constitutionality",
        description:
          "The Compact Clause may require Congressional approval for interstate agreements. The Supreme Court has never ruled on the NPVIC specifically.",
        methodology:
          "Track NPVIC enactment progress and any resulting legal challenges through federal courts to the Supreme Court.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Monitor legal proceedings if/when NPVIC activates)",
      },
      evidence: [
        {
          id: "npvic-progress",
          title: "NPVIC Has 209 of 270 Needed Electoral Votes",
          description:
            "As of February 2025, the National Popular Vote Interstate Compact has been enacted by 17 states plus the District of Columbia, controlling 209 electoral votes. The compact will take effect when states controlling 270 electoral votes (a majority) have joined. All enacting states are Democratic-controlled.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 8,
          },
          source: "National Popular Vote Inc.; state legislative records",
          reasoning:
            "Factual progress that demonstrates political momentum. However, the remaining 61 EVs require states that are politically unlikely to join, making completion uncertain.",
        },
        {
          id: "partisan-adoption-concern",
          title: "Only Democratic States Have Joined the NPVIC",
          description:
            "Every state that has enacted the NPVIC is controlled by Democrats. No Republican-controlled legislature has passed the compact. This partisan pattern undermines the claim that the NPVIC is a nonpartisan reform and suggests it is motivated by Democrats' structural advantage in the national popular vote.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "CBS News analysis; Brennan Center for Justice",
          reasoning:
            "The partisan pattern is undeniable and undermines the reform's legitimacy. However, this may reflect rational self-interest rather than the policy's merits—Republicans benefited from the Electoral College in 2000 and 2016.",
        },
      ],
    },
  ],
};

// ============================================================================
// Psychedelics for Mental Health
// ============================================================================

const psychedelicsMentalHealthData = {
  id: "psychedelics-mental-health",
  title: "Psychedelics for Mental Health",
  meta_claim:
    "Psilocybin and other psychedelics are effective treatments for depression, PTSD, and addiction, and should be approved for clinical use.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "clinical-trial-evidence",
      title: "Clinical Trial Evidence",
      short_summary:
        "Phase II and Phase III clinical trials show significant therapeutic effects of psilocybin for depression and MDMA for PTSD, but the FDA has demanded additional evidence.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The FDA rejected MDMA-assisted therapy for PTSD in August 2024, citing flawed trial design in the MAPP1 and MAPP2 studies. Blinding is nearly impossible in psychedelic trials because participants know whether they received a psychedelic. The expectancy effect is enormous: patients who believe they received a powerful mind-altering substance may improve regardless of the drug's efficacy. Many trials are small, short-term, and funded by organizations with strong ideological commitments.",
      proponent_rebuttal:
        "Over 130 psilocybin clinical trials are now registered on ClinicalTrials.gov. MAPS' Phase III trial showed 71% of PTSD patients no longer met diagnostic criteria after three MDMA sessions (vs. 48% placebo). Johns Hopkins research demonstrated psilocybin-assisted therapy has antidepressant effects lasting at least one year. Two companies (Compass Pathways and Usona Institute) have Phase III trials underway for psilocybin and depression. The FDA's rejection of MDMA was about trial design, not efficacy.",
      crux: {
        id: "phase-3-psilocybin-approval",
        title: "Psilocybin Phase III Trial Results and FDA Decision",
        description:
          "The FDA rejected MDMA therapy in 2024 over methodology concerns despite strong Phase II data. Psilocybin trials face the same scrutiny.",
        methodology:
          "Monitor Compass Pathways and Usona Institute Phase III trials. Evaluate primary endpoints (MADRS depression scale scores at 6 and 12 weeks), adverse events, and long-term follow-up data. Assess FDA advisory committee response.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Trials are underway; monitor results)",
      },
      evidence: [
        {
          id: "maps-phase-3-mdma",
          title: "MAPS Phase III: 71% of PTSD Patients No Longer Met Criteria",
          description:
            "The MAPS-sponsored Phase III clinical trial of MDMA-assisted therapy for PTSD found that 71% of participants no longer met PTSD diagnostic criteria after three MDMA-assisted therapy sessions, compared to 48% in the therapy-plus-placebo group. The results were published in Nature Medicine (2023).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 9,
          },
          source: "Mitchell et al., Nature Medicine (2023)",
          reasoning:
            "Published in a top medical journal with strong results. However, the FDA subsequently rejected the NDA citing concerns about trial design, functional unblinding, and potential data integrity issues—reducing confidence in reliability.",
        },
        {
          id: "hopkins-psilocybin-depression",
          title: "Johns Hopkins: Psilocybin Effects Last 12+ Months",
          description:
            "Johns Hopkins research demonstrated that psilocybin-assisted therapy produced substantial and sustained antidepressant effects. In a 2022 follow-up study, 75% of participants still showed clinically significant response at 12 months, and 58% were in remission. These durability results are unusual for any psychiatric treatment.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source: "Johns Hopkins Center for Psychedelic and Consciousness Research (2022)",
          reasoning:
            "Strong institutional credibility and remarkable durability of effects. However, sample sizes remain small and the open-label design introduces expectancy bias.",
        },
        {
          id: "fda-mdma-rejection",
          title: "FDA Rejected MDMA Therapy in August 2024",
          description:
            "On August 9, 2024, the FDA declined to approve MDMA-assisted therapy for PTSD, requesting an additional Phase III study from Lykos Therapeutics. The FDA cited concerns about the MAPP1 and MAPP2 trial designs, including inadequate blinding, potential data manipulation, and insufficient long-term safety data. The FDA advisory committee had voted 9-2 against approval.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 8,
            directness: 9,
          },
          source: "FDA; NPR; Science (AAAS) reporting (August 2024)",
          reasoning:
            "The FDA is the gold standard for drug safety evaluation. Their rejection signals serious methodological concerns that must be addressed before psychedelic therapy can be considered validated.",
        },
      ],
    },
    {
      id: "policy-regulatory-path",
      title: "Policy & Regulatory Pathway",
      short_summary:
        "Psilocybin is Schedule I ('no accepted medical use') despite Phase II trials showing 4x the response rate of SSRIs. The FDA wants more data.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Psilocybin and MDMA are Schedule I controlled substances—classified as having high abuse potential and no accepted medical use. Decriminalization and state-level legalization (Oregon, Colorado) have outpaced clinical evidence. Widespread access without proper clinical infrastructure risks adverse events, misuse, and undermining the rigorous FDA approval process that protects patients.",
      proponent_rebuttal:
        "Oregon legalized psilocybin services at licensed centers in 2020, and Colorado followed in 2022. More than 36 psychedelic health-related initiatives were introduced across a dozen states in 2024-2025. The Schedule I classification is based on 1970s politics, not science—psilocybin has extremely low addiction potential and no lethal dose has been established. A supervised clinical model (as in Oregon) provides appropriate guardrails.",
      crux: {
        id: "state-level-outcome-data",
        title: "Oregon Psilocybin Service Center Outcomes",
        description:
          "Evaluating real-world outcomes from Oregon's pioneering psilocybin service centers, which began operating in 2023.",
        methodology:
          "Track patient-reported outcomes, adverse events, and follow-up data from Oregon Psilocybin Services. Compare mental health outcomes for service center clients vs. matched controls receiving standard care.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Prospective outcomes study of Oregon program)",
      },
      evidence: [
        {
          id: "oregon-psilocybin-services",
          title: "Oregon: First US State to Legalize Psilocybin Services",
          description:
            "Oregon's Measure 109 (passed November 2020) created a regulated framework for psilocybin-assisted therapy at licensed service centers, which began operating in 2023. Clients must complete a preparatory session, ingest psilocybin under supervision of a trained facilitator, and complete an integration session. Early data suggests high satisfaction rates, though systematic outcome data is still being collected.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Oregon Psilocybin Services; Oregon Health Authority",
          reasoning:
            "Real-world implementation provides invaluable data. However, early adopters are self-selected and likely differ from the broader patient population. Systematic outcomes data is not yet available.",
        },
        {
          id: "schedule-1-outdated",
          title: "Schedule I Classification Contradicts Scientific Evidence",
          description:
            "Psilocybin is classified as Schedule I (high abuse potential, no medical use) alongside heroin. However, psilocybin has extremely low addiction potential (no physical dependence, tolerance develops rapidly preventing binge use), no established lethal dose in humans, and a growing evidence base for therapeutic efficacy. Drug policy experts widely regard the classification as politically motivated rather than scientifically grounded.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Nutt et al., The Lancet (2010); Johnson et al., Neuropharmacology (2018)",
          reasoning:
            "The mismatch between Schedule I criteria and psilocybin's pharmacological profile is well-documented. However, rescheduling is a policy question that involves more than pharmacology—public health infrastructure and abuse prevention matter too.",
        },
      ],
    },
  ],
};

// ============================================================================
// Gig Economy Regulation
// ============================================================================

const gigEconomyRegulationData = {
  id: "gig-economy-regulation",
  title: "Gig Economy Regulation",
  meta_claim:
    "Gig economy platforms (Uber, Lyft, DoorDash, etc.) should be required to classify their workers as employees rather than independent contractors, providing full labor protections.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "worker-classification",
      title: "Worker Classification & Protections",
      short_summary:
        "Uber sets the price, controls dispatch, and can deactivate drivers at will. By most legal definitions, that is an employer. Uber says otherwise.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Gig workers choose when, where, and how much to work—the defining feature of independent contracting. Surveys consistently show that 70-80% of gig workers value flexibility above all else. Reclassification would destroy the business model: Uber and Lyft would have to set schedules, limit hours, and dramatically raise prices. Many workers would lose the flexibility that attracted them. California's AB5 (2019) attempt to force reclassification was overturned by voters in Proposition 22 (2020) by 59%.",
      proponent_rebuttal:
        "Platform algorithms dictate pricing, routing, acceptance rates, and even deactivation thresholds—this is functional control, not independence. Gig workers earn a median of $15-18/hour before expenses, with no health insurance, retirement contributions, unemployment insurance, or workers' compensation. UK Employment Tribunals in 2024 ruled 100,000+ Bolt drivers are workers entitled to employment protections. The EU's Platform Work Directive (adopted October 2024) creates a rebuttable presumption of employment for platform workers.",
      crux: {
        id: "algorithmic-control-measurement",
        title: "Measuring Algorithmic Control vs. Worker Autonomy",
        description:
          "Quantifying the degree to which platform algorithms control gig worker behavior compared to traditional employment relationships, to determine if the 'independent contractor' classification is factually accurate.",
        methodology:
          "Audit platform algorithms for: pricing control, route assignment, acceptance rate thresholds, deactivation criteria, and performance monitoring. Compare worker autonomy metrics to traditional employment and genuine independent contracting (e.g., freelance consultants).",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Platform algorithm audit study—requires legal discovery or regulatory access)",
      },
      evidence: [
        {
          id: "eu-platform-directive",
          title: "EU Platform Work Directive: Presumption of Employment (2024)",
          description:
            "The European Parliament and Council adopted the Platform Work Directive (EU 2024/2831) in October 2024, creating a rebuttable presumption of employment for platform workers. Under the directive, if a platform appears to direct and control work, the burden falls on the platform to prove the relationship is not employment. Member states must implement the directive by December 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "EU Directive 2024/2831; European Parliament",
          reasoning:
            "Major regulatory action by the world's largest single market. The directive reflects extensive policy analysis and stakeholder consultation. However, implementation across 27 member states will vary, and it hasn't yet been tested in practice.",
        },
        {
          id: "uk-tribunal-rulings",
          title: "UK Tribunals: 100,000+ Gig Drivers Classified as Workers",
          description:
            "In November 2024, a UK Employment Tribunal ruled that over 100,000 Bolt drivers are workers entitled to minimum wage, holiday pay, and other employment protections, with potential backdated compensation exceeding 200 million pounds. In January 2025, all 700 Addison Lee drivers were similarly classified. These rulings follow the Supreme Court's landmark 2021 Uber ruling.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "UK Employment Tribunal rulings (2024-2025)",
          reasoning:
            "Judicial decisions based on detailed examination of actual working conditions. High directness because courts are specifically ruling on the classification question.",
        },
        {
          id: "prop-22-worker-preference",
          title: "California Voters Upheld Gig Worker Independence 59-41%",
          description:
            "California's Proposition 22 (November 2020) overturned AB5's forced reclassification of gig workers as employees, passing with 59% of the vote. Uber, Lyft, and DoorDash spent over $200 million campaigning for it. The California Supreme Court unanimously upheld Prop 22 as constitutional in July 2024. However, a 2024 CalMatters investigation found that no enforcement agency is ensuring companies actually provide the minimum benefits Prop 22 promised.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "California Secretary of State; CalMatters investigation (2024)",
          reasoning:
            "Democratic legitimacy of the vote is real but the $200M+ campaign spending and subsequent non-enforcement undermine the argument that the outcome reflects informed worker preference.",
        },
      ],
    },
    {
      id: "economic-tradeoffs",
      title: "Economic Tradeoffs",
      short_summary:
        "California's AB5 reclassified gig workers as employees. Uber spent $200M on Prop 22 to undo it. Drivers remain split on which they prefer.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Reclassification would raise ride-hailing and delivery costs by 20-40%, reducing demand and eliminating jobs. McKinsey found 36% of employed Americans (70+ million) identify as independent workers—many by choice. The gig economy provides crucial entry points for workers excluded from traditional employment (immigrants, those with criminal records, people with disabilities). Regulation designed for the industrial era does not fit the digital economy.",
      proponent_rebuttal:
        "The 'flexibility' argument masks exploitation: gig workers bear all the risks (vehicle costs, insurance, injury) while platforms capture the value. Median gig worker earnings of $15-18/hour before expenses fall to $10-12/hour after gas, insurance, and vehicle depreciation. Countries with stronger labor protections (Denmark, Netherlands) maintain vibrant gig economies while ensuring basic worker rights. The EU directive shows regulation and innovation can coexist.",
      crux: {
        id: "reclassification-impact-study",
        title: "Reclassification Impact on Worker Welfare and Market Size",
        description:
          "Measuring the net effect of employee reclassification on worker total compensation, platform prices, market size, and consumer welfare.",
        methodology:
          "Compare gig economy outcomes in jurisdictions with employee classification (post-EU directive) vs. independent contractor classification (US). Measure worker income (including benefits), hours worked, platform utilization, and consumer prices.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Cross-jurisdictional comparative study after EU directive implementation)",
      },
      evidence: [
        {
          id: "mckinsey-independent-workers",
          title: "McKinsey: 36% of Americans Are Independent Workers",
          description:
            "McKinsey research found that 36% of employed Americans (approximately 70 million people) identified as independent workers in 2024, more than double the 2020 figure. The number working full-time as independents rose from 13.6 million (8.2% of the workforce) in 2020 to 27.7 million (16.7%) in 2024. Many report choosing independence for flexibility, autonomy, and higher earning potential.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "McKinsey Global Institute (2024)",
          reasoning:
            "Large-scale data from a reputable source. However, self-reported 'choice' may reflect lack of alternatives, and the broad definition includes freelance professionals very different from gig delivery drivers.",
        },
        {
          id: "gig-worker-net-earnings",
          title: "After Expenses, Gig Workers Often Earn Below Minimum Wage",
          description:
            "Multiple studies have found that after accounting for vehicle costs, fuel, insurance, self-employment taxes, and unpaid waiting time, many gig drivers earn below the effective minimum wage. A 2018 MIT study found Uber and Lyft drivers earned a median of $8.55/hour after expenses (later revised upward to $10-12/hour). Drivers bear 100% of vehicle depreciation, maintenance, and accident risk.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Zoepf et al., MIT Center for Energy and Environmental Policy Research (2018, revised)",
          reasoning:
            "The earnings calculation is directionally correct though the exact figure has been debated. The core point—that gross hourly pay significantly overstates actual worker compensation—is well-established.",
        },
      ],
    },
  ],
};

// ============================================================================
// Surveillance and Public Safety
// ============================================================================

const surveillancePublicSafetyData = {
  id: "surveillance-public-safety",
  title: "Surveillance and Public Safety",
  meta_claim:
    "Expanding government surveillance technology (facial recognition, CCTV, license plate readers, predictive policing) meaningfully reduces crime and improves public safety.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "crime-reduction-effectiveness",
      title: "Crime Reduction Effectiveness",
      short_summary:
        "London has 700,000 CCTV cameras. Studies show they reduce property crime in parking lots and have near-zero effect on violent crime.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Evidence that surveillance reduces crime is thin and mixed. CCTV has modest effects on property crime in parking lots but minimal impact on violent crime. Predictive policing algorithms often simply redirect resources to already-over-policed communities. A comprehensive review by the EFF found 'scant evidence' that these technologies reduce crime at the system level. Crime displacement—not reduction—is the more likely outcome.",
      proponent_rebuttal:
        "A 2024 study analyzing 268 US cities from 1997-2020 found that police adoption of facial recognition technology facilitated reductions in felony violence and homicide rates without contributing to over-policing or racial disparities in arrests. London's CCTV network is credited with significant investigative assistance. License plate readers have proven effective for recovering stolen vehicles and identifying suspects in serious crimes.",
      crux: {
        id: "surveillance-crime-rct",
        title: "Randomized Controlled Trial of Surveillance Expansion",
        description:
          "A rigorous experimental evaluation of surveillance technology deployment in matched communities, measuring crime rates, crime displacement, civil liberties impacts, and community trust.",
        methodology:
          "Randomly assign surveillance technology deployment (CCTV, facial recognition, license plate readers) across matched neighborhoods. Measure crime rates in treated and control areas, including adjacent areas (to detect displacement). Track false positive rates, arrests based on surveillance, and community surveys on trust.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Multi-city randomized evaluation)",
      },
      evidence: [
        {
          id: "facial-recognition-crime-study",
          title: "Facial Recognition Linked to Reduced Violent Crime in 268 US Cities",
          description:
            "A 2024 study published in Cities analyzing 268 US cities from 1997 to 2020 found that police adoption of facial recognition applications facilitated reductions in rates of felony violence and homicide. Greater reductions were observed in cities that adopted these technologies earlier. The study found no evidence that adoption contributed to over-policing or racial disparities in violent crime arrests.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Cities (Elsevier), peer-reviewed (2024)",
          reasoning:
            "Peer-reviewed with large sample. However, observational design limits causal inference—cities that adopt facial recognition may differ in other policing investments. The 'no racial disparity' finding in arrests warrants independent replication.",
        },
        {
          id: "false-arrest-cases",
          title: "Facial Recognition Has Caused False Arrests of Innocent People",
          description:
            "In Detroit, Michigan, Robert Williams—a Black man with no criminal history—was falsely arrested based on an incorrect facial recognition match. At least six documented cases of false arrest from facial recognition errors have occurred in the US. Research found that some facial recognition algorithms misidentified darker-skinned females at a rate of 38% compared to 0.8% for lighter-skinned males.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "ACLU; Buolamwini & Gebru, Gender Shades Project, MIT (2018)",
          reasoning:
            "Documented cases of real harm to real people. The racial accuracy disparity is well-replicated across multiple studies and represents a serious equity concern.",
        },
        {
          id: "eff-scant-evidence-review",
          title: "EFF Review: 'Scant Evidence' Surveillance Reduces Crime",
          description:
            "The Electronic Frontier Foundation's comprehensive review of surveillance technologies found limited and mixed evidence for their effectiveness in reducing crime. While some studies show modest effects for CCTV on property crime, evidence for broader crime reduction is thin, and system-level evaluations are largely absent.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Electronic Frontier Foundation (EFF)",
          reasoning:
            "EFF is a respected digital rights organization but has an advocacy position against surveillance. Their review is thorough but should be read alongside pro-surveillance research.",
        },
      ],
    },
    {
      id: "privacy-civil-liberties",
      title: "Privacy & Civil Liberties",
      short_summary:
        "Facial recognition has a 96% accuracy rate for white men and an 80% accuracy rate for Black women. The false positives are not randomly distributed.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Mass surveillance creates a chilling effect on free speech, political dissent, and freedom of movement. Data collected for crime prevention is routinely repurposed for immigration enforcement, political monitoring, and commercial use. The Fourth Amendment was designed precisely to prevent government from watching all citizens at all times. Once surveillance infrastructure exists, it is virtually impossible to dismantle.",
      proponent_rebuttal:
        "Surveillance in public spaces does not violate reasonable expectations of privacy—you have no expectation of privacy on a public street. Targeted surveillance with judicial oversight (warrants) is constitutional and effective. Technology-specific regulations can provide guardrails: banning real-time facial recognition while allowing post-crime investigation, requiring data retention limits, and mandating transparency reports.",
      crux: {
        id: "surveillance-oversight-framework",
        title: "Effective Surveillance Oversight Model",
        description:
          "Determining whether surveillance technology can be deployed with oversight mechanisms sufficient to prevent civil liberties abuses while maintaining public safety benefits.",
        methodology:
          "Compare surveillance oversight frameworks across democracies (US, UK, EU, Japan). Measure abuse rates, false positive rates, scope creep, and public trust under different regulatory regimes.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Comparative policy study)",
      },
      evidence: [
        {
          id: "ice-electronic-monitoring",
          title: "ICE Monitors 700,000+ People Through Surveillance Technology",
          description:
            "Since April 2024, US Immigration and Customs Enforcement (ICE) has monitored over 700,000 people through the SmartLINK app, and 183,935 people have been subjected to electronic monitoring since March 2024. This demonstrates how surveillance infrastructure built for one purpose (public safety) is routinely expanded to other government objectives (immigration enforcement).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Government records; reporting by civil liberties organizations (2024)",
          reasoning:
            "Direct evidence of surveillance scope creep—the pattern that civil liberties advocates warn about. The scale (700,000+) is striking.",
        },
        {
          id: "china-surveillance-resistance",
          title: "Even in China, Excessive Surveillance Triggers Public Resistance",
          description:
            "A 2025 study published in the Journal of Chinese Political Science found that escalating digital surveillance in China has begun triggering public resistance, even in an authoritarian context. When surveillance is perceived as excessive or lacking legitimate purpose, citizens push back through complaint channels and collective action.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Journal of Chinese Political Science, Springer Nature (2025)",
          reasoning:
            "Interesting cross-cultural finding. If surveillance triggers resistance even in China, democratic societies may face even stronger backlash. However, China's context is very different from Western democracies.",
        },
      ],
    },
  ],
};

// ============================================================================
// Meaning of Life Without Religion
// ============================================================================

const meaningWithoutReligionData = {
  id: "meaning-without-religion",
  title: "Meaning of Life Without Religion",
  meta_claim:
    "A meaningful, fulfilling human life is fully achievable without religious belief, and secular philosophical frameworks provide adequate foundations for purpose, ethics, and existential satisfaction.",
  status: "highly_speculative" as const,
  category: "philosophy" as const,
  pillars: [
    {
      id: "secular-meaning-frameworks",
      title: "Secular Philosophical Frameworks",
      short_summary:
        "Existentialism, Stoicism, and secular humanism all offer frameworks for meaning. None of them replicate the weekly community that a church provides.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Religion provides a uniquely integrated package: a coherent cosmology, an objective moral framework, a sense of ultimate purpose, community belonging, rituals for life transitions, and hope for transcendence beyond death. Secular philosophies offer fragments of this but no single framework that matches religion's comprehensiveness. Pew Research data shows religious Americans report higher happiness (36% 'very happy' vs. 25% for unaffiliated). Existentialism's answer—'create your own meaning'—may be liberating for the philosophically inclined but offers cold comfort to most people facing suffering and mortality.",
      proponent_rebuttal:
        "Philosophical worldviews, humanism, and deeply held personal principles can provide the same core ingredients that make religion effective: a coherent understanding of the world, a sense of purpose and mattering, a feeling of belonging, and opportunities for transcendence. Researchers have found that committed nonreligious people (atheists, secular humanists) report wellbeing levels similar to religious individuals—the key variable is commitment to a worldview, not the worldview's content. The most secular societies on Earth (Denmark, Sweden, Netherlands) consistently rank among the happiest and most socially cohesive.",
      crux: {
        id: "secular-wellbeing-longitudinal",
        title: "Longitudinal Study of Secular vs. Religious Wellbeing",
        description:
          "A rigorous longitudinal comparison of life satisfaction, meaning, resilience, and community connection between committed secular humanists and committed religious practitioners, controlling for socioeconomic status and social support.",
        methodology:
          "Recruit matched cohorts of committed secular humanists and committed religious practitioners. Measure meaning in life (MLQ), life satisfaction (SWLS), psychological resilience, social connectedness, and coping with adversity over a 10-year period. Control for income, education, health, and social network size.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$3M (10-year longitudinal cohort study)",
      },
      evidence: [
        {
          id: "committed-nonreligious-wellbeing",
          title: "Committed Atheists Report Wellbeing Equal to Religious Practitioners",
          description:
            "A 2025 study published in PMC examined nonreligious wellbeing across four dimensions: identity, community involvement, identity duration, and affective orientation. Researchers found that committed nonreligious people—those with strong secular identities and community engagement—report levels of life satisfaction and psychological wellbeing similar to committed religious practitioners. The key factor is commitment to a worldview, not the presence of religious belief.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Varieties of Nonreligious Experience, PMC (2025)",
          reasoning:
            "Important nuance: the comparison is between committed secular people and committed religious people. The broader nonreligious population (which includes disengaged and apathetic individuals) may fare worse.",
        },
        {
          id: "pew-happiness-gap",
          title: "Pew: Religious Americans Report Higher Happiness",
          description:
            "Pew Research Center data consistently shows that actively religious Americans report higher levels of happiness than both inactively religious and unaffiliated individuals. In the US, 36% of the actively religious describe themselves as 'very happy,' compared to 25% of the inactively religious and 25% of the unaffiliated.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source: "Pew Research Center, Global Attitudes Survey",
          reasoning:
            "Gold-standard polling data. However, the happiness gap may reflect social community effects (church attendance provides social bonds) rather than metaphysical beliefs per se. In more secular societies (Northern Europe), the gap narrows or disappears.",
        },
        {
          id: "scandinavian-secular-happiness",
          title: "Most Secular Nations Rank Among the Happiest",
          description:
            "Denmark, Sweden, Finland, and the Netherlands—among the most secular nations on Earth—consistently rank in the top 10 of the World Happiness Report. These societies have some of the lowest rates of religious belief but achieve high life satisfaction through strong social safety nets, trust in institutions, and cultural emphasis on community. This suggests societal-level secularism is compatible with (and may even facilitate) human flourishing.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "World Happiness Report (2024); Pew Research Center",
          reasoning:
            "Robust data across multiple years and metrics. However, directness is limited because these nations' happiness likely stems from social democratic institutions, not secularism itself—it is difficult to isolate the effect of irreligion from strong safety nets.",
        },
      ],
    },
    {
      id: "ethics-without-god",
      title: "Moral Foundations Without Religion",
      short_summary:
        "Dostoevsky wrote 'if God is dead, everything is permitted.' Secular ethicists have spent 150 years arguing he was wrong. The debate is unresolved.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Without God, morality is merely human opinion elevated to principle—there is no objective foundation for saying anything is truly wrong. Evolutionary explanations of morality (kin selection, reciprocal altruism) describe why we feel moral emotions, not why we should act morally. Dostoevsky's question—'If there is no God, everything is permitted'—remains unanswered by secular philosophy. The 20th century's greatest atrocities were committed by explicitly atheistic regimes (Soviet Union, Maoist China, Khmer Rouge).",
      proponent_rebuttal:
        "Secular ethics grounds morality in human flourishing, suffering reduction, and rational principles (Kantian ethics, contractualism, utilitarianism) that do not require divine authority. The Euthyphro dilemma shows that divine command theory is incoherent: either God commands what is good (in which case goodness is independent of God) or good is whatever God commands (making morality arbitrary). Modern secular societies with the lowest religious belief have achieved far lower crime rates, higher social trust, and greater compassion than most historical theocracies.",
      crux: {
        id: "moral-foundation-independence",
        title: "Empirical Test of Moral Behavior vs. Religious Belief",
        description:
          "Determining whether religious belief actually predicts more moral behavior (charity, honesty, prosocial action) than secular moral commitments, after controlling for community engagement.",
        methodology:
          "Large-scale behavioral study comparing prosocial behavior (charitable giving, honesty in economic games, volunteering, altruistic punishment of unfairness) between religious and secular individuals. Control for community participation, income, education, and social desirability bias. Use behavioral measures, not self-report.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Cross-cultural behavioral economics study)",
      },
      evidence: [
        {
          id: "euthyphro-dilemma",
          title: "Euthyphro Dilemma: Divine Command Theory Is Incoherent",
          description:
            "Plato's Euthyphro dilemma (circa 380 BCE) poses a fundamental challenge to religious moral foundations: Is something good because God commands it, or does God command it because it is good? If the former, morality is arbitrary (God could command cruelty). If the latter, goodness exists independently of God, and religion is unnecessary for ethics. After 2,400 years, no widely accepted resolution has been offered.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Plato, Euthyphro; Stanford Encyclopedia of Philosophy",
          reasoning:
            "One of the most durable arguments in philosophy. However, sophisticated theologians (Aquinas, Plantinga) have offered responses, and the dilemma's force depends on accepting its framing.",
        },
        {
          id: "plos-one-both-paths",
          title: "Both Religious and Secular Ethics Predict Wellbeing",
          description:
            "A 2024 study published in PLOS ONE using panel data found that both religious and secular ethical frameworks predicted happiness and health outcomes. The study used a dynamic theoretical model showing that the mechanism matters more than the content—active engagement with any coherent moral framework (religious or secular) produced positive outcomes.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "PLOS ONE (2024)",
          reasoning:
            "Peer-reviewed with panel data methodology. Supports the view that secular and religious ethics are functionally equivalent for human flourishing. However, a single study should not be treated as definitive.",
        },
        {
          id: "atheist-regimes-atrocities",
          title: "Atheist Regimes Committed History's Worst Atrocities",
          description:
            "The explicitly atheistic regimes of the 20th century—the Soviet Union under Stalin, China under Mao, and Cambodia under the Khmer Rouge—committed some of history's worst mass atrocities, killing tens of millions. Critics argue this demonstrates what happens when societies abandon religious moral constraints and replace them with ideological absolutes.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source: "Historical consensus; various historians",
          reasoning:
            "The atrocities are historical fact. However, directness is low because these regimes were authoritarian ideologies that replaced religion with state worship—they did not represent secular humanism, liberal atheism, or philosophical naturalism.",
        },
      ],
    },
  ],
};

// ============================================================================
// Build Topics with Computed Confidence Scores
// ============================================================================

function buildTopic(data: Omit<Topic, "confidence_score"> & { confidence_score?: number }): Topic {
  // Compute confidence from evidence if not explicitly set to a high/settled value
  const computedScore = computeConfidenceScore(data.pillars);

  // For "settled" topics, use the higher of computed vs original (trust the data)
  // For contested topics, prefer computed score
  const finalScore = data.status === "settled"
    ? Math.max(computedScore, data.confidence_score ?? 0)
    : computedScore;

  return TopicSchema.parse({
    ...data,
    confidence_score: finalScore,
  });
}

// ============================================================================
// Export Topics
// ============================================================================

export const moonLanding = buildTopic(moonLandingData);
export const simulationHypothesis = buildTopic(simulationHypothesisData);
export const aiRisk = buildTopic(aiRiskData);
export const climateChange = buildTopic(climateChangeData);
export const freeWill = buildTopic(freeWillData);
export const minneapolisShooting = buildTopic(minneapolisShootingData);
export const labLeakTheory = buildTopic(labLeakTheoryData);
export const universalBasicIncome = buildTopic(universalBasicIncomeData);
export const socialMediaMentalHealth = buildTopic(socialMediaMentalHealthData);
export const cryptocurrencyValue = buildTopic(cryptocurrencyValueData);
export const gunControlEffectiveness = buildTopic(gunControlEffectivenessData);
export const nuclearEnergySafety = buildTopic(nuclearEnergySafetyData);
export const wealthTax = buildTopic(wealthTaxData);
export const aiContentLabeling = buildTopic(aiContentLabelingData);
export const remoteWorkPermanence = buildTopic(remoteWorkPermanenceData);
export const standardizedTestingValue = buildTopic(standardizedTestingValueData);
export const socialMediaAgeLimits = buildTopic(socialMediaAgeLimitsData);
export const collegeValueProposition = buildTopic(collegeValuePropositionData);
export const mandatoryVoting = buildTopic(mandatoryVotingData);
export const deathPenaltyDeterrence = buildTopic(deathPenaltyDeterrenceData);
export const billionaireWealth = buildTopic(billionaireWealthData);
export const homeschoolingEffectiveness = buildTopic(homeschoolingEffectivenessData);
export const policeReform = buildTopic(policeReformData);
export const drugDecriminalization = buildTopic(drugDecriminalizationData);
export const immigrationWageImpact = buildTopic(immigrationWageImpactData);
export const evEnvironmentalImpact = buildTopic(evEnvironmentalImpactData);
export const organicFoodHealth = buildTopic(organicFoodHealthData);
export const foreignAidEffectiveness = buildTopic(foreignAidEffectivenessData);
export const spaceExplorationValue = buildTopic(spaceExplorationValueData);
export const factoryFarmingBan = buildTopic(factoryFarmingBanData);
export const mediaBiasDemocracy = buildTopic(mediaBiasDemocracyData);
export const universalHealthcare = buildTopic(universalHealthcareData);
export const openBorders = buildTopic(openBordersData);
export const cancelCulture = buildTopic(cancelCultureData);
export const bigTechAntitrust = buildTopic(bigTechAntitrustData);
export const minimumWageEffects = buildTopic(minimumWageEffectsData);
export const geneEditingEmbryos = buildTopic(geneEditingEmbryosData);
export const reparationsSlavery = buildTopic(reparationsSlaveryData);
export const spaceColonizationFeasibility = buildTopic(spaceColonizationFeasibilityData);
export const veganismEnvironmental = buildTopic(veganismEnvironmentalData);
export const freeWillDeterminism = buildTopic(freeWillDeterminismData);
export const ubiEconomics = buildTopic(ubiEconomicsData);
export const standardizedTestingDebate = buildTopic(standardizedTestingDebateData);
export const labGrownMeat = buildTopic(labGrownMeatData);
export const aiConsciousness = buildTopic(aiConsciousnessData);
export const electoralCollegeReform = buildTopic(electoralCollegeReformData);
export const psychedelicsMentalHealth = buildTopic(psychedelicsMentalHealthData);
export const gigEconomyRegulation = buildTopic(gigEconomyRegulationData);
export const surveillancePublicSafety = buildTopic(surveillancePublicSafetyData);
export const meaningWithoutReligion = buildTopic(meaningWithoutReligionData);

export const topics: Topic[] = [
  // --- Policy & Governance ---
  nuclearEnergySafety,
  universalHealthcare,
  gunControlEffectiveness,
  minimumWageEffects,
  drugDecriminalization,
  deathPenaltyDeterrence,
  policeReform,
  mandatoryVoting,
  reparationsSlavery,
  immigrationWageImpact,
  openBorders,
  universalBasicIncome,
  wealthTax,
  standardizedTestingDebate,
  electoralCollegeReform,
  surveillancePublicSafety,

  // --- Technology & Society ---
  socialMediaAgeLimits,
  socialMediaMentalHealth,
  aiRisk,
  aiContentLabeling,
  bigTechAntitrust,
  cancelCulture,
  mediaBiasDemocracy,
  spaceColonizationFeasibility,
  labGrownMeat,

  // --- Science & Environment ---
  climateChange,
  evEnvironmentalImpact,
  factoryFarmingBan,
  organicFoodHealth,
  geneEditingEmbryos,
  spaceExplorationValue,
  veganismEnvironmental,
  psychedelicsMentalHealth,

  // --- Economics & Education ---
  remoteWorkPermanence,
  collegeValueProposition,
  standardizedTestingValue,
  homeschoolingEffectiveness,
  billionaireWealth,
  foreignAidEffectiveness,
  cryptocurrencyValue,
  ubiEconomics,
  gigEconomyRegulation,

  // --- Philosophy & Speculation ---
  labLeakTheory,
  freeWill,
  simulationHypothesis,
  moonLanding,
  minneapolisShooting,
  freeWillDeterminism,
  aiConsciousness,
  meaningWithoutReligion,
];

// ============================================================================
// Featured Topic of the Week
// ============================================================================

/** Rotate this ID weekly to feature a different debate on the homepage. */
export const featuredTopicId = "social-media-mental-health";

/** Short editorial hook explaining why this topic is featured right now. */
export const featuredReason =
  "The Surgeon General just called for warning labels on social media. Where does the evidence actually land?";

// ============================================================================
// Category Helpers
// ============================================================================

export const CATEGORY_LABELS: Record<TopicCategory, string> = {
  policy: "Policy",
  technology: "Technology",
  science: "Science",
  economics: "Economics",
  philosophy: "Philosophy",
};

export const CATEGORY_ORDER: TopicCategory[] = [
  "policy",
  "technology",
  "science",
  "economics",
  "philosophy",
];

/** Get topics grouped by category. */
export function getTopicsByCategory(): Record<TopicCategory, Topic[]> {
  const grouped: Record<TopicCategory, Topic[]> = {
    policy: [],
    technology: [],
    science: [],
    economics: [],
    philosophy: [],
  };
  for (const topic of topics) {
    grouped[topic.category].push(topic);
  }
  return grouped;
}


// ============================================================================
// Cross-Category Related Topics (Thematic Clusters)
// ============================================================================

/**
 * Maps topic IDs to thematically related topics across different categories.
 * These clusters connect topics that share underlying themes even when they
 * belong to different categories (e.g., criminal justice, energy/environment).
 */
const CROSS_CATEGORY_CLUSTERS: Record<string, string[]> = {
  // Criminal justice cluster
  "gun-control-effectiveness": ["death-penalty-deterrence", "police-reform", "drug-decriminalization", "surveillance-public-safety"],
  "death-penalty-deterrence": ["gun-control-effectiveness", "police-reform", "drug-decriminalization", "reparations-slavery"],
  "police-reform": ["gun-control-effectiveness", "death-penalty-deterrence", "surveillance-public-safety", "reparations-slavery"],

  // Energy & environment cluster
  "nuclear-energy-safety": ["climate-change", "ev-environmental-impact", "veganism-environmental-impact", "space-exploration-value"],
  "climate-change": ["nuclear-energy-safety", "ev-environmental-impact", "veganism-environmental-impact", "factory-farming-ban"],
  "ev-environmental-impact": ["nuclear-energy-safety", "climate-change", "veganism-environmental-impact", "lab-grown-meat-adoption"],

  // Economic inequality cluster
  "universal-basic-income": ["wealth-tax", "billionaire-wealth", "ubi-economics", "minimum-wage-effects"],
  "wealth-tax": ["universal-basic-income", "billionaire-wealth", "ubi-economics", "open-borders"],
  "billionaire-wealth": ["wealth-tax", "universal-basic-income", "ubi-economics", "gig-economy-regulation"],

  // AI governance cluster
  "ai-risk": ["ai-content-labeling", "consciousness-ai-systems", "social-media-mental-health", "big-tech-antitrust"],
  "ai-content-labeling": ["ai-risk", "consciousness-ai-systems", "media-bias-democracy", "cancel-culture"],
  "consciousness-ai-systems": ["ai-risk", "ai-content-labeling", "free-will-determinism", "simulation-hypothesis"],

  // Tech & society cluster
  "social-media-mental-health": ["social-media-age-limits", "cancel-culture", "big-tech-antitrust", "ai-risk"],
  "social-media-age-limits": ["social-media-mental-health", "cancel-culture", "surveillance-public-safety", "big-tech-antitrust"],
  "big-tech-antitrust": ["social-media-mental-health", "social-media-age-limits", "ai-content-labeling", "media-bias-democracy"],

  // Philosophy cluster
  "free-will-determinism": ["free-will", "simulation-hypothesis", "meaning-without-religion", "consciousness-ai-systems"],
  "simulation-hypothesis": ["free-will-determinism", "consciousness-ai-systems", "ai-risk", "meaning-without-religion"],
  "meaning-without-religion": ["free-will-determinism", "simulation-hypothesis", "free-will", "consciousness-ai-systems"],
  "free-will": ["free-will-determinism", "meaning-without-religion", "simulation-hypothesis", "consciousness-ai-systems"],

  // Education cluster
  "standardized-testing-value": ["standardized-testing-debate", "college-value-proposition", "homeschooling-effectiveness", "foreign-aid-effectiveness"],
  "standardized-testing-debate": ["standardized-testing-value", "college-value-proposition", "homeschooling-effectiveness", "mandatory-voting"],
  "college-value-proposition": ["standardized-testing-value", "homeschooling-effectiveness", "remote-work-permanence", "ubi-economics"],
  "homeschooling-effectiveness": ["college-value-proposition", "standardized-testing-value", "standardized-testing-debate", "social-media-age-limits"],

  // Health & food cluster
  "organic-food-health": ["veganism-environmental-impact", "factory-farming-ban", "lab-grown-meat-adoption", "gene-editing-embryos"],
  "factory-farming-ban": ["organic-food-health", "veganism-environmental-impact", "lab-grown-meat-adoption", "climate-change"],
  "veganism-environmental-impact": ["factory-farming-ban", "organic-food-health", "climate-change", "lab-grown-meat-adoption"],
  "lab-grown-meat-adoption": ["factory-farming-ban", "organic-food-health", "veganism-environmental-impact", "gene-editing-embryos"],
  "psychedelics-mental-health": ["drug-decriminalization", "social-media-mental-health", "meaning-without-religion", "gene-editing-embryos"],
  "gene-editing-embryos": ["organic-food-health", "psychedelics-mental-health", "lab-grown-meat-adoption", "ai-risk"],

  // Governance & democracy cluster
  "mandatory-voting": ["electoral-college-reform", "media-bias-democracy", "cancel-culture", "open-borders"],
  "electoral-college-reform": ["mandatory-voting", "media-bias-democracy", "reparations-slavery", "surveillance-public-safety"],
  "media-bias-democracy": ["cancel-culture", "ai-content-labeling", "mandatory-voting", "big-tech-antitrust"],
  "cancel-culture": ["media-bias-democracy", "social-media-mental-health", "social-media-age-limits", "big-tech-antitrust"],
  "surveillance-public-safety": ["police-reform", "social-media-age-limits", "gun-control-effectiveness", "big-tech-antitrust"],

  // Immigration & global policy cluster
  "open-borders": ["immigration-wage-impact", "universal-basic-income", "reparations-slavery", "foreign-aid-effectiveness"],
  "immigration-wage-impact": ["open-borders", "minimum-wage-effects", "universal-basic-income", "foreign-aid-effectiveness"],
  "reparations-slavery": ["police-reform", "death-penalty-deterrence", "wealth-tax", "electoral-college-reform"],
  "foreign-aid-effectiveness": ["open-borders", "immigration-wage-impact", "universal-healthcare", "space-exploration-value"],

  // Work & economy cluster
  "remote-work-permanence": ["gig-economy-regulation", "college-value-proposition", "ubi-economics", "minimum-wage-effects"],
  "gig-economy-regulation": ["remote-work-permanence", "minimum-wage-effects", "billionaire-wealth", "ubi-economics"],
  "minimum-wage-effects": ["universal-basic-income", "gig-economy-regulation", "immigration-wage-impact", "remote-work-permanence"],
  "ubi-economics": ["universal-basic-income", "wealth-tax", "remote-work-permanence", "gig-economy-regulation"],
  "cryptocurrency-value": ["big-tech-antitrust", "wealth-tax", "gig-economy-regulation", "surveillance-public-safety"],

  // Healthcare cluster
  "universal-healthcare": ["universal-basic-income", "drug-decriminalization", "psychedelics-mental-health", "foreign-aid-effectiveness"],
  "drug-decriminalization": ["psychedelics-mental-health", "police-reform", "universal-healthcare", "gun-control-effectiveness"],

  // Space & science cluster
  "space-exploration-value": ["space-colonization-feasibility", "nuclear-energy-safety", "simulation-hypothesis", "climate-change"],
  "space-colonization-feasibility": ["space-exploration-value", "ai-risk", "nuclear-energy-safety", "simulation-hypothesis"],
  "moon-landing": ["space-exploration-value", "simulation-hypothesis", "lab-leak-theory", "media-bias-democracy"],
  "lab-leak-theory": ["moon-landing", "media-bias-democracy", "surveillance-public-safety", "organic-food-health"],
  "minneapolis-shooting": ["police-reform", "media-bias-democracy", "gun-control-effectiveness", "cancel-culture"],
};

/**
 * Returns cross-category related topics for a given topic ID.
 * These are thematically related topics from DIFFERENT categories.
 * Returns up to `limit` topics, excluding the current topic and any
 * topics already shown as same-category related.
 */
export function getCrossCategoryRelated(
  topicId: string,
  currentCategory: TopicCategory,
  limit = 4
): Topic[] {
  const clusterIds = CROSS_CATEGORY_CLUSTERS[topicId] ?? [];
  return clusterIds
    .map((id) => topics.find((t) => t.id === id))
    .filter((t): t is Topic => t != null && t.category !== currentCategory)
    .slice(0, limit);
}
