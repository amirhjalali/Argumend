import type { Topic } from "@/lib/schemas/topic";

export const organicFoodHealthData = {
  id: "organic-food-health",
  title: "Is Organic Food Healthier?",
  meta_claim:
    "Organic food is significantly healthier and more nutritious than conventionally grown food.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "nutritional-content",
      title: "Nutritional Content",
      short_summary:
        "A Stanford meta-analysis of 237 studies found no strong evidence that organic food is more nutritious. Organic advocates say nutrition is the wrong metric.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Stanford's comprehensive 2012 meta-analysis of 237 studies found no significant nutritional advantage for organic foods. The organic label does not mean pesticide-free — it means different (often less-tested) pesticides are used. The price premium of 20-100% makes healthy eating less accessible, potentially worsening public health by pricing people out of fruits and vegetables entirely.",
      proponent_rebuttal:
        "The British Journal of Nutrition's larger 2014 meta-analysis of 343 studies found 18-69% more antioxidants in organic crops, including significantly higher levels of flavanones, flavonols, and anthocyanins. Organic produce has significantly lower cadmium levels (a toxic heavy metal) and far fewer pesticide residues. The Stanford study has been criticized for methodological limitations.",
      crux: {
        id: "health-outcome-organic-diet",
        title: "Health Outcomes from Long-Term Organic Diet",
        description:
          "A French cohort study of 69,000 people found 25% lower cancer rates among organic food consumers. Selection bias could explain all of it.",
        methodology:
          "Large-scale prospective cohort study (50,000+ participants) comparing health outcomes over 10+ years between verified organic consumers and matched conventional food consumers, controlling for income, overall diet quality, exercise, and other confounders.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$50M (10-year prospective cohort study)",
      },
      evidence: [
        {
          id: "stanford-2012",
          title: "Stanford Meta-Analysis: No Strong Evidence of Nutritional Superiority",
          description:
            "Smith-Spangler et al. analyzed 237 studies comparing organic and conventional foods. They found no consistent differences in vitamin content and only slightly higher phosphorus levels in organic foods — a nutrient rarely deficient in any diet. They concluded the evidence does not support organic food as significantly more nutritious.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Annals of Internal Medicine, Smith-Spangler et al. (2012)",
          reasoning:
            "Published in a top medical journal with rigorous methodology. Subsequent larger meta-analyses have partially challenged these findings, but the core conclusion on vitamins/minerals holds.",
        },
        {
          id: "bjn-2014",
          title: "BJN Meta-Analysis: 18-69% More Antioxidants in Organic",
          description:
            "Baranski et al. analyzed 343 peer-reviewed studies (106 more than Stanford) and found statistically significant differences: 18-69% higher antioxidant concentrations including flavanones, flavonols, stilbenes, and anthocyanins. Organic crops also had 48% lower cadmium concentrations and significantly fewer pesticide residues.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "British Journal of Nutrition, Baranski et al. (2014)",
          reasoning:
            "Larger sample than Stanford, published in a respected journal. Some criticism of methodology (inclusion criteria, weighting). Antioxidant differences are real but their health significance at observed levels is debated.",
        },
        {
          id: "usda-pesticide-residue",
          title: "USDA: Organic Produce Has 4x Fewer Pesticide Residues",
          description:
            "The USDA Pesticide Data Program finds that organic produce has roughly one-quarter the pesticide residue detections of conventional produce. While 23% of organic samples have detectable residues (from drift, contamination, or allowed substances), levels are dramatically lower than conventional samples.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "USDA Pesticide Data Program",
          reasoning:
            "Gold-standard government monitoring data. High reliability and replicability. Lower directness because the health significance of the residue difference — when conventional residues are already below EPA tolerances — is the contested question.",
        },
        {
          id: "newcastle-review",
          title: "Newcastle University: Organic Dairy and Meat Have 50% More Omega-3",
          description:
            "Srednicka-Tober et al. found that organic milk and dairy products contain approximately 50% more omega-3 fatty acids than conventional counterparts, along with higher levels of iron, vitamin E, and conjugated linoleic acids. Organic meat showed similar omega-3 advantages.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "British Journal of Nutrition, Newcastle University (2016)",
          reasoning:
            "Solid meta-analysis from a respected research group. Omega-3 differences are consistently found across studies. Health impact depends on overall dietary omega-3 intake, which can be obtained from many sources.",
        },
      ],
    },
    {
      id: "pesticide-exposure-risk",
      title: "Pesticide Exposure Risk",
      short_summary:
        "Every apple you eat contains pesticide residues below the safety threshold. The real question: what happens after 30 years of daily 'safe' exposures?",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Conventional pesticide residues are well below EPA safety thresholds, which already include 100-1000x safety margins. The dose makes the poison — trace amounts detected on produce pose negligible risk to healthy adults. Organic farming uses pesticides too, including copper sulfate (which accumulates in soil) and rotenone (linked to Parkinson's in animal studies).",
      proponent_rebuttal:
        "EPA tolerance levels are set based on single-chemical exposure in adults and do not adequately account for chronic low-dose exposure, cumulative effects of multiple pesticides, or heightened vulnerability of children. Studies show switching to an organic diet reduces urinary pesticide metabolites by 60% within one week. The French NutriNet-Sante study found 25% lower cancer risk among high organic consumers.",
      crux: {
        id: "chronic-low-dose-effects",
        title: "Chronic Low-Dose Pesticide Exposure Health Effects",
        description:
          "Each individual residue is below the safety threshold. Nobody has tested what happens when you eat 20 different 'safe' residues daily for 40 years.",
        methodology:
          "Long-term (20+ year) prospective study tracking biomarkers of pesticide exposure, health outcomes (cancer incidence, neurological function, reproductive health), and organic vs. conventional dietary patterns in a large cohort, with dose-response modeling.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$100M (Multi-decade prospective epidemiological study)",
      },
      evidence: [
        {
          id: "epa-tolerance-safety",
          title: "EPA: Conventional Residues Are 100-1000x Below Harmful Levels",
          description:
            "The EPA sets pesticide tolerance levels with built-in 100-fold safety factors (10x for interspecies variation, 10x for intraspecies variation, with additional factors for children). Over 99% of conventional produce samples fall within these tolerances. The EPA reviews each pesticide every 15 years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source: "EPA Office of Pesticide Programs",
          reasoning:
            "Regulatory authority with strong methodology. Independence slightly reduced because EPA tolerance-setting process is influenced by industry data and lobbying. The 100x safety margin argument is strong but assumes single-chemical exposure models are adequate.",
        },
        {
          id: "uc-berkeley-chamacos",
          title: "UC Berkeley CHAMACOS: Prenatal Pesticide Exposure Linked to Developmental Harm",
          description:
            "The 20-year CHAMACOS longitudinal study in California's Salinas Valley found that prenatal exposure to organophosphate pesticides was associated with lower IQ scores (7 points), attention problems, and poorer neurodevelopmental outcomes in children. Effects persisted into adolescence even at exposure levels common in the general population.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "UC Berkeley CERCH, Eskenazi et al.",
          reasoning:
            "Rigorous longitudinal design from a leading university. Exposures were higher than typical dietary-only exposure (agricultural community), which limits direct applicability to organic food claims. However, it demonstrates vulnerability of developing brains to these chemicals.",
        },
        {
          id: "organic-diet-intervention",
          title: "Organic Diet Reduces Urinary Pesticide Metabolites by 60% in One Week",
          description:
            "Multiple intervention studies (Curl et al. 2003, Oates et al. 2014, Hyland et al. 2019) show that switching to an organic diet reduces measurable urinary pesticide metabolites by 60-89% within 3-7 days. This demonstrates that dietary pesticide exposure is real and modifiable, though health significance of the reduction is debated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "Environmental Health Perspectives, multiple studies",
          reasoning:
            "Consistent results across multiple independent studies. Strong evidence that conventional food delivers measurable pesticide doses. Directness is lower because reducing pesticide metabolites in urine does not directly prove health benefits.",
        },
        {
          id: "organic-pesticide-toxicity",
          title: "Some Organic Pesticides Are More Toxic Per Application Than Synthetic Ones",
          description:
            "Research from the University of Guelph found that some organic-approved pesticides (rotenone, copper sulfate, pyrethrin) require higher application rates and can be more environmentally toxic per unit of pest control than targeted synthetic alternatives. Copper sulfate accumulates in soil and is toxic to aquatic organisms.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "University of Guelph, PLoS ONE (2010)",
          reasoning:
            "Peer-reviewed research challenging the assumption that organic means fewer/safer pesticides. Directness moderate because the comparison is about environmental toxicity per application, not human dietary exposure.",
        },
      ],
    },
  ],
};
