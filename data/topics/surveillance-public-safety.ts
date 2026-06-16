import type { Topic } from "@/lib/schemas/topic";

export const surveillancePublicSafetyData = {
  id: "surveillance-public-safety",
  title: "Surveillance and Public Safety",
  meta_claim:
    "Expanding government surveillance technology (facial recognition, CCTV, license plate readers, predictive policing) meaningfully reduces crime and improves public safety.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "crime-reduction-effectiveness",
      title: "Crime Reduction Effectiveness",
      short_summary:
        "London has 700,000 CCTV cameras. Studies show they reduce property crime in parking lots and have near-zero effect on violent crime.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Evidence that surveillance reduces crime is thin and mixed. CCTV has modest effects on property crime in parking lots but minimal impact on violent crime. Predictive policing algorithms often simply redirect resources to already-over-policed communities. A comprehensive review by the EFF found 'scant evidence' that these technologies reduce crime at the system level. Crime displacement—not reduction—is the more likely outcome.",
      proponent_rebuttal:
        "A 2024 study analyzing 268 US cities from 1997-2020 found that police adoption of facial recognition technology facilitated reductions in felony violence and homicide rates without contributing to over-policing or racial disparities in arrests. London's CCTV network is credited with significant investigative assistance. License plate readers have proven effective for recovering stolen vehicles and identifying suspects in serious crimes.",
      crux: {
        id: "surveillance-crime-rct",
        title: "Randomized Controlled Trial of Surveillance Expansion",
        description:
          "A rigorous experimental evaluation of surveillance technology deployment in matched communities, measuring crime rates, crime displacement, civil liberties impacts, and community trust.",
        methodology:
          "Randomly assign surveillance technology deployment (CCTV, facial recognition, license plate readers) across matched neighborhoods. Measure crime rates in treated and control areas, including adjacent areas (to detect displacement). Track false positive rates, arrests based on surveillance, and community surveys on trust.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Multi-city randomized evaluation)",
      },
      evidence: [
        {
          id: "facial-recognition-crime-study",
          title: "Facial Recognition Linked to Reduced Violent Crime in 268 US Cities",
          description:
            "Johnson et al. (2024), published in Cities (vol. 155), analyzed 268 US cities from 1997 to 2020 using difference-in-differences regressions. The authors report that police adoption of facial recognition applications facilitated reductions in rates of felony violence and homicide, with larger homicide reductions in jurisdictions that adopted early (2000-2007). They found no evidence that adoption contributed to over-policing or racial disparities in arrest for violent offenses.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source:
            "Johnson, Johnson, Topalli, McCurdy & Wallace, 'Police facial recognition applications and violent crime control in U.S. cities,' Cities 155 (2024)",
          sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4796951",
          reasoning:
            "Peer-reviewed with a large sample. But this is an observational difference-in-differences design, not an experiment: cities that adopt facial recognition may differ in other policing investments, so causal claims are weaker than the headline implies. The 'no racial disparity in arrests' finding is a single study and warrants independent replication, which is why replicability and directness are scored conservatively.",
        },
        {
          id: "false-arrest-cases",
          title: "Facial Recognition Has Caused False Arrests of Innocent People",
          description:
            "In January 2020 in Detroit, Michigan, Robert Williams—a Black man—was wrongfully arrested based on an incorrect facial recognition match; the ACLU sued and won a landmark settlement. As of 2025 the ACLU documents at least 14 wrongful arrests in the US linked to police use of facial recognition, nearly all of Black people. Separately, the 2018 'Gender Shades' study by Buolamwini and Gebru found that commercial gender-classification systems misclassified darker-skinned women at error rates up to 34.7%, versus a maximum of 0.8% for lighter-skinned men.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source:
            "ACLU, 'More than a Dozen Wrongful Arrests Due to Police Reliance on Facial Recognition Technology'; Buolamwini & Gebru, 'Gender Shades' (PMLR, 2018)",
          sourceUrl:
            "https://www.aclu.org/news/privacy-technology/more-than-a-dozen-wrongful-arrests-due-to-police-reliance-on-facial-recognition-technology",
          reasoning:
            "Documented cases of real harm to real people, and the intersectional accuracy disparity in Gender Shades is well-replicated. The wrongful-arrest count comes from the ACLU, an advocacy organization, so independence is scored slightly lower; note Gender Shades measured gender classification, a proxy for (not identical to) the identity-matching used in arrests.",
        },
        {
          id: "eff-scant-evidence-review",
          title: "CCTV's Effect on Crime Is Modest and Concentrated in Car Parks",
          description:
            "The leading peer-reviewed meta-analysis—Piza, Welsh, Farrington & Thomas (2019), a 40-year systematic review of 76 evaluations in Criminology & Public Policy—found CCTV is associated with a significant but modest overall decrease in crime. The effect is concentrated in car parks (where cameras combined with other measures cut crime substantially) and is much weaker or non-significant in city centers and on public transit, with the largest reductions for property (not violent) crime. The Electronic Frontier Foundation, a digital-rights advocacy group, argues such effectiveness claims are often overstated by vendors.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "Piza, Welsh, Farrington & Thomas, 'CCTV surveillance for crime prevention: A 40-year systematic review with meta-analysis,' Criminology & Public Policy 18(1) (2019)",
          sourceUrl: "https://onlinelibrary.wiley.com/doi/abs/10.1111/1745-9133.12419",
          reasoning:
            "Re-anchored to the strongest available evidence. An earlier draft attributed a 'scant evidence' review to the EFF that could not be web-verified, so the specific claim and the advocacy framing have been replaced with the peer-reviewed Piza/Welsh/Farrington meta-analysis, which directly supports the 'modest and context-dependent' reading. Directness is scored lower because this evidence is about CCTV specifically rather than the full surveillance stack (facial recognition, ALPRs, predictive policing).",
        },
      ],
    },
    {
      id: "privacy-civil-liberties",
      title: "Privacy & Civil Liberties",
      short_summary:
        "Facial recognition has a 96% accuracy rate for white men and an 80% accuracy rate for Black women. The false positives are not randomly distributed.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Mass surveillance creates a chilling effect on free speech, political dissent, and freedom of movement. Data collected for crime prevention is routinely repurposed for immigration enforcement, political monitoring, and commercial use. The Fourth Amendment was designed precisely to prevent government from watching all citizens at all times. Once surveillance infrastructure exists, it is virtually impossible to dismantle.",
      proponent_rebuttal:
        "Surveillance in public spaces does not violate reasonable expectations of privacy—you have no expectation of privacy on a public street. Targeted surveillance with judicial oversight (warrants) is constitutional and effective. Technology-specific regulations can provide guardrails: banning real-time facial recognition while allowing post-crime investigation, requiring data retention limits, and mandating transparency reports.",
      crux: {
        id: "surveillance-oversight-framework",
        title: "Effective Surveillance Oversight Model",
        description:
          "Determining whether surveillance technology can be deployed with oversight mechanisms sufficient to prevent civil liberties abuses while maintaining public safety benefits.",
        methodology:
          "Compare surveillance oversight frameworks across democracies (US, UK, EU, Japan). Measure abuse rates, false positive rates, scope creep, and public trust under different regulatory regimes.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Comparative policy study)",
      },
      evidence: [
        {
          id: "ice-electronic-monitoring",
          title: "ICE Has Monitored Hundreds of Thousands via the SmartLINK App",
          description:
            "As of April 2024, US Immigration and Customs Enforcement (ICE) had cumulatively monitored roughly 779,000 people through the SmartLINK smartphone app, which uses facial-comparison and intermittent GPS check-ins as part of its Alternatives to Detention (ATD) program. The scale shows how normalized location-and-biometric surveillance has become in routine government administration, and how the same biometric tooling used for policing is deployed across other enforcement domains.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "CBS News reporting on ICE SmartLINK / ICE Alternatives to Detention (2024)",
          sourceUrl: "https://www.cbsnews.com/news/does-ices-smartlink-app-work/",
          reasoning:
            "The cumulative figure (~779,000 as of April 2024) is well-reported; an earlier draft's '183,935 since March 2024' could not be verified and was removed. Directness is lowered because ATD was an immigration-enforcement program from its 2004 origin, so it is better read as evidence of normalized biometric surveillance than as a clean case of public-safety infrastructure being repurposed.",
        },
        {
          id: "china-surveillance-resistance",
          title: "Even in China, Excessive Surveillance Triggers Public Resistance",
          description:
            "Chen & Zhan (2025), 'When Does Surveillance Trigger Resistance? Public Response to Escalating Digital Control in China,' in the Journal of Chinese Political Science, develops a risk-benefit framework arguing that when citizens perceive surveillance as intrusive and infer controlling state intent, they are more likely to resist—even within an authoritarian context where overt resistance is costly.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source:
            "Chen & Zhan, 'When Does Surveillance Trigger Resistance?', Journal of Chinese Political Science (2025)",
          sourceUrl: "https://link.springer.com/article/10.1007/s11366-025-09918-5",
          reasoning:
            "Peer-reviewed and a genuinely interesting cross-cultural finding, but it is primarily a theoretical/analytical framework rather than a large empirical test, and China's context differs sharply from Western democracies—hence the modest directness score. It speaks to public acceptability, not to whether surveillance reduces crime.",
        },
      ],
    },
  ],
};
