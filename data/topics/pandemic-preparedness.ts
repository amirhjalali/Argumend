import type { TopicInput } from "@/lib/schemas/topic";

export const pandemicPreparednessData = {
  id: "pandemic-preparedness",
  title: "Pandemic Preparedness Investment",
  question: "Should governments invest heavily in pandemic preparedness?",
  meta_claim:
    "Governments should invest heavily in pandemic preparedness infrastructure",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Economists David Cutler and Lawrence Summers put COVID-19's total cost to the United States at about $16 trillion. In March 2020 HHS said the Strategic National Stockpile held about 12 million N95 respirators and 30 million surgical masks, about 1% of the 3.5 billion masks a severe pandemic would need. Neither figure is in dispute. What divides the sides is how often a pandemic that costly comes, and whether governments can keep paying for readiness between scares.",
    confidence: 82,
    source:
      "Cutler & Summers, JAMA (2020); HHS figures reported by the Washington Post (Mar 2020)",
    sourceUrl: "https://jamanetwork.com/journals/jama/fullarticle/2771764",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that a severe pandemic is enormously costly while most outbreaks are contained with existing capacity, that preparedness funding and attention faded after SARS and H1N1, and that a readiness budget has to be divided between surveillance, vaccine platforms, manufacturing capacity and pathogen research.",
    "They split over how often truly catastrophic pandemics strike today, which decides whether a few billion a year in surveillance, vaccine platforms and stockpiles pays off; whether reforms like protected funding and independent agencies can outlast the next lull, or bureaucratic incentives always let them lapse; and whether those spending lanes differ enough in readiness per dollar for a large budget to be aimed rather than carved up.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Cost-Benefit of Prevention
    // =========================================================================
    {
      id: "cost-benefit-prevention",
      title: "Cost-Benefit of Prevention",
      short_summary:
        "COVID-19 imposed an estimated $16+ trillion cost on the US alone, dwarfing any proposed preparedness investment. Proponents argue that preparedness costs a fraction of what a pandemic does: the Independent Panel proposed raising $5-10 billion a year globally for it. Skeptics counter that the probability of pandemic-scale events is too uncertain to justify massive standing expenditures, and that preparedness budgets are routinely raided for other priorities between crises.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Pandemic preparedness sounds compelling after a crisis, but governments are terrible at maintaining expensive standing capacity for rare events. Proposals such as the $4.5 billion a year a 2016 global health risk commission called for, or the $5-10 billion a year the Independent Panel for Pandemic Preparedness and Response proposed in 2021, rest on probability estimates that are inherently speculative. The 'once in a century' framing ignores that most novel pathogen outbreaks (SARS 2003, MERS 2012, Ebola 2014) were successfully contained without trillion-dollar preparedness infrastructure. Political incentives ensure that preparedness budgets get cannibalized during non-pandemic years — the Strategic National Stockpile was depleted and not replenished despite multiple warnings. Building expensive infrastructure for low-probability events means diverting resources from high-certainty health needs like chronic disease, mental health, and primary care access.",
      proponent_rebuttal:
        "The cost-benefit math is overwhelming and not close. Cutler and Summers (2020) estimated COVID-19's total US cost at $16 trillion — including $7.6 trillion in lost GDP, $4.4 trillion in premature deaths, and about $4.2 trillion in long-term health and mental health impairment. Against figures like these, the Independent Panel's proposed facility would raise $5-10 billion a year globally for preparedness, and the Panel judged national preparedness 'vastly underfunded, despite the clear evidence that its cost is a fraction of the cost of responses and losses incurred when an epidemic occurs.' The argument that preparedness budgets get raided is an argument for institutional reform, not against the investment itself.",
      crux: {
        id: "probability-weighted-cost",
        title: "The Probability-Weighted Expected Cost Test",
        question:
          "How often do truly catastrophic pandemics strike under modern conditions?",
        description:
          "Whether the probability-weighted expected cost of future pandemics justifies massive upfront investment. If pandemic-scale events (causing >1 million deaths and >$5 trillion in economic damage) occur with sufficient frequency, even expensive preparedness infrastructure pays for itself many times over. If such events are genuinely rare and most outbreaks are containable with existing capacity, the investment is a poor allocation of scarce health dollars.",
        methodology:
          "Compile a comprehensive database of novel pathogen spillover events from 1900 to present, categorized by scale: contained outbreak (<1,000 deaths), epidemic (1,000-100,000 deaths), and pandemic (>100,000 deaths). Calculate the historical frequency and trend of each category, adjusting for increased zoonotic risk factors (deforestation, urbanization, factory farming density, global travel volume). Apply Monte Carlo simulation to project the expected frequency and cost of future events under current conditions. Compare the expected annual cost of pandemics against proposed annual preparedness budgets to determine the break-even probability threshold.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A database of novel pathogen spillovers since 1900, sorted by death toll into contained outbreaks, epidemics and pandemics, giving the frequency of each and its trend after adjusting for deforestation, factory farming and global travel.",
        },
        cost_to_verify:
          "$500K-1M (Epidemiological modeling requiring historical outbreak databases and economic impact analysis)",
        falsification: {
          supporter_flip:
            "If a rigorous historical-frequency analysis showed pandemic-scale events are genuinely rare and most outbreaks are containable with existing capacity — so the probability-weighted expected cost doesn't justify large upfront spending — the 'highest-return investment' case would weaken to 'nice but not cost-effective.'",
          skeptic_flip:
            "If updated spillover estimates showed pandemic risk rising with deforestation, factory farming and travel, a low yearly probability times a COVID-scale ~$16T loss would outweigh a few-billion-dollar budget, and 'too speculative' would lose its footing.",
          common_ground:
            "Both sides agree a severe pandemic is enormously costly and that most routine outbreaks are contained with existing capacity.",
          live_disagreement:
            "How frequent truly catastrophic pandemics are under modern conditions — which sets the break-even probability, and which only a rigorous historical-frequency-plus-trend analysis can pin down.",
        },
      },
      evidence: [
        {
          id: "covid-16-trillion-cost",
          title:
            "COVID-19 Cost the US an Estimated $16+ Trillion (Cutler & Summers 2020)",
          description:
            "Harvard economists David Cutler and Lawrence Summers published a landmark analysis in JAMA estimating the total cost of COVID-19 to the United States at approximately $16 trillion — roughly 90% of annual GDP. This included $7.6 trillion in lost output over the next decade (a Congressional Budget Office projection), $4.4 trillion for premature deaths (valued at $7 million per life, below the $10 million usually assumed in health and environmental policy), $2.6 trillion for long-term complications among survivors, and $1.6 trillion for mental health impairment. The authors called it an estimate made on the 'optimistic assumption' that the pandemic would be substantially contained by fall 2021.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Cutler & Summers, 'The COVID-19 Pandemic and the $16 Trillion Virus,' JAMA 324(15):1495-1496 (Oct 2020)",
          sourceUrl: "https://jamanetwork.com/journals/jama/fullarticle/2771764",
          reasoning:
            "Published in JAMA by two of the most prominent health economists in the world (Summers is a former Treasury Secretary and Harvard president). The methodology is transparent and uses standard economic valuation techniques. The estimate has been widely cited and not seriously challenged in its order of magnitude. Directly supports the case that pandemic costs are so enormous that even expensive prevention is cost-effective.",
        },
        {
          id: "prevention-funding-proposal",
          title:
            "Independent Panel: $5-10 Billion a Year for Preparedness, Against Trillions in Losses",
          description:
            "The Independent Panel for Pandemic Preparedness and Response, co-chaired by former New Zealand PM Helen Clark and former Liberian President Ellen Johnson Sirleaf, reported in May 2021 that 'national pandemic preparedness has been vastly underfunded, despite the clear evidence that its cost is a fraction of the cost of responses and losses incurred when an epidemic occurs.' It recommended an International Pandemic Financing Facility able to mobilize long-term contributions of 'approximately US$ 5–10 billion annually' for ongoing preparedness, and to disburse up to US$50-100 billion at short notice once a pandemic is declared. It cited the 2016 Commission on a Global Health Risk Framework for the Future, which called its proposed US$4.5 billion annual preparedness boost a small investment against a potential 21st-century pandemic cost 'in excess of $6 trillion.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Independent Panel for Pandemic Preparedness and Response, 'COVID-19: Make it the Last Pandemic' (May 2021)",
          sourceUrl:
            "https://theindependentpanel.org/mainreport/",
          reasoning:
            "The Independent Panel was convened by the WHO Director-General with participation from former heads of state and leading public health experts. Its cost comparisons are cited rather than modeled by the Panel itself, and the case depends on the assumption that the investment would actually prevent or substantially mitigate pandemic impacts.",
        },
        {
          id: "historical-pandemic-frequency",
          title:
            "Historical Record Puts a COVID-Intensity Epidemic at About Once in 59 Years, With Risk Rising",
          description:
            "Major outbreaks since 1918 include Spanish Flu (1918), Asian Flu (1957), Hong Kong Flu (1968), HIV/AIDS (1981-present), SARS (2003), H1N1 Swine Flu (2009), MERS (2012), Ebola (2014), Zika (2016), and COVID-19 (2020). Marani et al. (PNAS, 2021) compiled a global dataset of epidemics from 1600 to the present. At the emergence rate of 2000-2019, an epidemic with COVID-19's observed intensity has an average recurrence time of 59 years; allowing for the deaths that interventions prevented, they put the chance of experiencing such an event in a lifetime at about 38%. Using estimates of rising disease emergence from animal reservoirs associated with environmental change, they estimate the yearly probability of extreme epidemics 'can increase up to threefold in the coming decades.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Marani et al., 'Intensity and frequency of extreme novel epidemics,' PNAS 118(35) (2021)",
          sourceUrl:
            "https://www.pnas.org/doi/10.1073/pnas.2105482118",
          reasoning:
            "Published in PNAS, a top-tier scientific journal, using rigorous statistical methods applied to historical records spanning 400+ years. The finding that pandemic probability is increasing strengthens the investment case. However, the estimate moves a great deal with the assumed intensity (59 years for observed COVID deaths, 209 years after adjusting for deaths prevented by interventions), and critics note that containment success for SARS and MERS may reduce the effective frequency of catastrophic outcomes.",
        },
        {
          id: "opportunity-cost-argument",
          title:
            "Pandemic Preparedness Spending Diverts from Certain Health Needs",
          description:
            "Critics argue that $4.5 billion per year in pandemic preparedness could save more lives if invested in known, high-certainty health interventions. A 2018 Lancet analysis of 137 low- and middle-income countries (Kruk et al.) estimated 8.6 million deaths in 2016 were amenable to health care, 5.0 million from poor-quality care and 3.6 million from people not using care at all. GiveWell says its models for grants to its top charities 'have typically estimated an average cost between $3,000 and $5,500' per life saved, so a few billion dollars a year would on that arithmetic save hundreds of thousands of lives now rather than insure against a future event, though GiveWell also expects the cost to save a life 'to increase over time.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source:
            "Kruk et al., 'Mortality due to low-quality health systems in the universal health coverage era,' The Lancet (2018); GiveWell, 'How much does it cost to save a life?'",
          sourceUrl:
            "https://doi.org/10.1016/S0140-6736(18)31668-4",
          reasoning:
            "The opportunity cost argument is logically sound and draws on credible data about the cost-effectiveness of known health interventions. However, it frames the choice as either/or when most proposals call for pandemic preparedness in addition to existing health spending. It also undervalues the catastrophic tail risk of pandemics, which can overwhelm health systems and reverse decades of development progress.",
        },
        {
          id: "who-preparedness-index",
          title:
            "No country scores as fully prepared on the comparative assessments",
          description:
            "The WHO Joint External Evaluation (JEE) assesses country capacity under the International Health Regulations; WHO reports that more than 100 countries have gone through one. The JEE does not produce a single score out of 100 — each indicator is rated on a five-level capacity scale, from no capacity to sustainable capacity, and results are reported technical area by technical area. The 2021 Global Health Security Index, which does score countries out of 100, found no country fully prepared, with an average of 38.9. Its highest scorers — the United States (75.9), Australia (71.1) and Finland (70.9) — all had gaps exposed by COVID-19 in surge capacity, supply-chain resilience and public health communication.",
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
            "The JEE is the WHO's official assessment instrument with standardized methodology. The GHS Index is the most comprehensive comparative study available. Both describe capacity as short of what their own frameworks define as prepared. Directness is moderate because preparedness scores are inputs (capacity measures) rather than outputs, and because published analyses after 2020 found the GHS Index ranking predicted observed COVID-19 outcomes poorly, which cuts against reading either instrument as a forecast of how a country will fare.",
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
        "The institutional failure argument confuses 'institutions failed' with 'institutions cannot succeed.' Taiwan's CDC, South Korea's KCDC, and Singapore's public health system all performed exceptionally during COVID-19 — keeping per-capita death rates roughly 20-65x below the US through 2021. These successes were built on specific investments made after SARS (2003) and MERS (2015): pre-positioned testing capacity, trained contact tracing workforces, legal frameworks for rapid response, and integrated health data systems. Operation Warp Speed, despite its flaws, demonstrated that massive government investment in vaccine development could compress a 10-year timeline to 11 months — saving an estimated 3 million US lives according to the Commonwealth Fund. The lesson is not that institutions always fail, but that specific institutional reforms — pre-authorized emergency protocols, standing surge capacity, advance purchase agreements, and independent rapid response units — can overcome bureaucratic inertia when designed correctly.",
      crux: {
        id: "institutional-reform-effectiveness",
        title: "The Institutional Reform Durability Test",
        question:
          "Can preparedness reforms be made to last, or do bureaucratic incentives always let them lapse?",
        description:
          "Whether institutional reforms can prevent the same failures that characterized COVID-19 responses, or whether bureaucratic incentives make preparedness inherently difficult to sustain. If post-COVID reforms in surveillance, stockpiling, and rapid response authority prove durable and effective in future outbreaks, the investment case is validated. If institutions revert to pre-pandemic complacency within 5-10 years — as occurred after H1N1 in 2009 — the investment is wasted.",
        methodology:
          "Conduct a comparative institutional analysis of countries that reformed public health systems after SARS (2003), MERS (2015), and COVID-19. Track specific reform indicators over 10-year periods: (1) sustained funding levels for stockpiles and surveillance, (2) staffing levels in emergency response units, (3) time-to-detection and time-to-response in subsequent outbreaks, (4) political accountability mechanisms for preparedness lapses. Compare reform durability in systems with independent agencies (like South Korea's KDCA) versus those embedded in larger bureaucracies (like the US CDC within HHS).",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Ten-year tracking of countries that reformed after SARS, MERS and COVID-19: stockpile and surveillance funding, emergency staffing, and time to detect and respond in the next outbreak.",
        },
        cost_to_verify:
          "$300K-800K (Comparative institutional analysis requiring government data across multiple countries)",
        falsification: {
          supporter_flip:
            "If comparative analysis showed post-COVID reforms predictably erode within 5-10 years — surveillance defunded, stockpiles depleted, response units cut, as happened after H1N1 — then heavy upfront investment would mostly be wasted on institutions that revert to complacency.",
          skeptic_flip:
            "If more agencies built like South Korea's KDCA after MERS stayed funded and independent and then responded faster in the next outbreak, 'preparedness always decays' would give way to a question of institutional design.",
          common_ground:
            "Both sides agree preparedness funding and attention have historically faded after each scare, and that institutional design affects whether reforms stick.",
          live_disagreement:
            "Whether reforms can be made durable (independent agencies, protected funding) or whether bureaucratic incentives inevitably let preparedness lapse — which only tracking reform durability across countries over a decade can show.",
        },
      },
      evidence: [
        {
          id: "cdc-test-failure",
          title:
            "CDC Botched Initial COVID-19 Test Kit, Delaying US Response by Weeks",
          description:
            "In February 2020 the CDC shipped its own SARS-CoV-2 test kits to about 100 public health labs, the first arriving on 6 February. An internal CDC review obtained by NPR found that the first quality-control round used an incorrect procedure, and that when the correct protocol was run it showed 'the kit could fail 33% of the time', a result that 'did not result in a kit recall or a performance alert.' Lab leaders suspected contamination, though CDC and HHS officials disputed an FDA inspector's account of lab conditions. 'We waited another month before we had testing available,' said Jennifer Rakeman, director of New York City's Public Health Laboratory.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source:
            "NPR (Dina Temple-Raston), 'CDC Report: Officials Knew Coronavirus Test Was Flawed But Released It Anyway' (6 Nov 2020), via KQED, reporting an internal CDC root-cause review",
          sourceUrl:
            "https://www.kqed.org/science/1970862/cdc-report-officials-knew-coronavirus-test-was-flawed-but-released-it-anyway",
          reasoning:
            "The account rests on the CDC's own internal review, though the agency declined to discuss it on the record, and on named lab officials. The testing failure is the single most consequential institutional failure of the US COVID response and is not disputed by any credible source. Directly demonstrates that institutional failure can negate preparedness investment.",
        },
        {
          id: "strategic-national-stockpile-depletion",
          title:
            "Strategic National Stockpile Depleted and Not Replenished Despite Warnings",
          description:
            "The Strategic National Stockpile (SNS), funded since 1999, distributed 85 million N95 respirators in the 2009 H1N1 pandemic, and the Washington Post reported in March 2020 that 'the stockpile's reserves were not significantly restored after the 2009 pandemic.' HHS then said it held 'about 12 million N95 respirators and 30 million surgical masks,' about 1% of the estimated 3.5 billion masks a severe pandemic would need. A 2023 HHS Inspector General audit (A-04-20-02028) found the Stockpile 'could not meet demand and was not equipped to handle the COVID-19 pandemic,' and that its annual budget authority had not kept pace with its expanding responsibilities. The gap built up across the Obama and Trump administrations, suggesting stockpile upkeep lacks a political constituency between crises.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "Washington Post, via The Press Democrat (11 Mar 2020); HHS Office of Inspector General, 'The Strategic National Stockpile Was Not Positioned To Respond Effectively to the COVID-19 Pandemic' (A-04-20-02028, Oct 2023)",
          sourceUrl:
            "https://www.pressdemocrat.com/news/10813143-181/face-masks-in-the-national",
          reasoning:
            "The HHS OIG is the official internal watchdog, and the stockpile depletion is documented across multiple government reports. The bipartisan nature of the failure (two administrations) strongly supports the skeptical argument that preparedness investment degrades between crises regardless of which party is in power. However, proponents argue this demonstrates the need for institutional reforms (automatic replenishment mandates, independent oversight) rather than against investment itself.",
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
            "Taiwan and South Korea Kept COVID Death Rates Roughly 20-65x Below the US Through 2021",
          description:
            "By 31 December 2021 Johns Hopkins CSSE counted 850 COVID deaths in Taiwan (population about 23.6 million) and 5,625 in South Korea (about 51.7 million), while WHO-reported data compiled by Our World in Data put the US at about 2,380 deaths per million, roughly 65 times Taiwan's per-capita rate and 20 times South Korea's. Both countries had invested heavily in pandemic preparedness after SARS (Taiwan) and MERS (South Korea), building: pre-positioned testing and contact tracing capacity, integrated health data surveillance systems, legal frameworks for rapid quarantine and border controls, and public communication infrastructure. Taiwan activated its Central Epidemic Command Center on 20 January 2020 and, per a JAMA account, produced and implemented 'at least 124 action items' over the next five weeks, drawing on a response mechanism set up after SARS in 2003.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Wang, Ng & Brook, 'Response to COVID-19 in Taiwan,' JAMA (2020); Johns Hopkins CSSE daily report (31 Dec 2021); Our World in Data",
          sourceUrl:
            "https://jamanetwork.com/journals/jama/fullarticle/2762689",
          reasoning:
            "Comparative mortality data from Our World in Data is transparent and independently verifiable. The Taiwan and South Korea cases are the strongest direct evidence that institutional preparedness investment works, as their success was directly attributable to post-SARS/MERS reforms. Replicability is somewhat lower because both countries are island/peninsula geographies with strong state capacity and high social cohesion — factors not easily replicated elsewhere.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Where Preparedness Money Buys the Most Readiness
    // =========================================================================
    {
      id: "readiness-per-dollar",
      title: "Where Preparedness Money Buys the Most Readiness",
      short_summary:
        "A preparedness budget has to be split. One school would put it into surveillance, platform vaccines and standing manufacturing capacity; the other into characterizing the pathogens themselves, on the view that you cannot defend against what you have not studied. Whether enhanced-pathogen research should be banned outright is a separate question, argued on the map asking whether research that enhances pandemic pathogens should be banned worldwide; here the question is only where readiness dollars go.",
      icon_name: "Target" as const,
      skeptic_premise:
        "'Invest heavily' is a bucket, not a plan. A readiness budget has to be split between surveillance networks, vaccine platforms, standing manufacturing capacity and characterizing pathogens themselves, and each spending lane has its own constituency competing for the same appropriation. The mRNA platform that mattered most in 2020 came out of thirty years of curiosity-driven basic research that no preparedness program had commissioned — which suggests the route that pays off cannot be picked in advance. Large standing budgets get divided by whichever constituency is best organized rather than by expected lives saved: the Strategic National Stockpile has been funded since 1999 and still held about 12 million N95 respirators in early 2020. Surveillance, the lane with the broadest political support, also carries costs that are rarely counted — wastewater and genomic monitoring collect data about populations that never consented to it. Until someone can say which lane returns the most readiness per dollar, spending heavily means handing a bigger budget to the committees that produced the last gap.",
      proponent_rebuttal:
        "Allocation is the part of preparedness with the clearest track record. Operation Warp Speed's advance purchase agreements and parallel manufacturing compressed a vaccine timeline to 11 months. CEPI's 100 Days Mission names what it needs: platform technologies ready to speed development, stronger surveillance and early warning, and response networks ready to act. Each of those is a capacity line item whose output can be measured before the next outbreak rather than after it — days from spillover to detection, days from identifying a new pathogen to an authorized vaccine, doses per month of standing bottling-and-packaging capacity. The privacy and equity objections to biosurveillance are real and are a reason to design the programs with consent and data limits, and to build sequencing capacity inside the countries being monitored, not a reason to keep the budget small.",
      crux: {
        id: "preparedness-spending-allocation",
        title: "The Readiness-per-Dollar Comparison",
        question:
          "Can preparedness lanes be ranked on readiness per dollar before a pandemic?",
        description:
          "A readiness budget divides between disease surveillance, vaccine platform technology, standing manufacturing capacity and pathogen characterization. If those lanes differ sharply in measurable output per dollar, a large budget can be aimed at the best of them and heavy investment is a decision rather than a gamble. If the lanes cannot be ranked on anything observable before a pandemic, a bigger appropriation mostly enlarges the fight over how to split it.",
        methodology:
          "Cost each lane against an output that exists before a pandemic rather than after one. For surveillance networks: days from spillover to detection in real outbreaks and in tabletop exercises, per dollar of network funding. For platform technologies: days from identifying a new pathogen to an authorized vaccine, the 100 days CEPI's mission targets against the 326 days CEPI counts to the first COVID-19 vaccine rollout, per dollar of platform funding. For manufacturing: doses per month of standing bottling-and-packaging capacity per dollar of the standby contract. For pathogen characterization: countermeasure candidates that reached trials per dollar of grant funding. Draw all four from the same national programs over a decade, where CEPI, BARDA and national stockpile and surveillance budgets are published, and report cost per unit of each output rather than one composite score.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Cost per unit of output for each readiness lane, drawn from the same national programs: days of detection delay avoided per dollar of surveillance funding, days from identifying a pathogen to an authorized vaccine per dollar of platform funding, standing doses per month per dollar of the manufacturing standby contract, and countermeasure candidates reaching trials per dollar of characterization grant funding.",
        },
        cost_to_verify:
          "$400K-1M (Program-level cost accounting across national preparedness budgets and outbreak-response records)",
        falsification: {
          supporter_flip:
            "If costing the lanes side by side found none of them buying measurably more readiness per dollar than another — detection delay, time to candidate and surge capacity all moving about the same per dollar spent — then heavy investment would be a budget without a destination, and the case for it would rest on the hope that the money lands somewhere useful.",
          skeptic_flip:
            "If one lane came out far ahead on its own output measure, such as a surveillance network cutting days-to-detection for a fraction of what the same gain costs elsewhere, the objection that a large readiness budget has no agreed destination would have an answer in the numbers.",
          common_ground:
            "Both sides agree a readiness budget has to be split between surveillance, vaccine platforms, manufacturing capacity and pathogen characterization, and that the mRNA platform's payoff came out of research no preparedness program had commissioned.",
          live_disagreement:
            "Whether the lanes differ enough in measurable output per dollar for a large budget to be aimed at the strongest of them, or whether the split is settled by whichever constituency is best organized — which a side-by-side costing of each lane against its own pre-pandemic output measure could show.",
        },
      },
      evidence: [
        {
          id: "mrna-platform-success",
          title:
            "mRNA Vaccine Platform Emerged from 30+ Years of Unrestricted Basic Research",
          description:
            "The mRNA vaccine technology that enabled the Pfizer-BioNTech and Moderna COVID-19 vaccines was the product of over 30 years of basic research. In the early 1990s Katalin Kariko kept working on mRNA therapeutics, the Nobel Assembly notes, 'despite encountering difficulties in convincing research funders of the significance of her project'; her foundational work with Drew Weissman on modified nucleosides was published in 2005. The key insight — using pseudouridine to prevent immune rejection of synthetic mRNA — was a basic science discovery that emerged from curiosity-driven research, not directed pandemic preparedness programs. Kariko and Weissman received the Nobel Prize in Physiology or Medicine in 2023 for this work. The lesson for preparedness advocates is that platform technologies require long-term, unrestricted research investment — the exact opposite of narrowly targeted preparedness programs.",
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
            "The Coalition for Epidemic Preparedness Innovations (CEPI), backed by the G7 and G20, launched the '100 Days Mission' aiming to develop vaccines within 100 days of identifying a new pandemic pathogen — compared with the 326 days before the first COVID-19 vaccines were being rolled out. CEPI names platform technologies ready to speed development, stronger disease surveillance and early warning, faster identification of immune-response markers, and response networks among what the mission needs. CEPI-commissioned modelling by Imperial College London estimated that vaccines available within 100 days of the SARS-CoV-2 genome's release could have averted 8.3 million excess deaths by the end of 2021. Critics note that the 100-day timeline also depends on characterizing novel pathogens as they appear, so a readiness budget cannot go entirely to platforms, manufacturing and surveillance.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "CEPI, 'The 100 Days Mission'",
          sourceUrl:
            "https://cepi.net/100-days-mission",
          reasoning:
            "CEPI is a respected international organization with credible scientific leadership. The 100 Days Mission represents the most concrete current preparedness investment proposal. Replicability is lower because the timeline has not been tested in a real pandemic scenario, and how a fixed budget should divide between platform build-out and pathogen characterization remains unresolved.",
        },
        {
          id: "biosurveillance-ethics",
          title:
            "Genomic Biosurveillance Raises Privacy and Equity Concerns",
          description:
            "Pandemic preparedness increasingly relies on genomic biosurveillance — sequencing pathogens from wastewater, clinical samples, and animal populations to detect emerging threats. Programs like CDC's National Wastewater Surveillance System and the WHO's global genomic surveillance network have proven valuable for tracking COVID-19 variants. However, sampling whole communities raises legal and ethical questions: a 2020 Journal of Law and the Biosciences analysis (Gable, Ram & Ram) concluded that even once reliability is established, 'limits on sample and data collection, use, and sharing must also be considered to prevent undermining privacy and autonomy.' Critics add that sequencing capacity is concentrated in wealthy nations, leaving many lower-income countries dependent on outside monitoring of their own populations.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Gable, Ram & Ram, 'Legal and ethical implications of wastewater monitoring of SARS-CoV-2 for COVID-19 surveillance,' Journal of Law and the Biosciences (2020)",
          sourceUrl:
            "https://doi.org/10.1093/jlb/lsaa039",
          reasoning:
            "The privacy and equity concerns are documented in peer-reviewed literature and are actively debated in bioethics. Directness is lower because these concerns relate to the implementation of preparedness rather than whether preparedness investment is justified in principle. However, they are relevant because public trust is essential for surveillance effectiveness, and overreach could undermine future preparedness cooperation.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "The COVID-19 Pandemic and the $16 Trillion Virus — Cutler & Summers, JAMA (2020)",
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
        "GAO Report: COVID-19 — Urgent Actions Needed to Better Ensure an Effective Federal Response — GAO-21-191",
      url: "https://www.gao.gov/products/gao-21-191",
    },
    {
      title:
        "Two Years of COVID-19 Vaccines Have Prevented Millions of Deaths — Commonwealth Fund (2022)",
      url: "https://www.commonwealthfund.org/blog/2022/two-years-covid-vaccines-prevented-millions-deaths-hospitalizations",
    },
    {
      title:
        "Nobel Prize in Physiology or Medicine 2023: Kariko and Weissman",
      url: "https://www.nobelprize.org/prizes/medicine/2023/press-release/",
    },
    {
      title:
        "CEPI 100 Days Mission: Delivering Pandemic-Busting Vaccines in 100 Days",
      url: "https://cepi.net/100-days-mission",
    },
  ],
  questions: [
    {
      id: "q1",
      title:
        "Does the cost-benefit math justify pandemic preparedness even under uncertainty?",
      content:
        "COVID-19 cost the US an estimated $16 trillion, while the Independent Panel's proposed global preparedness facility would raise $5-10 billion a year. The cost comparison looks lopsided. But critics argue that preparedness budgets are routinely raided between crises, probability estimates for future pandemics are inherently speculative, and the same dollars could save more lives invested in known health interventions like primary care and chronic disease prevention. Is pandemic preparedness the highest-return public investment or an expensive insurance policy that governments inevitably let lapse?",
    },
    {
      id: "q2",
      title:
        "Can institutions be reformed to sustain preparedness between crises?",
      content:
        "The US had the world's highest pandemic preparedness score in 2019 and still suffered one of the worst per-capita COVID death rates among wealthy nations. The CDC botched testing, the Strategic National Stockpile was depleted, and regulatory frameworks delayed response at every turn. Meanwhile, Taiwan and South Korea — which invested after SARS and MERS — kept per-capita death rates roughly 20-65x lower through 2021. Is the problem insufficient investment, or do bureaucratic incentives inevitably erode preparedness when the political spotlight moves on?",
    },
    {
      id: "q3",
      title:
        "Where should preparedness money go to buy the most readiness?",
      content:
        "A readiness budget splits between surveillance, vaccine platforms, standing manufacturing capacity and characterizing pathogens as they appear. CEPI's 100 Days Mission names what the platform-and-surveillance route needs; the mRNA platform that mattered most in 2020, by contrast, came out of decades of basic research no preparedness program had commissioned. Can the lanes be ranked on output measured before a pandemic — days to detection, days from identifying a pathogen to an authorized vaccine, standing doses per month — or does a bigger budget just enlarge the fight over how to divide it?",
    },
  ],
} satisfies TopicInput;
