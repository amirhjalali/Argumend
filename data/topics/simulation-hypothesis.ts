import type { Topic } from "@/lib/schemas/topic";

export const simulationHypothesisData = {
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
          title: "OpenWorm Builds an Integrative C. elegans Model",
          description:
            "The OpenWorm project is building an open-science, whole-organism computational model of C. elegans, integrating its 302-neuron connectome with a soft-body physics simulation. As of the 2014 overview paper, realistic locomotion and chemotaxis remain explicit future goals rather than achieved results.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Szigeti et al., 'OpenWorm: an open-science approach to modeling C. elegans,' Frontiers in Computational Neuroscience (2014)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4217485/",
          reasoning:
            "Peer-reviewed account of an in-progress whole-organism model; full behavioral replication (locomotion, chemotaxis) is not yet demonstrated, so directness/replicability are lowered.",
        },
        {
          id: "ai-emergence",
          title: "Large Language Models Show Emergent Abilities",
          description:
            "Wei et al. report that large language models display abilities absent in smaller models that are not predictable by extrapolation, an analogy for complex behavior arising from information processing. (Note: whether these are genuine emergence or a measurement artifact is contested.)",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 3,
          },
          source:
            "Wei et al., 'Emergent Abilities of Large Language Models,' TMLR (2022), arXiv:2206.07682",
          sourceUrl: "https://arxiv.org/abs/2206.07682",
          reasoning:
            "An analogy, not direct evidence for substrate independence of consciousness; directness kept low, and the emergence claim itself is disputed.",
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
          source:
            "David J. Chalmers, 'Facing Up to the Problem of Consciousness,' Journal of Consciousness Studies 2(3):200-219 (1995)",
          sourceUrl: "https://consc.net/papers/facing.pdf",
          reasoning:
            "Canonical statement of the 'hard problem'; a philosophical argument, so replicability is inherently low.",
        },
        {
          id: "penrose-argument",
          title: "Penrose-Lucas Argument",
          description:
            "Lucas (1961) and Penrose (The Emperor's New Mind, 1989; Shadows of the Mind, 1994) argue from Gödel's first incompleteness theorem that human mathematical insight is non-algorithmic and so cannot be reproduced by computation. The argument is widely contested by logicians.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 3,
            directness: 5,
          },
          source:
            "Roger Penrose, The Emperor's New Mind (1989) / Shadows of the Mind (1994); after J.R. Lucas, 'Minds, Machines and Gödel' (1961)",
          sourceUrl: "https://iep.utm.edu/lp-argue/",
          reasoning:
            "A contested philosophical/logical argument against computationalism; lowered source reliability and replicability to reflect that many logicians reject it.",
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
          title: "Bostrom's Trilemma Is Logically Valid",
          description:
            "Bostrom argues at least one of three propositions is true: (1) civilizations almost always go extinct before reaching a 'posthuman' stage, (2) posthuman civilizations almost never run ancestor-simulations, or (3) we are almost certainly living in a simulation. Only if (3) holds does it follow that simulated observers vastly outnumber base-reality observers.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Nick Bostrom, 'Are You Living in a Computer Simulation?', Philosophical Quarterly 53(211):243-255 (2003)",
          sourceUrl: "https://www.simulation-argument.com/simulation.html",
          reasoning:
            "Peer-reviewed in Philosophical Quarterly; the valid conclusion is the disjunction, not proposition (3) alone, so directness toward the simulation claim is moderate.",
        },
        {
          id: "compute-trends",
          title: "Exponential Growth in Computing Power",
          description:
            "Computing power has grown exponentially for decades. Sevilla et al. document that the compute used to train machine-learning systems grew by a factor of about 10 billion from 2010 onward, doubling roughly every 6 months in the deep-learning era. Whether this trend can extrapolate to ancestor-simulation scale is highly uncertain.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 3,
          },
          source:
            "Sevilla et al., 'Compute Trends Across Three Eras of Machine Learning,' IJCNN 2022, arXiv:2202.05924",
          sourceUrl: "https://arxiv.org/abs/2202.05924",
          reasoning:
            "Well-documented empirical trend, but its relevance to feasibility of conscious ancestor simulations is speculative, so directness is low.",
        },
        {
          id: "premise-rejection",
          title: "Premises May Be Wrong",
          description:
            "The argument depends on contested premises, notably substrate-independence and an indifference principle. Weatherson argues Bostrom needs but lacks a defense of the claim that evidence supervenes on conscious experience, undercutting the inference that we are probably simulated.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 4,
            directness: 6,
          },
          source:
            "Brian Weatherson, 'Are You a Sim?', Philosophical Quarterly 53(212):425-431 (2003)",
          sourceUrl: "http://brian.weatherson.org/sims.pdf",
          reasoning:
            "Published peer critique of the argument's premises; a philosophical objection, so replicability is low.",
        },
        {
          id: "unfalsifiable",
          title: "Hypothesis Risks Being Unfalsifiable",
          description:
            'By Popper\'s demarcation criterion, a theory is scientific only if some conceivable observation could refute it. The objection holds that because any apparent evidence could itself be "simulated," the strong simulation claim may prohibit no observation and so fail the falsifiability test. (Some physicists, e.g. Beane et al., argue specific lattice variants are in fact testable.)',
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source:
            "Karl Popper, The Logic of Scientific Discovery (1934/1959), falsifiability criterion",
          sourceUrl: "https://en.wikipedia.org/wiki/Falsifiability",
          reasoning:
            "Applies Popper's well-known demarcation criterion; a philosophy-of-science objection, and note that some lattice-simulation variants are testable.",
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
          title: "Some Quantum Quantities Are Discrete",
          description:
            "Bound-state energy levels and angular momentum/spin come in discrete quanta, which proponents liken to digital systems. (Caveat: this is selective. Position, momentum, time, and free-particle energy remain continuous in standard quantum mechanics, so 'reality is discrete' is an overstatement.)",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 2,
          },
          source:
            "Quantization of energy and angular momentum (standard quantum mechanics)",
          sourceUrl: "https://en.wikipedia.org/wiki/Quantization_(physics)",
          reasoning:
            'Underlying physics is well-established, but the "simulation evidence" reading is speculative and the discreteness is selective, so directness is very low.',
        },
        {
          id: "holographic-principle",
          title: "Holographic Principle",
          description:
            "The holographic principle (proposed by 't Hooft, given a string-theoretic form by Susskind in 'The World as a Hologram') holds that the information in a volume of space is bounded by, and can be encoded on, its boundary area. Proponents read this as 'data compression,' but that interpretation is not part of the physics.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 3,
          },
          source:
            "Leonard Susskind, 'The World as a Hologram,' J. Math. Phys. 36:6377 (1995), arXiv:hep-th/9409089",
          sourceUrl: "https://arxiv.org/abs/hep-th/9409089",
          reasoning:
            "A genuine theoretical-physics result, but the 'simulation/compression' reading is an interpretive overlay, so directness toward the simulation claim is low.",
        },
        {
          id: "no-lattice-detected",
          title: "No Spacetime-Lattice Signature Detected",
          description:
            "Beane, Davoudi and Savage propose that if our universe were a cubic-lattice simulation, the highest-energy cosmic rays should show rotational-symmetry breaking aligned with the lattice. From the cosmic-ray spectrum cutoff they derive a bound on the inverse lattice spacing of b^-1 >~ 10^11 GeV; no such lattice-orientation signature has been observed. (Note: the large-scale dipole Auger does see above 8 EeV is attributed to an extragalactic astrophysical origin, not to a spacetime lattice.)",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Beane, Davoudi & Savage, 'Constraints on the Universe as a Numerical Simulation,' Eur. Phys. J. A 50:148 (2014), arXiv:1210.1847",
          sourceUrl: "https://arxiv.org/abs/1210.1847",
          reasoning:
            "Peer-reviewed physics proposal; it sets a lower bound and a test rather than a fully executed null result, and the only observed cosmic-ray anisotropy is astrophysical, so directness is moderated.",
        },
        {
          id: "natural-explanations",
          title: "Physics Has Natural Explanations",
          description:
            "Quantum mechanics and relativity are derived from independently motivated physical principles, so the 'computational' features cited by proponents already have non-simulation explanations. By Occam's razor (do not multiply entities beyond necessity), invoking an unseen simulator adds assumptions without added explanatory power.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 4,
            directness: 5,
          },
          source:
            "Principle of parsimony (Occam's razor) applied to established physics",
          sourceUrl: "https://plato.stanford.edu/entries/simplicity/",
          reasoning:
            "A methodological/parsimony argument rather than an empirical finding, so replicability and directness are kept low.",
        },
      ],
    },
  ],
};
