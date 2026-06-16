import type { Topic } from "@/lib/schemas/topic";

export const evEnvironmentalImpactData = {
  id: "ev-environmental-impact",
  title: "Electric Vehicles vs. ICE Cars",
  meta_claim:
    "Electric vehicles are significantly better for the environment than internal combustion engine vehicles when considering the full lifecycle.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "manufacturing-battery-impact",
      title: "Manufacturing & Battery Impact",
      short_summary:
        "An EV starts its life with a larger carbon debt than a gas car. By Volvo's own accounting it takes roughly 30,000 miles on a clean grid to about 68,000 miles on the global average grid to break even.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Battery production requires lithium, nickel, and cobalt mining, with real impacts: water-intensive lithium extraction in Chile, hard-rock mining in Australia, and cobalt mining in the DRC tied to toxic waste and child labor. Building an EV emits substantially more CO2 up front than building an equivalent gas car — Volvo's own figures put battery-EV manufacturing about 70% higher. And large volumes of spent batteries are projected by 2040, so end-of-life recycling must scale far beyond today before the loop is genuinely closed.",
      proponent_rebuttal:
        "The higher manufacturing footprint is offset well within the vehicle's lifetime — at typical US mileage that is a matter of a few years of driving, and sooner on cleaner electricity. Battery recycling is scaling: Redwood Materials and Li-Cycle report recovering 95%+ of critical minerals, even if recycled material is still a small share of supply today. And the impacts of oil extraction and refining — spills, refinery emissions, and methane leaks — are large and ongoing, not a one-time manufacturing cost.",
      crux: {
        id: "lifecycle-breakeven",
        title: "Lifecycle Emissions Breakeven Point",
        description:
          "The exact point (in miles or years of driving) at which an EV's total lifecycle emissions drop below those of an equivalent ICE vehicle, across different grid mixes and vehicle classes.",
        methodology:
          "Cradle-to-grave lifecycle assessment comparing matched EV and ICE vehicles, including mining, manufacturing, fuel/electricity production, driving, maintenance, and end-of-life recycling, parameterized by regional grid carbon intensity.",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (Comprehensive LCA with sensitivity analysis)",
      },
      evidence: [
        {
          id: "iea-lifecycle-2023",
          title: "IEA: A Medium EV Has About Half the Lifecycle Emissions of an Equivalent ICE Car",
          description:
            "The International Energy Agency's Global EV Outlook 2024 reports that, on the global average grid mix, a medium-size battery electric car has roughly half the lifecycle CO2-eq emissions of an equivalent oil-fueled ICE car (~15 t CO2-eq vs ~38 t over a ~200,000 km lifetime). The savings are larger on cleaner grids and smaller on coal-heavy grids.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "International Energy Agency, Global EV Outlook 2024 — Outlook for emissions reductions",
          sourceUrl:
            "https://www.iea.org/reports/global-ev-outlook-2024/outlook-for-emissions-reductions",
          reasoning:
            "Premier international energy authority with transparent methodology. Results consistent across multiple independent analyses. Claim restated to the IEA's published ~50% global-average figure; the earlier '70% on clean grids' and '1.5-2 year breakeven' specifics were not in the IEA report and were removed.",
        },
        {
          id: "volvo-lifecycle-study",
          title: "Volvo: EV Manufacturing ~70% More Carbon-Intensive, Offset by Driving",
          description:
            "Volvo's own transparent carbon footprint report for the C40 Recharge vs. the XC40 ICE found the EV's production generates about 70% more greenhouse gas emissions. The EV then breaks even at roughly 48,000 miles charged on the EU28 grid mix and at about 68,300 miles on the global average grid — within the expected vehicle lifetime, and sooner on cleaner electricity.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 8,
            directness: 9,
          },
          source: "Volvo Cars, C40 Recharge Carbon Footprint Report (2021)",
          sourceUrl:
            "https://www.volvocars.com/assets/volvocm/globalpages/live/6298CA92D97B4769AAA54A1D1FABF81C/volvo_carbonfootprintreport_ec40.pdf",
          reasoning:
            "Manufacturer-commissioned but transparently published with full methodology. Lower independence score for industry source, but the honest reporting of higher manufacturing impact lends credibility. Breakeven mileages restated to the report's exact figures (~48,000 mi EU mix, ~68,300 mi global mix).",
        },
        {
          id: "cobalt-mining-drc",
          title: "DRC Cobalt Mining: Child Labor, Toxic Waste, Ecological Destruction",
          description:
            "Roughly 70% of the world's cobalt is mined in the Democratic Republic of Congo. Amnesty International's 2016 report documented hazardous artisanal mining, water contamination, and child labour (UNICEF estimated about 40,000 children working in southern DRC mines). While cobalt content per battery is falling, the human and environmental toll of current extraction is severe.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            'Amnesty International & Afrewatch, "This Is What We Die For" (2016); UNICEF child-labour estimate',
          sourceUrl: "https://www.amnesty.org/en/documents/afr62/3183/2016/en/",
          reasoning:
            "Well-documented human rights and environmental concerns. Directness is moderate because cobalt-free battery chemistries (LFP) are rapidly gaining market share, reducing relevance over time. Note this is a mining-harm concern, not evidence that EV lifecycle emissions exceed ICE.",
        },
        {
          id: "battery-recycling-advances",
          title: "Battery Recyclers Report Recovering 95%+ of Critical Minerals",
          description:
            "Redwood Materials states it recovers more than 95% of the critical elements (lithium, cobalt, nickel, copper) in the batteries it processes, and Li-Cycle has reported comparable recovery rates. These are company-reported figures at still-early commercial scale; US lithium-ion recycling overall remains a small share of supply today.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 6,
            directness: 6,
          },
          source: "Redwood Materials (company statement); Li-Cycle reported recovery rates",
          sourceUrl:
            "https://www.redwoodmaterials.com/resources/how-battery-recycling-works/",
          reasoning:
            "Technology is real but at early commercial scale, and the recovery figures are self-reported by industry, so reliability and independence are lowered. An unverifiable 'DOE projects 15-20% of US demand by 2030' claim was removed; CATL was dropped as it was not the verified source.",
        },
      ],
    },
    {
      id: "grid-dependency",
      title: "Grid Dependency",
      short_summary:
        "An EV on Norway's near-100% renewable grid cuts lifecycle emissions by roughly 75-80%. On Poland's coal-heavy grid the advantage shrinks dramatically — close to break-even with a gas car.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "On the dirtiest coal-heavy grids, an EV's lifecycle advantage can shrink to near parity with an efficient hybrid — ICCT finds EVs in Poland barely beat, or roughly match, a comparable gasoline car. Unmanaged charging concentrated at evening peaks could also force costly new generation capacity. In coal-reliant places like West Virginia or Poland, an EV is, in carbon terms, largely a coal-powered car.",
      proponent_rebuttal:
        "Even on the average US grid mix, ICCT puts an EV's lifecycle emissions roughly 60-68% below a comparable gasoline car, and the average US EV is already as clean as a hypothetical 94 MPG gas car (UCS, 2024). Grids are greening fast — US coal fell from a ~48% share of generation around 2007 to about 16% by 2023. And MIT finds that delayed home charging plus workplace charging can smooth peaks and soak up midday solar, so the grid-strain worry is largely a management problem, not an inherent barrier.",
      crux: {
        id: "grid-carbon-threshold",
        title: "Grid Carbon Intensity Threshold for EV Advantage",
        description:
          "The grid carbon intensity (gCO2/kWh) above which an EV no longer has a lifecycle emission advantage over the best available ICE or hybrid vehicle.",
        methodology:
          "Parametric lifecycle model varying grid intensity from 0 to 1000 gCO2/kWh, comparing EVs to both average ICE and best-in-class hybrids. Include grid trajectory projections to determine when currently-dirty grids will cross the threshold.",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Modeling with published grid data)",
      },
      evidence: [
        {
          id: "ucs-grid-analysis",
          title: "UCS: The Average EV Now Equals a ~94 MPG Gasoline Car Nationally",
          description:
            "The Union of Concerned Scientists' 2024 update finds the average US EV produces global-warming emissions equal to a hypothetical 94 MPG gasoline car, reaching about 219 MPG-equivalent in the cleanest regions (e.g., upstate New York). For 93% of the country the average EV beats the most efficient gasoline car (57 MPG), and everywhere in the US the most efficient EV beats any gasoline-only car available.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 8,
            directness: 9,
          },
          source: "Union of Concerned Scientists (Reichmuth, 2024)",
          sourceUrl:
            "https://blog.ucs.org/dave-reichmuth/driving-on-electricity-is-now-much-cleaner-than-using-a-gasoline-car/",
          reasoning:
            "Advocacy organization but with transparent, replicable methodology using EPA/eGRID power-plant data. Independence lowered for pro-EV institutional stance. Claim corrected: the prior '191 MPG' and 'cleaner in all 50 states' figures were inaccurate — the average EV beats the most efficient gas car in 93% of the country, while the most efficient EV beats any gas car everywhere.",
        },
        {
          id: "mit-grid-stress",
          title: "MIT: Unmanaged Charging Could Need ~20% More Generation — But Managed Charging Avoids It",
          description:
            "MIT Energy Initiative research found that if EV charging is left unmanaged, evening peaks could require installing upwards of 20% more power-generation capacity. Crucially, the same study concludes that delayed home charging plus workplace charging can mitigate or eliminate that need, smoothing peaks and absorbing midday solar — so the grid strain is largely a management problem, not an inherent barrier.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "MIT Energy Initiative (Trancik group)",
          sourceUrl:
            "https://energy.mit.edu/news/minimizing-electric-vehicles-impact-on-the-grid/",
          reasoning:
            "Highly credible source. Claim corrected: the prior '$75-125B / 50 million EVs / 15-20% demand' specifics are not in MIT's research and were removed. The study's actual finding is that unmanaged charging could need ~20% more capacity but managed charging largely avoids it — so this is weak as an 'EVs are bad' point. Directness lowered: it concerns grid logistics, not per-vehicle environmental impact.",
        },
        {
          id: "norway-iceland-clean-grid",
          title: "Clean Grids (Norway/Iceland) Push EV Lifecycle Savings Toward the Ceiling",
          description:
            "Norway generates about 98% of its electricity from renewables (mostly hydro) with new-car sales now overwhelmingly electric, and Iceland's grid is nearly 100% renewable. ICCT lifecycle analysis finds EVs already cut lifecycle GHG emissions by roughly two-thirds versus gasoline on average European/US grids, with the reduction approaching ~80% or more where the grid is essentially carbon-free — illustrating the upper bound of the EV advantage.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "ICCT, A Global Comparison of the Life-Cycle GHG Emissions of Combustion Engine and Electric Passenger Cars (2021); IEA on Norway's grid mix",
          sourceUrl:
            "https://theicct.org/publication/a-global-comparison-of-the-life-cycle-greenhouse-gas-emissions-of-combustion-engine-and-electric-passenger-cars/",
          reasoning:
            "Compelling clean-grid illustration anchored to ICCT's peer-reviewed lifecycle analysis (66-69% EU / 60-68% US reductions, higher on near-zero-carbon grids). Replicability limited because few countries have such clean grids. Removed the unverified 'Norway transport emissions fell 10%' and the stale '80% EV market share' point (now far higher), and corrected the loosely sourced '85%' to ICCT's supported range.",
        },
        {
          id: "doe-charging-infrastructure",
          title: "NREL/DOE: A National Network Could Need ~1.2 Million Public Charging Ports by 2030",
          description:
            "NREL's 2023 analysis for the DOE Joint Office estimates a national network could require about 1.2 million publicly accessible charging ports by 2030 (plus ~26.8 million private ports) to support 30-42 million light-duty EVs. The current public network is far smaller, so rural charging gaps and installation pace could slow adoption.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 3,
          },
          source:
            "National Renewable Energy Laboratory, The 2030 National Charging Network (2023)",
          sourceUrl: "https://docs.nrel.gov/docs/fy23osti/85654.pdf",
          reasoning:
            "Authoritative government modeling of the infrastructure build-out needed. Directness lowered further: charger availability affects adoption speed and convenience, not per-vehicle lifecycle emissions, so it is weak as evidence on the environmental question. The specific 'only 186,000 exist as of early 2024' count was removed as it was unsourced here.",
        },
      ],
    },
  ],
};
