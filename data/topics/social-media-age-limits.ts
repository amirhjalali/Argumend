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
        "Correlation isn't causation, and peer researchers (e.g., Candice Odgers in Nature) argue the large effects Haidt invokes have not held up: hundreds of studies yield mostly small, null, or mixed associations. Confounders rose in the same window — economic anxiety, academic pressure, reduced sleep and outdoor play, and greater willingness to report and diagnose distress. Most studies rely on self-reported screen time, which is unreliable. A blanket under-16 ban is a blunt instrument that can push kids to less moderated spaces and cut off teens (LGBTQ youth, isolated kids) for whom these platforms provide genuine support.",
      proponent_rebuttal:
        "Jonathan Haidt's 'The Anxious Generation' (a trade book, not a meta-analysis) documents a sharp inflection in teen depression and anxiety beginning around 2012, when smartphones and social media reached saturation, across several anglophone countries. The US Surgeon General's 2023 advisory, while stressing the evidence is not yet sufficient to call social media safe, warned it 'can have a profound risk of harm.' Internal Facebook research leaked by Frances Haugen showed Instagram made body image worse for a meaningful share of teen girls who already felt bad about their bodies. The precautionary case does not require proven causation: when a plausible mechanism, a dose-response pattern, and an unprecedented population-level decline coincide, waiting for a perfect RCT before acting may itself harm a generation of children.",
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
        "Whether under-16s can actually be kept off platforms without either collecting IDs (a privacy and data-breach risk for all users) or relying on self-reported birthdays (which Ofcom finds roughly a fifth of teens already falsify).",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Robust age verification forces every user, adult or child, to prove their age — via ID upload or biometric face scans — creating honeypots of sensitive data and chilling anonymous speech. Facial age estimation is imprecise right at the 16 cutoff and, per Australia's own trial, less accurate for darker skin tones, so it both wrongly blocks adults and misses teens. Teens still circumvent via VPNs, false birthdays, or borrowed accounts. And in many traditions deciding what a 15-year-old may access is a parental and free-expression question, not one for the state to settle with a blanket prohibition.",
      proponent_rebuttal:
        "We already age-gate alcohol, driving, gambling, and voting. Imperfect enforcement doesn't mean we abandon the principle — underage drinking laws reduce teen alcohol use despite circumvention. Australia's government-commissioned trial concluded age assurance 'can be done,' with facial age estimation and device-level signals offering relatively privacy-preserving options (no need to store an ID), even though it found no single guaranteed method and flagged accuracy gaps near the 16-year boundary. The point of a law is to shift the default and give parents legal backing, since an individual parent can't enforce a rule when every peer is on the platform; it doesn't need to be airtight to change population-level behavior.",
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
            "Ofcom-commissioned research (YouGov, 1,700+ UK children aged 8-17, 2024) found about 22% of 8-to-17-year-olds with a social media profile have a user age of 18 or over, i.e. they signed up with a false date of birth to appear older. Separately, Internet Matters' tracker reports roughly 8% of children used a VPN in the past twelve months (about 10% of 13-14s and 11% of 15-17s). Self-declared age is therefore widely circumvented, though no single circumvention method is near-universal and VPN use among children did not spike after the UK introduced age checks in 2025.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Ofcom / YouGov, 'Children's Online User Ages' (UK, 2024); Internet Matters VPN-use tracker (UK, 2025)",
          sourceUrl:
            "https://www.ofcom.org.uk/online-safety/protecting-children/a-third-of-children-have-false-social-media-age-of-18",
          reasoning:
            "The earlier '36% false age / 15% borrowed credentials / 10% spoofing apps' figures were attributed to an Internet Matters VPN-use page that does not contain them, so they were removed as unverifiable. Replaced with Ofcom's documented ~22% false-DOB figure (primary, robust) and the Internet Matters VPN numbers the cited tracker actually reports. Real evidence of circumvention; weights unchanged since the corrected figures remain solid.",
        },
      ],
    },
  ],
};
