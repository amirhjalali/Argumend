import type { Topic } from "@/lib/schemas/topic";

export const ssriAntidepressantEfficacyData = {
  id: "ssri-antidepressant-efficacy",
  title: "Do Antidepressants Beat Placebo?",
  meta_claim:
    "SSRI antidepressants provide clinically meaningful benefit beyond placebo for depression.",
  status: "contested" as const,
  category: "science" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Antidepressants really do beat placebo — but the average gap is tiny. Pooling the FDA trials, the typical drug-placebo difference is about 1.8 points on the 52-point Hamilton depression scale (a standardized effect of ~0.3), below the 3-point threshold the UK's NICE itself set for clinical significance. The honest twist: that small average hides a real ~15% of patients who get a large, genuinely drug-specific response — so the average understates the drug for some people and overstates it for most.",
    confidence: 88,
    source:
      "Kirsch et al., PLoS Medicine (2008, ~1.8 HRSD points / SMD 0.32 below NICE threshold); Cipriani et al., The Lancet (2018, all 21 drugs > placebo, overall SMD ~0.30); Stone et al., BMJ (2022, ~15% drug-specific responders)",
    sourceUrl:
      "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0050045",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The strongest pro-efficacy case is that the signal is unmistakably real: every one of 21 antidepressants beat placebo in the largest meta-analysis ever assembled (522 trials, 116,477 patients), and patient-level FDA data locate a roughly 15% subgroup who get a large response that placebo cannot explain.",
    "The honest limitation is that the average drug-placebo gap is small — about 1.8 Hamilton points and a 0.3 effect size, below the 3-point bar NICE set for clinical significance — and that gap is partly inflated by side effects breaking the blind and by relapse trials that may be measuring drug withdrawal rather than returning illness.",
    "So the honest debate isn't 'do antidepressants work or not' (on average they beat placebo by a real but modest margin) but 'for whom, and by how much' — whether the right unit of judgment is the small group average or the responder subgroup hidden inside it.",
  ],
  last_updated: "2026-06-16",
  tags: ["psychiatry", "depression", "ssri", "medicine", "placebo"],
  pillars: [
    {
      id: "effect-size",
      title: "Effect Size vs. Clinical Threshold",
      short_summary:
        "Antidepressants beat placebo on average, but the average gap is small — the fight is over whether it clears the bar for clinical meaningfulness.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "When you pool all the trials — including the unflattering unpublished ones the FDA holds — the average drug-placebo gap is roughly 2 points on the 52-point Hamilton scale and a standardized effect size around 0.3, below the ~3-point / 0.5-SMD threshold NICE itself set for clinical significance. Statistical significance in 100,000+ patients is cheap; an effect that small could be clinically trivial for the typical patient, and it shrinks toward zero in all but the most severely depressed.",
      proponent_rebuttal:
        "Every one of 21 antidepressants beat placebo in the largest network meta-analysis ever assembled (522 trials, 116,477 patients), with response odds ratios from 1.37 to 2.13 — not a null result. A pooled average understates a real signal concentrated in a responder subgroup: FDA participant-level data show about 15% of drug-treated patients get a large, drug-specific response that placebo cannot explain. A 3-point cutoff is itself arbitrary, and a small mean improvement spread across millions of people is a large public-health effect.",
      crux: {
        id: "clinical-significance-threshold",
        title: "What Counts as 'Clinically Meaningful'?",
        description:
          "Both sides agree on the numbers: the average drug-placebo difference is real but small (~2 Hamilton points, SMD ~0.3). The disagreement is whether that average — or instead the responder subgroup hidden inside it — is the right thing to judge.",
        methodology:
          "Re-analyze trial data at the patient level rather than by group means: fit response-distribution mixture models to separate a drug-specific responder mode from non-specific/placebo response, and test the average effect against pre-registered, patient-validated thresholds (e.g., minimal clinically important difference anchored to patient-rated improvement).",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (re-analysis of existing FDA trial data)",
        falsification: {
          supporter_flip:
            "If patient-level mixture-model re-analysis failed to find a distinct drug-specific responder mode — i.e., drug improvement was just a uniform rightward shift of the same placebo-response distribution — and the average held below a patient-anchored minimal-important-difference, the 'hidden responders' defense would collapse and the small average would be the whole story.",
          skeptic_flip:
            "A skeptic leaning on the ~2-point average should weigh that group means mathematically blur a subgroup effect: FDA participant-level data (Stone 2022) show ~15% of drug-treated patients hit a 'Large' response (24.5% vs 9.6% on placebo), and a 3-point cutoff is itself an arbitrary line, not a law of nature.",
          common_ground:
            "Both sides accept the raw numbers — the average drug-placebo difference is real, statistically robust, and small (~1.8-2 Hamilton points, SMD ~0.3).",
          live_disagreement:
            "Whether the correct unit of judgment is the group average or a genuinely drug-specific responder subgroup inside it — resolvable by pre-registered, patient-validated response-distribution models tested against a minimal clinically important difference anchored to patient-rated improvement.",
        },
      },
      evidence: [
        {
          id: "cipriani-2018",
          title: "All 21 Antidepressants Beat Placebo",
          description:
            "Network meta-analysis of 522 trials and 116,477 participants found every one of 21 antidepressants more efficacious than placebo for response, with odds ratios from 1.37 (reboxetine) to 2.13 (amitriptyline).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Cipriani et al., 'Comparative efficacy and acceptability of 21 antidepressant drugs...', The Lancet, 2018",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/29477251/",
          reasoning:
            "Largest, most comprehensive meta-analysis on the question, published in a top journal with public data. Directness is high for 'beats placebo' but lower for 'clinically meaningful,' since odds ratios for response don't by themselves settle the effect-size-vs-threshold dispute.",
        },
        {
          id: "stone-2022",
          title: "A ~15% Subgroup Shows a Real Drug-Specific Effect",
          description:
            "Individual-participant analysis of 232 FDA trials (73,388 participants) found response best fit three modes; drug-treated patients were more likely to have a 'Large' response (24.5% vs 9.6%), implying ~15% have a substantial antidepressant effect beyond placebo.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Stone et al., 'Response to acute monotherapy for major depressive disorder...', BMJ, 2022",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9344377/",
          reasoning:
            "Uses the same FDA dataset skeptics cite, but at patient level — strong independence. Supports the meta-claim by locating a genuine drug-specific responder group, though it also confirms most patients' improvement is non-specific, so it is a qualified 'for.'",
        },
        {
          id: "kirsch-2008",
          title: "Average Gap Falls Below the Clinical Threshold",
          description:
            "Meta-analysis of FDA-submitted trials (35 trials, 5,133 patients) found a mean drug-placebo difference of 1.80 Hamilton points and SMD 0.32 — below the NICE-defined criterion (3 points / SMD 0.5). The gap grew with baseline severity but was driven by reduced placebo response, not increased drug response.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Kirsch et al., 'Initial Severity and Antidepressant Benefits...', PLoS Medicine, 2008",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2253608/",
          reasoning:
            "Landmark analysis using unpublished FDA data, directly addressing clinical (not just statistical) significance. High directness. Lower than maximal because the 3-point cutoff is itself contested and a single mean can mask a responder subgroup.",
        },
      ],
    },
    {
      id: "blinding-measurement",
      title: "Blinding and Measurement Artifacts",
      short_summary:
        "Side effects can tip patients off to whether they got the real drug, and noisy multi-item scales may bury the true signal — both could bias the placebo-controlled gap.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "SSRIs cause noticeable side effects (nausea, sexual dysfunction, jitteriness); patients and raters can infer assignment, breaking the blind and inflating the apparent drug effect via expectancy. Active-placebo trials that mimic side effects, and meta-analyses flagging high risk of bias, suggest the small measured gap may be partly an unblinding artifact rather than a pharmacological one.",
      proponent_rebuttal:
        "If the effect were pure unblinding, it should appear on every symptom equally — but it concentrates on the core depressed-mood item, exactly where a real antidepressant should act, and not on unrelated items. Patient-level analyses of 18 trials show consistent SSRI superiority on the single depressed-mood item (effect size ~0.44), and the signal is larger when measured with that focused item than with the noisy 17-item total. A pure expectancy effect would not be symptom-specific, dose-dependent, or rater-validated.",
      crux: {
        id: "depressed-mood-item-test",
        title: "The Symptom-Specificity Test",
        description:
          "If antidepressants merely exploit broken blinding, the drug-placebo gap should be diffuse across all symptoms. If it is real pharmacology, the gap should concentrate on core mood symptoms and track dose. Item-level analysis distinguishes these.",
        methodology:
          "Re-score blinded trial data using single-item (depressed mood) versus full-scale outcomes; test whether the drug-placebo difference is symptom-specific and dose-dependent. Compare against active-placebo trials that reproduce side effects to isolate expectancy from pharmacology.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (item-level re-analysis of existing trials)",
        falsification: {
          supporter_flip:
            "If item-level re-analysis showed the drug-placebo gap was diffuse — spread roughly evenly across unrelated Hamilton items (sleep, weight, anxiety) rather than concentrated on core depressed mood — and active-placebo trials that mimic side effects erased the gap, that would point to broken blinding/expectancy rather than pharmacology, undercutting the efficacy claim.",
          skeptic_flip:
            "A skeptic invoking unblinding should weigh that a pure expectancy effect would not be symptom-specific or dose-dependent: patient-level data from 18 trials (Hieronymus 2016) show SSRI superiority concentrated on the single depressed-mood item (effect ~0.44), exactly where a real antidepressant should act and larger than the noisy full-scale signal.",
          common_ground:
            "Both sides agree SSRIs produce noticeable side effects that can compromise the blind, and that the standard 17-item Hamilton total is a noisy outcome measure.",
          live_disagreement:
            "Whether the measured gap is symptom-specific pharmacology or an unblinding artifact — resolvable by testing item-specificity and dose-dependence against active-placebo trials that reproduce side effects without the drug's mechanism.",
        },
      },
      evidence: [
        {
          id: "hieronymus-2016",
          title: "Effect Concentrates on Core Depressed-Mood Item",
          description:
            "Patient-level analysis of 18 placebo-controlled SSRI trials (6,669 patients) found consistent SSRI superiority on the single 'depressed mood' Hamilton item (effect size ~0.44) — a more sensitive signal than the full-scale sum, consistent with a symptom-specific pharmacological effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "Hieronymus et al., 'Consistent superiority of SSRIs over placebo in reducing depressed mood...', Molecular Psychiatry, 2016",
          sourceUrl: "https://www.nature.com/articles/mp201553",
          reasoning:
            "Directly rebuts the unblinding/measurement critique by showing symptom specificity, but it is a post-hoc reanalysis by authors known for pro-efficacy positions (lower independence), and choosing one item as the outcome is itself a contested analytic choice.",
        },
        {
          id: "jakobsen-2017",
          title: "Small Benefit, High Bias, Real Harms",
          description:
            "Systematic review of SSRI-vs-placebo trials found a mean reduction of 1.94 Hamilton points — below the authors' 3-point clinical-significance threshold — with all trials at high risk of bias, and a significantly increased risk of serious adverse events (OR 1.37).",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "Jakobsen et al., 'Selective serotonin reuptake inhibitors versus placebo...', BMC Psychiatry, 2017",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5299662",
          reasoning:
            "Peer-reviewed systematic review with trial-sequential analysis directly addressing clinical significance and bias. Authors have a known skeptical stance and the harm/benefit framing is interpretive, so independence and reliability are moderate rather than top.",
        },
      ],
    },
    {
      id: "real-world-durability",
      title: "Real-World Effectiveness and Relapse",
      short_summary:
        "Beyond 8-week trials: do antidepressants keep depression from coming back, and how well do they work for ordinary patients?",
      icon_name: "Users" as const,
      skeptic_premise:
        "Real-world outcomes are far weaker than headline trial numbers suggest: a RIAT reanalysis of the flagship STAR*D effectiveness study found its celebrated 67% cumulative-remission figure shrinks to roughly 35% once the trial's own prespecified protocol is followed. And relapse-prevention trials that withdraw responders to placebo are confounded by withdrawal effects — patients abruptly taken off the drug suffer discontinuation symptoms that masquerade as relapse, inflating the apparent benefit of staying on.",
      proponent_rebuttal:
        "Continuing antidepressants in responders cuts relapse from ~41% to ~18% across 31 randomized trials — a roughly 70% reduction in relapse odds that holds across treatment durations and baseline risk. Even a reappraised STAR*D remission around 35% over four sequential steps is a meaningful real-world result for a hard-to-treat, comorbid population, and remission rises with each additional step rather than collapsing to placebo levels.",
      crux: {
        id: "withdrawal-vs-relapse",
        title: "Withdrawal Effect vs. True Relapse",
        description:
          "Discontinuation trials switch stabilized patients to placebo and count later depression as 'relapse.' If much of that is drug-withdrawal symptoms rather than the original illness returning, the maintenance benefit is overstated. Disentangling the two is the load-bearing question.",
        methodology:
          "Compare relapse rates under abrupt switch-to-placebo versus slow taper, and against patients never started on the drug; track symptom timing and type to separate withdrawal phenomena from genuine recurrence of depression. Use blinded gradual-discontinuation designs.",
        verification_status: "verified" as const,
        cost_to_verify: "$5M (randomized taper-vs-maintenance trial)",
        falsification: {
          supporter_flip:
            "If a slow-taper, blinded discontinuation trial showed that gradually withdrawn patients relapsed at nearly the same elevated rate as abruptly switched ones — with relapses being genuine returns of depression by timing and symptom profile, not withdrawal syndromes — then the maintenance benefit would be confirmed rather than inflated, and the withdrawal-confound objection would lose force.",
          skeptic_flip:
            "A skeptic citing the large ~41%-to-18% relapse gap (Geddes 2003) should weigh that abrupt switch-to-placebo designs can manufacture discontinuation symptoms that get coded as 'relapse,' and that the review's own authors warn these symptoms could unblind patients and bias results toward the active drug.",
          common_ground:
            "Both sides agree that staying on an antidepressant is associated with lower measured relapse, and that stopping abruptly can trigger discontinuation symptoms.",
          live_disagreement:
            "How much of the maintenance 'benefit' is true relapse prevention versus avoided drug-withdrawal symptoms — resolvable by comparing slow-taper vs abrupt-switch vs never-treated arms while tracking symptom timing and type in a blinded gradual-discontinuation trial.",
        },
      },
      evidence: [
        {
          id: "geddes-2003",
          title: "Continued Treatment Cuts Relapse Sharply",
          description:
            "Systematic review of 31 randomized trials (4,410 patients) found that continuing antidepressants reduced relapse from an average 41% on placebo to 18% on active drug — about a 70% reduction in relapse odds, largely independent of treatment duration or baseline risk.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Geddes et al., 'Relapse prevention with antidepressant drug treatment in depressive disorders: a systematic review', The Lancet, 2003",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/12606176/",
          reasoning:
            "Large, well-conducted review showing a durable benefit beyond acute trials. Directness is held down because the review itself warns that discontinuation symptoms could unblind patients and bias results toward the active drug — the exact confound the crux targets.",
        },
        {
          id: "stard-reappraisal-2024",
          title: "Real-World Remission Far Below the Famous 67%",
          description:
            "A RIAT patient-level reanalysis of the NIMH STAR*D effectiveness trial found that the original 67% cumulative-remission figure depended on protocol violations (non-blinded assessments and counting patients already in remission at baseline); applying the trial's prespecified protocol yields a cumulative remission rate of 35.0% after up to four sequential treatment steps — roughly half the published figure.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Pigott, Kim, Xu, Kirsch & Amsterdam, 'What are the treatment remission, response and extent of improvement rates after up to four trials of antidepressant therapies in real-world depressed patients? A reanalysis of the STAR*D study's patient-level data with fidelity to the original research protocol', BMJ Open, 2023;13(7):e063095",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/37491091/",
          reasoning:
            "Peer-reviewed RIAT reanalysis of the canonical real-world effectiveness trial using NIMH patient-level data, undercutting overstated effectiveness claims. The original STAR*D investigators dispute it (AJP reply, 2023), so it is contested rather than settled. Directness to the placebo-controlled meta-claim is also limited because STAR*D had no placebo arm — it bears on real-world remission magnitude, not the drug-vs-placebo gap itself.",
        },
      ],
    },
  ],
};
