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
            "Nick Bloom's landmark 2015 study at Ctrip (16,000 employees) found remote workers were 13% more productive, took fewer sick days, and reported higher satisfaction. His 2022 follow-up confirmed hybrid models show no productivity loss.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "Stanford University, Quarterly Journal of Economics",
          reasoning:
            "Gold-standard randomized experiment at scale, though limited to one company context and pre-dates the pandemic shift.",
        },
        {
          id: "microsoft-collaboration-data",
          title: "Microsoft Research Shows Communication Pattern Shifts",
          description:
            "Microsoft's analysis of 60,000+ employees found remote work increased async communication but reduced cross-team connections by 25%. Atlassian's data showed similar patterns but noted that structured 'intentional collaboration' rituals recovered most lost connections.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Microsoft Research, Nature Human Behaviour (2022)",
          reasoning:
            "Large-scale internal data showing real collaboration costs, published in top-tier journal.",
        },
        {
          id: "rto-mandate-outcomes",
          title: "Major Companies Mandating Return-to-Office",
          description:
            "Amazon, Google, Meta, JPMorgan, and Goldman Sachs have mandated 3-5 days in office, citing innovation and culture needs. These are some of the most data-driven companies in the world, and they've concluded remote work has costs.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Company Announcements, Wall Street Journal",
          reasoning:
            "Revealed preferences of major employers suggest remote work has real drawbacks they've measured internally.",
        },
        {
          id: "patent-innovation-data",
          title: "Patent Filing Rates Stable Despite Remote Shift",
          description:
            "USPTO data shows no decline in patent application rates during 2020-2024 despite massive shift to remote work. Remote-first companies like GitLab, Automattic, and Zapier maintain strong innovation output.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 3,
          },
          source: "USPTO, Company Annual Reports",
          reasoning:
            "Broad economic data; directness limited because many factors influence patent rates.",
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
          title: "US Office Vacancy Rate Hits Record 20%",
          description:
            "Commercial real estate vacancy rates reached 20.1% in Q3 2024, the highest ever recorded. Moody's estimates $1.2T in CRE debt is at risk. This creates genuine economic disruption in downtown cores.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Moody's Analytics, CoStar Group",
          reasoning:
            "Hard economic data showing real costs of the remote transition; direct evidence of unsustainability concerns.",
        },
        {
          id: "gallup-employee-engagement",
          title: "Gallup: Hybrid Workers Report Highest Engagement",
          description:
            "Gallup's 2024 State of the Workplace report found hybrid workers (2-3 days in office) report the highest engagement scores, above both fully remote and fully in-office workers.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Gallup (2024)",
          reasoning:
            "Large-scale, independent survey; supports hybrid model specifically rather than fully remote.",
        },
        {
          id: "remote-job-listings",
          title: "Remote Job Listings Stabilized at 3x Pre-Pandemic Levels",
          description:
            "ZipRecruiter and Indeed data show remote job postings stabilized at roughly 15% of all listings (vs. 5% pre-pandemic), suggesting permanent structural shift even as some companies mandate return.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "ZipRecruiter, Indeed Hiring Lab",
          reasoning:
            "Market-based signal that remote work is a permanent feature, not a temporary anomaly.",
        },
        {
          id: "demographic-shift-data",
          title: "Remote Work Drives Geographic Redistribution",
          description:
            "Census and USPS data show accelerated migration from high-cost metros to mid-size cities. Boise, Austin, and Nashville grew 5-10% as remote workers relocated. This creates both opportunity (affordable housing) and tension (gentrification).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source: "US Census Bureau, USPS Change of Address Data",
          reasoning:
            "Solid demographic data; directness limited because migration has many drivers.",
        },
      ],
    },
  ],
};
