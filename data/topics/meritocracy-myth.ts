import type { Topic } from "@/lib/schemas/topic";

export const meritocracyMythData = {
  id: "meritocracy-myth",
  title: "Is Meritocracy a Myth?",
  meta_claim:
    "The belief that success is primarily determined by individual talent and effort is a myth that legitimizes systemic inequality.",
  status: "contested" as const,
  category: "philosophy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title:
        "Raj Chetty et al. — The Fading American Dream: Trends in Absolute Income Mobility Since 1940",
      url: "https://opportunityinsights.org/paper/the-fading-american-dream/",
    },
    {
      title:
        "Michael Sandel — The Tyranny of Merit: What's Become of the Common Good?",
      url: "https://www.hup.harvard.edu/books/9780674248090",
    },
    {
      title:
        "Miles Corak — Income Inequality, Equality of Opportunity, and Intergenerational Mobility",
      url: "https://doi.org/10.1257/jep.27.3.79",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "How do we measure meritocracy?",
      content:
        "What objective criteria can distinguish whether outcomes result from individual merit versus structural advantages? Is there a way to isolate talent and effort from circumstance?",
    },
    {
      id: "q2",
      title: "Does equal opportunity require equal outcomes?",
      content:
        "Critics of meritocracy often point to unequal outcomes as evidence of unequal opportunity. But could a genuinely meritocratic system still produce large inequalities?",
    },
    {
      id: "q3",
      title: "Can meritocracy be reformed rather than rejected?",
      content:
        "If the current system falls short of meritocratic ideals, should we abandon the concept entirely or invest in removing barriers so merit can actually determine outcomes?",
    },
  ],
  pillars: [
    {
      id: "social-mobility-data",
      title: "Social Mobility Data",
      short_summary:
        "Empirical research shows upward mobility is declining and parental income strongly predicts children's outcomes.",
      image_url:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Meritocracy is a foundational principle of free societies. While no system is perfect, markets generally reward talent, education, and hard work. The existence of self-made billionaires, first-generation college graduates, and immigrant success stories demonstrates that upward mobility is real and achievable for those who apply themselves.",
      proponent_rebuttal:
        "Raj Chetty's research shows that absolute income mobility has fallen from roughly 90% for Americans born in 1940 to about 50% for those born in 1984. The Great Gatsby Curve demonstrates that countries with higher inequality also have lower intergenerational mobility — your parents' income is a stronger predictor of your income than your test scores. In the US, children born into the bottom quintile have only a 7.5% chance of reaching the top quintile. Individual success stories, while real, represent statistical outliers that create a survivorship bias masking the structural barriers faced by the majority.",
      crux: {
        id: "mobility-measurement",
        title: "The Intergenerational Elasticity Test",
        description:
          "Measure the correlation between parental income and children's adult income across generations to determine how much economic status is inherited versus earned.",
        methodology:
          "Link parent tax records to children's adult earnings using longitudinal datasets. Calculate intergenerational income elasticity (IGE) across income quintiles. Compare IGE across countries with different policy regimes. Control for heritable traits (IQ, health) to isolate structural vs. genetic transmission.",
        equation:
          "\\log(Y_{child}) = \\alpha + \\beta \\log(Y_{parent}) + \\varepsilon",
        verification_status: "verified" as const,
        cost_to_verify:
          "$200K (longitudinal tax record analysis + statistical modeling)",
      },
      evidence: [
        {
          id: "chetty-mobility-decline",
          title: "Absolute Mobility Fell from 90% to 50%",
          description:
            "Chetty et al. found that the fraction of children earning more than their parents declined from ~90% for the 1940 birth cohort to ~50% for the 1984 cohort.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "Opportunity Insights, Harvard University",
          reasoning:
            "Based on comprehensive US tax records covering millions of parent-child pairs.",
        },
        {
          id: "great-gatsby-curve",
          title: "The Great Gatsby Curve",
          description:
            "Cross-national data shows a strong positive correlation between income inequality and intergenerational earnings persistence — more unequal societies have less mobility.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Miles Corak, Journal of Economic Perspectives",
          reasoning:
            "Replicated across dozens of countries using comparable methodologies.",
        },
        {
          id: "wealth-persistence",
          title: "Intergenerational Wealth Persistence Over Centuries",
          description:
            "Gregory Clark's research on surname analysis suggests that social status persists across 10-15 generations, far longer than standard economic models predict.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Gregory Clark, The Son Also Rises",
          reasoning:
            "Methodology is debated, but findings are directionally consistent across multiple countries and time periods.",
        },
        {
          id: "immigrant-upward-mobility",
          title: "Immigrant Families Show Significant Upward Mobility",
          description:
            "Children of low-income immigrants in the US show substantially higher rates of upward mobility than children of native-born parents at similar income levels.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Chetty et al., Immigration and Upward Mobility",
          reasoning:
            "Suggests cultural and motivational factors can overcome structural barriers, though selection effects complicate interpretation.",
        },
      ],
    },
    {
      id: "structural-advantages",
      title: "Structural Advantages",
      short_summary:
        "Legacy admissions, zip code effects, and social capital networks create compounding advantages unrelated to individual merit.",
      image_url:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "While some structural advantages exist, they are being addressed through financial aid, affirmative action, and expanding access to education. The system self-corrects over time. Moreover, many structural factors (stable families, emphasis on education) reflect cultural values and choices rather than arbitrary privilege. Attributing all outcomes to structure denies human agency.",
      proponent_rebuttal:
        "Legacy admissions at elite universities give applicants a 45% boost in acceptance probability — a form of inherited privilege with nothing to do with merit. Children in high-income zip codes receive dramatically better-funded schools, safer environments, and richer extracurricular opportunities. Social capital networks — who your parents know — determine access to internships, mentorships, and career opportunities. These advantages compound: a child born to wealthy parents in a wealthy zip code attending a legacy-admission school enters the job market with structural advantages that no amount of individual effort from a disadvantaged peer can overcome. The playing field was never level.",
      crux: {
        id: "structural-decomposition",
        title: "The Structural Advantage Decomposition",
        description:
          "Quantify how much of adult income variation is explained by structural factors (parental wealth, zip code, school quality, social networks) versus individual factors (effort, talent, choices).",
        methodology:
          "Use sibling and adoption studies to separate environmental from genetic effects. Apply variance decomposition to large longitudinal datasets. Measure the income impact of specific structural interventions (school vouchers, neighborhood moves). Calculate the share of income variance attributable to factors outside individual control.",
        equation:
          "\\text{Var}(Y) = \\text{Var}(\\text{Structure}) + \\text{Var}(\\text{Individual}) + 2\\text{Cov}(S, I)",
        verification_status: "verified" as const,
        cost_to_verify:
          "$500K (longitudinal study analysis + natural experiment data)",
      },
      evidence: [
        {
          id: "legacy-admissions",
          title: "Legacy Admissions Provide 45% Acceptance Boost",
          description:
            "Research on elite university admissions shows legacy applicants receive a substantial advantage equivalent to scoring 160 points higher on the SAT.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "Opportunity Insights, Ivy-Plus admissions data",
          reasoning:
            "Based on internal admissions data from selective universities.",
        },
        {
          id: "zip-code-effects",
          title: "Zip Code Predicts Life Outcomes More Than Test Scores",
          description:
            "The Moving to Opportunity experiment showed that children who moved from high-poverty to low-poverty neighborhoods earned 31% more as adults.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Chetty, Hendren & Katz, American Economic Review",
          reasoning:
            "Randomized experiment — gold standard for causal inference on neighborhood effects.",
        },
        {
          id: "social-capital-networks",
          title: "Social Capital Networks Drive Career Outcomes",
          description:
            "Chetty's analysis of Facebook data showed that cross-class friendships (economic connectedness) are among the strongest predictors of upward mobility.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Chetty et al., Social Capital I & II, Nature 2022",
          reasoning:
            "Massive dataset (21 billion friendships) with strong causal identification.",
        },
        {
          id: "talent-still-matters",
          title: "Cognitive Ability Remains a Strong Predictor of Income",
          description:
            "Meta-analyses show that cognitive ability (IQ) explains approximately 20-25% of variance in job performance and income, independent of socioeconomic background.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Schmidt & Hunter, Psychological Bulletin",
          reasoning:
            "Robust finding, though critics argue IQ itself is partly shaped by structural advantages.",
        },
      ],
    },
    {
      id: "psychological-function",
      title: "The Psychological Function",
      short_summary:
        "Belief in meritocracy may serve a useful social purpose by motivating effort, even if the system is imperfect.",
      image_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Meritocratic belief is socially functional: it motivates individual effort, provides a shared framework of fairness, and underlies the social contract in democratic societies. Even if imperfect, the aspiration toward meritocracy drives policy reforms and personal striving. Abandoning meritocratic ideals risks fatalism, learned helplessness, and the erosion of personal responsibility.",
      proponent_rebuttal:
        "Research in social psychology shows that belief in meritocracy functions as a system-justifying ideology — it leads people to blame the poor for their poverty and credit the rich for their wealth, regardless of actual circumstances. Experiments by Kunda and others demonstrate that people who believe more strongly in meritocracy are actually less willing to support redistributive policies that would create genuine equal opportunity. The belief doesn't just motivate effort — it legitimizes existing inequalities by framing them as deserved. Philosopher Michael Sandel argues that meritocratic hubris has corroded social solidarity, with winners believing they earned everything and losers internalizing shame. A more honest reckoning with luck and structural advantage could maintain motivation while fostering greater compassion and support for equalizing opportunity.",
      crux: {
        id: "meritocratic-belief-effects",
        title: "The Meritocratic Belief Effects Test",
        description:
          "Determine whether belief in meritocracy on net increases or decreases support for policies that promote genuine equal opportunity.",
        methodology:
          "Conduct cross-national surveys measuring belief in meritocracy alongside support for equalizing policies (education funding, healthcare access, progressive taxation). Run experimental studies priming meritocratic belief and measuring subsequent policy preferences and empathy toward disadvantaged groups. Longitudinal analysis of whether societies with stronger meritocratic beliefs actually implement more equalizing institutions.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$150K (cross-national survey + experimental studies)",
      },
      evidence: [
        {
          id: "system-justification",
          title: "Meritocratic Belief Reduces Support for Redistribution",
          description:
            "Experimental studies show that priming meritocratic beliefs decreases willingness to support redistributive policies and increases blame directed at disadvantaged groups.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Jost & Banaji, System Justification Theory",
          reasoning:
            "Well-replicated finding in social psychology across multiple cultural contexts.",
        },
        {
          id: "meritocratic-hubris",
          title: "Meritocratic Hubris Erodes Social Solidarity",
          description:
            "Sandel documents how meritocratic sorting has created a credentialed elite that views its success as fully earned, leading to contempt for those without degrees and fueling populist backlash.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "Michael Sandel, The Tyranny of Merit",
          reasoning:
            "Philosophical argument supported by survey data on attitudes toward non-college-educated workers.",
        },
        {
          id: "effort-motivation",
          title: "Meritocratic Belief Increases Effort and Persistence",
          description:
            "Studies show that individuals who believe effort is rewarded work harder, persist longer at difficult tasks, and achieve better educational outcomes.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Dweck, Mindset; Duckworth, Grit",
          reasoning:
            "Robust finding, though critics note it may conflate growth mindset with meritocratic ideology.",
        },
        {
          id: "aspirational-framework",
          title: "Meritocracy as Aspirational Standard Drives Reform",
          description:
            "Historical civil rights movements have invoked meritocratic ideals — judging people by character, not skin color — as the moral basis for demanding structural reform.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          reasoning:
            "Meritocratic ideals have historically been a tool for expanding inclusion, not just maintaining status quo.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
