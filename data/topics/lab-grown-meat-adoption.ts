import type { Topic } from "@/lib/schemas/topic";

export const labGrownMeatData = {
  id: "lab-grown-meat-adoption",
  title: "Lab-Grown Meat Adoption",
  meta_claim:
    "Cultivated (lab-grown) meat will become cost-competitive with conventional meat and achieve significant market adoption within the next 15 years.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The first lab-grown burger cost $330,000 in 2013; a 2024 peer-reviewed model projects cultivated chicken at about $6.20/lb at a scaled plant — a staggering drop. But that's a projection for a facility that doesn't yet exist, no one is selling cultivated meat anywhere near conventional chicken's ~$2–4/lb at retail, and 2024–25 funding fell as investors doubted it scales.",
    confidence: 80,
    source:
      "Mark Post / Maastricht University (2013 burger); Nahmias et al., Nature Food (2024); GFI State of the Industry",
    sourceUrl: "https://www.nature.com/articles/s43016-024-01022-w",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Cultivated meat's progress is real and dramatic — the price of a lab-grown burger fell from $330,000 in 2013 to a 2024 peer-reviewed projection of about $6.20/lb for chicken, and regulators in Singapore (2020) and the US (2023) have approved sales.",
    "But the headline cost is a model for a 50,000-litre facility nobody has built — no producer has actually hit conventional prices at retail, the engineering hurdles (sterile scale-up, cheap growth medium, structured cuts) may have hard floors, and 2024–25 funding dropped as investors reassessed.",
    "So the honest question isn't whether cultivated meat is technically possible (it is, and it's been eaten) but whether it can scale to real cost parity and win over consumers — the 'yuck factor' softens after tasting, but survey enthusiasm has consistently outrun actual purchases.",
  ],
  pillars: [
    {
      id: "cost-scalability",
      title: "Cost & Scalability",
      short_summary:
        "In 2013, the first lab-grown burger cost $330,000. By 2024, a peer-reviewed model projected ~$6.20/lb chicken at a hypothetical scaled plant — but that is a projection, not an achieved cost, and the gap to conventional chicken at a few dollars a pound remains stubborn.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The first lab-grown burger in 2013 cost $330,000 to produce. Despite years of investment and promises, cultivated meat remains far too expensive for mass markets, and the headline low-cost figures are techno-economic projections for facilities that do not yet exist — not prices anyone has actually achieved at retail scale. Scaling cell culture from laboratory flasks to the 50,000-litre-class industrial bioreactors those models assume faces fundamental challenges: maintaining sterility at volume, preventing cell death and shear damage, sourcing affordable food-grade growth medium, and producing structured cuts (not just mince). A widely cited engineering critique argues that several of these costs may have hard floors set by chemistry and contamination risk. Funding fell sharply in 2024-2025 as investors reassessed feasibility, and some producers have shut down or pivoted.",
      proponent_rebuttal:
        "Costs have dropped by orders of magnitude since the 2013 burger, as medium and bioreactor design have improved. A 2024 peer-reviewed paper in Nature Food (Nahmias et al.) modeled a continuous-manufacturing process that, in a techno-economic analysis of a hypothetical 50,000-litre facility, could produce cultivated chicken at about $6.20/lb — within the range of organic chicken. This is an engineering projection, not yet an achieved cost, but it is a credible demonstration that a scaled cost near parity is at least biologically and chemically plausible rather than fantastical. Market-research firms value the (still tiny) cultivated-meat market in the low billions and project double-digit CAGRs to the 2030s, and process advances such as cheaper growth media, perfusion bioreactors, and cell-line optimization are the specific levers expected to close the remaining gap.",
      crux: {
        id: "cost-parity-timeline",
        title: "Cost Parity with Conventional Meat",
        description:
          "Determining when (or whether) actual, demonstrated cultivated-meat production costs — not techno-economic projections for facilities that have not been built — will reach parity with conventionally farmed chicken ($3-4/lb) and beef ($5-8/lb).",
        methodology:
          "Track audited, demonstrated production costs (not modeled projections) across leading cultivated meat companies quarterly, distinguishing pilot-scale actuals from at-scale models. Model cost curves based on bioreactor scaling, cell line optimization, and growth medium costs, and check whether built facilities hit the costs their techno-economic analyses predicted. Compare to conventional meat prices including externalities (environmental costs).",
        equation:
          "t_{\\text{parity}} = t_0 + \\frac{\\ln(C_{\\text{current}}/C_{\\text{target}})}{r_{\\text{cost reduction}}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Techno-economic analysis with industry data)",
        falsification: {
          supporter_flip:
            "If built, at-scale facilities consistently failed to hit the costs their techno-economic models predicted — the projected ~$6/lb staying a model while real production stuck far above conventional prices, with the gap proving to have hard chemistry/contamination floors — the 'parity within 15 years' claim would collapse.",
          skeptic_flip:
            "A skeptic who says it'll never be cheap should weigh that costs have already fallen by orders of magnitude since 2013, that a peer-reviewed model puts scaled chicken near organic prices, and that the specific levers (cheaper media, perfusion bioreactors, cell-line optimization) are identified and improving — so a hard cost floor isn't yet demonstrated.",
          common_ground:
            "Both sides agree the low-cost figures are projections for facilities that don't yet exist, not prices achieved at retail scale.",
          live_disagreement:
            "Whether the remaining cost gap to conventional meat is a normal engineering scale-up problem that falls with volume, or a hard floor set by sterility, growth-medium chemistry, and contamination risk.",
        },
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
            "Investment in cultivated meat has fallen sharply from its 2021-2022 peak. Per the Good Food Institute's State of the Industry data, the sector raised roughly $140 million in 2024 (reported in the ~$139-144 million range depending on which late-stage rounds are counted) — about a 40% year-over-year decline and one of the lowest annual totals since 2019 — versus a ~$1.3 billion peak in 2021, ~$917 million in 2022 and ~$230 million in 2023. GFI later reported a further drop to roughly $74 million in 2025. The number of cultivated-meat companies tracked stayed around 140-150, with notable shutdowns and consolidation, and some US federal and state research support was curtailed.",
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
            "The funding figures come from GFI (with Net Zero Insights), an industry-advocacy nonprofit that promotes alternative proteins, so its data should be read with mild caution even though here it documents a downturn that cuts against its own optimism (which raises confidence). The exact 2024 total is reported in a band (~$139-144M) because a single large late-stage round shifts the headline number, so the figure is given as approximate rather than precise. Sharp investment declines are informative market signals, though capital-intensive deep-tech often sees boom-bust funding cycles and a retrenchment is not by itself proof the technology cannot scale. Independence trimmed from 8 to 7 to reflect GFI's advocacy role.",
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
        falsification: {
          supporter_flip:
            "If large double-blind tests at equal price showed consumers consistently prefer conventional meat or won't repeat-purchase cultivated even when they can't taste the difference, the 'acceptance improves after tasting' case would weaken — the yuck factor would be a durable barrier, not a marketing problem.",
          skeptic_flip:
            "A skeptic who cites the yuck factor should weigh that acceptance rises sharply after tasting, that younger consumers already report 65–70% willingness, and that plant-based meat overcame similar early skepticism to reach mainstream shelves.",
          common_ground:
            "Both sides agree survey-stated willingness to try has consistently outrun actual purchasing, and that structured cuts (steak) remain harder to make than mince.",
          live_disagreement:
            "Whether the 'yuck factor' is a durable barrier or a soft framing-and-familiarity effect that fades once cultivated meat is price-competitive and on shelves — which no large blind test at price parity has yet measured.",
        },
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
