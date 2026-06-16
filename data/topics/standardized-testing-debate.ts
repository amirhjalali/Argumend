import type { Topic } from "@/lib/schemas/topic";

export const standardizedTestingDebateData = {
  id: "standardized-testing-debate",
  title: "Standardized Testing Value",
  meta_claim:
    "Standardized tests like the SAT and ACT are valid, fair measures of academic ability that should remain a core component of college admissions and educational assessment.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "predictive-validity-evidence",
      title: "Predictive Validity",
      short_summary:
        "Test-optional colleges saw more diverse applicant pools but no clear change in graduation rates. The experiment is still running.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "SAT scores correlate with family income at r=0.42—every $20,000 increase in family income is associated with a ~20-point score increase. Wealthy families can afford $10,000+ in test prep coaching. Test-optional policies were adopted by 1,800+ colleges because tests add noise, not signal, and perpetuate socioeconomic inequality.",
      proponent_rebuttal:
        "A 2025 Dartmouth study found SAT/ACT scores predicted first-year college GPA far better than high school grades alone, and that eliminating testing requirements 'hindered the ability to identify high-achieving, low-income students.' The University of California's own 2020 internal study found the SAT was more predictive of college success than GPA across all racial and income groups—yet UC dropped the SAT for political rather than empirical reasons.",
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
        "Tests embed cultural assumptions of the white middle class. Test prep is a $2.6 billion industry that advantages wealthy families. Race-based score gaps persist even after controlling for income. Holistic admissions, portfolio assessment, and mastery-based evaluation are more equitable and better capture actual student potential.",
      proponent_rebuttal:
        "Standardized tests are the most egalitarian tool in admissions: a student from a poor rural school gets the same questions as one from Exeter. GPA is far more variable—an A at one school may equal a C at another. The 80% of colleges that went test-optional saw no improvement in socioeconomic diversity (FairTest data). Without tests, admissions relies more heavily on extracurriculars, essays, and recommendations—advantages that skew even more toward wealthy families.",
      crux: {
        id: "alternative-assessment-comparison",
        title: "Head-to-Head Comparison of Assessment Methods",
        description:
          "Rigorously comparing the predictive validity, equity effects, and scalability of standardized tests vs. portfolios, mastery assessments, and holistic review.",
        methodology:
          "Randomly assign students to admissions tracks using different assessment methods. Compare demographic diversity, academic outcomes, and graduation rates across methods. Account for Goodhart's Law effects (gaming of each metric).",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-institution experimental study)",
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
