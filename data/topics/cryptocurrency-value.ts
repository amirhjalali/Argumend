export const cryptocurrencyValueData = {
  id: "cryptocurrency-value",
  title: "Is Bitcoin Digital Gold?",
  question:
    "Is Bitcoin a store of value like gold, or a speculative bet?",
  meta_claim:
    "Bitcoin and major cryptocurrencies represent a legitimate long-term store of value comparable to gold or real estate.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: bitcoin peaked at $126,198 on 6 October 2025, ended
  // 2025 down about 6% while gold rose nearly 70%, and traded at $77,751 on
  // 2 November 2026; US spot bitcoin ETFs held $98.14 billion on 30 October
  // 2026 after a $515 million net outflow that month.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Bitcoin hit a record $126,198 on 6 October 2025. On 2 November 2026 it traded at $77,751, about 38% below that peak and 30% lower than a year earlier. In 2025, the year gold rose nearly 70%, bitcoin fell about 6%. Its supply is capped at 21 million coins. The fight is over whether that fixed supply makes it digital gold, or whether it trades like a risky tech bet.",
    confidence: 92,
    source:
      "Fortune, 'Current price of Bitcoin for November 2, 2026'; Reuters via The Star (1 January 2026); MarketScreener (23 December 2025)",
    sourceUrl: "https://fortune.com/article/price-of-bitcoin-11-02-2026/",
  },
  simple_case: [
    "The answer bears on savers who now hold bitcoin through ETFs and pension funds, on companies that borrowed to buy it, and on whether the US government's bitcoin reserve is a hedge or a gamble.",
    "Both sides accept that the 21 million cap is enforced and that bitcoin swings far more than gold. They split over whether those swings will shrink as it matures, and whether its new institutional holders steady the price or sell into falls.",
  ],
  aliases: [
    "Are Bitcoin and major coins a store of value like gold or real estate?",
    "Is Bitcoin a store of value?",
    "Is cryptocurrency a good investment?",
    "Is Bitcoin just digital tulips?",
  ],
  references: [
    {
      title: "Bitcoin: A Peer-to-Peer Electronic Cash System — Satoshi Nakamoto (2008)",
      url: "https://bitcoin.org/bitcoin.pdf",
    },
    {
      title: "Current price of Bitcoin for November 2, 2026 — Fortune",
      url: "https://fortune.com/article/price-of-bitcoin-11-02-2026/",
    },
    {
      title: "Bitcoin set for first yearly loss since 2022 as macro trends weigh on crypto — Reuters via The Star (1 Jan 2026)",
      url: "https://www.thestar.com.my/tech/tech-news/2026/01/01/bitcoin-set-for-first-yearly-loss-since-2022-as-macro-trends-weigh-on-crypto",
    },
    {
      title: "In 2025, Bitcoin put on a show, while gold did the job — MarketScreener (23 Dec 2025)",
      url: "https://uk.marketscreener.com/news/in-2025-bitcoin-put-on-a-show-while-gold-did-the-job-ce7d50d3d180f121",
    },
    {
      title: "Bitcoin market report, October 2026 — Simple Mining (2 Nov 2026)",
      url: "https://www.simplemining.io/insights/post/bitcoin-market-report-october-2026",
    },
    {
      title: "Fact Sheet: President Donald J. Trump Establishes the Strategic Bitcoin Reserve and U.S. Digital Asset Stockpile — White House (6 Mar 2025)",
      url: "https://www.whitehouse.gov/fact-sheets/2025/03/fact-sheet-president-donald-j-trump-establishes-the-strategic-bitcoin-reserve-and-u-s-digital-asset-stockpile/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did bitcoin act like digital gold in 2025?",
      content:
        "In 2025 gold rose nearly 70%, its best year since 1979. Bitcoin, sold for years as digital gold, fell about 6% for the year after a record $126,198 in October, and one analyst quoted by Reuters said it 'increasingly exhibits the characteristics of a risk asset'. Was that a failed test, or one bad year for an asset that has beaten gold over most four-year windows?",
    },
    {
      id: "q2",
      title: "Does a 21 million cap make bitcoin valuable?",
      content:
        "Bitcoin's code caps supply at 21 million coins, and any full node can check it. But anyone can copy the code, and thousands of tokens have. Is bitcoin's value in the cap, in the network that enforces it, or in neither?",
    },
    {
      id: "q3",
      title: "Will ETFs and corporate buyers make bitcoin steadier?",
      content:
        "US spot bitcoin ETFs held $98 billion at the end of October 2026, Strategy alone held about 848,500 coins, and the US government keeps a Strategic Bitcoin Reserve it says it will not sell. Supporters say patient institutional holders damp volatility. Critics point to October 2026, when ETF investors pulled a net $515 million as the price fell 7%. Are these holders a floor, or more sellers in a panic?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Digital scarcity
    // =========================================================================
    {
      id: "scarcity-mechanism",
      title: "Scarcity: Does a 21 Million Cap Make It Worth Anything?",
      short_summary:
        "Bitcoin's code caps supply at 21 million coins, and no central party can print more. Supporters say that makes it the first scarce digital asset, like gold. Critics say scarcity alone creates nothing: the code can be copied, thousands of tokens copy it, and a rule set by consensus could in principle be changed.",
      image_url:
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=60",
      icon_name: "Target" as const,
      skeptic_premise:
        "Scarcity is not value. Plenty of things are rare and worthless, and a digital rule is easier to copy than a gold mine. Bitcoin's code is open source: Bitcoin Cash, Bitcoin SV, Litecoin and thousands of other tokens copy the same fixed-supply rule, so the supply of 'scarce by design' coins is unlimited. The 21 million cap is a social agreement among miners, node operators and exchanges, not a law of physics, and agreements change under pressure, for example if mining rewards fall too low to pay for security after future halvings. Gold has been money for five thousand years because it is useful, durable and needs no network to exist. Bitcoin's worth rests entirely on other people continuing to want it, which is the definition of a speculative asset, and why critics call it digital tulips.",
      proponent_rebuttal:
        "The cap is enforced, not promised. Every full node, and there are thousands, checks every block, and a block that pays out more than the schedule allows is rejected. Changing the cap would split the chain and destroy the very property holders value, a coordination problem no one has overcome in 17 years. Copies prove the point rather than refute it: Bitcoin Cash and Bitcoin SV split off with the same code and the same cap, and lost most of their value against the original, because what cannot be copied is the network: the largest proof-of-work security of any chain, the deepest liquidity, and custody at the largest exchanges and asset managers. Gold's supply is not fixed either; miners add to it every year. No asset is valuable in itself. Gold, too, is worth what people will pay, and bitcoin is the first asset whose total supply anyone can verify from a laptop.",
      crux: {
        id: "lindy-effect",
        title: "The Lindy Effect Test",
        question:
          "Is Bitcoin's lead a durable network moat, or a first-mover edge a better protocol could erode?",
        description:
          "If bitcoin keeps its share of crypto value, security and liquidity against newer chains for another decade, while forks that copy its cap keep fading, its lead is a network effect like a language or a currency. If holders, exchanges and institutions move to rivals once those offer features bitcoin lacks, its lead was timing.",
        methodology:
          "Track bitcoin's share of total crypto market value, its share of proof-of-work security spending, settlement volume and developer activity against newer protocols each year. Record whether exchanges, ETF issuers and custodians shift holdings after a rival ships a feature bitcoin lacks. Track the chain's survival without a fatal bug, a successful 51% attack or a quantum break of its signatures.",
        equation: "E[\\text{lifespan}_{future}] \\propto \\text{age}_{current}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Track Bitcoin's share of total crypto market value, settlement volume and developer activity over the next decade against newer protocols, and how often users, exchanges and institutions move holdings elsewhere after a rival ships features Bitcoin lacks.",
        },
        cost_to_verify: "$0 (public on-chain and market data; needs time)",
        falsification: {
          supporter_flip:
            "If a change to the 21M cap reached consensus, or a 51% attack, a fatal protocol bug or a practical quantum break against ECDSA compromised the chain, the 'durable digital scarcity' claim would fail, since the property behind Bitcoin's value would prove mutable or breakable.",
          skeptic_flip:
            "If forks copying the same scarcity, like Bitcoin Cash, SV and Litecoin, kept losing value and share to the original, and the dominant chain's hashrate and liquidity stayed out of their reach, 'scarcity is infinitely cloneable' would lose its force.",
          common_ground:
            "Both sides agree the 21M cap is currently enforced and auditable by any full node, and that thousands of other tokens copy the same supply mechanism without matching Bitcoin's adoption.",
          live_disagreement:
            "Whether Bitcoin's lead is a durable, defensible network moat or a temporary first-mover position that a superior protocol could erode — which only continued survival without existential failure, tracked over another decade-plus, can settle.",
        },
      },
      evidence: [
        {
          id: "fixed-supply-protocol",
          title: "Bitcoin's 21 million cap is enforced by every full node, not by any issuer",
          description:
            "Bitcoin's issuance follows a fixed schedule: the reward for each block halves every 210,000 blocks, roughly every four years, approaching a maximum of 21 million coins around 2140. No central party can issue more. Any node can audit total supply, and changing the cap would need near-universal agreement among independent miners, node operators and exchanges.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 7,
          },
          source: "Nakamoto, 'Bitcoin: A Peer-to-Peer Electronic Cash System' (2008); Bitcoin Core source code",
          sourceUrl: "https://bitcoin.org/bitcoin.pdf",
          reasoning:
            "Anyone running a node can check the schedule, so reliability and replicability are as high as evidence gets. Directness is 7 because verifiable scarcity of one chain is necessary for a store of value but does not by itself make anyone want to hold it.",
        },
        {
          id: "fork-proliferation",
          title: "Bitcoin Cash and Bitcoin SV copied the code and the cap, then lost most of their value against the original",
          description:
            "Bitcoin's code has been copied many times: Bitcoin Cash split off in 2017 and Bitcoin SV in 2018, and Litecoin and thousands of other tokens use the same fixed-supply idea. Critics say this shows 'digital scarcity' is an illusion, since scarce-by-design tokens can be created without limit. The forks have lost value and market share against the original chain, which keeps the largest share of total crypto market value.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "CoinGecko and CoinMarketCap historical data",
          sourceUrl: "https://www.coingecko.com",
          reasoning:
            "Shows the cap itself is cloneable, which undercuts scarcity as the source of value. Directness is 6 because the forks' failure also supports the other side's point that the network, not the rule, is what holds value.",
        },
        {
          id: "network-effect-dominance",
          title: "Bitcoin has the largest proof-of-work security and deepest liquidity of any crypto network",
          description:
            "Bitcoin is secured by the largest proof-of-work hashrate of any cryptocurrency, making a 51% attack very costly, and has the deepest liquidity and widest exchange and custody support. Supporters argue this network effect, not bare scarcity, is what forks cannot copy, as one currency or language wins over identical rivals.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Cambridge Centre for Alternative Finance, Bitcoin Electricity Consumption Index",
          sourceUrl: "https://ccaf.io/cbnsi/cbeci",
          reasoning:
            "Hashrate and liquidity are measurable. Independence is 6 because much of the 'moat' argument comes from interested parties, and a network lead is a present fact, not proof it lasts.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: The 2025-26 test — did it behave like gold?
    // =========================================================================
    {
      id: "volatility-problem",
      title: "The 2025–26 Test: Did It Behave Like Gold?",
      short_summary:
        "In 2025 gold rose nearly 70% while bitcoin fell about 6% after a record in October. By November 2026 bitcoin was about 38% below that peak. It has fallen 70-85% from its highs in past cycles. Supporters say volatility is shrinking as the market grows and that bitcoin has beaten gold over most four-year windows. Critics say an asset that falls when gold rises is not a hedge.",
      image_url:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      icon_name: "Zap" as const,
      skeptic_premise:
        "A store of value is supposed to hold up when other things fall. 2025 was the test, and bitcoin failed it. Gold rose nearly 70%, its best year since 1979. Bitcoin hit a record $126,198 on 6 October 2025, then fell, ending the year down about 6%, and by 2 November 2026 it was at $77,751, about 38% below the peak. Reuters quoted an analyst saying bitcoin 'increasingly exhibits the characteristics of a risk asset', moving with stocks rather than against them. This is not new. It fell about 85% after its 2017 peak and about 77% after its 2021 high. Gold's annual volatility is around 15-20%; bitcoin's has routinely been several times that. People cannot store savings in something that can lose three-quarters of its value in a year, and the crashes of Terra/Luna and FTX in 2022 showed how much of the crypto market is leverage and counterparty risk.",
      proponent_rebuttal:
        "Judge a store of value over the horizon savers use. Bitcoin's volatility has fallen as its market grew, from often above 100% a year before 2015 toward 40-60% in recent cycles, the path young monetary assets take as they find their price. Across most of its history, anyone who held for four years ended ahead, and its compound return since 2009 has far exceeded stocks, bonds and gold. One year of lagging gold is not a verdict: gold itself spent many years below its 1980 high, and no one concluded it had stopped being a store of value. Bitcoin's fall from its 2025 peak has so far been milder than the 77% fall of 2022. The failures of 2022 were Terra and FTX, a fake stablecoin and a fraudulent exchange; bitcoin itself kept producing blocks every ten minutes throughout.",
      crux: {
        id: "volatility-trajectory",
        title: "Volatility Trend Analysis",
        question:
          "Will Bitcoin's volatility keep falling toward store-of-value levels, or plateau above them?",
        description:
          "If bitcoin's rolling volatility keeps falling and its drawdowns shrink cycle by cycle, and it starts holding up when stocks fall, it is maturing toward a store of value. If volatility plateaus well above gold's and it keeps falling with stocks in sell-offs, as in 2025-26, its behaviour is that of a risk asset.",
        methodology:
          "Compute rolling one-year volatility of bitcoin's price since 2011 from public exchange data and fit the trend. Compare it with gold's volatility after its price was freed in the 1970s. Measure bitcoin's correlation with the Nasdaq and with gold in each stress period (2020, 2022, 2025-26), and the size of each cycle's peak-to-trough fall.",
        equation: "\\sigma_{annual} = f(\\text{market cap}, \\text{adoption rate}, t)",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Rolling one-year volatility of Bitcoin's price, computed from public exchange data and compared decade by decade with gold and major stock indexes, checked for continued decline in calm years and stress years alike.",
        },
        cost_to_verify: "$0 (historical price data)",
        falsification: {
          supporter_flip:
            "If rolling volatility stayed in the 50-80% range as ETF and derivatives markets deepened, fresh falls of 70% or more kept coming, and bitcoin kept dropping with stocks while gold rose, the claim that volatility is a passing stage of adoption would fail.",
          skeptic_flip:
            "If annualized volatility kept compressing toward gold's range across the next cycle, each drawdown smaller than the last, and bitcoin began holding up in stock-market sell-offs, the 2025 lag would look like a stage rather than a permanent trait.",
          common_ground:
            "Both sides agree bitcoin's volatility and drawdowns far exceed gold's, that its volatility has fallen from its earliest years, and that it lagged gold badly in 2025.",
          live_disagreement:
            "Whether bitcoin's volatility will keep falling toward store-of-value levels and its correlation with stocks fade, or whether it will stay a high-volatility risk asset, which only more cycles of data can show.",
        },
      },
      evidence: [
        {
          id: "gold-vs-bitcoin-2025",
          title: "2025: gold rose nearly 70%, its best year since 1979; bitcoin fell about 6%",
          description:
            "Gold 'soared by nearly 70% in 2025', its strongest annual gain since 1979, MarketScreener reported on 23 December 2025, while bitcoin was 'on track to end the year down', its first negative year since 2022, 'for now losing its fantasized status as the \"new digital gold.\"' Reuters reported on 31 December that bitcoin was set to end 2025 'more than 6% lower' after 'an all-time peak above $126,000 in early October', and quoted Linh Tran of XS.com: 'bitcoin increasingly exhibits the characteristics of a risk asset within the global financial system.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "MarketScreener, 'In 2025, Bitcoin put on a show, while gold did the job' (23 December 2025); Reuters (Hannah Lang), via The Star (1 January 2026)",
          sourceUrl:
            "https://www.thestar.com.my/tech/tech-news/2026/01/01/bitcoin-set-for-first-yearly-loss-since-2022-as-macro-trends-weigh-on-crypto",
          reasoning:
            "The clearest recent test of the 'digital gold' claim: in a year when investors sought a hedge, they chose gold. It is one year, which is why the other side calls it noise, but it is exactly the kind of year a store of value is for.",
        },
        {
          id: "drawdown-history",
          title: "Bitcoin fell about 85% after 2017, 77% after 2021, and was 38% below its 2025 peak in November 2026",
          description:
            "Bitcoin fell about 85% after its 2017 peak (from about $19,000 to about $3,200 by late 2018) and about 77% from its November 2021 high near $69,000 to about $15,500 in late 2022. It reached a record $126,198.07 on 6 October 2025; on 2 November 2026 it traded at $77,750.64, about 38% below that peak and 29.65% lower than a year earlier, Fortune reported. Its annualized volatility has routinely exceeded 60%, several times gold's typical 15-20%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source: "Fortune, 'Current price of Bitcoin for November 2, 2026'; historical exchange price data (CoinGecko)",
          sourceUrl: "https://fortune.com/article/price-of-bitcoin-11-02-2026/",
          reasoning:
            "Prices are public and anyone can check them. Falls of this size are hard to square with a stable store of value over the one-to-three-year horizons most savers face; directness is 8 rather than higher because long-horizon holders were still ahead after each past fall.",
        },
        {
          id: "volatility-declining-trend",
          title: "Bitcoin's volatility has fallen from often above 100% a year before 2015 toward 40-60%",
          description:
            "Rolling realized volatility has trended lower over bitcoin's life: often above 100% annualized before 2015, compressing toward the 40-60% range in recent cycles as market value, liquidity and derivatives and ETF markets grew. Supporters say this mirrors early gold and other new monetary assets, and that volatility is the cost of price discovery rather than a permanent flaw.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Fidelity Digital Assets research; on-chain analytics (Glassnode)",
          sourceUrl: "https://www.glassnode.com",
          reasoning:
            "The trend can be computed from public prices. That it will continue to gold-like levels is an extrapolation, and independence is 6 because much of the framing comes from crypto-aligned research desks.",
        },
        {
          id: "long-horizon-returns",
          title: "Bitcoin has ended most four-year holding periods ahead, beating stocks, bonds and gold since 2009",
          description:
            "Over most of its history, four-year holding windows for bitcoin have ended in gains, and its compound annual return since launch has far exceeded equities, bonds and gold despite its volatility. Supporters argue a store of value should be judged over long horizons. The margin is thinning: 2025 was the first year after a halving to close with a loss, and a buyer at the October 2025 peak was about 38% down a year later.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 7,
            directness: 5,
          },
          source: "Historical price series (CoinGecko); comparative asset-return analyses",
          sourceUrl: "https://www.coingecko.com/en/coins/bitcoin",
          reasoning:
            "Real and computable, but drawn from a short history of one rising asset, which invites survivorship bias, and high past returns are a different property from holding value steadily, so directness is 5.",
        },
        {
          id: "terra-ftx-failures",
          title: "Terra/Luna and FTX collapsed in 2022 as bitcoin fell 77% alongside them",
          description:
            "In May 2022 the Terra/Luna ecosystem, including the 'stable' UST, collapsed within days, erasing roughly $40-60 billion. In November 2022 the exchange FTX failed amid evidence of misused customer funds; its founder was later convicted of fraud. Bitcoin, which neither failed nor stopped working, fell sharply in the same period.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "SEC and DOJ filings; court records (US v. Bankman-Fried)",
          sourceUrl: "https://www.sec.gov/newsroom/press-releases/2022-219",
          reasoning:
            "Shows how much of the crypto market is leverage and counterparty risk, and that bitcoin's price is dragged down by failures elsewhere. Directness is 5 because bitcoin itself was not the failed instrument.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: The new holders — ETFs, companies and governments
    // =========================================================================
    {
      id: "institutional-holders",
      title: "The New Holders: A Floor or More Sellers?",
      short_summary:
        "Since 2024 bitcoin has gone mainstream: US spot ETFs held $98 billion at the end of October 2026, Strategy alone holds about 848,500 coins, and a March 2025 executive order set up a US Strategic Bitcoin Reserve that will not sell. Supporters say these patient holders are what turns a speculative asset into a reserve asset. Critics say ETF money leaves fast in a fall, and companies that borrowed to buy may be forced to sell.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Institutional money has not made bitcoin steadier; it has added new channels for panic. The record came in October 2025, when ETFs and treasury companies were already among the largest holders, and the fall since has run through those channels. In October 2026 alone, US spot ETFs lost a net $515 million while bitcoin fell 7.3%, and their total net assets dropped from $107.98 billion to $98.14 billion in a month. ETF holders are not committed savers; they can sell at the click of a button, and in a falling market they do. Companies that bought bitcoin with borrowed money or new shares depend on its price staying high to keep raising money, and a long fall could force sales. The US reserve is made of coins seized in criminal cases, and the order lets officials add more only if it costs taxpayers nothing. A government stockpile of forfeited coins is not evidence that bitcoin holds value.",
      proponent_rebuttal:
        "What makes gold a store of value is who holds it: central banks, funds and households that keep it through bad years. Bitcoin is gaining the same holder base. US spot ETFs, launched in January 2024, held $98 billion at the end of October 2026 even after a weak month. Strategy held about 848,500 coins in October 2026 and kept buying as the price fell, as did smaller treasury companies such as Strive. In March 2025 the US set up a Strategic Bitcoin Reserve to 'treat bitcoin as a reserve asset', and the White House said: 'With a fixed supply of 21 million coins, there is a strategic advantage to being among the first nations to create a strategic bitcoin reserve.' The order says the US 'will not sell' the bitcoin deposited in it. Holders who do not sell in a fall are what shrink volatility over time, and a month of ETF outflows is small next to the total they still hold.",
      crux: {
        id: "institutional-holders-stability",
        title: "The Holder Test",
        question:
          "Do ETF, corporate and government holders keep their bitcoin in a sell-off, or sell into it?",
        description:
          "If ETF assets, corporate treasuries and government reserves hold or add coins through price falls, bitcoin's holder base is maturing like gold's and should damp volatility over time. If ETF outflows and forced corporate sales speed up falls, institutional ownership adds to the swings rather than steadying them.",
        methodology:
          "From daily ETF flow data and company filings (8-Ks), measure net flows and holdings changes during each fall of 20% or more since January 2024. Compare price falls on days of large ETF outflows with other days, and track whether any company holding bitcoin on its balance sheet sold under debt or margin pressure. Compare with gold ETF and central-bank behaviour in gold's own falls.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Daily ETF flows and corporate 8-K holdings tracked through every fall of 20% or more since January 2024, with any debt-driven corporate sales recorded, set against how gold funds and central banks behaved in gold's own falls.",
        },
        cost_to_verify:
          "$0-50K (ETF flow data and company filings are public)",
        falsification: {
          supporter_flip:
            "If ETF holders sold heavily in every major fall and companies that borrowed to buy were forced to sell, the claim that new holders turn bitcoin into a steadier store of value would weaken.",
          skeptic_flip:
            "If ETF assets and corporate treasuries held or grew through falls of 20% or more, no leveraged holder was forced to sell, and volatility kept falling as their share of supply rose, the charge that they only add panic channels would weaken.",
          common_ground:
            "Both sides agree spot ETFs, companies such as Strategy and the US government now hold large amounts of bitcoin, and that ETF investors pulled money out in October 2026 as the price fell.",
          live_disagreement:
            "Whether these holders are long-term owners who steady the price, as central banks steady gold, or fast money and borrowers who sell into falls.",
        },
      },
      evidence: [
        {
          id: "us-strategic-bitcoin-reserve",
          title: "US set up a Strategic Bitcoin Reserve in March 2025 to 'treat bitcoin as a reserve asset'",
          description:
            "A White House fact sheet of 6 March 2025 said the executive order creates a Strategic Bitcoin Reserve that will 'treat bitcoin as a reserve asset', capitalized with Treasury-owned bitcoin forfeited in criminal or civil cases. The US 'will not sell bitcoin deposited into this Strategic Bitcoin Reserve', and the Treasury and Commerce Secretaries may develop 'budget-neutral strategies for acquiring additional bitcoin' at no incremental cost to taxpayers. The fact sheet said 'With a fixed supply of 21 million coins, there is a strategic advantage' to being among the first nations to create such a reserve.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 3,
            replicability: 6,
            directness: 5,
          },
          source: "White House, 'Fact Sheet: President Donald J. Trump Establishes the Strategic Bitcoin Reserve and U.S. Digital Asset Stockpile' (6 March 2025)",
          sourceUrl:
            "https://www.whitehouse.gov/fact-sheets/2025/03/fact-sheet-president-donald-j-trump-establishes-the-strategic-bitcoin-reserve-and-u-s-digital-asset-stockpile/",
          reasoning:
            "A major government treating bitcoin as a reserve asset is a step gold took long ago. Independence is 3 because the administration and the President's family have crypto interests, and directness is 5 because the reserve holds seized coins and buys nothing with public money, so it says more about policy than about bitcoin's behaviour.",
        },
        {
          id: "etf-flows-october-2026",
          title: "Spot bitcoin ETFs lost a net $515 million in October 2026 as assets fell to $98 billion",
          description:
            "Spot bitcoin ETFs 'lost a net $515.0 million across 22 trading days as of October 30, 2026', their first net-outflow month since June, Simple Mining reported, and total net assets 'fell from $107.98 billion on September 30 to $98.14 billion on October 30.' Bitcoin closed October at $77,423.98, down 7.34% for the month. Strategy's holdings rose from 847,666 to 848,517 coins over the month and Strive's from 32,773 to 43,000, per their 8-K filings.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "Simple Mining, Bitcoin market report for October 2026 (2 November 2026), compiling ETF flow data and company 8-K filings",
          sourceUrl: "https://www.simplemining.io/insights/post/bitcoin-market-report-october-2026",
          reasoning:
            "Shows ETF money leaving as the price fell, the pro-cyclical pattern critics expect, while corporate treasuries kept buying, which supports the other side. One month is a small sample, and most of the fall in ETF assets reflects the lower price rather than withdrawals, so directness is 5.",
        },
      ],
    },
  ],
};
