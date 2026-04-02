export const aiJobDisplacementData = {
  id: "ai-job-displacement",
  title: "Will AI Replace Most White-Collar Jobs?",
  meta_claim:
    "Artificial intelligence and large language models will eliminate or fundamentally transform the majority of white-collar knowledge work within the next decade.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Technical Capability & Task Automation
    // =========================================================================
    {
      id: "technical-capability",
      title: "Technical Capability & Task Automation",
      short_summary:
        "Large language models can now draft legal briefs, write code, analyze medical images, and produce financial reports — but they still hallucinate, lack genuine reasoning, and fail at tasks requiring physical presence, nuanced judgment, or novel problem-solving.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "AI's impressive demos mask fundamental limitations. LLMs are sophisticated pattern-matchers, not reasoners. They hallucinate confidently, fabricating citations and legal precedents. OpenAI's own research shows GPT-4 scores below 50% on novel mathematical reasoning tasks not in its training data. Self-driving cars, promised by 2020, still cannot operate without geofenced routes. AI coding assistants increase output but also introduce subtle bugs that require human review. The gap between 'automating a demo' and 'replacing a professional in production' is vast — and history shows that gap persists for decades.",
      proponent_rebuttal:
        "The pace of AI capability improvement is unprecedented. GPT-4 passed the bar exam in the 90th percentile, outperformed 90% of humans on the SAT, and can produce publishable code. GitHub Copilot already writes 46% of code for developers who use it. Multimodal models can analyze radiology images with accuracy matching board-certified radiologists. The key insight is not whether AI is perfect today, but that it improves exponentially while human skills remain static. Tasks that required a team of analysts in 2020 now take one person with AI assistance — the economic pressure to adopt is irresistible.",
      crux: {
        id: "novel-task-performance",
        title: "The Novel Task Benchmark",
        description:
          "If AI systems can match human expert performance on genuinely novel professional tasks — not just tasks resembling their training data — then widespread job displacement becomes likely. If performance degrades sharply on out-of-distribution problems, AI will remain a tool rather than a replacement.",
        methodology:
          "Design a benchmark of 500 professional tasks across law, medicine, finance, and engineering that are verifiably absent from public training data (e.g., analyzing newly filed legal cases, diagnosing patients with novel symptom combinations, evaluating startups founded after the model's training cutoff). Compare AI performance against credentialed professionals with 5+ years of experience, scored by independent panels blind to whether the output is human or AI-generated.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Requires creating novel benchmarks, recruiting professional evaluators, and preventing data contamination)",
      },
      evidence: [
        {
          id: "gpt4-bar-exam",
          title: "GPT-4 Passes the Bar Exam in the 90th Percentile (2023)",
          description:
            "OpenAI's GPT-4 scored in the 90th percentile on the Uniform Bar Examination, compared to GPT-3.5's 10th-percentile performance. It also passed the USMLE medical licensing exam and scored 1410/1600 on the SAT. These results demonstrated that LLMs could match or exceed average human performance on credentialing exams that gate entry to white-collar professions.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 9,
            directness: 7,
          },
          source: "OpenAI Technical Report; ABA Journal",
          sourceUrl: "https://arxiv.org/abs/2303.08774",
          reasoning:
            "The bar exam results are independently verifiable and widely replicated by researchers. However, passing a standardized exam is different from practicing law — real legal work involves client relationships, courtroom judgment, and novel argumentation. The source is OpenAI itself, which has incentive to emphasize capability.",
        },
        {
          id: "copilot-code-generation",
          title: "GitHub Copilot Writes 46% of Code for Its Users (2023)",
          description:
            "GitHub reported that its AI coding assistant Copilot was generating 46% of all code for developers who used it, up from 27% at launch. A controlled study by Microsoft Research found developers using Copilot completed tasks 55.8% faster. By 2024, Amazon reported that its internal AI coding tool saved developers an estimated 4,500 developer-years of work in a single year.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 8,
          },
          source: "GitHub Blog; Microsoft Research; Amazon Shareholder Letter 2024",
          sourceUrl: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/",
          reasoning:
            "The productivity statistics come from the companies selling these tools, raising independence concerns. However, the adoption data is corroborated by independent developer surveys. The 46% figure measures code written, not code quality — developers still review and modify AI-generated code extensively.",
        },
        {
          id: "llm-hallucination-rates",
          title: "LLMs Hallucinate at Rates of 3-27% Across Professional Tasks (2024)",
          description:
            "A comprehensive study by the AI research group Vectara found that major LLMs hallucinate — generating plausible but false information — at rates between 3% and 27% depending on the model and task. In legal contexts, a lawyer was sanctioned by a federal judge after submitting a brief containing six fabricated case citations generated by ChatGPT. In medicine, a Stanford study found GPT-4 gave inaccurate treatment recommendations 35% of the time for complex cases.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Vectara Hallucination Index; Mata v. Avianca (SDNY 2023); Stanford HAI",
          sourceUrl: "https://vectara.com/blog/cut-the-bull-detecting-hallucinations-in-large-language-models/",
          reasoning:
            "Hallucination rates are independently measurable and have been replicated across multiple studies. In high-stakes professions like law and medicine, even a 3% error rate is professionally unacceptable. The Mata v. Avianca case is a real federal court sanction. This evidence directly challenges the claim that AI can replace professional judgment.",
        },
        {
          id: "ai-augmentation-not-replacement",
          title: "Historical Pattern: Technology Augments Rather Than Eliminates Professions",
          description:
            "ATMs were predicted to eliminate bank tellers, but teller employment rose 10% from 1980 to 2010 as cheaper branches proliferated. Electronic discovery was predicted to eliminate paralegals, but legal employment grew as e-discovery expanded the scope of litigation. Spreadsheets did not eliminate accountants — the number of accountants in the US grew from 1.1 million in 1980 to 1.4 million in 2020. The Jevons paradox suggests that making a task cheaper increases total demand for the underlying service.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Bureau of Labor Statistics; James Bessen, 'Learning by Doing' (2015); MIT Work of the Future Task Force",
          sourceUrl: "https://economics.mit.edu/sites/default/files/publications/The%20Future%20of%20Work.pdf",
          reasoning:
            "BLS data is independently verified and spans decades. The historical pattern is robust and well-documented. However, critics argue AI is qualitatively different from prior technologies because it automates cognitive rather than physical tasks, making historical analogies potentially misleading.",
        },
        {
          id: "frontier-model-reasoning-leap-2025",
          title: "Frontier Models Achieve Expert-Level Reasoning on Graduate-Level Benchmarks (2025)",
          description:
            "By mid-2025, frontier models including Claude 3.5/4, GPT-4o, and Gemini 2 demonstrated dramatic improvements in multi-step reasoning, long-context analysis, and agentic task completion. Claude 3.5 Sonnet scored 88.7% on the graduate-level GPQA benchmark (compared to domain PhD students at 65%). GPT-4o achieved state-of-the-art results on MATH and MMLU-Pro. These models moved beyond pattern matching to exhibit reliable chain-of-thought reasoning, tool use, and self-correction — capabilities that were considered years away in 2023 forecasts. The qualitative leap in reasoning capability expanded the range of automatable white-collar tasks from routine summarization to complex analysis, research synthesis, and strategic planning.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 8,
          },
          source: "Anthropic Model Card; OpenAI GPT-4o Technical Report; Google DeepMind Gemini 2 Report",
          sourceUrl: "https://arxiv.org/abs/2312.11805",
          reasoning:
            "Benchmark results are independently reproducible and verified by third-party evaluators. The GPQA benchmark was specifically designed to resist memorization by using questions that require genuine graduate-level reasoning. However, benchmark performance on structured problems still differs from real-world professional judgment under ambiguity, time pressure, and incomplete information. Source companies have incentives to emphasize capability gains.",
        },
        {
          id: "cursor-copilot-adoption-2025",
          title: "AI Coding Tools Reach Mainstream Adoption: Cursor and Copilot Transform Software Development (2025)",
          description:
            "By 2025, AI-powered coding tools moved beyond autocomplete to become integral development environments. Cursor, an AI-native IDE, reached over 1 million developers and was valued at $2.5 billion. GitHub Copilot surpassed 1.8 million paying subscribers. A 2025 Stanford study found that developers using AI coding assistants wrote 55-75% more code per day while maintaining equivalent defect rates after an initial learning period. Crucially, these tools began handling entire feature implementations and debugging sessions autonomously, not just line-by-line suggestions. Multiple YC-backed startups shipped products with engineering teams of 2-3 people that would have required 10-15 engineers in 2022.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "Stanford HAI AI Index 2025; GitHub Annual Report; Cursor Blog; Y Combinator Demo Day Data",
          sourceUrl: "https://aiindex.stanford.edu/report/",
          reasoning:
            "Adoption data from GitHub and Cursor is corroborated by independent developer surveys and Stanford research. The productivity gains are measured across large samples. The YC startup data provides compelling anecdotal evidence of dramatic team-size compression. However, smaller teams shipping faster does not necessarily mean fewer total developers — it may mean more software companies are founded. The Jevons paradox may apply: cheaper code production could increase total demand for software.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Labor Market Impact & Economic Evidence
    // =========================================================================
    {
      id: "labor-market-impact",
      title: "Labor Market Impact & Economic Evidence",
      short_summary:
        "Early economic studies show AI is already reshaping hiring patterns and wage structures in knowledge work, but aggregate employment data has not yet shown the mass displacement predicted by some forecasts.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Despite years of AI hype, labor markets tell a different story. US unemployment in knowledge-work sectors remained below 3% through 2024-2025. The Bureau of Labor Statistics projects growth in most white-collar occupations through 2033, including a 23% increase in software developers. Companies like Klarna that announced AI replacing workers later quietly rehired humans when quality dropped. History's worst predictions — Keynes's 15-hour work week, the 1960s automation panic — never materialized. Labor markets adapt through new roles, not mass unemployment.",
      proponent_rebuttal:
        "The displacement is already visible in leading indicators. Tech layoffs in 2023-2024 eliminated over 400,000 jobs, and many companies explicitly cited AI as the reason for not backfilling positions. Chegg's stock fell 98% as students switched to ChatGPT. The freelance writing market saw rates drop 30-50% within a year of ChatGPT's release. Goldman Sachs estimates 300 million full-time jobs globally could be automated by generative AI. The lag between capability and displacement is typically 5-10 years — we are in year two. The true impact will arrive with the next generation of AI agents that can execute multi-step workflows autonomously.",
      crux: {
        id: "employment-displacement-timeline",
        title: "The Employment Displacement Timeline Test",
        description:
          "If AI-driven job displacement is real, we should see measurable declines in employment or wages in the most exposed occupations (legal research, financial analysis, coding, copywriting, translation) within 3-5 years, even as aggregate employment remains stable. If these occupations instead see growth or stable wages, the displacement thesis is wrong.",
        methodology:
          "Track employment levels, median wages, and job posting volumes for the 20 occupations most exposed to AI (as classified by the Brookings Institution and OpenAI exposure indices) from 2023 to 2028. Compare against 20 matched control occupations with low AI exposure. Control for macroeconomic conditions using difference-in-differences regression with pre-treatment trends.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Longitudinal labor market analysis using BLS, LinkedIn, and Indeed data)",
      },
      evidence: [
        {
          id: "goldman-300m-estimate",
          title: "Goldman Sachs Estimates 300 Million Jobs Globally Exposed to AI Automation (2023)",
          description:
            "A Goldman Sachs research report estimated that generative AI could expose 300 million full-time jobs to automation globally, with two-thirds of US occupations having at least some tasks automatable by AI. The report estimated 25-50% of work in administrative, legal, and financial occupations could be automated. However, it also projected that AI could increase global GDP by 7% over a decade through productivity gains.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Goldman Sachs Global Economics Research",
          sourceUrl: "https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent",
          reasoning:
            "Goldman Sachs is a reputable financial institution, but its estimates are projections based on task-level exposure analysis, not observed displacement. The methodology counts tasks that AI could theoretically perform, not tasks that will actually be automated given institutional, legal, and quality constraints. The same report notes AI will also create new jobs.",
        },
        {
          id: "chegg-stock-collapse",
          title: "Chegg Stock Falls 98% as Students Switch to ChatGPT (2023-2024)",
          description:
            "Education technology company Chegg saw its stock price collapse from $30 to under $1 between early 2023 and late 2024 after CEO Dan Rosensweig acknowledged that ChatGPT was directly impacting customer growth. Chegg had 7.7 million subscribers providing homework help and tutoring. The company laid off 23% of its workforce in 2023. This became a canonical example of AI displacing an entire business model built on knowledge work.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "Chegg Q1 2023 Earnings Call; Bloomberg; SEC filings",
          sourceUrl: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001364954",
          reasoning:
            "Stock price and subscriber data are independently verifiable through SEC filings. The CEO's own attribution of the decline to ChatGPT is a strong admission against interest. However, Chegg is a specific case of a low-moat business built on easily automatable tasks — it may not generalize to complex professional work.",
        },
        {
          id: "bls-occupation-growth",
          title: "BLS Projects Growth in Most White-Collar Occupations Through 2033",
          description:
            "The Bureau of Labor Statistics' 2023-2033 Occupational Outlook Handbook projects employment growth in most knowledge-work categories: software developers (+25%), financial analysts (+8%), management analysts (+10%), lawyers (+8%), and medical scientists (+7%). Only a handful of white-collar occupations — such as data entry clerks (-34%) and some bookkeeping roles — show projected declines. The projections were made after the release of ChatGPT and account for expected AI adoption.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Bureau of Labor Statistics, Occupational Outlook Handbook 2023-2033",
          sourceUrl: "https://www.bls.gov/ooh/",
          reasoning:
            "BLS projections are the gold standard for labor market forecasting, produced by an independent statistical agency with a multi-decade track record. However, BLS models are inherently conservative and may underestimate the impact of a technology as disruptive as generative AI. The projections assume gradual adoption, not the rapid deployment seen with ChatGPT.",
        },
        {
          id: "freelance-rate-collapse",
          title: "Freelance Writing and Translation Rates Drop 30-50% Post-ChatGPT (2023-2024)",
          description:
            "Analysis of freelance platforms including Upwork, Fiverr, and Freelancer.com showed that rates for content writing, copywriting, and translation services dropped 30-50% within 18 months of ChatGPT's release. Job postings for freelance writers on Upwork fell 33% year-over-year in 2023. Meanwhile, postings requiring AI prompting skills increased 1,000%. The International Association of Professional Translators reported members experiencing 40% revenue declines.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "Bloomberg; Upwork Annual Report 2023; Freelancer.com Market Data",
          sourceUrl: "https://www.bloomberg.com/news/articles/2023-12-20/ai-is-already-taking-jobs-in-writing-and-coding",
          reasoning:
            "Freelance platform data is observable and multiple sources corroborate the trend. This represents real wage displacement in a concrete knowledge-work category. However, freelance content writing may be among the most vulnerable occupations — generalizing from this to all white-collar work is a stretch.",
        },
        {
          id: "tech-layoffs-ai-efficiency-2025",
          title: "Major Companies Cut Workforce Citing AI Efficiency Gains (2024-2025)",
          description:
            "Throughout 2024-2025, a pattern emerged of companies explicitly linking workforce reductions to AI capabilities. Duolingo laid off 10% of its contractors in January 2024, with CEO Luis von Ahn stating AI could now handle content creation. UPS eliminated 12,000 jobs in 2024, citing AI-driven logistics optimization. Dropbox cut 16% of its workforce, with CEO Drew Houston explaining that AI required 'different skills.' IBM paused hiring for approximately 7,800 back-office roles that could be replaced by AI. By Q2 2025, a Bloomberg analysis found that S&P 500 companies mentioning 'AI efficiency' in earnings calls had reduced headcount by an average of 8% while increasing revenue per employee by 14%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Bloomberg; SEC Earnings Transcripts; Layoffs.fyi; Company Press Releases",
          sourceUrl: "https://layoffs.fyi/",
          reasoning:
            "Layoff data is independently verifiable through SEC filings and press releases. CEO statements explicitly attributing cuts to AI are admissions against interest in terms of employee relations. The Bloomberg analysis of S&P 500 earnings calls provides systematic evidence across industries. However, companies may cite AI as a socially acceptable justification for cuts driven by other factors like post-pandemic correction or macroeconomic conditions.",
        },
        {
          id: "upwork-fiverr-ai-impact-2025",
          title: "Freelancer Platforms Report Structural Shift: Creative and Coding Jobs Down, AI-Adjacent Roles Surge (2025)",
          description:
            "Upwork's 2025 annual report revealed that traditional freelance categories — content writing, basic graphic design, simple web development, and translation — saw posting volumes decline 40-60% from 2022 levels. Fiverr reported that average prices for writing gigs fell 45% while order volume dropped 30%. However, both platforms reported explosive growth in AI-adjacent categories: AI integration consulting (+340%), prompt engineering (+280%), and AI-assisted video production (+200%). Upwork's CEO noted that the platform's gross services volume remained stable because higher-value AI-augmented work offset losses in commoditized tasks. The data suggests AI is restructuring freelance work rather than eliminating it entirely, but the transition is devastating for workers in displaced categories.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "Upwork Annual Report 2025; Fiverr Q4 2024 Earnings; Bloomberg Analysis",
          sourceUrl: "https://www.upwork.com/research",
          reasoning:
            "Platform data from Upwork and Fiverr represents real marketplace activity with millions of transactions, providing high directness. Both companies are publicly traded with audited financials. The data clearly shows displacement in specific categories, supporting the 'for' side. However, the simultaneous growth in AI-adjacent roles partially supports the augmentation thesis — suggesting restructuring rather than net elimination. Workers in declining categories may lack the skills to pivot to growing ones.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Institutional Barriers & Adoption Constraints
    // =========================================================================
    {
      id: "adoption-barriers",
      title: "Institutional Barriers & Adoption Constraints",
      short_summary:
        "Even if AI is technically capable, regulatory requirements, liability concerns, organizational inertia, and trust deficits may slow adoption far below what pure capability would predict.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Technology adoption in regulated professions is governed by institutional constraints, not just capability. Licensed professionals in law, medicine, finance, and engineering operate under regulatory frameworks that require human accountability. The EU AI Act prohibits fully automated high-risk decisions in employment, credit, and healthcare. Medical malpractice law requires a licensed physician to be responsible for diagnoses. The American Bar Association requires lawyers to supervise AI-generated work. Even in unregulated domains, enterprise AI adoption rates remain below 20% at most companies due to data privacy concerns, integration costs, and change management failures. The gap between 'AI can do this' and 'organizations will let AI do this' is measured in decades.",
      proponent_rebuttal:
        "Institutional barriers are real but temporary. Regulations adapt to technology — telemedicine was illegal in most states until COVID-19 made regulators change rules overnight. Financial firms adopted algorithmic trading despite initial regulatory resistance, and algorithms now execute 70% of all equity trades. The competitive pressure is overwhelming: a law firm using AI to review documents 100x faster than rivals either forces industry adoption or makes non-adopters uncompetitive. Enterprises like JPMorgan, Deloitte, and McKinsey are already deploying AI agents that handle entire workflows. The question is not whether adoption will happen, but whether it takes 5 years or 15.",
      crux: {
        id: "regulatory-adoption-speed",
        title: "The Regulatory Adoption Speed Test",
        description:
          "The core question is whether regulatory and institutional frameworks will adapt fast enough to allow AI to replace human professionals within a decade, or whether these barriers will create a multi-decade adoption lag similar to electronic health records (which took 30 years to reach 80% adoption). If regulated industries adopt AI decision-making faster than historical precedent for comparable technologies, displacement will be rapid; if not, the 'next decade' timeline is wrong.",
        methodology:
          "Track the regulatory status of AI-autonomous decision-making across five regulated domains (medicine, law, financial advice, auditing, engineering) in the US, EU, and UK from 2024 to 2034. Measure the percentage of licensed professional tasks that regulators permit AI to perform without human supervision. Compare adoption curves against historical analogues (EHR adoption, algorithmic trading adoption, telemedicine legalization).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Multi-year regulatory tracking study across five jurisdictions and five professions)",
      },
      evidence: [
        {
          id: "eu-ai-act",
          title: "EU AI Act Restricts Autonomous AI in High-Risk Domains (2024)",
          description:
            "The European Union's AI Act, adopted in March 2024, classifies AI systems used in employment decisions, credit scoring, law enforcement, and healthcare as 'high-risk' and requires human oversight, transparency, and risk assessment. Fully autonomous AI decision-making is prohibited in these domains without human-in-the-loop safeguards. Violations carry fines up to 7% of global annual revenue. The regulation affects any company serving EU citizens, creating a global compliance baseline.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source: "European Parliament; EUR-Lex Official Journal of the EU",
          sourceUrl: "https://eur-lex.europa.eu/eli/reg/2024/1689",
          reasoning:
            "The EU AI Act is binding legislation with clear enforcement mechanisms. It directly prevents fully autonomous AI from replacing humans in high-risk professional contexts. However, 'human oversight' may mean minimal review rather than deep expertise, potentially allowing AI to do most of the work while a human rubber-stamps the output.",
        },
        {
          id: "enterprise-adoption-rates",
          title: "Enterprise AI Adoption Remains Below 20% for Most Companies (2024)",
          description:
            "McKinsey's 2024 Global AI Survey found that while 72% of companies had adopted AI in at least one business function (up from 50% in 2022), most deployments were pilots or limited applications. Only 15-20% of companies had scaled AI across multiple business units. Top barriers included data quality issues (cited by 46% of respondents), lack of skilled personnel (37%), integration with existing systems (35%), and regulatory uncertainty (28%). The survey covered 1,600 organizations across industries.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "McKinsey Global AI Survey 2024",
          sourceUrl: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          reasoning:
            "McKinsey surveys are large-scale and widely cited, though McKinsey also sells AI consulting services. The finding that 80% of companies have not scaled AI adoption suggests significant institutional inertia. However, the rapid increase from 50% to 72% awareness suggests the curve is steepening.",
        },
        {
          id: "jpmorgan-ai-deployment",
          title: "JPMorgan Deploys AI Agents Handling Work of 300,000+ Hours Annually (2024)",
          description:
            "JPMorgan Chase deployed an AI contract analysis tool called COiN that reviews commercial loan agreements in seconds — work that previously required 360,000 hours of lawyer and loan officer time annually. The bank invested $15.3 billion in technology in 2024 and employed 2,000+ AI/ML engineers. CEO Jamie Dimon stated that AI could eventually impact 'every single job' at the bank. Despite this, JPMorgan's total headcount grew to 313,000 in 2024, suggesting AI enabled expansion rather than contraction.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "JPMorgan Chase Annual Report 2024; Bloomberg; Harvard Business Review",
          sourceUrl: "https://www.jpmorganchase.com/ir/annual-report",
          reasoning:
            "JPMorgan is the largest US bank and a first-mover in AI adoption. The 360,000-hour figure is substantial and demonstrates real capability. However, the fact that total headcount grew suggests the bank redeployed workers rather than eliminating positions — supporting augmentation over replacement.",
        },
        {
          id: "stanford-mit-augmentation-evidence-2025",
          title: "Stanford/MIT Studies Find AI Augmentation Boosts Productivity 20-40% Without Net Job Losses (2025)",
          description:
            "A series of rigorous studies from Stanford and MIT in 2024-2025 examined actual workplace AI deployment rather than hypothetical task exposure. Erik Brynjolfsson's Stanford Digital Economy Lab study of 5,000 customer service agents found AI tools increased productivity by 14% on average, with the largest gains (35%) for novice workers. MIT economists Daron Acemoglu and David Autor's 2025 analysis of 500 firms found that AI-adopting companies increased output per worker by 20-40% but reduced headcount by only 5-8% over two years — with most reductions coming through attrition rather than layoffs. Crucially, Acemoglu argued that AI's job impact depends primarily on corporate governance decisions and policy frameworks, not technical capability alone.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "Stanford Digital Economy Lab; MIT Economics Department; NBER Working Papers",
          sourceUrl: "https://digitaleconomy.stanford.edu/",
          reasoning:
            "Stanford and MIT are premier independent research institutions with no financial stake in AI adoption outcomes. Brynjolfsson and Acemoglu are among the most cited economists studying technology and labor markets. The studies use real-world deployment data rather than theoretical exposure models. The finding that productivity gains outpace job losses supports the augmentation thesis, though the 5-8% headcount reduction is non-trivial at economy scale. Acemoglu's emphasis on policy and governance as the determining factor shifts the debate from 'will AI displace?' to 'will we choose displacement or augmentation?'",
        },
        {
          id: "jevons-paradox-software-2025",
          title: "Jevons Paradox in Action: AI-Driven Efficiency Increases Total Demand for Software and Professional Services (2025)",
          description:
            "Despite AI dramatically reducing the cost and time required to build software, total spending on software development grew 18% globally in 2024-2025 according to Gartner. The number of software startups founded increased 35% year-over-year as AI lowered barriers to entry. A 2025 Harvard Business Review analysis found that law firms using AI contract review tools processed 3x more contracts but did not reduce their attorney headcount — instead they expanded into previously uneconomical practice areas. Similarly, accounting firms using AI audit tools took on 40% more clients. This mirrors the Jevons paradox observed with coal in the 19th century: making a resource more efficient increases rather than decreases total consumption, because previously prohibitive use cases become viable.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Gartner IT Spending Forecast 2025; Harvard Business Review; Bureau of Labor Statistics",
          sourceUrl: "https://www.gartner.com/en/newsroom/press-releases",
          reasoning:
            "Gartner's IT spending data is based on extensive industry surveys and is widely cited. The HBR case studies are well-documented. The Jevons paradox is a well-established economic principle with historical precedent. However, the paradox does not always hold — sometimes efficiency gains do reduce total consumption (as with buggy-whip manufacturing). Whether AI-driven efficiency expands or contracts knowledge work depends on the elasticity of demand for knowledge-work outputs, which varies by industry. The evidence is suggestive but not conclusive.",
        },
      ],
    },
  ],
  references: [
    {
      title: "GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models — OpenAI",
      url: "https://arxiv.org/abs/2303.10130",
    },
    {
      title: "The Impact of Artificial Intelligence on the Labour Market — OECD",
      url: "https://www.oecd.org/en/publications/the-impact-of-ai-on-the-labour-market_ea0a0fe1-en.html",
    },
    {
      title: "Generative AI Could Raise Global GDP by 7 Percent — Goldman Sachs",
      url: "https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent",
    },
    {
      title: "The Future of Work: AI, Automation, and the Economy — MIT Task Force",
      url: "https://workofthefuture.mit.edu/research-post/the-work-of-the-future-building-better-jobs-in-an-age-of-intelligent-machines/",
    },
    {
      title: "EU Artificial Intelligence Act — EUR-Lex",
      url: "https://eur-lex.europa.eu/eli/reg/2024/1689",
    },
    {
      title: "Stanford HAI AI Index Report 2025",
      url: "https://aiindex.stanford.edu/report/",
    },
    {
      title: "Navigating the Jagged Technological Frontier — Dell'Acqua et al., Harvard Business School",
      url: "https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7571.pdf",
    },
    {
      title: "The Turing Trap: The Promise and Peril of Human-Like AI — Erik Brynjolfsson, Stanford Digital Economy Lab",
      url: "https://digitaleconomy.stanford.edu/",
    },
    {
      title: "Where Are the AI Jobs? — Daron Acemoglu and David Autor, NBER Working Paper 2025",
      url: "https://www.nber.org/papers/w32596",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is AI automation qualitatively different from previous technological revolutions?",
      content:
        "Every prior automation wave — mechanization, electrification, computerization — displaced physical or routine cognitive tasks while creating new categories of knowledge work. AI targets the knowledge work itself. Does automating cognition break the historical pattern of technology creating more jobs than it destroys, or will new roles emerge that we cannot yet envision?",
    },
    {
      id: "q2",
      title: "Will AI create a two-tier workforce?",
      content:
        "Even if AI does not eliminate jobs outright, it may create a divide between workers who leverage AI to multiply their productivity and those who are replaced by the AI-augmented few. Could we see a future where one AI-augmented lawyer does the work of ten, concentrating income at the top while displacing the rest?",
    },
    {
      id: "q3",
      title: "How should society prepare for potential mass displacement?",
      content:
        "If AI does displace a significant fraction of white-collar work, existing social safety nets are designed for temporary unemployment, not structural economic transformation. Should governments implement universal basic income, AI taxes, mandatory retraining programs, or new forms of work-sharing before displacement occurs — or will premature intervention stifle beneficial adoption?",
    },
    {
      id: "q4",
      title: "Will the Jevons paradox save knowledge-worker jobs?",
      content:
        "When AI makes knowledge work dramatically cheaper and faster, does total demand for that work expand (as happened with ATMs and bank branches, or spreadsheets and accountants), or does demand plateau because the underlying need is finite? The answer likely varies by domain — demand for software may be nearly infinite, while demand for legal contract review may have a ceiling. Identifying which knowledge-work sectors have elastic vs. inelastic demand may be more important than measuring raw AI capability.",
    },
  ],
};
