import type { TopicInput } from "@/lib/schemas/topic";

export const obesityPersonalResponsibilityData = {
  id: "obesity-personal-responsibility",
  title: "Is Obesity a Personal Choice or a Systemic Failure?",
  question: "Is obesity mainly a matter of personal choice?",
  meta_claim:
    "The obesity epidemic is primarily caused by individual lifestyle choices, and framing it as a disease or systemic issue undermines personal responsibility.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Food Environment and Agency
    // =========================================================================
    {
      id: "food-environment-design",
      title: "Food Environment and Agency",
      short_summary:
        "Cheap, heavily marketed, calorie-dense food is the default in much of the US. A 2009 USDA report estimated about 23.5 million Americans live in low-income areas far from a supermarket ('food deserts'), though research finds physical distance matters less than the relative price of healthy versus unhealthy food. The systemic view holds that price, marketing and access shape what most people eat more than their own decisions do; the personal-responsibility view holds that agency still decides what people eat within that environment, and that calling it inescapable infantilizes them. Whether processing itself causes overeating and disease has its own map, \"Are ultra-processed foods the main driver of obesity and chronic disease?\"; this pillar asks how much room the environment leaves for choice.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The food environment is not a neutral marketplace of free choice. The systemic barriers are less about physical distance to a store (studies find supermarket proximity is not the decisive factor once prices are controlled) and more about affordability and marketing: in low-income neighborhoods the relative price of healthy versus junk food predicts obesity, and the food industry spends roughly $14 billion per year on advertising, with about $2 billion aimed at children and the heaviest targeting directed at low-income and minority communities. When a government changes that environment, behavior moves with it: Chile's warning labels and children's marketing ban were followed by a large drop in sugary drink purchases, without anyone being asked to try harder. Japan and South Korea have extensive food regulation, mandatory school lunch programs, and walkable, fresh-food-oriented infrastructure that the US lacks; their lower obesity rates point to systemic factors, not merely greater individual virtue.",
      proponent_rebuttal:
        "People make food choices every day, and millions of individuals in the same food environment maintain healthy weights. Cheap snacks on the shelf do not compel anyone to buy them. Personal responsibility advocates point out that calorie information is widely available, that affordable staple foods (rice, beans, frozen vegetables) exist even in low-income areas, and that cultural attitudes toward food shape eating alongside corporate marketing. Countries with similar access to global food corporations (Japan, South Korea) have far lower obesity rates, which supporters read as evidence that norms and individual behavior matter, though critics note those countries also have stronger food policy and walkable infrastructure. Blaming the food environment alone, supporters argue, risks a victim mentality that discourages the behavioral changes shown to reduce weight.",
      crux: {
        id: "food-environment-causation",
        title: "The Environment Versus Agency Test",
        question:
          "Do price, marketing and access override individual choice for most people?",
        description:
          "Determine how much of the variation in weight is explained by the price, marketing and availability of food that people face, and how much by decisions individuals make within the same environment.",
        methodology:
          "Analyze natural experiments where only the food environment changed (Chile's children's marketing ban and school junk-food removal, Mexico's sugary drink tax, new supermarkets opening in low-income neighborhoods) and measure population-level changes in purchases and weight. Alongside, follow individuals who share one environment (same neighborhood, prices and store access) and measure how widely their diets and weights diverge, and what predicts the divergence.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Population weight trends after policies that changed only prices, marketing or store access, such as Chile's ban on marketing junk food to children and Mexico's sugary drink tax, set against how widely diets and weights vary among neighbors who face identical prices and stores.",
        },
        cost_to_verify:
          "$5-15M (Policy natural experiment analysis plus multi-site longitudinal cohorts tracking purchases and weight)",
        falsification: {
          supporter_flip:
            "If policies that changed only prices, marketing or store access, such as Chile's ban on marketing junk food to children and Mexico's sugary drink tax, were followed by lasting drops in population weight, the case that obesity is mainly a matter of individual choice would weaken.",
          skeptic_flip:
            "If neighbors facing the same prices, marketing and stores turned out to differ widely in diet and weight, and that spread tracked their own habits more than their income, the environment would explain less of obesity than the systemic view holds.",
          common_ground:
            "Both sides agree Japan and South Korea have far lower obesity than the US despite access to many of the same global food companies, and that both norms and food policy differ there.",
          live_disagreement:
            "Whether the price, marketing and availability of food decide what most people eat, or whether personal agency still decides it within that environment.",
        },
      },
      evidence: [
        {
          id: "food-desert-disparities",
          title:
            "23.5 Million Americans Live in Food Deserts with Limited Healthy Options",
          description:
            "A widely-cited 2009 USDA report to Congress estimated that about 23.5 million Americans live in low-income areas more than one mile (urban) or ten miles (rural) from a supermarket — so-called 'food deserts.' Whether limited supermarket access itself causes obesity is contested. A randomized-area study in the American Journal of Preventive Medicine (Ghosh-Dastidar et al. 2014) found that in two low-income urban food deserts, distance to a supermarket was NOT independently associated with obesity once food prices were accounted for — only higher relative prices of healthy vs. junk food predicted obesity. This suggests the relevant systemic lever is food affordability and marketing rather than physical distance alone.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source:
            "USDA Economic Research Service, Access to Affordable and Nutritious Food (2009 Report to Congress); Ghosh-Dastidar et al., American Journal of Preventive Medicine (2014)",
          sourceUrl:
            "https://doi.org/10.1016/j.amepre.2014.07.005",
          reasoning:
            "The 23.5M food-desert figure is a real, publicly documented USDA estimate. However, directness is LOW: the cited primary AJPM study actually found that supermarket distance was not significant after controlling for prices, so it does not establish that food-desert access causally drives obesity. The earlier draft overstated this item by asserting a '25-50% higher obesity rate even after controlling for income' that the source does not support; that fabricated figure has been removed and the claim re-scoped to what the literature shows. Food access is confounded with poverty, marketing, and price, making causal attribution weak.",
        },
        {
          id: "chile-junk-food-regulations",
          title:
            "Chile's Junk Food Regulations Reduced Sugary Drink Purchases by 24%",
          description:
            "Chile implemented comprehensive food labeling laws (2016) requiring black warning labels on foods high in sugar, sodium, fat, or calories, along with bans on marketing unhealthy foods to children and removing them from schools. A before-and-after study in PLOS Medicine (Taillie et al. 2020) found the purchased volume of 'high-in' sugar-sweetened beverages fell 23.7% in the post-implementation period (comparing 2015 to 2017), one of the largest beverage-purchase changes attributed to a labeling and marketing policy. The policy's effect on population obesity rates was not yet established in this study and remains under longer-term evaluation.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Taillie et al., PLOS Medicine (2020)",
          sourceUrl:
            "https://doi.org/10.1371/journal.pmed.1003015",
          reasoning:
            "Published in a respected journal with a strong before-and-after design leveraging a national policy change; the ~24% reduction in sugary-drink purchases is well-documented. Directness reduced slightly from the prior draft because the study measures purchasing behavior, not obesity outcomes directly, and the earlier claim of a 'measurable reduction in childhood obesity rates' was not supported by this source and has been removed. Replicability is moderate because Chile's results may not generalize to other cultural contexts.",
        },
        {
          id: "personal-agency-cross-cultural",
          title:
            "Countries with Similar Food Industries Have Very Different Obesity Rates",
          description:
            "Japan (adult obesity ~3-4%) and South Korea (~6%) have access to many of the same global food corporations and ultra-processed products as the US (~42%) yet report dramatically lower obesity rates (World Obesity Federation / OECD data). Some critics of the systemic argument cite cultural factors — smaller portions, walking-oriented infrastructure, social norms, school lunch programs emphasizing whole foods. However, these cross-country gaps cannot cleanly isolate 'individual choice': measurement differs (East-Asian BMI thresholds and self-report vs. measured-height methods differ across countries), and Japan/Korea's outcomes are themselves shaped by strong food policy and built environment — which are systemic, not individual, factors.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 3,
          },
          source:
            "World Obesity Federation Global Obesity Observatory; OECD Health at a Glance",
          sourceUrl:
            "https://data.worldobesity.org/rankings/",
          reasoning:
            "Cross-national prevalence figures are real and publicly available, but as evidence for the 'personal choice' thesis they are weak. Directness lowered substantially from the prior draft (false-balance correction): the data show a between-country difference, not that individual willpower rather than systemic factors drives it. Japan and South Korea have extensive food regulation, mandatory school lunch programs, and walkable infrastructure — themselves systemic solutions — and BMI is measured with different cutoffs and methods across these countries, so the comparison cannot support the inference that personal choice dominates.",
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
        "Twin studies consistently show that BMI heritability is 40-70%, and over 1,000 genetic variants associated with obesity have been identified through GWAS. The gut microbiome, hormonal regulation (leptin, ghrelin, insulin), and metabolic adaptation all influence body weight in ways that cannot be overridden by willpower alone. Skeptics of the biological explanation argue that genes have not changed in 50 years while obesity tripled, suggesting environment and behavior remain the primary drivers.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The biological case is far stronger than 'genetics set a range.' Leptin, the primary satiety hormone, was discovered in 1994 — and subsequent research showed that obese individuals develop leptin resistance, meaning their brains cannot properly register satiety signals regardless of willpower. Metabolic adaptation studies (Fothergill et al. 2016, published in Obesity) tracked Biggest Loser contestants and found that six years after dramatic weight loss, their metabolisms had slowed by an average of 500 kcal/day below predicted levels, and their leptin levels remained suppressed. This means the body actively fights to regain lost weight through hormonal and metabolic mechanisms. Gut microbiome research has shown that transplanting gut bacteria from obese mice into germ-free lean mice causes weight gain without any change in diet. The 40-70% heritability figure means genetics are the single largest determinant of body weight — larger than any individual behavioral factor. The obesity epidemic reflects gene-environment interaction: susceptible genotypes existed for millennia but were only exposed to the modern hypercaloric environment recently.",
      proponent_rebuttal:
        "While genetics clearly influence body weight predisposition, the obesity epidemic is a recent phenomenon — US adult obesity roughly tripled from about 13% in the early 1960s to over 42% by 2017-18 (NHANES). Human genetics did not change meaningfully in two generations. What changed was the environment and behavior: average caloric intake rose by several hundred calories per day, occupational physical activity declined dramatically, and sedentary screen time exploded. Twin studies showing 40-70% heritability mean that within a given environment, genetics explain much of the variation — but when the entire environment shifts toward overconsumption, the population distribution shifts with it. Genetics set the range; choices determine where individuals fall within that range. Overemphasizing biology creates fatalism that discourages the dietary and exercise changes that have been proven to reduce weight.",
      crux: {
        id: "biological-determinism-threshold",
        title: "The Biological Override Threshold Test",
        question:
          "How far do genes and the body's set point limit what diet and willpower can achieve?",
        description:
          "Determine the degree to which biological factors (genetics, hormones, microbiome, metabolic adaptation) constrain an individual's ability to maintain a healthy weight through behavioral changes alone. If biological factors create a 'set point' that the body defends through metabolic and hormonal adaptation, willpower-based interventions are fundamentally limited.",
        methodology:
          "Conduct long-term (5+ year) metabolic studies tracking individuals who achieve significant weight loss through behavioral intervention alone (diet and exercise). Measure resting metabolic rate, leptin, ghrelin, insulin, thyroid hormones, and gut microbiome composition at baseline, post-weight-loss, and annually for 5 years. Calculate the percentage of participants who maintain >10% weight loss at 5 years and characterize the biological predictors of success and failure. Compare against pharmacological intervention cohorts (GLP-1 agonists) to quantify the biological resistance that behavioral interventions must overcome.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10-25M (Multi-year longitudinal metabolic study with comprehensive biomarker tracking across behavioral and pharmacological cohorts)",
        falsification: {
          supporter_flip:
            "If 5-year metabolic studies of people who lose weight through diet and exercise alone found metabolism and appetite hormones defending the old weight so strongly that few keep off more than 10%, behavior-based change would be fundamentally limited and the personal-choice claim would weaken.",
          skeptic_flip:
            "If studies traced the rise in US adult obesity from 13.4% in 1960-62 to 42.4% in 2017-18 to shifts in environment and behavior, over a period when the genome did not meaningfully change, biology would look like a limit on individuals rather than the driver of the trend.",
          common_ground:
            "Both sides agree BMI is substantially heritable — twin studies put it at 40-70% — and that the recent rise reflects susceptible genes meeting a changed environment, not genes changing.",
          live_disagreement:
            "Whether genes and metabolic adaptation set a range within which choices decide where people land, or defend a set point strongly enough that diet and willpower alone rarely overcome it.",
        },
      },
      evidence: [
        {
          id: "twin-study-heritability",
          title:
            "Twin Studies Show 40-70% Heritability of BMI Across Populations",
          description:
            "A systematic review and meta-regression of twin and family studies (Elks et al., Frontiers in Endocrinology, 2012), aggregating 88 twin-study estimates across roughly 140,525 twins, found high heritability of BMI. Twin-study heritability estimates ranged from 0.47 to 0.90 (median ~0.75), with family-study estimates somewhat lower. Twin studies consistently show that shared (family) environment explains relatively little of adult BMI variation, indicating that genetic influence persists largely independent of the shared childhood food environment. The commonly cited '40-70%' range is a conservative summary spanning twin and family designs.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Elks et al., Frontiers in Endocrinology (2012)",
          sourceUrl:
            "https://doi.org/10.3389/fendo.2012.00029",
          reasoning:
            "Twin studies are the gold standard for estimating heritability, and this meta-regression aggregates decades of data across many populations. The prior draft mis-attributed this paper to the American Journal of Clinical Nutrition; it was published in Frontiers in Endocrinology, and the source has been corrected. Twin estimates actually cluster higher (median ~0.75) than the headline '40-70%', so the claim is if anything understated. Directness is slightly reduced because heritability measures genetic contribution to variation within an environment, not the absolute biological constraint on an individual.",
        },
        {
          id: "metabolic-adaptation-biggest-loser",
          title:
            "Biggest Loser Study: Metabolism Slowed 500 kcal/day Six Years After Weight Loss",
          description:
            "Fothergill et al. (2016) tracked 14 Biggest Loser contestants for six years after the competition. Despite regaining most of their lost weight, participants' resting metabolic rates remained suppressed by an average of 499 kcal/day below what would be predicted for their body size. Leptin levels, which signal satiety to the brain, remained at ~60% of expected levels. The body appeared to permanently 'remember' its highest weight and actively resisted the lower weight through metabolic and hormonal adaptation.",
          side: "against" as const,
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
            "Turnbaugh et al. (2006, Nature) demonstrated that colonizing germ-free mice with an 'obese' gut microbiota produced significantly greater increases in total body fat than colonizing with a 'lean' microbiota, and characterized the obese-associated microbiome as having an increased capacity to harvest energy from the diet. Ridaura et al. (2013, Science) extended this to humans: transplanting fecal microbiota from human twin pairs discordant for obesity into germ-free mice transmitted the donor's adiposity and metabolic phenotype, with the obesity phenotype being diet-dependent.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Turnbaugh et al., Nature (2006); Ridaura et al., Science (2013)",
          sourceUrl:
            "https://doi.org/10.1038/nature05414",
          reasoning:
            "Published in the two highest-impact scientific journals with rigorous germ-free mouse methodology (Turnbaugh, Nature 2006: https://doi.org/10.1038/nature05414; Ridaura, Science 2013: https://doi.org/10.1126/science.1241214). The transplant design is suggestive of causation. Directness is limited (lowered from the prior draft) because these are mouse models receiving human or mouse microbiota; the magnitude and causal weight of microbiome effects on human obesity remain actively debated and the phenotype in Ridaura was diet-dependent.",
        },
        {
          id: "obesity-tripled-50-years",
          title:
            "US Obesity Tripled in 50 Years — Genes Cannot Explain a Population-Level Shift",
          description:
            "US adult obesity rates rose from 13.4% in 1960-62 to 42.4% in 2017-18 (NHANES data). The human genome does not change meaningfully over 50 years, yet the entire population weight distribution shifted rightward. Critics of the biological determinism argument note that this population-level shift can only be explained by environmental and behavioral changes: a 500+ kcal/day increase in average caloric intake, dramatic reductions in occupational physical activity, increased sedentary leisure time, and the proliferation of hyper-palatable ultra-processed foods.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source:
            "CDC/NCHS NHANES (Prevalence of Obesity Among Adults, 1960-1962 through 2017-2018); Swinburn et al., The Lancet (2011)",
          sourceUrl:
            "https://doi.org/10.1016/S0140-6736(11)60813-1",
          reasoning:
            "NHANES is the gold standard for US population health surveillance, and the obesity trend is among the most replicated findings in public health. The argument that genes cannot explain a 50-year population shift is logically sound. However, proponents of the biological view counter that the gene-environment interaction framework explains precisely this: genetically susceptible individuals were always present but only became obese when exposed to the modern food environment, which is itself a systemic (not individual choice) argument.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: What Appetite Drugs Reveal About Choice
    // =========================================================================
    {
      id: "glp1-revolution",
      title: "What Appetite Drugs Reveal About Choice",
      short_summary:
        "Drugs that mimic gut hormones regulating appetite and satiety produce large weight losses in trials, and most of the weight returns when people stop taking them. The disease-model view reads this as proof that weight is set by biology rather than by character; the personal-responsibility view reads it as an appetite suppressant standing in for habits people could build themselves. Whether these drugs are a safe, affordable, lasting treatment has its own map, \"Are GLP-1 drugs like Ozempic a safe, lasting answer to obesity?\"; this pillar asks only what the drugs' effect says about how much of weight is chosen.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "The success of GLP-1 drugs is the strongest evidence that obesity is a biological condition, not a character flaw. In the STEP 1 trial (Wilding et al., NEJM 2021) semaglutide produced 14.9% weight loss, more than any behavioral intervention has consistently achieved. Tirzepatide produced 22.5% weight loss in SURMOUNT-1 (Jastreboff et al., NEJM 2022). The drugs act on impaired gut-brain signaling that drives overeating; they do not create artificial willpower. Weight regain on stopping points the same way: if obesity were merely a behavioral choice, people who learned healthier habits during treatment would keep the weight off. Instead, the body's drive to restore its previous weight overwhelms those habits once the hormonal signal is removed, as happens when insulin is stopped in Type 2 diabetes. Socioeconomic disparities in obesity reflect disparities in the food environment, stress, and healthcare access, not proof that obesity is a choice.",
      proponent_rebuttal:
        "These drugs work by suppressing appetite; they do not show that any underlying 'disease' was there to fix. A drug that makes people want less food would reduce weight whatever the original cause. About two-thirds of the lost weight returns within a year of stopping, which supporters read as dependence on an appetite suppressant rather than evidence that choice was never involved. And if obesity were a uniform biological disease, it would not be so heavily concentrated among low-income populations; that gradient, supporters say, points to environmental and behavioral drivers that people and communities can change.",
      crux: {
        id: "glp1-disease-model-validation",
        title: "The Disease Model Test",
        question:
          "Does the drugs' effect reveal a biological defect choice can't override, or only a suppressed appetite?",
        description:
          "Determine whether drug-induced weight loss validates the disease model of obesity or merely shows that pharmacological appetite suppression can override behavioral patterns. If the drugs correct specific biological deficits (impaired incretin signaling, leptin resistance, disrupted gut-brain communication) that cause obesity independent of food environment and behavior, the disease model is validated. If they act as appetite suppressants that work regardless of biological status, they say little about how much of weight is chosen.",
        methodology:
          "Conduct randomized trials stratifying participants by biological markers: impaired GLP-1 secretion, leptin resistance levels, gut microbiome composition, and polygenic risk scores for obesity. Measure whether drug response correlates with biological deficit severity (supporting the disease model) or is uniform across biological profiles (supporting the appetite suppressant model). Include a behavioral intervention arm with matched caloric restriction to compare biological outcomes (metabolic adaptation, hormonal changes) between pharmacological and behavioral weight loss.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Trials that sort participants by biological markers, such as impaired GLP-1 secretion, leptin resistance and polygenic risk, and test whether drug response tracks the size of the deficit or is the same across profiles.",
        },
        cost_to_verify:
          "$20-50M (Large stratified RCT with comprehensive biomarker profiling across pharmacological and behavioral arms)",
        falsification: {
          supporter_flip:
            "If trials stratified by biological markers found drug response tracking the severity of impaired gut-brain signaling or leptin resistance, the drugs would be correcting a specific deficit, and the case that obesity is mainly a matter of choice would weaken.",
          skeptic_flip:
            "If trials found the drugs working by appetite suppression alone, equally across biological profiles, and the steep income gradient in obesity tracked environment and behavior, the disease framing would carry less weight.",
          common_ground:
            "Both sides accept the trial results, about 15% mean weight loss on semaglutide and 22% on tirzepatide, and that most of the weight comes back after the drugs are stopped.",
          live_disagreement:
            "Whether weight regain after stopping shows a biological drive the drugs correct, as insulin does in Type 2 diabetes, or dependence on an appetite suppressant that treats the symptom rather than the cause.",
        },
      },
      evidence: [
        {
          id: "step-1-wegovy-trial",
          title:
            "STEP 1 Trial: Semaglutide Produced 14.9% Weight Loss vs 2.4% Placebo",
          description:
            "The STEP 1 trial (Wilding et al., NEJM 2021) randomized 1,961 adults with obesity to semaglutide 2.4mg or placebo for 68 weeks. The semaglutide group lost 14.9% of body weight vs 2.4% in the placebo group. 86% of semaglutide participants lost >5% body weight (vs 32% placebo), and 32% lost >20% (vs 1.7% placebo). This magnitude of weight loss was previously achievable only through bariatric surgery.",
          side: "against" as const,
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
          id: "weight-regain-discontinuation",
          title:
            "67% of Weight Regained Within One Year of GLP-1 Discontinuation",
          description:
            "The STEP 1 trial extension (Wilding et al., Diabetes, Obesity and Metabolism 2022) followed a representative subset of participants who discontinued semaglutide and lifestyle intervention after 68 weeks for an additional year. One year after withdrawal, participants regained about two-thirds (~67%) of their prior weight loss, with cardiometabolic variables reverting in parallel. Proponents of the disease model argue this reflects the body's biological defense of a higher weight; its skeptics argue it shows pharmaceutical dependency rather than cure.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Wilding et al., Diabetes, Obesity and Metabolism (2022)",
          sourceUrl:
            "https://doi.org/10.1111/dom.14725",
          reasoning:
            "Well-designed extension study from a top-tier trial. The weight regain data is used by both sides: proponents say it proves the body biologically defends its higher weight (disease model), while skeptics say it proves the drugs create dependency rather than curing anything. Directness is moderate because the interpretation depends on one's prior framework.",
        },
      ],
    },
  ],
  references: [
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
        "Calorie-dense food is cheap, heavily marketed, and the default in many low-income neighborhoods, and research finds the relative price of healthy food predicts obesity better than distance to a supermarket. Yet millions of people in the same environment keep healthy weights, and countries with similar food industry presence maintain much lower obesity rates through regulation and cultural norms. Is the American food environment a trap most people cannot choose their way out of, or does it leave real room for individual decisions?",
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
        "GLP-1 drugs like semaglutide produce roughly 15% mean weight loss (and tirzepatide about 22%) by acting on the gut-brain signals that regulate appetite. About two-thirds of the lost weight returns within a year of stopping. Does that show a biological drive the drugs correct, the way insulin corrects diabetes, or an appetite suppressant standing in for habits people could still choose to build?",
    },
  ],
} satisfies TopicInput;
