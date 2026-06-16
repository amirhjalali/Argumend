import type { Topic } from "@/lib/schemas/topic";

export const drugDecriminalizationData = {
  id: "drug-decriminalization",
  title: "Drug Decriminalization",
  meta_claim:
    "Decriminalizing personal drug use reduces harm and improves public health outcomes compared to criminalization.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "public-health-outcomes",
      title: "Public Health Outcomes",
      short_summary:
        "Portugal decriminalized all drugs in 2001. Drug deaths dropped, HIV infections plummeted, and overall use did not increase.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Decriminalization signals social acceptance and increases use, especially among youth. Without the deterrent of arrest, experimentation rises. Countries and states that decriminalize see drug tourism and open-air drug markets emerge, concentrating harm in specific neighborhoods.",
      proponent_rebuttal:
        "Portugal decriminalized all drugs in 2001 and saw drug-related deaths drop by 80%, HIV infections among people who use drugs fell dramatically, and overall use did not increase significantly. A treatment-first approach redirects resources from punishment to healthcare, catching addiction earlier and reducing overdose deaths.",
      crux: {
        id: "decrim-use-rates",
        title: "Use Rates Under Decriminalization vs. Criminalization",
        description:
          "Rigorous comparison of drug use prevalence, problematic use rates, and overdose deaths in jurisdictions that decriminalized vs. those that maintained criminal penalties, controlling for other policy differences.",
        methodology:
          "Difference-in-differences analysis comparing drug use surveys, emergency room data, and mortality statistics across matched jurisdictions with and without decriminalization, over 10+ year windows.",
        verification_status: "verified" as const,
        cost_to_verify: "$500K (Multi-jurisdiction longitudinal analysis of existing data)",
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
          title: "EMCDDA: European Countries with Decriminalization Have Lower Problematic Use",
          description:
            "The European Monitoring Centre for Drugs and Drug Addiction finds that countries with decriminalized possession (Portugal, Czech Republic, Netherlands) generally report lower rates of problematic drug use and drug-related deaths than countries with strict penalties.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "EMCDDA (now EUDA) European Drug Report — annual statistical bulletin",
          sourceUrl: "https://www.euda.europa.eu/publications/european-drug-report_en",
          reasoning:
            "Authoritative pan-European data, though cross-country comparisons are complicated by differences in culture, healthcare systems, and reporting standards. The EMCDDA reports the underlying statistics but does not itself frame decriminalization as the cause of lower problematic use — directness is moderate.",
        },
        {
          id: "us-overdose-under-criminalization",
          title: "US Overdose Deaths Hit Record Highs Under Criminalization",
          description:
            "The United States, with among the harshest drug penalties in the developed world, recorded an estimated 107,543 drug overdose deaths in 2023 (CDC provisional data) — a historic high, though down ~3% from 2022's 111,029. A 2010 Associated Press investigation estimated the War on Drugs had cost over $1 trillion since 1971 without reducing overall drug use rates.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 4,
          },
          source:
            "CDC NCHS provisional overdose data (2023); $1 trillion cost estimate: Associated Press investigation (2010)",
          sourceUrl: "https://blogs.cdc.gov/nchs/2024/05/15/7623/",
          reasoning:
            "Highly reliable mortality data showing criminalization has coincided with record harm. Low directness: correlation, not causation — rising deaths are driven primarily by the fentanyl supply shift, not the choice between criminalization and decriminalization. The prior '50-fold increase since 1979' framing was dropped as it overstated a clean causal story.",
        },
      ],
    },
    {
      id: "criminal-justice-impact",
      title: "Criminal Justice Impact",
      short_summary:
        "The U.S. spends $40B+ annually enforcing drug laws. Recidivism rates for drug offenders hover near 77%. Something is not working.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Without criminal penalties, there is no leverage to push people into treatment. Arrest often serves as the wake-up call that motivates recovery. Drug courts already divert people to treatment within the criminal system, providing structure and accountability that voluntary programs lack.",
      proponent_rebuttal:
        "Criminalization disproportionately harms racial minorities — Black Americans are 3.7x more likely to be arrested for marijuana despite similar usage rates. The US spends $80B+ per year on drug enforcement and incarceration. Drug courts, while promising, reach only about 5% of eligible individuals and still require a criminal charge as the entry point.",
      crux: {
        id: "coerced-vs-voluntary-treatment",
        title: "Coerced vs. Voluntary Treatment Outcomes",
        description:
          "Court-mandated rehab has high completion rates but lower long-term success. Voluntary treatment has more dropouts but better outcomes for those who stay.",
        methodology:
          "Randomized controlled trial assigning drug offenders to either traditional drug court (coerced treatment) or decriminalized referral system (voluntary treatment with outreach) and tracking sobriety, employment, and recidivism at 1, 3, and 5 years.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (Multi-site 5-year RCT)",
      },
      evidence: [
        {
          id: "aclu-racial-disparity",
          title: "ACLU: Massive Racial Disparities in Drug Enforcement",
          description:
            "The ACLU found that Black Americans are 3.64 times more likely to be arrested for marijuana possession than white Americans, despite roughly equal usage rates. In some counties, the disparity exceeds 10:1. These arrests create criminal records that depress employment and lifetime earnings.",
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
          title: "Drug Courts Reduce Recidivism by 8-14 Percentage Points",
          description:
            "Meta-analyses show drug courts reduce recidivism on average by roughly 8-14 percentage points compared to traditional prosecution (mean effect ~12 points), with participants less likely to reoffend. However, drug courts reach only a small share of eligible drug-involved people due to resource constraints.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Marlowe, 'Research Update on Adult Drug Courts' (NADCP, 2010); Mitchell et al., 'Assessing the Effectiveness of Drug Courts on Recidivism' meta-analysis (J. Criminal Justice, 2012)",
          sourceUrl: "https://www.antoniocasella.eu/archila/Marlowe_drug_courts_2010.pdf",
          reasoning:
            "Strong evidence that criminal-justice-linked treatment can work, supporting the case for maintaining criminal entry points. The '~5% of eligible' figure was softened to a qualitative 'small share' as it could not be pinned to a single authoritative source. Limited by selection bias (motivated participants).",
        },
        {
          id: "incarceration-cost-data",
          title: "Mass Incarceration Is Costly, and Drug Offenses Drive a Large Share",
          description:
            "The US spends roughly $182 billion annually on the broader criminal-justice system (Prison Policy Initiative estimate). Drug offenders made up about 47% of the federal prison population in 2018 (a smaller share of state prisoners). The Vera Institute finds the average cost of incarcerating one person exceeds $30,000/year, rising above $100,000 in some states. Recidivism among released prisoners is high across offense types.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Prison Policy Initiative ($182B system-cost estimate); Bureau of Justice Statistics (federal drug-offender share); Vera Institute of Justice (per-person cost)",
          sourceUrl: "https://www.prisonpolicy.org/research/economics_of_incarceration/",
          reasoning:
            "Reliable cost data, but the figures were reconciled: the $182B is the whole criminal-justice system (not drug enforcement alone), and 47% is the federal — not overall — drug-offender share, so the prior '$80B+ drug incarceration' title and '45% of federal prisoners' phrasing overstated the link. Directness lowered to 5 — high costs and recidivism suggest the status quo is failing but don't prove decriminalization would do better.",
        },
      ],
    },
  ],
};
