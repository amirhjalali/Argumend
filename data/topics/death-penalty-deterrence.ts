import type { Topic } from "@/lib/schemas/topic";

export const deathPenaltyDeterrenceData = {
  id: "death-penalty-deterrence",
  title: "The Death Penalty",
  meta_claim:
    "The death penalty serves as an effective deterrent against murder and is justified as a form of criminal justice.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "deterrence-effect",
      title: "Deterrence Effect",
      short_summary:
        "States with the death penalty do not have lower murder rates than states without it. Deterrence advocates say the problem is inconsistent enforcement.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The National Academy of Sciences (2012) concluded there is no reliable evidence that the death penalty deters murder. States without the death penalty consistently have lower murder rates. Most murders are impulsive crimes of passion, not calculated acts where perpetrators weigh consequences.",
      proponent_rebuttal:
        "Hashem Dezhbakhsh's econometric study found each execution deters approximately 18 murders. Criminals who face the death penalty are significantly more likely to plea bargain, revealing accomplices and evidence that helps solve other cases. The NAS critique was about methodology, not a finding of no effect.",
      crux: {
        id: "deterrence-causal-identification",
        title: "Causal Identification of Deterrence",
        description:
          "Can a causal (not merely correlational) deterrent effect of the death penalty on murder rates be established?",
        methodology:
          "Natural experiment analysis using states that adopted or abolished the death penalty, with synthetic control methods and instrumental variables to isolate the causal effect.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Multi-state longitudinal study with econometric controls)",
      },
      evidence: [
        {
          id: "dp-nas-review",
          title: "National Research Council 2012 Deterrence Review",
          description:
            "A National Research Council committee (chaired by Daniel Nagin) reviewed three decades of econometric research and concluded the studies 'are not informative about whether capital punishment increases, decreases, or has no effect on homicide rates' and should not be used to inform policy.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 8,
            directness: 8,
          },
          source:
            "National Research Council, Deterrence and the Death Penalty (National Academies Press, 2012)",
          sourceUrl: "https://nap.nationalacademies.org/catalog/13363/deterrence-and-the-death-penalty",
          reasoning:
            "Gold-standard consensus review by the US's most authoritative scientific body. Its conclusion is agnostic (no reliable evidence either way), not an affirmative finding of zero deterrence — directness lowered to reflect this.",
        },
        {
          id: "dp-dezhbakhsh-study",
          title: "Dezhbakhsh, Rubin & Shepherd Econometric Study",
          description:
            "Using post-moratorium county-level panel data and simultaneous equations, the authors estimated each execution is associated with on average 18 fewer murders (margin of error +/- 10). The 2012 National Research Council review judged this and similar studies methodologically uninformative.",
          side: "for" as const,
          weight: {
            sourceReliability: 4,
            independence: 4,
            replicability: 2,
            directness: 6,
          },
          source:
            "Dezhbakhsh, Rubin & Shepherd, 'Does Capital Punishment Have a Deterrent Effect? New Evidence from Postmoratorium Panel Data,' American Law and Economics Review 5(2): 344-376 (2003)",
          sourceUrl: "https://academic.oup.com/aler/article-abstract/5/2/344/131680",
          reasoning:
            "Peer-reviewed, but the headline '18 murders deterred' estimate is fragile: it carries a large stated margin of error, is highly sensitive to specification, and was specifically among the studies the NRC committee found not informative. Replicability lowered accordingly.",
        },
        {
          id: "dp-state-murder-rates",
          title: "State Murder Rate Comparisons",
          description:
            "Aggregating FBI data, the Death Penalty Information Center reports that states without the death penalty have had consistently lower murder rates than death penalty states for over 30 years, and the gap has widened since 1990 (e.g., in 2020, 4.7 vs 7.3 per 100,000).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 4,
          },
          source:
            "Death Penalty Information Center, 'Murder Rate of Death Penalty States Compared to Non-Death Penalty States' (FBI Uniform Crime Reports data)",
          sourceUrl:
            "https://deathpenaltyinfo.org/facts-and-research/murder-rates/murder-rate-of-death-penalty-states-compared-to-non-death-penalty-states",
          reasoning:
            "Underlying FBI counts are reliable, but the comparison is compiled by an advocacy organization (independence lowered) and is purely correlational — death-penalty and abolitionist states differ on many confounders, so it cannot establish (lack of) deterrence. Directness lowered.",
        },
        {
          id: "dp-plea-bargain",
          title: "Plea Bargain Leverage Research",
          description:
            "Empirical studies find the threat of a capital charge meaningfully increases the probability a defendant pleads guilty (estimates around 20-25 percentage points), giving prosecutors negotiating leverage. This is a leverage finding, not evidence that the death penalty deters murder.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 3,
          },
          source:
            "Ehrhard-Dietzel, 'The Use of Life and Death as Tools in Plea Bargaining,' Criminal Justice Policy Review 23(1) (2012); Thaxton, 'Leveraging Death,' Journal of Criminal Law & Criminology (working paper, SSRN 2138627)",
          sourceUrl: "https://journals.sagepub.com/doi/10.1177/0734016811431979",
          reasoning:
            "Replaces an unverifiable 'NDAA survey' citation with peer-reviewed empirical work. The leverage effect is real, but it speaks to plea dynamics, not to deterring murder — and the claim that it 'resolves additional cases' is not established. Directness lowered sharply.",
        },
      ],
    },
    {
      id: "justice-and-error",
      title: "Justice & Error",
      short_summary:
        "Since 1973, 200+ U.S. death row inmates have been exonerated. The system executes innocent people at an estimated rate of 4%.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Over 190 death row exonerations since 1973 prove the system convicts innocent people. Racial bias is pervasive — Black defendants are 3x more likely to receive death sentences. Execution costs taxpayers 3x more than life imprisonment due to mandatory appeals. The punishment is irreversible.",
      proponent_rebuttal:
        "Advances in DNA evidence and forensic science dramatically reduce wrongful convictions. The exoneration record actually shows the appeals system works. Victims' families deserve ultimate justice for ultimate crimes. Life without parole — decades in a cage — is arguably crueler than a swift execution.",
      crux: {
        id: "wrongful-execution-rate",
        title: "Wrongful Execution Rate Estimation",
        description:
          "What is the actual rate of wrongful execution, and can it be reduced to an acceptable level with modern forensic science?",
        methodology:
          "Statistical modeling of exoneration rates, time-to-exoneration, and estimated undetected wrongful convictions using DNA-era data.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Retrospective forensic review of historical cases)",
      },
      evidence: [
        {
          id: "dp-exonerations",
          title: "Death-Row Exoneration & False-Conviction Data",
          description:
            "Per the Death Penalty Information Center's innocence database, over 200 people have been exonerated and released from death row since 1973. A 2014 PNAS study (Gross et al.) estimated, as a conservative lower bound, that at least 4.1% of defendants sentenced to death in the US would be exonerated if all stayed on death row indefinitely.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Death Penalty Information Center, Innocence Database; Gross, O'Brien, Hu & Kennedy, PNAS 111(20): 7230-7235 (2014)",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.1306417111",
          reasoning:
            "Exoneration count is from DPIC's database (not the Innocence Project, whose DNA work is broader). The 4.1% PNAS estimate uses rigorous survival analysis and is framed by its authors as a conservative lower bound on the false-conviction rate among those sentenced to death.",
        },
        {
          id: "dp-racial-disparity",
          title: "Death Penalty Racial Disparity Studies",
          description:
            "A 1990 GAO synthesis of 28 studies found the victim's race influenced death-sentencing in 82% of them: killings of white victims were more likely to draw a death sentence, a pattern 'remarkably consistent' across data sets. The Baldus study of Georgia cases found defendants charged with killing white victims were ~4.3x more likely to be sentenced to death.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "U.S. GAO, 'Death Penalty Sentencing: Research Indicates Pattern of Racial Disparities' (GGD-90-57, 1990); Baldus, Pulaski & Woodworth (cited in McCleskey v. Kemp, 1987)",
          sourceUrl: "https://www.gao.gov/products/ggd-90-57",
          reasoning:
            "Multiple independent studies converge over decades; the Baldus study underpinned McCleskey v. Kemp. Corrected: the robust, well-documented disparity is driven by the race of the VICTIM, not simply a '3x defendant-race' effect as previously stated. Directness lowered since this bears on fairness, not deterrence.",
        },
        {
          id: "dp-cost-analysis",
          title: "Execution Cost Analyses",
          description:
            "A 2011 study by Judge Arthur Alarcon and Prof. Paula Mitchell estimated that California's death penalty added roughly $184 million per year over a life-without-parole system, and that the state had spent about $4 billion on capital punishment since reinstatement in 1978.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 4,
          },
          source:
            "Alarcon & Mitchell, 'Executing the Will of the Voters?,' Loyola of Los Angeles Law Review 44 (2011)",
          sourceUrl: "https://digitalcommons.lmu.edu/llr/vol44/iss0/1/",
          reasoning:
            "Detailed, widely cited California-specific fiscal study (corrected attribution from the unrelated 'Fair Administration of Justice' commission). Cost is real but is an efficiency argument, not one about justice or deterrence, and is specific to California — directness lowered.",
        },
        {
          id: "dp-victim-families",
          title: "Victim Family 'Closure' Claims",
          description:
            "Proponents argue execution gives murder victims' families closure and a sense of justice. However, empirical research finds little support for the closure claim: studies of co-victims who witnessed executions found only a minority reported closure, and some scholars conclude executions do not aid healing and can be retraumatizing. Victims' families are not unified — many actively oppose the death penalty.",
          side: "for" as const,
          weight: {
            sourceReliability: 2,
            independence: 2,
            replicability: 3,
            directness: 4,
          },
          source:
            "Closure argument as discussed in Death Penalty Information Center, 'Victims' Families'; contrasted with research (e.g., Bandes; Madeira, Killing McVeigh, 2012) finding the closure claim empirically unsupported",
          sourceUrl: "https://deathpenaltyinfo.org/policy-issues/victims-families",
          reasoning:
            "Corrected: the prior 'majority of families support execution for closure (POMC surveys)' claim could not be verified and is contradicted by the available research, which finds the closure narrative largely unsupported and victims' families deeply divided. Reframed honestly and weights lowered to reflect that this 'for' rationale is more rhetorical than evidentiary.",
        },
      ],
    },
  ],
};
