import type { Topic } from "@/lib/schemas/topic";

export const tiktokBrainRotData = {
  id: "tiktok-brain-rot",
  title: "Is Short-Form Video Causing Cognitive Decline?",
  meta_claim:
    "Habitual consumption of short-form video content (TikTok, Reels, Shorts) is measurably degrading attention spans, reading comprehension, and deep thinking capacity.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Attention Span Research
    // =========================================================================
    {
      id: "attention-span-research",
      title: "Attention Span Research",
      short_summary:
        "Claims that the average human attention span has dropped below that of a goldfish are widely cited but poorly sourced. Neuroscience research shows attention is context-dependent rather than a fixed trait, and the evidence for a secular decline is more nuanced than headlines suggest. However, multiple studies do find that heavy short-form video users exhibit reduced sustained attention on laboratory tasks.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The 'declining attention span' narrative is largely a moral panic. The oft-cited statistic that human attention spans dropped from 12 seconds to 8 seconds (below a goldfish) traces back to a 2015 Microsoft Canada report that cited no peer-reviewed source for the claim. Attention is not a single measurable quantity — it varies by context, motivation, and task type. People binge 3-hour podcasts and 10-episode TV series while supposedly having 8-second attention spans. What's actually changing is voluntary allocation of attention in low-stakes browsing contexts, not underlying cognitive capacity. Humans have always skimmed, channel-surfed, and sought novelty — short-form video is just the latest medium.",
      proponent_rebuttal:
        "While the 'goldfish' statistic is indeed bogus, the underlying concern has legitimate empirical support. A 2019 study in Nature Communications by Lorenz-Spreen et al. analyzed Twitter, Google, Reddit, and movie ticket data and found that collective attention spans for cultural topics have measurably shortened over decades — topics trend faster and fade faster. At the individual level, a 2023 study published in Nature by Xu et al. using fMRI found that heavy TikTok users showed reduced activity in brain regions associated with sustained attention and cognitive control compared to non-users. A 2022 study in Computers in Human Behavior found that participants who watched short-form videos for just one hour showed significantly reduced performance on subsequent sustained attention tasks compared to controls. The distinction between 'voluntary allocation' and 'capacity' blurs when habitual content consumption patterns reshape default neural responses to stimuli requiring extended focus.",
      crux: {
        id: "sustained-attention-task-performance",
        title: "The Sustained Attention Task Performance Test",
        description:
          "Measure whether habitual short-form video consumers show measurably reduced sustained attention compared to matched controls using validated cognitive tasks.",
        methodology:
          "Recruit a large sample (N > 1,000) stratified by daily short-form video consumption (0-30 min, 30-120 min, 120+ min). Control for age, education, sleep, and pre-existing ADHD. Administer the Sustained Attention to Response Task (SART) and the Continuous Performance Test (CPT). Measure d-prime (signal detection sensitivity), reaction time variability, and commission errors across groups. Include a longitudinal arm (6-month follow-up) to assess directionality.",
        equation:
          "d' = z(\\text{Hit Rate}) - z(\\text{False Alarm Rate})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (large-sample longitudinal cognitive testing with neuroimaging)",
      },
      evidence: [
        {
          id: "lorenz-spreen-collective-attention",
          title: "Collective Attention Spans Shortening Across Media",
          description:
            "Lorenz-Spreen et al. (2019) in Nature Communications found that the rate at which topics rise and fall in public attention has accelerated across Twitter, Google Books, movie tickets, and Reddit over decades, suggesting a systemic shortening of collective attention.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Lorenz-Spreen et al., Nature Communications (2019)",
          reasoning:
            "Peer-reviewed, multi-platform analysis, but measures collective cultural attention rather than individual cognitive capacity directly.",
        },
        {
          id: "xu-fmri-tiktok-users",
          title: "fMRI Shows Reduced Attention-Related Brain Activity in Heavy Users",
          description:
            "Xu et al. (2023) found that heavy short-form video users showed reduced activation in dorsolateral prefrontal cortex and anterior cingulate cortex during sustained attention tasks, suggesting neural adaptation to rapid-switching content.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Xu et al., Nature (2023)",
          reasoning:
            "Neuroimaging evidence is compelling but cross-sectional — cannot establish whether TikTok caused the difference or if individuals with lower sustained attention gravitate toward short-form video.",
        },
        {
          id: "attention-context-dependent",
          title: "Attention Is Context-Dependent, Not a Fixed Trait",
          description:
            "Cognitive psychology research consistently shows that attention varies by task motivation, reward structure, and context. People who scroll TikTok for hours demonstrate sustained engagement — what changes is the threshold for voluntary attention allocation to low-stimulation tasks.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          reasoning:
            "Well-established cognitive science, but doesn't address whether habitual high-stimulation consumption raises the threshold for engaging with lower-stimulation material.",
        },
        {
          id: "goldfish-myth-debunked",
          title: "The '8-Second Attention Span' Statistic Is Fabricated",
          description:
            "The widely cited claim that human attention spans dropped to 8 seconds (below a goldfish) originated from a Microsoft Canada marketing report that cited no peer-reviewed source. The BBC and multiple fact-checkers traced it to no credible origin.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 5,
          },
          reasoning:
            "Debunks a specific popular claim, but does not address the broader body of research on attention and media consumption patterns.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 2: Dopamine and Addiction Mechanisms
    // =========================================================================
    {
      id: "dopamine-addiction-mechanisms",
      title: "Dopamine and Addiction Mechanisms",
      short_summary:
        "Short-form video platforms use algorithmic recommendation, variable reward schedules, and infinite scroll to maximize engagement. Critics argue these features exploit dopaminergic reward circuits in ways analogous to slot machines. Defenders counter that 'dopamine hijacking' is pop neuroscience oversimplification and that most users self-regulate without pathological consequences.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The 'dopamine hijacking' narrative is reductive pop neuroscience. Dopamine is involved in virtually all motivated behavior — eating, exercising, learning, socializing. Saying TikTok 'hijacks dopamine' is like saying food hijacks dopamine. The comparison to slot machines ignores that short-form video provides genuine entertainment, education, and social connection. Most users spend 30-60 minutes per day and self-regulate fine. Problematic use patterns affect a minority, just as with any pleasurable activity. The 'addiction' framing pathologizes normal media consumption and borrows clinical language inappropriately — the DSM-5 does not recognize social media addiction as a disorder.",
      proponent_rebuttal:
        "The concern isn't that dopamine is involved — it's that variable-ratio reinforcement schedules are specifically optimized to maximize compulsive engagement. Platforms A/B test every element of the user experience against engagement metrics, creating feedback loops that B.F. Skinner would recognize. Internal documents from TikTok (leaked in litigation) reveal that engineers explicitly model 'loss of autonomy' as a user state and optimize for session duration. A 2022 study by Montag et al. found that short-form video use activated striatal regions in patterns more similar to gambling than to passive entertainment viewing. While most users self-regulate, the platforms are architecturally designed to make self-regulation harder — autoplay, removal of stopping cues, and personalized content feeds eliminate natural 'break points.' The fact that the DSM-5 hasn't added a diagnosis doesn't invalidate the mechanism — gaming disorder was only recognized in ICD-11 in 2018 after decades of similar dismissals.",
      crux: {
        id: "variable-reward-compulsion-test",
        title: "The Variable Reward Compulsion Test",
        description:
          "Determine whether algorithmic short-form video feeds produce compulsive use patterns distinguishable from normal entertainment engagement, using behavioral and neuroimaging measures.",
        methodology:
          "Randomly assign participants to three conditions: (1) algorithmic TikTok-style feed with infinite scroll and autoplay, (2) same content but with chronological ordering, visible progress indicators, and no autoplay, (3) long-form video control. Measure session duration vs. intended duration (loss of control), craving ratings during abstinence periods, and striatal activation patterns via fMRI. Compare compulsive use indicators across conditions to isolate the effect of algorithmic design features from content itself.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$800K (randomized controlled trial with fMRI component)",
      },
      evidence: [
        {
          id: "variable-ratio-reinforcement",
          title: "Algorithmic Feeds Use Variable-Ratio Reinforcement",
          description:
            "Short-form video algorithms deliver unpredictable reward — some videos are highly engaging, others are not — creating variable-ratio reinforcement schedules known to produce the most persistent behavioral patterns in operant conditioning research.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Montag et al., Addictive Behaviors (2022)",
          reasoning:
            "The mechanism is well-established in behavioral psychology. Application to algorithmic feeds is logically sound though direct evidence of identical neural pathways is still emerging.",
        },
        {
          id: "tiktok-internal-documents",
          title: "Internal Documents Show Platforms Optimize for Compulsive Use",
          description:
            "Documents revealed in US litigation show TikTok internally tracked 'time spent beyond intended' and 'loss of autonomy' metrics. Engineers modeled and optimized for increased session duration, including features specifically designed to reduce user ability to disengage.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 9,
          },
          source: "State of Utah v. TikTok (2023), leaked internal documents",
          reasoning:
            "Direct evidence of intent, but documents are selectively disclosed through litigation and may not represent full internal picture.",
        },
        {
          id: "striatal-activation-gambling",
          title: "Short-Form Video Activates Reward Circuits Similarly to Gambling",
          description:
            "Montag et al. (2022) found that short-form video scrolling activated ventral striatum in patterns more similar to gambling tasks than to passive entertainment, suggesting reward prediction error processing.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source: "Montag et al., Addictive Behaviors (2022)",
          reasoning:
            "Neuroimaging evidence is suggestive but small sample sizes and reverse inference limitations apply.",
        },
        {
          id: "most-users-self-regulate",
          title: "Majority of Users Self-Regulate Without Pathological Consequences",
          description:
            "Survey data consistently shows that while a minority of users report feeling addicted, 70-80% of short-form video users report moderate use patterns and the ability to stop when they choose. Pew Research (2023) found median daily TikTok use among US adults was 38 minutes.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Pew Research Center (2023)",
          reasoning:
            "Self-report data on media use is notoriously unreliable (people underestimate screen time by 50%+), but the general finding that most users don't meet clinical thresholds for addiction is likely accurate.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 3: Educational Outcomes
    // =========================================================================
    {
      id: "educational-outcomes",
      title: "Educational Outcomes",
      short_summary:
        "International standardized test scores in reading and math have declined in many countries since 2012, coinciding with smartphone and social media adoption among youth. Several studies link heavy short-form video consumption to worse academic performance. However, establishing causation is difficult — the same period saw COVID disruptions, rising inequality, and many other confounding factors.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Declining test scores are real but attributing them to TikTok is a classic post hoc fallacy. PISA scores began declining around 2012 — before TikTok existed (launched 2016 internationally). The sharpest drops occurred during and after COVID-19, when school closures, social isolation, and economic stress disrupted learning worldwide. Countries with the heaviest TikTok usage (like the US) don't consistently show the worst declines — many factors including educational policy, inequality, and pandemic response explain far more variance. Furthermore, studies showing negative associations between social media use and grades suffer from self-selection: students already struggling academically may turn to short-form video as a coping mechanism rather than it causing their poor performance.",
      proponent_rebuttal:
        "While no serious researcher attributes all academic decline to TikTok specifically, the convergent evidence is concerning. A 2023 meta-analysis by Hancock et al. covering 72 studies found a consistent negative association (r = -0.15 to -0.20) between social media use and academic performance, with effect sizes increasing for passive consumption (scrolling) versus active creation. A natural experiment in Belgium (Baert et al., 2020) found that students who gained smartphone access showed immediate GPA declines. China's own 2021 policy limiting minors' access to Douyin (Chinese TikTok) to 40 minutes per day was based on internal research showing dose-dependent effects on homework completion and reading comprehension. The reading comprehension decline is particularly striking: PISA 2022 showed the largest single-period drop in reading scores ever recorded across OECD countries, with the sharpest declines among students who reported the highest social media use. The COVID confound is real, but the trend predates the pandemic and has not recovered despite schools fully reopening.",
      crux: {
        id: "natural-experiment-restriction",
        title: "The Natural Experiment Restriction Test",
        description:
          "Use natural experiments — policy changes, platform bans, or access restrictions — to measure whether reducing short-form video consumption improves academic outcomes in a causally identifiable way.",
        methodology:
          "Identify jurisdictions implementing short-form video restrictions for minors (e.g., China's Douyin time limits, Australia's proposed social media age restrictions). Collect standardized test scores, reading comprehension metrics, and homework completion rates before and after implementation. Use difference-in-differences design comparing restricted jurisdictions to unrestricted controls, controlling for COVID recovery, economic conditions, and educational policy changes. Supplement with screen time tracking data from consenting families.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1.5M (multi-jurisdiction longitudinal quasi-experiment)",
      },
      evidence: [
        {
          id: "pisa-reading-decline",
          title: "Largest-Ever Drop in PISA Reading Scores (2022)",
          description:
            "PISA 2022 results showed the largest single-period decline in reading scores ever recorded across OECD countries — a 10-point average drop, with students reporting heavy social media use showing significantly steeper declines than peers.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "OECD PISA 2022 Report",
          reasoning:
            "High-quality international data, but correlation with social media use doesn't isolate short-form video specifically, and COVID disruption is a major confound.",
        },
        {
          id: "hancock-meta-analysis",
          title: "Meta-Analysis Shows Consistent Negative Association",
          description:
            "Hancock et al. (2023) meta-analysis of 72 studies found a consistent negative association (r = -0.15 to -0.20) between social media use and academic performance, with passive consumption showing larger effects than active use.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Hancock et al., Educational Psychology Review (2023)",
          reasoning:
            "Large meta-analytic sample, but most included studies are cross-sectional, limiting causal inference.",
        },
        {
          id: "china-douyin-restrictions",
          title: "China's Douyin Restrictions Based on Internal Dose-Response Data",
          description:
            "China imposed 40-minute daily limits on Douyin for minors in 2021, citing internal research showing dose-dependent negative effects on homework completion and reading comprehension.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 7,
          },
          reasoning:
            "The internal research has not been independently published or peer-reviewed. China's regulatory decisions are politically motivated and not transparent. However, the specificity of the dose-response claim suggests real data exists.",
        },
        {
          id: "covid-confound",
          title: "COVID-19 Disruption Explains Most Academic Decline",
          description:
            "The sharpest academic declines coincide with COVID-19 school closures (2020-2022), which caused an estimated 1-2 years of learning loss. Countries with longer school closures showed proportionally larger declines regardless of social media penetration.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "World Bank, UNESCO, OECD learning loss estimates",
          reasoning:
            "Strong evidence that COVID is the dominant confound in recent academic data. However, pre-pandemic trends and post-reopening non-recovery suggest additional factors.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Accelerating Dynamics of Collective Attention -- Lorenz-Spreen et al., Nature Communications (2019)",
      url: "https://www.nature.com/articles/s41467-019-09311-w",
    },
    {
      title:
        "OECD PISA 2022 Results: The State of Learning and Equity in Education",
      url: "https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html",
    },
    {
      title:
        "Short Video Addiction and Attention: The Role of Dopamine -- Montag et al., Addictive Behaviors (2022)",
      url: "https://www.sciencedirect.com/journal/addictive-behaviors",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is there a meaningful difference between short-form and long-form media effects?",
      content:
        "Every generation has worried about new media destroying cognition — novels, radio, TV, video games, and now short-form video. Is there something genuinely different about 15-60 second algorithmically served content compared to previous media formats, or is this another cycle of moral panic? The key differentiators may be algorithmic personalization, infinite scroll, and variable-ratio reward schedules, which were absent from earlier media — but how much do these design features actually matter compared to the content itself?",
    },
    {
      id: "q2",
      title: "Can platform design changes mitigate harm without banning content?",
      content:
        "If the problem is primarily architectural (infinite scroll, autoplay, algorithmic optimization for engagement over well-being), could design mandates — such as requiring stopping cues, limiting session lengths, or banning algorithmic recommendation for minors — preserve the benefits of short-form video while reducing cognitive harms? China's Douyin already implements time limits for minors, and the EU's Digital Services Act requires transparency in recommendation algorithms. Early evidence from these interventions could clarify whether the medium or the design is the core problem.",
    },
    {
      id: "q3",
      title: "Are some populations more vulnerable than others?",
      content:
        "Developing brains (under 25) may be more susceptible to the effects of rapid-switching content on attention and reward circuits than mature adult brains. Children under 13 and adolescents 13-17 show stronger associations between social media use and attentional problems in most studies. If the effects are age-dependent, age-gated restrictions might be justified even if the evidence for harm to adults is weak. But defining precise thresholds requires understanding the dose-response relationship — is 30 minutes benign while 3 hours is harmful, or is any habitual exposure problematic during critical developmental windows?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
