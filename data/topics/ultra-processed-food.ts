import type { Topic } from "@/lib/schemas/topic";

export const ultraProcessedFoodData = {
  id: "ultra-processed-food",
  title: "Are Ultra-Processed Foods Driving the Obesity Epidemic?",
  meta_claim:
    "Ultra-processed foods are the primary driver of the global obesity and chronic disease epidemic, and their regulation would significantly improve public health outcomes.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Causal Link Between UPFs and Obesity
    // =========================================================================
    {
      id: "upf-obesity-causation",
      title: "Causal Link Between UPFs and Obesity",
      short_summary:
        "Epidemiological studies consistently associate ultra-processed food consumption with weight gain and obesity, but whether UPFs cause obesity independently of caloric surplus and nutrient composition remains debated.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The association between ultra-processed foods and obesity is confounded by caloric intake, socioeconomic factors, and physical activity levels. The NOVA classification system — which defines ultra-processed foods — groups vastly different products together (whole-grain bread with industrial additives alongside candy bars) based on processing degree rather than nutritional content. Many nutrition scientists argue that total caloric intake and macronutrient composition, not processing per se, drive weight gain. People who eat more UPFs also tend to have lower incomes, less time for cooking, higher stress, and less access to healthcare — all independent obesity risk factors.",
      proponent_rebuttal:
        "The NIH's landmark 2019 randomized controlled trial by Kevin Hall directly addressed confounding. When 20 adults were given unlimited access to ultra-processed vs. unprocessed diets matched for calories, sugar, fat, fiber, and macronutrients, participants on the UPF diet spontaneously consumed 508 more calories per day and gained 0.9 kg in two weeks, while the unprocessed group lost 0.9 kg. This is causal evidence from a controlled experiment. A 2024 umbrella review in the BMJ analyzing 45 meta-analyses found UPF consumption associated with 32 adverse health outcomes including a 55% increased risk of obesity. The mechanisms — hyperpalatability engineering, disrupted satiety signaling from emulsifiers and artificial sweeteners, and rapid eating rates — operate independently of simple caloric accounting.",
      crux: {
        id: "upf-calorie-mechanism",
        title: "The Caloric Overconsumption Mechanism Test",
        description:
          "If ultra-processed foods cause obesity through mechanisms beyond simple caloric content — such as disrupted satiety signaling, accelerated eating rate, or gut microbiome alteration — then controlled studies matching UPF and whole-food diets for calories, macronutrients, and fiber should still show metabolic differences. If weight outcomes are identical when calories are strictly controlled, the NOVA classification adds nothing beyond what caloric accounting already explains.",
        methodology:
          "Conduct a large-scale (n>500) randomized crossover trial where participants consume isocaloric UPF and unprocessed diets for 4+ weeks each, with strict caloric control (not ad libitum). Measure body composition via DEXA, resting metabolic rate, gut microbiome composition, postprandial insulin and ghrelin responses, and inflammatory markers. Compare outcomes when caloric intake is identical versus when eating is ad libitum.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-10M (Large-scale metabolic ward study with strict dietary control and biomarker monitoring)",
      },
      evidence: [
        {
          id: "hall-nih-rct-2019",
          title: "NIH Randomized Controlled Trial Shows UPFs Drive 508 kcal/day Overconsumption (2019)",
          description:
            "Kevin Hall's landmark NIH study housed 20 weight-stable adults in a metabolic ward for 4 weeks. Participants were randomized to ultra-processed or unprocessed diets for 2 weeks each, with meals matched for presented calories, macronutrients, sugar, fat, sodium, and fiber. On the UPF diet, participants spontaneously ate 508 more calories per day, ate faster (17 more calories per minute), and gained 0.9 kg. On the unprocessed diet, they lost 0.9 kg. This is the strongest causal evidence that food processing independently drives overconsumption.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Cell Metabolism, Kevin D. Hall et al., NIH/NIDDK",
          sourceUrl: "https://doi.org/10.1016/j.cmet.2019.05.008",
          reasoning:
            "This is a randomized controlled trial conducted in a metabolic ward — the gold standard for nutrition research. The crossover design controls for individual variation. However, the small sample size (n=20) and short duration (2 weeks) limit generalizability. The ad libitum design proves UPFs drive overconsumption but does not isolate whether this is due to processing per se or correlated factors like eating rate and energy density.",
        },
        {
          id: "bmj-umbrella-review-2024",
          title: "BMJ Umbrella Review Links UPFs to 32 Adverse Health Outcomes (2024)",
          description:
            "A comprehensive umbrella review published in the BMJ in February 2024 synthesized evidence from 45 unique pooled analyses covering approximately 10 million participants. UPF consumption was associated with higher risk of 32 health outcomes including cardiovascular disease mortality (50% increase), type 2 diabetes (12% increase), obesity (55% increase), depression (22% increase), and all-cause mortality (21% increase). The authors rated the evidence for type 2 diabetes, cardiovascular mortality, anxiety, and common mental disorders as 'convincing' or 'highly suggestive.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "BMJ 2024;384:e077310, Lane et al.",
          sourceUrl: "https://doi.org/10.1136/bmj-2023-077310",
          reasoning:
            "An umbrella review of meta-analyses represents the highest level of epidemiological evidence. The sheer scale (10 million participants across dozens of studies) provides statistical power. However, nearly all underlying studies are observational, meaning residual confounding cannot be eliminated. The 'convincing' rating for some outcomes reflects dose-response relationships and biological plausibility, not experimental proof.",
        },
        {
          id: "nova-classification-critique",
          title: "Nutrition Scientists Challenge NOVA Classification as Scientifically Incoherent",
          description:
            "Multiple nutrition researchers have criticized the NOVA ultra-processed food classification system as overly broad and scientifically inconsistent. A 2024 analysis in the American Journal of Clinical Nutrition found that NOVA groups together nutritionally diverse products — packaged whole-grain bread, infant formula, plant-based meat alternatives, and candy — solely based on processing methods. The International Food Information Council found that 58% of Americans' daily calories come from NOVA-defined UPFs, but many of these are fortified foods that improve nutrient intake. Critics argue that reformulating products rather than eliminating entire categories would better serve public health.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "American Journal of Clinical Nutrition; International Food Information Council",
          sourceUrl: "https://doi.org/10.1016/j.ajcnut.2024.01.005",
          reasoning:
            "The critique of NOVA is methodologically sound — the classification does group nutritionally heterogeneous foods together. However, some critics have food industry funding, reducing independence scores. The reformulation argument has merit but does not address the Hall RCT findings that processing itself drives overconsumption independent of nutrient profile.",
        },
        {
          id: "socioeconomic-confounding",
          title: "Socioeconomic Factors Confound UPF-Obesity Association",
          description:
            "Lower-income populations consume more ultra-processed foods and also have higher obesity rates, but they simultaneously face food deserts, chronic stress, less leisure time for exercise, reduced healthcare access, and exposure to environmental obesogens. A 2023 study in The Lancet found that after adjusting for income, education, physical activity, and smoking, the association between UPF intake and obesity was attenuated by 30-40% in several cohorts. In some subgroup analyses of high-income participants with similar UPF intake, the obesity differential largely disappeared.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "The Lancet Public Health; NutriNet-Sante Cohort",
          sourceUrl: "https://doi.org/10.1016/S2468-2667(23)00156-3",
          reasoning:
            "Large cohort studies with detailed socioeconomic adjustment provide important context. The 30-40% attenuation after adjustment is significant and suggests confounding plays a meaningful role. However, attenuation is not elimination — a substantial association persists even after adjustment, and the Hall RCT provides causal evidence that operates independently of socioeconomic factors.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Health Effects Beyond Obesity
    // =========================================================================
    {
      id: "upf-chronic-disease",
      title: "Health Effects Beyond Obesity",
      short_summary:
        "Ultra-processed food consumption is linked to cardiovascular disease, type 2 diabetes, cancer, depression, and all-cause mortality — but whether these associations reflect direct harm from processing or are mediated entirely through obesity and poor nutrient profiles is contested.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The chronic disease associations attributed to ultra-processed foods are likely mediated through well-understood nutritional pathways — excess sugar, sodium, saturated fat, and insufficient fiber — rather than processing itself. When studies control for diet quality using established measures like the Healthy Eating Index, much of the UPF-disease association is attenuated. Additives like emulsifiers, artificial sweeteners, and preservatives are individually approved by food safety agencies (FDA, EFSA) based on toxicological testing. The precautionary alarm about processing exceeds what the mechanistic evidence supports.",
      proponent_rebuttal:
        "Emerging research identifies mechanisms of harm specific to processing that go beyond traditional nutrient accounting. Emulsifiers like carboxymethylcellulose and polysorbate-80 have been shown in animal and human studies to disrupt the gut mucosal barrier, promote inflammation, and alter the microbiome. Artificial sweeteners affect glucose tolerance through gut bacteria modification. The Maillard reaction products and acrylamide formed during industrial heat processing are classified as probable carcinogens by the IARC. A 2022 study in The Lancet found that for every 10% increase in UPF consumption, cancer incidence rose 2% and cancer mortality rose 6% — associations that persisted after adjusting for BMI, suggesting pathways independent of obesity.",
      crux: {
        id: "upf-independent-mechanisms",
        title: "The Processing-Independent Harm Test",
        description:
          "The decisive question is whether ultra-processed foods cause chronic disease through mechanisms beyond their nutrient profile. If matched-nutrient studies show that UPFs produce worse metabolic outcomes (inflammation, gut barrier disruption, insulin resistance) than nutritionally identical whole foods, then processing itself is harmful. If outcomes are identical, the problem is nutrients, not processing.",
        methodology:
          "Design a series of metabolic studies where participants consume nutritionally identical meals prepared either through ultra-processing methods (with emulsifiers, artificial sweeteners, industrial heat treatment) or through traditional cooking. Measure inflammatory markers (CRP, IL-6, TNF-alpha), gut permeability (lactulose-mannitol ratio), microbiome composition (16S rRNA sequencing), and continuous glucose monitoring over 8-12 week periods.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$3-8M (Multi-center controlled feeding study with comprehensive biomarker panel)",
      },
      evidence: [
        {
          id: "lancet-cancer-upf",
          title: "10% Increase in UPF Consumption Linked to 2% Rise in Cancer Incidence (2022)",
          description:
            "A study of 197,426 UK Biobank participants followed for a median of 10 years found that each 10% increase in UPF consumption was associated with a 2% increase in overall cancer incidence and a 6% increase in cancer mortality. Associations were strongest for ovarian cancer (19% increase) and brain tumors. Crucially, the associations persisted after adjustment for BMI, smoking, alcohol, physical activity, and dietary quality scores, suggesting pathways independent of obesity and general diet quality.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "eClinicalMedicine (The Lancet), Chang et al. 2023",
          sourceUrl: "https://doi.org/10.1016/j.eclinm.2023.101840",
          reasoning:
            "UK Biobank provides a large, well-characterized cohort. The persistence of associations after BMI adjustment supports processing-specific mechanisms. However, dietary assessment relied on 24-hour recalls which may not capture long-term habits, and residual confounding from unmeasured lifestyle factors cannot be excluded in observational data.",
        },
        {
          id: "emulsifier-gut-study",
          title: "Common Food Emulsifiers Disrupt Human Gut Microbiome in Randomized Trial (2024)",
          description:
            "A randomized controlled trial published in Nature in 2024 found that dietary emulsifiers carboxymethylcellulose (CMC) and polysorbate-80 — present in ice cream, sauces, baked goods, and many UPFs — altered the gut microbiome composition in healthy human volunteers within two weeks. CMC specifically reduced microbial diversity, increased pro-inflammatory Proteobacteria, and disrupted the mucus layer separating gut bacteria from the intestinal wall. These changes mirrored those previously seen in animal studies that led to metabolic syndrome and colitis.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Nature, Chassaing et al. 2024; Georgia State University",
          sourceUrl: "https://doi.org/10.1038/s41586-024-07150-0",
          reasoning:
            "A randomized human trial in a top-tier journal provides strong evidence that specific UPF additives directly affect gut biology. The replication of animal model findings in humans strengthens confidence. However, the doses used were at the high end of typical consumption, the sample size was modest, and long-term health consequences of microbiome changes remain to be established.",
        },
        {
          id: "fda-additive-safety",
          title: "FDA Safety Reviews Approved Most UPF Additives Based on Adequate Toxicological Testing",
          description:
            "The FDA's food additive approval process requires manufacturers to demonstrate safety through toxicological studies, typically including 90-day feeding studies, carcinogenicity assays, and reproductive toxicity tests. As of 2024, the FDA has approved over 10,000 food additives. The agency maintains that individual additives used within approved limits pose no demonstrated health risk. The European Food Safety Authority (EFSA) conducts independent re-evaluations and has generally concurred, though it has restricted some colorants and preservatives that the FDA still permits.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 6,
          },
          source: "FDA GRAS Program; EFSA; Government Accountability Office",
          sourceUrl: "https://www.fda.gov/food/food-ingredients-packaging/food-additive-status-list",
          reasoning:
            "FDA approval provides a regulatory baseline. However, the independence score is lower because the GRAS (Generally Recognized as Safe) system allows manufacturer self-determination, and a 2022 GAO report found the FDA rarely revisits old approvals. Individual additive testing also does not assess cumulative or synergistic effects of consuming dozens of additives simultaneously across multiple products daily — the real-world UPF exposure pattern.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Regulation & Industry Response
    // =========================================================================
    {
      id: "upf-regulation",
      title: "Regulation & Industry Response",
      short_summary:
        "Countries are beginning to regulate ultra-processed foods through front-of-pack labeling, advertising restrictions, and taxes — but the food industry argues these measures are paternalistic, economically harmful, and based on insufficient evidence to justify regulatory action.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Regulating foods based on processing degree rather than nutritional content is unprecedented and scientifically premature. No country has successfully reduced obesity through UPF-specific regulation. Chile's front-of-pack warning labels (implemented 2016) reduced purchases of labeled products by 24% but had no measurable impact on national obesity rates after 7 years. Mexico's sugar tax reduced soda consumption by 6% but obesity continued rising. UPF-specific taxes would disproportionately burden low-income families who depend on affordable processed foods. Reformulation of existing products — reducing sugar, sodium, and adding fiber — is a more evidence-based and politically feasible approach than demonizing entire food categories.",
      proponent_rebuttal:
        "The tobacco analogy is instructive: decades of industry-funded doubt preceded regulation that ultimately saved millions of lives. Internal documents from major food companies reveal deliberate engineering of 'bliss points' — optimal combinations of sugar, fat, and salt that maximize consumption. Brazil's dietary guidelines, which explicitly recommend avoiding UPFs, have been adopted by Uruguay, Ecuador, Peru, and Israel, and the WHO endorsed the NOVA framework in 2023 for monitoring food system health. Colombia's UPF tax (2023) and the UK's HFSS advertising restrictions (2024) represent a regulatory trend. The evidence for harm is at least as strong as the evidence was for tobacco regulation in the 1960s — waiting for perfect proof while the epidemic accelerates is itself a policy choice with consequences.",
      crux: {
        id: "upf-regulation-effectiveness",
        title: "The Regulatory Impact Assessment",
        description:
          "If UPF-targeted regulations (taxes, labeling, advertising restrictions) lead to measurable reductions in obesity and chronic disease incidence within 5-10 years of implementation, the public health case for regulation is validated. If countries with UPF regulations show no better health outcomes than comparable countries without them, regulatory resources would be better directed at other interventions.",
        methodology:
          "Conduct a natural experiment comparing health outcomes in countries with UPF regulations (Chile, Colombia, Mexico, UK) against matched controls without them, using difference-in-differences methodology. Track UPF consumption, obesity prevalence, type 2 diabetes incidence, and cardiovascular disease rates at 5, 10, and 15-year intervals. Control for GDP, healthcare spending, demographic shifts, and other confounders using synthetic control methods.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Multi-country longitudinal epidemiological comparison using existing health surveillance data)",
      },
      evidence: [
        {
          id: "chile-labeling-law",
          title: "Chile's Front-of-Pack Warning Labels Reduced UPF Purchases by 24% (2016-2023)",
          description:
            "Chile's Law 20.606 (2016) mandated black octagonal warning labels on foods high in sugar, sodium, calories, or saturated fat, and banned their advertising to children. Studies published in PLOS Medicine found labeled products saw a 24% reduction in purchases, and the food industry reformulated thousands of products to avoid labels. Sugar-sweetened beverage purchases fell 25%. However, a 2023 evaluation found no statistically significant change in national obesity prevalence, which continued rising from 34.4% to 37.8% between 2016 and 2022.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "PLOS Medicine; Chilean Ministry of Health; Taillie et al. 2021",
          sourceUrl: "https://doi.org/10.1371/journal.pmed.1003015",
          reasoning:
            "Chile provides the best natural experiment for UPF regulation, with 7+ years of follow-up data. The purchase reductions are real and significant, but the failure to dent obesity rates is a serious challenge to the regulation hypothesis. Proponents argue the evaluation period is too short and that product reformulation may yield benefits not captured by obesity rates alone.",
        },
        {
          id: "brazil-dietary-guidelines",
          title: "Brazil's NOVA-Based Dietary Guidelines Adopted by WHO and Multiple Countries (2014-2023)",
          description:
            "Brazil's 2014 Dietary Guidelines were the first national guidelines to explicitly recommend avoiding ultra-processed foods, organized around the NOVA classification system. The approach has since been adopted by Uruguay, Ecuador, Peru, Israel, Belgium, and France. In 2023, the WHO endorsed the NOVA framework for monitoring population diets and food system transformation. The guidelines shift focus from individual nutrients to food processing as the organizing principle of dietary advice, representing a paradigm change in nutrition policy.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Brazilian Ministry of Health; WHO; Food and Agriculture Organization",
          sourceUrl: "https://www.who.int/publications/i/item/9789240077041",
          reasoning:
            "WHO endorsement represents significant institutional validation of the UPF-harm framework. However, adoption by governments and international bodies is a policy signal, not evidence of health outcomes. Brazil's own obesity rate has continued rising despite the guidelines, though implementation and public awareness remain limited.",
        },
        {
          id: "food-industry-bliss-point",
          title: "Internal Industry Documents Reveal Deliberate Engineering of Overconsumption",
          description:
            "Investigative reporting by Michael Moss (Salt Sugar Fat, 2013) and subsequent document releases revealed that major food companies employ teams of food scientists to optimize the 'bliss point' — the precise combination of sugar, fat, and salt that maximizes consumption and repeat purchasing. Internal Frito-Lay research explicitly aimed to overcome 'sensory-specific satiety' (the brain's natural mechanism to stop eating) through flavor variation and textural engineering. A 2023 analysis in Addiction classified ultra-processed foods as meeting established criteria for addictive substances based on their capacity to trigger compulsive consumption despite negative consequences.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Salt Sugar Fat by Michael Moss; Addiction journal, Gearhardt et al. 2023",
          sourceUrl: "https://doi.org/10.1111/add.16065",
          reasoning:
            "Internal industry documents are primary sources that reveal intent. The addiction framework published in a peer-reviewed journal adds scientific credibility. However, the addiction analogy remains contested — many neuroscientists argue food does not produce the same compulsive use patterns as drugs — and the evidence for deliberate engineering of overconsumption, while suggestive, does not by itself prove that regulation would be effective.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain — Cell Metabolism (Hall et al. 2019)",
      url: "https://doi.org/10.1016/j.cmet.2019.05.008",
    },
    {
      title: "Ultra-Processed Food Exposure and Adverse Health Outcomes — BMJ Umbrella Review (2024)",
      url: "https://doi.org/10.1136/bmj-2023-077310",
    },
    {
      title: "WHO: Ultra-Processed Foods, Diet Quality, and Health — Technical Report (2023)",
      url: "https://www.who.int/publications/i/item/9789240077041",
    },
    {
      title: "NOVA Classification System — Monteiro et al., World Nutrition (2016)",
      url: "https://archive.wphna.org/wp-content/uploads/2016/01/WN-2016-7-1-3-28-38-Monteiro-Cannon-Levy-et-al-NOVA.pdf",
    },
    {
      title: "Chile's Front-of-Package Warning Label Policy — PLOS Medicine (2021)",
      url: "https://doi.org/10.1371/journal.pmed.1003015",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Do ultra-processed foods cause obesity independently of calories?",
      content:
        "The Hall NIH trial showed people spontaneously eat 508 more calories per day on UPF diets, but is this because processing itself disrupts satiety, or because UPFs are engineered to be energy-dense and hyper-palatable? If the overconsumption is entirely explained by sensory properties that could be replicated with whole foods, the problem is palatability engineering, not processing per se.",
    },
    {
      id: "q2",
      title: "Is the NOVA classification scientifically useful or misleadingly broad?",
      content:
        "NOVA groups whole-grain bread with added emulsifiers alongside candy bars as 'ultra-processed.' Critics argue this obscures nutritional differences that matter more than processing degree. Defenders argue the classification captures an emergent property — the overall health impact of the food matrix — that nutrient-by-nutrient analysis misses. Which framing better predicts health outcomes?",
    },
    {
      id: "q3",
      title: "Can regulation reduce UPF harm without disproportionately burdening low-income populations?",
      content:
        "Ultra-processed foods are often the most affordable and convenient options for working families. Taxes and restrictions could raise food costs for those least able to absorb them. Subsidizing whole foods, improving food access, and mandating industry reformulation are alternatives — but each has its own feasibility and effectiveness challenges.",
    },
  ],
};
