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
            "Economist Michael Clemens's survey of the modeling literature found that fully removing barriers to labor mobility could raise world GDP by roughly 50-150% (on the order of doubling). Clemens stresses these are 'large fractions of world GDP' — one or two orders of magnitude larger than the gains from removing all remaining barriers to trade and capital — hence 'trillion-dollar bills on the sidewalk.' The gains come primarily from moving workers from low-productivity to high-productivity environments.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "Clemens, 'Economics and Emigration: Trillion-Dollar Bills on the Sidewalk?', Journal of Economic Perspectives 25(3):83-106 (2011)",
          sourceUrl: "https://www.aeaweb.org/articles?id=10.1257/jep.25.3.83",
          reasoning:
            "Published in a top economics journal. Clemens characterizes the gains as 'large fractions of world GDP' — one or two orders of magnitude larger than gains from liberalizing trade and capital flows; the often-cited 50-150% range comes from his survey of a handful of theoretical models. The models are highly theoretical and extrapolate from marginal changes to revolutionary ones, so real-world frictions would reduce gains substantially.",
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
          source: "Borjas, 'Immigration Economics,' Harvard University Press (2014)",
          sourceUrl: "https://www.hup.harvard.edu/books/9780674049772",
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
            directness: 5,
          },
          source:
            "Kahanec, Zaiceva & Zimmermann, 'Lessons from Migration after EU Enlargement,' IZA Discussion Paper No. 4230 (2009)",
          sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1423346",
          reasoning:
            "Real-world natural experiment with credible data; this IZA review finds post-enlargement flows did not produce the negative labor-market or welfare effects many predicted. The specific '2-3% moved West' and East-West wage figures in the description are approximate and drawn from secondary summaries rather than a single quoted statistic, so directness is moderate. Replicability is limited because EU members shared cultural proximity and institutional convergence that wouldn't apply globally.",
        },
        {
          id: "fiscal-impact-analyses",
          title: "Fiscal Impact Meta-Analyses Show Mixed Results",
          description:
            "The National Academies of Sciences, Engineering, and Medicine (2016) report shows immigration's long-run fiscal impact varies widely with assumptions: under one 75-year scenario the net present value of a newly arrived immigrant is about +$259,000 (and roughly +$58,000 across all first-generation immigrants), but impacts are negative in the short term and at the state/local level. Results are highly sensitive to assumptions about discount rates and how the cost of public goods (e.g., defense) is allocated.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'The Economic and Fiscal Consequences of Immigration' (2016)",
          sourceUrl: "https://www.nationalacademies.org/publications/23550",
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
          sourceUrl: "https://en.wikipedia.org/wiki/The_Ethics_of_Immigration",
          reasoning:
            "Influential and well-argued philosophical work; replicability is low because philosophical arguments aren't empirically testable. Directness limited by the gap between normative theory and policy.",
        },
        {
          id: "friedman-welfare-argument",
          title: "Friedman: Open Borders Incompatible with Welfare State",
          description:
            "Milton Friedman argued (in a 1999 ISIL conference Q&A, echoing remarks he made repeatedly) that 'you cannot simultaneously have free immigration and a welfare state.' The logic: generous social benefits attract disproportionate migration by those who would consume more than they contribute, creating fiscal strain. Most open borders advocates acknowledge this tension but propose solutions (delayed access to benefits, earned citizenship).",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 7,
          },
          source: "Milton Friedman, ISIL conference Q&A (1999) and earlier lectures",
          sourceUrl: "https://openborders.info/friedman-immigration-welfare-state/",
          reasoning:
            "Compelling theoretical argument from a Nobel laureate, but it is an off-the-cuff verbal remark rather than a peer-reviewed finding, and empirical support is mixed (EU experience partially contradicts it). The linked page documents the quote's provenance; the tension is real even if not absolute. Reliability tempered accordingly.",
        },
        {
          id: "remittance-vs-aid-data",
          title: "Remittances (~$626B) Dwarf Foreign Aid (~$204B)",
          description:
            "World Bank data shows remittances to low- and middle-income countries reached about $626B in 2022 (initial estimate; later revised upward to roughly $647B) — roughly 3x total official development assistance (~$204B in 2022, per OECD) and exceeding foreign direct investment. Remittances go directly to families, have lower overhead, and are often countercyclical (rising during recipient-country crises). Proponents argue migration is among the most effective anti-poverty tools available.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "World Bank, 'Remittances Remain Resilient but Likely to Slow' (June 2023); OECD ODA statistics (2022)",
          sourceUrl: "https://www.worldbank.org/en/news/press-release/2023/06/13/remittances-remain-resilient-likely-to-slow",
          reasoning:
            "Highly reliable data demonstrating migration's development impact. Note the original $656B figure was inaccurate for 2022: the World Bank's LMIC estimate was $626B (later revised to ~$647B). Directness limited because current remittance flows occur under restricted migration, not open borders.",
        },
        {
          id: "border-security-cost-effectiveness",
          title: "Border Enforcement Costs $20B+/Year with Limited Effectiveness",
          description:
            "US Customs and Border Protection's annual budget exceeds $20B (roughly $20-23B in recent fiscal years). Despite sustained spending, an estimated 10-11 million undocumented immigrants live in the US. A Cato Institute analysis ('Why the Wall Won't Work,' David J. Bier, 2017) argues that border walls and enforcement have not meaningfully reduced unauthorized immigration — they have redirected flows to more dangerous routes (driving up migrant deaths) and reduced circular migration, trapping migrants who once returned home seasonally.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          source:
            "Cato Institute, Bier, 'Why the Wall Won't Work' (2017); CBP/DHS budget data",
          sourceUrl: "https://www.cato.org/publications/commentary/why-wall-wont-work",
          reasoning:
            "Demonstrates enforcement limitations, but Cato has a known libertarian/pro-immigration stance. The evidence argues against the effectiveness of current enforcement but doesn't directly support fully open borders.",
        },
      ],
    },
  ],
};
