import type { Topic } from "@/lib/schemas/topic";

export const carbonTaxEffectivenessData = {
  id: "carbon-tax-effectiveness",
  title: "Carbon Tax Effectiveness",
  meta_claim:
    "A carbon tax is an effective and efficient policy for reducing greenhouse-gas emissions.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Carbon taxes demonstrably cut emissions — the largest meta-analysis to date (80 causal studies across 21 real-world schemes) found immediate, statistically significant reductions for at least 17 of them, roughly 5-21% (4-15% after correcting for publication bias). The catch most people miss: those cuts are modest because the prices are modest. The fight isn't really about whether pricing works, but whether anyone will set the price high enough to matter.",
    confidence: 88,
    source:
      "Döbbeling-Hildebrandt et al., 'Systematic review and meta-analysis of ex-post evaluations on the effectiveness of carbon pricing,' Nature Communications (2024)",
    sourceUrl: "https://www.nature.com/articles/s41467-024-48512-w",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Carbon pricing is not a theory that has never been tried: a 2024 Nature Communications synthesis of 80 causal ex-post evaluations across 21 schemes found that introducing a carbon price produced immediate, statistically significant emission cuts for at least 17 of those policies, and quasi-experimental studies (Sweden's ~11% transport drop, British Columbia's plant-level manufacturing cuts) isolate a genuine causal effect.",
    "The honest limitation is magnitude: real-world reductions are single-to-low-double digits, because almost every deployed price sits far below the $40-100/tCO2 the Stiglitz-Stern commission says Paris requires — and the politically durable, leakage-free version of the policy has been hard to sustain (Australia repealed its tax; France froze its increase after the gilets jaunes).",
    "So the honest debate isn't whether a carbon tax cuts emissions (it does) but whether the price can be pushed high enough, and made politically durable enough, to deliver deep cuts rather than marginal ones.",
  ],
  last_updated: "2026-06-16",
  tags: ["carbon-tax", "climate", "emissions", "economics", "policy"],
  pillars: [
    {
      id: "does-it-cut-emissions",
      title: "Does It Cut Emissions?",
      short_summary:
        "Ex-post evaluations of real carbon-pricing schemes find statistically significant emission reductions, but the size is modest and depends heavily on the price level and design.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Most carbon taxes in force are priced far below the level needed to bend emissions sharply. Measured reductions are real but small — on the order of single-digit percentages — and confounded by recessions, parallel regulations, and fuel-price swings. British Columbia's tax, North America's flagship case, shows only a roughly 5% aggregate reduction, and some later analyses find its CO2 emissions and fuel use rising again as the economy grew. A few percent of avoided emissions is not the rapid decarbonization the climate problem demands.",
      proponent_rebuttal:
        "The largest systematic review to date — 483 effect sizes from 80 causal ex-post evaluations across 21 schemes — finds that introducing a carbon price produced immediate, statistically significant emission reductions for at least 17 of those policies, despite prices being low in most cases. Quasi-experimental studies using synthetic controls (Sweden) and plant-level microdata (BC manufacturing) isolate a genuine causal effect that survives controls for confounders. The effect is modest because prices are modest; the policy works, it is simply under-applied.",
      crux: {
        id: "causal-emission-effect",
        title: "Causal Emission Effect vs. Counterfactual",
        description:
          "The load-bearing question is whether observed emission drops are caused by the carbon price or by coincident factors (recessions, other regulations, technology trends). Resolving it requires a credible counterfactual — what emissions would have been without the tax.",
        methodology:
          "Use difference-in-differences and synthetic-control designs comparing taxed jurisdictions to matched untaxed controls; aggregate causal ex-post estimates in a meta-analysis and correct for publication bias. Decompose any reduction into scale (less output) vs. technique (cleaner output) effects.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (analysis of published ex-post evaluations)",
        falsification: {
          supporter_flip:
            "If well-identified difference-in-differences and synthetic-control studies consistently found that taxed jurisdictions' emission drops were fully accounted for by coincident recessions, parallel regulations, or fuel-price swings — with the carbon-price coefficient collapsing to zero once those confounders are controlled — the claim that the tax itself cuts emissions would fail.",
          skeptic_flip:
            "A skeptic who says the drops are just confounding should weigh that the largest meta-analysis (483 effect sizes, 80 studies) finds significant cuts for at least 17 of 21 schemes after correcting for publication bias, that Sweden's synthetic-control estimate survives matched OECD controls, and that BC plant-level data show a technique effect (-6% intensity) while output actually rose — patterns recessions don't produce.",
          common_ground:
            "Both sides agree that observed aggregate emission declines have real non-tax drivers (recessions, other regulations, technology trends) and that any honest estimate must net those out against a credible counterfactual.",
          live_disagreement:
            "How large the genuinely tax-caused share of observed reductions is once confounders are removed — which only more well-identified quasi-experimental estimates across many schemes, decomposed into scale vs. technique effects, can pin down.",
        },
      },
      evidence: [
        {
          id: "meta-analysis-effectiveness",
          title: "Meta-Analysis: Carbon Pricing Causes Real Reductions",
          description:
            "A systematic review of 483 effect sizes from 80 causal ex-post evaluations across 21 schemes finds statistically significant reductions of roughly -5% to -21% (-4% to -15% after correcting for publication bias), with immediate substantial cuts for at least 17 of the policies despite low prices.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "Döbbeling-Hildebrandt et al., 'Systematic review and meta-analysis of ex-post evaluations on the effectiveness of carbon pricing,' Nature Communications (2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11099057/",
          reasoning:
            "Peer-reviewed, machine-learning-assisted systematic review aggregating dozens of independent causal studies — the most comprehensive synthesis available and directly on point. High weights across the board; replicability slightly below max because effect sizes vary by scheme and context.",
        },
        {
          id: "sweden-transport",
          title: "Sweden: ~11% Transport CO2 Decline (Synthetic Control)",
          description:
            "Using a synthetic control built from comparable OECD countries, CO2 emissions from Swedish transport fell almost 11% after the carbon tax plus VAT, with about 6 percentage points attributable to the carbon tax alone. The carbon-tax elasticity was about three times the ordinary price elasticity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Andersson, 'Carbon Taxes and CO2 Emissions: Sweden as a Case Study,' American Economic Journal: Economic Policy 11(4):1-30 (2019)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/pol.20170144",
          reasoning:
            "Top-tier peer-reviewed journal, transparent quasi-experimental design widely cited and independently replicated. Directly demonstrates a causal carbon-tax effect; limited to the transport sector, so directness is high but not perfect for an economy-wide claim.",
        },
        {
          id: "bc-aggregate-modest",
          title: "BC Tax: Only ~5% Aggregate Reduction",
          description:
            "In the same meta-analysis, British Columbia's carbon tax — North America's first major one — is estimated at just -5.4% [95% CI -9.6% to -1.2%], among the smaller effects, reflecting its modest price level and the difficulty of cutting aggregate (not just transport) emissions.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "Döbbeling-Hildebrandt et al., Nature Communications (2024), reported pooled estimate for the BC carbon tax",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11099057/",
          reasoning:
            "Same authoritative source, cutting the other way: the flagship North American carbon tax delivered only a single-digit aggregate cut. Honest evidence that real-world carbon taxes have so far been modest in magnitude.",
        },
        {
          id: "bc-manufacturing-technique",
          title: "BC Manufacturing: -4% Without Cutting Output",
          description:
            "Plant-level microdata show the BC carbon tax lowered manufacturing GHG emissions by a statistically significant 4%, achieved through a -6% emission-intensity (technique) effect while output actually rose ~1.8% — i.e., cleaner production rather than degrowth.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Ahmadi, Yamazaki & Kabore, 'How Do Carbon Taxes Affect Emissions? Plant-Level Evidence from Manufacturing,' Environmental and Resource Economics (2022)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9000005/",
          reasoning:
            "Peer-reviewed plant-level causal study with a credible identification strategy. The technique-effect finding rebuts the claim that emission cuts must come from lost output. Modest magnitude keeps directness from being maximal for the economy-wide claim.",
        },
      ],
    },
    {
      id: "is-it-efficient",
      title: "Is It the Efficient Tool?",
      short_summary:
        "Economists broadly hold a carbon tax is the least-cost way to cut emissions, but real-world prices sit far below the level needed, so cost-effectiveness in theory has not yet meant deep cuts in practice.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Efficiency on paper does not equal results. The Stiglitz-Stern High-Level Commission concluded that meeting the Paris goal requires roughly $40-80/tCO2 by 2020 and $50-100 by 2030, yet most carbon prices have been a fraction of that. A theoretically efficient instrument set far below its required level produces only marginal abatement, while regulations, standards, and subsidies have driven much of the actual clean-energy transition.",
      proponent_rebuttal:
        "More than 3,500 economists — including 28 Nobel laureates and former Fed chairs — signed a statement calling a carbon tax 'the most cost-effective lever to reduce carbon emissions at the scale and speed that is necessary.' A single economy-wide price lets every firm and household find their own cheapest abatement, avoiding the deadweight cost of prescriptive mandates. The remedy for low prices is higher prices on a predictable trajectory, not abandoning the most efficient instrument.",
      crux: {
        id: "price-vs-required-level",
        title: "Price Gap vs. Required Level",
        description:
          "The decisive disagreement is whether carbon taxes underperform because pricing is the wrong tool or because the price has simply been set too low. If raising the price closes the gap, efficiency is vindicated; if not, the instrument itself is at fault.",
        methodology:
          "Compare observed carbon prices to model-derived Paris-consistent price corridors; estimate the marginal abatement response to price increases (elasticities) and test whether projected reductions at the recommended price reach required emission pathways.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (compare published price corridors to abatement elasticities)",
        falsification: {
          supporter_flip:
            "If the marginal abatement response flattened sharply as prices rose — so that even taking a price to the $50-100/tCO2 Paris-consistent corridor produced only marginally more abatement than today's low prices — then the problem would be the instrument, not the price level, and 'just raise the price' would no longer rescue the efficiency case.",
          skeptic_flip:
            "A skeptic who says pricing is the wrong tool should weigh that 3,500+ economists including 28 Nobel laureates call it the most cost-effective lever, that observed carbon-tax elasticities (e.g. Sweden's ~3× the ordinary price elasticity) imply substantial untapped abatement at higher prices, and that prescriptive mandates carry their own deadweight costs.",
          common_ground:
            "Both sides agree that deployed carbon prices have sat well below the Stiglitz-Stern Paris-consistent corridor and that, at those low levels, real-world abatement has been modest.",
          live_disagreement:
            "Whether raising the price to the recommended corridor would deliver the deep cuts the meta-claim implies, or whether abatement responses saturate before then — which only estimating price-elasticity of abatement at high price levels (largely unobserved) can settle.",
        },
      },
      evidence: [
        {
          id: "economists-statement",
          title: "3,500+ Economists: Most Cost-Effective Lever",
          description:
            "The Economists' Statement on Carbon Dividends — the largest single statement in the history of the profession, with 28 Nobel laureates and former Fed/Treasury officials among 3,500+ signatories — calls a carbon tax 'the most cost-effective lever to reduce carbon emissions at the scale and speed that is necessary.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source:
            "Economists' Statement on Carbon Dividends, Climate Leadership Council (Wall Street Journal, Jan 2019)",
          sourceUrl: "https://clcouncil.org/economists-statement/",
          reasoning:
            "Strong expert-consensus signal directly addressing efficiency, but it is a normative position statement rather than an experiment — hence moderate reliability and low replicability. Directness is high because it speaks precisely to cost-effectiveness.",
        },
        {
          id: "price-gap-stiglitz-stern",
          title: "Prices Far Below Paris-Consistent Levels",
          description:
            "The High-Level Commission on Carbon Prices (Stiglitz & Stern, 2017) found a Paris-consistent price needs to reach about $40-80/tCO2 by 2020 and $50-100 by 2030; most real-world prices have been well below this floor, limiting actual abatement.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "High-Level Commission on Carbon Prices (Stiglitz, Stern et al.), World Bank / Carbon Pricing Leadership Coalition (2017)",
          sourceUrl:
            "https://www.worldbank.org/en/news/press-release/2017/05/29/new-global-pathway-on-carbon-pricing-can-shift-finance-to-sustainable-investments-world-bank",
          reasoning:
            "Authoritative expert commission establishing the required price corridor. It cuts against the meta-claim only in the sense that deployed prices fall short — it is a model-based normative target, so replicability is moderate. Cited honestly as showing the gap, not that pricing fails in principle.",
        },
      ],
    },
    {
      id: "leakage-and-durability",
      title: "Leakage & Durability",
      short_summary:
        "Carbon pricing can shift some emissions abroad and has triggered fierce political backlash, raising the question of whether territorial cuts translate into durable global reductions.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "A national carbon tax can cut emissions on paper while production — and its emissions — migrates to untaxed countries. It also faces acute political fragility: Australia repealed its carbon tax outright in 2014, and France froze its carbon-tax increase after the gilets jaunes protests. A policy that leaks emissions and gets repealed cannot deliver durable global decarbonization.",
      proponent_rebuttal:
        "Measured leakage is moderate — international trade offsets on average about 13% of domestic reductions, leaving the large majority of cuts intact — and is shrinking as carbon border adjustment mechanisms and climate clubs spread. Backlash is real but a design problem, not an indictment: revenue recycling (lump-sum dividends, like the Economists' Statement proposes) and gradual, predictable trajectories can make carbon pricing both effective and politically durable.",
      crux: {
        id: "net-global-effect",
        title: "Net Global vs. Territorial Effect",
        description:
          "The crux is whether a carbon tax reduces global emissions or merely relocates them. If leakage offsets only a small share and policies survive politically, territorial cuts are real global cuts; if leakage is large or taxes get repealed, the global benefit evaporates.",
        methodology:
          "Estimate leakage rates by comparing territorial vs. consumption-based emission accounts and tracing trade-embodied carbon; track policy survival rates and design features (revenue recycling, border adjustments) associated with durability.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (territorial vs. consumption emissions accounting)",
        falsification: {
          supporter_flip:
            "If consumption-based emission accounting showed leakage offsetting the large majority of a jurisdiction's territorial cuts — production and its emissions simply migrating to untaxed countries — or if carbon taxes proved so politically fragile that most are repealed within a few years, then territorial reductions would not translate into durable global ones.",
          skeptic_flip:
            "A skeptic who says taxes just export emissions and get repealed should weigh that OECD plant-level analysis bounds average leakage at ~13% (leaving ~87% of the cut intact), that border adjustments and climate clubs are shrinking it further, and that backlash has been blunted where revenue is recycled as dividends — making fragility a design problem, not a verdict.",
          common_ground:
            "Both sides agree that carbon leakage is real and non-zero, and that carbon taxes have faced genuine political backlash and at least one outright repeal (Australia, 2014).",
          live_disagreement:
            "Whether leakage stays moderate (~13%) and policies survive long enough to compound, or whether leakage and repeal erase the global benefit — which only consumption-based accounting plus tracking of policy survival and design features (revenue recycling, border adjustments) can resolve.",
        },
      },
      evidence: [
        {
          id: "leakage-moderate",
          title: "Leakage Offsets ~13% of Reductions",
          description:
            "OECD analysis of plant-level data finds carbon leakage through international trade offsets on average about 13% of domestic emission reductions — real but moderate, leaving most of the territorial cut as a genuine reduction, partly because free allocations protect trade-exposed sectors.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "OECD ECOSCOPE, 'Does carbon leakage through international trade reduce the effectiveness of carbon pricing policies?' (2024)",
          sourceUrl:
            "https://oecdecoscope.blog/2024/09/03/does-carbon-leakage-through-international-trade-reduce-the-effectiveness-of-carbon-pricing-policies/",
          reasoning:
            "Reputable institutional analysis grounded in plant-level data. Supports the meta-claim by bounding leakage to a moderate fraction, but the same figure also concedes leakage is non-zero — weighted as a 'for' item because ~87% of the reduction survives.",
        },
        {
          id: "australia-repeal",
          title: "Australia Repealed Its Carbon Tax",
          description:
            "Australia became the first country to repeal a carbon tax, with the Senate voting 39-32 in July 2014 after the 'axe the tax' campaign, demonstrating the acute political fragility that can cut a carbon tax's effective lifespan to just a couple of years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "Al Jazeera, 'Australia's Abbott repeals carbon tax' (17 July 2014), reporting the Senate repeal vote",
          sourceUrl:
            "https://www.aljazeera.com/news/2014/7/17/australias-abbott-repeals-carbon-tax",
          reasoning:
            "Well-documented historical fact (the repeal vote is uncontested and verifiable). Directness is moderate: it speaks to durability and political feasibility rather than to whether the tax reduced emissions while in force.",
        },
      ],
    },
  ],
};
