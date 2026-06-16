import type { Topic } from "@/lib/schemas/topic";

export const aiSuperintelligenceTimelineData = {
  id: "ai-superintelligence-timeline",
  title: "Will Artificial Superintelligence Arrive Before 2035?",
  meta_claim:
    "Scaling and algorithmic-efficiency trends have pulled expert AI timelines sharply forward — but mainstream forecasts still place even human-level machine intelligence decades out, making superintelligence before 2035 a real possibility rather than a consensus expectation.",
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
        "Epoch AI — Trends in Machine Learning (compute & scaling)",
      url: "https://epoch.ai/trends",
    },
    {
      title:
        "Grace et al. 2024 — 'Thousands of AI Authors on the Future of AI' (AI Impacts survey, n=2,778; 50% chance of high-level machine intelligence by 2047)",
      url: "https://arxiv.org/abs/2401.02843",
    },
    {
      title:
        "Villalobos et al. 2024 — 'Will We Run Out of Data? Limits of LLM Scaling Based on Human-Generated Data' (Epoch AI)",
      url: "https://arxiv.org/abs/2211.04325",
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
        "Scaling laws describe falling next-token loss, not gains on the reasoning that matters for general intelligence — and the two can decouple. Current models excel at interpolation within their training distribution but stumble on genuine out-of-distribution reasoning. We are approaching a data wall: Epoch AI projects the public stock of human-generated text will be roughly exhausted between about 2026 and 2032 (Villalobos et al.), and synthetic data has reliably helped only in narrow, verifiable domains like math and code. Crucially, loss falls as a power law — each new increment of capability costs exponentially more compute — so the curve flattens in capability terms even as spending explodes. The 'this time is different' framing assumes the jump from narrow proficiency to general intelligence is a smooth extrapolation, but every prior paradigm needed a qualitative architectural break, not just more of the same.",
      proponent_rebuttal:
        "Scaling laws have held across many orders of magnitude of compute, from GPT-2 to GPT-4 and beyond, and capability keeps tracking compute even as raw loss gains shrink. Two independent cost curves compound in scaling's favor: hardware price-performance improves roughly 40% per year (Epoch AI), while algorithmic efficiency improves even faster — the compute needed to hit a fixed language-modeling performance has halved roughly every eight months, about 3x per year (Ho et al. / Epoch). So an effective-compute budget grows far faster than dollar spend alone. Data ceilings are being attacked with synthetic data, self-play, multimodal corpora, and reinforcement learning on verifiable rewards. And forecasters keep revising shorter: in the 2024 AI Impacts survey of 2,778 published AI researchers, the median estimate for a 50% chance of high-level machine intelligence fell 13 years (to 2047) versus the 2022 survey — a base rate that argues for treating short timelines as live, not fringe.",
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
          source:
            "Kaplan et al. 2020, 'Scaling Laws for Neural Language Models' (arXiv:2001.08361); Hoffmann et al. 2022, 'Training Compute-Optimal Large Language Models' / Chinchilla (arXiv:2203.15556)",
          sourceUrl: "https://arxiv.org/abs/2203.15556",
          reasoning:
            "Empirically robust across multiple labs and architectures, but directness limited because loss improvement does not guarantee capability emergence. Note both papers fit power laws over training-time loss (up to ~10^24 FLOP), not the 10^25 frontier; the broader 'five orders of magnitude' claim is an extrapolation.",
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
          source:
            "Wei et al. 2022, 'Emergent Abilities of Large Language Models' (arXiv:2206.07682); contested by Schaeffer et al. 2023, 'Are Emergent Abilities a Mirage?' (arXiv:2304.15004)",
          sourceUrl: "https://arxiv.org/abs/2206.07682",
          reasoning:
            "Documented across multiple models, but Schaeffer et al. (2023) argue emergence is largely an artifact of discontinuous metric choice rather than a true phase transition — which is why directness is held low.",
        },
        {
          id: "compute-doubling-time",
          title: "Frontier AI Training Compute Doubles Roughly Every 6 Months",
          description:
            "Epoch AI estimates the training compute of frontier AI models has grown about 4-5x per year since 2020 (a doubling time near 5-6 months), far outpacing Moore's Law.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source:
            "Epoch AI — 'Training compute of frontier AI models grows by 4-5x per year' (2024)",
          sourceUrl:
            "https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year",
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
          source:
            "Chollet 2019, 'On the Measure of Intelligence' / ARC-AGI (arXiv:1911.01547)",
          sourceUrl: "https://arxiv.org/abs/1911.01547",
          reasoning:
            "ARC-AGI directly targets novel-task generalization rather than narrow capabilities; the underlying benchmark and skill-acquisition-efficiency framing trace to Chollet's 2019 paper, though benchmarks themselves may not capture the full picture.",
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
        "Transformers are sophisticated pattern matchers that approximate reasoning through memorized heuristics. They lack persistent memory, cannot update their own weights during inference, and degrade sharply on systematic compositionality — controlled tests (Dziri et al., NeurIPS 2023) show accuracy collapsing as multi-step problems grow, consistent with shortcut-matching rather than learned algorithms. They also have no grounded world model. The gap between 'looks like reasoning' and 'actually reasons' may be unbridgeable without fundamentally different architectures — ones incorporating symbolic reasoning, causal inference, or neuromorphic computing. Every prior AI paradigm shift (expert systems, connectionism, deep learning) required architectural innovation, not just scaling the previous paradigm; assuming this paradigm is the exception is precisely the 'this time is different' bet that has failed before.",
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
          source:
            "Bubeck et al. 2023, 'Sparks of Artificial General Intelligence: Early experiments with GPT-4' (Microsoft Research, arXiv:2303.12712)",
          sourceUrl: "https://arxiv.org/abs/2303.12712",
          reasoning:
            "Well-documented but contested — a non-peer-reviewed Microsoft Research report on a pre-release GPT-4; observed capabilities may reflect training-data patterns rather than genuine reasoning, so reliability is held moderate.",
        },
        {
          id: "architectural-innovation-pace",
          title: "Rapid Architectural Innovation Within the Paradigm",
          description:
            "Mixture of experts, state-space hybrids, retrieval augmentation, and test-time compute scaling represent significant architectural evolution without abandoning the core transformer framework.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source:
            "Synthesis of primary architecture papers, e.g. Shazeer et al. 2017 (Sparsely-Gated MoE, arXiv:1701.06538) and Gu & Dao 2023 (Mamba state-space models, arXiv:2312.00752). No single source establishes the aggregate 'pace' claim.",
          sourceUrl: "https://arxiv.org/abs/2312.00752",
          reasoning:
            "Shows the paradigm is not static, but this is an aggregate characterization across several papers rather than one primary finding — hence reduced source reliability — and it does not prove these innovations are sufficient for AGI.",
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
          source:
            "Dziri et al. 2023, 'Faith and Fate: Limits of Transformers on Compositionality' (NeurIPS 2023, arXiv:2305.18654)",
          sourceUrl: "https://arxiv.org/abs/2305.18654",
          reasoning:
            "Directly tests compositional reasoning rather than benchmark performance; peer-reviewed (NeurIPS spotlight) and evaluated across model scales.",
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
          source:
            "LeCun 2022, 'A Path Towards Autonomous Machine Intelligence' (position paper, v0.9.2, OpenReview)",
          sourceUrl: "https://openreview.net/pdf?id=BZ5a1r-kVsf",
          reasoning:
            "A self-published position paper (not peer-reviewed) advancing a theoretical argument supported by empirical failures on physical reasoning; multimodal models are rapidly closing some gaps, so reliability is held moderate.",
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
        "Alignment research has made concrete progress: RLHF, constitutional AI, mechanistic interpretability, and scalable oversight are not just theoretical — they ship in production systems today. The field has scaled from a handful of researchers to dedicated safety teams at every frontier lab and a growing academic community. Interpretability is beginning to reverse-engineer model internals — sparse autoencoders recover human-interpretable features (Anthropic, Bricken et al. 2023) — making deceptive alignment detectable in principle rather than only in theory. The key insight is that alignment need not be perfect; it needs to be good enough to keep a corrigible system humans can iteratively improve, and a roughly aligned system can help refine its own alignment. The real risk is not that alignment is impossible, but that competitive pressure leaves it under-prioritized relative to capabilities.",
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
          source:
            "Bai et al. 2022, 'Constitutional AI: Harmlessness from AI Feedback' (Anthropic, arXiv:2212.08073); Ouyang et al. 2022, 'Training language models to follow instructions with human feedback' / InstructGPT-RLHF (OpenAI, arXiv:2203.02155)",
          sourceUrl: "https://arxiv.org/abs/2212.08073",
          reasoning:
            "Proven on current systems via published lab methods, but whether these techniques scale to superintelligent systems is unknown — hence lower directness.",
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
          source:
            "Bricken et al. 2023, 'Towards Monosemanticity: Decomposing Language Models With Dictionary Learning' (Anthropic, transformer-circuits.pub)",
          sourceUrl:
            "https://transformer-circuits.pub/2023/monosemantic-features/index.html",
          reasoning:
            "Promising direction — sparse autoencoders recover concept-aligned features — but demonstrated on a small model (GPT-2-scale) and still far from comprehensive understanding of frontier model internals.",
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
          source:
            "Omohundro 2008, 'The Basic AI Drives' (Proc. First AGI Conference); Bostrom 2014, 'Superintelligence: Paths, Dangers, Strategies' (Oxford University Press)",
          sourceUrl: "https://intelligence.org/files/BasicAIDrives.pdf",
          reasoning:
            "Theoretically sound but empirically untested — we have no superintelligent systems to observe, and these are an argument and a monograph rather than experiments. Independence is high because the argument follows from basic decision theory.",
        },
        {
          id: "capabilities-outpace-safety",
          title: "Capabilities Research Vastly Outpaces Safety Research",
          description:
            "Global investment in AI capabilities vastly exceeds dedicated AI-safety research. Major labs face competitive pressure to ship faster, creating structural incentives to underinvest in alignment.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Directional estimate; no single audited primary source. Spending-trend context from Stanford HAI AI Index Report (annual) and Epoch AI investment data; the precise capabilities-vs-safety ratio is not rigorously measured.",
          sourceUrl: "https://hai.stanford.edu/ai-index",
          reasoning:
            "The qualitative disparity is widely reported, but the 'orders of magnitude' figure is an estimate rather than an audited statistic — hence reduced source reliability. Directness is moderate because this is about incentive structures rather than technical impossibility.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
