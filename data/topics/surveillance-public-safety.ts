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
            "A 2024 study published in Cities analyzing 268 US cities from 1997 to 2020 found that police adoption of facial recognition applications facilitated reductions in rates of felony violence and homicide. Greater reductions were observed in cities that adopted these technologies earlier. The study found no evidence that adoption contributed to over-policing or racial disparities in violent crime arrests.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "Cities (Elsevier), peer-reviewed (2024)",
          reasoning:
            "Peer-reviewed with large sample. However, observational design limits causal inference—cities that adopt facial recognition may differ in other policing investments. The 'no racial disparity' finding in arrests warrants independent replication.",
        },
        {
          id: "false-arrest-cases",
          title: "Facial Recognition Has Caused False Arrests of Innocent People",
          description:
            "In Detroit, Michigan, Robert Williams—a Black man with no criminal history—was falsely arrested based on an incorrect facial recognition match. At least six documented cases of false arrest from facial recognition errors have occurred in the US. Research found that some facial recognition algorithms misidentified darker-skinned females at a rate of 38% compared to 0.8% for lighter-skinned males.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "ACLU; Buolamwini & Gebru, Gender Shades Project, MIT (2018)",
          reasoning:
            "Documented cases of real harm to real people. The racial accuracy disparity is well-replicated across multiple studies and represents a serious equity concern.",
        },
        {
          id: "eff-scant-evidence-review",
          title: "EFF Review: 'Scant Evidence' Surveillance Reduces Crime",
          description:
            "The Electronic Frontier Foundation's comprehensive review of surveillance technologies found limited and mixed evidence for their effectiveness in reducing crime. While some studies show modest effects for CCTV on property crime, evidence for broader crime reduction is thin, and system-level evaluations are largely absent.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Electronic Frontier Foundation (EFF)",
          reasoning:
            "EFF is a respected digital rights organization but has an advocacy position against surveillance. Their review is thorough but should be read alongside pro-surveillance research.",
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
          title: "ICE Monitors 700,000+ People Through Surveillance Technology",
          description:
            "Since April 2024, US Immigration and Customs Enforcement (ICE) has monitored over 700,000 people through the SmartLINK app, and 183,935 people have been subjected to electronic monitoring since March 2024. This demonstrates how surveillance infrastructure built for one purpose (public safety) is routinely expanded to other government objectives (immigration enforcement).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Government records; reporting by civil liberties organizations (2024)",
          reasoning:
            "Direct evidence of surveillance scope creep—the pattern that civil liberties advocates warn about. The scale (700,000+) is striking.",
        },
        {
          id: "china-surveillance-resistance",
          title: "Even in China, Excessive Surveillance Triggers Public Resistance",
          description:
            "A 2025 study published in the Journal of Chinese Political Science found that escalating digital surveillance in China has begun triggering public resistance, even in an authoritarian context. When surveillance is perceived as excessive or lacking legitimate purpose, citizens push back through complaint channels and collective action.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "Journal of Chinese Political Science, Springer Nature (2025)",
          reasoning:
            "Interesting cross-cultural finding. If surveillance triggers resistance even in China, democratic societies may face even stronger backlash. However, China's context is very different from Western democracies.",
        },
      ],
    },
  ],
};
