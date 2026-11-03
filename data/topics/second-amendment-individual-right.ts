export const secondAmendmentIndividualRightData = {
  id: "second-amendment-individual-right",
  title: "The Second Amendment: Individual Right?",
  question:
    "Does the Second Amendment protect an individual right to bear arms?",
  meta_claim:
    "The Second Amendment protects an individual right to keep and bear arms for self-defense, not merely a right tied to militia service, and that right limits what guns governments may ban and where they may ban carrying them.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: Wolford v. Lopez (25 June 2026, 6-3) struck down
  // Hawaii's default ban on carrying onto private property open to the
  // public; United States v. Hemani (18 June 2026) held the drug-user gun ban
  // unconstitutional as applied; on 30 June 2026 the Court agreed to decide
  // whether AR-15 bans are constitutional (Viramontes v. Cook County; Grant
  // v. Higgins), with a ruling expected by June 2027.
  last_updated: "2026-11-03",
  tags: ["second-amendment", "constitutional-law", "gun-rights", "originalism"],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In Heller (2008) the Supreme Court held 5-4 that the Second Amendment protects an individual right to keep a gun for self-defense. In Bruen (2022) it ruled that gun laws must fit the nation's historical tradition. On 30 June 2026 it agreed to decide whether states may ban AR-15-style rifles, with a ruling expected by June 2027. The fight is over what the amendment meant when it was written, and how far that meaning reaches today.",
    confidence: 92,
    source:
      "District of Columbia v. Heller, 554 U.S. 570 (2008); New York State Rifle & Pistol Ass'n v. Bruen, 597 U.S. 1 (2022); Duke Center for Firearms Law, 'Cert Alert' (30 June 2026)",
    sourceUrl:
      "https://firearmslaw.duke.edu/2026/06/cert-alert-scotus-grants-certiorari-in-ar-15-ban-cases",
  },
  simple_case: [
    "The answer decides which gun laws survive in court: bans on AR-15s in the nine states that prohibit them, limits on large magazines, limits on where licensed owners may carry, and which people may be disarmed.",
    "Both sides accept that Heller is the law. They split over whether the history behind it is right, and over how a test built on history should judge weapons and places the founders never knew.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What the words meant in 1791
    // =========================================================================
    {
      id: "text-and-founding-history",
      title: "What Did 'Bear Arms' Mean in 1791?",
      short_summary:
        "Searches of founding-era writing find 'bear arms' used mostly in a military sense, by some counts about 95% of the time. Critics of those counts find about a fifth of uses meant carrying a gun as an individual, and note the amendment also protects the right to 'keep' arms. What ordinary readers in 1791 understood is the first split.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "In the founders' English, to 'bear arms' meant to serve as a soldier. When linguists searched the founding-era corpora, the large databases of 18th-century writing built at Brigham Young University, they found the phrase used in a military or collective sense in the large majority of cases: Dennis Baron reported that of about 1,500 uses, all but a handful were military, and Neal Goldfarb estimated about 95%. The amendment opens with 'A well regulated Militia, being necessary to the security of a free State,' which no other right in the Bill of Rights needs. Historians such as Saul Cornell argue that the founders saw arms-bearing as a civic duty owed to a state militia, and that the idea of a freestanding private right to arms for self-defense grew up later. On this reading, the amendment protected the states' militias from a federal government that might disarm them, and says little about private guns.",
      proponent_rebuttal:
        "The amendment protects 'the right of the people to keep and bear Arms,' and 'the people' means individuals everywhere else in the Bill of Rights. To 'keep' arms is plainly to own them. The militia clause states one reason for the right, not its limit, a common drafting style in the period. The corpus counts depend on choices: when constitutional texts are included and plural or unclear uses are not coded as collective, about a fifth of founding-era uses of 'bear arms' mean an individual carrying a weapon. Several state constitutions of the founding era, such as Pennsylvania's of 1776, declared that 'the people have a right to bear arms for the defence of themselves and the state.' The Fifth Circuit reached the individual-right reading in 2001 after a long review of the history, seven years before Heller.",
      crux: {
        id: "bear-arms-corpus-meaning",
        title: "The Founding-Era 'Bear Arms' Test",
        question:
          "Did 'bear arms' in the 1700s mean mainly military service, or also private carrying for self-defense?",
        description:
          "Did 'bear arms,' as ordinary 18th-century Americans used it, refer chiefly to military/collective service, or did it commonly include private individual carrying for self-defense? Frequency of actual usage is the most measurable proxy for original public meaning.",
        methodology:
          "Query large founding-era corpora (COFEA, 1760-1799; COEME) for every instance of 'bear arms'/'keep arms', code each as military-idiomatic, literal-individual, or ambiguous, and report inter-coder reliability. Sensitivity-test results by including vs. excluding constitutional/legal texts and by re-coding plural uses.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Coding every 'bear arms' and 'keep arms' use in founding-era corpora (COFEA, COEME) as military, literal-individual or ambiguous, with inter-coder reliability, and results shown with and without constitutional texts.",
        },
        cost_to_verify: "$0 (public corpora; data analysis)",
        falsification: {
          supporter_flip:
            "If sensitivity-tested corpus work, including constitutional texts and re-coding plural uses, still found literal individual carrying rare, and 'keep arms' and the state provisions offered no independent support, the historical case for an individual right would shrink to precedent alone.",
          skeptic_flip:
            "If re-analyses including constitutional texts held at about a fifth of founding-era 'bear arms' uses being literal individual carrying, with the right to 'keep' arms and state provisions securing arms for personal defense, the corpus counts would support the militia-only reading less.",
          common_ground:
            "Both sides agree 'bear arms' carried a military meaning in most founding-era uses, and that contemporaneous state constitutions varied, some securing arms for personal defense and some tying them to the militia.",
          live_disagreement:
            "Whether founding-era readers understood arms-bearing chiefly as militia duty or also as a private right of self-defense, which turns on how the corpus is coded and how much weight 'keep arms' and the state provisions carry.",
        },
      },
      evidence: [
        {
          id: "corpus-individual-carrying",
          title: "Kopel and Wallace 2021: About a Fifth of 'Bear Arms' Uses Meant Individual Carrying",
          description:
            "Re-analyses (e.g., by Josh Jones, and critiques by Kopel & Wallace) find that when constitutional texts are included and plural/ambiguous uses are not coded as 'collective,' roughly one-fifth of founding-era 'bear arms' uses are literal individual carrying — more than the strongest military-meaning claims imply.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source:
            "Reason / Volokh Conspiracy (Kopel & Wallace, 2021), 'Corpus Linguistics and the Second Amendment'; summarizing Jones's COFEA re-analysis",
          sourceUrl:
            "https://reason.com/volokh/2021/10/31/corpus-linguistics-and-the-second-amendment/",
          reasoning:
            "Replicable against the same public corpora and it exposes how much the military-meaning percentages depend on coding. It is commentary by gun-rights scholars rather than a neutral peer-reviewed study, and a fifth of uses still leaves the military meaning dominant.",
        },
        {
          id: "emerson-2001",
          title: "Emerson 2001: The Fifth Circuit Found an Individual Right Seven Years Before Heller",
          description:
            "In United States v. Emerson (2001), the Fifth Circuit became the first federal court of appeals to formally adopt the individual-rights ('Standard Model') reading after an extensive review of text and founding history, breaking from the collective-right consensus of its sister circuits and presaging Heller.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "United States v. Emerson, 270 F.3d 203 (5th Cir. 2001)",
          sourceUrl: "https://en.wikipedia.org/wiki/United_States_v._Emerson",
          reasoning:
            "A federal appeals court reaching the individual-right conclusion through its own historical analysis, before and apart from the Supreme Court. It was one circuit against several that read the right the other way.",
        },
        {
          id: "corpus-military-meaning",
          title: "Corpus Studies: About 95% of Founding-Era 'Bear Arms' Uses Were Military",
          description:
            "Analyses of the BYU founding-era corpora (COFEA/COEME) by Dennis Baron and others found that 'bear arms' overwhelmingly carried a military/idiomatic meaning ('serve as a soldier, do military service'); Baron reported that of ~1,500 founding-era uses, all but a handful were military, and Goldfarb estimated ~95% conveyed the idiomatic military sense.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source:
            "Duke Center for Firearms Law, 'Legal Corpus Linguistics and the Meaning of Bear Arms' (2021), summarizing Baron and Goldfarb",
          sourceUrl:
            "https://firearmslaw.duke.edu/2021/07/legal-corpus-linguistics-and-the-meaning-of-bear-arms",
          reasoning:
            "Highly replicable, since the corpora are public, and it probes ordinary usage directly. The coding of 'military' versus 'individual' is contested and changes the result, so it is strong but not decisive.",
        },
        {
          id: "cornell-civic-right",
          title: "Historian Saul Cornell: Arms-Bearing Was a Civic Duty to the Militia",
          description:
            "Constitutional historian Saul Cornell argues that founders understood the right to bear arms as a civic obligation to participate in a well-regulated militia, that federal courts treated it as a collective right for over a century, and that the modern individual-right view emerged only in the 19th century.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source:
            "Saul Cornell, 'A Well-Regulated Militia: The Founding Fathers and the Origins of Gun Control in America' (Oxford Univ. Press, 2006)",
          sourceUrl:
            "https://global.oup.com/academic/product/a-well-regulated-militia-9780195341034",
          reasoning:
            "Peer-reviewed scholarship by a leading historian of the period. Other historians read the same record as supporting a private right.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: What the Supreme Court held
    // =========================================================================
    {
      id: "supreme-court-holding",
      title: "What the Supreme Court Held, and by How Much",
      short_summary:
        "For about 70 years after Miller (1939), federal appeals courts mostly read the right as tied to militia service. Heller (2008) held 5-4 that it is individual, and McDonald (2010) applied it to the states, also 5-4. Whether Heller corrected a long misreading or broke with precedent is the second split.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "For nearly seven decades after United States v. Miller (1939), the federal courts of appeals overwhelmingly read the Second Amendment as protecting a right connected to militia service. Miller upheld a federal law on sawed-off shotguns because the weapon had no 'reasonable relationship to the preservation or efficiency of a well regulated militia.' The individual-right reading won in 2008 by a single vote. Four justices dissented, and Justice Stevens wrote that 'bear arms' was a familiar idiom meaning to serve as a soldier, and that the framers chose not to protect civilian uses. A 5-4 ruling that overturned the settled view of the lower courts is precedent, but precedent the Court could revisit.",
      proponent_rebuttal:
        "In District of Columbia v. Heller (2008) the Court held that the Second Amendment 'conferred an individual right to keep and bear arms' and struck down Washington, DC's ban on handguns in the home. The militia clause announces a purpose; it does not limit the right. Miller was a short opinion in a case where the defendant never appeared, and it decided which weapons are protected, not who holds the right. McDonald v. City of Chicago (2010) applied the right to the states. Since then the Court has reaffirmed the individual right in every case it has decided, including Bruen in 2022, Rahimi in 2024 and two cases in June 2026, and the dissents in those cases argue mainly about its scope.",
      crux: {
        id: "operative-vs-prefatory-clause",
        title: "Does the Militia Clause Limit the Right?",
        question:
          "Does the amendment's militia clause limit the right, or only explain its purpose?",
        description:
          "The whole dispute turns on whether the prefatory clause ('A well regulated Militia...') restricts the operative clause ('the right of the people to keep and bear Arms...') or merely states its motivating purpose. If it restricts, the right is militia-bound; if it only announces a purpose, the right is individual.",
        methodology:
          "Apply 18th-century rules of grammar and legal drafting to the two-clause structure; survey contemporaneous state constitutional arms provisions (some explicitly individual, some militia-linked); and weigh founding-era usage of 'the people,' 'keep,' and 'bear arms' against ratification-era commentary (e.g., the Federalist, state ratifying debates).",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A survey of 18th-century drafting conventions and contemporaneous state arms provisions, showing how prefatory clauses like 'A well regulated Militia' were read in their own time.",
        },
        cost_to_verify: "$0 (textual and historical analysis)",
        falsification: {
          supporter_flip:
            "If 18th-century drafting conventions and contemporaneous state arms provisions showed that prefatory clauses like 'A well regulated Militia' were understood to restrict the operative clause, the individual-right reading would lose its textual footing, whatever Heller holds as precedent.",
          skeptic_flip:
            "If further historical work supported reading 'A well regulated Militia' as announcing a purpose rather than limiting the right, the reading Heller took, McDonald applied to the states and the Fifth Circuit reached in Emerson (2001), the long militia-tied consensus would carry less weight.",
          common_ground:
            "Both sides agree the individual right is binding precedent under Heller (2008) and McDonald (2010), both decided 5-4, and that for decades after Miller (1939) appeals courts mostly read the right as militia-tied.",
          live_disagreement:
            "Whether the prefatory militia clause restricts 'the right of the people to keep and bear Arms' or only states why it was protected, which decides whether Heller corrected the Miller-era reading or departed from it.",
        },
      },
      evidence: [
        {
          id: "heller-holding",
          title: "Heller 2008: 5-4 Ruling That the Right Is Individual",
          description:
            "The Supreme Court held 5-4 (Scalia, J.) that 'the Second Amendment conferred an individual right to keep and bear arms' and that the prefatory militia clause does not limit the operative clause. It struck down D.C.'s handgun ban and explicitly rejected the collective-right theory.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 9,
            directness: 10,
          },
          source:
            "District of Columbia v. Heller, 554 U.S. 570 (2008), Syllabus and Opinion of the Court (Scalia, J.)",
          sourceUrl:
            "https://www.law.cornell.edu/supremecourt/text/07-290.ZS.html",
          reasoning:
            "The controlling holding on exactly this question as a matter of US law. Independence is lower because it is a 5-4 ruling whose historical reasoning is heavily disputed: it settles the law, not the history.",
        },
        {
          id: "mcdonald-incorporation",
          title: "McDonald 2010: The Individual Right Binds the States, Again 5-4",
          description:
            "In McDonald v. City of Chicago (2010), the Court held 5-4 that the Heller individual right is 'fully applicable to the States' through the Fourteenth Amendment, reaffirming that the Second Amendment protects an individual right to keep and bear arms for self-defense.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 6,
            replicability: 9,
            directness: 8,
          },
          source:
            "McDonald v. City of Chicago, 561 U.S. 742 (2010), Opinion of the Court (Alito, J.)",
          sourceUrl: "https://www.law.cornell.edu/supremecourt/text/08-1521",
          reasoning:
            "Binding and direct, but it builds on Heller rather than testing the history again, and it was again 5-4.",
        },
        {
          id: "miller-1939",
          title: "Miller 1939: A Gun Law Upheld Because the Weapon Had No Militia Use",
          description:
            "In United States v. Miller (1939), the Court upheld a National Firearms Act conviction because a sawed-off shotgun had no 'reasonable relationship to the preservation or efficiency of a well regulated militia,' framing the Amendment's 'obvious purpose' as assuring an effective militia. For about 70 years most lower courts read it as establishing a militia-tied right.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "United States v. Miller, 307 U.S. 174 (1939)",
          sourceUrl: "https://en.wikipedia.org/wiki/United_States_v._Miller",
          reasoning:
            "The precedent the militia reading rested on for decades. Its terse opinion, in a case where the respondent never appeared, left its holding ambiguous, which is why Heller could read it as a case about weapons rather than people.",
        },
        {
          id: "stevens-dissent",
          title: "Stevens, for Four Justices: 'Bear Arms' Meant to Serve as a Soldier",
          description:
            "Justice Stevens' Heller dissent (joined by 3 Justices) argued 'bear arms' is a familiar military idiom meaning 'to serve as a soldier,' that the Amendment 'was adopted to protect the right of the people of each of the several States to maintain a well-regulated militia,' and that the Framers deliberately omitted any language protecting civilian uses.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 7,
            directness: 9,
          },
          source:
            "District of Columbia v. Heller, 554 U.S. 570 (2008), Stevens, J., dissenting",
          sourceUrl: "https://www.law.cornell.edu/supct/html/07-290.ZD.html",
          reasoning:
            "Four justices arguing the militia reading on text and history, in line with many historians. It is the losing side of a split decision, so it shows the question was close, not that the majority was wrong.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: How far does the right reach now?
    // =========================================================================
    {
      id: "scope-after-bruen",
      title: "How Far Does the Right Reach Now?",
      short_summary:
        "Since Bruen (2022), a gun law survives only if it fits the nation's historical tradition. The Court upheld disarming people under domestic-violence orders in 2024, struck down Hawaii's default carry ban and a drug-user prosecution in June 2026, and will decide on AR-15 bans by June 2027. Whether the right covers the most popular rifle in America is the third split.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Even granting an individual right, Heller itself said it is 'not unlimited', and a history-only test cannot sensibly judge weapons and threats the founders never imagined. Bruen told judges to ignore whether a law saves lives and look only for old analogues; lower courts have split ever since, upholding a law in one circuit and striking the same kind of law in another, as with 21-and-older purchase limits, which the Third Circuit struck down and the Fourth, Eleventh and DC circuits upheld. Even this Court had to step back in Rahimi (2024), ruling 8-1 that a person a court finds to be a credible threat to another may be disarmed, and saying the test needs no 'historical twin.' The Fourth Circuit held in the Maryland case that AR-15s are not even 'arms' the amendment protects, given their military design. States that ban them are making the kind of judgment about dangerous weapons that legislatures have made since the founding.",
      proponent_rebuttal:
        "The right protects the arms law-abiding people actually choose, and Americans have chosen the AR-15. Justice Kavanaugh wrote in 2025 that there is 'a strong argument that AR-15s are in common use by law-abiding citizens,' with an estimated 20 to 30 million in circulation, legal in 41 of 50 states. Bruen replaced judges' own weighing of costs and benefits with the method the Court uses for other rights: text and history. Since then it has struck down New York's rule that a citizen show 'proper cause' to carry a gun; in June 2026, by 6-3 in Wolford v. Lopez, Hawaii's rule that licensed carriers may not enter shops and other private property open to the public without the owner's express permission; and, in United States v. Hemani, a prosecution of a man for owning a pistol while using marijuana, because the government did not show he was dangerous. Rahimi shows the test can uphold sensible laws that target dangerous people. Banning a common rifle owned by millions of peaceful people is not one of them.",
      crux: {
        id: "ar15-ban-history-test",
        title: "The AR-15 Test",
        question:
          "Under Bruen's history test, may a state ban AR-15-style rifles, or are they protected arms in common use?",
        description:
          "The Court has agreed to decide in Viramontes v. Cook County and Grant v. Higgins whether bans on AR-15-style rifles violate the Second Amendment. The answer turns on whether these rifles are 'arms' in common use for lawful purposes, and whether founding-era and 19th-century laws on 'dangerous and unusual' weapons are analogues for a modern ban.",
        methodology:
          "Compare (1) evidence on how many AR-15-style rifles are owned and for what purposes (surveys, manufacturing data) with (2) the historical record of laws restricting particular weapons (Bowie knives, trap guns, machine guns under the 1934 National Firearms Act) and how courts treated them; and track the Court's decision, expected by June 2027.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "The Supreme Court's decision in Viramontes v. Cook County and Grant v. Higgins, expected by June 2027, which will bind lower courts on the legal question; whether a weapon's popularity should protect it from a ban stays a question of values that no historical record settles.",
          kind: "authority-allocation" as const,
        },
        cost_to_verify: "$0 (the decision and briefs will be public)",
        falsification: {
          supporter_flip:
            "If the historical record showed founding-era and 19th-century governments routinely banning a weapon widely owned by ordinary people for self-defense, and courts upholding those bans, the claim that common-use arms are beyond the reach of a ban would weaken.",
          skeptic_flip:
            "If the record showed weapon bans in the founding era reached only weapons that were rare or carried concealed to commit crimes, never a common arm kept at home, the claim that an AR-15 ban fits the nation's tradition would be hard to hold.",
          common_ground:
            "Both sides agree Bruen (2022) requires gun laws to fit the nation's historical tradition, that Rahimi (2024) allows disarming people a court finds dangerous, and that about nine states ban AR-15-style rifles pending the Court's 2027 ruling.",
          live_disagreement:
            "Whether a weapon's popularity makes it protected, or whether legislatures may ban weapons they judge too dangerous for civilian use; and whether a test built only on history can weigh modern firearms and the lives at stake.",
        },
      },
      evidence: [
        {
          id: "bruen-history-test",
          title: "Bruen 2022: 6-3, Gun Laws Must Fit 'This Nation's Historical Tradition'",
          description:
            "In New York State Rifle & Pistol Association v. Bruen, Justice Thomas, for a 6-3 Court, held that the Second and Fourteenth Amendments protect an individual's right to carry a handgun for self-defense outside the home, and struck down New York's proper-cause requirement for a carry license. 'When the Second Amendment's plain text covers an individual's conduct, the Constitution presumptively protects that conduct,' and the government must show the regulation is 'consistent with this Nation's historical tradition of firearm regulation.' The Court rejected the two-step test with means-end scrutiny that lower courts had used.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 6,
            replicability: 9,
            directness: 8,
          },
          source: "New York State Rifle & Pistol Ass'n v. Bruen, 597 U.S. 1 (2022)",
          sourceUrl: "https://www.law.cornell.edu/supremecourt/text/20-843",
          reasoning:
            "The governing test for every gun law today, and it extended the individual right to public carry. It decides method, not the AR-15 question, and three justices dissented.",
        },
        {
          id: "wolford-2026",
          title: "Wolford v. Lopez, June 2026: 6-3 Against Hawaii's Default Ban on Carry Onto Private Property",
          description:
            "On 25 June 2026 the Supreme Court, in an opinion by Justice Alito joined by Chief Justice Roberts and Justices Thomas, Gorsuch, Kavanaugh and Barrett, held that Hawaii's Act 52 'cannot be reconciled with the right to bear arms' because it barred licensed carriers from carrying on private property open to the public without the owner's express permission. Justices Kagan and Jackson dissented, Justice Sotomayor joining Jackson. Hawaii's limits in places such as parks, beaches and bars were not affected, and owners may still bar guns.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 9,
            directness: 6,
          },
          source:
            "Faegre Drinker, 'Supreme Court Decides Wolford v. Lopez' (June 2026); Hawaii Public Radio (26 June 2026)",
          sourceUrl:
            "https://www.faegredrinker.com/en/insights/publications/2026/6/supreme-court-decides-wolford-v-lopez-attorney-general-of-hawaii",
          reasoning:
            "Shows the current majority applying Bruen to strike down a carry rule written after it. It is about where guns may be carried, not which guns may be owned, and it left most of Hawaii's law in place.",
        },
        {
          id: "ar15-cert-2026",
          title: "June 2026: Court Agrees to Decide AR-15 Bans; Kavanaugh Cites 20-30 Million in Circulation",
          description:
            "On 30 June 2026 the Supreme Court granted review in Viramontes v. Cook County, Illinois, a challenge to Cook County's ban on AR-15s and similar rifles, and Grant v. Higgins, a challenge to Connecticut's assault weapons ban. The year before, it had denied review of Maryland's ban in Snope v. Brown; Justice Kavanaugh then wrote there is 'a strong argument that AR-15s are in common use by law-abiding citizens,' citing an estimated 20 to 30 million in circulation and noting they are legal in 41 of 50 states. The Court also denied review of several challenges to 21-and-older purchase limits, leaving a split among the circuits.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Duke Center for Firearms Law, 'Cert Alert: SCOTUS Grants Certiorari in AR-15 Ban Cases' (30 June 2026)",
          sourceUrl:
            "https://firearmslaw.duke.edu/2026/06/cert-alert-scotus-grants-certiorari-in-ar-15-ban-cases",
          reasoning:
            "Signals that at least four justices think the question needs answering and that one key vote sees a strong common-use argument. A grant of review is not a ruling, and the bans stay in force until the Court decides.",
        },
        {
          id: "rahimi-2024",
          title: "Rahimi 2024: 8-1, People a Court Finds Dangerous May Be Disarmed",
          description:
            "In United States v. Rahimi, Chief Justice Roberts, for an 8-1 Court, upheld the federal law disarming people under domestic-violence restraining orders, holding that 'an individual found by a court to pose a credible threat to the physical safety of another may be temporarily disarmed consistent with the Second Amendment.' The Court said the history test does not require a 'historical twin' or 'dead ringer.' Justice Thomas dissented.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source: "United States v. Rahimi, 602 U.S. 680 (2024)",
          sourceUrl: "https://www.law.cornell.edu/supremecourt/text/22-915",
          reasoning:
            "Shows the right has firm limits even for this Court, and that the history test can uphold modern laws. It concerns who may be disarmed, not which weapons, and it is consistent with an individual right.",
        },
        {
          id: "hemani-2026",
          title: "Hemani, June 2026: Drug-User Gun Ban Unconstitutional as Applied to One Marijuana User",
          description:
            "On 18 June 2026, in an opinion by Justice Gorsuch, the Court held that prosecuting Ali Hemani under the federal 'unlawful user' ban, for having a handgun while using marijuana, was 'inconsistent with the Second Amendment,' because the government offered no showing that his drug use made him dangerous. The ruling is limited to his circumstances; it left open bans on addicts or intoxicated people and future laws aimed at users of particular drugs. Justice Jackson, joined by Justice Sotomayor, concurred but criticised Bruen's history-and-tradition test.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 4,
          },
          source: "National Constitution Center, 'Supreme Court rules in favor of man facing gun ban for using marijuana' (June 2026)",
          sourceUrl:
            "https://constitutioncenter.org/amp/blog/supreme-court-rules-in-favor-of-man-facing-gun-ban-for-using-marijuana",
          reasoning:
            "A narrow ruling that tied disarmament to a showing of danger, the same line Rahimi drew. Supporters of broad rights read it as a win; supporters of regulation read it as confirming that dangerous people can still be disarmed, and two justices used it to attack the history test itself.",
        },
      ],
    },
  ],
  aliases: [
    "Does the Second Amendment protect an individual right?",
    "Is an assault weapons ban constitutional?",
    "Does the Second Amendment only protect militias?",
  ],
  references: [
    {
      title: "Cert Alert: SCOTUS Grants Certiorari in AR-15 Ban Cases - Duke Center for Firearms Law (30 June 2026)",
      url: "https://firearmslaw.duke.edu/2026/06/cert-alert-scotus-grants-certiorari-in-ar-15-ban-cases",
    },
    {
      title: "New York State Rifle & Pistol Ass'n v. Bruen (2022) - Legal Information Institute",
      url: "https://www.law.cornell.edu/supremecourt/text/20-843",
    },
    {
      title: "United States v. Rahimi (2024) - Legal Information Institute",
      url: "https://www.law.cornell.edu/supremecourt/text/22-915",
    },
    {
      title: "Supreme Court strikes down Hawaii gun law - Hawaii Public Radio (26 June 2026)",
      url: "https://www.hawaiipublicradio.org/2026-06-26/supreme-court-hawaii-gun-law",
    },
  ],
};
