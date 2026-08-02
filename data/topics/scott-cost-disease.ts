export const scottCostDiseaseData = {
  id: "scott-cost-disease",
  title: "The Cost Disease",
  meta_claim:
    "Since roughly 1960, the real (inflation-adjusted) cost of U.S. health care, K–12 and higher education, and infrastructure has risen several-fold with little or no matching gain in measured output — a genuine 'cost disease' — and it is produced by a stack of reinforcing causes rather than any single villain.",
  status: "contested" as const,
  category: "economics" as const,
  references: [
    {
      title: "Considerations on Cost Disease (Scott Alexander, SSC 2017)",
      url: "https://slatestarcodex.com/2017/02/09/considerations-on-cost-disease/",
    },
    {
      title:
        "Why Are the Prices So D*mn High? (Helland & Tabarrok, Mercatus 2019)",
      url: "https://www.mercatus.org/research/books/why-are-prices-so-damn-high",
    },
    {
      title: "Transit Costs Project (NYU Marron Institute)",
      url: "https://transitcosts.com/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is it one disease or five?",
      content:
        "Scott's 2017 essay lined up candidate explanations — Baumol, regulation, administrative bloat, subsidized demand, risk-aversion — and declined to pick. This map assigns each a weight and, more importantly, the specific decomposition that would settle its share.",
    },
    {
      id: "q2",
      title: "Did we get more for the money?",
      content:
        "The whole phenomenon hinges on whether output held flat while spending multiplied. If modern medicine and schooling are silently far better than their 1960 versions, much of the 'disease' is a measurement artifact.",
    },
    {
      id: "q3",
      title: "Why do only some sectors have it?",
      content:
        "Haircuts and restaurants are just as labor-intensive as teaching, yet their real prices barely moved. The sectors that exploded — health, education, construction — share a second ingredient beyond low productivity growth.",
    },
  ],
  pillars: [
    {
      id: "baumol-effect",
      title: "The Baumol Effect (the null hypothesis)",
      short_summary:
        "Labor-intensive services can't automate, so as wages rise economy-wide their relative prices must climb — no villain required.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Baumol is the boring default and it fits: a teacher or nurse in 2020 does roughly what one did in 1960, but must be paid a 2020 wage set by economy-wide productivity. Rising relative prices are a mechanical accounting identity, not a pathology to be fixed.",
      proponent_rebuttal:
        "Baumol predicts higher prices — it does NOT predict flat or falling output. Yet U.S. K–12 delivered flat NAEP scores while real per-pupil spending doubled, and some Baumol-exposed sectors (restaurants, haircuts) never exploded. Baumol is the floor of the stack, not the whole building.",
      crux: {
        id: "wage-decomposition",
        title: "The Wage-Decomposition Test",
        description:
          "Split each sector's real cost growth into the part explained by (labor share × economy-wide relative wage growth) versus a residual. If Baumol is the primary driver, the residual is small; if the residual is large, other mechanisms dominate.",
        methodology:
          "Using BLS/BEA sector accounts, compute labor share and relative-wage growth for health, education, and construction. Attribute the Baumol-predicted price path and measure the unexplained residual per sector, decade by decade.",
        equation:
          "\\Delta P_{sector} = s_L \\cdot \\Delta w_{econ} + \\underbrace{\\varepsilon}_{\\text{residual}}",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (public BLS/BEA data; Helland–Tabarrok replication)",
      },
      evidence: [
        {
          id: "helland-tabarrok",
          title: "Helland & Tabarrok: Baumol carries the majority",
          description:
            "Their 2019 Mercatus study concludes the Baumol mechanism accounts for the bulk of real price growth in education and a substantial share in health care — the sectors that exploded are the least automatable.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "Helland & Tabarrok, Mercatus Center (2019)",
          sourceUrl:
            "https://www.mercatus.org/research/books/why-are-prices-so-damn-high",
          reasoning:
            "Careful, data-driven, and directly on the decomposition question — but authored by advocates of the Baumol reading.",
        },
        {
          id: "baumol-book",
          title: "Baumol's original mechanism",
          description:
            "Baumol & Bowen (1966) and Baumol's 'The Cost Disease' (2012) formalize why productivity-lagging services rise in relative price as the rest of the economy automates.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Baumol, Yale University Press (2012)",
          sourceUrl:
            "https://yalebooks.yale.edu/book/9780300188486/the-cost-disease/",
          reasoning: "Foundational theory, widely reproduced; less direct on U.S. magnitudes.",
        },
        {
          id: "haircut-counterexample",
          title: "The haircut counterexample",
          description:
            "Personal services like haircuts and restaurant meals are just as labor-bound as teaching, yet their real prices grew only modestly — implying Baumol alone can't explain the outliers.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Synthesis / inference — cross-sector price comparison, not a single study",
          reasoning:
            "A clean logical counterexample, though quantifying it precisely is harder than stating it.",
        },
        {
          id: "flat-output",
          title: "Flat output breaks the pure-Baumol story",
          description:
            "NAEP long-term-trend scores for 17-year-olds are essentially flat since the 1970s while real per-pupil spending rose dramatically — Baumol predicts higher prices, not stagnant results.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "NAEP Long-Term Trend Assessment",
          sourceUrl: "https://nces.ed.gov/pubs/web/96344han.asp",
          reasoning:
            "Strong, well-measured — but speaks to quantity/quality, not directly to the price mechanism.",
        },
      ],
    },
    {
      id: "administrative-bloat",
      title: "Administrative Bloat & Third-Party Payment",
      short_summary:
        "Layers of administrators, billers, and compliance staff — funded by insurers and government who write the checks — inflate cost without adding output.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Some administrative growth is the genuine coordination cost of modern, complex care and regulation. And even a large admin share is arithmetically too small to explain a 5x rise in total cost on its own.",
      proponent_rebuttal:
        "The share isn't small and it's cross-nationally anomalous: U.S. health-care administration ran about four times the per-capita cost of single-payer Canada, and university administrator ranks grew far faster than faculty or enrollment for decades. When the payer isn't the patient, no one prices the paperwork.",
      crux: {
        id: "cross-national-admin-gap",
        title: "The Cross-National Admin-Share Gap",
        description:
          "Compare systems that produce similar health outcomes but differ in payment structure (U.S. multi-payer vs. Canada/single-payer). The administrative-cost delta at equal outcomes is the bloat attributable to payment complexity.",
        methodology:
          "Using OECD and Himmelstein et al. (2020) accounts, hold outcome measures (life expectancy, amenable mortality) roughly constant and attribute the residual administrative-spending gap between matched systems.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (OECD + Annals of Internal Medicine 2020 data)",
      },
      evidence: [
        {
          id: "himmelstein-2020",
          title: "U.S. health admin ≈ 4x Canada per capita",
          description:
            "Himmelstein et al. (Annals of Internal Medicine, 2020) put U.S. health-care administrative costs at ~$2,497 per capita versus ~$551 in Canada (2017) — roughly a third of U.S. health spending.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Himmelstein, Campbell & Woolhandler, Annals of Internal Medicine (2020)",
          sourceUrl: "https://www.acpjournals.org/doi/10.7326/M19-2818",
          reasoning:
            "Peer-reviewed, cross-national, directly measures the administrative share.",
        },
        {
          id: "ginsberg-admin",
          title: "The all-administrative university",
          description:
            "Ginsberg's 'The Fall of the Faculty' (2011) documents administrator and administrative-staff headcount growing far faster than faculty or students across U.S. higher education.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Ginsberg, Oxford University Press (2011)",
          sourceUrl: "https://academic.oup.com/book/40915",
          reasoning:
            "Well-documented staffing trend; attributing causation to cost is the softer step.",
        },
        {
          id: "admin-is-real-coordination",
          title: "Some admin is genuine coordination cost",
          description:
            "Modern care coordinates specialists, imaging, pharmacology, and liability in ways 1960 medicine didn't — part of the administrative layer buys real (if unglamorous) output.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source: "Synthesis / inference — qualitative steelman of administrative output",
          reasoning:
            "A fair steelman, but hard to size; much of the U.S.–Canada gap survives it.",
        },
      ],
    },
    {
      id: "bennett-hypothesis",
      title: "Subsidized-Demand Inflation (the Bennett Hypothesis)",
      short_summary:
        "When government aid or insurance makes the buyer price-insensitive, providers can raise list prices and capture the subsidy.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Subsidies exist to expand access, and empirical pass-through estimates are all over the map. Besides, K–12 has cost disease without the tuition-style demand subsidy that college has — so subsidy can't be the general mechanism.",
      proponent_rebuttal:
        "Where the natural experiment is cleanest, the pass-through is large: the New York Fed found roughly 60 cents of each subsidized federal-loan dollar showed up as higher tuition. Insurance plays the analogous role in health care, blunting the price signal at the point of sale.",
      crux: {
        id: "subsidy-natural-experiment",
        title: "The Subsidy Natural Experiment",
        description:
          "Measure how list prices respond to exogenous changes in aid caps or loan-eligibility rules. A high pass-through coefficient means subsidies are being captured as price rather than expanding real access.",
        methodology:
          "Exploit discrete policy changes in federal loan caps (and Medicare/Medicaid reimbursement rules) as instruments; estimate the tuition/price response with a difference-in-differences design, per Lucca, Nadauld & Shen (2015).",
        equation:
          "\\frac{\\partial \\text{Tuition}}{\\partial \\text{Subsidy}} \\approx 0.60",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (NY Fed Staff Report No. 733)",
      },
      evidence: [
        {
          id: "lucca-nadauld-shen",
          title: "~60c of each aid dollar becomes tuition",
          description:
            "Lucca, Nadauld & Shen (NY Fed Staff Report 733, 2015; later in Review of Financial Studies) found expansions in subsidized federal loans passed through to higher sticker tuition at roughly 60 cents on the dollar.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Lucca, Nadauld & Shen, Federal Reserve Bank of New York (2015)",
          sourceUrl: "https://www.newyorkfed.org/research/staff_reports/sr733",
          reasoning:
            "Credibly identified natural experiment, directly on the mechanism — though specific to subsidized loans.",
        },
        {
          id: "insurance-price-insensitivity",
          title: "Insurance dulls the health-care price signal",
          description:
            "With third parties paying most bills, patients rarely see or shop on price, weakening the discipline that constrains costs in normally competitive markets.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "RAND Health Insurance Experiment",
          sourceUrl:
            "https://www.rand.org/content/dam/rand/pubs/research_briefs/2006/RAND_RB9174.pdf",
          reasoning: "Widely accepted mechanism; harder to cleanly quantify than the loan case.",
        },
        {
          id: "k12-counterexample",
          title: "K–12 has the disease without the subsidy",
          description:
            "Public schooling is tax-funded, not demand-subsidized through a tuition market, yet still shows cost disease — so subsidy capture can't be the universal explanation.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "National Center for Education Statistics, 'Why We Worry About Education'",
          sourceUrl: "https://nces.ed.gov/pubs/web/96344han.asp",
          reasoning: "A genuine limit on the hypothesis's scope.",
        },
      ],
    },
    {
      id: "regulatory-procurement",
      title: "Regulatory & Procurement Dysfunction",
      short_summary:
        "The U.S. builds physical things — subways, housing, highways — at multiples of peer-nation cost, driven by litigation, consultants, and weak state capacity.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Cross-country comparisons are apples-to-oranges: geology, labor law, wages, density, and project scope all differ. Some of the apparent gap is measurement, not dysfunction.",
      proponent_rebuttal:
        "Matched-project studies control for exactly that and the gap survives: U.S. subway tunneling runs several times French or Korean costs for comparable work, and per-mile Interstate costs tripled as litigation and 'citizen voice' grew. This is the one branch of cost disease with no productivity-growth excuse — a tunnel is a tunnel.",
      crux: {
        id: "matched-project-ratio",
        title: "The Matched-Project Cost Ratio",
        description:
          "Compare like-for-like projects (e.g., bored subway tunnels of similar geology and length) across countries, controlling for wages and ground conditions. A persistent multiple isolates institutional/process cost from physical cost.",
        methodology:
          "Use the Transit Costs Project database to pair comparable tunneling projects internationally; regress out wage and geological controls; the residual country multiple is the dysfunction estimate.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (Transit Costs Project open database)",
      },
      evidence: [
        {
          id: "transit-costs-project",
          title: "U.S. transit costs multiples of peers",
          description:
            "The NYU Marron Transit Costs Project documents U.S. subway construction at several times comparable European and Asian costs — New York's Second Avenue Subway ran roughly $2.5 billion per mile.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Transit Costs Project, NYU Marron Institute",
          sourceUrl: "https://transitcosts.com/",
          reasoning:
            "Explicitly matched-project methodology aimed at this exact question.",
        },
        {
          id: "brooks-liscow",
          title: "Interstate costs tripled with 'citizen voice'",
          description:
            "Brooks & Liscow (AEJ: Applied, 2023) find real per-mile U.S. Interstate spending roughly tripled from the 1960s to the 1980s, tied to rising land costs and litigation/participation requirements.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Brooks & Liscow, American Economic Journal: Applied Economics (2023)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257%2Fapp.20200398",
          reasoning:
            "Peer-reviewed, well-identified, directly on rising physical-build cost over time.",
        },
        {
          id: "scope-geography",
          title: "Scope and geography confound comparisons",
          description:
            "Differences in station scope, utility relocation, wages, and urban density explain part — though studies suggest not most — of the international cost gap.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Transit Costs Project Final Report, NYU Marron Institute (2023)",
          sourceUrl:
            "https://transitcosts.com/transit-costs-study-final-report/",
          reasoning: "A real caveat that trims, but does not close, the measured gap.",
        },
      ],
    },
    {
      id: "measurement-artifact",
      title: "Or: We Just Mismeasure the Quality",
      short_summary:
        "The steelman for 'no disease at all': a 2020 hospital and a 1960 hospital are not the same product, and we fail to price the improvement.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Modern medicine cures cancers and manages HIV that 1960 medicine could only watch. If we quality-adjusted properly, much of the apparent cost explosion would reveal itself as buying a genuinely better good — cost disease as a statistical illusion.",
      proponent_rebuttal:
        "Quality-adjustment rescues some of health care but breaks on the other sectors: K–12 outcomes (NAEP) are flat despite doubled real spending, and U.S. life-expectancy gains stalled and then reversed in the late 2010s even as spending rose. You cannot mismeasure your way out of flat outputs.",
      crux: {
        id: "outcome-adjusted-index",
        title: "The Outcome-Adjusted Price Index",
        description:
          "Rebuild each sector's price series on a per-outcome basis — cost per QALY, cost per NAEP point, cost per passenger-mile. If outcome-adjusted prices are flat, the disease is measurement; if they still rise, it's real.",
        methodology:
          "Construct hedonic/outcome-denominated indices for each sector and compare their trend to the raw price trend. Divergence quantifies how much of 'cost disease' is unpriced quality.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$50K (hedonic index construction across sectors)",
      },
      evidence: [
        {
          id: "medicine-improved",
          title: "Health care really did improve",
          description:
            "Statins, antiretrovirals, minimally invasive surgery, and modern oncology deliver outcomes unavailable at any price in 1960 — real quality gains that raw price indices ignore.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Synthesis / inference — broad historical quality adjustment across treatments",
          reasoning:
            "Clearly true for health care; the question is how much of the cost it justifies.",
        },
        {
          id: "naep-flat",
          title: "Schooling outputs are flat",
          description:
            "NAEP long-term-trend scores for 17-year-olds barely moved since the 1970s while real per-pupil spending rose dramatically — leaving no measured achievement gain to absorb the extra cost.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "NAEP Long-Term Trend Assessment",
          sourceUrl: "https://nces.ed.gov/pubs/web/96344han.asp",
          reasoning:
            "Strong, hard-to-dismiss evidence that at least one sector's disease is real, not measured.",
        },
        {
          id: "life-expectancy-stall",
          title: "Life-expectancy gains stalled",
          description:
            "U.S. life expectancy plateaued in the 2010s and fell before the pandemic even as health spending kept climbing — hard to square with a pure quality-improvement story.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "CDC / National Vital Statistics",
          sourceUrl:
            "https://www.cdc.gov/nchs/data/hestat/life-expectancy/lifeexpectancy-H.pdf",
          reasoning:
            "Directly undercuts the 'we're buying more health' defense in the flagship sector.",
        },
      ],
    },
  ],
};
