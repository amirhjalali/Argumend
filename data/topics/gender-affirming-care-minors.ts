export const genderAffirmingCareMinorsData = {
  id: "gender-affirming-care-minors",
  title: "Gender-Affirming Care for Minors",
  question:
    "Should minors with gender dysphoria have access to puberty blockers and hormones?",
  meta_claim:
    "Puberty blockers and cross-sex hormones should remain available to adolescents with persistent gender dysphoria, after clinical assessment, rather than being banned or confined to research settings.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: systematic reviews in Finland (2020), Sweden
  // (2022), England (2024), McMaster (2025) and for HHS (final November 2025)
  // rate the evidence low or very low certainty; the AAP, Endocrine Society
  // and AMA still support access to medicines, while the American Society of
  // Plastic Surgeons (February 2026) recommends delaying surgery to 19;
  // Skrmetti (June 2025) upheld state bans; a CMS rule ending federal
  // Medicaid/CHIP funding for these treatments took effect 13 October 2026;
  // England's PATHWAYS blocker trial was cleared by the High Court on
  // 31 July 2026; New Zealand's High Court struck down that country's ban on
  // new blocker prescriptions on 21 October 2026.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Systematic reviews since 2020 in Finland, Sweden, England, at Canada's McMaster University and for the US health department have all rated the evidence on puberty blockers and hormones for adolescents as low or very low certainty. Most major US medical bodies still support access. In the US, 27 states ban or restrict the treatments for minors, and the Supreme Court upheld Tennessee's ban in June 2025; in October 2026 New Zealand's High Court struck down that country's ban. The fight is over what doctors and families should do while the evidence is this thin.",
    confidence: 86,
    source:
      "Miroshnychenko et al., Archives of Disease in Childhood (2025); The Cass Review (2024); United States v. Skrmetti (2025); Yahoo News (18 February 2025) on Kansas as the 27th state; 1News (22 October 2026) on New Zealand's High Court",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39855724/",
  },
  simple_case: [
    "The answer decides what a 14-year-old with persistent gender dysphoria and their parents are offered: medicine now, therapy and waiting, or a place in a research trial, and whether a state, a regulator or their doctor makes that call.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What the systematic reviews find (what we know)
    // =========================================================================
    {
      id: "medical-evidence",
      title: "What Do the Systematic Reviews Find?",
      short_summary:
        "Reviews in Finland, Sweden, England, at McMaster University and for HHS all rate the evidence on blockers and hormones for adolescents as low or very low certainty. US cohort studies, including a two-year NEJM study of 315 young people, report less depression and anxiety after hormones, with no comparison group. The AAP and Endocrine Society still support access. The dispute is what low-certainty evidence licenses.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The independent reviews that have graded this evidence have found it weak. Finland's health-care council (2020) called the treatment of minors experimental; Sweden's National Board of Health and Welfare (2022) judged that the risks of blockers and hormones currently outweigh the possible benefits; England's Cass Review (2024) found no reliable evidence that puberty blockers improve mental health; McMaster University's 2025 systematic reviews found 'considerable uncertainty' about blockers and mostly very low certainty evidence for hormones; and the US health department's review, finalised in November 2025, reached the same grade. The clinics that adopted the Dutch protocol now see a different population, many of them adolescent girls with recent-onset distress and other mental-health conditions, for whom the original studies say little. Major US medical bodies adopted their positions without systematic reviews of their own.",
      proponent_rebuttal:
        "Young people who receive this care report getting better: in a two-year NEJM study of 315 transgender and nonbinary 12- to 20-year-olds on hormones, depression and anxiety fell and life satisfaction rose, and a Seattle cohort found 60% lower odds of moderate-to-severe depression after a year. 'Low certainty' on the GRADE scale means randomised trials are missing, not that benefit is absent, and trials that withhold treatment from distressed adolescents are hard to run ethically; much of accepted pediatric care rests on evidence of the same grade. Even McMaster's review found a study in which the odds of depression may be lower with hormones. The American Academy of Pediatrics, the Endocrine Society and the American Medical Association still support access to these medicines, and the AAP called the HHS review a misrepresentation of 'the current medical consensus'.",
      crux: {
        id: "evidence-quality-assessment",
        title: "The Evidence Quality Meta-Assessment",
        question:
          "Is the evidence strong enough to justify treating minors, compared with other accepted pediatric care?",
        description:
          "Reviewers largely agree on the grade: low or very low certainty. They disagree on what that grade means. One side reads it as a reason to restrict treatment to research; the other compares it with the evidence behind other accepted pediatric care that has no randomised trials and reads the consistent direction of the cohort studies as enough to act on.",
        methodology:
          "Apply identical GRADE methods, by teams with no prior position, to the same body of studies and to a set of comparison treatments in pediatrics that also lack randomised trials (for example, some uses of antidepressants or growth hormone). Separately, follow the results of England's PATHWAYS trial, which randomises the timing of puberty blockers, and any US registry that compares treated adolescents with those given psychosocial care alone.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Identical GRADE ratings, by teams with no prior position, of this literature and of comparison pediatric treatments that also lack randomised trials, together with the first results of England's PATHWAYS trial of puberty blockers. What strength of evidence justifies treatment remains a value judgment.",
        },
        cost_to_verify:
          "$2-5M (independent parallel systematic reviews); PATHWAYS is funded by the NIHR",
        falsification: {
          supporter_flip:
            "If PATHWAYS and controlled registries found no mental-health benefit from blockers or hormones over psychosocial care alone, and the same GRADE teams rated comparison pediatric treatments clearly higher, the case for routine access outside research would weaken sharply.",
          skeptic_flip:
            "If controlled studies repeated the improvements seen in the NEJM and Seattle cohorts against a comparison group, and comparison pediatric treatments graded no better, the systematic reviews' low ratings would count for less against routine access.",
          common_ground:
            "Both sides agree there are no completed randomised trials, that the Cass Review and reviews in Finland and Sweden rated the evidence low quality, and that major US medical bodies still support access.",
          live_disagreement:
            "Whether low-certainty evidence that points toward benefit is enough to offer treatment, as with other pediatric care, or whether it calls for confining treatment to research.",
        },
      },
      evidence: [
        {
          id: "mcmaster-systematic-reviews-2025",
          title: "McMaster reviews: 'considerable uncertainty' on puberty blockers, mostly very low certainty on hormones (2025)",
          description:
            "Two systematic reviews from McMaster University, published in Archives of Disease in Childhood in May 2025 and co-authored by GRADE methodologist Gordon Guyatt, searched six databases to September 2023. For puberty blockers, 10 studies provided very low certainty evidence on gender dysphoria, global function, depression and bone density; the authors concluded 'there remains considerable uncertainty regarding the effects of puberty blockers'. For hormones, 24 studies provided mostly very low certainty evidence, though one comparative study found the odds of depression may be lower with hormones (odds ratio 0.73, low certainty).",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source:
            "Miroshnychenko et al., 'Puberty blockers for gender dysphoria in youth' and 'Gender affirming hormone therapy for individuals with gender dysphoria aged <26 years', Archives of Disease in Childhood 110(6):429-445 (2025)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/39855724/",
          reasoning:
            "Pre-registered GRADE reviews by one of the groups that built the method, outside the UK and US policy processes. Independence is trimmed because two authors had been paid by the Society for Evidence-based Gender Medicine for separate appraisal work, which the papers disclose. The reviews grade certainty; they do not find that the treatments fail.",
        },
        {
          id: "cass-review-2024",
          title: "The Cass Review: no reliable evidence that puberty blockers improve mental health (England, April 2024)",
          description:
            "Dr Hilary Cass's independent review for NHS England, published in April 2024 after four years, commissioned systematic reviews from the University of York and described the evidence base for puberty blockers and hormones in minors as 'remarkably weak'. It found no reliable evidence that puberty blockers improve mental health, judged the Dutch protocol studies to rest on a highly selected cohort unlike today's patients, noted a large rise in adolescent girls presenting with recent-onset gender distress, and found long-term outcome data essentially absent. NHS England closed the Tavistock's GIDS clinic and opened regional centres with more cautious protocols.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "The Cass Review, Final Report, NHS England (April 2024)",
          sourceUrl: "https://cass.independent-review.uk/home/publications/final-report/",
          reasoning:
            "The most thorough national review to date, led by a senior pediatrician with no prior position, and its evidence grades match the other systematic reviews. Its critics, including some US clinicians, dispute its handling of particular studies and the weight it gives to trial-grade evidence; independence is one notch below the maximum to reflect that the review also shaped the policy it informed.",
        },
        {
          id: "finland-sweden-restrictions",
          title: "Finland (2020) and Sweden (2022) restricted hormonal treatment of minors after national evidence reviews",
          description:
            "Finland's COHERE (Council for Choices in Health Care, 2020) and Sweden's National Board of Health and Welfare (2022) reviewed the evidence and restricted hormonal treatment of minors largely to research settings or exceptional cases. Finland concluded that gender reassignment of minors is 'an experimental practice' and prioritised psychotherapeutic support. Sweden concluded that 'the risks of puberty suppressive treatment with GnRH-analogues and gender-affirming hormonal treatment currently outweigh the possible benefits' for minors.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Finnish COHERE/PALKO recommendation (2020); Swedish National Board of Health and Welfare (Socialstyrelsen, 2022)",
          sourceUrl:
            "https://palveluvalikoima.fi/documents/1237350/22895008/Summary_minors_en.pdf/aaf9a6e7-b970-9de9-165c-abedfae46f2e/Summary_minors_en.pdf",
          reasoning:
            "Health authorities in countries with strong LGBTQ+ rights protections and universal care reached the same reading of the evidence independently, which is a form of replication. Neither banned the treatment: both kept it for some patients, so these decisions argue for caution, not for prohibition.",
        },
        {
          id: "hhs-review-2025",
          title: "HHS umbrella review rated the evidence low certainty and favoured psychotherapy (May 2025; final November 2025)",
          description:
            "The US Department of Health and Human Services published 'Treatment for Pediatric Gender Dysphoria: Review of Evidence and Best Practices' on 1 May 2025, under an executive order. It concluded that the evidence on these interventions for minors 'is very low' in certainty, said evidence on harms is 'sparse', presented psychotherapy as 'a noninvasive alternative', and stated that it is 'not a clinical practice guideline'. HHS withheld the authors' names at first; a final peer-reviewed version was published in November 2025. The AAP's president said the report 'misrepresents the current medical consensus and fails to reflect the realities of pediatric care.'",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 6,
          },
          source:
            "NBC News, 'HHS breaks with major U.S. medical groups in review of pediatric gender care' (1 May 2025); HHS Office of Population Affairs, Gender Dysphoria Report (final, November 2025)",
          sourceUrl:
            "https://www.nbcnews.com/feature/nbc-out/hhs-breaks-major-us-medical-groups-review-pediatric-gender-care-rcna204185",
          reasoning:
            "Its grades agree with the European and McMaster reviews, but it was commissioned by an administration that had set policy against this care, and its authors were anonymous at first, so independence is scored low.",
        },
        {
          id: "chen-nejm-two-year-hormones",
          title: "NEJM cohort of 315 youth: depression and anxiety fell over two years on hormones (2023)",
          description:
            "Chen and colleagues followed 315 transgender and nonbinary participants aged 12 to 20 across four US sites for two years after starting gender-affirming hormones, measuring appearance congruence, depression, anxiety, positive affect and life satisfaction at six-month intervals with validated instruments. Appearance congruence, positive affect and life satisfaction increased and depression and anxiety symptoms decreased over the two years. The study had no control group, and two participants died by suicide during follow-up.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "New England Journal of Medicine (Chen et al., 2023)",
          sourceUrl: "https://doi.org/10.1056/NEJMoa2206297",
          reasoning:
            "The largest prospective US cohort on the question, enrolled before treatment with repeated validated measures. It is still observational with no comparison group, so improvement cannot be separated from natural course, regression to the mean or the effect of attentive care. The two deaths are reported in the paper and belong in any honest summary of it.",
        },
        {
          id: "tordoff-jama-2022",
          title: "Seattle cohort of 104 youth: 60% lower odds of moderate-to-severe depression after a year of care (JAMA Network Open, 2022)",
          description:
            "A 2022 prospective cohort study by Tordoff et al. followed 104 transgender and nonbinary youth aged 13 to 20 at a Seattle clinic. Over 12 months, those receiving puberty blockers or hormones had 60% lower odds of moderate-to-severe depression and 73% lower odds of suicidality than those not yet receiving them. Critics note the small sample, the absence of an untreated comparison group followed in parallel, short follow-up and that 22% of participants were lost to follow-up.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "Tordoff et al., JAMA Network Open (2022)",
          sourceUrl: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2789423",
          reasoning:
            "Peer-reviewed with validated instruments, and the direction matches other cohorts. The systematic reviews rated it low quality for the reasons above, so replicability is low until a controlled study repeats it.",
        },
        {
          id: "aap-endocrine-society-support",
          title: "AAP, Endocrine Society and AMA still support access to blockers and hormones for adolescents",
          description:
            "The American Academy of Pediatrics (2018, reaffirmed in 2023 while it commissioned a systematic review), the Endocrine Society (2017 guideline), the American Medical Association and WPATH (Standards of Care 8, 2022) support access to gender-affirming medical care for adolescents when clinically indicated. The AAP's 2018 statement endorsed a 'gender-affirming care model' over 'watchful waiting'. In February 2026 the AMA told NPR that it 'supports evidence-based treatment, including gender affirming care' and that 'surgical interventions in minors should be generally deferred to adulthood', which it called a clarification, not a reversal.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "American Academy of Pediatrics (Rafferty, Pediatrics, 2018); Endocrine Society; WPATH SOC 8; NPR (8 February 2026) on the AMA's statement",
          sourceUrl: "https://publications.aap.org/pediatrics/article/142/4/e20182162/37381/Ensuring-Comprehensive-Care-and-Support-for",
          reasoning:
            "The positions of the professional bodies whose members treat these patients carry weight. Independence is lower because policy statements reflect consensus processes rather than systematic reviews: the Cass Review found WPATH's standards were not built on systematic evidence review, and the AAP's own review has not been published.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: What happens years later (outcomes and harms)
    // =========================================================================
    {
      id: "long-term-outcomes",
      title: "What Happens Years Later: Regret, Bones, Fertility?",
      short_summary:
        "In the Dutch cohort, 98% of people who started blockers and hormones as adolescents were still taking hormones in their early twenties. Critics read that as treatment locking in a path rather than proof it was right. Blockers slow bone-density gains, and going straight from blockers to hormones can leave fertility in doubt. No study follows today's patients for 20 years.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "The parts of this treatment that cannot be undone are known, and its long-run benefits are not. Blockers reduce bone-density gains in the years when adolescents build peak bone mass, and the reviews find no evidence that density fully recovers. An adolescent who moves from early blockers straight to cross-sex hormones may never develop mature eggs or sperm. Most follow-up runs under five years, regret studies lose track of the people most likely to regret, and the high rate at which Dutch patients continued hormones may show that starting blockers sets a course, since nearly all who start go on, rather than that each patient was rightly chosen. These are lifelong decisions taken at 13 or 14 on short-term data.",
      proponent_rebuttal:
        "The people who started this care as adolescents overwhelmingly stay with it: of 720 Dutch patients who began blockers before 18, 98% were still taking gender-affirming hormones at follow-up, at a median age of about 20, a rate that is hard to square with fears of widespread regret. Blockers have been used for precocious puberty since the 1980s, bone density can be monitored and managed, and fertility preservation can be offered before hormones. No other area of pediatrics waits for 20-year data before treating: ADHD stimulants, SSRIs and growth hormone are prescribed without it. And untreated puberty causes permanent changes of its own.",
      crux: {
        id: "long-term-outcome-study",
        title: "The Prospective Long-Term Outcome Cohort",
        question:
          "Do long-term outcomes show lasting benefit and low regret compared with psychosocial support alone?",
        description:
          "The decisive data would follow adolescents assessed at gender clinics for a decade or more, comparing those given medical treatment with those given psychosocial support alone on mental health, regret, detransition, bone health and fertility, with little loss to follow-up.",
        methodology:
          "Link clinic records to national prescription and health registries (as the Dutch and Finnish studies did) to follow every adolescent assessed, not only those who stay in contact with the clinic, for 10-20 years. Compare treatment pathways on validated mental-health measures, discontinuation and regret, DXA bone density and fractures, and fertility outcomes.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Follow adolescents assessed at gender clinics for ten years or more, comparing those who received medical treatment with those who received psychosocial support only on mental health, regret, detransition and physical health, using national registries such as Finland's and Sweden's to limit loss to follow-up.",
        },
        cost_to_verify:
          "$50-100M (20-year prospective multi-site cohort); registry linkage studies cost far less",
        falsification: {
          supporter_flip:
            "If registry follow-up of today's adolescent patients found high rates of stopping or regret, lasting bone or fertility harm, or no mental-health advantage for the medical pathway over psychosocial support, the treatment model would need fundamental revision.",
          skeptic_flip:
            "If registry studies of today's referral population showed continuation as high as the Dutch cohort's 98%, low regret, and bone and fertility effects that monitoring and preservation managed, the demand for 20-year data first would ask more than pediatrics asks of stimulants or SSRIs.",
          common_ground:
            "Both sides agree there is no 20- or 30-year outcome data for today's patients, most studies follow patients for under five years, and bone density and fertility need monitoring and planning.",
          live_disagreement:
            "Whether high continuation shows the right patients were treated or that treatment sets a course, and whether effects on bone and fertility are manageable over decades.",
        },
      },
      evidence: [
        {
          id: "dutch-continuation-98-percent",
          title: "98% of Dutch patients who began blockers before 18 were still on hormones at follow-up (Lancet Child & Adolescent Health, 2022)",
          description:
            "Van der Loos and colleagues linked records of 720 people who started puberty suppression before 18 at Amsterdam UMC to the national prescription registry. At the end of data collection (31 December 2018), when the median age was about 19 to 20, 704 (98%) were still taking gender-affirming hormones. Age, puberty stage and year of starting treatment were not associated with stopping. The authors called the continuation 'reassuring considering the worries that people who started treatment in adolescence might discontinue'.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "van der Loos et al., 'Continuation of gender-affirming hormones in transgender people starting puberty suppression in adolescence', Lancet Child & Adolescent Health 6(12):869-875 (2022)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/36273487/",
          reasoning:
            "Registry linkage avoids the loss-to-follow-up problem that weakens most regret studies, and the number is striking. Continuation is not the same as benefit: critics argue blockers may set a course, and the cohort was assessed under the stricter Dutch protocol, so it may not describe today's broader referral population. The clinic that runs the treatment also ran the study.",
        },
        {
          id: "dutch-protocol-foundation",
          title: "The Dutch protocol studies: psychological functioning improved in 70 carefully selected adolescents (2011, 2014)",
          description:
            "The treatment model was built on two studies from Amsterdam (de Vries et al., 2011 and 2014) following 70 adolescents through puberty suppression and cross-sex hormones; the 2014 study found psychological functioning improved after treatment and gender dysphoria resolved. These patients had childhood-onset gender dysphoria, met strict diagnostic criteria and were extensively evaluated. The Cass Review noted that today's clinic population, larger and often with adolescent-onset dysphoria and other conditions, differs substantially from this cohort.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "de Vries et al., Pediatrics (2014); Journal of the American Academy of Child & Adolescent Psychiatry (2011)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/25201798/",
          reasoning:
            "The foundational evidence for the whole model, published in strong journals. Small, highly selected and uncontrolled, and no comparable controlled study has followed, so replicability is low.",
        },
        {
          id: "bone-density-concerns",
          title: "Puberty blockers slow bone-density gains in the years peak bone mass is built",
          description:
            "Adolescence is when roughly 40-60% of peak bone mass is established. Studies have found that adolescents on puberty blockers gain less bone mineral density than age-matched peers; a 2020 study in the Journal of Bone and Mineral Research found lower bone-density Z-scores in transgender adolescents on blockers. The systematic reviews found no evidence that density fully recovers after blockers stop, though data are limited. Low peak bone density is a risk factor for osteoporosis later in life.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Journal of Bone and Mineral Research (2020); NHS-commissioned systematic review",
          sourceUrl: "https://asbmr.onlinelibrary.wiley.com/doi/10.1002/jbmr.4042",
          reasoning:
            "Objective DXA measurements of a biologically well-grounded concern. Whether the deficit turns into fractures decades later is unknown, which is why the long-term cohort matters.",
        },
        {
          id: "fertility-unknown-long-term",
          title: "Going from early blockers straight to hormones may leave a young person without mature eggs or sperm",
          description:
            "Adolescents who move from puberty blockers directly to cross-sex hormones may never develop mature gametes, because suppression stops the maturation process. Fertility preservation is possible if puberty progresses far enough first, which means going through some of the puberty that causes distress; for early-pubertal adolescents the options are experimental. The Endocrine Society's guideline treats fertility as a key informed-consent issue.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Endocrine Society Clinical Practice Guideline (Hembree et al., 2017)",
          sourceUrl: "https://academic.oup.com/jcem/article/102/11/3869/4157558",
          reasoning:
            "Based on established reproductive biology and acknowledged by the guideline that supports treatment. It bears most directly on whether a young adolescent can give informed consent to a pathway with this cost.",
        },
        {
          id: "detransition-regret-rates",
          title: "Regret studies report about 1%, but mostly in adults after surgery and with heavy loss to follow-up",
          description:
            "A widely cited 2021 meta-analysis (Bustos et al.) found about 1% regret across 27 studies of gender-affirming surgery. These studies mostly assess adults after surgery, not adolescents on blockers or hormones. The Cass Review and others found that regret studies typically count only people who stay in contact with gender clinics, follow patients for under five years and use no standard definition of regret.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Bustos et al., Plastic and Reconstructive Surgery – Global Open (2021); Cass Review (2024)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/33968550/",
          reasoning:
            "The low headline figure rests on adult surgical cohorts and misses people who leave clinic care, so it cannot show that regret among today's adolescent patients is low. It cuts against confident claims of proven safety more than it shows regret is common.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Consent, and the cost of waiting (values)
    // =========================================================================
    {
      id: "ethical-consent-autonomy",
      title: "Can Teenagers Consent, and What Does Waiting Cost?",
      short_summary:
        "Transgender teenagers report far higher rates of depression and suicidal thoughts than their peers, and supporters see withholding care as a choice with its own harms. A Finnish register study of 2,083 gender-referred young people found their higher suicide rate was explained by psychiatric illness, not gender dysphoria. Whether a 14-year-old can weigh a lifelong trade-off, and whose judgment governs, is a value question no study closes.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Adolescents can consent to many treatments, but this one trades fertility, bone health and an unknown future for relief now, and the judgment that weighs such trade-offs is still maturing into the twenties. The argument that withholding treatment will cost lives is not supported by the best data: in a Finnish register of every gender-referred young person from 1996 to 2019, the higher suicide rate disappeared once specialist psychiatric treatment was accounted for, which points to treating depression and other conditions first. Many of today's patients arrive with exactly those conditions. Telling families 'affirm or lose your child' pressures a decision the evidence cannot support.",
      proponent_rebuttal:
        "Waiting is not neutral: an adolescent denied treatment goes through a puberty that makes permanent changes of its own, and distress among transgender youth runs high. In the Trevor Project's 2021 national survey, 52% of transgender and nonbinary youth had seriously considered suicide in the past year. Teenagers already consent, with their parents and doctors, to psychiatric drugs with serious side effects, and no one asks a boy given testosterone for delayed puberty to prove mature judgment. Adolescents in gender clinics are assessed over months, often years, before any medicine. The Finnish study shows these young people need mental-health care too, not that they should be denied the treatment they seek.",
      crux: {
        id: "consent-maturity-assessment",
        title: "The Adolescent Decision-Making Capacity Evaluation",
        question:
          "Can adolescents with gender dysphoria grasp long-term consequences as well as adults can?",
        description:
          "If adolescents with persistent gender dysphoria show decision-making capacity comparable to adults or to teenagers consenting to other serious treatments, the consent objection loses force. If their grasp of long-term consequences such as fertility is systematically weaker, stronger safeguards or age thresholds are warranted. How much weight a teenager's own judgment should carry is a value fork the measurement informs but does not settle.",
        methodology:
          "A prospective study scoring adolescents at gender clinics on validated capacity instruments (the MacArthur Competence Assessment Tool for Treatment) at assessment and over time, against adolescents consenting to other serious treatments and against adults, and tracking whether early decisions match satisfaction and identity stability ten years on.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A prospective study scoring about 500 adolescents at gender clinics on the MacArthur Competence Assessment Tool over time, against teens consenting to other treatments and against adults.",
        },
        cost_to_verify:
          "$3-8M (prospective longitudinal study with 10-year follow-up at multiple sites)",
        falsification: {
          supporter_flip:
            "If a prospective study using the MacArthur Competence Assessment Tool found adolescents at gender clinics systematically less able than adults, or than teens consenting to other treatments, to understand consequences such as infertility, stronger safeguards or age thresholds would be warranted.",
          skeptic_flip:
            "If capacity studies found teens at gender clinics consenting as well as teens taking psychiatric drugs with serious side effects, and their early decisions held up ten years on, the consent objection would lose much of its force.",
          common_ground:
            "Both sides agree some changes are permanent either way: cross-sex hormones cause partially irreversible effects, and so does endogenous puberty.",
          live_disagreement:
            "Whether adolescents with persistent, well-evaluated dysphoria can weigh lifelong consequences well enough to consent, and whether the cost of waiting is greater than the cost of acting.",
        },
      },
      evidence: [
        {
          id: "finland-suicide-register-2024",
          title: "Finnish register of 2,083 gender-referred youth: higher suicide rate explained by psychiatric treatment history (BMJ Mental Health, 2024)",
          description:
            "Ruuska and colleagues followed every under-23 referred to Finland's specialist gender identity services from 1996 to 2019 (2,083 people) against 16,643 matched controls. Suicide was more common in the gender-referred group (0.3% vs 0.1%), but once specialist-level psychiatric treatment was controlled for, neither all-cause nor suicide mortality differed significantly (suicide hazard ratio 1.8, 95% CI 0.6 to 4.8). The authors concluded that clinical gender dysphoria 'does not appear to be predictive of all-cause nor suicide mortality when psychiatric treatment history is accounted for'.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Ruuska, Tuisku, Holttinen & Kaltiala, BMJ Mental Health 27(1):e300940 (2024)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/38367979/",
          reasoning:
            "Whole-population registry data with matched controls, the strongest design on this question. It weakens the claim that withholding medical treatment itself drives suicide; it does not test whether medical treatment lowers risk, and the confidence interval is wide. The senior author helped shape Finland's restrictions.",
        },
        {
          id: "prefrontal-cortex-development",
          title: "Brain systems for long-term planning keep maturing into the twenties",
          description:
            "Neuroscience research shows that the prefrontal cortex, which supports long-term planning, risk assessment and impulse control, continues to mature into the early-to-mid twenties. There is no validated 'fully developed at 25' threshold; maturation is gradual and varies between individuals. Adolescents, especially under emotional arousal or peer influence, are more likely to weight immediate relief over long-term consequences.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          source: "Arain et al., Neuropsychiatric Disease and Treatment (2013), via NIH PMC",
          sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3621648/",
          reasoning:
            "Well established, but it applies to all adolescent medical decisions, not to this treatment in particular, and adolescents routinely make competent medical decisions with their parents. Directness is low.",
        },
        {
          id: "mental-health-crisis-untreated",
          title: "Trevor Project 2021 survey: 52% of transgender and nonbinary youth seriously considered suicide in the past year",
          description:
            "The Trevor Project's 2021 national survey found that 52% of transgender and nonbinary youth had seriously considered suicide in the past year and 20% had attempted it. A 2020 Pediatrics study (Turban et al.) found that transgender adults who had access to puberty blockers as adolescents reported lower lifetime suicidal ideation than those who wanted them but could not get them. Both rely on self-report from non-random samples.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "The Trevor Project, 2021 National Survey on LGBTQ Youth Mental Health; Turban et al., Pediatrics (2020)",
          sourceUrl: "https://www.thetrevorproject.org/survey-2021/",
          reasoning:
            "The high distress is real and recognised by both sides. Whether medical treatment specifically, rather than family support, therapy or the passage of time, lowers it is the open question; the Cass Review found studies crediting medical treatment could not rule out those confounders.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Who decides (policy)
    // =========================================================================
    {
      id: "who-decides",
      title: "Who Should Decide: Doctors and Families, Regulators or Legislatures?",
      short_summary:
        "England confined blockers to research and cleared a trial in July 2026. Twenty-seven US states ban or restrict the treatments for minors, the Supreme Court upheld Tennessee's ban in 2025, and federal Medicaid funding ended in October 2026. New Zealand's High Court struck down a total ban as disproportionate. England saw no measured rise in suicides after its restriction; a US study links state laws to more suicide attempts.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "When the evidence is this weak and the effects permanent, the public is entitled to set limits through its legislatures, as it does for other treatments on minors. The Supreme Court held in United States v. Skrmetti (June 2025) that Tennessee's ban survives rational-basis review. England restricted puberty blockers to research, and Professor Louis Appleby's review for the government found 'the data do not support the claim that there has been a large rise in suicide' among Tavistock patients after the 2020 court ruling. Even surgeons are pulling back: in February 2026 the American Society of Plastic Surgeons recommended delaying gender-related surgery until 19, finding 'insufficient evidence demonstrating a favorable risk-benefit ratio' for the endocrine and surgical pathway.",
      proponent_rebuttal:
        "A blanket ban replaces the judgment of doctors and families who know the patient with a legislature's, and it lands on young people already at high risk. A difference-in-differences study of more than 61,000 young people found state anti-transgender laws enacted from 2018 to 2022 were followed by 7% to 72% more past-year suicide attempts among transgender and nonbinary 13- to 17-year-olds. In October 2026 New Zealand's High Court found a rational basis for some restrictions but held that a complete ban on new prescriptions was a disproportionate response that breached the Bill of Rights. Even the plastic surgeons who urged caution opposed 'criminal law or punitive legislative approaches'. Research-only access, England's route, is still access.",
      crux: {
        id: "access-restriction-outcomes",
        title: "The Restriction Outcomes Test",
        question:
          "Where access was cut, did distress and suicide among these teens rise, and who should make the call?",
        description:
          "Part of this is measurable: what happened to self-harm, suicide attempts and suicides among gender-questioning adolescents in places that banned or restricted medical treatment, compared with places that did not. Part is a value fork: whether such decisions belong to clinicians and families, to medical regulators, or to legislatures and courts.",
        methodology:
          "Compare hospital-recorded self-harm, suicide attempts and suicide deaths among adolescents referred for gender dysphoria before and after restrictions (England 2020-24, US states 2021-25, New Zealand if restrictions return) against matched jurisdictions without them, using registry data rather than opt-in surveys, and follow those given research-only access in England's PATHWAYS trial.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Registry counts of self-harm, suicide attempts and suicide deaths among gender-referred adolescents before and after bans in US states and England's research-only rule, against matched places without them, rather than opt-in surveys. Who should make the decision is a value choice those counts inform but do not make.",
        },
        cost_to_verify:
          "$1-3M (linking clinic referrals to hospital and death registries across jurisdictions)",
        falsification: {
          supporter_flip:
            "If registry data showed no rise in self-harm or suicide among gender-referred adolescents after restrictions, as Appleby's review found for the Tavistock, and research-only access served patients as well as routine care, the case against bans would rest on values, not outcomes.",
          skeptic_flip:
            "If registry studies, not only opt-in surveys, confirmed a rise in suicide attempts among transgender adolescents after bans, the claim that restrictions protect children would face a measured harm to set against its precaution.",
          common_ground:
            "Both sides agree the suicide counts after England's restrictions are small, that opt-in surveys are weaker than registry data, and that clinicians should assess and treat other mental-health conditions in these patients.",
          live_disagreement:
            "Whether bans or research-only access harm the adolescents they cover, and whether legislatures, regulators or doctors and families should decide.",
        },
      },
      evidence: [
        {
          id: "appleby-review-2024",
          title: "Appleby review: no large rise in suicides among Tavistock patients after England's 2020 restrictions (July 2024)",
          description:
            "Professor Louis Appleby, the UK government's adviser on suicide prevention, reviewed suicides among patients of the Tavistock gender identity service over six years. He found 12 in total, 6 under 18 and 6 aged 18 or over, with 5 in the three earlier years and 7 in the three later years, and for under-18s 3 before and 3 after. He concluded that 'the data do not support the claim that there has been a large rise in suicide by young patients', while warning that 'with small numbers, single-figure differences can be expected and causal explanations are unreliable.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source:
            "Prof. Louis Appleby, 'Review of suicides and gender dysphoria at the Tavistock and Portman NHS Foundation Trust: independent report', Department of Health and Social Care (19 July 2024)",
          sourceUrl:
            "https://www.gov.uk/government/publications/review-of-suicides-and-gender-dysphoria-at-the-tavistock-and-portman-nhs-foundation-trust/review-of-suicides-and-gender-dysphoria-at-the-tavistock-and-portman-nhs-foundation-trust-independent-report",
          reasoning:
            "A government expert's count of actual deaths, which tested a specific claim of a surge after restrictions. The numbers are too small to rule out a smaller effect either way, and the review covered clinic patients, not every gender-questioning young person.",
        },
        {
          id: "asps-surgery-19-2026",
          title: "Plastic surgeons' society recommends delaying gender surgery until 19 (February 2026)",
          description:
            "In a position statement issued on 3 February 2026, the American Society of Plastic Surgeons concluded 'there is insufficient evidence demonstrating a favorable risk-benefit ratio for the pathway of gender-related endocrine and surgical interventions in children and adolescents' and recommended that surgeons 'delay gender-related breast/chest, genital, and facial surgery until a patient is at least 19 years old.' The same statement affirmed that medical care is best regulated by 'professional self-regulation, rather than criminal law or punitive legislative approaches.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 5,
          },
          source:
            "American Society of Plastic Surgeons, 'Position Statement on Gender Surgery for Children and Adolescents' (issued 3 February 2026)",
          sourceUrl:
            "https://www.plasticsurgery.org/documents/health-policy/positions/2026-gender-surgery-children-adolescents.pdf",
          reasoning:
            "The first major US specialty society to break with the earlier consensus. Its recommendation covers surgery, which is rare in minors, rather than blockers or hormones, though its risk-benefit finding names the whole pathway. It rests on the same reviews as the rest of this pillar, so it adds a professional judgment rather than new data.",
        },
        {
          id: "skrmetti-2025",
          title: "Supreme Court upheld Tennessee's ban on blockers and hormones for minors, 6-3 (United States v. Skrmetti, June 2025)",
          description:
            "On 18 June 2025 the Supreme Court held, 6-3, that Tennessee's law banning puberty blockers and hormones for minors with gender dysphoria does not classify by sex or transgender status, is reviewed only for a rational basis, and survives that review. Kansas had become the 27th state to ban or restrict such care in February 2025. In August 2026 CMS finalised a rule ending federal Medicaid and CHIP payment for these treatments in minors, effective 13 October 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 6,
            directness: 2,
          },
          source:
            "United States v. Skrmetti, 605 U.S. ___ (2025); Yahoo News (18 February 2025) on Kansas; AJMC, 'CMS Final Rule Ends Federal Medicaid, CHIP Funding for Youth Gender-Affirming Care' (12 August 2026)",
          sourceUrl: "https://www.supremecourt.gov/opinions/24pdf/23-477_2cp3.pdf",
          reasoning:
            "These decisions govern access for millions of American teenagers, so a map about access needs them. None is evidence about outcomes: Skrmetti decides the standard of constitutional review, and the Court said it was not resolving the medical debate, so directness is minimal.",
        },
        {
          id: "state-laws-suicide-attempts-2024",
          title: "Study of 61,240 young people: state anti-trans laws followed by 7%-72% more suicide attempts (Nature Human Behaviour, 2024)",
          description:
            "Researchers at the Trevor Project used a difference-in-differences design on survey responses from 61,240 transgender and nonbinary 13- to 24-year-olds (35,196 aged 13-17) to compare states that enacted 48 anti-transgender laws from 2018 to 2022 with states that did not. They estimated the laws increased past-year suicide attempts by 7% to 72%, with significant rises for 13- to 17-year-olds in the first year after enactment, and found minimal evidence of an effect before the laws took effect. A 2026 critique in the same journal (Cohn, Sim & Kerr) questioned the methods; the authors replied that their interpretation stands.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 4,
            directness: 5,
          },
          source:
            "Lee, Hobbs et al., 'State-level anti-transgender laws increase past-year suicide attempts among transgender and non-binary young people in the USA', Nature Human Behaviour 8:2096-2106 (2024), research brief by The Trevor Project",
          sourceUrl:
            "https://www.thetrevorproject.org/research-briefs/state-level-anti-transgender-laws-increase-past-year-suicide-attempts-among-transgender-and-non-binary-young-people-in-the-usa/",
          reasoning:
            "A causal design applied to a large sample, and the best evidence that restrictions carry a cost. It relies on an opt-in online survey run by an advocacy organisation, it pools laws on sports and bathrooms with treatment bans, and its methods are contested, so independence and replicability are low.",
        },
        {
          id: "nz-high-court-ban-struck-2026",
          title: "New Zealand's High Court struck down a ban on new puberty-blocker prescriptions as disproportionate (October 2026)",
          description:
            "In November 2025 New Zealand's government made regulations stopping new prescriptions of puberty blockers for gender dysphoria; court orders kept them from taking effect. In a decision reported on 22 October 2026, the High Court ruled the regulations unlawful and set them aside: it found a rational basis for restricting access for some patients, but held a complete ban on new patients was a disproportionate response, that the government had not consulted adequately, and that the ban discriminated against gender-diverse young people in breach of the Bill of Rights. The Health Minister's office said the government remains committed to new safeguards for prescribing.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 4,
            directness: 3,
          },
          source:
            "1News, 'Puberty blocker restrictions for gender-diverse youth overturned by High Court' (22 October 2026)",
          sourceUrl:
            "https://www.1news.co.nz/2026/10/22/puberty-blocker-restrictions-for-gender-diverse-youth-overturned-by-high-court/",
          reasoning:
            "A court weighing the same evidence the reviews did and finding some restriction rational but a total ban disproportionate. It is a legal judgment under New Zealand's Bill of Rights, not new data on outcomes, so directness is low.",
        },
      ],
    },
  ],
  references: [
    {
      title: "The Cass Review: Independent Review of Gender Identity Services for Children and Young People — Final Report (2024)",
      url: "https://cass.independent-review.uk/home/publications/final-report/",
    },
    {
      title: "Miroshnychenko et al., Puberty blockers for gender dysphoria in youth: a systematic review and meta-analysis — Archives of Disease in Childhood (2025)",
      url: "https://pubmed.ncbi.nlm.nih.gov/39855724/",
    },
    {
      title: "HHS, Treatment for Pediatric Gender Dysphoria: Review of Evidence and Best Practices (final, November 2025)",
      url: "https://opa.hhs.gov/gender-dysphoria-report",
    },
    {
      title: "Ensuring Comprehensive Care and Support for Transgender and Gender-Diverse Children and Adolescents — AAP (2018)",
      url: "https://publications.aap.org/pediatrics/article/142/4/e20182162/37381/Ensuring-Comprehensive-Care-and-Support-for",
    },
    {
      title: "Endocrine Treatment of Gender-Dysphoric/Gender-Incongruent Persons — Endocrine Society (2017)",
      url: "https://academic.oup.com/jcem/article/102/11/3869/4157558",
    },
    {
      title: "Standards of Care Version 8 — World Professional Association for Transgender Health (2022)",
      url: "https://www.tandfonline.com/doi/full/10.1080/26895269.2022.2100644",
    },
    {
      title:
        "Medical Treatment Methods for Dysphoria Related to Gender Variance in Minors — COHERE/PALKO Finland Recommendation, Official English Summary (2020)",
      url: "https://palveluvalikoima.fi/documents/1237350/22895008/Summary_minors_en.pdf/aaf9a6e7-b970-9de9-165c-abedfae46f2e/Summary_minors_en.pdf",
    },
    {
      title: "Sweden Restricts Hormonal Treatment for Gender Dysphoric Minors — Socialstyrelsen (2022)",
      url: "https://www.socialstyrelsen.se/globalassets/sharepoint-dokument/artikelkatalog/kunskapsstod/2022-3-7799.pdf",
    },
    {
      title: "United States v. Skrmetti, 605 U.S. ___ (2025)",
      url: "https://www.supremecourt.gov/opinions/24pdf/23-477_2cp3.pdf",
    },
    {
      title: "High Court gives go-ahead for UK puberty blocker trial (PATHWAYS) to continue — Clinical Trials Arena (3 August 2026)",
      url: "https://www.clinicaltrialsarena.com/news/high-court-gives-go-ahead-for-uk-puberty-blocker-trial-to-continue/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is the evidence strong enough to justify medical treatment of minors?",
      content:
        "The systematic reviews since 2020 have graded the evidence low or very low certainty, yet major US medical organizations still support access. The disagreement is not only about what the studies show but about what evidentiary standard should apply to partly irreversible treatments for minors. Can both sides be acting in good faith while reaching opposite conclusions?",
    },
    {
      id: "q2",
      title: "Can adolescents meaningfully consent to interventions with lifelong consequences?",
      content:
        "Adolescents with gender dysphoria are suffering, and delaying treatment means going through a puberty that causes distress. But the brain systems that weigh long-term consequences keep maturing into the twenties. Minors consent, with their parents, to psychiatric medication and cancer treatment. Is this treatment different, or is the consent objection applied selectively?",
    },
    {
      id: "q3",
      title: "What do we do in the absence of long-term data?",
      content:
        "There is no 20-year outcome data for today's adolescent patients. Bone, fertility and cognitive effects are uncertain. Do we pause treatment and wait for data, accepting distress now, or continue and accept uncertainty about harms later? England chose research-only access and a trial; about half of US states chose bans; New Zealand's courts rejected a total ban. This is a values question science alone cannot resolve.",
    },
  ],
  aliases: [
    "Should transgender teens have access to gender-affirming medical care?",
    "Should trans kids get puberty blockers?",
    "Should minors receive gender-affirming care?",
    "Are puberty blockers safe for children?",
  ],
};
