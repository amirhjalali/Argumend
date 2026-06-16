import type { Topic } from "@/lib/schemas/topic";

export const gmoCropsSafetyData = {
  id: "gmo-crops-safety",
  title: "GMO Crops: Safe and Beneficial?",
  meta_claim:
    "Genetically modified crops are safe to eat and beneficial for agriculture.",
  status: "contested" as const,
  category: "science" as const,
  last_updated: "2026-06-16",
  tags: ["gmo", "agriculture", "food-safety", "glyphosate", "biotechnology"],
  pillars: [
    {
      id: "human-health",
      title: "Human Health",
      short_summary:
        "Decades of consumption and major scientific reviews find no demonstrated health difference between GE and conventional foods, but long-term and subtle effects are hard to rule out.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Absence of evidence of harm is not evidence of safety. There have been no large-scale, long-term, randomized human feeding trials — safety conclusions rest on animal studies, compositional-equivalence arguments, and epidemiology that cannot detect subtle or delayed effects. The National Academies committee itself acknowledged the genuine difficulty of detecting long-term or diffuse health effects. Each new trait is a distinct product, so a clean record for today's commercial varieties does not guarantee the safety of every future one, and most safety data is generated or funded by the developers seeking approval.",
      proponent_rebuttal:
        "Hundreds of independent and government reviews spanning 25+ years and billions of meals converge on the same conclusion: no substantiated evidence of a difference in human-health risk between current commercial GE crops and conventionally bred crops. Every approved trait undergoes compositional, allergenicity, and toxicity assessment before market. Conventional breeding (including mutagenesis) is actually less characterized than transgenic breeding, yet faces no comparable scrutiny — so the safety bar for GE crops is higher, not lower, than for the food it replaces.",
      crux: {
        id: "health-outcome-comparison",
        title: "Population Health Outcome Comparison",
        description:
          "Whether populations that adopted GE foods early and heavily (e.g. the US since 1996) show any divergence in diet-linked disease rates versus populations that largely avoided them (e.g. the EU), after controlling for confounders.",
        methodology:
          "Compare time-series of relevant health endpoints (cancers, allergies, GI disease, BMI) between high-GE-consumption and low-GE-consumption populations from 1996 onward; adjust for diet, demographics, and surveillance differences. Triangulate with animal multi-generational feeding studies and allergenicity assays.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (data analysis of existing public health datasets)",
      },
      evidence: [
        {
          id: "nas-2016-health",
          title: "National Academies: No Substantiated Health-Risk Difference",
          description:
            "The 2016 US National Academies of Sciences report, after reviewing ~900 studies, found no substantiated evidence of a difference in risks to human health between commercially available GE crops and conventionally bred crops, and found no persuasive evidence of adverse health effects directly attributable to eating GE foods.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'Genetically Engineered Crops: Experiences and Prospects' (2016)",
          sourceUrl:
            "https://www.nationalacademies.org/news/genetically-engineered-crops-experiences-and-prospects-new-report",
          reasoning:
            "Consensus report from a leading independent scientific body, drawing on hundreds of studies with a transparent methodology. Directly addresses the meta-claim. Slightly below maximum on replicability/independence because some underlying safety data is industry-generated, which the committee itself flags.",
        },
        {
          id: "nas-2016-limits",
          title: "National Academies: Long-Term/Subtle Effects Hard to Detect",
          description:
            "The same 2016 National Academies committee explicitly recognized the inherent difficulty of detecting subtle, long-term, or diffuse effects on human health, noting that available studies cannot fully rule them out — a limitation, not a finding of harm.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'Genetically Engineered Crops: Experiences and Prospects' (2016), Ch. 5 (Human Health Effects)",
          sourceUrl:
            "https://www.ncbi.nlm.nih.gov/books/NBK424534/",
          reasoning:
            "Authoritative caveat from the same consensus body, so highly reliable. Scored lower on directness/replicability because it establishes the limits of current knowledge rather than affirmatively demonstrating harm — it is an honest uncertainty, not positive evidence against safety.",
        },
      ],
    },
    {
      id: "agronomic-impact",
      title: "Agronomic Benefit",
      short_summary:
        "GE traits have raised yields and farmer profits and cut insecticide use, but herbicide-tolerant crops drove rising herbicide volumes and resistant 'superweeds'.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The dominant GE trait — herbicide tolerance — created a treadmill: blanket glyphosate spraying selected for glyphosate-resistant weeds, pushing total US herbicide volume up sharply and forcing a return to older, more toxic herbicides. Benefits also accrue mainly to a handful of commodity crops and seed firms, raise seed costs and patent dependency for farmers, and the 'benefit' of insect resistance is being eroded as target pests evolve resistance to Bt toxins.",
      proponent_rebuttal:
        "Across 147 studies, GE adoption raised yields ~22%, cut chemical pesticide use ~37%, and lifted farmer profits ~68%, with the largest gains for smallholders in developing countries. Insect-resistant Bt cotton slashed insecticide spraying (e.g. ~69% fewer sprays in parts of China) and produced area-wide 'halo' suppression of pests that even benefited non-GE growers. Herbicide-resistance is a weed-management problem common to all herbicides, addressable through stewardship and trait rotation — not a property unique to GE crops.",
      crux: {
        id: "net-agronomic-ledger",
        title: "Net Agronomic Ledger by Trait",
        description:
          "Whether, summed across yield, input use, profit, and resistance costs, the net effect of GE adoption is positive — and whether that net differs sharply between insect-resistant (Bt) traits and herbicide-tolerant traits.",
        methodology:
          "Disaggregate meta-analytic impact estimates by trait (Bt vs HT) and region; net herbicide-volume increases and resistance-management costs against yield, profit, and insecticide-reduction gains using USDA/ERS and peer-reviewed field data.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (data analysis of USDA and published meta-analyses)",
      },
      evidence: [
        {
          id: "klumper-qaim-2014",
          title: "Meta-Analysis: +22% Yield, -37% Pesticide, +68% Profit",
          description:
            "Klümper & Qaim's 2014 PLOS ONE meta-analysis of 147 studies found GM technology adoption reduced chemical pesticide use by 37%, increased crop yields by 22%, and increased farmer profits by 68%, with larger gains for insect-resistant crops and in developing countries.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Klümper W, Qaim M (2014), 'A Meta-Analysis of the Impacts of Genetically Modified Crops', PLOS ONE 9(11): e111629",
          sourceUrl:
            "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0111629",
          reasoning:
            "Peer-reviewed meta-analysis aggregating 147 studies with open data and transparent methods — directly addresses the 'beneficial for agriculture' claim. Not maxed on independence because it pools many studies of varying quality, some industry-linked.",
        },
        {
          id: "bt-cotton-china",
          title: "Bt Cotton Cut Insecticide Sprays and Suppressed Pests Area-Wide",
          description:
            "A 16-year study across six Chinese provinces found Bt cotton produced an area-wide 'halo' suppression of pink bollworm that benefited even neighboring non-Bt cotton: after 11 years, egg densities on non-Bt cotton fell ~91% and larvae ~95%, while bollworm-targeted insecticide sprays dropped from 8.0 (1992-1999) to 2.5 (2010), roughly a 69% reduction.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Wan et al. (2012), 'The Halo Effect: Suppression of Pink Bollworm on Non-Bt Cotton by Bt Cotton in China', PLOS ONE 7(7): e42004 (PMC)",
          sourceUrl:
            "https://pmc.ncbi.nlm.nih.gov/articles/PMC3407057/",
          reasoning:
            "Multi-year regional field data published in peer-reviewed venues; directly demonstrates an agronomic and environmental benefit of an insect-resistant GE trait. Slightly lower on directness because it covers one trait/region rather than GE crops as a whole.",
        },
        {
          id: "benbrook-herbicide-rise",
          title: "Herbicide-Tolerant Crops Drove Rising Herbicide Use and Resistant Weeds",
          description:
            "Benbrook's peer-reviewed analysis (Environmental Sciences Europe) found that glyphosate-resistant weeds spreading across HT-crop acreage drove herbicide volumes sharply upward — the extra herbicide needed to control tougher weeds rose from ~1.5 million lbs (1999) to ~90 million lbs (2011), increasing the herbicide burden by roughly 25%.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source:
            "Benbrook CM (2012), 'Impacts of genetically engineered crops on pesticide use in the U.S. — the first sixteen years', Environmental Sciences Europe 24:24 (Washington State University summary)",
          sourceUrl:
            "https://news.cahnrs.wsu.edu/article/pesticide-use-rises-as-herbicide-resistant-weeds-undermine-performance-of-major-ge-crops-new-wsu-study-shows/",
          reasoning:
            "Peer-reviewed quantification directly relevant to the 'beneficial' claim. Independence scored lower because the author has been publicly associated with organic-industry funding and the analysis is contested, but the core resistant-weed/herbicide-rise trend is independently corroborated by the National Academies.",
        },
        {
          id: "nas-resistant-weeds",
          title: "National Academies: Glyphosate-Resistant Weeds a 'Major Problem'",
          description:
            "The 2016 National Academies report independently concluded that evolved resistance to GE traits — especially glyphosate-resistant weeds on HT-crop land — is a major agricultural problem requiring integrated management, corroborating the resistance concern from a non-advocacy source.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'Genetically Engineered Crops: Experiences and Prospects' (2016)",
          sourceUrl:
            "https://www.nationalacademies.org/news/genetically-engineered-crops-experiences-and-prospects-new-report",
          reasoning:
            "Independent consensus body confirming the resistance downside, which strengthens the 'against' side beyond the contested Benbrook work. Directness is moderate because resistance is an agronomic management cost, not a flaw in the crops' safety to eat.",
        },
      ],
    },
    {
      id: "glyphosate-controversy",
      title: "Glyphosate & Cancer",
      short_summary:
        "The herbicide most tied to GE crops, glyphosate, is judged 'probably carcinogenic' by WHO's IARC but 'not likely carcinogenic' by EPA/EFSA — a regulatory split now litigated in court.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "GE crops are inseparable from the chemicals engineered to be used with them. WHO's cancer agency (IARC) classified glyphosate as 'probably carcinogenic to humans' (Group 2A), citing limited human evidence for non-Hodgkin lymphoma, sufficient animal evidence, and strong genotoxicity evidence. US juries have repeatedly found Roundup caused plaintiffs' cancers, and a US appeals court ordered EPA to redo its 'not likely carcinogenic' finding for ignoring evidence — so the safety verdict the proponents lean on is itself legally vacated.",
      proponent_rebuttal:
        "IARC assesses hazard (whether something could cause cancer at some dose), not real-world risk at actual exposures, and its glyphosate call is an outlier. EPA, EFSA, Health Canada, and other regulators that assess risk all concluded glyphosate is unlikely to be carcinogenic at label-rate exposures. Jury verdicts reflect litigation dynamics, not epidemiological consensus. Crucially, glyphosate is a herbicide, not a property of the modified plant's edible tissue — the safety of eating GE food is a separate question from herbicide toxicology.",
      crux: {
        id: "hazard-vs-risk",
        title: "Hazard Classification vs Real-World Exposure Risk",
        description:
          "Whether dietary and occupational glyphosate exposures from GE-crop agriculture occur at doses high enough to raise cancer risk — the load-bearing disagreement between IARC's hazard call and regulators' risk-based 'safe at label rates' findings.",
        methodology:
          "Compare large prospective cohorts of applicators (e.g. the Agricultural Health Study) and pooled NHL case-control data against measured dietary/occupational glyphosate exposure levels; reconcile hazard-based (IARC) and risk-based (EPA/EFSA) frameworks on the same evidence.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (synthesis of existing cohort and regulatory data)",
      },
      evidence: [
        {
          id: "iarc-2a",
          title: "WHO/IARC: Glyphosate 'Probably Carcinogenic' (Group 2A)",
          description:
            "In 2015 IARC classified glyphosate as Group 2A 'probably carcinogenic to humans', based on limited human evidence (non-Hodgkin lymphoma), sufficient evidence in experimental animals, and strong genotoxicity evidence.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source: "IARC Monographs Volume 112 (2015), WHO",
          sourceUrl:
            "https://www.iarc.who.int/featured-news/media-centre-iarc-news-glyphosate/",
          reasoning:
            "Authoritative independent WHO body. Scored lower on directness because it assesses the associated herbicide's hazard, not the edible GE crop, and lower on replicability because the classification is contested by other regulators.",
        },
        {
          id: "roundup-verdicts",
          title: "US Juries Repeatedly Linked Roundup to Cancer; $11B+ in Settlements",
          description:
            "Bayer (which acquired Monsanto) agreed to ~$11 billion in 2020 to settle Roundup cancer claims and has faced multiple large jury verdicts finding glyphosate-based Roundup caused plaintiffs' non-Hodgkin lymphoma, with further multibillion-dollar settlement activity reported through 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source:
            "Reporting on Bayer/Monsanto Roundup litigation and settlements (e.g. Drugwatch, Consumer Notice, 2020-2026)",
          sourceUrl: "https://www.drugwatch.com/legal/roundup-lawsuit/",
          reasoning:
            "Litigation outcomes are real and consequential but reflect tort standards and jury dynamics rather than epidemiological proof of causation; low replicability/directness because verdicts vary and concern the herbicide, not eating GE crops. Source is secondary legal-tracking reporting, not a primary court database.",
        },
        {
          id: "epa-not-likely",
          title: "EPA, EFSA, Health Canada: Glyphosate Unlikely to Be Carcinogenic",
          description:
            "EPA's 2020 assessment found no risks of concern to human health at label rates and that glyphosate is 'not likely to be carcinogenic to humans' — consistent with EFSA, USDA, and Health Canada's PMRA. A 2022 US appeals court later vacated the human-health portion and ordered EPA to redo the analysis, but did not overturn the scientific conclusion.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "US EPA, Glyphosate Interim Registration Review Decision (2020) and program page; concurred by EFSA and Health Canada PMRA",
          sourceUrl:
            "https://www.epa.gov/ingredients-used-pesticide-products/glyphosate",
          reasoning:
            "Multiple independent national regulators using risk-based frameworks converge on 'unlikely carcinogenic'. Scored down on independence/directness because EPA's human-health finding was court-vacated in 2022 and because it concerns the herbicide rather than the edible crop, though the underlying conclusion was not reversed.",
        },
      ],
    },
  ],
};
