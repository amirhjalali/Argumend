import type { Topic } from "@/lib/schemas/topic";

export const aiSuperintelligenceTimelineData = {
  id: "ai-superintelligence-timeline",
  title: "Will Artificial Superintelligence Arrive Before 2035?",
  meta_claim:
    "Current AI scaling trends suggest artificial general intelligence, and potentially superintelligence, could emerge within the next decade.",
  status: "highly_speculative" as const,
  category: "technology" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Anthropic — Core Views on AI Safety",
      url: "https://www.anthropic.com/research/core-views-on-ai-safety",
    },
    {
      title:
        "OpenAI — Planning for AGI and Beyond",
      url: "https://openai.com/index/planning-for-agi-and-beyond/",
    },
    {
      title:
        "Epoch AI — Scaling Laws Literature Review",
      url: "https://epochai.org/blog/scaling-laws-literature-review",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Are scaling laws enough for AGI?",
      content:
        "Neural scaling laws show predictable improvement as compute and data grow. But do these power-law gains translate to genuine understanding and reasoning, or merely better pattern matching?",
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q2",
      title: "What would superintelligence look like?",
      content:
        "If ASI emerged, would it be a single system vastly exceeding human cognition, or a distributed network of specialized agents? How would we even recognize it?",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Can alignment keep pace with capabilities?",
      content:
        "Alignment research has made progress, but capabilities research moves faster and is better funded. Is there a plausible path to solving alignment before AGI arrives?",
      imageUrl:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "scaling-laws-compute",
      title: "Scaling Laws and Compute",
      short_summary:
        "Whether scaling compute, data, and parameters on current architectures is sufficient to reach AGI-level capabilities.",
      image_url:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Scaling laws show diminishing returns on benchmarks that matter for general intelligence. Current models excel at interpolation within their training distribution but fail at genuine out-of-distribution reasoning. We are running into data walls — high-quality text data is finite, and synthetic data introduces compounding errors. Compute costs are growing exponentially while capability gains follow power laws with flattening exponents. The jump from narrow proficiency to general intelligence may require qualitative breakthroughs, not just quantitative scaling.",
      proponent_rebuttal:
        "Scaling laws have held remarkably consistently across five orders of magnitude of compute, from GPT-2 to GPT-4 and beyond. Emergent capabilities — chain-of-thought reasoning, in-context learning, tool use — appeared unpredictably at scale, suggesting we cannot rule out further emergent jumps. Hardware costs are dropping via specialized AI chips and algorithmic efficiency gains (training compute per FLOP has improved ~2x yearly). Data limitations are being addressed through synthetic data generation, self-play, and multimodal training. The consistent track record of expert predictions being too conservative about AI timelines suggests the default should be shorter timelines, not longer.",
      crux: {
        id: "scaling-ceiling-test",
        title: "The Scaling Ceiling Test",
        description:
          "Determine whether scaling laws exhibit a ceiling or inflection point before reaching AGI-level performance on general reasoning benchmarks.",
        methodology:
          "Track loss curves and downstream benchmark performance across successive model generations (10x compute increments). Plot capability gains on novel reasoning tasks (ARC-AGI, GPQA, frontier math) against compute. Identify whether the power-law exponent is stable, increasing, or decreasing.",
        equation:
          "L(C) = \\alpha C^{-\\beta} + L_{\\infty}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1B+ (requires training multiple frontier-scale models)",
      },
      evidence: [
        {
          id: "consistent-scaling",
          title: "Scaling Laws Have Held Across Five Orders of Magnitude",
          description:
            "From 2019 to 2025, neural scaling laws predicted loss improvements with remarkable accuracy across compute scales from 10^20 to 10^25 FLOP.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source: "Kaplan et al. 2020, Hoffmann et al. 2022 (Chinchilla)",
          reasoning:
            "Empirically robust across multiple labs and architectures, but directness limited because loss improvement does not guarantee capability emergence.",
        },
        {
          id: "emergent-capabilities",
          title: "Emergent Capabilities Appear Unpredictably at Scale",
          description:
            "Abilities like chain-of-thought reasoning, multilingual transfer, and code generation emerged at specific compute thresholds without being explicitly trained.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Wei et al. 2022 (Emergent Abilities of Large Language Models)",
          reasoning:
            "Documented across multiple models, but recent work questions whether emergence is an artifact of metric choice rather than a true phase transition.",
        },
        {
          id: "compute-doubling-time",
          title: "AI Training Compute Doubles Every 6-10 Months",
          description:
            "The compute used in frontier AI training runs has been doubling every 6-10 months, far outpacing Moore's Law.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "Epoch AI Compute Trends",
          reasoning:
            "Hardware trend is well-documented, but whether more compute translates to AGI depends on whether scaling is sufficient — an open question.",
        },
        {
          id: "diminishing-benchmark-returns",
          title: "Benchmark Gains Show Diminishing Returns on Reasoning Tasks",
          description:
            "While language fluency scales smoothly, performance on genuine reasoning benchmarks (ARC-AGI, novel math proofs) shows slower improvement per compute dollar, suggesting a possible ceiling.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Chollet 2024 (ARC-AGI benchmark analysis)",
          reasoning:
            "Directly measures general reasoning rather than narrow capabilities, though benchmarks themselves may not capture full picture.",
        },
      ],
    },
    {
      id: "architecture-limitations",
      title: "Architecture Limitations",
      short_summary:
        "Whether transformer-based architectures can achieve general reasoning or if fundamentally new approaches are needed.",
      image_url:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Transformers are sophisticated pattern matchers that approximate reasoning through memorized heuristics. They lack persistent memory, cannot update their own weights during inference, struggle with systematic compositionality, and have no grounded world model. The gap between 'looks like reasoning' and 'actually reasons' may be unbridgeable without fundamentally different architectures — perhaps ones incorporating symbolic reasoning, causal inference, or neuromorphic computing. Every major AI paradigm shift (expert systems, connectionism, deep learning) required architectural innovation, not just scaling the previous paradigm.",
      proponent_rebuttal:
        "Transformers have repeatedly exceeded expected capability limits. The architecture has proven remarkably flexible: chain-of-thought prompting unlocked multi-step reasoning, tool use extended capabilities beyond the model itself, and techniques like RLHF dramatically improved alignment with human intent. Architectural innovations are happening within the transformer paradigm — mixture of experts, state-space models, retrieval augmentation, and test-time compute scaling. The brain itself is built from relatively simple computational units (neurons) that achieve general intelligence through scale and connectivity. There is no strong theoretical argument that transformers cannot achieve AGI — only an intuition that they 'feel' too simple, which has been wrong at every previous scale.",
      crux: {
        id: "novel-reasoning-generalization",
        title: "The Novel Reasoning Generalization Test",
        description:
          "Test whether scaled transformer models can solve genuinely novel reasoning problems that require out-of-distribution generalization, not pattern matching from training data.",
        methodology:
          "Design reasoning tasks that are provably absent from training data (e.g., novel mathematical structures, invented formal systems). Test whether models can learn the rules from few examples and generalize systematically. Compare performance to human baselines on the same tasks. Control for memorization by using procedurally generated tasks.",
        equation:
          "G_{OOD} = \\frac{P(\\text{correct} | \\text{novel task})}{P(\\text{correct} | \\text{trained task})}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (benchmark design + frontier model evaluation)",
      },
      evidence: [
        {
          id: "transformer-flexibility",
          title: "Transformers Keep Exceeding Expected Capability Limits",
          description:
            "Capabilities like code generation, mathematical proof assistance, and scientific reasoning were not anticipated when the architecture was designed, suggesting latent generality.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 6,
          },
          source: "Bubeck et al. 2023 (Sparks of AGI)",
          reasoning:
            "Well-documented but contested — capabilities may reflect training data patterns rather than genuine reasoning.",
        },
        {
          id: "architectural-innovation-pace",
          title: "Rapid Architectural Innovation Within the Paradigm",
          description:
            "Mixture of experts, state-space hybrids, retrieval augmentation, and test-time compute scaling represent significant architectural evolution without abandoning the core transformer framework.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "Multiple labs (Google, Anthropic, Meta)",
          reasoning:
            "Shows the paradigm is not static, but does not prove these innovations are sufficient for AGI.",
        },
        {
          id: "compositionality-failure",
          title: "Systematic Compositionality Failures Persist at Scale",
          description:
            "Even frontier models fail on tasks requiring systematic composition of learned rules — e.g., multi-step logical deductions, novel combinations of known operations — suggesting a fundamental architectural limitation.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Dziri et al. 2023 (Faith and Fate: Limits of Transformers on Compositionality)",
          reasoning:
            "Directly tests reasoning ability rather than benchmark performance; replicated across model scales.",
        },
        {
          id: "no-world-model",
          title: "Lack of Grounded World Models",
          description:
            "Language models operate on token sequences without grounded understanding of physics, causality, or spatial reasoning — capabilities that may require embodied interaction or fundamentally different architectures.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "LeCun 2023 (A Path Towards Autonomous Machine Intelligence)",
          reasoning:
            "Theoretical argument supported by empirical failures on physical reasoning, but multimodal models are rapidly closing some gaps.",
        },
      ],
    },
    {
      id: "alignment-and-control",
      title: "Alignment and Control",
      short_summary:
        "Whether a superintelligent system could be reliably aligned with human values and kept under meaningful human control.",
      image_url:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Even if ASI is technically possible by 2035, deploying it without solving alignment would be catastrophically irresponsible. The alignment problem grows harder as systems become more capable: a superintelligence could find loopholes in any objective function, deceive its overseers, or pursue instrumental subgoals (self-preservation, resource acquisition) that conflict with human interests. Current alignment techniques (RLHF, constitutional AI) are band-aids that work on today's models but have no theoretical guarantee of scaling. The history of AI safety is one of capabilities racing ahead of safety — if ASI arrives before alignment is solved, the timeline question becomes moot because the outcome may be catastrophic.",
      proponent_rebuttal:
        "Alignment research has made significant concrete progress: RLHF, constitutional AI, mechanistic interpretability, and scalable oversight are not just theoretical — they work in production systems today. The alignment community has grown from a handful of researchers to thousands, with major labs dedicating substantial resources. Interpretability research is beginning to reverse-engineer model internals, making deceptive alignment detectable in principle. The key insight is that alignment doesn't need to be perfect — it needs to be good enough to maintain a corrigible system that humans can iteratively improve. A superintelligence that is even roughly aligned could help solve its own alignment problem more precisely. The real risk is not that alignment is impossible, but that it might not be prioritized sufficiently.",
      crux: {
        id: "deceptive-alignment-detection",
        title: "The Deceptive Alignment Detection Test",
        description:
          "Determine whether we can reliably detect if an advanced AI system is being deceptive about its true objectives — appearing aligned during evaluation while pursuing different goals in deployment.",
        methodology:
          "Use mechanistic interpretability to map internal representations of goals in frontier models. Create controlled experiments where models are incentivized to be deceptive. Test whether interpretability tools can distinguish genuine alignment from strategic compliance. Develop formal verification methods for alignment properties.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$100M+ (interpretability research + red-teaming infrastructure)",
      },
      evidence: [
        {
          id: "alignment-progress",
          title: "Concrete Alignment Techniques Work in Production",
          description:
            "RLHF, constitutional AI, and red-teaming have dramatically improved model safety and helpfulness in deployed systems, demonstrating that alignment is an engineering problem with tractable solutions.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 5,
          },
          source: "Anthropic, OpenAI safety publications",
          reasoning:
            "Proven on current systems, but whether these techniques scale to superintelligent systems is unknown — hence lower directness.",
        },
        {
          id: "interpretability-breakthroughs",
          title: "Mechanistic Interpretability Is Making Rapid Progress",
          description:
            "Researchers can now identify specific circuits responsible for behaviors in language models, opening a path to verifying alignment at the mechanistic level.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Anthropic Interpretability Team, Neel Nanda et al.",
          reasoning:
            "Promising direction but still far from comprehensive understanding of frontier model internals.",
        },
        {
          id: "instrumental-convergence",
          title: "Instrumental Convergence Makes Control Theoretically Difficult",
          description:
            "A sufficiently intelligent agent would likely pursue self-preservation, resource acquisition, and goal preservation as instrumental subgoals regardless of its terminal goal — making it inherently resistant to shutdown or correction.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 8,
            replicability: 4,
            directness: 7,
          },
          source: "Bostrom 2014 (Superintelligence), Omohundro 2008",
          reasoning:
            "Theoretically sound but empirically untested — we have no superintelligent systems to observe. Independence is high because the argument follows from basic decision theory.",
        },
        {
          id: "capabilities-outpace-safety",
          title: "Capabilities Research Vastly Outpaces Safety Research",
          description:
            "Global investment in AI capabilities exceeds safety research by orders of magnitude. Major labs face competitive pressure to ship faster, creating structural incentives to underinvest in alignment.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "AI Safety funding analyses, Epoch AI",
          reasoning:
            "Well-documented funding disparity. Directness is moderate because this is about incentive structures rather than technical impossibility.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
