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
          title: "Georgetown: Bachelor's Degree Holders Earn $1.2M More in Lifetime Median Earnings",
          description:
            "Georgetown University's Center on Education and the Workforce ('The College Payoff,' 2021) finds median lifetime earnings of $2.8M for bachelor's degree holders vs. $1.6M for high school graduates working full-time, full-year — a ~$1.2M (75%) gap. The same report stresses that more education does not always mean more earnings: a large share of high school graduates out-earn the typical worker with more education.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Georgetown University CEW, 'The College Payoff' (2021)",
          sourceUrl: "https://cew.georgetown.edu/cew-reports/collegepayoff2021/",
          reasoning:
            "Well-regarded research center; figures are median lifetime earnings (full-time, full-year), and the same report cautions that aggregated averages obscure wide variance by major and institution.",
        },
        {
          id: "fed-wage-premium",
          title: "NY Fed: College Wage Premium Has Held Steady; ~12.5% Annual Return",
          description:
            "The New York Fed ('Is College Still Worth It?', April 2025) finds the median worker with only a bachelor's degree earned about $80K vs. $47K for the median high school graduate — roughly a 68% earnings gap. The annualized financial return to a degree has held between 12-13% over the past three decades and was 12.5% in 2024. (Recent grads aged 22-27 earned a median of $60K vs. $36K for high school graduates.)",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Federal Reserve Bank of New York, Liberty Street Economics (2025)",
          sourceUrl: "https://libertystreeteconomics.newyorkfed.org/2025/04/is-college-still-worth-it/",
          reasoning:
            "Highly credible data; the ~12.5% figure is an annualized rate of return (not a wage premium percentage), and directness is limited by selection bias (those who attend college may differ from those who don't).",
        },
        {
          id: "student-loan-defaults",
          title: "Student Loan Default Rates Concentrated Among Non-Completers and For-Profit Attendees",
          description:
            "Brookings analysis of federal data finds about 28% of undergraduate borrowers default within 12 years of entry, but defaults are heavily concentrated: those who completed a bachelor's or graduate degree default at roughly 8%, while dropouts and for-profit attendees default at far higher rates (for-profit attendees ~47% in the cohort studied). The debt problem is concentrated, not universal.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Brookings (Looney & Yannelis), using federal data",
          sourceUrl: "https://www.brookings.edu/articles/what-accounts-for-gaps-in-student-loan-default-and-what-happens-after/",
          reasoning:
            "Reframes the debt crisis as a completion/institution-type crisis; indirectly supports college value for completers. Exact non-completer default rate varies by cohort and definition.",
        },
        {
          id: "trade-certification-earnings",
          title: "Skilled Trades Offer Competitive Median Earnings Without Debt",
          description:
            "BLS (May 2024) reports median annual wages of $62,350 for electricians, $62,970 for plumbers/pipefitters/steamfitters, and $59,810 for HVAC mechanics — above the $49,500 median for all workers — typically with minimal debt. Apprenticeship programs pay during training, and top earners in high-demand markets exceed $80K (BLS shows 90th-percentile electrician pay above $100K).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Bureau of Labor Statistics, Occupational Outlook Handbook (May 2024)",
          sourceUrl: "https://www.bls.gov/ooh/construction-and-extraction/electricians.htm",
          reasoning:
            "Demonstrates that competitive median earnings are achievable through non-degree pathways with far less financial risk; trade medians still trail the median bachelor's-degree wage.",
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
          title: "Bootcamp Outcomes Vary Widely and Require Standardized Reporting",
          description:
            "The Council on Integrity in Results Reporting (CIRR) was created to standardize and independently certify coding-bootcamp outcomes precisely because self-reported placement claims were unreliable. CIRR member schools report an average ~80% in-field placement within six months, but outcomes vary enormously by school, and definitions of 'placement' (including part-time or contract roles) differ across non-member providers.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source: "Council on Integrity in Results Reporting (CIRR)",
          sourceUrl: "https://www.cirr.org/",
          reasoning:
            "Raises questions about alternatives; specific 'inflated to 50-65%' audit figures could not be verified, so the claim is stated conservatively. Bootcamp quality varies enormously.",
        },
        {
          id: "german-apprenticeship-model",
          title: "Germany's Apprenticeship System Produces Strong Outcomes",
          description:
            "Germany's dual education system (workplace apprenticeship + vocational school) is the most popular post-school path, with about half of school-leavers entering company-based vocational training. Germany has among Europe's lowest youth unemployment rates (~5.7%), and the employment rate of 25-34 year-olds with intermediate (vocational) qualifications (~88%) exceeds the OECD average (~82%).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source: "OECD, 'Vocational Education and Training in Germany'",
          sourceUrl: "https://www.oecd.org/en/publications/vocational-education-and-training-systems-in-nine-countries_1a86eb6c-en/full-report/vocational-education-and-training-in-germany_dae78944.html",
          reasoning:
            "Compelling international model suggesting a degree is not necessary for strong outcomes; replicability in the US is uncertain and direct US-vs-Germany youth-unemployment comparisons depend on definitions, so stated conservatively.",
        },
        {
          id: "no-degree-hiring",
          title: "Employers Are Dropping Degree Requirements — But Hiring Lags the Rhetoric",
          description:
            "The Burning Glass Institute / Harvard ('The Emerging Degree Reset') found employers removed degree requirements from ~46% of middle-skill and ~31% of high-skill roles (2017-2019), with most resets appearing structural. But the follow-up ('Skills-Based Hiring: The Long Road from Pronouncements to Practice') found actual hiring barely changed — only about a 3.5 percentage-point increase in hires without a BA after a requirement was dropped. The signal is real but implementation badly lags the announcements.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Burning Glass Institute & Harvard Business School (2022, 2024)",
          sourceUrl: "https://www.burningglassinstitute.org/research/the-emerging-degree-reset",
          reasoning:
            "Major employers formally devaluing the degree signals a structural shift, but the same researchers show real hiring of non-degree candidates changed little — so this cuts both ways and the 'credential is irrelevant' framing is not supported.",
        },
        {
          id: "mid-career-earnings-by-education",
          title: "College Wage Premium Widens with Age",
          description:
            "The New York Fed ('Is College Still Worth It?', 2025) shows the college wage premium grows over a career: college-educated workers earn about 27% more than high school graduates at age 25, widening to roughly 60% by age 55, because wages grow faster for degree holders. Across all ages, bachelor's holders' median weekly earnings are about 84% above high school graduates' (BLS, 2025).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Federal Reserve Bank of New York (2025); BLS",
          sourceUrl: "https://libertystreeteconomics.newyorkfed.org/2025/04/is-college-still-worth-it/",
          reasoning:
            "Authoritative cross-sectional data; directness limited by selection effects and survivor bias, and the age-profile reflects cross-sectional snapshots rather than tracked cohorts.",
        },
      ],
    },
  ],
};
