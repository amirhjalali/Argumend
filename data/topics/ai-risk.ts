import type { Topic } from "@/lib/schemas/topic";

export const aiRiskData = {
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
