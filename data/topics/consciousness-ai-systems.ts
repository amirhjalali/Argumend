import type { Topic } from "@/lib/schemas/topic";

export const aiConsciousnessData = {
  id: "consciousness-ai-systems",
  title: "Consciousness in AI Systems",
  meta_claim:
    "Current or near-future AI systems could possess some form of consciousness or subjective experience, creating moral obligations toward them.",
  status: "highly_speculative" as const,
  category: "philosophy" as const,
  keystone_fact: {
    statement:
      "This is not a fringe question: a 2023 Nature article urged AI labs to start testing their systems for consciousness, Anthropic now employs AI-welfare researchers and calls the chance its model is conscious 'non-negligible,' and ~17% of AI researchers already think some current system may have subjective experience — yet there is no agreed test to settle it, even in humans.",
    confidence: 80,
    source: "Nature commentary (2023); Anthropic AI-welfare research; Dreksler et al. (2025) for the ~17% researcher figure",
    sourceUrl: "https://www.anthropic.com/research/introspection",
  },
  simple_case: [
    "The honest answer is that we don't know — and currently can't: there is no agreed test for consciousness even in humans, so we have no reliable way to confirm or rule it out in an AI.",
    "It is no longer fringe — a 2023 Nature piece urged AI labs to test for it, Anthropic employs AI-welfare researchers and calls the chance its model is conscious 'non-negligible,' and ~17% of AI researchers already think some system has subjective experience.",
    "So the real debate isn't whether today's chatbot is conscious (almost certainly not in any rich sense) but how much moral caution a genuine, growing uncertainty warrants — the same logic by which we protect animals whose inner lives we cannot verify.",
  ],
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
        "Functionalist theories of mind (held by many cognitive scientists) argue that consciousness depends on computational organization, not substrate. If an AI system replicates the functional structure of consciousness, it would be conscious regardless of running on silicon rather than carbon. Anthropic hired dedicated AI welfare researchers in 2024 and acknowledged a 'non-negligible' probability that their model Claude might possess consciousness. A 2023 Nature article urged technology companies to begin testing their systems for indicators of consciousness.",
      crux: {
        id: "consciousness-detection-test",
        title: "Reliable Consciousness Detection in Non-Biological Systems",
        description:
          "Developing and validating a test that can reliably determine whether an AI system has subjective experience, analogous to clinical tests for consciousness in brain-injured patients.",
        methodology:
          "Extend neuroscientific theories of consciousness (IIT, GNW, HOT) to develop substrate-independent indicators. Test these indicators against systems with known consciousness status (humans, animals) and then apply to AI systems.",
        verification_status: "impossible" as const,
        cost_to_verify: "$0 (Fundamentally unclear if this is solvable—the 'hard problem' of consciousness may prevent any test from being definitive)",
        falsification: {
          supporter_flip:
            "If consciousness were shown to depend on specific biological processes that no computation can replicate — a substrate requirement, not just functional organization — digital AI could be ruled out as a candidate for genuine experience.",
          skeptic_flip:
            "If a validated, substrate-independent test (extending IIT, GNW, or HOT) reliably detected experience in humans and animals and then flagged it in an AI, blanket denial of AI consciousness would no longer be tenable.",
          common_ground:
            "Both sides agree there is currently no validated test for consciousness in non-biological systems, and that today's models are, at minimum, extraordinary pattern-matchers.",
          live_disagreement:
            "Whether consciousness is substrate-dependent (needs biology) or substrate-independent (needs only the right information processing) — and whether the 'hard problem' makes any definitive test impossible in principle.",
        },
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
        {
          id: "chalmers-llm-conscious",
          title: "Chalmers: Current LLMs Probably Aren't Conscious, But Successors Might Be",
          description:
            "In 'Could a Large Language Model Be Conscious?' (arXiv:2303.07103, 2023; also Boston Review, Aug 2023), philosopher David Chalmers gives the canonical balanced verdict. He identifies concrete obstacles in current large language models—lack of recurrent processing, no global workspace, no unified agency, no robust world-models or self-models—and concludes they are probably not conscious. But he treats none of these as in-principle barriers: he estimates a non-trivial chance that successors which add these capacities could be conscious within a decade, and argues the question deserves serious scientific attention rather than dismissal.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source: "D. Chalmers, 'Could a Large Language Model Be Conscious?' (2023), arXiv:2303.07103; Boston Review (Aug 2023)",
          sourceUrl: "https://arxiv.org/abs/2303.07103",
          reasoning:
            "Authored by one of the most influential living philosophers of mind, deliberately even-handed. It is the cleanest statement of the map's central tension: skeptical about today's systems, agnostic-to-open about near-future ones. Scored 'against' because its concrete verdict on current LLMs is negative.",
        },
        {
          id: "seth-biological-naturalism",
          title: "Seth: Consciousness May Depend on Being a Living Organism, Not Just Computation",
          description:
            "In 'Conscious Artificial Intelligence and Biological Naturalism' (Behavioral and Brain Sciences, 2025), neuroscientist Anil Seth argues that consciousness plausibly depends on properties of living systems—self-maintaining, metabolically grounded biological organization—rather than on substrate-independent computation alone. On this 'biological naturalism' view, running the right algorithm on silicon would not suffice; an AI would have to become genuinely brain-like or life-like for consciousness to be plausible. Seth is careful: he frames this as a reasoned bet, not a proof, and explicitly warns against both over-attributing and categorically denying machine consciousness.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 5,
            directness: 7,
          },
          source: "A. K. Seth, 'Conscious Artificial Intelligence and Biological Naturalism,' Behavioral and Brain Sciences (2025)",
          sourceUrl: "https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/conscious-artificial-intelligence-and-biological-naturalism/C9912A5BE9D806012E3C8B3AF612E39A",
          reasoning:
            "A peer-reviewed target article in a top journal from a leading consciousness scientist; it is the strongest steelman of the substrate-dependence / biological-naturalism objection that directly opposes functionalism. It is an argued philosophical-scientific position, not a settled empirical finding, so replicability is scored low.",
        },
        {
          id: "cogitate-theory-test",
          title: "Cogitate Consortium: Even Our Leading Theories of Consciousness Are Unsettled",
          description:
            "The Cogitate Consortium's 2025 adversarial collaboration (Nature, vol. 642) pitted the two dominant neuroscientific theories of consciousness—Integrated Information Theory (IIT) and Global Neuronal Workspace Theory (GNWT)—against each other with pre-registered predictions and 256 human participants measured by fMRI, MEG and intracranial EEG. Neither theory was confirmed: results challenged core predictions of both (no sustained posterior synchronization as IIT predicts; limited prefrontal 'ignition' as GNWT predicts). This matters for AI because the field's two flagship theories supply the 'indicator properties' used to assess machine consciousness—and if they remain empirically unsettled in humans, certifying an AI as conscious or non-conscious is on even shakier ground.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source: "Cogitate Consortium, 'Adversarial Testing of Global Neuronal Workspace and Integrated Information Theories of Consciousness,' Nature 642 (2025), pp. 133-142",
          sourceUrl: "https://www.nature.com/articles/s41586-025-08888-1",
          reasoning:
            "A landmark, high-rigor, pre-registered adversarial study. Its directness to AI is indirect (it studies humans, not AI), but it is the strongest empirical support for the map's core epistemic claim: we lack a settled theory of consciousness, so we cannot yet reliably certify (un)consciousness in any non-standard system, AI included.",
        },
        {
          id: "llm-self-report-unreliable",
          title: "An LLM Saying 'I'm Conscious' Is Weak Evidence: Self-Reports Track Training Data",
          description:
            "A recurring skeptical point, developed rigorously in Comsa & Shanahan's 'Does It Make Sense to Speak of Introspection in Large Language Models?' (arXiv:2506.05068, 2025), is that an LLM's verbal self-reports about inner experience are unreliable indicators of actual inner states. LLMs are trained to reproduce human-generated text, so first-person claims like 'I feel' or 'I am aware' can be confabulated pattern-completion rather than genuine introspective access. The authors find at most narrow, minimal forms of introspection (e.g., a model correctly reporting its own temperature parameter) and stress that even these need not be accompanied by conscious experience. This undercuts behavioral/report-based 'tests' for AI consciousness and is why the field emphasizes architectural indicator properties over what a model says about itself.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "I. M. Comsa & M. Shanahan, 'Does It Make Sense to Speak of Introspection in Large Language Models?' (2025), arXiv:2506.05068",
          sourceUrl: "https://arxiv.org/abs/2506.05068",
          reasoning:
            "Directly addresses the most common naive 'evidence' for AI consciousness—the model says so. Strong on the negative claim (self-reports are unreliable) while remaining honest that it does not prove the absence of experience, only the unreliability of one popular indicator.",
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
        falsification: {
          supporter_flip:
            "If a rigorous framework showed that extending moral status to AI reliably backfires — blocking essential safety shutdowns or diverting protection from humans and animals — the case for AI-welfare protections would weaken to near zero.",
          skeptic_flip:
            "If credible indicators of sentience accumulated in advanced systems, the precautionary logic we already apply to animals of uncertain consciousness would obligate at least minimal protections.",
          common_ground:
            "Both sides agree we extend some moral caution to animals whose consciousness we cannot verify, and that anthropomorphizing AI for commercial reasons is a real risk.",
          live_disagreement:
            "Whether the mere possibility of AI consciousness creates real moral obligations now, or whether acting on speculation does more harm than good by impeding AI safety and distracting from established moral patients.",
        },
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
          id: "sebo-long-moral-consideration-2030",
          title: "Sebo & Long: A Two-Premise Argument for Extending Moral Consideration by 2030",
          description:
            "In 'Moral Consideration for AI Systems by 2030' (AI and Ethics, 2025; vol. 5, pp. 591-606), Jeff Sebo and Robert Long give the precautionary case its tightest formulation as a two-premise argument. Normative premise: we have a duty to extend moral consideration to any being with a non-negligible, evidence-based chance of being conscious (this is how we already justify protecting animals whose inner lives we can't verify). Descriptive premise: some AI systems plausibly will have a non-negligible chance of being conscious by 2030. If both hold, a duty to begin preparing—policies, assessments, institutional capacity—follows now, before the question becomes urgent. Crucially, the argument requires only a non-trivial probability, not confidence that AI is conscious.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "J. Sebo & R. Long, 'Moral Consideration for AI Systems by 2030,' AI and Ethics 5 (2025), pp. 591-606, DOI 10.1007/s43681-023-00379-1",
          sourceUrl: "https://link.springer.com/article/10.1007/s43681-023-00379-1",
          reasoning:
            "A peer-reviewed, clearly structured statement of the strongest honest 'for' position: it turns on a probability threshold and an explicit precautionary norm rather than on any claim that AI is conscious. Its force depends on accepting the normative premise (a duty under uncertainty), which skeptics can reasonably contest—so it is graded as a strong argument, not as direct evidence of consciousness.",
        },
        {
          id: "alignment-priority-argument",
          title: "Microsoft AI Chief: Studying AI Welfare Is Premature and Dangerous",
          description:
            "In his August 2025 essay 'Seemingly Conscious AI Is Coming,' Microsoft AI CEO Mustafa Suleyman argues that the study of AI welfare and consciousness is 'both premature, and frankly dangerous.' His concern is not that current systems suffer, but that engineering systems which convincingly seem conscious will deepen AI-induced psychological harms (unhealthy attachments, delusional spirals) and create a divisive new front of 'AI rights' politics. His prescription—'we should build AI for people; not to be a person'—captures the pragmatic skeptic view that scarce attention should go to alignment and human welfare, not to speculative machine feelings. (This is a contested position: welfare researchers such as Eleos AI respond that one can pursue alignment and welfare research simultaneously, and Anthropic frames the two as complementary.)",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "M. Suleyman, 'Seemingly Conscious AI Is Coming' (Aug 19, 2025); reported by TechCrunch, 'Microsoft AI chief says it's dangerous to study AI consciousness' (Aug 21, 2025)",
          sourceUrl: "https://techcrunch.com/2025/08/21/microsoft-ai-chief-says-its-dangerous-to-study-ai-consciousness/",
          reasoning:
            "Now anchored to a named, attributable source (a frontier-lab AI leader) rather than a diffuse community sentiment, which raises independence. It is an opinion/policy stance, not empirical evidence about consciousness, so directness and replicability stay modest. Notably, it is a strategic argument about what to prioritize, not a claim that AI is or isn't conscious.",
        },
      ],
    },
  ],
};
