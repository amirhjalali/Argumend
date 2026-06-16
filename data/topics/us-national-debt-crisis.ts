import type { Topic } from "@/lib/schemas/topic";

export const usNationalDebtCrisisData = {
  id: "us-national-debt-crisis",
  title: "Is the US National Debt a Ticking Time Bomb?",
  meta_claim:
    "The US national debt, exceeding $36 trillion, poses an existential threat to economic stability and will lead to a fiscal crisis within a generation.",
  status: "contested" as const,
  category: "economics" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "CBO: The Long-Term Budget Outlook: 2025 to 2055 (March 2025)",
      url: "https://www.cbo.gov/publication/61270",
    },
    {
      title: "IMF Fiscal Monitor: Fiscal Policy in the Great Election Year (2024)",
      url: "https://www.imf.org/en/Publications/FM/Issues/2024/04/17/fiscal-monitor-april-2024",
    },
    {
      title:
        "Blanchard, O. — Public Debt and Low Interest Rates, American Economic Review (2019)",
      url: "https://www.aeaweb.org/articles?id=10.1257/aer.109.4.1197",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can the US actually default on its debt?",
      content:
        "The US borrows in its own currency and the Federal Reserve can always create dollars. Does this make a traditional sovereign default impossible, or could a political default via debt ceiling brinkmanship achieve the same result?",
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "CBO: Federal Debt and the Statutory Limit",
          url: "https://www.cbo.gov/topics/budget/federal-debt",
        },
      ],
    },
    {
      id: "q2",
      title: "Why hasn't the debt caused a crisis yet?",
      content:
        "Debt hawks have predicted a US fiscal crisis for decades, yet Treasury yields remain low by historical standards and demand for US debt stays strong. Are the pessimists simply early, or fundamentally wrong?",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Is inflation the hidden default mechanism?",
      content:
        "Instead of explicit default, could the US effectively reduce its real debt burden through sustained above-target inflation? What are the historical precedents and economic consequences of this strategy?",
      imageUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "debt-to-gdp-trajectory",
      title: "Debt-to-GDP Trajectory",
      short_summary:
        "The US debt-to-GDP ratio is on an unsustainable upward path, but Japan's experience at over 250% suggests higher ratios may be manageable under certain conditions.",
      image_url:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The US debt-to-GDP ratio has exceeded 120% and the CBO projects it will reach 166% by 2054 under current law. History shows that once countries cross a debt-to-GDP threshold around 90-100%, growth slows and fiscal crises become far more likely. The trajectory is clearly unsustainable — mandatory spending on entitlements grows on autopilot while revenues remain structurally insufficient. Even optimistic growth projections cannot close this gap without major policy changes.",
      proponent_rebuttal:
        "Japan has maintained debt-to-GDP above 200% for over a decade — now exceeding 250% — without a fiscal crisis, because it borrows in its own currency from domestic savers and maintains institutional credibility. The Reinhart-Rogoff 90% threshold claim was debunked due to spreadsheet errors and cherry-picked data. What matters is not the absolute ratio but the trajectory of interest rates relative to growth rates (r vs g). When interest rates remain below growth rates, debt-to-GDP stabilizes naturally. The US has additional advantages: deep capital markets, strong institutions, and the ability to adjust fiscal policy. The CBO projections assume current law continues unchanged, which is a worst-case political scenario, not an economic inevitability.",
      crux: {
        id: "r-vs-g-sustainability",
        title: "The r vs g Sustainability Test",
        description:
          "Compare the effective interest rate on government debt (r) against nominal GDP growth (g) to determine whether the debt ratio will stabilize, shrink, or explode over time.",
        methodology:
          "Calculate the weighted average interest rate on outstanding US Treasury securities. Compare against 10-year trailing and projected nominal GDP growth. When r < g, primary deficits can be sustained without debt-to-GDP rising. When r > g, even a balanced primary budget leads to rising debt ratios. Model under multiple interest rate and growth scenarios.",
        equation:
          "\\Delta\\left(\\frac{D}{Y}\\right) = (r - g) \\cdot \\frac{D}{Y} + \\text{primary\\_deficit}",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (publicly available CBO/Treasury data)",
      },
      evidence: [
        {
          id: "cbo-projection-unsustainable",
          title: "CBO Projects Debt Reaching 156% of GDP by 2055",
          description:
            "In its March 2025 Long-Term Budget Outlook, the Congressional Budget Office projects that under current law, federal debt held by the public will rise from about 100% of GDP in 2025 to 156% by 2055 — surpassing its World War II-era peak around 2029 — driven by rising interest costs and mandatory spending (Medicare, Social Security) outpacing revenues.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Congressional Budget Office, The Long-Term Budget Outlook: 2025 to 2055 (March 2025)",
          sourceUrl: "https://www.cbo.gov/publication/61270",
          reasoning:
            "CBO is nonpartisan and highly respected. The 156% figure is the March 2025 baseline; CBO's alternative 'current policy' scenario reaches ~175%. The 30-year horizon carries large uncertainty and assumes current law continues unchanged — a strong assumption, not an economic inevitability.",
        },
        {
          id: "structural-deficit-persistent",
          title: "Structural Deficit Persists Across Business Cycles",
          description:
            "The US has run budget deficits in nearly every year since the 2001 surplus, including the late-2010s expansion when deficits crossed $1 trillion despite a strong economy — a departure from the historical pattern of deficits shrinking during expansions. Federal debt held by the public rose from 32% of GDP in 2001 to ~98% by 2023.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "US Treasury Fiscal Data (National Deficit); CRFB, 'From Riches to Rags: Causes of Fiscal Deterioration Since 2001' (2024)",
          sourceUrl:
            "https://fiscaldata.treasury.gov/americas-finance-guide/national-deficit/",
          reasoning:
            "Persistent deficits during growth periods (e.g. >$1T in FY2019) confirm the imbalance is largely baked into tax and spending policy, not just recession-driven. Note 'primary deficit' (excluding interest) varies year to year; the broader structural-deficit claim is well-supported by Treasury data and CRFB analysis.",
        },
        {
          id: "japan-high-debt-no-crisis",
          title: "Japan Sustains 250%+ Debt-to-GDP Without Crisis",
          description:
            "Japan has carried general government gross debt above 200% of GDP for over a decade, reaching roughly 252% in 2023 and remaining above 250% in 2024, without a sovereign debt crisis, currency collapse, or loss of market access.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "IMF World Economic Outlook / Fiscal Monitor (general government gross debt, Japan)",
          sourceUrl:
            "https://www.imf.org/external/datamapper/GGXWDG_NGDP@WEO/JPN",
          reasoning:
            "Directly challenges the idea of a fixed debt threshold triggering crisis, though Japan's unique conditions (domestic savings, current account surplus, BOJ purchases) may limit applicability to the US.",
        },
        {
          id: "reinhart-rogoff-debunked",
          title: "The 90% Debt 'Growth Cliff' Claim Was Substantially Undermined",
          description:
            "Reinhart and Rogoff's influential claim that growth collapses above 90% debt-to-GDP was substantially undermined by Herndon, Ash, and Pollin (2014), who identified a spreadsheet coding error, selective data exclusion, and unconventional weighting. Correcting these, average growth for countries above 90% debt-to-GDP was 2.2%, not the -0.1% Reinhart-Rogoff reported — eliminating the sharp 'cliff' while still showing a modest negative correlation between debt and growth.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "Herndon, T., Ash, M., & Pollin, R. — 'Does High Public Debt Consistently Stifle Economic Growth? A Critique of Reinhart and Rogoff', Cambridge Journal of Economics 38(2): 257-279 (2014)",
          sourceUrl: "https://academic.oup.com/cje/article-abstract/38/2/257/1714018",
          reasoning:
            "Removes the most widely cited empirical basis for a specific danger threshold and reverses the dramatic growth-cliff result. It does not prove high debt is harmless — a modest negative debt-growth correlation remains, and causation is contested — so this rebuts the threshold claim rather than the broader sustainability concern.",
        },
      ],
    },
    {
      id: "interest-payment-spiral",
      title: "Interest Payment Spiral",
      short_summary:
        "Net interest on the federal debt now exceeds defense spending and is the fastest-growing budget category, but historically low real rates may keep the burden manageable.",
      image_url:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Net interest costs exceeded $890 billion in fiscal year 2024, surpassing defense spending for the first time. As the Fed normalizes rates and trillions in low-rate pandemic-era debt rolls over into higher-rate instruments, interest costs will consume an ever-larger share of the federal budget. This creates a doom loop: higher interest costs increase deficits, which increase borrowing, which increases interest costs. The CBO projects net interest will reach 6.3% of GDP by 2054, crowding out discretionary spending and leaving no fiscal room for emergencies.",
      proponent_rebuttal:
        "The spike in nominal interest payments is misleading without context. What matters is the real (inflation-adjusted) interest rate and its relationship to growth. The weighted average interest rate on outstanding US debt remains historically moderate because much was locked in during the low-rate era. Furthermore, the Federal Reserve has tools to manage long-term rates if a true spiral threatens — it is both the central bank and the lender of last resort for a currency-sovereign nation. The 'doom loop' narrative assumes markets will demand ever-higher risk premiums, but Treasury securities remain the global safe asset. Interest payments also redistribute wealth to bondholders, many of whom are domestic — it is not money leaving the economy. The real question is distributional, not existential.",
      crux: {
        id: "interest-rate-rollover-risk",
        title: "The Debt Rollover Stress Test",
        description:
          "Model the trajectory of net interest costs as pandemic-era low-rate debt matures and is refinanced at current and projected market rates.",
        methodology:
          "Map the maturity schedule of all outstanding Treasury securities. Model refinancing at projected yield curves (baseline, high-rate, and stress scenarios). Calculate net interest as a share of GDP and federal revenue under each scenario. Identify the threshold at which interest costs trigger automatic deficit escalation.",
        equation:
          "I_t = \\sum_{i} D_i \\cdot r_i(t) \\quad \\text{where } D_i \\text{ = principal of tranche } i, \\; r_i(t) \\text{ = rate at rollover}",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (Treasury publishes full maturity schedule and auction results)",
      },
      evidence: [
        {
          id: "interest-exceeds-defense",
          title: "Net Interest Now Exceeds Defense Spending",
          description:
            "In FY2024, net interest on the federal debt reached about $882 billion (up $222 billion / 34% from FY2023), exceeding discretionary national defense outlays (~$874 billion) for the first time — making interest the second-largest line item after Social Security.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source:
            "US Treasury Monthly Treasury Statement (FY2024); CRFB, 'Interest Costs Just Surpassed Defense and Medicare'",
          sourceUrl: "https://www.crfb.org/blogs/interest-costs-just-surpassed-defense-and-medicare",
          reasoning:
            "Hard fiscal data from the Treasury. Comparison is to discretionary defense outlays; the magnitudes ($882B vs ~$874B) illustrate the scale of the burden.",
        },
        {
          id: "rollover-wave-coming",
          title: "Roughly $9 Trillion of Debt Matures and Must Be Refinanced Each Year",
          description:
            "About $9.2 trillion of Treasury debt — roughly a quarter of the total — matured and had to be refinanced in fiscal year 2025, with a similar ~$9.7 trillion due in FY2026. Much of this is short-term bills rolled continuously, so it reprices quickly at prevailing rates; the share locked in at near-zero pandemic-era rates is a smaller subset.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "GAO, 'Federal Debt Management' (GAO-26-107529); US Treasury auction data",
          sourceUrl: "https://www.gao.gov/products/gao-26-107529",
          reasoning:
            "The maturity wall is real and large, but the original framing overstated it: the bulk is short-dated bills routinely rolled, not long-term near-zero pandemic bonds, so the marginal interest-cost impact depends on where short rates settle, not a one-time repricing. De-inflated accordingly.",
        },
        {
          id: "cbo-interest-share-projection",
          title: "Interest Projected to Consume ~28% of Federal Revenue by 2055",
          description:
            "CBO's March 2025 outlook projects net interest outlays rising to 5.4% of GDP and roughly 28% of federal revenues by 2055, leaving less room for all other government functions.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "CBO, The Long-Term Budget Outlook: 2025 to 2055 (March 2025)",
          sourceUrl: "https://www.cbo.gov/publication/61270",
          reasoning:
            "Credible nonpartisan projection, but a 30-year forecast carries substantial uncertainty about future rates, growth, and policy responses; treat as a scenario, not a verified outcome.",
        },
        {
          id: "real-rates-historically-low",
          title: "Real Interest Rates Remain Low by Historical Standards",
          description:
            "Real (inflation-adjusted) Treasury yields are well below their 1990s levels. Rachel & Summers (2019) estimate the neutral real rate in the industrial world has fallen by at least 300 basis points over a generation, driven by demographics and a global savings glut — and argue it would be significantly negative absent expansionary fiscal policy.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Rachel, Ł. & Summers, L.H. — 'On Falling Neutral Real Rates, Fiscal Policy, and the Risk of Secular Stagnation', Brookings Papers on Economic Activity (Spring 2019)",
          sourceUrl:
            "https://www.brookings.edu/articles/on-falling-neutral-real-rates-fiscal-policy-and-the-risk-of-secular-stagnation/",
          reasoning:
            "If the secular decline in real rates reflects structural forces, the interest burden may not escalate as dramatically as nominal figures suggest. Note this is a contested 2019 thesis; rates rose materially in 2022-2024, so the secular-stagnation framing is debated rather than settled. Directness lowered: the paper concerns neutral rates broadly, not US debt servicing specifically.",
        },
      ],
    },
    {
      id: "reserve-currency-privilege",
      title: "Reserve Currency Privilege",
      short_summary:
        "The US dollar's status as the world's primary reserve currency creates unique advantages for debt sustainability, but this privilege is not guaranteed to last forever.",
      image_url:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The dollar's reserve currency status means the US enjoys an 'exorbitant privilege' — global demand for dollars and Treasury securities keeps borrowing costs artificially low and allows the US to run deficits that would cripple any other nation. This creates a dangerous complacency. However, this privilege is not permanent: de-dollarization efforts by BRICS nations, China's yuan internationalization, and the rise of central bank digital currencies could gradually erode dollar dominance. If foreign demand for Treasuries declines, the US would face a sudden repricing of its debt sustainability.",
      proponent_rebuttal:
        "Reports of the dollar's demise have been greatly exaggerated for decades. The dollar's share of global reserves has declined slowly from ~70% to ~58% since 2000, but no credible alternative exists. The euro has structural governance issues, the yuan lacks capital account openness, and Bitcoin is too volatile. The dollar's dominance rests on deep, liquid capital markets, rule of law, military power, and network effects — not just economic size. BRICS de-dollarization announcements are mostly political theater; actual cross-border transactions remain overwhelmingly dollar-denominated. Even in a multipolar currency world, the dollar would likely remain first among equals. The privilege endures because there is literally no other asset that can absorb the scale of global savings demand.",
      crux: {
        id: "reserve-currency-erosion-rate",
        title: "The Dollar Dominance Trajectory Test",
        description:
          "Track the rate of change in the dollar's share of global reserves, cross-border payments, and commodity pricing to determine whether erosion is accelerating or stabilizing.",
        methodology:
          "Compile quarterly data from IMF COFER (Currency Composition of Official Foreign Exchange Reserves), SWIFT cross-border payment statistics, and commodity contract denomination. Calculate the trendline and acceleration/deceleration of dollar share. Model scenarios for US debt pricing if dollar reserve share declines to 40% vs current ~58%.",
        equation:
          "\\frac{d}{dt}\\left(\\frac{\\text{USD reserves}}{\\text{Total reserves}}\\right) = \\text{trend rate of erosion}",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (IMF COFER and SWIFT data are publicly available quarterly)",
      },
      evidence: [
        {
          id: "dollar-share-still-dominant",
          title: "Dollar Still Comprises ~58% of Global Reserves",
          description:
            "Despite decades of predictions about de-dollarization, the US dollar remained the dominant reserve currency at about 57.8% of allocated global foreign exchange reserves in Q4 2024 — roughly triple the euro's share.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source: "IMF Currency Composition of Official Foreign Exchange Reserves (COFER), Q4 2024",
          sourceUrl: "https://data.imf.org/en/datasets/IMF.STA:COFER",
          reasoning:
            "Hard data from the IMF showing continued dominance, though the slow downward trend from ~70% in 2000 is notable.",
        },
        {
          id: "no-credible-alternative",
          title: "No Alternative Currency Can Match Dollar Liquidity",
          description:
            "The US Treasury market is the deepest and most liquid sovereign bond market in the world, with roughly $28 trillion in marketable debt outstanding in 2024 and ~$30 trillion by 2025. No other market comes close in the volume, depth, and safety that global reserve managers require.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Federal Reserve, 'The International Role of the U.S. Dollar – 2025 Edition' (FEDS Notes)",
          sourceUrl:
            "https://www.federalreserve.gov/econres/notes/feds-notes/the-international-role-of-the-u-s-dollar-2025-edition-20250718.html",
          reasoning:
            "Structural advantage that is extremely difficult for competitors to replicate, though network effects can unravel non-linearly.",
        },
        {
          id: "brics-dedollarization-efforts",
          title: "BRICS Nations Actively Pursuing De-dollarization",
          description:
            "China, Russia, and other BRICS members are building bilateral local-currency trade settlement, yuan-denominated oil and commodity arrangements, and the mBridge cross-border CBDC platform (China, Hong Kong, Thailand, UAE, with the BIS) to reduce dollar dependency. The renminbi now dominates intra-BRICS trade.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "Atlantic Council, Dollar Dominance Monitor",
          sourceUrl:
            "https://www.atlanticcouncil.org/programs/geoeconomics-center/dollar-dominance-monitor/",
          reasoning:
            "Political intent is clear and institutional infrastructure is being built, but actual transaction volumes remain small relative to dollar-denominated flows (mBridge cumulative volume was only ~$55B by late 2025). BRICS communiques emphasize deliberation over implemented solutions, so this signals direction, not displacement.",
        },
        {
          id: "foreign-holdings-declining-share",
          title: "Foreign Share of US Debt Holdings Is Declining",
          description:
            "Foreign holders owned about 30% of US debt held by the public in December 2024, down from nearly 50% in the early 2010s. China's holdings fell to ~$759 billion in December 2024, down ~42% from their ~$1.32 trillion peak in 2013. The marginal buyer is increasingly the domestic market.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source:
            "US Treasury, Treasury International Capital (TIC) data; CRS, 'Foreign Holdings of Federal Debt' (RS22331, 2025)",
          sourceUrl: "https://www.congress.gov/crs-product/RS22331",
          reasoning:
            "Declining foreign share could raise borrowing costs if domestic absorption cannot compensate, though domestic demand has so far filled the gap. Note the share decline partly reflects the total debt growing faster than foreign holdings, not just outright foreign selling.",
        },
      ],
    },
  ],
};
