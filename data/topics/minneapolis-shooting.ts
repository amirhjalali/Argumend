import type { Topic } from "@/lib/schemas/topic";

export const minneapolisShootingData = {
  id: "minneapolis-shooting",
  title: "Minneapolis ICE Shooting",
  meta_claim:
    "Federal agents acted with excessive force in the fatal shooting of Alex Pretti in Minneapolis on January 24, 2026.",
  status: "contested" as const,
  category: "philosophy" as const,
  pillars: [
    {
      id: "conflicting-accounts",
      title: "Conflicting Official Accounts",
      short_summary:
        "Video evidence contradicts the federal government's description of events.",
      image_url:
        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=60",
      icon_name: "FileText" as const,
      skeptic_premise:
        'DHS Secretary Noem stated Pretti arrived "to inflict maximum damage" and called his actions "domestic terrorism." Border Patrol Commander Bovino blamed protesters for "vilifying" agents and creating a "preventable tragedy."',
      proponent_rebuttal:
        "Multiple independent videos and eyewitness accounts contradict the administration's description of events. Pretti was an ICU nurse at a VA hospital who was licensed to carry a concealed weapon. The DOJ and Minnesota BCA are conducting investigations.",
      crux: {
        id: "body-cam-review",
        title: "The Body Camera Analysis",
        description:
          "Complete body-worn camera footage from federal agents would definitively show the sequence of events and whether force was justified.",
        methodology:
          "Release and analyze complete unedited body camera footage from all agents present. Cross-reference with civilian video timestamps and witness statements.",
        equation:
          "P(\\text{excessive force}) = f(\\text{threat level}, \\text{response proportionality}, \\text{de-escalation attempts})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Footage exists but access blocked)",
      },
      evidence: [
        {
          id: "video-contradiction",
          title: "Multiple Videos Contradict Official Account",
          description:
            "Independent video recordings from bystanders show a different sequence of events than described by federal officials.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "NPR",
          sourceUrl:
            "https://www.npr.org/2026/01/25/nx-s1-5687875/minneapolis-shooting-minnesota-ice-alex-pretti-dhs-investigation",
          reasoning:
            "Multiple independent sources captured footage; can be cross-referenced",
        },
        {
          id: "licensed-carrier",
          title: "Pretti Was Licensed to Carry",
          description:
            "Minneapolis police chief confirmed Pretti was licensed to carry a concealed weapon, contradicting implications of illegal activity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 7,
          },
          reasoning:
            "Official police statement is verifiable through licensing records",
        },
        {
          id: "bca-blocked",
          title: "State Investigators Blocked from Scene",
          description:
            "Minnesota Bureau of Criminal Apprehension reported that Homeland Security officials blocked bureau agents from accessing the shooting site.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          reasoning:
            "Blocking independent investigation suggests concern about findings",
        },
        {
          id: "dhs-position",
          title: "DHS Claims Self-Defense",
          description:
            "Federal officials maintain agents acted in self-defense against an armed individual approaching them.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 2,
            replicability: 3,
            directness: 7,
          },
          reasoning:
            "Party to the incident; low independence score due to conflict of interest",
        },
      ],
    },
    {
      id: "pattern-of-force",
      title: "Pattern of Federal Force",
      short_summary:
        "This is the second U.S. citizen killed by federal agents in Minnesota in January 2026.",
      image_url:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "These are isolated incidents. Federal agents operate in dangerous situations and are authorized to use lethal force when threatened. Increased immigration enforcement naturally leads to more confrontations.",
      proponent_rebuttal:
        'Two fatal shootings of U.S. citizens in three weeks in one state suggests systemic issues with training, rules of engagement, or supervision. Governor Walz called the agents "untrained." Over 100 House members have co-sponsored an impeachment resolution against Secretary Noem.',
      crux: {
        id: "training-standards",
        title: "Training and Rules of Engagement Audit",
        description:
          "Independent review of CBP/ICE training standards and rules of engagement compared to local police departments.",
        methodology:
          "Compare use-of-force training hours, de-escalation requirements, and accountability mechanisms between federal immigration enforcement and accredited police departments.",
        equation:
          "R_{force} = \\frac{\\text{incidents}_{fatal}}{\\text{encounters}_{total}} \\times 10^6",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Independent audit)",
      },
    },
  ],
};
