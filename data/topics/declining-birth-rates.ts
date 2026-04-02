import type { Topic } from "@/lib/schemas/topic";

export const decliningBirthRatesData = {
  id: "declining-birth-rates",
  title: "The Global Fertility Collapse",
  meta_claim:
    "The global decline in birth rates below replacement level represents an existential demographic crisis that will cause economic collapse, pension system failure, and civilizational decline unless proactively addressed through policy intervention.",
  status: "contested" as const,
  category: "economics" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "World Population Prospects — United Nations Population Division",
      url: "https://population.un.org/wpp/",
    },
    {
      title: "Fertility and the Future — The Lancet",
      url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)00550-6/fulltext",
    },
    {
      title: "Empty Planet: The Shock of Global Population Decline — Darrell Bricker & John Ibbitson",
      url: "https://www.penguinrandomhouse.com/books/545028/empty-planet-by-darrell-bricker-and-john-ibbitson/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is the birth rate decline a crisis or a natural adjustment?",
      content:
        "Some argue lower birth rates reduce environmental strain, reflect women's empowerment and access to contraception, and represent rational individual choices. Others see civilizational decline, economic collapse, and the end of pension systems. Is humanity choosing its own contraction, and is that choice wise or catastrophic?",
    },
    {
      id: "q2",
      title: "Can any government policy actually raise birth rates?",
      content:
        "Pro-natalist policies in Hungary (tax exemptions, free IVF), Singapore (cash bonuses), Japan (childcare subsidies), and Scandinavia (parental leave) have shown limited effectiveness despite billions spent. If no policy reliably raises fertility, is the decline irreversible?",
    },
    {
      id: "q3",
      title: "Will technology make population decline irrelevant?",
      content:
        "If AI and robotics increase productivity per worker by 10x, fewer workers may be sufficient to support aging populations. Immigration can supplement domestic birth rates. Could the economic consequences of population decline be managed through technological substitution rather than population growth?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Demographic Doom Loop
    // =========================================================================
    {
      id: "demographic-doom-loop",
      title: "The Demographic Doom Loop",
      short_summary:
        "Below-replacement fertility creates a self-reinforcing cycle: fewer workers supporting more retirees, higher taxes on the working population, which further discourages childbearing. Japan's 1.2 TFR and shrinking economy provide a preview, while South Korea at 0.72 TFR represents the most extreme case of a society contracting faster than it can adapt.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The demographic doom loop is not theoretical — it is happening now in East Asia and will reach the West within a decade. South Korea's total fertility rate of 0.72 (2023) means each generation is roughly one-third the size of its predecessor. Japan's population has already shrunk by over 3 million since its 2008 peak and is projected to fall from 125 million to 87 million by 2070. Every pension and social insurance system in the developed world was designed for population growth or stability — they become mathematically insolvent below replacement fertility. The old-age dependency ratio in the OECD will double from 30% to 60% by 2060, meaning each working-age person will support nearly twice as many retirees. No combination of productivity gains, immigration, or retirement age increases can fully offset a demographic contraction of this magnitude.",
      proponent_rebuttal:
        "The 'doom loop' framing confuses a challenging transition with civilizational collapse. Population growth is not inherently necessary for economic prosperity — per capita GDP can rise even as total GDP stagnates. Japan's per capita GDP has actually grown at rates comparable to the US over the past two decades despite population decline, because productivity gains offset the smaller workforce. Pension systems can be reformed through gradually increasing retirement ages (in line with increasing healthy lifespan), shifting from defined-benefit to defined-contribution models, and drawing on the massive wealth accumulated during the high-growth era. The demographic transition is a one-time shift from high-fertility/high-mortality to low-fertility/low-mortality equilibrium — once the bulge of elderly dependents passes (over approximately 50-70 years), the population stabilizes at a smaller, more sustainable size.",
      crux: {
        id: "economic-sustainability-modeling",
        title: "The Sub-Replacement Sustainability Model",
        description:
          "The crux is whether economies can sustain or grow per capita prosperity at fertility rates significantly below replacement (1.0-1.5 TFR) over multi-generational timeframes. If economic modeling shows that productivity gains, capital deepening, and institutional reforms can maintain living standards during the demographic transition, the crisis framing is overblown. If models show that below a certain fertility threshold, economic contraction becomes self-reinforcing, the crisis is real.",
        methodology:
          "Develop dynamic economic models that simulate 50-year and 100-year GDP, per capita income, fiscal sustainability, and capital stock trajectories under various fertility scenarios (0.7, 1.0, 1.3, 1.6, 2.1 TFR). Incorporate AI-driven productivity assumptions, immigration scenarios, retirement age flexibility, and pension system reform options. Identify the fertility threshold below which no combination of interventions prevents per capita income decline. Validate against Japan and South Korea's actual economic trajectories.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Multi-scenario long-horizon macroeconomic modeling)",
      },
      evidence: [
        {
          id: "south-korea-tfr-record",
          title: "South Korea's Fertility Rate Hits Record Low of 0.72 (2023)",
          description:
            "South Korea's total fertility rate fell to 0.72 in 2023, the lowest ever recorded by any nation in peacetime. This means Korean women are having roughly one-third the children needed for population replacement. At this rate, South Korea's population will halve within 50 years and shrink by 75% within a century. The government has spent over $280 billion on pro-natalist policies since 2006 with virtually no effect on fertility trends.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "Statistics Korea; World Bank",
          sourceUrl: "https://kostat.go.kr/",
          reasoning:
            "South Korea's TFR data comes from its national statistics office and is independently verifiable. The 0.72 figure is historically unprecedented and directly demonstrates the extreme end of fertility decline. The failure of $280 billion in pro-natalist spending directly challenges the claim that policy can reverse the trend.",
        },
        {
          id: "japan-per-capita-gdp-growth",
          title: "Japan's Per Capita GDP Has Grown Despite Population Decline",
          description:
            "Despite Japan's population declining since 2008 and its total GDP growth being among the slowest in the developed world, Japan's GDP per capita has grown at approximately 1.2% annually over 2010-2023 — comparable to the US rate when adjusted for PPP. Unemployment is at historic lows (2.5%), crime rates are minimal, and quality of life indicators remain high. This suggests that population decline does not necessarily mean declining living standards for those who remain.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "World Bank; OECD; Bank of Japan",
          sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.PCAP.KD.ZG?locations=JP",
          reasoning:
            "World Bank and OECD economic data is highly reliable and independent. Japan's per capita GDP growth directly challenges the doom loop narrative by showing that a declining population can maintain rising living standards. However, Japan has also accumulated the world's highest public debt-to-GDP ratio (263%), raising questions about long-term fiscal sustainability.",
        },
        {
          id: "un-global-fertility-projections",
          title: "UN Projects Two-Thirds of Countries Below Replacement by 2050",
          description:
            "The United Nations Population Division projects that by 2050, approximately two-thirds of all countries will have fertility rates below the replacement level of 2.1. Global fertility has already fallen from 5.0 in 1950 to 2.3 in 2023 and is projected to reach 1.8-2.0 by mid-century. This means population decline is not an East Asian phenomenon but a global trajectory, with only sub-Saharan Africa maintaining above-replacement fertility by 2100.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "United Nations Population Division",
          sourceUrl: "https://population.un.org/wpp/",
          reasoning:
            "UN population projections are the gold standard for demographic forecasting. The global scope of fertility decline makes the challenge universal, not limited to specific cultures. However, UN projections at the 2100 horizon carry significant uncertainty — the directness score reflects that projections are not the same as observed data.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: The Choice Theory
    // =========================================================================
    {
      id: "choice-theory",
      title: "The Choice Theory",
      short_summary:
        "Declining fertility reflects rational individual choices in response to high costs of child-rearing, career opportunity costs, changed values, and women's educational empowerment. Rather than a crisis, it may represent the largest expansion of reproductive freedom in human history.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Framing declining fertility as a 'crisis' ignores that it results from the most significant expansion of reproductive autonomy in human history. For the first time, billions of women can choose when, whether, and how many children to have. The correlation between female education and declining fertility is one of the strongest and most consistent relationships in social science: as women gain access to education, contraception, and economic opportunity, they choose to have fewer children. This is not a crisis — it is freedom. The 'crisis' framing implicitly treats women's bodies as economic infrastructure and children as pension system inputs. Moreover, lower population reduces environmental pressure, per capita resource availability increases, and the quality of parental investment in fewer children can increase significantly.",
      proponent_rebuttal:
        "The choice theory is only half the story. Surveys consistently show that people in developed countries want more children than they actually have — the 'fertility gap' between desired and actual fertility ranges from 0.3 to 0.7 children across OECD countries. In the US, the average desired family size is 2.5 children, but actual fertility is 1.6. This gap indicates that declining fertility is not purely a free choice but reflects structural barriers: unaffordable housing, inadequate childcare, student debt, career penalties for parenthood (especially motherhood), and a lack of family-friendly workplace policies. Characterizing the decline as pure choice absolves society of responsibility for the structural barriers that prevent people from having the families they want.",
      crux: {
        id: "fertility-gap-causation",
        title: "The Fertility Gap Decomposition",
        description:
          "The crux is whether the gap between desired and actual fertility (people wanting more children than they have) is primarily caused by removable structural barriers (cost, childcare, workplace flexibility) or by irreducible preference shifts that surveys fail to capture (stated preferences for children may not reflect revealed preferences). If removing structural barriers closes most of the fertility gap, policy intervention can meaningfully raise birth rates. If the gap persists even after removing barriers, declining fertility is a deeper preference shift that policy cannot reverse.",
        methodology:
          "Conduct a natural experiment comparison between countries that have comprehensively addressed structural barriers (Nordic nations with universal childcare, extensive parental leave, housing support) and those that have not, measuring both desired and actual fertility. If Nordic fertility remains significantly below desired levels despite comprehensive support, the fertility gap reflects preference shifts beyond structural barriers. Additionally, longitudinal surveys tracking young people's fertility intentions versus outcomes can reveal when and why the gap emerges.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Cross-national comparison with longitudinal fertility intention tracking)",
      },
      evidence: [
        {
          id: "fertility-gap-oecd-data",
          title: "OECD: Actual Fertility Is 0.3-0.7 Children Below Desired Fertility",
          description:
            "OECD surveys consistently show that individuals in developed countries report wanting more children than they actually have. In France, desired fertility is 2.4 versus actual 1.8. In Germany, 2.0 versus 1.4. In Japan, 2.4 versus 1.2. This 'fertility gap' suggests that structural barriers — not pure preference — drive much of the decline. If these barriers were removed, fertility would be higher, though still potentially below replacement.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "OECD Family Database; Eurobarometer",
          sourceUrl: "https://www.oecd.org/els/family/database.htm",
          reasoning:
            "OECD surveys use standardized methodology across countries, providing reliable and comparable data. The fertility gap directly challenges the 'pure choice' theory by showing that people want more children than they have. However, stated preferences in surveys may reflect social desirability bias (people saying they want children because it is expected), slightly limiting the directness.",
        },
        {
          id: "female-education-fertility-correlation",
          title: "Female Education Is the Strongest Predictor of Fertility Decline",
          description:
            "The correlation between female educational attainment and fertility decline is one of the most robust relationships in demography. Across every country, every era, and every culture, as women's average years of schooling increase from 0 to 12+, fertility drops from 5+ to below 2. This relationship holds controlling for income, religion, urbanization, and contraception access. UNESCO data shows that women with secondary education have 1.5 fewer children on average than women without, and women with university education have 2+ fewer children.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source: "UNESCO; World Bank; Demographic and Health Surveys",
          sourceUrl: "https://www.worldbank.org/en/topic/education/brief/girls-education",
          reasoning:
            "The education-fertility correlation is one of the most replicated findings in social science, supported by data from virtually every country. It directly supports the choice theory by showing that fertility decline accompanies women's empowerment. The near-perfect replicability gives maximum confidence in the relationship.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Technology as Escape Valve
    // =========================================================================
    {
      id: "technology-escape-valve",
      title: "Technology as Escape Valve",
      short_summary:
        "AI and automation could maintain economic output with fewer workers, immigration can supplement domestic birth rates, and longevity science may extend productive working years. The question is whether technological solutions can offset demographic decline before the economic consequences become unmanageable.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Technology offers a plausible escape from the demographic trap. AI and automation could increase output per worker by 5-10x over the next two decades, potentially allowing a smaller workforce to produce the same or greater economic output. McKinsey estimates that generative AI alone could add $4.4 trillion annually to the global economy by 2040. If each worker produces dramatically more, fewer workers are needed. Simultaneously, immigration from higher-fertility regions can supplement domestic labor forces — the US has maintained closer-to-replacement fertility partly through immigration. Longevity science may extend healthy working years by a decade or more, reducing the dependency ratio by keeping people productive longer. The combination of AI productivity, immigration, and extended healthspan could make below-replacement fertility manageable.",
      proponent_rebuttal:
        "The technology escape valve is speculative optimism dressed up as policy. AI productivity gains are real but distribution matters — if AI increases GDP while eliminating jobs that workers need for income, the economic output increase does not solve the pension funding problem. Japan has invested heavily in robotics for decades yet still faces severe labor shortages in healthcare, elder care, construction, and agriculture — sectors resistant to automation because they require physical presence, human empathy, and adaptive judgment. Immigration can supplement but not replace domestic fertility: countries competing for immigrants will face a global labor market where every developed nation is bidding for the same shrinking pool of young workers. And longevity extension, while promising, may increase healthcare costs faster than it extends productive working years, worsening the dependency ratio rather than improving it.",
      crux: {
        id: "ai-demographic-offset-capacity",
        title: "The AI Productivity Offset Model",
        description:
          "The crux is whether AI-driven productivity gains can grow fast enough to offset declining worker populations in maintaining or growing per capita GDP. If realistic AI adoption scenarios show that productivity growth per worker exceeds the rate of workforce decline, population reduction is economically manageable. If AI productivity gains are insufficient, concentrated in non-essential sectors, or create more problems than they solve (unemployment, inequality), demographic decline remains an economic crisis.",
        methodology:
          "Build sector-by-sector models of AI productivity impact for the 20 largest economic sectors, incorporating realistic adoption timelines, capital investment requirements, and displacement effects. Compare projected productivity gains against projected workforce decline under various fertility scenarios. Focus especially on sectors critical for aging populations (healthcare, elder care, construction) where automation is most difficult. Run models for the US, Japan, South Korea, Germany, and China to capture diverse economic structures.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Sector-level AI productivity modeling across multiple economies)",
      },
      evidence: [
        {
          id: "mckinsey-ai-productivity-estimate",
          title: "McKinsey: Generative AI Could Add $4.4T to Global Economy Annually",
          description:
            "McKinsey Global Institute estimates that generative AI could add $2.6-4.4 trillion annually to the global economy by automating tasks equivalent to 60-70% of current work activities. The largest impacts would be in knowledge work, customer operations, sales/marketing, software engineering, and R&D. If realized, this productivity boost could partially offset the economic impact of a shrinking workforce, maintaining per capita output even as total worker numbers decline.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "McKinsey Global Institute",
          sourceUrl: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-AI-the-next-productivity-frontier",
          reasoning:
            "McKinsey is a respected consultancy, but their AI estimates are projections with significant uncertainty, not measured outcomes. Independence is lower because McKinsey has commercial incentives to promote AI adoption among its corporate clients. The estimates address aggregate productivity, not the specific question of whether gains will offset demographic decline in healthcare, pensions, and elder care.",
        },
        {
          id: "japan-robotics-labor-shortages",
          title: "Japan: Heavy Robotics Investment Has Not Solved Critical Labor Shortages",
          description:
            "Japan has the world's highest density of industrial robots and has invested billions in robotics, yet still faces severe labor shortages in healthcare (projected 340,000 nurse shortage by 2025), elder care, construction, agriculture, and logistics. The sectors most critical for an aging population — those requiring human presence, empathy, and physical caregiving — have proven most resistant to automation. Japan's experience suggests that the 'robots will replace workers' narrative overstates current and near-term automation capability for the specific tasks that demographic decline makes most critical.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Ministry of Health, Labour and Welfare (Japan); International Federation of Robotics",
          sourceUrl: "https://www.mhlw.go.jp/english/",
          reasoning:
            "Japan's 30+ year experience with automation in the context of population aging is the best available natural experiment. The persistent labor shortages despite massive robotics investment directly challenge the 'technology escape valve' thesis. The evidence is particularly strong because Japan had both the incentive and the capability to automate but could not solve its demographic challenges through technology alone.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
