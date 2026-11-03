export const congressStockTradingBanData = {
  id: "congress-stock-trading-ban",
  title: "Banning Congress From Trading Stocks",
  question: "Should members of Congress be banned from trading individual stocks?",
  meta_claim:
    "Members of Congress, their spouses and dependent children should be barred from buying and selling individual stocks, because disclosure and insider-trading law do not stop lawmakers from trading on what their jobs tell them, and the conflict corrodes trust whether or not any one trade is improper.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: the House passed the Stop Insider Trading Act
  // (H.R. 7008) 232-198 on 22 July 2026; the Senate fell short of the 60
  // votes needed to begin debate on its version, 53-47, on 30 September
  // 2026. Congress is out until after the midterm election.
  last_updated: "2026-11-03",
  tags: ["congress", "stock-trading", "ethics", "insider-trading", "stock-act"],
  aliases: [
    "Congressional stock trading ban",
    "Stop Insider Trading Act",
    "Ban Congress from owning stocks",
    "Pelosi stock trades",
    "Congress insider trading",
  ],
  // ── The lede: what happened this autumn, then what the fight is over ──
  keystone_fact: {
    statement:
      "On July 22, 2026 the House passed the Stop Insider Trading Act, 232-198. It would bar members, their spouses and dependent children from buying individual stocks, but let them keep what they own and sell after public notice. On September 30 the Senate fell short of the 60 votes needed to take it up, 53-47; Democrats said it was too weak and objected to voter ID rules attached to it. The fight is over whether lawmakers trade on what their jobs tell them, whether disclosure under the 2012 STOCK Act is enough, and how far a ban should reach.",
    confidence: 88,
    source:
      "Office of Rep. Zach Nunn, 'Nunn Secures House Passage of Congressional Stock Trading Ban' (July 22, 2026); Deseret News, 'Democrats shoot down stock trading ban' (September 30, 2026)",
    sourceUrl: "https://www.deseret.com/politics/2026/09/30/democrats-shoot-down-stock-trading-ban/",
  },
  // ── The summary above the crux sheet: what the map turns on ──
  simple_case: [
    "Both sides accept that members of Congress hear market-moving news before the public does, that insider-trading law applies to them, and that since the 2012 STOCK Act they must report each trade within 45 days. Both also accept that most proposals let members keep diversified funds, and that the bills Congress voted on this year differ over existing holdings, spouses and the president.",
    "They split over whether lawmakers' trades beat the market by more than luck, with studies from different decades pointing different ways; over whether disclosure and prosecution catch the trades that matter, when the usual late-filing fine is $200 and the best-known 2020 case closed without charges; and over whether the risk is reason enough to make members and their families give up picking stocks.",
    "The first two are questions trade-level data and enforcement records can answer; the last is a judgment about public trust and private freedom that the numbers inform but do not decide.",
  ],
  pillars: [
    {
      id: "do-they-beat-the-market",
      title: "Do Lawmakers Trade on What They Know?",
      short_summary:
        "Studies of the 1990s and of congressional leaders find lawmakers' trades beating the market; studies of rank-and-file members from 2004 on find average or worse returns. The fight is over which picture describes the trades that matter.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The best studies of what members actually hold and trade find no edge. Eggers and Hainmueller found the average member from 2004 to 2008 would have earned more in a passive index fund, and found no sign of informed trading when they re-examined the earlier, eye-catching studies. Using every trade from 2012 to 2020, Belmont, Sacerdote, Sehgal and Van Hoek found no superior performance overall or for senators accused of informed trading, with returns at the top of the distribution looking like random stock picking. The annual 'Congress beat the market' tallies are built from partial disclosures and do not adjust for risk.",
      proponent_rebuttal:
        "Averages hide the trades that matter. A 2025 NBER study by Wei and Zhou finds members perform like their peers until they join leadership, then beat matched peers by about 47 percentage points a year, with gains tied to party control, regulation and government contracts. Senators' purchases from 1993 to 1998 beat the market by 85 basis points a month. Even Eggers and Hainmueller found members' local and donor-linked stocks beat their other holdings. And the stocks senators sold after the January 24, 2020 coronavirus briefing went on to lag the market by a statistically significant 9%.",
      crux: {
        id: "informed-trading",
        title: "The Informed-Trading Test",
        question:
          "Do lawmakers' trades beat similar stocks by more than luck, with gains where their power and inside information are?",
        description:
          "One side reads the post-2012 trade data as showing members are ordinary, often poor, stock pickers; the other reads leader-level and event-level studies as showing gains concentrated where power and private information are. The answer depends on whether excess returns appear among members with access, around the events they learn about first.",
        methodology:
          "Use every disclosed trade by members, spouses and dependents with exact dates. Compare each purchase and sale against stocks matched on industry and size, and test whether excess returns rise after a member joins leadership or a relevant committee, and around closed briefings, bill markups and contract awards, against the same member's other trades.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Trade-level returns, matched on industry and size, for members before and after they join leadership or a relevant committee, and around closed briefings and contract awards, replicated on 2012-2026 disclosures by researchers outside the NBER team.",
        },
        cost_to_verify:
          "Disclosures are public; a replication costs a research team months of work matching filings to prices, since disclosed amounts come in dollar ranges.",
        falsification: {
          supporter_flip:
            "If replications of the leadership study on 2012-2026 data found no excess returns after members gain power, and no edge around briefings or contract awards, the claim that lawmakers trade on what their jobs tell them would lose its main support.",
          skeptic_flip:
            "If independent researchers confirmed that leaders and committee members beat matched stocks around events they learn about first, the average-member studies would no longer answer the concern, since a ban targets the trades with access, not the average.",
          common_ground:
            "Both sides agree that the average member is not a market-beating investor, that some well-timed trades have drawn investigations, and that disclosed dollar ranges make precise return estimates hard.",
          live_disagreement:
            "Whether gains concentrate among members with power and private information, or whether the striking cases are what luck looks like across 535 portfolios.",
        },
      },
      evidence: [
        {
          id: "leaders-outperform",
          title: "NBER 2025: Members Who Became Leaders Then Beat Matched Peers by About 47 Points a Year",
          description:
            "Using transaction-level data on congressional stock trades, Shang-Jin Wei and Yifan Zhou found that lawmakers who later become leaders trade about as well as matched peers before their promotion, and beat those peers by about 47 percentage points a year afterward. The gains were higher when the leader's party controlled the chamber, came with sales ahead of regulatory actions and purchases of firms that later won government contracts, and showed up in trades that predicted later corporate news.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 4,
            directness: 8,
          },
          source: "Wei & Zhou, '\"Captain Gains\" on Capitol Hill', NBER Working Paper 34524 (November 2025)",
          sourceUrl: "https://www.nber.org/papers/w34524",
          reasoning:
            "The before-and-after design compares the same people as they gain power, which is the closest test yet of whether office, not skill, drives returns. It is an unreviewed working paper covering a small group of leaders, and a 47-point gap is large enough that replication matters before it carries full weight.",
        },
        {
          id: "senate-1990s-returns",
          title: "1993-98: Stocks Senators Bought Beat the Market by 85 Basis Points a Month",
          description:
            "Studying senators' common stock trades from 1993 to 1998, Ziobrowski, Cheng, Boyd and Ziobrowski found that a portfolio copying senators' purchases beat the market by about 85 basis points a month, while one copying their sales trailed it by about 12 basis points a month, a gap of roughly one percentage point a month that was large and statistically reliable.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 7,
          },
          source:
            "Ziobrowski, Cheng, Boyd & Ziobrowski, 'Abnormal Returns from the Common Stock Investments of the U.S. Senate', Journal of Financial and Quantitative Analysis 39(4), 661-676 (December 2004)",
          sourceUrl: "https://ideas.repec.org/a/cup/jfinqa/v39y2004i04p661-676_00.html",
          reasoning:
            "A peer-reviewed finding that drove the push for the STOCK Act. It predates that law, and Eggers and Hainmueller's re-examination of the 1985-2001 data found no information advantage, so replicability is low.",
        },
        {
          id: "covid-briefing-sales",
          title: "Stocks Senators Sold After the January 24, 2020 Briefing Then Lagged the Market by 9%",
          description:
            "In the same paper that found senators to be poor stock pickers overall, Belmont, Sacerdote, Sehgal and Van Hoek reported that stocks senators sold after the January 24, 2020 COVID-19 briefing underperformed the market by a statistically significant 9 percent, while stocks they bought in that period underperformed by 3 percent.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 4,
            directness: 8,
          },
          source:
            "Belmont, Sacerdote, Sehgal & Van Hoek, 'Relief Rally: Senators As Feckless As the Rest of Us at Stock Picking', NBER Working Paper 26975 (April 2020)",
          sourceUrl: "https://www.nber.org/papers/w26975",
          reasoning:
            "Event-level evidence that senators sold the right stocks at a moment when some had heard closed briefings. It is one episode in a market-wide crash, the authors who report it found no stock-picking skill overall, and it cannot show any one senator acted on the briefing.",
        },
        {
          id: "connected-stocks",
          title: "2004-08: Members' Local and Donor-Linked Stocks Beat Their Other Holdings",
          description:
            "Eggers and Hainmueller found that members of Congress invest disproportionately in local firms and in companies that give to their campaigns, and that these connected investments, particularly local ones, generally outperformed members' other investments from 2004 to 2008. Members' poor overall returns came mainly from their unconnected stocks.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source:
            "Eggers & Hainmueller, 'Political Capital: Corporate Connections and Stock Investments in the U.S. Congress, 2004-2008', Quarterly Journal of Political Science 9(2), 169-202 (2014)",
          sourceUrl: "https://researchonline.lse.ac.uk/id/eprint/57734",
          reasoning:
            "From the authors best known for finding Congress's portfolios mediocre, which makes it hard to dismiss. Outperformance in connected stocks fits informed trading but also fits members knowing local firms well; the paper does not separate the two.",
        },
        {
          id: "tariff-pause-trades",
          title: "April 2025: Greene Bought Stocks on April 8-9, Hours Before the Tariff Pause Rally",
          description:
            "Rep. Marjorie Taylor Greene disclosed purchases of about $21,000 to $315,000 in stocks on April 8 and 9, 2025, including Palantir and AMD, which later rose 19% and 21%. On the morning of April 9 President Trump posted \"THIS IS A GREAT TIME TO BUY!!!\" and about four hours later paused most tariffs, setting off large one-day gains. Greene told the Atlanta Journal-Constitution that a financial adviser trades for her and that she has no input on which companies are traded or when.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 2,
            directness: 4,
          },
          source: "The New York Times via West Hawaii Today, 'Greene bought market dip before Trump paused tariffs, profiting from the rally' (April 15, 2025)",
          sourceUrl:
            "https://westhawaiitoday.com/2025/04/15/nation-world-news/greene-bought-market-dip-before-trump-paused-tariffs-profiting-from-the-rally",
          reasoning:
            "The kind of case that drives public support for a ban: well-timed trades around a policy decision. One episode proves nothing about knowledge, many investors bought that dip, and Greene says an adviser made the trades; its weight is in showing why the appearance matters.",
        },
        {
          id: "tracked-portfolios-2024",
          title: "Trackers: Members' Disclosed Trades Beat the S&P 500 in 2024",
          description:
            "Unusual Whales' 2024 report estimated that Democrats in Congress gained about 31% on average and Republicans about 26%, against 24.9% for the S&P 500, and put Nancy Pelosi's gain at about 70.9%. Fortune noted the figures are approximations: the tracker has no access to members' private financial records and covered only trackable active stock positions from December 29, 2023 to December 30, 2024.",
          side: "for" as const,
          weight: {
            sourceReliability: 4,
            independence: 5,
            replicability: 4,
            directness: 4,
          },
          source: "Fortune, reporting the Unusual Whales 2024 Congress trading report (January 8, 2025)",
          sourceUrl: "https://fortune.com/2025/01/08/congress-stock-trading-pelosi-2024",
          reasoning:
            "The figure most often shared online. It covers one strong year, a technology-heavy mix can beat the index without any inside information, and it does not adjust for risk, so it shows members did well in 2024 rather than why.",
        },
        {
          id: "capitol-losses",
          title: "2004-08: The Average Member Would Have Done Better in an Index Fund",
          description:
            "Eggers and Hainmueller studied members' actual portfolio holdings for 2004 to 2008, the first study to do so, and found the average member would have earned higher returns in a passive index fund. Re-examining the earlier studies of 1985-2001 trading and analysing 2004-2008 trades, they found no evidence that members traded with an information advantage, and concluded that any unethical investing in Congress is more limited than earlier research implied.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Eggers & Hainmueller, 'Capitol Losses: The Mediocre Performance of Congressional Stock Portfolios', Journal of Politics 75(2), 535-551 (2013)",
          sourceUrl: "https://researchonline.lse.ac.uk/id/eprint/46513/",
          reasoning:
            "Peer-reviewed, built on holdings rather than reported trades, and it re-tests the studies supporters cite. It covers the years before the STOCK Act and the average member, not leaders, which is where the 2025 study finds the gains.",
        },
        {
          id: "post-stock-act-returns",
          title: "2012-2020: No Sign Lawmakers' Trades Beat the Market After the STOCK Act",
          description:
            "Using a new dataset of every disclosed stock trade by senators and House members from January 2012 to December 2020, Belmont, Sacerdote, Sehgal and Van Hoek found no evidence of superior performance, overall or for senators accused of informed trading. House members' purchases slightly underperformed over six months, and returns at the 95th and 99th percentiles looked consistent with random stock picking. The authors noted their methods cannot rule out individual insider trades hidden in the averages.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Belmont, Sacerdote, Sehgal & Van Hoek, 'Do senators and house members beat the stock market? Evidence from the STOCK Act', Journal of Public Economics 207 (2022)",
          sourceUrl: "https://ideas.repec.org/a/eee/pubeco/v207y2022ics0047272722000044.html",
          reasoning:
            "The most complete peer-reviewed look at the disclosure era, and it tests the top of the distribution, not just the mean. It ends in 2020 and studies members as a group, so it leaves open the leader-level gains the 2025 working paper reports.",
        },
        {
          id: "senators-purchases-2012-2020",
          title: "Stocks Senators Bought, 2012-2020, Trailed Similar Stocks at 1, 3 and 6 Months",
          description:
            "Looking at senators' trades from 2012 through March 2020, Belmont and co-authors found that stocks senators bought underperformed stocks in the same industry and size category by 11, 28 and 17 basis points at one, three and six months, and found no evidence that senators picked stocks in industries tied to their committees. Neither Republican nor Democratic senators showed stock-picking skill on purchases.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Belmont, Sacerdote, Sehgal & Van Hoek, 'Relief Rally: Senators As Feckless As the Rest of Us at Stock Picking', NBER Working Paper 26975 (April 2020)",
          sourceUrl: "https://www.nber.org/papers/w26975",
          reasoning:
            "Directly tests the committee channel critics worry about and finds nothing on average. The same paper's COVID-briefing result cuts the other way, which is why both cards are on this map.",
        },
      ],
    },
    {
      id: "is-disclosure-enough",
      title: "Is Disclosure Enough?",
      short_summary:
        "Since 2012 members must report trades within 45 days, and insider-trading law already applies to them. Supporters of a ban say late filings draw $200 fines and the cases that matter go unprosecuted; opponents say the law works when there is a real tip and public filings let anyone watch.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Lawmakers are already bound by insider-trading law, and it bites: Rep. Chris Collins was sentenced to 26 months in 2020 for leaking confidential news of a failed drug trial. Since 2012 the STOCK Act has required members to disclose trades within 45 days, which is why the public can track their portfolios at all. As Jennifer Schulp argued in Reason, \"justifying a stock-ownership ban based on insider trading rules also makes little sense,\" and focusing on stocks \"provides an incomplete picture\" of members' conflicts. Rep. Ed Perlmutter put it plainly: existing transparency and insider-trading rules already work.",
      proponent_rebuttal:
        "Disclosure is honored in the breach and punished lightly. Business Insider found 78 members of the 117th Congress violated the STOCK Act's reporting rules; the standard penalty is $200, and the House Ethics Committee found no \"clear evidence\" of knowing violations by two of the worst offenders. When the trade rests on government information rather than a corporate tip, prosecution is rare: Sen. Richard Burr and his wife made at least 30 sales worth $600,000 to $1.7 million weeks before the 2020 crash, and the Justice Department closed the case without charges. Collins was caught passing a company's secret, not trading on what Congress knew.",
      crux: {
        id: "disclosure-deterrence",
        title: "Does Disclosure Deter?",
        question:
          "Do the STOCK Act's reports and insider-trading law catch and deter members who trade on what they learn in office?",
        description:
          "Opponents of a ban point to the convictions and public filings that already exist; supporters point to routine late filings, token fines and the absence of any prosecution for trading on legislative information. The question is whether the current regime reaches trades based on what members learn as lawmakers, not just tips from companies.",
        methodology:
          "Count, for 2012-2026, every late or missing STOCK Act report, the penalty each drew, every referral to ethics committees and prosecutors, and every charge, sorting cases by whether the information came from a company or from government work. Then compare excess returns on trades disclosed on time with those disclosed late.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A complete 2012-2026 record of late STOCK Act filings, fines, ethics referrals and prosecutions of members, sorted by whether the alleged information came from a company or from government work, alongside returns on on-time versus late-reported trades.",
        },
        cost_to_verify:
          "Filings and fines are partly public; ethics outcomes are not consistently published, so a full record needs House and Senate ethics data that critics say is incomplete.",
        falsification: {
          supporter_flip:
            "If late filings were rare once counted fully, penalties rose with repeat violations, and prosecutors had brought cases for trading on government information, the claim that disclosure cannot police Congress would weaken.",
          skeptic_flip:
            "If the record showed many late reports drawing $200 fines, no charge ever brought for trading on legislative information, and late-reported trades earning more than on-time ones, the case that current law suffices would be hard to sustain.",
          common_ground:
            "Both sides agree that insider-trading law applies to members, that the STOCK Act's disclosures are what make congressional trading visible, and that late filings are common enough to be a problem.",
          live_disagreement:
            "Whether the law reaches trades based on what members learn as lawmakers, or only the rare corporate tip that any insider could be prosecuted for.",
        },
      },
      evidence: [
        {
          id: "stock-act-violations",
          title: "78 Members of the 117th Congress Broke the STOCK Act's Reporting Rules; the Usual Fine Is $200",
          description:
            "Business Insider's review of congressional disclosures found 78 members of the 117th Congress, 40 Republicans and 37 Democrats, violated the STOCK Act, which requires members to report trades by themselves, their spouses or dependent children within 45 days. The standard penalty is a $200 fine. Rep. Pat Fallon waited months to disclose up to $17 million in trades and Rep. Tom Suozzi filed late reports on nearly 300 transactions; the House Ethics Committee penalized neither, finding no \"clear evidence\" of \"knowing or willful\" violations.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Business Insider, 'Conflicted Congress' investigation, via Yahoo News, '78 members of the 117th Congress violated a federal conflicts-of-interest and financial transparency law' (January 3, 2023)",
          sourceUrl: "https://ca.news.yahoo.com/77-members-117th-congress-violated-111400969.html",
          reasoning:
            "A systematic count, split almost evenly by party, showing the disclosure rule is often broken and lightly punished. Late reporting is not insider trading, and most violations may be carelessness, so it shows weak enforcement rather than abuse.",
        },
        {
          id: "burr-no-charges",
          title: "Burr Sold $600,000 to $1.7 Million Before the 2020 Crash; Justice Closed the Case Without Charges",
          description:
            "Sen. Richard Burr and his wife made at least 30 sales worth $600,000 to $1.7 million from January 31 to February 13, 2020, most on February 13. A closed-door Senate Intelligence Committee coronavirus briefing was held January 24. The Dow fell from 29,296 on February 20 to 25,409 on February 28. Burr said he relied only on public news reports; he stepped down as Intelligence chair after the FBI seized his phone, and in January 2021 the Justice Department closed the investigation without charges. Probes of Sens. Loeffler, Inhofe and Feinstein ended in May 2020.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 6,
          },
          source: "CBS News, 'Justice Department closes investigation into Senator Richard Burr over stock sales' (January 20, 2021)",
          sourceUrl: "https://www.cbsnews.com/news/doj-closes-insider-trading-investigation-into-richard-burr",
          reasoning:
            "The best-known test of whether insider-trading law reaches trades around government briefings, and no charge followed. Closing a case is not a finding that he traded on the briefing; it shows how hard such cases are to prove, which is the supporters' point.",
        },
        {
          id: "collins-conviction",
          title: "2020: A Sitting Congressman's Insider Tip Drew 26 Months in Prison",
          description:
            "Former Rep. Chris Collins, a New York Republican who served from 2013 until he resigned after pleading guilty in 2019, was sentenced in January 2020 to 26 months in prison for leaking confidential information about a failed drug trial to his son and other associates.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 5,
          },
          source: "STAT, 'Former Rep. Chris Collins sentenced to 26 months in biotech insider trading scheme' (January 17, 2020)",
          sourceUrl: "https://www.statnews.com/2020/01/17/congressman-chris-collins-sentenced-biotech-insider-trading-scheme/",
          reasoning:
            "Shows existing law can convict a sitting member. The information came from a company he was invested in, not from his work in Congress, so the case says little about trades based on legislative knowledge.",
        },
        {
          id: "insider-law-applies",
          title: "Schulp: Insider-Trading Law Already Reaches Lawmakers; Stocks Are One Conflict of Many",
          description:
            "Writing in Reason in February 2022, Jennifer Schulp argued that \"justifying a stock-ownership ban based on insider trading rules also makes little sense,\" that a broad ban would reduce market efficiency \"by preventing lawmakers from contributing information that allows the markets to engage in price discovery,\" and that \"at best, focusing only on stock ownership and trading provides an incomplete picture\" of the financial conflicts members face.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source: "Jennifer Schulp, 'Banning Lawmakers From Trading Stocks Won't Fix Congress', Reason (February 22, 2022)",
          sourceUrl: "https://reason.com/?p=8171859",
          reasoning:
            "The strongest policy case against singling out stocks: real estate, family businesses and future jobs create conflicts too. It is an argument, not data, and the price-discovery point is the one critics say proves their case, since it concedes members' trades carry information.",
        },
        {
          id: "members-say-rules-work",
          title: "Lawmakers Against a Ban: Transparency and Insider-Trading Rules Already Work",
          description:
            "In 2022 Rep. Ed Perlmutter (D-Colo.) said existing transparency rules and insider-trading laws already work, adding, \"I don't know that [more restrictions] improves things any.\" Rep. Elaine Luria (D-Va.) said the STOCK Act already requires timely disclosure and asked, \"why would you assume that members of Congress are going to be inherently bad or corrupt?\" Then-Speaker Nancy Pelosi preferred stiffer penalties: \"We have to tighten the fines on those who violate the STOCK Act.\"",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 3,
            directness: 5,
          },
          source: "Yahoo Finance, 'Why some lawmakers say maybe they shouldn't be banned from trading stocks' (February 11, 2022)",
          sourceUrl: "https://finance.yahoo.com/news/congress-members-say-trading-ban-could-have-unintended-consequences-185128648.html",
          reasoning:
            "The case for the status quo from the people it governs, which is why independence is low. Pelosi's own call for tougher fines concedes that the current penalties are weak.",
        },
      ],
    },
    {
      id: "what-a-ban-costs",
      title: "Is the Risk Worth a Ban?",
      short_summary:
        "Large majorities of voters in both parties back a ban, and the Federal Reserve imposed one on its own policymakers in 2021. Opponents say it would push out people with savings, reach spouses' money and treat lawmakers as presumptively corrupt.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A ban treats every member as a suspect to stop a few. It would reach spouses who built savings before their partner ran for office: \"My wife ought to be able to trade her $50,000 that she got after a lifetime of teaching,\" Rep. Perlmutter said. Sen. Tommy Tuberville called a ban \"ridiculous\" and said it would deter people from running, and Sen. Pat Toomey called it \"a solution in search of a problem.\" In 2021 Speaker Pelosi defended members' right to invest: \"We're a free market economy. They should be able to participate in that.\" Forcing sales or blind trusts on members who have done nothing wrong is a cost paid by the honest.",
      proponent_rebuttal:
        "The cost is small and the precedent exists. Every proposal leaves members free to own mutual funds and index funds; what they lose is the chance to bet on individual companies their votes affect. After two regional Fed presidents traded during the 2020 crisis, the Federal Reserve barred its policymakers and senior staff from owning individual stocks, required 45 days' notice and a one-year hold, and Chair Powell said the rules \"raise the bar high in order to assure the public we serve.\" Voters want the same of Congress: 86% backed a ban in 2023, including 87% of Republicans and 88% of Democrats, and 76% said in May 2026 that elected officials should not trade individual stocks.",
      crux: {
        id: "trust-versus-freedom",
        title: "Trust Against Freedom",
        question:
          "Is the risk of trading on public power reason enough to make members and their families give up individual stocks?",
        description:
          "Even with the trade data and enforcement record known, one side holds that public office requires giving up bets that votes can move, because the appearance of conflict corrodes trust; the other holds that members and their spouses should not lose a freedom every other citizen has without proof of wrongdoing. The evidence informs the weighing but does not settle it.",
        methodology:
          "Set the measurable pieces side by side: excess returns on members' trades, the share of members and spouses holding individual stocks, the cost of divesting into funds, any change in who runs for office in states or agencies with similar rules, and public trust before and after the Fed's 2021 ban. Then the reader weighs public trust against private freedom.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Returns, holdings, divestment costs, candidate supply and trust can each be measured; whether the appearance of conflict justifies removing a freedom other citizens keep is a weighing of values no measurement settles.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "The trade-offs can be measured, but no study budget settles the value judgment.",
        falsification: {
          supporter_flip:
            "If a ban measurably drove capable people away from running and trust in Congress did not rise where similar rules apply, some who back it on trust grounds would have to weigh a symbolic gain against a real cost.",
          skeptic_flip:
            "If members and spouses could move into funds at little cost and candidate supply did not fall under the Fed's or other bodies' rules, the claim that a ban punishes the honest would be harder to make, though some would still oppose it on principle.",
          common_ground:
            "Both sides agree that members may own diversified funds, that trading on non-public information is wrong, and that public trust in Congress is low.",
          live_disagreement:
            "Whether the appearance of conflict is itself a harm that justifies a ban, or whether members and their families should keep a freedom other citizens have unless they abuse it.",
        },
      },
      evidence: [
        {
          id: "voters-back-ban-2023",
          title: "2023: 86% of Voters Backed Banning Members From Trading Individual Stocks",
          description:
            "The University of Maryland's Program for Public Consultation surveyed 2,625 registered voters from May 19 to 30, 2023. After hearing arguments on both sides, 86% favored banning members of Congress and family members living with them from trading individual stocks, including 87% of Republicans, 88% of Democrats and 81% of independents; members could still hold diversified funds or keep stocks in a blind trust. Extending the ban to all federal employees drew only 40%. The argument against found most convincing, that insider-trading law already applies, convinced 28%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source:
            "Program for Public Consultation, University of Maryland, 'Ban on Stock Trading for Members of Congress Favored by Overwhelming Bipartisan Majority' (July 19, 2023)",
          sourceUrl: "https://publicconsultation.org/?p=2180",
          reasoning:
            "A probability sample that tested arguments on both sides, which makes it stronger than a one-line poll. Popularity does not show a ban works or is fair, so directness is low; it measures the trust problem supporters say a ban would address.",
        },
        {
          id: "voters-back-ban-2026",
          title: "May 2026: 76% Say Elected Officials Should Not Be Allowed to Trade Individual Stocks",
          description:
            "In the Economist/YouGov poll of May 22-26, 2026, 76% said members of Congress and other elected officials should not be allowed to buy and sell individual stocks and 6% said they should, with 80% of Democrats, 77% of Republicans and 72% of independents opposed. Asked instead whether officials should be banned, 71% said yes. 41% said more than half of members of Congress are corrupt.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "YouGov, 'Most Americans think congressional corruption is widespread: May 22-26, 2026 Economist/YouGov Poll'",
          sourceUrl:
            "https://yougov.com/en-us/articles/54851-most-americans-think-congressional-corruption-is-widespread-may-22-26-2026-economistyougov-poll",
          reasoning:
            "Recent, and its split-wording test shows support holds whichever way the question is put. Like any poll it measures belief, not whether trading actually harms governance.",
        },
        {
          id: "fed-ban-precedent",
          title: "2021: After Two Presidents' Trades, the Fed Barred Its Policymakers From Owning Stocks",
          description:
            "In October 2021 the Federal Reserve barred its policymakers and senior staff from owning individual stocks and bonds, limited them to diversified holdings such as mutual funds, and required 45 days' notice, prior ethics approval and a one-year hold for any trade. The rules followed revelations that Dallas Fed President Robert Kaplan had made trades of $1 million or more in 22 stocks in 2020 and Boston's Eric Rosengren had invested in funds holding mortgage securities the Fed was buying; both resigned. Chair Jerome Powell said the rules \"raise the bar high in order to assure the public we serve.\"",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "PBS NewsHour / Associated Press, 'Federal Reserve imposes sweeping new limits on policymakers' investments' (October 21, 2021)",
          sourceUrl: "https://www.pbs.org/newshour/politics/federal-reserve-imposes-sweeping-new-limits-on-policymakers-investments",
          reasoning:
            "Shows a powerful public body chose a ban over disclosure after an appearance scandal, and that diversified funds are a workable alternative. Fed officials are appointed staff, not elected officials with spouses' careers to consider, so the analogy is partial.",
        },
        {
          id: "free-market-objection",
          title: "Pelosi, 2021: 'We're a Free Market Economy. They Should Be Able to Participate in That'",
          description:
            "Asked at her December 15, 2021 news conference whether she would support banning lawmakers and their spouses from owning shares of individual companies, Speaker Nancy Pelosi rejected the idea: \"We're a free market economy,\" she said. \"They should be able to participate in that.\" She added, \"We have a responsibility to report\" stock trades.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 5,
            directness: 5,
          },
          source: "NBC DFW / CNBC, 'House Speaker Nancy Pelosi opposes banning Congress members from owning individual stocks' (December 15, 2021)",
          sourceUrl:
            "https://www.nbcdfw.com/news/business/money-report/house-speaker-nancy-pelosi-opposes-banning-congress-members-from-owning-individual-stocks-were-a-free-market-economy/2839460/",
          reasoning:
            "States the principled objection: members are citizens with the same right to invest as anyone, and disclosure is the price. Coming from a leader of the body a ban would bind, critics read it as defending the conflict rather than answering it.",
        },
        {
          id: "deters-candidates",
          title: "Tuberville and Toomey: A Ban Would Make Public Service Less Appealing",
          description:
            "Sen. Tommy Tuberville (R-Ala.) said of a ban, \"I think it's ridiculous,\" arguing it would deter people from running for office, and Sen. Pat Toomey (R-Pa.) called it \"a solution in search of a problem\" that makes public service less appealing. Rep. Cindy Axne (D-Iowa) noted that restrictions could complicate family 529 education accounts that hold stocks.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 3,
            directness: 4,
          },
          source: "Yahoo Finance, 'Why some lawmakers say maybe they shouldn't be banned from trading stocks' (February 11, 2022)",
          sourceUrl: "https://finance.yahoo.com/news/congress-members-say-trading-ban-could-have-unintended-consequences-185128648.html",
          reasoning:
            "Names a real cost a ban could carry, but no study has measured whether rules like the Fed's or state ethics laws reduce who runs, so this is a prediction from interested parties.",
        },
        {
          id: "spouses-savings",
          title: "Perlmutter: A Ban Would Reach a Spouse's Lifetime of Savings",
          description:
            "Rep. Ed Perlmutter (D-Colo.) objected most to provisions covering family members: \"My wife ought to be able to trade her $50,000 that she got after a lifetime of teaching.\" Rep. Patrick McHenry (R-N.C.) said \"Congress should suffer under the same laws as every other American\" and questioned tying adult children's trading to their parents' jobs.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 3,
            directness: 5,
          },
          source: "Yahoo Finance, 'Why some lawmakers say maybe they shouldn't be banned from trading stocks' (February 11, 2022)",
          sourceUrl: "https://finance.yahoo.com/news/congress-members-say-trading-ban-could-have-unintended-consequences-185128648.html",
          reasoning:
            "Puts the human cost on the spouse, who did not run for anything. Supporters answer that spouses' trades are where many disputed trades sit, and that funds remain open to them.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Office of Rep. Zach Nunn: Nunn Secures House Passage of Congressional Stock Trading Ban (July 22, 2026)",
      url: "https://nunn.house.gov/2026/07/22/nunn-secures-house-passage-of-congressional-stock-trading-ban",
    },
    {
      title: "Deseret News: Democrats shoot down stock trading ban (September 30, 2026)",
      url: "https://www.deseret.com/politics/2026/09/30/democrats-shoot-down-stock-trading-ban/",
    },
    {
      title: "Roll Call: Congress stock trading ban, what happened? (March 31, 2026)",
      url: "https://rollcall.com/2026/03/31/congress-stock-trading-ban-what-happened/",
    },
  ],
};
