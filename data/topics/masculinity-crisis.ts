import type { TopicInput } from "@/lib/schemas/topic";

export const masculinityCrisisData = {
  id: "masculinity-crisis",
  title: "Boys and Men: Is There a Crisis?",
  question: "Are boys and young men in a crisis that needs help aimed at them?",
  meta_claim:
    "Boys and young men are falling behind in school, work, health and friendship in ways that amount to a crisis, and it needs policies and programs aimed at them, not only general help for the poor or the economy.",
  status: "contested" as const,
  category: "philosophy" as const,
  // As of 3 November 2026: men 41.5% of bachelor's degrees in 2021-22 (NCES
  // Digest table 318.10); male suicide 23.0 vs female 5.9 per 100,000 in 2022
  // (NCHS Data Brief 509); prime-age men's labour force participation 89.5%
  // in September 2026 (BLS LNS11300061); Andrew Tate arrested in Miami on a
  // UK extradition request on 18 July 2026 (ADL, updated 21 July 2026).
  last_updated: "2026-11-03",
  imageUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60",
  aliases: [
    "Are young men in a crisis that neither left nor right adequately addresses?",
    "Is there a masculinity crisis?",
    "Is there a boy crisis?",
  ],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In 2022 American men died by suicide at a rate of 23.0 per 100,000, against 5.9 for women. Men earned 41% of bachelor's degrees in 2021-22, down from 57% in 1969-70, and one in ten men aged 25 to 54 is neither working nor looking for work. Women working full time still earn 84% of what men earn. Both sides accept those numbers. The fight is over whether they add up to a crisis of boys and men as such, and whether the answer is help aimed at them.",
    confidence: 90,
    source:
      "CDC/NCHS Data Brief No. 509 (September 2024); NCES Digest of Education Statistics, table 318.10; BLS series LNS11300061 (September 2026); BLS, Highlights of women's earnings in 2023",
    sourceUrl: "https://www.cdc.gov/nchs/products/databriefs/db509.htm",
  },
  simple_case: [
    "The answer decides whether schools let boys start a year later, whether states fund programs for young men, and what either political party offers them.",
    "It is a live fight. In May 2025 Gallup found a quarter of American men aged 15 to 34 had felt lonely for a lot of the previous day. In July 2026 Andrew Tate, whose videos have drawn billions of views from young men, was arrested in Miami on a British extradition request.",
  ],
  references: [
    {
      title: "Richard V. Reeves, Of Boys and Men: Why the Modern Male Is Struggling, Why It Matters, and What to Do About It (Brookings)",
      url: "https://www.brookings.edu/books/of-boys-and-men/",
    },
    {
      title: "NCES, Digest of Education Statistics 2023, table 318.10: Degrees conferred by level of degree and sex of student",
      url: "https://nces.ed.gov/programs/digest/d23/tables/dt23_318.10.asp",
    },
    {
      title: "NCHS Data Brief No. 509: Suicide Mortality in the United States, 2002-2022 (September 2024)",
      url: "https://www.cdc.gov/nchs/products/databriefs/db509.htm",
    },
    {
      title: "Gallup, 'Younger Men in the U.S. Among the Loneliest in West' (20 May 2025)",
      url: "https://news.gallup.com/poll/690788/younger-men-among-loneliest-west.aspx",
    },
    {
      title: "Heller et al., 'Thinking, Fast and Slow? Some Field Experiments to Reduce Crime and Dropout in Chicago', NBER Working Paper 21178",
      url: "https://www.nber.org/papers/w21178",
    },
    {
      title: "Anne Case, 'Deaths of despair strike women too', Princeton University Press",
      url: "https://press.princeton.edu/ideas/deaths-of-despair-strike-women-too",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What the numbers show
    // =========================================================================
    {
      id: "empirical-crisis-indicators",
      title: "Are Boys and Men Falling Behind?",
      short_summary:
        "Men now earn about 41% of bachelor's degrees, die by suicide at about four times women's rate, and drop out of the labour force more than they did. Women still earn less and men still hold most top jobs. Whether men's gaps are a crisis of men as men, or a class problem that hits more men, is the first split.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The numbers are real, but they do not show a new crisis of men as such. The male suicide rate has been three to four and a half times the female rate for as long as the CDC's modern series runs, and between 2001 and 2021 the female rate rose faster. Women working full time still earn 84% of what men earn. Men hold about 92% of S&P 500 chief executive jobs and 72% of seats in Congress. Women's rise in college is a success, not a sign that men failed. The men who are struggling are mostly poor, rural or without a degree, and so are the women beside them. Calling it a crisis of masculinity points at gender when the dividing line is class.",
      proponent_rebuttal:
        "The gaps run across class and they are growing in the places that decide a life. Men earned 57% of bachelor's degrees in 1969-70 and 41% in 2021-22. In 2022 men died by suicide at 23.0 per 100,000 against 5.9 for women. In September 2026 one in ten men aged 25 to 54 was neither working nor looking for work. A gap this size against women, in schooling or in early death, would be called an emergency. Pointing to men at the top does not help the boy who is behind in reading at ten and out of school at eighteen. The question is not which sex has it worse overall, but whether boys and young men have problems that are their own.",
      crux: {
        id: "gendered-vs-class-analysis",
        title: "The Same-Class Test",
        question:
          "Do men's gaps in school, work and health persist among men and women from the same class and race?",
        description:
          "If men's gaps in degrees, suicide, work and early death shrink to little once family income, parental education, place and race are held equal, the problem is mostly class. If they persist within the same class, they belong to boys and men as such.",
        methodology:
          "Decompose male-female gaps in degree completion, suicide, labour force participation and deaths from drugs and alcohol using large longitudinal data such as the NLSY or PSID, controlling for family income, wealth, parental education, location and race, and repeat the analysis in other rich countries.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A decomposition of NLSY or PSID data that controls for family income, wealth, parental education, location and race, and reports how much of each male-female gap in degrees, suicide, work and deaths of despair remains.",
        },
        cost_to_verify: "$300K-800K (Analysis of existing longitudinal datasets)",
        falsification: {
          supporter_flip:
            "If controlling for family income, parental education, place and race erased most of the male-female gaps in degrees, suicide and work, the case for a crisis of boys and men as such would weaken.",
          skeptic_flip:
            "If large gaps remained among boys and girls from the same families, neighbourhoods and income levels, the view that the problem is class rather than sex would be hard to hold.",
          common_ground:
            "Both sides agree men earn about 41% of bachelor's degrees and die by suicide at about four times women's rate, and that women working full time still earn less than men.",
          live_disagreement:
            "Whether men's gaps persist among people of the same class, and so call for help aimed at boys and men, or mostly reflect class and the loss of good jobs for people without degrees.",
        },
      },
      evidence: [
        {
          id: "male-college-enrollment-decline",
          title: "NCES: Men Earned 41% of Bachelor's Degrees in 2021-22, Down From 57% in 1969-70",
          description:
            "In 1969-70 men earned 451,097 of 792,316 bachelor's degrees, about 57%. Women first earned more bachelor's degrees than men in 1981-82. In 2021-22 men earned 835,316 of 2,015,035, about 41%.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 7,
          },
          source:
            "National Center for Education Statistics, Digest of Education Statistics 2023, table 318.10",
          sourceUrl: "https://nces.ed.gov/programs/digest/d23/tables/dt23_318.10.asp",
          reasoning:
            "Official counts of a large, long-running reversal. They do not by themselves say whether the cause is something about boys, about schools, or about the jobs open to men without a degree.",
        },
        {
          id: "male-suicide-rate-disparity",
          title: "NCHS: Men Died by Suicide at 23.0 per 100,000 in 2022, Women at 5.9",
          description:
            "The age-adjusted suicide rate in 2022 was 23.0 per 100,000 for males and 5.9 for females. The male rate was three to four times the female rate across 2002 to 2022.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 7,
          },
          source: "CDC/NCHS Data Brief No. 509, 'Suicide Mortality in the United States, 2002-2022' (September 2024)",
          sourceUrl: "https://www.cdc.gov/nchs/products/databriefs/db509.htm",
          reasoning:
            "Death records are the hardest numbers in this debate. A gap that has lasted decades shows a deep difference in how men suffer or seek help, but not that it is getting worse.",
        },
        {
          id: "prime-age-men-out-of-labor-force",
          title: "BLS: 89.5% of Men Aged 25 to 54 Were in the Labour Force in September 2026",
          description:
            "The seasonally adjusted labour force participation rate for men aged 25 to 54 was 89.5% in September 2026, after moving between 89.2% and 89.9% over the previous year. About one in ten prime-age men was neither working nor looking for work.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 5,
          },
          source: "Bureau of Labor Statistics, Current Population Survey, series LNS11300061",
          sourceUrl: "https://data.bls.gov/timeseries/LNS11300061",
          reasoning:
            "An official monthly measure of men outside the workforce in their main working years. It includes men in school, caring for family or disabled, and it does not compare men with women.",
        },
        {
          id: "male-suicide-disparity-longstanding",
          title: "NCHS: The Male Suicide Rate Was 3 to 4.5 Times the Female Rate From 2001 to 2021",
          description:
            "The male age-adjusted suicide rate was 18.2 per 100,000 in 2001 and 22.8 in 2021; the female rate was 4.1 and 5.7. 'The suicide rate for males was three to four and one-half times the rate for females during the 2001-2021 period.' The female rate rose by a larger share over those two decades, narrowing the ratio.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 6,
          },
          source: "CDC/NCHS Data Brief No. 464, 'Suicide Mortality in the United States, 2001-2021' (April 2023)",
          sourceUrl: "https://www.cdc.gov/nchs/products/databriefs/db464.htm",
          reasoning:
            "The same death records read over time: the gap is old and has narrowed, which cuts against a new or worsening crisis of men. It does not make the gap less serious.",
        },
        {
          id: "women-earnings-84-percent",
          title: "BLS 2023: Women Working Full Time Earned 84% of What Men Earned",
          description:
            "In 2023 women who worked full time had median weekly earnings that were 84% of men's. The gap was smaller for younger workers: women aged 25 to 34 earned 89% of what men earned, and women aged 16 to 24 earned 94%.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 4,
          },
          source: "Bureau of Labor Statistics, 'Highlights of women's earnings in 2023', Report 1111 (August 2024)",
          sourceUrl: "https://www.bls.gov/opub/reports/womens-earnings/2023/home.htm",
          reasoning:
            "Shows men still earn more on average, a point against treating men as the disadvantaged sex. It says nothing about the men at the bottom, and the shrinking gap among young workers fits the other side's story too.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Why: lost jobs, or lost connection and roles?
    // =========================================================================
    {
      id: "structural-vs-cultural",
      title: "Why: Lost Jobs, or Lost Friends and Roles?",
      short_summary:
        "Deaths from drugs, alcohol and suicide rose among Americans without degrees, men and women alike. Young American men report more loneliness than young men elsewhere, and men lean less on friends. Whether better jobs alone would fix men's struggles, or loneliness and lost roles need their own answers, is the second split.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The forces hurting working-class men are hurting working-class women too, which points to the economy, not masculinity. Anne Case, who with Angus Deaton named 'deaths of despair', found that deaths from drugs, alcohol and suicide were rising in parallel for men and women. In 1992 non-college white women aged 45 to 54 were three times as likely to die of heart disease as of a death of despair; now they are 30% more likely to die from drugs, alcohol or suicide. Loneliness is not a male story either: Pew found in 2024 that men and women are about equally likely to have a close friend and about equally likely to feel lonely most of the time. Good jobs, stable families and strong communities protect people of both sexes. Bring back the first and much of the rest follows.",
      proponent_rebuttal:
        "Jobs matter, but men's isolation has a shape of its own. Gallup found in 2023-24 that 25% of American men aged 15 to 34 had felt lonely a lot of the previous day, against a median of 15% for young men across the OECD. Men lean on friends far less: in a 2021 survey 21% of men had received emotional support from a friend in the past week, against 41% of women, and in Pew's 2024 survey 38% of men said they would be extremely or very likely to turn to a friend for support, against 54% of women. The share of all Americans with no close friends rose from 3% in 1990 to 12% in 2021. Despair may be shared, but it is men who die by suicide at four times the rate of women. Paychecks do not teach a man to ask for help or give him a place among other men.",
      crux: {
        id: "economic-vs-cultural-intervention",
        title: "The Jobs-Alone Test",
        question:
          "Would better jobs and wages alone fix men's struggles, or do loneliness and lost roles need their own answers?",
        description:
          "If men who get good jobs see their suicide risk, drinking, isolation and despair fall to the level of similar women, the problem is economic. If those gaps persist among men with good work, something else is going on.",
        methodology:
          "Follow men and women who gain stable, well-paid jobs, through plant openings, apprenticeship lotteries or wage shocks, and compare changes in suicide, overdoses, friendship and life satisfaction with similar people who did not, using linked administrative and survey data.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Linked records for people who won apprenticeship or job-program lotteries against those who lost, tracking suicide, overdoses, friendships and life satisfaction for men and women separately over ten years.",
        },
        cost_to_verify: "$1-3M (Lottery-based study with linked administrative data)",
        falsification: {
          supporter_flip:
            "If men who won good jobs through lotteries saw their isolation, drinking and suicide risk fall to the level of similar women, the case that men need help beyond the economy would weaken.",
          skeptic_flip:
            "If those men gained income but stayed as isolated and at risk as before, while similar women improved, the view that jobs alone would fix men's struggles would be hard to hold.",
          common_ground:
            "Both sides agree deaths from drugs, alcohol and suicide rose among Americans without degrees, and that men are less likely than women to turn to friends for emotional support.",
          live_disagreement:
            "Whether rebuilding good jobs for people without degrees would resolve most of men's struggles, or whether men's isolation and loss of role need answers of their own.",
        },
      },
      evidence: [
        {
          id: "gallup-young-men-loneliest",
          title: "Gallup 2025: 25% of US Men Aged 15 to 34 Felt Lonely a Lot of the Previous Day",
          description:
            "In Gallup data from 2023 and 2024, 25% of US men aged 15 to 34 said they felt lonely a lot of the previous day, against 18% for young women and 18% for all US adults. Across the 38 OECD countries the median for younger men was 15%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Gallup, 'Younger Men in the U.S. Among the Loneliest in West' (20 May 2025)",
          sourceUrl: "https://news.gallup.com/poll/690788/younger-men-among-loneliest-west.aspx",
          reasoning:
            "A large international survey shows young American men stand out against young women and against young men elsewhere. It is one question about one day, and it does not show why.",
        },
        {
          id: "male-loneliness-survey-data",
          title: "Survey Center on American Life 2021: 21% of Men Got Emotional Support From a Friend Last Week, vs 41% of Women",
          description:
            "In a May 2021 survey, 21% of men said they had received emotional support from a friend in the past week, against 41% of women. Among all Americans, 12% said they had no close friends, up from 3% in 1990, and 13% had ten or more, down from 33%.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Survey Center on American Life (American Enterprise Institute), 'The State of American Friendship: Change, Challenges, and Loss' (June 2021)",
          sourceUrl: "https://www.americansurveycenter.org/research/the-state-of-american-friendship-change-challenges-and-loss/",
          reasoning:
            "Shows a clear sex gap in how much men lean on friends. The 1990 comparison comes from a different poll with different methods, and the survey was taken during the pandemic.",
        },
        {
          id: "deaths-of-despair-case-deaton",
          title: "Case and Deaton 2015: Death Rates Rose Among Middle-Aged White Americans Without Degrees",
          description:
            "Anne Case and Angus Deaton documented rising mortality among middle-aged white non-Hispanic Americans from 1999, driven by drug and alcohol poisonings, suicide and chronic liver disease, and concentrated among those with a high school education or less, while death rates fell for other groups and in other rich countries.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Case and Deaton, 'Rising morbidity and mortality in midlife among white non-Hispanic Americans in the 21st century', PNAS 112(49) (2015)",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.1518393112",
          reasoning:
            "The founding study of 'deaths of despair'. Its dividing line is education, not sex, so it supports the claim that men without degrees are in trouble more than the claim that men as such are.",
        },
        {
          id: "deaths-of-despair-women-too",
          title: "Anne Case: Deaths of Despair Rose in Parallel for Women Without Degrees",
          description:
            "Anne Case writes that deaths from drugs, alcohol and suicide were rising in parallel for men and women. In 1992 non-college white women aged 45 to 54 were three times as likely to die of heart disease as of a death of despair; now they are 30% more likely to die from drugs, alcohol or suicide.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Anne Case, 'Deaths of despair strike women too', Princeton University Press",
          sourceUrl: "https://press.princeton.edu/ideas/deaths-of-despair-strike-women-too",
          reasoning:
            "The researcher behind the 'deaths of despair' finding reads it as a class story. It is an essay summarising her work, not a new study, and men still die of these causes at higher rates.",
        },
        {
          id: "pew-friends-equal-2024",
          title: "Pew 2024: Men and Women Equally Likely to Have a Close Friend, and to Feel Lonely",
          description:
            "In Pew's September 2024 survey of 6,204 US adults, men and women were about equally likely to say they have at least one close friend, and roughly equal shares said they feel lonely all or most of the time; 16% of all adults did. Men were less likely than women to say they would turn to a friend for emotional support (38% vs 54%).",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "Pew Research Center, 'Men, Women and Social Connections' (16 January 2025)",
          sourceUrl: "https://www.pewresearch.org/social-trends/2025/01/16/men-women-and-social-connections/",
          reasoning:
            "A large recent survey finds no sex gap in friendship or loneliness overall, against the idea of a male loneliness crisis. It does find men lean on friends less, and it does not single out young men.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Who is speaking to young men, and what helps?
    // =========================================================================
    {
      id: "ideological-capture-problem",
      title: "What Helps, and Who Is Speaking to Young Men?",
      short_summary:
        "Andrew Tate's videos have been viewed billions of times; in July 2026 he was arrested on a British extradition request covering 42 charges. A Chicago program for teenage boys cut violent-crime arrests by about half. Whether help aimed at boys and men works better than help for everyone, and whether it is fair to offer it, is the third split.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Programs for men are not where the evidence or the need points. Men still hold about 92% of S&P 500 chief executive jobs and 72% of seats in Congress, and women working full time earn 84% of what men do. The help that works for struggling boys, such as better schools, training and good jobs, works for struggling girls too, and can be offered to both. Gender-specific framing tends to arrive with a story about what feminism took from men, which is the story men like Andrew Tate sell. His audience shows how that story ends: in July 2026 he was arrested in Miami on a British extradition request, facing 42 charges including rape and human trafficking, which he denies. The answer to Tate is better economic help for everyone, not a men's movement of the centre.",
      proponent_rebuttal:
        "Help aimed at boys works, and leaving the field empty has a cost. In randomized trials in Chicago, the Becoming a Man program for teenage boys cut total arrests during the program by 28% to 35%, cut violent-crime arrests by 45% to 50% and raised graduation rates by 12% to 19% in the study with follow-up data, at benefit-cost ratios of 5-to-1 or more. Richard Reeves argues for practical reforms such as letting boys start school a year later, and says helping boys 'does not mean giving up on the ideal of gender equality.' When mainstream institutions say little to young men, others fill the gap: Tate's TikTok videos have been viewed some 11.6 billion times, many by teenagers. Men at the top are not the men in trouble, and pointing at CEOs does nothing for a boy failing ninth grade.",
      crux: {
        id: "framework-effectiveness-test",
        title: "The Targeted-Help Test",
        question:
          "Do programs aimed at boys and young men do more for them than the same money spent on help for everyone?",
        description:
          "Becoming a Man is one targeted program with strong trial results. The test is whether programs designed for boys, from later school starts to mentoring and male teachers, beat sex-neutral programs of the same cost on boys' outcomes, without leaving girls worse off.",
        methodology:
          "Randomized or lottery-based comparisons of boy-specific programs (delayed school entry, cognitive behavioural programs for boys, male mentors) against sex-neutral programs of equal cost, measuring graduation, arrests, employment and mental health for boys and girls separately.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Randomized comparisons of programs built for boys, such as Becoming a Man or a later school start, against sex-neutral programs of the same cost, reporting graduation, arrests, work and mental health for boys and girls separately.",
        },
        cost_to_verify: "$2-5M (Multi-site randomized comparison)",
        falsification: {
          supporter_flip:
            "If boy-specific programs did no better for boys than sex-neutral programs of the same cost, the case for help aimed at boys and men would weaken.",
          skeptic_flip:
            "If boy-specific programs repeatedly beat sex-neutral ones on boys' graduation, arrests and work, without costing girls, the view that general help is enough would be hard to hold.",
          common_ground:
            "Both sides agree Becoming a Man produced large drops in arrests in Chicago trials, and that Andrew Tate has drawn a very large audience of young men.",
          live_disagreement:
            "Whether help framed around boys and men beats help for everyone, and a value question no data settles: whether gender-specific programs are fair while men still hold most top jobs and earn more.",
        },
      },
      evidence: [
        {
          id: "becoming-a-man-chicago",
          title: "Becoming a Man, Chicago: Violent-Crime Arrests Fell 45% to 50% in Randomized Trials",
          description:
            "Randomized trials of Becoming a Man, a cognitive behavioural program for disadvantaged teenage boys in Chicago, found it reduced total arrests during the program by 28% to 35%, reduced violent-crime arrests by 45% to 50%, and, in the first study with follow-up data, raised graduation rates by 12% to 19%. A related program in the county juvenile detention centre cut readmissions by 21%. The authors estimate benefit-cost ratios from 5-to-1 to 30-to-1 or more, and find the effects came from helping youth slow down and rethink automatic responses rather than from generic mentoring.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "Heller, Shah, Guryan, Ludwig, Mullainathan and Pollack, 'Thinking, Fast and Slow? Some Field Experiments to Reduce Crime and Dropout in Chicago', NBER Working Paper 21178 (2015, revised 2016)",
          sourceUrl: "https://www.nber.org/papers/w21178",
          reasoning:
            "Some of the strongest evidence that a program aimed at boys can change their lives. It was not compared with a sex-neutral program, so it shows targeted help works, not that it works better than help for everyone.",
        },
        {
          id: "tate-popularity-data",
          title: "ADL: Tate's TikTok Videos Viewed About 11.6 Billion Times; Arrested in Miami in July 2026",
          description:
            "TikTok videos of Andrew Tate have been viewed some 11.6 billion times, according to reporting by The Guardian; many in his audience are teenagers. On 18 July 2026 US Marshals arrested Andrew and Tristan Tate in Miami on a United Kingdom extradition request; British prosecutors say Andrew Tate faces 42 charges, including rape and human trafficking. Both brothers deny wrongdoing, and a Romanian case against them remains unresolved.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 4,
          },
          source: "Anti-Defamation League, 'Andrew Tate: Five Things to Know' (3 January 2024, updated 21 July 2026)",
          sourceUrl: "https://www.adl.org/resources/article/andrew-tate-five-things-know",
          reasoning:
            "Shows the size of the audience for a figure who speaks to young men about manhood. View counts are not followers, the ADL is an advocacy group, and popularity does not show that mainstream institutions caused the demand.",
        },
        {
          id: "elite-men-dominate-top-outcomes",
          title: "Men Still Hold About 92% of S&P 500 CEO Jobs and 72% of Seats in Congress",
          description:
            "As of 2024 women held 7.9% of S&P 500 chief executive roles, so men held about 92% (The Conference Board). In the 119th Congress, which began in 2025, women are 28% of voting members, 29% of the House and 25% of the Senate, so men hold about 72%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 4,
          },
          source: "The Conference Board (S&P 500 CEO data); Pew Research Center, 119th Congress (21 February 2025)",
          sourceUrl: "https://www.pewresearch.org/short-reads/2025/02/21/women-account-for-28-of-lawmakers-in-the-119th-congress-unchanged-from-the-last-congress/",
          reasoning:
            "Shows that men as a group still hold most power, which makes programs for men a harder case to argue on fairness. It says nothing about men at the bottom, which is where the other side says the problem is.",
        },
      ],
    },
  ],
} satisfies TopicInput;
