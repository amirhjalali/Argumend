import type { Topic } from "@/lib/schemas/topic";

export const facialRecognitionPolicingData = {
  id: "facial-recognition-policing",
  title: "Facial Recognition in Policing",
  meta_claim:
    "Police use of facial-recognition technology does more harm than good and should be restricted.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Almost every documented wrongful arrest from facial recognition — at least 14 in the US, most of them Black people — happened because police treated a software 'match' as proof and skipped basic follow-up, not because the algorithm was uniquely broken. The counterintuitive part: when the UK's national metrology lab tested the Met Police's live system, at the operating threshold (0.6+) there was no statistically significant difference in false positives across race or sex — but that demographic gap reappeared as soon as the threshold was lowered.",
    confidence: 86,
    source:
      "ACLU, 'More than a Dozen Wrongful Arrests Due to Police Reliance on Facial Recognition Technology' (2026); National Physical Laboratory, 'Facial Recognition Technology in Law Enforcement: Equitability Study' (NPL Report MS 43, March 2023); NIST FRVT Part 3 (NISTIR 8280, 2019)",
    sourceUrl:
      "https://science.police.uk/site/assets/files/3396/frt-equitability-study_mar2023.pdf",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The strongest case for restriction is concrete, not hypothetical: at least 14 Americans — most of them Black — have been wrongfully arrested after a facial-recognition match, some jailed for days (one for ten days, another for six months) and one a woman eight months pregnant, and federal auditors found agencies ran roughly 60,000 searches with no training and, for some, no civil-rights policy at all.",
    "The honest counterpoint is that the most accurate modern systems, tested on the exact algorithm and threshold an agency deploys, can show no statistically significant demographic gap — the Met's live system ran at a false-positive rate near 0.017% (about 1 in 6,000) — and in every known wrongful arrest the failure was police treating a 'lead' as 'proof,' not the algorithm itself.",
    "So the honest debate isn't 'is facial recognition racist or accurate' but 'can enforceable guardrails — threshold floors, mandatory corroboration, disclosure to defendants, and audits — actually be made to stick in practice, or do agencies deploy the tool faster than oversight can govern it.'",
  ],
  last_updated: "2026-06-16",
  tags: [
    "facial-recognition",
    "policing",
    "surveillance",
    "civil-liberties",
    "ai-bias",
  ],
  pillars: [
    {
      id: "accuracy-and-bias",
      title: "Accuracy & Demographic Bias",
      short_summary:
        "Older and mid-tier algorithms misidentify people of color far more often, but the most accurate modern algorithms have shrunk that gap toward statistical insignificance at operational thresholds.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Government testing shows facial recognition is not demographically neutral. NIST's landmark 2019 evaluation of 189 algorithms found that, for one-to-one matching, many algorithms produced false positives 10 to 100 times more often for Asian and African American faces than for white faces; for one-to-many matching (the mode used to scan mugshot databases for suspects), the highest false-positive rates were for African American women — precisely the error mode that can put an innocent person on a suspect list. When a biased tool is pointed disproportionately at over-policed communities, it systematizes and launders discrimination behind a veneer of mathematical objectivity.",
      proponent_rebuttal:
        "The bias is real but largely an artifact of weak algorithms and bad operating thresholds — though it is not automatically cured by accuracy gains. Overall recognition error fell roughly threefold from 2020 to 2025, yet the FAS analysis warns that improving accuracy shrinks absolute demographic gaps without reliably erasing relative disparities, and that some vendors reduce bias while others do not. What settles the operational question is system- and threshold-specific testing: when the UK's National Physical Laboratory independently tested the Metropolitan Police's live system, it found that at the operational match threshold (0.6 and above) there was no statistically significant difference in false-positive identification across race or gender, with a false-positive rate around 0.017%. The fix is procurement standards, threshold floors, per-system equitability testing, and audits — not a blanket ban that also forecloses the well-configured systems.",
      crux: {
        id: "operational-bias-test",
        title: "The Operational-Threshold Bias Test",
        description:
          "Whether facial recognition is unacceptably biased is not answerable in the abstract: it depends entirely on which algorithm is deployed and at what confidence threshold. A controlled demographic differential test on the exact system and settings an agency uses in the field settles it.",
        methodology:
          "Take the specific algorithm and match threshold an agency deploys. Run a demographic-balanced benchmark (NIST FRTE-style) measuring false match rate (FMR) and false non-match rate (FNMR) separately for each race/sex group. Test whether inter-group FMR differences are statistically significant at the operating threshold, and re-run at lower thresholds to map where parity breaks down.",
        verification_status: "verified" as const,
        cost_to_verify: "$250K (independent demographic benchmark per system)",
        falsification: {
          supporter_flip:
            "A supporter of the bias claim should update if independent, system- and threshold-specific testing (NPL-style) repeatedly showed that the algorithms agencies actually deploy, at their operating thresholds, produce no statistically significant demographic differential in false matches — meaning the bias is an artifact of weak legacy algorithms and bad settings, not the technology as fielded today.",
          skeptic_flip:
            "A skeptic relying on the best-case NPL result should weigh that NIST's 8280 study found 10–100× higher false positives for Asian and African American faces in older algorithms, that the FAS analysis shows accuracy gains shrink absolute gaps without reliably erasing relative ones, and that 'best algorithm at the right threshold' is not what every agency buys or how every vendor configures its system.",
          common_ground:
            "Both sides agree that demographic bias is real in many algorithms, that it depends heavily on the specific algorithm and confidence threshold, and that bias re-emerges at lower thresholds even in systems judged equitable at their operating threshold.",
          live_disagreement:
            "Whether the systems actually deployed in the field, at their real operating thresholds, are demographically equitable — which only mandatory, independent, per-system demographic benchmarking (FMR/FNMR by race and sex at the deployed threshold) can settle, rather than reasoning from either the worst legacy algorithm or the single best-tested one.",
        },
      },
      evidence: [
        {
          id: "nist-8280-bias",
          title: "NIST Found 10-100x Higher False Positives for Faces of Color",
          description:
            "NIST's FRVT Part 3: Demographic Effects (NISTIR 8280, 2019) evaluated 189 algorithms and found false-positive rates 10 to 100 times higher for Asian and African American faces than white faces in one-to-one matching; in one-to-many matching the highest false positives were for African American women — the error most likely to generate a false suspect.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 8,
          },
          source:
            "NIST, Face Recognition Vendor Test (FRVT) Part 3: Demographic Effects, NISTIR 8280 (Grother, Ngan, Hanaoka, Dec 2019)",
          sourceUrl:
            "https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software",
          reasoning:
            "Authoritative, independent US government benchmark across nearly all major vendors with published, reproducible methodology. Directly documents the demographic error mode that underlies harm claims. Slight directness discount because the finding describes algorithm-level error, not real-world arrest outcomes, and the same report notes the best algorithms had far smaller differentials.",
        },
        {
          id: "npl-met-equitability",
          title: "Independent Lab Found No Significant Bias at Operational Threshold",
          description:
            "The UK National Physical Laboratory's 2023 equitability study of the Met Police's live facial-recognition system found that at the operating threshold (0.6+) there was no statistically significant difference in false-positive identification by race or sex, with a false-positive identification rate around 0.017% (roughly 1 in 6,000 passers-by). Demographic imbalance only emerged at lower, non-operational thresholds.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "National Physical Laboratory, 'Facial Recognition Technology in Law Enforcement: Equitability Study' (NPL Report MS 43, March 2023), for the Metropolitan Police / South Wales Police",
          sourceUrl:
            "https://science.police.uk/site/assets/files/3396/frt-equitability-study_mar2023.pdf",
          reasoning:
            "Independent national-metrology-lab study of a specific fielded system, corroborated by the Met, the Greater London Authority, and multiple outlets. Replicability discounted because results are threshold- and system-specific (the same study shows bias re-emerges below 0.6), so it defends only well-configured deployments, not facial recognition generally.",
        },
        {
          id: "nist-accuracy-gains",
          title: "Best Algorithms Are Near-Perfect, but Accuracy Gains Don't Erase Bias",
          description:
            "Ongoing NIST testing shows recognition error fell roughly threefold from 2020 to 2025, with the top mugshot-identification algorithm reaching a ~0.13% false-negative rate. But the FAS analysis cautions that these accuracy gains do not reliably reduce demographic bias: as overall error falls the absolute disparity between groups may shrink while the relative disparity persists, and across vendors bias reduction is uneven — some companies have lowered both absolute and relative bias while others have not, or have grown more biased.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "NIST Face Recognition Technology Evaluation (FRTE/FRVT) ongoing reports; summarized in Federation of American Scientists, 'Face Recognition Performance, Bias, and the Limits of Technical Fixes' (Jacobs & Stephenson, 2026)",
          sourceUrl: "https://fas.org/publication/face-recognition-bias/",
          reasoning:
            "Reflects real, independently measured accuracy gains in lab conditions. Directness is discounted because laboratory accuracy on clean gallery images overstates performance on the low-quality probe images (CCTV, partial faces) typical of investigations, and 'best algorithm' results do not describe what every agency actually buys and runs.",
        },
      ],
    },
    {
      id: "real-world-harm",
      title: "Real-World Wrongful Arrests",
      short_summary:
        "At least 14 documented wrongful arrests — mostly of Black people — trace to facial-recognition matches, almost always where investigators treated a match as proof rather than a lead.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The concrete harm is no longer hypothetical. The ACLU has documented at least 14 people wrongfully arrested in the US after a facial-recognition match, the majority of them Black; several were jailed for days, including a woman who was eight months pregnant. Investigators repeatedly treated the algorithm's 'possible match' as confirmation and skipped basic follow-up — the misidentified people were sometimes inches taller, heavier, or visibly different from the suspect. Georgetown Law calls it 'a forensic without the science': an unvalidated identification method whose output is used as probable cause despite policies that say it should only be a lead.",
      proponent_rebuttal:
        "Every documented wrongful arrest is a failure of police procedure, not proof the technology should be banned. In each case officers violated the near-universal rule that a match is an investigative lead requiring independent corroboration — they arrested on the match alone. The technology also clears and exonerates: it generates leads in robberies, assaults, child-exploitation, and cold cases that traditional methods miss. The corrective is enforceable safeguards — mandatory disclosure, human verification, corroboration requirements, and a ban on arrests based on a match alone — which target the actual cause of harm without discarding a tool that solves real crimes.",
      crux: {
        id: "sole-basis-test",
        title: "The Sole-Basis Test",
        description:
          "The load-bearing disagreement is procedural, not technical: nearly all documented harm occurred when a match was used as the sole or primary basis for arrest. If matches are reliably confined to leads that require independent corroboration, the wrongful-arrest harm largely disappears; if that rule is routinely ignored in practice, restriction is justified.",
        methodology:
          "Audit a representative sample of facial-recognition-assisted arrests. For each, determine whether independent, non-FRT evidence established probable cause before arrest, or whether the match itself was the basis. Measure the corroboration-compliance rate and correlate non-compliance with wrongful-arrest and exoneration outcomes.",
        verification_status: "verified" as const,
        cost_to_verify: "$300K (multi-jurisdiction case-file audit)",
        falsification: {
          supporter_flip:
            "A supporter of restriction should update if a representative case-file audit found that wrongful arrests persist even where the match was confined to a lead and independent probable cause was established before arrest — meaning the harm is intrinsic to the tool rather than a procedural failure that corroboration rules can fix.",
          skeptic_flip:
            "A skeptic who blames only bad procedure should weigh that the same audit might show corroboration rules are routinely ignored in practice — that 'a match is just a lead' is policy on paper while officers arrest on the match alone — in which case the procedural fix is illusory and the practical effect is indistinguishable from arresting on the algorithm.",
          common_ground:
            "Both sides agree that in every documented US wrongful arrest the match was treated as the sole or primary basis and basic follow-up was skipped, and that a match should function as an investigative lead requiring independent corroboration, never as proof.",
          live_disagreement:
            "Whether a binding 'no arrest on a match alone' rule is actually followed in the field — the empirical corroboration-compliance rate and its correlation with wrongful-arrest and exoneration outcomes — which only a multi-jurisdiction audit of FRT-assisted arrest case files can measure.",
        },
      },
      evidence: [
        {
          id: "aclu-wrongful-arrests",
          title: "At Least 14 Documented Wrongful Arrests, Mostly of Black People",
          description:
            "The ACLU documents at least 14 people wrongfully arrested in the US after facial-recognition misidentification (including Robert Williams, Nijeer Parks, Porcha Woodruff, and Randal Reid). Most were Black; several were detained for hours or days. In the known cases, police failed to do follow-up investigation that would have ruled the person out.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 9,
          },
          source:
            "ACLU, 'More than a Dozen Wrongful Arrests Due to Police Reliance on Facial Recognition Technology' (2025); individual cases corroborated by NPR, ABC News, and lawsuits/settlements (e.g. Williams v. City of Detroit)",
          sourceUrl:
            "https://www.aclu.org/news/privacy-technology/more-than-a-dozen-wrongful-arrests-due-to-police-reliance-on-facial-recognition-technology",
          reasoning:
            "Directly demonstrates the harm at issue, and the underlying cases are independently reported and litigated. Source-reliability and independence are discounted because the ACLU is an advocacy organization with a stated position, and the count is a floor that depends on undisclosed cases; the directness is high because these are concrete, named, corroborated wrongful arrests.",
        },
        {
          id: "georgetown-forensic",
          title: "Georgetown Law: 'A Forensic Without the Science'",
          description:
            "Georgetown Law's Center on Privacy & Technology argues facial recognition is an unvalidated identification method whose algorithmic and human steps can compound each other's errors, yet it is used as probable cause to arrest despite policies that nominally restrict it to leads — and the true number of such arrests is unknown due to non-disclosure.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source:
            "Clare Garvie, 'A Forensic Without the Science: Face Recognition in U.S. Criminal Investigations,' Georgetown Law Center on Privacy & Technology (2022)",
          sourceUrl:
            "https://www.law.georgetown.edu/privacy-technology-center/publications/a-forensic-without-the-science-face-recognition-in-u-s-criminal-investigations/",
          reasoning:
            "A rigorous legal-technical analysis from a leading research center, directly addressing the lead-vs-proof gap that drives wrongful arrests. Weights are moderate because it is an advocacy-aligned report rather than a peer-reviewed study or controlled dataset, and its central claim about prevalence is acknowledged to be unquantified.",
        },
        {
          id: "met-arrests-utility",
          title: "Live Facial Recognition Produced 2,100+ Arrests in the UK",
          description:
            "The Metropolitan Police reports more than 2,100 arrests since the start of 2024 from live facial recognition, with about 24% for violence against women and girls and over 100 registered sex offenders apprehended, while stating that in one year ~3 million faces were scanned with only 12 false alerts, none leading to arrest.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 7,
          },
          source:
            "Metropolitan Police news release, 'Met wins judicial review over use of Live Facial Recognition' (2025), with figures reported by the BBC and The Register",
          sourceUrl:
            "https://news.met.police.uk/news/met-wins-judicial-review-over-use-of-live-facial-recognition-508486",
          reasoning:
            "Demonstrates concrete public-safety output (including hard-to-solve VAWG and sex-offender cases). Independence is low because the figures are self-reported by the deploying agency and not independently audited, and 'arrests' are not the same as convictions; the false-alert claim, however, is consistent with the independent NPL testing.",
        },
      ],
    },
    {
      id: "governance-oversight",
      title: "Governance & Oversight",
      short_summary:
        "Federal auditors found tens of thousands of facial-recognition searches run with no training and no civil-rights policies — a governance vacuum that 'restrict' advocates cite and 'reform' advocates say is fixable.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Even a perfectly accurate tool is dangerous without guardrails, and the guardrails are largely absent. The US Government Accountability Office found that seven DHS and DOJ law-enforcement agencies used facial-recognition services with no training requirements — cumulatively running about 60,000 searches before any training was mandated — and that four of the seven had no policy specifically protecting civil rights and civil liberties. Combined with police seldom disclosing FRT use to defendants, this is unaccountable surveillance infrastructure deployed faster than democratic oversight can govern it, which is itself a strong reason to restrict until oversight catches up.",
      proponent_rebuttal:
        "A governance gap is an argument for governance, not abolition. The GAO did not find the tool ineffective — it found agencies adopted it without the training, policies, and disclosure rules that any powerful investigative tool requires, and it issued ten recommendations the agencies accepted. Jurisdictions are already closing the gap: states like Virginia and California now bar a facial-recognition match from being the sole basis for an arrest or warrant affidavit, while still permitting corroborated leads. Targeted regulation captures the benefits and curbs the harms, which is precisely what restriction-by-statute (as opposed to a ban) looks like in practice.",
      crux: {
        id: "oversight-sufficiency",
        title: "The Oversight-Sufficiency Test",
        description:
          "The decisive question is whether enforceable safeguards — mandatory training, civil-rights policies, defendant disclosure, corroboration requirements, and audit — can be implemented and actually followed. If they can and are, harm is contained; if agencies routinely deploy without them and ignore them in practice, the case for hard restriction strengthens.",
        methodology:
          "Compare jurisdictions with binding FRT statutes (e.g. mandatory disclosure, sole-basis bans, training mandates) against those without. Measure compliance rates, disclosure-to-defendant rates, and wrongful-arrest incidence before and after the rules take effect.",
        verification_status: "verified" as const,
        cost_to_verify: "$150K (comparative policy and records analysis)",
        falsification: {
          supporter_flip:
            "A supporter of regulation-not-ban should update if comparative analysis showed that jurisdictions with binding FRT statutes (sole-basis bans, mandatory training, disclosure) had no better disclosure-to-defendant rates, compliance, or wrongful-arrest incidence than those without — meaning the safeguards are unenforceable on paper and a harder restriction is the only thing that actually constrains use.",
          skeptic_flip:
            "A skeptic favoring hard restriction should weigh that the GAO did not find the tool ineffective but found an absence of training and policy that agencies accepted recommendations to fix, and that states like Virginia and California already bar match-only arrests while preserving corroborated leads — so a workable middle path demonstrably exists, even if its effectiveness is not yet measured.",
          common_ground:
            "Both sides agree the technology was deployed far faster than oversight could govern it — ~60,000 federal searches before any training mandate, four of seven agencies lacking civil-rights policies — and that enforceable safeguards (training, disclosure, corroboration, audit) are necessary.",
          live_disagreement:
            "Whether such safeguards, once enacted, are actually implemented and obeyed — measured by compliance rates, disclosure-to-defendant rates, and wrongful-arrest incidence before versus after the rules take effect, and benchmarked against jurisdictions without them — which a comparative policy-and-records study can resolve.",
        },
      },
      evidence: [
        {
          id: "gao-training-gap",
          title: "GAO: ~60,000 Federal Searches Run Without Training or Policy",
          description:
            "GAO found that seven DHS and DOJ law-enforcement agencies used facial-recognition services without requiring staff training (only two had such requirements by April 2023), cumulatively conducting about 60,000 searches before training was in place, and that four of the seven lacked policies specifically protecting civil rights and civil liberties.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "U.S. GAO, 'Facial Recognition Services: Federal Law Enforcement Agencies Should Take Actions to Implement Training, and Policies for Civil Liberties,' GAO-23-105607 (Sept 2023)",
          sourceUrl: "https://www.gao.gov/products/gao-23-105607",
          reasoning:
            "Authoritative, independent federal audit documenting a concrete oversight vacuum. Directness is discounted because a lack of training/policy is a process risk rather than a measured harm outcome, and the same facts are cited by reform advocates as fixable; the underlying recommendations were accepted by the agencies.",
        },
        {
          id: "state-sole-basis-laws",
          title: "States Now Bar Match-Only Arrests While Allowing Corroborated Leads",
          description:
            "Several states have enacted targeted limits rather than bans. Virginia's facial-recognition statute (in force through June 30, 2026) provides that a match shall not be included in an affidavit to establish probable cause for an arrest or search warrant; a revised version effective July 1, 2026 instead requires deployments to be expressly authorized by statute. California separately prohibits using a facial-recognition match as the sole basis for an arrest, search, or warrant affidavit — preserving the tool as a corroborated lead.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "Code of Virginia § 15.2-1723.2 (facial recognition technology; approval and use limits); California Penal Code provisions on facial recognition as sole basis",
          sourceUrl:
            "https://law.lis.virginia.gov/vacode/title15.2/chapter17/section15.2-1723.2/",
          reasoning:
            "Primary statutory text showing that 'restriction' can mean calibrated regulation that keeps corroborated use legal — undercutting the claim that the only options are ban or unfettered use. Independence is moderate because Virginia's affidavit restriction is being narrowed as of July 1, 2026, so it partly illustrates regulatory instability; directness is moderate because it demonstrates the existence of a middle path rather than measuring its effectiveness, which remains to be evaluated.",
        },
      ],
    },
  ],
};

