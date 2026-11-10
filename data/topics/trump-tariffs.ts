export const trumpTariffsData = {
  id: "trump-tariffs",
  title: "Trump's Tariffs & Protectionist Trade Policy",
  question:
    "Have Trump's tariffs revived US manufacturing and helped American workers?",
  meta_claim:
    "Trump's protectionist trade policy — broad reciprocal tariffs, Section 232 metals duties, and layered tariffs on China — has revived American manufacturing, reduced strategic dependence on rivals, and rebalanced trade in favor of US workers.",
  status: "contested" as const,
  category: "economics" as const,
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "Who really pays Trump's tariffs?",
    "Are tariffs bringing factory jobs back?",
    "Are Trump's tariffs working?",
  ],
  // As of 3 November 2026: the Supreme Court struck down the IEEPA tariffs on
  // 20 February 2026; the replacement Section 301 "forced labor" tariffs of
  // 24 July 2026 were argued before the Court of International Trade on
  // 30 September, with no ruling yet; BLS counted 12.652 million
  // manufacturing jobs in September 2026. The US-China truce card is due a
  // separate recheck after 10 November.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In February 2026 the Supreme Court ruled 6–3 that the emergency-powers law behind Trump's 'reciprocal' tariffs does not authorize tariffs. By July new duties under other laws had replaced them, and those too are now being challenged in court. America had 12.65 million factory jobs in September 2026, about 21,000 fewer than in January 2025. The fight is over whether the tariffs that remain will bring factory work back, and who pays in the meantime.",
    confidence: 86,
    source:
      "SCOTUSblog on Learning Resources, Inc. v. Trump (February 2026); Bloomberg News (1 October 2026, via ttnews.com) on the Section 301 challenge; Bureau of Labor Statistics manufacturing payrolls via FRED (MANEMP, September 2026)",
    sourceUrl:
      "https://www.scotusblog.com/2026/02/a-breakdown-of-the-courts-tariff-decision/",
  },
  simple_case: [
    "The answer bears on what American households pay for imported goods, on which factories get built here, and on relations with allies and with China.",
    "Whatever the courts decide, the revenue has already moved: customs collected about $318 billion in FY2026 and refunded about $145 billion of the struck-down duties.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Consumer Prices & Inflation Pass-Through
    // =========================================================================
    {
      id: "inflation-passthrough",
      title: "Who Pays the Tariffs?",
      short_summary:
        "Trump said foreign exporters would pay. The New York Fed put their share at 6% to 14% during 2025, with US importers and consumers paying the rest, and Federal Reserve Board economists estimate tariffs raised core goods prices by about 3.1%. Japanese carmakers did cut their prices to hold US sales. The dispute is how much of the bill lands abroad, and whether a one-time price bump is worth paying or a regressive tax on households.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Tariffs are a tax paid by Americans, not by foreign exporters. The 'China pays the tariff' claim is empirically false: the New York Fed estimated roughly 90% of the 2025 tariff burden fell on US firms and consumers, with foreign exporters absorbing only about 6-14%. Federal Reserve Board economists found that tariffs explain the entirety of excess core goods inflation since January 2025 relative to pre-pandemic rates, adding about 0.8% to core PCE prices; the CBO projected in June 2025 that tariffs would add roughly 0.4 percentage points a year to inflation in 2025 and 2026, leaving the price level about 0.9% higher by 2026. The Yale Budget Lab puts the cost of current-law tariffs at about $1,100 per household a year, and its spring 2026 analysis found the bottom income decile bearing roughly three times the burden of the top decile as a share of income. This is a regressive consumption tax dressed up as trade policy.",
      proponent_rebuttal:
        "Pass-through is partial, not total — and that is the point. The HBS Pricing Lab found consumers bore up to 43% of the burden, with US companies absorbing the rest in their margins, and the New York Fed found the share absorbed by foreign exporters rising from about 6% to about 14% over the course of 2025, so part of the cost does land on trading partners. An average statutory tariff rate of about 11% is far below the deadweight catastrophe critics predicted, and Fed economists themselves found pass-through largely complete, which makes the core goods effect a one-time price-level adjustment rather than a sustained inflationary spiral. Tariff revenue — about $173 billion in net customs duties in FY2026, after refunds of the struck-down IEEPA duties — can fund offsetting tax cuts that change the net distributional picture, especially if structured progressively.",
      crux: {
        id: "tariff-incidence-split",
        title: "The Tariff Incidence Split Test",
        question:
          "How much of the tariff cost do US consumers and importers pay, versus foreign exporters?",
        description:
          "The load-bearing empirical question is what share of the tariff cost is ultimately paid by US consumers and importers versus absorbed by foreign exporters. If the lion's share lands domestically, 'China pays' is refuted and tariffs function as a domestic consumption tax. If exporters absorb a large share, the policy genuinely shifts costs abroad. Real-time price-matching studies can resolve this with high precision.",
        methodology:
          "Match daily retail prices to product-level tariff rates and country-of-origin, as Cavallo, Llamas, and Vazquez did, decomposing the price response into consumer, importer-margin, and foreign-exporter components. Cross-reference with Federal Reserve FEDS Note real-time CPI decompositions and BLS import/export price indices to estimate the three-way incidence split at the product category level.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Daily retail prices matched to product-level tariff rates and country of origin, as Cavallo, Llamas and Vazquez did, split into consumer, importer-margin and foreign-exporter shares and cross-checked with BLS import and export price indices.",
        },
        cost_to_verify:
          "$0 (Retail scanner data, BLS price indices, and published academic decompositions are available)",
        falsification: {
          supporter_flip:
            "If product-level price-matching studies found the foreign-exporter share stuck at the low end of the New York Fed's 6-14% range rather than rising, and tariff revenue were not used to offset the cost, the claim that tariffs shift real costs onto trading partners would fail.",
          skeptic_flip:
            "If studies kept finding foreign exporters absorbing a growing part of the cost, and the roughly $173 billion in net FY2026 customs duties funded progressive offsetting tax cuts, the 'pure tax on Americans' view would no longer capture the net distributional picture.",
          common_ground:
            "Both sides' own figures put most of the tariff cost on US consumers and importing firms, with the New York Fed putting the foreign-exporter share at about 6% to 14% during 2025.",
          live_disagreement:
            "How large the foreign-exporter share really is and whether it holds over time — and whether a one-time price-level bump, partly offset by tariff revenue, is a cost worth paying or a regressive consumption tax.",
        },
      },
      evidence: [
        {
          id: "cavallo-passthrough",
          title: "Cavallo et al. Find 20-24% Retail Pass-Through by Fall 2025",
          description:
            "Alberto Cavallo (Harvard) with Paola Llamas and Franco Vazquez matched daily prices from major US retailers to product-level tariff rates and countries of origin. Their November 2025 NBER working paper estimated retail tariff pass-through of 20%, a cumulative contribution of about 0.7 percentage points to the all-items CPI by September 2025; a January 2026 update with data through October 1, 2025 put pass-through at 24% and the CPI contribution at about 0.76 points. A March 2026 Federal Reserve FEDS Note, 'The Slow Climb,' independently found prices of goods imported from China up 8.5% year over year by December 2025, implying tariff pass-through to consumers of at least 30% for those goods.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "Cavallo, Llamas & Vazquez (NBER Working Paper 34496); Federal Reserve FEDS Notes ('The Slow Climb,' Mar 2026)",
          sourceUrl: "https://www.nber.org/papers/w34496",
          reasoning:
            "This is the empirical anchor of the inflation debate, using high-frequency retail scanner data matched to tariff schedules. The convergence with independent Federal Reserve estimates makes it highly replicable. It directly refutes the claim that foreign exporters bear the tariff, though the partial (not total) pass-through leaves room for the proponent reading.",
        },
        {
          id: "hbs-burden-split",
          title: "HBS Pricing Lab: Consumers Bore Up to 43%; New York Fed: Exporters' Share Rose to 14% by November 2025",
          description:
            "The Harvard Business School Pricing Lab's tariff tracker, updated with data through February 27, 2026, estimates that US consumers absorbed up to 43% of the tariff burden in the seven months after the sweeping 2025 tariffs, with US companies bearing the rest, and that retail prices leveled off after rising with each levy. Alberto Cavallo: 'Most of the pass-through has likely already occurred, assuming tariffs do not increase further.' Separately, the New York Fed estimated the share absorbed by foreign exporters at 6% in January-August 2025, 8% in September-October and 14% in November, concluding that 'a larger share of the tariff incidence was borne by foreign exporters by the end of the year,' though US firms and consumers still bore the bulk. Proponents read this as a shared, plateauing cost rather than an open-ended tax on households.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "Harvard Business School Working Knowledge (HBS Pricing Lab, Apr 27, 2026); New York Fed (Liberty Street Economics, Feb 12, 2026)",
          sourceUrl: "https://www.library.hbs.edu/working-knowledge/tariffs-leave-consumers-and-companies-splitting-the-tab",
          reasoning:
            "Proponents cite the partial consumer share and the exporters' rising share as evidence the burden is shared rather than landing wholly on households. Both sources are credible and independent, but the HBS split puts the non-consumer share on US companies, not foreigners, and the New York Fed's exporter share tops out near 14%, so the strong version of 'China pays' remains false even on this reading. Replicability is downgraded because the foreign-exporter share is the most contested component across studies.",
        },
        {
          id: "japan-car-export-price-cuts",
          title: "Dollar Unit Prices of Japanese Cars Shipped to the US Fell About 22% Year on Year (mid-2025)",
          description:
            "After the 25% US tariff on imported cars took effect in April 2025, the Japan Center for Economic Research traced Japan's customs data on exports to the United States. Export volume held up while the yen price per unit fell, a decline that began in March 2025 and widened in later months. Passenger cars, 24.3% of Japan's export value to the US in June 2025, showed the largest year-on-year fall in the exchange-rate-adjusted (dollar-terms) export unit price: 22.0% in the latest month of data. The Bank of Japan's fixed-basket export price index for cars sent to North America fell too, so the drop was not a shift toward cheaper models. JCER's Jun Saito concludes that 'exporting firms are absorbing the impact of higher tariff by reducing export unit price in yen-terms.' The US later cut the tariff on Japanese cars to 15% under the July 2025 agreement.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Jun Saito, 'Consequences of Trump Tariffs on the Japanese Economy,' Japan Center for Economic Research (15 Aug 2025), using Japan Ministry of Finance trade statistics and the Bank of Japan export price index",
          sourceUrl:
            "https://www.jcer.or.jp/english/consequences-of-trump-tariffs-on-the-japanese-economy",
          reasoning:
            "This is the clearest documented case of a foreign seller paying part of a 2025 tariff: an independent Japanese research institute, working from official customs and central-bank price data, finds car exporters cut their own prices to hold their US sales. It is one industry from one ally, measured in mid-2025 before that tariff was lowered, so it shows exporters can absorb part of a tariff where they have margin to spare, not that they did so across the board. Aggregate studies point the other way: a Richmond Fed working paper on 2025 customs data (Azzimonti and Titcomb, April 2026) finds 'negligible adjustment by foreign exporters' overall.",
        },
        {
          id: "fed-inflation-counterfactual",
          title: "Fed Economists: Tariffs Explain All Excess Core Goods Inflation Since 2025",
          description:
            "An April 8, 2026 FEDS Note by Federal Reserve Board economists Robert Minton, Madeleine Ray and Mariano Somale estimated that tariffs implemented through November 2025 raised core goods PCE prices by 3.1% through February 2026, 'explaining the entirety of excess inflation in the core goods category relative to pre-pandemic inflation rates and contributing to a 0.8 percent boost in core PCE prices as a whole.' The authors found pass-through slower and lower than in 2018-19 but largely complete, and note that a smaller alternative specification would leave room for other causes. The CBO, in a June 2025 projection of the tariffs imposed through May 13, 2025, estimated they would raise inflation by roughly 0.4 percentage points a year over 2025 and 2026, leaving the PCE price level 0.9% higher by 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "Federal Reserve FEDS Notes ('Detecting Tariff Effects on Consumer Prices in Real Time – Part II,' Apr 8, 2026); CBO, 'Budgetary and Economic Effects of Increases in Tariffs Implemented Between January 6 and May 13, 2025' (Publication 61389, Jun 4, 2025)",
          sourceUrl: "https://www.federalreserve.gov/econres/notes/feds-notes/detecting-tariff-effects-on-consumer-prices-in-real-time-part-II-20260408.html",
          reasoning:
            "The Federal Reserve and CBO are authoritative, independent institutions with no stake in the trade debate. Their convergent estimates make this strong evidence that tariffs raised consumer prices. Attributing all excess core goods inflation to tariffs is a model-based inference rather than a direct measurement, and the CBO figure is a 2025 projection, but both point the same way as the real-time pass-through studies.",
        },
        {
          id: "yale-household-incidence",
          title: "Yale Budget Lab: Tariffs Cost About $1,100 per Household a Year, Hitting the Poorest Hardest",
          description:
            "The Yale Budget Lab's April 2, 2026 report projected an average household loss of about $650-$780 a year if the Section 122 tariffs expired on schedule and $1,130-$1,340 if they were made permanent, with the bottom income decile's burden, as a share of income, about three times the top decile's. Section 122 did lapse on July 24, 2026, but it was replaced the same day by new Section 301 tariffs, and the Budget Lab's August 24, 2026 update puts household costs under current law at about $1,100 a year. The Tax Foundation estimates tariffs raised taxes by an average of $1,000 per household in 2025 and will raise them by about $820 in 2026, and PIIE's Kimberly Clausing and Mary Lovely estimated in February 2025 that the tariffs then announced on Canada, Mexico and China alone would cost the typical household more than $1,200 a year.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Yale Budget Lab (State of U.S. Tariffs, Apr 2 and Aug 24, 2026); Tax Foundation Tariff Tracker; PIIE (Clausing & Lovely, Feb 2025)",
          sourceUrl: "https://budgetlab.yale.edu/research/state-us-tariffs",
          reasoning:
            "Three independent modeling shops (Yale, PIIE, Tax Foundation) land in the same general range, from several hundred dollars to about $1,300 a year depending on which tariffs each modeled, strengthening confidence in the household cost. The regressive distribution directly challenges the working-class rationale for the policy, though tariff-funded tax cuts could in principle offset the net incidence.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Manufacturing Employment & Reshoring
    // =========================================================================
    {
      id: "manufacturing-reshoring",
      title: "Are Factory Jobs Coming Back?",
      short_summary:
        "Reviving manufacturing is the tariffs' central promise. Factory payrolls fell by about 93,000 during 2025 and have regained about 72,000 since, leaving them slightly below January 2025. Critics say tariffs on steel and parts cost as many jobs downstream as they save; supporters say new plants show up in investment years before they show up in payrolls.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The promised reshoring boom has not arrived in the data. The 2023 USITC Section 232/301 study found that steel and aluminum tariffs created modest jobs in protected sectors but destroyed roughly equivalent or greater jobs in steel- and aluminum-using industries downstream. CRS reports consistently find Section 232 effects net-negative for total manufacturing employment. The Yale Budget Lab's April 2026 modeling has long-run manufacturing output up only 0.7%, gains it says are more than crowded out by losses elsewhere (construction down 2.0%, mining down 0.8%), with GDP persistently smaller and unemployment about 0.1 percentage point higher by the end of 2026. 'Liberation Day' tariffs were supposed to revive manufacturing; so far they have not.",
      proponent_rebuttal:
        "Headcount in BLS payrolls is the wrong metric and the wrong timeframe. The reshoring response shows up first in capital expenditure commitments and greenfield-plant announcements — capital-intensive semiconductor fabs, aerospace, and metals capacity — that take years to convert into payroll. American Compass's 'Tariff Tally' documents a stealth manufacturing buildout in capex and investment announcements that lagging payroll data cannot yet capture. The relevant question is not aggregate headcount but the rebuilding of strategic industrial capacity and the reversal of three decades of working-class wage stagnation, which requires patient measurement over a decade, not seven months.",
      crux: {
        id: "manufacturing-net-employment",
        title: "The Net Manufacturing Employment Test",
        question:
          "Do tariffs create more manufacturing jobs than they cost through higher input prices and retaliation?",
        description:
          "Tariffs protect jobs in upstream sectors (steel, aluminum) but raise input costs for the far larger set of downstream manufacturers that use those inputs. The decisive question is whether tariffs create more domestic manufacturing jobs than they destroy once you count (a) downstream input-cost job losses, (b) jobs lost to retaliation against US exporters, and (c) capital reallocation costs.",
        methodology:
          "Replicate the USITC Publication 5405 input-output methodology on the 2025-2026 tariff vector: estimate employment gains in protected sectors against losses in input-using industries, layer in export-sector losses from documented retaliation (EU, Canada, China), and reconcile BLS payroll series against announced-capex and greenfield-investment databases to test whether a lagging-but-real reshoring signal exists outside current headcount.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "The USITC Publication 5405 input-output method rerun on the 2025-2026 tariffs, netting jobs in protected sectors against losses in input-using and export industries, with BLS payrolls checked against announced capex and greenfield plants.",
        },
        cost_to_verify:
          "$1-3M (Comprehensive input-output employment modeling plus investment-announcement tracking and validation against BLS microdata)",
        falsification: {
          supporter_flip:
            "If replicating the USITC input-output method on the 2025-2026 tariffs again showed downstream and export-sector job losses matching or exceeding gains in protected sectors, and announced capex failed to turn into payroll over the years supporters say it needs, the reshoring case would weaken.",
          skeptic_flip:
            "If capital-expenditure commitments and greenfield plants, from semiconductor fabs to aerospace and metals capacity, turned into payroll over the coming years without offsetting downstream losses, flat payrolls would look like a lag rather than a sign reshoring is not happening.",
          common_ground:
            "Both sides agree BLS payroll data do not yet show a manufacturing jobs boom, and that the capacity tariffs may attract — semiconductor fabs, aerospace, metals — is capital-intensive.",
          live_disagreement:
            "Whether net manufacturing employment rises once downstream input costs and retaliation are counted, and whether headcount over months or strategic capacity over a decade is the right measure.",
        },
      },
      evidence: [
        {
          id: "bls-manufacturing-jobs-2026",
          title: "BLS: Factory Payrolls Fell About 93,000 in 2025, Then Regained 72,000 by September 2026",
          description:
            "Bureau of Labor Statistics payroll data put US manufacturing employment at 12.673 million in January 2025, 12.662 million in April 2025, when the 'Liberation Day' tariffs were announced, and 12.580 million in December 2025, a fall of about 93,000 over the year. It then rose in each month from June to September 2026, reaching 12.652 million, about 72,000 above December but still about 21,000 below January 2025 (seasonally adjusted).",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 6,
          },
          source: "US Bureau of Labor Statistics, Current Employment Statistics, All Employees: Manufacturing (MANEMP), via FRED, September 2026",
          sourceUrl: "https://fred.stlouisfed.org/series/MANEMP",
          reasoning:
            "The official headcount, and so far it shows no boom: factory jobs are slightly below where they were before the tariffs. It cannot separate the tariffs from interest rates, the business cycle or automation, and the rise since spring 2026 is what supporters expect if new plants are starting to hire, so directness is moderate.",
        },
        {
          id: "usitc-downstream-losses",
          title: "USITC: Section 232/301 Tariffs Net-Negative for Manufacturing Jobs",
          description:
            "The 2023 USITC Publication 5405 study of Section 232 and 301 tariffs found that steel and aluminum tariffs created modest employment gains in the protected metals sectors but destroyed roughly equivalent or greater employment in the much larger set of industries that consume steel and aluminum as inputs. CRS reports analyzing the same tariffs consistently find net-negative effects on total manufacturing employment.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "USITC Publication 5405; Congressional Research Service",
          sourceUrl: "https://www.usitc.gov/publications/332/pub5405.pdf",
          reasoning:
            "The USITC is a non-partisan, independent federal agency, and its input-output methodology is the standard for tariff employment analysis. The finding directly addresses the core reshoring claim and is corroborated by independent CRS analysis, making it strong evidence against the employment rationale.",
        },
        {
          id: "yale-employment-projection",
          title: "Yale Budget Lab: Manufacturing Gains Crowded Out Elsewhere",
          description:
            "The Yale Budget Lab's April 2, 2026 report found that in the long run 'tariffs present a trade-off': US manufacturing output expands by 0.7%, led by durable goods, 'but these gains are more than crowded out by other sectors,' with construction output down 2.0% and mining down 0.8%. It estimated the economy persistently 0.10-0.16% smaller in the long run and the unemployment rate 0.12-0.16 percentage point higher at the end of 2026, depending on whether the Section 122 tariffs lapsed or were extended.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Yale Budget Lab (State of U.S. Tariffs: April 2, 2026)",
          sourceUrl: "https://budgetlab.yale.edu/sites/default/files/page_to_pdf/1425/publication_1425.pdf",
          reasoning:
            "The Yale Budget Lab is a credible, independent fiscal-modeling shop. Its finding that manufacturing gains are small and outweighed by losses in other sectors cuts against the claim that tariffs help workers overall, though it concedes some manufacturing expansion and is a model-based forecast rather than realized data, leaving room for the proponent argument that effects are lagged.",
        },
        {
          id: "american-compass-stealth-boom",
          title: "American Compass: 'Stealth Manufacturing Boom' in Capex and Announcements",
          description:
            "American Compass's 'Tariff Tally' series argues that the reshoring response is visible in capital expenditure and greenfield-investment announcements — capital-intensive semiconductor, aerospace, and metals capacity — rather than in BLS payroll headcount, which lags plant construction by years. Oren Cass advocates a 10% across-the-board tariff escalating 5% per year until trade deficits zero out, paired with a national development bank, framing short-term consumer pain against the externalities of deindustrialization.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "American Compass (Oren Cass); Tariff Tally series",
          sourceUrl: "https://americancompass.org/should-the-u-s-adopt-an-industrial-policy/",
          reasoning:
            "American Compass is the most articulate institutional voice for the tariff-hawk position, and the capex-vs-payroll timing argument is a legitimate methodological critique of relying on lagging headcount data. However, the source is an advocacy organization (lower independence), and announced investment is not yet realized employment, so the 'stealth boom' remains a contested interpretation.",
        },
        {
          id: "manufacturing-composition-fallacy",
          title: "Manufacturing Is Heterogeneous: What's 'Coming Back' Isn't What Left",
          description:
            "Analysts note that treating 'manufacturing' as a single bloc conceals a composition problem: the capital-intensive capacity that tariffs may attract (semiconductor fabs, aerospace) is not the labor-intensive capacity that left (textiles, light assembly). Aggregate headcount obscures the wage-distribution and community-level effects that the working-class rationale actually depends on, making both 'jobs gone forever' and 'jobs coming back' overstated.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Yale Budget Lab; PIIE; academic trade-employment literature",
          sourceUrl: "https://www.piie.com/blogs/realtime-economics/2026/whats-next-trumps-tariffs",
          reasoning:
            "The composition point is a structural critique grounded in the heterogeneity of manufacturing sectors. It weakens the simple reshoring narrative by showing that even successful capital attraction may not restore the specific labor-intensive jobs and communities the policy invokes, though it does not refute that strategic capacity can be rebuilt.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Strategic Decoupling from China
    // =========================================================================
    {
      id: "strategic-decoupling",
      title: "Do Tariffs Help Contain China?",
      short_summary:
        "A national-security rationale for tariffs is reducing dependence on China and slowing its technology acquisition. The conditionalist 'small yard, high fence' school argues targeted export controls work while broad tariffs backfire by fracturing the allied coalition and accelerating China's import-substitution drive.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Broad tariffs are the wrong tool for the real national-security problem. Chris Miller and the 'Chip War' school argue that targeted export controls on dual-use technology — advanced semiconductors, EUV lithography, AI accelerators — are specific, effective, and multilateralizable, whereas sweeping reciprocal tariffs are a 'scattered fence, no yard' that hits allies and gives Beijing license to retaliate symmetrically. Tariffs accelerate China's 'Made in China 2025' import-substitution and indigenous-innovation drive; Beijing now mirrors the US with its own 'small yard, high fence,' a sign the broad tariff regime accelerated the very decoupling-against-the-US it meant to manage.",
      proponent_rebuttal:
        "Export controls alone are insufficient; tariffs add economic friction that compounds the cost of strategic dependence. Even if China indigenizes faster under pressure, it still indigenizes more slowly than it would in the absence of pressure — and the years of delay bought matter enormously for the Taiwan, AI, and military balance. Layered tariffs on China (25% on most goods on the 2018-19 Section 301 lists, 50% on semiconductors, 100% on EVs), which survived the Supreme Court's IEEPA ruling, raise the cost of Chinese market access and incentivize 'friend-shoring' to allied and domestic suppliers. The November 2025 truce holding rates at 10%-on-10% shows tariffs created leverage that produced a negotiated, monitored equilibrium rather than uncontrolled escalation.",
      crux: {
        id: "decoupling-tool-effectiveness",
        title: "The Decoupling Instrument Test",
        question:
          "Do broad tariffs slow China's technology gains more than they speed its self-sufficiency push?",
        description:
          "The decisive question is whether broad tariffs slow Chinese technology acquisition more than they accelerate Beijing's import-substitution. If targeted export controls slow critical-technology transfer while broad tariffs mainly trigger symmetric retaliation and faster indigenization, the broad-tariff instrument is counterproductive on its own national-security terms.",
        methodology:
          "Compare the trajectory of Chinese capability in controlled technologies (advanced-node semiconductors, EUV, AI accelerators) under targeted export controls against the trajectory of broadly tariffed sectors, measuring indigenization rates, import-substitution announcements, and retaliation symmetry. Use SIA/SEMI supply-chain data, Chinese 'Made in China 2025' progress reports, and trade-flow reorientation statistics to isolate the effect of broad tariffs from the effect of targeted controls.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Chinese capability in export-controlled technologies (advanced-node chips, EUV, AI accelerators) compared with broadly tariffed sectors, on indigenization rates, import-substitution announcements and retaliation, using SIA and SEMI supply-chain data.",
        },
        cost_to_verify:
          "$2-5M (Multi-year supply-chain and capability tracking across semiconductor, AI-hardware, and rare-earth sectors with classified and open-source fusion)",
        falsification: {
          supporter_flip:
            "If comparing controlled and broadly tariffed sectors showed that targeted export controls did the work of slowing Chinese technology gains while broad tariffs mainly drew symmetric retaliation and faster indigenization, the broad-tariff instrument would be counterproductive on its own national-security terms.",
          skeptic_flip:
            "If layered duties on China (25% on most of the 2018-19 Section 301 lists, 50% on semiconductors, 100% on EVs) measurably pushed supply toward allies, and bilateral rates held near the November 2025 truce's 10% rather than escalating, broad tariffs would look like a useful complement to export controls.",
          common_ground:
            "Both sides agree export controls on dual-use technology such as advanced semiconductors belong in the toolkit, and that China is working to indigenize that technology.",
          live_disagreement:
            "Whether broad tariffs on top of export controls buy years of delay in China's technology gains, or mainly fracture the allied coalition and speed Beijing's import-substitution drive.",
        },
      },
      evidence: [
        {
          id: "china-effective-rate",
          title: "Penn Wharton: China's Effective US Tariff Rate Fell From 31.6% to 22.8% but Is Still the Highest",
          description:
            "Penn Wharton Budget Model, measuring duties collected as a share of imports, put the effective US tariff rate on Chinese goods at 31.6% in February 2026, the highest of any major trading partner. After the Supreme Court struck down the IEEPA tariffs that month, the rate fell, but at 22.8% in July 2026 China still faced the highest rate. What survived rests on statutes the ruling did not touch: the Section 301 duties of 2018-19 (25% on Lists 1-3, 7.5% on List 4A), raised after the 2024 four-year review to 100% on Chinese EVs and 50% on semiconductors from 2025; Section 232 sectoral tariffs; and, since July 24, 2026, a new 12.5% Section 301 tariff that also applies to China.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Penn Wharton Budget Model (Effective Tariff Rates and Revenues, Apr 15 and Sep 9, 2026); USTR Section 301 four-year review (2024); Reed Smith Trump 2.0 tariff tracker",
          sourceUrl: "https://budgetmodel.wharton.upenn.edu/p/2026-09-09-effective-tariff-rates-and-revenues-updated-september-9-2026/",
          reasoning:
            "Penn Wharton's effective-rate calculations are rigorous and replicable. The high, legally durable China-specific rate is what proponents cite as the real mechanism for raising the cost of strategic dependence, though the rate has fallen since February 2026, and the rate alone does not establish whether it slows or accelerates Chinese indigenization.",
        },
        {
          id: "miller-scattered-fence",
          title: "Chris Miller: Broad Tariffs Are 'Scattered Fence, No Yard'",
          description:
            "Chris Miller, author of 'Chip War,' and the national-security conditionalist school argue that targeted export controls on dual-use technology work, while broad reciprocal tariffs that hit allies are strategically self-defeating because they fracture the coalition needed to actually contain China. Miller critiqued the 2025 tariff sprawl as a 'scattered fence, no yard' — the inverse of the disciplined 'small yard, high fence' strategy export controls were designed around.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Chris Miller (Chip War); Carnegie Mellon CMIST; Asia Society",
          sourceUrl: "https://www.cmu.edu/cmist/news-archive/news/2026/march/chips-and-chokepoints-chris-miller-on-the-geopolitics-of-the-ai-supply-chain.html",
          reasoning:
            "Miller is a leading authority on semiconductor geopolitics, and the targeted-vs-broad distinction is the crux of the decoupling debate. The critique directly challenges the instrument choice — arguing that broad tariffs undermine the allied coalition export controls depend on — though it is an expert analytical judgment rather than a quantified outcome.",
        },
        {
          id: "beijing-mirror-strategy",
          title: "Beijing Builds Its Own 'Small Yard, High Fence' in Response",
          description:
            "In response to US tariffs and controls, Beijing has constructed its own 'small yard, high fence' regime to shut out US technology, accelerating the indigenous-innovation drive at the heart of 'Made in China 2025.' Conditionalist analysts read this mirroring as evidence that the broad tariff regime accelerated the very decoupling-against-the-US it nominally tried to manage, hardening rather than slowing China's import-substitution trajectory.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "South China Morning Post; Asia Society Center for China Analysis",
          sourceUrl: "https://www.scmp.com/tech/big-tech/article/3340168/fighting-back-beijing-builds-its-own-small-yard-high-fence-shut-out-us-tech",
          reasoning:
            "Beijing's mirroring strategy is documented and directly relevant to whether tariffs accelerate or slow Chinese indigenization. It supports the skeptic reading, but proponents counter that indigenization-under-pressure is still slower than the unconstrained counterfactual, so the evidence is interpretively contested.",
        },
        {
          id: "us-china-truce",
          title: "November 2025 US-China Truce Held Rates at 10%-on-10%",
          description:
            "In November 2025, Trump and Xi extended the May 2025 90-day truce for a full year through 10 November 2026, the date it is now due to expire, holding bilateral reciprocal tariffs at 10% (down from peaks above 125%) and extending exclusions on 178 categories of Chinese goods, mostly medical and solar-manufacturing equipment. Proponents argue this shows tariff leverage produced a negotiated, monitored equilibrium rather than uncontrolled escalation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Council on Foreign Relations",
          sourceUrl: "https://www.cfr.org/articles/how-the-supreme-court-tariff-decision-could-affect-trumps-china-negotiations",
          reasoning:
            "The truce is a verifiable diplomatic fact that proponents cite as evidence tariffs created negotiating leverage. However, that the bilateral rate settled at a symmetric 10%-on-10% — far below peak — can also be read as a retreat from the maximalist tariff position, making the 'leverage worked' inference contestable.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Trade Deficit Logic & Alliance Effects
    // =========================================================================
    {
      id: "trade-deficit-alliances",
      title: "Can Tariffs Fix the Trade Deficit, and at What Cost to Allies?",
      short_summary:
        "Trump frames the trade deficit as proof America is 'being ripped off' and tariffs as the remedy. Economists counter that bilateral deficits reflect savings-investment imbalances, not unfair trade, and that tariff friction with allies imposes geopolitical costs — lost cooperation on China, defense burden-sharing, and dollar centrality.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The trade-deficit rationale rests on an accounting error. Bilateral trade deficits reflect macroeconomic savings-investment imbalances and the dollar's reserve-currency status, not unfair foreign practices, so tariffs cannot durably close them — they merely reshuffle which countries run the surplus. 'We're being ripped off' is never operationally defined (deficit? IP theft? subsidies? non-tariff barriers?), letting the same rhetoric justify whichever instrument the speaker prefers. Meanwhile, tariff friction with allies — the EU's €26 billion countermeasures, Canada's retained auto and metals retaliation and its 2026 counter-tariffs, a high-stakes USMCA renegotiation — imposes real costs on the coalition the US needs to contain China.",
      proponent_rebuttal:
        "Persistent deficits are not benign accounting; they reflect structural offshoring of productive capacity and the hollowing-out of communities, externalities that orthodox trade models systematically under-price. Tariffs are a credible threat that extracted real concessions — about 20 partners, from the EU, Japan and South Korea to Indonesia, Argentina and Taiwan, announced reciprocal trade agreements or frameworks, and allies made commitments on LNG offtake and defense spending. Europe was free-riding on US security anyway, and 'alliance damage' is a vapor metric that has not produced the predicted collapse: the EU suspended its countermeasures after a framework agreement, and most allies negotiated rather than retaliated. Even after refunds of the struck-down IEEPA duties, customs receipts netted about $173 billion in FY2026, revenue that funds domestic priorities.",
      crux: {
        id: "deficit-causation-and-alliance-cost",
        title: "The Deficit-Causation and Alliance-Cost Test",
        question:
          "Can tariffs fix trade deficits, and are their gains worth the friction with allies?",
        description:
          "Two linked questions decide this section. First, are bilateral trade deficits caused by unfair foreign practices (addressable by tariffs) or by macroeconomic savings-investment imbalances (not addressable by tariffs)? Second, does the geopolitical cost of tariff friction with allies — lost China-policy cooperation, weakened burden-sharing, eroded dollar trust — exceed the concessions tariffs extract?",
        methodology:
          "Test deficit causation by examining whether the aggregate US trade deficit narrows under tariffs or merely shifts bilaterally to other surplus countries, controlling for the national savings rate and fiscal deficit. Assess alliance cost by auditing documented concessions (trade deals signed, LNG and defense commitments) against documented retaliation and cooperation losses (EU/Canada countermeasures, USMCA renegotiation stakes, allied alignment on China export controls).",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "The aggregate US trade deficit under tariffs, controlling for national savings and the fiscal deficit, to see if it narrows or just moves to other surplus countries, and an audit of deals signed against retaliation and lost cooperation with allies. Weighing the two is a value call.",
        },
        cost_to_verify:
          "$500K-1M (Macroeconomic deficit decomposition plus structured diplomatic cost-benefit audit across major allies)",
        falsification: {
          supporter_flip:
            "If the aggregate US trade deficit stayed flat under tariffs and merely shifted to other surplus countries, and the documented costs of retaliation and lost cooperation with allies outweighed the deals signed, both halves of the trade-deficit rationale would weaken.",
          skeptic_flip:
            "If tariff threats kept producing reciprocal deals like those announced with the EU, Japan, South Korea, Indonesia, Argentina and Taiwan, and allies such as the EU kept suspending countermeasures rather than escalating, the deficit rationale would look like more than an accounting error.",
          common_ground:
            "Both sides accept that about 20 partners announced reciprocal trade agreements or frameworks while the IEEPA tariffs were in force, and that allies also retaliated: the EU imposed €26 billion of countermeasures before suspending them under a framework agreement.",
          live_disagreement:
            "Whether bilateral deficits come from unfair foreign practices tariffs can fix or from a savings-investment gap they cannot, and whether the concessions extracted outweigh the cost of friction with the allies needed to contain China.",
        },
      },
      evidence: [
        {
          id: "savings-investment-identity",
          title: "Bilateral Deficits Reflect Savings-Investment Imbalances, Not Unfair Trade",
          description:
            "Orthodox trade economists (PIIE, Krugman, Mankiw) argue the trade deficit is determined by the national savings-investment gap and the dollar's reserve-currency role, meaning tariffs cannot durably close it — they reshuffle which countries run surpluses. The 2018 round of Trump tariffs is the natural test case: the aggregate US trade deficit did not shrink and in fact widened alongside the savings-investment gap, with the China bilateral deficit largely reallocating to Vietnam, Mexico, and other partners rather than disappearing. Krugman has called the 2025 tariff structure 'the second coming of Smoot-Hawley,' while critics note the analogy is overdrawn given an average statutory US tariff rate of about 11% in August 2026 (Yale Budget Lab), or 6.7% in duties collected as a share of imports in July 2026 (Penn Wharton), versus Smoot-Hawley's ~59% on dutiable imports.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "PIIE; Paul Krugman (Substack); Greg Mankiw",
          sourceUrl: "https://www.piie.com/blogs/realtime-economics/2026/whats-next-trumps-tariffs",
          reasoning:
            "The savings-investment identity is mainstream macroeconomic consensus, giving it high reliability. It directly challenges the core deficit rationale for tariffs. The accompanying 'Smoot-Hawley 2.0' framing is rhetorically overdrawn (the rate gap is large), which is itself surfaced here to keep the evidence balanced.",
        },
        {
          id: "scotus-ieepa-ruling",
          title: "Supreme Court Struck Down the IEEPA Tariffs 6-3 (February 2026); Their Replacements Are Now in Court",
          description:
            "On February 20, 2026, the Supreme Court ruled 6-3 in Learning Resources, Inc. v. Trump that the International Emergency Economic Powers Act does not authorize the president to impose tariffs, and customs stopped collecting the IEEPA-based 'reciprocal' and trafficking tariffs on February 24. Trump replaced them with a 10% global Section 122 balance-of-payments tariff, which the statute caps at 150 days; in May the Court of International Trade also declared that proclamation unlawful, and the government appealed. When Section 122 expired on July 24, 2026, USTR replaced it the same day with new Section 301 'forced labor' tariffs of 10% or 12.5% on imports from 60 economies, which court briefs say send 99.4% of US imports. Small businesses and Democratic-led states challenged those too; at the Court of International Trade's hearing on September 30, 2026, Judge Timothy Reif repeatedly asked which part of the law gave USTR its authority and Judge Jennifer Choe-Groves said there was 'not a lot of depth' in the forced-labor evidence. The court set no date for a ruling. As the struck-down IEEPA duties were refunded, customs refunds reached about $145 billion in FY2026 (against $7.5 billion the year before), leaving net customs receipts of about $173 billion out of $318 billion collected.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source: "SCOTUSblog; Reed Smith Trump 2.0 tariff tracker; Penn Wharton Budget Model (Sep 9, 2026); Yale Budget Lab (Jul 24, 2026); US Treasury Monthly Treasury Statement (Sep 2026); Bloomberg News (Zoe Tillman, Oct 1, 2026, via ttnews.com) on the Section 301 hearing",
          sourceUrl: "https://www.scotusblog.com/2026/02/a-breakdown-of-the-courts-tariff-decision/",
          reasoning:
            "A 6-3 Supreme Court ruling is an authoritative, independent legal judgment. It undermines the durability of the broad reciprocal-tariff approach by holding its primary legal basis invalid, forcing a retreat first to a time-limited authority and then to Section 301. This challenges the policy's legal foundation, though Section 232 and 301 tariffs survived and the administration has rebuilt a broad tariff on them, which proponents read as evidence the policy outlasted the ruling.",
        },
        {
          id: "bilateral-deals-signed",
          title: "About 20 Partners, From the EU to Taiwan, Struck Reciprocal Deals or Frameworks",
          description:
            "While the IEEPA reciprocal tariffs were in effect, the administration announced agreements or frameworks for reciprocal trade with about 20 partners, including the EU, Japan, the UK, South Korea, Switzerland, India and Vietnam; full agreement texts were released with Cambodia and Malaysia (October 2025) and with El Salvador, Guatemala, Argentina, Bangladesh, Taiwan and Indonesia (January-February 2026). The deals outlasted the Supreme Court ruling in part: the Section 301 tariffs that replaced Section 122 in July 2026 exempt certain goods from 13 partners, nearly all of them deal partners, and cap the combined rate for the EU, Japan, South Korea and Switzerland. Proponents argue this shows the credible threat of tariffs extracted real concessions and that most trading partners chose to negotiate rather than retaliate.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Reed Smith, Trump 2.0 tariff tracker (Trade Compliance Resource Hub, updated Sep 10, 2026)",
          sourceUrl: "https://www.tradecomplianceresourcehub.com/2026/04/19/trump-2-0-tariff-tracker/",
          reasoning:
            "The announced deals are verifiable and support the leverage argument, and they include large economies, not just small ones. However, many are frameworks rather than finished agreements, their terms were negotiated under tariffs the Supreme Court later held unlawful, and the partners with the most leverage (the EU, Canada, China) also retaliated, consistent with the conditional framing that allies with leverage both bargain and hit back.",
        },
        {
          id: "china-goods-deficit-fell-2025",
          title: "The US Goods Deficit With China Fell by About a Third in 2025",
          description:
            "Census Bureau trade data put the US goods deficit with China at $202.7 billion in 2025, down from $297.0 billion in 2024 and $418.2 billion in 2018; US imports from China fell from $440.3 billion to $308.7 billion in a year. The gap stayed narrower in 2026, at $109.6 billion for January through August. The aggregate picture did not move the same way: the total US deficit in goods and services was $901.5 billion in 2025 against $903.5 billion in 2024, and the goods deficit alone widened to a record $1.24 trillion. Proponents read the China figures as the tariffs cutting dependence on the main strategic rival; critics read the flat total as the same deficit moving to other countries.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 4,
          },
          source:
            "US Census Bureau, 'Trade in Goods with China' (annual and 2026 monthly balances) and 'U.S. Trade in Goods and Services, Balance of Payments Basis, 1960 through 2025'",
          sourceUrl: "https://www.census.gov/foreign-trade/balance/c5700.html",
          reasoning:
            "Official trade statistics, so the numbers themselves are not in dispute. The bilateral cut is large and real, and it is the outcome the policy's China rationale aims at. Directness on this crux is low, though: the crux asks whether tariffs can fix the trade deficit, and the total barely moved while the goods deficit set a record, which is what the savings-investment account predicts. The China figures support the narrower claim that tariffs shift where Americans buy, not the broader one that they close the gap.",
        },
        {
          id: "ally-retaliation-costs",
          title: "The EU and Canada Retaliated, and the US Declined to Renew the USMCA (July 2026)",
          description:
            "The EU reimposed €26 billion ($28B) of countermeasures on US goods (steel, aluminum, appliances, bourbon, motorcycles) before suspending them under a politically fragile framework agreement. Canada terminated IEEPA-related retaliation in September 2025 but kept retaliation on US autos and roughly C$15.6 billion of US steel and aluminum. The dispute escalated in 2026: the US imposed 50% Section 338 tariffs on certain Canadian motor vehicles, alcohol and dairy products from August 22, and Canada answered with counter-tariffs on $27.6 billion of US products from September 8. At the first USMCA joint review on July 1, 2026, the United States declined to renew the agreement in its current form, so it stays in force but now goes through annual joint reviews until the parties agree to renew it or it expires in 2036. Adam Tooze frames US strength as 'sustained by elevated asset prices and dollar centrality rather than a strategically coordinated state.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "European Commission; CSIS; Brookings; Congressional Research Service (R48787, Sept 2026); Reed Smith Trump 2.0 tariff tracker (Section 338, Sept 2026); Adam Tooze (Chartbook)",
          sourceUrl: "https://www.csis.org/analysis/usmca-review-2026",
          reasoning:
            "The retaliation figures and USMCA stakes are documented by official and institutional sources. They demonstrate concrete economic and diplomatic costs of tariff friction with major allies, supporting the alliance-damage critique, though proponents argue these costs are outweighed by extracted concessions and that some retaliation was climbed down.",
        },
      ],
    },
  ],
  references: [
    {
      title: "A Breakdown of the Court's Tariff Decision - SCOTUSblog",
      url: "https://www.scotusblog.com/2026/02/a-breakdown-of-the-courts-tariff-decision/",
    },
    {
      title: "Tracking the Short-Run Price Impact of U.S. Tariffs - Cavallo, Llamas & Vazquez (NBER Working Paper 34496)",
      url: "https://www.nber.org/papers/w34496",
    },
    {
      title: "The State of U.S. Tariffs - Yale Budget Lab",
      url: "https://budgetlab.yale.edu/research/state-us-tariffs",
    },
    {
      title: "Economic Impact of Section 232 and 301 Tariffs on US Industries - USITC Publication 5405",
      url: "https://www.usitc.gov/publications/332/pub5405.pdf",
    },
    {
      title: "Effective Tariff Rates and Revenues, Updated April 15, 2026 - Penn Wharton Budget Model",
      url: "https://budgetmodel.wharton.upenn.edu/p/2026-04-15-effective-tariff-rates-and-revenues-updated-april-15-2026/",
    },
    {
      title: "All Employees, Manufacturing (MANEMP) - US Bureau of Labor Statistics via FRED",
      url: "https://fred.stlouisfed.org/series/MANEMP",
    },
    {
      title: "Trump forced-labor tariffs face skeptical trade court - Bloomberg News via ttnews.com (1 October 2026)",
      url: "https://www.ttnews.com/articles/trump-forced-labor-tariffs",
    },
    {
      title: "What's Next for Trump's Tariffs - Peterson Institute for International Economics",
      url: "https://www.piie.com/blogs/realtime-economics/2026/whats-next-trumps-tariffs",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Who actually pays Trump's tariffs?",
      content:
        "Trump claimed foreign exporters would pay, but the New York Fed estimates ~90% of the 2025 burden fell on US firms and consumers (only ~6-14% on foreign exporters); Cavallo finds short-run retail pass-through rising from 20% to 24% through fall 2025, HBS puts the consumer share at up to 43%, and Federal Reserve Board economists estimate tariffs raised core goods prices by about 3.1%. The strongest version of 'China pays' — that some burden falls on exporters — is true but small; the campaign-rally version is a category error. Does the partial pass-through vindicate the policy as cost-shifting, or refute it as a domestic consumption tax?",
    },
    {
      id: "q2",
      title: "Have tariffs revived American manufacturing?",
      content:
        "Factory payrolls fell by about 93,000 in 2025 and regained about 72,000 by September 2026, leaving them just below January 2025. The USITC found the 2018 metal tariffs cost about as many jobs downstream as they saved, and the Yale Budget Lab projects small manufacturing gains crowded out elsewhere, while American Compass points to investment announcements as a 'stealth boom' that payrolls have not caught yet. Is the reshoring real but slow, or not happening?",
    },
    {
      id: "q3",
      title: "Do broad tariffs help or hurt the effort to contain China?",
      content:
        "The 'Chip War' school argues targeted export controls slow Chinese technology acquisition while broad tariffs fracture the allied coalition and accelerate Beijing's import-substitution drive. Hawks counter that indigenization-under-pressure is still slower than the unconstrained counterfactual, and the years bought matter for the Taiwan and AI balance. Is the broad tariff a strategic asset or a self-inflicted wound on US-China policy?",
    },
  ],
};
