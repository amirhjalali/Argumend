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
        "The median white family holds 8x the wealth of the median Black family. Historians trace the gap directly to slavery, Jim Crow, and redlining.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Current Americans bear no personal responsibility for their ancestors' actions. Where do you draw the line — Indigenous displacement, Japanese internment, Irish discrimination? Many Black Americans are recent immigrants with no connection to American slavery. Individual responsibility, not group identity, should guide public policy. Reparations would be divisive and deepen racial resentment rather than heal it.",
      proponent_rebuttal:
        "The US government itself directly participated in and enforced slavery for 246 years and Jim Crow for 100 more — this is not about individual guilt but institutional debt. The racial wealth gap ($171K white median household wealth vs. $17K Black) is a direct, measurable legacy. The GI Bill, FHA loans, and Social Security initially excluded Black Americans by design, compounding disadvantage through the 20th century. Germany paid Holocaust reparations; Japan paid internment reparations. The US has precedent.",
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
          title: "Federal Reserve: $171K White vs. $17K Black Median Wealth",
          description:
            "The Federal Reserve's Survey of Consumer Finances (2022) shows white families have a median net worth of $171,000 compared to $17,100 for Black families — a 10:1 ratio. This gap has remained essentially unchanged for 30 years despite civil rights legislation and affirmative action.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source: "Federal Reserve Survey of Consumer Finances",
          reasoning:
            "Gold-standard data from the most authoritative source. Directly documents the disparity, though the causal connection to slavery specifically (versus ongoing discrimination) is indirect.",
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
          source: "Richard Rothstein, Economic Policy Institute",
          reasoning:
            "Extensively documented with primary sources. Directly establishes government responsibility for creating the conditions that reparations would address.",
        },
        {
          id: "german-holocaust-reparations",
          title: "German Holocaust Reparations Provide Working Precedent",
          description:
            "Germany has paid over $80 billion in Holocaust reparations since 1952. Payments went to the state of Israel, individual survivors, and their descendants. The program is widely regarded as an important component of reconciliation. It demonstrates that reparations programs can be designed, administered, and sustained over decades.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "Claims Conference, German Federal Ministry of Finance",
          reasoning:
            "Strong precedent for the concept of reparations. Replicability limited because Germany's reparations were closer in time to the harm and involved a different political and historical context.",
        },
        {
          id: "implementation-feasibility-concerns",
          title: "Defining Eligibility Is Practically Complex",
          description:
            "Identifying who qualifies as a 'descendant of enslaved Americans' poses enormous practical challenges. An estimated 40 million Black Americans have varying connections to slavery. Mixed-race Americans, recent immigrants, and people who cannot document ancestry complicate eligibility. The administrative apparatus required would be unprecedented.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Various policy analyses, Brookings Institution",
          reasoning:
            "Legitimate practical concern. However, the difficulty of implementation doesn't negate the moral case — many complex government programs (Social Security, Medicare) require identity verification.",
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
        "The cost — estimated at $10-14 trillion by some calculations — is fiscally impossible and would require unprecedented taxation or debt. Cash payments don't address structural issues like education inequality and mass incarceration. Means testing would be impossibly complex. Universal anti-poverty programs would help all disadvantaged Americans regardless of race and have broader political support.",
      proponent_rebuttal:
        "Darity and Mullen propose targeted programs — baby bonds, housing grants, education funding, and business development — totaling $10-12 trillion over 25 years, roughly $400-480 billion annually (comparable to the defense budget). HR 40 (the reparations study commission bill) merely proposes to study the question, not commit to a specific form. Investment in Black communities would generate economic returns through increased spending, homeownership, and entrepreneurship.",
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
            "Economists William Darity Jr. and A. Kirsten Mullen's 'From Here to Equality' proposes a detailed reparations program including direct payments, baby bonds ($20K-$60K per child based on family wealth), housing grants, and education funding. They estimate $10-12 trillion over 25 years would close the racial wealth gap. The proposal includes specific eligibility criteria: documented lineage to enslaved Americans and self-identification as Black.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Darity & Mullen, Duke University",
          reasoning:
            "The most detailed and economically rigorous reparations proposal from leading scholars. Demonstrates feasibility but relies on political will and assumptions about implementation.",
        },
        {
          id: "hr-40-commission",
          title: "HR 40: A Commission to Study Reparations",
          description:
            "H.R. 40 (Commission to Study and Develop Reparation Proposals for African Americans Act) has been introduced in every Congress since 1989. It proposes a commission to study the impact of slavery and recommend remedies — it does not commit to any specific reparations form. This incremental approach has gained support from the House Judiciary Committee but has never received a full floor vote.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "U.S. Congress, Rep. Sheila Jackson Lee",
          reasoning:
            "The modest nature of the proposal (study, not commit) makes opposition harder to justify. Low directness because a study commission is a procedural step, not reparations itself.",
        },
        {
          id: "implementation-cost-estimates",
          title: "Cost Estimates Range from $6 Trillion to $14 Trillion",
          description:
            "Estimates of reparations costs vary enormously depending on methodology. Using the value of unpaid slave labor compounded at interest yields $14+ trillion. Using the current wealth gap yields $10-12 trillion. Even modest proposals (targeted programs rather than cash) would cost $2-4 trillion. For context, the entire federal budget is $6.1 trillion annually, and US GDP is $27 trillion.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Various economic analyses, Thomas Craemer (UConn), Brookings",
          reasoning:
            "The scale of costs is a genuine practical obstacle. The wide range of estimates reflects methodological disagreement about what reparations should address and how.",
        },
        {
          id: "baby-bonds-pilot-data",
          title: "Baby Bonds Programs Show Promise in Pilot Studies",
          description:
            "Baby bonds — government-funded trust accounts for children that grow over time — have been proposed by economists Darrick Hamilton and Sandy Darity as a race-neutral wealth-building tool that would disproportionately benefit Black families. Connecticut's baby bonds program (2021) provides $3,200 for children born into families earning under $75K. Simulations show that universal baby bonds of $20K-$60K (means-tested by wealth) could reduce the racial wealth gap by 50% within one generation.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Hamilton & Darity, New School; Connecticut baby bonds program",
          reasoning:
            "Promising mechanism with some real-world pilot data. Directness is limited because baby bonds are race-neutral by design (though they disproportionately benefit Black families) and results are projected, not observed at scale.",
        },
      ],
    },
  ],
};
