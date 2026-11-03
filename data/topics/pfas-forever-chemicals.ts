import type { TopicInput } from "@/lib/schemas/topic";

export const pfasForeverChemicalsData = {
  id: "pfas-forever-chemicals",
  title: "PFAS \"Forever Chemicals\"",
  question:
    "Do forever chemicals do enough harm to justify the cost of cleaning up our water?",
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "Are PFAS causing enough harm to justify costly bans and water cleanup?",
    "Are forever chemicals in tap water dangerous?",
    "Should PFAS be banned?",
  ],
  meta_claim:
    "PFAS are causing widespread human health harm and warrant aggressive, costly bans and water cleanup",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: EPA's 18 May 2026 proposals would keep the 4 ppt
  // PFOA/PFOS limits with an optional extension to 2031 and rescind the
  // PFHxS, PFNA, GenX and hazard-index limits; the utilities' challenge to
  // the 2024 rule was argued in the D.C. Circuit on 18 September 2026 and
  // awaits decision.
  last_updated: "2026-11-03",
  tags: ["pfas", "drinking-water", "chemicals", "regulation", "cancer"],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In May 2026 EPA proposed to keep its tap-water limit of 4 parts per trillion for the two best-known forever chemicals, PFOA and PFOS, while letting utilities ask for two more years, to 2031, and to scrap the 2024 limits on four others, including GenX. Nearly everyone in the US has PFAS in their blood, though PFOS levels fell more than 85% and PFOA more than 70% between 1999 and 2019 after manufacturers phased them out. EPA put the 2024 rule's cost and its health benefits at about $1.5 billion a year each. The fight is over how much harm today's doses do, and how far the cleanup should go.",
    confidence: 92,
    source:
      "EPA, 'Per- and Polyfluoroalkyl Substances (PFAS)' drinking water page (updated 18 May 2026); ATSDR, 'PFAS in the U.S. Population' (12 November 2024); EPA final rule, Federal Register 89 FR (26 April 2024)",
    sourceUrl: "https://www.epa.gov/sdwa/and-polyfluoroalkyl-substances-pfas",
  },
  simple_case: [
    "The answer decides what your water bill pays for, whether the D.C. Circuit and EPA keep or cut the 2024 limits, and whether states keep banning PFAS from pans, carpets and clothing.",
    "The two sides split over which health links survive once kidney function is accounted for, whether harm reaches the blood levels most people carry, and whether to regulate PFAS as one class or a few compounds at a time.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Which harms are real? (what we know)
    // =========================================================================
    {
      id: "health-causation-vs-correlation",
      title: "Which Harms Are Real?",
      short_summary:
        "The case starts in West Virginia, where a science panel set up under a class-action settlement studied tens of thousands of people living near a DuPont plant and found 'probable links' between PFOA and six diseases. In 2022 the National Academies called the evidence sufficient for four harms, including kidney cancer and weaker vaccine responses, and in 2023 WHO's cancer agency classed PFOA as a known human carcinogen. Critics, some paid by defendants, say kidney function confounds much of it.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The headline PFAS harms rest on observational studies, and the kidney creates a trap. The kidneys clear PFAS from the blood, so anything that slows them, including early kidney disease, obesity and age, raises blood PFAS. A correlation between high PFAS and kidney cancer or high cholesterol can therefore run partly backwards. In the C8 cohort's own cancer study of 32,254 adults, the kidney cancer association was not statistically significant (HR 1.10, 95% CI 0.98-1.24). The C8 panel's 'probable link' was a legal standard from a class-action settlement, 'more likely than not', not a scientific finding of cause. IARC's Group 1 call for PFOA rested on 'limited' human evidence, and its PFOS evidence in humans was 'inadequate'. A 2025 review argued that newer epidemiology shows no causal relationship between PFOA and kidney cancer or thyroid disease. With almost everyone exposed, there is no clean unexposed group to compare against.",
      proponent_rebuttal:
        "The case does not hang on one confounded correlation. The C8 panel was chosen jointly by DuPont and the plaintiffs and studied the most heavily exposed community ever assembled, with exposures spanning orders of magnitude, which is what lets a dose-response show. After weighing that and the wider literature, the National Academies in 2022 found 'sufficient' evidence, its top tier, for four harms: kidney cancer, high cholesterol, weaker antibody response to vaccines in adults and children, and smaller babies. IARC in 2023 classed PFOA 'carcinogenic to humans', on sufficient animal evidence and strong mechanistic evidence in exposed people. The kidney argument cannot explain weaker vaccine responses in children or lower birth weight, which ATSDR puts at under 0.7 ounces per 1 ng/mL rise in blood PFOA or PFOS. And the 2025 review the skeptics cite was written by consultants at a firm partly funded for the paper by a law firm, one of whom has served as an expert witness for PFAS defendants.",
      crux: {
        id: "reverse-causation-test",
        title: "The Kidney-Function Test",
        question:
          "Do the links between PFAS and kidney cancer and cholesterol hold up once kidney function is accounted for?",
        description:
          "Because the kidney both clears PFAS and is the organ at issue, blood-level correlations can be artifacts. The question is whether the links survive designs that fix exposure before disease and from outside the body, such as how much PFAS was in the water a person drank, rather than how much is in their blood now.",
        methodology:
          "For each contested outcome, prefer prospective cohorts and externally assigned exposure over cross-sectional blood correlations. (1) Use PFAS measured years before diagnosis. (2) Assign exposure from modelled water-system concentration, residential history or job, not the person's own blood level. (3) Measure and adjust for kidney function (eGFR). (4) Pool across the C8 cohort, NHANES and occupational cohorts, species by species, and report dose-response.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Prospective studies that measure PFAS years before diagnosis, adjust for kidney function, and assign exposure from water-system concentration or occupational history rather than the person's own blood level.",
        },
        cost_to_verify:
          "$5-20M (pooled prospective follow-up across C8, NHANES and occupational cohorts; some designs partly done)",
        falsification: {
          supporter_flip:
            "If prospective studies using water-system exposure found the kidney cancer and cholesterol links fading to nothing once kidney function was measured, those harms would look like reverse causation, narrowing the case to immune and birth-weight effects.",
          skeptic_flip:
            "If studies that fix exposure from water records kept finding weaker vaccine responses, lower birth weight and more kidney cancer with higher exposure, 'it is all reverse causation' would no longer cover them.",
          common_ground:
            "Both sides agree PFAS are biologically active, with clear effects in animals and on human cholesterol and immune markers, and that some cancer links rest on observational data.",
          live_disagreement:
            "Whether the kidney cancer and cholesterol links reflect PFAS causing disease or kidney function shaping blood levels.",
        },
      },
      evidence: [
        {
          id: "nasem-sufficient-evidence",
          title:
            "National Academies 2022: sufficient evidence for 4 harms, including kidney cancer and weaker vaccine response",
          description:
            "The National Academies' 'Guidance on PFAS Exposure, Testing, and Clinical Follow-Up' (2022) graded the evidence by outcome. It found 'sufficient evidence of an association', its top tier, for decreased antibody response (adults and children), dyslipidemia (adults and children), decreased infant and fetal growth, and kidney cancer in adults. It placed breast and testicular cancer, liver enzyme changes, pregnancy-induced hypertension, thyroid disease and ulcerative colitis in the 'limited or suggestive' tier.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'Guidance on PFAS Exposure, Testing, and Clinical Follow-Up' (2022)",
          sourceUrl: "https://www.nationalacademies.org/read/26156/chapter/2",
          reasoning:
            "The most authoritative independent grading of the human evidence, and explicit about which harms are weaker. 'Sufficient evidence of an association' is the language of association, not proven cause, so directness is 7.",
        },
        {
          id: "c8-six-probable-links",
          title:
            "C8 Science Panel 2011-12: 'probable links' between PFOA and six diseases near DuPont's West Virginia plant",
          description:
            "Under a class-action settlement over PFOA ('C8') pollution from DuPont's Washington Works plant, a science panel studied tens of thousands of residents and workers; its cancer study alone followed 32,254 adults. Between December 2011 and October 2012 it found probable links to pregnancy-induced hypertension, testicular cancer, kidney cancer, ulcerative colitis, thyroid disease and diagnosed high cholesterol. The settlement defined a probable link as: 'given the available scientific evidence, it is more likely than not' that a connection exists between PFOA exposure and the disease among class members.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source: "C8 Science Panel, Probable Link Reports (2011-2012)",
          sourceUrl: "http://www.c8sciencepanel.org/prob_link.html",
          reasoning:
            "The panel was chosen by both DuPont and the plaintiffs and studied the most exposed community on record, so independence is high. 'More likely than not' is a legal bar, lower than scientific proof of cause, and an exposure that high cannot be reproduced elsewhere, so replicability is 6.",
        },
        {
          id: "iarc-pfoa-group1",
          title:
            "WHO's cancer agency, November 2023: PFOA 'carcinogenic to humans' (Group 1), PFOS 'possibly' (Group 2B)",
          description:
            "An IARC working group met 7-14 November 2023 and classified PFOA as 'carcinogenic to humans' (Group 1), based on 'sufficient evidence' in experimental animals and 'strong' mechanistic evidence in exposed humans, including epigenetic changes and immune suppression, with 'limited evidence' in humans for kidney and testicular cancer. It classed PFOS as 'possibly carcinogenic to humans' (Group 2B), with 'inadequate evidence' in humans.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "IARC, 'IARC Monographs evaluate the carcinogenicity of perfluorooctanoic acid (PFOA) and perfluorooctanesulfonic acid (PFOS)' (1 December 2023); summary in The Lancet Oncology (30 November 2023)",
          sourceUrl:
            "https://www.iarc.who.int/news-events/iarc-monographs-evaluate-the-carcinogenicity-of-perfluorooctanoic-acid-pfoa-and-perfluorooctanesulfonic-acid-pfos/",
          reasoning:
            "The top cancer-classification body put PFOA in its highest tier. IARC rates hazard, whether something can cause cancer, not how much risk a given dose carries, and the human evidence it cites is 'limited', so directness is 6.",
        },
        {
          id: "c8-cohort-kidney-cancer",
          title:
            "C8 cohort cancer study (2013): testicular cancer rose with PFOA; the kidney cancer rise was not statistically significant",
          description:
            "Barry, Winquist and Steenland followed 32,254 adults in the C8 cohort (Environmental Health Perspectives, 2013). Per unit increase in log cumulative serum PFOA, the hazard ratio for testicular cancer was 1.34 (95% CI 1.00-1.79), significant at the 0.05 level; for kidney cancer it was 1.10 (95% CI 0.98-1.24), not statistically significant.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "Barry, Winquist & Steenland, 'Perfluorooctanoic Acid (PFOA) Exposures and Incident Cancers among Adults Living Near a Chemical Plant', Environmental Health Perspectives (2013)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3855514/",
          reasoning:
            "In the most exposed community on record, and by the panel's own epidemiologists, the kidney cancer estimate leaned up but did not clear significance. That is weaker evidence for the kidney link than the panel's 'probable' call suggests. It is not evidence against: the interval mostly covers higher risk, and the testicular result was significant, so directness is 6.",
        },
        {
          id: "reverse-causation-gfr-critique",
          title:
            "Defense-funded 2025 review: 'no causal relationship' between PFOA and kidney cancer or thyroid disease",
          description:
            "Boston, Keck, Naperala and Collins (Frontiers in Public Health, 9 April 2025) argued that newer epidemiology, including studies addressing reverse causation through kidney function and inconsistent dose-response, shows 'there is no causal relationship between PFOA exposure and kidney cancer or thyroid disease.' The authors work for Roux, a consulting firm; Roux 'received partial funding from Mintz, Levin, Cohn, Ferris, Glovsky and Popeo, P.C.' for the manuscript, and one author 'has been retained as an expert witness on behalf of defendants in various litigation matters regarding exposure to PFAS.'",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 6,
            directness: 8,
          },
          source:
            "Boston, Keck, Naperala & Collins, 'The evolution of PFAS epidemiology: new scientific developments call into question alleged \"probable links\" between PFOA and kidney cancer and thyroid disease', Frontiers in Public Health 13 (2025)",
          sourceUrl:
            "https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1532277/full",
          reasoning:
            "The kidney-clearance mechanism it leans on is real physiology, so the argument is on point. Independence is 3 because the paper was partly funded through a law firm and one author is a defense expert witness in PFAS cases; it is a brief for one side, peer-reviewed, and should be weighed as that.",
        },
        {
          id: "immune-developmental-not-gfr",
          title:
            "ATSDR 2026: weaker vaccine response in children and lower birth weight, harms kidney function cannot explain",
          description:
            "ATSDR's clinical guidance, updated 7 July 2026, lists evidence of an association between PFAS and 'Lower antibody response to some vaccines in children' (PFOA, PFOS, PFHxS, PFDA), 'Small decreases in birth weight' of less than 0.7 ounces per 1 ng/mL rise in blood PFOA or PFOS, and higher cholesterol (PFOA, PFOS, PFNA, PFDA). It lists kidney and testicular cancer for PFOA only, and notes that 'Results of animal studies do not always correlate with human health effects.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "ATSDR, 'Clinical Overview: PFAS and Health Effects' (updated 7 July 2026)",
          sourceUrl:
            "https://www.atsdr.cdc.gov/pfas/hcp/clinical-overview/health-effects.html",
          reasoning:
            "These are the endpoints the kidney argument does not reach, from the federal agency that advises doctors. The effects are small per person, an antibody titre and a fraction of an ounce, and NASEM judged their clinical meaning less certain, so directness is 7.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Do everyday doses matter? (mechanism and dose)
    // =========================================================================
    {
      id: "ubiquity-persistence-dose",
      title: "Do Everyday Doses Matter?",
      short_summary:
        "The best-documented harms come from people with very high exposure: the C8 community, plant workers, firefighters. Most Americans carry far less, and the two worst legacy PFAS have fallen sharply in blood since they were phased out. But EPA set the health goal for PFOA and PFOS at zero, and newer short-chain PFAS such as TFA are rising.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Detection is not danger. Laboratories can now find PFAS at parts per trillion, so 'nearly all Americans have PFAS in their blood' reflects how good the instruments are as much as how exposed people are. The people with documented harm carried blood levels far above the general population's. The National Academies set its clinical thresholds accordingly: 'Adverse health effects related to PFAS exposure are not expected at less than 2 nanograms per milliliter', with 'increased risk' above 20. And the trend is down, not up: after US manufacturers phased out PFOS and PFOA, blood PFOS fell more than 85% and PFOA more than 70% between 1999-2000 and 2018-2019. A worsening crisis would not look like that.",
      proponent_rebuttal:
        "'The dose makes the poison' assumes the dose stays put. PFAS barely break down, in the body or the environment, so low exposure keeps adding up. EPA set the health goal for PFOA and PFOS at zero, and estimated that cutting them in tap water would prevent 9,614 deaths and 29,858 illnesses over the following decades. The National Academies' own guidance says that between 2 and 20 ng/mL there is potential for harm, especially for pregnant people. And the reassuring decline covers only the two compounds that were phased out. Replacements and breakdown products are rising: TFA, an ultra-short-chain PFAS, has risen as much as 17-fold in the global environment since 2010 according to Scandinavian scientists, and Germany has proposed classing it as toxic to reproduction.",
      crux: {
        id: "dose-response-threshold",
        title: "The Everyday-Dose Test",
        question:
          "Does PFAS harm reach the blood levels most Americans carry, or only highly exposed communities and workers?",
        description:
          "If harms show up only at the exposures seen near plants and among workers, risk for most people is small and falling. If the dose-response runs down into ordinary blood levels, the near-universal exposure is itself the problem.",
        methodology:
          "Build exposure-response curves for each 'sufficient evidence' harm across the full range: pool the C8 and occupational cohorts with general-population cohorts (NHANES, European birth cohorts) so the curve spans about three orders of magnitude in blood concentration, and test for a no-effect level against a straight line through zero. Separately, check whether population rates of the linked outcomes moved, with a lag, as legacy blood levels fell after the phase-outs.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Exposure-response curves that pool the high-exposure C8 and occupational cohorts with general-population cohorts such as NHANES, testing for a no-effect threshold at the low end, and whether outcome rates fell with the 70-85% drop in legacy blood levels.",
        },
        cost_to_verify:
          "$3-10M (pooled exposure-response modelling plus trend analysis against the documented fall in blood levels)",
        falsification: {
          supporter_flip:
            "If pooled curves showed harms only at C8 and occupational levels, with a clear no-effect level above typical blood levels, and outcome rates did not move as blood levels fell, the case for alarm about ordinary exposure would weaken.",
          skeptic_flip:
            "If birth-weight and vaccine-response effects held below 2 ng/mL, and TFA and other replacements kept rising in blood and water, 'the problem is shrinking' would hold for only part of the PFAS family.",
          common_ground:
            "Both sides agree PFAS are nearly universal in American blood and extremely persistent, and that legacy PFOS and PFOA blood levels have fallen sharply since the phase-outs.",
          live_disagreement:
            "Whether harm extends to the blood levels most people carry or is confined to highly exposed communities and workers.",
        },
      },
      evidence: [
        {
          id: "post-phaseout-decline",
          title:
            "CDC: blood PFOS fell more than 85% and PFOA more than 70% from 1999-2000 to 2018-2019",
          description:
            "ATSDR reports that 'Nearly all people in the U.S. have PFAS in their blood', measured by the CDC's NHANES survey since 1999. After US manufacturers phased out PFOS and PFOA, blood PFOS declined by more than 85% and PFOA by more than 70% between 1999-2000 and 2018-2019.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "ATSDR, 'PFAS in the U.S. Population' (12 November 2024), from CDC NHANES",
          sourceUrl:
            "https://www.atsdr.cdc.gov/pfas/data-research/facts-stats/index.html",
          reasoning:
            "The national biomonitoring survey, as reliable as these numbers get. It shows phase-outs work and that exposure to the two compounds of greatest concern is shrinking. It covers only legacy compounds, not the thousands of replacements, so directness is 7.",
        },
        {
          id: "nasem-serum-thresholds",
          title:
            "National Academies 2022: harm 'not expected' below 2 ng/mL of PFAS in blood; increased risk above 20",
          description:
            "The National Academies' clinical guidance sets thresholds for the sum of seven PFAS in serum: 'Adverse health effects related to PFAS exposure are not expected at less than 2 nanograms per milliliter'; between 2 and 20 ng/mL there is potential for adverse effects, especially in sensitive groups such as pregnant people; and 'There is an increased risk of adverse effects above 20 ng/mL.' It recommends cholesterol screening from 2 ng/mL, and thyroid, kidney cancer and testicular cancer checks from 20.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'Guidance on PFAS Exposure, Testing, and Clinical Follow-Up' (2022)",
          sourceUrl: "https://www.nationalacademies.org/read/26156/chapter/2",
          reasoning:
            "An independent body drew a line below which it does not expect harm, which supports the view that dose matters. The 2-20 band it calls a potential risk, so the guidance cuts both ways, and the thresholds are clinical guides for doctors rather than measured no-effect levels, so directness is 6.",
        },
        {
          id: "no-safe-threshold-mclg",
          title:
            "EPA 2024: health goal for PFOA and PFOS set at zero; rule estimated to prevent 9,614 deaths",
          description:
            "In its April 2024 drinking-water rule EPA set the non-enforceable health goal (MCLG) for PFOA and PFOS at zero and the enforceable limit at 4 parts per trillion each, near the limit of reliable measurement. EPA estimated the rule would bring '29,858 fewer illnesses and 9,614 fewer deaths' in the decades after PFAS levels fell, and that it would reduce exposure for about 100 million people.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source:
            "EPA, PFAS National Primary Drinking Water Regulation, Federal Register (26 April 2024); EPA PFAS drinking water page",
          sourceUrl: "https://www.govinfo.gov/content/pkg/FR-2024-04-26/html/2024-07773.htm",
          reasoning:
            "The regulator's judgment, documented in the rulemaking record, that no exposure to these two is without risk. A zero goal is a precautionary policy choice that need not mean harm was measured at every dose, and the death estimate is a model built on contested dose-response assumptions, so replicability is 5.",
        },
        {
          id: "tfa-ultrashort-rising",
          title:
            "TFA, an ultra-short-chain PFAS, is rising: up as much as 17-fold globally since 2010; in most Wilmington, NC blood samples",
          description:
            "Inside Climate News reported in December 2025 that more than three-quarters of blood samples from Wilmington, North Carolina donors had elevated TFA, downstream of Chemours' Fayetteville Works plant. Tap water measured 1,900 ppt in Wilmington and 1,400 ppt in Brunswick County in 2025, below the Dutch health guidance of 2,200 ppt. Scandinavian scientists report global TFA levels have risen as much as 17 times since 2010. Germany has proposed classifying TFA as toxic to reproduction. There are no US federal or state drinking-water standards for TFA, and Chemours told regulators that 'TFA is not believed to be harmful to human health or the environment.'",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 4,
          },
          source:
            "Inside Climate News, 'Scientists Say the Forever Chemical TFA Could Cause Irreversible Harm. In Eastern North Carolina, It's Everywhere.' (10 December 2025)",
          sourceUrl:
            "https://insideclimatenews.org/news/10122025/north-carolina-tfa-forever-chemicals-chemours/",
          reasoning:
            "It shows the falling-legacy-PFAS story is not the whole story. But TFA leaves the body faster than PFOS, its health effects 'aren't fully understood', and the measured tap levels sit below the strictest guidance, so this is evidence about rising exposure more than demonstrated harm. Directness is 4.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: How far should cleanup go, and who pays? (values and trade-offs)
    // =========================================================================
    {
      id: "cleanup-bans-feasibility-cost",
      title: "How Far Should Cleanup Go, and Who Pays?",
      short_summary:
        "EPA's 2024 rule set limits for six PFAS; its May 2026 proposals would keep two and drop four. Water utilities sued, saying the rule underestimates costs, and the D.C. Circuit heard the case in September 2026. Polluters have agreed to pay more than $11 billion to water systems, and 3M said it would stop making PFAS by the end of 2025. Underneath is a choice between regulating PFAS one compound at a time or as a class.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Chasing parts per trillion costs real money for uncertain gain, and the bill lands on ratepayers. EPA's own analysis put the 2024 rule's annual costs ($1,548.6 million) and benefits ($1,549.4 million) almost exactly level, which leaves no margin if the benefits are overstated. The water utilities' associations, AWWA and AMWA, sued, saying the rule 'underestimates nationwide costs and adds to affordability challenges' and that EPA 'did not rely on the best available science and the most recent occurrence data.' Small and rural systems have the fewest customers to share the cost. In May 2026 EPA itself proposed rescinding the limits for PFHxS, PFNA, GenX and the mixture index, saying it had not followed the Safe Drinking Water Act's requirements, and giving systems until 2031 for PFOA and PFOS. Banning whole classes of chemicals invites regrettable swaps: GenX was brought in to replace PFOA and became a pollutant in its own right.",
      proponent_rebuttal:
        "Ratepayers need not carry the bill alone: polluters are paying. 3M agreed in 2023 to pay at least $10.3 billion, up to $12.5 billion, over 13 years to fund PFAS filtering and testing at public water systems, and DuPont, Chemours and Corteva agreed to $1.18 billion more. EPA's balanced cost-benefit estimate counted only the health effects it could put a number on, which leaves out most of the harms the National Academies found. The 2026 proposals keep the two limits that matter most, at 4 ppt, which shows even an administration skeptical of the rule accepts that science. And GenX is the strongest argument for regulating PFAS as a class, not against it: banning PFOA alone produced GenX, a replacement that then needed its own limit. 3M chose to leave PFAS manufacturing by the end of 2025, citing 'accelerating regulatory trends', which suggests the alternatives exist.",
      crux: {
        id: "net-benefit-of-regulation",
        title: "The Cost and Substitution Test",
        question:
          "Should PFAS be banned and treated as one class, or regulated a few compounds at a time?",
        description:
          "A class approach closes the door on swapping one PFAS for another but costs more and sweeps in thousands of compounds with little data. A compound-by-compound approach targets the best-studied risks at lower cost but has repeatedly let replacements in. Which is better turns on what treatment really costs, how much of it polluters pay, and whether replacements turn out as harmful as what they replaced.",
        methodology:
          "(1) Reconcile EPA's and the utilities' compliance-cost estimates using the latest monitoring data on how many systems exceed the limits and the cost of carbon, ion exchange and reverse-osmosis treatment. (2) Value avoided disease using the National Academies' 'sufficient evidence' outcomes. (3) Net out the 3M and DuPont settlement funds. (4) Track what manufacturers adopt after single-compound limits versus class restrictions, and whether replacements prove comparably toxic.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A cost-benefit audit that reconciles the EPA and AWWA compliance-cost estimates, puts a value on the health endpoints with sufficient evidence, and tracks whether replacements such as GenX turn out comparably toxic.",
        },
        cost_to_verify:
          "$2-5M (cost reconciliation, treatment engineering audit, and tracking of chemical substitution)",
        falsification: {
          supporter_flip:
            "If a reconciled audit found treatment costs well above EPA's estimate, settlement funds covering little of them, and class bans shifting production to equally harmful substitutes, a narrower, prioritised regime would look better than a sweeping one.",
          skeptic_flip:
            "If an audit found settlement funds covering much of the cleanup, health costs well above the treatment bill once unquantified harms were valued, and single-compound limits repeatedly followed by harmful substitutes, class-wide rules would look like the cheaper path.",
          common_ground:
            "Both sides agree cleanup is expensive, that GenX showed the risk of swapping one PFAS for another, and that the worst polluters owe substantial compensation.",
          live_disagreement:
            "Whether the right policy is a broad class-wide regime or a narrow one aimed at the best-studied compounds, and how much of the cost ratepayers should bear.",
        },
      },
      evidence: [
        {
          id: "epa-4ppt-rule",
          title:
            "EPA 2024 rule: 4 ppt limits for PFOA and PFOS, with costs and benefits each estimated at about $1.55 billion a year",
          description:
            "EPA's April 2024 rule set the first national enforceable limits for PFAS in drinking water: 4 parts per trillion each for PFOA and PFOS, 10 ppt each for PFHxS, PFNA and HFPO-DA (GenX), and a hazard index for mixtures. At a 2% discount rate, EPA estimated quantifiable benefits of $1,549.40 million a year and costs of $1,548.64 million a year. Systems must finish initial monitoring by 2027 and meet the limits by 2029.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "EPA, PFAS National Primary Drinking Water Regulation, Federal Register (26 April 2024); EPA PFAS drinking water page",
          sourceUrl: "https://www.govinfo.gov/content/pkg/FR-2024-04-26/html/2024-07773.htm",
          reasoning:
            "The regulator's formal finding that the rule pays for itself, on the benefits it could count. With costs and benefits level, the case rests on the uncounted harms and on whose cost estimate is right, both disputed, so replicability is 6.",
        },
        {
          id: "epa-2026-proposals",
          title:
            "EPA, May 2026: proposes keeping the PFOA/PFOS limits, an optional delay to 2031, and rescinding limits for 4 other PFAS",
          description:
            "On 18 May 2026 EPA proposed two rules, following a plan announced on 14 May 2025. One 'upholds the NPDWR for PFOA and PFOS' while letting systems request two more years, to 2031, to comply. The other would rescind the limits for PFHxS, PFNA and HFPO-DA (GenX) and the hazard index for mixtures of those three plus PFBS, which EPA says corrects a failure to follow the Safe Drinking Water Act's statutory requirements.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source: "EPA, 'Per- and Polyfluoroalkyl Substances (PFAS)' drinking water page (updated 18 May 2026)",
          sourceUrl: "https://www.epa.gov/sdwa/and-polyfluoroalkyl-substances-pfas",
          reasoning:
            "The regulator now says the 2024 rule overreached on four compounds and on timing. Independence is 5 because a new administration reversed its predecessor on largely legal and policy grounds rather than new health data, and the proposals are not final.",
        },
        {
          id: "awwa-cost-dispute",
          title:
            "Water utilities sued over the 2024 rule, saying it 'underestimates nationwide costs'; argued in the D.C. Circuit 18 September 2026",
          description:
            "The American Water Works Association and the Association of Metropolitan Water Agencies challenged the 2024 rule in the D.C. Circuit. They say they 'share EPA's goal of protecting public health' but that EPA 'did not rely on the best available science and the most recent occurrence data', and that 'the rule underestimates nationwide costs and adds to affordability challenges.' In September 2025 EPA moved to vacate the hazard-index part of the rule; the court heard oral argument on 18 September 2026. AWWA filed comments on both 2026 proposals on 16 July 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "American Water Works Association, PFAS resource page (litigation and regulatory timeline, 2025-2026)",
          sourceUrl: "https://www.awwa.org/resource/pfas/",
          reasoning:
            "The utilities run the treatment plants, so their engineering view of costs carries weight. Their members bear the costs, so independence is 5, just as EPA had reason to estimate low. The dispute is what the crux asks an independent audit to settle.",
        },
        {
          id: "polluter-settlements",
          title:
            "3M agreed in 2023 to pay at least $10.3 billion to US water systems; DuPont, Chemours and Corteva $1.18 billion",
          description:
            "On 22 June 2023, 3M reached a settlement worth at least $10.3 billion, and up to $12.5 billion depending on how many public water systems detect PFAS in EPA-required testing, paid over 13 years to fund filtering and testing. Earlier that month DuPont, Chemours and Corteva reached a separate $1.18 billion deal with about 300 drinking-water providers. In December 2022, 3M had announced it would exit PFAS manufacturing by the end of 2025, citing 'accelerating regulatory trends focused on reducing or eliminating the presence of PFAS.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "NPR, '3M reaches $10.3 billion settlement over contamination of water systems' (22 June 2023); 3M news release (20 December 2022)",
          sourceUrl: "https://text.npr.org/1183922303",
          reasoning:
            "Shows that a large share of cleanup cost can be shifted to the manufacturers and that the biggest maker judged it could stop making PFAS. A settlement manages legal risk and is not a finding of health causation, and the funds may not cover the national bill, so directness is 6.",
        },
        {
          id: "genx-regrettable-substitution",
          title:
            "GenX: the PFOA replacement that needed its own limit and is now proposed for deregulation",
          description:
            "GenX (HFPO-DA) is a processing aid used to make fluoropolymers 'without the use of perfluorooctanoic acid (PFOA).' EPA finalized a toxicity assessment for GenX chemicals in October 2021, and its 2024 rule set an enforceable limit of 10 ppt for HFPO-DA, alongside PFHxS and PFNA. EPA's May 2026 proposal would rescind that limit.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "EPA, 'Human Health Toxicity Assessments for GenX Chemicals' (final, October 2021); EPA PFAS drinking water page (updated 18 May 2026)",
          sourceUrl:
            "https://www.epa.gov/chemical-research/human-health-toxicity-assessments-genx-chemicals",
          reasoning:
            "The textbook case for regulating PFAS as a class: phasing out one compound produced a replacement that needed regulating in turn. It can be read the other way, as proof that bans just move the problem, so directness is 5.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Per- and Polyfluoroalkyl Substances (PFAS) — EPA drinking water rule and 2026 proposals",
      url: "https://www.epa.gov/sdwa/and-polyfluoroalkyl-substances-pfas",
    },
    {
      title: "PFAS in the U.S. Population — ATSDR (NHANES biomonitoring)",
      url: "https://www.atsdr.cdc.gov/pfas/data-research/facts-stats/index.html",
    },
    {
      title: "Guidance on PFAS Exposure, Testing, and Clinical Follow-Up — National Academies (2022)",
      url: "https://www.nationalacademies.org/read/26156/chapter/2",
    },
    {
      title: "IARC Monographs evaluate the carcinogenicity of PFOA and PFOS — IARC (December 2023)",
      url: "https://www.iarc.who.int/news-events/iarc-monographs-evaluate-the-carcinogenicity-of-perfluorooctanoic-acid-pfoa-and-perfluorooctanesulfonic-acid-pfos/",
    },
    {
      title: "C8 Science Panel Probable Link Reports (2011-2012)",
      url: "http://www.c8sciencepanel.org/prob_link.html",
    },
    {
      title: "PFAS National Primary Drinking Water Regulation — Federal Register (26 April 2024)",
      url: "https://www.govinfo.gov/content/pkg/FR-2024-04-26/html/2024-07773.htm",
    },
    {
      title: "The Evolution of PFAS Epidemiology — Boston et al., Frontiers in Public Health (2025, defense-funded)",
      url: "https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1532277/full",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Which PFAS health harms are actually caused by PFAS, versus merely correlated?",
      content:
        "The C8 panel found probable links between PFOA and six diseases, the National Academies judged the evidence sufficient for four harms, and IARC classed PFOA a known carcinogen. But the kidneys both clear PFAS and are the organ at issue for kidney cancer, so high blood PFAS can partly mark disease rather than cause it. Weaker vaccine responses and lower birth weight are harder to explain that way.",
    },
    {
      id: "q2",
      title:
        "Does near-universal exposure mean harm, or does the dose still make the poison?",
      content:
        "Nearly all Americans have PFAS in their blood, but the best-documented harms come from highly exposed communities and workers, and legacy PFOS and PFOA levels have fallen by 70-85%. EPA set the health goal for both at zero, the National Academies say harm is not expected below 2 ng/mL, and replacement compounds such as TFA are rising.",
    },
    {
      id: "q3",
      title:
        "Are class-wide PFAS bans and tens of billions in cleanup worth it?",
      content:
        "EPA's 2024 rule priced costs and benefits at about $1.5 billion a year each; utilities say costs are higher, and EPA proposed in 2026 to keep only the PFOA and PFOS limits. Polluters have committed more than $11 billion. Is a class-wide approach that prevents swaps like GenX worth the cost, or should rules target the best-studied compounds?",
    },
  ],
} satisfies TopicInput;
