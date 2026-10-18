export const nuclearEnergySafetyData = {
  id: "nuclear-energy-safety",
  title: "Nuclear Energy for Climate",
  question: "Should nuclear power be expanded to help decarbonize electricity?",
  meta_claim:
    "Nuclear energy should be expanded as a key tool for decarbonizing electricity generation.",
  status: "contested" as const,
  category: "policy" as const,
  // ── The lede: two facts both sides accept, then what the fight is over ──
  keystone_fact: {
    statement:
      "France commissioned 58 pressurized-water reactors between 1977 and 1999. Georgia Power's net capital investment in Vogtle Units 3 and 4 reached about $10.7 billion by the end of 2024, against its original $4.4 billion estimate, before financing. The fight is over which build-out record predicts the next reactor, and how much rare disasters and long-lived waste should weigh against the fossil-fuel deaths nuclear would displace.",
    confidence: 90,
    source:
      "EDF response document (November 2022); Southern Company 2024 Annual Report, Note 2, Georgia Power nuclear construction",
    sourceUrl: "https://www.edf.fr/sites/groupe/files/2022-11/2022-11-23-2-edf-response-document-approved-by-amf.pdf",
  },
  // ── The summary above the crux sheet: what the map turns on ──
  simple_case: [
    "Both sides accept that nuclear plants deliver firm, low-carbon power, with the US fleet at about a 93% capacity factor in 2021-2023, that routine operation kills far fewer people than coal or gas, and that recent Western builds ran badly over budget and behind schedule.",
    "They split over whether nuclear's cost and build-time problems can be fixed with scale and standardization, or leave renewables plus storage the faster route per dollar; and over how much weight a rare, severe accident and thousands of years of waste stewardship should carry against the steady toll of the fossil fuels nuclear would displace.",
    "The first is a question the next builds can answer; the second is a weighing of values that the deaths-per-terawatt-hour tally informs but does not decide.",
  ],
  pillars: [
    {
      id: "safety-record",
      title: "Safety Record",
      short_summary:
        "Nuclear power has one of the lowest death rates per TWh of any energy source; on par with wind and solar.",
      image_url:
        "https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Average death rates understate low-probability, high-consequence tail risk. Chernobyl's most-exposed cohort faces up to ~4,000 projected eventual cancer deaths (with higher collective-dose estimates contested), and a single accident can force mass evacuation and render areas uninhabitable for years; Fukushima's evacuation and prolonged displacement also caused serious health harms, including increased mortality among elderly evacuees. High-level waste stays hazardous for thousands of years, and EPA's Yucca Mountain standards set dose limits and require risk assessments out to 1 million years, a multigenerational stewardship burden that annual death-rate averages do not capture.",
      proponent_rebuttal:
        "Published deaths-per-TWh estimates put nuclear at ~0.03, coal at 24.6, oil at 18.4, and wind at ~0.04, placing nuclear near wind and solar. UNSCEAR expects no discernible radiation-attributable cancer increase from Fukushima; worker compensation awards are not scientific proof of causation. Evacuation and displacement caused serious health harms that a radiation-only tally misses. Proponents argue passive cooling can reduce accident risk, while new designs still need independent operating evidence.",
      crux: {
        id: "deaths-per-twh",
        title: "Deaths Per TWh Analysis",
        question:
          "Do nuclear's rare-disaster and waste risks outweigh the fossil-fuel deaths it would displace?",
        description:
          "Comprehensive accounting of deaths from each energy source including mining, construction, pollution, and accidents.",
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
          title: "Nuclear Among Safest Energy Per TWh",
          description:
            "Deaths per TWh (accidents + air pollution): Coal 24.6, Oil 18.4, Gas 2.8, Nuclear 0.03, Wind 0.04, Solar 0.02. Nuclear is comparable to wind and solar and ~800x safer than coal.",
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
            "Aggregates a peer-reviewed Lancet study (fossil fuels) and a published accident database (renewables) with transparent methodology. OWID's headline nuclear figure is 0.03/TWh (Markandya & Wilkinson basis); an alternate OWID estimate that loads all Chernobyl/Fukushima tolls onto generation gives 0.07/TWh; still in the renewables range.",
        },
        {
          id: "fukushima-deaths",
          title: "Fukushima: Radiation Findings and Compensation Differ",
          description:
            "UNSCEAR found no acute radiation deaths and no discernible radiation-attributable cancer increase expected. Its report distinguishes cancer compensation awards to workers from scientifically established radiation causation; those awards should not be counted as proven radiation deaths.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "UNSCEAR 2020/2021 Report, Annex B, paragraph 243 (worker compensation and scientific attribution)",
          sourceUrl:
            "https://www.unscear.org/unscear/en/publications/2020_2021_2.html",
          reasoning:
            "The report supports a low observed radiation toll, while explicitly warning that legal compensation is not scientific attribution. WHO separately reports increased mortality among elderly evacuees: displacement harms remain relevant to accident safety even when radiation effects are small.",
        },
        {
          id: "chernobyl-deaths",
          title: "Chernobyl's Long-Term Cancer Death Toll Is Projected",
          description:
            "The WHO-led Chernobyl Forum (2006) projected up to ~4,000 eventual cancer deaths among the most-exposed groups; less conservative models (e.g. TORCH) project tens of thousands across the wider European population, but these are contested.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "WHO / IAEA Chernobyl Forum, 'Chernobyl's Legacy' (2006); higher estimates from the TORCH report (2006)",
          sourceUrl:
            "https://www.iaea.org/sites/default/files/chernobyl.pdf",
          reasoning:
            "Worst-case historical disaster. The ~4,000 figure is the WHO/IAEA consensus for the most-exposed cohort; far higher numbers come from collective-dose extrapolations that the Forum itself treats as highly uncertain.",
        },
        {
          id: "waste-storage",
          title: "Waste Remains Dangerous for Millennia",
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
            "Real challenge, though the annual volume is small and the waste is contained; long-lived radiotoxicity is why deep geological disposal is required.",
        },
      ],
    },
    {
      id: "climate-effectiveness",
      title: "Climate Effectiveness",
      short_summary:
        "Nuclear provides reliable, low-carbon baseload power that renewables struggle to match.",
      image_url:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Recent Western nuclear construction has been expensive: Georgia Power's net capital investment in Vogtle's two new units reached about $10.7B by end-2024 versus its original $4.4B estimate, before financing. Lazard's June 2025 analysis gives lower standalone generation costs for utility solar ($38-78/MWh) and onshore wind ($37-86/MWh) than US new-build nuclear ($141-220/MWh). The argument for renewables is that faster deployment and lower costs can displace more carbon sooner; the comparison must include the costs of delivering equally reliable power.",
      proponent_rebuttal:
        "France commissioned 58 pressurized-water reactors between 1977 and 1999; nuclear supplied 65% of its electricity in 2023. That record shows a large nuclear fleet can anchor a low-carbon electricity system. US nuclear averaged ~93% capacity factor in 2021-2023, avoiding the storage and firming costs that standalone-LCOE figures for wind/solar omit. Country comparisons also reflect weather, demand, fuel prices and cross-border trade, so they do not isolate the effect of nuclear policy.",
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
            "If, even with supportive policy and standardized designs, Western new-build keeps landing above ~$140/MWh and 7+ year timelines while firmed solar-plus-storage keeps getting cheaper, then nuclear cannot decarbonize fast enough per dollar; and the climate case for it collapses on cost, not safety.",
          skeptic_flip:
            "If reactors were built repeatedly at under about $4/W and in under 5 years, testing the claims made for recent South Korean and Chinese builds, the cost-and-speed objection behind most opposition would lose its footing.",
          common_ground:
            "Both sides agree nuclear delivers firm, low-carbon power, with the US fleet averaging ~93% capacity factor in 2021-2023, and that recent Western first-of-a-kind projects were badly over budget and behind schedule.",
          live_disagreement:
            "Whether nuclear's cost and build-time problems are fixable with scale, standardization, and policy; or are structural, leaving renewables-plus-storage as the faster per-dollar route to a clean grid.",
        },
      },
      evidence: [
        {
          id: "france-decarbonization",
          title: "France Decarbonized Its Grid Rapidly via Nuclear",
          description:
            "EDF's formal 2022 filing describes a program to build 58 pressurized-water reactors over 25 years, with the first commissioned in 1977 and the last in 1999. RTE's 2023 electricity review reports nuclear supplied 65% of French generation that year.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "EDF response document (November 2022); RTE Annual Electricity Review 2023",
          sourceUrl:
            "https://www.edf.fr/sites/groupe/files/2022-11/2022-11-23-2-edf-response-document-approved-by-amf.pdf",
          reasoning:
            "Commissioning dates establish the historical scale of deployment, and RTE verifies nuclear's predominant generation share. This record does not by itself establish the cost or construction time of a future reactor in another market.",
        },
        {
          id: "capacity-factor",
          title: "Nuclear ~93% Capacity Factor",
          description:
            "US nuclear plants run at ~93% annual capacity factor vs. ~33% for wind and ~23% for utility-scale solar (EIA, 2021-2023).",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 8,
          },
          source:
            "US EIA, Electric Power Monthly, Table 6.07.B (capacity factors)",
          sourceUrl: "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_6_07_b",
          reasoning:
            "Official US generation data. Higher capacity factor means more energy per unit of nameplate capacity and fewer backup/storage requirements.",
        },
        {
          id: "cost-overruns",
          title: "New Nuclear Has Massive Cost Overruns",
          description:
            "Vogtle Units 3 and 4 entered service on July 31, 2023 and April 29, 2024. Georgia Power's net capital investment at December 31, 2024 was $10.663B, against an originally certified $4.418B capital cost for its share. These are Georgia Power's figures, not the all-owner project total, and exclude financing costs.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Southern Company 2024 Annual Report, Note 2, Georgia Power nuclear construction and regulatory matters",
          sourceUrl:
            "https://d18rn0p25nwr6d.cloudfront.net/CIK-0000092122/2a3f62ed-2484-48e4-bdca-fde9f71710ff.pdf",
          reasoning:
            "Company filings directly document the cost escalation and schedule delay. The net capital figure accounts for Toshiba settlement funds and related customer refunds, includes some costs not shared with other owners, and excludes financing; it should not be presented as a complete project cost. Vogtle is a first-of-a-kind US build, so extrapolation to standardized fleets requires care.",
        },
        {
          id: "renewable-costs",
          title: "Solar/Wind Have Lower Standalone LCOE",
          description:
            "Lazard's June 2025 LCOE v18.0 estimates unsubsidized utility-scale solar at $38-78/MWh, onshore wind at $37-86/MWh, and US new-build nuclear at $141-220/MWh. The nuclear range uses inflation-adjusted assumptions based on earlier Vogtle cost estimates because observable new-build data are limited.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Lazard, Levelized Cost of Energy+ (June 2025), LCOE version 18.0, pp. 7, 34-37",
          sourceUrl: "https://www.lazard.com/media/uounhon4/lazards-lcoeplus-june-2025.pdf",
          reasoning:
            "The dated standalone-generation comparison favors solar and wind. It is not an equal-reliability portfolio comparison: firming and grid costs must also be considered. The US nuclear estimate is tied to limited Vogtle-based assumptions, rather than a measured worldwide new-reactor price.",
        },
      ],
    },
  ],
  references: [
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
