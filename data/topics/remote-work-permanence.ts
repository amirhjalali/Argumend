export const remoteWorkPermanenceData = {
  id: "remote-work-permanence",
  title: "Is Remote Work Here to Stay?",
  question: "Is remote work here to stay, or is the five-day office week coming back?",
  meta_claim:
    "Remote and hybrid work will permanently replace the five-day office week for most knowledge workers, whatever employers mandate.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: SWAA (WFH Research, November 2026 update, October
  // wave) puts about 27% of US workdays at home; BLS telework rate 21.9% in
  // September 2026; Kastle 10-city occupancy 56.1% for the week ending
  // 21 October 2026; Placer.ai September 2026 office visits 25.5% below 2019.
  last_updated: "2026-11-03",
  aliases: [
    "Will remote and hybrid work permanently replace the five-day office week?",
    "Is hybrid work permanent?",
    "Are return-to-office mandates winning?",
  ],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "About 27% of workdays in the US were worked from home in October 2026, by the Survey of Working Arrangements and Attitudes, and the share has barely moved since 2023. Yet office visits in September 2026 were the closest to their 2019 level since the pandemic, as employers from Amazon to the federal government ordered employees back full time. Both sides accept those numbers. The fight is over whether workers or employers will set the pattern for the next decade.",
    confidence: 85,
    source:
      "WFH Research, SWAA November 2026 update (October 2026 wave); Placer.ai Office Index, September 2026 (13 October 2026)",
    sourceUrl: "https://wfhresearch.com/wp-content/uploads/2026/11/WFHResearch_updates_November2026.pdf",
  },
  simple_case: [
    "The answer decides where knowledge workers can live, whether downtown offices fill up or get converted, how city budgets that lean on office towers hold up, and how companies hire.",
    "Over the past year 62% of full-time employees worked fully on site, 26% hybrid and 12% fully remote. Employers plan on about one and a half home days per week, and offer fewer fully remote jobs than their employees want.",
  ],
  references: [
    {
      title: "WFH Research, Survey of Working Arrangements and Attitudes: November 2026 update",
      url: "https://wfhresearch.com/wp-content/uploads/2026/11/WFHResearch_updates_November2026.pdf",
    },
    {
      title: "Bureau of Labor Statistics, Current Population Survey telework series LNU0201B46B",
      url: "https://data.bls.gov/timeseries/LNU0201B46B",
    },
    {
      title: "Bloom, Han and Liang, 'Hybrid working from home improves retention without damaging performance', Nature 630 (2024)",
      url: "https://www.nature.com/articles/s41586-024-07500-2",
    },
    {
      title: "Placer.ai, September 2026 Office Index (13 October 2026)",
      url: "https://www.placer.ai/anchor/articles/september-2026-placer-ai-office-index-san-francisco-leads-the-fall-rebound",
    },
    {
      title: "Kastle Systems, Back to Work Barometer",
      url: "https://www.kastle.com/safety-wellness/getting-america-back-to-work/",
    },
    {
      title: "The White House, 'Return to In-Person Work' (20 January 2025)",
      url: "https://www.whitehouse.gov/presidential-actions/2025/01/return-to-in-person-work/",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: How much remote work is left?
    // =========================================================================
    {
      id: "remote-work-level",
      title: "How Much Remote Work Is Left?",
      short_summary:
        "About 27% of US workdays are worked from home, and about 22% of employed people telework at least part of the time. Those shares have barely moved since 2023. But office visits are rising, and badge swipes in big cities are back above half of pre-pandemic levels. Whether remote work has leveled off or is still sliding back is the first split.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Remote work is still slowly giving ground. Among four-year college graduates, the group most able to work from home, the share of workdays spent at home fell from 54.5% in 2020 to 34.8% in 2023 and 31.3% so far in 2026. Office visits in September 2026 were up 4.0% on a year earlier and 25.5% below September 2019, the smallest September gap since the pandemic, by Placer.ai's count. Each year more employers tighten attendance rules. The trend runs toward the office, one mandate at a time.",
      proponent_rebuttal:
        "Remote work has stopped shrinking and settled far above where it started. About 27% of workdays were worked from home in October 2026, a rise its researchers call equivalent to almost 40 years of pre-pandemic growth. The Bureau of Labor Statistics found 21.9% of employed people teleworked in September 2026, against 17.9% when its series began in October 2022. Among workers with a high school education the share of home days has sat near 20% since 2022. Employers' own plans have held at about 1.3 to 1.5 home days per week since mid-2022, and actual home working has tracked those plans. Offices a quarter emptier than 2019, years after the last lockdown, is what a lasting hybrid week looks like.",
      crux: {
        id: "remote-work-level-trend",
        title: "The Plateau Test",
        question:
          "Has remote work leveled off at a new normal, or is it still sliding back toward the office?",
        description:
          "Survey shares of home workdays have been nearly flat since 2023, while office foot traffic and badge swipes keep rising slowly. The test is whether both kinds of data level off well above 2019, or keep moving toward it.",
        methodology:
          "Track the SWAA share of workdays spent at home, the BLS telework rate, and office visit and badge-swipe data by month through 2028, by education group and city, and check whether rising office visits come from more people commuting or the same people commuting more days.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Monthly SWAA home-workday shares, the BLS telework rate and Kastle and Placer.ai office data through 2028, showing whether home working stays near a quarter of workdays or keeps falling toward its 2019 level.",
        },
        cost_to_verify: "$0 (Published monthly data)",
        falsification: {
          supporter_flip:
            "If the share of workdays spent at home fell steadily below 20% by 2028 while office visits closed most of the gap with 2019, the case that remote and hybrid work are permanent would weaken.",
          skeptic_flip:
            "If home workdays stayed near a quarter of workdays through 2028 and office visits levelled off well below 2019, the view that the five-day week is returning would be hard to hold.",
          common_ground:
            "Both sides agree about a quarter of US workdays were worked from home in 2026, far above the pre-pandemic level, and that office visits rose in 2026.",
          live_disagreement:
            "Whether the slow rise in office attendance is a steady return under way or the last adjustment before a lasting hybrid pattern.",
        },
      },
      evidence: [
        {
          id: "swaa-27-percent-2026",
          title: "SWAA, October 2026: About 27% of US Workdays Were Worked From Home",
          description:
            "The Survey of Working Arrangements and Attitudes, run by economists Jose Maria Barrero, Nicholas Bloom, Shelby Buckman and Steven Davis, found about 27% of full workdays in the US were worked from home in October 2026. Its researchers say the pandemic permanently increased home working by the equivalent of almost 40 years of pre-pandemic growth. In the year to October 2026, 62% of full-time employees worked fully on site, 26% hybrid and 12% fully remote. Employer plans have hovered around 1.3 to 1.5 home days per week and resembled actual home working since mid-2022.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "WFH Research, SWAA November 2026 update (latest wave October 2026)",
          sourceUrl: "https://wfhresearch.com/wp-content/uploads/2026/11/WFHResearch_updates_November2026.pdf",
          reasoning:
            "The longest-running monthly measure of home working, reweighted to match the Current Population Survey. It is an online survey that its authors say may over-sample the tech-savvy, and its founders' own paper is titled 'Why working from home will stick'.",
        },
        {
          id: "bls-telework-rate-2026",
          title: "BLS: 21.9% of Employed People Teleworked in September 2026, Up From 17.9% in October 2022",
          description:
            "The Current Population Survey found 21.9% of employed people teleworked at least part of the time in September 2026. The rate was 17.9% in October 2022, when the series began, and has moved between 21.6% and 23.0% since September 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 6,
          },
          source: "Bureau of Labor Statistics, Current Population Survey, series LNU0201B46B (not seasonally adjusted)",
          sourceUrl: "https://data.bls.gov/timeseries/LNU0201B46B",
          reasoning:
            "The official government count, and it shows no slide since 2022. It counts anyone who teleworked at all, so it cannot tell a fully remote worker from one who works from home one afternoon a week; January 2026 figures were revised for new population controls.",
        },
        {
          id: "office-visits-recovering-2026",
          title: "Placer.ai, September 2026: Office Visits 25.5% Below 2019, the Smallest September Gap Since the Pandemic",
          description:
            "Placer.ai's monthly Office Index, which tracks visits to US office buildings, found nationwide office visits up 4.0% year over year in September 2026 and 25.5% below September 2019, 'the smallest September gap since the pandemic,' with the same number of working days in both years. Placer.ai links the gains to another round of stricter attendance policies, including General Mills and Target's merchandising organization moving to four office days per week, on top of five-day policies that took effect over the previous year. San Francisco posted the strongest year-over-year growth, amid what Placer.ai calls an AI-driven leasing boom.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Placer.ai, 'September 2026 Placer.ai Office Index: San Francisco Leads the Fall Rebound' (Lila Margalit, 13 Oct 2026)",
          sourceUrl:
            "https://www.placer.ai/anchor/articles/september-2026-placer-ai-office-index-san-francisco-leads-the-fall-rebound",
          reasoning:
            "The best current evidence that attendance is still climbing as employers tighten rules. It comes from a commercial firm's phone-location data, which no public agency checks, and a gap of a quarter below 2019 also fits a lasting hybrid pattern.",
        },
        {
          id: "swaa-college-grads-wfh-falling",
          title: "SWAA: College Graduates' Home Workdays Fell From 34.8% in 2023 to 31.3% in 2026",
          description:
            "Among workers with a four-year college degree, the share of workdays spent at home was 54.5% in 2020, 37.2% in 2022, 34.8% in 2023, 33.8% in 2024, 33.2% in 2025 and 31.3% so far in 2026. For graduate-degree holders it went from 36.0% in 2023 to 33.8% in 2026. For workers with a high school education or less it stayed near 20% throughout.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "WFH Research, SWAA November 2026 update, table 'Work-From-Home Patterns by Education Group' (2026 average of months available)",
          sourceUrl: "https://wfhresearch.com/wp-content/uploads/2026/11/WFHResearch_updates_November2026.pdf",
          reasoning:
            "The same survey that shows a plateau overall shows a slow, steady decline for the knowledge workers this question is about. The decline is about a point a year, and 2026 covers only part of the year.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Mandates or worker leverage?
    // =========================================================================
    {
      id: "mandates-worker-leverage",
      title: "Office Mandates vs. Worker Leverage",
      short_summary:
        "Amazon moved to five office days in January 2025, the federal government ordered its employees back full time, and others have followed. A randomized trial found hybrid work with two home days cut quits by a third with no loss in performance. Whether employers' mandates or workers' demand for flexibility will set the norm is the second split. Whether a mandate makes a team more productive is argued on the map asking \"Do return-to-office mandates improve productivity and innovation?\"",
      icon_name: "Users" as const,
      skeptic_premise:
        "Employers are reasserting the office, and they hold the cards. On 20 January 2025 the White House told federal agencies to 'require employees to return to work in-person at their respective duty stations on a full-time basis.' Amazon moved to five days in the office from January 2025, and JPMorgan and Goldman Sachs have pushed employees back toward full-time attendance, citing collaboration, mentorship and culture. In 2026 General Mills and Target's merchandising organization moved to four office days per week. Large employers set the terms for millions of jobs, and when hiring slows, workers have fewer places to go. On this view the five-day week returns one firm at a time.",
      proponent_rebuttal:
        "A mandate only sticks if a firm can keep and hire the people it wants, and flexibility is cheap to offer and costly to remove. In a randomized trial of 1,612 employees at a Chinese technology company, Nicholas Bloom, Ruobing Han and James Liang found that working from home two days per week 'reduced quit rates by one-third,' with no effect on performance grades or promotions over the next two years and no change in lines of code written. Employees' wishes still run ahead of what employers offer: the SWAA finds employers provide fewer fully remote jobs than employees want. Remote or hybrid roles were still about three times their pre-pandemic share of US job postings in late 2024. Hybrid workers report engagement and wellbeing at least as high as on-site workers. A firm that gives up flexibility hands its rivals a recruiting advantage.",
      crux: {
        id: "mandates-vs-worker-leverage",
        title: "Does Worker Demand Outlast Mandates?",
        question:
          "Will workers' demand for remote and hybrid work outlast employers' office mandates?",
        description:
          "Whether firms that require full-time attendance can hold their employees and fill roles, or whether quits, hiring delays and competitors' flexibility push them back to hybrid.",
        methodology:
          "Follow firms that announced full-time office mandates against matched firms that kept hybrid. Track enforcement, quit rates by seniority, time to fill vacancies and the share of each firm's job postings offering remote or hybrid work, through at least one hiring cycle and one downturn.",
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
            "If mandating firms lost more employees and took longer to hire than matched hybrid firms, and quietly relaxed enforcement as a result, the view that mandates will restore the five-day week would be hard to hold.",
          common_ground:
            "Both sides agree that large employers including Amazon and the federal government have ordered employees back full time, and that remote or hybrid postings remain above their pre-pandemic share of US job ads.",
          live_disagreement:
            "Whether mandates hold once quit and hiring costs are counted, or whether workers' preference for flexibility pushes mandating firms back to hybrid.",
        },
      },
      evidence: [
        {
          id: "bloom-hybrid-rct-2024",
          title: "Bloom, Han and Liang 2024: Two Home Days Weekly Cut Quits by a Third, With No Loss in Performance",
          description:
            "In a six-month randomized trial of 1,612 employees at a Chinese technology firm in 2021-22, hybrid working (two days at home each week) improved job satisfaction and reduced quit rates by one-third. Tests showed no effect on performance grades over the next two years of reviews, no difference in promotions overall, and no effect on lines of code written by computer engineers.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "Bloom, Han and Liang, 'Hybrid working from home improves retention without damaging performance', Nature 630, 920-925 (June 2024)",
          sourceUrl: "https://www.nature.com/articles/s41586-024-07500-2",
          reasoning:
            "A randomized test of the arrangement most firms now use, showing why flexibility is costly to take away. It is one firm in China, and lead author Nicholas Bloom is the best-known advocate of hybrid work.",
        },
        {
          id: "remote-job-listings",
          title: "Indeed, October 2024: Remote or Hybrid Ads Were 7.8% of US Postings, About 3 Times the 2019 Share",
          description:
            "Indeed Hiring Lab data show the share of US job postings advertising remote or hybrid work was 7.8% in October 2024, down from the 10.4% peak in February 2022 but about three times the 2.6% of January 2019.",
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
            "A market signal that employers still advertise flexibility to attract workers. It is two years old, and many jobs never mention location in the ad.",
        },
        {
          id: "gallup-employee-engagement",
          title: "Gallup 2024: Hybrid and Remote Workers in the US and Canada More Engaged Than On-Site Workers",
          description:
            "Gallup's State of the Global Workplace 2024 found that among remote-capable workers in the US and Canada, 36% of fully remote and 35% of hybrid employees were engaged, both ahead of on-site workers, and 62% of hybrid employees said they were 'thriving', against 59% of remote and about half of on-site workers.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source: "Gallup, State of the Global Workplace: 2024 Report",
          sourceUrl:
            "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx",
          reasoning:
            "A large independent survey suggesting flexible workers are not less committed. Engagement is a loose proxy for whether arrangements last, and the gap between remote and hybrid is narrow.",
        },
        {
          id: "federal-rto-memo-2025",
          title: "White House, 20 January 2025: Federal Agencies Told to Bring Employees Back Full Time",
          description:
            "A presidential memorandum signed on 20 January 2025 directed heads of departments and agencies to end remote work arrangements and 'require employees to return to work in-person at their respective duty stations on a full-time basis', with exemptions they consider necessary.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 9,
            directness: 6,
          },
          source: "The White House, 'Return to In-Person Work' (20 January 2025)",
          sourceUrl: "https://www.whitehouse.gov/presidential-actions/2025/01/return-to-in-person-work/",
          reasoning:
            "The country's largest employer chose full-time attendance. It is a political decision for public employees, who cannot easily move to a rival, so it shows what an employer with leverage can do more than what private firms can sustain.",
        },
        {
          id: "rto-mandate-outcomes",
          title: "Amazon, September 2024: Five Office Days From January 2025",
          description:
            "Amazon announced in September 2024 a five-day in-office requirement effective 2 January 2025, with chief executive Andy Jassy citing collaboration, learning and culture. JPMorgan and Goldman Sachs have also pushed employees back toward full-time attendance. The companies have not published the internal data behind these decisions.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source:
            "Amazon, Andy Jassy's message on return-to-office plans (16 September 2024)",
          sourceUrl:
            "https://www.aboutamazon.com/news/company-news/ceo-andy-jassy-latest-update-on-amazon-return-to-office-manager-team-ratio",
          reasoning:
            "Large employers show by their choices that they want people in the office. The reasons they give are their own, backed by no released data, and a policy announced is not a policy enforced.",
        },
        {
          id: "gibbs-it-wfh-productivity",
          title: "Gibbs, Mengel and Siemroth 2023: Indian IT Professionals' Productivity Fell 8% to 19% Working From Home",
          description:
            "Using personnel and analytics data on more than 10,000 skilled professionals at an Indian technology company before and during pandemic home working, the authors found hours rose, output fell slightly, and productivity fell 8% to 19%, largely through higher coordination costs, fewer uninterrupted stretches of work and less one-to-one time with supervisors.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 4,
          },
          source:
            "Gibbs, Mengel and Siemroth, 'Work from Home and Productivity: Evidence from Personnel and Analytics Data on Information Technology Professionals', Journal of Political Economy Microeconomics 1(1) (2023)",
          sourceUrl: "https://doi.org/10.1086/721803",
          reasoning:
            "Gives employers a concrete reason to want people back. It compares before with during a sudden, fully remote pandemic shift at one firm, not a settled hybrid week.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: What happens to downtowns?
    // =========================================================================
    {
      id: "economic-social-dynamics",
      title: "What Happens to Downtowns and Office Towers?",
      short_summary:
        "US office vacancy hit a record 19.8% in early 2024. Office visits are recovering slowly, led in 2026 by San Francisco. Whether cities refill offices with returning workers, convert them to other uses, or carry lasting losses is the third split.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Downtowns are being refilled, which shows the office is not finished. Office visits in September 2026 were the closest to 2019 since the pandemic, and San Francisco, once the symbol of empty towers, led the year-on-year rebound amid what Placer.ai calls an AI-driven leasing boom. Companies that need to grow fast still want people together. Each new attendance rule brings commuters back to the shops and transit that depend on them. A city's office district can recover the way it did after earlier slumps, through new tenants and new industries, not through permanent emptiness.",
      proponent_rebuttal:
        "The shift has left a lasting mark on office towers. US office vacancy hit a record 19.8% in the first quarter of 2024 by Moody's count, above the early-1990s peak, and a large wave of commercial property debt is coming due, with offices the most stressed. Badge swipes in ten big cities were still at 56% of their pre-pandemic level in October 2026. Office visits a quarter below 2019 mean fewer lunches, train fares and downtown taxes. Cities are converting offices to housing where zoning allows, which is a bet that a share of that space will not be needed again.",
      crux: {
        id: "urban-economic-adaptation",
        title: "Urban Economic Adaptation Timeline",
        question:
          "How quickly can cities adapt to emptier offices through conversions, rezoning and new uses?",
        description:
          "Measuring how quickly urban economies adapt to reduced office use, through returning tenants, conversions, rezoning and new industries.",
        methodology:
          "Track commercial-to-residential conversion rates, downtown foot traffic, office vacancy and new business formation in major US cities. Model the point at which the office market stabilises.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Track office vacancy, completed office-to-residential conversions, downtown foot traffic and city tax revenue year by year in major cities, using local government and real-estate data, comparing cities with and without rezoning or conversion incentives.",
        },
        cost_to_verify: "$1M (Multi-city longitudinal economic study)",
        falsification: {
          supporter_flip:
            "If office vacancy fell back toward pre-pandemic levels as returning workers and new tenants filled space, without large conversions, the case that the shift away from the office is permanent would weaken.",
          skeptic_flip:
            "If vacancy stayed near its record and cities converted a growing share of towers to homes because the space was not being re-let, the view that downtowns are refilling would be hard to hold.",
          common_ground:
            "Both sides agree US office vacancy hit a record 19.8% in the first quarter of 2024, and that office visits were rising in 2026 while still well below 2019.",
          live_disagreement:
            "Whether downtowns recover by refilling offices with returning workers, or by turning them into something else, and whether strained tax bases and lost commuter spending leave lasting damage.",
        },
      },
      evidence: [
        {
          id: "cre-vacancy-data",
          title: "Moody's: US Office Vacancy Hit a Record 19.8% in Early 2024",
          description:
            "Moody's Analytics reported the US office vacancy rate hit a record 19.8% in the first quarter of 2024, surpassing the early-1990s peak. Industry estimates put well over $1 trillion of commercial real estate debt maturing in 2025, with the office segment the most stressed.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source:
            "Moody's Analytics office vacancy data (Q1 2024, via Bloomberg); commercial real estate debt-maturity estimates",
          sourceUrl:
            "https://www.bloomberg.com/news/articles/2024-04-02/office-vacancy-rate-nears-20-to-set-fresh-record-moody-s-says",
          reasoning:
            "Hard data on the cost of emptier offices. Vacancy also reflects a building boom before 2020 and older towers no one wants, so not all of it is remote work, and the figure is from 2024.",
        },
        {
          id: "kastle-occupancy-downtown",
          title: "Kastle, October 2026: Big-City Offices at 56% of Pre-Pandemic Use",
          description:
            "Kastle's 10-city average office occupancy, measured by access-card swipes, was 56.1% of the pre-pandemic baseline in the week ending 21 October 2026, with the Tuesday peak at 66.1%.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Kastle Systems, Back to Work Barometer (week ending 21 October 2026)",
          sourceUrl: "https://www.kastle.com/safety-wellness/getting-america-back-to-work/",
          reasoning:
            "Shows how far downtown office use remains below its old level. It covers Kastle-equipped buildings in ten cities, not all offices.",
        },
        {
          id: "placer-sf-rebound-2026",
          title: "Placer.ai, September 2026: San Francisco Leads the Office Rebound Amid an AI Leasing Boom",
          description:
            "In Placer.ai's September 2026 Office Index, nationwide office visits were 4.0% above a year earlier and 25.5% below September 2019. San Francisco posted the strongest year-over-year growth of the cities tracked, amid what Placer.ai calls an AI-driven leasing boom, and new four-day attendance rules at General Mills and Target's merchandising organization added to the gains.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Placer.ai, 'September 2026 Placer.ai Office Index: San Francisco Leads the Fall Rebound' (Lila Margalit, 13 Oct 2026)",
          sourceUrl:
            "https://www.placer.ai/anchor/articles/september-2026-placer-ai-office-index-san-francisco-leads-the-fall-rebound",
          reasoning:
            "Evidence that a downtown can refill through new industry and stricter rules, not only through conversion. Foot traffic is not occupancy or rent, and one strong year in one city may not last.",
        },
      ],
    },
  ],
};
