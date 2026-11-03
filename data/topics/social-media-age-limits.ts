export const socialMediaAgeLimitsData = {
  id: "social-media-age-limits",
  title: "Social Media Age Limits",
  question: "Should kids under 16 be banned from social media?",
  meta_claim:
    "Governments should legally bar children under 16 from holding social media accounts, as Australia did in December 2025.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: Australia's under-16 minimum age took effect on
  // 10 December 2025; eSafety reported about 4.7 million accounts removed
  // or restricted in the first weeks (16 January 2026) and, in its first
  // evaluation report (31 July 2026), that the share of under-16s holding an
  // account fell from 52.4% to 42.1%. Indonesia (28 March 2026) and
  // Malaysia (1 June 2026) have similar limits in force. In the US, the
  // Eleventh Circuit on 14 October 2026 let Florida enforce HB3 (no accounts
  // under 14, parental consent at 14-15).
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Since 10 December 2025, Australian law has required social media platforms to keep under-16s off. Platforms removed or restricted about 4.7 million accounts in the first weeks. Three months in, the regulator's own survey found the share of under-16s holding an account had fallen from 52.4% to 42.1%, while 81.5% still used a platform. Other countries are copying the law. The fight is over whether a ban helps children, whether it can be enforced, and who should decide.",
    confidence: 85,
    source:
      "eSafety Commissioner media releases, 'Platforms restrict access to 4.7 million under-16 accounts across Australia' (16 January 2026) and 'Early insights from eSafety's comprehensive evaluation project' (31 July 2026), as distributed by Medianet",
    sourceUrl:
      "https://newshub.medianet.com.au/2026/07/early-insights-from-esafetys-comprehensive-evaluation-project/164211/",
  },
  simple_case: [
    "The answer bears on every family with a child near 16: Indonesia and Malaysia now have similar limits, Britain's prime minister announced one in June 2026, and in October 2026 a US appeals court let Florida enforce its law barring under-14s from accounts.",
    "Three questions carry it: whether keeping under-16s off social media makes them better off, whether a ban can keep them off without checking everyone's age, and whether the age line is the state's call or the parents'. Whether social media caused the teen mental health decline is argued on its own map.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Would keeping under-16s off help them?
    // =========================================================================
    {
      id: "mental-health-impact",
      title: "Would Keeping Under-16s Off Help Them?",
      short_summary:
        "A ban only helps if children are better off without social media. Australia's first evaluation, at three months, found fewer children feeling they were missing out and parents feeling less pressure, while some children said it was harder to keep in touch. The regulator says it is too early to judge, and results will come through 2028.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "There is no good evidence that a blanket ban improves children's mental health, and it takes away things teens value. The National Academies found in 2023 that the research 'did not support the conclusion that social media causes changes in adolescent health at the population level,' and named real benefits, especially for teens who 'otherwise feel excluded or lack offline support,' including LGBTQ+ teens. In Pew's 2024 survey, 74% of US teens said social media makes them feel more connected to their friends. Australia's own first evaluation found some children 'finding it harder to communicate' and feeling less connected to peers, and parents in some groups, particularly of girls and of 10- to 12-year-olds, knew less about what their children were doing online. A ban pushes use out of sight rather than ending it. And the eSafety Commissioner herself says 'it is too early to meaningfully assess whether the policy's intended outcomes have been achieved.'",
      proponent_rebuttal:
        "A ban does not need to settle every question about social media to help. Its main job is to break a trap: no single family can keep a 13-year-old off when every classmate is on. Australia's early results show that trap loosening: three months in, the share of children who felt they were missing out fell from 43.3% to 36.3%, and parents reported less pressure and saw social media as less common among their children's peers. Some children reported 'improved relationships.' The research points to the same ages the law covers: Orben and colleagues found windows of 'developmental sensitivity' when social media use predicted lower life satisfaction the following year, at 11 to 13 for girls and 14 to 15 for boys. Waiting for perfect proof means another cohort goes through those years on the platforms.",
      crux: {
        id: "causal-mechanism-study",
        title: "The Ban Outcome Test",
        question:
          "Do children kept off social media end up better off than children who stay on?",
        description:
          "Australia's ban is the largest test yet. eSafety's two-year evaluation follows more than 4,000 children and families from before the ban, and randomized trials elsewhere are testing months without social media in young teens. Together they can show whether the children kept off are less anxious and depressed, sleep more and feel less left out, or are lonelier and less supervised.",
        methodology:
          "Compare the eSafety cohort's mental health, sleep and social connection before the ban and at 3, 12 and 24 months, by age and sex; compare Australian under-16s with same-age children in countries without a ban; add results from randomized trials that block social media for months in 10- to 15-year-olds.",
        equation:
          "\\Delta MH_{abstain} - \\Delta MH_{control} = \\tau_{causal}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "eSafety's two-year cohort of more than 4,000 Australian children and families, compared with same-age children in countries without a ban on anxiety, depression, sleep and loneliness, alongside randomized trials that block social media for months in young teens.",
        },
        cost_to_verify: "$5-15M (national cohort evaluation plus randomized trials)",
        falsification: {
          supporter_flip:
            "If eSafety's two-year cohort found Australian under-16s no less anxious or depressed than before the ban, and no better off than peers in other countries, while some were lonelier, the main justification for the ban would fail.",
          skeptic_flip:
            "If the cohort found children kept off social media sleeping more and reporting less anxiety, depression and fear of missing out than before the ban and than peers abroad, the claim that a ban cannot help would be hard to hold.",
          common_ground:
            "Both sides agree it is too early to judge Australia's ban, that social media gives some teens real connection and support, and that no family can easily hold out alone when every peer is online.",
          live_disagreement:
            "Whether removing access helps children enough to justify what some of them lose, and whether a ban should wait for proof or act on the risk.",
        },
      },
      evidence: [
        {
          id: "esafety-three-month-evaluation",
          title: "eSafety July 2026: Under-16s Feeling They Were Missing Out Fell From 43.3% to 36.3% After Three Months",
          description:
            "eSafety's first evaluation report, from a two-year study of more than 4,000 children and families run with Stanford University's Social Media Lab, compared a baseline survey before the ban with a follow-up three months after. Children who felt they were missing out fell from 43.3% to 36.3%. Parents reported less pressure and were less likely to see social media use as common among their children's peers. Some children reported 'improved relationships'; others reported 'finding it harder to communicate' or feeling less connected. Parental awareness of children's social media use fell in some groups, particularly girls and 10- to 12-year-olds. eSafety said 'it is too early to meaningfully assess whether the policy's intended outcomes have been achieved.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source:
            "eSafety Commissioner, 'Early insights from eSafety's comprehensive evaluation project' (media release, 31 July 2026), as distributed by Medianet",
          sourceUrl:
            "https://newshub.medianet.com.au/2026/07/early-insights-from-esafetys-comprehensive-evaluation-project/164211/",
          reasoning:
            "The first outcome data from a real ban, with a baseline taken before it began. It is the regulator evaluating its own policy, at three months, on survey measures, and it reports mixed effects on connection, so the weights are moderate.",
        },
        {
          id: "orben-sensitivity-ages",
          title: "Orben et al. 2022: Social Media Use Predicted Lower Life Satisfaction at 11-13 for Girls and 14-15 for Boys",
          description:
            "In longitudinal data on 17,409 people aged 10 to 21, higher estimated social media use predicted lower life satisfaction a year later during specific windows: 'males (14–15 and 19 years old) and females (11–13 and 19 years old).'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Orben, Przybylski, Blakemore & Kievit, 'Windows of developmental sensitivity to social media,' Nature Communications 13: 1649 (28 March 2022)",
          sourceUrl: "https://www.nature.com/articles/s41467-022-29296-3",
          reasoning:
            "Supports drawing an age line in early adolescence. The effects are modest, the measure is life satisfaction, and a window at 19 for both sexes falls outside any age ban.",
        },
        {
          id: "teen-self-report-surveys",
          title: "Pew 2025: 74% of US Teens Say Social Media Makes Them Feel More Connected to Friends",
          description:
            "In Pew's survey of 1,391 US teens and parents, fielded in autumn 2024, 74% of teens said social media makes them feel more connected to friends, and 52% said it helps them feel they have people to support them through tough times (67% in 2022). Fourteen percent said it has a mostly negative effect on them personally, while 48% said it has a mostly negative effect on people their age.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Pew Research Center, 'Teens, Social Media and Mental Health' (22 April 2025)",
          sourceUrl: "https://www.pewresearch.org/internet/2025/04/22/teens-social-media-and-mental-health/",
          reasoning:
            "Shows what a ban takes away in teens' own words. Self-reports of connection are not measures of well-being, and the same survey shows teens increasingly see harm to their peers.",
        },
        {
          id: "nasem-benefits",
          title: "National Academies 2023: No Population-Level Causal Link Shown; Benefits for Teens Who Lack Offline Support",
          description:
            "The National Academies committee's review 'did not support the conclusion that social media causes changes in adolescent health at the population level,' while noting potential harms such as unhealthy social comparison and lost sleep. It listed benefits including connecting friends and family, supporting learning and creative outlets, and value for teens who 'otherwise feel excluded or lack offline support,' including LGBTQ+ teens.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, Social Media and Adolescent Health (2023), Summary",
          sourceUrl: "https://www.nationalacademies.org/read/27396/chapter/2",
          reasoning:
            "The most authoritative review. It predates Australia's ban and the 2025-2026 trial evidence, and it addresses whether social media harms teens, not whether a ban would help.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Can a ban keep them off?
    // =========================================================================
    {
      id: "enforcement-rights",
      title: "Can a Ban Keep Them Off?",
      short_summary:
        "Australian platforms removed or restricted about 4.7 million accounts in the ban's first weeks. Yet three months in, 42.1% of under-16s still held an account and 81.5% still used a platform. Tighter checks mean scanning faces or IDs, for adults as well as children.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Children get around age rules, and the checks that might stop them burden everyone. Most platforms already bar under-13s, yet in 2021, 38% of 8- to 12-year-olds had used social media. Australia's ban has cut account holding only modestly: from 52.4% of under-16s before the law to 42.1% three months after, with use of platforms, logged in or not, falling only from 85.9% to 81.5%. eSafety found most under-16s who had accounts kept them or made new ones. Stopping them would take face scans or ID checks for every user, adults included, creating stores of sensitive data and ending anonymous use. Face estimation still misses by more than a year on average for teenagers, right at the line the law draws. A ban that keeps four in five children on the platforms while adding age checks for everyone has the costs without the benefit.",
      proponent_rebuttal:
        "No age law is airtight, and none needs to be. Underage drinking laws work by changing the default, not by stopping every teenager. Australia's law moved fast: platforms removed or restricted about 4.7 million accounts belonging to under-16s in the first half of December 2025 alone. The account share fell by a fifth in three months, and eSafety put most of the remaining gap down to platforms' failure to implement effective age assurance, a failure the law penalizes; by March 2026 it had opened investigations into Facebook, Instagram, Snapchat, TikTok and YouTube. The technology exists: Yoti reports its face estimation places 13- to 17-year-olds within 1.3 years of their age on average, without keeping an ID, and platforms can ask for more proof only from users near the line. The 13-year minimum has failed because nobody enforces it; Australia's experiment is the first serious attempt to.",
      crux: {
        id: "enforcement-effectiveness",
        title: "The Enforcement Test",
        question:
          "Can age checks keep most under-16s off social media without unacceptable privacy and accuracy costs?",
        description:
          "Count how many under-16s remain on the platforms under each method of checking age, how many adults are wrongly blocked or forced to show ID, and what personal data is collected and kept.",
        methodology:
          "Independent audits of Australia's age assurance across platforms: test accounts at known ages, the share of under-16s still active by method (self-declared age, face estimation, ID, device signals), wrongful blocks of adults by age and ethnicity, and data retention; repeated at 12 and 24 months as enforcement tightens.",
        equation:
          "E_{compliance} = 1 - \\frac{N_{underage\\_active}}{N_{underage\\_total}}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Independent audits of Australia's platforms at 12 and 24 months counting the share of under-16s still holding accounts, the adults wrongly blocked, and the personal data collected and kept, broken down by the age-check method each platform uses.",
        },
        cost_to_verify: "$2M (multi-platform audit study)",
        falsification: {
          supporter_flip:
            "If audits at 12 and 24 months still found most under-16s on the platforms after enforcement action, or found adults routinely forced to hand over ID, the ban would carry its costs without its main benefit.",
          skeptic_flip:
            "If audits found account holding among under-16s falling well below a quarter once platforms were fined into compliance, with few adults wrongly blocked and no ID stored, the claim that a ban cannot be enforced would lose its footing.",
          common_ground:
            "Both sides agree no age check is airtight, that many children already lie about their age, and that strict checks carry privacy costs for adults.",
          live_disagreement:
            "Whether enforcement can tighten enough to keep most under-16s off, and whether the age checks needed are a fair price for adults to pay.",
        },
      },
      evidence: [
        {
          id: "australia-age-verification",
          title: "eSafety January 2026: About 4.7 Million Under-16 Accounts Removed or Restricted in the Ban's First Weeks",
          description:
            "eSafety reported that major social media companies removed or restricted about 4.7 million accounts belonging to users under 16 in the first half of December 2025, after the minimum age took effect on 10 December. It called the figures preliminary, said it was too early to tell whether platforms were fully compliant, noted reports of under-16 accounts still active and that some children may find ways around the rules, and said app downloads of other platforms had spiked without necessarily matching use.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source:
            "eSafety Commissioner, 'Platforms restrict access to 4.7 million under-16 accounts across Australia' (media release, 16 January 2026), as distributed by Medianet",
          sourceUrl:
            "https://newshub.medianet.com.au/2026/01/platforms-restrict-access-to-4-7-million-under-16-accounts-across-australia/135967/",
          reasoning:
            "Shows a ban can force platforms to act at scale. An account count is not a count of children, and the regulator is reporting on its own policy.",
        },
        {
          id: "circumvention-rates",
          title: "eSafety July 2026: 42.1% of Under-16s Still Held an Account Three Months In, Down From 52.4%",
          description:
            "In eSafety's evaluation cohort, the share of under-16s holding a social media account fell from 52.4% before the law to 42.1% three months after, 'a modest but statistically significant decline.' The share using a platform, with or without an account, fell from 85.9% to 81.5%. Most under-16s who had accounts before the rules kept them or created new ones; eSafety cited platforms' failure to implement effective age assurance as the main reason.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source:
            "eSafety Commissioner, 'Early insights from eSafety's comprehensive evaluation project' (media release, 31 July 2026), as distributed by Medianet",
          sourceUrl:
            "https://newshub.medianet.com.au/2026/07/early-insights-from-esafetys-comprehensive-evaluation-project/164211/",
          reasoning:
            "The most direct measure of whether the ban keeps children off, from the regulator itself and against its own interest. It is three months in, before any penalties, so it cannot show where enforcement ends up.",
        },
        {
          id: "coppa-effectiveness",
          title: "Common Sense 2021: 38% of US 8- to 12-Year-Olds Had Used Social Media Despite a 13+ Minimum",
          description:
            "Most platforms set 13 as their minimum age, so tweens are, in Common Sense's words, 'technically not supposed to be using social media.' Its 2021 census found 38% of 8- to 12-year-olds had used social media, up from 31% in 2019, and 18% said they used it every day. The top sites tweens had used were Snapchat (13%), Instagram (10%) and Facebook.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Common Sense Media, 'The Common Sense Census: Media Use by Tweens and Teens, 2021'",
          sourceUrl:
            "https://www.commonsensemedia.org/sites/default/files/research/report/8-18-census-integrated-report-final-web_0.pdf",
          reasoning:
            "Shows how far an unenforced age rule leaks. The US rule relies on self-declared birthdays, so it says more about weak enforcement than about a law with checks and fines.",
        },
        {
          id: "age-verification-tech",
          title: "Yoti 2024: Face Age Estimation Averages 1.3 Years of Error for 13- to 17-Year-Olds",
          description:
            "Yoti, a commercial age-check provider, reports that its facial age estimation has a mean absolute error of 1.3 years for 13- to 17-year-olds and 1.2 years for 6- to 12-year-olds, and that error rates can be pushed down by setting the estimated-age threshold above the legal age and asking those near it for other proof. It acknowledges differences in error between skin tones and genders.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 2,
            replicability: 5,
            directness: 6,
          },
          source: "Yoti, 'Facial Age Estimation White Paper' (September 2024, public version)",
          sourceUrl:
            "https://cdn.aws.yoti.com/wp-content/uploads/2024/11/Yoti-Age-Estimation-White-Paper-September-2024-PUBLIC.pdf",
          reasoning:
            "Shows checks without stored ID are possible. It is the vendor's own figure, and an average error of 1.3 years is large exactly at the 16-year line, which is why near-threshold users must be checked another way.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Who decides? (values and law)
    // =========================================================================
    {
      id: "rights-and-authority",
      title: "Who Sets the Age: Parents or the State?",
      short_summary:
        "Supporters say a law gives parents backing they cannot get alone, as alcohol and driving ages do. Opponents say it overrides parents who want their teens online and makes adults prove their age to speak. In the US, the courts are deciding: in October 2026 a federal appeals court let Florida enforce its ban on accounts for under-14s.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Deciding what a 15-year-old may read and say online is a parent's job, not the state's. A ban overrides the many families who have set their own rules and want their teen in a group chat or a coding forum. In the US it also runs into the First Amendment: a federal judge found Florida's HB3 likely unconstitutional in June 2025, and NetChoice argues it 'violates the First Amendment by forcing Floridians to hand over their personal data' to verify age, 'enhancing the cybersecurity risk for children by making data more vulnerable to hackers and predators.' Age checks for under-16s become age checks for everyone, and with them the end of anonymous speech. The better tools are ones parents control, and design rules that apply to all users.",
      proponent_rebuttal:
        "Societies set ages for alcohol, tobacco, driving and gambling because individual families cannot hold the line alone against products built for mass use. Parents asking for help is not the state overriding them: the law takes away the 'everyone else is on it' pressure. On 14 October 2026 the Eleventh Circuit agreed that Florida may act, holding that HB3 'likely passes First Amendment muster because it is a content-neutral speech regulation that satisfies intermediate scrutiny.' The law, the court wrote, 'regulates social-media platforms based on their functional capabilities and features, not the content they communicate': infinite scrolling, push notifications, autoplay, livestreaming and engagement metrics on algorithmic feeds. Other democracies are reaching the same view: by June 2026 Indonesia and Malaysia had under-16 limits in force, Britain's prime minister had announced one, and Greece's under-15 limit starts in January 2027.",
      crux: {
        id: "who-decides",
        title: "The Authority Question",
        question:
          "Should the law, rather than each family, decide when children can join social media?",
        description:
          "A question of who should hold the power to decide, not of fact. It turns on how much weight to give parents' freedom to choose for their own children, teens' own interests in speech and connection, adults' anonymity, and the collective pressure that no single family can resist. Courts in the US will decide how far the Constitution lets states go; whether they should is a judgment voters make.",
        methodology:
          "No study settles it. What informs it: court rulings on the First Amendment limits of age laws, surveys of what parents want, and evidence from Australia and other countries on whether bans relieve or override parents.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "A judgment about how authority over children's online lives should be shared between parents, teens and the state, informed by US court rulings on HB3 and similar laws and by surveys of what parents want; no measurement decides it.",
          kind: "authority-allocation" as const,
        },
        cost_to_verify: "N/A (question of authority)",
        falsification: {
          supporter_flip:
            "If Australian and Florida parents reported that the law overrode their own choices more than it relieved pressure on them, and safer design rules for all users proved enough, the case for a state age line would weaken.",
          skeptic_flip:
            "If parents in places with bans overwhelmingly reported the law helped them hold a line they could not hold alone, and courts found the age checks did not burden adults' speech, the objection that the state is overriding families would lose force.",
          common_ground:
            "Both sides agree parents should have a strong say over their children's online lives, and that platforms are designed to keep users on as long as possible.",
          live_disagreement:
            "Whether the state should draw the age line for everyone, or leave it to each family with better tools, and how much adults' privacy and speech should give way to protect children.",
        },
      },
      evidence: [
        {
          id: "eleventh-circuit-hb3",
          title: "Eleventh Circuit, 14 October 2026: Florida's Under-14 Ban 'Likely Passes First Amendment Muster'",
          description:
            "HB3 requires platforms that use 'addictive features' to bar anyone under 14 from creating an account and anyone under 16 from doing so without parental consent. A district court had found it likely unconstitutional and blocked it. Writing for a panel of Judges Newsom, Luck and Tjoflat, Judge Newsom held that HB3 'likely passes First Amendment muster because it is a content-neutral speech regulation that satisfies intermediate scrutiny,' because it 'regulates social-media platforms based on their functional capabilities and features, not the content they communicate.' The court reversed the injunction as applied to the challengers' members and vacated it as to the facial challenge.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source:
            "Computer & Communications Industry Association v. Uthmeier, No. 25-11881 (11th Cir. 14 October 2026), opinion as posted by the Electronic Frontier Foundation",
          sourceUrl: "https://www.eff.org/files/2026/10/21/2026-10-14_opinion_dckt_94_0.pdf",
          reasoning:
            "The most important US ruling yet on age limits. It decides what the Constitution likely allows, not whether a ban is wise, it is at the preliminary-injunction stage, and challenges to similar laws in other states are still being litigated.",
        },
        {
          id: "netchoice-hb3",
          title: "NetChoice 2025: Florida's Law Forces Users to 'Hand Over Their Personal Data' to Speak",
          description:
            "Responding to the Eleventh Circuit's November 2025 order letting Florida enforce HB3 during the appeal, the tech trade group NetChoice said the law 'violates the First Amendment by forcing Floridians to hand over their personal data,' is 'enhancing the cybersecurity risk for children by making data more vulnerable to hackers and predators,' and 'makes all users–especially minors–less safe.' A federal district court had blocked the law on 3 June 2025.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source:
            "NetChoice, 'NetChoice Disappointed in 11th Circuit's Ruling Allowing Florida to Enforce Its ID-for-Speech Law' (25 November 2025)",
          sourceUrl:
            "https://netchoice.org/netchoice-disappointed-in-11th-circuits-ruling-allowing-florida-to-enforce-its-id-for-speech-law/",
          reasoning:
            "The rights objection in the words of its main litigant. NetChoice represents the platforms the law regulates, so independence is low, and its data-risk claim is an argument, not a measured harm.",
        },
        {
          id: "global-age-limits",
          title: "Gulf News June 2026: Indonesia and Malaysia Have Under-16 Limits in Force; UK Announced One",
          description:
            "As of 18 June 2026, Gulf News listed under-16 limits in force in Australia (December 2025), Indonesia (28 March 2026) and Malaysia (registration restricted from 1 June 2026). Britain's prime minister announced an under-16 limit on 15 June 2026; Türkiye's parliament passed an under-15 limit in April 2026; Greece's under-15 limit is scheduled from 1 January 2027; and the UAE set an under-15 limit by Cabinet decision. Proposals were under way in France, Spain, Norway, Denmark and Canada.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 3,
          },
          source:
            "Gulf News, 'UAE latest country to ban social media for under-15s: Full list of nations leading the crackdown' (updated 18 June 2026)",
          sourceUrl:
            "https://gulfnews.com/technology/uae-latest-country-to-ban-social-media-for-under-15s-full-list-of-nations-leading-the-crackdown-1.500575457",
          reasoning:
            "Shows how fast governments are adopting age limits. That many countries act says what voters want, not whether bans work, so directness is low.",
        },
      ],
    },
  ],
  aliases: [
    "Should children under 16 be legally barred from social media?",
    "Australia social media ban for under-16s",
    "Should there be a minimum age for social media?",
  ],
  references: [
    {
      title: "Early insights from eSafety's comprehensive evaluation project - eSafety Commissioner (31 July 2026)",
      url: "https://newshub.medianet.com.au/2026/07/early-insights-from-esafetys-comprehensive-evaluation-project/164211/",
    },
    {
      title: "Online Safety Amendment (Social Media Minimum Age) Act 2024 - Federal Register of Legislation (Australia)",
      url: "https://www.legislation.gov.au/C2024A00127/asmade/text",
    },
    {
      title: "CCIA v. Uthmeier, No. 25-11881 - US Court of Appeals for the Eleventh Circuit (14 October 2026)",
      url: "https://www.eff.org/files/2026/10/21/2026-10-14_opinion_dckt_94_0.pdf",
    },
    {
      title: "Teens, Social Media and Mental Health - Pew Research Center (22 April 2025)",
      url: "https://www.pewresearch.org/internet/2025/04/22/teens-social-media-and-mental-health/",
    },
  ],
};
