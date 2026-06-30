import type { Topic } from "@/lib/schemas/topic";

export const socialMediaMentalHealthData = {
  id: "social-media-mental-health",
  title: "Social Media and Teen Mental Health",
  meta_claim:
    "Social media use is a primary cause of the teen mental health crisis that began around 2012.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Teen depression, self-harm, and suicide all turned sharply upward around 2012, and a natural experiment from Facebook's staggered college rollout found it worsened student mental health — yet the largest screen-time studies find the average effect 'tiny.' The harm looks real but concentrated (heavy-using girls), not universal, and its size is genuinely contested.",
    confidence: 70,
    source:
      "Twenge / CDC YRBS; Braghieri, Levy & Makarin, American Economic Review (2022); Orben & Przybylski, Nature Human Behaviour (2019)",
    sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20211218",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Something happened to teen mental health around 2012: depression, self-harm, and suicide all turned sharply upward, right as smartphones and social media became near-universal — and the pattern shows up across multiple countries and concentrates in girls.",
    "The single best piece of causal evidence is a natural experiment — Facebook's staggered rollout across US colleges worsened students' mental health where it arrived — but the largest screen-time studies (Orben & Przybylski, 355,000 teens) find the average association 'tiny,' smaller than the effect of wearing glasses.",
    "So the honest reading isn't 'social media is fine' or 'social media is the cause' — the harm looks real but concentrated among heavy-using teen girls, and the live fight is over how big it is and whether the engagement algorithms specifically are to blame, not whether anything is going on.",
  ],
  pillars: [
    {
      id: "temporal-correlation",
      title: "The Temporal Correlation",
      short_summary:
        "Teen depression and anxiety rates spiked precisely when smartphone adoption became universal.",
      image_url:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Correlation is not causation. Many other factors changed around 2012: economic recovery from recession, increased academic pressure, climate anxiety, political polarization. Self-reported mental health may reflect changing attitudes toward disclosure.",
      proponent_rebuttal:
        "The timing is remarkably precise across multiple countries that adopted smartphones at different rates. The effect is concentrated in girls and heavy users. Internal Facebook research (leaked) showed Instagram specifically made body image issues worse for teenage girls.",
      crux: {
        id: "dose-response",
        title: "Dose-Response Relationship",
        description:
          "If social media causes harm, we should see linear or threshold effects correlating usage hours with mental health outcomes.",
        methodology:
          "Longitudinal study tracking social media usage (passive measurement, not self-report) against validated mental health assessments. Control for confounders.",
        equation:
          "MH_{score} = \\beta_0 + \\beta_1 \\cdot \\text{hours} + \\beta_2 \\cdot \\text{hours}^2 + \\epsilon",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Longitudinal study with passive measurement)",
        falsification: {
          supporter_flip:
            "If high-quality longitudinal studies using passive (not self-reported) usage measurement found no dose-response — heavy users no worse off than light users once confounders are controlled — and Facebook-rollout-style natural experiments failed to replicate, the 'primary cause' claim would collapse.",
          skeptic_flip:
            "A skeptic who calls it a moral panic should weigh that the 2012 inflection is sharp, synchronized across countries, and concentrated in girls, and that at least one credible natural experiment (Facebook's rollout) shows a causal worsening — patterns a pure 'attitudes-to-disclosure changed' story struggles to explain.",
          common_ground:
            "Both sides agree teen mental health deteriorated markedly after ~2012, and that the alarming raw trends and the 'tiny' average-effect studies are hard to reconcile.",
          live_disagreement:
            "Whether the harm is a small average effect that's been over-dramatized, or a large effect concentrated in heavy-using girls that population averages dilute — which depends on measuring usage and outcomes far better than self-report allows.",
        },
      },
      evidence: [
        {
          id: "twenge-trends",
          title: "US Teen Depression and Suicide Rates Rose Sharply After ~2012",
          description:
            "Analyses of large national datasets (Monitoring the Future, the Youth Risk Behavior Survey, and CDC mortality data) document that US adolescent depressive symptoms, self-harm, and suicide rates began rising around 2010-2012, after years of relative stability, with the steepest increases among girls. Jean Twenge and colleagues argue this inflection coincides with the period when smartphone and social-media use became near-universal among teens.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Twenge, Joiner, Rogers & Martin, Clinical Psychological Science 6(1), 3–17 (2018); CDC YRBS; Monitoring the Future",
          sourceUrl: "https://doi.org/10.1177/2167702617723376",
          reasoning:
            "The trend data come from large, reputable national surveys and are reproducible. But the link to social media specifically is correlational, and the author is a prominent advocate of the harm hypothesis, so independence and directness are moderate.",
        },
        {
          id: "orben-przybylski-small-effects",
          title: "Large Specification-Curve Analysis Finds Tiny Association",
          description:
            "Orben and Przybylski (2019) applied specification-curve analysis to three large datasets (over 350,000 adolescents) and found that digital-technology use explained at most about 0.4% of the variance in adolescent well-being — an effect they noted was comparable to that of wearing glasses or eating potatoes. They argued that the small, noisy associations cannot support strong claims that screen time is a primary driver of the mental-health decline.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Orben & Przybylski, Nature Human Behaviour 3, 173–182 (2019)",
          sourceUrl: "https://doi.org/10.1038/s41562-018-0506-1",
          reasoning:
            "Peer-reviewed in a top journal, using transparent specification-curve methods across multiple large datasets, making it reliable and replicable. It directly rebuts the 'primary cause' claim by showing the cross-sectional effect size is very small.",
        },
        {
          id: "braghieri-facebook-rollout",
          title: "Facebook's Staggered College Rollout Worsened Student Mental Health",
          description:
            "Braghieri, Levy, and Makarin (2022) exploited the quasi-random staggered introduction of Facebook across US colleges from 2004-2006 as a natural experiment, linking it to contemporaneous health-survey data. They found that the arrival of Facebook on a campus led to measurable increases in depression and anxiety symptoms, with effects consistent with unfavorable social comparison. This is one of the strongest quasi-experimental causal designs in the literature.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Braghieri, Levy & Makarin, American Economic Review (2022)",
          sourceUrl: "https://www.aeaweb.org/journals/aer",
          reasoning:
            "Published in a leading economics journal with a credible difference-in-differences identification strategy, giving it strong causal weight. Directness is tempered because it studies early Facebook among college students, not contemporary algorithmic platforms among younger teens.",
        },
        {
          id: "odgers-confounders",
          title: "Expert Reviews Warn the Evidence Is Mixed and Confounded",
          description:
            "Reviews by Candice Odgers, Michaeline Jensen, and colleagues (e.g., in Nature and the Journal of Child Psychology and Psychiatry) conclude that most studies find small and inconsistent associations between social-media use and adolescent mental health, that causation is hard to establish, and that the rise in teen distress is plausibly driven by multiple confounded factors. They caution that framing social media as the primary cause outruns the evidence.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Odgers & Jensen, J. Child Psychology & Psychiatry (2020); Odgers, Nature (2024)",
          sourceUrl: "https://acamh.onlinelibrary.wiley.com/journal/14697610",
          reasoning:
            "Authored by established developmental scientists synthesizing the broader literature, making it reliable and reasonably independent. It directly challenges the 'primary cause' framing by emphasizing confounding and effect-size limits.",
        },
      ],
    },
    {
      id: "mechanism-identification",
      title: "Causal Mechanisms",
      short_summary:
        "Specific features of social media platforms are designed to exploit psychological vulnerabilities.",
      image_url:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Blaming technology is a moral panic repeated throughout history (TV, video games, rock music). Teens have always faced social pressures. Social media also provides benefits: community, information, creative expression.",
      proponent_rebuttal:
        "Unlike previous technologies, social media uses AI-optimized engagement algorithms, infinite scroll, variable reward schedules (like slot machines), and social comparison metrics (likes, followers). Internal documents show platforms knew about harms and optimized for engagement anyway.",
      crux: {
        id: "algorithm-experiment",
        title: "The Algorithm Experiment",
        description:
          "Randomized trial comparing engagement-optimized feeds vs. chronological/curated feeds on mental health outcomes.",
        methodology:
          "Partner with platforms or use browser extensions to randomly assign teens to different feed algorithms. Measure anxiety, depression, sleep, and self-esteem over 6 months.",
        equation:
          "\\Delta MH = f(\\text{algorithm type}, \\text{baseline MH}, \\text{usage hours})",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10M (Requires platform cooperation or technical workaround)",
        falsification: {
          supporter_flip:
            "If randomized trials swapping engagement-optimized feeds for chronological/curated ones showed no mental-health difference, the specific 'the algorithm is the harm' mechanism would fail — leaving social media's effect (if any) attributable to something other than algorithmic amplification.",
          skeptic_flip:
            "A skeptic who calls it a moral panic should weigh that, unlike TV or video games, these platforms use variable-reward engagement loops and social-comparison metrics that internal documents show the companies knew harmed some teen girls — features without a clear historical analog.",
          common_ground:
            "Both sides agree social media also delivers real benefits (community, information, expression), and that every new medium has drawn moral panic.",
          live_disagreement:
            "Whether the harm comes specifically from engagement-optimized algorithms (testable by swapping feeds) or from social media use generally — a question no large randomized feed experiment has yet settled.",
        },
      },
      evidence: [
        {
          id: "surgeon-general-advisory",
          title: "US Surgeon General Issued a 2023 Advisory on Social Media and Youth",
          description:
            "In 2023 the US Surgeon General issued a formal public-health advisory warning that social media can pose 'a profound risk of harm' to the mental health and well-being of children and adolescents. The advisory highlighted design features that promote excessive and problematic use, exposure to harmful content, and disrupted sleep, while acknowledging that benefits and harms vary and that more research is needed.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "US Surgeon General, 'Social Media and Youth Mental Health' Advisory (2023)",
          sourceUrl: "https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html",
          reasoning:
            "An advisory from a credible public-health authority synthesizing existing literature. It supports concern about platform design but is a policy synthesis rather than primary experimental evidence, so replicability and directness are limited.",
        },
        {
          id: "internal-instagram-research",
          title: "Leaked Internal Research: Instagram Worsened Body Image for Some Teen Girls",
          description:
            "Internal Meta research disclosed in 2021 (the 'Facebook Files') reported that the company's own studies found Instagram made body-image issues worse for a meaningful share of teenage girls who already felt bad about their bodies, and that some teens traced anxiety and depression to the app. Proponents cite this as evidence that platforms identified specific harms tied to social-comparison features and continued optimizing for engagement.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 7,
          },
          source: "Wall Street Journal, 'The Facebook Files' (2021); leaked Meta internal slides",
          sourceUrl: "https://www.wsj.com/articles/facebook-knows-instagram-is-toxic-for-teen-girls-company-documents-show-11631620739",
          reasoning:
            "Directly addresses a harm mechanism (social comparison / body image) using the platform's own internal data. But the research was small-sample internal survey work, not peer-reviewed, and reported by journalists, so reliability, independence, and replicability are constrained.",
        },
        {
          id: "moral-panic-history",
          title: "New Media Have Repeatedly Triggered Unfounded Moral Panics",
          description:
            "Historians and media scholars document a recurring pattern in which each new medium — novels, radio, comic books, television, and video games — was blamed for corrupting youth, with predictions of harm that largely failed to materialize. The 1950s comic-book panic (Wertham) and decades of video-game 'violence' claims, later contradicted by large studies, are canonical examples. Skeptics argue current social-media fears may follow the same overstated trajectory.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Orben, Perspectives on Psychological Science (2020), 'The Sisyphean Cycle of Technology Panics'",
          sourceUrl: "https://journals.sagepub.com/home/pps",
          reasoning:
            "Grounded in a peer-reviewed historical analysis of recurring technology panics, supporting skepticism about strong causal claims. Directness is moderate: historical analogy weakens the harm narrative but does not itself measure social media's specific effects.",
        },
        {
          id: "coyne-longitudinal",
          title: "Eight-Year Longitudinal Study Finds No Within-Person Link",
          description:
            "Coyne et al. (2020) followed roughly 500 adolescents over eight years and found that increases in an individual teen's time on social media did not predict later increases in that same teen's depression or anxiety. The within-person null result suggests that, for the average adolescent, more social-media use does not causally drive worse mental health, challenging simple dose-response mechanism claims.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Coyne, Rogers, Zurcher, Stockdale & Booth, Computers in Human Behavior (2020)",
          sourceUrl: "https://www.sciencedirect.com/journal/computers-in-human-behavior",
          reasoning:
            "A peer-reviewed, multi-year within-person longitudinal design that controls for stable individual differences, giving it strong methodological standing. It directly rebuts the dose-response mechanism for the average teen, though it cannot rule out effects on vulnerable subgroups.",
        },
      ],
    },
  ],
};
