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
            "UCLA/University of Missouri study measured media slant by counting how often outlets cited think tanks and comparing that to citations by members of Congress with known ideological positions. Of the 20 outlets studied, all but two (Fox News' 'Special Report' and the Washington Times) scored to the left of the average member of Congress, with CBS Evening News and the New York Times far to the left. Methodology was innovative but heavily contested.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source:
            "Groseclose & Milyo, 'A Measure of Media Bias,' Quarterly Journal of Economics 120(4), 2005, pp. 1191-1237",
          sourceUrl:
            "https://academic.oup.com/qje/article-abstract/120/4/1191/1926642",
          reasoning:
            "Peer-reviewed in a top journal, but the method has been widely criticized for equating think-tank citation counts with ideological bias, and several scholars dispute its construct validity. Replicability is limited by contested methodological choices, so directness and replicability are scored low.",
        },
        {
          id: "allsides-bias-ratings",
          title: "AllSides: Consistent Cross-Partisan Bias Ratings",
          description:
            "AllSides rates media bias using a combination of blind bias surveys (content stripped of branding and rated across the spectrum), multipartisan editorial reviews, third-party data, and independent reviews. Results show consistent patterns: CNN and MSNBC rate Lean Left to Left; Fox News rates Lean Right. AllSides positions AP and Reuters near Center.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source: "AllSides Media Bias Ratings (allsides.com)",
          sourceUrl:
            "https://www.allsides.com/media-bias/media-bias-rating-methods",
          reasoning:
            "Multi-method approach is useful, but AllSides is an advocacy organization rather than a peer-reviewed source, and its ratings remain partly subjective, so independence and source reliability are scored modestly. The existence of perceived bias does not itself prove harmful impact on democracy.",
        },
        {
          id: "reuters-trust-survey",
          title: "Reuters: Trust in News Remains Low Globally",
          description:
            "The Reuters Institute Digital News Report 2024 found that 40% of people globally trust 'most news most of the time' — stable year-on-year but four points below its pandemic-era peak. In the US, trust is lower at 32%. Younger audiences increasingly rely on social and video platforms (e.g., TikTok at 23% for news among all ages, higher for under-25s) over traditional outlets.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source:
            "Reuters Institute for the Study of Journalism, Digital News Report 2024",
          sourceUrl:
            "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/dnr-executive-summary",
          reasoning:
            "Highly credible annual survey. Corrected: global trust was stable at 40% in 2024, not 'down from 44% in 2023' as previously stated. Low trust is well-documented but does not itself prove bias exists — it may reflect audience misperception, polarization, or media-literacy gaps, so directness is scored low.",
        },
        {
          id: "cjr-standards-analysis",
          title: "Professional Fact-Checking Infrastructure Has Expanded",
          description:
            "Industry coverage in the Columbia Journalism Review documents that institutional journalism maintains professional norms — multi-source verification, corrections policies, and dedicated fact-checking — and that the number of fact-checking organizations grew sharply (from 44 to roughly 195 globally between 2014 and 2019). This institutional layer distinguishes vetted journalism from unmoderated social media and partisan blogs.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 4,
            directness: 5,
          },
          source: "Columbia Journalism Review, 'The Fact-Check Industry'",
          sourceUrl:
            "https://www.cjr.org/special_report/fact-check-industry-twitter.php",
          reasoning:
            "De-inflated: the prior claim that outlet 'quality has not meaningfully declined' and that error rates are demonstrably low was not supported by a specific finding — CJR itself has published work documenting weak correction practices and acknowledging mainstream bias. CJR is also part of the media establishment it covers, limiting independence. The existence of standards and fact-checking does not preclude structural bias.",
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
          title: "Gallup: US Media Trust at Trend Low of 31%",
          description:
            "Gallup's 2024 survey shows just 31% of Americans trust the mass media 'to report the news fully, accurately, and fairly' a great deal or fair amount — a trend low (Gallup first asked in 1972, when trust was 68-72%). Trust is sharply partisan: 54% among Democrats, 27% among Independents, and 12% among Republicans. For the third year running, more adults have no trust at all (36%) than trust the media.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Gallup, 'Americans' Trust in Media Remains at Trend Low' (2024)",
          sourceUrl:
            "https://news.gallup.com/poll/651977/americans-trust-media-remains-trend-low.aspx",
          reasoning:
            "Gold-standard polling with decades of trend data; directly documents the trust collapse. Updated to the 2024 figure (31%, with Republicans at 12%) from the prior 32%/11% values. Directness limited because low trust could reflect actual quality decline OR partisan messaging about the media.",
        },
        {
          id: "pew-polarization-media",
          title: "Pew: Political Polarization Correlates with Media Diet",
          description:
            "Pew Research Center's 2014 study found that consistent conservatives and consistent liberals have largely non-overlapping media diets. 47% of consistent conservatives named Fox News as their main source for government and political news (no other source came close), while consistent liberals spread across many outlets (none named by more than 15%). The most ideologically consistent partisans were the most active in like-minded networks.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Pew Research Center, 'Political Polarization & Media Habits' (October 21, 2014)",
          sourceUrl:
            "https://www.pewresearch.org/journalism/2014/10/21/political-polarization-media-habits/",
          reasoning:
            "Rigorous research demonstrating correlation; the data are from 2014, so the specific figures may have shifted. Causation direction (media causes polarization vs. polarized people seek confirming media) remains debated, lowering directness.",
        },
        {
          id: "internet-viewpoint-diversity",
          title: "Ideological Segregation Online Is Lower Than Face-to-Face",
          description:
            "Contrary to strong echo-chamber narratives, Gentzkow & Shapiro found that ideological segregation of online news consumption is low in absolute terms — higher than most offline news but well below the segregation of face-to-face interactions with neighbors, co-workers, or family, with no evidence the internet is becoming more segregated over time. Flaxman, Goel & Rao similarly found that most online news is still driven by people visiting mainstream outlets directly, though they also found articles found via search and social media show somewhat higher ideological separation.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Gentzkow & Shapiro, 'Ideological Segregation Online and Offline,' QJE 126(4), 2011; Flaxman, Goel & Rao, 'Filter Bubbles, Echo Chambers, and Online News Consumption,' Public Opinion Quarterly 80(S1), 2016",
          sourceUrl: "https://web.stanford.edu/~gentzkow/research/echo_chambers.pdf",
          reasoning:
            "Two peer-reviewed studies challenging the strongest echo-chamber claims. Corrected the loose 'Stanford; Oxford' attribution to the actual journals (QJE and Public Opinion Quarterly). Findings are nuanced rather than a flat rejection of filter bubbles, and the data predate current algorithmic feeds, so directness is scored moderately.",
        },
        {
          id: "algorithmic-amplification",
          title: "Algorithmic Amplification Boosts Outrage Content",
          description:
            "Internal Meta documents (the 'Facebook Papers' disclosed by Frances Haugen and reviewed by a news consortium) show that from 2017 Facebook's feed weighted 'angry' reactions five times more than 'likes,' and its own researchers warned this surfaced disproportionately controversial, toxic, and low-quality content. A peer-reviewed study by Twitter's own ML team (Huszár et al., PNAS 2022) found the algorithm amplified right-leaning political content in 6 of 7 countries. Mozilla's RegretsReporter crowdsourced study (2021) found 71% of videos users flagged as 'regrets' were served by YouTube's recommendation system.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Facebook Papers (Washington Post consortium, 2021); Huszár et al., PNAS 119(1), 2022; Mozilla Foundation 'YouTube Regrets' (2021)",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.2025334119",
          reasoning:
            "Mixed evidence base: the Twitter/PNAS study is peer-reviewed and rigorous, but the Facebook internal data and Mozilla's crowdsourced (self-selected, non-representative) data are less controlled. Softened the prior 'progressively suggests more extreme content' YouTube claim, which overstated what Mozilla actually measured. Access to proprietary, frequently-changing algorithms limits replicability and independence.",
        },
      ],
    },
  ],
};
