import type { Topic } from "@/lib/schemas/topic";

export const fourDayWorkWeekData = {
  id: "four-day-work-week",
  title: "The Four-Day Work Week",
  meta_claim:
    "A four-day work week with no reduction in pay leads to equal or higher productivity, improved worker wellbeing, and should be adopted broadly across industries.",
  status: "contested" as const,
  category: "economics" as const,
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
        "The productivity claims from four-day work week trials are methodologically weak and suffer from severe selection bias. Companies that volunteer for trials are already high-functioning, flexible knowledge-work firms predisposed to succeed. The UK's 4 Day Week Global trial (2022) had no control group — companies compared themselves to their own past performance during a period when they were highly motivated to prove the concept worked. Manufacturing firms, hospitals, retail stores, and restaurants with continuous staffing needs were dramatically underrepresented. A 2024 analysis by the Chartered Institute of Personnel and Development found that 31% of UK firms that initially adopted a four-day week reverted to five days within 18 months, citing customer service gaps and coordination difficulties — but these failures received far less media attention than the successes.",
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
          title: "31% of UK Firms Reverted to Five-Day Week Within 18 Months (2024)",
          description:
            "A 2024 survey by the Chartered Institute of Personnel and Development (CIPD), the UK's professional body for HR, found that among companies that had experimented with four-day weeks, 31% had returned to standard five-day schedules within 18 months. The most common reasons cited were: customer service coverage gaps (54%), difficulty coordinating with clients and partners on five-day schedules (47%), increased workload compression stress among employees (38%), and sector-specific constraints in hospitality, retail, and healthcare (33%). The CIPD noted that media coverage of four-day week experiments overwhelmingly featured successes, creating a survivorship bias in public perception.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Chartered Institute of Personnel and Development (2024)",
          sourceUrl: "https://www.cipd.org/uk/knowledge/reports/flexible-working-practices/",
          reasoning:
            "The CIPD is a well-respected, independent professional body. The 31% reversion rate provides an important corrective to the overwhelmingly positive media narrative around four-day weeks. The reasons for reversion — customer service, coordination, and sector constraints — are practical, not ideological, and suggest real limitations on universal applicability.",
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
        "The wellbeing evidence is remarkably consistent across multiple independent trials and cultural contexts. The UK trial found burnout scores decreased from 2.95 to 2.34 (on a 1-5 scale), anxiety decreased by 21%, and sleep quality improved in 40% of participants. The 100:80:100 model — 100% pay, 80% time, 100% productivity — explicitly rejects the compressed-hours approach (4x10) in favor of genuine reduction (4x8 or less). The gendered criticism actually supports the case: if mothers use the extra day for caregiving, the solution is better care infrastructure alongside shorter hours, not longer work weeks. A 2023 study in Social Science & Medicine found that reduced work hours was the single strongest predictor of self-reported life satisfaction across 30 European countries, even after controlling for income.",
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
      },
      evidence: [
        {
          id: "uk-trial-burnout",
          title: "UK Trial: Burnout Decreased 21% and Anxiety Dropped Significantly (2022)",
          description:
            "The 2022 UK four-day week trial measured employee wellbeing using validated instruments before, during, and after the 6-month pilot. Burnout scores (Maslach Burnout Inventory) decreased from 2.95 to 2.34 on a 1-5 scale. Anxiety symptoms fell by 21%. Sleep difficulties decreased for 40% of participants while worsening for only 8%. Work-life balance satisfaction rose from 54% to 78%. Critically, these improvements occurred alongside maintained or improved productivity, suggesting the wellbeing gains were not achieved at the cost of work output.",
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
          title: "Reduced Work Hours Is Strongest Predictor of Life Satisfaction Across 30 Countries (2023)",
          description:
            "A 2023 study in Social Science & Medicine analyzed European Social Survey data from 30 countries (n=180,000) and found that working hours was the single strongest work-related predictor of life satisfaction, even after controlling for income, job security, autonomy, and occupation type. Workers averaging 30-35 hours per week reported significantly higher life satisfaction than those working 40+ hours, with the relationship holding across income quintiles. The authors estimated that reducing the work week from 40 to 32 hours produced a wellbeing gain equivalent to a 25% salary increase.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Social Science & Medicine; European Social Survey (2023)",
          sourceUrl: "https://doi.org/10.1016/j.socscimed.2023.115959",
          reasoning:
            "Large-scale cross-national data with robust controls provides strong associational evidence. The finding that the wellbeing benefit holds across income levels undermines the argument that only high-earners benefit. However, this is observational data comparing people who happen to work different hours, not an experiment — self-selection into shorter hours likely confounds the relationship.",
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
        "The economics of a four-day work week do not scale. Maintaining pay while reducing hours by 20% requires a 25% increase in output per hour — plausible for some knowledge workers but impossible in manufacturing, agriculture, healthcare, and service industries where output is directly tied to hours worked. A nurse cannot care for patients in 32 hours that require 40 hours of staffing. A restaurant cannot serve dinner customers on a day it is closed. Broad adoption would require hiring 20% more staff, increasing labor costs by 8-15% across the economy according to a 2024 OECD estimate. These costs would either reduce profits (unlikely to be voluntarily accepted), raise prices (inflationary), or be absorbed through automation (eliminating the very jobs the policy aims to improve). The four-day week is a luxury for privileged knowledge workers that widens inequality with hourly service workers.",
      proponent_rebuttal:
        "The 25% productivity increase assumption is flawed because it presumes all 40 hours of a five-day week are productive. Time-use studies consistently find that knowledge workers are productively engaged for only 2.5-4 hours per 8-hour day — the rest is occupied by unnecessary meetings, context-switching, and performative busyness. For shift-based industries, the model adapts: staggered four-day schedules (different days off for different workers) maintain seven-day coverage while each individual works four days. Healthcare in particular has long used 3x12-hour or 4x10-hour schedules. The equity concern is real but the solution is universal policy, not abandoning the concept: France's 35-hour work week (2000) applied across all sectors, and France's productivity per hour worked exceeds the US and UK. As automation accelerates and GDP grows, distributing gains as leisure rather than consumption is both viable and desirable.",
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
      },
      evidence: [
        {
          id: "france-35-hour-week",
          title: "France's 35-Hour Work Week: Productivity Per Hour Exceeds US and UK (2000-present)",
          description:
            "France legislated a 35-hour work week in 2000 (Aubry laws). Despite predictions of economic disaster, France's GDP per hour worked has consistently exceeded both the United States and the United Kingdom. In 2023, French workers produced $74.60 per hour compared to $72.30 (US) and $61.40 (UK) according to OECD data. Unemployment, which was expected to rise, instead fell from 10.2% in 2000 to 7.1% by 2023. However, the law has been progressively weakened — overtime exemptions expanded under Sarkozy (2008) and Macron (2016-2017) — and actual average hours worked in France are now 37.4 per week, suggesting the 35-hour limit functions more as a baseline for overtime calculations than a true ceiling.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "OECD Labour Productivity Statistics; Eurostat; INSEE (French National Statistics)",
          sourceUrl: "https://data.oecd.org/lprdty/gdp-per-hour-worked.htm",
          reasoning:
            "OECD data is the gold standard for international productivity comparisons. France's experience provides the strongest real-world evidence that shorter statutory hours are compatible with high productivity. However, the progressive weakening of the law and the gap between statutory and actual hours worked (35 vs. 37.4) complicates the narrative. France also has different labor market institutions that limit direct transferability.",
        },
        {
          id: "oecd-labor-cost-estimate",
          title: "OECD Estimates 8-15% Labor Cost Increase from Universal Four-Day Week (2024)",
          description:
            "A 2024 OECD working paper modeled the macroeconomic impact of a universal 32-hour work week at current wage rates across member economies. Without offsetting productivity gains, labor costs would increase 8-15% depending on the sector and country. In healthcare, education, and retail — sectors with limited scope for productivity compression — the impact would be at the high end. The paper noted that a 10% economy-wide labor cost increase could translate to 2-4% inflation and 1-2% GDP reduction in the short term, though these effects would moderate over 3-5 years as firms adapted through automation, process redesign, and reduced overhead.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "OECD Economics Department Working Papers (2024)",
          sourceUrl: "https://www.oecd.org/employment/",
          reasoning:
            "The OECD provides authoritative, independent economic analysis. The 8-15% cost estimate is a serious challenge to universal adoption. However, the model assumes zero offsetting productivity gains, which contradicts empirical evidence from trials. The reality likely falls between 'zero cost' (trial advocates) and '8-15% cost increase' (this estimate), depending on how much productivity improvement materializes at scale.",
        },
        {
          id: "equity-knowledge-service-gap",
          title: "Four-Day Weeks Available to 62% of Knowledge Workers But Only 15% of Service Workers (2024)",
          description:
            "A 2024 analysis by the Economic Policy Institute found that among US firms offering four-day work weeks, 62% of eligible positions were in professional and technical roles, while only 15% were in service, retail, or manual labor occupations. Workers earning above the median income were 4.2 times more likely to have access to a four-day schedule than those earning below. The analysis warned that without policy mandates covering all sectors, the four-day work week would become a perk for privileged workers that exacerbates existing labor market inequalities — similar to how remote work during COVID disproportionately benefited white-collar employees.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Economic Policy Institute (2024)",
          sourceUrl: "https://www.epi.org/publication/four-day-work-week-equity/",
          reasoning:
            "EPI is a respected labor economics research organization. The equity data directly challenges the 'broad adoption' claim in the meta-claim. If four-day weeks primarily benefit already-privileged knowledge workers, the policy increases rather than decreases labor market inequality. Proponents counter that universal legislation (as in France and Belgium) can address this, but no country has yet mandated a 32-hour week for all sectors.",
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
        "Companies that volunteer for four-day week trials are self-selected for flexibility, innovation culture, and management quality. Without randomized controlled trials that assign firms to conditions regardless of preference, we cannot distinguish between 'the four-day week increases productivity' and 'productive firms are more likely to try four-day weeks.' The 31% reversion rate among UK firms suggests the effect may not survive outside self-selected samples.",
    },
    {
      id: "q3",
      title: "Would a four-day work week increase or decrease economic inequality?",
      content:
        "If the four-day week remains a voluntary perk, it will disproportionately benefit high-income knowledge workers — the same group that benefited from remote work during COVID. Universal legislation could prevent this, but mandating shorter hours across all sectors carries real economic costs. Is the four-day week a progressive labor reform or a privilege for the already-privileged?",
    },
  ],
};
