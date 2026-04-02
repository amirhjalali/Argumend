import type { Topic } from "@/lib/schemas/topic";

export const pandemicPreparednessData = {
  id: "pandemic-preparedness",
  title: "Pandemic Preparedness Investment",
  meta_claim:
    "Governments should invest heavily in pandemic preparedness infrastructure",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Cost-Benefit of Prevention
    // =========================================================================
    {
      id: "cost-benefit-prevention",
      title: "Cost-Benefit of Prevention",
      short_summary:
        "COVID-19 imposed an estimated $16+ trillion cost on the US alone, dwarfing any proposed preparedness investment. Proponents argue that pandemic prevention at $4.5 billion per year is the highest-return public investment possible. Skeptics counter that the probability of pandemic-scale events is too uncertain to justify massive standing expenditures, and that preparedness budgets are routinely raided for other priorities between crises.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Pandemic preparedness sounds compelling after a crisis, but governments are terrible at maintaining expensive standing capacity for rare events. The proposed $4.5 billion per year in annual pandemic prevention spending — pushed by groups like the Nuclear Threat Initiative and the Independent Panel for Pandemic Preparedness — is based on probability estimates that are inherently speculative. The 'once in a century' framing ignores that most novel pathogen outbreaks (SARS 2003, MERS 2012, Ebola 2014) were successfully contained without trillion-dollar preparedness infrastructure. Political incentives ensure that preparedness budgets get cannibalized during non-pandemic years — the Strategic National Stockpile was depleted and not replenished despite multiple warnings. Building expensive infrastructure for low-probability events means diverting resources from high-certainty health needs like chronic disease, mental health, and primary care access.",
      proponent_rebuttal:
        "The cost-benefit math is overwhelming and not close. Cutler and Summers (2020) estimated COVID-19's total US cost at $16 trillion — including $7.6 trillion in lost GDP, $4.4 trillion in excess mortality valued at statistical life, and $4 trillion in long-term health and mental health impacts. The McKinsey Global Institute and the World Bank independently estimated global losses at $12-28 trillion. Against these figures, the proposed $4.5 billion per year in prevention spending represents a return of over 100:1 even if a pandemic occurs only once every 25 years. The WHO's Independent Panel and the G20 High Level Independent Panel both concluded that annual global preparedness spending of $10-15 billion could prevent 70-80% of future pandemic mortality. The argument that preparedness budgets get raided is an argument for institutional reform, not against the investment itself.",
      crux: {
        id: "probability-weighted-cost",
        title: "The Probability-Weighted Expected Cost Test",
        description:
          "Whether the probability-weighted expected cost of future pandemics justifies massive upfront investment. If pandemic-scale events (causing >1 million deaths and >$5 trillion in economic damage) occur with sufficient frequency, even expensive preparedness infrastructure pays for itself many times over. If such events are genuinely rare and most outbreaks are containable with existing capacity, the investment is a poor allocation of scarce health dollars.",
        methodology:
          "Compile a comprehensive database of novel pathogen spillover events from 1900 to present, categorized by scale: contained outbreak (<1,000 deaths), epidemic (1,000-100,000 deaths), and pandemic (>100,000 deaths). Calculate the historical frequency and trend of each category, adjusting for increased zoonotic risk factors (deforestation, urbanization, factory farming density, global travel volume). Apply Monte Carlo simulation to project the expected frequency and cost of future events under current conditions. Compare the expected annual cost of pandemics against proposed annual preparedness budgets to determine the break-even probability threshold.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Epidemiological modeling requiring historical outbreak databases and economic impact analysis)",
      },
      evidence: [
        {
          id: "covid-16-trillion-cost",
          title:
            "COVID-19 Cost the US an Estimated $16+ Trillion (Cutler & Summers 2020)",
          description:
            "Harvard economists David Cutler and Lawrence Summers published a landmark analysis in JAMA estimating the total cost of COVID-19 to the United States at approximately $16 trillion — roughly 90% of annual GDP. This included $7.6 trillion in lost output and GDP contraction, $4.4 trillion in premature mortality (valued using the EPA's value of a statistical life at $7 million per death), and $4 trillion in long-term health impairment, mental health costs, and reduced quality of life. The estimate did not include costs of Long COVID, which subsequent studies valued at an additional $2.6-3.7 trillion.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Cutler & Summers, JAMA (2020)",
          sourceUrl: "https://jamanetwork.com/journals/jama/fullarticle/2771764",
          reasoning:
            "Published in JAMA by two of the most prominent health economists in the world (Summers is a former Treasury Secretary and Harvard president). The methodology is transparent and uses standard economic valuation techniques. The estimate has been widely cited and not seriously challenged in its order of magnitude. Directly supports the case that pandemic costs are so enormous that even expensive prevention is cost-effective.",
        },
        {
          id: "prevention-funding-proposal",
          title:
            "Annual $4.5B Pandemic Prevention Proposal vs Trillions in Damage",
          description:
            "The Independent Panel for Pandemic Preparedness and Response, co-chaired by former New Zealand PM Helen Clark and former Liberian President Ellen Johnson Sirleaf, recommended annual global spending of $10 billion on pandemic preparedness, with the US share approximately $4.5 billion. The Nuclear Threat Initiative's Global Health Security Index estimated that 73% of countries had minimal or no pandemic preparedness capacity as of 2021. Even using conservative pandemic frequency estimates (one major event per 20-25 years), the benefit-cost ratio exceeds 100:1 when compared against documented pandemic economic losses.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Independent Panel for Pandemic Preparedness; Nuclear Threat Initiative GHS Index",
          sourceUrl:
            "https://theindependentpanel.org/mainreport/",
          reasoning:
            "The Independent Panel was convened by the WHO Director-General with participation from former heads of state and leading public health experts. The NTI Global Health Security Index is the most comprehensive comparative assessment of country-level preparedness. The 100:1 benefit-cost ratio is robust to wide variation in pandemic frequency assumptions, though it depends on the assumption that investment would actually prevent or substantially mitigate pandemic impacts.",
        },
        {
          id: "historical-pandemic-frequency",
          title:
            "Major Pandemics Have Occurred Every 10-25 Years, Frequency Increasing",
          description:
            "Since 1918, major pandemic or near-pandemic events have occurred with increasing frequency: Spanish Flu (1918), Asian Flu (1957), Hong Kong Flu (1968), HIV/AIDS (1981-present), SARS (2003), H1N1 Swine Flu (2009), MERS (2012), Ebola (2014), Zika (2016), and COVID-19 (2020). Research published in PNAS by Marani et al. (2021) analyzed the historical frequency of extreme epidemics and estimated that the annual probability of a COVID-scale pandemic is approximately 2-3%, meaning the expected recurrence interval is 33-50 years — but that this probability is increasing due to deforestation, urbanization, and global travel connectivity.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Marani et al., PNAS (2021); WHO historical outbreak data",
          sourceUrl:
            "https://www.pnas.org/doi/10.1073/pnas.2105482118",
          reasoning:
            "Published in PNAS, a top-tier scientific journal, using rigorous statistical methods applied to historical records spanning 400+ years. The finding that pandemic probability is increasing strengthens the investment case. However, the wide confidence interval (2-3% annual probability) introduces uncertainty, and critics note that containment success for SARS and MERS may reduce the effective frequency of catastrophic outcomes.",
        },
        {
          id: "opportunity-cost-argument",
          title:
            "Pandemic Preparedness Spending Diverts from Certain Health Needs",
          description:
            "Critics argue that $4.5 billion per year in pandemic preparedness could save more lives if invested in known, high-certainty health interventions. The WHO estimates that 5 million deaths per year in low- and middle-income countries could be prevented with basic primary care access. In the US alone, chronic disease accounts for 90% of the $4.1 trillion in annual health spending. The GiveWell cost-effectiveness analysis estimates that top global health interventions save a life for $3,000-5,000, suggesting that $4.5 billion could save 900,000-1.5 million lives per year with certainty, rather than providing insurance against a probabilistic future event.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "WHO Global Health Estimates; GiveWell Cost-Effectiveness Analysis",
          sourceUrl:
            "https://www.who.int/data/gho/data/themes/mortality-and-global-health-estimates",
          reasoning:
            "The opportunity cost argument is logically sound and draws on credible data about the cost-effectiveness of known health interventions. However, it frames the choice as either/or when most proposals call for pandemic preparedness in addition to existing health spending. It also undervalues the catastrophic tail risk of pandemics, which can overwhelm health systems and reverse decades of development progress.",
        },
        {
          id: "who-preparedness-index",
          title:
            "WHO Joint External Evaluation: Most Countries Critically Unprepared",
          description:
            "The WHO Joint External Evaluation (JEE) framework, which assesses country-level compliance with International Health Regulations, found that as of 2023, fewer than 50 countries (out of 196) had completed assessments, and among those evaluated, the average preparedness score was 40 out of 100. The 2021 Global Health Security Index found that no country was fully prepared for a pandemic, with an average score of 38.9/100. Even the highest-scoring countries (US, UK, Netherlands) had significant gaps exposed by COVID-19, particularly in surge capacity, supply chain resilience, and public health communication.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "WHO Joint External Evaluations; Nuclear Threat Initiative GHS Index 2021",
          sourceUrl:
            "https://www.who.int/emergencies/operations/international-health-regulations-monitoring-evaluation-framework/joint-external-evaluations",
          reasoning:
            "The JEE is the WHO's official assessment instrument with standardized methodology. The GHS Index is the most comprehensive comparative study available. Both demonstrate that current global preparedness levels are inadequate. Directness is moderate because preparedness scores are inputs (capacity measures) rather than outputs (demonstrated pandemic mitigation).",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Institutional Readiness vs Institutional Failure
    // =========================================================================
    {
      id: "institutional-readiness",
      title: "Institutional Readiness vs Institutional Failure",
      short_summary:
        "COVID-19 exposed catastrophic institutional failures at the CDC, FDA, and WHO — from botched testing rollouts to depleted stockpiles. Yet Operation Warp Speed delivered vaccines in record time, and countries like Taiwan and South Korea demonstrated that competent institutions can control pandemics effectively. The debate centers on whether institutional reform can overcome the bureaucratic incentives that make preparedness inherently difficult to sustain.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The fundamental problem with pandemic preparedness is not funding — it is institutional incentives. The US had the highest-rated pandemic preparedness score in the world on the 2019 GHS Index and still failed spectacularly during COVID-19. The CDC botched its initial diagnostic test, costing weeks of surveillance capacity. The FDA's regulatory process delayed both testing and vaccine authorization. The Strategic National Stockpile had been allowed to deplete after the 2009 H1N1 scare because there was no political reward for maintaining invisible stockpiles. Bureaucratic institutions optimize for process compliance and blame avoidance, not rapid response. More funding does not fix perverse incentives — it just creates larger bureaucracies that fail in the same ways. The history of FEMA, DHS, and other preparedness agencies shows that institutional capacity degrades between crises regardless of budgets.",
      proponent_rebuttal:
        "The institutional failure argument confuses 'institutions failed' with 'institutions cannot succeed.' Taiwan's CDC, South Korea's KCDC, and Singapore's public health system all performed exceptionally during COVID-19 — achieving death rates 10-50x lower than the US per capita. These successes were built on specific investments made after SARS (2003) and MERS (2015): pre-positioned testing capacity, trained contact tracing workforces, legal frameworks for rapid response, and integrated health data systems. Operation Warp Speed, despite its flaws, demonstrated that massive government investment in vaccine development could compress a 10-year timeline to 11 months — saving an estimated 3 million US lives according to the Commonwealth Fund. The lesson is not that institutions always fail, but that specific institutional reforms — pre-authorized emergency protocols, standing surge capacity, advance purchase agreements, and independent rapid response units — can overcome bureaucratic inertia when designed correctly.",
      crux: {
        id: "institutional-reform-effectiveness",
        title: "The Institutional Reform Durability Test",
        description:
          "Whether institutional reforms can prevent the same failures that characterized COVID-19 responses, or whether bureaucratic incentives make preparedness inherently difficult to sustain. If post-COVID reforms in surveillance, stockpiling, and rapid response authority prove durable and effective in future outbreaks, the investment case is validated. If institutions revert to pre-pandemic complacency within 5-10 years — as occurred after H1N1 in 2009 — the investment is wasted.",
        methodology:
          "Conduct a comparative institutional analysis of countries that reformed public health systems after SARS (2003), MERS (2015), and COVID-19. Track specific reform indicators over 10-year periods: (1) sustained funding levels for stockpiles and surveillance, (2) staffing levels in emergency response units, (3) time-to-detection and time-to-response in subsequent outbreaks, (4) political accountability mechanisms for preparedness lapses. Compare reform durability in systems with independent agencies (like South Korea's KDCA) versus those embedded in larger bureaucracies (like the US CDC within HHS).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Comparative institutional analysis requiring government data across multiple countries)",
      },
      evidence: [
        {
          id: "cdc-test-failure",
          title:
            "CDC Botched Initial COVID-19 Test Kit, Delaying US Response by Weeks",
          description:
            "In February 2020, the CDC distributed its internally developed SARS-CoV-2 diagnostic test to public health laboratories across the US. The test produced inconclusive results due to a contaminated reagent at the CDC's manufacturing facility. The FDA's regulatory framework prevented laboratories from developing their own tests without emergency use authorization, which was not granted until February 29. By the time testing was widely available in mid-March, the virus had been spreading undetected for weeks. A subsequent Government Accountability Office report found that the delay cost the US 4-6 weeks of surveillance capability during the critical early exponential growth phase.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source:
            "Government Accountability Office; House Select Subcommittee on the Coronavirus Crisis",
          sourceUrl:
            "https://www.gao.gov/products/gao-21-191",
          reasoning:
            "The GAO is Congress's nonpartisan investigative arm, and its findings are based on documentary evidence and official records. The testing failure is the single most consequential institutional failure of the US COVID response and is not disputed by any credible source. Directly demonstrates that institutional failure can negate preparedness investment.",
        },
        {
          id: "strategic-national-stockpile-depletion",
          title:
            "Strategic National Stockpile Depleted and Not Replenished Despite Warnings",
          description:
            "The Strategic National Stockpile (SNS), established in 1999, was significantly depleted during the 2009 H1N1 pandemic response — using 85 million N95 masks and other supplies. Despite multiple government reports recommending replenishment, the stockpile was never fully restored. By January 2020, the SNS held only 12 million N95 masks against a projected pandemic need of 3.5 billion. The HHS Inspector General found in 2020 that 'ichthe SNS had not maintained adequate supplies or developed relationships with manufacturers to rapidly scale production.' This failure occurred across three presidential administrations (Obama, Trump, Biden), illustrating that stockpile maintenance lacks political constituency.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "HHS Office of Inspector General; Congressional Research Service",
          sourceUrl:
            "https://oig.hhs.gov/reports-and-publications/featured-topics/sns/",
          reasoning:
            "The HHS OIG is the official internal watchdog, and the stockpile depletion is documented across multiple government reports. The bipartisan nature of the failure (three administrations) strongly supports the skeptical argument that preparedness investment degrades between crises regardless of which party is in power. However, proponents argue this demonstrates the need for institutional reforms (automatic replenishment mandates, independent oversight) rather than against investment itself.",
        },
        {
          id: "operation-warp-speed-success",
          title:
            "Operation Warp Speed Delivered Vaccines in 11 Months, Saving ~3 Million US Lives",
          description:
            "Operation Warp Speed (OWS), launched in May 2020 with $18 billion in federal funding, coordinated the development, manufacturing, and distribution of COVID-19 vaccines. The Pfizer-BioNTech vaccine received Emergency Use Authorization in December 2020 — 11 months after the virus was sequenced, compared to the typical 10-15 year vaccine development timeline. The Commonwealth Fund estimated that COVID-19 vaccines prevented approximately 3.2 million deaths and 18.5 million hospitalizations in the US through November 2022. OWS used advance purchase agreements to de-risk manufacturer investment and parallel clinical trial and manufacturing processes.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Commonwealth Fund; New England Journal of Medicine; GAO OWS Assessment",
          sourceUrl:
            "https://www.commonwealthfund.org/blog/2022/two-years-covid-vaccines-prevented-millions-deaths-hospitalizations",
          reasoning:
            "The Commonwealth Fund is a respected independent health policy foundation, and the mortality prevention estimate is consistent with multiple independent analyses. OWS demonstrates that massive government preparedness investment can work spectacularly. Replicability is somewhat lower because OWS benefited from prior mRNA research investments (decades of NIH-funded basic science) and the unique urgency of a global pandemic — it is unclear whether pre-positioned investment would yield the same speed without an active crisis.",
        },
        {
          id: "taiwan-south-korea-success",
          title:
            "Taiwan and South Korea Achieved COVID Death Rates 10-50x Lower Than US",
          description:
            "Taiwan recorded fewer than 1,000 COVID deaths through 2021 (population 23.6 million), while South Korea kept deaths under 6,000 through the same period (population 51.7 million). Compared to the US death rate, Taiwan's rate was approximately 50x lower and South Korea's approximately 10x lower per capita. Both countries had invested heavily in pandemic preparedness after SARS (Taiwan) and MERS (South Korea), building: pre-positioned testing and contact tracing capacity, integrated health data surveillance systems, legal frameworks for rapid quarantine and border controls, and public communication infrastructure. Taiwan's Central Epidemic Command Center was activated on January 20, 2020 — the same day the US confirmed its first case — and implemented 124 discrete response actions in the first 30 days.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Journal of the American Medical Association; The Lancet; Our World in Data",
          sourceUrl:
            "https://jamanetwork.com/journals/jama/fullarticle/2762689",
          reasoning:
            "Comparative mortality data from Our World in Data is transparent and independently verifiable. The Taiwan and South Korea cases are the strongest direct evidence that institutional preparedness investment works, as their success was directly attributable to post-SARS/MERS reforms. Replicability is somewhat lower because both countries are island/peninsula geographies with strong state capacity and high social cohesion — factors not easily replicated elsewhere.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Biosecurity vs Research Freedom
    // =========================================================================
    {
      id: "biosecurity-research-freedom",
      title: "Biosecurity vs Research Freedom",
      short_summary:
        "Gain-of-function research on dangerous pathogens could help predict and prevent pandemics — or could cause them. The same mRNA platform that produced COVID vaccines in record time emerged from decades of unrestricted basic research. Balancing biosecurity restrictions against scientific freedom is perhaps the most consequential preparedness debate, with the stakes being catastrophic risk on both sides.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Restricting biological research in the name of biosecurity risks slowing the very advances that protect against pandemics. The mRNA vaccine platform — which saved millions of lives during COVID-19 — was developed over 30+ years of basic research by Katalin Kariko, Drew Weissman, and others, much of which would be impeded by today's proposed biosecurity restrictions. The NIH moratorium on gain-of-function research (2014-2017) delayed important influenza and coronavirus research without clearly reducing risk, since similar research continued in China, where US oversight was impossible. Broad biosecurity regulations are easily evaded by state-level bioweapons programs (Russia, North Korea) while handicapping Western democracies. The 100 Days Mission for future pandemic vaccines requires exactly the kind of pathogen characterization research that biosecurity hawks want to restrict. Over-restriction creates a 'security theater' that reduces capacity without reducing risk.",
      proponent_rebuttal:
        "The biosecurity concern is not speculative — it is the most urgent pandemic preparedness issue. The debate over whether COVID-19 originated from a lab leak at the Wuhan Institute of Virology remains unresolved, but the FBI and the US Department of Energy have both assessed a lab origin as most likely. Regardless of COVID's origin, the Global Health Security Agenda has documented over 100 laboratory incidents involving dangerous pathogens in the US alone between 2006 and 2015. Gain-of-function research that enhances pathogen transmissibility or virulence creates existential risk for marginal scientific benefit — two studies that engineered H5N1 avian influenza to transmit between ferrets (Fouchier 2012, Kawaoka 2012) demonstrated that pandemic-potential pathogens can be created in the lab. The 100 Days Mission for vaccines can be achieved through computational biology, structural prediction (AlphaFold), and platform technology development without requiring live enhancement of dangerous pathogens. Restricting a narrow category of highest-risk research while expanding investment in platform technologies is the optimal preparedness strategy.",
      crux: {
        id: "research-restriction-net-effect",
        title: "The Research Restriction Net Risk Assessment",
        description:
          "Whether restricting dangerous biological research (gain-of-function, dual-use research of concern) reduces pandemic risk more than it slows beneficial medical advances. If the probability of a lab-origin pandemic exceeds the probability that gain-of-function findings prevent a natural pandemic, restrictions reduce net risk. If gain-of-function research produces irreplaceable insights for vaccine and therapeutic development, restrictions increase vulnerability.",
        methodology:
          "Commission an independent risk assessment comparing: (1) the historical frequency and severity of laboratory accidents involving enhanced pathogens (data from the Federal Select Agent Program, WHO, and investigative journalism), (2) the counterfactual scientific contributions of gain-of-function research — which specific vaccine or therapeutic advances required enhanced pathogen research that could not have been achieved through alternative methods (computational modeling, pseudovirus systems, natural isolate characterization), (3) expert elicitation surveys of virologists, biosecurity specialists, and vaccine developers to estimate probabilities of lab-origin vs. natural-origin pandemics under current and restricted research regimes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Comprehensive risk assessment requiring classified lab incident data and expert elicitation)",
      },
      evidence: [
        {
          id: "gain-of-function-moratorium",
          title:
            "NIH Gain-of-Function Moratorium (2014-2017) Revealed Deep Scientific Divisions",
          description:
            "In October 2014, the Obama administration imposed a moratorium on federal funding for gain-of-function research on influenza, MERS, and SARS viruses — research that intentionally enhances pathogen transmissibility or virulence. The moratorium was lifted in December 2017 under a new framework (the HHS P3CO Review Policy) that required case-by-case review. During the moratorium debate, over 200 scientists signed a letter opposing restrictions, arguing they would impede pandemic preparedness, while an equally prominent group including former CDC directors and Nobel laureates supported them. The moratorium did not prevent NIH-funded research on coronaviruses at the Wuhan Institute of Virology through EcoHealth Alliance subgrants, raising questions about enforcement effectiveness.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source:
            "NIH Office of Science Policy; National Science Advisory Board for Biosecurity",
          sourceUrl:
            "https://osp.od.nih.gov/biotechnology/gain-of-function-research/",
          reasoning:
            "The moratorium and its outcomes are extensively documented in government records and scientific publications. The fact that research continued through subgrants despite the moratorium supports the skeptical argument that restrictions are ineffective. However, the moratorium also catalyzed the development of alternative research methods (pseudovirus systems, computational approaches) that proponents argue demonstrate restrictions can redirect research without halting progress.",
        },
        {
          id: "lab-incidents-documented",
          title:
            "100+ Lab Incidents Involving Dangerous Pathogens in US Labs (2006-2015)",
          description:
            "A 2016 USA Today investigation, drawing on Federal Select Agent Program data, documented over 100 incidents involving dangerous pathogens in US laboratories between 2006 and 2015, including accidental shipments of live anthrax from Dugway Proving Ground, the discovery of forgotten live smallpox vials at the NIH campus, and a CDC incident where live H5N1 avian influenza was accidentally shipped to a BSL-2 lab instead of a BSL-3 facility. The Government Accountability Office found that oversight of high-containment laboratories was fragmented across multiple agencies with no single authority responsible for biosafety standards.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "USA Today Investigation; GAO Reports on High-Containment Labs; Federal Select Agent Program",
          sourceUrl:
            "https://www.gao.gov/products/gao-16-642",
          reasoning:
            "The GAO report and investigative journalism are independently sourced and based on official incident records. The documented frequency of lab accidents with dangerous pathogens directly supports the argument that biosecurity risks are real, not theoretical. The lack of centralized oversight is a structural vulnerability that preparedness investment could address.",
        },
        {
          id: "mrna-platform-success",
          title:
            "mRNA Vaccine Platform Emerged from 30+ Years of Unrestricted Basic Research",
          description:
            "The mRNA vaccine technology that enabled the Pfizer-BioNTech and Moderna COVID-19 vaccines was the product of over 30 years of basic research, much of it unfunded or underfunded. Katalin Kariko's foundational work on modified nucleosides (published with Drew Weissman in 2005) was initially dismissed and struggled for funding. The key insight — using pseudouridine to prevent immune rejection of synthetic mRNA — was a basic science discovery that emerged from curiosity-driven research, not directed pandemic preparedness programs. Kariko and Weissman received the Nobel Prize in Physiology or Medicine in 2023 for this work. The lesson for preparedness advocates is that platform technologies require long-term, unrestricted research investment — the exact opposite of narrowly targeted preparedness programs.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Nobel Prize Committee; Kariko & Weissman, Immunity (2005); Nature Reviews Drug Discovery",
          sourceUrl:
            "https://www.nobelprize.org/prizes/medicine/2023/press-release/",
          reasoning:
            "The Nobel Prize citation and the published research record are authoritative. The mRNA story genuinely demonstrates that breakthrough preparedness capabilities can emerge from unrestricted basic science. However, directness is moderate because the mRNA platform's COVID application was ultimately accelerated by exactly the kind of massive government investment (OWS) that preparedness advocates call for — suggesting the real lesson is that both basic research funding and preparedness investment are needed.",
        },
        {
          id: "100-days-mission",
          title:
            "100 Days Mission: Vaccines Within 100 Days of Pathogen Identification",
          description:
            "The Coalition for Epidemic Preparedness Innovations (CEPI), backed by the G7 and G20, launched the '100 Days Mission' aiming to develop vaccines within 100 days of identifying a new pandemic pathogen — compared to 326 days for the first COVID-19 vaccine EUA. The mission requires pre-positioned platform technologies (mRNA, viral vector, protein subunit), pre-approved regulatory pathways, advance manufacturing capacity, and ongoing surveillance for novel pathogens. CEPI estimates the total investment needed at $3.5 billion over 5 years. Critics note that the 100-day timeline requires characterization of novel pathogens, which may involve exactly the kind of gain-of-function or dual-use research that biosecurity advocates want to restrict.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "CEPI; G7 100 Days Mission Report; Wellcome Trust",
          sourceUrl:
            "https://100days.cepi.net/",
          reasoning:
            "CEPI is a respected international organization with credible scientific leadership. The 100 Days Mission represents the most concrete current preparedness investment proposal. Replicability is lower because the timeline has not been tested in a real pandemic scenario, and the tension between rapid pathogen characterization and biosecurity restrictions remains unresolved.",
        },
        {
          id: "biosurveillance-ethics",
          title:
            "Genomic Biosurveillance Raises Privacy and Equity Concerns",
          description:
            "Pandemic preparedness increasingly relies on genomic biosurveillance — sequencing pathogens from wastewater, clinical samples, and animal populations to detect emerging threats. Programs like CDC's National Wastewater Surveillance System and the WHO's global genomic surveillance network have proven valuable for tracking COVID-19 variants. However, biosurveillance infrastructure raises significant concerns: wastewater surveillance can detect community drug use patterns and genetic conditions; genomic databases can be used for bioweapons targeting; and surveillance capacity is concentrated in wealthy nations, leaving the global South dependent on external monitoring of their own populations.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "CDC National Wastewater Surveillance System; Nature Medicine; The Lancet Digital Health",
          sourceUrl:
            "https://www.cdc.gov/nwss/wastewater-surveillance.html",
          reasoning:
            "The privacy and equity concerns are documented in peer-reviewed literature and are actively debated in bioethics. Directness is lower because these concerns relate to the implementation of preparedness rather than whether preparedness investment is justified in principle. However, they are relevant because public trust is essential for surveillance effectiveness, and overreach could undermine future preparedness cooperation.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "The Great Failure of the COVID Pandemic: Economic Cost of $16 Trillion — Cutler & Summers, JAMA (2020)",
      url: "https://jamanetwork.com/journals/jama/fullarticle/2771764",
    },
    {
      title:
        "COVID-19: Make It the Last Pandemic — Independent Panel for Pandemic Preparedness and Response (2021)",
      url: "https://theindependentpanel.org/mainreport/",
    },
    {
      title:
        "Intensity and Frequency of Extreme Novel Epidemics — Marani et al., PNAS (2021)",
      url: "https://www.pnas.org/doi/10.1073/pnas.2105482118",
    },
    {
      title:
        "2021 Global Health Security Index — Nuclear Threat Initiative & Johns Hopkins",
      url: "https://www.ghsindex.org/",
    },
    {
      title:
        "GAO Report: COVID-19 — Federal Efforts to Provide Vaccines — GAO-21-191",
      url: "https://www.gao.gov/products/gao-21-191",
    },
    {
      title:
        "Two Years of COVID-19 Vaccines Have Prevented Millions of Deaths — Commonwealth Fund (2022)",
      url: "https://www.commonwealthfund.org/blog/2022/two-years-covid-vaccines-prevented-millions-deaths-hospitalizations",
    },
    {
      title:
        "GAO Report: High-Containment Laboratories — National Strategy Needed — GAO-16-642",
      url: "https://www.gao.gov/products/gao-16-642",
    },
    {
      title:
        "Nobel Prize in Physiology or Medicine 2023: Kariko and Weissman",
      url: "https://www.nobelprize.org/prizes/medicine/2023/press-release/",
    },
    {
      title:
        "CEPI 100 Days Mission: Delivering Pandemic-Busting Vaccines in 100 Days",
      url: "https://100days.cepi.net/",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does the cost-benefit math justify pandemic preparedness even under uncertainty?",
      content:
        "COVID-19 cost the US an estimated $16 trillion, while the proposed annual global preparedness investment is $10 billion. The benefit-cost ratio appears overwhelming at 100:1 or greater. But critics argue that preparedness budgets are routinely raided between crises, probability estimates for future pandemics are inherently speculative, and the same dollars could save more lives invested in known health interventions like primary care and chronic disease prevention. Is pandemic preparedness the highest-return public investment or an expensive insurance policy that governments inevitably let lapse?",
    },
    {
      id: "q2",
      title:
        "Can institutions be reformed to sustain preparedness between crises?",
      content:
        "The US had the world's highest pandemic preparedness score in 2019 and still suffered one of the worst per-capita COVID death rates among wealthy nations. The CDC botched testing, the Strategic National Stockpile was depleted, and regulatory frameworks delayed response at every turn. Meanwhile, Taiwan and South Korea — which invested after SARS and MERS — achieved death rates 10-50x lower. Is the problem insufficient investment, or do bureaucratic incentives inevitably erode preparedness when the political spotlight moves on?",
    },
    {
      id: "q3",
      title:
        "Should gain-of-function research be restricted to reduce pandemic risk?",
      content:
        "Gain-of-function research that enhances pathogen transmissibility could help predict natural pandemic threats — or could cause a lab-origin pandemic. Over 100 lab incidents with dangerous pathogens were documented in US labs between 2006 and 2015. Yet the mRNA vaccine platform that saved millions of lives emerged from decades of unrestricted basic research, and the 100 Days Mission for future vaccines may require pathogen characterization work that biosecurity advocates want to restrict. Where is the optimal balance between biosecurity and scientific freedom?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
