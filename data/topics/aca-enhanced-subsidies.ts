export const acaEnhancedSubsidiesData = {
  id: "aca-enhanced-subsidies",
  title: "The Obamacare Subsidy Cliff",
  question: "Should Congress bring back the expanded Obamacare subsidies?",
  meta_claim:
    "Congress should restore the enhanced ACA premium tax credits that expired at the end of 2025, because their loss priced millions of eligible people out of coverage, and the cost of about $350 billion over ten years buys coverage that fraud controls, not subsidy cuts, should protect.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: the enhanced credits expired on 1 January 2026.
  // The House passed a three-year extension 230-196 on 8 January 2026; the
  // Senate had rejected one in December 2025 and has not passed one since.
  // KFF projects 2026 paid enrollment of about 17.5 million (May 19, 2026);
  // ASPE attributes the 2.9 million fall in February enrollment to removing
  // improper enrollees (June 26, 2026). Insurers' median proposed 2027
  // increase is 15% (KFF, August 3, 2026).
  last_updated: "2026-11-03",
  tags: ["health-insurance", "affordable-care-act", "obamacare", "premiums", "federal-budget"],
  aliases: [
    "ACA enhanced premium tax credits",
    "Obamacare subsidies expired",
    "ACA subsidy cliff",
    "Health insurance premiums 2026",
    "Extend the ACA tax credits",
  ],
  // ── The lede: what happened in 2026, then what the fight is over ──
  keystone_fact: {
    statement:
      "The extra ACA premium help Congress created in 2021 expired at the end of 2025. In 2026 the average marketplace premium payment rose 58% and the average deductible 37% as buyers moved to cheaper bronze plans, and KFF projects paid enrollment falling from 22.3 million in 2025 to about 17.5 million. The House voted 230-196 in January to extend the credits for three years; the Senate has not passed an extension. The fight is over who left the marketplace, what the money buys, and who should get help.",
    confidence: 85,
    source:
      "KFF, 'What We Know So Far About 2026 ACA Marketplace Enrollment, Premiums, and Deductibles' (May 19, 2026); The Fiscal Times, 'House Passes 3-Year Extension of Obamacare Subsidies' (January 8, 2026)",
    sourceUrl:
      "https://www.kff.org/affordable-care-act/what-we-know-so-far-about-2026-aca-marketplace-enrollment-premiums-and-deductibles/",
  },
  // ── The summary above the crux sheet: what the map turns on ──
  simple_case: [
    "Both sides accept that the enhanced credits lowered what enrollees paid and opened help to people above 400% of the poverty line, that subsidized enrollment more than doubled while they ran, and that some of that growth came from people signed up without their knowledge or on false incomes. Both also accept that premiums and deductibles rose sharply in 2026 and that insurers propose another double-digit increase for 2027.",
    "They split over how much of the 2026 drop in enrollment was improper sign-ups removed and how much was eligible people priced out; over how many people the money keeps insured, at about $350 billion over ten years, and how much goes to people who would have had coverage anyway; and over whether federal help should reach middle-income buyers at all.",
    "The first two are questions that enrollment records, claims data and budget scoring can answer; the last is a judgment about who taxpayers should help that the numbers inform but do not decide.",
  ],
  pillars: [
    {
      id: "who-left",
      title: "Who Left the Marketplace?",
      short_summary:
        "Enrollment fell in 2026. KFF finds the steepest losses among middle-income buyers who lost help at the cliff; the administration attributes the whole decline in paid enrollment to removing improper and phantom enrollees.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The people who left were largely people who should never have been enrolled. HHS's planning office estimates that improper, phantom and fraudulent enrollment peaked at 5.6 million people in 2025, and that the 2.9 million fall in February enrollment from 2025 to 2026 matches the people removed after being found improperly enrolled, about 1.5 million of them by CMS. Paragon estimates about 6.2 million 2026 sign-ups in the poverty band where zero-premium plans were offered were improper. Even after the drop, February 2026 enrollment of about 19.2 million was higher than every year before 2024.",
      proponent_rebuttal:
        "The pattern of who left points to price, not fraud. KFF found that people at 400-500% of the poverty line, the group that lost all help at the cliff, were 3% of 2025 sign-ups but 27% of the 2026 drop, and everyone above the cliff was 7% of enrollment but 48% of the decline. The average deductible jumped 37%, the steepest rise since 2014, as buyers fled to bronze plans; KFF projects average paid enrollment of about 17.5 million, nearly 5 million below 2025. In New Mexico, which replaced the lost federal help with state money, sign-ups rose 18%.",
      crux: {
        id: "who-left-the-market",
        title: "Priced Out or Purged?",
        question:
          "Of those who left the marketplace in 2026, how many were improper enrollees and how many eligible buyers priced out?",
        description:
          "Both sides accept that enrollment fell and that CMS removed people it found improperly enrolled. One side reads the fall as mostly eligible buyers leaving when premiums jumped; the other as mostly improper and phantom enrollees cleared out. The answer depends on matching each person who left to their verified eligibility and their new premium.",
        methodology:
          "Take a sample of 2025 enrollees who were not enrolled in 2026, verify each one's income and identity against tax and Social Security records, and record whether they were removed by CMS, stopped paying after a premium increase, or found other coverage. Compare drop-out rates by income band and state against each band's premium change.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An audit of a random sample of people enrolled in 2025 but not 2026, checking each one's income and identity against IRS and Social Security records and recording whether they were removed, stopped paying, or switched coverage, broken out by income band.",
        },
        cost_to_verify:
          "CMS and IRS hold the records; a sample audit is a modest federal study, but no agency has published one.",
        falsification: {
          supporter_flip:
            "If a verified sample showed most 2026 leavers were improperly enrolled or found other coverage, the claim that expiration priced millions of eligible people out would lose its main support.",
          skeptic_flip:
            "If the sample showed most leavers were verified eligible buyers who stopped paying after their premium rose, the claim that the drop reflects fraud cleanup would fail.",
          common_ground:
            "Both sides agree that some enrollees were signed up without their knowledge, often by brokers, that CMS removed people in 2025, and that premiums for buyers above 400% of the poverty line rose the most.",
          live_disagreement:
            "Whether the people who left were mostly eligible buyers who could no longer afford coverage, or mostly people who should not have been enrolled.",
        },
      },
      evidence: [
        {
          id: "enrollment-projection",
          title: "KFF: Paid Enrollment Projected to Fall From 22.3 Million to About 17.5 Million in 2026",
          description:
            "Drawing on federal and state data and Wakely Consulting's estimates, KFF projected average monthly paid enrollment falling from 22.3 million in 2025 to about 17.5 million in 2026, and possibly to 16.5 million, a decline of 17% to 26%. Plan sign-ups fell by over a million to 23.1 million, the sharpest single-year drop since the marketplaces launched. Many people were auto-renewed into plans that cost much more and lost coverage partway through the year when they could not keep paying.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "KFF, 'What We Know So Far About 2026 ACA Marketplace Enrollment, Premiums, and Deductibles' (May 19, 2026); Associated Press via The Philadelphia Inquirer (May 19, 2026)",
          sourceUrl:
            "https://www.kff.org/affordable-care-act/what-we-know-so-far-about-2026-aca-marketplace-enrollment-premiums-and-deductibles/",
          reasoning:
            "The fullest independent estimate of the drop. It is a projection before final federal data, and it counts everyone who left, including people removed as improper, so it measures the size of the fall rather than its cause.",
        },
        {
          id: "cliff-group-left",
          title: "Buyers Above the Cliff Were 7% of Enrollment but 48% of the 2026 Decline",
          description:
            "KFF found that people with incomes of 400-500% of the poverty line, who lost all premium help when the enhanced credits expired, were 3% of 2025 plan selections but accounted for 27% of the drop in sign-ups; their sign-ups fell 44%, by over 321,000 people. Those above 500% accounted for another 21%. Altogether, consumers above the subsidy cliff were 7% of 2025 enrollment but 48% of the decline.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "KFF, 'What We Know So Far About 2026 ACA Marketplace Enrollment, Premiums, and Deductibles' (May 19, 2026)",
          sourceUrl:
            "https://www.kff.org/affordable-care-act/what-we-know-so-far-about-2026-aca-marketplace-enrollment-premiums-and-deductibles/",
          reasoning:
            "The strongest evidence that price drove departures: the group hit hardest by expiration is also the group least affected by zero-premium fraud, which clustered at low incomes. It counts sign-ups, not verified eligibility.",
        },
        {
          id: "premiums-deductibles-2026",
          title: "2026: Average Premium Payment Up 58%, Average Deductible Up 37% as Buyers Shifted to Bronze",
          description:
            "The average monthly net premium marketplace enrollees paid rose 58%, from $113 to $178, less than KFF's earlier projection of 114% for subsidized enrollees keeping the same plan because many moved to bronze plans and those facing the biggest increases left. The average deductible rose 37%, from $2,759 to $3,786, the steepest increase since 2014; it would have risen 6% had buyers kept their 2025 plan mix. Bronze rose from 30% to 40% of selections; silver fell from 57% to 43%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "KFF, 'What We Know So Far About 2026 ACA Marketplace Enrollment, Premiums, and Deductibles' (May 19, 2026)",
          sourceUrl:
            "https://www.kff.org/affordable-care-act/what-we-know-so-far-about-2026-aca-marketplace-enrollment-premiums-and-deductibles/",
          reasoning:
            "Shows those who stayed paid more and took on more risk, a cost the enrollment count alone misses. It describes people still enrolled, so it speaks to affordability more than to who left.",
        },
        {
          id: "new-mexico-backfill",
          title: "New Mexico Replaced the Lost Federal Help and Its Sign-Ups Rose 18%",
          description:
            "Plan selections fell in 41 states in 2026, most sharply in North Carolina (22%) and Ohio (20%). New Mexico's rose 18%, which KFF attributes partly to a state program that backfills the lost federal assistance. State-based exchanges generally kept larger shares of enrollees than the federal exchange.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source:
            "KFF, 'What We Know So Far About 2026 ACA Marketplace Enrollment, Premiums, and Deductibles' (May 19, 2026)",
          sourceUrl:
            "https://www.kff.org/affordable-care-act/what-we-know-so-far-about-2026-aca-marketplace-enrollment-premiums-and-deductibles/",
          reasoning:
            "A natural comparison: where the subsidy survived, enrollment grew. One small state is a thin test, and state-run exchanges may also have had less broker-driven improper enrollment to remove.",
        },
        {
          id: "aspe-improper-removals",
          title: "HHS: The 2.9 Million Fall in Enrollment Matches the Improper Enrollees Removed",
          description:
            "An ASPE issue brief estimated that improper, phantom and fraudulent enrollment \"peaked at 5.6 million people in 2025.\" It attributed the 2.9 million difference between February 2025 and February 2026 paid enrollment to people removed after being found improperly or phantom enrolled, about 1.5 million by CMS and 1.4 million through other integrity measures, and estimated that 2.6 million potentially improper enrollees remained in 2026. February 2026 enrollment of about 19.2 million was higher than every year before 2024.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 4,
            directness: 8,
          },
          source:
            "Nelson, Malani, Colleran, Volkov & Mulligan, HHS Office of the Assistant Secretary for Planning and Evaluation, 'ACA Exchange Enrollment in 2026' (June 26, 2026)",
          sourceUrl: "https://aspe.hhs.gov/reports/aca-exchange-enrollment-2026",
          reasoning:
            "The administration's own analysis, built on federal enrollment records no outside group has. Its improper-enrollment figure is inferred from growth above a 2019 baseline rather than from individual checks, its internal numbers do not fully reconcile, and it comes from an administration that opposed extension, so independence is low.",
        },
        {
          id: "cms-removed-improper",
          title: "CMS: Nearly 1.5 Million Removed in 2025 for Ineligibility or Unauthorized Enrollment",
          description:
            "CMS reported that 23.1 million people selected or were automatically re-enrolled in 2026 coverage, and that in 2025 it took enforcement action ending premium tax credit payments or coverage for nearly 1.5 million people found ineligible for financial assistance or enrolled without authorization on HealthCare.gov.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 6,
          },
          source:
            "Centers for Medicare & Medicaid Services, 'Exchange Coverage Remains Near Record High as 23.1 Million Enroll for 2026' (March 27, 2026)",
          sourceUrl:
            "https://www.cms.gov/newsroom/press-releases/exchange-coverage-remains-near-record-high-23-1-million-enroll-2026-reflecting-continued-strength",
          reasoning:
            "Confirms that unauthorized and ineligible enrollment was real and large. It counts enforcement actions, not how many of those people would have left anyway once their premiums rose.",
        },
        {
          id: "paragon-improper-estimate",
          title: "Paragon: About 6.2 Million 2026 Sign-Ups Were Improper",
          description:
            "Comparing 2026 sign-ups in the 100-150% of poverty band, where enrollees could get zero-premium plans, against Census estimates of how many people in each state are eligible, Paragon estimated \"approximately 6.2 million exchange sign-ups in 2026 were improper,\" roughly 27% of all sign-ups, down from about 6.47 million in 2025, and projected up to $25 billion in improper subsidy payments in 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 3,
            replicability: 5,
            directness: 6,
          },
          source: "Paragon Health Institute, 'The Persistent Obamacare Enrollment Fraud' (June 2026)",
          sourceUrl: "https://paragoninstitute.org/private-health/the-persistent-obamacare-enrollment-fraud/",
          reasoning:
            "A transparent method others can rerun, from the group whose earlier estimates shaped the administration's crackdown. Comparing sign-ups with survey counts can overstate fraud if surveys undercount low-income people, and Paragon campaigned against extension.",
        },
      ],
    },
    {
      id: "what-the-money-buys",
      title: "What Does the Money Buy?",
      short_summary:
        "The Congressional Budget Office scores a permanent extension at about $350 billion over ten years and 3.8 million more insured by 2035. Critics say much of the money flowed to people who had other coverage, rarely used their plans, or were never eligible.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The coverage gain is small for the price. CBO and the Joint Committee on Taxation score a permanent extension at about $350 billion over 2026-2035, for 3.8 million more people insured in 2035. HHS's planners, as Paragon summarizes their June 2026 brief, estimate that about two-thirds of enrollment growth from 2019 to 2026, setting aside improper enrollees, came from people leaving Medicaid or private coverage, which shifts costs to taxpayers rather than covering the uninsured. Paragon counted 35% of 2024 enrollees with no medical claims at all, up from 19% in 2021, and estimates improper subsidies of up to $25 billion in 2026.",
      proponent_rebuttal:
        "The money buys coverage and lower premiums for everyone in the market. CBO projects a permanent extension would insure 3.6 million more people in 2030 and 3.8 million in 2035, and lower gross benchmark premiums by 7.6% a year on average, because healthier people stay in the pool. Subsidized enrollment grew from 9.2 million in 2020 to 21.8 million in 2025. When the credits lapsed, insurers proposed a median 15% increase for 2027, citing the expiration and \"a related increase in the risk pool's morbidity\" as sicker people stayed and healthier ones left.",
      crux: {
        id: "coverage-per-dollar",
        title: "Coverage for the Cost",
        question:
          "How many more people does the subsidy keep insured, and how much goes to people who would have had coverage anyway?",
        description:
          "Both sides accept CBO's scoring as a starting point. One side counts the newly insured and lower premiums for everyone in the market; the other counts the share of spending that went to people who switched from other coverage, never used their plans, or were not eligible. The answer depends on where 2026 leavers went and on claims data for those who stayed.",
        methodology:
          "Follow 2025 subsidized enrollees through 2026 tax and coverage records to see who became uninsured, who moved to employer or Medicaid coverage, and who was found ineligible; compare their 2025 claims with those of people who stayed. Then divide the change in federal spending by the change in the number insured.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Linked 2026 tax-return and coverage records for people subsidized in 2025, showing how many became uninsured versus moved to other coverage, alongside the 2025 claims of those who left, to measure federal spending per person kept insured.",
        },
        cost_to_verify:
          "IRS Form 1095 data and Census surveys for 2026 arrive in 2027; the linked analysis needs federal data access.",
        falsification: {
          supporter_flip:
            "If linked records showed most people who left in 2026 moved to other coverage rather than becoming uninsured, the claim that the subsidy buys coverage worth its cost would weaken sharply.",
          skeptic_flip:
            "If the 2026 Census survey showed the uninsured rate rising by millions and most leavers with prior medical use, the claim that the money mostly paid for unused or redundant coverage would fail.",
          common_ground:
            "Both sides agree that CBO's estimate is the standard score, that some subsidy dollars went to improper enrollees, and that healthier people leaving raises premiums for those who stay.",
          live_disagreement:
            "Whether the subsidy mainly keeps people insured who otherwise would not be, or mainly pays for coverage people had or would have had anyway.",
        },
      },
      evidence: [
        {
          id: "cbo-coverage-gain",
          title: "CBO: A Permanent Extension Would Insure 3.8 Million More by 2035 and Cut Benchmark Premiums 7.6%",
          description:
            "CBO and the Joint Committee on Taxation estimate that permanently extending the enhanced credits would increase the number of people with health insurance by 3.6 million in 2030 and 3.8 million in 2035, and lower gross benchmark premiums by 7.6% on average each year over 2026-2035. Without it, they projected the uninsured would rise by 2.2 million in 2026 and 3.7 million in 2027.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Congressional Research Service, 'Enhanced Premium Tax Credit Expiration: Frequently Asked Questions', R48290 (updated September 24, 2025), reporting CBO and JCT estimates",
          sourceUrl: "https://www.everycrsreport.com/files/2025-09-24_R48290_890be51a7c510348f7bb899dbf5630c78257014e.html",
          reasoning:
            "The nonpartisan standard both parties cite. It is a model projection made before the 2025-26 crackdown on improper enrollment, which may change how many of those insured would be eligible.",
        },
        {
          id: "subsidized-growth",
          title: "Subsidized Enrollment Grew From 9.2 Million in 2020 to 21.8 Million in 2025",
          description:
            "As of February each year, subsidized marketplace enrollment rose from 9.2 million in 2020, 86% of exchange enrollees, to 21.8 million in 2025, 93%, an increase of 137%. Every state except New York had more subsidized enrollees in 2025 than in 2020. The enhanced credits removed the 400% of poverty income limit and lowered the share of income households had to pay.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Congressional Research Service, 'Enhanced Premium Tax Credit Expiration: Frequently Asked Questions', R48290 (updated September 24, 2025)",
          sourceUrl: "https://www.everycrsreport.com/files/2025-09-24_R48290_890be51a7c510348f7bb899dbf5630c78257014e.html",
          reasoning:
            "Shows the scale of what the credits supported. Growth includes the improper enrollment both sides now acknowledge and people who switched from other coverage, so it overstates the coverage gain.",
        },
        {
          id: "premiums-2027",
          title: "2027: Insurers Propose a Median 15% Increase, Citing the Lost Credits and a Sicker Risk Pool",
          description:
            "KFF's review of 276 insurers' filings across all 50 states and DC found a median proposed premium increase of 15% for 2027, after a finalized 20% for 2026. Detailed filings in 16 states and DC cite \"the expiration of enhanced premium tax credits at the end of 2025\" and \"a related increase in the risk pool's morbidity\" among the causes, though \"rising healthcare prices—as in prior years—remain the primary driver of 2027 premium increases.\"",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "KFF, 'How Much and Why ACA Marketplace Premiums Are Going Up in 2027' (July 8, 2026, updated August 3, 2026)",
          sourceUrl:
            "https://www.kff.org/affordable-care-act/how-much-and-why-aca-marketplace-premiums-are-going-up-in-2027/",
          reasoning:
            "Insurers' own filings link expiration to a sicker, costlier pool, the mechanism CBO models. KFF does not say how much of the increase expiration caused, and calls health prices the main driver.",
        },
        {
          id: "cbo-cost",
          title: "CBO: A Permanent Extension Would Add About $350 Billion to Deficits Over Ten Years",
          description:
            "CBO and JCT estimate that permanently extending the enhanced credits would raise direct spending by nearly $296 billion and cut revenues by more than $54 billion over fiscal 2026-2035, adding about $350 billion to deficits, for 3.8 million more people insured in 2035. A three-year extension, as the House passed in January 2026, was scored at about $80.6 billion over ten years.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source:
            "Congressional Research Service, 'Enhanced Premium Tax Credit Expiration: Frequently Asked Questions', R48290 (updated September 24, 2025); The Fiscal Times (January 8, 2026)",
          sourceUrl: "https://www.everycrsreport.com/files/2025-09-24_R48290_890be51a7c510348f7bb899dbf5630c78257014e.html",
          reasoning:
            "The same nonpartisan score supporters cite, read for its price. Whether $350 billion for that coverage gain is worth it is the judgment at issue, but the cost itself is not in dispute.",
        },
        {
          id: "crowd-out",
          title: "HHS Planners: Two-Thirds of Proper Enrollment Growth Since 2019 Came From Other Coverage",
          description:
            "As summarized by Paragon's Brian Blase, the June 2026 ASPE brief found that about two-thirds of exchange enrollment growth from 2019 to 2026, excluding improper enrollees, reflects crowd-out of other coverage, split roughly evenly between Medicaid and private insurance. It also reported that 27.8% of people in zero-premium plans had cancelled coverage by May 2026, more than 80% of them in coverage arranged by an agent or broker.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 7,
          },
          source:
            "Brian Blase, Paragon Health Institute, 'New HHS Report Finds Decline in ACA Enrollment Results From Removal of Improper and Phantom Enrollees' (June 30, 2026), summarizing ASPE (June 26, 2026)",
          sourceUrl:
            "https://paragoninstitute.org/paragon-prognosis/new-hhs-report-finds-decline-in-aca-enrollment-results-from-removal-of-improper-and-phantom-enrollees/",
          reasoning:
            "If right, much of the spending moved people between kinds of coverage rather than insuring the uninsured. It is an advocacy group's reading of an administration brief, and moves from Medicaid may include people who lost Medicaid eligibility rather than people choosing a subsidy over it.",
        },
        {
          id: "zero-claim-enrollees",
          title: "Paragon: 35% of 2024 Enrollees Had No Medical Claims, Up From 19% in 2021",
          description:
            "Paragon reported that in 2024, 35% of exchange enrollees had no medical claims during their enrollment period, no doctor visit, lab test or filled prescription, up from 19% in 2021; among low-income enrollees in zero-premium plans with the richest coverage, 40% had no claims. The figures include anyone enrolled at any point in the year, because CMS did not publish full-year claims data.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 3,
            replicability: 5,
            directness: 5,
          },
          source: "Paragon Health Institute, 'The Persistent Obamacare Enrollment Fraud' (June 2026)",
          sourceUrl: "https://paragoninstitute.org/private-health/the-persistent-obamacare-enrollment-fraud/",
          reasoning:
            "Suggests many subsidized plans were unused, consistent with people enrolled without knowing it. Healthy people who buy insurance and never use it are the point of insurance, and part-year enrollees inflate the share, so the figure does not separate fraud from ordinary healthy enrollees.",
        },
      ],
    },
    {
      id: "who-should-get-help",
      title: "Who Should Get Help?",
      short_summary:
        "Most of the public backed extending the credits in 2025, and the House did so with 17 Republican votes. Opponents say a temporary pandemic measure should not become a permanent subsidy for households well into the middle class.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The enhanced credits were a pandemic measure: the American Rescue Plan created them in 2021 and Congress extended them only through 2025. They removed the income limit altogether, so help reaches households far above 400% of the poverty line. Even the senators negotiating a deal centered it on capping help for households above 700% of poverty and a $5 monthly minimum payment, so that no plan is free. Republican support for extension fell from 59% in September 2025 to 50% two months later.",
      proponent_rebuttal:
        "The public and a bloc of Republicans in Congress back restoring them. In KFF's late-October 2025 poll, 74% favored extension. In January 2026 the House passed a three-year extension 230-196, with 17 Republicans, many from closely divided districts, joining every Democrat. The people who lost the most were those just above the cliff: a 44% fall in sign-ups among people at 400-500% of poverty, who were 3% of enrollees but 27% of the decline.",
      crux: {
        id: "middle-income-help",
        title: "Who Taxpayers Should Help",
        question:
          "Should federal premium help reach middle-income buyers above 400% of poverty, and be permanent rather than temporary?",
        description:
          "Even with the enrollment and cost numbers settled, one side holds that no family should pay more than a fixed share of income for coverage and that the help should be permanent; the other that subsidies should go to lower-income buyers, with the budget and the market's integrity weighed first. The evidence informs the weighing but does not decide it.",
        methodology:
          "Set the measurable pieces side by side: coverage lost and premiums paid by income band, federal cost by band, improper payments under each design, and the effect of caps or minimum payments. Then the reader weighs help for middle-income families against cost and targeting.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Coverage, cost and improper payments by income band can be measured; how much of their income middle-income families should pay before taxpayers help is a judgment about fairness and the budget that no measurement settles.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "The trade-offs can be measured, but no study budget settles the value judgment.",
        falsification: {
          supporter_flip:
            "If help above 400% of poverty went mostly to households that kept coverage without it, some who back the full extension would have to accept a cap or phase-out.",
          skeptic_flip:
            "If capping help at higher incomes left many older middle-income buyers uninsured, and minimum payments ended improper zero-premium enrollment without cutting help, the case for letting the credits lapse would rest on budget priorities alone.",
          common_ground:
            "Both sides agree that improper zero-premium enrollment should be stopped, that buyers just above the old cliff faced the sharpest increases, and that any extension costs tens of billions of dollars.",
          live_disagreement:
            "Whether premium help should be a lasting guarantee that reaches the middle class, or a narrower subsidy for lower-income buyers.",
        },
      },
      evidence: [
        {
          id: "public-backs-extension",
          title: "KFF, Late 2025: 74% Favored Extending the Credits, Including Half of Republicans",
          description:
            "KFF's poll fielded October 27 to November 2, 2025 found 74% of the public favored extending the enhanced ACA tax credits set to expire at year's end, including 50% of Republicans and 44% of MAGA supporters, down from 59% and 57% in September.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source:
            "KFF, 'Poll: Support for Extending the Expiring Enhanced ACA Tax Credits Remains High, but Dips Among Republicans and MAGA Supporters' (November 6, 2025)",
          sourceUrl:
            "https://www.kff.org/affordable-care-act/poll-support-for-extending-the-expiring-enhanced-aca-tax-credits-remains-high-but-dips-among-republicans-and-maga-supporters-as-shutdown-continues-and-partisanship-takes-hold/",
          reasoning:
            "Shows broad public support before the credits lapsed. The fall in Republican support during the shutdown shows partisanship moving opinion, and popularity does not settle who should be subsidized.",
        },
        {
          id: "house-extension-vote",
          title: "January 2026: The House Passed a Three-Year Extension 230-196, With 17 Republicans",
          description:
            "On January 8, 2026 the House voted 230-196 to extend the enhanced credits for three years, after a discharge petition forced the vote; 17 Republicans, many from closely divided districts, joined all Democrats. CBO estimated the bill would add about 4 million insured people by 2028 at a cost of about $80.6 billion over ten years. The Senate had rejected a three-year extension the month before.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 4,
          },
          source: "The Fiscal Times, 'House Passes 3-Year Extension of Obamacare Subsidies' (January 8, 2026)",
          sourceUrl: "https://www.thefiscaltimes.com/2026/01/08/House-Passes-3-Year-Extension-Obamacare-Subsidies",
          reasoning:
            "Shows support crossing party lines among members facing voters in swing districts. A vote is a political signal, not evidence about who benefits.",
        },
        {
          id: "pandemic-measure",
          title: "The Enhanced Credits Began as a 2021 Pandemic Measure and Removed the Income Limit",
          description:
            "The American Rescue Plan Act of 2021 created the enhanced credits, and the 2022 reconciliation act extended them through calendar 2025. They removed the 400% of poverty maximum income for eligibility, leaving only the 100% minimum, reduced the share of income households had to pay at every level, and ended indexing; a household at 200% of poverty paid 2% of income in 2025 and would pay 6.6% in 2026 without them.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Congressional Research Service, 'Enhanced Premium Tax Credit Expiration: Frequently Asked Questions', R48290 (updated September 24, 2025)",
          sourceUrl: "https://www.everycrsreport.com/files/2025-09-24_R48290_890be51a7c510348f7bb899dbf5630c78257014e.html",
          reasoning:
            "Establishes that the credits were written as temporary and open-ended at the top, the opponents' core objection. It also shows how much more lower-income households now pay, which supporters cite.",
        },
        {
          id: "senate-targeting-talks",
          title: "Senate Talks Centered on Capping Help Above 700% of Poverty and a $5 Minimum Payment",
          description:
            "While the House voted, a bipartisan Senate group led by Bernie Moreno and Susan Collins discussed a two-year alternative that would cap assistance for households above 700% of the poverty level, require a $5 minimum monthly payment, and offer a health savings account option in year two. Moreno said the group was in the \"red zone\" and warned: \"It could mean a 95-yard fumble.\" Senate leaders signaled they would not take up the House bill.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source: "The Fiscal Times, 'House Passes 3-Year Extension of Obamacare Subsidies' (January 8, 2026)",
          sourceUrl: "https://www.thefiscaltimes.com/2026/01/08/House-Passes-3-Year-Extension-Obamacare-Subsidies",
          reasoning:
            "Shows that even negotiators open to extension wanted it narrower and tied to anti-fraud rules, which supports the targeting objection. The talks did not produce a law, so the design was never tested.",
        },
      ],
    },
  ],
  references: [
    {
      title: "KFF: What We Know So Far About 2026 ACA Marketplace Enrollment, Premiums, and Deductibles (May 19, 2026)",
      url: "https://www.kff.org/affordable-care-act/what-we-know-so-far-about-2026-aca-marketplace-enrollment-premiums-and-deductibles/",
    },
    {
      title: "HHS ASPE: ACA Exchange Enrollment in 2026 (June 26, 2026)",
      url: "https://aspe.hhs.gov/reports/aca-exchange-enrollment-2026",
    },
    {
      title: "Congressional Research Service: Enhanced Premium Tax Credit Expiration, FAQ (R48290, September 24, 2025)",
      url: "https://www.everycrsreport.com/files/2025-09-24_R48290_890be51a7c510348f7bb899dbf5630c78257014e.html",
    },
  ],
};
