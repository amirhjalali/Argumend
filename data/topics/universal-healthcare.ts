import type { Topic } from "@/lib/schemas/topic";

export const universalHealthcareData = {
  id: "universal-healthcare",
  title: "Universal Healthcare in the US",
  meta_claim:
    "The United States should adopt a universal healthcare system, either single-payer or multi-payer, replacing the current employer-based model.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "cost-efficiency",
      title: "Cost & Efficiency",
      short_summary:
        "The U.S. spends $4.3 trillion on healthcare annually -- 17.3% of GDP. Every country with universal coverage spends less per capita and covers everyone.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Single-payer would cost $32 trillion over 10 years according to Mercatus Center estimates. Government programs are notoriously inefficient — the VA has documented wait times exceeding 30 days for 30% of veterans. Innovation in pharmaceuticals and medical devices would decline without profit incentives: the US produces 44% of global pharmaceutical R&D. You can't add 27 million people and spend less.",
      proponent_rebuttal:
        "The US already spends $4.3 trillion per year on healthcare — more than any country — while covering fewer people. Administrative costs consume 34% of US healthcare spending vs. 17% in Canada. Every other universal system achieves better outcomes at lower per-capita cost. The $32T estimate actually showed savings vs. the current trajectory of $34T+ over the same period. Consolidated purchasing power would reduce drug prices.",
      crux: {
        id: "administrative-savings-calculation",
        title: "Administrative Savings Under Single-Payer",
        description:
          "Calculating whether eliminating private insurance administration, billing complexity, and provider overhead would generate enough savings to cover the currently uninsured.",
        methodology:
          "Compare administrative costs as percentage of total spending: US multi-payer system vs. single-payer systems (Canada, Taiwan). Estimate transition costs and steady-state savings. Model drug price reductions from monopsony purchasing.",
        equation:
          "\\Delta\\text{Cost} = (\\text{Admin Savings} + \\text{Drug Savings}) - (\\text{Newly Covered} \\times \\text{Per Capita Cost})",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (Health economics modeling)",
      },
      evidence: [
        {
          id: "lancet-single-payer-savings",
          title: "Lancet: Single-Payer Would Save $450B Annually",
          description:
            "A 2020 Lancet meta-analysis of 22 single-payer cost analyses found that 19 of 22 predicted net savings. The median estimate was $450B per year in savings, primarily from administrative simplification ($200B) and drug price negotiation ($150B). The study also estimated 68,000 fewer deaths per year from universal coverage.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "The Lancet, Galvani et al. (2020)",
          reasoning:
            "Top-tier medical journal with rigorous methodology; models inherently depend on assumptions about transition efficiency and political implementation.",
        },
        {
          id: "cms-health-expenditure",
          title: "CMS: US Spends $4.3T on Healthcare (18% of GDP)",
          description:
            "The Centers for Medicare & Medicaid Services reports US national health expenditure reached $4.3 trillion in 2023 (17.6% of GDP). Per capita spending is $13,493 — roughly double the OECD average of $6,651. Despite this spending, the US has lower life expectancy and higher infant mortality than peer nations.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "CMS National Health Expenditure Data",
          reasoning:
            "Authoritative government data documenting the spending problem; doesn't directly prove a specific solution would work, but establishes the baseline.",
        },
        {
          id: "va-wait-time-data",
          title: "VA Wait Times Exceed 30 Days for Many Veterans",
          description:
            "The VA Inspector General found that 30% of veterans waited more than 30 days for primary care appointments. Some facilities had average waits exceeding 60 days. The VA scandal of 2014 revealed systematic data falsification to conceal delays. Critics argue this demonstrates government healthcare's inherent inefficiency.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "VA Inspector General, Government Accountability Office",
          reasoning:
            "Well-documented government failures, though the VA is a unique system (direct provision, not insurance) and may not generalize to a Medicare-for-All model.",
        },
        {
          id: "pharma-innovation-comparison",
          title: "US Produces 44% of Global Pharmaceutical R&D",
          description:
            "The US accounts for 44% of global pharmaceutical R&D spending and produces the plurality of new molecular entities approved worldwide. Defenders of the current system argue that high US drug prices effectively subsidize global drug development. Countries with price controls free-ride on US innovation.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "PhRMA, Congressional Research Service",
          reasoning:
            "Valid concern about innovation incentives, but PhRMA data may overstate the link between high prices and R&D (much spending goes to marketing, not research).",
        },
      ],
    },
    {
      id: "quality-access",
      title: "Quality & Access",
      short_summary:
        "Canada has universal coverage and 6-month surgical wait times. The U.S. has no waits for those who can pay and 28 million uninsured who cannot.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The US leads in cancer survival rates (5-year survival: 67% vs. 55% in UK). American medical innovation — from mRNA vaccines to robotic surgery — leads the world. Wait times in universal systems are significant: median 27.7 weeks for specialist care in Canada. People cross borders TO the US for specialized care. Equalizing access often means equalizing down.",
      proponent_rebuttal:
        "27 million Americans are uninsured and 40% skip needed care due to cost. The US ranks dead last among 11 wealthy nations on the Commonwealth Fund healthcare scorecard. Infant mortality (5.4/1,000) exceeds all peer nations. Life expectancy (77.5 years) is 3+ years below comparable countries. Medical debt is the #1 cause of personal bankruptcy — 530,000 families per year.",
      crux: {
        id: "outcomes-comparison",
        title: "Risk-Adjusted Health Outcomes Comparison",
        description:
          "Comprehensive comparison of health outcomes between the US and universal healthcare countries, controlling for demographics, lifestyle factors, and measurement differences.",
        methodology:
          "Compare outcomes (life expectancy, infant mortality, preventable death rates, patient satisfaction) across US vs. countries with universal systems. Control for obesity, gun violence, drug overdoses, and income inequality.",
        equation:
          "\\text{System Quality} = \\frac{\\sum \\text{Health Outcomes}_{\\text{adjusted}}}{\\text{Per Capita Spending}}",
        verification_status: "verified" as const,
        cost_to_verify: "$200K (International comparative analysis)",
      },
      evidence: [
        {
          id: "commonwealth-fund-ranking",
          title: "Commonwealth Fund: US Ranks Last Among 11 Nations",
          description:
            "The Commonwealth Fund's 2024 Mirror, Mirror report ranks the US last overall among 11 high-income countries on healthcare performance. The US ranks last in access, equity, and health outcomes, despite spending the most. Australia, the Netherlands, and the UK top the rankings. The US's only above-average ranking is in care process quality.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Commonwealth Fund, 'Mirror, Mirror' (2024)",
          reasoning:
            "Well-regarded comparative study with transparent methodology; somewhat limited by the Commonwealth Fund's known advocacy for universal coverage.",
        },
        {
          id: "oecd-health-outcomes",
          title: "OECD: US Lags Peers on Life Expectancy and Infant Mortality",
          description:
            "OECD data shows US life expectancy at 77.5 years, 3.2 years below the OECD average of 80.7. US infant mortality is 5.4 per 1,000 live births vs. OECD average of 4.5. The US has the highest rate of preventable deaths (amenable mortality) among wealthy nations at 112 per 100,000 vs. 55 in France.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "OECD Health Statistics",
          reasoning:
            "Highly reliable international data; directness limited because US outcomes reflect many factors beyond healthcare system design (gun violence, obesity, drug overdoses).",
        },
        {
          id: "us-cancer-survival",
          title: "US Leads in Cancer Survival Rates",
          description:
            "The US has the highest 5-year cancer survival rates among wealthy nations for most cancers. Breast cancer: 90% (US) vs. 85% (OECD). Colon cancer: 65% vs. 60%. The US leads in early detection, access to cutting-edge treatments, and clinical trial participation. For serious conditions, the US healthcare system delivers world-class care.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "CONCORD Global Surveillance, Lancet Oncology",
          reasoning:
            "Genuine US advantage; may partly reflect lead-time bias (earlier detection inflates survival stats without improving mortality) and selective access.",
        },
        {
          id: "medical-bankruptcy-data",
          title: "Medical Debt Causes 530,000 Bankruptcies Annually",
          description:
            "American Journal of Public Health research found that 66.5% of US bankruptcies are tied to medical issues — either medical bills directly or income loss due to illness. This translates to approximately 530,000 families per year. No other wealthy nation has medical bankruptcy. 79 million Americans have medical debt or are paying off medical bills.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "American Journal of Public Health, Himmelstein et al.",
          reasoning:
            "Widely cited peer-reviewed study; some methodological debate about how to attribute bankruptcy causation, but the scale of medical debt is undeniable.",
        },
      ],
    },
  ],
};
