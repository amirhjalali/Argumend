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
