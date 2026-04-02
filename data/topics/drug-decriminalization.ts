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
            "Two decades after decriminalizing all drugs in 2001, Portugal saw drug-induced death rates fall to 3 per million (EU average: 23.7), HIV diagnoses among people who inject drugs dropped from 1,016 in 2001 to 18 in 2017, and overall drug use remained below the European average.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 9,
          },
          source: "EMCDDA, Transform Drug Policy Foundation",
          reasoning:
            "Longest-running natural experiment on decriminalization. High reliability and directness, but replicability is limited because Portugal simultaneously invested heavily in treatment infrastructure.",
        },
        {
          id: "oregon-measure-110",
          title: "Oregon Measure 110 Early Results Show Implementation Challenges",
          description:
            "Oregon decriminalized small amounts of all drugs in 2020 via Measure 110. By 2023, overdose deaths had risen 120% and only 1% of people cited for drug possession sought treatment through the new system. The law was partially rolled back in 2024.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Oregon Health Authority, The Oregonian investigative reporting",
          reasoning:
            "Recent and directly relevant, but confounded by fentanyl wave, COVID-era disruptions, and slow rollout of treatment funding. Short timeframe limits conclusions.",
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
          source: "EMCDDA European Drug Report",
          reasoning:
            "Authoritative pan-European data, though cross-country comparisons are complicated by differences in culture, healthcare systems, and reporting standards.",
        },
        {
          id: "us-overdose-under-criminalization",
          title: "US Overdose Deaths Hit Record Highs Under Criminalization",
          description:
            "The United States, with among the harshest drug penalties in the developed world, recorded over 107,000 overdose deaths in 2023 — a 50-fold increase since 1979. The War on Drugs has cost over $1 trillion since 1971 without reducing overall drug use rates.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "CDC WONDER, Drug Policy Alliance",
          reasoning:
            "Highly reliable mortality data showing criminalization has failed to prevent harm. Lower directness because rising deaths are driven by fentanyl supply, not just policy approach.",
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
            "The ACLU found that Black Americans are 3.73 times more likely to be arrested for marijuana possession than white Americans, despite roughly equal usage rates. In some counties, the disparity exceeds 10:1. These arrests create criminal records that reduce lifetime earnings by an estimated 40%.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source: "ACLU, 'A Tale of Two Countries' Report",
          reasoning:
            "Advocacy organization but using FBI Uniform Crime Report data. Findings independently replicated by multiple researchers. Directness is good — racial disparities are a core harm of criminalization.",
        },
        {
          id: "cato-portugal-analysis",
          title: "Cato Institute: Portugal's Decriminalization a Success",
          description:
            "The libertarian Cato Institute's analysis found that Portugal's decriminalization led to reduced drug use among 15-24 year olds, decreased HIV/AIDS cases, reduced burden on the criminal justice system, and no explosion in drug tourism or usage as critics predicted.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source: "Cato Institute, Glenn Greenwald",
          reasoning:
            "Ideologically diverse source (libertarian think tank) lending cross-spectrum credibility. Portugal-specific findings may not fully generalize.",
        },
        {
          id: "drug-court-effectiveness",
          title: "Drug Courts Reduce Recidivism by 8-14 Percentage Points",
          description:
            "Meta-analyses show drug courts reduce recidivism by 8-14 percentage points compared to traditional prosecution. Participants are less likely to reoffend and more likely to maintain employment. However, drug courts serve only ~5% of the eligible population due to resource constraints.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "National Association of Drug Court Professionals, RAND Corporation",
          reasoning:
            "Strong evidence that criminal justice-linked treatment can work, supporting the case for maintaining criminal entry points. Limited by small scale and selection bias (motivated participants).",
        },
        {
          id: "incarceration-cost-data",
          title: "Drug Incarceration Costs $80B+ Annually with Poor Outcomes",
          description:
            "The US spends approximately $182 billion annually on the criminal justice system, with drug offenses accounting for roughly 45% of federal prisoners. The average cost of incarcerating one person exceeds $35,000/year. Recidivism rates for drug offenders exceed 75% within five years.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Bureau of Justice Statistics, Vera Institute of Justice",
          reasoning:
            "Highly reliable government data on costs. Directness moderate — high costs and recidivism suggest failure, but don't prove decriminalization would be better.",
        },
      ],
    },
  ],
};
