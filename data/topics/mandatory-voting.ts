import type { Topic } from "@/lib/schemas/topic";

export const mandatoryVotingData = {
  id: "mandatory-voting",
  title: "Mandatory Voting",
  meta_claim:
    "Compulsory voting, as practiced in Australia and other countries, produces more representative democracy and should be adopted more widely.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "democratic-representation",
      title: "Democratic Representation",
      short_summary:
        "Australia's mandatory voting pushes turnout above 90%. The question is whether that extra 40% of voters improves representation or dilutes it.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Forced participation creates uninformed voters, donkey voting, and resentment. Freedom includes the right NOT to vote. Voluntary participation signals genuine engagement — compulsion dilutes the quality of democratic input.",
      proponent_rebuttal:
        "Australia has 90%+ turnout vs. US 60%. Mandatory voting reduces the influence of extreme partisans, forces parties to appeal to the center rather than mobilize fringe bases, and makes voter suppression impossible. The 'uninformed voter' concern is paternalistic — all citizens are affected by policy regardless of engagement level.",
      crux: {
        id: "turnout-representation-link",
        title: "Turnout–Representation Correlation",
        description:
          "Does higher turnout from compulsory voting actually produce more representative policy outcomes, or does it just inflate numbers?",
        methodology:
          "Compare policy responsiveness to median voter preferences in compulsory vs. voluntary voting countries, controlling for institutional differences.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Cross-national comparative study)",
      },
      evidence: [
        {
          id: "mv-aus-turnout",
          title: "Australian Electoral Commission Turnout Data",
          description:
            "Australia consistently achieves 91-95% voter turnout since introducing compulsory voting in 1924, compared to 55-65% in comparable voluntary systems.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Australian Electoral Commission",
          reasoning:
            "Official government data with decades of consistency. High directness for turnout claim but less direct for representation quality.",
        },
        {
          id: "mv-uninformed-voters",
          title: "Uninformed Voter Behavior Studies",
          description:
            "Research shows compelled voters are more likely to cast random or donkey votes, and score lower on political knowledge tests than voluntary voters.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "Selb & Lachat, Electoral Studies 2009",
          reasoning:
            "Peer-reviewed but contested methodology. The 'donkey vote' effect is real but small (1-2% of ballots in Australia).",
        },
        {
          id: "mv-oecd-democracy",
          title: "OECD Democracy Index Comparisons",
          description:
            "Countries with compulsory voting score comparably or higher on democracy indices, suggesting forced turnout does not degrade democratic quality.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "OECD, Economist Intelligence Unit",
          reasoning:
            "Authoritative cross-national data, but democracy indices measure many factors beyond voting, reducing directness.",
        },
        {
          id: "mv-policy-moderation",
          title: "Compulsory Voting and Policy Moderation Studies",
          description:
            "Analysis of Australian and Belgian policy shows compulsory voting correlates with higher social spending and more centrist policy platforms.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Fowler, Journal of Politics 2013",
          reasoning:
            "Observational study with plausible causal mechanism, but confounders (political culture, institutions) are hard to isolate.",
        },
      ],
    },
    {
      id: "practical-implementation",
      title: "Practical Implementation",
      short_summary:
        "Compulsory voting treats a symptom. If citizens are disengaged, does forcing them into a booth fix the underlying problem?",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Enforcement is expensive and intrusive. Fines are regressive, hitting the poor hardest. Compulsory voting doesn't address root causes of disengagement — bad candidates, gerrymandering, and a captured political system. It's a Band-Aid on a structural wound.",
      proponent_rebuttal:
        "Australia's fine is ~$20 — minimal enforcement cost with near-universal compliance. Countries with compulsory voting have lower political polarization and higher civic engagement beyond just elections. When everyone votes, politicians must earn broad support rather than suppress opposition turnout.",
      crux: {
        id: "enforcement-cost-benefit",
        title: "Enforcement Cost–Benefit Analysis",
        description:
          "Does the administrative cost and civil liberty trade-off of compulsory voting justify the democratic gains?",
        methodology:
          "Compare per-voter election administration costs, enforcement costs, and democratic outcome metrics between compulsory and voluntary systems.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$200K (Comparative administrative study)",
      },
      evidence: [
        {
          id: "mv-aus-enforcement",
          title: "Australian Enforcement Cost Data",
          description:
            "Australia spends less per voter on election administration than the US, with fines generating revenue that partially offsets enforcement. Compliance is 94% without any enforcement action needed.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Australian Electoral Commission Annual Reports",
          reasoning:
            "Official data showing the system is self-sustaining. High compliance reduces enforcement burden.",
        },
        {
          id: "mv-polarization-comparison",
          title: "Political Polarization Comparison",
          description:
            "Countries with compulsory voting show lower levels of affective polarization and partisan hostility compared to voluntary systems like the US and UK.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Boxell, Gentzkow & Shapiro, NBER 2020",
          reasoning:
            "Cross-national polarization data is robust, but many factors beyond voting rules drive polarization.",
        },
        {
          id: "mv-suppression-counterfactual",
          title: "Voter Suppression Counterfactual Analysis",
          description:
            "Studies estimate that voter ID laws, purges, and polling place closures in the US suppress 2-3% of eligible votes disproportionately among minorities — a phenomenon that is structurally impossible under compulsory voting.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 4,
          },
          source: "Brennan Center for Justice",
          reasoning:
            "The suppression data supports the 'for' case, but the counterfactual framing — that compulsory voting would solve this — is speculative and context-dependent.",
        },
      ],
    },
  ],
};
