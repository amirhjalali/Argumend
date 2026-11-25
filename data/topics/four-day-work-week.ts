export const fourDayWorkWeekData = {
  id: "four-day-work-week",
  title: "The Four-Day Work Week",
  question: "Should a four-day week with no pay cut be adopted broadly?",
  meta_claim:
    "A four-day work week with no reduction in pay leads to equal or higher productivity, improved worker wellbeing, and should be adopted broadly across industries.",
  status: "contested" as const,
  category: "economics" as const,
  last_updated: "2026-11-23",
  tags: ["labor", "work", "productivity", "economics", "wellbeing"],
  // ── Stage 1: the opening contrast shown above everything ──
  keystone_fact: {
    statement:
      "In a 2025 six-country study of 141 volunteer organizations (2,896 workers), cutting hours at full pay lowered burnout and raised job satisfaction over six months, and 54 of the 61 UK pilot firms still ran a four-day week a year later. Yet in the United States, 80.3 million workers, 55.6% of all wage and salary earners in 2024, are paid by the hour, where staffing tracks coverage rather than meeting slack. What divides the sides is whether volunteer-firm results survive randomization, time, and coverage-bound sectors.",
    confidence: 82,
    source:
      "Fan, Schor, Kelly & Gu, Nature Human Behaviour (2025); Autonomy et al., UK One-Year Follow-Up (2024); U.S. BLS Report 1115 (2025)",
    sourceUrl: "https://doi.org/10.1038/s41562-025-02259-6",
  },
  // ── Stage 2: the honest two-paragraph orientation ──
  simple_case: [
    "Both sides accept that the major trials so far lack randomized control groups and skew toward flexible office employers, that cutting total hours at full pay differs sharply from cramming 40 hours into four 10-hour shifts, and that coverage-bound workplaces like hospitals, factories, and retail shops face harder staffing constraints than salaried offices.",
    "They split over whether steady output in trials comes from the schedule itself or from self-selected firms; whether burnout and sleep gains hold past one to two years without intensifying each workday; and how much of a 20% cut in hours productivity can absorb across sectors without payroll subsidies, higher prices, or a wider gap between salaried and hourly workers.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Productivity & Business Performance
    // =========================================================================
    {
      id: "productivity-impact",
      title: "Productivity & Business Performance",
      short_summary:
        "Volunteer pilots in Iceland, the UK, and Germany report steady output and high continuation rates, while critics point out that participating firms self-selected, lacked randomized controls, and still saw roughly one in five German firms return to five-day schedules.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The productivity numbers from four-day-week pilots come from volunteer organizations that wanted the schedule to work and had no randomized control group. In the UK's 2022 trial, firms compared self-reported revenue to their own prior periods during a high-motivation pilot, and small flexible office employers were heavily overrepresented. Even inside Germany's 2024 volunteer pilot of 45 firms evaluated by the University of Münster, roughly 20% opted to return to traditional schedules afterward. Outside self-selected pilots, a 2022 employer-perspectives report by the UK's Chartered Institute of Personnel and Development (CIPD) found employers broadly ambivalent and skeptical that a four-day week fits across roles, flagging customer-coverage gaps, coordination friction, and the difficulty of managing atypical and hourly staff.",
      proponent_rebuttal:
        "The persistence of real-world trials is hard to dismiss as brief enthusiasm. Iceland's 2015–2019 public-sector trials cut hours to 35–36 per week across more than 2,500 workers, roughly 1% of the national workforce, including hospitals, police, and social services, while maintaining or improving service output; by June 2021, 86% of Iceland's workforce had moved to shorter hours or gained the right to negotiate them. In the UK pilot's February 2024 one-year follow-up, at least 54 of the 61 companies (89%) were still running a four-day week and at least 31 (51%) had made it permanent by cutting redundant meetings and tightening workflows. Germany's 2024 pilot similarly reported stable turnover and profit alongside improved efficiency.",
      crux: {
        id: "four-day-rct-diverse",
        title: "The Cross-Industry Randomized Trial",
        question:
          "Is maintained productivity a real effect of the schedule, or of self-selected, motivated firms?",
        description:
          "Whether output per worker holds up in a randomized trial across diverse industries (not just flexible offices, but manufacturing, healthcare, retail, and frontline services) decides how far the four-day model can travel.",
        methodology:
          "Conduct a government-sponsored randomized controlled trial across 500+ firms in at least 10 industries, randomly assigning firms to four-day or five-day schedules for 12+ months. Measure audited output per worker, revenue per employee, error rates, and customer service levels rather than self-reports, with a 6-month post-trial follow-up.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A randomized trial across 500+ firms in at least ten industries, assigning four-day or five-day schedules for a year and measuring audited revenue per employee, output per hour, and error rates, with a six-month follow-up.",
        },
        cost_to_verify:
          "$10-20M (Government-sponsored multi-industry RCT with audited productivity metrics)",
        falsification: {
          supporter_flip:
            "If a randomized cross-industry trial with a real control group found productivity holding only in flexible office firms and falling in manufacturing, healthcare, retail, and other coverage-bound sectors, the case for broad adoption would narrow to roles with trimmable slack.",
          skeptic_flip:
            "If randomized trials across non-volunteer firms matched the persistence seen in Iceland's public-sector shift roles and the UK's 89% one-year continuation rate while keeping audited output steady, selection bias would explain much less of the result.",
          common_ground:
            "Both sides accept that existing trials lack randomized assignment and skew toward motivated office employers, and that many salaried weeks contain meeting and coordination slack that organizations can trim.",
          live_disagreement:
            "Whether maintained output is a general effect of shorter hours or an artifact of self-selected, flexible firms, which only a stratified, randomized cross-industry trial using audited output metrics can separate.",
        },
      },
      evidence: [
        {
          id: "iceland-trial",
          title: "Iceland's Public-Sector Trials (2015–2019): 2,500+ Workers Kept Service Output on 35–36 Hours",
          description:
            "Between 2015 and 2019, Reykjavík City Council and the Icelandic national government ran two trials cutting hours from 40 to 35–36 hours per week at unchanged pay across more than 2,500 public-sector workers (~1% of Iceland's workforce), including offices, hospitals, police, and social services. Service provision and productivity were maintained or improved across nearly all participating workplaces, and by June 2021 roughly 86% of Iceland's workforce had either moved to shorter hours or gained the contractual right to shorten them. Scope limit: the cut was 4–5 hours rather than a full 8-hour day, lacked random assignment, and occurred in a small, highly unionized public sector.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Gudmundur D. Haraldsson & Jack Kellam, Autonomy & Alda, 'Going Public: Iceland's Journey to a Shorter Working Week' (June 2021)",
          sourceUrl: "https://autonomy.work/wp-content/uploads/2021/06/ICELAND_4DW.pdf",
          reasoning:
            "Four years of real-world public-sector data spanning shift roles like hospitals and police make Iceland the broadest non-office test to date. Independence is tempered because Alda and Autonomy advocate shorter hours, and cutting to 35–36 hours is a smaller step than a 32-hour week.",
        },
        {
          id: "uk-4dwg-trial",
          title: "UK Pilot One Year On (2024): 54 of 61 Firms Still Ran a Four-Day Week, 31 Made It Permanent",
          description:
            "Sixty-one UK organizations (~2,900 employees) completed a six-month 100:80:100 pilot in 2022, reporting an average size-weighted revenue rise of 1.4% and 56 firms continuing afterward. In the February 2024 one-year follow-up by Autonomy, Cambridge, and Boston College, at least 54 of the 61 companies (89%) still operated a four-day week and at least 31 (51%) had made the schedule permanent, crediting fewer meetings and sharper task prioritization. Scope limit: firms volunteered to join, lacked a randomized control group, skewed toward small flexible service and office organizations, and self-reported financial figures.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source: "Autonomy, University of Cambridge & Boston College, 'Making It Stick: The UK Four-Day Week Pilot One Year On' (Feb 2024)",
          sourceUrl: "https://autonomy.work/wp-content/uploads/2024/02/making-it-stick_-1.pdf",
          reasoning:
            "A one-year follow-up rules out pure six-month novelty as the sole reason firms continued. However, 4 Day Week Global and Autonomy are advocacy co-organizers, and without matched non-adopting controls we cannot separate schedule effects from firm quality or broader revenue trends.",
        },
        {
          id: "germany-muenster-2024",
          title: "German Pilot (45 Firms, 2024): Output Held Steady for Most, While ~20% Returned to Five Days",
          description:
            "In 2024, researchers at the University of Münster (Prof. Dr. Julia Backmann and Dr. Felix Hoch) evaluated a six-month Germany-wide trial of 45 organizations organized by Intraprenör and 4 Day Week Global, combining surveys with smartwatch biometric tracking. Turnover and profit stayed steady compared with prior periods, and participating employees recorded more sleep, higher physical activity, and lower burnout. At the same time, roughly 20% of participating firms opted to return to traditional schedules afterward and a small number exited early for economic reasons, showing the model did not fit every participating business.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "University of Münster (Backmann & Hoch), '4-Day Week Germany-Wide Pilot Study' (October 2024)",
          sourceUrl: "https://www.wiwi.uni-muenster.de/tow/en/research/4-day-week-germany-wide-pilot-study",
          reasoning:
            "Independent academic evaluation adds credibility and biometric sleep/activity evidence. Filed against the 'broadly adopted' claim because even inside a self-selected volunteer cohort of 45 firms, roughly one in five reverted to a five-day schedule.",
        },
        {
          id: "cipd-reversion-rate",
          title: "CIPD Employer Survey (2022): UK Employers Ambivalent, Cite Coverage Gaps and Non-Salaried Fit",
          description:
            "A 2022 report by the Chartered Institute of Personnel and Development (CIPD), the UK's professional body for HR, surveyed employer perspectives on the four-day week. Employers were broadly ambivalent about cutting hours and viewed a general shift to a four-day week as unlikely. Even among employers that had reduced working hours, a recurring obstacle was that the schedule did not fit every role inside the same organization, citing customer-coverage demands, cross-team coordination, and atypical or hourly workers.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "Chartered Institute of Personnel and Development, 'The four-day week: Employer perspectives' (2022)",
          sourceUrl: "https://www.cipd.org/en/knowledge/reports/four-day-week/",
          reasoning:
            "An independent employer-side counterweight to volunteer pilot publicity. Directness is moderate because it captures employer expectations and operational constraints rather than an experimental output test.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Worker Wellbeing & Health
    // =========================================================================
    {
      id: "worker-wellbeing",
      title: "Worker Wellbeing & Health",
      short_summary:
        "A 2025 Nature Human Behaviour study across 141 organizations found lower burnout and better sleep over six months, while critics note that compressing hours without cutting total load fails to reliably improve health and long-term data beyond two years remains scarce.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Short-term wellbeing gains during publicized six-month trials may reflect novelty, Hawthorne observation effects, and the enthusiasm of volunteer firms rather than durable change. When employers instead keep weekly hours constant and pack them into four longer days (4×10), a systematic review of 40 studies by Bambra and colleagues found compressed schedules did not reliably improve shift-worker health, and after Belgium legislated a right to request a compressed four-day week in late 2022, HR provider Acerta found fewer than 1% of full-time private-sector workers took it up. Even in genuine hour-reduction programs like France's 35-hour law, Philippe Askenazy's research documented rising work intensity as firms compressed tasks into fewer hours. Clean multi-year wellbeing data past 24 months with matched five-day controls still does not exist.",
      proponent_rebuttal:
        "The wellbeing evidence has moved well past anecdotes from a single pilot. A July 2025 peer-reviewed study in Nature Human Behaviour (Fan, Schor, Kelly & Gu) tracked 2,896 workers across 141 organizations in six countries alongside 12 five-day control companies: burnout fell from 2.83 to 2.38 on a 5-point scale, job satisfaction rose from 7.07 to 7.59 on a 10-point scale, and mental and physical health improved (patterns absent in the control firms), mediated by less fatigue, fewer sleep problems, and stronger work ability. Germany's 2024 pilot corroborated better sleep and physical activity via smartwatches, and European Social Survey data (18,060 respondents) links fewer working hours to higher life satisfaction even after controlling for income. Belgium's low uptake confirms the core point: workers want genuine hour reduction (4×8), not 4×10 compression.",
      crux: {
        id: "wellbeing-persistence",
        title: "The Long-Term Wellbeing Persistence Test",
        question:
          "Do the wellbeing gains last beyond two years, once habits stabilize and the trials end?",
        description:
          "Whether lower burnout and better sleep persist past two years, or fade as workdays intensify and novelty wears off, determines how durable the health case for a shorter week really is.",
        methodology:
          "Follow cohorts of workers from multi-country four-day trials for 3 to 5 years using validated burnout, sleep, and job-satisfaction instruments alongside matched firms that stayed on five-day schedules, stratifying by reduced-hour (4×8) versus compressed (4×10) schedules and job type.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Follow employees at firms from the 2022 UK and six-country pilots that kept a four-day schedule for three to five years, using the same validated burnout, sleep, and work-intensity surveys alongside matched firms that stayed on five days.",
        },
        cost_to_verify:
          "$3-5M (3-to-5-year longitudinal cohort study with matched five-day control firms)",
        falsification: {
          supporter_flip:
            "If three-to-five-year longitudinal cohorts with matched five-day controls showed burnout and sleep gains reverting to baseline, or being offset by sustained workday intensification, the durable-wellbeing case for a shorter week would weaken substantially.",
          skeptic_flip:
            "If multi-year follow-ups of the six-country and German cohorts continued to show lower validated burnout and better objective sleep markers against matched five-day firms past 36 months, novelty and observation effects would explain much less of the gains.",
          common_ground:
            "Both sides accept that genuine hour reduction (4×8) improves worker wellbeing more than hour compression (4×10), that six-month trial data shows real short-term drops in reported burnout, and that controlled multi-year follow-up past 24 months is still scarce.",
          live_disagreement:
            "Whether early reductions in burnout and sleep problems persist past two years once observation ends and workflows settle, or erode through rising daily work intensity.",
        },
      },
      evidence: [
        {
          id: "uk-trial-burnout",
          title: "Nature Human Behaviour (2025): Across 141 Organizations in Six Countries, Burnout Fell and Job Satisfaction Rose vs. Controls",
          description:
            "A July 2025 peer-reviewed study in Nature Human Behaviour by Wen Fan, Juliet B. Schor, Orla Kelly, and Guolin Gu analyzed pre- and post-trial data from 2,896 workers across 141 organizations in six countries (Australia, Canada, Ireland, New Zealand, UK, US) running six-month, full-pay four-day trials, compared with 12 control companies staying on five days. Mean burnout fell from 2.83 to 2.38 (5-point scale), job satisfaction rose from 7.07 to 7.59 (10-point scale), and mental and physical health improved, with gains not mirrored in the 12 control firms and mediated by less fatigue, fewer sleep problems, and higher self-reported work ability. Scope limit: six-month horizon, volunteer organizations rather than random assignment, small control group (12 firms), and self-reported outcomes.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 8,
            directness: 9,
          },
          source: "Wen Fan, Juliet B. Schor, Orla Kelly & Guolin Gu, 'Work time reduction via a 4-day workweek finds improvements in workers' well-being,' Nature Human Behaviour 9, 2153–2168 (2025)",
          sourceUrl: "https://doi.org/10.1038/s41562-025-02259-6",
          reasoning:
            "Peer-reviewed multi-country data with a control comparison and clear dose-response mediation is the strongest wellbeing evidence to date. Independence is moderate because the trials were coordinated with 4 Day Week Global, and a six-month window cannot settle multi-year persistence.",
        },
        {
          id: "compressed-hours-stress",
          title: "Systematic Review (2008): Compressing the Same Hours Into Fewer Days Did Not Reliably Improve Shift-Worker Health",
          description:
            "A systematic review by Bambra and colleagues in the Journal of Epidemiology and Community Health examined 40 observational studies of the Compressed Working Week (packing the same weekly hours into fewer, longer shifts) among shift workers. Interventions 'did not always improve the health of shift workers,' though the five prospective controlled studies found no health harm and work-life balance generally improved; overall study quality was judged 'not very high.' Consistent with that distinction, after Belgium enacted a legal right to request a compressed four-day week (38–40 hours in four days) in November 2022, payroll provider Acerta reported uptake of only ~0.8% of full-time private-sector workers.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 5,
          },
          source: "Bambra, Whitehead, Sowden, Akers & Petticrew, 'A hard day's night? The effects of Compressed Working Week interventions on the health and work-life balance of shift workers: a systematic review,' Journal of Epidemiology and Community Health 62(9) (2008)",
          sourceUrl: "https://doi.org/10.1136/jech.2007.067249",
          reasoning:
            "Demonstrates why 'four-day week' is two very different policies: keeping total hours unchanged while stretching shifts fails to deliver reliable health benefits and drew sub-1% worker uptake in Belgium. Directness to reduced-hour (4×8) models is moderate because it evaluates compression rather than hour cuts.",
        },
        {
          id: "european-life-satisfaction",
          title: "European Social Survey (18,060 Workers, 2022): Fewer Working Hours Tracked Higher Life Satisfaction After Income Controls",
          description:
            "A 2022 study by Qinglong Shao in Health Economics Review analyzed Wave 10 of the European Social Survey (18,060 respondents across Europe) and found a statistically significant negative association between weekly working hours and life satisfaction even after controlling for income. Improved self-reported health served as a central mediating pathway. Scope limit: cross-sectional observational data compares workers who already work different schedules and cannot rule out selection into shorter-hour roles.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Qinglong Shao, 'Does less working time improve life satisfaction? Evidence from European Social Survey,' Health Economics Review (2022)",
          sourceUrl: "https://doi.org/10.1186/s13561-022-00396-6",
          reasoning:
            "Large cross-national sample with independent authorship and income controls supports the broader hours-to-wellbeing link beyond short-term pilot novelty, though observational design prevents causal proof.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Economic Feasibility & Equity
    // =========================================================================
    {
      id: "economic-feasibility",
      title: "Economic Feasibility & Equity",
      short_summary:
        "Cutting hours by 20% at unchanged pay implies a 25% rise in hourly output, higher payroll costs, or state subsidies, and in an economy where over half of workers are paid hourly, the trade-offs look very different outside salaried offices.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Cutting hours from 40 to 32 with no pay cut mechanically requires a 25% jump in output per hour to keep unit labor costs flat. That may be achievable in salaried knowledge roles with excess meetings, but U.S. Bureau of Labor Statistics data shows 80.3 million workers, 55.6% of all U.S. wage and salary earners in 2024, are paid at hourly rates, heavily represented in healthcare, retail, hospitality, logistics, and manufacturing where staffing tracks operating hours. In France's real-world statutory reduction from 39 to 35 hours, Estevão and Sá's quasi-experimental study (Economic Policy, 2008) found aggregate employment barely moved while hourly wages rose in regulated large firms, turnover increased, workers sorted into smaller unregulated firms, and dual-job holding rose, and Askenazy (2013) showed keeping costs down required large recurring payroll-tax subsidies. Left voluntary, a four-day week becomes a white-collar perk that widens the divide with frontline hourly workers; mandated broadly, it raises costs, prices, or fiscal burdens.",
      proponent_rebuttal:
        "The arithmetic assumes every hour of a 40-hour week is equally productive and ignores how economies historically absorbed shorter workweeks, from six days to five, as productivity rose. France's 35-hour framework did not wreck productivity: OECD data shows French GDP per hour worked remains above the UK and euro-area average and only modestly below the United States, proving shorter statutory hours are compatible with a high-productivity economy. For continuous-coverage sectors, staggered four-day rosters (different days off across a team) keep hospitals, shops, and plants open seven days a week, just as healthcare already relies on 3×12 schedules. Rather than rejecting shorter hours because voluntary adoption starts in offices, proponents argue gradual sectoral bargaining, phased statutory baselines, and sharing automation gains as leisure rather than consumption can extend access to frontline workers.",
      crux: {
        id: "four-day-labor-cost",
        title: "The Macroeconomic Labor Cost Test",
        question:
          "How much of the 20% cut in hours can productivity absorb across sectors?",
        description:
          "The share of lost hours offset by higher hourly productivity (versus absorbed by higher unit labor costs, prices, subsidies, or reduced access for hourly workers) decides whether broad adoption is economically viable.",
        methodology:
          "Track audited firm-level output per worker, unit labor costs, staffing levels, consumer prices, and hourly-versus-salaried adoption rates across multi-sector natural experiments and phased policy trials, benchmarked against matched non-adopting firms.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Audited firm-level output per worker, unit labor costs, and staffing records across manufacturing, retail, healthcare, and office sectors adopting a 32-hour week at full pay without state payroll subsidies, compared with matched five-day firms.",
        },
        cost_to_verify:
          "$500K-1M (Sectoral firm-accounts panel analysis of phased adoption across industries)",
        falsification: {
          supporter_flip:
            "If audited firm accounts across manufacturing, retail, and healthcare adopting a 32-hour week at full pay without subsidies showed unit labor costs rising near the full mechanical gap (forcing price hikes, layoffs, or reversion), the case for economy-wide adoption would have to retreat to sectors with compressable slack.",
          skeptic_flip:
            "If multi-sector firm-level evaluations outside salaried offices achieved sustained 32-hour schedules without state payroll subsidies, higher turnover, or widening unit labor costs while maintaining staffing coverage, the claim that hours-bound sectors cannot absorb shorter weeks would need revision.",
          common_ground:
            "Both sides accept that in coverage-bound roles like bedside nursing, retail, and hospitality, keeping operating hours constant under shorter individual weeks requires additional staffing or staggered rosters, and that net economic cost hinges on how much hourly productivity rises.",
          live_disagreement:
            "How much of a 20% hour reduction productivity can absorb across non-office sectors without triggering higher unit labor costs, recurring public subsidies, or a permanent white-collar-versus-frontline divide.",
        },
      },
      evidence: [
        {
          id: "france-35-hour-week",
          title: "France's 35-Hour Framework: High OECD Output per Hour, Backed by Payroll Subsidies and Higher Work Intensity",
          description:
            "After France legislated a 35-hour statutory week in 2000 (Aubry laws), OECD labour productivity data continued to place France's GDP per hour worked above the United Kingdom and the euro-area average and only modestly below the United States, showing shorter statutory hours can coexist with high hourly productivity. However, Philippe Askenazy's 2013 review in the Cambridge Journal of Economics documents two major caveats: keeping employer costs manageable relied on large recurring social-security payroll subsidies, and internal firm reorganization frequently raised work intensity. Subsequent reforms also expanded overtime exemptions, keeping average actual hours worked above 35.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source: "OECD Labour Productivity Statistics; Philippe Askenazy, 'Working time regulation in France from 1996 to 2012,' Cambridge Journal of Economics 37(2), 323–347 (2013)",
          sourceUrl: "https://doi.org/10.1093/cje/bes084",
          reasoning:
            "Pairs gold-standard OECD output-per-hour statistics with peer-reviewed institutional analysis. Supports compatibility between shorter statutory baselines and high hourly productivity, while honestly scoping the 39-to-35-hour (~10%) cut, state subsidies, and work-intensity trade-off.",
        },
        {
          id: "france-estevao-sa-2008",
          title: "France's 35-Hour Quasi-Experiment (2008): Aggregate Employment Flat, While Turnover and Dual-Job Holding Rose",
          description:
            "Exploiting France's staggered rollout of the 35-hour mandate (large firms in 2000, small firms in 2002), Marcello Estevão and Filipa Sá (Economic Policy, 2008) found aggregate employment was largely unaffected, while relative hourly wages rose in regulated large firms (where monthly pay was maintained). Labor turnover increased as firms shed higher-cost workers, some employees shifted to smaller unregulated firms, and dual-job holding rose as constrained workers sought extra hours. Welfare effects were split: women gained from schedule coordination, while managers reported lower welfare under the administrative burden.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "Marcello Estevão & Filipa Sá, 'The 35-hour workweek in France: Straightjacket or welfare improvement?' Economic Policy 23(55), 417–463 (2008)",
          sourceUrl: "https://doi.org/10.1111/j.1468-0327.2008.00204.x",
          reasoning:
            "Rigorous peer-reviewed quasi-experiment on the largest national statutory workweek cut in a major economy. Directly tests what happens when shorter hours at constant monthly pay are mandated across sectors rather than adopted voluntarily by self-selected firms.",
        },
        {
          id: "bls-hourly-coverage-2024",
          title: "U.S. Bureau of Labor Statistics (2024): 80.3 Million Workers (55.6%) Are Paid at Hourly Rates",
          description:
            "According to the U.S. Bureau of Labor Statistics report Characteristics of Minimum Wage Workers, 2024 (Report 1115), 80.3 million U.S. wage and salary workers aged 16 and older were paid at hourly rates in 2024, representing 55.6% of the wage-and-salary workforce. Because hourly-paid jobs concentrate heavily in retail, healthcare support, hospitality, logistics, and production, where output tracks staffed hours rather than salaried meeting slack, voluntary four-day schedules adopted by office employers leave more than half the workforce facing a different economic equation unless paired with additional hiring or policy intervention.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 7,
          },
          source: "U.S. Bureau of Labor Statistics, 'Characteristics of Minimum Wage Workers, 2024,' Report 1115 (2025)",
          sourceUrl: "https://www.bls.gov/opub/reports/minimum-wage/2024/",
          reasoning:
            "Official federal labor-force census data establishes the baseline scale of hourly work. Directness is 7 because hourly pay does not mechanically rule out staggered four-day shifts, but it quantifies why voluntary white-collar pilots cannot simply be extrapolated to the whole labor market.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Work time reduction via a 4-day workweek finds improvements in workers' well-being: Fan, Schor, Kelly & Gu, Nature Human Behaviour (2025)",
      url: "https://doi.org/10.1038/s41562-025-02259-6",
    },
    {
      title: "Making It Stick: The UK Four-Day Week Pilot One Year On: Autonomy, Cambridge & Boston College (2024)",
      url: "https://autonomy.work/wp-content/uploads/2024/02/making-it-stick_-1.pdf",
    },
    {
      title: "4-Day Week Germany-Wide Pilot Study: University of Münster (2024)",
      url: "https://www.wiwi.uni-muenster.de/tow/en/research/4-day-week-germany-wide-pilot-study",
    },
    {
      title: "Going Public: Iceland's Journey to a Shorter Working Week: Autonomy & Alda (2021)",
      url: "https://autonomy.work/wp-content/uploads/2021/06/ICELAND_4DW.pdf",
    },
    {
      title: "The 35-hour workweek in France: Straightjacket or welfare improvement? Estevão & Sá, Economic Policy (2008)",
      url: "https://doi.org/10.1111/j.1468-0327.2008.00204.x",
    },
    {
      title: "Working time regulation in France from 1996 to 2012: Philippe Askenazy, Cambridge Journal of Economics (2013)",
      url: "https://doi.org/10.1093/cje/bes084",
    },
    {
      title: "Characteristics of Minimum Wage Workers, 2024: U.S. Bureau of Labor Statistics Report 1115 (2025)",
      url: "https://www.bls.gov/opub/reports/minimum-wage/2024/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can the four-day week work outside salaried office jobs?",
      content:
        "Most voluntary trials have been concentrated in offices, agencies, and flexible service firms. With 55.6% of U.S. wage and salary workers paid by the hour (BLS, 2024), healthcare, manufacturing, retail, and hospitality face coverage constraints that meeting cuts alone cannot solve. Staggered rosters can keep doors open seven days a week, but they require either additional hiring or higher output per staffed hour.",
    },
    {
      id: "q2",
      title: "Why did voluntary pilots succeed while Belgium's four-day week drew under 1% uptake?",
      content:
        "The contrast highlights two different policies sharing one label. Voluntary 100:80:100 trials cut total weekly hours to roughly 32 at unchanged pay, which drove the burnout and sleep gains documented in the 2025 Nature Human Behaviour study. Belgium's November 2022 law only let workers compress the same 38–40 hours into four longer days, a schedule systematic reviews have not found to reliably improve health.",
    },
    {
      id: "q3",
      title: "Would broad adoption require public subsidies or widen inequality?",
      content:
        "If four-day weeks remain purely voluntary, access clusters among higher-paid salaried professionals, mirroring the white-collar/frontline split seen with remote work. Yet France's 35-hour experience shows that mandating shorter hours across sectors at unchanged monthly pay brought higher turnover, dual-job holding, work intensification, and recurring payroll-tax subsidies, highlighting the trade-off between universal access and firm-level cost.",
    },
  ],
};
