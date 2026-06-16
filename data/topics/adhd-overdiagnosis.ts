import type { Topic } from "@/lib/schemas/topic";

export const adhdOverdiagnosisData = {
  id: "adhd-overdiagnosis",
  title: "Is ADHD Overdiagnosed?",
  meta_claim: "ADHD is substantially overdiagnosed.",
  status: "contested" as const,
  category: "science" as const,
  last_updated: "2026-06-16",
  tags: ["adhd", "psychiatry", "diagnosis", "mental-health", "neurodevelopment"],
  pillars: [
    {
      id: "rising-prevalence",
      title: "Rising Prevalence",
      short_summary:
        "Diagnosed ADHD has climbed steeply — but is that catching missed cases, or sweeping in milder cases the diagnosis was never meant to label?",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Diagnosed ADHD keeps rising faster than any plausible change in underlying biology: CDC parent-survey data put ever-diagnosed ADHD at 11.4% of US children aged 3-17 in 2022 (about 7 million kids, up roughly 1 million since 2016), and an estimated 15.5 million US adults had a current diagnosis by late 2023, with most of those first diagnosed as adults. A 2021 JAMA Network Open scoping review of 334 studies found 'convincing evidence that ADHD is overdiagnosed in children and adolescents,' driven by successive broadenings of the diagnostic criteria that pull in milder, less-impaired cases — and for those milder cases the harms of a diagnosis may outweigh the benefits.",
      proponent_rebuttal:
        "Rising diagnosis rates are exactly what improving recognition of a real, previously-missed disorder looks like. Rigorous epidemiology puts true ADHD prevalence near 5% in children and ~2.5-3% in adults — but historically far fewer were diagnosed, especially girls, women, and adults, so a diagnosed rate climbing toward the true rate is closing an underdiagnosis gap, not manufacturing disease. ADHD lies on a continuum (like blood pressure) with no sharp natural cutoff, so a count of diagnoses alone cannot establish that the additional cases are false positives rather than genuine impairment that was previously ignored.",
      crux: {
        id: "true-vs-diagnosed-prevalence",
        title: "True Prevalence vs. Diagnosed Prevalence Gap",
        description:
          "Whether the rising diagnosed rate is overshooting the true population rate of impairing ADHD, or merely catching up to a true rate that was always under-served.",
        methodology:
          "Compare community-sample epidemiological prevalence (blinded structured diagnostic interviews applying full DSM impairment criteria) against administrative/diagnosed prevalence over time, broken out by age and sex. Overshoot above the impairment-anchored community rate signals overdiagnosis; a persistent shortfall signals underdiagnosis.",
        verification_status: "verified" as const,
        cost_to_verify: "$500K (cross-cohort epidemiological meta-analysis)",
      },
      evidence: [
        {
          id: "jama-scoping-review",
          title: "JAMA Review: 'Convincing Evidence' of Overdiagnosis",
          description:
            "A 2021 systematic scoping review (334 studies) concluded there is 'convincing evidence that ADHD is overdiagnosed in children and adolescents,' that broadening diagnostic criteria expanded the pool toward milder cases, and that for those milder cases the harms of diagnosis may outweigh the benefits.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source:
            "Kazda L, Bell K, Thomas R, McGeechan K, Sims R, Barratt A. JAMA Network Open, April 2021",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8042533/",
          reasoning:
            "A peer-reviewed JAMA Network Open scoping review directly on the meta-claim — the strongest single 'for' source. Replicability is moderate because a scoping review synthesizes heterogeneous studies and the harms-vs-benefits conclusion rests on only ~5 studies of milder cases, which the authors themselves flag as a thin evidence base.",
        },
        {
          id: "cdc-prevalence-rise",
          title: "Diagnosed Rate Reached 11.4% of US Children (2022)",
          description:
            "CDC parent-survey data show 11.4% of US children aged 3-17 (about 7 million) had ever been diagnosed with ADHD in 2022 — up roughly 1 million from 2016 — versus a community-epidemiology estimate of true prevalence around 5%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "CDC, Data and Statistics on ADHD (2022 National Survey of Children's Health)",
          sourceUrl: "https://www.cdc.gov/adhd/data/index.html",
          reasoning:
            "Authoritative US government surveillance data. Directness is limited because a diagnosed rate exceeding the ~5% community estimate is consistent with overdiagnosis but does not by itself prove the extra cases are false positives rather than previously-missed real cases — that inference is what the crux tests.",
        },
      ],
    },
    {
      id: "diagnostic-validity",
      title: "Diagnostic Validity",
      short_summary:
        "Does ADHD pick out a real, biologically grounded condition, or a label applied to context-dependent behavior like simply being the youngest kid in class?",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "ADHD has no biomarker and is diagnosed entirely from subjective behavior ratings, which makes the boundary porous and context-driven. The clearest demonstration is the relative-age effect: across a 2024 meta-analysis, the youngest children in a school year are about 38% more likely to be diagnosed (pooled relative risk 1.38) and more likely to be medicated than their oldest classmates — and the effect shows up in teacher ratings but not parent ratings, and does not predict ADHD persistence at follow-up. Normal immaturity relative to classmates is being read as disorder, which is overdiagnosis almost by definition.",
      proponent_rebuttal:
        "Lacking a single blood test does not make a disorder invalid — migraine and most psychiatric conditions are also diagnosed clinically. ADHD is among the most heritable psychiatric conditions: twin studies converge on roughly 74% heritability, with replicated genome-wide significant risk loci and consistent (if subtle) differences in brain development. The relative-age effect reveals a real but bounded measurement problem at the margin — better-calibrated, age-adjusted assessment fixes it — not that the core construct is fictitious. The vast majority of diagnoses are not borderline relative-age cases.",
      crux: {
        id: "relative-age-artifact",
        title: "The Relative-Age Natural Experiment",
        description:
          "School-entry cutoff dates randomly make some children the youngest in their class. If being relatively young (not biologically different) raises diagnosis odds, that increment is overdiagnosis driven by context rather than disorder.",
        methodology:
          "Within large administrative cohorts, compare ADHD diagnosis and medication rates for children born just before vs. just after the school-entry cutoff (same grade, ~1 year apart in age). Quantify the youngest-vs-oldest relative risk and test whether the excess cases persist as ADHD at long-term follow-up.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (registry data analysis)",
      },
      evidence: [
        {
          id: "relative-age-effect",
          title: "Youngest in Class ~38% More Likely Diagnosed",
          description:
            "A 2024 meta-analysis found the youngest children in a school year had a pooled relative risk of 1.38 for ADHD diagnosis (and 1.28 for medication) versus the oldest — a context artifact of relative immaturity, not biology.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "Systematic review and meta-analysis of relative age in ADHD and ASD, European Child & Adolescent Psychiatry, 2024",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11868292/",
          reasoning:
            "A near-natural-experiment leveraging quasi-random school-cutoff timing, replicated across many countries and cohorts — high reliability and replicability. Directness is strong but not total: it proves a real overdiagnosis mechanism at the age margin without quantifying how much of total ADHD diagnosis is attributable to it.",
        },
        {
          id: "adhd-heritability",
          title: "ADHD Is ~74% Heritable",
          description:
            "Twin, family, and adoption studies converge on ADHD heritability of about 74%, with identified genome-wide significant risk loci — placing ADHD among the most genetically influenced psychiatric conditions and supporting it as a real, biologically grounded disorder.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "Faraone SV, Larsson H. Genetics of attention deficit hyperactivity disorder. Molecular Psychiatry, 2019",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/29892054/",
          reasoning:
            "A highly-cited synthesis from leading ADHD geneticists; the 74% figure is robust and reproducible across decades of twin studies. Directness against the meta-claim is moderate: high heritability of the trait establishes that ADHD is real, but a valid construct can still be overdiagnosed at its diagnostic threshold — validity and overdiagnosis are not mutually exclusive.",
        },
      ],
    },
    {
      id: "consequences-of-error",
      title: "Costs of Getting It Wrong",
      short_summary:
        "Which error is the field actually making at the margin — over-labeling kids who would be fine, or leaving genuinely impaired people untreated?",
      icon_name: "Scale" as const,
      skeptic_premise:
        "An ADHD label is not harmless. For milder cases the JAMA review describes 'diminishing returns,' where labeling can lower self-concept, invite unnecessary stimulant exposure, and lock in a clinical identity with little academic or functional benefit — benefits that were clearest only for severe cases. If a large share of the diagnostic growth is concentrated in exactly these milder, lower-benefit cases, the system is over-treating people the diagnosis cannot help.",
      proponent_rebuttal:
        "The asymmetry runs the other way: the documented harms of untreated ADHD are severe and well-replicated, while the population-level harms of overdiagnosis remain comparatively unproven. A Danish nationwide cohort of nearly 2 million people found a mortality rate ratio of 2.07 for people with ADHD — driven heavily by accidents and highest for those diagnosed in adulthood — and untreated ADHD, especially in undiagnosed girls and women, is linked to elevated self-harm, suicidality, and secondary anxiety and depression. Erring toward recognition catches people the old system left to fail.",
      crux: {
        id: "net-harm-of-marginal-diagnosis",
        title: "Net Effect of the Marginal Diagnosis",
        description:
          "For the additional, milder cases at the diagnostic margin, does receiving the diagnosis (and any treatment) produce net benefit or net harm over the long run?",
        methodology:
          "Run long-term randomized or quasi-experimental follow-up on borderline-eligible individuals, comparing diagnosis/treatment vs. watchful waiting on hard outcomes (academic attainment, accidents, substance use, self-harm, employment, quality of life). Net benefit refutes overdiagnosis-as-harm; net harm confirms it.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$5M+ (long-horizon RCT on borderline cases)",
      },
      evidence: [
        {
          id: "milder-cases-harm",
          title: "For Milder Cases, Harms May Outweigh Benefits",
          description:
            "Within the JAMA scoping review, the studies that examined milder/borderline cases supported a 'diminishing returns' pattern: treatment benefits (e.g., academic outcomes) were clearest for severe symptoms, while for milder cases the harms of diagnosis may outweigh the benefits.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "Kazda L, et al. JAMA Network Open, April 2021 (subset analysis of benefits/harms in milder cases)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8042533/",
          reasoning:
            "Directly addresses whether the extra diagnoses do net harm. Weighted down on replicability because the review found only about 5 studies evaluating benefits-vs-harms in milder cases, and the authors explicitly call for higher-quality long-term studies — the crux here is rated 'theoretical' for exactly this reason.",
        },
        {
          id: "adhd-mortality",
          title: "ADHD Linked to ~2x Premature Mortality",
          description:
            "A Danish nationwide cohort (~1.9 million people, >32,000 with ADHD) found a fully adjusted mortality rate ratio of 2.07 for individuals with ADHD versus those without, driven largely by accidents and highest among those diagnosed in adulthood — evidence that ADHD marks real, serious risk rather than benign over-labeling.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "Dalsgaard S, et al. Mortality in children, adolescents, and adults with ADHD: a nationwide cohort study. The Lancet, 2015",
          sourceUrl:
            "https://research.regionh.dk/en/publications/mortality-in-children-adolescents-and-adults-with-attention-defic/",
          reasoning:
            "A large, well-controlled population registry study with a hard endpoint (death). Directness against the meta-claim is moderate: it shows diagnosed ADHD carries genuine danger, which counters 'it's a harmless over-label,' but it is dominated by clearly-impaired cases and does not directly settle whether marginal/milder diagnoses are excess.",
        },
        {
          id: "underdiagnosis-girls",
          title: "Girls and Women Are Systematically Underdiagnosed",
          description:
            "The childhood boy:girl diagnosis ratio of roughly 3-4:1 narrows toward ~1:1 in adulthood, and Swedish data show females diagnosed on average about 4 years later than males — indicating large numbers of girls and women were missed, the signature of underdiagnosis rather than overdiagnosis in that group.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Agnew-Blais J. Hidden in plain sight: delayed ADHD diagnosis among girls and women (commentary on Skoglund et al. 2023), Journal of Child Psychology and Psychiatry, 2024",
          sourceUrl: "https://acamh.onlinelibrary.wiley.com/doi/10.1111/jcpp.14023",
          reasoning:
            "Directly rebuts a blanket overdiagnosis claim by showing at least one large subgroup is under-, not over-, diagnosed. Weighted moderately because the boy/girl ratio convergence is also partly consistent with adult overdiagnosis, so it is suggestive of underdiagnosis in girls rather than conclusive for the whole population.",
        },
      ],
    },
  ],
};
