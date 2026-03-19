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
          title: "NAS 2012 Deterrence Review",
          description:
            "The National Academy of Sciences committee found that existing studies on the deterrent effect of capital punishment are 'fundamentally flawed' and should not be used to inform policy.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 8,
            directness: 9,
          },
          source: "National Research Council, 2012",
          reasoning:
            "Gold-standard scientific review by the US's most authoritative body. Reviewed all major econometric studies and found systemic methodological problems.",
        },
        {
          id: "dp-dezhbakhsh-study",
          title: "Dezhbakhsh Econometric Study",
          description:
            "Econometric analysis using county-level data found each execution prevents roughly 18 murders, with results robust to multiple model specifications.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 3,
            directness: 7,
          },
          source: "Dezhbakhsh, Rubin & Shepherd, American Law and Economics Review 2003",
          reasoning:
            "Published in peer-reviewed journal but heavily criticized by NAS. Results are sensitive to model specification and data choices. Low replicability as other researchers have failed to reproduce.",
        },
        {
          id: "dp-state-murder-rates",
          title: "State Murder Rate Comparisons",
          description:
            "States without the death penalty have consistently lower murder rates (4.0 per 100K) than death penalty states (5.3 per 100K) over the past 30 years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "FBI Uniform Crime Reports, Death Penalty Information Center",
          reasoning:
            "Reliable official data, but correlation does not establish causation. States differ in many ways beyond death penalty policy.",
        },
        {
          id: "dp-plea-bargain",
          title: "Plea Bargain Leverage Data",
          description:
            "Prosecutors report that the death penalty serves as critical leverage in plea negotiations, leading to confessions and cooperation that resolve additional cases.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source: "National District Attorneys Association surveys",
          reasoning:
            "Self-reported by prosecutors with institutional interest. Anecdotal and difficult to quantify systematically. Low independence score.",
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
          title: "Innocence Project Exoneration Data",
          description:
            "Over 190 people have been exonerated from death row since 1973. A 2014 PNAS study estimated that at least 4.1% of death row inmates are likely innocent.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Innocence Project, PNAS (Gross et al. 2014)",
          reasoning:
            "Rigorous statistical methodology published in top-tier journal. The 4.1% figure is considered a conservative lower bound.",
        },
        {
          id: "dp-racial-disparity",
          title: "Death Penalty Racial Disparity Studies",
          description:
            "Black defendants are 3x more likely to be sentenced to death than white defendants for similar crimes, especially when the victim is white.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Baldus Study, GAO Report on Racial Disparities in Sentencing",
          reasoning:
            "Multiple independent studies over decades reach consistent conclusions. Landmark Baldus study influenced McCleskey v. Kemp.",
        },
        {
          id: "dp-cost-analysis",
          title: "Execution Cost Analyses",
          description:
            "Death penalty cases cost 2-3x more than equivalent non-death penalty cases due to mandatory appeals, specialized housing, and prolonged litigation. California spent $184M per year on its death penalty system.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "California Commission on the Fair Administration of Justice",
          reasoning:
            "Authoritative fiscal analysis. Cost is real but is an argument about efficiency, not justice — somewhat indirect.",
        },
        {
          id: "dp-victim-families",
          title: "Victim Family Impact Statements",
          description:
            "Surveys of murder victims' families show a majority support the death penalty for their loved one's killer, reporting that execution provides a sense of closure and justice.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 5,
            directness: 7,
          },
          source: "National Organization of Parents Of Murdered Children surveys",
          reasoning:
            "Emotional testimony from directly affected parties. Self-selected samples and not all families agree. Some victim family organizations actively oppose the death penalty.",
        },
      ],
    },
  ],
};
