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
          title: "MAPP2 Phase III: 71% of PTSD Patients No Longer Met Criteria",
          description:
            "The MAPS-sponsored second confirmatory Phase III trial (MAPP2) of MDMA-assisted therapy for moderate-to-severe PTSD found that by study end (18 weeks), 37 of 52 (71.2%) participants in the MDMA group no longer met DSM-5 criteria for PTSD, versus 20 of 42 (47.6%) in the placebo-with-therapy group; remission rates were 46.2% vs 21.4%. Results were published in Nature Medicine (2023). The trial was small (n=104 randomized) and the FDA later flagged probable functional unblinding (most participants could guess their assignment).",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 9,
          },
          source: "Mitchell et al., \"MDMA-assisted therapy for moderate to severe PTSD: a randomized, placebo-controlled phase 3 trial,\" Nature Medicine 29, 2473–2480 (2023)",
          sourceUrl: "https://www.nature.com/articles/s41591-023-02565-4",
          reasoning:
            "Published in a top medical journal with strong reported effect sizes. But the FDA declined the NDA in August 2024 citing functional unblinding, strong expectancy effects, possible selection bias, and unreported adverse events at some sites—recommending an independent third-party data audit. The sponsor (MAPS/Lykos) is an advocacy-aligned developer, so independence is low. Weights de-inflated accordingly.",
        },
        {
          id: "hopkins-psilocybin-depression",
          title: "Johns Hopkins: Psilocybin Effects Last 12+ Months",
          description:
            "A Johns Hopkins 12-month prospective follow-up of psilocybin-assisted therapy for major depressive disorder reported sustained antidepressant effects: among the 24 participants who completed follow-up, 75% met response criteria (≥50% reduction in GRID-HAMD) and 58% met remission criteria at 12 months. Durability of this magnitude is unusual in psychiatry, though the follow-up was uncontrolled (the parent study was a small waitlist-controlled trial).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 9,
          },
          source: "Gukasyan et al., \"Efficacy and safety of psilocybin-assisted treatment for major depressive disorder: Prospective 12-month follow-up,\" Journal of Psychopharmacology 36(2):151–158 (2022)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/35166158/",
          reasoning:
            "Strong institutional credibility and durable effects. But the sample is very small (24 completers) and the 12-month follow-up had no concurrent control group, so expectancy and selection effects cannot be excluded. Weights de-inflated for small n and lack of long-term control.",
        },
        {
          id: "fda-mdma-rejection",
          title: "FDA Rejected MDMA Therapy in August 2024",
          description:
            "On August 9, 2024, the FDA issued a Complete Response Letter declining to approve MDMA-assisted therapy for PTSD and requesting an additional Phase III study from Lykos Therapeutics. The agency cited concerns spanning the MAPP1 and MAPP2 trials, including functional unblinding, strong expectancy effects, possible selection bias, unreported adverse events at some sites, and insufficient durability data; it recommended an independent third-party data audit. Earlier, on June 4, 2024, the FDA's advisory committee voted 2–9 that the data did not show efficacy and 1–10 that benefits did not outweigh risks.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 8,
            directness: 9,
          },
          source: "FDA Complete Response Letter to Lykos Therapeutics (Aug 9, 2024; publicly released Sept 2025); FDA Psychopharmacologic Drugs Advisory Committee vote, June 4, 2024",
          sourceUrl: "https://psychedelicalpha.com/news/breaking-fda-publishes-lykos-therapeutics-mdma-complete-response-letter-crl",
          reasoning:
            "The FDA is the gold standard for drug-approval evaluation. The advisory committee's lopsided votes (2–9 on efficacy, 1–10 on benefit-risk) and the CRL signal serious methodological concerns—functional unblinding, expectancy, and data-integrity—that must be addressed before psychedelic-assisted therapy can be considered validated.",
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
            "Oregon's Measure 109 (passed November 2020, codified as ORS 475A) created the first US regulated framework for supervised psilocybin services at licensed service centers, which opened in summer 2023 and are administered by the Oregon Health Authority. Clients complete a preparation session, ingest psilocybin under a trained facilitator's supervision, and are offered an integration session. This is a supervised-use access model, not an approved medical treatment, and systematic clinical-outcome data are not yet published.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Oregon Health Authority — Oregon Psilocybin Services (Measure 109 / ORS 475A)",
          sourceUrl: "https://www.oregon.gov/oha/ph/preventionwellness/pages/oregon-psilocybin-services.aspx",
          reasoning:
            "Confirms a real-world regulated framework exists, which is policy-relevant. But it is an access program, not a controlled trial: it produces no comparative efficacy evidence, clients are self-selected, and systematic outcomes are not yet available. Directness to the efficacy claim lowered accordingly.",
        },
        {
          id: "schedule-1-outdated",
          title: "Schedule I Classification Contradicts Scientific Evidence",
          description:
            "Psilocybin is classified as Schedule I (high abuse potential, no medical use) alongside heroin. However, psilocybin has extremely low addiction potential (no physical dependence, tolerance develops rapidly preventing binge use), no established lethal dose in humans, and a growing evidence base for therapeutic efficacy. Drug policy experts widely regard the classification as politically motivated rather than scientifically grounded.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Nutt, King & Phillips, \"Drug harms in the UK: a multicriteria decision analysis,\" The Lancet 376:1558–1565 (2010); Johnson, Griffiths, Hendricks & Henningfield, \"The abuse potential of medical psilocybin according to the 8 factors of the Controlled Substances Act,\" Neuropharmacology 142:143–166 (2018)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/29753748/",
          reasoning:
            "Peer-reviewed analyses (Lancet MCDA harm rankings; a Neuropharmacology review applying the CSA's own 8 abuse-potential factors to psilocybin) document a mismatch between Schedule I criteria and psilocybin's low dependence and toxicity profile. The primary sourceUrl links the Johnson et al. CSA-factors paper, which is most directly on point for scheduling. Still, rescheduling is a policy judgment that also weighs public-health infrastructure and abuse prevention, so directness to the meta-claim is moderate.",
        },
      ],
    },
  ],
};
