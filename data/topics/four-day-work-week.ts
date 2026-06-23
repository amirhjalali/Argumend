import type { Topic } from "@/lib/schemas/topic";

export const fourDayWorkWeekData = {
  id: "four-day-work-week",
  title: "The Four-Day Work Week",
  meta_claim:
    "A four-day work week with no reduction in pay leads to equal or higher productivity, improved worker wellbeing, and should be adopted broadly across industries.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "In the world's largest four-day-week trial (61 UK companies, 2022), revenue rose 1.4% on average and 56 of 61 firms kept the schedule — and Iceland cut the working week to 35–36 hours across ~2,500 public workers (1% of its workforce) with productivity holding steady. The catch most people miss: these were volunteer firms with no control group, and the model that works is genuine hour reduction (100% pay, 80% time, 100% output), not cramming five days into four.",
    confidence: 80,
    source:
      "4 Day Week Global / Autonomy / University of Cambridge & Boston College, \"The Results Are In: The UK's Four-Day Week Pilot\" (2023); Autonomy & Alda, Iceland trials report (2021)",
    sourceUrl:
      "https://autonomy.work/wp-content/uploads/2023/02/The-results-are-in-The-UKs-four-day-week-pilot.pdf",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The trial evidence is strikingly consistent: in the UK's 61-company pilot, revenue rose 1.4% and 92% of firms chose to keep the four-day week, while Iceland maintained productivity across 2,500 public-sector workers — because much of a knowledge-work day is meetings and context-switching, not output, so hours can shrink without production falling.",
    "But the trials are run by advocacy groups, the firms volunteer (selecting for office work that can absorb compressed schedules), and there's no randomized control group — and the model that succeeds is real hour reduction at full pay, which in coverage-bound sectors like nursing, retail, and manufacturing means hiring more people, not the same output in less time.",
    "So the honest debate isn't \"does a four-day week ever work\" (in white-collar trials it clearly can) but whether the maintained-productivity result survives outside self-selected office firms and scales to hours-bound industries without raising costs or widening the gap between knowledge and frontline workers.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Productivity & Business Performance
    // =========================================================================
    {
      id: "productivity-impact",
      title: "Productivity & Business Performance",
      short_summary:
        "Large-scale trials in the UK, Iceland, and elsewhere report maintained or increased productivity under four-day schedules, but critics argue these results reflect selection bias and may not generalize to manufacturing, healthcare, or service industries with continuous coverage requirements.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The productivity claims from four-day work week trials are methodologically weak and suffer from severe selection bias. Companies that volunteer for trials are already high-functioning, flexible knowledge-work firms predisposed to succeed. The UK's 4 Day Week Global trial (2022) had no control group — companies compared themselves to their own past performance during a period when they were highly motivated to prove the concept worked. Manufacturing firms, hospitals, retail stores, and restaurants with continuous staffing needs were dramatically underrepresented. Survey work by the Chartered Institute of Personnel and Development (2022) found employers broadly ambivalent about reducing hours and skeptical that a four-day week could work across all roles — citing customer-coverage gaps, coordination difficulties, and the problem of atypical and non-salaried workers — concerns that received far less media attention than the headline pilot successes.",
      proponent_rebuttal:
        "Iceland's trials — covering over 2,500 workers (1% of the entire workforce) across diverse public sector roles including hospitals, police, and social services from 2015-2019 — maintained productivity while dramatically improving worker wellbeing. This was not a self-selected startup sample; it included shift workers and public services. The UK's 2022 pilot, while imperfect, saw revenue increase by an average of 1.4% across 61 companies. Microsoft Japan's 2019 trial reported a 40% productivity increase. The mechanism is well-understood: Parkinson's Law (work expands to fill available time), reduced meeting bloat, and improved focus during compressed hours. A 2024 meta-analysis of 30 trials across 15 countries found that 91% of participating firms rated the trial successful enough to continue.",
      crux: {
        id: "four-day-rct-diverse",
        title: "The Cross-Industry Randomized Trial",
        description:
          "The decisive test is whether a four-day work week maintains productivity in a properly randomized trial across diverse industries — not just knowledge work, but manufacturing, healthcare, retail, and services. If the effect holds only in white-collar office environments, the policy cannot be 'broadly adopted' as claimed. If it holds across sectors, the case for broad adoption is strong.",
        methodology:
          "Conduct a government-sponsored randomized controlled trial across 500+ firms in at least 10 industries, randomly assigning firms to four-day or five-day schedules for 12+ months. Use objective productivity metrics (revenue per employee, output per hour, customer satisfaction scores, error rates) rather than self-reported measures. Include a mandatory 6-month follow-up after the trial ends to measure persistence. Stratify by industry, firm size, and workforce composition.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10-20M (Government-sponsored multi-industry RCT with objective productivity measurement)",
        falsification: {
          supporter_flip:
            "If a randomized cross-industry trial with a real control group showed productivity holding only in white-collar office firms and falling in manufacturing, healthcare, retail, and other coverage-bound sectors, the 'broadly adopt across industries' claim would collapse to 'works for knowledge work that already has slack in the day.'",
          skeptic_flip:
            "A skeptic citing selection bias should weigh that Iceland's trials included hospital, police, and social-service shift workers (not just startups) at 1% of the workforce with productivity maintained, and that even inside self-selected pilots 92% of firms kept the schedule — outcomes a 'volunteers just say nice things' story doesn't easily explain.",
          common_ground:
            "Both sides agree existing trials lack randomized control groups and over-represent flexible knowledge-work firms, and that compressed white-collar days contain measurable slack (meetings, context-switching) that can be trimmed.",
          live_disagreement:
            "Whether maintained productivity is a genuine effect of the schedule or an artifact of self-selected, highly motivated firms — which only a stratified, government-run RCT across 10+ industries with objective output metrics could settle.",
        },
      },
      evidence: [
        {
          id: "iceland-trial",
          title: "Iceland's Public Sector Trials: 2,500 Workers Maintained Productivity on Shorter Hours (2015-2019)",
          description:
            "Between 2015 and 2019, Iceland conducted two large-scale trials of reduced working hours (from 40 to 35-36 hours/week) involving over 2,500 public sector workers — approximately 1% of Iceland's entire working population. Participants included office workers, hospital staff, police officers, and social service workers. Productivity was maintained or improved across nearly all workplaces. The trials led to permanent changes: by 2024, 86% of Iceland's workforce had either moved to shorter hours or gained the right to negotiate them. Worker wellbeing improved significantly across stress, burnout, and work-life balance measures.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Autonomy Research; Alda (Icelandic trade union research institute)",
          sourceUrl: "https://autonomy.work/wp-content/uploads/2021/06/ICELAND_4DW.pdf",
          reasoning:
            "Iceland's trials are the most comprehensive real-world evidence, covering diverse public sector roles including shift work. The scale (1% of workforce) and duration (4 years) are impressive. However, Iceland is a small, homogeneous, high-trust society with strong unions — conditions that may not transfer to larger, more diverse economies. The lack of a randomized control group limits causal inference.",
        },
        {
          id: "uk-4dwg-trial",
          title: "UK 4 Day Week Trial: 61 Companies Report 1.4% Revenue Increase (2022)",
          description:
            "The world's largest coordinated four-day work week trial, organized by 4 Day Week Global with academic partners at Cambridge, Oxford, and Boston College, ran from June to December 2022 across 61 UK companies and approximately 2,900 employees. Companies reported an average revenue increase of 1.4% (weighted by company size), with 56 of 61 companies (92%) choosing to continue the four-day week after the trial. Absenteeism dropped 65%, resignations fell 57%, and employee wellbeing scores increased significantly. However, the trial had no randomized control group, and participating companies self-selected.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "4 Day Week Global; Cambridge University; Boston College",
          sourceUrl: "https://autonomy.work/wp-content/uploads/2023/02/The-results-are-in-The-UKs-four-day-week-pilot.pdf",
          reasoning:
            "The trial provides encouraging real-world data from a significant number of firms. However, independence is lower because 4 Day Week Global is an advocacy organization. The self-selection bias is substantial — firms that volunteered are likely those most suited to compressed schedules. The 1.4% revenue figure lacks a control group counterfactual, and could reflect broader economic trends rather than the schedule change.",
        },
        {
          id: "cipd-reversion-rate",
          title: "CIPD: Employers Ambivalent About Reducing Hours, See a Four-Day Week as Unlikely (2022)",
          description:
            "A report by the Chartered Institute of Personnel and Development (CIPD), the UK's professional body for HR, surveyed employer perspectives on the four-day week. It found that employers appear ambivalent about reducing working hours and see a broad move to a four-day week as unlikely. A practical challenge for employers that had reduced hours was that the arrangement did not suit everybody in their organisation, and the report flagged the difficulty of managing atypical and non-salaried workers under a shorter week. The findings temper the largely positive media narrative around four-day-week trials, which has tended to feature successful adopters.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "Chartered Institute of Personnel and Development, \"The four-day week: Employer perspectives\" (2022)",
          sourceUrl: "https://www.cipd.org/en/knowledge/reports/four-day-week/",
          reasoning:
            "The CIPD is a well-respected, independent professional body. Its employer-perspectives report provides a useful corrective to the overwhelmingly positive media coverage of four-day-week pilots, which over-represents self-selected, successful adopters. The findings are qualitative rather than a single headline statistic, and reflect practical employer concerns — fit across roles, coverage, and atypical workers — rather than ideological opposition.",
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
        "Four-day week trials consistently report large improvements in burnout, stress, sleep quality, and work-life balance, but some workers report that compressing five days of work into four increases daily intensity and stress.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Wellbeing improvements in four-day week trials may be driven by the novelty effect and Hawthorne effect (people behave differently when observed) rather than the schedule change itself. A 2024 study in Occupational Health Psychology found that among workers on compressed four-day schedules (4x10 hours rather than 4x8), 28% reported higher daily stress despite having an extra day off. Workers in client-facing roles reported feeling pressured to cram five days of responsiveness into four, leading to more intense workdays. Parents — especially mothers — often used the extra day for childcare and domestic labor rather than rest, suggesting the wellbeing benefit may be gendered. Long-term data beyond 2 years is virtually nonexistent.",
      proponent_rebuttal:
        "The wellbeing evidence is remarkably consistent across multiple independent trials and cultural contexts. In the UK trial, organizers reported that 71% of staff experienced reduced burnout, 39% reported less anxiety, and 40% reported improved sleep quality. The 100:80:100 model — 100% pay, 80% time, 100% productivity — explicitly rejects the compressed-hours approach (4x10) in favor of genuine reduction (4x8 or less). The gendered criticism actually supports the case: if mothers use the extra day for caregiving, the solution is better care infrastructure alongside shorter hours, not longer work weeks. A 2022 study in Health Economics Review, using European Social Survey data, found that fewer working hours were significantly associated with higher life satisfaction across Europe, even after controlling for income.",
      crux: {
        id: "wellbeing-persistence",
        title: "The Long-Term Wellbeing Persistence Test",
        description:
          "If four-day week wellbeing improvements persist beyond two years — after the novelty effect fades and compressed habits stabilize — the benefits are real. If improvements revert to baseline or are offset by increased daily intensity, the wellbeing case collapses. Currently, virtually no trial has measured wellbeing outcomes beyond 24 months.",
        methodology:
          "Conduct a 5-year longitudinal study following workers who transitioned to four-day weeks, with annual assessments of burnout (Maslach Burnout Inventory), life satisfaction (SWLS), daily cortisol levels (salivary biomarker), and sleep quality (actigraphy). Include a matched control group of workers who remained on five-day schedules. Stratify by gender, parental status, job type, and whether the four-day week is compressed (4x10) or reduced (4x8).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$3-5M (5-year longitudinal cohort study with biomarker collection and matched controls)",
        falsification: {
          supporter_flip:
            "If a 5-year longitudinal study with matched controls showed wellbeing gains reverting to baseline after the novelty wears off — or being cancelled out by higher daily intensity for client-facing and compressed-schedule workers — the wellbeing case for a shorter week would lose its foundation.",
          skeptic_flip:
            "A skeptic attributing the gains to novelty or the Hawthorne effect should weigh that improvements appear across multiple independent trials, validated instruments (Maslach burnout), and cultures, and that European Social Survey data link fewer hours to higher life satisfaction even after controlling for income — a pattern broader than any single observed pilot.",
          common_ground:
            "Both sides agree that genuine hour reduction (4×8) helps wellbeing more than mere compression (4×10), that almost no trial has clean data past 24 months, and that early reported burnout and sleep improvements are real within the trial windows.",
          live_disagreement:
            "Whether the wellbeing improvements persist beyond two years once habits stabilize and observation ends — which only a multi-year cohort with biomarkers, actigraphy, and a matched five-day control group can determine.",
        },
      },
      evidence: [
        {
          id: "uk-trial-burnout",
          title: "UK Trial: Most Workers Reported Reduced Burnout, Stress, Anxiety, and Better Sleep (2022)",
          description:
            "The 2022 UK four-day week trial (61 companies, ~2,900 employees, June-December 2022) measured employee wellbeing using validated instruments before, during, and after the 6-month pilot. As reported by the organizers, 71% of staff reported reduced burnout, 39% were less stressed, 39% reported less anxiety and fatigue, and 40% reported improved sleep, while overall mental and physical health ratings improved. Critically, these improvements occurred alongside broadly maintained revenue and productivity, suggesting the wellbeing gains were not achieved at the cost of work output. (An earlier version of this card listed specific before/after scores — 'burnout 2.95→2.34', 'anxiety -21%', 'work-life balance 54%→78%' — that do not match the published figures and have been replaced with the reported headline percentages.)",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "4 Day Week Global; Juliet Schor, Boston College; Cambridge University",
          sourceUrl: "https://www.4dayweek.com/uk-pilot-results",
          reasoning:
            "Validated instruments (Maslach, standard anxiety scales) provide credible measurement. The consistency of improvements across multiple wellbeing dimensions strengthens confidence. However, the 6-month duration cannot distinguish genuine improvement from novelty effects, and the advocacy organization's involvement in data collection reduces independence. Longer follow-up is essential.",
        },
        {
          id: "compressed-hours-stress",
          title: "Compressed 4x10 Schedules Increase Daily Stress for 28% of Workers (2024)",
          description:
            "A study published in the Journal of Occupational Health Psychology in 2024 compared two forms of four-day schedules: compressed (4x10 hours) and reduced (4x8 hours with no pay cut). Among 800 workers on compressed schedules, 28% reported higher daily stress than on their previous five-day schedule, particularly those in client-facing roles requiring real-time responsiveness. Workers on reduced-hour schedules showed almost universally positive wellbeing outcomes. The study concluded that the mechanism matters: genuine reduction in total hours improves wellbeing, but mere compression of the same hours into fewer days produces mixed results.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Journal of Occupational Health Psychology (2024)",
          sourceUrl: "https://doi.org/10.1037/ocp0000398",
          reasoning:
            "Published in a respected peer-reviewed journal with a meaningful sample size. The distinction between compressed and reduced schedules is critically important — many four-day week discussions conflate the two, but they have different wellbeing implications. This evidence does not refute the four-day week per se but shows that the '100:80:100' reduced-hours model is essential, not just a four-day calendar rearrangement.",
        },
        {
          id: "european-life-satisfaction",
          title: "Fewer Working Hours Linked to Higher Life Satisfaction Across Europe (2022)",
          description:
            "A 2022 study in Health Economics Review (Qinglong Shao) analyzed wave 10 of the European Social Survey (18,060 respondents across European countries) and found a significant negative relationship between working hours and life satisfaction: fewer working hours were associated with higher life satisfaction. Income was also an important driver of life satisfaction, and the analysis controlled for it. The study found that health plays an essential mediating role — part of the benefit of shorter hours appears to operate through improved health rather than as a purely direct effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Qinglong Shao, \"Does less working time improve life satisfaction? Evidence from European Social Survey,\" Health Economics Review (2022)",
          sourceUrl: "https://doi.org/10.1186/s13561-022-00396-6",
          reasoning:
            "Large-scale cross-national survey data with income controls provides credible associational evidence that shorter hours track higher life satisfaction. However, this is observational data comparing people who happen to work different hours, not an experiment — self-selection into shorter hours likely confounds the relationship, and the effect is partly mediated by health rather than direct. It supports, but does not prove, the wellbeing case for a shorter week.",
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
        "A four-day week with maintained pay implies either a 20% productivity increase to offset lost hours or a redistribution of economic value from profits to worker leisure — with profound implications for labor markets, inflation, and the gap between knowledge workers and hourly service workers.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The economics of a four-day work week do not scale. Maintaining pay while reducing hours by 20% requires a 25% increase in output per hour — plausible for some knowledge workers but impossible in manufacturing, agriculture, healthcare, and service industries where output is directly tied to hours worked. A nurse cannot care for patients in 32 hours that require 40 hours of staffing. A restaurant cannot serve dinner customers on a day it is closed. Broad adoption would require hiring substantially more staff to maintain coverage, increasing economy-wide labor costs (the precise magnitude is contested and depends on how much productivity rises to offset the lost hours). These costs would either reduce profits (unlikely to be voluntarily accepted), raise prices (inflationary), or be absorbed through automation (eliminating the very jobs the policy aims to improve). The four-day week is a luxury for privileged knowledge workers that widens inequality with hourly service workers.",
      proponent_rebuttal:
        "The 25% productivity increase assumption is flawed because it presumes all 40 hours of a five-day week are productive. Time-use studies consistently find that knowledge workers are productively engaged for only 2.5-4 hours per 8-hour day — the rest is occupied by unnecessary meetings, context-switching, and performative busyness. For shift-based industries, the model adapts: staggered four-day schedules (different days off for different workers) maintain seven-day coverage while each individual works four days. Healthcare in particular has long used 3x12-hour or 4x10-hour schedules. The equity concern is real but the solution is universal policy, not abandoning the concept: France's 35-hour work week (2000) applied across all sectors, and France's productivity per hour worked exceeds the UK and the euro-area average while remaining only modestly below the US — shorter statutory hours have proved compatible with high productivity. As automation accelerates and GDP grows, distributing gains as leisure rather than consumption is both viable and desirable.",
      crux: {
        id: "four-day-labor-cost",
        title: "The Macroeconomic Labor Cost Test",
        description:
          "If a four-day work week with maintained pay can be implemented broadly without significant inflation, unemployment increases, or GDP reduction, the economic feasibility case is strong. If broad adoption leads to measurable macroeconomic harm — rising prices, reduced output, or increased inequality between four-day and five-day workers — it remains a niche benefit for privileged sectors.",
        methodology:
          "Use a computable general equilibrium (CGE) model calibrated to a mid-size open economy to simulate the macroeconomic effects of a universal 32-hour work week at current wage rates. Model three scenarios: (1) productivity increase fully absorbs lost hours, (2) 50% absorption with remainder as increased labor costs, (3) no productivity increase. Measure impacts on GDP, inflation, employment, sectoral output, and Gini coefficient. Validate against observed data from France (35-hour week), Iceland, and Belgium (right to four-day week, 2022).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Macroeconomic modeling with sectoral detail, validated against existing natural experiments)",
        falsification: {
          supporter_flip:
            "If a calibrated general-equilibrium model — validated against France's 35-hour week, Iceland, and Belgium — showed that a universal 32-hour week at full pay raises economy-wide unit labor costs, prices, or unemployment with no offsetting productivity gain, the 'broadly feasible' claim would have to retreat to 'feasible only in sectors with slack to compress.'",
          skeptic_flip:
            "A skeptic warning of mechanical cost increases should weigh that time-use studies find much of a knowledge-work day is non-productive, that shift industries already use staggered 4×10 and 3×12 coverage, and that France's GDP per hour worked exceeds the UK and euro-area average despite a statutory 35-hour week — so 'output is rigidly tied to hours' is not universally true.",
          common_ground:
            "Both sides agree that in genuinely hours-bound sectors (nursing, retail, hospitality) maintaining coverage at reduced hours requires more staff and higher payroll, and that the net effect hinges on how much productivity rises to absorb the lost hours.",
          live_disagreement:
            "How much of the lost 20% of hours productivity actually absorbs across sectors — the parameter that decides whether broad adoption is roughly cost-neutral or inflationary — which only sectoral macro-modeling validated against real natural experiments can pin down.",
        },
      },
      evidence: [
        {
          id: "france-35-hour-week",
          title: "France's 35-Hour Work Week: High Per-Hour Productivity Despite Shorter Statutory Hours (2000-present)",
          description:
            "France legislated a 35-hour work week in 2000 (Aubry laws). Despite predictions of economic disaster, France sustained high labour productivity: its GDP per hour worked exceeds the United Kingdom and the euro-area average, and sits only modestly below the United States. In 2023, OECD data put France's GDP per hour worked slightly below the US and well above the UK. (An earlier version of this card claimed France exceeded the US; OECD data does not support that — the US leads France on output per hour, while France leads the UK.) The law has been progressively weakened — overtime exemptions expanded under Sarkozy (2008) and Macron (2016-2017) — and average actual hours worked in France are above the 35-hour statutory figure, suggesting the 35-hour limit functions more as a baseline for overtime calculations than a true ceiling.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source: "OECD Labour Productivity Statistics; Eurostat; INSEE (French National Statistics)",
          sourceUrl: "https://www.oecd.org/en/data/indicators/gdp-per-hour-worked.html",
          reasoning:
            "OECD data is the gold standard for international productivity comparisons. France's experience provides real-world evidence that shorter statutory hours are compatible with high productivity — France's output per hour clearly exceeds the UK and the euro-area average. But it does NOT exceed the United States, contrary to a common talking point, so this is evidence of compatibility, not superiority. The progressive weakening of the law and the gap between statutory and actual hours worked complicate the narrative, and France's distinct labor-market institutions limit direct transferability. Weights were reduced from an earlier overstatement once the false 'exceeds US' claim was corrected.",
        },
        {
          id: "oecd-labor-cost-estimate",
          title: "Accounting Logic: A Universal 32-Hour Week Without Productivity Gains Raises Unit Labor Costs",
          description:
            "If working hours are cut ~20% (40→32) at unchanged pay, and per-hour output does not rise to compensate, unit labor costs rise mechanically — by the most for sectors where output is tied to staffing hours (healthcare, education, retail, hospitality) and least for knowledge work with slack in the day. Maintaining the same coverage requires hiring roughly proportionally more staff, raising payroll. In an economy where labor is a large share of cost, a broad rise in unit labor costs without offsetting productivity would put upward pressure on prices and downward pressure on output in the short run, moderating over time as firms adapt through automation and process redesign. NOTE: an earlier version of this card cited a specific '2024 OECD working paper' with an '8-15% labor cost increase' figure; that citation could not be verified and the precise figures should be treated as illustrative, not as a sourced OECD estimate.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Standard labor-cost accounting (illustrative); prior OECD citation unverified",
          sourceUrl: "https://www.oecd.org/en/topics/employment.html",
          reasoning:
            "The underlying logic is sound and is the central economic objection to broad adoption: reduce hours at constant pay without a productivity offset and unit labor costs rise, most in coverage-bound sectors. However, the specific '8-15%' magnitude and the attribution to a 2024 OECD working paper could not be web-verified and appear to have been fabricated in an earlier version, so source reliability is downgraded. The real-world cost depends entirely on how much of the lost hours productivity actually absorbs — empirically contested.",
        },
        {
          id: "equity-knowledge-service-gap",
          title: "Voluntary Four-Day Weeks Cluster in White-Collar Roles, Risking a Knowledge-vs-Service Divide",
          description:
            "Four-day-week and reduced-hours arrangements have so far concentrated overwhelmingly in white-collar, knowledge-work, and salaried roles, where a workday has slack to compress; service, retail, hospitality, frontline, and manual occupations — where output is tied to hours of coverage or physical production — adopt them far less. Commentators and labor analysts warn this mirrors the COVID remote-work pattern, where flexibility accrued mainly to higher-paid professionals, and that a voluntary four-day week could widen the divide between white-collar and frontline workers absent universal policy. NOTE: an earlier version cited a specific '2024 Economic Policy Institute' study with precise '62% vs 15%' access figures and a '4.2x' income multiplier; that study and those figures could not be web-verified and should be treated as unverified.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Labor-market commentary on occupational access (qualitative); prior EPI citation unverified",
          sourceUrl: "https://en.wikipedia.org/wiki/Four-day_workweek",
          reasoning:
            "The equity concern directly challenges the 'broad adoption' claim in the meta-claim and is well-supported qualitatively: voluntary four-day weeks cluster in roles that can absorb compressed hours, which skew higher-paid and white-collar. However, the specific '62% vs 15%' split and '4.2x' figure attributed to a 2024 EPI study could not be verified and appear fabricated, so this is retained as a directional/qualitative point with reduced source reliability rather than a hard statistic. Proponents counter that universal legislation (as in France and Belgium) can address access, but no country has yet mandated a 32-hour week for all sectors.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Going Public: Iceland's Journey to a Shorter Working Week — Autonomy Research (2021)",
      url: "https://autonomy.work/wp-content/uploads/2021/06/ICELAND_4DW.pdf",
    },
    {
      title: "The Results Are In: The UK's Four-Day Week Pilot — 4 Day Week Global (2023)",
      url: "https://autonomy.work/wp-content/uploads/2023/02/The-results-are-in-The-UKs-four-day-week-pilot.pdf",
    },
    {
      title: "France's 35-Hour Work Week: An Assessment After 20 Years — OECD (2020)",
      url: "https://data.oecd.org/lprdty/gdp-per-hour-worked.htm",
    },
    {
      title: "The Case for a Four-Day Work Week — Juliet Schor, Boston College (2022)",
      url: "https://www.4dayweek.com/research",
    },
    {
      title: "Working Time Reduction and Economic Performance — International Labour Organization",
      url: "https://www.ilo.org/global/topics/working-time/lang--en/index.htm",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can the four-day week work outside knowledge industries?",
      content:
        "Most successful trials have been in offices, tech companies, and white-collar public sector roles. Healthcare, manufacturing, retail, and agriculture present fundamentally different constraints — output is directly tied to hours of coverage or physical production. Staggered schedules can maintain coverage, but they require more staff and more complex coordination. Is the four-day week inherently limited to a subset of the economy?",
    },
    {
      id: "q2",
      title: "Is the productivity claim real or an artifact of selection bias?",
      content:
        "Companies that volunteer for four-day week trials are self-selected for flexibility, innovation culture, and management quality. Without randomized controlled trials that assign firms to conditions regardless of preference, we cannot distinguish between 'the four-day week increases productivity' and 'productive firms are more likely to try four-day weeks.' Even with high continuation rates inside the pilots, employer surveys (e.g. CIPD 2022) find broad ambivalence and doubt that the model fits all roles, suggesting the effect may not survive outside self-selected samples.",
    },
    {
      id: "q3",
      title: "Would a four-day work week increase or decrease economic inequality?",
      content:
        "If the four-day week remains a voluntary perk, it will disproportionately benefit high-income knowledge workers — the same group that benefited from remote work during COVID. Universal legislation could prevent this, but mandating shorter hours across all sectors carries real economic costs. Is the four-day week a progressive labor reform or a privilege for the already-privileged?",
    },
  ],
};
