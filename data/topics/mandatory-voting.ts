export const mandatoryVotingData = {
  id: "mandatory-voting",
  title: "Mandatory Voting",
  question: "Should more democracies make voting compulsory?",
  meta_claim:
    "Compulsory voting, as practiced in Australia and other countries, produces more representative democracy and should be adopted more widely.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "When Australia made voting compulsory, turnout rose from 59.4% in 1922 to 91.4% in 1925 and has not fallen below about 90% since, against roughly 60% in the US. Its 'donkey vote', ballots numbered straight down the page, runs at roughly 1–2% of formal ballots. The fight is over whether those extra, less-engaged voters make policy more representative, and whether that is worth compelling them.",
    confidence: 85,
    source:
      "Australian Electoral Commission, 'Compulsory voting in Australia'; Selb & Lachat, European Journal of Political Research (2009)",
    sourceUrl:
      "https://www.aec.gov.au/about_aec/publications/voting/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that compulsory voting sharply raises turnout, that compelled voters are on average less engaged than habitual ones, and that a flat fine is somewhat regressive and does not fix deeper causes of disengagement such as uncompetitive seats.",
    "They split over whether the extra voters make policy more representative of the whole electorate or mostly add donkey votes and noise, and over whether those democratic gains are worth the enforcement cost and the lost freedom to abstain.",
    "The first is a question records like Australia's staggered rollout can test; the second is a weighing of values.",
  ],
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
        question:
          "Do the extra voters compulsion brings make policy more representative, or just add noise?",
        description:
          "Does higher turnout from compulsory voting actually produce more representative policy outcomes, or does it just inflate numbers?",
        methodology:
          "Compare policy responsiveness to median voter preferences in compulsory vs. voluntary voting countries, controlling for institutional differences.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Comparisons of how closely policy follows median-voter and lower-income preferences in compulsory and voluntary voting countries, controlling for institutions, alongside quasi-experiments like Australia's staggered rollout.",
        },
        cost_to_verify: "$500K (Cross-national comparative study)",
        falsification: {
          supporter_flip:
            "If careful comparisons showed compulsory-voting countries are no more responsive to median-voter or lower-income preferences than voluntary ones — the extra voters too uninformed to shift policy and 'donkey votes' adding only noise — the representation case for compulsion would collapse.",
          skeptic_flip:
            "If more studies of Australia's staggered rollout found the same policy shift toward lower-income voters, with more pension spending and a higher Labor vote, compelled votes would be hard to dismiss as pure noise.",
          common_ground:
            "Both sides agree compulsory voting dramatically raises raw turnout, and that compelled voters are on average less politically engaged than habitual ones.",
          live_disagreement:
            "Whether those additional, lower-engagement voters actually make policy more representative of the whole electorate, or merely inflate turnout figures while adding 'donkey votes' and noise.",
        },
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
        question:
          "Are compulsory voting's democratic benefits worth its enforcement cost and liberty trade-off?",
        description:
          "Does the administrative cost and civil liberty trade-off of compulsory voting justify the democratic gains?",
        methodology:
          "Compare per-voter election administration costs, enforcement costs, and democratic outcome metrics between compulsory and voluntary systems.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "Enforcement and administration costs per voter, and changes in polarization or responsiveness, can each be measured across compulsory and voluntary systems. Whether those gains are worth compelling people to vote is a weighing of liberty that no measurement supplies.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "$200K (Comparative administrative study)",
        falsification: {
          supporter_flip:
            "If the administrative and liberty costs of compelling turnout clearly outweighed the democratic gains — regressive fines biting the poor, little improvement in polarization or responsiveness — the practical case for adopting it would weaken even if it raises turnout.",
          skeptic_flip:
            "If enforcement data kept showing near-universal compliance from a modest first fine of about $20, and cross-country work tied voluntary voting to the steep rise in affective polarization seen in the US, the cost of compulsion would look small next to its gains.",
          common_ground:
            "Both sides agree a flat fine is somewhat regressive and that disengagement has deeper causes (uncompetitive seats, weak candidates) that compulsion alone doesn't fix.",
          live_disagreement:
            "Whether the modest enforcement cost and liberty trade-off are justified by the democratic benefits — which depends on contested estimates of how much compulsion actually improves representation and reduces polarization.",
        },
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
          id: "mv-ballot-order-effect",
          title: "Ballot position is worth about a percentage point in Australian elections",
          description:
            "King and Leigh, in Social Science Quarterly (2009), used every Australian federal election between 1984 and 2004 — 1,187 contests and 7,113 candidate-election observations — and estimated that being placed first on the ballot raises a candidate's primary vote share by about one percentage point. As a share of their total vote the effect is much larger for independents and minor parties than for the major parties.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "Social Science Quarterly (King & Leigh, 2009)",
          sourceUrl: "https://doi.org/10.1111/j.1540-6237.2009.00603.x",
          reasoning:
            "A large administrative sample with a clean source of randomisation, so the estimate itself is solid. It measures the size of the choice-independent component of the vote in a compulsory system, which is the mechanism the uninformed-voter objection points at; it does not compare that component against a voluntary-voting counterfactual, so it cannot show compulsion created it.",
        },
        {
          id: "mv-informal-vote-rate",
          title: "One in twenty Australian House ballots is informal",
          description:
            "Official Australian Electoral Commission results for the 2022 federal election record 802,337 informal ballots in the House of Representatives, 5.19% of the 15,461,379 votes cast. An informal ballot is one left blank, incorrectly numbered or otherwise unable to be admitted to the count.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "Australian Electoral Commission, 2022 federal election results, House informal votes by division",
          sourceUrl:
            "https://results.aec.gov.au/27966/Website/HouseInformalByDivision-27966-NAT.htm",
          reasoning:
            "This is the official count, not an estimate. It shows that a headline turnout above 90% is not the same as 90% of electors registering a usable preference: compulsion can be satisfied by attending and submitting a ballot that is not counted. It does not establish how much of the informal vote is deliberate rather than error, and informal votes also occur in voluntary systems, so it bounds the representation claim rather than refuting it.",
        },
      ],
    },
  ],
};
