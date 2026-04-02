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
      title: "CBO Long-Term Budget Outlook (2025)",
      url: "https://www.cbo.gov/publication/59711",
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
          title: "CBO Projects Debt Reaching 166% of GDP by 2054",
          description:
            "The Congressional Budget Office projects that under current law, federal debt held by the public will rise from 99% of GDP in 2024 to 166% by 2054, driven by mandatory spending growth outpacing revenues.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Congressional Budget Office, Long-Term Budget Outlook 2024",
          reasoning:
            "CBO is nonpartisan and highly respected, though projections assume current law continues unchanged over 30 years — a strong assumption.",
        },
        {
          id: "structural-deficit-persistent",
          title: "Structural Deficit Persists Across Business Cycles",
          description:
            "The US has run primary deficits (excluding interest) in most years since 2001, even during economic expansions, indicating the gap is structural rather than cyclical.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "CBO Historical Budget Data",
          reasoning:
            "Persistent deficits during growth periods confirm the imbalance is baked into tax and spending policy, not just recession-driven.",
        },
        {
          id: "japan-high-debt-no-crisis",
          title: "Japan Sustains 250%+ Debt-to-GDP Without Crisis",
          description:
            "Japan has carried debt above 200% of GDP since 2010, now exceeding 250%, without a sovereign debt crisis, currency collapse, or loss of market access.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "IMF World Economic Outlook Database",
          reasoning:
            "Directly challenges the idea of a fixed debt threshold triggering crisis, though Japan's unique conditions (domestic savings, current account surplus, BOJ purchases) may limit applicability to the US.",
        },
        {
          id: "reinhart-rogoff-debunked",
          title: "The 90% Debt Threshold Claim Was Debunked",
          description:
            "The influential Reinhart-Rogoff finding that growth collapses above 90% debt-to-GDP was shown to contain spreadsheet errors, selective data exclusion, and unconventional weighting by Herndon, Ash, and Pollin (2013).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "Herndon, T., Ash, M., & Pollin, R. — Does High Public Debt Consistently Stifle Economic Growth? Cambridge Journal of Economics (2014)",
          reasoning:
            "Removes the most widely cited empirical basis for a specific danger threshold, though does not prove high debt is harmless.",
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
            "In FY2024, net interest on federal debt reached approximately $890 billion, surpassing national defense spending (~$850 billion) for the first time in US history.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "US Treasury Monthly Statement, CBO Budget Review",
          reasoning:
            "Hard fiscal data directly from the Treasury. The comparison to defense spending illustrates the scale of the burden.",
        },
        {
          id: "rollover-wave-coming",
          title: "Trillions in Low-Rate Debt Maturing 2025-2028",
          description:
            "Over $9 trillion in Treasury securities issued during the near-zero rate era will mature and need refinancing at significantly higher rates between 2025 and 2028.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "Treasury Bulletin, Maturity Schedule of Outstanding Debt",
          reasoning:
            "Mechanical fact about the maturity wall. The interest cost impact depends on prevailing rates at rollover.",
        },
        {
          id: "cbo-interest-share-projection",
          title: "Interest Projected to Consume 25%+ of Federal Revenue",
          description:
            "CBO projects net interest will grow from 13% of federal revenue in 2024 to over 25% by 2054, leaving less room for all other government functions.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "CBO Long-Term Budget Outlook",
          reasoning:
            "Credible projection, but 30-year forecasts carry substantial uncertainty about future rates, growth, and policy responses.",
        },
        {
          id: "real-rates-historically-low",
          title: "Real Interest Rates Remain Low by Historical Standards",
          description:
            "Despite rate hikes, the real (inflation-adjusted) yield on 10-year Treasuries has averaged around 1-2% — well below the 3-4% typical of the 1990s. The neutral real rate may have permanently shifted lower due to demographics and global savings glut.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Summers, L. & Rachel, L. — On Secular Stagnation in the Industrialized World, Brookings Papers (2019)",
          reasoning:
            "If the secular decline in real rates reflects structural forces, the interest burden may not escalate as dramatically as nominal figures suggest.",
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
            "Despite decades of predictions about de-dollarization, the US dollar remains the dominant reserve currency at roughly 58% of allocated global foreign exchange reserves, more than triple the euro's share.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source: "IMF COFER Database, Q4 2024",
          reasoning:
            "Hard data from the IMF showing continued dominance, though the slow downward trend from 70% in 2000 is notable.",
        },
        {
          id: "no-credible-alternative",
          title: "No Alternative Currency Can Match Dollar Liquidity",
          description:
            "The US Treasury market is the deepest and most liquid sovereign bond market in the world (~$26 trillion outstanding). No other market comes close in terms of the volume, depth, and safety that global investors require for reserve holdings.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "BIS Quarterly Review, Federal Reserve Financial Stability Reports",
          reasoning:
            "Structural advantage that is extremely difficult for competitors to replicate, though network effects can unravel non-linearly.",
        },
        {
          id: "brics-dedollarization-efforts",
          title: "BRICS Nations Actively Pursuing De-dollarization",
          description:
            "China, Russia, Brazil, India, and Saudi Arabia are building bilateral trade settlement systems, yuan-denominated oil contracts, and alternative payment networks (mBridge) designed to reduce dollar dependency.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source:
            "Atlantic Council Dollar Dominance Monitor, BRICS Summit Declarations",
          reasoning:
            "Political intent is clear and institutional infrastructure is being built, but actual transaction volumes remain small relative to dollar-denominated flows.",
        },
        {
          id: "foreign-holdings-declining-share",
          title: "Foreign Share of US Debt Holdings Is Declining",
          description:
            "Foreign holders owned about 33% of US public debt in 2024, down from 49% in 2011. China has reduced holdings from over $1.3 trillion to under $800 billion. The marginal buyer is increasingly the domestic market and the Fed.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Treasury International Capital (TIC) System",
          reasoning:
            "Declining foreign demand could increase borrowing costs if domestic absorption cannot compensate, though domestic demand has so far filled the gap.",
        },
      ],
    },
  ],
};
