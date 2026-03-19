import type { Topic } from "@/lib/schemas/topic";

export const openBordersData = {
  id: "open-borders",
  title: "The Case for Open Borders",
  meta_claim:
    "Significantly relaxing or eliminating immigration restrictions would produce massive economic gains and is morally justified.",
  status: "highly_speculative" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "economic-arguments",
      title: "Economic Arguments",
      short_summary:
        "Economists estimate open borders could double world GDP. The question nobody can model: what happens to social trust and welfare states?",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Open borders would create unsustainable fiscal pressure on welfare states — healthcare, education, and social services would be overwhelmed. Wage depression for low-skilled native workers would be severe: Borjas estimates a 3-4% wage decline per 10% increase in labor supply. Housing crises would worsen dramatically in destination cities already facing shortages.",
      proponent_rebuttal:
        "Economists estimate open borders could double world GDP — what Clemens calls 'trillion-dollar bills on the sidewalk.' Geographic restrictions on labor are the largest remaining market distortion in the global economy. Immigrants are net fiscal contributors over their lifetimes in most studies. EU free movement between vastly different economies (Germany, Romania) produced manageable migration and mutual prosperity rather than collapse.",
      crux: {
        id: "gdp-gains-estimation",
        title: "Global GDP Gains from Labor Mobility",
        description:
          "Estimating the actual economic gains from substantially liberalizing global labor mobility, accounting for fiscal impacts, wage effects, and transition costs.",
        methodology:
          "Extend models of EU free movement to global scenario. Calculate productivity gains from labor reallocation. Model fiscal impacts on destination countries. Estimate wage effects across skill levels. Account for housing, infrastructure, and integration costs.",
        equation:
          "\\Delta\\text{GDP}_{\\text{world}} = \\sum_{i,j} (\\text{MPL}_j - \\text{MPL}_i) \\times \\Delta L_{i \\to j} - \\text{Transition Costs}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Global economic modeling)",
      },
      evidence: [
        {
          id: "clemens-gdp-estimates",
          title: "Clemens: Open Borders Could Double World GDP",
          description:
            "Economist Michael Clemens's survey of four independent economic models found that open borders would increase world GDP by 50-150%, with a median estimate near 100% (doubling). The gains come primarily from moving workers from low-productivity to high-productivity environments. Even a 10% liberalization of barriers would yield trillions in gains.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source: "Clemens, 'Economics and Emigration,' Journal of Economic Perspectives (2011)",
          reasoning:
            "Published in a top economics journal, but models are highly theoretical and extrapolate from marginal changes to revolutionary ones. Real-world frictions would reduce gains substantially.",
        },
        {
          id: "borjas-wage-impact",
          title: "Borjas: Immigration Depresses Low-Skill Wages 3-4%",
          description:
            "Harvard economist George Borjas's research found that a 10% increase in labor supply from immigration reduces wages for competing native workers by 3-4%. The impact is concentrated among high school dropouts and disproportionately affects Black and Hispanic low-wage workers. Open borders would represent far more than a 10% increase.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Borjas, 'Immigration Economics,' Harvard University Press",
          reasoning:
            "Respected labor economist with rigorous methodology; findings are contested by Card and others who find smaller wage effects. Extrapolation to open borders is speculative.",
        },
        {
          id: "eu-free-movement-data",
          title: "EU Free Movement Produced Manageable Migration",
          description:
            "When the EU expanded free movement to Eastern Europe (2004-2007), predictions of mass migration were largely wrong. Only 2-3% of Eastern Europeans moved West. Both sending and receiving countries experienced economic growth. Wages in Eastern Europe rose while Western European wage effects were minimal. The experience suggests fears of open borders are overstated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "European Commission, Kahanec & Zimmermann (IZA)",
          reasoning:
            "Real-world natural experiment with credible data; replicability limited because EU members shared cultural proximity and institutional convergence that wouldn't apply globally.",
        },
        {
          id: "fiscal-impact-analyses",
          title: "Fiscal Impact Meta-Analyses Show Mixed Results",
          description:
            "Meta-analyses of immigration's fiscal impact show wide variation: the National Academy of Sciences found a net positive fiscal impact of $259K per immigrant over 75 years, but negative impact in the short term at state/local level. Low-skilled immigrants are net fiscal drains for 15-20 years before becoming net contributors. Results are highly sensitive to assumptions about discount rates and public goods.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "National Academy of Sciences, 'The Economic and Fiscal Consequences of Immigration'",
          reasoning:
            "Authoritative source; the mixed results and sensitivity to assumptions make this evidence cut both ways, leaning against given short-term fiscal pressures under open borders.",
        },
      ],
    },
    {
      id: "moral-security-considerations",
      title: "Moral & Security Considerations",
      short_summary:
        "If you think borders are morally arbitrary, open borders follow logically. If you think nations have the right to self-determination, they do not.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Sovereign nations have the right and duty to control their borders — this is foundational to the nation-state system. Open borders are incompatible with welfare states, as Milton Friedman argued. Security screening requires controlled entry points and manageable volumes. Cultural integration requires manageable flows to prevent parallel societies and social fragmentation.",
      proponent_rebuttal:
        "Restricting movement based on birth location is arbitrary discrimination — morally analogous to restricting rights based on race or gender. The 'birthplace lottery' is the largest determinant of lifetime income, dwarfing all other factors. Brain drain concerns are overstated; remittances ($656B in 2022) vastly outweigh foreign aid ($204B). Illegal immigration exists precisely BECAUSE legal pathways are too narrow — open borders would eliminate it.",
      crux: {
        id: "moral-framework-analysis",
        title: "Moral Framework for Freedom of Movement",
        description:
          "Evaluating whether freedom of movement across borders is a fundamental human right that should be limited only by compelling state interests, or whether states have strong prima facie rights to exclude.",
        methodology:
          "Philosophical analysis comparing freedom of movement to other recognized freedoms. Empirical examination of whether controlled borders actually achieve their stated goals (security, fiscal sustainability, cultural cohesion) more effectively than open alternatives.",
        equation:
          "\\text{Moral Permissibility} = f(\\text{Rights Restricted}, \\text{Harm Prevented}, \\text{Alternatives Available})",
        verification_status: "theoretical" as const,
        cost_to_verify: "N/A (Normative philosophical question)",
      },
      evidence: [
        {
          id: "carens-philosophical-case",
          title: "Carens: The Ethics of Immigration",
          description:
            "Philosopher Joseph Carens argues that liberal democratic principles logically require open borders. If we believe in moral equality of persons and freedom of movement within nations, extending these principles across borders is the only consistent position. Closed borders are the modern equivalent of feudal restrictions on peasant movement.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source: "Carens, 'The Ethics of Immigration,' Oxford University Press (2013)",
          reasoning:
            "Influential and well-argued philosophical work; replicability is low because philosophical arguments aren't empirically testable. Directness limited by the gap between normative theory and policy.",
        },
        {
          id: "friedman-welfare-argument",
          title: "Friedman: Open Borders Incompatible with Welfare State",
          description:
            "Milton Friedman argued that 'you can have open borders or a welfare state, but not both.' The logic: generous social benefits attract disproportionate migration by those who would consume more than they contribute. This creates a fiscal death spiral. Most open borders advocates acknowledge this tension but propose solutions (delayed access to benefits, earned citizenship).",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "Milton Friedman, various interviews and lectures",
          reasoning:
            "Compelling theoretical argument from a Nobel laureate; empirical support is mixed (EU experience partially contradicts it). The tension is real even if not absolute.",
        },
        {
          id: "remittance-vs-aid-data",
          title: "Remittances ($656B) Dwarf Foreign Aid ($204B)",
          description:
            "World Bank data shows that remittances to low- and middle-income countries reached $656B in 2022 — more than 3x total foreign aid ($204B) and exceeding foreign direct investment. Remittances go directly to families, have lower overhead, and are countercyclical (increase during recipient-country crises). Migration is the most effective anti-poverty tool available.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "World Bank Migration and Remittances Data",
          reasoning:
            "Highly reliable data demonstrating migration's development impact; directness limited because current remittance flows occur under restricted migration, not open borders.",
        },
        {
          id: "border-security-cost-effectiveness",
          title: "Border Enforcement Costs $20B+/Year with Limited Effectiveness",
          description:
            "US Customs and Border Protection's budget exceeds $20B annually. Despite this spending, an estimated 10-11 million undocumented immigrants live in the US. A 2019 Cato Institute analysis found that border walls and enforcement have not significantly reduced unauthorized immigration — they have redirected flows to more dangerous routes and reduced circular migration.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          source: "CBP Budget Data, Cato Institute",
          reasoning:
            "Demonstrates enforcement limitations, but Cato has a known libertarian/pro-immigration stance. The evidence argues against current enforcement but doesn't directly support fully open borders.",
        },
      ],
    },
  ],
};
