export const aiReplacingDoctorsData = {
  id: "ai-replacing-doctors",
  title: "Will AI Replace Doctors Within a Decade?",
  question: "Will AI replace doctors within a decade?",
  aliases: [
    "Is AI better than doctors at diagnosis?",
    "Can I trust ChatGPT for medical advice?",
  ],
  meta_claim:
    "AI systems will be capable of diagnosing and treating most medical conditions better than human physicians within 10 years, fundamentally disrupting healthcare.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: OpenAI says 230M+ people a week ask ChatGPT health
  // questions (January 2026); Microsoft's MAI-DxO scored 80-85.5% on 304 NEJM
  // cases against 20% for generalist physicians (June 2025); two large
  // screening studies (MASAI, PRAIM, 2025) found AI-supported mammography
  // reading caught more cancers; the FDA's AI device list (current as of
  // 4 September 2026) holds about 1,600 devices, three in four in radiology.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "More than 230 million people a week ask ChatGPT about their health, OpenAI said in January 2026. In a Microsoft test on 304 hard cases from the New England Journal of Medicine, its AI system reached the right diagnosis 80% of the time, four times the average of the generalist doctors tested. Yet of the roughly 1,600 AI medical devices the FDA has authorized, three in four read medical images, and the first cleared to give a result with no doctor reviewing it, an eye-disease screener, dates from 2018. The fight is over whether wins on test cases carry over to real patients, and whether law and medicine will let AI work without a doctor within ten years.",
    confidence: 82,
    source:
      "OpenAI, 'Introducing ChatGPT Health' (7 January 2026); Nori et al., 'Sequential Diagnosis with Language Models', arXiv:2506.22405 (June 2025); FDA, List of AI-Enabled Medical Devices (current as of 4 September 2026)",
    sourceUrl: "https://arxiv.org/abs/2506.22405",
  },
  simple_case: [
    "The answer bears on who reads your scans and answers your questions at 2 a.m., on how many doctors medical schools train, and on who is liable when a machine gets a diagnosis wrong.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "WHO — Ethics and Governance of AI for Health (Guidance, 2021)",
      url: "https://www.who.int/publications/i/item/9789240029200",
    },
    {
      title: "Nori et al. — Sequential Diagnosis with Language Models (Microsoft MAI-DxO), arXiv:2506.22405 (2025)",
      url: "https://arxiv.org/abs/2506.22405",
    },
    {
      title: "FDA — List of Artificial Intelligence-Enabled Medical Devices",
      url: "https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices",
    },
    {
      title:
        "Hernström et al. — Screening performance in the MASAI randomised trial of AI-supported mammography, The Lancet Digital Health (2025)",
      url: "https://www.thelancet.com/journals/landig/article/PIIS2589-7500(24)00267-X/fulltext",
    },
    {
      title:
        "Singhal et al. — Large language models encode clinical knowledge (Med-PaLM), Nature 620, 172-180 (2023)",
      url: "https://doi.org/10.1038/s41586-023-06291-2",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can AI generalize beyond narrow diagnostic tasks?",
      content:
        "AI has matched or beaten specialists on narrow imaging tasks, and language models now beat generalist doctors on published case puzzles. But real medicine means integrating symptoms, history, tests and a patient's own context, with no answer key. Do test-case wins carry over to general clinical reasoning on real patients?",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title:
            "FDA permits marketing of IDx-DR, first autonomous AI diagnostic system (diabetic retinopathy), 2018",
          url: "https://web.archive.org/web/20250515125319/https://www.fda.gov/news-events/press-announcements/fda-permits-marketing-artificial-intelligence-based-device-detect-certain-diabetes-related-eye",
        },
        {
          title:
            "Gulshan et al. — Deep learning algorithm for diabetic retinopathy in retinal fundus photographs, JAMA 316(22), 2402-2410 (2016)",
          url: "https://doi.org/10.1001/jama.2016.17216",
        },
      ],
    },
    {
      id: "q2",
      title: "What happens when an AI makes a fatal misdiagnosis?",
      content:
        "If an autonomous AI system misdiagnoses a patient who dies as a result, who bears legal responsibility? The software developer, the hospital, the physician who relied on it, or the patient who consented to AI-driven care?",
      imageUrl:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Will patients accept an AI doctor?",
      content:
        "Hundreds of millions of people already ask chatbots health questions, yet many patients want a human for serious diagnoses. Could patient trust, or distrust, decide the pace of change regardless of technical capability?",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: On test cases. Is AI already the better diagnostician?
    // =========================================================================
    {
      id: "diagnostic-accuracy",
      title: "On Test Cases: Is AI Already the Better Diagnostician?",
      short_summary:
        "AI now beats generalist doctors on published case puzzles and matches specialists on narrow imaging tasks. But test cases come with an answer key, and real clinics do not. Models that shine on benchmarks have lost accuracy in new hospitals, and one widely used hospital tool missed two-thirds of the cases it was built to catch. Whether test-case accuracy holds up on real patients is the first split.",
      image_url:
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=60",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The wins come from tests built to be scored. Microsoft's 304 cases were published puzzles from the New England Journal of Medicine, solved through a simulated gatekeeper, and the doctors it beat were generalists facing cases chosen for difficulty. Real patients arrive with vague complaints, missing records and conditions nobody has written up. When AI leaves the lab it often slips: a pneumonia model trained at one hospital lost accuracy at others, partly by learning which hospital an X-ray came from, and the Epic Sepsis Model, used in hundreds of US hospitals, caught only 33% of sepsis cases in an outside check. More than 300 million people live with one of about 7,000 rare diseases, most with too few cases to train on. Passing a licensing exam measures recall of textbook answers, not the judgment to notice what the textbook left out. Ten years is not long enough to prove AI safe across the whole of medicine.",
      proponent_rebuttal:
        "The gap between AI and doctors on diagnosis is no longer narrow or confined to images. On 304 diagnostically hard NEJM cases, Microsoft's MAI-DxO reached 80% accuracy, four times the 20% average of generalist physicians, and 85.5% at its most accurate setting, at 20% lower diagnostic cost than the doctors. In a randomized trial of 50 physicians, GPT-4 on its own scored 16 points higher than doctors using conventional resources on diagnostic reasoning. On OpenAI's HealthBench, 5,000 realistic conversations graded on rubrics written by 262 physicians, doctors could improve on 2024 models' answers but 'no longer improved over the responses' of the April 2025 models. AI has matched specialists reading mammograms, skin lesions and retinal photos for years. The early failures, like the sepsis model, were older, narrow tools; each model generation has closed more of the gap, and a decade is a long time at this pace.",
      crux: {
        id: "generalization-benchmark",
        title: "The Clinical Generalization Benchmark",
        question:
          "Does AI's benchmark accuracy hold up on messy real-world clinical data across populations?",
        description:
          "Test whether AI's accuracy on published cases and curated image sets carries over to real clinics, with incomplete records, unusual presentations, rare diseases and populations missing from the training data.",
        methodology:
          "Deploy AI diagnostic systems prospectively in diverse clinics (urban, rural, multi-ethnic). Compare AI alone, physicians alone and AI-assisted physicians on 10,000+ real cases spanning common and rare conditions, scored against final confirmed diagnoses. Measure sensitivity, specificity, missed diagnoses and harm from over-testing.",
        equation:
          "\\text{Accuracy}_{\\text{AI}} = \\frac{TP + TN}{TP + TN + FP + FN}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Prospective deployment across urban, rural and multi-ethnic clinics on 10,000+ real cases, comparing AI alone, physicians alone and AI-assisted physicians against confirmed diagnoses, including missed rare conditions.",
        },
        cost_to_verify: "$10M (multi-site clinical study over 2-3 years)",
        falsification: {
          supporter_flip:
            "If prospective multi-site studies found AI's accuracy falling sharply on real, messy, multi-ethnic clinical data and missing rare conditions doctors catch, the claim that AI will out-diagnose most doctors within a decade would fail where it matters.",
          skeptic_flip:
            "If prospective studies in ordinary clinics found AI matching or beating physicians on confirmed diagnoses across populations, as it has on published cases, the claim that it only works on test cases would be hard to hold.",
          common_ground:
            "Both sides agree AI now matches or beats doctors on published cases and narrow imaging tasks, and that some tools have lost accuracy badly when moved to new hospitals.",
          live_disagreement:
            "Whether test-case accuracy carries over to messy, incomplete real-world data across populations, which only large prospective studies in ordinary clinics can establish.",
        },
      },
      evidence: [
        {
          id: "mai-dxo-sequential",
          title: "Microsoft MAI-DxO (June 2025): 80% Right on 304 Hard NEJM Cases vs. 20% for Generalist Doctors",
          description:
            "Nori and colleagues tested AI and physicians on '304 diagnostically challenging New England Journal of Medicine clinicopathological conference' cases, with a gatekeeper model that 'reveals findings only when explicitly queried', so diagnosers had to ask for history and order tests step by step. 'MAI-DxO achieves 80% diagnostic accuracy--four times higher than the 20% average of generalist physicians', rising to 85.5% in its most accurate configuration, and 'reduces diagnostic costs by 20% compared to physicians.'",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 6,
            directness: 7,
          },
          source: "Nori et al., 'Sequential Diagnosis with Language Models', arXiv:2506.22405 (June 2025)",
          sourceUrl: "https://arxiv.org/abs/2506.22405",
          reasoning:
            "The strongest recent head-to-head on diagnosis, and it tests step-by-step reasoning rather than multiple choice. It is a preprint by the developer; the cases are published puzzles chosen for difficulty, not a sample of ordinary patients; and the comparison doctors were generalists, not specialists.",
        },
        {
          id: "goh-llm-rct",
          title: "Randomized Trial (JAMA Network Open, 2024): GPT-4 Alone Beat Doctors on Diagnostic Reasoning; Doctors With GPT-4 Did Not Improve",
          description:
            "Goh and colleagues randomized 50 physicians (26 attendings, 24 residents) to diagnose clinical vignettes with GPT-4 or with conventional resources. The median diagnostic reasoning score was 76% with the model and 74% without, a difference that was not significant. 'The LLM alone scored 16 percentage points' higher than the conventional-resources group, with a median of 92%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "Goh et al., 'Large Language Model Influence on Diagnostic Reasoning: A Randomized Clinical Trial', JAMA Network Open (28 October 2024)",
          sourceUrl: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2825395",
          reasoning:
            "Independent and randomized. It cuts in an uncomfortable direction for 'doctor plus AI' as the answer: the model alone did best. It used written vignettes, not live patients, with 50 physicians, so it measures reasoning on paper rather than care.",
        },
        {
          id: "healthbench-physicians",
          title: "OpenAI HealthBench (May 2025): Physicians 'No Longer Improved' on Answers From the April 2025 Models",
          description:
            "HealthBench includes 5,000 realistic health conversations, built with 262 physicians from 60 countries and graded on physician-written rubrics. Physicians given answers from September 2024 models could improve them, but when given answers from OpenAI's April 2025 models, 'physicians' responses no longer improved over the responses from the newer models.' Both the models and model-assisted physicians beat physicians writing alone.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 6,
            directness: 5,
          },
          source: "OpenAI, 'Introducing HealthBench' (12 May 2025)",
          sourceUrl: "https://openai.com/index/healthbench/",
          reasoning:
            "A large, open benchmark with physician rubrics, and the code is open. It is the developer grading its own models, partly with model-based graders, on written conversations rather than examinations or treatment of real patients.",
        },
        {
          id: "radiology-outperformance",
          title: "Google Health in Nature (2020): AI Cut Mammogram False Negatives 9.4% and Beat All Six Radiologists in a Reader Study",
          description:
            "McKinney and colleagues showed an AI system reduced false positives by 5.7% and false negatives by 9.4% (absolute) against the first reader on a US mammography dataset, and outperformed all six radiologists in a reader study.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "McKinney et al., Nature 577, 89-94 (2020)",
          sourceUrl: "https://doi.org/10.1038/s41586-019-1799-6",
          reasoning:
            "A top journal and large datasets, but industry-run and criticized for limited reproducibility. Retrospective reads of stored images, not live screening; the 2025 prospective studies in the next section are stronger evidence.",
        },
        {
          id: "llm-clinical-reasoning",
          title: "ChatGPT Passed the US Medical Licensing Exam Threshold in 2023 With No Medical Training",
          description:
            "ChatGPT reached the USMLE passing threshold across all three steps with no medical-specific training (Kung et al., 2023), and later reviews found GPT-4 scoring 80-100% on USMLE-style questions.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 4,
          },
          source: "Kung et al., PLOS Digital Health 2(2):e0000198 (2023)",
          sourceUrl: "https://doi.org/10.1371/journal.pdig.0000198",
          reasoning:
            "Shows how fast general models absorbed medical knowledge. Exam questions have one right answer and tidy facts, which is exactly what clinical care lacks, so directness is low.",
        },
        {
          id: "real-world-deployment-gap",
          title: "Epic Sepsis Model, Used in Hundreds of US Hospitals, Caught Only 33% of Sepsis Cases in an Outside Check (2021)",
          description:
            "The Epic Sepsis Model, deployed across hundreds of US hospitals, was externally validated by Wong and colleagues at Michigan Medicine and found to have 33% sensitivity and an AUC of 0.63, far below its marketed performance, while generating frequent false alerts and missing two-thirds of sepsis cases.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Wong et al., 'External Validation of a Widely Implemented Proprietary Sepsis Prediction Model in Hospitalized Patients', JAMA Internal Medicine 181(8) (2021)",
          sourceUrl: "https://doi.org/10.1001/jamainternmed.2021.2626",
          reasoning:
            "Independent, real-world, and about a tool that was actually in wide use: the clearest case of marketed accuracy failing in practice. It is an older, narrow prediction model, not a modern language model, which limits how far it predicts today's systems.",
        },
        {
          id: "distribution-shift-failures",
          title: "Pneumonia X-Ray Models Lost Accuracy at New Hospitals, Partly by Learning Which Hospital the Image Came From (2018)",
          description:
            "Zech and colleagues trained deep-learning pneumonia detectors on chest X-rays from different US hospital systems and found performance dropped when they were tested on images from other hospitals. The models could identify the source hospital from the images, picking up on equipment and protocol differences rather than disease alone.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source: "Zech et al., PLOS Medicine 15(11):e1002683 (2018)",
          sourceUrl: "https://doi.org/10.1371/journal.pmed.1002683",
          reasoning:
            "A well-cited demonstration of a general failure mode: models learning shortcuts that do not travel. It is from 2018; newer, larger models generalize better on some tasks, but whether they do on real patients is the crux.",
        },
        {
          id: "rare-disease-limitations",
          title: "More Than 300 Million People Live With One of About 7,000 Rare Diseases, Most Too Rare to Train On",
          description:
            "An estimated 300 million or more people live with one of roughly 7,000 rare diseases, most of which have too few documented cases to provide adequate training data. Diagnostic odysseys often span years and still rely on expert pattern recognition.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 4,
          },
          source: "Nguengang Wakap et al., European Journal of Human Genetics 28, 165-173 (2020)",
          sourceUrl: "https://doi.org/10.1038/s41431-019-0508-0",
          reasoning:
            "Sets the scale of a hard problem for data-hungry systems. It does not show AI fails on rare disease: language models trained on the whole literature may in fact help with rare diagnoses, which is untested at scale.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Real patients. Outcomes, and the human part of medicine.
    // =========================================================================
    {
      id: "human-element",
      title: "Real Patients: Outcomes and the Human Part of Medicine",
      short_summary:
        "The strongest real-world evidence so far is in breast screening, where AI working with radiologists caught more cancers and cut reading work by 44%. No trial has handed patients to AI-led care and compared deaths, admissions or missed diagnoses with doctor-led care. Whether AI can run care, not just read images, and what is lost when the doctor is gone, is the second split.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Medicine is more than a diagnosis. Patients need someone to examine them, notice what they are not saying, weigh a treatment against their life, and stay with them through bad news. The doctor-patient relationship has measurable effects on outcomes. The best real-world AI results so far keep a human at the centre: in Sweden's MASAI trial and Germany's PRAIM study, AI supported radiologists, and radiologists made the calls. When the human defers to the machine, things go wrong: in a controlled study, 27 radiologists' accuracy fell sharply when an AI gave them a wrong category, and the least experienced were swayed most. No randomized trial has tested AI-led care against doctor-led care on deaths, admissions or missed diagnoses. Until one does, 'replace' is a guess, and the costs of a wrong guess land on patients.",
      proponent_rebuttal:
        "The real-world results are arriving, and they point one way. In MASAI, a randomized trial of 105,934 Swedish women, AI-supported screening found 29% more cancers than standard double reading, with no rise in false positives, and cut the radiologists' reading workload by 44%, because the AI took over triage and many scans needed one human reader instead of two. In PRAIM, covering 463,094 German women and 119 radiologists, AI-supported reading found 17.6% more cancers without raising recall rates. Machines are also rated well on the human side: in a 2023 study, licensed clinicians preferred ChatGPT's answers to patients' questions over doctors' answers 79% of the time, and rated them more empathetic. Medicine does not need a doctor at every step. It needs the human work done well, and AI can take the reading, the triage and the paperwork while nurses and fewer doctors do the rest.",
      crux: {
        id: "patient-outcome-comparison",
        title: "The Patient Outcome Comparison Trial",
        question:
          "Can AI-led care match physician-led care on real patient outcomes?",
        description:
          "Compare health outcomes in AI-led care and physician-led care across diverse patients, including chronic disease and mental health, rather than accuracy on reads or vignettes.",
        methodology:
          "Randomized controlled trial with three arms: AI-led triage and management with human escalation, physician-only care, and AI-assisted physicians. Measure deaths, admissions, missed diagnoses, adherence, patient satisfaction and detection of psychosocial problems over two years.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Randomized trials that assign patients to AI-led or physician-led care for common primary-care and chronic conditions, tracking hospital admissions, missed diagnoses, deaths and patient satisfaction for a year or more, run by health systems and reviewed by regulators.",
        },
        cost_to_verify: "$25M (multi-arm RCT across multiple health systems)",
        falsification: {
          supporter_flip:
            "If a randomized trial found AI-led care produced more missed diagnoses, admissions or deaths than physician-led care, or eroded adherence and trust, the case that AI can run the patient relationship would shrink to 'a tool for doctors'.",
          skeptic_flip:
            "If trials found AI-led care, with human escalation, matching physician-led care on deaths, admissions and missed diagnoses, the claim that only a doctor can manage patients would lose its footing.",
          common_ground:
            "Both sides agree AI-supported breast screening has caught more cancers in large real-world studies, that medicine is more than diagnosis, and that no trial has yet compared AI-led with physician-led care on hard outcomes.",
          live_disagreement:
            "Whether AI-led care can match physician-led care on real outcomes such as deaths, admissions and missed diagnoses, or whether the human relationship does work AI cannot, which only an outcomes trial could settle.",
        },
      },
      evidence: [
        {
          id: "masai-trial",
          title: "MASAI Randomized Trial, Sweden (Lancet Digital Health, 2025): AI-Supported Screening Found 29% More Cancers and Cut Reading Work 44%",
          description:
            "Among 105,934 women randomly assigned at four Swedish screening sites, AI-supported screening (the AI triaged scans to single or double reading and flagged suspicious findings) detected 6.4 cancers per 1,000 against 5.0 with standard double reading, a ratio of 1.29, mainly small, node-negative invasive cancers. Recall and false-positive rates were not significantly higher, and there were 61,248 screen readings against 109,692, 'a 44·2% reduction in the screen-reading workload.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Hernström et al., 'Screening performance and characteristics of breast cancer detected in the Mammography Screening with Artificial Intelligence trial (MASAI)', The Lancet Digital Health (2025)",
          sourceUrl: "https://www.thelancet.com/journals/landig/article/PIIS2589-7500(24)00267-X/fulltext",
          reasoning:
            "A randomized trial in a national screening programme, the strongest real-world design yet for medical AI. It shows AI replacing part of a radiologist's work, not the radiologist. More cancers found is not yet fewer deaths, and some extra detections may be overdiagnosis; the trial's interval-cancer results bear on that.",
        },
        {
          id: "praim-study",
          title: "PRAIM, Germany (Nature Medicine, 2025): 463,094 Women Screened; AI-Supported Reading Found 17.6% More Cancers",
          description:
            "In an observational, real-world study at 12 German screening sites, 119 radiologists chose whether to use AI support. Radiologists using it detected 6.7 cancers per 1,000 women, '17.6% (95% confidence interval: +5.7%, +30.8%) higher than' the 5.7 per 1,000 without it, and the recall rate was slightly lower (37.4 against 38.3 per 1,000).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source:
            "Eisemann et al., 'Nationwide real-world implementation of AI for cancer detection in population-based mammography screening', Nature Medicine (2025)",
          sourceUrl: "https://www.nature.com/articles/s41591-024-03408-6",
          reasoning:
            "Very large and real-world, but not randomized: radiologists chose when to use the AI, which could bias the comparison. Like MASAI, it tests doctors with AI, not AI without doctors.",
        },
        {
          id: "ai-chatbot-satisfaction",
          title: "JAMA Internal Medicine (2023): Clinicians Preferred ChatGPT's Answers to Doctors' 79% of the Time, and Rated Them More Empathetic",
          description:
            "For 195 patient questions from an online forum, a panel of licensed clinicians preferred ChatGPT's responses to physicians' responses 79% of the time and rated them higher in both quality and empathy.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "Ayers et al., JAMA Internal Medicine 183(6), 589-596 (2023)",
          sourceUrl: "https://doi.org/10.1001/jamainternmed.2023.1838",
          reasoning:
            "Challenges the idea that machines must lose on bedside manner. The physician answers were short forum replies written for free, not answers in a clinic visit, and written empathy is not the same as caring for a patient over time.",
        },
        {
          id: "automation-bias",
          title: "Radiology (2023): When AI Gave a Wrong Mammogram Category, 27 Radiologists' Accuracy Fell Sharply",
          description:
            "In a controlled reader study, 27 radiologists at all experience levels were significantly swayed by AI BI-RADS suggestions. When a simulated AI gave an incorrect category, their accuracy fell sharply, with inexperienced readers worst affected.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Dratsch et al., 'Automation Bias in Mammography: The Impact of AI BI-RADS Suggestions on Reader Performance', Radiology 307(4):e222176 (2023)",
          sourceUrl: "https://doi.org/10.1148/radiol.222176",
          reasoning:
            "Shows that a human in the loop is not automatically a safeguard: people defer to confident machines. It cuts both ways, since it also argues for systems accurate enough not to need second-guessing.",
        },
        {
          id: "placebo-therapeutic-relationship",
          title: "Meta-Analysis (PLOS ONE, 2014): The Clinician-Patient Relationship Has a Small but Measurable Effect on Outcomes",
          description:
            "Kelley and colleagues' systematic review and meta-analysis of randomized trials found that improving the patient-clinician relationship had a small but statistically significant effect on health outcomes.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 4,
          },
          source: "Kelley et al., PLOS ONE 9(4):e94207 (2014)",
          sourceUrl: "https://doi.org/10.1371/journal.pone.0094207",
          reasoning:
            "Evidence that the relationship does some clinical work, which a machine would have to replace. The effect is small, and it does not show a machine cannot provide some of it.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: The law. Who is allowed to practise medicine?
    // =========================================================================
    {
      id: "regulatory-liability",
      title: "The Law: Who Is Allowed to Practise Medicine?",
      short_summary:
        "The FDA has authorized about 1,600 AI medical devices, 335 of them in 2025 alone, and cleared its first fully autonomous screening tool in 2018. Licensing, malpractice law and insurers still assume a human doctor, and even OpenAI says ChatGPT Health is 'not intended for diagnosis or treatment.' Whether the rules will let AI practise on its own within ten years is the third split.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Even if the technology were ready tomorrow, the system is built around a licensed human, and it changes slowly. The FDA reviews medical AI one narrow use at a time, and about three in four authorized devices read images for a clinician. Malpractice law measures care against what a reasonable physician would do, and no jurisdiction has clear rules on who pays when an autonomous system gets it wrong. The companies themselves keep the doctor in the loop: OpenAI launched ChatGPT Health in January 2026 for the 230 million people a week who ask it health questions, and says it is 'designed to support, not replace, medical care' and 'not intended for diagnosis or treatment.' Hospitals, medical boards and insurers have every reason to keep it that way; electronic health records took more than a decade to spread even with federal subsidies behind them. Ten years is a short time for medicine's rules.",
      proponent_rebuttal:
        "The rules are already bending. The FDA's list of AI-enabled devices has grown to about 1,600, with 335 authorized in 2025 alone, up from 65 in 2018, and the agency says it will start tagging devices that use large language models. Autonomy has a precedent: in 2018 the FDA cleared IDx-DR to 'automatically (without physician assistance)' detect diabetic eye disease. Doctors are moving faster than the rules: the American Medical Association reported two in three physicians using health AI in 2024, up 78% from 2023. When the need was urgent, Medicare telehealth rules that stood for decades fell within weeks of the March 2020 emergency. Liability can follow existing product law: if the AI is a medical device, its maker answers for it. With hundreds of millions of people already asking AI about their health every week, the law will follow practice, as it usually does.",
      crux: {
        id: "regulatory-timeline-analysis",
        title: "The Regulatory Pathway Feasibility Analysis",
        question:
          "Will regulators and liability law allow unsupervised AI diagnosis within about ten years?",
        description:
          "Determine whether existing or evolving regulatory and liability frameworks will allow AI to diagnose and treat without a physician within a ten-year window, beyond narrow screening tasks like diabetic eye disease.",
        methodology:
          "Track FDA authorizations of autonomous (no clinician review) AI devices and how broad their uses are; follow state licensing changes that let AI act without a physician; and follow malpractice and product-liability rulings on AI errors. Survey hospital risk officers and insurers on what they would cover.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A count of FDA authorizations for AI that acts with no clinician review, and how broad their uses are, alongside state licensing changes and the first malpractice and product-liability rulings on AI errors, plus what hospital risk officers and insurers will cover.",
        },
        cost_to_verify: "$500K (regulatory and legal analysis, stakeholder surveys)",
        falsification: {
          supporter_flip:
            "If by the early 2030s the FDA still cleared autonomous AI only for narrow screening tasks, and liability rulings kept the physician answerable for AI decisions, the ten-year timeline would be wrong whatever the accuracy.",
          skeptic_flip:
            "If the FDA began authorizing AI to diagnose and manage common conditions without clinician review, and states licensed it to act, as fast as telehealth rules changed in 2020, the claim that regulators will not allow it would overstate the barrier.",
          common_ground:
            "Both sides agree the FDA has authorized about 1,600 AI devices, almost all for narrow uses with a clinician involved, that the FDA has cleared at least one screening tool, IDx-DR, to act without a physician, and that liability for an autonomous AI's errors is legally unsettled.",
          live_disagreement:
            "Whether regulators and liability law will allow unsupervised AI diagnosis and treatment within about ten years, or keep a physician in the loop much longer, which tracking approvals, licensing and rulings will reveal.",
        },
      },
      evidence: [
        {
          id: "fda-approvals-accelerating",
          title: "FDA's AI Device List: About 1,600 Authorized, 335 in 2025 Alone, Three in Four in Radiology",
          description:
            "The FDA's List of AI-Enabled Medical Devices (page current as of 4 September 2026; latest decisions dated 29 June 2026) holds about 1,614 devices. Argumend's count of the FDA's download: 65 authorized in 2018, 162 in 2022, 235 in 2024 and 335 in 2025; 1,230 of them, about 76%, list radiology as the lead review panel. The FDA says it 'will explore methods to identify and tag medical devices that incorporate foundation models', including large language models.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "FDA, List of Artificial Intelligence-Enabled Medical Devices (current as of 4 September 2026), CSV download",
          sourceUrl:
            "https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices",
          reasoning:
            "The authoritative count, showing fast-growing regulatory acceptance. Nearly all are narrow tools cleared to help clinicians, mostly with images, so it measures momentum rather than replacement. The FDA notes the list is not comprehensive.",
        },
        {
          id: "idx-dr-autonomous",
          title: "FDA, April 2018: IDx-DR Cleared to Detect Diabetic Eye Disease 'Without Physician Assistance'",
          description:
            "The FDA granted IDx-DR De Novo authorization on 11 April 2018, for use by health care providers 'to automatically detect more than mild diabetic retinopathy' in adults with diabetes. The decision summary concludes that the clinical study 'demonstrated safe and effective clinical performance of IDx-DR when used to automatically (without physician assistance) detect mtmDR.' Later AI retinal screeners, such as EyeArt and AEYE-DS, are also on the FDA's list.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "FDA De Novo decision summary DEN180001 (IDx-DR, 11 April 2018)",
          sourceUrl: "https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN180001.pdf",
          reasoning:
            "Proof that US regulators will clear AI to give a diagnostic result with no doctor reviewing it. It is one narrow, well-defined screening task with a referral as the output, a long way from diagnosing and treating most conditions.",
        },
        {
          id: "ama-physician-ai-use",
          title: "American Medical Association: Two in Three Physicians Used Health AI in 2024, Up 78% From 2023",
          description:
            "The AMA's physician survey found two in three physicians reported using health AI in 2024, an increase of 78% from 2023.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 3,
          },
          source: "American Medical Association, '2 in 3 physicians are using health AI—up 78% from 2023'",
          sourceUrl: "https://www.ama-assn.org/practice-management/digital-health/2-3-physicians-are-using-health-ai-78-2023",
          reasoning:
            "Shows how fast AI has entered doctors' work, which is the adoption half of the timeline. Most of that use is assistive (notes, documentation, lookups), so it says little about replacing doctors.",
        },
        {
          id: "telemedicine-precedent",
          title: "Medicare Telehealth Rules That Stood for Decades Fell Within Weeks in March 2020",
          description:
            "Under 1135 waiver authority, CMS removed long-standing geographic and originating-site restrictions on Medicare telehealth within weeks of the March 2020 emergency declaration.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 3,
          },
          source: "CMS, Medicare Telemedicine Health Care Provider Fact Sheet (17 March 2020)",
          sourceUrl: "https://www.cms.gov/newsroom/fact-sheets/medicare-telemedicine-health-care-provider-fact-sheet",
          reasoning:
            "A real precedent for fast regulatory change, but it took a pandemic, and it let licensed doctors work remotely rather than letting software practise, so it is an analogy, not evidence about AI.",
        },
        {
          id: "chatgpt-health-not-diagnosis",
          title: "OpenAI, January 2026: 230 Million People a Week Ask ChatGPT Health Questions, but ChatGPT Health Is 'Not Intended for Diagnosis or Treatment'",
          description:
            "Launching ChatGPT Health, OpenAI said that 'over 230 million people globally ask health and wellness related questions on ChatGPT every week.' The product lets users connect medical records and wellness apps, and OpenAI says it is 'designed to support, not replace, medical care. It is not intended for diagnosis or treatment.' It opened to US users aged 18 and over on web and iOS in July 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 5,
            directness: 5,
          },
          source: "OpenAI, 'Introducing ChatGPT Health' (7 January 2026, updated 23 July 2026)",
          sourceUrl: "https://openai.com/index/introducing-chatgpt-health/",
          reasoning:
            "The leading AI company, with enormous health demand, still keeps its product inside the 'support, not diagnose' line, which shows how strong the legal and liability pull toward a doctor in the loop is. The disclaimer is partly legal positioning; it does not say what the system can do.",
        },
        {
          id: "liability-gap",
          title: "JAMA (2019): Malpractice Law Judges Doctors Against Human Standards of Care, With No Clear Rules for AI",
          description:
            "Price, Gerke and Cohen explain that malpractice liability turns on whether a physician met the standard of care, which is set by what other physicians do. Following an AI recommendation that departs from that standard can expose the doctor, and no clear legal framework yet assigns liability for a fully autonomous AI's treatment decisions.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "Price, Gerke & Cohen, 'Potential Liability for Physicians Using Artificial Intelligence', JAMA 322(18), 1765-1766 (2019)",
          sourceUrl: "https://doi.org/10.1001/jama.2019.15064",
          reasoning:
            "A clear statement of the legal barrier by leading health-law scholars. Law can change, and product liability offers one route, so it describes a hurdle rather than a wall.",
        },
        {
          id: "institutional-resistance",
          title: "Electronic Health Records Took 13 Years to Spread, From 42% of Office Doctors in 2008 to 88% in 2021",
          description:
            "Even with federal HITECH incentives, office-based physician EHR adoption climbed from 42% in 2008 to 88% (any EHR) by 2021, a multi-decade diffusion despite clear policy support.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 3,
          },
          source: "ONC / CDC National Electronic Health Records Survey, office-based physician EHR adoption",
          sourceUrl: "https://www.healthit.gov/data/quickstats/office-based-physician-electronic-health-record-adoption",
          reasoning:
            "A measured precedent for how slowly medicine adopts new systems, even with subsidies behind them. AI is spreading faster than EHRs did among doctors themselves, so the analogy may understate the pace.",
        },
      ],
    },
  ],
};
