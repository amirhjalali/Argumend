import type { TopicInput } from "@/lib/schemas/topic";

export const childrenSmartphoneAgeData = {
  id: "children-smartphone-age",
  title: "Smartphone Age Restrictions for Children",
  question: "Should children under 14 be barred from owning smartphones?",
  meta_claim:
    "Children under 14 should be prohibited from owning smartphones, as the harms of a personal, always-connected device in childhood outweigh the benefits of access and safety.",
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
      title: "Annual Research Review: Adolescent mental health in the digital age — Odgers & Jensen, Journal of Child Psychology and Psychiatry (2020)",
      url: "https://doi.org/10.1111/jcpp.13190",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Must an age rule for phones wait until science settles what caused the teen mental-health decline?",
      content:
        "Whether social media caused the rise in teen distress after 2012 is argued on its own map ('Is social media a primary cause of the teen mental health crisis?'). This map asks something narrower: does a rule on owning a device have to wait for that answer, or can harms that come with the phone itself, such as lost sleep and split attention, carry the case on their own?",
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
    // PILLAR 1: Harms From the Device Itself
    // =========================================================================
    {
      id: "developmental-harm-evidence",
      title: "Harms From the Device Itself",
      short_summary:
        "An ownership ban restricts a device, not an app. This pillar asks whether a child with a smartphone sleeps, concentrates and copes worse than one with a basic phone or none, so that the device is the thing worth restricting. Whether social media caused the wider post-2012 decline is a broader question with its own map.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "An ownership ban assumes the smartphone itself is the problem, and the measured associations are small. In Orben and Przybylski's specification-curve work, digital-technology use explained at most ~0.4% of the variance in adolescent wellbeing, comparable in magnitude to eating potatoes or wearing glasses. The decline in youth wellbeing has other plausible causes, from academic pressure to COVID-19 isolation. A ban also removes what the device is good for: children use phones for school, creative expression, navigation and reaching a parent in an emergency. If the harm sits in particular apps or features, barring the whole device aims at the wrong target.",
      proponent_rebuttal:
        "The small-effect figures measure undifferentiated 'screen time hours', a noisy proxy that can dilute what a smartphone adds over a basic phone: feeds, notifications and an always-on connection, including at night. CDC Youth Risk Behavior Survey data show persistent sadness or hopelessness among US teen girls rising from 36% (2011) to 57% (2021), over the years in which smartphone ownership among adolescents crossed 50%. The ban does not need social media to be the main cause of the wider decline; it needs the smartphone to cost a child under 14 more than it gives.",
      crux: {
        id: "causal-mechanism-identification",
        title: "The Smartphone, Basic Phone or No Phone Trial",
        question:
          "Do children with a smartphone fare worse than children with a basic phone or no phone?",
        description:
          "An ownership ban assumes the device carries the harm. Giving comparable children a full smartphone, a smartphone with feeds blocked, a basic phone or no phone would show whether the smartphone itself costs them sleep, mood and attention, whether blocking certain features is enough, or whether the device makes little difference.",
        methodology:
          "Conduct a randomized controlled trial where 1,000 adolescents are assigned to one of four conditions for 12 months: (1) full smartphone access, (2) smartphone with social media and algorithmic feeds blocked, (3) basic phone only, (4) no phone. Measure mental health outcomes (PHQ-A, GAD-7), sleep quality, academic performance, social connectedness, and biomarkers of stress (cortisol, inflammatory markers) at baseline, 6 months, and 12 months. This would isolate the effect of specific features versus the device itself.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A 12-month trial that randomizes 1,000 adolescents to a full smartphone, a phone with social media and algorithmic feeds blocked, a basic phone, or no phone, and measures depression, anxiety, sleep and stress biomarkers.",
        },
        cost_to_verify:
          "$3-8M (Large-scale randomized controlled trial with biomarker analysis)",
        falsification: {
          supporter_flip:
            "If a 12-month trial randomizing 1,000 adolescents to full smartphones, phones with social media and algorithmic feeds blocked, basic phones or no phone found no differences in mental health, sleep or stress markers, the case for barring the device would lose its footing.",
          skeptic_flip:
            "If children randomized to basic phones slept longer and reported less anxiety and depression than peers given full smartphones, with the feeds-blocked group in between, the view that the device itself is not the problem would lose its footing.",
          common_ground:
            "Both sides agree average associations between screen time and wellbeing are small, that much of the experimental literature is contested or methodologically weak, and that a phone has real safety value for a child.",
          live_disagreement:
            "Whether owning a smartphone, rather than a basic phone, harms a child in ways screen-time averages hide, or whether any harm sits in particular apps that a narrower rule could target.",
        },
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
      ],
    },

    // =========================================================================
    // PILLAR 2: Acting Before the Causal Question Closes
    // =========================================================================
    {
      id: "methodological-skepticism",
      title: "Acting Before the Causal Question Closes",
      short_summary:
        "Whether social media caused the youth mental-health decline is argued on its own map ('Is social media a primary cause of the teen mental health crisis?'). Lawmakers setting an ownership age may have to decide before that answer arrives, so this pillar asks a narrower one: did the decline arrive in each country when its children got smartphones, and is that enough to act on?",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "A rule on owning a phone rests on a timing story that other shocks fit too. The 2012 turn also coincides with the aftermath of the 2008 financial crisis, intensifying academic competition and rising awareness of school shootings after Sandy Hook. Pinning a multi-causal shift on one device gives parents and policymakers a visible villain while harder structural causes go unaddressed, and a ban built on that story risks restricting every child's phone for little gain.",
      proponent_rebuttal:
        "Few of the proposed alternatives show the same sharp post-2012 inflection or the same cross-national pattern. Inflection points cluster across several Anglosphere and Nordic countries with very different economies, education systems and safety nets, which fits the spread of smartphones among children better than country-specific causes, though critics note the cross-national data are noisier than advocates suggest and some countries fit poorly. An ownership rule, supporters add, need not wait to learn which feature does the harm: it removes the device that carries all of them.",
      crux: {
        id: "cross-national-natural-experiment",
        title: "The Cross-National Adoption Timing Analysis",
        question:
          "Did each country's youth decline begin when its children got smartphones, or at unrelated times?",
        description:
          "Countries put smartphones in children's hands at different times. A decline that began in each country as its children got smartphones would point at the device an ownership rule targets; an onset that varies independently of adoption would point at other causes.",
        methodology:
          "Conduct a comparative analysis across 30+ countries with documented differences in smartphone adoption timing and saturation rates. Map the onset of adolescent mental health deterioration in each country against smartphone adoption curves, controlling for economic conditions, social safety net strength, education system characteristics, and other potential confounders. Use Granger causality tests and difference-in-differences designs exploiting natural variation in adoption timing.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Timelines for 30+ countries setting when adolescent mental health began to decline against when smartphones saturated, with Granger tests and difference-in-differences that control for economies, safety nets and schooling.",
        },
        cost_to_verify:
          "$500K-1.5M (Multi-national comparative epidemiological analysis)",
        falsification: {
          supporter_flip:
            "If a comparison across 30+ countries found the onset of adolescent mental-health decline varying independently of when children there got smartphones, once economic conditions, safety nets and education systems are controlled for, alternative explanations would gain ground and the case for an ownership ban would weaken.",
          skeptic_flip:
            "If countries whose children got smartphones later also saw their youth mental-health decline begin later, matching each country's adoption year once economies and safety nets are controlled for, the many-causes view would be hard to hold.",
          common_ground:
            "Both sides agree the cross-national data are noisier than advocates sometimes suggest, with some countries fitting poorly, and that observational dose-response patterns are confounded.",
          live_disagreement:
            "Whether the post-2012 decline across countries with different economies points to children owning smartphones, or whether a multi-causal story, from the financial crisis aftermath to academic pressure, explains it better.",
        },
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
          title: "A School-Hours Ban Is a Poor Test of an Ownership Ban",
          description:
            "France implemented a nationwide ban on smartphone use in schools in 2018 (kindergarten through 9th grade), and later quasi-experimental evidence from Norwegian middle schools reports modest benefits from similar policies. But because these bans cover only school hours, while most social-media use occurs outside school, they cannot test whether smartphone ownership drives the broader decline. They are therefore weak evidence on either side of an ownership ban. Whether school-day bans work on their own terms is a separate question with its own map.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source: "Abrahamsson, Norwegian School of Economics Discussion Paper 01/2024; French Ministry of Education",
          sourceUrl: "https://openaccess.nhh.no/nhh-xmlui/bitstream/handle/11250/3119200/DP%2001.pdf?isAllowed=y&sequence=1",
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
        question:
          "Can voluntary pledges reach enough families to work, or does it take a mandate?",
        description:
          "The crux is whether voluntary community-based approaches can achieve sufficient participation to solve the collective action problem, or whether government mandates are necessary. If voluntary programs can achieve 70%+ adoption in communities (creating a critical mass that eliminates the social exclusion penalty), mandates are unnecessary. If voluntary adoption plateaus below effective thresholds, mandates become the only viable solution.",
        methodology:
          "Study communities where voluntary phone-free initiatives (Wait Until 8th, school-based programs) have been implemented for 2+ years. Measure adoption rates, sustainability, and whether critical mass was achieved. Compare child mental health outcomes in high-adoption communities versus comparable control communities. Simultaneously study early outcomes from Australia's under-16 social media ban to assess government mandate effectiveness.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Adoption rates and child mental-health outcomes in communities that have run Wait Until 8th or phone-free school programs for two or more years, against control communities and against early results from Australia's under-16 ban.",
        },
        cost_to_verify:
          "$400K-1M (Community comparison study with longitudinal mental health tracking)",
        falsification: {
          supporter_flip:
            "If communities running Wait Until 8th or phone-free school programs for two or more years reached 70%+ adoption and removed the social-exclusion penalty, voluntary action would solve the coordination problem and a government ban would be unnecessary.",
          skeptic_flip:
            "If pledges like Wait Until 8th stayed at limited participation while Australia's under-16 social media ban, enforced from December 2025, cut youth use where pledges could not, voluntary approaches would look unable to solve the coordination problem.",
          common_ground:
            "Both sides agree the collective-action problem is real: a child without a smartphone risks social exclusion when every peer has one, so single families struggle to hold out alone.",
          live_disagreement:
            "Whether voluntary pledges, phone-free schools and design regulation can reach the critical mass that removes the exclusion penalty, or whether only an age rule can — and whether one could be enforced without being toothless or invasive.",
        },
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
} satisfies TopicInput;
