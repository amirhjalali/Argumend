export const deathPenaltyDeterrenceData = {
  id: "death-penalty-deterrence",
  title: "The Death Penalty",
  question: "Should America keep the death penalty?",
  meta_claim:
    "The United States should keep capital punishment for the worst killings, because it delivers justice the crime deserves and may deter killings, and its risks of error and unfairness can be held to an acceptable level.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: DPIC counted 47 executions in 2025 (19 in
  // Florida), up from 25 in 2024, and 32 in 2026 through 20 October (18 in
  // Florida); 23 new death sentences in 2025; at least 203 death-row
  // exonerations since 1973. Gallup's October 2025 reading: 52% favor the
  // death penalty for murder, the lowest since 1972. Executive Order 14164
  // (20 January 2025) restored federal pursuit of the death penalty.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "US executions nearly doubled in 2025, from 25 to 47, and Florida carried out 19 of them. By 20 October 2026 there had been 32 more. Yet juries returned only 23 new death sentences in 2025, and at least 203 people sentenced to death since 1973 have later been exonerated. The fight is over whether the punishment deters, whether the worst murders deserve it, and whether a system that makes mistakes should be allowed to kill.",
    confidence: 92,
    source:
      "Death Penalty Information Center, 'The Death Penalty in 2025: Year End Report' and 2026 execution list (updated 20 October 2026); DPIC Innocence page",
    sourceUrl:
      "https://deathpenaltyinfo.org/research/analysis/reports/year-end-reports/the-death-penalty-in-2025",
  },
  simple_case: [
    "The answer bears on the states now executing at a faster pace, on a federal government that since January 2025 has been told to seek death 'for all crimes of a severity demanding its use', and on everyone a jury could send to death row.",
    "Four questions carry the fight: whether executions prevent murders, how many innocent defendants the system condemns, whether a victim's race and a county's habits decide who dies, and whether some crimes deserve death whatever the data say. The first three are questions of fact; the last is a moral judgment no study settles.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Does it deter? (what we know)
    // =========================================================================
    {
      id: "deterrence-effect",
      title: "Does It Prevent Murders?",
      short_summary:
        "States without the death penalty have had lower murder rates for decades, but that comparison says little about cause. In 2012 the National Research Council judged 30 years of deterrence studies 'not informative' either way. Newer before-and-after studies of states that dropped the penalty find no rise in murder; supporters answer that a punishment used this rarely could not be expected to show one.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "If the death penalty saved lives, the evidence should show it after fifty years of executions, and it does not. In 1999 death-penalty states averaged a murder rate of about 5.5 per 100,000 against about 3.6 in states without it, and the gap has grown since 1990. The National Research Council reviewed three decades of econometric work in 2012 and found it 'not informative' about whether capital punishment raises, lowers or has no effect on homicide; it told policymakers not to use those studies. The best newer designs point one way: Brett Parker's 2021 synthetic-control study compared seven states that abolished the penalty with 29 that kept it and found no evidence the statute deters murder, even for stranger killings, where a deterrent should show most. Most murders happen in anger, drink or panic, not after a calculation about a sentence carried out, if ever, many years later. A punishment that cannot show a benefit should not be justified by one.",
      proponent_rebuttal:
        "The National Research Council did not find that the death penalty fails to deter; it found the studies could not tell, partly because none of them modelled the alternative punishments or what potential killers believe about their odds. 'Not proven' is not 'disproven'. Some careful studies did find an effect: Dezhbakhsh, Rubin and Shepherd's 2003 county-level study estimated that each execution was followed by about 18 fewer murders, with a margin of error of plus or minus ten. Joanna Shepherd's 2005 study found that executions deterred murder in some states but not in most, and argued the effect depends on how a state uses the penalty. That fits common sense. A penalty imposed on a tiny share of killers, after twenty years of appeals, sends a weak signal, so studies of states that abolished a penalty they barely used tell us little about one enforced reliably. And if even a modest deterrent exists, each execution may save innocent lives.",
      crux: {
        id: "deterrence-causal-identification",
        title: "The Deterrence Test",
        question:
          "Do executions prevent killings that would otherwise have happened?",
        description:
          "Separate any effect of executions on murder from everything else that moves murder rates: policing, guns, the economy. Raw comparisons between states cannot do this, because death-penalty states differ from the others in many ways. Natural experiments, in which a state adopts, abolishes or suspends the penalty while similar states do not, come closest.",
        methodology:
          "Synthetic-control and difference-in-differences studies of states that abolished, suspended or resumed executions, compared with weighted combinations of similar states; separate estimates for stranger and felony murders, where a deterrent should be largest; models that include the alternative punishment (life without parole) and measures of how likely an execution actually is.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Before-and-after studies of states that abolished, paused or resumed executions, each matched to similar states that did not, reporting stranger and felony murders separately and accounting for the life-without-parole sentences that replace death, including states such as Florida whose execution pace rose sharply in 2025.",
        },
        cost_to_verify: "$500K-$1M (multi-state econometric study on existing crime data)",
        falsification: {
          supporter_flip:
            "If studies of Florida and Texas, the states executing most often, found murder rates moving no differently from similar states after execution pace rose, the claim that a reliably enforced penalty deters would lose its strongest ground.",
          skeptic_flip:
            "If well-matched before-and-after studies found murders, especially stranger and felony murders, falling after states began executing regularly and rising after they stopped, the case that the penalty saves no lives would be hard to hold.",
          common_ground:
            "Both sides accept that death-penalty states do not have lower murder rates, and that the 2012 National Research Council review found the existing studies uninformative either way.",
          live_disagreement:
            "Whether the absence of a measurable deterrent means there is none, or only that a penalty used this rarely and this slowly cannot show one.",
        },
      },
      evidence: [
        {
          id: "dp-nas-review",
          title: "National Research Council 2012: 30 Years of Deterrence Studies Are 'Not Informative'",
          description:
            "A National Research Council committee reviewed the econometric research on capital punishment and homicide since the 1976 reinstatement. It concluded that 'research to date on the effect of capital punishment on homicide is not informative' about whether the penalty increases, decreases or has no effect on homicide rates, and recommended that the studies 'not be used to inform deliberations' on the question. It named two flaws: none of the studies specified the noncapital punishments for homicide, and they used 'incomplete or implausible models of potential murderers' perceptions of and response to' the death penalty.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 8,
            directness: 7,
          },
          source:
            "National Research Council, Deterrence and the Death Penalty (National Academies Press, 2012), Summary",
          sourceUrl: "https://www.nationalacademies.org/read/13363/chapter/2",
          reasoning:
            "The most authoritative review there is. It removes the empirical support claimed for deterrence, which is why it sits on this side, but it is agnostic: it does not find that deterrence is zero, and supporters are right to read it that way.",
        },
        {
          id: "dp-parker-synthetic-controls",
          title: "Parker 2021: Seven States That Abolished Showed No Deterrent Effect Against 29 That Kept It",
          description:
            "Brett Parker applied synthetic controls, which build a comparison from a weighted mix of similar states, to seven states that recently abolished the death penalty and 29 that retained it. He found no evidence that a state's capital punishment statute deters murder. The result held across alternative specifications and when stranger homicides, which he argues should respond most to deterrence, were used as the outcome.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Brett Parker, 'Death Penalty Statutes and Murder Rates: Evidence From Synthetic Controls,' Journal of Empirical Legal Studies 18(3): 488-533 (2021)",
          sourceUrl: "https://econpapers.repec.org/RePEc:wly:empleg:v:18:y:2021:i:3:p:488-533",
          reasoning:
            "A design built to answer the NRC's objections to older panel studies, in a peer-reviewed law-and-economics journal. It tests having the statute on the books, not the pace of executions, which is the gap supporters point to.",
        },
        {
          id: "dp-state-murder-rates",
          title: "Death-Penalty States Had Higher Murder Rates in 1999: About 5.5 vs 3.6 per 100,000",
          description:
            "From FBI Uniform Crime Reports, the Death Penalty Information Center reports that states without the death penalty have consistently had lower murder rates than states with it, and that the gap has grown since 1990. In 1999 the average was about 5.5 per 100,000 in death-penalty states and about 3.6 in states without it.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 9,
            directness: 3,
          },
          source:
            "Death Penalty Information Center, 'Murder Rate of Death Penalty States Compared to Non-Death Penalty States' (FBI Uniform Crime Reports data)",
          sourceUrl:
            "https://deathpenaltyinfo.org/facts-and-research/murder-rates/murder-rate-of-death-penalty-states-compared-to-non-death-penalty-states",
          reasoning:
            "The underlying counts are reliable, but the comparison is compiled by a group critical of the death penalty and is purely correlational. States that keep the penalty may do so because they have more murder, so this cannot show the penalty fails to deter.",
        },
        {
          id: "dp-dezhbakhsh-study",
          title: "Dezhbakhsh, Rubin & Shepherd 2003: Each Execution Followed by About 18 Fewer Murders (plus or minus 10)",
          description:
            "Using county-level panel data from the years after the 1976 reinstatement, the authors estimated that 'each execution results, on average, in eighteen fewer murders—with a margin of error of plus or minus ten.' The 2012 National Research Council review placed this and similar panel studies among those it judged not informative.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 2,
            directness: 7,
          },
          source:
            "Dezhbakhsh, Rubin & Shepherd, 'Does Capital Punishment Have a Deterrent Effect? New Evidence from Postmoratorium Panel Data,' American Law and Economics Review 5(2): 344-376 (2003)",
          sourceUrl: "https://academic.oup.com/aler/article-abstract/5/2/344/131680",
          reasoning:
            "The best-known study finding a deterrent, peer-reviewed and directly on point. Its margin of error is wide, and the NRC excluded studies of its kind from policy use, so replicability is low.",
        },
        {
          id: "dp-shepherd-threshold",
          title: "Shepherd 2005: Executions Deterred Only Where States Carried Out Many",
          description:
            "Joanna Shepherd's state-by-state analysis found that executions did not have one uniform effect. She found a deterrent effect in some states, but wrote of 'the majority of states where executions do not deter crime,' and of 'the many states where the brutalization effect outweighs the deterrent effect,' where executions were followed by more murders. She blamed 'policymakers' false beliefs about capital punishment's universal deterrent effect.'",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source:
            "Joanna M. Shepherd, 'Deterrence versus Brutalization: Capital Punishment's Differing Impacts among States,' Michigan Law Review 104(2): 203 (2005)",
          sourceUrl: "https://repository.law.umich.edu/mlr/vol104/iss2/13",
          reasoning:
            "Both sides cite it. It supports the claim that executions can deter under some conditions, and it also finds that in most states they did not, and in many may have cost lives. It rests on the same panel methods the NRC found uninformative.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Innocence and irreversible error
    // =========================================================================
    {
      id: "justice-and-error",
      title: "Can the System Avoid Executing the Innocent?",
      short_summary:
        "At least 203 people sentenced to death since 1973 have been exonerated, about one for every eight executed. A 2014 study estimated that at least 4.1% of people sentenced to death are innocent. Supporters answer that those cases were caught, and that no execution has been shown in court to have killed an innocent person.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The record shows the system condemns the innocent at a rate no one would accept for anything else the state does. Since 1973 at least 203 people sentenced to death have been exonerated, about one for every eight executed. Samuel Gross and colleagues estimated in 2014 that at least 4.1% of defendants sentenced to death would be exonerated if they stayed on death row indefinitely, and called that a conservative figure. Many innocent defendants are never cleared: once resentenced to life, they lose the lawyers and scrutiny that death cases attract, and 'the likelihood of exoneration drops sharply.' Errors come from mistaken witnesses, lying informants and prosecutors who hide evidence. In February 2025 the Supreme Court threw out Richard Glossip's conviction after Oklahoma's own Attorney General admitted the prosecution had let its key witness lie on the stand. Courts rarely hear innocence claims once the condemned are dead, so the absence of a proven wrongful execution says more about the system than about the dead.",
      proponent_rebuttal:
        "Every exoneration on the list is a case the system caught before an execution. Capital cases get more review than any other kind: automatic appeals, state and federal habeas, clemency, and now DNA testing that can confirm guilt as well as innocence. Justice Scalia noted in 2006 that critics could not point to 'a single case—not one—in which it is clear that a person was executed for a crime he did not commit,' and that in every case he knew of where DNA was tested after an execution, it confirmed guilt. The 4.1% estimate is a share of people sentenced to death who might be exonerated, not a share of people executed; the long appeals that critics deplore are the screen that keeps the second number far lower. The answer to error is better safeguards, such as recorded interrogations, preserved evidence and DNA testing, and reserving death for cases where guilt is certain, not abolishing a punishment that the worst killers, such as those convicted on video or by confession and DNA, plainly earned.",
      crux: {
        id: "wrongful-execution-rate",
        title: "The Wrongful Execution Test",
        question:
          "How many people on death row are innocent, and do appeals catch them before execution?",
        description:
          "Estimate how many death-sentenced defendants are innocent, how many of those are cleared, and how many are executed or resentenced to life without ever being cleared. Whether any remaining risk is acceptable for an irreversible punishment is a judgment beyond the numbers.",
        methodology:
          "Survival analysis of exoneration rates among death-sentenced defendants, as in Gross et al. (2014); DNA retesting of preserved evidence in completed executions where courts or states allow it; audits of how often exonerations came from the appeals process versus outside journalists, students or chance.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Retesting of preserved DNA and other evidence in a random sample of completed executions, alongside updated survival analysis of the share of death-sentenced defendants later exonerated, and a count of how many exonerations came through the courts rather than outside investigators. How much risk is too much for an irreversible punishment is a value choice.",
        },
        cost_to_verify: "$2M (retrospective forensic review of historical cases)",
        falsification: {
          supporter_flip:
            "If DNA retesting of completed executions found even a few innocent defendants executed, or if most exonerations turned out to come from outside journalists and law students rather than the appeals process, the claim that safeguards catch the errors would fail.",
          skeptic_flip:
            "If retesting found guilt confirmed in nearly every completed execution, and DNA-era cases with strong forensic evidence showed exoneration rates near zero, the argument that error makes the penalty unacceptable would have to rest on cases outside that group.",
          common_ground:
            "Both sides agree the system has sentenced innocent people to death, at least 203 since 1973, and that an execution cannot be undone.",
          live_disagreement:
            "Whether appeals and DNA testing catch nearly all the innocent before execution, and whether any remaining risk is acceptable for a punishment that cannot be reversed.",
        },
      },
      evidence: [
        {
          id: "dp-exonerations",
          title: "DPIC: At Least 203 Death-Row Exonerations Since 1973, About One for Every Eight Executions",
          description:
            "The Death Penalty Information Center counts at least 203 people who were wrongly convicted and sentenced to death in the US since 1973 and later exonerated. It reports that 'for every 8 people executed in the United States, one other person has been exonerated from death row.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 8,
          },
          source: "Death Penalty Information Center, Innocence (accessed 3 November 2026)",
          sourceUrl: "https://deathpenaltyinfo.org/policy-issues/innocence",
          reasoning:
            "Each case is documented, but DPIC is critical of the death penalty, and supporters dispute whether every case it counts is an innocent person rather than a conviction that could not be retried.",
        },
        {
          id: "dp-gross-false-conviction",
          title: "Gross et al. 2014: At Least 4.1% of People Sentenced to Death Are Likely Innocent",
          description:
            "Using survival analysis of defendants sentenced to death, the authors estimated that 'at least 4.1% would be exonerated' if all stayed on death row indefinitely, and called this 'a conservative estimate.' They found that most death-sentenced defendants are resentenced to life, after which 'the likelihood of exoneration drops sharply': innocent defendants, they write, 'are sentenced, or resentenced to prison for life, and then forgotten.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Gross, O'Brien, Hu & Kennedy, 'Rate of false conviction of criminal defendants who are sentenced to death,' PNAS 111(20): 7230-7235 (2014)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4034186/",
          reasoning:
            "Peer-reviewed in a top journal with a transparent method. It estimates innocence among the sentenced, not the executed, which is the gap supporters point to, and it predates more recent forensic reforms.",
        },
        {
          id: "dp-glossip-2025",
          title: "Supreme Court 2025: Glossip Conviction Thrown Out After Oklahoma Admitted Its Witness Lied",
          description:
            "On 25 February 2025 the Supreme Court reversed Richard Glossip's conviction and ordered a new trial, holding that 'the prosecution violated its constitutional obligation to correct false testimony.' Oklahoma's Attorney General had confessed error, conceding that prosecutors let their key witness, Justin Sneed, give false testimony about his psychiatric care. Justice Sotomayor wrote for the Court; Justices Thomas and Alito dissented.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 5,
            directness: 6,
          },
          source: "Glossip v. Oklahoma, 604 U.S. ___ (2025), No. 22-7466",
          sourceUrl: "https://www.law.cornell.edu/supremecourt/text/22-7466",
          reasoning:
            "A recent, documented failure in a case that had passed through years of state and federal review. It does not show Glossip innocent, and supporters read the reversal as the safeguards working.",
        },
        {
          id: "scalia-marsh-no-clear-case",
          title: "Justice Scalia 2006: Not 'a Single Case' Shown Where an Innocent Person Was Clearly Executed",
          description:
            "Concurring in Kansas v. Marsh (2006), Justice Antonin Scalia wrote that the dissent 'does not discuss a single case—not one—in which it is clear that a person was executed for a crime he did not commit,' and that in every case of an executed defendant he knew of where DNA was retested, the test confirmed guilt, citing Roger Coleman of Virginia. 'Capital cases are given especially close scrutiny at every level,' he wrote, 'which is why in most cases many years elapse before the sentence is executed.'",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source: "Kansas v. Marsh, 548 U.S. 163 (2006), Scalia, J., concurring",
          sourceUrl: "https://www.law.cornell.edu/supct/html/04-1170.ZC.html",
          reasoning:
            "The safeguards case at its strongest: the errors found so far were caught before execution. It is a judge's argument, not a study, and 'clear' is a bar that execution itself makes hard to meet, since courts seldom hear an innocence claim once the prisoner is dead.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Who gets death? Fairness and arbitrariness
    // =========================================================================
    {
      id: "fairness-and-arbitrariness",
      title: "Who Gets Death: The Crime, or the Place and the Victim?",
      short_summary:
        "Death sentences depend heavily on where a murder happens and who was killed. Florida carried out 19 of the 47 US executions in 2025, and studies have long found that killers of white victims are more likely to be sentenced to death. Supporters say that is a case for applying the penalty more evenly, not for ending it.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The death penalty is not reserved for the worst murders; it falls on the murders that happen in the wrong county, with the wrong victim, and the wrong lawyer. A 1990 GAO synthesis of 28 studies found that in 82% of them the victim's race influenced whether a defendant was charged with capital murder or sentenced to death, a finding 'remarkably consistent across data sets, states, data collection methods, and analytic techniques.' Geography is as stark: Florida alone carried out 19 of 47 executions in 2025 and 18 of 32 in 2026 through October, and since 2023 Florida has let a jury recommend death on an 8-4 vote. The cost is out of all proportion: California spent about $4 billion on its system from 1978 to 2011 and carried out no more than 13 executions. A punishment this rare and this uneven is a lottery, and a lottery is not justice.",
      proponent_rebuttal:
        "Unevenness is an argument for applying the law consistently, not for letting the worst murderers off everywhere. The racial disparity the GAO found concerns the race of victims, and the remedy is to prosecute killers of Black victims as seriously as killers of white ones. Geography reflects democracy: Florida's voters and legislature want the penalty enforced, and states that do not want it have repealed it. Florida changed its jury rule in 2023 because three jurors refused death for the Parkland shooter, who murdered 17 students and staff, so a single holdout could no longer spare a mass murderer; that is the arbitrariness supporters object to. Costs come mostly from decades of appeals, which can be streamlined without cutting real safeguards. In January 2025 the President directed federal prosecutors to seek death 'for all crimes of a severity demanding its use', so that the penalty depends on the crime rather than on the prosecutor.",
      crux: {
        id: "arbitrariness-test",
        title: "The Equal Treatment Test",
        question:
          "Once the crime is held constant, do the victim's race and the county decide who is sentenced to death?",
        description:
          "Compare death-eligible murders with the same aggravating facts and see whether the outcome, a capital charge, a death sentence, an execution, depends on the victim's race, the defendant's race, the county, or the quality of defense counsel. If it does, the penalty is arbitrary in practice whatever the statute says.",
        methodology:
          "Case-level studies of all death-eligible homicides in a state over a decade, coding the aggravating and mitigating facts, the victim and defendant race, the county and the defense counsel, then modelling the chance of a capital charge and a death sentence, as in the Baldus study of Georgia and the studies the GAO synthesized.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Coded records of every death-eligible homicide in Florida, Texas and Alabama since 2015, comparing capital charges and death sentences by victim race, defendant race, county and defense counsel among cases with the same aggravating facts, updating the studies the GAO reviewed in 1990.",
        },
        cost_to_verify: "$1-2M (case-level coding of death-eligible homicides in several states)",
        falsification: {
          supporter_flip:
            "If current case-level data from the high-execution states found the victim's race and the county still predicting death sentences among comparable murders, the claim that the penalty can be applied evenly would fail where it is used most.",
          skeptic_flip:
            "If coded data from the states executing most found that, once the crime's facts are matched, neither race nor county changed the odds of a death sentence, the lottery charge would lose its footing.",
          common_ground:
            "Both sides agree that executions are concentrated in a few states, Florida above all, and that studies have found killings of white victims more likely to draw a death sentence.",
          live_disagreement:
            "Whether uneven use is a flaw that better laws can fix or a feature of a punishment that depends on prosecutors' and jurors' discretion, and whether the concentration reflects democratic choice or arbitrariness.",
        },
      },
      evidence: [
        {
          id: "dp-racial-disparity",
          title: "GAO 1990: In 82% of 28 Studies, the Victim's Race Influenced Death Sentencing",
          description:
            "The General Accounting Office synthesized 28 studies of capital sentencing after Furman v. Georgia. 'In 82 percent of the studies, race of victim was found to influence the likelihood of being charged with capital murder or receiving the death penalty, i.e., those who murdered whites were found to be more likely to be sentenced to death than those who murdered blacks.' The finding 'was remarkably consistent across data sets, states, data collection methods, and analytic techniques' and held for high-, medium- and low-quality studies. The evidence was strongest at the early stages: the decision to charge a capital offense and to go to trial rather than plea bargain.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "U.S. General Accounting Office, 'Death Penalty Sentencing: Research Indicates Pattern of Racial Disparities' (GGD-90-57, February 1990)",
          sourceUrl: "https://www.gao.gov/assets/ggd-90-57.pdf",
          reasoning:
            "An independent federal synthesis with consistent results. It is 36 years old, the disparity concerns the victim's race more than the defendant's, and it says nothing about whether a reformed system could remove it.",
        },
        {
          id: "dp-florida-concentration",
          title: "Florida Carried Out 19 of 47 US Executions in 2025 and 18 of 32 in 2026 Through October",
          description:
            "The Death Penalty Information Center counted 47 executions in 11 states in 2025, up from 25 in 2024, with Florida carrying out 19, or 40%. Juries returned 23 new death sentences nationwide, and only 15 juries unanimously imposed death. Through 20 October 2026, 32 people had been executed in six states, 18 of them in Florida and 7 in Texas.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 9,
            directness: 5,
          },
          source:
            "Death Penalty Information Center, 'The Death Penalty in 2025: Year End Report'; Executions 2025 and 2026 lists (updated 20 October 2026)",
          sourceUrl: "https://deathpenaltyinfo.org/executions/2026",
          reasoning:
            "The counts are public record. They show the penalty depends heavily on one state's choices; whether that is arbitrariness or democracy is the disagreement itself.",
        },
        {
          id: "dp-cost-analysis",
          title: "California Spent About $4 Billion on Capital Punishment From 1978 to 2011 and Executed No More Than 13 People",
          description:
            "Judge Arthur Alarcón and Professor Paula Mitchell found that 'since reinstating the death penalty in 1978, California taxpayers have spent roughly $4 billion' to fund the system, which 'has carried out no more than 13 executions.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source:
            "Alarcón & Mitchell, 'Executing the Will of the Voters? A Roadmap to Mend or End the California Legislature's Multi-Billion-Dollar Death Penalty Debacle,' Loyola of Los Angeles Law Review 44 (2011)",
          sourceUrl: "https://digitalcommons.lmu.edu/llr/vol44/iss0/1/",
          reasoning:
            "A detailed state study. California executes almost no one, so it is an outlier, and supporters argue the cost comes from appeals that could be shortened. It is an efficiency argument, not one about justice.",
        },
        {
          id: "dp-florida-jury-rule",
          title: "Florida 2023: Juries Can Now Recommend Death on an 8-4 Vote After the Parkland Shooter Got Life",
          description:
            "After three jurors declined to vote for death for the man who murdered 17 people at Marjory Stoneman Douglas High School in Parkland in 2018, Florida's legislature passed SB 450, allowing 'a jury to recommend a death sentence by an 8-4 supermajority.' Supporters said a few jurors should not be able to spare a mass murderer; opponents said the change makes death sentences easier to impose in the state that executes the most.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 4,
          },
          source:
            "The Florida Bar News, 'Florida moving away from jury unanimity in capital cases' (17 April 2023)",
          sourceUrl:
            "https://www.floridabar.org/the-florida-bar-news/florida-moving-away-from-jury-unanimity-in-capital-cases/",
          reasoning:
            "Shows the supporters' version of the arbitrariness complaint: the worst killers escaping death on one vote. It is a change in the law, not evidence of what it has done, and critics read the same change as adding risk.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Do the worst murders deserve death? (values)
    // =========================================================================
    {
      id: "retribution",
      title: "Do the Worst Murders Deserve Death?",
      short_summary:
        "Most supporters do not rest their case on deterrence. They say some crimes deserve death. Opponents answer that the state should not kill people it has already secured, and that executions do not bring the healing promised to victims' families. Public support has fallen to 52%, the lowest since 1972.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Justice does not require the state to kill someone who can be held for life. Life without parole protects the public, punishes severely, and can be undone if the conviction proves wrong. The promise that an execution brings victims' families closure is not borne out: a two-state study comparing homicide survivors in Texas and Minnesota, which has no death penalty, found that 'in Minnesota, survivors of adjudicated cases show higher levels of physical, psychological, and behavioral health,' in part because they were spared decades of appeals that keep the killer in the news. Americans are moving away: Gallup's October 2025 reading put support for the death penalty for murder at 52%, down from 80% in 1994 and the lowest since 1972, and the most common reason opponents give is that it is wrong to take a life. A punishment the public is turning away from should not be expanded on a claim of desert alone.",
      proponent_rebuttal:
        "Some crimes are so terrible that any lesser punishment fails to take the victims seriously: the murder of children, of a police officer, a terrorist attack, a mass shooting. Justice means proportion, and for the deliberate murder of many people, a life sentence with meals, visits and a library is not proportionate. This is what supporters actually believe: when Gallup asked them why, the most common reason supporters gave was 'an eye for an eye', at 35%, with 14% saying the killers deserve it; only 7% named deterrence. The federal government has embraced that view: the January 2025 executive order states that 'only capital punishment can bring justice and restore order' in response to the worst crimes. A majority of Americans still favor the penalty for murder, including 81% of Republicans. Families of victims are not one voice, and those who want the sentence carried out deserve to have the law enforced rather than delayed for decades.",
      crux: {
        id: "retribution-value",
        title: "The Desert Question",
        question:
          "Do some murders deserve death, and should the state be the one to impose it?",
        description:
          "A moral question, not an empirical one. It turns on whether proportional justice for the worst murders requires death, whether the state should ever kill someone it can hold safely, and how much weight victims' families' wishes should carry. Evidence can inform it, for instance on how families fare, but cannot settle it.",
        methodology:
          "No experiment decides it. What informs it: studies of how victims' families fare under death sentences and life sentences, surveys of why Americans support or oppose the penalty, and the record of what countries and states that abolished it replaced it with.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "A judgment about proportional punishment and the limits of state power, informed by studies of how victims' families fare under death and life sentences and by why the public supports or opposes the penalty; no measurement decides it.",
          kind: "value-difference" as const,
        },
        cost_to_verify: "N/A (value question)",
        falsification: {
          supporter_flip:
            "If a supporter came to see life without parole as fully meeting what justice owes the victims, or came to hold that a state which makes errors forfeits the right to impose a punishment it cannot reverse, the case for keeping death would lose its moral footing.",
          skeptic_flip:
            "If an opponent came to hold that some crimes are so grave that only death is proportionate, and that the risk of error can be confined to cases where guilt rests on video or DNA, the moral objection would narrow to a dispute over which cases qualify.",
          common_ground:
            "Both sides agree that the worst murders call for the most severe punishment the law allows, and that victims' families deserve to be heard.",
          live_disagreement:
            "Whether the most severe punishment should be death or life without parole, a disagreement about desert and the limits of state power that survives every factual dispute on this map.",
        },
      },
      evidence: [
        {
          id: "dp-gallup-reasons",
          title: "Gallup 2014: 35% of Supporters Cite 'An Eye for an Eye'; Only 7% Cite Deterrence",
          description:
            "Asked why they favor the death penalty, 35% of supporters said 'an eye for an eye', down from half in 1991. Fourteen percent said the killers deserve it, and 14% cited saving taxpayers money. Deterrence, the second-most-common reason in 1991 at 19%, was named by 7%. Among opponents, 'wrong to take a life' has been the top reason since 1991, with the possibility of wrongful conviction second in two of the three times Gallup asked.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Gallup, 'Americans: \"Eye for an Eye\" Top Reason for Death Penalty' (23 October 2014)",
          sourceUrl:
            "https://news.gallup.com/poll/178799/americans-eye-eye-top-reason-death-penalty.aspx",
          reasoning:
            "Shows that the case most supporters hold is retributive, so deterrence studies do not touch it. It reports what supporters believe, not whether the belief is right, and it is twelve years old.",
        },
        {
          id: "dp-executive-order-2025",
          title: "Executive Order 14164 (2025): 'Only Capital Punishment Can Bring Justice' for the Worst Crimes",
          description:
            "Signed on 20 January 2025, the order states that 'capital punishment is an essential tool for deterring and punishing those who would commit the most heinous crimes' and that 'only capital punishment can bring justice and restore order in response to such evil.' It directs the Attorney General to 'pursue the death penalty for all crimes of a severity demanding its use', to seek it for the murder of a law enforcement officer and for capital crimes committed by people in the country illegally, and to help states obtain lethal-injection drugs.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 3,
            replicability: 3,
            directness: 5,
          },
          source:
            "The White House, 'Restoring the Death Penalty and Protecting Public Safety' (Executive Order, 20 January 2025)",
          sourceUrl:
            "https://www.whitehouse.gov/presidential-actions/2025/01/restoring-the-death-penalty-and-protecting-public-safety/",
          reasoning:
            "The retributive case in the words of current federal policy. It is a statement of policy, not evidence: its claim that the penalty deters is the one the NRC found unsupported.",
        },
        {
          id: "dp-gallup-support-2025",
          title: "Gallup 2025: 52% Favor the Death Penalty for Murder, Down From 80% in 1994",
          description:
            "Gallup's October 2025 crime survey found 52% of Americans favor the death penalty for people convicted of murder, 'falling from a peak of 80% in 1994.' Gallup called the level, statistically similar to 53% in each of the two previous years, 'the lowest in Gallup's death penalty trend since 1972.' Support was 81% among Republicans and 32% among Democrats.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 3,
          },
          source:
            "Gallup, 'Americans Prefer Tempered Crime-Fighting Methods' (30 October 2025)",
          sourceUrl:
            "https://news.gallup.com/poll/697244/americans-prefer-tempered-crime-fighting-methods.aspx",
          reasoning:
            "A reliable trend line on where the public stands. Public opinion does not decide what justice requires, and a bare majority still favors the penalty, so directness is low.",
        },
        {
          id: "dp-victim-families",
          title: "Texas vs Minnesota Survivors: Families Fared Better Where Killers Got Life Without Parole",
          description:
            "Marilyn Peterson Armour and Mark Umbreit interviewed a random sample of family members of murder victims in Texas, which has the death penalty, and Minnesota, which does not. They report that 'in Minnesota, survivors of adjudicated cases show higher levels of physical, psychological, and behavioral health,' and that the two states differ most after conviction, where Texas families face years of appeals.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source:
            "Armour & Umbreit, 'Assessing the Impact of the Ultimate Penal Sanction on Homicide Survivors: A Two State Comparison,' Marquette Law Review 96(1) (2012)",
          sourceUrl: "https://scholarship.law.marquette.edu/mulr/vol96/iss1/3",
          reasoning:
            "One of the few studies that compares families under the two sentences. It is a two-state interview study, the states differ in many ways besides the penalty, and it measures well-being, not whether families felt justice was done.",
        },
      ],
    },
  ],
  aliases: [
    "Is the death penalty a justified punishment?",
  ],
  references: [
    {
      title: "The Death Penalty in 2025: Year End Report - Death Penalty Information Center",
      url: "https://deathpenaltyinfo.org/research/analysis/reports/year-end-reports/the-death-penalty-in-2025",
    },
    {
      title: "Deterrence and the Death Penalty - National Research Council (2012)",
      url: "https://www.nationalacademies.org/read/13363/chapter/2",
    },
    {
      title: "Rate of false conviction of criminal defendants who are sentenced to death - Gross et al., PNAS (2014)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4034186/",
    },
    {
      title: "Death Penalty Statutes and Murder Rates: Evidence From Synthetic Controls - Parker, Journal of Empirical Legal Studies (2021)",
      url: "https://econpapers.repec.org/RePEc:wly:empleg:v:18:y:2021:i:3:p:488-533",
    },
    {
      title: "Americans Prefer Tempered Crime-Fighting Methods - Gallup (30 October 2025)",
      url: "https://news.gallup.com/poll/697244/americans-prefer-tempered-crime-fighting-methods.aspx",
    },
  ],
};
