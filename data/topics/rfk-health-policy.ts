import type { Topic } from "@/lib/schemas/topic";

export const rfkHealthPolicyData = {
  id: "rfk-health-policy",
  title: "RFK Jr's Health Policy Agenda (MAHA)",
  meta_claim:
    "Robert F. Kennedy Jr's 'Make America Healthy Again' overhaul of US health institutions — restructuring vaccine policy, targeting food additives and fluoridation, and challenging regulatory capture — will improve American health outcomes.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Vaccine Policy & Schedule Safety
    // =========================================================================
    {
      id: "vaccine-policy",
      title: "Vaccine Policy & Schedule Safety",
      short_summary:
        "MAHA reframes the childhood vaccine schedule as inadequately tested as a whole and elevates 'vaccine injury' monitoring, while the medical establishment holds that the schedule's safety and efficacy are settled science and the restructuring endangers public health.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The safety and efficacy of the routine childhood vaccine schedule are settled by decades of evidence — randomized component trials, the Vaccine Safety Datalink, and the 2011 Institute of Medicine review — and the schedule prevents thousands of pediatric deaths annually. RFK Jr's restructuring is built on a discredited foundation: he dismissed all 17 sitting ACIP members in June 2025 and replaced them with appointees a federal judge ruled mostly unqualified in March 2026, and the MAHA reports cited studies that did not exist. Demoting hepatitis B, rotavirus, and other vaccines from universal recommendation — prompting the American Academy of Pediatrics to break from the CDC schedule for the first time in history — invites the return of preventable disease, as measles outbreaks in 2025-2026 already demonstrate.",
      proponent_rebuttal:
        "Individual vaccines are well-studied, but no large modern randomized trial has ever compared the full current schedule against a lighter one — that combined regimen rests on observational data and committee judgment, not the gold-standard evidence the establishment claims. Past ACIP and recommendation bodies had documented industry ties, so demanding transparent, conflict-free benefit-harm review is reasonable governance, not anti-science. Elevating injury monitoring and reconsidering the timing and stacking of doses (e.g., universal hepatitis B at birth) is a defensible application of the precautionary principle. By April 2026, Kennedy himself affirmed in House testimony that MMR is 'safe and effective for most people,' signaling the agenda targets schedule design and oversight, not vaccination itself.",
      crux: {
        id: "full-schedule-trial",
        title: "The Whole-Schedule Comparative Trial Test",
        description:
          "The disagreement turns on whether the cumulative current schedule — total adjuvant load, dose timing, and shot-stacking — carries net harms not captured by component-level studies. The decisive question is purely methodological: whether a prospective randomized 'full schedule vs lighter schedule' trial can be run ethically. It cannot, because withholding established vaccines from a control group would expose children to known, preventable disease. Critically, the absence of such an RCT does not mean schedule-wide safety is unresolved: large linked-database surveillance (the Vaccine Safety Datalink) and the 2011/2013 IOM reviews already provide the consensus answer that the schedule is safe. The missing trial is an ethics artifact, not an open evidentiary question.",
        methodology:
          "Determine whether a prospective randomized trial of 'current schedule vs lighter schedule' is ethically permissible; if not (the consensus view, because it requires withholding effective vaccines), rely on the strongest available quasi-experimental evidence: large linked-database cohort studies (Vaccine Safety Datalink), self-controlled case-series, and natural experiments from countries with differing schedules, with pre-registered confounder adjustment. Cross-reference cumulative-aluminum cohort findings against post-licensure surveillance.",
        verification_status: "impossible" as const,
        cost_to_verify:
          "Ethically prohibited as an RCT; ~$10-50M for the strongest observational alternative (large linked-cohort study)",
      },
      evidence: [
        {
          id: "iom-2011-safety-review",
          title: "Institute of Medicine 2011 Review Finds No Pattern of Schedule-Wide Harm",
          description:
            "The Institute of Medicine's 2011 report 'Adverse Effects of Vaccines: Evidence and Causality' reviewed more than 1,000 studies and found that vaccines covered by the schedule rarely cause serious adverse events, with no evidence supporting claims of broad schedule-induced harm. A subsequent 2013 IOM report specifically examined the childhood immunization schedule and found no evidence that the recommended schedule is unsafe. Post-licensure surveillance via the CDC's Vaccine Safety Datalink continues to monitor outcomes across millions of children.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Institute of Medicine (National Academies); CDC Vaccine Safety Datalink",
          sourceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK190024/",
          reasoning:
            "The IOM is an independent expert body and its reviews are the most comprehensive syntheses of vaccine safety evidence available. This directly supports the consensus that the schedule's safety is well-established, undercutting the claim that the full schedule is inadequately tested.",
        },
        {
          id: "court-blocks-acip-overhaul",
          title: "Federal Judge Rules ACIP Appointees Unqualified and Freezes Vaccine Changes (March 2026)",
          description:
            "After Kennedy dismissed all 17 sitting ACIP members in June 2025 and the CDC's acting director bypassed ACIP in January 2026 to cut the childhood schedule from coverage of 18 diseases to 11, a federal judge in March 2026 declared most of the new appointees legally unqualified and froze ACIP's recent decisions, reverting the schedule to its pre-January 2026 state. The American Academy of Pediatrics responded by publishing its own 2026 schedule diverging from the CDC for the first time in agency history.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "NPR; AJMC; The Hill",
          sourceUrl: "https://www.npr.org/2026/03/16/nx-s1-5749530/judge-blocks-rfk-jr-vaccine-changes",
          reasoning:
            "A federal court ruling and the AAP's unprecedented break are verifiable institutional facts. They demonstrate that the restructuring's process was found legally deficient and that mainstream pediatrics regards the changes as dangerous, strongly supporting the skeptic position.",
        },
        {
          id: "aluminum-asthma-study",
          title: "2022 CDC-Authored Study Found Aluminum-Asthma Association the Agency Did Not Act On",
          description:
            "A 2022 study by Daley, Glanz, and colleagues published in 'Academic Pediatrics' analyzed cumulative aluminum exposure from vaccines before 24 months and found a positive statistical association with persistent asthma. The authors flagged unmeasured confounding and the CDC declined to change recommendations. MAHA proponents cite it as evidence that cumulative-exposure questions deserve more study; critics note it is observational, confounded, and one finding among extensive contrary surveillance data.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source: "Daley et al., Academic Pediatrics (2022); PMC/NIH",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10109516/",
          reasoning:
            "The study is peer-reviewed and CDC-authored, lending it credibility, but it is observational with acknowledged confounding and has not been replicated as a causal finding. It legitimately motivates further research into cumulative exposure without establishing schedule-wide harm.",
        },
        {
          id: "maha-report-fabricated-citations",
          title: "MAHA Reports Cited Nonexistent Studies Traced to AI Generation",
          description:
            "Both the May 2025 'Make Our Children Healthy Again Assessment' and the September 2025 Strategy report were published with citation errors and references to studies that did not exist, which journalists traced to apparent AI generation. The fabricated citations undermined the scientific credibility of the documents that frame MAHA's vaccine and chronic-disease claims and became a focal point for critics arguing the project lacks rigor.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "STAT; NOTUS (original reporting on fabricated citations)",
          sourceUrl: "https://www.statnews.com/2025/09/09/rfk-maha-report-make-our-children-healthy-again-strategy/",
          reasoning:
            "The fabricated-citation problem is documented by multiple outlets. It does not refute every MAHA claim on its own, but it directly damages the evidentiary credibility of the agenda's foundational reports, supporting the skeptic position on rigor.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Chronic Disease & Ultra-Processed Food
    // =========================================================================
    {
      id: "chronic-disease-food",
      title: "Chronic Disease & Ultra-Processed Food",
      short_summary:
        "MAHA's strongest ground: that ultra-processed food and food additives are major drivers of America's chronic-disease burden, and that the GRAS 'self-affirmation' loophole lets companies declare ingredients safe without FDA review. The disagreement is over how much causal weight the food system bears and whether MAHA's actions are binding policy or symbolism.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Chronic disease has many drivers — caloric surplus, sedentary lifestyle, genetics, and healthcare access — and the MAHA reports assign causal weight to ultra-processed food, glyphosate, and seed oils ahead of the evidence. The NOVA classification underpinning 'ultra-processed' is criticized as too coarse, and even Kevin Hall, whose inpatient trial MAHA cites, has warned against over-extrapolating it. Worse, MAHA's flagship food actions are weaker than advertised: the April 2025 'phase-out' of petroleum-based dyes was, per the Center for Science in the Public Interest, an industry 'understanding' rather than a binding ban, and food-system experts like Marion Nestle found 'no evidence of policy' in the September strategy report, noting two-thirds of dietary-guidelines reviewers had industry ties.",
      proponent_rebuttal:
        "On the food system, MAHA's diagnosis is corroborated by mainstream science. Kevin Hall's 2019 NIH inpatient randomized trial showed people ate roughly 500 extra calories per day and gained weight on an ultra-processed diet versus a minimally processed one with matched nutrients, and large prospective cohorts (NutriNet-Santé, Nurses' Health Study) link ultra-processed intake to cardiovascular and all-cause mortality. The GRAS self-affirmation loophole genuinely lets companies declare their own additives safe with no FDA review — a documented regulatory gap. Even skeptical food-policy reformers like Marion Nestle agree with MAHA on Big Food and the GRAS problem. Phasing out six petroleum-based dyes and proposing mandatory GRAS notification targets real, evidence-supported hazards regardless of enforcement mechanism.",
      crux: {
        id: "upf-causality-trial",
        title: "The Scaled Ultra-Processed Food Causality Trial",
        description:
          "The question is how much of US chronic disease is causally attributable to ultra-processed food itself — versus the calories, sugar, and salt it delivers, plus lifestyle and genetics. Hall's 20-person inpatient trial showed a causal calorie-intake effect over two weeks, but settling the long-term disease question requires a much larger, longer controlled-feeding study that isolates processing from nutrient content.",
        methodology:
          "Conduct a scaled-up controlled-feeding trial on the Hall protocol: randomize a large cohort to matched ultra-processed vs minimally processed diets controlling for calories, macronutrients, sugar, and sodium, measuring metabolic and cardiovascular endpoints over months to years. Triangulate against NutriNet-Santé and Nurses' Health Study prospective cohort data and NOVA-stratified mortality analyses.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$20-100M (large multi-year inpatient/controlled-feeding trial; the smaller pilot protocol has repeatedly lacked sustained NIH funding)",
      },
      evidence: [
        {
          id: "hall-upf-trial",
          title: "NIH Inpatient Trial: Ultra-Processed Diet Drove ~500 Extra Calories/Day",
          description:
            "Kevin Hall's 2019 NIH study, published in 'Cell Metabolism,' randomly assigned 20 inpatient subjects to ultra-processed and minimally processed diets matched for calories, sugar, fat, and fiber, presented ad libitum. On the ultra-processed diet, participants consumed about 500 more calories per day and gained roughly one kilogram over two weeks. It is the first randomized controlled evidence that food processing itself, not just nutrient content, can drive overeating.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "Hall et al., Cell Metabolism (2019); NIH",
          sourceUrl: "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(19)30248-7",
          reasoning:
            "A randomized inpatient trial from NIH is high-quality causal evidence directly supporting MAHA's central food-system claim. Its limits are small sample size and short duration, but it is the strongest controlled data linking processing to overconsumption.",
        },
        {
          id: "gras-loophole",
          title: "GRAS Self-Affirmation Lets Companies Approve Their Own Food Additives",
          description:
            "Under the 'Generally Recognized As Safe' self-affirmation pathway, companies can determine an ingredient is safe and add it to food without notifying or obtaining review from the FDA. MAHA-aligned reformers and independent food-safety advocates have long flagged this as a regulatory gap; the FDA's 2026 Human Foods Program priorities include a proposed rule requiring submission of all new GRAS notices, an attempt to close the loophole.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "FDA Human Foods Program 2026 priorities; C&EN",
          sourceUrl: "https://www.fda.gov/about-fda/human-foods-program/human-foods-program-2026-priority-deliverables",
          reasoning:
            "The GRAS self-affirmation loophole is a documented feature of US food law acknowledged across the political spectrum, including by progressive food reformers. Targeting it is one of MAHA's most defensible, evidence-grounded positions.",
        },
        {
          id: "dye-phaseout-nonbinding",
          title: "April 2025 Food-Dye 'Phase-Out' Was an Industry Understanding, Not a Binding Ban",
          description:
            "On April 22, 2025, HHS/FDA announced a phase-out of six petroleum-based synthetic dyes (Blue 1, Blue 2, Green 3, Red 40, Yellow 5, Yellow 6) by the end of 2026. The Center for Science in the Public Interest characterized the announcement as an industry 'understanding' rather than a binding regulation. State legislatures in Texas, West Virginia, and California moved faster with actual statutory bans, underscoring that the federal action lacked enforcement teeth.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Center for Science in the Public Interest; FDA press release; C&EN",
          sourceUrl: "https://www.cspi.org/cspi-news/fdas-plan-remove-food-dyes-industry-understanding",
          reasoning:
            "CSPI is an independent food-safety advocate that broadly shares MAHA's goals, making its critique credible rather than partisan. It shows that even MAHA's strongest substantive area has delivered more announcement than binding policy, qualifying claims of effectiveness.",
        },
        {
          id: "nestle-no-policy",
          title: "Food-Policy Expert Marion Nestle: MAHA Strategy Shows 'No Evidence of Policy'",
          description:
            "Marion Nestle, a leading food-policy scholar who agrees with MAHA's critique of Big Food and ultra-processed foods, reviewed the September 2025 MAHA Strategy report and concluded it offered 'no evidence of policy' — proposals without binding action. Her January 2026 series also flagged that roughly two-thirds of the MAHA dietary-guidelines reviewers had industry ties, turning MAHA's own regulatory-capture critique back on the project.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "Marion Nestle (Food Politics); PBS NewsHour",
          sourceUrl: "https://www.foodpolitics.com/2026/01/the-maha-dietary-guidelines-iii-conflicts-of-interest/",
          reasoning:
            "Nestle is an independent expert sympathetic to MAHA's food-system diagnosis, so her conclusion that the strategy lacks binding policy and carries its own conflicts of interest is a credible internal critique rather than tribal opposition.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Water Fluoridation
    // =========================================================================
    {
      id: "fluoridation",
      title: "Water Fluoridation",
      short_summary:
        "MAHA moved to end the CDC's recommendation of community water fluoridation, citing neurodevelopmental risk and a shrinking dental benefit. The science shows clear harm only at concentrations roughly twice the US level, so the real dispute is about the margin of safety at the 0.7 mg/L US dose, where evidence is genuinely thin.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Community water fluoridation at the US level of 0.7 mg/L is a long-standing, cost-effective public-health measure, and the evidence MAHA invokes does not apply to that dose. The 2024 National Toxicology Program monograph found neurodevelopmental harm only with 'moderate confidence' at exposures above 1.5 mg/L — more than double the US recommendation — and no US studies were in the IQ meta-analysis. Ending the recommendation risks reversing decades of cavity prevention, especially for low-income children with limited dental access. Even the acting CDC head walked back the messaging in March 2026 House testimony, calling fluoride 'essential for oral health.'",
      proponent_rebuttal:
        "The case for fluoridation rests on a margin of safety that has narrowed on both sides. The October 2024 Cochrane review found the cavity-prevention benefit has shrunk dramatically since fluoride toothpaste became widespread — post-1975 studies show only about 0.24 fewer decayed baby teeth per child, an effect compatible with no benefit. Meanwhile the NTP monograph and the January 2025 JAMA Pediatrics meta-analysis of 70+ studies establish a real inverse association between fluoride and child IQ at higher doses. With a smaller benefit and a documented dose-dependent risk, demanding fresh review of whether 0.7 mg/L still clears the benefit-harm line is sound precaution, and letting communities decide is reasonable federalism.",
      crux: {
        id: "low-dose-dose-response",
        title: "The 0.7 mg/L Dose-Response Test",
        description:
          "Harm is established above 1.5 mg/L and the dental benefit has shrunk in the toothpaste era — but the decisive question is what happens at the actual US fluoridation level of 0.7 mg/L. The crux is whether rigorous dose-response evidence in the 0.5-1.0 mg/L range shows a meaningful net benefit, net harm, or a margin too thin to call.",
        methodology:
          "Commission prospective cohort and quasi-experimental studies measuring child neurodevelopmental outcomes and dental caries specifically at 0.5-1.0 mg/L exposure, using individual-level biomarker (urinary fluoride) data rather than community-level proxies, controlling for socioeconomic confounders. Combine with the October 2024 Cochrane caries estimates to compute a benefit-harm balance at the precise US dose.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-20M (large prospective biomarker cohort at low-dose exposure; existing dose-response data at 0.5-1.0 mg/L is sparse)",
      },
      evidence: [
        {
          id: "ntp-fluoride-monograph",
          title: "2024 NTP Monograph: Neurodevelopmental Harm Found Above 1.5 mg/L",
          description:
            "The National Toxicology Program's August 2024 monograph concluded with 'moderate confidence' that fluoride exposures above 1.5 mg/L are associated with lower IQ in children. Crucially, that threshold is more than twice the US community-fluoridation level of 0.7 mg/L, and the underlying studies were largely from regions with naturally high fluoride. The January 2025 JAMA Pediatrics meta-analysis of more than 70 studies reported a similar inverse association concentrated at higher exposures.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "National Toxicology Program (NIEHS); JAMA Pediatrics (2025)",
          sourceUrl: "https://ntp.niehs.nih.gov/research/assessments/noncancer/completed/fluoride",
          reasoning:
            "The NTP is an authoritative federal toxicology body and the finding is real, but it documents harm only above 1.5 mg/L. It supports re-examining fluoridation in principle while not directly demonstrating harm at the US 0.7 mg/L dose — the gap that defines the crux.",
        },
        {
          id: "cochrane-shrinking-benefit",
          title: "2024 Cochrane Review: Cavity Benefit Has Shrunk in the Toothpaste Era",
          description:
            "The October 2024 Cochrane systematic review of community water fluoridation found that the dental-caries benefit has declined sharply since fluoride toothpaste became widespread. Studies conducted after 1975 showed only about 0.24 fewer decayed, missing, or filled baby teeth per child — an effect estimate the review noted is compatible with little or no benefit, though it still found a benefit overall.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "Cochrane Database of Systematic Reviews (CD010856.pub3, 2024)",
          sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD010856.pub3/full",
          reasoning:
            "Cochrane reviews are the gold standard for evidence synthesis and are independent. A shrinking benefit raises the bar that fluoridation must clear, lending genuine weight to reconsidering the recommendation — while the review still finding net benefit qualifies the MAHA position.",
        },
        {
          id: "cdc-walks-back-fluoride",
          title: "Acting CDC Head Calls Fluoride 'Essential for Oral Health' (March 2026)",
          description:
            "After Kennedy directed the CDC in April 2025 to stop recommending community water fluoridation and Utah became the first state to ban it outright, the acting CDC director softened the messaging in March 2026 House testimony, calling fluoride 'essential for oral health' while flagging dose-dependent risks. The partial reversal signals that even within HHS the case for ending fluoridation at the US dose was not settled.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Axios (Apr 2025 directive and Utah ban background); March 2026 House Appropriations NIH oversight hearing testimony coverage",
          sourceUrl: "https://www.axios.com/2026/02/02/fluoride-ban-water-kennedy-rfk-epa",
          reasoning:
            "An HHS official walking back the anti-fluoridation message in sworn testimony is a notable concession that the benefit-harm case at 0.7 mg/L remains contested even inside the administration, weighing against ending the recommendation outright.",
        },
        {
          id: "fluoridation-equity",
          title: "Ending Fluoridation Disproportionately Affects Low-Income Children's Dental Access",
          description:
            "Public-health and dental organizations argue community water fluoridation provides a population-level cavity-prevention benefit that does not depend on access to dental care or fluoride toothpaste, making it especially protective for low-income children. Reversing the recommendation, they contend, would widen oral-health disparities even if the average benefit has narrowed, because the children who rely most on water fluoridation have the least alternative protection.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "American Dental Association; CDC oral-health program",
          sourceUrl: "https://www.cdc.gov/oral-health/prevention/about-community-water-fluoridation.html",
          reasoning:
            "The equity argument is a real distributional consideration that population-average benefit estimates can obscure, supporting caution about ending the recommendation. It is partly an advocacy position from interested professional bodies, which tempers its independence.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Institutional Trust & Regulatory Reform
    // =========================================================================
    {
      id: "institutional-reform",
      title: "Institutional Trust & Regulatory Reform",
      short_summary:
        "MAHA's deepest claim is that the FDA, CDC, and NIH are captured by pharmaceutical and food-industry interests, justifying sweeping restructuring. Critics counter that bulk dismissal of expert panels, fabricated report citations, and internal contradictions over drug-approval standards have damaged the institutions without delivering coherent reform.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "US health agencies are staffed by career scientists, and their recommendations rest on transparent advisory processes and decades of peer-reviewed evidence; 'regulatory capture' is asserted far more than demonstrated. RFK Jr's restructuring has damaged institutional capacity without coherent reform: he dismissed all 17 ACIP members and installed appointees a court found unqualified, canceled roughly $500M in mRNA research, and published reports with AI-fabricated citations. The agenda is also internally contradictory — Vinay Prasad was brought in to tighten drug-approval standards but departed in April 2026 as FDA Commissioner Marty Makary moved to loosen them with 'one Phase 3 instead of two,' over-the-counter expansion, and priority-review vouchers, showing the coalition wants faster, not more rigorous, approvals.",
      proponent_rebuttal:
        "Specific instances of industry influence over health agencies are documentable: the GRAS self-affirmation loophole, the revolving door between regulators and industry, accelerated-approval drugs that disproportionately fail their confirmatory trials yet stay on the market, and the industry-funding history of past advisory committees and dietary-guidelines panels. Demanding transparency, conflict-of-interest disclosure, and benefit-harm reweighing of long-standing recommendations is legitimate reform, not anti-science. Vinay Prasad's surrogate-endpoint research, showing weak correlation with hard outcomes in oncology, is mainstream methodological critique. That MAHA contains an internal tension between stricter-approval and faster-approval factions reflects a real coalition, not incoherence — and the underlying capture problem is genuine even where the remedies are contested.",
      crux: {
        id: "capture-decision-distortion",
        title: "The Capture Decision-Distortion Test",
        description:
          "Documenting individual industry ties is easy; the decisive question is whether those ties distorted specific health recommendations enough to justify the bulk dismissal of expert panels. The crux is whether identifiable agency decisions can be shown to diverge from what the underlying evidence supported, in a direction that benefits industry, beyond what conflict-free expert judgment would produce.",
        methodology:
          "Audit a sample of contested agency decisions (specific ACIP recommendations, GRAS determinations, accelerated approvals) by reconstructing the evidence available at the time, the financial ties of the decision-makers, and whether the decision diverged from the evidence in an industry-favoring direction. Compare against matched decisions made by conflict-free panels or foreign regulators to isolate the effect of capture from ordinary scientific judgment.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (multi-decision regulatory forensic audit cross-referencing financial-disclosure and evidence records)",
      },
      evidence: [
        {
          id: "accelerated-approval-failures",
          title: "Accelerated-Approval Drugs Disproportionately Fail Confirmatory Trials but Stay on Market",
          description:
            "Research, including work by Vinay Prasad, documents that drugs cleared via the FDA's accelerated-approval pathway on surrogate endpoints frequently fail or never complete their confirmatory trials yet often remain on the market for years. Prasad's meta-analyses also found that surrogate-endpoint correlations with hard clinical outcomes are only low-to-moderate in oncology, a recognized methodological critique of how some drugs reach patients.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Prasad et al. surrogate-endpoint meta-analyses; The Cancer Letter",
          sourceUrl: "https://cancerletter.com/regulatory-news/20250509_3/",
          reasoning:
            "The accelerated-approval critique is peer-reviewed and broadly accepted within evidence-based medicine, lending real weight to MAHA's regulatory-reform case. It identifies a documented structural weakness in how some drugs reach the market.",
        },
        {
          id: "dietary-guidelines-conflicts",
          title: "Two-Thirds of MAHA Dietary-Guidelines Reviewers Had Industry Ties",
          description:
            "Marion Nestle's January 2026 analysis found that roughly two-thirds of the reviewers for the MAHA dietary guidelines had industry ties — the very conflict-of-interest problem MAHA invokes against prior committees. Combined with the documented industry-funding history of past advisory bodies, this shows that conflicts of interest in health-policy panels are real, but also that MAHA's own process replicated rather than cured them.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Marion Nestle (Food Politics)",
          sourceUrl: "https://www.foodpolitics.com/2026/01/the-maha-dietary-guidelines-iii-conflicts-of-interest/",
          reasoning:
            "Nestle's finding cuts both ways: it confirms MAHA's premise that industry ties pervade health-policy panels (supporting the capture critique) while also showing MAHA reproduced the problem, which is why it is weighted as legitimate-but-double-edged support.",
        },
        {
          id: "internal-contradiction-prasad-makary",
          title: "MAHA's Approval-Standard Faction Lost: Prasad Out as Makary Loosens Rules",
          description:
            "Vinay Prasad, brought in to lead the FDA's vaccine and gene-therapy division and known for demanding stricter approval evidence, was reported in early March 2026 to be leaving the agency at the end of April. Meanwhile FDA Commissioner Marty Makary moved to loosen approval standards — proposing a single Phase 3 trial instead of two, expanding over-the-counter access, and using priority-review vouchers. The trajectory shows the coalition favoring faster approvals prevailed over the stricter-evidence faction, contradicting MAHA's rigor rhetoric.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Washington Post; CBS News; BioPharma Dive",
          sourceUrl: "https://www.washingtonpost.com/health/2026/03/06/fda-vaccine-regulator-prasad-out/",
          reasoning:
            "The departure of the stricter-evidence advocate while approval standards loosened is a documented internal contradiction. It undercuts the claim that MAHA's institutional overhaul is coherent evidence-based reform rather than a deregulatory coalition.",
        },
        {
          id: "expert-panel-dismissal-costs",
          title: "Bulk Panel Dismissals and Canceled mRNA Funding Damaged Institutional Capacity",
          description:
            "Kennedy dismissed all 17 sitting ACIP members at once in June 2025, canceled roughly $500M in federal mRNA research funding in August 2025, and saw the childhood schedule change frozen by a court that found his replacement appointees unqualified. Critics argue these actions degraded scientific capacity and continuity without first demonstrating that the dismissed experts' decisions were distorted by capture, treating the precautionary remedy as more certain than the diagnosis.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "STAT; NPR; Science",
          sourceUrl: "https://www.statnews.com/2026/04/09/new-acip-charter-cdc-vaccine-advisers-rfk-jr-address-legal-defeat/",
          reasoning:
            "The scale of the dismissals and funding cancellations is documented, and a court found the replacements unqualified. This supports the critique that the restructuring imposed real institutional costs without establishing that capture justified them.",
        },
      ],
    },
  ],
  references: [
    {
      title: "New ACIP Charter as CDC Vaccine Advisers Address Legal Defeat - STAT (April 2026)",
      url: "https://www.statnews.com/2026/04/09/new-acip-charter-cdc-vaccine-advisers-rfk-jr-address-legal-defeat/",
    },
    {
      title: "Federal Judge Blocks RFK Jr Vaccine Changes - NPR (March 2026)",
      url: "https://www.npr.org/2026/03/16/nx-s1-5749530/judge-blocks-rfk-jr-vaccine-changes",
    },
    {
      title: "Adverse Effects of Vaccines: Evidence and Causality - Institute of Medicine (2011)",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK190024/",
    },
    {
      title: "Ultra-Processed Diets Cause Excess Calorie Intake - Cell Metabolism (Hall et al., 2019)",
      url: "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(19)30248-7",
    },
    {
      title: "Fluoride Exposure: Neurodevelopment and Cognition - NTP Monograph (2024)",
      url: "https://ntp.niehs.nih.gov/research/assessments/noncancer/completed/fluoride",
    },
    {
      title: "Water Fluoridation Less Effective Now Than in the Past - Cochrane Review (2024)",
      url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD010856.pub3/full",
    },
    {
      title: "The MAHA Dietary Guidelines: Conflicts of Interest - Marion Nestle, Food Politics (2026)",
      url: "https://www.foodpolitics.com/2026/01/the-maha-dietary-guidelines-iii-conflicts-of-interest/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is the full childhood vaccine schedule adequately tested, or only its components?",
      content:
        "Individual vaccines are backed by randomized trials and decades of surveillance, and the IOM found no evidence the schedule is unsafe. But no large modern RCT has compared the complete current schedule against a lighter one, because withholding effective vaccines from a control group is ethically prohibited. Does the absence of a whole-schedule trial leave a genuine evidentiary gap, or is the observational and surveillance evidence already decisive?",
    },
    {
      id: "q2",
      title: "How much of US chronic disease is caused by ultra-processed food itself?",
      content:
        "Kevin Hall's NIH trial showed food processing can drive overeating, and large cohorts link ultra-processed intake to mortality — MAHA's strongest scientific ground. But chronic disease has many drivers, the NOVA classification is contested as coarse, and the definitive scaled-up trial has lacked funding. Is the food system the primary lever MAHA claims, or one factor among caloric surplus, lifestyle, and genetics?",
    },
    {
      id: "q3",
      title: "Does fluoride at the US dose of 0.7 mg/L cross a benefit-harm line?",
      content:
        "The NTP found neurodevelopmental harm above 1.5 mg/L, and Cochrane found the cavity benefit has shrunk in the toothpaste era — but the US fluoridates at 0.7 mg/L, where dose-response evidence is thin. With a smaller benefit and harm documented only at higher doses, is ending the recommendation justified caution or an overreach beyond what the evidence at the actual US dose supports?",
    },
    {
      id: "q4",
      title: "Is regulatory capture real enough to justify dismantling expert panels?",
      content:
        "Specific industry ties — the GRAS loophole, the revolving door, accelerated approvals that fail confirmatory trials — are documentable. But MAHA's own dietary-guidelines reviewers had industry ties, its reports cited fabricated studies, and its approval-standards faction lost as the FDA loosened rules. Does demonstrated capture justify bulk dismissal of advisory committees, or has the remedy outrun the diagnosis?",
    },
  ],
};
