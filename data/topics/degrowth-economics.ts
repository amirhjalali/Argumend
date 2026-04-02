import type { Topic } from "@/lib/schemas/topic";

export const degrowthEconomicsData = {
  id: "degrowth-economics",
  title: "Is Degrowth the Only Way to Save the Planet?",
  meta_claim:
    "Endless GDP growth is incompatible with ecological survival. Rich nations must deliberately shrink their economies to stay within planetary boundaries.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: The Decoupling Debate
    // =========================================================================
    {
      id: "decoupling-debate",
      title: "The Decoupling Debate",
      short_summary:
        "The central empirical question is whether GDP growth can be permanently separated from environmental destruction. Proponents of green growth point to countries like Sweden and the UK achieving absolute decoupling of GDP from territorial CO2 emissions. Degrowth advocates counter that these gains vanish once offshored emissions, resource extraction, and biodiversity loss are included — and that no country has achieved absolute decoupling at the speed and scale required by the Paris Agreement targets.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Green growth is already happening. Multiple high-income countries have achieved absolute decoupling — their GDP has grown while territorial CO2 emissions have fallen. The UK cut emissions 44% between 1990 and 2019 while GDP grew 75%. Sweden, Denmark, and Germany show similar trajectories. Renewable energy costs have plummeted 90% in a decade, electric vehicle adoption is accelerating exponentially, and energy efficiency gains are compounding. The OECD projects that continued technological innovation and carbon pricing can deliver net-zero emissions by 2050 without sacrificing growth. Degrowth advocates cherry-pick consumption-based accounting to inflate rich-country footprints, but as clean energy scales globally, offshored emissions will decline too. History shows that economic growth drives the very innovation needed for ecological transition — the solar revolution was funded by wealthy economies investing in R&D.",
      proponent_rebuttal:
        "Territorial decoupling is an accounting illusion. When consumption-based emissions are counted — including all the goods manufactured in China and shipped to Western consumers — the UK's emissions reductions shrink dramatically. Hickel and Kallis (2020) conducted a systematic review of 835 empirical studies and found zero evidence of absolute decoupling of GDP from resource use or carbon emissions at rates consistent with the Paris Agreement's 1.5°C target. Even the most optimistic decoupling scenarios require emissions to fall 7-10% per year globally, while actual decoupling rates in the best-performing countries are 1-3% per year. Moreover, climate is only one boundary — GDP growth correlates with material throughput (minerals, biomass, water), and no country has decoupled GDP from aggregate material footprint. The UNEP International Resource Panel found that global material extraction has tripled since 1970 and shows no sign of peaking. Green growth is a comforting story, but the physics of material throughput do not bend to economic optimism.",
      crux: {
        id: "absolute-decoupling-rate",
        title: "The Absolute Decoupling Rate Test",
        description:
          "Whether any nation can demonstrate absolute decoupling of GDP from both consumption-based CO2 emissions and material footprint at rates consistent with staying within 1.5°C. If decoupling at 7-10% per year is achievable economy-wide without offshoring, degrowth is unnecessary. If maximum observed decoupling rates remain at 1-3% per year, green growth cannot close the gap in time.",
        methodology:
          "Compile consumption-based (not territorial) CO2 emissions and domestic material consumption data for all OECD nations from 2000-2025. Calculate annual decoupling rates (change in emissions/materials per unit GDP). Compare the fastest observed rates against the rates required by IPCC SR15 pathways for 1.5°C with no or limited overshoot. Assess whether any technology roadmap credibly projects acceleration to required rates.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Consumption-based emissions modeling with trade-adjusted material flow analysis across OECD nations)",
      },
      evidence: [
        {
          id: "hickel-kallis-review",
          title:
            "Systematic Review Finds No Evidence of Sufficient Decoupling (Hickel & Kallis 2020)",
          description:
            "Jason Hickel and Giorgos Kallis reviewed 835 empirical studies on the relationship between GDP growth and environmental pressures. They found that while relative decoupling (emissions growing slower than GDP) is common, absolute decoupling at rates consistent with 1.5°C or 2°C targets has never been observed in any country when consumption-based emissions and material footprint are both considered. The fastest observed absolute decoupling rates are 1-3% per year, while Paris-aligned pathways require 7-10% per year.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "Hickel & Kallis, New Political Economy (2020)",
          sourceUrl:
            "https://doi.org/10.1080/13563467.2019.1598964",
          reasoning:
            "Published in a peer-reviewed journal with transparent methodology covering 835 studies. Directly addresses the central empirical question. Independence is somewhat lower because both authors are prominent degrowth advocates, though the data compilation is replicable.",
        },
        {
          id: "uk-territorial-decoupling",
          title:
            "UK Achieved 44% Emissions Cut While Growing GDP 75% (1990-2019)",
          description:
            "The United Kingdom reduced territorial CO2 emissions by 44% between 1990 and 2019 while GDP grew approximately 75% in real terms — one of the strongest absolute decoupling records among major economies. This was driven by the shift from coal to gas and renewables in electricity generation, deindustrialization, and energy efficiency improvements. The Committee on Climate Change documented this trajectory as evidence that decarbonization and growth are compatible.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "UK Committee on Climate Change; Our World in Data",
          sourceUrl:
            "https://ourworldindata.org/co2/country/united-kingdom",
          reasoning:
            "Government statistics and independent data platforms confirm the territorial emissions reduction. Directness is reduced because consumption-based accounting tells a different story — the UK has offshored significant manufacturing emissions to China and other producers.",
        },
        {
          id: "material-footprint-rising",
          title:
            "Global Material Extraction Tripled Since 1970 With No Peak in Sight",
          description:
            "The UNEP International Resource Panel's Global Resources Outlook (2019) found that global extraction of materials — metals, minerals, fossil fuels, and biomass — tripled from 27 billion tonnes in 1970 to 92 billion tonnes in 2017, and is projected to reach 190 billion tonnes by 2060 under current trends. No high-income country has achieved absolute decoupling of GDP from domestic material consumption when accounting for trade flows. Material throughput is directly linked to habitat destruction, water depletion, and biodiversity loss.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "UNEP International Resource Panel, Global Resources Outlook (2019)",
          sourceUrl:
            "https://www.resourcepanel.org/reports/global-resources-outlook",
          reasoning:
            "The UNEP International Resource Panel is the most authoritative body on global material flows. The data is comprehensive and independently compiled. Directly undermines the green growth thesis by showing that growth remains tightly coupled to material extraction at the global level.",
        },
        {
          id: "renewable-cost-collapse",
          title:
            "Solar Energy Costs Fell 90% in a Decade, Enabling Rapid Decarbonization",
          description:
            "The levelized cost of solar photovoltaic electricity fell approximately 90% between 2010 and 2022, from $0.381/kWh to $0.049/kWh, according to IRENA. Wind energy costs fell 70% over the same period. These cost declines have made renewables cheaper than new fossil fuel generation in most markets worldwide. Green growth advocates argue this demonstrates that technological innovation — driven by economic growth and R&D investment — can deliver decarbonization without requiring economic contraction.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "IRENA Renewable Power Generation Costs (2022)",
          sourceUrl:
            "https://www.irena.org/publications/2023/Aug/Renewable-Power-Generation-Costs-in-2022",
          reasoning:
            "IRENA cost data is authoritative and independently verified across markets. However, directness is lower because cheap renewables address energy emissions but not material throughput, land use, or biodiversity — the broader ecological boundaries degrowth advocates emphasize.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Political Feasibility
    // =========================================================================
    {
      id: "political-feasibility",
      title: "Political Feasibility",
      short_summary:
        "No modern society has voluntarily chosen to shrink its economy. Degrowth proponents envision a planned, democratic transition involving reduced working hours, universal basic services, and caps on resource use. Critics argue this is politically impossible — voters will never accept declining material living standards, and any government attempting degrowth would be voted out immediately. The question is whether degrowth can be made politically viable, or whether it remains a utopian academic exercise.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Degrowth is political suicide. No electorate in history has voluntarily voted for economic contraction. Every instance of economic shrinkage — the Great Depression, post-Soviet collapse, Greek austerity — was accompanied by enormous human suffering and political extremism. The degrowth movement's vision of 'planned, democratic contraction' has no historical precedent and no plausible political pathway. Polling consistently shows that economic growth and job creation are top voter priorities across all demographics. Even climate-concerned voters support green growth, not degrowth — the Green New Deal is explicitly a growth program. Degrowth also requires global coordination that is impossible when developing nations legitimately demand economic expansion. China and India will not voluntarily cap their GDP. Unilateral degrowth by Western nations would simply shift production and emissions elsewhere while impoverishing Western workers.",
      proponent_rebuttal:
        "Degrowth is not austerity and not recession — it is a planned reduction of ecologically destructive production while expanding what matters: healthcare, education, care work, leisure, and ecological restoration. Concrete degrowth-adjacent policies already enjoy majority support in many countries: shorter working weeks (supported by 60-70% in European polls), universal basic services, wealth taxes, and caps on advertising. France banned short-haul domestic flights where rail alternatives exist. Amsterdam adopted the 'Doughnut Economics' framework for city planning. Barcelona, Copenhagen, and other cities are experimenting with car-free zones and de-growth-compatible urban design. The political challenge is real, but framing matters — 'post-growth' or 'wellbeing economy' polls far better than 'degrowth.' New Zealand, Scotland, Iceland, Wales, and Finland formed the Wellbeing Economy Governments partnership, explicitly moving beyond GDP as the primary policy metric. The political window is opening as climate disasters escalate and growth delivers diminishing returns for median citizens in wealthy nations.",
      crux: {
        id: "democratic-mandate-test",
        title: "The Democratic Mandate Test",
        description:
          "Whether any democratic polity can implement degrowth-compatible policies (reduced GDP, capped material throughput, shorter work weeks, universal basic services funded by wealth redistribution) and maintain electoral support. If voters accept post-growth governance when paired with wellbeing improvements, degrowth is politically viable. If every attempt triggers backlash and electoral defeat, degrowth remains utopian.",
        methodology:
          "Track the political trajectory of the Wellbeing Economy Governments (WeGo) network — New Zealand, Scotland, Iceland, Wales, Finland. Measure whether their shift from GDP-centric to wellbeing-centric policy metrics results in actual reductions in material throughput, and whether governing parties maintain or lose electoral support. Additionally, analyze polling data on degrowth-compatible policies (shorter work weeks, wealth taxes, flight bans, advertising restrictions) across OECD countries to identify the 'Overton window' for post-growth politics.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$150K-300K (Comparative political analysis with polling data across WeGo nations and OECD countries)",
      },
      evidence: [
        {
          id: "no-voluntary-degrowth-precedent",
          title:
            "No Modern Democracy Has Voluntarily Chosen Economic Contraction",
          description:
            "There is no historical precedent for a democratic society voluntarily choosing to shrink its economy. Every instance of sustained GDP decline — the Great Depression, post-Soviet collapse, the Greek debt crisis — was involuntary and accompanied by mass unemployment, political instability, and social crisis. Even wartime economies aimed for maximum output. The degrowth movement's vision of planned, democratic contraction is historically unprecedented.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          reasoning:
            "The historical record is clear and independently verifiable. The absence of precedent is a powerful argument against political feasibility, though proponents counter that many now-accepted policies (universal suffrage, abolition of slavery) also lacked precedent before they were achieved.",
        },
        {
          id: "wellbeing-economy-governments",
          title:
            "Five Nations Formed the Wellbeing Economy Governments Partnership",
          description:
            "New Zealand, Scotland, Iceland, Wales, and Finland formed the Wellbeing Economy Governments (WeGo) partnership in 2018, explicitly committing to move beyond GDP as the primary measure of national success. New Zealand introduced its Wellbeing Budget in 2019, allocating spending based on wellbeing indicators rather than GDP growth targets. Scotland established the National Performance Framework with 81 indicators spanning health, environment, and social connection. While none of these countries has explicitly adopted 'degrowth,' the shift from GDP-centric to wellbeing-centric governance represents the closest existing political approximation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Wellbeing Economy Alliance; New Zealand Treasury",
          sourceUrl:
            "https://weall.org/wego",
          reasoning:
            "The WeGo partnership is real and documented, but directness is limited because none of these governments has actually implemented degrowth — they have reframed metrics without reducing GDP. The political test of actual economic contraction remains untested.",
        },
        {
          id: "four-day-week-trials",
          title:
            "Four-Day Work Week Trials Show High Public Support and Maintained Productivity",
          description:
            "Large-scale four-day work week trials in Iceland (2015-2019, 2,500 workers), the UK (2022, 61 companies), and Spain (2023) showed that reduced working hours maintained or improved productivity, increased worker wellbeing, and reduced carbon footprints by 10-20% through fewer commutes and lower office energy use. In the UK trial, 92% of participating companies chose to continue the four-day week permanently. Polling in multiple European countries shows 60-70% support for shorter working weeks. Reduced working hours is a core degrowth proposal — working less, consuming less, living more.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Autonomy Research; Cambridge University; Alda (Iceland)",
          sourceUrl:
            "https://autonomy.work/portfolio/uk4dwpilot/",
          reasoning:
            "Trial results are documented and replicable, but directness is moderate because shorter work weeks do not necessarily reduce GDP — in many trials, output was maintained. The connection to degrowth is indirect; these policies could equally support green growth frameworks.",
        },
        {
          id: "yellow-vest-backlash",
          title:
            "France's Yellow Vest Protests Showed Backlash Against Green Austerity",
          description:
            "In November 2018, French President Macron's proposed fuel tax increase — designed to reduce carbon emissions — triggered the Gilets Jaunes (Yellow Vest) movement, the largest sustained protest in France since 1968. The protests forced Macron to abandon the tax and introduce a 10 billion euro package of concessions. The movement demonstrated that even modest green policies that increase costs for working people face explosive political resistance. Degrowth policies that would reduce overall consumption and economic output would face far greater opposition, particularly from lower-income populations who already struggle with affordability.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Le Monde; The Guardian; INSEE economic analysis",
          reasoning:
            "The Yellow Vest movement is well-documented and directly illustrates the political risks of policies that reduce material living standards in the name of environmental goals. However, degrowth proponents argue the protests targeted regressive taxation, not degrowth per se, and that progressive redistribution (taxing the wealthy, universal basic services) would avoid this dynamic.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Global Justice
    // =========================================================================
    {
      id: "global-justice",
      title: "Global Justice",
      short_summary:
        "Degrowth raises profound questions of international equity. If rich nations deliberately shrink their economies, will developing nations be freed to grow — or will they be dragged down by reduced demand for their exports, lower foreign investment, and diminished aid budgets? Degrowth advocates argue that rich-nation contraction is a moral imperative because wealthy countries have consumed far more than their fair share of the carbon budget. Critics counter that degrowth in the Global North would devastate the Global South through reduced trade, technology transfer, and development finance.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Degrowth in rich nations would devastate developing economies. The Global South depends on trade with wealthy nations — exports to OECD countries account for 30-50% of GDP for many developing nations. Reduced consumption in the North means reduced demand for Southern exports: garments from Bangladesh, electronics from Vietnam, agricultural products from sub-Saharan Africa. Foreign direct investment, which flows from rich to poor nations, would collapse if Northern economies contracted. Aid budgets, already inadequate, would be slashed — no government facing domestic economic contraction will increase foreign aid. The degrowth movement is overwhelmingly composed of affluent academics in wealthy nations telling the rest of the world to accept poverty as ecological virtue. Climate justice requires technology transfer and development finance, not Northern austerity that crashes global trade.",
      proponent_rebuttal:
        "The current growth model is already condemning developing nations. Climate change — overwhelmingly caused by rich-nation emissions — disproportionately devastates the Global South: the World Bank estimates that climate change will push 132 million people into extreme poverty by 2030. Rich nations have consumed approximately 92% of excess global CO2 emissions beyond the safe planetary boundary (Hickel 2020). Degrowth is not about universal contraction — it is about rich nations reducing their excessive material throughput to create ecological space for the Global South to develop. This requires wealth redistribution: cancellation of Global South debt ($500+ billion), reparations for climate damages, and technology transfer without intellectual property restrictions. The alternative — green growth for everyone — requires 3-5 planets' worth of resources if all nations reach Western consumption levels. Degrowth in the North paired with development in the South is the only framework consistent with both climate science and global justice.",
      crux: {
        id: "north-south-trade-impact",
        title: "The North-South Trade Impact Assessment",
        description:
          "Whether deliberate economic contraction in rich nations would reduce or increase wellbeing in developing nations. If degrowth in the Global North devastates Southern economies through reduced trade and investment, degrowth fails the justice test. If it can be paired with debt cancellation, technology transfer, and restructured trade that benefits the South, degrowth advances global equity.",
        methodology:
          "Model the economic impact of a 20% GDP reduction in OECD nations over 20 years on developing-nation trade flows, foreign direct investment, remittances, and aid. Compare two scenarios: (1) unmanaged degrowth (proportional reduction in all economic activity) and (2) managed degrowth (targeted reduction in extractive/luxury sectors with maintained or increased development finance, debt cancellation, and technology transfer). Assess net impact on Human Development Index indicators in low-income countries under each scenario.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Global trade modeling with CGE models and development impact assessment)",
      },
      evidence: [
        {
          id: "excess-emissions-responsibility",
          title:
            "Rich Nations Responsible for 92% of Excess CO2 Emissions (Hickel 2020)",
          description:
            "Jason Hickel's analysis published in The Lancet Planetary Health calculated that the Global North is responsible for 92% of CO2 emissions beyond the safe planetary boundary (350 ppm), with the United States alone accounting for 40% and the EU for 29%. The Global South — home to 85% of the world's population — is responsible for only 8% of excess emissions. This framing shifts the climate debate from 'who emits now' to 'who has consumed the carbon budget,' establishing a strong moral case for rich nations to contract first.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 8,
          },
          source: "Hickel, The Lancet Planetary Health (2020)",
          sourceUrl:
            "https://doi.org/10.1016/S2542-5196(20)30196-0",
          reasoning:
            "Published in a high-impact peer-reviewed journal with transparent methodology. Independence is lower because Hickel is a leading degrowth advocate, though the underlying emissions data is from standard sources (Global Carbon Project). The framing of 'excess' emissions beyond a safe boundary is a normative choice that critics dispute.",
        },
        {
          id: "global-south-trade-dependence",
          title:
            "Developing Nations Derive 30-50% of GDP from Exports to Rich Countries",
          description:
            "World Bank data shows that many developing economies are deeply dependent on trade with high-income nations. Bangladesh derives approximately 35% of GDP from garment exports, primarily to Europe and North America. Vietnam's export-to-GDP ratio exceeds 100%, with the US and EU as primary markets. Sub-Saharan African countries depend on commodity exports to wealthy nations for 20-40% of GDP. A sustained 20% contraction in OECD consumption could reduce demand for developing-nation exports by $2-4 trillion annually, with devastating consequences for employment, government revenue, and poverty reduction.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "World Bank; UNCTAD Trade and Development Report",
          sourceUrl:
            "https://data.worldbank.org/indicator/NE.EXP.GNFS.ZS",
          reasoning:
            "World Bank trade data is the gold standard for international economic statistics. The trade dependence of developing nations on OECD markets is well-documented and directly relevant to the question of whether degrowth in the North would harm the South.",
        },
        {
          id: "climate-poverty-impact",
          title:
            "Climate Change Will Push 132 Million Into Extreme Poverty by 2030",
          description:
            "The World Bank's Groundswell Report and Poverty and Shared Prosperity Report estimated that climate change will push 68-132 million people into extreme poverty by 2030 through reduced agricultural yields, water scarcity, and climate-related disasters. The impacts fall overwhelmingly on the Global South, which has contributed least to the problem. Degrowth advocates argue this demonstrates that continued Northern growth — even 'green growth' — perpetuates a system that externalizes environmental costs onto the poorest populations.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "World Bank Groundswell Report (2021); Poverty and Shared Prosperity Report",
          sourceUrl:
            "https://openknowledge.worldbank.org/handle/10986/36248",
          reasoning:
            "The World Bank is a highly authoritative source with rigorous methodology. Directness is somewhat lower because the data supports the urgency of climate action generally, not degrowth specifically — green growth advocates cite the same data to support their approach.",
        },
        {
          id: "three-to-five-planets",
          title:
            "Universal Western Consumption Would Require 3-5 Planets' Resources",
          description:
            "The Global Footprint Network calculates that if all 8 billion people consumed at the level of the average US citizen, humanity would need approximately 5.1 Earths' worth of biocapacity. Even at European consumption levels, 2.8 Earths would be required. This fundamental biophysical constraint means that universal 'green growth' to Western living standards is impossible without technologies that do not yet exist at scale. Degrowth advocates argue this proves rich nations must reduce consumption to create ecological space for Global South development.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Global Footprint Network; Earth Overshoot Day",
          sourceUrl:
            "https://www.footprintnetwork.org/",
          reasoning:
            "The ecological footprint methodology is widely cited but also criticized for oversimplifying complex resource dynamics. The core point — that universal Western consumption levels exceed planetary capacity — is broadly accepted, but critics argue it underestimates the potential for technological efficiency gains to reduce footprints within a growth framework.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Is Green Growth Possible? New Political Economy Analysis of Decoupling — Hickel & Kallis (2020)",
      url: "https://doi.org/10.1080/13563467.2019.1598964",
    },
    {
      title:
        "Quantifying National Responsibility for Climate Breakdown — Hickel, The Lancet Planetary Health (2020)",
      url: "https://doi.org/10.1016/S2542-5196(20)30196-0",
    },
    {
      title:
        "Global Resources Outlook 2019 — UNEP International Resource Panel",
      url: "https://www.resourcepanel.org/reports/global-resources-outlook",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Can economic growth truly be decoupled from environmental destruction?",
      content:
        "Rich nations point to declining territorial emissions as proof that green growth works, but consumption-based accounting paints a different picture. No country has achieved absolute decoupling of GDP from both carbon emissions and material footprint at rates consistent with the Paris Agreement. Is green growth a viable pathway, or a dangerous illusion that delays the hard choices degrowth demands?",
    },
    {
      id: "q2",
      title:
        "Is degrowth politically achievable in any democratic society?",
      content:
        "No electorate has ever voluntarily chosen economic contraction. The Yellow Vest protests showed that even modest green taxes trigger massive backlash. Yet the Wellbeing Economy movement is gaining traction, four-day work week trials enjoy overwhelming public support, and younger generations increasingly question the growth imperative. Can degrowth be reframed as a positive vision of working less, living more, and sharing better — or is it doomed to political irrelevance?",
    },
    {
      id: "q3",
      title:
        "Would degrowth in rich nations help or harm the Global South?",
      content:
        "Rich nations have consumed 92% of excess CO2 emissions, and climate change disproportionately devastates the poorest countries. But developing nations depend on trade with wealthy economies for 30-50% of GDP. Would Northern degrowth create ecological space for Southern development, or would it crash the global trade system that hundreds of millions depend on for their livelihoods? Can degrowth be paired with debt cancellation and technology transfer to make it globally just?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
