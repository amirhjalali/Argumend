import type { Topic } from "@/lib/schemas/topic";

export const socialSecurityRetirementAgeData = {
  id: "social-security-retirement-age",
  title: "Raising the Retirement Age",
  meta_claim:
    "Raising the retirement age is a necessary and fair way to keep Social Security solvent.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Raising the retirement age — the fix politicians reach for first — doesn't actually fix Social Security. The nonpartisan CBO found that lifting the full retirement age from 67 to 69 closes only about a quarter (24%) of the 75-year shortfall and doesn't even move the year the trust funds run dry (still the mid-2030s). It works mainly as an across-the-board benefit cut, roughly 13% for the cohorts it hits.",
    confidence: 90,
    source:
      "Congressional Budget Office, 'Raising the Full Retirement Age for Social Security' (Sept. 2024); Social Security Board of Trustees, 2024 Annual Report",
    sourceUrl:
      "https://www.cbo.gov/system/files/2024-09/60516-Full-Retirement-Age.pdf",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The demographic case is real: when Social Security started, a retirement age of 65 roughly matched life expectancy, but Americans now live far longer and collect for many more years while fewer workers support each retiree — so indexing the retirement age to longevity restores the program's original design and, per CBO, durably closes about a quarter of the long-term gap on its own.",
    "But raising the age is mechanically a benefit cut for everyone (about 7% in lifetime benefits per year of increase), and it lands unequally: life expectancy has soared for high earners and barely moved for low earners — the male top-vs-bottom-quintile gap at age 50 grew from ~5 years to a projected ~13 — so 'people live longer, so work longer' applies far more to the affluent than to manual laborers who can't.",
    "So the honest debate isn't whether raising the age helps solvency (it does, modestly) but whether it's the fair way to do it — versus revenue options like lifting the payroll-tax cap (income above ~$168,600 in 2024 is untaxed), which can close the gap without cutting benefits.",
  ],
  last_updated: "2026-06-16",
  tags: ["social-security", "retirement", "fiscal-policy", "aging", "inequality"],
  pillars: [
    {
      id: "fiscal-necessity",
      title: "Fiscal Necessity",
      short_summary:
        "The combined trust funds are projected to deplete around 2035, after which only ~83% of scheduled benefits would be payable. Raising the retirement age closes part of the gap — but only part.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Raising the retirement age is neither necessary nor sufficient. CBO finds that lifting the full retirement age (FRA) from 67 to 69 closes only about a quarter (24%) of the 75-year actuarial imbalance — and does not even change the year the trust funds run dry — so it cannot 'keep Social Security solvent' on its own. Revenue options — such as lifting or eliminating the payroll-tax cap (income above ~$168,600 in 2024 is untaxed) — could close the entire gap without cutting benefits. Calling an age increase 'necessary' presents one contested policy choice as if it were arithmetic.",
      proponent_rebuttal:
        "Demographics drive the shortfall: when Social Security began, the FRA of 65 roughly matched life expectancy; Americans now live far longer and collect benefits for many more years, while the worker-to-beneficiary ratio has fallen. Indexing the retirement age to longevity restores the original program design. CBO estimates raising the FRA from 67 to 69 closes roughly a quarter (24%) of the long-range actuarial imbalance — a durable contribution that reduces how much any tax increase must do, and it grows automatically as longevity rises.",
      crux: {
        id: "solvency-gap-share",
        title: "Share of the Solvency Gap Closed",
        description:
          "Whether raising the retirement age does enough of the work to be called 'necessary' depends on a measurable quantity: what fraction of the 75-year actuarial deficit an FRA increase actually closes, versus revenue alternatives.",
        methodology:
          "Use the SSA Office of the Chief Actuary's stochastic model and CBO's long-term Social Security model to score each policy in isolation: FRA-to-69 (the version CBO scored in 2024), eliminate the taxable-maximum cap, and raise the payroll tax rate. Compare the percent of the 75-year open-group actuarial deficit each closes.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (existing SSA/CBO actuarial scoring)",
        falsification: {
          supporter_flip:
            "If SSA/CBO scoring showed that an FRA increase phased in to a realistic age (say 69) closes the large majority of the 75-year actuarial deficit and meaningfully pushes back the trust-fund depletion date, the claim that an age increase is 'necessary' to keep the program solvent would be much stronger.",
          skeptic_flip:
            "A skeptic should weigh that CBO scores raising the FRA to 69 at closing 24% of the imbalance — a real, durable, self-indexing contribution that grows as longevity rises — and that revenue-only fixes require politically difficult tax increases that may also fall short or be eroded, so 'just lift the cap' is not automatically sufficient or sustainable either.",
          common_ground:
            "Both sides agree there is a real, dated financing shortfall (combined reserves projected to deplete around 2035, after which only ~83% of scheduled benefits are payable) and that an FRA increase does close some, but not all, of the gap.",
          live_disagreement:
            "The precise share of the 75-year actuarial deficit that an FRA increase closes versus revenue alternatives (cap removal, rate increases) when each is scored in isolation — resolvable by re-running the SSA Chief Actuary and CBO long-term models on each policy, which already place FRA-to-69 at ~24% while leaving the depletion year unchanged.",
        },
      },
      evidence: [
        {
          id: "trustees-depletion",
          title: "Combined Trust Funds Deplete ~2035, ~83% Payable",
          description:
            "Under the trustees' intermediate assumptions, the combined OASDI reserves are projected to deplete in 2035, after which continuing tax income would cover about 83% of scheduled benefits, declining over time. This establishes a real, dated financing shortfall.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "Social Security Board of Trustees, 2024 Annual Report Summary (OASDI)",
          sourceUrl: "https://www.ssa.gov/oact/TRSUM/2024/index.html",
          reasoning:
            "Official statutory actuarial projection — the authoritative source on solvency. Directness is moderate because it documents the problem, not that raising the age is the necessary or fair fix.",
        },
        {
          id: "cbo-fra70-share",
          title: "CBO: FRA-to-69 Closes Only ~A Quarter of the Imbalance",
          description:
            "CBO finds that raising the full retirement age from 67 to 69 (phased in by two months per birth year) reduces average benefits by about 13% for affected cohorts and cuts the 75-year actuarial imbalance by only 24% — about a quarter — while not even changing the year the trust funds become insolvent, so it cannot restore solvency alone.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "Congressional Budget Office, 'Raising the Full Retirement Age for Social Security' (Sept. 2024)",
          sourceUrl:
            "https://www.cbo.gov/system/files/2024-09/60516-Full-Retirement-Age.pdf",
          reasoning:
            "Nonpartisan official scoring directly rebutting the word 'necessary': if even FRA-to-69 closes only ~a quarter of the imbalance and leaves the insolvency date unchanged, an age increase is at most one component of a solution, not the solution.",
        },
        {
          id: "payroll-cap-alternative",
          title: "Lifting the Payroll-Tax Cap Is a Revenue Alternative",
          description:
            "About 17–18% of aggregate covered earnings escape the payroll tax because of the taxable-maximum cap (~$168,600 in 2024) — only ~83% of covered earnings fall below it, and roughly 6% of workers earn above it. Eliminating or raising the cap is repeatedly scored by SSA/CBO as closing a large share — in some designs most or all — of the shortfall without cutting benefits, undercutting the claim that an age increase is 'necessary.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Committee for a Responsible Federal Budget, 'CBO's Options to Improve Social Security Solvency' (summarizing CBO scores)",
          sourceUrl:
            "https://www.crfb.org/blogs/cbos-options-improve-social-security-solvency",
          reasoning:
            "Establishes that viable non-age options exist. Weights are moderate because exact cap-design scores vary and CRFB is a secondary summary of CBO/SSA scoring rather than the primary actuarial table.",
        },
      ],
    },
    {
      id: "fairness-distribution",
      title: "Fairness Across Workers",
      short_summary:
        "An FRA increase is an across-the-board benefit cut. Whether it is 'fair' turns on the widening life-expectancy gap by income and on who is physically able to work longer.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Raising the FRA is a uniform benefit cut — each one-year increase is roughly a 7% lifetime cut for everyone, whenever they claim. But it lands unequally: life expectancy has risen sharply for high earners and barely at all for low earners, so longer work-and-collect periods mainly benefit the affluent. The National Academies found the male top-vs-bottom-earnings-quintile gap in life expectancy at 50 grew from 5.1 years (1930 cohort) to a projected 12.7 years (1960 cohort). Many manual laborers cannot simply work to 70, so a longevity-justified cut effectively penalizes those who live shortest and work hardest.",
      proponent_rebuttal:
        "An FRA increase can be designed fairly. Disability Insurance — which disproportionately serves lower-income and physically demanding occupations — is not subject to the FRA, partially shielding those who cannot work longer. CRFB, drawing on SSA distributional estimates, argues that a normal-retirement-age increase reduces benefits roughly equally across income quintiles and is even slightly progressive, because the existing benefit formula and the DI carve-out cushion low earners. The longevity gap is a real problem, but it is a feature of Social Security's current structure, not something an age increase uniquely creates; targeted minimum-benefit enhancements can offset it.",
      crux: {
        id: "lifetime-incidence",
        title: "Distribution of the Lifetime Benefit Cut",
        description:
          "The 'fairness' dispute is empirical: does an FRA increase reduce lifetime benefits roughly equally across the income distribution, or does the longevity gap make the cut sharply regressive in lifetime terms?",
        methodology:
          "Run a microsimulation (e.g., SSA's MINT model or the Urban Institute's DYNASIM) that combines mortality-by-lifetime-earnings with claiming behavior to compute the change in expected lifetime benefits by earnings quintile under an FRA increase, with and without a DI carve-out and minimum-benefit offset.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (existing microsimulation models)",
        falsification: {
          supporter_flip:
            "If a microsimulation using mortality-by-lifetime-earnings (e.g., SSA's MINT or Urban's DYNASIM) showed that, in expected lifetime-benefit terms, an FRA increase falls sharply harder on low earners even after the Disability Insurance carve-out and any minimum-benefit offset, the 'fair' half of the claim would fail and the cut would have to be called regressive.",
          skeptic_flip:
            "A skeptic worried about regressivity should weigh that Disability Insurance — which skews toward lower-income and physically demanding jobs — is exempt from the FRA, and that SSA distributional estimates suggest a normal-retirement-age increase cuts annual benefits roughly equally (even slightly progressively) across quintiles, so the regressive result depends specifically on the lifetime-mortality channel, not on the policy mechanically targeting the poor.",
          common_ground:
            "Both sides agree an FRA increase is an across-the-board benefit cut (roughly 7% of lifetime benefits per year of increase) and that the life-expectancy gap by income is large and has widened (male top-vs-bottom-quintile gap at 50 rising from ~5.1 to a projected ~12.7 years).",
          live_disagreement:
            "Whether, on a lifetime basis incorporating differential mortality, an FRA increase is roughly distribution-neutral or sharply regressive — resolvable by running MINT/DYNASIM with and without the DI carve-out and a minimum-benefit offset, since the annual-vs-lifetime framing is what drives the opposite conclusions.",
        },
      },
      evidence: [
        {
          id: "nas-longevity-gap",
          title: "Life-Expectancy Gap by Income More Than Doubled",
          description:
            "The National Academies found that for men, the gap in life expectancy at age 50 between the top and bottom lifetime-earnings quintiles grew from 5.1 years (1930 birth cohort) to a projected 12.7 years (1960 birth cohort) — so longevity-based justifications for working longer apply far more to high earners.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "National Academies of Sciences, 'The Growing Gap in Life Expectancy by Income' (2015), Summary",
          sourceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK321304/",
          reasoning:
            "Peer-reviewed consensus report using SSA earnings data linked to the Health and Retirement Study. Directly undercuts the 'people live longer so should work longer' fairness premise for low earners.",
        },
        {
          id: "across-board-cut",
          title: "An FRA Increase Is an Across-the-Board Benefit Cut",
          description:
            "CBPP notes that raising the FRA cuts benefits for all new retirees regardless of when they claim — each one-year increase is roughly a 7% reduction in monthly benefits — and falls hardest on lower-income retirees who rely most on Social Security and often work in jobs they cannot continue.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "Center on Budget and Policy Priorities, 'Raising Social Security's Retirement Age Would Cut Benefits for All New Retirees' (2023)",
          sourceUrl:
            "https://www.cbpp.org/research/social-security/raising-social-securitys-retirement-age-would-cut-benefits-for-all-new",
          reasoning:
            "The ~7%-per-year mechanism is arithmetically grounded in SSA's actuarial reduction factors. Independence is lower because CBPP is an advocacy organization, but the core mechanical claim is verifiable and widely accepted.",
        },
        {
          id: "crfb-progressive",
          title: "CRFB: FRA Increase Is Roughly Equal / Slightly Progressive",
          description:
            "Drawing on SSA distributional estimates, CRFB argues a normal-retirement-age increase reduces benefits roughly equally across earnings quintiles — and is slightly progressive — partly because Disability Insurance, which skews lower-income, is exempt from the FRA.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Committee for a Responsible Federal Budget, 'Actually, Raising the Retirement Age Is Not Regressive'",
          sourceUrl:
            "https://www.crfb.org/blogs/actually-raising-retirement-age-not-regressive",
          reasoning:
            "Directly defends the 'fair' half of the meta-claim using SSA distributional estimates. Independence/replicability are moderate: CRFB is an advocacy group and the result is sensitive to whether one measures annual benefits or lifetime benefits (where mortality differences bite).",
        },
        {
          id: "cbo-fra-savings",
          title: "CBO: FRA Increase Yields Real, Durable Savings",
          description:
            "CBO scores raising the FRA from 67 to 69 as cutting the 75-year actuarial imbalance by 24% — about a quarter — lowering program spending to 5.4% of GDP in 2054, with savings that grow automatically as longevity rises: a genuine, self-indexing contribution to solvency.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "Congressional Budget Office, 'Raising the Full Retirement Age for Social Security' (Sept. 2024)",
          sourceUrl:
            "https://www.cbo.gov/system/files/2024-09/60516-Full-Retirement-Age.pdf",
          reasoning:
            "Same nonpartisan CBO source as the 'against' item, read for what it supports: an FRA increase does meaningfully and durably improve solvency. Directness is moderate because closing about a quarter of the imbalance supports 'helpful,' not 'necessary and fair' in full.",
        },
      ],
    },
  ],
};
