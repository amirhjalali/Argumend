export const aiEnergyWaterFootprintData = {
  id: "ai-energy-water-footprint",
  title: "AI's Energy & Water Footprint",
  question: "Is AI using too much electricity and water?",
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "How much water does each ChatGPT query use?",
    "How much water does an AI chatbot drink?",
    "Will AI data centers use as much electricity as whole countries?",
    "Is AI's energy and water use serious enough to warrant intervention?",
    "Are data centers raising my electric bill?",
  ],
  meta_claim:
    "AI's electricity and water use is a serious problem, for the climate, for local water supplies and for household power bills, and it warrants government intervention.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: the IEA's April 2026 update put data-centre
  // electricity at 485 TWh in 2025 (up 17%; AI-focused sites up 50%) and
  // ~950 TWh by 2030; Google's 2026 Environmental Report (30 June 2026) shows
  // its electricity use up 37% and its emissions up 18% in 2025; PJM's market
  // monitor blames data centres for $6.5bn of the $16.4bn 2027/28 capacity bill.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "The world's data centres used 17% more electricity in 2025 than in 2024, and the ones built for AI used 50% more, the International Energy Agency reported in April 2026. Yet Google measures its median Gemini text prompt at 0.24 Wh of energy and 0.26 mL of water, about five drops. Both numbers are real. The fight is over which one tells the story: the tiny cost of each prompt, or the fast-growing total and the gas plants, water and power bills that come with it.",
    confidence: 88,
    source:
      "IEA, 'Key Questions on Energy and AI' (April 2026), executive summary; Google, 'Measuring the environmental impact of AI inference' (21 August 2025)",
    sourceUrl:
      "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary",
  },
  simple_case: [
    "The answer bears on electricity bills: in the PJM grid, which serves 13 states and Washington, D.C., the market monitor blamed data centres for $6.5 billion of a $16.4 billion bill for power capacity in 2027-28. It also bears on whether coal and gas plants close on schedule, and on the water supply of towns where new data centres are going up.",
    "Data centres are still a small share of the world's electricity, and each prompt keeps getting cheaper to run. What both sides watch is the total, where it is built, and who carries its costs.",
  ],
  tags: ["ai", "energy", "water", "data-centers", "sustainability"],
  pillars: [
    // =========================================================================
    // PILLAR 1: The numbers. Tiny per prompt, big and growing in total.
    // =========================================================================
    {
      id: "scale-of-demand",
      title: "Tiny per Prompt, Huge in Total",
      short_summary:
        "A single chatbot text prompt uses about as much power as a TV running for a few seconds, and that cost has fallen tenfold or more a year. But total data-centre electricity rose 17% in 2025 and is on course to double by 2030. Whether efficiency will catch up with use, or keep being swamped by it, is the first split.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Judge AI by what each use costs, and the alarm fades. Google measured its median Gemini text prompt at 0.24 Wh in May 2025, less than nine seconds of television, after a 33-fold cut in energy per prompt in a single year. The IEA reported in April 2026 that energy per AI task has been falling 'by at least an order of magnitude annually', and that if every ordinary web search were answered by a simple AI text query, it would take less than 4 TWh a year, under 1% of what data centres use. Data centres were about 1.5% of the world's electricity in 2024 and, in the IEA's central case, about 3% in 2030. That is a fast-growing load, but a small one next to industry, heating, cooling and electric cars. The IEA also finds that well-documented uses of AI could save more than 13 exajoules of energy by 2035, about 3% of global final energy use. A technology that gets ten times cheaper to run every year is not the climate problem; dirty grids are.",
      proponent_rebuttal:
        "The per-prompt number is the wrong number. What the climate and the grid feel is the total, and the total is surging: the IEA counted 485 TWh of data-centre electricity in 2025, up 17% in a year, with AI-focused sites up 50%, and projects about 950 TWh by 2030. In the US, Berkeley Lab found data centres used 4.4% of the country's electricity in 2023 and projects 6.7% to 12% by 2028. Efficiency has not bent that curve, because cheaper prompts invite more of them and heavier ones: the IEA notes that video generation, reasoning and agents 'can consume hundreds or thousands of times more energy per query than simple text generation.' Google's own electricity use rose 37% in 2025, its biggest jump ever, and is up more than 250% since 2019, in the same years its per-prompt cost collapsed. And 'only 3% of global electricity' hides where the load lands: the US and China take most of the growth, in clusters that strain particular grids.",
      crux: {
        id: "rebound-vs-efficiency",
        title: "Do Efficiency Gains Outrun Demand Growth?",
        question:
          "Will efficiency gains shrink AI's total energy use, or will heavier use keep outrunning them?",
        description:
          "Energy per AI task is falling at least tenfold a year, while total data-centre electricity rose 17% in 2025. Whether falling per-task costs eventually flatten the total, or keep inviting more and heavier use (video, reasoning, agents), decides whether AI's energy demand is a passing surge or a lasting one.",
        methodology:
          "Track absolute data-centre and AI-focused electricity use year by year (IEA, Berkeley Lab, utility load filings) against per-task energy disclosed by model providers for text, reasoning, image and video. If per-task gains outrun usage growth, totals flatten; if totals keep climbing as per-task energy falls, efficiency is being spent on more use.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Annual IEA and Berkeley Lab totals for data-centre electricity, set beside per-task energy figures that model providers disclose for text, reasoning and video, showing whether totals flatten as each task gets cheaper.",
        },
        cost_to_verify: "$30K (longitudinal data analysis), but needs fuller disclosure by AI companies",
        falsification: {
          supporter_flip:
            "If total data-centre electricity flattened by the late 2020s while AI use kept growing, as per-task gains caught up with demand, the case that AI's energy use is a lasting problem would weaken.",
          skeptic_flip:
            "If totals kept climbing toward the IEA's 950 TWh for 2030 or beyond, with video, reasoning and agents eating the per-prompt savings, the per-prompt figure would look like a distraction from the total.",
          common_ground:
            "Both sides agree energy per AI task is falling fast, that total data-centre electricity rose 17% in 2025, and that data centres are still a small share of the world's electricity.",
          live_disagreement:
            "Whether per-task efficiency will eventually shrink AI's total energy use, or whether cheaper and more capable AI keeps inviting so much more use that the total keeps rising.",
        },
      },
      evidence: [
        {
          id: "iea-2026-growth",
          title: "IEA, April 2026: Data-Centre Electricity Rose 17% in 2025, AI Data Centres 50%",
          description:
            "The International Energy Agency's April 2026 update, 'Key Questions on Energy and AI', reports that data-centre electricity demand 'grew by 17% in 2025, in line with IEA projections', while consumption by AI-focused data centres 'surged 50%'. It projects data-centre use 'roughly doubling from 485 TWh in 2025 to 950 TWh in 2030, accounting for around 3% of global electricity demand', with AI-focused use tripling. Big tech capital spending passed $400 billion in 2025 and is expected to rise another 75% in 2026. The agency says supply-chain bottlenecks make 'more aggressive near-term scenarios' less likely, but sees possible upside after 2030.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "International Energy Agency, 'Key Questions on Energy and AI' (April 2026), executive summary",
          sourceUrl:
            "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary",
          reasoning:
            "The most authoritative independent count, and the most recent. It shows the total growing fast even as per-task energy falls. It does not show harm by itself: 3% of world electricity in 2030 is still a small share, and the 2030 figure is a projection the IEA says it will keep revising.",
        },
        {
          id: "google-electricity-2025",
          title: "Google's Electricity Use Rose 37% in 2025, to 43.6 TWh, Up 250% Since 2019",
          description:
            "Google's 2026 Environmental Report (30 June 2026) shows total electricity consumption of 43,586,600 MWh in 2025, against 31,713,900 MWh in 2024. The company writes that 'our total electricity consumption grew by 37% in 2025, up from 27% in 2024', and that 'since 2019, our total electricity demand has increased by over 250%'. Those are the same years in which Google says energy per Gemini prompt fell 33-fold.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source: "Google, '2026 Environmental Report' (30 June 2026), environmental metrics tables",
          sourceUrl: "https://sustainability.google/google-2026-environmental-report/",
          reasoning:
            "Self-reported, but against the company's interest, so more credible than its efficiency claims. It is the clearest single case of per-prompt efficiency and total consumption moving in opposite directions. It covers all of Google's services, not AI alone, so it shows the direction of the total rather than AI's exact share.",
        },
        {
          id: "doe-lbnl-projection",
          title: "Berkeley Lab: US Data Centres Used 4.4% of US Power in 2023, Could Hit 6.7–12% by 2028",
          description:
            "The DOE-funded 2024 Berkeley Lab report finds US data centres used 176 TWh in 2023, 4.4% of national electricity, and projects 325 to 580 TWh by 2028, 6.7% to 12% of the total, with servers for AI the main driver of the increase.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "Shehabi et al., '2024 United States Data Center Energy Usage Report', Lawrence Berkeley National Laboratory (LBNL-2001637, December 2024); summarized by the US Department of Energy",
          sourceUrl:
            "https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers",
          reasoning:
            "The primary US government-funded estimate, with a transparent method. The 2028 range is wide because the uncertainty is real; even the low end means a near-doubling in five years.",
        },
        {
          id: "gemini-per-prompt",
          title: "Google, August 2025: Median Gemini Prompt Uses 0.24 Wh and 0.26 mL, a 33-Fold Cut in a Year",
          description:
            "Google estimates 'the median Gemini Apps text prompt uses 0.24 watt-hours (Wh) of energy, emits 0.03 grams of carbon dioxide equivalent (gCO2e), and consumes 0.26 milliliters (or about five drops) of water', which it compares to 'watching TV for less than nine seconds'. Over May 2024 to May 2025, it says, energy and carbon per median prompt 'dropped by 33x and 44x'. The count includes idle machines, host CPUs and cooling overhead, but the company notes that 'the data and claims have not been verified by an independent third-party.'",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 5,
            directness: 7,
          },
          source:
            "Google Cloud blog, 'Measuring the environmental impact of AI inference' (21 August 2025), with technical paper arXiv:2508.15734",
          sourceUrl:
            "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference/",
          reasoning:
            "The most detailed per-prompt disclosure by any major company, and wider in scope than active-chip-only estimates. But it is unaudited, self-reported, covers a median text prompt only (not images, video, reasoning or training) and says nothing about total use.",
        },
        {
          id: "iea-per-task-efficiency",
          title: "IEA 2026: Energy per AI Task Falling at Least Tenfold a Year",
          description:
            "The IEA writes that 'the energy efficiency of AI is improving at a rate unprecedented in energy history', with energy per AI task 'dropping by at least an order of magnitude annually in recent years', and that 'simple text queries now typically consume less electricity than running a television over the same period of time.' If every conventional web search were done as a simple AI text query, it estimates, that would use 'less than 4 terawatt-hours (TWh) of electricity annually', under 1% of data-centre consumption. The same page warns that video generation, reasoning and agentic tasks 'can consume hundreds or thousands of times more energy per query than simple text generation.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "International Energy Agency, 'Key Questions on Energy and AI' (April 2026), executive summary",
          sourceUrl:
            "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary",
          reasoning:
            "Independent confirmation that per-task costs are falling fast and that chatbot text is a small load. It cuts both ways: the same passage says the heavier uses now spreading cost hundreds to thousands of times more per query, which is the rebound the other side points to.",
        },
        {
          id: "iea-global-share",
          title: "IEA: Data Centres Used About 1.5% of World Electricity in 2024, Rising to About 3% by 2030",
          description:
            "The IEA's 2025 'Energy and AI' report estimated data centres used about 415 TWh in 2024, around 1.5% of global electricity, and projected about 945 TWh by 2030. Its April 2026 update kept that path: about 950 TWh, 'around 3% of global electricity demand', by 2030. On these numbers data centres remain a small slice of total demand, and of total demand growth.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "IEA, 'Energy and AI' (April 2025); IEA, 'Key Questions on Energy and AI' (April 2026)",
          sourceUrl: "https://www.iea.org/reports/energy-and-ai",
          reasoning:
            "Supports the 'manageable share' reading from the same authority the other side cites. A small global share does not settle the question, though: the load is concentrated in the US and China and in particular grids, where its effects are larger than a world average suggests.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: What powers it. Clean contracts or new gas?
    // =========================================================================
    {
      id: "power-source",
      title: "What Powers the Boom: Clean Contracts or New Gas?",
      short_summary:
        "Tech companies sign record clean-energy deals. Grids short of new connections are also turning to gas, including power plants built on data-centre sites. Whether AI's growth is being met by clean power or by fossil fuels decides most of its climate cost.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The biggest AI builders are also the biggest buyers of clean energy, and their spending is pulling new clean supply onto the grid. Google signed contracts for more than 12 GW of new clean energy in 2025, its largest year ever and more than the two previous years combined, and cut its operational emissions by 2% even as its electricity use rose 37%. Since 2019, it says, its emissions per gigawatt-hour have fallen 47%. Data-centre contracts are reviving nuclear plants and paying for new reactors, batteries and long-duration storage: the IEA reports a data-centre operator signed the largest battery deal ever by energy capacity, four times the previous record. Gas built for data centres is real, but the IEA expects 15 to 27 GW of onsite gas by 2030, mostly in the US, a small fraction of a power system that is adding clean capacity far faster. Blaming AI for gas plants gets the cause wrong: slow grid connections and permitting push developers to gas, and the fix is to build grids faster, not to slow AI.",
      proponent_rebuttal:
        "Clean-energy contracts are accounting; the electrons serving a new data centre at 2 a.m. come from whatever the grid has, and right now new demand is arriving faster than clean supply can connect. The IEA counts 47 GW of onsite gas projects proposed for US data centres in 2026, about a fifth of them already clearing land or under construction, and a 70% surge in global gas-turbine orders in 2025. Google, the most transparent of the big buyers, still ran on carbon-free power in only about 65% of hours in 2025, no better than in 2021, and its total emissions rose 18% to about 14.5 million tonnes, driven by the steel, concrete and chips of the build-out. Gas plants built in the late 2020s run for decades. Once a grid has committed to them, the emissions are locked in long after any single model gets more efficient.",
      crux: {
        id: "marginal-grid-emissions",
        title: "Marginal vs. Average Grid Emissions",
        question:
          "Is new data-center demand met by clean power, or by new gas and delayed coal retirements?",
        description:
          "Does new AI demand get met by new clean generation, or by keeping fossil plants open and building new gas, on the grid and on data-centre sites? The answer decides whether AI's growth is a climate problem or a neutral load on a grid that is getting cleaner.",
        methodology:
          "Track the generation that serves new data-centre load by region: deferred coal retirements, new gas tied to data-centre interconnections or built onsite, and new clean capacity under data-centre contracts. Compare the emissions per MWh of that marginal supply with the grid average and with hourly (not annual) clean-energy matching. Repeat across PJM, ERCOT and the other main clusters.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Region-by-region tracking, in PJM, ERCOT and other clusters, of the generation that serves new data-centre load: deferred coal retirements, onsite and grid gas built for it, and contracted clean capacity, with hourly emissions per MWh set against the grid average.",
        },
        cost_to_verify: "$50K (grid and interconnection data analysis)",
        falsification: {
          supporter_flip:
            "If regional tracking showed new data-centre load mostly matched hour by hour with new clean generation and storage, with few deferred coal retirements and little gas built for it, AI would look like one more load on a grid that is getting cleaner.",
          skeptic_flip:
            "If most of the 47 GW of proposed onsite gas got built and utilities kept postponing coal closures to serve data centres, the clean-energy contracts would look like bookkeeping beside a dirtier grid.",
          common_ground:
            "Both sides agree the big AI companies are among the largest buyers of clean energy, that some new data-centre demand is being met with gas, and that what matters for the climate is the emissions of the power actually serving the new load.",
          live_disagreement:
            "How much of AI's new demand, region by region and hour by hour, is met by new clean supply, and how much by gas plants and coal plants kept open, which only tracing interconnection-tied capacity decisions can settle.",
        },
      },
      evidence: [
        {
          id: "iea-onsite-gas",
          title: "IEA 2026: 47 GW of Onsite Gas Power Proposed for US Data Centres; Gas Turbine Orders Up 70%",
          description:
            "The IEA reports that 'constrained by slow grid connections, data centre developers in the United States are pushing forward projects with onsite natural gas-based power generation', and that satellite tracking shows 'around one-fifth have started land clearing or construction.' Its chart puts the 2026 US pipeline of such projects at 47 GW. It estimates '15‑27 GW of onsite natural gas may power data centres by 2030, mostly in the United States', and notes 'a 70% surge in gas turbine orders in 2025.' Reliable onsite gas power requires overbuilding generation by 30% to 70% relative to demand.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "International Energy Agency, 'Key Questions on Energy and AI' (April 2026), executive summary",
          sourceUrl:
            "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary",
          reasoning:
            "Independent and direct: fossil generation built specifically for data centres. It counts proposals and a projected range, not plants running; the IEA also notes most data centres would rather connect to the grid, so how much onsite gas gets built is still open.",
        },
        {
          id: "google-emissions-2025",
          title: "Google's Emissions Rose 18% in 2025, to 14.5 Million Tonnes; Clean Power in 65% of Hours",
          description:
            "Google reports total 'ambition-based' emissions of about 14.5 million tCO2e in 2025, up 18% from 2024, 'primarily driven by increases in supply chain activities that supported the rapid expansion of our business.' It writes: 'We recognize that our climate impact has been growing alongside the unprecedented growth of AI.' Its data centres ran on carbon-free energy in 65% of hours in 2025, against 65% in 2021 and 66% in 2024. Its emissions have risen every year since 2020.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source: "Google, '2026 Environmental Report' (30 June 2026)",
          sourceUrl: "https://sustainability.google/google-2026-environmental-report/",
          reasoning:
            "An admission against interest by the company with the most detailed disclosures. Most of the rise is in the supply chain (construction and hardware), not electricity, so it shows the build-out's carbon cost more than the grid's. Hourly clean-power matching held flat rather than falling, which neither side's strongest claim predicts.",
        },
        {
          id: "google-clean-contracts",
          title: "Google Signed 12 GW of New Clean Energy in 2025 and Cut Operational Emissions 2% as Power Use Rose 37%",
          description:
            "Google says it signed agreements for 'over 12 GW of net-new clean energy in 2025—the largest annual total in our history and more than our total procurement from the previous two years combined', and that more than 25 contracted projects came online in 2025, adding nearly 2 GW. It reports cutting operational emissions by 2% year over year while electricity use grew 37%, and a 47% fall in emissions per gigawatt-hour since 2019.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 7,
          },
          source: "Google, '2026 Environmental Report' (30 June 2026)",
          sourceUrl: "https://sustainability.google/google-2026-environmental-report/",
          reasoning:
            "Shows a big AI builder paying for new clean supply at record scale, and operational emissions falling while use soared. Self-reported, and contracted gigawatts are not generation: Google notes actual output may differ from contracts. Annual matching also hides the hours when the grid serving its data centres burns gas.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: The water. How much, and where?
    // =========================================================================
    {
      id: "water-footprint",
      title: "The Water: How Much, and Where?",
      short_summary:
        "Estimates of the water behind one chatbot answer run from a fifteenth of a teaspoon to 45 millilitres, depending on who counts and what they include. Nationally, data centres use a sliver of US fresh water. Locally, in places like Northern Virginia and dry parts of the West, the draw is rising fast. Whether it matters depends on which watershed you live in.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The thirsty-chatbot story does not survive the numbers. Google measures its median Gemini prompt at 0.26 mL of water, about five drops, and OpenAI says the average ChatGPT query uses about 0.000085 gallons, 'roughly one fifteenth of a teaspoon'. Added up, all US data centres consumed about 0.2% of the nation's fresh water in 2023 by one analyst's count, and only 0.04% inside the data centres themselves. Farming and power plants use orders of magnitude more. Most of the scary estimates add in water evaporated at distant power plants, which is a reason to clean up the grid, not to blame the chatbot. The companies are also moving: Google says its water projects replenished about 7.7 billion gallons in 2025, 78% of its freshwater use, and Microsoft has pledged to replenish more water than it uses in each district where it operates. Treat water as a siting problem for a handful of places, not a reason to fear AI.",
      proponent_rebuttal:
        "National averages hide where the water comes from. Google's data centres consumed about 10.5 billion gallons of water in 2025, and its freshwater use rose 37% in one year; 13% of its freshwater withdrawals came from sources at high risk of depletion or scarcity. In Northern Virginia, the world's largest data-centre cluster, data-centre water use rose 63% from 2019 to 2023, to close to 2 billion gallons. Counting water at the power plant is not a trick: thermoelectric plants evaporate water to make the electricity, and the federal Berkeley Lab report puts the indirect water footprint of US data centres at about 211 billion gallons in 2023. Per-prompt figures also depend on who sets the boundary. Mistral's peer-reviewed lifecycle study found 45 mL per 400-token answer, roughly 170 times Google's figure. Without mandatory, standard disclosure, nobody outside the companies can check these numbers, and towns are asked to approve data centres without them.",
      crux: {
        id: "local-water-stress",
        title: "Aggregate Share vs. Local Watershed Stress",
        question:
          "Where data centers cluster, is their water use a meaningful share of local supply?",
        description:
          "Nationally, data centres use a tiny share of US fresh water. The question that decides whether water rules are warranted is local: in the specific watersheds where data centres cluster, is their draw a meaningful share of the utility's supply and the basin's renewable yield?",
        methodology:
          "For each major data-centre cluster, measure onsite consumptive water use as a share of the local utility's potable supply and the watershed's renewable yield, and check the overlap with USGS and Drought Monitor water-stress designations. Compare with the reclaimed-water and air-cooled alternatives used elsewhere.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Onsite consumptive draw at each cluster, measured against the utility's potable capacity and the watershed's renewable yield, and mapped onto USGS and Drought Monitor water-stress designations.",
        },
        cost_to_verify: "$0 (analysis of public water filings), but most operators do not publish site-level data",
        falsification: {
          supporter_flip:
            "If watershed-level data showed data-centre clusters drawing only a trivial share of local supply, or running mainly on reclaimed water and air cooling where water is scarce, the national 0.2% figure would be close to the whole story.",
          skeptic_flip:
            "If site-level data in places like Northern Virginia or the dry West showed data centres taking a material share of local supply during droughts, the tiny national share would understate the local cost.",
          common_ground:
            "Both sides agree data centres use a small share of US fresh water next to farming and power plants, that per-prompt water figures vary widely with what is counted, and that water stress is a local, watershed-by-watershed problem.",
          live_disagreement:
            "Whether, in the watersheds where data centres actually cluster, their consumptive draw is a meaningful share of local supply, which only site-level disclosure mapped against water-stress data can resolve.",
        },
      },
      evidence: [
        {
          id: "google-water-2025",
          title: "Google's Data Centres Consumed 10.5 Billion Gallons of Water in 2025; Freshwater Use Up 37%",
          description:
            "Google's 2026 Environmental Report shows total water consumption of 10,869 million gallons in 2025 (up from 8,135 million in 2024), of which 10,523 million was at data centres. Freshwater consumption was 9,947 million gallons, and the company writes that it 'rose by 37% in 2025 as we expanded our data center infrastructure to meet the demands of AI'. Of its freshwater withdrawals, 13% came from sources at high risk of water depletion or scarcity. Its replenishment projects returned about 7.7 billion gallons, 78% of its freshwater consumption.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 8,
            directness: 7,
          },
          source: "Google, '2026 Environmental Report' (30 June 2026), water tables",
          sourceUrl: "https://sustainability.google/google-2026-environmental-report/",
          reasoning:
            "Hard, company-wide numbers that show the total rising fast and some of it drawn from stressed sources. Replenishment projects are counted by a third-party method but do not return water to the same aquifer at the same time. Google's totals cover all its services, so AI's share is not broken out.",
        },
        {
          id: "indirect-water-lbnl",
          title: "Northern Virginia Data Centres Used Close to 2 Billion Gallons in 2023, Up 63% Since 2019",
          description:
            "The Environmental and Energy Study Institute reports that data-centre water use in Northern Virginia rose 63% from 2019 to 2023, to close to 2 billion gallons, and that a large data centre can use up to 5 million gallons a day. Drawing on the federal Berkeley Lab report, it puts the indirect water footprint of US data centres, the water used to generate their electricity, at roughly 211 billion gallons in 2023.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Environmental and Energy Study Institute, 'Data Centers and Water Consumption' (25 June 2025), citing the 2024 Berkeley Lab report and Northern Virginia utility data",
          sourceUrl:
            "https://www.eesi.org/articles/view/data-centers-and-water-consumption",
          reasoning:
            "A nonpartisan synthesis of federal and utility data showing a real, fast-rising local draw in the biggest cluster. It does not say what share of local supply that is, which is the crux, and the indirect figure depends on the power mix.",
        },
        {
          id: "li-water-study",
          title: "UC Riverside Study: Training GPT-3 Evaporated an Estimated 700,000 Litres; AI Could Withdraw 4.2–6.6 Billion m³ in 2027",
          description:
            "Li, Yang, Islam and Ren estimate that training GPT-3 in Microsoft's US data centres 'can directly evaporate 700,000 liters of clean freshwater', and project that 'global AI demand is projected to account for 4.2-6.6 billion cubic meters of water withdrawal in 2027.' The work underlies the most-quoted estimate: in September 2024 The Washington Post, working with the UC Riverside researchers, ran their estimate for a 100-word GPT-4 email under the headline 'A bottle of water per email'.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source:
            "Li, Yang, Islam & Ren, 'Making AI Less Thirsty', arXiv:2304.03271 (v5, March 2025), accepted by Communications of the ACM; The Washington Post (18 September 2024)",
          sourceUrl: "https://arxiv.org/abs/2304.03271",
          reasoning:
            "The first independent method for AI's water footprint, and the source of most of the alarm. Its figures are modelled from published efficiency ratios and include water at power plants, and they predate the hardware and efficiency gains of 2024-25, so per-answer estimates from it run far above later company measurements. Its 2027 figure counts withdrawal, much of which is returned, not consumption.",
        },
        {
          id: "mistral-lifecycle",
          title: "Mistral's Lifecycle Study, July 2025: 45 mL of Water per 400-Token Answer",
          description:
            "French AI company Mistral, with the consultancy Carbone 4 and France's ecological transition agency ADEME, and peer-reviewed by Resilio and Hubblo, estimated that a 400-token response from its Le Chat assistant accounts for 1.14 gCO2e and 45 mL of water across its life cycle. Training and 18 months of use of its Mistral Large 2 model came to 20.4 ktCO2e and 281,000 cubic metres of water.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source:
            "Mistral AI, 'Our contribution to a global environmental standard for AI' (22 July 2025)",
          sourceUrl:
            "https://mistral.ai/news/our-contribution-to-a-global-environmental-standard-for-ai",
          reasoning:
            "The first lifecycle study by an AI company with outside reviewers, and its per-answer water figure is roughly 170 times Google's. The gap comes mostly from boundaries: a lifecycle count includes making the chips and generating the electricity. It shows that 'how much water does a prompt use' has no single answer until disclosure is standardized.",
        },
        {
          id: "national-freshwater-share",
          title: "One Analyst's Count: US Data Centres Used About 0.2% of the Nation's Fresh Water in 2023",
          description:
            "Using USGS national water-use data and Berkeley Lab data-centre figures, writer Andy Masley estimates that 'data centers in the U.S. consumed approximately 0.2% of the nation's freshwater in 2023', and that 'only 0.04% of America's freshwater in 2023 was consumed inside data centers themselves'. Farming and thermoelectric power plants use far more.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Andy Masley, 'The AI water issue is fake' (11 October 2025), using USGS and Berkeley Lab data",
          sourceUrl:
            "https://blog.andymasley.com/i/175834975/using-ai-can-save-way-more-water-than-is-used-in-data-centers",
          reasoning:
            "Built on reliable federal inputs, but it is one writer's synthesis published on a blog, so reliability is middling. It rebuts the national scarcity framing and does not address the local question this crux turns on.",
        },
        {
          id: "openai-per-query",
          title: "OpenAI, June 2025: Average ChatGPT Query Uses 0.34 Wh and About a Fifteenth of a Teaspoon of Water",
          description:
            "OpenAI's chief executive, Sam Altman, wrote that 'the average query uses about 0.34 watt-hours, about what an oven would use in a little over one second', and 'about 0.000085 gallons of water; roughly one fifteenth of a teaspoon.' No method or data was published with the figures.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 2,
            replicability: 2,
            directness: 6,
          },
          source: "Sam Altman, 'The Gentle Singularity' (blog post, June 2025)",
          sourceUrl: "https://blog.samaltman.com/the-gentle-singularity",
          reasoning:
            "In line with Google's measured figure, and the only number OpenAI has given for the world's most-used chatbot. But it is a single sentence from the company's CEO with no method, no boundary and no audit, so it carries little weight on its own.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Who pays, and should government step in?
    // =========================================================================
    {
      id: "intervention-warranted",
      title: "Who Pays the Power Bill, and Should Government Step In?",
      short_summary:
        "Even granting a footprint, the fight is over whether markets and company pledges will handle it, or whether rules are needed: making data centres pay for the grid built for them, requiring energy and water disclosure, and steering sites away from stressed grids and watersheds. Electricity bills have made this a live political issue.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The fixes are arriving without a federal crackdown, through the ordinary tools of utility regulation and corporate self-interest. Utilities and state regulators are writing large-load tariffs that make new data centres sign long contracts and pay for the capacity they reserve. Microsoft pledged in January 2026 that 'we'll pay our way to ensure our datacenters don't increase your electricity prices', asking regulators to set its rates high enough to cover the costs it creates, and to replenish more water than it uses in each district. The capacity-price spike in PJM came from a market design that was slow to add supply, and data-centre contracts are now paying for the new generation, storage and grid upgrades that grids needed anyway. AI-specific rules on energy or water would hit a strategically important industry, push investment abroad, and target a load that is still a small share of the total.",
      proponent_rebuttal:
        "Households are paying now. PJM's independent market monitor found data-centre load added $7.3 billion to the 2026-27 capacity auction and $16.6 billion across two auctions, and attributed $6.5 billion, 40%, of the $16.4 billion 2027-28 bill to data centres, about $6.2 billion of it for data centres not yet built. 'Data center load growth is the primary reason for recent and expected capacity market conditions,' the monitor wrote; 'the current conditions are not the result of organic load growth.' Those costs flow into the bills of 65 million people in 13 states and Washington, D.C. A pledge from one company is not a rule, and a voluntary disclosure picks its own boundary, as the 170-fold gap between Google's and Mistral's water figures shows. Mandatory reporting, tariffs that put grid costs on the loads that cause them, and siting rules for stressed watersheds are modest steps that make the costs visible without banning anything.",
      crux: {
        id: "household-bills",
        title: "The Ratepayer Test",
        question:
          "Are data centers pushing up household electricity bills, and should they pay the full cost?",
        description:
          "Where data centres cluster, are their grid and capacity costs landing on ordinary customers, and will large-load tariffs and company pledges keep those costs on the data centres? How much of the cost belongs on the new loads, and how much on everyone who uses a grid that also gets upgraded, is a value judgment as well as an accounting question.",
        methodology:
          "Separate, in utility rate cases and capacity-auction filings, the costs caused by data-centre load from those caused by fuel prices, ageing infrastructure and other demand. Compare residential bill growth in regions with and without large data-centre growth, and track whether new large-load tariffs actually assign grid and capacity costs to the data centres that trigger them.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Rate cases and capacity-auction filings in PJM, ERCOT and other regions that split costs caused by data-centre load from fuel and ageing-grid costs, plus residential bill trends where data centres are and are not growing. How costs should be shared between new loads and existing customers is a value choice no data settles.",
        },
        cost_to_verify: "$0 (public market-monitor reports and utility filings)",
        falsification: {
          supporter_flip:
            "If large-load tariffs and pledges like Microsoft's kept residential bills in data-centre regions growing no faster than elsewhere, the case for new government rules on AI's power use would weaken.",
          skeptic_flip:
            "If bills in PJM and other data-centre regions kept rising faster than elsewhere, with market monitors tracing the rise to data-centre load, the claim that tariffs and pledges will handle it would be hard to hold.",
          common_ground:
            "Both sides agree PJM's market monitor attributes billions in capacity costs to data-centre load, that utilities are writing special tariffs for large new loads, and that disclosure of AI energy and water use is voluntary and uneven.",
          live_disagreement:
            "Whether new tariffs and company pledges will keep data-centre costs off household bills, or whether disclosure mandates and cost rules are needed, and how much of a shared grid's cost new loads should bear.",
        },
      },
      evidence: [
        {
          id: "pjm-monitor-data-centers",
          title: "PJM's Market Monitor: Data Centres Caused $6.5 Billion of the $16.4 Billion 2027-28 Capacity Bill",
          description:
            "Monitoring Analytics, PJM's independent market monitor, attributed $6.5 billion, or 40%, of the $16.4 billion cost of the December 2025 capacity auction (for 2027-28) to data-centre load, about $6.2 billion of it for data centres not yet built (Utility Dive, 7 January 2026). Its October 2025 report found data-centre load added $7.3 billion to the 2026-27 auction and $16.6 billion across two auctions, and said: 'Data center load growth is the primary reason for recent and expected capacity market conditions' and 'the current conditions are not the result of organic load growth' (Utility Dive, 2 October 2025).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Monitoring Analytics (PJM independent market monitor) reports, as reported by Utility Dive (2 October 2025; 7 January 2026)",
          sourceUrl: "https://www.utilitydive.com/news/data-centers-pjm-capacity-auction/808951/",
          reasoning:
            "An independent market watchdog tracing a large, specific cost to data-centre load. It is a counterfactual estimate (what prices would have been without forecast data-centre demand), it partly rests on forecasts of load that may never arrive, and capacity charges are one part of a household bill, so it does not by itself measure the rise in residential bills.",
        },
        {
          id: "microsoft-pay-our-way",
          title: "Microsoft, January 2026: 'We'll Pay Our Way' So Its Data Centres Don't Raise Household Power Prices",
          description:
            "In 'Building Community-First AI Infrastructure', Microsoft president Brad Smith pledged: 'We'll pay our way to ensure our datacenters don't increase your electricity prices', with the goal 'to ensure that the electricity cost of serving our datacenters is not passed on to residential customers.' Microsoft said it would ask utilities and regulators to set its rates high enough to cover its costs, and pledged: 'We'll minimize our water use and replenish more of your water than we use', targeting a 40% improvement in data-centre water-use intensity by 2030.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 5,
          },
          source:
            "Microsoft On the Issues, Brad Smith, 'Building Community-First AI Infrastructure' (13 January 2026)",
          sourceUrl:
            "https://blogs.microsoft.com/on-the-issues/2026/01/13/community-first-ai-infrastructure/",
          reasoning:
            "Shows the biggest builders conceding the cost-shifting concern and offering to carry it, which supports the view that tariffs and pressure can work without new laws. It is a pledge, not a result, binding only through whatever rates regulators set, and it covers one company.",
        },
      ],
    },
  ],
};
