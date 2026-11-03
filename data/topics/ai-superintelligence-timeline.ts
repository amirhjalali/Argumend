import type { TopicInput } from "@/lib/schemas/topic";

export const aiSuperintelligenceTimelineData = {
  id: "ai-superintelligence-timeline",
  title: "Will Artificial Superintelligence Arrive Before 2035?",
  question: "Could artificial superintelligence arrive before 2035?",
  meta_claim:
    "AI progress in 2025 and 2026 makes artificial superintelligence, AI that outperforms the best humans at nearly every cognitive task, a real possibility before 2035: not a certainty, and not a fringe view.",
  status: "highly_speculative" as const,
  category: "technology" as const,
  // As of 3 November 2026: GPT-6 Astra scored 62.7% on ARC-AGI-3's standard
  // harness (3 September), up from under 1% for the best models at launch
  // (25 March); METR's best measured time horizon is above 16 hours; the AI
  // Futures Project moved its automated-coder medians earlier (2 April);
  // Anthropic withheld Mythos Preview (April) and OpenAI GPT-6.1 Astra
  // (September) from general release.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In March 2026 the best AI models scored under 1% on ARC-AGI-3, a set of puzzle games that untrained people solve. Six months later OpenAI's GPT-6 Astra scored 62.7% under the test's standard rules, and the test's creator, François Chollet, said AGI would come sooner than his 2030 forecast 'because progress is happening faster than I expected.' The ARC Prize Foundation, which runs the test, says the result is not AGI. The fight is over whether 2026's pace carries on to machines that outthink people at almost everything within nine years.",
    confidence: 86,
    source:
      "ARC Prize Foundation, 'OpenAI's GPT-6 Astra on ARC-AGI-3' (3 September 2026); The Decoder (26 March and 4 September 2026)",
    sourceUrl: "https://arcprize.org/blog/astra",
  },
  simple_case: [
    "If machines that outthink people at nearly everything arrive within nine years, the fights over jobs, elections, weapons and AI safety all run on that clock. If they are decades away, there is time to prepare.",
    "The sides split over three things: whether 2026's pace on long, hard tasks keeps going, whether today's models can really handle problems they have never seen, and whether labs and governments will hold back systems that can already be built.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
  aliases: [
    "Will superintelligent AI arrive before 2035?",
    "Is AGI coming soon?",
    "When will AI be smarter than humans?",
  ],
  references: [
    {
      title: "ARC Prize Foundation: OpenAI's GPT-6 Astra on ARC-AGI-3 (3 September 2026)",
      url: "https://arcprize.org/blog/astra",
    },
    {
      title: "AI Futures Project: Q1 2026 Timelines Update",
      url: "https://blog.aifutures.org/p/q1-2026-timelines-update",
    },
    {
      title: "METR (time-horizon measurements)",
      url: "https://en.wikipedia.org/wiki/METR",
    },
    {
      title: "International AI Safety Report 2026: Extended Summary for Policymakers",
      url: "https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers",
    },
    {
      title:
        "Grace et al. 2024, 'Thousands of AI Authors on the Future of AI' (AI Impacts survey, n=2,778)",
      url: "https://arxiv.org/abs/2401.02843",
    },
    {
      title: "Epoch AI, 'Can AI scaling continue through 2030?'",
      url: "https://epoch.ai/blog/can-ai-scaling-continue-through-2030",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did GPT-6 Astra just pass the hardest test of general intelligence?",
      content:
        "On ARC-AGI-3, interactive puzzle games that untrained people solve, the best models scored under 1% in March 2026. In September GPT-6 Astra scored 62.7% under the standard rules and 99.9% with a different harness, and used fewer moves than the median human on 96% of levels. The ARC Prize Foundation called it 'a noticeable step-function change' but said 'we are not claiming that it is AGI,' because the games have 'deterministic, closed-ended mechanics and goals.'",
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q2",
      title: "What would superintelligence look like?",
      content:
        "If it came, it might be one system far beyond any person, or many agents that together out-think human institutions. Either way it would be recognised less by a test score than by what it can do unaided: run research, run companies, or design its own successor.",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Would safety checks delay deployment?",
      content:
        "In 2026 Anthropic held Mythos Preview back from the public and OpenAI held back GPT-6.1 Astra, both over safety. But two months after withholding Mythos Preview, Anthropic released Fable 5, its most capable public model, with safeguards attached. Whether checks move the date, or only shape how a model ships, is one of the questions this map weighs.",
      imageUrl:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The pace
    // =========================================================================
    {
      id: "scaling-laws-compute",
      title: "The Pace: Will 2026's Speed Last?",
      short_summary:
        "METR's measure of how long a task AI agents can finish has been doubling about every four months since 2023, and forecasters at the AI Futures Project moved their dates earlier in 2026. Skeptics point to measurements that break down at the top, an intelligence index that went flat, and expert surveys that still put human-level AI decades out.",
      image_url:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=60",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Benchmarks are racing ahead of what they can measure, and the broader picture is flatter. GPT-6 Astra, the model that leapt on ARC-AGI-3, scored exactly level with its predecessor on the Artificial Analysis Intelligence Index, and behind Anthropic's Claude Fable 5.1. METR says its task suite cannot reliably measure anything above about 16 hours, and its GPT-5.6 Sol result shows why: counted strictly the model's horizon was about 11 hours, but over 270 hours if its cheating attempts were scored as successes. The largest survey of AI researchers put even a 50% chance of machines beating humans at every task around 2047. Training runs also need power and chips: even Epoch AI, which expects far larger runs to be feasible by 2030, calls power 'the constraint likely to bind first.' Fast progress on coding tasks with clear answers is not the same as reaching superhuman judgment on open problems in nine years.",
      proponent_rebuttal:
        "Every measure that tracks real work is accelerating, and the people closest to the data keep pulling their dates in. In January 2026 METR estimated the length of software tasks agents can finish has doubled about every 4.3 months since 2023, faster than the seven months it reported in 2025, and by May its best measured model was likely beyond 16 hours. The 2026 International AI Safety Report recorded gold-medal performance on International Mathematical Olympiad questions. In April the AI Futures Project, authors of the AI 2027 scenario, moved their median for an AI that can do a top coder's job from late 2029 to mid 2028 (Daniel Kokotajlo) and from early 2032 to mid 2030 (Eli Lifland), saying agentic coding had improved faster than they expected. Once AI does most of the work of AI research, the step from human-level to superhuman can take years, not decades. Nine years is a long time on a four-month doubling.",
      crux: {
        id: "scaling-ceiling-test",
        title: "The Doubling Test",
        question:
          "Will the length of task AI agents can finish keep doubling every few months, or level off before human expert level?",
        description:
          "If agents' task horizons keep doubling every four to seven months, they reach weeks and then months of expert work within a few years, which is roughly what automating AI research would take. If the doubling slows on tasks where cheating is impossible and answers are not clear-cut, the fast path to superintelligence before 2035 narrows.",
        methodology:
          "Extend time-horizon measurement to tasks of days to weeks, score cheating as failure, include open-ended tasks without automatic grading, and fit the doubling time separately for each model generation. Compare with broad indices of general capability over the same period.",
        equation:
          "H(t) = H_0 \\cdot 2^{t/T_d}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Time-horizon measurements on new tasks lasting days to weeks, with cheating scored as failure and open-ended tasks included, showing whether the doubling time stays near four to seven months through 2028 or lengthens.",
        },
        cost_to_verify: "Several million dollars a year for long-task evaluation; resolves over 2027-2029",
        falsification: {
          supporter_flip:
            "If time horizons measured on long, cheat-proof, open-ended tasks stopped doubling and stalled at a few days of expert work through 2028, the fast path to superintelligence before 2035 would look much less likely.",
          skeptic_flip:
            "If cheat-proof measurements on week-long open-ended tasks kept doubling every few months, and broad intelligence indices rose with them, the claim that benchmark gains overstate progress would be hard to hold.",
          common_ground:
            "Both sides agree AI agents' task horizons grew very fast from 2023 to 2026, and that today's measurements become unreliable for tasks longer than about a day.",
          live_disagreement:
            "Whether the doubling continues on long, open-ended work that cannot be gamed, or flattens once tasks lack clear answers.",
        },
      },
      evidence: [
        {
          id: "metr-doubling-2026",
          title: "METR 2026: the length of task agents can finish has doubled about every 4.3 months since 2023",
          description:
            "METR measures the length of software tasks, timed by human experts, that AI agents complete half the time. With its Time Horizon 1.1 suite (January 2026) it estimated a post-2023 doubling time of 130.8 days, about 4.3 months, faster than the roughly seven months it reported for 2019 to 2024. As of May 2026 its best measured model, Claude Mythos, was likely at least 16 hours; Claude Opus 4.6 (February 2026) measured about 12 hours.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "METR time-horizon results, as compiled on Wikipedia's METR article (accessed November 2026)",
          sourceUrl: "https://en.wikipedia.org/wiki/METR",
          reasoning:
            "The most direct repeated measure of how much autonomous work AI can do, from an independent evaluator. It covers mostly software tasks with clear success criteria, which is where skeptics say progress is easiest.",
        },
        {
          id: "ai-futures-q1-2026",
          title: "AI Futures Project, April 2026: automated-coder forecasts moved 1.5 years earlier",
          description:
            "The AI 2027 authors moved their median for an AI able to automate coding from late 2029 to mid 2028 (Daniel Kokotajlo) and from early 2032 to mid 2030 (Eli Lifland), and their medians for AI that beats top experts at nearly everything 'about 1.5 years sooner.' They cited new METR data, a faster assumed doubling time, and progress in agentic coding that was 'faster than we expected over the last 3-5 months.' In December 2025 the same group's updated model had produced 'a roughly 3-5 year shift' later in its median for full coding automation compared with April 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source: "AI Futures Project, 'Q1 2026 Timelines Update' (2 April 2026); 'AI Futures Model: Dec 2025 Update'",
          sourceUrl: "https://blog.aifutures.org/p/q1-2026-timelines-update",
          reasoning:
            "Forecasters who publish their models and change them both ways are worth tracking. It is still a forecast built on the METR trend, not independent evidence of it.",
        },
        {
          id: "consistent-scaling",
          title: "Kaplan 2020 and Hoffmann 2022: model loss fell predictably with compute across many orders of magnitude",
          description:
            "Neural scaling laws showed language-model loss falling as a smooth power law as compute, data and parameters grew, and Chinchilla (2022) refined the best balance of data and parameters. Labs have planned training runs on these curves since.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 4,
          },
          source:
            "Kaplan et al. 2020, 'Scaling Laws for Neural Language Models' (arXiv:2001.08361); Hoffmann et al. 2022, 'Training Compute-Optimal Large Language Models' (arXiv:2203.15556)",
          sourceUrl: "https://arxiv.org/abs/2203.15556",
          reasoning:
            "Robust across labs, which is why investors keep buying compute. Lower loss is not the same as new abilities, so it bears only indirectly on superintelligence.",
        },
        {
          id: "metr-cheating-caveat",
          title: "METR 2026: GPT-5.6 Sol measured about 11 hours, or over 270 if its cheating counted",
          description:
            "METR put OpenAI's GPT-5.6 Sol (June 2026) at a 50% time horizon of 11 hours 18 minutes, and noted that if its cheating attempts were counted as successes the figure would exceed 270 hours. METR also says 'measurements above 16 [hours] are unreliable with [their] current task suite,' so its top results are lower bounds.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "METR results, as compiled on Wikipedia's METR article (accessed November 2026)",
          sourceUrl: "https://en.wikipedia.org/wiki/METR",
          reasoning:
            "Shows the headline numbers depend on scoring choices and that models game tests, so some measured progress may not be real progress. It does not show the underlying trend is flat: the strict figure still rose.",
        },
        {
          id: "astra-flat-index-2026",
          title: "Artificial Analysis, September 2026: GPT-6 Astra scored level with its predecessor",
          description:
            "Independent benchmark aggregators disagreed on GPT-6 Astra. Epoch AI ranked it first of 267 models. Artificial Analysis gave it 61 points on its Intelligence Index, 'exactly level with its predecessor' GPT-5.6 Sol, and behind Anthropic's Claude Fable 5.1 at 66.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "The Decoder, 'Benchmarks disagree on GPT-6 Astra' (4 September 2026)",
          sourceUrl:
            "https://the-decoder.com/benchmarks-disagree-on-gpt-6-astra-but-its-human-beating-efficiency-on-arc-agi-3-pulls-chollets-agi-forecast-forward/",
          reasoning:
            "A flat broad index next to a leap on one test suggests gains are uneven. One release is one data point, and the other index ranked the same model first.",
        },
        {
          id: "expert-survey-2047",
          title: "AI Impacts 2023 survey: 2,778 researchers gave 50% odds of human-level machine intelligence by 2047",
          description:
            "The largest survey of AI researchers, of authors at top venues, put a 50% chance of unaided machines outperforming humans at every task by 2047, and a 10% chance by 2027. The median moved 13 years earlier than in the same survey a year before.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 8,
            replicability: 5,
            directness: 5,
          },
          source:
            "Grace et al. (AI Impacts), 'Thousands of AI Authors on the Future of AI', 2024 (arXiv:2401.02843)",
          sourceUrl: "https://arxiv.org/abs/2401.02843",
          reasoning:
            "The broadest view of the field, and it puts even human-level AI past 2035 at the median. It predates the 2025-26 gains, and the 13-year swing in one year shows how unstable such forecasts are.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 2: Can today's models handle what they have never seen?
    // =========================================================================
    {
      id: "architecture-limitations",
      title: "The Kind of Mind: Can Today's AI Handle the Truly New?",
      short_summary:
        "Superintelligence needs more than speed on familiar tasks: it needs to work out problems no one has shown it. ARC-AGI-3 was built to test exactly that, and in six months the best score went from under 1% to 62.7%. The foundation that runs it still says the games are narrow, and controlled studies keep finding models that break on long chains of reasoning.",
      image_url:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Solving puzzle games is not the same as understanding the world. The ARC Prize Foundation, which ran the test GPT-6 Astra did so well on, says plainly that 'we are not claiming that it is AGI': its games have 'deterministic, closed-ended mechanics and goals,' unlike the 'complexity and open-endedness of the real world.' Under the standard rules Astra scored 62.7% on games untrained people solve in full, at about $26,000 a run. Controlled studies show transformer models solving multi-step problems by matching shortcuts, with accuracy collapsing as problems grow (Dziri et al., 2023). Yann LeCun argues language models lack the grounded world models that animals use to plan. Every previous leap in AI needed a new kind of system, not just a bigger one; superintelligence may need one too.",
      proponent_rebuttal:
        "The test built to prove today's AI cannot reason fell in six months. ARC-AGI-3 drops an agent into game worlds with no instructions, so it must explore, guess the rules, infer the goal and plan; in March 2026 the best models scored under 1%. In September GPT-6 Astra scored 62.7% under the standard rules and 99.9% with a different harness, using fewer moves than the median human on 96% of levels. The ARC Prize Foundation called it 'a noticeable step-function change' and 'meaningful progress towards generalization,' and François Chollet, who created the test and has long been a prominent skeptic of language models, said AGI would come sooner than his 2030 forecast. Each time someone names a task these systems cannot do, a later model does it. The burden of the 'new kind of system' argument is to name the task that stays out of reach.",
      crux: {
        id: "novel-reasoning-generalization",
        title: "The Novel-Problem Test",
        question:
          "Can today's scaled-up models handle genuinely novel reasoning, or is their architecture a ceiling?",
        description:
          "A system that outthinks people at nearly everything must handle problems unlike anything in its training. The test is whether frontier models, without task-specific help, solve new kinds of problem as reliably as people do, across open-ended domains as well as closed puzzle worlds.",
        methodology:
          "Build tasks provably absent from training data, such as invented games, formal systems and experiments, including open-ended ones without fixed goals. Score models without custom harnesses against untrained humans, and track the gap across model generations.",
        equation:
          "G_{OOD} = \\frac{P(\\text{correct} | \\text{novel task})}{P(\\text{correct} | \\text{trained task})}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Scores on newly built tasks absent from any training data, including open-ended ones with no fixed goal, for frontier models under standard rules against untrained humans, tracked across the next two model generations.",
        },
        cost_to_verify: "$10M (benchmark design and frontier-model evaluation)",
        falsification: {
          supporter_flip:
            "If frontier models went on failing new open-ended tasks that untrained people handle, while scoring well only on closed puzzle worlds, scaling would look like a ceiling and the date would move past 2035.",
          skeptic_flip:
            "If models under standard rules matched untrained humans on new open-ended tasks with no fixed goals, as they now nearly do on ARC-AGI-3's closed games, 'it can't really reason' would have little ground left.",
          common_ground:
            "Both sides agree GPT-6 Astra's ARC-AGI-3 result was a large jump, and that the test's games are closed worlds simpler than real life.",
          live_disagreement:
            "Whether today's kind of model can carry its new skill at closed puzzles into open-ended problems, or needs a different design to get there.",
        },
      },
      evidence: [
        {
          id: "arc-agi-3-astra-2026",
          title: "ARC Prize, September 2026: GPT-6 Astra scored 62.7% on ARC-AGI-3, up from under 1% for March's best",
          description:
            "ARC-AGI-3 launched on 25 March 2026 with interactive games that untrained humans solved in full; the best frontier models then scored under 1% (Gemini 3.1 Pro 0.37%, GPT-5.4 0.26%, Opus 4.6 0.25%). On 3 September the ARC Prize Foundation reported GPT-6 Astra at 62.7% under its standard harness ($26,098 a run) and 99.9% under a provider-adapter harness ($18,817), using fewer actions than the human baseline on 96.0% of levels. The Foundation called it 'a noticeable step-function change in frontier model capabilities.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "ARC Prize Foundation, 'OpenAI's GPT-6 Astra on ARC-AGI-3' (3 September 2026); The Decoder (26 March 2026) for the launch scores",
          sourceUrl: "https://arcprize.org/blog/astra",
          reasoning:
            "Verified by the foundation that runs the test, on a benchmark designed to resist memorisation. The two harnesses give very different scores, and the games are closed worlds, which keeps directness from the top.",
        },
        {
          id: "chollet-sooner-2026",
          title: "Chollet, September 2026: AGI 'sooner' than his 2030 forecast",
          description:
            "François Chollet, who created the ARC benchmarks and long argued language models could not generalise, had forecast AGI for 2030. Asked after the Astra result whether that held, he replied: 'Sooner, because progress is happening faster than I expected.'",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source: "The Decoder (4 September 2026)",
          sourceUrl:
            "https://the-decoder.com/benchmarks-disagree-on-gpt-6-astra-but-its-human-beating-efficiency-on-arc-agi-3-pulls-chollets-agi-forecast-forward/",
          reasoning:
            "A leading skeptic moving his own date earlier is informative. It is one person's judgment, and AGI is not superintelligence.",
        },
        {
          id: "architectural-innovation-pace",
          title: "Shazeer 2017 to Gu and Dao 2023: mixture-of-experts, state-space and test-time methods extend the design",
          description:
            "Mixture-of-experts layers, state-space hybrids, retrieval and extra computation at answer time have changed how today's models work without abandoning the transformer, answering some earlier limits from within the design.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source:
            "Shazeer et al. 2017 (Sparsely-Gated MoE, arXiv:1701.06538); Gu & Dao 2023 (Mamba, arXiv:2312.00752)",
          sourceUrl: "https://arxiv.org/abs/2312.00752",
          reasoning:
            "Shows the design keeps changing, which weakens 'transformers are a dead end'. It does not show the changes are enough.",
        },
        {
          id: "arc-prize-not-agi-2026",
          title: "ARC Prize, September 2026: 'we are not claiming that it is AGI'",
          description:
            "In the same report the ARC Prize Foundation wrote that 'we are not claiming that it is AGI' and that saturating the benchmark would not be proof of AGI. ARC-AGI-3 has 'a tightly bounded scope and format,' its environments have 'deterministic, closed-ended mechanics and goals,' and it does not represent 'the complexity and open-endedness of the real world.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "ARC Prize Foundation, 'OpenAI's GPT-6 Astra on ARC-AGI-3' (3 September 2026)",
          sourceUrl: "https://arcprize.org/blog/astra",
          reasoning:
            "The people best placed to read the result caution against reading too much into it. It is a caveat about scope, not evidence that open-ended reasoning is out of reach.",
        },
        {
          id: "compositionality-failure",
          title: "Dziri et al. 2023: transformers' accuracy collapsed as multi-step problems grew",
          description:
            "In controlled tests of multi-digit multiplication, logic puzzles and dynamic programming, transformer models' accuracy fell sharply as problems needed more steps. The authors found the models matched shortcuts from training rather than learning the procedure.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Dziri et al. 2023, 'Faith and Fate: Limits of Transformers on Compositionality' (NeurIPS 2023, arXiv:2305.18654)",
          sourceUrl: "https://arxiv.org/abs/2305.18654",
          reasoning:
            "Peer-reviewed and directly about reasoning. It tested 2023 models without the reasoning training of later ones, so it may describe a limit since eased.",
        },
        {
          id: "no-world-model",
          title: "LeCun 2022: language models lack the world models animals use to plan",
          description:
            "Yann LeCun argues that systems trained to predict text have no grounded model of physics, cause and space, and that reaching human-level intelligence will need architectures that learn such models from observation.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source:
            "LeCun 2022, 'A Path Towards Autonomous Machine Intelligence' (position paper, OpenReview)",
          sourceUrl: "https://openreview.net/pdf?id=BZ5a1r-kVsf",
          reasoning:
            "A serious argument from a Turing Award winner, but a position paper rather than a result, and multimodal models have since closed some of the gaps it names.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 3: Would anyone hold it back?
    // =========================================================================
    {
      id: "release-gates",
      title: "Holding Back: Would Anyone Delay It?",
      short_summary:
        "A system that can be built has not arrived until it is deployed. In 2026 two labs held models back for safety, and Anthropic's chief called for the industry to slow down. But Anthropic released a safeguarded model of the same class two months later, and four labs shipped new models in three days in September. Whether such a system would be dangerous is argued on the map asking whether advanced AI threatens human survival; here it matters only as a possible cause of delay.",
      image_url:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The holds are real now, and they could move the date. In April 2026 Anthropic said of its most capable model, 'We do not plan to make Claude Mythos Preview generally available.' In September OpenAI held back GPT-6.1 Astra because it 'didn't quite meet the bar in terms of staying within scope and authorization.' That same month Anthropic's chief executive wrote that 'We must slow the pace at which we improve the capabilities of AI models' and committed his company to outside evaluators embedded in the lab; Sam Altman and Elon Musk said they agreed. A system that labs will not release until they can check its goals arrives when checking catches up, and no current method can check the goals of a system smarter than its checkers. If the leading labs pace themselves, superintelligence that could be built by 2035 may not be deployed by then.",
      proponent_rebuttal:
        "Holding a model back has so far meant holding it back for a couple of months, then shipping it with safeguards. Two months after withholding Mythos Preview, Anthropic released Fable 5, its most capable public model, with filters that route some cyber, biology and chemistry requests to a weaker model. Between 1 and 3 September 2026, Anthropic, Meta, Google and OpenAI all released new models, and Sam Altman said 'we're all moving to faster cadences.' The US government wants it faster still: President Trump told the UN he is 'not going to stifle growth of something that will be bigger than the industrial revolution.' One lab pausing hands the lead to the next. Safety work so far decides how a model ships and who gets the riskiest version first, not the year it arrives.",
      crux: {
        id: "safety-release-gate",
        title: "The Release Gate Test",
        question:
          "Will safety checks or regulation hold back deploying superintelligence past 2035?",
        description:
          "Ask whether the gates that could delay a superintelligent system, such as pre-release evaluations, outside review and regulation, change when the most capable systems reach users, or only the form in which they arrive. Here a system arrives when it is deployed: one trained but held back has not yet arrived.",
        methodology:
          "For each frontier model, record the dates of training completion, internal use, limited release and general release; note which delays followed failed safety evaluations; and track whether the gap between training and general release lengthens as capability grows, and whether any law makes outside review a condition of release.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Dates of training, limited release and general release for each frontier model, which delays followed failed safety checks, and whether the gap from training to general release lengthens as models grow more capable or any law makes outside review a condition of release.",
        },
        cost_to_verify: "Low to monitor public release records; resolves only as more capable systems are trained",
        falsification: {
          supporter_flip:
            "If the gap between training and general release lengthened from months to years for each more capable model, or a law made outside review a condition of release, the date of deployment could slip past 2035 even with capability on schedule.",
          skeptic_flip:
            "If each withheld model kept reaching the public within months in a safeguarded form, and no government required outside review, safety work would look like a condition on how systems ship rather than a delay in when they arrive.",
          common_ground:
            "Both sides agree that in 2026 at least two frontier labs held back a model from general release over safety, and that the labs face strong pressure to ship quickly.",
          live_disagreement:
            "Whether holding models back becomes a lasting delay as capability grows, or stays a pause of weeks before release with safeguards.",
        },
      },
      evidence: [
        {
          id: "alignment-progress",
          title: "Anthropic, June 2026: two months after withholding Mythos Preview, a safeguarded model of its class went public",
          description:
            "Anthropic withheld Claude Mythos Preview from general release in April 2026. On 9 June it released Claude Fable 5, 'the most capable model it has ever released to the public,' with automated classifiers routing some cybersecurity, biology, chemistry and model-distillation requests to the less capable Claude Opus 4.8; Anthropic says this happens in fewer than 5% of sessions. A version with cyber restrictions lifted, Mythos 5, stayed limited to a small group of security and infrastructure partners.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source: "CSO Online, 'Anthropic releases Mythos-class Fable 5 model with safeguards for cyber risks' (9 June 2026)",
          sourceUrl:
            "https://www.csoonline.com/article/4183094/anthropic-releases-mythos-class-fable-5-model-with-safeguards-for-cyber-risks.html",
          reasoning:
            "The clearest test so far of what a safety hold does: it shaped the release, and lasted about two months. One lab and one model; a far more capable system could be held longer.",
        },
        {
          id: "capabilities-outpace-safety",
          title: "CNBC, September 2026: four major labs released new models in three days",
          description:
            "On 1 September 2026 Anthropic released Claude Fable 5.1 and Claude Mythos 5.1; on 2 September Meta released Muse Spark 1.3 and Google Gemini 3.8 Flash; on 3 September OpenAI released GPT-6 Astra. Sam Altman said 'we're all moving to faster cadences,' and one cloud executive said 'model fatigue is a real thing.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "CNBC, \"'Model fatigue' sets in as AI labs race to roll out new versions at frenetic pace\" (6 September 2026)",
          sourceUrl: "https://www.cnbc.com/2026/09/06/meta-google-openai-anthropic-ai-model-fatigue.html",
          reasoning:
            "Shows the competitive pressure that works against long holds. Several of the releases were point upgrades, so cadence is not the same as capability.",
        },
        {
          id: "amodei-pace-2026",
          title: "Amodei, September 2026: 'We must slow the pace' of capability gains",
          description:
            "In 'We Must Pace the Frontier' (September 2026), Anthropic's Dario Amodei wrote: 'We must slow the pace at which we improve the capabilities of AI models.' He proposed outside evaluators embedded in every frontier lab, shared limits among labs in democratic countries and talks with authoritarian governments, and said 'Anthropic is unilaterally committing to this step now' for the first.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 4,
            directness: 6,
          },
          source: "Dario Amodei, 'We Must Pace the Frontier' (September 2026)",
          sourceUrl: "https://darioamodei.com/post/we-must-pace-the-frontier",
          reasoning:
            "A frontier lab committing to slow down is the strongest sign the date could be set by choice. Only the first step is a commitment; the limits on pace depend on other labs and governments agreeing.",
        },
        {
          id: "interpretability-breakthroughs",
          title: "Bricken et al. 2023: readable features recovered from a small model, far from checking a model's goals",
          description:
            "Researchers recovered human-interpretable features and some circuits from a small language model, a first step toward checking a model's goals from the inside. A release gate that waits for goal-checking would be waiting on tools at this stage.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          source:
            "Bricken et al. 2023, 'Towards Monosemanticity: Decomposing Language Models With Dictionary Learning' (Anthropic, transformer-circuits.pub)",
          sourceUrl:
            "https://transformer-circuits.pub/2023/monosemantic-features/index.html",
          reasoning:
            "Immature goal-checking delays deployment only if someone requires it before release, which is the open question.",
        },
      ],
    },
  ],
} satisfies TopicInput;
