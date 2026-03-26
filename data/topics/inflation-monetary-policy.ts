import type { Topic } from "@/lib/schemas/topic";

export const inflationMonetaryPolicyData = {
  id: "inflation-monetary-policy",
  title: "Inflation & Monetary Policy",
  meta_claim:
    "Post-pandemic inflation was primarily driven by excessive government spending and monetary expansion, not supply chain disruptions.",
  status: "contested" as const,
  category: "economics" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Federal Reserve Economic Data (FRED) — M2 Money Supply",
      url: "https://fred.stlouisfed.org/series/M2SL",
    },
    {
      title:
        "Bernanke & Blanchard (2023) — What Caused the U.S. Pandemic-Era Inflation?",
      url: "https://www.brookings.edu/articles/what-caused-the-u-s-pandemic-era-inflation/",
    },
    {
      title: "BLS Consumer Price Index Historical Data",
      url: "https://www.bls.gov/cpi/data.htm",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did money printing cause inflation?",
      content:
        "The M2 money supply grew by ~40% between early 2020 and early 2022. Did this unprecedented monetary expansion directly cause consumer price inflation, or did much of it remain in financial assets and bank reserves?",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "FRED M2 Money Stock",
          url: "https://fred.stlouisfed.org/series/M2SL",
        },
      ],
    },
    {
      id: "q2",
      title: "Was inflation really transitory?",
      content:
        'The Federal Reserve initially characterized post-pandemic inflation as "transitory." Was this framing a reasonable assessment based on available data, or a political miscalculation that delayed necessary policy action?',
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Did corporate profit-taking amplify inflation?",
      content:
        'Some economists argue that corporations used supply chain disruptions as cover to raise prices beyond cost increases — so-called "greedflation." How significant was this factor compared to monetary and supply-side causes?',
      imageUrl:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "money-supply-expansion",
      title: "Money Supply Expansion",
      short_summary:
        "M2 money supply grew ~40% in two years, far exceeding historical norms, reigniting the monetarist vs. MMT debate.",
      image_url:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The relationship between money supply and inflation broke down decades ago. M2 grew rapidly after 2008 QE with no inflation surge. Modern monetary theory suggests sovereign currency issuers face inflation constraints only at full employment. The velocity of money collapsed during the pandemic, meaning much of the new money never entered the real economy — it sat in savings accounts and financial markets. Correlation between M2 growth and CPI is weak in the modern era.",
      proponent_rebuttal:
        "The 2020-2021 monetary expansion was qualitatively different from post-2008 QE. After 2008, new reserves stayed in the banking system; after 2020, stimulus checks and PPP loans put money directly into consumers' hands. M2 grew ~40% in 24 months — the fastest expansion since WWII. Unlike 2008, velocity recovered quickly as lockdowns ended, meaning the expanded money supply met a reopening economy. Milton Friedman's dictum that 'inflation is always and everywhere a monetary phenomenon' held: the 18-month lag between M2 spike and CPI spike matches historical monetarist predictions almost exactly.",
      crux: {
        id: "m2-cpi-lag-correlation",
        title: "The M2-CPI Lag Correlation Test",
        description:
          "Measure whether the timing and magnitude of M2 expansion predict subsequent CPI increases with an 18-month lag.",
        methodology:
          "Compare M2 growth rate (monthly) with CPI-U inflation rate offset by 12-24 months. Control for supply-side shocks using PPI and shipping cost indices. Apply Granger causality test to determine if M2 changes predict CPI changes.",
        equation:
          "\\text{CPI}_{t} = \\alpha + \\beta_1 \\Delta M2_{t-18} + \\beta_2 \\text{SupplyShock}_{t} + \\varepsilon_{t}",
        verification_status: "verified" as const,
        cost_to_verify: "$10K (econometric analysis of publicly available FRED data)",
      },
      evidence: [
        {
          id: "m2-growth-unprecedented",
          title: "M2 Growth Rate Was Historically Unprecedented",
          description:
            "M2 money supply grew from $15.4T to $21.7T between February 2020 and February 2022, a ~40% increase — the fastest two-year expansion since WWII-era money creation.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 7,
          },
          source: "Federal Reserve Economic Data (FRED)",
          reasoning:
            "Indisputable measurement from the Fed itself. Directness is 7 because M2 growth is a necessary but not sufficient condition for demand-pull inflation.",
        },
        {
          id: "fiscal-transfers-direct",
          title: "Fiscal Transfers Went Directly to Consumers",
          description:
            "Unlike 2008 QE which expanded bank reserves, 2020-2021 stimulus ($814B in direct payments, $800B+ in PPP) put money directly into household and business spending accounts.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "U.S. Treasury, Congressional Budget Office",
          reasoning:
            "Direct fiscal transfers are a more inflationary transmission mechanism than QE. Personal savings rate spiked then rapidly fell as spending surged.",
        },
        {
          id: "post-2008-no-inflation",
          title: "Post-2008 QE Did Not Produce Consumer Inflation",
          description:
            "The Fed's balance sheet expanded from $900B to $4.5T between 2008-2014 with QE1-QE3, yet CPI inflation remained below the 2% target for most of the following decade.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "Federal Reserve, BLS CPI Data",
          reasoning:
            "Demonstrates that monetary expansion alone does not mechanically produce inflation — the transmission mechanism matters. Weakens strict monetarist claims.",
        },
        {
          id: "velocity-collapse",
          title: "Money Velocity Collapsed During the Pandemic",
          description:
            "M2 velocity (GDP/M2) fell from 1.43 to 1.10 between Q4 2019 and Q2 2020, meaning a large portion of new money did not circulate through the economy.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 6,
          },
          source: "FRED — Velocity of M2 Money Stock",
          reasoning:
            "Low velocity partially offsets the inflationary impact of M2 growth. However, velocity recovered as the economy reopened, complicating this argument.",
        },
      ],
    },
    {
      id: "supply-chain-vs-demand",
      title: "Supply Chain vs. Demand",
      short_summary:
        "Debate over whether post-pandemic price increases were driven by supply-side disruptions or excess aggregate demand from fiscal stimulus.",
      image_url:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The inflation spike was overwhelmingly supply-driven. COVID shut down factories, ports, and logistics networks worldwide. Shipping container costs rose 10x. Semiconductor shortages halted auto production. Energy prices surged due to the Russia-Ukraine war. Once supply chains normalized in 2023, inflation fell rapidly without a recession — proving it was not demand-driven. If excess demand were the cause, taming inflation would have required significant unemployment, as in Volcker's 1980s campaign.",
      proponent_rebuttal:
        "Supply disruptions were real but insufficient to explain the breadth and persistence of inflation. Supply shocks typically cause relative price changes (some goods up, others stable), not across-the-board increases in housing, services, food, and durables simultaneously. Core services inflation — which is insulated from supply chains — surged to 7%+, indicating demand-side pressure. Personal consumption expenditure exceeded its pre-pandemic trend by 2022, showing aggregate demand overshot potential output. The Bernanke-Blanchard (2023) decomposition found that while supply shocks initiated inflation, demand pressures and labor market tightness sustained it through 2022-2023.",
      crux: {
        id: "supply-vs-demand-decomposition",
        title: "The Inflation Decomposition Analysis",
        description:
          "Decompose observed inflation into supply-side and demand-side components using sectoral price data.",
        methodology:
          "Classify CPI components into supply-sensitive (energy, used cars, food commodities) and demand-sensitive (core services, shelter, recreation). Track timing: supply-sensitive categories should lead, demand-sensitive should follow if demand is secondary. Apply Shapley decomposition or Bernanke-Blanchard framework to attribute variance.",
        equation:
          "\\pi_t = \\pi^{supply}_t + \\pi^{demand}_t + \\pi^{expectations}_t + \\varepsilon_t",
        verification_status: "verified" as const,
        cost_to_verify:
          "$25K (econometric modeling with BLS microdata)",
      },
      evidence: [
        {
          id: "shipping-costs-spike",
          title: "Global Shipping Costs Rose 10x",
          description:
            "The Drewry World Container Index surged from ~$1,500 to over $10,000 per 40ft container between mid-2020 and late 2021, reflecting severe supply chain disruption.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "Drewry World Container Index",
          reasoning:
            "Direct evidence of supply-side cost pressure. However, shipping costs normalized by mid-2022 while inflation persisted, limiting explanatory power for later inflation.",
        },
        {
          id: "core-services-inflation",
          title: "Core Services Inflation Surged Despite No Supply Shock",
          description:
            "Core services ex-housing inflation rose above 7% in 2022, a category largely insulated from global supply chain disruptions, indicating demand-pull pressure.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "BLS CPI Detailed Reports",
          reasoning:
            "Services inflation cannot be explained by shipping disruptions or factory closures. Points to excess demand and tight labor markets.",
        },
        {
          id: "bernanke-blanchard-decomposition",
          title: "Bernanke-Blanchard Found Mixed Causes",
          description:
            "The 2023 Bernanke-Blanchard analysis concluded supply shocks initiated inflation, but demand pressures and labor market tightness sustained it beyond 2021.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "Brookings Papers on Economic Activity, 2023",
          reasoning:
            "Authoritative analysis from two Nobel-caliber economists. Supports a nuanced view where both supply and demand played roles at different stages.",
        },
        {
          id: "inflation-fell-without-recession",
          title: "Inflation Fell Without Major Recession",
          description:
            "CPI inflation dropped from 9.1% (June 2022) to ~3% by mid-2023 without significant rise in unemployment, suggesting supply normalization was a key factor.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "BLS CPI and Employment Data",
          reasoning:
            "If inflation were purely demand-driven, disinflation would typically require slack in the labor market. The soft landing suggests supply-side resolution played a major role.",
        },
      ],
    },
    {
      id: "central-bank-response",
      title: "Central Bank Response",
      short_summary:
        'Did the Federal Reserve wait too long to raise rates, and was the "transitory" inflation framing a costly miscalculation?',
      image_url:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The Fed's 'transitory' framing was a reasonable real-time assessment, not a failure. In mid-2021, inflation was concentrated in reopening-sensitive categories (used cars, airfares, hotels) that were expected to normalize. The Fed faced a dual mandate and could not risk premature tightening that might derail labor market recovery. Once it became clear inflation was broadening, the Fed pivoted to the fastest rate-hiking cycle in 40 years. The resulting soft landing vindicates the overall approach — a premature 2021 tightening might have caused unnecessary recession.",
      proponent_rebuttal:
        "The Fed kept rates at zero and continued $120B/month in asset purchases through March 2022, even as CPI hit 7%+. The 'transitory' label became institutional groupthink that delayed action by 6-9 months. Every month of delay allowed inflation expectations to become more entrenched, requiring more aggressive hikes later (0% to 5.25% in 16 months). Former Fed officials like Larry Summers warned as early as February 2021 that the $1.9T American Rescue Plan risked overheating. The Taylor Rule suggested rates should have begun rising by Q3 2021. The delayed response cost American households an estimated $9,000+ in cumulative excess cost of living.",
      crux: {
        id: "counterfactual-early-tightening",
        title: "The Counterfactual Early-Tightening Test",
        description:
          "Model what would have happened if the Fed had begun tightening in Q3 2021 instead of Q1 2022.",
        methodology:
          "Run DSGE (Dynamic Stochastic General Equilibrium) model with actual economic conditions. Simulate counterfactual where Fed funds rate rises beginning July 2021 per Taylor Rule. Compare projected inflation path, unemployment, and GDP against actual outcomes.",
        equation:
          "r^*_t = r^{neutral} + 0.5(\\pi_t - \\pi^*) + 0.5(y_t - y^*_t)",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$100K (DSGE modeling with full macroeconomic dataset)",
      },
      evidence: [
        {
          id: "summers-warning-2021",
          title: "Larry Summers Warned of Overheating in February 2021",
          description:
            "Economist Larry Summers publicly warned that the $1.9T American Rescue Plan was three times larger than the output gap, risking inflation not seen in a generation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Washington Post Op-Ed, February 2021",
          reasoning:
            "Credible expert warning that proved prescient. Independence limited because Summers had political motivations; replicability is lower for opinion-based predictions.",
        },
        {
          id: "taylor-rule-divergence",
          title: "Taylor Rule Indicated Rates Should Have Risen by Mid-2021",
          description:
            "The Taylor Rule — a standard monetary policy benchmark — suggested the fed funds rate should have been 2-3% by late 2021, while the actual rate remained at 0-0.25%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Atlanta Fed Taylor Rule Utility",
          reasoning:
            "Mechanical rule-based benchmark shows the Fed deviated significantly from standard monetary policy prescriptions. High independence as it is formula-driven.",
        },
        {
          id: "soft-landing-achieved",
          title: "Soft Landing Was Achieved Despite Delayed Tightening",
          description:
            "Inflation fell from 9.1% to ~3% without recession, and unemployment remained below 4%. This outcome suggests the Fed's overall strategy — including the late start — was not catastrophic.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "BLS, BEA National Accounts",
          reasoning:
            "The favorable outcome weakens claims that the delayed response caused lasting damage, though counterfactual of earlier action remains unknowable.",
        },
        {
          id: "inflation-expectations-anchored",
          title: "Long-Term Inflation Expectations Remained Anchored",
          description:
            "Despite the inflation surge, 5-year and 10-year breakeven inflation rates stayed near 2.5%, suggesting the Fed's credibility was not seriously damaged.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "FRED — Treasury Breakeven Inflation Rates",
          reasoning:
            "Anchored expectations suggest the 'transitory' misstep did not fundamentally undermine Fed credibility, though it does not prove the delay was costless.",
        },
      ],
    },
  ],
};
