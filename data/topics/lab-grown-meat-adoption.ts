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
          title: "Modeled $6.20/lb Cultivated Chicken at a Hypothetical 50,000-L Facility",
          description:
            "A 2024 peer-reviewed paper in Nature Food (Nahmias et al., 'Continuous manufacturing of cultivated meat,' DOI 10.1038/s43016-024-01022-w) used a continuous tangential-flow-filtration process and an inexpensive ($0.63/L) culture medium to project a production cost of $6.20/lb for cultivated chicken — at parity with USDA Organic chicken. Critically, $6.20/lb is a techno-economic MODEL of a hypothetical 50,000-litre facility, not a measured production cost; the lab process itself operated at far smaller scale.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source: "Nahmias et al., Nature Food (2024)",
          sourceUrl: "https://www.nature.com/articles/s43016-024-01022-w",
          reasoning:
            "Peer-reviewed in a strong journal, but the $6.20/lb is a modeled projection for a 50,000-L plant that does not yet exist, not an achieved cost — cultivated-meat cost claims are routinely overstated this way. The lead author, Yaakov Nahmias, is the founder of Believer Meats, so this is an interested party modeling its own favorable scenario; independence is low. An earlier version mis-attributed this to 'Food Research International' and described a 'hybrid plant-and-cell' product — both corrected here, and weights de-inflated to reflect that it is a projection from a stakeholder.",
        },
        {
          id: "regulatory-approvals",
          title: "Three Countries Have Approved Cultivated Meat Sales",
          description:
            "Singapore became the first country to approve cultivated meat for sale in December 2020 (GOOD Meat / Eat Just chicken). The US followed in June 2023, when USDA granted final approval to GOOD Meat and UPSIDE Foods to sell cultivated chicken (after FDA 'no questions' letters). In January 2024 Israel's Ministry of Health granted the world's first regulatory approval for cultivated BEEF (Aleph Farms). This regulatory momentum indicates growing institutional acceptance.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Good Food Institute (GFI) press release on USDA approval; Food Safety News on Israel approval",
          sourceUrl: "https://gfi.org/press/good-meat-and-upside-foods-approved-to-sell-cultivated-chicken-following-landmark-usda-action/",
          reasoning:
            "The US (June 2023), Singapore (Dec 2020) and Israel (Jan 2024) approvals are all well-documented in primary regulator statements and trade press. Regulatory approval is necessary but not sufficient for market success — it proves safety, not commercial viability or cost. An earlier version's unverified UK 'pet food, February 2025' claim was removed as it could not be confirmed against a primary source.",
        },
        {
          id: "funding-slowdown",
          title: "Investment Has Slowed as Investors Reassess",
          description:
            "Investment in cultivated meat has fallen sharply from its 2021-2022 peak. Per the Good Food Institute's State of the Industry data, the sector raised about $139 million in 2024 — roughly a 40% year-over-year decline and the lowest annual total since 2019 — versus $1.3 billion in 2021, $917 million in 2022 and $230 million in 2023. The number of cultivated-meat companies tracked fell from ~155 to ~140, with shutdowns and consolidation, and US federal research support was cut.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Good Food Institute (GFI) State of the Industry Report 2024",
          sourceUrl: "https://gfi.org/resource/cultivated-meat-seafood-and-ingredients-state-of-the-industry/",
          reasoning:
            "The funding figures come from GFI, an industry-advocacy nonprofit that promotes alternative proteins, so its data should be read with mild caution even though here it documents a downturn that cuts against its own optimism (which raises confidence). Sharp investment declines are informative market signals, though emerging technologies often see boom-bust funding cycles. Independence trimmed from 8 to 7 to reflect GFI's advocacy role.",
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
        "Consumer acceptance improves after tasting. In a blind taste test run by Aleph Farms, its cultivated steak reached acceptance parity with conventional beef (96% vs 98%), though independent academic tasting studies are more mixed and the producer framed this as 'parity,' not literal indistinguishability. Younger consumers (18-34) show much higher acceptance rates (65-70%). Environmental and animal welfare concerns are increasingly driving food choices in wealthy nations. Plant-based meat similarly faced skepticism before achieving mainstream retail presence.",
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
          source: "Bryant & Barnett, 'Consumer Acceptance of Cultured Meat: An Updated Review (2018-2020),' Applied Sciences 10(15):5201 (2020)",
          sourceUrl: "https://www.mdpi.com/2076-3417/10/15/5201",
          reasoning:
            "This peer-reviewed review synthesizes 26 empirical consumer-acceptance studies and supports the general finding that a large minority of consumers express unwillingness, though exact percentages vary by study, framing and country and the specific '35-50%' band is an approximation across surveys rather than a single reported figure. An earlier version cited 'Bryant & Barnett, Meat Science (2020)' — a conflation of their 2018 Meat Science systematic review with this 2020 Applied Sciences update; corrected to the 2020 paper that the year refers to. Stated intent surveys are directionally informative but may overstate resistance, since many who say they won't try a product do try it once available.",
        },
        {
          id: "bioprinting-advances-2025",
          title: "Cultivated Steak Reaches Consumer Acceptance Parity in a Blind Taste Test",
          description:
            "Industry progress in plant-based scaffolding and structured-tissue techniques has begun closing the gap for whole cuts rather than just ground meat. In a blind taste test run by Aleph Farms, 96% of participants accepted its cultivated steak versus 98% for conventional beef — a difference the company said was not statistically significant — with similar restaurant-ordering intent (50% vs 51%). The company framed the result as 'parity,' not literal indistinguishability. Independent academic work is more mixed: some tasters find cultivated meat comparable, while others rate it similar or inferior, with texture the decisive factor.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 4,
            directness: 6,
          },
          source: "Aleph Farms blind taste test (via Green Queen); academic tasting studies (PMC)",
          sourceUrl: "https://www.greenqueen.com.hk/aleph-farms-cultivated-meat-lab-grown-beef-steak-taste-test/",
          reasoning:
            "An earlier version claimed cultivated meat was 'virtually indistinguishable from beef, chicken, and pork' citing only an unsourced industry report — that overstated the evidence and has been softened. The strongest real result (Aleph Farms) shows consumer-acceptance parity in a single company-run blind test, not blinded indistinguishability of the product itself; independent academic tasting studies find acceptance 'fairly divided.' Because the headline figures come from an interested producer, independence and replicability stay low.",
        },
      ],
    },
  ],
};
