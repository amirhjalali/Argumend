import type { Topic } from "@/lib/schemas/topic";

export const aiReplacingDoctorsData = {
  id: "ai-replacing-doctors",
  title: "Will AI Replace Doctors Within a Decade?",
  meta_claim:
    "AI systems will be capable of diagnosing and treating most medical conditions better than human physicians within 10 years, fundamentally disrupting healthcare.",
  status: "contested" as const,
  category: "technology" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "WHO Guidance on AI for Health (2021)",
      url: "https://www.who.int/publications/i/item/9789240029200",
    },
    {
      title:
        "Topol, E. - Deep Medicine: How AI Can Make Healthcare Human Again",
      url: "https://drerictopol.com/portfolio/deep-medicine/",
    },
    {
      title: "FDA Artificial Intelligence and Machine Learning in Software as a Medical Device",
      url: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device",
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
          title: "Google Health AI for Diabetic Retinopathy",
          url: "https://health.google/health-research/imaging-and-diagnostics/",
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
      },
      evidence: [
        {
          id: "radiology-outperformance",
          title: "AI Matches Radiologists in Breast Cancer Screening",
          description:
            "A 2020 Nature study showed AI matched or outperformed radiologists in breast cancer detection on mammograms, reducing false positives by 5.7% and false negatives by 9.4%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "McKinney et al., Nature (2020)",
          reasoning:
            "Published in top-tier journal with large dataset, though real-world deployment results have been more mixed.",
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
          source: "Esteva et al., Nature (2017); Haenssle et al., Annals of Oncology (2018)",
          reasoning:
            "Replicated across multiple labs, though performance drops on darker skin tones due to training data bias.",
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
          source: "Zech et al., PLOS Medicine (2018)",
          reasoning:
            "Directly demonstrates the generalization gap between benchmark performance and real-world deployment.",
        },
        {
          id: "rare-disease-limitations",
          title: "AI Struggles with Rare and Complex Conditions",
          description:
            "Rare diseases (affecting ~400 million people globally) have insufficient training data for AI. Diagnostic odysseys averaging 5-7 years still require expert human pattern recognition.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Global Genes, NORD rare disease statistics",
          reasoning:
            "Data scarcity is a fundamental limitation that more compute alone cannot solve.",
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
      },
      evidence: [
        {
          id: "physician-burnout",
          title: "Physician Burnout Epidemic Degrades Care Quality",
          description:
            "Over 50% of physicians report burnout, which is linked to increased medical errors, reduced empathy, and worse patient outcomes. AI could reduce cognitive load and documentation burden.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Shanafelt et al., Mayo Clinic Proceedings",
          reasoning:
            "Well-documented problem, but AI as solution is indirect and assumes successful integration.",
        },
        {
          id: "ai-chatbot-satisfaction",
          title: "AI Chatbots Show Comparable Patient Satisfaction",
          description:
            "A 2023 JAMA study found that AI chatbot responses to patient questions were rated higher in quality and empathy than physician responses by blinded evaluators.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "Ayers et al., JAMA Internal Medicine (2023)",
          reasoning:
            "Interesting finding but limited to text-based Q&A, not full clinical encounters.",
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
          source: "Kelley et al., PLOS ONE (2014)",
          reasoning:
            "The placebo effect and therapeutic alliance have robust evidence that cannot be fully replicated by machines.",
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
            directness: 7,
          },
          reasoning:
            "AI systems trained on Western medical data struggle with culturally specific presentations and health beliefs.",
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
      },
      evidence: [
        {
          id: "fda-approvals-accelerating",
          title: "FDA AI Device Approvals Are Accelerating",
          description:
            "The FDA approved over 950 AI/ML-enabled medical devices by 2024, with the annual pace of approvals roughly doubling every 2-3 years, signaling growing regulatory comfort with medical AI.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "FDA AI/ML-Based Software as Medical Device database",
          reasoning:
            "Strong evidence of regulatory momentum, though approvals are for physician-assist tools, not autonomous systems.",
        },
        {
          id: "telemedicine-precedent",
          title: "Telemedicine Regulatory Barriers Fell Rapidly",
          description:
            "COVID-19 demonstrated that decades of regulatory barriers to telemedicine could be dismantled in weeks when urgency demanded it, suggesting AI regulation could similarly accelerate.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          reasoning:
            "Precedent exists for rapid regulatory change, but telemedicine still involves human physicians making decisions.",
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
          source: "Price & Cohen, Iowa Law Review (2019)",
          reasoning:
            "Fundamental legal gap that requires legislative action, which historically takes many years.",
        },
        {
          id: "institutional-resistance",
          title: "Medical Institutions Resist Disruptive Change",
          description:
            "Hospital systems, medical boards, insurance companies, and physician unions have strong incentives to maintain the physician-centric model. Electronic health record adoption took over 20 years despite clear benefits.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          reasoning:
            "Historical precedent shows healthcare adoption cycles are far slower than technology development cycles.",
        },
      ],
    },
  ],
};
