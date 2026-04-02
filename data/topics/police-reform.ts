import type { Topic } from "@/lib/schemas/topic";

export const policeReformData = {
  id: "police-reform",
  title: "Policing Reform in America",
  meta_claim:
    "American policing requires fundamental structural reform — including significant reallocation of funding to social services — to improve public safety outcomes.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "use-of-force-accountability",
      title: "Use of Force & Accountability",
      short_summary:
        "U.S. police kill roughly 1,100 people per year. Germany, with a quarter of the population, averages about 10. The gap demands explanation.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The vast majority of police interactions are lawful and professional. Reform efforts have led to depolicing and crime spikes in cities that defunded. Officers face genuine life-threatening situations daily, and armchair critics underestimate the split-second decisions required.",
      proponent_rebuttal:
        "US police kill approximately 1,100 people annually — far more than any peer nation per capita. Qualified immunity effectively blocks accountability for misconduct. Body camera studies show a 50% reduction in use of force, suggesting that accountability itself changes behavior. The system protects bad actors.",
      crux: {
        id: "accountability-use-of-force-link",
        title: "Accountability–Use of Force Causal Link",
        description:
          "Does increased accountability (body cameras, civilian oversight, qualified immunity reform) causally reduce police use of force without increasing officer risk?",
        methodology:
          "Randomized controlled trials of accountability interventions across jurisdictions, measuring use-of-force incidents, complaints, crime rates, and officer safety outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M (Multi-city randomized controlled trial)",
      },
      evidence: [
        {
          id: "pr-mapping-police-violence",
          title: "Mapping Police Violence Data",
          description:
            "US police killed 1,096 people in 2023. Black people are 2.9x more likely to be killed by police than white people. 98% of police killings from 2013-2023 did not result in officers being charged.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "Mapping Police Violence, Washington Post Fatal Force Database",
          reasoning:
            "Independent data collection verified against official sources. Multiple databases corroborate. Directly measures the phenomena in question.",
        },
        {
          id: "pr-body-camera-rct",
          title: "Body Camera RCT Results",
          description:
            "A randomized controlled trial in Rialto, CA found that body cameras reduced use of force by 50% and citizen complaints by 88%. Multiple follow-up studies confirm directional findings.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Ariel, Farrar & Sutherland, Journal of Quantitative Criminology 2015",
          reasoning:
            "Gold-standard RCT design. Some follow-up studies show smaller effects, reducing replicability score. But directional finding is consistent.",
        },
        {
          id: "pr-defunding-crime-spikes",
          title: "Post-Defunding Crime Spike Data",
          description:
            "Cities that reduced police budgets in 2020 (Minneapolis, Portland, Austin) saw significant increases in violent crime in 2021-2022, though a national crime increase occurred simultaneously.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source: "FBI UCR, Major Cities Chiefs Association",
          reasoning:
            "Data is real but causation is ambiguous — COVID, pandemic economics, and nationwide trends confound. Some defunding cities saw smaller spikes than non-defunding cities.",
        },
        {
          id: "pr-international-comparison",
          title: "International Use of Force Comparisons",
          description:
            "US police kill at a rate 30-60x higher per capita than police in the UK, Germany, Japan, and Australia. These nations have similar crime levels but fundamentally different training and use-of-force standards.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "The Guardian, Amnesty International, national police statistics",
          reasoning:
            "Cross-national comparisons are reliable but the US has uniquely high gun ownership, which complicates direct comparison. Still, the magnitude of difference is striking.",
        },
      ],
    },
    {
      id: "alternative-response-models",
      title: "Alternative Response Models",
      short_summary:
        "Denver's STAR program diverted 2,700+ calls from police in its first year. Zero required police backup. Scale remains the open question.",
      icon_name: "HelpCircle" as const,
      skeptic_premise:
        "Social workers cannot handle dangerous situations. CAHOOTS-style programs work in small, low-crime cities but don't scale to Chicago or Detroit. Removing police from mental health calls shifts risk to untrained responders. Most calls that seem non-violent can escalate without warning.",
      proponent_rebuttal:
        "CAHOOTS in Eugene, OR handles 20% of all calls with zero weapons and over 150 calls per day. Denver's STAR program diverted 2,500+ calls from police with zero arrests needed. Analysis of 911 calls shows the majority are non-violent — noise complaints, mental health crises, welfare checks — and do not require armed response.",
      crux: {
        id: "alternative-response-scalability",
        title: "Scalability of Non-Police Response Models",
        description:
          "Can programs like CAHOOTS and STAR scale to large, high-crime cities while maintaining safety outcomes?",
        methodology:
          "Phased implementation studies in large cities, comparing outcomes (safety incidents, call resolution, cost) between traditional police response and alternative response teams.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$10M (Multi-city phased implementation study)",
      },
      evidence: [
        {
          id: "pr-cahoots-outcomes",
          title: "CAHOOTS Outcome Data",
          description:
            "CAHOOTS in Eugene, OR has operated since 1989, handles 20% of 911 calls, responds to 150+ calls/day with unarmed teams, and requests police backup on less than 1% of calls.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "White Bird Clinic, Eugene Police Department records",
          reasoning:
            "30+ years of operational data is compelling. But Eugene is a small, predominantly white city — generalizability to larger, more diverse cities is unproven.",
        },
        {
          id: "pr-denver-star",
          title: "Denver STAR Pilot Results",
          description:
            "Denver's Support Team Assisted Response (STAR) program diverted 2,500+ calls in its first year with zero arrests, zero use of force, and no injuries. Cost per call was 60% less than police response.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "Denver Department of Public Safety, Stanford Evaluation",
          reasoning:
            "Independent Stanford evaluation adds credibility. Pilot phase only — small scale and carefully selected call types. But results are striking.",
        },
        {
          id: "pr-911-call-analysis",
          title: "911 Call Type Analysis",
          description:
            "Analysis of 911 call data across major cities shows that only 4-7% of calls involve violent crime in progress. The majority are noise complaints, traffic incidents, mental health crises, and non-emergency welfare checks.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Vera Institute of Justice, NYT analysis of 10M+ 911 calls",
          reasoning:
            "Large-sample data analysis from multiple cities. Categorization of 'violent' vs. 'non-violent' calls involves judgment, but the broad pattern is consistent.",
        },
        {
          id: "pr-failed-defunding",
          title: "Failed Defunding Implementation Case Studies",
          description:
            "Minneapolis, Portland, and Austin all reversed police budget cuts within 1-2 years after crime increases and political backlash. Implementation was often chaotic, with cuts made before alternatives were in place.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Local government records, journalistic investigations",
          reasoning:
            "Documented policy reversals. However, critics argue the failure was in implementation (cutting before building alternatives), not in the concept of reallocation itself.",
        },
      ],
    },
  ],
};
