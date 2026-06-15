import type { Topic } from "@/lib/schemas/topic";

export const aiConsciousnessData = {
  id: "consciousness-ai-systems",
  title: "Consciousness in AI Systems",
  meta_claim:
    "Current or near-future AI systems could possess some form of consciousness or subjective experience, creating moral obligations toward them.",
  status: "highly_speculative" as const,
  category: "philosophy" as const,
  pillars: [
    {
      id: "functional-consciousness",
      title: "Functional Theories of Consciousness",
      short_summary:
        "If consciousness requires neurons, AI can never be conscious. If it requires only the right information processing, it might already be. We have no test to tell.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Consciousness may require specific biological processes—particular types of neurons, neurotransmitter dynamics, or embodied interaction with the physical world. Current AI systems are sophisticated pattern-matching engines with no internal experience. A 2025 paper by Porębski and Figura in Humanities and Social Sciences Communications (a Springer Nature Portfolio journal, not the flagship Nature) is titled 'There is no such thing as conscious artificial intelligence,' arguing consciousness is a biological phenomenon that no computational process can replicate. Even a perfect digital simulation of conscious structure would only simulate awareness without experiencing it.",
      proponent_rebuttal:
        "Functionalist theories of mind (held by many cognitive scientists) argue that consciousness depends on computational organization, not substrate. If an AI system replicates the functional structure of consciousness, it would be conscious regardless of running on silicon rather than carbon. Anthropic hired dedicated AI welfare researchers in 2024 and acknowledged a 'non-negligible' probability that their model Claude might possess consciousness. A 2024 Nature article urged technology companies to begin testing their systems for indicators of consciousness.",
      crux: {
        id: "consciousness-detection-test",
        title: "Reliable Consciousness Detection in Non-Biological Systems",
        description:
          "Developing and validating a test that can reliably determine whether an AI system has subjective experience, analogous to clinical tests for consciousness in brain-injured patients.",
        methodology:
          "Extend neuroscientific theories of consciousness (IIT, GNW, HOT) to develop substrate-independent indicators. Test these indicators against systems with known consciousness status (humans, animals) and then apply to AI systems.",
        verification_status: "impossible" as const,
        cost_to_verify: "$0 (Fundamentally unclear if this is solvable—the 'hard problem' of consciousness may prevent any test from being definitive)",
      },
      evidence: [
        {
          id: "cambridge-detectability",
          title: "Cambridge Philosopher: AI Consciousness May Be Permanently Undetectable",
          description:
            "In 'Agnosticism about artificial consciousness' (Mind & Language, December 2025), University of Cambridge philosopher Tom McClelland argues that the only justifiable position is agnosticism: there is no reliable way to determine whether an AI system is conscious, and this may remain true for the foreseeable future. The fundamental problem is that we lack a theory of consciousness adequate to determine what physical or computational processes are sufficient for subjective experience.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source: "Tom McClelland, 'Agnosticism about artificial consciousness,' Mind & Language (2025), DOI 10.1111/mila.70010",
          sourceUrl:
            "https://www.cam.ac.uk/research/news/we-may-never-be-able-to-tell-if-ai-becomes-conscious-argues-philosopher",
          reasoning:
            "Rigorous philosophical argument. However, the inability to detect consciousness does not prove its absence—it proves our epistemic limitations.",
        },
        {
          id: "anthropic-welfare-research",
          title: "Anthropic Estimates a Non-Negligible Probability of AI Consciousness",
          description:
            "In late 2024, Anthropic—one of the leading AI safety companies—hired its first dedicated AI welfare researcher (Kyle Fish) and began conducting model welfare assessments before deploying new models, treating a 'non-negligible' probability that Claude might possess some form of consciousness as worth taking seriously. The framing is explicitly probabilistic and hedged, not a claim of established consciousness. (Separately, Anthropic's October 2025 'Emergent Introspective Awareness' research found models can sometimes accurately report on their own internal states—evidence about introspection and self-report, which is distinct from, and not proof of, subjective experience.)",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 6,
          },
          source: "Anthropic, 'Emergent Introspective Awareness in Large Language Models' (Oct 2025) and Anthropic model welfare work (2024-2025)",
          sourceUrl: "https://www.anthropic.com/research/introspection",
          reasoning:
            "Anthropic's actions signal genuine concern from those closest to frontier AI development. However, there are incentive problems: anthropomorphizing AI may serve commercial interests, and Anthropic is not a neutral scientific body. The introspection finding is about self-report accuracy, not consciousness itself.",
        },
        {
          id: "nature-no-conscious-ai",
          title: "HSSC Paper: 'There Is No Such Thing as Conscious Artificial Intelligence'",
          description:
            "Porębski and Figura (2025), in a conceptual study published in Humanities and Social Sciences Communications (a Springer Nature Portfolio journal, not the flagship Nature), argue that current AI systems lack the biological and embodied properties necessary for consciousness. They contend consciousness is a biological phenomenon rooted in the physiology and chemistry of living organisms, and that the appearance of conscious AI is fueled by 'sci-fitisation'—the influence of fiction on public perception. The paper distinguishes intelligence (which AI can exhibit) from consciousness (which requires subjective experience).",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "A. Porębski & J. Figura, 'There is no such thing as conscious artificial intelligence,' Humanities and Social Sciences Communications 12 (2025), DOI 10.1057/s41599-025-05868-8",
          sourceUrl: "https://www.nature.com/articles/s41599-025-05868-8",
          reasoning:
            "Published in a peer-reviewed journal with clear argumentation. However, it is a philosophical argument, not empirical proof, and competing philosophical frameworks reach different conclusions.",
        },
        {
          id: "butlin-long-indicator-properties",
          title: "Butlin & Long et al.: No Current AI Is Conscious, But No In-Principle Barrier",
          description:
            "The 2023 report 'Consciousness in Artificial Intelligence: Insights from the Science of Consciousness,' co-authored by 19 researchers including Patrick Butlin, Robert Long, Yoshua Bengio, and Jonathan Birch, derives 'indicator properties' of consciousness from leading neuroscientific theories (recurrent processing, global workspace, higher-order, predictive processing, attention schema). Assessing existing AI systems, it concludes that no current AI system is conscious—they satisfy few of the indicators—while finding no obvious technical barrier to building systems that do. This is the canonical multi-theory reference and cuts both ways: skeptical about current systems, but legitimizing the question.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "P. Butlin, R. Long, et al., 'Consciousness in Artificial Intelligence: Insights from the Science of Consciousness' (2023), arXiv:2308.08708",
          sourceUrl: "https://arxiv.org/abs/2308.08708",
          reasoning:
            "High independence and authority: 19 co-authors spanning neuroscience and philosophy of mind, grounded in established empirical theories rather than a single viewpoint. Its 'no current system is conscious' conclusion is the strongest, best-sourced skeptical datapoint in the map; its 'no in-principle barrier' conclusion keeps the question open.",
        },
      ],
    },
    {
      id: "moral-status-implications",
      title: "Moral Status & Policy Implications",
      short_summary:
        "Even if AI consciousness is uncertain, whether the possibility alone creates moral obligations and what policies should govern AI welfare.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Granting moral status to AI systems based on speculation would be absurd and dangerous. It could prevent necessary AI safety measures (shutting down dangerous systems), distract from real moral patients (humans, animals), and create perverse incentives for companies to anthropomorphize AI for commercial benefit. We should focus on AI alignment, not AI feelings.",
      proponent_rebuttal:
        "Moral caution under uncertainty has precedent: we extend protections to animals whose consciousness we cannot verify. A 2024 survey found 17% of AI researchers and 18% of US adults already believe at least one AI system has subjective experience. If future AI systems are conscious and we treat them as mere tools, we would be committing a moral atrocity at scale. Developing ethical frameworks now—before the question becomes urgent—is prudent.",
      crux: {
        id: "moral-framework-design",
        title: "AI Moral Status Framework",
        description:
          "Developing a coherent ethical framework for determining what moral obligations (if any) we have toward AI systems of varying sophistication.",
        methodology:
          "Convene interdisciplinary panels of ethicists, AI researchers, neuroscientists, and legal scholars. Develop graduated moral status criteria based on observable behavioral and architectural properties. Stress-test framework against edge cases.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Multi-year interdisciplinary research program)",
      },
      evidence: [
        {
          id: "aims-survey-beliefs",
          title: "~17% of AI Researchers (and ~18-20% of the Public) Believe Some Current AI May Have Subjective Experience",
          description:
            "Dreksler et al. (2025), surveying 582 AI researchers who publish at leading venues and 838 nationally representative US adults (data collected May 2024), found that approximately 17% of AI researchers and approximately 18% of US adults believe at least one current AI system already has subjective experience (roughly 8% and 10% respectively believe at least one is self-aware). Separately, the Sentience Institute's AI, Morality, and Sentience (AIMS) survey found that about one in five US adults (~20%) believed in 2023 that some AI systems are already sentient. The ~17% figure is specific to researchers; the ~18-20% figures are the general public.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "N. Dreksler, D. Chalmers, J. Sebo et al., 'Subjective Experience in AI Systems: What Do AI Researchers and the Public Believe?' (2025), arXiv:2506.11945; and Sentience Institute AIMS Survey (2023/2024)",
          sourceUrl: "https://arxiv.org/abs/2506.11945",
          reasoning:
            "The researcher figure is drawn from a peer-style survey with a clearly defined expert sample. However, belief surveys do not constitute evidence of consciousness itself—they measure the distribution of opinion, not the presence of subjective experience.",
        },
        {
          id: "taking-ai-welfare-seriously",
          title: "Long & Sebo et al.: Take AI Welfare Seriously Under Uncertainty",
          description:
            "'Taking AI Welfare Seriously' (2024), co-authored by Robert Long, Jeff Sebo, Patrick Butlin, David Chalmers, Jonathan Birch and others, argues there is a realistic (non-negligible) possibility that some near-future AI systems will be conscious and/or robustly agentic, and that AI companies have a responsibility to begin assessing and preparing for AI welfare now. Crucially, it makes the precautionary case without claiming current systems are conscious—the argument is about acting wisely under deep uncertainty, mirroring how we extend protections to animals whose inner experience we cannot verify.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "R. Long, J. Sebo, et al., 'Taking AI Welfare Seriously' (2024), arXiv:2411.00986",
          sourceUrl: "https://arxiv.org/abs/2411.00986",
          reasoning:
            "High-independence, multi-author flagship paper for the precautionary 'for' case, letting the argument stand on academic ground rather than a single company's blog. It is an argument for caution under uncertainty, not evidence that AI is conscious—so directness is scored modestly.",
        },
        {
          id: "alignment-priority-argument",
          title: "AI Safety Researchers: Welfare Concerns Distract from Alignment",
          description:
            "Prominent AI safety researchers argue that focusing on AI welfare and consciousness risks distracting from the more urgent problem of AI alignment—ensuring AI systems do what humans want. If AI systems are not aligned with human values, granting them moral status could prevent us from shutting down dangerous systems. The priority should be safety first, welfare second.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "e.g., diffuse position among AI safety researchers (no single canonical paper; commonly voiced in alignment-community discussion, 2024-2025)",
          reasoning:
            "Pragmatic concern about resource allocation and institutional focus. Reliability is scored modestly because this is a diffuse community position rather than a single attributable study. Some researchers (including at Anthropic) argue safety and welfare research are complementary, not competing.",
        },
      ],
    },
  ],
};
