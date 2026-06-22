import type { Topic } from "@/lib/schemas/topic";

export const universalHealthcareData = {
  id: "universal-healthcare",
  title: "Universal Healthcare in the US",
  meta_claim:
    "The United States should adopt a universal healthcare system, either single-payer or multi-payer, replacing the current employer-based model.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The U.S. spends about $14,570 per person per year on healthcare — roughly double the average of other wealthy nations — yet has lower life expectancy (~77 years) and higher infant mortality than nearly all of them.",
    confidence: 95,
    source:
      "CMS National Health Expenditure (2023); OECD Health at a Glance (2023); Peterson-KFF Health System Tracker",
    sourceUrl:
      "https://www.healthsystemtracker.org/chart-collection/health-spending-u-s-compare-countries/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The U.S. already runs the most expensive health system in the world — about double the per-person cost of peer countries — while leaving roughly 26 million people uninsured and ranking near the bottom of wealthy nations on life expectancy and infant mortality.",
    "The serious debate is no longer whether the status quo is wasteful (it plainly is) but whether switching to a universal system would actually capture those savings without importing new problems like long waits or weaker drug innovation.",
    "Most independent cost analyses (19 of 22 in one review) project net savings from cutting administrative overhead and negotiating drug prices — but those models assume a clean transition and political discipline the U.S. has never tested, so the real fight is about execution risk, not the diagnosis.",
  ],
  pillars: [
    {
      id: "cost-efficiency",
      title: "Cost & Efficiency",
      short_summary:
        "The U.S. spends $4.9 trillion on healthcare annually -- 17.6% of GDP, about $14,570 per person. Every country with universal coverage spends less per capita and covers everyone.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The Mercatus Center estimated Senator Sanders's Medicare for All Act would add roughly $32 trillion in new federal spending over 10 years — a near-doubling of the federal budget that doubling all individual and corporate income taxes would not cover. Government-run delivery has documented failures: a 2014 VA audit found more than 120,000 veterans left waiting or never seen, with schedulers falsifying records to hide the delays. And the US is the dominant funder of pharmaceutical innovation — PhRMA members account for the large majority of industry R&D per the CBO — so price controls risk weakening the global pipeline. Covering roughly 26 million more people while cutting total spending is not guaranteed.",
      proponent_rebuttal:
        "The US already spends $4.9 trillion per year on healthcare (17.6% of GDP, about $14,570 per person) — more than any country — while leaving millions uncovered. A 2017 study by Woolhandler and Himmelstein found administration consumed 34.2% of US health spending versus 17.0% in Canada. Every other wealthy universal system achieves comparable or better outcomes at lower per-capita cost. The same Mercatus analysis that produced the $32T federal figure also projected total national health spending of about $57.6 trillion under Medicare for All versus roughly $59.4 trillion on the current trajectory over 2022-2031 — a net reduction — driven largely by administrative simplification and monopsony drug-price negotiation.",
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
        falsification: {
          supporter_flip:
            "Credible natural-experiment evidence that single-payer transitions reliably FAIL to capture their projected administrative savings — total national spending rising rather than falling once a real system absorbs higher utilization, political carve-outs, and provider pushback — or that monopsony drug pricing measurably collapses the innovation pipeline the U.S. disproportionately funds, would break the efficiency case for switching.",
          skeptic_flip:
            "A cost-focused skeptic should update toward 'a universal system can cover everyone for less' as independent models keep converging on net savings (19 of 22 in the PLOS review), and as traditional Medicare keeps posting far lower administrative overhead than private insurers at U.S. scale.",
          common_ground:
            "Both sides agree the U.S. already spends far more per capita than any peer nation and still leaves ~26 million uninsured — the current system is the most expensive in the world.",
          live_disagreement:
            "Whether the projected administrative and drug-price savings would actually materialize in a real U.S. transition, or get eaten by higher utilization, political compromises, and provider resistance — and what that does to pharmaceutical innovation.",
        },
      },
      evidence: [
        {
          id: "lancet-single-payer-savings",
          title: "Lancet: Single-Payer Would Save $450B Annually, Prevent 68,000 Deaths",
          description:
            "A 2020 Lancet study by Galvani et al. modeled a US single-payer (Medicare for All) system and estimated it would yield a 13% reduction in national health expenditure — equivalent to more than $450B per year in savings — while preventing more than 68,000 deaths and 1.73 million life-years lost annually compared with the status quo.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "The Lancet, Galvani et al. (2020)",
          sourceUrl:
            "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(19)33019-3/fulltext",
          reasoning:
            "Top-tier medical journal with rigorous methodology; this is a single Yale-led model, not a literature review, and its results depend on assumptions about transition efficiency and political implementation.",
        },
        {
          id: "plos-single-payer-review",
          title: "PLOS Medicine: 19 of 22 Cost Analyses Predict Single-Payer Savings",
          description:
            "A 2020 PLOS Medicine systematic review by Cai et al. of 22 economic analyses of US single-payer financing found that 19 (86%) predicted net savings in the first year of operation, with the largest projected savings coming from administrative simplification and drug-price negotiation. Estimates ranged from a 7% net cost increase to a 15% net cost reduction.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "PLOS Medicine, Cai et al. (2020)",
          sourceUrl:
            "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003013",
          reasoning:
            "Peer-reviewed systematic review aggregating across 22 independent models gives strong replicability; the underlying analyses span advocacy and non-advocacy sources, and the near-consensus on savings is robust to that heterogeneity.",
        },
        {
          id: "cms-health-expenditure",
          title: "CMS: US Spends $4.9T on Healthcare (17.6% of GDP)",
          description:
            "The Centers for Medicare & Medicaid Services reports US national health expenditure reached $4.9 trillion in 2023, or 17.6% of GDP, growing 7.5% from 2022. Per capita spending was $14,570 — far above peer nations. Despite this spending, the US has lower life expectancy and higher infant mortality than other wealthy countries.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "CMS National Health Expenditure Data (2023)",
          sourceUrl:
            "https://www.cms.gov/data-research/statistics-trends-and-reports/national-health-expenditure-data/nhe-fact-sheet",
          reasoning:
            "Authoritative government data documenting the spending problem; doesn't directly prove a specific solution would work, but establishes the baseline.",
        },
        {
          id: "va-wait-time-data",
          title: "2014 VA Scandal: Long Wait Times and Falsified Records",
          description:
            "A 2014 VA internal audit found more than 120,000 veterans were left waiting or never got care, and the VA Office of Inspector General documented systematic falsification of scheduling data to conceal delays at facilities including Phoenix, where some patients waited far longer than reported. Critics argue this demonstrates risks of government-run healthcare.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source: "VA Office of Inspector General, Report 14-02603-267 (2014)",
          sourceUrl:
            "https://www.vaoig.gov/sites/default/files/reports/2014-08/VAOIG-14-02603-267.pdf",
          reasoning:
            "Well-documented government failures, though the VA is a unique system (direct government provision of care, not insurance) and may not generalize to a Medicare-for-All insurance model. Directness lowered: the headline '30 days' figure was not verified, so the description now reflects the audit and OIG findings.",
        },
        {
          id: "pharma-innovation-comparison",
          title: "The US Is the Leading Source of Pharmaceutical R&D",
          description:
            "The US biopharmaceutical sector is the world's largest source of drug R&D and new molecular entities. A 2021 Congressional Budget Office report notes that PhRMA member companies' worldwide R&D, much of it US-based, accounts for roughly 75-85% of the industry total. Defenders of the current system argue high US drug prices effectively subsidize global drug development and that price-control countries free-ride on US innovation.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source: "Congressional Budget Office, 'Research and Development in the Pharmaceutical Industry' (2021)",
          sourceUrl: "https://www.cbo.gov/publication/57126",
          reasoning:
            "Valid concern about innovation incentives, but the link between high US prices and global R&D is contested (much industry spending goes to marketing, not research). Weights lowered and the previously cited '44% of global R&D' figure removed: it could not be verified against a primary source, so the claim now reflects the CBO's PhRMA-share finding.",
        },
      ],
    },
    {
      id: "quality-access",
      title: "Quality & Access",
      short_summary:
        "Canada has universal coverage but a record 27.7-week median wait from referral to treatment. The U.S. has minimal waits for those who can pay and roughly 26 million uninsured who cannot.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The US leads on many cancer survival metrics — CONCORD-3 put US 5-year breast-cancer survival at 90.2%, among the highest worldwide, and US prostate-cancer survival far exceeds the UK's. American medical innovation — from mRNA vaccines to robotic surgery — leads the world. Wait times in universal systems are significant: the Fraser Institute measured a record median of 27.7 weeks from GP referral to treatment in Canada in 2023. People cross borders TO the US for specialized care. Equalizing access can mean equalizing down.",
      proponent_rebuttal:
        "Roughly 26 million Americans are uninsured and many more skip needed care because of cost. The US ranks dead last overall among the 10 high-income nations in the Commonwealth Fund's 2024 Mirror, Mirror scorecard, despite spending the most. US infant mortality (about 5.4-5.6 per 1,000) is among the highest of peer nations, and US life expectancy (about 77 years) sits roughly 3 years below the OECD average. Medical problems contribute to about 66.5% of US bankruptcies — an estimated 530,000 families per year — a phenomenon essentially unique to the US among wealthy nations.",
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
        falsification: {
          supporter_flip:
            "If risk-adjusted comparisons that strip out non-system factors — U.S. obesity, gun deaths, drug overdoses, which aren't failures of healthcare financing — erased most of the outcome gap, showing the U.S. system itself performs about as well as universal peers, the 'worse outcomes' argument for switching would lose most of its force.",
          skeptic_flip:
            "A skeptic impressed by U.S. cancer-survival leadership should weigh that those wins are concentrated among the insured, while the metrics where the U.S. ranks worst — avoidable mortality and access — track the ~26 million without coverage; broad population health, not best-case specialty care, is what universal coverage targets.",
          common_ground:
            "Both sides agree U.S. specialty and cancer care is genuinely world-class for those who can access it, and that the U.S. trails peer nations on population-level metrics like life expectancy and infant mortality.",
          live_disagreement:
            "How much of the U.S. outcome gap is caused by the financing system (insurance gaps, cost barriers to care) versus non-system factors (obesity, violence, overdoses, inequality) that universal coverage alone would not fix.",
        },
      },
      evidence: [
        {
          id: "commonwealth-fund-ranking",
          title: "Commonwealth Fund: US Ranks Last Among 10 Nations",
          description:
            "The Commonwealth Fund's 2024 Mirror, Mirror report ranks the US last overall among 10 high-income countries on healthcare performance, despite spending the most. The US ranks lowest on health outcomes, access, and equity. Australia, the Netherlands, and the UK are the top performers. Care process is the one area where the US scores closer to average.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Commonwealth Fund, 'Mirror, Mirror 2024'",
          sourceUrl:
            "https://www.commonwealthfund.org/publications/fund-reports/2024/sep/mirror-mirror-2024",
          reasoning:
            "Well-regarded comparative study with transparent methodology; somewhat limited by the Commonwealth Fund's known advocacy for universal coverage.",
        },
        {
          id: "oecd-health-outcomes",
          title: "OECD: US Lags Peers on Life Expectancy and Infant Mortality",
          description:
            "OECD Health at a Glance data shows US life expectancy around 77 years, roughly 3 years below the OECD average of about 80, ranking near the bottom of member countries. US infant mortality is 5.4 per 1,000 live births, among the highest in the OECD. The US also has one of the highest rates of avoidable (treatable plus preventable) mortality among wealthy nations.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "OECD, 'Health at a Glance 2023'",
          sourceUrl:
            "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
          reasoning:
            "Highly reliable international data; directness limited because US outcomes reflect many factors beyond healthcare system design (gun violence, obesity, drug overdoses).",
        },
        {
          id: "us-cancer-survival",
          title: "US Leads in Cancer Survival Rates",
          description:
            "The CONCORD-3 global study (The Lancet, 2018) found the US among the countries with the highest 5-year net cancer survival for most cancers. US 5-year breast-cancer survival for women diagnosed 2010-14 was 90.2%, among the highest worldwide. The US leads in early detection, access to cutting-edge treatments, and clinical-trial participation. For serious conditions, US care is world-class.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "CONCORD-3, Allemani et al., The Lancet (2018)",
          sourceUrl:
            "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(17)33326-3/fulltext",
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
          source: "American Journal of Public Health, Himmelstein et al. (2019)",
          sourceUrl:
            "https://ajph.aphapublications.org/doi/10.2105/AJPH.2018.304901",
          reasoning:
            "Widely cited peer-reviewed study; some methodological debate about how to attribute bankruptcy causation, but the scale of medical debt is undeniable.",
        },
      ],
    },
  ],
};
