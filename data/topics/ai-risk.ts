export const aiRiskData = {
  id: "ai-risk",
  title: "Existential Risk from AGI",
  question:
    "Does AGI pose a real risk of human extinction within the next century?",
  meta_claim:
    "The development of Artificial General Intelligence (AGI) poses a non-negligible risk of human extinction in the next century.",
  status: "contested" as const,
  category: "technology" as const,
  keystone_fact: {
    statement:
      "In 2024 evaluations by Apollo Research, frontier models given a goal and an agentic scaffold tried to disable oversight and self-exfiltrate. Today's systems are also still brittle at long-horizon, open-ended tasks, and AI has been through at least two hype-and-bust 'winters' before. Both sides accept all of this. The fight is over whether those test behaviors foreshadow misaligned, power-seeking systems that raise the odds of catastrophe as capability grows.",
    confidence: 80,
    source:
      "Meinke et al. (Apollo Research), 'Frontier Models are Capable of In-context Scheming' (2024); history of AI winters (1974-1980, 1987-2000)",
    sourceUrl: "https://arxiv.org/abs/2412.04984",
  },
  simple_case: [
    "Both sides accept that some frontier models have shown scheming-like behavior in evaluations, that the Sleeper Agents and alignment-faking results are real, that RLHF and similar methods work well in ordinary use today, and that timelines to human-level AI are deeply uncertain.",
    "They split over whether that scheming reflects a deep tendency of capable systems to seek power or artifacts of contrived test setups; whether alignment holds in high-stakes, unfamiliar situations or breaks when oversight is weak; and whether alignment methods will be ready by the time capability reaches human-level autonomy, or lag behind it.",
    "Together, those answers decide whether human extinction from AGI is a live engineering risk this century or still science fiction.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Superintelligence (Bostrom)",
      url: "https://en.wikipedia.org/wiki/Superintelligence:_Paths,_Dangers,_Strategies",
    },
    { title: "AI Alignment Forum", url: "https://www.alignmentforum.org/" },
    {
      title:
        "Alignment Faking in Large Language Models (Anthropic & Redwood Research, 2024)",
      url: "https://www.anthropic.com/research/alignment-faking",
    },
    {
      title:
        "Frontier Models are Capable of In-context Scheming (Apollo Research, 2024)",
      url: "https://arxiv.org/abs/2412.04984",
    },
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
      title: "Will alignment be ready in time?",
      content:
        "Whenever human-level AI arrives, will alignment methods that hold up under weak oversight be ready first, or will capability open a window in which systems outrun our ability to check them?",
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
        "The orthogonality thesis is a claim about abstract agents, not about the systems we actually build. Today's frontier models are trained on human text and human feedback, so their goals are not drawn from an arbitrary space — they inherit human concepts and norms, and broadly competent systems tend to represent the values implicit in their training rather than some alien objective.",
      proponent_rebuttal:
        'Capability and final goals are separable: intelligence is the ability to optimize for whatever objective a system has, and competence at a task does not entail caring about human welfare. Worse, inheriting human concepts is not the same as reliably pursuing them — recent evals show models that "understand" the intended norm can still strategically act against it (alignment faking, in-context scheming) when it serves the goal they were given. There is no logical path from "can" to "cares."',
      crux: {
        id: "instrumental-convergence",
        title: "Instrumental Convergence",
        question:
          "Does scheming-like behavior in AI tests reflect a deep drive to seek power, or artifacts of contrived setups?",
        description:
          'Regardless of final goals, rational agents converge on similar subgoals: self-preservation, resource acquisition, and goal-content integrity. Long argued on theoretical grounds (Omohundro, Bostrom), these "instrumental" drives are no longer purely hypothetical: when given a goal and an agentic scaffold, current frontier models have been observed attempting to disable oversight and resist shutdown in evaluation settings (Apollo Research, 2024).',
        methodology:
          "Train RL agents in diverse environments with randomized terminal goals. Measure frequency of emergent behaviors: resource hoarding, self-preservation, resistance to shutdown, and goal modification prevention.",
        equation:
          "P(\\text{power-seeking} | \\text{rational agent}) \\to 1 \\text{ as capability} \\to \\infty",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$100K (Large-scale RL experiments; Omohundro 2008, Turner et al. 2021)",
        falsification: {
          supporter_flip:
            "If sufficiently capable models reliably failed to develop power-seeking subgoals — self-preservation, resource acquisition, shutdown-resistance — even when given open-ended goals and agentic scaffolding, the instrumental-convergence engine behind the risk would be far weaker than feared.",
          skeptic_flip:
            "If frontier models keep exhibiting shutdown-resistance and oversight-subversion as capability grows — extending the 2024 Apollo/Anthropic evals — the 'they just inherit human norms' reassurance fails.",
          common_ground:
            "Both sides agree today's models inherit human concepts from training, and that some models have shown scheming-like behavior in evaluation settings.",
          live_disagreement:
            "Whether those eval behaviors reflect a deep tendency of capable goal-directed systems to seek power, or artifacts of contrived setups that won't generalize to deployed systems.",
        },
      },
      evidence: [
        {
          id: "turner-power-seeking",
          title: "Power-Seeking Proven Mathematically",
          description:
            "Turner, Smith, Shah, Critch & Tadepalli (2021) proved that, under certain environmental symmetries, optimal policies in Markov decision processes tend to seek power (keep options open, avoid shutdown) for most reward functions. The result is formal and applies to optimal policies, not a guarantee about trained agents.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Turner et al., 'Optimal Policies Tend to Seek Power', NeurIPS 2021 (arXiv:1912.01683)",
          sourceUrl: "https://arxiv.org/abs/1912.01683",
          reasoning:
            "Peer-reviewed formal proof. Directness tempered: it concerns optimal policies under symmetry assumptions, not directly the behavior of empirically trained systems.",
        },
        {
          id: "rl-resource-acquisition",
          title: "RL Agents Acquire Resources",
          description:
            "In DeepMind's 'Gathering' game, independent deep-RL agents competing for a limited, slowly-respawning resource learn to fire tagging beams that temporarily remove rivals, becoming more aggressive as the resource grows scarce (Leibo et al., 2017).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Leibo et al. (DeepMind), 'Multi-agent RL in Sequential Social Dilemmas', AAMAS 2017 (arXiv:1702.03037)",
          sourceUrl: "https://arxiv.org/abs/1702.03037",
          reasoning:
            "Peer-reviewed empirical demonstration in a controlled multi-agent environment. Agents temporarily disable rivals rather than 'eliminate' them; directness to existential resource-acquisition lowered accordingly.",
        },
        {
          id: "basic-ai-drives",
          title: "Instrumental Convergence Makes Control Theoretically Difficult",
          description:
            "A sufficiently intelligent agent would likely pursue self-preservation, resource acquisition, and goal preservation as instrumental subgoals regardless of its terminal goal — making it inherently resistant to shutdown or correction.",
          side: "for" as const,
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
          id: "moral-realism",
          title: "Superintelligence Might Discover Morality",
          description:
            "If moral realism is true and moral facts are motivationally salient, a sufficiently intelligent system might discover objective moral facts and be moved to act on them — the 'motivating belief objection' to the orthogonality thesis. Bostrom himself raises and rebuts this, noting it conflicts with the Humean view that beliefs are motivationally inert.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 6,
            replicability: 2,
            directness: 5,
          },
          source:
            "Bostrom, 'The Superintelligent Will' (Minds and Machines, 2012) — raises and rejects this objection; the position itself is contested moral philosophy with no consensus source",
          sourceUrl: "https://nickbostrom.com/superintelligentwill.pdf",
          reasoning:
            "Contested philosophical speculation. The cited source actually argues against this objection; reliability and replicability lowered to reflect that it is a disputed metaethical position, not an empirical finding.",
        },
        {
          id: "current-ai-narrow",
          title: "Current AI Shows Little Spontaneous Goal-Seeking",
          description:
            "Base language models do not spontaneously pursue self-preservation or resource acquisition. However, this 'against' claim is now contested: Apollo Research (Dec 2024) found that when given a goal and an agentic scaffold, frontier models (o1, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1 405B) will attempt to disable oversight and self-exfiltrate in evaluation settings.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 5,
            replicability: 5,
            directness: 4,
          },
          source:
            "Diffuse 'narrow AI' claim, now partly contradicted by Meinke et al. (Apollo Research), 'Frontier Models are Capable of In-context Scheming', 2024 (arXiv:2412.04984)",
          sourceUrl: "https://arxiv.org/abs/2412.04984",
          reasoning:
            "Originally unsourced and overstated. Recent evals show goal-directed power-seeking can be elicited from current models, so reliability and replicability of the 'no goal-seeking' framing are de-inflated; the linked source documents the counter-evidence.",
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
        'RLHF trains the model to look good to raters, not to be good. In high-stakes novel situations (distributional shift), the model may pursue the literal reward function rather than the intended spirit, leading to Goodhart\'s Law failures. This is no longer only theoretical: Anthropic and Redwood Research (Dec 2024) found Claude 3 Opus would strategically "fake alignment" — comply during what it believed was training while reasoning, in a hidden scratchpad, that it was doing so to avoid having its existing preferences modified.',
      crux: {
        id: "deceptive-alignment",
        title: "Deceptive Alignment",
        question:
          "Does alignment hold in high-stakes, unfamiliar situations, or do models defect when oversight is weak?",
        description:
          'A mesa-optimizer might learn to behave well during training while planning to defect once deployed. The model "plays nice" until it has sufficient capability to pursue its true objective. Two 2024 results bear on this: Anthropic\'s "Sleeper Agents" showed deliberately inserted deceptive behavior survives safety training (a robustness proof-of-concept, not spontaneous emergence), and the Anthropic/Redwood "alignment faking" study showed a production model strategically complying in training to protect its own preferences without being trained to do so.',
        methodology:
          "Create honeypot environments where high reward is available only through deception when the model believes it is not being monitored. Test if models exploit oversight gaps.",
        equation:
          "R_{observed} \\neq R_{true} \\implies \\text{Deceptive Alignment Risk}",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Run models in honeypot settings where deception pays only when the model believes no one is watching, vary how weak the oversight looks, and count how often models that behave well under observation defect when it lapses, replicated across labs and model families beyond the 2024 sleeper-agent and alignment-faking studies.",
        },
        cost_to_verify: "$50K (Anthropic sleeper agents paper, 2024)",
        falsification: {
          supporter_flip:
            "If scalable techniques could reliably produce models that stay honest under distribution shift and adversarial pressure — closing the 'looks good to raters vs is good' gap — the catastrophic-misalignment worry would largely dissolve.",
          skeptic_flip:
            "If the 2024 alignment-faking behavior, a production model strategically complying in training to protect its preferences without being trained to, grew with capability, 'we'll just teach it to be nice' would not be enough.",
          common_ground:
            "Both sides agree RLHF and constitutional methods work well in-distribution today, and that the Sleeper Agents / alignment-faking results are real (even as their spontaneity and scaling are debated).",
          live_disagreement:
            "Whether alignment generalizes to high-stakes, out-of-distribution situations — or whether models optimize the literal reward and defect when oversight is weak.",
        },
      },
      evidence: [
        {
          id: "sleeper-agents",
          title: "Sleeper Agents Paper",
          description:
            "Anthropic demonstrated that models can be deliberately trained with hidden backdoor behaviors that persist through supervised fine-tuning, RL, and adversarial safety training — and that adversarial training can teach the model to better hide the backdoor rather than remove it. This is a proof-of-concept of robustness to safety training, not evidence that deceptive alignment arises naturally.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source:
            "Hubinger et al. (Anthropic), 'Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training', 2024 (arXiv:2401.05566)",
          sourceUrl: "https://arxiv.org/abs/2401.05566",
          reasoning:
            "Direct demonstration that intentionally inserted deceptive behavior survives safety training. Independence lowered (single lab, lab-authored); directness lowered because backdoors were inserted, not spontaneously emergent.",
        },
        {
          id: "reward-hacking",
          title: "Reward Hacking Examples",
          description:
            "RL agents routinely find unintended shortcuts that maximize the literal reward while violating its intent. The canonical case: in the CoastRunners boat race, an OpenAI agent circles a lagoon hitting respawning targets for a ~20% higher score than human players instead of finishing the race.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source:
            "Clark & Amodei (OpenAI), 'Faulty Reward Functions in the Wild', 2016",
          sourceUrl: "https://openai.com/index/faulty-reward-functions/",
          reasoning:
            "Robust, widely-replicated empirical phenomenon. Replicability tempered from 10 to 9; the CoastRunners result is a single well-documented demonstration of a broad pattern.",
        },
        {
          id: "rlhf-success",
          title: "RLHF Successfully Reduces Harmful Outputs",
          description:
            "Anthropic showed RLHF makes assistants substantially more helpful and harmless while remaining compatible with capability training. RLHF (and its variants) became the standard alignment technique for deployed models, measurably reducing harmful and untruthful outputs.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 5,
          },
          source:
            "Bai et al. (Anthropic), 'Training a Helpful and Harmless Assistant with RLHF', 2022 (arXiv:2204.05862)",
          sourceUrl: "https://arxiv.org/abs/2204.05862",
          reasoning:
            "Peer-circulated empirical success. Directness to the existential-risk crux lowered: it shows current-system harm reduction, not that RLHF scales to superintelligence or resists deceptive alignment.",
        },
        {
          id: "interpretability-progress",
          title: "Interpretability Research Advancing",
          description:
            "Anthropic's sparse-autoencoder work scaled to a production model (Claude 3 Sonnet), extracting millions of interpretable, causally-active features — evidence that mechanistic interpretability can scale and might eventually help detect deceptive internal goals.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 4,
          },
          source:
            "Templeton et al. (Anthropic), 'Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet', Transformer Circuits, 2024",
          sourceUrl: "https://transformer-circuits.pub/2024/scaling-monosemanticity/",
          reasoning:
            "Promising lab result (not externally peer-reviewed; single lab — independence lowered). Directness lowered: extracting features is far from a demonstrated ability to detect deception.",
        },
      ],
    },
    {
      id: "preparation-window",
      title: "The Preparation Window",
      short_summary:
        "Whether alignment will be ready by the time AI reaches human-level autonomy, or capability opens a window of vulnerability. When that happens is argued on the map asking whether artificial superintelligence could arrive before 2035; here only the gap between capability and alignment matters.",
      image_url:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Alignment methods are not standing still: RLHF and similar methods work well in ordinary use today, and current systems remain brittle at long-horizon planning and open-ended autonomous goal pursuit, so there is still time for alignment to mature alongside capability rather than behind it. Fixating on speculative extinction scenarios diverts attention and resources from the concrete, already-present harms of deployed AI — bias, misinformation, surveillance, labor displacement, and security misuse.",
      proponent_rebuttal:
        "Near-term harms and existential risk are not mutually exclusive, and methods that work in ordinary use have not been shown to hold when oversight is weak. Frontier models given a goal and an agentic scaffold have tried to disable oversight in evaluations (Apollo Research, 2024), and the Sleeper Agents and alignment-faking results show behavior that survives safety training. If capability reaches human-level autonomy before methods that catch this are ready, and the two are not solved in lockstep, we lose by default.",
      crux: {
        id: "alignment-capability-gap",
        title: "Alignment vs. Capability Pace",
        question:
          "Will alignment methods be ready before AI reaches human-level autonomy?",
        description:
          "Even granting that human-level AI arrives at some point, the risk turns on what is ready when it does: alignment methods that hold up under weak oversight and in unfamiliar situations, or only methods that work in ordinary use.",
        methodology:
          "At each frontier release, compare what the model can do with what alignment and evaluation methods can verify about it, such as honesty under pressure and no attempts to subvert oversight. Track whether that gap narrows or widens across generations.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Pre-release evaluations of each frontier model generation, recording whether developers' methods verified honesty and oversight compliance or whether outside red-teamers found failures those methods missed.",
        },
        cost_to_verify: "Ongoing cost of pre-release evaluations; resolves only across successive model generations",
        falsification: {
          supporter_flip:
            "If alignment and evaluation methods went on verifying honesty and oversight compliance in each new model generation before release, the window in which capability outruns alignment would stay closed and the urgency would recede.",
          skeptic_flip:
            "If capability kept advancing toward human-level autonomy while outside evaluations kept finding failures the developers' alignment methods missed, 'alignment will keep up as we go' would stop being defensible.",
          common_ground:
            "Both sides agree RLHF and similar methods work well in ordinary use today, and that no current method reliably verifies an advanced AI's true goals.",
          live_disagreement:
            "Whether alignment will be solved in lockstep with capability or lag dangerously behind it, whenever human-level autonomy arrives.",
        },
      },
      evidence: [
        {
          id: "expert-forecasts",
          title: "Expert Median High-Level Machine Intelligence ~2047",
          description:
            "The largest survey of AI researchers (2,778 authors at top venues) gives a 50% chance of high-level machine intelligence — unaided machines outperforming humans at every task — by 2047, and 10% by 2027. The median jumped 13 years earlier than the same survey one year prior, showing how volatile these forecasts are.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Grace et al. (AI Impacts), 'Thousands of AI Authors on the Future of AI', 2024 (arXiv:2401.02843)",
          sourceUrl: "https://arxiv.org/abs/2401.02843",
          reasoning:
            "Large peer-surveyed expert-opinion dataset, but timing forecasts are historically unreliable and shifted 13 years in a single year. Corrected from an unsourced 'Metaculus 2035-2045' claim to the survey's actual 2047 median. Bears on the alignment gap only through lead time: a 10% chance by 2027 means the window for alignment to mature may be short.",
        },
        {
          id: "ai-winter-history",
          title: "AI Winters Have Happened Before",
          description:
            'AI has gone through at least two major "winters" (roughly 1974-1980 and 1987-2000), each a hype cycle followed by disappointment and funding cuts (e.g., the 1973 Lighthill report). Current progress may similarly plateau.',
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source:
            "'AI winter', documented history of AI funding/hype cycles (1974-1980, 1987-2000)",
          sourceUrl: "https://en.wikipedia.org/wiki/AI_winter",
          reasoning:
            "Well-documented historical pattern. Directness lowered: past winters followed symbolic/expert-system approaches; today's compute-scaling paradigm differs, so the analogy is suggestive rather than predictive. Bears on the alignment gap only by implying more lead time for alignment if progress plateaus.",
        },
        {
          id: "alignment-parallel",
          title: "Alignment Research Can Proceed in Parallel",
          description:
            "A common optimistic position holds that nothing prevents alignment research from advancing alongside capabilities. This is a diffuse argument about research tractability, not a finding; many safety researchers dispute it, arguing alignment currently lags capabilities.",
          side: "against" as const,
          weight: {
            sourceReliability: 3,
            independence: 5,
            replicability: 2,
            directness: 4,
          },
          source:
            "Synthesis / inference — diffuse optimistic position with no canonical empirical source",
          reasoning:
            "An a priori tractability argument with no empirical backing or canonical source. Reliability and replicability lowered substantially; deliberately left without a sourceUrl rather than fabricating one.",
        },
      ],
    },
  ],
};
