export const remoteWorkPermanenceData = {
  id: "remote-work-permanence",
  title: "The Future of Remote Work",
  question:
    "Will remote and hybrid work permanently replace the five-day office week?",
  meta_claim:
    "Remote and hybrid work models will permanently replace traditional 5-day office work for knowledge workers.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "mandates-worker-leverage",
      title: "Office Mandates vs. Worker Leverage",
      short_summary:
        "Whether employers' office mandates or workers' demand for flexibility will set the norm. Whether a mandate makes a team more productive is argued on the map asking \"Do return-to-office mandates improve productivity and innovation?\"; this pillar asks which side has the leverage to make its arrangement stick.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Employers are reasserting the office. Amazon moved to five days in the office from January 2025, and JPMorgan and Goldman Sachs have pushed staff back toward full-time attendance, each citing collaboration, mentorship and culture. Large employers set the terms for millions of jobs, and when hiring slows, workers have fewer outside options to refuse them. On this view the five-day week returns one firm at a time, whatever the research on output says.",
      proponent_rebuttal:
        "A mandate only sticks if the firm can keep and hire the people it wants. A study of more than 3 million LinkedIn histories found S&P 500 firms saw turnover rise about 14% after office mandates, concentrated among senior and highly skilled staff, and took about 23% longer to fill vacancies, so a firm that gives up flexibility pays in quits and recruiting. Remote or hybrid roles were still about 3x their pre-pandemic share of US job postings in late 2024, and employees rank flexibility among their most-valued benefits, sometimes above pay. Firms competing for the same staff can offer what a mandating rival takes away.",
      crux: {
        id: "mandates-vs-worker-leverage",
        title: "Does Worker Demand Outlast Mandates?",
        question:
          "Will workers' demand for remote and hybrid work outlast employers' office mandates?",
        description:
          "Whether firms that require full-time attendance can hold their staff and fill roles, or whether quits, hiring delays and competitors' flexibility push them back to hybrid.",
        methodology:
          "Follow firms that announced full-time office mandates against matched firms that kept hybrid. Track enforcement, quit rates by seniority, time to fill vacancies and the share of each firm's job postings offering remote or hybrid work, through at least one hiring cycle and one downturn.",
        equation:
          "S_{remote} = f(\\text{mandate strictness}, \\text{quit cost}, \\text{labor-market slack})",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Quit rates, time to fill vacancies and remote-posting shares at firms with full-time attendance rules, set against matched hybrid firms through one hiring cycle and one downturn.",
        },
        cost_to_verify: "$2M (Multi-year panel of firms with and without mandates)",
        falsification: {
          supporter_flip:
            "If firms that mandated five office days kept quit rates and hiring times level, and remote or hybrid postings fell back toward their 2.6% pre-pandemic share of US job ads, the case that worker demand keeps the shift permanent would weaken.",
          skeptic_flip:
            "If more studies confirmed the ~14% turnover rise and ~23% longer time-to-hire at S&P 500 firms after mandates, and mandating firms quietly relaxed enforcement while hybrid rivals hired the people they wanted, the view that mandates will restore the five-day week would lose its footing.",
          common_ground:
            "Both sides agree that large employers including Amazon, JPMorgan and Goldman Sachs have pushed staff back toward full-time attendance, and that remote or hybrid postings remain above their pre-pandemic share of US job ads.",
          live_disagreement:
            "Whether mandates hold once quit and hiring costs are counted, or whether workers' preference for flexibility pushes mandating firms back to hybrid.",
        },
      },
      evidence: [
        {
          id: "bloom-stanford-study",
          title: "Stanford/Bloom Study: Remote Workers 13% More Productive",
          description:
            "Nicholas Bloom et al.'s randomized 2015 experiment at Ctrip, a ~16,000-employee Chinese travel agency, found call-center staff working from home had a 13% performance increase (about 9% from more minutes worked per shift, 4% from more calls per minute), took fewer breaks/sick days, and reported higher satisfaction. The setting was a single firm of call-center workers and predates the pandemic.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Bloom, Liang, Roberts & Ying, \"Does Working from Home Work? Evidence from a Chinese Experiment,\" Quarterly Journal of Economics 130(1), 2015",
          sourceUrl: "https://academic.oup.com/qje/article-abstract/130/1/165/2337855",
          reasoning:
            "Gold-standard randomized experiment at scale, but limited to one company and call-center work, and predates the pandemic shift. The original claim's '2022 follow-up confirmed no productivity loss' is removed as unverified.",
        },
        {
          id: "rto-mandate-outcomes",
          title: "Major Companies Mandating Return-to-Office",
          description:
            "Amazon announced in Sept 2024 a five-day in-office mandate effective Jan 2, 2025, with CEO Andy Jassy citing collaboration, learning, and culture. JPMorgan and Goldman Sachs have likewise pushed staff back toward full-time in-office attendance. The companies assert these benefits, but have not published the internal data behind the decisions.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source:
            "Amazon (Andy Jassy update on return-to-office plans, Sept 16, 2024); CNBC reporting",
          sourceUrl:
            "https://www.aboutamazon.com/news/company-news/ceo-andy-jassy-latest-update-on-amazon-return-to-office-manager-team-ratio",
          reasoning:
            "Revealed preferences of major employers, but the asserted productivity/innovation rationale is self-reported and not backed by released data, so independence and directness are lowered. The original claim that Google and Meta mandated 5 days is removed as not cleanly verified (their policies were 3-day hybrid).",
        },
        {
          id: "remote-job-listings",
          title: "Remote Job Listings Settled at ~3x Pre-Pandemic Levels",
          description:
            "Indeed Hiring Lab data show the share of US job postings advertising remote or hybrid work was 7.8% as of October 2024 - down from the 10.4% peak (Feb 2022) but still roughly 3x the 2.6% pre-pandemic level (Jan 2019). This points to a durable structural shift even as some employers mandate return.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Indeed Hiring Lab, November 2024 US Labor Market Update",
          sourceUrl:
            "https://www.hiringlab.org/2024/11/19/november-labor-market-update-remote-work/",
          reasoning:
            "Market-based signal of durable remote work. The original '15% (vs 5% pre-pandemic)' figures were wrong and were corrected to the verified 7.8% current / 2.6% pre-pandemic; the unverified ZipRecruiter co-attribution was dropped.",
        },
        {
          id: "gallup-employee-engagement",
          title: "Gallup: Hybrid Workers Report Highest Engagement",
          description:
            "Gallup's State of the Global Workplace: 2024 data on remote-capable workers found that in the US and Canada, fully remote (36% engaged) and hybrid (35%) employees were close and both ahead of on-site staff, and 62% of hybrid employees said they were 'thriving' versus 59% of remote and about half of on-site workers. The remote-vs-hybrid ranking is narrow and region-dependent, so the result supports flexible arrangements broadly rather than fully remote specifically.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Gallup, State of the Global Workplace: 2024 Report",
          sourceUrl:
            "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx",
          reasoning:
            "Large-scale, independent survey. Directness lowered because engagement is an indirect proxy for the meta-claim and the remote-vs-hybrid ranking is narrow and region-dependent; the headline ~35-36% figures are US/Canada-specific, and global engagement runs lower, so it supports flexible arrangements broadly rather than fully remote per se.",
        },
      ],
    },
    {
      id: "economic-social-dynamics",
      title: "Economic & Social Dynamics",
      short_summary:
        "What a lasting shift away from the office does to cities: vacancies, commercial real estate debt, downtown economies and where people choose to live.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The shift imposes real, concentrated costs. US office vacancy hit a record 19.8% in Q1 2024, over $1 trillion of commercial real estate debt is maturing with the office segment most stressed, and downtown tax bases and service economies that depend on commuters are strained. If cities cannot absorb those costs, the pressure to refill offices grows, and the shift stalls.",
      proponent_rebuttal:
        "These costs are transitional, not permanent. Geographic flexibility lowers housing costs, improves work-life balance, and widens talent pools to previously excluded regions, and cities have repeatedly repurposed obsolete building stock - office-to-residential conversions are accelerating where zoning allows. A stressed CRE sector reflects mispriced legacy assets repricing, not an unsustainable way of working.",
      crux: {
        id: "urban-economic-adaptation",
        title: "Urban Economic Adaptation Timeline",
        question:
          "How quickly can cities adapt to emptier offices through conversions, rezoning and new uses?",
        description:
          "Measuring how quickly urban economies can adapt to reduced office occupancy through conversion, rezoning, and new economic models.",
        methodology:
          "Track commercial-to-residential conversion rates, downtown foot traffic, and new business formation in major US cities. Model equilibrium point where CRE market stabilizes.",
        equation:
          "T_{adapt} = f(\\text{vacancy rate}, \\text{conversion cost}, \\text{zoning flexibility})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Multi-city longitudinal economic study)",
        falsification: {
          supporter_flip:
            "If tracking conversions, downtown foot traffic and new business formation showed major cities failing to absorb emptier offices for years — vacancy stuck near record highs and maturing commercial real estate debt going bad — the costs of the shift would look permanent rather than transitional.",
          skeptic_flip:
            "If office-to-residential conversions spread wherever zoning allows and downtown foot traffic and new business formation recovered while office vacancy fell from its 19.8% Q1 2024 record, downtown decline would look like adaptation to a lasting shift rather than a sign it will reverse.",
          common_ground:
            "Both sides agree US office vacancy hit a record 19.8% in Q1 2024 and that the office segment of commercial real estate is under real stress.",
          live_disagreement:
            "Whether cities can repurpose emptied offices and rebuild downtown economies fast enough to make the costs transitional, or whether strained tax bases and lost commuter spending leave lasting damage.",
        },
      },
      evidence: [
        {
          id: "cre-vacancy-data",
          title: "US Office Vacancy Rate Hits Record ~20%",
          description:
            "Moody's Analytics reported the US office vacancy rate hit a record 19.8% in Q1 2024, surpassing the early-1990s peak. Separately, industry estimates put well over $1 trillion of commercial real estate debt maturing in 2025 (with the wall peaking later in the decade), of which the office segment is most stressed. This creates genuine economic disruption in downtown cores.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Moody's Analytics office vacancy data (Q1 2024, via Bloomberg); CRE debt-maturity estimates",
          sourceUrl:
            "https://www.bloomberg.com/news/articles/2024-04-02/office-vacancy-rate-nears-20-to-set-fresh-record-moody-s-says",
          reasoning:
            "Hard vacancy data showing real costs of the remote transition. The original '20.1% in Q3 2024' was corrected to the verified 19.8% in Q1 2024, and the precise '$1.2T at risk' claim was softened to the verifiable 'over $1T of CRE debt maturing in 2025' since the exact at-risk figure and its attribution were not confirmed.",
        },
        {
          id: "demographic-shift-data",
          title: "Remote Work Drives Geographic Redistribution",
          description:
            "Migration during the pandemic accelerated out of high-cost coastal metros toward more affordable mid-size 'Zoom cities' such as Boise, Austin, and Nashville, with remote work cited as a key driver (Census-based analyses report low-single-digit annual growth rates for these metros, e.g. Austin ~3%+ at the peak). This creates both opportunity (affordable housing) and tension (gentrification).",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 4,
          },
          source:
            "US Census Bureau metro-area population estimates; analyses of pandemic-era domestic migration",
          sourceUrl:
            "https://www.census.gov/library/stories/2025/04/metro-area-trends.html",
          reasoning:
            "Directional migration trend is well documented, but the specific '5-10% growth' figures and the 'USPS Change of Address' attribution could not be verified, so they were softened to verifiable low-single-digit Census growth rates and the USPS source was removed. Directness stays low because migration has many drivers besides remote work.",
        },
      ],
    },
  ],
};
