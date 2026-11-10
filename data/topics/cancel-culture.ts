export const cancelCultureData = {
  id: "cancel-culture",
  title: "Cancel Culture",
  question: "Does cancel culture do more harm than good to public discourse?",
  meta_claim:
    "Cancel culture — public shaming and professional consequences for controversial speech — does more harm than good to public discourse.",
  status: "contested" as const,
  category: "technology" as const,
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In a 2020 Cato/YouGov survey, 62% of Americans said the political climate keeps them from sharing things they believe. J.K. Rowling, Dave Chappelle and Joe Rogan all kept their platforms after campaigns to cancel them. Both sides accept those facts. The fight is over what the fear costs public debate, and who pays when the target is not famous.",
    confidence: 82,
    source:
      "Cato Institute / YouGov, 'Poll: 62% of Americans Say They Have Political Views They're Afraid to Share' (2020)",
    sourceUrl:
      "https://www.cato.org/survey-reports/poll-62-americans-say-they-have-political-views-theyre-afraid-share",
  },
  simple_case: [
    "The answer shapes how employers, universities and platforms respond to the next online pile-on, and how freely people speak while they decide.",
  ],
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
        "Fear of cancellation tracks with a measurable rise in self-censorship. A 2020 Cato Institute/YouGov survey found 62% of Americans say the political climate prevents them from sharing things they believe — up from 58% in 2017 — and the discomfort spans the spectrum (77% of Republicans, 59% of independents, even 52% of Democrats). Disproportionate punishment — losing a career over a single old tweet — violates basic proportionality, and online pile-ons operate without due process, presumption of innocence, or right of appeal.",
      crux: {
        id: "chilling-effect-measurement",
        title: "Quantifying the Chilling Effect on Public Discourse",
        question:
          "Does fear of online backlash measurably narrow what people are willing to say in public?",
        description:
          "Measuring whether fear of social media backlash measurably reduces the diversity and honesty of publicly expressed viewpoints across institutional and public settings.",
        methodology:
          "Compare self-reported willingness to express views (e.g., Cato/YouGov and FIRE surveys) with behavioral data: op-ed submission rates, academic paper topic diversity, and public comment participation rates over time. Control for political climate and platform changes.",
        equation:
          "\\text{Chilling Index} = 1 - \\frac{\\text{Expressed View Diversity}_{t}}{\\text{Privately Held View Diversity}_{t}}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Behavioral series over time, such as op-ed submissions, the range of topics in academic papers and public-comment participation, read against the Cato/YouGov and FIRE self-censorship surveys, controlling for political climate and platform changes.",
        },
        cost_to_verify: "$500K (Multi-year survey and behavioral tracking study)",
        falsification: {
          supporter_flip:
            "If behavioral measures — op-ed submissions, the range of topics in academic papers, public-comment participation — showed no narrowing over time once political climate and platform changes are controlled for, the self-censorship surveys would describe discomfort rather than a chilling effect, and the harm case would weaken.",
          skeptic_flip:
            "If behavioral measures matched the surveys, with the 62% in Cato/YouGov who hold back their views and the quarter of students FIRE found self-censoring showing up as a real narrowing of what gets said, the chilling effect would be hard to read as mere accountability.",
          common_ground:
            "Both sides agree some speech warrants social consequences, and that many high-profile targets — J.K. Rowling, Dave Chappelle, Joe Rogan — kept their platforms after cancellation attempts.",
          live_disagreement:
            "Whether the self-censorship people report reflects a real narrowing of public discourse caused by fear of backlash, or ordinary social consequences for speech, which have always existed, felt more sharply online.",
        },
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
            "Three widely covered campaigns did not cost their targets their platforms. Spotify came under heavy pressure in 2022 to drop Joe Rogan over his anti-vaccine comments and use of racial slurs, with Neil Young and other musicians pulling their music; CEO Daniel Ek said 'I do not believe that silencing Joe is the answer', and on 2 February 2024 Spotify announced a new multiyear deal with him (the AP cites a reported value of up to $250 million). Dave Chappelle's 2021 Netflix special 'The Closer' prompted a walkout by dozens of Netflix employees; Netflix stood by it and released his next special, 'The Dreamer', on New Year's Eve 2023. J.K. Rowling was named executive producer of the Harry Potter television series Max announced on 12 April 2023. These are selected cases, not a systematic dataset, so they cannot quantify the overall share of targets who 'survive.'",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 5,
            replicability: 4,
            directness: 5,
          },
          source:
            "Illustrative cases, no systematic outcome dataset: Spotify newsroom (2 Feb 2024) and Associated Press (3 Feb 2024) on Rogan; CNN (26 Dec 2023) on Chappelle; jkrowling.com (12 Apr 2023) on Rowling",
          sourceUrl:
            "https://newsroom.spotify.com/2024-02-02/the-art-of-podcasting-with-joe-rogan-and-his-new-multiyear-spotify-partnership/",
          reasoning:
            "No systematic study aggregates cancellation outcomes; each of the three cases is checked against the source named, and weights are kept low. Suggestive but subject to survivorship bias — we don't see cases where less powerful people quietly disappeared.",
        },
        {
          id: "historical-accountability-comparison",
          title: "Social Consequences for Speech Predate the Internet",
          description:
            "Boycotts, public shaming, and social ostracism long predate social media. In the civil-rights boycott of white merchants launched in Claiborne County, Mississippi in 1966, 'store watchers' recorded the names of Black residents who kept shopping at the boycotted stores, and the names were read aloud at meetings and published in a local Black newspaper. In NAACP v. Claiborne Hardware Co. (1982) the Supreme Court held the boycott's nonviolent elements protected by the First Amendment, even though organizers admittedly used social pressure and the threat of ostracism: 'Speech does not lose its protected character, however, simply because it may embarrass others or coerce them into action.' The Court also found that acts of violence occurred, and those were not protected. This is a historical argument that today's 'cancel culture' shares a mechanism with older forms of social accountability, differing mainly in speed and scale.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 6,
            replicability: 4,
            directness: 4,
          },
          source:
            "NAACP v. Claiborne Hardware Co., 458 U.S. 886 (decided 2 July 1982), opinion of the Court by Justice Stevens; a historical analogy rather than an effect estimate",
          sourceUrl: "https://www.law.cornell.edu/supremecourt/text/458/886",
          reasoning:
            "A framing/contextual claim anchored in one documented case, not an effect estimate. Less direct because the increased speed and scale of online pile-ons may change the qualitative nature of the phenomenon, and a ruling that such pressure is protected speech does not show that it does more good than harm.",
        },
        {
          id: "pew-2020-callouts-accountability",
          title: "Pew (2020): 58% of US Adults Say Calling People Out on Social Media Holds Them Accountable; 38% Say It Punishes the Undeserving",
          description:
            "Pew Research Center surveyed 10,093 US adults on its American Trends Panel from 8 to 13 September 2020. '58% of U.S. adults say in general, calling out others on social media is more likely to hold people accountable', while 38% said such call-outs are more likely to punish people who don't deserve it. The split is partisan: 75% of Democrats chose accountability against 39% of Republicans, and 56% of Republicans said call-outs punish the undeserving against 22% of Democrats. Only 44% had heard at least a fair amount about the phrase 'cancel culture'.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 4,
          },
          source:
            "Pew Research Center, 'Americans and Cancel Culture: Where Some See Calls for Accountability, Others See Censorship, Punishment' (19 May 2021; survey of Sept 2020)",
          sourceUrl:
            "https://www.pewresearch.org/internet/2021/05/19/americans-and-cancel-culture-where-some-see-calls-for-accountability-others-see-censorship-punishment/",
          reasoning:
            "A large probability-based panel from a nonpartisan pollster, fielded in the same year as the Cato/YouGov poll the other side cites, and it finds most Americans read call-outs as accountability. Directness is 4: it measures how people judge call-outs, not whether fear of them narrows what gets said, and the partisan gap shows the answer depends on whose speech is being called out. Fielded in 2020; views may have moved since.",
        },
      ],
    },
    {
      id: "social-cultural-impact",
      title: "Social & Cultural Impact",
      short_summary:
        "In a 2020 Cato/YouGov poll, 62% of Americans said the political climate prevents them from sharing things they believe. Self-censorship may be rational, but it is not free speech.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Power structures need disruption, and social media gives marginalized people tools to fight back. #MeToo removed actual predators who operated with impunity for decades. Cultural shift toward inclusion requires discomfort. Cancel culture is overstated — most 'cancelations' are temporary, and the discourse about cancel culture is louder than the phenomenon itself.",
      proponent_rebuttal:
        "Celebrities have legal teams and audiences; ordinary people do not. When a non-public figure like data analyst David Shor loses a job over a single tweet, there is no platform to mount a defense. Survey data also points to conformity pressure that falls unevenly: FIRE's 2024 rankings found conservative students self-censor far more than liberal peers (e.g., 38% vs. 19% in conversations with other students). That gap suggests people are learning to perform accepted opinions rather than examine their beliefs — and fear-based compliance is not the same as changed minds, and may simply drive resentment underground.",
      crux: {
        id: "ordinary-vs-powerful-impact",
        title: "Differential Impact on Ordinary vs. Powerful People",
        question:
          "Do public shaming campaigns fall harder on ordinary people than on powerful public figures?",
        description:
          "Measuring whether public shaming campaigns disproportionately affect ordinary individuals compared to powerful public figures, and whether outcomes differ based on the target's resources.",
        methodology:
          "Track cancellation campaigns across social media, categorize targets by public profile (celebrity, executive, ordinary person), and measure outcomes (job loss, mental health impact, recovery time) across categories.",
        equation:
          "\\text{Impact Ratio} = \\frac{P(\\text{lasting harm} | \\text{ordinary})}{P(\\text{lasting harm} | \\text{powerful})}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A tracked sample of shaming campaigns, with targets sorted into celebrities, executives and ordinary people, comparing job loss, mental-health harm and recovery time across the groups.",
        },
        cost_to_verify: "$300K (Social media analysis and longitudinal follow-up study)",
        falsification: {
          supporter_flip:
            "If tracking shaming campaigns by target showed ordinary people recovering from job loss and pile-ons about as well as celebrities and executives, and most campaigns aimed at people with real power, the claim that cancel culture falls hardest on those least able to defend themselves would weaken.",
          skeptic_flip:
            "If tracking found non-public figures like data analyst David Shor losing jobs more often than people with real power, and FIRE's self-censorship gap (38% of conservative students vs. 19% of liberals) persisted, the tool-for-the-marginalized view would be hard to hold.",
          common_ground:
            "Both sides agree that prominent figures with audiences and legal teams usually keep their platforms after a cancellation attempt.",
          live_disagreement:
            "Whether public shaming mostly reaches powerful people who once escaped consequences, as with #MeToo, or falls hardest on ordinary people with no platform to defend themselves.",
        },
      },
      evidence: [
        {
          id: "metoo-predator-removal",
          title: "#MeToo: At Least 200 Prominent Men Lost Their Jobs in a Year, and EEOC Harassment Charges Rose 13.6%",
          description:
            "In the year after #MeToo went viral in October 2017, a New York Times analysis counted at least 200 prominent men fired or demoted following accusations of sexual misconduct, against fewer than 30 high-profile people the year before; about 122 had been replaced, 53 of them by women. EEOC sexual harassment charges rose 13.6% in FY2018 (6,696 to 7,609) after falling in each year from FY2014 to FY2017, which suggests previously silenced victims felt able to report.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "U.S. EEOC, 'Sexual Harassment in Our Nation's Workplaces', Data Highlight No. 2 (April 2022); New York Times analysis of 23 Oct 2018 as reported by TheWrap",
          sourceUrl: "https://www.eeoc.gov/data/sexual-harassment-our-nations-workplaces",
          reasoning:
            "EEOC is an authoritative government source; the corrected figure is 13.6% (the file previously said 12%). The count of men who lost jobs is the New York Times's, taken here from TheWrap's report of it. Demonstrates the accountability function of public pressure campaigns, though the charge increase is correlational with #MeToo, not proven causal, and charges fell back to 6,587 in FY2020 and 5,581 in FY2021.",
        },
        {
          id: "ceo-ethical-lapse-dismissals",
          title: "Strategy& (2017): CEO Dismissals for Ethical Lapses Rose From 3.9% to 5.3% of Successions at the World's 2,500 Largest Companies",
          description:
            "PwC's Strategy& CEO Success study tracked chief-executive successions at the world's 2,500 largest public companies. 'Globally, dismissals for ethical lapses rose from 3.9 percent of all successions in 2007–11 to 5.3 percent in 2012–16', and at the largest companies in North America and Western Europe from 4.6 to 7.8 percent. The numbers are small: 18 CEOs across the 2,500 companies were dismissed for ethical lapses in 2016. Among the causes the authors list: 'the public has become more suspicious, more critical, and less forgiving of corporate misbehavior', digital communications 'can provide irrefutable evidence of misconduct', and 'the relentless glare of social media, is omnipresent.'",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 4,
          },
          source:
            "Karlsson, Aguirre & Rivera, 'Are CEOs Less Ethical Than in the Past?', strategy+business 87 (15 May 2017), PwC Strategy& CEO Success study",
          sourceUrl: "https://www.strategy-business.com/feature/Are-CEOs-Less-Ethical-Than-in-the-Past",
          reasoning:
            "Systematic data over a large, defined population showing that public scrutiny increasingly costs the most powerful people their jobs, the accountability side of the crux. Directness is 4: an ethics dismissal is not the same as an online shaming campaign, the authors give several causes besides social media, the series stops in 2016 (before #MeToo), and it says nothing about ordinary targets, so it cannot give the ratio the crux asks for. A consulting firm's study, so reliability is 6.",
        },
        {
          id: "ordinary-person-cancelation-cases",
          title: "Some Non-Public Figures Have Faced Severe Consequences",
          description:
            "Individual cases involving lesser-known people illustrate severe professional fallout from online controversy — for example, data analyst David Shor was fired by the progressive consulting firm Civis Analytics in June 2020 after publicizing research by social scientist Omar Wasow finding that violent protests tend to backfire while peaceful ones often succeed. Reason notes the exact reason for the firing was never specified. Such anecdotes show ordinary people can face career consequences with little recourse, but they are selected examples, not a representative sample.",
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
            "Corrected from unverifiable claims: the original '75% conservative vs 15% liberal' comparison and the '91% of Fortune 500 issued DEI statements' figure could not be verified and were removed. CSPI is an advocacy-oriented center, so independence is low. Suggests conformity pressure but does not isolate it from genuine attitude shifts.",
        },
        {
          id: "social-media-mob-dynamics",
          title: "Moral-Emotional Language Amplifies Diffusion of Outrage Online",
          description:
            "Brady, Wills, Jost, Tucker & Van Bavel (PNAS, 2017) analyzed ~563,000 tweets and found that each additional moral-emotional word in a message increased its retweet rate by roughly 20%, helping outrage spread within ideological groups. A 2025 pre-registered replication (849,266 posts) and meta-analysis of 27 studies in PNAS Nexus confirmed the effect but estimated it somewhat smaller: 13% more shares per word across all available data (IRR 1.13, 95% CI 1.06-1.20), and 17% in the replication itself. This illustrates the amplification mechanism behind viral pile-ons, where context is lost and the target experiences the aggregate of many responses at once.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source: "Brady, Wills, Jost, Tucker & Van Bavel, 'Emotion shapes the diffusion of moralized content in social networks,' PNAS 114(28), pp. 7313-7318 (2017); Brady, Rathje, Globig & Van Bavel, 'Estimating the effect size of moral contagion in online networks: A pre-registered replication and meta-analysis,' PNAS Nexus (2025)",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.1618923114",
          reasoning:
            "Peer-reviewed PNAS research; authors were at NYU (the file previously said 'Yale'). The original ~20% per-word effect was partly tempered by the 2025 replication and meta-analysis (17% and 13%), so replicability is moderate. Less direct because it describes the diffusion mechanism rather than measuring specific harm to cancellation targets.",
        },
      ],
    },
  ],
};
