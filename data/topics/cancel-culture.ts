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
          title: "Pew: 62% of Americans Self-Censor Political Views",
          description:
            "A 2020 Pew Research Center survey found that 62% of Americans say the political climate prevents them from sharing their views. This crosses party lines: 77% of conservatives, 64% of moderates, and 52% of liberals report self-censoring.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Pew Research Center",
          reasoning:
            "Highly credible nonpartisan source. Self-reported censorship is strong evidence of chilling effect, though self-reports may overstate actual behavior change.",
        },
        {
          id: "fire-campus-speech-survey",
          title: "FIRE: 63% of College Students Self-Censor on Campus",
          description:
            "The Foundation for Individual Rights and Expression's 2023 campus speech climate survey found 63% of students reported self-censoring in class or on campus. Students reported fear of social ostracism more than institutional punishment.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "FIRE (Foundation for Individual Rights and Expression)",
          reasoning:
            "Focused specifically on speech climate among young adults. FIRE has a pro-speech orientation but methodology is sound and sample sizes are large.",
        },
        {
          id: "canceled-people-outcomes",
          title: "Most 'Canceled' Public Figures Retain Platforms",
          description:
            "Analysis of high-profile cancellation attempts shows the vast majority of targeted public figures retained or regained their platforms. J.K. Rowling, Dave Chappelle, Joe Rogan, and others saw no lasting professional consequences. Many saw increased audience engagement post-controversy.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Various media analyses",
          reasoning:
            "Demonstrates that cancellation is often ineffective for the powerful, though survivorship bias means we don't see cases where people quietly disappeared.",
        },
        {
          id: "historical-accountability-comparison",
          title: "Historical Accountability Movements Comparison",
          description:
            "Social consequences for speech have always existed — boycotts, public shaming, and social ostracism predate the internet. The Civil Rights movement used boycotts and public pressure to force change. The mechanism is the same; only the speed and scale differ.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Historical analysis, academic literature",
          reasoning:
            "Contextualizes cancel culture within a long tradition of social accountability. Less direct because scale and speed may change the qualitative nature of the phenomenon.",
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
            "The #MeToo movement led to the removal of Harvey Weinstein, Larry Nassar, Bill Cosby, and hundreds of other predators who had operated with institutional protection. Workplace sexual harassment complaints increased 12% in the year following #MeToo, suggesting previously silenced victims felt empowered to report.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "EEOC data, journalistic investigations",
          reasoning:
            "Demonstrates the positive accountability function of public pressure campaigns. Strong evidence that social media mobilization can address real abuses of power.",
        },
        {
          id: "ordinary-person-cancelation-cases",
          title: "Ordinary People Suffer Disproportionate Consequences",
          description:
            "Case studies of non-public figures — a data analyst fired for sharing an academic study, a school principal removed over a yearbook quote, a small business owner boycotted over a political donation — show that ordinary people face devastating consequences with no mechanism for rehabilitation or appeal.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 9,
          },
          source: "The New York Times, The Atlantic, various case reporting",
          reasoning:
            "Directly illustrates the disproportionate impact on non-public figures, though case studies are inherently cherry-picked and may not represent typical outcomes.",
        },
        {
          id: "ideological-conformity-survey",
          title: "Institutional Ideological Conformity Is Increasing",
          description:
            "A 2023 survey of university faculty found 75% of conservative-leaning professors hide their political views, compared to 15% of liberal-leaning faculty. Corporate DEI statements became near-universal after 2020 with 91% of Fortune 500 companies issuing them, regardless of substantive policy changes.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "CSPI Academic Freedom Survey, Fortune 500 analysis",
          reasoning:
            "Suggests conformity pressure in institutions, though causation is difficult to isolate from genuine attitude shifts.",
        },
        {
          id: "social-media-mob-dynamics",
          title: "Social Media Amplification Creates Disproportionate Pile-ons",
          description:
            "Research on social media dynamics shows that outrage spreads faster and further than other emotions. A single viral tweet can generate millions of impressions in hours. The original context is often lost, nuance is impossible, and the target experiences the aggregate of thousands of individual responses as a coordinated attack.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Brady et al., Yale, Proceedings of the National Academy of Sciences",
          reasoning:
            "Strong empirical research on outrage amplification mechanisms. Slightly less direct because it describes the mechanism rather than measuring specific harm.",
        },
      ],
    },
  ],
};
