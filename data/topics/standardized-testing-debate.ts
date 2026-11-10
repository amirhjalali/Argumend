export const standardizedTestingDebateData = {
  id: "standardized-testing-debate",
  title: "Standardized Testing Value",
  question: "Should tests like the SAT and ACT stay central to college admissions?",
  meta_claim:
    "Standardized tests like the SAT and ACT are valid, fair measures of academic ability that should remain a core component of college admissions and educational assessment.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Children of the wealthiest 1% of families are 13 times likelier than children of low-income families to score 1300 or higher on the SAT or ACT. At Dartmouth, SAT scores explained 22% of the variation in first-year college GPA, against 9% for high-school grades. Both findings are real. What divides the sides is how much a test that tracks both family income and college performance should count in admissions.",
    confidence: 76,
    source:
      "Opportunity Insights (Chetty, Friedman & Deming), via Harvard Gazette (2023); Dartmouth College admissions analysis (Feb 2024)",
    sourceUrl:
      "https://news.harvard.edu/gazette/story/2023/11/new-study-finds-wide-gap-in-sat-act-test-scores-between-wealthy-lower-income-kids/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that SAT scores correlate strongly with family income, that no admissions metric is free of bias, that families who can afford to will game whatever gets measured, and that the evidence from the 1,800-plus colleges that went test-optional is mixed.",
    "They split over whether going test-optional raised diversity without losing the ability to spot talented students, as Dartmouth, MIT, Yale, Princeton and others reinstate the SAT and ACT; and over whether high-school grades, essays, portfolios and recommendations are fairer predictors than a common test or tilt admissions further toward wealthy families.",
  ],
  pillars: [
    {
      id: "predictive-validity-evidence",
      title: "Predictive Validity",
      short_summary:
        "Test-optional colleges saw more diverse applicant pools but no clear change in graduation rates. The experiment is still running.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "SAT/ACT scores track steeply with family wealth: Opportunity Insights found that children of the top 1% are about 13 times likelier than low-income children to score 1300+. Affluent families also buy private coaching that poorer families cannot. Test-optional policies were adopted by more than 1,800 colleges on the view that scores mostly re-encode privilege—adding more noise than signal about a given student's ability.",
      proponent_rebuttal:
        "A February 2024 Dartmouth analysis (used to reinstate testing for the Class of 2029) found SAT scores alone explained about 22% of the variance in first-year GPA versus 9% for high-school GPA, and warned that going test-optional was quietly overlooking high-achieving applicants from less-resourced backgrounds. The University of California's own 2020 task force likewise found scores predicted GPA, graduation, and final GPA within every income, race, and parental-education group—at least as well for underrepresented students as for others—yet UC dropped the SAT anyway. The score gap by income is real, but it largely mirrors years of unequal opportunity, not bias in the test itself.",
      crux: {
        id: "test-optional-diversity-outcomes",
        title: "Test-Optional Policy Outcomes on Diversity and Achievement",
        question:
          "Did going test-optional raise diversity without losing the ability to spot talented students?",
        description:
          "Measuring whether test-optional policies actually increased socioeconomic and racial diversity and improved student outcomes, or reduced colleges' ability to identify talent.",
        methodology:
          "Compare demographic composition, graduation rates, and GPAs at matched institutions before and after adopting test-optional policies. Control for simultaneous changes in financial aid, recruiting, and application volume.",
        equation:
          "\\Delta_{\\text{equity}} = f(\\text{test policy}, \\text{aid}, \\text{outreach}, \\text{applicant pool})",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Matched colleges compared before and after dropping the requirement on demographic mix, graduation rates and GPAs, controlling for simultaneous changes in aid, recruiting and application volume.",
        },
        cost_to_verify: "$300K (Analysis of existing institutional data)",
        falsification: {
          supporter_flip:
            "If the test-optional natural experiment showed schools that dropped the SAT got more socioeconomic/racial diversity with no loss in their ability to identify talent or in graduation rates — i.e. scores added no predictive signal beyond GPA and other data — the case for keeping tests would weaken.",
          skeptic_flip:
            "If more schools tested the conclusion that led Dartmouth, MIT and Yale to reinstate testing, and also found test-optional admissions screening out high-achieving low-income applicants, while scores kept predicting outcomes within every income group, dropping tests for equity would look likely to backfire.",
          common_ground:
            "Both sides agree SAT scores correlate strongly with family income, and that test-optional swept 1,800+ colleges with genuinely mixed evidence on whether diversity improved.",
          live_disagreement:
            "Whether test-optional policies actually raised diversity without losing predictive signal — which the still-running natural experiment hasn't cleanly resolved, since aid, recruiting, and applicant pools changed at the same time.",
        },
      },
      evidence: [
        {
          id: "dartmouth-2025-study",
          title: "Dartmouth Study: SAT Predicts First-Year GPA Better Than High School Grades",
          description:
            "A February 2024 analysis by Dartmouth economics and sociology professors found that SAT scores alone explained 22% of the variation in first-year college GPA versus 9% for high school GPA, and that test-optional admissions was unintentionally overlooking high-achieving applicants from less-resourced backgrounds (who submitted scores at lower rates even when their scores would have helped them). Dartmouth reinstated the testing requirement for the Class of 2029 based on this evidence.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 9,
          },
          source:
            "Dartmouth College, \"Reactivating the SAT/ACT requirement for Dartmouth undergraduate admissions\" (Feb 2024)",
          sourceUrl:
            "https://president.dartmouth.edu/news/2024/02/reactivating-satact-requirement-dartmouth-undergraduate-admissions",
          reasoning:
            "Credible because Dartmouth had adopted test-optional and then reversed course based on its own faculty analysis. Independence is moderate, not high: the study was internal to an institution with an interest in defending its admissions choice, though the underlying Ivy-Plus data overlaps with peer-reviewed work by Opportunity Insights.",
        },
        {
          id: "princeton-reinstates-tests",
          title: "Princeton Reinstates SAT/ACT Requirement for 2027-28 Cycle",
          description:
            "In October 2025, Princeton University announced it would again require SAT or ACT scores starting with the 2027-28 admissions cycle, ending its pandemic-era test-optional policy after a five-year internal review. Princeton joined a wave of selective institutions reinstating testing requirements, including MIT, Dartmouth, Yale, Brown, Harvard, and the University of Pennsylvania.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 5,
          },
          source:
            "The Daily Princetonian, \"Princeton to require SAT or ACT scores for applicants starting fall 2027\" (Oct 2025)",
          sourceUrl:
            "https://www.dailyprincetonian.com/article/2025/10/princeton-news-sat-act-standardized-test-optional-required-admissions",
          reasoning:
            "Institutional behavior is informative—elite schools are reinstating tests despite political pressure to remain test-optional. However, this is a policy decision, not empirical evidence.",
        },
        {
          id: "income-score-correlation",
          title: "Test Scores Track Strongly with Family Income",
          description:
            "Opportunity Insights' analysis of Ivy-Plus applicant data (Chetty, Friedman, and Deming, 2023) found that children of the wealthiest 1% of families were 13 times likelier than children of low-income families to score 1300 or higher on the SAT/ACT. Roughly one-third of children from the very richest families scored 1300+, versus under 5% of middle-class students. Researchers attribute the gap to unequal out-of-school opportunities accumulating over years rather than the test itself.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Opportunity Insights (Chetty, Friedman, Deming), via Harvard Gazette (Nov 2023)",
          sourceUrl:
            "https://news.harvard.edu/gazette/story/2023/11/new-study-finds-wide-gap-in-sat-act-test-scores-between-wealthy-lower-income-kids/",
          reasoning:
            "The income gradient in scores is well-documented. However, this is a correlation, not proof the test is biased: family income also tracks school quality, educational resources, and other factors that independently affect measured achievement. The specific correlation coefficient (r=0.42) and per-dollar score figures in earlier versions of this claim could not be verified against a primary source and have been replaced with the documented Opportunity Insights findings; directness is therefore marked lower since these are score-distribution gaps, not a direct measure of test bias.",
        },
        {
          id: "bennett-test-optional-enrollment",
          title: "Bennett (2022): Nearly 100 Private Colleges That Went Test-Optional Enrolled 10–12% More Underrepresented Minority Students and 3–4% More Pell Recipients",
          description:
            "Christopher Bennett studied nearly 100 private colleges that adopted test-optional admissions between 2005–06 and 2015–16, against comparable colleges that kept requirements. In the American Educational Research Journal he reports that 'test-optional policies were associated with a 3% to 4% increase in Pell Grant recipients', 'a 10% to 12% increase in first-time students from underrepresented racial/ethnic backgrounds' and 'a 6% to 8% increase in first-time enrollment of women.' He wrote: 'I do not detect clear evidence of changes in application volume or yield rate.' The increases are relative, so a 3–4% rise in Pell recipients is about one percentage point of the student body.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Christopher T. Bennett, 'Untested Admissions: Examining Changes in Application Behaviors and Student Demographics Under Test-Optional Policies', American Educational Research Journal 59(1) (2022; online April 2021)",
          sourceUrl:
            "https://www.aera.net/Newsroom/Untested-Admissions-Examining-Changes-in-Application-Behaviors-and-Student-Demographics-Under-Test-Optional-Policies",
          reasoning:
            "The most careful pre-pandemic estimate, from an independent researcher using a comparison-group design, and peer-reviewed. It supports the diversity half of the crux: going test-optional did raise diversity, if modestly. It does not measure the other half, whether these colleges lost the ability to spot talent, and it covers selective private colleges that chose the policy, not the Ivy-Plus schools now reinstating tests, so directness is 6.",
        },
        {
          id: "dartmouth-2029-first-test-required-class",
          title: "Dartmouth's First Test-Required Class in Five Years (2029) Was Projected at a Record 22% Pell-Eligible",
          description:
            "On 27 March 2025 Dartmouth admitted 1,702 of 28,230 applicants to the Class of 2029, 'the first in five years who were required to submit SAT or ACT scores.' The college said 16% are first-generation and 'an estimated 22% of U.S. citizens and permanent residents will qualify for a Pell Grant', adding: 'That initial projection would be a record high for Dartmouth.' It reported that 'Nearly 92% of admitted students have standardized test scores that rank among the top 25% percent of test-takers' at their own high schools. In October 2025 The Dartmouth reported that the college released only geographic and income data for the class and withheld gender and racial or ethnic breakdowns, after the 2023 Students for Fair Admissions ruling.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 4,
            directness: 5,
          },
          source:
            "Dartmouth News, 'Dartmouth Offers Admission to 1,702 Undergrad Applicants' (27 March 2025); The Dartmouth, 'Dartmouth declines to release full Class of 2029 profile' (17 Oct 2025)",
          sourceUrl: "https://home.dartmouth.edu/news/2025/03/admissions-class-2029",
          reasoning:
            "The first post-reinstatement outcome from the school whose study started the wave, and it cuts against the fear that requiring scores shrinks low-income access. Weighted low: it is the college's own projection for admitted, not enrolled, students; one class at one school; financial aid can move the Pell share independently of testing (the release says 27% will qualify for free tuition); and racial composition, the other diversity measure, was not published.",
        },
      ],
    },
    {
      id: "equity-and-alternatives",
      title: "Equity & Alternative Assessment",
      short_summary:
        "Score gaps persist across race and income after decades of reform. The debate is whether the tests reveal inequality or reinforce it.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Critics argue tests embed cultural and linguistic assumptions that favor the advantaged, and that paid test prep—part of a multi-billion-dollar tutoring market concentrated among wealthier families—buys a leg up. Race-based score gaps persist even after controlling for income, suggesting the gaps reflect cumulative inequality the test then certifies. On this view, holistic admissions, portfolio assessment, and mastery-based evaluation can capture student potential more fairly than a single timed exam.",
      proponent_rebuttal:
        "Proponents counter that a single scored exam is among the few common yardsticks in admissions: a student from a poor rural school answers the same questions as one from Exeter, whereas an 'A' at one high school can equal a 'C' at another. The diversity case for going test-optional is contested—more than 1,800 colleges dropped requirements, and studies disagree on whether socioeconomic diversity improved—so the gains, if any, are modest. And on the equity worry about coaching, the best peer-reviewed estimates put paid-prep gains in the tens of points, not hundreds. Drop tests, and admissions leans harder on essays, extracurriculars, and recommendations—channels that arguably favor wealthy families even more.",
      crux: {
        id: "alternative-assessment-comparison",
        title: "Head-to-Head Comparison of Assessment Methods",
        question:
          "Are high-school grades, essays and portfolios fairer predictors than tests, or do they favor wealthy families more?",
        description:
          "Rigorously comparing the predictive validity, equity effects, and scalability of standardized tests vs. portfolios, mastery assessments, and holistic review.",
        methodology:
          "Randomly assign students to admissions tracks using different assessment methods. Compare demographic diversity, academic outcomes, and graduation rates across methods. Account for Goodhart's Law effects (gaming of each metric).",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compare how well test scores, essays, portfolios and grades each predict college grades and graduation, broken out by family income, using admissions data from colleges that went test-optional and back, such as Dartmouth and MIT.",
        },
        cost_to_verify: "$2M (Multi-institution experimental study)",
        falsification: {
          supporter_flip:
            "If head-to-head studies showed portfolios, mastery assessment, or holistic review predict college success as well as the SAT while being more equitable and just as resistant to gaming, the 'we need a common yardstick' defense would collapse.",
          skeptic_flip:
            "If head-to-head studies found essays, activities and recommendations more sensitive to family resources and coaching than a scored exam, with paid prep moving scores only tens of points, the equity case for holistic review over tests would weaken.",
          common_ground:
            "Both sides agree no admissions metric is bias-free, and that whatever is measured gets gamed by families who can afford to (Goodhart's Law).",
          live_disagreement:
            "Whether holistic and portfolio methods are more equitable and predictive than a standardized test, or merely move the advantage to wealthy families through harder-to-standardize channels — a comparison no rigorous head-to-head trial has run.",
        },
      },
      evidence: [
        {
          id: "uc-system-internal-study",
          title: "UC Academic Senate Found Test Scores Predicted Outcomes Across Groups",
          description:
            "The University of California Academic Senate's 2020 Standardized Testing Task Force (STTF) report found that test scores predicted first-year GPA, graduation, and final GPA even when students were stratified by income, race, and parental education—and that scores were at least as predictive for underrepresented students as for majority students. Notably, the report found high school GPA's predictive validity was more robust within demographic groups than the SAT's. The UC Regents dropped the SAT/ACT in 2020 despite the task force recommending tests be retained.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "UC Academic Senate Standardized Testing Task Force (STTF) Report (2020)",
          sourceUrl:
            "https://senate.universityofcalifornia.edu/_files/committees/sttf/sttf-report.pdf",
          reasoning:
            "Credible because the UC system acted against its own faculty task force's recommendation. The earlier framing—that the SAT was simply 'more predictive than GPA for all groups' and that this was 'the largest single-institution analysis ever conducted'—overstated the report: the STTF actually found high school GPA's within-group validity more robust, and the 'largest ever' superlative is unverified. Claim and weights adjusted accordingly.",
        },
        {
          id: "alvero-essays-track-income",
          title: "Alvero et al. (2021): In 240,000 UC Admission Essays, Content and Style Tracked Household Income More Closely Than SAT Scores Did",
          description:
            "Stanford and UC researchers analyzed about 240,000 admission essays from 60,000 applicants to the University of California in November 2016, measuring content with topic models and style with Linguistic Inquiry and Word Count. In Science Advances they report that 'essay content and style had stronger correlations to self-reported household income than did SAT scores' and that 'essays explained much of the variance in SAT scores.' They conclude that 'college admission protocols should attend to how social class is encoded' in the non-numeric parts of an application.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Alvero, Giebel, Gebre-Medhin, antonio, Stevens & Domingue, 'Essay content and style are strongly related to household income and SAT scores: Evidence from 60,000 undergraduate applications', Science Advances 7(42): eabi9031 (13 Oct 2021)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8514086",
          reasoning:
            "A large peer-reviewed study that tests the crux's second half directly: the essay, the main alternative signal, carries at least as much of family income as the test. Directness is 7 rather than higher because it measures correlation with income, not how well essays predict college outcomes, and it covers one system's essays in one year.",
        },
        {
          id: "test-prep-industry-advantage",
          title: "Paid Test Prep Is a Multi-Billion-Dollar Market, But Coaching Gains Are Modest",
          description:
            "The US tutoring and test-preparation market is large—industry trackers put the broader sector in the low tens of billions of dollars annually—and high-end SAT/ACT coaching is concentrated among wealthier families. But peer-reviewed research on coaching effects is sobering: a NACAC review by Derek Briggs found average coaching gains of roughly 10-20 points on SAT math and 5-10 points on critical reading, far below the 100+ point gains advertised by prep companies. This is a real but smaller equity concern than prep marketing implies.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source:
            "Derek Briggs / NACAC, \"Preparation for College Admission Exams\" (2009); industry market-size trackers (IBISWorld, Technavio)",
          sourceUrl: "https://files.eric.ed.gov/fulltext/ED505529.pdf",
          reasoning:
            "A paid-prep advantage exists, but the prior version of this claim was inflated and unverifiable: the specific '$2.6 billion' figure, the '100-150 point' boost, and the '5x more likely' statistic could not be confirmed against primary sources, and the best peer-reviewed estimate (Briggs/NACAC) finds total coaching gains in the tens of points, not hundreds. Free options like Khan Academy's official SAT prep further narrow the gap. Weights de-inflated and directness lowered because market size does not directly measure score advantage. Filed on the testing side (it was on the skeptics' side until November 2026): its finding is that coaching moves scores by tens of points, which is the proponents' rebuttal to the coaching objection, not evidence for it.",
        },
        {
          id: "allensworth-gpa-vs-act-chicago",
          title: "Allensworth & Clark (2020): High-School GPA Was Five Times Stronger Than ACT Scores at Predicting College Graduation for 55,084 Chicago Graduates",
          description:
            "The University of Chicago Consortium on School Research followed 55,084 Chicago Public Schools graduates of 2006 to 2009 into college. Published in Educational Researcher (January 2020), the study found grades 'five times stronger than their ACT scores at predicting college graduation', and 'the predictive power of GPAs is consistent across high schools', the opposite of the usual worry that an A means different things at different schools. 'At many high schools, they discovered no connection between students' ACT scores and eventual college graduation.' After controlling for background and college characteristics, students with GPAs under 1.5 had around a 20% chance of graduating, against around 80% for GPAs of 3.75 or higher.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Allensworth & Clark, 'High School GPAs and ACT Scores as Predictors of College Completion: Examining Assumptions about Consistency across High Schools', Educational Researcher 49(3) (2020); UChicago News (5 Feb 2020)",
          sourceUrl: "https://news.uchicago.edu/story/test-scores-dont-stack-gpas-predicting-college-success",
          reasoning:
            "A large, independent, peer-reviewed study that goes straight at the common-yardstick defense of tests. It measures graduation, while the Dartmouth and Opportunity Insights findings for tests measure first-year GPA and selective-college outcomes, so the two are not in direct conflict. One urban district, students largely bound for less selective colleges, and grades rather than essays or portfolios, so directness is 6.",
        },
        {
          id: "galla-grades-self-regulation",
          title: "Galla et al. (2019): Across 47,000 Applicants, High-School Grades Predicted Four-Year Graduation Better Than Test Scores, Because Grades Capture Self-Regulation",
          description:
            "Brian Galla (University of Pittsburgh) and colleagues tracked more than 47,300 students who applied to college through an electronic common application in 2009–10, and studied a further 1,600 students of the Class of 2013 from four public schools. In the American Educational Research Journal they report that after controlling for demographics, better high-school grades were more strongly associated with graduating within four years than stronger admissions test scores. Test scores tracked cognitive ability, while 'their grades were more strongly associated with measures of self-control and perseverance' (Education Week's summary). The authors wrote that 'the grades assigned to students by their high school teachers reveal quite a bit about their capacity' to sustain effort toward long-term goals.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Galla et al., 'Why High School Grades Are Better Predictors of On-Time College Graduation Than Are Admissions Test Scores', American Educational Research Journal 56(6) (2019); Education Week (7 May 2019)",
          sourceUrl:
            "https://edweek.org/teaching-learning/when-it-comes-to-college-high-school-grades-reveal-more-than-just-academics/2019/05",
          reasoning:
            "A second, national sample agreeing with the Chicago result and offering a mechanism. Directness is 5: it compares grades with tests on graduation, not the fairness of essays or portfolios, and it does not address the testing side's point that grades are inflated and not comparable across schools. The self-regulation measures in the smaller study came from questionnaires at four schools. Source is press coverage of the paper.",
        },
      ],
    },
  ],
};
