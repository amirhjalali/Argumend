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
        "The 2020-2021 monetary expansion was qualitatively different from post-2008 QE. After 2008, new reserves stayed in the banking system; after 2020, stimulus checks and PPP loans put money directly into consumers' hands. M2 grew ~40% in 24 months — the fastest expansion since WWII. Velocity collapsed at the trough of the lockdowns but began recovering as the economy reopened, so the swollen money stock met returning demand rather than staying inert. The monetarist read is not that money was the only force — Bernanke and Blanchard (2023) show commodity and sectoral supply shocks lit the initial fire — but that the unprecedented money and fiscal overhang loaded the economy with the demand that let those shocks pass through into a broad, persistent price level rise rather than a contained relative-price blip. Friedman's lag heuristic (a roughly one-to-two-year gap from money surge to price surge) lines up with the timing, though monetarists concede the M2-to-CPI link is loose enough that the magnitude was not predictable from money growth alone.",
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
            "M2 money supply (FRED series M2SL, seasonally adjusted) grew from about $15.5T in February 2020 to roughly $21.7T by early 2022, a ~40% increase — the fastest two-year expansion in the post-WWII era.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 7,
          },
          source: "Federal Reserve Economic Data (FRED) — M2 (M2SL), Federal Reserve Bank of St. Louis",
          sourceUrl: "https://fred.stlouisfed.org/series/M2SL",
          reasoning:
            "Indisputable measurement published by the Federal Reserve. Directness is 7 because M2 growth is a necessary but not sufficient condition for demand-pull inflation. Note: the M2 definition was revised in May 2020, which slightly affects pre/post comparisons.",
        },
        {
          id: "fiscal-transfers-direct",
          title: "Fiscal Transfers Went Directly to Consumers",
          description:
            "Unlike 2008 QE which expanded bank reserves, 2020-2021 relief sent money directly to households and firms: roughly $814B across three rounds of Economic Impact Payments and about $800B in PPP loans (most later forgiven).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Pandemic Response Accountability Committee (Economic Impact Payments); Autor et al., NBER WP 29669 (PPP)",
          sourceUrl: "https://www.pandemicoversight.gov/data-interactive-tools/data-stories/update-three-rounds-stimulus-checks-see-how-many-went-out-and",
          reasoning:
            "Payment totals are well documented ($814B EIP; ~$800B PPP). Directness lowered to 7 because the inflationary potency of direct transfers vs. QE is an inference, not a measurement — much of the transfer initially became savings before being spent.",
        },
        {
          id: "post-2008-no-inflation",
          title: "Post-2008 QE Did Not Produce Consumer Inflation",
          description:
            "The Fed's balance sheet (FRED series WALCL) expanded from roughly $0.9T to about $4.5T between 2008 and 2014 via QE1-QE3, yet PCE/CPI inflation ran below the 2% target for most of the following decade.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "Federal Reserve H.4.1 / FRED Total Assets (WALCL); BLS CPI",
          sourceUrl: "https://fred.stlouisfed.org/series/WALCL",
          reasoning:
            "Demonstrates that monetary expansion alone does not mechanically produce inflation — the transmission mechanism matters. Weakens strict monetarist claims.",
        },
        {
          id: "velocity-collapse",
          title: "Money Velocity Collapsed During the Pandemic",
          description:
            "M2 velocity (GDP/M2, FRED series M2V) fell sharply from roughly 1.30 in Q4 2019 to about 0.98 in Q2 2020, meaning a large portion of the new money did not circulate through the economy.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 6,
          },
          source: "FRED — Velocity of M2 Money Stock (M2V), Federal Reserve Bank of St. Louis",
          sourceUrl: "https://fred.stlouisfed.org/series/M2V",
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
        "The initial inflation spike was overwhelmingly supply-driven, and the leading empirical decomposition backs this up: Bernanke and Blanchard (2023, NBER WP 31417) attribute most of the 2021 surge to shocks to prices given wages — commodity-price spikes and sector-specific supply/demand-composition shocks — not to an overheated labor market. COVID shut down factories, ports, and logistics networks worldwide; the Drewry World Container Index rose roughly sevenfold, from about $1,500 to a peak near $10,377 per 40ft box in September 2021. Semiconductor shortages halted auto production, and energy prices later surged with the Russia-Ukraine war. Once supply chains normalized through 2022-2023, inflation fell rapidly without a recession — the opposite of what a purely demand-driven episode would require, which historically takes significant unemployment, as in Volcker's 1980s campaign.",
      proponent_rebuttal:
        "Supply disruptions were real but insufficient to explain the persistence of inflation. Even Bernanke and Blanchard (2023), who attribute the initial 2021 surge mainly to commodity-price and sectoral supply shocks rather than an overheated labor market, conclude that labor-market tightness becomes the more persistent driver as those one-off shocks fade — the part that ultimately required restrictive policy. That persistence is the demand-side signature: relative-price shocks should wash out, yet core services ex-housing (an unofficial 'supercore' assembled from CPI components, largely insulated from shipping and factory bottlenecks) ran hot, with a three-month annualized peak near 6.8% in 2022. Aggregate demand also overshot: nominal personal consumption ran above its pre-pandemic trend by 2022, helped by roughly $1.6T in direct fiscal transfers meeting a reopening economy. So even granting the supply-driven start, demand and tight labor markets are why disinflation took two years rather than resolving on its own.",
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
            "The Drewry World Container Index surged from roughly $1,500 pre-pandemic to a peak of about $10,377 per 40ft container in September 2021, reflecting severe supply chain disruption.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Drewry Supply Chain Advisors — World Container Index",
          sourceUrl: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry",
          reasoning:
            "Direct evidence of supply-side cost pressure. However, shipping costs normalized by mid-2022 while inflation persisted, limiting explanatory power for later inflation.",
        },
        {
          id: "core-services-inflation",
          title: "Core Services Inflation Surged Despite No Supply Shock",
          description:
            'Core services ex-housing ("supercore") inflation ran near 6-7% during 2022 (a 3-month annualized peak around 6.8% in mid-2022), a category largely insulated from global supply chain disruptions, suggesting demand-pull pressure.',
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "BLS CPI (services less rent of shelter); analysis in CEA / Brookings commentary",
          sourceUrl: "https://www.bls.gov/cpi/",
          reasoning:
            "BLS does not publish an official 'supercore' index; the ~7% figure is derived from CPI components, so directness and replicability are moderate. Services inflation is hard to attribute to shipping or factory disruptions, pointing toward demand and tight labor markets.",
        },
        {
          id: "bernanke-blanchard-decomposition",
          title: "Bernanke-Blanchard Attributed Most of the Surge to Supply Shocks",
          description:
            "Bernanke & Blanchard (2023) found that most of the 2021 inflation surge came from shocks to prices given wages — commodity price spikes and sector-specific supply/demand-composition shocks — rather than an overheated labor market. They project that as those shocks fade, labor-market tightness becomes the more persistent driver requiring restrictive policy.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Bernanke & Blanchard, \"What Caused the U.S. Pandemic-Era Inflation?\", NBER Working Paper 31417 (2023)",
          sourceUrl: "https://www.nber.org/papers/w31417",
          reasoning:
            "Authoritative analysis by two leading macroeconomists. Its central finding — that supply-side and commodity shocks, not an overheated labor market, drove the initial surge — cuts against the claim that inflation was primarily a demand/money-printing phenomenon; hence coded 'against'. Labor-market tightness matters more for persistence than for the initial spike.",
        },
        {
          id: "inflation-fell-without-recession",
          title: "Inflation Fell Without Major Recession",
          description:
            "Headline CPI inflation fell from its 9.1% year-over-year peak in June 2022 to about 3% by mid-2023 without a significant rise in unemployment, suggesting supply normalization was a key factor.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "BLS Consumer Price Index (news releases) and Employment Situation",
          sourceUrl: "https://www.bls.gov/cpi/",
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
        "The Fed kept rates at zero and was still buying $120B/month in assets into early 2022, only ending purchases in March 2022 — even as headline CPI ran above 7%. The 'transitory' label hardened into institutional groupthink that arguably delayed action by 6-9 months. Each month of delay risked letting inflation expectations drift, and the Fed ultimately had to compress an extraordinary tightening into a short window (the target range went from 0-0.25% in March 2022 to 5.25-5.50% by mid-2023). Larry Summers warned as early as February 2021 that the $1.9T American Rescue Plan risked overheating, and standard Taylor Rule benchmarks implied liftoff should have begun in 2021. The cost of letting prices run was large in absolute terms — the Joint Economic Committee's Republican staff estimated in October 2022 that inflation was costing the average household roughly $9,000 a year relative to early-2021 prices — even if how much of that traces to the Fed's specific delay, versus the supply shocks themselves, is contested.",
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
            'In a Feb. 4, 2021 Washington Post op-ed, Lawrence Summers warned that the $1.9T American Rescue Plan was several times larger than the estimated output gap and risked "inflationary pressures of a kind we have not seen in a generation."',
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: 'Lawrence H. Summers, "The Biden stimulus is admirably ambitious, but it brings some big risks, too," The Washington Post, Feb. 4, 2021',
          sourceUrl: "https://www.washingtonpost.com/opinions/2021/02/04/larry-summers-biden-covid-stimulus/",
          reasoning:
            "Credible expert warning that proved prescient on the direction of inflation. This is an op-ed forecast, not empirical evidence, so independence and replicability are low; a single ex-ante prediction does not establish causation.",
        },
        {
          id: "taylor-rule-divergence",
          title: "Taylor Rule Indicated Rates Should Have Risen by Mid-2021",
          description:
            "Standard Taylor Rule specifications imply the fed funds rate should have been materially positive (commonly estimated in the low-single-digit range) by late 2021, while the actual rate remained at 0-0.25%. Exact prescriptions vary with the chosen inflation gauge and inputs.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Federal Reserve Bank of Atlanta — Taylor Rule Utility (Center for Quantitative Economic Research)",
          sourceUrl: "https://www.atlantafed.org/cqer/research/taylor-rule",
          reasoning:
            "Rule-based benchmark showing the Fed deviated from standard prescriptions. Independence/replicability lowered to reflect that the exact 'should-have-been' rate is sensitive to which Taylor Rule variant and inflation measure are used; the '2-3%' figure is one plausible estimate, not a unique answer.",
        },
        {
          id: "soft-landing-achieved",
          title: "Soft Landing Was Achieved Despite Delayed Tightening",
          description:
            "Headline CPI inflation fell from its 9.1% peak (June 2022) toward ~3% by mid-2023 without a recession, while the unemployment rate stayed near or below 4%. This outcome suggests the Fed's overall strategy — including the late start — was not catastrophic.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "BLS Consumer Price Index and Employment Situation",
          sourceUrl: "https://www.bls.gov/cpi/",
          reasoning:
            "The favorable outcome weakens claims that the delayed response caused lasting damage, though counterfactual of earlier action remains unknowable.",
        },
        {
          id: "inflation-expectations-anchored",
          title: "Long-Term Inflation Expectations Remained Anchored",
          description:
            "Despite the inflation surge, market-implied long-term expectations stayed broadly anchored: the 10-year breakeven (FRED T10YIE) briefly peaked around 3% in April 2022 but re-anchored toward ~2.3-2.5%, suggesting the Fed's credibility was not seriously damaged.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "FRED — 10-Year Breakeven Inflation Rate (T10YIE), Federal Reserve Bank of St. Louis",
          sourceUrl: "https://fred.stlouisfed.org/series/T10YIE",
          reasoning:
            "Anchored expectations suggest the 'transitory' misstep did not fundamentally undermine Fed credibility, though it does not prove the delay was costless.",
        },
      ],
    },
  ],
};
