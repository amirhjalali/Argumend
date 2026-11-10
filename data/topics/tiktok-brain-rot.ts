import type { TopicInput } from "@/lib/schemas/topic";

export const tiktokBrainRotData = {
  id: "tiktok-brain-rot",
  title: "Is Short-Form Video Causing Cognitive Decline?",
  question:
    "Is habitual short-form video degrading attention and deep thinking?",
  meta_claim:
    "Habitual consumption of short-form video content (TikTok, Reels, Shorts) is measurably degrading attention spans, reading comprehension, and deep thinking capacity.",
  status: "contested" as const,
  category: "science" as const,
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "PISA reading scores across OECD countries fell 10 points in 2022, twice the previous record drop, and the OECD says the pandemic explains only part of it, since reading had been falling for a decade. The widely shared claim that attention spans have shrunk to 8 seconds, below a goldfish's, has no study behind it. Both sides accept those facts. The fight is over how much of the decline, if any, short-form video causes.",
    confidence: 84,
    source:
      "OECD, PISA 2022 Results (Volume I); Maybin, BBC News (2017), on the 8-second figure",
    sourceUrl:
      "https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html",
  },
  simple_case: [
    "The answer bears on whether schools and parents should treat short-form video as a risk to restrict, or as entertainment to manage like any other.",
  ],
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
        question:
          "Do heavy short-form video users show weaker sustained attention than matched non-users?",
        description:
          "Measure whether habitual short-form video consumers show measurably reduced sustained attention compared to matched controls using validated cognitive tasks.",
        methodology:
          "Recruit a large sample (N > 1,000) stratified by daily short-form video consumption (0-30 min, 30-120 min, 120+ min). Control for age, education, sleep, and pre-existing ADHD. Administer the Sustained Attention to Response Task (SART) and the Continuous Performance Test (CPT). Measure d-prime (signal detection sensitivity), reaction time variability, and commission errors across groups. Include a longitudinal arm (6-month follow-up) to assess directionality.",
        equation:
          "d' = z(\\text{Hit Rate}) - z(\\text{False Alarm Rate})",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A sample of over 1,000 people grouped by daily short-form viewing, with age, education, sleep and ADHD controlled, scored on the SART and Continuous Performance Test for lapses and reaction-time variability.",
        },
        cost_to_verify: "$500K (large-sample longitudinal cognitive testing with neuroimaging)",
        falsification: {
          supporter_flip:
            "If a large sample stratified by daily use, controlled for age, education, sleep and ADHD, showed heavy short-form viewers doing no worse on the SART and CPT than light users, the claim of measurable attention damage would lose its individual-level footing.",
          skeptic_flip:
            "If new studies extended Lorenz-Spreen et al.'s finding of accelerating collective attention cycles, and individual SART tests kept linking heavier short-form viewing to more errors and erratic reaction times, the moral-panic reading would be hard to hold.",
          common_ground:
            "Both sides agree the '8-second, below a goldfish' statistic is bogus, and that the lab studies linking heavy use to weaker sustained attention are largely correlational.",
          live_disagreement:
            "Whether heavy viewers show a real drop in sustained-attention capacity, or only a shift in how they choose to spend attention in low-stakes browsing — a line the pro side argues habitual use blurs.",
        },
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
          id: "su-fmri-short-video-control",
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
            "Neuroimaging evidence is suggestive but limited: this is a non-peer-reviewed preprint with a final sample of 27 participants and a cross-sectional design, and it measures neural activity during viewing rather than a lasting deficit. It cannot establish whether short-form video causes reduced self-control or whether individuals with lower self-control gravitate toward such content. Earlier claims of a Nature (2023) study by 'Xu et al.' could not be verified and have been replaced with this real, correctly-attributed source.",
        },
        {
          id: "attention-context-dependent",
          title: "Attention Is Context-Dependent, Not a Fixed Trait",
          description:
            "Controlled visual-attention experiments find that monetary incentives can improve detection sensitivity and alter activity in attention-related brain regions, demonstrating that measured attention varies with motivation and task context. That undercuts treating a single 'attention span' as a fixed personal capacity, but it does not show whether habitual short-video use changes willingness to engage with low-stimulation tasks.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Engelmann et al., Frontiers in Human Neuroscience (2009)",
          sourceUrl: "https://doi.org/10.3389/neuro.09.004.2009",
          reasoning:
            "Well-established cognitive science, but doesn't address whether habitual high-stimulation consumption raises the threshold for engaging with lower-stimulation material.",
        },
        {
          id: "goldfish-myth-debunked",
          title: "The '8-Second Attention Span' Statistic Has No Study Behind It",
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
        "The concern isn't that dopamine is involved — it's that variable-ratio reinforcement schedules are specifically optimized to maximize compulsive engagement. Platforms A/B test every element of the user experience against engagement metrics, creating feedback loops that B.F. Skinner would recognize. Internal TikTok documents quoted in the October 2024 multistate attorneys-general lawsuits include, as NPR reported them, an internal study putting the point at which a user gets hooked at 260 videos and an executive calling the app's time-limit tools 'a good talking point' but 'not altogether effective' — though these are adversarial litigation excerpts that TikTok disputes. On the neuroscience, an fMRI study by Su et al. (2021, NeuroImage) found that personalized, algorithmically recommended TikTok clips produced higher activation in the ventral tegmental area, a core dopaminergic reward hub, than generalized clips, with more problematic-use symptoms linked to lower self-control; notably, that study did not directly compare short video to a gambling task, so the popular 'just like a slot machine' framing remains an analogy rather than a measured equivalence. While most users self-regulate, the platforms are architecturally designed to make self-regulation harder — autoplay, removal of stopping cues, and personalized feeds eliminate natural 'break points.' And the fact that the DSM-5 hasn't added a diagnosis doesn't settle the question — gaming disorder was likewise long dismissed before being included in the WHO's ICD-11 (released 2018, formally adopted in 2019).",
      crux: {
        id: "variable-reward-compulsion-test",
        title: "The Variable Reward Compulsion Test",
        question:
          "Do algorithmic video feeds produce compulsive use that differs from ordinary entertainment?",
        description:
          "Determine whether algorithmic short-form video feeds produce compulsive use patterns distinguishable from normal entertainment engagement, using behavioral and neuroimaging measures.",
        methodology:
          "Randomly assign participants to three conditions: (1) algorithmic TikTok-style feed with infinite scroll and autoplay, (2) same content but with chronological ordering, visible progress indicators, and no autoplay, (3) long-form video control. Measure session duration vs. intended duration (loss of control), craving ratings during abstinence periods, and striatal activation patterns via fMRI. Compare compulsive use indicators across conditions to isolate the effect of algorithmic design features from content itself.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A randomized trial comparing an infinite-scroll algorithmic feed, the same clips in chronological order without autoplay, and long-form video, measuring time spent past what people intended, craving during breaks and striatal activation.",
        },
        cost_to_verify: "$800K (randomized controlled trial with fMRI component)",
        falsification: {
          supporter_flip:
            "If participants randomly assigned to an algorithmic infinite-scroll feed showed no more loss of control, craving or striatal activation than those given the same content in chronological order without autoplay, the claim that feed design itself drives compulsive use would weaken.",
          skeptic_flip:
            "If replications of Su et al. (2021) found personalized clips activating reward circuitry more than generic ones, and the disputed TikTok documents in the 2024 attorneys-general suits were confirmed to show the company knew how quickly users get hooked, 'dopamine hijacking' would look like more than pop neuroscience.",
          common_ground:
            "Both sides agree most users self-regulate — Su et al. estimated that about 5.9% of TikTok users may have significant problematic use — and that the slot-machine comparison is an analogy, not a measured equivalence.",
          live_disagreement:
            "Whether variable rewards, autoplay and missing stopping cues make short-form feeds compulsive in a way ordinary entertainment is not, or whether 'addiction' pathologizes normal media use by a majority who manage fine.",
        },
      },
      evidence: [
        {
          id: "variable-ratio-reinforcement",
          title: "Social Media Behavior Follows Reward-Learning Rules in a Study of a Million Posts",
          description:
            "Lindström et al. (2021) fitted reinforcement-learning models to over one million posts from more than 4,000 people on several social media platforms and found that behavior 'conforms qualitatively and quantitatively to the principles of reward learning': users spaced their posts to maximize the average rate of likes they received. An online experiment (n = 176) that mimicked key features of social media confirmed that social rewards causally shaped behavior. The study tests posting for likes, not watching an algorithmic video feed, and it does not test variable-ratio schedules as such.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "Lindström et al., 'A computational reward learning account of social media engagement', Nature Communications 12:1311 (2021)",
          sourceUrl: "https://www.nature.com/articles/s41467-020-19607-x",
          reasoning:
            "Peer-reviewed evidence that the 'Skinner box' picture of social media has measurable support: what people do on these platforms tracks the rewards they get. It is weighted low on directness because it measures posting, not viewing, and does not compare an algorithmic feed with a chronological one. The step from reward learning to variable-ratio schedules in short-video feeds remains an inference.",
        },
        {
          id: "tiktok-internal-documents",
          title: "Internal TikTok Documents Quoted in State Lawsuits Describe How Quickly Users Get Hooked",
          description:
            "Thirteen states and the District of Columbia sued TikTok in October 2024, quoting internal company documents. The quotes were redacted, but Kentucky Public Radio recovered the text under the redactions in Kentucky's complaint and NPR reported it. According to that reporting, an internal study found that 260 videos are all it takes for a user to get hooked; the complaint quotes one executive calling the app's time-limit tools 'a good talking point' but 'not altogether effective', and an executive saying the app could take the place of 'sleep and eating and moving around the room and looking at someone in the eyes.' A TikTok spokesperson told NPR the complaint cherry-picked misleading quotes from outdated documents taken out of context.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 8,
          },
          source:
            "NPR, All Things Considered, 'The biggest findings from uncensored TikTok lawsuit documents' (Kerr & Goodman, 11 October 2024), on the multistate attorneys-general lawsuits against TikTok",
          sourceUrl:
            "https://www.npr.org/2024/10/11/nx-s1-5150088/the-biggest-findings-from-uncensored-tiktok-lawsuit-documents",
          reasoning:
            "Direct evidence of internal awareness, but the quotes are adversarial litigation excerpts (selectively disclosed by plaintiffs, some via a redaction error) and TikTok disputes the characterizations; they may not represent the full internal context. The earlier 'State of Utah v. TikTok (2023)' attribution was corrected — the widely-reported un-redacted document trove came from the Oct 2024 multistate coalition.",
        },
        {
          id: "personalized-video-reward-activation",
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
            "Most short-form video users do not meet thresholds for problematic use. From the questionnaire part of their study of young adults, Su et al. (2021) estimated that about 5.9% of TikTok users 'may have significant problematic use', which implies the large majority use the platform without pathological loss of control. The figure comes from self-reported symptoms, not clinical diagnosis.",
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
        {
          id: "habit-not-addiction-overestimate",
          title: "Heavy Scrolling Mostly Looks Like Habit, Not Addiction, on a Clinical Scale",
          description:
            "In a study published in Scientific Reports in November 2025, 18% of a national quota sample of 380 US Instagram users agreed at least somewhat that they were addicted to the app, but only 2% scored in the at-risk range of the Bergen addiction scale, while about half (49%) described their use as habitual. In a supplementary convenience sample of college TikTok users, 9% were at risk against 59% who believed they were. The authors (Anderson and Wood) conclude that frequent use 'largely builds habits to automatically activate, scroll, post, and react on social media', and a second experiment (N = 824) found that framing use as an addiction lowered people's sense of control over it.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Anderson & Wood, 'Overestimates of social media addiction are common but costly,' Scientific Reports 15 (27 November 2025)",
          sourceUrl: "https://www.nature.com/articles/s41598-025-27053-2",
          reasoning:
            "A peer-reviewed, preregistered measurement that separates habit from the clinical symptoms of addiction, and it bears on the skeptic's claim that 'addiction' over-pathologizes ordinary use. It is weighted moderately because the main sample is Instagram rather than a short-video feed, the TikTok figures come from a college convenience sample in the supplement, symptom scales are self-reported, and the study does not vary feed design, so it cannot say whether algorithmic feeds build stronger habits than other media.",
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
        "International standardized test scores in reading and science have declined in many countries since 2012, and math fell sharply in 2022, coinciding with smartphone and social media adoption among youth. Several studies link heavy short-form video consumption to worse academic performance. However, establishing causation is difficult — the same period saw COVID disruptions, rising inequality, and many other confounding factors.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Declining test scores are real but attributing them to TikTok is a classic post hoc fallacy. PISA reading and science scores began trending down around 2012 — years before TikTok existed (Douyin launched in China in September 2016, TikTok launched internationally in September 2017, and it only reached mass Western scale after the musical.ly merger in August 2018). The sharpest drops occurred during and after COVID-19, when school closures, social isolation, and economic stress disrupted learning worldwide. Countries with the heaviest TikTok usage (like the US) don't consistently show the worst declines — many factors including educational policy, inequality, and pandemic response explain far more variance. Furthermore, studies showing negative associations between social media use and grades suffer from self-selection: students already struggling academically may turn to short-form video as a coping mechanism rather than it causing their poor performance.",
      proponent_rebuttal:
        "While no serious researcher attributes all academic decline to TikTok specifically, the convergent evidence is at least suggestive. A meta-analysis by Marker, Gnambs & Appel (2018, Educational Psychology Review), pooling 59 independent samples (N = 29,337), found a small but reliable negative association between general social-networking-site use and academic achievement (r ≈ -0.07, 95% CI [-0.12, -0.02]); the association was stronger for media-multitasking while studying (r ≈ -0.10) and actually reversed to positive when social media was used for academic purposes. Two caveats matter for honesty: the overall effect is small, most of the underlying studies are cross-sectional, and the meta-analysis concerns general social media rather than short-form video specifically. Cross-sectional work attempting causal identification points the same direction — Baert et al. (2020, Kyklos), using instrumental-variable estimation on 696 first-year Belgian university students, estimated that a one-standard-deviation increase in overall smartphone use was associated with roughly a one-point drop (out of 20) in exam scores, though this is an observational design with an instrument rather than a true natural experiment. On the policy side, ByteDance limited real-name users under 14 on Douyin (Chinese TikTok) to 40 minutes per day in September 2021, under regulatory pressure to curb minors' time online, but no underlying dose-response data on homework or reading comprehension has been published, so that policy should be read as a precautionary judgment, not verified evidence. The most robust data point is PISA 2022: reading fell 10 points across OECD countries versus 2018 — twice the previous record drop — and crucially the OECD notes scores in reading and science were already declining before the pandemic, so the COVID confound, while real, does not fully explain a trend that predates 2020 and has not recovered.",
      crux: {
        id: "natural-experiment-restriction",
        title: "The Natural Experiment Restriction Test",
        question:
          "When short-form video use is restricted, do academic outcomes measurably improve?",
        description:
          "Use natural experiments — policy changes, platform bans, or access restrictions — to measure whether reducing short-form video consumption improves academic outcomes in a causally identifiable way.",
        methodology:
          "Identify jurisdictions implementing short-form video restrictions for minors (e.g., China's Douyin time limits, Australia's proposed social media age restrictions). Collect standardized test scores, reading comprehension metrics, and homework completion rates before and after implementation. Use difference-in-differences design comparing restricted jurisdictions to unrestricted controls, controlling for COVID recovery, economic conditions, and educational policy changes. Supplement with screen time tracking data from consenting families.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Difference-in-differences studies of limits such as China's Douyin time caps for minors, comparing test scores, reading comprehension and homework completion before and after against places without the limits.",
        },
        cost_to_verify: "$1.5M (multi-jurisdiction longitudinal quasi-experiment)",
        falsification: {
          supporter_flip:
            "If difference-in-differences studies of restrictions such as China's Douyin time limits for under-14s found no gain in test scores, reading comprehension or homework completion against unrestricted controls, the link between short-form video and academic decline would look like correlation, not cause.",
          skeptic_flip:
            "If reading scores kept falling in places with little COVID disruption, extending the pre-pandemic decline the OECD notes behind PISA 2022's roughly 10-point drop, COVID alone would no longer explain the academic slide.",
          common_ground:
            "Both sides agree PISA reading fell about 10 points in 2022, that COVID disruption explains part of it, and that the social-media link to grades (r ≈ -0.07) is small and mostly cross-sectional.",
          live_disagreement:
            "Whether short-form video contributes to a decline that began before TikTok and deepened with COVID, or is a coping outlet for students already struggling — which restriction natural experiments could test.",
        },
      },
      evidence: [
        {
          id: "pisa-reading-decline",
          title: "Largest-Ever Drop in PISA Reading Scores (2022)",
          description:
            "PISA 2022 recorded an unprecedented decline in reading across OECD countries: mean reading fell 10 points versus 2018, twice the previous record. The OECD says the decline is only partly attributable to the pandemic, because reading and science scores had already been falling for a decade. PISA does not isolate short-form video as a cause.",
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
            "High-quality international data on a real, unprecedented reading decline, but PISA does not attribute it to social media or short-form video specifically, and the OECD points to the pandemic plus a pre-existing downward trend. The original claim that 'heavy social media users showed significantly steeper declines' was not substantiated in the PISA report and was removed; directness lowered accordingly.",
        },
        {
          id: "marker-meta-analysis",
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
          title: "Douyin Caps Under-14s at 40 Minutes a Day, With No Published Evidence Behind the Limit",
          description:
            "In September 2021 ByteDance introduced a 'teenage mode' on Douyin, China's version of TikTok, that limits users under 14 who registered with their real names to 40 minutes a day and blocks the app between 10 p.m. and 6 a.m. The move followed China's June 2021 revision of its Minor Protection Law, which requires apps to offer time-management and content limits for minors; Citigroup analysts called it a 'proactive measure' to get ahead of regulation. No data on how the cap affects homework, reading or attention has been published, so it shows a company and its regulator judging the risk worth acting on, not a measured effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 5,
          },
          source: "CNN Business, 'The Chinese version of TikTok is limiting kids to 40 minutes a day' (20 September 2021)",
          sourceUrl: "https://www.cnn.com/2021/09/20/tech/china-tiktok-douyin-usage-limit-intl-hnk",
          reasoning:
            "The policy itself (a 40-minute limit for under-14s) is well documented, but CNN reports no research basis for the figure, and the company acted under regulatory pressure. It is evidence that a precautionary restriction exists, which is why independence and directness are low. Whether the restriction improved any outcome is what this crux asks, and it has not been measured.",
        },
        {
          id: "covid-confound",
          title: "COVID-Era Learning Deficits Were Substantial and Persistent in a 42-Study Meta-Analysis",
          description:
            "A pre-registered meta-analysis of 42 studies across 15 countries found a substantial overall learning deficit during the pandemic (Cohen's d = −0.14, 95% CI −0.17 to −0.10), about 35% of a school year's worth of learning, which 'arose early in the pandemic and persists over time.' Deficits were larger in maths than in reading and particularly large among children from low socio-economic backgrounds. The pandemic is therefore a real competing explanation for recent score declines. It is not the whole one: the OECD found no clear difference in PISA trends between systems with limited and longer school closures and calls the 2022 decline only partly attributable to COVID-19.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source:
            "Betthäuser, Bach-Mortensen & Engzell, 'A systematic review and meta-analysis of the evidence on learning during the COVID-19 pandemic', Nature Human Behaviour 7:375-385 (2023); OECD press release on PISA 2022, 'Decline in educational performance only partly attributable to the COVID-19 pandemic'",
          sourceUrl: "https://www.nature.com/articles/s41562-022-01506-4",
          reasoning:
            "A peer-reviewed, pre-registered synthesis showing the pandemic set learning back, which makes COVID a confound in any before-and-after comparison of test scores. It does not show that COVID explains most of the decline: the OECD's release says the PISA drop can only partially be attributed to the pandemic, reports no clear difference in trends by length of school closure, and notes that falling scores were already apparent before 2018.",
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
        "Active on Facebook and Failing at School? Meta-Analytic Findings on the Relationship Between Online Social Networking Activities and Academic Achievement -- Marker, Gnambs & Appel, Educational Psychology Review (2018)",
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
} satisfies TopicInput;
