import type { Topic } from "@/lib/schemas/topic";

export const psychedelicsMentalHealthData = {
  id: "psychedelics-mental-health",
  title: "Psychedelics for Mental Health",
  meta_claim:
    "Psilocybin and other psychedelics are effective treatments for depression, PTSD, and addiction, and should be approved for clinical use.",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The trials report striking results — in MDMA's Phase III, 71% of PTSD patients no longer met diagnostic criteria — yet in 2024 the FDA rejected MDMA-assisted therapy, because you can't blind a psychedelic trial: patients know whether they're tripping, so expectation and drug effect are tangled together.",
    confidence: 80,
    source:
      "Mitchell et al., Nature Medicine (2023); FDA Complete Response Letter to Lykos (Aug 2024)",
    sourceUrl: "https://www.nature.com/articles/s41591-023-02565-4",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Psychedelic trials report some of the largest effect sizes in psychiatry — in MDMA's confirmatory Phase III, 71% of PTSD patients no longer met diagnostic criteria — which is why the field has exploded with well over 100 registered psilocybin studies.",
    "But there's a structural catch the hype skips: you can't run a real placebo trial when participants can obviously tell whether they're tripping, so expectation and pharmacology are tangled — which is exactly why an FDA advisory panel voted 2–9 against MDMA's efficacy and the agency demanded another trial in 2024.",
    "So the honest position isn't 'miracle cure' or 'snake oil' — the signals are real and unusually durable, but until trials solve the blinding-and-expectancy problem we genuinely can't say how much is the drug versus the belief that you took it.",
  ],
  pillars: [
    {
      id: "clinical-trial-evidence",
      title: "Clinical Trial Evidence",
      short_summary:
        "Phase II and Phase III trials report large therapeutic effects for psilocybin in depression and MDMA in PTSD, but an FDA advisory committee voted against MDMA-assisted therapy (2-9 on efficacy, 1-10 on benefit-risk) and the agency issued a Complete Response Letter citing functional unblinding and expectancy effects.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "An FDA advisory committee voted 2-9 that the MAPP1 and MAPP2 data did not show MDMA-assisted therapy is effective for PTSD, and 1-10 that its benefits did not outweigh its risks; the FDA then issued a Complete Response Letter in August 2024 declining approval and requesting another Phase III trial. Blinding is nearly impossible in psychedelic trials because participants can tell whether they received an active psychedelic, and the FDA flagged probable functional unblinding in MAPP2. The expectancy effect is large: patients who believe they received a powerful mind-altering substance may improve regardless of pharmacology. Many trials are small, short-term, and run by organizations with strong prior commitments to the result, and some sites had unreported adverse events and alleged misconduct.",
      proponent_rebuttal:
        "Psychedelic research has scaled rapidly, with well over 100 psilocybin studies now registered on ClinicalTrials.gov. In MAPS' second confirmatory Phase III trial (MAPP2, n=104), 71.2% of MDMA-group participants no longer met PTSD criteria by week 18 versus 47.6% in the placebo-with-therapy group—a large effect for a hard-to-treat condition. A Johns Hopkins follow-up reported antidepressant effects persisting at 12 months, though only 24 participants completed that uncontrolled follow-up. Compass Pathways and Usona Institute have Phase III psilocybin-for-depression trials underway. Proponents argue the FDA's concerns center on blinding and trial conduct that are inherent to psychedelic research rather than on the drugs being inert, and that better-designed trials can address them—though they should concede the advisory committee voted directly against efficacy (2-9), not merely against trial design.",
      crux: {
        id: "phase-3-psilocybin-approval",
        title: "Psilocybin Phase III Trial Results and FDA Decision",
        description:
          "An FDA advisory committee voted against MDMA-assisted therapy in 2024 (2-9 on efficacy, 1-10 on benefit-risk) and the FDA issued a Complete Response Letter citing functional unblinding and expectancy effects. Whether psilocybin's Phase III program can survive the same scrutiny is the open question.",
        methodology:
          "Monitor Compass Pathways and Usona Institute Phase III trials. Evaluate primary endpoints (MADRS depression scale scores at 6 and 12 weeks), adverse events, and long-term follow-up data. Assess FDA advisory committee response.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Trials are underway; monitor results)",
        falsification: {
          supporter_flip:
            "If the ongoing psilocybin Phase III programs (Compass, Usona) hit the same wall as MDMA — large raw effects that evaporate or fail FDA scrutiny once functional unblinding, expectancy, and data integrity are accounted for — the case that these are validated treatments rather than powerful placebos plus therapy would collapse.",
          skeptic_flip:
            "A skeptic who thinks it's all expectancy should weigh that the effects are unusually large and durable (antidepressant response persisting at 12 months) for conditions where standard drugs barely move the needle — if a design that genuinely controls for expectancy still shows benefit, the 'just placebo' explanation fails.",
          common_ground:
            "Both sides agree psychedelic trials can't be blinded the way a pill trial can — participants almost always know whether they received an active psychedelic.",
          live_disagreement:
            "How much of the striking improvement is the drug's pharmacology versus the expectancy and intensive therapy bundled with it — which un-blindable trials can't cleanly separate.",
        },
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
        "Psilocybin is Schedule I ('no accepted medical use') even though Phase II trials report meaningful antidepressant effects—though a head-to-head trial did not find it superior to an SSRI on its primary endpoint. States (Oregon, Colorado) have created supervised-access programs ahead of any FDA approval.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Psilocybin and MDMA are Schedule I controlled substances—classified as having high abuse potential and no accepted medical use. Decriminalization and state-level legalization (Oregon, Colorado) have outpaced clinical evidence. Widespread access without proper clinical infrastructure risks adverse events, misuse, and undermining the rigorous FDA approval process that protects patients.",
      proponent_rebuttal:
        "Oregon voters approved regulated psilocybin services in 2020 (Measure 109; centers opened in 2023), and Colorado followed in 2022, with psychedelic-policy bills introduced in numerous other states since. The Schedule I classification dates to 1970s politics rather than current science: psilocybin has extremely low addiction potential (no physical dependence; rapid tolerance prevents binge use) and no established lethal dose in humans. A supervised, facilitator-led access model (as in Oregon) offers more guardrails than the unregulated use that decriminalization alone would allow—even if it is not yet an approved medical treatment and lacks systematic outcome data.",
      crux: {
        id: "state-level-outcome-data",
        title: "Oregon Psilocybin Service Center Outcomes",
        description:
          "Evaluating real-world outcomes from Oregon's pioneering psilocybin service centers, which began operating in 2023.",
        methodology:
          "Track patient-reported outcomes, adverse events, and follow-up data from Oregon Psilocybin Services. Compare mental health outcomes for service center clients vs. matched controls receiving standard care.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Prospective outcomes study of Oregon program)",
        falsification: {
          supporter_flip:
            "If Oregon's and Colorado's real-world programs produced high rates of serious adverse events or no measurable mental-health benefit versus standard care, the case that supervised access is safer and better than the status quo would weaken.",
          skeptic_flip:
            "A skeptic who thinks policy outran the evidence should weigh that psilocybin has very low addiction potential and no established lethal dose, and that a facilitator-supervised model has more guardrails than the decriminalized free-for-all that is the realistic alternative.",
          common_ground:
            "Both sides agree state programs (Oregon, Colorado) have outpaced FDA approval and currently lack systematic published outcome data.",
          live_disagreement:
            "Whether supervised state-level access delivers real mental-health benefit at acceptable risk — which Oregon's program could answer but hasn't yet, since it produces no controlled outcome data.",
        },
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
