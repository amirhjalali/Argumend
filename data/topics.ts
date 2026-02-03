import { Topic, TopicSchema, computeConfidenceScore } from "@/lib/schemas/topic";

// ============================================================================
// Moon Landing Topic
// ============================================================================

const moonLandingData = {
  id: "moon-landing",
  title: "The Moon Landing",
  meta_claim:
    "The Apollo missions successfully landed 12 humans on the lunar surface between 1969 and 1972.",
  status: "settled" as const,
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

export const topics: Topic[] = [
  moonLanding,
  simulationHypothesis,
  aiRisk,
  freeWill,
  climateChange,
  minneapolisShooting,
  labLeakTheory,
  universalBasicIncome,
  socialMediaMentalHealth,
  cryptocurrencyValue,
  gunControlEffectiveness,
  nuclearEnergySafety,
  wealthTax,
];
