export const universalBasicIncomeData = {
  id: "universal-basic-income",
  title: "Universal Basic Income",
  question:
    "Should every adult get a basic income from the government, no strings attached?",
  meta_claim:
    "Universal Basic Income (UBI) would be economically beneficial and should be implemented in developed nations.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: the OpenResearch employment paper is published
  // (Quarterly Journal of Economics, 2026), now reporting a 4.2-point fall in
  // labor-force participation; Germany's three-year pilot (DIW, 2025) and the
  // 12-year Kenya UBI found no net fall in work; Baby's First Years (NBER,
  // 2025) found no effect of $333 a month on four-year-olds' development.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In the largest US cash trial, $1,000 a month for three years, recipients' labor-force participation fell 4.2 points and their own earnings by about $1,900 a year; the time went mostly to leisure. A German pilot and a 12-year guarantee in Kenya found no fall in work. A check like that for every US adult would cost about $2.8 trillion a year. The fight is over whether a permanent payment to everyone would change work more than the trials did, and whether the money would do more good aimed at the poor.",
    confidence: 85,
    source:
      "Vivalt, Rhodes, Bartik, Broockman, Krause & Miller, 'The Employment Effects of a Guaranteed Income', NBER Working Paper 32719, rev. August 2026, published in the Quarterly Journal of Economics 141(4) (2026); Tax Foundation on the Freedom Dividend's gross cost",
    sourceUrl: "https://www.nber.org/papers/w32719",
  },
  simple_case: [
    "The answer bears on whether governments send everyone cash with no conditions, which taxes rise to pay for it, and what happens to food stamps, housing aid and other programs aimed at the poor.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Do people work less? What the trials found
    // =========================================================================
    {
      id: "labor-market-work-incentives",
      title: "Do People Work Less? What the Trials Found",
      short_summary:
        "The biggest US trial found a real but moderate drop in work: participation down 4.2 points, one to two fewer hours a week, the time mostly spent on leisure. Germany's pilot found people worked about an hour less and changed jobs more; a 12-year basic income in Kenya and Alaska's dividend found no fall in total work. Every trial but Alaska's and Kenya's ended on a known date, which is the skeptics' main objection to all of them.",
      icon_name: "Users" as const,
      skeptic_premise:
        "People respond to incentives, and the best trial shows it. OpenResearch gave 1,000 low-income Americans $1,000 a month for three years. Their labor-force participation fell 4.2 percentage points against the control group, their own earnings fell by about $1,900 a year, and their partners cut hours by as much as they did. The authors looked hard for training, job search or better jobs filling the gap and found 'no impact on quality of employment'; the biggest gain in time use was leisure. The 1970s US negative-income-tax experiments found the same direction, with hours cut most by second earners. And these were temporary programs. A payment people know will last for life, paid to everyone at once, gives every reason to expect a larger response, not a smaller one.",
      proponent_rebuttal:
        "The effect is moderate, and the trials that come closest to the real thing find even less. A 4.2-point fall in participation is far from mass exit; the same trial found hours down only 1 to 2 a week. In Kenya, villages promised a basic income for 12 years did not work less: wage work in farming fell but self-employment rose, with 'no net effect on total household labor supply.' Alaska has paid every resident a dividend since 1982; Jones and Marinescu found no effect on employment, and a rise in part-time work. Germany's three-year pilot of €1,200 a month found the share in work 'virtually identical' to the control group, about an hour less work a week, and more job changes and university enrollment. Some of the time freed goes to rest, care and retraining, which are not failures of policy.",
      crux: {
        id: "permanent-ubi-labor-supply",
        title: "The Permanent-Program Labor Supply Test",
        question:
          "Would a permanent UBI reduce work more than the small effects seen in temporary pilots?",
        description:
          "Most trials paid for two or three years and told recipients when it would end, so people may have kept jobs they would otherwise quit. Kenya's 12-year arm and Alaska's dividend are permanent or close to it, but in a poor rural economy and at a small sum. A national payment would also reach everyone at once, changing wages and prices. If labor-force participation fell by much more than the trials found, the cost and the political case would both change.",
        methodology:
          "A large randomized trial (10,000+ people) with payments guaranteed for at least ten years, at a meaningful level ($1,000 a month or a set share of median income), including whole communities paid at once to capture effects on local wages and prices. Track participation, hours, earnings, job quality, education, caregiving and business formation, against a control group on existing benefits.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A randomized trial of 10,000 or more people over five years or longer with guaranteed continuation, including whole communities receiving the payment, tracking hours, job quality and labor-force participation.",
        },
        cost_to_verify:
          "$50-150M (large, long RCT with saturation sites and long follow-up)",
        falsification: {
          supporter_flip:
            "If a large trial with payments guaranteed for a decade showed labor-force participation falling well beyond the 4.2 points OpenResearch found, with the time going mostly to leisure, the work-incentive objection would gain real support and the case for a universal payment would weaken.",
          skeptic_flip:
            "If a decade-long guarantee in a rich country matched Kenya's 12-year arm, with no net fall in household work, or Alaska's dividend, with no fall in employment, the fear that permanence multiplies the effect would lose its footing.",
          common_ground:
            "Both sides agree the OpenResearch trial found a real fall in work of moderate size, that most pilots were temporary and known to end, and that no trial has tested a permanent payment to everyone in a rich country.",
          live_disagreement:
            "Whether a lifelong payment to everyone would cut work by about as much as the trials found, or by much more once the income is known to be permanent and wages and prices adjust.",
        },
      },
      evidence: [
        {
          id: "openresearch-unconditional-cash-2024",
          title: "OpenResearch trial (QJE 2026): $1,000 a month cut labor-force participation 4.2 points and earnings $1,900 a year",
          description:
            "The OpenResearch Unconditional Cash Study gave 1,000 low-income adults aged 21 to 40 in Illinois and Texas $1,000 a month from late 2020 to late 2023, with 2,000 controls receiving $50 a month. In the published version of the paper (Quarterly Journal of Economics, 2026), the transfer 'caused total individual income excluding the transfers to fall by about $1,900/year relative to the control group and a 4.2 percentage point decrease in labor market participation.' Participants cut work by 1 to 2 hours a week, and 'participants' partners reduced their work hours by a comparable amount.' The largest increase in time use was leisure. 'Despite asking detailed questions about amenities, we find no impact on quality of employment.' The authors conclude: 'our results suggest a moderate labor supply effect that does not appear offset by other productive activities.' Earlier drafts, from July 2024, reported a 2-point fall in employment.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Vivalt, Rhodes, Bartik, Broockman, Krause & Miller, 'The Employment Effects of a Guaranteed Income: Experimental Evidence from Two U.S. States', NBER Working Paper 32719 (rev. August 2026); Quarterly Journal of Economics 141(4) (2026)",
          sourceUrl: "https://www.nber.org/papers/w32719",
          reasoning:
            "The largest, longest and best-measured US trial at a meaningful sum, pre-registered and published in a top journal, so it leads. It is still temporary (three years, with a known end) and targeted at low-income adults, not universal, which is why it cannot by itself say how a permanent national payment would work.",
        },
        {
          id: "givedirectly-kenya-long-term",
          title: "Kenya's 12-year basic income: no net fall in household work; farm wage work fell, self-employment rose",
          description:
            "In about 200 Kenyan villages, from 2018, researchers compared a long-term basic income ($22.50 a month for 12 years), a short-term one ($22.50 a month for two years), a lump sum of $500 and a control. The study, by Tavneet Suri, Abhijit Banerjee, Alan Krueger, Paul Niehaus and Michael Faye, found 'Treated households are not working less': there was 'significant reduction in hours of wage work, all of which comes from work in agriculture', offset by more self-employment, so 'there is no net effect on total household labor supply.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source:
            "Banerjee, Faye, Krueger, Niehaus & Suri, 'Universal Basic Income: Short-Term Results from a Long-Term Experiment in Kenya' (2023), as summarized by GiveDirectly",
          sourceUrl: "https://www.givedirectly.org/2023-ubi-results/",
          reasoning:
            "The only randomized basic income promised for over a decade, so it speaks directly to the permanence objection. Rural Kenya, with farm and informal work and a small sum, differs from a rich economy, which limits directness. Niehaus and Faye co-founded GiveDirectly, which ran the payments, so independence is 6, though the study is led by independent economists.",
        },
        {
          id: "germany-basic-income-pilot-2025",
          title: "German pilot 2025: €1,200 a month for three years left employment 'virtually identical'; about an hour less work a week",
          description:
            "The German Institute for Economic Research (DIW), with the Vienna University of Economics and Business and the Institute for Employment Research, followed 122 people who received €1,200 a month for three years and 1,580 controls who received nothing. 'The proportion of people in the workforce remains virtually identical in both research groups.' Recipients worked 39 hours a week in paid work on average, 'one hour less than those without a basic income.' More of them changed jobs, mostly in the first 18 months, and enrollment in academic study rose significantly. The project reports 'significant effects on participants' satisfaction and mental health.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Pilotprojekt Grundeinkommen (Mein Grundeinkommen e.V. with DIW Berlin), results published in DIW Weekly Report 15/2025",
          sourceUrl: "https://www.pilotprojekt-grundeinkommen.de/en/labour",
          reasoning:
            "A rich-country randomized trial at a meaningful sum, run by a respected institute. The treatment group is small (122), and the project was funded by a basic income advocacy group's donors, so independence and replicability are moderate. Like OpenResearch, it had a known end date.",
        },
        {
          id: "alaska-pfd-42-years",
          title: "Alaska's dividend since 1982: no effect on employment, part-time work up 1.8 points (Jones & Marinescu 2022)",
          description:
            "Alaska has paid every resident, including children, an annual dividend from its oil-funded Permanent Fund since 1982, typically $1,000 to $2,000 a year. Using Current Population Survey data and a synthetic-control comparison, Damon Jones and Ioana Marinescu found the dividend had no effect on overall employment and raised part-time work by 1.8 percentage points, about 17%. They read the pattern as the cash boosting local demand, with larger job gains in sectors that serve local customers.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Jones & Marinescu, 'The Labor Market Impacts of Universal and Permanent Cash Transfers: Evidence from the Alaska Permanent Fund', American Economic Journal: Economic Policy 14(2):315-40 (2022)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/pol.20190299",
          reasoning:
            "The one universal, permanent cash payment in a rich economy, studied in a top field journal. The sum is a tenth or less of a full basic income and is paid once a year, so it says little about a payment meant to live on.",
        },
        {
          id: "sime-dime-labor-reduction",
          title: "Seattle and Denver NIT trials (1970s): men cut work 5–8%, wives 15–20%",
          description:
            "The Seattle-Denver Income Maintenance Experiments (1970-1978), the largest US negative income tax trials, enrolled about 4,800 families. Labor supply fell by about 5% to 8% for husbands, 15% to 20% for wives and 12% to 15% for single mothers, an average of 2 to 4 hours a week; second earners, mostly wives, withdrew most, largely to care for children. A widely reported rise in divorce was later traced to a statistical error (Cain and Wissoker, 1990).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "US Department of Health and Human Services, Overview of the Final Report of the Seattle-Denver Income Maintenance Experiment",
          sourceUrl: "https://aspe.hhs.gov/reports/overview-final-report-seattle-denver-income-maintenance-experiment",
          reasoning:
            "Large, rigorous and in the same direction as OpenResearch half a century later. The labor market, and how many wives worked, was very different in the 1970s, and the plans phased out with earnings, unlike a flat universal payment, so directness is 6.",
        },
        {
          id: "finland-basic-income-experiment",
          title: "Finland 2017–18: €560 a month to the unemployed added about six days of work over a year",
          description:
            "Finland paid 2,000 randomly chosen unemployed people €560 a month for two years, with no loss of payment if they took work. The final results (Ministry of Social Affairs and Health and Kela, May 2020) found small employment effects, recipients working on average about six days more than the control group in the second year, along with higher life satisfaction and less mental strain.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "Ministry of Social Affairs and Health, Finland; Kela",
          sourceUrl:
            "https://stm.fi/en/-/perustulokokeilun-tulokset-tyollisyysvaikutukset-vahaisia-toimeentulo-ja-psyykkinen-terveys-koettiin-paremmaksi",
          reasoning:
            "A government-run randomized trial. It tested what happens when the unemployed keep their payment on taking a job, not a universal income, and the second year overlapped a new activation policy, so it speaks to benefit design more than to UBI.",
        },
        {
          id: "stockton-seed-employment-increase",
          title: "Stockton 2019–21: full-time work rose from 28% to 40% among 125 recipients of $500 a month",
          description:
            "The Stockton Economic Empowerment Demonstration gave 125 randomly chosen residents $500 a month for two years. The first-year evaluation by Stacia West and Amy Castro Baker found full-time employment among recipients rose from 28% to 40% between February 2019 and February 2020, against 32% to 37% in the control group, with lower income volatility and less anxiety and depression.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 4,
          },
          source:
            "West & Castro Baker, 'Preliminary Analysis: SEED's First Year' (2021), self-published",
          sourceUrl: "https://www.stocktondemonstration.org/",
          reasoning:
            "Often cited, and suggestive that a cushion can help people find better work. Weak as evidence: 125 recipients, a self-published report, one pre-pandemic year, and a small sum. The far larger OpenResearch trial found the opposite direction.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Does cash make lives better, and better than targeted help?
    // =========================================================================
    {
      id: "social-outcomes-wellbeing",
      title: "Does Cash Make Lives Better, and Better Than Targeted Help?",
      short_summary:
        "Cash is not wasted on drink, and it cuts poverty fast: US child poverty more than doubled in 2022 after a year of monthly child payments ended. But two large US trials found that $333 to $1,000 a month left measured health and young children's development unchanged after the first year. A universal check also goes to millionaires, while food stamps, Medicaid and housing vouchers aim at need.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Cash relieves stress in the moment but the trials show it does not change lives as promised. OpenResearch's $1,000 a month 'did not improve self-reported physical health, clinical biomarkers, or mental health after the first year.' Baby's First Years paid low-income mothers $333 a month from their child's birth; at age four there were no significant effects on language, executive function, behavior or brain activity. And a universal check is badly aimed: Jeff Bezos gets the same payment as a homeless veteran. SNAP, Medicaid and housing vouchers put money where need is and buy specific things that matter. Spending trillions on everyone instead of on the poor gives each poor family far less per dollar than a targeted program could.",
      proponent_rebuttal:
        "Cash works where it is meant to: it cuts poverty, and people spend it well. When the expanded monthly child tax credit, a near-universal payment for families, ran in 2021, the Census Bureau's child poverty rate fell to 5.2%; it rose to 12.4% in 2022 after the payments stopped. A World Bank review of 19 studies found cash transfers reduce spending on alcohol and tobacco. Targeting fails the people it targets: in 2020 only 21 of every 100 families in poverty received TANF cash, against 68 in 1996, because of paperwork, time limits and stigma. Means-tested aid also claws back benefits as earnings rise, so work pays little. A universal payment can be taxed back from the rich through the income tax; what it cannot do is miss the eligible.",
      crux: {
        id: "wellbeing-vs-targeted-programs",
        title: "The UBI vs. Targeted Programs Comparison",
        question:
          "Does universal cash beat well-designed targeted programs, dollar for dollar?",
        description:
          "Cash cuts measured poverty, and people do not waste it. The trials find little lasting effect on health or child development. The question is what the same money would do as targeted help: SNAP, Medicaid, housing vouchers, child care. If equal spending on targeted programs reaches more of the poor and improves more outcomes, universality is an expensive way to help; if take-up gaps and benefit clawbacks waste most of the targeted money, cash wins.",
        methodology:
          "A multi-arm trial with at least 3,000 people per arm: (1) $1,000 a month in cash, (2) the same value in targeted benefits (SNAP, Medicaid, housing voucher, job training), (3) both, and (4) a control. Track poverty, income swings, health and biomarkers, mental health, children's schooling, contact with the justice system and life satisfaction over 3 to 5 years, including the cost of administering each arm and the share of eligible people each reaches.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A multi-arm trial with at least 3,000 people per arm comparing $1,000 a month in cash, the same value in targeted benefits (SNAP, Medicaid, housing vouchers, job training), both together, and a control, over 3 to 5 years.",
        },
        cost_to_verify:
          "$80-200M (multi-arm RCT with outcome tracking over 3-5 years)",
        falsification: {
          supporter_flip:
            "If head-to-head trials found targeted benefits worth the same as the cash delivering better health, schooling and poverty outcomes, and reaching most of the eligible, the case for universal cash over targeted help would reduce to convenience.",
          skeptic_flip:
            "If head-to-head trials found cash matching targeted benefits on health and schooling while reaching far more of the eligible, as TANF's 21-in-100 reach suggests, the efficiency case for targeting would weaken.",
          common_ground:
            "Both sides agree cash is not mostly spent on alcohol or tobacco, that it cuts measured poverty while it lasts, that recent US trials found little lasting health effect, and that targeted programs miss many eligible families.",
          live_disagreement:
            "Whether the same money does more good sent to everyone as cash or aimed at the poor as food, health and housing help, which only a head-to-head trial could measure.",
        },
      },
      evidence: [
        {
          id: "openresearch-guaranteed-income-health-null",
          title: "$1,000 a month for three years did not improve measured health after the first year (NBER 2024, rev. 2026)",
          description:
            "In the OpenResearch trial, 1,000 low-income adults aged 21 to 40 received $1,000 a month from November 2020 to October 2023, against 2,000 controls receiving $50 a month. The NBER working paper by Miller, Rhodes, Bartik, Broockman, Krause and Vivalt (July 2024, revised August 2026) reports that the transfer 'produced large but short-lived improvements in stress and food security', but 'did not improve self-reported physical health, clinical biomarkers, or mental health after the first year, and we can rule out small effects on many outcomes.' It found no effects on the health of children in participants' households.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Miller et al., 'Does Income Affect Health? Evidence from a Randomized Controlled Trial of a Guaranteed Income', NBER Working Paper 32711",
          sourceUrl: "https://www.nber.org/papers/w32711",
          reasoning:
            "A large randomized trial with clinical biomarkers as well as self-reports. It is one trial, partly during the pandemic. Directness is 5: it tests cash against a $50 control, not against an equal-cost targeted program, so it shows cash fell short on health, not that SNAP or Medicaid would do better per dollar.",
        },
        {
          id: "babys-first-years-age-four-2025",
          title: "Baby's First Years 2025: $333 a month from birth had no significant effect on children's development at age four",
          description:
            "About 1,000 mothers with incomes below the poverty line, recruited in maternity wards in 2018-19, were randomly assigned to receive $333 or $20 a month, unconditionally, from their child's birth. After four years (891 children assessed), Noble, Magnuson, Duncan and colleagues report no statistically significant effects on the four pre-registered primary outcomes, language, executive function, social-emotional problems and high-frequency brain activity, or on three secondary outcomes. The payments continued until shortly after each child's sixth birthday, and later waves are still being collected.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Noble, Magnuson, Duncan et al., 'The Effect of a Monthly Unconditional Cash Transfer on Children's Development at Four Years of Age: A Randomized Controlled Trial in the U.S.', NBER Working Paper 33844 (May 2025)",
          sourceUrl: "https://www.nber.org/papers/w33844",
          reasoning:
            "A rigorous, pre-registered trial by researchers who expected an effect, which makes the null result weigh more. $333 a month is about a third of a full basic income, and the children are still young, so it narrows rather than ends the claim that cash improves children's lives.",
        },
        {
          id: "ctc-child-poverty-2021-2022",
          title: "Census: child poverty more than doubled, from 5.2% in 2021 to 12.4% in 2022, after monthly child payments ended",
          description:
            "The Census Bureau's Supplemental Poverty Measure, which counts tax credits and benefits, put child poverty at 5.2% in 2021, the year the expanded child tax credit was paid monthly to most families with children, and at 12.4% in 2022, after the expansion lapsed: 'The SPM child poverty rate more than doubled, from 5.2 percent in 2021 to 12.4 percent in 2022.' Refundable tax credits moved 6.4 million people out of poverty in 2022, down from 9.6 million in 2021.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "US Census Bureau, 'Poverty in the United States: 2022', P60-280 (September 2023)",
          sourceUrl: "https://www.census.gov/library/publications/2023/demo/p60-280.html",
          reasoning:
            "Official statistics showing how much near-universal cash moves the poverty count. The poverty measure counts the cash itself, so the fall is partly arithmetic; it does not show effects on work or children's long-run outcomes, and other pandemic aid also ended in 2022.",
        },
        {
          id: "world-bank-cash-transfer-meta-analysis",
          title: "World Bank economists 2017: across 19 studies, cash transfers cut spending on alcohol and tobacco",
          description:
            "David Evans and Anna Popova of the World Bank reviewed 19 studies with quantitative data on spending and 11 that asked recipients how they used the money. Their meta-analysis found that 'on average cash transfers have a significant negative effect on total expenditures on temptation goods', about −0.18 standard deviations, in Latin America, Africa and Asia and for both conditional and unconditional programs.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Evans & Popova, 'Cash Transfers and Temptation Goods', Economic Development and Cultural Change 65(2):189-221 (2017)",
          sourceUrl: "https://ideas.repec.org/a/ucp/ecdecc/doi10.1086-689575.html",
          reasoning:
            "A consistent result across many countries that disposes of the 'they'll waste it' objection. The studies are from poorer countries, and not wasting cash is a low bar; it does not show cash beats targeted help.",
        },
        {
          id: "tanf-low-uptake-stigma",
          title: "CBPP: in 2020 only 21 of every 100 families in poverty got TANF cash, down from 68 in 1996",
          description:
            "The Center on Budget and Policy Priorities reports that in 2020, 21 of every 100 families in poverty received cash assistance from Temporary Assistance for Needy Families, down from 68 of every 100 in 1996, when welfare reform created the program. The decline reflects tighter eligibility, paperwork, work requirements, time limits and states moving the block grant to other uses.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 6,
          },
          source: "Center on Budget and Policy Priorities, 'TANF Reaching Few Poor Families'",
          sourceUrl: "https://www.cbpp.org/research/family-income-support/tanf-reaching-few-poor-families",
          reasoning:
            "Shows a targeted program can shrink until it misses most of its target. CBPP leans toward expanding aid, so independence is 6. TANF is the weakest of the targeted programs; SNAP and Medicaid reach far more of the eligible, so this is the targeting case at its worst, not its average.",
        },
        {
          id: "finland-wellbeing-improvements",
          title: "Finland 2020: basic income recipients reported higher life satisfaction and trust",
          description:
            "The final evaluation of Finland's 2017-2018 experiment found recipients scored higher than controls on life satisfaction, trust in other people and in institutions, and confidence in their future, and reported less loneliness, depression and difficulty concentrating.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "Kangas et al., 'Final Evaluation of the Finnish Basic Income Experiment', Ministry of Social Affairs and Health (2020)",
          sourceUrl: "https://julkaisut.valtioneuvosto.fi/handle/10024/162219",
          reasoning:
            "A well-run randomized trial. Well-being was self-reported by people who knew they were receiving the payment, and the sample was unemployed people only, so it shows a more secure benefit feels better, not that it outperforms targeted services.",
        },
        {
          id: "canada-mincome-experiment",
          title: "Manitoba Mincome (1974–79): hospitalizations fell 8.5% in the town where everyone was eligible",
          description:
            "The Mincome experiment guaranteed a minimum income to about 1,300 Manitoba families. Economist Evelyn Forget recovered the long-shelved data and reported in 2011 that in Dauphin, the 'saturation site' where every eligible family could receive payments, hospitalizations fell 8.5% relative to matched comparison towns, with fewer mental-health-related visits and more teenagers staying in school.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Forget, 'The Town With No Poverty', Canadian Public Policy 37(3) (2011)",
          sourceUrl: "https://utpjournals.press/doi/abs/10.3138/cpp.37.3.283",
          reasoning:
            "Rare community-wide evidence. The data were recovered decades later, the experiment was cut short, and the comparison is with other towns rather than random assignment, so it is suggestive, and it sits uneasily beside the recent US nulls on health.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Can any country pay for it?
    // =========================================================================
    {
      id: "economic-impact-fiscal-feasibility",
      title: "Can Any Country Pay for It?",
      short_summary:
        "$1,000 a month for every US adult costs about $2.8 to $3.1 trillion a year before offsets. Andrew Yang's plan paired it with a 10% VAT and four other taxes, and still left a gap of about $1.5 trillion a year. Dynamic models disagree on whether the economy would shrink or grow. Alaska pays its dividend from an oil fund, which no national plan can copy at full size.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The arithmetic does not close. The Tax Foundation scored Yang's Freedom Dividend at $2.8 trillion a year gross. A 10% VAT would raise about $952 billion, and his five taxes together far less than the cost; even after the welfare programs it replaced and economic feedback, the plan would add about $1.5 trillion a year to the deficit, and higher taxes on work would shrink output by about 3%. The Penn Wharton Budget Model ran a smaller $6,000-a-year UBI through a dynamic model: deficit-financed, GDP falls 9.3% by 2032; payroll-tax financed, it still falls 1.7% as people work 3.2% less. Even paid from an outside fund, Alaska-style, the model has GDP 3.4% lower. Every dollar comes from taxes that discourage work, borrowing that crowds out investment, or cuts to programs people rely on.",
      proponent_rebuttal:
        "The gross figure overstates the real cost. Most adults would pay back much or all of their check in the taxes that fund it, so the net transfer, from richer to poorer, is a fraction of $2.8 trillion. A basic income replaces programs and their overhead, and removes the benefit clawbacks that punish work. Models differ by assumption: the Roosevelt Institute, using the Levy Institute's macroeconomic model, found a deficit-financed $1,000 a month would grow GDP by 12.56% over eight years by raising spending, and Penn Wharton's own tables show a payroll-tax version leaving federal debt nearly unchanged. Alaska has paid its dividend since 1982 without fiscal crisis. The question is design: the size of the check, how fast it phases out through the tax code, and which taxes fund it.",
      crux: {
        id: "fiscal-sustainability-test",
        title: "The Fiscal Sustainability Assessment",
        question:
          "Can any realistic funding plan pay for UBI without growth-damaging debt or tax rates?",
        description:
          "Every serious estimate agrees the gross cost is enormous. The dispute is the net cost once most of the payment is taxed back from those who do not need it, the programs it would replace, and the growth effects of the taxes chosen. Models that assume people work less when taxed more find the economy shrinks; models driven by demand find it grows.",
        methodology:
          "Dynamic scoring, by CBO or a comparable model, of at least five designs: a VAT with program consolidation, a carbon and wealth tax mix, a transaction tax, a negative income tax that phases out with income, and a hybrid. Report for each the net transfer, the marginal tax rates it requires at each income level, debt-to-GDP after 10, 20 and 30 years, and the change in hours worked.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Dynamic-scoring models of at least five funding mixes (VAT with program consolidation, carbon and wealth taxes, a transaction tax, a negative income tax, a hybrid) over 10 to 30 years, reporting debt-to-GDP and the tax rates each requires.",
        },
        cost_to_verify:
          "$1-3M (dynamic fiscal modeling at CBO standard)",
        falsification: {
          supporter_flip:
            "If dynamic scoring of every realistic design, including a negative income tax that phases out through the tax code, found each one needing marginal tax rates or debt that shrink GDP for decades, the case for a meaningful UBI would rest on accepting that cost.",
          skeptic_flip:
            "If dynamic scoring found a phase-out design whose net cost was a modest share of the gross figure, funded without shrinking GDP, the claim that no country can afford UBI would turn into a dispute over design.",
          common_ground:
            "Both sides agree the gross cost of $1,000 a month per US adult is near $3 trillion a year, that the net cost depends on how much is taxed back, and that model results swing with assumptions about work and demand.",
          live_disagreement:
            "Whether any funding mix covers a meaningful UBI without growth-damaging taxes or debt, given that the models' answers depend on whether higher taxes mostly cut work or the payments mostly raise spending.",
        },
      },
      evidence: [
        {
          id: "yang-freedom-dividend-cost",
          title: "Tax Foundation: Yang's $1,000-a-month plan costs $2.8 trillion a year and leaves a $1.5 trillion annual gap",
          description:
            "The Tax Foundation scored Andrew Yang's 2020 Freedom Dividend, $1,000 a month for every adult, at a 'total gross cost' of '$2.8 trillion each year.' Its 10% VAT 'would raise $952 billion each year'; lifting the Social Security wage cap, a $40-a-ton carbon tax, a financial transactions tax and taxing capital gains as ordinary income would add roughly $340 billion more. After offsetting cuts to existing programs and economic feedback, the plan 'would end up increasing the budget deficit by about $1.5 trillion each year', and higher marginal tax rates would cut hours worked and 'ultimately reduce output by 3 percent.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 8,
          },
          source: "Tax Foundation, 'Does Andrew Yang's Freedom Dividend Proposal Add Up?'",
          sourceUrl: "https://taxfoundation.org/blog/andrew-yang-value-added-tax-universal-basic-income/",
          reasoning:
            "A transparent, line-by-line score of the best-known plan. The Tax Foundation favors low taxes, so independence is 6, and its model assumes taxes on work cut hours, which drives the output loss. A smaller check or a phase-out would narrow the gap.",
        },
        {
          id: "penn-wharton-debt-projection",
          title: "Penn Wharton 2018: a $6,000-a-year UBI cuts GDP 9.3% by 2032 if borrowed, 1.7% if payroll-tax funded",
          description:
            "The Penn Wharton Budget Model ran a $6,000-a-year payment to every adult, the plan the Roosevelt Institute had modeled, through its dynamic model. Deficit-financed, it would 'increase federal debt by over 63.5 percent by 2027 and by 81.1 percent by 2032', with GDP falling 6.1% by 2027 and 9.3% by 2032. Funded by a payroll tax, debt stays stable but hours worked fall 3.2% and GDP 1.7%. Even paid from an outside fund, as Alaska's is, households work 5.8% less and GDP falls 3.4%. The brief concludes UBI 'would substantially lower GDP, regardless of how the program is financed.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Penn Wharton Budget Model, 'Options for Universal Basic Income: Dynamic Modeling' (29 March 2018)",
          sourceUrl: "https://budgetmodel.wharton.upenn.edu/issues/2018/3/29/options-for-universal-basic-income-dynamic-modeling",
          reasoning:
            "A respected nonpartisan model that shows results under three funding choices, which makes its trade-offs clear. The output losses come from an assumed fall in hours worked of 3% to 6%; the externally financed result, 5.8% less work, is larger than Alaska's real dividend produced (no fall in employment), which suggests the model's behavioral assumptions may be strong.",
        },
        {
          id: "roosevelt-institute-gdp-growth",
          title: "Roosevelt Institute 2017: a deficit-financed $1,000 a month would grow GDP 12.56% over eight years",
          description:
            "Using the Levy Economics Institute's macroeconometric model over an eight-year horizon, the Roosevelt Institute projected that a deficit-financed $1,000-a-month UBI would raise GDP by 12.56%, driven by higher consumer spending among lower-income recipients, who spend more of each dollar. The authors write that 'the economy can not only withstand large increases in federal spending, but could also grow thanks to the stimulative effects of cash transfers.' Critics note the model assumes the economy has room to grow without inflation, which is untested at this scale.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source: "Nikiforos, Steinbaum & Zezza, 'Modeling the Macroeconomic Effects of a Universal Basic Income', Roosevelt Institute (2017)",
          sourceUrl: "https://rooseveltinstitute.org/publications/macroeconomic-effects-universal-basic-income/",
          reasoning:
            "The strongest published case that UBI need not shrink the economy. The Roosevelt Institute is progressive and the model is demand-driven, with no supply constraint or inflation response, so it marks the optimistic edge of the range. Penn Wharton, modeling a smaller plan with supply-side behavior, got the opposite sign.",
        },
      ],
    },
  ],
  aliases: [
    "Should developed nations adopt a universal basic income?",
    "Should the government give everyone a basic income?",
    "Does universal basic income work?",
    "UBI",
  ],
  references: [
    {
      title: "The Employment Effects of a Guaranteed Income — Vivalt et al., NBER w32719 (rev. 2026), Quarterly Journal of Economics (2026)",
      url: "https://www.nber.org/papers/w32719",
    },
    {
      title: "Does Income Affect Health? Evidence from a Randomized Controlled Trial of a Guaranteed Income — Miller et al., NBER w32711",
      url: "https://www.nber.org/papers/w32711",
    },
    {
      title: "The Effect of a Monthly Unconditional Cash Transfer on Children's Development at Four Years of Age — Noble et al., NBER w33844 (2025)",
      url: "https://www.nber.org/papers/w33844",
    },
    {
      title: "Kenya UBI study: results from a long-term experiment — GiveDirectly (2023)",
      url: "https://www.givedirectly.org/2023-ubi-results/",
    },
    {
      title: "Basic Income Pilot Project: Labour results — Pilotprojekt Grundeinkommen / DIW (2025)",
      url: "https://www.pilotprojekt-grundeinkommen.de/en/labour",
    },
    {
      title: "The Labor Market Impacts of Universal and Permanent Cash Transfers: Evidence from the Alaska Permanent Fund — Jones & Marinescu, AEJ: Economic Policy (2022)",
      url: "https://www.aeaweb.org/articles?id=10.1257/pol.20190299",
    },
    {
      title: "Poverty in the United States: 2022 — US Census Bureau (2023)",
      url: "https://www.census.gov/library/publications/2023/demo/p60-280.html",
    },
    {
      title: "Final Evaluation of the Finnish Basic Income Experiment 2017-2018 — Ministry of Social Affairs and Health, Finland",
      url: "https://julkaisut.valtioneuvosto.fi/handle/10024/162219",
    },
    {
      title: "Options for Universal Basic Income: Dynamic Modeling — Penn Wharton Budget Model (2018)",
      url: "https://budgetmodel.wharton.upenn.edu/issues/2018/3/29/options-for-universal-basic-income-dynamic-modeling",
    },
    {
      title: "Does Andrew Yang's 'Freedom Dividend' Proposal Add Up? — Tax Foundation",
      url: "https://taxfoundation.org/blog/andrew-yang-value-added-tax-universal-basic-income/",
    },
    {
      title: "Macroeconomic Effects of Universal Basic Income Programs — Roosevelt Institute (2017)",
      url: "https://rooseveltinstitute.org/publications/macroeconomic-effects-universal-basic-income/",
    },
    {
      title: "Cash Transfers and Temptation Goods — Evans & Popova, Economic Development and Cultural Change (2017)",
      url: "https://ideas.repec.org/a/ucp/ecdecc/doi10.1086-689575.html",
    },
    {
      title: "TANF Reaching Few Poor Families — Center on Budget and Policy Priorities",
      url: "https://www.cbpp.org/research/family-income-support/tanf-reaching-few-poor-families",
    },
    {
      title: "Overview of the Final Report of the Seattle-Denver Income Maintenance Experiment — US DHHS",
      url: "https://aspe.hhs.gov/reports/overview-final-report-seattle-denver-income-maintenance-experiment",
    },
    {
      title: "The Town With No Poverty — Forget, Canadian Public Policy (2011)",
      url: "https://utpjournals.press/doi/abs/10.3138/cpp.37.3.283",
    },
    {
      title: "Stockton Economic Empowerment Demonstration (SEED)",
      url: "https://www.stocktondemonstration.org/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Would people stop working if they got $1,000 a month?",
      content:
        "Not most of them, but some would work less. The largest US trial, $1,000 a month for three years, found labor-force participation 4.2 points lower and earnings about $1,900 a year lower than in the control group, with the extra time going mostly to leisure. Germany's three-year pilot found about an hour less work a week, and a 12-year basic income in Kenya and Alaska's dividend found no fall in total work. No trial has tested a permanent payment to everyone in a rich country.",
    },
    {
      id: "q2",
      title: "Can any country afford a universal basic income?",
      content:
        "$1,000 a month for every US adult costs about $2.8 trillion a year gross. The Tax Foundation found Yang's plan, with a 10% VAT and four other taxes, would still add about $1.5 trillion a year to the deficit. The net cost is lower if most of the payment is taxed back from higher earners. Dynamic models disagree: Penn Wharton finds GDP falls under every funding option; the Roosevelt Institute finds a deficit-financed plan grows it.",
    },
    {
      id: "q3",
      title: "Is a basic income better than targeted programs like food stamps?",
      content:
        "Cash is not wasted on alcohol or tobacco, and it cuts poverty: US child poverty fell to 5.2% in 2021 when monthly child payments ran, then rose to 12.4% when they stopped. But recent US trials found $333 to $1,000 a month did not improve measured health or young children's development, and a universal check goes to millionaires too. Targeted programs aim at need but miss many: only 21 of every 100 poor families got TANF cash in 2020.",
    },
  ],
};
