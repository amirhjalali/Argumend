import type { Topic } from "@/lib/schemas/topic";

export const freeWillData = {
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
