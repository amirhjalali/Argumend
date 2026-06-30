import type { Topic } from "@/lib/schemas/topic";

export const standardizedTestingDebateData = {
  id: "standardized-testing-debate",
  title: "Standardized Testing Value",
  meta_claim:
    "Standardized tests like the SAT and ACT are valid, fair measures of academic ability that should remain a core component of college admissions and educational assessment.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "SAT scores correlate steeply with family wealth — yet within every income and race group they still predict college grades and graduation at least as well as for everyone else, and Dartmouth found the SAT explained more than twice the variance in first-year GPA that high-school GPA did. The score gap mostly reflects unequal opportunity, not a biased test.",
    confidence: 76,
    source:
      "Dartmouth admissions analysis (2024); University of California Standardized Testing Task Force (2020); Opportunity Insights (Chetty et al.)",
    sourceUrl:
      "https://home.dartmouth.edu/news/2024/02/sat/score",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The popular case against the SAT — that it just measures family wealth — is half right: scores do correlate steeply with income (kids of the top 1% are ~13x likelier to score 1300+), and that's a real problem.",
    "But the half it misses is that the test still predicts college grades and graduation within every income and race group — Dartmouth found the SAT explained more than twice the variance in first-year GPA that high-school GPA did, and UC's own task force found scores predicted outcomes at least as well for underrepresented students, which is why several elite schools reinstated testing after going test-optional.",
    "So the honest debate isn't 'valid vs. biased' but what a single common yardstick is worth against its alternatives — drop the SAT and admissions leans harder on essays, extracurriculars, and recommendations, channels that may favor wealthy families even more.",
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
        description:
          "Measuring whether test-optional policies actually increased socioeconomic and racial diversity and improved student outcomes, or reduced colleges' ability to identify talent.",
        methodology:
          "Compare demographic composition, graduation rates, and GPAs at matched institutions before and after adopting test-optional policies. Control for simultaneous changes in financial aid, recruiting, and application volume.",
        equation:
          "\\Delta_{\\text{equity}} = f(\\text{test policy}, \\text{aid}, \\text{outreach}, \\text{applicant pool})",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (Analysis of existing institutional data)",
        falsification: {
          supporter_flip:
            "If the test-optional natural experiment showed schools that dropped the SAT got more socioeconomic/racial diversity with no loss in their ability to identify talent or in graduation rates — i.e. scores added no predictive signal beyond GPA and other data — the case for keeping tests would weaken.",
          skeptic_flip:
            "A skeptic who wants tests dropped should weigh that elite schools (Dartmouth, MIT, Yale) reinstated testing after concluding test-optional was quietly screening out high-achieving low-income applicants, and that scores predict outcomes within every income group — so 'drop the test for equity' may backfire on the students it's meant to help.",
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
        description:
          "Rigorously comparing the predictive validity, equity effects, and scalability of standardized tests vs. portfolios, mastery assessments, and holistic review.",
        methodology:
          "Randomly assign students to admissions tracks using different assessment methods. Compare demographic diversity, academic outcomes, and graduation rates across methods. Account for Goodhart's Law effects (gaming of each metric).",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-institution experimental study)",
        falsification: {
          supporter_flip:
            "If head-to-head studies showed portfolios, mastery assessment, or holistic review predict college success as well as the SAT while being more equitable and just as resistant to gaming, the 'we need a common yardstick' defense would collapse.",
          skeptic_flip:
            "A skeptic who prefers holistic methods should weigh that the alternatives — essays, extracurriculars, recommendations — are even more sensitive to family resources and coaching than a scored exam, and that paid test-prep gains are tens of points, not hundreds.",
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
          id: "test-prep-industry-advantage",
          title: "Paid Test Prep Is a Multi-Billion-Dollar Market, But Coaching Gains Are Modest",
          description:
            "The US tutoring and test-preparation market is large—industry trackers put the broader sector in the low tens of billions of dollars annually—and high-end SAT/ACT coaching is concentrated among wealthier families. But peer-reviewed research on coaching effects is sobering: a NACAC review by Derek Briggs found average coaching gains of roughly 10-20 points on SAT math and 5-10 points on critical reading, far below the 100+ point gains advertised by prep companies. This is a real but smaller equity concern than prep marketing implies.",
          side: "against" as const,
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
            "A paid-prep advantage exists, but the prior version of this claim was inflated and unverifiable: the specific '$2.6 billion' figure, the '100-150 point' boost, and the '5x more likely' statistic could not be confirmed against primary sources, and the best peer-reviewed estimate (Briggs/NACAC) finds total coaching gains in the tens of points, not hundreds. Free options like Khan Academy's official SAT prep further narrow the gap. Weights de-inflated and directness lowered because market size does not directly measure score advantage.",
        },
      ],
    },
  ],
};
