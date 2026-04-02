import type { Topic } from "@/lib/schemas/topic";

export const glp1WeightLossDrugsData = {
  id: "glp1-weight-loss-drugs",
  title: "GLP-1 Weight Loss Drugs",
  meta_claim:
    "GLP-1 receptor agonists like Ozempic and Mounjaro represent a safe, effective long-term solution to the obesity epidemic that should be widely accessible, not a dangerous shortcut that medicalizes a lifestyle problem.",
  status: "contested" as const,
  category: "science" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Clinical Efficacy & Long-Term Safety
    // =========================================================================
    {
      id: "clinical-efficacy-safety",
      title: "Clinical Efficacy & Long-Term Safety",
      short_summary:
        "Large RCTs show GLP-1 agonists produce 15-22% body weight loss and reduce cardiovascular events by 20%, but questions remain about long-term safety beyond 4 years, muscle mass loss, and what happens when patients stop taking the drugs.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The clinical evidence for GLP-1 drugs, while impressive in the short term, is fundamentally incomplete. The longest randomized trials run only 2-4 years — a blink in a condition patients would need to treat for life. The STEP 1 trial showed participants regained two-thirds of lost weight within one year of discontinuation, meaning these drugs do not cure obesity but create pharmaceutical dependency. Up to 40% of weight lost on semaglutide is lean muscle mass, not fat, which accelerates sarcopenia and increases fall risk — particularly dangerous for older adults. Reports of gastroparesis, pancreatitis, bowel obstruction, and suicidal ideation continue to accumulate in FDA adverse event databases. The SELECT trial's cardiovascular benefit was modest (a 20% relative risk reduction translating to a 1.5% absolute risk reduction) and was conducted in a population already on standard cardiac care. We are conducting the largest uncontrolled experiment in pharmaceutical history on tens of millions of people based on 3-4 years of data.",
      proponent_rebuttal:
        "The clinical evidence for GLP-1 receptor agonists is among the strongest in obesity medicine history. The STEP program enrolled over 10,000 participants across multiple Phase 3 trials, demonstrating 15-17% weight loss with semaglutide 2.4mg. Tirzepatide (Mounjaro) showed even greater efficacy: the SURMOUNT-1 trial demonstrated 22.5% weight loss at the highest dose. The SELECT trial — a landmark 17,604-patient cardiovascular outcomes trial — proved that semaglutide reduces major adverse cardiovascular events by 20%, the first time any anti-obesity medication has demonstrated cardioprotection. The concern about muscle loss is valid but manageable: resistance training preserves lean mass, and the metabolic benefits of losing 15-20% body weight far outweigh the risks of continued obesity, which kills over 2.8 million people annually worldwide. GLP-1 agonists have been prescribed for diabetes since 2005 — nearly two decades of real-world safety data. Weight regain after discontinuation is not a flaw of the drug; it confirms that obesity is a chronic disease requiring ongoing treatment, just like hypertension or diabetes.",
      crux: {
        id: "long-term-safety-profile",
        title: "The Long-Term Safety & Discontinuation Test",
        description:
          "The definitive question is whether GLP-1 agonists remain safe and effective over 10+ years of continuous use, and whether the metabolic benefits persist or reverse upon discontinuation. If long-term use reveals cumulative risks (thyroid cancer, pancreatic disease, irreversible gastroparesis) that rival the morbidity of untreated obesity, the risk-benefit calculus changes fundamentally.",
        methodology:
          "Conduct a 10-year prospective cohort study comparing GLP-1 users vs. matched controls on: all-cause mortality, cardiovascular events, cancer incidence (particularly thyroid and pancreatic), gastrointestinal complications, body composition (DXA scans for lean mass vs. fat mass), and metabolic markers. Include a discontinuation arm tracking outcomes for 3+ years after stopping treatment. Cross-reference with FDA FAERS data and international pharmacovigilance databases.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$50-100M (Large prospective cohort study with 10-year follow-up and imaging)",
      },
      evidence: [
        {
          id: "step-1-trial",
          title: "STEP 1 Trial: Semaglutide Produces 14.9% Weight Loss Over 68 Weeks",
          description:
            "The landmark STEP 1 randomized controlled trial enrolled 1,961 adults with obesity (BMI >= 30) or overweight with comorbidities. Participants receiving semaglutide 2.4mg weekly lost 14.9% of body weight compared to 2.4% with placebo over 68 weeks. One-third of participants lost more than 20% of their body weight. Gastrointestinal adverse events (nausea, diarrhea, vomiting) occurred in 74% of the semaglutide group but were mostly mild to moderate and declined over time.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "New England Journal of Medicine",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183",
          reasoning:
            "Published in the NEJM, the gold standard of medical journals, and replicated across the STEP trial program. The trial was industry-funded by Novo Nordisk, which slightly reduces independence, but the results have been independently verified. The magnitude of weight loss is unprecedented for any anti-obesity medication.",
        },
        {
          id: "select-cardiovascular",
          title: "SELECT Trial: Semaglutide Reduces Cardiovascular Events by 20%",
          description:
            "The SELECT trial, a double-blind RCT of 17,604 adults aged 45+ with overweight/obesity and established cardiovascular disease (but not diabetes), found that semaglutide 2.4mg reduced the risk of major adverse cardiovascular events (MACE) by 20% over a median 39.8-month follow-up. This includes a 28% reduction in nonfatal heart attacks. The absolute risk reduction was 1.5 percentage points (6.5% vs. 8.0%). This was the first time any anti-obesity medication demonstrated cardiovascular benefit.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "New England Journal of Medicine",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2307563",
          reasoning:
            "A massive, well-designed cardiovascular outcomes trial published in the NEJM. The 20% MACE reduction is clinically meaningful, though the absolute risk reduction of 1.5% over 3.3 years is more modest. Industry-funded but independently adjudicated. The cardiovascular benefit may extend beyond weight loss, as the effect appeared before significant weight change.",
        },
        {
          id: "weight-regain-discontinuation",
          title: "STEP 1 Extension: Two-Thirds of Weight Regain Within One Year of Stopping",
          description:
            "The STEP 1 trial extension followed participants for one year after discontinuation of semaglutide. Participants regained approximately two-thirds of the weight they had lost, going from 17.3% weight loss at 68 weeks to only 5.6% net weight loss at 120 weeks. Improvements in cardiometabolic risk factors (waist circumference, blood pressure, HbA1c) also partially reversed. This suggests that GLP-1 drugs require indefinite use — potentially decades — to maintain benefits.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "Diabetes, Obesity and Metabolism (Wiley)",
          sourceUrl: "https://dom-pubs.pericles-prod.literatumonline.com/doi/10.1111/dom.14725",
          reasoning:
            "Published in a respected peer-reviewed journal with rigorous methodology. The weight regain data is robust and consistent across multiple GLP-1 discontinuation studies. This is the strongest evidence that GLP-1s create long-term pharmaceutical dependency rather than resolving the underlying condition.",
        },
        {
          id: "muscle-mass-loss",
          title: "Up to 40% of GLP-1 Weight Loss Is Lean Muscle Mass, Not Fat",
          description:
            "Body composition analyses from GLP-1 trials using DXA scans reveal that 25-40% of total weight lost is lean body mass rather than fat. A 2023 JAMA study found that semaglutide users lost significantly more lean mass than those using lifestyle intervention alone. For a patient losing 35 pounds, this could mean losing 10-14 pounds of muscle. In older adults, this accelerates sarcopenia — age-related muscle wasting — increasing fall risk, frailty, and potentially long-term mortality. Resistance exercise can partially mitigate this, but many patients do not receive exercise counseling.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "JAMA Internal Medicine; The Lancet Diabetes & Endocrinology",
          sourceUrl: "https://jamanetwork.com/journals/jama/fullarticle/2812936",
          reasoning:
            "Multiple peer-reviewed studies with DXA scan data confirm disproportionate lean mass loss. This is a genuine clinical concern, particularly for older patients. However, context matters: untreated severe obesity also causes functional impairment, and the net effect of 15-20% weight loss on mobility and metabolic health is overwhelmingly positive even accounting for some muscle loss.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Access, Equity & Cost
    // =========================================================================
    {
      id: "access-equity-cost",
      title: "Access, Equity & Cost",
      short_summary:
        "GLP-1 drugs cost $800-1,350/month in the US, creating a two-tier obesity treatment system where wealthy patients get pharmaceutical intervention while lower-income populations — who bear the highest obesity burden — are left behind.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "GLP-1 drugs are creating a two-tier healthcare system where the wealthy get thin while the poor stay sick. At list prices of $800-1,350 per month in the US, a year of treatment costs $10,000-16,000. As of 2025, most commercial insurers and many state Medicaid programs do not cover anti-obesity medications. Medicare is explicitly prohibited by law from covering weight-loss drugs, excluding 50+ million seniors. Meanwhile, obesity disproportionately affects Black (49.9% prevalence), Hispanic (45.6%), and low-income communities — the very populations least able to afford $1,000/month prescriptions. If 40% of American adults who qualify eventually seek treatment, the annual cost to the healthcare system would exceed $1 trillion. Novo Nordisk's revenue from semaglutide alone reached $21 billion in 2024, making Ozempic one of the best-selling drugs in history while patients ration doses or go without. This is not democratized medicine — it is pharmaceutical wealth extraction.",
      proponent_rebuttal:
        "The cost argument against GLP-1s ignores the staggering economic burden of untreated obesity: $173 billion annually in direct US healthcare costs, plus $150+ billion in lost productivity. An obese adult costs the healthcare system $1,861 more per year than a normal-weight adult. If GLP-1 drugs prevent even a fraction of obesity-related hospitalizations, surgeries, diabetes management, and cardiovascular interventions, they pay for themselves. Coverage is rapidly expanding: as of 2025, major insurers including UnitedHealthcare, Cigna, and Blue Cross have added anti-obesity medication coverage. The Treat and Reduce Obesity Act has been reintroduced in Congress to lift the Medicare coverage ban. Competition is driving prices down — Novo Nordisk faces challenges from Eli Lilly's tirzepatide, emerging oral formulations, and compounding pharmacies producing semaglutide at a fraction of the branded cost. Drug costs always decline as patents expire and generics enter the market. The alternative — bariatric surgery at $20,000-35,000 per procedure — is far more expensive and carries greater surgical risk.",
      crux: {
        id: "cost-effectiveness-analysis",
        title: "The Population-Level Cost-Effectiveness Test",
        description:
          "If providing GLP-1 drugs to the eligible obese population reduces total healthcare expenditure over a 10-year horizon — factoring in drug costs, reduced hospitalizations, prevented comorbidities, and productivity gains — then broad coverage is economically justified regardless of the per-unit drug price. If total spending increases without proportional health gains, the drugs represent a net cost that diverts resources from other interventions.",
        methodology:
          "Conduct a comprehensive health economics analysis using claims data from insurers who have implemented GLP-1 coverage. Compare total healthcare costs (drug costs + hospitalizations + comorbidity management + lost productivity) for matched cohorts of GLP-1 users vs. non-users over 5+ years. Model population-level scenarios for 10%, 25%, and 50% uptake among eligible adults. Use QALY (Quality-Adjusted Life Year) calculations to determine cost per QALY gained.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-10M (Large-scale health economics study with multi-year claims data analysis)",
      },
      evidence: [
        {
          id: "drug-pricing-us",
          title: "GLP-1 Drugs Cost $800-1,350/Month in the US vs. $50-200 Abroad",
          description:
            "The list price for Ozempic (semaglutide 1mg) is approximately $935/month and Wegovy (semaglutide 2.4mg) is approximately $1,349/month in the US. By comparison, the same drugs cost $50-200/month in most European countries, Canada, and other OECD nations where governments negotiate drug prices. A Rand Corporation study found US prices for GLP-1 agonists are 3-10x higher than in peer nations. Novo Nordisk earned $21 billion in semaglutide revenue in 2024, with profit margins exceeding 30%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source: "RAND Corporation; KFF Health Policy",
          sourceUrl: "https://www.kff.org/health-costs/issue-brief/what-we-know-about-the-cost-and-use-of-glp-1-drugs/",
          reasoning:
            "KFF and RAND are independent, nonpartisan health policy organizations. International price comparisons are publicly verifiable. The stark US pricing premium is the strongest argument that access barriers are artificial and policy-driven, not inherent to the drug.",
        },
        {
          id: "obesity-healthcare-costs",
          title: "Obesity Costs the US $173 Billion Annually in Direct Healthcare",
          description:
            "The CDC estimates that obesity-related conditions cost the US healthcare system $173 billion annually in direct medical costs as of 2019, a figure projected to exceed $200 billion by 2025. An individual with obesity incurs $1,861 more in annual healthcare costs than a normal-weight person. Obesity is linked to type 2 diabetes ($413 billion annual cost), cardiovascular disease ($407 billion), 13 types of cancer, and osteoarthritis. If GLP-1 drugs reduce obesity rates even modestly, the downstream savings in prevented comorbidities could offset drug costs.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "CDC; Milken Institute; American Medical Association",
          sourceUrl: "https://www.cdc.gov/obesity/adult-obesity-facts/index.html",
          reasoning:
            "CDC data is authoritative and independently verifiable. The economic burden of obesity is well-documented across multiple sources. However, the directness score is lower because this evidence shows the cost of the problem, not that GLP-1s are the most cost-effective solution — behavioral interventions, food policy, and bariatric surgery are alternatives.",
        },
        {
          id: "insurance-coverage-gaps",
          title: "Medicare Cannot Cover Weight-Loss Drugs; Medicaid Coverage Varies by State",
          description:
            "Federal law (the Social Security Act) explicitly prohibits Medicare from covering drugs used for weight loss, excluding more than 50 million seniors from GLP-1 coverage for obesity. As of 2025, only 14 state Medicaid programs cover anti-obesity medications. Among commercial insurers, coverage varies widely: some require prior authorization, step therapy (failing other treatments first), or BMI thresholds of 35+. A 2024 KFF survey found that even among insured adults prescribed GLP-1s, 30% reported difficulty affording their medication.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "KFF; Centers for Medicare & Medicaid Services; Congressional Research Service",
          sourceUrl: "https://www.kff.org/medicare/issue-brief/potential-costs-and-impact-of-glp-1-drugs-in-medicare/",
          reasoning:
            "The Medicare coverage ban is a verifiable statutory fact. KFF and CMS data on coverage gaps is authoritative. This is the most direct evidence that access to GLP-1 drugs is systematically skewed by income and insurance status, with the populations bearing the highest obesity burden facing the greatest barriers.",
        },
        {
          id: "competition-price-trends",
          title: "Competition and Compounding Are Driving GLP-1 Prices Down",
          description:
            "Market dynamics are beginning to reduce GLP-1 costs. Eli Lilly's tirzepatide competes directly with semaglutide, and Amgen, Pfizer, Viking Therapeutics, and others have GLP-1 candidates in late-stage trials. Compounding pharmacies have legally produced semaglutide at $100-300/month during FDA-declared shortages. Novo Nordisk announced a 40% list price reduction for some Ozempic doses in 2024 and launched a direct-to-consumer program. Oral semaglutide (Rybelsus) eliminates injection manufacturing costs. Analysts project branded GLP-1 prices will decline 30-50% by 2030 as competition intensifies.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Bloomberg; Morgan Stanley Healthcare Research; FDA",
          sourceUrl: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
          reasoning:
            "Market trends and analyst projections are partially speculative. Compounding pharmacy access depends on ongoing FDA shortage declarations and may be restricted. However, the competitive pipeline is real and verifiable through ClinicalTrials.gov. Price declines are plausible but uncertain in timing and magnitude.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Medicalization vs. Root Causes of Obesity
    // =========================================================================
    {
      id: "medicalization-root-causes",
      title: "Medicalization vs. Root Causes of Obesity",
      short_summary:
        "Critics argue GLP-1 drugs treat a symptom while ignoring the food environment, marketing, and policy failures that drive the obesity epidemic; proponents counter that obesity is a neurobiological disease that lifestyle interventions alone have consistently failed to control.",
      icon_name: "Target" as const,
      skeptic_premise:
        "GLP-1 drugs are a technological band-aid on a systemic problem. The obesity epidemic is not a mass failure of individual willpower — it is the predictable result of a food environment engineered for overconsumption. Ultra-processed foods now constitute 58% of American calories and are specifically designed to override satiety signals. The food industry spends $14 billion annually marketing primarily unhealthy products. Subsidies for corn, soy, and sugar make processed food artificially cheap while fruits and vegetables remain expensive. Rather than addressing these root causes through regulation, taxation, and food policy reform, society is choosing to put 100+ million people on lifelong injectable drugs — enriching pharmaceutical companies while leaving the obesogenic environment intact. Countries like Japan (3.6% obesity rate) and South Korea demonstrate that policy and food culture, not drugs, determine population-level obesity outcomes. GLP-1s treat individuals while the system that made them sick continues producing new patients.",
      proponent_rebuttal:
        "Framing obesity as purely a lifestyle or environmental problem ignores decades of neuroscience. Obesity involves dysregulation of hypothalamic appetite circuits, altered GLP-1 and GIP signaling, leptin resistance, and genetic variants that affect 40-70% of BMI variability. Telling people to eat less and exercise more has a 95% long-term failure rate — not because patients lack willpower, but because the brain actively defends a higher body weight set point through hormonal and neural mechanisms. GLP-1 drugs work precisely because they correct the underlying neurobiological dysfunction, restoring satiety signaling that has been disrupted. This is no different from treating hypertension with ACE inhibitors rather than only advising patients to reduce salt intake. Addressing the food environment is important but is a decades-long political project that has failed to gain traction against industry lobbying. Meanwhile, 2.8 million people die annually from obesity-related causes. Patients suffering today cannot wait for systemic food policy reform. Treating obesity as a disease — with effective medication — reduces stigma and saves lives now.",
      crux: {
        id: "lifestyle-vs-pharmacotherapy",
        title: "The Lifestyle Intervention Ceiling Test",
        description:
          "If the best available lifestyle interventions (intensive behavioral therapy, dietary counseling, supervised exercise) can produce and sustain comparable weight loss and health outcomes to GLP-1 drugs over 5+ years in real-world conditions, then pharmacotherapy is unnecessary medicalization. If lifestyle interventions consistently fail to match pharmacotherapy outcomes at the population level, this confirms that obesity has a neurobiological component that requires medical treatment.",
        methodology:
          "Conduct a 5-year pragmatic randomized trial comparing four arms: (1) intensive lifestyle intervention alone, (2) GLP-1 pharmacotherapy alone, (3) combined lifestyle + GLP-1, and (4) standard care. Primary outcomes: sustained weight loss at 5 years, cardiovascular events, quality of life, and total healthcare costs. Recruit from diverse socioeconomic backgrounds to test real-world generalizability. Include body composition (DXA), metabolic markers, and patient-reported outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$30-50M (Multi-center 5-year pragmatic RCT with four arms and diverse enrollment)",
      },
      evidence: [
        {
          id: "lifestyle-intervention-failure",
          title: "95% of Dieters Regain Lost Weight Within 5 Years",
          description:
            "A comprehensive meta-analysis published in the American Journal of Clinical Nutrition found that lifestyle interventions (diet and exercise) produce an average of 5-10% weight loss in the first 6 months, but 80-95% of individuals regain the lost weight within 2-5 years. The Look AHEAD trial — the largest lifestyle intervention RCT ever conducted with 5,145 participants — was stopped early after 9.6 years because intensive lifestyle intervention did not reduce cardiovascular events compared to standard care, despite producing modest sustained weight loss (6% vs. 3.5%). The biological mechanisms driving weight regain include persistent hormonal changes (elevated ghrelin, reduced leptin) that increase hunger for years after weight loss.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "American Journal of Clinical Nutrition; NEJM (Look AHEAD Trial)",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa1212914",
          reasoning:
            "The Look AHEAD trial is the definitive RCT on lifestyle intervention for obesity with cardiovascular outcomes. Its failure to reduce cardiovascular events despite sustained weight loss is powerful evidence that lifestyle intervention alone is insufficient. The high weight regain rate is among the most replicated findings in obesity research.",
        },
        {
          id: "ultra-processed-food-environment",
          title: "Ultra-Processed Foods Drive 58% of US Caloric Intake and Override Satiety",
          description:
            "Ultra-processed foods (UPFs) constitute 58% of total caloric intake for US adults and 67% for children, according to NHANES data. A landmark NIH randomized controlled trial by Kevin Hall found that participants consumed 500 extra calories per day when given unrestricted access to ultra-processed foods compared to unprocessed meals matched for macronutrients, salt, sugar, fat, and fiber — demonstrating that food processing itself, independent of nutritional content, drives overconsumption. The food industry spends $14 billion annually marketing these products, with $1.8 billion targeting children. Critics argue GLP-1 drugs let the food industry off the hook by treating the victims rather than regulating the cause.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "Cell Metabolism (NIH); BMJ; USDA Economic Research Service",
          sourceUrl: "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(19)30248-7",
          reasoning:
            "The Hall NIH study is a rigorous controlled feeding trial published in a top-tier journal. The NHANES data is authoritative. However, the directness score is lower because this evidence explains why obesity exists but does not demonstrate that food policy reform is more feasible or effective than pharmacotherapy. Both approaches may be necessary simultaneously.",
        },
        {
          id: "genetic-heritability-obesity",
          title: "40-70% of BMI Variation Is Genetically Determined",
          description:
            "Twin studies, genome-wide association studies (GWAS), and adoption studies consistently show that 40-70% of variation in BMI is attributable to genetic factors. Over 1,000 genetic loci associated with body weight have been identified, many affecting hypothalamic appetite regulation, fat storage, and metabolic rate. The FTO gene variant alone increases obesity risk by 20-30% and is carried by 44% of European-ancestry populations. A 2024 Nature Genetics meta-analysis of 800,000 individuals identified 500+ novel obesity-associated variants. This genetic architecture explains why individuals in the same food environment develop dramatically different body weights.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Nature Genetics; The Lancet; Annual Review of Genomics and Human Genetics",
          sourceUrl: "https://www.nature.com/articles/s41588-024-01797-z",
          reasoning:
            "Heritability estimates from twin and GWAS studies are highly replicated across populations and decades of research. This is strong evidence that obesity has a substantial biological basis that cannot be fully addressed by environmental or behavioral interventions alone, supporting the case for pharmacological treatment.",
        },
        {
          id: "japan-korea-obesity-rates",
          title: "Japan and South Korea Maintain Low Obesity Rates Through Policy and Culture",
          description:
            "Japan has an adult obesity rate of 3.6% and South Korea 5.3%, compared to 42.4% in the United States. Japan's 2008 Metabo Law mandates annual waist measurements for adults 40-74, with companies and local governments penalized for high obesity rates. School lunch programs in both countries emphasize whole foods prepared by on-site nutritionists. South Korea spends $30 per student per school meal, emphasizing traditional cuisine. These nations demonstrate that population-level obesity prevention is achievable through cultural norms, food policy, and systemic incentives rather than pharmaceutical intervention.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "WHO Global Health Observatory; The Lancet Public Health; OECD Health Data",
          sourceUrl: "https://www.who.int/data/gho/data/indicators/indicator-details/GHO/prevalence-of-obesity-among-adults-bmi-greaterequal-30-age-standardized-estimate-(-)",
          reasoning:
            "WHO and OECD obesity data is authoritative and standardized. However, replicability is lower because Japan and Korea's food cultures, genetics, and social structures differ fundamentally from the US — transplanting their policies may not produce comparable results. These countries also have rising obesity trends despite their policies, suggesting environmental factors are overwhelming cultural defenses.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Societal & Ethical Implications
    // =========================================================================
    {
      id: "societal-ethical-implications",
      title: "Societal & Ethical Implications",
      short_summary:
        "GLP-1 drugs raise profound questions about body image norms, off-label cosmetic use, pharmaceutical industry influence on medical guidelines, and whether framing obesity as a disease reduces stigma or deepens it.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The GLP-1 explosion is reshaping societal norms in troubling ways. An estimated 40% of semaglutide prescriptions are for patients with BMIs of 25-30 — overweight but not obese — or for purely cosmetic weight loss. Social media is saturated with influencer promotion of 'Ozempic face' and rapid transformation narratives. The American Academy of Pediatrics now recommends GLP-1s for children as young as 12, raising serious concerns about medicalizing adolescent body image during a mental health crisis. Novo Nordisk funded obesity research organizations that successfully lobbied to reclassify obesity as a disease in 2013, directly creating the regulatory pathway for their own drugs. The 'obesity is a chronic disease' framing, while reducing some stigma, also tells 42% of American adults they are permanently ill and need lifelong medication — a message that primarily serves pharmaceutical revenue. The diet and wellness industry has been replaced by something more powerful: a pharmaceutical industry selling the same promise with a prescription pad.",
      proponent_rebuttal:
        "The disease model of obesity is not a pharmaceutical marketing invention — it is backed by the American Medical Association, WHO, World Obesity Federation, and every major endocrinology society based on decades of metabolic, genetic, and neurological research. Reclassifying obesity as a disease has reduced employment discrimination, expanded insurance coverage, and funded research that produced GLP-1 drugs in the first place. Off-label use for vanity is a regulatory and prescribing problem, not an indictment of the medication itself — the same is true of every drug from Adderall to testosterone. The AAP recommendation for adolescents reflects the reality that severe childhood obesity leads to type 2 diabetes, fatty liver disease, and joint damage that cause lifelong disability. Delaying treatment in children on ideological grounds, when effective pharmacotherapy exists, causes concrete harm. As for pharmaceutical profit: insulin manufacturers also profit enormously, but no one argues we should stop treating diabetes. Effective medicine costs money. The question is whether it works, and the evidence overwhelmingly says yes.",
      crux: {
        id: "off-label-cosmetic-use",
        title: "The Off-Label Use & Indication Creep Assessment",
        description:
          "If a substantial portion of GLP-1 prescriptions (>25%) are for patients who do not meet clinical obesity criteria and are driven by cosmetic desire rather than medical necessity, this represents indication creep that distorts clinical evidence, strains drug supply, increases costs, and normalizes pharmaceutical weight management for healthy individuals. If prescribing remains clinically appropriate, the concern is overblown.",
        methodology:
          "Analyze a nationally representative prescription claims database (e.g., IQVIA, Symphony Health) to determine the BMI distribution, comorbidity profiles, and indication codes for all GLP-1 agonist prescriptions over 2022-2026. Compare on-label vs. off-label prescribing rates. Survey prescribing physicians on their clinical rationale. Cross-reference with patient-reported outcomes to assess whether off-label users experience meaningful health benefits.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0-500K (Claims database analysis using existing prescription data)",
      },
      evidence: [
        {
          id: "off-label-prescribing-rates",
          title: "An Estimated 40% of GLP-1 Prescriptions May Be Off-Label or Cosmetic",
          description:
            "Analysis of prescription data by telehealth platforms, pharmacy benefit managers, and investigative journalists suggests that a significant portion of GLP-1 prescriptions — estimated at 30-50% depending on the data source — are for patients who do not meet FDA-approved criteria for obesity (BMI >= 30 or BMI >= 27 with comorbidities). Telehealth companies like Calibrate, Found, and Ro have made GLP-1 prescriptions available with minimal clinical evaluation. A 2024 Epic Research analysis of electronic health records found that 1 in 8 semaglutide patients had no documented obesity diagnosis.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Epic Research; JAMA Health Forum; Bloomberg",
          sourceUrl: "https://epicresearch.org/articles/glp-1-receptor-agonists-use-surges",
          reasoning:
            "The data sources vary in quality — telehealth platform analyses are less rigorous than Epic's EHR database. The 30-50% estimate is imprecise. However, the trend toward off-label and cosmetic prescribing is documented across multiple independent sources and is consistent with social media promotion patterns. The directness is high because this directly tests whether GLP-1 use is medically justified at scale.",
        },
        {
          id: "disease-reclassification",
          title: "AMA Recognizes Obesity as a Disease (2013), Expanding Treatment Coverage",
          description:
            "In June 2013, the American Medical Association voted to classify obesity as a disease, overriding its own Council on Science and Public Health which recommended against the designation. This reclassification opened regulatory pathways for obesity drug approval, expanded insurance coverage arguments, and provided the conceptual framework for treating obesity with pharmacotherapy. Critics note that organizations like the Obesity Action Coalition, which lobbied for the reclassification, received funding from Novo Nordisk and other pharmaceutical companies. Supporters counter that the disease classification is supported by WHO (ICD E66), the Endocrine Society, and the pathophysiology of metabolic dysfunction.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source: "JAMA; AMA Proceedings; The BMJ",
          sourceUrl: "https://jamanetwork.com/journals/jama/fullarticle/1710486",
          reasoning:
            "The AMA vote is a matter of public record and the pharmaceutical funding connections are documented. However, the independence score is moderated because many independent medical organizations globally have reached the same classification. The question of whether obesity 'is' a disease is partly definitional, but the regulatory and commercial consequences of the classification are concrete and significant.",
        },
        {
          id: "pediatric-recommendations",
          title: "AAP Recommends GLP-1 Drugs for Adolescents 12+ with Severe Obesity",
          description:
            "In January 2023, the American Academy of Pediatrics released its first comprehensive obesity treatment guidelines in 15 years, recommending pharmacotherapy including GLP-1 agonists for adolescents aged 12+ with obesity (BMI >= 95th percentile). The STEP TEENS trial showed semaglutide produced 16.1% weight loss in adolescents versus 0.6% weight gain with placebo. Supporters note that childhood severe obesity leads to type 2 diabetes, nonalcoholic fatty liver disease, and orthopedic complications. Critics worry about medicalizing adolescent body image, unknown effects on growth and development, and creating lifelong pharmaceutical dependency starting in childhood.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "American Academy of Pediatrics; NEJM (STEP TEENS)",
          sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2208601",
          reasoning:
            "The AAP is the authoritative body for pediatric medicine, and the STEP TEENS trial was published in the NEJM. However, independence is moderated because Novo Nordisk funded STEP TEENS. The directness is moderate because adolescent data does not directly settle the adult debate about medicalization — it opens a distinct ethical question about treating children with chronic medications.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1) - NEJM",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183",
    },
    {
      title: "Semaglutide and Cardiovascular Outcomes in Obesity (SELECT Trial) - NEJM",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2307563",
    },
    {
      title: "What We Know About the Cost and Use of GLP-1 Drugs - KFF",
      url: "https://www.kff.org/health-costs/issue-brief/what-we-know-about-the-cost-and-use-of-glp-1-drugs/",
    },
    {
      title: "Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain - NIH/Cell Metabolism",
      url: "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(19)30248-7",
    },
    {
      title: "Clinical Practice Guideline for the Evaluation and Treatment of Pediatric Obesity - AAP",
      url: "https://publications.aap.org/pediatrics/article/151/2/e2022060640/190443",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Are GLP-1 drugs a lifelong commitment or a temporary tool?",
      content:
        "Discontinuation studies show patients regain two-thirds of lost weight within a year of stopping GLP-1 drugs, mirroring the pattern seen with blood pressure and diabetes medications. Does this mean obesity is a chronic disease requiring indefinite treatment, or does it expose a fundamental limitation of pharmacotherapy that fails to address the underlying drivers of weight gain? If 100 million Americans eventually take GLP-1s for life, what are the implications for healthcare systems, pharmaceutical dependency, and the definition of health itself?",
    },
    {
      id: "q2",
      title: "Should cost or clinical criteria determine who gets GLP-1 drugs?",
      content:
        "With GLP-1 drugs costing $10,000-16,000 per year in the US and Medicare legally prohibited from covering weight-loss medications, access is determined more by wealth and insurance status than clinical need. Black and Hispanic Americans have the highest obesity prevalence but the lowest rates of GLP-1 prescriptions. If these drugs are as effective as trials suggest, is restricting access to those who can afford them an ethical failure on the scale of rationing insulin? Or would universal coverage at current prices bankrupt healthcare systems that should instead invest in prevention?",
    },
    {
      id: "q3",
      title: "Do GLP-1 drugs reduce obesity stigma or reinforce it?",
      content:
        "The 'obesity is a disease' framework underlying GLP-1 treatment has two contradictory effects: it destigmatizes obesity by framing it as a medical condition rather than a moral failing, but it simultaneously reinforces the message that larger bodies are inherently pathological and in need of pharmaceutical correction. The explosion of 'Ozempic body' social media content, off-label cosmetic use, and the narrowing of acceptable body sizes in popular culture suggest that GLP-1 drugs may be intensifying weight-based discrimination even as they treat the condition. Can a drug reduce stigma while its marketing depends on the desirability of thinness?",
    },
  ],
};
