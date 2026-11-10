export const immigrationNationalIdentityData = {
  id: "immigration-national-identity",
  title: "Mass Immigration & National Identity",
  question:
    "Does high immigration change national identity without voters' consent?",
  meta_claim:
    "High levels of immigration fundamentally transform the cultural identity and social cohesion of receiving nations in ways that democratic majorities have not consented to and that integration policies cannot adequately address.",
  status: "contested" as const,
  category: "policy" as const,
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In Gallup's 2024 survey, 55% of Americans wanted immigration decreased, the first majority since 2005. Robert Putnam's 2007 study of 41 U.S. communities linked ethnic diversity to lower social trust in the short to medium term. Both sides accept those findings. The fight is over whether integration policy can carry trust through high immigration, and who decides how much immigration a country takes.",
    confidence: 84,
    source:
      "Gallup (2024); Putnam, 'E Pluribus Unum', Scandinavian Political Studies (2007)",
    sourceUrl:
      "https://news.gallup.com/poll/647123/sharply-americans-curb-immigration.aspx",
  },
  simple_case: [
    "The answer bears on how many people democracies admit and how they integrate them, and on whether voters come to trust that their say on it counts.",
  ],
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
        "The wage suppression evidence is contested. A comprehensive National Academy of Sciences report (2017) found that the long-run wage impact of immigration on native workers is 'very small' and that immigration boosts the wages of higher-skilled native workers through complementarity effects. Immigrants are about 80% more likely to start businesses than native-born Americans (Azoulay, Jones, Kim & Miranda, American Economic Review: Insights, 2022, using Census and tax records), creating jobs rather than just filling them. Fiscal analyses that show immigrants as 'net negative' typically use static snapshots that ignore the lifetime fiscal trajectory — second-generation immigrants (children of immigrants) are among the strongest net fiscal contributors in the US, paying more in taxes than both their parents and native-born peers. Immigration is the only realistic solution to the demographic time bomb facing every developed nation: without immigration, the US, EU, Japan, and South Korea face collapsing worker-to-retiree ratios that will bankrupt pension and healthcare systems.",
      proponent_rebuttal:
        "The aggregate economic case for immigration masks deeply unequal distribution of costs and benefits. Employers in agriculture, construction, hospitality, and meatpacking benefit from immigrant labor that suppresses wages — Harvard economist George Borjas estimates that immigration reduces wages for native workers without a high school degree by 7.4%. Low-income communities bear the costs of increased competition for housing, school places, and healthcare, while affluent communities benefit from cheaper services. The fiscal impact depends heavily on the skill level of immigrants: high-skilled immigrants are net fiscal contributors, but low-skilled immigrants often consume more in public services than they pay in taxes for 15-20 years. The aggregate GDP growth claim is technically true but misleading — GDP per capita, which measures individual prosperity, grows much more slowly because the gains are spread across a larger population.",
      crux: {
        id: "distributional-impact-analysis",
        title: "The Distributional Impact Accounting",
        question:
          "Are immigration's economic gains broadly shared, or do the costs fall on low-income natives?",
        description:
          "If comprehensive analyses show that the economic gains from immigration are broadly shared — or at least that losers can be compensated from the gains — then the economic case for immigration is strong. If gains accrue primarily to employers and affluent consumers while costs fall on low-income native workers and public services, the economic case becomes a distributional justice question rather than an aggregate efficiency question.",
        methodology:
          "Conduct a comprehensive distributional analysis of immigration's economic effects across income quintiles, geographic regions, and time horizons (5, 15, and 30 years). Include direct labor market effects (wages, employment), indirect effects (housing costs, public service demand), fiscal impacts (taxes paid minus services consumed), and dynamic effects (entrepreneurship, innovation, consumer spending). Compare jurisdictions with high and low immigration rates controlling for other economic variables.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A distributional analysis across income quintiles, regions and 5-, 15- and 30-year horizons that counts wages, housing costs, public-service demand and taxes paid, comparing places with different immigration levels.",
        },
        cost_to_verify:
          "$2-5M (Multi-year economic analysis using Census, IRS, and administrative data)",
        falsification: {
          supporter_flip:
            "If a distributional analysis across income quintiles, regions and 5-, 15- and 30-year horizons found immigration's gains broadly shared — or large enough to compensate low-income natives for wage, housing and public-service pressures — the economic strand of the claim would weaken.",
          skeptic_flip:
            "If distributional work replicated Borjas's 7.4% wage estimate for native workers without a high school diploma, found 15-20 year net fiscal costs for low-skilled arrivals, and showed GDP per capita lagging total GDP, the view that the gains are broadly shared would be hard to hold.",
          common_ground:
            "Both sides agree immigration raises aggregate GDP, and that its fiscal impact depends on immigrants' skill level and on the time horizon measured.",
          live_disagreement:
            "Whether the gains reach low-income natives or accrue mainly to employers and affluent consumers — with the wage effect on low-skilled workers estimated anywhere from Borjas's 7.4% to the National Academy's 'very small'.",
        },
      },
      evidence: [
        {
          id: "borjas-wage-impact",
          title: "Borjas: 1980-2000 Immigration Cut the Wages of Native High School Dropouts by 7.4% (2004)",
          description:
            "Harvard economist George Borjas's 2003 Quarterly Journal of Economics paper compares workers within education-experience groups in a national labor market and finds that 'a 10 percent increase in supply reduces wages by 3 to 4 percent.' Applying that model in a 2004 Center for Immigration Studies backgrounder, he estimated that the immigrant influx of 1980-2000 lowered the wage of native high school dropouts by 7.4 percent, of college graduates by 3.6 percent, and of the typical native worker by 3.7 percent. In a 2016 Politico Magazine essay he put the 'immigration surplus' for natives at about $50 billion a year, behind which sits a redistribution 'from the native losers to the native winners' of 'roughly a half-trillion dollars a year', from those who compete with immigrants to those who employ them.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "George J. Borjas, 'Increasing the Supply of Labor Through Immigration: Measuring the Impact on Native-born Workers', Center for Immigration Studies Backgrounder (April 2004), for the 7.4% estimate; its model is Borjas, 'The Labor Demand Curve Is Downward Sloping', Quarterly Journal of Economics 118(4) (2003), doi:10.1162/003355303322552810; Borjas, 'Yes, Immigration Hurts American Workers', Politico Magazine (September/October 2016)",
          sourceUrl: "https://cis.org/Report/Increasing-Supply-Labor-Through-Immigration",
          reasoning:
            "Borjas is a leading labor economist at Harvard and his work is rigorously quantitative. The 7.4% figure comes from his 2004 backgrounder for the Center for Immigration Studies, a group that argues for lower immigration, applying the model of his peer-reviewed 2003 paper (an earlier version of this card attributed the figure to the 2003 paper and to a '2017 update'). However, his methodology and assumptions are actively contested by other leading economists (Card, Peri) who find smaller effects using different analytical approaches. The debate is fundamentally about whether immigrant and native workers are substitutes (Borjas) or complements (Card/Peri). Replicability is moderate because results are sensitive to methodological choices.",
        },
        {
          id: "nas-immigration-report",
          title: "National Academy of Sciences: Long-Run Wage Effects of Immigration Are 'Very Small' (2017)",
          description:
            "The National Academies of Sciences, Engineering, and Medicine's 2017 consensus report, 'The Economic and Fiscal Consequences of Immigration,' finds, in the Academies' summary, that 'the long-term impact of immigration on the wages and employment of native-born workers overall is very small, and that any negative impacts are most likely to be found for prior immigrants or native-born high school dropouts.' It concludes that immigration 'has an overall positive impact on long-run economic growth in the U.S.', and that 'First-generation immigrants are more costly to governments than are the native-born, but the second generation are among the strongest fiscal and economic contributors in the U.S.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "National Academies of Sciences, Engineering, and Medicine, 'The Economic and Fiscal Consequences of Immigration' (National Academies Press, 2017)",
          sourceUrl: "https://nap.nationalacademies.org/catalog/23550/the-economic-and-fiscal-consequences-of-immigration",
          reasoning:
            "The National Academies report is the most comprehensive review of immigration economics to date, written by an expert committee of demographers and economists. Its institutional credibility gives it the highest independence and reliability scores. The 'very small' overall wage finding contradicts the strong wage suppression narrative, though the report itself locates any negative effects among prior immigrants and native-born high school dropouts, the group Borjas's estimate concerns.",
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
        "Putnam himself noted that his diversity-trust findings represent a short-term 'hunkering down' effect, not a permanent feature of diverse societies. His same data shows that the negative effects diminish over time as communities develop new, more inclusive identities. The US, Canada, and Australia — all immigrant-founded nations — have among the highest social trust levels in the world despite enormous ethnic diversity. The Scandinavian comparison is misleading: the challenge is not diversity per se but the speed and nature of refugee migration (concentrated from a few conflict zones) combined with welfare state design that was never adapted for heterogeneous populations. Countries like Canada, which use points-based skilled immigration systems and invest heavily in settlement services, demonstrate that high immigration and high social cohesion can coexist. The key variable is not the presence of immigrants but the quality of integration policy, the distribution of immigrant settlement, and the economic opportunities available to newcomers.",
      proponent_rebuttal:
        "Robert Putnam's landmark study, based on 30,000 interviews across 41 US communities, found that ethnic diversity is associated with lower social trust — not just between groups but within groups. In diverse communities, people 'hunker down,' trusting neighbors less, volunteering less, and withdrawing from civic life. Scandinavian welfare states, built on ethnic and cultural homogeneity, are eroding under immigration pressure — Sweden's gang violence crisis, Denmark's integration failures, and the rise of anti-immigration parties across Europe are not coincidence but predictable consequences of rapid demographic change without democratic consent. Social cohesion is not infinitely elastic: it depends on shared language, values, civic norms, and cultural reference points that take generations to develop and can be disrupted faster than they can be rebuilt. The pace of immigration matters as much as the total number — when communities change faster than institutions can integrate newcomers, the result is parallel societies rather than pluralism.",
      crux: {
        id: "integration-model-comparison",
        title: "The Integration Model Effectiveness Comparison",
        question:
          "Does social trust depend on integration policy, or does it fall with diversity regardless?",
        description:
          "If countries with high immigration but strong integration policies (Canada, Australia, Singapore) maintain higher social trust and cohesion than countries with similar immigration levels but weaker integration systems (Sweden, France, UK), then immigration policy design — not immigration itself — is the primary driver of social cohesion outcomes. If all high-immigration countries experience declining trust regardless of policy design, the relationship between diversity and social capital may be structural.",
        methodology:
          "Conduct a comparative analysis of 15-20 OECD countries measuring immigration rates, integration policy quality (using MIPEX or equivalent indices), social trust (World Values Survey/European Social Survey), civic participation, and crime rates. Control for economic conditions, inequality, and historical context. Track changes over 20-year periods to capture both short-term disruption and long-term integration effects. Include both skilled and humanitarian immigration pathways.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A 20-year comparison of 15-20 OECD countries pairing immigration rates and integration-policy scores (MIPEX) with World Values Survey trust, civic participation and crime, controlling for inequality and economic conditions.",
        },
        cost_to_verify:
          "$1-3M (Comparative political science analysis using existing survey data and integration indices)",
        falsification: {
          supporter_flip:
            "If a 20-year comparison of 15-20 OECD countries found high-immigration countries with strong integration policies keeping social trust and civic participation high while similar countries with weak policies did not, policy design rather than immigration itself would drive cohesion, undercutting the claim that integration cannot cope.",
          skeptic_flip:
            "If new surveys repeated Putnam's finding across communities that diversity tracks lower trust even within groups, and shared language and civic norms proved slower to rebuild than to disrupt, confidence in integration policy would weaken.",
          common_ground:
            "Both sides accept Putnam's finding that diversity is linked to lower trust in the short to medium term, and that the pace and type of immigration affect whether integration succeeds.",
          live_disagreement:
            "Whether the drop in trust is a transitional 'hunkering down' that strong integration policy overcomes, or a structural effect that appears whatever the policy — with Canada and Sweden as the contested test cases.",
        },
      },
      evidence: [
        {
          id: "putnam-diversity-trust",
          title: "Putnam: Ethnic Diversity Initially Reduces Social Trust (2007)",
          description:
            "Robert Putnam's 2007 study drew on the 2000 Social Capital Community Benchmark Survey of roughly 30,000 Americans, a national sample plus 41 communities. Its abstract reports that 'In the short run, however, immigration and ethnic diversity tend to reduce social solidarity and social capital': in ethnically diverse neighbourhoods residents of all races tend to 'hunker down', and 'Trust (even of one's own race) is lower, altruism and community cooperation rarer, friends fewer.' Putnam argued that in the long run immigration and diversity are likely to bring cultural, economic and fiscal benefits, and that successful immigrant societies overcome the fragmentation 'by creating new, cross-cutting forms of social solidarity and more encompassing identities', with illustrations from the US military, religious institutions and earlier waves of American immigration.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Robert D. Putnam, 'E Pluribus Unum: Diversity and Community in the Twenty-first Century. The 2006 Johan Skytte Prize Lecture', Scandinavian Political Studies 30(2), 137-174 (2007)",
          sourceUrl: "https://doi.org/10.1111/j.1467-9477.2007.00176.x",
          reasoning:
            "Putnam is among the most cited political scientists alive, and the study's methodology (large sample, multiple communities, extensive controls) is rigorous. The data set was public from 2001, but the full paper appeared only in 2007; the Financial Times reported in 2006 that he had held it back until he could propose remedies for diversity's negative effects, for which critics faulted him. Replicability varies: some European studies have replicated the diversity-trust link, while others find it disappears when controlling for deprivation. The finding supports the 'for' side but Putnam's own interpretation emphasizes that the effect is temporary.",
        },
        {
          id: "canada-immigration-trust",
          title: "Canada: Highest Immigrant Share in the G7 (23%), With Generalized Trust Unchanged From 2003 to 2013",
          description:
            "In the 2021 Census more than 8.3 million people, 23.0% of Canada's population, were or had been a landed immigrant or permanent resident: 'the largest proportion since Confederation, topping the previous 1921 record of 22.3%, and the highest among the G7.' Just over 1.3 million new immigrants settled permanently from 2016 to 2021. Over a decade of high immigration, generalized trust did not fall: in Statistics Canada's General Social Survey, 54% of Canadians said most people can be trusted in 2013, 'virtually unchanged from 2003.' A newer and not directly comparable series, the Canadian Social Survey, put the share at 46.8% in the second quarter of 2022 and 43.5% in the fourth quarter of 2024.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Statistics Canada, The Daily, 'Immigrants make up the largest share of the population in over 150 years and continue to shape who we are as Canadians' (26 October 2022); Martin Turcotte, 'Trends in Social Capital in Canada', Statistics Canada cat. no. 89-652-X2015002 (2015); Statistics Canada, Quality of Life indicator 'Trust in others' (Canadian Social Survey, 2022-2024)",
          sourceUrl: "https://www150.statcan.gc.ca/n1/daily-quotidien/221026/dq221026a-eng.htm",
          reasoning:
            "Canada's combination of the G7's highest immigrant share and trust that held steady from 2003 to 2013 is a counterexample to the claim that immigration inherently undermines cohesion. However, Canada's geographic isolation, points-based selection system, and specific policy investments make it a potentially non-generalizable case, and the lower readings on the newer survey since 2022 (which uses a different method, so the drop cannot be read straight off) suggest the Canadian model may have limits. (An earlier version of this card cited an OECD report for a 'top 10 in social trust' ranking that the report does not contain.)",
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
        "Democratic opinion polls on immigration are heavily influenced by media framing and economic conditions rather than reflecting stable preferences. When polls ask about immigration abstractly, majorities favor reduction; when they ask about specific immigrants (their neighbor, their colleague, refugees fleeing war), attitudes are far more favorable. The 'democratic deficit' argument assumes that immigration policy should be determined by simple majority preference, but liberal democracies have always limited majority rule through rights protections — the majority cannot vote to expel citizens or deny refugees protection under international law. Moreover, the politicians who promise to reduce immigration and win elections (Trump, Johnson, Meloni) consistently fail to do so because the economic dependence on immigrant labor is structural, not a policy choice. Without immigration, aging developed nations face labor shortages that threaten healthcare, agriculture, construction, and eldercare. The 'consent' framing frames immigration as something done to citizens rather than a structural economic and demographic necessity.",
      proponent_rebuttal:
        "In virtually every Western democracy, polls show that a majority or plurality of citizens want immigration reduced. A 2024 Gallup poll found 55% of Americans want immigration decreased — the first majority favoring less immigration since 2005. In the UK, reducing immigration was the top issue driving the Brexit vote. In Germany, the AfD's rise is directly correlated with immigration levels. Yet governments of both left and right consistently maintain immigration levels that exceed public preferences because business interests want cheap labor, progressives are unconcerned about demographic change, and bureaucratic momentum perpetuates existing policies. This gap between public preference and policy is a democratic deficit that breeds populist backlash. Citizens have a right to determine the character and composition of their political community through democratic processes — this is not xenophobia but self-determination, the same principle that underpins national sovereignty and decolonization.",
      crux: {
        id: "policy-preference-gap-driver",
        title: "The Policy-Preference Gap Causal Analysis",
        question:
          "Is the gap between public opinion and immigration policy driven by elite capture or economic necessity?",
        description:
          "If the gap between public opinion and immigration policy is driven primarily by elite capture (business lobbying, bureaucratic interests, political ideology overriding public preference), then the democratic deficit is real and reforms should align policy with public opinion. If the gap is driven by structural economic necessity (labor shortages, pension system requirements, global humanitarian obligations) that no government can override regardless of public opinion, then the 'democratic deficit' framing misdiagnoses the problem.",
        methodology:
          "Analyze immigration policy-making processes in 10 democracies (US, UK, Germany, France, Canada, Australia, Sweden, Japan, Italy, New Zealand) through: (1) lobbying data from business groups, ethnic advocacy organizations, and restrictionist groups; (2) legislative voting records and stated rationales; (3) economic modeling of what would happen to GDP, labor markets, and public finances if immigration were reduced to levels preferred in polls; (4) case studies of countries that have successfully reduced immigration (Japan, Hungary) and their economic outcomes.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Lobbying data, voting records and stated rationales in 10 democracies, plus models of what cutting immigration to match public preference would do to labor shortages in healthcare, agriculture and eldercare and to pensions.",
        },
        cost_to_verify:
          "$1-3M (Comparative political economy analysis across 10 democracies)",
        falsification: {
          supporter_flip:
            "If modeling showed that cutting immigration to match public preference would bring labor shortages in healthcare, agriculture and eldercare plus pension strain no government could accept, the gap would reflect economic necessity rather than elite capture, and the 'without consent' framing would weaken.",
          skeptic_flip:
            "If polling held at the 2024 level, with 55% of Americans wanting immigration decreased, up from 41% in 2023, while governments of both left and right kept levels above that, economic necessity would explain the gap less well.",
          common_ground:
            "Both sides agree polls in most developed democracies show majorities or pluralities wanting less immigration, and that politicians who promise cuts often fail to deliver them.",
          live_disagreement:
            "Whether that gap reflects business lobbying and ideology overriding voters, or a structural dependence on immigrant labor in aging societies that no government can wish away — and how far majority preference should govern immigration at all.",
        },
      },
      evidence: [
        {
          id: "gallup-immigration-polls",
          title: "55% of Americans Want Immigration Decreased — First Majority Since 2005 (Gallup, 2024)",
          description:
            "Gallup's annual immigration survey found that 55% of Americans in 2024 wanted immigration to the US decreased — a 14-point jump from 41% in 2023 and up from a low of 28% in 2020. This was the first time a majority favored less immigration since 2005, and the largest share since a 58% reading in 2001. The 2024 swing was driven across party lines, including an 11-point rise among independents (to 50%) and a 10-point rise among Democrats (to 28%). The finding is consistent with polling from Pew Research Center and AP-NORC showing growing public concern about immigration levels. (Note: Gallup's June 2025 follow-up showed this concern abating as the figure fell to 30%, driven mostly by Republicans, whose share fell from 88% to 48%.)",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Gallup",
          sourceUrl: "https://news.gallup.com/poll/647123/sharply-americans-curb-immigration.aspx",
          reasoning:
            "Gallup is among the most reputable polling organizations with consistent methodology over decades. The 55% figure is from the 2024 survey (an earlier version of this item mis-dated it to 2023, when the reading was 41%); the year has been corrected. The finding of majority support for immigration reduction, corroborated by other major polls, directly supports the 'democratic deficit' claim. However, polls measure stated preferences, not informed policy positions, and the 2024 peak partly reversed in 2025 — public preference is more volatile than a stable mandate.",
        },
        {
          id: "aging-workforce-dependency",
          title: "OECD: Working-Age Population to Shrink 8% by 2060; Migrants Already Help Sustain It",
          description:
            "The OECD's Employment Outlook 2025 estimates that by 2060 the working-age population will decline by 8% across the OECD, and by more than 30% in a quarter of member countries, while annual public spending on pensions and health rises by 3% of GDP. The old-age dependency ratio, people aged 65 and over relative to the working-age population, rose from 19% in 1980 to 31% in 2023 and is projected to reach 52% by 2060; without policy action, GDP per capita growth would slow from 1% a year in 2006-19 to 0.6% in 2024-60. The report's editorial says 'Regular migrants are already helping to sustain working-age populations across the OECD and play key roles in reducing labour shortages in certain sectors', but adds that 'to be a game changer, net migration rates must surpass historic values': raising flows to the level of the most open quarter of countries would add 0.08 percentage points to the median country's GDP per capita growth. It lists migrants alongside young people, women and older workers as labour reserves to mobilise.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "OECD, 'OECD Employment Outlook 2025: Can We Get Through the Demographic Crunch?' (9 July 2025), editorial and accompanying press release",
          sourceUrl: "https://www.oecd.org/en/publications/oecd-employment-outlook-2025_194a947b-en.html",
          reasoning:
            "OECD projections, built on UN population data, are authoritative, and the demographic reality of aging populations is beyond serious dispute. They support the view that governments keep immigration up out of economic need rather than elite preference. But the OECD's own estimate is that migration at historic rates is a modest lever, one of several, not a cure (an earlier version of this card gave unsourced figures and called immigration the only mechanism). Directness is moderate because the demographic necessity argument does not directly address the democratic consent question — citizens might accept immigration's economic necessity while still wanting more control over its pace and composition.",
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
      title: "Sharply More Americans Want to Curb Immigration to U.S. — Gallup (2024)",
      url: "https://news.gallup.com/poll/647123/sharply-americans-curb-immigration.aspx",
    },
    {
      title: "OECD International Migration Outlook 2023",
      url: "https://www.oecd.org/en/publications/international-migration-outlook-2023_b0f40584-en.html",
    },
    {
      title: "The Labor Demand Curve Is Downward Sloping: Reexamining the Impact of Immigration on the Labor Market — George Borjas, Quarterly Journal of Economics (2003)",
      url: "https://doi.org/10.1162/003355303322552810",
    },
    {
      title: "Increasing the Supply of Labor Through Immigration — George Borjas, Center for Immigration Studies (2004)",
      url: "https://cis.org/Report/Increasing-Supply-Labor-Through-Immigration",
    },
    {
      title: "OECD Employment Outlook 2025: Can We Get Through the Demographic Crunch?",
      url: "https://www.oecd.org/en/publications/oecd-employment-outlook-2025_194a947b-en.html",
    },
    {
      title: "Immigrants make up the largest share of the population in over 150 years — Statistics Canada, The Daily (26 October 2022)",
      url: "https://www150.statcan.gc.ca/n1/daily-quotidien/221026/dq221026a-eng.htm",
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
