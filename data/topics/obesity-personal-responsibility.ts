import type { Topic } from "@/lib/schemas/topic";

export const obesityPersonalResponsibilityData = {
  id: "obesity-personal-responsibility",
  title: "Is Obesity a Personal Choice or a Systemic Failure?",
  meta_claim:
    "The obesity epidemic is primarily caused by individual lifestyle choices, and framing it as a disease or systemic issue undermines personal responsibility.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Food Environment Design
    // =========================================================================
    {
      id: "food-environment-design",
      title: "Food Environment Design",
      short_summary:
        "Ultra-processed foods now constitute 60% of calories consumed in the US, engineered for hyper-palatability and sold at a fraction of the cost of whole foods. Food deserts affect 23.5 million Americans who lack access to affordable, nutritious options. Proponents of the systemic view argue the food environment is deliberately designed to override satiety signals. Skeptics counter that personal agency still determines what people eat, and that framing the environment as inescapable infantilizes individuals.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "People make food choices every day, and millions of individuals in the same food environment maintain healthy weights. The existence of ultra-processed foods does not compel anyone to eat them. Personal responsibility advocates point out that calorie information is widely available, healthy options exist even in low-income areas (rice, beans, frozen vegetables), and that cultural attitudes toward food — not corporate engineering — drive overconsumption. Countries with similar food industry presence (Japan, South Korea) have far lower obesity rates, suggesting cultural and individual factors dominate. Blaming the food environment creates a victim mentality that discourages the very behavioral changes needed to address obesity.",
      proponent_rebuttal:
        "The food environment is not a neutral marketplace of free choice — it is an engineered system optimized for overconsumption. Research by Kevin Hall at the NIH (2019) demonstrated in a randomized controlled trial that people consumed 500 more calories per day on an ultra-processed diet compared to an unprocessed diet matched for available calories, macronutrients, sugar, fat, and fiber. Participants were not told to overeat — the ultra-processed foods overrode their satiety signals. Food deserts and food swamps (areas saturated with fast food but lacking grocery stores) disproportionately affect Black and low-income communities, creating structural barriers to healthy eating that cannot be reduced to individual willpower. The food industry spends $14 billion per year on advertising, with the heaviest targeting directed at children and minority communities. Japan and South Korea have extensive food regulation, school lunch programs, and cultural infrastructure around fresh food preparation that the US lacks — their lower obesity rates are evidence of systemic solutions, not individual virtue.",
      crux: {
        id: "food-environment-causation",
        title: "The Ultra-Processed Food Causation Test",
        description:
          "Determine whether the ultra-processed food environment causally drives obesity independent of individual choice, or whether personal agency remains the dominant factor in weight outcomes.",
        methodology:
          "Conduct large-scale randomized controlled trials (expanding on Hall et al. 2019) comparing ad libitum caloric intake and weight change across ultra-processed vs. whole food diets over 6-12 months. Simultaneously analyze natural experiments where food environment policy changed (e.g., sugary drink taxes in Mexico, junk food advertising bans in Chile) and measure population-level obesity rate changes. Cross-reference with individual-level longitudinal data tracking food access, purchasing behavior, and weight outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-15M (Multi-site RCTs with metabolic ward and free-living phases, plus policy natural experiment analysis)",
      },
      evidence: [
        {
          id: "hall-upf-rct",
          title:
            "NIH RCT: Ultra-Processed Diets Cause 500 kcal/day Overconsumption (Hall et al. 2019)",
          description:
            "Kevin Hall's landmark NIH metabolic ward study randomized 20 adults to ultra-processed or unprocessed diets for two weeks each. On the ultra-processed diet, participants spontaneously consumed 508 more calories per day and gained 0.9 kg, despite meals being matched for available calories, macronutrients, sugar, sodium, and fiber. On the unprocessed diet, participants lost 0.9 kg. This was the first randomized evidence that ultra-processed foods causally drive overconsumption.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Hall et al., Cell Metabolism (2019)",
          sourceUrl:
            "https://doi.org/10.1016/j.cmet.2019.05.008",
          reasoning:
            "Published in a top-tier journal, conducted at the NIH Clinical Center with rigorous metabolic ward methodology. The RCT design establishes causation, not just correlation. Replicability is somewhat lower because metabolic ward studies are expensive and the sample was small (n=20), though the effect size was very large.",
        },
        {
          id: "food-desert-disparities",
          title:
            "23.5 Million Americans Live in Food Deserts with Limited Healthy Options",
          description:
            "USDA data shows 23.5 million Americans live in food deserts — low-income areas more than one mile from a supermarket in urban areas or ten miles in rural areas. These communities have 2-3x more fast food restaurants per capita than affluent neighborhoods. Research published in the American Journal of Preventive Medicine found that residents of food deserts have 25-50% higher obesity rates than those with access to full-service grocery stores, even after controlling for income.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "USDA Economic Research Service; American Journal of Preventive Medicine",
          reasoning:
            "USDA food access data is comprehensive and publicly available. The correlation between food access and obesity is well-documented across multiple studies. Directness is moderate because food deserts are correlated with other poverty-related health determinants, making it difficult to isolate food access as the causal factor.",
        },
        {
          id: "chile-junk-food-regulations",
          title:
            "Chile's Junk Food Regulations Reduced Sugary Drink Purchases by 24%",
          description:
            "Chile implemented comprehensive food labeling laws (2016) requiring black warning labels on foods high in sugar, sodium, fat, or calories, along with bans on marketing unhealthy foods to children and removing them from schools. A study in PLOS Medicine (2020) found sugary drink purchases fell 24% in the 18 months following implementation, with the largest reductions among the heaviest consumers. Subsequent data showed a measurable reduction in childhood obesity rates in regulated school environments.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Taillie et al., PLOS Medicine (2020)",
          sourceUrl:
            "https://doi.org/10.1371/journal.pmed.1003015",
          reasoning:
            "Published in a respected journal with a strong quasi-experimental design leveraging a national policy change. The 24% reduction in sugary drinks is a large effect from a labeling intervention alone. Replicability is moderate because Chile's results may not generalize perfectly to other cultural contexts.",
        },
        {
          id: "personal-agency-cross-cultural",
          title:
            "Countries with Similar Food Industries Have Very Different Obesity Rates",
          description:
            "Japan (obesity rate ~4%) and South Korea (~6%) have access to the same global food corporations and ultra-processed products as the US (~42%) yet maintain dramatically lower obesity rates. Critics of the systemic argument point to cultural factors — smaller portions, walking-oriented infrastructure, social norms around body weight, school lunch programs emphasizing whole foods — as evidence that individual and cultural choices, not food industry presence alone, determine obesity outcomes.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "WHO Global Health Observatory; OECD Health Statistics",
          reasoning:
            "Cross-national comparisons are informative but imperfect. Proponents counter that Japan and South Korea have extensive government food regulation, mandatory school lunch programs, and cultural infrastructure that represent systemic solutions — not proof that individual willpower alone explains the difference. Directness is limited because many confounding variables differ between countries.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Genetics and Biology
    // =========================================================================
    {
      id: "genetics-and-biology",
      title: "Genetics and Biology",
      short_summary:
        "Twin studies consistently show that BMI heritability is 40-70%, and over 1,000 genetic variants associated with obesity have been identified through GWAS. The gut microbiome, hormonal regulation (leptin, ghrelin, insulin), and metabolic adaptation all influence body weight in ways that cannot be overridden by willpower alone. Skeptics argue that genes have not changed in 50 years while obesity tripled, suggesting environment and behavior remain the primary drivers.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "While genetics clearly influence body weight predisposition, the obesity epidemic is a recent phenomenon — US obesity rates tripled from 14% in 1970 to 42% in 2020. Human genetics did not change in 50 years. What changed was behavior: caloric intake increased by ~500 calories per day, physical activity declined dramatically, and sedentary screen time exploded. Twin studies showing 40-70% heritability mean that within a given environment, genetics explain much of the variation — but when the entire environment shifts toward overconsumption, the population distribution shifts with it. Genetics set the range; choices determine where individuals fall within that range. Overemphasizing biology creates fatalism that discourages the dietary and exercise changes that have been proven to reduce weight.",
      proponent_rebuttal:
        "The biological case is far stronger than 'genetics set a range.' Leptin, the primary satiety hormone, was discovered in 1994 — and subsequent research showed that obese individuals develop leptin resistance, meaning their brains cannot properly register satiety signals regardless of willpower. Metabolic adaptation studies (Fothergill et al. 2016, published in Obesity) tracked Biggest Loser contestants and found that six years after dramatic weight loss, their metabolisms had slowed by an average of 500 kcal/day below predicted levels, and their leptin levels remained suppressed. This means the body actively fights to regain lost weight through hormonal and metabolic mechanisms. Gut microbiome research has shown that transplanting gut bacteria from obese mice into germ-free lean mice causes weight gain without any change in diet. The 40-70% heritability figure means genetics are the single largest determinant of body weight — larger than any individual behavioral factor. The obesity epidemic reflects gene-environment interaction: susceptible genotypes existed for millennia but were only exposed to the modern hypercaloric environment recently.",
      crux: {
        id: "biological-determinism-threshold",
        title: "The Biological Override Threshold Test",
        description:
          "Determine the degree to which biological factors (genetics, hormones, microbiome, metabolic adaptation) constrain an individual's ability to maintain a healthy weight through behavioral changes alone. If biological factors create a 'set point' that the body defends through metabolic and hormonal adaptation, willpower-based interventions are fundamentally limited.",
        methodology:
          "Conduct long-term (5+ year) metabolic studies tracking individuals who achieve significant weight loss through behavioral intervention alone (diet and exercise). Measure resting metabolic rate, leptin, ghrelin, insulin, thyroid hormones, and gut microbiome composition at baseline, post-weight-loss, and annually for 5 years. Calculate the percentage of participants who maintain >10% weight loss at 5 years and characterize the biological predictors of success and failure. Compare against pharmacological intervention cohorts (GLP-1 agonists) to quantify the biological resistance that behavioral interventions must overcome.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10-25M (Multi-year longitudinal metabolic study with comprehensive biomarker tracking across behavioral and pharmacological cohorts)",
      },
      evidence: [
        {
          id: "twin-study-heritability",
          title:
            "Twin Studies Show 40-70% Heritability of BMI Across Populations",
          description:
            "A meta-analysis of twin studies encompassing over 140,000 twin pairs from multiple countries (Elks et al., American Journal of Clinical Nutrition, 2012) found that genetic factors account for 40-70% of variation in BMI, with shared environment accounting for only 10-25% in childhood and near zero in adulthood. Identical twins reared apart have BMIs nearly as correlated as those reared together, demonstrating that genetic influence persists independent of shared food environment.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Elks et al., American Journal of Clinical Nutrition (2012)",
          reasoning:
            "Twin studies are the gold standard for estimating heritability, and this meta-analysis aggregates decades of data across multiple populations. The consistency of findings (40-70%) across different countries and time periods is highly compelling. Directness is slightly reduced because heritability measures genetic contribution to variation within an environment, not the absolute biological constraint on an individual.",
        },
        {
          id: "metabolic-adaptation-biggest-loser",
          title:
            "Biggest Loser Study: Metabolism Slowed 500 kcal/day Six Years After Weight Loss",
          description:
            "Fothergill et al. (2016) tracked 14 Biggest Loser contestants for six years after the competition. Despite regaining most of their lost weight, participants' resting metabolic rates remained suppressed by an average of 499 kcal/day below what would be predicted for their body size. Leptin levels, which signal satiety to the brain, remained at ~60% of expected levels. The body appeared to permanently 'remember' its highest weight and actively resisted the lower weight through metabolic and hormonal adaptation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "Fothergill et al., Obesity (2016)",
          sourceUrl:
            "https://doi.org/10.1002/oby.21538",
          reasoning:
            "Published in the leading obesity research journal with detailed metabolic measurements. The finding that metabolism remains suppressed years after weight loss directly demonstrates biological resistance to behavioral weight management. Replicability is moderate because the sample is small (n=14) and from an extreme weight loss context, though similar metabolic adaptation has been documented in other studies.",
        },
        {
          id: "microbiome-transplant-mouse",
          title:
            "Gut Microbiome Transplant from Obese to Lean Mice Causes Weight Gain",
          description:
            "Turnbaugh et al. (2006, Nature) demonstrated that transplanting gut microbiota from obese mice into germ-free lean mice caused significantly greater fat gain than transplanting microbiota from lean mice, with no difference in food intake. Subsequent human studies (Ridaura et al., Science, 2013) confirmed that transplanting gut bacteria from obese human twins into germ-free mice reproduced the obesity phenotype. The obese-associated microbiome was more efficient at extracting calories from food.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Turnbaugh et al., Nature (2006); Ridaura et al., Science (2013)",
          reasoning:
            "Published in the two highest-impact scientific journals with rigorous germ-free mouse methodology. The causal design (transplant causing weight gain without dietary change) is compelling. Directness is somewhat limited because mouse microbiome findings do not always translate directly to human obesity, and the magnitude of effect in humans remains under investigation.",
        },
        {
          id: "obesity-tripled-50-years",
          title:
            "US Obesity Tripled in 50 Years — Genes Cannot Explain a Population-Level Shift",
          description:
            "US adult obesity rates rose from 13.4% in 1960-62 to 42.4% in 2017-18 (NHANES data). The human genome does not change meaningfully over 50 years, yet the entire population weight distribution shifted rightward. Critics of the biological determinism argument note that this population-level shift can only be explained by environmental and behavioral changes: a 500+ kcal/day increase in average caloric intake, dramatic reductions in occupational physical activity, increased sedentary leisure time, and the proliferation of hyper-palatable ultra-processed foods.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "CDC NHANES; Swinburn et al., The Lancet (2011)",
          reasoning:
            "NHANES is the gold standard for US population health surveillance, and the obesity trend is among the most replicated findings in public health. The argument that genes cannot explain a 50-year population shift is logically sound. However, proponents counter that the gene-environment interaction framework explains precisely this: genetically susceptible individuals were always present but only became obese when exposed to the modern food environment, which is itself a systemic (not individual choice) argument.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: The GLP-1 Revolution
    // =========================================================================
    {
      id: "glp1-revolution",
      title: "The GLP-1 Revolution",
      short_summary:
        "Semaglutide (Ozempic/Wegovy) and tirzepatide (Mounjaro/Zepbound) produce 15-22% body weight loss by mimicking gut hormones that regulate appetite and satiety. Proponents argue that the dramatic success of pharmacological intervention proves obesity is a biological disease requiring medical treatment, not a moral failing. Skeptics contend that GLP-1 drugs are a $100 billion crutch that medicalizes lifestyle problems, creates lifelong pharmaceutical dependency, and diverts attention from addressing root causes.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "GLP-1 drugs work by suppressing appetite — they do not fix any underlying 'disease.' They are essentially pharmaceutical willpower substitutes that cost $1,000-1,500 per month, create lifelong dependency (weight regain upon discontinuation is 67% within one year), and generate enormous profits for pharmaceutical companies. The medicalization of obesity through GLP-1 drugs diverts attention from the cheaper, more sustainable solutions: better nutrition education, food policy reform, urban design for walkability, and cultural shifts toward healthier eating. If obesity were truly a biological disease like diabetes, we would expect it to be evenly distributed across socioeconomic classes — but it is heavily concentrated among low-income populations, suggesting environmental and behavioral factors dominate. Prescribing a $15,000/year drug to counteract a $5 fast food meal is addressing the symptom, not the cause.",
      proponent_rebuttal:
        "The success of GLP-1 drugs is the strongest evidence that obesity is a biological condition, not a character flaw. Semaglutide 2.4mg (Wegovy) produced 14.9% weight loss in the STEP 1 trial (Wilding et al., NEJM 2021) — more than any behavioral intervention has ever consistently achieved. Tirzepatide produced 22.5% weight loss in SURMOUNT-1 (Jastreboff et al., NEJM 2022). These drugs work by correcting the impaired gut-brain signaling that drives overeating, not by creating artificial willpower. The weight regain upon discontinuation actually proves the biological argument: if obesity were merely a behavioral choice, people who learned healthier habits during treatment would maintain their weight loss. Instead, the body's biological drive to restore its previous weight overwhelms behavioral changes once the pharmacological correction is removed — exactly as occurs when insulin is discontinued in Type 2 diabetes. The SELECT trial (Lincoff et al., NEJM 2023) showed semaglutide reduced major adverse cardiovascular events by 20% independent of weight loss, revealing metabolic disease pathways that transcend body weight. Socioeconomic disparities in obesity reflect disparities in the food environment, stress, and healthcare access — not proof that obesity is a choice.",
      crux: {
        id: "glp1-disease-model-validation",
        title: "The GLP-1 Disease Model Validation Test",
        description:
          "Determine whether GLP-1 drug efficacy validates the disease model of obesity or merely demonstrates that pharmacological appetite suppression can override behavioral patterns. If GLP-1 drugs correct specific biological deficits (impaired incretin signaling, leptin resistance, disrupted gut-brain communication) that cause obesity independent of food environment and behavior, the disease model is validated. If they primarily function as appetite suppressants that work regardless of biological status, they are treating a symptom, not a disease.",
        methodology:
          "Conduct randomized trials stratifying participants by biological markers: impaired GLP-1 secretion, leptin resistance levels, gut microbiome composition, and polygenic risk scores for obesity. Measure whether drug response correlates with biological deficit severity (supporting the disease model) or is uniform across biological profiles (supporting the appetite suppressant model). Include a behavioral intervention arm with matched caloric restriction to compare biological outcomes (metabolic adaptation, hormonal changes) between pharmacological and behavioral weight loss.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$20-50M (Large stratified RCT with comprehensive biomarker profiling across pharmacological and behavioral arms)",
      },
      evidence: [
        {
          id: "step-1-wegovy-trial",
          title:
            "STEP 1 Trial: Semaglutide Produced 14.9% Weight Loss vs 2.4% Placebo",
          description:
            "The STEP 1 trial (Wilding et al., NEJM 2021) randomized 1,961 adults with obesity to semaglutide 2.4mg or placebo for 68 weeks. The semaglutide group lost 14.9% of body weight vs 2.4% in the placebo group. 86% of semaglutide participants lost >5% body weight (vs 32% placebo), and 32% lost >20% (vs 1.7% placebo). This magnitude of weight loss was previously achievable only through bariatric surgery.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "Wilding et al., New England Journal of Medicine (2021)",
          sourceUrl:
            "https://doi.org/10.1056/NEJMoa2032183",
          reasoning:
            "Published in the NEJM, the most prestigious medical journal, with a large sample size and rigorous double-blind RCT design. The effect size is unprecedented for a pharmacological obesity intervention. Independence is slightly reduced because the trial was funded by Novo Nordisk, though the NEJM's editorial standards and independent statistical verification provide strong safeguards.",
        },
        {
          id: "select-cardiovascular-trial",
          title:
            "SELECT Trial: Semaglutide Reduced Cardiovascular Events by 20%",
          description:
            "The SELECT trial (Lincoff et al., NEJM 2023) randomized 17,604 adults with overweight/obesity and established cardiovascular disease to semaglutide 2.4mg or placebo. Over a median 39.8 months, semaglutide reduced major adverse cardiovascular events (heart attack, stroke, cardiovascular death) by 20%. Critically, the cardiovascular benefits appeared to exceed what would be predicted from weight loss alone, suggesting direct metabolic disease pathway effects.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Lincoff et al., New England Journal of Medicine (2023)",
          sourceUrl:
            "https://doi.org/10.1056/NEJMoa2307563",
          reasoning:
            "The largest cardiovascular outcomes trial for an obesity drug, published in the NEJM. The 20% reduction in cardiovascular events suggests obesity involves disease pathways beyond excess weight, supporting the disease model. The finding that benefits exceeded weight-loss predictions is particularly significant for the disease vs. behavior debate.",
        },
        {
          id: "weight-regain-discontinuation",
          title:
            "67% of Weight Regained Within One Year of GLP-1 Discontinuation",
          description:
            "The STEP 1 extension trial (Wilding et al., Diabetes Obes Metab 2022) followed participants who discontinued semaglutide after 68 weeks for an additional year. Participants regained two-thirds (67%) of their lost weight within one year of stopping the drug, despite continued lifestyle counseling. Proponents argue this proves biological drive; skeptics argue it proves pharmaceutical dependency, not disease treatment.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Wilding et al., Diabetes, Obesity and Metabolism (2022)",
          reasoning:
            "Well-designed extension study from a top-tier trial. The weight regain data is used by both sides: proponents say it proves the body biologically defends its higher weight (disease model), while skeptics say it proves the drugs create dependency rather than curing anything. Directness is moderate because the interpretation depends on one's prior framework.",
        },
        {
          id: "glp1-cost-equity-barrier",
          title:
            "GLP-1 Drugs Cost $1,000-1,500/Month, Creating Massive Health Equity Gaps",
          description:
            "Semaglutide (Wegovy) carries a list price of approximately $1,350/month in the US, and tirzepatide (Zepbound) approximately $1,060/month. As of 2025, most insurance plans provide limited or no coverage for obesity drugs. The populations with the highest obesity rates — low-income, rural, and minority communities — are least able to afford pharmacological treatment. A JP Morgan analysis estimated the total addressable market for GLP-1 obesity drugs at $100+ billion annually, raising concerns that the medical-industrial complex is profiting from a condition driven by the food-industrial complex.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source: "KFF Health Policy Analysis; JP Morgan Healthcare Research",
          reasoning:
            "Drug pricing data is publicly verifiable and the equity implications are well-documented. However, directness is limited because cost and equity are implementation concerns, not evidence against the disease model of obesity itself. Proponents argue that insulin is also expensive and creates dependency, yet no one argues diabetes is merely a lifestyle choice.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain — Hall et al., Cell Metabolism (2019)",
      url: "https://doi.org/10.1016/j.cmet.2019.05.008",
    },
    {
      title:
        "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1) — Wilding et al., NEJM (2021)",
      url: "https://doi.org/10.1056/NEJMoa2032183",
    },
    {
      title:
        "Persistent Metabolic Adaptation 6 Years After The Biggest Loser Competition — Fothergill et al., Obesity (2016)",
      url: "https://doi.org/10.1002/oby.21538",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does the food environment make healthy eating impossible for some populations?",
      content:
        "Ultra-processed foods constitute 60% of US caloric intake, engineered for hyper-palatability and marketed at a fraction of the cost of whole foods. NIH research shows people spontaneously overeat by 500 calories per day on ultra-processed diets. Yet countries with similar food industry presence maintain much lower obesity rates through regulation and cultural norms. Is the American food environment an inescapable trap, or does it reflect policy choices that could be changed without medicalizing obesity?",
    },
    {
      id: "q2",
      title:
        "How much of obesity is biologically predetermined vs. behaviorally driven?",
      content:
        "Twin studies show 40-70% heritability of BMI, and metabolic adaptation research reveals the body actively fights weight loss through hormonal and metabolic mechanisms. Yet obesity tripled in 50 years — far too fast for genetic change. The gene-environment interaction model suggests susceptible genotypes were always present but only became obese in the modern food environment. Does this mean obesity is a biological disease triggered by environmental exposure, or a behavioral response to environmental change?",
    },
    {
      id: "q3",
      title:
        "Does the success of Ozempic prove obesity is a disease, not a choice?",
      content:
        "GLP-1 drugs like semaglutide produce 15-22% weight loss — previously achievable only through surgery — by correcting impaired gut-brain signaling. The SELECT trial showed cardiovascular benefits beyond weight loss, suggesting metabolic disease pathways. But 67% of weight is regained within a year of stopping the drug, and treatment costs $1,000-1,500/month. Is GLP-1 efficacy proof that obesity requires medical treatment like any other disease, or evidence that pharmaceutical companies have found a profitable way to treat symptoms while ignoring root causes?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
