import type { TopicInput } from "@/lib/schemas/topic";

export const aiSuperintelligenceTimelineData = {
  id: "ai-superintelligence-timeline",
  title: "Will Artificial Superintelligence Arrive Before 2035?",
  question: "Could artificial superintelligence arrive before 2035?",
  meta_claim:
    "Scaling and algorithmic-efficiency trends have pulled expert AI timelines sharply forward — but mainstream forecasts still place even human-level machine intelligence decades out, making superintelligence before 2035 a real possibility rather than a consensus expectation. The AI 2027 scenario is one named fast path to it, not the only one.",
  status: "highly_speculative" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The largest survey of AI researchers, 2,778 of them (Grace et al., 2023), put the median 50% odds of human-level machine intelligence around 2047, about 13 years earlier than the same survey's estimate one year before. Individual forecasts run from a few years to never. The fight is over whether the recent pace of progress means superintelligence before 2035, or whether the hard problems still ahead push it out by decades.",
    confidence: 82,
    source:
      "Grace et al., 'Thousands of AI Authors on the Future of AI' (2,778 researchers, 2023/24); prior AI Impacts expert surveys",
    sourceUrl: "https://arxiv.org/abs/2401.02843",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that AI scaling laws have held remarkably well so far, that today's models excel on tasks resembling their training data while genuinely novel reasoning is the hard test, and that no current method reliably verifies an AI's true goals.",
    "They split over whether capability gains from more compute keep paying off or hit a ceiling before general reasoning; whether scaled-up transformers can generalize to novel problems or need a new architecture; and whether safety checks or regulation would hold a buildable system back past 2035 or shape only how it ships.",
  ],
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
      title: "Would safety checks delay deployment?",
      content:
        "Even if scaling makes superintelligence buildable, developers and regulators could hold a system back until its goals can be checked. Do those checks move the date, or does competitive pressure set the schedule?",
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
        question:
          "Will capability gains from more compute hit a ceiling before general reasoning?",
        description:
          "Determine whether scaling laws exhibit a ceiling or inflection point before reaching AGI-level performance on general reasoning benchmarks.",
        methodology:
          "Track loss curves and downstream benchmark performance across successive model generations (10x compute increments). Plot capability gains on novel reasoning tasks (ARC-AGI, GPQA, frontier math) against compute. Identify whether the power-law exponent is stable, increasing, or decreasing.",
        equation:
          "L(C) = \\alpha C^{-\\beta} + L_{\\infty}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Loss curves and scores on novel reasoning tasks (ARC-AGI, GPQA, frontier math) across successive 10x compute steps, checking whether the power-law exponent holds steady, rises or falls.",
        },
        cost_to_verify: "$1B+ (requires training multiple frontier-scale models)",
        falsification: {
          supporter_flip:
            "If capability gains per 10× of compute clearly flattened on hard reasoning benchmarks — a scaling ceiling appearing before AGI-level performance — the 'just scale up and we get there soon' basis for near-term superintelligence would break.",
          skeptic_flip:
            "If each new compute generation kept delivering predictable capability gains, with algorithmic efficiency improving on top, the claim that scaling has hit a wall would lose its footing and near-term timelines would look plausible.",
          common_ground:
            "Both sides agree scaling laws have held remarkably well so far and that whether they continue to AGI-level reasoning is unknown.",
          live_disagreement:
            "Whether the capability-per-compute curve hits a ceiling before reaching general reasoning — which only continued frontier-scale training and benchmark tracking can reveal.",
        },
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
        question:
          "Can today's scaled-up models handle genuinely novel reasoning, or is their architecture a ceiling?",
        description:
          "Test whether scaled transformer models can solve genuinely novel reasoning problems that require out-of-distribution generalization, not pattern matching from training data.",
        methodology:
          "Design reasoning tasks that are provably absent from training data (e.g., novel mathematical structures, invented formal systems). Test whether models can learn the rules from few examples and generalize systematically. Compare performance to human baselines on the same tasks. Control for memorization by using procedurally generated tasks.",
        equation:
          "G_{OOD} = \\frac{P(\\text{correct} | \\text{novel task})}{P(\\text{correct} | \\text{trained task})}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Procedurally generated reasoning tasks provably absent from training data, such as invented formal systems, where models must learn the rules from a few examples, scored against human baselines on the same tasks.",
        },
        cost_to_verify: "$10M (benchmark design + frontier model evaluation)",
        falsification: {
          supporter_flip:
            "If frontier models went on failing at provably novel, out-of-distribution reasoning (learning invented formal systems from a few examples and generalizing) while excelling on training-like tasks, scaling would look like sophisticated pattern-matching, pushing timelines out or calling for a new architecture.",
          skeptic_flip:
            "If models went on solving tasks once said to be beyond pattern-matching, such as competition math and novel coding, and improving on out-of-distribution benchmarks, 'it can't really reason' would have to retreat to ever narrower ground.",
          common_ground:
            "Both sides agree current models excel on tasks resembling their training data and that genuinely novel, contamination-free reasoning is the hard test.",
          live_disagreement:
            "Whether scaled transformers can systematically generalize to genuinely novel reasoning or are bounded by an architectural ceiling — which only contamination-controlled novel-reasoning benchmarks can distinguish.",
        },
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
      id: "release-gates",
      title: "Safety Gates on Release",
      short_summary:
        "Whether safety checks or regulation would delay a superintelligent system that scaling had made buildable, or only shape how it ships. Whether such a system would be dangerous is argued on the map asking whether AGI poses a real risk of human extinction; here it matters only as a possible cause of delay. Here a system arrives when it is deployed: one trained but held back has not yet arrived.",
      image_url:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Being buildable is not the same as arriving. A system that the compute curve makes possible before 2035 still has to be trained and released by people who can decide to wait. No current method reliably verifies an advanced AI's true goals: interpretability can recover human-readable features from model internals (Bricken et al. 2023), but extracting features is still far from checking what a model is trying to do. A developer or regulator that will not release what it cannot check therefore has a standing reason to hold the most capable system back, and the date would then be set by when goal-checking catches up, not by when the system first becomes buildable.",
      proponent_rebuttal:
        "The pressure to ship is structural and the gates are not. Global investment in AI capabilities far exceeds dedicated safety research, and frontier labs compete to release first. Safety work has so far been built into releases rather than standing in front of them: RLHF and constitutional AI ship in production systems today. As long as a system is judged good enough to deploy and keep improving, safety work decides the conditions of release, not its year.",
      crux: {
        id: "safety-release-gate",
        title: "The Release Gate Test",
        question:
          "Will safety checks or regulation hold back deploying superintelligence past 2035?",
        description:
          "Ask whether the gates that could delay a superintelligent system (pre-release safety evaluations, outside review, regulation) bind on frontier developers, or whether they shape how systems are released but not when.",
        methodology:
          "Track frontier releases against safety evaluations: whether any developer withholds or delays a trained model after it fails an evaluation, whether outside review before release becomes a legal requirement anywhere, and whether the gap between finishing training and public release lengthens as capability grows.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Records of frontier developers withholding or delaying trained models after failed evaluations, of outside review before release becoming a legal requirement, and of the gap between training and release as models grow more capable.",
        },
        cost_to_verify: "Low to monitor public release records; resolves only as more capable systems are trained",
        falsification: {
          supporter_flip:
            "If frontier developers began withholding trained models that failed safety evaluations, and outside review before release became a legal requirement, the date would track when goal-checking catches up, which could push superintelligence past 2035 even with scaling on schedule.",
          skeptic_flip:
            "If each new frontier model kept reaching the public on its usual schedule despite open safety questions, and outside review stayed voluntary, safety work would look like a condition on how systems ship rather than a delay in when they arrive.",
          common_ground:
            "Both sides agree no current method reliably verifies an advanced AI's true goals, and that frontier labs face competitive pressure to release quickly.",
          live_disagreement:
            "Whether unverified goals become a reason to hold a trained system back, or a condition attached to systems that ship on the schedule capability allows.",
        },
      },
      evidence: [
        {
          id: "alignment-progress",
          title: "Safety Techniques Ship Inside Deployed Systems",
          description:
            "RLHF, constitutional AI, and red-teaming have improved the safety and helpfulness of deployed systems: safety methods applied to models as they are released, rather than a gate that holds them back.",
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
            "Published lab methods, proven on current systems. Directness to the 2035 date is limited: they show safety work and releases moving together today, not that the same methods would clear a far more capable system for release.",
        },
        {
          id: "capabilities-outpace-safety",
          title: "Capabilities Research Vastly Outpaces Safety Research",
          description:
            "Global investment in AI capabilities vastly exceeds dedicated AI-safety research. Major labs face competitive pressure to ship faster, creating structural incentives against holding a system back for safety work.",
          side: "for" as const,
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
            "The qualitative disparity is widely reported, but the 'orders of magnitude' figure is an estimate rather than an audited statistic, hence reduced source reliability. Directness is moderate: incentives to ship do not show that no developer or regulator would wait.",
        },
        {
          id: "interpretability-breakthroughs",
          title: "Goal-Checking Tools Are Early-Stage",
          description:
            "Researchers can now identify human-interpretable features and some circuits in language models, a path toward checking a model's goals from the inside, but the 2023 demonstration was on a small model. A release gate that waits for goal-checking would be waiting on tools at this stage.",
          side: "against" as const,
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
            "Sparse autoencoders recover concept-aligned features, but on a small model and far from verifying a frontier model's goals. Directness is moderate: immature goal-checking delays deployment only if someone requires it before release.",
        },
      ],
    },
  ],
} satisfies TopicInput;
