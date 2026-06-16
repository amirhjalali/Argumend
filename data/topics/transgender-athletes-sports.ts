export const transgenderAthletesSportsData = {
  id: "transgender-athletes-sports",
  title: "Transgender Athletes in Competitive Sports",
  meta_claim:
    "Transgender women who have undergone hormone therapy should be permitted to compete in women's sports categories, as hormonal transition sufficiently reduces any physiological advantages from male puberty.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Retained Physiological Advantages
    // =========================================================================
    {
      id: "retained-physiological-advantages",
      title: "Retained Physiological Advantages",
      short_summary:
        "Research shows that some physiological advantages from male puberty — including skeletal structure, lung capacity, and certain muscle characteristics — persist after hormone therapy, while others (muscle mass, hemoglobin) diminish significantly. The debate centers on whether residual advantages are competitively meaningful across different sports.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The science clearly shows that male puberty confers physiological advantages that hormone therapy does not fully reverse. A 2021 British Journal of Sports Medicine study found that transgender women retained approximately a 9% speed advantage over cisgender women after two years of hormone therapy. Skeletal advantages — height, bone density, shoulder width, hip structure, hand and foot size — are permanently established during puberty and are unaffected by hormone therapy. Lung capacity, which is 10-12% greater in males, does not decrease with estrogen. These are not marginal differences; in elite sport, the gap between gold and fourth place is often under 1%. Allowing athletes with these retained advantages to compete in the women's category undermines the entire purpose of sex-segregated sport, which exists to ensure fair competition for female athletes.",
      proponent_rebuttal:
        "The research is more nuanced than critics acknowledge. The same BJSM study showed that after two years of hormone therapy, transgender women's push-up and sit-up performance fell within cisgender female ranges. A 2023 systematic review in the British Journal of Sports Medicine found that testosterone suppression reduces muscle mass, strength, and hemoglobin to levels overlapping with cisgender women within 2-3 years. The 9% speed advantage finding is from a military fitness test population (US Air Force), not elite athletes, and measures running in non-competitive conditions. Natural variation within cisgender women is enormous — elite female basketball players are taller than most men; Michael Phelps's wingspan exceeds his height by 3 inches, giving him a structural advantage no one proposes banning. Sport has never been perfectly fair; it rewards genetic outliers. The question is not whether any advantage exists but whether it falls within the natural variation of the women's category.",
      crux: {
        id: "sport-specific-advantage-data",
        title: "The Sport-Specific Advantage Quantification",
        description:
          "If comprehensive, sport-specific studies show that transgender women who have completed 2+ years of hormone therapy retain performance advantages that exceed the natural variation within elite cisgender women in that sport, then inclusion policies undermine competitive fairness. If retained advantages fall within the range of natural variation among cisgender women, the fairness objection is weakened.",
        methodology:
          "Conduct prospective studies tracking transgender women athletes across multiple sports (running, swimming, cycling, weightlifting, basketball, etc.) through at least 3 years of hormone therapy. Measure sport-specific performance metrics against matched cisgender female athletes at equivalent competition levels. Compare the magnitude of any trans-cis performance gap to the within-cis variation (e.g., the gap between the 5th and 95th percentile cisgender female athletes in each sport). Include both recreational and elite populations.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-15M (Multi-year, multi-sport prospective cohort study with sufficient sample sizes)",
      },
      evidence: [
        {
          id: "bjsm-speed-advantage",
          title: "Trans Women Retain ~12% Running Speed Advantage After 2 Years HRT (2020)",
          description:
            "A study by Roberts, Smalley and Ahrendt published in the British Journal of Sports Medicine analyzing US Air Force fitness test data found that transgender women retained approximately a 12% advantage in 1.5-mile run times over cisgender women after two years of hormone therapy (and ~9% after one year), compared to a ~21% pre-transition advantage. The speed advantage persisted even after testosterone had been suppressed to female-typical levels for the full period. However, push-up and sit-up performance differences disappeared, converging with cisgender female norms within two years.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "British Journal of Sports Medicine",
          sourceUrl: "https://doi.org/10.1136/bjsports-2020-102329",
          reasoning:
            "Published in a leading sports medicine journal with a large sample from military fitness tests. The finding of persistent speed advantage is significant and directly relevant. However, the military fitness test population differs from elite athletes, and running in a fitness test context differs from competitive racing. The convergence of strength measures complicates a simple 'advantage persists' narrative.",
        },
        {
          id: "skeletal-structure-permanence",
          title: "Skeletal Advantages from Male Puberty Are Permanent and Unaffected by HRT",
          description:
            "Male puberty produces permanent skeletal changes: average height increases of 5 inches over females, broader shoulders, narrower hips (advantageous for running biomechanics), larger hands and feet (advantageous in swimming and ball sports), and greater bone density. These characteristics are established by age 18-20 and are not reversed by estrogen therapy or testosterone suppression. In sports where height, reach, or skeletal leverage confer advantage (basketball, volleyball, swimming, combat sports), these structural differences can be decisive.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "Endocrine Reviews; Journal of Clinical Endocrinology & Metabolism",
          sourceUrl: "https://doi.org/10.1210/endrev/bnaa034",
          reasoning:
            "The permanence of skeletal characteristics after puberty is established endocrine physiology with near-perfect replicability. However, directness for the policy question is moderate because skeletal dimensions vary enormously within both sexes — some cisgender women are taller and have larger frames than some transgender women. The competitive relevance depends on the specific sport.",
        },
        {
          id: "muscle-mass-convergence",
          title: "Hemoglobin Normalizes Quickly While Muscle Declines Partially After HRT (2021)",
          description:
            "A 2021 systematic review by Harper et al. in the British Journal of Sports Medicine found that testosterone-suppressing hormone therapy brings hemoglobin and hematocrit — which affect oxygen-carrying capacity and endurance — to levels equivalent to cisgender women within about four months. Lean body mass, muscle area, and strength all decrease significantly over the first year of therapy, but the review found these values remain above those of cisgender women even after 36 months, concluding that strength 'may be well preserved' during the first three years of hormone therapy. The endurance-relevant changes are rapid; the strength-relevant changes are slower and incomplete.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "British Journal of Sports Medicine; Systematic Review",
          sourceUrl: "https://doi.org/10.1136/bjsports-2020-103106",
          reasoning:
            "Systematic reviews represent a high level of evidence synthesis. The finding that hemoglobin fully normalizes supports the inclusion case for endurance-dominated events, while the finding that muscle mass and strength remain above cisgender female levels at three years partly cuts against it for strength-dominated events. The mixed result suggests that advantage is sport-dependent and that policy may need to be discipline-specific rather than categorical.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Inclusion & Dignity
    // =========================================================================
    {
      id: "inclusion-dignity",
      title: "Inclusion, Dignity & Anti-Discrimination",
      short_summary:
        "Excluding transgender athletes from competition consistent with their gender identity causes documented psychological harm, violates anti-discrimination principles, and sends a message that transgender people are not accepted in public life. The question is whether competitive fairness in sport justifies this exclusion or whether alternative frameworks can honor both values.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Inclusion is important but cannot override the fundamental purpose of sex-segregated sport, which is to ensure fair competition for female athletes. Women fought for decades for Title IX and equal sporting opportunities. Allowing athletes with male-puberty advantages to compete in women's categories effectively eliminates the protected category that sex-segregated sport was designed to create. This is not about transgender dignity; it is about fairness for the millions of cisgender women and girls who compete in sport. Excluding transgender women from the women's category is not excluding them from sport — they can compete in men's or open categories, or alternative frameworks can be developed. The rights of transgender athletes must be balanced against the rights of cisgender female athletes, and the current framing treats the former as absolute while dismissing the latter.",
      proponent_rebuttal:
        "Telling transgender women to compete in the men's category is not a neutral solution — it is a statement that they are not women, which directly contradicts their identity and causes measurable psychological harm. A 2022 study in the International Review for the Sociology of Sport found that transgender athletes who were excluded from competing in their gender category experienced significantly higher rates of depression, anxiety, and suicidal ideation. Sport is not just about elite competition; it is about community, physical health, and belonging. The vast majority of transgender athletes are recreational, not elite, and pose no competitive threat. Policies that exclude all transgender women to address a hypothetical elite-level concern deny thousands of people the social and health benefits of sport participation. Moreover, no transgender woman has won an Olympic gold medal; the predicted 'domination' of women's sport has not materialized despite inclusive policies being in place since 2004.",
      crux: {
        id: "harm-balancing-test",
        title: "The Comparative Harm Assessment",
        description:
          "If excluding transgender athletes from gender-consistent competition produces demonstrably greater harm (psychological, social, physical health) than the competitive fairness harm to cisgender athletes from inclusion, then inclusion policies are justified on balance. If the competitive harm to cisgender athletes — including lost scholarships, records, and podium positions — is substantial and quantifiable, exclusion (or alternative categories) may be warranted despite the inclusion harm.",
        methodology:
          "Conduct a comprehensive comparative impact study: (1) Survey transgender athletes excluded from gender-consistent competition on mental health, sport participation rates, and quality of life; (2) Analyze competition results in jurisdictions with inclusive policies to quantify the actual competitive impact on cisgender women (podium displacements, record changes, scholarship redistribution); (3) Compare the magnitudes of harm using a standardized framework.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Multi-national survey and competition data analysis over 3-5 years)",
      },
      evidence: [
        {
          id: "mental-health-impact-exclusion",
          title: "Discrimination in Sport Linked to Worse Mental Health for Transgender Athletes (2024)",
          description:
            "A 2024 systematic review and meta-analysis in BMC Psychology (Chan et al.) pooled 12 studies covering 21,565 participants and found that roughly a third experienced discrimination in sports participation and healthcare, and that such discrimination and exclusion were associated with elevated depression, psychological distress, and suicide risk. The review reported that transgender athletes who felt welcomed and included by their teams had markedly better mental-health outcomes, framing inclusive sport participation as a protective factor and exclusion as a contributor to harm.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "BMC Psychology; Systematic Review and Meta-Analysis",
          sourceUrl: "https://doi.org/10.1186/s40359-023-01493-9",
          reasoning:
            "A meta-analysis pooling more than 21,000 participants is a relatively strong evidence base for the association between discrimination/exclusion and poorer mental health. However, the included studies are largely observational and measure discrimination broadly rather than exclusion from a specific competition category, so they establish correlation rather than causation and are only indirectly about eligibility policy itself.",
        },
        {
          id: "no-olympic-domination",
          title: "No Transgender Woman Has Won Olympic Gold Despite 20 Years of Inclusive Policy",
          description:
            "The IOC has allowed transgender women to compete in women's events since 2004 (originally requiring surgery, updated in 2015 to testosterone suppression). In the 20+ years since the policy was implemented, no transgender woman has won an Olympic medal in any sport. Laurel Hubbard competed in weightlifting at the 2020 Olympics and finished last in her group. This suggests that the predicted 'domination' of women's sport by transgender athletes has not materialized at the elite level.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "International Olympic Committee; Associated Press",
          sourceUrl: "https://olympics.com/ioc/news/ioc-updates-framework-on-fairness-inclusion-and-non-discrimination",
          reasoning:
            "The Olympic competition record is a verifiable, high-reliability fact. The absence of transgender Olympic medalists despite two decades of eligibility is significant evidence against the 'domination' narrative. However, directness is moderate because the small number of transgender elite athletes means the sample is too small for statistical conclusions, and the absence of domination at the Olympic level does not necessarily apply to sub-elite or youth competition.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: The Open Category Model
    // =========================================================================
    {
      id: "open-category-model",
      title: "The Open Category Compromise",
      short_summary:
        "Some researchers and sporting bodies have proposed replacing the current binary male/female categories with an 'open' category (anyone can enter) and a 'restricted' category (biological females only), potentially resolving the tension between inclusion and fairness. The question is whether such a model is practically workable and socially acceptable.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The 'open category' model is a rebranding of exclusion. Telling transgender women they can compete in an 'open' category rather than the women's category still denies them recognition of their gender identity in sport. An open category would be dominated by cisgender men, making it functionally the men's category with a different name. Transgender women would have no realistic chance of competitive success in an open category, meaning they would effectively be excluded from meaningful competition. Furthermore, implementing additional categories creates logistical challenges for sporting events, particularly at the youth and recreational level where resources are limited. The premise that we need a third category to accommodate less than 1% of athletes fundamentally misunderstands that the goal is inclusion within existing women's sport, not segregation into a separate category.",
      proponent_rebuttal:
        "The open category model is not exclusion — it is the only framework that simultaneously protects female athletes' competitive fairness and provides transgender athletes a pathway to competition at every level. World Athletics, the governing body of track and field, explored this approach and found it had support from athletes, administrators, and human rights organizations. An open category allows anyone to compete regardless of sex, gender identity, or hormone levels, while the restricted category ensures that athletes without male-puberty advantages compete on a level playing field. This is analogous to weight classes in combat sports or parasport categories — not discrimination, but classification that enables fair competition. The alternative — either excluding transgender athletes entirely or including them in a category where they may have advantages — satisfies no one. The open category is the pragmatic middle ground.",
      crux: {
        id: "open-category-feasibility",
        title: "The Open Category Pilot Test",
        description:
          "If pilot programs of the open/restricted category model in specific sports demonstrate that (1) transgender athletes participate in meaningful numbers, (2) competitive quality in the restricted category is maintained, and (3) participants in both categories report satisfaction with the framework, then the model is a viable compromise. If transgender athletes reject the open category as stigmatizing, or if the logistics prove unworkable, alternative approaches are needed.",
        methodology:
          "Implement pilot open/restricted category programs in 3-5 sports across multiple countries over 2 competitive seasons. Measure participation rates in each category (including transgender, non-binary, and intersex athletes), competitive quality metrics, athlete satisfaction surveys, logistical costs, and media/public perception. Compare outcomes with sports maintaining traditional male/female categories.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Multi-sport, multi-nation pilot program over 2-3 years)",
      },
      evidence: [
        {
          id: "world-athletics-framework",
          title: "World Athletics Tightens Eligibility Rules for Transgender Athletes (2023)",
          description:
            "In March 2023, World Athletics announced that transgender women who have experienced male puberty would be excluded from international women's track and field competitions, regardless of subsequent hormone therapy. President Sebastian Coe stated the decision prioritized 'fairness and the integrity of the female category' while acknowledging the 'tension between inclusion and fairness.' The policy applies to international competition only; national federations retain discretion for domestic events. World Athletics convened a working group to explore alternative categories including an open category.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 8,
          },
          source: "World Athletics",
          sourceUrl: "https://worldathletics.org/news/press-releases/council-meeting-march-2023-russia-belarus-female-eligibility",
          reasoning:
            "World Athletics is the international governing body for the sport, making this an authoritative policy decision. The decision was based on their assessment of scientific evidence. Independence is somewhat lower because governing bodies face political pressure from multiple directions. The policy directly addresses the competitive fairness question but does not resolve the inclusion dimension.",
        },
        {
          id: "ioc-2021-framework",
          title: "IOC 2021 Framework Emphasizes Inclusion Over Testosterone Thresholds",
          description:
            "The IOC's 2021 Framework on Fairness, Inclusion and Non-Discrimination on the Basis of Gender Identity and Sex Variations abandoned its previous testosterone threshold approach and instead established principles prioritizing inclusion, harm prevention, and evidence-based policy. The framework shifted responsibility to individual sports federations to develop sport-specific policies based on evidence of competitive advantage in their discipline. It explicitly stated that 'no athlete should be excluded from competition on the sole basis of their transgender identity.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source: "International Olympic Committee",
          sourceUrl: "https://olympics.com/ioc/news/ioc-updates-framework-on-fairness-inclusion-and-non-discrimination",
          reasoning:
            "The IOC framework represents the highest-level international sports policy statement on transgender inclusion. However, it is a framework of principles rather than specific rules, and many national federations have adopted more restrictive policies. Independence is moderate because the IOC faces intense lobbying from all sides. The framework directly addresses the values balance but leaves practical implementation to individual sports.",
        },
      ],
    },
  ],
  references: [
    {
      title: "How Does Transgender Participation Affect Women's Sport? — BJSM (2021)",
      url: "https://doi.org/10.1136/bjsports-2020-102329",
    },
    {
      title: "IOC Framework on Fairness, Inclusion and Non-Discrimination (2021)",
      url: "https://olympics.com/ioc/news/ioc-updates-framework-on-fairness-inclusion-and-non-discrimination",
    },
    {
      title: "World Athletics Council Decision on Female Eligibility (March 2023)",
      url: "https://worldathletics.org/news/press-releases/council-meeting-march-2023-russia-belarus-female-eligibility",
    },
    {
      title:
        "How Does Hormone Transition Change Body Composition, Muscle Strength and Haemoglobin? — BJSM Systematic Review (2021)",
      url: "https://doi.org/10.1136/bjsports-2020-103106",
    },
    {
      title: "Effects of Testosterone Suppression on Body Composition — Endocrine Reviews (2021)",
      url: "https://doi.org/10.1210/endrev/bnaa034",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does hormone therapy fully reverse the physiological advantages of male puberty?",
      content:
        "Research shows a mixed picture: muscle mass and hemoglobin approach female ranges after 2-3 years, but skeletal structure, lung capacity, and some speed advantages persist. The answer may be sport-specific — advantages matter more in some sports than others.",
    },
    {
      id: "q2",
      title: "How should fairness to cisgender women be balanced against inclusion of transgender athletes?",
      content:
        "This is fundamentally a values question, not a scientific one. Both competitive fairness and inclusive participation are legitimate values. The tension between them cannot be resolved by science alone — it requires a societal decision about which value takes priority when they conflict, and whether creative policy solutions (like open categories) can honor both.",
    },
    {
      id: "q3",
      title: "Are there policy models that protect both inclusion and competitive integrity?",
      content:
        "The IOC's 2021 framework emphasizes sport-specific evidence. World Athletics has chosen exclusion at the international level. Some propose open/restricted categories. Others advocate for sport-by-sport analysis based on the degree of advantage in each discipline. No consensus model exists, and the policy landscape is still rapidly evolving.",
    },
  ],
};
