import type { Topic } from "@/lib/schemas/topic";

export const masculinityCrisisData = {
  id: "masculinity-crisis",
  title: "The Modern Masculinity Crisis",
  meta_claim:
    "Young men are experiencing a crisis of identity, purpose, and mental health driven by economic displacement, educational underperformance, and the collapse of traditional masculine roles, which neither progressive nor conservative frameworks adequately address.",
  status: "contested" as const,
  category: "philosophy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Of Boys and Men: Why the Modern Male Is Struggling — Richard V. Reeves, Brookings",
      url: "https://www.brookings.edu/books/of-boys-and-men/",
    },
    {
      title: "The Boy Crisis — Warren Farrell & John Gray",
      url: "https://boycrisis.org/",
    },
    {
      title: "Men's Mental Health — American Psychological Association",
      url: "https://www.apa.org/topics/men-boys",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is the 'masculinity crisis' real or manufactured?",
      content:
        "Men earn fewer degrees, have higher suicide rates, declining labor force participation, and rising 'deaths of despair.' But some argue that framing male struggles as a gendered crisis obscures the class and race dynamics driving the data — poor and working-class men of all backgrounds are struggling, while affluent men are doing fine.",
    },
    {
      id: "q2",
      title: "Why are young men drawn to figures like Andrew Tate and Jordan Peterson?",
      content:
        "When mainstream institutions tell young men that their problems are a product of their own privilege, and that masculinity itself is 'toxic,' the vacuum is filled by figures who validate male experience — sometimes with genuine insight, sometimes with misogyny. What is the pipeline from legitimate grievance to toxic ideology, and how should it be addressed?",
    },
    {
      id: "q3",
      title: "Can masculinity be redefined without dismissing what men value?",
      content:
        "The tension between 'toxic masculinity' discourse and men's lived experience of purpose, protection, and provision is real. Can society articulate a positive vision of masculinity that honors traditionally valued traits while discarding genuinely harmful ones, without condescension?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Empirical Crisis Indicators
    // =========================================================================
    {
      id: "empirical-crisis-indicators",
      title: "Empirical Crisis Indicators",
      short_summary:
        "Men account for nearly 4x the suicide rate of women, declining college enrollment (now 40% of bachelor's degrees), rising opioid deaths, a loneliness epidemic, and falling marriage and fertility rates. The question is whether these data points constitute a gendered crisis or reflect broader economic and social disruptions that disproportionately affect men.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The data points used to construct the 'masculinity crisis' narrative are real, but the gendered framing is misleading. Male suicide rates have been higher than female rates for over a century — this is not a new crisis. The decline in male college enrollment reflects the success of women's educational advancement, not male failure — men still dominate the highest-paying professions, C-suites, and political office. The 'loneliness epidemic' affects both genders, and women report higher rates of anxiety and depression than men. Framing these issues as a 'masculinity crisis' rather than a class crisis allows society to ignore that the men struggling most are poor, rural, and lacking access to economic opportunity — problems that would be better addressed through economic policy than gender identity discourse.",
      proponent_rebuttal:
        "The 'it's class, not gender' argument is a false dichotomy. Gender and class intersect — working-class men face compounding disadvantages that working-class women do not, including higher rates of workplace death (93% of occupational fatalities are male), harsher criminal sentencing (men receive 63% longer sentences for identical offenses), lower rates of seeking mental health treatment, and the collapse of male-dominated industries without equivalent retraining. The educational decline is not just 'women succeeding' — boys are struggling from elementary school onward, with lower reading scores, higher discipline rates, and higher dropout rates across every demographic group. Richard Reeves' research at Brookings demonstrates that male educational decline is a genuine crisis that, if it were happening to women at the same rate, would be recognized as a national emergency.",
      crux: {
        id: "gendered-vs-class-analysis",
        title: "The Gender vs. Class Attribution Study",
        description:
          "The crux is whether the negative outcomes disproportionately affecting men (suicide, educational decline, deaths of despair) are primarily driven by gender-specific factors or by class and economic factors that happen to affect more men. If controlling for socioeconomic status eliminates most gender differences in these outcomes, the crisis is primarily economic. If gender gaps persist within the same socioeconomic brackets, the crisis has irreducibly gendered dimensions.",
        methodology:
          "Conduct a decomposition analysis using large-scale longitudinal data (NLSY, PSID, or equivalent) that examines male disadvantage in education, mental health, mortality, and labor force participation while controlling for income, wealth, parental education, geographic location, and race. Determine what percentage of the male-female gap in each outcome is explained by socioeconomic factors versus residual gender-specific factors. Repeat across multiple countries to test whether the pattern is culturally universal or context-dependent.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Large-scale decomposition analysis using existing longitudinal datasets)",
      },
      evidence: [
        {
          id: "male-suicide-rate-disparity",
          title: "Men Die by Suicide at Nearly 4x the Rate of Women (US)",
          description:
            "The CDC reports that men account for approximately 80% of all suicides in the United States, dying by suicide at a rate of 23.6 per 100,000 compared to 6.1 per 100,000 for women (2022 data). While women attempt suicide more frequently, men's higher completion rate reflects the use of more lethal methods and lower rates of help-seeking behavior. The male suicide rate has increased by 36% since 2000, even as female rates also rose. Among young men aged 15-24, suicide is the second leading cause of death.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Centers for Disease Control and Prevention; American Foundation for Suicide Prevention",
          sourceUrl: "https://afsp.org/suicide-statistics/",
          reasoning:
            "CDC mortality data is among the most reliable statistics available. The 4:1 gender disparity in suicide is stark and directly supports the existence of a gendered mental health crisis. However, the long-standing nature of this disparity (predating the 'crisis' framing) slightly complicates claims that it represents a new phenomenon.",
        },
        {
          id: "male-college-enrollment-decline",
          title: "Men Now Earn Only 40% of Bachelor's Degrees in the US",
          description:
            "According to the National Student Clearinghouse, men now account for approximately 40% of college students, down from 50% in the 1970s. The gap exists across every racial and ethnic group and has been widening for two decades. Boys also lag behind girls in reading proficiency by an average of 14 points on NAEP assessments starting in elementary school. Some colleges have quietly implemented affirmative action for male applicants to maintain gender balance.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "National Student Clearinghouse; NAEP; Brookings Institution",
          sourceUrl: "https://nscresearchcenter.org/current-term-enrollment-estimates/",
          reasoning:
            "Enrollment data from the National Student Clearinghouse is highly reliable and independently verifiable. The consistency of the gap across all demographic groups directly challenges the 'it's about class, not gender' explanation and supports a gendered dimension to educational decline.",
        },
        {
          id: "women-also-struggling-context",
          title: "Women Report Higher Rates of Anxiety and Depression Than Men",
          description:
            "While men have higher suicide rates, women consistently report higher rates of diagnosed anxiety, depression, and psychological distress across national surveys. The National Health Interview Survey shows that women are 60% more likely than men to be diagnosed with anxiety disorders. This complicates the narrative of a uniquely male crisis — both genders are struggling with mental health, manifesting in different ways.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "National Institutes of Health; American Psychological Association",
          sourceUrl: "https://www.nimh.nih.gov/health/statistics/any-anxiety-disorder",
          reasoning:
            "NIH data is highly reliable and directly complicates the 'masculinity crisis' framing by showing that women also face serious mental health challenges. However, the different manifestation (female anxiety/depression vs. male suicide, addiction, and violence) may itself be gendered, suggesting that both genders face crises that express differently.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Structural vs. Cultural Explanations
    // =========================================================================
    {
      id: "structural-vs-cultural",
      title: "Structural vs. Cultural Explanations",
      short_summary:
        "Is the male crisis primarily about lost manufacturing jobs, declining wages for non-college workers, and economic displacement — or about cultural narratives that leave men without positive identity models? The answer determines whether the solution is economic policy or cultural reconstruction.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The decline of male-dominated industries — manufacturing, mining, construction — has eliminated millions of jobs that provided identity, income, and community to working-class men. Since 1979, real wages for men without college degrees have declined by 14% while women's wages have risen. The prime-age male labor force participation rate has fallen from 97% in 1960 to 86% in 2024, with 7 million working-age men entirely out of the labor force. This is not a cultural or identity crisis — it is an economic crisis. Men who have good jobs, stable relationships, and community connections do not experience a 'masculinity crisis.' The cultural framing obscures the material reality: provide economic opportunity and the identity crisis resolves itself.",
      proponent_rebuttal:
        "The economic explanation is necessary but insufficient. The suicide rate among men is highest in affluent professional occupations (physicians, dentists, veterinarians) where economic displacement is not a factor. Japan and South Korea — wealthy nations with low unemployment — have some of the highest male suicide rates globally. The loneliness epidemic disproportionately affects young men who grew up in the digital era with fewer in-person friendships, romantic relationships, and community ties than any previous generation. Richard Reeves documents that male educational decline begins in kindergarten — years before economic factors could operate. The cultural dimension is real: when traditional sources of male identity (provider, protector, father) are devalued without replacement, and when mainstream institutions frame masculinity itself as problematic, men lose access to the narrative resources needed to construct a meaningful life.",
      crux: {
        id: "economic-vs-cultural-intervention",
        title: "The Intervention Type Comparison",
        description:
          "The crux is whether economic interventions (job creation, trade school investment, wage support) or cultural interventions (mentorship programs, positive masculinity frameworks, community building) produce better outcomes for struggling men. If economic interventions alone substantially improve male mental health, social connection, and life satisfaction, the crisis is primarily structural. If economic improvement without cultural change leaves men still struggling, the crisis has irreducibly cultural dimensions.",
        methodology:
          "Compare communities that have received primarily economic interventions (job retraining programs, new industry development) with communities that have received primarily social/cultural interventions (men's mental health programs, mentorship networks, community organizations). Measure outcomes across male suicide rates, labor force participation, educational attainment, social connection, and life satisfaction. Use propensity score matching to control for baseline differences between communities.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Multi-community quasi-experimental comparison study)",
      },
      evidence: [
        {
          id: "deaths-of-despair-case-deaton",
          title: "Case & Deaton: Deaths of Despair Among White Working-Class Men",
          description:
            "Princeton economists Anne Case and Angus Deaton documented a dramatic rise in 'deaths of despair' — deaths from suicide, drug overdose, and alcoholic liver disease — among white non-Hispanic Americans without college degrees, particularly men, beginning in the late 1990s. This cohort experienced rising mortality while every other demographic group saw declining death rates. Case and Deaton attribute the trend to the collapse of stable employment, community institutions, and family structures in deindustrialized regions.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "Proceedings of the National Academy of Sciences; Princeton University",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.1518393112",
          reasoning:
            "Case and Deaton's research is among the most influential social science findings of the decade, from a Nobel laureate-led team. The evidence directly demonstrates that a large demographic of men is experiencing rising mortality from causes linked to hopelessness and disconnection. The research supports both economic and cultural explanations.",
        },
        {
          id: "male-loneliness-survey-data",
          title: "Survey of American Life: 15% of Young Men Report Zero Close Friends (2021)",
          description:
            "The American Enterprise Institute's Survey of American Life found that the share of men reporting zero close friends increased fivefold since 1990, from 3% to 15%. Among young men (18-29), the decline is even sharper. Men are less likely than women to have confided in a friend in the past week, less likely to have received emotional support, and more likely to report feeling lonely 'frequently.' The male friendship recession has occurred alongside the decline of traditional male bonding institutions: unions, fraternal organizations, team sports leagues, and religious congregations.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "American Enterprise Institute; Survey of American Life",
          sourceUrl: "https://www.americansurveycenter.org/research/the-state-of-american-friendship-change-challenges-and-loss/",
          reasoning:
            "The survey data directly quantifies the male social isolation that the crisis narrative describes. AEI is a center-right think tank, which affects independence slightly, though the survey methodology appears rigorous. The friendship data is self-reported, which is the standard methodology for social connection research.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: The Ideological Capture Problem
    // =========================================================================
    {
      id: "ideological-capture-problem",
      title: "The Ideological Capture Problem",
      short_summary:
        "Both 'man up' traditionalism and 'deconstruct masculinity' progressivism fail to offer a compelling positive vision that most men find meaningful. This vacuum is filled by figures ranging from thoughtful (Richard Reeves) to inflammatory (Andrew Tate), suggesting that the missing element is a constructive framework, not more critique from either direction.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "The progressive framework has failed young men not by being wrong about toxic behavior, but by offering critique without construction. 'Toxic masculinity' discourse, as it filters through social media and institutional communications, is often experienced by young men as a wholesale condemnation of male identity rather than a critique of specific harmful behaviors. The APA's 2019 guidelines describing 'traditional masculinity' as 'on the whole, harmful' drew backlash not because the underlying research was wrong, but because the framing felt like an institutional declaration that being male is pathological. When mainstream institutions offer only deconstruction, the reconstruction vacuum is filled by figures who validate male identity — sometimes productively (Jordan Peterson on responsibility), sometimes toxically (Andrew Tate on dominance). The problem is not that progressives are wrong about specific harms; it is that they have not articulated what positive masculinity looks like.",
      proponent_rebuttal:
        "The 'both sides fail' framing creates a false equivalence between fundamentally different problems. The conservative response to male struggle — 'man up,' reject feminism, embrace hierarchy — actively worsens outcomes by discouraging help-seeking behavior, reinforcing the emotional suppression that drives male suicide, and directing legitimate anger toward scapegoats (women, immigrants, minorities) rather than toward structural causes. The progressive response, while imperfect in its communication, correctly identifies the harmful norms (suppress emotions, avoid vulnerability, equate worth with earning) that contribute to male suffering. The solution is not to abandon the critique but to communicate it better and pair it with positive alternatives. Programs like ManKind Project, Evryman, and Next Gen Men show that progressive masculinity frameworks can resonate with men when they validate male experience while expanding the definition of strength.",
      crux: {
        id: "framework-effectiveness-test",
        title: "The Masculinity Framework Effectiveness Comparison",
        description:
          "The crux is whether men respond better to (a) conservative/traditional masculinity frameworks that emphasize responsibility, discipline, and purpose, (b) progressive frameworks that critique harmful norms while offering expanded definitions of strength, or (c) synthesized frameworks that honor traditionally valued traits while discarding genuinely harmful ones. If longitudinal outcomes show one approach produces significantly better mental health, social connection, and life satisfaction among participating men, the debate can move from ideology to evidence.",
        methodology:
          "Randomly assign men aged 18-35 who report low life satisfaction to one of four 12-month programs: (1) traditional masculinity mentorship (responsibility, discipline, purpose focus), (2) progressive masculinity groups (emotional intelligence, vulnerability, expanded roles), (3) synthesized approach (combining elements of both), and (4) waitlist control. Measure mental health (PHQ-9, GAD-7), social connection (UCLA Loneliness Scale), relationship quality, employment outcomes, and self-reported purpose/meaning at baseline, 6 months, and 12 months.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Multi-arm randomized controlled trial with 12-month follow-up)",
      },
      evidence: [
        {
          id: "apa-masculinity-guidelines-backlash",
          title: "APA Guidelines Calling Traditional Masculinity 'Harmful' Drew Major Backlash (2019)",
          description:
            "In January 2019, the American Psychological Association released its first-ever guidelines for psychological practice with boys and men, stating that 'traditional masculinity — marked by stoicism, competitiveness, dominance, and aggression — is, on the whole, harmful.' The guidelines provoked intense backlash from men who felt their identity was being pathologized. While the underlying research on how rigid gender norms harm men's help-seeking behavior is sound, the summary framing was widely experienced as an institutional condemnation of masculinity itself.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "American Psychological Association",
          sourceUrl: "https://www.apa.org/about/policy/boys-men-practice-guidelines.pdf",
          reasoning:
            "The APA guidelines and the public response are well-documented and directly illustrate the communication failure at the heart of the ideological capture problem. The APA's credibility as a professional organization gives the guidelines weight, but the backlash from the very population the guidelines aimed to help demonstrates the gap between expert framing and lived experience.",
        },
        {
          id: "tate-popularity-data",
          title: "Andrew Tate Became the Most Searched Person on Google in 2022",
          description:
            "In 2022, Andrew Tate became the most Googled person on the planet and was the most-watched creator on TikTok, with his content viewed over 11.6 billion times. His audience is overwhelmingly young men aged 14-25. While much of his content promotes misogynistic views, his appeal illustrates the demand for male identity content that mainstream institutions are not providing. Researchers studying his audience find that most followers are drawn by messages about self-improvement and purpose before being exposed to more extreme content.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Google Trends; Hope Not Hate; The Guardian",
          sourceUrl: "https://www.theguardian.com/technology/2022/aug/06/andrew-tate-violent-misogyny-social-media-tiktok",
          reasoning:
            "Tate's viral popularity is empirically verifiable and directly demonstrates the demand for male identity content. The analysis of his appeal pipeline (self-improvement gateway to misogyny) is documented by multiple independent researchers. However, the interpretation of what his popularity means for the broader 'crisis' framing is contested.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
