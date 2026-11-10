export const medicaidWorkRequirementsData = {
  id: "medicaid-work-requirements",
  title: "Medicaid Work Requirements",
  question: "Do Medicaid work requirements promote work without costing eligible people their coverage?",
  meta_claim:
    "Requiring working-age adults in Medicaid's expansion group to log 80 hours a month of work, training, school or community service is sound policy: it moves people toward jobs and targets coverage to those it is meant for, without large coverage losses among people who qualify.",
  status: "contested" as const,
  category: "policy" as const,
  last_updated: "2026-11-03",
  tags: ["medicaid", "health-insurance", "work-requirements", "safety-net", "welfare"],
  aliases: ["Medicaid community engagement requirements", "Medicaid 80-hour rule"],
  // ── The lede: two facts both sides accept, then what the fight is over ──
  keystone_fact: {
    statement:
      "The 2025 budget law requires adults in Medicaid's expansion group to log 80 hours a month of work, job training, school or community service, or qualify for an exemption, in every state that expanded Medicaid by January 1, 2027. In Nebraska, the first state to enforce it, 93% of the 7,280 renewals checked in July and August 2026 kept coverage and 7% lost it, nearly all of those for not answering a verification request. The fight is over whether the rule moves people into work or mainly removes people through paperwork, and whether coverage should be tied to work at all.",
    confidence: 85,
    source:
      "KFF, 'A Closer Look at the Work Requirement Provisions in the 2025 Federal Budget Reconciliation Law' (July 2025); KFF, 'Early Medicaid Work Requirement Insights From Nebraska' (September 29, 2026)",
    sourceUrl: "https://www.kff.org/medicaid/early-medicaid-work-requirement-insights-from-nebraska/",
  },
  // ── The summary above the crux sheet: what the map turns on ──
  simple_case: [
    "Both sides accept that most adults on Medicaid already work or face a barrier such as caregiving, illness or school, that the federal rule takes effect in every expansion state by January 2027, and that the people who lose coverage under it mostly lose it for not answering a request rather than after being found out of compliance.",
    "They split over whether the requirement will move a meaningful number of enrollees into jobs, as welfare-to-work programs did for cash assistance, or leave employment unchanged as in Arkansas; over whether the people dropped are mostly people who no longer qualify or eligible workers tripped up by paperwork; and over whether public health coverage for working-age adults should carry a work condition at all.",
    "The first two are questions that state data from 2027 can answer; the last is a weighing of reciprocity against need that the numbers inform but do not decide.",
  ],
  pillars: [
    {
      id: "employment-effect",
      title: "Does It Raise Employment?",
      short_summary:
        "Supporters point to welfare-to-work experiments and to the many enrollees who do not log 80 hours in a given month; critics point to Arkansas and SNAP, where requirements cut enrollment but did not measurably raise work.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The one Medicaid test so far found no job gains. A survey study in the New England Journal of Medicine found Arkansas's 2018 requirement was followed by significant coverage losses and no significant change in employment among adults 30 to 49, and more than 95% of the targeted group already appeared to meet the rule or qualify for an exemption. A regression-discontinuity study of SNAP's work rule found it raised exits from the program by 23 percentage points with no effect on employment. KFF's analysis of 2023 Census data finds 92% of adult enrollees not on disability benefits were working (64%) or not working because of caregiving, illness, disability or school, which leaves little room for a large employment response.",
      proponent_rebuttal:
        "The annual figures overstate how many enrollees work enough to comply. Measured month by month, as the rule is, only 44% of non-disabled Medicaid recipients without children worked at least 80 hours in December 2022, against 72% of similar adults not on Medicaid. Where requirements have come with clear expectations and job supports they have moved people into work: three randomized welfare-to-work trials raised employment by 4.2 percentage points over five years, and Alabama's 2018 expansion of TANF work rules raised employment among affected parents by 11 percentage points. Arkansas relied on monthly online reports and was halted by a court within a year, a thin test of a national program that can verify work with records states already hold.",
      crux: {
        id: "work-response",
        title: "The Employment Response",
        question: "Will the requirement move a meaningful number of Medicaid enrollees into jobs?",
        description:
          "Supporters expect the requirement to raise work among adults who are able to work but do not, as welfare-to-work rules did in cash assistance; critics expect it to leave employment unchanged, as in Arkansas, because most enrollees already work or face real barriers. The answer depends on how many enrollees fall short of 80 hours a month and whether the requirement changes their behavior rather than their enrollment.",
        methodology:
          "Compare employment and earnings of expansion adults subject to the requirement with similar adults who are not (exempt age groups, parents of younger children, or states on different start dates), using state wage records linked to Medicaid enrollment from 2027 on. Track people who leave Medicaid as well as those who stay, so that exits are not mistaken for job gains.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "State unemployment-insurance wage records linked to Medicaid enrollment for 2026 to 2029, comparing expansion adults subject to the 80-hour rule with exempt groups and later-starting states, and following people after they leave the program.",
        },
        cost_to_verify:
          "Linked wage and enrollment records exist in every state; independent researchers need data-use agreements to run the comparison.",
        falsification: {
          supporter_flip:
            "If linked state wage records showed no rise in employment or earnings among adults subject to the rule against exempt groups in 2027 and 2028, as in Arkansas, the case that the requirement moves people into work would fall away.",
          skeptic_flip:
            "If adults subject to the rule showed employment gains of several percentage points against comparable exempt groups, on the scale of the welfare-to-work trials, the claim that work requirements only cut enrollment would no longer hold for Medicaid.",
          common_ground:
            "Both sides agree that most adult enrollees already work or face a barrier such as caregiving, illness or school, and that requirements tied to job supports have done better in past programs than requirements alone.",
          live_disagreement:
            "Whether the share of enrollees who fall short of 80 hours in a month is large and able to respond, or mostly people with irregular hours and real barriers whom the rule will drop rather than employ.",
        },
      },
      evidence: [
        {
          id: "welfare-to-work-trials",
          title: "Welfare-to-Work Trials Raised Employment",
          description:
            "An HHS ASPE analysis (June 2026) cites three randomized trials from the National Evaluation of Welfare-to-Work Strategies that found work requirements raised employment by 4.2 percentage points over five years relative to unconditional cash, and a 2023 analysis of Alabama's 2018 expansion of TANF work rules that found an 11-percentage-point employment increase among affected parents. It concludes that work requirements are most likely to raise employment when they combine clear expectations with supports.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 7,
            directness: 5,
          },
          source:
            "HHS Office of the Assistant Secretary for Planning and Evaluation, 'Medicaid Work Requirements Incentivize Employment and Are Estimated to Reduce Poverty' (June 1, 2026)",
          sourceUrl:
            "https://aspe.hhs.gov/reports/medicaid-work-requirements-should-incentivize-employment-reduce-poverty",
          reasoning:
            "The underlying trials are randomized and replicated, which earns replicability. But the report comes from the administration implementing the rule, which lowers independence, and the evidence is from cash welfare, where losing benefits means losing income, not health coverage, so directness to Medicaid is moderate. Even the Arkansas authors note welfare-era requirements produced modest, short-term employment gains.",
        },
        {
          id: "monthly-hours-gap",
          title: "Under Half of Childless Non-Disabled Enrollees Logged 80 Hours in a Month",
          description:
            "Kevin Corinth's analysis of the 2023 Survey of Income and Program Participation finds that in December 2022, 44% of non-disabled working-age Medicaid recipients without children worked at least 80 hours, against 72% of similar adults not on Medicaid; among ages 25 to 54 the shares were 51% and 84%. He measures work month by month because the requirement is monthly, while analyses that find most enrollees working count anyone who worked at some point in the year.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          source:
            "Kevin Corinth, American Enterprise Institute, 'Less Than Half of Medicaid Recipients Work Enough to Comply With a Work Requirement' (February 28, 2025)",
          sourceUrl:
            "https://www.aei.org/opportunity-social-mobility/less-than-half-of-medicaid-recipients-work-enough-to-comply-with-a-work-requirement/",
          reasoning:
            "Public federal survey data with a stated method, from an economist at a think tank that supports the policy. It shows room for an employment response, not that the response will happen: a gap in monthly hours can also mean irregular low-wage schedules the rule would penalize. It covers adults without children, a subset of those subject to the rule.",
        },
        {
          id: "arkansas-no-employment-change",
          title: "Arkansas: Coverage Fell, Employment Did Not Change",
          description:
            "Sommers and colleagues surveyed low-income adults in Arkansas and three comparison states. After Arkansas began requiring 80 hours a month from adults 30 to 49 in June 2018, Medicaid or marketplace coverage in that group fell from 70.5% in 2016 to 63.7% in 2018, and the uninsured rate rose from 10.5% to 14.5%, with no significant change in employment. More than 95% of the target population appeared to meet the requirement or qualify for an exemption, and lack of awareness and confusion about reporting were common.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source:
            "Sommers, Goldman, Blendon, Orav & Epstein, 'Medicaid Work Requirements — Results from the First Year in Arkansas', New England Journal of Medicine 381(11), 1073-1082 (2019)",
          sourceUrl: "https://doi.org/10.1056/NEJMsr1901772",
          reasoning:
            "Peer-reviewed difference-in-differences study of the only Medicaid work requirement enforced before 2026, so directness is high. A telephone survey over the first six months of a program halted by a court in 2019 limits replicability, and the program relied on monthly online reports, so its losses may not carry over to designs that verify work with existing records.",
        },
        {
          id: "snap-work-rule-exits",
          title: "SNAP Work Rule Raised Exits but Not Employment",
          description:
            "Using linked administrative SNAP and earnings records and a regression-discontinuity design, Gray, Leive, Prager, Pukelis and Zaki find SNAP's work requirement for able-bodied adults without dependents raised exits among current participants by 23 percentage points (64%) and cut participation among those subject to it by 53%, with no effect on employment and suggestive evidence of higher earnings in some specifications. Homeless adults were disproportionately screened out.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "Gray, Leive, Prager, Pukelis & Zaki, 'Employed in a SNAP? The Impact of Work Requirements on Program Participation and Labor Supply', American Economic Journal: Economic Policy 15(1), 306-41 (2023)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/pol.20200561",
          reasoning:
            "A strong causal design on administrative data in a top economics journal. SNAP is a food benefit, not health coverage, and its work rule applies to a narrower group, so directness to Medicaid is moderate.",
        },
        {
          id: "most-enrollees-work",
          title: "92% of Adult Enrollees Work or Face a Barrier",
          description:
            "KFF's analysis of the March 2024 Current Population Survey finds that among Medicaid adults ages 19 to 64 who do not receive SSI or SSDI and are not on Medicare, 92% in 2023 were working full or part time (64%) or were not working because of caregiving, illness or disability, or school. The remaining 8% were retired, unable to find work, or not working for another reason.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "KFF, 'Understanding the Intersection of Medicaid and Work: An Update' (May 30, 2025)",
          sourceUrl: "https://www.kff.org/medicaid/understanding-the-intersection-of-medicaid-and-work-an-update/",
          reasoning:
            "Census survey data with a transparent method. It counts work over a year, which the monthly analysis argues overstates compliance, and it does not show whether the barriers would qualify for the law's exemptions; so it bounds the possible employment response rather than measuring it.",
        },
      ],
    },
    {
      id: "coverage-losses",
      title: "Who Loses Coverage?",
      short_summary:
        "Everyone expects enrollment to fall. The dispute is whether the people who leave are mostly people who no longer qualify, or eligible workers and exempt people lost to notices and documentation.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "The losses come from paperwork, not from people refusing to work. In Arkansas more than 18,000 people lost coverage, and about 70% of enrollees who had to report neither got an exemption nor reported compliance, though nearly all appeared to qualify. In Nebraska's first months, 92% of renewal losses and 84% of application denials came from people not responding to requests for information. Georgia's Pathways program enrolled about 7,000 people in 18 months against a first-year projection of 25,000, at a cost of more than $86 million by the end of 2024. CBO estimates the federal requirement alone will add more than 5 million uninsured people by 2034.",
      proponent_rebuttal:
        "A rule built on data matching and exemptions need not repeat Arkansas. Nebraska, enforcing the requirement since May 2026, found that 93% of renewals subject to it kept coverage, 57% through an exclusion, 34% by meeting the work standard and 2% through a short-term hardship exception, and 7% lost it. Among new applicants 85% met the work standard or qualified for an exclusion. Someone who does not answer a request may have a job with employer coverage, may have moved, or may no longer qualify; non-response is not proof of eligibility. Losses can be cut further by checking wage and benefit records before asking enrollees for anything.",
      crux: {
        id: "eligible-lost",
        title: "Paperwork or Ineligibility",
        question: "Are the people who lose coverage mostly ineligible, or eligible people lost to paperwork?",
        description:
          "Most people who lose coverage under a work requirement lose it for not responding to a notice. Whether that is a failure of the policy depends on who they are: people with jobs, other coverage or no remaining eligibility, or people who worked or were exempt but could not prove it in time.",
        methodology:
          "Follow a sample of people disenrolled or denied for non-response: link them to state wage records, other coverage and exemption criteria such as disability or caregiving, and survey them. Measure the share who met the work standard or an exemption at the time they were dropped, and how many re-enroll within a year.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Linked state wage, coverage and disability records for people dropped or denied for non-response in Nebraska and the 2027 states, showing what share met 80 hours or an exemption when they lost coverage and how many came back within a year.",
        },
        cost_to_verify:
          "State administrative data exist; a linked follow-up study of disenrollees needs state cooperation and a survey budget.",
        falsification: {
          supporter_flip:
            "If linked records showed that most people dropped for non-response in 2026 and 2027 had worked 80 hours or met an exemption at the time, and many re-enrolled within months, the claim that the rule removes few eligible people would fail.",
          skeptic_flip:
            "If most people dropped for non-response turned out to have employer coverage, higher incomes or no remaining eligibility, the coverage losses would read as the rule working as intended rather than as eligible people lost to paperwork.",
          common_ground:
            "Both sides agree that most people who lose coverage under a work requirement lose it for not answering a request, and that using wage and benefit data the state already holds reduces how many must report.",
          live_disagreement:
            "Who the non-responders are: people who no longer need or qualify for Medicaid, or working and exempt people who missed or could not meet a documentation demand.",
        },
      },
      evidence: [
        {
          id: "nebraska-renewals-kept",
          title: "Nebraska: 93% of Renewals Kept Coverage Under the Rule",
          description:
            "Of 7,280 Nebraska renewals subject to the requirement from July to mid-August 2026, 34% met the work activities, 57% qualified for an exclusion, 2% had a short-term hardship exception and 7% (533 people) lost coverage. Of 4,089 new applications that needed a work determination from May to August, 46% met the work activities, 39% qualified for an exclusion and 14% (557) were denied. Nebraska relies partly on self-declaration forms, which federal rules allow through 2027.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source: "KFF, 'Early Medicaid Work Requirement Insights From Nebraska' (September 29, 2026), from state data presented to Nebraska's Medicaid Advisory Committee",
          sourceUrl: "https://www.kff.org/medicaid/early-medicaid-work-requirement-insights-from-nebraska/",
          reasoning:
            "The first operating data under the federal design, read by an independent analyst. It covers one state over its first months, partly on self-declaration that ends in 2028, so it may not predict losses once documentation is required.",
        },
        {
          id: "nebraska-nonresponse",
          title: "Nebraska: Non-Response Drove Nearly All Losses",
          description:
            "In the same Nebraska data, 92% of the 533 people who lost coverage at renewal did not respond to verification requests and 8% were found noncompliant; 84% of the 557 denied applications were denied for not responding to requests for more information. KFF writes that it remains unclear whether these people were ineligible, unaware they needed to provide information, or had difficulty documenting an exclusion or work.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source: "KFF, 'Early Medicaid Work Requirement Insights From Nebraska' (September 29, 2026)",
          sourceUrl: "https://www.kff.org/medicaid/early-medicaid-work-requirement-insights-from-nebraska/",
          reasoning:
            "Shows that losses run through paperwork rather than findings of noncompliance, but by KFF's own account it does not show that the people dropped were eligible, which is the crux. Early data from one state.",
        },
        {
          id: "arkansas-18000",
          title: "Arkansas Removed 18,000 People in 2018",
          description:
            "Arkansas's 2018 work requirement led to more than 18,000 people losing coverage before a court halted it. Among enrollees who had to actively report, about 70% neither obtained an exemption nor reported compliance. The NEJM evaluation found more than 95% of the targeted age group appeared to meet the requirement or qualify for an exemption.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "KFF, 'Implementing Work Requirements on a National Scale: What We Know from State Waiver Experience' (May 20, 2025); Sommers et al., NEJM (2019)",
          sourceUrl:
            "https://www.kff.org/medicaid/implementing-work-requirements-on-a-national-scale-what-we-know-from-state-waiver-experience/",
          reasoning:
            "Based on state records and the peer-reviewed Arkansas evaluation. Arkansas required monthly online reports, so the scale of loss may not carry over to states that verify work with records they already hold.",
        },
        {
          id: "georgia-pathways-enrollment",
          title: "Georgia Pathways Enrolled About 7,000 Against 25,000 Projected",
          description:
            "Georgia's Pathways program, which ties expanded eligibility to work, enrolled about 7,000 people over 18 months against the state's projection of about 25,000 in the first year and 64,000 over five years. ProPublica found it had cost federal and state governments more than $86 million by the end of 2024, about three-quarters of it on consultants.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "KFF, 'Implementing Work Requirements on a National Scale: What We Know from State Waiver Experience' (May 20, 2025), citing state data and ProPublica",
          sourceUrl:
            "https://www.kff.org/medicaid/implementing-work-requirements-on-a-national-scale-what-we-know-from-state-waiver-experience/",
          reasoning:
            "Shows the administrative burden of verifying work, but Georgia did not expand Medicaid fully and requires work before enrollment, so low enrollment measures people who never joined rather than people dropped.",
        },
        {
          id: "cbo-uninsured",
          title: "CBO: The Requirement Alone Adds Over 5 Million Uninsured by 2034",
          description:
            "CBO estimates the 2025 law's Medicaid changes would leave 7.5 million more people uninsured, with the work requirement alone adding more than 5 million uninsured people by 2034. Twenty-four states, counting DC, have sued over parts of the federal rule, including its definition of medical frailty.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 5,
            directness: 7,
          },
          source: "KFF, 'Midterm Election Update: Medicaid Changes' (October 21, 2026), citing Congressional Budget Office estimates",
          sourceUrl: "https://www.kff.org/elections/midterm-election-update-medicaid-changes/",
          reasoning:
            "CBO is nonpartisan and its estimate is the official scoring of the law. It is a projection that does not separate eligible from ineligible people losing coverage, so it sizes the losses without settling who they are.",
        },
      ],
    },
    {
      id: "conditioning-coverage",
      title: "Should Coverage Depend on Work?",
      short_summary:
        "Underneath the data sits a value question: whether public health coverage for working-age adults should carry a reciprocal obligation, or be given on need alone.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Health coverage is not a cash benefit that can be traded for work effort. Losing it means delayed care, medical debt and, in the research, more deaths: Medicaid expansion reduced annual mortality among near-elderly adults likely to gain coverage by 9.4%. A work condition makes coverage depend on a person's hours in a given month in jobs with irregular schedules. Public support for the requirement collapses once people hear about the paperwork: in KFF's June 2025 poll it fell from 68% to as low as 35%.",
      proponent_rebuttal:
        "Expansion adults qualify by income, not disability, and asking those able to work, train, study or volunteer part time in return for publicly funded coverage is a fair condition that most Americans support: 68% did in KFF's poll before any argument was put to them. Exemptions cover parents of children 13 and under, pregnant women, the medically frail and others. The requirement reduces federal Medicaid spending by an estimated $326 billion over ten years, money that otherwise comes from taxpayers who work.",
      crux: {
        id: "reciprocity-vs-need",
        title: "Reciprocity Against Need",
        question: "Should public health coverage for working-age adults be conditioned on work at all?",
        description:
          "Even with every number known, one side holds that publicly funded coverage for able-bodied adults should carry a reciprocal obligation, and the other that health coverage should follow need, since its loss costs health and lives. The data on employment and coverage losses inform this weighing but do not decide it.",
        methodology:
          "Lay out the trade-off with the best available numbers: employment gained, coverage lost among eligible and ineligible people, the health effects of losing coverage, and the money saved. Then the reader weighs reciprocity, fairness to taxpayers and the value of coverage.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Employment gains, coverage losses, health effects and budget savings can each be measured. How much a reciprocal obligation should count against the health cost of losing coverage, and against fairness to taxpayers who fund it, is a weighing of values that no measurement settles.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "The trade-offs can be measured, but no study budget settles the value judgment.",
        falsification: {
          supporter_flip:
            "If the rule produced no employment gain and most people it dropped were eligible, many who back it on reciprocity grounds would have to weigh an obligation that buys no work against coverage lost by people who met it.",
          skeptic_flip:
            "If the rule raised employment and the people it dropped were mostly those who no longer qualified, conditioning coverage on work would be harder to call a cut in disguise, though some would still oppose it on principle.",
          common_ground:
            "Both sides agree that people unable to work, such as the medically frail and caregivers of young children, should be exempt, and that losing coverage carries real health and financial costs.",
          live_disagreement:
            "Whether a work condition is a fair reciprocal obligation attached to publicly funded coverage, or a condition that health coverage, unlike cash aid, should not carry.",
        },
      },
      evidence: [
        {
          id: "poll-initial-support",
          title: "68% of Adults Backed Work Requirements Before Hearing Arguments",
          description:
            "KFF's June 2025 poll found 68% of the public, including nine in ten Republicans and MAGA supporters, supported Medicaid work requirements as described in the House bill. When initial opponents heard that the requirements could save money to help fund Medicaid for the elderly, people with disabilities and low-income children, overall support rose to 79%; KFF noted that this argument is not factually accurate.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "KFF Health Tracking Poll, 'Views of the One Big Beautiful Bill' (June 17, 2025)",
          sourceUrl:
            "https://www.kff.org/medicaid/poll-finding/kff-health-tracking-poll-views-of-the-one-big-beautiful-bill/",
          reasoning:
            "A reputable national poll showing that the reciprocity principle has broad support. Popularity does not settle a value question, and results move sharply with wording, so directness is low.",
        },
        {
          id: "federal-savings",
          title: "Requirement Cuts Federal Medicaid Spending by $326 Billion",
          description:
            "CBO estimates the work requirement reduces federal Medicaid spending by $326 billion over ten years, the largest share of the law's Medicaid savings. The law requires 80 hours a month of work or community service from expansion adults, with exemptions including parents and caretakers of children 13 and under, people who are medically frail, and people who are pregnant or postpartum.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 4,
          },
          source:
            "KFF, 'A Closer Look at the Work Requirement Provisions in the 2025 Federal Budget Reconciliation Law' (July 30, 2025), citing CBO",
          sourceUrl:
            "https://www.kff.org/medicaid/a-closer-look-at-the-work-requirement-provisions-in-the-2025-federal-budget-reconciliation-law/",
          reasoning:
            "Official nonpartisan scoring. The savings come mostly from people leaving Medicaid, so the same figure that supporters read as fiscal restraint critics read as coverage lost; it bears on the value weighing only as one side's cost.",
        },
        {
          id: "medicaid-mortality",
          title: "Medicaid Expansion Cut Mortality 9.4% Among Near-Elderly Adults",
          description:
            "Linking survey responses to death records, Miller, Johnson and Wherry find that near-elderly adults likely to gain coverage in Medicaid expansion states saw a 0.132-percentage-point decline in annual mortality, a 9.4% reduction over the sample mean, driven by fewer disease-related deaths and growing over time.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Miller, Johnson & Wherry, 'Medicaid and Mortality: New Evidence From Linked Survey and Administrative Data', Quarterly Journal of Economics 136(3), 1783-1829 (2021); NBER Working Paper 26081",
          sourceUrl: "https://www.nber.org/papers/w26081",
          reasoning:
            "A leading causal study of what coverage is worth, published in a top journal. It measures the effect of gaining Medicaid among older low-income adults, not the effect of losing it under a work rule, and many people subject to the rule are younger.",
        },
        {
          id: "poll-paperwork-drop",
          title: "Support Falls to 35% After Hearing About Paperwork Losses",
          description:
            "In the same KFF poll, when supporters heard that most people on Medicaid already work and that many could lose coverage because of difficulty completing the paperwork to prove eligibility, about half changed their view and support fell as low as 35%. Hearing that the requirements would not significantly affect employment but would raise state administrative costs brought support to 40%.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "KFF Health Tracking Poll, 'Views of the One Big Beautiful Bill' (June 17, 2025)",
          sourceUrl:
            "https://www.kff.org/medicaid/poll-finding/kff-health-tracking-poll-views-of-the-one-big-beautiful-bill/",
          reasoning:
            "Shows that public support depends on beliefs about coverage losses and employment, the empirical cruxes above. Like the support figure, it reflects wording, so it informs rather than settles the value question.",
        },
      ],
    },
  ],
  references: [
    {
      title: "KFF: Implementing Work Requirements on a National Scale: What We Know from State Waiver Experience",
      url: "https://www.kff.org/medicaid/implementing-work-requirements-on-a-national-scale-what-we-know-from-state-waiver-experience/",
    },
    {
      title: "KFF: Midterm Election Update: Medicaid Changes (October 2026)",
      url: "https://www.kff.org/elections/midterm-election-update-medicaid-changes/",
    },
  ],
};
