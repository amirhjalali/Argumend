import type { TopicInput } from "@/lib/schemas/topic";

export const globalHousingBubbleData = {
  id: "global-housing-bubble",
  title: "Is There a Global Housing Bubble About to Burst?",
  question: "Is there a global housing bubble about to burst?",
  meta_claim:
    "Major housing markets worldwide are in an unsustainable bubble driven by low interest rates, speculation, and foreign investment, and a correction is imminent.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "In 2023, as US 30-year mortgage rates neared 8%, national home prices still set records, and about 88% of mortgaged US homeowners held a rate below 6%. In Canada, about 60% of mortgages renew in 2025-2026, a large share of them taken out at pandemic-era lows. Both sides accept these facts. The fight is over whether record price-to-income ratios and renewal shocks will force prices down, or tight supply will hold them up.",
    confidence: 86,
    source:
      "S&P Cotality (formerly CoreLogic) Case-Shiller U.S. National Home Price Index; Freddie Mac Primary Mortgage Market Survey; Redfin analysis of FHFA National Mortgage Database data (February 2025); Bank of Canada Financial Stability Report 2025",
    sourceUrl: "https://fred.stlouisfed.org/series/CSUSHPINSA",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that price-to-income ratios in many major cities sit at or near record highs and first-time buyers have been squeezed; that large institutions own a small share of homes nationally but a much larger one in some Sun Belt starter markets; and that the US lock-in effect holds down for-sale supply while variable- and short-fixed-rate markets are far more exposed to higher rates.",
    "They split over whether record ratios must eventually force prices down or constrained supply can keep them high; whether concentrated investors would sell fast enough in a downturn to deepen price falls; and whether the 2025-2026 mortgage renewal wave in markets like Canada forces enough sales to push prices down, or is absorbed by income growth and refinancing.",
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
        "In Canada, Australia, New Zealand, and parts of Europe, price-to-income ratios in major cities sit far above the 3-5x range historically considered sustainable. On the OECD's standardized measure, house prices outpaced household incomes by roughly 15% across member countries between 2015 and 2023 (21% at the 2022 peak), with the steepest divergences in Portugal and Canada and the US not far behind—and the ratio hit record highs in the most stretched markets. Every previous episode of such extreme divergence has eventually ended in a correction. Structural arguments were made before the 2008 US crash ('land is limited in coastal cities'), before Japan's 1991 crash ('Japanese culture values property'), and before Ireland's 2007 crash ('the Celtic Tiger is different'). The math of affordability reasserts itself: once mortgage payments consume an outsized share of income—in Toronto, about 110% of median after-tax family income on the Fraser Institute's 2023 measure—the buyer pool contracts until prices must adjust.",
      crux: {
        id: "affordability-threshold",
        title: "The Affordability Threshold Test",
        question:
          "Do record price-to-income ratios force prices down, or can tight supply keep them high?",
        description:
          "Determine whether current price-to-income ratios exceed the sustainable ceiling beyond which buyer pools contract and prices must correct.",
        methodology:
          "Calculate price-to-income ratios across 50+ major housing markets. Compare to pre-correction ratios from previous housing downturns (US 2006, Japan 1990, Ireland 2007). Measure share of median income required for mortgage payments at current rates. Identify threshold beyond which first-time buyer participation collapses.",
        equation:
          "\\text{Affordability Ratio} = \\frac{\\text{Median House Price}}{\\text{Median Household Income}}",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Price-to-income ratios and mortgage burdens across 50+ housing markets, set against the ratios that came before the US 2006, Japan 1990 and Ireland 2007 corrections, and the level at which first-time-buyer participation falls away.",
        },
        cost_to_verify: "$0 (publicly available OECD and national statistics data)",
        falsification: {
          supporter_flip:
            "If a market sustained price-to-income ratios far above the historical 3-5x band for a full economic cycle — with first-time-buyer participation recovering rather than collapsing — without any correction, that would show elevated ratios reflect a durable structural shift (supply constraints, dual-income norms) rather than a bubble destined to pop.",
          skeptic_flip:
            "If today's markets followed the pattern of the US in 2006, Japan in 1990 and Ireland in 2007, extreme ratios defended as 'structural', and mortgage burdens above ~50% of income shrank the buyer pool, the 'new normal' view would be hard to hold.",
          common_ground:
            "Both sides agree price-to-income ratios in many major cities are at or near record highs and that affordability for first-time buyers has deteriorated sharply.",
          live_disagreement:
            "Whether there is a hard affordability ceiling beyond which the buyer pool must contract and prices must fall, or whether constrained supply lets ratios stay permanently elevated — resolvable by tracking, across many markets, whether record ratios actually trigger corrections or persist through a full cycle.",
        },
      },
      evidence: [
        {
          id: "oecd-price-income-divergence",
          title: "OECD: House Prices Outran Incomes by About 15% From 2015 to 2023, After a 2022 Peak",
          description:
            "On the OECD's price-to-income index (nominal house prices divided by disposable income per head, 2015 = 100), the OECD aggregate stood at 115.3 in 2023, so house prices had outgrown incomes by about 15% since 2015. It peaked at 121.4 in 2022, the highest reading since 2000, and was 114.1 in 2025. The largest 2015-2023 rises were in Portugal (+47%), Canada (+38%), Luxembourg (+33%) and the US (+27%). Since 2000 the ratio has risen most in Canada (+112%), New Zealand (+87%) and Australia (+73%). Canada, the US and the OECD aggregate all peaked in 2022 and have eased since, so those ratios sit below their record highs; Portugal's kept climbing, to 166.7 in 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "OECD Analytical House Price Indicators, price-to-income ratio (index, 2015 = 100), annual data retrieved November 2026",
          sourceUrl: "https://www.oecd.org/en/data/indicators/housing-prices.html",
          reasoning:
            "OECD data is standardized across countries and independently compiled, providing a direct measure of the affordability gap. The index tracks change since 2015, not the level of the ratio, so it cannot rank countries by how expensive housing is, and the retreat from the 2022 peak slightly tempers the directness.",
        },
        {
          id: "mortgage-income-share",
          title: "Toronto: Mortgage Payment on a Typical Home Tops 100% of Median After-Tax Family Income",
          description:
            "A Fraser Institute study of 2023 data finds that the monthly mortgage payment on a typical home, after a 20% down payment, took 110.2% of the local median after-tax family income in Toronto, up from 56% in 2014. In all 14 Ontario urban centres measured it took more than half, from 50.4% in Ottawa-Gatineau to 110.2% in Toronto; in 2014 the range was 21.1% (Windsor) to 56% (Toronto). The figures are after-tax and cover Ontario; comparable per-city figures for Sydney and London were not verified here.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Fraser Institute, 'Home Ownership and Rent Affordability in Canadian CMAs, 2014-2023' (Ontario news release, 20 November 2025)",
          sourceUrl:
            "https://www.fraserinstitute.org/sites/default/files/2025-11/home-ownership-rent-affordability-in-cdn-cmas-2014-2023-newsrelease-on.pdf",
          reasoning:
            "Mortgage burden directly measures sustainability for typical buyers. The measure prices a typical home against the local median family income, so it describes what a new buyer would face, not what existing owners pay. Verified data is after-tax and specific to Ontario, with Sydney and London unconfirmed.",
        },
        {
          id: "first-time-buyer-collapse",
          title: "First-Time Buyer Share Fell to a Record-Low 21% in 2025 (NAR)",
          description:
            "NAR's 2025 Profile of Home Buyers and Sellers, covering purchases from July 2024 to June 2025, put first-time buyers at a record-low 21% of buyers and their typical age at an all-time high of 40. The 2022 edition had recorded 26%, then the lowest share since the survey began in 1981, against a historic average of 38%; the share rebounded to 32% in 2023 before falling again. NAR says the share rose slightly from that low in its 2026 edition.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "NAR, 2025 Profile of Home Buyers and Sellers (news release, 4 November 2025); NAR Economists' Outlook, 'Top 9 Takeaways from NAR's 2023 Profile of Home Buyers and Sellers' (13 November 2023); NAR's 2023 release as carried by Florida Realtors",
          sourceUrl:
            "https://www.nar.realtor/press-releases/first-time-home-buyer-share-falls-to-historic-low-of-21-median-age-rises-to-40",
          reasoning:
            "A shrinking first-time-buyer share signals demand erosion at the entry level. NAR's own economist reads it as the result of 'a housing market starved for affordable inventory', which is the supply story as much as the bubble story, and NAR's survey is self-reported, lowering independence.",
        },
        {
          id: "supply-constraint-defense",
          title: "Structural Supply Constraints Justify Higher Ratios",
          description:
            "The OECD's overview of urban housing says that 'In many cities, housing supply has failed to keep pace with rising demand', and names 'increasing scarcity of land, restrictive building regulations, and rising construction costs' as barriers to more affordable housing. On that reading, elevated price-to-income ratios partly reflect a lasting shortage of supply rather than a pure bubble. The page is a policy overview, not a measured estimate of how much of the price rise supply explains.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 4,
          },
          source:
            "OECD, Urban housing (policy overview page; interpretive)",
          sourceUrl:
            "https://www.oecd.org/en/topics/sub-issues/urban-housing.html",
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
        "Large institutional investors are a small share of the market: the Urban Institute finds the 32 firms owning more than 1,000 homes hold about 446,000 houses, 3.0% of the country's 15.1 million single-family rentals, and all owners of 100 or more hold 3.8%. Their presence adds liquidity, professionalizes property management, and reflects rational investment in a real asset rather than froth. Foreign investment is heavily regulated in most countries and US foreign-buyer volume has fallen sharply from its 2017 peak. Short-term rentals are typically a single-digit share of housing stock and their measured price effects are modest outside a few tourist cores. Blaming institutions and foreigners for what is fundamentally a supply-and-rate problem is politically convenient but empirically thin.",
      proponent_rebuttal:
        "Even if institutional ownership is small nationally, investor activity is concentrated in specific markets and price tiers where its effect is outsized. In Sun Belt metros like Atlanta and Phoenix, all investors combined bought roughly a quarter to a third of homes sold at the 2021-2022 peak (Redfin: ~28% in Atlanta and ~26% in Phoenix in Q3 2022), skewed toward lower-priced homes that compete directly with first-time buyers. Foreign capital can distort premium segments even at low volumes by targeting trophy properties and repricing surrounding blocks. And short-term rentals, while only a single-digit share of stock in most cities, measurably tighten supply where they cluster—García-López et al. find Airbnb raised Barcelona rents ~1.9% on average and ~7% in the highest-activity neighborhoods. When investors retreat in a downturn—as Redfin shows they did, with purchases falling roughly 42-67% year-over-year in Atlanta and Phoenix in the second half of 2022—the same concentration that lifted prices can amplify declines on the way down.",
      crux: {
        id: "institutional-exit-risk",
        title: "The Institutional Exit Risk Assessment",
        question:
          "Would large investors sell fast enough in a downturn to deepen price falls?",
        description:
          "Evaluate whether concentrated institutional holdings in specific market segments create systemic risk of accelerated sell-offs during downturns.",
        methodology:
          "Map institutional ownership concentration by city, neighborhood, and price tier. Model exit scenarios under various economic conditions (recession, rate increases, rental yield compression). Compare to historical episodes of concentrated investor liquidation in real estate.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Investor ownership mapped by metro and price tier, such as Sun Belt starter homes in Atlanta and Phoenix, and what those holders do in the next downturn: sell gradually, keep renting, or dump homes all at once.",
        },
        cost_to_verify: "$200K (proprietary transaction data + economic modeling)",
        falsification: {
          supporter_flip:
            "If a downturn arrived and institutional and investor holdings were sold off gradually (or held through the trough as long-term rental assets) rather than dumped — with no measurable amplification of price declines in the metros and price tiers where investors had concentrated — that would refute the claim that concentrated ownership creates systemic sell-off risk.",
          skeptic_flip:
            "If local data confirmed that investors bought roughly a quarter to a third of homes in Sun Belt metros like Atlanta and Phoenix at the 2021-2022 peak, and they began exiting together, the ~3% national institutional share would understate the risk to those markets.",
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
            "Per Redfin, investors (any business or institution that buys homes, not only large ones) bought 30.6% of homes sold in Miami, 26.6% in Jacksonville and 24.6% in Atlanta in Q4 2022, against 17.8% across the 40 metros it tracks. Their buying skews cheap: low-priced homes made up 48.2% of investor purchases, and investors bought 24.1% of low-priced homes sold, compared with 13.8% of mid-priced and 15% of high-priced homes. Atlanta's investor share had been 36.2% a year earlier; investor purchases there fell 62.8% in a year.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Redfin, 'Investors Are Buying About Half as Many Homes as They Were a Year Ago' (Q4 2022 investor report, 15 February 2023)",
          sourceUrl:
            "https://www.redfin.com/news/investor-home-purchases-q4-2022/",
          reasoning:
            "Concentrated buying in specific segments can distort local pricing, but the verified figures cover all investors (not large institutions alone) and the metro shares apply to all homes sold, so they do not show institutions dominating the starter segment. Redfin notes its count may include purchases made through family trusts for personal use.",
        },
        {
          id: "airbnb-rental-reduction",
          title: "Short-Term Rentals Raised Rents and Prices Where They Cluster",
          description:
            "A peer-reviewed study of Barcelona (Garcia-López, Jofre-Monseny, Martínez-Mazza and Segú, Journal of Urban Economics, 2020) estimates that Airbnb activity raised rents by 1.9% and transaction prices by 4.6% in the average neighborhood, and by 7% and 17% in the top decile of Airbnb activity. In Lisbon and Porto, Franco and Santos (Regional Science and Urban Economics, 2021) find that house prices in high-tourism parishes rose 32.3% by early 2016 relative to low-tourism parishes, measured against the period before Airbnb's expansion. The effects are real but concentrated where short-term rentals cluster.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Garcia-López et al., 'Do short-term rental platforms affect housing markets? Evidence from Airbnb in Barcelona', Journal of Urban Economics 119 (2020); Franco & Santos, 'The impact of Airbnb on residential property values and rents: Evidence from Portugal', Regional Science and Urban Economics 88 (2021)",
          sourceUrl:
            "https://www.sciencedirect.com/science/article/pii/S0094119020300498",
          reasoning:
            "Localized rent and price effects from short-term rentals are documented in peer-reviewed work, but they are small on a city average (about 2% on Barcelona rents) and large only in the most tourist-heavy neighborhoods, so they explain little of a national or global price boom.",
        },
        {
          id: "foreign-investment-decline",
          title: "Foreign Investment in US Housing Has Declined Since 2017",
          description:
            "Per NAR, foreign-buyer dollar volume in US existing homes fell from a 2017 peak of $153.0 billion (284,500 homes) to $42.0 billion (54,300 homes) in the year to March 2024, the fewest homes since NAR began the estimate in 2009. Foreign buyers accounted for 1.3% of existing-home sales and 2.0% of dollar volume. NAR attributes the latest drop to a stronger dollar making US purchases more expensive.",
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
            "https://www.nar.realtor/sites/default/files/documents/2024-international-transactions-in-us-residential-real-estate-report-07-17-2024.pdf",
          reasoning:
            "If foreign buying has already fallen sharply yet prices remain high, foreign capital is unlikely to be the primary driver. NAR's figures are US-only and survey-based, so the point does not carry to markets such as Canada or Australia without their own data.",
        },
        {
          id: "institutional-share-small",
          title: "Institutional Share of Total Market Remains Small",
          description:
            "Per the Urban Institute, the 32 'mega' investors that each own more than 1,000 single-family rentals held almost 446,000 homes as of June 2022, 3.0% of the 15.1 million single-family rental properties nationwide; counting every owner of 100 or more homes brings the total to about 574,000, or 3.8%. The same report finds the holdings concentrated: institutional operators own 28.6% of single-family rentals in Atlanta and 24.2% in Jacksonville.",
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
            "Urban Institute data show large institutions are too small a share nationally to drive a bubble. The shares are of single-family rentals, not of all homes, and the report itself documents heavy concentration in a few Sun Belt metros, which is the other side's point.",
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
        "Housing markets have already absorbed the sharp rate shock of 2022-2023 without a crash. US home prices reached fresh records even as mortgage rates topped 7%, Canada avoided the widely predicted collapse, and most European markets saw only modest corrections. The lock-in effect is a powerful structural support: with roughly 73% of mortgaged US homeowners holding a rate below 5% and 55% below 4% in late 2024, owners have little reason to sell into a higher-rate market, which throttles for-sale supply and underpins prices. Tight supply, resilient labor markets, and the eventual return of rate cuts all argue for a gradual adjustment rather than a bust. The market has proven far more resilient to tightening than the crash narrative predicted.",
      proponent_rebuttal:
        "The full impact of higher rates has not yet materialized because of the lag effect. In the US, the lock-in effect is real but finite: roughly 73% of mortgaged homeowners held rates below 5% and about 55% below 4% in late 2024, creating 'golden handcuffs' that suppress supply and transaction volume—yet life events (divorce, job loss, relocation, death) still force a steady stream of owners to sell regardless of rates. The greater exposure is in shorter-term-fixed and variable-rate markets. In Canada, the Bank of Canada estimates about 60% of outstanding mortgages renew across 2025-2026, with five-year fixed holders facing average payment increases of roughly 15-20% versus December 2024. Australia and the UK, with similar rollover structures, face comparable squeezes. The Bank for International Settlements notes that household debt-service sensitivity to rate increases remains historically elevated in several advanced economies, so the adjustment may still be unfolding rather than over.",
      crux: {
        id: "mortgage-renewal-stress",
        title: "The Mortgage Renewal Stress Test",
        question:
          "Will mortgage renewals at higher rates force enough sales to push prices down?",
        description:
          "Model the impact of upcoming mortgage renewals at higher rates on household finances and forced selling pressure.",
        methodology:
          "Calculate the volume and timing of mortgage renewals across major markets. Model the payment shock for households renewing from pandemic-era lows (roughly 2-3%) onto current rates, consistent with the Bank of Canada's estimate of ~15-20% average payment increases for five-year fixed holders in 2025-2026. Estimate the share of households whose debt-service ratios exceed 40% of gross income, and project forced-selling volume and its price impact.",
        equation:
          "\\Delta P_{monthly} = L \\times \\left(\\frac{r_{new}}{12} - \\frac{r_{old}}{12}\\right) \\times \\frac{(1+r_{new}/12)^n}{(1+r_{new}/12)^n - 1}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Track mortgage arrears, forced sales and new listings in markets where loans reset every few years, such as Canada, the UK and Australia, as large blocks of low-rate mortgages come up for renewal, using central-bank and lender data.",
        },
        cost_to_verify: "$100K (central bank data + household financial modeling)",
        falsification: {
          supporter_flip:
            "If the 2025-2026 renewal wave in short-fixed and variable-rate markets (Canada, Australia, UK) passed with households absorbing the payment increases — rising incomes, term extensions, and savings buffers preventing a spike in forced selling or arrears — that would show the 'lag effect' was a deferral that markets digested, not a delayed crash.",
          skeptic_flip:
            "If arrears and forced sales rose as Canada's 2025-2026 renewals, about 60% of mortgages, hit five-year fixed holders with ~15-20% payment increases, the US lock-in effect would look like a local exception and the shock like one that had not yet arrived.",
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
            "The Bank of Canada reports that about 60% of all outstanding mortgages renew in 2025 or 2026, a large share of them taken out during the pandemic at historically low rates. About 60% of those renewing are expected to pay more, most of them five-year fixed-rate holders, who face average payment increases of around 15-20% compared with December 2024. The Bank's own reading is that it does not expect the renewals to 'lead to a severe worsening of financial stress': most borrowers have higher incomes, and about half of those facing increases could erase them by extending amortization by five years.",
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
            "Central-bank data directly quantify the renewal payment shock in a short-term-fixed market. The same note expects most households to absorb it, so the card supports the size of the shock more than the forced selling that would have to follow.",
        },
        {
          id: "bis-debt-sensitivity",
          title: "BIS Data: Household Debt Service Ratios Hit Series Highs in Norway, Canada and Sweden",
          description:
            "BIS household debt service ratios, the share of income going to interest and repayments, climbed to the highest levels in the series (which starts in 1999) as rates rose: Norway's went from 14.7% at the end of 2021 to 21.1% in late 2024, Canada's reached 14.6% in mid-2023 and Sweden's 12.7% in early 2024. Australia's rose from 13.4% to 16.2% over 2022-2023, still below its 2008 peak of 18.2%. The US ratio, about 8%, stays well under its 2007 peak of 11.6%. A 2023 BIS Bulletin notes that 'When private debt to GDP is high, aggregate demand may be more sensitive to interest rate hikes', while adding that longer maturities, fewer variable-rate loans and higher household net worth should counteract this.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "BIS, Debt service ratios statistics (household sector, data retrieved November 2026); Ampudia, De Fiore, Kharroubi & Manea, 'Private debt, monetary policy tightening and aggregate demand', BIS Bulletin No. 70 (24 February 2023)",
          sourceUrl: "https://data.bis.org/topics/DSR",
          reasoning:
            "BIS is an independent supranational institution with no political incentive to overstate risks. Sensitivity is concentrated in high-DSR economies rather than uniform, and the BIS itself lists offsetting factors, which slightly lowers directness.",
        },
        {
          id: "transaction-volume-collapse",
          title: "US Existing-Home Sales Fell to a Nearly 30-Year Low in 2023",
          description:
            "US existing-home sales fell 18.7% in 2023 to 4.09 million, the weakest year since 1995 and the biggest annual decline since 2007 (NAR). Falling volume alongside still-firm prices often precedes corrections as sellers resist cutting prices until forced. Against that reading, the 2023 US median price still edged up just under 1% to a record $389,800.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "NAR existing-home sales for 2023, as reported by the Associated Press and carried on NAR's newsroom (19 January 2024)",
          sourceUrl:
            "https://www.nar.realtor/newsroom/in-the-news/2023-was-slowest-year-for-us-home-sales-in-nearly-30-years-as-high-mortgage-rates-frustrated-buyers",
          reasoning:
            "Volume declines are an early-warning signal and the 1995-low figure is verified, but low volume coincided with record 2023 prices, so the link to an imminent correction is indirect.",
        },
        {
          id: "lock-in-effect-resilience",
          title: "Lock-In Effect Prevents Forced Selling",
          description:
            "In the US, over 96% of mortgage borrowers have a fixed rate, and 57% of them held a rate below 4% as of mid-2024 (FHFA). Redfin's analysis of FHFA data puts the shares of mortgaged homeowners in the third quarter of 2024 at 82.8% below 6%, 73.3% below 5% and 55.2% below 4%, down from 2022 records of 92.7%, 85.6% and 65.1%. Owners locked in below market rates have little incentive to sell and re-buy at higher rates: FHFA economists estimate lock-in prevented 1.72 million home sales between mid-2022 and mid-2024 and raised home prices by 7.0% through reduced supply, while higher rates directly lowered them by 5.6%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "Batzer, Coste, Doerner & Seiler, 'The Lock-In Effect of Rising Mortgage Rates', FHFA Working Paper 24-03 (2024); Redfin analysis of FHFA National Mortgage Database data (6 February 2025)",
          sourceUrl: "https://www.fhfa.gov/document/wp2403.pdf",
          reasoning:
            "The lock-in effect is a genuine structural support, measured on loan-level data by the regulator's own economists. The locked-in share is shrinking each quarter as new loans are written at higher rates, and the effect applies mainly to the US 30-year-fixed market, not variable-rate countries.",
        },
      ],
    },
  ],
} satisfies TopicInput;
