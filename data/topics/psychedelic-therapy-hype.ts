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
        "The clinical evidence for psychedelic therapy, while promising, is far weaker than media coverage suggests. The MAPS Phase 3 MDMA-PTSD trial, which found that 71% of participants no longer met PTSD diagnostic criteria, has been criticized for methodological limitations: the blinding was effectively broken (67% of participants correctly guessed their assignment due to MDMA's obvious subjective effects), the therapy condition included extensive preparatory and integration sessions that make it impossible to separate drug effects from therapy effects, and the study excluded patients with suicidality, psychosis risk, and substance use disorders — the very populations most in need of new treatments. The FDA's advisory committee voted against MDMA approval in June 2024, citing these concerns. Psilocybin depression trials have similar blinding problems and, in the strongest head-to-head test (psilocybin vs. escitalopram, Carhart-Harris 2021, n=59), the primary endpoint was NOT statistically significant; COMPASS's larger trials report only modest placebo-adjusted effects and short controlled follow-up. The effect sizes, while large in percentage terms, may be substantially inflated by expectancy effects in unblinded participants.",
      proponent_rebuttal:
        "The blinding criticism, while technically valid, proves too much — it would also invalidate trials of any psychoactive substance with obvious subjective effects, including many approved antidepressants, anxiolytics, and pain medications. The relevant question is not whether participants knew they received the drug but whether the clinical improvement is real and durable. Pooled MDMA Phase 2 data showed PTSD symptom reduction persisting at long-term follow-up, beyond what brief expectancy would easily predict, and open-label psilocybin work at Johns Hopkins reported antidepressant effects sustained to 12 months (though uncontrolled). Most importantly, COMPASS's two Phase 3 psilocybin trials (2025-2026) met their pre-specified primary MADRS endpoints against placebo (p<0.001) — a result that, unlike open-label follow-up, comes from controlled designs. The FDA granted 'breakthrough therapy' designation to both psilocybin (Compass Pathways) and MDMA (MAPS) — a designation reserved for drugs showing substantial preliminary improvement over available therapies. Ketamine, already FDA-approved as esketamine (Spravato) for treatment-resistant depression, provides proof-of-concept that psychedelic-mechanism drugs can survive regulatory scrutiny. The bar should not be perfection but whether these therapies offer meaningful benefit to patients who have exhausted conventional options.",
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
            "The confirmatory Phase 3 'MAPP2' trial of MDMA-assisted therapy for moderate-to-severe PTSD (sponsored by MAPS PBC, now Lykos) found that 71.2% of participants in the MDMA group no longer met diagnostic criteria for PTSD after three sessions, compared to 47.6% in the placebo-plus-therapy group. The between-group effect size on the primary CAPS-5 outcome was Cohen's d = 0.7 (medium-to-large) — note this is smaller than the d≈0.91 reported in the earlier MAPP1 trial, with which it is often confused. Participants had chronic PTSD and had typically failed previous treatments. Results were published in Nature Medicine (2023). This evidence later failed to win FDA advisory-committee or FDA support (see the 'against' item).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 5,
            directness: 9,
          },
          source: "Nature Medicine (2023); MAPS PBC / Lykos Therapeutics (sponsor)",
          sourceUrl: "https://doi.org/10.1038/s41591-023-02565-4",
          reasoning:
            "Published in Nature Medicine, a top-tier journal, and the population (chronic treatment-resistant PTSD) is clinically important. But this is sponsor-generated, advocacy-aligned evidence whose internal validity was seriously challenged: the FDA advisory committee voted overwhelmingly against it, ICER's independent review flagged functional unblinding (nearly all MDMA recipients knew their arm), selection bias, undisclosed harms, and therapist-conduct problems, and related MDMA papers were later retracted for unethical conduct. Independence is scored low because the sponsor is also a psychedelic-advocacy organization. Replicability is downgraded because the FDA's Complete Response Letter requires an additional independent Phase 3. The high placebo-plus-therapy response rate (47.6%) further compresses the true drug-attributable signal.",
        },
        {
          id: "fda-advisory-committee-rejection",
          title: "FDA Advisory Committee Votes Against MDMA Approval (June 2024)",
          description:
            "On June 4, 2024, the FDA's Psychopharmacologic Drugs Advisory Committee (PDAC) reviewed Lykos Therapeutics' new drug application (NDA 215455) for midomafetamine (MDMA) capsules for PTSD. The committee voted 2-9 that available data did NOT show the treatment to be effective, and 1-10 that the benefits did NOT outweigh the risks, citing study design flaws (inadequate blinding / functional unblinding), potential for abuse, missing safety data, and difficulty distinguishing drug effects from therapy effects. The therapy-heavy protocol (preparatory sessions, three ~8-hour drug sessions, and integration sessions) also raised scalability concerns. The FDA subsequently issued a Complete Response Letter (CRL) in August 2024 declining to approve the application and requesting an additional Phase 3 trial.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "FDA Psychopharmacologic Drugs Advisory Committee, Final Summary Minutes (June 4, 2024)",
          sourceUrl: "https://www.fda.gov/media/180463/download",
          reasoning:
            "The FDA advisory committee is the most authoritative independent body for evaluating drug evidence. The lopsided votes (2-9 against efficacy, 1-10 against benefit-risk), followed by the FDA's August 2024 Complete Response Letter, are a strong signal of significant evidentiary concerns. The committee's independence is beyond question. This directly challenges the claim that psychedelic therapy has achieved clinical validation sufficient for approval.",
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
          source: "Janssen Pharmaceuticals press release (FDA approval, March 5, 2019)",
          sourceUrl: "https://www.jnj.com/media-center/press-releases/janssen-announces-u-s-fda-approval-of-spravatotm-esketamine-ciii-nasal-spray-for-adults-with-treatment-resistant-depression-trd-who-have-cycled-through-multiple-treatments-without-relief",
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
    {
      title: "FDA Approval of Esketamine (Spravato) for Treatment-Resistant Depression — Janssen (2019)",
      url: "https://www.jnj.com/media-center/press-releases/janssen-announces-u-s-fda-approval-of-spravatotm-esketamine-ciii-nasal-spray-for-adults-with-treatment-resistant-depression-trd-who-have-cycled-through-multiple-treatments-without-relief",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "How strong is the clinical evidence for psilocybin and MDMA therapy?",
      content:
        "The headline numbers look strong (71% of MDMA participants no longer met PTSD criteria; COMPASS's two Phase 3 psilocybin trials met their primary endpoints). But the picture is more contested on close reading: the FDA advisory committee voted against MDMA (2-9 that it was not effective, 1-10 that benefits did not outweigh risks) and the FDA issued a Complete Response Letter in August 2024 citing functional unblinding, expectancy effects, and safety/data-integrity concerns; the only psilocybin trial with an active comparator (vs escitalopram, 2021) missed its primary endpoint; and the Phase 3 psilocybin effect sizes were modest (~3.6-3.8 MADRS points). The evidence is genuinely promising in places but not yet definitive, and the strongest-sounding claims rest on sponsor-funded or uncontrolled data.",
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
