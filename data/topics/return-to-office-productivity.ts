import type { Topic } from "@/lib/schemas/topic";

export const returnToOfficeProductivityData = {
  id: "return-to-office-productivity",
  title: "Does Return-to-Office Actually Improve Productivity?",
  meta_claim:
    "Mandating return-to-office improves collaboration, innovation, and productivity compared to remote work arrangements.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Productivity Measurement
    // =========================================================================
    {
      id: "productivity-measurement",
      title: "Productivity Measurement",
      short_summary:
        "The central empirical question: is remote work actually less productive, or are organizations measuring productivity incorrectly — conflating presence with output and confusing activity with results?",
      icon_name: "Target" as const,
      skeptic_premise:
        "Claims that RTO improves productivity are largely based on managerial intuition and presence-based metrics rather than rigorous output measurement. Most companies mandating return-to-office cannot point to controlled studies showing their remote workers were less productive — they point to vibes, declining 'engagement scores,' and anecdotal complaints about Slack response times. Stanford economist Nick Bloom's research consistently finds that hybrid workers (2-3 days remote) are equally or more productive than fully in-office workers. A 2024 University of Pittsburgh study of S&P 500 firms found that RTO mandates had no measurable impact on financial performance or productivity metrics. The productivity narrative may be a post-hoc justification for decisions driven by real estate obligations and management control preferences.",
      proponent_rebuttal:
        "While individual task productivity may be comparable remotely, organizations are complex systems where total output depends on coordination, knowledge transfer, and spontaneous problem-solving that are harder to measure but genuinely suffer in distributed settings. Microsoft's internal research on 60,000+ employees found that remote work caused communication networks to become more siloed and static, reducing information flow between teams. Managers aren't imagining the problem — they're observing real degradation in organizational productivity that individual-level metrics miss. The Pittsburgh study measured stock price and profitability, which lag productivity changes by years and are affected by hundreds of confounders. Companies like Amazon, Google, and JPMorgan have access to extensive internal data that informed their RTO decisions — dismissing their conclusions as mere 'vibes' underestimates their analytical sophistication.",
      crux: {
        id: "rto-productivity-rct",
        title: "The RTO Productivity Randomized Trial",
        description:
          "A properly randomized experiment assigning comparable teams within the same organization to fully remote, hybrid, and fully in-office conditions, measuring both individual output and team-level coordination metrics over 12+ months.",
        methodology:
          "Partner with 10+ large firms across industries. Randomly assign matched teams to three conditions: fully remote, hybrid (2-3 days office), and fully in-office. Measure individual output (tasks completed, code commits, deals closed), team coordination (cross-team collaboration frequency, project completion time, error rates), and innovation proxies (new ideas submitted, patents filed). Run for 12 months minimum with quarterly assessments.",
        equation:
          "\\Delta P = P_{in\\text{-}office} - P_{remote} \\pm \\text{selection\\_bias\\_correction}",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-10M (Multi-firm randomized controlled trial with objective productivity instrumentation)",
      },
      evidence: [
        {
          id: "bloom-hybrid-productivity",
          title:
            "Stanford/Bloom: Hybrid Workers Show No Productivity Loss vs. Fully In-Office (2024)",
          description:
            "A six-month randomized controlled trial at Trip.com (Bloom, Han & Liang, published in Nature, June 2024) randomized 1,612 employees in graduate-eligible roles to either 5 days/week in-office or a hybrid schedule (3 days office, remote on Wednesdays and Fridays). Hybrid working reduced quit rates by about one-third (with the largest reductions among non-managers, women, and those with long commutes) and improved job satisfaction, while null-equivalence tests showed no effect on performance grades or promotions over the following two years. Bloom characterizes well-managed hybrid work as close to a 'free lunch' — comparable performance with materially better retention.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Bloom, Han & Liang, Nature 630 (2024) — Trip.com RCT",
          sourceUrl: "https://www.nature.com/articles/s41586-024-07500-2",
          reasoning:
            "Gold-standard RCT from a leading labor economist, published in Nature. The Trip.com study is the strongest causal evidence available, but it tests hybrid (not fully remote) at a single firm in one industry, so external validity and replicability are limited.",
        },
        {
          id: "pittsburgh-sp500-study",
          title:
            "University of Pittsburgh: RTO Mandates Show No Financial Performance Improvement (2024)",
          description:
            "A working paper by Yuye Ding and Mark (Shuai) Ma of the University of Pittsburgh's Katz Graduate School of Business identified S&P 500 firms that issued RTO mandates and used difference-in-differences regressions to estimate their effects. The authors found no significant changes in firm financial performance (profitability) or stock-market valuation after RTO mandates, while employee job-satisfaction ratings (from Glassdoor) declined — particularly on work-life balance and senior management. Their determinant analysis is consistent with managers using mandates to reassert control rather than to improve performance.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Ding & Ma, 'Return-to-Office Mandates' (SSRN working paper, 2024)",
          sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4675401",
          reasoning:
            "Large-scale empirical study with a credible difference-in-differences design, though it is a working paper rather than a peer-reviewed publication, so reliability is moderate. Financial metrics are objective but blunt instruments for productivity — they lag operational changes and have many confounders — so the absence of improvement does not prove remote work is equally productive.",
        },
        {
          id: "microsoft-network-siloing",
          title:
            "Microsoft Research: Remote Work Reduced Cross-Group Collaboration ~25% (2021)",
          description:
            "Microsoft's analysis of communication patterns among 61,000+ employees during the firm-wide shift to remote work (Yang et al., Nature Human Behaviour, 2021) found that collaboration networks became more static and siloed: the share of collaboration time spent with cross-group connections fell by roughly 25% of its pre-pandemic level, synchronous communication dropped while asynchronous rose, and employees added fewer new collaborators. The authors note this may make it harder for a fully remote workforce to acquire and share new information, with possible implications for productivity and innovation — even if individual task output is maintained.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "Yang et al., Nature Human Behaviour (2021) — Microsoft Research",
          sourceUrl: "https://www.nature.com/articles/s41562-021-01196-4",
          reasoning:
            "Published in a top-tier journal with an exceptionally large dataset. However, independence is lower because Microsoft has corporate interests in office-centric tools and later mandated RTO. The study measures communication patterns, not productivity directly — reduced cross-team chatter may or may not translate to reduced output.",
        },
        {
          id: "managers-vs-workers-perception",
          title:
            "Microsoft Work Trend Index: 85% of Leaders Doubt Remote Productivity (2022)",
          description:
            "Microsoft's September 2022 Work Trend Index Pulse Report (a survey of 20,000 people across 11 countries) found that 85% of leaders said the shift to hybrid work made it challenging to be confident employees were being productive, while 87% of employees reported being as or more productive than when working in the office full time. Microsoft labeled this gap 'productivity paranoia' — suggesting RTO pressure may be driven by managerial anxiety about visibility and control rather than objective productivity data.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source: "Microsoft Work Trend Index Pulse Report (September 2022)",
          sourceUrl:
            "https://www.microsoft.com/en-us/worklab/work-trend-index/hybrid-work-is-just-work",
          reasoning:
            "Large-scale survey revealing the perception gap, but it is vendor research from a company that sells workplace productivity tools, and self-reported productivity from employees is unreliable — so independence and reliability are modest. The finding does not prove managers are wrong; it shows a measurement problem on both sides.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Innovation and Serendipity
    // =========================================================================
    {
      id: "innovation-serendipity",
      title: "Innovation and Serendipity",
      short_summary:
        "The 'water cooler effect' hypothesis: does physical co-location generate creative breakthroughs and serendipitous idea exchange that cannot be replicated in distributed teams?",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The strongest argument for in-person work is not routine productivity but innovation — the unexpected conversation in a hallway that sparks a new product idea, the whiteboard session where visual thinking unlocks a solution, the lunch where an engineer and a designer realize their projects overlap. Steve Jobs famously designed Pixar's headquarters to force serendipitous encounters. A 2022 study in Nature found that remote collaboration produced fewer breakthrough ideas than in-person collaboration, with virtual pairs generating 15% fewer creative ideas in a controlled experiment. Innovation is inherently social and embodied — body language, energy, and shared physical context create conditions for creative leaps that video calls flatten.",
      proponent_rebuttal:
        "The serendipity argument is the most romanticized and least empirically supported case for RTO. The Nature study (Lin et al., 2022) tested pairs brainstorming over video vs. in-person for 5 minutes — an artificial setup that doesn't reflect how modern distributed teams actually collaborate using tools like Miro, Figma, and async video. Patent filing rates have not declined during the remote work era. Many of history's greatest innovations emerged from written correspondence (Watson and Crick exchanged letters with Rosalind Franklin), distributed collaboration (Linux, Wikipedia), or solitary deep work (Einstein's miracle year). The 'water cooler' narrative ignores the massive cost of open offices on deep focus work — Cal Newport's research shows knowledge workers lose 2+ hours daily to interruptions in open office environments. Innovation requires both divergent thinking (which benefits from diverse inputs) and convergent deep work (which benefits from quiet, uninterrupted time).",
      crux: {
        id: "serendipity-innovation-measurement",
        title: "The Serendipity-to-Innovation Pipeline Test",
        description:
          "Measuring whether in-person serendipitous encounters actually convert to measurable innovation output at a higher rate than structured remote collaboration, or whether the water cooler effect is a compelling narrative with weak empirical backing.",
        methodology:
          "Instrument office spaces at 20+ firms with interaction tracking (badge sensors, calendar analysis). Measure frequency of unplanned cross-team interactions. Track which interactions lead to new projects, patents, or product features within 12 months. Compare innovation output per interaction for in-person serendipitous encounters vs. structured remote collaboration sessions (virtual brainstorms, cross-team Slack channels, async idea boards).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$3-5M (18-month instrumented workplace study with innovation tracking across 20+ firms)",
      },
      evidence: [
        {
          id: "nature-virtual-creativity",
          title:
            "Nature Study: Virtual Pairs Generate 15% Fewer Creative Ideas (2022)",
          description:
            "Brucks (Columbia) and Levav (Stanford GSB), in Nature (2022), combined a lab study with a field experiment in which a company assigned ~1,490 engineers to ideation pairs collaborating either in person or over videoconference. In-person pairs generated roughly 15% more creative ideas (as rated by independent judges), though virtual pairs were equally effective — possibly more so — at selecting which idea to pursue. The authors attribute the gap to a narrower cognitive focus on screen, which reduces the environmental stimuli that support divergent thinking.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source: "Brucks & Levav, Nature 605 (2022)",
          sourceUrl: "https://www.nature.com/articles/s41586-022-04643-y",
          reasoning:
            "Published in Nature with a rigorous experimental design. However, the 5-minute paired brainstorming task is far removed from real-world innovation processes, which involve weeks of iteration, diverse team input, and deep technical work. The effect size (15%) is modest, and the study did not measure whether the additional ideas were commercially valuable.",
        },
        {
          id: "patent-rates-stable",
          title:
            "USPTO Patent Filings Remained Stable Through Remote Work Era (2020-2024)",
          description:
            "US Patent and Trademark Office statistics show that patent application volumes did not collapse during the large-scale shift to remote work from 2020 onward; annual utility-patent application counts remained in the same broad range (roughly 600,000+ per year) as in the immediate pre-pandemic period. Several remote-first companies (e.g., GitLab, Automattic, Shopify) maintained substantial product output through this era. While patent counts are an imperfect proxy for innovation, the absence of any sharp decline challenges the narrative that remote work was broadly stifling breakthrough work.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 9,
            replicability: 8,
            directness: 3,
          },
          source: "USPTO Patent Statistics (PTMT calendar-year reports)",
          sourceUrl:
            "https://www.uspto.gov/web/offices/ac/ido/oeip/taf/reports.htm",
          reasoning:
            "Objective, publicly available data with high independence. Specific year-over-year figures were de-asserted because counting bases (applications vs. grants, fiscal vs. calendar year) differ across sources and could not be pinned to a single verified number. Patent counts are also a very blunt innovation proxy — filings in 2020-2022 largely reflect pre-pandemic R&D pipelines — so directness is low; the data cannot isolate the effect of remote work from other trends.",
        },
        {
          id: "open-office-interruption-cost",
          title:
            "Workplace Interruptions Carry a ~23-Minute Refocus Cost (Gloria Mark, UC Irvine)",
          description:
            "Gloria Mark's UC Irvine research on information workers documents a substantial 'switch cost' from interruptions: a widely cited figure from this line of work is that people take on average roughly 23 minutes to return to an interrupted task, typically after detouring through intervening tasks. Mark, Gudith & Klocke (CHI 2008) further found people compensate for interruptions by working faster, but at the cost of greater stress, frustration and effort. This is frequently invoked (alongside Cal Newport's work) to argue that the in-office 'serendipity' benefit must be weighed against the real cost interruptions impose on focused, creative deep work.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source:
            "Mark, Gudith & Klocke, 'The Cost of Interrupted Work', CHI 2008 (UC Irvine)",
          sourceUrl: "https://dl.acm.org/doi/10.1145/1357054.1357072",
          reasoning:
            "The ~23-minute refocus figure is a widely replicated, well-attributed finding. However, prior claims of a '30-study meta-analysis' and 'interruptions every 3-5 minutes / 2+ hours lost daily' could not be verified to a specific source and were removed; directness is therefore lowered. The argument also conflates open offices with in-office work generally — private offices and well-designed hybrid spaces could capture serendipity without open-plan interruption costs, and RTO mandates don't necessarily mean open offices.",
        },
        {
          id: "allen-curve-proximity",
          title:
            "The Allen Curve: Communication Frequency Drops Sharply With Distance (Allen 1977; revisited 2014)",
          description:
            "MIT professor Thomas Allen's foundational research (Managing the Flow of Technology, 1977) demonstrated that communication frequency between colleagues falls off steeply with physical distance, with weekly technical communication dropping sharply within roughly the first 50 meters of separation. Later work by Ben Waber, Jennifer Magnolfi and Greg Lindsay (Harvard Business Review, 'Workspaces That Move People', 2014) reported that the pattern persists even with modern email, chat and video tools, applying to both face-to-face and digital communication. This suggests that mere co-location in a large building may be insufficient — close proximity matters most for spontaneous interaction.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source:
            "Thomas Allen, 'Managing the Flow of Technology' (1977); Waber, Magnolfi & Lindsay, HBR (2014)",
          sourceUrl: "https://hbr.org/2014/10/workspaces-that-move-people",
          reasoning:
            "Classic, well-cited research supporting the case that physical proximity uniquely enables communication. The original 50-meter 'critical distance' is well documented; the earlier '~30 meters' precision and a specific '2012' replication date were not confirmed and were corrected to the HBR account. Directness is moderate because the work measures communication frequency, not innovation output — more communication is not necessarily more productive communication.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Employee Retention vs Control
    // =========================================================================
    {
      id: "retention-vs-control",
      title: "Employee Retention vs Control",
      short_summary:
        "Are RTO mandates genuinely about improving organizational outcomes, or are they primarily motivated by real estate obligations, management control preferences, and using attrition as a stealth layoff mechanism?",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "RTO mandates are often a proxy for management control rather than a genuine productivity intervention. Multiple companies have used RTO mandates as a soft layoff strategy — forcing attrition among employees unwilling to return, avoiding severance costs. Amazon's leaked internal communications explicitly discussed using RTO compliance as a workforce reduction tool. Companies with large commercial real estate portfolios have financial incentives to justify office occupancy regardless of productivity data. The timing of RTO mandates correlates more strongly with commercial real estate lease renewals than with any productivity metric. A 2024 BambooHR survey found that 1 in 4 executives and 1 in 5 HR professionals admitted RTO was intended to encourage voluntary turnover.",
      proponent_rebuttal:
        "Attributing RTO mandates entirely to cynical motives ignores legitimate organizational concerns. Company culture — shared values, mentorship, trust — is genuinely harder to build and maintain when employees never meet in person. New hires and junior employees consistently report feeling more isolated and receiving less mentorship in fully remote settings. Gallup data shows that employee engagement peaked with hybrid arrangements (2-3 days in office), not fully remote. The 'stealth layoff' narrative, while sometimes true, doesn't explain why companies continue hiring while mandating RTO. Real estate costs are a factor but represent only 5-10% of most firms' operating expenses — not enough to drive a policy that risks losing top talent. Leadership at companies like Apple and Google genuinely believe that in-person interaction produces better products, based on decades of internal experience.",
      crux: {
        id: "rto-motive-analysis",
        title: "The RTO Motive Decomposition Test",
        description:
          "Separating the stated rationale (productivity, culture, innovation) from revealed preferences (real estate, control, attrition management) by analyzing whether RTO mandate intensity correlates with productivity metrics or with financial and organizational control variables.",
        methodology:
          "Analyze 200+ publicly traded firms that issued RTO mandates. Regress mandate strictness (days required in office) against: (a) pre-mandate remote productivity metrics, (b) commercial real estate obligations as % of operating costs, (c) recent layoff announcements, (d) CEO management style indicators, (e) industry-specific innovation requirements. If real estate costs and layoff timing predict mandate strictness better than productivity metrics, the control/financial motive hypothesis gains support.",
        equation:
          "\\text{RTO}_{strictness} = \\beta_1 P_{remote} + \\beta_2 CRE_{\\%costs} + \\beta_3 L_{layoffs} + \\beta_4 C_{style} + \\varepsilon",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K (Econometric analysis of public company data with supplemental surveys)",
      },
      evidence: [
        {
          id: "bamboohr-stealth-layoff",
          title:
            "BambooHR Survey: 25% of Executives Admit RTO Intended to Drive Turnover (2024)",
          description:
            "A March 2024 BambooHR survey of 1,504 full-time U.S. desk workers (including ~504 HR professionals) found that 25% of VP and C-suite executives, and 18% of HR professionals, admitted they had hoped for some voluntary turnover when implementing an RTO mandate. Separately, 37% of managers, directors and executives believed their organization conducted layoffs in the past year because fewer employees quit during the RTO than expected, and nearly a third (32%) of managers said a main goal of RTO was to monitor employees. 45% of employees reported valuable colleagues had left over RTO mandates.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 8,
          },
          source: "BambooHR 2024 Return to Office Survey",
          sourceUrl:
            "https://www.bamboohr.com/resources/data-at-work/data-stories/2024-return-to-office",
          reasoning:
            "The survey directly addresses RTO motives, giving it high directness. However, BambooHR is an HR-software vendor with an interest in flexible-work narratives, and self-reported survey data on organizational motives has reliability limits, so independence is lowered. The 25% figure is notable but still leaves most executives not citing turnover as a goal.",
        },
        {
          id: "bloom-rto-attrition-cost",
          title:
            "'Brain Drain' Study: RTO Mandates Raise Turnover ~14%, Hitting Senior, Skilled and Female Staff Hardest",
          description:
            "A working paper by Ding, Ma and co-authors ('Return to Office Mandates, Brain Drain and Gender Difference') analyzed LinkedIn employment histories of more than 3 million workers and found that S&P 500 firms experienced roughly a 14% increase in employee turnover after RTO mandates. Departures were concentrated among senior, mid/top-level management and more highly skilled employees, and female employees were about three times more likely to leave than male colleagues. The same firms then took longer to fill vacancies (time-to-hire up ~23%) and saw lower hire rates, implying real replacement and recruiting costs that can offset any productivity gains.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Ding, Ma, Xing, Yang & Jin, 'Return to Office Mandates, Brain Drain and Gender Difference' (SSRN working paper)",
          sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5031481",
          reasoning:
            "Large observational dataset (3M+ LinkedIn profiles) that directly measures post-mandate turnover. It is a working paper rather than peer-reviewed, and LinkedIn-based job histories may misrepresent true skill or seniority, so reliability is moderate. Prior framing here attributed similar findings to a small 12-company Bloom study with specific '33-50%' figures that could not be verified; those were removed in favor of this documented source.",
        },
        {
          id: "gallup-hybrid-engagement",
          title:
            "Gallup (2024): Remote and Hybrid Engagement Are Comparable and Above On-Site",
          description:
            "Gallup's 2024 State of the Global Workplace data (U.S./Canada) shows remote and hybrid workers report similar, relatively high engagement — about 36% for fully remote and 35% for hybrid — both above on-site-only workers. Hybrid workers report the highest rate of 'thriving' wellbeing (62%, vs 59% remote and 50% on-site) and less daily loneliness and anger than fully remote or fully on-site workers. Rather than showing that more office time raises engagement, the data suggests that flexibility (remote or hybrid), not strict full-time RTO, tracks with the best engagement and wellbeing outcomes.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source: "Gallup, State of the Global Workplace 2024",
          sourceUrl:
            "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx",
          reasoning:
            "Gallup is an independent, respected polling organization with very large samples. Prior framing claimed hybrid uniquely peaked at 36% vs remote 29% / in-office 27%; the verified figures instead show remote (~36%) and hybrid (~35%) roughly comparable, with hybrid leading mainly on 'thriving' wellbeing. The corrected reading still undermines strict full-time RTO but no longer singles out hybrid as the engagement peak. Directness is low because engagement is a self-reported proxy, not a productivity measure.",
        },
        {
          id: "cre-lease-correlation",
          title:
            "Hypothesis: Sunk Commercial-Real-Estate Costs May Influence RTO Decisions (Unverified Magnitude)",
          description:
            "A common argument is that firms with large, long-dated office leases face sunk-cost and occupancy-justification pressures that push them toward stricter RTO regardless of productivity data. This is plausible in principle — office utilization and underused space are real cost concerns that vendors like Envoy market analytics to quantify — but we were unable to verify any specific published study establishing that RTO mandate timing correlates with lease-renewal dates, or quantifying how much more likely long-lease firms are to mandate full RTO. The motive remains a hypothesis pending the kind of econometric decomposition described in this pillar's crux.",
          side: "against" as const,
          weight: {
            sourceReliability: 3,
            independence: 4,
            replicability: 3,
            directness: 4,
          },
          source:
            "Commentary / hypothesis — no specific verified study located; magnitude claims removed",
          reasoning:
            "Previously this item asserted an Envoy finding that long-lease (10+ year) firms were '2.3x' more likely to mandate full RTO and that mandate timing correlated with lease renewals. That specific finding could not be located or verified in any primary source, so the quantitative claims were removed and weights lowered substantially. The underlying sunk-cost intuition is reasonable but currently unsubstantiated; the Ding & Ma determinant analysis (see the S&P 500 study) speaks more directly and credibly to RTO motives.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Does Working from Home Work? Evidence from a Chinese Experiment — Nick Bloom, Stanford/NBER",
      url: "https://nbloom.people.stanford.edu/research",
    },
    {
      title:
        "The Effects of Remote Work on Collaboration Among Information Workers — Yang et al., Nature Human Behaviour (2021)",
      url: "https://doi.org/10.1038/s41562-021-01196-4",
    },
    {
      title:
        "Return-to-Office Mandates — Ding & Ma, University of Pittsburgh, Katz Graduate School of Business (SSRN working paper, 2024)",
      url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4675401",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Are we measuring the right kind of productivity?",
      content:
        "Most productivity studies measure individual task completion — lines of code written, emails sent, support tickets closed. But organizational productivity depends on coordination, knowledge transfer, mentorship, and emergent innovation that are much harder to quantify. Are remote work advocates measuring what is easy to count rather than what actually matters for long-term organizational health?",
    },
    {
      id: "q2",
      title:
        "Does the optimal work arrangement vary by role, seniority, and industry?",
      content:
        "The debate is often framed as a universal question — remote vs. in-office — but the answer likely varies dramatically. A senior software engineer doing deep solo work may thrive remotely, while a junior employee learning organizational culture may need in-person mentorship. Should companies adopt role-specific policies rather than blanket mandates?",
    },
    {
      id: "q3",
      title:
        "If RTO mandates don't improve productivity, why are so many major companies implementing them?",
      content:
        "Amazon, Google, JPMorgan, Goldman Sachs, and Meta have all mandated significant in-office time. These are among the most data-driven organizations in the world. Either they are seeing something in their internal data that academic studies miss, or non-productivity factors (real estate, culture, control, signaling) are driving the decisions. Understanding which explanation is correct has major implications for the future of work.",
    },
  ],
};
