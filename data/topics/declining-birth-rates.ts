import type { TopicInput } from "@/lib/schemas/topic";

export const decliningBirthRatesData = {
  id: "declining-birth-rates",
  title: "The Global Fertility Collapse",
  question:
    "Is falling fertility an existential crisis that demands policy action?",
  meta_claim:
    "The global decline in birth rates below replacement level represents an existential demographic crisis that will cause economic collapse, pension system failure, and civilizational decline unless proactively addressed through policy intervention.",
  status: "contested" as const,
  category: "economics" as const,
  last_updated: "2026-10-18",
  aliases: [
    "Falling birth rates and family policy",
    "Should governments help people have the children they want?",
    "Do housing and childcare costs explain low fertility?",
  ],
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "South Korea's total fertility rate rose from 0.72 in 2023 to 0.80 in 2025. It remains far below the roughly 2.1 replacement benchmark. The rate reflects that year's birth patterns, not women's eventual family sizes. The disagreement concerns what policy can change and how societies should adapt.",
    confidence: 90,
    source:
      "Korea Ministry of Data and Statistics, Birth Statistics in 2025, Table 1 (released August 2026)",
    sourceUrl: "https://www.mods.go.kr/boardDownload.es?bid=11773&list_no=447264&seq=1",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The UN's 2024 estimates put global fertility at 2.25 births per woman, with more than half of countries and areas below replacement. Low fertility and longer lives can strain pensions and care services, while a smaller population does not by itself imply lower income per person. Survey wishes, one-year birth rates and completed family sizes measure different things.",
    "The disagreement concerns the scope for adapting public finances, the barriers that prevent people from having the families they want, and whether productivity gains can sustain essential services with fewer workers. Demographic forecasts describe conditional paths, not a verdict on which family choices people should make.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Korea Ministry of Data and Statistics, Birth Statistics in 2025, Table 1",
      url: "https://www.mods.go.kr/boardDownload.es?bid=11773&list_no=447264&seq=1",
    },
    {
      title: "UN DESA, World Population Prospects 2024: Summary of Results",
      url: "https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/wpp2024_summary_of_results_final_web.pdf",
    },
    {
      title: "OECD, Pensions at a Glance 2025: Demographic old-age to working-age ratio",
      url: "https://www.oecd.org/en/publications/pensions-at-a-glance-2025_e40274c1-en/full-report/demographic-old-age-to-working-age-ratio_25476b96.html",
    },
    {
      title: "OECD, Society at a Glance 2024: Fertility trends and policy",
      url: "https://www.oecd.org/en/publications/society-at-a-glance-2024_918d8db3-en/full-report/fertility-trends-across-the-oecd-underlying-drivers-and-the-role-for-policy_770679b8.html",
    },
    {
      title: "World Bank WDI, Japan real GDP per capita, NY.GDP.PCAP.KD",
      url: "https://data.worldbank.org/indicator/NY.GDP.PCAP.KD?locations=JP",
    },
    {
      title: "World Bank WDI, Japan population, SP.POP.TOTL",
      url: "https://data.worldbank.org/indicator/SP.POP.TOTL?locations=JP",
    },
    {
      title: "UNFPA, State of World Population 2025, survey findings and methodology",
      url: "https://www.unfpa.org/sites/default/files/pub-pdf/EN_State%20of%20World%20Population%20report%202025.pdf",
    },
    {
      title: "Duflo, Dupas and Kremer, Education, HIV, and Early Fertility (AER, 2015)",
      url: "https://doi.org/10.1257/aer.20121607",
    },
    {
      title: "McKinsey, The economic potential of generative AI (2023)",
      url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier",
    },
    {
      title: "Japan Ministry of Health, Labour and Welfare, projected care-worker requirements (July 2024)",
      url: "https://www.mhlw.go.jp/stf/newpage_41379.html",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is the birth rate decline a crisis or a natural adjustment?",
      content:
        "A smaller future population could reduce some resource demands while making pensions and care services harder to staff and fund. Whether those pressures justify trying to raise birth rates involves values as well as economic evidence. How should governments balance adaptation, family support and reproductive freedom?",
    },
    {
      id: "q2",
      title: "Can any government policy actually raise birth rates?",
      content:
        "OECD analysis links family policy, housing and employment conditions to fertility, but leaves much of the variation unexplained. Low birth rates in countries with substantial family support do not tell us what rates would have been without that support. A policy can help families without restoring replacement fertility.",
    },
    {
      id: "q3",
      title: "Will technology make population decline irrelevant?",
      content:
        "Higher productivity, immigration and longer working lives can help support an ageing population. Their effects depend on adoption costs, employment, health and the services people need. Can these responses maintain household incomes and care quality as the workforce changes?",
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
        "Sustained low fertility can shrink future cohorts of workers relative to older residents, putting pressure on pensions and care. Whether that produces a self-reinforcing fall in income per person depends on productivity, employment, migration and policy responses.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The 'doom loop' framing confuses a challenging transition with inevitable collapse. World Bank data show Japan's real GDP per person rising between 2010 and 2023 while its population fell. That observation does not establish what caused the growth or guarantee future fiscal sustainability. Employment, productivity, migration and pension design can change the burden on contributors. A population does not automatically stabilize after one generation if fertility remains below replacement and migration does not offset the decline.",
      proponent_rebuttal:
        "Adaptation could still require difficult trade-offs in taxes, benefits, retirement and care provision. OECD projections put the average number of people aged 65 and over per 100 people aged 20 to 64 at 32.6 in 2024 and 55.2 in 2054. Those age groups are not the same as retirees and employed contributors. The projection identifies a financing challenge, not inevitable insolvency: the risk is that feasible reforms and productivity gains may be too small or too slow to preserve living standards and services.",
      crux: {
        id: "economic-sustainability-modeling",
        title: "The Sub-Replacement Sustainability Model",
        question:
          "Is there a fertility level below which falling income per person becomes self-reinforcing?",
        description:
          "The question is under which conditions sustained low fertility threatens income per person and public services. A single demographic rate cannot establish an economic tipping point independently of employment, migration, productivity and institutions. Models can compare plausible paths; they cannot prove a universal threshold by assuming away possible responses.",
        methodology:
          "Compare long-horizon demographic and fiscal models under alternative fertility, mortality, migration, employment and productivity assumptions. Test pension and care reforms, report uncertainty and distributional effects, and validate near-term predictions on data excluded from model fitting. Track income per person, public finances and service quality separately from total GDP. A threshold found in one model should be tested under other plausible assumptions.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Independently tested demographic and fiscal models, validated on withheld country data, comparing income per person, public finances and care provision under plausible productivity, migration, employment and pension reforms, with uncertainty reported.",
        },
        cost_to_verify:
          "Not costed here; scope depends on countries, datasets and independent model validation.",
        falsification: {
          supporter_flip:
            "If independently validated models and subsequent observations showed that feasible reforms preserved income per person and essential services through sustained low fertility, the case for inevitable demographic collapse would weaken.",
          skeptic_flip:
            "If independently tested models and subsequent observations showed persistent declines in income per person and care provision across plausible, feasible adaptation policies, the claim that societies could manage the transition would weaken.",
          common_ground:
            "Both cases distinguish population size from income per person, and demographic age ratios from the number of people actually working and paying contributions.",
          live_disagreement:
            "Whether feasible institutional and economic responses can preserve household living standards and essential services through sustained low fertility.",
        },
      },
      evidence: [
        {
          id: "south-korea-tfr-record",
          title: "South Korea: Fertility Rose to 0.80 in 2025 After 0.72 in 2023",
          description:
            "Korea's national birth statistics report fertility rates of 0.72 in 2023, 0.75 in 2024 and 0.80 in 2025. These describe annual birth patterns, not completed family sizes or a forecast of population decline. Without a policy counterfactual, the series cannot measure the effects of family spending.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 5,
          },
          source: "Korea Ministry of Data and Statistics, Birth Statistics in 2025, Table 1 (2026)",
          sourceUrl: "https://www.mods.go.kr/boardDownload.es?bid=11773&list_no=447264&seq=1",
          reasoning:
            "Official birth registrations provide strong descriptive evidence. The series does not identify why fertility changed, estimate completed family size or establish an economic collapse threshold.",
        },
        {
          id: "japan-per-capita-gdp-growth",
          title: "Japan's Per Capita GDP Has Grown Despite Population Decline",
          description:
            "World Bank WDI data put Japan's real GDP per person at about $33,311 in 2010 and $37,903 in 2023, in constant 2015 US dollars, an increase of about 14%. The population series falls from about 128.1 million to 124.5 million over that period. The two trends show that a smaller population can coexist with rising average output per person. They do not identify a causal effect or establish how gains were distributed.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "World Bank WDI, NY.GDP.PCAP.KD and SP.POP.TOTL, 2010 and 2023 (accessed October 2026)",
          sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.PCAP.KD?locations=JP",
          reasoning:
            "The comparison uses real output per person rather than nominal GDP or dollar exchange-rate movements. It is descriptive evidence from one country and period, not a controlled test of population decline or a guarantee of future fiscal sustainability.",
        },
        {
          id: "un-global-fertility-projections",
          title: "UN 2024: Low Fertility Is Widespread, While Global Population Still Grows",
          description:
            "World Population Prospects 2024 estimates global fertility at 2.25 births per woman, down from 3.31 in 1990, with more than half of countries and areas below 2.1. Its central population projection still rises to about 10.3 billion in the mid-2080s before declining. National population decline and continued global growth can therefore occur together. Future paths depend on fertility, mortality and migration assumptions.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source: "UN DESA Population Division, World Population Prospects 2024: Summary of Results",
          sourceUrl: "https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/wpp2024_summary_of_results_final_web.pdf",
          reasoning:
            "The UN separates demographic estimates from conditional projections. These establish the scale and uneven timing of demographic change; they do not demonstrate inevitable economic collapse or determine which policy response is justified.",
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
        "Lower fertility can reflect greater reproductive choice as well as barriers to having wanted children. Distinguishing preferences, postponement and constraints requires following people over time, rather than comparing survey ideals with a one-year national birth rate.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Choosing a smaller family or no children can be an exercise of reproductive freedom. Evidence from a Kenyan education-subsidy trial shows that schooling opportunities can change early childbearing, but it does not explain fertility trends in every society. A national birth-rate target cannot tell us which births people want. Policies should be judged partly by whether people can make their own reproductive decisions, including choosing fewer children, and not only by whether they increase the birth rate.",
      proponent_rebuttal:
        "High housing and childcare costs can prevent people from having wanted children. Survey respondents report financial constraints, but that does not show how much any subsidy would change completed births. Removing a barrier could still help families even if preferences change and replacement fertility is never restored.",
      crux: {
        id: "fertility-gap-causation",
        title: "The Fertility Gap Decomposition",
        question:
          "Is the gap between desired and actual family size mostly removable barriers, or shifting preferences?",
        description:
          "Barriers such as housing costs, childcare access and work schedules can coexist with changing preferences. The question is how much removing a specific constraint helps people realize their own prior family-size intentions. Comparing survey ideals with a one-year fertility rate cannot answer that: the latter is a hypothetical lifetime built from that year's age-specific birth rates.",
        methodology:
          "Follow comparable cohorts, repeatedly measuring personal intentions, births, relationships, health and costs. Evaluate clearly defined housing, childcare or leave-policy changes against credible comparison groups, checking prior trends and whether the intervention actually reduced the intended barrier. Follow participants far enough to distinguish earlier births from larger completed families. A cross-country comparison alone cannot establish that every relevant barrier was removed or isolate a policy effect.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Longitudinal cohorts recording intentions before a clearly defined policy change, with credible comparison groups, verified changes in costs or access, and follow-up that separates changes in birth timing from completed family size.",
        },
        cost_to_verify:
          "Not costed here; a design needs cohort follow-up, policy comparisons and a sampling plan.",
        falsification: {
          supporter_flip:
            "If well-identified policy changes substantially reduced the targeted barriers but long-term cohort tracking found little change in completed births, alongside declining personal intentions, the case that those barriers explain most of the decline would weaken.",
          skeptic_flip:
            "If credible policy comparisons showed sustained increases in completed births toward participants' previously stated intentions, without comparable changes in untreated groups, the case that low fertility mostly reflects unconstrained preferences would weaken.",
          common_ground:
            "Both cases distinguish reproductive choice from constraints, stated intentions from later outcomes, and completed family size from a one-year fertility rate.",
          live_disagreement:
            "How much specific, feasible policies help people realize their prior family intentions, after accounting for changing preferences, health, relationships and birth timing.",
        },
      },
      evidence: [
        {
          // Keep the evidence id stable for existing links; the source is now UNFPA.
          id: "fertility-gap-oecd-data",
          title: "UNFPA Survey: Financial Barriers Affect Desired Family Size",
          description:
            "UNFPA's 2025 report draws on an online YouGov survey of 14,256 adults across 14 countries. Among about 10,000 respondents who had or wanted children, 39% said finances had affected or would affect their desired family size. Coverage and representativeness varied by country. These self-reports identify perceived barriers; they do not establish a worldwide average shortfall in children or the causal effect of a subsidy.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source: "UNFPA, State of World Population 2025, pp. 18 and 143 (fieldwork November-December 2024)",
          sourceUrl: "https://www.unfpa.org/sites/default/files/pub-pdf/EN_State%20of%20World%20Population%20report%202025.pdf",
          reasoning:
            "The survey supports the existence of reported constraints in the sampled populations. Online-only coverage in some countries, urban bias, missing data and changing intentions limit generalization and causal interpretation.",
        },
        {
          id: "female-education-fertility-correlation",
          title: "Kenyan Trial: School Subsidies Reduced Early Childbearing",
          description:
            "Duflo, Dupas and Kremer's seven-year randomized evaluation in 328 western Kenyan schools found that providing free school uniforms reduced girls' dropout, pregnancy and marriage. It demonstrates that an education-cost intervention can change adolescent childbearing in that setting. It does not establish a universal education-fertility relationship, completed lifetime family size, or the cause of below-replacement fertility in rich countries.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 4,
          },
          source: "Duflo, Dupas and Kremer, American Economic Review 105(9), 2757-2797 (2015)",
          sourceUrl: "https://doi.org/10.1257/aer.20121607",
          reasoning:
            "Random assignment supports a causal effect of the subsidy in the study population. Its relevance to this map is indirect: earlier schooling and childbearing outcomes do not by themselves explain later completed fertility or establish that all low fertility is freely chosen.",
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
        "Higher productivity could help a smaller workforce support an ageing population, alongside migration and changes in employment. The question is whether gains reach essential services and public finances after adoption costs, rather than remaining aggregate economic-value projections.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Productivity growth can help sustain output as workforce numbers change. McKinsey's 2023 scenarios put generative AI's contribution to annual productivity growth through 2040 at 0.1 to 0.6 percentage points, conditional on adoption and redeployment of work. These are projections, not measured economy-wide gains. Together with employment and migration changes, useful technologies could make demographic adjustment less costly without requiring a return to replacement fertility.",
      proponent_rebuttal:
        "Aggregate productivity potential does not guarantee adequate care, household incomes or pension revenues. Gains can be uneven across sectors and households, and adoption uses capital, staff time and training. Japan's care-workforce planning illustrates rising service demand, but does not establish a future shortage or prove that automation cannot help. The challenge is whether feasible deployment and policy responses can deliver enough net benefit where an ageing population needs it.",
      crux: {
        id: "ai-demographic-offset-capacity",
        title: "The AI Productivity Offset Model",
        question:
          "Can AI productivity gains grow fast enough to offset shrinking workforces?",
        description:
          "Faster output growth per worker could offset falling worker numbers in total production, but living standards also depend on population size, distribution, public revenues and service needs. The test is whether net gains support households and essential services, rather than whether a technology has a large estimated commercial value.",
        methodology:
          "Combine measured deployment effects with sector-level workforce and service-demand projections. Include adoption costs, worker transitions, tax revenues, care quality and waiting times. Validate model predictions against subsequent deployments and compare plausible fertility, migration and employment paths. Report effects on total output and household living standards separately, with uncertainty around future capabilities.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Measured net productivity effects in care and other essential services, combined with independently checked workforce scenarios, showing effects on household income, public revenue, service quality and waiting times after deployment costs.",
        },
        cost_to_verify:
          "Not costed here; the design needs sector data, deployment comparisons and independent validation.",
        falsification: {
          supporter_flip:
            "If measured technology deployments and independently validated models showed durable gains sufficient to preserve household incomes and essential services despite workforce decline, the claim that raising birth rates is economically necessary would weaken.",
          skeptic_flip:
            "If sustained deployment trials showed that net gains in essential services fell well short of growing needs, and credible models found feasible adoption and employment responses insufficient, confidence in a technology-led demographic offset would weaken.",
          common_ground:
            "Both cases distinguish potential economic value from realized productivity, national output from household welfare, and planned staffing requirements from measured shortages.",
          live_disagreement:
            "Whether feasible technology adoption can sustain the incomes, revenues and services an ageing population needs, after accounting for costs and uneven gains.",
        },
      },
      evidence: [
        {
          id: "mckinsey-ai-productivity-estimate",
          title: "McKinsey Models $2.6-4.4 Trillion in Annual Generative-AI Value",
          description:
            "McKinsey's 2023 analysis estimates $2.6-4.4 trillion in potential annual value across 63 generative-AI use cases. Its separate estimate that activities occupying 60-70% of employee time could be technically automated includes other technologies as well as generative AI. Neither figure is a measured GDP gain or a forecast that a specified care-worker gap will be filled.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 4,
            directness: 4,
          },
          source: "McKinsey, The economic potential of generative AI (June 2023)",
          sourceUrl: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier",
          reasoning:
            "This commercial consultancy scenario depends on adoption and worker transitions. It offers a possible scale of benefit, not a causal demonstration that technology offsets demographic pressure.",
        },
        {
          id: "japan-robotics-labor-shortages",
          title: "Japan Projects a Need for 2.72 Million Care Workers by 2040",
          description:
            "Japan's health ministry's July 2024 planning estimate puts required care staffing at about 2.72 million in 2040, 570,000 above the 2.15 million workforce in 2022. The increase is projected demand relative to that baseline, not a measured or supply-adjusted 2040 shortage. It identifies the scale of care provision that adaptation must address, without isolating what automation will achieve.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source: "Japan Ministry of Health, Labour and Welfare, care-worker requirements under the ninth long-term care insurance plans (July 2024)",
          sourceUrl: "https://www.mhlw.go.jp/stf/newpage_41379.html",
          reasoning:
            "An official planning estimate is relevant to service demand, but its assumptions can change. It is not an experiment on care automation, and manufacturing robot counts would not measure that effect either.",
        },
      ],
    },
  ],
} satisfies TopicInput;
