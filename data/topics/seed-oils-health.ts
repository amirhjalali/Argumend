import type { TopicInput } from "@/lib/schemas/topic";

export const seedOilsHealthData = {
  id: "seed-oils-health",
  title: "Are Seed Oils Harmful to Human Health?",
  question: "Are seed oils bad for you?",
  aliases: [
    "Are seed oils a major driver of inflammation, obesity and metabolic disease?",
    "Are seed oils harmful to your health?",
    "Should I cook with beef tallow instead of vegetable oil?",
    "Is canola oil toxic?",
  ],
  meta_claim:
    "Industrial seed oils (soybean, canola, sunflower) are a major driver of chronic inflammation, obesity, and metabolic disease.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: the Dietary Guidelines for Americans 2025-2030,
  // published 7 January 2026, tell people to prioritise oils with essential
  // fatty acids "such as olive oil" and add that "other options can include
  // butter or beef tallow", while keeping the 10%-of-calories cap on
  // saturated fat and conceding that "more high-quality research is needed to
  // determine which types of dietary fats best support long-term health".
  last_updated: "2026-11-03",
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "US per-capita soybean oil consumption rose more than 1,000-fold between 1909 and 1999, lifting linoleic acid from about 2.8% to 7.2% of calories, over the same century in which obesity and diabetes climbed. In January 2026 the new Dietary Guidelines told Americans to cook with olive oil first and added that 'other options can include butter or beef tallow'. No trial has yet tested modern liquid seed oils against other fats with calories and total fat held constant.",
    confidence: 84,
    source:
      "Blasbalg et al., American Journal of Clinical Nutrition (2011), from USDA food-disappearance data; Dietary Guidelines for Americans 2025-2030 (7 January 2026)",
    sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3076650/",
  },
  // ── Stage 2: the honest case ──
  simple_case: [
    "The answer decides what goes in a frying pan, what restaurants fry in, and whether a family swapping canola for tallow is protecting itself or raising its saturated fat.",
  ],
  references: [
    {
      title:
        "Marklund et al., Biomarkers of Dietary Omega-6 Fatty Acids and Incident Cardiovascular Disease and Mortality — Circulation 2019;139:2422-2436 (30 cohorts, 68,659 participants)",
      url: "https://pubmed.ncbi.nlm.nih.gov/30971107/",
    },
    {
      title:
        "Farvid et al., Dietary Linoleic Acid and Risk of Coronary Heart Disease: A Systematic Review and Meta-Analysis of Prospective Cohort Studies — Circulation 2014;130:1568-1578",
      url: "https://www.ahajournals.org/doi/abs/10.1161/circulationaha.114.010236",
    },
    {
      title:
        "The Sydney Diet Heart Study: A Randomised Controlled Trial of Linoleic Acid for Secondary Prevention — BMJ 2013;346:e8707",
      url: "https://www.bmj.com/content/346/bmj.e8707",
    },
    {
      title:
        "Hooper et al., Reduction in Saturated Fat Intake for Cardiovascular Disease — Cochrane Database of Systematic Reviews 2020, CD011737",
      url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011737.pub3/full",
    },
    {
      title: "Dietary Guidelines for Americans 2025-2030 (January 2026)",
      url: "https://cdn.realfood.gov/DGA_508.pdf",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did humans evolve to consume this much linoleic acid?",
      content:
        "Ancestral diets are estimated to have contained 1-3% of calories from linoleic acid (omega-6), whereas modern Western diets deliver 7-10% or more. Does this mismatch matter for chronic disease, or has human metabolism adapted to a wide range of fat compositions across cultures and centuries?",
    },
    {
      id: "q2",
      title: "Are seed oils harmful, or is it the ultra-processed foods that contain them?",
      content:
        "Seed oils are a primary ingredient in ultra-processed foods: chips, fried foods, packaged snacks, fast food. Critics argue that isolating seed oils as the causal agent is impossible because they almost always come with refined carbohydrates, added sugars, and additives. Is the health signal coming from the oils themselves, or from the dietary pattern they enable?",
    },
    {
      id: "q3",
      title: "Should individuals avoid seed oils based on the current evidence?",
      content:
        "Online health communities have made 'avoid seed oils' a movement, with influencers promoting tallow, butter and coconut oil. The 2026 Dietary Guidelines now list butter and beef tallow as cooking options while keeping the cap on saturated fat. Is precautionary avoidance a reasonable personal choice, or does it push people toward saturated fat with its own documented cardiovascular risks?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Omega-6 to Omega-3 Ratio (mechanism)
    // =========================================================================
    {
      id: "omega-6-omega-3-ratio",
      title: "Does More Omega-6 Mean More Inflammation?",
      short_summary:
        "The proposed mechanism is that linoleic acid from seed oils feeds pro-inflammatory signalling. The simplest version fails: a review of human trials found that changing linoleic acid intake six-fold up or 90% down left tissue arachidonic acid unchanged. Newer work has found other routes, including a 2025 Science paper on a linoleic-acid sensor that drives cell growth.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The ratio story sounds right and does not survive measurement. A systematic review of controlled human trials found that raising dietary linoleic acid up to six-fold, or cutting it by up to 90%, did not significantly change tissue arachidonic acid, because conversion through delta-6 desaturase is rate-limited and the body holds arachidonic acid steady. The people with the most linoleic acid in their blood are not the sick ones: a pooled analysis of 30 cohorts in 13 countries, 68,659 participants and 15,198 cardiovascular events, found higher circulating linoleic acid associated with lower risk of cardiovascular disease, cardiovascular death and ischaemic stroke, and arachidonic acid associated with no higher risk. The 2009 American Heart Association advisory recommends at least 5-10% of calories from omega-6.",
      proponent_rebuttal:
        "Blood levels of a fatty acid are not the same as a mechanism, and the mechanism keeps turning up. In March 2025, researchers at Weill Cornell reported in Science that linoleic acid is sensed directly by a protein called FABP5, which binds mTOR's partner Raptor and drives cell growth, and that FABP5 was elevated in tumours and serum from patients with triple-negative breast cancer. And where linoleic acid has been lowered in a randomised trial rather than merely measured, something happened: in a 2021 BMJ trial of 182 people with migraine, a diet that raised omega-3 and cut linoleic acid to under 1.8% of calories reduced headache days per month by 4.0 against the control diet, two days better than raising omega-3 alone. The honest claim is not that linoleic acid floods the body with arachidonic acid; it is that a tenfold change in a signalling lipid over one century is unlikely to be inert.",
      crux: {
        id: "la-to-aa-conversion",
        title: "The Linoleic Acid Signalling Test",
        question:
          "Does sustained high omega-6 intake from seed oils measurably shift inflammatory signaling in humans?",
        description:
          "The simple version of the mechanism has been tested and failed: dietary linoleic acid does not raise tissue arachidonic acid. The open question is whether it shifts the wider family of signalling lipids, and pathways such as the FABP5 sensor, in ways that matter for health.",
        methodology:
          "A randomised controlled feeding study assigning adults to high-linoleic (about 10% of calories from seed oils) or low-linoleic (about 2%, replaced with oleic acid sources) diets for 12 weeks, measuring red-cell arachidonic acid, plasma inflammatory markers (CRP, IL-6, TNF-alpha, prostaglandin E2), the full urinary and plasma oxylipin profile and FABP5-mTORC1 activity, with omega-3 intake matched across groups.",
        equation:
          "\\text{AA}_{tissue} = f(\\text{LA}_{dietary}) \\quad \\text{where} \\quad \\Delta\\text{AA} = \\beta_1 \\cdot \\Delta\\text{LA} + \\varepsilon",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A 12-week randomized feeding trial of 200 adults on high or low linoleic acid diets, measuring red-cell arachidonic acid, CRP, IL-6, prostaglandin E2 and urinary eicosanoids at the start and end.",
        },
        cost_to_verify:
          "$2-5M (12-week controlled feeding study with comprehensive lipidomics and inflammatory biomarker panels)",
        falsification: {
          supporter_flip:
            "If a controlled feeding trial found that high dietary linoleic acid leaves tissue arachidonic acid flat, the wider oxylipin profile unshifted and inflammatory markers unchanged, the proposed pathway would have nowhere left to run.",
          skeptic_flip:
            "If such a trial found the signalling lipids beyond arachidonic acid shifting with intake, or FABP5-mTORC1 activity tracking linoleic acid as the 2025 Science work suggests, the claim that the body simply regulates omega-6 away would fail.",
          common_ground:
            "Both sides agree dietary linoleic acid rose dramatically in the 20th century and that the body cannot synthesize either omega-6 or omega-3, so diet sets the balance.",
          live_disagreement:
            "Whether sustained high-LA intake shifts inflammatory signalling in people through routes other than tissue arachidonic acid, and whether any such shift is large enough to affect health.",
        },
      },
      evidence: [
        {
          id: "la-does-not-raise-aa",
          title:
            "Changing linoleic acid six-fold up or 90% down left tissue arachidonic acid unchanged (Nutrition & Metabolism, 2011)",
          description:
            "Rett & Whelan's systematic review of adult human trials found that changing dietary linoleic acid did not significantly change tissue arachidonic acid in plasma or serum phospholipids: increasing linoleic acid up to six-fold showed no significant correlation with arachidonic acid (p=0.72), and decreasing it by up to 90% likewise had no significant effect (p=0.39). Conversion via delta-6 desaturase is rate-limiting, so the body regulates arachidonic acid largely independently of intake.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Rett & Whelan, Nutrition & Metabolism (London) (2011)",
          sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3132704/",
          reasoning:
            "This tests the pathway the ratio hypothesis was built on, and the pathway does not behave as claimed. It establishes arachidonic-acid homeostasis only; it does not rule out other effects of linoleic acid, which is why the crux asks about the wider signalling profile.",
        },
        {
          id: "marklund-biomarker-pooling",
          title:
            "30 cohorts, 68,659 people: more linoleic acid in the blood, less cardiovascular disease (Circulation, 2019)",
          description:
            "A global consortium analysed individual-level data from 30 prospective studies in 13 countries, with 15,198 cardiovascular events among 68,659 participants, measuring linoleic and arachidonic acid in blood and fat tissue rather than relying on diet questionnaires. Higher linoleic acid was associated with lower risk of total cardiovascular disease (hazard ratio 0.93), cardiovascular mortality (0.78) and ischaemic stroke (0.88). Higher arachidonic acid was not associated with higher risk; in the top versus bottom quintile it was associated with lower total cardiovascular disease (0.92). No consistent differences appeared by age, sex, diabetes, statin use or fatty-acid desaturase genotype.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "Marklund et al., 'Biomarkers of Dietary Omega-6 Fatty Acids and Incident Cardiovascular Disease and Mortality', Circulation 139(21):2422-2436 (2019)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/30971107/",
          reasoning:
            "Measured biomarkers avoid the recall errors that weaken food-questionnaire studies, and the direction is the opposite of the harm claim, including for arachidonic acid itself. It remains observational: people with high linoleic acid differ in other ways, and biomarkers track intake imperfectly for a fatty acid the body also stores.",
        },
        {
          id: "aha-omega6-recommendation",
          title:
            "American Heart Association advises at least 5-10% of calories from omega-6 fats (2009)",
          description:
            "The 2009 AHA Science Advisory (Harris et al., Circulation 2009;119:902-907) concluded that an omega-6 polyunsaturated fat intake of at least 5-10% of energy, in the context of other AHA dietary recommendations, is consistent with reduced coronary heart disease risk relative to lower intakes. The advisory argued specifically against the hypothesis that omega-6 intake promotes cardiovascular harm via inflammation.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Harris et al., Circulation (American Heart Association Science Advisory) (2009)",
          sourceUrl: "https://www.ahajournals.org/doi/10.1161/circulationaha.108.191627",
          reasoning:
            "A leading cardiovascular body reading the clinical and epidemiological evidence. It is a 2009 position statement, some of whose authors had industry funding, and later work has not overturned it; it is an authority's judgment rather than a new measurement.",
        },
        {
          id: "fabp5-linoleic-sensor-2025",
          title:
            "Science (2025): linoleic acid is sensed by FABP5 and drives mTORC1 growth signalling, with FABP5 raised in triple-negative breast cancer",
          description:
            "Researchers at Weill Cornell Medicine reported in Science in March 2025 that fatty acid-binding protein 5 (FABP5) binds linoleic acid and then binds Raptor, the regulatory partner of mTORC1, enhancing mTORC1 assembly, substrate binding and cell proliferation. FABP5 protein was elevated in tumours and serum from patients with triple-negative breast cancer compared with receptor-positive breast cancer, which the authors propose as a biomarker of responses to omega-6 intake in that subtype.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 3,
          },
          source:
            "Koundouros et al., 'Direct sensing of dietary ω-6 linoleic acid through FABP5-mTORC1 signaling', Science 387(6739):eadm9805 (14 March 2025)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40080571/",
          reasoning:
            "A mechanism for linoleic acid acting on cells that does not run through arachidonic acid, in a top journal, which answers the objection that no pathway exists. It is cell and mouse work with a human biomarker association: it does not show that dietary seed oil causes cancer or inflammation in people, so directness is low.",
        },
        {
          id: "ratio-shift-historical",
          title:
            "Linoleic acid rose from about 2.8% to 7.2% of US calories in the 20th century (AJCN, 2011)",
          description:
            "Blasbalg et al. (AJCN 2011), using USDA food-disappearance data, documented that estimated per-capita soybean oil consumption rose more than 1,000-fold between 1909 and 1999, raising linoleic acid from about 2.8% to 7.2% of energy. Anthropological estimates (Simopoulos) put ancestral omega-6 to omega-3 ratios near 1:1 against roughly 15:1 today. The intake shift itself is uncontested; whether the resulting ratio change causes disease is the disputed step.",
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
            "The canonical intake figures, reconstructed from public data. A change in intake is a reason to ask the question, not evidence of harm, so directness is low.",
        },
        {
          id: "eicosanoid-imbalance-animal",
          title: "Mice fed 22.5% of calories as linoleic acid gained more weight, but showed no hypothalamic inflammation (2017)",
          description:
            "A controlled study of 48 male mice compared low-fat and high-fat diets with linoleic acid providing 1%, 15% or 22.5% of energy. The 22.5% diet, with the balance of fat saturated, produced greater weight gain and insulin resistance than the control and 1% diets, but the researchers did not find the hypothalamic inflammation they had proposed as the mechanism.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 5,
            directness: 3,
          },
          source:
            "Mamounis, Yasrebi & Roepke, Journal of Nutritional Biochemistry (2017)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/27886622/",
          reasoning:
            "Supports a narrow mouse weight-gain result at an intake far above typical human diets. Rodent fatty-acid metabolism differs from ours and the proposed inflammatory mechanism was not observed, so this is weak for the human question.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Oxidation and Processing
    // =========================================================================
    {
      id: "oxidation-and-processing",
      title: "What Happens When You Heat Them?",
      short_summary:
        "Heating polyunsaturated oils makes aldehydes such as 4-HNE, which are toxic to cells in the lab. Fast-food fries measure 7.83-32.15 micrograms of 4-HNE per 100 g. Whether a home kitchen or a restaurant fryer delivers enough to harm a person is genuinely unsettled: nobody has measured real diets against a validated safety threshold.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Every fat degrades when heated, and refined seed oils degrade less readily than the alternatives being sold as safer. Refined soybean oil smokes at about 232°C and canola at 204-246°C, against roughly 150-177°C for butter and 160-190°C for extra-virgin olive oil. Aldehyde formation scales with how hot, how long and how often an oil is heated, which makes it a question about commercial deep-frying rather than a domestic pan. Doses that harm cells in a dish typically exceed realistic dietary exposure by orders of magnitude, and the hexane used in extraction is capped in the EU at 1 mg/kg in the final oil. The honest caveat is that the margin for repeated home frying has not been cleanly established.",
      proponent_rebuttal:
        "Polyunsaturated fats have multiple double bonds, which is exactly what makes them unstable to heat, light and oxygen, and industrial refining already puts them through solvent extraction, bleaching and deodorising above 200°C. Frying them generates 4-hydroxynonenal, malondialdehyde and acrolein, which damage DNA and cross-link proteins in laboratory studies; Csallany's group measured 7.83-32.15 micrograms of 4-HNE per 100 g in fries from six fast-food restaurants. Repeated heating, as in a restaurant fryer, raises the level. Groups studying domestic frying report that repeated use of PUFA-rich oils can reach aldehyde levels they call toxicologically significant. Nobody eating fries three times a week knows what dose they are getting, because nobody has measured it against a safety threshold.",
      crux: {
        id: "aldehyde-dose-response",
        title: "The Dietary Aldehyde Dose-Response Test",
        question:
          "Do real-world diets deliver enough cooking-oil aldehydes to cause measurable harm?",
        description:
          "Both sides accept that heating these oils makes aldehydes and that the amount scales with frying intensity. What nobody has established is the dose a real eater receives over a week, and how that compares with a validated no-adverse-effect level.",
        methodology:
          "Measure aldehyde concentrations (4-HNE, malondialdehyde, acrolein) in meals prepared with seed oils under realistic home and restaurant conditions, total them into cumulative daily intake for typical consumers, compare with established no-observed-adverse-effect levels, and measure urinary aldehyde metabolites in people eating high- versus low-seed-oil diets to check actual biological exposure.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Aldehyde levels (4-HNE, MDA, acrolein) measured in meals cooked with seed oils under real home and restaurant conditions, totalled into typical daily intake and set against toxicological no-adverse-effect levels.",
        },
        cost_to_verify:
          "$1-3M (controlled cooking experiments with analytical chemistry plus human biomonitoring)",
        falsification: {
          supporter_flip:
            "If cooking experiments and human biomonitoring showed aldehyde exposure from realistic home and restaurant use staying far below no-observed-adverse-effect levels, with urinary metabolites unchanged on high versus low seed-oil diets, the oxidation argument would shrink to a concern about commercial fryers.",
          skeptic_flip:
            "If biomonitoring of home cooks found exposure near the levels measured in fast-food fries (4-HNE at 7.83-32.15 micrograms per 100 g) or in repeated domestic deep-frying, the safety margin for everyday use would no longer look secure.",
          common_ground:
            "Both sides agree that heating polyunsaturated oils generates aldehydes, that aldehyde formation scales with frying intensity and repetition, and that single brief home cooking produces far less than prolonged restaurant deep-frying.",
          live_disagreement:
            "The dose-response: whether cumulative real-world aldehyde intake reaches levels that cause measurable harm in people.",
        },
      },
      evidence: [
        {
          id: "aldehyde-generation-frying",
          title:
            "Fast-food fries carried 7.83-32.15 micrograms of the toxic aldehyde 4-HNE per 100 g (JAOCS, 2015)",
          description:
            "Csallany et al. measured 4-hydroxynonenal in French fries from six fast-food restaurants and found 7.83-32.15 micrograms per 100 g of fries. 4-HNE forms when linoleic acid in polyunsaturated oils such as soybean is heated to frying temperatures, and is cytotoxic and mutagenic in cell studies. The same group documented 4-HNE forming in soybean oil heated at 185°C and transferring into the fried food, with repeated heating raising the level.",
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
            "The chemistry is well established and the measurement is in food people actually eat, not a flask. Measuring a compound in fries is not the same as showing harm in a body: the doses in the cell and animal studies of 4-HNE toxicity are far above these levels.",
        },
        {
          id: "aldehyde-below-threshold",
          title: "No published review cleanly establishes the safety margin for typical home frying",
          description:
            "Aldehyde exposure scales steeply with frying intensity and the oil's polyunsaturated content, and a single brief domestic fry generates far less than repeated, prolonged deep-frying. But the dose-response picture is contested: some groups (Grootveld and colleagues) report that repeated domestic deep-frying with polyunsaturated oils can reach aldehyde levels they characterise as toxicologically significant. There is no single verifiable review establishing that typical home use stays well below all no-observed-adverse-effect levels, so the size of any margin is unknown.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "Synthesis / inference — contested dose-response literature with no verified margin estimate",
          reasoning:
            "Honest uncertainty rather than reassurance: the earlier claim of a 10-100x margin below safety thresholds could not be verified, and recent work disputes it. It sits on the skeptic side only because it rebuts the claim that harm from home cooking has been shown.",
        },
        {
          id: "smoke-point-stability",
          title:
            "Refined seed oils smoke at higher temperatures than butter, coconut oil or extra-virgin olive oil",
          description:
            "Refined soybean oil smokes at about 232°C, refined canola at 204-246°C and refined sunflower at about 232°C, against roughly 150-177°C for butter, 177-204°C for coconut oil and 160-190°C for extra-virgin olive oil. Within their intended range, refined seed oils therefore tolerate heat better than several fats promoted as replacements. Smoke point measures the onset of volatilisation, not total oxidative stability: polyunsaturated oils still form aldehydes below their smoke point.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 9,
            directness: 4,
          },
          source:
            "Published cooking-oil smoke-point compilations (culinary and trade references)",
          sourceUrl: "https://www.webstaurantstore.com/article/800/cooking-oil-smoke-points.html",
          reasoning:
            "Easily checked and uncontested as a ranking, and it rebuts the claim that these oils are uniquely fragile. Smoke point does not capture the oxidation pathway that produces aldehydes, so it answers only part of the charge.",
        },
        {
          id: "hexane-extraction-residues",
          title: "Hexane extraction leaves trace residues, capped at 1 mg/kg in the EU",
          description:
            "Most commercial seed oils are extracted with n-hexane, a petroleum-derived solvent; refining removes almost all of it. The EU caps hexane residue in vegetable oils at 1 mg/kg (Directive 2009/32/EC); the US FDA treats hexane as a processing aid and sets no maximum residue limit for oils, so routine US residue figures are not officially published. High chronic occupational hexane exposure causes peripheral neuropathy, but food-oil residues are orders of magnitude lower. Critics argue any solvent residue is undesirable when expeller-pressed alternatives exist.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 6,
            directness: 3,
          },
          source:
            "EU Directive 2009/32/EC (1 mg/kg residue limit); FDA treats hexane as a processing aid",
          sourceUrl: "https://www.eufic.org/en/misinformation/article/is-hexane-in-food-a-cause-for-concern",
          reasoning:
            "Residue limits are far below demonstrated harm thresholds, so this is largely a precautionary concern. The absence of a US limit is a real gap in what consumers can check, which is why it belongs on the map at low weight.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: What happens to people who eat them (outcomes)
    // =========================================================================
    {
      id: "epidemiological-evidence",
      title: "What Happens to People Who Eat Them?",
      short_summary:
        "In 221,054 US health professionals followed for up to 33 years, the highest plant-oil intake came with 16% lower total mortality and the highest butter intake with 15% higher. Two old randomised trials that replaced saturated fat with linoleic acid found the opposite on mortality, but used margarine that probably contained trans fats.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "Seed oil consumption rose alongside calories, sugar, ultra-processed food and sedentary work, so the population correlation with obesity and diabetes proves nothing on its own; attributing the disease burden to the oils is not a finding, it is a choice of variable. The trials critics lean on cut the other way once read closely: Sydney and Minnesota used margarine that probably contained trans fats, which makes them tests of trans fat, not of liquid seed oil. When linoleic acid is measured in blood rather than inferred, higher levels track lower heart disease. The Cochrane review of randomised trials found that cutting saturated fat reduced combined cardiovascular events by 17%, with the benefit largest when it was replaced by polyunsaturated fat. Even the 'Israeli paradox' paper argued the opposite of what it is usually cited for.",
      proponent_rebuttal:
        "Cohort studies of health professionals compare people who follow dietary advice with people who do not, and no questionnaire removes that. The randomised trials with mortality endpoints point the other way: the recovered Sydney Diet Heart data found higher all-cause mortality in the linoleic-acid group (hazard ratio 1.62), and the recovered Minnesota Coronary Experiment data found that lowering cholesterol with linoleic acid produced no mortality benefit, with greater cholesterol reduction associated with higher death risk in older participants. US soybean oil consumption rose more than 1,000-fold while obesity went from low single digits to over 30%. The new Dietary Guidelines themselves concede that 'more high-quality research is needed to determine which types of dietary fats best support long-term health.' Nobody has run the trial that would settle it.",
      crux: {
        id: "seed-oil-replacement-trial",
        title: "The Seed Oil Replacement Trial",
        question:
          "Does replacing seed oils specifically, not saturated fat in general, change heart and metabolic outcomes?",
        description:
          "The decisive test is a long randomised trial that swaps seed oils for other fats while holding calories and total fat constant, so the comparison is between fats rather than between diets. Everything available today is either observational or an old trial whose intervention fat contained trans fats.",
        methodology:
          "Randomise several thousand adults for five years to a seed-oil-based diet (soybean or canola as the main added fats, about 8% of calories from linoleic acid) or a seed-oil-free diet (olive oil and butter, about 2%), with total fat and calories matched. Measure cardiovascular events, metabolic syndrome, inflammatory markers and body composition, and verify compliance with red-blood-cell fatty-acid profiles.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A long randomized trial swapping seed oils for other fats such as olive oil or butter, with total fat and calories held equal, tracking heart attacks, diabetes and inflammation markers, alongside recovered data from older trials like the Minnesota Coronary Experiment.",
        },
        cost_to_verify:
          "$30-80M (5-year dietary intervention trial with hard cardiovascular endpoints)",
        falsification: {
          supporter_flip:
            "If a large trial swapping seed oils for olive oil and butter at matched calories and total fat produced equivalent or better cardiovascular and metabolic outcomes for the seed-oil group, in line with the biomarker pooling and the Cochrane review, the population-level harm story would be confounding rather than causation.",
          skeptic_flip:
            "If new trials of modern liquid seed oils, free of the trans-fat margarine used in the old ones, reproduced the higher mortality reported in the recovered Sydney and Minnesota data, the cohort studies favouring seed oils would lose their footing.",
          common_ground:
            "Both sides agree the ecological correlation is real but heavily confounded by simultaneous changes in calories, sugar, ultra-processed foods, and activity, and that no existing RCT has tested modern liquid seed oils against alternatives with calories and total fat held constant.",
          live_disagreement:
            "Whether replacing seed oils specifically, not saturated fat generally and not through trans-fat margarine, changes hard cardiovascular and metabolic outcomes.",
        },
      },
      evidence: [
        {
          id: "butter-vs-plant-oils-mortality",
          title:
            "221,054 US adults over 33 years: highest plant-oil intake, 16% lower mortality; highest butter intake, 15% higher (JAMA Internal Medicine, 2025)",
          description:
            "Three Harvard cohorts (Nurses' Health Study, Nurses' Health Study II and the Health Professionals Follow-up Study) followed 221,054 adults for up to 33 years, with diet assessed every four years and 50,932 deaths recorded. The highest quartile of butter intake was associated with 15% higher total mortality and the highest quartile of plant-based oil intake with 16% lower mortality. Canola, soybean and olive oil each showed lower mortality per 5 g/day. Substituting 10 g/day of butter with plant-based oils was associated with 17% lower total mortality and 17% lower cancer mortality.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Zhang, Chadaideh, Li et al., 'Butter and Plant-Based Oils Intake and Mortality', JAMA Internal Medicine 185(5):549-560 (May 2025)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40048719/",
          reasoning:
            "The largest and longest comparison of exactly the swap people are being told to make, and it points the other way. It is observational and uses food-frequency questionnaires: people who use plant oils differ in smoking, exercise and income, and statistical adjustment cannot remove all of that.",
        },
        {
          id: "la-reduces-cvd-meta-analysis",
          title:
            "Meta-analyses: each 5% of calories from linoleic acid, 9% fewer coronary events; cutting saturated fat cut events 17% (2014, 2020)",
          description:
            "Farvid et al.'s meta-analysis of 13 prospective cohorts (Circulation 2014; 310,602 participants, 12,479 coronary events) found each 5% of energy from linoleic acid associated with 9% lower coronary events (relative risk 0.91) and 13% lower coronary death (0.87); highest versus lowest intake showed 15% lower events and 21% lower coronary death. The Cochrane review of randomised trials of saturated-fat reduction (Hooper et al., 2020) found a 17% reduction in combined cardiovascular events (relative risk 0.83, 95% CI 0.70-0.98), with the benefit driven by replacing saturated fat with polyunsaturated fat.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Farvid et al., Circulation (2014); Hooper et al., Cochrane Database of Systematic Reviews (2020, CD011737)",
          sourceUrl: "https://www.ahajournals.org/doi/abs/10.1161/circulationaha.114.010236",
          reasoning:
            "Pooled cohorts plus a Cochrane review of randomised trials, the strongest tiers available. The cohorts cannot remove confounding, and the trials tested replacing saturated fat rather than modern liquid seed oils specifically, which is the gap the crux names.",
        },
        {
          id: "sydney-minnesota-trials",
          title:
            "Two recovered randomised trials found more deaths, not fewer, on linoleic-acid-rich diets (BMJ 2013, 2016)",
          description:
            "Ramsden et al.'s recovered-data analysis of the Sydney Diet Heart Study (BMJ 2013;346:e8707) found that replacing saturated fat with omega-6-rich safflower oil and safflower-oil margarine was associated with higher all-cause mortality (hazard ratio 1.62, 95% CI 1.00-2.64) and cardiovascular mortality (1.70, 1.03-2.80) in 458 men with prior coronary events. The recovered Minnesota Coronary Experiment data (BMJ 2016;353:i1246) found the linoleic-acid intervention lowered serum cholesterol but produced no mortality benefit, with greater cholesterol-lowering associated with higher death risk, especially in older participants.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Ramsden et al., BMJ (2013, Sydney Diet Heart Study) and BMJ (2016, Minnesota Coronary Experiment), recovered-data analyses",
          sourceUrl: "https://www.bmj.com/content/346/bmj.e8707",
          reasoning:
            "Genuine randomised trials with mortality endpoints, which is rare here. The Sydney intervention used safflower-oil margarine that probably contained trans fats, both are decades-old trials reanalysed from recovered records, and larger syntheses do not corroborate net harm.",
        },
        {
          id: "ramsden-headache-trial-2021",
          title:
            "Cutting linoleic acid to under 1.8% of calories removed four headache days a month in a randomised migraine trial (BMJ, 2021)",
          description:
            "Ramsden and colleagues randomised 182 adults with migraine on 5-20 headache days a month to three 16-week diets with omega-3 and linoleic acid controlled: raising EPA+DHA to 1.5 g/day with linoleic acid held near 7% of energy; the same with linoleic acid cut to 1.8% or less; or a control diet. Against the control, the high-omega-3 low-linoleic diet cut headache days per month by 4.0 and total headache hours per day by 1.7; the high-omega-3 diet alone cut headache days by 2.0. The difference between the two active diets, 2.0 fewer headache days a month, is attributed to lowering linoleic acid. The headache impact quality-of-life score did not improve significantly.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Ramsden et al., 'Dietary alteration of n-3 and n-6 fatty acids for headache reduction in adults with migraine', BMJ 374:n1448 (2021)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/34526307/",
          reasoning:
            "A controlled feeding trial in which lowering linoleic acid itself produced a measurable clinical benefit, with the oxylipin changes to go with it, which is the kind of evidence this side usually lacks. It is one condition, one 16-week trial, and the primary quality-of-life endpoint did not reach significance; migraine says nothing about heart disease or obesity.",
        },
        {
          id: "ecological-correlation-obesity",
          title:
            "Soybean oil use rose 1,000-fold while US obesity went from low single digits to over 30%",
          description:
            "Blasbalg et al. (AJCN 2011) estimated from USDA food-disappearance data that US per-capita soybean oil consumption rose more than 1,000-fold between 1909 and 1999. Over a broadly overlapping period, US obesity prevalence rose from low single digits to over 30% and type 2 diabetes several-fold. The correlation is real but coincides with large changes in total calories, sugar and refined carbohydrate, ultra-processed food and physical activity.",
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
            "Replicable from public data, and the weakest form of epidemiological evidence: dozens of variables moved together, so attribution to any one is speculation. It is the fact that made people ask the question.",
        },
        {
          id: "israel-paradox",
          title:
            "The 'Israeli paradox' paper argued high omega-6 came with more heart disease, not less",
          description:
            "Israel has among the world's highest per-capita omega-6 intakes and a high life expectancy of about 83 years, which seed-oil skeptics cite against population-level harm. The paper that coined the 'Israeli paradox' (Yam, Eliraz & Berry, Israel J. Med. Sci. 1996) argued the opposite: that Israel's very high omega-6 intake coincided with high rates of heart disease, diabetes, obesity and some cancers.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 6,
            directness: 2,
          },
          source:
            "Yam, Eliraz & Berry, Israel Journal of Medical Sciences 32:1134-1143 (1996); national life-expectancy statistics",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/8960090/",
          reasoning:
            "A double-edged ecological observation, kept because both sides cite it and both misread it. Life expectancy is confounded by health care, genetics and smoking, so it settles nothing either way.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: What should go in the pan (decision)
    // =========================================================================
    {
      id: "what-to-cook-with",
      title: "So What Should Go in the Pan?",
      short_summary:
        "The 2026 Dietary Guidelines put olive oil first and added that 'other options can include butter or beef tallow', while keeping saturated fat under 10% of calories. One tablespoon of butter or tallow uses roughly a third of that budget. The practical question is what someone avoiding seed oils eats instead.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Avoiding seed oils is a plan only if the replacement is better, and the most common replacements are saturated fats whose effect on blood cholesterol is well documented. The same Dietary Guidelines that list butter and beef tallow keep the limit that 'saturated fat consumption should not exceed 10% of total daily calories', and a single tablespoon of butter has about 7 g of it, roughly a third of a 2,000-calorie day's budget. Harvard's Frank Hu warned that mixed messages on red meat, butter and tallow 'may lead to confusion', raising saturated fat intake and with it LDL cholesterol. Most seed oil in a Western diet arrives inside fried and packaged food; someone who eats less of that has changed their diet in a way that was never about the oil.",
      proponent_rebuttal:
        "A person deciding tonight cannot wait for the trial that has never been run, and the official advice now concedes the uncertainty: the 2026 Guidelines say in the same breath that 'more high-quality research is needed to determine which types of dietary fats best support long-term health'. Swapping the frying oil in a home kitchen for olive oil, butter or tallow is cheap, reversible and keeps total fat where it was. Nor does it require eating more saturated fat: olive oil is the first recommendation in those guidelines and nobody disputes it. And the advice people were given for forty years, to replace animal fat with industrial vegetable oil, was itself issued on evidence thinner than its confidence suggested.",
      crux: {
        id: "replacement-fat-outcomes",
        title: "The Replacement Fat Test",
        question:
          "If you stop cooking with seed oils, what should you use, and does the swap make you healthier?",
        description:
          "Avoiding something is not a diet; the health effect depends entirely on what takes its place. The measurable question is what happens to blood lipids, weight and cardiovascular events when seed oils are replaced by olive oil, by butter or tallow, or by eating less fried food, each at matched calories.",
        methodology:
          "A randomised trial with four arms at matched calories and total fat: seed oils, olive oil, butter or tallow, and a reduced-fried-food pattern. Track LDL and apolipoprotein B, blood pressure, weight, insulin sensitivity and, in a long enough trial, cardiovascular events. Alongside it, track saturated fat intake and lipid panels in the population after the 2026 Guidelines added butter and tallow as cooking options.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A four-arm randomised feeding trial comparing seed oils, olive oil, butter or tallow and a reduced-fried-food diet at matched calories, reading LDL, apolipoprotein B, weight and insulin sensitivity, plus population lipid panels in the years after the 2026 Guidelines listed butter and tallow as options.",
        },
        cost_to_verify: "$5-20M (multi-arm feeding trial with lipid and metabolic endpoints)",
        falsification: {
          supporter_flip:
            "If swapping seed oils for butter or tallow at matched calories raised LDL and apolipoprotein B with no offsetting benefit, the practical advice to switch would fail even if seed oils themselves were suspect.",
          skeptic_flip:
            "If the swap left lipids and metabolic markers no worse, or if people who dropped seed oils did better than matched eaters who kept them, the warning that avoiding seed oils backfires through saturated fat would fail.",
          common_ground:
            "Both sides agree the 2025-2030 Dietary Guidelines keep saturated fat under 10% of daily calories, name olive oil first among cooking fats, and state that more high-quality research is needed on which fats support long-term health.",
          live_disagreement:
            "Whether replacing seed oils with butter or tallow helps, harms through saturated fat, or mostly changes nothing because the real exposure is fried and packaged food.",
        },
      },
      evidence: [
        {
          id: "dga-2026-tallow-option",
          title:
            "The 2026 Dietary Guidelines name olive oil first, add butter and beef tallow as options, and keep the 10% saturated-fat cap",
          description:
            "The Dietary Guidelines for Americans 2025-2030, published on 7 January 2026, advise: 'When cooking with or adding fats to meals, prioritize oils with essential fatty acids, such as olive oil. Other options can include butter or beef tallow.' They keep the long-standing limit that 'in general, saturated fat consumption should not exceed 10% of total daily calories', say that 'significantly limiting highly processed foods will help meet this goal', and add that 'more high-quality research is needed to determine which types of dietary fats best support long-term health'. Earlier editions had recommended canola, corn, olive, peanut, safflower, soybean and sunflower oils and discouraged butter.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 4,
          },
          source:
            "Dietary Guidelines for Americans, 2025-2030, US Departments of Health and Human Services and Agriculture (7 January 2026)",
          sourceUrl: "https://cdn.realfood.gov/DGA_508.pdf",
          reasoning:
            "Federal advice moved toward the seed-oil critics, and the document itself concedes the evidence on which fats are best is not settled, which is the honest part of this map. Guidelines are a policy judgment, not new data, and this edition was written by an administration that had campaigned on the question, so independence is low.",
        },
        {
          id: "saturated-fat-budget-swap",
          title:
            "One tablespoon of butter or beef tallow uses about a third of the day's saturated-fat allowance",
          description:
            "A tablespoon of butter contains about 7 g of saturated fat and a tablespoon of beef tallow about 6 g, against roughly 22 g in the 10%-of-calories limit for a 2,000-calorie diet. Harvard's Nutrition Source noted that once other sources are counted, a single tablespoon can put a person over the limit, and nutrition chair Frank Hu warned that 'the mixed messages surrounding saturated-fat-rich foods such as red meat, butter, and beef tallow may lead to confusion', raising saturated fat intake, LDL cholesterol and cardiovascular risk.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 5,
          },
          source:
            "Harvard T.H. Chan School of Public Health, The Nutrition Source, 'Dietary Guidelines for Americans 2025-2030' (9 January 2026)",
          sourceUrl:
            "https://nutritionsource.hsph.harvard.edu/2026/01/09/dietary-guidelines-for-americans-2025-2030/",
          reasoning:
            "Simple arithmetic on the guidelines' own limit, which is why the swap is not cost-free. It assumes the saturated-fat cap is right, which is itself disputed, and it is commentary from one school rather than a trial of the swap.",
        },
      ],
    },
  ],
} satisfies TopicInput;
