export const electoralCollegeReformData = {
  id: "electoral-college-reform",
  title: "Electoral College Reform",
  question: "Should a national popular vote replace the Electoral College?",
  meta_claim:
    "The Electoral College should be replaced with a national popular vote for electing the President of the United States.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Twice in the last seven elections (2000, 2016) the candidate who won the most votes lost the presidency, and a Wyoming voter carries about 3.8 times the electoral weight of a Californian. Abolishing the Electoral College takes a constitutional amendment, and the interstate compact that would work around it is 48 electoral votes short. The fight is over whether a national popular vote would be fairer, and whether it is worth the cost of getting there.",
    confidence: 85,
    source:
      "National Popular Vote Interstate Compact status (2026); US Census Bureau, 2020 Census apportionment population (Table 1); FEC, Federal Elections 2000 and 2016",
    sourceUrl: "https://www.nationalpopularvote.com/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that the popular-vote winner lost the presidency in 2000 and 2016, that a Wyoming voter carries about 3.8× the electoral weight of a Californian, and that the National Popular Vote Interstate Compact sits at 222 of the 270 electoral votes it needs, with no Supreme Court ruling on it yet.",
    "They split over whether that unequal weight is a flaw or a feature that forces candidates to build geographically broad coalitions; whether the compact can win the Republican-leaning states it still needs to reach 270; and whether it would survive a Supreme Court challenge under the Compact Clause.",
  ],
  pillars: [
    {
      id: "democratic-legitimacy",
      title: "Democratic Legitimacy",
      short_summary:
        "A Wyoming voter has 3.8x the Electoral College weight of a California voter. Two of the last six presidents lost the popular vote.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The Electoral College protects federalism and ensures small states have meaningful influence. It forces candidates to build geographically broad coalitions. A pure popular vote would concentrate campaigns in major cities and ignore rural America. The Founders deliberately rejected direct democracy because they feared tyranny of the majority.",
      proponent_rebuttal:
        "Under the Electoral College, candidates already ignore 40+ states to focus on 5-7 swing states. Wyoming voters have 3.8x the electoral weight of California voters (2020 Census apportionment: about 193,000 residents per electoral vote in Wyoming against about 733,000 in California). In 2000 and 2016, the popular vote winner lost the presidency—outcomes most democracies would consider illegitimate. A 2024 Pew Research survey found 63% of Americans favor replacing the Electoral College with a popular vote, including 46% of Republicans and Republican-leaners (with 53% preferring to keep the Electoral College)—so reform support is not confined to one party, even if it is far stronger among Democrats (80%).",
      crux: {
        id: "npvic-enactment",
        title: "National Popular Vote Interstate Compact Reaching 270 EVs",
        question:
          "Can the National Popular Vote compact realistically reach 270 electoral votes?",
        description:
          "The NPVIC needs states totaling 270 electoral votes to take effect. As of April 2026 it has 222 (18 states plus DC), leaving it 48 short. The remaining states needed lean Republican, and Republican policymakers—who benefited from the Electoral College in 2000 and 2016—have so far shown little incentive to enact it; no state with a Republican trifecta has done so.",
        methodology:
          "Track state-level NPVIC legislation. Analyze political feasibility in remaining states needed to reach 270 EVs. Model legal challenges that would follow enactment.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Bill votes on the compact in the states it still needs, especially swing and Republican-led legislatures, tracked session by session along with any state that joins or withdraws, as recorded by the National Conference of State Legislatures.",
        },
        cost_to_verify: "$0 (Monitor state legislative actions)",
        falsification: {
          supporter_flip:
            "If the NPVIC stalled permanently below 270 — the remaining states it needs (which lean Republican and benefited from the Electoral College) keep refusing — then 'replace it with the popular vote' becomes an aspiration with no realistic path, and reform energy would be better spent elsewhere.",
          skeptic_flip:
            "If polling kept showing about 63% of Americans, including a substantial share of Republicans, favoring a popular vote, and another popular-vote loser took the presidency, reform would be hard to dismiss as fringe or partisan noise.",
          common_ground:
            "Both sides agree the NPVIC currently sits at 222 of the 270 electoral votes it needs, and that the remaining path runs through states with little incentive to join.",
          live_disagreement:
            "Whether the compact can realistically reach 270 given that the states it still needs lean Republican and benefited from the Electoral College — a political question only future legislatures will answer.",
        },
      },
      evidence: [
        {
          id: "pew-2024-survey",
          title: "Pew Research: 63% of Americans Favor Popular Vote",
          description:
            "A Pew Research Center survey of 9,720 U.S. adults conducted Aug. 26–Sept. 2, 2024 found that 63% of Americans prefer the president to be elected by whoever wins the most votes nationally, while 35% favor keeping the Electoral College. Support is split by party: 80% of Democrats and Democratic-leaning independents favor a popular vote, while among Republicans and Republican-leaners 46% favor a popular vote and 53% prefer the Electoral College.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source:
            "Pew Research Center, \"Majority of Americans continue to favor moving away from Electoral College\" (Sept. 25, 2024)",
          sourceUrl:
            "https://www.pewresearch.org/short-reads/2024/09/25/majority-of-americans-continue-to-favor-moving-away-from-electoral-college/",
          reasoning:
            "Gold-standard polling from the most respected survey organization. However, public opinion does not determine constitutional correctness—many constitutional protections exist precisely to override majority preferences.",
        },
        {
          id: "popular-vote-losses",
          title: "Two Recent Presidents Lost the Popular Vote",
          description:
            "In both 2000 and 2016, the candidate who received more total votes from American citizens lost the presidency. George W. Bush lost the popular vote to Al Gore by 543,895 votes (50,456,002 to 50,999,897), and Donald Trump lost to Hillary Clinton by 2,868,686 votes (62,984,828 to 65,853,514), in the Federal Election Commission's official results. Ballotpedia counts four elections between 1876 and 2024 in which the Electoral College winner did not receive the most votes.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 9,
          },
          source:
            "Federal Election Commission, 'Federal Elections 2016: Election Results for the U.S. President, the U.S. Senate and the U.S. House of Representatives' (2017) and 'Federal Elections 2000' (2001), official presidential general election results; Ballotpedia, 'National Popular Vote Interstate Compact'",
          sourceUrl:
            "https://www.fec.gov/documents/1889/federalelections2016.pdf",
          reasoning:
            "Official FEC tallies—Gore led Bush by 543,895 votes in 2000 and Clinton led Trump by 2,868,686 votes in 2016. Directness is high because this is exactly the scenario reform proponents want to prevent.",
        },
        {
          id: "federalism-protection",
          title: "Electoral College Protects Small-State Influence",
          description:
            "Each state gets one electoral vote per House member plus two for its senators, so no state has fewer than 3 electoral votes regardless of population, giving smaller states proportionally greater influence. Without this, candidates would have no incentive to address issues specific to rural and low-population states. The system ensures the president must build a geographically diverse coalition rather than simply maximizing votes in a few mega-cities.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source:
            "National Archives, 'What is the Electoral College?' (gives the allocation formula: one elector per House member plus two for the senators); the argument is a common pro–Electoral College interpretation rather than a sourced empirical finding",
          sourceUrl: "https://www.archives.gov/electoral-college/about",
          reasoning:
            "The factual mechanism follows from the National Archives' formula: a state 'has the same number of electors as it does Members in its Congressional delegation', one per House member plus two senators, and since every state has at least one House member, the floor is 3, so low-population states are overrepresented relative to population. The downstream claim that this protects small-state influence is interpretive and empirically questionable—under the current system candidates already concentrate on a handful of swing states, and small states like Wyoming and Vermont are not swing states and receive minimal attention. (Note: the previously cited American Bar Association does not endorse this argument; the ABA has historically criticized the Electoral College as archaic.) Weights lowered accordingly.",
        },
        {
          id: "npvic-progress",
          title: "Virginia Brought the NPVIC to 222 of the 270 Electoral Votes It Needs (April 2026)",
          description:
            "As of 2026, the National Popular Vote Interstate Compact has been enacted by 18 states plus the District of Columbia, controlling 222 electoral votes (Virginia became the most recent to join when Gov. Abigail Spanberger signed the bill on Monday, April 13, 2026, NPR reported). The compact will take effect when states controlling 270 electoral votes (a majority of 538) have joined—an additional 48 are needed. Per Ballotpedia, 16 of the 18 member states had a Democratic trifecta when they joined; the two with divided government were New York (2014) and Hawaii (2008), where a Democratic legislature overrode Republican Gov. Linda Lingle's veto.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "NPR (Ashley Lopez), \"Virginia joins a national effort to ensure only popular vote winners become president\" (14 April 2026); Ballotpedia, \"National Popular Vote Interstate Compact\"",
          sourceUrl: "https://www.vpm.org/npr-news/2026-04-14/virginia-joins-a-national-effort-to-ensure-only-popular-vote-winners-become-president",
          reasoning:
            "Factual progress that demonstrates political momentum. However, the remaining 48 EVs require states that are politically unlikely to join, making completion uncertain. (Note: the 209-EV/17-state figure was accurate in early 2025 but is now superseded by Virginia's 2026 accession.)",
        },
        {
          id: "partisan-adoption-concern",
          title: "No State With a Republican Trifecta Has Joined the NPVIC; 16 of 18 Members Joined Under a Democratic One",
          description:
            "Ballotpedia's adoption table shows that of the 18 member states, 16 had a Democratic trifecta at the time of adoption and two had divided government (Hawaii in 2008, where a Democratic legislature overrode Republican Gov. Linda Lingle's veto, and New York in 2014); none had a Republican trifecta. No Republican governor has signed it: every signature came from a Democrat, and Maine's bill became law in 2024 without Gov. Janet Mills's signature. Of the 32 states outside the compact, 23 have a Republican trifecta and nine have divided government. National Popular Vote Inc. counts three Republican-controlled chambers that have passed the bill (the Arizona House in 2016, by 40 to 16, the Oklahoma Senate and the New York Senate); of those three states, only New York has joined. This partisan pattern complicates the claim that the NPVIC is a fully nonpartisan reform.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Ballotpedia, 'National Popular Vote Interstate Compact' (adoption table and trifecta analysis, as of November 2026); National Popular Vote Inc., Arizona status page (Republican-controlled chambers)",
          sourceUrl: "https://ballotpedia.org/National_Popular_Vote_Interstate_Compact",
          reasoning:
            "The partisan pattern in enactment is real, but the claim that 'no Republican legislature has passed the compact' would overstate it—by National Popular Vote Inc.'s count, three Republican-controlled chambers have passed it. This may reflect rational self-interest rather than the policy's merits: Republicans benefited from the Electoral College in 2000 and 2016. Weights modestly lowered to reflect the softened claim.",
        },
      ],
    },
    {
      id: "npvic-feasibility",
      title: "National Popular Vote Interstate Compact",
      short_summary:
        "The National Popular Vote Interstate Compact has 222 of the 270 electoral votes it needs (48 short). Legal scholars are split on whether it survives a Supreme Court challenge.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The NPVIC is constitutionally dubious: it effectively amends the Constitution through an interstate agreement rather than the Article V process, arguably evading the supermajority safeguards the Founders built in deliberately. The Supreme Court could strike it down under the Compact Clause. Adoption has also been lopsidedly partisan: 16 of the 18 member states joined under a Democratic trifecta, no Republican governor has signed it, and no state with a Republican trifecta has enacted it (though three Republican-controlled chambers have passed it). If enacted, a state could withdraw close to an election, and a single recount or disputed national tally could throw the result into chaos across all member states at once.",
      proponent_rebuttal:
        "The Constitution explicitly grants states the power to determine how their electors are chosen (Article II, Section 1). States already use winner-take-all by choice, not constitutional mandate—they could just as easily choose to allocate electors based on the national popular vote. As of April 2026, 18 states plus DC have joined the NPVIC, controlling 222 of the needed 270 electoral votes (Virginia became the most recent, signing on April 13, 2026), leaving the compact 48 short.",
      crux: {
        id: "scotus-constitutionality",
        title: "Supreme Court Ruling on NPVIC Constitutionality",
        question:
          "Would the National Popular Vote compact survive a Supreme Court challenge?",
        description:
          "The Compact Clause may require Congressional approval for interstate agreements. The Supreme Court has never ruled on the NPVIC specifically.",
        methodology:
          "Track NPVIC enactment progress and any resulting legal challenges through federal courts to the Supreme Court.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A court ruling on the compact once it nears 270 votes or, before that, the Supreme Court's reasoning in related cases on interstate compacts and state control of electors, such as the 2020 faithless-elector decision, read by constitutional scholars on both sides.",
        },
        cost_to_verify: "$0 (Monitor legal proceedings if/when NPVIC activates)",
        falsification: {
          supporter_flip:
            "If courts ruled the NPVIC unconstitutional — finding it an interstate compact that requires Congressional approval under the Compact Clause, or that it unlawfully evades Article V — the popular-vote-via-compact route would be dead, leaving only a near-impossible constitutional amendment.",
          skeptic_flip:
            "If courts read Article II's grant to each state over how it chooses electors as covering a state that directs its electors by the national vote, the compact would look like a serious constitutional route rather than an obvious overreach.",
          common_ground:
            "Both sides agree the Supreme Court has never ruled on the NPVIC, and that its Compact-Clause status is genuinely unsettled.",
          live_disagreement:
            "Whether the NPVIC survives a Supreme Court challenge — turning on whether directing electors by national vote is a permissible exercise of states' Article II power or an interstate compact needing Congressional consent.",
        },
      },
      evidence: [
        {
          id: "chiafalo-states-far-reaching-authority",
          title: "Chiafalo v. Washington (2020): A Unanimous Supreme Court Held That Article II Gives States 'Far-Reaching Authority' Over Their Electors",
          description:
            "On 6 July 2020 the Supreme Court upheld Washington's fine on 'faithless' electors who broke their pledge. All nine justices agreed on the outcome; Justice Kagan wrote for eight that 'Article II, §1's appointments power gives the States far-reaching authority over presidential electors, absent some other constitutional constraint', and that 'the power to appoint an elector (in any manner) includes power to condition his appointment.' A footnote marks one such constraint: 'A State, for example, cannot select its electors in a way that violates the Equal Protection Clause.' The case did not involve the compact.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source: "Chiafalo v. Washington, 591 U.S. ___ (2020), No. 19-465 (Legal Information Institute text)",
          sourceUrl: "https://www.law.cornell.edu/supremecourt/text/19-465",
          reasoning:
            "The Court's most recent reading of the clause the compact rests on, and it is broad, which is why compact supporters cite it. Directness is 5: the holding is about binding electors to a pledge, not about states coordinating by agreement, and the opinion's own 'absent some other constitutional constraint' leaves room for the Compact Clause and equal-protection objections the other side raises.",
        },
        {
          id: "crs-compact-consent-test",
          title: "CRS (2023): Under Current Precedent, Only Compacts That Raise State Power Against the Federal Government Need Congress's Consent",
          description:
            "The Congressional Research Service's overview of interstate compacts (Stephen Mulligan, updated 15 June 2023) summarizes the Supreme Court's test from Virginia v. Tennessee (1893) and U.S. Steel Corp. v. Multistate Tax Commission (1978): 'only interstate compacts that increase the political power of the states while undermining federal sovereignty require' congressional consent. In U.S. Steel a compact that strengthened states' hand against taxed companies needed no consent, because the test 'does not focus on whether the compact makes the states more influential in general but only whether it could enhance the states' power in relation to the federal government.' Michael Morley, a critic of the compact, concedes in the Harvard Law & Policy Review (2021) that 'under current doctrine the Compact probably does not need congressional assent.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 5,
          },
          source:
            "Congressional Research Service, 'Interstate Compacts: An Overview', Legal Sidebar LSB10807 (updated 15 June 2023); Morley, Harvard Law & Policy Review vol. 15 (2021)",
          sourceUrl: "https://www.everycrsreport.com/reports/LSB10807.html",
          reasoning:
            "A nonpartisan statement of the governing test, plus a concession from the compact's sharpest critic, together the strongest case that the consent objection fails as the law now stands. The sidebar does not discuss the compact itself, and the Court could revise a test it has applied to boundary and tax compacts when presidential selection is at stake, so directness is 5. It answers only the consent question, not the right-to-vote and equal-protection objections.",
        },
        {
          id: "crs-npv-compact-unresolved",
          title: "CRS (2019): The NPV Compact Is an Interstate Compact, and Whether It Needs Congress's Consent Is 'Unresolved'",
          description:
            "The Congressional Research Service's report on the compact (Thomas Neale and Andrew Nolan, updated 28 October 2019) concludes that 'it appears that the initiative can be described as an interstate compact', the threshold step for a Compact Clause challenge, and that whether a compact of this kind needs congressional consent is 'simply unresolved by the relevant case law.' It expects the question of whether the compact harms non-member states 'would likely be the source of considerable litigation if the initiative ever became effective', and records Ohio State election-law scholar Edward Foley's view that it 'would likely be challenged in court, perhaps successfully.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source:
            "Congressional Research Service, 'The National Popular Vote (NPV) Initiative: Direct Election of the President by Interstate Compact', R43823 (updated 28 Oct 2019)",
          sourceUrl: "https://www.everycrsreport.com/reports/R43823.html",
          reasoning:
            "Nonpartisan and about this compact specifically, so directness is 7. It does not predict that the compact would lose; it says the law is open and litigation near certain, which cuts against the confidence of supporters who treat Article II as settling it. The report predates Chiafalo (2020) and Virginia's 2026 accession.",
        },
        {
          id: "morley-npv-constitutional-infirmities",
          title: "Morley (2021): Even if Congress's Consent Is Not Needed, the Compact Likely Violates the Right to Vote, Equal Protection and the Electors Clause",
          description:
            "Florida State law professor Michael Morley, in 'The Framers' Inadvertent Gift: The Electoral College and the Constitutional Infirmities of the National Popular Vote Compact' (Harvard Law & Policy Review, vol. 15, 2021), argues that 'regardless of congressional approval, the Compact likely violates the Constitution in four ways.' By appointing electors on national tallies, a member state's votes are 'unconstitutionally diluted or even overwhelmed by votes of other states' citizens'; pooling ballots 'cast under fifty-one different electoral systems' runs into Bush v. Gore; it lets 'a cabal of states' decide the presidency for the rest; and it limits the plenary power the Electors Clause gives state legislatures. He calls the Compact Clause itself 'a potential constitutional speed bump, not an impenetrable barrier.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 4,
            directness: 7,
          },
          source:
            "Michael T. Morley, 'The Framers' Inadvertent Gift: The Electoral College and the Constitutional Infirmities of the National Popular Vote Compact', Harvard Law & Policy Review 15 (2021)",
          sourceUrl: "https://journals.law.harvard.edu/lpr/wp-content/uploads/sites/89/2021/08/HLP109.pdf",
          reasoning:
            "A detailed law-review argument aimed squarely at the crux, and it moves the fight from consent to substantive clauses that no court has applied to the compact. Independence is 5 because the author writes as an advocate against the compact, and replicability 4 because these are untested legal theories that supporters (Amar, National Popular Vote Inc.) contest point by point, for example that Bush v. Gore concerned differences within one state, not between states.",
        },
      ],
    },
  ],
};
