import type { Topic } from "@/lib/schemas/topic";

export const gunControlEffectivenessData = {
  id: "gun-control-effectiveness",
  title: "Gun Control Effectiveness",
  meta_claim:
    "Stricter gun control laws significantly reduce gun violence and mass shootings.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "international-comparison",
      title: "International Comparisons",
      short_summary:
        "Countries with stricter gun laws have dramatically lower rates of gun deaths.",
      image_url:
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        'Comparing the US to other countries ignores unique factors: 400M existing guns, constitutional protections, cultural differences, gang violence concentrated in specific areas. Switzerland has high gun ownership with low violence. Criminals don\'t follow laws.',
      proponent_rebuttal:
        "Australia's 1996 gun buyback saw mass shootings drop to near zero. Japan, UK, and most of Europe have strict laws and far fewer gun deaths per capita. The \"criminals don't follow laws\" argument applies to all laws; we don't abandon murder laws because murderers break them.",
      crux: {
        id: "natural-experiment",
        title: "Policy Change Natural Experiments",
        description:
          "Study jurisdictions before and after significant gun law changes to measure causal impact.",
        methodology:
          "Compare gun death rates before/after policy changes (Australia 1996, Connecticut 1995, Missouri 2007 repeal) using synthetic control methods.",
        equation: "\\Delta_{violence} = \\beta \\cdot \\Delta_{policy} + \\epsilon",
        verification_status: "verified" as const,
        cost_to_verify: "$100K (Econometric analysis of existing data)",
      },
      evidence: [
        {
          id: "australia-buyback",
          title: "Australia's Gun Buyback Success",
          description:
            "After the 1996 buyback of 650,000 firearms, Australia has had zero mass shootings (vs. 13 in prior 18 years) and gun homicides dropped 42%.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "JAMA (2016)",
          reasoning: "Natural experiment with clear before/after comparison.",
        },
        {
          id: "international-rates",
          title: "US Gun Death Rate 25x Higher Than Peers",
          description:
            "The US has 12.21 gun deaths per 100K vs. 0.5 in UK, 0.04 in Japan.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "IHME, CDC",
          reasoning: "Clear correlation but causation debated.",
        },
        {
          id: "existing-guns",
          title: "400 Million Guns Already in Circulation",
          description:
            "The US has more guns than people. New laws can't address existing stockpile.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          reasoning: "Practical implementation challenge.",
        },
        {
          id: "defensive-gun-use",
          title: "Defensive Gun Uses Save Lives",
          description:
            "CDC estimates 500K-3M defensive gun uses annually in the US.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          reasoning: "Highly contested estimates with methodological issues.",
        },
      ],
    },
    {
      id: "mass-shooting-prevention",
      title: "Mass Shooting Prevention",
      short_summary: "Can specific policies prevent mass shootings?",
      image_url:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Mass shootings are rare events driven by mental health crises, not gun availability. Determined attackers will find weapons or use other methods (vehicles, bombs). Most mass shooters pass background checks.",
      proponent_rebuttal:
        "Red flag laws, waiting periods, and assault weapon restrictions can prevent impulsive violence. The lethality of attacks depends heavily on weapon type—semi-automatic rifles with high-capacity magazines enable far more casualties than other weapons.",
      crux: {
        id: "assault-weapon-lethality",
        title: "Weapon Type and Casualty Analysis",
        description:
          "Do mass shootings with assault-style weapons result in more casualties than those with other firearms?",
        methodology:
          "Analyze all US mass shootings (4+ victims) by weapon type. Compare average casualties, adjusting for location and response time.",
        equation:
          "E[\\text{casualties} | \\text{AR-style}] vs E[\\text{casualties} | \\text{handgun}]",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (Database analysis)",
      },
      evidence: [
        {
          id: "assault-weapon-casualties",
          title: "Assault Weapons Cause 2x Casualties",
          description:
            "Mass shootings with assault-style rifles average 8.2 deaths vs. 4.4 with other weapons.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "Everytown Research",
          reasoning: "Clear statistical pattern, though advocacy source.",
        },
        {
          id: "red-flag-laws",
          title: "Red Flag Laws Reduce Suicides",
          description:
            "States with Extreme Risk Protection Orders show 5-14% reduction in firearm suicides.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Annals of Internal Medicine",
          reasoning: "Suicides are clearer to study than rare mass shootings.",
        },
        {
          id: "background-check-pass",
          title: "Most Mass Shooters Pass Background Checks",
          description:
            "77% of mass shooters obtained weapons legally or would have passed checks.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          reasoning: "Limits effectiveness of background check expansion.",
        },
        {
          id: "substitute-methods",
          title: "Attackers May Substitute Methods",
          description:
            "Without guns, determined attackers could use vehicles, bombs, or other weapons.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          reasoning:
            "Theoretical concern; evidence suggests guns enable higher casualties.",
        },
      ],
    },
  ],
};
