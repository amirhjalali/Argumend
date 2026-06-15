import type { Topic } from "@/lib/schemas/topic";

export const cryptocurrencyValueData = {
  id: "cryptocurrency-value",
  title: "Cryptocurrency as Store of Value",
  meta_claim:
    "Bitcoin and major cryptocurrencies represent a legitimate long-term store of value comparable to gold or real estate.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "scarcity-mechanism",
      title: "Digital Scarcity",
      short_summary:
        "Bitcoin's fixed supply of 21 million coins creates genuine scarcity in a digital asset for the first time.",
      image_url:
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=60",
      icon_name: "Target" as const,
      skeptic_premise:
        "Scarcity alone doesn't create value - there are infinite unique things that are worthless. Bitcoin can be forked infinitely, and thousands of cryptocurrencies exist. The code could theoretically be changed by consensus.",
      proponent_rebuttal:
        "Network effects create moats. Bitcoin has the strongest network (hashrate, liquidity, recognition). Changing the 21M limit would fork the chain and destroy the property that gives it value. Gold's supply isn't truly fixed either (asteroid mining, new deposits).",
      crux: {
        id: "lindy-effect",
        title: "The Lindy Effect Test",
        description:
          "If Bitcoin survives another 15 years without fundamental protocol failure, its expected remaining lifespan increases proportionally.",
        methodology:
          "Track: major protocol bugs, 51% attacks, quantum computing threats, regulatory bans. Each year of survival without existential threat increases confidence.",
        equation: "E[\\text{lifespan}_{future}] \\propto \\text{age}_{current}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Time will tell)",
      },
      evidence: [
        {
          id: "fixed-supply-protocol",
          title: "Bitcoin's 21 Million Cap Is Enforced by Protocol Consensus",
          description:
            "Bitcoin's issuance is governed by a hard-coded supply schedule that halves the block reward roughly every four years (every 210,000 blocks), asymptotically approaching a maximum of 21 million coins around the year 2140. Unlike fiat currencies, no central party can increase issuance. Any node can independently audit total supply, and changing the cap would require near-universal consensus among economically independent participants — a coordination problem that has never been overcome.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 8,
          },
          source: "Nakamoto, 'Bitcoin: A Peer-to-Peer Electronic Cash System'; Bitcoin Core source",
          sourceUrl: "https://bitcoin.org/bitcoin.pdf",
          reasoning:
            "The supply schedule is verifiable by anyone running a full node, making it highly replicable and reliable. It directly supports the claim that Bitcoin offers genuine, auditable digital scarcity. Weight is tempered because 'scarcity of one chain' does not by itself establish economic value.",
        },
        {
          id: "fork-proliferation",
          title: "Bitcoin Has Been Forked Repeatedly Without Diluting the Original",
          description:
            "Bitcoin's open-source code has been forked many times — Bitcoin Cash (2017), Bitcoin SV (2018), Litecoin, and thousands of other cryptocurrencies copy the same scarcity mechanism. Skeptics argue this shows 'digital scarcity' is illusory because the supply of scarce-by-design tokens is effectively unlimited. Yet the forks have consistently lost value and market share relative to the original chain, with Bitcoin retaining the dominant share of total crypto market capitalization.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "CoinMarketCap historical data; CoinGecko",
          sourceUrl: "https://www.coingecko.com",
          reasoning:
            "Fork history is public and verifiable. It directly challenges the premise that per-coin scarcity creates value, since identical scarcity can be cloned infinitely. The weight reflects that the forks' market failure also partly supports the proponent's network-effect rebuttal.",
        },
        {
          id: "network-effect-dominance",
          title: "Bitcoin's Hashrate and Liquidity Create a Durable Network Moat",
          description:
            "Bitcoin's network is secured by the largest proof-of-work hashrate of any cryptocurrency, making a 51% attack prohibitively expensive, and it commands the deepest liquidity and broadest exchange/custody support. Proponents argue this network effect — not bare scarcity — is what gives the dominant chain a defensible moat that forks cannot replicate, analogous to why one social or monetary network wins over identical clones.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Cambridge Bitcoin Electricity Consumption Index; Glassnode",
          sourceUrl: "https://ccaf.io/cbnsi/cbeci",
          reasoning:
            "Hashrate and liquidity metrics are measurable from public on-chain and exchange data. They support the rebuttal that network effects, not scarcity alone, drive value. Independence is moderate because much commentary on Bitcoin's 'moat' comes from interested parties.",
        },
      ],
    },
    {
      id: "volatility-problem",
      title: "The Volatility Problem",
      short_summary:
        "Bitcoin's extreme price volatility undermines its use as a store of value.",
      image_url:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      icon_name: "Zap" as const,
      skeptic_premise:
        '80% drawdowns are incompatible with "store of value." Gold varies 20-30% per year; Bitcoin varies 50-80%. Institutional investors require lower volatility. It\'s speculation, not storage.',
      proponent_rebuttal:
        "Volatility decreases as market cap grows - early gold markets were also volatile. On any 4-year holding period, Bitcoin has outperformed all other assets. Volatility is the price of adoption; it will stabilize as the market matures.",
      crux: {
        id: "volatility-trajectory",
        title: "Volatility Trend Analysis",
        description:
          "Track whether Bitcoin's volatility is decreasing over time as the market matures.",
        methodology:
          "Calculate rolling 1-year volatility since 2011. Fit trend line. Compare to gold's historical volatility trajectory after price discovery.",
        equation: "\\sigma_{annual} = f(\\text{market cap}, \\text{adoption rate}, t)",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (Historical data analysis)",
      },
      evidence: [
        {
          id: "drawdown-history",
          title: "Bitcoin Has Repeatedly Suffered 70-85% Peak-to-Trough Drawdowns",
          description:
            "Bitcoin's price history includes multiple drawdowns of roughly 70-85% from prior highs: an ~85% fall after the 2017 peak (from ~$19,000 to ~$3,200 by late 2018) and a ~75% fall from the November 2021 high near $69,000 to ~$16,000 in late 2022. Realized annualized volatility has routinely exceeded 60-80%, several times that of gold (typically ~15-20%). Such drawdowns are difficult to reconcile with the function of a stable store of value over short and medium horizons.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "Historical exchange price data (Coinbase, Bitstamp); CFA Institute research",
          sourceUrl: "https://www.coingecko.com/en/coins/bitcoin",
          reasoning:
            "Price and volatility are publicly recorded and trivially reproducible from market data. The drawdowns directly undermine the store-of-value claim over the holding periods most investors care about. High weight across all dimensions.",
        },
        {
          id: "volatility-declining-trend",
          title: "Bitcoin's Realized Volatility Has Trended Lower as Market Cap Grew",
          description:
            "Long-run analyses of rolling realized volatility show a gradual downward trend: extreme early-period volatility (often >100% annualized before 2015) has compressed toward the 40-60% range in recent cycles as market capitalization, liquidity, and derivatives/ETF markets matured. Proponents argue this trajectory mirrors early gold and other emerging monetary assets, and that volatility is the cost of ongoing price discovery rather than a permanent disqualifier.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Fidelity Digital Assets research; on-chain analytics (Glassnode)",
          sourceUrl: "https://www.glassnode.com",
          reasoning:
            "The declining-volatility trend is computable from public price series, but the interpretation that it will continue to converge to store-of-value levels is an extrapolation. Independence is moderate because much of this framing originates from crypto-aligned research desks.",
        },
        {
          id: "long-horizon-returns",
          title: "On Multi-Year Holding Periods Bitcoin Has Historically Posted High Returns",
          description:
            "Over its full history, every four-year holding window for Bitcoin had, as of early 2026, ended in positive returns, and its compound annual return since inception has exceeded that of equities, bonds, and gold despite far higher volatility. Proponents argue a store of value should be judged over long horizons, where Bitcoin has preserved and grown purchasing power, not over short windows where volatility dominates.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 7,
            directness: 6,
          },
          source: "Historical price series; comparative asset-return analyses",
          sourceUrl: "https://www.coingecko.com/en/coins/bitcoin",
          reasoning:
            "Long-horizon returns are real and computable, but they reflect a short, survivorship-prone history of a single rising asset and do not guarantee future store-of-value behavior. Lower independence and directness because past return is not the same property as price stability.",
        },
        {
          id: "terra-ftx-failures",
          title: "Terra/Luna and FTX Collapses Show Crypto's Fragility as a Value Store",
          description:
            "In May 2022 the Terra/Luna ecosystem — including the 'stable' UST — collapsed almost completely within days, erasing roughly $40-60 billion. In November 2022 the major exchange FTX failed and filed for bankruptcy amid evidence of misused customer funds; its founder was later convicted of fraud. These episodes, alongside Bitcoin's correlated drawdowns during the same period, illustrate that much of the crypto market behaves as speculative, contagion-prone, and counterparty-dependent rather than as a stable reserve asset.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "SEC and DOJ filings; court records (US v. Bankman-Fried)",
          sourceUrl: "https://www.sec.gov/newsroom/press-releases/2022-219",
          reasoning:
            "These failures are documented in regulatory filings and court records. They directly support the speculative-bubble framing. Directness is slightly reduced because Bitcoin itself was not the failed instrument, though it fell sharply in the same contagion.",
        },
      ],
    },
  ],
};
