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
          source:
            "Libet, Gleason, Wright & Pearl, Brain 106:623-642 (1983)",
          sourceUrl: "https://academic.oup.com/brain/article-abstract/106/3/623/271932",
          reasoning:
            "Robust, much-replicated finding; the deterministic interpretation (not the data) is what's contested.",
        },
        {
          id: "soon-fmri",
          title: "Soon et al. fMRI Prediction",
          description:
            "fMRI patterns in prefrontal and parietal cortex predicted a left/right button choice up to ~10s before the reported decision, but only ~60% of the time (chance = 50%).",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Soon, Brass, Heinze & Haynes, Nature Neuroscience 11:543-545 (2008)",
          sourceUrl: "https://www.nature.com/articles/nn.2112",
          reasoning:
            "Extends Libet, but ~60% accuracy is barely above chance — a weak bias signal, not a determined outcome.",
        },
        {
          id: "veto-evidence",
          title: "Subjects Can Veto Actions",
          description:
            'Libet reported subjects could consciously abort (veto) a prepared movement after the readiness potential began — the "free won\'t."',
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source:
            "Libet, Behavioral and Brain Sciences 8:529-566 (1985)",
          sourceUrl: "https://doi.org/10.1017/S0140525X00044903",
          reasoning:
            'Preserves a role for conscious "free won\'t" if not "free will"; based on subjective veto reports, not independently replicated as cleanly as the RP itself.',
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
          source:
            "Schurger, Sitt & Dehaene, PNAS 109:E2904-E2913 (2012)",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.1210467109",
          reasoning:
            "Influential stochastic-accumulator reinterpretation: the RP may be an artifact of averaging spontaneous fluctuations, undercutting the determinist reading of Libet.",
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
            "Every physical event has a sufficient physical cause (the causal-closure principle), leaving no room for non-physical mental causation.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Papineau, 'The Causal Closure of the Physical and Naturalism', in The Oxford Handbook of Philosophy of Mind (2009)",
          sourceUrl: "https://philpapers.org/rec/PAPTCC-4",
          reasoning:
            "Widely-held metaphysical thesis, not an empirical result; its bearing on free will depends on contested premises about mental causation.",
        },
        {
          id: "laplace-demon",
          title: "Laplacian Determinism",
          description:
            "Laplace's demon: given complete knowledge of the universe's state and laws, all future states are fixed and predictable in principle.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Laplace, A Philosophical Essay on Probabilities (1814)",
          sourceUrl:
            "https://plato.stanford.edu/entries/determinism-causal/",
          reasoning:
            "Foundational statement of classical determinism; superseded as physics by indeterministic quantum mechanics, so weighted as a historical/conceptual argument.",
        },
        {
          id: "compatibilism",
          title: "Compatibilist Free Will",
          description:
            "In the 2020 PhilPapers Survey, 62% of professional philosophers accepted or leaned toward compatibilism (vs. 13% libertarianism, 10% no free will).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Bourget & Chalmers, 'Philosophers on Philosophy: The 2020 PhilPapers Survey'",
          sourceUrl: "https://survey2020.philpeople.org/survey/results/4838",
          reasoning:
            "A plurality of experts, though directness is low: it reflects opinion and a reinterpretation of 'free,' not first-order evidence about whether libertarian free will exists.",
        },
        {
          id: "quantum-indeterminacy",
          title: "Quantum Mechanics Is Indeterministic",
          description:
            "On standard (e.g. Copenhagen) interpretations, fundamental physics includes genuine indeterminism, breaking strict Laplacian determinism.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 3,
          },
          source:
            "Stanford Encyclopedia of Philosophy, 'Causal Determinism' (Hoefer)",
          sourceUrl:
            "https://plato.stanford.edu/entries/determinism-causal/",
          reasoning:
            "Well-established physics, but directness is very low: quantum randomness undermines determinism without delivering agent control — randomness is not the same as free will.",
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
            "Praise, blame, and holding-responsible appear on standard lists of human universals — found in every documented culture.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source: "Brown, Human Universals (McGraw-Hill, 1991)",
          sourceUrl:
            "https://en.wikipedia.org/wiki/Cultural_universal",
          reasoning:
            "Universality of the practice doesn't establish libertarian free will — the intuition could be pragmatic or adaptive rather than tracking a metaphysical fact.",
        },
        {
          id: "responsibility-beliefs-matter",
          title: "Belief in Free Will Affects Behavior",
          description:
            "Vohs & Schooler (2008) found participants primed with anti-free-will text cheated more; however, a large preregistered multi-lab replication (Buttrick et al., 2020) failed to reproduce the effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 4,
            independence: 5,
            replicability: 2,
            directness: 3,
          },
          source:
            "Vohs & Schooler, Psychological Science 19(1):49-54 (2008); failed replication: Buttrick et al., J. Exp. Soc. Psychol. 91 (2020)",
          sourceUrl: "https://doi.org/10.1111/j.1467-9280.2008.02045.x",
          reasoning:
            "Originally cited as a pragmatic argument for believing in free will, but the headline effect did not survive a preregistered replication — weight heavily discounted.",
        },
        {
          id: "brain-damage-cases",
          title: "Brain Damage Changes Moral Behavior",
          description:
            "Phineas Gage's frontal-lobe injury (1848) and modern lesion/tumor cases show that physical brain changes can alter personality and moral behavior.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Harlow, 'Passage of an Iron Rod Through the Head', Boston Med. Surg. J. (1848); see also Damasio et al., Science 264:1102-1105 (1994)",
          sourceUrl:
            "https://en.wikipedia.org/wiki/Phineas_Gage",
          reasoning:
            "Demonstrates a physical basis for moral character; note the popular Gage narrative is partly embellished, so the case is suggestive rather than decisive on its own.",
        },
        {
          id: "genetics-of-behavior",
          title: "Behavioral Genetics",
          description:
            "A meta-analysis of 50 years of twin studies (17,804 traits) found ~49% average heritability across human traits, including many personality and behavioral tendencies.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "Polderman et al., Nature Genetics 47:702-709 (2015)",
          sourceUrl: "https://www.nature.com/articles/ng.3285",
          reasoning:
            "Genes significantly influence behavior we hold people responsible for; but heritability is a population statistic, not a measure of individual fate, so directness to free will is limited.",
        },
      ],
    },
  ],
};
