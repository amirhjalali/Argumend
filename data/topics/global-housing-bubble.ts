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
          title: "OECD Price-to-Income Ratios Near Record Highs",
          description:
            "On the OECD's aggregate measure, house prices outpaced household income growth by roughly 17% across member countries between 2015 and 2023. The largest increases since 2014 were in Portugal (+53pp), Canada (+41pp) and the US (+31pp); New Zealand, Canada and Sweden have both the highest ratios and largest increases since 2000. Real prices peaked in 2022 and eased slightly into 2023, so ratios are near rather than uniformly above all-time highs.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "OECD Analytical House Prices Indicators (price-to-income ratio), 2023",
          sourceUrl: "https://www.oecd.org/en/data/indicators/housing-prices.html",
          reasoning:
            "OECD data is standardized across countries and independently compiled, providing a direct measure of the affordability gap. Ratios near (not always above) prior peaks slightly tempers the directness.",
        },
        {
          id: "mortgage-income-share",
          title: "Mortgage Payments Consuming Record Share of Income",
          description:
            "In Toronto, the mortgage payment on a typical home in 2023 exceeded 50% of median after-tax family income (the Fraser Institute puts it above 100% on its measure), far above the ~30% guideline considered affordable. Exact burdens vary by methodology (pre- vs after-tax) and city; comparable per-city figures for Sydney and London were not verified here.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Fraser Institute, Homeownership Affordability in Canadian CMAs, 2014-2023",
          sourceUrl:
            "https://www.fraserinstitute.org/sites/default/files/2025-11/home-ownership-rent-affordability-in-cdn-cmas-2014-2023-newsrelease-on.pdf",
          reasoning:
            "Mortgage burden directly measures sustainability for typical buyers, but the headline 50-60% pre-tax range was a generalization: verified data is after-tax and specific to Toronto, with Sydney/London unconfirmed.",
        },
        {
          id: "first-time-buyer-collapse",
          title: "First-Time Buyer Share Near Historic Lows",
          description:
            "NAR's Profile of Home Buyers and Sellers recorded a record-low 26% first-time-buyer share in 2022 (versus a ~38% historical average); the share rebounded to 32% in 2023, still well below norm. The figure has continued to fall in later editions, indicating sustained affordability pressure on the entry-level buyer pool.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "NAR, Profile of Home Buyers and Sellers (2022 record low 26%; 2023 at 32%)",
          sourceUrl:
            "https://www.nar.realtor/blogs/economists-outlook/top-9-takeaways-from-nars-2023-profile-of-home-buyers-and-sellers",
          reasoning:
            "Declining first-time-buyer share signals demand erosion, but the original claim mis-dated the 26% low to 2023 (it was 2022, with 2023 rebounding to 32%); NAR's survey is also self-reported, lowering independence.",
        },
        {
          id: "supply-constraint-defense",
          title: "Structural Supply Constraints Justify Higher Ratios",
          description:
            "Zoning laws, restrictive land-use rules, and geographic constraints in major cities have persistently limited housing supply, so elevated price-to-income ratios may partly reflect a durable structural shift rather than a pure bubble. This is an analytical interpretation, not a single measured statistic.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 4,
          },
          source:
            "OECD analysis of housing supply responsiveness (interpretive; no single primary statistic)",
          sourceUrl:
            "https://www.oecd.org/en/topics/sub-issues/housing-policy.html",
          reasoning:
            "Supply constraints are real and documented, but this item is an interpretation rather than a verified figure, and such constraints also existed before previous corrections, so weights are kept low.",
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
          title: "Investor Buyers Concentrated in Sun Belt Starter Segments",
          description:
            "Per Redfin, investors (all sizes, not only large institutions) bought roughly a quarter to a third of homes sold in several Sun Belt metros in Q4 2022 — about 31% in Miami, 27% in Jacksonville and 25% in Atlanta — with purchases skewed toward lower-priced, entry-level homes that compete with first-time buyers.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Redfin, Investor Home Purchases by Metro (Q4 2022)",
          sourceUrl:
            "https://journalistsresource.org/home/single-family-homes-institutional-investors/",
          reasoning:
            "Concentrated buying in specific segments can distort local pricing, but the verified figures cover all investors (not large institutions alone) and the share applies to all homes sold in those metros, so 'dominating the below-median segment' was an overstatement.",
        },
        {
          id: "airbnb-rental-reduction",
          title: "Short-Term Rentals Pushing Up Rents in Tourist Cities",
          description:
            "A peer-reviewed study of Barcelona (Garcia-Lopez et al., Journal of Urban Economics) attributes a ~1.9% average rent rise to Airbnb activity, rising to ~7% in the highest-activity neighborhoods. In the historic centres of Lisbon and Porto, where short-term rentals concentrate, estimated price effects exceed 30%. Effects are real but localized and far smaller than a blanket 15-30% city-wide.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Garcia-Lopez et al., 'Do short-term rental platforms affect housing markets?', Journal of Urban Economics (2020)",
          sourceUrl:
            "https://www.sciencedirect.com/science/article/pii/S0094119020300498",
          reasoning:
            "Localized rent effects from short-term rentals are documented, but the original 15-30% figure overstated the average: peer-reviewed estimates are ~2% city-average and ~7% in hot neighborhoods, with >30% only in concentrated historic cores.",
        },
        {
          id: "foreign-investment-decline",
          title: "Foreign Investment in US Housing Has Declined Since 2017",
          description:
            "Per NAR, foreign-buyer dollar volume in US existing homes fell from a 2017 peak of $153B (284,500 sales) to about $42B in 2023-24 (the lowest count since 2009). Chinese capital controls, a strong US dollar, Canadian foreign-buyer taxes, and New Zealand's foreign-buyer ban have all curbed cross-border residential investment.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "NAR, International Transactions in U.S. Residential Real Estate (2024)",
          sourceUrl:
            "https://www.nar.realtor/newsroom/annual-foreign-investment-in-u-s-existing-homes-sales-decreased-21-2-to-42-billion",
          reasoning:
            "If foreign buying has already fallen sharply yet prices remain high, foreign capital is unlikely to be the primary driver. NAR's figures are US-focused, so the global generalization is partly extrapolated.",
        },
        {
          id: "institutional-share-small",
          title: "Institutional Share of Total Market Remains Small",
          description:
            "Per the Urban Institute, large institutional investors (owning 1,000+ homes) hold only about 3% of single-family rentals and under 0.5% of the total single-family stock; large-investor purchases were under 1% of single-family home sales in 2021. Broader 'all-investor' shares are larger, but true institutional ownership is small nationally.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Urban Institute, 'A Profile of Institutional Investor-Owned Single-Family Rental Properties' (2023)",
          sourceUrl:
            "https://www.urban.org/sites/default/files/2023-08/A%20Profile%20of%20Institutional%20Investor%E2%80%93Owned%20Single-Family%20Rental%20Properties.pdf",
          reasoning:
            "Urban Institute data show large institutions are too small a share nationally to drive a bubble. The prior 'Federal Reserve, PwC' attribution was unverified and has been corrected to the actual source; local concentration can still differ.",
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
          title: "Canada Faces a Large Mortgage Renewal Wave",
          description:
            "The Bank of Canada reports that about 60% of outstanding mortgages renew in 2025-2026, mostly five-year fixed loans originated at pandemic-era lows. BoC staff estimate five-year fixed holders renewing in 2025-26 face average payment increases of roughly 15-20% (about $5,100/year, ~$425/month) versus December 2024. (The widely cited '$900B' renewal figure traces to bank/CMHC estimates, not a single BoC statistic.)",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Bank of Canada, Financial Stability Report 2025 & Staff Analytical Note 2025-21",
          sourceUrl: "https://www.bankofcanada.ca/2025/07/staff-analytical-note-2025-21/",
          reasoning:
            "Central-bank data directly quantify the renewal payment shock in a short-term-fixed market. The original round '$900B / $500-1000 a month' was imprecise; BoC's verified figures (60% renewing, ~15-20% / ~$425 a month for 5-yr fixed) are used instead.",
        },
        {
          id: "bis-debt-sensitivity",
          title: "BIS Data Show Elevated Household Debt Sensitivity to Rates",
          description:
            "BIS data and research show household debt-to-GDP and debt-service ratios remain historically elevated in several advanced economies (notably Australia, Canada, Norway, Sweden), so when rates rise the flow-through to debt-service costs is large, making these housing markets more sensitive to tightening than in prior cycles.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "BIS, Debt Service Ratios statistics (and BIS Bulletin No. 70 on private debt and tightening)",
          sourceUrl: "https://data.bis.org/topics/DSR",
          reasoning:
            "BIS is an independent supranational institution with no political incentive to overstate risks. Sensitivity is concentrated in high-DSR economies rather than uniform, which slightly lowers directness.",
        },
        {
          id: "transaction-volume-collapse",
          title: "Housing Transaction Volumes Have Collapsed",
          description:
            "US existing-home sales fell 19% in 2023 to 4.09 million, the lowest full-year level since 1995 (NAR). UK residential transactions fell about 19% in 2023 to ~1.02 million (HMRC). Falling volume alongside still-firm prices often precedes corrections as sellers resist cutting prices until forced. (Note: 2023 US median prices still hit a record, complicating the bearish read.)",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "NAR Existing-Home Sales (2023); HMRC UK Property Transactions (2023)",
          sourceUrl:
            "https://www.nar.realtor/newsroom/in-the-news/2023-was-slowest-year-for-us-home-sales-in-nearly-30-years-as-high-mortgage-rates-frustrated-buyers",
          reasoning:
            "Volume declines are an early-warning signal and the 1995-low / ~19% UK drop figures are verified, but low volume coincided with record 2023 prices, so the link to an imminent correction is indirect.",
        },
        {
          id: "lock-in-effect-resilience",
          title: "Lock-In Effect Prevents Forced Selling",
          description:
            "In the US, roughly 86% of outstanding mortgages carry rates below 6%, about 76% below 5%, and about 57% below 4%. Homeowners locked at sub-market rates have little incentive to sell and re-buy at higher rates, constraining for-sale supply and supporting prices even as affordability worsens.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "Batzer & Coste, 'The Lock-In Effect of Rising Mortgage Rates', FHFA Working Paper 24-03 (2024)",
          sourceUrl: "https://www.fhfa.gov/document/wp2403.pdf",
          reasoning:
            "The lock-in effect is a genuine structural support. The earlier '85% below 5% / 60% below 4%' figures were inaccurate and have been corrected to FHFA/industry data (~76% below 5%, ~57% below 4%). It applies mainly to the US 30-year-fixed market, not variable-rate countries.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
