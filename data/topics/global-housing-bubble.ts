import type { Topic } from "@/lib/schemas/topic";

export const globalHousingBubbleData = {
  id: "global-housing-bubble",
  title: "Is There a Global Housing Bubble About to Burst?",
  meta_claim:
    "Major housing markets worldwide are in an unsustainable bubble driven by low interest rates, speculation, and foreign investment, and a correction is imminent.",
  status: "contested" as const,
  category: "economics" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "OECD Housing Prices Database",
      url: "https://www.oecd.org/housing/data/price/",
    },
    {
      title: "IMF Global Housing Watch",
      url: "https://www.imf.org/external/research/housing/",
    },
    {
      title: "Federal Reserve Financial Stability Report",
      url: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Are price-to-income ratios meaningful predictors?",
      content:
        "Price-to-income ratios have diverged dramatically from historical norms in many markets. Does this necessarily indicate a bubble, or have structural changes in housing supply, urbanization, and household formation permanently shifted the equilibrium?",
      imageUrl:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "OECD Price-to-Income Ratios by Country",
          url: "https://data.oecd.org/price/housing-prices.htm",
        },
      ],
    },
    {
      id: "q2",
      title: "Can institutional investors stabilize or destabilize markets?",
      content:
        "Large institutional investors like BlackRock and Invitation Homes have entered residential real estate at scale. Do they add liquidity and professionalism, or do they amplify speculative cycles and reduce affordability for ordinary buyers?",
      imageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "What happens when rates stay higher for longer?",
      content:
        "After a decade of near-zero interest rates, central banks raised rates aggressively in 2022-2023. If rates remain elevated, will housing markets gradually adjust or face a sudden correction?",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "price-to-income-ratios",
      title: "Price-to-Income Ratios",
      short_summary:
        "House prices have diverged from median incomes to historically unprecedented levels in many major markets.",
      image_url:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "High price-to-income ratios do not necessarily indicate a bubble. Structural factors have permanently shifted housing valuations upward: constrained land supply in desirable cities, stricter building regulations, dual-income households becoming the norm, and the financialization of housing as a wealth-storage vehicle. Japan's experience in the 1990s is often cited, but most Western markets have fundamentally different demographics and supply constraints. Ratios can stay elevated indefinitely if supply remains restricted.",
      proponent_rebuttal:
        "In Canada, Australia, New Zealand, and parts of Europe, price-to-income ratios have reached 8-12x median household income, far exceeding the 3-5x range historically considered sustainable. The OECD reports that real house prices outpaced real incomes by over 30% in many member countries between 2015-2022. Every previous episode of such extreme divergence has ended in a correction. Structural arguments were made before the 2008 US crash ('land is limited in coastal cities'), before Japan's 1991 crash ('Japanese culture values property'), and before Ireland's 2007 crash ('the Celtic Tiger is different'). The math of affordability eventually reasserts itself: when mortgage payments consume 40-50% of median income, the buyer pool shrinks until prices must adjust.",
      crux: {
        id: "affordability-threshold",
        title: "The Affordability Threshold Test",
        description:
          "Determine whether current price-to-income ratios exceed the sustainable ceiling beyond which buyer pools contract and prices must correct.",
        methodology:
          "Calculate price-to-income ratios across 50+ major housing markets. Compare to pre-correction ratios from previous housing downturns (US 2006, Japan 1990, Ireland 2007). Measure share of median income required for mortgage payments at current rates. Identify threshold beyond which first-time buyer participation collapses.",
        equation:
          "\\text{Affordability Ratio} = \\frac{\\text{Median House Price}}{\\text{Median Household Income}}",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (publicly available OECD and national statistics data)",
      },
      evidence: [
        {
          id: "oecd-price-income-divergence",
          title: "OECD Price-to-Income Ratios at Record Highs",
          description:
            "As of 2023, real house prices relative to incomes are at or near all-time highs in Canada, Australia, New Zealand, the UK, and several European countries, exceeding pre-2008 peaks.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "OECD Housing Prices Database",
          reasoning:
            "OECD data is standardized across countries and independently verified, providing direct measurement of the affordability gap.",
        },
        {
          id: "mortgage-income-share",
          title: "Mortgage Payments Consuming Record Share of Income",
          description:
            "In markets like Toronto, Sydney, and London, mortgage payments on a median home now consume 50-60% of median household pre-tax income, well above the 30% threshold considered sustainable.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "National Association of Realtors, CoreLogic",
          reasoning:
            "Mortgage burden directly measures whether current prices are sustainable for typical buyers.",
        },
        {
          id: "first-time-buyer-collapse",
          title: "First-Time Buyer Share Declining Sharply",
          description:
            "First-time homebuyer participation has fallen to historic lows in the US (26% in 2023), UK, and Australia, suggesting the buyer pool is shrinking under affordability pressure.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "National Association of Realtors Annual Report",
          reasoning:
            "Declining first-time buyers indicate demand erosion, a leading indicator of price vulnerability.",
        },
        {
          id: "supply-constraint-defense",
          title: "Structural Supply Constraints Justify Higher Ratios",
          description:
            "Zoning laws, NIMBYism, and geographic constraints in major cities have persistently restricted housing supply, meaning higher price-to-income ratios may reflect a permanent shift rather than a bubble.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          reasoning:
            "Supply constraints are real and well-documented, but they also existed before previous corrections. Supply alone doesn't explain the rate of price acceleration.",
        },
      ],
    },
    {
      id: "institutional-foreign-investment",
      title: "Institutional and Foreign Investment",
      short_summary:
        "Large institutional buyers, foreign capital flows, and short-term rental platforms are distorting housing markets and reducing supply for owner-occupiers.",
      image_url:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=60",
      icon_name: "Users" as const,
      skeptic_premise:
        "Institutional investors represent a small fraction of total housing transactions (under 3% in most markets). Their presence adds liquidity, improves property management standards, and reflects rational investment in a real asset. Foreign investment is heavily regulated in most countries and has declined significantly since 2017 peak levels. Airbnb listings represent less than 1% of total housing stock in most cities. Blaming institutions and foreigners for a structural supply problem is politically convenient but empirically weak.",
      proponent_rebuttal:
        "Institutional impact is concentrated in specific markets and price tiers where their effect is outsized. In cities like Atlanta, Charlotte, and Phoenix, institutional buyers purchased 25-30% of starter homes in some quarters of 2021-2022, directly competing with first-time buyers in the most price-sensitive segment. Foreign capital distorts markets even at low volumes because it targets premium properties, creating a cascade effect that reprices entire neighborhoods. Airbnb has removed an estimated 1-3% of rental stock in tourist-heavy cities like Barcelona, Lisbon, and Amsterdam, meaningfully tightening an already constrained market. When these investors exit—as they historically do during downturns—the concentrated selling pressure can accelerate declines.",
      crux: {
        id: "institutional-exit-risk",
        title: "The Institutional Exit Risk Assessment",
        description:
          "Evaluate whether concentrated institutional holdings in specific market segments create systemic risk of accelerated sell-offs during downturns.",
        methodology:
          "Map institutional ownership concentration by city, neighborhood, and price tier. Model exit scenarios under various economic conditions (recession, rate increases, rental yield compression). Compare to historical episodes of concentrated investor liquidation in real estate.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$200K (proprietary transaction data + economic modeling)",
      },
      evidence: [
        {
          id: "institutional-starter-home-share",
          title: "Institutional Buyers Dominating Starter Home Segment",
          description:
            "In 2021-2022, institutional buyers purchased 25-30% of homes priced below the median in Sun Belt cities, directly displacing first-time buyers in the most price-sensitive market segment.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "CoreLogic, Redfin Investor Reports",
          reasoning:
            "Concentrated buying in specific segments can distort pricing even if total market share is small.",
        },
        {
          id: "airbnb-rental-reduction",
          title: "Short-Term Rentals Reducing Long-Term Housing Supply",
          description:
            "Cities like Barcelona, Lisbon, and Amsterdam report 2-5% of housing stock converted to short-term rentals, contributing to rental price increases of 15-30% in affected neighborhoods.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Inside Airbnb, Municipal Housing Reports",
          reasoning:
            "Localized supply reduction from short-term rentals is well-documented in tourism-heavy markets.",
        },
        {
          id: "foreign-investment-decline",
          title: "Foreign Investment in Housing Has Declined Since 2017",
          description:
            "Chinese capital controls, Canadian foreign buyer taxes, and New Zealand's foreign buyer ban have significantly reduced cross-border residential investment since the 2015-2017 peak.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "NAR International Transactions Report",
          reasoning:
            "If foreign buying has already declined yet prices remain high, foreign capital may not be the primary driver.",
        },
        {
          id: "institutional-share-small",
          title: "Institutional Share of Total Market Remains Small",
          description:
            "Institutional investors account for under 3% of all US housing transactions. Even at their 2021 peak, they represented less than 7% of single-family purchases nationally.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Federal Reserve, PwC Real Estate Reports",
          reasoning:
            "National-level data suggests institutions are not large enough to drive a bubble, though local concentration may differ.",
        },
      ],
    },
    {
      id: "interest-rate-sensitivity",
      title: "Interest Rate Sensitivity",
      short_summary:
        "Housing markets built on ultra-low rates are highly vulnerable to sustained higher interest rates, threatening a repricing of assets worldwide.",
      image_url:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Housing markets have already absorbed the rate shock of 2022-2023 without a crash. US home prices continued rising despite 7%+ mortgage rates, Canada avoided a crash, and most European markets saw modest corrections at most. Homeowners locked into low fixed rates have no incentive to sell ('lock-in effect'), constraining supply and supporting prices. Central banks will eventually cut rates, reigniting demand. The housing market has proven far more resilient to rate increases than pessimists predicted.",
      proponent_rebuttal:
        "The full impact of higher rates has not yet materialized due to the lag effect. In the US, 85% of mortgages are locked at sub-5% rates, creating a temporary 'golden handcuffs' effect that suppresses both supply and transaction volume. But life events (divorce, job loss, relocation, death) force approximately 4-5% of homeowners to sell annually regardless of rates. As more households roll onto higher rates—particularly in countries with variable-rate mortgages like Canada (5-year terms), Australia, and the UK—the affordability squeeze will intensify. Canada alone faces $900B in mortgage renewals at significantly higher rates through 2026. The Bank for International Settlements warns that the sensitivity of household debt service to rate increases is at its highest level in decades.",
      crux: {
        id: "mortgage-renewal-stress",
        title: "The Mortgage Renewal Stress Test",
        description:
          "Model the impact of upcoming mortgage renewals at higher rates on household finances and forced selling pressure.",
        methodology:
          "Calculate the volume and timing of mortgage renewals across major markets. Model payment shock for households renewing from sub-3% to 5%+ rates. Estimate the percentage of households that will face debt-service ratios exceeding 40% of gross income. Project forced selling volume and its price impact.",
        equation:
          "\\Delta P_{monthly} = L \\times \\left(\\frac{r_{new}}{12} - \\frac{r_{old}}{12}\\right) \\times \\frac{(1+r_{new}/12)^n}{(1+r_{new}/12)^n - 1}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$100K (central bank data + household financial modeling)",
      },
      evidence: [
        {
          id: "canada-renewal-wave",
          title: "Canada Faces $900B Mortgage Renewal Wave",
          description:
            "Approximately $900B CAD in Canadian mortgages will renew between 2024-2026 at rates 2-3 percentage points higher than the original rate, potentially adding $500-1000/month to household payments.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "Bank of Canada Financial Stability Review",
          reasoning:
            "Central bank data directly quantifying upcoming payment shocks in a variable-rate market.",
        },
        {
          id: "bis-debt-sensitivity",
          title: "BIS Warns of Record Household Debt Sensitivity",
          description:
            "The Bank for International Settlements reports that the ratio of household debt to GDP in advanced economies is at historically elevated levels, making housing markets more vulnerable to rate increases than in previous tightening cycles.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Bank for International Settlements Annual Report",
          reasoning:
            "BIS is an independent supranational institution with no political incentive to overstate risks.",
        },
        {
          id: "transaction-volume-collapse",
          title: "Housing Transaction Volumes Have Collapsed",
          description:
            "US existing home sales fell to their lowest level since 1995 in 2023. UK transactions dropped 20%. Markets with falling volume but stable prices often precede price corrections as sellers resist lowering prices until forced.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "NAR, HMRC UK Property Transactions",
          reasoning:
            "Volume declines are an early warning signal; price adjustments typically lag volume contractions.",
        },
        {
          id: "lock-in-effect-resilience",
          title: "Lock-In Effect Prevents Forced Selling",
          description:
            "In the US, 85% of outstanding mortgages carry rates below 5%, and 60% below 4%. Homeowners have no financial incentive to sell and buy at higher rates, constraining supply and supporting prices even as affordability worsens.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "Federal Housing Finance Agency",
          reasoning:
            "The lock-in effect is a genuine structural support, though it primarily applies to the US fixed-rate market and not to variable-rate countries.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
