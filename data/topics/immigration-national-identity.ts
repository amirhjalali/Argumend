export const immigrationNationalIdentityData = {
  id: "immigration-national-identity",
  title: "Mass Immigration & National Identity",
  meta_claim:
    "High levels of immigration fundamentally transform the cultural identity and social cohesion of receiving nations in ways that democratic majorities have not consented to and that integration policies cannot adequately address.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Economic Impact
    // =========================================================================
    {
      id: "economic-impact",
      title: "Economic Impact of Immigration",
      short_summary:
        "Immigrants fill critical labor shortages, start businesses at higher rates than native-born citizens, and contribute to GDP growth. But the economic benefits are not evenly distributed — employers and consumers benefit from lower labor costs, while native-born workers in competing sectors may face wage depression, and public services in high-immigration areas face increased demand.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The aggregate economic case for immigration masks deeply unequal distribution of costs and benefits. Employers in agriculture, construction, hospitality, and meatpacking benefit from immigrant labor that suppresses wages — Harvard economist George Borjas estimates that immigration reduces wages for native workers without a high school degree by 7.4%. Low-income communities bear the costs of increased competition for housing, school places, and healthcare, while affluent communities benefit from cheaper services. The fiscal impact depends heavily on the skill level of immigrants: high-skilled immigrants are net fiscal contributors, but low-skilled immigrants often consume more in public services than they pay in taxes for 15-20 years. The aggregate GDP growth claim is technically true but misleading — GDP per capita, which measures individual prosperity, grows much more slowly because the gains are spread across a larger population.",
      proponent_rebuttal:
        "The wage suppression evidence is contested. A comprehensive National Academy of Sciences report (2017) found that the long-run wage impact of immigration on native workers is 'very small' and that immigration boosts the wages of higher-skilled native workers through complementarity effects. Immigrants are 80% more likely to start businesses than native-born Americans (New American Economy, 2022), creating jobs rather than just filling them. Fiscal analyses that show immigrants as 'net negative' typically use static snapshots that ignore the lifetime fiscal trajectory — second-generation immigrants (children of immigrants) are among the strongest net fiscal contributors in the US, paying more in taxes than both their parents and native-born peers. Immigration is the only realistic solution to the demographic time bomb facing every developed nation: without immigration, the US, EU, Japan, and South Korea face collapsing worker-to-retiree ratios that will bankrupt pension and healthcare systems.",
      crux: {
        id: "distributional-impact-analysis",
        title: "The Distributional Impact Accounting",
        description:
          "If comprehensive analyses show that the economic gains from immigration are broadly shared — or at least that losers can be compensated from the gains — then the economic case for immigration is strong. If gains accrue primarily to employers and affluent consumers while costs fall on low-income native workers and public services, the economic case becomes a distributional justice question rather than an aggregate efficiency question.",
        methodology:
          "Conduct a comprehensive distributional analysis of immigration's economic effects across income quintiles, geographic regions, and time horizons (5, 15, and 30 years). Include direct labor market effects (wages, employment), indirect effects (housing costs, public service demand), fiscal impacts (taxes paid minus services consumed), and dynamic effects (entrepreneurship, innovation, consumer spending). Compare jurisdictions with high and low immigration rates controlling for other economic variables.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Multi-year economic analysis using Census, IRS, and administrative data)",
      },
      evidence: [
        {
          id: "borjas-wage-impact",
          title: "Borjas: Immigration Reduces Low-Skilled Native Wages by 7.4% (2003/2017)",
          description:
            "Harvard economist George Borjas, using the 'national skills' approach that analyzes immigration's impact within skill-experience cells, estimated that immigration between 1980-2000 reduced wages for native workers without a high school diploma by 7.4%. His 2017 update maintained this finding, arguing that immigration redistributes approximately $500 billion from native workers to employers in the US economy. The Borjas framework emphasizes that native-born and immigrant workers with similar education and experience are substitutes, not complements.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Quarterly Journal of Economics; Harvard Kennedy School",
          sourceUrl: "https://doi.org/10.1162/00335530360535135",
          reasoning:
            "Borjas is a leading labor economist at Harvard and his work is rigorously quantitative. However, his methodology and assumptions are actively contested by other leading economists (Card, Peri) who find smaller effects using different analytical approaches. The debate is fundamentally about whether immigrant and native workers are substitutes (Borjas) or complements (Card/Peri). Replicability is moderate because results are sensitive to methodological choices.",
        },
        {
          id: "nas-immigration-report",
          title: "National Academy of Sciences: Long-Run Wage Effects of Immigration Are 'Very Small' (2017)",
          description:
            "The National Academy of Sciences' comprehensive 2017 report, 'The Economic and Fiscal Consequences of Immigration,' concluded that the long-run impact of immigration on native-born wages is 'very small' for most workers, with positive effects for high-skilled natives through complementarity. The report found that immigration has an overall positive impact on long-run economic growth and that the fiscal impact depends heavily on the education level of immigrants and the time horizon analyzed. Second-generation immigrants are among the strongest net fiscal contributors.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "National Academy of Sciences; National Academies Press",
          sourceUrl: "https://nap.nationalacademies.org/catalog/23550/the-economic-and-fiscal-consequences-of-immigration",
          reasoning:
            "The NAS report is the most comprehensive, authoritative review of immigration economics ever produced, synthesizing hundreds of studies by a panel of leading economists. Its bipartisan panel and institutional credibility give it the highest independence and reliability scores. The 'very small' wage finding directly contradicts the strong wage suppression narrative, though it acknowledges short-run and sector-specific negative effects.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Social Cohesion & Trust
    // =========================================================================
    {
      id: "social-cohesion-trust",
      title: "Social Cohesion & Trust",
      short_summary:
        "Robert Putnam's research shows that diversity initially reduces social trust, civic engagement, and community cohesion in the short term. The question is whether this is a permanent feature of diverse societies or a transitional phenomenon that long-term integration can overcome, and whether the type and pace of immigration determines whether integration succeeds or fails.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Robert Putnam's landmark study, based on 30,000 interviews across 41 US communities, found that ethnic diversity is associated with lower social trust — not just between groups but within groups. In diverse communities, people 'hunker down,' trusting neighbors less, volunteering less, and withdrawing from civic life. Scandinavian welfare states, built on ethnic and cultural homogeneity, are eroding under immigration pressure — Sweden's gang violence crisis, Denmark's integration failures, and the rise of anti-immigration parties across Europe are not coincidence but predictable consequences of rapid demographic change without democratic consent. Social cohesion is not infinitely elastic: it depends on shared language, values, civic norms, and cultural reference points that take generations to develop and can be disrupted faster than they can be rebuilt. The pace of immigration matters as much as the total number — when communities change faster than institutions can integrate newcomers, the result is parallel societies rather than pluralism.",
      proponent_rebuttal:
        "Putnam himself noted that his diversity-trust findings represent a short-term 'hunkering down' effect, not a permanent feature of diverse societies. His same data shows that the negative effects diminish over time as communities develop new, more inclusive identities. The US, Canada, and Australia — all immigrant-founded nations — have among the highest social trust levels in the world despite enormous ethnic diversity. The Scandinavian comparison is misleading: the challenge is not diversity per se but the speed and nature of refugee migration (concentrated from a few conflict zones) combined with welfare state design that was never adapted for heterogeneous populations. Countries like Canada, which use points-based skilled immigration systems and invest heavily in settlement services, demonstrate that high immigration and high social cohesion can coexist. The key variable is not the presence of immigrants but the quality of integration policy, the distribution of immigrant settlement, and the economic opportunities available to newcomers.",
      crux: {
        id: "integration-model-comparison",
        title: "The Integration Model Effectiveness Comparison",
        description:
          "If countries with high immigration but strong integration policies (Canada, Australia, Singapore) maintain higher social trust and cohesion than countries with similar immigration levels but weaker integration systems (Sweden, France, UK), then immigration policy design — not immigration itself — is the primary driver of social cohesion outcomes. If all high-immigration countries experience declining trust regardless of policy design, the relationship between diversity and social capital may be structural.",
        methodology:
          "Conduct a comparative analysis of 15-20 OECD countries measuring immigration rates, integration policy quality (using MIPEX or equivalent indices), social trust (World Values Survey/European Social Survey), civic participation, and crime rates. Control for economic conditions, inequality, and historical context. Track changes over 20-year periods to capture both short-term disruption and long-term integration effects. Include both skilled and humanitarian immigration pathways.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Comparative political science analysis using existing survey data and integration indices)",
      },
      evidence: [
        {
          id: "putnam-diversity-trust",
          title: "Putnam: Ethnic Diversity Initially Reduces Social Trust (2007)",
          description:
            "Robert Putnam's 2007 study, based on the Social Capital Community Benchmark Survey of 30,000 Americans across 41 communities, found that ethnic diversity is negatively correlated with social trust, civic engagement, and neighborhood cohesion in the short to medium term. Importantly, the effect was not just inter-group distrust — people in diverse communities trusted everyone less, including members of their own ethnic group. Putnam described this as 'hunkering down.' He argued that the long-run solution is creating new, more inclusive forms of social identity, citing historical examples of previously divided groups (Irish, Italians, Jews) being integrated into a broader American identity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Scandinavian Political Studies; Harvard University",
          sourceUrl: "https://doi.org/10.1111/j.1467-9477.2007.00176.x",
          reasoning:
            "Putnam is among the most cited political scientists alive, and the study's methodology (large sample, multiple communities, extensive controls) is rigorous. He delayed publication for years because he was troubled by the findings, which enhances credibility. Replicability varies: some European studies have replicated the diversity-trust link, while others find it disappears when controlling for deprivation. The finding supports the 'for' side but Putnam's own interpretation emphasizes that the effect is temporary.",
        },
        {
          id: "canada-immigration-trust",
          title: "Canada Maintains High Social Trust Despite World's Highest Immigration Rate",
          description:
            "Canada admits approximately 400,000 permanent residents annually (about 1% of population) and has the highest foreign-born population share among G7 nations (23%). Yet Canada consistently ranks among the top 10 nations in social trust, civic engagement, and public support for immigration in international surveys (World Values Survey, OECD). Canada's points-based immigration system, multicultural policy, settlement services, and dispersed refugee resettlement are cited as factors that facilitate integration without undermining social cohesion.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Statistics Canada; World Values Survey; OECD",
          sourceUrl: "https://www.oecd.org/en/publications/international-migration-outlook-2023_b0f40584-en.html",
          reasoning:
            "Canada's combination of high immigration and high social trust is a strong counterexample to the claim that immigration inherently undermines cohesion. However, Canada's geographic isolation, points-based selection system, and specific policy investments make it a potentially non-generalizable case. Recent polling in 2023-2024 shows declining public support for immigration as housing costs rise, suggesting the Canadian model may have limits.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Democratic Consent
    // =========================================================================
    {
      id: "democratic-consent",
      title: "Democratic Consent & the Policy Gap",
      short_summary:
        "Polls consistently show that democratic majorities in most developed nations want immigration levels reduced or held constant, yet governments continue to admit immigrants at rates that exceed public preferences. The gap between public opinion and immigration policy raises fundamental questions about democratic self-determination and whether citizens have a right to control the demographic composition of their nation.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "In virtually every Western democracy, polls show that a majority or plurality of citizens want immigration reduced. A 2023 Gallup poll found 55% of Americans want immigration decreased — the highest since 2005. In the UK, reducing immigration was the top issue driving the Brexit vote. In Germany, the AfD's rise is directly correlated with immigration levels. Yet governments of both left and right consistently maintain immigration levels that exceed public preferences because business interests want cheap labor, progressives want demographic change, and bureaucratic momentum perpetuates existing policies. This gap between public preference and policy is a democratic deficit that breeds populist backlash. Citizens have a right to determine the character and composition of their political community through democratic processes — this is not xenophobia but self-determination, the same principle that underpins national sovereignty and decolonization.",
      proponent_rebuttal:
        "Democratic opinion polls on immigration are heavily influenced by media framing and economic conditions rather than reflecting stable preferences. When polls ask about immigration abstractly, majorities favor reduction; when they ask about specific immigrants (their neighbor, their colleague, refugees fleeing war), attitudes are far more favorable. The 'democratic deficit' argument assumes that immigration policy should be determined by simple majority preference, but liberal democracies have always limited majority rule through rights protections — the majority cannot vote to expel citizens or deny refugees protection under international law. Moreover, the politicians who promise to reduce immigration and win elections (Trump, Johnson, Meloni) consistently fail to do so because the economic dependence on immigrant labor is structural, not a policy choice. Without immigration, aging developed nations face labor shortages that threaten healthcare, agriculture, construction, and eldercare. The 'consent' framing frames immigration as something done to citizens rather than a structural economic and demographic necessity.",
      crux: {
        id: "policy-preference-gap-driver",
        title: "The Policy-Preference Gap Causal Analysis",
        description:
          "If the gap between public opinion and immigration policy is driven primarily by elite capture (business lobbying, bureaucratic interests, political ideology overriding public preference), then the democratic deficit is real and reforms should align policy with public opinion. If the gap is driven by structural economic necessity (labor shortages, pension system requirements, global humanitarian obligations) that no government can override regardless of public opinion, then the 'democratic deficit' framing misdiagnoses the problem.",
        methodology:
          "Analyze immigration policy-making processes in 10 democracies (US, UK, Germany, France, Canada, Australia, Sweden, Japan, Italy, New Zealand) through: (1) lobbying data from business groups, ethnic advocacy organizations, and restrictionist groups; (2) legislative voting records and stated rationales; (3) economic modeling of what would happen to GDP, labor markets, and public finances if immigration were reduced to levels preferred in polls; (4) case studies of countries that have successfully reduced immigration (Japan, Hungary) and their economic outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Comparative political economy analysis across 10 democracies)",
      },
      evidence: [
        {
          id: "gallup-immigration-polls",
          title: "55% of Americans Want Immigration Decreased — Highest Since 2005 (Gallup, 2023)",
          description:
            "Gallup's annual immigration survey found that 55% of Americans in 2023 wanted immigration to the US decreased, up from 28% in 2020 — the largest shift in Gallup's polling history on the question. Only 24% wanted immigration increased, and 19% wanted it kept at present levels. The shift occurred across all demographic groups, including Hispanics (41% favoring decrease) and Democrats (25% favoring decrease, up from 5% in 2020). The finding is consistent with polling from Pew Research Center and AP-NORC showing growing public concern about immigration levels.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Gallup",
          sourceUrl: "https://news.gallup.com/poll/1660/immigration.aspx",
          reasoning:
            "Gallup is among the most reputable polling organizations with consistent methodology over decades. The finding of majority support for immigration reduction, corroborated by other major polls, directly supports the 'democratic deficit' claim. However, polls measure stated preferences, not informed policy positions — respondents may not understand the economic trade-offs of reduced immigration.",
        },
        {
          id: "aging-workforce-dependency",
          title: "Without Immigration, Developed Nations Face Collapsing Worker-to-Retiree Ratios",
          description:
            "The OECD projects that without immigration, the working-age population (15-64) in developed nations will decline by 12% by 2050, while the 65+ population will increase by 60%. The worker-to-retiree ratio, which funds pensions and healthcare, will fall from 3.5:1 to 2:1 in the US and below 1.5:1 in Japan, Italy, and South Korea. Immigration is the only mechanism that can address this demographic imbalance in the near term (birth rate increases take 20+ years to enter the workforce). Japan, which has historically restricted immigration, faces the most severe pension and healthcare funding crisis among developed nations.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "OECD; United Nations Population Division",
          sourceUrl: "https://www.oecd.org/en/publications/international-migration-outlook-2023_b0f40584-en.html",
          reasoning:
            "OECD and UN demographic projections are authoritative and independently verified. The demographic reality of aging populations is beyond serious dispute. Directness is moderate because the demographic necessity argument does not directly address the democratic consent question — citizens might accept immigration's economic necessity while still wanting more control over its pace and composition.",
        },
      ],
    },
  ],
  references: [
    {
      title: "The Economic and Fiscal Consequences of Immigration — National Academy of Sciences (2017)",
      url: "https://nap.nationalacademies.org/catalog/23550/the-economic-and-fiscal-consequences-of-immigration",
    },
    {
      title: "E Pluribus Unum: Diversity and Community — Robert Putnam (2007)",
      url: "https://doi.org/10.1111/j.1467-9477.2007.00176.x",
    },
    {
      title: "Gallup Immigration Polls",
      url: "https://news.gallup.com/poll/1660/immigration.aspx",
    },
    {
      title: "OECD International Migration Outlook 2023",
      url: "https://www.oecd.org/en/publications/international-migration-outlook-2023_b0f40584-en.html",
    },
    {
      title: "Immigration and the Labor Market — George Borjas, Quarterly Journal of Economics (2003)",
      url: "https://doi.org/10.1162/00335530360535135",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does immigration at current levels threaten social cohesion, or does it enrich society?",
      content:
        "Putnam's research shows diversity initially reduces social trust, but the effect diminishes over time as communities develop new inclusive identities. Canada demonstrates that high immigration and high social cohesion can coexist with the right policies. The question may be less about whether immigration affects cohesion and more about whether governments invest adequately in integration.",
    },
    {
      id: "q2",
      title: "Do citizens have a right to control the cultural composition of their nation?",
      content:
        "This is a tension between liberal universalism and democratic self-determination. Polls consistently show majorities wanting less immigration. Liberal democracies limit majority rule through rights protections, but the gap between public preference and immigration policy breeds populist backlash that threatens the liberal democratic order itself.",
    },
    {
      id: "q3",
      title: "Why is immigration policy so difficult to reform in democracies?",
      content:
        "Business interests want labor, progressives want inclusion, populists want restriction — the coalition math produces dysfunction. Add demographic necessity (aging populations need young workers) and humanitarian obligations (refugees), and no simple 'more' or 'less' answer is adequate. The challenge is designing systems that are economically functional, socially sustainable, and democratically legitimate.",
    },
  ],
};
