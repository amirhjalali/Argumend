import type { TopicInput } from "@/lib/schemas/topic";

export const decliningBirthRatesData = {
  id: "declining-birth-rates",
  title: "The Birth-Rate Decline",
  question: "Are falling birth rates a crisis that governments should try to fix?",
  meta_claim:
    "Falling birth rates are a serious problem for rich countries, driven largely by costs and barriers that stop people having the children they want, and governments should act to raise them.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: final 2025 US data (NCHS Data Brief 571, 21 Oct
  // 2026) count 3,612,012 births and a record-low general fertility rate of
  // 53.2; the 2024 total fertility rate was a record-low 1.5995 (NVSR 75-2).
  // South Korea 0.80 in 2025 (preliminary); Hungary 1.31 in 2025 (KSH,
  // 30 Jan 2026), down from 1.39.
  last_updated: "2026-11-03",
  aliases: [
    "Is falling fertility an existential crisis that demands policy action?",
    "Falling birth rates and family policy",
    "Should governments help people have the children they want?",
    "Do housing and childcare costs explain low fertility?",
    "Do baby bonuses work?",
  ],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "The United States recorded 3,612,012 births in 2025, and its birth rate fell to a record low of 53.2 per 1,000 women aged 15 to 44. At 2024 rates, a woman would have about 1.6 children in her life, against the 2.1 that keeps a population level without immigration. South Korea is at 0.80. Hungary, after a decade of family subsidies, fell from 1.39 to 1.31 in 2025. Both sides accept those numbers. The fight is over whether this is a crisis, why it is happening, and whether governments can or should change it.",
    confidence: 92,
    source:
      "CDC/NCHS Data Brief No. 571, 'Births in the United States, 2025' (21 October 2026); NCHS, 'Births: Final Data for 2024' (June 2026); Hungarian Central Statistical Office (30 January 2026)",
    sourceUrl: "https://www.cdc.gov/nchs/data/databriefs/db571.pdf",
  },
  simple_case: [
    "The answer shapes pensions, taxes, immigration and what a family is paid for having a child. A smaller generation of workers pays for a larger generation of retirees.",
    "Governments are already betting on an answer. A 2025 US law puts $1,000 into a 'Trump account' for each American baby born from 2025 through 2028. South Korea, after two decades of spending, has seen births rise two years running. Hungary, whose former family minister put its family spending at 6% of GDP, saw births fall 7% in 2025.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "CDC/NCHS Data Brief No. 571: Births in the United States, 2025 (October 2026)",
      url: "https://www.cdc.gov/nchs/data/databriefs/db571.pdf",
    },
    {
      title: "NCHS, Births: Final Data for 2024, National Vital Statistics Reports 75(2) (June 2026)",
      url: "https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-02.pdf",
    },
    {
      title: "UN DESA, World Population Prospects 2024: Summary of Results",
      url: "https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/wpp2024_summary_of_results_final_web.pdf",
    },
    {
      title: "Lutz, Sobotka and Zeman, 'Evaluating pronatalist policies with TFR brings misleading conclusions: examples from Hungary', N-IUSSP (March 2024)",
      url: "https://www.niussp.org/fertility-and-reproduction/evaluating-pronatalist-policies-with-tfr-brings-misleading-conclusions-examples-fromhungary/",
    },
    {
      title: "Kearney, Levine and Pardue, 'The Puzzle of Falling US Birth Rates since the Great Recession', Journal of Economic Perspectives (2022)",
      url: "https://www.aeaweb.org/articles?id=10.1257/jep.36.1.151",
    },
    {
      title: "Milligan, 'Subsidizing the Stork: New Evidence on Tax Incentives and Fertility', NBER Working Paper 8845",
      url: "https://www.nber.org/papers/w8845",
    },
    {
      title: "OECD, Pensions at a Glance 2025: Demographic old-age to working-age ratio",
      url: "https://www.oecd.org/en/publications/pensions-at-a-glance-2025_e40274c1-en/full-report/demographic-old-age-to-working-age-ratio_25476b96.html",
    },
    {
      title: "IRS, Trump Accounts",
      url: "https://www.irs.gov/trumpaccounts",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What low fertility does to a country
    // =========================================================================
    {
      id: "demographic-doom-loop",
      title: "Fewer Babies, Older Countries: How Big a Problem?",
      short_summary:
        "Below 2.1 children per woman, each generation is smaller than the last unless immigrants fill the gap. The OECD projects 55 people aged 65 and over for every 100 aged 20 to 64 by 2054, up from about 33 in 2024. Japan's population has shrunk while its output per person rose. Whether low fertility drags down living standards, or only forces hard choices about pensions and care, is the first split.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "A shrinking population is a problem to manage, not a catastrophe. Japan's population fell from about 128.1 million in 2010 to 124.5 million in 2023, yet its real output per person rose about 14%, by World Bank figures. Living standards depend on output per person, which turns on productivity, how long people keep working and how pensions are designed, not on the head count. The world is not emptying: the UN's central projection has the global population still growing, to about 10.3 billion in the mid-2080s. Fewer people also means less pressure on housing, land and emissions. Calling low fertility an existential threat invites panicky policy aimed at women's choices, when the useful fixes are dull ones: later retirement, more immigration and pension rules that adjust to longer lives.",
      proponent_rebuttal:
        "The arithmetic of aging is hard to escape. The OECD projects that across its members the number of people aged 65 and over for every 100 aged 20 to 64 will rise from 32.6 in 2024 to 55.2 in 2054. Pensions and health care for the old are paid mostly by the taxes of the working young, so a smaller working generation means higher taxes, lower benefits or both. The US fertility rate hit a record low of 1.6 in 2024, and births fell again in 2025. Japan's rise in output per person came with the world's oldest population, and its own health ministry projects it will need 570,000 more care workers by 2040 than it had in 2022. At South Korea's 0.80, each generation is less than half the size of the one before. Fewer young people also means fewer workers, founders and taxpayers to carry the debts the old leave behind.",
      crux: {
        id: "economic-sustainability-modeling",
        title: "The Living-Standards Test",
        question:
          "Will low birth rates push down living standards, or can aging countries adjust without more babies?",
        description:
          "Japan, Italy and South Korea have lived with low fertility for decades. The test is whether their income per person, pension finances and care for the old hold up, and how much of any trouble comes from the age structure itself rather than from productivity, migration and policy choices.",
        methodology:
          "Long-run fiscal and economic projections under different fertility, migration, retirement-age and productivity paths, checked against what happened in countries whose fertility fell below 1.5 decades ago. Track income per person, pension balances and care provision separately from total GDP.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Income per person, pension balances and care waiting times in Japan, Italy and South Korea over the next decade, set against earlier projections that assumed adjustment through later retirement, migration and productivity, to see which projections held.",
        },
        cost_to_verify: "$500K (Existing national accounts and official projections)",
        falsification: {
          supporter_flip:
            "If Japan, Italy and South Korea kept income per person rising and their pension systems solvent through the 2030s with modest reforms such as later retirement, the case that low fertility is a crisis for living standards would weaken.",
          skeptic_flip:
            "If those countries saw income per person stall while taxes, or waits for care, climbed despite later retirement, more migration and automation, the view that aging is a manageable transition would be hard to hold.",
          common_ground:
            "Both sides agree the US fertility rate was about 1.6 in 2024, well below 2.1, that populations age as fertility falls, and that a smaller population does not by itself mean lower income per person.",
          live_disagreement:
            "Whether the adjustments an aging country can make, such as later retirement, immigration and faster productivity growth, are big and fast enough to protect pensions, care and living standards.",
        },
      },
      evidence: [
        {
          id: "us-births-2025-record-low",
          title: "NCHS 2025: 3.61 Million US Births and a Record-Low Birth Rate",
          description:
            "Final 2025 data counted 3,612,012 US births, down less than 1% from 2024, and a general fertility rate of 53.2 births per 1,000 women aged 15 to 44, a record low. Birth rates fell to record lows for women under 30 and rose for women aged 30 to 44. The total fertility rate in 2024 was 1,599.5 births per 1,000 women, also a record low, and has been below the 2,100 replacement level consistently since 2008.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 5,
          },
          source:
            "CDC/NCHS Data Brief No. 571 (21 October 2026); NCHS, 'Births: Final Data for 2024', NVSR 75(2) (9 June 2026)",
          sourceUrl: "https://www.cdc.gov/nchs/data/databriefs/db571.pdf",
          reasoning:
            "Birth certificates are the firmest numbers in this debate. They show how many babies are born, not whether that is a crisis. Rising birth rates after 30 mean part of the fall is delay, and a one-year rate is not the number of children women will end up having.",
        },
        {
          id: "un-global-fertility-projections",
          title: "UN 2024: World Fertility Down to 2.25, Below 2.1 in More Than Half of Countries",
          description:
            "World Population Prospects 2024 estimates global fertility at 2.25 births per woman, down from 3.31 in 1990, with more than half of countries and areas below 2.1. Its central projection still has the world's population rising to about 10.3 billion in the mid-2080s before it declines. Many countries can shrink while the world still grows.",
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
            "Shows how widespread low fertility is. The projections are conditional on assumed fertility, mortality and migration, and say nothing about whether a smaller population is worse off.",
        },
        {
          id: "japan-per-capita-gdp-growth",
          title: "World Bank: Japan Shrank About 3% From 2010 to 2023 While Real Output per Person Rose 14%",
          description:
            "World Bank data put Japan's real GDP per person at about $33,311 in 2010 and $37,903 in 2023, in constant 2015 US dollars, an increase of about 14%. Its population fell from about 128.1 million to 124.5 million over the same period.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "World Bank WDI, NY.GDP.PCAP.KD and SP.POP.TOTL, 2010 and 2023",
          sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.PCAP.KD?locations=JP",
          reasoning:
            "The best-known case of a country shrinking while getting richer per head. It is one country over 13 years, it says nothing about how the gains were shared, and it does not show that Japan's pensions and care can last.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Why people have fewer children
    // =========================================================================
    {
      id: "choice-theory",
      title: "Are People Having Fewer Children Than They Want?",
      short_summary:
        "Americans put the ideal family at 2.7 children, but the average woman now has about 1.6. Cost is one reason people give; not wanting children is a bigger one. Whether the gap is mostly barriers that money could remove, or mostly changed wishes, is the second split.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Most people having fewer children are choosing to. In Pew's 2024 survey of adults under 50 who say they are unlikely ever to have children, 57% said a major reason was that they just don't want to and 44% wanted to focus on other things, such as work; 36% cited cost. The share of childless adults under 50 who expect never to have children rose from 37% in 2018 to 47% in 2023. Economists Melissa Kearney and Phillip Levine searched for the cause of the US decline since 2007 and, beyond the Great Recession, could not find any economic, policy or social factor that explained much of it; they point to the 'shifting priorities' of younger adults. An ideal family size costs nothing to state in a poll. Treating a choice as a market failure leads governments to pay people to live differently than they want to.",
      proponent_rebuttal:
        "People still want families, and costs are getting in the way. In Gallup's 2023 poll Americans put the ideal number of children at 2.7 on average, and 45% said three or more, the highest share since 1971. Actual fertility is about 1.6. In UNFPA's 2025 survey across 14 countries, 39% of people who had or wanted children said money had limited, or would limit, the size of their family. Births are moving later: in 2025 US birth rates fell to record lows for women under 30 and rose for women aged 30 to 44, and every year of delay leaves less time for a second or third child. A gap between the family people want and the one they have is not a free choice. It is a constraint, and constraints like the price of housing and childcare can be eased.",
      crux: {
        id: "fertility-gap-causation",
        title: "The Wanted-Children Gap",
        question:
          "Do people have fewer children than they want because of cost, or because they now want fewer?",
        description:
          "Survey ideals, one-year birth rates and completed family sizes measure different things. The test is whether people whose costs fall go on to have the families they said they wanted, or whether their intentions shrink regardless.",
        methodology:
          "Follow the same people for a decade or more, recording intended family size, relationships, housing and childcare costs, and births. Compare those hit by a clear change in costs or benefits with similar people who were not, and separate earlier births from larger completed families.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Panels that record each person's intended number of children before a change in housing costs, childcare prices or benefits, then count births a decade later against similar people whose costs did not change.",
        },
        cost_to_verify: "$3M (Ten-year panel survey linked to birth records)",
        falsification: {
          supporter_flip:
            "If panels following people for a decade found that those whose housing or childcare costs fell had no more children than similar people whose costs did not, and that intended family sizes kept falling, the case that cost is holding families back would weaken.",
          skeptic_flip:
            "If people whose costs fell went on to have the larger families they had said they wanted, closing much of the gap between Gallup's 2.7 ideal and the 1.6 actual, the view that low fertility is mostly a free choice would be hard to hold.",
          common_ground:
            "Both sides agree Americans' stated ideal family size, 2.7 children in 2023, sits well above the fertility rate, and that most childless adults under 50 who expect no children say they simply don't want them.",
          live_disagreement:
            "Whether the gap between ideal and actual family size reflects barriers policy can lower or a real change in what people want, and whether a government should try to change either.",
        },
      },
      evidence: [
        {
          id: "gallup-ideal-family-size-2023",
          title: "Gallup 2023: Americans' Ideal Family Is 2.7 Children; 45% Say Three or More",
          description:
            "In Gallup polls conducted in June and July 2023, 45% of US adults said three or more children was the ideal family size, up four points from 2018 and the highest share since 1971. The average ideal was 2.7 children.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Gallup, 'Americans' Preference for Larger Families Highest Since 1971' (2023)",
          sourceUrl: "https://news.gallup.com/poll/511238/americans-preference-larger-families-highest-1971.aspx",
          reasoning:
            "A long-running question shows people have not stopped valuing larger families. An ideal for families in general is not a personal plan, and it does not say what stops anyone from reaching it.",
        },
        {
          // Keep the evidence id stable for existing links; the source is UNFPA.
          id: "fertility-gap-oecd-data",
          title: "UNFPA 2025: 39% of People Who Want Children Say Money Limits Their Family Size",
          description:
            "UNFPA's 2025 report draws on a YouGov online survey of 14,256 adults in 14 countries, fielded in November and December 2024. Among about 10,000 respondents who had or wanted children, 39% said finances had affected or would affect the number of children they have.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "UNFPA, State of World Population 2025, pp. 18 and 143",
          sourceUrl: "https://www.unfpa.org/sites/default/files/pub-pdf/EN_State%20of%20World%20Population%20report%202025.pdf",
          reasoning:
            "Direct evidence that many people feel a cost barrier. It is self-reported and online, with uneven coverage by country, and it cannot say how many more children a subsidy would produce.",
        },
        {
          id: "pew-childless-reasons-2024",
          title: "Pew 2024: 57% of Adults Under 50 Who Expect No Children Say They Just Don't Want Them",
          description:
            "In Pew's April-May 2024 survey of 770 adults aged 18 to 49 without children who say they are unlikely to have them, the major reasons given were: they just don't want to (57%), they want to focus on other things such as career or interests (44%), concerns about the state of the world (38%), they can't afford to raise a child (36%) and concerns about the environment (26%). The share of childless adults under 50 who say they are unlikely ever to have children rose from 37% in 2018 to 47% in 2023.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Pew Research Center, 'The Experiences of U.S. Adults Who Don't Have Children' (25 July 2024)",
          sourceUrl: "https://www.pewresearch.org/social-trends/2024/07/25/the-experiences-of-u-s-adults-who-dont-have-children/",
          reasoning:
            "The clearest evidence that preference, not price, leads among people who expect no children. It covers only that group, not parents who stop at one, and stated reasons can rationalise constraints people have stopped noticing.",
        },
        {
          id: "kearney-levine-shifting-priorities",
          title: "Kearney, Levine and Pardue 2022: No Economic or Policy Factor Explains Much of the US Decline After 2008",
          description:
            "Studying the fall in US birth rates from 2007 to 2020, the economists found declines across many groups, including teens, Hispanic women and college-educated white women. The Great Recession contributed early on, but 'we are unable to identify any other economic, policy, or social factor that has changed since 2007 that is responsible for much of the decline beyond that.' They conjecture that 'shifting priorities' of recent cohorts, reflecting changes in preferences for having children, aspirations for life and parenting norms, may be responsible.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Kearney, Levine and Pardue, 'The Puzzle of Falling US Birth Rates since the Great Recession', Journal of Economic Perspectives 36(1), 151-76 (2022)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/jep.36.1.151",
          reasoning:
            "A careful search by leading economists that came up empty on cost-based explanations. 'Shifting priorities' is the authors' conjecture, not a measured cause, and the paper covers the US only.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Does pronatalist policy work?
    // =========================================================================
    {
      id: "pronatalist-policy",
      title: "Can Governments Pay for More Babies?",
      short_summary:
        "Hungary's fertility rose from 1.25 in 2010 to 1.59 in 2021 under heavy family spending, then fell to 1.31 in 2025. South Korea's health minister said in 2023 that about 320 trillion won had gone into the problem since 2006; its rate fell to 0.72, then rose to 0.80. Whether such spending adds children over a lifetime, or only changes when they are born, is the third split.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Pronatalist spending buys timing, not children. Demographers Wolfgang Lutz, Tomáš Sobotka and Kryštof Zeman found that Hungary's 'seemingly impressive upturns' in fertility were 'largely fueled by a slowdown in the shift to later parenthood.' A measure adjusted for timing hovered around 1.5 to 1.6 from 2010 to 2020, and births were about the same in 2020 (92,000) as in 2010 (90,000). Then the rate fell from 1.39 in 2024 to 1.31 in 2025 and births dropped 7%, though Hungary's former family minister claimed family spending of 6% of GDP. South Korea's health minister told parliament in 2023 that about 320 trillion won had gone to low fertility since 2006, a period in which the rate fell to 0.72. Its recent rise followed 20 straight months of rising marriages. Money that does little for births could be spent on schools, care or debt.",
      proponent_rebuttal:
        "Money changes births when it is large and lasting. When Quebec paid families up to C$8,000 for a child, economist Kevin Milligan found 'a strong effect of the policy on fertility', measured both when the payment began and when it was cancelled. Hungary's fertility rate rose by about a quarter between 2010 and 2021 as its family spending grew. South Korea's births have risen two years running, and its statistics ministry credits more marriages, more women in their early 30s and government support for childbirth. A policy does not have to restore 2.1 to be worth it: moving a country from 1.3 to 1.5 makes each new generation about 15% larger. That a measure is expensive is a reason to design it well, not to give up.",
      crux: {
        id: "pronatalist-policy-effect",
        title: "The Completed-Family Test",
        question:
          "Do baby bonuses and family subsidies raise how many children women have in total, or only when they have them?",
        description:
          "A one-year fertility rate rises when births are moved earlier, even if no extra child is ever born. The test is completed family size: how many children women have by their mid-40s, in places with and without the benefits.",
        methodology:
          "Compare completed fertility of women born in the 1980s and 1990s in Hungary, Quebec and South Korea with similar women in comparable countries or provinces without the benefits, using birth registers. Use timing-adjusted rates for cohorts not yet finished.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Completed family size of women born in the 1980s and 1990s in Hungary, Quebec and South Korea, once they reach their mid-40s, compared with similar women in places without the benefits, alongside timing-adjusted fertility rates in the meantime.",
        },
        cost_to_verify: "$300K (Existing birth registers and cohort data)",
        falsification: {
          supporter_flip:
            "If women who spent their childbearing years under Hungary's and South Korea's big subsidies ended their 40s with no more children than similar women elsewhere, the case that pronatalist spending works would weaken.",
          skeptic_flip:
            "If those women finished with clearly larger families than comparable women without the benefits, as Quebec's families responded to its cash payments, the view that policy only shifts timing would be hard to hold.",
          common_ground:
            "Both sides agree Hungary's fertility rate rose from 1.25 in 2010 to 1.59 in 2021 and fell to 1.31 in 2025, and that South Korea's rose from 0.72 in 2023 to 0.80 in 2025.",
          live_disagreement:
            "Whether those swings mean lasting extra children or births moved earlier and later, and whether the money would do more good spent another way.",
        },
      },
      evidence: [
        {
          id: "milligan-quebec-baby-bonus",
          title: "Milligan: Quebec's Payment of Up to C$8,000 per Child Had 'a Strong Effect' on Fertility",
          description:
            "Kevin Milligan studied a Quebec transfer that paid up to C$8,000 to families having a child, using a triple-difference design that compared groups by time, province and family type, at both the program's introduction and its cancellation. He found 'a strong effect of the policy on fertility', with some evidence that families responded differently.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Kevin Milligan, 'Subsidizing the Stork: New Evidence on Tax Incentives and Fertility', NBER Working Paper 8845 (2002); Review of Economics and Statistics (2005)",
          sourceUrl: "https://www.nber.org/papers/w8845",
          reasoning:
            "A clean test of cash for births, with a comparison group and an on-off switch. It is one province, decades ago, and the design cannot fully separate extra children from children born sooner.",
        },
        {
          id: "south-korea-tfr-record",
          title: "South Korea: Fertility Rose From 0.72 in 2023 to 0.80 in 2025",
          description:
            "Korea's national birth statistics report fertility rates of 0.72 in 2023, 0.75 in 2024 and 0.80 in 2025. In January 2026 the statistics ministry linked the rise in births to a continued increase in marriages, which had grown for 20 months in a row, 'government policies supporting childbirth' and 'the growth in the population of women in their early 30s.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 4,
          },
          source:
            "Korea Ministry of Data and Statistics, Birth Statistics in 2025, Table 1 (2026); Yonhap via The Korea Times (28 January 2026)",
          sourceUrl: "https://www.mods.go.kr/boardDownload.es?bid=11773&list_no=447264&seq=1",
          reasoning:
            "Official counts show the first sustained rise in a decade. The ministry names three causes and does not say how much each contributed; the rate is still far below 2.1.",
        },
        {
          id: "hungary-tfr-tempo-effect",
          title: "Lutz, Sobotka and Zeman 2024: Hungary's Fertility Rise Was 'Largely Fueled' by Timing",
          description:
            "Hungary's fertility rate rose from a record low of 1.25 in 2010 to 1.59 in 2021, about 27%. But the authors found that 'the seemingly impressive upturns in the TFR have been largely fueled by a slowdown in the shift to later parenthood.' A rate adjusted for timing and birth order 'hovering around 1.5-1.6' did not change much between 2010 and 2020; annual births were 90,000 in 2010 and 92,000 in 2020; and completed fertility was 'steadily declining' among women born in the 1960s and 1970s. Former family minister Katalin Novák had claimed family spending of 6% of GDP.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Wolfgang Lutz, Tomáš Sobotka and Kryštof Zeman, 'Evaluating pronatalist policies with TFR brings misleading conclusions: examples from Hungary', N-IUSSP (4 March 2024)",
          sourceUrl: "https://www.niussp.org/fertility-and-reproduction/evaluating-pronatalist-policies-with-tfr-brings-misleading-conclusions-examples-fromhungary/",
          reasoning:
            "Leading demographers using the right measures for this question. Cohorts born in the 1990s have not finished having children, so a lasting effect cannot yet be ruled out; the 6% spending figure is a minister's claim, not an audited number.",
        },
        {
          id: "hungary-births-2025",
          title: "Hungarian Statistics Office: Fertility Fell to 1.31 in 2025 and Births Dropped 7.1%",
          description:
            "Preliminary data put Hungary's 2025 births at about 72,000, 7.1% (5,511) fewer than in 2024. The estimated total fertility rate was 1.31 children per woman, down from 1.39 a year earlier.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "Hungarian Central Statistical Office (KSH), Népmozgalom, 2025 (30 January 2026)",
          sourceUrl: "https://www.ksh.hu/gyorstajekoztatok/nep/nep2512.html",
          reasoning:
            "Official counts showing the gains of the 2010s unwinding while family support continued. A falling rate does not show what would have happened without the policies.",
        },
        {
          id: "korea-320-trillion-won",
          title: "Korea's Health Minister, 2023: About 320 Trillion Won Spent on Low Fertility Since 2006",
          description:
            "Health and Welfare Minister Cho Kyu-hong told the National Assembly's special committee on the population crisis on 31 March 2023 that about 320 trillion won had been invested in low fertility over 17 years since 2006, and about 200 trillion won in aging. South Korea's fertility rate was then 0.78.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source: "Asia Economy, '320 Trillion Won Over 17 Years Since 2006' (31 March 2023)",
          sourceUrl: "https://www.asiae.co.kr/en/article/2023033115065594764",
          reasoning:
            "The spending figure behind the 'cash doesn't work' argument. The total covers many programs, the minister did not say how much went directly to families with children, and it cannot show what fertility would have been without them.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Adapt instead?
    // =========================================================================
    {
      id: "technology-escape-valve",
      title: "Or Adapt: Immigrants, Longer Careers and Machines?",
      short_summary:
        "Immigration supplied 84% of US population growth in 2024. Japan, which takes few immigrants, projects needing 570,000 more care workers by 2040. Whether countries should adapt to fewer births instead of trying to raise them is the fourth split, and it is also a values fight about immigration and about women's choices.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Countries can adapt instead of trying to change how many children people have. In 2024 net immigration added 2.8 million people to the US, 84% of its population growth, while births outnumbered deaths by only about 519,000. Working lives can lengthen as health improves, and pension formulas can be tied to life expectancy. Machines and software can take over some routine work, in care homes as in factories. Pronatalism also carries a moral cost: a government with a birth target ends up judging women's choices about the most personal decision they make. Adapting respects people's decisions and uses tools that do not depend on changing them.",
      proponent_rebuttal:
        "Adaptation has limits that births do not. Immigration is politically contested and cannot be dialled up at will, and it draws on the same falling fertility worldwide that rich countries face at home. Japan's health ministry projects the country will need about 2.72 million care workers in 2040, 570,000 more than it had in 2022, and no machine yet bathes, lifts and feeds frail people at scale. Raising the retirement age is unpopular and does least for workers in physical jobs. Helping people have the children they say they want is not coercion. It widens choice, and it is the only adjustment that adds young people for the long run.",
      crux: {
        id: "ai-demographic-offset-capacity",
        title: "The Adaptation Test",
        question:
          "Can immigration, later retirement and automation keep an aging country running without more births?",
        description:
          "Japan and Germany are leaning on different mixes of migration, later retirement and automation. The test is whether those mixes meet the care, labour and pension needs their own governments project, without a rise in births.",
        methodology:
          "Track care staffing against projected need, pension balances, employment of people over 65 and output per worker in Japan and Germany through the 2030s, alongside measured effects of care automation where it is deployed.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Care staffing, pension balances and output per worker in Japan and Germany over the next decade, as each leans on different mixes of migration, later retirement and automation, compared with the needs their own governments project.",
        },
        cost_to_verify: "$500K (Official labour, pension and care statistics)",
        falsification: {
          supporter_flip:
            "If Japan closed its projected care-worker gap through automation, migration and longer careers while keeping the quality of care, the case that only higher birth rates can sustain an aging country would weaken.",
          skeptic_flip:
            "If Japan and Germany fell well short of their projected care and labour needs despite migration, later retirement and automation, the view that adaptation can stand in for births would be hard to hold.",
          common_ground:
            "Both sides agree immigration supplied most US population growth in 2024, and that Japan projects needing hundreds of thousands more care workers by 2040 than it had in 2022.",
          live_disagreement:
            "Whether adaptation can cover the gap, and a value question no data settles: whether a government should aim at a birth rate at all, or only at helping people have the families they choose.",
        },
      },
      evidence: [
        {
          id: "japan-robotics-labor-shortages",
          title: "Japan Projects a Need for 2.72 Million Care Workers by 2040, 570,000 More Than in 2022",
          description:
            "Japan's health ministry's July 2024 planning estimate puts required care staffing at about 2.72 million in 2040, 570,000 above the 2.15 million workforce in 2022. The increase is projected demand against that baseline, not a measured shortage.",
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
            "An official estimate of how much more care an aging country will need. It is a planning figure whose assumptions can change, and it does not test what automation or migration could supply.",
        },
        {
          id: "census-immigration-growth-2024",
          title: "Census Bureau 2024: Immigration Was 84% of US Population Growth",
          description:
            "The US population grew by nearly 1.0% between 2023 and 2024. Net international migration of 2.8 million people accounted for 84% of the 3.3 million increase, while births outnumbered deaths by nearly 519,000.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "US Census Bureau, Vintage 2024 population estimates press release (19 December 2024)",
          sourceUrl: "https://www.census.gov/newsroom/press-releases/2024/population-estimates-international-migration.html",
          reasoning:
            "Shows how much a country's size can depend on migration rather than births. It is a single year of unusually high immigration, and migration levels are set by politics that can reverse.",
        },
      ],
    },
  ],
} satisfies TopicInput;
