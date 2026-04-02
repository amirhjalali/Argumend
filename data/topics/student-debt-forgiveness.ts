import type { Topic } from "@/lib/schemas/topic";

export const studentDebtForgivenessData = {
  id: "student-debt-forgiveness",
  title: "Student Debt Forgiveness",
  meta_claim:
    "Broad student loan forgiveness is justified, economically beneficial, and the fairest approach to addressing the student debt crisis.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Economic Stimulus & Macroeconomic Effects
    // =========================================================================
    {
      id: "economic-stimulus",
      title: "Economic Stimulus & Macroeconomic Effects",
      short_summary:
        "Proponents argue that canceling $1.77 trillion in student debt would unlock massive consumer spending and economic growth. Critics counter that forgiveness is an inefficient stimulus that adds to the national debt and disproportionately benefits higher earners.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Student debt forgiveness is one of the least efficient forms of economic stimulus. The Committee for a Responsible Federal Budget estimated that Biden's original $400 billion forgiveness plan would add 0.1-0.3 percentage points to inflation by increasing consumer spending without increasing productive capacity. Unlike targeted stimulus payments to low-income households (which are spent quickly on goods and services), forgiveness disproportionately benefits graduate degree holders — who owe 56% of all student debt and have the highest lifetime earnings. A 2020 Brookings Institution analysis found that the top 40% of income earners hold nearly 60% of student debt. Full cancellation would cost $1.77 trillion — added directly to the national debt at a time when debt-to-GDP already exceeds 120%. That money could fund universal pre-K, community college, or targeted relief for genuinely distressed borrowers at a fraction of the cost.",
      proponent_rebuttal:
        "Student debt is crushing an entire generation's economic participation. The Federal Reserve has documented that student debt holders have lower homeownership rates, delay marriage and children, start fewer businesses, and save less for retirement than prior generations. The Roosevelt Institute estimated that canceling $50,000 per borrower would boost GDP by $86-108 billion annually and create 1.2-1.5 million jobs over the first few years. Unlike tax cuts for the wealthy (which are saved), debt relief for middle-class borrowers is spent on housing, cars, small businesses, and local economies. The 'regressive' argument is misleading: while graduate degree holders owe more in absolute terms, the borrowers most harmed are those who attended but did not complete college — disproportionately Black and Latino students who carry debt without the credential that would help them repay it. The median student loan balance is $29,400, not the $150,000 graduate school figure critics highlight.",
      crux: {
        id: "fiscal-multiplier-analysis",
        title: "The Fiscal Multiplier Comparison Test",
        description:
          "If student debt forgiveness has a high fiscal multiplier — generating significantly more economic activity per dollar than the cost to the treasury — it is an effective stimulus. If the multiplier is low compared to alternatives (infrastructure spending, targeted transfers, tax credits), the same money would be better spent elsewhere regardless of the moral arguments.",
        methodology:
          "Use the Federal Reserve's FRB/US macroeconomic model to simulate the GDP impact of $1 trillion in student debt forgiveness versus $1 trillion allocated to: (1) direct cash transfers to households earning under $75,000, (2) infrastructure spending, (3) universal pre-K funding, and (4) targeted forgiveness for borrowers earning under $50,000 only. Measure GDP multiplier, job creation, inflation impact, and distributional effects across income quintiles over a 10-year horizon.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Macroeconomic modeling requiring Federal Reserve FRB/US access or equivalent)",
      },
      evidence: [
        {
          id: "total-student-debt-1-77-trillion",
          title: "US Student Loan Debt Reaches $1.77 Trillion Across 43 Million Borrowers",
          description:
            "As of early 2025, federal student loan debt stood at approximately $1.77 trillion held by 43.2 million borrowers, according to the Federal Reserve and Department of Education. The average balance is approximately $37,850. Student debt has grown 3x since 2006, vastly outpacing inflation and wage growth. It is now the second-largest category of consumer debt after mortgages, exceeding both auto loans and credit card debt. Approximately 7 million borrowers are in default, and another 12 million are in forbearance or deferment.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "Federal Reserve; Department of Education Federal Student Aid",
          sourceUrl: "https://studentaid.gov/data-center/student/portfolio",
          reasoning:
            "Federal Reserve and Department of Education data are the authoritative sources for student loan statistics. The scale of the debt is undisputed. However, directness is lower because the existence of large aggregate debt does not by itself prove that forgiveness is the best remedy — repayment plans, income-driven repayment, or targeted relief could also address the problem.",
        },
        {
          id: "roosevelt-gdp-boost",
          title: "Roosevelt Institute: $50K Forgiveness Could Boost GDP by $86-108 Billion Annually",
          description:
            "A 2018 Levy Economics Institute study (updated by the Roosevelt Institute) modeled the macroeconomic effects of student debt cancellation. The analysis found that canceling $50,000 per borrower would increase GDP by $86-108 billion per year for the first several years, create 1.2-1.5 million new jobs, and reduce the unemployment rate by 0.22-0.36 percentage points. The model assumes freed-up monthly payments would be redirected to consumer spending, housing, and small business investment.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "Levy Economics Institute; Roosevelt Institute",
          sourceUrl: "http://www.levyinstitute.org/pubs/rr_18_1.pdf",
          reasoning:
            "The Levy Institute is a respected economic research center, but the Roosevelt Institute has a progressive policy orientation, lowering independence. The model's assumptions about how borrowers would redirect payments are plausible but unverified — replicability is lower because other models (Penn Wharton, CRFB) produced different estimates. The study does not account for the fiscal cost or inflationary effects of adding $1 trillion+ to the national debt.",
        },
        {
          id: "crfb-regressive-distribution",
          title: "CRFB: Top 40% of Earners Hold Nearly 60% of Student Debt",
          description:
            "The Committee for a Responsible Federal Budget and Brookings Institution analyses show that student debt is concentrated among higher-income households. Borrowers with graduate degrees hold 56% of all student debt. The top income quintile holds more student debt than the bottom two quintiles combined. A 2020 Brookings analysis by Adam Looney found that blanket forgiveness of $50,000 would provide the largest absolute benefits to high-earning professionals (doctors, lawyers, MBAs) while providing smaller benefits to the most financially distressed borrowers who typically owe less but are more likely to default.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Committee for a Responsible Federal Budget; Brookings Institution",
          sourceUrl: "https://www.brookings.edu/articles/student-loan-forgiveness-is-regressive-whether-measured-by-income-education-or-wealth/",
          reasoning:
            "CRFB and Brookings are centrist, nonpartisan policy institutions with high credibility. The distributional data is based on Federal Reserve Survey of Consumer Finances microdata and is independently verifiable. This directly challenges the claim that broad forgiveness is the 'fairest' approach by showing it disproportionately benefits higher earners. However, proponents counter that the analysis ignores debt-to-income ratios and wealth (as opposed to income).",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Fairness & Moral Hazard
    // =========================================================================
    {
      id: "fairness-moral-hazard",
      title: "Fairness & Moral Hazard",
      short_summary:
        "The fairness debate asks whether forgiveness rewards irresponsible borrowing, unfairly penalizes those who already repaid or chose not to attend college, or corrects a systemic injustice imposed on a generation that was told college was the only path to the middle class.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Student debt forgiveness creates severe moral hazard and fundamental unfairness. An electrician who chose trade school to avoid debt now pays taxes to forgive the loans of a law school graduate earning $150,000. A family that scrimped and sacrificed to pay off their loans receives nothing. Future students will rationally borrow more if they expect forgiveness, driving tuition even higher. Universities have no incentive to control costs if the government absorbs the consequences. The Penn Wharton Budget Model estimated Biden's original forgiveness plan would cost $300-$600 billion over 10 years. That money comes from all taxpayers — two-thirds of whom do not hold bachelor's degrees — to benefit the one-third who do. If the goal is to help struggling borrowers, income-driven repayment plans already cap payments at 5-10% of discretionary income and forgive remaining balances after 20-25 years.",
      proponent_rebuttal:
        "The moral hazard argument assumes borrowers made free, informed choices in a fair market. In reality, 17- and 18-year-olds were told by every authority figure — parents, teachers, guidance counselors, government policy — that college was the only path to a middle-class life. They signed complex loan documents they did not understand, with interest rates set by Congress, for tuition that had risen 1,200% since 1980 while wages stagnated. Student loans are the only consumer debt that cannot be discharged in bankruptcy — a unique penalty Congress imposed in 1998 and strengthened in 2005. We forgive PPP loans for businesses ($800+ billion), bail out banks ($700 billion in TARP), subsidize corporations through tax breaks, and forgive medical debt through bankruptcy — but student borrowers are uniquely told they must suffer the consequences of decisions made as teenagers. The real moral hazard was a system that allowed universities to raise tuition without limit because guaranteed federal loans meant students would always pay.",
      crux: {
        id: "comparative-fairness-analysis",
        title: "The Comparative Government Forgiveness Assessment",
        description:
          "If the government routinely forgives or absorbs debt for other constituencies (businesses, banks, farmers, homeowners) without comparable 'moral hazard' objections, the selective application of moral hazard arguments to student borrowers reflects inconsistency rather than principle. If student debt forgiveness is genuinely unique in creating moral hazard, the objection has merit.",
        methodology:
          "Compile a comprehensive list of federal debt forgiveness, bailout, and subsidy programs over the past 25 years: PPP loan forgiveness, TARP bank bailouts, farm subsidies, corporate tax expenditures, mortgage interest deductions, and disaster relief. For each, calculate: (1) total cost to taxpayers, (2) income distribution of beneficiaries, (3) whether moral hazard objections were raised, and (4) whether the forgiveness created subsequent moral hazard (e.g., did PPP loan forgiveness cause businesses to take riskier loans?). Compare with the proposed student debt forgiveness on all four metrics.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (Federal budget data, CBO scores, and program data are publicly available)",
      },
      evidence: [
        {
          id: "ppp-loan-forgiveness-comparison",
          title: "PPP Loans: $800+ Billion Forgiven for Businesses with Minimal Moral Hazard Objection",
          description:
            "The Paycheck Protection Program (PPP), created in 2020, disbursed $800+ billion in forgivable loans to businesses during COVID-19. The SBA forgave over 93% of PPP loans, including loans to large corporations, hedge funds, and businesses that did not retain employees as intended. A 2022 Federal Reserve study estimated that $64-117 billion in PPP funds were obtained fraudulently. Despite this, moral hazard objections to PPP forgiveness were muted compared to the student debt debate. Critics of student debt forgiveness rarely acknowledged that the government had just forgiven nearly $800 billion in business loans with far less scrutiny of individual merit.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Small Business Administration; Federal Reserve; Congressional Research Service",
          sourceUrl: "https://www.sba.gov/funding-programs/loans/covid-19-relief-options/paycheck-protection-program",
          reasoning:
            "PPP forgiveness data is official government statistics. The comparison is powerful because it demonstrates that the US government routinely forgives debt for businesses without the same moral hazard objections applied to student borrowers. Directness is lower because PPP served a different policy purpose (pandemic relief), so the comparison is not perfectly analogous.",
        },
        {
          id: "bankruptcy-exception-uniqueness",
          title: "Student Loans Are Virtually Impossible to Discharge in Bankruptcy — Unique Among Consumer Debts",
          description:
            "Student loans are the only major category of consumer debt that cannot be routinely discharged in bankruptcy. The 1998 Higher Education Amendments and 2005 Bankruptcy Abuse Prevention Act made student loan discharge nearly impossible, requiring borrowers to prove 'undue hardship' — a standard so stringent that fewer than 0.1% of student loan borrowers in bankruptcy even attempt to discharge their loans. Credit card debt, medical debt, auto loans, mortgages, and even gambling debts can be discharged through bankruptcy. This unique treatment means student borrowers have no financial safety net, and debts can follow them for decades, with wages garnished and Social Security benefits offset even in retirement.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source: "US Bankruptcy Code; Consumer Financial Protection Bureau; American Bankruptcy Institute",
          sourceUrl: "https://www.consumerfinance.gov/about-us/blog/busting-myths-about-bankruptcy-and-private-student-loans/",
          reasoning:
            "The bankruptcy exception is a matter of law and is indisputably factual. It directly addresses the fairness argument by showing that student borrowers face uniquely punitive treatment compared to all other debtors. If the system imposes unique burdens on student borrowers that it does not impose on businesses or other consumers, remedies like forgiveness address a structural inequity rather than creating moral hazard.",
        },
        {
          id: "tuition-inflation-1200-percent",
          title: "College Tuition Has Risen 1,200% Since 1980 — 4x the Rate of General Inflation",
          description:
            "According to the College Board and Bureau of Labor Statistics, the average cost of tuition and fees at four-year public universities increased from approximately $2,500 in 1980 to over $11,000 in 2024 (in constant dollars) — a real increase of approximately 340%. In nominal terms, tuition has risen over 1,200%. This vastly outpaced general inflation (approximately 280%), wage growth (approximately 200%), and the growth in the college earnings premium. The primary driver was declining state funding per student (down 30% since 2000) combined with the 'Bennett Hypothesis' — that guaranteed federal loans enable universities to raise prices because students can always borrow more.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "College Board; Bureau of Labor Statistics; National Center for Education Statistics",
          sourceUrl: "https://research.collegeboard.org/trends/college-pricing",
          reasoning:
            "Tuition inflation data comes from authoritative, independent sources and is indisputable. This directly addresses the 'personal responsibility' argument by showing that the system itself created unaffordable costs that were not present for prior generations. However, directness is somewhat lower because high tuition does not automatically justify forgiveness as opposed to other remedies (price controls, increased state funding, income-driven repayment).",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Systemic Reform & Root Causes
    // =========================================================================
    {
      id: "systemic-reform",
      title: "Systemic Reform & Root Causes",
      short_summary:
        "Both sides acknowledge that forgiveness alone does not solve the underlying problem. Without structural reform — tuition regulation, increased state funding, bankruptcy discharge, or income-share agreements — the next generation of students will accumulate the same debt. The debate is whether forgiveness should come before, after, or alongside reform.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Forgiveness without reform is treating the symptom while feeding the disease. If the government cancels $1.77 trillion in debt today, universities will continue raising tuition, students will continue overborrowing, and a new debt crisis will emerge within a decade. The Bennett Hypothesis — that federal loan availability enables tuition increases — is supported by a 2017 Federal Reserve Bank of New York study that found a 60-cent tuition increase for every additional dollar of subsidized federal loans. Forgiveness also undermines income-driven repayment (IDR), which already caps payments at 5-10% of discretionary income and forgives remaining balances after 20-25 years. The SAVE Plan, before it was blocked by courts, would have resulted in $0 monthly payments for borrowers earning under 225% of the poverty line. Targeted solutions — strengthening IDR, restoring bankruptcy discharge, funding community colleges, regulating tuition — address root causes without the moral hazard and fiscal cost of blanket forgiveness.",
      proponent_rebuttal:
        "No one argues that forgiveness alone is sufficient — it must be paired with structural reform. But requiring that all reforms be implemented simultaneously before any relief is provided is a recipe for paralysis that guarantees no one receives help. IDR programs have been plagued by administrative failures — a 2021 Department of Education review found that loan servicers had mismanaged IDR for over two decades, incorrectly tracking payments and denying forgiveness to borrowers who had qualified. Only 32 borrowers had ever successfully received IDR forgiveness before the Biden administration's fixes. The 'fix the system first' argument has been made for 30 years while 43 million borrowers continue suffering. Forgiveness and reform are not mutually exclusive — we can cancel existing debt while simultaneously implementing tuition controls, restoring bankruptcy rights, and increasing state funding. History shows that crisis-driven relief (the GI Bill, Social Security, Medicare) often catalyzes rather than prevents structural reform.",
      crux: {
        id: "forgiveness-tuition-feedback",
        title: "The Forgiveness-Tuition Feedback Loop Test",
        description:
          "If student debt forgiveness causes universities to raise tuition faster (because they anticipate future forgiveness will absorb the cost), forgiveness is self-defeating and creates a cycle of debt accumulation. If forgiveness is paired with effective tuition controls or does not measurably affect tuition-setting behavior, the feedback loop concern is overstated.",
        methodology:
          "Use a difference-in-differences analysis comparing tuition increases at institutions whose students received significant forgiveness benefits versus those whose students were largely unaffected. Simultaneously analyze university pricing committee minutes, budget documents, and tuition-setting models obtained through FOIA to determine whether anticipated forgiveness influenced pricing decisions. Survey university CFOs about whether forgiveness expectations factor into tuition models.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Econometric analysis combining institutional tuition data with FOIA-obtained pricing documents)",
      },
      evidence: [
        {
          id: "ny-fed-bennett-hypothesis",
          title: "NY Fed: 60-Cent Tuition Increase per Dollar of Federal Loan Subsidy",
          description:
            "A 2017 Federal Reserve Bank of New York staff report by Lucca, Nadauld, and Shen found that institutions that were eligible for expanded federal loan limits raised tuition by approximately 60 cents for every additional dollar of subsidized federal loan available to students. This 'pass-through' effect was strongest at for-profit institutions (dollar-for-dollar) and significant at private nonprofit and public institutions. The study supports the Bennett Hypothesis — named after Reagan-era Education Secretary William Bennett — that federal student aid enables rather than alleviates tuition inflation.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Federal Reserve Bank of New York",
          sourceUrl: "https://www.newyorkfed.org/research/staff_reports/sr733.html",
          reasoning:
            "The NY Fed is a highly credible, independent research institution. The study uses rigorous econometric methodology (regression discontinuity design). However, other studies have found smaller or no pass-through effects, and the relationship between loan availability and tuition is disputed. Directness is moderate because the study examines loan subsidies rather than forgiveness specifically, though the mechanisms are analogous.",
        },
        {
          id: "idr-servicer-failures",
          title: "Only 32 Borrowers Received IDR Forgiveness Before 2021 Fix Due to Servicer Failures",
          description:
            "Income-driven repayment plans promise loan forgiveness after 20-25 years of qualifying payments. However, a 2021 Department of Education review found that loan servicers had systematically mismanaged IDR for over two decades — miscounting qualifying payments, failing to notify borrowers of options, and placing borrowers in forbearance instead of IDR. As a result, only 32 borrowers out of millions enrolled in IDR had ever received forgiveness before the Biden administration's 2021 IDR Account Adjustment. The Government Accountability Office documented that servicers had financial incentives to minimize forgiveness. This administrative failure undermines the argument that existing repayment programs are an adequate alternative to forgiveness.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "Department of Education; Government Accountability Office; NPR",
          sourceUrl: "https://www.gao.gov/products/gao-22-103720",
          reasoning:
            "The Department of Education's own review and GAO audit are authoritative government sources documenting a systemic failure. The finding that only 32 borrowers received IDR forgiveness out of millions enrolled is a devastating indictment of the existing system. This directly challenges the argument that IDR is a functional alternative to forgiveness — a system that promises forgiveness but delivers it to 32 people over two decades is not a real alternative.",
        },
        {
          id: "racial-wealth-gap-student-debt",
          title: "Student Debt Disproportionately Burdens Black Borrowers — Widening Racial Wealth Gap",
          description:
            "The racial disparity in student debt is stark. According to the National Center for Education Statistics and Brookings, Black bachelor's degree recipients owe an average of $25,000 more than white graduates four years after graduation. Nearly 50% of Black borrowers owe more than they originally borrowed after 12 years (compared to 17% of white borrowers) due to interest accumulation. The Brookings Institution found that 20 years after starting college, the median Black borrower still owed 95% of their original balance, while the median white borrower had paid off 94% of theirs. Student debt both reflects and amplifies the racial wealth gap — Black families have less generational wealth to fund college, forcing higher borrowing, and then face employment discrimination that makes repayment harder.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Brookings Institution; National Center for Education Statistics; Federal Reserve Survey of Consumer Finances",
          sourceUrl: "https://www.brookings.edu/articles/black-white-disparity-in-student-loan-debt-more-than-triples-after-graduation/",
          reasoning:
            "The racial disparity data comes from federal education statistics and the Fed's Survey of Consumer Finances — both authoritative sources. The finding that Black borrowers owe more after 20 years than they originally borrowed demonstrates a structural problem that income-driven repayment alone cannot solve. Directness is lower because the racial equity argument supports forgiveness as a partial remedy but does not demonstrate it is the most effective tool for closing the racial wealth gap.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Federal Student Aid Data Center — US Department of Education",
      url: "https://studentaid.gov/data-center/student/portfolio",
    },
    {
      title: "Student Loan Forgiveness Is Regressive — Brookings Institution",
      url: "https://www.brookings.edu/articles/student-loan-forgiveness-is-regressive-whether-measured-by-income-education-or-wealth/",
    },
    {
      title: "The Macroeconomic Effects of Student Debt Cancellation — Levy Economics Institute",
      url: "http://www.levyinstitute.org/pubs/rr_18_1.pdf",
    },
    {
      title: "Federal Student Loan Servicing — Government Accountability Office",
      url: "https://www.gao.gov/products/gao-22-103720",
    },
    {
      title: "Credit Supply and the Rise in College Tuition — NY Fed Staff Report",
      url: "https://www.newyorkfed.org/research/staff_reports/sr733.html",
    },
    {
      title: "Trends in College Pricing and Student Aid — College Board",
      url: "https://research.collegeboard.org/trends/college-pricing",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is student debt forgiveness an effective economic stimulus or an expensive giveaway?",
      content:
        "The Roosevelt Institute projects $86-108 billion in annual GDP growth from forgiveness, but the CRFB estimates it would add to inflation and the national debt. The top 40% of earners hold 60% of student debt. Is forgiveness efficient economic policy, or would the same money generate more growth through infrastructure, targeted transfers, or tax credits?",
    },
    {
      id: "q2",
      title: "Is forgiveness fair to those who never borrowed or already repaid?",
      content:
        "An electrician who skipped college to avoid debt now subsidizes a lawyer's loan forgiveness through taxes. But the government forgave $800 billion in PPP loans for businesses without similar objections. Student loans are uniquely non-dischargeable in bankruptcy. Is the moral hazard argument principled, or is it selectively applied to student borrowers while other constituencies receive routine government relief?",
    },
    {
      id: "q3",
      title: "Does forgiveness without reform just restart the cycle?",
      content:
        "If forgiveness does not address the root cause — tuition that has risen 1,200% since 1980, declining state funding, and the federal loan system that enables price increases — the next generation will accumulate the same debt. But income-driven repayment, the main alternative, has been so badly mismanaged that only 32 borrowers received forgiveness in over two decades. Can reform happen without relief, or must they proceed together?",
    },
  ],
};
