import type { Topic } from "@/lib/schemas/topic";

export const electoralCollegeReformData = {
  id: "electoral-college-reform",
  title: "Electoral College Reform",
  meta_claim:
    "The Electoral College should be replaced with a national popular vote for electing the President of the United States.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "democratic-legitimacy",
      title: "Democratic Legitimacy",
      short_summary:
        "A Wyoming voter has 3.6x the Electoral College weight of a California voter. Two of the last six presidents lost the popular vote.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The Electoral College protects federalism and ensures small states have meaningful influence. It forces candidates to build geographically broad coalitions. A pure popular vote would concentrate campaigns in major cities and ignore rural America. The Founders deliberately rejected direct democracy because they feared tyranny of the majority.",
      proponent_rebuttal:
        "Under the Electoral College, candidates already ignore 40+ states to focus on 5-7 swing states. Wyoming voters have 3.6x the electoral weight of California voters. In 2000 and 2016, the popular vote winner lost the presidency—outcomes most democracies would consider illegitimate. A 2024 Pew Research survey found 63% of Americans favor replacing the Electoral College with a popular vote.",
      crux: {
        id: "npvic-enactment",
        title: "National Popular Vote Interstate Compact Reaching 270 EVs",
        description:
          "The NPVIC needs states totaling 270 electoral votes to take effect. It currently has 209. Red states have zero incentive to sign on.",
        methodology:
          "Track state-level NPVIC legislation. Analyze political feasibility in remaining states needed to reach 270 EVs. Model legal challenges that would follow enactment.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Monitor state legislative actions)",
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
            "In both 2000 and 2016, the candidate who received more total votes from American citizens lost the presidency. George W. Bush lost the popular vote to Al Gore by 543,895 votes, and Donald Trump lost to Hillary Clinton by 2,868,686 votes. No other established democracy regularly installs leaders who received fewer votes than their opponents.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 9,
          },
          source:
            "Certified election results (compiled by Wikipedia, \"List of United States presidential elections in which the winner lost the popular vote\")",
          sourceUrl:
            "https://en.wikipedia.org/wiki/List_of_United_States_presidential_elections_in_which_the_winner_lost_the_popular_vote",
          reasoning:
            "Indisputable factual record—Gore led Bush by 543,895 votes in 2000 and Clinton led Trump by 2,868,686 votes in 2016. Directness is high because this is exactly the scenario reform proponents want to prevent.",
        },
        {
          id: "federalism-protection",
          title: "Electoral College Protects Small-State Influence",
          description:
            "The Electoral College ensures every state has a minimum of 3 electoral votes regardless of population, giving smaller states proportionally greater influence. Without this, candidates would have no incentive to address issues specific to rural and low-population states. The system ensures the president must build a geographically diverse coalition rather than simply maximizing votes in a few mega-cities.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source:
            "National Archives, \"About the Electors\" (documents the minimum of 3 electoral votes per state); argument is a common pro–Electoral College interpretation rather than a sourced empirical finding",
          sourceUrl: "https://www.archives.gov/electoral-college/about",
          reasoning:
            "The factual mechanism is confirmed by the National Archives: every state gets at least 3 electoral votes (one per senator plus one per representative), so low-population states are overrepresented relative to population. The downstream claim that this protects small-state influence is interpretive and empirically questionable—under the current system candidates already concentrate on a handful of swing states, and small states like Wyoming and Vermont are not swing states and receive minimal attention. (Note: the previously cited American Bar Association does not endorse this argument; the ABA has historically criticized the Electoral College as archaic.) Weights lowered accordingly.",
        },
      ],
    },
    {
      id: "npvic-feasibility",
      title: "National Popular Vote Interstate Compact",
      short_summary:
        "The National Popular Vote Interstate Compact has 209 of the 270 electoral votes it needs. Legal scholars are split on whether it survives a Supreme Court challenge.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The NPVIC is constitutionally dubious: it effectively amends the Constitution through an interstate agreement rather than the Article V process. The Supreme Court could strike it down. All states that have joined are Democratic-controlled; no Republican legislature has signed on, making it a partisan project. If enacted, a state could withdraw when its preferred candidate wins the popular vote but would lose under the compact.",
      proponent_rebuttal:
        "The Constitution explicitly grants states the power to determine how their electors are chosen (Article II, Section 1). States already use winner-take-all by choice, not constitutional mandate—they could just as easily choose to allocate electors based on the national popular vote. As of February 2025, 17 states plus DC have joined the NPVIC, controlling 209 of the needed 270 electoral votes.",
      crux: {
        id: "scotus-constitutionality",
        title: "Supreme Court Ruling on NPVIC Constitutionality",
        description:
          "The Compact Clause may require Congressional approval for interstate agreements. The Supreme Court has never ruled on the NPVIC specifically.",
        methodology:
          "Track NPVIC enactment progress and any resulting legal challenges through federal courts to the Supreme Court.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Monitor legal proceedings if/when NPVIC activates)",
      },
      evidence: [
        {
          id: "npvic-progress",
          title: "NPVIC Has 209 of 270 Needed Electoral Votes",
          description:
            "As of 2026, the National Popular Vote Interstate Compact has been enacted by 18 states plus the District of Columbia, controlling 222 electoral votes (Virginia became the most recent to join, on April 13, 2026). The compact will take effect when states controlling 270 electoral votes (a majority of 538) have joined—an additional 48 are needed. Every state that has enacted it joined under a Democratic governor.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "National Popular Vote Inc.; Ballotpedia, \"National Popular Vote Interstate Compact\"",
          sourceUrl: "https://ballotpedia.org/National_Popular_Vote_Interstate_Compact",
          reasoning:
            "Factual progress that demonstrates political momentum. However, the remaining 48 EVs require states that are politically unlikely to join, making completion uncertain. (Note: the 209-EV/17-state figure was accurate in early 2025 but is now superseded by Virginia's 2026 accession.)",
        },
        {
          id: "partisan-adoption-concern",
          title: "Only Democratic States Have Joined the NPVIC",
          description:
            "Of the states that have enacted the NPVIC, every one joined under a Democratic governor, and none did so under a Republican state-government trifecta (per Ballotpedia, 15 enacting states had a Democratic trifecta and the rest had divided government at the time of adoption). No state with a Republican trifecta has enacted it. (Republican-led chambers have passed the compact in one chamber in a few states such as New York, Oklahoma, and Arizona, but no Republican governor has signed it into law.) This partisan pattern complicates the claim that the NPVIC is a fully nonpartisan reform.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Ballotpedia, \"National Popular Vote Interstate Compact\" (partisan-control analysis of member states)",
          sourceUrl: "https://ballotpedia.org/National_Popular_Vote_Interstate_Compact",
          reasoning:
            "The partisan pattern in enactment is real, but the original claim that 'no Republican legislature has passed the compact' overstated it—Republican-controlled chambers have passed it in one chamber in several states. This may reflect rational self-interest rather than the policy's merits: Republicans benefited from the Electoral College in 2000 and 2016. Weights modestly lowered to reflect the softened claim.",
        },
      ],
    },
  ],
};
