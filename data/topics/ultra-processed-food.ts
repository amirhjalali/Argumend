export const ultraProcessedFoodData = {
  id: "ultra-processed-food",
  title: "Is Ultra-Processed Food Making Us Sick?",
  question: "Is ultra-processed food making us fat and sick?",
  meta_claim:
    "Ultra-processed foods cause obesity and chronic disease through their processing, not only through the sugar, salt, fat and calories they carry, and policies that cut how much of them people eat would improve public health.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: the Dietary Guidelines for Americans, 2025-2030
  // (January 2026) tell Americans to avoid highly processed food; FDA and USDA
  // asked for comment on a federal definition in July 2025 and have not
  // issued one; the Lancet's three-paper series (November 2025) and the UK
  // UPDATE trial (Nature Medicine, 2025) are the newest major entries.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Americans get 55% of their calories from ultra-processed food, and children 62%. In January 2026 the federal Dietary Guidelines told Americans, for the first time, to avoid highly processed food. In a month-long NIH ward trial, 20 adults ate about 500 more calories a day on an ultra-processed diet than on one matched for sugar, fat and fiber. The fight is over whether the processing itself is the harm, or the sugar, salt and calories, and what governments should do about it.",
    confidence: 86,
    source:
      "NCHS Data Brief No. 536 (August 2025); Dietary Guidelines for Americans, 2025-2030; Hall et al., Cell Metabolism (2019)",
    sourceUrl: "https://www.cdc.gov/nchs/products/databriefs/db536.htm",
  },
  simple_case: [
    "The answer bears on what goes on school lunch trays and food labels, on whether governments tax or restrict a category that covers most of what Americans eat, and on what families on tight budgets can afford.",
    "'Ultra-processed' covers soda and candy, but also packaged whole-grain bread, flavored yogurt and infant formula.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Does processing make people overeat? (what the trials show)
    // =========================================================================
    {
      id: "upf-obesity-causation",
      title: "Does Processing Make People Overeat?",
      short_summary:
        "Two feeding trials found people eat more, or lose less weight, on ultra-processed diets, even when the diets are matched on nutrients or follow official advice. The split is why: something about processing itself, or traits such as energy density and taste that whole foods could share.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The trials show people eat more of some foods than others, not that 'processing' is the cause. A 2026 reanalysis of the NIH trial found that on the unprocessed diet people chose low-energy-dense foods, mostly fruit and vegetables, so their meals were 57% heavier yet had fewer calories. That points to energy density and the blend of fat and carbohydrate, properties a home-cooked meal can also have, not to factory methods. The trials are tiny: 20 people for two weeks per diet in the NIH study, and in the UK trial a weight difference of about 1 percentage point over eight weeks. Observational studies are worse: people who eat the most ultra-processed food are poorer, more stressed and have less time to cook, and a UK Biobank cohort had to adjust heavily for deprivation. Calories still decide weight; the label 'ultra-processed' adds a slogan, not a mechanism.",
      proponent_rebuttal:
        "The NIH trial was built to rule out the obvious explanations. Kevin Hall's team matched the two diets for presented calories, energy density, macronutrients, sugar, sodium and fiber, let 20 inpatients eat as much as they liked, and found they ate 508 more calories a day on the ultra-processed diet, gaining 0.9 kg in two weeks while losing 0.9 kg on the unprocessed one. In 2025 a UK trial went further: 55 adults ate two diets that both followed the government's own healthy-eating guide, one minimally processed and one ultra-processed. They lost twice as much weight on the minimally processed version, 2.06% against 1.05%. If a diet that meets official nutrient advice still leads to less weight loss when it is ultra-processed, the nutrient-only account misses something. Industrial foods are soft, fast to eat and engineered to taste good; that is processing.",
      crux: {
        id: "upf-calorie-mechanism",
        title: "The Overeating Mechanism Test",
        question:
          "Do people overeat because food is processed, or because of its energy density, taste and eating speed?",
        description:
          "If people eat more of ultra-processed food even when energy density, palatability and eating speed are matched to whole foods, processing itself matters. If the effect disappears once those properties are matched, the problem is those properties, which whole foods can also have and processed foods can be built to avoid.",
        methodology:
          "Inpatient feeding trials with ultra-processed and minimally processed menus matched not only for nutrients but also for energy density, hyper-palatability and eating rate, with ad libitum intake as the outcome; then longer outpatient trials in the same people.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Inpatient feeding trials like the NIH's 2019 Hall study, repeated with ultra-processed and minimally processed menus matched for energy density, palatability and eating speed, so that only processing differs, measuring how much people choose to eat.",
        },
        cost_to_verify:
          "$5-10M (metabolic-ward trials with matched menus)",
        falsification: {
          supporter_flip:
            "If inpatient trials that matched energy density, palatability and eating speed found people ate no more of the ultra-processed menu, the overeating would belong to those properties, which whole foods can also have, and 'processing' would add nothing.",
          skeptic_flip:
            "If such trials still found people eating hundreds of extra calories a day on ultra-processed menus, as in Hall's 2019 trial, the claim that it is only energy density and taste would fail.",
          common_ground:
            "Both sides agree that in the NIH and UK feeding trials people ate more, or lost less weight, on the ultra-processed diets.",
          live_disagreement:
            "Whether the overeating comes from processing as such or from energy density, taste and eating speed, which could in principle be designed out of processed food or found in home cooking.",
        },
      },
      evidence: [
        {
          id: "hall-nih-rct-2019",
          title: "NIH Trial 2019: 20 Inpatients Ate 508 More Calories a Day on an Ultra-Processed Diet",
          description:
            "Kevin Hall's team admitted 20 weight-stable adults to the NIH Clinical Center and gave them ultra-processed or unprocessed diets for two weeks each, in random order. Meals were matched for presented calories, energy density, macronutrients, sugar, sodium and fiber, and people ate as much or as little as they wanted. On the ultra-processed diet they ate 508 more calories a day, mostly carbohydrate and fat, and gained 0.9 kg; on the unprocessed diet they lost 0.9 kg.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Hall et al., 'Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain: An Inpatient Randomized Controlled Trial of Ad Libitum Food Intake', Cell Metabolism 30:67-77 (2019)",
          sourceUrl: "https://doi.org/10.1016/j.cmet.2019.05.008",
          reasoning:
            "The only tightly controlled causal evidence of its kind, from a government lab. It is small and short, and it shows that people ate more, not why; matching presented energy density did not stop people choosing denser items from the ultra-processed menu.",
        },
        {
          id: "update-trial-2025",
          title: "UPDATE Trial 2025: On Diets Following UK Healthy-Eating Advice, Minimally Processed Food Gave Twice the Weight Loss",
          description:
            "In a crossover trial in England, 55 adults with overweight or obesity who usually got at least half their calories from ultra-processed food ate two eight-week diets, both following the UK Eatwell Guide and eaten as freely as they liked: one minimally processed, one ultra-processed. Weight fell 2.06% on the minimally processed diet and 1.05% on the ultra-processed one, a difference of 1.01 percentage points (P = 0.024). Mild gut side effects were common on both.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Dicken et al., 'Ultraprocessed or minimally processed diets following healthy dietary guidelines on weight and cardiometabolic health: a randomized, crossover trial', Nature Medicine (2025)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12532614/",
          reasoning:
            "The first trial to test processing inside official nutrient advice, and in free-living people rather than a ward. The difference is about 1% of body weight over eight weeks, from 50 people, and both diets led to weight loss, which suggests the healthy-guideline diet mattered too.",
        },
        {
          id: "nih-reanalysis-2026",
          title: "AJCN 2026: In the NIH Trial, Unprocessed Meals Were 57% Heavier but Lower in Calories",
          description:
            "A post-hoc analysis of Hall's 2019 trial, with Hall as a co-author, found that on the unprocessed diet participants picked low-energy-dense items (under 1.0 kcal per gram, mostly fruits and vegetables), building meals that were 57% larger by mass (665 g against 424 g) yet lower in energy (719 against 830 kcal). The energy-dense mass and the balance of fat and carbohydrate in a meal together strongly predicted how much people ate (r = 0.78).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source:
            "Brunstrom et al., 'Consuming an unprocessed diet reduces energy intake: a post-hoc analysis of a randomized controlled trial reveals a role for human nutritional intelligence', American Journal of Clinical Nutrition (2026)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12975374/",
          reasoning:
            "Points to specific food properties, energy density and fat-carbohydrate blend, as the drivers, which is the skeptics' point that the effect may not need 'processing' as such. It is post hoc in the same 20 people, and those properties are typical of ultra-processed food, so it explains the effect more than it dissolves it.",
        },
        {
          id: "socioeconomic-confounding",
          title: "UK Biobank 2021: Highest Ultra-Processed Intake Linked to 79% Higher Obesity Risk, After Heavy Adjustment",
          description:
            "In 22,659 UK Biobank adults aged 40 to 69 followed for a median five years, those in the top quarter of ultra-processed food intake had a higher risk of developing obesity (hazard ratio 1.79) and abdominal obesity (1.30) than those in the bottom quarter, after adjustment for sociodemographic and lifestyle factors including deprivation and income.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "Rauber et al., 'Ultra-processed food consumption and risk of obesity: a prospective cohort study of UK Biobank', European Journal of Nutrition 60:2169-2180 (2021)",
          sourceUrl: "https://doi.org/10.1007/s00394-020-02367-1",
          reasoning:
            "Shows the association survives adjustment, which cuts for the harm side, but also how tightly ultra-processed eating is bound to income and deprivation, which no observational adjustment fully removes. The obesity estimate is wide (95% CI 1.06 to 3.03). Counted on the skeptics' side for what it cannot rule out.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Beyond weight (why it might harm)
    // =========================================================================
    {
      id: "upf-chronic-disease",
      title: "Beyond Weight: Disease and Early Death?",
      short_summary:
        "Cohorts covering almost 10 million people link ultra-processed food to heart disease deaths, diabetes, depression and early death, and some links survive adjustment for body weight. Nearly all of it is observational. Whether additives such as emulsifiers cause harm on their own, apart from sugar, salt and fat, is barely tested in people.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The disease evidence is a wall of associations. In the 2024 BMJ umbrella review, the evidence for most links was rated low or very low quality by the GRADE system, including the 50% higher risk of heart-disease death. People who eat the most ultra-processed food also tend to eat less fruit, vegetables and fiber and to earn less, and the major UK cancer study did not adjust for overall diet quality. The additive story rests on mice and on one human feeding study of 16 people. Each additive in US food has its own safety basis, and nutrient profiles, the sugar, sodium, saturated fat and fiber already on the label, explain much of what 'ultra-processed' is said to add. Calling a whole category toxic, when the mechanism is unproven, outruns the data.",
      proponent_rebuttal:
        "The pattern is too consistent to wave away. The BMJ umbrella review pooled 45 analyses covering 9.9 million people and found ultra-processed food linked to 32 of them, with 'convincing' evidence for heart-disease death and type 2 diabetes. In 197,426 UK Biobank adults, each 10-point rise in the share of ultra-processed food was linked to 2% more cancer and 6% more cancer deaths after adjusting for weight, smoking, alcohol, activity and total calories. Mechanisms are emerging: in a double-blind feeding trial, the common emulsifier carboxymethylcellulose reduced gut microbial diversity and, in two people, pushed bacteria into the gut's normally sterile mucus layer. And many additives were never reviewed by the FDA at all: a review of the US program counted more than 10,000 substances allowed in food, many self-declared safe by their makers. In November 2025 a three-paper Lancet series judged the evidence enough to call ultra-processed diets a key driver of chronic disease.",
      crux: {
        id: "upf-independent-mechanisms",
        title: "The Processing-Independent Harm Test",
        question:
          "Do additives and processing cause disease on their own, apart from obesity and nutrient content?",
        description:
          "If ultra-processed foods harm health only through their sugar, salt, fat and calories, nutrient rules and reformulation are the answer. If additives and industrial processing cause harm even in nutritionally identical food, the category itself is the problem.",
        methodology:
          "Feeding studies of nutritionally identical meals, made with emulsifiers, sweeteners and industrial processing or cooked traditionally, measuring inflammation, gut permeability, microbiome and glucose over 8 to 12 weeks; cohorts that adjust for a full diet-quality score as well as nutrients.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Feeding studies that give people nutritionally identical meals, ultra-processed with emulsifiers and sweeteners or cooked traditionally, and compare inflammatory markers, gut permeability and microbiome composition.",
        },
        cost_to_verify:
          "$3-8M (multi-center controlled feeding study with biomarker panel)",
        falsification: {
          supporter_flip:
            "If matched-nutrient feeding studies showed ultra-processed meals produce no worse inflammation, gut-barrier disruption or metabolic markers than nutritionally identical home-cooked meals, the case that processing causes disease beyond its nutrients would fail.",
          skeptic_flip:
            "If larger double-blind trials confirmed that common emulsifiers such as CMC disrupt the human gut, and cohorts adjusting for full diet quality kept finding the disease links, one-additive-at-a-time safety approvals would be hard to trust.",
          common_ground:
            "Both sides agree the chronic-disease evidence is mostly observational and entangled with overall diet quality and income, and that additive effects in people have barely been tested.",
          live_disagreement:
            "Whether additives and industrial processing cause disease independently of obesity and nutrient content, which matched-nutrient trials have not yet resolved.",
        },
      },
      evidence: [
        {
          id: "bmj-umbrella-review-2024",
          title: "BMJ 2024: Ultra-Processed Food Linked to 32 Health Outcomes in 9.9 Million People; Most Evidence Low Quality",
          description:
            "An umbrella review of 45 pooled analyses (9,888,373 participants) found greater ultra-processed food exposure associated with 32 of 45 health outcomes. 'Convincing' evidence supported higher risks of heart-disease death (risk ratio 1.50) and type 2 diabetes (1.12 per dose step), and of anxiety and common mental disorders; 'highly suggestive' evidence linked it to all-cause death (1.21) and obesity (odds ratio 1.55). By the GRADE system, 22 analyses were low quality, 19 very low and 4 moderate.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Lane et al., 'Ultra-processed food exposure and adverse health outcomes: umbrella review of epidemiological meta-analyses', BMJ 384:e077310 (2024)",
          sourceUrl: "https://doi.org/10.1136/bmj-2023-077310",
          reasoning:
            "The broadest summary of the observational evidence, and the consistency is striking. But almost every underlying study is observational, and by its own grading most of the evidence is low or very low quality, so it shows association, not that processing causes disease.",
        },
        {
          id: "lancet-cancer-upf",
          title: "UK Biobank 2023: Each 10-Point Rise in Ultra-Processed Food Linked to 2% More Cancer and 6% More Cancer Deaths",
          description:
            "In 197,426 UK Biobank adults followed for a median 9.8 years, each 10-percentage-point increase in the share of ultra-processed food in the diet was associated with 2% higher overall cancer incidence and 19% higher ovarian cancer, and with 6% higher cancer mortality, 30% higher ovarian and 16% higher breast cancer mortality. Models adjusted for sociodemographics, smoking, physical activity, BMI, alcohol and total energy intake.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Chang et al., 'Ultra-processed food consumption, cancer risk and cancer mortality: a large-scale prospective analysis within the UK Biobank', eClinicalMedicine 56:101840 (2023)",
          sourceUrl: "https://doi.org/10.1016/j.eclinm.2023.101840",
          reasoning:
            "Large, long follow-up, and the links survive adjustment for BMI, which points past obesity. The effect sizes are small, diet was measured by 24-hour recalls, and the models did not adjust for an overall diet-quality score, so confounding by the rest of the diet remains possible.",
        },
        {
          id: "emulsifier-gut-study",
          title: "Gastroenterology 2022: An Emulsifier Used in Ice Cream and Sauces Disrupted Healthy People's Gut Bacteria",
          description:
            "In a double-blind controlled-feeding study, healthy adults ate emulsifier-free diets (9 people) or the same diet with 15 g a day of carboxymethylcellulose (CMC, 7 people) for 11 days. CMC modestly increased abdominal discomfort after meals, reduced gut microbial diversity and lowered short-chain fatty acids in stool. In two people on CMC, bacteria encroached on the normally sterile inner mucus layer of the gut, a central feature of gut inflammation.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 6,
          },
          source:
            "Chassaing et al., 'Randomized Controlled-Feeding Study of Dietary Emulsifier Carboxymethylcellulose Reveals Detrimental Impacts on the Gut Microbiota and Metabolome', Gastroenterology 162(3):743-756 (2022)",
          sourceUrl: "https://doi.org/10.1053/j.gastro.2021.11.006",
          reasoning:
            "Human, randomized and double-blind evidence that one widely used additive changes gut biology, matching earlier mouse studies. It involved 16 people for 11 days at a high dose, and whether the changes cause disease is unknown.",
        },
        {
          id: "lancet-series-2025",
          title: "Lancet Series, November 2025: Ultra-Processed Diets Called 'a Key Driver' of Chronic Disease",
          description:
            "The first paper of a three-part Lancet series, led by Carlos Monteiro, who devised the NOVA classification, combined reviews and new meta-analyses. It concluded that ultra-processed diets displace traditional diets worldwide, worsen diet quality through 'overeating driven by high energy density, hyper-palatability, soft texture, and disrupted food matrices' and additives, and raise the risk of disease across 'nearly all organ systems', citing more than 100 prospective studies. Its verdict: displacement by ultra-processed foods 'is a key driver of the escalating global burden of multiple diet-related chronic diseases.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source:
            "Monteiro et al., 'Ultra-processed foods and human health: the main thesis and the evidence', The Lancet (November 2025), first of a three-paper series",
          sourceUrl: "https://doi.org/10.1016/S0140-6736(25)01565-X",
          reasoning:
            "The strongest statement of the case, in a top journal. It is written by the classification's originators and advocates, so it is a synthesis by one side rather than an independent ruling, and it rests on the same largely observational base.",
        },
        {
          id: "fda-additive-safety",
          title: "Two Routes Into US Food: FDA Petition Review, or a Company's Own 'Generally Recognized as Safe' Finding",
          description:
            "Food additives approved through FDA petitions must be backed by toxicology data showing a 'reasonable certainty of no harm' at their intended use. But a peer-reviewed review of the US program counted more than 10,000 substances allowed in human food, many of which entered under the 'Generally Recognized as Safe' (GRAS) pathway, which a manufacturer may self-determine without telling the FDA. A 2013 analysis found the GRAS determinations it examined were made by people employed or selected by the manufacturer.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 4,
          },
          source:
            "Neltner et al., Comprehensive Reviews in Food Science and Food Safety (2011); Neltner et al., JAMA Internal Medicine (2013)",
          sourceUrl: "https://doi.org/10.1111/j.1541-4337.2011.00166.x",
          reasoning:
            "The safety testing that exists counts against alarm about individual additives; the self-certification route counts for it. Neither tests the real exposure: dozens of additives eaten together every day. Directness is low for that reason.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Can 'ultra-processed' be defined? (the category itself)
    // =========================================================================
    {
      id: "upf-definition",
      title: "Can 'Ultra-Processed' Even Be Defined?",
      short_summary:
        "Almost all the research uses NOVA, a Brazilian system that sorts food by how it is made, not by its nutrients. Critics say it lumps whole-grain bread with candy; defenders say it captures what nutrient labels miss. The US has no legal definition: FDA and USDA asked for public comment in July 2025 and have not issued one.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A category that covers about 70% of the US food supply is too broad to be a target. NOVA puts packaged whole-grain bread, infant formula, flavored yogurt and plant-based milk in the same group as soda and candy because of how they are made. A 2017 critical appraisal in the American Journal of Clinical Nutrition argued the 'very broad definition' makes NOVA impossible to use for dietary guidelines. NIH researchers showed in 2026 that a week of menus with 91% of calories from ultra-processed food could score 85 out of 100 on the federal Healthy Eating Index, near a minimally processed menu's 88, and cost less. Rules built on such a category would hit nutritious, cheap foods along with junk, and give companies no clear target for reformulation.",
      proponent_rebuttal:
        "Defenders say NOVA captures risk that nutrient labels miss, which is why nearly all the cohort studies use it, and the UK trial showed its categories matter even inside a diet that follows nutrient advice. Brazil built its 2014 dietary guidelines around NOVA, telling people to avoid ultra-processed food. The US is now moving the same way: the 2025-2030 Dietary Guidelines say to 'avoid highly processed packaged, prepared, ready-to-eat, or other foods that are salty or sweet', and the FDA and USDA opened a formal process in July 2025 to write a uniform federal definition. Hard edges exist in every food rule, from 'organic' to 'healthy'. A definition can carve out whole-grain bread and infant formula while still catching the soda, snacks and sweets that make up most of the category.",
      crux: {
        id: "nova-definition",
        title: "The Definition Test",
        question:
          "Can 'ultra-processed' be defined precisely enough to regulate without sweeping in healthy foods?",
        description:
          "Regulation needs a line in law. If a definition can be written that tracks the disease risk while leaving out nutritious staples, the category can be regulated. If every workable line either catches healthy foods or collapses into the existing rules on sugar, salt and fat, the category adds little to policy.",
        methodology:
          "Compare candidate definitions (NOVA, nutrient-plus-additive rules, ingredient lists) on how well they predict disease in the same cohorts, how many nutritious foods each catches, and how consistently trained coders apply them to the same products.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Head-to-head tests of candidate definitions in the same cohorts, measuring how well each predicts disease, how often coders agree on the same foods, and how many whole-grain, dairy and infant products each one sweeps in.",
        },
        cost_to_verify:
          "$1-3M (reanalysis of existing cohorts and product databases)",
        falsification: {
          supporter_flip:
            "If tests showed that once sugar, salt, saturated fat and fiber are accounted for, NOVA's category adds no predictive power, or that coders disagree widely on which foods are ultra-processed, regulating the category would make no sense.",
          skeptic_flip:
            "If a federal definition carving out nutritious staples still predicted disease beyond nutrient profiles, and coders applied it consistently, the objection that the category is too fuzzy to regulate would fail.",
          common_ground:
            "Both sides agree the US has no legal definition of ultra-processed food, and that NOVA's category includes some nutritious products as well as soda, snacks and sweets.",
          live_disagreement:
            "Whether 'how it is made' is a useful legal line, or whether rules on sugar, salt, fat and specific additives would capture the harm with fewer side effects.",
        },
      },
      evidence: [
        {
          id: "fda-usda-definition-2025",
          title: "FDA and USDA, July 2025: Comment Sought on a Federal Definition; About 70% of US Food Supply Counted as Ultra-Processed",
          description:
            "On 24 July 2025 the FDA and USDA issued a request for information to gather data toward a uniform definition of ultra-processed foods, later extending comments to 23 October. The FDA estimates that about 70% of the US food supply is made up of foods commonly considered ultra-processed and that children get over 60% of their calories from such foods. As of its last update (18 September 2025), the FDA page reported no definition.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "FDA, 'Ultra-Processed Foods' (updated 18 September 2025)",
          sourceUrl:
            "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/ultra-processed-foods",
          reasoning:
            "Shows that even a government committed to acting on ultra-processed food has no agreed line yet, and that the category covers most of the food supply. It does not show a workable definition is impossible; the process is still open.",
        },
        {
          id: "nova-classification-critique",
          title: "AJCN 2017: Critics Argue NOVA's 'Very Broad Definition' Makes It Unusable for Dietary Guidelines",
          description:
            "In a critical appraisal, Michael Gibney and colleagues challenged NOVA's core claims, arguing there is no evidence that ultra-processed foods are hyper-palatable in a quasi-addictive way, that European and US data do not show diets dominated by them are low in micronutrients, and that 'the very broad definition' of ultra-processed food makes its use in food-based dietary guidelines 'impossible'.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Gibney, Forde, Mullally & Gibney, 'Ultra-processed foods in human health: a critical appraisal', American Journal of Clinical Nutrition 106(3):717-724 (2017)",
          sourceUrl: "https://doi.org/10.3945/ajcn.117.160440",
          reasoning:
            "The best-known scientific critique of the category. It predates the NIH and UK trials, which tested the category directly, and it is a commentary rather than new data.",
        },
        {
          id: "upf-menus-cost-2026",
          title: "NIH Menus 2026: 91% Ultra-Processed Scored 85/100 on Diet Quality, Near 88 for Minimally Processed, and Cost Less",
          description:
            "NIH researchers compared week-long, ingredient-matched 2,000-calorie menus. A minimally processed menu (19% of calories from ultra-processed food) scored 88 out of 100 on the federal Healthy Eating Index; a high-ultra-processed menu (91%) scored 85; a convenience-optimized menu (96%) scored 74. For a family of four, estimated annual costs were $22,571, $20,163 and $20,130. The authors note ultra-processed foods make up 65% of US household food purchases, and that the advisory committee behind the 2025 guidelines found only limited evidence linking them to body fat.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Colvin et al., 'Tradeoffs Between Convenience, Cost, and Healthy Eating Index for Menus Varying in Ultraprocessed Foods', Journal of Nutrition (2026)",
          sourceUrl: "https://doi.org/10.1016/j.tjnut.2026.101613",
          reasoning:
            "Shows a mostly ultra-processed diet can score well on nutrient-based quality and costs less, which cuts against treating the category as junk by definition and raises the equity problem for policy. These are theoretical menus, not what people eat, and the UK trial suggests a good nutrient score is not the whole story.",
        },
        {
          id: "brazil-dietary-guidelines",
          title: "Brazil 2014: First National Dietary Guidelines Built Around Avoiding Ultra-Processed Food",
          description:
            "Brazil's 2014 Dietary Guidelines were the first national guidelines to recommend avoiding ultra-processed foods, organized around the NOVA classification rather than individual nutrients. The FAO has since published a technical report by Monteiro and colleagues applying NOVA to diet quality and food-system monitoring, with a disclaimer that it does not constitute FAO validation of the classification.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source:
            "Brazilian Ministry of Health, Dietary Guidelines for the Brazilian Population (2014); FAO technical report, 'Ultra-processed foods, diet quality, and health using the NOVA classification system' (Monteiro et al., 2019)",
          sourceUrl:
            "https://openknowledge.fao.org/server/api/core/bitstreams/5277b379-0acb-4d97-a6a3-602774104629/content",
          reasoning:
            "Shows the category can be written into national advice. It is policy uptake, not evidence that the definition works better than nutrient rules, and the FAO explicitly declined to endorse NOVA.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: What should governments do? (policy)
    // =========================================================================
    {
      id: "upf-regulation",
      title: "Labels, Taxes, Bans: Would Policy Change Health?",
      short_summary:
        "Chile's warning labels cut purchases of the flagged products sharply, but no study has yet shown lower obesity from them. A Cochrane review found no study measuring whether taxing sugary foods cut obesity. The US now tells people to avoid highly processed food without regulating it. The fight is over whether to tax, label and restrict, or to push companies to reformulate.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "No country has shown that regulating ultra-processed food lowers obesity. Chile's 2016 law, the most ambitious, cut calories bought from flagged products by 23.8%, but total calories purchased fell only 3.5%, because people bought more of the unflagged products, and the studies did not measure body weight. A 2020 Cochrane review of taxes on sugar-added foods found one eligible study and none that measured obesity or health. Taxes and restrictions on a category that supplies most of the calories in poorer households hit those families hardest, and NIH menu costs suggest minimally processed eating costs more. Reformulation, cutting sugar, salt and saturated fat in the foods people already buy, is cheaper, faster and better tested than a war on a category.",
      proponent_rebuttal:
        "Chile proved the tools change behavior: purchases of flagged foods fell by nearly a quarter in calories, 36.7% in sodium and 26.7% in sugar. Tobacco control did not wait for proof that each warning label lowered lung cancer, and effects on obesity take years to show. The Lancet's 2025 series laid out policies covering products, food environments, manufacturers and supply chains, and named the industry's political activity as the main barrier. Even the US government now says to 'avoid highly processed packaged, prepared, ready-to-eat, or other foods that are salty or sweet'. Advice without rules leaves families facing a food supply that is about 70% ultra-processed, and marketing budgets they cannot match.",
      crux: {
        id: "upf-regulation-effectiveness",
        title: "The Policy Impact Test",
        question:
          "Would labels, taxes and ad limits on ultra-processed food improve health within a decade?",
        description:
          "If warning labels, taxes and marketing limits lead to measurable falls in obesity and diet-related disease within five to ten years, the case for regulating is made. If countries that act show no better health trends than those that do not, effort would be better spent on reformulation or other measures.",
        methodology:
          "Compare obesity, diabetes and diet-related disease trends in countries that adopted warnings, taxes or marketing limits (Chile, Mexico, Colombia, the UK) with matched countries that did not, using synthetic-control methods and national health surveys, at 5, 10 and 15 years.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compare obesity and diet-related disease trends in countries that adopted front-of-pack warnings, junk-food taxes or ad limits, such as Chile and Mexico, with similar countries that did not, over five to ten years, using national health surveys.",
        },
        cost_to_verify:
          "$1-3M (multi-country comparison using existing surveillance data)",
        falsification: {
          supporter_flip:
            "If countries with ultra-processed food rules showed no better obesity or diet-related disease trends than matched countries after a decade, the case for regulating the category, rather than reformulating products, would weaken.",
          skeptic_flip:
            "If the drop of nearly a quarter in calories bought from flagged products after Chile's labels turned into lower obesity after a longer lag, as with tobacco controls, the case against regulating would weaken.",
          common_ground:
            "Both sides agree Chile's warning labels measurably cut purchases of labeled products, and that no study has yet shown labels or food taxes lowering a country's obesity rate.",
          live_disagreement:
            "Whether labels, taxes and ad limits on ultra-processed food would improve health within a decade, or whether reformulation and other measures would do more at lower cost to poorer families.",
        },
      },
      evidence: [
        {
          id: "chile-labeling-law",
          title: "Chile's Warning Labels: Calories Bought From Flagged Foods Fell 23.8%, Total Calories 3.5%",
          description:
            "Chile's 2016 law required black warning labels on foods high in calories, sugar, sodium or saturated fat, banned marketing them to children and banned their sale in schools. In purchase data from 2,381 households over 2015-2017, compared with pre-law trends, calories bought from 'high-in' products fell 23.8%, sodium 36.7% and sugar 26.7%. Because people bought more unlabeled products, total calories purchased fell 3.5% and total sugar 10.2%. The study measured purchases, not body weight.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "Taillie et al., 'Changes in food purchases after the Chilean policies on food labelling, marketing, and sales in schools: a before and after study', The Lancet Planetary Health 5(8):e526-e533 (2021)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8364623/",
          reasoning:
            "The best natural experiment, showing the policy changed what people bought. It is a before-and-after study, not a randomized one, it targeted nutrients rather than processing, and it did not measure health, so directness to the crux is limited.",
        },
        {
          id: "cochrane-sugar-food-tax",
          title: "Cochrane 2020: No Study Has Measured Whether Taxing Sugary Foods Cuts Obesity",
          description:
            "A Cochrane systematic review of taxes on sugar and sugar-added foods (sweets, ice cream, confectionery and bakery products, mostly what NOVA classes as ultra-processed) found one eligible study: Hungary's 2011 public health product tax, after which consumption of taxed sugar-added foods fell 4.0%, rated very low certainty. It found no study of such taxes that measured overweight, obesity or other health outcomes. The authors concluded: \"Despite the reported reduction in consumption of taxed sugar‐added foods, we are uncertain whether taxing unprocessed sugar or sugar‐added foods has an effect on reducing their consumption and preventing obesity or other adverse health outcomes.\"",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Pfinder et al., 'Taxation of unprocessed sugar or sugar-added foods for reducing their consumption and preventing obesity or other adverse health outcomes', Cochrane Database of Systematic Reviews 2020(4):CD012333",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7141932/",
          reasoning:
            "The most rigorous kind of summary, and it shows how little the case for food taxes rests on measured health outcomes. It covers sugar-added foods, not labels or a UPF-wide tax, its search predates newer evaluations, and an absence of studies is a gap, not proof of failure.",
        },
        {
          id: "dietary-guidelines-2026",
          title: "Dietary Guidelines 2025-2030: Americans Told to 'Avoid Highly Processed' Salty and Sweet Foods",
          description:
            "The Dietary Guidelines for Americans, 2025-2030, released in January 2026 under the slogan 'eat real food', call for 'a dramatic reduction in highly processed foods'. They advise: 'Avoid highly processed packaged, prepared, ready-to-eat, or other foods that are salty or sweet, such as chips, cookies, and candy,' and to limit foods with artificial flavors, petroleum-based dyes, artificial preservatives and low-calorie sweeteners. They keep the limit of saturated fat to 10% of daily calories and say no amount of added sugar is recommended. They do not define 'highly processed'.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 4,
          },
          source: "USDA and HHS, Dietary Guidelines for Americans, 2025-2030 (January 2026)",
          sourceUrl: "https://cdn.realfood.gov/DGA.pdf",
          reasoning:
            "The federal government has adopted the advice side of the case, which shapes school meals and federal food programs. It is guidance, not regulation, it was issued without a definition of the category, and the advisory committee's own review graded the evidence on body fat as limited.",
        },
        {
          id: "food-industry-bliss-point",
          title: "Addiction 2023: Highly Processed Foods Meet the Criteria Used to Call Tobacco Addictive",
          description:
            "Ashley Gearhardt and Alexandra DiFeliceantonio applied the criteria the 1988 Surgeon General's report used to judge tobacco addictive (compulsive use, mood-altering effects, reinforcement, and craving) to foods high in refined carbohydrates or added fats, and concluded that such foods 'can meet the criteria to be labeled as addictive substances using the standards set for tobacco products.' Earlier reporting, notably Michael Moss's Salt Sugar Fat (2013), described food companies engineering products for maximum appeal.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "Gearhardt & DiFeliceantonio, 'Highly processed foods can be considered addictive substances based on established scientific criteria', Addiction 118(4):589-598 (2023)",
          sourceUrl: "https://doi.org/10.1111/add.16065",
          reasoning:
            "Supports treating these foods more like tobacco than like ordinary groceries. It is an argument from criteria, not new data, the food-addiction idea is disputed among neuroscientists, and showing a product is compelling does not show a given regulation would work.",
        },
      ],
    },
  ],
  aliases: [
    "Are Ultra-Processed Foods Driving the Obesity Epidemic?",
    "Are ultra-processed foods the main driver of obesity and chronic disease?",
    "Should ultra-processed food be taxed or banned?",
    "What counts as ultra-processed food?",
  ],
  references: [
    {
      title: "Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain - Cell Metabolism (Hall et al., 2019)",
      url: "https://doi.org/10.1016/j.cmet.2019.05.008",
    },
    {
      title: "Ultraprocessed or minimally processed diets following healthy dietary guidelines (UPDATE trial) - Nature Medicine (2025)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12532614/",
    },
    {
      title: "Ultra-Processed Food Exposure and Adverse Health Outcomes - BMJ umbrella review (2024)",
      url: "https://doi.org/10.1136/bmj-2023-077310",
    },
    {
      title: "Ultra-processed foods and human health: the main thesis and the evidence - The Lancet (2025)",
      url: "https://doi.org/10.1016/S0140-6736(25)01565-X",
    },
    {
      title: "Ultra-processed Food Consumption in Youth and Adults: United States, August 2021-August 2023 - NCHS Data Brief No. 536",
      url: "https://www.cdc.gov/nchs/products/databriefs/db536.htm",
    },
    {
      title: "Dietary Guidelines for Americans, 2025-2030 - USDA and HHS",
      url: "https://cdn.realfood.gov/DGA.pdf",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Do ultra-processed foods make people overeat, or is it just calories?",
      content:
        "In the NIH trial, people ate 508 more calories a day on an ultra-processed diet matched for sugar, fat and fiber, and in a 2025 UK trial they lost half as much weight on an ultra-processed version of a healthy diet. A 2026 reanalysis points to energy density and the fat-carbohydrate blend. Is processing the cause, or properties that whole foods could share?",
    },
    {
      id: "q2",
      title: "Is 'ultra-processed' a useful category, or too broad?",
      content:
        "NOVA groups whole-grain bread, infant formula and flavored yogurt with soda and candy. Critics say this makes it useless for rules; defenders say it predicts disease better than nutrients do. With FDA and USDA still working on a definition, where should the line be drawn?",
    },
    {
      id: "q3",
      title: "Can policy cut ultra-processed food without hurting poor families?",
      content:
        "Ultra-processed foods are often the cheapest calories, and NIH menu estimates put a minimally processed diet for a family of four at about $2,400 more a year. Taxes and restrictions could raise costs for those least able to pay, while subsidies, school meals and reformulation each have their own limits. Which tools help without shifting the burden onto low-income households?",
    },
  ],
};
