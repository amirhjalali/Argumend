import type { Topic } from "@/lib/schemas/topic";

export const immigrationBorderCrisisData = {
  id: "immigration-border-crisis",
  title: "The US Immigration & Border Crisis",
  meta_claim:
    "The current approach to US immigration — combining border enforcement, asylum restrictions, and deportation — is the most effective way to manage immigration and protect national interests.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Border Security & Enforcement
    // =========================================================================
    {
      id: "border-security-enforcement",
      title: "Border Security & Enforcement",
      short_summary:
        "The US-Mexico border saw record encounters exceeding 2.4 million in FY2023 before dropping sharply in FY2024-2025 following executive actions and policy changes. The debate centers on whether enforcement-first approaches actually deter unauthorized crossings or simply redirect migration flows while expanding humanitarian crises.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Enforcement-only approaches have failed for decades despite massive spending. The US spent over $333 billion on immigration enforcement between 1986 and 2023 according to the American Immigration Council. Border walls are circumvented through tunnels, ladders, and remote crossings. Increased enforcement pushes migrants into more dangerous routes, raising death tolls — over 890 migrants died crossing the border in FY2022, the deadliest year on record. The sharp decline in encounters in late 2024 and 2025 correlates more closely with Mexico's own enforcement cooperation and Biden/Trump-era asylum restrictions than with any wall or barrier. Enforcement without addressing root causes — violence, poverty, climate disruption in Central America and beyond — is an expensive treadmill.",
      proponent_rebuttal:
        "The record-shattering encounters of FY2023 — 2.47 million at the southwest border — demonstrated that perceived permissiveness creates a pull factor. When the Biden administration implemented asylum transit bans in June 2023 and the Trump administration reinstated Remain in Mexico and expanded expedited removal in 2025, encounters dropped by over 60%. Physical barriers combined with technology (sensors, drones, surveillance towers) channel crossings to monitored areas. Operation Lone Star, Texas's state-level enforcement initiative, showed that visible deterrence reduces crossings in targeted sectors. Without credible enforcement, asylum and legal immigration systems are overwhelmed by those who bypass them, undermining public support for all immigration.",
      crux: {
        id: "enforcement-deterrence-causation",
        title: "The Enforcement-Deterrence Correlation Test",
        description:
          "If enforcement is the primary driver of border crossing reductions, we should see sharp declines correlated with specific enforcement actions (wall construction, policy changes, troop deployments) rather than external factors (economic conditions in origin countries, Mexican enforcement cooperation, seasonal patterns). A rigorous causal analysis can distinguish enforcement effects from confounding variables.",
        methodology:
          "Conduct a multivariate regression analysis correlating monthly encounter data with: (1) enforcement spending and personnel levels, (2) miles of new barrier construction, (3) specific policy implementations with exact dates, (4) economic indicators in top origin countries (Guatemala, Honduras, El Salvador, Venezuela, Cuba), (5) Mexican enforcement cooperation metrics, and (6) seasonal patterns. Use interrupted time-series analysis to isolate the causal impact of each enforcement action from background trends.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Econometric analysis requiring CBP microdata and origin-country economic data)",
      },
      evidence: [
        {
          id: "record-encounters-fy2023",
          title: "Southwest Border Encounters Hit Record 2.47 Million in FY2023",
          description:
            "US Customs and Border Protection recorded 2.47 million encounters at the southwest border in FY2023, the highest number in recorded history. This included 2.05 million between ports of entry (illegal crossings) and 420,000 at ports of entry. The top nationalities were Venezuelan, Mexican, Guatemalan, Honduran, and Colombian. CBP was processing over 10,000 encounters per day during peak months, overwhelming detention capacity and immigration courts.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 8,
          },
          source: "US Customs and Border Protection; Migration Policy Institute",
          sourceUrl: "https://www.cbp.gov/newsroom/stats/southwest-land-border-encounters",
          reasoning:
            "CBP encounter data is official government statistics published monthly. The record numbers support the argument that a crisis exists requiring enforcement action. However, encounters include asylum seekers presenting themselves to authorities — not solely people evading detection — complicating the framing.",
        },
        {
          id: "encounters-drop-post-restrictions",
          title: "Encounters Dropped 60%+ After Asylum Restrictions in 2023-2025",
          description:
            "Following the Biden administration's asylum transit ban (June 2023), encounters at the southwest border dropped significantly. Under the Trump administration's reinstated Remain in Mexico policy, expanded expedited removal, and third-country transit bars in 2025, monthly encounters fell to approximately 47,000-60,000 by early 2025 — a 75% decline from FY2023 peaks. Proponents cite this as proof that enforcement and policy restrictions deter crossings.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "CBP; Reuters; Migration Policy Institute",
          sourceUrl: "https://www.migrationpolicy.org/programs/us-immigration-policy-program",
          reasoning:
            "The temporal correlation between restrictive policies and declining encounters is strong. However, Mexico simultaneously increased its own enforcement under US diplomatic pressure, and economic conditions shifted in key origin countries. Attributing the decline solely to US enforcement overstates the causal claim.",
        },
        {
          id: "enforcement-spending-333-billion",
          title: "$333 Billion Spent on Immigration Enforcement Since 1986 with Recurring Crises",
          description:
            "The American Immigration Council calculated that the US spent $333 billion (inflation-adjusted) on immigration enforcement between 1986 and 2023. Border Patrol staffing grew from 3,700 agents in 1992 to over 19,500 by 2023. Despite this massive investment, unauthorized border crossings have surged repeatedly — in the late 1990s, mid-2000s, 2019, and 2021-2023 — suggesting that enforcement alone does not produce durable deterrence.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "American Immigration Council; Congressional Research Service; DHS Budget Data",
          sourceUrl: "https://www.americanimmigrationcouncil.org/research/the-cost-of-immigration-enforcement",
          reasoning:
            "The spending data is drawn from official budget documents and is independently verifiable. The recurring nature of border surges despite decades of escalating enforcement directly challenges the claim that enforcement is effective. However, proponents argue that surges would have been worse without enforcement investment.",
        },
        {
          id: "migrant-death-toll-record",
          title: "Record 890+ Migrant Deaths at the Border in FY2022",
          description:
            "The International Organization for Migration recorded over 890 migrant deaths along the US-Mexico border in FY2022, the deadliest year on record. Causes include dehydration, drowning in the Rio Grande, heat exposure in remote desert areas, and suffocation in smuggling vehicles. Research from the University of Arizona's Binational Migration Institute shows that increased enforcement in urban crossing areas has pushed migrants into more remote, deadly terrain — a phenomenon documented since Operation Gatekeeper in 1994.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "International Organization for Migration; University of Arizona Binational Migration Institute",
          sourceUrl: "https://missingmigrants.iom.int/region/americas",
          reasoning:
            "IOM is the authoritative independent body for migrant death tracking, and academic research on the 'funnel effect' of enforcement is peer-reviewed. This evidence challenges the moral legitimacy of enforcement-first approaches but does not directly address their effectiveness in reducing crossings. Proponents argue that fewer crossings ultimately means fewer deaths.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Economic Impact
    // =========================================================================
    {
      id: "economic-impact",
      title: "Economic Impact of Immigration",
      short_summary:
        "Immigrants — including unauthorized immigrants — generate substantial economic activity, pay billions in taxes, and fill critical labor shortages. But critics argue unauthorized immigration depresses wages in low-skill sectors and strains public services in border communities.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Immigration is a net economic positive at virtually every level of analysis. The Congressional Budget Office estimated in 2024 that the recent immigration surge would add $7 trillion to US GDP and $1 trillion in federal revenue over the next decade. Immigrants start businesses at higher rates than native-born Americans — 25.5% of US entrepreneurs are immigrants despite being 14% of the population. Unauthorized immigrants paid an estimated $96.7 billion in federal, state, and local taxes in 2022 according to the Institute on Taxation and Economic Policy. Sectors like agriculture, construction, hospitality, and meatpacking face severe labor shortages that immigrant workers fill. Mass deportation would cause economic disruption estimated at $1.1 trillion by the American Immigration Lawyers Association.",
      proponent_rebuttal:
        "Aggregate GDP growth masks distributional effects. Harvard economist George Borjas's research shows that immigration between 1980 and 2000 reduced wages for native-born workers without a high school diploma by 7.4%. The National Academy of Sciences' 2017 comprehensive study found that while immigration is positive for the overall economy, first-generation immigrants — especially those with low education — impose net fiscal costs on state and local governments of approximately $1,600 per person per year. Communities near the border bear disproportionate costs for emergency healthcare, education, and law enforcement while the economic benefits accrue nationally. A rational immigration system should prioritize skills-based admission like Canada and Australia rather than tolerating a chaotic unauthorized system.",
      crux: {
        id: "wage-impact-analysis",
        title: "The Distributional Wage Impact Assessment",
        description:
          "If immigration primarily depresses wages for native-born low-skill workers, enforcement and restriction are economically justified for protecting vulnerable American workers. If wage effects are negligible or offset by complementary economic benefits (lower consumer prices, business creation, social security contributions), the economic case for restriction collapses.",
        methodology:
          "Replicate and extend the Borjas (2003) and Card (2005) methodologies using 2015-2025 data from the Current Population Survey and American Community Survey. Compare wage trajectories in high-immigration metropolitan areas versus low-immigration areas, controlling for cost of living, industry composition, and education levels. Separately analyze effects on native-born workers without a high school diploma, with a high school diploma, and with a college degree. Include analysis of consumer price effects and business creation rates.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (Census microdata and CPS data are publicly available for analysis)",
      },
      evidence: [
        {
          id: "cbo-7-trillion-gdp",
          title: "CBO Projects Immigration Surge Adds $7 Trillion to GDP Over Decade",
          description:
            "In February 2024, the nonpartisan Congressional Budget Office projected that the recent surge in immigration (2022-2026) would increase US GDP by $7 trillion and federal revenue by $1 trillion over the 2024-2034 period. The CBO attributed this to a larger labor force, increased consumer spending, and higher tax receipts. The report noted that immigration would also increase federal spending on services, but the net fiscal impact would be positive at the federal level.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "Congressional Budget Office",
          sourceUrl: "https://www.cbo.gov/publication/59946",
          reasoning:
            "The CBO is Congress's nonpartisan economic analysis office with maximum institutional credibility. The $7 trillion GDP projection directly challenges the claim that current immigration harms national interests. However, the CBO analysis examines aggregate effects, not distributional impacts on specific communities or worker categories.",
        },
        {
          id: "borjas-wage-depression",
          title: "Borjas Research: Immigration Reduced Low-Skill Native Wages by 7.4%",
          description:
            "Harvard labor economist George Borjas, the most cited scholar arguing that immigration depresses wages, found that immigration between 1980 and 2000 reduced wages for native-born Americans without a high school diploma by 7.4%, while increasing wages for college graduates by 3.5%. His 2015 paper on the Mariel boatlift reanalysis suggested larger negative effects than David Card's famous 1990 study found. However, Borjas's methodology has been challenged by multiple economists, and his Mariel boatlift reanalysis was contested by Clemens and Hunt (2018).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "George Borjas, Harvard Kennedy School; Quarterly Journal of Economics",
          sourceUrl: "https://scholar.harvard.edu/borjas/publications/immigration-economics",
          reasoning:
            "Borjas is a credentialed labor economist publishing in top journals. However, replicability is lower because his results are sensitive to methodological choices (skill groupings, time periods) and are disputed by other leading economists including David Card (Nobel laureate). The academic debate itself is evidence that the wage effect is uncertain, not settled.",
        },
        {
          id: "unauthorized-immigrant-taxes",
          title: "Unauthorized Immigrants Paid $96.7 Billion in Taxes in 2022",
          description:
            "The Institute on Taxation and Economic Policy estimated that unauthorized immigrants paid $96.7 billion in federal, state, and local taxes in 2022, including $25.7 billion in Social Security taxes and $6.4 billion in Medicare taxes — benefits they are largely ineligible to collect. At the state and local level, unauthorized immigrants paid $37.3 billion in sales, excise, income, and property taxes. The average effective tax rate for unauthorized immigrants was 26.2%, higher than the rate paid by the top 1% of earners.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Institute on Taxation and Economic Policy",
          sourceUrl: "https://itep.org/undocumented-immigrants-taxes-2024/",
          reasoning:
            "ITEP is a respected nonpartisan tax policy organization, though some critics question its methodology for estimating unauthorized immigrant incomes. The finding that unauthorized immigrants are net contributors to Social Security and Medicare — programs they cannot access — directly challenges the 'burden on taxpayers' narrative.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Humanitarian Concerns
    // =========================================================================
    {
      id: "humanitarian-concerns",
      title: "Humanitarian Concerns & Asylum",
      short_summary:
        "The US asylum system faces a backlog of 3.7+ million cases with average wait times exceeding 4 years. Asylum restrictions may violate international law obligations, while the lack of processing capacity leaves genuine refugees in limbo and incentivizes unauthorized crossings.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The US has binding obligations under the 1951 Refugee Convention and the 1967 Protocol not to return refugees to countries where they face persecution. Asylum restrictions — including transit bans, Remain in Mexico, and expedited removal — violate these obligations by denying asylum seekers access to the process. The immigration court backlog of 3.7 million cases with 4+ year wait times is a policy choice, not an inevitability — Congress could fund more immigration judges but has chronically underfunded the courts while expanding enforcement. Detention conditions have been condemned by DHS's own Inspector General, with documented overcrowding, inadequate medical care, and at least 200 deaths in ICE custody since 2004. The separation of families, including children, represents a moral catastrophe regardless of its deterrent effect.",
      proponent_rebuttal:
        "The asylum system has been exploited by economic migrants coached to claim credible fear at the border. In FY2023, only 14% of completed asylum cases resulted in a grant of asylum, suggesting that the vast majority of claimants do not meet the legal standard for persecution. Smuggling organizations charge $5,000-$15,000 per person and instruct migrants to claim asylum as a strategy for entry. Without enforcement consequences, the asylum system becomes a de facto open border — anyone who arrives and claims fear gets released into the US with a court date years away. The Remain in Mexico policy and safe third country agreements restore the integrity of the system by requiring applicants to wait in safe locations rather than being released into the US interior.",
      crux: {
        id: "asylum-grant-rate-analysis",
        title: "The Asylum Merits Assessment",
        description:
          "If the majority of asylum seekers at the southern border have legitimate persecution claims that would be granted under fair adjudication, then restrictions are denying protection to refugees. If most claims lack merit and would be denied even under generous adjudication, the system is being used as a backdoor for economic migration.",
        methodology:
          "Analyze a stratified random sample of 5,000 asylum cases from FY2020-2025, including cases decided on the merits and those dismissed for procedural reasons (failure to appear, missed deadlines). For each case, have independent immigration law experts assess the strength of the claim on its merits, controlling for quality of legal representation, judge assignment (asylum grant rates vary from 5% to 90% by judge), and whether the applicant was detained or free. This would reveal how many claims would succeed under fair, uniform adjudication.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Large-scale legal case review requiring immigration law expertise and court record access)",
      },
      evidence: [
        {
          id: "court-backlog-3-7-million",
          title: "Immigration Court Backlog Exceeds 3.7 Million Cases",
          description:
            "As of early 2025, the Executive Office for Immigration Review reported a backlog exceeding 3.7 million pending immigration cases, up from 1.1 million in 2019. The average wait time for a hearing exceeds 4 years, with some jurisdictions taking 7+ years. There are approximately 600 immigration judges handling this caseload — compared to roughly 680 federal district judges handling all civil and criminal cases in the entire federal system. The chronic underfunding of immigration courts relative to enforcement spending (ICE and CBP budgets exceed EOIR's by more than 10:1) is a structural choice.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "TRAC Immigration, Syracuse University; Executive Office for Immigration Review",
          sourceUrl: "https://trac.syr.edu/immigration/reports/judgereports/",
          reasoning:
            "TRAC is an independent academic research center that obtains data through FOIA requests and is widely cited by all sides. The massive backlog directly undermines the functioning of any immigration policy — neither enforcement nor asylum processing can work when cases take 4-7 years to resolve. This supports the argument that the crisis is one of capacity, not border security.",
        },
        {
          id: "asylum-grant-rate-14-percent",
          title: "Only 14% of Completed Asylum Cases Granted in FY2023",
          description:
            "TRAC data shows that immigration judges granted asylum in approximately 14% of cases decided on the merits in FY2023. Denial rates exceeded 70%, with the remainder being other dispositions (administrative closure, voluntary departure). However, grant rates vary enormously by judge (from under 5% to over 90%), by nationality (Venezuelans, Chinese, and Afghans have higher grant rates; Central Americans lower), and by whether the applicant has legal representation (represented applicants are 5x more likely to win asylum).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "TRAC Immigration, Syracuse University",
          sourceUrl: "https://trac.syr.edu/phptools/immigration/asylum/",
          reasoning:
            "The low grant rate supports the argument that many claims lack merit. However, the extreme variation by judge and representation status suggests the low rate partly reflects systemic inequities (lack of counsel, judge bias) rather than uniformly weak claims. Directness is lower because the grant rate alone does not tell us how many denied cases had genuine merit.",
        },
        {
          id: "ice-custody-deaths",
          title: "200+ Deaths in ICE Custody Since 2004 with Documented Medical Neglect",
          description:
            "At least 200 people have died in ICE custody since 2004, according to the ACLU and government records obtained through FOIA. DHS's own Inspector General has documented overcrowding, inadequate medical care, use of solitary confinement, and failure to follow medical recommendations. In 2019, the IG found conditions 'representing immediate risks or egregious violations' at multiple facilities. Reports of children separated from parents, detainees denied medication, and lack of mental health care have been documented by Human Rights Watch, Physicians for Human Rights, and congressional investigations.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "DHS Office of Inspector General; ACLU; Human Rights Watch",
          sourceUrl: "https://www.oig.dhs.gov/reports/2019/management-alert-dhs-needs-address-dangerous-overcrowding-and-prolonged-detention-children/oig-19-51",
          reasoning:
            "DHS's own Inspector General findings carry high credibility because they are internal government oversight. The documented conditions raise serious humanitarian and legal concerns. Directness is somewhat lower because detention conditions are a consequence of enforcement policy, not a direct measure of its effectiveness in managing immigration.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Southwest Land Border Encounters — US Customs and Border Protection",
      url: "https://www.cbp.gov/newsroom/stats/southwest-land-border-encounters",
    },
    {
      title: "The Demographic and Economic Impacts of Immigration — Congressional Budget Office (2024)",
      url: "https://www.cbo.gov/publication/59946",
    },
    {
      title: "Immigration Court Backlog Tool — TRAC, Syracuse University",
      url: "https://trac.syr.edu/phptools/immigration/court_backlog/",
    },
    {
      title: "The Cost of Immigration Enforcement — American Immigration Council",
      url: "https://www.americanimmigrationcouncil.org/research/the-cost-of-immigration-enforcement",
    },
    {
      title: "Missing Migrants Project: Americas — International Organization for Migration",
      url: "https://missingmigrants.iom.int/region/americas",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does enforcement actually deter unauthorized crossings?",
      content:
        "The US has spent $333 billion on immigration enforcement since 1986, yet unauthorized crossings have surged repeatedly. Encounters dropped 60%+ after 2023 restrictions, but was this due to US enforcement, Mexican cooperation, economic shifts, or all three? Can enforcement-only approaches produce durable results without addressing root causes?",
    },
    {
      id: "q2",
      title: "Who bears the economic costs and benefits of immigration?",
      content:
        "The CBO projects a $7 trillion GDP boost from recent immigration, and unauthorized immigrants paid $96.7 billion in taxes in 2022. But Borjas's research suggests low-skill native wages fell 7.4%, and border communities bear disproportionate service costs. Is immigration a net positive with inequitable distribution, or a genuinely divisive economic force?",
    },
    {
      id: "q3",
      title: "Can the asylum system function without fundamental reform?",
      content:
        "With 3.7 million pending cases, 4+ year wait times, and grant rates ranging from 5% to 90% depending on the judge, the asylum system satisfies neither enforcement advocates nor refugee protection advocates. Is the crisis a result of too many frivolous claims, chronic underfunding of courts, or a system designed in 1980 that cannot handle modern migration patterns?",
    },
  ],
};
