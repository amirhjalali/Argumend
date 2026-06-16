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
        "The smartphone-mental health link is weaker than headlines suggest. Large correlational analyses find associations in the r = 0.05-0.15 range — in Orben and Przybylski's specification-curve work, the association between screen time and adolescent wellbeing was comparable in magnitude to eating potatoes or wearing glasses, explaining at most ~0.4% of variance. The youth mental health crisis predates smartphone saturation in some accounts and has multiple plausible causes: rising economic inequality, academic pressure intensification, COVID-19 isolation, and increased awareness and diagnosis of mental health conditions. The evidence from school-hours phone restrictions is mixed — France's school ban produced documented behavioral and some mental-health benefits in later evaluations, but school-only bans leave most out-of-school use untouched, so they do not cleanly test the broader hypothesis. Basing population-level policy primarily on a contested correlation with small average effect sizes risks ineffective regulation that distracts from more impactful interventions.",
      proponent_rebuttal:
        "The effect-size dismissal is misleading because the most-cited critiques measure undifferentiated 'screen time hours' rather than specific mechanisms; total screen time is a noisy proxy that likely dilutes real effects of social media in particular. The correlation between smartphone/social-media adoption and teen mental health deterioration is broadly consistent across several Anglosphere and Nordic countries, with inflection points clustering around 2012-2014. The US Surgeon General issued a formal advisory in 2023 calling social media a 'profound risk' to youth mental health. CDC Youth Risk Behavior Survey data show persistent sadness or hopelessness among US teen girls rising from 36% (2011) to 57% (2021), and CDC vital-statistics data show the suicide rate for girls aged 10-14 more than doubling over roughly the same period — increases steep enough to be hard to explain by gradual social trends alone. Haidt and colleagues also catalog 22 experimental studies (16 finding significant harm); social-media-reduction experiments tend to improve mood, though the experimental literature is itself contested and many studies are methodologically weak.",
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
          title: "CDC Data Shows Teen Girls' Persistent Sadness Rose From 36% to 57% (2011-2021)",
          description:
            "The CDC Youth Risk Behavior Survey shows persistent feelings of sadness or hopelessness among US high school girls increased from 36% in 2011 to 57% in 2021 (a ~58% relative rise). Note this self-reported measure indexes sadness/hopelessness, not a clinical depression diagnosis. Seriously considering suicide rose from 19% to 30% among girls, and attempted suicide from roughly 10% to 13%. For boys, persistent sadness increased from 21% to 29%. The timing coincides with mass smartphone adoption among adolescents, which crossed 50% around 2012-2013 — a temporal correlation, not by itself evidence of causation.",
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
            "Amy Orben and Andrew Przybylski's large-scale specification-curve analyses, published in Nature Human Behaviour (2019) and Psychological Science (2019), found that the association between digital technology use and adolescent wellbeing is statistically significant but practically tiny — explaining at most about 0.4% of variation in wellbeing. They illustrated this by noting that wearing glasses and regularly eating potatoes had associations with adolescent wellbeing comparable to or larger than screen time, arguing that public discourse overstates the smartphone-mental health connection. Critics counter that undifferentiated 'screen time' and self-report time-use measures may obscure harms specific to social media.",
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
        "The 'many possible causes' argument risks being unfalsifiable — there will always be additional correlating factors, and few of the proposed alternatives (financial crisis, academic pressure) show the same sharp post-2012 inflection or the same cross-national pattern. What makes the smartphone hypothesis comparatively specific is its timing: inflection points cluster across several Anglosphere and Nordic countries with very different economic conditions, education systems, and safety nets. That clustering is hard to fully explain through country-specific economic or policy factors and is at least consistent with the near-simultaneous global rollout of front-facing cameras and algorithmic social feeds — though critics note the cross-national data are noisier and less uniform than advocates suggest, and some countries fit poorly. Supporters also point to dose-response patterns (heavier social-media use correlating with worse outcomes) and reduction experiments showing improvement, while acknowledging that observational dose-response is confounded and the experimental literature is contested.",
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
          source: "Rausch & Haidt, \"The Teen Mental Health Crisis is International, Part 1: The Anglosphere,\" After Babel (March 29, 2023)",
          sourceUrl: "https://www.afterbabel.com/p/international-mental-illness-part-one",
          reasoning:
            "The cross-national pattern is a genuinely strong argument for the smartphone hypothesis. However, independence is lower because Haidt and Twenge are prominent advocates for the smartphone-harm thesis and may have selected countries and metrics that support their conclusion. The publication venue (Substack) for some of this work is less rigorous than peer-reviewed journals.",
        },
        {
          id: "france-school-phone-ban-results",
          title: "France's 2018 School Phone Ban: A School-Only Restriction With Limited Scope",
          description:
            "France implemented a nationwide ban on smartphone use in schools in 2018 (kindergarten through 9th grade). The ban improved classroom behavior and attention, and some later quasi-experimental evaluations report modest benefits — including reduced bullying and lower health-care take-up for psychological symptoms among girls. But because the ban only covers school hours, while most social-media use occurs outside school, it cannot test whether smartphone ownership drives the broader mental-health crisis. It is therefore weak evidence on either side: neither a clean demonstration that restrictions help population mental health, nor that smartphones are harmless.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source: "French Ministry of Education; Le Monde; Norwegian School of Economics working paper (Abrahamsson, 2024, school phone bans and outcomes)",
          sourceUrl: "https://www.lemonde.fr/en/france/article/2023/09/13/phones-in-school-what-assessment-after-five-years-of-ban_6134567_7.html",
          reasoning:
            "Reframed: the earlier claim that French mental-health data showed 'no improvement' is contradicted by later quasi-experimental evaluations finding modest benefits, so it cannot stand as evidence against the smartphone-harm thesis. The genuine limitation is scope: a school-hours-only ban (~7 of 16 waking hours) is a poor test of the ownership-restriction hypothesis. Directness lowered because this natural experiment speaks only indirectly to the meta_claim about banning ownership.",
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
        "Voluntary approaches have been tried for a decade and failed. The Wait Until 8th pledge has garnered widespread attention but minimal compliance because the coordination problem is mathematically unsolvable through voluntary action — each family faces a prisoner's dilemma where defection (getting the phone) dominates regardless of what others do. Australia's under-16 social media ban, which commenced enforcement in December 2025, demonstrates that democratic governments can implement age-based technology restrictions at scale. Enforcement need not be perfect to be effective — age verification at the platform level, combined with retailer requirements similar to alcohol and tobacco sales, would substantially reduce childhood smartphone access even with imperfect compliance. The argument that children 'need' smartphones for safety ignores that basic phones with calling and GPS but no internet access serve the safety function without the harmful features.",
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
          title: "Australia Enacts and Begins Enforcing Social Media Ban for Under-16s (2024-2025)",
          description:
            "Australia's parliament passed the Online Safety Amendment (Social Media Minimum Age) Act in late November 2024 (assent December 2024), and the ban commenced on 10 December 2025. It bars under-16s from holding accounts on platforms including TikTok, Instagram, Facebook, Snapchat, X, Reddit, Threads, Twitch and Kick (YouTube's status shifted during rollout), placing enforcement on platforms — with fines up to ~A$50M — rather than on parents or children. In the first days of enforcement, platforms reported removing or restricting around 4.7 million under-16 accounts. It is the strongest government intervention on children's technology access in any Western democracy, though its effect on mental-health outcomes has not yet been evaluated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Online Safety Amendment (Social Media Minimum Age) Act 2024 (Cth), Federal Register of Legislation; Australian eSafety Commissioner (ban commenced 10 December 2025)",
          sourceUrl: "https://www.legislation.gov.au/C2024A00127/asmade/text",
          reasoning:
            "Provides a real, now-operational legislative precedent from a major democracy, demonstrating that age-based platform restrictions are politically and technically implementable. Directness is moderate because the law targets social-media accounts, not smartphone ownership (the meta_claim), and its mental-health effectiveness is still untested. Age-verification accuracy and circumvention (VPNs, false ages) remain open questions.",
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
