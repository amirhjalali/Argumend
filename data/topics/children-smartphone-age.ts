import type { Topic } from "@/lib/schemas/topic";

export const childrenSmartphoneAgeData = {
  id: "children-smartphone-age",
  title: "Smartphone Age Restrictions for Children",
  meta_claim:
    "Children under 14 should be prohibited from owning smartphones, as the developmental harms of constant connectivity, social media, and algorithmic content outweigh the benefits of access and safety.",
  status: "contested" as const,
  category: "technology" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "The Anxious Generation — Jonathan Haidt",
      url: "https://www.anxiousgeneration.com/",
    },
    {
      title: "Social Media and Youth Mental Health — US Surgeon General Advisory",
      url: "https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html",
    },
    {
      title: "Smartphones and Adolescent Mental Health — Annual Review of Psychology",
      url: "https://www.annualreviews.org/doi/10.1146/annurev-psych-032620-035916",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does the evidence support a causal link between smartphones and the youth mental health crisis?",
      content:
        "Jonathan Haidt's 'The Anxious Generation' argues that smartphones caused the teen mental health crisis beginning around 2012. Critics like Candice Odgers argue the correlation is weak, effect sizes are tiny, and the crisis has multiple drivers including economic anxiety, academic pressure, and COVID. Should policy be based on this contested evidence?",
    },
    {
      id: "q2",
      title: "Can parents effectively restrict smartphone use without government mandates?",
      content:
        "Parental controls exist, but the collective action problem is real: a child without a smartphone is socially excluded when every peer has one. Is this a coordination failure that justifies government intervention, or should families make their own decisions?",
    },
    {
      id: "q3",
      title: "What is the right age threshold, and should it target phones or features?",
      content:
        "Is the problem the device itself, or specific features like algorithmic feeds, notifications, and social media? Would banning smartphones but allowing basic phones solve the problem? Should regulation target addictive design features rather than hardware ownership?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Developmental Harm Evidence
    // =========================================================================
    {
      id: "developmental-harm-evidence",
      title: "Developmental Harm & Mental Health",
      short_summary:
        "Rises in teen anxiety, depression, self-harm, and suicide correlate temporally with smartphone adoption beginning around 2012. The question is whether this correlation reflects causation, and whether the effect sizes are large enough to justify population-level interventions.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The smartphone-mental health link is weaker than headlines suggest. Meta-analyses find effect sizes in the r = 0.05-0.15 range — comparable to the correlation between eating potatoes and suicide. Andrew Przybylski's research at Oxford shows that the association between screen time and wellbeing is smaller than the effect of wearing glasses or eating breakfast regularly. The youth mental health crisis predates smartphone saturation in many countries and has multiple plausible causes: rising economic inequality, academic pressure intensification, COVID-19 isolation, and increased awareness and diagnosis of mental health conditions. Countries that restricted phone access (like France's school phone ban) have not seen mental health improvements. Basing policy on a contested correlation with small effect sizes is a recipe for ineffective regulation that distracts from more impactful interventions.",
      proponent_rebuttal:
        "The effect-size dismissal is misleading because it treats smartphones as a binary variable (screen time hours) rather than examining specific mechanisms. The correlation between smartphone adoption and teen mental health deterioration is remarkably consistent across multiple countries with different cultures, education systems, and economic conditions — all showing the same inflection point around 2012-2014. The US Surgeon General issued a formal advisory in 2023 declaring social media a 'profound risk' to youth mental health. Jean Twenge's analysis of CDC Youth Risk Behavior Survey data shows teen girls' depression rates increased 65% and suicide rates 70% between 2011-2019 — a pace and magnitude inconsistent with gradual social trends. Experimental studies show acute negative mood effects from social media use, particularly from social comparison and algorithmic amplification of distressing content.",
      crux: {
        id: "causal-mechanism-identification",
        title: "The Causal Mechanism Study",
        description:
          "The crux is whether specific smartphone features — algorithmic feeds, notification interruptions, social comparison dynamics, sleep disruption from blue light and engagement — causally harm adolescent development, or whether the observed correlation reflects confounding variables. Identifying or ruling out specific causal mechanisms would resolve the core scientific disagreement.",
        methodology:
          "Conduct a randomized controlled trial where 1,000 adolescents are assigned to one of four conditions for 12 months: (1) full smartphone access, (2) smartphone with social media and algorithmic feeds blocked, (3) basic phone only, (4) no phone. Measure mental health outcomes (PHQ-A, GAD-7), sleep quality, academic performance, social connectedness, and biomarkers of stress (cortisol, inflammatory markers) at baseline, 6 months, and 12 months. This would isolate the effect of specific features versus the device itself.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$3-8M (Large-scale randomized controlled trial with biomarker analysis)",
      },
      evidence: [
        {
          id: "cdc-youth-mental-health-data",
          title: "CDC Data Shows 65% Increase in Teen Girl Depression (2011-2019)",
          description:
            "The CDC Youth Risk Behavior Survey shows persistent feelings of sadness or hopelessness among US high school girls increased from 36% in 2011 to 57% in 2021. Suicide attempts among teen girls rose from 10% to 13% over the same period. For boys, persistent sadness increased from 21% to 29%. The timing coincides with mass smartphone adoption among adolescents, which crossed 50% in 2012-2013.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Centers for Disease Control and Prevention; Youth Risk Behavior Survey",
          sourceUrl: "https://www.cdc.gov/healthyyouth/data/yrbs/index.htm",
          reasoning:
            "CDC data is nationally representative and methodologically rigorous, making it highly reliable. However, the temporal correlation between smartphone adoption and mental health decline does not establish causation — the directness score is lower because multiple simultaneous factors (opioid crisis, economic anxiety, school shootings, COVID) could contribute to the trend.",
        },
        {
          id: "przybylski-small-effects",
          title: "Oxford Meta-Analysis Finds Small Effect Sizes for Screen Time and Wellbeing",
          description:
            "Andrew Przybylski and Amy Orben's large-scale analyses using Psychological Science (2019) and Nature Human Behaviour (2021) found that the association between screen time and adolescent wellbeing is statistically significant but practically small — explaining less than 0.4% of variation in wellbeing. They found that wearing glasses and eating potatoes had comparable or larger associations with adolescent wellbeing than screen time, suggesting the public discourse vastly overstates the smartphone-mental health connection.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Nature Human Behaviour; Psychological Science",
          sourceUrl: "https://www.nature.com/articles/s41562-018-0506-1",
          reasoning:
            "Published in top-tier journals with large sample sizes and pre-registered analyses, this is methodologically strong research. However, the critique focuses on total screen time as a variable, which may miss the specific mechanisms (social media comparison, algorithmic feeds, notification patterns) that cause harm — the 'screen time' measure may be too crude to capture what matters.",
        },
        {
          id: "surgeon-general-advisory-2023",
          title: "US Surgeon General Issues Advisory on Social Media and Youth Mental Health (2023)",
          description:
            "In May 2023, US Surgeon General Vivek Murthy issued a formal advisory declaring social media a 'profound risk of harm' to children and adolescents. The advisory cited evidence of associations between social media use and anxiety, depression, poor sleep, body image issues, and exposure to harmful content. While acknowledging that the evidence does not establish causation, the advisory argued that the weight of evidence justifies precautionary action.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "US Surgeon General; Department of Health and Human Services",
          sourceUrl: "https://www.hhs.gov/surgeongeneral/priorities/youth-mental-health/social-media/index.html",
          reasoning:
            "The Surgeon General's advisory carries institutional weight and synthesizes a broad evidence base. However, advisories are policy recommendations, not scientific findings — the independence score reflects that the advisory acknowledges evidence limitations while still recommending action, which is a judgment call rather than a scientific conclusion.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Methodological Skepticism
    // =========================================================================
    {
      id: "methodological-skepticism",
      title: "Methodological Skepticism & Alternative Explanations",
      short_summary:
        "Critics argue that the smartphone-harm narrative relies on correlational data with small effect sizes, ignores alternative explanations for the youth mental health crisis, and risks diverting resources from more impactful interventions like mental health services and economic support.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The case for smartphone bans rests on a post-hoc narrative that mistakes correlation for causation. The 2012 inflection point coincides not just with smartphones but with the aftermath of the 2008 financial crisis reaching full impact on families, intensifying academic competition as college became more expensive and more necessary, rising awareness of school shootings after Sandy Hook, the opioid crisis devastating communities nationwide, and growing climate anxiety among young people. Attributing a complex multi-causal phenomenon to a single technology is intellectually lazy and politically convenient — it gives parents and policymakers a visible villain instead of addressing structural problems that are harder to solve.",
      proponent_rebuttal:
        "The 'many possible causes' argument is unfalsifiable — there will always be additional correlating factors. What makes the smartphone hypothesis compelling is its specificity: the inflection point is remarkably consistent across countries with very different economic conditions, education systems, and policy environments. Nordic countries with strong social safety nets, universal healthcare, and low economic inequality show the same 2012-2014 mental health deterioration as the US. This cross-national consistency is hard to explain through country-specific economic or policy factors but is perfectly consistent with the simultaneous global adoption of smartphones with front-facing cameras and algorithmic social media feeds. The effect is also dose-dependent: heavier social media use correlates with worse mental health outcomes across studies, and experimental withdrawal studies show improvement.",
      crux: {
        id: "cross-national-natural-experiment",
        title: "The Cross-National Adoption Timing Analysis",
        description:
          "The crux is whether countries with different smartphone adoption timelines show mental health deterioration that tracks with smartphone adoption rather than other potential causal factors. If countries that adopted smartphones later show later-onset mental health decline, the causal case strengthens substantially. If the timing of mental health decline varies independently of smartphone adoption, alternative explanations are more plausible.",
        methodology:
          "Conduct a comparative analysis across 30+ countries with documented differences in smartphone adoption timing and saturation rates. Map the onset of adolescent mental health deterioration in each country against smartphone adoption curves, controlling for economic conditions, social safety net strength, education system characteristics, and other potential confounders. Use Granger causality tests and difference-in-differences designs exploiting natural variation in adoption timing.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Multi-national comparative epidemiological analysis)",
      },
      evidence: [
        {
          id: "cross-national-consistency",
          title: "Youth Mental Health Decline Is Consistent Across Diverse Nations",
          description:
            "Research by Jean Twenge and Jonathan Haidt shows that the adolescent mental health decline beginning around 2012 is remarkably consistent across the US, UK, Canada, Australia, Scandinavia, and other developed nations — countries with vastly different economic conditions, healthcare systems, gun policies, and social safety nets. This cross-national consistency is difficult to explain through country-specific factors but aligns with the global, simultaneous adoption of smartphones and algorithmic social media.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Journal of Adolescence; Haidt & Twenge collaborative research",
          sourceUrl: "https://www.afterbabel.com/p/international-mental-health",
          reasoning:
            "The cross-national pattern is a genuinely strong argument for the smartphone hypothesis. However, independence is lower because Haidt and Twenge are prominent advocates for the smartphone-harm thesis and may have selected countries and metrics that support their conclusion. The publication venue (Substack) for some of this work is less rigorous than peer-reviewed journals.",
        },
        {
          id: "france-school-phone-ban-results",
          title: "France's 2018 School Phone Ban Shows Limited Mental Health Impact",
          description:
            "France implemented a nationwide ban on smartphone use in schools in 2018. While the ban improved classroom behavior and attention, French adolescent mental health data has not shown significant improvement in the years since implementation. This suggests that school-only restrictions may be insufficient because most social media use occurs outside school hours, or that smartphones are not the primary driver of the mental health crisis.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "French Ministry of Education; Le Monde; European Journal of Education",
          sourceUrl: "https://www.lemonde.fr/en/france/article/2023/09/13/phones-in-school-what-assessment-after-five-years-of-ban_6134567_7.html",
          reasoning:
            "France's experience provides a natural experiment, though the ban only covers school hours (roughly 7 hours of a 16-hour waking day), limiting its ability to test the broader smartphone-harm hypothesis. The absence of improvement may indicate that the ban was too narrow rather than that smartphones are harmless.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Collective Action Problem
    // =========================================================================
    {
      id: "collective-action-problem",
      title: "The Collective Action Problem",
      short_summary:
        "Individual families cannot effectively restrict smartphone use when every peer has one. A child without a smartphone faces social exclusion, missed communications, and safety concerns. Government intervention may be the only way to solve this coordination failure, but it raises concerns about state overreach into parenting decisions.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The collective action problem is real but government mandates are the wrong solution. Smartphone bans for children under 14 would be practically unenforceable — would retailers check IDs? Would police confiscate phones from 13-year-olds? The enforcement mechanisms would either be toothless or invasive. More importantly, a blanket age-based ban treats smartphones as uniformly harmful, ignoring that many children use phones productively for education, creative expression, navigation, and emergency safety. Community-based solutions — phone-free schools, parent pledges like Wait Until 8th, and design regulations targeting addictive features — address the problem without the blunt instrument of government prohibition.",
      proponent_rebuttal:
        "Voluntary approaches have been tried for a decade and failed. The Wait Until 8th pledge has garnered widespread attention but minimal compliance because the coordination problem is mathematically unsolvable through voluntary action — each family faces a prisoner's dilemma where defection (getting the phone) dominates regardless of what others do. Australia's 2024 social media ban for under-16s demonstrates that democratic governments can implement age-based technology restrictions. Enforcement need not be perfect to be effective — age verification at the platform level, combined with retailer requirements similar to alcohol and tobacco sales, would substantially reduce childhood smartphone access even with imperfect compliance. The argument that children 'need' smartphones for safety ignores that basic phones with calling and GPS but no internet access serve the safety function without the harmful features.",
      crux: {
        id: "voluntary-vs-mandate-effectiveness",
        title: "The Voluntary vs. Mandate Comparison",
        description:
          "The crux is whether voluntary community-based approaches can achieve sufficient participation to solve the collective action problem, or whether government mandates are necessary. If voluntary programs can achieve 70%+ adoption in communities (creating a critical mass that eliminates the social exclusion penalty), mandates are unnecessary. If voluntary adoption plateaus below effective thresholds, mandates become the only viable solution.",
        methodology:
          "Study communities where voluntary phone-free initiatives (Wait Until 8th, school-based programs) have been implemented for 2+ years. Measure adoption rates, sustainability, and whether critical mass was achieved. Compare child mental health outcomes in high-adoption communities versus comparable control communities. Simultaneously study early outcomes from Australia's under-16 social media ban to assess government mandate effectiveness.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$400K-1M (Community comparison study with longitudinal mental health tracking)",
      },
      evidence: [
        {
          id: "australia-social-media-ban",
          title: "Australia Passes Social Media Ban for Children Under 16 (2024)",
          description:
            "In November 2024, Australia passed the Online Safety Amendment (Social Media Minimum Age) Bill, banning social media access for children under 16. The law places enforcement responsibility on platforms rather than parents or children, requiring age verification systems. While implementation details are still being developed, the legislation represents the strongest government intervention on children's technology access in any Western democracy.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Australian Parliament; The Guardian; ABC News Australia",
          sourceUrl: "https://www.theguardian.com/australia-news/2024/nov/28/australia-social-media-ban-under-16s-passes-senate",
          reasoning:
            "This provides a real legislative precedent from a major democracy. However, the law has not yet been fully implemented or evaluated, so its effectiveness remains untested. The enforcement mechanism (platform-level age verification) faces technical challenges that could limit its practical impact.",
        },
        {
          id: "wait-until-8th-adoption-limits",
          title: "Wait Until 8th Pledge Shows Promise but Limited Adoption",
          description:
            "The Wait Until 8th campaign asks parents to pledge not to give their children smartphones until 8th grade (age 13-14). While the campaign has received significant media attention and endorsements from prominent pediatricians and educators, actual participation has been limited to a small fraction of families in participating schools. The campaign illustrates both the appeal and the limitations of voluntary coordination: most families agree in principle but defect in practice because they cannot guarantee sufficient peer participation.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source: "Wait Until 8th organization; The New York Times",
          sourceUrl: "https://www.waituntil8th.org/",
          reasoning:
            "The campaign directly tests the voluntary coordination approach and provides evidence of its limitations. However, source reliability is lower because adoption data is self-reported by the organization, and there are no rigorous studies of the campaign's actual participation rates or outcomes.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
