import type { Topic } from "@/lib/schemas/topic";

export const foreignAidEffectivenessData = {
  id: "foreign-aid-effectiveness",
  title: "Does Foreign Aid Work?",
  meta_claim:
    "International development aid significantly improves outcomes in recipient countries and is an effective use of donor resources.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "development-outcomes",
      title: "Development Outcomes",
      short_summary:
        "Bed nets cost $2 each and prevent 500,000+ malaria deaths per year. Not all aid is this legible. Most of it is not.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Over $4.6 trillion in aid has been transferred to developing countries since 1960, yet many recipient countries remain poor. Aid creates dependency, funds corrupt governments, and distorts local markets by undercutting local producers. Dambisa Moyo's 'Dead Aid' argues that aid is the primary cause of Africa's poverty trap, not the solution.",
      proponent_rebuttal:
        "Specific, well-targeted interventions work extraordinarily well. Insecticide-treated bed nets cost $2-3 each and prevent malaria cases at $100 per DALY saved. Oral rehydration therapy, vaccines, and deworming have clear RCTs showing massive impact. Under-5 child mortality has fallen 50% since 1990, partly attributable to aid-funded health programs. The aggregate critique conflates bad aid with all aid.",
      crux: {
        id: "targeted-vs-general-aid",
        title: "Effectiveness of Targeted Health Aid vs. General Budget Support",
        description:
          "Bed nets and vaccines have clear RCT evidence behind them. Most aid categories do not. The question is how much of the portfolio the proven programs represent.",
        methodology:
          "Systematic comparison of RCT-backed targeted interventions against general budget support and governance aid, measuring cost-per-outcome and sustainability at 5 and 10-year horizons across multiple country contexts.",
        verification_status: "verified" as const,
        cost_to_verify: "$1M (Meta-analysis of existing RCTs and program evaluations)",
      },
      evidence: [
        {
          id: "givewell-bed-nets",
          title: "GiveWell: Bed Nets Among Most Cost-Effective Interventions in History",
          description:
            "GiveWell's rigorous analysis of the Against Malaria Foundation estimates that long-lasting insecticide-treated bed nets save a child's life for approximately $3,000-5,000. Multiple RCTs confirm 40-60% reductions in malaria mortality. Over 300 million nets distributed with measurable impact.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "GiveWell, Cochrane Review, Against Malaria Foundation",
          reasoning:
            "Exceptionally well-studied intervention with strong RCT evidence. GiveWell's analysis is transparently published. Represents the best case for aid effectiveness; may not generalize to other aid types.",
        },
        {
          id: "easterly-moyo-critique",
          title: "Easterly/Moyo: Aid Creates Dependency and Funds Corruption",
          description:
            "William Easterly ('The White Man's Burden') and Dambisa Moyo ('Dead Aid') argue that general development aid creates government dependency, reduces accountability to citizens, funds corruption (an estimated 25% of World Bank loans are misused), and undermines domestic institutions. Countries receiving the most aid per capita have not grown faster.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "William Easterly (NYU), Dambisa Moyo",
          reasoning:
            "Influential critiques from credentialed economists. Arguments apply most strongly to general budget support and governance aid, less to targeted health interventions. Correlation between aid and low growth doesn't prove causation.",
        },
        {
          id: "pepfar-hiv-outcomes",
          title: "PEPFAR: 25 Million Lives Saved Through Targeted HIV/AIDS Aid",
          description:
            "The President's Emergency Plan for AIDS Relief has provided antiretroviral treatment to over 20 million people and is estimated to have saved 25 million lives since 2003. HIV-related deaths in PEPFAR focus countries have declined by 68%. Widely considered the most successful US foreign aid program in history.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source: "PEPFAR, UNAIDS, Institute for Health Metrics and Evaluation",
          reasoning:
            "Massive, well-documented program with clear outcome metrics. Government-reported numbers may be slightly inflated. Replicability for other diseases is uncertain. Directness is high — lives saved is the most important outcome.",
        },
        {
          id: "world-bank-aid-growth",
          title: "World Bank Meta-Analysis: No Robust Aid-Growth Relationship",
          description:
            "Multiple econometric studies, including World Bank-commissioned research, have failed to find a robust positive relationship between aggregate aid flows and economic growth across countries. Burnside & Dollar initially found aid works in 'good policy environments,' but this finding did not replicate in subsequent analyses with expanded datasets.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "World Bank Research, Rajan & Subramanian (2008)",
          reasoning:
            "World Bank's own research undermining the aid-growth narrative is powerful for its independence. However, aggregate growth is a crude outcome measure that may miss sectoral improvements in health and education.",
        },
      ],
    },
    {
      id: "efficiency-accountability",
      title: "Efficiency & Accountability",
      short_summary:
        "Estimates suggest 10-30% of aid funds are lost to corruption and administrative overhead. Defenders say that still beats doing nothing.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Only 30-40% of aid reaches the intended recipients, with the rest consumed by overhead, consultant fees, and corruption. Tied aid — which requires recipients to purchase goods from the donor country — serves donor economic interests more than recipient needs. Aid conditionality often backfires, imposing harmful structural adjustment. The aid industry itself employs hundreds of thousands of well-paid professionals in donor countries.",
      proponent_rebuttal:
        "Cash transfer programs bypass overhead entirely and put money directly in the hands of the poor. GiveDirectly's model shows that 90%+ of donations reach recipients, and rigorous studies show cash transfers improve nutrition, education, and business investment. Aid transparency has improved dramatically since the 2000s with IATI reporting standards. Comparing aid efficiency to doing nothing is the wrong counterfactual — the question is whether it's better than alternatives.",
      crux: {
        id: "delivery-mechanism-comparison",
        title: "Aid Delivery Mechanism Efficiency Comparison",
        description:
          "Head-to-head comparison of cost-per-outcome across aid delivery mechanisms: traditional project aid, budget support, NGO programs, direct cash transfers, and multilateral channels.",
        methodology:
          "Track $1 of aid from donor commitment through to measurable outcome (health, education, income) across different delivery mechanisms in the same country contexts. Include all overhead, administrative costs, and leakage at each stage.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Multi-country tracer study with outcome measurement)",
      },
      evidence: [
        {
          id: "givedirectly-cash-transfers",
          title: "GiveDirectly: Cash Transfers Deliver 90%+ to Recipients with Proven Impact",
          description:
            "GiveDirectly's unconditional cash transfer model delivers over 90 cents of every dollar to extreme poor recipients. RCTs show recipients invest in housing, nutrition, education, and small businesses. A 12-year follow-up found sustained improvements in assets, consumption, and food security with no increase in alcohol or tobacco spending.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "GiveDirectly, Haushofer & Shapiro (2016), Egger et al. (2022)",
          reasoning:
            "Strong RCT evidence from multiple countries. GiveDirectly is both the subject and funder of some research, lowering independence. Replicability is good for cash transfers specifically but doesn't validate other aid modalities.",
        },
        {
          id: "transparency-intl-corruption",
          title: "Transparency International: Corruption Diverts 25-30% of Aid in Weak Governance Countries",
          description:
            "Transparency International estimates that corruption siphons 20-30% of public funds in the most corrupt aid-receiving countries. High-profile scandals include $1 billion stolen from Mozambique's tuna bond scheme (partly donor-funded) and systematic diversion of food aid in Somalia. Even well-intentioned aid enables corruption by providing fungible resources.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Transparency International, Global Corruption Report",
          reasoning:
            "Well-regarded anti-corruption organization with global data. Estimates are necessarily imprecise — corruption is hidden by nature. Directness is good because diversion directly undermines aid effectiveness.",
        },
        {
          id: "oecd-tied-aid",
          title: "OECD: Tied Aid Reduces Value by 15-30% and Serves Donor Interests",
          description:
            "The OECD estimates that tied aid (requiring purchases from donor country firms) reduces the value of aid by 15-30% through higher procurement costs. While formally tied aid has decreased to ~20% of bilateral aid, informal tying through consultancy contracts and technical assistance remains prevalent.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "OECD Development Assistance Committee",
          reasoning:
            "Highly authoritative inter-governmental source. Data is well-documented. Directly demonstrates inefficiency in the aid system, though the trend toward untying is positive.",
        },
        {
          id: "deaton-great-escape",
          title: "Deaton: Aid Undermines State-Building and Accountability",
          description:
            "Nobel laureate Angus Deaton argues in 'The Great Escape' that aid weakens the social contract between governments and citizens. When governments get revenue from donors rather than taxation, they are accountable to donors, not citizens. This undermines democratic governance, state capacity, and long-run institutional development — the very foundations of sustainable growth.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "Angus Deaton, 'The Great Escape' (2013)",
          reasoning:
            "Nobel Prize-winning economist with deep expertise. Theoretical argument is compelling but hard to test empirically (low replicability). Directness is moderate — the accountability argument applies most to budget support, less to targeted health programs.",
        },
      ],
    },
  ],
};
