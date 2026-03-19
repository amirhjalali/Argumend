import type { Topic } from "@/lib/schemas/topic";

export const collegeValuePropositionData = {
  id: "college-value-proposition",
  title: "The Value of a College Degree",
  meta_claim:
    "A four-year college degree remains the best investment in future earnings and career outcomes for most young adults.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "economic-returns",
      title: "Economic Returns",
      short_summary:
        "The average bachelor's degree holder earns $1.2M more over a lifetime. The average student loan balance is $37K. The math looks simple until you disaggregate by major.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Student debt crisis ($1.77T total), degree inflation, and trade skills shortage suggest the ROI is declining. Average student graduates with $37K in debt. Many graduates are underemployed in jobs that don't require degrees. For-profit colleges and low-value majors drag down the averages.",
      proponent_rebuttal:
        "College graduates still earn $1.2M more over a lifetime than high school graduates. The wage premium (84% higher median earnings) has been stable for decades. Default rates are highest among dropouts, not graduates — the problem is non-completion, not college itself. Even adjusting for debt and opportunity cost, the ROI remains strongly positive for most completers.",
      crux: {
        id: "roi-by-institution-major",
        title: "Disaggregated ROI by Institution and Major",
        description:
          "Calculating the financial return on investment for college degrees broken down by institution type, major, and student demographics to identify where college pays off and where it doesn't.",
        methodology:
          "Use Department of Education College Scorecard data, IRS earnings records, and student loan data to calculate 20-year ROI for every institution-major combination, controlling for student selectivity.",
        equation:
          "ROI = \\frac{\\sum_{t=1}^{20} (E_{degree,t} - E_{no\\_degree,t})}{\\text{Total Cost} + \\text{Opportunity Cost}}",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Analysis of existing federal data)",
      },
      evidence: [
        {
          id: "georgetown-lifetime-earnings",
          title: "Georgetown: College Graduates Earn $1.2M More Over Lifetime",
          description:
            "Georgetown University's Center on Education and the Workforce finds bachelor's degree holders earn $2.8M over a lifetime vs. $1.6M for high school graduates — a $1.2M premium that has grown over time.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Georgetown University CEW",
          reasoning:
            "Well-regarded research center, though aggregated averages obscure wide variance by major and institution.",
        },
        {
          id: "fed-wage-premium",
          title: "Federal Reserve: College Wage Premium Stable at 84%",
          description:
            "The New York Federal Reserve tracks the college wage premium and finds it has remained between 73-84% since 2000. In 2024, median college graduate earns $60K vs. $36K for high school graduates.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Federal Reserve Bank of New York",
          reasoning:
            "Highly credible data; directness somewhat limited by selection bias (those who attend college may differ from those who don't).",
        },
        {
          id: "student-loan-defaults",
          title: "Student Loan Default Rates Highest Among Non-Completers",
          description:
            "Federal data shows 29% of borrowers who attended but didn't complete college default on loans within 12 years, vs. 8% of bachelor's degree completers. For-profit school attendees default at 44%. The debt problem is concentrated, not universal.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "Department of Education, Brookings",
          reasoning:
            "Reframes the debt crisis as a completion crisis; indirectly supports college value for completers.",
        },
        {
          id: "trade-certification-earnings",
          title: "Skilled Trades Offer Competitive Earnings Without Debt",
          description:
            "Licensed electricians, plumbers, and HVAC technicians earn median salaries of $56K-$60K with minimal debt. Union apprenticeship programs pay during training. In high-demand markets, experienced tradespeople earn $80K+.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Bureau of Labor Statistics, National Electrical Contractors Association",
          reasoning:
            "Demonstrates that competitive earnings are achievable through non-degree pathways with far less financial risk.",
        },
      ],
    },
    {
      id: "alternative-pathways",
      title: "Alternative Pathways",
      short_summary:
        "Bootcamp graduates report $20K+ salary jumps in 6 months. But 10-year career trajectories tell a different story.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Tech bootcamps, apprenticeships, and self-directed learning provide faster, cheaper paths to high-paying careers. Coding bootcamps cost $15K and take 12 weeks vs. $100K+ and 4 years for a CS degree. Google, Apple, and IBM have dropped degree requirements. The credential is becoming irrelevant.",
      proponent_rebuttal:
        "Alternative pathways work for a narrow set of fields (primarily software engineering and some tech roles). College provides broad skills, critical thinking, networking, and credentials that transfer across careers. Mid-career pivots are much harder without a degree. Bootcamp placement rates are often inflated, and earnings plateau faster than degree holders.",
      crux: {
        id: "long-term-career-trajectory",
        title: "10-Year Career Trajectory Comparison",
        description:
          "Comparing career earnings, job stability, career mobility, and satisfaction over 10+ years for college graduates vs. bootcamp graduates vs. trade certificate holders.",
        methodology:
          "Longitudinal tracking of cohorts entering workforce through different pathways. Measure earnings, unemployment spells, career changes, job satisfaction, and advancement at 1, 5, and 10 year intervals.",
        equation:
          "\\text{Career Value}_{t} = \\int_{0}^{t} (E(s) + S(s) + M(s)) \\, ds",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (10-year longitudinal cohort study)",
      },
      evidence: [
        {
          id: "bootcamp-placement-rates",
          title: "Bootcamp Placement Rates Are Often Inflated",
          description:
            "CIRR (Council on Integrity in Results Reporting) found that many bootcamps report placement rates of 80-95%, but independent audits show actual full-time employment in field rates of 50-65%. Many 'placements' are contract, part-time, or unrelated roles.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "CIRR, Course Report",
          reasoning:
            "Raises questions about alternatives, though bootcamp quality varies enormously.",
        },
        {
          id: "german-apprenticeship-model",
          title: "Germany's Apprenticeship System Produces Strong Outcomes",
          description:
            "Germany's dual education system (apprenticeship + classroom) serves 50%+ of young adults. Youth unemployment is 5.8% (vs. 7.5% in the US). Apprenticeship graduates report high job satisfaction and stable careers in manufacturing, healthcare, and IT.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source: "OECD, German Federal Institute for Vocational Education",
          reasoning:
            "Compelling international model showing degree is not necessary; replicability in US uncertain but directionally important.",
        },
        {
          id: "no-degree-hiring",
          title: "Google, Apple, IBM Dropped Degree Requirements",
          description:
            "Major tech companies have formally removed bachelor's degree requirements for most positions, signaling that skills and experience can substitute for formal credentials. This trend is spreading to finance, consulting, and government roles.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Harvard Business School, Burning Glass Institute",
          reasoning:
            "Major employers formally devaluing the degree signals structural shift, even if implementation lags.",
        },
        {
          id: "mid-career-earnings-by-education",
          title: "Mid-Career Earnings Gap Widens with Age",
          description:
            "Bureau of Labor Statistics data shows the earnings gap between college and non-college workers widens from ages 25-55. By age 45, bachelor's degree holders earn 2.3x more than high school graduates, up from 1.5x at age 25.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Bureau of Labor Statistics",
          reasoning:
            "Authoritative longitudinal data; directness limited by selection effects and survivor bias.",
        },
      ],
    },
  ],
};
