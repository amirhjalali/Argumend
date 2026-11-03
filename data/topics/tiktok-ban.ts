export const tiktokBanData = {
  id: "tiktok-ban",
  title: "The TikTok Ban and Sale",
  question:
    "Was TikTok's Chinese ownership a big enough threat to force a sale?",
  meta_claim:
    "TikTok's Chinese ownership was a real national-security threat, and forcing ByteDance to sell TikTok's U.S. business was justified.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: the ban-or-sell law took effect on 19 January
  // 2025 and was not enforced; Executive Order 14352 (25 September 2025)
  // declared the joint-venture framework a qualified divestiture; the
  // TikTok USDS Joint Venture took over the U.S. app in January 2026, with
  // ByteDance keeping 19.9%. Investors petitioned the D.C. Circuit on 5 March
  // 2026 that the deal breaks the law; OLC cleared TikTok for federal phones
  // (memorialized 16 July 2026); TikTok withdrew from a 15 September House
  // China committee roundtable on the algorithm.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In January 2026 TikTok's U.S. app passed to a joint venture led by Oracle, Silver Lake and MGX, a year after the deadline in the ban-or-sell law the Supreme Court upheld 9-0. ByteDance kept 19.9%. The venture says it will retrain the recommendation algorithm ByteDance built on U.S. data, inside Oracle's cloud. The fight is over whether the threat was real enough to force a sale, and whether this sale removed it.",
    confidence: 90,
    source:
      "TikTok Newsroom, 'Announcement from the new TikTok USDS Joint Venture LLC' (23 January 2026); TikTok Inc. v. Garland, 604 U.S. ___ (17 January 2025)",
    sourceUrl:
      "https://newsroom.tiktok.com/announcement-from-the-new-tiktok-usds-joint-venture-llc?lang=en",
  },
  simple_case: [
    "About 170 million Americans use TikTok. The answer decides how far Washington can go against a foreign-owned app that many of them use to speak, sell and follow the news, and whether this deal becomes the template for the next app it calls a threat.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The threat — what Beijing could reach through TikTok
    // =========================================================================
    {
      id: "data-privacy-national-security",
      title: "The Threat: What Could Beijing Reach?",
      short_summary:
        "Leaked meetings and an EU fine show staff in China reached Western users' data. The government told the courts it had no specific intelligence that Beijing had made TikTok manipulate U.S. content. The dispute is whether a risk that large needed proof of abuse before acting.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The public case was a list of possibilities. In court, the government acknowledged it lacked specific intelligence showing that China had ever coerced TikTok into manipulating content in the United States. TikTok spent years negotiating a security agreement with CFIUS: U.S. data in Oracle's cloud, Oracle inspecting the source code, and a government 'kill switch'. The D.C. Circuit itself had 'no doubt' that plan would reduce the risk. American data brokers sell sensitive records on service members for as little as 12 cents each, so singling out one app did little for Americans' data. If privacy was the worry, a privacy law covering every company was the answer, not a forced sale of one.",
      proponent_rebuttal:
        "The record shows access, not just possibility. In leaked recordings of more than 80 internal TikTok meetings, staff said engineers in China could see U.S. user data, one saying 'Everything is seen in China.' In 2025 Ireland's privacy regulator fined TikTok €530 million after finding that staff in China remotely accessed European users' data, and TikTok admitted that some European data had sat on servers in China despite telling regulators it did not. ByteDance answers to Chinese laws requiring companies to assist state security work, and a Communist Party committee of at least 138 employees sat inside its Beijing office as of 2022. The government told the courts that ByteDance had censored content outside China at Beijing's demand. You do not wait for a hostile government to use a lever that size before taking it away.",
      crux: {
        id: "data-access-evidence",
        title: "The Access Test",
        question:
          "Before the sale, could Beijing get at Americans' TikTok data or steer their feeds?",
        description:
          "Decide whether ByteDance's staff in China, and through them the Chinese state, could reach U.S. users' data or the recommendation engine before the 2026 sale, and whether TikTok's own safeguards had closed those routes. The 2022 leaks and the Irish fine show access by staff; the government's sealed evidence on state direction has not been tested in public.",
        methodology:
          "Compare what is on the public record: the 2022 BuzzFeed recordings, the Irish Data Protection Commission's 2025 decision on EEA data transfers, and the D.C. Circuit's summary of the government's classified and unclassified filings. Set them against TikTok's proposed National Security Agreement with CFIUS and what Oracle's source-code review covered. Declassification of the government's sealed annex, or an independent audit of who in China could access U.S. data and the engine before January 2026, would add the missing piece.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Declassified intelligence, or an independent audit of TikTok's access logs and code before January 2026, showing whether China-based staff reached U.S. user data or the recommendation engine, and whether any request came from the Chinese state.",
        },
        cost_to_verify:
          "Not costed here; it turns on declassification decisions and access to TikTok's internal logs.",
        falsification: {
          supporter_flip:
            "If declassified records or an audit of TikTok's logs showed China-based staff could not reach U.S. user data or the recommendation engine after Project Texas, and no request ever came from the Chinese state, the case for forcing a sale would rest on a risk the safeguards had closed.",
          skeptic_flip:
            "If declassified records showed Chinese officials asking ByteDance for U.S. user data or for changes to Americans' feeds, and staff in China able to carry them out, the charge that the threat was speculative would fail.",
          common_ground:
            "Leaked 2022 recordings and the Irish regulator's 2025 decision show staff in China reached data on users outside China, and the government told the courts it had no specific intelligence that Beijing had directed TikTok's U.S. content.",
          live_disagreement:
            "Whether proven access by ByteDance staff, plus Chinese law and a Party committee inside the company, made the risk serious enough to act on without evidence that Beijing had used it in the United States.",
        },
      },
      evidence: [
        {
          id: "buzzfeed-leaked-meetings",
          title: "Leaked recordings of 80+ TikTok meetings: engineers in China accessed U.S. user data, Sept 2021 to Jan 2022",
          description:
            "BuzzFeed News reviewed audio from more than 80 internal TikTok meetings. It counted 14 statements from nine employees indicating that engineers in China had access to U.S. user data between September 2021 and January 2022. A member of the trust and safety team said in September 2021: 'Everything is seen in China.' A director called a Beijing-based engineer a 'Master Admin' who 'has access to everything.' TikTok said it was working to remove doubt about the security of U.S. data.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "Emily Baker-White, 'Leaked Audio From 80 Internal TikTok Meetings Shows That US User Data Has Been Repeatedly Accessed From China', BuzzFeed News (17 June 2022)",
          sourceUrl:
            "https://www.buzzfeednews.com/article/emilybakerwhite/tiktok-tapes-us-user-data-china-bytedance-access",
          reasoning:
            "Employees' own words, recorded inside the company, so directness is high. It shows engineers could reach the data, not that the Chinese state asked for it. It covers a period before TikTok finished moving U.S. data to Oracle, and the recordings are not public, so replicability is 5.",
        },
        {
          id: "irish-dpc-china-transfers",
          title: "Ireland fines TikTok €530 million: staff in China accessed European users' data (May 2025)",
          description:
            "On 2 May 2025 Ireland's Data Protection Commission fined TikTok €530 million for transferring European users' data to China. It found that data stored in Singapore and the United States was accessed remotely by staff in China, and that TikTok 'failed to verify, guarantee and demonstrate' that the data was protected to EU standards. TikTok's own assessment had flagged Chinese laws, including the National Intelligence Law, that diverge from EU standards. TikTok had told the inquiry it did not store European data on servers in China; in April 2025 it disclosed that it had found in February that limited European data had been stored there.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "Irish Data Protection Commission, announcement of its €530 million fine on TikTok and corrective order over transfers of EEA user data to China (2 May 2025)",
          sourceUrl:
            "https://www.dataprotection.ie/en/news-media/latest-news/irish-data-protection-commission-fines-tiktok-eu530-million-and-orders-corrective-measures-following",
          reasoning:
            "A regulator's finding after a formal inquiry, about the company's own transfers, so reliability and independence are high. It concerns European users and a privacy law, not U.S. users or state requests, so directness is 6. The misstatement about servers in China bears on how far TikTok's assurances could be trusted.",
        },
        {
          id: "bytedance-ccp-committee",
          title: "A Party committee of at least 138 ByteDance employees, and a state board seat at its main Chinese unit",
          description:
            "The D.C. Circuit, summarizing the government's filings, said a Chinese Communist Party committee 'embedded in ByteDance' was, as of 2022, 'headed by the company's chief editor and comprised at least 138 employees at its Beijing office, including senior company managers.' In April 2021 a firm owned by state entities, WangTouZhongWen, bought 1% of Beijing ByteDance Technology, ByteDance's key Chinese unit, and with it the right to appoint a director; ByteDance said the unit relates only to China-market platforms and the deal gave the state no stake in TikTok. The government also told the courts that 'ByteDance and TikTok Global have taken action in response to PRC demands to censor content outside of China.' In April 2018 regulators shut ByteDance's joke app Neihan Duanzi, and founder Zhang Yiming apologized that its content went 'against core socialist values'.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "TikTok Inc. v. Garland, No. 24-1113 (D.C. Cir. 6 December 2024), slip op. at 37 and 48; Euronews (16 August 2021) on the state stake in Beijing ByteDance Technology; TechNode (11 April 2018) on Zhang Yiming's apology",
          sourceUrl:
            "https://media.cadc.uscourts.gov/opinions/docs/2024/12/24-1113-2088317.pdf",
          reasoning:
            "The committee figure comes from the government's own filings as the court summarized them, so independence is 6. The board seat is in a Chinese unit that ByteDance says does not run TikTok. Together they show the state's reach into the parent company, not an order to TikTok's U.S. arm.",
        },
        {
          id: "china-national-intelligence-law",
          title: "Supreme Court: ByteDance is subject to Chinese laws requiring it to 'assist or cooperate' with intelligence work",
          description:
            "The Supreme Court's January 2025 opinion accepted the government's account that ByteDance is 'subject to Chinese laws that require it to assist or cooperate with the Chinese Government's intelligence work' and give the government 'the power to access and control private data' the company holds. The D.C. Circuit's opinion lists China's 2015 National Security Law and 2017 Cybersecurity Law among these. The Court also noted the government's account that ByteDance trains the recommendation algorithm, 'developed and maintained in China', on the data it collects, and had declined to stop sending U.S. user data to China for that purpose.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source:
            "TikTok Inc. v. Garland, 604 U.S. ___ (17 January 2025), per curiam, at 2 and 18-19; TikTok Inc. v. Garland (D.C. Cir. 2024), slip op. at 36",
          sourceUrl: "https://www.supremecourt.gov/opinions/24pdf/24-656_ca7d.pdf",
          reasoning:
            "The laws are public and the Court relied on them. A legal duty to cooperate shows what Beijing could demand, not that it did, so directness is 6. Scholars dispute how far Chinese law is enforced against firms abroad.",
        },
        {
          id: "no-public-evidence-government-access",
          title: "The government told the courts it had no specific intelligence that China had made TikTok manipulate U.S. content",
          description:
            "The D.C. Circuit wrote that 'the Government acknowledges that it lacks specific intelligence that shows the PRC has in the past or is now coercing TikTok into manipulating content in the United States.' The court gave weight to the government's prediction that TikTok 'would try to comply' if asked, calling it an 'informed judgment', and said the lack of evidence 'may simply reflect limitations on its ability to monitor TikTok.' Part of the government's case was filed under seal and has not been made public.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "TikTok Inc. v. Garland, No. 24-1113 (D.C. Cir. 6 December 2024), slip op. at 48",
          sourceUrl:
            "https://media.cadc.uscourts.gov/opinions/docs/2024/12/24-1113-2088317.pdf",
          reasoning:
            "The government's own admission, recorded by the court that ruled for it, so it is the strongest card for the view that the content threat was a forecast. It speaks to content manipulation in the U.S., not to data access, and it cannot rule out what the sealed filings contain.",
        },
        {
          id: "project-texas-investment",
          title: "TikTok's 2022 security plan put U.S. data and code review with Oracle; the court had 'no doubt' it would reduce the risk",
          description:
            "In 2021 and 2022 TikTok negotiated a National Security Agreement with CFIUS: at least 14 meetings or calls, nine written presentations and 15 email exchanges. Its last proposal, in August 2022, created a U.S. entity insulated from ByteDance, split U.S. data into tiers to limit what ByteDance could see, gave Oracle the right to inspect the source code including the recommendation engine, and gave the government a 'kill switch'. The government rejected it, judging that some U.S. data would still flow to China and that it could not monitor compliance. The D.C. Circuit wrote: 'We have no doubt, and the Government has never denied, that TikTok's proposed NSA would mitigate the Government's concerns to some extent.' TikTok's own declarants said ByteDance would remain 'completely in control of developing the Source Code' including the recommendation engine.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "TikTok Inc. v. Garland, No. 24-1113 (D.C. Cir. 6 December 2024), slip op. at 14-16, 41 and 48",
          sourceUrl:
            "https://media.cadc.uscourts.gov/opinions/docs/2024/12/24-1113-2088317.pdf",
          reasoning:
            "Shows a less drastic option was on the table and that the government agreed it would help, which is the heart of the case against forcing a sale. The same record says ByteDance would still have written the code, which is why the government rejected it, so the card cuts both ways.",
        },
        {
          id: "us-data-broker-hypocrisy",
          title: "Duke 2023: data brokers sold sensitive records on U.S. service members for as little as $0.12 each",
          description:
            "Researchers at Duke's Sanford School bought 'sensitive, non-public, individually identified' data on active-duty service members, their families and veterans, including health, financial and religious information, for 'as low as $0.12 per record.' They bought through .org and .asia domains and found brokers' checks on buyers 'inconsistent', including for customers outside the United States. Congress passed a separate data-broker law in the same April 2024 bill as the TikTok law, barring brokers from selling Americans' sensitive data to foreign-adversary countries.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Justin Sherman et al., 'Data Brokers and the Sale of Data on U.S. Military Personnel', Duke Sanford School of Public Policy (November 2023); TikTok Inc. v. Garland (D.C. Cir. 2024), slip op. at 16",
          sourceUrl:
            "https://techpolicy.sanford.duke.edu/data-brokers-and-the-sale-of-data-on-us-military-personnel/",
          reasoning:
            "Shows Americans' data was easy for any buyer to get, which weakens the claim that TikTok was the decisive leak. Directness is 5: other leaks do not show TikTok was safe, and Congress did act on brokers in the same bill.",
        },
        {
          id: "allied-government-device-bans",
          title: "The U.S., the European Commission, Canada and Denmark barred TikTok from official phones (2022-2023)",
          description:
            "By March 2023 the White House had given federal agencies 30 days to remove TikTok from government phones under the No TikTok on Government Devices Act, passed in December 2022. The European Commission banned it from staff phones, and Canada and Denmark moved to block it on government devices. Officials cited the risk that ByteDance could pass user data to Chinese authorities. Fortune noted there was no public evidence TikTok had done so.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 9,
            directness: 4,
          },
          source:
            "Fortune (1 March 2023) on the U.S., EU and Canadian government-device bans",
          sourceUrl:
            "https://fortune.com/2023/03/01/why-tiktok-banned-government-phones-us-eu-canada/",
          reasoning:
            "Several allied governments reached the same judgment for their own devices, which suggests the concern was not only American politics. A rule for official phones is far narrower than a forced sale, so directness is 4.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Speech — what a ban would have cost users
    // =========================================================================
    {
      id: "free-speech-rights",
      title: "Speech: The First Amendment Cost",
      short_summary:
        "The Supreme Court upheld the law 9-0 on the data rationale alone, under intermediate scrutiny. Critics say the law's real target was what Americans see, which should have meant strict scrutiny. The practical test is what users would lose if the app went dark.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Forcing a sale under threat of a ban burdens the speech of 170 million Americans and of TikTok itself, which picks what its users see. Justice Sotomayor wrote that precedent 'leaves no doubt' the law implicates the First Amendment. Justice Gorsuch had 'serious reservations' that it was content neutral, and warned: 'One man's covert content manipulation is another's editorial discretion.' When the app went dark on 18 January 2025, users lost it overnight. A TikTok-commissioned study counted more than seven million U.S. businesses on the platform. A law aimed partly at what Americans watch should have faced strict scrutiny, as the Harvard Law Review's case note argues.",
      proponent_rebuttal:
        "The law regulates who owns the app, not what anyone says. Every user stayed free to post the same video on Instagram Reels, YouTube Shorts or anywhere else, and Congress offered a sale that kept TikTok running, which is what happened. The Supreme Court held 9-0 that the data concern alone justified the law, so it never had to rely on the content argument. India is the closest test of a real ban: after it blocked TikTok in 2020, YouTube and Instagram grew their Indian audiences into their largest anywhere, and by October 2021 home-grown short-video apps counted more users than TikTok had. Speech moved; it did not vanish.",
      crux: {
        id: "first-amendment-precedent",
        title: "The Platform Substitutability Test",
        question:
          "If TikTok had gone dark, could its users have rebuilt their audiences on Reels and Shorts?",
        description:
          "If users and creators can carry their audiences, reach and income to other apps, a ban or forced sale costs little speech, and the law reads as an ownership rule. If TikTok's feed reaches people other apps do not, losing it removes a distinct forum, and the First Amendment cost is real. India's 2020 ban is the one large natural experiment.",
        methodology:
          "Track a sample of creators across sizes and categories from India's June 2020 ban: followers, views and income on TikTok before, and on YouTube Shorts, Instagram Reels and local apps after. Do the same for U.S. creators across the 18-19 January 2025 shutdown. Report the share who regained their reach within a year, by creator size, not only platform-wide user totals.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Creator-level tracking from India's 2020 ban: the share of TikTok creators, by audience size, who regained their followers and income on Shorts, Reels or local apps within a year, beside platform-wide user counts.",
        },
        cost_to_verify:
          "Not costed here; it needs creator-level data from platforms or analytics firms.",
        falsification: {
          supporter_flip:
            "If creator-level data from India showed most TikTok creators, especially small ones, never regained their reach or income on other apps, the law would have threatened a distinct forum, and 'no one is silenced' would not hold.",
          skeptic_flip:
            "If tracking showed most Indian creators, small ones included, regained their audiences and income on Shorts, Reels or local apps within a year, the speech cost of losing TikTok would look modest and the ownership reading of the law stronger.",
          common_ground:
            "The Supreme Court upheld the law unanimously in January 2025 on the data rationale, under intermediate scrutiny, and about 170 million Americans use TikTok to post, sell and watch.",
          live_disagreement:
            "Whether TikTok is one channel among many, so a ban or sale only changes the owner, or a forum other apps cannot replace, so forcing it out burdens Americans' speech in a way the Court underweighed.",
        },
      },
      evidence: [
        {
          id: "scotus-upholds-ban",
          title: "Supreme Court, 9-0 (January 2025): the data concern alone sustains the law",
          description:
            "On 17 January 2025 the Supreme Court upheld the Protecting Americans from Foreign Adversary Controlled Applications Act in a per curiam opinion. It treated the law as content neutral and applied intermediate scrutiny: 'we find the Government's data collection justification sufficient to sustain the challenged provisions.' It did not rule on the government's second rationale, preventing covert content manipulation. It also wrote that 'for more than 170 million Americans, TikTok offers a distinctive and expansive outlet for expression, means of engagement, and source of community.'",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source:
            "TikTok Inc. v. Garland, 604 U.S. ___ (17 January 2025), per curiam, at 19-20",
          sourceUrl: "https://www.supremecourt.gov/opinions/24pdf/24-656_ca7d.pdf",
          reasoning:
            "Settles the law's constitutionality as applied to TikTok. It does not settle the policy question, and the Court's own words grant that TikTok is a distinct outlet, so directness is 8, not 10.",
        },
        {
          id: "india-creators-rebuilt-on-shorts-reels",
          title: "TIME 2025: after India's 2020 ban, many creators rebuilt on YouTube Shorts; one went from 40,000 to over 6 million followers",
          description:
            "India blocked TikTok in June 2020, when it was TikTok's biggest market outside China with 200 million users. TIME reported in January 2025 that 'many Indian content creators found instant success with Shorts': Dushyant Kukreja grew his YouTube following from 40,000 to over 6 million. India is now the largest market for both YouTube, with almost 500 million monthly users, and Instagram, with 362 million. The same report says 'most of the Indian-based TikTok alternatives folded.'",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source:
            "Andrew R. Chow, 'Here's What Happened When India Banned TikTok in 2020', TIME (18 January 2025)",
          sourceUrl: "https://time.com/7208112/what-happened-when-india-banned-tiktok",
          reasoning:
            "The closest real case, but journalism built on platform totals and success stories, not a tracked sample of creators, so it cannot say what share kept their reach. India's market and law differ from the U.S. Platform growth shows viewers moved, not that each creator's audience did.",
        },
        {
          id: "india-tiktok-ban-2020-outcomes",
          title: "Redseer 2021: India's short-video apps reached 230-250 million monthly users, about 32% more than TikTok had at the ban",
          description:
            "In an October 2021 report, the consultancy Redseer estimated that short-video platforms in India had 230-250 million monthly active users, about 32% more than TikTok's 170 million at the time of the ban. It named Josh, Roposo, Moj and MX TakaTak. Short-video advertising was still under 1% of India's digital ad spend, so creators' earnings had not caught up with the audience.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "Business Today, 'Home-grown players clock 32% more userbase than TikTok: Redseer report' (21 October 2021)",
          sourceUrl:
            "https://www.businesstoday.in/technology/news/story/home-grown-players-clock-32-more-userbase-than-tiktok-redseer-report-310071-2021-10-21",
          reasoning:
            "Shows India's audience for short video recovered within about 16 months. It is a consultancy estimate reported secondhand, uses a different base (170 million) from TIME's 200 million, and says little about creators' income, which it reports was still small.",
        },
        {
          id: "sotomayor-dissent-precedent",
          title: "Gorsuch: 'serious reservations' that the law is content neutral; Sotomayor: it plainly burdens speech",
          description:
            "No justice dissented, but two wrote separately. Justice Sotomayor said precedent 'leaves no doubt' the law implicates the First Amendment, because it 'bars any entity from distributing TikTok's speech in the United States, unless TikTok undergoes a qualified divestiture.' Justice Gorsuch wrote that he harbored 'serious reservations about whether the law before us is content neutral', welcomed the Court's refusal to rely on covert content manipulation, since 'One man's covert content manipulation is another's editorial discretion', and noted the Court had 'a fortnight' to decide.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source:
            "TikTok Inc. v. Garland, 604 U.S. ___ (2025), Sotomayor, J., concurring in part and in the judgment; Gorsuch, J., concurring in the judgment",
          sourceUrl: "https://www.supremecourt.gov/opinions/24pdf/24-656_ca7d.pdf",
          reasoning:
            "Two justices who voted to uphold the law said its speech burden is real and its content rationale troubling. Both still upheld it, so this shows the speech cost was recognized, not that it outweighed the security case.",
        },
        {
          id: "first-amendment-content-neutrality",
          title: "Harvard Law Review (Nov 2025): the Court should have applied strict scrutiny",
          description:
            "The Harvard Law Review's case note argues the Court wrongly let a law with a content-based purpose get intermediate scrutiny because Congress also had a content-neutral reason. 'Generally, the existence of any content-based rationale calls for strict scrutiny,' it says, and the ruling's approach 'grants judicial approval to government suppression of speech.' Part of the government's stated aim was to stop a foreign power shaping what Americans see in their feeds.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "'TikTok Inc. v. Garland', Leading Cases, 139 Harv. L. Rev. 280 (November 2025)",
          sourceUrl: "https://harvardlawreview.org/print/vol-139/tiktok-inc-v-garland/",
          reasoning:
            "A student-edited case note in the leading law review, stating the strongest doctrinal objection. It argues about the standard of review; it does not change the ruling or measure any speech loss.",
        },
        {
          id: "tiktok-brief-darkness-january-2025",
          title: "TikTok went dark for U.S. users on the night of 18 January 2025 and came back the next day",
          description:
            "On Saturday night, 18 January 2025, hours before the law's deadline, TikTok stopped working in the United States. Users saw: 'Sorry, TikTok isn't available right now.' On Sunday it began restoring service after President-elect Trump said his executive order would 'extend the period of time before the law's prohibitions take effect' and promised 'no liability for any company that helped keep TikTok from going dark.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 5,
          },
          source:
            "PBS NewsHour (AP), 'Americans lose access to TikTok as U.S. ban takes effect and app goes dark' (18-19 January 2025)",
          sourceUrl:
            "https://www.pbs.org/newshour/politics/americans-lose-access-to-tiktok-as-u-s-ban-takes-effect-and-app-goes-dark",
          reasoning:
            "The one day Americans saw what a ban looks like. It lasted under a day, so it shows the disruption is real and immediate, not how much speech would be lost over months.",
        },
        {
          id: "creator-economic-impact",
          title: "TikTok-commissioned study: 7 million+ U.S. businesses on TikTok, $24.2 billion of GDP in 2023",
          description:
            "A study by Oxford Economics, commissioned by TikTok, estimated that small and mid-sized businesses' use of TikTok contributed $24.2 billion to U.S. GDP in 2023 and supported more than 224,000 jobs. TikTok says 'more than seven million businesses' in the U.S. use the platform.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 5,
            directness: 5,
          },
          source:
            "TikTok Newsroom, 'TikTok's economic impact on US small and mid-sized businesses' (13 March 2024), on the Oxford Economics study it commissioned",
          sourceUrl: "https://newsroom.tiktok.com/tiktok-economic-impact-report-2024-smb?lang=en",
          reasoning:
            "Paid for by the company with the most at stake, so independence is 3. A business using TikTok is not the same as depending on it; the study does not say how much of that activity would move to other apps.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: The sale — did the 2026 deal cut ByteDance out?
    // =========================================================================
    {
      id: "divestiture-deal",
      title: "The Sale: Did the Deal Cut ByteDance Out?",
      short_summary:
        "The law bars any 'operational relationship' with ByteDance over the recommendation algorithm. The January 2026 venture retrains a ByteDance-built algorithm on U.S. data in Oracle's cloud, and ByteDance keeps 19.9%, just under the law's 20% line. Whether that is a clean break or a rental is now the live fight.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The sale changed the owners on paper, not the engine. Under the deal the venture got a licensed copy of ByteDance's recommendation algorithm; ByteDance still owns it, keeps 19.9%, and its global TikTok business still runs advertising, e-commerce and marketing for U.S. users. Shou Chew, CEO of ByteDance-owned global TikTok, sits on the venture's board. The law forbids any 'operational relationship' allowing 'cooperation with respect to the operation of a content recommendation algorithm'. Investors have asked the D.C. Circuit to rule the deal illegal, and in September 2026 TikTok backed out of a House China committee session on exactly this question. The President waived the law's deadline for a year and then chose the buyers. The law's authors on the House China committee say their questions are unanswered, and in January 2026 California's governor opened a review into claims that the new venture suppressed posts critical of the President.",
      proponent_rebuttal:
        "The forced sale did what years of negotiation could not. ByteDance went from owning TikTok outright to a 19.9% stake with one of seven board seats. U.S. data now sits in Oracle's cloud, the venture retrains, tests and updates the recommendation algorithm on U.S. data, and it controls content moderation and trust and safety. The Justice Department's Office of Legal Counsel concluded in 2026 that the venture 'functions independently of ByteDance' and has revised the algorithm and security program enough that federal employees may now use TikTok on government phones. TikTok kept running for its 170 million American users, so the law removed the foreign owner without silencing anyone. That is the outcome the law was written to force.",
      crux: {
        id: "bytedance-severance-test",
        title: "The Severance Test",
        question:
          "Does the new TikTok cut ByteDance out of the algorithm, or rent ByteDance's algorithm under new owners?",
        description:
          "The law treats a sale as qualified only if it ends any operational relationship between the U.S. app and ByteDance, including cooperation on the recommendation algorithm. The venture licenses an algorithm ByteDance built and says it retrains it on U.S. data. Whether that ends ByteDance's influence depends on what the licence lets ByteDance change, see or update, which has not been published.",
        methodology:
          "Obtain the licence and services agreements between the venture and ByteDance, by court order in the pending D.C. Circuit petition or through congressional oversight. Have independent engineers check whether model updates, code or training methods still flow from ByteDance to the U.S. app, whether ByteDance staff can access U.S. systems, and what the global TikTok business that runs U.S. advertising and e-commerce can see.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Publication of the venture's algorithm licence and services agreements with ByteDance, and an independent code and access audit of whether model updates or data still pass between ByteDance and the U.S. app.",
        },
        cost_to_verify:
          "Not costed here; it needs the venture's agreements, which are not public.",
        falsification: {
          supporter_flip:
            "If the licence or an audit showed ByteDance still ships model or code updates to the U.S. app, or that its staff can see U.S. data through the advertising and e-commerce business, the sale would not have removed the risk that justified forcing it.",
          skeptic_flip:
            "If the agreements and an independent audit showed the venture writes its own model updates, ByteDance staff have no access to U.S. systems, and the advertising business gets no U.S. user data beyond what ads need, the 'rental' charge would fail and the forced sale would have done its job.",
          common_ground:
            "The venture retrains the recommendation algorithm on U.S. data in Oracle's cloud, ByteDance keeps 19.9% and one board seat, and the terms of the algorithm licence have not been made public.",
          live_disagreement:
            "Whether a licensed, retrained copy of ByteDance's algorithm under majority-American owners is the clean break the law demands, or keeps the operational tie the law forbids while handing the feed to investors chosen by the White House.",
        },
      },
      evidence: [
        {
          id: "forced-sale-preserves-competition",
          title: "January 2026 deal: ByteDance cut to 19.9%; the venture retrains the algorithm on U.S. data in Oracle's cloud",
          description:
            "TikTok USDS Joint Venture LLC is 80.1% owned by American and global investors. Oracle, Silver Lake and MGX hold 15% each; ByteDance holds 19.9%. The venture says it 'will retrain, test, and update the content recommendation algorithm on U.S. user data', keeps U.S. data in Oracle's U.S. cloud with third-party audits, reviews source code with Oracle as its 'Trusted Security Partner', and has 'decision-making authority for trust and safety policies and content moderation.' Its seven-member board is described as majority American. TikTok's global business keeps 'global product interoperability and certain commercial activities, including e-commerce, advertising, and marketing.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 6,
            directness: 8,
          },
          source:
            "TikTok Newsroom, 'Announcement from the new TikTok USDS Joint Venture LLC' (23 January 2026); RNZ, 'TikTok seals deal for new US joint venture to avoid American ban' (23 January 2026)",
          sourceUrl:
            "https://www.rnz.co.nz/news/world/584839/tiktok-seals-deal-for-new-us-joint-venture-to-avoid-american-ban",
          reasoning:
            "The deal's own terms, and the main evidence that the sale changed control. Independence is 4 because the terms come from the venture itself and the business relationships with ByteDance have not been disclosed, as RNZ notes.",
        },
        {
          id: "olc-government-devices-2026",
          title: "Justice Department lawyers, July 2026: the venture 'functions independently of ByteDance'; federal staff may use TikTok on work phones",
          description:
            "In an opinion memorialized on 16 July 2026, the Office of Legal Counsel concluded that the venture's TikTok falls outside the 2022 ban on government devices because the venture 'functions independently of ByteDance, is majority-owned by American investors, and has revised the content-recommendation algorithm and cybersecurity program originally developed by ByteDance.' It relied on representations in a letter from the venture's general counsel, including that it is 'retraining, testing, and updating' the algorithm. The White House then told agencies that employees may download TikTok onto official devices.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 6,
            directness: 7,
          },
          source:
            "U.S. Department of Justice, Office of Legal Counsel, 'Application of the No TikTok on Government Devices Act to the TikTok USDS Joint Venture', 50 Op. O.L.C. __ (16 July 2026)",
          sourceUrl: "https://www.justice.gov/olc/media/1453136/dl",
          reasoning:
            "The government's own legal judgment that the risk behind the device ban is gone. Independence is 4: it comes from the administration that approved the deal, and it rests on the venture's own representations rather than an audit.",
        },
        {
          id: "tiktok-algorithm-beijing-control",
          title: "The venture got a licensed copy of ByteDance's algorithm; House China committee: 'There can't be any shared algorithm with ByteDance'",
          description:
            "When the White House set out the deal in September 2025, officials said the U.S. venture would receive a licensed copy of the recommendation algorithm, to be 'retrained' on U.S. data. A spokesperson for the House Select Committee on China said: 'It wouldn't be in compliance if the algorithm is Chinese. There can't be any shared algorithm with ByteDance.' The law defines a qualified divestiture as one that ends any 'operational relationship' allowing 'cooperation with respect to the operation of a content recommendation algorithm.' In August 2020 China added technologies such as 'personal information push services based on data analysis' to its export-control list, so exporting TikTok's recommendation technology would need a Chinese licence.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "PBS NewsHour (AP), 'TikTok's algorithm to be licensed to U.S. joint venture led by tech giant Oracle and investment firm Silver Lake' (23 September 2025); TikTok Inc. v. Garland, 604 U.S. ___ (2025), at 19, quoting §2(g)(6)(B); Reuters via The Jakarta Post, 'China's new tech export controls could give Beijing a say in TikTok sale' (30 August 2020)",
          sourceUrl:
            "https://www.pbs.org/newshour/nation/tiktoks-algorithm-to-be-licensed-to-u-s-joint-venture-led-by-tech-giant-oracle-and-investment-firm-silver-lake",
          reasoning:
            "Sets the deal against the law's own words, which is the core of the 'rental' charge. Licensing and retraining could still sever ByteDance's influence if updates stop flowing from it; the licence terms that would show this are not public.",
        },
        {
          id: "investor-petition-2026",
          title: "Investors ask the D.C. Circuit to rule the deal illegal: ByteDance 'would continue to own the app's essential recommendation algorithm' (March 2026)",
          description:
            "On 5 March 2026 two investors in TikTok's competitors, Zhaocheng Anthony Tan and Garrett Reid, petitioned the D.C. Circuit against President Trump and Attorney General Bondi. They argue the deal 'facially violated the law' because ByteDance 'would continue to own the app's essential recommendation algorithm, and would license it to the new American TikTok entity', would keep running its e-commerce, marketing and advertising, and the CEO of ByteDance-owned global TikTok would sit on the venture's board. They also note the law's January 2025 deadline was extended five times by executive order, and that the buyers, directly or through their leaders, had given millions to the President's political projects or invested in his businesses.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 7,
            directness: 6,
          },
          source:
            "Tan and Reid v. Trump and Bondi, Petition for Review (D.C. Cir., filed 5 March 2026)",
          sourceUrl:
            "https://static1.squarespace.com/static/69375471a1fcf3781452cbc0/t/69a98d8c3eb55c38d1546bb5/1772719501042/TikTok+Petition.3.5.26-compressed.pdf",
          reasoning:
            "A legal complaint by parties with money at stake, so independence is 3 and its claims are allegations, not findings. Its factual core matches the venture's own announcement: Shou Chew is on the board and the global business keeps advertising and e-commerce.",
        },
        {
          id: "china-committee-roundtable-2026",
          title: "TikTok backed out of a House China committee session on its algorithm's ties to China (September 2026)",
          description:
            "After about five months of negotiation, TikTok agreed to send its chief security officer to a 15 September 2026 roundtable of the House Select Committee on China on how the new venture protects data and the algorithm. On 3 September Chairman John Moolenaar announced: 'TikTok has backed out of its commitment to appear at the Committee's September roundtable,' saying TikTok cited 'its own desire to avoid broader scrutiny of its child safety practices.' In January he had asked: 'Does this deal ensure China does not have influence over the algorithm?'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 8,
            directness: 4,
          },
          source:
            "House Select Committee on the CCP, 'TikTok Breaks Commitment to Publicly Answer Questions on its Algorithm's Ties to China' (3 September 2026); 'Moolenaar: Questions Need to Be Answered on TikTok Deal' (23 January 2026)",
          sourceUrl:
            "https://chinaselectcommittee.house.gov/media/press-releases/tiktok-breaks-commitment-to-publicly-answer-questions-on-its-algorithm-s-ties-to-china",
          reasoning:
            "Shows the questions remain unanswered in public, from the law's own authors. A refusal to testify, citing other litigation, is not evidence of a continuing tie, so directness is 4.",
        },
        {
          id: "newsom-censorship-review-2026",
          title: "California opened a review of claims the new TikTok suppressed posts critical of Trump; TikTok blamed a data-centre outage (January 2026)",
          description:
            "Days after the venture took over, users reported trouble posting, and one said a message reading 'epstein' was blocked. Governor Gavin Newsom said TikTok had 'suppressed' such content and wrote: 'It's time to investigate.' The venture said a power outage at a U.S. data-centre partner caused 'a cascading systems failure', and called it 'inaccurate' to report the problems as 'anything but' technical.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 3,
          },
          source:
            "South China Morning Post via The Star, 'TikTok cites technical glitch as California probes alleged Trump-critical censorship' (31 January 2026)",
          sourceUrl:
            "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/01/31/tiktok-cites-technical-glitch-as-california-probes-alleged-trump-critical-censorship",
          reasoning:
            "Shows the worry about who steers the feed did not end with the sale; it changed sides. Directness is 3: these are user reports and a political official's claim, TikTok gave a technical explanation, and no finding of deliberate suppression has been published.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Precedent & Scope (folded in from the retired
    // government-platform-bans map, 2026-10-06)
    // =========================================================================
    {
      id: "precedent-scope",
      title: "The Precedent: Where Does This Power Stop?",
      short_summary:
        "The law covers apps controlled from China, Russia, Iran and North Korea, and broadcasters have faced foreign-ownership caps since 1934. Critics point to India, where the TikTok ban became a habit of blocking, and to a deadline the White House waived for a year.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Once a government can force the sale of a speech platform on a secret national-security record, the power will not stay with one app. India's TikTok ban, Access Now's Raman Jit Singh Chima says, 'has built a precedent that has allowed the Indian government to continue blocking access to more web and social media content'. In the U.S. the law's own deadline was waived by executive order, the Attorney General was told not to enforce it, and the President then approved buyers of his choosing. A law that the executive can switch on and off, and use to pick a platform's owners, is a political tool, not a narrow security rule.",
      proponent_rebuttal:
        "The law is narrow by design. It reaches only apps controlled from four named foreign-adversary countries, China, Russia, Iran and North Korea, and its remedy is a sale, not a shutdown. Congress passed it 352-65 in the House and 79-18 in the Senate. The U.S. has capped foreign ownership of broadcast licences since 1934 without that sliding into censorship of domestic speech. A rule about who may own a mass communication channel is old and familiar. Abuse in enforcing one law is a reason to enforce it properly, not proof that the rule itself is dangerous.",
      crux: {
        id: "precedent-expansion-test",
        title: "The Precedent Containment Assessment",
        question:
          "Can a forced sale of a foreign-owned app stay limited to real security threats, or will it spread?",
        description:
          "Whether a power to force the sale of a foreign-controlled app stays confined to adversary-controlled platforms, as broadcast ownership limits largely have, or grows into a general tool to pressure or reassign inconvenient platforms, as India's app blocking did.",
        methodology:
          "Compare national-security powers over communications after enactment: U.S. broadcast foreign-ownership limits under 47 U.S.C. 310 since 1934, India's app blocking under Section 69A of its IT Act since 2020, and any new U.S. designations under the 2024 Act. Count designations, the reasons given, whether courts reviewed them, and whether any reached domestic or allied-country platforms.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A count, over the next several years, of apps the U.S. designates under the 2024 Act or pressures to sell, beside India's record of blocking orders since 2020 and the history of FCC foreign-ownership rulings since 1934.",
        },
        cost_to_verify:
          "Not costed here; designations and blocking orders are partly public.",
        falsification: {
          supporter_flip:
            "If the next few years brought designations or forced sales of apps owned outside the four named countries, or pressure on domestic platforms using the same tools, the claim that the power stays narrow would fail.",
          skeptic_flip:
            "If the Act stayed confined to adversary-controlled apps, with each designation reviewed in court and no spread to domestic or allied platforms, much as broadcast ownership caps have stayed fixed for 90 years, the slippery-slope worry would weaken.",
          common_ground:
            "The Act reaches only apps controlled from China, Russia, Iran or North Korea, its remedy is a sale, and its January 2025 deadline was not enforced while a buyer was found.",
          live_disagreement:
            "Whether an ownership rule for adversary-controlled apps can stay as narrow as broadcast ownership caps, or becomes a tool any government can use to reshape platforms it dislikes, as critics say India's ban did.",
        },
      },
      evidence: [
        {
          id: "act-narrow-scope",
          title: "The 2024 Act reaches only apps controlled from China, Russia, Iran and North Korea, and its remedy is a sale",
          description:
            "The Protecting Americans from Foreign Adversary Controlled Applications Act covers apps run by companies domiciled in, or at least 20% owned from, a 'foreign adversary country', defined as China, Russia, Iran and North Korea. A covered app may keep operating after a 'qualified divestiture'. The D.C. Circuit called the Act 'narrowly constructed to counter foreign adversary control through divestiture.' It passed the House 352-65 and the Senate 79-18.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "TikTok Inc. v. Garland, No. 24-1113 (D.C. Cir. 6 December 2024), slip op. at 17-18; TikTok Inc. v. Garland, 604 U.S. ___ (2025), at 19 (vote counts)",
          sourceUrl:
            "https://media.cadc.uscourts.gov/opinions/docs/2024/12/24-1113-2088317.pdf",
          reasoning:
            "The text sets real limits on whom the law can reach. Text does not show how a future administration will use the designation power, so directness is 6.",
        },
        {
          id: "fcc-foreign-ownership-rules",
          title: "Broadcast licences have carried foreign-ownership caps of one-fifth and one-fourth since 1934",
          description:
            "Under 47 U.S.C. 310, no broadcast licence may be held by a foreign government, or by a company more than one-fifth owned by foreigners. A company controlled by a parent more than one-fourth foreign-owned can be refused a licence if the FCC finds that serves the public interest. These limits have applied since the Communications Act of 1934.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "47 U.S.C. § 310(a)-(b), U.S. House Office of the Law Revision Counsel",
          sourceUrl: "https://uscode.house.gov/us/usc/119-118/t47/s310/",
          reasoning:
            "An old ownership rule for mass media that has not become a censorship tool. Broadcast spectrum is scarce and licensed; apps are not, so the analogy is imperfect and directness is 5.",
        },
        {
          id: "india-precedent-blocking",
          title: "Access Now on India: the TikTok ban 'built a precedent' for blocking more web and social media content",
          description:
            "India blocked TikTok in June 2020, when it had 200 million users there. Raman Jit Singh Chima of the digital-rights group Access Now told TIME in January 2025 that 'The ban has built a precedent that has allowed the Indian government to continue blocking access to more web and social media content.'",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source:
            "Andrew R. Chow, 'Here's What Happened When India Banned TikTok in 2020', TIME (18 January 2025)",
          sourceUrl: "https://time.com/7208112/what-happened-when-india-banned-tiktok",
          reasoning:
            "The best-known real case of a TikTok ban, and an advocate's judgment that it widened state blocking. One quoted view, without a count of later blocking orders, so reliability and replicability are low.",
        },
        {
          id: "executive-nonenforcement-2025",
          title: "Executive Order 14352 (Sept 2025): the President declared the deal a 'qualified divestiture' and ordered no enforcement for 120 more days",
          description:
            "The law's deadline passed on 19 January 2025. President Trump then delayed enforcement by executive order, and on 25 September 2025 Executive Order 14352 declared the joint-venture framework 'a qualified divestiture under the Act', required ByteDance to own 'less than 20 percent', required recommendation models using U.S. data 'to be retrained' by trusted security partners, and directed that the Attorney General 'shall not take any action on behalf of the United States to enforce the Act for 120 days.' The deal closed in January 2026, a year after the statutory deadline.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 9,
            directness: 5,
          },
          source:
            "The White House, Executive Order 14352, 'Saving TikTok While Protecting National Security' (25 September 2025)",
          sourceUrl:
            "https://www.whitehouse.gov/presidential-actions/2025/09/saving-tiktok-while-protecting-national-security/",
          reasoning:
            "Shows how much of the outcome rested on presidential discretion: when to enforce, and which deal counts. Supporters of the law read the same record as a law that achieved a sale, so directness is 5.",
        },
      ],
    },
  ],
  // The retired government-platform-bans map asked the same question
  // (merged 2026-10-06); its names stay findable here, as does this map's
  // question before the 2026 rewrite.
  aliases: [
    "Is TikTok enough of a security threat to justify a ban or forced sale?",
    "Should TikTok be banned?",
    "Did the TikTok deal get China out of TikTok?",
    "Government Bans on Social Media Platforms",
    "Can national security justify banning foreign-owned apps like TikTok?",
    "Should governments ban social media platforms?",
    "Is it right for governments to ban apps?",
    "Do government platform bans protect citizens?",
  ],
  references: [
    {
      title: "TikTok Inc. v. Garland — Supreme Court opinion (17 January 2025)",
      url: "https://www.supremecourt.gov/opinions/24pdf/24-656_ca7d.pdf",
    },
    {
      title: "TikTok Inc. v. Garland — D.C. Circuit opinion (6 December 2024)",
      url: "https://media.cadc.uscourts.gov/opinions/docs/2024/12/24-1113-2088317.pdf",
    },
    {
      title: "Protecting Americans from Foreign Adversary Controlled Applications Act — Congress.gov",
      url: "https://www.congress.gov/bill/118th-congress/house-bill/7521",
    },
    {
      title: "Executive Order 14352, Saving TikTok While Protecting National Security (25 September 2025)",
      url: "https://www.whitehouse.gov/presidential-actions/2025/09/saving-tiktok-while-protecting-national-security/",
    },
    {
      title: "Announcement from the new TikTok USDS Joint Venture LLC (23 January 2026)",
      url: "https://newsroom.tiktok.com/announcement-from-the-new-tiktok-usds-joint-venture-llc?lang=en",
    },
    {
      title: "OLC, Application of the No TikTok on Government Devices Act to the TikTok USDS Joint Venture (16 July 2026)",
      url: "https://www.justice.gov/olc/media/1453136/dl",
    },
    {
      title: "Tan and Reid v. Trump, petition for review, D.C. Circuit (5 March 2026)",
      url: "https://static1.squarespace.com/static/69375471a1fcf3781452cbc0/t/69a98d8c3eb55c38d1546bb5/1772719501042/TikTok+Petition.3.5.26-compressed.pdf",
    },
    {
      title: "House Select Committee on the CCP, TikTok Breaks Commitment to Publicly Answer Questions on its Algorithm's Ties to China (3 September 2026)",
      url: "https://chinaselectcommittee.house.gov/media/press-releases/tiktok-breaks-commitment-to-publicly-answer-questions-on-its-algorithm-s-ties-to-china",
    },
    {
      title: "Irish Data Protection Commission, €530 million fine on TikTok over transfers to China (2 May 2025)",
      url: "https://www.dataprotection.ie/en/news-media/latest-news/irish-data-protection-commission-fines-tiktok-eu530-million-and-orders-corrective-measures-following",
    },
    {
      title: "TIME, Here's What Happened When India Banned TikTok in 2020 (18 January 2025)",
      url: "https://time.com/7208112/what-happened-when-india-banned-tiktok",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Was the national security threat real or hypothetical?",
      content:
        "Leaked recordings and an Irish regulator's 2025 decision show staff in China reached data on users outside China, and ByteDance answers to Chinese laws requiring it to assist intelligence work. But the government told the courts it had no specific intelligence that Beijing had directed TikTok's U.S. content. Should policy act on a credible structural risk, or wait for proof of abuse?",
    },
    {
      id: "q2",
      title: "Did forcing a sale violate the First Amendment?",
      content:
        "The Supreme Court upheld the law 9-0 on the data rationale alone. Justice Gorsuch still voiced 'serious reservations' that it was content neutral, and Justice Sotomayor wrote that it plainly burdens speech. If the government can force the sale of a speech platform over what a foreign owner might do, what limits that power?",
    },
    {
      id: "q3",
      title: "Did the 2026 deal actually get ByteDance out?",
      content:
        "ByteDance kept 19.9% of the U.S. venture, just under the law's 20% line, and the venture retrains an algorithm ByteDance built and licenses to it. The Justice Department says the venture functions independently; investors in a D.C. Circuit petition say the deal breaks the law. Which is it, and who gets to check?",
    },
    {
      id: "q4",
      title: "Is this really about security or about protecting American tech companies?",
      content:
        "Rivals such as Instagram Reels and YouTube Shorts would gain from a ban, and China blocks American social media at home. Is forcing TikTok's sale a security measure, trade retaliation, or a gift to its U.S. rivals?",
    },
    {
      id: "q5",
      title: "Should the principle extend to any foreign-owned platform?",
      content:
        "The 2024 law reaches only apps controlled from China, Russia, Iran or North Korea. If TikTok had to be sold because of Chinese ownership, what about apps with Gulf or other foreign investment, or European-owned services? Where is the line between adversary-nation concerns and techno-nationalism?",
    },
  ],
};
