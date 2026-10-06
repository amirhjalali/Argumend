export const minneapolisShootingData = {
  id: "minneapolis-shooting",
  title: "Minneapolis ICE Shooting",
  question:
    "Did federal agents use excessive force in the fatal Minneapolis shooting?",
  meta_claim:
    "Whether federal agents used excessive force in the fatal shooting of Alex Pretti in Minneapolis on January 24, 2026 is disputed: independent video and eyewitness accounts conflict sharply with the federal self-defense account.",
  status: "contested" as const,
  category: "philosophy" as const,
  pillars: [
    {
      id: "conflicting-accounts",
      title: "Conflicting Official Accounts",
      short_summary:
        "Independently reviewed bystander video and eyewitness accounts conflict with the federal government's description of events.",
      image_url:
        "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=60",
      icon_name: "FileText" as const,
      skeptic_premise:
        'DHS stated that Pretti "approached Border Patrol officers with a handgun" and resisted arrest, and officials framed the shooting as self-defense. DHS Secretary Noem said Pretti arrived "to inflict maximum damage on individuals and to kill law enforcement," and administration figures (including homeland security adviser Stephen Miller) branded him a "domestic terrorist" — a characterization Noem later declined to retract. Border Patrol commander Greg Bovino blamed politicians, journalists, and protesters for "vilifying" agents and called the shooting a "preventable tragedy."',
      proponent_rebuttal:
        "Multiple independent video recordings and eyewitness accounts — reviewed by NPR, Reuters, BBC, the NYT, CNN, and The Guardian — contradict the administration's description, with reviewers reporting Pretti held a phone rather than a gun. Pretti was a Minneapolis VA ICU nurse; Minneapolis Police Chief Brian O'Hara said he held a valid Minnesota permit to carry and was lawfully armed. State and federal investigations are underway, though Minnesota officials say federal agents blocked state access to the scene.",
      crux: {
        id: "body-cam-review",
        title: "The Body Camera Analysis",
        question:
          "Does the full sequence of events back the federal self-defense account, or the bystander video and witnesses?",
        description:
          "Complete body-worn camera footage from federal agents would definitively show the sequence of events and whether force was justified.",
        methodology:
          "Release and analyze complete unedited body camera footage from all agents present. Cross-reference with civilian video timestamps and witness statements.",
        equation:
          "P(\\text{excessive force}) = f(\\text{threat level}, \\text{response proportionality}, \\text{de-escalation attempts})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (Footage exists but access blocked)",
        falsification: {
          supporter_flip:
            "If complete, unedited body-camera footage from every agent present, cross-checked against bystander video timestamps and witness statements, showed Pretti holding a gun and approaching officers as DHS described, the case that the shooting was excessive force would largely fall away.",
          skeptic_flip:
            "A skeptic who accepts the self-defense account should weigh that multiple independent recordings reviewed by NPR, Reuters, BBC, the NYT, CNN and The Guardian show a different sequence than officials described, with reviewers reporting Pretti held a phone rather than a gun, and that he held a valid Minnesota permit to carry.",
          common_ground:
            "Both sides agree federal agents shot and killed Alex Pretti on January 24, 2026, and that agents' body-camera footage exists and bears directly on what happened.",
          live_disagreement:
            "Whether Pretti was holding a gun and posed the threat DHS describes, or held a phone as independent video reviewers report — which complete body-camera footage, cross-checked against bystander video, would show.",
        },
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
          source:
            "NPR, \"Videos and eyewitnesses refute federal account of Minneapolis shooting\" (Jan 25, 2026)",
          sourceUrl:
            "https://www.npr.org/2026/01/25/nx-s1-5687875/minneapolis-shooting-minnesota-ice-alex-pretti-dhs-investigation",
          reasoning:
            "Bystander video reviewed by NPR (and separately by Reuters, BBC, NYT, CNN, The Guardian) shows Pretti holding only a phone, contradicting the DHS account; multiple independent recordings can be cross-referenced.",
        },
        {
          id: "licensed-carrier",
          title: "Pretti Was Licensed to Carry",
          description:
            "Minneapolis Police Chief Brian O'Hara confirmed Pretti held a valid Minnesota permit to carry and had no criminal record, contradicting implications of illegal activity.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 7,
          },
          source:
            "NPR, \"5 things to know about the latest Minneapolis shooting\" (Jan 25, 2026)",
          sourceUrl:
            "https://www.npr.org/2026/01/25/nx-s1-5687361/minneapolis-shooting-latest-alex-pretti",
          reasoning:
            "Official statement by the Minneapolis police chief, verifiable through state permit-to-carry records.",
        },
        {
          id: "bca-blocked",
          title: "State Investigators Blocked from Scene",
          description:
            "Minnesota Bureau of Criminal Apprehension Superintendent Drew Evans said DHS officials blocked BCA agents from the shooting scene despite a judicial warrant.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "The Hill, \"Minnesota official says DHS 'blocked' state bureau from investigating scene of latest shooting\" (Jan 2026)",
          sourceUrl:
            "https://thehill.com/homenews/state-watch/5705051-alex-pretti-federal-shooting-investigation/",
          reasoning:
            "On-record statement from the state BCA superintendent; the fact of blocked access is documented, though it does not by itself establish what the footage shows.",
        },
        {
          id: "dhs-position",
          title: "DHS Claims Self-Defense",
          description:
            "DHS stated Pretti \"approached Border Patrol officers with a handgun\" and resisted arrest; officials framed the shooting as self-defense. Independent video review disputes that he was holding a gun.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 2,
            replicability: 3,
            directness: 7,
          },
          source:
            "NPR, \"Videos and eyewitnesses refute federal account of Minneapolis shooting\" (Jan 25, 2026), reporting the DHS account",
          sourceUrl:
            "https://www.npr.org/2026/01/25/nx-s1-5687875/minneapolis-shooting-minnesota-ice-alex-pretti-dhs-investigation",
          reasoning:
            "DHS is a party to the incident (low independence); its claim that Pretti was armed is contradicted by independently reviewed bystander video, so source reliability is de-rated.",
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
        "Two incidents do not by themselves establish a pattern, and each turned on its own contested facts. Federal agents operate in volatile crowd situations and are authorized to use force when they reasonably perceive a threat; a surge in enforcement amid large protests predictably raises the number of confrontations. Officials say body-camera footage exists and that the agents' accounts should be weighed before judgment.",
      proponent_rebuttal:
        'Two fatal shootings of U.S. citizens in roughly three weeks in one state — Renée Good on January 7 and Alex Pretti on January 24, 2026 — suggest possible systemic issues with training, rules of engagement, or supervision. Governor Tim Walz said Trump should "pull these 3,000 untrained agents out of Minnesota." More than 100 House Democrats co-sponsored a resolution to impeach Secretary Noem after the shooting (the count grew past 150).',
      crux: {
        id: "training-standards",
        title: "Training and Rules of Engagement Audit",
        question:
          "How do CBP and ICE training and rules for using force compare with local police standards?",
        description:
          "Independent review of CBP/ICE training standards and rules of engagement compared to local police departments.",
        methodology:
          "Compare use-of-force training hours, de-escalation requirements, and accountability mechanisms between federal immigration enforcement and accredited police departments.",
        equation:
          "R_{force} = \\frac{\\text{incidents}_{fatal}}{\\text{encounters}_{total}} \\times 10^6",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An independent side-by-side review of use-of-force training hours, de-escalation requirements and accountability mechanisms at CBP, ICE and accredited police departments.",
        },
        cost_to_verify: "$500K (Independent audit)",
        falsification: {
          supporter_flip:
            "If an independent comparison found CBP and ICE use-of-force training hours, de-escalation requirements and accountability mechanisms on par with accredited police departments, the two January shootings would read as separate incidents turning on their own facts rather than a systemic problem.",
          skeptic_flip:
            "A skeptic who sees two unrelated incidents should weigh that two U.S. citizens were shot dead by federal agents in one state within roughly three weeks — Renée Good on January 7 and Alex Pretti on January 24, 2026 — and that if federal training and de-escalation rules fall short of local police standards, the pattern points to training, rules or supervision.",
          common_ground:
            "Both sides agree two U.S. citizens were killed by federal agents in Minnesota in January 2026, during an enforcement surge amid large protests.",
          live_disagreement:
            "Whether two deaths in three weeks reflect gaps in federal training, rules of engagement or supervision, or the predictable result of more confrontations in volatile crowds, each turning on its own contested facts.",
        },
      },
    },
  ],
};
