export const studentDebtForgivenessData = {
  id: "student-debt-forgiveness",
  title: "Student Debt Forgiveness",
  question: "Should the government cancel student debt?",
  meta_claim:
    "Broad student loan forgiveness is justified, economically beneficial, and the fairest approach to addressing the student debt crisis.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: federal loans total $1.7 trillion across 42.8
  // million borrowers (FSA, data to 31 December 2025), with 7.7 million in
  // default. Biden v. Nebraska (2023) blocked broad cancellation; targeted
  // programs erased $188.8 billion for 5.3 million borrowers by January 2025.
  // The Education Department agreed with Missouri on 9 December 2025 to end
  // the SAVE plan; from 1 July 2026 the 2025 budget law ended Grad PLUS for
  // new borrowers, capped graduate and Parent PLUS loans and limited new
  // borrowers to two repayment plans.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Americans owe $1.7 trillion in federal student loans, and at the end of 2025 7.7 million borrowers were in default, with 23% of those repaying more than a month behind. The Supreme Court blocked broad cancellation in 2023; targeted programs still erased $188.8 billion for 5.3 million people under Biden. Since July 2026 new borrowers face loan caps and fewer repayment plans. The fight is over who deserves relief, who pays for it, and whether forgiveness fixes the system or feeds it.",
    confidence: 90,
    source:
      "Federal Student Aid, FSA Data Center update (13 March 2026, data as of 31 December 2025); Supreme Court, Biden v. Nebraska (2023); Business Insider (16 January 2025); CBS News (2 July 2026)",
    sourceUrl:
      "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-03-13/federal-student-aid-posts-updated-reports-fsa-data-center",
  },
  simple_case: [
    "The answer bears on what happens to existing balances, which repayment plans survive, how much today's students can borrow, and who pays for any relief.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Who owes, and who would gain?
    // =========================================================================
    {
      id: "economic-stimulus",
      title: "Who Owes, and Who Would Gain from Cancellation?",
      short_summary:
        "Distress is real and rising: 7.7 million borrowers were in default at the end of 2025. But the biggest balances belong to graduate and professional borrowers, who tend to earn the most, so a write-off by balance sends the most money up the income scale. The borrowers most likely to struggle often owe less, and Black graduates fall further behind on repayment.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Debt follows degrees, and degrees follow income. Adam Looney of Brookings found that 'almost a third of all student debt is owed by the wealthiest 20 percent of households and only 8 percent by the bottom 20 percent.' The largest balances are held by doctors, lawyers and MBA holders, whose lifetime earnings are the highest of any group. Writing off balances therefore sends the most money to people who were on track to repay. Looney's conclusion: 'Across-the-board forgiveness is therefore a costly and ineffective way to reduce economic gaps by race or socioeconomic status.' A dollar of relief does the most good for the borrower in default on a small loan from a program that did not pay off, and broad cancellation is not aimed at that borrower.",
      proponent_rebuttal:
        "The system is failing millions of ordinary borrowers, not just a few doctors. At the end of 2025, 7.7 million borrowers with $180 billion in Education Department loans were in default, and 23.2% of those in active repayment, more than four million people, were over 30 days late. Default brings seized tax refunds and wrecked credit. The burden falls hardest on Black graduates: Scott-Clayton and Li found that four years after a bachelor's degree, 48% of Black graduates owed more than they had borrowed, against 17% of white graduates, and the Black-white debt gap more than tripled to about $25,000. Relief can be capped by income to exclude high earners. A measure of regressivity by balance misses who is drowning.",
      crux: {
        id: "who-gains-from-forgiveness",
        title: "The Who-Gains Test",
        question:
          "Would broad forgiveness mostly go to borrowers who would have repaid anyway?",
        description:
          "A balance is not the same as a burden. Some large balances belong to high earners who will repay in full; some small balances belong to borrowers in default who never will. Measuring who gains requires valuing each balance by what its holder would actually have repaid, then seeing where the benefit lands by income, wealth and race, under plans with and without income caps.",
        methodology:
          "Link federal loan records to tax records and project each borrower's lifetime repayment under existing plans. Compute the present value of forgiving $10,000, $50,000 and all debt, with and without income caps, and report the benefit by income decile, wealth, race and whether the borrower finished a degree.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Federal loan records linked to tax data, projecting what each borrower would really repay, then showing the present value of each forgiveness design by income decile, wealth, race and degree completion.",
        },
        cost_to_verify:
          "$300K-1M (administrative data exist at the Education Department and IRS; access is the cost)",
        falsification: {
          supporter_flip:
            "If linked loan and tax records showed that even income-capped forgiveness sent most of its value to borrowers projected to repay in full, the claim that broad relief helps those who are struggling would weaken.",
          skeptic_flip:
            "If linked records showed an income-capped plan sending most of its value to borrowers in default, delinquent or without a degree, the regressivity objection would apply to uncapped cancellation but not to capped relief.",
          common_ground:
            "Both sides agree that the largest balances belong to graduate and professional borrowers, that millions of borrowers with smaller balances are in default, and that the design of any relief decides who gains.",
          live_disagreement:
            "Whether broad forgiveness, even with income caps, mainly reaches borrowers in distress or mainly those who would have repaid, which present-value data by income and race could show.",
        },
      },
      evidence: [
        {
          id: "total-student-debt-1-77-trillion",
          title: "FSA end-2025: $1.7 trillion owed by 42.8 million borrowers; 7.7 million in default; 23% of those repaying over 30 days late",
          description:
            "As of 31 December 2025, Federal Student Aid reported '42.8 million recipients with federal student loans totaling $1.7 trillion.' About '7.7 million ED-held recipients with $180 billion in outstanding federal student loans are in default', about 11% of the Department-managed portfolio. Among borrowers in active repayment, '23.2% of recipients, or more than four million recipients, are more than 30 days delinquent'; by dollar balance the rate was 18.6%, against 12.7% in December 2019. More than 6.5 million borrowers were still in SAVE-plan forbearance.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 6,
          },
          source:
            "Federal Student Aid, 'Federal Student Aid Posts Updated Reports to FSA Data Center' (GENERAL-26-15, 13 March 2026)",
          sourceUrl:
            "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-03-13/federal-student-aid-posts-updated-reports-fsa-data-center",
          reasoning:
            "The official count, and it shows distress well above pre-pandemic levels. It establishes the problem, not the remedy: default and delinquency could also be met by better repayment plans or targeted relief.",
        },
        {
          id: "crfb-regressive-distribution",
          title: "Brookings 2022: the richest fifth of households owe almost a third of student debt; the poorest fifth 8%",
          description:
            "Adam Looney, using Federal Reserve Survey of Consumer Finances data, found that 'almost a third of all student debt is owed by the wealthiest 20 percent of households and only 8 percent by the bottom 20 percent.' Measured by income, education or wealth, he finds across-the-board forgiveness regressive, and concludes: 'Across-the-board forgiveness is therefore a costly and ineffective way to reduce economic gaps by race or socioeconomic status.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "Adam Looney, 'Student loan forgiveness is regressive whether measured by income, education, or wealth', Brookings Institution (14 January 2022)",
          sourceUrl:
            "https://www.brookings.edu/articles/student-loan-forgiveness-is-regressive-whether-measured-by-income-education-or-wealth/",
          reasoning:
            "Uses the standard household survey, and its finding is shared by economists across the spectrum. It measures balances, not burdens, and it assesses uncapped forgiveness; income caps, as in the 2022 plan, would reduce the skew.",
        },
        {
          id: "racial-wealth-gap-student-debt",
          title: "Brookings 2016: four years after graduating, 48% of Black graduates owed more than they borrowed; 17% of white graduates",
          description:
            "Judith Scott-Clayton and Jing Li of Columbia's Teachers College found Black bachelor's graduates owed about $7,400 more than white graduates at graduation ($23,420 against $16,046). Four years later the gap was nearly $25,000 ($52,726 against $28,006). 48% of Black graduates owed more on their undergraduate federal loans than at graduation, against 17% of white graduates. Graduate borrowing explained 45% of the gap and slower repayment and interest about a quarter.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Scott-Clayton & Li, 'Black-white disparity in student loan debt more than triples after graduation', Brookings Institution (20 October 2016)",
          sourceUrl:
            "https://www.brookings.edu/articles/black-white-disparity-in-student-loan-debt-more-than-triples-after-graduation/",
          reasoning:
            "Federal survey data showing student debt widening the racial wealth gap after college. Nearly half the gap comes from graduate borrowing, which complicates the picture, and it shows a disparity rather than that broad forgiveness is the best tool for it.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Is it fair?
    // =========================================================================
    {
      id: "fairness-moral-hazard",
      title: "Is It Fair to Those Who Never Borrowed or Already Paid?",
      short_summary:
        "Most American adults do not have a bachelor's degree, and forgiveness asks all taxpayers to cover loans taken by those who do. Supporters answer that the government forgave most of nearly $800 billion in pandemic business loans with little such objection, and that student debt is uniquely hard to escape in bankruptcy.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Forgiveness asks the many to pay for the choices of the few. In 2022, 37.7% of US adults 25 and older had a bachelor's degree, so most taxpayers would be covering loans for people likelier to out-earn them. An electrician who chose trade school to avoid debt, or a family that scrimped to repay, gets nothing. Borrowers signed contracts, and expecting future cancellation changes how much the next student borrows and how much the next college charges. The pandemic loans to businesses were a stated condition of the program from the start; student loans were promised to be repaid. If the goal is to protect people from crushing payments, income-driven plans already cap payments by income and forgive what remains after 20 or 25 years.",
      proponent_rebuttal:
        "Fairness was not the standard applied elsewhere. The Paycheck Protection Program issued nearly $800 billion in forgivable loans to 11.4 million businesses, and by January 2023, NPR found, 92% had been granted full or partial forgiveness. Student borrowers signed at 17 or 18, on the advice of every adult around them, for prices they could not judge. Unlike almost any other consumer debt, student loans can be wiped out in bankruptcy only if the borrower proves 'undue hardship' in a separate court proceeding. Past debtors who repaid were not wronged by relief for others, any more than people who paid for their own health care are wronged by Medicaid. A rule that the unlucky must suffer because others once did would end every reform.",
      crux: {
        id: "comparative-fairness-analysis",
        title: "The Comparative Government Forgiveness Assessment",
        question:
          "Does forgiving student debt reward irresponsible borrowing more than debt relief for businesses or homeowners?",
        description:
          "If the government routinely forgives or absorbs debt for other groups (businesses, banks, farmers, homeowners) without comparable 'moral hazard' objections, applying the objection only to students reflects inconsistency rather than principle. If student debt relief is unusually likely to change future borrowing and pricing, the objection has merit on its own terms.",
        methodology:
          "List federal debt relief, bailout and subsidy programs over 25 years (PPP forgiveness, TARP, farm aid, mortgage relief, disaster loans). For each record the cost, the income of beneficiaries, whether moral-hazard objections were raised, and whether beneficiaries borrowed more afterwards. Compare with student debt relief on the same four measures.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Agreement on one rule both sides would apply everywhere, for example that relief is fair when borrowers could not foresee the loss, then applied to PPP loans, farm aid, mortgage relief and student loans alike, with data on how much each group's borrowing rose after past rescues.",
        },
        cost_to_verify:
          "$0 (federal budget data and program records are public; the comparison has not been done systematically)",
        falsification: {
          supporter_flip:
            "If a comparison of past relief programs showed student debt relief uniquely likely to raise later borrowing and tuition, compared with PPP or mortgage relief, the fairness objection would stand on principle rather than selective use.",
          skeptic_flip:
            "If the same comparison found businesses and homeowners getting relief on terms as generous, with no rise in later borrowing, and student loans nearly alone in resisting bankruptcy, the fairness objection would look applied to one group only.",
          common_ground:
            "Both sides agree most taxpayers do not hold a bachelor's degree, that the government has forgiven large business debts before, and that student loans are unusually hard to discharge in bankruptcy.",
          live_disagreement:
            "Whether forgiveness corrects a system that loaded teenagers with hard-to-escape debt, or shifts the cost onto taxpayers without degrees and onto those who already repaid.",
        },
      },
      evidence: [
        {
          id: "census-bachelors-share-2022",
          title: "Census 2023: 37.7% of US adults 25 and older held a bachelor's degree in 2022",
          description:
            "The Census Bureau reported that 'in 2022, 37.7% had a bachelor's degree' among adults aged 25 and older. Most adults, and so most taxpayers, have not completed a four-year degree.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 5,
          },
          source:
            "US Census Bureau, 'Census Bureau Releases New Educational Attainment Data', CB23-TPS.21 (16 February 2023)",
          sourceUrl: "https://www.census.gov/newsroom/press-releases/2023/educational-attainment-data.html",
          reasoning:
            "An official figure behind the 'plumber pays for the lawyer' argument. Many borrowers who never finished a degree also hold debt, and taxes are paid disproportionately by higher earners, many of them graduates, so the share of adults without degrees overstates the share of the cost they would bear.",
        },
        {
          id: "ppp-loan-forgiveness-comparison",
          title: "NPR 2023: 92% of PPP's nearly $800 billion in business loans had been forgiven in full or part",
          description:
            "The Paycheck Protection Program issued nearly $800 billion in forgivable loans to businesses during the pandemic. An NPR analysis of SBA data released in January 2023 found that 92% of the 11.4 million loans 'have been granted full or partial forgiveness', while about 21,000, roughly 0.2%, were denied forgiveness after manual review, which covered only about 215,000 loans. The program ended on 31 May 2021.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "Sacha Pfeiffer & Austin Fast, NPR, 'How the Paycheck Protection Program went from good intentions to a huge free-for-all' (9 January 2023), via WUNC",
          sourceUrl:
            "https://www.wunc.org/2023-01-09/how-the-paycheck-protection-program-went-from-good-intentions-to-a-huge-free-for-all",
          reasoning:
            "Shows government has forgiven large debts with light scrutiny. PPP was built as forgivable from the start, during an emergency, so the comparison speaks to consistency of principle more than to the economics of student loans.",
        },
        {
          id: "bankruptcy-exception-uniqueness",
          title: "CFPB: student loans need a showing of 'undue hardship' in a separate proceeding to be discharged in bankruptcy",
          description:
            "The Consumer Financial Protection Bureau explains that for student loans 'the Bankruptcy Code provides a more difficult test for relief (a showing of \"undue hardship\")' than for other unsecured debts, with the extra step of an adversary proceeding. Some private loans that borrowers think of as student loans are not covered by that standard and can be discharged like other consumer debt. The CFPB notes the Education Department has taken steps to make bankruptcy relief available to federal borrowers.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source:
            "Consumer Financial Protection Bureau, 'Busting myths about bankruptcy and private student loans'",
          sourceUrl: "https://www.consumerfinance.gov/about-us/blog/busting-myths-about-bankruptcy-and-private-student-loans/",
          reasoning:
            "A legal fact that sets student debt apart from most consumer debt, which supports the claim that borrowers lack the usual escape valve. The Education Department's easing of the federal process narrows the point, and restoring bankruptcy access is an alternative to forgiveness that both sides can back.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Does forgiveness fix the system or feed it?
    // =========================================================================
    {
      id: "systemic-reform",
      title: "Does Forgiveness Fix the System or Feed It?",
      short_summary:
        "Cheap federal credit lets colleges charge more: one New York Fed study found about 60 cents of each extra dollar of subsidized loans went into tuition. Published prices keep rising, but after grants, net tuition at public four-year colleges has fallen by about half in real terms since 2012-13. In July 2026 Congress capped graduate borrowing and ended Grad PLUS for new students, a test of the 'limit the loans' theory.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Cancel the debt without changing the system and the next class borrows its way into the same hole. Federal loans feed tuition: Lucca, Nadauld and Shen at the New York Fed found a pass-through of about '60 cents on the dollar' from higher subsidized loan limits into tuition. A one-time write-off also tells every future student and college that balances may be erased, which weakens the pressure to borrow and charge less. Reform should come first: limits on what students can borrow, like the graduate and Parent PLUS caps that took effect in July 2026, plus repayment plans tied to income and accountability for programs whose graduates cannot repay. Those address the cause; cancellation treats a symptom at the cost of encouraging it.",
      proponent_rebuttal:
        "Reform and relief are not rivals, and waiting for one to deliver the other has failed borrowers for decades. The tuition story is more complicated than 'loans drive prices': College Board data show inflation-adjusted net tuition at public four-year colleges peaked at $4,450 in 2012-13 and fell to about $2,300 in 2025-26 after grant aid. The debt people carry today was taken on in the years of higher prices and weaker state funding. The repayment system meant to be the safety valve barely worked: as of June 2021 the Education Department had approved forgiveness for only 157 loans under income-driven plans. Relief for existing borrowers can come with tighter rules for new ones, as the July 2026 changes show.",
      crux: {
        id: "forgiveness-tuition-feedback",
        title: "The Forgiveness-Tuition Feedback Loop Test",
        question:
          "Would forgiveness lead colleges to raise tuition faster, in expectation of future relief?",
        description:
          "If forgiveness, or the expectation of more of it, leads colleges to raise prices and students to borrow more, it is self-defeating. If past relief left pricing and borrowing unchanged, or if relief comes with borrowing limits, the feedback concern is smaller.",
        methodology:
          "Use a difference-in-differences design comparing tuition and borrowing at colleges whose students received large shares of past relief (PSLF, income-driven discharges, borrower-defense discharges) with similar colleges whose students received little, before and after each wave, using IPEDS and College Scorecard data. Track the same measures after the July 2026 borrowing caps.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compare tuition changes at colleges whose students received large shares of past relief, such as Public Service Loan Forgiveness and income-driven repayment discharges, with similar colleges whose students got little, using Department of Education IPEDS and College Scorecard data.",
        },
        cost_to_verify:
          "$300K-800K (econometric analysis of public institutional data)",
        falsification: {
          supporter_flip:
            "If colleges whose students received large waves of past relief raised tuition or student borrowing faster than similar colleges, broad cancellation without borrowing limits would look self-defeating.",
          skeptic_flip:
            "If tuition and borrowing at colleges whose students got large relief moved no differently from similar colleges, and net prices kept falling as the College Board reports, the feedback-loop objection would lose its force.",
          common_ground:
            "Both sides agree forgiveness alone does not fix the underlying problem, that federal loan limits affect what colleges charge, and that tuition, repayment and borrowing rules need reform whatever happens to existing debt.",
          live_disagreement:
            "Whether cancelling today's debt would feed higher prices and more borrowing, or can be paired with borrowing limits and accountability so that it does not.",
        },
      },
      evidence: [
        {
          id: "ny-fed-bennett-hypothesis",
          title: "New York Fed 2017: about 60 cents of each extra dollar of subsidized loans passed into tuition",
          description:
            "David Lucca, Taylor Nadauld and Karen Shen of the Federal Reserve Bank of New York studied expansions in federal student aid and found a pass-through of about '60 cents on the dollar' from changes in subsidized loan maximums into tuition, strongest for more expensive degrees, private institutions and two-year or vocational programs. Effects of unsubsidized loan limits were smaller but positive. The finding supports the 'Bennett hypothesis', named for Reagan's education secretary, that federal aid lets colleges raise prices.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Lucca, Nadauld & Shen, 'Credit Supply and the Rise in College Tuition', Federal Reserve Bank of New York Staff Report 733 (2015, rev. 2017)",
          sourceUrl: "https://www.newyorkfed.org/research/staff_reports/sr733.html",
          reasoning:
            "Credible central-bank research. Other studies find smaller effects, and it measures loan limits, not forgiveness, so it bears on the feedback loop by analogy.",
        },
        {
          id: "college-board-net-price-2025",
          title: "College Board 2025: public four-year sticker price $11,950, but real net tuition has fallen by about half since 2012-13",
          description:
            "The College Board reports published tuition and fees for in-state students at public four-year colleges of '$11,950, $340 higher than in 2024-25' for 2025-26. After grant aid, inflation-adjusted net tuition and fees for first-time, full-time in-state students peaked in 2012-13 at $4,450 (in 2025 dollars) and fell to an estimated $2,300 in 2025-26. At private nonprofit four-year colleges real net tuition fell from $19,810 in 2006-07 to an estimated $16,910.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "College Board, 'Trends in College Pricing: Highlights' (2025)",
          sourceUrl: "https://research.collegeboard.org/trends/college-pricing/highlights",
          reasoning:
            "The standard pricing data, and it complicates the story both sides tell: what full-time undergraduates actually pay has been falling for a decade. Net tuition leaves out living costs, graduate programs and part-time students, where much of today's debt was taken on, so it does not show that borrowing pressure has eased.",
        },
        {
          id: "obbba-loan-limits-2026",
          title: "July 2026: Grad PLUS closed to new borrowers, graduate loans capped at $100,000 ($200,000 professional), Parent PLUS at $65,000",
          description:
            "Under the 2025 budget law, from 1 July 2026 new borrowers can no longer take Graduate PLUS loans; graduate students may borrow up to $20,500 a year and $100,000 per degree, and students in certain professional fields $50,000 a year and $200,000 in total. Parent PLUS loans are 'capped at $20,000 a year and $65,000 total per student', and a $257,500 lifetime cap applies to new loans, with exceptions. New borrowers get two repayment options: a tiered standard plan and the income-based Repayment Assistance Plan. The law sunsets SAVE in July 2028; about 7.2 million borrowers enrolled in it must choose another plan.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 9,
            directness: 4,
          },
          source:
            "Mary Cunningham, CBS News, 'New student loan rules take effect July 1. Here's what borrowers should know' (updated 2 July 2026)",
          sourceUrl: "https://www.cbsnews.com/news/student-loan-changes-july-2026/",
          reasoning:
            "The first large federal test of limiting loans to restrain prices, which is the reform skeptics prefer to forgiveness. Its effect on tuition will take years to see, and graduate students may turn to private loans instead, so it shows the direction of policy, not yet a result.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Broad cancellation or targeted relief?
    // =========================================================================
    {
      id: "targeted-vs-broad-relief",
      title: "Broad Cancellation or Targeted Relief?",
      short_summary:
        "The Supreme Court closed the door on broad executive cancellation in 2023. Targeted programs, for public servants, defrauded students, the disabled and long-term repayers, then erased $188.8 billion for 5.3 million people. Economists across the spectrum call enrolling struggling borrowers in income-driven repayment the most progressive option. But that system long failed to deliver, and the plan that cut many payments to $0, SAVE, is being shut down.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Targeted relief does what broad cancellation claims to do, at a fraction of the cost. Catherine and Yannelis found that enrolling borrowers who would benefit in income-driven repayment is 'the least expensive and most progressive policy we consider', while broad forgiveness 'would benefit the top decile as much as the bottom three deciles combined.' The targeted route works: by January 2025 the Biden administration had erased $188.8 billion for 5.3 million borrowers through existing programs. And it is the lawful route. In Biden v. Nebraska the Supreme Court held 6–3 that the HEROES Act did not authorize the Secretary to cancel some $430 billion. Broad cancellation needs an act of Congress, which has not come.",
      proponent_rebuttal:
        "Targeted relief has worked only after years of failure and now faces reversal. As of June 2021, the Education Department had approved income-driven forgiveness for only 157 loans, according to GAO; servicers did not track qualifying payments reliably or tell borrowers their counts. Only a one-time fix in 2023 brought $39 billion in forgiveness to 804,000 borrowers. Programs that depend on paperwork and servicers leave out the people with the least time and help. Now SAVE, under which 4.6 million borrowers could have paid $0 a month, is ending by settlement and statute, and its 7 million enrollees must move to plans with higher payments. When the safety net keeps tearing, a clean cancellation for borrowers below an income cap is the relief that actually arrives.",
      crux: {
        id: "targeted-relief-reach",
        title: "The Targeted-Relief Reach Test",
        question:
          "Do income-driven repayment and targeted programs actually reach the borrowers in distress?",
        description:
          "Targeted relief is cheaper and more progressive on paper. Whether it works depends on reach: the share of eligible, struggling borrowers who are enrolled, whose payments are counted correctly and who receive the forgiveness promised. If reach is high, broad cancellation buys little extra for its cost. If most borrowers in default never get through the paperwork, targeting fails the people it is aimed at.",
        methodology:
          "From Education Department records, compute for borrowers in default or serious delinquency the share enrolled in an income-driven plan, the share whose qualifying payments are correctly counted, and the share who received forgiveness when eligible, before and after automatic enrollment using tax data. Compare with the cost per dollar of relief delivered to the same borrowers under an income-capped cancellation.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Department of Education records showing what share of borrowers in default or serious delinquency are enrolled in income-driven plans, have their payments counted correctly and receive the forgiveness they qualify for.",
        },
        cost_to_verify:
          "$200K-500K (administrative data analysis; the records exist)",
        falsification: {
          supporter_flip:
            "If automatic enrollment using tax data put most borrowers in default into income-driven plans, with payments counted correctly and forgiveness delivered on schedule, broad cancellation would add cost without reaching many more people in need.",
          skeptic_flip:
            "If records showed most borrowers in default never enrolled in income-driven plans despite eligibility, or lost forgiveness to counting errors, the targeted route would be failing the people it is meant for.",
          common_ground:
            "Both sides agree broad executive cancellation is legally closed without Congress, that targeted programs erased $188.8 billion under Biden, and that the income-driven system long failed to deliver promised forgiveness.",
          live_disagreement:
            "Whether repaired, automatic income-driven repayment can reach struggling borrowers, or whether administrative failures make broad, income-capped cancellation the only relief that reliably arrives.",
        },
      },
      evidence: [
        {
          id: "forgiveness-regressive-present-value",
          title: "Catherine & Yannelis 2023: forgiving balances gives the top tenth of earners as much as the bottom three-tenths",
          description:
            "Sylvain Catherine and Constantine Yannelis valued student debt forgiveness by what borrowers at each earnings level would actually have repaid (NBER, 2020; Journal of Financial Economics, 2023). 'Full or partial forgiveness is regressive because high earners took larger loans, but also because, for low earners, balances greatly overstate present values', so that forgiveness 'would benefit the top decile as much as the bottom three deciles combined.' Enrolling households who would benefit in income-driven repayment was 'the least expensive and most progressive policy we consider.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Catherine & Yannelis, 'The Distributional Effects of Student Loan Forgiveness', NBER Working Paper 28175 (2020); Journal of Financial Economics 147(2) (2023)",
          sourceUrl: "https://www.nber.org/papers/w28175",
          reasoning:
            "Peer-reviewed work that measures who gains in present value, the right measure for this crux. Its preferred alternative assumes income-driven repayment works as designed, which the next cards question, and its results depend on projected repayment paths.",
        },
        {
          id: "biden-v-nebraska-scotus",
          title: "Supreme Court Struck Down Biden's broad cancellation plan in Biden v. Nebraska (2023)",
          description:
            "On 30 June 2023 the Supreme Court ruled 6-3 in Biden v. Nebraska that the HEROES Act of 2003 did not authorize the Secretary of Education to cancel up to $20,000 per borrower for more than 40 million borrowers, an estimated $430 billion. The Court held that the power to 'waive or modify' loan provisions did not stretch to cancellation on that scale without clear authorization from Congress. Broad cancellation in the US now requires legislation.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 6,
          },
          source: "Supreme Court of the United States, Biden v. Nebraska, No. 22-506 (30 June 2023)",
          sourceUrl: "https://www.supremecourt.gov/opinions/22pdf/22-506_nmip.pdf",
          reasoning:
            "Settles the legal route, not the merits. It is coded against the meta-claim because it forecloses the mechanism broad forgiveness relied on, leaving targeted programs as the only route open without Congress.",
        },
        {
          id: "biden-targeted-relief-total",
          title: "By January 2025, targeted programs had erased $188.8 billion for 5.3 million borrowers",
          description:
            "After the Supreme Court ruling, the Biden administration used existing programs: Public Service Loan Forgiveness, income-driven repayment fixes, discharges for students defrauded by their colleges and for borrowers with severe disabilities. Business Insider reported that the final announcement, on 16 January 2025, 'brings total student debt relief under Biden to $188.8 billion for 5.3 million borrowers.' The final round covered 4,550 borrowers on income-based plans and 4,100 defrauded by DeVry University.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "Ayelet Sheffey, Business Insider, 'Biden's final student-loan forgiveness action has arrived' (16 January 2025), via Yahoo News",
          sourceUrl: "https://www.yahoo.com/news/bidens-final-student-loan-forgiveness-214628988.html",
          reasoning:
            "Shows relief on a large scale was possible without broad cancellation, which both sides cite: one as proof targeting works, the other as proof the need is broad. Much of it came from fixing past administrative failures rather than new policy.",
        },
        {
          id: "idr-servicer-failures",
          title: "GAO 2022: only 157 loans had received income-driven forgiveness by June 2021",
          description:
            "The Government Accountability Office found that as of 1 June 2021 the Education Department had approved forgiveness for a total of 157 loans under income-driven repayment plans, while about 7,700 loans, roughly $49 million, were potentially eligible, a number that could reach about 1.5 million loans by 2030. The Department and its servicers did not regularly tell borrowers their qualifying payment counts, and older loans were at higher risk of tracking errors. After a one-time recount, the Department began in August 2023 to provide 804,000 borrowers with $39 billion in income-driven forgiveness.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "Government Accountability Office, 'Federal Student Aid: Education Needs to Take Steps to Ensure Eligible Loans Receive Income-Driven Repayment Forgiveness', GAO-22-103720 (March 2022)",
          sourceUrl: "https://www.gao.gov/products/gao-22-103720",
          reasoning:
            "An independent audit showing the main targeted alternative failed to deliver for two decades. The 2023 recount shows the failures could be fixed administratively, which cuts both ways: the system can work, but only after borrowers were failed for years.",
        },
        {
          id: "save-plan-ended-2025",
          title: "December 2025: the Education Department agreed with Missouri to end SAVE, the plan that let 4.6 million borrowers pay $0",
          description:
            "On 9 December 2025 the Education Department announced a proposed settlement with Missouri, which had sued over the SAVE income-driven plan. The department agreed to end SAVE, enroll no new borrowers and deny pending applications, giving current enrollees a limited time to choose another plan. SAVE had more than 7 million enrollees, 4.6 million of whom could have lowered their monthly payments to $0. Separately, the 2025 budget law sunsets SAVE by July 2028.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source:
            "CBS News, 'Trump administration moves to end the SAVE plan for millions of student borrowers' (10 December 2025)",
          sourceUrl: "https://www.cbsnews.com/news/student-loan-repayment-save-plan-ending",
          reasoning:
            "Shows the income-driven safety net that targeted relief depends on can be withdrawn, which supports the argument that it is unreliable. Supporters of the change answer that SAVE was ruled unlawful in court and that its $0 payments shifted costs to taxpayers, so it is evidence about political durability, not about which design is better.",
        },
      ],
    },
  ],
  aliases: [
    "Is broad student debt forgiveness justified and economically beneficial?",
    "Should student loans be forgiven?",
    "Student loan forgiveness",
    "Is student loan forgiveness fair?",
  ],
  references: [
    {
      title: "Federal Student Aid Posts Updated Reports to FSA Data Center — Federal Student Aid (13 March 2026)",
      url: "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-03-13/federal-student-aid-posts-updated-reports-fsa-data-center",
    },
    {
      title: "Biden v. Nebraska, No. 22-506 (2023) — Supreme Court Opinion",
      url: "https://www.supremecourt.gov/opinions/22pdf/22-506_nmip.pdf",
    },
    {
      title: "New student loan rules take effect July 1 — CBS News (2 July 2026)",
      url: "https://www.cbsnews.com/news/student-loan-changes-july-2026/",
    },
    {
      title: "Trump administration moves to end the SAVE plan — CBS News (10 December 2025)",
      url: "https://www.cbsnews.com/news/student-loan-repayment-save-plan-ending",
    },
    {
      title: "Student loan forgiveness is regressive whether measured by income, education, or wealth — Looney, Brookings (2022)",
      url: "https://www.brookings.edu/articles/student-loan-forgiveness-is-regressive-whether-measured-by-income-education-or-wealth/",
    },
    {
      title: "The Distributional Effects of Student Loan Forgiveness — Catherine & Yannelis, NBER w28175",
      url: "https://www.nber.org/papers/w28175",
    },
    {
      title: "Federal Student Aid: Ensure Eligible Loans Receive Income-Driven Repayment Forgiveness — GAO-22-103720 (2022)",
      url: "https://www.gao.gov/products/gao-22-103720",
    },
    {
      title: "Credit Supply and the Rise in College Tuition — Lucca, Nadauld & Shen, NY Fed Staff Report 733",
      url: "https://www.newyorkfed.org/research/staff_reports/sr733.html",
    },
    {
      title: "Trends in College Pricing: Highlights — College Board (2025)",
      url: "https://research.collegeboard.org/trends/college-pricing/highlights",
    },
    {
      title: "Black-white disparity in student loan debt more than triples after graduation — Scott-Clayton & Li, Brookings (2016)",
      url: "https://www.brookings.edu/articles/black-white-disparity-in-student-loan-debt-more-than-triples-after-graduation/",
    },
    {
      title: "Federal Student Aid Data Center — US Department of Education",
      url: "https://studentaid.gov/data-center/student/portfolio",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Who would benefit most from canceling student debt?",
      content:
        "By dollars, higher earners: the richest fifth of households owe almost a third of student debt and the poorest fifth 8%, because graduate and professional borrowers carry the largest balances. Valued by what borrowers would really repay, broad forgiveness gives the top tenth of earners as much as the bottom three-tenths combined. But 7.7 million borrowers were in default at the end of 2025, and income caps can aim relief at them.",
    },
    {
      id: "q2",
      title: "Is forgiveness fair to people who never borrowed or already paid?",
      content:
        "Most adults, 62% in 2022, do not have a bachelor's degree, and forgiveness asks all taxpayers to cover loans for those who do. Supporters point out that 92% of nearly $800 billion in pandemic business loans were forgiven with little such objection, and that student loans are unusually hard to discharge in bankruptcy. The dispute is over which rule of fairness both sides would apply everywhere.",
    },
    {
      id: "q3",
      title: "What changed for student loans in 2025 and 2026?",
      content:
        "In December 2025 the Education Department agreed with Missouri to end the SAVE repayment plan, which had more than 7 million enrollees. From July 2026, the 2025 budget law closed Grad PLUS loans to new borrowers, capped graduate borrowing at $100,000 per degree ($200,000 in some professional fields) and Parent PLUS at $65,000 per student, and limited new borrowers to two repayment plans.",
    },
    {
      id: "q4",
      title: "Can targeted relief replace broad cancellation?",
      content:
        "The Supreme Court blocked broad cancellation in 2023, but targeted programs then erased $188.8 billion for 5.3 million borrowers. Economists call enrolling struggling borrowers in income-driven repayment the most progressive option. Yet by June 2021 only 157 loans had ever received income-driven forgiveness, and the plan that cut many payments to $0 is being shut down.",
    },
  ],
};
