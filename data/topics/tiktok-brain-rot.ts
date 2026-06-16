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
        "While the 'goldfish' statistic is indeed bogus, the underlying concern has legitimate empirical support. A 2019 study in Nature Communications by Lorenz-Spreen et al. analyzed Twitter, Google Books, Reddit, and movie-ticket data and found that the rate at which cultural topics rise and fade has measurably accelerated over decades — collective attention cycles faster, which the authors attribute to ever-increasing content production competing for finite attention. At the individual level, an fMRI study by Su et al. (2023, medRxiv preprint) found that watching preferred short videos deactivated cognitive-control regions (dorsolateral prefrontal cortex, dorsal anterior cingulate cortex, anterior insula, pre-supplementary motor area) while activating the amygdala, with self-control trait scores correlating with activity in those control regions but not the amygdala. And a growing set of laboratory studies using the Sustained Attention to Response Task report that heavier short-form video consumption is associated with more commission errors and greater reaction-time variability — markers of degraded sustained attention — though these designs are largely correlational and cannot by themselves establish that short video is the cause. The distinction between 'voluntary allocation' and 'capacity' blurs when habitual content consumption patterns reshape default neural responses to stimuli requiring extended focus.",
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
          sourceUrl: "https://www.nature.com/articles/s41467-019-09311-w",
          reasoning:
            "Peer-reviewed, multi-platform analysis (Nat Commun 10:1759), but measures collective cultural attention dynamics rather than individual cognitive capacity directly.",
        },
        {
          id: "xu-fmri-tiktok-users",
          title: "fMRI Shows Suppressed Prefrontal Control Activity During Short-Video Viewing",
          description:
            "Su et al. (2023), in an fMRI study of short-video viewing, found that watching preferred short videos deactivated cognitive-control regions — the dorsolateral prefrontal cortex (dlPFC), dorsal anterior cingulate cortex (dACC), anterior insula, and pre-supplementary motor area — while activating the amygdala, with stronger suppression in individuals lower in trait self-control. This suggests short-form content can downregulate the brain's self-control system during viewing.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "Su, Teng, Zhou, Geng & Hu, medRxiv preprint (2023)",
          sourceUrl: "https://doi.org/10.1101/2023.10.30.23296738",
          reasoning:
            "Neuroimaging evidence is suggestive but limited: this is a non-peer-reviewed preprint with a cross-sectional design, and it measures neural activity during viewing rather than a lasting deficit. It cannot establish whether short-form video causes reduced self-control or whether individuals with lower self-control gravitate toward such content. Earlier claims of a Nature (2023) study by 'Xu et al.' could not be verified and have been replaced with this real, correctly-attributed source.",
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
            "The widely cited claim that human attention spans dropped to 8 seconds (below a goldfish) appeared in a 2015 Microsoft Canada Consumer Insights report, but the figure was sourced to the website Statistic Brain rather than original research. BBC journalist Simon Maybin traced it back and found no credible study behind the number (and that goldfish are in fact used as a model for studying learning and memory).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "Maybin, 'Busting the attention span myth', BBC News (2017)",
          sourceUrl: "https://www.bbc.com/news/health-38896790",
          reasoning:
            "Well-documented debunking of a specific viral statistic (traced to Statistic Brain, not Microsoft's own research), but it does not address the broader body of research on attention and media consumption patterns.",
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
        "The concern isn't that dopamine is involved — it's that variable-ratio reinforcement schedules are specifically optimized to maximize compulsive engagement. Platforms A/B test every element of the user experience against engagement metrics, creating feedback loops that B.F. Skinner would recognize. Internal TikTok documents quoted in the October 2024 multistate attorneys-general lawsuits indicate the company tracked compulsive-use metrics and was aware its algorithm could hook users quickly and optimize for session duration — though these are adversarial litigation excerpts that TikTok disputes. On the neuroscience, an fMRI study by Su et al. (2021, NeuroImage) found that personalized, algorithmically recommended TikTok clips produced higher activation in the ventral tegmental area, a core dopaminergic reward hub, than generalized clips, with more problematic-use symptoms linked to lower self-control; notably, that study did not directly compare short video to a gambling task, so the popular 'just like a slot machine' framing remains an analogy rather than a measured equivalence. While most users self-regulate, the platforms are architecturally designed to make self-regulation harder — autoplay, removal of stopping cues, and personalized feeds eliminate natural 'break points.' And the fact that the DSM-5 hasn't added a diagnosis doesn't settle the question — gaming disorder was likewise long dismissed before being included in the WHO's ICD-11 (released 2018, formally adopted in 2019).",
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
            sourceReliability: 6,
            independence: 6,
            replicability: 8,
            directness: 5,
          },
          source:
            "Variable-ratio reinforcement (operant conditioning, Ferster & Skinner) applied to algorithmic feeds",
          reasoning:
            "Variable-ratio reinforcement is well-established in behavioral psychology, and applying it to algorithmic feeds is logically sound — but this is a conceptual/mechanistic argument, not a measured finding from a specific short-video study. A previously listed 'Montag et al., Addictive Behaviors (2022)' citation for this item could not be verified and was removed; no specific empirical source is asserted here.",
        },
        {
          id: "tiktok-internal-documents",
          title: "Internal Documents Show Platforms Optimize for Compulsive Use",
          description:
            "Internal TikTok documents quoted in the October 2024 multistate attorneys-general lawsuits (14 states plus DC) — portions of which became public when redactions in Kentucky's complaint were penetrated and reported by NPR — indicate the company tracked metrics related to compulsive use and 'filter bubbles' and was aware its algorithm could hook users quickly. Plaintiffs allege the platform optimized for session duration over user well-being.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 8,
          },
          source:
            "Multistate AG lawsuits v. TikTok (Oct 2024); internal documents reported by NPR",
          sourceUrl:
            "https://www.npr.org/2024/10/11/nx-s1-5150088/the-biggest-findings-from-uncensored-tiktok-lawsuit-documents",
          reasoning:
            "Direct evidence of internal awareness, but the quotes are adversarial litigation excerpts (selectively disclosed by plaintiffs, some via a redaction error) and TikTok disputes the characterizations; they may not represent the full internal context. The earlier 'State of Utah v. TikTok (2023)' attribution was corrected — the widely-reported un-redacted document trove came from the Oct 2024 multistate coalition.",
        },
        {
          id: "striatal-activation-gambling",
          title: "Personalized Short-Form Video Engages Reward/Dopamine Circuitry",
          description:
            "An fMRI study by Su et al. (2021) found that viewing personalized, algorithmically recommended TikTok clips (vs. generalized clips) produced higher activation in the ventral tegmental area (VTA) — a core dopaminergic reward hub — and the default mode network, and that more problematic-use symptoms were associated with lower self-control. This links personalized short-form content to engagement of reward circuitry, though the study did not directly compare it to gambling tasks.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source:
            "Su, Zhou, Gong, Teng, Geng & Hu, NeuroImage (2021), 237:118136",
          sourceUrl: "https://doi.org/10.1016/j.neuroimage.2021.118136",
          reasoning:
            "Peer-reviewed neuroimaging evidence that personalized short-form video engages dopaminergic reward circuitry (VTA/DMN), but the sample is small and reverse-inference limitations apply. The original claim attributed a ventral-striatum 'similar to gambling' finding to 'Montag et al., Addictive Behaviors (2022)', which could not be verified; it has been corrected to this real Su et al. (2021) study, whose actual finding (VTA activation, no gambling comparison) is narrower, so weights were de-inflated accordingly.",
        },
        {
          id: "most-users-self-regulate",
          title: "Majority of Users Self-Regulate Without Pathological Consequences",
          description:
            "Most short-form video users do not meet clinical thresholds for addiction. Validated estimates of problematic short-video use are modest — e.g., Su et al. (2021) estimated roughly 5.9% of TikTok users show significant problematic use — implying the large majority use the platform without pathological loss of control, even though average daily time on TikTok is substantial (industry trackers put it near an hour per day).",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Su et al., NeuroImage (2021) problematic-use estimate (~5.9%)",
          sourceUrl: "https://doi.org/10.1016/j.neuroimage.2021.118136",
          reasoning:
            "The general finding that most users don't meet clinical thresholds for addiction is well-supported, but self-report media-use data is unreliable (people underestimate screen time). A previously cited 'Pew Research Center (2023): median daily TikTok use among US adults was 38 minutes' could not be verified — Pew's 2023 data reports frequency of use, not a 38-minute median — so that specific statistic was removed and replaced with a verifiable problematic-use prevalence estimate.",
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
        "Declining test scores are real but attributing them to TikTok is a classic post hoc fallacy. PISA reading and math scores began trending down around 2012 — years before TikTok existed (Douyin launched in China in September 2016, TikTok launched internationally in September 2017, and it only reached mass Western scale after the musical.ly merger in August 2018). The sharpest drops occurred during and after COVID-19, when school closures, social isolation, and economic stress disrupted learning worldwide. Countries with the heaviest TikTok usage (like the US) don't consistently show the worst declines — many factors including educational policy, inequality, and pandemic response explain far more variance. Furthermore, studies showing negative associations between social media use and grades suffer from self-selection: students already struggling academically may turn to short-form video as a coping mechanism rather than it causing their poor performance.",
      proponent_rebuttal:
        "While no serious researcher attributes all academic decline to TikTok specifically, the convergent evidence is at least suggestive. A meta-analysis by Marker, Gnambs & Appel (2018, Educational Psychology Review), pooling 59 independent samples (N = 29,337), found a small but reliable negative association between general social-networking-site use and academic achievement (r ≈ -0.07, 95% CI [-0.12, -0.02]); the association was stronger for media-multitasking while studying (r ≈ -0.10) and actually reversed to positive when social media was used for academic purposes. Two caveats matter for honesty: the overall effect is small, most of the underlying studies are cross-sectional, and the meta-analysis concerns general social media rather than short-form video specifically. Cross-sectional work attempting causal identification points the same direction — Baert et al. (2020, Kyklos), using instrumental-variable estimation on 696 first-year Belgian university students, estimated that a one-standard-deviation increase in overall smartphone use was associated with roughly a one-point drop (out of 20) in exam scores, though this is an observational design with an instrument rather than a true natural experiment. On the policy side, China restricted users under 14 on Douyin (Chinese TikTok) to 40 minutes per day in September 2021 amid official concern about minors' attention and study habits, but no underlying dose-response data on homework or reading comprehension has been independently published, so that policy should be read as a regulatory judgment, not verified evidence. The most robust data point is PISA 2022: reading fell about 10 points across OECD countries versus 2018 — roughly twice the size of any previous between-cycle change — and crucially the OECD notes scores in reading and science were already declining before the pandemic, so the COVID confound, while real, does not fully explain a trend that predates 2020 and has not recovered.",
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
            "PISA 2022 recorded an unprecedented decline in reading across OECD countries — mean reading fell 10 points versus 2018, roughly twice any previous between-cycle change. The OECD attributes the drop primarily to COVID-19 disruption layered on a pre-pandemic downward trend, and notes the decline is only partly attributable to the pandemic. PISA does not isolate short-form video as a cause.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 4,
          },
          source: "OECD, PISA 2022 Results (Volume I)",
          sourceUrl:
            "https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html",
          reasoning:
            "High-quality international data on a real, unprecedented reading decline, but PISA does not attribute it to social media or short-form video specifically, and COVID disruption plus pre-existing trends are the dominant explanations. The original claim that 'heavy social media users showed significantly steeper declines' was not substantiated in the PISA report and was removed; directness lowered accordingly.",
        },
        {
          id: "hancock-meta-analysis",
          title: "Meta-Analysis Shows a Small Negative Association",
          description:
            "A meta-analysis by Marker, Gnambs & Appel (2018) of 59 independent samples (N = 29,337) found only a small negative association between general social-networking-site use and academic achievement (r = -0.07, 95% CI [-0.12, -0.02]). The association was stronger for media multitasking while studying, and reversed (positive) when social media was used for academic purposes — indicating the effect depends heavily on how the platform is used.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Marker, Gnambs & Appel, Educational Psychology Review (2018), 30:651-677",
          sourceUrl: "https://doi.org/10.1007/s10648-017-9430-6",
          reasoning:
            "Large peer-reviewed meta-analysis, but the overall effect is small (r ≈ -0.07), studies are mostly cross-sectional, and it concerns general social media rather than short-form video specifically. The original 'Hancock et al. (2023), Educational Psychology Review, 72 studies, r = -0.15 to -0.20' citation could not be verified and appears to have been fabricated or conflated (Jeff Hancock's real meta-analysis concerns well-being, not academic performance); it was replaced with this real, correctly-attributed meta-analysis, and the overstated effect size was corrected.",
        },
        {
          id: "china-douyin-restrictions",
          title: "China's Douyin Restrictions Based on Internal Dose-Response Data",
          description:
            "In September 2021 Douyin (China's TikTok) restricted users under 14 to 40 minutes per day and blocked overnight access, as part of China's broader push against youth internet addiction following its revised Minor Protection Law. Chinese regulators and ByteDance framed this around concerns about minors' attention and study habits, though any underlying dose-response data on homework or reading comprehension has not been independently published.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 5,
          },
          source: "ByteDance/Douyin under-14 time limit, Sept 2021 (CNN reporting)",
          sourceUrl: "https://www.cnn.com/2021/09/20/tech/china-tiktok-douyin-usage-limit-intl-hnk",
          reasoning:
            "The policy itself (40-minute under-14 limit) is well-documented, but the specific 'internal dose-response research showing effects on homework and reading comprehension' is not publicly verifiable, and China's regulatory decisions are opaque and politically motivated. The earlier wording asserting that the limit 'cited internal research' on dose-dependent effects was softened to avoid implying a verified empirical basis; directness lowered.",
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
          source:
            "OECD PISA 2022 press release; World Bank/UNESCO/UNICEF COVID learning-loss estimates",
          sourceUrl:
            "https://www.oecd.org/en/about/news/press-releases/2023/12/decline-in-educational-performance-only-partly-attributable-to-the-covid-19-pandemic.html",
          reasoning:
            "Strong, well-documented evidence that COVID school closures drove large learning losses and are a dominant confound in recent academic data. Note the OECD itself states the PISA decline is 'only partly attributable' to the pandemic, since scores in reading and science were already falling beforehand — so pre-pandemic trends and post-reopening non-recovery point to additional factors.",
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
        "Active on Facebook and Failing at School? Meta-Analytic Findings on Online Social Networking and Academic Achievement -- Marker, Gnambs & Appel, Educational Psychology Review (2018)",
      url: "https://doi.org/10.1007/s10648-017-9430-6",
    },
    {
      title:
        "Smartphone Use and Academic Performance: Correlation or Causal Relationship? -- Baert et al., Kyklos (2020)",
      url: "https://onlinelibrary.wiley.com/doi/abs/10.1111/kykl.12214",
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
