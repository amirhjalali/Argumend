import type { Topic } from "@/lib/schemas/topic";

export const wealthTaxData = {
  id: "wealth-tax",
  title: "Wealth Tax on Billionaires",
  meta_claim:
    "An annual wealth tax on billionaires would be effective, economically sound, and reduce inequality.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "revenue-potential",
      title: "Revenue Potential",
      short_summary:
        "A 2% wealth tax on billionaires could raise $400B+ annually in the US alone.",
      image_url:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "European countries tried wealth taxes and most repealed them due to capital flight, high administrative costs, and low revenue. Wealthy individuals can relocate, restructure assets, or lobby for exemptions. France's wealth tax raised only 0.2% of GDP.",
      proponent_rebuttal:
        "US citizenship-based taxation makes emigration costly (exit tax). A well-designed tax with strong enforcement (IRS funding), international cooperation, and limited exemptions could work. US billionaire wealth grew $2T during COVID alone; a small percentage is feasible.",
      crux: {
        id: "european-experience",
        title: "European Wealth Tax Analysis",
        description:
          "Why did most European wealth taxes fail, and can the US avoid those pitfalls?",
        methodology:
          "Compare design features of failed (France, Sweden) vs. surviving (Switzerland, Norway) wealth taxes. Identify key failure modes: capital flight, valuation challenges, political erosion.",
        equation:
          "R_{actual} = R_{theoretical} \\times (1 - \\text{avoidance rate}) - \\text{admin costs}",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Comparative policy analysis)",
      },
      evidence: [
        {
          id: "us-billionaire-growth",
          title: "US Billionaire Wealth Grew $2T in COVID",
          description:
            "During 2020-2021, US billionaire wealth increased from $3T to $5T while millions lost jobs.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "Forbes, Americans for Tax Fairness",
          reasoning: "Demonstrates concentrated wealth available for taxation.",
        },
        {
          id: "effective-tax-rates",
          title: "Billionaires' 'True Tax Rate' Is Tiny Relative to Wealth Growth",
          description:
            "ProPublica's 2021 'Secret IRS Files' found the 25 richest Americans saw their collective wealth grow $401 billion from 2014 to 2018 while paying $13.6 billion in federal income tax — a 'true tax rate' of just 3.4% measured against wealth growth. The low rate reflects that most billionaire wealth gains are unrealized capital gains that go untaxed under current income-tax rules, not a comparison of effective income-tax rates against middle-class workers.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "ProPublica, 'The Secret IRS Files' (2021)",
          sourceUrl:
            "https://www.propublica.org/article/the-secret-irs-files-trove-of-never-before-seen-records-reveal-how-the-wealthiest-avoid-income-tax",
          reasoning:
            "Illustrates how wealth accumulates as untaxed unrealized gains — the core gap a wealth tax targets. Note this is a 'true tax rate' vs. wealth growth, not an effective income-tax-rate comparison.",
        },
        {
          id: "european-repeal",
          title: "Most European Countries Repealed Wealth Taxes",
          description:
            "France, Sweden, Germany, Austria, and others repealed wealth taxes due to capital flight and low yield.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          reasoning: "Historical evidence of implementation failures.",
        },
        {
          id: "valuation-problems",
          title: "Wealth Valuation Is Extremely Difficult",
          description:
            "Private companies, art, complex derivatives are hard to value annually without creating gaming opportunities.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          reasoning: "Major administrative challenge.",
        },
      ],
    },
    {
      id: "economic-effects",
      title: "Economic Effects",
      short_summary: "Would a wealth tax harm investment and economic growth?",
      image_url:
        "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Taxing wealth discourages investment and entrepreneurship. Billionaires' wealth is mostly productive capital (company equity), not cash. Forcing annual liquidation to pay taxes could harm companies and employees.",
      proponent_rebuttal:
        "Extreme wealth concentration harms growth by reducing consumer spending and increasing rent-seeking. A 2% tax is far below typical investment returns, so investment incentives remain. Billionaires don't create jobs—consumer demand does.",
      crux: {
        id: "investment-impact",
        title: "Investment Impact Analysis",
        description: "Does wealth taxation reduce productive investment?",
        methodology:
          "Study investment rates in countries with/without wealth taxes, controlling for other factors. Analyze billionaire behavior after wealth tax implementation.",
        equation:
          "\\frac{dI}{dW_{tax}} \\text{ (investment elasticity to wealth tax)}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Longitudinal economic study)",
      },
      evidence: [
        {
          id: "inequality-harms-growth",
          title: "Inequality Reduces Growth",
          description:
            "IMF research shows extreme inequality reduces GDP growth by lowering consumer demand and increasing instability.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "IMF Working Papers",
          reasoning: "Established economic research, indirect relevance.",
        },
        {
          id: "wealth-not-consumed",
          title: "Billionaire Wealth Isn't Consumed",
          description:
            "Marginal propensity to consume decreases with wealth; billionaire wealth sits in assets, not economic circulation.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          reasoning: "Standard economics, though investment is also valuable.",
        },
        {
          id: "capital-flight-risk",
          title: "Capital Flight Risk",
          description:
            "Wealthy individuals can move to tax-friendly jurisdictions, taking jobs and investment with them.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          reasoning: "Real concern, though US exit taxes mitigate.",
        },
        {
          id: "equity-illiquidity",
          title: "Most Billionaire Wealth Is Illiquid",
          description:
            "Forcing sale of company stock to pay taxes could destabilize companies and markets.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          reasoning: "Practical implementation concern.",
        },
      ],
    },
  ],
};
