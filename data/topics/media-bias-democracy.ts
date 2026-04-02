import type { Topic } from "@/lib/schemas/topic";

export const mediaBiasDemocracyData = {
  id: "media-bias-democracy",
  title: "Media Bias and Democracy",
  meta_claim:
    "Systemic bias in mainstream media is a significant threat to democratic discourse and informed citizenship.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "existence-extent-bias",
      title: "Existence & Extent of Bias",
      short_summary:
        "Studies consistently find media bias. They just disagree about which direction it runs, which says something about the researchers too.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Claims of 'media bias' are often just disagreement with factual reporting that challenges one's priors. Professional journalism has editorial standards, fact-checking processes, and corrections policies. The real threat to informed citizenship is misinformation from unvetted social media and partisan blogs, not mainstream outlets with reputational stakes. Imperfect journalism is still far better than no institutional journalism.",
      proponent_rebuttal:
        "Studies consistently find mainstream media skews left on social issues and right on economic/military issues. Ownership concentration — 6 corporations own approximately 90% of US media — creates structural bias through editorial pressure and story selection. Coverage choices (what to cover, how much airtime, which experts to feature) are inherently biased even when individual facts are correct. Framing effects shape public opinion as powerfully as outright falsehood.",
      crux: {
        id: "quantitative-bias-measurement",
        title: "Quantitative Media Bias Measurement",
        description:
          "Systematic, replicable methodology for measuring bias in media coverage across outlets, topics, and time periods.",
        methodology:
          "Content analysis of story selection, framing, source selection, and language across major outlets. Compare coverage of identical events. Measure deviation from a neutral baseline using computational linguistics and human coding.",
        equation:
          "\\text{Bias Score} = \\frac{\\sum (\\text{Framing}_{i} + \\text{Source Selection}_{i} + \\text{Story Choice}_{i})}{N_{\\text{articles}}}",
        verification_status: "verified" as const,
        cost_to_verify: "$150K (Large-scale content analysis)",
      },
      evidence: [
        {
          id: "groseclose-milyo-study",
          title: "Groseclose & Milyo: Quantitative Media Slant Analysis",
          description:
            "UCLA/University of Missouri study measured media slant by comparing think-tank citations in news outlets to those made by members of Congress with known ideological positions. Found 18 of 20 major outlets had liberal slant, with the average outlet positioned near the average Democrat in Congress. Methodology was innovative but contested.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "Groseclose & Milyo, Quarterly Journal of Economics (2005)",
          reasoning:
            "Peer-reviewed in a top journal, but methodology has been criticized for equating think-tank citations with ideological bias. Replicability limited by methodological choices.",
        },
        {
          id: "allsides-bias-ratings",
          title: "AllSides: Consistent Cross-Partisan Bias Ratings",
          description:
            "AllSides rates media bias using blind surveys, editorial reviews, and third-party data. Results show consistent patterns: outlets like CNN and MSNBC rate center-left to left; Fox News and Daily Wire rate right. Centrist outlets (AP, Reuters) exist but get less viewership. Most Americans consume ideologically aligned media.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "AllSides Media Bias Ratings",
          reasoning:
            "Multi-method approach is useful but ratings are somewhat subjective. The existence of perceived bias doesn't prove harmful impact on democracy.",
        },
        {
          id: "reuters-trust-survey",
          title: "Reuters: Trust in News at Historic Low Globally",
          description:
            "The Reuters Institute Digital News Report (2024) found that only 40% of people globally trust 'most news most of the time,' down from 44% in 2023. In the US, trust is even lower at 32%. Distrust correlates with perceived bias. Young adults (18-24) increasingly rely on social media over traditional news sources.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Reuters Institute for the Study of Journalism",
          reasoning:
            "Highly credible annual survey; low trust is well-documented but doesn't itself prove bias exists — it could reflect audience misperception or media literacy gaps.",
        },
        {
          id: "cjr-standards-analysis",
          title: "CJR: Professional Standards Remain Robust at Top Outlets",
          description:
            "Columbia Journalism Review analysis finds that major outlets (NYT, Washington Post, AP, Reuters) maintain rigorous editorial standards including multi-source verification, corrections policies, and editorial independence from ownership. Error rates are low compared to social media and partisan outlets. Institutional journalism's quality has not meaningfully declined.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Columbia Journalism Review",
          reasoning:
            "CJR is authoritative on journalism standards, though it is part of the media establishment it evaluates. Standards existing doesn't preclude structural bias.",
        },
      ],
    },
    {
      id: "impact-on-democracy",
      title: "Impact on Democracy",
      short_summary:
        "Americans now self-sort into separate information ecosystems. The left and right do not just disagree on opinions -- they disagree on facts.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Media pluralism is at an all-time high with internet access. People can access diverse viewpoints more easily than at any point in history — from international outlets to independent journalists to primary source documents. Blaming media for polarization ignores personal responsibility for information consumption and deeper socioeconomic drivers of political division.",
      proponent_rebuttal:
        "Filter bubbles and algorithmic amplification create echo chambers that reinforce existing beliefs. Trust in media is at historic lows — 32% per Gallup — undermining the shared factual basis democracy requires. Polarized media consumption correlates strongly with political extremism. When citizens cannot agree on basic facts, democratic deliberation becomes impossible.",
      crux: {
        id: "echo-chamber-effect",
        title: "Echo Chamber Causation Analysis",
        description:
          "Determining whether media echo chambers cause political polarization or merely reflect pre-existing divisions.",
        methodology:
          "Randomized controlled trial: expose participants to cross-cutting news for 6 months. Measure attitude polarization, factual knowledge, and democratic engagement before and after. Compare to control group with normal consumption.",
        equation:
          "\\Delta\\text{Polarization} = \\beta_1(\\text{Echo Chamber Exposure}) + \\beta_2(\\text{Pre-existing Ideology}) + \\epsilon",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Large-scale RCT)",
      },
      evidence: [
        {
          id: "gallup-media-trust",
          title: "Gallup: US Media Trust at Historic Low of 32%",
          description:
            "Gallup's annual survey shows that only 32% of Americans trust mass media 'to report the news fully, accurately, and fairly' — the lowest since Gallup began asking in 1972. Trust is highly partisan: 54% among Democrats, 27% among Independents, and 11% among Republicans. This partisan trust gap has tripled since 2000.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Gallup Annual Media Trust Survey",
          reasoning:
            "Gold-standard polling with decades of data; directly documents trust collapse. Directness limited because low trust could reflect media's actual quality decline OR partisan messaging about media.",
        },
        {
          id: "pew-polarization-media",
          title: "Pew: Political Polarization Correlates with Media Diet",
          description:
            "Pew Research Center found that consistent conservatives and consistent liberals have almost entirely non-overlapping media diets. 47% of consistent conservatives name Fox News as their main source; consistent liberals spread across multiple outlets. Those with the most polarized media diets hold the most negative views of the opposing party.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Pew Research Center, 'Political Polarization & Media Habits'",
          reasoning:
            "Rigorous research demonstrating correlation; causation direction (media causes polarization vs. polarized people seek confirming media) remains debated.",
        },
        {
          id: "internet-viewpoint-diversity",
          title: "Internet Access Enables Unprecedented Viewpoint Diversity",
          description:
            "Contrary to echo chamber narratives, studies show internet users encounter MORE diverse viewpoints than non-internet users. Cross-cutting exposure online exceeds that of most offline social networks. People share articles across ideological lines regularly. The 'filter bubble' may be overstated — most people's actual media diets are more diverse than assumed.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Gentzkow & Shapiro, Stanford; Flaxman et al., Oxford",
          reasoning:
            "Peer-reviewed research challenging dominant echo chamber narrative; replicability somewhat limited as online behavior changes rapidly.",
        },
        {
          id: "algorithmic-amplification",
          title: "Algorithmic Amplification Boosts Outrage Content",
          description:
            "Internal Meta research (leaked by Frances Haugen) showed Facebook's algorithm disproportionately amplifies anger-inducing content because it drives engagement. Twitter's own research found its algorithm amplifies right-leaning political content. YouTube's recommendation engine has been shown to progressively suggest more extreme content.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Facebook Papers, Twitter ML Research, Mozilla Foundation",
          reasoning:
            "Internal company data is highly revealing but access is limited; replicability constrained by proprietary algorithms that change frequently.",
        },
      ],
    },
  ],
};
