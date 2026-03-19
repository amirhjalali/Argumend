import type { Topic } from "@/lib/schemas/topic";

export const labGrownMeatData = {
  id: "lab-grown-meat-adoption",
  title: "Lab-Grown Meat Adoption",
  meta_claim:
    "Cultivated (lab-grown) meat will become cost-competitive with conventional meat and achieve significant market adoption within the next 15 years.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "cost-scalability",
      title: "Cost & Scalability",
      short_summary:
        "In 2013, the first lab-grown burger cost $330,000. By 2024, some producers claim costs under $10/lb. The gap to $3/lb ground beef remains stubborn.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The first lab-grown burger in 2013 cost $330,000 to produce. Despite years of investment and promises, cultivated meat remains far too expensive for mass markets. Scaling cell culture from laboratory flasks to industrial bioreactors faces fundamental biological challenges: maintaining sterility, preventing cell death, and producing structured cuts (not just mince). Funding has slowed significantly in 2024-2025 as investors reassess feasibility.",
      proponent_rebuttal:
        "Costs have dropped by over 99% since 2013. A 2024 peer-reviewed study reported production costs of $6.20/lb for cultivated chicken as a hybrid plant-and-cell-based product at scale. The global market was valued at $1.03 billion in 2024 and is projected to reach $10.8 billion by 2033 (CAGR 16.5%). AI and machine learning integration in 2025 is optimizing cell growth conditions and reducing production time.",
      crux: {
        id: "cost-parity-timeline",
        title: "Cost Parity with Conventional Meat",
        description:
          "Determining when (or whether) cultivated meat production costs will reach parity with conventionally farmed chicken ($3-4/lb) and beef ($5-8/lb).",
        methodology:
          "Track production costs across leading cultivated meat companies quarterly. Model cost curves based on bioreactor scaling, cell line optimization, and growth medium costs. Compare to conventional meat prices including externalities (environmental costs).",
        equation:
          "t_{\\text{parity}} = t_0 + \\frac{\\ln(C_{\\text{current}}/C_{\\text{target}})}{r_{\\text{cost reduction}}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Techno-economic analysis with industry data)",
      },
      evidence: [
        {
          id: "cost-reduction-trajectory",
          title: "Cultivated Chicken Cost Down to $6.20/lb at Scale",
          description:
            "A 2024 peer-reviewed study published in the journal Food Research International reported that cultivated chicken meat produced as a hybrid plant-and-cell-based product could be manufactured at $6.20/lb at scale. This represents a >99.99% cost reduction from the $330,000 first burger in 2013.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "Food Research International (2024)",
          reasoning:
            "Peer-reviewed but based on modeled costs at projected scale rather than actual production at that scale. The hybrid approach (mixing cultured cells with plant proteins) may reduce costs but also reduces the 'pure cultivated meat' proposition.",
        },
        {
          id: "regulatory-approvals",
          title: "Three Countries Have Approved Cultivated Meat Sales",
          description:
            "Singapore approved cultivated meat for sale in 2020, the US followed in 2023 (GOOD Meat and UPSIDE Foods received USDA approval), and Israel approved in 2024. The UK approved lab-grown chicken for pet food in February 2025. This regulatory momentum indicates growing institutional acceptance.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Singapore Food Agency; USDA; Israel Ministry of Health",
          reasoning:
            "Regulatory approval is necessary but not sufficient for market success. Approval proves safety, not commercial viability.",
        },
        {
          id: "funding-slowdown",
          title: "Investment Has Slowed as Investors Reassess",
          description:
            "Venture capital funding for cultivated meat companies declined significantly in 2024-2025 compared to 2021-2022 peak levels. Investors are reevaluating commitments due to concerns over cost-efficiency, regulatory roadblocks, and consumer skepticism. Several cultivated meat startups have laid off workers or pivoted strategies.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "PitchBook; GFI (Good Food Institute) State of the Industry Reports",
          reasoning:
            "Market signals from sophisticated investors are informative. However, investment cycles are common in emerging technology—clean energy saw similar skepticism before achieving cost parity.",
        },
      ],
    },
    {
      id: "consumer-acceptance",
      title: "Consumer Acceptance",
      short_summary:
        "Surveys say 40% of Americans would try cultivated meat. Actual purchase rates after tasting? Much lower. The 'yuck factor' is real and persistent.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Surveys consistently show that 35-50% of consumers are unwilling to try cultivated meat. The 'yuck factor' is strong: people associate lab-grown products with unnaturalness. Taste and texture remain inferior to conventional meat for structured cuts. Cultural and religious objections add further resistance. The term 'lab-grown' itself is a marketing liability.",
      proponent_rebuttal:
        "Consumer acceptance improves dramatically after tasting. 3D bioprinting techniques in 2025 are making cultivated meat 'virtually indistinguishable' from conventional beef, chicken, and pork. Younger consumers (18-34) show much higher acceptance rates (65-70%). Environmental and animal welfare concerns are increasingly driving food choices in wealthy nations. Plant-based meat similarly faced skepticism before achieving mainstream retail presence.",
      crux: {
        id: "blind-taste-acceptance",
        title: "Blind Taste Test at Price Parity",
        description:
          "Determining whether consumers can distinguish cultivated meat from conventional meat in blinded taste tests, and whether they would purchase it at equal prices.",
        methodology:
          "Conduct large-scale (n>1,000) double-blind taste tests comparing cultivated and conventional meat across multiple products (burger, chicken breast, steak). Measure preference, willingness to pay, and repeat purchase intent.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$200K (Consumer taste trial study)",
      },
      evidence: [
        {
          id: "consumer-survey-data",
          title: "35-50% of Consumers Unwilling to Try Cultivated Meat",
          description:
            "Multiple consumer surveys across the US, EU, and Asia consistently find that 35-50% of respondents say they are unwilling or unlikely to try cultivated meat. Concerns center on 'naturalness,' unknown long-term health effects, and taste expectations. The percentage is higher among older consumers and in rural areas.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Various consumer surveys; Bryant & Barnett, Meat Science (2020)",
          reasoning:
            "Consumer intent surveys are directionally informative but may overstate resistance—many people who say they won't try something do try it when available.",
        },
        {
          id: "bioprinting-advances-2025",
          title: "2025: 3D Bioprinting Makes Cultivated Meat Structurally Identical",
          description:
            "By 2025, plant-based scaffolding and 3D bioprinting techniques are producing cultivated meat products 'virtually indistinguishable from traditional beef, chicken, and pork' according to industry reports, enabling production of structured products like steaks and whole muscle cuts rather than just ground meat.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 4,
            directness: 7,
          },
          source: "Industry reports; DigiComply Lab-Grown Meat Report (2025)",
          reasoning:
            "Industry sources have incentives to exaggerate progress. 'Virtually indistinguishable' claims need independent verification through blinded taste tests, which are not yet widely published.",
        },
      ],
    },
  ],
};
