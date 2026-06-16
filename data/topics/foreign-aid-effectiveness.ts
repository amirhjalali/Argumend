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
            "GiveWell's analysis of the Against Malaria Foundation (December 2023) estimates it costs roughly $3,000-$8,000 to avert a death in the locations where it funds insecticide-treated net campaigns. AMF supported the distribution of approximately 85 million nets across eight countries between 2012 and 2021. The Cochrane review (Lengeler 2004, 22 trials) found insecticide-treated nets avert roughly 5.5 child deaths per 1,000 children protected per year.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "GiveWell, Against Malaria Foundation review (Dec 2023)",
          sourceUrl: "https://www.givewell.org/charities/amf",
          reasoning:
            "Exceptionally well-studied intervention with strong RCT evidence. GiveWell's analysis is transparently published. Represents the best case for aid effectiveness; may not generalize to other aid types.",
        },
        {
          id: "easterly-moyo-critique",
          title: "Easterly/Moyo: Aid Creates Dependency and Funds Corruption",
          description:
            "William Easterly ('The White Man's Burden', 2006) and Dambisa Moyo ('Dead Aid', 2009) argue that general development aid fosters government dependency, reduces accountability to citizens, enables corruption, and undermines domestic institutions. Easterly distinguishes between failed top-down 'planning' and focused interventions; Moyo argues open-ended aid to Africa has been net-harmful. These are books of argument and synthesis rather than original causal estimates.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source: "William Easterly, 'The White Man's Burden' (2006); Dambisa Moyo, 'Dead Aid' (2009)",
          sourceUrl: "https://www.goodreads.com/book/show/33513.The_White_Man_s_Burden",
          reasoning:
            "Influential critiques from credentialed economists. Arguments apply most strongly to general budget support and governance aid, less to targeted health interventions. Correlation between aid and low growth doesn't prove causation.",
        },
        {
          id: "pepfar-hiv-outcomes",
          title: "PEPFAR: 25 Million Lives Saved Through Targeted HIV/AIDS Aid",
          description:
            "The President's Emergency Plan for AIDS Relief is reported to have supported antiretroviral treatment for 20.6 million people (as of FY2024) and is estimated to have saved roughly 25-26 million lives since 2003. It has also helped 5.5 million babies be born HIV-free to mothers living with HIV. Widely considered one of the most successful US foreign aid programs in history. The lives-saved figure is a program estimate, not an experimental measurement.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 9,
          },
          source: "PEPFAR / U.S. State Department; KFF PEPFAR fact sheet",
          sourceUrl: "https://www.kff.org/global-health-policy/fact-sheet/the-u-s-presidents-emergency-plan-for-aids-relief-pepfar/",
          reasoning:
            "Massive, well-documented program with clear outcome metrics. Government-reported numbers may be slightly inflated. Replicability for other diseases is uncertain. Directness is high — lives saved is the most important outcome.",
        },
        {
          id: "world-bank-aid-growth",
          title: "Rajan & Subramanian: No Robust Aid-Growth Relationship",
          description:
            "Rajan & Subramanian (2008), in the Review of Economics and Statistics, examined cross-sectional and panel data after correcting for bias and found 'little robust evidence' of a positive or negative relationship between aid inflows and a country's economic growth, and no evidence that aid works better in better policy or geographic environments. This challenged the earlier Burnside & Dollar (2000) result that aid raises growth in 'good policy environments,' which proved fragile to expanded data.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Rajan & Subramanian, Review of Economics and Statistics 90(4):643-665 (2008)",
          sourceUrl: "https://direct.mit.edu/rest/article/90/4/643/57874/Aid-and-Growth-What-Does-the-Cross-Country",
          reasoning:
            "Peer-reviewed cross-country econometrics from credentialed economists (Rajan was later RBI Governor). Independent of aid agencies, which strengthens the finding. However, aggregate growth is a crude outcome measure that may miss sectoral improvements in health and education.",
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
          title: "GiveDirectly: Cash Transfers Deliver ~90% to Recipients with RCT-Backed Impact",
          description:
            "GiveDirectly delivers roughly 90% of donated funds to recipients. Haushofer & Shapiro (2016, QJE) found large RCT increases in assets, consumption, food security, and psychological well-being among rural Kenyan recipients, with no increase in alcohol or tobacco spending. Egger et al. (2022, Econometrica) found large positive local spillovers and a transfer multiplier of ~2.5 with minimal price inflation; longer-run GiveDirectly follow-ups find consumption/asset gains sustained 5+ years after a lump-sum transfer.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Haushofer & Shapiro, QJE 131(4):1973-2042 (2016); Egger et al., Econometrica 90(6):2603-2643 (2022)",
          sourceUrl: "https://academic.oup.com/qje/article-abstract/131/4/1973/2468874",
          reasoning:
            "Strong RCT evidence published in top economics journals (Egger et al. won the 2024 Frisch Medal). GiveDirectly is the implementer of the program being studied, modestly lowering independence. Replicability is good for cash transfers specifically but doesn't validate other aid modalities.",
        },
        {
          id: "transparency-intl-corruption",
          title: "Corruption Diverts Public Funds in Weak-Governance Aid Recipients",
          description:
            "Corruption diverts a significant share of public funds in the most corrupt aid-receiving countries, undermining aid effectiveness because aid is fungible. A high-profile case is Mozambique's 'tuna bond' scandal: about $2 billion in hidden, government-guaranteed loans (2013-2014), of which at least ~$200 million was diverted as bribes and kickbacks; its 2016 exposure led the IMF, World Bank and 14 partners to suspend roughly $265M/year in aid. Note: the tuna bonds were commercial loans, not donor aid, but illustrate how weak governance compromises the fiscal environment aid flows into.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "Spotlight on Corruption / Transparency International (CIP Mozambique) on the tuna bond scandal",
          sourceUrl: "https://www.spotlightcorruption.org/mozambique-and-the-tuna-bond-scandal/",
          reasoning:
            "The specific Mozambique figures are documented by anti-corruption watchdogs and court proceedings. The earlier '20-30% of all aid is diverted' figure could not be tied to a specific verifiable source and has been dropped. Directness is moderate: the tuna bonds were not aid money, but illustrate the corruption environment in some recipients.",
        },
        {
          id: "oecd-tied-aid",
          title: "OECD: Tied Aid Raises Procurement Costs by 15-30%",
          description:
            "The OECD reports that tied aid (requiring recipients to procure goods, services, and works from the donor country) raises procurement costs by 15-30% on average, and by 40% or more for food aid, reducing the real value delivered to recipients. The OECD-DAC Recommendation on Untying ODA is the standing instrument pushing donors to untie aid.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "OECD, 'Untied aid' (OECD-DAC)",
          sourceUrl: "https://www.oecd.org/en/topics/sub-issues/oda-standards/untied-aid.html",
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
          source: "Angus Deaton, 'The Great Escape: Health, Wealth, and the Origins of Inequality' (Princeton University Press, 2013)",
          sourceUrl: "https://press.princeton.edu/books/hardcover/9780691153544/the-great-escape",
          reasoning:
            "Nobel Prize-winning economist with deep expertise. Theoretical argument is compelling but hard to test empirically (low replicability). Directness is moderate — the accountability argument applies most to budget support, less to targeted health programs.",
        },
      ],
    },
  ],
};
