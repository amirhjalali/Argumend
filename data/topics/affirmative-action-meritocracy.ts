import type { Topic } from "@/lib/schemas/topic";

export const affirmativeActionMeritocracyData = {
  id: "affirmative-action-meritocracy",
  title: "Affirmative Action & Meritocracy",
  meta_claim:
    "Race-conscious admissions and hiring policies are necessary to achieve genuine equality of opportunity.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Systemic Disadvantage vs. Individual Merit
    // =========================================================================
    {
      id: "systemic-disadvantage-vs-merit",
      title: "Systemic Disadvantage vs. Individual Merit",
      short_summary:
        "The debate over affirmative action fundamentally hinges on whether standardized measures of merit — test scores, GPAs, credentials — reflect genuine individual capability or merely encode preexisting systemic advantages. Since the Supreme Court's 2023 SFFA v. Harvard ruling struck down race-conscious admissions, this question has become even more urgent as universities scramble for race-neutral alternatives.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Race-conscious policies violate the foundational principle that individuals should be evaluated on their own merit, not on immutable group characteristics. The Equal Protection Clause of the Fourteenth Amendment guarantees equal treatment under law. Chief Justice Roberts wrote in SFFA v. Harvard (2023) that 'eliminating racial discrimination means eliminating all of it.' When admissions offices assign value to race, they necessarily disadvantage individuals of other races who may have overcome their own hardships. Asian American applicants at Harvard were systematically scored lower on 'personal ratings' — a proxy for racial balancing. True meritocracy requires race-blind evaluation, and the proper remedy for past discrimination is ensuring equal access to quality K-12 education, not adjusting outcomes at the university gate.",
      proponent_rebuttal:
        "The concept of 'merit' as measured by standardized tests and traditional credentials is itself shaped by centuries of systemic advantage. SAT scores correlate more strongly with family income (r = 0.42) than with college GPA (r = 0.35), according to research by the College Board's own data and UC system analyses. Legacy admissions — which disproportionately benefit white applicants — admit students with lower academic credentials than affirmative action beneficiaries, yet face no constitutional challenge. The racial wealth gap ($171,000 median white family wealth vs. $17,600 for Black families per the Federal Reserve's 2022 Survey of Consumer Finances) creates compounding educational disadvantages from birth. Race-blind policies don't eliminate racial consideration — they simply make it invisible while perpetuating the status quo.",
      crux: {
        id: "merit-measurement-validity",
        title: "The Merit Measurement Validity Test",
        description:
          "Whether standardized measures of merit accurately reflect individual capability independent of systemic advantage. If test scores and credentials primarily measure accumulated advantage rather than innate ability or effort, then 'merit-based' selection systematically excludes capable individuals from disadvantaged backgrounds.",
        methodology:
          "Conduct a large-scale longitudinal study tracking 50,000+ students from diverse socioeconomic and racial backgrounds from kindergarten through career outcomes. Control for family wealth, school quality (per-pupil spending, teacher credentials), neighborhood characteristics, and access to test preparation. Compare predictive validity of standardized test scores vs. alternative measures (growth metrics, non-cognitive assessments, portfolio evaluations) for college completion, graduate school attainment, and career achievement at 10 and 20 years post-admission.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-15M (Multi-decade longitudinal cohort study requiring institutional partnerships and sustained funding)",
      },
      evidence: [
        {
          id: "sat-income-correlation",
          title: "SAT Scores Correlate More Strongly with Family Income Than College Performance",
          description:
            "Analysis of College Board data and the University of California system's comprehensive review of standardized testing (2020) found that SAT scores correlate at r = 0.42 with family income but only r = 0.35 with first-year college GPA. Students from families earning over $200,000 scored an average of 388 points higher than those from families earning under $20,000. The UC system's faculty senate report concluded that the SAT 'contributes relatively little to prediction of UC outcomes beyond what is already provided by high school grades.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "University of California Standardized Testing Task Force; College Board",
          sourceUrl: "https://senate.universityofcalifornia.edu/_files/underreview/sttf-report.pdf",
          reasoning:
            "The UC system's own faculty conducted this analysis with access to comprehensive student data. The finding that income predicts test scores more than academic performance directly challenges the claim that standardized tests measure individual merit. However, proponents argue that some correlation with income reflects real educational advantages that test scores legitimately capture.",
        },
        {
          id: "legacy-admissions-advantage",
          title: "Legacy Applicants Admitted at 3-5x Higher Rates Than Non-Legacy Applicants",
          description:
            "A 2023 study by Opportunity Insights (Chetty et al.) analyzing admissions data from Ivy-Plus colleges found that legacy applicants were admitted at 3-5 times the rate of non-legacy applicants with similar academic credentials. At Harvard, legacy status provided an admissions advantage equivalent to 160 SAT points. Approximately 70% of legacy admits were white. Despite this, legacy preferences faced no legal challenge in SFFA v. Harvard, leading Justice Sotomayor to note in her dissent that the ruling 'cements a superficial rule of colorblindness as a constitutional principle in an endemically segregated society.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Opportunity Insights, Harvard University; Chetty, Deming, Friedman (2023)",
          sourceUrl: "https://opportunityinsights.org/paper/collegeadmissions/",
          reasoning:
            "Opportunity Insights led by Raj Chetty is among the most rigorous empirical economics research groups. The finding that legacy preferences provide a larger admissions advantage than affirmative action — while being constitutionally unchallenged — directly exposes inconsistency in meritocracy arguments. Directness is slightly lower because legacy admissions are a related but distinct issue from race-conscious policies.",
        },
        {
          id: "sffa-v-harvard-ruling",
          title: "SFFA v. Harvard (2023): Supreme Court Strikes Down Race-Conscious Admissions",
          description:
            "In Students for Fair Admissions v. Harvard (2023), the Supreme Court ruled 6-3 that race-conscious admissions programs at Harvard and the University of North Carolina violated the Equal Protection Clause. Chief Justice Roberts's majority opinion held that university admissions programs 'must comply with the Equal Protection Clause' and that 'the student must be treated based on his or her experiences as an individual — not on the basis of race.' The ruling effectively overturned Grutter v. Bollinger (2003), which had upheld race-conscious admissions under strict scrutiny. The decision left open the possibility that applicants could discuss how race affected their lives in personal essays.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 10,
            directness: 9,
          },
          source: "Supreme Court of the United States",
          sourceUrl: "https://www.supremecourt.gov/opinions/22pdf/20-1199_hgdj.pdf",
          reasoning:
            "A Supreme Court opinion is the highest legal authority in the US and is a matter of public record with perfect replicability. Independence is lower because the 6-3 ideological split and the overturning of recent precedent (Grutter was only 20 years old) reflect judicial philosophy as much as neutral legal analysis. The ruling provides strong legal support for the anti-affirmative-action position but does not resolve the empirical questions about whether race-neutral alternatives achieve comparable outcomes.",
        },
        {
          id: "racial-wealth-gap-data",
          title: "Racial Wealth Gap: White Families Hold 10x the Wealth of Black Families",
          description:
            "The Federal Reserve's 2022 Survey of Consumer Finances found that the median white family held $171,000 in net wealth compared to $17,600 for Black families and $20,700 for Hispanic families — a nearly 10:1 ratio. Research by Darity and Mullen (2020) traces this gap to slavery, Jim Crow, exclusion from the GI Bill and FHA lending, and ongoing discrimination in housing and employment. The wealth gap translates directly into educational advantage: wealthier families invest more in tutoring, test preparation, extracurricular activities, and can afford to live in higher-quality school districts.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Federal Reserve Board, Survey of Consumer Finances; Darity & Mullen, 'From Here to Equality'",
          sourceUrl: "https://www.federalreserve.gov/econres/scfindex.htm",
          reasoning:
            "The Federal Reserve's Survey of Consumer Finances is the gold-standard household wealth dataset, conducted triennially with rigorous methodology. The wealth gap data is independently verifiable and undisputed. Directness is lower because the wealth gap establishes systemic disadvantage but does not directly prove that race-conscious admissions are the necessary remedy — other policies (wealth redistribution, K-12 investment) could theoretically address the gap.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Effectiveness of Race-Conscious vs. Race-Neutral Alternatives
    // =========================================================================
    {
      id: "race-conscious-vs-neutral-effectiveness",
      title: "Effectiveness of Race-Conscious vs. Race-Neutral Alternatives",
      short_summary:
        "Following SFFA v. Harvard, universities must rely on race-neutral alternatives to maintain diversity. Evidence from states that previously banned affirmative action — California (1996), Michigan (2006), Washington (1998) — shows significant and persistent declines in underrepresented minority enrollment that race-neutral strategies only partially offset.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Race-neutral alternatives — income-based preferences, percentage plans guaranteeing admission to top high school graduates, holistic review emphasizing socioeconomic hardship, targeted recruitment, and pipeline programs — can achieve meaningful diversity without racial classification. Texas's Top 10% rule, which guarantees admission to the state flagship for students graduating in the top 10% of any high school class, leveraged residential segregation to produce racial diversity without explicit racial preferences. Income-based affirmative action addresses the underlying disadvantage (poverty) that disproportionately affects minorities. After California banned affirmative action with Proposition 209 in 1996, the UC system eventually recovered minority enrollment through aggressive outreach, holistic review, and community college transfer pathways — demonstrating that race-neutral strategies can work given sufficient institutional commitment and time.",
      proponent_rebuttal:
        "The empirical record consistently shows that race-neutral alternatives underperform race-conscious policies. After Proposition 209, Black enrollment at UC Berkeley fell 50% and at UCLA by 43%, taking over 15 years for partial recovery — and 2023 enrollment still had not reached pre-ban levels at the most selective campuses. The Texas Top 10% rule maintained overall diversity only because Texas high schools remain deeply segregated; it failed to produce diversity at the department level, and the legislature had to cap the program at 75% of the entering class because it displaced other qualified applicants. A 2020 study by Bleemer in the Quarterly Journal of Economics found that Prop 209 reduced minority students' probability of graduating from a UC campus, reduced their wages by 5%, and pushed them toward less selective institutions — not a neutral reallocation but a net harm. Income-based affirmative action helps low-income white and Asian students but does not adequately capture the specific disadvantages of race: middle-class Black families still face discrimination in housing, employment, and policing.",
      crux: {
        id: "race-neutral-diversity-outcomes",
        title: "The Race-Neutral Equivalence Test",
        description:
          "Whether race-neutral policies can achieve comparable diversity outcomes to race-conscious policies at selective institutions. If race-neutral alternatives produce equivalent representation within a reasonable timeframe, the case for race-conscious policies weakens. If they consistently produce lower representation that compounds over time, race-neutral mandates effectively entrench racial stratification.",
        methodology:
          "Compare enrollment, graduation, and post-graduation outcomes for underrepresented minorities at the 50 most selective US universities, dividing them into three groups: (1) institutions in states that banned affirmative action before SFFA (California, Michigan, Washington, Florida, etc.), (2) institutions that practiced race-conscious admissions until SFFA (2023), and (3) all institutions post-SFFA. Track outcomes at 1, 3, 5, and 10 years post-ban, controlling for state demographics, institutional spending on outreach, and application pool changes.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (IPEDS enrollment data is publicly available; state-level analyses exist)",
      },
      evidence: [
        {
          id: "prop-209-aftermath",
          title: "Prop 209 Reduced UC Minority Enrollment and Long-Term Wages",
          description:
            "Zachary Bleemer's 2022 study in the Quarterly Journal of Economics, using administrative UC data, found that Proposition 209 (California's 1996 ban on affirmative action) reduced underrepresented minority enrollment at UC Berkeley by 50% and at UCLA by 43% in the first year. Over the longer term, the ban reduced minority students' probability of completing a UC degree and decreased their annual wages by approximately 5% compared to the pre-ban trend. The study found that displaced students enrolled at less selective institutions rather than not attending college, resulting in a mismatch that harmed their outcomes.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Zachary Bleemer, Quarterly Journal of Economics (2022)",
          sourceUrl: "https://academic.oup.com/qje/article/137/1/115/6360989",
          reasoning:
            "Published in one of the top five economics journals with rigorous peer review. Uses administrative data covering the entire UC system population rather than samples. The finding that the ban reduced not just enrollment but also graduation and wages directly demonstrates that race-neutral alternatives failed to achieve equivalent outcomes in California.",
        },
        {
          id: "texas-top-10-limitations",
          title: "Texas Top 10% Rule: Diversity Through Segregation with Structural Limits",
          description:
            "Texas's Top 10% rule, implemented after the Hopwood v. Texas decision (1996), guaranteed admission to UT Austin for students in the top 10% of their high school graduating class. Because Texas high schools are heavily segregated by race and income, the rule produced racial diversity at the university level. However, the rule was capped at 75% of the entering class in 2009 because it was displacing other qualified applicants. Studies by UT Austin researchers found the policy did not produce diversity within academic departments — STEM fields remained disproportionately white and Asian — and it primarily benefited students from segregated minority-majority schools rather than addressing systemic inequity.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "University of Texas at Austin Office of Admissions; Journal of Policy Analysis and Management",
          sourceUrl: "https://admissions.utexas.edu/research",
          reasoning:
            "UT Austin's own institutional data and published policy analyses provide credible evidence. The rule's reliance on school-level segregation to produce university-level diversity is an ironic finding — it works only because K-12 remains deeply segregated. The 75% cap demonstrates practical limitations. However, proponents note the rule still produced diversity without racial classification.",
        },
        {
          id: "michigan-post-ban-decline",
          title: "Michigan Proposal 2: Sustained Decline in Minority Enrollment at U of M",
          description:
            "After Michigan voters passed Proposal 2 in 2006, banning affirmative action in public university admissions, Black enrollment at the University of Michigan fell from 7.1% of the entering class in 2006 to 4.4% in 2021 — a 38% decline — despite the university spending over $250 million on diversity and outreach programs during that period. The decline was most pronounced at Michigan's law school and medical school. A 2014 analysis by the Century Foundation found that race-neutral alternatives adopted by Michigan recovered only about half of the diversity lost by the ban.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "University of Michigan Office of Enrollment Management; Century Foundation",
          sourceUrl: "https://tcf.org/content/report/race-class-and-college-admission/",
          reasoning:
            "Official enrollment data from the University of Michigan is publicly available and verifiable. The $250 million investment in alternative strategies without recovering pre-ban diversity levels provides strong evidence that race-neutral approaches are insufficient at highly selective institutions. The 15-year timeframe eliminates the objection that alternatives need more time.",
        },
        {
          id: "post-sffa-enrollment-drops",
          title: "Post-SFFA 2024 Enrollment: Significant Drops at Elite Universities",
          description:
            "Initial enrollment data for the entering class of 2024 — the first class admitted after the SFFA v. Harvard decision — showed significant declines in Black and Hispanic enrollment at many selective institutions. Amherst College reported Black enrollment dropping from 11% to 3%. MIT reported a decline in Black enrollment from 15% to 5% and Hispanic enrollment from 16% to 11%. However, some institutions (Harvard, Yale) reported more modest changes, leading to debate about whether early data reflects sustainable diversity or unsustainable efforts that will erode over time.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "Common Data Sets; institutional enrollment reports; Chronicle of Higher Education",
          sourceUrl: "https://www.chronicle.com/article/after-the-affirmative-action-ruling-tracking-campus-diversity",
          reasoning:
            "Institutional enrollment data is publicly reported. The post-SFFA data directly tests whether the ruling's promised race-neutral alternatives can maintain diversity. However, this is only one year of data, some institutions may be using essay-based race consideration (allowed under SFFA), and the full impact will take several years to assess. Source reliability is slightly lower because institutional self-reporting may reflect different methodologies.",
        },
        {
          id: "income-based-aa-underperformance",
          title: "Income-Based Affirmative Action Recovers Only 20-30% of Racial Diversity Lost",
          description:
            "A 2020 simulation study by Sean Reardon and colleagues at Stanford, using nationally representative data, found that replacing race-conscious admissions with income-based affirmative action at selective universities would recover only 20-30% of the racial diversity lost. This is because racial disadvantage and income disadvantage overlap but are not identical: middle-class Black and Hispanic families face racial barriers (neighborhood segregation, school quality, discriminatory discipline) that low-income white families do not. Additionally, there are more low-income white applicants than low-income minority applicants in absolute numbers, diluting the racial diversity effect of income-based preferences.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Sean Reardon et al., Stanford Center for Education Policy Analysis",
          sourceUrl: "https://cepa.stanford.edu/content/race-income-and-enrollment-patterns-highly-selective-colleges",
          reasoning:
            "Stanford CEPA is a leading education policy research center. The simulation methodology is transparent and uses nationally representative data. The finding that income-based alternatives recover only a fraction of racial diversity directly challenges the most commonly proposed race-neutral alternative. However, simulations have limitations compared to real-world implementation.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Social Cohesion vs. Remedial Justice
    // =========================================================================
    {
      id: "social-cohesion-vs-remedial-justice",
      title: "Social Cohesion vs. Remedial Justice",
      short_summary:
        "Critics argue that racial preferences increase resentment, stigmatize beneficiaries, and undermine social cohesion. Proponents counter that diversity in institutions builds cross-racial understanding and that the 'stigma' and 'mismatch' arguments are empirically weak. International comparisons with India, Brazil, and South Africa offer mixed lessons.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Racial preferences generate resentment among non-beneficiary groups, fuel perceptions of unfairness, and stigmatize the very minorities they aim to help by creating doubt about whether they earned their positions. The 'mismatch hypothesis,' advanced by UCLA law professor Richard Sander, argues that affirmative action places students in academic environments where they are underprepared relative to peers, leading to higher dropout rates, lower GPAs, and fewer graduates in STEM fields. Public opinion consistently shows majorities of all racial groups opposing race-based preferences — a 2023 Pew Research poll found 74% of Americans disapprove of considering race in admissions. International examples reinforce concerns: India's reservation system (quotas for Scheduled Castes, Scheduled Tribes, and Other Backward Classes covering up to 50% of seats) has been in place for 75 years but has not closed socioeconomic gaps and has generated persistent intercaste resentment.",
      proponent_rebuttal:
        "The mismatch hypothesis has been extensively tested and largely refuted. A 2016 study by Arcidiacono and Lovenheim in the Annual Review of Economics found that while affirmative action admits attend more selective schools, their graduation rates and long-term outcomes are equal to or better than they would have been at less selective institutions — the 'fit' argument does not hold empirically. The stigma argument assumes that the alternative to affirmative action is a perception of pure merit, but in practice, legacy admits, donor children, and athletes face no equivalent stigma despite receiving larger admissions advantages. Research on diversity's benefits is substantial: diverse teams produce more innovative research (Freeman & Huang, 2015), diverse corporate boards improve financial performance (McKinsey, 2020), and students exposed to racial diversity in college show greater civic engagement and reduced prejudice (Gurin et al., 2002). Brazil's racial quotas, implemented in 2012, have increased Black and mixed-race enrollment at federal universities from 33% to 50% with no measurable decline in academic quality.",
      crux: {
        id: "net-social-cohesion-effect",
        title: "The Social Cohesion Net Impact Assessment",
        description:
          "Whether race-conscious policies produce net positive or negative effects on social cohesion and intergroup relations. If affirmative action reduces prejudice, builds cross-racial networks, and creates role models that inspire future generations, the social benefits outweigh resentment costs. If it primarily generates backlash, stigmatizes beneficiaries, and entrenches racial categorization, it undermines its own goals.",
        methodology:
          "Design a mixed-methods study combining: (1) analysis of intergroup attitudes in states with and without affirmative action bans using the General Social Survey and ANES data, (2) longitudinal surveys of 10,000 students at 50 universities tracking racial attitudes, cross-racial friendships, and sense of belonging from freshman year through 10 years post-graduation, and (3) qualitative interviews with 500 beneficiaries and non-beneficiaries exploring perceived stigma, resentment, and solidarity. Include international comparative analysis of social cohesion metrics in India, Brazil, South Africa, and Malaysia.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$3-8M (Multi-site longitudinal study with survey and qualitative components)",
      },
      evidence: [
        {
          id: "mismatch-hypothesis-debate",
          title: "Mismatch Hypothesis: Sander vs. Arcidiacono — Evidence Is Mixed but Leans Against Mismatch",
          description:
            "Richard Sander's 2004 Stanford Law Review article argued that affirmative action in law schools 'mismatched' Black students with institutions above their preparation level, reducing the number of Black lawyers. Multiple reanalyses challenged his findings: a 2012 RAND study found no evidence of mismatch effects on bar passage rates after controlling for selection bias. Arcidiacono and Lovenheim (2016) found modest mismatch effects in STEM field persistence but not in overall graduation rates. A comprehensive 2017 review by Kidder and Lempert concluded that 'the weight of the evidence is against the strong mismatch hypothesis.' The debate remains active, but the strongest versions of the mismatch claim — that affirmative action reduces the total number of minority professionals — have not been supported by the data.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Stanford Law Review; Annual Review of Economics; RAND Corporation",
          sourceUrl: "https://www.annualreviews.org/doi/10.1146/annurev-economics-080315-015041",
          reasoning:
            "The academic debate between Sander and his critics has played out in top peer-reviewed venues over 20 years. The evidence is genuinely mixed on STEM-specific mismatch, but the strong version of the hypothesis (that affirmative action reduces total minority degree attainment) has been refuted by multiple independent analyses. The ongoing disagreement itself suggests the effect, if it exists, is small.",
        },
        {
          id: "diversity-innovation-research",
          title: "Diverse Teams Produce Higher-Impact Research and Better Corporate Outcomes",
          description:
            "Freeman and Huang (2015) analyzed 2.5 million research papers and found that papers authored by ethnically diverse teams received 5-10% more citations than homogeneous teams. McKinsey's 2020 'Diversity Wins' report found that companies in the top quartile for racial/ethnic diversity were 36% more likely to have above-average profitability. Gurin et al.'s (2002) longitudinal study of University of Michigan students found that exposure to diversity in college increased active thinking, intellectual engagement, and motivation, with effects persisting 5 years after graduation. These findings suggest that diversity in institutions produces tangible intellectual and economic benefits beyond equity considerations.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Freeman & Huang, NBER; McKinsey & Company; Gurin et al., Journal of Social Issues",
          sourceUrl: "https://www.nber.org/papers/w19905",
          reasoning:
            "The citation analysis uses a massive dataset and quantitative methodology. However, the McKinsey corporate diversity studies have been criticized for correlation-not-causation issues (more profitable companies may invest more in diversity, rather than diversity causing profitability). Gurin's study is from a single university. The evidence collectively suggests diversity has benefits, but establishing causation is difficult. Independence and replicability are lower because some studies (McKinsey) are from consulting firms with business interests in diversity services.",
        },
        {
          id: "public-opinion-opposition",
          title: "74% of Americans Oppose Race-Based Admissions Preferences",
          description:
            "A June 2023 Pew Research Center survey found that 74% of Americans — including 59% of Black adults, 68% of Hispanic adults, and 80% of white adults — said race and ethnicity should not be a factor in college admissions decisions. A 2023 Gallup poll found 69% disapproval. However, when the question is framed as 'programs designed to increase diversity,' support rises significantly. Additionally, 62% of Americans in the same Pew survey supported considering whether applicants come from wealthy or low-income backgrounds, suggesting support for socioeconomic preferences even as racial preferences are opposed.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Pew Research Center; Gallup",
          sourceUrl: "https://www.pewresearch.org/short-reads/2023/06/08/majorities-of-americans-in-both-parties-say-colleges-should-not-consider-race-in-admissions/",
          reasoning:
            "Pew and Gallup are the gold standard for public opinion polling with rigorous methodology. The consistent finding of majority opposition across racial groups supports the social cohesion concern. However, the sensitivity of results to question framing ('race as a factor' vs. 'diversity programs') suggests opinions are more nuanced than simple opposition. Directness is slightly lower because public opinion does not determine whether a policy is effective or just.",
        },
        {
          id: "brazil-quotas-outcomes",
          title: "Brazil's Racial Quotas Increased Black University Enrollment Without Quality Decline",
          description:
            "Brazil implemented racial quotas at federal universities through the Lei de Cotas (Quota Law) in 2012, reserving 50% of seats for public school graduates, with sub-quotas for Black, mixed-race, and indigenous students proportional to state demographics. By 2022, Black and mixed-race enrollment at federal universities rose from 33% to over 50%, roughly matching their share of the population. Studies by Francis and Tannuri-Pianto (2012) and Mello (2022) found no measurable decline in academic quality as measured by graduation rates and post-graduation employment. However, Brazil's unique racial classification system (self-identification with fluid categories) and its relatively recent implementation limit direct comparability to the US context.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Brazilian Ministry of Education; Francis & Tannuri-Pianto, Journal of Economic Behavior & Organization",
          sourceUrl: "https://www.sciencedirect.com/science/article/pii/S0167268112001539",
          reasoning:
            "Brazilian data provides a real-world test of racial quotas at national scale. The absence of quality decline is significant. However, directness is substantially lower because Brazil's racial categories, university system, and historical context differ fundamentally from the US. Cross-national comparisons in social policy always carry limited transferability. Replicability is lower due to challenges accessing Brazilian administrative data from outside the country.",
        },
        {
          id: "india-reservation-mixed-results",
          title: "India's 75-Year Reservation System: Significant Gains but Persistent Gaps and Resentment",
          description:
            "India's constitutional reservation system, in place since 1950, reserves up to 50% of seats in public universities and government jobs for Scheduled Castes, Scheduled Tribes, and Other Backward Classes. Studies by Deshpande (2011) and Bertrand et al. (2010) document significant gains: a substantial Dalit middle class has emerged, political representation has increased, and intergenerational mobility has improved. However, the caste wealth gap remains enormous, and the system has generated decades of intense political conflict, including the 2006 anti-reservation protests and ongoing 'caste wars' over which groups qualify as backward. The 'creamy layer' exclusion — barring wealthy members of backward classes from quotas — has been only partially effective.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Deshpande, 'The Grammar of Caste'; Bertrand et al., American Economic Review",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.100.2.9",
          reasoning:
            "Published in the top economics journal, with institutional data from the Indian government. India provides the longest-running large-scale affirmative action experiment globally. The mixed results — genuine gains accompanied by persistent inequality and social friction — provide evidence for both sides. Directness is low because the Indian caste system differs substantially from American racial categories in structure, duration, and social mechanics.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Students for Fair Admissions v. Harvard — Supreme Court of the United States (2023)",
      url: "https://www.supremecourt.gov/opinions/22pdf/20-1199_hgdj.pdf",
    },
    {
      title: "Grutter v. Bollinger (2003) — Supreme Court Opinion on Race-Conscious Admissions",
      url: "https://supreme.justia.com/cases/federal/us/539/306/",
    },
    {
      title: "Diversifying Society's Leaders? The Determinants and Causal Effects of Admission to Highly Selective Private Colleges — Chetty et al. (2023)",
      url: "https://opportunityinsights.org/paper/collegeadmissions/",
    },
    {
      title: "Affirmative Action, Mismatch, and Economic Mobility after California's Proposition 209 — Bleemer, Quarterly Journal of Economics (2022)",
      url: "https://academic.oup.com/qje/article/137/1/115/6360989",
    },
    {
      title: "Survey of Consumer Finances: Wealth Disparities by Race — Federal Reserve Board (2022)",
      url: "https://www.federalreserve.gov/econres/scfindex.htm",
    },
    {
      title: "Affirmative Action and the Quality-Fit Trade-off — Arcidiacono & Lovenheim, Annual Review of Economics (2016)",
      url: "https://www.annualreviews.org/doi/10.1146/annurev-economics-080315-015041",
    },
    {
      title: "Americans' Views on Whether Race and Ethnicity Should Be a Factor in College Admissions — Pew Research Center (2023)",
      url: "https://www.pewresearch.org/short-reads/2023/06/08/majorities-of-americans-in-both-parties-say-colleges-should-not-consider-race-in-admissions/",
    },
    {
      title: "University of California Standardized Testing Task Force Report (2020)",
      url: "https://senate.universityofcalifornia.edu/_files/underreview/sttf-report.pdf",
    },
    {
      title: "The Economic Impact of Affirmative Action Policies — National Bureau of Economic Research",
      url: "https://www.nber.org/papers/w19905",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does 'merit' measure ability or accumulated advantage?",
      content:
        "SAT scores correlate more with family income than with college performance, and legacy admits get a bigger admissions boost than affirmative action beneficiaries. If our standard metrics of merit systematically favor those born into advantage, can a truly meritocratic system exist without accounting for the unequal starting line?",
    },
    {
      id: "q2",
      title: "Can race-neutral alternatives actually achieve diversity?",
      content:
        "After Proposition 209, Black enrollment at UC Berkeley dropped 50% and took 15+ years to partially recover. Michigan spent $250 million on alternatives without restoring pre-ban diversity. Post-SFFA data shows sharp drops at elite schools. If race-neutral methods consistently underperform, is the Supreme Court's mandate achievable or does it simply accept resegregation of elite institutions?",
    },
    {
      id: "q3",
      title: "Does diversity in institutions reduce or deepen racial division?",
      content:
        "74% of Americans oppose race-based admissions, yet diverse teams produce higher-impact research and students exposed to diversity show reduced prejudice. India's 75-year reservation system created a Dalit middle class but also entrenched caste politics. Does the path to a post-racial society run through race-conscious policy, or does racial classification perpetuate the very divisions it aims to heal?",
    },
  ],
};
