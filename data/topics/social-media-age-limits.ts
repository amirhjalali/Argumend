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
            "Surgeon General Vivek Murthy's May 2023 advisory warned that social media 'can have a profound risk of harm' to the mental health of children and adolescents, citing associations with depression, anxiety, poor sleep, and body image concerns. The advisory explicitly states 'we do not yet have enough evidence to determine if social media is sufficiently safe' rather than asserting proven causal harm. Murthy later (2024) called for a tobacco-style warning label.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source:
            "U.S. Surgeon General, 'Social Media and Youth Mental Health' advisory (HHS, May 2023)",
          sourceUrl:
            "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf",
          reasoning:
            "Highest-level public health advisory, but it frames evidence as insufficient/associational rather than proving causation; the warning-label call came separately in 2024. Directness lowered to reflect that the document itself does not claim proven causal harm.",
        },
        {
          id: "haidt-anxious-generation",
          title: "Haidt's 'The Anxious Generation'",
          description:
            "Jonathan Haidt argues that U.S. adolescent depression and anxiety rose sharply after ~2012, when smartphones and social media reached saturation. Per his data, rates of major depression among teens roughly doubled from 2010-2021 (a relative rise near 150%, larger in absolute terms for girls), and he cites similar inflections in several anglophone countries. This is a trade book, not a peer-reviewed meta-analysis; critics (e.g., Candice Odgers in Nature) argue the correlational evidence cannot establish causation and that the timing claim is contested.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source: "Jonathan Haidt, 'The Anxious Generation' (Penguin Press, 2024)",
          sourceUrl: "https://www.anxiousgeneration.com/research/the-evidence",
          reasoning:
            "Popular book by an advocate, not a peer-reviewed study; the '150% / 50%' split was overstated (the relative increase is similar across sexes, with absolute rise larger for girls), so the claim was corrected and weights de-inflated. Causal framing is actively disputed in the literature.",
        },
        {
          id: "australia-age-verification",
          title: "Australia Passes Social Media Ban for Under-16s",
          description:
            "Australia's Online Safety Amendment (Social Media Minimum Age) Act 2024 passed Parliament on 29 November 2024, requiring certain platforms to take 'reasonable steps' to prevent under-16s from holding accounts, with civil penalties up to AUD$49.5 million. Enforcement was scheduled to begin roughly 12 months after passage (late 2025). Effectiveness data is still emerging, and compliance mechanisms remain uncertain.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source:
            "Parliament of Australia, Online Safety Amendment (Social Media Minimum Age) Act 2024",
          sourceUrl:
            "https://www.legislation.gov.au/C2024A00127/asmade/text",
          reasoning:
            "The law's passage is verified; that a democracy legislated is a policy signal, not direct evidence of harm or of enforcement effectiveness, so directness/replicability lowered. Too early for outcome data.",
        },
        {
          id: "teen-self-report-surveys",
          title: "Teens Self-Report Both Harms and Benefits",
          description:
            "Pew Research's 2022 survey of U.S. teens found 80% say social media makes them feel more connected to what is going on in their friends' lives, 67% feel they have people who can support them through tough times, and 58% feel more accepted. On the negative side, 38% feel overwhelmed by drama, 29% feel pressure to post for likes, and 23% feel worse about their own life. A majority (54%) say it would be at least somewhat hard to give up social media.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Pew Research Center, 'Teens, Social Media and Technology 2022' / 'Teens' views about social media'",
          sourceUrl:
            "https://www.pewresearch.org/internet/2022/11/16/2-teens-views-about-social-media/",
          reasoning:
            "Large independent survey. The prior '46% feel worse / 44% feel better' figures did not match Pew and were replaced with verified numbers; the unverifiable LGBTQ-specific claim was removed. Self-reported feelings are indirect evidence of net benefit/harm, so directness is moderate.",
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
          title: "Australia's Age Assurance Technology Trial",
          description:
            "Australia's government-commissioned Age Assurance Technology Trial published its final report in September 2025, assessing 48 vendors and 60+ technologies. It concluded that age assurance, including facial age estimation, 'can be done in Australia' and is feasible for real-world use, but found no single guaranteed method and flagged reduced accuracy for users with darker skin tones and those aged 16-20. (The report did not publish a clean '95% of under-16s correctly identified' figure.)",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Age Assurance Technology Trial, Final Report (commissioned by the Australian Government, September 2025)",
          sourceUrl: "https://ageassurance.com.au/",
          reasoning:
            "Government-commissioned independent trial. The prior specific '95%' accuracy figure was unverifiable and was removed; the report's actual conclusion is 'feasible, with caveats,' including accuracy gaps near the 16-year boundary, so directness/replicability lowered.",
        },
        {
          id: "coppa-effectiveness",
          title: "COPPA Has Been Hard to Enforce",
          description:
            "The Children's Online Privacy Protection Act (1998) requires verifiable parental consent before sites collect data from under-13s, which is why platforms set a 13+ minimum age. Yet Common Sense Media's 2021 census found 38% of 8- to 12-year-olds use social media despite being under the threshold, typically by entering a false birthdate. The FTC has brought enforcement actions (e.g., against TikTok/Musical.ly and YouTube), but age self-declaration remains easy to circumvent.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Common Sense Media, 'The Common Sense Census: Media Use by Tweens and Teens, 2021'; U.S. FTC COPPA enforcement",
          sourceUrl:
            "https://www.commonsensemedia.org/sites/default/files/research/report/8-18-census-integrated-report-final-web_0.pdf",
          reasoning:
            "The prior '53% of under-13s' figure was unverifiable; replaced with Common Sense Media's documented 38% of 8-12 year-olds. Real, dated evidence that age-based self-declaration restrictions are widely circumvented, though weights trimmed since the original stat was inflated.",
        },
        {
          id: "age-verification-tech",
          title: "Age Verification Technology Is Improving",
          description:
            "Vendors such as Yoti report facial age estimation with a mean absolute error of roughly 1.3-1.4 years for 13-to-17-year-olds (per Yoti's own 2023-2024 white papers), meaning a tool can usually place a teen within a year or so of their true age but cannot pinpoint exactly who is under 16. Device-level age signals from Apple/Google aim to verify age without sharing data with platforms. These are vendor-published figures, not independent benchmarks.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 5,
            directness: 6,
          },
          source:
            "Yoti, 'Facial Age Estimation White Paper' (Dec 2023 / Sep 2024); platform device-attestation announcements",
          sourceUrl:
            "https://www.yoti.com/wp-content/uploads/2024/04/Yoti-Age-Estimation-White-Paper-December-2023.pdf",
          reasoning:
            "The prior '98%+ accuracy' framing was imprecise; the vendor's actual published metric is MAE of ~1.3-1.4 years for teens, which leaves a meaningful error band right at the 16 cutoff. Self-published by a commercial vendor with an interest in the result, so independence is low.",
        },
        {
          id: "circumvention-rates",
          title: "Teen Circumvention of Existing Restrictions Is Common",
          description:
            "UK survey data (Internet Matters / Ofcom-cited research, ~2024-2025) indicates 36% of young people have entered a false age online to gain access, while smaller shares use borrowed credentials (15%), VPNs (11%), or age-spoofing apps (10%); roughly 8% of children used a VPN in the past year. More than 70% of teens report hiding some online activity from parents. Any age-based ban therefore creates a cat-and-mouse dynamic, though no single circumvention method is near-universal.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Internet Matters / Ofcom-cited youth online-safety surveys (UK, 2024-2025)",
          sourceUrl:
            "https://www.internetmatters.org/hub/research/data-shows-no-rise-childrens-vpn-use-amid-online-age-checks/",
          reasoning:
            "The prior '67% know how to bypass' and 'VPN doubled 2020-2024' figures, and the NCSC/Bark attribution, could not be verified against primary sources and were replaced with documented UK survey numbers (36% false age; ~8-11% VPN use). Real evidence of circumvention, but the original overstated its scale, so weights were trimmed.",
        },
      ],
    },
  ],
};
