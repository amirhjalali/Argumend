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
        "Meritocracy is a foundational principle of free societies, and the mobility data is not as fatalistic as critics suggest. Substantial upward mobility persists: children of low-income immigrants out-earn the children of comparable US-born families (Abramitzky, Boustan, Jacome & Perez, AER 2021), and a child's odds of climbing from the bottom to the top quintile vary roughly three-fold across US regions (Chetty et al. 2014) — meaning local institutions and opportunity, not a fixed national caste system, shape outcomes. That variation is itself evidence that effort and circumstance interact rather than that birth is destiny. Markets still reward talent, education, and skill, and first-generation college graduates and immigrant success stories show mobility is real and achievable for those who can access opportunity.",
      proponent_rebuttal:
        "Raj Chetty's research shows that absolute income mobility — the share of children who out-earn their parents at the same age — has fallen from roughly 90% for Americans born in 1940 to about 50% for those born in the early 1980s, a decline the authors attribute mostly to the more unequal distribution of growth rather than slower growth itself. The Great Gatsby Curve shows that, across countries, higher inequality tracks with lower intergenerational mobility. And in the US, a child born into the bottom income quintile has only about a 7.5% chance of reaching the top quintile (Chetty et al. 2014), with that figure ranging from roughly 4% to 13% depending on the region they grow up in. Individual success stories, while real, are statistical outliers whose visibility creates a survivorship bias that masks the structural barriers facing the majority.",
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
            "Chetty et al. found that the fraction of children earning more than their parents (at age 30) fell from ~90% for the 1940 birth cohort to ~50% for the 1980 cohort. The decline was driven mostly by the more unequal distribution of growth, not slower aggregate growth.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Chetty, Grusky, Hell, Hendren, Manduca & Narang, \"The fading American dream: Trends in absolute income mobility since 1940,\" Science 356:398-406 (2017)",
          sourceUrl: "https://doi.org/10.1126/science.aal4617",
          reasoning:
            "Based on de-identified US tax records combined with Census/CPS data covering millions of parent-child pairs.",
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
            replicability: 6,
            directness: 7,
          },
          source:
            "Miles Corak, \"Income Inequality, Equality of Opportunity, and Intergenerational Mobility,\" Journal of Economic Perspectives 27(3):79-102 (2013); curve named by Alan Krueger (2012)",
          sourceUrl: "https://doi.org/10.1257/jep.27.3.79",
          reasoning:
            "Cross-sectional correlation across a set of mostly OECD countries; widely cited, though the small country sample and choice of mobility estimates are debated.",
        },
        {
          id: "wealth-persistence",
          title: "Intergenerational Wealth Persistence Over Centuries",
          description:
            "Gregory Clark's surname-tracking analysis argues that underlying social status is highly persistent (implied intergenerational correlation ~0.7-0.8), so status regresses to the mean very slowly — over many generations rather than the 3-5 implied by conventional single-generation estimates.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source:
            "Gregory Clark, The Son Also Rises: Surnames and the History of Social Mobility (Princeton University Press, 2014)",
          sourceUrl:
            "https://press.princeton.edu/books/hardcover/9780691162546/the-son-also-rises",
          reasoning:
            "Methodology (surname-group averages, the assumed 'social competence' latent variable) is heavily contested by economists; treat as suggestive, not settled.",
        },
        {
          id: "immigrant-upward-mobility",
          title: "Immigrant Families Show Significant Upward Mobility",
          description:
            "Children of low-income immigrants in the US show higher rates of upward mobility than children of US-born parents raised at a similar income level — a pattern holding across most sending countries and across two centuries. The authors attribute much of the gap to immigrants settling in higher-opportunity areas, not innate cultural advantage.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Abramitzky, Boustan, Jacome & Perez, \"Intergenerational Mobility of Immigrants in the United States over Two Centuries,\" American Economic Review 111(2):580-608 (2021); see also Abramitzky & Boustan, Streets of Gold (2022)",
          sourceUrl: "https://doi.org/10.1257/aer.20191586",
          reasoning:
            "Robust across cohorts, but the result is partly geographic (where immigrants locate) rather than evidence that effort alone overcomes structural barriers; selection into migration complicates interpretation.",
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
        "Legacy admissions at elite universities sharply raise an applicant's odds of acceptance — among top-1% families, legacies are roughly five times as likely to be admitted as comparable applicants — a form of inherited privilege with nothing to do with merit. Children in high-income zip codes receive dramatically better-funded schools, safer environments, and richer extracurricular opportunities. Social capital networks — who your parents know — determine access to internships, mentorships, and career opportunities. These advantages compound: a child born to wealthy parents in a wealthy zip code attending a legacy-admission school enters the job market with structural advantages that no amount of individual effort from a disadvantaged peer can overcome. The playing field was never level.",
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
          title: "Legacy Applicants Are Far More Likely to Be Admitted",
          description:
            "At Ivy-Plus colleges, legacy applicants are admitted at much higher rates than non-legacies with comparable test scores; among applicants from the top 1% of families, legacies are roughly five times as likely to be admitted as the average applicant with comparable credentials.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Chetty, Deming & Friedman, \"Diversifying Society's Leaders? The Determinants and Causal Effects of Admission to Highly Selective Private Colleges,\" NBER Working Paper 31492 (2023)",
          sourceUrl: "https://www.nber.org/papers/w31492",
          reasoning:
            "Based on linked admissions and tax records from Ivy-Plus colleges. (The often-quoted '160 SAT-point' legacy equivalence comes from separate Espenshade-era work, not this study, so it is not asserted here.)",
        },
        {
          id: "zip-code-effects",
          title: "Moving to a Lower-Poverty Neighborhood Raises Children's Earnings",
          description:
            "Re-analysis of the randomized Moving to Opportunity experiment found that children whose families used a voucher to move to a low-poverty neighborhood before age 13 earned about 31% more (roughly $3,500/year) as young adults than the control group; moving as a teenager showed little or slightly negative effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Chetty, Hendren & Katz, \"The Effects of Exposure to Better Neighborhoods on Children: New Evidence from the Moving to Opportunity Experiment,\" American Economic Review 106(4):855-902 (2016)",
          sourceUrl: "https://doi.org/10.1257/aer.20150572",
          reasoning:
            "Built on a randomized housing-voucher experiment — strong causal design — though the earnings effect is concentrated among those who moved young.",
        },
        {
          id: "social-capital-networks",
          title: "Social Capital Networks Drive Career Outcomes",
          description:
            "Chetty et al.'s analysis of 21 billion Facebook friendships (72.2 million US users) found that 'economic connectedness' — the share of high-SES friends among low-SES people — is among the strongest known correlates of upward income mobility across areas.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Chetty et al., \"Social capital I: measurement and associations with economic mobility\" & \"Social capital II,\" Nature 608:108-121 & 122-134 (2022)",
          sourceUrl: "https://doi.org/10.1038/s41586-022-04996-4",
          reasoning:
            "Massive dataset, but the headline result is an area-level association/predictor, not an established causal effect — the authors are explicit that connectedness is correlational.",
        },
        {
          id: "talent-still-matters",
          title: "Cognitive Ability Strongly Predicts Job Performance",
          description:
            "Schmidt & Hunter's meta-analysis of 85 years of personnel-selection research found general mental ability is the single best predictor of job performance, with an operational validity of about r = 0.51 (around a quarter of the variance) — higher than experience or education.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "Schmidt & Hunter, \"The Validity and Utility of Selection Methods in Personnel Psychology,\" Psychological Bulletin 124(2):262-274 (1998)",
          sourceUrl: "https://doi.org/10.1037/0033-2909.124.2.262",
          reasoning:
            "Robust for job performance, but the study did not measure income and did not control for socioeconomic background; critics also argue measured ability is itself partly shaped by structural advantages.",
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
        "Meritocratic belief is socially functional: it can motivate individual effort, provides a shared framework of fairness, and underpins the social contract in democratic societies. The aspiration toward meritocracy has also been a moral engine for reform — civil-rights advocacy invoked the ideal of judging people 'by the content of their character' to demand the dismantling of ascriptive barriers. Even if popular claims about 'growth mindset' and 'grit' are smaller and less reliable than once advertised, the broader point holds: a society that believes effort can matter gives people a reason to strive, whereas abandoning meritocratic ideals risks fatalism, learned helplessness, and the erosion of personal responsibility.",
      proponent_rebuttal:
        "Research in social psychology suggests that belief in meritocracy can function as a system-justifying ideology — Jost and Banaji's system-justification theory holds that people are motivated to defend existing arrangements, rationalizing inequality by crediting the advantaged and blaming the disadvantaged. A body of correlational and experimental work links stronger meritocratic belief to weaker support for redistribution, though this finding is contested and its direction debated. The worry is that the belief doesn't merely motivate effort — it can legitimize existing inequalities by framing them as deserved. Philosopher Michael Sandel argues that this 'meritocratic hubris' has corroded social solidarity, with winners believing they earned everything and losers internalizing shame. A more honest reckoning with luck and structural advantage, on this view, could preserve motivation while fostering greater compassion and support for equalizing opportunity.",
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
          title: "Meritocratic Belief Functions to Justify Inequality",
          description:
            "System-justification theory holds that people are motivated to defend existing social arrangements, with meritocratic 'legitimizing myths' and complementary stereotypes leading them to rationalize inequality — crediting the advantaged and blaming the disadvantaged.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Jost & Banaji, \"The role of stereotyping in system-justification and the production of false consciousness,\" British Journal of Social Psychology 33(1):1-27 (1994)",
          sourceUrl: "https://doi.org/10.1111/j.2044-8309.1994.tb01008.x",
          reasoning:
            "Influential, much-cited theoretical framework with supporting experiments; the specific claim that priming meritocracy lowers redistribution support rests on later studies and is more contested than the core theory.",
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
          source:
            "Michael J. Sandel, The Tyranny of Merit: What's Become of the Common Good? (Farrar, Straus and Giroux / Penguin, 2020)",
          sourceUrl: "https://www.hup.harvard.edu/books/9780674248090",
          reasoning:
            "A normative/philosophical argument, not an empirical study; cites survey evidence on attitudes toward non-college-educated workers but is interpretive rather than causal.",
        },
        {
          id: "effort-motivation",
          title: "Belief That Effort Is Rewarded Can Increase Persistence",
          description:
            "Popular research on 'growth mindset' (Dweck) and 'grit' (Duckworth) argues that believing effort and ability can grow leads people to persist longer and, in some studies, achieve modestly better outcomes — though the size and reliability of these effects are disputed.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 5,
          },
          source:
            "Carol S. Dweck, Mindset: The New Psychology of Success (Random House, 2006); Angela Duckworth, Grit (Scribner, 2016)",
          sourceUrl:
            "https://www.penguinrandomhouse.com/books/44330/mindset-by-carol-s-dweck-phd/",
          reasoning:
            "Competing meta-analyses (e.g. Sisk et al. 2018) find growth-mindset interventions have small and inconsistent achievement effects; this also conflates a psychological belief about ability with meritocratic ideology about society.",
        },
        {
          id: "aspirational-framework",
          title: "Meritocracy as Aspirational Standard Drives Reform",
          description:
            "Civil rights advocacy has invoked the ideal of judging people 'by the content of their character' rather than ascribed traits — as in King's 1963 'I Have a Dream' speech — using a meritocratic aspiration as the moral basis for demanding structural reform.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source:
            "Martin Luther King Jr., \"I Have a Dream\" (March on Washington, August 28, 1963)",
          sourceUrl:
            "https://www.loc.gov/static/programs/national-recording-preservation-board/documents/IHaveADream.pdf",
          reasoning:
            "An interpretive historical argument: a single famous speech illustrates that meritocratic ideals have been used to expand inclusion, but it does not establish a general empirical claim.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
