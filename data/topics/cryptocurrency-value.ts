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
    },
  ],
};
