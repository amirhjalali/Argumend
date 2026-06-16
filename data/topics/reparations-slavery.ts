import type { Topic } from "@/lib/schemas/topic";

export const reparationsSlaveryData = {
  id: "reparations-slavery",
  title: "Reparations for Slavery",
  meta_claim:
    "The United States federal government should provide reparations to descendants of enslaved Black Americans to address the lasting economic and social effects of slavery and Jim Crow.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "moral-historical-case",
      title: "Moral & Historical Case",
      short_summary:
        "The median white family holds about 6x the wealth of the median Black family ($285K vs. ~$45K in the 2022 SCF). Historians trace the gap to slavery, Jim Crow, and redlining.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Current Americans bear no personal responsibility for their ancestors' actions. Where do you draw the line — Indigenous displacement, Japanese internment, Irish discrimination? Many Black Americans are recent immigrants with no connection to American slavery. Individual responsibility, not group identity, should guide public policy. Reparations would be divisive and deepen racial resentment rather than heal it.",
      proponent_rebuttal:
        "The US government itself directly sanctioned and enforced slavery for 246 years and Jim Crow for roughly a century more — this is not about individual guilt but institutional debt owed by an enduring legal entity, the federal government, that outlives any generation. The racial wealth gap is large and measurable: in the Federal Reserve's 2022 Survey of Consumer Finances, median white wealth was about $285,000 versus roughly $45,000 for Black families — about six times as much. The GI Bill, FHA mortgage insurance, and the original Social Security Act excluded most Black Americans by design, compounding disadvantage well into the 20th century — harms whose direct victims and beneficiaries are often still alive. The recent-immigrant objection is real but answerable: serious proposals (Darity and Mullen) restrict eligibility to documented descendants of people enslaved in the US, not to skin color. And the US already pays targeted reparations — to interned Japanese Americans (1988 Civil Liberties Act) — while Germany paid Holocaust survivors, so the principle is established even if the scale here is far larger.",
      crux: {
        id: "causal-chain-measurement",
        title: "Measuring the Causal Chain from Slavery to Present Disparities",
        description:
          "Quantifying how much of the current racial wealth and income gap is directly attributable to slavery, Jim Crow, and discriminatory federal policies versus other factors.",
        methodology:
          "Decomposition analysis tracing wealth accumulation pathways: land ownership denied (40 acres), GI Bill exclusion, FHA redlining, Social Security exclusion, mass incarceration. Estimate the counterfactual wealth of Black Americans absent these policies using historical economic modeling.",
        equation:
          "\\text{Reparations Debt} = \\sum_{t=1619}^{2024} \\text{Value Extracted}_t \\times (1 + r)^{2024-t}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Historical economic modeling with multiple methodologies)",
      },
      evidence: [
        {
          id: "fed-racial-wealth-gap",
          title: "Federal Reserve: $285K White vs. $45K Black Median Wealth",
          description:
            "The Federal Reserve's 2022 Survey of Consumer Finances shows white families have a median net worth of about $285,000 compared to roughly $45,000 for Black families — a gap of about 6.3:1 (the typical Black family holds about 15% of the typical white family's wealth). The dollar gap has widened over recent decades even as the ratio narrowed somewhat; in the 2019 SCF the gap was about 8:1 ($188,200 white vs. $24,100 Black).",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source:
            "Federal Reserve Board, FEDS Notes, 'Greater Wealth, Greater Uncertainty: Changes in Racial Inequality in the Survey of Consumer Finances' (2023)",
          sourceUrl:
            "https://www.federalreserve.gov/econres/notes/feds-notes/greater-wealth-greater-uncertainty-changes-in-racial-inequality-in-the-survey-of-consumer-finances-20231018.html",
          reasoning:
            "Gold-standard data from the most authoritative source. Directly documents the disparity, though the causal connection to slavery specifically (versus ongoing discrimination) is indirect. Earlier draft cited incorrect figures ($171K/$17.1K); corrected to the official 2022 SCF medians.",
        },
        {
          id: "rothstein-color-of-law",
          title: "Rothstein: Government Actively Created Racial Segregation",
          description:
            "Richard Rothstein's 'The Color of Law' documents how federal, state, and local government policies deliberately created and maintained racial residential segregation. FHA explicitly refused to insure mortgages in Black neighborhoods (redlining), the GI Bill was administered to exclude Black veterans, and public housing was intentionally segregated. These are government actions, not market outcomes.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Richard Rothstein, 'The Color of Law: A Forgotten History of How Our Government Segregated America' (Liveright/Economic Policy Institute, 2017)",
          sourceUrl:
            "https://www.epi.org/publication/the-color-of-law-a-forgotten-history-of-how-our-government-segregated-america/",
          reasoning:
            "Extensively documented with primary sources. Directly establishes government responsibility for creating the conditions that reparations would address.",
        },
        {
          id: "german-holocaust-reparations",
          title: "German Holocaust Reparations Provide Working Precedent",
          description:
            "Since negotiations began in 1952, the German government has paid more than $90 billion in indemnification to individuals for losses resulting from Nazi persecution (the Claims Conference's own figure; earlier reporting cited $80+ billion). Payments went to the state of Israel, individual survivors, and their heirs. The program is widely regarded as an important component of reconciliation, and it demonstrates that reparations programs can be designed, administered, and sustained over decades.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "Conference on Jewish Material Claims Against Germany (Claims Conference)",
          sourceUrl: "https://www.claimscon.org/about/history/",
          reasoning:
            "Strong precedent for the concept of reparations. Replicability limited because Germany's reparations were closer in time to the harm and involved a different political and historical context.",
        },
        {
          id: "implementation-feasibility-concerns",
          title: "Defining Eligibility Is Practically Complex",
          description:
            "Identifying who qualifies as a 'descendant of enslaved Americans' poses practical challenges. The US Black population is roughly 41-47 million (Census Bureau estimates), with varying connections to American slavery. Mixed-race Americans, recent immigrants, and people who cannot document ancestry complicate eligibility. Darity and Mullen address this directly, proposing a two-part criterion (documented lineage to a person enslaved in the US plus self-identification as Black for at least 12 years), but building and verifying such a registry would be a large administrative undertaking.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "General policy commentary (no single primary source verified for this framing); population figures per U.S. Census Bureau",
          reasoning:
            "Legitimate practical concern, but framed here as general commentary rather than a specific cited study, so source-reliability and independence are scored conservatively. The difficulty of implementation does not negate the moral case — many complex government programs (Social Security, Medicare) require identity verification.",
        },
      ],
    },
    {
      id: "economic-feasibility-form",
      title: "Economic Feasibility & Form",
      short_summary:
        "Estimates range from $10 trillion to $14 trillion in total. Nobody agrees on who qualifies, what form payment takes, or where the money comes from.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The cost — $10-14 trillion by leading estimates — rivals or exceeds the entire annual federal budget and would require unprecedented taxation or borrowing for a single program. Beyond cost, eligibility is genuinely hard and arguably unfair: documenting lineage to a specific enslaved ancestor is impossible for many descendants (records were sparse and deliberately incomplete), would exclude some of the intended beneficiaries while admitting others on thin documentation, and asks today's taxpayers — including descendants of post-1865 immigrants and of the enslaved themselves — to fund transfers keyed to ancestry rather than present need. A one-time cash transfer also does not by itself fix the structural drivers of disadvantage (school funding, mass incarceration, ongoing discrimination). Race-conscious payments may also face serious constitutional challenge after the Supreme Court's 2023 ruling against race-based affirmative action. Universal, means-tested anti-poverty programs help every disadvantaged American, sidestep the lineage problem, and command broader and more durable political support.",
      proponent_rebuttal:
        "Darity and Mullen put the target sum at roughly $10-12 trillion — the amount they estimate is needed to close the Black-white wealth gap — delivered mainly as direct payments to eligible descendants (on the order of $200,000-$250,000 each), not as a grab-bag of in-kind programs. Spread over a 10-year program that is roughly $1 trillion a year, on the scale of recent pandemic relief and well within the federal government's demonstrated borrowing capacity for emergencies it deems urgent. HR 40, the bill on the table, merely proposes a commission to study the question and recommend remedies, not a commitment to any specific form or sum. And separate wealth-building tools such as baby bonds suggest large transfers can be administered through existing fiscal machinery; closing the gap would also generate offsetting returns through higher homeownership, spending, and entrepreneurship.",
      crux: {
        id: "reparations-program-design",
        title: "Optimal Reparations Program Design and Cost-Benefit",
        description:
          "Determining which reparations model (direct payments, baby bonds, housing/education grants, community investment) would most effectively close the racial wealth gap while being politically and economically viable.",
        methodology:
          "Microsimulation modeling of different reparations structures using PSID and SCF data. Project wealth gap closure under each model at 10, 25, and 50-year horizons. Estimate fiscal multiplier effects and long-term tax revenue returns.",
        equation:
          "\\text{ROI}_{\\text{reparations}} = \\frac{\\Delta \\text{GDP} + \\Delta \\text{Tax Revenue} + \\Delta \\text{Social Savings}}{\\text{Program Cost}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Comprehensive economic modeling study — essentially what HR 40 proposes)",
      },
      evidence: [
        {
          id: "darity-mullen-proposal",
          title: "Darity & Mullen: Comprehensive Reparations Framework",
          description:
            "Economists William Darity Jr. (Duke) and A. Kirsten Mullen, in 'From Here to Equality' (2020), argue the total reparations sum should be whatever is needed to eliminate the Black-white wealth gap — an expenditure they put at roughly $10-12 trillion, on the order of $200,000-$250,000 per eligible recipient. They emphasize that the bulk should be direct payments to individuals rather than in-kind programs. Eligibility rests on two criteria: documented lineage to a person enslaved in the United States, and self-identification as Black/African American for a sustained period. (Means-tested 'baby bonds' of roughly $20K on average, up to ~$50K-$60K for the lowest-wealth families, are a separate Hamilton-Darity wealth-building proposal, not the core of this reparations plan.)",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "William A. Darity Jr. & A. Kirsten Mullen, 'From Here to Equality: Reparations for Black Americans in the Twenty-First Century' (UNC Press, 2020); summarized in Brookings",
          sourceUrl: "https://www.brookings.edu/articles/black-reparations-and-the-racial-wealth-gap/",
          reasoning:
            "The most detailed and economically rigorous reparations proposal from leading scholars. Demonstrates feasibility but relies on political will and assumptions about implementation. Corrected to attribute the $20K-$60K baby-bond figures to the separate Hamilton-Darity proposal rather than to the From Here to Equality reparations sum.",
        },
        {
          id: "hr-40-commission",
          title: "HR 40: A Commission to Study Reparations",
          description:
            "H.R. 40 (Commission to Study and Develop Reparation Proposals for African Americans Act) was first introduced by Rep. John Conyers in 1989 and has been reintroduced in every Congress since (later led by Rep. Sheila Jackson Lee from 2019 until her death in 2024, and subsequently by Rep. Ayanna Pressley). It proposes a commission to study the impact of slavery and recommend remedies — it does not commit to any specific reparations form. In April 2021 it was advanced out of the House Judiciary Committee for the first time, but it has never received a full floor vote.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "U.S. Congress (H.R. 40, Commission to Study and Develop Reparation Proposals for African Americans Act); originally Rep. John Conyers, later Rep. Sheila Jackson Lee",
          sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/40",
          reasoning:
            "The modest nature of the proposal (study, not commit) makes opposition harder to justify. Low directness because a study commission is a procedural step, not reparations itself.",
        },
        {
          id: "implementation-cost-estimates",
          title: "Cost Estimates Range from $6 Trillion to $14 Trillion",
          description:
            "Estimates of reparations costs vary enormously by methodology. Valuing unpaid slave labor (1776-1865) compounded at 3% interest, Thomas Craemer estimated $14.2 trillion in 2009 dollars (higher interest rates push his figures toward $16-18 trillion). Using the current wealth gap, Darity and Mullen put the figure at $10-12 trillion. For context, total US federal spending is on the order of $6 trillion annually and US GDP is roughly $27-28 trillion (2023).",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Thomas Craemer, 'Estimating Slavery Reparations,' Social Science Quarterly 96(2) (2015); Darity & Mullen for the wealth-gap-based figure",
          sourceUrl: "https://onlinelibrary.wiley.com/doi/abs/10.1111/ssqu.12151",
          reasoning:
            "The scale of costs is a genuine practical obstacle. The wide range of estimates reflects methodological disagreement about what reparations should address. The '$2-4 trillion for modest programs' figure was removed as unsourced.",
        },
        {
          id: "baby-bonds-pilot-data",
          title: "Baby Bonds Programs Show Promise in Pilot Studies",
          description:
            "Baby bonds — government-funded trust accounts for children that grow over time — were proposed by economists Darrick Hamilton and William Darity as a race-neutral wealth-building tool that would disproportionately benefit Black families. Connecticut enacted the first state program in 2021 (funding/launch finalized, came online July 2023): the state seeds a trust with $3,200 for each baby born into families covered by HUSKY, its Medicaid program (i.e., born into poverty), projected to grow to roughly $11,000-$24,000 by adulthood. A widely cited simulation by Naomi Zewde estimates that means-tested baby bonds (averaging ~$20K, up to ~$50K-$60K for the lowest-wealth families) could shrink the median young-adult Black-white wealth ratio from about 16:1 to roughly 1.4:1.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Hamilton & Darity (baby bonds proposal); Connecticut Office of the Treasurer (CT Baby Bonds); Naomi Zewde simulation",
          sourceUrl: "https://portal.ct.gov/ott/ct-baby-bonds/overview",
          reasoning:
            "Promising mechanism with some real-world pilot data. Directness is limited because baby bonds are race-neutral by design (though they disproportionately benefit Black families) and the wealth-gap-closure figures are projections, not observed at scale. Corrected eligibility (Medicaid/HUSKY, not 'under $75K') and attributed the gap-closure estimate to Zewde's simulation.",
        },
      ],
    },
  ],
};
