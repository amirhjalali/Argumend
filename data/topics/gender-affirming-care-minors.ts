import type { Topic } from "@/lib/schemas/topic";

export const genderAffirmingCareMinorsData = {
  id: "gender-affirming-care-minors",
  title: "Gender-Affirming Care for Minors",
  meta_claim:
    "Evidence-based gender-affirming medical care for transgender adolescents, including puberty blockers and hormone therapy, improves mental health outcomes and should be accessible.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Medical Evidence
    // =========================================================================
    {
      id: "medical-evidence",
      title: "Medical Evidence & Clinical Research",
      short_summary:
        "Major US medical organizations endorse gender-affirming care for adolescents, but several European countries have recently restricted access after systematic evidence reviews found the research base to be weak. The Cass Review (UK, 2024), Finnish guidelines, and Swedish policy shifts all raised concerns about evidence quality, while US-based studies report mental health benefits.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The evidence base for pediatric gender-affirming medical interventions is far weaker than proponents acknowledge. The Cass Review (2024), commissioned by the UK National Health Service, conducted the most comprehensive systematic review to date and concluded that the evidence for puberty blockers and hormones in minors is of 'low' or 'very low' quality, with most studies having serious methodological limitations including small sample sizes, no control groups, high dropout rates, and short follow-up periods. Finland's COHERE (2020) and Sweden's National Board of Health and Welfare (2022) independently reached similar conclusions, restricting medical interventions to research settings. The Dutch Protocol studies — which form the foundation for global practice — involved a highly selected cohort of 70 adolescents with extensive psychological evaluation, a population very different from the much broader demographic presenting at gender clinics today. The 2022 York systematic review commissioned by the NHS found that of 9,000+ papers on puberty blockers, only 9 met minimum quality standards.",
      proponent_rebuttal:
        "Every major US medical organization — the American Academy of Pediatrics (AAP), the Endocrine Society, the American Medical Association (AMA), the American Psychological Association (APA), and the World Professional Association for Transgender Health (WPATH) — supports access to gender-affirming care for adolescents based on the available evidence. The 2022 study by Tordoff et al. in JAMA Network Open found that gender-affirming care was associated with 60% lower odds of moderate-to-severe depression and 73% lower odds of suicidality among transgender youth over 12 months. The 2020 Turban et al. study in Pediatrics found that access to puberty blockers was associated with lower lifetime suicidal ideation. The Cass Review's evidence standards would disqualify much of pediatric medicine — few areas of pediatric practice have randomized controlled trials because randomizing children to withhold treatment raises ethical concerns. The reality is that gender-diverse youth denied care suffer from depression, anxiety, and suicidality at catastrophic rates.",
      crux: {
        id: "evidence-quality-assessment",
        title: "The Evidence Quality Meta-Assessment",
        description:
          "The core factual dispute is whether the existing research on pediatric gender-affirming care meets the evidentiary threshold to justify medical treatment of minors. If independent systematic reviews consistently find the evidence is low-quality and insufficient, medical caution is warranted. If the evidence, while imperfect, consistently points toward benefit and is comparable in quality to evidence for other accepted pediatric treatments, withholding care causes net harm.",
        methodology:
          "Commission three independent systematic reviews by teams with no prior position on gender-affirming care — one from a country with permissive guidelines (US), one from a country that has restricted access (UK/Finland/Sweden), and one from a country with no prior policy position. Each team applies identical GRADE methodology to evaluate the same body of evidence. Compare conclusions to identify where disagreements stem from evidence interpretation vs. different evidentiary standards vs. different value judgments about acceptable risk.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Three independent systematic reviews by international research teams)",
      },
      evidence: [
        {
          id: "cass-review-2024",
          title: "The Cass Review: NHS Finds 'Low Quality' Evidence for Youth Gender Medicine (2024)",
          description:
            "Dr. Hilary Cass's independent review for the UK National Health Service, published in April 2024 after four years of investigation, found that the evidence base for puberty blockers and hormones in minors is of 'remarkably weak' quality. The review commissioned systematic reviews from the University of York, which found that of thousands of published studies, very few met basic quality standards. Key findings: no reliable evidence that puberty blockers improve mental health outcomes; the 'Dutch Protocol' studies involved a highly selected, unrepresentative cohort; referral demographics had shifted dramatically (with a large increase in adolescent females presenting with recent-onset gender distress); and long-term outcome data was essentially absent. The NHS subsequently closed the Tavistock GIDS clinic and established new regional centers with more cautious protocols.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "The Cass Review, NHS England",
          sourceUrl: "https://cass.independent-review.uk/home/publications/final-report/",
          reasoning:
            "The Cass Review is the most comprehensive systematic evaluation of pediatric gender medicine ever conducted, commissioned by a national health service with no partisan agenda and led by a senior pediatrician with no prior position on the issue. Its independence and thoroughness give it high credibility. The finding of weak evidence quality is a factual assessment of study methodology, not an opinion about whether treatment works.",
        },
        {
          id: "tordoff-jama-2022",
          title: "Tordoff et al.: Gender-Affirming Care Linked to 60% Lower Depression in Youth (2022)",
          description:
            "A 2022 prospective cohort study by Tordoff et al. published in JAMA Network Open followed 104 transgender and nonbinary youth (ages 13-20) receiving gender-affirming care at a Seattle clinic. Over 12 months, those receiving puberty blockers or hormones had 60% lower odds of moderate-to-severe depression and 73% lower odds of suicidality compared to baseline. The study used validated mental health instruments (PHQ-9 and GAD-7) and controlled for multiple confounders. Critics note the small sample size, lack of a control group, short follow-up, and that 22% of participants were lost to follow-up.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "JAMA Network Open",
          sourceUrl: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2789423",
          reasoning:
            "JAMA Network Open is a respected peer-reviewed journal, and the study used validated instruments. However, the Cass Review and York systematic reviews classified this and similar studies as low quality due to the absence of a control group (improvements could reflect natural course, placebo effect, or receiving any supportive attention), small sample size, short follow-up, and significant dropout. Replicability score is lower because the finding has not been replicated in a controlled trial.",
        },
        {
          id: "finland-sweden-restrictions",
          title: "Finland and Sweden Independently Restrict Youth Gender Medicine (2020-2022)",
          description:
            "Finland's COHERE (Council for Choices in Health Care, 2020) and Sweden's National Board of Health and Welfare (2022) independently reviewed the evidence and restricted hormonal interventions for minors to research settings. Finland concluded that gender reassignment of minors is 'an experimental practice' and prioritized psychotherapeutic support. Sweden concluded that 'the risks of puberty suppressive treatment with GnRH-analogues and gender-affirming hormonal treatment currently outweigh the possible benefits' for minors. Denmark followed in 2023 with similar restrictions. These decisions were made by politically progressive countries with universal healthcare systems and no conservative religious influence on health policy.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "Finnish COHERE; Swedish National Board of Health and Welfare (Socialstyrelsen)",
          sourceUrl: "https://segm.org/Finland_deviates_from_WPATH_prioritizes_psychotherapy",
          reasoning:
            "These decisions by Nordic health authorities carry exceptional weight because they come from countries with progressive social policies, universal healthcare, and strong LGBTQ+ rights protections. They cannot be dismissed as politically motivated. Multiple countries independently reaching the same conclusion about evidence quality strengthens the finding. The convergence across different health systems is itself a form of replication.",
        },
        {
          id: "aap-endocrine-society-support",
          title: "Major US Medical Organizations Support Access to Gender-Affirming Care",
          description:
            "The American Academy of Pediatrics (2018, reaffirmed 2023), the Endocrine Society (2017, updated 2022), the AMA, the APA, and WPATH (Standards of Care 8, 2022) all support access to gender-affirming medical care for adolescents when clinically indicated. The AAP's 2018 policy statement endorsed a 'gender-affirming care model' over 'watchful waiting' or attempts to change gender identity. The Endocrine Society guidelines recommend puberty blockers at Tanner Stage 2, with hormone therapy at age 16 (lowered from earlier guidelines). These organizations argue that their recommendations reflect the best available evidence and clinical expertise.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "American Academy of Pediatrics; Endocrine Society; WPATH SOC 8",
          sourceUrl: "https://publications.aap.org/pediatrics/article/142/4/e20182162/37381/Ensuring-Comprehensive-Care-and-Support-for",
          reasoning:
            "These are credible professional medical organizations. However, independence is lower because organizational policy statements reflect institutional consensus processes that can be influenced by advocacy, and the AAP's statement was adopted without a systematic evidence review (which it subsequently commissioned and which is still pending as of 2025). The Cass Review explicitly noted that WPATH's Standards of Care 8 was not based on systematic evidence review methodology. Organizational endorsement is not equivalent to strong evidence.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Ethical Consent & Adolescent Autonomy
    // =========================================================================
    {
      id: "ethical-consent-autonomy",
      title: "Ethical Consent & Adolescent Autonomy",
      short_summary:
        "The ethical debate centers on whether adolescents can meaningfully consent to medical interventions with potentially irreversible effects, and whether the greater harm lies in providing treatment with uncertain long-term outcomes or in withholding treatment from suffering youth.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Adolescents lack the neurodevelopmental maturity to consent to medical interventions with lifelong consequences. Prefrontal cortex development — responsible for long-term planning, risk assessment, and identity formation — continues until approximately age 25. We do not allow minors to get tattoos, drink alcohol, sign contracts, or consent to most elective medical procedures because we recognize that adolescent decision-making is qualitatively different from adult decision-making. Puberty blockers, while described as 'reversible,' have unknown long-term effects on bone density, brain development, and fertility when used for gender dysphoria (as opposed to their original indication for precocious puberty). Cross-sex hormones produce partially irreversible changes. The dramatic increase in referrals — particularly among adolescent females with no childhood history of gender distress — raises questions about social contagion, peer influence, and the role of social media in identity formation during a vulnerable developmental period.",
      proponent_rebuttal:
        "Adolescents with persistent, well-documented gender dysphoria are not making casual decisions — they have been evaluated by mental health professionals, endocrinologists, and often live in their identified gender for years before medical intervention. The consent process for gender-affirming care is far more rigorous than for many other accepted pediatric interventions. We allow adolescents to consent to psychiatric medications with significant side effects (SSRIs, antipsychotics), orthodontic procedures, and even cosmetic surgery for gynecomastia. The argument that adolescents cannot consent is selectively applied — no one questions a cisgender teenage boy receiving testosterone for delayed puberty. Withholding treatment is not a neutral act; it is an active decision that forces a transgender adolescent to undergo endogenous puberty that produces distressing, partially irreversible changes to their body. The mental health consequences of untreated gender dysphoria — including depression, self-harm, and suicidality — constitute a clear and present danger that must be weighed against hypothetical long-term risks.",
      crux: {
        id: "consent-maturity-assessment",
        title: "The Adolescent Decision-Making Capacity Evaluation",
        description:
          "If adolescents with gender dysphoria demonstrate decision-making capacity comparable to adults for medical decisions — understanding risks, benefits, alternatives, and long-term consequences — the consent argument for treatment is strong. If their understanding of long-term implications is systematically limited by developmental stage, additional safeguards or age thresholds are warranted.",
        methodology:
          "Conduct a prospective study of 500 adolescents presenting at gender clinics, assessing decision-making capacity using validated instruments (MacArthur Competence Assessment Tool for Treatment) at initial evaluation and at 6-month intervals. Compare their scores with: (1) adolescents consenting to other medical treatments (psychiatric medication, orthodontics, oncology), (2) adults consenting to gender-affirming care, and (3) age-matched controls. Simultaneously track whether initial treatment decisions align with long-term outcomes (satisfaction, regret, identity stability) over a 10-year follow-up period.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$3-8M (Prospective longitudinal study with 10-year follow-up at multiple sites)",
      },
      evidence: [
        {
          id: "prefrontal-cortex-development",
          title: "Prefrontal Cortex Development Continues Until Approximately Age 25",
          description:
            "Neuroscience research consistently shows that the prefrontal cortex — responsible for executive function, long-term planning, risk assessment, and impulse control — is not fully developed until approximately age 25. This is the basis for age restrictions on alcohol, tobacco, car rental, and other activities requiring mature risk assessment. Adolescents are more susceptible to peer influence, more likely to weight immediate rewards over long-term consequences, and less able to envision their future selves. This developmental reality applies to all medical decision-making, not just gender-affirming care.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "NIH; Nature Neuroscience; Journal of Adolescent Health",
          sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3621648/",
          reasoning:
            "Neurodevelopmental research on prefrontal cortex maturation is well-established and independently replicated. However, directness is lower because this evidence applies to all adolescent medical decision-making, not specifically to gender-affirming care. The same logic would argue against allowing adolescents to consent to psychiatric medication, oncology treatment, or any other medical intervention with long-term consequences — a standard that is not consistently applied.",
        },
        {
          id: "detransition-regret-rates",
          title: "Detransition and Regret Rates: Low but Methodologically Uncertain",
          description:
            "Studies consistently report low regret rates for gender-affirming care, typically 1-5%. A 2021 meta-analysis in the Journal of the Endocrine Society found a 1% regret rate across 27 studies. However, the Cass Review identified severe methodological problems with regret studies: they typically measure regret only among those who remain in contact with gender clinics (excluding those who detransition and seek care elsewhere), follow-up periods are often under 5 years, and there is no standardized definition of 'regret.' The growing visibility of detransitioners — individuals who pursued transition and later reversed course — suggests the actual regret rate may be higher than clinical studies capture, though this population remains difficult to quantify systematically.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "Journal of the Endocrine Society; Cass Review; Archives of Sexual Behavior",
          sourceUrl: "https://academic.oup.com/jes/article/5/4/bvab011/6126016",
          reasoning:
            "The low headline regret rate (1-5%) is frequently cited but the methodological limitations identified by the Cass Review are serious — particularly the loss to follow-up problem, which systematically excludes the people most likely to regret. Replicability is low because no study has adequately solved the loss-to-follow-up problem. This evidence is important because regret rate directly measures whether consent was truly informed, but the current data is insufficient to draw confident conclusions either way.",
        },
        {
          id: "mental-health-crisis-untreated",
          title: "Untreated Gender Dysphoria Associated with Severe Mental Health Outcomes",
          description:
            "Multiple studies document catastrophic mental health outcomes among transgender youth denied affirming care. The 2021 Trevor Project National Survey found that 52% of transgender and nonbinary youth seriously considered suicide in the past year, with 20% attempting suicide. A 2020 Pediatrics study by Turban et al. found that transgender adults who had access to puberty blockers as adolescents had significantly lower lifetime suicidal ideation than those who wanted but could not access them. A 2022 study in the New England Journal of Medicine found that 1 in 3 transgender youth experienced clinical depression. While these studies have limitations (self-report, cross-sectional design, potential confounding from minority stress), the consistently elevated rates of distress among transgender youth are not disputed by any side of the debate.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "The Trevor Project; Pediatrics; New England Journal of Medicine",
          sourceUrl: "https://www.thetrevorproject.org/survey-2021/",
          reasoning:
            "The elevated rates of depression and suicidality among transgender youth are consistently documented across multiple studies and are not contested. This directly addresses the harm of inaction. However, the causal link between access to medical intervention specifically (versus social support, therapy, family acceptance) and reduced suicidality is less well-established. The Cass Review noted that studies attributing mental health improvements to medical interventions could not rule out confounders like receiving any supportive care.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Long-Term Outcomes
    // =========================================================================
    {
      id: "long-term-outcomes",
      title: "Long-Term Outcomes & Follow-Up Data",
      short_summary:
        "The fundamental gap in the evidence is long-term outcome data. The Dutch Protocol that established the treatment paradigm followed patients for a limited period. Most studies have follow-up under 5 years. We do not know the 20- or 30-year outcomes for adolescents who began puberty blockers and cross-sex hormones, including effects on bone density, cardiovascular health, fertility, cognitive development, and psychological well-being.",
      icon_name: "Telescope" as const,
      skeptic_premise:
        "We are conducting a population-level medical experiment on minors without adequate long-term data. Puberty blockers (GnRH agonists) were originally developed for precocious puberty — a different condition with a different treatment rationale and shorter duration of use. When used for gender dysphoria, they may be administered for years during critical developmental windows. The NHS's own systematic review found that puberty blockers did not improve bone health (a key concern since adolescence is when peak bone density is established) and may affect cognitive development, though data is insufficient. The long-term effects on fertility are unknown — a 16-year-old who goes from puberty blockers directly to cross-sex hormones may never develop mature gametes. We are making irreversible reproductive decisions for children who cannot fully comprehend the implications of permanent infertility.",
      proponent_rebuttal:
        "All medical interventions involve trade-offs between known benefits and uncertain long-term risks. Puberty blockers have been used safely for precocious puberty since the 1980s with a well-characterized safety profile. The long-term cardiovascular risks of testosterone in transgender men and estrogen in transgender women are monitored in the same way they are for cisgender people with hormonal conditions. Bone density concerns are manageable with supplementation and monitoring. Fertility preservation through egg or sperm banking is available before starting cross-sex hormones. The demand for 30-year outcome data before allowing treatment is a standard not applied to any other area of pediatric medicine — we prescribe stimulants for ADHD, SSRIs for depression, and growth hormone for short stature without 30-year RCT data. Withholding treatment while waiting for perfect evidence condemns a generation of transgender youth to suffering that the existing evidence, however imperfect, indicates is preventable.",
      crux: {
        id: "long-term-outcome-study",
        title: "The Prospective Long-Term Outcome Cohort",
        description:
          "The definitive resolution requires prospective, multi-decade follow-up of adolescents who received gender-affirming medical interventions compared with those who received psychosocial support only and those who received no treatment. If 20-year outcomes show sustained mental health improvement, low regret, and manageable physical side effects, the treatment is justified. If outcomes show high regret, significant medical complications, or no advantage over psychosocial support alone, the treatment paradigm needs fundamental revision.",
        methodology:
          "Establish a prospective, multi-site, international cohort of 5,000 adolescents presenting at gender clinics, stratified by treatment pathway (puberty blockers, hormones, psychosocial support only, no treatment). Follow for 20 years with annual assessments of: mental health (validated instruments), gender identity stability, treatment satisfaction/regret, bone density (DEXA scans), cardiovascular markers, fertility outcomes, cognitive function, and quality of life. Pre-register the protocol to prevent outcome switching. Fund independently of pharmaceutical companies and advocacy organizations.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$50-100M (20-year prospective multi-site international cohort study)",
      },
      evidence: [
        {
          id: "dutch-protocol-foundation",
          title: "The Dutch Protocol: Foundational Study of 70 Adolescents (2011-2014)",
          description:
            "The treatment paradigm for adolescent gender-affirming care was established by two studies from the Amsterdam VU University Medical Center (de Vries et al., 2011 and 2014), following 70 adolescents through puberty suppression and cross-sex hormones. The 2014 study found that psychological functioning improved after treatment and gender dysphoria resolved. However, these patients were highly selected through extensive evaluation, had childhood-onset gender dysphoria, and met strict diagnostic criteria. The Cass Review noted that the current population presenting at gender clinics — larger, more diverse, often with adolescent-onset dysphoria and multiple comorbidities — differs substantially from this cohort, raising questions about generalizability.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "de Vries et al., Pediatrics (2014); Journal of the American Academy of Child & Adolescent Psychiatry (2011)",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/25201798/",
          reasoning:
            "The Dutch Protocol studies are published in high-quality journals and are the foundational evidence for the entire treatment paradigm. However, the sample size (70) is small, the cohort was highly selected, there was no control group, and the follow-up was relatively short. The Cass Review's concern about generalizability to the current, much broader clinical population is well-founded. Replicability is low because no comparable controlled study has been conducted, and the original authors themselves have expressed concern about the application of their protocol to different populations.",
        },
        {
          id: "bone-density-concerns",
          title: "Puberty Blockers May Compromise Bone Density During Critical Development",
          description:
            "Adolescence is when approximately 40-60% of peak bone mass is established. Several studies have found that puberty blockers reduce bone mineral density gains during treatment. A 2020 study in the Journal of Bone and Mineral Research found that transgender adolescents on puberty blockers had significantly lower bone density Z-scores compared to age-matched peers. The NHS systematic review commissioned by the Cass Review found no evidence that bone density fully recovers after blockers are discontinued, though data was limited. Low peak bone density established in adolescence is a risk factor for osteoporosis later in life. Proponents argue that bone density monitoring and supplementation mitigate this risk.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Journal of Bone and Mineral Research; NHS Systematic Review; The Lancet Diabetes & Endocrinology",
          sourceUrl: "https://asbmr.onlinelibrary.wiley.com/doi/10.1002/jbmr.4042",
          reasoning:
            "Bone density studies use objective DXA scan measurements with good reliability. The concern about peak bone mass is biologically well-grounded — this is not speculative. However, the clinical significance of reduced bone density in this context is uncertain: we do not yet know whether it translates to increased fracture risk decades later. Long-term data is needed to determine whether this is a manageable side effect or a serious complication.",
        },
        {
          id: "fertility-unknown-long-term",
          title: "Long-Term Fertility Effects of Early Puberty Suppression Remain Unknown",
          description:
            "Adolescents who proceed from puberty blockers directly to cross-sex hormones may never develop mature gametes (eggs or sperm), as puberty suppression prevents the maturation process. The long-term fertility effects for this pathway are unknown because the population is too young and the practice too recent for outcome data to exist. Fertility preservation (egg or sperm banking) is possible if puberty is allowed to progress sufficiently before intervention, but this requires experiencing the puberty that causes distress. For pre-pubertal or early-pubertal adolescents, fertility preservation options are experimental. The Endocrine Society guidelines acknowledge fertility as a key informed consent issue.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Endocrine Society Guidelines; Fertility and Sterility; The Lancet Child & Adolescent Health",
          sourceUrl: "https://academic.oup.com/jcem/article/102/11/3869/4157558",
          reasoning:
            "The fertility concern is based on established reproductive biology (puberty is required for gamete maturation) and is acknowledged by all sides of the debate, including the Endocrine Society. The unknown nature of long-term fertility outcomes is itself the evidence — we are genuinely in uncharted territory. This directly challenges whether informed consent is possible when the long-term consequences are genuinely unknown.",
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
      title: "Finland's Gender Identity Services for Minors: COHERE Recommendation (2020)",
      url: "https://segm.org/Finland_deviates_from_WPATH_prioritizes_psychotherapy",
    },
    {
      title: "Sweden Restricts Hormonal Treatment for Gender Dysphoric Minors — Socialstyrelsen (2022)",
      url: "https://www.socialstyrelsen.se/globalassets/sharepoint-dokument/artikelkatalog/kunskapsstod/2022-3-7799.pdf",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is the evidence strong enough to justify medical treatment of minors?",
      content:
        "Major US medical organizations endorse gender-affirming care, but the Cass Review, Finland, Sweden, and Denmark have all restricted access after finding the evidence base weak. The fundamental disagreement is not just about what the studies show, but about what evidentiary standard should apply to irreversible medical interventions on minors. Can both sides be acting in good faith while reaching opposite conclusions?",
    },
    {
      id: "q2",
      title: "Can adolescents meaningfully consent to interventions with lifelong consequences?",
      content:
        "Adolescents with gender dysphoria are suffering, and delaying treatment means enduring a puberty that causes distress. But neuroscience shows the brain regions responsible for long-term decision-making are not fully developed until age 25. We allow minors to consent to psychiatric medication and oncology treatment — is gender-affirming care fundamentally different, or is the consent objection selectively applied?",
    },
    {
      id: "q3",
      title: "What do we do in the absence of long-term data?",
      content:
        "We have no 20-year outcome data for the current generation of adolescents receiving puberty blockers and hormones. Bone density, fertility, cognitive, and cardiovascular effects are genuinely unknown for this population. Do we pause treatment and wait for data (causing known suffering now), or continue treatment and accept uncertainty (risking unknown harms later)? This is fundamentally a values question that science alone cannot resolve.",
    },
  ],
};
