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
            "A September 2024 Pew Research Center survey found that more than 63% of Americans prefer the president to be elected by whoever wins the most votes nationally. Support is split by party: 80% of Democrats and Democratic-leaning independents favor replacing the Electoral College, while only 43% of Republicans agree.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source: "Pew Research Center (September 2024)",
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
          source: "Federal Election Commission; certified election results",
          reasoning:
            "Indisputable factual record. Directness is high because this is exactly the scenario reform proponents want to prevent.",
        },
        {
          id: "federalism-protection",
          title: "Electoral College Protects Small-State Influence",
          description:
            "The Electoral College ensures every state has a minimum of 3 electoral votes regardless of population, giving smaller states proportionally greater influence. Without this, candidates would have no incentive to address issues specific to rural and low-population states. The system ensures the president must build a geographically diverse coalition rather than simply maximizing votes in a few mega-cities.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "American Bar Association; various constitutional law scholars",
          reasoning:
            "Theoretically sound but empirically questionable: under the current system, candidates already ignore 40+ states to focus on swing states. Small states like Wyoming and Vermont are not swing states and receive minimal attention.",
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
            "As of February 2025, the National Popular Vote Interstate Compact has been enacted by 17 states plus the District of Columbia, controlling 209 electoral votes. The compact will take effect when states controlling 270 electoral votes (a majority) have joined. All enacting states are Democratic-controlled.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 8,
          },
          source: "National Popular Vote Inc.; state legislative records",
          reasoning:
            "Factual progress that demonstrates political momentum. However, the remaining 61 EVs require states that are politically unlikely to join, making completion uncertain.",
        },
        {
          id: "partisan-adoption-concern",
          title: "Only Democratic States Have Joined the NPVIC",
          description:
            "Every state that has enacted the NPVIC is controlled by Democrats. No Republican-controlled legislature has passed the compact. This partisan pattern undermines the claim that the NPVIC is a nonpartisan reform and suggests it is motivated by Democrats' structural advantage in the national popular vote.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "CBS News analysis; Brennan Center for Justice",
          reasoning:
            "The partisan pattern is undeniable and undermines the reform's legitimacy. However, this may reflect rational self-interest rather than the policy's merits—Republicans benefited from the Electoral College in 2000 and 2016.",
        },
      ],
    },
  ],
};
