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
        "Australia's mandatory voting pushes turnout above 90% — up roughly 32 points, from 59.4% in 1922 to 91.4% in 1925. The question is whether those additional voters improve representation or dilute it.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Compelling abstainers to the booth draws in the least interested and least informed citizens, whose ballots — as Selb and Lachat find — track their own stated preferences less consistently, so 'equal turnout' need not mean equal representation. Add donkey votes (ranking candidates in ballot order) and resentment, and forced participation can add noise rather than signal. There is also a liberty claim: the freedom to vote should include the freedom to decline, and a non-vote can itself be a deliberate political statement.",
      proponent_rebuttal:
        "Australia sustains 90%+ turnout versus roughly 60% in the US. When everyone must vote, campaigns cannot win by suppressing the other side's turnout, so they have to court the whole electorate — including lower-propensity, working-class voters whose preferences are otherwise underweighted. Fowler's quasi-experimental study of Australia's staggered roll-out found exactly such a redistributive shift (higher Labor vote and pension spending), not a move toward bland centrism. The 'uninformed voter' worry is also partly paternalistic: every citizen lives under the policy that results, whatever their prior level of engagement.",
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
            "Australia introduced compulsory voting federally via the Commonwealth Electoral Act 1924. Turnout jumped from 59.4% at the 1922 election to 91.4% in 1925 and has not fallen below ~90% since, averaging around 95% for much of the 20th century — far above turnout in comparable voluntary systems.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Australian Electoral Commission, 'Compulsory voting in Australia'",
          sourceUrl: "https://www.aec.gov.au/about_aec/publications/voting/",
          reasoning:
            "Official government data with decades of consistency; the 1922-to-1925 jump (59.4% to 91.4%) is well documented. High directness for the turnout claim but less direct for representation quality.",
        },
        {
          id: "mv-uninformed-voters",
          title: "Uninformed Voter Behavior Studies",
          description:
            "Selb & Lachat (2009) find that compulsory voting draws in less interested and less informed citizens whose party choices are less consistent with their own stated preferences, and that compulsory voting does not raise overall political knowledge. The 'donkey vote' (ranking candidates top-to-bottom in ballot order) is separately estimated at roughly 1-2% of formal ballots in Australia.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Selb & Lachat, 'The more, the better? Counterfactual evidence on the effect of compulsory voting on the consistency of party choice', European Journal of Political Research 48(5), 2009",
          sourceUrl:
            "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1475-6765.2009.01834.x",
          reasoning:
            "Peer-reviewed but based on counterfactual modelling of Belgian survey data, so the magnitude is contested. The paper supports the 'less consistent vote' claim more directly than a generic 'random voting' or knowledge-test framing; directness de-inflated accordingly. The separate donkey-vote figure (~1-2%) comes from Australian electoral commentary, not this paper.",
        },
        {
          id: "mv-oecd-democracy",
          title: "Democracy Index Comparisons",
          description:
            "Several countries with enforced compulsory voting — including Australia, Uruguay and (historically) Belgium — are classified as 'full democracies' near the top of the Economist Intelligence Unit Democracy Index, indicating that compelled turnout is at least compatible with high-quality democracy.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source: "Economist Intelligence Unit, Democracy Index; International IDEA compulsory voting data",
          sourceUrl:
            "https://www.idea.int/data-tools/data/voter-turnout-database/compulsory-voting",
          reasoning:
            "There is no 'OECD Democracy Index'; the relevant index is the Economist Intelligence Unit's, corrected here. Compulsory-voting countries do rank highly, but this is a correlation across very different polities and the index measures many factors beyond voting rules, so directness is low.",
        },
        {
          id: "mv-policy-moderation",
          title: "Compulsory Voting and Policy Consequences Study",
          description:
            "Fowler (2013), exploiting the staggered roll-out of compulsory voting across Australian states, estimates it raised turnout by ~24 points and increased the Labor Party's vote and seat shares by 7-10 points, with associated increases in pension spending. This implies compulsory voting shifted outcomes toward lower-turnout (working-class) preferences, not necessarily toward the center.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Anthony Fowler, 'Electoral and Policy Consequences of Voter Turnout: Evidence from Compulsory Voting in Australia', Quarterly Journal of Political Science 8(2), 2013",
          sourceUrl: "https://www.nowpublishers.com/article/Details/QJPS-12055",
          reasoning:
            "Corrected the journal (Quarterly Journal of Political Science, not Journal of Politics) and the substance: Fowler finds a partisan/distributive shift toward Labor and higher pension spending, not 'more centrist platforms', so the original 'policy moderation' framing was a misreading. Plausible quasi-experimental design, but observational and Australia-specific.",
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
        "A flat penalty is regressive: the same $20 notice (or $330 court fine) bites a low-income non-voter far harder than a wealthy one, so the cost of compulsion falls unevenly. And forcing attendance treats a symptom, not the disease — disengagement is driven by uncompetitive seats, weak candidates and a system many voters feel is captured. Mandating turnout can mask that rot behind a healthy-looking participation figure rather than fixing it.",
      proponent_rebuttal:
        "Australia's first-line fine is ~$20, escalating to a court-imposed maximum of $330 — modest enforcement paired with near-universal compliance. The US, a voluntary-voting system, also saw by far the largest rise in affective polarization among twelve OECD democracies (Boxell, Gentzkow & Shapiro), which is at least suggestive — though not proof — that universal turnout may dampen the incentive to win by polarizing and suppressing rather than persuading.",
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
          title: "Australian Enforcement Penalty Data",
          description:
            "Australia's first-line penalty for an apparent failure to vote is a $20 administrative fee; non-payment can escalate to a court-imposed fine of up to $330 plus a possible conviction. Because the great majority of electors vote and most who do not provide a valid reason or pay the $20 notice, enforcement remains low-cost relative to the near-universal turnout it sustains.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Australian Electoral Commission, non-voter penalty notices and FAQs",
          sourceUrl: "https://www.aec.gov.au/faqs/post-election.htm",
          reasoning:
            "AEC sourcing confirms the $20 first-line penalty (and $330 court maximum). De-inflated the specific 'less per voter than the US', 'revenue offsets enforcement' and '94% compliance' claims, which were not verifiable from AEC sources; the verifiable point is the modest penalty schedule paired with high turnout.",
        },
        {
          id: "mv-polarization-comparison",
          title: "Political Polarization Comparison",
          description:
            "Boxell, Gentzkow & Shapiro track affective polarization across twelve OECD democracies over four decades and find the United States — a voluntary-voting system — had by far the largest increase, while several other countries saw flat or declining polarization. The study does not test compulsory voting as a cause, so it is only suggestive evidence that voting rules might dampen polarization.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 3,
          },
          source:
            "Levi Boxell, Matthew Gentzkow & Jesse M. Shapiro, 'Cross-Country Trends in Affective Polarization', NBER Working Paper 26669, 2020",
          sourceUrl: "https://www.nber.org/papers/w26669",
          reasoning:
            "The paper robustly documents that US affective polarization rose most among 12 OECD countries, but it makes no claim about compulsory voting as the driver; directness de-inflated because the link from this finding to voting rules is inferential.",
        },
        {
          id: "mv-suppression-counterfactual",
          title: "Voter Suppression Counterfactual Analysis",
          description:
            "The Brennan Center documents that US voter-ID laws, voter-roll purges and polling-place closures depress turnout and fall disproportionately on voters of color. Proponents argue an enforced compulsory-voting regime, which puts the onus on the state to enable every elector to vote, would blunt these tactics.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 3,
          },
          source: "Brennan Center for Justice, voter suppression research",
          sourceUrl:
            "https://www.brennancenter.org/topics/voting-elections/voter-suppression",
          reasoning:
            "The Brennan Center documents suppression effects directionally, but I could not verify the specific '2-3% of eligible votes' figure as a Brennan Center estimate, so that number was removed and weights de-inflated. The counterfactual that compulsory voting would eliminate suppression is also advocacy-framed and context-dependent.",
        },
      ],
    },
  ],
};
