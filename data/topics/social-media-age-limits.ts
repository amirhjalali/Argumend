import type { Topic } from "@/lib/schemas/topic";

export const socialMediaAgeLimitsData = {
  id: "social-media-age-limits",
  title: "Social Media Age Limits",
  meta_claim:
    "Children under 16 should be legally prohibited from using social media platforms.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "mental-health-impact",
      title: "Mental Health Impact",
      short_summary:
        "Evidence on whether social media causally harms children's mental health, particularly for adolescents under 16.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Correlation isn't causation; teen mental health was declining before social media became widespread. Economic anxiety, academic pressure, and reduced outdoor play also increased. Bans push kids to less safe, unmoderated platforms. Most studies rely on self-reported screen time, which is unreliable.",
      proponent_rebuttal:
        "Jonathan Haidt's comprehensive review in 'The Anxious Generation' documents the sharp inflection in teen mental health precisely when smartphone/social media adoption hit critical mass (2012). The US Surgeon General's 2023 advisory specifically cited sufficient evidence of harm. Internal Facebook research (leaked by Frances Haugen) showed Instagram makes body image worse for 1 in 3 teen girls. Delay-of-smartphone initiatives in schools show measurable improvements in attention and wellbeing.",
      crux: {
        id: "causal-mechanism-study",
        title: "Randomized Social Media Abstinence Trial",
        description:
          "A properly controlled trial where teens are randomly assigned to abstain from social media for 6+ months, with mental health measured via clinical instruments rather than self-report.",
        methodology:
          "Recruit 5,000 teens aged 13-16. Randomly assign to social media abstinence (with device-level enforcement) or control. Measure depression (PHQ-A), anxiety (GAD-7), self-esteem, and sleep quality at baseline, 3 months, and 6 months.",
        equation:
          "\\Delta MH_{abstain} - \\Delta MH_{control} = \\tau_{causal}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$15M (Large-scale RCT with enforcement technology)",
      },
      evidence: [
        {
          id: "surgeon-general-advisory",
          title: "US Surgeon General Advisory on Youth Mental Health (2023)",
          description:
            "Surgeon General Vivek Murthy issued a formal advisory stating social media presents 'a profound risk of harm' to children. Called for warning labels similar to tobacco. Based on review of available evidence showing associations with depression, anxiety, and body image issues.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "US Surgeon General's Office",
          reasoning:
            "Highest-level public health advisory; carefully worded but stops short of claiming causation.",
        },
        {
          id: "haidt-anxious-generation",
          title: "Haidt's 'The Anxious Generation' Meta-Analysis",
          description:
            "Jonathan Haidt documents that teen depression increased 150% for girls and 50% for boys between 2010-2021, with the inflection point matching smartphone saturation. International data from 7 countries shows the same pattern.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Jonathan Haidt, 'The Anxious Generation' (2024)",
          reasoning:
            "Comprehensive but authored by an advocate; some peer reviewers dispute the causal framing.",
        },
        {
          id: "australia-age-verification",
          title: "Australia Passes Social Media Ban for Under-16s",
          description:
            "Australia passed legislation in 2024 banning children under 16 from social media. Implementation details and effectiveness data are still emerging. Platform compliance mechanisms remain uncertain.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "Australian Parliament, eSafety Commissioner",
          reasoning:
            "Democratic nation acted on the evidence; too early for effectiveness data.",
        },
        {
          id: "teen-self-report-surveys",
          title: "Teens Self-Report Both Harms and Benefits",
          description:
            "Pew Research surveys show 46% of teens say social media makes them feel worse, but 44% say it makes them feel better, and 80% say it helps them feel more connected to friends. LGBTQ+ youth particularly value online community access.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Pew Research Center (2023)",
          reasoning:
            "Large-scale, independent survey data that complicates the 'purely harmful' narrative.",
        },
      ],
    },
    {
      id: "enforcement-rights",
      title: "Enforcement & Rights",
      short_summary:
        "Age verification requires either collecting IDs (a privacy nightmare) or trusting self-reported birthdays (which no teenager has ever lied about).",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Age verification requires invasive ID checks that violate privacy for all users, not just children. Teens will circumvent any ban using VPNs, fake birthdays, or parents' accounts. Government shouldn't decide what children can access — that's a parental decision.",
      proponent_rebuttal:
        "We already age-gate alcohol, driving, gambling, and voting. Imperfect enforcement doesn't mean we abandon the principle — underage drinking laws reduce teen alcohol use despite circumvention. Age estimation technology (facial analysis, device attestation) offers privacy-preserving approaches. Parents need legal backing because individual parents can't enforce rules when all peers are on platforms.",
      crux: {
        id: "enforcement-effectiveness",
        title: "Age Verification Effectiveness Study",
        description:
          "Measuring what percentage of underage users are actually prevented from accessing platforms under various age verification regimes.",
        methodology:
          "Audit compliance rates across age verification methods: self-declared age, ID verification, facial age estimation, and device-level parental controls. Measure circumvention rates by age group.",
        equation:
          "E_{compliance} = 1 - \\frac{N_{underage\\_active}}{N_{underage\\_total}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Multi-platform audit study)",
      },
      evidence: [
        {
          id: "australia-implementation",
          title: "Australia's Age Verification Pilot Data",
          description:
            "Australia's eSafety Commissioner trials showed facial age estimation correctly identifies under-16s 95% of the time, but privacy advocates raised concerns about biometric data collection and algorithmic bias against non-white faces.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source: "Australian eSafety Commissioner (2024)",
          reasoning:
            "Government-commissioned pilot; promising but limited sample and context.",
        },
        {
          id: "coppa-effectiveness",
          title: "COPPA Has Been Largely Ineffective",
          description:
            "The Children's Online Privacy Protection Act (1998) requires parental consent for under-13s. Studies show 53% of children under 13 use social media anyway, mostly by lying about age. Platforms have little incentive to enforce strictly.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Common Sense Media, FTC Reports",
          reasoning:
            "25 years of evidence that age-based online restrictions are difficult to enforce.",
        },
        {
          id: "age-verification-tech",
          title: "Age Verification Technology Is Rapidly Improving",
          description:
            "Companies like Yoti and SuperAwesome offer facial age estimation with 98%+ accuracy for adults vs. children. Device-level attestation (Apple, Google) can verify age without sharing personal data with platforms.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 7,
          },
          source: "Yoti, SuperAwesome, IEEE Reviews",
          reasoning:
            "Industry sources with commercial interests; independent verification needed.",
        },
        {
          id: "circumvention-rates",
          title: "Teen Circumvention of Existing Restrictions Is High",
          description:
            "Surveys indicate 67% of teens know how to bypass parental controls and age restrictions. VPN usage among teens doubled from 2020 to 2024. Any ban creates a cat-and-mouse dynamic.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "National Cyber Security Centre (UK), Bark Technologies",
          reasoning:
            "Practical evidence of enforcement challenges from multiple jurisdictions.",
        },
      ],
    },
  ],
};
