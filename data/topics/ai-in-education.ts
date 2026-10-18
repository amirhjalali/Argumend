export const aiInEducationData = {
  id: "ai-in-education",
  title: "AI in Education: Revolution or Risk?",
  question:
    "Will AI in education close achievement gaps and outweigh its risks?",
  meta_claim:
    "AI tutoring systems and large language models in education will democratize high-quality learning and close achievement gaps, outweighing risks of academic dishonesty and reduced critical thinking.",
  status: "contested" as const,
  category: "technology" as const,
  last_updated: "2026-10-18",
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Bloom's 1984 human-tutoring studies found a large advantage over conventional classes: about two standard deviations. Those short studies used testing and corrective feedback, not AI. The live question is whether today's tools produce lasting learning for students who would otherwise be left behind.",
    confidence: 80,
    source:
      "Bloom, The 2 Sigma Problem (Educational Researcher, 1984), studies described on pp. 4-5",
    sourceUrl: "https://journals.sagepub.com/doi/10.3102/0013189X013006004",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Personal tutoring inspires the promise, but an older adaptive practice program, a purpose-built LLM tutor and an unrestricted chatbot are different interventions.",
    "Higher scores in one setting leave open who benefits elsewhere and whether the gains last.",
    "The disagreement concerns access, independent learning, sustained effects and whether AI supports teachers or substitutes for them.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Learning Outcomes & Achievement Gaps
    // =========================================================================
    {
      id: "learning-outcomes",
      title: "Learning Outcomes & Achievement Gaps",
      short_summary:
        "Adaptive tutoring has improved test scores in some studies. Closing achievement gaps is a separate claim: it depends on which students can use the tools, how much each group learns and whether gains last.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Students cannot benefit from tools they cannot reliably access. UNESCO's 2023 report put global school internet connectivity at 40% for primary, 50% for lower secondary and 65% for upper secondary education. These are not low-income-country reliability rates. A two-school Khanmigo pilot in Puerto Rico also encountered device, internet and power barriers. Average learning gains among users do not establish that disadvantaged students benefit most or that gaps narrow across the whole student population.",
      proponent_rebuttal:
        "Individualized feedback need not depend entirely on an expensive private tutor. Kulik and Fletcher's review found a positive median effect across 50 evaluations of earlier intelligent tutoring systems, although results varied by assessment. The Mindspark lottery in urban India also improved scores through an after-school program combining adaptive software and human instruction. These findings support testing affordable tutoring for disadvantaged students. They do not show that today's LLM tutors reproduce Bloom's human-tutoring benchmark or automatically close achievement gaps.",
      crux: {
        id: "ai-achievement-gap-rct",
        title: "The At-Scale Achievement Gap Trial",
        question:
          "Does AI tutoring help disadvantaged students most, or the already advantaged?",
        description:
          "Measure access and learning separately. A program can raise average scores without narrowing the measured achievement gap. Compare changes in outcomes between disadvantaged and advantaged groups on the same assessments, including students who could not access the tool. Uniform gains alone would not show a narrower gap; they would not, by themselves, show a wider one either.",
        methodology:
          "Preregister a multi-year comparison across diverse school districts, randomizing deployment where feasible and choosing the sample through a power calculation. Measure usable access as well as outcomes. Compare changes in achievement gaps by prior attainment and socioeconomic background using common unaided assessments. Follow students who do not take up the tool, track implementation and include the full costs of devices, connectivity and staff support.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A sufficiently powered, multi-year comparison across diverse schools, measuring access, comparable unaided assessments and achievement gaps by prior attainment and socioeconomic background.",
        },
        cost_to_verify:
          "Not costed here; depends on the required sample, access provision and length of follow-up.",
        falsification: {
          supporter_flip:
            "If comparable assessments showed that deployment widened achievement gaps, or left disadvantaged students without usable access, the claim that AI democratizes learning would weaken even if average scores rose.",
          skeptic_flip:
            "If independent evaluations found durable narrowing of achievement gaps, with disadvantaged students receiving usable access at an affordable full cost, the concern that benefits mainly accrue to students with greater resources would weaken.",
          common_ground:
            "Both cases distinguish a higher average score from a smaller achievement gap, and earlier adaptive software from present-day LLM chatbots.",
          live_disagreement:
            "Whether disadvantaged students gain usable access and learn enough more to narrow achievement gaps, and whether that change persists when support is removed.",
        },
      },
      evidence: [
        {
          id: "its-meta-analysis-2024",
          title: "Earlier Intelligent Tutoring Systems Had a Median Effect of 0.66 SD (2016)",
          description:
            "Kulik and Fletcher reviewed 50 controlled evaluations of intelligent computer tutoring systems. The median score effect was 0.66 standard deviations above conventional instruction. Results depended strongly on whether assessments were locally developed or standardized, and on how well tests aligned with instruction. These were earlier tutoring systems, not trials of current LLM chatbots.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Kulik & Fletcher, Review of Educational Research 86(1), 42–78 (2016)",
          sourceUrl: "https://doi.org/10.3102/0034654315581420",
          reasoning:
            "A synthesis supports the potential of carefully designed tutoring software. The median is not an expected effect for every system, and a positive average does not establish narrower socioeconomic gaps. Assessment and implementation differences limit transfer to present-day LLM tools.",
        },
        {
          id: "khanmigo-pilot-2024",
          title: "Two-School Khanmigo Pilot Found Access Barriers and Perceived Benefits (2024)",
          description:
            "The Estudia Khanmigo report followed implementation in two San Juan schools during 2023-2024. Interviews and observations described useful guided practice and lesson-planning support alongside unreliable devices, internet and electrical power. Its student surveys concerned motivation and self-efficacy. Without a counterfactual comparison, this pilot cannot identify the tool's causal effect on attainment or achievement gaps.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 4,
            replicability: 4,
            directness: 5,
          },
          source: "Estudia Khanmigo pilot report (2024), hosted by Digital Promise",
          sourceUrl: "https://digitalpromise.org/wp-content/uploads/2024/09/SRM-Gates-Khanmigo-Report-Final.pdf",
          reasoning:
            "Evidence of practical access barriers and perceived benefits, not proof the tutor is ineffective. Two selected schools, uneven usage and no untreated comparison limit causal conclusions. The findings justify better implementation studies rather than a global claim about the absence of other trials.",
        },
        {
          id: "unesco-digital-divide-2024",
          title: "UNESCO Reported Internet Access in 40% of Primary Schools Worldwide (2023)",
          description:
            "The 2023 Global Education Monitoring Report put internet connectivity at 40% of primary schools, 50% of lower secondary schools and 65% of upper secondary schools worldwide. These figures describe school connection, not connection reliability or a low-income-country subgroup. UNESCO identified access, governance and teacher preparation as conditions for effective educational technology use.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "UNESCO, Global Education Monitoring Report 2023: Technology in Education",
          sourceUrl: "https://gem-report-2023.unesco.org/",
          reasoning:
            "A global access baseline matters for connected tools, but it is not an evaluation of AI learning outcomes. The figures do not show that every school needs the same technology, or that offline adaptive software has identical infrastructure requirements.",
        },
        {
          id: "mindspark-india-rct",
          title: "An After-School Mindspark Program Raised Test Scores in India (2019)",
          description:
            "A lottery offered students free access to a Delhi after-school program combining 45 minutes of adaptive computer practice with 45 minutes of small-group human instruction. After 4.5 months, those offered access scored 0.37 standard deviations higher in math and 0.23 higher in Hindi than controls. Absolute gains were similar across starting achievement levels; relative gains were larger for weaker students whose comparison-group progress was much lower.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "American Economic Review; Muralidharan, Singh & Ganimian (2019)",
          sourceUrl: "https://doi.org/10.1257/aer.20171112",
          reasoning:
            "The lottery identifies the effect of access to the combined program, not software alone. Similar absolute gains do not establish that gaps narrowed. This was earlier adaptive practice with human support, not a trial of an LLM chatbot or smartphone-only delivery.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Academic Integrity & Critical Thinking
    // =========================================================================
    {
      id: "academic-integrity",
      title: "Academic Integrity & Critical Thinking",
      short_summary:
        "AI can offer students individual feedback or do assignments for them. The dispute concerns cheating, academic integrity and cognitive offloading: whether generating essays, solving problems and writing code with a tool helps students develop skills they retain without it.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Finishing homework with AI is different from learning to do it independently. Bastani and colleagues' high-school mathematics experiment found that students given a general GPT-4 interface did better during assisted practice but scored 17% lower than controls on subsequent unaided exams. A guarded tutor avoided that measured loss without producing a detectable exam gain. Separately, Kosmyna and colleagues' small essay-writing preprint reports weaker EEG connectivity and lower ownership with ChatGPT, but it does not establish lasting learning harm. The concern is substitution of answers for practice, not proof that every educational use of AI is harmful.",
      proponent_rebuttal:
        "Structured tutoring can differ from asking a chatbot for answers. Kestin and colleagues' Harvard physics trial found higher post-lesson quiz scores with a purpose-built AI tutor than with in-class active learning. That supports testing carefully designed instruction, not assuming an ordinary chatbot improves every assignment. One approach is to require students to explain, critique and revise AI output, then assess their work without the tool. Short-term results do not yet settle long-term retention, independent essay writing or effects across different schools.",
      crux: {
        id: "ai-cognitive-outsourcing",
        title: "The Cognitive Outsourcing Threshold",
        question:
          "Do students who learn with AI do better or worse when tested without it?",
        description:
          "If AI use in education crosses from augmentation to substitution — meaning students develop less ability to think independently when AI is removed — the net effect on learning is negative regardless of performance gains during AI-assisted tasks. The critical test is whether students who learn with AI perform better or worse than non-AI students on assessments where AI is not available.",
        methodology:
          "Run a longitudinal randomized trial across one academic year. Assign students to three conditions: (1) no AI access, (2) AI access with metacognitive scaffolding (must explain, critique, and revise AI output), and (3) unrestricted AI access. Administer quarterly closed-book transfer exams testing deep conceptual understanding and novel problem-solving. Compare long-term retention at 6 and 12 months post-course. Measure critical thinking skills using validated instruments (e.g., Watson-Glaser, Collegiate Learning Assessment).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "Not costed here; depends on participating institutions, assessment design and follow-up.",
        falsification: {
          supporter_flip:
            "If students using well-designed AI tutoring consistently performed worse on delayed, unaided transfer tests across subjects and schools, the claimed learning benefits would weaken even if assisted homework scores improved.",
          skeptic_flip:
            "If students using structured AI tutoring consistently retained and transferred more knowledge on delayed, unaided assessments across subjects and schools, concerns that it merely replaces practice would weaken.",
          common_ground:
            "Both cases distinguish completing a task with AI from retaining the ability to do it unaided, and unrestricted answer-giving from structured tutoring.",
          live_disagreement:
            "Whether AI-assisted learning carries over to unaided work, how guardrails change that outcome, and whether gains or losses persist beyond a short lesson.",
        },
      },
      // Existing evidence ids keep saved links valid after source corrections.
      evidence: [
        {
          id: "nature-cognitive-decline",
          title: "MIT 'Your Brain on ChatGPT' Study Links LLM Use to Reduced Cognitive Engagement (2025)",
          description:
            "Kosmyna and colleagues' preprint compared ChatGPT, search-engine and unaided essay writing with EEG and behavioral measures. Fifty-four participants completed the first three sessions; 18 completed a fourth session that switched tool conditions. The ChatGPT group showed weaker connectivity, lower reported ownership and difficulty quoting its essays. These measures concern the writing task, not course attainment or lasting cognitive damage.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "Kosmyna et al., arXiv:2506.08872v2 (December 2025 preprint)",
          sourceUrl: "https://arxiv.org/abs/2506.08872v2",
          reasoning:
            "A small, non-peer-reviewed task study, with only 18 participants in the switch session. EEG differences are not a direct measure of retained learning. The findings motivate further study rather than establishing long-term educational harm.",
        },
        {
          id: "georgia-tech-scaffolded-ai",
          title: "Structured AI Tutoring Raised Immediate Physics Quiz Scores (2025)",
          description:
            "Kestin and colleagues studied 194 eligible Harvard introductory-physics students in a randomized crossover trial of two lessons. Students received a purpose-built AI tutor for one lesson and in-class active learning for the other. Post-lesson quiz scores were higher with the AI tutor. This tests short-term mastery with a carefully prepared system, not long-term retention or independent essay writing.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Kestin et al., Scientific Reports 15, 17458 (2025)",
          sourceUrl: "https://doi.org/10.1038/s41598-025-97652-6",
          reasoning:
            "A peer-reviewed randomized comparison supports structured AI instruction in this setting. Two lessons at one university cannot establish lasting gains or benefits across subjects and schools. Preparing the tutor also required instructor work.",
        },
        {
          id: "icai-cheating-survey-2024",
          title: "Unguarded GPT Access Improved Practice but Reduced Unaided Exam Scores (2025)",
          description:
            "Bastani and colleagues studied nearly 1,000 mathematics students at one Turkish high school. A general GPT-4 interface improved assisted practice but reduced subsequent unaided exam performance by 17% relative to controls. A teacher-informed tutor that emphasized hints avoided the measured exam loss, without a statistically detectable gain over controls. The experiment measured short-term learning, not lasting damage or all uses of AI.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Bastani et al., PNAS 122 (26), e2422633122 (2025)",
          sourceUrl: "https://doi.org/10.1073/pnas.2422633122",
          reasoning:
            "The preregistered primary outcome was an unaided exam, directly separating assisted performance from learning. One school and four sessions limit generalization. The guarded tutor's result also limits claims that AI inevitably harms learning.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Teacher Role & Systemic Implementation
    // =========================================================================
    {
      id: "teacher-role-implementation",
      title: "Teacher Role & Systemic Implementation",
      short_summary:
        "AI may reduce time on specific preparation tasks. Whether that improves teaching depends on training, oversight and staffing decisions, and needs evidence about student outcomes as well as teacher workload.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Deployment can add responsibilities rather than simply save time. Schools must account for teacher training, devices, connectivity, oversight and checking AI output. RAND found uneven district training provision by poverty level, although that does not measure teacher competence or prove a learning penalty. Historical MOOC participation patterns also warn that broad availability need not deliver equitable participation. Staffing cuts, total workload and student outcomes need direct measurement.",
      proponent_rebuttal:
        "An independently evaluated trial in English secondary science classes found lower teacher-reported lesson preparation time with ChatGPT and an implementation guide. That supports a specific form of teacher assistance, not removing teachers. Schools could use saved preparation time for direct student support, but whether that happens and improves learning must be checked. Training, content review and full implementation costs still matter.",
      crux: {
        id: "ai-teacher-complement",
        title: "The Teacher Augmentation vs. Replacement Test",
        question: "Will schools use AI to support teachers or to replace them?",
        description:
          "Teacher support and teacher replacement are distinct implementation choices. Compare actual staffing, workloads, student learning, costs and teacher retention. A saving on lesson preparation does not show that schools can cut teachers without harming students, while a training gap does not establish that AI use must fail.",
        methodology:
          "Compare outcomes across schools implementing AI with three models: (1) AI-augmentation with maintained staffing levels, (2) AI with increased student-teacher ratios, and (3) control schools without AI. Measure student outcomes (standardized tests, graduation rates), teacher outcomes (job satisfaction, retention, hours worked), and cost-effectiveness over 3-5 years. Conduct qualitative interviews to understand how AI changes the nature of teacher-student interactions.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A multi-year comparison of matched schools using AI with staffing maintained, using AI with larger classes, or not deploying AI. Measure unaided pupil assessments, total staff work hours, turnover and full implementation costs.",
        },
        cost_to_verify:
          "Not costed here; depends on the number of districts, comparison design and follow-up.",
        falsification: {
          supporter_flip:
            "If independently evaluated deployments increased total workload or reduced student learning and teacher retention after full costs were counted, the case for AI as teacher support would weaken.",
          skeptic_flip:
            "If schools sustained staffing and student outcomes while teachers reliably spent less time on preparation and more on direct support, the case that AI mainly erodes teaching would weaken.",
          common_ground:
            "Both cases distinguish time saved on a task from better learning, and a training policy from demonstrated teacher skill.",
          live_disagreement:
            "Whether schools turn task-level time savings into better support and sustainable workloads, or use them to justify larger classes and fewer teachers.",
        },
      },
      evidence: [
        {
          id: "rand-teacher-preparedness",
          title: "RAND: 48% of Districts Reported Having Offered AI Training (Fall 2024)",
          description:
            "RAND's nationally weighted district survey estimated that 48% of US public school districts had offered teachers AI training by fall 2024. Provision differed by district poverty: 67% in low-poverty districts versus 39% in high-poverty districts. The question concerned whether training had ever been offered, not its duration, attendance or teachers' demonstrated competence.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Diliberti, Lake & Weiner, RAND RR-A956-31 (April 2025), fall 2024 survey",
          sourceUrl: "https://www.rand.org/pubs/research_reports/RRA956-31.html",
          reasoning:
            "A survey identifies unequal reported provision of training, not a causal effect on learning or staffing. Districts' plans for future training are separate from training already provided. Coverage should not be read as a test of teacher preparedness.",
        },
        {
          // Legacy id retained so saved evidence links keep working.
          id: "new-jersey-pilot",
          title: "ChatGPT with a Guide Reduced KS3 Science Preparation Time (2024)",
          description:
            "A school-randomized trial involved 259 Year 7/8 science teachers in 68 English schools. Time was recorded in weekly diaries. Adjusted preparation estimates for weeks 6-10 were 56.2 minutes per week with ChatGPT and a guide, versus 81.5 without generative AI: 25.3 minutes less, or 31%. This covered those lessons, not the entire working week.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Roy et al., NFER evaluation for EEF and the Hg Foundation (December 2024)",
          sourceUrl: "https://www.nfer.ac.uk/publications/chatgpt-in-lesson-preparation-a-teacher-choices-trial/",
          reasoning:
            "Missing diary data excluded 18.5% of teachers from the primary analysis. Expert reviewers detected no resource-quality difference in a small submitted sample, which cannot establish equivalence. The trial did not test pupil attainment, teacher replacement or long-term teacher retention.",
        },
        {
          id: "mooc-cautionary-tale",
          title: "Harvard and MIT MOOC Participation Remained Unequal (2019)",
          description:
            "Reich and Ruiperez-Valiente's 2019 analysis of Harvard and MIT courses on edX reported low completion over six years, little return after learners' first year, and participation growth concentrated in affluent countries. This concerns particular online-course populations and delivery models. It does not measure present-day AI tutoring or establish that every educational technology follows the same path.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source: "Reich & Ruiperez-Valiente, The MOOC Pivot, Science 363 (2019)",
          sourceUrl: "https://tsl.mit.edu/research/the-mooc-pivot/",
          reasoning:
            "A historical warning that availability alone does not ensure equitable participation. This observational course analysis is an analogy for the access question, not direct evidence of AI's effect on school teaching or student learning.",
        },
      ],
    },
  ],
  references: [
    {
      title: "AI tutoring outperforms in-class active learning: an RCT (Kestin et al., Scientific Reports, 2025)",
      url: "https://doi.org/10.1038/s41598-025-97652-6",
    },
    {
      title: "Generative AI without guardrails can harm learning: Evidence from high school mathematics (Bastani et al., PNAS, 2025)",
      url: "https://doi.org/10.1073/pnas.2422633122",
    },
    {
      title: "Your Brain on ChatGPT (Kosmyna et al., arXiv:2506.08872v2, 2025 preprint)",
      url: "https://arxiv.org/abs/2506.08872v2",
    },
    {
      title: "Effectiveness of Intelligent Tutoring Systems: A Meta-Analytic Review (Kulik & Fletcher, 2016)",
      url: "https://doi.org/10.3102/0034654315581420",
    },
    {
      title: "UNESCO Global Education Monitoring Report: Technology in Education (2023)",
      url: "https://gem-report-2023.unesco.org/",
    },
    {
      title: "The Two Sigma Problem (Bloom, 1984)",
      url: "https://doi.org/10.3102/0013189X013006004",
    },
    {
      title: "Disrupting Education? Experimental Evidence on Technology-Aided Instruction in India (Muralidharan et al., 2019)",
      url: "https://doi.org/10.1257/aer.20171112",
    },
    {
      title: "Mindspark evaluation: program design and results (J-PAL)",
      url: "https://www.povertyactionlab.org/evaluation/disrupting-education-evidence-technology-aided-instruction-india",
    },
    {
      title: "Estudia Khanmigo pilot report (2024)",
      url: "https://digitalpromise.org/wp-content/uploads/2024/09/SRM-Gates-Khanmigo-Report-Final.pdf",
    },
    {
      title: "More Districts Are Training Teachers on Artificial Intelligence (Diliberti et al., RAND, 2025)",
      url: "https://www.rand.org/pubs/research_reports/RRA956-31.html",
    },
    {
      title: "ChatGPT in Lesson Preparation: A Teacher Choices Trial (Roy et al., NFER, 2024)",
      url: "https://www.nfer.ac.uk/publications/chatgpt-in-lesson-preparation-a-teacher-choices-trial/",
    },
    {
      title: "The MOOC Pivot (Reich and Ruiperez-Valiente, 2019)",
      url: "https://tsl.mit.edu/research/the-mooc-pivot/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Will AI tutoring close or widen the achievement gap?",
      content:
        "Higher average scores do not necessarily mean a smaller achievement gap. Evaluate who can access the tools, differences in gains between student groups and whether benefits persist without assistance. Earlier adaptive-software studies and modern LLM trials should be distinguished rather than treated as one intervention.",
    },
    {
      id: "q2",
      title: "How should assessment evolve in the age of AI?",
      content:
        "A polished take-home answer may not show what a student can do independently. Oral explanations, process documentation, portfolios and unaided transfer tasks offer different ways to assess learning. Their workload, accessibility and fairness need evaluation; no single format resolves every use of AI.",
    },
    {
      id: "q3",
      title: "Does AI use reduce or enhance critical thinking?",
      content:
        "The cited studies concern different tools, subjects and short-term outcomes. Assisted practice, later unaided tests, immediate lesson quizzes and EEG measures answer different questions. Evidence about these tasks does not establish a universal effect on critical thinking or lasting cognitive harm.",
    },
  ],
};
