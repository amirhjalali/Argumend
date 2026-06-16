import type { Topic } from "@/lib/schemas/topic";

export const congressionalTermLimitsData = {
  id: "congressional-term-limits",
  title: "Congressional Term Limits",
  meta_claim:
    "Congressional term limits would improve American governance.",
  status: "contested" as const,
  category: "policy" as const,
  last_updated: "2026-06-16",
  tags: ["governance", "elections", "congress", "reform", "incumbency"],
  pillars: [
    {
      id: "incumbency-and-accountability",
      title: "Incumbency & Accountability",
      short_summary:
        "Congressional incumbents win re-election roughly 90%+ of the time, and term limits are meant to break that entrenchment and force regular turnover.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Elections are supposed to be the term limit. House incumbents win re-election above 90% in most cycles and almost never below 85%, which proponents read as a captured system where name recognition, fundraising advantage, and gerrymandered districts shield careerists from accountability. Hard caps would guarantee regular turnover, open seats, and fresh competition that voters demonstrably want but cannot reliably produce at the ballot box.",
      proponent_rebuttal:
        "High re-election rates can reflect satisfied constituents and the natural advantage of competent, experienced representatives rather than a rigged system — and term limits do not actually fix the underlying drivers. Studies of term-limited state legislatures find that open-seat races were not consistently more competitive after limits than before, and that limits 'have virtually no effect on the types of people elected to office' by demographics or ideology. Capping terms removes good and bad legislators alike, including the ones voters explicitly want to keep, substituting a blunt rule for voter choice.",
      crux: {
        id: "competition-after-limits",
        title: "Did Open Seats Become More Competitive?",
        description:
          "If term limits improve governance through accountability, the open seats they create should produce measurably more competitive elections and meaningfully different (e.g. more diverse, less entrenched) winners than the incumbent-held seats they replace.",
        methodology:
          "Use the natural experiment of the 15 states that adopted legislative term limits since the 1990s. Compare margins of victory, number of candidates, and winner characteristics in open seats created by term limits vs. comparable open and incumbent seats in non-term-limited control states, before and after limits took effect (difference-in-differences).",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (existing election-returns data analysis)",
      },
      evidence: [
        {
          id: "incumbent-reelection-rates",
          title: "House Incumbents Win Re-election ~90%+",
          description:
            "Compiled federal election returns show U.S. House incumbents who seek re-election win in roughly 90-98% of cycles, and the House rate has not fallen below ~85% in decades; Senate rates are typically high but more variable. Proponents cite this as entrenchment that term limits would directly break.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "OpenSecrets, 'Reelection Rates Over the Years' (aggregated from federal election returns)",
          sourceUrl:
            "https://www.opensecrets.org/elections-overview/reelection-rates",
          reasoning:
            "The underlying re-election numbers are well-established, transparently sourced from official returns, and easily replicated. Directness is moderate: high re-election rates document entrenchment but do not by themselves show term limits would improve governance — that inference is contested.",
        },
        {
          id: "public-support-gallup",
          title: "About 75% of Americans Would Vote for Term Limits",
          description:
            "A Gallup poll (Jan 2013, n=1,013 adults, ±4 points) found 75% of Americans would vote for term limits for members of Congress, consistent with two-thirds-to-three-quarters support in Gallup's 1994-1996 surveys.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source: "Gallup, 'Americans Call for Term Limits, End to Electoral College' (2013)",
          sourceUrl:
            "https://news.gallup.com/poll/159881/americans-call-term-limits-end-electoral-college.aspx",
          reasoning:
            "Reputable independent pollster with disclosed methodology and a long consistent time series. Low directness: broad popularity is a reason to act democratically but is not evidence that the policy actually improves governance outcomes.",
        },
        {
          id: "ustl-mclaughlin-poll",
          title: "Advocacy Poll: 83% Support Term Limits",
          description:
            "A McLaughlin & Associates poll (Jan 27, 2025, n=1,000 voters) commissioned by the advocacy group U.S. Term Limits found 83% support for congressional term limits, with majorities across Democrats (79%), Republicans (85%) and independents (85%).",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 2,
            replicability: 5,
            directness: 4,
          },
          source:
            "McLaughlin & Associates poll commissioned by U.S. Term Limits (USTL), Jan 2025",
          sourceUrl:
            "https://termlimits.com/new-poll-83-of-americans-support-term-limits-for-congress/",
          reasoning:
            "Directly commissioned and published by the leading pro-term-limits advocacy group, so independence is very low and the framing may inflate support. It corroborates Gallup's direction but adds little independent weight; like all polling it speaks to popularity, not governance outcomes.",
        },
        {
          id: "term-limits-no-diversity-gain",
          title: "Term Limits Did Not Increase Legislative Diversity",
          description:
            "A Rutgers CAWP study (Carroll & Jenkins, 2005) found term limits did not produce consistent gains in the representation of women or minorities; in 1998 and 2000 more women were forced out by limits than were elected to the vacated seats, and most departing women's seats went to men.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Carroll & Jenkins, 'Increasing Diversity or More of the Same? Term Limits and the Representation of Women, Minorities, and Minority Women in State Legislatures,' Center for American Women and Politics, Rutgers (2005)",
          sourceUrl:
            "https://cawp.rutgers.edu/research-and-scholarship/increasing-diversity-or-more-same-term-limits-and-representation-women",
          reasoning:
            "Rigorous comparative analysis from a non-partisan academic research center directly testing a core proponent promise (more diverse representation) and finding it unmet. Counts against the claim by undercutting an expected governance benefit.",
        },
      ],
    },
    {
      id: "expertise-and-power-balance",
      title: "Expertise & Power Balance",
      short_summary:
        "Term limits force out experienced legislators, and state-level evidence shows the lost institutional knowledge shifts power to governors, bureaucrats, and lobbyists.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Career legislators accumulate not just policy expertise but also entanglements — donors, lobbyists, and a personal stake in the status quo. Forcing regular turnover, proponents argue, dilutes those captured relationships, brings in citizens closer to ordinary life, and prevents the build-up of unaccountable seniority-based power. A legislature of relative newcomers is harder for any single interest to permanently own.",
      proponent_rebuttal:
        "The best natural experiment — 15 states that adopted legislative term limits — points the opposite way. The multi-organization Joint Project on Term Limits found the most significant effect was a decline in the legislature's power relative to the governor and executive agencies, with legislative adjustments to governors' budgets falling significantly. Inexperienced members rely more on the very actors term limits were meant to weaken: lobbyists and career staff who hold the institutional knowledge. Removing experience does not remove influence — it relocates it to unelected hands.",
      crux: {
        id: "where-power-goes",
        title: "Who Gains Power When Legislators Lose Tenure?",
        description:
          "The load-bearing disagreement: does forced turnover empower citizen-legislators and weaken entrenched interests, or does it hollow out legislative capacity and hand power to governors, agencies, and lobbyists who outlast every term-limited member?",
        methodology:
          "Compare term-limited and non-term-limited state legislatures on measurable power indicators: share of governors' proposed budgets altered by the legislature, committee-chair experience, and survey-measured lobbyist and executive-branch influence — tracked before and after limits using case studies and 50-state surveys.",
        verification_status: "verified" as const,
        cost_to_verify: "$0-$200K (existing JPTL surveys + budget-data analysis)",
      },
      evidence: [
        {
          id: "carey-niemi-powell-burkean",
          title: "50-State Survey: 'Burkean Shift' Toward Governor, Not Constituents",
          description:
            "A 2002 survey of 2,982 legislators in all 50 states (Carey, Niemi, Powell & Moncrief, 2006) found term limits had virtually no effect on who is elected but produced a 'Burkean shift' — term-limited members grew less beholden to their districts — and shifted power toward governors and away from legislative leaders.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Carey, Niemi, Powell & Moncrief, 'The Effects of Term Limits on State Legislatures: A New Survey of the 50 States,' Legislative Studies Quarterly 31(1), 2006",
          sourceUrl: "https://scholarworks.boisestate.edu/polsci_facpubs/82/",
          reasoning:
            "Peer-reviewed, the only 50-state legislator survey of its kind, by leading scholars. Directly tests proponent promises (better representation, different legislators) and finds limits weaken the constituency link and shift power to the executive — strong evidence against improved governance.",
        },
        {
          id: "jptl-power-to-executive-lobbyists",
          title: "Joint Project: Power Shifts to Executive and Lobbyists",
          description:
            "The Joint Project on Term Limits (NCSL, CSG, and the State Legislative Leaders Foundation, 2006) concluded that 'perhaps the most significant effect' of term limits is declining legislative power relative to the executive — legislative adjustments to governors' budgets fell significantly in four studied states — and that inexperienced members rely more on lobbyists and staff for policy information.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Bowser, Chi & Little, 'Coping with Term Limits: A Practical Guide,' Joint Project on Term Limits, National Conference of State Legislatures (2006)",
          sourceUrl:
            "https://house.louisiana.gov/H_Reps/TermsCmteDocs/NCSL-term%20limits%20final.pdf",
          reasoning:
            "A three-year, multi-organization study drawing on two major surveys, interviews with hundreds of legislators, and nine-state case data. Authoring bodies represent legislatures (a possible institutional interest), so independence is moderate, but the case-study budget findings are concrete and directly on point.",
        },
        {
          id: "olson-rogowski-polarization",
          title: "Term Limits Increased Polarization in State Legislatures",
          description:
            "Olson & Rogowski (2020), using panel data on roll-call voting from 1993-2016, found that term limits produced systematically higher polarization — a wider ideological gap between Republican and Democratic voting records — contrary to advocates' claim that limits would reduce partisan conflict.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Olson & Rogowski, 'Legislative Term Limits and Polarization,' The Journal of Politics 82(2), 2020, pp. 572-586",
          sourceUrl: "https://www.journals.uchicago.edu/doi/10.1086/706764",
          reasoning:
            "Peer-reviewed study in a top journal using large-scale roll-call panel data with replication archive. Directly rebuts a central governance benefit proponents claim (reduced partisanship) and finds the reverse, with transparent and reproducible methods.",
        },
      ],
    },
    {
      id: "constitutional-feasibility",
      title: "Constitutional Feasibility",
      short_summary:
        "The Supreme Court held in 1995 that congressional term limits require a federal constitutional amendment — states cannot impose them by statute.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Even granting the legal hurdle, proponents argue the path is clear: a constitutional amendment under Article V, which the founders provided precisely for popular structural reforms. Overwhelming, bipartisan public support (consistently two-thirds to four-fifths in polling) is exactly the kind of mandate the amendment process is meant to channel, and an Article V convention or congressional proposal could deliver durable, uniform limits.",
      proponent_rebuttal:
        "The bar is far higher than popularity suggests. In U.S. Term Limits v. Thornton (1995), the Supreme Court held 5-4 that neither states nor Congress may add qualifications beyond those in Article I, so limits cannot be enacted by ordinary law — only by a constitutional amendment requiring two-thirds of both houses (the very members who would be limited) or an unprecedented Article V convention, then ratification by 38 states. No amendment has cleared that bar since 1992, and self-limitation by incumbents is a steep collective-action problem regardless of public opinion.",
      crux: {
        id: "amendment-pathway",
        title: "Is There a Realistic Path to Enactment?",
        description:
          "Because Thornton forecloses statutory term limits, the claim that they 'would improve governance' is partly counterfactual unless an enactment path exists. The crux is whether the Article V process can plausibly deliver congressional term limits given that the gatekeepers are the officials being limited.",
        methodology:
          "Read the controlling holding in U.S. Term Limits v. Thornton (514 U.S. 779) to confirm the amendment requirement, then assess the Article V record: count term-limit amendment resolutions introduced in Congress and the number of states with live Article V convention applications, against the two-thirds/38-state thresholds.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (court opinion + congressional and state records)",
      },
      evidence: [
        {
          id: "thornton-holding",
          title: "Supreme Court: Term Limits Need a Constitutional Amendment",
          description:
            "In U.S. Term Limits, Inc. v. Thornton (1995), the Supreme Court held 5-4 that states cannot impose qualifications for Congress stricter than those in the Constitution; Justice Stevens wrote that a constitutional amendment is the only permissible way to add such qualifications, striking down 23 states' congressional term-limit measures.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source:
            "U.S. Term Limits, Inc. v. Thornton, 514 U.S. 779 (1995), U.S. Supreme Court",
          sourceUrl: "https://supreme.justia.com/cases/federal/us/514/779/",
          reasoning:
            "The controlling, verifiable primary legal authority. It does not say limits would worsen governance; rather it raises the feasibility cost so high that 'would improve governance' becomes largely hypothetical absent a constitutional amendment — a real strike against the practical claim.",
        },
      ],
    },
  ],
};
