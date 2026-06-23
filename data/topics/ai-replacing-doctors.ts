import type { Topic } from "@/lib/schemas/topic";

export const aiReplacingDoctorsData = {
  id: "ai-replacing-doctors",
  title: "Will AI Replace Doctors Within a Decade?",
  meta_claim:
    "AI systems will be capable of diagnosing and treating most medical conditions better than human physicians within 10 years, fundamentally disrupting healthcare.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "AI already matches or beats physicians on narrow tasks — reading radiology and dermatology images at expert level, and GPT-4 outscored doctors on diagnostic-reasoning vignettes. Yet the FDA has cleared 950+ medical-AI devices and not one replaces a doctor: they assist. Real medicine is messier than the benchmark — incomplete data, physical exams, liability, and the human relationship.",
    confidence: 80,
    source:
      "FDA AI-enabled medical device list (950+, all assistive); JAMA/Nature studies on AI vs. physician diagnostic accuracy; WHO guidance (2021)",
    sourceUrl:
      "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "On narrow, well-defined tasks AI is already at or above physician level: it reads mammograms and skin lesions as well as specialists, and in head-to-head vignette studies GPT-4 outscored doctors on diagnostic reasoning.",
    "But not a single one of the FDA's 950+ cleared medical-AI devices replaces a doctor — they all assist — because real practice is messier than the benchmark: incomplete and noisy data, the physical exam, managing chronic and mental illness, edge-case rare diseases, and the question of who is liable when the algorithm is wrong.",
    "So the honest debate isn't whether AI can match a doctor on a clean test case (it can) but whether it can take over the whole job — generalizing to messy real-world patients, earning patient trust, and clearing a liability-and-regulatory bar that, so far, keeps a human in the loop.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "WHO — Ethics and Governance of AI for Health (Guidance, 2021)",
      url: "https://www.who.int/publications/i/item/9789240029200",
    },
    {
      title:
        "Topol, E. - Deep Medicine: How AI Can Make Healthcare Human Again",
      url: "https://drerictopol.com/portfolio/deep-medicine/",
    },
    {
      title:
        "FDA — Artificial Intelligence-Enabled Medical Devices (authorized device list)",
      url: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices",
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
        "AI has shown superhuman accuracy in specific imaging tasks like detecting diabetic retinopathy. But medicine requires integrating symptoms, history, lab results, and patient context. Can narrow AI successes scale to general clinical reasoning?",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title:
            "FDA permits marketing of IDx-DR, first autonomous AI diagnostic system (diabetic retinopathy), 2018",
          url: "https://www.fda.gov/news-events/press-announcements/fda-permits-marketing-artificial-intelligence-based-device-detect-certain-diabetes-related-eye",
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
        "Surveys show mixed feelings about AI in healthcare. Many patients want a human physician for serious diagnoses. Could patient resistance slow adoption regardless of technical capability?",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "diagnostic-accuracy",
      title: "Diagnostic Accuracy",
      short_summary:
        "AI already outperforms radiologists on some imaging tasks. Can this generalize to broader medicine?",
      image_url:
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=60",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "AI's diagnostic wins are cherry-picked from narrow, well-defined imaging tasks with large labeled datasets. Real medicine involves ambiguous symptoms, incomplete histories, and multi-system interactions. AI models are brittle outside their training distribution and frequently fail on rare conditions, atypical presentations, and populations underrepresented in training data. A decade is nowhere near enough to validate AI across the full spectrum of medical practice.",
      proponent_rebuttal:
        "AI has already matched or exceeded specialist-level performance in dermatology, pathology, radiology, and ophthalmology. Foundation models like Med-PaLM 2 passed USMLE-style exams at expert level and are rapidly improving at multi-step clinical reasoning. The rate of improvement is exponential, not linear. Within a decade, multimodal AI systems integrating imaging, genomics, lab results, and clinical notes will surpass any individual physician's ability to synthesize information. Early deployment in triage and screening is already saving lives in low-resource settings.",
      crux: {
        id: "generalization-benchmark",
        title: "The Clinical Generalization Benchmark",
        description:
          "Test whether AI diagnostic accuracy on controlled imaging tasks generalizes to real-world clinical settings with messy, incomplete data.",
        methodology:
          "Deploy AI diagnostic systems in diverse clinical environments (urban, rural, multi-ethnic populations). Compare AI-only diagnosis against physician-only diagnosis and AI-assisted physician diagnosis across 10,000+ cases spanning common and rare conditions. Measure sensitivity, specificity, and missed diagnoses.",
        equation:
          "\\text{Accuracy}_{\\text{AI}} = \\frac{TP + TN}{TP + TN + FP + FN}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (multi-site clinical trial over 2-3 years)",
        falsification: {
          supporter_flip:
            "If multi-site trials showed AI diagnostic accuracy collapses on real-world, messy, multi-ethnic clinical data — performing far worse than on clean benchmark images and missing rare conditions — the 'AI will out-diagnose most doctors in a decade' claim would fail at the point that matters.",
          skeptic_flip:
            "A skeptic who says benchmarks are hype should weigh that AI already matches specialists on real radiology and dermatology reads (not just toy data) and that LLMs outperform physicians on clinical-reasoning vignettes — so 'it only works on clean test cases' is an empirical claim a real-world trial could refute.",
          common_ground:
            "Both sides agree AI performs at or above expert level on narrow, well-defined diagnostic tasks, and that no AI yet diagnoses autonomously in routine practice.",
          live_disagreement:
            "Whether benchmark-level accuracy generalizes to messy, incomplete real-world clinical data across diverse populations — which only large multi-site deployment trials can establish.",
        },
      },
      evidence: [
        {
          id: "radiology-outperformance",
          title: "AI Matches Radiologists in Breast Cancer Screening",
          description:
            "A 2020 Nature study (Google Health/DeepMind) showed an AI system reduced false positives by 5.7% and false negatives by 9.4% (absolute) versus the first reader on a US mammography dataset, and outperformed all six radiologists in a reader study.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "McKinney et al., Nature 577, 89-94 (2020), doi:10.1038/s41586-019-1799-6",
          sourceUrl: "https://doi.org/10.1038/s41586-019-1799-6",
          reasoning:
            "Published in a top-tier journal on large UK/US datasets, but industry-funded (Google) and later criticized for limited reproducibility (Haibe-Kains et al., Nature 2020); real-world deployment results have been more mixed.",
        },
        {
          id: "dermatology-ai",
          title: "AI Classifies Skin Lesions at Dermatologist Level",
          description:
            "Deep learning systems have matched board-certified dermatologists in classifying skin cancers from images across multiple independent studies.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Esteva et al., Nature 542, 115-118 (2017), doi:10.1038/nature21056; Haenssle et al., Annals of Oncology 29(8), 1836-1842 (2018), doi:10.1093/annonc/mdy166",
          sourceUrl: "https://doi.org/10.1038/nature21056",
          reasoning:
            "Replicated across multiple labs (Esteva used 21 dermatologists; Haenssle compared a CNN against 58 dermatologists and the CNN outperformed the average), though these are curated test-set benchmarks and performance drops on darker skin tones due to training-data bias.",
        },
        {
          id: "llm-clinical-reasoning",
          title: "LLMs Now Pass Medical Licensing Exams",
          description:
            "ChatGPT reached the USMLE passing threshold across all three steps with no medical-specific training (Kung et al., 2023), and a 2024 systematic review found GPT-4 scoring 80-100% on USMLE-style questions — evidence that general-purpose AI is moving beyond narrow imaging into multi-step clinical reasoning.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Kung et al., PLOS Digital Health 2(2):e0000198 (2023), doi:10.1371/journal.pdig.0000198; systematic review: Springer, Discover Applied Sciences (2024), doi:10.1007/s42452-024-06194-5",
          sourceUrl: "https://doi.org/10.1371/journal.pdig.0000198",
          reasoning:
            "Peer-reviewed evidence that LLMs now generalize across clinical knowledge domains, but multiple-choice exam performance is a weak proxy for real diagnostic work-up, and these models still hallucinate and lack grounding in physical exam, longitudinal context, and procedural skills.",
        },
        {
          id: "distribution-shift-failures",
          title: "AI Models Fail Under Distribution Shift",
          description:
            "Multiple studies show AI diagnostic tools lose significant accuracy when deployed in hospitals different from where they were trained, due to differences in equipment, demographics, and protocols.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Zech et al., PLOS Medicine 15(11):e1002683 (2018), doi:10.1371/journal.pmed.1002683",
          sourceUrl: "https://doi.org/10.1371/journal.pmed.1002683",
          reasoning:
            "Directly demonstrates the generalization gap: a pneumonia-detection CNN dropped from AUC 0.931 internally to 0.815 at an outside hospital, and learned to identify the source hospital rather than disease.",
        },
        {
          id: "rare-disease-limitations",
          title: "AI Struggles with Rare and Complex Conditions",
          description:
            "An estimated 300+ million people live with one of ~7,000 rare diseases, most of which have too few cases to provide adequate AI training data. Diagnostic odysseys frequently span years and still rely on expert human pattern recognition.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Nguengang Wakap et al., European Journal of Human Genetics 28, 165-173 (2020), doi:10.1038/s41431-019-0508-0 (prevalence); diagnostic-odyssey duration per rare-disease patient surveys",
          sourceUrl: "https://doi.org/10.1038/s41431-019-0508-0",
          reasoning:
            "The 300M prevalence figure is from a peer-reviewed Orphanet analysis; the data-scarcity limitation for rare conditions is well-established, though the leap to 'AI cannot help' is partly inferential.",
        },
        {
          id: "automation-bias",
          title: "Clinicians Defer to AI Even When It Is Wrong",
          description:
            "In a controlled reader study, 27 radiologists at all experience levels were significantly swayed by AI BI-RADS suggestions: when a (simulated) AI gave an incorrect category, accuracy fell sharply, with inexperienced readers worst affected. Automation bias means deploying imperfect AI can degrade, not improve, human-plus-AI performance.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Dratsch et al. — Automation Bias in Mammography: The Impact of AI BI-RADS Suggestions on Reader Performance, Radiology 307(4):e222176 (2023), doi:10.1148/radiol.222176",
          sourceUrl: "https://doi.org/10.1148/radiol.222176",
          reasoning:
            "A peer-reviewed prospective experiment in a top radiology journal directly demonstrates that the 'AI augments the doctor' framing can backfire when the model errs, undercutting both the replacement and the pure-augmentation narratives; it is a single-task simulated-AI study, so generalization to all of medicine is limited.",
        },
        {
          id: "real-world-deployment-gap",
          title: "Benchmark Accuracy Collapses in Real Deployment",
          description:
            "The Epic Sepsis Model, deployed across hundreds of US hospitals, was externally validated and found to have just 33% sensitivity and AUC 0.63 — far below its marketed performance — while generating frequent false alerts and missing two-thirds of sepsis cases. Benchmark numbers routinely fail to survive contact with live clinical workflows.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "Wong et al. — External Validation of a Widely Implemented Proprietary Sepsis Prediction Model in Hospitalized Patients, JAMA Internal Medicine 181(8), 1065-1070 (2021), doi:10.1001/jamainternmed.2021.2626",
          sourceUrl: "https://doi.org/10.1001/jamainternmed.2021.2626",
          reasoning:
            "Independent academic validation (Michigan Medicine, ~38,000 hospitalizations) of a commercially deployed model is among the strongest available evidence of the benchmark-to-deployment gap; it concerns a prediction model rather than full diagnosis, but the directness to the 'AI is ready to replace clinical judgment' claim is high.",
        },
      ],
    },
    {
      id: "human-element",
      title: "The Human Element",
      short_summary:
        "Empathy, complex judgment, and rare diseases define medicine's hardest problems. Can AI handle what makes medicine truly difficult?",
      image_url:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=60",
      icon_name: "Users" as const,
      skeptic_premise:
        "Medicine is fundamentally a human relationship. Patients need empathy, trust, and shared decision-making, especially for serious diagnoses, end-of-life care, and mental health. A physician reads body language, detects when a patient is withholding information, and adapts communication to cultural context. These deeply human skills represent the core of healing, not just diagnosing. AI reducing medicine to pattern matching misunderstands what doctors actually do.",
      proponent_rebuttal:
        "The empathy argument conflates two things: the need for human connection and the need for human diagnosis. AI can handle the diagnostic and treatment-planning side while human care coordinators, nurses, and therapists provide the relational side. In fact, studies show physicians average 11-minute appointments and frequently interrupt patients within 11 seconds. AI could paradoxically free physicians to spend more time on empathy by offloading cognitive labor. Furthermore, AI chatbots have already shown comparable patient satisfaction scores for informational consultations.",
      crux: {
        id: "patient-outcome-comparison",
        title: "The Patient Outcome Comparison Trial",
        description:
          "Compare health outcomes in AI-primary care vs. human-primary care across diverse patient populations including mental health and chronic disease management.",
        methodology:
          "Randomized controlled trial with three arms: AI-only triage and management, physician-only, and AI-assisted physician. Measure patient outcomes (mortality, morbidity, readmission), patient satisfaction, adherence to treatment plans, and detection of psychosocial factors over 2 years.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$25M (multi-arm RCT across multiple healthcare systems)",
        falsification: {
          supporter_flip:
            "If a randomized trial found AI-primary care produced worse patient outcomes than physician care — missing psychosocial factors, mismanaging chronic and mental illness, eroding adherence and trust — the case that AI can run the whole patient relationship would collapse to 'diagnostic tool, not doctor.'",
          skeptic_flip:
            "A skeptic who says medicine needs a human should weigh that much of the 'human element' (triage, follow-up, empathy scripts) is increasingly automatable and that AI is available 24/7 without burnout — so the claim that only a human can manage patients is testable, not self-evident.",
          common_ground:
            "Both sides agree medicine is more than diagnosis — physical exam, the relationship, managing chronic and mental illness — and that no trial has yet compared AI-primary to physician-primary care on hard outcomes.",
          live_disagreement:
            "Whether AI-led care can match physician-led care on real patient outcomes (mortality, adherence, psychosocial detection), or whether the human relationship does work AI can't replace — which only a multi-arm outcomes RCT could settle.",
        },
      },
      evidence: [
        {
          id: "physician-burnout",
          title: "Physician Burnout Epidemic Degrades Care Quality",
          description:
            "Physician burnout peaked at 62.8% reporting at least one symptom in 2021 and was 45.2% in 2023 — consistently exceeding the general working population — and is linked to increased medical errors and worse patient outcomes. AI could reduce cognitive load and documentation burden.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "Shanafelt et al., 'Changes in Burnout... Between 2011 and 2023,' Mayo Clinic Proceedings (2024), doi:10.1016/j.mayocp.2024.07.005",
          sourceUrl: "https://doi.org/10.1016/j.mayocp.2024.07.005",
          reasoning:
            "Burnout prevalence is well-documented and longitudinally tracked, but AI as a solution is indirect, assumes successful integration, and documentation tools can also add burden.",
        },
        {
          id: "ai-chatbot-satisfaction",
          title: "AI Chatbots Rated Higher in Quality and Empathy than Physicians",
          description:
            "A 2023 JAMA Internal Medicine study found that for 195 patient questions from a public forum, a licensed-clinician panel preferred chatbot (ChatGPT) responses 79% of the time and rated them higher in both quality and empathy than the physician responses.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Ayers et al., JAMA Internal Medicine 183(6), 589-596 (2023), doi:10.1001/jamainternmed.2023.1838",
          sourceUrl: "https://doi.org/10.1001/jamainternmed.2023.1838",
          reasoning:
            "Evaluators were clinicians, not patients, and the comparison used volunteer physician forum answers on text-only Q&A — not full clinical encounters — so it overstates real-world equivalence.",
        },
        {
          id: "placebo-therapeutic-relationship",
          title: "Therapeutic Relationship Contributes to Healing",
          description:
            "Meta-analyses show the physician-patient relationship accounts for a measurable portion of treatment outcomes, particularly in chronic pain, mental health, and palliative care.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "Kelley et al., PLOS ONE 9(4):e94207 (2014), doi:10.1371/journal.pone.0094207",
          sourceUrl: "https://doi.org/10.1371/journal.pone.0094207",
          reasoning:
            "A meta-analysis of RCTs found a small but statistically significant effect of the patient-clinician relationship on healthcare outcomes; whether this advantage can be replicated by machines is contested.",
        },
        {
          id: "cultural-context-medicine",
          title: "Medicine Requires Deep Cultural and Social Context",
          description:
            "Effective treatment requires understanding patients' cultural beliefs, social determinants of health, family dynamics, and communication preferences, which vary enormously across communities.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Brormann et al. — Does cultural competence training for health professionals impact culturally and linguistically diverse patient outcomes? A systematic review, Nurse Education Today 117, 105500 (2022), doi:10.1016/j.nedt.2022.105500",
          sourceUrl:
            "https://doi.org/10.1016/j.nedt.2022.105500",
          reasoning:
            "A systematic review finds cultural competence in clinicians is associated with better engagement, adherence, and satisfaction among culturally and linguistically diverse patients; AI systems trained largely on Western medical data struggle with culturally specific presentations and health beliefs, though whether multimodal AI can eventually encode this context is contested.",
        },
      ],
    },
    {
      id: "regulatory-liability",
      title: "Regulatory and Liability",
      short_summary:
        "Who is liable when an AI misdiagnoses? FDA approval timelines and legal frameworks may slow adoption for decades.",
      image_url:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=60",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Healthcare is the most regulated industry in the world for good reason. FDA approval for AI diagnostic tools is slow, expensive, and currently treats each narrow application as a separate device. Medical liability law assumes a human standard of care, and no legal framework exists for autonomous AI treatment decisions. Insurance companies, hospital systems, and medical boards all create institutional friction. Even if AI were technically ready tomorrow, regulatory and legal barriers would delay widespread autonomous deployment by decades.",
      proponent_rebuttal:
        "The FDA has already approved over 950 AI-enabled medical devices and is developing adaptive regulatory frameworks for continuously learning algorithms. The EU AI Act creates clear risk categories for medical AI. Liability can follow existing product liability law: if the AI is a medical device, the manufacturer is liable. The real question is whether regulatory delay is ethical when AI could prevent thousands of diagnostic errors annually. Regulatory frameworks adapt to technology, as they did for telemedicine, electronic health records, and robotic surgery. The pace of regulatory modernization is accelerating, not stagnating.",
      crux: {
        id: "regulatory-timeline-analysis",
        title: "The Regulatory Pathway Feasibility Analysis",
        description:
          "Determine whether existing or evolving regulatory frameworks can approve autonomous AI diagnostic systems within a 10-year window.",
        methodology:
          "Analyze current FDA approval timelines for AI/ML medical devices. Model projected timelines for autonomous (non-physician-supervised) AI diagnostics under existing vs. proposed regulatory frameworks. Survey legal scholars on liability framework readiness. Interview hospital risk officers on institutional adoption barriers.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (regulatory analysis + legal scholarship + stakeholder interviews)",
        falsification: {
          supporter_flip:
            "If analysis showed regulators won't approve autonomous (unsupervised) AI diagnosis within a decade — because liability has no clear home and risk officers won't adopt it — the 'fundamental disruption within 10 years' timeline would be wrong regardless of raw accuracy.",
          skeptic_flip:
            "A skeptic who says regulation will block it forever should weigh that the FDA has already cleared 950+ medical-AI devices and is building adaptive frameworks for learning algorithms, and that regulation adapted fast to telemedicine and robotic surgery — so 'regulators will never allow it' overstates the barrier.",
          common_ground:
            "Both sides agree every FDA-cleared medical AI to date is assistive (human-supervised), and that liability for an autonomous AI's errors is still legally unsettled.",
          live_disagreement:
            "Whether regulators and liability law will permit autonomous, unsupervised AI diagnosis within ~10 years, or impose a much longer lag that keeps a physician in the loop — which tracking approval pathways and liability rulings would reveal.",
        },
      },
      evidence: [
        {
          id: "fda-approvals-accelerating",
          title: "FDA AI Device Authorizations Are Accelerating",
          description:
            "The FDA had authorized roughly 1,000 AI/ML-enabled medical devices by late 2024 (882 listed through March 2024), with annual authorizations rising sharply, signaling growing regulatory comfort with medical AI.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source:
            "FDA — Artificial Intelligence-Enabled Medical Devices (official authorized-device list, updated 2024)",
          sourceUrl:
            "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices",
          reasoning:
            "Strong, primary-source evidence of regulatory momentum, but nearly all authorizations are for physician-assist/narrow tools cleared via 510(k), not autonomous systems, so directness to 'AI replacing doctors' is limited.",
        },
        {
          id: "telemedicine-precedent",
          title: "Telemedicine Regulatory Barriers Fell Rapidly",
          description:
            "Under 1135 waiver authority, CMS dismantled long-standing geographic and originating-site restrictions on Medicare telehealth within weeks of the March 2020 emergency declaration, showing decades of regulatory friction can collapse when urgency demands it.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 5,
          },
          source:
            "CMS — Medicare Telemedicine Health Care Provider Fact Sheet (March 17, 2020); 1135 waiver / Coronavirus Preparedness and Response Supplemental Appropriations Act",
          sourceUrl:
            "https://www.cms.gov/newsroom/fact-sheets/medicare-telemedicine-health-care-provider-fact-sheet",
          reasoning:
            "Primary CMS source documents the rapid waiver of telehealth restrictions, establishing precedent for fast regulatory change, but telemedicine still involves human physicians making decisions, so it does not directly show autonomous-AI approval can be fast-tracked.",
        },
        {
          id: "liability-gap",
          title: "No Legal Framework for Autonomous AI Medical Decisions",
          description:
            "Current medical malpractice law requires a human physician as the standard of care. No jurisdiction has established clear liability rules for fully autonomous AI treatment decisions.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source:
            "Price, Gerke & Cohen, 'Potential Liability for Physicians Using Artificial Intelligence,' JAMA 322(18), 1765-1766 (2019), doi:10.1001/jama.2019.15064",
          sourceUrl: "https://doi.org/10.1001/jama.2019.15064",
          reasoning:
            "This JAMA Viewpoint maps malpractice liability against the existing human standard of care, confirming the absence of a settled framework for autonomous AI decisions; closing the gap likely requires legislative or case-law development, which historically takes years.",
        },
        {
          id: "institutional-resistance",
          title: "Medical Institutions Resist Disruptive Change",
          description:
            "Hospital systems, medical boards, insurance companies, and physician unions have strong incentives to maintain the physician-centric model. Even with federal HITECH incentives, office-based physician EHR adoption climbed from 42% in 2008 to 88% (any EHR) by 2021 — a multi-decade diffusion despite clear benefits.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "ONC / CDC National Electronic Health Records Survey — Office-based Physician EHR Adoption (42% in 2008 to 88% any-EHR by 2021)",
          sourceUrl:
            "https://www.healthit.gov/data/quickstats/office-based-physician-electronic-health-record-adoption",
          reasoning:
            "Government survey data confirms healthcare technology diffusion spans well over a decade even with strong financial incentives; this is a precedent-based analogy to AI adoption, not a direct measure of resistance to autonomous AI specifically.",
        },
      ],
    },
  ],
};
