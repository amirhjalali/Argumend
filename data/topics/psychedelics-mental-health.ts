import type { Topic } from "@/lib/schemas/topic";

export const psychedelicsMentalHealthData = {
  id: "psychedelics-mental-health",
  title: "Psychedelics for Mental Health",
  meta_claim:
    "Psilocybin and other psychedelics are effective treatments for depression, PTSD, and addiction, and should be approved for clinical use.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    {
      id: "clinical-trial-evidence",
      title: "Clinical Trial Evidence",
      short_summary:
        "Phase II and Phase III clinical trials show significant therapeutic effects of psilocybin for depression and MDMA for PTSD, but the FDA has demanded additional evidence.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The FDA rejected MDMA-assisted therapy for PTSD in August 2024, citing flawed trial design in the MAPP1 and MAPP2 studies. Blinding is nearly impossible in psychedelic trials because participants know whether they received a psychedelic. The expectancy effect is enormous: patients who believe they received a powerful mind-altering substance may improve regardless of the drug's efficacy. Many trials are small, short-term, and funded by organizations with strong ideological commitments.",
      proponent_rebuttal:
        "Over 130 psilocybin clinical trials are now registered on ClinicalTrials.gov. MAPS' Phase III trial showed 71% of PTSD patients no longer met diagnostic criteria after three MDMA sessions (vs. 48% placebo). Johns Hopkins research demonstrated psilocybin-assisted therapy has antidepressant effects lasting at least one year. Two companies (Compass Pathways and Usona Institute) have Phase III trials underway for psilocybin and depression. The FDA's rejection of MDMA was about trial design, not efficacy.",
      crux: {
        id: "phase-3-psilocybin-approval",
        title: "Psilocybin Phase III Trial Results and FDA Decision",
        description:
          "The FDA rejected MDMA therapy in 2024 over methodology concerns despite strong Phase II data. Psilocybin trials face the same scrutiny.",
        methodology:
          "Monitor Compass Pathways and Usona Institute Phase III trials. Evaluate primary endpoints (MADRS depression scale scores at 6 and 12 weeks), adverse events, and long-term follow-up data. Assess FDA advisory committee response.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Trials are underway; monitor results)",
      },
      evidence: [
        {
          id: "maps-phase-3-mdma",
          title: "MAPS Phase III: 71% of PTSD Patients No Longer Met Criteria",
          description:
            "The MAPS-sponsored Phase III clinical trial of MDMA-assisted therapy for PTSD found that 71% of participants no longer met PTSD diagnostic criteria after three MDMA-assisted therapy sessions, compared to 48% in the therapy-plus-placebo group. The results were published in Nature Medicine (2023).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 9,
          },
          source: "Mitchell et al., Nature Medicine (2023)",
          reasoning:
            "Published in a top medical journal with strong results. However, the FDA subsequently rejected the NDA citing concerns about trial design, functional unblinding, and potential data integrity issues—reducing confidence in reliability.",
        },
        {
          id: "hopkins-psilocybin-depression",
          title: "Johns Hopkins: Psilocybin Effects Last 12+ Months",
          description:
            "Johns Hopkins research demonstrated that psilocybin-assisted therapy produced substantial and sustained antidepressant effects. In a 2022 follow-up study, 75% of participants still showed clinically significant response at 12 months, and 58% were in remission. These durability results are unusual for any psychiatric treatment.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 9,
          },
          source: "Johns Hopkins Center for Psychedelic and Consciousness Research (2022)",
          reasoning:
            "Strong institutional credibility and remarkable durability of effects. However, sample sizes remain small and the open-label design introduces expectancy bias.",
        },
        {
          id: "fda-mdma-rejection",
          title: "FDA Rejected MDMA Therapy in August 2024",
          description:
            "On August 9, 2024, the FDA declined to approve MDMA-assisted therapy for PTSD, requesting an additional Phase III study from Lykos Therapeutics. The FDA cited concerns about the MAPP1 and MAPP2 trial designs, including inadequate blinding, potential data manipulation, and insufficient long-term safety data. The FDA advisory committee had voted 9-2 against approval.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 8,
            directness: 9,
          },
          source: "FDA; NPR; Science (AAAS) reporting (August 2024)",
          reasoning:
            "The FDA is the gold standard for drug safety evaluation. Their rejection signals serious methodological concerns that must be addressed before psychedelic therapy can be considered validated.",
        },
      ],
    },
    {
      id: "policy-regulatory-path",
      title: "Policy & Regulatory Pathway",
      short_summary:
        "Psilocybin is Schedule I ('no accepted medical use') despite Phase II trials showing 4x the response rate of SSRIs. The FDA wants more data.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Psilocybin and MDMA are Schedule I controlled substances—classified as having high abuse potential and no accepted medical use. Decriminalization and state-level legalization (Oregon, Colorado) have outpaced clinical evidence. Widespread access without proper clinical infrastructure risks adverse events, misuse, and undermining the rigorous FDA approval process that protects patients.",
      proponent_rebuttal:
        "Oregon legalized psilocybin services at licensed centers in 2020, and Colorado followed in 2022. More than 36 psychedelic health-related initiatives were introduced across a dozen states in 2024-2025. The Schedule I classification is based on 1970s politics, not science—psilocybin has extremely low addiction potential and no lethal dose has been established. A supervised clinical model (as in Oregon) provides appropriate guardrails.",
      crux: {
        id: "state-level-outcome-data",
        title: "Oregon Psilocybin Service Center Outcomes",
        description:
          "Evaluating real-world outcomes from Oregon's pioneering psilocybin service centers, which began operating in 2023.",
        methodology:
          "Track patient-reported outcomes, adverse events, and follow-up data from Oregon Psilocybin Services. Compare mental health outcomes for service center clients vs. matched controls receiving standard care.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Prospective outcomes study of Oregon program)",
      },
      evidence: [
        {
          id: "oregon-psilocybin-services",
          title: "Oregon: First US State to Legalize Psilocybin Services",
          description:
            "Oregon's Measure 109 (passed November 2020) created a regulated framework for psilocybin-assisted therapy at licensed service centers, which began operating in 2023. Clients must complete a preparatory session, ingest psilocybin under supervision of a trained facilitator, and complete an integration session. Early data suggests high satisfaction rates, though systematic outcome data is still being collected.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Oregon Psilocybin Services; Oregon Health Authority",
          reasoning:
            "Real-world implementation provides invaluable data. However, early adopters are self-selected and likely differ from the broader patient population. Systematic outcomes data is not yet available.",
        },
        {
          id: "schedule-1-outdated",
          title: "Schedule I Classification Contradicts Scientific Evidence",
          description:
            "Psilocybin is classified as Schedule I (high abuse potential, no medical use) alongside heroin. However, psilocybin has extremely low addiction potential (no physical dependence, tolerance develops rapidly preventing binge use), no established lethal dose in humans, and a growing evidence base for therapeutic efficacy. Drug policy experts widely regard the classification as politically motivated rather than scientifically grounded.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Nutt et al., The Lancet (2010); Johnson et al., Neuropharmacology (2018)",
          reasoning:
            "The mismatch between Schedule I criteria and psilocybin's pharmacological profile is well-documented. However, rescheduling is a policy question that involves more than pharmacology—public health infrastructure and abuse prevention matter too.",
        },
      ],
    },
  ],
};
