export const aiInEducationData = {
  id: "ai-in-education",
  title: "AI in Education: Revolution or Risk?",
  question: "Does AI in schools help students learn more than it harms them?",
  meta_claim:
    "AI tutors and chatbots in schools will help students learn more than they harm them, and help the students furthest behind the most, outweighing the risks of cheating and of students letting AI do their thinking.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: Pew's autumn-2025 survey (published February
  // 2026) found about 54% of US teens have used AI chatbots for schoolwork; the
  // strongest trials are still short and single-site (Bastani et al. 2025,
  // Kestin et al. 2025, the World Bank's Nigeria trial).
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In a Pew survey in autumn 2025, 54% of US teens said they have used AI chatbots to get help with schoolwork, and one in ten said they do all or most of their schoolwork with chatbots' help. The best trials so far point both ways. In a Turkish high school, students given an open GPT-4 chatbot for practice later scored 17% lower on exams taken without it. In Nigeria, a six-week after-school programme pairing an AI chatbot tutor with teachers raised learning by about 0.3 standard deviations. The fight is over which of those the ordinary classroom will look like.",
    confidence: 82,
    source:
      "Pew Research Center, 'How Teens Use and View AI' (24 February 2026; survey of US teens, 25 September to 9 October 2025); Bastani et al., PNAS (2025); World Bank (2025)",
    sourceUrl: "https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/",
  },
  simple_case: [
    "The answer shapes what millions of children do with their homework tonight: whether schools give every student an AI tutor, keep chatbots out of assignments, or change tests so the work has to be the student's own.",
    "The sides split over three things: whether students who learn with AI can do the work without it, whether AI tutoring helps the students who are behind or those already ahead, and whether schools use AI to support teachers or to replace them.",
  ],
  aliases: [
    "Will AI in education close achievement gaps and outweigh its risks?",
    "Should AI be used in schools?",
    "Is ChatGPT bad for students?",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Learning with AI, or letting it do the work
    // =========================================================================
    {
      id: "academic-integrity",
      title: "The Thinking: Learning With AI, or Letting It Do the Work?",
      short_summary:
        "AI can give each student feedback, or do the assignment for them. In the best trial so far, an open chatbot raised practice scores and lowered later exam scores taken without it, while a tutor built to give hints avoided the loss. The dispute is whether schools can make the second kind the normal one.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Finishing homework with AI is not the same as learning to do it. In Bastani and colleagues' trial with nearly 1,000 Turkish high-school maths students, those given an open GPT-4 chatbot did better during practice but scored 17% lower than classmates without it on the later exams taken unaided. A tutor built to give hints avoided that loss, but did not produce a measurable gain. Students are not waiting for the well-designed version: in Pew's autumn-2025 survey 54% of US teens said they have used chatbots to help with schoolwork, one in ten said they do all or most of it with chatbots' help, and 59% said using AI to cheat is a regular occurrence at their school. A small MIT preprint found people writing essays with ChatGPT showed weaker brain connectivity and could barely quote what they had written. When the easy path is to let the tool think, most students will take it.",
      proponent_rebuttal:
        "A tutor that guides is a different tool from a chatbot that answers, and the guided kind works. In Kestin and colleagues' randomized trial with 194 Harvard physics students, a purpose-built AI tutor produced higher post-lesson quiz scores than the university's own in-class active learning. In the Turkish trial the skeptics cite, the hint-giving tutor avoided the exam loss entirely; the harm came from handing students an unrestricted chatbot. The lesson is design, not abstinence: ask students to explain, critique and revise what AI gives them, then assess them without it. Banning AI would not stop the 54% of teens already using it; it would only stop schools from teaching them to use it well.",
      crux: {
        id: "ai-cognitive-outsourcing",
        title: "The Cognitive Outsourcing Threshold",
        question:
          "Do students who learn with AI do better or worse when tested without it?",
        description:
          "If students who learn with AI can do less on their own when it is taken away, the net effect on learning is negative, however much better their assisted work looks. The test is how AI-taught students perform against others on assessments where no AI is allowed, both right after learning and months later.",
        methodology:
          "Run a year-long randomized trial with three conditions: (1) no AI access, (2) AI access with structure, where students must explain, critique and revise AI output, and (3) unrestricted AI access. Give closed-book transfer exams each term on deep understanding and new problems, retest retention 6 and 12 months after the course, and measure critical thinking with validated instruments.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A preregistered randomized comparison of structured AI tutoring, unrestricted chatbot use and teaching without AI. Use common unaided transfer tests after learning and several months later, track actual use, and compare results by prior attainment.",
        },
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
          id: "georgia-tech-scaffolded-ai",
          title: "Harvard 2025: a purpose-built AI tutor beat in-class active learning on post-lesson physics quizzes",
          description:
            "Kestin and colleagues studied 194 eligible Harvard introductory-physics students in a randomized crossover trial of two lessons. Students had a purpose-built AI tutor for one lesson and in-class active learning for the other. Post-lesson quiz scores were higher with the AI tutor. This tests short-term mastery with a carefully prepared system, not long-term retention or independent essay writing.",
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
            "A peer-reviewed randomized comparison supports structured AI instruction in this setting. Two lessons at one university cannot establish lasting gains or benefits across subjects and schools. Preparing the tutor also took instructor work.",
        },
        {
          id: "icai-cheating-survey-2024",
          title: "Bastani et al. 2025: an open GPT-4 chatbot raised practice scores but cut later unaided exam scores by 17%",
          description:
            "Bastani and colleagues studied nearly 1,000 mathematics students at one Turkish high school. A general GPT-4 interface improved assisted practice but reduced later unaided exam performance by 17% relative to controls. A teacher-informed tutor that gave hints avoided the measured exam loss, without a statistically detectable gain over controls. The experiment measured short-term learning, not lasting damage or all uses of AI.",
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
            "The preregistered main outcome was an unaided exam, which directly separates assisted performance from learning. One school and four sessions limit how far it generalises, and the guarded tutor's result limits claims that AI inevitably harms learning.",
        },
        {
          id: "pew-teens-schoolwork-2026",
          title: "Pew 2026: 54% of US teens have used AI chatbots for schoolwork; one in ten do all or most of it with them",
          description:
            "In Pew Research Center's survey of 1,458 US teens aged 13 to 17, conducted from 25 September to 9 October 2025 and published on 24 February 2026, 54% said they have used chatbots to get help with schoolwork. 'One-in-ten teens say they do all or most of their schoolwork with chatbots' help,' and 'A majority of teens (59%) think using AI to cheat is a regular occurrence at their school.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 3,
          },
          source: "Pew Research Center, 'How Teens Use and View AI' (24 February 2026)",
          sourceUrl: "https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/",
          reasoning:
            "A national survey showing how widely students already use AI and how normal heavy reliance has become. It measures use and perceptions, not whether students learn less, so it bears on the crux only indirectly.",
        },
        {
          id: "nature-cognitive-decline",
          title: "MIT 'Your Brain on ChatGPT' preprint 2025: weaker brain connectivity when essays were written with ChatGPT",
          description:
            "Kosmyna and colleagues' preprint compared ChatGPT, search-engine and unaided essay writing with EEG and behavioural measures. Fifty-four participants completed the first three sessions; 18 completed a fourth that switched tool conditions. The ChatGPT group showed weaker connectivity, lower reported ownership and difficulty quoting its essays. These measures concern the writing task, not course attainment or lasting cognitive damage.",
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
      ],
    },

    // =========================================================================
    // PILLAR 2: Learning Outcomes & Achievement Gaps
    // =========================================================================
    {
      id: "learning-outcomes",
      title: "The Gap: Does AI Tutoring Help the Students Who Are Behind?",
      short_summary:
        "The hope is a personal tutor for every child, not just those whose parents can pay. A six-week AI tutoring programme in Nigeria raised scores, with girls gaining more. Closing gaps is a separate claim from raising averages: it depends on which students can use the tools, how much each group learns, and whether gains last.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Students cannot benefit from tools they cannot reliably reach. UNESCO's 2023 report put school internet connections at 40% of primary, 50% of lower-secondary and 65% of upper-secondary schools worldwide. A two-school Khanmigo pilot in Puerto Rico ran into unreliable devices, internet and power. The World Bank's own Nigeria team reports that 'Frequent power and internet outages' disrupted its sessions, and its programme paired the chatbot with teachers who guided every session, so the trial does not isolate the chatbot's own effect. Online learning has a history here: Harvard and MIT's free courses drew learners mostly from affluent countries. Higher average scores among students who use a tool do not show that disadvantaged students gain most, or that gaps narrow across a whole school system.",
      proponent_rebuttal:
        "Cheap AI tutoring is already lifting students in places that have never had tutors. In a World Bank randomized trial in Edo State, Nigeria, secondary students who took a six-week after-school programme with an AI chatbot tutor and teacher support gained about 0.3 standard deviations overall, the programme helped all students and not just the top achievers, and girls, who had started behind boys, seemed to gain even more. The more sessions students attended, the more they gained. Earlier adaptive tutoring points the same way: Kulik and Fletcher's review of 50 evaluations found a median effect of 0.66 standard deviations, and in India the Mindspark after-school programme raised maths scores by 0.37 standard deviations in four and a half months. Private tutoring has always been for families who can pay; the Nigeria team says the 'program's low cost and tailored design make it easier to scale than subscription-based software.'",
      crux: {
        id: "ai-achievement-gap-rct",
        title: "The At-Scale Achievement Gap Trial",
        question:
          "Does AI tutoring help disadvantaged students most, or the already advantaged?",
        description:
          "Measure access and learning separately. A programme can raise average scores without narrowing the achievement gap. Compare changes in outcomes between disadvantaged and advantaged groups on the same assessments, including students who could not use the tool. Equal gains alone would not show a narrower gap, or a wider one.",
        methodology:
          "Preregister a multi-year comparison across diverse school districts, randomizing deployment where feasible and choosing the sample by power calculation. Measure usable access as well as outcomes. Compare changes in achievement gaps by prior attainment and socioeconomic background on common unaided assessments, follow students who do not take up the tool, and count the full costs of devices, connectivity and staff support.",
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
            "If independent evaluations found lasting narrowing of achievement gaps, with disadvantaged students getting usable access at an affordable full cost, the concern that the benefits mainly go to students with more resources would weaken.",
          common_ground:
            "Both cases distinguish a higher average score from a smaller achievement gap, and earlier adaptive software from present-day LLM chatbots.",
          live_disagreement:
            "Whether disadvantaged students gain usable access and learn enough more to narrow achievement gaps, and whether that change persists when support is removed.",
        },
      },
      evidence: [
        {
          id: "world-bank-nigeria-rct",
          title: "World Bank, Nigeria 2024: six weeks of AI chatbot tutoring with teachers raised learning by about 0.3 SD",
          description:
            "In June and July 2024, 800 first-year senior secondary students in Edo State attended after-school English classes in computer labs twice a week for six weeks, using Microsoft Copilot with teachers guiding each session. In the World Bank's randomized evaluation, students assigned to the programme outperformed those who were not in English, AI knowledge and digital skills; the gains were 'about 0.3 standard deviations,' the programme 'benefited all students, not just the highest achievers,' and girls, who had trailed boys, 'seemed to gain even more.' 'The more sessions students attended, the greater their gains.' The team lists the long-term effects as an open question.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "World Bank blogs, 'From chalkboards to chatbots: Transforming learning in Nigeria, one prompt at a time' (9 January 2025) and 'From chalkboards to chatbots in Nigeria: 7 lessons to pioneer generative AI for education' (18 September 2024)",
          sourceUrl: "https://blogs.worldbank.org/en/education/From-chalkboards-to-chatbots-Transforming-learning-in-Nigeria",
          reasoning:
            "A randomized trial of an LLM tutor in a low-income setting, the case that matters most for the gap question. It bundles the chatbot with teachers, lasts six weeks, and was reported by the evaluating team before formal publication.",
        },
        {
          id: "its-meta-analysis-2024",
          title: "Kulik and Fletcher 2016: earlier intelligent tutoring systems had a median effect of 0.66 SD",
          description:
            "Kulik and Fletcher reviewed 50 controlled evaluations of intelligent computer tutoring systems. The median score effect was 0.66 standard deviations above conventional instruction. Results depended strongly on whether tests were locally made or standardised, and on how closely they matched the teaching. These were earlier tutoring systems, not trials of today's LLM chatbots.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "Kulik & Fletcher, Review of Educational Research 86(1), 42–78 (2016)",
          sourceUrl: "https://doi.org/10.3102/0034654315581420",
          reasoning:
            "A synthesis showing carefully designed tutoring software can work. The median is not an expected effect for every system, a positive average does not show narrower gaps, and pre-LLM systems are a different intervention.",
        },
        {
          id: "mindspark-india-rct",
          title: "Muralidharan et al. 2019: an after-school Mindspark programme raised Delhi students' maths scores by 0.37 SD",
          description:
            "A lottery offered students free access to a Delhi after-school programme combining 45 minutes of adaptive computer practice with 45 minutes of small-group teaching. After 4.5 months, those offered access scored 0.37 standard deviations higher in maths and 0.23 higher in Hindi than controls. Absolute gains were similar across starting levels; relative gains were larger for weaker students, whose comparison-group progress was much lower.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "American Economic Review; Muralidharan, Singh & Ganimian (2019)",
          sourceUrl: "https://doi.org/10.1257/aer.20171112",
          reasoning:
            "The lottery identifies the effect of the combined programme, not the software alone, and similar absolute gains do not show gaps narrowed. It is earlier adaptive practice with human support, not an LLM chatbot.",
        },
        {
          id: "unesco-digital-divide-2024",
          title: "UNESCO 2023: 40% of primary schools worldwide were connected to the internet",
          description:
            "The 2023 Global Education Monitoring Report put internet connections at 40% of primary schools, 50% of lower-secondary schools and 65% of upper-secondary schools worldwide. These figures describe whether schools are connected, not how reliably. UNESCO named access, governance and teacher preparation as conditions for educational technology to work.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 4,
          },
          source: "UNESCO, Global Education Monitoring Report 2023: Technology in Education",
          sourceUrl: "https://gem-report-2023.unesco.org/",
          reasoning:
            "A global access baseline matters for connected tools, but it is not an evaluation of AI learning outcomes, and offline or phone-based tools need less infrastructure.",
        },
        {
          id: "khanmigo-pilot-2024",
          title: "Khanmigo pilot 2024: two Puerto Rico schools reported benefits and hit device, internet and power problems",
          description:
            "The Estudia Khanmigo report followed implementation in two San Juan schools during 2023-2024. Interviews and observations described useful guided practice and lesson-planning support alongside unreliable devices, internet and electricity. Its student surveys concerned motivation and self-efficacy. Without a comparison group, the pilot cannot identify the tool's effect on attainment or achievement gaps.",
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
            "Evidence of practical access barriers and perceived benefits, not proof the tutor is ineffective. Two selected schools, uneven use and no untreated comparison limit causal conclusions.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Teacher Role & Systemic Implementation
    // =========================================================================
    {
      id: "teacher-role-implementation",
      title: "The Teachers: Support or Replacement?",
      short_summary:
        "AI can cut the time teachers spend preparing lessons. Whether that improves teaching depends on what schools do with the saved time, on training, and on whether districts use the savings to support teachers or to cut them.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Deployment adds work before it saves any, and the savings can be spent on cuts. Schools must pay for training, devices, connections and someone to check what the AI produces. RAND found 67% of low-poverty US districts had offered teachers AI training by autumn 2024, against 39% of high-poverty districts, so the schools serving poorer students are least ready. Harvard and MIT's online courses showed that making something available does not make participation equal. And a district facing a budget gap will be tempted to read 'AI saves teachers time' as 'we need fewer teachers'. Staffing, total workload and student results all need measuring before anyone claims AI frees teachers to teach.",
      proponent_rebuttal:
        "An independently evaluated trial in England found AI cut teachers' preparation time by nearly a third, with no quality difference detected in a sample of their materials. Across 68 English secondary schools, science teachers given ChatGPT and a short guide spent about 56 minutes a week preparing lessons against 81.5 minutes for those without it. Time saved on worksheets can go to students. That supports AI as a teaching assistant, not a replacement. Schools still have to train teachers, check content and decide what to do with the time, and those choices, not the technology, decide whether AI supports or erodes teaching.",
      crux: {
        id: "ai-teacher-complement",
        title: "The Teacher Augmentation vs. Replacement Test",
        question: "Will schools use AI to support teachers or to replace them?",
        description:
          "Teacher support and teacher replacement are distinct choices. Compare actual staffing, workloads, student learning, costs and teacher retention. A saving on lesson preparation does not show schools can cut teachers without harming students, and a training gap does not show AI use must fail.",
        methodology:
          "Compare schools using AI with three models: (1) AI with staffing kept the same, (2) AI with larger classes, and (3) no AI. Measure student outcomes (standardized tests, graduation rates), teacher outcomes (job satisfaction, retention, hours worked) and cost-effectiveness over 3-5 years, with interviews on how AI changes teacher-student contact.",
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
            "Whether schools turn time saved on tasks into better support and sustainable workloads, or use it to justify larger classes and fewer teachers.",
        },
      },
      evidence: [
        {
          // Legacy id retained so saved evidence links keep working.
          id: "new-jersey-pilot",
          title: "NFER 2024: ChatGPT with a guide cut science teachers' lesson preparation by 31%",
          description:
            "A school-randomized trial involved 259 Year 7 and 8 science teachers in 68 English schools, who recorded their time in weekly diaries. Adjusted preparation time for weeks 6-10 was 56.2 minutes a week with ChatGPT and a guide, against 81.5 without generative AI: 25.3 minutes less, or 31%. This covered those lessons, not the whole working week.",
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
            "Missing diary data excluded 18.5% of teachers from the main analysis. Expert reviewers found no quality difference in a small sample of resources, which cannot establish equivalence. The trial did not test pupil attainment, teacher replacement or long-term retention.",
        },
        {
          id: "rand-teacher-preparedness",
          title: "RAND 2025: 48% of US districts had offered AI training by autumn 2024, 39% of high-poverty ones",
          description:
            "RAND's nationally weighted district survey estimated that 48% of US public school districts had offered teachers AI training by autumn 2024. Provision differed by district poverty: 67% in low-poverty districts against 39% in high-poverty districts. The question asked whether training had ever been offered, not its length, attendance or teachers' skill.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source: "Diliberti, Lake & Weiner, RAND RR-A956-31 (April 2025), autumn 2024 survey",
          sourceUrl: "https://www.rand.org/pubs/research_reports/RRA956-31.html",
          reasoning:
            "A survey showing unequal training provision, not a causal effect on learning or staffing. Whether training was offered is not a test of teachers' preparedness.",
        },
        {
          id: "mooc-cautionary-tale",
          title: "Reich and Ruipérez-Valiente 2019: Harvard and MIT online courses drew learners mostly from affluent countries",
          description:
            "Reich and Ruipérez-Valiente's 2019 analysis of Harvard and MIT courses on edX reported low completion over six years, little return after learners' first year, and participation growth concentrated in affluent countries. This concerns particular online-course populations, not present-day AI tutoring.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 3,
          },
          source: "Reich & Ruipérez-Valiente, 'The MOOC Pivot', Science 363 (2019)",
          sourceUrl: "https://tsl.mit.edu/research/the-mooc-pivot/",
          reasoning:
            "A historical warning that availability alone does not ensure equal participation. It is an analogy, not evidence of AI's effect on teaching or learning.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Generative AI without guardrails can harm learning: Evidence from high school mathematics (Bastani et al., PNAS, 2025)",
      url: "https://doi.org/10.1073/pnas.2422633122",
    },
    {
      title: "AI tutoring outperforms in-class active learning: an RCT (Kestin et al., Scientific Reports, 2025)",
      url: "https://doi.org/10.1038/s41598-025-97652-6",
    },
    {
      title: "From chalkboards to chatbots: Transforming learning in Nigeria, one prompt at a time (World Bank, 2025)",
      url: "https://blogs.worldbank.org/en/education/From-chalkboards-to-chatbots-Transforming-learning-in-Nigeria",
    },
    {
      title: "How Teens Use and View AI (Pew Research Center, 24 February 2026)",
      url: "https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/",
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
      title: "Disrupting Education? Experimental Evidence on Technology-Aided Instruction in India (Muralidharan et al., 2019)",
      url: "https://doi.org/10.1257/aer.20171112",
    },
    {
      title: "Mindspark evaluation: program design and results (J-PAL)",
      url: "https://www.povertyactionlab.org/evaluation/disrupting-education-evidence-technology-aided-instruction-india",
    },
    {
      title: "UNESCO Global Education Monitoring Report: Technology in Education (2023)",
      url: "https://gem-report-2023.unesco.org/",
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
      title: "The MOOC Pivot (Reich and Ruipérez-Valiente, 2019)",
      url: "https://tsl.mit.edu/research/the-mooc-pivot/",
    },
    {
      title: "The Two Sigma Problem (Bloom, 1984)",
      url: "https://doi.org/10.3102/0013189X013006004",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Will AI tutoring close or widen the achievement gap?",
      content:
        "Higher average scores do not necessarily mean a smaller achievement gap. What matters is who can use the tools, how much each group of students gains, and whether gains last without help. A 2024 World Bank trial in Nigeria found girls gained more than boys from an AI tutoring programme, but it ran for six weeks with teachers in the room, and earlier adaptive software is a different intervention from today's chatbots.",
    },
    {
      id: "q2",
      title: "How should assessment change in the age of AI?",
      content:
        "A polished take-home answer may not show what a student can do alone, and in Pew's 2025 survey 59% of US teens said using AI to cheat is a regular occurrence at their school. Oral explanations, documented drafts, portfolios and unaided tasks are different ways to assess learning. Their workload, accessibility and fairness need testing; no single format settles every use of AI.",
    },
    {
      id: "q3",
      title: "Does AI use reduce or enhance critical thinking?",
      content:
        "The studies so far concern different tools, subjects and short-term outcomes. Assisted practice, later unaided tests, quizzes right after a lesson and EEG readings answer different questions, and none yet shows a universal effect on critical thinking or lasting harm.",
    },
  ],
};
