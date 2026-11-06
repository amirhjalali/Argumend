export const carbonTaxEffectivenessData = {
  id: "carbon-tax-effectiveness",
  title: "Carbon Tax Effectiveness",
  question: "Does a carbon tax cut emissions cheaply enough to be worth the backlash?",
  meta_claim:
    "A carbon tax is an effective and efficient policy for reducing greenhouse-gas emissions, worth the political cost of keeping it.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: Canada set its consumer fuel charge to zero on
  // 1 April 2025 and paid a final Canada Carbon Rebate; the World Bank's
  // State and Trends 2026 (19 May 2026) puts direct carbon pricing at just
  // over 29% of global emissions across 87 policies, with an average price
  // of nearly $21/tCO2e; the EU's carbon border adjustment mechanism has
  // applied in its definitive regime since 1 January 2026.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "On 1 April 2025 Canada set its consumer carbon price to zero, ending the federal fuel levy and the rebate cheques that went with it. Worldwide, carbon prices now cover just over 29% of greenhouse gas emissions, but the average price is nearly $21 a tonne, the World Bank reported in May 2026: far below the $50-100 a tonne by 2030 that a 2017 commission led by Joseph Stiglitz and Nicholas Stern said the Paris goals need. The fight is over whether a price high enough to matter would cut emissions cheaply, and whether voters would let it stand.",
    confidence: 90,
    source:
      "Department of Finance Canada, 'Removing the consumer carbon price, effective April 1, 2025' (22 March 2025); World Bank, 'Direct Carbon Pricing Covers Nearly One Third of Global Emissions' (19 May 2026); High-Level Commission on Carbon Prices (2017)",
    sourceUrl:
      "https://www.canada.ca/en/department-finance/news/2025/03/removing-the-consumer-carbon-price-effective-april-1-2025.html",
  },
  simple_case: [
    "The answer bears on what households pay for petrol and heating, on whether governments price carbon or fall back on rules and subsidies, and on what exporters pay at the EU border, where a carbon levy on imports of steel, cement, aluminium and fertiliser has applied since 1 January 2026.",
    "The two sides split over how much of the cuts in places like Sweden and British Columbia the tax itself caused; whether prices at the recommended $50-100 a tonne would bring deep cuts; how much of any cut leaks abroad; and whether a tax that pays its revenue back to households can survive elections, after Canada scrapped its consumer price in 2025.",
  ],
  aliases: [
    "Is a carbon tax an effective, efficient way to cut emissions?",
    "Does a carbon tax reduce emissions?",
  ],
  tags: ["carbon-tax", "climate", "emissions", "economics", "policy"],
  pillars: [
    // =========================================================================
    // PILLAR 1: What happened where it was tried
    // =========================================================================
    {
      id: "does-it-cut-emissions",
      title: "Record: Did the Taxes Cut Emissions Where They Were Tried?",
      short_summary:
        "Studies of real carbon prices find measurable cuts: a 2024 review of 80 causal evaluations found significant reductions in at least 17 of 21 schemes, and Sweden's transport emissions fell almost 11% against a synthetic control. But the cuts are modest, a few percent in British Columbia, and tangled with recessions, other rules and fuel prices.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Most carbon taxes in force are priced far below the level needed to bend emissions sharply, and the measured reductions are small: single-digit percentages, tangled with recessions, parallel regulations and fuel-price swings. British Columbia's tax, North America's flagship case, shows only about a 5% aggregate reduction in the largest meta-analysis. Jessica Green's 2021 review of the ex-post literature found aggregate cuts 'generally between 0% and 2% per year.' A few percent of avoided emissions is not the rapid decarbonization the climate problem demands.",
      proponent_rebuttal:
        "The largest systematic review to date, 483 effect sizes from 80 causal ex-post evaluations across 21 schemes, finds that introducing a carbon price produced 'immediate and substantial emission reductions for at least 17 of these policies,' even though prices were low in most cases. Quasi-experimental designs isolate the tax's own effect: Sweden's transport emissions fell almost 11% against a synthetic control built from similar OECD countries, and British Columbia's manufacturers cut emissions 4% while their output rose. The effect is modest because prices are modest; the tool works, it is under-used.",
      crux: {
        id: "causal-emission-effect",
        title: "Causal Emission Effect vs. Counterfactual",
        question:
          "How much of the observed emission cuts did carbon taxes actually cause?",
        description:
          "The load-bearing question is whether observed emission drops are caused by the carbon price or by coincident factors (recessions, other regulations, technology trends). Resolving it requires a credible counterfactual: what emissions would have been without the tax.",
        methodology:
          "Use difference-in-differences and synthetic-control designs comparing taxed jurisdictions to matched untaxed controls; aggregate causal ex-post estimates in a meta-analysis and correct for publication bias. Decompose any reduction into scale (less output) vs. technique (cleaner output) effects.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Difference-in-differences and synthetic-control studies comparing taxed jurisdictions with matched untaxed ones, pooled in a meta-analysis corrected for publication bias, like the review of 483 effect sizes.",
        },
        cost_to_verify: "$0 (analysis of published ex-post evaluations)",
        falsification: {
          supporter_flip:
            "If well-identified studies found taxed jurisdictions' emission drops fully explained by recessions, parallel regulations or fuel-price swings, with the carbon-price effect falling to zero once those are controlled for, the claim that the tax itself cuts emissions would fail.",
          skeptic_flip:
            "If new studies matched the meta-analysis finding of significant cuts in at least 17 of 21 schemes after publication-bias correction, Sweden's synthetic-control estimate held, and BC plants kept cutting intensity while output rose, confounding would be hard to credit for the drops.",
          common_ground:
            "Both sides agree that observed aggregate emission declines have real non-tax drivers (recessions, other regulations, technology trends) and that any honest estimate must net those out against a credible counterfactual.",
          live_disagreement:
            "How large the tax-caused share of observed reductions is once confounders are removed, which only more well-identified estimates across many schemes, split into less output versus cleaner output, can pin down.",
        },
      },
      evidence: [
        {
          id: "meta-analysis-effectiveness",
          title: "Nature Communications 2024: Carbon Prices Cut Emissions 5-21% Across 21 Schemes (4-15% After Bias Correction)",
          description:
            "A systematic review of 483 effect sizes from 80 causal ex-post evaluations across 21 carbon pricing schemes finds 'statistically significant emissions reductions range between -5% to -21% across the schemes (-4% to -15% after correcting for publication bias),' with 'immediate and substantial emission reductions for at least 17 of these policies' despite low prices in most cases.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "Döbbeling-Hildebrandt et al., 'Systematic review and meta-analysis of ex-post evaluations on the effectiveness of carbon pricing,' Nature Communications 15:4147 (16 May 2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11099057/",
          reasoning:
            "The most comprehensive synthesis of causal studies, peer-reviewed and corrected for publication bias. The effects are cumulative over years and vary widely by scheme, so the range says the tools work at some size, not how big the effect would be at higher prices.",
        },
        {
          id: "sweden-transport",
          title: "Sweden: Transport CO2 Fell Almost 11% Against a Synthetic Control (AEJ 2019)",
          description:
            "Using a synthetic control built from comparable OECD countries, CO2 emissions from Swedish transport fell almost 11% after the carbon tax plus VAT, with about 6 percentage points attributable to the carbon tax alone. The carbon-tax elasticity was about three times the ordinary price elasticity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Andersson, 'Carbon Taxes and CO2 Emissions: Sweden as a Case Study,' American Economic Journal: Economic Policy 11(4):1-30 (2019)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/pol.20170144",
          reasoning:
            "A top journal and a transparent quasi-experimental design, widely cited. It covers one sector in one country with one of the world's highest carbon taxes, so it is strong on the causal effect and weaker as a guide to economy-wide results elsewhere.",
        },
        {
          id: "bc-manufacturing-technique",
          title: "BC Manufacturing: Emissions Fell 4% While Output Rose 1.8% (2022)",
          description:
            "Plant-level microdata show the BC carbon tax lowered manufacturing GHG emissions by 4 percent, through a 6% fall in emission intensity, while plant output rose on average by 1.8%: cleaner production rather than less of it.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Ahmadi, Yamazaki & Kabore, 'How Do Carbon Taxes Affect Emissions? Plant-Level Evidence from Manufacturing,' Environmental and Resource Economics (2022)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9000005/",
          reasoning:
            "A peer-reviewed plant-level study that answers the claim that cuts must come from lost output. The effect is small and confined to manufacturing, so it does not speak to the economy-wide size of the cut.",
        },
        {
          id: "bc-aggregate-modest",
          title: "BC's Carbon Tax: About a 5% Aggregate Cut, Among the Smaller Effects in the 2024 Meta-Analysis",
          description:
            "In the same meta-analysis, British Columbia's carbon tax, North America's first major one, is estimated at -5.4% [95% CI -9.6% to -1.2%], among the smaller effects, reflecting its modest price level and the difficulty of cutting aggregate (not just transport) emissions.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "Döbbeling-Hildebrandt et al., Nature Communications (2024), reported pooled estimate for the BC carbon tax",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11099057/",
          reasoning:
            "The same authoritative source cutting the other way: the flagship North American tax delivered a single-digit aggregate cut over years. It shows the size of real-world effects so far; it does not show what a higher price would do.",
        },
        {
          id: "green-ex-post-meta-review",
          title: "Green 2021: Review of 37 Ex-Post Studies Found Cuts of 0-2% a Year",
          description:
            "Jessica Green's 2021 meta-review in Environmental Research Letters examined ex-post quantitative evaluations of carbon pricing policies since 1990 and found only 37 studies that assess the actual effects on emissions, most of them in Europe. 'The majority of studies suggest that the aggregate reductions from carbon pricing on emissions are limited—generally between 0% and 2% per year,' with considerable variation across sectors; carbon taxes performed better than emissions trading schemes. Green concludes that 'the evidence indicates that carbon pricing has a limited impact on emissions.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Jessica F. Green, 'Does carbon pricing reduce emissions? A review of ex-post analyses,' Environmental Research Letters 16, 043004 (24 March 2021)",
          sourceUrl: "https://iopscience.iop.org/article/10.1088/1748-9326/abdae9",
          reasoning:
            "The skeptics' strongest measured evidence: pooled across the literature, real carbon prices have cut emissions slowly. It does not separate 'the price was too low' from 'pricing is the wrong tool,' and 37 studies concentrated in Europe is a thin base; the 2024 meta-analysis of 80 causal evaluations finds larger cumulative effects.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 2: Price level and efficiency
    // =========================================================================
    {
      id: "is-it-efficient",
      title: "Price: Would a High Enough Tax Be the Cheapest Way to Cut?",
      short_summary:
        "Thousands of economists call a carbon tax the cheapest lever for cutting emissions. But the world's average carbon price is nearly $21 a tonne, against the $50-100 by 2030 the Stiglitz-Stern commission said Paris needs, so the cheap-and-deep claim has rarely been tested at the price it assumes.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Efficiency on paper is not results. The High-Level Commission on Carbon Prices concluded that the Paris goals need about $40-80 a tonne by 2020 and $50-100 by 2030; in 2026 the World Bank put the average carbon price at nearly $21. Governments have had decades to raise prices and mostly have not, because the price voters see at the pump is the price they vote on. Meanwhile regulations, standards and subsidies have driven much of the actual clean-energy transition, from cheap solar to electric cars. An instrument that works only at a price no government will set is not the efficient tool in practice.",
      proponent_rebuttal:
        "More than 3,500 economists, including 28 Nobel laureates and former Federal Reserve chairs, signed a 2019 statement calling a carbon tax 'the most cost-effective lever to reduce carbon emissions at the scale and speed that is necessary.' One economy-wide price lets every firm and household find its own cheapest cut, avoiding the hidden costs of mandates that pick technologies. Sweden's response to its carbon tax was about three times its response to ordinary fuel-price changes, which suggests households and firms react to a durable price signal. The remedy for low prices is a higher, predictable price, not a retreat to costlier tools.",
      crux: {
        id: "price-vs-required-level",
        title: "Price Gap vs. Required Level",
        question:
          "Would raising carbon prices to recommended levels deliver deep cuts, or do responses level off?",
        description:
          "The decisive disagreement is whether carbon taxes underperform because pricing is the wrong tool or because the price has simply been set too low. If raising the price closes the gap, efficiency is vindicated; if not, the instrument itself is at fault.",
        methodology:
          "Compare observed carbon prices to model-derived Paris-consistent price corridors; estimate the marginal abatement response to price increases (elasticities) and test whether projected reductions at the recommended price reach required emission pathways.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Estimates of how abatement responds as prices rise, projected to the $50-100/tCO2 Paris-consistent corridor and checked against the emission pathways that corridor is meant to reach.",
        },
        cost_to_verify: "$0 (compare published price corridors to abatement elasticities)",
        falsification: {
          supporter_flip:
            "If abatement flattened as prices rose, so that a price in the $50-100 a tonne corridor bought little more than today's low prices, the problem would be the instrument rather than the price level, and 'just raise the price' would no longer rescue the efficiency case.",
          skeptic_flip:
            "If schemes that reached high prices showed cuts in line with Sweden's elasticity, about three times the ordinary price response, and mandates showed higher costs per tonne avoided, the cost-effectiveness case for pricing would be hard to set aside.",
          common_ground:
            "Both sides agree that deployed carbon prices have sat well below the Stiglitz-Stern Paris-consistent corridor and that, at those low levels, real-world abatement has been modest.",
          live_disagreement:
            "Whether raising the price to the recommended corridor would bring deep cuts, or responses would level off before then; few schemes have ever priced that high, so the evidence is thin.",
        },
      },
      evidence: [
        {
          id: "economists-statement",
          title: "3,500+ Economists, Including 28 Nobel Laureates: 'The Most Cost-Effective Lever' (2019)",
          description:
            "The Economists' Statement on Carbon Dividends, signed by more than 3,500 economists including 28 Nobel laureates and former Federal Reserve and Treasury officials, calls a carbon tax 'the most cost-effective lever to reduce carbon emissions at the scale and speed that is necessary.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source:
            "Economists' Statement on Carbon Dividends, Climate Leadership Council (Wall Street Journal, January 2019)",
          sourceUrl: "https://clcouncil.org/economists-statement/",
          reasoning:
            "A strong signal of expert judgment on cost-effectiveness, but a position statement rather than a measurement, so replicability is low. It speaks to the theory of efficiency, not to whether governments will set the price it assumes.",
        },
        {
          id: "price-gap-stiglitz-stern",
          title: "Stiglitz-Stern Commission 2017: Paris Needs $40-80 a Tonne by 2020 and $50-100 by 2030",
          description:
            "The High-Level Commission on Carbon Prices, led by Joseph Stiglitz and Nicholas Stern, found in 2017 that a Paris-consistent price needs to reach about $40-80/tCO2 by 2020 and $50-100 by 2030; most real-world prices have been well below this floor, limiting actual abatement.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "High-Level Commission on Carbon Prices (Stiglitz, Stern et al.), World Bank / Carbon Pricing Leadership Coalition (2017)",
          sourceUrl:
            "https://web.archive.org/web/20260614223945/https://www.worldbank.org/en/news/press-release/2017/05/29/new-global-pathway-on-carbon-pricing-can-shift-finance-to-sustainable-investments-world-bank",
          reasoning:
            "Sets the price the efficiency case assumes. It is a model-based target rather than a measured result, and it cuts against the claim only by showing how far deployed prices fall short, not that pricing fails in principle.",
        },
        {
          id: "world-bank-average-price-2026",
          title: "World Bank 2026: The Average Carbon Price Is Nearly $21 a Tonne",
          description:
            "The World Bank's State and Trends of Carbon Pricing 2026 (19 May 2026) reports that 'the average carbon price is now nearly $21/tCO2e,' after prices 'have grown 7% since last year's edition and have doubled over the last decade.' Direct carbon pricing covers 'just over 29% of global greenhouse gas emissions.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "World Bank, 'Direct Carbon Pricing Covers Nearly One Third of Global Emissions' (press release on State and Trends of Carbon Pricing 2026, 19 May 2026)",
          sourceUrl:
            "https://www.worldbank.org/en/news/press-release/2026/05/19/direct-carbon-pricing-covers-nearly-one-third-of-global-emissions",
          reasoning:
            "The authoritative global tally shows the price gap persists nine years after the commission's target was set. It describes what governments have chosen, not how emissions would respond at higher prices, so directness on the crux is moderate.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 3: Leakage
    // =========================================================================
    {
      id: "leakage-and-durability",
      title: "Leakage: Do the Cuts Just Move Abroad?",
      short_summary:
        "A carbon tax can push production, and its emissions, to countries without one. The OECD finds trade leakage offsets about 13% of domestic cuts on average, partly because the most exposed industries get free permits. The EU has taxed the carbon in imports at its border since January 2026 to close the gap.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "A national carbon tax can cut emissions on paper while steel mills, cement kilns and their emissions move to untaxed countries. The measured leakage looks moderate largely because governments have shielded the most exposed industries: the OECD's own analysis notes those sectors 'receive free allocation and other forms of government support.' Take away the shield and the true exposure shows. The EU's decision to build a border carbon levy, in force since 1 January 2026, is itself an admission that leakage threatens a unilateral price, and a border tax invites trade retaliation.",
      proponent_rebuttal:
        "Measured leakage is moderate: on average it 'offsets 13% of domestic emission reductions,' leaving the large majority of cuts intact (OECD, 2024). Where it is a risk, the fix is being built. The EU's carbon border adjustment mechanism, 'the EU's tool to address carbon leakage by ensuring that the price of imports reflects their embedded carbon emissions,' now covers cement, iron and steel, aluminium, fertilisers, electricity and hydrogen, and gives trading partners a reason to price carbon themselves. Leakage is a design problem with a design answer.",
      crux: {
        id: "net-global-effect",
        title: "Net Global vs. Territorial Effect",
        question:
          "How much of a carbon tax's cut leaks abroad as production moves to untaxed countries?",
        description:
          "The crux is whether a carbon tax reduces global emissions or relocates them. If leakage offsets only a small share, territorial cuts are mostly real global cuts; if it is large once protections for exposed industries are removed, much of the benefit is an accounting shift.",
        methodology:
          "Estimate leakage by comparing territorial and consumption-based emission accounts and tracing carbon embodied in trade, sector by sector, before and after free allocation is phased out and border adjustments start.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Territorial against consumption-based emission accounts that trace the carbon embodied in traded steel, cement and aluminium, before and after the EU phases out free permits and its border levy applies.",
        },
        cost_to_verify: "$0 (territorial vs. consumption emissions accounting)",
        falsification: {
          supporter_flip:
            "If consumption-based accounts showed leakage offsetting most of a jurisdiction's territorial cuts once free permits for exposed industries ended, with production and its emissions moving to untaxed countries, territorial reductions would not be global ones.",
          skeptic_flip:
            "If plant-level and trade studies kept average leakage near the OECD's 13% after free allocation phased out, and the EU border levy held it there, leakage would look like a design problem rather than a reason the tax fails.",
          common_ground:
            "Both sides agree that carbon leakage is real and non-zero, that exposed industries such as steel and cement have been shielded with free permits, and that border adjustments are meant to replace that shield.",
          live_disagreement:
            "Whether leakage stays near 13% once the shield is removed, or grows large enough to erase much of the global benefit of a unilateral carbon price.",
        },
      },
      evidence: [
        {
          id: "leakage-moderate",
          title: "OECD 2024: Trade Leakage Offsets About 13% of Domestic Emission Cuts on Average",
          description:
            "OECD analysis of plant-level data finds that 'on average carbon leakage through international trade offsets 13% of domestic emission reductions': real but moderate, leaving most of the territorial cut as a genuine reduction. The authors suggest free allocation and other government support for exposed sectors may explain why leakage is moderate.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "OECD ECOSCOPE (Teusch, D'Arcangelo, Kruse and Pisu), 'Does carbon leakage through international trade reduce the effectiveness of carbon pricing policies?' (3 September 2024)",
          sourceUrl:
            "https://oecdecoscope.blog/2024/09/03/does-carbon-leakage-through-international-trade-reduce-the-effectiveness-of-carbon-pricing-policies/",
          reasoning:
            "Reputable institutional analysis grounded in plant-level data, and it bounds leakage at a moderate share. The authors' own explanation, free permits for exposed sectors, means the 13% describes shielded schemes; it may not hold once the shield is removed.",
        },
        {
          id: "cbam-definitive-2026",
          title: "EU Has Taxed the Embedded Carbon in Imports Since 1 January 2026 to Counter Leakage",
          description:
            "The EU's carbon border adjustment mechanism, which the European Commission describes as 'the EU's tool to address carbon leakage by ensuring that the price of imports reflects their embedded carbon emissions,' has applied in its definitive regime since 1 January 2026, covering cement, iron and steel, aluminium, fertilisers, electricity and hydrogen.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "European Commission, Taxation and Customs Union, 'Carbon Border Adjustment Mechanism'",
          sourceUrl:
            "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
          reasoning:
            "The world's largest carbon market judged leakage serious enough to tax imports at the border, which supports the skeptics' view that a unilateral price leaks without protection. Proponents read the same fact as the fix arriving. Its effect on leakage is untested, so directness is moderate.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 4: Politics — can it survive voters?
    // =========================================================================
    {
      id: "political-durability",
      title: "Politics: Can a Carbon Tax Survive Voters?",
      short_summary:
        "Australia repealed its carbon tax in 2014. Canada ended its consumer carbon price in April 2025, despite paying households a rebate. Yet carbon pricing keeps spreading: 87 policies worldwide in 2026, seven more than a year earlier. Whether a tax can rise high enough and last long enough is the political crux.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A carbon tax is the climate policy voters can see, and they vote against it. Australia's Senate repealed the country's carbon tax 39-32 in July 2014 after an 'axe the tax' campaign. Canada's consumer carbon price was built as the model of a dividend tax, with a Canada Carbon Rebate paid back to households; it was set to zero on 1 April 2025 anyway. If even a rebated tax cannot survive a change of leader, the price will never climb to the $50-100 a tonne the efficiency case needs, and climate policy is better spent on tools that stick.",
      proponent_rebuttal:
        "Carbon pricing is spreading, not dying. The World Bank counted 87 carbon pricing policies in 2026, seven more than a year earlier, covering just over 29% of global emissions and raising more than $107 billion for governments in 2025; 'all large middle-income economies have now either implemented or are planning direct carbon pricing instruments.' Canada kept pricing large emitters, calling it 'a pillar of Canada's plan.' The consumer price fell to how it was sold and seen, not to its effect on emissions, and repeals are design lessons: keep the price visible as a dividend, raise it on a known path, and pair it with border adjustments.",
      crux: {
        id: "rebate-durability",
        title: "The Durability Test",
        question:
          "Can a carbon tax that pays its revenue back to households survive elections?",
        description:
          "The efficiency case needs a price that rises for decades. The crux is whether carbon taxes, especially those that return revenue to households, survive changes of government long enough to reach the prices that matter, or whether visible consumer carbon prices are repealed before they bite.",
        methodology:
          "List every national and subnational carbon tax since 1990 with its design (rebated or not, price path, sectors covered) and whether it survived each change of government. Compare survival and price growth for rebated consumer taxes, unrebated taxes and industry-only pricing.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Survival records of every carbon tax since 1990 sorted by design: whether revenue went back to households, how high the price rose, and whether the tax outlasted a change of government, from Sweden and British Columbia to Australia and Canada.",
        },
        cost_to_verify: "$0 (published records of carbon pricing policies, such as the World Bank's dashboard)",
        falsification: {
          supporter_flip:
            "If survival records showed rebated consumer carbon taxes repealed or frozen about as often as unrebated ones, and none reaching $50 a tonne without a backlash that ended it, the hope of a high, durable price would look political fantasy.",
          skeptic_flip:
            "If the record showed most carbon taxes surviving changes of government and rising over time, with Australia and Canada's consumer price as exceptions tied to their design, the claim that voters always kill it would lose its footing.",
          common_ground:
            "Both sides agree Australia repealed its carbon tax in 2014, that Canada ended its consumer carbon price on 1 April 2025 while keeping pricing for large emitters, and that the number of carbon pricing policies worldwide keeps growing.",
          live_disagreement:
            "Whether visible consumer carbon taxes can last long enough to reach the prices the efficiency case needs, or whether carbon pricing survives only where voters do not see it, on industry.",
        },
      },
      evidence: [
        {
          id: "canada-consumer-price-removed",
          title: "Canada Set Its Consumer Carbon Price to Zero on 1 April 2025, Ending the Rebate Too",
          description:
            "The Department of Finance announced on 22 March 2025 that the federal consumer fuel levy would cease to apply from 1 April 2025, and that the federal government was ending the requirement for provinces and territories to maintain a consumer carbon price. 'Eligible Canadians will receive a final Canada Carbon Rebate payment, starting April 22.' The release said 'a price on pollution for large emitters will continue to be a pillar of Canada's plan.'",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source:
            "Department of Finance Canada, 'Removing the consumer carbon price, effective April 1, 2025' (22 March 2025)",
          sourceUrl:
            "https://www.canada.ca/en/department-finance/news/2025/03/removing-the-consumer-carbon-price-effective-april-1-2025.html",
          reasoning:
            "The government's own notice. Canada's consumer price came with rebates to households, the design advocates had offered as the answer to backlash, and it still ended. It speaks to durability, not to whether the tax cut emissions while it ran, and industrial pricing continues.",
        },
        {
          id: "australia-repeal",
          title: "Australia's Senate Repealed the Carbon Tax 39-32 in July 2014",
          description:
            "Australia became the first country to repeal a carbon tax, with the Senate voting 39-32 in July 2014 after the 'axe the tax' campaign, two years after the tax took effect.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source:
            "Al Jazeera, 'Australia's Abbott repeals carbon tax' (17 July 2014), reporting the Senate repeal vote",
          sourceUrl:
            "https://www.aljazeera.com/news/2014/7/17/australias-abbott-repeals-carbon-tax",
          reasoning:
            "An uncontested historical fact about how fast a visible carbon tax can be undone. It speaks to political durability rather than to whether the tax reduced emissions while in force.",
        },
        {
          id: "world-bank-coverage-2026",
          title: "World Bank 2026: 87 Carbon Pricing Policies, Seven More in a Year, Raised Over $107 Billion in 2025",
          description:
            "The World Bank's State and Trends of Carbon Pricing 2026 finds 'there are now 87 carbon pricing policies globally, increasing by seven since last year,' covering just over 29% of global greenhouse gas emissions, about one-third if instruments under development are implemented. Carbon pricing raised revenue 'rising from below $30 billion in 2016 to mobilizing more than $107 billion' for government budgets in 2025, and 'all large middle-income economies have now either implemented or are planning direct carbon pricing instruments.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "World Bank, 'Direct Carbon Pricing Covers Nearly One Third of Global Emissions' (19 May 2026); State and Trends of Carbon Pricing 2026",
          sourceUrl:
            "https://www.worldbank.org/en/news/press-release/2026/05/19/direct-carbon-pricing-covers-nearly-one-third-of-global-emissions",
          reasoning:
            "Shows carbon pricing gaining ground worldwide even as some consumer taxes fall. Much of the growth is emissions trading on industry and power rather than visible consumer taxes, so it says less about whether a tax people see at the pump can last.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Removing the consumer carbon price, effective April 1, 2025 — Department of Finance Canada",
      url: "https://www.canada.ca/en/department-finance/news/2025/03/removing-the-consumer-carbon-price-effective-april-1-2025.html",
    },
    {
      title: "State and Trends of Carbon Pricing 2026 — World Bank",
      url: "https://www.worldbank.org/en/publication/state-and-trends-of-carbon-pricing",
    },
    {
      title: "Systematic review and meta-analysis of ex-post evaluations on the effectiveness of carbon pricing — Nature Communications (2024)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11099057/",
    },
    {
      title: "Carbon Border Adjustment Mechanism — European Commission",
      url: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
    },
  ],
};
