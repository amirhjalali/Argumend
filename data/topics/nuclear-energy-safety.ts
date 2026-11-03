export const nuclearEnergySafetyData = {
  id: "nuclear-energy-safety",
  title: "Nuclear Power and Climate",
  question: "Should nuclear power be expanded to help decarbonize electricity?",
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "What do we do with nuclear waste that stays dangerous for thousands of years?",
    "Was Germany wrong to shut down its nuclear plants?",
    "Is nuclear power too expensive?",
    "Should we build more nuclear reactors?",
  ],
  meta_claim:
    "Nuclear energy should be expanded as a key tool for decarbonizing electricity generation.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: about 80 reactors are under construction worldwide,
  // 39 of them in China (World Nuclear Association, 2 Nov 2026); a May 2025
  // US executive order calls for 10 new large reactors under construction by
  // 2030; Lazard's 2026 LCOE+ puts new US nuclear at $175-255/MWh.
  last_updated: "2026-11-03",
  // ── The lede: the live fact, then what the fight is over ──
  keystone_fact: {
    statement:
      "About 80 nuclear reactors are being built around the world, 39 of them in China, and a 2025 US executive order calls for 10 new large ones under construction by 2030. America's last two, Vogtle 3 and 4 in Georgia, cost Georgia Power about $10.7 billion against its original $4.4 billion estimate, before financing. The fight is over whether new reactors can be built fast and cheap enough to matter for the climate, and how much rare disasters and long-lived waste should weigh against the fossil-fuel deaths nuclear would displace.",
    confidence: 90,
    source:
      "World Nuclear Association, 'Plans for New Reactors Worldwide' (updated 2 November 2026); Executive Order 14302 (23 May 2025); Southern Company 2024 Annual Report, Note 2",
    sourceUrl:
      "https://world-nuclear.org/information-library/current-and-future-generation/plans-for-new-reactors-worldwide",
  },
  // ── The summary above the crux sheet: what the map turns on ──
  simple_case: [
    "Both sides accept that nuclear plants deliver firm, low-carbon power, with the US fleet running at about 91% of capacity in 2025, that routine operation kills far fewer people than coal or gas, and that recent Western builds ran badly over budget and behind schedule.",
    "They split over whether nuclear's cost and build-time problems can be fixed with scale and repeated designs, or leave wind and solar plus storage the faster route per dollar; over whether a near-zero-carbon grid needs firm plants such as nuclear to ride out wind and solar lulls, or can lean on storage, transmission and overbuild for less; and over how much weight a rare, severe accident and thousands of years of waste stewardship should carry against the steady toll of the fossil fuels nuclear would displace.",
    "The first two are questions that the next builds and grid models can answer; the last is a weighing of values that the deaths-per-terawatt-hour tally informs but does not decide.",
  ],
  pillars: [
    {
      id: "safety-record",
      title: "Is It Safe Enough?",
      short_summary:
        "Counted per unit of electricity, nuclear's death toll is close to wind's and solar's and far below coal's, even with Chernobyl and Fukushima included. Germany's post-Fukushima shutdown was followed by more coal burning. The worry is the rare accident that empties a region, and waste that must be isolated for millennia. How much those should weigh is a question of values.",
      image_url:
        "https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Average death rates hide the tail. A single accident can force mass evacuation and leave land unusable for years. The WHO-led Chernobyl Forum projected up to about 4,000 eventual cancer deaths among the most-exposed groups, and other models project many more across Europe. Fukushima's radiation toll was small, but the evacuation itself caused serious harm, including higher mortality among elderly evacuees. High-level waste stays dangerous for thousands of years: EPA's standards for the proposed Yucca Mountain repository set dose limits out to 1 million years. A technology whose worst case is a lost region and whose waste outlasts any institution asks future generations to carry risks that per-terawatt-hour averages do not show.",
      proponent_rebuttal:
        "Count the deaths and nuclear is among the safest sources of power: about 0.03 deaths per terawatt-hour against 24.6 for coal, 18.4 for oil and 2.8 for gas, close to wind and solar. UNSCEAR expects no discernible rise in cancers attributable to Fukushima's radiation. The real comparison is with what replaces nuclear. When Germany shut down about half its nuclear capacity after Fukushima, the lost output was replaced mainly by coal and imports, at a social cost Jarvis, Deschenes and Jha put at about $12 billion a year, over 70% of it from deaths caused by air pollution; even the largest estimates of the accident and waste costs avoided were far smaller. Waste is small in volume and contained, and deep geological disposal is an engineering task, not an unknown.",
      crux: {
        id: "deaths-per-twh",
        title: "The Tail-Risk Weighing",
        question:
          "Do nuclear's rare-disaster and waste risks outweigh the fossil-fuel deaths it would displace?",
        description:
          "Comprehensive accounting of deaths from each energy source including mining, construction, pollution, and accidents, set against how much weight a rare catastrophe and long-lived waste should carry.",
        methodology:
          "Aggregate studies on: (1) Air pollution deaths (coal, gas, biomass), (2) Mining/construction accidents, (3) Major disasters, (4) Long-term radiation exposure. Normalize per TWh.",
        equation:
          "\\text{Deaths/TWh} = \\frac{\\sum \\text{all attributed deaths}}{\\text{Total energy generated}}",
        verification_status: "impossible" as const,
        // The deaths-per-TWh tally this crux used to name as its test already
        // exists (the evidence below). What is left is a weighing of values.
        settle: {
          condition:
            "Deaths per terawatt-hour, accidents and air pollution included, are already tallied for every source. How much a rare, severe accident and thousands of years of waste stewardship should count against the steady, certain toll of the fossil fuels nuclear would displace is a weighing of values that no further tally decides.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "Risk evidence can be reviewed, but no study budget settles the value judgment.",
        falsification: {
          supporter_flip:
            "If replicated evidence showed chronic low-dose radiation around normally operating plants and waste sites causing large, currently undetected cancer tolls, nuclear would drop out of the 'as safe as wind and solar' tier.",
          skeptic_flip:
            "If passive-safety designs logged decades of operation with no major release, and new independent re-analyses kept the deaths-per-TWh gap over fossil fuels, the fear of a rare disaster would no longer outweigh the fossil deaths nuclear displaces.",
          common_ground:
            "Both sides agree routine nuclear operation kills far fewer people than coal or gas; the real worry is rare high-consequence accidents and long-lived waste, not day-to-day harm.",
          live_disagreement:
            "How much weight to place on low-probability, high-consequence tail risk plus a multi-thousand-year waste-stewardship burden, versus the large, certain, ongoing death toll from the fossil fuels nuclear would displace.",
        },
      },
      evidence: [
        {
          id: "deaths-comparison",
          title: "Our World in Data: Nuclear Causes About 0.03 Deaths per TWh, Coal 24.6",
          description:
            "Deaths per TWh (accidents + air pollution): Coal 24.6, Oil 18.4, Gas 2.8, Nuclear 0.03, Wind 0.04, Solar 0.02. Nuclear is comparable to wind and solar and roughly 800 times safer than coal.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Our World in Data (Ritchie 2020, updated 2022); fossil-fuel rates from Markandya & Wilkinson, Lancet 2007; wind/solar from Sovacool et al. 2016",
          sourceUrl: "https://ourworldindata.org/safest-sources-of-energy",
          reasoning:
            "Aggregates a peer-reviewed Lancet study (fossil fuels) and a published accident database (renewables) with transparent methodology. OWID's headline nuclear figure is 0.03/TWh; an alternative OWID estimate that loads all Chernobyl and Fukushima tolls onto generation gives 0.07/TWh, still in the renewables range. It measures average harm, which is exactly what the tail-risk side says is the wrong measure.",
        },
        {
          id: "germany-phaseout-cost",
          title: "Jarvis, Deschenes and Jha: Germany's Nuclear Exit Costs About $12 Billion a Year, Mostly in Pollution Deaths",
          description:
            "After the 2011 Fukushima accident, Germany shut down roughly half of its nuclear production capacity. Using hourly plant data and a machine-learning model of how plants would otherwise have run, Stephen Jarvis, Olivier Deschenes and Akshaya Jha found the lost nuclear output was replaced primarily by coal-fired production and net electricity imports. They put the social cost of the shift at approximately $12 billion a year, over 70% of it from the increased mortality risk of local air pollution, and found even the largest estimates of the accident-risk and waste costs avoided far smaller than that.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "Jarvis, Deschenes & Jha, 'The Private and External Costs of Germany's Nuclear Phase-Out', NBER Working Paper 26598 (2019; Journal of the European Economic Association, 2022)",
          sourceUrl: "https://www.nber.org/papers/w26598",
          reasoning:
            "A peer-reviewed, natural-experiment estimate of what happens when a country swaps nuclear for what it actually had on hand, which is the comparison the safety question turns on. It covers Germany's grid in the 2010s, when coal filled the gap; a country replacing reactors with new wind and solar would face a different trade-off.",
        },
        {
          id: "fukushima-deaths",
          title: "UNSCEAR: No Discernible Rise in Radiation-Linked Cancers Expected From Fukushima",
          description:
            "UNSCEAR found no acute radiation deaths and no discernible radiation-attributable cancer increase expected from Fukushima. Its report distinguishes cancer compensation awards to workers from scientifically established radiation causation; those awards should not be counted as proven radiation deaths.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "UNSCEAR 2020/2021 Report, Annex B, paragraph 243 (worker compensation and scientific attribution)",
          sourceUrl: "https://www.unscear.org/unscear/en/publications/2020_2021_2.html",
          reasoning:
            "The UN's scientific committee on radiation supports a low radiation toll from the second-worst accident. It does not count the harm of the evacuation itself: WHO reports increased mortality among elderly evacuees, so an accident's total cost is larger than its radiation toll.",
        },
        {
          id: "chernobyl-deaths",
          title: "Chernobyl Forum: Up to About 4,000 Eventual Cancer Deaths Among the Most Exposed",
          description:
            "The WHO-led Chernobyl Forum (2006) projected up to about 4,000 eventual cancer deaths among the most-exposed groups; less conservative models (such as the TORCH report) project tens of thousands across the wider European population, but these are contested.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "WHO / IAEA Chernobyl Forum, 'Chernobyl's Legacy' (2006); higher estimates from the TORCH report (2006)",
          sourceUrl: "https://www.iaea.org/sites/default/files/chernobyl.pdf",
          reasoning:
            "The worst civilian nuclear accident, so it bounds the tail. The 4,000 figure is the WHO/IAEA consensus for the most-exposed cohort; far higher numbers come from extrapolating small doses across millions of people, a method the Forum itself treats as highly uncertain.",
        },
        {
          id: "waste-storage",
          title: "EPA's Yucca Mountain Standard Sets Radiation Limits Out to 1 Million Years",
          description:
            "High-level nuclear waste needs long-term isolation. For the proposed Yucca Mountain repository, EPA sets radiation dose limits for the first 10,000 years and a different limit from then to 1 million years, with assessments of climate, earthquakes, volcanoes and waste-container corrosion over that period.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "US EPA, Public Health and Environmental Radiation Protection Standards for Yucca Mountain (40 CFR Part 197)",
          sourceUrl:
            "https://www.epa.gov/radiation/public-health-and-environmental-radiation-protection-standards-yucca-mountain-nevada-40",
          reasoning:
            "The timescale is real and unlike any other energy waste. The volume is small and the waste is contained; long-lived radiotoxicity is why deep geological disposal is required, and whether societies can deliver it is the open question.",
        },
      ],
    },
    {
      id: "climate-effectiveness",
      title: "Can It Be Built Fast and Cheap Enough?",
      short_summary:
        "France built 58 reactors in about 22 years and got 65% of its power from them in 2023. Georgia's Vogtle reactors, America's last two, cost Georgia Power more than double its original estimate. Lazard puts new US nuclear at $175 to $255 per megawatt-hour against $40 to $98 for utility solar. The dispute is whether repeated builds can bring nuclear's cost down, or whether wind, solar and storage cut more carbon per dollar sooner.",
      image_url:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Every dollar and year spent on a reactor is a dollar and year not spent on cheaper, faster options. Georgia Power's net capital investment in Vogtle's two new units reached about $10.7 billion by the end of 2024 against its original $4.4 billion estimate, before financing, and the units entered service in 2023 and 2024, years late. Lazard's 2026 analysis puts unsubsidized new US nuclear at $175 to $255 per megawatt-hour, against $40 to $98 for utility-scale solar and $37 to $99 for onshore wind, and finds wind and solar still broadly competitive with gas plants even after firming costs. Small modular reactors, the industry's answer, come out at about $214 in Lazard's illustrative figures, inside the large-reactor range. Climate change rewards carbon cut this decade, and wind, solar and batteries can be built far faster.",
      proponent_rebuttal:
        "Vogtle was a first-of-a-kind build by a country that had forgotten how to build reactors; it is not a law of nature. France commissioned 58 pressurized-water reactors between 1977 and 1999 and got 65% of its electricity from nuclear in 2023, and China is building 39 of the roughly 80 reactors under construction worldwide. Costs fall when the same design is built again: Lazard's own range assumes about a 30% saving from Vogtle unit 3 to unit 4. Standalone generation costs also flatter wind and solar, because a megawatt-hour of nuclear arrives whatever the weather: US nuclear plants ran at 91% of capacity in 2025, against 34% for wind and 24% for solar. And Lazard's illustrative cost for restarting closed plants such as Palisades is about $71 per megawatt-hour.",
      crux: {
        id: "grid-decarbonization",
        title: "Firm Power Cost and Build Time",
        question:
          "Are nuclear's cost and build-time problems fixable, or are renewables plus storage faster per dollar?",
        description:
          "Test whether repeated, standardized reactor builds can deliver firm low-carbon electricity faster per dollar than a renewable portfolio providing comparable reliability. Historical country comparisons inform the question but do not settle the next project's cost or completion date.",
        methodology:
          "Compare completed projects and portfolios on actual construction time, financing and capital costs, lifetime generation, and fossil generation displaced. Include storage, transmission and other firming costs for equal reliability, and distinguish first-of-a-kind reactors from repeated designs.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Repeated standardized reactor projects with independently reported final costs and completion times, compared with renewable portfolios delivering comparable reliability and carbon displacement. Account for financing, transmission, storage and backup costs; historical carbon-intensity trends alone do not settle the prospective comparison.",
        },
        cost_to_verify: "Requires independent project and portfolio data; no study budget is established.",
        falsification: {
          supporter_flip:
            "If repeated projects show new nuclear has higher total system costs and longer build times than renewable portfolios with comparable reliability and emissions reductions, even under supportive policy and standardized designs, the cost-and-speed case for prioritizing nuclear weakens.",
          skeptic_flip:
            "If repeated reactor builds match or beat renewable portfolios on total system cost and deployment time while providing comparable reliability and emissions reductions, the cost-and-speed objection weakens. Count financing, grid upgrades, storage and backup costs in that comparison.",
          common_ground:
            "Both sides agree nuclear delivers firm, low-carbon power, with the US fleet running at about 91% of capacity in 2025, and that recent Western first-of-a-kind projects were badly over budget and behind schedule.",
          live_disagreement:
            "Whether nuclear's cost and build-time problems are fixable with scale, standardization, and policy; or are structural, leaving renewables-plus-storage as the faster per-dollar route to a clean grid.",
        },
      },
      evidence: [
        {
          id: "capacity-factor",
          title: "EIA: US Nuclear Plants Ran at 91% of Capacity in 2025; Wind 34%, Solar 24%",
          description:
            "US nuclear plants ran at an annual capacity factor of 91.1% in 2025 (90.8% in 2024, 93.0% in 2023), against 33.8% for wind and 24.0% for utility-scale solar photovoltaics in 2025, according to EIA's Electric Power Monthly (October 2026 release).",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 8,
          },
          source: "US EIA, Electric Power Monthly, Table 6.07.B (capacity factors), released 23 October 2026",
          sourceUrl: "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_6_07_b",
          reasoning:
            "Official US generation data. A higher capacity factor means more energy per unit of capacity built and less need for backup. It does not show what a megawatt-hour costs, which is where the dispute lies.",
        },
        {
          id: "france-decarbonization",
          title: "France Built 58 Reactors Between 1977 and 1999; Nuclear Supplied 65% of Its Power in 2023",
          description:
            "EDF's formal 2022 filing describes a program to build 58 pressurized-water reactors over 25 years, with the first commissioned in 1977 and the last in 1999. RTE's 2023 electricity review reports nuclear supplied 65% of French generation that year.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "EDF response document (November 2022); RTE Annual Electricity Review 2023",
          sourceUrl:
            "https://www.edf.fr/sites/groupe/files/2022-11/2022-11-23-2-edf-response-document-approved-by-amf.pdf",
          reasoning:
            "The commissioning dates show a country can build a large fleet in about two decades, and RTE verifies nuclear's share. A state-run program in the 1980s does not by itself show what a reactor would cost or how long it would take in another market today.",
        },
        {
          id: "cost-overruns",
          title: "Vogtle 3 and 4 Cost Georgia Power $10.7 Billion Against a $4.4 Billion Estimate",
          description:
            "Vogtle Units 3 and 4 entered service on July 31, 2023 and April 29, 2024. Georgia Power's net capital investment at December 31, 2024 was $10.663 billion, against an originally certified $4.418 billion capital cost for its share. These are Georgia Power's figures, not the all-owner project total, and exclude financing costs.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Southern Company 2024 Annual Report, Note 2, Georgia Power nuclear construction and regulatory matters",
          sourceUrl:
            "https://d18rn0p25nwr6d.cloudfront.net/CIK-0000092122/2a3f62ed-2484-48e4-bdca-fde9f71710ff.pdf",
          reasoning:
            "Company filings directly document the cost escalation and delay. The net capital figure reflects Toshiba settlement funds and customer refunds and excludes financing, so it understates the full project cost. Vogtle was a first-of-a-kind US build, so how far it predicts later ones is the open question.",
        },
        {
          id: "renewable-costs",
          title: "Lazard 2026: New US Nuclear Costs $175-255 per MWh, Utility Solar $40-98, Onshore Wind $37-99",
          description:
            "Lazard's 2026 Levelized Cost of Energy+ (version 19.0) puts unsubsidized new-build costs at $40-98 per megawatt-hour for utility-scale solar, $37-99 for onshore wind, $61-156 for utility solar with storage, and $175-255 for US nuclear. The nuclear range is based on Vogtle 3 and 4, 'the most recent observable data point for a completed U.S. nuclear project', with the low end assuming about 30% savings from unit 3 to unit 4. Lazard finds that 'even after incorporating these firming costs, renewables remain broadly cost-competitive with the LCOE of CCGTs', and adds illustrative figures for small modular reactors (about $214) and restarts of closed plants such as Palisades (about $71).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Lazard, Levelized Cost of Energy+ (2026), LCOE version 19.0",
          sourceUrl: "https://www.lazard.com/media/kcfconhf/lazards-lcoeplus_vf.pdf",
          reasoning:
            "The most widely used cost comparison, and it favours wind and solar on a standalone basis. It is not an equal-reliability portfolio comparison, and its nuclear figure rests on a single first-of-a-kind project, so it cannot show what a repeated design would cost.",
        },
      ],
    },
    {
      id: "grid-reliability",
      title: "Does a Clean Grid Need It?",
      short_summary:
        "Wind and solar rise and fall with the weather. One side says a near-zero-carbon grid still needs firm plants such as nuclear to get through windless, sunless weeks; the other says storage, transmission and overbuilt renewables can do the job for less.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Intermittency is a cost to manage, not a reason to build reactors. Batteries, wider transmission, overbuilt wind and solar, hydro and flexible demand can cover the gaps. CSIRO and AEMO's GenCost 2025-26 finds that for Australia to reach net zero efficiently, solar PV and onshore wind deliver 93% of electricity, supported by hydro, storage, transmission and gas or hydrogen, and that large-scale nuclear costs slightly more than gas with carbon capture. Paying for firm reactors buys reliability that a cheaper portfolio can already supply.",
      proponent_rebuttal:
        "The last few percent of emissions are the expensive part. Across nearly 1,000 modeled cases, Sepulveda and colleagues (Joule, 2018) found that without firm low-carbon resources (nuclear, gas with carbon capture, bioenergy) costs rise rapidly as CO2 limits approach zero, that having them available cuts the cost of a fully decarbonized system by 10% to 62%, and that batteries and demand flexibility do not substitute for them. Multi-day wind and solar lulls are what hours-long batteries cannot cover; even the GenCost pathway keeps gas or hydrogen in the mix for that job.",
      crux: {
        id: "firm-power-need",
        title: "Intermittent Renewables and Firm Power",
        question:
          "Does a clean grid need firm power like nuclear, or can storage, transmission and overbuild do it for less?",
        description:
          "Intermittency of wind and solar is the most common case for nuclear. Test whether a near-zero-carbon grid that meets the same reliability standard costs less with firm low-carbon plants such as nuclear in the mix, or with variable renewables backed by storage, transmission, overbuild and demand flexibility alone.",
        methodology:
          "Run capacity-expansion models of the same regions with and without firm low-carbon resources, on many weather years including multi-day wind and solar droughts, under one reliability standard. Count storage, transmission, curtailment and backup fuel. Compare the least-cost results across independent models and against the delivered costs of grids that already run on very high wind and solar shares.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Independent capacity-expansion models, run on decades of hourly weather and the same reliability standard, that price a near-zero-carbon grid with and without firm low-carbon plants, using current storage and transmission costs including multi-day storage; checked against the audited costs of grids that pass 90% wind and solar.",
        },
        cost_to_verify: "Modeling studies exist; a grid past 90% wind and solar with audited system costs does not yet.",
        falsification: {
          supporter_flip:
            "If models with current storage costs, including multi-day storage, kept finding that near-zero-carbon grids cost no more without firm plants, and a large grid ran past 90% wind and solar reliably at no higher system cost, the intermittency case for building nuclear would fall away.",
          skeptic_flip:
            "If independent models with current battery, long-duration storage and transmission costs kept finding that firm low-carbon plants lower the cost of a near-zero-carbon grid, and high-renewable grids kept leaning on fossil backup in long wind and solar lulls, the case that storage and overbuild make firm power unnecessary would weaken.",
          common_ground:
            "Both sides agree that wind and solar output varies with weather, that a reliable grid has to cover multi-day lulls as well as nightly ones, and that storage, transmission and flexible demand reduce how much firm capacity is needed.",
          live_disagreement:
            "Whether the cheapest way to cover the last stretch of decarbonization, especially multi-day wind and solar lulls, is firm low-carbon plants such as nuclear, or more storage, transmission and overbuild; the answer turns on future storage costs and on each region's weather and hydro.",
        },
      },
      evidence: [
        {
          id: "firm-resources-lower-cost",
          title: "Firm low-carbon resources cut zero-carbon grid costs 10-62%",
          description:
            "Sepulveda, Jenkins, de Sisternes and Lester (Joule, 2018) modeled 912 scenarios for a New England-like and a Texas-like US system. Having firm low-carbon resources (nuclear, gas with carbon capture, bioenergy) available reduced the cost of fully decarbonized electricity by 10% to 62%. Without them, costs rose rapidly as CO2 limits approached zero, and batteries and demand flexibility did not substitute for them.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Sepulveda, Jenkins, de Sisternes & Lester, 'The Role of Firm Low-Carbon Electricity Resources in Deep Decarbonization of Power Generation', Joule 2(11), 2403-2420 (2018)",
          sourceUrl: "https://doi.org/10.1016/j.joule.2018.08.006",
          reasoning:
            "Peer-reviewed and run across a wide range of cost assumptions, so the direction of the result is robust within the model. But it is a model, not observed grid data; storage is limited to lithium-ion batteries, and the authors note that multi-day storage, which they did not model, could itself serve as a firm resource. 'Firm' groups nuclear with gas plus carbon capture and bioenergy, so the result supports firm power, not nuclear in particular, and battery and solar costs have fallen since its 2017 baseline.",
        },
        {
          id: "gencost-firmed-renewables",
          title: "Australia's Least-Cost Net-Zero Grid Is 93% Wind and Solar",
          description:
            "CSIRO and AEMO's GenCost 2025-26 finds that for Australia's electricity sector to efficiently support net zero by 2050, solar PV and onshore wind deliver 93% of supply, supported by hydro, storage, transmission and gas or hydrogen, with gas at 3% to 7% of generation. It puts that system at $141 to $152 per MWh in 2050 including all firming costs, and finds large-scale nuclear slightly higher in cost than gas with carbon capture, with small modular reactors the highest cost.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "CSIRO & AEMO, GenCost 2025-26 Final Report, Executive Summary (July 2026), 2050 generation technology competitiveness",
          sourceUrl:
            "https://www.csiro.au/-/media/Energy/GenCost-2025-26-Final/GenCost_2025-26_Final-exec-summ.pdf",
          reasoning:
            "Australia's national science agency and grid operator, with system-wide integration costs counted (its system levelised cost) and an open-source model and input data published. Critics such as the Centre for Independent Studies have disputed its assumed nuclear capacity factors and plant lifetimes as too low. It is one country's projection to 2050, and its least-cost mix still keeps gas or hydrogen as firm backup, so it argues against nuclear as the firm resource rather than against firm capacity altogether.",
        },
      ],
    },
  ],
  references: [
    {
      title: "World Nuclear Association: Plans for New Reactors Worldwide (updated 2 November 2026)",
      url: "https://world-nuclear.org/information-library/current-and-future-generation/plans-for-new-reactors-worldwide",
    },
    {
      title: "Executive Order 14302: Reinvigorating the Nuclear Industrial Base (23 May 2025)",
      url: "https://www.whitehouse.gov/presidential-actions/2025/05/reinvigorating-the-nuclear-industrial-base/",
    },
    {
      title: "Southern Company 2024 Annual Report: Vogtle actual service dates and Georgia Power net capital investment",
      url: "https://d18rn0p25nwr6d.cloudfront.net/CIK-0000092122/2a3f62ed-2484-48e4-bdca-fde9f71710ff.pdf",
    },
    {
      title: "RTE Annual Electricity Review 2023: nuclear share of French generation",
      url: "https://analysesetdonnees.rte-france.com/en/annual-review-2023/keyfindings",
    },
    {
      title: "WHO: Health consequences of the Fukushima nuclear accident (2016)",
      url: "https://www.who.int/news-room/questions-and-answers/item/health-consequences-of-fukushima-nuclear-accident",
    },
  ],
};
