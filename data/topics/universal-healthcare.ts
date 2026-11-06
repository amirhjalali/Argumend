export const universalHealthcareData = {
  id: "universal-healthcare",
  title: "Universal Healthcare in the US",
  aliases: [
    "Should the US replace employer-based insurance with universal healthcare?",
    "Universal medical coverage",
    "Medicare for All",
    "Single-payer health care",
    // Words readers use for this question that the map's own text does not.
    "Would universal healthcare mean waiting months to see a specialist?",
  ],
  question: "Should the US switch to universal healthcare, like Medicare for All?",
  meta_claim:
    "The United States should guarantee health coverage to everyone through a universal system, such as a single public plan, replacing most job-based and private insurance.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: CMS put 2024 national health spending at $5.3
  // trillion (18.0% of GDP, $15,474 per person); Census counted 26.7 million
  // uninsured for all of 2025 (released 15 September 2026); the enhanced ACA
  // tax credits expired at the end of 2025 and marketplace enrollees' premium
  // payments rose 58% (KFF, 19 May 2026); KFF's September 2026 poll found 66%
  // favor a national health plan, its highest reading.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "The US spent $5.3 trillion on health care in 2024, $15,474 a person and 18% of the economy, about twice what similar rich countries spend per person. Its life expectancy, 79.0 years, was 3.7 years below theirs, and 26.7 million Americans went all of 2025 uninsured. The fight is over whether one plan for everyone would buy more health for less money, and what it would cost in taxes, waits and the job-based plans that cover about half the country.",
    confidence: 93,
    source:
      "CMS, National Health Expenditure Fact Sheet (2024 data); Peterson-KFF Health System Tracker (March 2026); US Census Bureau, Health Insurance Coverage in the United States: 2025 (15 September 2026)",
    sourceUrl:
      "https://www.cms.gov/data-research/statistics-trends-and-reports/national-health-expenditure-data/nhe-fact-sheet",
  },
  simple_case: [
    "The question is live again: the extra ACA premium help expired at the end of 2025, marketplace enrollees' payments rose 58% in 2026, and in September 2026 two in three Americans told KFF they favor a national health plan, the most it has recorded.",
    "Four disputes decide it: how much of America's health gap the health system causes, whether insurance makes people healthier, whether one payer would cut total costs, and whether households would trade their current plans and premiums for higher taxes. The first three can be measured; the last is a choice about government's role.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The outcome gap. Is it the health system? (what we know)
    // =========================================================================
    {
      id: "quality-access",
      title: "The Outcome Gap: Is It the Health System?",
      short_summary:
        "Americans live 3.7 fewer years than people in similar rich countries, while the US spends nearly twice as much per person. But much of the gap comes from deaths under 50, from overdoses, homicide, car crashes and chronic disease, and the US matches or beats its peers on some treatment results, such as surviving a heart attack or cancer.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The life-expectancy gap is real, but it is mostly not a health-insurance gap. In 2021 Americans under 70 died of drug and alcohol use at four times the peer rate and of homicide at nearly eight times; young adults died in crashes and other travel accidents at more than triple the peer rate. Medicare for All would not stop overdoses, shootings or car crashes. Where care itself is measured, the US does well: in 2022 its 30-day death rates after a heart attack or stroke were lower than in peer nations, and CONCORD-3 put US five-year breast cancer survival close to 90%, among the highest in the world. Replacing the system to fix problems it does not cause risks the part that works.",
      proponent_rebuttal:
        "The US trails every peer on life expectancy, 79.0 years against an average of 82.7 in 2024, while spending nearly twice as much per person, and both men and women live shorter lives than in every comparison country. About a third of the gap in early deaths comes from heart, lung and kidney disease, which are exactly what regular primary care, blood-pressure pills and insulin manage, and access to them depends on coverage. Diabetes deaths under 70 ran about 2.5 times the peer rate and kidney disease deaths 3.8 times. Good survival once a heart attack patient reaches the hospital, or once cancer is diagnosed, says nothing about the millions who are diagnosed late or never because they could not afford a doctor. Canada's cancer survival also ranks among the world's highest, under a single public payer, so the US advantage is not a product of private insurance.",
      crux: {
        id: "outcomes-comparison",
        title: "The Outcome Gap Test",
        question:
          "How much of the US health gap comes from how care is paid for, versus overdoses, violence and obesity?",
        description:
          "Split the US shortfall in life expectancy into deaths that timely medical care prevents (treatable heart disease, diabetes, kidney failure, early cancers) and deaths medicine cannot reach (overdoses, homicide, crashes), and see how much of the first part tracks gaps in coverage and cost.",
        methodology:
          "Decompose the US-peer gap in deaths under 75 by cause using OECD and CDC mortality data; compare treatable mortality between insured and uninsured Americans of the same age and income; check whether the gap narrows at age 65, when nearly everyone gains Medicare.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Cause-by-cause comparisons of US and peer-country deaths under 75, separating deaths that timely care prevents from overdoses, homicides and crashes, alongside tracking of whether treatable deaths among Americans fall at 65, when nearly all gain Medicare.",
        },
        cost_to_verify: "$200K (analysis of existing mortality data)",
        falsification: {
          supporter_flip:
            "If the cause-by-cause numbers showed most of the US shortfall coming from overdoses, violence and crashes, and treatable deaths not falling when Americans gain Medicare at 65, the claim that the financing system drives the gap would lose most of its force.",
          skeptic_flip:
            "If deaths from treatable heart, kidney and diabetic disease made up most of the gap and fell sharply when people gained coverage, the view that the gap is about lifestyle and violence rather than the health system would be hard to hold.",
          common_ground:
            "Both sides agree the US spends far more than peer countries and has lower life expectancy, and that some US treatment results, such as heart-attack and cancer survival, are among the best in the world.",
          live_disagreement:
            "How much of the gap a different way of paying for care could close, given that overdoses, violence and crashes account for a large share and chronic disease sits between medicine and lifestyle.",
        },
      },
      evidence: [
        {
          id: "oecd-health-outcomes",
          title: "Peterson-KFF 2026: US Life Expectancy 79.0 Years in 2024, 3.7 Years Below Peers",
          description:
            "US life expectancy at birth rose from 78.4 years in 2023 to 79.0 in 2024, its highest ever, while the average across 11 comparable wealthy countries was 82.7 years. The gap narrowed from 4.1 years in 2023, mostly because US death rates from overdoses, COVID-19 and several chronic diseases fell. The US has the lowest life expectancy of the group while spending nearly twice as much per person, and both US men and women live shorter lives than in every comparison country.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source:
            "Peterson-KFF Health System Tracker, 'How does U.S. life expectancy compare to other countries?' (31 March 2026)",
          sourceUrl:
            "https://www.healthsystemtracker.org/chart-collection/u-s-life-expectancy-compare-countries/",
          reasoning:
            "The size of the gap is not in dispute. Life expectancy reflects income, diet, drugs and violence as well as medical care, and the tracker itself notes the health system is not the only driver, so directness is moderate.",
        },
        {
          id: "premature-death-causes",
          title: "Peterson-KFF 2025: Chronic Disease Was 32% of the Early-Death Gap; Overdoses and Homicide Ran 4 to 8 Times Peer Rates",
          description:
            "In 2021, cardiovascular, chronic respiratory and kidney diseases made up about a third (32%) of the difference in deaths before 70 between the US and peers, COVID-19 24% and substance use 12%. US deaths under 70 from drug and alcohol use were four times the peer rate (28.6 vs 6.4 per 100,000), homicide nearly eight times, diabetes about 2.5 times and kidney disease about 3.8 times. Young adults died in crashes and other travel accidents at more than triple the peer rate.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Peterson-KFF Health System Tracker, 'What drives differences in life expectancy between the U.S. and comparable countries?' (14 February 2025)",
          sourceUrl:
            "https://www.healthsystemtracker.org/chart-collection/what-drives-differences-in-life-expectancy-between-the-u-s-and-comparable-countries/",
          reasoning:
            "Shows that a large share of the gap comes from causes coverage cannot reach, which supports the skeptic. The chronic-disease third is where coverage could matter, and the data are from 2021, a COVID year, so both sides draw on it.",
        },
        {
          id: "us-treatment-outcomes",
          title: "Peterson-KFF 2026: US Heart-Attack and Stroke Death Rates After Admission Lower Than Peers",
          description:
            "In 2022, 30-day mortality after hospital admission for heart attacks and strokes was lower in the US than in peer nations on average. The US had the third-lowest rate of pulmonary embolism after hip or knee surgery among peers. The tracker concludes the US 'performs similarly to or better than peer nations in other measures of treatment outcomes.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Peterson-KFF Health System Tracker, 'How does the quality of the U.S. health system compare to other countries?' (23 October 2026)",
          sourceUrl:
            "https://www.healthsystemtracker.org/chart-collection/quality-u-s-healthcare-system-compare-countries/",
          reasoning:
            "Real evidence that US hospital care is strong once patients arrive. It measures people who reached a hospital, not those who delayed care or never got there, which is the access question.",
        },
        {
          id: "us-cancer-survival",
          title: "CONCORD-3 2018: US Breast Cancer Survival Close to 90%, Among the Highest in the World",
          description:
            "The global CONCORD-3 study of cancer patients diagnosed from 2000 to 2014 found predicted five-year survival for women diagnosed with breast cancer in 2010-2014 'close to 90% in the US and in Australia,' and that five-year survival for most cancers 'remains among the highest in the world in the US and Canada.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source:
            "Allemani et al., 'Global surveillance of trends in cancer survival 2000-14 (CONCORD-3),' The Lancet (2018)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5879496/",
          reasoning:
            "A genuine US strength. It cuts both ways: Canada, with a single public payer, ranks alongside the US, and survival figures can be raised by earlier detection without fewer deaths.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Does coverage make people healthier? (mechanism)
    // =========================================================================
    {
      id: "coverage-and-health",
      title: "Does Insurance Make People Healthier?",
      short_summary:
        "Universal coverage rests on the idea that insurance saves lives and money. The best experiment, Oregon's 2008 Medicaid lottery, found no measurable gain in physical health after two years, though it cut depression and medical debt. Larger later studies, of Medicaid expansion and of IRS letters that nudged people to enroll, found fewer deaths among the newly insured.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Insurance is not health. When Oregon held a lottery for Medicaid in 2008, the winners, compared with the losers, showed no significant improvement in blood pressure, cholesterol or blood sugar after two years. It is the cleanest test there is, a true random draw, and it found that coverage increased doctor visits and diagnoses without measurably improving physical health. If expanding coverage to the poorest adults does not move the numbers that predict heart attacks and strokes, a program adding about $3 trillion a year to federal spending is a large bet on a weak link. Better returns may come from targeting care to the sick, cutting prices, and tackling the overdoses and obesity that drive the outcome gap.",
      proponent_rebuttal:
        "Two years was too short to detect the effects that matter most, and even Oregon found coverage cut depression and 'nearly eliminated catastrophic out-of-pocket medical expenditures.' Bigger studies have since found deaths. When the IRS randomly sent letters to 3.9 million people who had paid the penalty for going uninsured, the letters raised enrollment, and the extra coverage reduced mortality among middle-aged adults within two years. In states that expanded Medicaid, annual mortality among the near-elderly targeted by the expansion fell 9.4%. And the money matters too: about 20 million American adults owe more than $250 in medical bills, at least $220 billion in all, a burden universal coverage is designed to remove.",
      crux: {
        id: "coverage-mortality-test",
        title: "The Coverage Test",
        question:
          "When uninsured Americans gain coverage, do fewer of them die?",
        description:
          "The case for universal coverage assumes that insurance changes health, not only bills. Random or near-random gains in coverage, such as lotteries, letters and state expansions, let researchers compare similar people who did and did not gain it.",
        methodology:
          "Randomized and quasi-experimental studies of coverage gains (the Oregon lottery, the IRS outreach experiment, Medicaid expansion with linked death records), with mortality, treatable disease and financial strain as outcomes, followed for more than two years.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Linked death records for people who gained coverage by lottery, letter or state expansion, followed for five years or more, reporting deaths from treatable conditions separately, alongside the 2026 rise in uninsured marketplace buyers as a natural experiment in losing coverage.",
        },
        cost_to_verify: "$0-$1M (linked administrative records already exist)",
        falsification: {
          supporter_flip:
            "If longer follow-up of the Oregon lottery and of Medicaid expansion found no difference in deaths or treatable disease between people who gained coverage and those who did not, the claim that universal coverage saves lives would rest on finances alone.",
          skeptic_flip:
            "If the mortality reductions in the IRS and Medicaid-expansion studies held up in longer follow-up and in people who lost coverage in 2026, the view that insurance does little for health would be hard to hold.",
          common_ground:
            "Both sides agree that coverage reduces medical debt and catastrophic bills, and that the Oregon lottery found no significant physical-health gain within two years.",
          live_disagreement:
            "Whether the health returns from covering the uninsured are large enough to justify a universal system, or whether the same money would save more lives aimed at prices, the sickest patients or overdoses.",
        },
      },
      evidence: [
        {
          id: "oregon-experiment",
          title: "Oregon Lottery 2013: Medicaid Showed No Significant Gain in Blood Pressure, Cholesterol or Blood Sugar After Two Years",
          description:
            "Oregon's 2008 lottery for Medicaid let researchers compare winners and losers. After about two years, 'we found no significant effect of Medicaid coverage on the prevalence or diagnosis of hypertension' or high cholesterol, and 'no significant effect on average glycated hemoglobin levels,' though diabetes diagnoses and medication use rose. Coverage 'decreased the probability of a positive screening for depression' and 'nearly eliminated catastrophic out-of-pocket medical expenditures.'",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source:
            "Baicker et al., 'The Oregon Experiment: Effects of Medicaid on Clinical Outcomes,' New England Journal of Medicine 368: 1713-1722 (2013)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3701298/",
          reasoning:
            "A randomized test, which is why it is weighted heavily. Two years is short for heart disease, it did not report deaths, and its financial and mental-health findings favor coverage.",
        },
        {
          id: "irs-letters-mortality",
          title: "IRS Experiment 2021: Letters to 3.9 Million Uninsured Raised Coverage and Cut Middle-Aged Deaths",
          description:
            "In a randomized pilot, the IRS sent informational letters to 3.9 million taxpayers who had paid the penalty for lacking health insurance. 'The intervention led to increased coverage in the two years following treatment,' and 'this additional coverage reduced mortality among middle-aged adults over the same time period.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Goldin, Lurie & McCubbin, 'Health Insurance and Mortality: Experimental Evidence from Taxpayer Outreach,' NBER Working Paper 26533",
          sourceUrl: "https://www.nber.org/papers/w26533",
          reasoning:
            "A true randomized experiment at very large scale, measuring deaths, which Oregon could not. It covers private marketplace coverage for people who chose to enroll after a letter, not a single public plan.",
        },
        {
          id: "medicaid-expansion-mortality",
          title: "Medicaid Expansion: 9.4% Drop in Annual Deaths Among Targeted Near-Elderly Adults",
          description:
            "Linking survey data to death records, Sarah Miller, Norman Johnson and Laura Wherry found that near-elderly adults most likely to gain coverage in states that expanded Medicaid under the ACA 'experienced a 0.132 percentage point decline in annual mortality,' 'a 9.4 percent reduction over the sample mean,' compared with similar adults in states that did not expand.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "Miller, Johnson & Wherry, 'Medicaid and Mortality: New Evidence from Linked Survey and Administrative Data,' NBER Working Paper 26081",
          sourceUrl: "https://www.nber.org/papers/w26081",
          reasoning:
            "Large linked records and a credible comparison of expansion and non-expansion states. States chose whether to expand, so it is not randomized, and it measures Medicaid for low-income adults, not a universal plan.",
        },
        {
          id: "medical-bankruptcy-data",
          title: "Peterson-KFF 2024: 20 Million US Adults Owe Over $250 in Medical Bills, At Least $220 Billion in All",
          description:
            "Census Survey of Income and Program Participation data for the end of 2021 show about 20 million adults, nearly one in 12, owing more than $250 in unpaid medical bills; about 14 million owing more than $1,000 and about 3 million more than $10,000. The survey 'suggests people in the United States owe at least $220 billion in medical debt.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Peterson-KFF Health System Tracker, 'The burden of medical debt in the United States' (12 February 2024)",
          sourceUrl:
            "https://www.healthsystemtracker.org/brief/the-burden-of-medical-debt-in-the-united-states/",
          reasoning:
            "A reliable count from federal survey data. It measures debt, not its cause, and narrower reforms, such as caps on out-of-pocket costs, could also reduce it.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Would one payer cut total costs? (mechanism)
    // =========================================================================
    {
      id: "cost-efficiency",
      title: "Would One Payer Spend Less?",
      short_summary:
        "The US spends about $15,500 per person, roughly twice its peers, mostly because it pays higher prices and more for paperwork, not because Americans use more care. Most models find a single payer would cut total spending, chiefly by paying hospitals and doctors less. Critics say those cuts are the part least likely to survive Congress.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Single-payer savings exist on paper because the models assume Washington will pay hospitals and doctors far less than private insurers do. Charles Blahous's 2018 analysis of the Sanders bill found it would add about $32.6 trillion to federal spending in its first ten years, more than doubling all projected federal individual and corporate income tax revenue could cover, and that even this assumed cutting provider payments by more than 40% relative to private rates. Hospitals that lose that much income close wards, cut staff or lobby Congress until the cuts are reversed. Free care at the point of use also means more use, and the models that find savings leave out the one-time costs of buying out a private industry and retraining its workers. The US could cut prices and paperwork without abolishing the coverage most people have.",
      proponent_rebuttal:
        "The US does not use much more care than other rich countries; it pays more for it. A 2018 JAMA comparison found US use of care 'largely similar to those in other nations' and named prices of labor, drugs and administration as the major drivers: administration took 8% of US spending against 1% to 3% elsewhere, and US drug spending was $1,443 per person against $466 to $939. A single payer attacks exactly those costs. A 2020 review of 22 cost analyses of US single-payer plans found 19 predicted net savings in the first year, the largest from simpler payment administration, and found long-term savings for all of them. Much of Blahous's $32.6 trillion would replace what families and employers now pay insurers, not come on top of it. National health spending already stands at $5.3 trillion and is projected to reach 20.6% of the economy by 2034.",
      crux: {
        id: "administrative-savings-calculation",
        title: "The Savings Test",
        question:
          "Would a single public payer cut total US health spending, once higher use and lower provider pay are counted?",
        description:
          "Most of the projected savings come from lower administrative costs, lower drug prices and paying providers at or near Medicare rates. Whether those survive depends on how much more care people use when it is free, and whether Congress would hold provider payments down.",
        methodology:
          "Compare US administrative and price levels with single-payer and multi-payer peers; rerun the 22 published cost models with a common set of assumptions on utilization, provider rates and transition costs; check how hospitals' finances and capacity changed where Medicare rates were extended to more patients.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Rerun the published single-payer cost models on one set of assumptions about how much more care people use, what hospitals are paid and what the transition costs, and set the results against hospital finances and capacity where Medicare-level rates already cover most patients.",
        },
        cost_to_verify: "$300K (health economics modelling on existing data)",
        falsification: {
          supporter_flip:
            "If cost models run on common assumptions found total spending rising once realistic increases in use and provider rates closer to today's were included, the claim that one payer would spend less would fail.",
          skeptic_flip:
            "If models on common assumptions kept finding net savings even with provider rates set well above Medicare's and use rising, and hospitals stayed solvent where Medicare-level rates cover most patients, the doubt about savings would be hard to sustain.",
          common_ground:
            "Both sides agree the US spends far more per person than its peers, and that higher prices and administrative costs explain much of the gap more than higher use.",
          live_disagreement:
            "Whether the price cuts that produce the savings would be politically and practically sustainable, and what lower payments would do to hospitals, doctors and drug development.",
        },
      },
      evidence: [
        {
          id: "cms-health-expenditure",
          title: "CMS: US Health Spending Hit $5.3 Trillion in 2024, 18.0% of GDP and $15,474 per Person",
          description:
            "National health expenditure grew 7.2% in 2024 to $5.3 trillion, 18.0% of GDP, or $15,474 per person. Private health insurance accounted for $1,644.6 billion, Medicare $1,118.0 billion and Medicaid $931.7 billion. The health share of GDP is projected to rise to 20.6% in 2034.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 5,
          },
          source: "Centers for Medicare & Medicaid Services, National Health Expenditure Fact Sheet (2024 data)",
          sourceUrl:
            "https://www.cms.gov/data-research/statistics-trends-and-reports/national-health-expenditure-data/nhe-fact-sheet",
          reasoning:
            "The official baseline. It shows the scale of spending a reform would redirect, not that any particular reform would lower it.",
        },
        {
          id: "peer-spending-comparison",
          title: "Peterson-KFF 2026: US Spent $14,775 per Person in 2024 vs $7,860 in Peer Countries",
          description:
            "Using OECD definitions, US health spending averaged $14,775 per person in 2024 against $7,860 across comparable high-income countries, about half. The US spent 17.2% of GDP on health, against a peer average of 11.2%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source:
            "Peterson-KFF Health System Tracker, 'How does health spending in the U.S. compare to other countries?' (11 March 2026)",
          sourceUrl:
            "https://www.healthsystemtracker.org/chart-collection/health-spending-u-s-compare-countries/",
          reasoning:
            "Shows peers spend far less. Peer systems differ in design, some with private insurers, so the comparison does not single out a single payer as the reason.",
        },
        {
          id: "prices-not-use",
          title: "JAMA 2018: US Uses About as Much Care as Peers but Pays More; Administration 8% vs 1-3%",
          description:
            "Comparing the US with ten high-income countries, Papanicolas, Woskie and Jha found US utilization 'largely similar to those in other nations.' They named 'prices of labor and goods, including pharmaceuticals, and administrative costs' as the major drivers of higher spending. Administration took 8% of US health spending against roughly 1% to 3% elsewhere; US drug spending was $1,443 per person against $466 to $939; US generalist physicians earned $218,173 against about $86,600 to $154,100.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Papanicolas, Woskie & Jha, 'Health Care Spending in the United States and Other High-Income Countries,' JAMA 319(10): 1024-1039 (2018)",
          sourceUrl: "https://jamanetwork.com/journals/jama/fullarticle/2674671",
          reasoning:
            "Pins the gap on prices and paperwork, the costs a single payer would target. It does not show a single payer is the only way to lower them; all-payer rate setting or drug price negotiation could too.",
        },
        {
          id: "plos-single-payer-review",
          title: "PLOS Medicine 2020: 19 of 22 US Single-Payer Cost Analyses Predicted First-Year Savings",
          description:
            "A systematic review of 22 economic analyses of single-payer plans for the US or individual states found '19 (86%) of the analyses predicted net savings' in the first year, with estimates ranging from 7% higher to 15% lower net cost. 'The largest source of savings was simplified payment administration (median 8.8%),' with drug costs the other key predictor, and 'anticipated growth rates would result in long-term net savings for all plans.' The authors excluded one-time transition costs, such as buying out for-profit entities and retraining displaced workers.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Cai et al., 'Projected costs of single-payer healthcare financing in the United States: A systematic review of economic analyses,' PLOS Medicine (15 January 2020)",
          sourceUrl:
            "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003013",
          reasoning:
            "Aggregates many models, from advocates and skeptics alike, which is its strength. Every model rests on assumptions about provider rates and use that have never been tested at US scale, and transition costs are left out.",
        },
        {
          id: "mercatus-federal-cost",
          title: "Mercatus 2018: Sanders Plan Adds About $32.6 Trillion to Federal Spending Over 10 Years, Assuming 40% Lower Provider Pay",
          description:
            "Charles Blahous estimated that the Medicare for All Act 'would add approximately $32.6 trillion to federal budget commitments during the first 10 years,' and that 'a doubling of all currently projected federal individual and corporate income tax collections would be insufficient' to pay for it. He called the estimate conservative because it assumes the bill succeeds in 'cutting payments to providers by more than 40 percent relative to private insurance rates.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "Charles Blahous, 'The Costs of a National Single-Payer Healthcare System,' Mercatus Center working paper (30 July 2018)",
          sourceUrl:
            "https://www.mercatus.org/research/working-papers/costs-national-single-payer-healthcare-system",
          reasoning:
            "From a market-oriented center, and cited by both sides. Supporters note that much of the federal figure would replace premiums and out-of-pocket costs households now pay; its sharpest point is the provider-pay cut that any savings depend on.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: What switching would cost households (values and trade-offs)
    // =========================================================================
    {
      id: "switching-tradeoffs",
      title: "Taxes, Waits and the Plan You Have",
      short_summary:
        "Two in three Americans told KFF in September 2026 they favor a national health plan, but support falls to about one in three when it means higher taxes and one in four if it causes delays in care. About half the country has job-based coverage. The trade is premiums and deductibles for taxes, and choice of insurer for a guarantee.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Most Americans are covered and most of them like their plans. Employer coverage reached 53.5% of the population in 2025, and Medicare for All would end it, along with most private insurance, for people who never asked to give it up. Support for a national plan collapses once its costs are named: in KFF's September 2026 poll it fell to about a third when the plan meant higher taxes and to as low as one in four if it caused delays in tests or treatment. Delays are what universal systems ration with: in Canada in 2024, only 61% of knee replacements and 68% of hip replacements were done within the six-month benchmark. Fix what is broken, the uninsured and the underinsured, with targeted help, and leave the rest alone.",
      proponent_rebuttal:
        "Americans already pay for universal coverage; they just pay insurers instead of the government, and the coverage is not universal. When the extra ACA premium help expired at the end of 2025, what marketplace enrollees paid rose 58% on average, and KFF projects paid enrollment falling from 22.3 million to about 17.5 million in 2026. Job-based coverage ends when the job does, and families pay deductibles before it covers much. Under a national plan the premium and deductible become a tax, which for most households can be smaller than what they pay now. Voters know what they want: in September 2026, 66% favored a national health plan, the highest KFF has recorded, including 72% of independents, and support rose to about three in four when it guaranteed coverage as a right or eliminated premiums. Canada's waits fall on planned surgery, while its urgent care, such as radiation therapy, mostly meets the benchmarks, and Canada, like the other peer countries, spends far less per person.",
      crux: {
        id: "household-tradeoff",
        title: "The Household Trade-Off",
        question:
          "Would most households pay less in new taxes than they now pay in premiums and out-of-pocket costs, and accept the trade?",
        description:
          "A national plan swaps premiums, deductibles and copays for taxes, and a choice of insurers for a single guarantee. How much each household gains or loses can be calculated; whether people should accept losing the plan they have, and how large a role government should play, is a value choice.",
        methodology:
          "Distributional analysis of specific financing plans (payroll, income and wealth taxes) against current household premiums and out-of-pocket spending by income; polling that names the actual trade; evidence on waits in peer systems at different spending levels.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Household-by-household estimates for a specific financing plan, comparing new taxes with the premiums, deductibles and copays each income group now pays, alongside wait-time data from peer countries that spend different amounts. Whether to give up current plans for a guarantee is a value choice.",
        },
        cost_to_verify: "$200K (distributional modelling of a specific bill)",
        falsification: {
          supporter_flip:
            "If a distributional analysis of an actual financing plan showed most middle-income households paying more in new taxes than they save in premiums and out-of-pocket costs, or peer data tied universal systems to longer waits at any spending level, the household case would weaken.",
          skeptic_flip:
            "If such an analysis showed most households, including those with job-based plans, paying less overall, and peers at US-like spending showed no longer waits, the objection that switching costs families more would lose its footing.",
          common_ground:
            "Both sides agree most Americans now get coverage through work, that support for a national plan depends heavily on how its costs are described, and that some universal systems, Canada's among them, have long waits for planned surgery.",
          live_disagreement:
            "Whether guaranteed coverage for everyone is worth higher taxes and the loss of private plans many people like, a question of government's role that household arithmetic informs but does not settle.",
        },
      },
      evidence: [
        {
          id: "kff-poll-2026",
          title: "KFF September 2026: 66% Favor a National Health Plan; About One-Third if It Raises Taxes",
          description:
            "In KFF's Health Tracking Poll fielded 16-21 September 2026, 66% favored a national health plan, 'sometimes called Medicare-for-all,' and 34% opposed, the highest support KFF has recorded: 84% of Democrats, 72% of independents and 34% of Republicans. Support rose to as much as three in four when told the plan would guarantee coverage as a right or eliminate premiums, and fell to about a third if it raised taxes, about four in ten if it threatened the current Medicare program, and as low as one in four if it caused delays in tests or treatment. Fifty-seven percent of privately insured adults believed they could keep their current coverage under such a plan.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 4,
          },
          source:
            "KFF, 'Public Opinion on Single-Payer, National Health Plans, and Expanding Access to Medicare Coverage' (6 October 2026)",
          sourceUrl:
            "https://www.kff.org/slideshow/public-opinion-on-single-payer-national-health-plans-and-expanding-access-to-medicare-coverage/",
          reasoning:
            "The headline support is real and rising. The swings show it is soft: most supporters have not priced in the taxes, and most of the privately insured wrongly expect to keep their plan under most proposals. Polls tell what voters want, not whether a plan works.",
        },
        {
          id: "employer-coverage-census",
          title: "Census 2025: Job-Based Coverage Reached 53.5% of Americans; 26.7 Million Uninsured All Year",
          description:
            "In 2025, 26.7 million people (7.9%) were uninsured for the entire year, not statistically different from 2024. Employment-based insurance was the most common type, 'covering 53.5 percent of the population for some or all of the calendar year.' Public coverage reached 35.8%.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 5,
          },
          source:
            "US Census Bureau, 'Health Insurance Coverage in the United States: 2025' (P60-291, 15 September 2026)",
          sourceUrl: "https://www.census.gov/library/publications/2026/demo/p60-291.html",
          reasoning:
            "Shows how many people a single payer would move off plans they now hold, and also how many remain uninsured. The data predate the 2026 subsidy expiration and the 2025 law's Medicaid changes.",
        },
        {
          id: "canada-wait-times",
          title: "CIHI 2025: In Canada, 61% of Knee and 68% of Hip Replacements Were Done Within Six Months",
          description:
            "In 2024, 68% of Canadian hip replacements and 61% of knee replacements were done within the six-month benchmark, higher than in the previous few years but below 2019. Sixty-nine percent of cataract surgeries were done within 112 days, 94% of radiation therapy within 28 days, and 83% of hip fracture repairs within 48 hours.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "Canadian Institute for Health Information, 'Wait times for priority procedures in Canada, 2025' (12 June 2025)",
          sourceUrl: "https://www.cihi.ca/en/wait-times-for-priority-procedures-in-canada-2025",
          reasoning:
            "Official data on the system most like Medicare for All. Canada spends far less per person than the US would under a single payer, and urgent care such as radiation and fracture repair is mostly timely, so the waits fall on planned surgery.",
        },
        {
          id: "aca-premiums-2026",
          title: "KFF 2026: Marketplace Enrollees' Premium Payments Rose 58% After Extra Subsidies Expired",
          description:
            "When the enhanced ACA tax credits expired at the end of 2025, the average premium enrollees paid after subsidies rose 58%, from $113 to $178 a month. KFF estimates average paid marketplace enrollment could fall to about 17.5 million in 2026, and possibly 16.5 million, from 22.3 million in 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "KFF, 'What We Know So Far About 2026 ACA Marketplace Enrollment, Premiums, and Deductibles' (19 May 2026)",
          sourceUrl:
            "https://www.kff.org/affordable-care-act/what-we-know-so-far-about-2026-aca-marketplace-enrollment-premiums-and-deductibles/",
          reasoning:
            "Shows how coverage outside a universal system rises and falls with each subsidy decision in Congress. It speaks to the fragility of the patchwork, not to whether a single payer is the right fix; the subsidy fight itself has its own map.",
        },
      ],
    },
  ],
  references: [
    {
      title: "National Health Expenditure Fact Sheet - CMS",
      url: "https://www.cms.gov/data-research/statistics-trends-and-reports/national-health-expenditure-data/nhe-fact-sheet",
    },
    {
      title: "Health Insurance Coverage in the United States: 2025 - US Census Bureau (15 September 2026)",
      url: "https://www.census.gov/library/publications/2026/demo/p60-291.html",
    },
    {
      title: "How does U.S. life expectancy compare to other countries? - Peterson-KFF Health System Tracker",
      url: "https://www.healthsystemtracker.org/chart-collection/u-s-life-expectancy-compare-countries/",
    },
    {
      title: "Public Opinion on Single-Payer, National Health Plans, and Expanding Access to Medicare Coverage - KFF (6 October 2026)",
      url: "https://www.kff.org/slideshow/public-opinion-on-single-payer-national-health-plans-and-expanding-access-to-medicare-coverage/",
    },
    {
      title: "Projected costs of single-payer healthcare financing in the United States - Cai et al., PLOS Medicine (2020)",
      url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003013",
    },
  ],
};
