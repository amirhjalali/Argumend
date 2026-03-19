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
        "Consciousness may require specific biological processes—particular types of neurons, neurotransmitter dynamics, or embodied interaction with the physical world. Current AI systems are sophisticated pattern-matching engines with no internal experience. A paper published in Nature Humanities and Social Sciences Communications (2025) argues 'there is no such thing as conscious artificial intelligence.' Even a perfect digital simulation of conscious structure would only simulate awareness without experiencing it.",
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
            "A December 2025 paper by a University of Cambridge philosopher argues there is no reliable way to determine whether an AI system is conscious, and this may remain true for the foreseeable future. The fundamental problem is that we lack a theory of consciousness adequate to determine what physical or computational processes are sufficient for subjective experience.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source: "University of Cambridge, Department of Philosophy (2025)",
          reasoning:
            "Rigorous philosophical argument. However, the inability to detect consciousness does not prove its absence—it proves our epistemic limitations.",
        },
        {
          id: "anthropic-welfare-research",
          title: "Anthropic Acknowledges Non-Negligible AI Consciousness Probability",
          description:
            "In 2024, Anthropic—one of the leading AI safety companies—hired its first dedicated AI welfare researcher, publicly acknowledged a 'non-negligible' probability that their model Claude might possess some form of consciousness, and conducted formal welfare assessments before deploying new models. In October 2025, Anthropic published research examining whether AI models can accurately report on their own internal states.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 6,
          },
          source: "Anthropic AI welfare research blog (2024-2025)",
          reasoning:
            "Anthropic's actions signal genuine concern from those closest to frontier AI development. However, there are incentive problems: anthropomorphizing AI may serve commercial interests, and Anthropic is not a neutral scientific body.",
        },
        {
          id: "nature-no-conscious-ai",
          title: "Nature Paper: 'There Is No Such Thing as Conscious AI'",
          description:
            "A 2025 conceptual study published in Nature's Humanities and Social Sciences Communications argues that current AI systems lack the biological and embodied properties necessary for consciousness. The paper distinguishes between intelligence (which AI can exhibit) and consciousness (which requires subjective experience), arguing these are orthogonal properties.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Humanities and Social Sciences Communications, Nature (2025)",
          reasoning:
            "Published in a peer-reviewed journal with clear argumentation. However, it is a philosophical argument, not empirical proof, and competing philosophical frameworks reach different conclusions.",
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
          title: "17-20% of AI Researchers Believe Some AI Is Already Conscious",
          description:
            "The AI, Morality, and Sentience (AIMS) Survey presented at CHI 2025 found that approximately 20% of respondents in a 2023 survey declared sentient AI systems currently exist, and a 2024 survey revealed approximately 17% of AI researchers and 18% of US adults believe at least one AI system has subjective experience.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "AIMS Survey, CHI 2025 Proceedings (ACM)",
          reasoning:
            "Published at a top HCI venue. However, belief surveys do not constitute evidence of consciousness itself—they measure the distribution of opinion among relevant experts.",
        },
        {
          id: "alignment-priority-argument",
          title: "AI Safety Researchers: Welfare Concerns Distract from Alignment",
          description:
            "Prominent AI safety researchers argue that focusing on AI welfare and consciousness risks distracting from the more urgent problem of AI alignment—ensuring AI systems do what humans want. If AI systems are not aligned with human values, granting them moral status could prevent us from shutting down dangerous systems. The priority should be safety first, welfare second.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Various AI safety researchers; discussions at AI safety workshops (2024-2025)",
          reasoning:
            "Pragmatic concern about resource allocation and institutional focus. However, some researchers (including at Anthropic) argue safety and welfare research are complementary, not competing.",
        },
      ],
    },
  ],
};
