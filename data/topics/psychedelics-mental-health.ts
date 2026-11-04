export const psychedelicsMentalHealthData = {
  id: "psychedelics-mental-health",
  title: "Psychedelics for Mental Health",
  question:
    "Should psychedelics be approved to treat depression, PTSD and addiction?",
  meta_claim:
    "Psilocybin, MDMA and other psychedelics, given with therapy, are effective and acceptably safe treatments for depression, PTSD and addiction, and should be approved and made widely available.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: Compass Pathways said on 3 November that it will
  // file the final part of its rolling application for COMP360 psilocybin
  // in treatment-resistant depression within two weeks, under a national
  // priority voucher that could cut review to one or two months, and expects
  // a launch in the first half of 2027 if approved and rescheduled. The FDA
  // turned down MDMA for PTSD in August 2024. Oregon's 2025 data count 5,935
  // clients at licensed psilocybin service centers.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "The FDA may decide on the first psilocybin treatment within months: on 3 November 2026 Compass Pathways said it would file the last part of its application for treatment-resistant depression within two weeks. Its two Phase 3 trials met their goal, beating placebo by 3.6 and 3.8 points on a 60-point depression scale. In 2024 the FDA turned down MDMA for PTSD, after about 90% of patients given the drug correctly guessed they had it. The fight is over how much of the benefit is the drug and how much is expectation, and whether that is enough to approve.",
    confidence: 84,
    source:
      "Compass Pathways, third-quarter 2026 results (3 November 2026) and Form 8-K filings of 23 June 2025 and 17 February 2026; FDA briefing document for the 4 June 2024 Psychopharmacologic Drugs Advisory Committee",
    sourceUrl:
      "https://www.sec.gov/Archives/edgar/data/1816590/000181659026000078/q32026pressrelease.htm",
  },
  simple_case: [
    "The answer bears on whether millions of people with depression or PTSD that standard treatment has not helped get a new option next year, what it costs, and whether states keep licensing psilocybin outside medicine.",
    "Psilocybin and MDMA are still Schedule I drugs under federal law, the category for drugs with no accepted medical use.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What the trials show (what we know)
    // =========================================================================
    {
      id: "clinical-trial-evidence",
      title: "What the Trials Show",
      short_summary:
        "Psilocybin has now passed two Phase 3 trials in treatment-resistant depression, but the average gain over placebo was 3.6 to 3.8 points on a 60-point scale, and about 39% of patients responded. The only head-to-head trial against a standard antidepressant missed its main goal. Whether the benefit is big enough, for a treatment this demanding, is the first split.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Strip away the headlines and the best psilocybin data show a modest drug. In Compass's two Phase 3 trials, one 25 mg dose beat placebo by 3.6 points (COMP005) and 3.8 points (COMP006) on the 60-point MADRS scale at week 6, and by the company's own count only 39% of COMP006 patients on the full dose, and 25% in COMP005, had a clinically meaningful reduction. More than half of the full-dose COMP006 group, 58%, were dosed again after week 9. In the only trial against a standard antidepressant, psilocybin did not beat escitalopram on its primary measure (difference 2.0 points, P = 0.17). The striking numbers, such as 75% response at 12 months at Johns Hopkins, come from 24 people with no control group at follow-up. Each dose means hours under supervision in a clinic. That is a lot of cost and risk for a gain the size of an ordinary antidepressant's.",
      proponent_rebuttal:
        "These are patients with treatment-resistant depression, for whom earlier antidepressants had failed, and a single dose worked within weeks. Both Phase 3 trials, with 258 and 581 dosed participants, met their primary endpoint with P < 0.001, and Compass reports the effect held through 26 weeks in patients who responded. In the COMPASS Phase 2b trial in 233 patients, 25 mg beat a 1 mg control by 6.6 MADRS points at three weeks. Against escitalopram, psilocybin's secondary results all leaned its way: response 70% against 48% and remission 57% against 28%. In a Johns Hopkins study, 75% of completers still met response criteria a year later after two doses. A treatment taken once or twice, rather than daily for years, is a different kind of option. The FDA gave COMP360 Breakthrough Therapy status and a national priority voucher because the need is real.",
      crux: {
        id: "psilocybin-effect-size",
        title: "The Meaningful-Benefit Test",
        question:
          "Is beating placebo by under 4 MADRS points enough to justify psilocybin for treatment-resistant depression?",
        description:
          "Both Phase 3 trials beat placebo, so the question is size. A gain of under 4 points on a 60-point scale is close to what ordinary antidepressants show in easier-to-treat patients. Whether it matters depends on how many patients respond strongly, how long it lasts after one or two doses, and what the alternatives offer people for whom other drugs have failed.",
        methodology:
          "Patient-level analysis of COMP005 and COMP006 showing the share with large responses and remission in each arm, durability through 52 weeks against placebo, and comparison with esketamine and augmentation strategies in similar treatment-resistant populations.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Full publication of COMP005 and COMP006 with patient-level response and remission rates in each arm, placebo-controlled durability to 26 and 52 weeks, and the FDA's own review of whether the gain is clinically meaningful.",
        },
        cost_to_verify:
          "$0 (the trials are complete; the data need to be published and reviewed)",
        falsification: {
          supporter_flip:
            "If the full COMP005 and COMP006 data showed that the placebo-adjusted gain faded by week 26, and that patients on placebo responded nearly as often as those on psilocybin once retreatment is counted, the case that a single dose is a meaningful new option would weaken.",
          skeptic_flip:
            "If the full data showed that the 39% of full-dose patients who responded kept their gains for six months or more after one or two doses, far above the placebo arm, the objection that the effect is too small to matter would lose its force.",
          common_ground:
            "Both sides agree psilocybin beat placebo in two Phase 3 trials in treatment-resistant depression, by 3.6 and 3.8 MADRS points at week 6, and that most patients did not have a clinically meaningful response.",
          live_disagreement:
            "Whether a modest average gain, with a minority responding strongly, justifies a treatment that takes hours of clinic supervision per dose, and how it compares with existing options.",
        },
      },
      evidence: [
        {
          id: "psilocybin-depression-remission",
          title: "Compass Phase 3, 2025-2026: Psilocybin Beat Placebo by 3.6 and 3.8 MADRS Points at Week 6",
          description:
            "In COMP005, a single 25 mg dose of COMP360 psilocybin, given to people with treatment-resistant depression at 32 US sites (258 dosed), reduced MADRS scores 3.6 points more than placebo at week 6 (95% CI -5.7 to -1.5; P < 0.001). In COMP006 (581 dosed in North America and Europe), the difference was 3.8 points (95% CI -5.8 to -1.8; P < 0.001). The trial's safety board reported 'no new or unexpected safety findings' and no meaningful imbalance in suicidality. Compass reports that 39% of the full-dose arm in COMP006 and 25% in COMP005 had a clinically meaningful reduction at week 6, that responders on average kept it through week 26, and that 58% of COMP006's full-dose arm received a second dose after week 9.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 8,
            directness: 8,
          },
          source:
            "Compass Pathways, Form 8-K filings with the SEC (23 June 2025, 17 February 2026) and COMP006 data review (7 July 2026)",
          sourceUrl:
            "https://www.sec.gov/Archives/edgar/data/1816590/000181659026000007/cmps-20260217.htm",
          reasoning:
            "Two large, placebo-controlled Phase 3 trials hitting their primary endpoint is the strongest evidence any psychedelic has produced. The figures are the company's own, not yet peer-reviewed or reviewed by the FDA, the effect is modest, and the full-dose patients could usually tell they had taken psilocybin.",
        },
        {
          id: "psilocybin-vs-escitalopram",
          title: "NEJM 2021: Psilocybin Did Not Beat Escitalopram on Its Primary Measure",
          description:
            "In a double-blind trial of 59 people with long-standing, moderate-to-severe depression, two 25 mg psilocybin doses three weeks apart were compared with six weeks of daily escitalopram, with psychological support in both arms. On the primary measure, the QIDS-SR-16 self-report scale at week 6, scores fell 8.0 points with psilocybin and 6.0 with escitalopram, a difference of 2.0 points that was not significant (P = 0.17). Secondary measures favored psilocybin (response 70% against 48%, remission 57% against 28%), but these were not corrected for multiple comparisons.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source:
            "Carhart-Harris et al., 'Trial of Psilocybin versus Escitalopram for Depression', New England Journal of Medicine 384:1402-1411 (2021)",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2032994",
          reasoning:
            "The only head-to-head test against a standard antidepressant, and it was null on its own primary outcome. It was small, and its secondary results lean toward psilocybin, so it does not show psilocybin is worse; it shows the case for superiority is unproven.",
        },
        {
          id: "compass-phase-2b",
          title: "NEJM 2022: In 233 Patients, 25 mg Psilocybin Beat a 1 mg Dose by 6.6 MADRS Points at Three Weeks",
          description:
            "In COMPASS's Phase 2b trial in treatment-resistant depression, a single 25 mg dose cut MADRS scores by 12.0 points at three weeks, against 7.9 for 10 mg and 5.4 for the 1 mg control: a difference of 6.6 points for 25 mg (P < 0.001), while 10 mg did not separate from control. Sustained response at 12 weeks was not clearly better. Adverse events, including headache, nausea and dizziness, occurred in 77% of participants, and suicidal ideation or behavior or self-injury occurred in all dose groups.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "Goodwin et al., 'Single-Dose Psilocybin for a Treatment-Resistant Episode of Major Depression', New England Journal of Medicine 387:1637-1648 (2022); funded by COMPASS Pathfinder",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2206443",
          reasoning:
            "A clear dose-response result, which counts for a drug effect. The company funded it, the effect at 12 weeks was weaker, and the authors themselves called for larger, longer trials against existing treatments.",
        },
        {
          id: "hopkins-psilocybin-depression",
          title: "Johns Hopkins 2022: 75% of 24 Completers Met Response Criteria 12 Months After Two Doses",
          description:
            "A Johns Hopkins study randomized 27 adults with moderate to severe depression to immediate or delayed treatment with two psilocybin doses plus supportive psychotherapy. All 24 who completed both sessions were followed for 12 months: 75% met response criteria (a 50% or greater drop on the GRID-HAMD) and 58% were in remission at 12 months. No serious adverse events were judged related to psilocybin during follow-up.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source:
            "Gukasyan et al., 'Efficacy and safety of psilocybin-assisted treatment for major depressive disorder: Prospective 12-month follow-up', Journal of Psychopharmacology 36(2):151-158 (2022)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8864328/",
          reasoning:
            "Durability of this size is rare in psychiatry. But 24 people, a waitlist rather than a placebo control, and no control group during the 12-month follow-up mean expectation and selection cannot be ruled out.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Drug or expectation? (why the numbers are disputed)
    // =========================================================================
    {
      id: "expectancy-blinding",
      title: "The Drug, or the Expectation?",
      short_summary:
        "Psychedelic trials cannot be blinded like pill trials: patients know when they have tripped. In MDMA's Phase 3 program about 90% of patients on the drug, and 75% on placebo, correctly guessed which they had. That is the main reason an FDA panel voted 9-2 that MDMA's effectiveness was not shown. Whether better designs can separate drug from expectation decides what any trial result means.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "When nearly everyone knows what they got, a placebo-controlled trial becomes partly an open-label one. In MDMA's Phase 3 program, about 90% of participants on the drug and 75% on placebo guessed their assignment, and 78.8% of those on MDMA said they were 'positive'. People who expect a powerful drug to heal them may improve because of that expectation, and those who realize they got a placebo may do worse from disappointment. The FDA's advisers voted 9-2 that MDMA's effectiveness was not shown and 10-1 that its benefits did not outweigh its risks; the FDA then found unreported adverse events at two sites and possible selection bias, since many participants had used MDMA before. A 2025 meta-analysis found that in trials using an active drug as placebo, psilocybin's and MDMA's antidepressant effects were no longer statistically significant. The trials were also run by groups strongly committed to the result.",
      proponent_rebuttal:
        "Imperfect blinding is common in psychiatry; antidepressant side effects unblind many SSRI trials too, and nobody calls those drugs placebos. In MDMA's second Phase 3 trial, 71.2% of participants no longer met criteria for PTSD at study end, against 47.6% given the same intensive therapy with a placebo, and outcomes were scored by blinded independent raters. Even the advisers who voted yes noted that the effect sizes were large, and unblinding cannot explain a dose-response pattern like the 25 mg versus 10 mg split in psilocybin's Phase 2b. Active-placebo trials are few and small; their wide confidence intervals mean 'not significant', not 'no effect'. Better designs are coming, and the FDA said it would still consider the existing MDMA data if the sponsor runs a new trial.",
      crux: {
        id: "phase-3-psilocybin-approval",
        title: "The Expectancy Test",
        question:
          "How much of the improvement is the drug itself, versus expectations and the therapy bundled with it?",
        description:
          "If the benefit survives designs that blunt expectation, such as active placebos that cause noticeable effects, raters who never meet the patient, and statistical adjustment for what patients guessed, it is the drug. If it shrinks toward zero under those designs, much of what trials have measured is expectation plus intensive therapy.",
        methodology:
          "Trials with active placebos (for example a low dose or a non-psychedelic drug with noticeable effects), remote blinded raters, systematic guess surveys of patients and therapists, and analyses that test whether the effect holds among patients who guessed wrong.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Phase III trials with active placebos that cause noticeable effects, independent raters who do not know the assignment and a count of how many patients and therapists guessed correctly, reviewed by the FDA with the same scrutiny MDMA got in 2024.",
        },
        cost_to_verify: "$20-50M (an active-placebo Phase 3 trial)",
        falsification: {
          supporter_flip:
            "If active-placebo trials with blinded remote raters found psilocybin's or MDMA's benefit shrinking to near zero, as the 2025 design meta-analysis hints, the case that these are drug effects rather than expectation plus therapy would collapse.",
          skeptic_flip:
            "If a design that truly controls for expectancy, with an active placebo and raters who never meet the patient, still found large, lasting benefit, the 'it is expectation' explanation would fail.",
          common_ground:
            "Both sides agree psychedelic trials cannot be blinded the way a pill trial can, since most participants know whether they received an active psychedelic, and that the FDA rejected MDMA for PTSD in 2024 largely on that ground.",
          live_disagreement:
            "How much of the measured improvement is the drug's pharmacology versus the expectation and intensive therapy that come with it, and what trial design would be good enough to tell.",
        },
      },
      evidence: [
        {
          id: "blinding-break-rates",
          title: "FDA Briefing 2024: About 90% on MDMA and 75% on Placebo Correctly Guessed Their Assignment",
          description:
            "The FDA's briefing document for its June 2024 advisory committee states that MDMA trials 'are nearly impossible to blind'. In a post-study survey, 'the vast majority (approximately 90% of those assigned to drug and 75% of those assigned to placebo)' accurately guessed their treatment assignment. In MAPP2, 78.8% of those on MDMA said they were 'positive' they had the drug, against 43.2% of those on placebo who were 'positive' they had placebo. The FDA added that in-session monitors could likely deduce assignment from behavior, and that 'it is reasonable to assume that functional unblinding and expectation bias has impacted treatment effects' to some extent.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source:
            "FDA, Briefing Document for the Psychopharmacologic Drugs Advisory Committee meeting on NDA 215455, midomafetamine (4 June 2024)",
          sourceUrl: "https://www.fda.gov/media/178984/download",
          reasoning:
            "The regulator's own analysis of the sponsor's data, and directly on the crux. It shows the blind failed; it cannot say how much of the effect that explains, which the FDA itself said 'cannot be quantified'.",
        },
        {
          id: "fda-mdma-rejection",
          title: "FDA Advisers Voted 9-2 That MDMA's Effectiveness Was Not Shown; the Agency Rejected It in August 2024",
          description:
            "On 4 June 2024 the FDA's Psychopharmacologic Drugs Advisory Committee voted 2 yes and 9 no on whether the data showed midomafetamine (MDMA) is effective for PTSD, and 1 yes and 10 no on whether its benefits with the proposed safety program outweigh its risks. Many members cited functional unblinding, expectation bias and selection bias. On 9 August 2024 the FDA declined to approve. Its letter, published in September 2025, cited unreported adverse events at at least two sites, insufficient evidence on durability and possible selection bias, and suggested an independent third-party audit of all study records.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "FDA, Final Summary Minutes of the Psychopharmacologic Drugs Advisory Committee (4 June 2024); Psychedelic Alpha (4 September 2025) on the published Complete Response Letter",
          sourceUrl: "https://www.fda.gov/media/180463/download",
          reasoning:
            "The regulator's verdict on the largest psychedelic Phase 3 program. It is about one drug, one sponsor and trial conduct as well as blinding, so it does not settle psilocybin, which is being reviewed separately.",
        },
        {
          id: "maps-phase-3-mdma",
          title: "Nature Medicine 2023 (MAPP2): 71.2% on MDMA No Longer Met PTSD Criteria, Against 47.6% on Placebo",
          description:
            "In the second Phase 3 trial of MDMA-assisted therapy, 104 people with moderate to severe PTSD were randomized to MDMA or placebo, each with identical therapy. Blinded independent assessors scored the CAPS-5: symptoms fell 23.7 points with MDMA and 14.8 with placebo (P < 0.001, d = 0.7). By study end, 37 of 52 (71.2%) on MDMA no longer met DSM-5 criteria for PTSD, against 20 of 42 (47.6%) on placebo. There were no deaths or serious treatment-emergent adverse events.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 5,
            directness: 8,
          },
          source:
            "Mitchell et al., 'MDMA-assisted therapy for moderate to severe PTSD: a randomized, placebo-controlled phase 3 trial', Nature Medicine 29:2473-2480 (2023)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10579091/",
          reasoning:
            "A large effect in a hard-to-treat condition, scored by blinded raters. The sponsor is an advocacy-aligned developer, the trial was small, and the FDA found the blind broke and adverse events went unreported at some sites.",
        },
        {
          id: "design-bias-meta-2025",
          title: "Journal of Affective Disorders 2025: With an Active Drug as Placebo, Psychedelic Effects Were No Longer Significant",
          description:
            "A meta-analysis grouped psychedelic depression trials by design. Against an inactive placebo, psilocybin (4 trials, Hedges' g 0.87) and MDMA (2 trials, g 0.65) showed large and medium effects. In trials using an active drug as placebo, neither psilocybin (2 trials, g 0.71, 95% CI -0.01 to 1.43) nor MDMA (3 trials, g 0.53, CI -0.23 to 1.28) was statistically significant. Single-arm and waitlist designs gave psilocybin effect sizes of 2.51 and 2.88. The authors concluded effects 'may be overestimated' in single-arm, inactive-placebo and waitlist designs.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "Li et al., 'The association between study design and antidepressant effects in psychedelic-assisted therapy: A meta-analysis', Journal of Affective Disorders 369:421-428 (2025)",
          sourceUrl: "https://doi.org/10.1016/j.jad.2024.10.016",
          reasoning:
            "Directly tests whether the effect shrinks when expectation is better controlled, and it does. The active-placebo groups contain only two or three small trials, so the wide intervals are consistent with a real but smaller effect as well as with none.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Rules and real-world access (policy)
    // =========================================================================
    {
      id: "policy-regulatory-path",
      title: "Schedule I, State Programs and the Rush to Approve",
      short_summary:
        "Federal law still lists psilocybin and MDMA as having no accepted medical use, yet Oregon licensed psilocybin services for any adult and served 5,935 clients in 2025, and a White House order tells the DEA to move fast on rescheduling once a psychedelic passes Phase 3. The split is whether policy is catching up with science or running ahead of it.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Policy is outrunning the evidence. Oregon licenses psilocybin for any adult without a diagnosis, and its 2025 data show what that means in practice: of 5,935 clients, 1,413 named anxiety, 1,304 depression, 775 PTSD and 291 substance use as reasons. A program for adult use is treating psychiatric patients outside the FDA's safeguards, and the state collects no data on whether they get better, only counts of reactions, with clients free to opt out. Federally, a priority voucher can cut a review to one or two months, and a White House order directs the DEA to move rapidly on rescheduling. Speed is how rare harms get missed. Psilocybin can trigger dangerous behavior in unsupervised users and can worsen psychotic illness in people predisposed to it, risks that screening in trials kept out of view.",
      proponent_rebuttal:
        "Schedule I says psilocybin has 'no accepted medical use' and high abuse potential, and the science says otherwise. A review applying the Controlled Substances Act's own eight factors found psilocybin has limited reinforcing effects and harms 'low compared to prototypical abused drugs', and recommended Schedule IV if a medicine is approved. Oregon's record is reassuring: across 5,935 clients in 2025 there were 13 reports of emergency services being called, 7 severe adverse behavioral reactions and 2 severe medical ones, with facilitators present for every session. The people using Oregon's program have depression and PTSD that standard care has not fixed. Supervised access with screening is safer than the unregulated use that happens anyway, and moving quickly on drugs that have passed Phase 3 is what priority review is for.",
      crux: {
        id: "state-level-outcome-data",
        title: "The Real-World Outcomes Test",
        question:
          "Does supervised state-level access like Oregon's deliver real benefit at acceptable risk?",
        description:
          "Oregon and Colorado license psilocybin services outside medicine. Their data count reactions but not outcomes, so nobody can yet say whether clients with depression or PTSD get better, or how often serious harm follows a session.",
        methodology:
          "Follow service-center clients for 6 to 12 months with standard depression and PTSD scales, emergency visits and psychiatric admissions, and compare them with matched people seeking other treatment; publish through state health agencies or university evaluators.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Oregon's and Colorado's service-center data on adverse events, emergency visits and follow-up mental health scores, compared with matched people seeking other treatment, published by state health agencies or university evaluators.",
        },
        cost_to_verify: "$1M (prospective outcomes study of the Oregon program)",
        falsification: {
          supporter_flip:
            "If follow-up of Oregon and Colorado clients found high rates of psychiatric emergencies or admissions after sessions, or no improvement in depression or PTSD compared with people seeking other care, the case that supervised access helps would weaken.",
          skeptic_flip:
            "If follow-up found clients with depression or PTSD improving more than matched people in standard care, with serious harm as rare as Oregon's 2025 counts suggest, the worry that policy has outrun the evidence would lose much of its force.",
          common_ground:
            "Both sides agree state programs have moved ahead of FDA approval, that Oregon's 2025 data recorded few severe reactions among 5,935 clients, and that the state collects no data on whether clients get better.",
          live_disagreement:
            "Whether supervised, non-medical psilocybin access delivers real mental-health benefit at acceptable risk, and whether federal regulators should move faster or slower than the evidence on blinding allows.",
        },
      },
      evidence: [
        {
          id: "oregon-clients-seek-treatment",
          title: "Oregon 2025: 5,935 Clients; 1,413 Cited Anxiety, 1,304 Depression and 775 PTSD",
          description:
            "Oregon's 2025 year-end data count 5,935 clients served at licensed psilocybin service centers, in 4,628 individual and 747 group sessions. Asked their reasons (select all that apply), 1,816 cited general health and wellness, 1,413 anxiety, 1,304 depression, 775 PTSD and 291 substance use. The state recorded 13 reports of emergency services being contacted, 7 severe adverse behavioral reactions and 2 severe adverse medical reactions. Clients may opt out of the data form, and the state does not collect symptom outcomes.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "Oregon Health Authority, Oregon Psilocybin Services 2025 Year-End Data Summary (SB 303 data, 1 January-31 December 2025)",
          sourceUrl:
            "https://www.oregon.gov/oha/PH/PREVENTIONWELLNESS/Documents/2025-Year-End-Data-Summary.pdf",
          reasoning:
            "Official counts that cut both ways. The few severe reactions are a point for supervised access; the large number of clients seeking help for depression and PTSD outside the FDA pathway, with no outcome data, is the skeptics' point. Reasons are self-reported and clients may opt out, so the figures are lower bounds.",
        },
        {
          id: "schedule-1-outdated",
          title: "Neuropharmacology 2018: Applying the Law's Own Eight Factors, Psilocybin Fits Schedule IV, Not I",
          description:
            "Johns Hopkins researchers assessed medical psilocybin against the eight factors the Controlled Substances Act uses to schedule drugs. They found it has 'limited reinforcing effects', that 'scope of use and associated harms are low compared to prototypical abused drugs', and that its potential harms, dangerous behavior in unprepared, unsupervised users and worsening of mental illness in those with or predisposed to psychotic disorders, can be managed with dose control, screening, preparation and supervision. They concluded that 'placement in Schedule IV may be appropriate if a psilocybin-containing medicine is approved.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Johnson, Griffiths, Hendricks & Henningfield, 'The abuse potential of medical psilocybin according to the 8 factors of the Controlled Substances Act', Neuropharmacology 142:143-166 (2018)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/29753748/",
          reasoning:
            "A structured, peer-reviewed case that Schedule I does not fit psilocybin as a medicine. Its authors are leading psilocybin researchers, and its conclusion is conditional on approval and on the medical model's safeguards, so it does not endorse non-medical access.",
        },
        {
          id: "oregon-psilocybin-services",
          title: "Oregon's Measure 109 (2020): The First US Licensed Psilocybin Services, for Any Adult",
          description:
            "Oregon voters passed Measure 109 in November 2020, now ORS 475A, directing the Oregon Health Authority to license and regulate psilocybin production and services. Clients take psilocybin at licensed service centers under a licensed facilitator's supervision; no medical diagnosis is required. A 2023 law, SB 303, requires centers to report client and safety data.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 4,
          },
          source:
            "Oregon Health Authority, Oregon Psilocybin Services 2025 Year-End Data Summary (overview of ORS 475A and SB 303)",
          sourceUrl:
            "https://www.oregon.gov/oha/PH/PREVENTIONWELLNESS/Documents/2025-Year-End-Data-Summary.pdf",
          reasoning:
            "Shows a regulated alternative to both prohibition and unregulated use exists and can be run. It is an access program, not a trial, so it says nothing directly about efficacy.",
        },
        {
          id: "rescheduling-order-2026",
          title: "Compass, 2026: Priority Voucher Could Cut FDA Review to 1-2 Months; White House Order Tells DEA to Move Fast",
          description:
            "Compass Pathways reports that the FDA awarded its psilocybin COMP360 a Commissioner's National Priority Voucher, which 'could shorten review times to 1-2 months', and that a White House executive order on psychedelic treatments directs the DEA to review drugs that complete Phase 3 trials so they can be rescheduled quickly. Compass says states covering about 90% of the US patient population intend to reschedule within 30 days of federal action, and expects a launch in the first half of 2027 if approved.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 5,
            directness: 5,
          },
          source:
            "Compass Pathways, second- and third-quarter 2026 results (5 August and 3 November 2026), filed with the SEC",
          sourceUrl:
            "https://www.sec.gov/Archives/edgar/data/1816590/000181659026000059/q22026pressrelease.htm",
          reasoning:
            "Shows how fast the federal path has opened. The description of the order and voucher comes from the company that benefits, and speed of review says nothing about the strength of the evidence.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Can it scale? (what it would take)
    // =========================================================================
    {
      id: "scaling-access",
      title: "Can It Scale Beyond a Luxury Treatment?",
      short_summary:
        "A course of MDMA therapy as tested meant three drug sessions of about eight hours each, plus three preparatory and nine integration sessions. Psilocybin needs hours of supervision per dose. Whether group formats, shorter protocols or drugs without the trip can keep the effect is what decides if this reaches more than a few.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The treatment model is built around therapist time. In MDMA's Phase 3 trials, each patient had three medication sessions of about eight hours, three preparatory sessions and nine integration sessions. Psilocybin needs hours of supervision per dose, and 58% of the full-dose group in COMP006 were dosed again. A generic antidepressant needs a prescription and a pharmacy. Trained facilitators and certified clinics are scarce, insurers have not committed to pay, and the costs of a monitored day add up fast. Even if the drugs work, a therapy that needs this much skilled time will reach those who can pay and leave the public crisis untouched.",
      proponent_rebuttal:
        "Hours per dose are the wrong measure; what matters is the total over a course of illness, and one or two doses that last months compare well with years of daily pills and weekly therapy. The model is already compressing. In a 2024 trial at a community cancer practice, 30 patients with depression took psilocybin together in groups of three or four, with about four hours of one-to-one support and four of group support; depression scores fell 19.1 points by week 8, 80% had a sustained response and no psilocybin-related serious adverse events occurred. Compass says more than 8,500 US treatment centers are already equipped for multi-hour treatments. First-generation treatments are always labor-intensive; protocols shorten as experience grows.",
      crux: {
        id: "simplified-protocol-efficacy",
        title: "The Protocol Simplification Test",
        question:
          "Can psychedelic therapy be simplified to scale without losing its effect?",
        description:
          "If group sessions, fewer therapist hours or non-hallucinogenic analogs keep the benefit of the full protocol, psychedelic treatment can reach many people. If the intensive preparation, monitoring and integration are essential to the effect, it will stay a specialist service for few.",
        methodology:
          "Randomized trials comparing the full protocol with group formats, reduced therapy hours and drug with minimal therapy, on the same depression or PTSD scales with blinded raters, measuring cost per remission and follow-up of a year or more.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Randomized trials that compare the full protocol head to head with group sessions, fewer therapist hours or non-hallucinogenic analogs, on the same depression or PTSD scales, with blinded raters and follow-up of a year or more.",
        },
        cost_to_verify:
          "$15-30M (multi-arm randomized trial across several sites)",
        falsification: {
          supporter_flip:
            "If trials comparing the full protocol with group, reduced-therapy and drug-only formats found that only the full, therapist-intensive protocol works, psychedelic therapy would remain a specialist service rather than a broad treatment.",
          skeptic_flip:
            "If controlled trials repeated the 2024 group result, a 19.1-point drop in depression scores with three or four patients dosed together, the objection that the model cannot scale would lose its force.",
          common_ground:
            "Both sides agree today's protocols are labor-intensive: MDMA therapy as tested took three roughly eight-hour drug sessions plus twelve therapy sessions, and psilocybin needs hours of supervision per dose.",
          live_disagreement:
            "Whether group formats, shorter protocols and non-hallucinogenic analogs can keep the effect at a fraction of the cost, or whether the full preparation-and-integration protocol is essential to it.",
        },
      },
      evidence: [
        {
          id: "treatment-cost-barrier",
          title: "FDA Briefing 2024: MDMA Therapy as Tested Took Three 8-Hour Drug Sessions Plus 12 Therapy Sessions",
          description:
            "In the MDMA Phase 3 trials described in the FDA's briefing document, participants had three preparatory psychotherapy sessions, then three medication sessions, each lasting about 8 hours and three to five weeks apart, and three integrative sessions after each medication session, nine in all. The preparatory period could last up to 11 weeks, and the full course 9 to 15 weeks of medication sessions.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "FDA, Briefing Document for the Psychopharmacologic Drugs Advisory Committee meeting on midomafetamine (4 June 2024)",
          sourceUrl: "https://www.fda.gov/media/178984/download",
          reasoning:
            "The regulator's description of what a course actually involved, which sizes the scaling problem. It describes MDMA's trial protocol; psilocybin's dosing session is shorter and real-world protocols may be lighter.",
        },
        {
          id: "group-psilocybin-pilot",
          title: "Cancer 2024: Group Psilocybin Sessions Cut Depression Scores 19.1 Points in 30 Patients",
          description:
            "In an open-label Phase 2 trial at a community oncology practice, 30 patients with cancer and major depression took a single 25 mg dose of psilocybin in cohorts of three or four, with 4.25 hours of one-to-one therapist support and 3.75 hours of group support. Depression scores fell 19.1 points from baseline by week 8; 80% had a sustained response and 50% were in full remission from week 1 through week 8. No psilocybin-related serious adverse events occurred.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source:
            "Agrawal et al., 'Psilocybin-assisted group therapy in patients with cancer diagnosed with a major depressive disorder', Cancer 130(7):1137-1146 (2024)",
          sourceUrl: "https://doi.org/10.1002/cncr.35010",
          reasoning:
            "Evidence that a leaner, group format is feasible and safe in an ordinary clinic. It had no control group, 30 patients and eight weeks of follow-up, so the effect size is not comparable to a controlled trial.",
        },
        {
          id: "compass-pathways-conflicts",
          title: "Compass Plans a 2027 Launch Through 8,500 Treatment Centers; It Funds the Trials and Holds the Patents",
          description:
            "Compass Pathways, a NASDAQ-listed company, funded the COMPASS Phase 2b and both Phase 3 trials of its synthetic psilocybin, COMP360, and holds patents on the formulation. In November 2026 it said it was ready to launch in the first half of 2027 if approved, citing more than 8,500 US treatment centers already equipped for multi-hour treatments, with a commercial team in place.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 5,
            directness: 5,
          },
          source:
            "Compass Pathways, third-quarter 2026 results (3 November 2026); Goodwin et al., NEJM (2022), funding statement",
          sourceUrl:
            "https://www.sec.gov/Archives/edgar/data/1816590/000181659026000078/q32026pressrelease.htm",
          reasoning:
            "Infrastructure for delivery exists, which cuts against the scaling worry; the company that would profit produced almost all the pivotal evidence, which is a reason for independent replication. Company funding is standard in drug development and does not by itself show bias.",
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
    "Should the FDA approve psilocybin for depression?",
  ],
  references: [
    {
      title: "Compass Pathways third-quarter 2026 results (SEC filing, 3 November 2026)",
      url: "https://www.sec.gov/Archives/edgar/data/1816590/000181659026000078/q32026pressrelease.htm",
    },
    {
      title: "FDA Briefing Document, Psychopharmacologic Drugs Advisory Committee on MDMA (June 2024)",
      url: "https://www.fda.gov/media/178984/download",
    },
    {
      title: "FDA Final Summary Minutes, Psychopharmacologic Drugs Advisory Committee (June 2024)",
      url: "https://www.fda.gov/media/180463/download",
    },
    {
      title: "MDMA-Assisted Therapy for Moderate to Severe PTSD (MAPP2) - Nature Medicine (2023)",
      url: "https://doi.org/10.1038/s41591-023-02565-4",
    },
    {
      title: "Trial of Psilocybin versus Escitalopram for Depression - NEJM (2021)",
      url: "https://doi.org/10.1056/NEJMoa2032994",
    },
    {
      title: "Oregon Psilocybin Services 2025 Year-End Data Summary - Oregon Health Authority",
      url: "https://www.oregon.gov/oha/PH/PREVENTIONWELLNESS/Documents/2025-Year-End-Data-Summary.pdf",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Should the FDA approve psilocybin for treatment-resistant depression?",
      content:
        "Compass's two Phase 3 trials beat placebo by 3.6 and 3.8 points on a 60-point scale, and about 39% of full-dose patients responded meaningfully. Most patients could tell they had taken psilocybin. Is that enough for approval, with a priority voucher that could cut review to one or two months, or should the FDA wait for designs that better control expectation?",
    },
    {
      id: "q2",
      title: "Was the FDA right to reject MDMA for PTSD?",
      content:
        "In MAPP2, 71.2% on MDMA no longer met PTSD criteria against 47.6% on placebo with the same therapy. But about 90% of patients on the drug guessed they had it, FDA advisers voted 9-2 that effectiveness was not shown, and inspectors found unreported adverse events. Was the rejection a sound call on weak trials, or a bar no psychedelic could clear?",
    },
    {
      id: "q3",
      title: "Should states license psilocybin before the FDA approves it?",
      content:
        "Oregon served 5,935 clients in 2025, many seeking help for depression, anxiety or PTSD, with few severe reactions reported but no data on whether they got better. Is supervised adult access a safer alternative to underground use, or medicine without the safeguards of medicine?",
    },
  ],
};
