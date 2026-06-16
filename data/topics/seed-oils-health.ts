import type { Topic } from "@/lib/schemas/topic";

export const seedOilsHealthData = {
  id: "seed-oils-health",
  title: "Are Seed Oils Harmful to Human Health?",
  meta_claim:
    "Industrial seed oils (soybean, canola, sunflower) are a major driver of chronic inflammation, obesity, and metabolic disease.",
  status: "contested" as const,
  category: "science" as const,
  references: [
    {
      title:
        "Dietary Linoleic Acid and Risk of Coronary Heart Disease: A Systematic Review and Meta-Analysis — American Journal of Clinical Nutrition",
      url: "https://academic.oup.com/ajcn/article/100/6/1520/4576583",
    },
    {
      title:
        "The Sydney Diet Heart Study: A Randomised Controlled Trial of Linoleic Acid for Secondary Prevention — BMJ",
      url: "https://www.bmj.com/content/346/bmj.e8707",
    },
    {
      title:
        "Omega-6 Fatty Acids and Risk for Cardiovascular Disease — Circulation (AHA Science Advisory)",
      url: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.108.191627",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Did humans evolve to consume this much linoleic acid?",
      content:
        "Ancestral diets are estimated to have contained 1-3% of calories from linoleic acid (omega-6), whereas modern Western diets — driven by seed oil consumption — deliver 7-10% or more. Does this evolutionary mismatch matter for chronic disease, or has human metabolism adapted to a wide range of fat compositions across cultures and centuries?",
    },
    {
      id: "q2",
      title:
        "Are seed oils harmful, or is it the ultra-processed foods that contain them?",
      content:
        "Seed oils are a primary ingredient in ultra-processed foods — chips, fried foods, packaged snacks, fast food. Critics argue that isolating seed oils as the causal agent is impossible because they almost always co-occur with refined carbohydrates, added sugars, and artificial additives. Is the health signal coming from the oils themselves, or from the broader dietary pattern they enable?",
    },
    {
      id: "q3",
      title:
        "Should individuals avoid seed oils based on the current evidence?",
      content:
        "Online health communities have made 'avoid seed oils' a cultural movement, with influencers promoting tallow, butter, and coconut oil as alternatives. Major health organizations like the AHA continue to recommend vegetable oils over saturated fats for heart health. Given the contested science, is the precautionary avoidance of seed oils a reasonable personal choice, or does it risk pushing people toward higher saturated fat intake with its own well-documented cardiovascular risks?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Omega-6 to Omega-3 Ratio
    // =========================================================================
    {
      id: "omega-6-omega-3-ratio",
      title: "Omega-6 to Omega-3 Ratio",
      short_summary:
        "Modern diets have shifted the omega-6 to omega-3 ratio from roughly 1:1 to as high as 20:1, driven largely by seed oil consumption. Whether this imbalance promotes chronic inflammation or is metabolically inconsequential remains a central point of contention.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The omega-6 to omega-3 ratio has shifted dramatically since the mid-20th century as seed oils replaced animal fats and tropical oils. Linoleic acid (LA), the primary omega-6 in seed oils, is a precursor to arachidonic acid (AA), which feeds into pro-inflammatory eicosanoid pathways. Ancestral diets contained roughly equal omega-6 and omega-3, whereas modern Western diets deliver ratios of 15:1 to 20:1. This unprecedented shift may be driving chronic low-grade inflammation underlying cardiovascular disease, metabolic syndrome, autoimmune conditions, and neurological disorders. The body cannot synthesize these fatty acids — they come entirely from diet — making the dietary ratio a plausible lever on systemic inflammation.",
      proponent_rebuttal:
        "The omega-6 to omega-3 ratio hypothesis sounds intuitive but oversimplifies fatty acid metabolism. Systematic reviews and meta-analyses consistently show that higher linoleic acid intake is associated with reduced cardiovascular risk, not increased risk. The 2009 American Heart Association Science Advisory concluded that consuming at least 5-10% of calories from omega-6 polyunsaturated fats reduces coronary heart disease risk. Importantly, while linoleic acid can theoretically convert to pro-inflammatory arachidonic acid, human studies show that dietary LA intake has minimal effect on tissue AA levels because the conversion rate is tightly regulated (estimated at <1% in most studies). The body maintains AA homeostasis regardless of LA intake. Furthermore, linoleic acid itself produces anti-inflammatory metabolites including lipoxins. The 'ratio' framework ignores that absolute intakes of both omega-6 and omega-3 matter more than their proportion — populations with high omega-6 AND high omega-3 intake (like many Mediterranean populations) have excellent cardiovascular outcomes.",
      crux: {
        id: "la-to-aa-conversion",
        title: "The Linoleic Acid to Arachidonic Acid Conversion Test",
        description:
          "The core dispute is whether dietary linoleic acid from seed oils meaningfully increases tissue arachidonic acid levels and downstream inflammatory eicosanoids in humans. If LA-to-AA conversion is tightly regulated and tissue AA remains stable regardless of LA intake, the ratio hypothesis fails. If high LA intake measurably elevates tissue AA and pro-inflammatory mediators, the mechanism is plausible.",
        methodology:
          "Conduct a randomized controlled feeding study: assign 200 healthy adults to high-LA (10% calories from seed oils) vs low-LA (2% calories, replacing seed oils with oleic acid sources) diets for 12 weeks. Measure tissue AA levels (red blood cell membranes), plasma inflammatory markers (CRP, IL-6, TNF-alpha, prostaglandin E2), and urinary eicosanoid metabolites at baseline and endpoint. Control for omega-3 intake across both groups.",
        equation:
          "\\text{AA}_{tissue} = f(\\text{LA}_{dietary}) \\quad \\text{where} \\quad \\Delta\\text{AA} = \\beta_1 \\cdot \\Delta\\text{LA} + \\varepsilon",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (12-week controlled feeding study with comprehensive lipidomics and inflammatory biomarker panels)",
      },
      evidence: [
        {
          id: "ratio-shift-historical",
          title:
            "Omega-6 to Omega-3 Ratio Shifted from ~1:1 to 20:1 in Modern Diets",
          description:
            "Anthropological estimates (Simopoulos) put ancestral omega-6 to omega-3 ratios near 1:1, versus roughly 15:1-16.7:1 in modern Western diets. Blasbalg et al. (AJCN 2011), using USDA food-disappearance data, documented that estimated per-capita soybean oil consumption rose more than 1,000-fold between 1909 and 1999, raising linoleic acid from ~2.8% to ~7.2% of energy. The intake shift itself is uncontested; whether the resulting ratio change causes disease is the disputed step.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 4,
          },
          source:
            "Blasbalg et al., American Journal of Clinical Nutrition (2011); Simopoulos, Biomedicine & Pharmacotherapy (2002)",
          sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3076650/",
          reasoning:
            "The dietary shift is well-documented and uncontested (Blasbalg 2011 is the canonical intake source). However, documenting a change in intake does not demonstrate harm — it establishes a plausible mechanism that requires downstream evidence of pathology, so directness is low.",
        },
        {
          id: "la-does-not-raise-aa",
          title:
            "Systematic Reviews Show Dietary Linoleic Acid Does Not Increase Tissue Arachidonic Acid",
          description:
            "Rett & Whelan's systematic review of adult human trials (Nutrition & Metabolism, 2011) found that changing dietary linoleic acid did not significantly change tissue arachidonic acid in plasma/serum phospholipids: increasing LA up to six-fold showed no significant correlation with AA (p=0.72), and decreasing LA by up to 90% likewise had no significant effect (p=0.39). Conversion via delta-6 desaturase is rate-limiting, and the body regulates AA largely independent of LA intake. (Note: 'AA homeostasis' is supported; this does not by itself rule out other LA-related effects.)",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Rett & Whelan, Nutrition & Metabolism (London) (2011)",
          sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3132704/",
          reasoning:
            "This directly tests the mechanistic pathway underlying the ratio hypothesis. If LA does not raise tissue AA, the primary proposed mechanism for seed-oil-driven inflammation is undermined. The review is comprehensive and peer-reviewed.",
        },
        {
          id: "aha-omega6-recommendation",
          title:
            "AHA Science Advisory Recommends 5-10% of Calories from Omega-6 for Heart Health",
          description:
            "The 2009 AHA Science Advisory (Harris et al., Circulation 2009;119:902-907) concluded that an omega-6 PUFA intake of at least 5-10% of energy, in the context of other AHA dietary recommendations, is consistent with reduced coronary heart disease risk relative to lower intakes. The advisory specifically argued against the hypothesis that omega-6 intake promotes cardiovascular harm via inflammation, citing clinical and epidemiological evidence.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Harris et al., Circulation (American Heart Association Science Advisory) (2009)",
          sourceUrl: "https://www.ahajournals.org/doi/10.1161/circulationaha.108.191627",
          reasoning:
            "The AHA is a leading cardiovascular health authority. Independence is slightly reduced because some advisory authors have received industry funding, but the recommendation is consistent with independent meta-analyses.",
        },
        {
          id: "eicosanoid-imbalance-animal",
          title:
            "Animal Studies Show High Omega-6 Diets Promote Inflammatory Eicosanoid Production",
          description:
            "Some rodent studies report that high-linoleic-acid diets increase pro-inflammatory eicosanoids (e.g., prostaglandin E2, leukotriene B4) and promote adipose inflammation and weight gain versus diets with more balanced omega-6/omega-3. This is mechanistic, animal-model evidence; it has not translated cleanly to humans, where controlled trials (Rett & Whelan 2011) show dietary LA does not raise tissue arachidonic acid, the proposed upstream step.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 5,
            directness: 3,
          },
          source:
            "Rodent feeding studies (mechanistic/animal evidence); no specific human-verified primary source available",
          reasoning:
            "Down-weighted: this rests on animal models and mechanistic speculation. Rodent fatty-acid metabolism differs from humans, doses often exceed proportional human intake, and the key human step (LA raising tissue AA) is not supported by controlled human trials. No specific peer-reviewed primary source could be web-verified for the original 'Nutrients 2012' citation, so attribution is left generic and weights are low.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Oxidation and Processing
    // =========================================================================
    {
      id: "oxidation-and-processing",
      title: "Oxidation and Processing",
      short_summary:
        "Seed oils are refined through high-heat, chemical extraction processes and are rich in polyunsaturated fats prone to oxidation. Whether the resulting degradation products — aldehydes, lipid peroxides, and trace trans fats — pose meaningful health risks at typical dietary exposure levels is contested.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Polyunsaturated fatty acids in seed oils are chemically unstable due to their multiple double bonds, making them highly susceptible to oxidation when exposed to heat, light, or oxygen. Industrial refining involves solvent extraction (typically hexane), degumming, bleaching, and deodorizing at temperatures exceeding 200C. Deep frying with seed oils generates cytotoxic aldehydes (4-hydroxynonenal, malondialdehyde, acrolein) — compounds linked to DNA damage, protein cross-linking, and atherosclerosis in laboratory studies. Repeated heating, as in restaurant fryers, dramatically increases these toxic byproducts. Additionally, partial hydrogenation and high-heat processing can create trans fatty acids, whose cardiovascular harm is now uncontested. Even without intentional hydrogenation, the deodorization step in seed oil refining generates small amounts of trans fats (typically 0.5-2%). Consumers are essentially eating degraded, oxidized fat — a chemical profile that did not exist in any ancestral diet.",
      proponent_rebuttal:
        "The oxidation concern is legitimate for improperly handled oils but overstated for typical consumer use. Modern refining removes the vast majority of oxidation products, and refined seed oils have high smoke points (soybean ~234C, canola ~240C), making them more stable for cooking than many alternatives like butter (~177C) or extra virgin olive oil (~190C). Aldehyde generation occurs primarily during prolonged, repeated deep frying well above smoke point — conditions more relevant to commercial food service than home cooking. A 2020 review in Food Chemistry found that aldehyde levels in properly used seed oils remained well below toxicological thresholds. The trace trans fats from deodorization (typically <1% of total fat) are far below levels that drove the trans fat ban, which targeted partially hydrogenated oils containing 25-45% trans fats. Furthermore, oxidation is not unique to seed oils — all cooking fats degrade with heat, including the saturated fats and animal fats proposed as replacements. The relevant question is not whether any degradation occurs but whether it occurs at levels that meaningfully impact health, and population-level evidence does not support harm from normal seed oil use.",
      crux: {
        id: "aldehyde-dose-response",
        title: "The Dietary Aldehyde Dose-Response Test",
        description:
          "The key question is whether the aldehydes and lipid peroxides generated during normal cooking with seed oils reach concentrations that cause measurable biological harm in humans. If typical dietary exposure to these compounds from seed oil use falls well below established toxicological thresholds, the oxidation concern is theoretical. If exposures approach harmful levels — especially with cumulative daily intake — the processing argument has substance.",
        methodology:
          "Measure aldehyde concentrations (4-HNE, MDA, acrolein) in meals prepared using seed oils under realistic home and restaurant cooking conditions (pan frying, deep frying, baking at standard temperatures and durations). Calculate cumulative daily dietary aldehyde intake for typical consumers. Compare to established no-observed-adverse-effect levels (NOAELs) from toxicological studies. Simultaneously measure urinary aldehyde metabolites in participants consuming high vs low seed oil diets to assess actual biological exposure.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Controlled cooking experiments with comprehensive analytical chemistry and human biomonitoring study)",
      },
      evidence: [
        {
          id: "aldehyde-generation-frying",
          title:
            "Deep Frying with Seed Oils Generates Cytotoxic Aldehydes at Measurable Levels",
          description:
            "Csallany et al. (J. American Oil Chemists' Society, 2015) measured the toxic aldehyde 4-hydroxynonenal (4-HNE) in French fries from six fast-food restaurants, finding 7.83-32.15 ug HNE per 100 g of fries. 4-HNE forms from peroxidation of linoleic acid when polyunsaturated oils (e.g., soybean) are heated to frying temperatures, and is cytotoxic/mutagenic in cell studies. Earlier work by the same group documented HNE formation in soybean oil heated at 185C and its incorporation into fried food. Repeated heating increases aldehyde content.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Csallany et al., Journal of the American Oil Chemists' Society (2015)",
          sourceUrl: "https://link.springer.com/article/10.1007/s11746-015-2699-z",
          reasoning:
            "The chemistry of aldehyde generation from polyunsaturated fats is well-established and replicable. However, measuring aldehyde production in a flask is not the same as demonstrating harm in a human body. The doses used in cell and animal toxicology studies demonstrating 4-HNE harm typically exceed realistic dietary exposure by orders of magnitude.",
        },
        {
          id: "aldehyde-below-threshold",
          title:
            "Review Finds Aldehyde Levels from Normal Cooking Remain Below Toxicological Thresholds",
          description:
            "Aldehyde exposure appears to scale steeply with frying intensity and oil PUFA content. Single, brief domestic cooking generates far less aldehyde than repeated, prolonged deep frying. However, the dose-response picture is genuinely contested: some groups (e.g., Grootveld et al.) report that repeated domestic deep frying with PUFA-rich oils can reach aldehyde levels they characterize as toxicologically significant. There is no single, web-verifiable review that cleanly establishes that typical home use stays 10-100x below all NOAELs, so the magnitude of any margin remains uncertain.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Dose-response is contested; no single primary review web-verified for the specific 'below-NOAEL' claim",
          reasoning:
            "Down-weighted and reframed: the original 'specific 2020 Food Chemistry review concluding 10-100x below NOAEL' could not be web-verified, and recent literature actively disputes that home frying is comfortably below harm thresholds. The honest position is uncertainty about the safety margin, not a confirmed large one.",
        },
        {
          id: "hexane-extraction-residues",
          title:
            "Industrial Seed Oil Extraction Uses Hexane Solvent with Trace Residues in Final Product",
          description:
            "Most commercial seed oils are extracted with n-hexane, a petroleum-derived solvent; refining removes almost all of it (separating ~99.5% of oil from meal, then deodorizing). The EU caps hexane residue at 1 mg/kg (1 ppm) for vegetable oils (Directive 2009/32/EC); the US FDA treats hexane as a processing aid and does not set a maximum residue limit for oils, so routine US residue figures are not officially published. High chronic hexane exposure (occupational) causes peripheral neuropathy, but food-oil residues are orders of magnitude lower. Critics argue any solvent residue is undesirable given expeller-pressed alternatives.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 6,
            directness: 3,
          },
          source:
            "EU Directive 2009/32/EC (1 mg/kg residue limit); FDA treats hexane as a processing aid (no oil MRL)",
          sourceUrl: "https://www.eufic.org/en/misinformation/article/is-hexane-in-food-a-cause-for-concern",
          reasoning:
            "Corrected: the prior 'FDA testing detected <1 ppm' claim was not web-verifiable — the FDA does not set an oil MRL. Residue limits exist in the EU (1 mg/kg). Trace residues are far below demonstrated harm thresholds, so this is largely a precautionary/aesthetic concern; directness to health harm is low.",
        },
        {
          id: "smoke-point-stability",
          title:
            "Refined Seed Oils Have Higher Smoke Points Than Many Alternative Fats",
          description:
            "Refined soybean oil (smoke point ~232C / 450F), refined canola (~204-246C), and refined sunflower (~232C) have higher smoke points than butter (~150-177C), coconut oil (~177-204C), and extra-virgin olive oil (~160-190C). A higher smoke point means the oil tolerates higher cooking temperatures before rapid degradation, so within their intended range refined seed oils are relatively thermally stable — counter to the claim that they are uniquely fragile for cooking. (Caveat: smoke point measures volatilization onset, not total oxidative stability; PUFA-rich oils still form aldehydes below their smoke point, which is why oxidative stability and smoke point are distinct.)",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source:
            "Published cooking-oil smoke-point compilations (e.g., North American Olive Oil Assoc. / culinary references)",
          sourceUrl: "https://www.webstaurantstore.com/article/800/cooking-oil-smoke-points.html",
          reasoning:
            "Smoke point is easily verified and the relative ranking is uncontested. But smoke point alone does not capture all degradation pathways — aldehyde formation occurs below the smoke point in PUFA-rich oils — so directness was lowered. Source is a secondary compilation, not a single primary paper, hence moderate reliability.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Epidemiological Evidence
    // =========================================================================
    {
      id: "epidemiological-evidence",
      title: "Epidemiological Evidence",
      short_summary:
        "The dramatic increase in seed oil consumption since the 1960s coincides with rising rates of obesity, type 2 diabetes, and cardiovascular disease. But disentangling seed oils from the broader dietary and lifestyle transformation of the same period — including increased caloric intake, ultra-processed foods, and sedentary behavior — remains an unsolved epidemiological challenge.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "The temporal correlation between seed oil consumption and chronic disease is striking. US soybean oil consumption increased over 1,000-fold between 1909 and 1999, while obesity, type 2 diabetes, heart disease, and autoimmune conditions rose in parallel. The Sydney Diet Heart Study and the Minnesota Coronary Experiment — two randomized controlled trials that replaced saturated fat with linoleic acid-rich seed oils — both found increased mortality in the intervention group, contradicting the hypothesis that seed oils are heart-protective. Populations that retained traditional fat sources (e.g., the French with butter, the Japanese with fish oil, certain Mediterranean populations with olive oil) showed lower rates of the chronic diseases that plague seed-oil-heavy Western diets. The introduction of seed oils into a food supply represents the largest uncontrolled dietary experiment in human history, and the results look unfavorable.",
      proponent_rebuttal:
        "Ecological correlations between seed oil consumption and chronic disease are textbook examples of confounding. Seed oil consumption rose alongside caloric surplus, sugar consumption, ultra-processed food proliferation, sedentary lifestyles, and dozens of other dietary and environmental changes — attributing the disease burden to seed oils specifically is statistically irresponsible. The Sydney Diet Heart Study and Minnesota Coronary Experiment are frequently cited by seed oil critics but have significant limitations: both used margarine (partially hydrogenated, containing trans fats) as the linoleic acid source, not liquid seed oils, making them studies of trans fat harm rather than seed oil harm. When properly designed meta-analyses examine linoleic acid intake and cardiovascular outcomes — controlling for trans fat consumption — higher LA intake consistently associates with 15-20% lower coronary heart disease risk. The 2017 Cochrane Review of randomized trials found that replacing saturated fat with polyunsaturated fat reduced cardiovascular events by 27%. Furthermore, countries with the highest seed oil consumption (e.g., Israel, with very high soybean oil intake) have among the world's highest life expectancies, directly contradicting the harm narrative.",
      crux: {
        id: "seed-oil-replacement-trial",
        title: "The Seed Oil Replacement Trial",
        description:
          "The definitive test would be a large, long-term randomized controlled trial replacing seed oils with alternative fats (olive oil, butter, coconut oil, or animal fats) while holding total fat and caloric intake constant. If the seed-oil group shows worse inflammatory markers, metabolic outcomes, or cardiovascular events, the epidemiological association is causal. If outcomes are equivalent or favor the seed-oil group, the harm narrative is unsupported.",
        methodology:
          "Randomize 5,000 adults to one of two dietary interventions for 5 years: (1) standard seed-oil-based diet (soybean/canola as primary cooking and added fats, ~8% calories from LA) vs (2) seed-oil-free diet (olive oil and butter as primary fats, ~2% calories from LA), with matched total fat and caloric intake. Measure primary endpoints: cardiovascular events, metabolic syndrome incidence, inflammatory biomarkers (CRP, IL-6), and body composition via DEXA. Track compliance with biomarker verification (red blood cell fatty acid profiles).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$30-80M (5-year dietary intervention RCT with 5,000 participants and hard cardiovascular endpoints)",
      },
      evidence: [
        {
          id: "sydney-minnesota-trials",
          title:
            "Sydney Diet Heart Study and Minnesota Coronary Experiment Showed Increased Mortality with LA-Rich Diets",
          description:
            "Ramsden et al.'s recovered-data analysis of the Sydney Diet Heart Study (BMJ 2013;346:e8707) found that replacing saturated fat with omega-6-rich safflower oil and safflower-oil margarine was associated with higher all-cause mortality (HR 1.62, 95% CI 1.00-2.64) and CVD mortality (HR 1.70, 95% CI 1.03-2.80) in 458 men with prior coronary events. The Minnesota Coronary Experiment (BMJ 2016;353:i1246, recovered data) found the linoleic-acid intervention lowered serum cholesterol but produced no mortality benefit, with greater cholesterol-lowering paradoxically associated with higher death risk, especially in older participants. Both are among the few RCTs testing high-LA diets against saturated fat with mortality endpoints.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Ramsden et al., BMJ (2013, Sydney Diet Heart Study) and BMJ (2016, Minnesota Coronary Experiment) — recovered-data analyses",
          sourceUrl: "https://www.bmj.com/content/346/bmj.e8707",
          reasoning:
            "These are genuine randomized trials with mortality data — rare and valuable. However, the Sydney trial used safflower-oil margarine that likely contained trans fats, confounding it as a pure 'seed oil' test, and both are old trials reanalyzed decades later from recovered records, introducing analysis-choice and selection concerns. Larger meta-analyses do not corroborate net harm, so directness was trimmed.",
        },
        {
          id: "la-reduces-cvd-meta-analysis",
          title:
            "Meta-Analyses Show Higher Linoleic Acid Intake Associated with Lower CHD Risk",
          description:
            "Farvid et al.'s meta-analysis of 13 prospective cohorts (Circulation 2014;130:1568-1578; 310,602 participants, 12,479 CHD events) found that each 5% of energy from linoleic acid was associated with 9% lower CHD events (RR 0.91, 95% CI 0.87-0.96) and 13% lower CHD death (RR 0.87, 95% CI 0.82-0.94); highest-vs-lowest intake showed 15% lower events (RR 0.85) and 21% lower CHD death (RR 0.79). Separately, the Cochrane review of saturated-fat reduction RCTs (Hooper et al., 2020, CD011737) found a 17% reduction in combined cardiovascular events (RR 0.83, 95% CI 0.70-0.98), with benefit driven by replacing saturated fat with polyunsaturated fat.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Farvid et al., Circulation (2014); Hooper et al., Cochrane Database of Systematic Reviews (2020, CD011737)",
          sourceUrl: "https://www.ahajournals.org/doi/abs/10.1161/circulationaha.114.010236",
          reasoning:
            "Meta-analyses of prospective cohorts and RCTs represent the highest levels of epidemiological evidence. The consistent finding that LA intake associates with lower CHD risk directly contradicts the seed oil harm narrative. However, observational studies cannot fully eliminate confounding, and the RCTs did not specifically test modern liquid seed oils in isolation.",
        },
        {
          id: "ecological-correlation-obesity",
          title:
            "Seed Oil Consumption Rose 1,000-Fold Alongside Obesity and Metabolic Disease Epidemics",
          description:
            "Blasbalg et al. (AJCN 2011) estimated, from USDA food-disappearance data, that US per-capita soybean oil consumption rose more than 1,000-fold between 1909 and 1999, raising linoleic acid intake substantially. Over a broadly overlapping period, US obesity prevalence rose from low single digits to over 30% and type 2 diabetes rose several-fold. The temporal correlation is real but co-occurs with large changes in total calories, sugar/refined-carbohydrate intake, ultra-processed foods, and physical activity, so it cannot isolate seed oils as the cause.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 9,
            directness: 2,
          },
          source:
            "Blasbalg et al., American Journal of Clinical Nutrition (2011); USDA food-disappearance data",
          sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3076650/",
          reasoning:
            "The ecological correlation is real and replicable from public data, but ecological correlations are the weakest form of epidemiological evidence. Dozens of dietary and lifestyle variables changed simultaneously, making attribution to any single factor speculative. The directness score is low because correlation at the population level cannot establish individual-level causation.",
        },
        {
          id: "israel-paradox",
          title:
            "Israel Has Among the Highest Seed Oil Intake and Highest Life Expectancy Globally",
          description:
            "Israel has among the world's highest per-capita omega-6 intakes yet a high overall life expectancy (~83 years), which seed-oil skeptics cite as evidence against population-level harm. Important caveat: the original 'Israeli Paradox' coinage (Yam, Eliraz & Berry, Israel J. Med. Sci. 1996) actually pointed the other way — it argued that Israel's very high omega-6 intake coincided with high rates of heart disease, diabetes, obesity, and some cancers. So this is a contested, double-edged ecological observation, not a clean exoneration of seed oils.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 6,
            directness: 3,
          },
          source:
            "Yam, Eliraz & Berry, Israel Journal of Medical Sciences (1996;32:1134-1143) — 'Israeli Paradox'; national life-expectancy statistics",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/8960090/",
          reasoning:
            "Down-weighted and reframed: the named 'Israeli Paradox' source argues high omega-6 coincides with MORE metabolic disease, so using it as a clean point against harm misreads it. Life expectancy is a crude metric confounded by healthcare, genetics, and smoking. This is a weak, double-edged ecological observation.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
