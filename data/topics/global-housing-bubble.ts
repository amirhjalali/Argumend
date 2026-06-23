import type { Topic } from "@/lib/schemas/topic";

export const globalHousingBubbleData = {
  id: "global-housing-bubble",
  title: "Is There a Global Housing Bubble About to Burst?",
  meta_claim:
    "Major housing markets worldwide are in an unsustainable bubble driven by low interest rates, speculation, and foreign investment, and a correction is imminent.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The crash the 'bubble' narrative predicted didn't arrive: even as US 30-year mortgage rates spiked toward 8% in 2023 — the sharpest tightening in decades — national home prices set fresh records on the S&P CoreLogic Case-Shiller index. The reason isn't froth from institutions or foreign buyers (large institutions own only ~3% of single-family rentals and under 0.5% of all homes); it's that ~76% of US mortgages are locked below 5%, choking the supply of homes for sale. The real exposure is in variable- and short-fixed-rate markets like Canada, where ~60% of mortgages renew in 2025-2026.",
    confidence: 86,
    source:
      "S&P CoreLogic Case-Shiller National Home Price Index (2023 record); Urban Institute, institutional SFR ownership (2023); FHFA WP 24-03 lock-in; Bank of Canada Financial Stability Report 2025",
    sourceUrl: "https://fred.stlouisfed.org/series/CSUSHPINSA",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "By the classic bubble signals, the warning lights are flashing: on the OECD's measure house prices outran household incomes by roughly 17% across member countries from 2015 to 2023, with the steepest divergences in Portugal, Canada and the US, and in Toronto the typical mortgage payment swallowed over half of median after-tax family income.",
    "But high ratios have stayed high for years without correcting, because the same tightening that should have triggered a crash instead froze supply — with ~76% of US mortgages locked below 5%, owners simply stopped selling, so US prices hit record highs in 2023 even as rates neared 8%, and large institutions and foreign buyers (often blamed) are too small a share nationally to be the driver.",
    "So the honest debate isn't 'is housing in a bubble that's about to burst?' but 'where does the rate shock actually bite, and when?' — the answer turning on short-fixed and variable-rate markets like Canada, Australia and the UK, where mortgages reprice on renewal rather than being locked for 30 years.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "OECD Housing Prices Database",
      url: "https://www.oecd.org/en/data/indicators/housing-prices.html",
    },
    {
      title: "IMF Global Housing Watch",
      url: "https://www.imf.org/external/research/housing/index.htm",
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
          url: "https://www.oecd.org/en/data/indicators/housing-prices.html",
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
        "In Canada, Australia, New Zealand, and parts of Europe, price-to-income ratios in major cities sit far above the 3-5x range historically considered sustainable. On the OECD's standardized measure, house prices outpaced household incomes by roughly 17% across member countries between 2015 and 2023, with the steepest divergences in Portugal, Canada, and the US—and the ratio hit record highs in the most stretched markets. Every previous episode of such extreme divergence has eventually ended in a correction. Structural arguments were made before the 2008 US crash ('land is limited in coastal cities'), before Japan's 1991 crash ('Japanese culture values property'), and before Ireland's 2007 crash ('the Celtic Tiger is different'). The math of affordability reasserts itself: once mortgage payments consume an outsized share of income—in Toronto, over half of median after-tax family income on the Fraser Institute's measure—the buyer pool contracts until prices must adjust.",
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
        falsification: {
          supporter_flip:
            "If a market sustained price-to-income ratios far above the historical 3-5x band for a full economic cycle — with first-time-buyer participation recovering rather than collapsing — without any correction, that would show elevated ratios reflect a durable structural shift (supply constraints, dual-income norms) rather than a bubble destined to pop.",
          skeptic_flip:
            "A skeptic who treats high ratios as the 'new normal' should weigh that every prior episode of this extreme a divergence (US 2006, Japan 1990, Ireland 2007) was preceded by the same 'this time is structural' arguments, and that mortgage burdens above ~50% of income mechanically shrink the buyer pool until prices adjust.",
          common_ground:
            "Both sides agree price-to-income ratios in many major cities are at or near record highs and that affordability for first-time buyers has deteriorated sharply.",
          live_disagreement:
            "Whether there is a hard affordability ceiling beyond which the buyer pool must contract and prices must fall, or whether constrained supply lets ratios stay permanently elevated — resolvable by tracking, across many markets, whether record ratios actually trigger corrections or persist through a full cycle.",
        },
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
        "Large institutional investors are a small share of the market: the Urban Institute finds firms owning 1,000+ homes hold only about 3% of single-family rentals and under 0.5% of the total single-family stock, and made under 1% of single-family purchases in 2021. Their presence adds liquidity, professionalizes property management, and reflects rational investment in a real asset rather than froth. Foreign investment is heavily regulated in most countries and US foreign-buyer volume has fallen sharply from its 2017 peak. Short-term rentals are typically a single-digit share of housing stock and their measured price effects are modest outside a few tourist cores. Blaming institutions and foreigners for what is fundamentally a supply-and-rate problem is politically convenient but empirically thin.",
      proponent_rebuttal:
        "Even if institutional ownership is small nationally, investor activity is concentrated in specific markets and price tiers where its effect is outsized. In Sun Belt metros like Atlanta and Phoenix, all investors combined bought roughly a quarter to a third of homes sold at the 2021-2022 peak (Redfin: ~28% in Atlanta and ~26% in Phoenix in Q3 2022), skewed toward lower-priced homes that compete directly with first-time buyers. Foreign capital can distort premium segments even at low volumes by targeting trophy properties and repricing surrounding blocks. And short-term rentals, while only a single-digit share of stock in most cities, measurably tighten supply where they cluster—García-López et al. find Airbnb raised Barcelona rents ~1.9% on average and ~7% in the highest-activity neighborhoods. When investors retreat in a downturn—as Redfin shows they did, with purchases falling roughly 45-65% year-over-year across these metros in late 2022—the same concentration that lifted prices can amplify declines on the way down.",
      crux: {
        id: "institutional-exit-risk",
        title: "The Institutional Exit Risk Assessment",
        description:
          "Evaluate whether concentrated institutional holdings in specific market segments create systemic risk of accelerated sell-offs during downturns.",
        methodology:
          "Map institutional ownership concentration by city, neighborhood, and price tier. Model exit scenarios under various economic conditions (recession, rate increases, rental yield compression). Compare to historical episodes of concentrated investor liquidation in real estate.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$200K (proprietary transaction data + economic modeling)",
        falsification: {
          supporter_flip:
            "If a downturn arrived and institutional and investor holdings were sold off gradually (or held through the trough as long-term rental assets) rather than dumped — with no measurable amplification of price declines in the metros and price tiers where investors had concentrated — that would refute the claim that concentrated ownership creates systemic sell-off risk.",
          skeptic_flip:
            "A skeptic who points to the small ~3% national institutional share should weigh that buying is concentrated by metro and price tier — investors bought roughly a quarter to a third of homes in Sun Belt metros like Atlanta and Phoenix at the 2021-2022 peak — so a localized, synchronized exit could move those specific markets even if the national footprint is small.",
          common_ground:
            "Both sides agree large institutions own a small share of total housing nationally but a much larger share in specific Sun Belt metros and the entry-level price tier.",
          live_disagreement:
            "Whether concentrated investor holdings would liquidate fast enough in a downturn to amplify price declines, or unwind slowly without systemic effect — resolvable only by mapping ownership concentration and modeling exit behavior against historical episodes of investor liquidation.",
        },
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
        "Housing markets have already absorbed the sharp rate shock of 2022-2023 without a crash. US home prices reached fresh records even as mortgage rates topped 7%, Canada avoided the widely predicted collapse, and most European markets saw only modest corrections. The lock-in effect is a powerful structural support: with roughly 76% of US mortgages below 5% and 57% below 4%, owners have little reason to sell into a higher-rate market, which throttles for-sale supply and underpins prices. Tight supply, resilient labor markets, and the eventual return of rate cuts all argue for a gradual adjustment rather than a bust. The market has proven far more resilient to tightening than the crash narrative predicted.",
      proponent_rebuttal:
        "The full impact of higher rates has not yet materialized because of the lag effect. In the US, the lock-in effect is real but finite: roughly 76% of mortgages carry rates below 5% and about 57% below 4%, creating 'golden handcuffs' that suppress supply and transaction volume—yet life events (divorce, job loss, relocation, death) still force a steady stream of owners to sell regardless of rates. The greater exposure is in shorter-term-fixed and variable-rate markets. In Canada, the Bank of Canada estimates about 60% of outstanding mortgages renew across 2025-2026, with five-year fixed holders facing average payment increases of roughly 15-20% (about $5,100 a year) versus December 2024. Australia and the UK, with similar rollover structures, face comparable squeezes. The Bank for International Settlements notes that household debt-service sensitivity to rate increases remains historically elevated in several advanced economies, so the adjustment may still be unfolding rather than over.",
      crux: {
        id: "mortgage-renewal-stress",
        title: "The Mortgage Renewal Stress Test",
        description:
          "Model the impact of upcoming mortgage renewals at higher rates on household finances and forced selling pressure.",
        methodology:
          "Calculate the volume and timing of mortgage renewals across major markets. Model the payment shock for households renewing from pandemic-era lows (roughly 2-3%) onto current rates, consistent with the Bank of Canada's estimate of ~15-20% average payment increases for five-year fixed holders in 2025-2026. Estimate the share of households whose debt-service ratios exceed 40% of gross income, and project forced-selling volume and its price impact.",
        equation:
          "\\Delta P_{monthly} = L \\times \\left(\\frac{r_{new}}{12} - \\frac{r_{old}}{12}\\right) \\times \\frac{(1+r_{new}/12)^n}{(1+r_{new}/12)^n - 1}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$100K (central bank data + household financial modeling)",
        falsification: {
          supporter_flip:
            "If the 2025-2026 renewal wave in short-fixed and variable-rate markets (Canada, Australia, UK) passed with households absorbing the payment increases — rising incomes, term extensions, and savings buffers preventing a spike in forced selling or arrears — that would show the 'lag effect' was a deferral that markets digested, not a delayed crash.",
          skeptic_flip:
            "A skeptic relying on the US lock-in effect should weigh that lock-in is a US 30-year-fixed phenomenon: in Canada ~60% of mortgages renew across 2025-2026 with five-year fixed holders facing ~15-20% payment increases, and the BIS finds household debt-service sensitivity historically elevated in several of these economies, so the shock may simply not have arrived yet.",
          common_ground:
            "Both sides agree the US lock-in effect genuinely suppresses for-sale supply and that variable- and short-fixed-rate markets are far more exposed to rate increases than the 30-year-fixed US market.",
          live_disagreement:
            "Whether the delayed payment shock in renewal-driven markets produces enough forced selling to push prices down, or is absorbed by income growth and refinancing — resolvable by tracking arrears, forced-sale volumes, and prices through the 2025-2026 renewal wave.",
        },
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
