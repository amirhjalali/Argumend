export const ssriAntidepressantEfficacyData = {
  id: "ssri-antidepressant-efficacy",
  title: "Do Antidepressants Really Work?",
  question: "Do antidepressants really work better than a placebo?",
  meta_claim:
    "SSRIs and other antidepressants give people with depression a benefit beyond placebo that is large enough to matter, and staying on them protects against relapse.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: on 4 May 2026 HHS launched a push to help
  // patients taper off psychiatric drugs (a SAMHSA "Dear Colleague" letter,
  // training, a deprescribing expert panel and CMS billing guidance). The
  // newest large reviews are Kalfas et al., JAMA Psychiatry (2025), on
  // discontinuation symptoms, and Pillinger et al., The Lancet (2025), on
  // physical side effects.
  last_updated: "2026-11-03",
  tags: ["psychiatry", "depression", "ssri", "medicine", "placebo"],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "About one American adult in eight takes an antidepressant. On 4 May 2026 Health Secretary Robert F. Kennedy Jr. launched a federal push to help patients taper off psychiatric drugs, describing a 'dependency crisis driven by overmedicalization.' In the trials drug companies sent the FDA, people on the drug ended up about 1.8 points better than people on placebo, on a 52-point depression scale. The fight is over whether a gap that size matters, for whom, and what happens when people stop.",
    confidence: 88,
    source:
      "NCHS Data Brief No. 377 (13.2% of adults, 2015-2018); NPR, 'Psychiatrists say RFK Jr.'s take on SSRIs is an oversimplification of the problem' (7 May 2026); Kirsch et al., PLoS Medicine (2008)",
    sourceUrl:
      "https://www.kpcw.org/npr-news/2026-05-07/psychiatrists-say-rfk-jr-s-take-on-ssris-is-an-oversimplification-of-the-problem",
  },
  simple_case: [
    "The answer bears on what a doctor offers someone with depression, whether millions of long-term users should try to come off, and how they should do it.",
    "Most of the trials behind the numbers ran about eight weeks. The decision many users face is whether to stay on for years.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: How big is the benefit? (what the trials show)
    // =========================================================================
    {
      id: "effect-size",
      title: "How Big Is the Benefit?",
      short_summary:
        "Every major review finds antidepressants beat placebo. The average gap is small: about 2 points on a 52-point scale, below the 3 points England's NICE once set as the bar for a clinically meaningful difference. The split is whether that average is the right thing to judge, or hides a group who respond strongly.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Put every trial on the table, including the unflattering ones drug companies sent the FDA but never published, and the drug beats placebo by about 1.8 points on the 52-point Hamilton depression scale. That is an effect size of about 0.3. NICE once set the bar for a clinically meaningful difference at 3 points, or 0.5. A 2017 review of SSRI trials found 1.94 points, rated every trial at high risk of bias, and found more serious adverse events on the drug. With 100,000 patients, a statistically significant result is easy; it says nothing about whether the typical patient notices the difference. Most of the improvement people feel on an antidepressant they would also have felt on a sugar pill.",
      proponent_rebuttal:
        "All 21 antidepressants beat placebo in the largest review ever assembled, 522 trials and 116,477 patients, with odds ratios for response of 1.37 to 2.13. That is not a null result. An average can hide a split: when the FDA pooled patient-level data from 232 trials, a 'large' response was seen in 24.5% of patients on the drug and 9.6% on placebo, so about one patient in seven gets a big, drug-specific benefit. The 3-point line was a judgment call, not a law of nature. And the Hamilton scale scores many symptoms that have little to do with mood, such as sleep and appetite, which drags the average down.",
      crux: {
        id: "clinical-significance-threshold",
        title: "The Hidden Responder Test",
        question:
          "Should the benefit be judged by the average patient, or by a subgroup who truly respond to the drug?",
        description:
          "Both sides accept the numbers: the average drug-placebo gap is real and small, about 2 Hamilton points or an effect size of 0.3. The split is whether that average is what a patient should weigh, or whether it blurs a minority who respond strongly and a majority who do not.",
        methodology:
          "Reanalyze trial data patient by patient rather than by group averages: fit mixture models that test for a distinct drug-specific responder group, and compare the average effect with a pre-registered threshold anchored to what patients themselves rate as a noticeable improvement.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Patient-level reanalysis of the FDA's trial archive that tests for a distinct responder group, and a check of the average gap against a pre-registered, patient-anchored threshold for a change people notice.",
        },
        cost_to_verify: "$0 (reanalysis of existing FDA trial data)",
        falsification: {
          supporter_flip:
            "If patient-level reanalysis found no distinct group of strong responders, only the whole placebo-response curve shifted slightly to the right, and the average stayed below the change patients themselves can notice, the hidden-responder defense would fail and the small average would be the whole story.",
          skeptic_flip:
            "If more patient-level analyses repeated Stone 2022's finding of a large response in 24.5% of patients on the drug against 9.6% on placebo, the 2-point average would look like a real benefit to a minority, blurred by people it does not help.",
          common_ground:
            "Both sides accept that antidepressants beat placebo on average and that the average gap is small, about 1.8 to 2 points on the 52-point Hamilton scale.",
          live_disagreement:
            "Whether a patient should weigh the group average or the chance of being in a strongly responding minority, and where the line for a meaningful change should sit.",
        },
      },
      evidence: [
        {
          id: "cipriani-2018",
          title: "Lancet 2018: All 21 Antidepressants Beat Placebo Across 522 Trials and 116,477 Patients",
          description:
            "A network meta-analysis of 522 double-blind trials, published and unpublished, covering 116,477 adults with major depression found every one of 21 antidepressants more effective than placebo. Odds ratios for response ranged from 1.37 (reboxetine) to 2.13 (amitriptyline). Only 18% of trials were rated low risk of bias, and the certainty of evidence was moderate to very low.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Cipriani et al., 'Comparative efficacy and acceptability of 21 antidepressant drugs for the acute treatment of adults with major depressive disorder', The Lancet 391:1357-1366 (2018)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/29477251/",
          reasoning:
            "The largest and most complete review of the question, including unpublished data. It shows the drugs beat placebo; it does not show the gap is big enough to matter, because odds of response do not by themselves settle the effect-size argument. Most trials lasted about eight weeks.",
        },
        {
          id: "stone-2022",
          title: "BMJ 2022: In 232 FDA Trials, 24.5% on the Drug Had a Large Response, Against 9.6% on Placebo",
          description:
            "An FDA-led analysis of individual-patient data from 232 trials (73,388 participants) found that responses fell into three groups. Patients on the drug were more likely to have a 'large' response, 24.5% against 9.6% on placebo, implying that about 15% of patients get a substantial benefit beyond placebo.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "Stone et al., 'Response to acute monotherapy for major depressive disorder in randomized, placebo controlled trials submitted to the US Food and Drug Administration', BMJ (2022)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9344377/",
          reasoning:
            "Uses the same FDA archive the skeptics rely on, at the patient level, and was run by FDA staff. It locates a real responder group, but it also confirms most patients' improvement is not drug-specific, and no one can yet say in advance who will be in the 15%.",
        },
        {
          id: "kirsch-2008",
          title: "PLoS Medicine 2008: FDA Trials Showed a 1.8-Point Gap, Below NICE's 3-Point Bar",
          description:
            "Irving Kirsch and colleagues analyzed the trials drug companies submitted to the FDA for four newer antidepressants (35 trials, 5,133 patients), including unpublished ones. The drug-placebo difference averaged 1.80 Hamilton points, an effect size of 0.32, below the criterion NICE then used for clinical significance (3 points or 0.5). The gap grew with baseline severity, mostly because people with severe depression responded less to placebo.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "Kirsch et al., 'Initial Severity and Antidepressant Benefits: A Meta-Analysis of Data Submitted to the Food and Drug Administration', PLoS Medicine (2008)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2253608/",
          reasoning:
            "The landmark use of unpublished FDA data, and directly about clinical rather than statistical significance. It is not decisive because the 3-point line is itself disputed and a single average can blur a responder group. Later, larger reviews found similar averages.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Is the gap the drug? (why the number looks the way it does)
    // =========================================================================
    {
      id: "blinding-measurement",
      title: "Is the Gap the Drug, or the Side Effects Talking?",
      short_summary:
        "Antidepressants cause side effects people notice, so patients may guess they got the real pill and expect to improve. And the old story that depression is a serotonin shortage has not held up. Skeptics say both shrink what the drug itself does; defenders say the benefit lands on mood itself, which expectation alone would not explain.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "SSRIs cause nausea, sexual problems and jitteriness. Patients feel them, guess they are on the real drug and expect to get better, and raters can often tell too. A small gap in a trial whose blind has broken may be expectation rather than chemistry. The theory sold to the public has also collapsed: a 2022 umbrella review of serotonin research found 'no consistent evidence' that depression is linked to lower serotonin, and some evidence that long-term antidepressant use itself lowers it. A 2017 systematic review rated every SSRI trial it examined at high risk of bias. When the mechanism is unknown and the blind is leaky, a 2-point average is weak ground for treating millions.",
      proponent_rebuttal:
        "If the gap were only expectation, it should spread evenly across every symptom the scale measures: sleep, appetite, anxiety. It does not. In patient-level data from 18 SSRI trials, more than half the drug-placebo comparisons failed on the full Hamilton total, but only 3 of 32 failed on the single 'depressed mood' item, the symptom an antidepressant should move. Not knowing exactly how a drug works does not mean it does not work; doctors used aspirin for decades before anyone knew how it worked. And the serotonin review is about what causes depression, not about whether the drugs relieve it.",
      crux: {
        id: "depressed-mood-item-test",
        title: "The Symptom-Specificity Test",
        question:
          "Is the drug-placebo gap real pharmacology, or an artifact of patients guessing they got the drug?",
        description:
          "If the gap comes from broken blinding, it should be spread across all symptoms and should vanish against an active placebo that mimics side effects. If it is the drug, it should concentrate on core mood symptoms, rise with dose, and survive an active placebo.",
        methodology:
          "Rescore blinded trial data item by item, testing whether the gap concentrates on depressed mood and rises with dose. Run trials with an active placebo that reproduces side effects, and ask patients and raters to guess their assignment.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Item-level reanalysis of the trial data regulators hold, checking if the gap concentrates on depressed mood and rises with dose, run alongside trials that use active placebos mimicking side effects and that ask patients and raters to guess their assignment.",
        },
        cost_to_verify: "$0 for the reanalysis; a few million dollars for an active-placebo trial",
        falsification: {
          supporter_flip:
            "If item-level reanalysis found the gap spread evenly across unrelated items such as sleep, weight and anxiety, and active placebos that mimic side effects erased it, the measured benefit would look like expectation rather than pharmacology.",
          skeptic_flip:
            "If more patient-level analyses, extending Hieronymus 2016's 18 trials, found the benefit concentrated on depressed mood, rising with dose and surviving an active placebo, expectation from unblinding would struggle to explain so specific an effect.",
          common_ground:
            "Both sides agree SSRIs cause side effects patients notice, which can break the blind, and that the 17-item Hamilton total is a noisy measure of depression.",
          live_disagreement:
            "Whether the measured gap is a drug acting on mood or an artifact of patients and raters guessing who got the real pill.",
        },
      },
      evidence: [
        {
          id: "hieronymus-2016",
          title: "Molecular Psychiatry 2016: 18 of 32 SSRI Comparisons Failed on the Full Scale; Only 3 Failed on Depressed Mood",
          description:
            "A post-hoc patient-level analysis of 18 industry-sponsored placebo-controlled trials of paroxetine, citalopram, sertraline and fluoxetine (6,669 adults) re-scored 32 drug-placebo comparisons. At week 6, 18 of the 32 (56%) failed to separate drug from placebo on the 17-item Hamilton total. Only 3 of 32 (9%) failed when the single 'depressed mood' item was used instead.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "Hieronymus et al., 'Consistent superiority of selective serotonin reuptake inhibitors over placebo in reducing depressed mood in patients with major depression', Molecular Psychiatry 21:523-530 (2016)",
          sourceUrl: "https://www.nature.com/articles/mp201553",
          reasoning:
            "Answers the unblinding critique with symptom specificity. But it is a post-hoc reanalysis by a group known for pro-efficacy positions, and choosing one item as the outcome is itself a contested choice. It did not use active placebos, so it narrows the expectation explanation without closing it.",
        },
        {
          id: "jakobsen-2017",
          title: "BMC Psychiatry 2017: SSRIs Cut Symptoms by 1.94 Points, Every Trial at High Risk of Bias",
          description:
            "A systematic review with trial-sequential analysis of SSRI-versus-placebo trials found an average reduction of 1.94 Hamilton points, below the authors' 3-point threshold. All trials were judged at high risk of bias, and SSRIs raised the odds of a serious adverse event (odds ratio 1.37).",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "Jakobsen et al., 'Selective serotonin reuptake inhibitors versus placebo in patients with major depressive disorder', BMC Psychiatry 17:58 (2017)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5299662",
          reasoning:
            "A peer-reviewed review that addresses both bias and harm. Its authors hold a known skeptical stance, and rating every trial high risk is a judgment other reviewers (Cipriani 2018 rated 9% high risk) did not share.",
        },
        {
          id: "serotonin-umbrella-2022",
          title: "Molecular Psychiatry 2022: Umbrella Review Finds 'No Consistent Evidence' Linking Depression to Low Serotonin",
          description:
            "Joanna Moncrieff and colleagues reviewed 17 systematic reviews and large studies of serotonin and depression. The main areas of research 'provide no consistent evidence of there being an association between serotonin and depression, and no support for the hypothesis that depression is caused by lowered serotonin activity or concentrations.' The two largest genetic studies (115,257 and 43,165 people) found no link between depression and SERT, the gene behind serotonin reuptake. Some evidence suggested long-term antidepressant use may itself lower serotonin.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 3,
          },
          source:
            "Moncrieff et al., 'The serotonin theory of depression: a systematic umbrella review of the evidence', Molecular Psychiatry 28:3243-3256 (2023; online July 2022)",
          sourceUrl: "https://www.nature.com/articles/s41380-022-01661-0",
          reasoning:
            "Strong on what it covers: the chemical-imbalance story told to patients for decades lacks support. Directness to this question is low, because whether a drug relieves symptoms does not depend on knowing what caused them, and skeptics of the review note that its authors have long argued against antidepressants.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Who benefits? (mild versus severe depression)
    // =========================================================================
    {
      id: "severity",
      title: "Who Benefits: Only the Severely Depressed?",
      short_summary:
        "The most practical fight is about mild and moderate depression, where most prescriptions go. One patient-level analysis found the benefit over placebo was tiny below severe depression; another, larger one found the same benefit at every level of severity. Guidelines now differ on whether to offer pills first for milder depression.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Whatever the drugs do in severe depression, most people who take them are not severely depressed. A 2010 JAMA analysis of patient-level data found the drug-placebo effect was below 0.2, the standard definition of a small effect, for anyone scoring under 23 on the Hamilton scale, and crossed NICE's line for a meaningful difference only at 25, which is very severe depression. Kirsch's FDA analysis found the same pattern. For mild and moderate depression, therapy, exercise and waiting do as well, without sexual side effects, weight change or the difficulty some people have stopping. Prescribing first for milder depression is a habit, not an evidence-based default.",
      proponent_rebuttal:
        "The 2010 analysis pooled six trials and 718 patients. A larger individual-patient analysis of 2,464 patients in six placebo-controlled trials of five newer antidepressants found no meaningful link between baseline severity and benefit: 'We may expect as much benefit from antidepressant treatments for mild, moderate or severe major depression.' The same research group found the same thing for cognitive behavioral therapy against pill placebo, with an effect size of 0.22: the leading talk therapy shows no bigger an effect than the pills, and it is harder to get. For many people with moderate depression, a pill is the treatment actually on offer.",
      crux: {
        id: "severity-gradient",
        title: "The Severity Gradient Test",
        question:
          "Do antidepressants help people with mild or moderate depression, or only the severely depressed?",
        description:
          "If the benefit over placebo shrinks to nearly nothing below severe depression, most prescriptions are hard to justify as a first choice. If it holds at every level, severity should not decide who is offered a pill.",
        methodology:
          "Pool individual-patient data from all placebo-controlled trials held by regulators and companies, including people with mild depression where trials enrolled them, and test whether the drug-placebo difference changes with baseline severity, with the scale's floor effects accounted for.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An individual-patient analysis of all placebo-controlled trials in the FDA's archive that tests whether the drug-placebo gap changes with baseline severity, including the mild cases most trials screened out.",
        },
        cost_to_verify: "$0-1M (reanalysis of existing regulator-held data)",
        falsification: {
          supporter_flip:
            "If a full individual-patient analysis of the regulator-held trials found the benefit over placebo shrinking to near zero below severe depression, as Fournier 2010 did in 718 patients, offering pills first for mild and moderate depression would lose its evidence base.",
          skeptic_flip:
            "If that analysis repeated Furukawa 2018's finding across 2,464 patients of no link between severity and benefit, the claim that the drugs only work for the severely depressed would fail.",
          common_ground:
            "Both sides agree the drug-placebo gap in severe depression is at least as large as in milder depression, and that most trials enrolled people with moderate to severe depression, so evidence in mild depression is thin.",
          live_disagreement:
            "Whether people with mild or moderate depression, who receive most prescriptions, get a benefit over placebo worth the side effects, and whether therapy should come first for them.",
        },
      },
      evidence: [
        {
          id: "fournier-2010",
          title: "JAMA 2010: Below a Hamilton Score of 23, the Drug's Edge Over Placebo Was Under 0.2",
          description:
            "A patient-level meta-analysis of six placebo-controlled trials (718 adult outpatients) found the benefit of medication over placebo depended on baseline severity. For patients scoring below 23 on the Hamilton scale, the effect size was estimated at less than 0.20. It crossed NICE's threshold for a clinically significant difference only at a baseline score of 25. The authors concluded the benefit 'may be minimal or nonexistent, on average, in patients with mild or moderate symptoms,' and is 'substantial' in very severe depression.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Fournier et al., 'Antidepressant drug effects and depression severity: a patient-level meta-analysis', JAMA 303(1):47-53 (2010)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3712503/",
          reasoning:
            "Patient-level data and a clear finding. But only six trials' authors shared the data needed, 718 patients in all, and a larger patient-level analysis since (Furukawa 2018) did not find the same gradient.",
        },
        {
          id: "furukawa-2018",
          title: "Acta Psychiatrica Scandinavica 2018: In 2,464 Patients, Benefit Did Not Depend on Severity",
          description:
            "An individual-participant analysis of six placebo-controlled trials of duloxetine, escitalopram, mirtazapine, paroxetine and bupropion (2,464 patients) found no statistically significant interaction between baseline severity and treatment (coefficient -0.04, 95% CI -0.16 to 0.08). The authors concluded: 'We may expect as much benefit from antidepressant treatments for mild, moderate or severe major depression.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Furukawa et al., 'Initial severity of major depression and efficacy of new generation antidepressants: individual participant data meta-analysis', Acta Psychiatrica Scandinavica 137(6):450-458 (2018)",
          sourceUrl: "https://doi.org/10.1111/acps.12886",
          reasoning:
            "Larger than Fournier's sample and limited to newer drugs. All six trials were run in Japan and obtained through industry partnerships, and data from five of the 11 eligible trials were not obtained. Placebo-controlled trials rarely enroll people with truly mild depression, so it says more about moderate than mild cases.",
        },
        {
          id: "cbt-placebo-severity-2017",
          title: "British Journal of Psychiatry 2017: CBT Beat Pill Placebo by an Effect Size of 0.22",
          description:
            "The same research group pooled individual data from all five trials that compared cognitive behavioral therapy with a pill placebo in major depression (509 patients). CBT beat placebo by a standardized mean difference of 0.22, and as with the drugs in their Japanese analysis, the benefit did not depend on baseline severity.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Furukawa et al., 'Initial severity of depression and efficacy of cognitive-behavioural therapy: individual-participant data meta-analysis of pill-placebo-controlled trials', British Journal of Psychiatry 210(3):190-196 (2017)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5331187/",
          reasoning:
            "Puts the drugs' small effect in context: the leading talk therapy, tested against the same pill placebo, shows an effect of similar size. It does not show pills are better than therapy, and five trials is a small base.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Staying on and stopping (what to do now)
    // =========================================================================
    {
      id: "real-world-durability",
      title: "Staying On, Stopping, and the 2026 Push to Taper",
      short_summary:
        "Millions have taken antidepressants for years. In a UK trial of people who felt well enough to stop, 56% of those switched to placebo relapsed within a year, against 39% who stayed on. Skeptics say much of that 'relapse' is withdrawal. In May 2026 HHS began a federal push to help patients taper off; psychiatrists warn it oversimplifies.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Withdrawal is common and has been played down for decades. When researchers reanalyzed the influential 2024 review that put withdrawal at about one patient in six, keeping only the five studies that measured withdrawal systematically, the pooled rate was 55%. Trials that switch long-term users to placebo, often over only a few weeks, count withdrawal symptoms as 'relapse' and so overstate the benefit of staying on. The flagship real-world study, STAR*D, reported 67% remission; a reanalysis that followed the trial's own protocol found 35%. With one adult in eight on these drugs, HHS is right to make informed consent, slow tapering and non-drug treatment the norm, and to pay doctors for helping patients come off.",
      proponent_rebuttal:
        "The best test of stopping is the 2021 ANTLER trial: 478 long-term users in 150 UK general practices who felt well enough to stop were randomly assigned to keep their drug or taper onto a matching placebo. By 52 weeks, 56% of the discontinuation group had relapsed against 39% of the maintenance group. A 2025 JAMA Psychiatry review of 50 trials and 17,828 people found stopping caused, on average, about one extra symptom in the first week, mostly dizziness, below the threshold for a discontinuation syndrome, and no worsening of mood: later depression after stopping is relapse, not withdrawal. Over 31 trials, staying on cut relapse from 41% to 18%. Slow tapering is good medicine, and nobody objects to it. A federal campaign led by a secretary who says coming off SSRIs is worse than coming off heroin risks scaring people off a treatment that keeps many of them well.",
      crux: {
        id: "withdrawal-vs-relapse",
        title: "Withdrawal or Relapse?",
        question:
          "How much of the benefit of staying on antidepressants is relapse prevention versus avoided withdrawal?",
        description:
          "Trials that move stable patients onto placebo count returning symptoms as relapse. If much of that is withdrawal from the drug rather than depression coming back, the case for staying on is overstated, and the right advice is a slow taper rather than indefinite use.",
        methodology:
          "Compare relapse after a slow taper over months with relapse after a fast switch to placebo, against people never treated; score withdrawal symptoms and depressive symptoms separately and track when each appears.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Discontinuation trials that taper the drug slowly over months rather than switching abruptly, and that score withdrawal symptoms and returning depression separately, compared with relapse rates after abrupt stops.",
        },
        cost_to_verify: "$5M (randomized slow-taper versus maintenance trial)",
        falsification: {
          supporter_flip:
            "If trials tapering over many months found relapse rates close to those of people who stayed on, and showed that the 'relapses' after faster stops were mostly withdrawal symptoms, the 56%-versus-39% gap in ANTLER would overstate the benefit of staying on.",
          skeptic_flip:
            "If slow-taper trials still found far more relapse among people who stopped, with symptoms of depression returning months later rather than withdrawal in the first weeks, as the 2025 JAMA Psychiatry review suggests, the withdrawal objection would lose its force.",
          common_ground:
            "Both sides agree that people who stay on an antidepressant relapse less often in trials, that stopping can cause withdrawal symptoms, and that tapering slowly with a doctor's help is better than stopping abruptly.",
          live_disagreement:
            "How common and how severe withdrawal is, how much of measured relapse it accounts for, and so whether long-term users should be encouraged to try coming off.",
        },
      },
      evidence: [
        {
          id: "antler-2021",
          title: "NEJM 2021 (ANTLER): 56% Who Stopped Relapsed Within a Year, Against 39% Who Stayed On",
          description:
            "In a double-blind trial in 150 UK general practices, 478 adults who had had at least two episodes of depression or had taken an antidepressant for two years or more, and felt well enough to stop, were randomly assigned to keep taking citalopram, fluoxetine, sertraline or mirtazapine or to taper onto a matching placebo. By 52 weeks, 135 of 240 (56%) in the discontinuation group had relapsed, against 92 of 238 (39%) in the maintenance group (hazard ratio 2.06). The discontinuation group also had more symptoms of depression, anxiety and withdrawal.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "Lewis et al., 'Maintenance or Discontinuation of Antidepressants in Primary Care', New England Journal of Medicine 385:1257-1267 (2021); publicly funded by the UK National Institute for Health Research",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2106356",
          reasoning:
            "Publicly funded, double-blind, in ordinary primary care, with long-term users: the closest trial to the real decision. Skeptics argue that if the taper was faster than some patients need, part of the 'relapse' was withdrawal. Adherence was 52% in the discontinuation group.",
        },
        {
          id: "geddes-2003",
          title: "Lancet 2003: Across 31 Trials, Staying On Cut Relapse From 41% to 18%",
          description:
            "A systematic review of 31 randomized trials (4,410 patients) found that continuing antidepressants reduced relapse from an average 41% on placebo to 18% on the drug, about a 70% reduction in the odds of relapse, largely regardless of how long patients had been treated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Geddes et al., 'Relapse prevention with antidepressant drug treatment in depressive disorders: a systematic review', The Lancet 361:653-661 (2003)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/12606176/",
          reasoning:
            "A large, well-run review. Directness is held down because many of these trials switched patients abruptly to placebo, and the review itself warns that withdrawal symptoms could unblind patients and bias results toward the drug: the exact confound in this crux.",
        },
        {
          id: "kalfas-2025",
          title: "JAMA Psychiatry 2025: Stopping Added About One Withdrawal Symptom in Week One, and No Mood Worsening",
          description:
            "A meta-analysis of 50 randomized trials (17,828 participants), including unpublished data from 11, found people who stopped an antidepressant had more discontinuation symptoms at one week than those who continued or stopped placebo (standardized mean difference 0.31), 'equivalent to 1 more symptom' on the standard checklist. Dizziness was the most common, 6.2 percentage points more frequent than after stopping placebo. Stopping was not associated with worse depression symptoms. The authors concluded that 'later presentation of depression after discontinuation is indicative of depression relapse.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Kalfas et al., 'Incidence and Nature of Antidepressant Discontinuation Symptoms: A Systematic Review and Meta-Analysis', JAMA Psychiatry 82(9) (2025)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12242823/",
          reasoning:
            "The largest trial-based estimate and directly on this crux. Its limits: most trials stopped people after short courses, the main estimate is at one week and says little about protracted withdrawal, and only five trials measured mood after stopping. Skeptics argue the people most affected, long-term users, are the least studied.",
        },
        {
          id: "withdrawal-reanalysis-2025",
          title: "Psychological Medicine 2025: Reanalysis of Withdrawal Studies Puts the Rate at 55%",
          description:
            "The 2024 Lancet Psychiatry review by Henssler and colleagues estimated that about 15% of patients have withdrawal symptoms once placebo effects are subtracted (31% after stopping a drug, 17% after stopping placebo), and 2.8% have severe ones. Joanna Moncrieff, Mark Horowitz and colleagues reanalyzed it, keeping only the five studies that measured withdrawal systematically. The pooled rate was 55% (95% CI 31% to 81%, 601 people), without subtracting nocebo effects. In all but one of the five, prior treatment had lasted 12 weeks or less.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source:
            "Moncrieff et al., 'Evidence on antidepressant withdrawal: an appraisal and reanalysis of a recent systematic review', Psychological Medicine (2025); Henssler et al., The Lancet Psychiatry (2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12315658/",
          reasoning:
            "Shows how far estimates move with what counts as measuring withdrawal. The 55% rests on five studies and 601 people with wide uncertainty, does not subtract what happens after stopping placebo, and comes from researchers who campaign on withdrawal; the original authors have replied disputing the reanalysis.",
        },
        {
          id: "stard-reappraisal-2024",
          title: "BMJ Open 2023: STAR*D's Famous 67% Remission Falls to 35% Under the Trial's Own Protocol",
          description:
            "A patient-level reanalysis of the NIMH STAR*D trial (4,041 adults seeking care at 41 clinics) found the published 67% cumulative remission rested on a non-blinded clinic assessment the protocol had excluded as an outcome, and on counting 99 patients who already scored as remitted at entry. Using the protocol's blinded Hamilton score and entry criteria gave a cumulative remission rate of 35.0% after up to four treatment steps.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Pigott, Kim, Xu, Kirsch & Amsterdam, 'What are the treatment remission, response and extent of improvement rates after up to four trials of antidepressant therapies in real-world depressed patients?', BMJ Open 13(7):e063095 (2023)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/37491091/",
          reasoning:
            "A peer-reviewed reanalysis of NIMH data that corrects an overstated headline. The original investigators dispute it. STAR*D had no placebo arm, so it bears on how often people get well in practice, not on the drug-placebo gap.",
        },
        {
          id: "hhs-deprescribing-2026",
          title: "HHS, May 2026: A Federal Push to Help Patients Taper Off Psychiatric Drugs",
          description:
            "On 4 May 2026 HHS announced provider training and clinical guidance on weaning patients off psychiatric medications if they want to stop, CMS billing guidance to pay for tapering, wider access to talk therapy, and a SAMHSA 'Dear Colleague' letter urging providers to review SSRI risks with patients and involve them in decisions about starting or stopping. Kennedy said: 'Too many patients begin treatment without a clear understanding of the risks and how long they will stay on these drugs. And that's not informed consent. We are going to fix it.' At a MAHA Institute summit the same day, Kennedy contrasted heroin withdrawal, which he said ends 'After 72 hours,' with coming off SSRIs: 'it is not even comparable.' The president of the American Psychiatric Association called his framing 'an oversimplification,' and the American Foundation for Suicide Prevention said 'antidepressants are effective in treating acute depressive episodes.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 3,
            directness: 3,
          },
          source:
            "NPR (Rhitu Chatterjee), 'Psychiatrists say RFK Jr.'s take on SSRIs is an oversimplification of the problem' (7 May 2026), as republished by KPCW; Christian Post (4 May 2026) on the MAHA Institute summit",
          sourceUrl:
            "https://www.kpcw.org/npr-news/2026-05-07/psychiatrists-say-rfk-jr-s-take-on-ssris-is-an-oversimplification-of-the-problem",
          reasoning:
            "A policy decision, not evidence about the drugs, so directness is low. It shows the government now treats long-term use as a problem to manage. Whether the push helps patients depends on the very questions this map asks: how common withdrawal is and how often stopping leads to relapse.",
        },
      ],
    },
  ],
  aliases: [
    "Do Antidepressants Beat Placebo?",
    "Do antidepressants help depression meaningfully more than placebo?",
    "Are SSRIs just a placebo?",
    "Should I come off my antidepressants?",
  ],
  references: [
    {
      title: "Comparative efficacy and acceptability of 21 antidepressant drugs - The Lancet (Cipriani et al., 2018)",
      url: "https://pubmed.ncbi.nlm.nih.gov/29477251/",
    },
    {
      title: "Maintenance or Discontinuation of Antidepressants in Primary Care (ANTLER) - NEJM (Lewis et al., 2021)",
      url: "https://doi.org/10.1056/NEJMoa2106356",
    },
    {
      title: "Incidence and Nature of Antidepressant Discontinuation Symptoms - JAMA Psychiatry (Kalfas et al., 2025)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12242823/",
    },
    {
      title: "The effects of antidepressants on cardiometabolic and other physiological parameters - The Lancet (Pillinger et al., 2025)",
      url: "https://doi.org/10.1016/S0140-6736(25)01293-0",
    },
    {
      title: "Antidepressant Use Among Adults: United States, 2015-2018 - NCHS Data Brief No. 377",
      url: "https://www.cdc.gov/nchs/products/databriefs/db377.htm",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is a 2-point gap on the Hamilton scale too small to matter?",
      content:
        "Antidepressants beat placebo by about 1.8 to 2 points on a 52-point scale, below the 3 points NICE once used as its bar. But an FDA analysis of 232 trials found 24.5% of patients on the drug had a large response, against 9.6% on placebo. Is the small average the real story, or does it hide a minority the drugs help a lot?",
    },
    {
      id: "q2",
      title: "If depression isn't a serotonin shortage, how do SSRIs work?",
      content:
        "A 2022 umbrella review found no consistent evidence that depression is caused by low serotonin, undercutting the chemical-imbalance story told to patients for decades. Defenders say a drug can relieve symptoms whose cause is unknown. Does the missing mechanism weaken the case for the drugs, or only the way they were marketed?",
    },
    {
      id: "q3",
      title: "Should long-term users try to come off?",
      content:
        "In the ANTLER trial, 56% of long-term users who tapered onto placebo relapsed within a year, against 39% who stayed on. In May 2026 HHS began paying for and promoting supervised tapering. How should a person who feels well weigh the risk of relapse against side effects and an unknown future?",
    },
  ],
};
