export const drugDecriminalizationData = {
  id: "drug-decriminalization",
  title: "Drug Decriminalization",
  question:
    "Does decriminalizing drug use, with treatment, improve public health?",
  meta_claim:
    "Decriminalizing personal drug use, paired with treatment investment, can improve public health outcomes compared to criminalization — though results depend heavily on implementation.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Two decades after Portugal decriminalized all drugs in 2001 and moved spending to treatment, its drug-induced death rate was roughly 6 per million among ages 15-64, against an EU average of 23.7. Oregon's Measure 110 issued 6,271 possession tickets by September 2023; roughly 50 people entered treatment through its hotline, and the state recriminalized possession in 2024. The fight is over how much of Portugal's result came from dropping penalties, and how much from the treatment that came with it.",
    confidence: 84,
    source:
      "Transform Drug Policy Foundation (2021), drawing on EMCDDA data; Oregon Secretary of State Audit 2025-29; KPTV/OPB hotline reporting (2023)",
    sourceUrl:
      "https://transformdrugs.org/blog/drug-decriminalisation-in-portugal-setting-the-record-straight",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that decriminalization without funded treatment and harm-reduction capacity, the path Oregon's Measure 110 took, does not deliver Portugal's results, and that access to treatment is what actually reduces addiction harm.",
    "They split over how much of Portugal's improvement came from removing criminal penalties and how much from the treatment investment made at the same time, which decides whether the model travels to places that won't fund the treatment half; and over whether court-mandated treatment through drug courts works enough better than voluntary referral to justify the costs and harms of arrest.",
  ],
  pillars: [
    {
      id: "public-health-outcomes",
      title: "Public Health Outcomes",
      short_summary:
        "Portugal decriminalized all drugs in 2001 alongside heavy treatment investment. Drug-induced deaths and HIV infections among people who inject drugs fell sharply, and overall use stayed near the European average.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Removing penalties before treatment capacity exists can strip away the leverage that pushes people toward help while doing nothing to expand care. Oregon's Measure 110 is the cautionary case: it decriminalized possession but the promised treatment pathway barely functioned, and amid visible public-disorder problems voters and lawmakers reversed course within three years. Critics also warn decriminalization can normalize use and let open-air drug markets concentrate harm in specific neighborhoods. (Portugal avoided this — but only because decriminalization arrived bundled with real treatment infrastructure, which is the hard part to replicate.)",
      proponent_rebuttal:
        "Two decades after Portugal decriminalized in 2001, its drug-induced death rate sat around 6 per million adults — far below the EU average of 23.7 — and new HIV diagnoses tied to injecting drug use fell from over 1,000 to a handful per year, while overall use stayed near the European average. The gains came from a package that paired decriminalization with treatment and harm reduction, redirecting resources from punishment to healthcare so addiction is caught earlier. The mechanism — not a magic 'decrim alone' number — is what travels.",
      crux: {
        id: "decrim-use-rates",
        title: "Use Rates Under Decriminalization vs. Criminalization",
        question:
          "How much of Portugal's improvement came from decriminalization versus treatment investment?",
        description:
          "Rigorous comparison of drug use prevalence, problematic use rates, and overdose deaths in jurisdictions that decriminalized vs. those that maintained criminal penalties, controlling for other policy differences.",
        methodology:
          "Difference-in-differences analysis comparing drug use surveys, emergency room data, and mortality statistics across matched jurisdictions with and without decriminalization, over 10+ year windows.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Compare jurisdictions that changed one thing at a time, decriminalizing with slow treatment rollout or expanding treatment without decriminalizing, with Portugal, which did both, on overdose deaths, HIV infections and problem drug use, with the timing of each change lined up.",
        },
        cost_to_verify: "$500K (Multi-jurisdiction longitudinal analysis of existing data)",
        falsification: {
          supporter_flip:
            "If well-matched comparisons showed decriminalization — even bundled with treatment investment — reliably RAISING problematic use or overdose deaths versus criminalization, i.e. Portugal's results turned out to be driven by something other than the policy package and replicated nowhere, the public-health case would collapse.",
          skeptic_flip:
            "If other places that paired decriminalization with treatment saw what Portugal reports, overdose deaths well below the EU average and use near the European norm with no drug tourism, the fear of a usage surge would lose its footing.",
          common_ground:
            "Both sides agree that decriminalization WITHOUT funded treatment and harm-reduction capacity — the Oregon path — does not deliver Portugal's results.",
          live_disagreement:
            "How much of Portugal's improvement came from decriminalization itself versus the simultaneous treatment investment — and therefore whether the model exports to places that can't or won't fund the treatment half.",
        },
      },
      evidence: [
        {
          id: "portugal-20-year",
          title: "Portugal 20-Year Outcome Data Shows Dramatic Improvements",
          description:
            "Two decades after decriminalizing all drugs in 2001, Portugal had a drug-induced death rate of roughly 6 per million among ages 15-64 (EU average: 23.7 per million), new HIV diagnoses attributed to injecting drug use fell from over 1,000 in 2001 to 16 in 2019, and overall drug use remained below the European average.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 4,
            directness: 9,
          },
          source:
            "Transform Drug Policy Foundation, 'Drug decriminalisation in Portugal: setting the record straight' (2021), drawing on EMCDDA data",
          sourceUrl:
            "https://transformdrugs.org/blog/drug-decriminalisation-in-portugal-setting-the-record-straight",
          reasoning:
            "Longest-running natural experiment on decriminalization. High reliability and directness, but replicability is limited because Portugal simultaneously invested heavily in treatment and harm-reduction infrastructure, so policy effects cannot be cleanly isolated. Earlier versions of this claim cited a 3-per-million death rate (a ~2012 figure); the ~6-per-million 2019 figure is used here.",
        },
        {
          id: "oregon-measure-110",
          title: "Oregon Measure 110 Showed Severe Implementation Failures",
          description:
            "Oregon decriminalized possession of small amounts of all drugs via Measure 110, effective February 2021. Take-up of the new treatment pathway was minimal: of 6,271 possession tickets issued through September 2023, only about 8% (499 people) called the help hotline and roughly 50 (under 1% of those ticketed) entered treatment through it. Facing public backlash, the legislature repealed the decriminalization provision via House Bill 4002, recriminalizing possession effective September 2024. Note that peer-reviewed analyses (e.g. JAMA, 2023) found Measure 110 itself did not cause Oregon's overdose rise, which tracked the national fentanyl wave.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source:
            "Oregon Secretary of State Audit 2025-29 'Measure 110 Lacks Stability, Coordination, and Clear Results' (Dec 2025); hotline take-up reporting (KPTV/OPB, 2023)",
          sourceUrl: "https://sos.oregon.gov/audits/Documents/2025-29.pdf",
          reasoning:
            "Demonstrates an implementation and uptake failure of the decriminalization model as enacted in Oregon. Directness lowered because the strongest causal claim against decrim — that it drove overdose deaths — is not supported by peer-reviewed work; the failure was in treatment delivery, not a proven causal harm. Confounded by the fentanyl wave, COVID-era disruptions, and a slow rollout of treatment funding.",
        },
        {
          id: "emcdda-european-comparison",
          title: "Karolinska Study of EMCDDA Data: Softening or Toughening Cannabis Laws Did Not Measurably Change Youth Use in Europe",
          description:
            "Gabri, Galanti, Orsini and Magnusson (Karolinska Institutet, PLoS ONE, 2022) took self-reported cannabis use among 15- to 34-year-olds from EMCDDA surveys in 11 European countries (1994-2017) and ran interrupted time-series models around each change in cannabis law, classed as more lenient (decriminalisation or depenalisation) or stricter. Pooled use fell slightly after changes in either direction: -0.22 percent a year after lenient changes (95% CI -1.21 to 0.77) and -0.44 after stricter ones (95% CI -0.91 to 0.03). The authors conclude: 'Our findings do not support any considerable impact of cannabis legislation on the prevalence of recreational cannabis use among youth and young adults in Europe.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source:
            "Gabri AC, Galanti MR, Orsini N, Magnusson C, 'Changes in cannabis policy and prevalence of recreational cannabis use among adolescents and young adults in Europe: An interrupted time-series analysis', PLoS ONE 17(1): e0261885 (2022), using EMCDDA data",
          sourceUrl: "https://doi.org/10.1371/journal.pone.0261885",
          reasoning:
            "Peer-reviewed and built on the EMCDDA's own survey series, so it speaks to the skeptic's fear that dropping penalties drives use up: in these data it did not. Directness is 4 because it covers cannabis only, measures use rather than overdose or problem use, and only three countries changed their law during the window, so the confidence intervals are wide. An earlier version of this card said the EMCDDA had found that decriminalizing countries have lower problematic use and deaths; the EMCDDA makes no such finding, so the card was re-sourced to this study.",
        },
        {
          id: "us-overdose-under-criminalization",
          title: "US Overdose Deaths Hit Record Highs Under Criminalization",
          description:
            "The United States, where drug possession remained a crime in every state but Oregon in 2023, recorded an estimated 107,543 drug overdose deaths that year (CDC provisional data), down about 3% from the record 111,029 estimated for 2022. A 2010 Associated Press investigation found that after 40 years the war on drugs had cost $1 trillion, and that high school students reported the same rates of illegal drug use as they did in 1970.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 4,
          },
          source:
            "CDC NCHS, 'U.S. Overdose Deaths Decrease in 2023, First Time Since 2018' (15 May 2024); Martha Mendoza, Associated Press, 'US drug war has met none of its goals' (13 May 2010)",
          sourceUrl: "https://www.cdc.gov/nchs/pressroom/nchs_press_releases/2024/20240515.htm",
          reasoning:
            "Highly reliable mortality data showing criminalization has coincided with record harm. Low directness: correlation, not causation — rising deaths are driven primarily by the fentanyl supply shift, not the choice between criminalization and decriminalization. The prior '50-fold increase since 1979' framing was dropped as it overstated a clean causal story.",
        },
        {
          id: "bc-decrim-pilot-ended-2026",
          title: "British Columbia Let Its Three-Year Decriminalization Pilot Lapse on 31 January 2026, Saying It Had Not Delivered",
          description:
            "British Columbia decriminalized possession of small amounts of opioids, cocaine, methamphetamine and MDMA for adults under a Health Canada exemption launched in 2023. A 2024 amendment had already limited legal possession to private homes, places where homeless people are legally sheltering, and designated health and overdose-response sites. On 14 January 2026 Health Minister Josie Osborne said the province would not seek a renewal because the pilot 'hasn't delivered the results' officials hoped for (The Canadian Press), even though it ran alongside supervised consumption and safer supply. The provincial government's page states: 'The exemption expired on Jan. 31, 2026 and will not be renewed.' Safer-supply distribution, supervised consumption sites and drug checking continue. As of November 2026, both North American jurisdictions that removed criminal penalties for possession, Oregon and British Columbia, have restored them.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 4,
          },
          source:
            "Government of British Columbia, 'Decriminalization in B.C.'; The Canadian Press via National Newswatch, 'B.C. ending its 3-year drug decriminalization pilot project' (14 Jan 2026)",
          sourceUrl: "https://www2.gov.bc.ca/gov/content/overdose/decriminalization",
          reasoning:
            "A second jurisdiction, with a funded harm-reduction system, chose to end decriminalization, which is real evidence that the Portugal result does not travel easily. But it is a political judgment, not an outcome study: the government's page reports no evaluation results, the federally funded third-party study is not summarized, and B.C.'s deaths over the pilot moved with a continent-wide fentanyl supply. Directness is held to 4 for that reason, and independence to 5 because the source is the government that made the decision.",
        },
        {
          id: "spencer-oregon-synthetic-control",
          title: "Spencer (2022): Synthetic-Control Estimate Put Oregon's Extra Overdose Deaths in 2021 at 181, a 23% Rise, a Result Later Studies Dispute",
          description:
            "University of Toronto economist Noah Spencer used the synthetic control method to compare Oregon after Measure 110 with a weighted blend of states that did not decriminalize. His working paper (29 November 2022) reports that decriminalization 'caused 181 additional drug overdose deaths during the remainder of 2021', which 'represents a 23% increase over the number of drug overdose deaths predicted if Oregon had not decriminalized drugs.' He notes the policy came without substantial public-health investment. A September 2024 JAMA Network Open cohort study by Zoorob, Park, Kral, Lambdin and del Pozo replicated the positive association, then added each state's fentanyl exposure; the decriminalization estimate fell to 0.09 (SE 0.11) for Oregon and was no longer significant.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 3,
            directness: 5,
          },
          source:
            "Spencer, 'Does drug decriminalization cause more drug overdose deaths? Evidence from Oregon Measure 110', University of Toronto Working Paper tecipa-745 (2022); rebuttal: Zoorob et al., JAMA Network Open 2024;7(9):e2431612",
          sourceUrl:
            "https://www.economics.utoronto.ca/index.php/index/research/workingPaperDetails/745",
          reasoning:
            "The strongest quantitative case that decriminalization without treatment raised deaths, from an independent academic. Weighted low on purpose: the effect disappears once fentanyl's arrival in Oregon is measured (Zoorob et al., 2024), and other peer-reviewed models found no effect, so replicability is 3. It is kept because it is the estimate critics cite, and showing it next to the replication lets a reader see why it does not settle the question.",
        },
      ],
    },
    {
      id: "criminal-justice-impact",
      title: "Criminal Justice Impact",
      short_summary:
        "The Drug Policy Alliance (2016) estimated U.S. drug enforcement costs at more than $51B a year across federal, state, and local budgets, and 77% of released drug offenders are rearrested within five years (BJS). The status quo is expensive and leaky.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Without criminal penalties, there is little leverage to push people into treatment, and arrest can serve as the wake-up call that motivates recovery. Drug courts already divert people to treatment within the criminal system, and meta-analyses credit adult drug courts with cutting re-arrest by roughly 10–15 percent on average (one puts it at 50% falling to 38%) — structure and accountability that purely voluntary referral often lacks. Oregon's experience is the warning: when decriminalization removed that entry point without standing up an alternative, almost no one ticketed actually reached treatment.",
      proponent_rebuttal:
        "Criminalization falls unevenly: ACLU data show Black Americans are 3.64x more likely to be arrested for marijuana possession despite similar usage rates. The Drug Policy Alliance puts U.S. drug enforcement at least $51B a year across all levels of government. Drug courts help those they reach, but capacity limits mean they touch only a small share of eligible drug-involved people — and each still requires a criminal charge as the entry point.",
      crux: {
        id: "coerced-vs-voluntary-treatment",
        title: "Coerced vs. Voluntary Treatment Outcomes",
        question:
          "Does court-mandated treatment work enough better than voluntary referral to justify arrests?",
        description:
          "Court-mandated rehab has high completion rates but lower long-term success. Voluntary treatment has more dropouts but better outcomes for those who stay.",
        methodology:
          "Randomized controlled trial assigning drug offenders to either traditional drug court (coerced treatment) or decriminalized referral system (voluntary treatment with outreach) and tracking sobriety, employment, and recidivism at 1, 3, and 5 years.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compare relapse, re-arrest and overdose over two or more years for people sent to treatment by drug courts and similar people referred voluntarily, using lottery-style assignment where courts allow it, and set the difference against the harms of arrest itself.",
        },
        cost_to_verify: "$10M (Multi-site 5-year RCT)",
        falsification: {
          supporter_flip:
            "If a rigorous randomized trial showed coerced, criminal-justice-linked treatment (drug courts) produced durably better long-term sobriety and lower recidivism than voluntary, outreach-based referral, the case for removing the criminal entry point would weaken.",
          skeptic_flip:
            "If population-level data showed drug courts reaching only a small share of drug-involved people, so that a well-funded voluntary system treated more people overall despite any per-participant edge for courts, the case for keeping arrest as the on-ramp would weaken.",
          common_ground:
            "Both sides agree that treatment access is what actually reduces addiction harm; the dispute is over the best on-ramp to treatment — a criminal charge versus voluntary outreach.",
          live_disagreement:
            "Whether the accountability of court-mandated treatment outperforms voluntary referral by enough to justify the costs and collateral harms of arrest — a question no large randomized trial has cleanly answered.",
        },
      },
      evidence: [
        {
          id: "aclu-racial-disparity",
          title: "ACLU: Massive Racial Disparities in Drug Enforcement",
          description:
            "The ACLU found that Black Americans are 3.64 times more likely to be arrested for marijuana possession than white Americans, despite roughly equal usage rates. In some states the gap reached almost 10 to 1 (Montana 9.62, Kentucky 9.36), and in 31 states it was larger in 2018 than in 2010. These arrests create criminal records that depress employment and lifetime earnings.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source:
            "ACLU, 'A Tale of Two Countries: Racially Targeted Arrests in the Era of Marijuana Reform' (2020), using FBI Uniform Crime Report data",
          sourceUrl:
            "https://www.aclu.org/report/tale-two-countries-racially-targeted-arrests-era-marijuana-reform",
          reasoning:
            "Advocacy organization but using FBI Uniform Crime Report data; the 3.64x national figure is the report's headline (an earlier draft of this item said 3.73x). The '40% lifetime earnings' claim was removed as it could not be sourced to the report. Findings independently replicable from public arrest data. Directness is good — racial disparities are a core harm of criminalization.",
        },
        {
          id: "cato-portugal-analysis",
          title: "Cato Institute: Portugal's Decriminalization a Success",
          description:
            "The libertarian Cato Institute's analysis concluded that Portugal's decriminalization had no adverse effect on usage rates, with declining prevalence among the youngest cohorts (13-18), dramatically decreased drug-related pathologies including HIV/AIDS, a reduced criminal-justice burden, and none of the predicted 'drug tourism' or usage explosion.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source:
            "Cato Institute white paper: Glenn Greenwald, 'Drug Decriminalization in Portugal: Lessons for Creating Fair and Successful Drug Policies' (2009)",
          sourceUrl:
            "https://www.cato.org/publications/white-paper/drug-decriminalization-portugal-lessons-creating-fair-successful-drug-policies",
          reasoning:
            "Ideologically diverse source (libertarian think tank) lending cross-spectrum credibility, though Greenwald was a decriminalization advocate, so independence is moderate. The paper actually found prevalence declines among 13-18 year olds and slight increases for some older cohorts — the prior 'reduced use among 15-24' wording was corrected. Portugal-specific findings may not fully generalize.",
        },
        {
          id: "drug-court-effectiveness",
          title: "Meta-Analyses: Adult Drug Courts Cut Re-Arrest by Roughly 10-15 Percent on Average",
          description:
            "Marlowe's 2010 research update for the National Association of Drug Court Professionals summarizes five independent meta-analyses: drug courts 'significantly reduced re-arrest or reconviction rates by an average of approximately 8 to 26 percent, with the “average of the averages” reflecting approximately a 10 to 15 percent reduction in recidivism.' Mitchell, Wilson, Eggers and MacKenzie's 2012 meta-analysis of 154 evaluations put the average effect of adult drug court participation as 'analogous to a drop in recidivism from 50% to 38%', lasting up to three years. However, drug courts reach only a small share of eligible drug-involved people due to resource constraints.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Marlowe, 'Research Update on Adult Drug Courts' (NADCP, December 2010); Mitchell, Wilson, Eggers & MacKenzie, 'Assessing the effectiveness of drug courts on recidivism: A meta-analytic review of traditional and non-traditional drug courts', Journal of Criminal Justice 40(1) (2012)",
          sourceUrl: "https://www.antoniocasella.eu/archila/Marlowe_drug_courts_2010.pdf",
          reasoning:
            "Strong evidence that criminal-justice-linked treatment can work, supporting the case for maintaining criminal entry points. An earlier version said '8-14 percentage points'; the sources give 8-26 percent (10-15 percent on average) and 50% to 38%, so the figures were corrected to theirs. The '~5% of eligible' figure was softened to a qualitative 'small share' as it could not be pinned to a single authoritative source. Limited by selection bias (motivated participants).",
        },
        {
          id: "nida-legal-pressure-outcomes",
          title: "NIDA: People Who Enter Treatment Under Legal Pressure Do as Well as Voluntary Patients",
          description:
            "The National Institute on Drug Abuse's 'Principles of Drug Addiction Treatment: A Research-Based Guide' (third edition, January 2014, revised January 2018) lists as principle 11: 'Treatment does not need to be voluntary to be effective. Sanctions or enticements from family, employment settings, and/or the criminal justice system can significantly increase treatment entry, retention rates, and the ultimate success of drug treatment interventions.' Its criminal-justice section adds: 'Research has demonstrated that individuals who enter treatment under legal pressure have outcomes as favorable as those who enter treatment voluntarily,' and 'Individuals under legal coercion tend to stay in treatment longer and do as well as or better than those not under legal pressure.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "National Institute on Drug Abuse, 'Principles of Drug Addiction Treatment: A Research-Based Guide (Third Edition)', NIH (2014, revised 2018)",
          sourceUrl: "https://www.nida.nih.gov/sites/default/files/podat-3rdEd-508.pdf",
          reasoning:
            "The federal research institute's summary view, which cuts against the claim that coerced treatment fails. Directness is 5: 'as favorable as' voluntary entry shows legal pressure does not spoil treatment, but it does not show arrest is needed to get people there, which is the crux. 'Sanctions or enticements' also covers family and employer pressure, and a Portuguese dissuasion commission is itself a form of non-criminal pressure. The guide is a narrative summary rather than a new meta-analysis, so replicability is 6.",
        },
        {
          id: "incarceration-cost-data",
          title: "Mass Incarceration Is Costly, and Drug Offenses Drive a Large Share",
          description:
            "The Prison Policy Initiative (2017) estimates that 'the system of mass incarceration costs the government and families of justice-involved people at least $182 billion every year', counting policing, courts and corrections. People held for drug offenses made up 47% of the federal prison population at fiscal year-end 2018 (BJS), a far larger share than among state prisoners. The Vera Institute found the cost per state prisoner in fiscal 2015 averaged $33,274, from $14,780 in Alabama to $69,355 in New York. Recidivism among released prisoners is high across offense types.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Prison Policy Initiative, 'Following the Money of Mass Incarceration' (2017); Bureau of Justice Statistics, 'Sentencing Decisions for Persons in Federal Prison for Drug Offenses, 2013-2018' (2023); Vera Institute of Justice, 'The Price of Prisons: Examining State Spending Trends, 2010-2015' (2017)",
          sourceUrl: "https://www.prisonpolicy.org/research/economics_of_incarceration/",
          reasoning:
            "Reliable cost data, but the figures were reconciled: the $182B is the whole criminal-justice system (not drug enforcement alone), and 47% is the federal — not overall — drug-offender share, so the prior '$80B+ drug incarceration' title, and a later 'above $100,000 in some states' per-prisoner claim that Vera's table does not support, and '45% of federal prisoners' phrasing overstated the link. Directness lowered to 5 — high costs and recidivism suggest the status quo is failing but don't prove decriminalization would do better.",
        },
      ],
    },
  ],
};
