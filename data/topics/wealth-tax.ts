export const wealthTaxData = {
  id: "wealth-tax",
  title: "Would a Billionaire Wealth Tax Work?",
  question:
    "Would a billionaire wealth tax raise real money, or drive the rich away?",
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "Would an annual wealth tax on billionaires be effective and reduce inequality?",
    "Should California pass Prop 40, the billionaire tax?",
    "Did wealth taxes fail in Europe?",
    "Is the Zucman tax a good idea?",
  ],
  meta_claim:
    "A tax on the net worth of billionaires would raise substantial revenue without driving away enough of the tax base, or doing enough economic harm, to defeat its purpose.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: California votes today on Proposition 40, a
  // one-time 5% tax on billionaires resident on 1 January 2026; Props 41 and
  // 42 could cancel it. Warren, Jayapal and Boyle reintroduced a federal
  // annual wealth tax in March 2026. France's National Assembly rejected the
  // 2% "Zucman tax" again in October 2026, in the 2027 budget debate.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "On 3 November 2026 Californians vote on Proposition 40, a one-time tax of 5% of the net worth of every billionaire who lived in the state on 1 January 2026. The state's nonpartisan Legislative Analyst expects it to raise tens of billions of dollars. Before that date Larry Page, Sergey Brin and Peter Thiel moved to Miami. The fight is over whether a tax on great fortunes collects real money or mostly sends the fortunes elsewhere.",
    confidence: 88,
    source:
      "California Legislative Analyst's Office, analysis of Proposition 40 (November 2026 ballot); Fortune (Jacqueline Munis, 17 March 2026)",
    sourceUrl: "https://lao.ca.gov/ballot/2026/prop40-110326.pdf",
  },
  simple_case: [
    "The answer bears on whether California's health programs get a one-time windfall, on the federal wealth tax Democrats reintroduced in March 2026, and on whether France and Norway keep taxing their richest families or ease off.",
    "Under all of it sits a gap both sides can see: from 2014 to 2018 the 25 richest Americans' wealth grew by $401 billion while they paid $13.6 billion in federal income tax, because gains on shares are taxed only when sold.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Would it raise real money? (what Europe's record shows)
    // =========================================================================
    {
      id: "revenue-potential",
      title: "Would It Raise Real Money?",
      short_summary:
        "Backers of the federal bill put its yield at $6.2 trillion over ten years. Europe's record is the test case: 12 OECD countries taxed net wealth in 1990 and 4 did by 2017. Switzerland's tax still raises over 1% of GDP; Spain's raises about 0.2%. The dispute is whether Europe's taxes raised little because of how they were built, or because wealth shrinks on paper when it is taxed.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Wealth taxes look large on paper and shrink in practice. The OECD counted 12 of its countries with a net wealth tax in 1990 and 4 by 2017; most repealed theirs because the money raised was, with few exceptions, very low and the cost of running them was high. France's raised about 0.2% of GDP before it was replaced in 2018. The reason is not bad luck. Brülhart, Gruber, Krapf and Schmidheiny found that reported wealth in Switzerland responds to wealth-tax rates far more strongly than reported income responds to income-tax rates, and that taxpayers bunch just below the threshold. Private companies, art and real estate have no daily price, so every valuation is a negotiation. The $6.2 trillion that Saez and Zucman project for the Warren bill assumes 15% avoidance and no effect on growth; the Penn Wharton Budget Model put the 2021 version at about $2.1 trillion over ten years, with GDP 0.6% lower by 2031. A tax that relies on the IRS valuing unlisted fortunes every year will raise a fraction of its headline figure.",
      proponent_rebuttal:
        "Europe's taxes failed by design, not by nature. They started at modest fortunes, exempted whole asset classes, and let the rich leave by moving across a border. Switzerland, which kept a broad tax with good records, raised €9.5 billion from it in 2023, 4.3% of all its tax revenue and about 1.16% of GDP. A US tax would sit only on fortunes above $50 million and would follow citizens wherever they live, with a 40% exit tax on anyone worth more than $50 million who renounces citizenship. The gap it closes is real: from 2014 to 2018 the 25 richest Americans' wealth grew $401 billion while they paid $13.6 billion in federal income tax, because unrealized gains are never taxed. Saez and Zucman put the base at about 260,000 households. Even a yield well below their estimate would be among the largest new revenue sources available.",
      crux: {
        id: "european-experience",
        title: "The Leakage Test",
        question:
          "Did Europe's wealth taxes raise little because of fixable flaws, or because taxing wealth yearly always leaks?",
        description:
          "How much a wealth tax collects depends on how much reported wealth shrinks once it is taxed: through avoidance, undervaluation, exemptions and moving. If the shrinkage came from exemptions, low thresholds and easy exit that a US design avoids, the revenue case holds. If it comes from the nature of taxing illiquid, hard-to-price assets every year, it does not.",
        methodology:
          "Compare repealed taxes (France, Sweden, Germany, Denmark) with surviving ones (Switzerland, Norway, Spain) on thresholds, exemptions, valuation rules, third-party reporting and exit rules, and set each design against its measured elasticity of reported wealth and its revenue as a share of GDP. Then apply the best-fitting elasticities to the US base above $50 million and compare the result with the Saez-Zucman estimate.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Measured elasticities of reported wealth for each European tax, matched to its thresholds, exemptions, valuation rules and exit rules, then applied to the US base above $50 million to compare with the Saez-Zucman projection of $6.2 trillion over ten years.",
        },
        cost_to_verify:
          "Low for the European comparison, which uses published studies; the US figure stays a projection until a tax is collected",
        falsification: {
          supporter_flip:
            "If taxes with broad bases, high thresholds and third-party reporting showed the same large shrinkage in reported wealth as Europe's leaky ones, the claim that a better design fixes the problem would fail.",
          skeptic_flip:
            "If well-designed taxes such as Switzerland's kept their base while poorly designed ones lost theirs, the repeals would point to fixable flaws rather than to a tax that always leaks.",
          common_ground:
            "Both sides agree most European wealth taxes were repealed, that the surviving ones raise between about 0.2% and 1.2% of GDP, and that valuing private companies and other unlisted assets is the hardest practical problem.",
          live_disagreement:
            "Whether Europe's taxes raised little because of exemptions, low thresholds and easy exit that a US design could avoid, or because reported wealth always shrinks when it is taxed every year.",
        },
      },
      evidence: [
        {
          id: "saez-zucman-2026-estimate",
          title: "Saez and Zucman: The Reintroduced Warren Tax Would Raise $6.2 Trillion in Ten Years (March 2026)",
          description:
            "In March 2026 Elizabeth Warren and Representatives Pramila Jayapal and Brendan Boyle reintroduced the Ultra-Millionaire Tax Act: an annual 2% tax on household and trust net worth above $50 million, plus 1% more on billionaires, with a 40% exit tax on anyone worth more than $50 million who renounces US citizenship. UC Berkeley economists Emmanuel Saez and Gabriel Zucman estimated it would apply to about 260,000 households and raise $6.2 trillion over the next decade, more than double their estimate for the 2021 version. They assume 15% avoidance and no effect on growth, and concluded that strong federal enforcement through audits and information reporting would likely limit evasion and avoidance. The Penn Wharton Budget Model, scoring the 2021 version in March 2021, put it at about $2.1 trillion over ten years and projected GDP 0.6% lower in 2031. CBS News judged the bill unlikely to pass.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "CBS News (Aimee Picchi, 26 March 2026), on the bill and the Saez-Zucman estimate; Reason (Jack Nicastro, 27 March 2026) on its assumptions and the Penn Wharton score of the 2021 bill",
          sourceUrl: "https://www.cbsnews.com/news/elizabeth-warren-wealth-tax-plan-ultra-millionaire-tax-act",
          reasoning:
            "This is the headline revenue case. It is a projection by two economists released with the bill, not an official score, and it rests on the two assumptions critics dispute most: low avoidance and no effect on growth. Penn Wharton's lower figure for the earlier bill shows how much those assumptions matter. It shows how large the base is; it does not show how much of it would survive the tax.",
        },
        {
          id: "swiss-revenue-share-2023",
          title: "Switzerland's Wealth Tax Raised €9.5 Billion in 2023, 4.3% of Its Tax Revenue",
          description:
            "OECD figures for 2023, reported by Euronews in September 2025, show individual net wealth taxes raising between 0.21% of GDP in Spain and 1.16% in Switzerland. Switzerland collected about €9.5 billion, 4.3% of its total tax revenue, the highest share in the OECD. Norway raised about €2.7 billion (1.5% of tax revenue) and Spain €3.1 billion (0.6%). Spain added a 'solidarity' tax of 1.7% to 3.5% on net assets above €3 million in 2022; first meant to be temporary, it has become permanent.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Euronews, 'Wealth taxes in Europe: Who collects them and how much do they raise?' (29 September 2025), reporting OECD revenue statistics for 2023",
          sourceUrl: "https://www.euronews.com/business/2025/09/29/wealth-taxes-in-europe-who-collects-them-and-how-much-do-they-raise",
          reasoning:
            "Official revenue data show a long-running wealth tax can raise a meaningful share of revenue. But Switzerland taxes moderate wealth at low rates under a cantonal system unlike any US proposal, so the figure shows a wealth tax can last, not what a billionaire-only US tax would collect.",
        },
        {
          id: "effective-tax-rates",
          title: "ProPublica: The 25 Richest Americans Gained $401 Billion and Paid $13.6 Billion in Income Tax (2014-2018)",
          description:
            "ProPublica's 2021 'Secret IRS Files' found the 25 richest Americans saw their collective wealth grow $401 billion from 2014 to 2018 while paying $13.6 billion in federal income tax, a 'true tax rate' of 3.4% measured against wealth growth. The low rate reflects that most gains at the top are unrealized: shares that rise in value are not taxed until sold, and many are never sold.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "ProPublica, 'The Secret IRS Files' (8 June 2021)",
          sourceUrl:
            "https://www.propublica.org/article/the-secret-irs-files-trove-of-never-before-seen-records-reveal-how-the-wealthiest-avoid-income-tax",
          reasoning:
            "It shows the gap a wealth tax aims at: large gains that the income tax never reaches. The 'true tax rate' compares tax with wealth growth, not with income, and it says nothing about how much a wealth tax would collect, so directness on the revenue crux is moderate.",
        },
        {
          id: "european-repeal",
          title: "OECD: Countries With a Net Wealth Tax Fell From 12 in 1990 to 4 in 2017",
          description:
            "The number of OECD countries levying an individual net wealth tax fell from 12 in 1990 to 4 by 2017 (France, Norway, Spain, Switzerland). Repeals in Austria (1994), Denmark and Germany (1997), the Netherlands (2001), Finland, Iceland and Luxembourg (2006), Sweden (2007) and France (2018) were typically justified by efficiency and administrative concerns, capital flight, and revenues that were, with few exceptions, very low.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "OECD (2018), 'The Role and Design of Net Wealth Taxes in the OECD', OECD Tax Policy Studies No. 26",
          sourceUrl:
            "https://www.oecd.org/en/publications/the-role-and-design-of-net-wealth-taxes-in-the-oecd_9789264290303-en.html",
          reasoning:
            "The authoritative record of the repeals and the reasons governments gave. It shows wealth taxes have mostly been abandoned; the same review argues design (exemptions, low thresholds) explains much of the low yield, which leaves room for the reading that a different design could do better.",
        },
        {
          id: "swiss-wealth-elasticity",
          title: "Brülhart et al.: Swiss Reported Wealth Responds to Tax Rates Far More Than Income Does",
          description:
            "Using wealth data across Swiss cantons and individual records from the canton of Bern, Marius Brülhart, Jonathan Gruber, Matthias Krapf and Kurt Schmidheiny estimated behavioural elasticities of reported wealth that substantially exceed those found for taxable income. Taxpayers bunch below the tax threshold, and the response comes from changes in reported wealth holdings rather than from people moving between cantons; financial wealth responds somewhat more than other wealth.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Brülhart, Gruber, Krapf & Schmidheiny, 'Taxing Wealth: Evidence from Switzerland', NBER Working Paper 22376 (2016; published in AEJ: Economic Policy, 2022)",
          sourceUrl: "https://www.nber.org/papers/w22376",
          reasoning:
            "Strong, peer-reviewed evidence from the country with the most durable wealth tax that the base shrinks when rates rise, which is the core of the leakage worry. It measures reported wealth, which mixes real changes with avoidance and valuation games, and Swiss enforcement differs from what a US tax would use.",
        },
        {
          id: "valuation-problems",
          title: "OECD: Hard-to-Value Assets Were Often Exempted, Narrowing the Base",
          description:
            "Annually valuing infrequently traded assets, such as private businesses, real estate and art, is a central administrative difficulty of net wealth taxes. The OECD notes such hard-to-value assets were often exempted or valued low, narrowing the base, and recommends using market value (possibly discounted to around 80-85%) to limit valuation disputes.",
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
          reasoning:
            "Valuation is the practical problem both sides accept. It counts against the tax as designed in Europe; whether market-value rules and third-party reporting would fix it in the US is the open question.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Would the richest leave?
    // =========================================================================
    {
      id: "capital-flight",
      title: "Would the Richest Leave?",
      short_summary:
        "Norway raised its wealth tax in 2022 and dozens of its richest people moved to Switzerland; California's billionaire tax led Larry Page, Sergey Brin and Peter Thiel to leave before its cut-off date. A new study of Norway finds at most about 100 people left because of the reforms, and revenue still rose. The fight is over how much of the base walks out the door.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Fortunes move, and the largest move first. After Norway raised its wealth tax, 82 rich Norwegians with a combined net wealth of about 46 billion kroner left in 2022 and 2023, by Finance Ministry figures, most of them for Switzerland. California has not even passed its tax and already lost Page, Brin, Thiel, Don Hankey and Travis Kalanick, whose share of the tax Fortune put at about $27 billion of a projected $100 billion. Each billionaire who leaves takes their income-tax payments too, every year after. Hoover Institution economists Ben Jaros and Joshua Rauh estimate Prop 40 would raise about $30 billion up front but cost California about $39 billion in today's dollars once lost income taxes are counted. A state is easier to leave than a country, and a tax that drives out the people it targets loses money twice.",
      proponent_rebuttal:
        "The exodus is smaller than the headlines. Marius Ring's October 2026 NBER study of Norway's 2021-2024 reforms finds the moves concentrated in the top 0.1% and in 2022-2023, with at most about 100 people leaving because of them; wealth-tax revenue rose about 71.5% from 2021 to 2024 instead of the 75% it would have without them. The inflow of startup founders and inventors did not fall, and the firms of those who left stayed active. California's tax is designed against flight: it applies to anyone living in the state on 1 January 2026, so moving now does not escape it, and the Legislative Analyst puts the ongoing income-tax loss at less than $1 billion a year against tens of billions collected. A federal tax would be harder still to escape, because the US taxes its citizens wherever they live and would levy a 40% exit tax on those who renounce.",
      crux: {
        id: "wealth-tax-migration",
        title: "The Exit Count",
        question:
          "How many of the richest move away when a wealth tax rises, and how much of the tax base do they take with them?",
        description:
          "A wealth tax loses money if enough of the people it targets leave and take their future income taxes with them. Norway's 2022 increase and California's Prop 40 are live tests. The question is the size of the move, measured against the revenue, not whether anyone moves.",
        methodology:
          "Use tax-register data to count wealthy taxpayers who leave after a wealth-tax change against a matched baseline, and measure the wealth and income tax they take with them. Apply it to Norway's 2021-2024 reforms (Ring, NBER 2026) and, as returns arrive, to California billionaires counted on 1 January 2026, setting Prop 40 collections against the state's income-tax receipts from those who later leave.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Norwegian tax-register counts of wealthy emigrants after the 2022 increase, set against wealth-tax revenue in each year; and, if Prop 40 passes, the state's collections from billionaires living there on 1 January 2026 set against the income tax lost from those who leave.",
        },
        cost_to_verify:
          "Low for Norway, where register data are already studied; California's answer takes several years of tax returns",
        falsification: {
          supporter_flip:
            "If register data showed departures after Norway's increase or California's tax taking away more in future income tax than the wealth tax collected, the claim that flight is too small to matter would fail.",
          skeptic_flip:
            "If departures stayed at Norway's scale of at most about 100 people while wealth-tax revenue kept rising, and Prop 40 collections far exceeded the income tax lost, the claim that a wealth tax drives away its own base would lose its force.",
          common_ground:
            "Both sides agree some very rich people left Norway after its 2022 increase and some billionaires left California before Prop 40's cut-off date, and that departures are concentrated among the very richest.",
          live_disagreement:
            "Whether departures are a rounding error against the revenue, as Norway's register data suggest to backers, or large enough to cancel it once the income taxes the leavers would have paid for decades are counted.",
        },
      },
      evidence: [
        {
          id: "norway-ring-2026",
          title: "Ring (NBER, October 2026): At Most About 100 People Left Norway Over Its Wealth-Tax Rises, and Revenue Still Grew",
          description:
            "Marius Ring studied Norway's 2021-2024 reforms, which raised dividend tax rates, closed capital-gains loopholes for emigrants and roughly doubled the effective marginal tax rate on business wealth. He finds the migration responses concentrated in the top 0.1% of the wealth distribution and mostly in 2022 and 2023, with at most about 100 people leaving because of the reforms. Inflows of startup founders and inventors did not fall significantly. Wealth-tax revenue would have risen about 75% from 2021 to 2024 without the departures, and rose about 71.5% with them. Firms owned by those who left stayed active, and Norwegian-owned firms showed no clear rise in dividends, fall in investment or rise in bankruptcies.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Marius A. K. Ring, 'Taxing Entrepreneurial Wealth: Evidence from Norway, 2021-2025', NBER Working Paper 35854 (October 2026)",
          sourceUrl: "https://www.nber.org/papers/w35854",
          reasoning:
            "Register data on the whole population, from the most-cited recent case of wealth-tax flight, so it is direct evidence on the size of the exit. It is a new working paper, not yet peer-reviewed, it covers the short run, and Norway's tax, like a US state's, ends when a taxpayer moves away, while a federal one would follow citizens abroad.",
        },
        {
          id: "lao-prop40-estimate",
          title: "California's Legislative Analyst: Prop 40 Raises Tens of Billions; Lost Income Tax Under $1 Billion a Year",
          description:
            "The Legislative Analyst's Office describes Proposition 40 as a one-time tax of 5% of net worth on billionaires living in California on 1 January 2026, due in 2027, payable over five years at extra cost, with real estate, pensions and retirement accounts generally excluded; 90% of the money must go to health care. It says the state 'probably would collect tens of billions of dollars' over several years, though how much is 'very hard to predict' because billionaires may act to reduce the tax and much of the wealth is in stock. Responses such as leaving the state 'probably would reduce state revenues by less than $1 billion per year.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source: "California Legislative Analyst's Office, Proposition 40 analysis (November 2026 ballot)",
          sourceUrl: "https://lao.ca.gov/ballot/2026/prop40-110326.pdf",
          reasoning:
            "The state's nonpartisan fiscal analyst, writing the official ballot analysis, so it is the most independent estimate available. It gives ranges, not figures, and says itself that the outcome is hard to predict; it also does not rule on the legal challenges that could reduce collections.",
        },
        {
          id: "capital-flight-risk",
          title: "Norway's Finance Ministry: 82 Rich Norwegians Worth 46 Billion Kroner Left in 2022-2023",
          description:
            "Bloomberg, reporting Finance Ministry data in April 2024, counted 82 rich Norwegians with a combined net wealth of about 46 billion kroner ($4.3 billion) who left the country in 2022-2023, after the government raised the wealth tax; most moved to Switzerland. The think tank Civita estimates the cabinet raised the wealth-tax burden by 55%, adjusted for inflation.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Fortune / Bloomberg (Ott Ummelas, 19 April 2024), citing Norway's Finance Ministry",
          sourceUrl:
            "https://fortune.com/europe/2024/04/19/wealthy-norwegians-flee-to-switzerland-to-evade-high-wealth-taxes-bankers-following-dnb-abg-sundal-collier/",
          reasoning:
            "Official counts show real departures of very large fortunes. They do not separate the wealth tax from the dividend-tax and exit-tax changes made at the same time, and they do not show what share of revenue left with these people; Ring's study, using the same registers, puts that share small.",
        },
        {
          id: "california-billionaires-left",
          title: "Page, Brin, Thiel, Hankey and Kalanick Left California Before Prop 40's Residency Date",
          description:
            "Fortune reported in March 2026 that Google co-founders Larry Page and Sergey Brin and venture capitalist Peter Thiel left California for Miami, car-loan magnate Don Hankey left for Las Vegas, and former Uber chief executive Travis Kalanick said he moved to Texas in December 2025, all before the measure's 1 January 2026 cut-off date. By Fortune's arithmetic, their 5% would have come to about $27 billion, roughly a quarter of the $100 billion the initiative's backers project. Mark Zuckerberg was reported to have left after the date.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Fortune (Jacqueline Munis, 17 March 2026)",
          sourceUrl:
            "https://fortune.com/2026/03/17/6-billionaires-left-california-billionaire-tax-newsom-brin-page-thiel-spielberg-revenue/",
          reasoning:
            "Named, reported moves by some of the largest fortunes in the base, before any tax was passed, which is the flight worry made concrete. The $27 billion is the magazine's own arithmetic against the backers' estimate, a handful of cases is not a rate, and a few billionaires can move far more easily than most taxpayers.",
        },
        {
          id: "hoover-prop40-net-loss",
          title: "Hoover's Jaros and Rauh: Prop 40 Raises About $30 Billion but Costs California About $39 Billion Net",
          description:
            "Ben Jaros and Joshua Rauh of Stanford's Hoover Institution estimate Prop 40 would raise about $30 billion up front (range $28 billion to $36 billion), and that the income taxes lost from billionaires who leave 'would more than wipe that out', for a net loss of about $39 billion in today's dollars. Their model simulates litigation risk, with realized revenue anywhere from $0 to $72 billion. Supporters cite an expert report by Emmanuel Saez and David Gamage that puts revenue at $100 billion, and argue the study sets a one-time tax against income-tax losses that last forever; Jaros conceded critics 'could argue' the method treats the tax as permanent.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "San Francisco Standard (Kevin Truong, 26 October 2026), on the Jaros-Rauh paper and the Saez-Gamage report",
          sourceUrl: "https://sfstandard.com/2026/10/26/hoover-economist-ben-jaros-prop-40-billionaire-tax-study/",
          reasoning:
            "It states the strongest form of the fiscal case against the measure, with its assumptions disclosed. It is a model, and the 'net loss' rests on how many billionaires leave and for how long, which no data yet measure; the competing $100 billion estimate comes from the measure's side.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Would it hurt investment, and is the trade worth it?
    // =========================================================================
    {
      id: "economic-effects",
      title: "Would It Hurt Investment?",
      short_summary:
        "Most billionaire wealth is shares in companies, not cash. Critics say a yearly tax on it forces sales, cuts saving and slows the firms behind the fortunes. Backers say 2% is below typical returns and Norway's firms kept investing. Under the data sits a value question: whether curbing concentrated wealth is worth some loss of capital at the top.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "A wealth tax is a tax on capital that has already been taxed, levied every year whether or not it earns anything. Most billionaire wealth is shares in the companies they built, so paying 2% or 3% a year means selling stakes, borrowing against them, or pulling cash out of firms. Danish evidence shows the long-run response of wealth to the after-tax return is sizeable at the top: less capital piles up where the tax bites. The OECD flags liquidity as a real difficulty for asset-rich, cash-poor taxpayers, and France's National Assembly rapporteur warned in October 2026 that taxing fortunes made of illiquid assets risks being unconstitutional. Slower accumulation at the top means less money for new firms and less investment overall, a cost spread across workers who never see the tax.",
      proponent_rebuttal:
        "The firms do not stop investing. In Norway, after the effective tax on business wealth roughly doubled, Ring finds Norwegian-owned firms showed no clear fall in investment, no rise in dividends to pay the tax, and no rise in bankruptcies; firms whose owners emigrated stayed active. A 2% levy is well below long-run equity returns, so fortunes keep growing, just more slowly. Cross-country IMF work finds that redistribution, outside extreme cases, shows little sign of hurting growth, and lower inequality goes with longer growth spells. And slower growth of the largest fortunes is partly the point: wealth at that scale buys political influence, and a tax that trims it is doing what it was meant to do.",
      crux: {
        id: "investment-impact",
        title: "The Investment Test",
        question:
          "Would a modest annual wealth tax meaningfully reduce investment and new business?",
        description:
          "Whether firms owned by the very rich invest less, pay out more or fail more often when their owners face a wealth tax, and whether wealth at the top grows more slowly in ways that cut the capital available to the economy. Under the empirical test sits a value fork no data settles: how much slower growth of the largest fortunes is a cost and how much is the aim.",
        methodology:
          "Use firm-level data to compare investment, dividends, hiring and bankruptcy in firms whose owners face a wealth-tax change with matched firms whose owners do not, as Ring does for Norway's 2021-2024 reforms, and track wealth accumulation at the top before and after changes, as Jakobsen, Jakobsen, Kleven and Zucman do for Denmark's repeal.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Firm-level investment, dividends, hiring and bankruptcy for owners facing a wealth-tax change against matched firms whose owners face none, plus wealth accumulation at the top before and after Norway's increase and Denmark's repeal. How much slower growth of the largest fortunes is acceptable is a value judgment.",
        },
        cost_to_verify: "Low for Norway and Denmark, whose register data are studied; a US answer would need a US tax",
        falsification: {
          supporter_flip:
            "If firm-level data showed firms facing a wealth tax investing less, paying out more to cover the tax or failing more often than matched firms, the claim that a modest levy leaves investment intact would fail.",
          skeptic_flip:
            "If Norway's firms kept investing at the same rate after the effective tax on business wealth doubled, and the same held in other countries, the claim that a wealth tax starves firms of capital would lose its footing.",
          common_ground:
            "Both sides agree most billionaire wealth is company equity rather than idle cash, so how the tax is paid, by selling shares, borrowing or drawing cash from firms, matters.",
          live_disagreement:
            "Whether a 2% to 3% annual levy measurably cuts investment and new firms or mainly slows the growth of the largest fortunes, and whether that slower growth is a cost or the purpose of the tax.",
        },
      },
      evidence: [
        {
          id: "norway-firms-kept-investing",
          title: "Ring (2026): Norwegian Firms Showed No Clear Drop in Investment After the Wealth-Tax Rise",
          description:
            "In the same NBER study of Norway's 2021-2024 reforms, which roughly doubled the effective marginal tax rate on business wealth, Marius Ring finds that Norwegian-owned firms show no clear increase in dividends, decrease in investment or rise in bankruptcies, and that firms owned by those who emigrated remained economically active. He concludes that the short-run economic costs of wealth taxation are more limited than the public debate suggests.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "Marius A. K. Ring, NBER Working Paper 35854 (October 2026)",
          sourceUrl: "https://www.nber.org/papers/w35854",
          reasoning:
            "Direct firm-level evidence from a recent, large increase. It covers only a few years, so it speaks to the short run; a slower effect on how much capital accumulates over decades would not show yet.",
        },
        {
          id: "inequality-harms-growth",
          title: "IMF (Ostry, Berg and Tsangarides, 2014): Redistribution Shows Little Sign of Hurting Growth",
          description:
            "An IMF staff study found that lower net inequality is robustly associated with faster and more durable growth, and that fiscal redistribution, except in extreme cases, shows little evidence of adverse growth effects. The result challenges a strict trade-off between equality and efficiency rather than proving that a wealth tax raises growth.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 3,
          },
          source:
            "Ostry, Berg & Tsangarides (2014), 'Redistribution, Inequality, and Growth', IMF Staff Discussion Note SDN/14/02",
          sourceUrl:
            "https://www.elibrary.imf.org/view/journals/006/2014/002/article-A001-en.xml",
          reasoning:
            "Established cross-country research, but about redistribution in general, mostly through income taxes and transfers. Its link to a billionaire wealth tax is indirect, so directness is low.",
        },
        {
          id: "denmark-wealth-accumulation",
          title: "Jakobsen, Jakobsen, Kleven and Zucman: Wealth Taxes Cut Wealth Accumulation at the Top in Denmark",
          description:
            "Denmark had one of the world's highest marginal wealth-tax rates before cutting and then abolishing it between 1989 and 1997. Studying that change, Katrine Jakobsen, Kristian Jakobsen, Henrik Kleven and Gabriel Zucman find clear effects of wealth taxes on wealth in the short and medium run, larger for the very wealthy than for the moderately wealthy, and simulations show the long-run elasticity of wealth with respect to the after-tax return is sizeable at the top of the distribution.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "Jakobsen, Jakobsen, Kleven & Zucman, 'Wealth Taxation and Wealth Accumulation: Theory and Evidence from Denmark', NBER Working Paper 24371 (2018; Quarterly Journal of Economics, 2020)",
          sourceUrl: "https://www.nber.org/papers/w24371",
          reasoning:
            "Top-tier evidence, co-written by the tax's best-known advocate, that wealth at the top grows less under a wealth tax. It measures accumulation of reported wealth, not investment in firms, and backers read the same result as the tax working as intended.",
        },
        {
          id: "equity-illiquidity",
          title: "OECD: Asset-Rich, Cash-Poor Taxpayers Face Real Liquidity Problems",
          description:
            "Much billionaire wealth is concentrated in company equity rather than cash. The OECD flags liquidity problems for asset-rich, income-poor taxpayers as a real difficulty of net wealth taxes: paying each year can mean selling shares or borrowing against them. In France's 2027 budget debate in October 2026, rapporteur Philippe Juvin opposed a 2% minimum tax on the roughly 1,800 richest households, citing 'un risque d'inconstitutionnalité lié à la taxation de patrimoines comprenant des actifs peu liquides', a risk of unconstitutionality in taxing fortunes made of illiquid assets; the National Assembly rejected the tax again.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "OECD (2018), 'The Role and Design of Net Wealth Taxes in the OECD'; La Gazette France / AFP (16 October 2026) on the National Assembly debate",
          sourceUrl:
            "https://www.lagazettefrance.fr/article/budget-l-assemblee-rejette-la-taxe-zucman-sur-les-ultrariches",
          reasoning:
            "The liquidity problem is documented and was decisive in France's legislature in 2025 and again in 2026. Backers answer that billionaire-only thresholds and deferral options, such as Prop 40's five-year payment plan, limit forced sales; how often owners actually sell is what the evidence does not yet show.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Proposition 40: Imposes One-Time Tax on Certain Taxpayers - California Legislative Analyst's Office (November 2026 ballot)",
      url: "https://lao.ca.gov/ballot/2026/prop40-110326.pdf",
    },
    {
      title: "Taxing Entrepreneurial Wealth: Evidence from Norway, 2021-2025 - Marius A. K. Ring, NBER Working Paper 35854",
      url: "https://www.nber.org/papers/w35854",
    },
    {
      title: "The Role and Design of Net Wealth Taxes in the OECD - OECD Tax Policy Studies No. 26 (2018)",
      url: "https://www.oecd.org/en/publications/the-role-and-design-of-net-wealth-taxes-in-the-oecd_9789264290303-en.html",
    },
    {
      title: "Taxing Wealth: Evidence from Switzerland - Brülhart, Gruber, Krapf & Schmidheiny (NBER WP 22376)",
      url: "https://www.nber.org/papers/w22376",
    },
    {
      title: "Wealth Taxation and Wealth Accumulation: Theory and Evidence from Denmark - Jakobsen, Jakobsen, Kleven & Zucman (NBER WP 24371)",
      url: "https://www.nber.org/papers/w24371",
    },
    {
      title: "Economists are feuding about the impact of Prop. 40's billionaire tax - San Francisco Standard (26 October 2026)",
      url: "https://sfstandard.com/2026/10/26/hoover-economist-ben-jaros-prop-40-billionaire-tax-study/",
    },
    {
      title: "Billionaire tax loses majority support in new PPIC poll - San Francisco Standard (27 October 2026)",
      url: "https://sfstandard.com/2026/10/27/billionaire-tax-prop-40-ppic-poll-october/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did wealth taxes fail in Europe?",
      content:
        "Twelve OECD countries taxed net wealth in 1990 and four did by 2017. Critics say the repeals show such taxes raise little and drive money abroad. Backers say Europe's taxes started at modest fortunes and exempted whole asset classes, and point to Switzerland, whose tax raised 4.3% of its revenue in 2023. Were the failures about design or about the nature of taxing wealth every year?",
    },
    {
      id: "q2",
      title: "Do the rich really leave when wealth taxes rise?",
      content:
        "After Norway raised its wealth tax, 82 rich Norwegians worth about 46 billion kroner left in 2022-2023, and California lost Larry Page, Sergey Brin and Peter Thiel before Prop 40's cut-off date. Yet a 2026 register study finds at most about 100 Norwegians left because of the reforms and wealth-tax revenue still rose about 71.5%. Is flight a headline or a hole in the budget?",
    },
    {
      id: "q3",
      title: "Would a wealth tax slow investment?",
      content:
        "Most billionaire wealth is company shares. Critics say a yearly tax forces sales and slows the firms behind the fortunes; Danish data show wealth at the top grows less under such a tax. Backers point to Norwegian firms that kept investing after their owners' tax doubled. And if the largest fortunes grow more slowly, is that a cost or the point?",
    },
  ],
};
