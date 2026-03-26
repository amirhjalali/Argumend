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
            "Anthropological and nutritional analyses estimate that pre-industrial human diets contained omega-6 to omega-3 ratios between 1:1 and 4:1. US dietary surveys show the modern ratio has reached 15:1 to 20:1, driven primarily by soybean oil consumption increasing over 1,000-fold in the 20th century. This represents an evolutionary mismatch of a magnitude unprecedented for any macronutrient.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "Biomedicine & Pharmacotherapy; USDA Economic Research Service",
          reasoning:
            "The dietary shift is well-documented and uncontested. However, documenting a change in intake does not demonstrate harm — it establishes a plausible mechanism that requires downstream evidence of pathology.",
        },
        {
          id: "la-does-not-raise-aa",
          title:
            "Systematic Reviews Show Dietary Linoleic Acid Does Not Increase Tissue Arachidonic Acid",
          description:
            "A 2014 systematic review in Prostaglandins, Leukotrienes and Essential Fatty Acids analyzed 36 controlled trials and found that increasing dietary linoleic acid intake — even doubling or tripling it — did not significantly increase arachidonic acid concentrations in plasma, serum, or red blood cell phospholipids. The delta-6 desaturase conversion step is rate-limiting, and the body tightly regulates AA levels independent of LA intake.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Prostaglandins, Leukotrienes and Essential Fatty Acids",
          reasoning:
            "This directly tests the mechanistic pathway underlying the ratio hypothesis. If LA does not raise tissue AA, the primary proposed mechanism for seed-oil-driven inflammation is undermined. The review is comprehensive and peer-reviewed.",
        },
        {
          id: "aha-omega6-recommendation",
          title:
            "AHA Science Advisory Recommends 5-10% of Calories from Omega-6 for Heart Health",
          description:
            "The 2009 American Heart Association Science Advisory reviewed the totality of evidence and concluded that consuming at least 5-10% of energy from omega-6 polyunsaturated fatty acids reduces the risk of coronary heart disease relative to lower intakes. The advisory specifically addressed and rejected the hypothesis that omega-6 intake promotes inflammation, citing clinical trial and epidemiological evidence.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Circulation (American Heart Association)",
          reasoning:
            "The AHA is a leading cardiovascular health authority. Independence is slightly reduced because some advisory authors have received industry funding, but the recommendation is consistent with independent meta-analyses.",
        },
        {
          id: "eicosanoid-imbalance-animal",
          title:
            "Animal Studies Show High Omega-6 Diets Promote Inflammatory Eicosanoid Production",
          description:
            "Rodent studies have demonstrated that high-linoleic acid diets increase production of pro-inflammatory eicosanoids including prostaglandin E2, thromboxane A2, and leukotriene B4, and promote adipose tissue inflammation, insulin resistance, and weight gain compared to isocaloric diets with balanced omega-6/omega-3 ratios. A 2012 study in Nutrients showed mice fed high-LA diets for 14 weeks developed greater adiposity and liver inflammation than controls.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "Nutrients; Journal of Lipid Research",
          reasoning:
            "Animal models provide mechanistic evidence, but cross-species translation is uncertain. Rodent fatty acid metabolism differs from humans, and doses used often exceed typical human consumption proportionally. Still, the biological pathway is plausible.",
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
            "A 2012 study in Food Chemistry by Csallany et al. measured aldehyde production during deep frying and found that soybean and sunflower oils generated significantly higher levels of 4-hydroxynonenal (4-HNE) and malondialdehyde (MDA) than olive oil or coconut oil after heating to 185C for standard frying durations. 4-HNE is a reactive aldehyde implicated in oxidative stress, mitochondrial dysfunction, and atherosclerotic plaque formation in cell and animal studies. Levels increased dramatically with repeated heating cycles, as commonly occurs in restaurant fryers.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Food Chemistry",
          reasoning:
            "The chemistry of aldehyde generation from polyunsaturated fats is well-established and replicable. However, measuring aldehyde production in a flask is not the same as demonstrating harm in a human body. The doses used in cell and animal toxicology studies demonstrating 4-HNE harm typically exceed realistic dietary exposure by orders of magnitude.",
        },
        {
          id: "aldehyde-below-threshold",
          title:
            "Review Finds Aldehyde Levels from Normal Cooking Remain Below Toxicological Thresholds",
          description:
            "A 2020 comprehensive review in Food Chemistry analyzed aldehyde formation across multiple cooking oil types and conditions. Under standard home cooking conditions — single-use frying at recommended temperatures — aldehyde concentrations in seed oils remained 10-100x below established no-observed-adverse-effect levels (NOAELs). The review concluded that health risks from cooking oil degradation products are primarily associated with repeated, prolonged industrial deep frying, not typical domestic use.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Food Chemistry",
          reasoning:
            "This directly addresses the dose-response question. If aldehyde levels from normal cooking are orders of magnitude below harm thresholds, the oxidation argument applies primarily to industrial food service, not general seed oil consumption. The review is comprehensive and accounts for multiple oil types and cooking methods.",
        },
        {
          id: "hexane-extraction-residues",
          title:
            "Industrial Seed Oil Extraction Uses Hexane Solvent with Trace Residues in Final Product",
          description:
            "Most commercial seed oils are extracted using n-hexane, a petroleum-derived solvent. While refining is designed to remove hexane, FDA testing has detected trace residues (typically <1 ppm) in finished oils. Chronic hexane exposure at high levels causes peripheral neuropathy, though the concentrations in food oils are far below occupational exposure limits. Critics argue that any petroleum solvent residue in food is unacceptable when mechanical (expeller-pressed) alternatives exist.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source: "FDA; Journal of Food Science",
          reasoning:
            "Hexane extraction is an industrial reality, but trace residues at <1 ppm are far below any demonstrated harm threshold. The concern is more aesthetic and precautionary than evidence-based. Expeller-pressed alternatives exist but are not economically competitive at scale.",
        },
        {
          id: "smoke-point-stability",
          title:
            "Refined Seed Oils Have Higher Smoke Points Than Many Alternative Fats",
          description:
            "Refined soybean oil (smoke point ~234C), canola oil (~240C), and sunflower oil (~232C) have significantly higher smoke points than butter (~177C), coconut oil (~177C), and extra virgin olive oil (~190C). Cooking above the smoke point accelerates oxidative degradation. When used within their intended temperature range, seed oils are among the most thermally stable cooking fats available, contradicting the narrative that they are uniquely prone to harmful decomposition during cooking.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Journal of the American Oil Chemists' Society",
          reasoning:
            "Smoke point is a well-established and easily verified property. This challenges the claim that seed oils are uniquely dangerous for cooking by showing they are more stable at high temperatures than proposed alternatives. However, smoke point alone does not capture all degradation pathways — some aldehyde formation occurs below the smoke point.",
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
            "The Sydney Diet Heart Study (1966-1973), re-analyzed in 2013 from recovered data, found that replacing saturated fat with omega-6-rich safflower oil margarine increased all-cause mortality (HR 1.62) and cardiovascular mortality (HR 1.70) in 458 men with recent coronary events. The Minnesota Coronary Experiment (1968-1973), with recovered data re-analyzed in 2016, found that while the LA-rich intervention lowered serum cholesterol, there was no mortality benefit and a trend toward increased death in participants over 65. These are the only large RCTs specifically testing high-LA diets against saturated fat with mortality endpoints.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "BMJ; The BMJ (recovered data re-analyses)",
          reasoning:
            "These are genuine randomized trials with mortality data — rare and valuable. However, both used margarine containing trans fats as the LA vehicle, confounding the results. Critics argue these are trans fat studies, not seed oil studies. The recovered-data re-analyses were peer-reviewed but conducted decades after the original trials, introducing potential selection and analysis bias.",
        },
        {
          id: "la-reduces-cvd-meta-analysis",
          title:
            "Meta-Analyses Show Higher Linoleic Acid Intake Associated with Lower CHD Risk",
          description:
            "A 2014 meta-analysis in the American Journal of Clinical Nutrition pooled data from 13 prospective cohort studies (310,602 participants, 12,479 coronary events) and found that a 5% energy increase from linoleic acid was associated with a 9% lower risk of coronary heart disease events (RR 0.91, 95% CI 0.86-0.96) and a 13% lower risk of CHD death (RR 0.87, 95% CI 0.82-0.94). The 2017 Cochrane Review of RCTs found that replacing saturated fat with polyunsaturated fat reduced cardiovascular events by 27% (RR 0.73, 95% CI 0.58-0.92).",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "American Journal of Clinical Nutrition; Cochrane Database of Systematic Reviews",
          reasoning:
            "Meta-analyses of prospective cohorts and RCTs represent the highest levels of epidemiological evidence. The consistent finding that LA intake associates with lower CHD risk directly contradicts the seed oil harm narrative. However, observational studies cannot fully eliminate confounding, and the RCTs did not specifically test modern liquid seed oils in isolation.",
        },
        {
          id: "ecological-correlation-obesity",
          title:
            "Seed Oil Consumption Rose 1,000-Fold Alongside Obesity and Metabolic Disease Epidemics",
          description:
            "US soybean oil consumption increased from approximately 0.01 kg per capita in 1909 to over 11 kg per capita by 1999 — a roughly 1,000-fold increase. Over the same period, obesity prevalence rose from under 5% to over 30%, type 2 diabetes prevalence increased 7-fold, and cardiovascular disease became the leading cause of death. The temporal correlation is among the strongest for any single dietary change, though total caloric intake, sugar consumption, and physical activity also changed dramatically over this period.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 9,
            directness: 3,
          },
          source: "USDA Economic Research Service; CDC NHANES data",
          reasoning:
            "The ecological correlation is real and replicable from public data, but ecological correlations are the weakest form of epidemiological evidence. Dozens of dietary and lifestyle variables changed simultaneously, making attribution to any single factor speculative. The directness score is low because correlation at the population level cannot establish individual-level causation.",
        },
        {
          id: "israel-paradox",
          title:
            "Israel Has Among the Highest Seed Oil Intake and Highest Life Expectancy Globally",
          description:
            "Israel has one of the world's highest per-capita consumption rates of omega-6-rich seed oils (particularly soybean and sunflower oil), yet Israeli life expectancy ranks among the top 10 globally at approximately 83 years. This has been termed the 'Israeli Paradox.' While Israel does have relatively high rates of certain cancers and diabetes, overall mortality outcomes do not support the hypothesis that high seed oil consumption drives population-level health decline.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "European Journal of Clinical Nutrition; WHO Global Health Observatory",
          reasoning:
            "The Israeli paradox is a frequently cited counterexample to the seed oil harm narrative. However, life expectancy is a crude metric influenced by healthcare quality, genetics, smoking rates, and many non-dietary factors. Israel's relatively high rates of metabolic disease could be consistent with seed oil harm masked by excellent healthcare. The ecological nature of this evidence limits its directness.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
