import type { Topic } from "@/lib/schemas/topic";

export const collegeValuePropositionData = {
  id: "college-value-proposition",
  title: "The Value of a College Degree",
  meta_claim:
    "For most students who complete it, a four-year degree still earns a strong financial return — but the payoff varies enormously by major, institution, and completion, so it is no longer a safe bet for everyone.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The median bachelor's holder earns about $1.2 million more over a lifetime than a high-school graduate (Georgetown), and the degree's annualized return has held near 12.5% for three decades (NY Fed) — yet the \"average\" hides enormous variance: roughly 31% of workers with only a high-school diploma out-earn the typical associate-degree holder, and more than 40% of recent graduates start out underemployed (in jobs that never required a degree). The degree still pays for most who finish, but it is a bet whose odds swing on major, institution, and completion.",
    confidence: 86,
    source:
      "Georgetown CEW, 'The College Payoff' (2021); Federal Reserve Bank of New York, 'Is College Still Worth It?' (2025) & 'The Labor Market for Recent College Graduates'",
    sourceUrl: "https://libertystreeteconomics.newyorkfed.org/2025/04/is-college-still-worth-it/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "For students who finish, the four-year degree is still one of the best financial bets available: Georgetown puts median lifetime earnings at $2.8M for bachelor's holders versus $1.6M for high-school graduates (a ~75% gap), and the NY Fed estimates an annualized return of about 12.5% that has held between 12-13% for thirty years — with the wage premium widening as workers age.",
    "But the average tells an individual almost nothing about their own bet: roughly 31% of high-school-only workers out-earn the typical associate-degree holder, more than 40% of recent graduates begin underemployed, and the heaviest student-debt distress is concentrated among non-completers and for-profit attendees — so for the wrong major at the wrong price, or for someone who doesn't graduate, the math can turn sharply negative.",
    "So the honest debate isn't whether college pays off on average (for completers it clearly does) but whether it pays off for this student, in this major, at this price — a question the aggregate figures can't answer and that turns on disaggregated, major-and-institution-level ROI.",
  ],
  pillars: [
    {
      id: "economic-returns",
      title: "Economic Returns",
      short_summary:
        "The median bachelor's holder earns roughly $1.2M more over a lifetime (Georgetown), and the NY Fed still estimates a ~12.5% annual return. The average graduate carries about $37K in debt. The aggregate math looks favorable — until you disaggregate by major, institution, and completion.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The headline averages hide enormous variance. Roughly $1.77T in outstanding student debt, sticker prices that have outpaced inflation for decades, and persistent underemployment (many graduates in jobs that never required a degree) suggest the return is real but far from guaranteed. The typical graduate leaves with about $37K in debt, and Georgetown's own data show at least a quarter of high-school graduates out-earn the typical associate-degree holder — so 'the average degree pays off' tells an individual student almost nothing about their own bet, which turns on major, institution, and whether they finish at all.",
      proponent_rebuttal:
        "For completers, the return is still strong. Georgetown puts median lifetime earnings at $2.8M for bachelor's holders vs. $1.6M for high-school graduates (a ~75% gap), and the NY Fed estimates a roughly 12.5% annualized rate of return — a figure that has held between 12-13% for three decades. The current college wage premium is about 68% in annual earnings (NY Fed: ~$80K vs. ~$47K), and BLS weekly-earnings data show bachelor's holders earning roughly two-thirds more (about $1,533 vs. $946 in 2024). Crucially, defaults concentrate among non-completers and for-profit attendees, not degree-holders — so most of the visible distress reflects a completion and institution-quality problem, not the value of finishing a degree.",
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
        falsification: {
          supporter_flip:
            "If College Scorecard and IRS earnings data showed that, once you control for student selectivity (the kind of student who enrolls), most institution-major combinations produced near-zero or negative 20-year ROI — and the positive aggregate was driven by a narrow band of elite programs — then 'the degree pays off' would collapse into 'a few degrees pay off, most don't.'",
          skeptic_flip:
            "A skeptic pointing to debt and underemployment should weigh that defaults concentrate among non-completers and for-profit attendees (bachelor's completers default at ~8% vs. for-profit attendees near ~47%), that the wage premium widens with age rather than fading, and that median bachelor's wages still run roughly two-thirds above high-school wages — so the visible distress is largely a completion-and-institution problem, not proof the credential lacks value.",
          common_ground:
            "Both sides agree the return varies enormously by major, institution, and whether the student graduates, and that the headline lifetime-earnings averages obscure that variance.",
          live_disagreement:
            "What share of institution-major combinations actually clear a positive risk-adjusted ROI once selection bias is removed — which only a selectivity-controlled, Scorecard-plus-earnings analysis of every program can settle.",
        },
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
            "The New York Fed ('Is College Still Worth It?', April 2025) finds the median worker with only a bachelor's degree earned about $80K vs. $47K for the median high school graduate — a premium of over $32K per year, or roughly 68%, near its all-time high. Critically, this is the wage gap, not the rate of return: the same analysis estimates the annualized financial return to a degree at 12.5%, a figure that has held between 12-13% over the past three decades.",
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
        "CIRR-member bootcamps report ~80% in-field placement within six months, and employers have dropped degree requirements from many roles. But hiring has barely followed the rhetoric, and 10-year trajectories for non-degree paths remain thinly documented.",
      icon_name: "Target" as const,
      skeptic_premise:
        "For some fields, faster and cheaper paths now exist. A coding bootcamp can cost ~$15K over 12 weeks against $100K+ and four years for a CS degree, and CIRR-member bootcamps report ~80% in-field placement within six months. Apprenticeship systems like Germany's place roughly half of school-leavers into paid, employer-based training with strong employment outcomes. Major employers (Google, Apple, IBM) have publicly dropped degree requirements for many roles. The signal that a four-year degree is the only credible on-ramp is weakening.",
      proponent_rebuttal:
        "The 'degree is becoming irrelevant' claim runs well ahead of the evidence. When employers removed degree requirements, actual hiring of non-degree candidates rose only about 3.5 percentage points (Burning Glass / Harvard) — the announcements far outpaced practice. Alternative pathways are concentrated in a narrow band of mostly software and skilled-trade roles; bootcamp placement is self-reported (CIRR exists precisely because earlier numbers were unreliable) and definitions of 'placement' vary. Beyond first-job outcomes, the degree still tends to compound: the NY Fed finds the wage premium widens with age, and mid-career pivots remain harder without a transferable credential.",
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
        falsification: {
          supporter_flip:
            "If a longitudinal cohort study tracked bootcamp and trade-certificate entrants for 10+ years and found their earnings, employment stability, and mobility kept pace with — or beat — comparable degree holders across more than a narrow set of software and skilled-trade roles, then the claim that the degree is the only durable on-ramp would fail.",
          skeptic_flip:
            "A skeptic championing alternatives should weigh that when employers dropped degree requirements, actual hiring of non-degree candidates rose only ~3.5 percentage points (Burning Glass/Harvard), that bootcamp placement is self-reported with inconsistent definitions, and that the college wage premium widens with age (roughly 27% at 25 to ~60% by 55) — so first-job parity may not survive into mid-career.",
          common_ground:
            "Both sides agree that for some specific fields (software, skilled trades) faster, cheaper non-degree paths now produce strong early outcomes, and that 10-year trajectories for those paths are thinly documented.",
          live_disagreement:
            "Whether alternative pathways match the degree's compounding mid-career earnings and mobility beyond the first job — which only a 10-year longitudinal comparison of matched cohorts can resolve.",
        },
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
            "The college wage premium grows over a career. An NBER/Harvard analysis ('Why Do Wages Grow Faster for Educated Workers?') finds college-educated workers earn about 27% more than high school graduates at age 25, widening to roughly 60% by age 55, as degree holders sort into occupations with steeper wage growth — a pattern the NY Fed ('Is College Still Worth It?', 2025) also notes when it observes the premium 'tends to grow over one's career.' Across all ages, BLS (2024) reports median weekly earnings of about $1,533 for bachelor's holders vs. $946 for high school graduates — roughly two-thirds higher.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "NBER/Harvard ('Why Do Wages Grow Faster for Educated Workers?'); NY Fed (2025); BLS (2024)",
          sourceUrl: "https://libertystreeteconomics.newyorkfed.org/2025/04/is-college-still-worth-it/",
          reasoning:
            "The 27%-to-60% age profile is from the NBER/Harvard study, not the NY Fed (which only notes the premium grows with age); directness is limited by selection effects and survivor bias, and the age-profile reflects cross-sectional snapshots rather than tracked cohorts.",
        },
      ],
    },
  ],
};
