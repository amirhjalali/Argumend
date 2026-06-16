import type { Topic } from "@/lib/schemas/topic";

export const remoteWorkPermanenceData = {
  id: "remote-work-permanence",
  title: "The Future of Remote Work",
  meta_claim:
    "Remote and hybrid work models will permanently replace traditional 5-day office work for knowledge workers.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "productivity-innovation",
      title: "Productivity & Innovation",
      short_summary:
        "Research on whether remote workers maintain or exceed office-based productivity and innovation output.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Remote work erodes spontaneous collaboration, mentorship, and innovation. Water cooler conversations, whiteboard sessions, and in-person brainstorming generate ideas that Zoom calls cannot replicate. Companies like Google, Apple, and JPMorgan have mandated return-to-office for these reasons.",
      proponent_rebuttal:
        "Stanford economist Nick Bloom's research consistently shows equal or higher individual productivity for remote workers. Microsoft's Work Trend Index found that async communication actually increases deep-focus work time. Innovation metrics like patents filed haven't declined at remote-first companies. Tooling (Figma, Miro, Slack huddles) keeps narrowing the collaboration gap.",
      crux: {
        id: "innovation-output-measurement",
        title: "Remote vs. In-Office Innovation Output",
        description:
          "Controlled comparison of innovation metrics (patents, new products, revenue from new initiatives) between matched remote and in-office teams.",
        methodology:
          "Compare innovation output at companies with different remote policies, controlling for industry, company size, and pre-pandemic innovation rates. Use patent filings, new product launches, and internal innovation metrics.",
        equation:
          "\\Delta I = I_{remote} - I_{office} \\pm \\text{confounders}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-year controlled study across firms)",
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
          id: "microsoft-collaboration-data",
          title: "Microsoft Research Shows Communication Pattern Shifts",
          description:
            "A study of 61,182 US Microsoft employees over the first half of 2020 found firm-wide remote work made collaboration networks more static and siloed, decreased synchronous communication and increased asynchronous communication, and reduced the share of collaboration time spent on cross-group ties by about 25% relative to pre-pandemic. Atlassian's own research separately argues that intentional, purposeful team gatherings boost connection more than routine office attendance.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "Yang et al., \"The effects of remote work on collaboration among information workers,\" Nature Human Behaviour 6, 43-54 (2022)",
          sourceUrl: "https://www.nature.com/articles/s41562-021-01196-4",
          reasoning:
            "Large-scale Microsoft workforce data showing real collaboration costs, published in a top-tier journal. The Atlassian point is reframed as a separate, weaker company finding rather than a direct rebuttal of the 25% figure.",
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
          id: "patent-innovation-data",
          title: "Patent Filing Rates Roughly Stable Through the Remote Shift",
          description:
            "US utility patent filings stayed broadly flat across 2020-2024 (roughly 650-670k applications a year) rather than collapsing during the remote shift. This is only suggestive: patent counts have many drivers and a long lag, and the link to remote work is not established. Notably, peer-reviewed work (Lin, Frey & Wu, Nature 2023) finds remote/distributed research teams produce fewer breakthrough, 'disruptive' ideas, cutting against a clean pro-remote reading.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 5,
            directness: 2,
          },
          source:
            "USPTO patent statistics (aggregate filing counts); offsetting evidence in Nature 615, 2023",
          sourceUrl:
            "https://www.uspto.gov/learning-and-resources/statistics/patent-statistics",
          reasoning:
            "Aggregate patent counts are a weak, heavily confounded proxy with long lags. Directness lowered to 2 and the claim de-inflated because the 'no decline = remote works for innovation' inference is not supported, and at least one peer-reviewed study points the other way. The original GitLab/Automattic/Zapier 'strong innovation output' assertion is removed as unmeasured.",
        },
      ],
    },
    {
      id: "economic-social-dynamics",
      title: "Economic & Social Dynamics",
      short_summary:
        "The broader economic and social consequences of a permanent shift away from office-centric work.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Commercial real estate collapse, urban decay, and weakened company culture make full remote unsustainable. Downtown economies depend on office workers. Junior employees lose mentorship. Company loyalty and culture erode when people never meet in person.",
      proponent_rebuttal:
        "Geographic flexibility reduces housing costs, improves work-life balance, and expands talent pools to previously excluded geographies. Cities will adapt as they always have — converting offices to housing. Employee surveys consistently show remote/hybrid as the #1 desired benefit, more valued than salary increases.",
      crux: {
        id: "urban-economic-adaptation",
        title: "Urban Economic Adaptation Timeline",
        description:
          "Measuring how quickly urban economies can adapt to reduced office occupancy through conversion, rezoning, and new economic models.",
        methodology:
          "Track commercial-to-residential conversion rates, downtown foot traffic, and new business formation in major US cities. Model equilibrium point where CRE market stabilizes.",
        equation:
          "T_{adapt} = f(\\text{vacancy rate}, \\text{conversion cost}, \\text{zoning flexibility})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Multi-city longitudinal economic study)",
      },
      evidence: [
        {
          id: "cre-vacancy-data",
          title: "US Office Vacancy Rate Hits Record ~20%",
          description:
            "Moody's Analytics reported the US office vacancy rate hit a record 19.8% in Q1 2024, surpassing the early-1990s peak. Separately, industry estimates put well over $1 trillion of commercial real estate debt maturing in 2025 (with the wall peaking later in the decade), of which the office segment is most stressed. This creates genuine economic disruption in downtown cores.",
          side: "against" as const,
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
          id: "gallup-employee-engagement",
          title: "Gallup: Hybrid Workers Report Highest Engagement",
          description:
            "Gallup's 2024 data on remote-capable workers found, globally, hybrid employees had the highest engagement (about 35%), ahead of fully remote (~33%) and on-site (~27%). In the US/Canada the gap between hybrid and fully remote is small (remote slightly higher in some cuts), so the result supports flexible/hybrid models more than fully remote specifically.",
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
            "Large-scale, independent survey. Directness lowered because engagement is an indirect proxy for the meta-claim and the hybrid-vs-remote ranking is region-dependent; it supports hybrid more cleanly than fully remote.",
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
