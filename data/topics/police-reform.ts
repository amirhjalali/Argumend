import type { Topic } from "@/lib/schemas/topic";

export const policeReformData = {
  id: "police-reform",
  title: "Policing Reform in America",
  meta_claim:
    "American policing requires fundamental structural reform — including significant reallocation of funding to social services — to improve public safety outcomes.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "use-of-force-accountability",
      title: "Use of Force & Accountability",
      short_summary:
        "U.S. police kill more than 1,200 people per year (1,329 recorded in 2023). Germany, with a quarter of the population, averages about 10. The gap demands explanation.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The vast majority of police interactions are lawful and professional, and fatal encounters are a tiny fraction of tens of millions of contacts each year. The largest body-camera RCTs (e.g. the ~2,200-officer Washington, DC trial) found no significant effect on use of force, so the marquee accountability fix is not clearly causal. International comparisons are confounded by uniquely high US civilian gun ownership, which raises the threat officers reasonably perceive. Officers face genuine life-threatening situations, and critics underestimate the split-second decisions required.",
      proponent_rebuttal:
        "US police kill more than 1,200 people annually (1,329 recorded in 2023) — far more than any peer nation per capita, and fewer than 3% of those killings result in an officer being charged. Qualified immunity effectively blocks accountability for misconduct. The single-site Rialto body-camera RCT found roughly a 50% reduction in use-of-force incidents; later larger trials found no significant effect, so the headline figure does not robustly generalize — but the persistent racial disparity (Black Americans about 2.8x more likely to be killed) and the near-total absence of charges point to a system that protects bad actors.",
      crux: {
        id: "accountability-use-of-force-link",
        title: "Accountability–Use of Force Causal Link",
        description:
          "Does increased accountability (body cameras, civilian oversight, qualified immunity reform) causally reduce police use of force without increasing officer risk?",
        methodology:
          "Randomized controlled trials of accountability interventions across jurisdictions, measuring use-of-force incidents, complaints, crime rates, and officer safety outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Multi-city randomized controlled trial)",
      },
      evidence: [
        {
          id: "pr-mapping-police-violence",
          title: "Mapping Police Violence Data",
          description:
            "US police killed more than 1,200 people in 2023 (Mapping Police Violence recorded 1,329, its highest annual count to date). Black people are about 2.8x more likely to be killed by police than white people, and fewer than 3% of police killings from 2013-2023 resulted in an officer being charged with a crime.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "Mapping Police Violence / Campaign Zero, 2023 Police Violence Report",
          sourceUrl: "https://policeviolencereport.org/2023/",
          reasoning:
            "Independent data aggregation (Campaign Zero) cross-referenced against official records and corroborated by the Washington Post Fatal Force and Guardian databases. Directly measures the phenomenon. The earlier draft's '1,096' and '98% not charged' figures were corrected to the report's published numbers (1,329 total / fewer than 3% charged); replicability lowered one point because non-official aggregations vary year to year.",
        },
        {
          id: "pr-body-camera-rct",
          title: "Body Camera RCT Results",
          description:
            "The Rialto, CA randomized controlled trial (Ariel, Farrar & Sutherland 2015) found roughly a 50% reduction in use-of-force incidents and an 88% reduction in citizen complaints on camera-equipped shifts. Larger later RCTs (e.g. the 2017 Washington, DC Metropolitan Police trial of ~2,200 officers) found no statistically significant effect, so the Rialto effect size does not robustly generalize.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 4,
            directness: 8,
          },
          source: "Ariel, Farrar & Sutherland, Journal of Quantitative Criminology 31(3), 2015",
          sourceUrl: "https://link.springer.com/article/10.1007/s10940-014-9236-3",
          reasoning:
            "Gold-standard RCT design and the verified ~50% use-of-force / 88% complaints figures are correct for Rialto. Replicability lowered to 4 because the much larger Washington, DC RCT and several others found null effects; the single-site Rialto result is now widely regarded as not generalizable, so the claim was qualified rather than presented as settled.",
        },
        {
          id: "pr-defunding-crime-spikes",
          title: "Post-Defunding Crime Spike Data",
          description:
            "Cities that cut police budgets for FY2021 (Minneapolis, Portland, Austin) saw violent crime rise in 2021-2022, but a roughly 30% national homicide increase occurred in 2020 across cities that did and did not cut budgets, so the spikes are not specifically attributable to the cuts. Several of the cuts were small or partly reversed within a year.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 4,
          },
          source: "PolitiFact analysis of city police budgets; FBI Uniform Crime Reporting data",
          sourceUrl: "https://www.politifact.com/factchecks/2021/jun/18/tweets/some-police-budgets-are-increasing-evidence-nation/",
          reasoning:
            "Budget and crime data are real, but causation is highly ambiguous — the 2020 crime rise was nationwide (COVID disruption, pandemic economics) and hit cities that never cut budgets too. PolitiFact found the actual cuts were often modest and that no clear national trend links cuts to crime, so directness/independence/replicability were lowered from the earlier draft, which overstated the causal link.",
        },
        {
          id: "pr-international-comparison",
          title: "International Use of Force Comparisons",
          description:
            "US police kill civilians at roughly 33 per 10 million people — about 4x the rate in Australia, 25x Germany, 67x England and Wales, and over 150x Japan (Prison Policy Initiative compilation of national statistics). The gap with peer democracies is large, though the multiple varies widely by comparison country rather than being a uniform 30x+.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Prison Policy Initiative (2020), compiling national police-killing statistics",
          sourceUrl: "https://www.prisonpolicy.org/blog/2020/06/05/policekillings/",
          reasoning:
            "Cross-national rates are well documented, but comparisons are complicated by uniquely high US gun ownership and differing data-collection methods. The earlier '30-60x higher than the UK, Germany, Japan, and Australia' was inaccurate for Australia/Canada (only ~3-4x); corrected to the verified per-capita figures, which range from ~4x (Australia) to ~167x (Japan).",
        },
      ],
    },
    {
      id: "alternative-response-models",
      title: "Alternative Response Models",
      short_summary:
        "Denver's STAR team handled 748 calls in its first six months with zero arrests and no police backup needed, and a Stanford study tied it to a 34% drop in low-level crime. Scale remains the open question.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "The headline results come from places that may not generalize: Eugene is a small, relatively low-crime, predominantly white city, and Denver's STAR was a six-month pilot in 8 of 36 precincts handling carefully pre-screened, low-level call types. Neither has been demonstrated at the scale or call-mix of Chicago or Detroit. Removing police from crisis calls shifts risk to unarmed responders, and calls that screen as non-violent can escalate without warning.",
      proponent_rebuttal:
        "CAHOOTS in Eugene, OR handled roughly 24,000 calls in 2019 (~66/day) with unarmed teams — about 20% of dispatch volume — requesting police backup on only 311 of them (~1.3%). Denver's STAR team responded to 748 calls in its six-month pilot with zero arrests and no backup needed, and a peer-reviewed Stanford evaluation found it cut targeted low-level crime by ~34% at roughly a quarter of the cost of police-only response. Vera Institute analysis of NYC 911 data found violent-crime calls were only about 4% of dispatches — the bulk are non-emergency, social-need, or administrative matters that do not require an armed response.",
      crux: {
        id: "alternative-response-scalability",
        title: "Scalability of Non-Police Response Models",
        description:
          "Can programs like CAHOOTS and STAR scale to large, high-crime cities while maintaining safety outcomes?",
        methodology:
          "Phased implementation studies in large cities, comparing outcomes (safety incidents, call resolution, cost) between traditional police response and alternative response teams.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (Multi-city phased implementation study)",
      },
      evidence: [
        {
          id: "pr-cahoots-outcomes",
          title: "CAHOOTS Outcome Data",
          description:
            "CAHOOTS in Eugene, OR has operated since 1989 and in 2019 responded to roughly 24,000 calls (~66/day) with unarmed teams — about 20% of the public-safety communications center's call volume — requesting police backup on only 311 of them (~1.3%).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "Vera Institute case study; White Bird Clinic / Eugene Police Department records (2019 figures)",
          sourceUrl: "https://www.vera.org/behavioral-health-crisis-alternatives/cahoots",
          reasoning:
            "30+ years of operational data is compelling, but Eugene is a small, predominantly white city, so generalizability to larger, more diverse cities is unproven. The earlier draft's '150+ calls/day' and 'less than 1% backup' overstated the data; corrected to the 2019 figures of ~66 calls/day and 311 backups (~1.3%).",
        },
        {
          id: "pr-denver-star",
          title: "Denver STAR Pilot Results",
          description:
            "In its 6-month 2020 pilot, Denver's STAR team responded to 748 calls (out of ~2,500+ eligible calls received) with zero arrests and no police backup needed. A Stanford evaluation (Dee & Pyne, Science Advances 2022) found the program cut targeted low-level crime reports by ~34% without increasing violent crime, at direct costs about 4x lower than police-only response.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source: "Dee & Pyne, Science Advances (2022); Denver STAR pilot data via Stanford SIEPR",
          sourceUrl: "https://siepr.stanford.edu/news/groundbreaking-study-shows-benefits-reinventing-responses-nonviolent-911-calls",
          reasoning:
            "Peer-reviewed Stanford evaluation adds strong independent credibility. Pilot phase only — 6 months, small scale, carefully selected call types. Corrected the earlier draft: STAR actually responded to 748 calls (2,500+ was eligible calls received, not handled), and costs were ~4x lower (not '60% less').",
        },
        {
          id: "pr-911-call-analysis",
          title: "911 Call Type Analysis",
          description:
            "Vera Institute analysis of New York City 911 data found violent-crime calls were about 4% of all calls dispatched to police (~9% of crime-related calls); 96% of dispatched calls did not involve violent crime, and only ~42% were even labeled crime-related. The bulk were administrative, social-need, or non-emergency matters.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Vera Institute of Justice, \"What 911 Data Says About Community Needs in New York City\"",
          sourceUrl: "https://www.vera.org/publications/what-911-data-says-about-community-needs-in-new-york-city",
          reasoning:
            "Large-sample analysis, but it is specifically NYC data, not a multi-city study; replicability lowered and the description scoped to NYC. The earlier '4-7% across major cities' and a conflated 'NYT analysis of 10M+ 911 calls' attribution were corrected to the actual Vera NYC finding (~4% violent of all calls).",
        },
        {
          id: "pr-failed-defunding",
          title: "Failed Defunding Implementation Case Studies",
          description:
            "Minneapolis, Portland, and Austin all restored or increased police budgets within about a year after crime increases and political backlash — Austin's FY2022 budget reached a record high after the prior year's cut, and Minneapolis re-injected most of the funds it had removed. Several of the original cuts were modest rather than the headline figures suggested.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "PolitiFact and WORLD reporting on city police-budget reversals",
          sourceUrl: "https://www.politifact.com/factchecks/2021/jun/18/tweets/some-police-budgets-are-increasing-evidence-nation/",
          reasoning:
            "The budget reversals are well documented. However, critics argue the failure was in implementation (and in how small/short-lived the cuts actually were), not in the concept of reallocation itself; the description was tightened to reflect that several cuts were modest.",
        },
      ],
    },
  ],
};
