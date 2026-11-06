export const collegeValuePropositionData = {
  id: "college-value-proposition",
  title: "Is College Still Worth It?",
  question: "Is a four-year degree still worth the cost for most students?",
  meta_claim:
    "A four-year degree is still worth its cost for most students who finish it, even though the payoff varies widely by major, school and whether the student graduates.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: NY Fed college labor market data for 2026:Q3
  // (recent graduates unemployed 5.2%, underemployed 42.5%); BLS September
  // 2026 unemployment by education (bachelor's+ 2.5%, high school 4.4%);
  // Brynjolfsson, Chandar and Chen, "Canaries in the Coal Mine?" (revised
  // 12 August 2026).
  last_updated: "2026-11-03",
  aliases: [
    "Is a four-year degree still worth it for most students who finish?",
    "Is college worth the debt?",
    "Should I go to college or learn a trade?",
  ],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In 2024 the median worker with only a bachelor's degree earned about $80,000, against $47,000 for a high school graduate, and the New York Fed put the annual return on a degree at 12.5%, about where it has been for 30 years. The same economists found that for at least a quarter of graduates, college does not appear to pay off. In the third quarter of 2026, 42.5% of recent graduates worked in jobs that do not need a degree. Both sides accept these numbers. The fight is over who a degree still pays for, and whether AI is shrinking the jobs it leads to.",
    confidence: 88,
    source:
      "Abel and Deitz, 'Is College Still Worth It?' and 'When College Might Not Be Worth It', Federal Reserve Bank of New York, Liberty Street Economics (16 April 2025); NY Fed, The Labor Market for Recent College Graduates (2026:Q3)",
    sourceUrl: "https://libertystreeteconomics.newyorkfed.org/2025/04/is-college-still-worth-it/",
  },
  simple_case: [
    "The answer shapes what 18-year-olds borrow, what parents save for, and whether states put money into universities or apprenticeships. Only 22% of Americans told Pew in late 2023 that a four-year degree is worth the cost if it means taking out loans.",
    "The entry-level job market has made the question sharper. In the third quarter of 2026 recent graduates were unemployed at 5.2%, and Stanford economists found employment of 22- to 25-year-olds in the jobs most exposed to AI 19% below where it would otherwise be.",
  ],
  references: [
    {
      title: "Abel and Deitz, 'Is College Still Worth It?', Liberty Street Economics (16 April 2025)",
      url: "https://libertystreeteconomics.newyorkfed.org/2025/04/is-college-still-worth-it/",
    },
    {
      title: "Abel and Deitz, 'When College Might Not Be Worth It', Liberty Street Economics (16 April 2025)",
      url: "https://libertystreeteconomics.newyorkfed.org/2025/04/when-college-might-not-be-worth-it/",
    },
    {
      title: "Federal Reserve Bank of New York, The Labor Market for Recent College Graduates",
      url: "https://www.newyorkfed.org/research/college-labor-market",
    },
    {
      title: "Brynjolfsson, Chandar and Chen, 'Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence' (revised August 2026)",
      url: "https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/",
    },
    {
      title: "Preston Cooper, 'Does College Pay Off? A Comprehensive Return-on-Investment Analysis', FREOPP",
      url: "https://freopp.org/whitepapers/does-college-pay-off-a-comprehensive-return-on-investment-analysis/",
    },
    {
      title: "Smith, Goodman and Hurwitz, 'The Economic Impact of Access to Public Four-Year Colleges', NBER Working Paper 27177",
      url: "https://www.nber.org/papers/w27177",
    },
    {
      title: "Pew Research Center, 'Is College Worth It?' (23 May 2024)",
      url: "https://www.pewresearch.org/social-trends/2024/05/23/is-college-worth-it-2/",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Does a degree pay, and for whom?
    // =========================================================================
    {
      id: "economic-returns",
      title: "Does a Degree Still Pay, and for Whom?",
      short_summary:
        "On average a bachelor's degree still returns about 12.5% a year, a figure that has held for three decades. But returns range from high in engineering and computing to low in fine arts and education, and about 23% of four-year programs leave students worse off. Whether most students' degrees pay once you account for who enrolls, is the first split.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The average return hides a long list of degrees that do not pay. Preston Cooper of FREOPP estimated returns for 53,000 programs and found about 23% of four-year degree programs have a negative return on investment. The New York Fed's own economists conclude that 'for at least a quarter of college graduates, college does not appear to pay off'; at the 25th percentile of graduates the return is about 2.6% a year. Fine arts, liberal arts, hospitality and education earn low returns, and taking six years instead of four cuts the median return to about 7%. The comparison between graduates and non-graduates also flatters college, because the students who go are, on average, the ones who would have earned more anyway. An 18-year-old does not buy the average degree; they buy one program at one school, with a real chance of not finishing.",
      proponent_rebuttal:
        "For most students who finish, college is still one of the best investments they can make. The median worker with only a bachelor's degree earned about $80,000 in 2024, against $47,000 for a high school graduate, and the New York Fed puts the return at 12.5% a year, between 12% and 13% for 30 years. Even quadrupling out-of-pocket costs to $112,000 leaves a return of 9.2%. The effect is not just who enrolls: using Georgia's SAT cut-offs for public four-year colleges, Jonathan Smith, Joshua Goodman and Michael Hurwitz found enrolling raised household income around age 30 by about 17%, and more for students from low-income high schools. The worst outcomes cluster among students who borrow and do not finish: in federal loan data, about 8% of bachelor's completers default within 12 years. The case for college is a case for finishing a sound program, not against the degree.",
      crux: {
        id: "roi-by-institution-major",
        title: "The Program-by-Program Test",
        question:
          "What share of degree programs pay off once you account for who enrolls and how many finish?",
        description:
          "Average returns compare graduates with non-graduates who differ in many ways. The test is the return to each program for comparable students, counting the cost of not finishing.",
        methodology:
          "Link College Scorecard and tax records for every school-and-major program, compare students just above and below admission cut-offs or otherwise similar students who did and did not enrol, and include dropouts and time to degree in each program's return.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Earnings records by school and major from the College Scorecard and state tax data, compared with similar students who were narrowly rejected or admitted but chose not to attend, with dropouts counted in each program's return.",
        },
        cost_to_verify: "$100K (Analysis of existing federal data)",
        falsification: {
          supporter_flip:
            "If program-level returns for comparable students, with dropouts counted, showed most programs at or below zero and the positive average driven by a narrow band of engineering, computing and business degrees, the claim that a degree is worth it for most students would weaken.",
          skeptic_flip:
            "If those returns stayed clearly positive for most programs once students were matched and dropouts counted, as the Georgia cut-off study found for access to four-year colleges, the view that the degree is a poor bet for many would be hard to hold.",
          common_ground:
            "Both sides agree the median bachelor's holder earns far more than the median high school graduate, and that returns vary widely by major, school and whether the student finishes.",
          live_disagreement:
            "What share of programs pay for the students who actually enrol, and whether the average return reflects what college adds or who goes.",
        },
      },
      evidence: [
        {
          id: "fed-wage-premium",
          title: "NY Fed 2025: Median Graduate Earned $80,000 vs $47,000; Return Held at 12% to 13% for 30 Years",
          description:
            "Jaison Abel and Richard Deitz found the median worker with only a bachelor's degree earned about $80,000 in 2024, against $47,000 for the median worker with only a high school diploma. Counting an average net price of about $30,000 and about $150,000 in earnings forgone during four years of study, the return was 12.5% in 2024 and has held between 12% and 13% for three decades. Quadrupling out-of-pocket costs to $112,000 lowers it to 9.2%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Abel and Deitz, 'Is College Still Worth It?', Liberty Street Economics, Federal Reserve Bank of New York (16 April 2025)",
          sourceUrl: "https://libertystreeteconomics.newyorkfed.org/2025/04/is-college-still-worth-it/",
          reasoning:
            "A careful, regularly updated estimate of the median return. It compares typical graduates with typical non-graduates, so part of the gap may reflect who goes to college, and it does not count students who start and do not finish.",
        },
        {
          id: "georgia-access-four-year",
          title: "Smith, Goodman and Hurwitz: Access to a Four-Year College Raised Household Income at 30 by About 17%",
          description:
            "Georgia's public four-year colleges require minimum SAT scores for admission. Comparing students just above and just below those thresholds, the authors estimate that enrolling in a public four-year institution boosts household income around age 30 by about 17%, with even larger effects for students from low-income high schools.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Smith, Goodman and Hurwitz, 'The Economic Impact of Access to Public Four-Year Colleges', NBER Working Paper 27177 (2020, revised December 2024)",
          sourceUrl: "https://www.nber.org/papers/w27177",
          reasoning:
            "A design that separates the effect of college from who enrols, for students at the margin of admission. It covers one state's public colleges, and students near the cut-off are not the same as all students.",
        },
        {
          id: "student-loan-defaults",
          title: "Brookings: About 8% of Bachelor's Completers Default Within 12 Years, Far Fewer Than Dropouts and For-Profit Students",
          description:
            "Analysis of federal data finds about 28% of undergraduate borrowers default within 12 years of entering college, but defaults are concentrated: borrowers who completed a bachelor's or graduate degree default at about 8%, while dropouts and for-profit students default at far higher rates (about 47% for for-profit attendees in the cohort studied).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Brookings (Looney and Yannelis), using federal student loan data",
          sourceUrl: "https://www.brookings.edu/articles/what-accounts-for-gaps-in-student-loan-default-and-what-happens-after/",
          reasoning:
            "Shows where debt goes bad: among students who do not finish or who attend for-profit schools. It supports the case for finishing a degree, and is also a warning about the risk of starting one.",
        },
        {
          id: "nyfed-quarter-not-worth-it",
          title: "NY Fed 2025: For at Least a Quarter of Graduates, College 'Does Not Appear to Pay Off'",
          description:
            "In a companion analysis, Abel and Deitz estimate a return of about 2.6% in 2024 for graduates at the 25th percentile of earnings, which they call 'a questionable investment for this group,' and conclude that 'for at least a quarter of college graduates, college does not appear to pay off.' Engineering, math and computers, and business and economics earn the highest returns; fine arts, liberal arts, leisure and hospitality, and especially education, earn low returns. Taking five years to finish cuts the median return to about 9%, and six years to about 7%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Abel and Deitz, 'When College Might Not Be Worth It', Liberty Street Economics, Federal Reserve Bank of New York (16 April 2025)",
          sourceUrl: "https://libertystreeteconomics.newyorkfed.org/2025/04/when-college-might-not-be-worth-it/",
          reasoning:
            "The same economists who report the 12.5% average show how many graduates fall well short of it. Low earnings for teachers partly reflect a nine-month school year, and the analysis does not cover students who drop out.",
        },
        {
          id: "freopp-negative-roi-programs",
          title: "FREOPP: About 23% of Four-Year Degree Programs Have a Negative Return on Investment",
          description:
            "Preston Cooper estimated the return on investment for 53,000 degree and certificate programs. About 23% of four-year degree programs had a negative return; bachelor's programs had a median return of $160,000, and about 70% of all undergraduate programs yielded a positive return.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Preston Cooper, 'Does College Pay Off? A Comprehensive Return-on-Investment Analysis', Foundation for Research on Equal Opportunity",
          sourceUrl: "https://freopp.org/whitepapers/does-college-pay-off-a-comprehensive-return-on-investment-analysis/",
          reasoning:
            "The most detailed program-by-program estimate. FREOPP is a right-leaning think tank, and any estimate like this rests on assumptions about what students would have earned without the degree.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Is the entry-level market breaking the deal?
    // =========================================================================
    {
      id: "entry-level-squeeze",
      title: "Is AI Squeezing the Jobs New Graduates Start In?",
      short_summary:
        "In September 2026 workers with a bachelor's degree were unemployed at 2.5%, against 4.4% for high school graduates. But recent graduates were unemployed at 5.2% and 42.5% worked in jobs that do not need a degree. Employment of 22- to 25-year-olds in AI-exposed jobs is 19% below trend. Whether this is a passing slump or a lasting change in what a degree leads to is the second split.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The first rung of the graduate career ladder is weakening, and AI may be the reason. In the third quarter of 2026 the unemployment rate for recent college graduates was 5.2% and their underemployment rate rose to 42.5%: more than four in ten worked in jobs that do not require a degree. Using payroll data covering millions of workers, Erik Brynjolfsson, Bharat Chandar and Ruyu Chen found employment of workers aged 22 to 25 in AI-exposed occupations 19% below where it would be had it kept pace with less-exposed peers, while experienced workers showed no comparable gap. Underemployment sticks: the Burning Glass Institute found 45% of graduates still hold jobs that do not need their degree ten years on. The 12.5% average return looks backward, at careers built before these tools existed.",
      proponent_rebuttal:
        "Graduates still do far better than people without degrees, in good times and bad. In September 2026 the unemployment rate for workers aged 25 and over with a bachelor's degree or more was 2.5%, against 4.4% for high school graduates and 3.6% for those with some college. The return to a degree held between 12% and 13% for three decades, a span that took in the dot-com bust, the 2008 crisis and the pandemic. The AI study finds the strongest declines where AI substitutes for workers, and flat or rising employment where it complements them, especially for experienced workers, which is where graduates end up. If machines take routine entry-level work, judgement and the ability to learn new tools become worth more, not less.",
      crux: {
        id: "entry-level-ai-squeeze",
        title: "The First-Rung Test",
        question:
          "Is the weak market for new graduates a temporary slump, or is AI lastingly cutting the jobs a degree leads to?",
        description:
          "Recent graduates have done worse than all graduates in past slumps and then caught up. The test is whether the 2022-26 cohorts catch up in earnings and degree-level jobs by their late twenties, or stay behind in the occupations AI is changing.",
        methodology:
          "Follow the earnings and occupations of graduates from the 2022-26 cohorts through their late twenties in payroll and tax data, comparing AI-exposed and less-exposed fields, and set their path against the cohorts who graduated into the 2001 and 2008 downturns.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Payroll and tax records for the 2022-26 graduating classes through age 30, comparing earnings and degree-level employment in AI-exposed and less-exposed fields with the classes that graduated into the 2001 and 2008 recessions.",
        },
        cost_to_verify: "$500K (Payroll and tax data analysis over five years)",
        falsification: {
          supporter_flip:
            "If the 2022-26 graduating classes stayed behind earlier cohorts in earnings and degree-level jobs through age 30, with the gap concentrated in AI-exposed fields, the case that a degree remains worth its cost for most students would weaken.",
          skeptic_flip:
            "If those classes caught up by their late twenties, as earlier cohorts did after the 2001 and 2008 downturns, the view that AI is breaking the graduate career ladder would be hard to hold.",
          common_ground:
            "Both sides agree workers with a bachelor's degree had lower unemployment than high school graduates in 2026, and that recent graduates faced a weak entry-level market.",
          live_disagreement:
            "Whether the squeeze on young graduates is a slump they will recover from or a lasting cut in the jobs a degree opens, and how fast that changes the return for students enrolling now.",
        },
      },
      evidence: [
        {
          id: "bls-unemployment-by-education-2026",
          title: "BLS, September 2026: 2.5% Unemployment for Bachelor's Holders vs 4.4% for High School Graduates",
          description:
            "Seasonally adjusted unemployment rates for people aged 25 and over in September 2026 were 2.5% for those with a bachelor's degree or higher, 3.6% with some college or an associate degree, 4.4% for high school graduates with no college, and 4.3% for those without a high school diploma.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 5,
          },
          source: "Bureau of Labor Statistics, Employment Situation, table A-4 (September 2026)",
          sourceUrl: "https://www.bls.gov/news.release/empsit.t04.htm",
          reasoning:
            "Official monthly data show graduates are still the least likely to be out of work. The figures cover all ages over 25, so they mostly describe people who graduated years ago, and lower unemployment is not the same as a return on cost.",
        },
        {
          id: "nyfed-recent-grads-2026q3",
          title: "NY Fed 2026:Q3: Recent Graduates 5.2% Unemployed, 42.5% Underemployed",
          description:
            "The New York Fed's tracker of recent college graduates put their unemployment rate at 5.2% in the third quarter of 2026, its lowest in more than a year, while their underemployment rate, the share working in jobs that do not typically require a degree, ticked up to 42.5%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Federal Reserve Bank of New York, The Labor Market for Recent College Graduates (2026:Q3 update)",
          sourceUrl: "https://www.newyorkfed.org/research/college-labor-market",
          reasoning:
            "The most current official read on new graduates. Underemployment among recent graduates has long been high and usually falls as they age, so one quarter shows the squeeze, not whether it lasts.",
        },
        {
          id: "stanford-canaries-ai-young-workers",
          title: "Stanford 2026: Employment of 22- to 25-Year-Olds in AI-Exposed Jobs 19% Below Trend",
          description:
            "Using high-frequency payroll data from ADP covering millions of US workers, Erik Brynjolfsson, Bharat Chandar and Ruyu Chen found employment of young workers aged 22 to 25 in AI-exposed occupations 'now stands 19% below where it would be had it kept pace with that of their less-exposed peers'; experienced workers show no comparable gap. Where AI mainly complements workers, employment is flat or rising, especially for experienced workers.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Brynjolfsson, Chandar and Chen, 'Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence', Stanford Digital Economy Lab (2025, revised 12 August 2026)",
          sourceUrl: "https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/",
          reasoning:
            "The strongest early evidence that AI is hitting entry-level work, the jobs graduates start in. It is a working paper using one payroll provider's clients, and it measures jobs, not the earnings return to a degree.",
        },
        {
          id: "burning-glass-underemployment",
          title: "Burning Glass 2025: 45% of Graduates Still in Jobs That Don't Need Their Degree After 10 Years",
          description:
            "The Burning Glass Institute found only about half of bachelor's graduates secure a college-level job within a year of graduating, and 45% of graduates hold jobs that do not need their degree ten years later.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Hanson, Salerno, Sigelman, de Zeeuw and Moret, 'Talent Disrupted: College Graduates, Underemployment, and the Way Forward', Burning Glass Institute (July 2025)",
          sourceUrl: "https://www.burningglassinstitute.org/research/underemployment",
          reasoning:
            "Shows that a weak first job tends to last. Which jobs 'need' a degree is a judgement built into the data, and underemployed graduates can still earn more than they would have without the degree.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Are there better routes?
    // =========================================================================
    {
      id: "alternative-pathways",
      title: "Are Trades and Other Routes a Better Bet?",
      short_summary:
        "Electricians and plumbers earn medians above $62,000 without four years of tuition. Employers dropped degree requirements from many jobs, but their hiring barely changed. Whether trades, apprenticeships and bootcamps can match a degree over a whole career, not just the first job, is the third split.",
      icon_name: "Target" as const,
      skeptic_premise:
        "For many students a trade or apprenticeship is the better bet. In May 2024 the median electrician earned $62,350 and the median plumber $62,970, above the $49,500 median for all workers, and apprentices are paid while they train instead of borrowing. Germany puts about half of its school-leavers into paid, company-based training and has one of Europe's lowest youth unemployment rates. Employers removed degree requirements from about 46% of middle-skill and 31% of high-skill job postings between 2017 and 2019. A degree with a quarter chance of not paying off, against a trade with a steady wage and no debt, is not an obvious choice for a student unsure about school.",
      proponent_rebuttal:
        "The alternatives look best at the start of a career and in a few fields. When employers dropped degree requirements, the Burning Glass Institute and Harvard Business School found hiring of workers without degrees rose only about 3.5 percentage points; most companies kept hiring graduates. Trade medians still trail the $80,000 median for bachelor's holders, and physical jobs are hard to do at 60. Coding bootcamps created their own outcomes standard because earlier placement claims were unreliable, and even certified results cover six months, not a career. Only 25% of Americans told Pew a degree is extremely or very important for a well-paying job, yet employers' behaviour says otherwise. The degree remains the most transferable credential when a whole industry changes.",
      crux: {
        id: "long-term-career-trajectory",
        title: "The Whole-Career Test",
        question:
          "Do trades, apprenticeships and bootcamps match a degree's earnings and mobility over a whole career?",
        description:
          "Many alternatives match or beat a degree in the first years. The test is earnings, job security and mobility at 35, 45 and 55 for similar people who took different routes.",
        methodology:
          "Follow matched cohorts from bachelor's programs, registered apprenticeships, trade programs and bootcamps for 20 years or more using tax and unemployment insurance records, comparing earnings, job loss in recessions and moves into management.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Tax and unemployment-insurance records following matched people from degrees, apprenticeships, trade programs and bootcamps for ten years or more, comparing earnings, promotions and job loss in recessions.",
        },
        cost_to_verify: "$5M (Long-run linked cohort study)",
        falsification: {
          supporter_flip:
            "If matched apprentices and trade workers kept pace with similar degree holders in earnings and job security into their 40s and 50s across many fields, the claim that a degree is worth its cost for most students would weaken.",
          skeptic_flip:
            "If similar people who took trade and bootcamp routes fell steadily behind degree holders after their first decade, the view that alternatives are as good a bet would be hard to hold.",
          common_ground:
            "Both sides agree skilled trades such as electrical work and plumbing pay medians above the all-worker median without four years of tuition, and that long-run records for non-degree routes are thin.",
          live_disagreement:
            "Whether alternatives match a degree over a whole career, not just at the start, and whether employers' hiring will follow their announcements about skills over degrees.",
        },
      },
      evidence: [
        {
          id: "no-degree-hiring",
          title: "Burning Glass and Harvard: Employers Dropped Degree Requirements, but Non-Degree Hiring Rose Only About 3.5 Points",
          description:
            "The Burning Glass Institute and Harvard Business School found employers removed degree requirements from about 46% of middle-skill and 31% of high-skill postings between 2017 and 2019. A 2024 follow-up, 'Skills-Based Hiring: The Long Road from Pronouncements to Practice', found that after a requirement was dropped, the share of hires without a bachelor's degree rose by only about 3.5 percentage points.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Burning Glass Institute and Harvard Business School, 'The Emerging Degree Reset' (2022) and 'Skills-Based Hiring' (February 2024)",
          sourceUrl: "https://www.burningglassinstitute.org/research/the-emerging-degree-reset",
          reasoning:
            "Shows employers still prefer graduates in practice, whatever their job ads say. Hiring could shift over a longer period than the study covers.",
        },
        {
          id: "trade-certification-earnings",
          title: "BLS May 2024: Median Electrician Earned $62,350 and Plumber $62,970, Above the $49,500 All-Worker Median",
          description:
            "BLS reports median annual wages of $62,350 for electricians, $62,970 for plumbers, pipefitters and steamfitters, and $59,810 for HVAC mechanics in May 2024, above the $49,500 median for all workers. Apprentices are paid during training, and the top 10% of electricians earn more than $100,000.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Bureau of Labor Statistics, Occupational Outlook Handbook (May 2024 wage data)",
          sourceUrl: "https://www.bls.gov/ooh/construction-and-extraction/electricians.htm",
          reasoning:
            "Official wage data show a solid living without a degree and without tuition debt. Trade medians still trail the median bachelor's wage, and the figures do not show how earnings hold up over a long physical career.",
        },
        {
          id: "german-apprenticeship-model",
          title: "OECD: About Half of German School-Leavers Enter Paid Company Training",
          description:
            "Germany's dual system of workplace apprenticeship and vocational school is its most popular route after school, with about half of school-leavers entering company-based training. Germany has among Europe's lowest youth unemployment rates, and adults aged 25 to 34 with vocational qualifications have employment rates above the OECD average.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 5,
          },
          source: "OECD, 'Vocational Education and Training in Germany'",
          sourceUrl: "https://www.oecd.org/en/publications/vocational-education-and-training-systems-in-nine-countries_1a86eb6c-en/full-report/vocational-education-and-training-in-germany_dae78944.html",
          reasoning:
            "A working model of a non-degree route at national scale. It rests on employer networks and institutions the US lacks, so it shows what is possible rather than what an American student can choose today.",
        },
        {
          id: "bootcamp-placement-rates",
          title: "CIRR: Coding Bootcamps Built Their Own Audited Outcomes Standard Because Earlier Claims Were Unreliable",
          description:
            "The Council on Integrity in Results Reporting was created to standardise and certify coding-bootcamp outcomes after self-reported placement claims proved unreliable. Member schools report in-field placement within six months, but results vary widely by school, and providers outside the council define 'placement' in different ways, sometimes including part-time or contract work.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 4,
          },
          source: "Council on Integrity in Results Reporting (CIRR)",
          sourceUrl: "https://www.cirr.org/",
          reasoning:
            "A caution about the best-advertised shortcut to a tech career. It shows how hard bootcamp results are to compare, not that bootcamps fail; and it covers six months, not a career.",
        },
      ],
    },
  ],
};
