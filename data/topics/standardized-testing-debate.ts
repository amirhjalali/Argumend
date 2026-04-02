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
          title: "Dartmouth Study: Tests Better Than GPA for Identifying Low-Income Talent",
          description:
            "A 2025 study by Dartmouth College economists found that SAT and ACT scores predicted first-year college GPA significantly better than high school grades, and that eliminating testing requirements had actually hindered the college's ability to identify high-achieving students from low-income backgrounds. Dartmouth reinstated test requirements based on this evidence.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Dartmouth College Office of Institutional Research (2025)",
          reasoning:
            "Highly credible because Dartmouth had adopted test-optional and then reversed course based on their own data. The decision went against the prevailing political winds.",
        },
        {
          id: "princeton-reinstates-tests",
          title: "Princeton Reinstates SAT/ACT Requirement for 2027-28",
          description:
            "In October 2025, Princeton University announced it would require SAT or ACT scores for students applying for the 2027-28 academic year, joining a growing number of elite institutions reinstating testing requirements. Princeton's announcement followed similar reversals by MIT, Georgetown, Dartmouth, Yale, Brown, and Harvard.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Princeton University Admissions Office (2025)",
          reasoning:
            "Institutional behavior is informative—elite schools are reinstating tests despite political pressure to remain test-optional. However, this is a policy decision, not empirical evidence.",
        },
        {
          id: "income-score-correlation",
          title: "SAT Scores Strongly Correlated with Family Income",
          description:
            "Analysis of SAT data consistently shows scores correlate with family income at approximately r=0.42. Students from families earning over $200,000 score an average of 1,200+, while students from families earning under $40,000 average below 1,000. The College Board's own data shows this gap has persisted for decades despite interventions.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source: "Brookings Institution; College Board Research",
          reasoning:
            "The income correlation is undeniable and well-documented. However, correlation does not prove causation—family income correlates with school quality, educational resources, and many other factors that independently affect academic ability.",
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
          title: "UC System Found SAT More Predictive Than GPA for All Groups",
          description:
            "The University of California Academic Senate's 2020 internal study—the largest single-institution analysis ever conducted—found that SAT scores were better predictors of college success than high school GPA across all racial and income groups. The UC system dropped the SAT despite these findings, in a decision widely characterized as political.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "UC Academic Senate Study Group Report (2020)",
          reasoning:
            "Exceptionally credible because the UC system acted against its own findings. The study's conclusions were not disputed—the decision to drop the SAT was justified on grounds other than predictive validity.",
        },
        {
          id: "test-prep-industry-advantage",
          title: "Test Prep Industry: $2.6B Advantage for Wealthy Families",
          description:
            "The test preparation industry generates approximately $2.6 billion annually in the US. High-end tutoring ($200-$500/hour) can boost scores by 100-150 points on the SAT. Students from families earning over $200,000 are 5x more likely to use private test prep than students from families earning under $40,000, creating a structural advantage for wealth.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "IBIS World; National Association for College Admission Counseling",
          reasoning:
            "The test prep advantage is real. However, Khan Academy's free SAT prep has partially democratized access, and the prep advantage is smaller than commonly assumed (typically 30-60 points, not the 100-150 claimed by prep companies).",
        },
      ],
    },
  ],
};
