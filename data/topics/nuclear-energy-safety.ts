import type { Topic } from "@/lib/schemas/topic";

export const nuclearEnergySafetyData = {
  id: "nuclear-energy-safety",
  title: "Nuclear Energy for Climate",
  meta_claim:
    "Nuclear energy should be expanded as a key tool for decarbonizing electricity generation.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "safety-record",
      title: "Safety Record",
      short_summary:
        "Nuclear power has one of the lowest death rates per TWh of any energy source — on par with wind and solar.",
      image_url:
        "https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Average death rates understate low-probability, high-consequence tail risk. Chernobyl's most-exposed cohort faces up to ~4,000 projected eventual cancer deaths (with higher collective-dose estimates contested), and a single accident can force mass evacuation and render areas uninhabitable for years — Fukushima's evacuation alone caused roughly 2,200 deaths. High-level waste stays hazardous for thousands of years, and US repository standards require isolation modeled out to 10,000 years (peak-dose analysis to 1,000,000), a multigenerational stewardship burden no other power source imposes.",
      proponent_rebuttal:
        "Per TWh generated, nuclear causes ~0.03 deaths vs. 24.6 for coal, 18.4 for oil, and ~0.04 for wind — comparable to wind and solar. Fukushima's radiation is officially linked to ~1 death; the evacuation itself caused roughly 2,200 deaths. Modern designs (Gen III+, SMRs) use passive cooling that cuts calculated core-damage frequency roughly 10-100x below older plants — not zero risk, but a dramatically smaller accident probability.",
      crux: {
        id: "deaths-per-twh",
        title: "Deaths Per TWh Analysis",
        description:
          "Comprehensive accounting of deaths from each energy source including mining, construction, pollution, and accidents.",
        methodology:
          "Aggregate studies on: (1) Air pollution deaths (coal, gas, biomass), (2) Mining/construction accidents, (3) Major disasters, (4) Long-term radiation exposure. Normalize per TWh.",
        equation:
          "\\text{Deaths/TWh} = \\frac{\\sum \\text{all attributed deaths}}{\\text{Total energy generated}}",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (Meta-analysis of existing studies)",
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
            "Aggregates a peer-reviewed Lancet study (fossil fuels) and a published accident database (renewables) with transparent methodology. OWID's headline nuclear figure is 0.03/TWh (Markandya & Wilkinson basis); an alternate OWID estimate that loads all Chernobyl/Fukushima tolls onto generation gives 0.07/TWh — still in the renewables range.",
        },
        {
          id: "fukushima-deaths",
          title: "Fukushima Radiation: ~1 Attributed Death",
          description:
            "UNSCEAR found no acute radiation deaths and no observable increase in cancer attributable to radiation; one worker death was later officially attributed to radiation exposure. By contrast, roughly 2,200 deaths are attributed to the evacuation itself.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "UNSCEAR 2020/2021 Report, Annex B (Fukushima); WHO 2013 health risk assessment",
          sourceUrl:
            "https://www.unscear.org/unscear/en/publications/2020_2021_2.html",
          reasoning:
            "Authoritative international assessment. UNSCEAR concludes no discernible radiation-attributable cancer increase is expected; the ~2,200 evacuation-related deaths are a real toll but are not radiation deaths.",
        },
        {
          id: "chernobyl-deaths",
          title: "Chernobyl Caused Thousands of Deaths",
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
            "High-level nuclear waste stays hazardous for thousands of years; US regulators set repository isolation standards out to 10,000 years (with peak-dose analysis to 1,000,000 years).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "US NRC, 'Backgrounder on Radioactive Waste'; US EPA 40 CFR Part 197 repository standards",
          sourceUrl:
            "https://www.nrc.gov/reading-rm/doc-collections/fact-sheets/radwaste.html",
          reasoning:
            "Real challenge, though the annual volume is small and the waste is contained; long-lived radiotoxicity is why deep geological disposal is required.",
        },
      ],
    },
    {
      id: "climate-effectiveness",
      title: "Climate Effectiveness",
      short_summary:
        "Nuclear provides reliable, carbon-free baseload power that renewables struggle to match.",
      image_url:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "New Western nuclear is slow and expensive: recent first-of-a-kind projects ran ~7 years late and well over $30B for two units, while utility-scale solar and onshore wind now have far lower standalone LCOE (~$30-75/MWh vs. ~$140-220/MWh for new nuclear). Renewables plus falling-cost batteries are deploying faster, and per-dollar they can displace more carbon sooner.",
      proponent_rebuttal:
        "France built 56 reactors in roughly 15 years (1974-1989), reaching about 70-75% nuclear electricity and one of the lowest grid carbon intensities in Europe (~55-85 gCO₂/kWh vs. Germany's ~350-450). Nuclear delivers firm 24/7 power at ~93% capacity factor, avoiding the storage and firming costs that standalone-LCOE figures for wind/solar omit. Germany's nuclear phase-out left it more reliant on coal and gas, slowing its decarbonization relative to nuclear-heavy France.",
      crux: {
        id: "grid-decarbonization",
        title: "Grid Decarbonization Speed",
        description:
          "Compare historical speed of grid decarbonization via nuclear (France, Sweden) vs. renewables (Germany, California).",
        methodology:
          "Track gCO₂/kWh over time for countries pursuing different strategies. Account for imports/exports.",
        equation:
          "\\frac{d(\\text{gCO}_2/\\text{kWh})}{dt} \\text{ for nuclear vs. renewable strategies}",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (Data analysis)",
      },
      evidence: [
        {
          id: "france-decarbonization",
          title: "France Decarbonized Its Grid Rapidly via Nuclear",
          description:
            "Following the 1974 Messmer plan, France reached ~70-75% nuclear electricity within about 15 years and now has one of the lowest grid carbon intensities in Europe (~55-85 gCO₂/kWh vs. Germany's ~350-400).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "Our World in Data, 'Carbon intensity of electricity' (Ember / Energy Institute data)",
          sourceUrl:
            "https://ourworldindata.org/grapher/carbon-intensity-electricity",
          reasoning:
            "Historical fact demonstrating speed and effectiveness. Exact gCO₂/kWh values vary by year; France is consistently several times cleaner than Germany.",
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
            "Vogtle Units 3 & 4 finished at roughly $35B+ (more than double the ~$14B original estimate) and ~7 years late. The UK's Hinkley Point C has seen comparable schedule slips and large budget increases.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Southern Company / Georgia Power filings; summarized in Wikipedia 'Vogtle Electric Generating Plant' and contemporaneous reporting (AP, Reuters)",
          sourceUrl:
            "https://en.wikipedia.org/wiki/Vogtle_Electric_Generating_Plant",
          reasoning:
            "Recent Western first-of-a-kind projects have serious cost and schedule problems; this is a genuine weakness for new-build nuclear.",
        },
        {
          id: "renewable-costs",
          title: "Solar/Wind Have Lower Standalone LCOE",
          description:
            "Lazard's unsubsidized levelized cost (LCOE) for utility solar (~$30-60/MWh) and onshore wind (~$30-75/MWh) sits well below new nuclear (~$140-220/MWh).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Lazard, Levelized Cost of Energy+ (latest annual edition)",
          sourceUrl: "https://www.lazard.com/research-insights/levelized-cost-of-energyplus/",
          reasoning:
            "Standalone LCOE favors solar/wind, but this metric excludes the storage, firming, and grid-integration costs needed to make intermittent sources deliver firm power comparable to nuclear.",
        },
      ],
    },
  ],
};
