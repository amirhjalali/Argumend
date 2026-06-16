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
            "Between the March 2020 onset of the pandemic and October 2021, the collective wealth of US billionaires rose roughly 70% — from just under $3 trillion to over $5 trillion — per Americans for Tax Fairness and the Institute for Policy Studies, which analyze Forbes data. The number of US billionaires grew from 614 to 745 over the same window.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 6,
          },
          source:
            "Americans for Tax Fairness & Institute for Policy Studies, analysis of Forbes data (2021)",
          sourceUrl:
            "https://americansfortaxfairness.org/2-years-covid-u-s-billionaires-1-7-trillion-57-richer/",
          reasoning:
            "Demonstrates concentrated wealth available for taxation. Source is an advocacy-group analysis of Forbes estimates (not an independent peer-reviewed dataset), so independence/reliability are moderated; the underlying Forbes wealth figures are widely reported.",
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
            "The number of OECD countries levying an individual net wealth tax fell from 12 in 1990 to 4 by 2017 (France, Norway, Spain, Switzerland). Repeals — Austria (1994), Denmark and Germany (1997), the Netherlands (2001), Finland, Iceland and Luxembourg (2006), Sweden (2007), France (2018) — were typically justified by efficiency and administrative concerns, capital flight, and the fact that revenues raised were, with few exceptions, very low.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "OECD (2018), 'The Role and Design of Net Wealth Taxes in the OECD', OECD Tax Policy Studies No. 26",
          sourceUrl:
            "https://www.oecd.org/en/publications/the-role-and-design-of-net-wealth-taxes-in-the-oecd_9789264290303-en.html",
          reasoning:
            "Authoritative OECD comparative review documenting the repeal record and its stated rationale.",
        },
        {
          id: "valuation-problems",
          title: "Wealth Valuation Is Extremely Difficult",
          description:
            "Annually valuing infrequently traded assets — private businesses, real estate, art — is a central administrative difficulty of net wealth taxes. The OECD notes such hard-to-value assets were often exempted or narrowed the base, and recommends using market value (possibly discounted to e.g. 80–85%) to limit valuation disputes.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "OECD (2018), 'The Role and Design of Net Wealth Taxes in the OECD', OECD Tax Policy Studies No. 26",
          sourceUrl:
            "https://www.oecd.org/en/publications/the-role-and-design-of-net-wealth-taxes-in-the-oecd_9789264290303-en.html",
          reasoning: "Major administrative challenge documented in the OECD review.",
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
            "An IMF staff study (Ostry, Berg & Tsangarides 2014) finds that lower net inequality is robustly associated with faster and more durable growth, and that fiscal redistribution — except in extreme cases — shows little evidence of adverse growth effects. The result challenges a strict equity-efficiency trade-off rather than proving that inequality directly reduces GDP via lower demand.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source:
            "Ostry, Berg & Tsangarides (2014), 'Redistribution, Inequality, and Growth', IMF Staff Discussion Note SDN/14/02",
          sourceUrl:
            "https://www.elibrary.imf.org/view/journals/006/2014/002/article-A001-en.xml",
          reasoning:
            "Established IMF cross-country research. Claim reworded to match the study's actual finding (inequality/growth-spell correlation), and directness lowered because the link to a billionaire wealth tax specifically is indirect.",
        },
        {
          id: "wealth-not-consumed",
          title: "Billionaire Wealth Isn't Consumed",
          description:
            "The marginal propensity to consume falls sharply with wealth: high-wealth households save a far larger share of income, so most of their wealth is held in assets rather than spent. Carroll et al. show MPC is heavily concentrated among lower-wealth households, a standard result in the consumption-saving literature.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "Carroll, Slacalek, Tokuoka & White (2017), 'The Distribution of Wealth and the Marginal Propensity to Consume', Quantitative Economics",
          sourceUrl:
            "https://www.econ2.jhu.edu/people/ccarroll/papers/cstwMPC.pdf",
          reasoning:
            "Peer-reviewed consumption-theory result. Directness lowered: low billionaire MPC is suggestive but not direct proof a wealth tax improves growth (forgone investment is also a channel).",
        },
        {
          id: "capital-flight-risk",
          title: "Capital Flight Risk",
          description:
            "Wealthy individuals can relocate to lower-tax jurisdictions. The OECD identifies capital flight and taxpayer migration as recurring problems that contributed to European wealth-tax repeals, though it notes the effect depends heavily on design and enforcement.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "OECD (2018), 'The Role and Design of Net Wealth Taxes in the OECD', OECD Tax Policy Studies No. 26",
          sourceUrl:
            "https://www.oecd.org/en/publications/the-role-and-design-of-net-wealth-taxes-in-the-oecd_9789264290303-en.html",
          reasoning:
            "Real concern documented by the OECD, though US citizenship-based taxation and exit taxes (e.g. a 40% exit levy in the Warren proposal) and empirical findings that billionaires relocate less than average would mitigate it.",
        },
        {
          id: "equity-illiquidity",
          title: "Most Billionaire Wealth Is Illiquid",
          description:
            "Much billionaire wealth is concentrated in company equity rather than cash. The OECD flags liquidity problems for asset-rich, income-poor taxpayers as a real difficulty of net wealth taxes; forcing annual stock sales to pay the levy could pressure ownership stakes (proponents counter that billionaire-only thresholds and deferral provisions limit this).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "OECD (2018), 'The Role and Design of Net Wealth Taxes in the OECD', OECD Tax Policy Studies No. 26",
          sourceUrl:
            "https://www.oecd.org/en/publications/the-role-and-design-of-net-wealth-taxes-in-the-oecd_9789264290303-en.html",
          reasoning:
            "Practical implementation concern documented in the OECD review of liquidity issues.",
        },
      ],
    },
  ],
};
