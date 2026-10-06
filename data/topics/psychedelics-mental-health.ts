export const psychedelicsMentalHealthData = {
  id: "psychedelics-mental-health",
  title: "Psychedelics for Mental Health",
  question:
    "Should psychedelics be approved to treat depression, PTSD and addiction?",
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
        question:
          "How much of the improvement is the drug itself, versus expectations and the therapy bundled with it?",
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
            "If a design that truly controls for expectancy still found large, durable benefit, such as antidepressant response lasting 12 months in conditions where standard drugs barely help, the 'just placebo' explanation would fail.",
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
        {
          id: "psilocybin-depression-remission",
          title: "Psilocybin Shows Efficacy Signals for Depression, but the Strongest Head-to-Head Missed Its Primary Endpoint",
          description:
            "Two distinct NEJM-published trials are often cited for psilocybin in depression, and they must not be conflated. (1) COMPASS Pathways' Phase 2b dose-ranging trial (Goodwin et al., NEJM 2022, n=233 treatment-resistant patients) found that a single 25mg dose reduced MADRS depression scores significantly more than a 1mg control at week 3 (the primary endpoint), but the 10mg dose did not separate from control, durability was demonstrated only to ~12 weeks, and the drug carried meaningful adverse effects (including reported suicidal ideation/behavior in some 25mg participants). (2) The head-to-head psilocybin-vs-escitalopram trial (Carhart-Harris et al., NEJM 2021, n=59) MISSED its primary endpoint: the between-group difference on QIDS-SR-16 at 6 weeks was NOT statistically significant. Psilocybin numerically led on secondary measures (response 70% vs. 48%, remission 57% vs. 28%), but those secondary outcomes were not corrected for multiple comparisons and cannot be treated as confirmatory. A separate open-label Johns Hopkins trial (Gukasyan et al., J Psychopharmacology 2022, n=27) reported antidepressant effects sustained to 12 months, but it had no control arm. In 2025-2026 COMPASS reported that its two Phase 3 TRD trials (COMP005, COMP006) met their primary MADRS endpoints (p<0.001), though the placebo-adjusted effect was modest (~3.6-3.8 MADRS points) and used a non-standard 25% response threshold, prompting analyst and clinician questions about clinical meaningfulness.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "NEJM (Goodwin et al. 2022; Carhart-Harris et al. 2021); J Psychopharmacology (Gukasyan et al. 2022); COMPASS Phase 3 readouts (2025-2026)",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2206443",
          reasoning:
            "The NEJM is the highest-impact medical journal and the recent Phase 3 wins are a genuine positive signal. But the evidentiary picture is weaker than headline framing: the only active-comparator trial (vs escitalopram) was null on its pre-specified primary endpoint, the 12-month durability data are open-label without controls, and the Phase 3 effect sizes are modest enough that payers, clinicians, and possibly the FDA may question clinical meaningfulness. The score is moderated to reflect that the dose-comparison and active-comparator designs only partially address blinding, and that the strongest claim (sustained remission) rests substantially on uncontrolled follow-up.",
        },
        {
          id: "blinding-break-rates",
          title: "67% of MDMA Trial Participants Correctly Identified Their Treatment Assignment",
          description:
            "Post-trial blinding assessments in the MAPS/Lykos Phase 3 MDMA-PTSD trials revealed that the large majority of participants (roughly two-thirds or more in the MDMA arm) correctly identified their assignment, and ICER concluded the trials were 'essentially unblinded.' The dramatic subjective effects of MDMA (euphoria, empathy, sensory enhancement) make true blinding extremely difficult. When most participants know they received the active drug, the 'controlled' trial functions partly as an open-label study, and the placebo group's lower improvement may reflect 'nocebo' effects (disappointment at receiving placebo) rather than a pure drug-placebo difference. This is the central reason the FDA advisory committee and ICER discounted the efficacy estimates.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Nature Medicine; FDA Advisory Committee Briefing Document",
          sourceUrl: "https://www.fda.gov/media/178377/download",
          reasoning:
            "The blinding data comes from the trial's own assessment, published in a top journal. The FDA advisory committee highlighted this as a primary concern. The finding directly challenges the internal validity of the trial, which is the most cited evidence for MDMA therapy. However, imperfect blinding is common in psychiatric drug trials and does not automatically invalidate results.",
        },
        {
          id: "compass-pathways-conflicts",
          title: "COMPASS Pathways (For-Profit, NASDAQ-Listed) Funds the Pivotal Psilocybin Trials",
          description:
            "COMPASS Pathways, a for-profit company listed on NASDAQ, funded the largest Phase 2b trial of psilocybin for treatment-resistant depression (n=233) and sponsored the Phase 3 program (COMP005/COMP006). The company holds patents on its synthetic psilocybin formulation (COMP360) and elements of the therapeutic protocol, which psychedelic advocates argue should remain in the public domain. The financial incentive to produce positive results — and the stock market's reaction to clinical data (its shares fell sharply when Phase 3 effect sizes came in modest) — creates conflicts of interest similar to, though not worse than, those in conventional pharma. This funding structure is a reason to scrutinize and independently replicate the results, which counts against treating the sponsor-funded evidence as settled.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "COMPASS Pathways (COMP360 in treatment-resistant depression); SEC filings; STAT News",
          sourceUrl: "https://compasspathways.com/our-work/comp360-psilocybin-treatment-in-trd/",
          reasoning:
            "The financial facts (NASDAQ listing, patents, trial funding) are publicly verifiable. The conflict of interest is real but standard in drug development — most FDA-approved drugs are tested in company-funded trials. Directness is moderate because the existence of conflicts does not prove that results are biased; it means they should be scrutinized more carefully and replicated by independent investigators.",
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
        question:
          "Does supervised state-level access like Oregon's deliver real benefit at acceptable risk?",
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
            "If Oregon's facilitator-supervised programs logged low rates of serious harm, consistent with psilocybin's low addiction potential and lack of an established lethal dose, and fewer problems than decriminalized use, the worry that policy outran the evidence would lose much of its force.",
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

    // =========================================================================
    // PILLAR 3: Scaling & Access (folded in from the retired
    // psychedelic-therapy-hype map, 2026-10-06)
    // =========================================================================
    {
      id: "scaling-access",
      title: "Scaling & Access Challenges",
      short_summary:
        "Even if psychedelic therapy works, the treatment model poses enormous scaling challenges. Individual therapy sessions lasting 6-8 hours, the requirement for specially trained therapists, safety monitoring, and costs of $5,000+ per treatment episode make mass access extremely difficult. The question is whether the therapeutic model can be simplified without losing efficacy, or whether psychedelic therapy will remain a luxury treatment for the affluent.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The psychedelic therapy model is fundamentally unscalable. MDMA-assisted therapy for PTSD requires three 8-hour drug sessions, three preparatory sessions, and nine integration sessions — approximately 42 hours of therapist time per patient at a minimum cost of $5,000-$15,000. There are approximately 13 million Americans with PTSD; treating even 10% would require 55 million therapist-hours from specially trained providers who do not yet exist. Psilocybin therapy requires similar time investment. The comparison with conventional antidepressants, which cost $20-50/month and require a 15-minute prescriber visit, illustrates the gulf between psychedelic therapy and population-accessible mental health care. Oregon and Colorado have legalized supervised psilocybin use, but prices range from $1,500-$3,500 per session, and no insurance covers it. Psychedelic therapy may work for those who can afford it and access it, but it will not address the population-level mental health crisis.",
      proponent_rebuttal:
        "The scaling concern is valid but ignores two critical factors. First, psychedelic therapy may require only 2-3 sessions to produce lasting effects, compared to years of daily medication and weekly therapy for conventional treatments. The total treatment cost over a patient's lifetime may be lower than chronic SSRI use plus weekly psychotherapy, even at current psychedelic session prices. Second, the model is evolving: group-facilitated psilocybin sessions (4-6 patients per therapist), shorter protocols, and the development of non-psychedelic psychoplastogens (drugs that promote neuroplasticity without the psychedelic experience) could dramatically reduce per-patient costs and time. Ketamine already demonstrates that a simplified protocol — 6 infusions over 2 weeks with minimal therapy — can be effective, though it requires maintenance dosing. The first generation of any medical technology is always expensive and labor-intensive; costs decline as scale increases, training programs expand, and protocols are optimized.",
      crux: {
        id: "simplified-protocol-efficacy",
        title: "The Protocol Simplification Test",
        question:
          "Can psychedelic therapy be simplified to scale without losing its effect?",
        description:
          "If simplified psychedelic therapy protocols (fewer sessions, group formats, reduced therapist time, or non-hallucinogenic analogs) maintain the therapeutic efficacy of the full protocol at a fraction of the cost and time, scalable psychedelic mental health care is feasible. If the full therapeutic protocol with extensive preparation and integration is essential to the treatment effect, psychedelic therapy will remain a boutique service for the privileged few.",
        methodology:
          "Conduct randomized controlled trials comparing: (1) the full MAPS/Compass protocol, (2) a reduced protocol with fewer preparation/integration sessions, (3) a group-facilitated format with 4-6 patients per therapist, and (4) a pharmacological-only condition (drug without structured therapy). Measure clinical outcomes, cost per remission, and patient satisfaction across all conditions. Also track the development of non-hallucinogenic neuroplasticity drugs that could provide the therapeutic mechanism without the psychedelic experience.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$15-30M (Multi-arm RCT comparing full vs. simplified protocols across multiple sites)",
        falsification: {
          supporter_flip:
            "If trials comparing the full protocol with reduced, group-facilitated and drug-only formats found that only the full, therapist-intensive protocol works, psychedelic therapy would remain a boutique service rather than a shift in population-level mental health care.",
          skeptic_flip:
            "If group formats like the 2023 trial that treated cancer patients with depression three or four at a time, and short protocols like ketamine's 6 infusions over 2 weeks, held their effects at scale, a 2-3 session psychedelic therapy would look scalable.",
          common_ground:
            "Both sides agree today's protocols are costly and labor-intensive: MDMA therapy takes roughly 42 hours of therapist time per patient, and supervised psilocybin sessions cost $1,500-$3,500.",
          live_disagreement:
            "Whether group formats, shorter protocols and non-hallucinogenic analogs can keep the effect at a fraction of the cost, or whether the full preparation-and-integration protocol is essential to it.",
        },
      },
      evidence: [
        {
          id: "treatment-cost-barrier",
          title: "Supervised Psilocybin Sessions Cost $1,500-$3,500 in Oregon and Colorado",
          description:
            "Oregon's Measure 109 (2020) and Colorado's Proposition 122 (2022) legalized supervised psilocybin use for adults. As of 2025, licensed service centers in Oregon charge $1,500-$3,500 per session, which includes screening, preparation, the 6-8 hour supervised session, and a brief integration meeting. No health insurance covers psilocybin sessions. For comparison, a month of generic SSRI antidepressants costs $10-30. The cost barrier effectively limits legal access to middle- and upper-income individuals, exacerbating mental health treatment inequities — concrete evidence that, as currently delivered, the model does not scale to population need.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "Oregon Health Authority, Oregon Psilocybin Services; Colorado Department of Regulatory Agencies; NPR",
          sourceUrl: "https://www.oregon.gov/oha/PH/PREVENTIONWELLNESS/Pages/Oregon-Psilocybin-Services.aspx",
          reasoning:
            "The pricing data from state regulatory agencies is highly reliable and directly relevant to the access question. The comparison with SSRI costs starkly illustrates the scaling challenge. The data directly supports the claim that psychedelic therapy faces significant access barriers.",
        },
        {
          id: "group-psilocybin-pilot",
          title: "Group Psilocybin Therapy Shows Promise in a Cancer/Depression Trial (2023)",
          description:
            "An open-label trial (Agrawal et al., published in Cancer, December 2023) administered single-dose psilocybin to 30 patients with cancer and a major depressive disorder in small cohorts (groups of three to four), pairing a one-on-one therapy structure with simultaneous group sessions and a shared dosing day. Results showed clinically meaningful reductions in depression severity sustained at 8 weeks, with no serious treatment-related adverse events. If group formats prove effective in larger controlled trials, they could substantially reduce per-patient therapist time and proportionally reduce costs, making the treatment more accessible — i.e., this is evidence the scaling problem may be tractable, supporting the breakthrough side.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source: "Agrawal et al., \"Psilocybin-assisted group therapy in patients with cancer diagnosed with a major depressive disorder,\" Cancer (2023)",
          sourceUrl: "https://doi.org/10.1002/cncr.35010",
          reasoning:
            "This is a small, open-label single-arm trial with no placebo control, hence the lower replicability score. However, the finding that a group format may preserve efficacy while dramatically reducing per-patient therapist time is important for the scaling question. Larger controlled trials with comparison groups are needed to confirm.",
        },
      ],
    },
  ],
  // The retired psychedelic-therapy-hype map asked the same question as
  // "revolution or overhype?" (merged 2026-10-06); its names stay findable here.
  aliases: [
    "Psychedelic Therapy: Revolution or Overhype?",
    "Is psychedelic therapy a genuine revolution in mental health care?",
    "Is psychedelic therapy overhyped?",
    "Does psychedelic therapy actually work?",
    "Are the claims about psychedelic therapy exaggerated?",
  ],
  references: [
    {
      title: "MDMA-Assisted Therapy for Severe PTSD — Nature Medicine (2023)",
      url: "https://doi.org/10.1038/s41591-023-02565-4",
    },
    {
      title: "FDA Advisory Committee Briefing Document on MDMA (2024)",
      url: "https://www.fda.gov/media/178377/download",
    },
    {
      title: "Single-Dose Psilocybin for Treatment-Resistant Depression (COMPASS Phase 2b) — NEJM (2022)",
      url: "https://doi.org/10.1056/NEJMoa2206443",
    },
    {
      title: "Trial of Psilocybin versus Escitalopram for Depression — NEJM (2021)",
      url: "https://doi.org/10.1056/NEJMoa2032994",
    },
    {
      title: "Oregon Psilocybin Services — Oregon Health Authority",
      url: "https://www.oregon.gov/oha/PH/PREVENTIONWELLNESS/Pages/Oregon-Psilocybin-Services.aspx",
    },
  ],
};
