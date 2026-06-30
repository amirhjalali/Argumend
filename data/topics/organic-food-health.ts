import type { Topic } from "@/lib/schemas/topic";

export const organicFoodHealthData = {
  id: "organic-food-health",
  title: "Is Organic Food Healthier?",
  meta_claim:
    "Organic food is significantly healthier and more nutritious than conventionally grown food.",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Organic food isn't meaningfully more nutritious in the way most buyers assume — a Stanford review of 237 studies found no consistent vitamin or mineral advantage over conventional. The real, measurable differences are about 4x fewer pesticide-residue detections and ~48% lower cadmium; the health payoff of either is still unproven.",
    confidence: 84,
    source:
      "Smith-Spangler et al., Annals of Internal Medicine (Stanford, 2012); Barański et al., British Journal of Nutrition (2014)",
    sourceUrl:
      "https://www.acpjournals.org/doi/10.7326/0003-4819-157-5-201209040-00007",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Most people buy organic believing it is more nutritious, but the largest reviews don't support that — Stanford's analysis of 237 studies found no consistent vitamin or mineral advantage, and the antioxidant differences a later review did find haven't been shown to improve health at normal dietary doses.",
    "Where organic genuinely differs is exposure, not nutrition: conventional produce carries detectable pesticide residues about four times as often and ~48% more cadmium, and switching to organic measurably lowers pesticide metabolites in your urine within days.",
    "So the honest question isn't 'is organic more nutritious?' (mostly no) but 'is lowering already-low-dose pesticide and cadmium exposure worth a 20–100% price premium?' — a real, unresolved health-and-values question, not a settled nutrition fact.",
  ],
  pillars: [
    {
      id: "nutritional-content",
      title: "Nutritional Content",
      short_summary:
        "A Stanford meta-analysis of 237 studies found no strong evidence that organic food is more nutritious. Organic advocates say nutrition is the wrong metric.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Stanford's 2012 review (Smith-Spangler et al., Annals of Internal Medicine, 237 studies) found no consistent vitamin or mineral advantage for organic foods. Even the antioxidant gaps later reported by Barański are concentration differences on the plant, not demonstrated health benefits in people — no trial shows that the extra flavonols lower disease risk at the doses a normal diet delivers. The organic label is not 'pesticide-free'; it permits its own (often less-studied) inputs. And a 20-100% price premium can price shoppers out of fruits and vegetables entirely, which would harm public health more than any residue.",
      proponent_rebuttal:
        "Vitamins were never the strongest case. The British Journal of Nutrition's larger 2014 meta-analysis (Barański et al., 343 studies) found organic crops carried 18-69% higher antioxidant/(poly)phenol concentrations — flavanones up ~69%, anthocyanins ~51%, flavonols ~50%, stilbenes ~28% — plus roughly 48% lower cadmium (a toxic heavy metal) and detectable pesticide residues about four times less often. The Stanford review counted vitamins and minerals but largely set antioxidants aside, which is where the real organic-vs-conventional gap shows up.",
      crux: {
        id: "health-outcome-organic-diet",
        title: "Health Outcomes from Long-Term Organic Diet",
        description:
          "The French NutriNet-Santé cohort (Baudry et al. 2018, ~69,000 adults) found ~25% lower overall cancer incidence among the highest organic-food consumers (HR ~0.75). But organic buyers also exercise more, smoke less, and eat more produce — residual confounding or selection bias could explain much or all of it.",
        methodology:
          "Large-scale prospective cohort study (50,000+ participants) comparing health outcomes over 10+ years between verified organic consumers and matched conventional food consumers, controlling for income, overall diet quality, exercise, and other confounders.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$50M (10-year prospective cohort study)",
        falsification: {
          supporter_flip:
            "If a large cohort or trial that rigorously controlled for the confounders — organic buyers are wealthier, leaner, exercise more, eat more produce — erased the NutriNet-Santé ~25% cancer gap, showing organic eating itself confers no benefit once lifestyle is accounted for, the health case for organic would mostly collapse.",
          skeptic_flip:
            "A skeptic should weigh that organic eaters show measurably lower pesticide and cadmium exposure (not just self-reported behavior) — so if those exposures carry real chronic risk, the observed outcome gap would have a plausible mechanism rather than being pure selection.",
          common_ground:
            "Both sides agree organic and conventional produce are nutritionally similar on vitamins and minerals, and that organic buyers differ systematically in income and lifestyle.",
          live_disagreement:
            "Whether the lower cancer incidence among heavy organic consumers reflects the food itself or the healthier, wealthier lifestyle of the people who buy it — a question no randomized trial has settled.",
        },
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
          source:
            "Smith-Spangler et al., 'Are Organic Foods Safer or Healthier Than Conventional Alternatives? A Systematic Review,' Annals of Internal Medicine 157(5):348-366 (2012)",
          sourceUrl: "https://www.acpjournals.org/doi/10.7326/0003-4819-157-5-201209040-00007",
          reasoning:
            "Published in a top medical journal with rigorous methodology. The 237-study count and the 'no consistent vitamin difference, slightly higher phosphorus in organic' conclusions are verified against the published review. Subsequent larger meta-analyses have partially challenged these findings on antioxidants, but the core conclusion on vitamins/minerals holds.",
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
          source:
            "Barański et al., 'Higher antioxidant and lower cadmium concentrations and lower incidence of pesticide residues in organically grown crops,' British Journal of Nutrition 112(5):794-811 (2014)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4141693/",
          reasoning:
            "Verified against the published meta-analysis: flavanones +69%, anthocyanins +51%, flavonols +50%, stilbenes +28% (the 18-69% range), cadmium ~48% lower, pesticide residues ~4x more frequent in conventional. Larger sample (343 publications) than Stanford. Some criticism of methodology (inclusion criteria, weighting); the cadmium estimate has a wide confidence interval. Antioxidant differences are real but their health significance at observed levels is debated.",
        },
        {
          id: "usda-pesticide-residue",
          title: "Organic Produce Has Roughly 4x Fewer Pesticide Residue Detections",
          description:
            "The Barański et al. (2014) meta-analysis found detectable pesticide residues in about 11% of organic samples versus 46% of conventional samples — roughly four times more frequent in conventional produce. Some organic residues arise from drift, contamination, or allowed substances. The USDA Pesticide Data Program (PDP) provides the underlying U.S. residue-monitoring dataset, though it does not itself publish this specific organic-vs-conventional ratio.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source:
            "Barański et al., British Journal of Nutrition 112(5):794-811 (2014), drawing on residue-monitoring data; underlying U.S. data: USDA Pesticide Data Program",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4141693/",
          reasoning:
            "The ~4x figure is from the Barański meta-analysis (11% vs 46% detection), not a headline USDA PDP statistic, so the source attribution and reliability are corrected downward from the earlier overstated 'USDA finds 23%' framing. Lower directness because the health significance of the residue difference — when conventional residues are already below EPA tolerances — is the contested question. USDA PDP dataset: https://www.ams.usda.gov/datasets/pdp",
        },
        {
          id: "newcastle-review",
          title: "Newcastle University: Organic Dairy and Meat Have 50% More Omega-3",
          description:
            "Średnicka-Tober et al. found that organic milk contains roughly 50% more total omega-3 fatty acids than conventional milk (estimated ~56% higher n-3 PUFA), along with higher iron, vitamin E (α-tocopherol), and conjugated linoleic acid; a companion analysis found similar omega-3 advantages in organic meat. The authors noted the absolute differences may not be nutritionally decisive for most diets.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Średnicka-Tober et al., 'Higher PUFA and n-3 PUFA ... in organic milk: a systematic literature review and meta- and redundancy analyses,' British Journal of Nutrition 115(6):1043-1060 (2016)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26878105/",
          reasoning:
            "Solid meta-analysis (170 studies) from the Newcastle group. The ~50% omega-3 figure is verified for milk. Independence slightly reduced — the Newcastle/organic-research team has been criticized for emphasis, and the authors themselves cautioned the differences may not be 'nutritionally relevant' given total dietary intake from other sources.",
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
        "Conventional residues sit well below EPA tolerances, which build in 100-fold (or larger) safety margins. The dose makes the poison — trace amounts on produce pose negligible risk to healthy adults. Organic farming uses pesticides too, including copper sulfate (which accumulates in soil) and, historically, rotenone (linked to Parkinson's in animal studies). And the headline cohort result cuts both ways: NutriNet-Santé participants who buy the most organic also tend to be wealthier, leaner, and more health-conscious, so an observational 25% gap is exactly what selection bias would produce even if organic food did nothing.",
      proponent_rebuttal:
        "EPA tolerances are derived largely from single-chemical exposure in adults and were not designed to capture chronic low-dose intake, cumulative effects of pesticide mixtures, or the heightened vulnerability of developing children. Controlled intervention studies (Curl 2003; Oates 2014; Hyland 2019) show that switching to an organic diet sharply lowers urinary pesticide metabolites within days — reductions that vary by chemical, from roughly 49% up to ~95% for malathion. The French NutriNet-Santé cohort (Baudry 2018) further found ~25% lower cancer incidence among the highest organic consumers, consistent with — though not proof of — a real effect.",
      crux: {
        id: "chronic-low-dose-effects",
        title: "Chronic Low-Dose Pesticide Exposure Health Effects",
        description:
          "Each individual residue is below the safety threshold. Nobody has tested what happens when you eat 20 different 'safe' residues daily for 40 years.",
        methodology:
          "Long-term (20+ year) prospective study tracking biomarkers of pesticide exposure, health outcomes (cancer incidence, neurological function, reproductive health), and organic vs. conventional dietary patterns in a large cohort, with dose-response modeling.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$100M (Multi-decade prospective epidemiological study)",
        falsification: {
          supporter_flip:
            "If long-term studies showed that the cumulative, mixture, and developmental exposures EPA tolerances don't fully model still produced no detectable harm at real dietary-residue levels, the case for paying to avoid them would weaken.",
          skeptic_flip:
            "A skeptic who trusts EPA tolerances should weigh that those limits are largely built from single-chemical adult exposure, while studies like CHAMACOS show developing brains are vulnerable to these compounds — so 'each residue is below tolerance' doesn't settle cumulative or early-life risk.",
          common_ground:
            "Both sides agree individual conventional residues sit below EPA tolerances, and that organic farming uses its own pesticides too.",
          live_disagreement:
            "Whether decades of low-dose exposure to many residues at once — especially for fetuses and children — carries real risk, which single-chemical tolerance testing was never designed to answer.",
        },
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
          source:
            "EPA, Summary of the Food Quality Protection Act (1996) — establishes the 100-fold (10x interspecies x 10x intraspecies) margin plus an additional 10x children's safety factor; FIFRA registration review on a 15-year cycle",
          sourceUrl: "https://www.epa.gov/laws-regulations/summary-food-quality-protection-act",
          reasoning:
            "Regulatory authority; the 100-fold base margin and the additional 10x FQPA children's factor are verified. Independence slightly reduced because EPA tolerance-setting relies on industry-submitted data. The 100x+ safety margin argument is strong but assumes single-chemical exposure models adequately capture cumulative/mixture exposure.",
        },
        {
          id: "uc-berkeley-chamacos",
          title: "UC Berkeley CHAMACOS: Prenatal Pesticide Exposure Linked to Developmental Harm",
          description:
            "The UC Berkeley CHAMACOS longitudinal study in California's Salinas Valley found that children with the highest prenatal organophosphate exposure scored about 7 IQ points lower at age 7 than those with the lowest exposure (each tenfold increase in prenatal markers ~5.5 points). The cohort is an agricultural-community sample, so exposures exceed typical dietary-only levels.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Bouchard, Eskenazi et al. (CHAMACOS, UC Berkeley), 'Prenatal Exposure to Organophosphate Pesticides and IQ in 7-Year-Old Children,' Environmental Health Perspectives 119(8):1189-1195 (2011)",
          sourceUrl: "https://ehp.niehs.nih.gov/doi/10.1289/ehp.1003185",
          reasoning:
            "Rigorous longitudinal design from a leading university; the 7-point IQ gap (highest vs lowest exposure) is verified. Directness lowered because exposures were higher than typical dietary-only exposure (farmworker community, including drift and take-home dust), limiting direct applicability to organic-vs-conventional food choice. It demonstrates developing-brain vulnerability to these chemicals.",
        },
        {
          id: "organic-diet-intervention",
          title: "Organic Diet Reduces Urinary Pesticide Metabolites by 60% in One Week",
          description:
            "Multiple intervention studies (Curl et al. 2003; Oates et al. 2014; Hyland et al. 2019) show that switching to an organic diet measurably lowers urinary pesticide metabolites within days — reductions vary widely by pesticide class and study (roughly 49-89%, with the largest drops for malathion, clothianidin, and chlorpyrifos). This demonstrates dietary pesticide exposure is real and modifiable, though the health significance of the reduction is debated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source:
            "Hyland et al., 'Organic diet intervention significantly reduces urinary pesticide levels in U.S. children and adults,' Environmental Research 171:568-575 (2019); see also Curl et al., Environmental Health Perspectives (2003) and Oates et al., Environmental Research (2014)",
          sourceUrl: "https://www.sciencedirect.com/science/article/pii/S0013935119300246",
          reasoning:
            "Consistent results across multiple independent studies. Strong evidence that conventional food delivers measurable pesticide doses. The single '60%' figure was replaced with the verified across-study range, since reductions differ markedly by metabolite. Directness is lower because reducing urinary metabolites does not directly prove health benefits.",
        },
        {
          id: "organic-pesticide-toxicity",
          title: "Some Organic Pesticides Are More Toxic Per Application Than Synthetic Ones",
          description:
            "A University of Guelph field/lab study (Bahlai et al. 2010) compared organic-approved insecticides (a mineral-oil product and a fungal biopesticide) against conventional and newer reduced-risk synthetics for soybean-aphid control. The organic products were less effective and, at field-use rates, had similar or higher Environmental Impact Quotients and greater harm to natural-enemy insects — challenging the assumption that 'organic' pesticides are automatically greener. (Separately, copper sulfate, allowed in some organic systems, accumulates in soil and is toxic to aquatic life.)",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Bahlai, Xue, McCreary, Schaafsma & Hallett (University of Guelph), 'Choosing Organic Pesticides over Synthetic Pesticides May Not Effectively Mitigate Environmental Risk in Soybeans,' PLoS ONE 5(6):e11250 (2010)",
          sourceUrl: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0011250",
          reasoning:
            "Peer-reviewed research challenging the assumption that organic means fewer/safer pesticides. The original claim overstated scope — this specific study tested soybean-aphid insecticides (mineral oil + a fungal product), not rotenone/copper sulfate/pyrethrin application rates, so the description was corrected and directness lowered. The comparison is about environmental toxicity per application, not human dietary exposure.",
        },
      ],
    },
  ],
};
