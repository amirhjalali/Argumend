import type { Topic } from "@/lib/schemas/topic";

export const surveillancePublicSafetyData = {
  id: "surveillance-public-safety",
  title: "Surveillance and Public Safety",
  meta_claim:
    "Expanding government surveillance technology (facial recognition, CCTV, license plate readers, predictive policing) meaningfully reduces crime and improves public safety—a claim weighed here against the best evidence on effectiveness, which is real but modest and context-dependent, and against documented costs to accuracy, civil liberties, and equal treatment.",
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
        "Evidence that surveillance reduces crime is real but narrow. The leading 40-year meta-analysis (Piza, Welsh, Farrington & Thomas, 2019) finds CCTV produces a significant but modest overall crime decrease, concentrated in car parks (roughly a 37% reduction there) and driven by property—not violent—crime, with weak or non-significant effects in city centers and on transit; the largest gains come when cameras are actively monitored and paired with other interventions, meaning the camera alone is rarely the cause. Predictive policing algorithms can redirect resources toward already-over-policed communities, and a measured share of any effect is crime displacement rather than prevention. The honest reading is not 'surveillance does nothing' but 'its benefits are conditional, often small, and easy to overstate.'",
      proponent_rebuttal:
        "Modest is not nothing, and the strongest evidence points the right way. A 2024 study of 268 US cities from 1997-2020 (Johnson et al., Cities) found that police adoption of facial recognition was associated with reductions in felony violence and homicide—larger for early adopters—without measurable increases in over-policing or racial arrest disparities for violent offenses; it is observational rather than a controlled experiment, but it is the largest analysis to date and it cuts against the assumption that these tools only harm. The same meta-analysis skeptics cite confirms CCTV genuinely cuts crime where it is deployed well. Beyond aggregate crime rates, surveillance has clear investigative value: London's CCTV network has materially aided major investigations, and license plate readers reliably recover stolen vehicles and identify suspects in serious crimes. The policy question is how to capture these benefits, not whether they exist.",
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
            "In January 2020 in Detroit, Michigan, Robert Williams—a Black man—was wrongfully arrested based on an incorrect facial recognition match; the ACLU sued and won a landmark settlement. The ACLU now documents at least 14 wrongful arrests in the US linked to police use of facial recognition, nearly all of Black people (the true count is likely higher, since many departments do not disclose when a match drove an arrest). Separately, the 2018 'Gender Shades' study by Buolamwini and Gebru found that commercial gender-classification systems misclassified darker-skinned women at error rates up to 34.7%, versus a maximum of 0.8% for lighter-skinned men.",
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
        "Facial recognition errors are not randomly distributed: a federal NIST evaluation found one-to-many matching produces the highest false-positive rates for Black women, and the wrongful arrests documented so far have nearly all been of Black people.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Mass surveillance creates a chilling effect on free speech, political dissent, and freedom of movement. Data collected for crime prevention is routinely repurposed for immigration enforcement, political monitoring, and commercial use. The Fourth Amendment was designed precisely to prevent government from watching all citizens at all times. Once surveillance infrastructure exists, it is virtually impossible to dismantle.",
      proponent_rebuttal:
        "Observing public conduct is not the same as warrantless search: courts have long held there is no reasonable expectation of privacy in what one does on a public street, and targeted surveillance backed by judicial oversight (warrants, particularized suspicion) is both constitutional and effective. The civil-liberties harms skeptics cite are real, but most are failures of governance, not of the technology itself—and they are addressable. Technology-specific guardrails can capture the safety benefits while bounding the risks: prohibiting real-time mass facial recognition while permitting post-crime investigative use with human review, capping data retention, requiring audit logs and transparency reports, and barring repurposing for immigration or political monitoring. The documented wrongful arrests argue for treating a face match as an investigative lead requiring corroboration, not for abandoning the tool entirely.",
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
