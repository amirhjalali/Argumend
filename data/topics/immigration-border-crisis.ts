export const immigrationBorderCrisisData = {
  id: "immigration-border-crisis",
  title: "The US Immigration & Border Crisis",
  question:
    "Are a closed border and mass deportations the right way to handle illegal immigration?",
  meta_claim:
    "The approach the US has taken since January 2025 (shutting off asylum at the border, record detention and a large-scale deportation drive) is the right way to handle illegal immigration.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: Border Patrol recorded 98,708 southwest border
  // apprehensions in fiscal 2026 (DHS, preliminary); MPI estimates about
  // 980,000 deportations from 20 Jan 2025 to 31 Jul 2026; TRAC counted 65,765
  // people in ICE detention on 11 July 2026; the asylum grant rate in
  // immigration court fell to 5.5% in June 2026. The July 2025 reconciliation
  // act added $170.7 billion for enforcement.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Border Patrol made 98,708 arrests at the southwest border in the year to September 2026, the fewest on record, down from 2.05 million in 2023. Inside the country, the government carried out about 980,000 deportations in the first 18 months of President Trump's second term, by the Migration Policy Institute's count. The fight is over whether that is the right way to handle illegal immigration: what closed the border, who is being removed, and at what cost.",
    confidence: 85,
    source:
      "DHS preliminary fiscal 2026 figures, reported 16 October 2026; KSL (7 October 2025) for fiscal 2023; Migration Policy Institute fact sheet (October 2026)",
    sourceUrl:
      "https://www.migrationpolicy.org/system/files/2026-10/mpi-deportations-fact-sheet-2026-final.pdf",
  },
  simple_case: [
    "The answer bears on the millions of people living in the US without legal status, on the families and employers around them, and on whether people fleeing persecution can still ask for asylum at the border.",
    "Congress has funded the drive for years to come: the July 2025 reconciliation act added $170.7 billion for enforcement, including $45 billion for new detention centers.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What closed the border?
    // =========================================================================
    {
      id: "border-security-enforcement",
      title: "What Closed the Border?",
      short_summary:
        "Apprehensions peaked at 249,740 in December 2023, fell to 47,324 by December 2024 under Biden-era limits and Mexican enforcement, then to under 10,000 a month from February 2025. Fiscal 2026 ended with 98,708, the lowest ever. Who and what deserves the credit, and whether it lasts, is the first split.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Most of the fall came before January 2025, and the rest came from shutting the door on asylum seekers, not from walls. Monthly Border Patrol apprehensions dropped from 249,740 in December 2023 to 47,324 in December 2024, after Mexico stepped up its own enforcement and the June 2024 Biden rule limited asylum between ports of entry. Enforcement spending has climbed for four decades, roughly $333 billion from 1986 into the early 2020s by one estimate, and crossings surged anyway in the late 1990s, mid-2000s, 2019 and 2021 to 2023. Closing the border to asylum pushes people to wait in dangerous Mexican border towns or cross in remote desert, where deaths peaked at about 890 in fiscal 2022. And migration responds to conditions in Venezuela, Central America and Mexico that US policy does not control; a future crisis there could reopen the flow.",
      proponent_rebuttal:
        "When the US enforces the law without exceptions, people stop coming. Apprehensions fell from 2.05 million in fiscal 2023 to 237,565 in fiscal 2025 and 98,708 in fiscal 2026, the lowest since records began, and in fiscal 2026 Border Patrol released no one it apprehended into the country, the first such year in its history. After the new administration ended releases and CBP One appointments in January 2025, monthly apprehensions fell below 10,000 from February and stayed there. The Biden rule of 2024 helped, but it still allowed tens of thousands of crossings a month; the collapse came when everyone caught was detained or returned. The government reported about 250 miles of new barrier since January 2025 and an estimated 80% fall in migrant deaths. Fewer crossings also starve the smuggling cartels of their fees.",
      crux: {
        id: "enforcement-deterrence-causation",
        title: "The Deterrence Test",
        question:
          "Did border crossings fall because of US enforcement, or because of other factors, and will the fall last?",
        description:
          "Separate the effect of specific US policies (the June 2024 asylum rule, the January 2025 end of releases and CBP One, detention of everyone caught, new barrier) from Mexican enforcement and conditions in origin countries, and check whether the low numbers hold if conditions abroad worsen.",
        methodology:
          "Interrupted time-series analysis of monthly encounters by nationality against exact policy dates, alongside Mexican apprehension data, origin-country economic and violence indicators and seasonal patterns, extended through any new surge in departures from Venezuela, Central America or elsewhere.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Interrupted time-series analysis of monthly encounters by nationality against exact policy dates, barrier miles and enforcement spending, alongside Mexican enforcement cooperation, origin-country economic indicators and seasonal patterns.",
        },
        cost_to_verify:
          "$200K-500K (Econometric analysis requiring CBP microdata and origin-country economic data)",
        falsification: {
          supporter_flip:
            "If a monthly analysis by nationality found the drops tracking Mexican enforcement and conditions abroad more closely than US policy dates, or crossings rose again when a crisis hit an origin country despite the same US rules, the claim that US enforcement closed the border would weaken.",
          skeptic_flip:
            "If the analysis tied the fall below 10,000 a month to the January 2025 end of releases and asylum access, and the numbers held through a new crisis abroad, the view that enforcement is an expensive treadmill would be hard to hold.",
          common_ground:
            "Both sides agree apprehensions fell from a record 2.05 million in fiscal 2023 to 98,708 in fiscal 2026, and that a large part of the drop came before January 2025.",
          live_disagreement:
            "How much of the decline US enforcement caused, versus Mexico's own enforcement and conditions in origin countries, and whether closing asylum at the border is a lawful and humane way to get there.",
        },
      },
      evidence: [
        {
          id: "encounters-drop-post-restrictions",
          title: "DHS: 98,708 Southwest Border Apprehensions in Fiscal 2026, the Lowest on Record",
          description:
            "The Department of Homeland Security reported 98,708 Border Patrol apprehensions at the southwest border in the fiscal year ending 30 September 2026, preliminary figures it called a 95% decline from the Biden-era annual average of more than 1.8 million. Nationwide encounters were 379,243. It was the first fiscal year with no Border Patrol releases of apprehended migrants at the border. DHS also reported about 250 miles of new barrier since 20 January 2025 and an approximately 80% decline in migrant deaths. Fiscal 2025 had already been the lowest year since 1970, at 237,565.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 7,
          },
          source:
            "DHS preliminary fiscal 2026 figures, as reported by IANS via Social News XYZ (16 October 2026); KSL (7 October 2025) for fiscal 2025",
          sourceUrl: "https://www.socialnews.xyz/2026/10/16/us-reports-record-low-border-apprehensions/",
          reasoning:
            "The fall is real and large, and border apprehension counts are hard to fake. Independence is low because these are the administration's own preliminary figures, released without the September monthly data, and the death figure came without a full historical series.",
        },
        {
          id: "record-encounters-fy2023",
          title: "Border Patrol Apprehended 2.05 Million at the Southwest Border in Fiscal 2023",
          description:
            "US Customs and Border Protection recorded 2.47 million encounters at the southwest border in FY2023, the highest number in recorded history. This included 2.05 million Border Patrol apprehensions between ports of entry and 420,000 at ports of entry. CBP was processing over 10,000 encounters per day during peak months, overwhelming detention capacity and immigration courts.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 6,
          },
          source: "US Customs and Border Protection; Migration Policy Institute",
          sourceUrl: "https://www.cbp.gov/newsroom/stats/southwest-land-border-encounters",
          reasoning:
            "Official statistics that show the scale of the crisis the policy responded to. Encounters include asylum seekers who presented themselves to agents, not only people evading capture.",
        },
        {
          id: "decline-began-under-biden",
          title: "Apprehensions Fell 81% Under Biden, From 249,740 (Dec 2023) to 47,324 (Dec 2024)",
          description:
            "Monthly Border Patrol apprehensions at the southwest border peaked at 249,740 in December 2023 and had fallen to 47,324 by December 2024, the last full month of President Biden's term, after the June 2024 rule limiting asylum between ports of entry and stepped-up enforcement by Mexico. They fell further to 29,107 in January 2025 and 8,353 in February 2025, and stayed below 10,000 a month after that. Of the 237,565 apprehensions in fiscal 2025, 72% occurred before 20 January 2025.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source: "U.S. Border Patrol monthly figures, as reported by KSL (7 October 2025)",
          sourceUrl: "https://www.ksl.com/article/51386604",
          reasoning:
            "Shows that most of the drop from the peak predates the current policy, which undercuts any single-cause story. It also shows a second, sharp break in early 2025, which supporters credit to ending releases. The data cannot separate US policy from Mexico's enforcement on their own.",
        },
        {
          id: "enforcement-spending-333-billion",
          title: "About $333 Billion Spent on Enforcement Since 1986, With Repeated Surges",
          description:
            "The American Immigration Council has estimated cumulative federal immigration-enforcement spending at roughly $333 billion from 1986 into the early 2020s. Border Patrol staffing grew from about 3,700 agents in 1992 to roughly 19,500 by 2023. Unauthorized crossings surged repeatedly anyway: in the late 1990s, mid-2000s, 2019 and 2021-2023.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 6,
          },
          source: "American Immigration Council; Congressional Research Service; DHS Budget Data",
          sourceUrl: "https://www.americanimmigrationcouncil.org/research/the-cost-of-immigration-enforcement-and-border-security",
          reasoning:
            "From an immigrant-advocacy group, drawing on budget data. Repeated surges despite rising spending argue that money alone does not deter. Supporters reply that spending without a policy of detaining everyone caught was never a real test.",
        },
        {
          id: "migrant-death-toll-record",
          title: "Record ~890 Migrant Deaths at the Border in Fiscal 2022",
          description:
            "US Customs and Border Protection recorded approximately 890 migrant deaths in the southwest border sectors in FY2022, the deadliest year on record by that count; the International Organization for Migration's Missing Migrants Project separately documented at least 686 deaths and disappearances on the US-Mexico border in calendar 2022 and called it the world's deadliest land migration route. Research from the University of Arizona's Binational Migration Institute shows that increased enforcement in urban crossing areas has pushed migrants into more remote, deadly terrain, a pattern documented since Operation Gatekeeper in 1994.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "US Customs and Border Protection (Southwest Border deaths); International Organization for Migration Missing Migrants Project; University of Arizona Binational Migration Institute",
          sourceUrl: "https://missingmigrants.iom.int/region/americas",
          reasoning:
            "Shows the human cost of pushing crossings into remote terrain. It predates the current policy, and supporters argue that far fewer crossings mean far fewer deaths, as DHS reported for fiscal 2026.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Asylum: refuge or back door?
    // =========================================================================
    {
      id: "humanitarian-concerns",
      title: "Asylum: Refuge or Back Door?",
      short_summary:
        "Immigration judges granted asylum in 5.5% of decisions in June 2026, down from over 50% early in Biden's term and 32% at its end. Over the same period 279 judges were fired or resigned. Whether the low rate shows weak claims or a changed bench, and whether the backlog of about 3.4 million cases can be cleared fairly, is the second split.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The US promised in the 1967 Refugee Protocol not to return refugees to persecution, and the new system is built to say no. The asylum grant rate in immigration court fell to 5.5% in June 2026, the lowest TRAC has recorded, after 279 judges, about 38% of the 735 on the bench at the end of fiscal 2024, were fired or resigned. Of the judges who stayed, three-quarters raised their denial rates in fiscal 2026, by an average of 33 percentage points: the same kinds of cases, decided differently. Asylum seekers now pay a $100 fee to apply and $100 more for each year their case is pending. Grant rates have always varied from under 5% to over 90% depending on the judge, and people with lawyers win far more often, which means outcomes measure the system as much as the claims. Detention conditions have deteriorated too: 29 people died in ICE custody in the first half of fiscal 2026 alone, a record.",
      proponent_rebuttal:
        "Asylum is protection from persecution, not a route to a better job, and for years it was used as the second. Even before 2025, judges granted asylum in only about 14% of cases decided in fiscal 2023. Claiming fear at the border meant release and a court date years away, whatever the merits. The backlog reached 3.7 million cases at the end of fiscal 2024, so long that the system protected no one quickly. Under the new policy the backlog fell to about 3.4 million by late fiscal 2025, the first sustained fall in over a decade, and asylum decisions are at record levels. As Matt O'Brien, a former immigration judge now at the Federation for American Immigration Reform, put it, the share granted 'should be lower' because asylum is discretionary relief. Genuine refugees are better served by a system that decides claims in months than one that waits years.",
      crux: {
        id: "asylum-grant-rate-analysis",
        title: "The Asylum Merits Test",
        question:
          "Would most asylum seekers at the southern border qualify for protection under fair adjudication?",
        description:
          "If the majority of asylum seekers at the southern border have legitimate persecution claims that would be granted under fair adjudication, then restrictions are denying protection to refugees. If most claims lack merit and would be denied even under generous adjudication, the system is being used as a backdoor for economic migration.",
        methodology:
          "Analyse a stratified random sample of 5,000 asylum cases from FY2020-2026, including cases decided on the merits and those dismissed for procedural reasons, and have independent immigration law experts assess the strength of each claim, controlling for legal representation, judge assignment and detention status, and comparing decisions before and after the 2025-26 changes to the bench.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Independent immigration-law experts rating the merits of a stratified sample of 5,000 asylum cases from FY2020 to 2026, including those dismissed on procedure, controlling for legal representation and judge assignment, and comparing like cases decided before and after the 2025-26 changes to the bench.",
        },
        cost_to_verify:
          "$1-3M (Large-scale legal case review requiring immigration law expertise and court record access)",
        falsification: {
          supporter_flip:
            "If independent experts reviewing a stratified sample of asylum cases, controlling for representation and judge, found most claims strong on the merits, restrictions would be denying protection to refugees, and the current approach would fail on its own legal terms.",
          skeptic_flip:
            "If an independent review rated most sampled claims weak on the merits, under judges appointed by both parties, the low grant rate would look less like a changed bench and more like the law applied as written.",
          common_ground:
            "Both sides agree the immigration court backlog peaked at about 3.7 million cases at the end of fiscal 2024, that asylum grant rates vary widely by judge and representation, and that multi-year waits served neither refugees nor enforcement.",
          live_disagreement:
            "Whether most claimants at the southern border have real persecution claims that the new system wrongly rejects, or whether the low grant rate shows asylum had become a route for economic migration, given that the rate fell as the bench was remade.",
        },
      },
      evidence: [
        {
          id: "asylum-grant-rate-14-percent",
          title: "TRAC: Only About 14% of Asylum Cases Decided in Fiscal 2023 Were Granted",
          description:
            "TRAC data show immigration judges granted asylum in approximately 14% of cases decided on the merits in FY2023. Denial rates exceeded 70%, with the remainder being other dispositions (administrative closure, voluntary departure). Grant rates vary enormously by judge (from under 5% to over 90%), by nationality, and by whether the applicant has legal representation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "TRAC Immigration, Syracuse University",
          sourceUrl: "https://trac.syr.edu/phptools/immigration/asylum/",
          reasoning:
            "A low grant rate before the current administration supports the view that many claims did not meet the legal standard. The wide variation by judge and representation means the rate is not a clean measure of merit.",
        },
        {
          id: "backlog-falling-2025",
          title: "Court Backlog Fell From 3.7 Million to About 3.4 Million During Fiscal 2025",
          description:
            "The immigration court backlog reached an all-time high of 3.7 million cases at the end of fiscal 2024 and had dropped to 3.4 million, a decrease of about 8%, with one month remaining in fiscal 2025, according to TRAC data reported by Roll Call. The average wait for cases in the backlog was 636 days as of March 2025. TRAC reported in 2026 that asylum case dispositions had risen to record levels after several hundred new judges were hired.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Roll Call (20 October 2025), citing TRAC; TRAC, asylum decisions update (August 2026)",
          sourceUrl: "https://tracreports.org/tracatwork/detail/A6140.html",
          reasoning:
            "The first sustained fall in the backlog in over a decade, which supporters read as a system working again. Faster is not the same as fairer, and part of the fall reflects cases closed by removal orders and voluntary departures.",
        },
        {
          id: "asylum-grant-rate-2026",
          title: "TRAC 2026: Asylum Grant Rate Fell to 5.5% After 279 Judges Were Fired or Resigned",
          description:
            "In June 2026 the asylum grant rate in immigration court had fallen to 5.5% and the denial rate had risen to 94.1%; 771 people were granted asylum that month. The grant rate had been over 50% early in the Biden administration and 32% at its end. In fiscal 2025 and 2026, 279 immigration judges were fired or resigned, about 38% of the 735 employed at the end of fiscal 2024. Of the 130 judges who decided asylum cases in every year from fiscal 2021 to 2026, three-fourths raised their denial rates in fiscal 2026, by an average of 33 percentage points.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "TRAC Immigration, Syracuse University, asylum decisions update (31 August 2026)",
          sourceUrl: "https://tracreports.org/whatsnew/email.260831.html",
          reasoning:
            "Judges who stayed on the bench deciding similar caseloads became much stricter, which suggests the change reflects pressure or policy, not only weaker claims. TRAC cautions that caseload, representation and nationality all affect the rates, and supporters argue the earlier rates were too lenient.",
        },
        {
          id: "ice-custody-deaths",
          title: "29 Deaths in ICE Custody in the First Half of Fiscal 2026, a Record",
          description:
            "By 17 April 2026, 29 people had died in ICE custody since October 2025, passing the previous record of 28 in 2004, with about 60,000 people in detention. Initial ICE reports listed causes including suicide, alcohol withdrawal and liver and kidney failure. The El Paso County medical examiner ruled one death at Camp East Montana a homicide, citing 'asphyxia due to neck and torso compression,' and the FBI is investigating. DHS said 'death rates in custody under the Trump administration are 0.009 percent of the detained population.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "NPR via MPR News, 'Deaths of migrants in ICE custody hit record high under Trump' (17 April 2026)",
          sourceUrl: "https://www.mprnews.org/story/2026/04/17/npr-deaths-of-migrants-in-ice-custody-hit-record-high-under-trump",
          reasoning:
            "A record count of deaths is a direct humanitarian cost of mass detention. DHS's point that the rate is low relative to a record detained population is also true, so the count alone does not show conditions worsened per person.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Mass deportation: who is removed, and at what cost?
    // =========================================================================
    {
      id: "interior-deportations",
      title: "Mass Deportation: Who Is Being Removed?",
      short_summary:
        "About 980,000 deportations in 18 months, most of them people caught at the border. Of those removed after two or more years in the US, 71% had never been convicted of a crime. Detention reached a record 65,765 in July 2026. Whether that is enforcing the law or uprooting settled families, and whether it is worth $170.7 billion, is the third split.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The promise was to deport criminals; the practice is deporting neighbours. Of the 980,000 deportations from January 2025 to July 2026, just 20% were of people convicted of a crime, and only 31% of formal removals, against an average of 44% in fiscal 2009-2021. Of those deported after at least two years in the country, 71%, about 280,000 people, had never been convicted of anything. In July 2026, 70.6% of the 65,765 people in ICE detention had no criminal conviction. Agents detained at least 170 US citizens in the first months of the drive, about 20 of them children. The 2025 reconciliation act spends $170.7 billion, including $45 billion for detention, a 308% annual increase in the detention budget, on removing people most of whom have no criminal record. A fair system would separate the dangerous from the settled.",
      proponent_rebuttal:
        "Immigration law applies to everyone who broke it, not only to those who also committed other crimes, and a law no one enforces invites the next surge. The government has carried out about 980,000 deportations in 18 months, in line with its public statements, and about 190,000 of them were people convicted of crimes. Most deportations, 69%, were of people caught at the border, which is how deterrence works: arrivals who know they will be sent back stop coming. Interior removals have risen from 8,000 a month to 19,000 as the system scales, and Congress, the elected branch, chose in July 2025 to fund 10,000 more ICE officers. Voluntary departure, which MPI counts in 170,000 of the deportations, lets people leave without detention. Mistaken detentions of citizens are wrong and should be fixed, but they are a small share of hundreds of thousands of arrests.",
      crux: {
        id: "deportation-targets",
        title: "The Who-Is-Removed Test",
        question:
          "Are deportations mainly removing threats to public safety, or workers and families who have lived here for years?",
        description:
          "Measure, for people deported from inside the country, their criminal records (by offense severity), years of US residence, work history and US-citizen children, and compare with the stated priorities and with earlier administrations.",
        methodology:
          "Analyse ICE arrest, detention and removal records released under FOIA (for example through the Deportation Data Project) by conviction type, years in the US and family ties; compare removal 'criminality rates' across fiscal 2009-2026 using consistent definitions; and track wrongful detentions of citizens and lawful residents.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "ICE arrest and removal records released under FOIA, broken down by conviction severity, years of US residence and US-citizen children, compared year by year from fiscal 2009 to 2026 using the same definitions, plus a count of citizens and lawful residents wrongly detained.",
        },
        cost_to_verify: "$50K-$200K (FOIA data already partly public)",
        falsification: {
          supporter_flip:
            "If records showed most interior removals were of people with no record beyond immigration violations who had lived in the US for many years with citizen children, and wrongful detentions of citizens ran into the thousands, the case that the drive targets threats to public safety would fail.",
          skeptic_flip:
            "If records showed most interior removals were of people with serious criminal convictions or recent arrivals with final orders, and wrongful detentions were rare and quickly corrected, the charge that the drive mainly uproots settled families would be hard to hold.",
          common_ground:
            "Both sides agree the government has carried out close to a million deportations since January 2025, that most were of people first caught at the border, and that detention reached record levels in 2026.",
          live_disagreement:
            "Whether removing long-settled people with no criminal record is fair enforcement of the law or a cost the country should not impose, and whether $170.7 billion buys more security spent this way than on courts, ports of entry or legal pathways.",
        },
      },
      evidence: [
        {
          id: "mpi-980k-deportations",
          title: "MPI 2026: About 980,000 Deportations in 18 Months, 190,000 of People With Convictions",
          description:
            "Using DHS data posted in FOIA reading rooms and released by the Deportation Data Project, former DHS statistics chief Marc Rosenblum estimated that ICE and CBP completed about 980,000 deportations between 20 January 2025 and 31 July 2026, 'a figure in line with the department's public statements.' Deportations are up from the Biden and first Trump administrations but 'remain well below the levels routinely observed in the early 2000s.' About 190,000 were of people convicted of a crime. Interior deportations rose from 8,000 a month in the first three months to 19,000 a month in May-July 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Marc R. Rosenblum, 'U.S. Deportations and \"Self-Deportations\" in the First 18 Months of the Second Trump Term,' Migration Policy Institute fact sheet (October 2026)",
          sourceUrl:
            "https://www.migrationpolicy.org/system/files/2026-10/mpi-deportations-fact-sheet-2026-final.pdf",
          reasoning:
            "An independent count confirming the administration is delivering removals at scale, including tens of thousands of people with convictions. It counts deportations, not whether they made anyone safer, and the same report supplies the skeptic's key figures.",
        },
        {
          id: "dhs-funding-reconciliation",
          title: "2025 Reconciliation Act: $170.7 Billion for Enforcement, 10,000 More ICE Officers",
          description:
            "H.R. 1, signed on 4 July 2025, provides $170.7 billion in additional funding for immigration and border enforcement, including $45 billion to build new detention centers, bringing ICE's detention budget to at least $14 billion a year (a 308% annual increase over fiscal 2024), $46.6 billion for border wall construction, and money to hire 10,000 more ICE officers within five years. Asylum applicants must pay a $100 fee plus $100 for each year their case is pending.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 9,
            directness: 3,
          },
          source: "American Immigration Council, 'What's in the Big Beautiful Bill? Immigration and Border Security Unpacked'",
          sourceUrl: "https://www.americanimmigrationcouncil.org/fact-sheet/big-beautiful-bill-immigration-border-security/",
          reasoning:
            "Shows that Congress, not only the executive, chose this approach and funded it for years. It says nothing about results, and the same figures are the skeptics' measure of cost. The summary comes from an immigrant-advocacy group, but the figures are from the enacted law.",
        },
        {
          id: "mpi-long-resident-no-conviction",
          title: "MPI 2026: 71% of Those Deported After Two-Plus Years in the US Had No Conviction",
          description:
            "Of deportations of people with two or more years of US residence, 71% (about 280,000) were of people never convicted of a crime; of those with ten or more years of residence, 61% (57,000). Overall, 20% of the 980,000 deportations were of people convicted of a crime, and 31% of formal removals, compared with an average of 44% in fiscal 2009-2021. Sixty-nine percent of all deportations were of people first intercepted at the border.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Marc R. Rosenblum, Migration Policy Institute fact sheet (October 2026)",
          sourceUrl:
            "https://www.migrationpolicy.org/system/files/2026-10/mpi-deportations-fact-sheet-2026-final.pdf",
          reasoning:
            "The most direct evidence on who is being removed, from public DHS data analysed by the department's former statistics chief. 'No conviction' does not mean no pending charges or prior removal orders, which supporters note.",
        },
        {
          id: "trac-detention-no-conviction",
          title: "TRAC, July 2026: 65,765 in ICE Detention, 70.6% With No Criminal Conviction",
          description:
            "Immigration and Customs Enforcement held 65,765 people in detention according to data current as of 11 July 2026; 46,436 of them, 70.6%, had no criminal conviction. In June 2026, 43,138 people were booked into ICE detention, and 183,181 were monitored through Alternatives to Detention.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "TRAC Immigration, Syracuse University, Quick Facts (data current as of 11 July 2026)",
          sourceUrl: "https://tracreports.org/immigration/quickfacts/",
          reasoning:
            "ICE's own detention data, compiled by an independent research centre. It shows most people held have no conviction, though some have pending charges; it is a snapshot, not a measure of who is ultimately removed.",
        },
        {
          id: "citizens-detained-propublica",
          title: "ProPublica 2025: At Least 170 US Citizens Detained by Immigration Agents",
          description:
            "ProPublica found that federal immigration agents had detained at least 170 US citizens in the early months of the enforcement drive, including about 20 children, two of them with cancer. The government does not track how often its agents detain citizens, and the reporters said the figure is likely an undercount.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 4,
          },
          source: "ProPublica, as reported by NPR's Here & Now via Arkansas Public Media (16 October 2025)",
          sourceUrl:
            "https://www.apr.org/2025-10-16/u-s-citizens-arrested-by-ice-have-been-kicked-dragged-and-detained-for-days-propublica-reports",
          reasoning:
            "Wrongful detention of citizens is a cost no side defends. It is a small number set against hundreds of thousands of arrests, and a reporting count rather than a full tally, so directness for the overall policy is low.",
        },
      ],
    },
  ],
  aliases: [
    "Is enforcement plus asylum limits the best way to manage US immigration?",
    "Should the US deport all illegal immigrants?",
    "Is mass deportation a good idea?",
  ],
  references: [
    {
      title: "U.S. Deportations and \"Self-Deportations\" in the First 18 Months of the Second Trump Term - Migration Policy Institute (October 2026)",
      url: "https://www.migrationpolicy.org/system/files/2026-10/mpi-deportations-fact-sheet-2026-final.pdf",
    },
    {
      title: "Southwest Land Border Encounters - US Customs and Border Protection",
      url: "https://www.cbp.gov/newsroom/stats/southwest-land-border-encounters",
    },
    {
      title: "TRAC Immigration Quick Facts - Syracuse University",
      url: "https://tracreports.org/immigration/quickfacts/",
    },
    {
      title: "What's in the Big Beautiful Bill? Immigration and Border Security Unpacked - American Immigration Council",
      url: "https://www.americanimmigrationcouncil.org/fact-sheet/big-beautiful-bill-immigration-border-security/",
    },
    {
      title: "Missing Migrants Project: Americas - International Organization for Migration",
      url: "https://missingmigrants.iom.int/region/americas",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does enforcement actually deter unauthorized crossings?",
      content:
        "Apprehensions fell from 249,740 in December 2023 to 47,324 in December 2024, then below 10,000 a month from February 2025, and to 98,708 for all of fiscal 2026. How much was US enforcement, how much Mexico's, and how much conditions in origin countries? Will the low numbers survive the next crisis abroad?",
    },
    {
      id: "q2",
      title: "Who is being deported, and is it fair?",
      content:
        "About 980,000 deportations in 18 months, 20% of them of people with criminal convictions, and 71% of those removed after two or more years in the US had none. Is enforcing immigration law against everyone who broke it fair, or should removal be reserved for people who are dangerous?",
    },
    {
      id: "q3",
      title: "Can the asylum system work fairly and fast?",
      content:
        "The court backlog peaked near 3.7 million cases and is now falling, while the asylum grant rate fell to 5.5% in June 2026 after more than a third of immigration judges were fired or resigned. Is the system finally applying the law, or rejecting refugees it should protect?",
    },
  ],
};
