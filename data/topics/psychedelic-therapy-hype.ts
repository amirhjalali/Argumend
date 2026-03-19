export const psychedelicTherapyHypeData = {
  id: "psychedelic-therapy-hype",
  title: "Psychedelic Therapy: Revolution or Overhype?",
  meta_claim:
    "The psychedelic therapy renaissance — with psilocybin, MDMA, and ketamine treatments gaining clinical validation — represents a genuine paradigm shift in mental health treatment, not a repeat of the 1960s overpromise-and-backlash cycle.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Clinical Evidence
    // =========================================================================
    {
      id: "clinical-evidence",
      title: "Clinical Evidence for Psychedelic Therapy",
      short_summary:
        "Phase 2 and Phase 3 clinical trials have shown remarkable results for psilocybin in treatment-resistant depression, MDMA in PTSD, and ketamine in acute suicidality. But the evidence base is smaller and more methodologically contested than headlines suggest. The question is whether these results will survive larger, more rigorous trials and real-world deployment.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The clinical evidence for psychedelic therapy, while promising, is far weaker than media coverage suggests. The MAPS Phase 3 MDMA-PTSD trial, which found that 71% of participants no longer met PTSD diagnostic criteria, has been criticized for methodological limitations: the blinding was effectively broken (67% of participants correctly guessed their assignment due to MDMA's obvious subjective effects), the therapy condition included extensive preparatory and integration sessions that make it impossible to separate drug effects from therapy effects, and the study excluded patients with suicidality, psychosis risk, and substance use disorders — the very populations most in need of new treatments. The FDA's advisory committee voted against MDMA approval in June 2024, citing these concerns. Psilocybin depression trials have similar blinding problems, small sample sizes (n=24 in the COMPASS Pathways flagship study), and short follow-up periods. The effect sizes, while large in percentage terms, may be substantially inflated by expectancy effects in unblinded participants.",
      proponent_rebuttal:
        "The blinding criticism, while technically valid, proves too much — it would also invalidate trials of any psychoactive substance with obvious subjective effects, including many approved antidepressants, anxiolytics, and pain medications. The relevant question is not whether participants knew they received the drug but whether the clinical improvement is real and durable. MDMA-assisted therapy showed sustained PTSD symptom reduction at 12-month follow-up, far beyond what expectancy alone would predict. Psilocybin trials at Johns Hopkins, NYU, and Imperial College London have shown sustained remission from depression at 6-12 months in treatment-resistant patients who had failed multiple conventional treatments. The FDA granted 'breakthrough therapy' designation to both psilocybin (Compass Pathways) and MDMA (MAPS) — a designation reserved for drugs that show substantial improvement over available therapies based on preliminary evidence. Ketamine, already FDA-approved as esketamine (Spravato) for treatment-resistant depression, provides proof-of-concept that psychedelic-mechanism drugs can survive regulatory scrutiny. The bar should not be perfection but whether these therapies offer meaningful benefit to patients who have exhausted conventional options.",
      crux: {
        id: "placebo-controlled-replication",
        title: "The Blinding-Controlled Replication Test",
        description:
          "If psychedelic therapy trials using enhanced blinding protocols (active placebos that produce subjective effects without the therapeutic mechanism, or designs that compare different doses rather than drug vs. placebo) replicate the large effect sizes seen in earlier trials, then the therapeutic effects are real and not primarily driven by expectancy. If effect sizes shrink substantially under better-blinded conditions, the therapeutic revolution is overstated.",
        methodology:
          "Conduct multi-site RCTs of psilocybin for depression and MDMA for PTSD using active placebo controls (niacin for psilocybin, low-dose methylphenidate for MDMA) that produce noticeable subjective effects to improve blinding. Include blinding assessment questionnaires and analyze results separately for correctly and incorrectly blinded participants. Require minimum 12-month follow-up and include the populations excluded from earlier trials (suicidal ideation, substance use history). Pre-register all analyses.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$20-50M (Multi-site, active-placebo-controlled Phase 3 trials with extended follow-up)",
      },
      evidence: [
        {
          id: "maps-mdma-phase3",
          title: "MAPS Phase 3: 71% of MDMA-PTSD Participants No Longer Met Diagnosis (2023)",
          description:
            "The Multidisciplinary Association for Psychedelic Studies (MAPS) Phase 3 trial of MDMA-assisted therapy for severe PTSD found that 71% of participants in the MDMA group no longer met diagnostic criteria for PTSD after three sessions, compared to 48% in the placebo group. The effect size (Cohen's d = 0.91) was large by clinical standards. Participants had moderate-to-severe PTSD with an average duration of 14 years and had failed previous treatments. Results were published in Nature Medicine.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 9,
          },
          source: "Nature Medicine; MAPS",
          sourceUrl: "https://doi.org/10.1038/s41591-023-02565-4",
          reasoning:
            "Published in Nature Medicine, a top-tier journal. The effect size is impressive and the population (treatment-resistant PTSD) is clinically significant. However, MAPS is both the study sponsor and an advocacy organization, reducing independence. The blinding problems (67% correctly guessed assignment) and the high placebo response rate (48%) are legitimate concerns. Replicability needs larger, independently funded trials to confirm.",
        },
        {
          id: "fda-advisory-committee-rejection",
          title: "FDA Advisory Committee Votes Against MDMA Approval (June 2024)",
          description:
            "In June 2024, the FDA's Psychopharmacologic Drugs Advisory Committee voted 9-2 against recommending MDMA for PTSD treatment, citing concerns about study design flaws (inadequate blinding), potential for abuse, missing safety data, and difficulty distinguishing drug effects from therapy effects. Committee members expressed concern that the therapy-heavy protocol (three preparatory sessions, three 8-hour drug sessions, and nine integration sessions) made the treatment impractical to scale. The FDA typically follows advisory committee recommendations, though it is not required to do so.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "FDA; STAT News; Nature",
          sourceUrl: "https://www.fda.gov/advisory-committees/advisory-committee-calendar/june-4-2024-meeting-psychopharmacologic-drugs-advisory-committee",
          reasoning:
            "The FDA advisory committee is the most authoritative independent body for evaluating drug evidence. A 9-2 vote against is a strong signal of significant evidentiary concerns. The committee's independence is beyond question. This directly challenges the claim that psychedelic therapy has achieved clinical validation sufficient for approval.",
        },
        {
          id: "psilocybin-depression-remission",
          title: "Psilocybin Produces Rapid, Sustained Remission in Treatment-Resistant Depression (2022)",
          description:
            "A randomized controlled trial published in the New England Journal of Medicine compared psilocybin (25mg, single dose) with the SSRI escitalopram (daily for 6 weeks) for major depressive disorder. The psilocybin group showed faster onset of improvement and comparable efficacy at 6 weeks on the primary outcome measure (QIDS-SR-16). Secondary measures favored psilocybin on response rate (70% vs. 48%) and remission rate (57% vs. 28%). A separate Johns Hopkins trial in treatment-resistant depression showed sustained improvement at 12-month follow-up after just two psilocybin sessions.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "New England Journal of Medicine; Johns Hopkins",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2206443",
          reasoning:
            "The NEJM is the highest-impact medical journal, and the head-to-head comparison with an active comparator (escitalopram) partially addresses the blinding concern. The sustained 12-month effects are difficult to attribute to placebo alone. However, sample sizes remain small, independent replication is limited, and the open-label nature of some studies leaves expectancy effects as a concern.",
        },
        {
          id: "ketamine-spravato-approval",
          title: "Esketamine (Spravato) FDA-Approved for Treatment-Resistant Depression (2019)",
          description:
            "The FDA approved esketamine (Spravato), a nasal spray formulation of the dissociative anesthetic ketamine, for treatment-resistant depression in 2019. The approval was based on multiple RCTs showing rapid-onset antidepressant effects (within hours) in patients who had failed at least two conventional antidepressants. This represents the first approval of a psychedelic-mechanism drug for a psychiatric indication and provides proof-of-concept that the regulatory pathway is viable. However, Spravato requires administration in a certified healthcare setting under supervision due to abuse potential and dissociative side effects.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "FDA; Janssen Pharmaceuticals; American Journal of Psychiatry",
          sourceUrl: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-nasal-spray-medication-treatment-resistant-depression-available-only-certified",
          reasoning:
            "FDA approval is the gold standard of clinical validation, based on rigorous Phase 3 trials. Esketamine demonstrates that psychedelic-mechanism drugs can meet regulatory requirements. However, its clinical impact has been moderate — adoption has been slower than expected due to cost ($300/session), administration requirements, and questions about whether the effects are truly sustained or require repeated dosing. Directness for the broader psychedelic therapy claim is moderate because ketamine's mechanism differs from classic psychedelics.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Methodological Concerns
    // =========================================================================
    {
      id: "methodological-concerns",
      title: "Methodological Concerns & Bias",
      short_summary:
        "Psychedelic therapy research faces unique methodological challenges. Blinding is nearly impossible because patients know whether they received a psychedelic. Expectancy effects are amplified by intense media hype and cultural narratives about psychedelic 'breakthroughs.' Commercial incentives from a rapidly growing industry may bias both research design and interpretation.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The psychedelic therapy field has a replication problem hidden behind impressive-looking results. When participants know they received a powerful psychedelic drug (and 67% correctly guess in MDMA trials), their expectations of improvement become a powerful confound that standard statistical controls cannot fully address. This is not a minor technical issue — placebo effects in depression trials routinely account for 30-40% of the treatment response, and unblinded trials systematically overestimate true drug effects by 20-40%. The field is also compromised by conflicts of interest: MAPS, COMPASS Pathways, and Usona Institute fund most research while simultaneously developing commercial products. COMPASS Pathways, a for-profit company trading on NASDAQ, funded the largest psilocybin trial and stands to profit enormously from approval. This is not the dispassionate scientific enterprise media coverage portrays — it is a $10 billion industry funding studies of its own products.",
      proponent_rebuttal:
        "The blinding challenge is real but not unique to psychedelics. Trials of SSRIs, benzodiazepines, and opioids all have imperfect blinding because of obvious side effects, yet these drugs receive FDA approval and are widely prescribed. The standard for approval is not perfect methodology but 'substantial evidence of effectiveness' from adequate and well-controlled trials. Active placebo designs, dose-response studies, and long-term follow-up all help distinguish true effects from expectancy. The conflict-of-interest concern also applies to every pharmaceutical company that funds trials of its own drugs — this is the standard model of drug development, not a unique failing of the psychedelic field. What distinguishes psychedelic research is the involvement of academic medical centers (Johns Hopkins, NYU, Imperial College, UCSF) with reputational incentives to produce rigorous science. The field needs better methodology, but dismissing the entire evidence base because of imperfect blinding sets an impossibly high standard that would disqualify many approved treatments.",
      crux: {
        id: "expectancy-effect-magnitude",
        title: "The Expectancy Effect Quantification",
        description:
          "If studies using enhanced blinding or active placebos show that expectancy effects account for more than 50% of the observed treatment response in psychedelic trials, the clinical evidence is substantially weaker than it appears. If expectancy effects are measurably present but account for less than 25% of the response, the therapeutic effects are robust enough to survive methodological scrutiny.",
        methodology:
          "Analyze existing psychedelic trial data stratified by participants' blinding status (correctly vs. incorrectly guessed assignment). Compare effect sizes for 'unblinded' vs. 'still-blinded' subgroups. Additionally, conduct new trials with validated active placebos and compare effect sizes with previous open-label and inadequately blinded studies. Pre-register the analysis plan and publish regardless of results.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-10M (Re-analysis of existing trial data plus new active-placebo-controlled studies)",
      },
      evidence: [
        {
          id: "blinding-break-rates",
          title: "67% of MDMA Trial Participants Correctly Identified Their Treatment Assignment",
          description:
            "Post-trial blinding assessments in the MAPS Phase 3 MDMA-PTSD trial revealed that 67% of participants in the MDMA group and 64% of participants in the placebo group correctly identified their assignment. The dramatic subjective effects of MDMA (euphoria, empathy, sensory enhancement) make true blinding extremely difficult. Critics argue that when two-thirds of participants know they received the active drug, the 'controlled' trial is effectively an open-label study, and the placebo group's lower improvement may reflect 'nocebo' effects (disappointment at receiving placebo) rather than a true drug-placebo difference.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
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
          title: "COMPASS Pathways (For-Profit, NASDAQ-Listed) Funds Largest Psilocybin Trials",
          description:
            "COMPASS Pathways, a for-profit company listed on NASDAQ (market cap ~$500M), funded the largest Phase 2b trial of psilocybin for treatment-resistant depression and is sponsoring Phase 3 trials currently underway. The company holds patents on its psilocybin formulation (COMP360) and therapeutic protocol. CEO George Goldsmith has faced criticism for patenting elements of psilocybin therapy that psychedelic advocates argue should remain in the public domain. The financial incentive to produce positive trial results — and the stock market response to clinical data — creates conflicts of interest similar to those in conventional pharmaceutical development.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "COMPASS Pathways SEC filings; STAT News; The Guardian",
          sourceUrl: "https://www.compasspathways.com/our-research/",
          reasoning:
            "The financial facts (NASDAQ listing, patents, trial funding) are publicly verifiable. The conflict of interest is real but standard in drug development — most FDA-approved drugs are tested in company-funded trials. Directness is moderate because the existence of conflicts does not prove that results are biased; it means they should be scrutinized more carefully and replicated by independent investigators.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Scaling & Access
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
        description:
          "If simplified psychedelic therapy protocols (fewer sessions, group formats, reduced therapist time, or non-hallucinogenic analogs) maintain the therapeutic efficacy of the full protocol at a fraction of the cost and time, scalable psychedelic mental health care is feasible. If the full therapeutic protocol with extensive preparation and integration is essential to the treatment effect, psychedelic therapy will remain a boutique service for the privileged few.",
        methodology:
          "Conduct randomized controlled trials comparing: (1) the full MAPS/Compass protocol, (2) a reduced protocol with fewer preparation/integration sessions, (3) a group-facilitated format with 4-6 patients per therapist, and (4) a pharmacological-only condition (drug without structured therapy). Measure clinical outcomes, cost per remission, and patient satisfaction across all conditions. Also track the development of non-hallucinogenic neuroplasticity drugs that could provide the therapeutic mechanism without the psychedelic experience.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$15-30M (Multi-arm RCT comparing full vs. simplified protocols across multiple sites)",
      },
      evidence: [
        {
          id: "treatment-cost-barrier",
          title: "Supervised Psilocybin Sessions Cost $1,500-$3,500 in Oregon and Colorado",
          description:
            "Oregon's Measure 109 (2020) and Colorado's Proposition 122 (2022) legalized supervised psilocybin use for adults. As of 2025, licensed service centers in Oregon charge $1,500-$3,500 per session, which includes screening, preparation, the 6-8 hour supervised session, and a brief integration meeting. No health insurance covers psilocybin sessions. For comparison, a month of generic SSRI antidepressants costs $10-30. The cost barrier effectively limits legal access to middle- and upper-income individuals, exacerbating mental health treatment inequities.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "Oregon Health Authority; Colorado Department of Regulatory Agencies; NPR",
          sourceUrl: "https://www.oregon.gov/oha/PH/PREVENTIONWELLNESS/Pages/Psilocybin-Services.aspx",
          reasoning:
            "The pricing data from state regulatory agencies is highly reliable and directly relevant to the access question. The comparison with SSRI costs starkly illustrates the scaling challenge. The data directly supports the claim that psychedelic therapy faces significant access barriers.",
        },
        {
          id: "group-psilocybin-pilot",
          title: "Group Psilocybin Therapy Shows Promise in Pilot Studies (2023)",
          description:
            "A pilot study at NYU Langone administered psilocybin to groups of 3-4 cancer patients with psychological distress simultaneously, with one lead therapist and one co-therapist per group. Preliminary results showed clinically meaningful reductions in anxiety and depression comparable to individual psilocybin therapy at prior studies. If group formats prove effective in larger trials, they could reduce the per-patient therapist time by 60-70% and proportionally reduce costs, making the treatment more accessible.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "NYU Langone Health; Psychedelic Medicine",
          sourceUrl: "https://doi.org/10.1089/psymed.2023.0003",
          reasoning:
            "Pilot study evidence is preliminary with small sample sizes and no control group, hence the lower replicability score. However, the finding that group format may preserve efficacy while dramatically reducing costs is important for the scaling question. More rigorous trials with control groups and larger samples are needed to confirm.",
        },
      ],
    },
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
      title: "Psilocybin vs. Escitalopram for Depression — NEJM (2022)",
      url: "https://doi.org/10.1056/NEJMoa2206443",
    },
    {
      title: "Oregon Psilocybin Services — Oregon Health Authority",
      url: "https://www.oregon.gov/oha/PH/PREVENTIONWELLNESS/Pages/Psilocybin-Services.aspx",
    },
    {
      title: "FDA Approval of Esketamine (Spravato) for Treatment-Resistant Depression",
      url: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-nasal-spray-medication-treatment-resistant-depression-available-only-certified",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "How strong is the clinical evidence for psilocybin and MDMA therapy?",
      content:
        "The results are impressive by psychiatric standards: 71% PTSD remission with MDMA, rapid depression remission with psilocybin. But the FDA advisory committee voted 9-2 against MDMA approval, citing blinding failures, expectancy effects, and safety concerns. The evidence is promising but not yet definitive.",
    },
    {
      id: "q2",
      title: "Can psychedelic therapy be safely scaled beyond clinical trials?",
      content:
        "The current treatment model requires 6-8 hour supervised sessions with specially trained therapists at $1,500+ per session. With 13 million PTSD patients and 21 million treatment-resistant depression patients in the US alone, the math does not work without radical protocol simplification, group formats, or pharmacological alternatives to the full psychedelic experience.",
    },
    {
      id: "q3",
      title: "Is the psychedelic industry repeating cannabis's mistakes?",
      content:
        "Over-commercialization, NASDAQ-listed companies patenting ancient practices, regulatory capture by industry, and the gap between therapeutic evidence and recreational legalization all echo the cannabis trajectory. The question is whether the field can maintain scientific rigor while commercial pressures push for rapid expansion.",
    },
  ],
};
