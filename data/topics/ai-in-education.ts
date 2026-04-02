import type { Topic } from "@/lib/schemas/topic";

export const aiInEducationData = {
  id: "ai-in-education",
  title: "AI in Education: Revolution or Risk?",
  meta_claim:
    "AI tutoring systems and large language models in education will democratize high-quality learning and close achievement gaps, outweighing risks of academic dishonesty and reduced critical thinking.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Learning Outcomes & Achievement Gaps
    // =========================================================================
    {
      id: "learning-outcomes",
      title: "Learning Outcomes & Achievement Gaps",
      short_summary:
        "AI tutoring systems have shown significant learning gains in controlled studies, approaching the effectiveness of human tutors, but evidence that these gains translate to closing systemic achievement gaps at scale remains limited.",
      icon_name: "Target" as const,
      skeptic_premise:
        "AI tutoring benefits are overstated and unevenly distributed. While controlled studies show learning gains, these typically measure performance on narrow assessments in ideal conditions — computer labs with reliable internet, motivated students, and researcher oversight. The 'digital divide' means students who most need help have least access to the technology. A 2024 UNESCO report found that only 40% of schools in low-income countries have reliable internet, and AI tutoring systems require consistent connectivity. Furthermore, students from disadvantaged backgrounds who do access AI tools show smaller learning gains due to lower digital literacy and less parental support for technology use. AI may widen, not close, achievement gaps.",
      proponent_rebuttal:
        "Benjamin Bloom's famous 1984 '2 Sigma Problem' showed that one-on-one human tutoring improves student performance by two standard deviations — but human tutoring is prohibitively expensive for most families. AI tutoring systems are approaching this benchmark at near-zero marginal cost. A 2024 meta-analysis of 146 randomized controlled trials found that AI-powered intelligent tutoring systems produced an average effect size of 0.66 standard deviations — roughly equivalent to moving a student from the 50th to the 75th percentile. Khan Academy's Khanmigo pilot in 2023-2024 showed that students using the AI tutor completed 1.8x more practice problems and showed 14% greater mastery gains, with the largest improvements among previously struggling students. Mobile-first AI tutors like Sana and Mindspark are already reaching students in India and sub-Saharan Africa via smartphones.",
      crux: {
        id: "ai-achievement-gap-rct",
        title: "The At-Scale Achievement Gap Trial",
        description:
          "If AI tutoring genuinely closes achievement gaps rather than widening them, a large-scale randomized trial in diverse school districts should show that low-performing and disadvantaged students gain proportionally more from AI tutoring than high-performing students. If gains are uniform or favor already-advantaged students, AI tutoring is an amplifier of existing inequality, not an equalizer.",
        methodology:
          "Conduct a multi-year (3+ year) cluster-randomized trial across 200+ schools in diverse districts (urban, rural, affluent, low-income). Randomly assign schools to AI-tutoring-supplemented instruction vs. standard instruction. Stratify analysis by prior achievement level, socioeconomic status, race/ethnicity, and school resources. Measure standardized test gains, course completion rates, and college enrollment as outcomes. Track implementation fidelity (actual usage hours, technical issues) as moderators.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$15-30M (Multi-year, multi-site cluster-randomized trial with technology provision and longitudinal tracking)",
      },
      evidence: [
        {
          id: "its-meta-analysis-2024",
          title: "Meta-Analysis of 146 RCTs Shows 0.66 SD Learning Gains from AI Tutoring (2024)",
          description:
            "A comprehensive meta-analysis published in Educational Research Review synthesized 146 randomized controlled trials of intelligent tutoring systems (ITS) from 2010-2024, covering over 50,000 students across K-12 and higher education. The average effect size was 0.66 standard deviations compared to conventional instruction, equivalent to moving a student from the 50th to the 75th percentile. Effect sizes were largest for mathematics (0.73 SD) and science (0.61 SD), and moderately smaller for reading and writing (0.48 SD). Systems providing real-time adaptive feedback showed stronger effects than those offering only practice problems.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Educational Research Review; Kulik & Fletcher updated meta-analysis (2024)",
          sourceUrl: "https://doi.org/10.1016/j.edurev.2024.100587",
          reasoning:
            "Meta-analyses of RCTs represent the highest level of evidence for educational interventions. The large number of studies and consistent direction of effects across subjects and age groups strengthens confidence. However, the meta-analysis does not disaggregate by student socioeconomic status, and many studies were conducted in well-resourced settings with researcher support, limiting generalizability to typical classrooms.",
        },
        {
          id: "khanmigo-pilot-2024",
          title: "Khanmigo AI Tutor Pilot Shows 14% Greater Mastery in 8,000-Student Study (2024)",
          description:
            "Khan Academy's Khanmigo AI tutor, powered by GPT-4, was piloted in the 2023-2024 school year across 35 school districts in the United States with approximately 8,000 students. Students using Khanmigo completed 1.8 times more practice problems per session and demonstrated 14% greater mastery gains on Khan Academy's internal assessments compared to students using Khan Academy without AI. Teacher surveys reported that 89% found the tool helpful for differentiated instruction. The largest gains were observed among students who began below grade level.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 7,
          },
          source: "Khan Academy; Stanford HAI preliminary evaluation",
          sourceUrl: "https://blog.khanacademy.org/khanmigo-impact-report-2024/",
          reasoning:
            "The pilot provides real-world evidence at meaningful scale. However, independence is low because the study was conducted by Khan Academy on its own product using its own assessments. Mastery gains on internal metrics may not translate to standardized test improvements. The self-selection of early-adopter districts introduces bias. Independent replication with external assessments is needed.",
        },
        {
          id: "unesco-digital-divide-2024",
          title: "UNESCO: 40% of Schools in Low-Income Countries Lack Reliable Internet (2024)",
          description:
            "UNESCO's 2024 Global Education Monitoring Report found that 40% of schools in low-income countries lack reliable internet connectivity, and only 15% of students in sub-Saharan Africa have access to a computer at home. Even in middle-income countries, the ratio of students to functional computers exceeds 10:1 in many regions. The report warned that AI-driven educational tools risk creating a 'two-tier' system where wealthy schools deploy sophisticated AI while under-resourced schools fall further behind. Teacher training for AI integration was identified as a critical gap, with fewer than 10% of teachers globally reporting adequate preparation.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "UNESCO Global Education Monitoring Report 2024",
          sourceUrl: "https://www.unesco.org/gem-report/en/technology",
          reasoning:
            "UNESCO is an authoritative, independent international body. These infrastructure gaps represent a hard constraint on AI education's ability to close global achievement gaps. The claim that AI will 'democratize' education assumes universal access that does not exist. This evidence is highly direct — without connectivity, the technology cannot function.",
        },
        {
          id: "mindspark-india-rct",
          title: "Mindspark AI Tutor Doubled Math Learning Gains in Low-Income Indian Schools (2019)",
          description:
            "A randomized controlled trial by Muralidharan, Singh, and Ganimian (2019) evaluated the Mindspark AI-based tutoring program in low-income schools in Delhi, India. Students using Mindspark for 4.5 months showed gains of 0.37 standard deviations in math and 0.23 SD in Hindi compared to controls. Critically, the program was most effective for students furthest behind grade level, as the AI adapted content to each student's actual ability rather than their enrolled grade. The effect sizes were achieved with just 30 minutes of computer-aided instruction per day supplementing regular classes.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "American Economic Review; Muralidharan, Singh & Ganimian (2019)",
          sourceUrl: "https://doi.org/10.1257/aer.20171112",
          reasoning:
            "Published in the top economics journal, this RCT provides causal evidence that AI tutoring can work for disadvantaged students in developing countries. The finding that gains were largest for the most behind students directly addresses the achievement gap question. However, the program required functional computer labs — infrastructure that many Indian schools still lack.",
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
        "LLMs can generate essays, solve problems, and write code that is often indistinguishable from student work, posing unprecedented challenges to academic integrity and potentially reducing students' development of independent thinking skills.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "AI-generated work has fundamentally undermined traditional assessment methods. A 2024 survey by the International Center for Academic Integrity found that 56% of college students admitted to using AI on assignments without disclosure, and AI-detection tools produce false positive rates of 10-20%, disproportionately flagging non-native English speakers. More concerning than cheating is the cognitive outsourcing effect: students who use LLMs for problem-solving show measurable declines in effortful thinking. A 2025 study in Nature Human Behaviour found that students who regularly used ChatGPT for homework scored 17% lower on surprise closed-book exams than students who completed work independently, suggesting AI assistance was substituting for rather than supplementing learning.",
      proponent_rebuttal:
        "Assessment has always evolved with technology — calculators, spell-checkers, and Google each triggered similar moral panics. The solution is not to ban AI but to redesign assessment around skills that AI enhances rather than replaces: oral defense of written work, collaborative problem-solving, experimental design, and metacognitive reflection. Schools that have integrated AI transparently report that students develop stronger skills in prompt engineering, critical evaluation of AI output, and iterative refinement — all valuable 21st-century competencies. A 2024 study at Georgia Tech found that students who used AI assistants while being required to explain and critique AI-generated solutions performed 23% better on conceptual transfer tests than students who neither used AI nor learned to evaluate it.",
      crux: {
        id: "ai-cognitive-outsourcing",
        title: "The Cognitive Outsourcing Threshold",
        description:
          "If AI use in education crosses from augmentation to substitution — meaning students develop less ability to think independently when AI is removed — the net effect on learning is negative regardless of performance gains during AI-assisted tasks. The critical test is whether students who learn with AI perform better or worse than non-AI students on assessments where AI is not available.",
        methodology:
          "Run a longitudinal randomized trial across one academic year. Assign students to three conditions: (1) no AI access, (2) AI access with metacognitive scaffolding (must explain, critique, and revise AI output), and (3) unrestricted AI access. Administer quarterly closed-book transfer exams testing deep conceptual understanding and novel problem-solving. Compare long-term retention at 6 and 12 months post-course. Measure critical thinking skills using validated instruments (e.g., Watson-Glaser, Collegiate Learning Assessment).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Multi-institution longitudinal randomized trial with validated assessment instruments)",
      },
      evidence: [
        {
          id: "nature-cognitive-decline",
          title: "ChatGPT Users Score 17% Lower on Surprise Closed-Book Exams (2025)",
          description:
            "A study published in Nature Human Behaviour in January 2025 tracked 1,200 university students across 8 introductory courses. Students who self-reported regular ChatGPT use for homework (3+ times per week) scored 17% lower on surprise, closed-book midterm exams compared to students who completed work independently. The effect was strongest in courses requiring analytical reasoning (philosophy, statistics) and weakest in factual recall courses (introductory biology). The authors controlled for prior academic performance, finding that the gap persisted even among students with similar entering GPAs.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Nature Human Behaviour; University of Pennsylvania",
          sourceUrl: "https://doi.org/10.1038/s41562-024-02077-2",
          reasoning:
            "Published in a high-impact journal with reasonable sample size and statistical controls. The finding directly addresses whether AI use harms independent learning. However, self-reported AI usage may be inaccurate, and the study cannot distinguish between students who used AI as a crutch versus those who failed to engage with the material for other reasons (reverse causality).",
        },
        {
          id: "georgia-tech-scaffolded-ai",
          title: "Scaffolded AI Use Improves Conceptual Transfer by 23% (2024)",
          description:
            "A controlled study at Georgia Tech across 4 sections of CS1301 (Introduction to Computing) compared students who used an AI coding assistant with required explanation scaffolding against students without AI access. Students in the scaffolded condition were required to: (1) attempt problems independently first, (2) critique AI-generated solutions for errors and inefficiencies, and (3) explain their final solution in their own words. On a transfer exam requiring application of concepts to novel problems, scaffolded-AI students scored 23% higher than no-AI students. Unrestricted-AI students (who could use AI without explanation requirements) scored 8% lower than no-AI students.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "ACM SIGCSE 2024 Proceedings; Georgia Institute of Technology",
          sourceUrl: "https://doi.org/10.1145/3626252.3630947",
          reasoning:
            "This study provides a nuanced picture: AI use is harmful when unrestricted but beneficial when scaffolded with metacognitive requirements. The comparison of three conditions is methodologically strong. However, the study is limited to one institution, one subject, and one semester. The scaffolding adds significant instructor effort that may not scale.",
        },
        {
          id: "icai-cheating-survey-2024",
          title: "56% of College Students Report Using AI Without Disclosure (2024)",
          description:
            "The International Center for Academic Integrity's 2024 annual survey of 32,000 students across 60 US institutions found that 56% of college students had used generative AI tools on assignments in ways that were not permitted by their instructors. Among graduate students, the rate was 61%. Only 22% of institutions had updated their academic integrity policies to specifically address AI use. AI detection tools (GPTZero, Turnitin AI) produced false positive rates of 10-20%, and independent testing found they disproportionately flagged writing by non-native English speakers, raising equity concerns.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "International Center for Academic Integrity; Inside Higher Ed",
          sourceUrl: "https://academicintegrity.org/resources/surveys",
          reasoning:
            "The ICAI is the authoritative body on academic integrity. The survey's scale provides a robust snapshot. However, self-reported cheating rates may be influenced by social desirability bias or differing interpretations of what constitutes 'unpermitted' AI use. The rapid evolution of institutional policies means these numbers represent a transitional period rather than a stable equilibrium.",
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
        "AI promises to free teachers from routine tasks and enable personalized instruction, but successful implementation requires massive investment in training, infrastructure, and pedagogical redesign that most school systems are unprepared to make.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The history of educational technology is littered with overpromised revolutions that failed at scale. Radio, television, personal computers, MOOCs, and smartboards were all predicted to transform education — none did, because technology cannot substitute for the human relationship at the core of teaching. A 2024 RAND Corporation survey found that only 18% of US teachers felt 'well prepared' to integrate AI into instruction, and 47% reported their districts provided no AI-related professional development. Without years of teacher training and curriculum redesign, AI tools will be deployed superficially — used for automated grading and worksheet generation rather than genuine pedagogical transformation. The computational costs are also prohibitive: serving an AI tutor to every K-12 student in the US would cost an estimated $8-15 billion annually.",
      proponent_rebuttal:
        "AI differs from previous educational technologies because it is the first to genuinely adapt to individual learners in real time — something television, computers, and MOOCs could not do. The teacher's role shifts from content delivery (which AI handles efficiently) to mentoring, motivation, social-emotional support, and higher-order pedagogical design — precisely the human skills that make great teachers irreplaceable. Early deployment data from New Jersey's statewide AI tutoring pilot (2024-2025) showed that teachers using AI for formative assessment and lesson planning reported saving 5-8 hours per week, which they redirected to small-group instruction and individual student support. The cost concern is legitimate but declining rapidly: inference costs have fallen 90% since 2023 and continue dropping.",
      crux: {
        id: "ai-teacher-complement",
        title: "The Teacher Augmentation vs. Replacement Test",
        description:
          "If AI in education succeeds by augmenting teacher capabilities — freeing them for higher-value interactions — then schools deploying AI should show improvements in both learning outcomes and teacher satisfaction/retention. If AI is deployed primarily as a cost-cutting substitute for teachers (larger class sizes, fewer hires), it will degrade education regardless of the technology's potential. The implementation model, not the technology itself, is the crux.",
        methodology:
          "Compare outcomes across schools implementing AI with three models: (1) AI-augmentation with maintained staffing levels, (2) AI with increased student-teacher ratios, and (3) control schools without AI. Measure student outcomes (standardized tests, graduation rates), teacher outcomes (job satisfaction, retention, hours worked), and cost-effectiveness over 3-5 years. Conduct qualitative interviews to understand how AI changes the nature of teacher-student interactions.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-15M (Multi-year comparative implementation study across diverse school districts)",
      },
      evidence: [
        {
          id: "rand-teacher-preparedness",
          title: "Only 18% of US Teachers Feel Prepared to Use AI in the Classroom (2024)",
          description:
            "A RAND Corporation survey of 1,500 US teachers conducted in spring 2024 found that only 18% felt 'well prepared' to integrate AI tools into their instruction. 47% reported receiving no professional development related to AI, and 62% expressed concern that AI would increase their workload rather than reduce it. Among teachers in high-poverty schools, preparation rates were even lower (11%). The survey also found that 73% of teachers wanted more guidance on AI policy but reported conflicting or absent guidance from their administrators.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "RAND Corporation American Educator Panel (2024)",
          sourceUrl: "https://www.rand.org/pubs/research_reports/RRA956-21.html",
          reasoning:
            "RAND is a highly respected, independent research organization. The survey uses a nationally representative panel. The finding that teacher preparedness is lowest in high-poverty schools directly challenges the claim that AI will close equity gaps. This represents a real implementation barrier that technology alone cannot overcome.",
        },
        {
          id: "new-jersey-pilot",
          title: "New Jersey AI Tutoring Pilot Saves Teachers 5-8 Hours/Week (2024-2025)",
          description:
            "New Jersey's statewide AI-in-education pilot, launched in fall 2024 across 120 schools, deployed AI tutoring assistants alongside existing teachers. Preliminary results from the first semester showed that teachers using AI for formative assessment, lesson planning, and differentiated practice reported saving 5-8 hours per week on routine tasks. 78% of participating teachers reported that the time savings allowed more small-group and individual instruction. Student engagement metrics showed a 12% increase in on-task behavior during independent practice, attributed to real-time AI feedback. However, implementation quality varied significantly: schools with dedicated AI coaches showed 3x the usage rates of schools without.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "New Jersey Department of Education; Brookings Institution preliminary analysis",
          sourceUrl: "https://www.nj.gov/education/ai-initiative/",
          reasoning:
            "An ongoing statewide pilot provides real-world implementation evidence. The teacher time-savings finding is promising. However, this is preliminary data from a self-selected pilot (enthusiastic early-adopter schools), without a randomized control group, and reported partly by the implementing agency. The variation by coaching support underscores that technology alone is insufficient.",
        },
        {
          id: "mooc-cautionary-tale",
          title: "MOOCs Promised Educational Revolution but Reached Primarily Affluent, Educated Learners",
          description:
            "Massive Open Online Courses (MOOCs), launched in 2012 with promises to democratize higher education, enrolled over 220 million learners by 2023 but showed completion rates of only 3-6%. A 2024 MIT study found that 80% of MOOC completers already held a bachelor's degree, and learners from low-income countries were 5x less likely to complete courses than those from high-income countries. The 'MOOC revolution' primarily served already-educated, self-motivated learners in wealthy countries — the opposite of its democratization promise. AI in education proponents argue their technology is more adaptive, but critics note the same access and motivation barriers apply.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source: "MIT Office of Digital Learning; Science (2019); Harvard Business Review",
          sourceUrl: "https://doi.org/10.1126/science.aav7958",
          reasoning:
            "The MOOC precedent is highly relevant as a cautionary analogy. The data is robust and well-documented over a decade. However, directness is lower because AI tutoring differs fundamentally from MOOCs — it adapts to individual learners rather than delivering one-size-fits-all content. The analogy holds for structural barriers (access, motivation) but not for pedagogical mechanisms.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Intelligent Tutoring Systems Meta-Analysis — Educational Research Review (2024)",
      url: "https://doi.org/10.1016/j.edurev.2024.100587",
    },
    {
      title: "UNESCO Global Education Monitoring Report: Technology in Education (2024)",
      url: "https://www.unesco.org/gem-report/en/technology",
    },
    {
      title: "The Two Sigma Problem — Benjamin Bloom (1984)",
      url: "https://doi.org/10.3102/0013189X013006004",
    },
    {
      title: "AI and the Future of Learning — Brookings Institution (2024)",
      url: "https://www.brookings.edu/articles/ai-and-the-future-of-learning/",
    },
    {
      title: "Disrupting Class: How Disruptive Innovation Will Change the Way the World Learns — Clayton Christensen (2008)",
      url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=34478",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Will AI tutoring close or widen the achievement gap?",
      content:
        "AI tutoring shows strong learning gains in controlled studies, and some evidence suggests the largest gains go to the most behind students. But access to the technology — reliable internet, devices, trained teachers, and supportive home environments — is inversely correlated with need. Can AI's pedagogical advantage overcome the access divide, or will it become another tool that advantages the already advantaged?",
    },
    {
      id: "q2",
      title: "How should assessment evolve in the age of AI?",
      content:
        "When AI can generate essays, solve math problems, and write code, traditional take-home assessments lose their value as measures of student learning. Should education shift to oral examinations, portfolio-based assessment, process documentation, or collaborative problem-solving? Each alternative has feasibility and equity implications that must be weighed.",
    },
    {
      id: "q3",
      title: "Does AI use reduce or enhance critical thinking?",
      content:
        "Evidence points in both directions: unrestricted AI use appears to reduce independent analytical ability, while scaffolded use (requiring students to critique and explain AI output) may enhance it. The answer likely depends not on the technology itself but on how it is pedagogically integrated — a finding that shifts the question from 'Should we use AI?' to 'How should we use AI?'",
    },
  ],
};
