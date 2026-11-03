export const proofOfCitizenshipVotingData = {
  id: "proof-of-citizenship-voting",
  title: "Proof of Citizenship to Register",
  question: "Should voters have to show documentary proof of citizenship to register to vote?",
  meta_claim:
    "Requiring people to show a document proving U.S. citizenship, such as a passport, birth certificate or naturalization certificate, when they register to vote is sound policy: it closes a gap that sworn attestation leaves open, without keeping significant numbers of eligible citizens off the rolls.",
  status: "contested" as const,
  category: "policy" as const,
  last_updated: "2026-11-03",
  tags: ["voting", "elections", "voter-registration", "citizenship", "save-act"],
  aliases: [
    "SAVE America Act",
    "SAVE Act proof of citizenship",
    "documentary proof of citizenship to vote",
    "noncitizen voter registration",
  ],
  // ── The lede: facts both sides accept, then what the fight is over ──
  keystone_fact: {
    statement:
      "Federal law lets people register to vote by swearing, under penalty of perjury, that they are U.S. citizens. The House passed the SAVE America Act, which would require documentary proof of citizenship presented in person, 218-213 on February 11, 2026; it has not passed the Senate, and federal courts have permanently blocked the part of President Trump's March 2025 executive order that would have added the requirement to the federal registration form. The fight is over whether sworn attestation lets noncitizens onto the rolls in numbers that matter, how many eligible citizens a documentary rule would keep off them, and how to weigh the two.",
    confidence: 90,
    source:
      "Ballotpedia News, 'Senate takes up SAVE America Act' (March 24, 2026); Votebeat (October 31, 2025, and September 25, 2026); PBS News (June 24, 2026)",
    sourceUrl:
      "https://news.ballotpedia.org/2026/03/24/senate-takes-up-save-america-act-to-require-voter-id-proof-of-citizenship-for-federal-elections-2/",
  },
  // ── The summary above the crux sheet: what the map turns on ──
  simple_case: [
    "Both sides accept that only citizens may vote in federal elections, that noncitizens do sometimes end up on the rolls, often through confusion or clerical error, and that checking registrants against motor-vehicle and federal records confirms almost all of them as citizens. Both also accept the counts from recent statewide checks: 20 noncitizens among 8.2 million registrants in Georgia in 2024, 15 apparent noncitizen ballots among more than 5.7 million cast in Michigan that year, and 27 confirmed noncitizens among 2.07 million records in Utah in 2026.",
    "They split over whether the noncitizens that audits find are nearly all of them or only the ones records reveal; over how many eligible citizens a documentary rule would keep off the rolls, from the 31,089 Kansas applicants blocked under its 2013 law to the fewer than 1% of Arizona voters limited to federal races in 2024; and over how many excluded citizens is an acceptable price for keeping ineligible registrations out.",
    "The first two are questions that sample audits and applicant-level data from states with the rule can answer; the last is a weighing of integrity against access that the numbers inform but do not decide.",
  ],
  pillars: [
    {
      id: "noncitizen-registration",
      title: "How Many Noncitizens Get on the Rolls?",
      short_summary:
        "Supporters say sworn attestation lets noncitizens register and that audits find only the cases records reveal; critics point to statewide checks, run by officials of both parties, that find noncitizens at rates of thousandths of a percent.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Every full check of the rolls has found noncitizen registration rare. Georgia found 20 noncitizens among 8.2 million registrants in 2024. Michigan found 15 apparent noncitizen ballots in the 2024 general election, which with one earlier case came to 0.00028% of more than 5.7 million votes. Utah's audit of 2,069,640 records found 27 confirmed noncitizens, 13 of whom had voted since 2018. In Kansas, after a trial, the court found at most 39 noncitizens had reached the rolls in 19 years and that administrative anomalies could explain many of them. Federal checks of about 49.5 million registrations flagged about 10,000 potential noncitizens, and local officials found citizens among them.",
      proponent_rebuttal:
        "Audits find only noncitizens whose status shows up in the records they check, so they set a floor, not a count, and when officials look the number is not zero. Ohio sent federal prosecutors evidence on 1,084 noncitizens registered to vote, 167 of whom appeared to have voted in federal elections from 2018 to 2024. Utah's audit found that paper forms were the most common route noncitizens used to register, and told clerks to stop processing forms without a marked citizenship box. Under attestation, any check comes after a person is registered; a documentary rule checks before. As Heritage Action put it, \"laws dictating that all voters be U.S. citizens are essentially meaningless without a corresponding statute requiring states to prove citizenship.\"",
      crux: {
        id: "attestation-gap",
        title: "The Attestation Gap",
        question:
          "Do sworn attestation and the record checks states already run keep all but a handful of noncitizens off the rolls?",
        description:
          "Supporters hold that noncitizens register under attestation in numbers that audits undercount, because audits find only people whose status appears in records; critics hold that repeated statewide checks show the rate is tiny and mostly the product of confusion or clerical error. The answer depends on how many noncitizen registrants sit outside the records audits use.",
        methodology:
          "Run full-roll citizenship checks in several states with different registration systems, using motor-vehicle, SAVE and vital records, and confirm every flag individually. Then audit a random sample of the same rolls by asking registrants for documents, to estimate how many noncitizens the record checks miss.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A random-sample documentary audit of registrants in several states, compared with full-roll record checks of the same rolls, showing how many noncitizens are registered beyond those the record checks find.",
        },
        cost_to_verify:
          "Record checks cost a few dollars per record (non-federal agencies paid $1.50 per SAVE query in fiscal 2025); a sample audit needs state cooperation and staff to follow up each registrant.",
        falsification: {
          supporter_flip:
            "If a random-sample documentary audit found no more noncitizens than record checks of the same rolls, at rates in the thousandths of a percent, the claim that attestation leaves a large hidden gap would fall away.",
          skeptic_flip:
            "If sample audits found noncitizens registered at several times the rate record checks report, the audits now cited as proof of rarity would read as a floor, and the case for checking before registration would strengthen.",
          common_ground:
            "Both sides agree that noncitizens do sometimes register, that many cases involve lawful permanent residents who misunderstood the rules or errors by officials, and that checking registrants against motor-vehicle and federal records is legitimate.",
          live_disagreement:
            "Whether the noncitizens audits find are nearly all of them, or only the ones that existing records happen to reveal.",
        },
      },
      evidence: [
        {
          id: "ohio-referrals",
          title: "Ohio Referred 1,084 Registered Noncitizens to Federal Prosecutors",
          description:
            "In October 2025 Ohio Secretary of State Frank LaRose sent the Justice Department evidence on 1,084 noncitizens who had registered to vote in Ohio, including 167 who appeared to have voted in a federal election in 2018, 2020, 2022 or 2024. In August 2024 his office had referred 597 apparent noncitizens, 138 of whom had cast ballots, against 148 cases referred in 2022, 117 in 2021 and 354 in 2019. More than 8 million people are registered to vote in Ohio.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "Spectrum News, 'Ohio identifies over 1,000 noncitizens registered to vote, cases sent to DOJ for prosecution' (October 29, 2025); Associated Press via WOSU (August 22, 2024)",
          sourceUrl: "https://spectrumnews1.com/oh/columbus/news/2025/10/29/ohio-noncitizens-voting",
          reasoning:
            "Shows that noncitizens do register under attestation, counted by the office that found them and supports the requirement. The cases are referrals, not convictions, and the AP noted that only a handful of such cases are ever prosecuted; against more than 8 million registrants, 1,084 over four election cycles is about 0.01%.",
        },
        {
          id: "utah-process-gaps",
          title: "Utah's Audit Found Gaps in How Registrations Were Checked",
          description:
            "Utah's May 2026 citizenship review found 27 confirmed and 25 likely noncitizens on the rolls and reported that paper forms were the most common method noncitizens used to register. It told clerks to suspend, not process, registrations without a marked citizenship box and signed affidavit, found about 2,000 unconfirmed records were legacy entries imported more than 20 years ago without driver license or Social Security numbers, and noted that until a 2026 law, H.B. 209, state law did not require verification of citizenship.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Utah Office of the Lieutenant Governor, 'Utah Voter Registration Citizenship Review' (May 27, 2026)",
          sourceUrl: "https://ltgovernor.utah.gov/wp-content/uploads/CITIZENSHIP-FULL-SUMMARY-2.pdf",
          reasoning:
            "A published, record-by-record audit by a Republican official that shows where attestation can fail in practice. The same audit found the rate itself tiny, so it supports the claim that gaps exist more than the claim that they are large.",
        },
        {
          id: "louisiana-save-flags",
          title: "SAVE Flagged 403 Louisiana Registrants, 83 of Whom Had Voted",
          description:
            "Running Louisiana's 2.96 million registrations through the federal SAVE system flagged 403 potential noncitizens, about 0.014%; 83 of them had cast at least one ballot going back to the 1980s, though it was not clear how many were later verified as noncitizens. Louisiana Secretary of State Nancy Landry said \"noncitizens illegally registering or voting is not a systemic problem in Louisiana.\"",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "FactCheck.org, 'Flaws in Government Tool to ID Noncitizen Voters' (March 30, 2026)",
          sourceUrl: "https://www.factcheck.org/2026/03/flaws-in-government-tool-to-id-noncitizen-voters/",
          reasoning:
            "Bulk checks surfaced registrants that attestation let through, some of whom had voted. These are flags from a federal match, not confirmed findings, and the state's own election chief rejected a systemic reading.",
        },
        {
          id: "heritage-database",
          title: "Heritage's Database Lists 89 Proven Noncitizen Voting Cases Since 2000",
          description:
            "The Heritage Foundation's election fraud database, which the foundation cites as proof that reforms like the SAVE America Act are needed, held 89 proven cases of noncitizen voting dating back to 2000 as of August 2026, 5.5% of its 1,619 cases of election offenses, by the American Immigration Council's count. A 2026 Reuters analysis found 129 people charged in federal court with voting by aliens over 30 years, 73 of them convicted, nearly 80% of the convictions involving lawful permanent residents.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 4,
          },
          source:
            "American Immigration Council, 'Unpacking Myths About Noncitizen Voting' (August 13, 2026), analyzing the Heritage Foundation Election Fraud Database and citing Reuters",
          sourceUrl:
            "https://www.americanimmigrationcouncil.org/blog/myths-about-noncitizen-voting-heritage-foundation-data/",
          reasoning:
            "Convictions establish that noncitizen voting happens, and supporters read them as a floor because cases are hard to detect and rarely prosecuted. The same counts are the critics' main exhibit for rarity, and the tally comes from an immigrant-advocacy group reading a conservative database, so directness and independence are low.",
        },
        {
          id: "georgia-audit",
          title: "Georgia: 20 Noncitizens Among 8.2 Million Registrants",
          description:
            "Georgia's 2024 check of its rolls against state and federal databases found that 20 of the 8.2 million people registered to vote were not U.S. citizens; nine had voted in previous elections and 11 had no record of voting. All 20 had filled out sworn statements saying they were not citizens to get out of jury duty. Another 156 registrants' status needed further investigation.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Associated Press, 'Georgia citizenship audit finds few noncitizens on voter rolls' (October 23, 2024)",
          sourceUrl: "https://www.walb.com/2024/10/24/georgia-citizenship-audit-finds-few-noncitizens-voter-rolls/",
          reasoning:
            "A Republican secretary of state's check using driver records and federal immigration data. It finds only noncitizens visible in those records, and 156 cases were still open when it was announced, so it is a floor, but a low one.",
        },
        {
          id: "michigan-review",
          title: "Michigan: 15 Apparent Noncitizen Ballots Among 5.7 Million",
          description:
            "Michigan's Department of State compared more than 7.9 million active driving records with over 7.2 million registered voters and identified 15 people who appear to be noncitizens and cast a ballot in the 2024 general election; with one case found in October 2024 they made up 0.00028% of more than 5.7 million votes. Thirteen were referred to the Attorney General for potential prosecution.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source:
            "Michigan Department of State, 'Michigan Department of State review confirms instances of noncitizen voting are extremely rare' (April 3, 2025)",
          sourceUrl:
            "https://www.michigan.gov/sos/resources/news/2025/04/03/michigan-department-of-state-review-confirms-instances-of-noncitizen-voting-are-extremely-rare",
          reasoning:
            "A full match of motor-vehicle and voter records, run by a Democratic secretary of state who opposes documentary rules, which lowers independence slightly. Like Georgia's, it finds only noncitizens whose status shows in driver records.",
        },
        {
          id: "utah-audit-rate",
          title: "Utah: 27 Confirmed Noncitizens in 2.07 Million Records",
          description:
            "Utah's review of 2,069,640 voter records against driver license data and the SAVE system, with manual review of the rest, confirmed 99.72% of registrants as citizens and found 27 confirmed noncitizens (0.0013%), 13 of whom had voted in an election since 2018, plus 25 likely noncitizens. The citizenship of 5,007 registrants could not be confirmed either way. Republican Lt. Gov. Deidre Henderson began the review in April 2025.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Utah Office of the Lieutenant Governor, 'Utah Voter Registration Citizenship Review' (May 27, 2026)",
          sourceUrl: "https://ltgovernor.utah.gov/wp-content/uploads/CITIZENSHIP-FULL-SUMMARY-2.pdf",
          reasoning:
            "The most complete recent audit, checking every record with a published method. The 5,007 unconfirmed records leave a small band of uncertainty, and the report notes that driver and SAVE records are reliable for confirming citizenship but not for proving that someone is not a citizen.",
        },
        {
          id: "kansas-trial-findings",
          title: "Kansas: At Most 39 Noncitizens on the Rolls in 19 Years",
          description:
            "After a 2018 trial over Kansas's documentary rule, the district court found that at most 67 noncitizens had registered or attempted to register in Kansas over 19 years and at most 39 had reached the voter rolls, and that administrative anomalies could account for many of them; the registration database held 100 people with birth dates in the 19th century. Affirming in April 2020, the Tenth Circuit called this \"incredibly slight evidence\" that the state's interest in counting only eligible votes was under threat, equivalent to fewer than three noncitizen registrations a year.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "Fish v. Schwab, 957 F.3d 1105 (10th Cir. April 29, 2020)",
          sourceUrl: "https://www.govinfo.gov/content/pkg/USCOURTS-ca10-18-03133/pdf/USCOURTS-ca10-18-03133-0.pdf",
          reasoning:
            "Findings of fact after a contested trial in which the state presented its best evidence, and the Secretary did not argue they were clearly erroneous. It covers one state, and its registration count runs through 2013.",
        },
        {
          id: "brennan-2016-officials",
          title: "2016: About 30 Suspected Cases in 23.5 Million Votes",
          description:
            "Brennan Center researchers interviewed 44 election administrators in 42 jurisdictions in 12 states, including 8 of the 10 jurisdictions with the largest noncitizen populations. Officials who oversaw 23.5 million votes in the 2016 general election referred an estimated 30 incidents of suspected noncitizen voting for investigation or prosecution, about 0.0001% of votes; 40 of the 42 jurisdictions reported no known incidents.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source:
            "Keith, Pérez & Famighetti, Brennan Center for Justice, 'Noncitizen Voting: The Missing Millions' (May 5, 2017)",
          sourceUrl: "https://www.brennancenter.org/our-work/research-reports/noncitizen-voting-missing-millions",
          reasoning:
            "A survey of officials rather than an audit, from a group that opposes documentary rules; officials can report only what they detect, and New York City declined to provide information. Its result matches the later record audits.",
        },
        {
          id: "save-flags-citizens",
          title: "Federal Checks Flagged About 10,000 of 49.5 Million, Including Citizens",
          description:
            "By January 2026, about 49.5 million voter registrations had been run through the expanded federal SAVE system and DHS had referred about 10,000 cases to investigators, according to a U.S. Citizenship and Immigration Services spokesman cited by the New York Times; local officials found U.S. citizens among those flagged. Texas flagged 2,724 of more than 18 million registrants, and in July 2026 told counties to reinstate some it confirmed from its own Department of Public Safety records had already proved citizenship.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "FactCheck.org, 'Flaws in Government Tool to ID Noncitizen Voters' (March 30, 2026); Votebeat, 'Texas confirms some flagged as potential noncitizens on voter rolls had provided DPS proof of citizenship' (July 30, 2026)",
          sourceUrl: "https://www.factcheck.org/2026/03/flaws-in-government-tool-to-id-noncitizen-voters/",
          reasoning:
            "The largest federal check finds potential noncitizens at about 0.02% of records, and its flags overstate the count. It cannot show how many noncitizens the system misses, which is the supporters' point.",
        },
      ],
    },
    {
      id: "eligible-citizens-blocked",
      title: "How Many Citizens Would It Stop?",
      short_summary:
        "Critics point to Kansas, where 31,089 applicants were blocked, and to surveys of who lacks documents; supporters point to states that verify nearly everyone through existing records, leaving a small group to show papers.",
      icon_name: "Users" as const,
      skeptic_premise:
        "A documentary rule stops eligible citizens. In Kansas, 31,089 applicants, 12.4% of new registrations from 2013 to 2015, had registrations suspended or canceled for lack of documents, and the trial court found more than 99% of the suspended applicants were citizens. A national survey estimated that 9.1% of voting-age citizens, 21.3 million people, lack ready access to a passport, birth certificate or naturalization papers, and at least 3.8 million have none. The SAVE America Act would require documents to be presented in person, while automatic, online, mail and drive registrations made up almost half of registrations before the 2024 election. In Arizona, voters without documents cluster on tribal land, on college campuses and at the state's main homeless campus.",
      proponent_rebuttal:
        "Most registrants never need to show paper. Utah confirmed 96% of 2.07 million registrants as citizens from driver license records alone and 99.72% after SAVE and manual review, leaving 0.24% to supply documents. Arizona verifies most applicants through motor-vehicle records, and 34,933 of about 4.4 million active voters, under 1%, were limited to federal races in 2024. Many of the Kansas applicants had applied at the motor-vehicle office, and the trial court acknowledged \"little admissible evidence\" about how many of them actually lacked documents rather than not supplying them. Strict photo ID laws, a related requirement, had no measurable effect on registration or turnout in a 2008 to 2018 panel of 1.6 billion observations.",
      crux: {
        id: "who-records-miss",
        title: "The Citizens Records Cannot Verify",
        question:
          "Once states check existing records first, how many eligible citizens would a documentary rule keep from registering?",
        description:
          "Both sides accept that some citizens lack ready access to documents. Critics count them in the millions and point to Kansas; supporters expect record matching to verify nearly everyone and most of the rest to get documents when asked. The answer turns on the size of the group records cannot verify and on whether those people go on to register.",
        methodology:
          "In a state enforcing the rule, follow every applicant whose citizenship records cannot confirm: how many submit documents, how long it takes, how many never register, and how many of those are later confirmed as citizens through vital records. Compare registration among groups the surveys flag, such as young movers, women who changed their names and tribal residents, before and after the rule.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Applicant-level records from a state that requires citizenship documents but matches records first, showing how many applicants records could not verify, how many of them supplied documents, and how many citizens among the rest never registered.",
        },
        cost_to_verify:
          "States hold the application records; an independent study needs a data-use agreement and a match against vital records.",
        falsification: {
          supporter_flip:
            "If a state that matched records first still left several percent of eligible applicants unregistered for lack of documents, as Kansas did, the claim that the rule costs few citizens would fail.",
          skeptic_flip:
            "If record matching verified all but a fraction of a percent of applicants and nearly all of the rest registered within weeks, the survey counts of citizens without ready documents would not translate into citizens kept off the rolls.",
          common_ground:
            "Both sides agree that millions of citizens could not produce a passport or birth certificate on short notice, that checking motor-vehicle and federal records first reduces how many must show paper, and that Kansas suspended or canceled tens of thousands of applications.",
          live_disagreement:
            "Whether the people records cannot verify are a small group who will get documents when asked, or a large group of eligible citizens, disproportionately young, Native or homeless, whom the rule will keep off the rolls.",
        },
      },
      evidence: [
        {
          id: "utah-records-verify",
          title: "Utah Verified 99.72% of Registrants From Records",
          description:
            "Utah's audit confirmed 96% of 2,069,640 registrants as citizens from driver license records alone, and 99.72% after checking the rest against SAVE and reviewing them by hand. That left 5,007 registrants, 0.24%, whose citizenship could not be confirmed, many of whom had registered years before driver license or Social Security numbers were required. Under H.B. 209 they receive a ballot with only federal races until they show documentary proof.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Utah Office of the Lieutenant Governor, 'Utah Voter Registration Citizenship Review' (May 27, 2026)",
          sourceUrl: "https://ltgovernor.utah.gov/wp-content/uploads/CITIZENSHIP-FULL-SUMMARY-2.pdf",
          reasoning:
            "Shows how small the unverified group can be when a state matches records first, in a state with high driver license coverage. It does not show how many of the 5,007 will produce documents.",
        },
        {
          id: "arizona-under-one-percent",
          title: "Arizona: Under 1% of Active Voters Limited to Federal Races",
          description:
            "Arizona, the only state in 2024 limiting voting for registrants who did not prove citizenship, gave federal-only ballots to 34,933 of about 4.4 million active voters for the November 2024 election. Because the state has required proof of citizenship or lawful presence for driver's licenses since 1996, most registrants are verified through Motor Vehicle Division records, and only a small share of applicants submit physical documents.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Votebeat, 'Who are the Arizona voters without proof of citizenship? They may surprise you.' (December 13, 2024); Responsive Government, 'How Arizona's Proof of Citizenship Law Works' (February 2025)",
          sourceUrl:
            "https://votebeat.org/arizona/2024/12/13/arizona-voter-citizenship-proof-law-shows-groups-struggling-to-provide-it",
          reasoning:
            "Long experience with a documentary rule backed by license records. Federal-only voters can still vote for Congress and president, so this measures who is limited rather than who is kept off the rolls entirely; and in fall 2024 the state found nearly 218,000 registrants wrongly recorded as having proved citizenship, so its records are not error-free.",
        },
        {
          id: "kansas-unable-or-unwilling",
          title: "The Kansas Record Did Not Show How Many Lacked Documents",
          description:
            "In the Kansas case, the Secretary of State argued there was no way to determine how many of the 31,089 blocked applicants were actually unable, as opposed to unwilling, to obtain a birth certificate or other proof, and the district court acknowledged \"little admissible evidence\" about how many of them had documents. Of the 16,319 canceled applicants, 11,147 had applied through the motor-vehicle office.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Fish v. Schwab, 957 F.3d 1105 (10th Cir. April 29, 2020)",
          sourceUrl: "https://www.govinfo.gov/content/pkg/USCOURTS-ca10-18-03133/pdf/USCOURTS-ca10-18-03133-0.pdf",
          reasoning:
            "A fair point about what the Kansas number measures, taken from the court record. The Tenth Circuit called the Secretary's version of it speculation and held the burden significant either way, noting expert testimony that the count would have grown without the injunction.",
        },
        {
          id: "photo-id-turnout",
          title: "Strict Photo ID Laws Did Not Lower Registration or Turnout",
          description:
            "Using a difference-in-differences design on a panel of 1.6 billion observations from 2008 to 2018, Cantoni and Pons find that strict voter ID laws had no negative effect on registration or turnout, overall or for any group defined by race, gender, age or party, with point estimates of -0.1 percentage points for both. The likelihood that nonwhite voters were contacted by a campaign rose 4.7 points, which may have offset modest effects on minority participation.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 3,
          },
          source:
            "Cantoni & Pons, 'Strict ID Laws Don't Stop Voters: Evidence from a U.S. Nationwide Panel, 2008-2018', Quarterly Journal of Economics 136(4), 2615-2660 (2021)",
          sourceUrl: "https://doi.org/10.1093/qje/qjab019",
          reasoning:
            "A strong causal study in a top journal, but of photo ID at the polls, not citizenship documents at registration: most adults carry a license, while far fewer have a passport or birth certificate at hand, so directness is low.",
        },
        {
          id: "kansas-31089",
          title: "Kansas: 31,089 Applicants Blocked, 12.4% of New Registrations",
          description:
            "Before courts halted Kansas's rule, the state had suspended 14,770 applications and canceled 16,319 for lack of documentary proof of citizenship, 31,089 in all; canceled or suspended applicants were 12.4% of new registrations from January 1, 2013 to December 11, 2015. The trial court found more than 99% of the suspended applicants were citizens who could have voted but for the rule, and the Tenth Circuit held the burden on the right to vote \"significant.\"",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "Fish v. Schwab, 957 F.3d 1105 (10th Cir. April 29, 2020)",
          sourceUrl: "https://www.govinfo.gov/content/pkg/USCOURTS-ca10-18-03133/pdf/USCOURTS-ca10-18-03133-0.pdf",
          reasoning:
            "Court findings on state records from the only full test of a documentary rule for every new registrant. The court could not say how many applicants lacked documents rather than not supplying them, and a rule that matched records first might block fewer.",
        },
        {
          id: "citizens-without-documents",
          title: "21.3 Million Voting-Age Citizens Lack Ready Access to Documents",
          description:
            "A national survey of 2,386 adult citizens, run by SSRS for VoteRiders, the University of Maryland's Center for Democracy and Civic Engagement and the Brennan Center, estimated that 9.1% of voting-age citizens, 21.3 million people, lack ready access to a U.S. birth certificate, passport, naturalization or citizenship certificate, meaning they could not get one by the next day, and at least 3.8 million do not have one at all. The share was 11% among citizens of color and 8% among white citizens; men and young adults were most likely to lack easy access, and the count for women is a lower bound because names on documents may not match after marriage.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source:
            "Brennan Center for Justice, '21.3 Million American Citizens of Voting Age Don't Have Ready Access to Citizenship Documents' (June 11, 2024); University of Maryland CDCE",
          sourceUrl:
            "https://www.brennancenter.org/our-work/analysis-opinion/213-million-american-citizens-voting-age-dont-have-ready-access",
          reasoning:
            "A survey with a stated method, sponsored by groups that oppose documentary rules. It measures ready access, not inability: many people without a document at hand could order one, so it bounds the population at risk rather than counting those who would be stopped.",
        },
        {
          id: "in-person-requirement",
          title: "The SAVE America Act Requires Documents in Person",
          description:
            "The bill says an applicant \"shall not be registered to vote in an election for federal office unless the applicant presents documentary proof of United States citizenship in person to the office of the appropriate election official.\" In the 2024 cycle, automatic registration accounted for 25.2% of registrations, online 13.9%, mail, email and fax 8.3%, and registration drives 2%; in-person registration was between 11% and 42%, depending on how many motor-vehicle registrations were made in person.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "PolitiFact via PBS News, 'Fact-checking Senate Minority Leader Chuck Schumer on the effects of the SAVE America Act' (March 21, 2026), citing the U.S. Election Assistance Commission's 2024 survey",
          sourceUrl:
            "https://www.pbs.org/newshour/politics/fact-checking-senate-minority-leader-chuck-schumer-on-the-effects-of-the-save-america-act",
          reasoning:
            "The bill's text and federal survey data, checked by a fact-checker. It shows how many current registration routes the in-person step would touch, not how many people would fail to register, and how states define a new registration would change its reach.",
        },
        {
          id: "new-hampshire-ruling",
          title: "New Hampshire: Court Found the Affidavit Was Some Voters' Only Proof",
          description:
            "New Hampshire's 2024 law required first-time registrants to show documentary proof of citizenship and ended the sworn affidavit option. After a nine-day trial, Judge Samantha Elliott struck down the citizenship requirement on May 28, 2026, finding that \"the evidence shows that it is the only method of proof available to a significant number of New Hampshire voters.\" More than 10,000 first-time voters had registered by affidavit on Election Day 2024, and court testimony showed one person prosecuted in 26 years for knowingly voting as a noncitizen.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source: "New Hampshire Public Radio, 'A judge struck down NH's \"proof of citizenship\" voting law' (June 1, 2026)",
          sourceUrl: "https://www.nhpr.org/nh-news/2026-05-29/nh-newhampshire-voting-elections-citizenship-proof",
          reasoning:
            "Findings after a full trial, in a state with Election Day registration where the affidavit matters most. The ruling rests on New Hampshire's record, the state said it would appeal, and it does not count how many voters the rule turned away.",
        },
        {
          id: "arizona-who-lacks",
          title: "Arizona: Federal-Only Voters Cluster on Tribal Land and Campuses",
          description:
            "A Votebeat analysis of Arizona's 2024 federal-only list found voters on tribal land, on college campuses and at the state's main homeless campus disproportionately represented: 7.3% of active federal-only voters lived in precincts on or close to reservations, against 2.5% of all registered voters. Turnout among active voters who had not provided proof of citizenship was about 19% in November 2024, against 79% for other active voters.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Votebeat, 'Who are the Arizona voters without proof of citizenship? They may surprise you.' (December 13, 2024)",
          sourceUrl:
            "https://votebeat.org/arizona/2024/12/13/arizona-voter-citizenship-proof-law-shows-groups-struggling-to-provide-it",
          reasoning:
            "Administrative data on whom the longest-running documentary rule actually catches. The turnout gap may reflect who these voters are as much as the rule, since they could still vote in federal races; the U.S. Supreme Court agreed in 2026 to hear whether Arizona's law is legal.",
        },
      ],
    },
    {
      id: "weighing-the-trade",
      title: "What Is the Trade Worth?",
      short_summary:
        "Underneath the counts sits a value question: how many eligible citizens kept off the rolls is an acceptable price for keeping ineligible registrants out, and whether a rule most Americans favor is worth it when the cases it stops are rare.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "If audits find noncitizen registrants in the thousandths of a percent and a documentary rule blocks citizens by the thousands, the rule excludes far more eligible voters than ineligible ones. Courts weighing that trade have struck such rules down: the Tenth Circuit found \"incredibly slight evidence\" against a significant burden in Kansas, and in New Hampshire Judge Elliott wrote that \"such miniscule numbers strongly undercut any legitimate concern about election integrity vis-à-vis noncitizen voting.\" The confidence argument is thin too: in the largest study of voter ID laws, strict ID requirements had \"no effect on fraud, actual or perceived.\"",
      proponent_rebuttal:
        "Citizenship is a condition of voting, and a condition that is sworn to but seldom checked invites doubt about close results. Executive Order 14248 noted that India and Brazil tie voter identification to biometric databases, \"while the United States largely relies on self-attestation for citizenship.\" Most Americans favor closing it: 83% in Gallup's October 2024 poll backed proof of citizenship for first-time registrants, including a majority of Democrats. And a rule need not deny anyone a ballot: Utah and Arizona give registrants they cannot verify a ballot for federal races until they show documents.",
      crux: {
        id: "integrity-vs-access",
        title: "Integrity Against Access",
        question:
          "How many eligible citizens kept off the rolls is an acceptable price for keeping ineligible registrants out?",
        description:
          "Even with both counts known, one side treats a sworn but seldom-checked condition as an open door that every eligible voter has a stake in closing, and the other treats each eligible citizen turned away as a greater harm than a rare ineligible registration. The counts inform this weighing but do not decide it.",
        methodology:
          "Set the best estimates side by side: noncitizen registrations and votes a rule would stop, eligible citizens it would delay or keep off the rolls, its administrative cost, and any change in public confidence. Then the reader weighs integrity, access and trust.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "The ineligible registrations a rule stops, the eligible citizens it delays or keeps off the rolls, its cost and any effect on confidence can each be measured. How many of one is worth one of the other is a weighing of values that no measurement settles.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "The trade-offs can be measured, but no study budget settles the value judgment.",
        falsification: {
          supporter_flip:
            "If a documentary rule kept many eligible citizens off the rolls while stopping almost no noncitizens, and confidence did not rise, many who back it on integrity grounds would have to weigh a check that buys little against the citizens it turns away.",
          skeptic_flip:
            "If record matching left almost no eligible citizen unable to register while audits under attestation kept finding noncitizens who voted, a documentary rule would be harder to call a barrier in search of a problem, though some would still oppose it on principle.",
          common_ground:
            "Both sides agree that only citizens should vote, and that a ballot cast by a noncitizen and an eligible citizen wrongly turned away both damage an election.",
          live_disagreement:
            "Whether a sworn condition that is seldom checked is an open door worth closing at some cost to eligible voters, or a safeguard that already works, so that the cost of documents falls on citizens for little gain.",
        },
      },
      evidence: [
        {
          id: "gallup-support",
          title: "83% of Americans Favor Proof of Citizenship for New Registrants",
          description:
            "Gallup's October 1-12, 2024 poll found 83% of U.S. adults favored providing proof of citizenship when registering to vote for the first time, and 84% favored requiring photo identification to vote. Republicans backed both nearly unanimously; Democrats' support for each was about 30 points lower but still a majority.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "Gallup, 'Americans Endorse Both Early Voting and Voter Verification' (October 24, 2024)",
          sourceUrl: "https://news.gallup.com/poll/652523/americans-endorse-early-voting-voter-verification.aspx",
          reasoning:
            "A reputable national poll showing broad cross-party support for the principle. Popularity does not settle a value question, and the question did not mention documents a voter might lack or in-person submission.",
        },
        {
          id: "utah-federal-ballot",
          title: "Utah's Rule Keeps Unverified Registrants on a Federal Ballot",
          description:
            "After its audit, Utah adopted H.B. 209: registrants whose citizenship cannot be confirmed through driver license records or SAVE receive a ballot with only federal races until they show documentary proof, while probable noncitizens have 30 days to show proof before removal. In May 2026 the state mailed notices to the 5,007 unconfirmed registrants and the 25 probable noncitizens.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Utah Office of the Lieutenant Governor, 'Utah Voter Registration Citizenship Review' (May 27, 2026)",
          sourceUrl: "https://ltgovernor.utah.gov/wp-content/uploads/CITIZENSHIP-FULL-SUMMARY-2.pdf",
          reasoning:
            "Shows a design that lowers the price on the access side, since unverified citizens keep a vote for federal office. It also shows the cost that remains: they lose state and local races until they produce documents.",
        },
        {
          id: "id-laws-confidence",
          title: "Strict ID Laws Had No Effect on Fraud, Actual or Perceived",
          description:
            "The same 2008 to 2018 panel study that found no turnout effect from strict ID laws found that \"strict ID requirements have no effect on fraud, actual or perceived,\" and concluded that \"efforts to improve elections may be better directed at other reforms.\"",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 4,
          },
          source:
            "Cantoni & Pons, 'Strict ID Laws Don't Stop Voters: Evidence from a U.S. Nationwide Panel, 2008-2018', Quarterly Journal of Economics 136(4), 2615-2660 (2021)",
          sourceUrl: "https://doi.org/10.1093/qje/qjab019",
          reasoning:
            "Undercuts the claim that verification rules raise public confidence, at least for photo ID at the polls. Proof of citizenship at registration has not been studied this way, so directness is low.",
        },
        {
          id: "courts-weighing",
          title: "Courts Weighing the Trade Struck Down Two State Rules",
          description:
            "Applying the constitutional test that weighs burdens on voting against a state's interests, the Tenth Circuit held in 2020 that Kansas's evidence of noncitizen registration, at most 39 people in 19 years, did not justify the burden shown by 31,089 blocked applicants. New Hampshire's federal court reached the same result in May 2026: \"New Hampshire's interest in election integrity cannot justify the burden on New Hampshire voters based on the evidence in this case.\"",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Fish v. Schwab, 957 F.3d 1105 (10th Cir. 2020); New Hampshire Public Radio (June 1, 2026)",
          sourceUrl: "https://www.govinfo.gov/content/pkg/USCOURTS-ca10-18-03133/pdf/USCOURTS-ca10-18-03133-0.pdf",
          reasoning:
            "Neutral arbiters applying a legal test to evidence tested at trial. A court's balance answers what the Constitution permits on a given record, not what voters or legislatures should value, and the U.S. Supreme Court has agreed to hear Arizona's law.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Ballotpedia News: Senate takes up SAVE America Act (March 24, 2026)",
      url: "https://news.ballotpedia.org/2026/03/24/senate-takes-up-save-america-act-to-require-voter-id-proof-of-citizenship-for-federal-elections-2/",
    },
    {
      title: "Votebeat: Judge rules against Trump's call for proof-of-citizenship requirement for voters (October 31, 2025)",
      url: "https://www.votebeat.org/2025/11/24/judge-blocks-trump-executive-order-proof-of-citizenship/",
    },
    {
      title: "PBS News: Federal judge bars Trump from implementing proof of citizenship requirement to vote (June 24, 2026)",
      url: "https://www.pbs.org/newshour/politics/federal-judge-bars-trump-from-implementing-proof-of-citizenship-requirement-to-vote",
    },
    {
      title: "Votebeat: Supreme Court OKs use of federal citizenship tool to vet voters (September 25, 2026)",
      url: "https://www.votebeat.org/national/2026/09/25/supreme-court-ruling-save-system-trump-dhs-noncitizens-2026-election/",
    },
    {
      title: "KJZZ: U.S. Supreme Court will decide the future of Arizona's proof-of-citizenship voting law (July 2, 2026)",
      url: "https://www.kjzz.org/the-show/2026-07-02/u-s-supreme-court-will-decide-the-future-of-arizonas-proof-of-citizenship-voting-law",
    },
    {
      title: "Executive Order 14248, Preserving and Protecting the Integrity of American Elections (March 25, 2025)",
      url: "https://www.whitehouse.gov/presidential-actions/2025/03/preserving-and-protecting-the-integrity-of-american-elections/",
    },
  ],
};
