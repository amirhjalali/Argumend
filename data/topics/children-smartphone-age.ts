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
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In the CDC's youth survey, the share of U.S. high school girls reporting persistent sadness or hopelessness rose from 36% in 2011 to 57% in 2021. Australia's ban on social media accounts for under-16s took effect on 10 December 2025. Both sides accept those facts. The fight is over how much of that rise smartphones cause, and whether a legal age limit on owning one would help.",
    confidence: 86,
    source:
      "CDC, Youth Risk Behavior Survey Data Summary & Trends Report: 2011-2021; Online Safety Amendment (Social Media Minimum Age) Act 2024 (Cth) and Australian eSafety Commissioner",
    sourceUrl:
      "https://web.archive.org/web/20240101175749/https://www.cdc.gov/healthyyouth/data/yrbs/pdf/YRBS_Data-Summary-Trends_Report2023_508.pdf",
  },
  simple_case: [
    "The answer bears on what parents decide at a child's first phone, and on whether more governments follow Australia in setting age limits by law.",
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
            "The CDC Youth Risk Behavior Survey shows persistent feelings of sadness or hopelessness among US high school girls increased from 36% in 2011 to 57% in 2021 (a ~58% relative rise). Note this self-reported measure indexes sadness/hopelessness, not a clinical depression diagnosis. Seriously considering suicide rose from 19% to 30% among girls, and attempted suicide from 10% to 13%. For boys, persistent sadness increased from 21% to 29%. The rise overlaps with the spread of smartphones among US teens: Pew surveys found 37% of teens had one in 2012 and nearly three-quarters had or had access to one by 2014-15. That is a temporal correlation, not by itself evidence of causation.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "CDC, Youth Risk Behavior Survey Data Summary & Trends Report: 2011-2021 (2023); smartphone figures from Pew Research Center, 'Teens and Technology 2013' and 'Teens, Social Media & Technology Overview 2015'",
          sourceUrl: "https://web.archive.org/web/20240101175749/https://www.cdc.gov/healthyyouth/data/yrbs/pdf/YRBS_Data-Summary-Trends_Report2023_508.pdf",
          reasoning:
            "CDC data is nationally representative and methodologically rigorous, making it highly reliable. However, the temporal correlation between smartphone adoption and mental health decline does not establish causation — the directness score is lower because multiple simultaneous factors (opioid crisis, economic anxiety, school shootings, COVID) could contribute to the trend.",
        },
        {
          id: "przybylski-small-effects",
          title: "Oxford Specification-Curve Study Finds Technology Use Explains at Most 0.4% of Teen Wellbeing",
          description:
            "Amy Orben and Andrew Przybylski's specification-curve analysis of three large datasets (total n = 355,358), published in Nature Human Behaviour in 2019, found that the association between digital technology use and adolescent wellbeing is negative but small, explaining at most 0.4% of the variation in wellbeing. For scale, in the same data regularly eating potatoes was nearly as negatively associated with wellbeing as technology use, and wearing glasses was more negatively associated. The authors conclude the effects are 'too small to warrant policy change.' Critics counter that undifferentiated 'screen time' and self-report time-use measures may obscure harms specific to social media.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Orben & Przybylski, 'The association between adolescent well-being and digital technology use', Nature Human Behaviour 3:173-182 (2019)",
          sourceUrl: "https://www.nature.com/articles/s41562-018-0506-1",
          reasoning:
            "Published in a top-tier journal with very large samples and a design that reports the full range of defensible analyses rather than a chosen few, this is methodologically strong research. However, the critique focuses on total screen time as a variable, which may miss the specific mechanisms (social media comparison, algorithmic feeds, notification patterns) that cause harm — the 'screen time' measure may be too crude to capture what matters.",
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
          title: "Teen Mental Health Fell in All Five Anglosphere Countries From the Early 2010s",
          description:
            "Zach Rausch and Jonathan Haidt gathered trend data on adolescent mental health for the US, UK, Canada, Australia and New Zealand and report the same basic pattern in each: measures such as depression, anxiety, psychological distress and self-harm turn upward in the early 2010s, most sharply for girls. In Australia, for example, the share of females aged 16-24 reporting high or very high psychological distress rose from 14.2% in 2013 to 35.1% in 2020. A second post extends the review to the five Nordic nations. The authors argue that explanations tied to one country, such as a US school shooting, cannot account for a decline that began in several nations at once, and that the shift from flip phones to smartphones can.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Rausch & Haidt, \"The Teen Mental Illness Epidemic is International: The Anglosphere,\" After Babel (March 29, 2023)",
          sourceUrl: "https://www.afterbabel.com/p/international-mental-illness-part-one",
          reasoning:
            "The cross-national pattern is a genuinely strong argument for the smartphone hypothesis. However, independence is lower because Haidt is a prominent advocate for the smartphone-harm thesis and the authors chose which countries and metrics to show. The five countries also share a language and much of a culture, and the publication venue (Substack) is less rigorous than a peer-reviewed journal.",
        },
        {
          id: "norway-school-phone-ban-results",
          title: "Norwegian Middle-School Smartphone Bans Cut Girls' Mental-Health Visits and Bullying",
          description:
            "Sara Abrahamsson combined Norwegian administrative records with a survey of middle schools' smartphone policies in an event-study design. After a school banned smartphones, girls' take-up of health care for psychological symptoms and diseases fell significantly, bullying fell among both girls and boys, and girls' grade point averages and chances of entering an academic high-school track rose, with larger effects for girls from low socio-economic backgrounds. The bans cover school hours only, so this is a partial test of what removing the device does, not a test of an ownership rule. Whether school-day bans work on their own terms is a separate question with its own map.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source: "Abrahamsson, 'Smartphone Bans, Student Outcomes and Mental Health', Norwegian School of Economics Discussion Paper 1/2024 (EconPapers listing)",
          sourceUrl: "https://econpapers.repec.org/paper/hhsnhheco/2024_5f001.htm",
          reasoning:
            "A quasi-experimental result, which is rarer in this debate than a correlation: outcomes changed after a policy removed phones for part of the day. It is a discussion paper, not yet a peer-reviewed article, and it rests on one country. Directness is moderate because a school-hours ban speaks only indirectly to the claim about banning ownership.",
        },
        {
          id: "global-internet-adoption-wellbeing",
          title: "Across 168 Countries, Internet and Mobile-Broadband Adoption Did Not Track Declining Wellbeing",
          description:
            "Matti Vuorre and Andrew Przybylski compared wellbeing reports from 2,434,203 people aged 15 to 89 in 168 countries (2005 to 2022) with each country's per-capita internet users and mobile-broadband subscriptions, then repeated the test on estimated rates of anxiety, depression and self-harm in 202 countries (2000 to 2019). They report 'only small and inconsistent changes in global well-being and mental health', with wide variation between countries in the sign and size of any link to adoption. Their breakdown by age and sex 'did not support the idea that young individuals or young women particularly were the most at-risk group.' The study tracks a country's internet and mobile-broadband adoption, not children's smartphone ownership, and its youngest respondents are 15.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "Vuorre & Przybylski, 'Global Well-Being and Mental Health in the Internet Age', Clinical Psychological Science 12(5):917-935 (published online 2023), Oxford University Research Archive copy",
          sourceUrl: "https://ora.ox.ac.uk/objects/uuid:f89a1517-7585-4404-9da3-43f96ff846b6/files/r76537263k",
          reasoning:
            "This is the closest published analysis to the cross-national timing test the crux describes, and it does not find wellbeing falling as countries came online. Independence is scored like the Rausch and Haidt card because Przybylski is a prominent skeptic of the smartphone-harm thesis. The authors call their results descriptive, the study was not preregistered, and national averages for people 15 and over could hide a decline concentrated in younger teenage girls.",
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
            "Australia's parliament passed the Online Safety Amendment (Social Media Minimum Age) Act in November 2024 (assent December 2024), and the age restriction took effect on 10 December 2025. It requires platforms to take reasonable steps to stop under-16s holding accounts; eSafety lists Facebook, Instagram, Snapchat, Threads, TikTok, Twitch, X, YouTube, Kick and Reddit among the age-restricted platforms. There are no penalties for children or parents: enforcement falls on platforms, with court-imposed fines for corporations of up to 300,000 penalty units, which eSafety currently puts at A$109.2 million. eSafety reported that platforms had removed access to 4.7 million under-16 accounts by mid-December 2025. It is among the strongest government interventions on children's technology access in any Western democracy, though its effect on mental-health outcomes has not yet been evaluated.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Australian eSafety Commissioner, 'Social media age restrictions' (page as archived 31 October 2026), on the Online Safety Amendment (Social Media Minimum Age) Act 2024 (Cth)",
          sourceUrl: "https://web.archive.org/web/20261031200841/https://www.esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions",
          reasoning:
            "Provides a real, now-operational legislative precedent from a major democracy, demonstrating that age-based platform restrictions are politically and technically implementable. Directness is moderate because the law targets social-media accounts, not smartphone ownership (the meta_claim), and its mental-health effectiveness is still untested. Age-verification accuracy and circumvention (VPNs, false ages) remain open questions.",
        },
        {
          id: "wait-until-8th-adoption-limits",
          title: "Wait Until 8th Counts 155,000 Pledged Parents, and the Pledge Activates Only With 10 Families per Grade",
          description:
            "The Wait Until 8th campaign asks parents to pledge not to give their child a smartphone until at least the end of 8th grade. By its own count, more than 155,000 parents have signed. The pledge is built around the coordination problem: it becomes active only once at least 10 families from the child's grade and school have signed, because, in the campaign's words, 'Banding together helps decrease the pressure to have a phone at an early age.' The campaign publishes a national running total, not the share of families signed in any school, so how often a grade reaches the critical mass that removes the exclusion penalty is not known.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source: "Wait Until 8th (campaign website, figures as shown in November 2026)",
          sourceUrl: "https://www.waituntil8th.org/",
          reasoning:
            "The campaign directly tests the voluntary coordination approach, and its 10-family threshold concedes that a family acting alone struggles to hold out. Supporters of a mandate read 155,000 parents, in a country with tens of millions of schoolchildren, as limited reach; the campaign reads the same number as momentum. Source reliability is lower because the count is self-reported by the organization, and there are no rigorous studies of the campaign's participation rates or outcomes.",
        },
        {
          id: "australia-ban-three-month-evaluation",
          title: "Three Months In, Most Australian Under-16s With Accounts Kept or Reopened Them",
          description:
            "eSafety's first evaluation report on Australia's social media minimum age, part of a two-year study following over 4,000 children and families, used data collected in March 2026, three months after the law took effect on 10 December 2025. The share of under-16s holding a social media account fell from 52.4% to 42.1%, which eSafety calls 'a modest but statistically significant decline.' The share who used a platform with or without an account fell only from 85.9% to 81.5%. eSafety reports that most under-16s who had accounts before the start date 'were able to either retain them or create new ones,' with platforms' failure to implement effective age checks cited as the main reason. The same report found a fall in children feeling they were missing out by not having social media, from 43.3% to 36.3%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "eSafety Commissioner (Australia), 'Early insights from eSafety's comprehensive evaluation project' (media release on the three-month evaluation report, 2026)",
          sourceUrl:
            "https://www.esafety.gov.au/newsroom/media-releases/early-insights-from-esafetys-comprehensive-evaluation-project",
          reasoning:
            "This is the first measured result from the mandate the 'for' side cites, and it supports the skeptic's enforcement worry: after three months, about four in five under-16s still used the platforms. The regulator is evaluating its own law, which lowers independence, though publishing a weak early result cuts against any bias. Directness is moderate: the law covers social media accounts, not phone ownership; three months is early; and eSafety says the findings are not a ruling on whether platforms complied. The drop in feeling left out is the 'for' side's point that a rule can ease the peer pressure a pledge cannot.",
        },
      ],
    },
  ],
} satisfies TopicInput;
