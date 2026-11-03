export const partisanGerrymanderingData = {
  id: "partisan-gerrymandering",
  title: "The Redistricting War",
  question: "Should partisan gerrymandering be banned, including mid-decade redraws?",
  meta_claim:
    "Drawing congressional districts for partisan advantage, including redrawing them mid-decade, should be banned nationwide, with maps drawn by independent commissions or neutral rules, because partisan maps cost voters competitive elections and no state can safely give them up alone.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: ten states redrew U.S. House maps between August
  // 2025 and June 2026 (Texas, Missouri, North Carolina, Ohio, California,
  // Utah, Florida, Tennessee, Louisiana, Alabama); Missouri's is off the 2026
  // ballot after the U.S. Supreme Court's 10 September order, leaving nine in
  // force. Virginia's amendment was voided on 8 May 2026. This map does not
  // rely on any result of the 3 November election.
  last_updated: "2026-11-03",
  tags: ["redistricting", "gerrymandering", "elections", "congress", "prop-50"],
  aliases: [
    "Mid-decade redistricting",
    "Texas redistricting",
    "California Prop 50",
    "Independent redistricting commissions",
    "Gerrymandering ban",
  ],
  // ── The lede: what happened, then what the fight is over ──
  keystone_fact: {
    statement:
      "Between August 2025 and June 2026, ten states redrew their U.S. House districts in the middle of the decade, starting with Texas at President Trump's urging and California in reply. In June, NBC News counted up to 16 seats Republicans could gain from the new maps and up to six for Democrats; in September the U.S. Supreme Court left Missouri's new map off the 2026 ballot, leaving nine in force on November 3, 2026. The fight is over how much the lines decide, whether neutral maps would make Congress better, and whether any state should give up the weapon while others use it.",
    confidence: 85,
    source:
      "NBC News, 'Where the redistricting fight stands heading into the midterms' (June 3, 2026); SCOTUSblog, 'Supreme Court grants request to prevent Missouri from using congressional map' (September 10, 2026)",
    sourceUrl:
      "https://www.nbcnews.com/politics/2026-election/house-redistricting-gop-democrats-2026-midterm-elections-rcna348110",
  },
  // ── The summary above the crux sheet: what the map turns on ──
  simple_case: [
    "Both sides accept that state legislatures draw most congressional maps, that the Supreme Court ruled in 2019 that federal courts cannot police partisan gerrymanders, and that Texas redrew to target five Democratic seats and California suspended its commission's map to answer. Both also accept that the number of swing seats has fallen sharply since the late 1990s.",
    "They split over how many seats the lines move once both parties' maps are added up; over whether gerrymanders or where voters live explain the loss of competitive seats and the rise in polarization; over whether independent commissions draw better maps or just move the fight; and over whether one state should give up partisan maps while others keep drawing them.",
    "The first three are questions that simulated neutral maps and election data can answer; the last is a judgment about fair play between rivals that the numbers inform but do not decide.",
  ],
  pillars: [
    {
      id: "how-much-lines-decide",
      title: "How Much Do the Lines Decide?",
      short_summary:
        "Party tallies credit the 2025-26 redraws with double-digit seat swings. Studies that compare enacted maps with thousands of neutral ones find that gerrymanders by both parties largely cancel nationally, while geography gives Republicans a larger built-in edge.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Nationally, the gerrymanders mostly cancel. Comparing every 2020-cycle House map with simulated nonpartisan plans, Kenny, McCartan, Simko, Kuriwaki and Imai found partisan gerrymandering widespread but worth only about two seats to Republicans on net, because Democratic maps offset Republican ones. A 2025 follow-up found where voters live matters more: Republicans' geographic advantage was 10 seats, and gerrymandering cut the overall pro-Republican bias rather than raising it. The 2025-26 war follows the same pattern: Texas took five seats, California answered with up to five, and courts blocked Missouri's map and voided Virginia's.",
      proponent_rebuttal:
        "Cancelling out is not harmless: voters in each gerrymandered state lose a fair map whether or not another state offsets it, and the netting is luck, not design. This round was lopsided: in June NBC News counted up to 16 seats Republicans could gain from the new maps against six for Democrats. Texas acted because President Trump said \"we are entitled to five more seats,\" and the Supreme Court let its map stand after a lower court found it likely a racial gerrymander. After Louisiana v. Callais narrowed the Voting Rights Act in April 2026, Louisiana and Alabama redrew within weeks.",
      crux: {
        id: "seat-effect",
        title: "The Net Seat Effect",
        question:
          "How many House seats do partisan maps move nationally once both parties' gerrymanders are added up?",
        description:
          "Party estimates count each state's targeted seats; simulation studies compare enacted maps with thousands of neutral maps drawn under each state's rules and find most partisan bias cancels nationally. The answer depends on scoring every new map on the same past vote against a neutral baseline.",
        methodology:
          "For each state, simulate thousands of maps that follow its legal criteria with no partisan data, then score the enacted 2026 map and the simulated maps on the same past election results. Sum the gap across states for the 2026 maps and compare it with the 2022 maps.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An updated simulation study, in the Kenny-Imai design, scoring the nine mid-decade maps in force for 2026 and every other state's map against simulated neutral plans on the same past vote, reporting the national net seat bias against the 2022 baseline.",
        },
        cost_to_verify:
          "The simulation tools and data are public; an update for the 2026 maps is months of work for an academic team.",
        falsification: {
          supporter_flip:
            "If neutral-map simulations of the 2026 maps showed a net national bias of a seat or two, as in the 2020 cycle, the claim that gerrymandering decides control of the House would weaken, though state-level unfairness would remain.",
          skeptic_flip:
            "If the same simulations showed the 2026 maps moving a net of five or more seats, the claim that gerrymanders cancel out nationally would no longer hold for this round.",
          common_ground:
            "Both sides agree that both parties gerrymander where they can, that geography gives Republicans some advantage under any neutral map, and that party seat estimates assume past voting patterns hold.",
          live_disagreement:
            "Whether the national net is small enough to tolerate, or whether a lopsided round can tip control of the House and the state-level harm counts regardless.",
        },
      },
      evidence: [
        {
          id: "nbc-seat-tally",
          title: "June 2026: New Maps Put Up to 16 Seats in Reach for Republicans, Six for Democrats",
          description:
            "NBC News counted new maps in Alabama, Louisiana, Tennessee, Florida, Texas, Ohio, North Carolina and Missouri that favor Republicans, with up to 3-5 seats in Texas and up to 4 in Florida, and new maps in California (up to 4-5) and Utah (up to 1) that favor Democrats: \"Republicans are in position to gain as many as 16 House seats this fall, compared with six for Democrats.\" Virginia's Democratic map was blocked by its state supreme court.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source: "NBC News, 'Where the redistricting fight stands heading into the midterms' (June 3, 2026)",
          sourceUrl:
            "https://www.nbcnews.com/politics/2026-election/house-redistricting-gop-democrats-2026-midterm-elections-rcna348110",
          reasoning:
            "A careful tally of the round's direction, which was lopsided. These are ceilings that assume past voting holds, Missouri's map was later kept off the 2026 ballot, and they are not scored against a neutral baseline.",
        },
        {
          id: "texas-map-upheld",
          title: "April 2026: Supreme Court Cements Texas Map Targeting Five Democratic Seats",
          description:
            "On April 27, 2026 the Supreme Court summarily reversed a lower-court ruling that Texas's new congressional map was likely an unconstitutional racial gerrymander, relying on its December 2025 order that let the map take effect. The order \"cements a new GOP-drawn congressional map for the Lone Star State targeting five House seats currently held by Democrats.\" The three Democratic appointees dissented; in December Justice Kagan wrote that many Texas citizens \"will be placed in electoral districts because of their race.\"",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Roll Call, 'Supreme Court wipes out lower court ruling against Texas redistricting' (April 27, 2026)",
          sourceUrl: "https://rollcall.com/2026/04/27/supreme-court-wipes-out-lower-court-ruling-against-texas-redistricting/",
          reasoning:
            "Shows a single state moving five seats mid-decade with no federal check on partisan intent. Whether the seats flip depends on voters, and the Court's majority found the lower court had not honored the presumption of legislative good faith.",
        },
        {
          id: "entitled-to-seats",
          title: "Trump, August 2025: 'We Are Entitled to Five More Seats' in Texas",
          description:
            "In a phone interview with CNBC on August 5, 2025, President Trump said of the Texas redraw, \"we are entitled to five more seats.\" DNC Chairman Ken Martin answered: \"No party is entitled to any district. We have to go out and earn the votes, and that's what a democracy is about.\"",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 4,
          },
          source: "ABC7 News, 'Trump says Texas GOP \"entitled\" to more seats as redistricting showdown continues' (August 5, 2025)",
          sourceUrl:
            "https://abc7news.com/post/trump-says-texas-gop-entitled-more-seats-redistricting-showdown-continues/17440763/",
          reasoning:
            "States openly that the redraw was meant to add seats for one party, which reformers say is the harm. It shows intent, not effect.",
        },
        {
          id: "callais-redraws",
          title: "April 2026: Callais Narrowed the Voting Rights Act, and Southern States Redrew Within Weeks",
          description:
            "On April 29, 2026 the Supreme Court ruled 6-3 in Louisiana v. Callais that Louisiana's map with a second majority-Black district was an unconstitutional racial gerrymander. Justice Alito wrote that Section 2 \"requires evidence giving rise to a strong inference of intentional discrimination.\" Justice Kagan wrote in dissent, \"Today's decision renders Section 2 all but a dead letter.\" Florida passed a new map shifting four seats toward Republicans on 2024 presidential results, and Mississippi called a special session.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Ballotpedia News, 'U.S. Supreme Court decides prominent redistricting case with implications for future map changes' (April 29, 2026)",
          sourceUrl:
            "https://news.ballotpedia.org/2026/04/29/u-s-supreme-court-decides-prominent-redistricting-case-with-implications-for-future-map-changes/",
          reasoning:
            "Shows that with the Voting Rights Act narrowed, few legal limits remain on partisan maps, which supporters say leaves legislation as the only check. The ruling is about race, not party, so its link to partisan gerrymandering runs through what states chose to do next.",
        },
        {
          id: "gerrymanders-cancel",
          title: "2020 Cycle: Gerrymanders Mostly Cancelled Nationally, Netting Republicans About Two Seats",
          description:
            "Comparing every enacted 2020-cycle House map with large sets of simulated nonpartisan plans that follow each state's rules, Kenny, McCartan, Simko, Kuriwaki and Imai found that partisan gerrymandering was widespread but that most of the bias it created cancelled at the national level, \"giving Republicans two additional seats on average.\" Geography and redistricting rules separately added a moderate pro-Republican bias.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "Kenny, McCartan, Simko, Kuriwaki & Imai, 'Widespread Partisan Gerrymandering Mostly Cancels Nationally, but Reduces Electoral Competition', PNAS 120(25) (2023)",
          sourceUrl: "https://arxiv.org/abs/2208.06968v2",
          reasoning:
            "The most rigorous national measure of gerrymandering's seat effect, using a neutral baseline rather than party claims. It covers the 2020 maps, before the 2025-26 redraws, and a small national net still means unfair maps inside many states.",
        },
        {
          id: "geography-bias",
          title: "2025 Study: Geography Gives Republicans a 10-Seat Edge; Gerrymanders Cut the Overall Bias",
          description:
            "A 2025 study by Jasny, Kenny, McCartan, Imai and co-authors found that geographic polarization intensified from 2010 to 2020, with Republicans gaining in rural and rural-suburban areas and Democrats in urban districts. Republicans' geographic advantage fell from 14 seats to 10; pro-Democratic gerrymandering in 2020 offset earlier Republican efforts, cutting the Republican redistricting advantage by two seats; and overall pro-Republican bias declined from 16 seats to 10.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source:
            "Jasny, Kenny, McCartan, Simko, Wu, Zhao, Arora, Ebowe, O'Sullivan, Samarth & Imai, 'Gerrymandering and geographic polarization have reduced electoral competition', arXiv:2508.15885 (August 21, 2025)",
          sourceUrl: "https://arxiv.org/abs/2508.15885",
          reasoning:
            "Shows where voters live shapes the House more than line-drawing does, which weakens the claim that banning gerrymanders would change control. It is a preprint and ends before the mid-decade maps.",
        },
      ],
    },
    {
      id: "does-it-harm-democracy",
      title: "Do Gerrymanders Make Congress Worse?",
      short_summary:
        "Reformers blame safe seats for vanishing competition and a polarized House. Researchers find gerrymanders do cut competition, but that most of the decline, and most of the polarization, comes from voters sorting themselves.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The usual story gets the cause wrong. McCarty, Poole and Rosenthal found \"very little evidence\" that gerrymandering causes congressional polarization: simulated neutral maps produce nearly the same polarization, because Democrats and Republicans represent the same kinds of districts very differently. And the 2025 Imai-team study found that competitive districts fell by over 25% from 2010 to 2020 mostly because of geographic polarization. A ban would not bring back the swing seats voters sorted away.",
      proponent_rebuttal:
        "Gerrymanders are not the only cause, but they are the one a law can fix. The same team that found the national seat effect small found that partisan gerrymandering \"reduces electoral competition\" and makes the House less responsive to shifts in the national vote. Cook Political Report data show swing seats fell from 124 after the 2002 redistricting to 99 after 2012, and by 2022 NPR counted roughly 30 of 435 seats as traditional swing seats. Only 27 districts were toss-ups in 2024, and turnout runs higher in competitive and commission-drawn districts.",
      crux: {
        id: "competition-cause",
        title: "Lines or Sorting?",
        question:
          "Do gerrymandered maps, more than where voters live, explain the loss of competitive seats and rising polarization?",
        description:
          "Both sides accept that swing seats have fallen and the House has polarized. One side traces much of it to safe seats drawn on purpose; the other to Americans clustering by party, which neutral maps cannot undo. The answer depends on how many competitive seats neutral maps would produce compared with enacted ones.",
        methodology:
          "For each state and cycle since 2000, compare the number of districts within five points in enacted maps with the number in simulated neutral maps on the same vote, and compare members' voting records in districts that changed from safe to competitive with those that did not.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Counts of districts within five points in enacted versus simulated neutral maps for each cycle since 2000, plus roll-call ideology of members whose districts became competitive versus those whose districts stayed safe.",
        },
        cost_to_verify:
          "Election returns and simulation tools are public; the analysis is a research project, not a new data collection.",
        falsification: {
          supporter_flip:
            "If neutral maps produced almost no more competitive districts than enacted ones, and members from newly competitive districts voted no less partisan, the claim that gerrymanders drive a worse Congress would fail.",
          skeptic_flip:
            "If neutral maps produced many more competitive districts and members from those districts voted measurably less partisan, the sorting explanation would no longer cover the gap.",
          common_ground:
            "Both sides agree that swing seats are far fewer than in the late 1990s, that Americans increasingly live near people who vote like them, and that gerrymanders reduce competition somewhat.",
          live_disagreement:
            "How much of the loss of competition and the rise in polarization a ban on partisan maps would reverse.",
        },
      },
      evidence: [
        {
          id: "gerrymanders-cut-competition",
          title: "PNAS 2023: Partisan Gerrymanders Reduce Competition and Blunt Swings in the National Vote",
          description:
            "The same study that found gerrymanders mostly cancel nationally found that partisan gerrymandering \"reduces electoral competition\" and makes the partisan makeup of the House less responsive to shifts in the national vote.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Kenny, McCartan, Simko, Kuriwaki & Imai, 'Widespread Partisan Gerrymandering Mostly Cancels Nationally, but Reduces Electoral Competition', PNAS 120(25) (2023)",
          sourceUrl: "https://arxiv.org/abs/2208.06968v2",
          reasoning:
            "The harm reformers care most about, measured by researchers whose other finding cuts against them. The abstract does not say how many competitive seats gerrymanders removed, so the size of the effect is not stated here.",
        },
        {
          id: "swing-seats-shrink",
          title: "Swing Seats Fell From 124 After 2002 to About 30 in 2022",
          description:
            "Cook Political Report data counted 124 swing seats after the 2002 redistricting and 99 after 2012; by 2022 roughly 30 of 435 House seats were traditional swing seats, districts won by Biden or Trump within five points. Analyst Dave Wasserman said redistricting and voters' sorting \"feed off of each other and compound to absolutely eviscerate the number of swing seats.\"",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "NPR via High Plains Public Radio, 'U.S. House loses more swing in 2022' (May 29, 2022)",
          sourceUrl: "https://www.hppr.org/2022-05-29/u-s-house-loses-more-swing-in-2022",
          reasoning:
            "Documents the collapse of competition that both sides accept. The figures mix measures across years and do not separate line-drawing from sorting, so they show the problem's size, not its cause.",
        },
        {
          id: "turnout-competition",
          title: "Brennan Center 2025: Turnout Rises Where Districts Turn Competitive and Commissions Draw Them",
          description:
            "Using voter files in 21 states, Brennan Center researchers found turnout in newly competitive districts in 2022 of about 54% overall, under 50% where legislatures drew them and 56-57% where courts or commissions did. In consistently noncompetitive districts drawn by new commissions in Colorado and Michigan, turnout ran more than 10 points above the average. Only 27 of 435 House districts were toss-ups in 2024.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 5,
          },
          source: "Miller & Herzig, Brennan Center for Justice, 'The Turnout Effects of Redistricting Institutions' (October 28, 2025)",
          sourceUrl: "https://www.brennancenter.org/es/node/11923",
          reasoning:
            "Links who draws the lines to whether people vote. The Brennan Center advocates for commissions, and the comparison is correlational: states that adopt commissions may differ in other ways.",
        },
        {
          id: "no-polarization-link",
          title: "AJPS 2009: 'Very Little Evidence' That Gerrymandering Causes Polarization",
          description:
            "McCarty, Poole and Rosenthal found \"very little evidence\" that partisan gerrymandering causes congressional polarization. Simulated neutral districting produced polarization close to actual levels; polarization stems mainly from how differently Democrats and Republicans represent the same kinds of districts, not from which districts each party holds. Gerrymandering did raise Republicans' seat share, but the authors judged it a minor source of polarization.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "McCarty, Poole & Rosenthal, 'Does Gerrymandering Cause Polarization?', American Journal of Political Science 53(3), 666-680 (2009)",
          sourceUrl: "https://econpapers.repec.org/RePEc:wly:amposc:v:53:y:2009:i:3:p:666-680",
          reasoning:
            "The leading study of the polarization claim, by the creators of the standard measure of congressional ideology. It predates the 2010 and 2020 cycles and the mid-decade round.",
        },
        {
          id: "sorting-drove-decline",
          title: "2025 Study: Competitive Districts Fell by Over 25%, Mostly Because Voters Sorted",
          description:
            "Comparing enacted maps with ensembles of simulated plans that follow each state's legal criteria, the 2025 Imai-team study found that shifts in political geography and gerrymandering together reduced the number of highly competitive districts by over 25% between the 2010 and 2020 cycles, and that geographic polarization drove most of that decline.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Jasny, Kenny, McCartan, Simko, Wu, Zhao, Arora, Ebowe, O'Sullivan, Samarth & Imai, 'Gerrymandering and geographic polarization have reduced electoral competition', arXiv:2508.15885 (August 21, 2025)",
          sourceUrl: "https://arxiv.org/abs/2508.15885",
          reasoning:
            "Separates the two causes with a neutral baseline and finds sorting the bigger one, so a ban would restore only part of the lost competition. It confirms gerrymanders contributed, and it is a preprint.",
        },
      ],
    },
    {
      id: "who-draws-the-lines",
      title: "Do Commissions Draw Better Maps?",
      short_summary:
        "Studies across four decades find commission-drawn districts more competitive than legislature-drawn ones. Critics point to states where commissions changed little, deadlocked or were overridden by voters.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Commissions move the fight rather than ending it. FairVote's study of Arizona's House districts from 1984 to 2012 found no \"game changing or consistent increase\" in competition under commission maps. Virginia's bipartisan commission deadlocked in 2021, missed its deadlines and handed the job to the state supreme court. Ohio's commission adopted a 12-3 Republican-leaning map in 2025. And in November 2025 California's voters themselves suspended their celebrated commission's map so the legislature could draw one to target five Republican seats.",
      proponent_rebuttal:
        "The record across states is clear enough to act on. Matthew Nelson's study of House elections from 1982 to 2018 found independent commissions made competitive elections 2.25 times as likely as legislative maps and cut incumbent-party wins by 52%, while political commissions with legislators on them did no better than legislatures. In California, competitive districts rose from 5.2% in the decade before its commission to 14.6% after. Virginia and Ohio used commissions run by politicians, and California's override came only in response to Texas, which is why reformers want a national rule.",
      crux: {
        id: "commission-record",
        title: "The Commission Record",
        question:
          "Do independent commissions draw more competitive maps than legislatures, and hold up under partisan pressure?",
        description:
          "Cross-state studies find independent commissions linked to more competitive House races; critics point to single-state results that changed little and to commissions that deadlocked or were overridden. The answer depends on separating truly independent commissions from political ones and on comparing like states.",
        methodology:
          "Compare House races in states that switched to independent commissions with similar states that kept legislative maps, before and after the switch, separating independent from politician-run commissions and controlling for each state's geography with simulated neutral maps.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A before-and-after comparison of House races in states that adopted independent commissions (Arizona, California, Colorado, Michigan) against matched legislative states, benchmarked to simulated neutral maps, covering 2002-2024.",
        },
        cost_to_verify:
          "Election data are public; a matched study with neutral-map benchmarks is a few months of academic work.",
        falsification: {
          supporter_flip:
            "If matched comparisons found commission states gained no more competitive races than legislative states once geography was accounted for, the case that commissions fix the problem would weaken.",
          skeptic_flip:
            "If matched comparisons confirmed commissions produce substantially more competitive races, and independent commissions rarely deadlocked, the claim that they merely move the fight would be hard to sustain.",
          common_ground:
            "Both sides agree that commissions with politicians on them behave much like legislatures, and that geography limits how many competitive districts any map can draw.",
          live_disagreement:
            "Whether independent commissions reliably produce fairer, more competitive maps, or only in some states and only until one party decides to override them.",
        },
      },
      evidence: [
        {
          id: "commissions-competitive",
          title: "1982-2018: Independent Commissions Made Competitive House Races 2.25 Times as Likely",
          description:
            "Studying U.S. House elections from 1982 to 2018, Matthew Nelson found that, compared with legislative redistricting, independent commissions made competitive elections 2.25 times more likely and semi-competitive ones 3.01 times more likely, and cut incumbent-party wins by 52%. Political commissions did not differ significantly from legislatures; court-drawn districts were 1.51 times as likely to be competitive. In California, competitive districts rose from 5.2% in the decade before its commission to 14.6% after. Since the 2010 cycle, the incumbent party has won 94% of House elections.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Matthew Nelson, 'Independent Redistricting Commissions Are Associated with More Competitive Elections', PS: Political Science & Politics 56(2), 207-212 (April 2023)",
          sourceUrl:
            "https://www.cambridge.org/core/journals/ps-political-science-and-politics/article/independent-redistricting-commissions-are-associated-with-more-competitive-elections/00F260DCEB81B3BAC07D2A4ADBDA9CE0",
          reasoning:
            "A peer-reviewed cross-state study that separates independent from political commissions, the distinction critics' examples blur. It is an association; only a few states use independent commissions, and they may differ from others in ways the model cannot capture.",
        },
        {
          id: "arizona-no-clear-gain",
          title: "FairVote 2016: Arizona's Commission Brought No Consistent Rise in Competition",
          description:
            "FairVote's study of Arizona's U.S. House races from 1984 to 2012 found that \"neither of the two measures studied here point to a game changing or consistent increase\" in competition under court-adopted or commission-drawn maps. Safe seats fell after the 1992 court map, then rose again under the commission's 2004 map, with three-fifths of districts safe in 2012.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "Kelsey Kober, FairVote, 'Competition under Arizona's Independent Redistricting Commission' (November 8, 2016)",
          sourceUrl: "https://fairvote.org/arizona_independent_redistricting_2016/",
          reasoning:
            "A reform group finding that its own side's model state changed little, which adds credibility. It covers one small state and uses simple measures without a neutral-map baseline.",
        },
        {
          id: "virginia-deadlock",
          title: "2021: Virginia's Bipartisan Commission Deadlocked and Handed the Maps to the Court",
          description:
            "Virginia's new bipartisan redistricting commission missed its October 25, 2021 deadline after Democrats and Republicans deadlocked over competing proposals, then missed the final deadline for congressional districts, having already failed on state legislative maps. Responsibility passed to the Virginia Supreme Court, which hired two outside experts, one picked by each party, to draw maps for the judges.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 5,
          },
          source: "Democracy Docket, 'Virginia Commission Fails To Meet Congressional Deadline' (November 9, 2021)",
          sourceUrl: "https://www.democracydocket.com/news-alerts/virginia-commission-fails-to-meet-congressional-deadline/",
          reasoning:
            "Shows a commission can fail outright. Virginia's commission included legislators, the kind Nelson finds performs like a legislature, and its failure produced a court-drawn map, which other studies rate as fairly competitive.",
        },
        {
          id: "ohio-commission-map",
          title: "2025: Ohio's Redistricting Commission Unanimously Adopted a 12-3 Republican-Leaning Map",
          description:
            "Ohio's redistricting commission adopted a congressional map unanimously in 2025 that NCSL listed as worth up to two more seats for Republicans, with the delegation projected to move from 10-5 to 12-3, in place for six years.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "National Conference of State Legislatures, 'Where things stand now as redistricting scrambles the midterm elections' (June 1, 2026, from Stateline, May 18, 2026)",
          sourceUrl:
            "https://www.ncsl.org/news/details/where-things-stand-now-as-redistricting-scrambles-the-midterm-elections",
          reasoning:
            "Shows a body called a commission producing a partisan map. Ohio's commission is made up of elected officials, so it tests politician-run commissions, not independent ones.",
        },
      ],
    },
    {
      id: "disarm-alone",
      title: "Disarm Alone, or Only Together?",
      short_summary:
        "Most voters dislike mid-decade redraws, and the Supreme Court has left the fix to Congress and the states. Supporters of answering in kind say one-sided restraint just hands seats to the party that keeps gerrymandering.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Restraint by one side is surrender. When Texas redrew at the President's urging, California's voters approved Proposition 50 to suspend their own commission's map and target five Republican seats in reply; in Barack Obama's words for the campaign, \"Republicans want to steal enough seats in Congress to rig the next election.\" Gov. Gavin Newsom urged Virginia, Maryland, New York, Illinois and Colorado to follow. A state that bans partisan maps while its rivals keep them hands the other party seats, so restraint makes sense only if everyone is bound at once.",
      proponent_rebuttal:
        "That is the case for a national ban, not against one. In Rucho v. Common Cause in 2019 the Supreme Court held that partisan gerrymandering claims \"present political questions beyond the reach of the federal courts,\" but it said \"the avenue for reform established by the Framers, and used by Congress in the past, remains open.\" Voters across parties want it used: 60% opposed mid-decade redistricting in a September 2025 poll, and 60% of Trump voters backed a congressional ban. Rep. Kevin Kiley's bill, H.R. 4889, would bar mid-decade redraws nationwide; as he put it, \"fighting fire with fire burns everything down.\"",
      crux: {
        id: "fair-play-between-rivals",
        title: "Fair Play Between Rivals",
        question:
          "Should a state give up partisan maps while other states keep drawing them, or only under a national rule?",
        description:
          "Even with the seat counts known, one side holds that fair maps are owed to each state's voters whatever rivals do; the other that unilateral restraint rewards the party that keeps gerrymandering, so a state should answer in kind until a national rule binds all. The evidence informs the weighing but does not decide it.",
        methodology:
          "Measure the seats each party gained from partisan maps, how voters in each state judged retaliatory redraws, and whether retaliation produced pressure for a national rule. Then the reader weighs fairness to each state's voters against fairness between the parties.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Seat effects, public opinion and the path of national legislation can be measured; whether a state owes its voters fair maps regardless of what rival states do is a judgment about fair play that no measurement settles.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "The trade-offs can be measured, but no study budget settles the value judgment.",
        falsification: {
          supporter_flip:
            "If retaliation such as Proposition 50 led to a national ban faster than unilateral restraint did, some reformers would have to grant that answering in kind can serve the goal of fair maps.",
          skeptic_flip:
            "If tit-for-tat redraws kept spreading with no national rule in sight, and the net seat effect stayed small, the case for retaliation as a path to fair maps would weaken.",
          common_ground:
            "Both sides agree that federal courts will not police partisan maps, that Congress has the power to set rules for congressional districts, and that a binding rule for every state would be fairer than a patchwork.",
          live_disagreement:
            "Whether a state owes its own voters fair maps regardless of rivals, or should fight with the same weapon until a national rule binds both parties.",
        },
      },
      evidence: [
        {
          id: "rucho-leaves-it-to-congress",
          title: "Rucho, 2019: Federal Courts Cannot Police Partisan Gerrymanders; Congress Can Act",
          description:
            "In Rucho v. Common Cause, decided 5-4 on June 27, 2019, Chief Justice Roberts wrote, \"We conclude that partisan gerrymandering claims present political questions beyond the reach of the federal courts.\" The majority noted that states were acting through constitutional amendments, legislation and commissions, and that \"the avenue for reform established by the Framers, and used by Congress in the past, remains open.\" Justice Kagan wrote in dissent: \"For the first time ever, this Court refuses to remedy a constitutional violation.\"",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Rucho v. Common Cause, No. 18-422 (U.S. June 27, 2019), via Legal Information Institute",
          sourceUrl: "https://www.law.cornell.edu/supremecourt/text/18-422",
          reasoning:
            "Settles that only legislatures, state courts or voters can limit partisan maps, which is why reformers turn to Congress. It does not say whether a ban is wise; the majority held only that federal courts cannot judge it.",
        },
        {
          id: "voters-oppose-redraws",
          title: "September 2025 Poll: 60% Oppose Mid-Decade Redistricting, Including 51% of Republicans",
          description:
            "A Noble Predictive Insights poll of more than 2,000 registered voters for Common Cause, fielded August 26 to September 2, 2025, found 51% of Republicans, 70% of Democrats and 60% of independents opposed allowing parties to engage in mid-decade redistricting, and that 60% of 2024 Trump voters supported Congress banning it.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 5,
            directness: 4,
          },
          source: "Common Cause, poll by Noble Predictive Insights (September 9, 2025)",
          sourceUrl: "https://www.commoncause.org/?p=48052",
          reasoning:
            "Shows cross-party distaste for the redraws. It was commissioned by a group that campaigns against gerrymandering, and voters' dislike of a practice does not settle whether one side should give it up first.",
        },
        {
          id: "national-ban-bill",
          title: "H.R. 4889: A Bill to Bar Mid-Decade Redistricting Nationwide",
          description:
            "In August 2025 Rep. Kevin Kiley of California introduced H.R. 4889, which would bar mid-decade redistricting nationwide and void new maps states adopted after the November 2024 election, keeping current maps in place. \"A nationwide redistricting war is not what our country needs,\" Kiley said. Opposing Proposition 50 that November, he said \"fighting fire with fire burns everything down.\"",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 4,
            directness: 5,
          },
          source: "Office of Rep. Kevin Kiley, 'Rep. Kiley Calls on House Leadership to Vote on Redistricting Bill' (August 8, 2025); CBS Sacramento (November 5, 2025)",
          sourceUrl: "https://kiley.house.gov/posts/rep-kiley-calls-on-house-leadership-to-vote-on-redistricting-bill",
          reasoning:
            "Shows a national rule is a live, cross-party proposal rather than a one-party demand. Kiley's own seat was a target of California's redraw, and the bill would lock in maps drawn before 2025, gerrymandered or not.",
        },
        {
          id: "prop-50-answer",
          title: "November 2025: California Voters Suspended Their Commission's Map to Answer Texas",
          description:
            "California voters approved Proposition 50 on November 4, 2025, suspending the House maps drawn by the state's independent commission and replacing them with districts drawn by the Democratic legislature for 2026, 2028 and 2030, which could gain Democrats as many as five seats to offset Texas's five. In an ad for the measure, Barack Obama said \"Republicans want to steal enough seats in Congress to rig the next election\"; Arnold Schwarzenegger, opposing it, said it would \"take the power away from the people.\"",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "PBS News, 'California approves new Democratic-backed congressional map' (November 2025)",
          sourceUrl: "https://www.pbs.org/newshour/politics/california-approves-new-democratic-backed-congressional-map",
          reasoning:
            "The clearest evidence that voters in a reform state will choose retaliation when the other side gerrymanders, which is the heart of the case against one-sided restraint. It also shows how quickly a commission's protection can be suspended.",
        },
        {
          id: "newsom-urges-others",
          title: "Newsom After Prop 50: Other Democratic States Should Follow California",
          description:
            "On election night Gov. Gavin Newsom said \"It was not just a victory tonight for the Democratic Party\" and called on Virginia, Maryland, New York, Illinois and Colorado to follow California's lead. Opponent Charles Munger Jr. said: \"For what looms for the people of California, I am saddened by the passage of Proposition 50.\"",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 4,
            directness: 4,
          },
          source: "CBS Sacramento, 'California Prop 50 results' (November 5, 2025)",
          sourceUrl: "https://www.cbsnews.com/sacramento/news/california-prop-50-results-2025/",
          reasoning:
            "States the answer-in-kind strategy from its leading advocate. Virginia's attempt was later voided by its supreme court and Maryland put its plan to voters, so the call shows the strategy, not its success.",
        },
      ],
    },
  ],
  references: [
    {
      title: "NBC News: Where the redistricting fight stands heading into the midterms (June 3, 2026)",
      url: "https://www.nbcnews.com/politics/2026-election/house-redistricting-gop-democrats-2026-midterm-elections-rcna348110",
    },
    {
      title: "SCOTUSblog: Supreme Court grants request to prevent Missouri from using congressional map (September 10, 2026)",
      url: "https://www.scotusblog.com/2026/09/supreme-court-grants-request-to-prevent-missouri-from-using-congressional-map-expected-to-aid-re/",
    },
    {
      title: "Voting Rights Lab: An Emerging Trend, Mid-Decade Redistricting (August 19, 2026)",
      url: "https://votingrightslab.org/2026/08/19/an-emerging-trend-mid-decade-redistricting/",
    },
  ],
};
