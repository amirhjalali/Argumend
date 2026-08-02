export const ai2027Data = {
  id: "ai-2027",
  title: "AI 2027: The Recursive-Automation Timeline",
  meta_claim:
    "The AI 2027 scenario forecasts that once AI systems can meaningfully automate AI research itself, a feedback loop compresses the path to superintelligence into the late 2020s — making this a decisive and dangerous period. The claim rests less on 'AI will be powerful' than on two contested quantitative bets: that the automation of R&D triggers an intelligence explosion, and that the resulting takeoff is fast (months, not decades) rather than a gradual ramp.",
  status: "highly_speculative" as const,
  category: "technology" as const,
  references: [
    {
      title: "AI 2027 (Kokotajlo, Alexander, Larsen, Lifland & Dean, 2025)",
      url: "https://ai-2027.com/",
    },
    {
      title:
        "Measuring AI Ability to Complete Long Tasks (METR, 2025)",
      url: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
    },
    {
      title: "Epoch AI — Machine Learning Trends",
      url: "https://epochai.org/trends",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does automating AI research close a loop, or hit a wall?",
      content:
        "The whole scenario turns on whether AI systems can take over enough of the AI-research labor pipeline to accelerate their own successors. If cognition is the binding constraint, the loop tightens fast; if compute, real-world experiment latency, or data are the true bottlenecks, more thinking doesn't buy proportional speed.",
    },
    {
      id: "q2",
      title: "Is takeoff a cliff or a slope?",
      content:
        "Even granting a feedback loop, the timeline's shape depends on takeoff speed. A 'fast takeoff' (a few frantic months from near-human to superhuman) and a 'slow takeoff' (a continuous, years-long, economically visible ramp) imply radically different policy windows. This is the crux the 2027 date lives or dies on.",
    },
    {
      id: "q3",
      title: "Are aggressive AI timelines systematically wrong?",
      content:
        "Forecasters — including the AI 2027 authors — have strong priors that AI arrives soon. History records both premature AI hype (the winters) and a recent run of expert predictions that proved far too conservative. Which base rate applies here is itself a measurable, resolvable question.",
    },
  ],
  pillars: [
    {
      id: "rnd-automation-loop",
      title: "The R&D-Automation Feedback Loop",
      short_summary:
        "The engine of the scenario: AI that can autonomously do longer and longer research tasks starts accelerating the research that produces the next AI.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "AI research is not a pure cognition problem. Its critical path runs through large training runs, real-world experiment latency, finite compute, and scarce high-quality data — serial bottlenecks that ten thousand fast AI 'researchers' cannot skip. By Amdahl's logic, automating the parallelizable thinking only speeds the whole loop up to the ceiling set by the non-automatable steps. You can generate hypotheses at superhuman speed and still wait weeks for each frontier training run to finish.",
      proponent_rebuttal:
        "The bottleneck argument assumes the current mix of cognition-to-compute stays fixed, but the loop reallocates it: better research judgment means fewer wasted runs, better algorithms mean more capability per FLOP, and better engineering shortens experiment cycles. And the empirical trend that matters is already moving fast — METR finds the length of task an AI can complete autonomously has been doubling roughly every seven months, which is exactly the variable that governs how much of the research pipeline AI can take over.",
      crux: {
        id: "task-horizon-trajectory",
        title: "The METR Task-Horizon Trajectory",
        description:
          "The single most load-bearing measurement in the whole scenario: the '50%-task-completion time horizon' — the human-clock length of task at which a frontier model succeeds half the time. If this horizon keeps doubling on its recent cadence, short timelines follow almost mechanically; if it plateaus, the intelligence-explosion loop never ignites and the timeline stretches out for decades.",
        methodology:
          "Assemble a suite of software/research tasks with measured human completion times, evaluate each new frontier model's success rate as a function of task length, and fit the length at which success crosses 50%. Track that horizon across model generations and test whether the doubling time is stable, lengthening, or shortening — and critically, whether the trend on messy real-world research tasks matches the trend on clean benchmarks.",
        equation:
          "H(t) = H_0 \\cdot 2^{\\,t / \\tau}, \\quad \\tau \\approx 7\\ \\text{months}",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 to track (METR maintains the series; the open question is extrapolation, not measurement)",
      },
      evidence: [
        {
          id: "metr-time-horizon",
          title: "Autonomous task length doubling ~every 7 months",
          description:
            "METR's 'Measuring AI Ability to Complete Long Tasks' (2025) finds the 50%-completion time horizon of frontier models has grown exponentially since 2019, doubling roughly every seven months — the clearest quantitative signal that AI is climbing toward autonomously executing long research tasks.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "METR (2025)",
          sourceUrl:
            "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
          reasoning:
            "Independent evaluator, methodologically explicit, and directly measures the automation-relevant variable. Directness slightly capped because task-horizon on benchmarks is a proxy for the messier real research pipeline.",
        },
        {
          id: "coding-agent-progress",
          title: "AI already handles substantial software-engineering tasks",
          description:
            "Frontier models' success rates on real GitHub issue-resolution benchmarks (SWE-bench Verified) rose from a few percent to a majority of tasks within roughly two years — evidence that a large share of the coding labor inside AI R&D is becoming automatable.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "SWE-bench Verified leaderboard (Jimenez et al. benchmark)",
          sourceUrl: "https://www.swebench.com/verified.html",
          reasoning:
            "A real, fast-moving trend on a curated benchmark; directness is moderate because passing filtered GitHub issues is not the same as originating novel research.",
        },
        {
          id: "serial-bottleneck",
          title: "Research has serial bottlenecks cognition can't skip",
          description:
            "Frontier progress is gated by training-run wall-clock time, chip supply, and the latency of real-world experiments. Parallel AI cognition speeds only the parallelizable fraction; Amdahl's law caps the total speedup at the non-automatable remainder.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "Synthesis / inference — Amdahl's law applied to an unmeasured R&D pipeline",
          reasoning:
            "A clean, well-grounded structural argument, but hard to size precisely — how large the serial fraction is remains the empirical question.",
        },
        {
          id: "experiment-latency",
          title: "The best ideas still need slow physical experiments",
          description:
            "Many algorithmic advances are only validated by running them at scale; a superhuman idea-generator that must still queue for scarce GPUs and wait out each run may accelerate research far less than a naive 'AI-researchers × speed' extrapolation implies.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source: "Synthesis / inference — qualitative constraint from experiment and compute latency",
          reasoning:
            "Directly targets the loop's assumed multiplier, but is a qualitative bound rather than a measured coefficient.",
        },
      ],
    },
    {
      id: "compute-algorithmic-trend",
      title: "Compute & Algorithmic Progress Stay on Trend",
      short_summary:
        "The fuel supply: whether training compute and algorithmic efficiency keep rising fast enough to reach the capability threshold on schedule.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "The inputs face hard walls. Chinchilla-optimal training implies models are increasingly data-bound, and the stock of high-quality human text is finite; energy, fab capacity, and capital all scale sub-exponentially; and gains on the reasoning benchmarks that actually matter for research are slowing per compute dollar. Extrapolating a straight line on a log plot ignores that every input feeding it is bending.",
      proponent_rebuttal:
        "Each apparent wall has had a workaround on trend. Epoch AI finds frontier training compute has grown roughly 4–5× per year, and that algorithmic efficiency independently improves at a comparable pace — the two compound. Data limits are being pushed back by synthetic data, self-play, and RL on verifiable tasks. The scenario doesn't need the trend to run forever; it only needs it to hold for the few more orders of magnitude to the automation threshold.",
      crux: {
        id: "effective-compute-extrapolation",
        title: "The Effective-Compute Extrapolation",
        description:
          "Combine hardware compute growth and algorithmic-efficiency growth into a single 'effective compute' curve and ask whether it reaches the level the scenario needs for research automation before any input wall (data, energy, capital) forces it to bend.",
        methodology:
          "Using Epoch AI's compute and algorithmic-progress series, project effective compute forward under trend, then stress-test against explicit ceilings: high-quality data stock, projected fab and power buildout, and observed benchmark-gain-per-FLOP on reasoning tasks. The scenario survives only if the threshold is crossed before the binding ceiling.",
        equation:
          "C_{\\text{eff}}(t) = C_{\\text{hardware}}(t) \\cdot A(t), \\quad C \\sim 4\\text{–}5\\times/\\text{yr}",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (public Epoch AI trend data; extrapolation is the contested step)",
      },
      evidence: [
        {
          id: "epoch-compute-growth",
          title: "Training compute growing ~4–5× per year",
          description:
            "Epoch AI's tracking of notable models shows frontier training compute has grown roughly 4–5× annually over the past decade — far faster than Moore's Law and a core input to short-timeline projections.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "Epoch AI, Machine Learning Trends",
          sourceUrl: "https://epochai.org/trends",
          reasoning:
            "Exceptionally well-documented and reproducible input trend; directness is limited because more compute only implies short timelines if scaling remains sufficient.",
        },
        {
          id: "algorithmic-efficiency",
          title: "Algorithmic efficiency compounds on top of compute",
          description:
            "Epoch AI's analysis of algorithmic progress finds the compute needed to reach a fixed language-model performance has been falling rapidly — an efficiency gain that multiplies raw hardware growth rather than merely adding to it.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Epoch AI, algorithmic progress analysis (Ho, Besiroglu et al.)",
          sourceUrl:
            "https://epoch.ai/publications/algorithmic-progress-in-language-models",
          reasoning:
            "Strong evidence the trend has a second compounding engine; the exact halving time is estimated with wide error bars.",
        },
        {
          id: "kaplan-scaling",
          title: "Scaling laws have been predictive across many orders of magnitude",
          description:
            "Kaplan et al. (2020) established smooth power-law relationships between compute, data, parameters, and loss that have held across roughly five orders of magnitude, giving forecasters a quantitative basis for extrapolation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source: "Kaplan et al. (2020)",
          sourceUrl: "https://arxiv.org/abs/2001.08361",
          reasoning:
            "Empirically robust and replicated; directness capped because predictable loss decline does not guarantee the specific capability (autonomous research) the scenario needs.",
        },
        {
          id: "chinchilla-data-wall",
          title: "Chinchilla implies a looming data wall",
          description:
            "Hoffmann et al.'s 'Chinchilla' (2022) showed compute-optimal models need far more data than previously assumed. Extended forward, that scaling law collides with the finite stock of high-quality human text — a constraint straight-line compute extrapolations ignore.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Hoffmann et al., 'Chinchilla' (2022)",
          sourceUrl: "https://arxiv.org/abs/2203.15556",
          reasoning:
            "Peer-influential and directly implies an input ceiling; its bite depends on how well synthetic data and RL substitute, which is unresolved.",
        },
        {
          id: "reasoning-diminishing-returns",
          title: "ARC-AGI Remained Hard Despite Large Compute Budgets",
          description:
            "In the official 2024 ARC Prize competition, the private-set state of the art rose from 33% to 55.5%, but no entrant reached the 85% grand-prize threshold despite 1,430 teams and 17,789 submissions. The organizers also reported that systems using frontier models and roughly 1,000 times the competition compute budget tracked the constrained leaderboard surprisingly closely. This shows that at least one abstraction benchmark was not solved by scale alone; it does not establish a general law of diminishing returns per compute dollar.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          source: "ARC Prize 2024 winners and technical report",
          sourceUrl:
            "https://arcprize.org/blog/arc-prize-2024-winners-technical-report",
          reasoning:
            "The competition results are reproducible and directly reported by the benchmark organizer. Directness is capped because ARC-AGI is one disputed proxy for general reasoning, and comparing leaderboard compute does not isolate a causal compute-response curve.",
        },
      ],
    },
    {
      id: "takeoff-speed",
      title: "Takeoff Is Fast — Months, Not Decades",
      short_summary:
        "The central crux: whether crossing the automation threshold triggers an abrupt few-month explosion or a gradual, economically visible ramp over years.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Even granting a feedback loop, its output has to flow through the physical world: chips must be fabricated, data centers powered, models deployed, and results validated by slow experiments. Paul Christiano's 'slow takeoff' picture — a continuous, broadly distributed, years-long acceleration that shows up in GDP and markets before it shows up as a singleton — is the mainstream steelman, and it implies a far wider policy window than a 2027 cliff.",
      proponent_rebuttal:
        "Compute-centric takeoff models (Tom Davidson's framework for Open Philanthropy) suggest that once AI automates a large share of AI R&D, the transition from roughly-human to strongly-superhuman research capability can be startlingly fast — potentially under a year — because the software leg of the loop has no fab-construction latency. Narrow precedents already show AI improving the tools of its own field: systems have discovered faster matrix-multiplication and chip-design routines. The question isn't whether the loop exists but how much of it is software-limited versus hardware-limited.",
      crux: {
        id: "software-intelligence-explosion",
        title: "The Software-Intelligence-Explosion Test",
        description:
          "Measure the R&D acceleration factor: once AI automates a given fraction of research labor, how many months of prior human-paced algorithmic progress does the automated system compress into one calendar month? A factor near 1 means slow takeoff; a factor that climbs steeply as automation deepens means fast takeoff.",
        methodology:
          "Instrument a frontier lab's research pipeline to measure the marginal speedup from AI automation of successive research stages, holding hardware fixed to isolate the software leg. Fit the acceleration factor as a function of automation fraction and test whether it is sub-linear (slow) or super-linear (fast) near full automation.",
        equation:
          "\\text{Speedup}(f) = \\frac{1}{(1-f) + f/k}, \\quad k \\gg 1 \\Rightarrow \\text{fast takeoff}",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "Effectively only observable near the threshold; no clean pre-registration exists today",
      },
      evidence: [
        {
          id: "davidson-takeoff",
          title: "Compute-centric model implies a fast software takeoff",
          description:
            "Davidson's compute-centric takeoff framework (Open Philanthropy, 2023) models the automation of AI R&D and finds a plausible path where the transition through human-level research capability is compressed into months once the loop closes.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "Davidson, 'Compute-centric framework for takeoff speeds' (Open Philanthropy, 2023)",
          sourceUrl:
            "https://coefficientgiving.org/research/what-a-compute-centric-framework-says-about-takeoff-speeds/",
          reasoning:
            "A serious, explicit quantitative model aimed squarely at the crux; it is a model, not an observation, so replicability and independence are moderate.",
        },
        {
          id: "narrow-self-improvement",
          title: "AI already improves the tools of its own field",
          description:
            "DeepMind's AlphaTensor (Nature, 2022) discovered faster matrix-multiplication algorithms, and related systems optimize chip layouts and GPU kernels — concrete evidence that AI can accelerate parts of the compute-and-algorithms stack it runs on.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source: "Fawzi et al., 'AlphaTensor' (Nature, 2022)",
          sourceUrl: "https://www.nature.com/articles/s41586-022-05172-4",
          reasoning:
            "Peer-reviewed and real, but each case is narrow; extrapolating from point improvements to a general R&D explosion is the contested leap.",
        },
        {
          id: "christiano-slow-takeoff",
          title: "The slow-takeoff case: continuous and visible",
          description:
            "Christiano's influential 'Takeoff Speeds' argues that transformative AI's precursors will be economically valuable and widely deployed first, producing a smooth, years-long acceleration rather than a sudden discontinuity — the opposite of a 2027 cliff.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 8,
          },
          source: "Christiano, 'Takeoff Speeds' (2018)",
          sourceUrl: "https://ai-alignment.com/takeoff-speeds-2b705d7b8a31",
          reasoning:
            "The canonical, directly-on-point counter-model from within the same community; it is an argument rather than measured data, so replicability is low.",
        },
        {
          id: "deployment-ramp-lag",
          title: "Physical deployment imposes a hard ramp",
          description:
            "Turning a superhuman model into world-changing capability requires fabs, power, robotics, and organizational adoption — supply chains that historically scale over years, damping any purely-cognitive explosion into a slower real-world ramp.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "Synthesis / inference — physical supply-chain constraints applied to takeoff",
          reasoning:
            "A robust constraint on physical impact; less binding on a purely software-mediated research explosion, which is the specific channel the scenario invokes.",
        },
      ],
    },
    {
      id: "race-dynamics",
      title: "Race Dynamics Prevent Slowing Down",
      short_summary:
        "The political premise: US–China and inter-lab competition remove any brake, so even a recognized risk doesn't halt the acceleration.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Races can be slowed. Nuclear and biological weapons show that even bitter rivals reach verification-backed restraint under existential stakes; export controls are already throttling a Chinese frontier buildout; and a serious safety incident, liability regime, or public backlash could trigger a pause or hard regulation well before 2027. Assuming no coordination is a choice, not a law of nature.",
      proponent_rebuttal:
        "The structural incentives point the other way. As argued in Aschenbrenner's 'Situational Awareness,' a perceived national-security race makes unilateral slowdown look like surrender, and the capital is already committed — frontier labs and states are racing to build $100B-class compute clusters. Arms-control analogies break because AI progress is far harder to verify than fissile material and the commercial upside is enormous, so the default is to race, not to pause.",
      crux: {
        id: "coordination-vs-race",
        title: "The Observable-Racing Indicators",
        description:
          "Rather than argue about intentions, track whether the leading actors behave like racers or coordinators: the ratio of safety-to-capability spending, compliance with (or defection from) any compute or evaluation agreements, and whether frontier compute buildout accelerates or pauses after major capability jumps.",
        methodology:
          "Compile disclosed capex and headcount for capability vs. safety at frontier labs, monitor government compute/export actions and any international agreements, and test whether observed behavior tracks the 'race' prediction (spending accelerates, safety share shrinks) or the 'coordinate' prediction after each capability milestone.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$0 to monitor disclosures, but resolves only as the geopolitical situation unfolds",
      },
      evidence: [
        {
          id: "situational-awareness",
          title: "A national-security framing makes slowdown untenable",
          description:
            "Aschenbrenner's 'Situational Awareness' (2024) argues that once frontier AI is seen as decisive for national power, the US and China each face overwhelming pressure to race, foreclosing coordinated deceleration.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 4,
            directness: 7,
          },
          source: "Aschenbrenner, 'Situational Awareness: The Decade Ahead' (2024)",
          sourceUrl: "https://situational-awareness.ai/",
          reasoning:
            "Directly on the race dynamic and widely read, but a partisan essay by a former frontier-lab researcher, not independent analysis — hence low reliability/independence weights.",
        },
        {
          id: "compute-capex-race",
          title: "Committed capital is already racing",
          description:
            "Frontier labs and their backers have announced compute and data-center commitments on the scale of tens to hundreds of billions of dollars, revealing behavior consistent with an all-out race rather than cautious throttling.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Public capex announcements; Epoch AI compute tracking",
          sourceUrl: "https://epoch.ai/trends",
          reasoning:
            "The spending is real and public; reading it as an irreversible commitment to racing is an inference rather than a certainty.",
        },
        {
          id: "arms-control-precedent",
          title: "Rivals have coordinated under existential stakes before",
          description:
            "Nuclear test bans, the Biological Weapons Convention, and Cold War arms control show that even adversaries can negotiate restraint when the downside is catastrophic — a precedent for AI slowdown that the no-coordination assumption dismisses.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "UN Biological Weapons Convention treaty record",
          sourceUrl:
            "https://treaties.un.org/Pages/showDetails.aspx?objid=0800000280101653",
          reasoning:
            "A genuine historical counterexample; its force is blunted by how much harder AI capability is to verify than nuclear material.",
        },
        {
          id: "export-controls-brake",
          title: "Export controls are already throttling the frontier race",
          description:
            "US restrictions on advanced-chip and equipment exports to China demonstrate that states can and do impose real friction on a rival's compute buildout — a partial brake the pure-race model treats as absent.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source: "U.S. Bureau of Industry and Security advanced-computing controls",
          sourceUrl:
            "https://www.bis.gov/press-release/commerce-implements-new-export-controls-advanced-computing-semiconductor-manufacturing-items-peoples",
          reasoning:
            "Concrete policy evidence that the race is steerable; whether it slows the overall timeline or merely concentrates it in one country is ambiguous.",
        },
      ],
    },
    {
      id: "forecaster-calibration",
      title: "Are Aggressive AI Timelines Systematically Wrong?",
      short_summary:
        "The meta-crux: whether short-timeline forecasting is a track record to trust or a bias to discount — and how much the AI 2027 authors' own stated uncertainty should widen the error bars.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "AI has a long history of confident, wrong, soon-timelines — the 1970s and 1980s winters followed exactly this pattern. Saturating a benchmark is not the same as general capability: models can ace an exam suite while failing at open-ended, long-horizon, real-world research. And the AI 2027 authors themselves flag deep uncertainty, with some giving a median later than 2027 and 2027 as an aggressive mode. Treating a vivid scenario as a point forecast overweights it.",
      proponent_rebuttal:
        "The relevant recent base rate cuts the other way: expert and forecaster predictions have been too conservative, repeatedly surprised by GPT-scale jumps, and aggregated researcher surveys shortened their timelines sharply between 2022 and 2023. One of the authors, Daniel Kokotajlo, published 'What 2026 Looks Like' in 2021, and its qualitative trajectory has held up unusually well — evidence that this particular forecasting method is better-calibrated than the generic 'AI is overhyped' prior assumes.",
      crux: {
        id: "forecast-calibration-scorecard",
        title: "The Milestone Calibration Scorecard",
        description:
          "Turn the debate into a resolvable bet: extract the AI 2027 scenario's datable, checkable milestones (capability thresholds, automation fractions, compute levels) and score them against reality as each date passes. A running Brier-style scorecard reveals whether this forecasting method is well-calibrated or systematically early.",
        methodology:
          "Pre-register the scenario's concrete milestones with resolution dates and criteria, then compare against the METR task-horizon series, benchmark results, and observed lab behavior at each checkpoint. Aggregate hits and misses into a calibration score, and update the timeline distribution accordingly rather than treating 2027 as fixed.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0, but resolves only with the passage of time",
      },
      evidence: [
        {
          id: "kokotajlo-2021-track-record",
          title: "Kokotajlo's 2021 forecast has aged unusually well",
          description:
            "Daniel Kokotajlo's 'What 2026 Looks Like' (2021) laid out a year-by-year AI trajectory that anticipated much of the subsequent scaling-and-chatbot era — a concrete track record suggesting this forecasting approach is better calibrated than the 'always too soon' stereotype.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source: "Kokotajlo, 'What 2026 Looks Like' (2021)",
          sourceUrl:
            "https://www.lesswrong.com/posts/6Xgy6CAf2jqHhynHL/what-2026-looks-like",
          reasoning:
            "A real and notably prescient prior forecast, but a single author's single case; it argues for method credibility, not proof of the 2027 date.",
        },
        {
          id: "surveys-shortening",
          title: "Aggregated expert timelines shortened sharply",
          description:
            "The large 'Thousands of AI Authors on the Future of AI' survey (AI Impacts, 2023) found ML researchers' expected dates for many milestones moved substantially earlier versus the prior year's survey — evidence that the expert consensus has been correcting toward, not away from, short timelines.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Grace et al., AI Impacts expert survey (2023)",
          sourceUrl: "https://arxiv.org/abs/2401.02843",
          reasoning:
            "Large, independent survey; expert aggregate timelines are historically noisy, and shortening is a directional signal rather than a validated prediction.",
        },
        {
          id: "ai-winter-history",
          title: "Confident short timelines have failed before",
          description:
            "The AI winters of the 1970s and late 1980s each followed a stretch of assured, imminent-breakthrough forecasting. The outside view on 'AI is about to transform everything soon' has a poor historical record.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 8,
            replicability: 5,
            directness: 5,
          },
          source: "Synthesis / inference — historical base-rate comparison across AI winters",
          reasoning:
            "A well-documented base rate that legitimately widens the error bars; critics note the current scaling regime differs structurally from the symbolic-AI eras that busted.",
        },
        {
          id: "benchmark-saturation-gap",
          title: "Benchmark saturation is not general capability",
          description:
            "Models can saturate exam-style benchmarks while still failing open-ended, long-horizon, real-world tasks — as abstraction-and-reasoning challenges (ARC-AGI) were designed to expose. Rapid benchmark progress can therefore overstate progress toward autonomous research.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Chollet, 'On the Measure of Intelligence' (2019)",
          sourceUrl: "https://arxiv.org/abs/1911.01547",
          reasoning:
            "Directly warns against the exact inference the timeline leans on; whether current agentic gains close this gap is itself contested.",
        },
      ],
    },
  ],
};
