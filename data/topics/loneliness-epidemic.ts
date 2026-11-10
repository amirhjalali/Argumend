import type { TopicInput } from "@/lib/schemas/topic";

export const lonelinessEpidemicData = {
  id: "loneliness-epidemic",
  title: "The Loneliness Epidemic: Real or Overblown?",
  question: "Is loneliness a public health crisis, or are we medicalizing a normal feeling?",
  meta_claim:
    "Loneliness has become widespread and harmful enough to health that it should be treated as a public health crisis, with governments and institutions acting to reduce it.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: BLS ATUS 2025 results (25 June 2026) put
  // socializing and communicating at 35 minutes a day, against 41 in 2015;
  // WHO Commission on Social Connection report (30 June 2025); Gallup on
  // young US men (20 May 2025); England's Community Life Survey 2023/24
  // (published 4 December 2024).
  last_updated: "2026-11-03",
  aliases: [
    "Is loneliness a public health crisis?",
    "Is there really a loneliness epidemic?",
    "Is loneliness as deadly as smoking 15 cigarettes a day?",
  ],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Americans spent an average of 35 minutes a day socializing and communicating in 2025, down from 41 minutes in 2015. Time spent with friends fell from 60 minutes a day in 2003 to 34 in 2019, and to 20 in 2020. In 2023 the US Surgeon General called loneliness an epidemic, and in 2025 the World Health Organization linked it to 871,000 deaths a year. Both sides accept that people spend less time together. The fight is over whether that has made them lonelier, and whether loneliness itself makes people sick.",
    confidence: 85,
    source:
      "Bureau of Labor Statistics, American Time Use Survey 2025 results (25 June 2026); Kannan and Veazie, SSM Population Health (2023); WHO (30 June 2025)",
    sourceUrl: "https://www.bls.gov/news.release/atus.nr0.htm",
  },
  simple_case: [
    "The answer decides whether doctors screen for loneliness, whether cities fund clubs, libraries and parks as health spending, and whether lawmakers treat social media as a threat to public health.",
    "It is a live choice. England has had a minister for loneliness since 2018, the WHO set up a commission on social connection, and in May 2025 Gallup found a quarter of American men aged 15 to 34 had felt lonely for a lot of the previous day.",
  ],
  references: [
    {
      title: "Bureau of Labor Statistics, American Time Use Survey: 2025 Results (June 2026)",
      url: "https://www.bls.gov/news.release/atus.nr0.htm",
    },
    {
      title:
        "Kannan and Veazie, 'US trends in social isolation, social engagement, and companionship, 2003-2020', SSM Population Health 21 (2023)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9811250/",
    },
    {
      title:
        "Our Epidemic of Loneliness and Isolation: The US Surgeon General's Advisory on the Healing Effects of Social Connection and Community (2023)",
      url: "https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf",
    },
    {
      title: "WHO, 'Social connection linked to improved health and reduced risk of early death' (30 June 2025)",
      url: "https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death",
    },
    {
      title: "Esteban Ortiz-Ospina, 'Is there a loneliness epidemic?', Our World in Data (2019)",
      url: "https://ourworldindata.org/loneliness-epidemic",
    },
    {
      title:
        "Loneliness and Social Isolation as Risk Factors for Mortality: A Meta-Analytic Review, Holt-Lunstad et al., Perspectives on Psychological Science (2015)",
      url: "https://journals.sagepub.com/doi/10.1177/1745691614568352",
    },
    {
      title: "Allcott, Braghieri, Eichmeyer and Gentzkow, 'The Welfare Effects of Social Media', American Economic Review (2020)",
      url: "https://www.aeaweb.org/articles?id=10.1257/aer.20190658",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Are people lonelier, or only more alone?
    // =========================================================================
    {
      id: "loneliness-trend",
      title: "Are We Lonelier, or Just More Alone?",
      short_summary:
        "Americans spend less time with friends than they did 20 years ago and more time alone. About one in five adults says they feel lonely. But studies that ask the same loneliness questions across generations have found little sign of a rise. Whether there is an epidemic at all, or a change in how people spend their time, is the first split.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Time alone is not the same as loneliness, and the best long-run data show no clear rise in loneliness itself. Reviewing the studies that asked the same questions over decades, Esteban Ortiz-Ospina of Our World in Data found 'surprisingly no empirical support for the fact that loneliness is increasing': US high-school seniors in newer generations were not lonelier than earlier ones, and older adults in the US, Finland, Germany, England and Sweden showed little or no rise. In England, the share of adults who feel lonely often or always stayed between 5% and 6% from 2013/14 to 2021/22. People live alone, marry later and spend evenings on screens because they choose to, and many are content. Calling that an epidemic turns a change in habits into a disease.",
      proponent_rebuttal:
        "The decline in time together is large, measured and recent. In the American Time Use Survey, which records what people did hour by hour, time spent with friends fell from 60 minutes a day in 2003 to 34 in 2019 and 20 in 2020, while time alone rose from 285 to 333 minutes a day. In 2025 Americans averaged 35 minutes a day socializing and communicating, down from 41 in 2015. One in five US adults, 21%, said they felt lonely in a 2024 Harvard survey, and a quarter of American men aged 15 to 34 said they felt lonely a lot of the previous day, against a median of 15% for young men across the OECD. Many of the trend studies the skeptics cite stop before smartphones spread, and they cover older adults most. Young people, where the change is sharpest, are the ones least studied over time.",
      crux: {
        id: "loneliness-trend-measured",
        title: "The Trend Test",
        question:
          "Do people report more loneliness than past generations did, or only spend more time alone?",
        description:
          "Time-use diaries show less time with friends and more time alone. Loneliness is a feeling, measured by asking people. The test is whether the same loneliness questions, asked of the same age groups over decades, show a rise, especially among young adults since the early 2010s.",
        methodology:
          "Compare validated loneliness scales asked in identical form across survey waves, by age group, from the 1990s to the 2020s, alongside time-use data for the same years. Check whether time alone predicts loneliness within the same people over time.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Identical loneliness questions asked in national surveys of young adults from the 1990s through the 2020s, read alongside American Time Use Survey diaries for the same years and age groups.",
        },
        cost_to_verify: "$100K (Existing survey and time-use data)",
        falsification: {
          supporter_flip:
            "If identical loneliness questions asked of young adults since the 1990s showed no rise through the 2020s, despite the fall in time with friends, the case that there is a loneliness epidemic would weaken.",
          skeptic_flip:
            "If those surveys showed loneliness among young adults rising from the early 2010s, tracking the fall in time with friends in the time-use diaries, the view that the epidemic is a change in habits rather than in feelings would be hard to hold.",
          common_ground:
            "Both sides agree Americans spend less time with friends and more time alone than in 2003, and that around one in five adults says they feel lonely.",
          live_disagreement:
            "Whether less time together has made people lonelier, or whether many people are alone by choice and content, so that the trend is a change in habits rather than a rise in suffering.",
        },
      },
      evidence: [
        {
          id: "time-use-decline",
          title: "Time-Use Diaries: Time With Friends Fell From 60 Minutes a Day in 2003 to 34 in 2019",
          description:
            "Using the American Time Use Survey, Viji Diane Kannan and Peter Veazie found average time spent socially engaged with friends fell from 60 minutes a day in 2003 to 34 in 2019, and to 20 in 2020. Time alone rose from 285 to 309 minutes a day between 2003 and 2019, and reached 333 in 2020. The Bureau of Labor Statistics' 2025 results put time spent socializing and communicating at 35 minutes a day, against 41 in 2015.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source:
            "Kannan and Veazie, SSM Population Health 21:101331 (2023); BLS, American Time Use Survey 2025 Results (25 June 2026)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9811250/",
          reasoning:
            "Diary data from a large federal survey are the most reliable measure of how people spend their time. They measure time, not feelings: someone alone for an evening may not be lonely, and 2020 was distorted by the pandemic.",
        },
        {
          id: "harvard-mcc-loneliness-2024",
          title: "Harvard 2024 Survey: 21% of US Adults Feel Lonely",
          description:
            "A nationally representative survey for Harvard's Making Caring Common project, fielded in May 2024, found 21% of US adults feel lonely. Respondents most often blamed technology (73%), families not spending enough time together (66%) and overwork or exhaustion (62%). Lonely adults were much more likely to report anxiety or depression (81%).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Making Caring Common, Harvard Graduate School of Education, 'Loneliness in America: Just the Tip of the Iceberg?' (2024)",
          sourceUrl: "https://mcc.gse.harvard.edu/reports/loneliness-in-america-2024",
          reasoning:
            "A current measure of how many people feel lonely. It is one survey with no earlier wave to compare, so it shows a level, not a trend, and what respondents blame is opinion.",
        },
        {
          id: "owid-no-rising-trend",
          title: "Our World in Data: Repeated Surveys Show No Clear Rise in Loneliness Across Generations",
          description:
            "Reviewing studies that compared generations using the same questions, Esteban Ortiz-Ospina found 'surprisingly no empirical support for the fact that loneliness is increasing.' Newer generations of US high-school seniors were not more likely to report loneliness than earlier ones; US older adults showed little difference across generations; and repeated surveys of Swedes aged 85 to 95 found no rise over ten years, with similar results in Finland, Germany and England. He called headlines about a loneliness epidemic 'wrong and unhelpful'.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Esteban Ortiz-Ospina, 'Is there a loneliness epidemic?', Our World in Data (2019)",
          sourceUrl: "https://ourworldindata.org/loneliness-epidemic",
          reasoning:
            "The strongest case that feelings of loneliness have not risen, built on studies that use like-for-like questions. It was written in 2019, the studies it reviews mostly end before the smartphone years, and most cover older adults rather than the young.",
        },
        {
          id: "uk-chronic-loneliness-stable",
          title: "England's Community Life Survey: Chronic Loneliness Stayed Between 5% and 6% for Eight Years, Then 7%",
          description:
            "Between 2013/14 and 2021/22 the share of adults in England who felt lonely often or always stayed roughly between 5% and 6%. In 2023/24 it was 7%, about 3.1 million people, one point above 2021/22. Adults aged 16 to 24 had the highest rate, 10%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "UK Department for Culture, Media and Sport, Community Life Survey 2023/24: Loneliness and support networks (4 December 2024)",
          sourceUrl: "https://www.gov.uk/government/statistics/community-life-survey-202324-annual-publication/community-life-survey-202324-loneliness-and-support-networks--2",
          reasoning:
            "An official series with the same question each year shows a flat rate for most of a decade, not a surge. The latest year is the highest in the series and young adults are well above average, so it also gives the other side something.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Does loneliness make people sick?
    // =========================================================================
    {
      id: "health-impact-evidence",
      title: "Does Loneliness Make People Sick?",
      short_summary:
        "Lonely and isolated people die earlier: about 26% to 29% higher odds across 70 studies. That is where the '15 cigarettes a day' line comes from. But lonely people are also more often sick, poor or depressed in the first place, and a 2024 genetic study found loneliness looked causal for only six of 26 diseases. Whether loneliness itself does the harm is the second split.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Loneliness travels with illness, poverty and depression, so its link to early death is mostly a marker, not a cause. People who are sick, disabled or depressed see fewer people. In a 2024 study of 476,100 UK Biobank participants, loneliness was linked to 30 of 56 diseases in the ordinary data, but when the authors used genetic variants to test cause and effect, only six of 26 diseases showed a potentially causal link, among them depression and sleep apnoea. They concluded loneliness 'may serve as a potential surrogate marker rather than a causal risk factor' for most diseases. The '15 cigarettes a day' comparison sets a feeling beside a toxin whose harm runs through known chemistry. Treating loneliness as a disease risks spending health money on befriending schemes instead of the illnesses that cause both.",
      proponent_rebuttal:
        "The link between social connection and survival is one of the most consistent in public health. Across 148 studies and 308,849 people, Julianne Holt-Lunstad found people with stronger social relationships had a 50% higher likelihood of survival, an effect she called 'comparable with quitting smoking.' Her 2015 review of 70 studies and 3.4 million people found isolation raised the odds of death by 29% and loneliness by 26%. Many of those studies adjusted for baseline health, depression and income, and the link held. In June 2025 the World Health Organization's Commission on Social Connection linked loneliness to about 871,000 deaths a year, roughly 100 every hour. Genetic studies of a trait as tangled as loneliness have weak instruments, and the 2024 study tested disease onset, not death.",
      crux: {
        id: "loneliness-mortality-causation",
        title: "The Cause-or-Marker Test",
        question:
          "Does loneliness itself cause illness and early death, or does it mark people who were already sick or poor?",
        description:
          "Lonely people die earlier on average. The test is whether reducing loneliness, with everything else held equal, changes health outcomes, or whether the link disappears once prior illness, disability and poverty are accounted for.",
        methodology:
          "A large randomized trial of programs that reduce loneliness in isolated older adults, measuring heart events and deaths over five years, alongside genetic studies with stronger instruments that test all-cause mortality rather than disease onset.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A randomized trial in 5,000 or more isolated older adults comparing a program that measurably cuts loneliness with health education alone, counting heart attacks, strokes and deaths over five years.",
        },
        cost_to_verify: "$20-40M (Five-year randomized trial plus biobank analyses)",
        falsification: {
          supporter_flip:
            "If a large trial cut loneliness in isolated older adults but left heart events and deaths unchanged, and genetic studies of mortality also found no causal effect, the case that loneliness is a health hazard in its own right would weaken.",
          skeptic_flip:
            "If people randomly assigned to a program that cut loneliness had fewer heart events and deaths than the control group, the view that loneliness is only a marker of other problems would be hard to hold.",
          common_ground:
            "Both sides agree that lonely and isolated people die earlier on average, and that they are more often sick, poor, disabled or depressed in the first place.",
          live_disagreement:
            "How much of the extra risk loneliness itself causes, and so whether money spent reducing loneliness buys better health or only better company.",
        },
      },
      evidence: [
        {
          id: "holt-lunstad-2015-meta-analysis",
          title: "Holt-Lunstad 2015: Isolation Raised the Odds of Death 29% and Loneliness 26%, Across 3.4 Million People",
          description:
            "A meta-analysis of 70 prospective studies with more than 3.4 million participants, followed for an average of seven years, found social isolation associated with 29% higher odds of death, loneliness with 26% and living alone with 32%. Holt-Lunstad's 2010 review of 148 studies and 308,849 participants had found a 50% higher likelihood of survival for people with stronger social relationships, an effect 'comparable with quitting smoking.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Holt-Lunstad et al., Perspectives on Psychological Science 10(2) (2015); Holt-Lunstad, Smith and Layton, PLOS Medicine (2010)",
          sourceUrl: "https://journals.sagepub.com/doi/10.1177/1745691614568352",
          reasoning:
            "The largest body of evidence on the question, and the basis of the Surgeon General's warning. The studies are observational, they measure isolation and loneliness in many different ways, and adjustment for prior health varies, so they cannot show cause.",
        },
        {
          id: "who-commission-2025",
          title: "WHO Commission, June 2025: Loneliness Linked to About 871,000 Deaths a Year",
          description:
            "The WHO Commission on Social Connection reported that 1 in 6 people worldwide is affected by loneliness and that loneliness is linked to an estimated 100 deaths every hour, more than 871,000 a year. Between 17% and 21% of people aged 13 to 29 reported feeling lonely, with the highest rates among teenagers.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "World Health Organization, news release on the WHO Commission on Social Connection report (30 June 2025)",
          sourceUrl: "https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death",
          reasoning:
            "Shows how seriously global health bodies now treat loneliness. The death toll is a modelled estimate built on the same observational studies, so it inherits their uncertainty about cause.",
        },
        {
          id: "surgeon-general-advisory-2023",
          title: "US Surgeon General, May 2023: 'Our Epidemic of Loneliness and Isolation'",
          description:
            "In May 2023 Surgeon General Vivek Murthy issued an advisory titled 'Our Epidemic of Loneliness and Isolation,' warning that lacking social connection raises the risk of premature death by a margin comparable to smoking up to 15 cigarettes a day, and calling for a national strategy to rebuild social connection.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "Office of the US Surgeon General (2023)",
          sourceUrl: "https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf",
          reasoning:
            "An official advisory carries weight and put the issue on the national agenda. It is a summary of existing studies written to drive policy, not new evidence, and its smoking comparison is a communication device.",
        },
        {
          id: "reverse-causation-confounding",
          title: "Liang et al. 2024: Genetic Tests Found Loneliness Potentially Causal for Only 6 of 26 Diseases",
          description:
            "Using UK Biobank data on 476,100 people followed for a median 12.2 years, the authors found loneliness associated with higher risk in 30 of 56 diseases in ordinary observational analysis. Mendelian randomization, which uses genetic variants to estimate cause and effect, found potentially causal links for only six of 26 diseases tested, including depression, sleep apnoea and substance use. The authors concluded loneliness 'may serve as a potential surrogate marker rather than a causal risk factor' for most diseases.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Liang et al., 'Observational and genetic evidence disagree on the association between loneliness and risk of multiple diseases', Nature Human Behaviour 8, 2209-2221 (2024)",
          sourceUrl: "https://www.nature.com/articles/s41562-024-01970-0",
          reasoning:
            "The best test so far of whether the association is causal, and it cuts the list sharply. Genetic instruments for a behaviour are weak and can act through other traits, and the study measured disease onset, not deaths.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Do phones and social media drive it?
    // =========================================================================
    {
      id: "technology-cause-or-cure",
      title: "Are Phones and Social Media to Blame?",
      short_summary:
        "When researchers paid people to quit Facebook for a month, they spent more time with friends and family and felt slightly better. Yet across 350,000 teenagers, screen use explained 0.4% of the variation in well-being. Whether screens crowd out time together, or mostly add to it, is the third split.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Screens explain very little of how people feel, and for many isolated people they are the connection. Amy Orben and Andrew Przybylski tested more than 20,000 ways of analysing data on over 350,000 adolescents and found digital technology use explained at most 0.4% of the variation in well-being, about as much as eating potatoes. When lockdowns cut people off in 2020, a study tracking 1,545 US adults found no significant overall rise in loneliness. For people who are disabled, housebound or far from family, online contact is often the only kind they can get. Blaming platforms risks taking away a lifeline while ignoring work hours, commutes and the loss of places to meet.",
      proponent_rebuttal:
        "The best experiment points to displacement. In a randomized trial by economists Hunt Allcott, Luca Braghieri, Sarah Eichmeyer and Matthew Gentzkow, people paid to deactivate Facebook for four weeks before the 2018 midterms spent more time offline, including socializing with family and friends, reported higher well-being, and used Facebook less afterwards. Time with friends in the US time-use survey fell by 26 minutes a day between 2003 and 2019, and 73% of Americans in a 2024 Harvard survey named technology as a cause of loneliness. The 0.4% figure averages light and heavy users and comes from snapshots, not from people followed over time. Platforms are built to hold attention, and every hour spent scrolling alone is an hour not spent with someone.",
      crux: {
        id: "displacement-vs-supplement",
        title: "The Displacement Test",
        question:
          "Does heavy social media use crowd out time with people in person, or mostly add to existing friendships?",
        description:
          "Screens could replace time with people, or fill time that would have been spent alone anyway. The test is what happens to in-person contact and loneliness when people use social media less, chosen at random rather than by the user.",
        methodology:
          "Randomized trials that cut social media use for weeks or months, measured by phone logs rather than self-report, counting in-person contact through daily prompts and loneliness on validated scales, with results reported separately for teenagers, young adults and housebound people.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Randomized trials that cut teenagers' and young adults' social media use for three months or longer, logged by phone rather than self-report, counting in-person contact with daily prompts and measuring loneliness on the UCLA scale.",
        },
        cost_to_verify: "$5-10M (Multi-site randomized trial with phone logging)",
        falsification: {
          supporter_flip:
            "If longer randomized trials that cut young people's social media use left their in-person contact and loneliness unchanged, the case that technology is driving loneliness would weaken.",
          skeptic_flip:
            "If such trials repeated the Facebook deactivation result at larger scale and over months, with more in-person contact and less loneliness, the view that screens mostly add to friendships would be hard to hold.",
          common_ground:
            "Both sides agree that time with friends has fallen since 2003, and that online contact is a real lifeline for housebound, disabled and isolated people.",
          live_disagreement:
            "Whether screens took the place of time together or filled a gap left by other changes, and whether the answer differs for teenagers and for the isolated.",
        },
      },
      evidence: [
        {
          id: "allcott-facebook-deactivation",
          title: "Allcott et al. 2020: Quitting Facebook for Four Weeks Raised Time With Family and Friends and Well-Being",
          description:
            "In a randomized experiment, deactivating Facebook for the four weeks before the 2018 US midterm election reduced online activity while increasing offline activities such as watching TV alone and socializing with family and friends. It also reduced news knowledge and political polarization, increased subjective well-being, and caused a large, lasting reduction in Facebook use after the experiment.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source:
            "Allcott, Braghieri, Eichmeyer and Gentzkow, 'The Welfare Effects of Social Media', American Economic Review 110(3), 629-76 (2020)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20190658",
          reasoning:
            "A randomized test of the displacement question, published in a leading journal. It covers adult Facebook users for four weeks, measures well-being rather than loneliness directly, and the freed time also went to watching TV alone.",
        },
        {
          id: "oxford-trivial-effect",
          title: "Orben and Przybylski 2019: Screen Use Explains 0.4% of Teenagers' Well-Being, About as Much as Eating Potatoes",
          description:
            "Testing more than 20,000 possible analyses of three large datasets covering over 350,000 adolescents in the US and UK, the Oxford researchers found digital technology use was negatively associated with well-being, but the association explained at most 0.4% of the variation, about the same as the link with eating potatoes.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Amy Orben and Andrew Przybylski, Nature Human Behaviour 3, 173-182 (2019)",
          sourceUrl: "https://www.nature.com/articles/s41562-018-0506-1",
          reasoning:
            "A careful guard against cherry-picked analyses that finds a tiny average effect. The data are snapshots, they average light and heavy use, and they measure well-being in general rather than loneliness or time with friends.",
        },
        {
          id: "covid-digital-lifeline",
          title: "Luchetti et al. 2020: No Significant Rise in Loneliness in Early Lockdown Among 1,545 US Adults",
          description:
            "Tracking 1,545 US adults between January and April 2020, as stay-at-home orders spread, the researchers found no significant overall increase in loneliness.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source: "Luchetti et al., 'The trajectory of loneliness in response to COVID-19', American Psychologist (2020)",
          sourceUrl: "https://psycnet.apa.org/doi/10.1037/amp0000690",
          reasoning:
            "Suggests people can stay connected without meeting in person, at least for weeks. Lockdown was an emergency in which everyone was cut off at once, which says little about ordinary times when screens compete with in-person contact.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: What can be done?
    // =========================================================================
    {
      id: "structural-vs-individual",
      title: "Can Policy Make People Less Lonely?",
      short_summary:
        "England appointed a minister for loneliness in 2018; its chronic loneliness rate was 7% in 2023/24, against 5% to 6% before. Trials of programs for lonely people show modest effects, best for those that change how people think about others. Whether governments should treat loneliness as theirs to fix, and whether they can, is the fourth split.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Governments cannot manufacture friendship, and the main national experiment has not moved the numbers. England appointed the world's first minister for loneliness in 2018 and built a national strategy around social prescribing, in which doctors refer patients to clubs and activities. By 2023/24, 7% of adults felt lonely often or always, against 5% to 6% in every year from 2013/14 to 2021/22. Loneliness varies widely between countries in ways that track culture as much as policy: one 2022 review found problematic loneliness among older adults ranged from about 5% in northern Europe to over 20% in eastern Europe. Who people see is a private choice. The state can fund libraries and parks for their own sake, but treating each lonely person as a patient medicalizes ordinary life.",
      proponent_rebuttal:
        "Some interventions work, and the places people meet are shaped by policy. A meta-analysis of interventions by Christopher Masi, John Cacioppo and colleagues found randomized trials reduced loneliness modestly, with an average effect of about 0.2 standard deviations, and that 'the most successful interventions addressed maladaptive social cognition,' the habit lonely people fall into of expecting rejection. Where people live matters too: in Kevin Leyden's survey of Galway neighbourhoods, residents of walkable, mixed-use areas were more likely to know their neighbours, trust others and take part in community life than those in car-dependent suburbs. Zoning, transit and the opening hours of libraries are all public choices. England's strategy was small, cut across by the pandemic, and never changed how towns are built; one modest program does not show the problem is out of reach.",
      crux: {
        id: "structural-intervention-effectiveness",
        title: "The Intervention Test",
        question:
          "Can programs, places or public policy measurably reduce loneliness across a whole population?",
        description:
          "Programs for lonely individuals show small effects in trials. The test is whether anything a government can do, from social prescribing to walkable neighbourhoods and public spaces, lowers loneliness across a city or country, and whether it should try.",
        methodology:
          "Cluster-randomized trials that assign whole neighbourhoods to new public spaces, programming or social prescribing, measuring loneliness on validated scales before and after, plus comparisons of places that changed zoning or transit with matched places that did not.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Cluster-randomized trials across 20 or more neighbourhoods given new community spaces and programming, with loneliness measured on the UCLA scale at baseline, one year and two years, compared with matched neighbourhoods left as they were.",
        },
        cost_to_verify: "$3-8M (Neighbourhood cluster trial over two years)",
        falsification: {
          supporter_flip:
            "If neighbourhoods randomly given new community spaces and programming showed no fall in loneliness after two years compared with matched neighbourhoods, the case that policy can reduce loneliness at scale would weaken.",
          skeptic_flip:
            "If those neighbourhoods showed a clear fall in loneliness that lasted, the view that loneliness lies beyond the reach of policy would be hard to hold.",
          common_ground:
            "Both sides agree England's national strategy has not lowered its chronic loneliness rate, and that individual programs show modest effects in randomized trials.",
          live_disagreement:
            "Whether better-designed and better-funded public action could lower loneliness, and a value question no data settles: whether who people spend time with is any of the government's business.",
        },
      },
      evidence: [
        {
          id: "masi-intervention-meta-analysis",
          title: "Masi et al.: Randomized Trials Cut Loneliness Modestly, Best When They Target How Lonely People Think",
          description:
            "A meta-analysis of interventions to reduce loneliness found that single-group before-and-after studies and non-randomized comparisons reported larger effects than randomized trials. In randomized trials the average effect was about -0.20 standard deviations, and 'the most successful interventions addressed maladaptive social cognition' rather than simply providing more contact or social support.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Masi, Chen, Hawkley and Cacioppo, 'A Meta-Analysis of Interventions to Reduce Loneliness', Personality and Social Psychology Review 15(3) (2011)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3865701/",
          reasoning:
            "Shows loneliness can be reduced, and which approach works best. The effects are small, the trials are of individuals who sought help, and nothing here shows a program working across a whole population.",
        },
        {
          id: "walkability-social-contact",
          title: "Leyden 2003: Residents of Walkable Galway Neighbourhoods Knew Neighbours and Trusted Others More",
          description:
            "In a household survey of Galway, Ireland, comparing traditional mixed-use, pedestrian-oriented neighbourhoods with car-dependent suburbs, Kevin Leyden found residents of walkable neighbourhoods had more social capital: they were more likely to know their neighbours, take part in politics, trust others and be socially engaged.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 4,
          },
          source:
            "Leyden, 'Social capital and the built environment: the importance of walkable neighborhoods', American Journal of Public Health 93(9) (2003)",
          sourceUrl: "https://doi.org/10.2105/AJPH.93.9.1546",
          reasoning:
            "Links the built environment to everyday contact. It is one city, one survey, and people who want contact may choose walkable places; knowing neighbours is not the same as not being lonely.",
        },
        {
          id: "uk-loneliness-ministry",
          title: "England Since 2018: A Minister and a Strategy, and Chronic Loneliness at 7% in 2023/24",
          description:
            "England appointed a minister for loneliness in January 2018 and adopted a cross-government strategy built around social prescribing and better measurement. The Community Life Survey found 7% of adults felt lonely often or always in 2023/24, against roughly 5% to 6% between 2013/14 and 2021/22.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source: "UK Department for Culture, Media and Sport, Community Life Survey 2023/24 (4 December 2024)",
          sourceUrl: "https://www.gov.uk/government/statistics/community-life-survey-202324-annual-publication/community-life-survey-202324-loneliness-and-support-networks--2",
          reasoning:
            "The most direct national test so far, and the numbers have not fallen. The strategy was modestly funded, the pandemic hit in its second year, and there is no measure of what would have happened without it.",
        },
        {
          id: "cultural-variation-loneliness",
          title: "BMJ 2022 Review of 113 Countries: Loneliness Among Older Adults Ranged From About 5% to Over 20%",
          description:
            "A systematic review and meta-analysis of loneliness across 113 countries and territories found wide geographical variation. Among older adults, problematic loneliness ranged from about 5% in northern European countries to over 20% in eastern European countries. The authors flagged large data gaps in low- and middle-income countries.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source:
            "Surkalim et al., 'The prevalence of loneliness across 113 countries: systematic review and meta-analysis', The BMJ (2022)",
          sourceUrl: "https://doi.org/10.1136/bmj-2021-067068",
          reasoning:
            "Shows that loneliness rates differ a lot between societies, which fits explanations rooted in culture and history. The review cannot say which differences are caused by policy, and surveys may not measure loneliness the same way in every language.",
        },
      ],
    },
  ],
} satisfies TopicInput;
