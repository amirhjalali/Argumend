export const bigTechAntitrustData = {
  id: "big-tech-antitrust",
  title: "Breaking Up Big Tech",
  question: "Should Big Tech be broken up or heavily regulated?",
  meta_claim:
    "Major technology companies (Google, Apple, Amazon, Meta) should be broken up or heavily regulated to restore competition and protect consumers.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: Judge Mehta found Google an illegal search
  // monopolist (Aug 2024) and on 2 Sept 2025 ordered conduct remedies, not a
  // breakup; Judge Brinkema found Google's ad tech an illegal monopoly (17 Apr
  // 2025) and DOJ announced remedies with a monitor on 16 Sept 2026; Judge
  // Boasberg ruled on 18 Nov 2025 that Meta is not a monopoly; the European
  // Commission fined Google €890M under the DMA on 23 July 2026.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In September 2025 the judge who had found Google an illegal search monopolist chose rules over a breakup. Google keeps Chrome and Android and may keep paying Apple and others to be the default search engine, but it may not sign exclusive deals and must share some search data with rivals for six years. Two months later another federal judge ruled that Meta is not a monopoly, because TikTok and YouTube compete with it. The fight is over whether that is enough.",
    confidence: 92,
    source:
      "United States v. Google LLC, No. 20-cv-3010, Memorandum Opinion on remedies (D.D.C. 2 September 2025), pp. 3-6; FTC v. Meta Platforms, No. 20-cv-3590, Memorandum Opinion (D.D.C. November 2025)",
    sourceUrl:
      "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1436.0.pdf",
  },
  // ── Stage 2: the crux-sheet lede ──
  simple_case: [
    "Most people never pay Google or Meta a cent. They pay in attention and data, and through what advertisers pass on in prices.",
    "What the courts and Europe's regulators order now decides which search engines, app stores and AI assistants get a fair shot at reaching people over the next decade.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What the courts found — how the giants stayed on top
    // =========================================================================
    {
      id: "market-power-competition",
      title: "How They Stayed on Top",
      short_summary:
        "Two federal judges found Google an illegal monopolist, in search and in ad tech. A third found Meta faces real rivals in TikTok and YouTube. The question is whether the giants won on the merits or bought their positions.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "People use Google and Instagram because they are good, and they leave when something better comes along. After a five-year case and a full trial, Chief Judge Boasberg ruled in November 2025 that Meta is 'not a monopolist insulated from competition': counting TikTok and YouTube, Meta has about 30% of time spent on social apps, and its share is falling. TikTok, which did not exist in the U.S. a decade ago, now rivals Instagram for daily users. Default deals are a normal way to reach customers: Apple, Mozilla and phone makers sell the default spot, and Google's case is that it wins the bidding because its product is the one users want. The 'kill zone' theory that big buyers starve startups of funding is a model, not a measured effect.",
      proponent_rebuttal:
        "Google did not just build a better product; a federal court found it paid to keep anyone else from getting the chance. It paid more than $26 billion in 2021 to be the default search engine on phones and browsers, and its share of search rose from 80% in 2009 to 89.2% by 2020, nearly 95% on mobile. Judge Mehta found those deals 'froze' the market and that 'tens of billions in guaranteed revenue' discouraged Apple from building its own search engine. In April 2025 a second judge found Google illegally monopolized the tools websites use to sell ads. Meta bought Instagram in 2012 and WhatsApp in 2014 when they were young rivals. That Meta escaped liability because TikTok arrived later does not show those purchases were harmless.",
      crux: {
        id: "how-dominance-held",
        title: "The Merits Test",
        question:
          "Did Google and Meta stay on top by building better products, or by paying and buying rivals out of the way?",
        description:
          "Separate dominance earned with a better product from dominance kept by exclusive deals and acquisitions. The Google search and ad-tech courts found illegal monopoly maintenance; the Meta court found no current monopoly and did not decide whether the Instagram and WhatsApp purchases were harmless.",
        methodology:
          "For search: compare query share and rival entry before and after Google's default deals lapse or become non-exclusive under the 2025 judgment, and test how many users switch when defaults change. For social apps: compare Instagram's and WhatsApp's growth paths before acquisition with those of independent rivals such as Snapchat and TikTok. For startups: compare venture funding in segments next to a platform's products with funding elsewhere, before and after the platform's acquisitions.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Search-share and switching data as Google's exclusive default contracts end under the 2025 judgment, and venture-funding comparisons in segments next to Big Tech acquisitions, against matched segments elsewhere.",
        },
        cost_to_verify:
          "Not costed here; default-switching data is partly in the court record, and funding data is commercial.",
        falsification: {
          supporter_flip:
            "If rival search engines gained little share once Google's exclusive defaults ended, because users kept choosing Google, the claim that its position was bought rather than earned would weaken sharply.",
          skeptic_flip:
            "If rivals gained real share once Google could no longer sign exclusive defaults, and startup funding next to Big Tech products rose once acquisitions were blocked, the 'better product' defense would fail.",
          common_ground:
            "Federal judges found Google illegally maintained monopolies in search (2024) and ad tech (2025), and found Meta is not currently a monopoly because TikTok and YouTube compete with it.",
          live_disagreement:
            "Whether the giants' share reflects products people prefer, so the deals and purchases were a sideshow, or paid defaults and early acquisitions that kept rivals from ever reaching scale.",
        },
      },
      evidence: [
        {
          id: "doj-google-monopoly",
          title: "Judge Mehta: Google paid $26B+ in 2021 for default placement, and its search share rose to 89.2% while the deals 'froze' the market",
          description:
            "In August 2024 Judge Amit Mehta ruled that 'Google is a monopolist, and it has acted as one to maintain its monopoly.' His September 2025 remedies opinion summarizes the findings: for more than a decade Google paid browser developers, phone makers and carriers to be the default search engine, and 'paid billions to lock them up.' In 2021 it paid more than $26 billion in traffic acquisition costs. Its share grew from 80% in 2009 to 89.2% by 2020, nearly 95% on mobile. The deals 'froze' the search ecosystem, and 'the prospect of losing tens of billions in guaranteed revenue from Google' discouraged Apple from launching its own search engine.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "United States v. Google LLC, No. 20-cv-3010, Memorandum Opinion on remedies (D.D.C. 2 September 2025), introduction and conclusions of law, citing the liability opinion, 747 F. Supp. 3d 1 (D.D.C. 2024)",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1436.0.pdf",
          reasoning:
            "A federal court's findings after two trials. It establishes illegal monopoly maintenance in search; it does not by itself show that a breakup, rather than conduct rules, is the right fix. Google has disputed the liability ruling.",
        },
        {
          id: "google-adtech-monopoly-2025",
          title: "Judge Brinkema, April 2025: Google illegally monopolized the publisher ad server and ad exchange markets",
          description:
            "On 17 April 2025 the Eastern District of Virginia held that Google violated antitrust law by monopolizing open-web digital advertising markets, finding it 'harmed Google's publishing customers, the competitive process, and, ultimately, consumers of information on the open web.' Assistant Attorney General Abigail Slater said: 'Google is a monopolist and has abused its monopoly power.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source:
            "U.S. Department of Justice, 'Department of Justice Prevails in Landmark Antitrust Case Against Google' (17 April 2025)",
          sourceUrl:
            "https://www.justice.gov/opa/pr/department-justice-prevails-landmark-antitrust-case-against-google",
          reasoning:
            "A second court, a second Google market. The source is the winning party's account of the ruling, so independence is 7; the holding itself is a court's.",
        },
        {
          id: "startup-formation-decline",
          title: "'Kill Zone' model (NBER 2020): when platforms buy entrants quickly, investors stop funding rivals",
          description:
            "Kamepalli, Rajan and Zingales start from venture capitalists' belief that dominant platforms create a 'kill zone' where entrants are bought early. In their model, because app developers expect a quick buyout, they have little reason to build for the entrant, so even a better entrant struggles to win customers. That lowers its standalone value, its sale price and investors' incentive to fund it. Meta's purchases of Instagram (2012) and WhatsApp (2014) are the best-known examples critics cite.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source:
            "Sai Krishna Kamepalli, Raghuram Rajan and Luigi Zingales, 'Kill Zone', NBER Working Paper 27146 (May 2020, revised June 2022)",
          sourceUrl: "https://www.nber.org/papers/w27146",
          reasoning:
            "A mechanism from respected economists, built on investors' stated beliefs. It is a theoretical model, not a measured effect on funding, so replicability is 4 and directness 5.",
        },
        {
          id: "ftc-meta-ruling-2025",
          title: "Boasberg, Nov 2025: Meta is 'not a monopolist insulated from competition'; with TikTok and YouTube its share is about 30%",
          description:
            "After a bench trial that began in April 2025, Chief Judge James Boasberg ruled that the FTC had not shown Meta holds monopoly power now. 'Whether or not Meta enjoyed monopoly power in the past, though, the agency must show that it continues to hold such power now.' He found 'people treat TikTok and YouTube as substitutes for Facebook and Instagram.' Counting them, Meta's share of time spent is around 30%; even leaving YouTube out, it is 54%, down from an estimated 58% in 2022. The FTC said it was 'deeply disappointed.'",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "FTC v. Meta Platforms, Inc., No. 20-cv-3590, Memorandum Opinion (D.D.C. November 2025; lesser-redacted version 2 December 2025), pp. 85-89; CNBC (18 November 2025) for the parties' statements",
          sourceUrl: "https://www.ftc.gov/system/files/ftc_gov/pdf/MemorandumofOpinion.pdf",
          reasoning:
            "A full trial record, decided against the government, on the market critics call most locked up. It rules on monopoly power today; it did not find that buying Instagram and WhatsApp was harmless.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Consumer harm — what does dominance cost users of free products?
    // =========================================================================
    {
      id: "consumer-harm",
      title: "What Users Pay for 'Free'",
      short_summary:
        "Google's search ads rose in price without rivals to check them, and Meta's own staff call ads a 'tax' on users. But when Europe offered Meta's apps without ads for €5.99 a month, fewer than 0.01% of users took it. The dispute is whether users of free products are harmed at all.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Price is the test antitrust law uses, and the price of search and social media is zero. People value these products enormously: a large choice experiment found digital goods create 'large gains in well-being that are missed by conventional measures.' Ads are a mild cost; Meta's own experiment found that showing users no ads at all raised their time on Facebook by only 7%, and when Europe made Meta offer ad-free versions for €5.99 to €7.99 a month, fewer than 0.01% of users paid. Privacy got better through competition between the giants: Apple's 2021 tracking rules cost Meta, by its CFO's estimate, about $10 billion in 2022. That is a market working.",
      proponent_rebuttal:
        "Free to users is not free. Advertisers pay, and Judge Mehta found Google raised search-ad prices largely without losing advertisers because they had nowhere else to go: Google's ad revenue grew from nearly $47 billion in 2014 to over $146 billion in 2021, and it spent those profits on the next round of default deals. Those costs flow into the prices of everything advertised. Users pay in data too: in 2019 Facebook paid a record $5 billion FTC penalty for misleading users about how their data was shared, after Cambridge Analytica harvested information from millions of accounts. Meta's chief executive told his board that ad load is a 'tax' on engagement. A company without rivals can raise that tax.",
      crux: {
        id: "consumer-harm-measurement",
        title: "Measuring Consumer Harm in Zero-Price Markets",
        question:
          "Do users pay for Big Tech's dominance through more ads, less privacy or higher prices, even when the product is free?",
        description:
          "Antitrust's usual test is a higher price. In zero-price markets the harm, if any, shows up as more ads, worse privacy, lower quality, or higher prices passed on by advertisers. Whether those costs are real and large enough to outweigh the value of the free service is unmeasured by any agreed metric.",
        methodology:
          "Compare ad load, privacy terms and search-ad prices across markets and periods with more and less competition: the EU before and after the DMA, U.S. search after the 2025 judgment, and apps facing TikTok's entry. Measure what users would pay to avoid ads or tracking, and how advertisers' costs pass through to consumer prices.",
        equation:
          "\\text{Consumer Harm} = \\sum (\\text{Privacy Loss} + \\text{Innovation Deficit} + \\text{Attention Tax}) - \\text{Free Service Value}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A quality-adjusted measure of user welfare that prices ad load, privacy loss and advertisers' pass-through costs, compared across markets with and without strong rivals, such as EU apps before and after the DMA.",
        },
        cost_to_verify:
          "Not costed here; most of the data sits with the platforms.",
        falsification: {
          supporter_flip:
            "If cross-market comparisons showed ad load, privacy terms and search-ad prices no worse where one firm dominates than where rivals compete, the harm case for breakup or heavy rules would rest on theory alone.",
          skeptic_flip:
            "If ad prices, ad load or data collection fell measurably where competitors entered or the DMA bit, the claim that free products cost users nothing would fail.",
          common_ground:
            "Users get large value from free search and social apps, the price test antitrust law uses fits zero-price markets poorly, and advertisers rather than users pay Google and Meta directly.",
          live_disagreement:
            "Whether dominance costs users anything once the free service's value is counted, through higher ad prices, heavier ad load and weaker privacy, or whether those costs are small next to what users get.",
        },
      },
      evidence: [
        {
          id: "google-ad-prices",
          title: "Mehta: Google raised search-ad prices without losing advertisers; ad revenue rose from $47B (2014) to $146B (2021)",
          description:
            "The remedies opinion recounts that 'unconstrained by rivals' pricing, the prices of text ads have increased over time', and that Google 'has been able to raise its prices largely without losing advertisers.' From 2010 to 2018 its ad revenue grew 20% or more a year; it booked nearly $47 billion in 2014 and over $146 billion in 2021. 'Google has used these monopoly profits to secure the next iteration of exclusive distribution deals.'",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "United States v. Google LLC, Memorandum Opinion on remedies (D.D.C. 2 September 2025), remedy-specific conclusions on search text ads",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1436.0.pdf",
          reasoning:
            "A court finding of a price effect in the one market where Google sets a price. Advertisers, not users, pay it; how much reaches consumers is not measured, so directness is 7.",
        },
        {
          id: "cambridge-analytica-investigation",
          title: "FTC 2019: Facebook pays a record $5 billion penalty for misleading users about control of their data",
          description:
            "On 24 July 2019 the FTC announced that Facebook would pay a 'record-breaking $5 billion penalty' for violating a 2012 order by misleading users about how much control they had over their data. It found Facebook shared users' data with app developers through their friends, even when those friends had stricter privacy settings. The FTC brought separate cases against Cambridge Analytica, its former CEO and an app developer for harvesting personal information 'from millions of Facebook users.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "FTC, 'FTC Imposes $5 Billion Penalty and Sweeping New Privacy Restrictions on Facebook' (24 July 2019)",
          sourceUrl:
            "https://www.ftc.gov/news-events/news/press-releases/2019/07/ftc-imposes-5-billion-penalty-sweeping-new-privacy-restrictions-facebook",
          reasoning:
            "A regulator's finding that users paid in privacy. It shows a harm, not that dominance caused it or that a breakup would prevent it: a privacy order, not antitrust, delivered the remedy. Directness 6.",
        },
        {
          id: "meta-ads-tax",
          title: "Meta's own documents: Zuckerberg told the board ad load is a 'tax' and 'headwind' on engagement",
          description:
            "The Meta trial record shows the company knows users dislike ads. Zuckerberg told Meta's board that ad load is a 'tax' and 'headwind'; an Instagram survey found users' top two complaints were both about seeing too many ads; and a Facebook experiment that showed some users no ads found they spent 7% more time on the platform. The FTC argued a monopolist can raise this hidden price without losing users.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "FTC v. Meta Platforms, Memorandum Opinion (D.D.C. November 2025), section I.B, Meta's business model",
          sourceUrl: "https://www.ftc.gov/system/files/ftc_gov/pdf/MemorandumofOpinion.pdf",
          reasoning:
            "Shows ads are a real cost users bear for 'free' apps, in the company's own words. The same court found the cost small and Meta's ad load not a monopoly price, so directness is 5.",
        },
        {
          id: "meta-ad-free-uptake",
          title: "Under 0.01% of European users paid €5.99-€7.99 a month for ad-free Facebook and Instagram",
          description:
            "European regulators require Meta to offer ad-free versions of its apps, at €5.99 a month on the web and €7.99 in the apps. Fewer than 0.01% of users have taken the offer. Meta also estimated that cutting teens' ad load by 80% would raise their Facebook use only 3%. Chief Judge Boasberg called this 'negligible willingness to pay to avoid Meta's ads' striking next to ad-free Netflix at $17.99.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "FTC v. Meta Platforms, Memorandum Opinion (D.D.C. November 2025), section I.B",
          sourceUrl: "https://www.ftc.gov/system/files/ftc_gov/pdf/MemorandumofOpinion.pdf",
          reasoning:
            "The cleanest revealed-preference test in the record: given a paid way out of ads, almost no one took it. A low price for avoiding ads is not a measure of privacy costs, which users may not see.",
        },
        {
          id: "consumer-surplus-integration",
          title: "Brynjolfsson et al. (NBER 2018, PNAS 2019): free digital goods create large gains missed by GDP",
          description:
            "Using massive online choice experiments that ask people what they would accept to give up access to digital goods, Erik Brynjolfsson and co-authors conclude that 'digital goods have created large gains in well-being that are missed by conventional measures.' They checked the method against incentive-compatible experiments in which participants were paid to give up Facebook.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Erik Brynjolfsson, Felix Eggers and Avinash Gannamaneni, 'Using Massive Online Choice Experiments to Measure Changes in Well-being', NBER Working Paper 24514 (April 2018); published in PNAS (March 2019)",
          sourceUrl: "https://www.nber.org/papers/w24514",
          reasoning:
            "Shows how much people value free services. It does not compare that value with what a more competitive market would give them, which is the antitrust question, so directness is 5.",
        },
        {
          id: "apple-privacy-pivot",
          title: "Meta's CFO, Feb 2022: Apple's iOS privacy changes are a headwind 'on the order of $10 billion' this year",
          description:
            "After Apple's App Tracking Transparency rules took effect in 2021, requiring apps to ask before tracking users across other apps, Meta CFO Dave Wehner told analysts: 'We believe the impact of iOS overall is a headwind on our business in 2022. It's on the order of $10 billion, so it's a pretty significant headwind for our business.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source:
            "CNBC, 'Facebook says Apple iOS privacy change will result in $10 billion revenue hit this year' (2 February 2022)",
          sourceUrl:
            "https://www.cnbc.com/2022/02/02/facebook-says-apple-ios-privacy-change-will-cost-10-billion-this-year.html",
          reasoning:
            "Shows one giant can discipline another on privacy without a regulator. It is Meta's own estimate, and Apple had its own business reasons, so independence is 5; it was rivalry between two giants, not new entry.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Is competition coming anyway? TikTok and AI chatbots
    // =========================================================================
    {
      id: "ai-and-new-rivals",
      title: "Is Competition Coming Anyway?",
      short_summary:
        "TikTok broke Meta's hold on social video within seven years, and by March 2025 ChatGPT answered 1.2 billion queries a day. Yet Google's search share kept rising, and the court extended its remedies to AI to stop that dominance carrying over.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Tech monopolies do not last. TikTok broke into the market about seven years before the Meta ruling and was 'overrunning the market', by some data drawing more daily users than Instagram and more time than either of Meta's apps; Meta's share was falling. In search, Google's own estimate put ChatGPT at about 1.2 billion daily queries in March 2025 against 140 million for its Gemini app. A breakup designed around today's markets will be fighting the last war by the time the appeals end.",
      proponent_rebuttal:
        "New products have not dented Google where it counts. Judge Mehta found in September 2025 that 'Google is still the dominant firm', that 'no existing rival has wrested market share from Google' and that 'no new competitor has entered the market.' AI chatbots 'are not yet close to replacing' search engines. Google is putting AI in front of its own users at a scale no rival can match, and the court extended its ban on exclusive deals to the Gemini app precisely so 'Google's dominance in search does not carry over into the GenAI space.' Meta bought Instagram and WhatsApp while they were young. Waiting for disruption is how incumbents keep winning.",
      crux: {
        id: "durable-dominance-test",
        title: "The Next-Wave Test",
        question:
          "Will TikTok and AI chatbots break the giants' grip, or will the giants absorb the next wave?",
        description:
          "If new products keep arriving and taking share, as TikTok did against Meta, intervention matters less. If incumbents use defaults, data and cash to carry their dominance into AI, the next wave will look like the last. Measured market shares over the next few years will show which.",
        methodology:
          "Track Google's share of general search and the share of information queries going to AI chatbots, by device and default, over the six years of the 2025 judgment. Track who owns the leading AI assistants and how they reach users: through their own apps, or through deals with Apple, Samsung and carriers. Track Meta's share of social-app time as TikTok's U.S. ownership changes.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Search and AI-assistant query shares by company through about 2031, the life of the Google judgment, alongside who holds the default AI-assistant slots on phones and browsers.",
        },
        cost_to_verify:
          "Not costed here; usage panels and court-ordered compliance reports would supply most of it.",
        falsification: {
          supporter_flip:
            "If Google's search share fell well below 80% within a few years as AI chatbots run by independent firms took information queries, the claim that intervention is needed to open the market would weaken.",
          skeptic_flip:
            "If the leading AI assistants ended up owned by, or distributed through deals with, the same incumbents, and Google's search share held near 90%, the 'competition is coming anyway' defense would fail.",
          common_ground:
            "TikTok took a large share of social-app time from Meta within a few years, and AI chatbots answer hundreds of millions of queries a day, while Google's search share stayed near 90%.",
          live_disagreement:
            "Whether AI and new apps will do what lawsuits could not, or whether the giants' cash, defaults and data let them own the next market too.",
        },
      },
      evidence: [
        {
          id: "tiktok-overran-meta",
          title: "Boasberg: TikTok, in the market only seven years, is 'overrunning' it and draws more daily users than Instagram by some data",
          description:
            "The Meta opinion found that TikTok, which Meta considers its fiercest competitor, 'broke into the market only seven years ago' and 'has been overrunning the market ever since.' Some usage data estimate TikTok commands more daily active users than Instagram, and more total time spent than either Facebook or Instagram, in the U.S. and Canada. Meta's share of a market including TikTok fell from an estimated 58% in 2022 to 54% in 2025. The court's 2021 and 2022 opinions 'did not even mention the word TikTok.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "FTC v. Meta Platforms, Memorandum Opinion (D.D.C. November 2025), pp. 87-89",
          sourceUrl: "https://www.ftc.gov/system/files/ftc_gov/pdf/MemorandumofOpinion.pdf",
          reasoning:
            "The strongest recent case of a newcomer cutting a giant's share without a breakup. TikTok was backed by ByteDance, itself a giant, so it shows entry by a well-funded foreign rival, not by a startup.",
        },
        {
          id: "chatgpt-queries-2025",
          title: "Google's estimate, March 2025: ChatGPT ~1.2 billion daily queries, Gemini app ~140 million",
          description:
            "Findings in the Google remedies opinion record that, by Google's estimate as of 28 March 2025, its Gemini app had roughly 140 million daily queries, against about 1.2 billion for ChatGPT, over 200 million for Meta AI, 75 million for Grok, 50 million for DeepSeek and 30 million for Perplexity. 'Tens of millions of people use GenAI chatbots, like ChatGPT, Perplexity, and Claude, to gather information that they previously sought through internet search.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "United States v. Google LLC, Memorandum Opinion on remedies (D.D.C. 2 September 2025), introduction and findings of fact on generative AI",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1436.0.pdf",
          reasoning:
            "Shows a non-Google product leading the newest way to find information. The figures are Google's own estimate, offered when it wanted to show competition, so independence is 6, and chatbot queries are not yet search queries.",
        },
        {
          id: "google-no-true-competitor",
          title: "Mehta, Sept 2025: 'No existing rival has wrested market share from Google. And no new competitor has entered'",
          description:
            "The remedies opinion opens: 'Google is still the dominant firm in the relevant product markets. No existing rival has wrested market share from Google. And no new competitor has entered the market.' AI chatbots 'are not yet close to replacing' general search engines. Google's share rose from 80% in 2009 to 89.2% by 2020 and nearly 95% on mobile, and Google says 1.5 billion Search users interact with AI through AI Overviews.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "United States v. Google LLC, Memorandum Opinion on remedies (D.D.C. 2 September 2025), pp. 1-2 and findings of fact",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1436.0.pdf",
          reasoning:
            "A court's finding, a year into the AI boom, that search competition had not arrived. It speaks to search through 2025; it cannot say what chatbots will do over the next six years.",
        },
        {
          id: "genai-carryover-risk",
          title: "Mehta extended the ban on exclusive deals to Gemini so search dominance 'does not carry over into the GenAI space'",
          description:
            "The court wrote that the remedies proceedings 'have been as much about promoting competition among GSEs as ensuring that Google's dominance in search does not carry over into the GenAI space.' It barred Google from exclusive contracts for Search, Chrome, Google Assistant and the Gemini app, and the Justice Department said the remedies 'extend to generative AI technologies and companies.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "United States v. Google LLC, Memorandum Opinion on remedies (D.D.C. 2 September 2025), pp. 2-4; U.S. Department of Justice, 'Department of Justice Wins Significant Remedies Against Google' (2 September 2025)",
          sourceUrl:
            "https://www.justice.gov/opa/pr/department-justice-wins-significant-remedies-against-google",
          reasoning:
            "Shows the court saw a real risk that the incumbent would own the next market. A risk the court acted on is not proof it would have happened, so directness is 6.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: What to do — breakups or rules?
    // =========================================================================
    {
      id: "remedy-choice",
      title: "Breakups or Rules?",
      short_summary:
        "Judge Mehta refused to make Google sell Chrome or stop paying for defaults, warning a payment ban could put Firefox out of business. Europe's rules are biting, with an €890 million fine on Google in July 2026, but Google was still found in breach. The fight is over which remedy actually opens a market.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The courts looked hard at breakups and said no. Judge Mehta found the government 'overreached' in seeking a sale of Chrome and Android, assets Google 'did not use to effect any illegal restraints'. He refused to ban default payments, because cutting them off 'almost certainly will impose substantial — in some cases, crippling — downstream harms' on partners and consumers; Mozilla testified that losing Google's payments could 'put Firefox out of business'. He rejected choice screens because they 'have not been shown to enhance competition'. Heavy rules carry their own costs: more than two years into the EU's Digital Markets Act, the Commission still found Google in breach. Targeted conduct rules, enforced by a technical committee, fix the specific abuse without breaking products people like.",
      proponent_rebuttal:
        "Conduct rules are what Google has lived under for years while its share kept climbing. The 2025 judgment still lets Google pay Apple and others billions to be the default, the very payments the court found 'froze' the market. A breakup removes the incentive instead of policing it. Where rules do bite, it is because they are heavy: in July 2026 the European Commission fined Google €890 million under the DMA, €460 million for favoring its own shopping, hotel and travel results in Search and €430 million for stopping app developers from steering users to cheaper offers outside Google Play. In September 2026 the Justice Department won ad-tech remedies that force Google to open its ad exchange to rival tools under a monitor for six years. These companies respond to force, not to suggestions.",
      crux: {
        id: "breakup-vs-conduct-rules",
        title: "The Remedy Test",
        question:
          "Will conduct rules like the Google judgment and Europe's DMA open these markets, or does it take a breakup?",
        description:
          "The U.S. courts have chosen conduct remedies over structural ones, and Europe regulates gatekeepers rather than splitting them. The test is whether rivals gain share under those rules. If they do not, the case for selling off Chrome, Android or the ad exchange gets stronger; if they do, breakups look unnecessary.",
        methodology:
          "Over the six-year Google search judgment and the six-year ad-tech judgment, track rivals' search share, the number of non-exclusive default deals that go to non-Google engines, data-sharing uptake by qualified competitors, and rival ad exchanges' share of publisher inventory. Compare EU markets under the DMA with the U.S. on app-store fees paid, alternative app stores used and self-preferencing complaints.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Technical-committee and monitor reports under the Google judgments through 2031, showing whether rivals win default slots, use the shared data and gain search and ad-exchange share, set beside EU market data under the DMA.",
        },
        cost_to_verify:
          "Not costed here; compliance reports are ordered by the courts and the Commission.",
        falsification: {
          supporter_flip:
            "If rivals gained clear share in search and ad tech under the conduct remedies within a few years, using the shared data and winning default slots, the case for breaking these companies up would weaken.",
          skeptic_flip:
            "If, after several years of the remedies and the DMA, Google's share and default slots were unchanged and the shared data went unused, the claim that rules alone can open these markets would fail.",
          common_ground:
            "The September 2025 Google judgment bans exclusive deals and orders data sharing for six years but leaves Chrome, Android and default payments in place, and the EU fined Google €890 million under the DMA in July 2026.",
          live_disagreement:
            "Whether policing the conduct, with data sharing and fines, can open markets these firms dominate, or whether only separating the businesses removes the incentive to shut rivals out.",
        },
      },
      evidence: [
        {
          id: "mehta-no-breakup-2025",
          title: "Mehta, Sept 2025: no sale of Chrome or Android, and no ban on default payments, which could be 'crippling' to partners",
          description:
            "The remedies opinion rejected the government's structural asks: 'Google will not be required to divest Chrome; nor will the court include a contingent divestiture of the Android operating system.' It held that 'Plaintiffs overreached', since Google 'did not use' those assets 'to effect any illegal restraints.' It refused a payment ban: cutting off payments 'almost certainly will impose substantial — in some cases, crippling — downstream harms to distribution partners, related markets, and consumers.' Mozilla testified that lower payments could 'put Firefox out of business'. The court also declined to order choice screens, which 'have not been shown to enhance competition among GSEs.'",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "United States v. Google LLC, Memorandum Opinion on remedies (D.D.C. 2 September 2025), pp. 3-5 and remedy-specific conclusions on payments",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1436.0.pdf",
          reasoning:
            "The court that found the monopoly weighed a breakup on a full record and judged it too costly. The judge himself wrote that remedies ask a court to 'gaze into a crystal ball', so this is a forecast of harm, not a measured one.",
        },
        {
          id: "google-search-remedies-2025",
          title: "The Google search judgment: no exclusive deals, search data shared with rivals, a technical committee, six years",
          description:
            "The court barred Google from 'entering or maintaining any exclusive contract relating to the distribution of Google Search, Chrome, Google Assistant, and the Gemini app', and from tying payments for one app's placement to another's or locking placement for more than a year. Google must make 'certain search index and user-interaction data, though not ads data' available to qualified competitors, offer them search and ads syndication, and publicly disclose material changes to its ad auctions. A technical committee oversees a judgment lasting six years.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "United States v. Google LLC, Memorandum Opinion on remedies (D.D.C. 2 September 2025), pp. 3-6",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1436.0.pdf",
          reasoning:
            "Shows a court imposing real, if not structural, obligations, the 'heavily regulated' half of the claim in action. Whether these rules open the market is the open question, so directness is 6.",
        },
        {
          id: "adtech-remedies-2026",
          title: "Ad-tech remedies, Sept 2026: Google must open AdX and DFP to rival tools, under a monitor for six years",
          description:
            "On 16 September 2026 the Justice Department announced that the court in the ad-tech case had ordered Google to 'create and support integrations between AdX and Prebid, and DFP and Prebid', to have its exchange bid into rival publisher ad servers, to let publishers export their data, and to stop its advertiser tools bidding preferentially into its own exchange. Google 'will be subject to the oversight of this monitor and a technical committee for six years.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "U.S. Department of Justice, 'Department of Justice Again Wins Substantial Relief Against Google' (16 September 2026)",
          sourceUrl:
            "https://www.justice.gov/opa/pr/department-justice-again-wins-substantial-relief-against-google",
          reasoning:
            "A second set of heavy conduct rules, with a monitor. The source is the winning party's announcement, so independence is 6, and whether the rules restore competition will take years to see.",
        },
        {
          id: "eu-dma-early-results",
          title: "EU fines Google €890 million under the Digital Markets Act for self-preferencing in Search and anti-steering in Play (July 2026)",
          description:
            "On 23 July 2026 the European Commission fined Google €460 million for giving its own shopping, hotel, sports and other results preferential treatment in Search, and €430 million because Google Play 'prevents app developers from freely communicating and promoting offers' and set steering fees beyond what the DMA allows. The Commission ordered Google to end the non-compliance. The DMA's gatekeeper obligations have applied since March 2024.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "European Commission, 'Commission fines Google €890 million for breaches of the Digital Markets Act' (23 July 2026)",
          sourceUrl:
            "https://digital-markets-act.ec.europa.eu/commission-fines-google-eur890-million-breaches-digital-markets-act-2026-07-23_en",
          reasoning:
            "Shows heavy regulation being enforced with large fines. It also shows Google still in breach more than two years in, which supporters of breakups read as proof that rules alone do not change behavior, so directness is 5.",
        },
      ],
    },
  ],
  references: [
    {
      title: "United States v. Google LLC, Memorandum Opinion on remedies (D.D.C. 2 September 2025)",
      url: "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1436.0.pdf",
    },
    {
      title: "United States v. Google LLC, Memorandum Opinion on liability (D.D.C. 5 August 2024)",
      url: "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1033.0_2.pdf",
    },
    {
      title: "FTC v. Meta Platforms, Memorandum Opinion (D.D.C. November 2025, lesser-redacted version)",
      url: "https://www.ftc.gov/system/files/ftc_gov/pdf/MemorandumofOpinion.pdf",
    },
    {
      title: "DOJ, Department of Justice Prevails in Landmark Antitrust Case Against Google (ad tech, 17 April 2025)",
      url: "https://www.justice.gov/opa/pr/department-justice-prevails-landmark-antitrust-case-against-google",
    },
    {
      title: "DOJ, Department of Justice Again Wins Substantial Relief Against Google (ad tech remedies, 16 September 2026)",
      url: "https://www.justice.gov/opa/pr/department-justice-again-wins-substantial-relief-against-google",
    },
    {
      title: "European Commission, Commission fines Google €890 million for breaches of the Digital Markets Act (23 July 2026)",
      url: "https://digital-markets-act.ec.europa.eu/commission-fines-google-eur890-million-breaches-digital-markets-act-2026-07-23_en",
    },
    {
      title: "Kamepalli, Rajan and Zingales, Kill Zone, NBER Working Paper 27146",
      url: "https://www.nber.org/papers/w27146",
    },
  ],
};
