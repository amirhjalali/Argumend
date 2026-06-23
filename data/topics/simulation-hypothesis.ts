import type { Topic } from "@/lib/schemas/topic";

export const simulationHypothesisData = {
  id: "simulation-hypothesis",
  title: "The Simulation Hypothesis",
  meta_claim:
    "Bostrom's simulation argument shows that at least one of three propositions holds: near-universal extinction before a post-human stage, near-universal disinterest in running ancestor-simulations, or our almost certainly living in one. Whether the third disjunct in particular is true, and whether the claim is even testable, remains contested.",
  status: "contested" as const,
  category: "philosophy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Bostrom's simulation argument does not conclude that we live in a simulation. It is a trilemma: at least one of three things must be true — almost all civilizations go extinct before reaching a posthuman stage, almost none of those that survive run ancestor-simulations, or we are almost certainly simulated. The famous headline is only one of the three branches, and the argument by itself gives you no way to know which.",
    confidence: 88,
    source:
      "Nick Bostrom, 'Are You Living in a Computer Simulation?', Philosophical Quarterly 53(211):243-255 (2003)",
    sourceUrl: "https://www.simulation-argument.com/simulation.html",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The argument is genuinely clever: if conscious minds can run on computers and far-future civilizations run even a few high-fidelity ancestor-simulations each, then simulated observers would vastly outnumber the handful of biological originals — so a randomly chosen observer (you) would more likely be simulated than not.",
    "But the conclusion is conditional, not forced: it only follows if you grant that consciousness is substrate-independent and that posthuman civilizations both arise and choose to run such simulations — and physicists who proposed a real test (looking for a cubic spacetime lattice in the highest-energy cosmic rays) have found no such signature, setting a lower bound on any lattice spacing of about 10^11 GeV.",
    "So the honest debate isn't 'are we in a simulation, yes or no' but which branch of Bostrom's trilemma is most likely true — and whether the whole claim is even falsifiable, since the strongest version predicts no observation a simulator couldn't also fake.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Bostrom's Original Paper (2003)",
      url: "https://www.simulation-argument.com/simulation.html",
    },
    { title: "OpenWorm Project", url: "https://openworm.org/" },
    { title: "Pierre Auger Observatory", url: "https://www.auger.org/" },
    {
      title:
        "Beane, Davoudi & Savage, 'Constraints on the Universe as a Numerical Simulation' (2014), arXiv:1210.1847",
      url: "https://arxiv.org/abs/1210.1847",
    },
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
        "Neurons are information processors obeying physical laws. The OpenWorm project has mapped the 302-neuron C. elegans connectome and reproduces basic locomotion in simulation, though full behavioral replication (chemotaxis, learning) remains a stated future goal. The functionalist claim is that if we capture the relevant input-output structure of a brain, the resulting system should be functionally equivalent, and on a functionalist view of mind, conscious.",
      crux: {
        id: "whole-brain-emulation",
        title: "The OpenWorm Test",
        description:
          "The C. elegans nematode has exactly 302 neurons with a fully mapped connectome. If a digital model were to reproduce the worm's full behavioral repertoire (chemotaxis, avoidance, learning) from the connectome alone, functionalism about behavior would gain support. As of the 2014 OpenWorm overview, only basic locomotion has been demonstrated; chemotaxis remains a future goal, so this is a proposed test rather than a settled result.",
        methodology:
          "Once a connectome-derived model produces candidate behaviors, compare simulated worm behavior to the biological worm across 50+ behavioral assays: chemotaxis toward food, avoidance of noxious stimuli, mating behavior, and learning patterns.",
        equation:
          "H(B_{sim}) \\approx H(B_{bio}) \\implies \\text{Substrate Independence}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (OpenWorm project ongoing at openworm.org)",
        falsification: {
          supporter_flip:
            "If a connectome-derived digital C. elegans (its 302 neurons plus body physics) reproduced the worm's full behavioral repertoire — chemotaxis, noxious-stimulus avoidance, mating, and learning — across dozens of assays, yet a biological-physics theory of consciousness (e.g. Penrose-Hameroff Orch-OR) made a confirmed prediction that no digital model could match, a supporter of substrate independence would have to concede that capturing input-output structure is not sufficient.",
          skeptic_flip:
            "A skeptic who insists biology is special should weigh that neurons are physical information processors with no known non-computable step, that OpenWorm already reproduces basic forward/backward locomotion from the connectome, and that the Penrose-Lucas appeal to Gödel is rejected by most logicians — so 'neurons can't be simulated in principle' is an assertion, not an established result.",
          common_ground:
            "Both sides agree the 302-neuron connectome is fully mapped, that basic locomotion has been simulated, and that full behavioral replication (chemotaxis, learning) has not yet been demonstrated.",
          live_disagreement:
            "Whether full behavioral equivalence can be achieved from the connectome alone — and, even if it can, whether behavioral equivalence settles anything about subjective experience (the hard problem). A completed OpenWorm behavioral match would resolve the first question but not automatically the second.",
        },
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
          "If post-human civilizations run N ancestor simulations each with M conscious observers, and the base reality has B observers, then f_sim = (N×M) / (N×M + B). Conditional on the first two disjuncts failing (civilizations usually reach a post-human stage AND a non-trivial fraction run ancestor-simulations), large N drives f_sim toward 1. That conditional is exactly what the first two propositions of the trilemma may block, so the high f_sim is one disjunct, not a forced conclusion.",
        methodology:
          "Estimate: (1) probability of reaching post-human stage, (2) fraction running ancestor sims, (3) average number of sims per civilization. Calculate f_sim.",
        equation:
          "f_{sim} = \\frac{N \\cdot M}{N \\cdot M + B} \\to 1 \\text{ as } N \\to \\infty",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Philosophical analysis)",
        falsification: {
          supporter_flip:
            "A supporter of the high-f_sim branch should change their mind if a published flaw were found in the indifference (bland-principle) reasoning Bostrom uses to move from 'most observers are simulated' to 'you are probably simulated' — the line of attack Weatherson presses — or if substrate independence were shown false, since the fraction calculation only bites once both premises hold.",
          skeptic_flip:
            "A skeptic should weigh that, conditional on the first two disjuncts failing, the arithmetic is hard to escape: if even a tiny fraction of surviving civilizations run many ancestor-simulations, simulated observers swamp the biological originals, so dismissing the conclusion requires committing to one of the other two branches (near-universal extinction or near-universal disinterest), not to none of them.",
          common_ground:
            "Both sides accept that the trilemma's disjunction is logically valid and that at least one of the three propositions must hold; the dispute is over which one, not over the validity of the argument.",
          live_disagreement:
            "Whether Bostrom's indifference principle legitimately licenses self-locating ('you are probably a sim') belief from the population fact — a question of formal epistemology and anthropic reasoning that a decisive critique or defense, rather than any empirical measurement, would resolve.",
        },
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
        'Proponents read some features of physics as "computational," but each already has a standard physical explanation.',
      image_url:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        'The Planck scale is a natural consequence of quantum gravity, not evidence of "pixelation." The speed-of-light limit follows from relativity, and the "discreteness" proponents cite is selective: only bound-state energies and angular momentum are quantized, while position, momentum, and time remain continuous. None of this requires a simulator.',
      proponent_rebuttal:
        "Multiple features align with computational optimization: the speed of light (bandwidth limit), quantum superposition (lazy evaluation), measurement collapse (rendering on observation), and the holographic principle (data compression).",
      crux: {
        id: "cosmic-ray-anisotropy",
        title: "The GZK Cutoff Test",
        description:
          "Beane, Davoudi and Savage note that if spacetime were a cubic simulation lattice, the highest-energy cosmic rays should show rotational-symmetry breaking aligned with the lattice axes. The Pierre Auger Observatory can search for such a signature. Importantly, the large-scale dipole Auger has actually detected (above 8 EeV) points to an extragalactic astrophysical origin and is not a lattice-orientation pattern, so it is not evidence for a simulated lattice.",
        methodology:
          "Analyze arrival directions of cosmic rays near the GZK cutoff (~5×10¹⁹ eV) for rotational-symmetry breaking aligned with a cubic lattice, the specific signature Beane et al. derive. A generic dipole (as Auger observes) does not qualify; it must be the lattice-axis pattern. Absence of that pattern bounds the inverse lattice spacing.",
        equation:
          "E_{GZK} \\approx 5 \\times 10^{19} \\text{ eV}; \\quad \\Delta\\theta < 0.1° \\text{ precision}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Pierre Auger Observatory data is public)",
        falsification: {
          supporter_flip:
            "A supporter who reads physics as 'computational' should treat the proposal as testable and update on its result: if high-energy cosmic-ray arrival directions showed rotational-symmetry breaking specifically aligned with cubic-lattice axes — the exact Beane-Davoudi-Savage signature, not a generic dipole — it would be positive evidence for a lattice simulation; the continued absence of that pattern, against the bound b^-1 >~ 10^11 GeV they derive, is evidence the other way.",
          skeptic_flip:
            "A skeptic should weigh that the cited 'computational' features each already follow from independently motivated physics — the Planck scale from quantum gravity, the light-speed limit from relativity, and the quantization that is real is selective (bound-state energies and spin, not position, momentum, or time) — so by parsimony none of them require a simulator, and the one anisotropy Auger does see (the >8 EeV dipole) is attributed to an extragalactic astrophysical origin, not a lattice.",
          common_ground:
            "Both sides agree the relevant physics (quantization, the holographic bound, the GZK cutoff) is well-established and that no lattice-orientation signature in cosmic rays has actually been observed.",
          live_disagreement:
            "Whether a cubic-lattice simulation of the specific Beane-Davoudi-Savage form is ruled out at finer lattice spacings — which higher-statistics, higher-angular-resolution cosmic-ray data near the GZK cutoff could push further, while leaving non-cubic or adaptive 'simulation' architectures untouched.",
        },
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
