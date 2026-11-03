export const socialMediaMentalHealthData = {
  id: "social-media-mental-health",
  title: "Social Media and Teen Mental Health",
  question: "Is social media to blame for the teen mental health crisis?",
  meta_claim:
    "Social media use is a primary cause of the rise in teen depression, anxiety and self-harm that began in the early 2010s, especially among girls.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: CDC's YRBS put persistent sadness among US high
  // schoolers at 30% in 2013, 42% in 2021 and 40% in 2023 (53% of girls).
  // Newest evidence on each side: Teague et al., JAMA Pediatrics (March
  // 2026), a meta-analysis of longitudinal studies; Burnell et al. (2025),
  // 32 restriction trials, read by Thimm-Kaiser & Keyes as small effects;
  // Haidt and colleagues' 2026 "many lines of evidence" brief. The causal
  // trials that could settle it (e.g. the NIH-funded Georgetown trial)
  // report after 2027.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In 2013, 30% of US high schoolers said they had felt so sad or hopeless for two weeks that they stopped doing their usual activities. By 2021 it was 42%, and in 2023 it was 40%, including 53% of girls. The rise began as smartphones and social media spread. The fight is over whether social media caused it, or whether it is a small part of a story with many causes.",
    confidence: 85,
    source:
      "CDC, Youth Risk Behavior Survey Data Summary & Trends Report: 2013-2023 (6 August 2024)",
    sourceUrl: "https://www.cdc.gov/yrbs/dstr/index.html",
  },
  simple_case: [
    "The answer drives policy already in force: Australia's under-16 social media ban, classroom phone bans in more than 30 US states, state laws on 'addictive feeds', and lawsuits against Meta and Snap. Those policies have their own maps; this one is about the science underneath them.",
    "Three questions carry it: how big the link between social media and teen distress is and who it concentrates in, whether experiments show social media causes the harm, and which features, if any, do the damage.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What happened, and how big is the link? (what we know)
    // =========================================================================
    {
      id: "temporal-correlation",
      title: "What Happened to Teens, and How Big Is the Link?",
      short_summary:
        "Teen sadness, self-harm and suicidal thoughts rose through the 2010s, most of all among girls, as social media became near-universal. Across hundreds of thousands of teens, the average link between screen use and well-being is small. Whether that small average hides a large harm to some groups, such as young girls and heavy users, is the first split.",
      image_url:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=60",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "The average link is too small to explain a crisis. Across three large datasets covering 355,358 adolescents, Amy Orben and Andrew Przybylski found digital technology use explained 'at most 0.4% of the variation in well-being', and concluded the effects were 'too small to warrant policy change.' The 2026 JAMA Pediatrics meta-analysis that supporters cite found correlations between social media and subsequent depression of about r = 0.09 to 0.21, which are small by any convention. In 2023 the National Academies reviewed the field and said its review 'did not support the conclusion that social media causes changes in adolescent health at the population level.' The timing fits other causes too: Candice Odgers points to the opioid epidemic, economic hardship after 2008, social isolation and a shortage of school psychologists. And the trend is not a one-way ratchet: the share of teens reporting persistent sadness fell from 42% in 2021 to 40% in 2023, while phones stayed everywhere.",
      proponent_rebuttal:
        "A small average across all teens and all screen use is the wrong measure. The harm concentrates where the theory predicts: in girls, in early adolescence and in heavy users of social media rather than television or gaming. Orben's own 2022 work, with 84,011 participants, found 'windows of developmental sensitivity' when higher social media use predicted lower life satisfaction the following year: ages 11 to 13 for girls and 14 to 15 for boys. The 2026 JAMA Pediatrics meta-analysis of 153 studies found social media use 'consistently associated with risks' over time, including depression, self-harm thoughts and lower academic achievement, with stronger links in early adolescence. Correlations of 0.1 to 0.2 are in the range of many accepted public-health risks, and applied to millions of teens they mean many additional cases. The 2010s rise came in all the outcomes that do not depend on self-report, including emergency visits and self-harm, and in girls above all, which is where social media use grew fastest.",
      crux: {
        id: "dose-response",
        title: "The Size-of-Harm Test",
        question:
          "Is social media's harm a small average effect, or a large one concentrated in heavy-using young girls?",
        description:
          "A small association averaged over all teenagers could hide a large effect in a subgroup: girls aged 11 to 13, heavy users, or teens already struggling. Measuring use directly rather than by self-report, and splitting results by age, sex and type of use, would show whether the harm is spread thin or concentrated.",
        methodology:
          "Longitudinal cohorts (the UK Millennium Cohort Study, the US ABCD study) with phone-logged rather than self-reported use, analysed by hours, platform, sex and age under preregistered plans; within-person models that test whether rising use predicts subsequent distress, and whether distress predicts later use.",
        equation:
          "MH_{score} = \\beta_0 + \\beta_1 \\cdot \\text{hours} + \\beta_2 \\cdot \\text{hours}^2 + \\epsilon",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Phone-logged social media use in large cohorts such as ABCD, analysed by sex, age and platform under preregistered plans, testing whether a sharp rise in depression appears among heavy-using girls aged 11 to 13 and whether distress comes before heavy use or after it.",
        },
        cost_to_verify: "$5M (longitudinal cohort with passive measurement)",
        falsification: {
          supporter_flip:
            "If phone-logged data in large cohorts showed heavy-using girls aged 11 to 13 no worse off over time than light users once earlier distress was accounted for, the claim that social media drives the crisis would lose its central group.",
          skeptic_flip:
            "If those cohorts showed heavy use by young girls predicting large subsequent rises in depression, with no matching effect of distress on later use, the view that the link is too small to matter would be hard to hold.",
          common_ground:
            "Both sides agree teen distress rose through the 2010s, most among girls, and that the average association between screen use and well-being across all teens is small.",
          live_disagreement:
            "Whether the small average hides a large harm in some teens, and whether a correlation of 0.1 to 0.2 is trivial or, across millions of children, a public-health problem.",
        },
      },
      evidence: [
        {
          id: "twenge-trends",
          title: "CDC 2024: Persistent Sadness Among US High Schoolers Rose From 30% in 2013 to 42% in 2021, Then 40% in 2023",
          description:
            "The share of high schoolers who felt so sad or hopeless almost every day for two weeks that they stopped usual activities went from 30% in 2013 and 2015 to 31% in 2017, 37% in 2019, 42% in 2021 and 40% in 2023. In 2023 it was 53% of girls and 28% of boys. 'Nearly all indicators of poor mental health and suicidal thoughts and behaviors worsened from 2013 to 2023,' though from 2021 to 2023 'there were early signs that adolescent mental health is getting better.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 4,
          },
          source:
            "CDC, Youth Risk Behavior Survey Data Summary & Trends Report: 2013-2023 (6 August 2024)",
          sourceUrl: "https://www.cdc.gov/yrbs/dstr/index.html",
          reasoning:
            "The trend is not in dispute and the survey is the national standard. It shows what happened, not why: the timing fits social media and several other explanations, so directness is low.",
        },
        {
          id: "orben-przybylski-small-effects",
          title: "Orben & Przybylski 2019: Technology Use Explained At Most 0.4% of Teen Well-Being Across 355,358 Adolescents",
          description:
            "Using specification-curve analysis on three large datasets (total n = 355,358), the authors found the association between digital technology use and adolescent well-being negative but small, 'explaining at most 0.4% of the variation in well-being.' They concluded that 'these effects are too small to warrant policy change.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Orben & Przybylski, 'The association between adolescent well-being and digital technology use,' Nature Human Behaviour 3: 173-182 (2019)",
          sourceUrl: "https://www.nature.com/articles/s41562-018-0506-1",
          reasoning:
            "A transparent method run across every reasonable analysis choice. It measures all digital technology, not social media alone, and averages across all teens, which is the dilution supporters point to.",
        },
        {
          id: "teague-jama-2026",
          title: "JAMA Pediatrics 2026: Across 153 Studies, Social Media Use Predicted Subsequent Depression and Self-Harm Thoughts (r = 0.09 to 0.21)",
          description:
            "A meta-analysis of 153 longitudinal studies (115 cohorts, 1,072 effect sizes) of children aged 2 to 19 found social media use associated with subsequent depression, internalizing and externalizing problems, self-injurious thoughts, problematic internet use and substance use (r = 0.09 to 0.21), and with lower academic achievement and self-perception (r = -0.14 to -0.07). Links with depression were stronger in early adolescence. The authors concluded digital media use was 'consistently associated with risks' to child health and development, especially social media.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Teague, Somoray, Shatte et al., 'Digital Media Use and Child Health and Development: A Systematic Review and Meta-Analysis,' JAMA Pediatrics 180(5): 510-517 (published online 9 March 2026)",
          sourceUrl: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2845518",
          reasoning:
            "The largest synthesis of studies that follow children over time, published this year. The effects are small, mostly self-reported, and longitudinal association still is not proof of cause; the abstract does not settle which way the link runs.",
        },
        {
          id: "orben-developmental-windows",
          title: "Orben et al. 2022: Social Media Use Predicted Lower Life Satisfaction at Ages 11-13 for Girls and 14-15 for Boys",
          description:
            "In cross-sectional data on 84,011 people aged 10 to 80 and longitudinal data on 17,409 aged 10 to 21, higher estimated social media use predicted lower life satisfaction the following year during specific windows: 'males (14–15 and 19 years old) and females (11–13 and 19 years old).' Outside those windows the link was weaker.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "Orben, Przybylski, Blakemore & Kievit, 'Windows of developmental sensitivity to social media,' Nature Communications 13: 1649 (28 March 2022)",
          sourceUrl: "https://www.nature.com/articles/s41467-022-29296-3",
          reasoning:
            "From researchers known for skepticism, which adds weight. It supports the idea that harm concentrates in early adolescence, but the effects are still modest and the measure is life satisfaction, not clinical depression.",
        },
        {
          id: "odgers-confounders",
          title: "Odgers in Nature 2024: Studies Show 'a Mix of No, Small and Mixed Associations'",
          description:
            "Reviewing Jonathan Haidt's The Anxious Generation, developmental psychologist Candice Odgers wrote that the claim that digital technology is rewiring children's brains and causing an epidemic of mental illness 'is not supported by science.' Studies have found 'a mix of no, small and mixed associations,' most data are correlational, and where links appear over time they more often suggest that 'young people who already have mental-health problems use such platforms more often.' She points to the opioid epidemic, economic hardship and social isolation, and notes there is about one school psychologist for every 1,119 US students.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Candice L. Odgers, 'The great rewiring: is social media really behind an epidemic of teenage mental illness?', Nature 628: 29-30 (29 March 2024)",
          sourceUrl: "https://www.nature.com/articles/d41586-024-00902-2",
          reasoning:
            "The strongest short statement of the skeptical reading, by a leading researcher in the field. It is a book review, not new data, and it predates the 2025-2026 meta-analyses of experiments and longitudinal studies.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Do experiments show cause? (mechanism)
    // =========================================================================
    {
      id: "causal-evidence",
      title: "Do Experiments Show Social Media Causes Harm?",
      short_summary:
        "Correlation cannot settle cause, so both sides turn to experiments: people paid to quit, campuses that got Facebook earlier, towns that got fast internet first. Most find some harm, but the effects are small, the trials are short and mostly of undergraduates, and the trials that would test young teens over months are still running.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The experiments are weaker than advertised. Most restriction trials last a week or two, enrol undergraduates or adults rather than 13-year-olds, and measure mood with surveys that participants know are about quitting social media. A 2025 meta-analysis of 32 such trials found restriction helped five of ten well-being measures, with no robust effect on loneliness, happiness or life satisfaction; Columbia epidemiologists Marco Thimm-Kaiser and Katherine Keyes summed it up as improving 'some domains of wellbeing for some people, with generally small effect sizes.' Christopher Ferguson's preregistered 2024 meta-analysis of experiments found no average effect. Natural experiments such as broadband rollout measure the whole internet, not social media, and the Facebook campus study covers 2004-2006, before smartphones and feeds. The trials that could answer the question for children, such as an NIH-funded Georgetown trial that blocks social media for three months on the phones of randomly chosen 10- to 14-year-olds, will not finish until 2028.",
      proponent_rebuttal:
        "Every kind of causal evidence points the same way. When Facebook arrived on US college campuses between 2004 and 2006, undergraduates' mental health got worse, an effect its authors traced to 'unfavorable social comparisons.' When US adults were paid to deactivate Facebook for four weeks before the 2018 election, their well-being rose and they spent more time with friends and family. Haidt and colleagues' 2026 review counts a 2026 meta-analysis of 35 detox studies finding reductions in depression (g = 0.21) and anxiety (g = 0.27), about the size of classroom prevention programs, and nine studies of broadband rollout, all but one finding more mental illness in girls where fast internet arrived first. The only experiment that found nothing ran over 2000-2008, before social media spread. Short trials understate the effect: a habit built over years is unlikely to show its full cost in one week off.",
      crux: {
        id: "causal-experiments",
        title: "The Experiment Test",
        question:
          "When teens are kept off social media for months, does their mental health improve?",
        description:
          "Randomized trials take away the confounding that correlational studies cannot. The open question is whether the small improvements seen when adults and undergraduates quit for a week or two also appear, and grow, when young teenagers go without social media for months.",
        methodology:
          "Randomized trials in 10- to 15-year-olds lasting three months or more, with use logged by the phone and outcomes measured on clinical scales, such as the NIH-funded Georgetown trial and classroom-based reduction trials; natural experiments that separate social media from general internet access.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Results from randomized trials that assign 10- to 15-year-olds to months without social media or with restricted use, logging use by phone and scoring depression and anxiety on clinical scales, such as the NIH-funded Georgetown trial of 10- to 14-year-olds due to finish in 2028.",
        },
        cost_to_verify: "$5-15M (multi-month randomized trials in adolescents)",
        falsification: {
          supporter_flip:
            "If months-long randomized trials in young teens found no improvement in depression or anxiety among those kept off social media, the causal case would rest on short adult trials and broadband studies that cannot isolate social media.",
          skeptic_flip:
            "If those trials found clear, lasting drops in depression and anxiety among teens kept off social media, larger than in the week-long adult trials, the view that the harm is small or reversed in direction would be hard to hold.",
          common_ground:
            "Both sides agree that most existing restriction trials are short, involve older participants, and find small effects on some measures and none on others.",
          live_disagreement:
            "Whether short trials understate a harm that builds over years, or whether small and inconsistent effects in the best-controlled studies mean the harm is small.",
        },
      },
      evidence: [
        {
          id: "braghieri-facebook-rollout",
          title: "Braghieri, Levy & Makarin 2022: Facebook's Arrival on US Campuses Worsened Student Mental Health",
          description:
            "Using the staggered introduction of Facebook across US colleges from 2004 to 2006 as a natural experiment, the authors found that 'the rollout of Facebook at a college had a negative impact on student mental health' and increased reported impairments to academic performance. 'Additional evidence on mechanisms suggests the results are due to Facebook fostering unfavorable social comparisons.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "Braghieri, Levy & Makarin, 'Social Media and Mental Health,' American Economic Review 112(11): 3660-93 (November 2022)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20211218",
          reasoning:
            "One of the strongest causal designs in the field, in a top journal. It studies early, desktop Facebook among undergraduates, not today's feeds among younger teens.",
        },
        {
          id: "allcott-deactivation",
          title: "Allcott et al. 2020: Adults Paid to Quit Facebook for Four Weeks Reported Higher Well-Being",
          description:
            "In a randomized experiment, participants who deactivated Facebook for the four weeks before the 2018 US midterm election reported higher subjective well-being, spent less time online and more on offline pursuits such as time with family and friends, and used Facebook substantially less for a long period afterward.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Allcott, Braghieri, Eichmeyer & Gentzkow, 'The Welfare Effects of Social Media,' American Economic Review 110(3): 629-76 (March 2020)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20190658",
          reasoning:
            "A large, well-run randomized trial. Its participants were adults, the effects were modest, and four weeks off Facebook is a different treatment from growing up without social media.",
        },
        {
          id: "haidt-many-lines",
          title: "Haidt and Colleagues 2026: Detox Trials Cut Depression (g = 0.21) and 8 of 9 Broadband Studies Found Harm to Girls",
          description:
            "In a brief drawn from their 2026 World Happiness Report chapter, Nathan Witkin, Carmen Hui Jing Lim, Zach Rausch and Jonathan Haidt cite a 2026 meta-analysis of 35 detox studies (7,160 participants, mostly college-age) finding that a week or more off social media reduced depression (g = 0.21) and anxiety (g = 0.27), effects they compare to classroom prevention programs. They count nine studies of high-speed internet rollout, all but one finding more mental illness where fast internet arrived, concentrated among girls and young women; the exception covered 2000-2008. They also cite Meta's internal 'Project Mercury' deactivation study, in which participants who left Facebook and Instagram reported less depression, anxiety and loneliness.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 6,
          },
          source:
            "Witkin, Lim, Rausch & Haidt, 'The Many Lines of Evidence That Social Media is Not Safe For Teens,' NYU Stern Tech & Society Lab (2026)",
          sourceUrl:
            "https://www.stern.nyu.edu/experience-stern/about/departments-centers-initiatives/academic-departments/business-society-program/tech-and-society-lab/research-areas/many-lines-evidence-social-media-not-safe-teens",
          reasoning:
            "The fullest current statement of the harm case, assembling every line of evidence. It is written by the hypothesis's leading advocates, some of the studies it cites are co-authored by its own lab, and broadband rollout measures the internet as a whole, so independence is low.",
        },
        {
          id: "restriction-trials-small",
          title: "Columbia Commentary 2025: Restriction Trials Show 'Generally Small' Effects on Some Measures Only",
          description:
            "Reviewing a 2025 meta-analysis of 32 randomized trials (Burnell et al.), Marco Thimm-Kaiser and Katherine Keyes note that 22 of the 32 intervened for 'a week or two,' that restriction had significant effects on five of ten sub-domains (depressive symptoms, anxiety, stress, self-esteem and self-rated wellbeing) and no robust effect on loneliness, affect, happiness or life satisfaction. Christopher Ferguson's earlier preregistered meta-analysis 'found no average effect of social media interventions on mental health.' Their summary: 'reducing or pausing social media use improves some domains of wellbeing for some people, with generally small effect sizes.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Thimm-Kaiser & Keyes, 'Small effects, big questions: the unfinished business of social media restriction science,' SSM - Mental Health (6 June 2025)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12421657",
          reasoning:
            "An independent reading of the same trials supporters cite. It agrees there are effects and judges them small and patchy; both sides accept the trials are short and mostly of older participants.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Which part does the harm? (mechanism)
    // =========================================================================
    {
      id: "mechanism-identification",
      title: "Which Part Does the Harm?",
      short_summary:
        "If social media harms teens, the candidates are specific: comparison with others, late nights, compulsive design such as endless feeds, and contact with strangers. Teens themselves report both harms and real benefits. Whether the harm comes from particular features or from social media use as such decides what any fix should target.",
      image_url:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Teens get real goods from social media, and blaming the medium repeats an old pattern. In Pew's 2024 survey, 74% of US teens said social media makes them feel more connected to their friends, and only 14% said it has a mostly negative effect on them personally. The National Academies found social media can be valuable for teens who 'otherwise feel excluded or lack offline support,' including LGBTQ+ teens. Where harm is found, it runs through things that can be addressed directly, such as late-night scrolling, without treating every app as a hazard. Every new medium, from comic books to video games, has drawn alarm about corrupting the young, and skeptics see the same pattern here.",
      proponent_rebuttal:
        "This medium is built differently from the ones before it. Platforms use infinite scroll, autoplay, push notifications and public counts of likes, features that Florida's 2024 law names as 'addictive features' and that keep teens on for hours. Comparison is the mechanism the strongest natural experiment found: Facebook's harm to undergraduates came from 'unfavorable social comparisons.' The National Academies list 'unhealthy social comparisons' and sleep loss, itself a risk factor for depression, among the potential harms. Teens notice: in Pew's 2024 survey, 45% said social media hurts their sleep and 40% their productivity, and 48% said it has a mostly negative effect on people their age, up from 32% in 2022. Meta's own researchers found that teens who quit reported less depression and anxiety. A product that teens say harms their peers, and that its maker's research links to distress, is not another comic-book panic.",
      crux: {
        id: "algorithm-experiment",
        title: "The Feature Test",
        question:
          "Does the harm come from engagement-driven feeds specifically, or from social media use in general?",
        description:
          "If the damage comes from particular design features, such as ranked feeds, infinite scroll, like counts and late-night notifications, then changing those features would help without taking social media away. If it comes from time online and comparison in general, only less use would.",
        methodology:
          "Randomized trials, run with platform cooperation or browser tools, that switch some teen users to chronological feeds, hidden like counts or overnight notification blocks while others keep the default; outcomes on clinical depression and anxiety scales over several months.",
        equation:
          "\\Delta MH = f(\\text{algorithm type}, \\text{baseline MH}, \\text{usage hours})",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Randomized trials with platform cooperation that give some teen accounts chronological feeds, hidden like counts or overnight notification blocks while others keep the defaults, measuring bedtimes, depression and anxiety on clinical scales over several months.",
        },
        cost_to_verify: "$10M (requires platform cooperation or technical workaround)",
        falsification: {
          supporter_flip:
            "If trials that removed ranked feeds, like counts and overnight notifications for teens found no change in bedtimes, depression or anxiety, the claim that platform design is the harm would fail, leaving time spent or nothing at all.",
          skeptic_flip:
            "If those trials found clear improvements in bedtimes and mood from design changes alone, the view that social media is just another medium drawing a moral panic would be hard to hold.",
          common_ground:
            "Both sides agree social media brings teens real benefits, such as connection and support for those isolated offline, and that late-night use is a plausible route to harm.",
          live_disagreement:
            "Whether specific features cause harm that redesign could remove, or whether the problem, if any, is time and comparison that only less use would fix.",
        },
      },
      evidence: [
        {
          id: "teen-views-pew-2025",
          title: "Pew 2025: 48% of US Teens Say Social Media Is Mostly Bad for People Their Age, Up From 32% in 2022",
          description:
            "In a survey of 1,391 US teens and parents fielded in autumn 2024, 48% of teens said social media has a mostly negative effect on people their age (32% in 2022), and 14% said so about themselves (9% in 2022). Forty-five percent said it hurts their sleep, 40% their productivity and 19% their mental health. Seventy-four percent said it makes them feel more connected to friends, and 52% said it helps them feel they have people to support them through tough times, down from 67% in 2022.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Pew Research Center, 'Teens, Social Media and Mental Health' (22 April 2025)",
          sourceUrl: "https://www.pewresearch.org/internet/2025/04/22/teens-social-media-and-mental-health/",
          reasoning:
            "A rigorous national survey that both sides cite: the sleep and peer-harm figures for the harm case, the connection figures against it. Teens' perceptions are not measurements of cause, and the debate itself may shape them.",
        },
        {
          id: "nasem-2023-review",
          title: "National Academies 2023: Review 'Did Not Support' That Social Media Causes Population-Level Changes in Teen Health",
          description:
            "A National Academies committee reviewing the evidence concluded its review 'did not support the conclusion that social media causes changes in adolescent health at the population level,' adding 'nevertheless, there are potential harms associated with the platforms.' It listed unhealthy social comparison, time taken from sleep and exercise, reduced ability to sustain attention, and problematic use resembling gaming disorder, and benefits including connection and value for teens who 'otherwise feel excluded or lack offline support,' including LGBTQ+ teens.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, Social Media and Adolescent Health (2023), Summary",
          sourceUrl: "https://www.nationalacademies.org/read/27396/chapter/2",
          reasoning:
            "The most authoritative review to date. It finds no population-level causal case while naming plausible mechanisms, so both sides draw on it; it predates the 2025-2026 meta-analyses.",
        },
        {
          id: "internal-instagram-research",
          title: "Meta's 'Project Mercury' (2019): Users Who Quit Facebook and Instagram Reported Less Depression and Loneliness",
          description:
            "As described from litigation filings in the federal social media addiction case (MDL 3047), Meta ran a one-month Facebook and Instagram deactivation study in late 2019. Participants who deactivated reported lower depression, anxiety, loneliness and social comparison after one week, and Meta reportedly halted the study after that first week. Filings quote an internal statement that 'best research suggests that Facebook is net bad for well-being.'",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 3,
            directness: 7,
          },
          source:
            "Witkin, Lim, Rausch & Haidt, 'The Many Lines of Evidence That Social Media is Not Safe For Teens' (2026), summarizing plaintiffs' filings in MDL 3047 (N.D. Cal.)",
          sourceUrl:
            "https://www.stern.nyu.edu/experience-stern/about/departments-centers-initiatives/academic-departments/business-society-program/tech-and-society-lab/research-areas/many-lines-evidence-social-media-not-safe-teens",
          reasoning:
            "The company's own research pointing to harm is hard to wave away. But it is an unpublished internal study known only through plaintiffs' filings as summarized by advocates, with one week of follow-up, so every weight is low.",
        },
      ],
    },
  ],
  aliases: [
    "Is social media a primary cause of the teen mental health crisis?",
    "Is social media making teenagers depressed?",
    "Did smartphones cause the rise in teen anxiety?",
  ],
  references: [
    {
      title: "Youth Risk Behavior Survey Data Summary & Trends Report: 2013-2023 - CDC (August 2024)",
      url: "https://www.cdc.gov/yrbs/dstr/index.html",
    },
    {
      title: "Social Media and Adolescent Health - National Academies (2023)",
      url: "https://www.nationalacademies.org/read/27396/chapter/2",
    },
    {
      title: "Digital Media Use and Child Health and Development: A Systematic Review and Meta-Analysis - JAMA Pediatrics (March 2026)",
      url: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2845518",
    },
    {
      title: "The great rewiring: is social media really behind an epidemic of teenage mental illness? - Odgers, Nature (2024)",
      url: "https://www.nature.com/articles/d41586-024-00902-2",
    },
    {
      title: "The Many Lines of Evidence That Social Media is Not Safe For Teens - NYU Stern Tech & Society Lab (2026)",
      url: "https://www.stern.nyu.edu/experience-stern/about/departments-centers-initiatives/academic-departments/business-society-program/tech-and-society-lab/research-areas/many-lines-evidence-social-media-not-safe-teens",
    },
  ],
};
