export const dataCentersElectricityBillsData = {
  id: "data-centers-electricity-bills",
  title: "Data Centers and Power Bills",
  question: "Are AI data centers driving up household electricity bills?",
  meta_claim:
    "The AI data-center build-out is raising household electricity bills, through wholesale and capacity prices and grid costs spread across all customers, and under current rules households will keep paying for power and wires built for tech companies.",
  status: "contested" as const,
  category: "economics" as const,
  last_updated: "2026-11-03",
  tags: ["data-centers", "electricity-prices", "utilities", "ai", "ratepayers"],
  aliases: [
    "Data center electricity costs",
    "Do data centers raise power bills",
    // Words readers use for this question that the map's own text does not.
    "Are hyperscale server campuses behind my utility's rate hike?",
  ],
  // ── The lede: two facts both sides accept, then what the fight is over ──
  keystone_fact: {
    statement:
      "PJM's independent market monitor attributes $21.3 billion of the $47.2 billion cost of the grid's last three capacity auctions, about 45%, to forecast data-center load, and those capacity costs are passed through to customers' bills. Berkeley Lab's study of 2019 to 2024 found that states whose electricity demand grew fastest saw average real retail prices fall, because fixed grid costs were spread over more sales. The fight is over which of those effects wins for households as the build-out grows, and whether utility rules make data centers carry the costs they cause.",
    confidence: 85,
    source:
      "Monitoring Analytics, PJM independent market monitor, as reported by Utility Dive (January 7, 2026); Lawrence Berkeley National Laboratory, as reported by the American Public Power Association (November 4, 2025)",
    sourceUrl: "https://www.utilitydive.com/news/data-centers-pjm-capacity-auction/808951/",
  },
  // ── The summary above the crux sheet: what the map turns on ──
  simple_case: [
    "Both sides accept that data centers are the largest source of new electricity demand in the biggest US grid markets, that PJM's capacity prices have hit their caps as that demand arrived, and that national residential prices rose about 7% after inflation from 2021 to 2025, with natural gas, transmission and distribution costs also in the mix.",
    "They split over whether data centers have already raised household rates or, by spreading fixed grid costs over more sales, held them down; over whether demand growth from here will outrun new supply and push bills up for years, or be absorbed by flexible loads and new plants; and over whether special tariffs, contracts and pledges make data centers pay for the grid built for them, or quietly shift those costs onto households.",
    "The first two are questions that rate data and the next capacity auctions can answer; the third turns on rate design that regulators in each state are deciding now.",
  ],
  pillars: [
    {
      id: "record-so-far",
      title: "The Record So Far",
      short_summary:
        "Wholesale and capacity prices have risen where data centers cluster, but studies of retail rates through 2024 and 2025 find no clear link between data-center growth and higher household prices, and some find the opposite.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The retail record does not show data centers raising household rates. Berkeley Lab found that from 2019 to 2024 states with the highest load growth saw real prices fall, since fixed grid costs were spread over more sales. An EPRI working paper using an instrumental-variables design estimates data centers caused average retail rates to fall modestly from 2015 to 2024. USAFacts found no statistically significant relationship between states' data-center concentration and residential price changes from December 2022 to December 2025, and prices in Texas and Virginia, which hold about 41% of US data-center capacity, rose less than in the average state.",
      proponent_rebuttal:
        "The retail studies end before the costs arrived. PJM's capacity prices rose more than tenfold, to $329.17 per megawatt-day for 2026-27, and its market monitor calls data-center load growth the primary reason, attributing 45% of the cost of the last three auctions to it. Those charges reach bills from June 2025 on. A UCLA working paper finds that a county's first AI data center raises local wholesale electricity prices by $5.3 per megawatt-hour against a mean of $47. Berkeley Lab's own load-growth effect was smaller and not statistically significant for residential prices, because the growth was commercial and cost allocation has tended to favor large customers.",
      crux: {
        id: "rates-to-date",
        title: "Household Rates to Date",
        question: "Have data centers raised household electricity rates so far, or held them down?",
        description:
          "Retail-rate studies through 2024 and 2025 find data-center and load growth associated with flat or lower average prices, while wholesale and capacity prices have jumped where data centers cluster. The question is which effect has reached household bills, now that the first data-center-driven capacity charges are flowing through.",
        methodology:
          "Compare residential rates, not just average rates, in utility territories with large data-center growth against similar territories without it, for 2023 to 2027, so the comparison includes the PJM capacity charges that began in June 2025. Separate capacity, transmission, distribution and fuel components of the bill, and control for natural gas prices and storm and wildfire costs.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Utility-level residential rate filings for 2023 to 2027, split into capacity, transmission, distribution and fuel charges, in territories with heavy data-center growth against comparable territories without it, extending the Berkeley Lab and EPRI designs past 2024.",
        },
        cost_to_verify:
          "Rate data are public through EIA and state commissions; the post-2025 comparison needs a year or two more data and a funded study.",
        falsification: {
          supporter_flip:
            "If residential rates in territories with heavy data-center growth rose no faster than elsewhere through 2027, once capacity charges were included, the claim that data centers have raised household bills to date would fail.",
          skeptic_flip:
            "If residential rates in data-center-heavy territories rose measurably faster than in comparable territories after the 2025 capacity charges, with the gap traced to capacity and transmission charges, the finding that load growth holds rates down would no longer describe households.",
          common_ground:
            "Both sides agree that wholesale and capacity prices have risen where data centers cluster, and that retail studies through 2024 found load growth associated with flat or lower average prices.",
          live_disagreement:
            "Whether the capacity and wholesale price increases since 2025 outweigh the fixed-cost spreading that held average rates down before, for residential customers in particular.",
        },
      },
      evidence: [
        {
          id: "pjm-capacity-share",
          title: "Monitor Attributes 45% of PJM Capacity Costs to Data Centers",
          description:
            "PJM's independent market monitor, Monitoring Analytics, attributes $6.5 billion, or 40%, of the $16.4 billion cost of the December 2025 capacity auction to data-center load, and $21.3 billion, or 45%, of the $47.2 billion cost of the last three base auctions to data-center forecasts above existing data-center load. It concludes that data-center load growth is the primary reason for recent and expected capacity market conditions.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Utility Dive (January 7, 2026), reporting Monitoring Analytics, PJM's independent market monitor",
          sourceUrl: "https://www.utilitydive.com/news/data-centers-pjm-capacity-auction/808951/",
          reasoning:
            "The monitor is independent of PJM and its generators and works from auction data, but it has argued for excluding forecast data-center load, so it is not neutral on remedies. The attribution is a counterfactual rerun of the auction, and PJM has said a better-vetted demand forecast could be significantly lower. Capacity is one part of a retail bill, so directness to household rates is moderate.",
        },
        {
          id: "ucla-wholesale-entry",
          title: "A County's First AI Data Center Raises Wholesale Prices $5.3/MWh",
          description:
            "Using 2019-2026 wholesale price data across PJM and the Western Energy Imbalance Market and a staggered difference-in-differences design, Calvin Zhang finds that a county receiving its first AI data center sees wholesale electricity prices rise by $5.3 per megawatt-hour, relative to a sample mean of $47. He notes the effect is higher than retail price effects in the literature but modest compared with some media reports.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 8,
            replicability: 5,
            directness: 5,
          },
          source:
            "Calvin Zhang, 'AI data centers and electricity prices: Much ado about something?', UCLA working paper (June 2026)",
          sourceUrl: "https://www.anderson.ucla.edu/sites/default/files/document/2026-09/2026-06wp.pdf",
          reasoning:
            "A causal design on recent data, but a doctoral student's working paper that the author describes as initial, not finalized results, so reliability and replicability are marked down. It measures wholesale prices, which reach household bills only partly and with a lag.",
        },
        {
          id: "lbnl-load-growth",
          title: "Berkeley Lab: Fast-Growing States Saw Real Prices Fall, 2019-2024",
          description:
            "Lawrence Berkeley National Laboratory found that from 2019 to 2024 states with the highest load growth experienced reductions in real retail electricity prices, while states with contracting loads generally saw prices rise, as fixed costs were spread over more sales. The relationship was pronounced for average retail prices but smaller and not statistically significant for residential prices alone, and the authors write that whether it extends to a future of significant nationwide load growth is unclear.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Lawrence Berkeley National Laboratory retail price study, as reported by the American Public Power Association, 'State-Level Load Growth Has Reduced Average Retail Electricity Prices: Report' (November 4, 2025)",
          sourceUrl:
            "https://www.publicpower.org/periodical/article/state-level-load-growth-has-reduced-average-retail-electricity-prices-report",
          reasoning:
            "A national laboratory study with Brattle, updated through 2025 in 2026. It covers all load growth rather than data centers alone and mostly predates the capacity price spike, and its residential result is not significant, so it bears on households only indirectly.",
        },
        {
          id: "epri-iv-retail",
          title: "EPRI: Data Centers Caused Average Rates to Fall Modestly, 2015-2024",
          description:
            "Watten, Bistline and Blanford of the Electric Power Research Institute use an instrumental-variables approach and estimate that data centers caused average US retail electricity rates to fall modestly from 2015 to 2024, citing fixed system costs and economies of scale in transmission, distribution and generation. Fortune reports their estimate as a 3.5% fall in average retail prices for every doubling of data-center capacity. The authors warn that future supply constraints could reverse the effect.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Watten, Bistline & Blanford, 'Have Data Centers Raised Your Electric Bill? Causal Evidence from the United States', arXiv:2606.19777 (June 2026); Fortune (July 26, 2026)",
          sourceUrl: "https://arxiv.org/abs/2606.19777",
          reasoning:
            "A causal design aimed squarely at the question, by established energy modelers. EPRI is funded largely by utilities, which earns a modest independence discount; it is an unreviewed working paper; and its data end in 2024, before PJM's capacity charges reached bills.",
        },
        {
          id: "usafacts-state-comparison",
          title: "No Significant State-Level Link Between Data Centers and Residential Prices",
          description:
            "USAFacts found that US residential electricity prices rose 27% from 2021 to 2025, 6.8% after inflation, and that across states, from December 2022 to December 2025, there was no statistically significant relationship between data-center concentration and residential price changes. Residential prices in Texas and Virginia, which together hold roughly 41% of existing data-center capacity, did not rise as much as in the average state.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "USAFacts, 'Are AI data centers driving up your electric bill?' (August 11, 2026), from EIA and DOE data",
          sourceUrl: "https://usafacts.org/articles/are-ai-data-centers-driving-up-your-electric-bill/",
          reasoning:
            "Nonpartisan and built on public EIA data, so easy to check. A state-level correlation is coarse: grid markets cross state lines, so data centers in Virginia can raise capacity prices in Maryland or Ohio, and USAFacts itself cautions against certainty in either direction.",
        },
      ],
    },
    {
      id: "what-comes-next",
      title: "What Comes Next",
      short_summary:
        "Even if past growth held rates down, forecasts call for much more data-center demand. The dispute is whether it outruns new supply and raises bills for years, or can be absorbed by flexible loads and new plants.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The grid has more room than peak-hour planning assumes, if new data centers can briefly cut their draw. Duke University researchers found that US balancing authorities could absorb 76 gigawatts of new load, about 10% of national peak demand, if those loads were curtailed an average of 0.25% of the time, roughly 1.7 hours per event, and 126 gigawatts at 1%. Texas now requires new large loads of 75 megawatts or more to accept curtailment during grid emergencies and to install shutoff equipment to connect. Loads that step down at peak need far less new capacity built for them, and paying their share spreads fixed costs further.",
      proponent_rebuttal:
        "The bills ahead are already being set. PJM's July 2026 auction for June 2028 to May 2029 put about $6.3 billion of $16.4 billion in capacity charges on demand driven by data centers, and consumer advocates expect bills to stay elevated at about the same level. Virginia's legislative auditors estimate that generation and transmission costs for a typical Dominion residential customer could rise by $14 to $37 a month in real dollars by 2040 as the system is built out for data-center demand. Flexibility helps only when contracts require it, and transmission constraints can erase much of the modeled headroom.",
      crux: {
        id: "growth-ahead",
        title: "Demand Growth Against New Supply",
        question: "Will data-center demand outrun new supply and keep pushing household bills up for years?",
        description:
          "Forecast data-center demand is large enough to require new generation and transmission. Whether households pay more depends on whether that demand arrives faster than supply can be added, whether data centers can be made flexible enough to avoid building for their peak, and whether forecasts prove accurate.",
        methodology:
          "Track PJM and ERCOT capacity auction prices and reserve margins through 2030 against the data-center load that actually connects, the share of new large loads under curtailment or flexibility contracts, and the transmission spending allocated to residential classes in data-center states.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "PJM capacity auction clearing prices and reserve margins for the 2028-29 through 2030-31 delivery years, set against metered data-center load that actually connects and the share of it under binding curtailment contracts.",
        },
        cost_to_verify:
          "Auction results and load data are published each year; the answer arrives with the auctions through 2028.",
        falsification: {
          supporter_flip:
            "If PJM capacity prices fell well below their caps by the 2030-31 auction while data-center load kept connecting, because new supply and flexible-load contracts kept pace, the claim that data centers will keep pushing bills up would fail.",
          skeptic_flip:
            "If capacity prices stayed at their caps through 2030 with reserve margins still short, and data centers rarely signed curtailment contracts, the view that flexibility and new supply will absorb the growth would no longer hold.",
          common_ground:
            "Both sides agree that forecast data-center demand requires new generation and transmission, and that loads able to cut their draw at peak hours need less new capacity built for them.",
          live_disagreement:
            "Whether new supply and flexible-load contracts can keep pace with data-center demand, or capacity and transmission costs stay high for years and land on every customer.",
        },
      },
      evidence: [
        {
          id: "pjm-2028-auction",
          title: "2028-29 Auction Puts $6.3 Billion on Data-Center Demand",
          description:
            "PJM's capacity auction held in July 2026, buying power for June 2028 through May 2029, produced about $16.4 billion in total capacity charges, about $6.3 billion of which the market monitor attributes to demand driven by data centers. A consumer advocate told The Hill that consumers can expect their bills to be elevated for the foreseeable future at about the same amount.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "The Hill (July 15, 2026), on PJM's auction for the 2028-29 delivery year and the market monitor's attribution",
          sourceUrl: "https://thehill.com/policy/technology/5970522-data-center-power-costs-pjm/amp/",
          reasoning:
            "Auction results are hard data, and they show the cost continuing two years out. The data-center share is the monitor's attribution rather than PJM's, and the article reports it secondhand.",
        },
        {
          id: "jlarc-residential-projection",
          title: "Virginia Auditors: Typical Residential Bills Could Rise $14-$37 a Month by 2040",
          description:
            "Virginia's Joint Legislative Audit and Review Commission estimates that a typical Dominion Energy residential customer could see generation- and transmission-related costs rise by $14 to $37 a month in constant dollars by 2040. It finds data centers' increased demand will likely raise system costs for all customers, through new generation and transmission, harder-to-secure supply and greater exposure to price spikes from imported power.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source: "Joint Legislative Audit and Review Commission, 'Data Centers in Virginia' (December 2024)",
          sourceUrl: "https://jlarc.virginia.gov/landing-2024-data-centers-in-virginia.asp",
          reasoning:
            "An independent legislative auditor with a commissioned engineering study, in the state with the most data-center capacity. It is a projection to 2040 under assumed build-outs, and covers one utility.",
        },
        {
          id: "duke-flexible-load",
          title: "Duke: 76 GW of Flexible Load Could Fit on the Existing Grid",
          description:
            "Norris, Profeta, Patiño-Echeverri and Cowie-Haskell of Duke University estimate that across 22 of the largest US balancing authorities, serving about 95% of US peak load, 76 gigawatts of new load, about 10% of current aggregate peak demand, could be added if it accepted curtailment averaging 0.25% of the year, about 1.7 hours per event; 98 gigawatts at 0.5% and 126 gigawatts at 1%. Norris said such flexibility could reduce the cost of capacity expansion.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Norris, Profeta, Patiño-Echeverri & Cowie-Haskell, 'Rethinking Load Growth', Nicholas Institute, Duke University (February 2025), as reported by POWER Magazine",
          sourceUrl: "https://www.powermag.com/duke-researchers-grid-flexibility-key-to-accommodate-load-growth",
          reasoning:
            "A transparent university study, but a system-level estimate of headroom, not of bills. It does not model transmission constraints, which a grid-software executive said could wipe out much of the potential, and it depends on data centers actually accepting curtailment.",
        },
        {
          id: "texas-sb6-curtailment",
          title: "Texas Requires New Large Loads to Accept Emergency Curtailment",
          description:
            "Texas Senate Bill 6, signed in June 2025, requires data centers and other large non-critical loads of 75 megawatts or more connecting to ERCOT to accept curtailment during firm load-shed events and to install shutoff equipment as a condition of interconnection. It also sets a $100,000 minimum interconnection fee, mandatory study fees, disclosure of duplicate requests and cost-sharing rules, and a voluntary program in which large loads ramp down or switch to backup generation on request.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source: "Utility Dive, 'Texas law gives grid operator power to disconnect data centers during crisis' (June 25, 2025)",
          sourceUrl:
            "https://www.utilitydive.com/news/texas-law-gives-grid-operator-power-to-disconnect-data-centers-during-crisis/751587/",
          reasoning:
            "Shows that rules can make large loads flexible and share interconnection costs. It is a law, not a measured effect on bills, and uptake of the voluntary program is unknown, so directness is low.",
        },
      ],
    },
    {
      id: "who-pays",
      title: "Who Pays for the Grid",
      short_summary:
        "Utilities and regulators are writing special tariffs and contracts for data centers, and tech companies have pledged to cover their costs. The dispute is whether those terms keep costs off households or shift them there.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Where regulators have looked, data centers are paying their way, and new rules make them pay more. Virginia's legislative auditors found in 2024 that current rates appropriately allocate costs to the customers responsible for them, data centers included. Ohio regulators approved an AEP Ohio tariff in July 2025 that makes new data centers above 25 megawatts pay for at least 85% of their subscribed capacity for up to 12 years, whether or not they use it, with exit fees, which the commission said safeguards other customers from the cost of underused investments. Google, Microsoft, Meta, Amazon, Oracle, xAI and OpenAI signed a March 2026 pledge to build or buy their own generation and cover the cost of grid upgrades.",
      proponent_rebuttal:
        "The rules invite the opposite. Utilities earn returns on new infrastructure, so they compete to offer data centers attractive rates; Harvard's Electricity Law Initiative reviewed nearly 50 regulatory proceedings and found that rate structures and confidential utility contracts can shift Big Tech's energy costs onto the public. Ohio is one state; most have no such tariff. The White House pledge is voluntary, with no enforcement mechanism, and electricity rates are set by the states. Even the Virginia auditors who found costs fairly allocated today expect data-center demand to raise system costs for all customers.",
      crux: {
        id: "cost-allocation",
        title: "The Cost-Allocation Test",
        question: "Do special tariffs and contracts make data centers pay the full cost of the grid built for them?",
        description:
          "Whether data centers raise household bills depends heavily on rate design: who pays for new transmission, generation and capacity, and who is left holding the cost if a data center leaves or never fully arrives. Some states have adopted minimum-demand tariffs and exit fees; elsewhere the terms sit in confidential contracts.",
        methodology:
          "For each utility with large data-center load, compare the revenue collected from data-center customers under their tariffs and contracts with the cost of service attributable to them, using cost-of-service studies filed with state commissions, and track what residential customers pay if a contracted load leaves early.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Cost-of-service studies filed with state utility commissions, comparing revenue from data-center tariffs and contracts with the transmission, generation and capacity costs attributable to those customers, utility by utility, including what happens when a contracted load exits early.",
        },
        cost_to_verify:
          "Cost-of-service studies are filed in rate cases, but special contracts are often confidential; a full audit needs commission access.",
        falsification: {
          supporter_flip:
            "If cost-of-service studies across the main data-center utilities showed data-center revenue covering the costs attributed to those customers, with minimum-demand terms and exit fees protecting other classes, the claim that rules shift data-center costs onto households would fail.",
          skeptic_flip:
            "If cost-of-service studies showed data-center contracts recovering less than the costs attributed to them, with the gap recovered from residential customers, the claim that data centers pay their way would no longer hold.",
          common_ground:
            "Both sides agree that rate design decides who pays for grid expansion, and that minimum-demand charges and exit fees can protect other customers from the cost of underused investments.",
          live_disagreement:
            "Whether the tariffs and contracts actually in force recover data centers' full costs, or leave households paying for grid capacity built mainly for a few large companies.",
        },
      },
      evidence: [
        {
          id: "harvard-special-contracts",
          title: "Harvard Review: Utility Deals Can Shift Data-Center Costs to the Public",
          description:
            "Eliza Martin and Ari Peskoe of Harvard's Electricity Law Initiative reviewed nearly 50 regulatory proceedings on data-center rates. They argue utilities see data centers as a profitable opportunity because they earn returns on new infrastructure, that traditional rates spread the cost of system expansion across all ratepayers, and that rate structures and secret utility-data center contracts may shift Big Tech's energy costs onto the public.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Martin & Peskoe, 'Extracting Profits from the Public: How Utility Ratepayers Are Paying for Big Tech's Power', Harvard Environmental & Energy Law Program (March 5, 2025)",
          sourceUrl:
            "https://eelp.law.harvard.edu/extracting-profits-from-the-public-how-utility-ratepayers-are-paying-for-big-techs-power/",
          reasoning:
            "A systematic legal review of real proceedings by an academic program. It documents how costs can shift rather than measuring how much has, and confidential contracts limit what can be checked.",
        },
        {
          id: "pledge-voluntary",
          title: "Tech Companies' Ratepayer Pledge Has No Enforcement",
          description:
            "On March 4, 2026, Google, Microsoft, Meta, Oracle, xAI, OpenAI and Amazon signed a White House pledge to build or buy new generation for their data centers, cover the cost of infrastructure upgrades, and negotiate separate rate structures so costs are not passed to consumers. The AP reported that the voluntary agreement has no enforcement mechanisms, and experts said it is likely unenforceable at the federal level because electricity is mostly regulated by the states.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source: "Associated Press, via Broadband Breakfast, 'Tech Companies Vow to Cover Electricity Costs of Data Centers in White House Deal' (March 4, 2026)",
          sourceUrl:
            "https://broadbandbreakfast.com/tech-companies-vow-to-cover-electricity-costs-of-data-centers-in-white-house-deal/",
          reasoning:
            "Wire reporting of a public document. That the pledge is unenforceable weakens one protection, but it does not show costs being shifted; it is also evidence that companies accept the obligation in principle, so directness is low.",
        },
        {
          id: "aep-ohio-tariff",
          title: "Ohio Makes New Data Centers Pay for 85% of Subscribed Capacity",
          description:
            "On July 9, 2025, the Public Utilities Commission of Ohio approved an AEP Ohio tariff requiring new data centers with loads above 25 megawatts to pay for at least 85% of their subscribed monthly capacity for up to 12 years regardless of actual use, with a four-year ramp-up, exit fees and financial-assurance requirements. The commission said the settlement safeguards other customers from the cost-shifting risks of underused investments. The Data Center Coalition objected to singling out one industry.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "POWER Magazine, 'Regulator Approves AEP Ohio's Landmark Data Center Tariff' (July 2025), on the PUCO order of July 9, 2025",
          sourceUrl: "https://www.powermag.com/regulator-approves-aep-ohios-landmark-data-center-tariff/",
          reasoning:
            "A binding state order, not a pledge, showing that rate design can put the risk of stranded grid investment on data centers. It applies to one utility, and its effect on residential bills is not yet measured.",
        },
        {
          id: "jlarc-full-cost",
          title: "Virginia Auditors: Data Centers Currently Pay Their Full Cost of Service",
          description:
            "Virginia's Joint Legislative Audit and Review Commission found that data centers are currently paying their full cost of service: a commissioned study found that current rates appropriately allocate costs to the customers responsible for incurring them, including data-center customers. The same review warns that data centers' growing demand will likely raise system costs for all customers.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source: "Joint Legislative Audit and Review Commission, 'Data Centers in Virginia' (December 2024)",
          sourceUrl: "https://jlarc.virginia.gov/landing-2024-data-centers-in-virginia.asp",
          reasoning:
            "An independent audit of the largest data-center market, which finds today's allocation fair. It is a 2024 snapshot of one state, and the same auditors expect future system costs to rise for everyone.",
        },
      ],
    },
  ],
  references: [
    {
      title: "PJM's 2026 load forecast trims near-term peaks after stricter data-center vetting (POWER Magazine)",
      url: "https://www.powermag.com/pjm-dials-back-near-term-load-outlook-but-maintains-steep-long-term-growth-trajectory/",
    },
    {
      title: "Fortune: Data centers and electricity costs (July 26, 2026)",
      url: "https://fortune.com/2026/07/26/data-centers-electricity-costs-cheaper-7billion-buildout-ai-demand/",
    },
  ],
};
