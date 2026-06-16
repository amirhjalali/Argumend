import type { Topic } from "@/lib/schemas/topic";

export const cancelCultureData = {
  id: "cancel-culture",
  title: "Cancel Culture",
  meta_claim:
    "Cancel culture — public shaming and professional consequences for controversial speech — does more harm than good to public discourse.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "free-expression-accountability",
      title: "Free Expression vs. Accountability",
      short_summary:
        "A single tweet can end a career. The question is whether that power functions as accountability or as mob justice with no appeals process.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "\"Cancel culture\" is just accountability with a new name. Marginalized groups finally have tools to challenge powerful people who previously faced no consequences. The supposedly \"canceled\" almost always keep their platforms, wealth, and influence. Social consequences for speech have always existed — this is democracy, not tyranny.",
      proponent_rebuttal:
        "Fear of cancellation creates a measurable chilling effect on public discourse. Pew Research shows 62% of Americans say the political climate prevents them from sharing their views. Disproportionate punishment — losing a career over a single tweet from a decade ago — violates basic proportionality. Mob justice operates without due process, presumption of innocence, or right of appeal.",
      crux: {
        id: "chilling-effect-measurement",
        title: "Quantifying the Chilling Effect on Public Discourse",
        description:
          "Measuring whether fear of social media backlash measurably reduces the diversity and honesty of publicly expressed viewpoints across institutional and public settings.",
        methodology:
          "Compare self-reported willingness to express views (Pew, FIRE surveys) with behavioral data: op-ed submission rates, academic paper topic diversity, and public comment participation rates over time. Control for political climate and platform changes.",
        equation:
          "\\text{Chilling Index} = 1 - \\frac{\\text{Expressed View Diversity}_{t}}{\\text{Privately Held View Diversity}_{t}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Multi-year survey and behavioral tracking study)",
      },
      evidence: [
        {
          id: "pew-self-censorship",
          title: "Cato/YouGov: 62% of Americans Self-Censor Political Views",
          description:
            "A July 2020 Cato Institute/YouGov survey of 2,000 U.S. adults found that 62% say the political climate prevents them from sharing things they believe. This rises across the spectrum: 77% of conservatives, 64% of moderates, and 52% of 'centrist' liberals report holding views they are afraid to share; only strong liberals were a majority who felt free to speak.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Cato Institute / YouGov, 'Poll: 62% of Americans Say They Have Political Views They're Afraid to Share' (2020)",
          sourceUrl:
            "https://www.cato.org/survey-reports/poll-62-americans-say-they-have-political-views-theyre-afraid-share",
          reasoning:
            "Originally misattributed to Pew; the 62% figure (and the 77/64/52 breakdown) is from a Cato/YouGov poll. Cato is a libertarian think tank, so independence is lower than a nonpartisan pollster, but YouGov fielded the survey and the result has been widely replicated. Self-reports may overstate actual behavior change.",
        },
        {
          id: "fire-campus-speech-survey",
          title: "FIRE: Around a Quarter of College Students Self-Censor Often",
          description:
            "FIRE's 2024 College Free Speech Rankings, based on a survey of 55,102 students at 254 schools (fielded Jan–Jun 2023), found about 20% of students often feel they cannot express their opinions, and 25–28% said they self-censor 'fairly' or 'very' often in conversations with peers, with professors, and in class. Conservative students self-censored markedly more than liberal students (e.g., 38% vs. 19% in peer conversations).",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 7,
            directness: 7,
          },
          source: "FIRE, 2024 College Free Speech Rankings (survey fielded 2023)",
          sourceUrl: "https://www.fire.org/research-learn/2024-college-free-speech-rankings",
          reasoning:
            "The original '63%' figure was unsupported and conflated with a separate item (56% worried about reputational damage from being misunderstood); corrected to FIRE's actual ~20–28% self-censorship figures. FIRE has a pro-speech orientation (lower independence) but sample sizes are very large.",
        },
        {
          id: "canceled-people-outcomes",
          title: "Many High-Profile 'Canceled' Figures Retain Their Platforms",
          description:
            "A number of widely covered cancellation attempts against prominent figures — J.K. Rowling, Dave Chappelle, Joe Rogan — did not produce lasting professional consequences, and some figures saw increased audience engagement afterward. This is a qualitative observation from media commentary, not a systematic dataset, so it cannot quantify the overall share of targets who 'survive.'",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 5,
            replicability: 4,
            directness: 5,
          },
          source: "Illustrative media commentary (no single primary dataset)",
          reasoning:
            "No web-verifiable systematic study aggregates cancellation outcomes, so no sourceUrl is provided and weights are kept low. Suggestive but subject to survivorship bias — we don't see cases where less powerful people quietly disappeared.",
        },
        {
          id: "historical-accountability-comparison",
          title: "Social Consequences for Speech Predate the Internet",
          description:
            "Boycotts, public shaming, and social ostracism long predate social media — for example, the Civil Rights movement used boycotts and organized public pressure to force change. This is a conceptual/historical argument that today's 'cancel culture' shares a mechanism with older forms of social accountability, differing mainly in speed and scale.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 6,
            replicability: 4,
            directness: 4,
          },
          source: "General historical argument (no single citable source)",
          reasoning:
            "A framing/contextual claim rather than a specific empirical finding, so no sourceUrl is provided. Less direct because the increased speed and scale of online pile-ons may change the qualitative nature of the phenomenon.",
        },
      ],
    },
    {
      id: "social-cultural-impact",
      title: "Social & Cultural Impact",
      short_summary:
        "62% of Americans say the political climate prevents them from sharing their views. Self-censorship may be rational, but it is not free speech.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Power structures need disruption, and social media gives marginalized people tools to fight back. #MeToo removed actual predators who operated with impunity for decades. Cultural shift toward inclusion requires discomfort. Cancel culture is overstated — most 'cancelations' are temporary, and the discourse about cancel culture is louder than the phenomenon itself.",
      proponent_rebuttal:
        "Cancel culture disproportionately hits ordinary people without the resources, legal teams, or platforms to fight back. It enforces ideological conformity rather than genuine progress — people learn to perform the correct opinions rather than examine their beliefs. Fear-based compliance is not the same as changed minds and may actually increase hidden resentment.",
      crux: {
        id: "ordinary-vs-powerful-impact",
        title: "Differential Impact on Ordinary vs. Powerful People",
        description:
          "Measuring whether public shaming campaigns disproportionately affect ordinary individuals compared to powerful public figures, and whether outcomes differ based on the target's resources.",
        methodology:
          "Track cancellation campaigns across social media, categorize targets by public profile (celebrity, executive, ordinary person), and measure outcomes (job loss, mental health impact, recovery time) across categories.",
        equation:
          "\\text{Impact Ratio} = \\frac{P(\\text{lasting harm} | \\text{ordinary})}{P(\\text{lasting harm} | \\text{powerful})}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$300K (Social media analysis and longitudinal follow-up study)",
      },
      evidence: [
        {
          id: "metoo-predator-removal",
          title: "#MeToo Removed Powerful Predators",
          description:
            "The #MeToo movement led to the removal of figures such as Harvey Weinstein, Larry Nassar, and Bill Cosby, who had operated with institutional protection. EEOC sexual harassment charges rose 13.6% in FY2018 (6,696 to 7,609) — the first year-over-year increase in roughly a decade — suggesting previously silenced victims felt empowered to report after #MeToo went viral in October 2017.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "U.S. EEOC, 'Sexual Harassment in Our Nation's Workplaces'; journalistic investigations",
          sourceUrl: "https://www.eeoc.gov/data/sexual-harassment-our-nations-workplaces",
          reasoning:
            "EEOC is an authoritative government source; the corrected figure is 13.6% (the file previously said 12%). Demonstrates the accountability function of public pressure campaigns, though the charge increase is correlational with #MeToo, not proven causal.",
        },
        {
          id: "ordinary-person-cancelation-cases",
          title: "Some Non-Public Figures Have Faced Severe Consequences",
          description:
            "Individual cases involving lesser-known people illustrate severe professional fallout from online controversy — for example, data analyst David Shor was let go by Civis Analytics in 2020 after tweeting a peer-reviewed political-science study on protest tactics. Such anecdotes show ordinary people can face career consequences with little recourse, but they are selected examples, not a representative sample.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source: "Journalistic case reporting (e.g., Reason on the David Shor case)",
          sourceUrl: "https://reason.com/2020/08/27/protests-violence-david-shor-kenosha-biden-trump/",
          reasoning:
            "Only the David Shor case is web-verified and cited; other examples in the original text could not be individually verified, so the claim was narrowed. Case studies are inherently cherry-picked and may not represent typical outcomes, hence lower directness.",
        },
        {
          id: "ideological-conformity-survey",
          title: "Conservative Academics Report High Rates of Self-Censorship",
          description:
            "Eric Kaufmann's 2021 CSPI report 'Academic Freedom in Crisis' found that most right-leaning social-science and humanities academics in North America self-censor in their teaching or research (about 70%), and over 9 in 10 Trump-supporting academics said they would not feel comfortable expressing their views to colleagues. The report focuses on conservatives and does not provide a directly comparable figure for left-leaning faculty.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 5,
            directness: 6,
          },
          source: "Eric Kaufmann, 'Academic Freedom in Crisis,' CSPI Report (2021)",
          sourceUrl: "https://www.cspicenter.com/p/academicfreedom",
          reasoning:
            "Corrected from unverifiable claims: the original '75% conservative vs 15% liberal' comparison and the '91% of Fortune 500 issued DEI statements' figure could not be verified and appear inaccurate (research indicates only roughly a third of large U.S. firms made racial-equity statements after 2020). CSPI is an advocacy-oriented center, so independence is low. Suggests conformity pressure but does not isolate it from genuine attitude shifts.",
        },
        {
          id: "social-media-mob-dynamics",
          title: "Moral-Emotional Language Amplifies Diffusion of Outrage Online",
          description:
            "Brady, Wills, Jost, Tucker & Van Bavel (PNAS, 2017) analyzed ~563,000 tweets and found that each additional moral-emotional word in a message increased its retweet rate by roughly 20%, helping outrage spread within ideological groups. A large 2025 pre-registered replication and meta-analysis (PNAS Nexus) confirmed the effect but estimated it somewhat smaller (~12% per word). This illustrates the amplification mechanism behind viral pile-ons, where context is lost and the target experiences the aggregate of many responses at once.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source: "Brady et al., 'Emotion shapes the diffusion of moralized content in social networks,' PNAS (2017)",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.1618923114",
          reasoning:
            "Peer-reviewed PNAS research; authors were at NYU (the file previously said 'Yale'). The original ~20% per-word effect was partly tempered by a 2025 replication (~12%), so replicability is moderate. Less direct because it describes the diffusion mechanism rather than measuring specific harm to cancellation targets.",
        },
      ],
    },
  ],
};
