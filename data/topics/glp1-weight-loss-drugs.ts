export const glp1WeightLossDrugsData = {
  id: "glp1-weight-loss-drugs",
  title: "GLP-1 Drugs: Ozempic, Wegovy and Zepbound",
  question: "Are GLP-1 drugs like Ozempic a safe, lasting answer to obesity?",
  meta_claim:
    "GLP-1 drugs such as semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound) are a safe and lasting treatment for obesity that improves health, and are worth paying for widely.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: a Medicare demonstration has covered obesity
  // drugs since July 2026 (KFF); the November 2025 White House deal set a
  // $245 Medicare price and a $50 copay; Novo cuts Wegovy's list price to
  // $675 on 1 January 2027; the FDA asked in January 2026 for the
  // suicidal-ideation warning to come off Wegovy, Saxenda and Zepbound; the
  // BMJ's January 2026 meta-analysis is the newest review of regain.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In trials, people on the newest obesity drugs lost 14% to 20% of their body weight in about 72 weeks. But those who stop regain most of it within about a year, and in US health records about two in three patients without diabetes stopped within 12 months. Since July 2026 Medicare has been paying for them for obesity. The fight is over whether a drug many people may need for life is safe for decades, worth its price, and a real answer to obesity.",
    confidence: 86,
    source:
      "Aronne et al., SURMOUNT-5, NEJM (2025); Wilding et al., STEP 1 extension, Diabetes, Obesity and Metabolism (2022); Rodriguez et al., JAMA Network Open (2025); KFF (January 2026) on the Medicare demonstration",
    sourceUrl: "https://doi.org/10.1056/NEJMoa2416394",
  },
  simple_case: [
    "The answer bears on what doctors offer the roughly four in ten American adults with obesity, on tens of billions of dollars of Medicare and Medicaid spending, and on whether the shots replace diet and exercise or sit beside them.",
    "Most of the long trials were paid for by the two companies that sell the drugs, Novo Nordisk and Eli Lilly.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Beyond the scale (what the drugs do)
    // =========================================================================
    {
      id: "health-outcomes",
      title: "Beyond the Scale: Do They Make People Healthier?",
      short_summary:
        "The weight loss is not in doubt: 15% to 20% on average, more than any earlier drug. The open question is how far it turns into fewer heart attacks, less kidney failure and longer lives, and for whom. The outcome trials so far enrolled people who were already sick.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Weight is a stand-in; what matters is whether people live longer and healthier lives, and that evidence is narrower than the headlines. SELECT, the heart trial behind the claim that semaglutide protects the heart, enrolled only people who already had heart disease. Over about 40 months, 6.5% of them had a heart attack, stroke or heart death on the drug and 8.0% on placebo: about 1.5 fewer events per 100 people treated. One in six on semaglutide (16.6%) stopped because of side effects, twice the placebo rate. The kidney trial, FLOW, was in people with diabetes and kidney disease. No trial has yet shown that the tens of millions of otherwise healthy people with obesity who are now eligible will have fewer heart attacks or deaths. And the companies that sell the drugs paid for every one of these trials.",
      proponent_rebuttal:
        "These are hard outcomes, not just pounds. In SELECT, 17,604 adults with heart disease and obesity but no diabetes had 20% fewer heart attacks, strokes and heart deaths on semaglutide, the first obesity drug ever shown to do that. In FLOW, people with diabetes and kidney disease had 24% fewer major kidney events and 20% fewer deaths from any cause. The weight loss itself held for four years in SELECT and kept growing in head-to-head trials: tirzepatide cut 20.2% of body weight at 72 weeks, against 13.7% for semaglutide. Earlier diets and drugs never reached these numbers. Obesity drives diabetes, heart disease, fatty liver, sleep apnea and arthritis; a drug that removes a fifth of a person's weight attacks all of them at once. Demanding a mortality trial in every subgroup before treating would hold these drugs to a bar few medicines meet.",
      crux: {
        id: "hard-outcomes",
        title: "The Hard-Outcomes Test",
        question:
          "Do GLP-1 drugs prevent heart attacks, kidney failure and early death in people with obesity who are not yet sick?",
        description:
          "SELECT and FLOW showed fewer heart and kidney events in people who already had heart disease or diabetic kidney disease. Whether the same holds for the much larger group with obesity and no such disease decides how much of the drugs' promise is proven and how much is extrapolated from weight loss.",
        methodology:
          "Randomized outcome trials in people with obesity but without established heart disease or diabetes, with heart attacks, strokes, kidney failure and death as endpoints, followed for at least five years; plus large real-world cohorts comparing users with similar non-users, checked against those trials.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A randomized trial of tirzepatide or semaglutide in people with obesity but no heart disease or diabetes, reporting heart attacks, strokes, kidney failure and deaths over five years or more, with independent adjudication of events.",
        },
        cost_to_verify:
          "$500M-1B (a large cardiovascular outcomes trial; industry-funded trials of this kind are under way)",
        falsification: {
          supporter_flip:
            "If outcome trials in people with obesity but no heart disease found no reduction in heart attacks, strokes or deaths after five years, the case that the drugs make healthy people with obesity healthier would rest on weight loss alone.",
          skeptic_flip:
            "If those trials found reductions like SELECT's 20%, or FLOW's 20% fewer deaths from any cause, in people who were not yet sick, the objection that the benefit is proven only for people with heart or kidney disease would fail.",
          common_ground:
            "Both sides agree the drugs cause large weight loss, 14% to 20% on average in trials, and that SELECT showed fewer heart attacks, strokes and heart deaths in people who already had heart disease.",
          live_disagreement:
            "Whether that benefit extends to the much larger group with obesity and no heart disease, and how big it is in absolute terms for them.",
        },
      },
      evidence: [
        {
          id: "select-cardiovascular",
          title: "SELECT 2023: Semaglutide Cut Heart Attacks, Strokes and Heart Deaths by 20% in People With Heart Disease",
          description:
            "A double-blind trial of 17,604 adults aged 45 or older with existing heart disease, a BMI of 27 or more and no diabetes. Over a mean 39.8 months, a heart attack, stroke or heart death occurred in 6.5% of patients on semaglutide 2.4 mg and 8.0% on placebo (hazard ratio 0.80). Side effects led 16.6% on semaglutide to stop the drug for good, against 8.2% on placebo.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source:
            "Lincoff et al., 'Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes', New England Journal of Medicine (2023); funded by Novo Nordisk",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2307563",
          reasoning:
            "A large, well-run outcome trial: the strongest evidence that the drugs improve health, not just weight. The absolute difference is 1.5 events per 100 people over about three years, the population already had heart disease, and Novo Nordisk funded it.",
        },
        {
          id: "flow-kidney-2024",
          title: "FLOW 2024: Semaglutide Cut Major Kidney Events by 24% and Deaths by 20% in Diabetic Kidney Disease",
          description:
            "In 3,533 people with type 2 diabetes and chronic kidney disease, weekly semaglutide 1.0 mg lowered the risk of kidney failure, a halving of kidney function, or death from kidney or heart causes by 24% over a median 3.4 years (331 against 410 first events). Death from any cause was 20% lower. The trial stopped early for benefit.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "Perkovic et al., 'Effects of Semaglutide on Chronic Kidney Disease in Patients with Type 2 Diabetes', New England Journal of Medicine (2024); funded by Novo Nordisk",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2403347",
          reasoning:
            "A hard-outcome result, including fewer deaths. Directness to obesity is limited: everyone had diabetes and kidney disease, and the dose was the diabetes dose, not the obesity dose.",
        },
        {
          id: "surmount-5-head-to-head",
          title: "SURMOUNT-5 2025: Tirzepatide Cut 20.2% of Body Weight in 72 Weeks, Semaglutide 13.7%",
          description:
            "In the first head-to-head trial of the two leading drugs, 751 adults with obesity but no diabetes took the highest tolerated dose of tirzepatide or semaglutide for 72 weeks. Weight fell 20.2% on tirzepatide and 13.7% on semaglutide; waists shrank 18.4 cm and 13.0 cm. The most common side effects in both groups were gastrointestinal, mostly mild to moderate and during dose increases.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 8,
            directness: 6,
          },
          source:
            "Aronne et al., 'Tirzepatide as Compared with Semaglutide for the Treatment of Obesity', New England Journal of Medicine (2025); funded by Eli Lilly",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2416394",
          reasoning:
            "Confirms weight loss of a size no earlier drug reached. The trial was open-label and paid for by the maker of the winning drug, and weight loss is a stand-in: it does not by itself show fewer heart attacks or deaths.",
        },
        {
          id: "step-1-trial",
          title: "STEP 1 2021: Semaglutide 14.9% Weight Loss Over 68 Weeks, Against 2.4% on Placebo",
          description:
            "The trial that led to Wegovy's approval enrolled 1,961 adults with a BMI of 30 or more, or 27 with a weight-related condition, and no diabetes. On weekly semaglutide 2.4 mg plus lifestyle advice, they lost 14.9% of body weight over 68 weeks, against 2.4% on placebo. Gastrointestinal side effects (nausea, diarrhea, vomiting) were reported by 74% on semaglutide, mostly mild to moderate and fading over time.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source:
            "Wilding et al., 'Once-Weekly Semaglutide in Adults with Overweight or Obesity', New England Journal of Medicine (2021); funded by Novo Nordisk",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183",
          reasoning:
            "The benchmark weight-loss result, replicated across the STEP program. Directness is moderate because the question is health, not weight, and the trial ran 68 weeks.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Long-term safety (what could go wrong)
    // =========================================================================
    {
      id: "clinical-efficacy-safety",
      title: "Safe for Decades? What We Know and Don't",
      short_summary:
        "Drugs in this class have been prescribed for diabetes since 2005, and the FDA found no link to suicidal thoughts. But people now take far higher doses for obesity, and may take them for life. Muscle loss, a rare eye condition and gut problems are known; what decades of use bring is not.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Tens of millions of people may take these drugs for decades on the strength of trials that ran two to four years. The known harms are real. In the STEP 1 body-scan substudy, lean mass fell 9.7% while fat fell 19.3%, so roughly a third of the weight lost was not fat, which matters for older people at risk of frailty. In 2025 Europe's drug regulator recommended adding a rare cause of sudden vision loss, NAION, to semaglutide's label. Most patients have nausea or diarrhea at first, and the labels warn of pancreatitis, gallbladder disease and, from rodent studies, thyroid tumors. Rare harms surface only after years and millions of users, as they did for other blockbuster drugs. We do not know what 20 years of suppressing appetite does, and the people taking the drugs now are the ones who will find out.",
      proponent_rebuttal:
        "This is not a new drug class. Exenatide was approved for diabetes in 2005 and liraglutide in 2010, so there are two decades and millions of patient-years of safety data. When reports of suicidal thoughts appeared, the FDA reviewed 91 placebo-controlled trials with 107,910 patients and a claims study of 2.2 million new users, found no increased risk, and in January 2026 asked for the warning to come off Wegovy, Saxenda and Zepbound. Europe classes NAION as 'very rare': up to 1 in 10,000 people. Lean mass falls with any large weight loss, from dieting or surgery, and in STEP 1 the share of the body that was lean actually rose. In SELECT, serious adverse events were less common on semaglutide than on placebo at every BMI level over four years. Untreated obesity, set against those known risks, is the larger danger.",
      crux: {
        id: "long-term-safety-profile",
        title: "The Long-Term Safety Test",
        question:
          "Does ten or more years of continuous use stay net-beneficial, or reveal cumulative risks?",
        description:
          "Trials of the obesity doses have run up to about four years. Whether risks such as muscle and bone loss, pancreatic or thyroid disease, or eye damage accumulate over decades, enough to rival the harms of untreated obesity, is what long follow-up has to show.",
        methodology:
          "A ten-year cohort of GLP-1 users at obesity doses against matched non-users, tracking deaths, heart events, thyroid and pancreatic cancer, gut complications, fractures, eye disease and body composition by DXA scan, with an arm followed after stopping; cross-checked against FDA and European adverse-event reporting.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A ten-year cohort of GLP-1 users against matched controls, tracking deaths, heart events, thyroid and pancreatic cancer, gut complications and lean mass, with an arm followed for three years after stopping.",
        },
        cost_to_verify:
          "$50-100M (large prospective cohort with 10-year follow-up and imaging)",
        falsification: {
          supporter_flip:
            "If ten-year data showed cumulative harms, such as more fractures and frailty from lost muscle and bone, or more pancreatic or thyroid cancer, on a scale that rivals the harms of untreated obesity, short-term trial results would not justify lifelong use.",
          skeptic_flip:
            "If long follow-up kept matching the record so far, with SELECT's four years of fewer serious adverse events than placebo and the FDA's review of 107,910 trial patients finding no psychiatric signal, unknown long-term risk would weigh less against the known harm of obesity.",
          common_ground:
            "Both sides agree trials of obesity doses have run only up to about four years, that much of the early side-effect burden is gastrointestinal, and that some lean mass is lost along with fat.",
          live_disagreement:
            "Whether ten or more years of continuous use stays net-beneficial, which only long cohorts can answer, and how much to weigh rare harms not yet seen against the known harms of obesity.",
        },
      },
      evidence: [
        {
          id: "fda-suicidal-ideation-2026",
          title: "FDA 2026: No Suicide Risk in 91 Trials and 107,910 Patients; Warning to Come Off Wegovy and Zepbound",
          description:
            "On 13 January 2026 the FDA asked manufacturers to remove the suicidal ideation and behavior warning from the labels of Saxenda, Wegovy and Zepbound. Its meta-analysis of 91 placebo-controlled trials (107,910 patients) 'did not show an increased risk' and found no rise in anxiety or depression. A claims-based study of 2,243,138 new users found no increased risk of intentional self-harm compared with users of another diabetes drug class.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "FDA Drug Safety Communication, 'FDA Requests Removal of Suicidal Behavior and Ideation Warning from GLP-1 RA labeling' (13 January 2026)",
          sourceUrl:
            "https://www.fda.gov/drugs/drug-safety-communications/fda-requests-removal-suicidal-behavior-and-ideation-warning-glucagon-peptide-1-receptor-agonist-glp",
          reasoning:
            "The regulator's own large review closes one widely feared risk. It covers one harm only, and the trials it pooled were mostly short.",
        },
        {
          id: "muscle-mass-loss",
          title: "STEP 1 Body Scans: Lean Mass Fell 9.7% as Fat Fell 19.3%",
          description:
            "In a DXA body-scan substudy of 140 STEP 1 participants, those on semaglutide lost 15.0% of body weight over 68 weeks. Total fat mass fell 19.3% and visceral fat 27.4%; total lean mass fell 9.7%. Because fat fell faster, the proportion of the body that was lean rose by 3.0 percentage points.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "Wilding et al., 'Impact of Semaglutide on Body Composition in Adults With Overweight or Obesity: Exploratory Analysis of the STEP 1 Study', Journal of the Endocrine Society 5 (Supplement 1) (2021)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8089287/",
          reasoning:
            "Real lean-mass loss, which matters most for older people. It cuts both ways: the body's lean share improved, lean mass includes water and organs as well as muscle, and any large weight loss costs some lean tissue. A small, exploratory substudy of an industry trial.",
        },
        {
          id: "ema-naion-2025",
          title: "EMA 2025: Rare Optic-Nerve Damage (NAION) Added to Semaglutide's Label as 'Very Rare'",
          description:
            "After reviewing all available data, the European Medicines Agency's safety committee recommended on 6 June 2025 that semaglutide's product information list non-arteritic anterior ischemic optic neuropathy (NAION), a cause of sudden vision loss, as a side effect with a frequency of 'very rare', meaning it may affect up to 1 in 10,000 people. Patients with sudden loss of vision should contact their doctor without delay, and treatment should stop if NAION is confirmed.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "European Medicines Agency, 'Meeting highlights from the Pharmacovigilance Risk Assessment Committee (PRAC) 2-5 June 2025' (6 June 2025)",
          sourceUrl:
            "https://www.ema.europa.eu/en/news/meeting-highlights-pharmacovigilance-risk-assessment-committee-prac-2-5-june-2025",
          reasoning:
            "A regulator confirming a harm that trials missed: the pattern skeptics warn about. The risk is very rare, and it was found after millions of patient-years, which also shows surveillance working.",
        },
        {
          id: "select-four-year-safety",
          title: "SELECT 2024: Weight Loss Held for Four Years, With Fewer Serious Adverse Events Than Placebo",
          description:
            "A prespecified analysis of SELECT found weight loss on semaglutide continued for 65 weeks and held for up to four years: at 208 weeks weight was down 10.2%, against 1.5% on placebo. In every BMI group, serious adverse events were less frequent on semaglutide than on placebo (for example 43.23 against 50.48 per 100 years of observation in people with a BMI under 30). Stopping the drug was more common on semaglutide.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "Ryan et al., 'Long-term weight loss effects of semaglutide in obesity without diabetes in the SELECT trial', Nature Medicine 30:2049-2057 (2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11271387/",
          reasoning:
            "The longest randomized safety record at an obesity dose. Four years is still short of lifelong use, the population had heart disease, and the authors include Novo Nordisk staff.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: A drug for life? (lasting)
    // =========================================================================
    {
      id: "medicalization-root-causes",
      title: "A Drug for Life? What Happens When People Stop",
      short_summary:
        "Stop the drug and the weight comes back: about two-thirds within a year in STEP 1, and faster than after diet programs. Most real-world patients without diabetes stop within a year. Defenders say obesity is chronic, like high blood pressure, and the drugs work for as long as people take them; critics say a treatment most people quit is not a lasting answer.",
      icon_name: "Target" as const,
      skeptic_premise:
        "A lasting answer should last. One year after stopping semaglutide, STEP 1 participants had regained two-thirds of what they lost, and their blood pressure and blood sugar gains largely reversed. Switched to placebo in SURMOUNT-4, people regained 14% of their body weight in a year. A 2026 BMJ review of 37 studies found weight returns at about 0.4 kg a month after stopping, faster than after diet programs, with heart-risk markers back to baseline within about 1.4 years. In US health records, 64.8% of patients without diabetes stopped within a year, often because of side effects or cost. A drug that works only while taken, and that most people stop, is a subscription, not a cure. Diet, activity and food policy have to carry the load anyway.",
      proponent_rebuttal:
        "Nobody calls blood-pressure pills a failure because pressure rises when you stop them. Obesity is a chronic disease, and in SURMOUNT-4 people who kept taking tirzepatide lost a further 5.5% and ended 25.3% lighter after 88 weeks; 89.5% kept at least four-fifths of their loss. In SELECT, weight stayed down for four years on the drug. The alternative has been tested: Look AHEAD, the largest lifestyle trial, put 5,145 people with diabetes through intensive diet and exercise for nearly ten years, got 6.0% weight loss against 3.5%, and found no reduction in heart attacks or strokes. People stop the drugs mostly because of cost and coverage, and those are falling. Lifestyle change helps, and the drugs are given alongside it; they do not replace it.",
      crux: {
        id: "lifestyle-vs-pharmacotherapy",
        title: "The Lifelong-Use Test",
        question:
          "Can people keep the weight off without staying on the drug for life?",
        description:
          "If benefits vanish when people stop, and most people stop, the drugs are a lasting answer only for those who stay on them for good. Tapering to lower doses, switching to pills, or pairing the drugs with intensive lifestyle support might let people keep the loss with less drug; whether they do is untested at scale.",
        methodology:
          "Randomized trials comparing continued full dose, tapered maintenance doses, switching to an oral drug, and stopping with intensive lifestyle support, followed for at least three years; plus real-world data on how long people stay on treatment once cost barriers fall.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Three-year randomized trials comparing full-dose maintenance, lower maintenance doses, oral drugs and stopping with intensive lifestyle support, measuring weight, heart-risk markers and how many people stay on treatment.",
        },
        cost_to_verify:
          "$30-50M (multi-arm maintenance trial over three years)",
        falsification: {
          supporter_flip:
            "If maintenance trials found that even low doses or intensive lifestyle support after stopping could not hold the weight off, and real-world patients kept quitting within a year even with cheap coverage, the drugs would be a lasting answer only for the minority who stay on them indefinitely.",
          skeptic_flip:
            "If lower maintenance doses or pills held most of the loss for years, and people stayed on treatment once cost was no barrier, the objection that the benefit vanishes when people stop would lose most of its force.",
          common_ground:
            "Both sides agree that most of the weight returns within about a year of stopping, that people who stay on the drug keep the loss for at least four years, and that combining the drugs with diet and exercise beats the drug alone.",
          live_disagreement:
            "Whether a treatment that works only while taken, and that most people stop within a year, counts as a lasting answer, or as lifelong care for a chronic disease like any other.",
        },
      },
      evidence: [
        {
          id: "weight-regain-discontinuation",
          title: "STEP 1 Extension: Two-Thirds of Lost Weight Back One Year After Stopping",
          description:
            "When STEP 1 ended at week 68, all treatment, including lifestyle support, stopped. In the 327 participants followed for another year, those who had been on semaglutide had lost 17.3% of body weight by week 68 and regained 11.6 percentage points by week 120, a net loss of 5.6%. Most heart-risk improvements reverted toward baseline.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 9,
          },
          source:
            "Wilding et al., 'Weight regain and cardiometabolic effects after withdrawal of semaglutide: The STEP 1 trial extension', Diabetes, Obesity and Metabolism 24:1553-1564 (2022)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9542252/",
          reasoning:
            "Clear evidence that the benefit depends on staying on the drug. The analyses were exploratory, and lifestyle support stopped at the same time, so it shows what happens with no support at all. The authors read it as confirming that obesity is chronic.",
        },
        {
          id: "surmount-4-withdrawal",
          title: "SURMOUNT-4 2024: Switched to Placebo, People Regained 14% of Body Weight; Those Who Stayed On Lost 5.5% More",
          description:
            "After 36 weeks on tirzepatide (average loss 20.9%), 670 adults were randomized to continue or switch to placebo for 52 weeks. Those switched regained 14.0% of body weight; those who continued lost a further 5.5%. At week 88, 89.5% on tirzepatide had kept at least 80% of their loss, against 16.6% on placebo. Overall loss from the start was 25.3% on tirzepatide and 9.9% on placebo.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source:
            "Aronne et al., 'Continued Treatment With Tirzepatide for Maintenance of Weight Reduction in Adults With Obesity: The SURMOUNT-4 Randomized Clinical Trial', JAMA 331(1):38-48 (2024); funded by Eli Lilly",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10714284/",
          reasoning:
            "Shows both halves of the argument: staying on works and stopping reverses it. It counts for the drug as a long-term treatment and against it as a short course. Only people who tolerated 36 weeks of tirzepatide were randomized, and Lilly funded the trial.",
        },
        {
          id: "bmj-regain-2026",
          title: "BMJ 2026: After Stopping, Weight Returns at About 0.4 kg a Month, Faster Than After Diet Programs",
          description:
            "A systematic review of 37 studies (9,341 participants) by Oxford researchers found that after weight-loss drugs were stopped, weight came back at an average 0.4 kg a month, and all heart-risk markers were projected to return to baseline within 1.4 years. Regain was faster after drugs than after behavioral weight programs, by 0.3 kg a month, regardless of how much weight was lost. The authors urged 'caution in short term use of these drugs without a more comprehensive approach to weight management.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "West et al., 'Weight regain after cessation of medication for weight management: systematic review and meta-analysis', BMJ (January 2026)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12776922/",
          reasoning:
            "Independent, recent and on point. Average follow-up after stopping was 32 weeks, so the long-run picture is projected, and it pools older drugs with the newer ones.",
        },
        {
          id: "real-world-discontinuation",
          title: "JAMA Network Open 2025: 64.8% of Patients Without Diabetes Stopped Within a Year",
          description:
            "In electronic health records of 125,474 US adults with overweight or obesity who started liraglutide, semaglutide or tirzepatide between 2018 and 2023, 64.8% of those without type 2 diabetes stopped within a year, against 46.5% of those with diabetes. Moderate or severe gut side effects raised the chance of stopping; more weight loss and, among patients with diabetes, higher income lowered it. Among those without diabetes who stopped, 36.3% restarted within a year.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Rodriguez et al., 'Discontinuation and Reinitiation of Dual-Labeled GLP-1 Receptor Agonists Among US Adults With Overweight or Obesity', JAMA Network Open 8(1):e2457349 (2025)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11786232/",
          reasoning:
            "Real-world behavior, not trial behavior. Much of the period predates cheaper cash prices and Medicare coverage, and the drugs were in shortage for part of it, so stopping may fall as cost barriers do.",
        },
        {
          id: "lifestyle-intervention-failure",
          title: "Look AHEAD 2013: Ten Years of Intensive Diet and Exercise, 6.0% Weight Loss, No Fewer Heart Attacks",
          description:
            "In 16 US centers, 5,145 overweight or obese adults with type 2 diabetes were randomized to an intensive lifestyle program of reduced calories and more activity, or to diabetes education. Weight loss was 8.6% against 0.7% at one year and 6.0% against 3.5% at the end. The trial stopped for futility at a median 9.6 years: heart deaths, heart attacks, strokes and angina hospitalizations were no lower (hazard ratio 0.95).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "Look AHEAD Research Group, 'Cardiovascular effects of intensive lifestyle intervention in type 2 diabetes', New England Journal of Medicine 369:145-154 (2013)",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa1212914",
          reasoning:
            "The largest test of the lifestyle alternative, publicly funded, and it did not produce drug-sized or durable weight loss. It was in people with diabetes, and the lifestyle group did gain on blood sugar and fitness, so it does not show lifestyle change is worthless.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Worth the price? (what to do)
    // =========================================================================
    {
      id: "access-equity-cost",
      title: "Worth the Price, and Who Pays?",
      short_summary:
        "Prices are falling fast: a November 2025 White House deal set Medicare's price at $245 a month, and Wegovy's list price drops to $675 in January 2027. A 2025 lifetime model still found the drugs far from cost-effective at the net prices of the time. With Medicare paying since July 2026 and several states dropping Medicaid coverage, the fight is over whether wide coverage pays for itself.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Even after the discounts, paying for these drugs for everyone eligible would be one of the largest new costs in American health care. Medicaid's gross spending on GLP-1s rose from about $1 billion in 2019 to almost $9 billion in 2024, and four states, California, New Hampshire, Pennsylvania and South Carolina, have dropped coverage for obesity. A 2025 lifetime model in JAMA Health Forum found that, at the net prices of the time, semaglutide cost $467,676 and tirzepatide $197,023 per quality-adjusted life year, far above the usual $100,000 bar. A Health Affairs analysis put the extra cost of Medicare coverage in the tens of billions of dollars over ten years. Because most people stop within a year and regain the weight, much of the spending buys benefits that disappear. Money spent this way is not spent on prevention, food policy or other care.",
      proponent_rebuttal:
        "The price is collapsing, and the cost of doing nothing is enormous. Obesity cost the US about $173 billion in medical spending in 2019, $1,861 more a year for each adult with obesity than one at a healthy weight. Under the November 2025 White House deal, Medicare pays $245 a month for Ozempic, Wegovy, Mounjaro and Zepbound, enrollees pay $50, and cash prices fell to about $350. Novo Nordisk cuts Wegovy's list price by about 50%, to $675, on 1 January 2027. The 2025 model found tirzepatide would need only a 30.5% further discount from its net price to clear $100,000 per year of healthy life, and the Medicare price set since then is far below the list prices of 2025. Obesity is most common among Black (49.9%) and Hispanic (45.6%) adults, so restricting coverage rations the most effective treatment away from the people who need it most.",
      crux: {
        id: "cost-effectiveness-analysis",
        title: "The Cost-Effectiveness Test",
        question:
          "Do prevented hospitalizations and illnesses offset the drugs' cost over ten years?",
        description:
          "If broad coverage at today's lower prices prevents enough diabetes, heart disease, joint replacements and hospital stays to offset much of the drug bill over a decade, wide coverage is a good buy. If spending rises without proportionate health gains, partly because most people stop, the money would do more elsewhere.",
        methodology:
          "Compare total spending (drugs, hospital stays, complications) and health outcomes for matched patients who start GLP-1 drugs and patients who do not, over five to ten years, using Medicare demonstration and insurer claims at the prices actually paid after rebates; recompute cost per quality-adjusted life year at those prices.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Long-run claims data from insurers and Medicare comparing total spending, hospital stays and complications for matched patients who stay on GLP-1 drugs and patients who do not, over five to ten years, using the price actually paid after rebates.",
        },
        cost_to_verify:
          "$5-10M (health economics study using multi-year claims data)",
        falsification: {
          supporter_flip:
            "If Medicare and insurer claims showed total spending rising over a decade at the new prices without proportionate drops in diabetes, heart disease and hospital stays, partly because most patients stop, the case for covering everyone eligible would fail.",
          skeptic_flip:
            "If claims data at the $245 Medicare price showed prevented diabetes, heart disease and joint disease offsetting most of the drug bill, or a cost per year of healthy life under $100,000, the 'too expensive' objection would give way.",
          common_ground:
            "Both sides agree prices have fallen sharply since 2025 and that, applied to tens of millions of people, even the lower prices add up to tens of billions of dollars.",
          live_disagreement:
            "Whether the prevented illness offsets the drug bill over ten years at the new prices, and who should pay for people who need the drugs but cannot afford them.",
        },
      },
      evidence: [
        {
          id: "competition-price-trends",
          title: "White House Deal, November 2025: Medicare Pays $245 a Month, Enrollees $50; Cash Price About $350",
          description:
            "Under agreements with Novo Nordisk and Eli Lilly announced on 6 November 2025, 'the Medicare prices of Ozempic, Wegovy, Mounjaro, and Zepbound will be $245,' and Medicare beneficiaries will pay a $50 monthly copay. On the TrumpRx cash site, Ozempic falls from $1,000 to $350 a month, Wegovy from $1,350 to $350, and Zepbound from $1,086 to an average of $346. KFF reports that a short-term demonstration lets Medicare Part D enrollees get obesity drugs from July 2026. Separately, Novo Nordisk will cut the list price of Wegovy, Ozempic and Rybelsus to $675 a month from 1 January 2027, reductions of about 50% for Wegovy and 35% for Ozempic.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 7,
          },
          source:
            "White House fact sheet (6 November 2025); KFF, 'Medicaid Coverage of and Spending on GLP-1s' (16 January 2026); Novo Nordisk (24 February 2026)",
          sourceUrl:
            "https://www.whitehouse.gov/fact-sheets/2025/11/fact-sheet-president-donald-j-trump-announces-major-developments-in-bringing-most-favored-nation-pricing-to-american-patients/",
          reasoning:
            "The price drop is real and large, which changes every cost-effectiveness estimate made before it. The figures come from the government and the manufacturer, net prices to insurers are not public, and the Medicare demonstration is temporary.",
        },
        {
          id: "cost-effectiveness-2025",
          title: "JAMA Health Forum 2025: At Net Prices of the Time, $197,023 (Tirzepatide) and $467,676 (Semaglutide) per Year of Healthy Life",
          description:
            "A lifetime simulation of 126 million eligible US adults found that per 100,000 people treated, tirzepatide would avert 20,854 cases of diabetes and 10,655 of heart disease, and semaglutide 19,211 and 8,263. But at their then net prices the cost per quality-adjusted life year was $197,023 for tirzepatide and $467,676 for semaglutide. To reach $100,000 per QALY, prices would need further discounts of 30.5% for tirzepatide and 81.9% for semaglutide.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Hwang, Laiteerapong, Huang & Kim, 'Lifetime Health Effects and Cost-Effectiveness of Tirzepatide and Semaglutide in US Adults', JAMA Health Forum 6(3):e245586 (2025)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11909610/",
          reasoning:
            "Independent and directly on the crux. It is a model, sensitive to assumptions about how long people stay on the drug, and it predates the November 2025 price deal, which may close much of the gap for tirzepatide.",
        },
        {
          id: "insurance-coverage-gaps",
          title: "KFF, January 2026: Medicaid GLP-1 Spending Hit Almost $9 Billion; Four States Dropped Obesity Coverage",
          description:
            "Gross Medicaid spending on GLP-1 drugs, before rebates, rose from about $1 billion in 2019 to almost $9 billion in 2024, and prescriptions from about 1 million to over 8 million. As of January 2026, 13 state Medicaid programs covered GLP-1s for obesity under fee-for-service, down from 16 in October 2025; California, New Hampshire, Pennsylvania and South Carolina have eliminated coverage. Federal law still bars Medicare from covering drugs used solely for weight loss outside the temporary demonstration.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "KFF, 'Medicaid Coverage of and Spending on GLP-1s' (16 January 2026)",
          sourceUrl: "https://www.kff.org/medicaid/medicaid-coverage-of-and-spending-on-glp-1s/",
          reasoning:
            "Shows budgets straining before broad coverage arrived: states are pulling back. The spending figures are gross, before rebates, and include use for diabetes.",
        },
        {
          id: "obesity-healthcare-costs",
          title: "CDC: Obesity Cost $173 Billion in Medical Spending in 2019, $1,861 More per Adult",
          description:
            "The CDC estimates obesity accounted for nearly $173 billion in US medical spending in 2019. Adults with obesity had annual medical costs $1,861 higher than adults at a healthy weight, and $3,097 higher for severe obesity. Adult obesity prevalence was 41.9% in 2017 to March 2020, highest among non-Hispanic Black (49.9%) and Hispanic (45.6%) adults.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "CDC, 'Adult Obesity Facts' (updated 14 May 2024)",
          sourceUrl: "https://www.cdc.gov/obesity/adult-obesity-facts/index.html",
          reasoning:
            "Sizes the problem the drugs address. It does not show the drugs recover those costs: averted spending accrues slowly, and only while people stay on treatment.",
        },
        {
          id: "medicare-coverage-cost",
          title: "Health Affairs 2024: Medicare Coverage Could Add $3.1 to $6.1 Billion a Year",
          description:
            "Using Medicare claims and real-world adherence, the authors estimated that if anti-obesity drugs had been covered in 2025 and 5% or 10% of newly eligible patients were prescribed one, Part D costs would rise by $3.1 billion or $6.1 billion a year. They concluded the policy would likely raise Medicare costs 'by the low to middle tens of billions of dollars over ten years,' though costs could fall by as much as 62.5% as the drugs gain approval for other conditions.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source:
            "Ippolito & Levy, 'Expanding Medicare Coverage Of Anti-Obesity Medicines Could Increase Annual Spending By $3.1 Billion To $6.1 Billion', Health Affairs 43(9) (2024)",
          sourceUrl: "https://doi.org/10.1377/hlthaff.2024.00356",
          reasoning:
            "An independent budget estimate. It used prices from before the November 2025 deal, and its own sensitivity range shows how much new approvals for heart, kidney and sleep apnea uses shift the marginal cost.",
        },
        {
          id: "off-label-prescribing-rates",
          title: "Epic 2026: GLP-1 Prescriptions Rose From 1,900 to 9,000 per 100,000 Adults as Obesity Fell From 42.3% to 40.7%",
          description:
            "In Epic's nationwide health-record data, GLP-1 prescriptions rose from about 1,900 to 9,000 per 100,000 adult patients between the second quarter of 2021 and the first quarter of 2026. Over the same period the share of adults with obesity fell from 42.3% to 40.7%, and the share at a healthy BMI rose from 25.1% to 25.6%.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Epic Research, 'GLP-1 Prescriptions Quadruple Since 2021, Alongside Decline in Obesity' (21 May 2026)",
          sourceUrl:
            "https://www.epic.com/epic/post/glp-1-prescriptions-quadruple-since-2021-alongside-decline-in-obesity/",
          reasoning:
            "An early sign that the drugs may be bending the national curve. It is a correlation in patients who use Epic-based health systems, not a population survey, and it cannot show the drugs caused the decline or what share of prescriptions went to people without obesity.",
        },
      ],
    },
  ],
  aliases: [
    "GLP-1 Weight Loss Drugs",
    "Is Ozempic safe long term?",
    "Should Medicare pay for Wegovy and Zepbound?",
    "Do you have to take Ozempic forever?",
  ],
  references: [
    {
      title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1) - NEJM (2021)",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183",
    },
    {
      title: "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT) - NEJM (2023)",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2307563",
    },
    {
      title: "Tirzepatide as Compared with Semaglutide for the Treatment of Obesity (SURMOUNT-5) - NEJM (2025)",
      url: "https://doi.org/10.1056/NEJMoa2416394",
    },
    {
      title: "Weight regain after cessation of medication for weight management - BMJ (2026)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12776922/",
    },
    {
      title: "FDA Requests Removal of Suicidal Behavior and Ideation Warning from GLP-1 RA labeling (January 2026)",
      url: "https://www.fda.gov/drugs/drug-safety-communications/fda-requests-removal-suicidal-behavior-and-ideation-warning-glucagon-peptide-1-receptor-agonist-glp",
    },
    {
      title: "Medicaid Coverage of and Spending on GLP-1s - KFF (January 2026)",
      url: "https://www.kff.org/medicaid/medicaid-coverage-of-and-spending-on-glp-1s/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Do you have to take GLP-1 drugs for life?",
      content:
        "Stop semaglutide and about two-thirds of the lost weight returns within a year; switched to placebo in SURMOUNT-4, people regained 14% of their body weight. People who stay on keep the loss for at least four years. Is that a lifelong treatment for a chronic disease, like blood-pressure pills, or a sign the drugs do not address what drives weight gain?",
    },
    {
      id: "q2",
      title: "Should Medicare and Medicaid pay for GLP-1 drugs for obesity?",
      content:
        "Medicare has paid for obesity drugs under a temporary demonstration since July 2026, at a $245 negotiated price and a $50 copay, while four states have dropped Medicaid coverage as spending neared $9 billion a year. A 2025 model found the drugs far from cost-effective at the net prices of the time. Is wide coverage a good investment at the new prices, or a cost that crowds out other care?",
    },
    {
      id: "q3",
      title: "Do GLP-1 drugs help healthy people with obesity live longer?",
      content:
        "SELECT showed 20% fewer heart attacks, strokes and heart deaths, but only in people who already had heart disease. No trial has yet reported hard outcomes in people with obesity and no such disease. Should doctors treat that larger group on the strength of weight loss, or wait for outcome trials?",
    },
  ],
};
