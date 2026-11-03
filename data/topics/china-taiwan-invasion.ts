import type { TopicInput } from "@/lib/schemas/topic";

export const chinaTaiwanInvasionData = {
  id: "china-taiwan-invasion",
  title: "Will China Invade Taiwan Before 2030?",
  question: "Will China invade Taiwan before 2030?",
  aliases: [
    "Will China take Taiwan by force?",
    "Is 2027 the year China invades Taiwan?",
    "Would the US defend Taiwan?",
    "Would China blockade Taiwan instead of invading?",
  ],
  meta_claim:
    "China will attempt military reunification with Taiwan within this decade, fundamentally reshaping the global order.",
  status: "highly_speculative" as const,
  category: "policy" as const,
  // As of 3 November 2026: the US intelligence community's March 2026 threat
  // assessment judges China does not plan to invade in 2027; the PLA's
  // "Justice Mission 2025" drill (29-31 December 2025) rehearsed port
  // blockades and landings; Trump said on 14 May 2026, after his Beijing
  // summit, that a $14 billion arms package was "in abeyance".
  last_updated: "2026-11-03",
  imageUrl:
    "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=60",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "For years US officials named 2027 as the year Xi Jinping wanted his military ready to take Taiwan. In March 2026 the US intelligence community said Chinese leaders 'do not currently plan to execute an invasion of Taiwan in 2027', and have no fixed timeline. Three months earlier, China's largest drill of 2025 rehearsed blockading Taiwan's ports and landing troops on its east coast. The fight is over whether Beijing will judge the gamble worth taking before 2030, and whether the US would fight if it did.",
    confidence: 88,
    source:
      "Office of the Director of National Intelligence, Annual Threat Assessment of the U.S. Intelligence Community (March 2026), China-Taiwan section; Jamestown Foundation China Brief (K. Tristan Tang, 9 January 2026) on Justice Mission 2025",
    sourceUrl:
      "https://archive.dni.gov/files/ODNI/documents/assessments/ATA-2026-Unclassified-Report.pdf",
  },
  simple_case: [
    "The answer bears on how fast Taiwan, Japan and the US arm, on whether Washington trades arms sales for a deal with Beijing, and on the chips the world buys from Taiwan's factories.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Intent and timing (invade, blockade or wait?)
    // =========================================================================
    {
      id: "intent-and-timing",
      title: "Does Beijing Mean to Move This Decade?",
      short_summary:
        "China says unification is required by 2049 and has never renounced force. Its drills are getting closer and more realistic. But US intelligence judges it prefers to win without war, has no fixed timeline, and is not planning a 2027 invasion. The dispute is whether the drills are rehearsals for a decision already taken or pressure meant to make war unnecessary.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Beijing's own behaviour says it is not in a hurry. The US intelligence community's March 2026 assessment judges that Chinese leaders 'do not currently plan to execute an invasion of Taiwan in 2027, nor do they have a fixed timeline for achieving unification', and that China 'prefers to achieve unification without the use of force, if possible.' China's stated deadline is 2049, the centenary of the People's Republic, not 2030. Even CIA Director William Burns, who described Xi's 2027 readiness order in public, said it 'does not mean that he's decided to conduct an invasion in 2027, or any other year.' The drills are coercion: they punish Taiwanese politicians Beijing dislikes, test Taiwan's nerves, and rehearse a blockade that could squeeze the island without the cost of a landing. Justice Mission 2025, in December 2025, was broadly within the scale of earlier exercises.",
      proponent_rebuttal:
        "Plans can change faster than intelligence reports. The same March 2026 assessment says the PLA 'continues to develop military plans and capabilities' to take Taiwan by force if directed, and that at times it has 'increased the scope, size, and pace of operations around Taiwan.' Justice Mission 2025, over 29-31 December 2025, put 210 aircraft sorties and 48 ships around the island, set no-sail zones among the closest to Taiwan's coast on record, one reaching inside its territorial-sea baseline, and rehearsed seizing the Penghu islands and landing on the east coast from Type 075 assault ships. A force that practises the invasion every year can launch it with little warning. Xi has tied his legacy to unification, and he will weigh, in the assessment's own words, 'whether or not the U.S. will militarily intervene on Taiwan's behalf'; a Washington that treats arms sales as a bargaining chip could make that bet look better before 2030 than after.",
      crux: {
        id: "beijing-timeline-signals",
        title: "The Rehearsal-or-Pressure Test",
        question:
          "Are China's drills around Taiwan rehearsals for an invasion this decade, or pressure meant to make one unnecessary?",
        description:
          "Exercises that rehearse blockade and landing serve both purposes, so the drills alone do not reveal intent. What would separate them is preparation that only an invasion needs: stockpiles, mobilization, medical and blood reserves, requisitioned shipping and changes in Chinese financial exposure that a coercion campaign would not require.",
        methodology:
          "Track the indicators a real decision would leave: fuel, munitions and blood stockpiling in Fujian, mobilization of reservists and civilian roll-on/roll-off ferries, financial moves to shield Chinese assets from sanctions, and changes in the timing and duration of drills, against a baseline of the Joint Sword (2023-2024), Strait Thunder (2025) and Justice Mission (2025) exercises.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Warning indicators that only an invasion needs, such as blood and fuel stockpiling in Fujian, reservist call-ups, requisitioned civilian ferries and moves to shield Chinese assets abroad, tracked against the baseline of the 2023-2025 drills, alongside US intelligence judgments on Chinese intent.",
        },
        cost_to_verify:
          "High: the indicators are watched by intelligence services; public analysts see only part of them",
        falsification: {
          supporter_flip:
            "If drills kept their size and pattern through 2030 with no stockpiling, call-ups or ferry requisitions behind them, and US intelligence kept finding no plan or timeline, the case that Beijing means to invade this decade would weaken.",
          skeptic_flip:
            "If the PLA began stockpiling fuel, munitions and blood in Fujian, called up reservists or requisitioned civilian ferries for an exercise, or US intelligence reported a decision to use force, the reading of the drills as pressure alone would fail.",
          common_ground:
            "Both sides agree China says unification is required by 2049, has never renounced force, and has made its drills around Taiwan larger and closer since 2022, and that US intelligence judges it has no fixed timeline.",
          live_disagreement:
            "Whether the drills rehearse an invasion Beijing intends to launch before 2030, or are coercion meant to win without one, with a blockade as the likelier squeeze.",
        },
      },
      evidence: [
        {
          id: "odni-no-2027-plan",
          title: "US Intelligence (March 2026): China Does Not Currently Plan to Invade Taiwan in 2027",
          description:
            "The 2026 Annual Threat Assessment of the US intelligence community, using information available as of 14 March 2026, says: 'The IC assesses that Chinese leaders do not currently plan to execute an invasion of Taiwan in 2027, nor do they have a fixed timeline for achieving unification.' It judges that Beijing 'probably will continue seeking to set the conditions for eventual unification with Taiwan short of conflict' and 'prefers to achieve unification without the use of force, if possible,' while China publicly insists unification is required for 'national rejuvenation' by 2049.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "ODNI, Annual Threat Assessment of the U.S. Intelligence Community (March 2026), China-Taiwan section",
          sourceUrl:
            "https://archive.dni.gov/files/ODNI/documents/assessments/ATA-2026-Unclassified-Report.pdf",
          reasoning:
            "The most authoritative public statement of US intelligence on Chinese intent, and it speaks directly to the 2027 date. 'Do not currently plan' is a snapshot that a decision in Beijing could overturn, and the underlying evidence is classified, so replicability is low.",
        },
        {
          id: "justice-mission-2025",
          title: "Justice Mission 2025: 210 Sorties and 48 Ships Rehearsed Blockade, Penghu and East-Coast Landings (December 2025)",
          description:
            "Over 29-31 December 2025 the PLA's Eastern Theater Command ran 'Justice Mission 2025'. Taiwan's defence ministry counted 210 aircraft sorties and 48 naval vessels over three days. The exercise declared seven no-fly and no-sail zones, plus an unannounced eighth off eastern Taiwan, among the closest to Taiwan's main island on record; one reached inside the territorial-sea baseline off southern Taiwan. It rehearsed blockading key ports, seizing the Penghu islands after long-range strikes, and amphibious and air-assault landings on the east coast using a Type 075 assault-ship task force. Flights to Kinmen and Matsu were cancelled. Jamestown's analyst judged it broadly within earlier exercises in scale but more advanced in its invasion rehearsals.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Jamestown Foundation, China Brief Vol. 26 Issue 1 (K. Tristan Tang, 9 January 2026), using Taiwan Ministry of National Defense counts",
          sourceUrl: "https://jamestown.org/pla-justice-mission-2025-further-rehearses-taiwan-invasion-operations",
          reasoning:
            "Counted, mapped evidence that the PLA rehearses the specific steps of an invasion closer to the island than before. Rehearsal is not decision: the same drill serves coercion, and its scale matched earlier ones, so directness on intent is moderate.",
        },
        {
          id: "2027-centenary-directive",
          title: "Burns (2023): Xi Ordered the PLA to Be Ready to Take Taiwan by 2027",
          description:
            "Speaking at Georgetown University on 2 February 2023, CIA Director William Burns said the US knew 'as a matter of intelligence' that Xi Jinping had ordered the PLA to be ready to invade Taiwan by 2027, the PLA's centenary, adding that this 'does not mean that he's decided to conduct an invasion in 2027, or any other year.' In 2021 Admiral Philip Davidson, then head of US Indo-Pacific Command, had told the Senate he saw a threat 'in the next six years.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 3,
            directness: 5,
          },
          source: "CIA Director William Burns, remarks reported by Radio Free Asia (3 February 2023)",
          sourceUrl: "https://www.rfa.org/english/news/china/cia-taiwan-invasion-02032023160341.html",
          reasoning:
            "It establishes that Xi set a capability deadline, which is what makes this decade the window. Burns himself drew the line between readiness and decision, and the 2026 assessment found no plan for 2027, so it shows capability is being pursued on a schedule, not that an attack is.",
        },
        {
          id: "csis-blockade-wargame",
          title: "CSIS Ran 26 Blockade Wargames: Hardship for Taiwan, but Not a Low-Risk Option for Beijing (July 2025)",
          description:
            "In 'Lights Out? Wargaming a Chinese Blockade of Taiwan', Mark Cancian, Matthew Cancian and Eric Heginbotham ran 26 wargames across a wide range of scenarios. China 'could inflict serious hardships, particularly by targeting Taiwan's energy sector,' they found, but a blockade 'wouldn't be a low-risk, low-cost option for Beijing,' and 'any blockade creates escalatory pressures that are difficult to contain and could lead to a large-scale war.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source: "CSIS, 'Lights Out? Wargaming a Chinese Blockade of Taiwan' (Cancian, Cancian & Heginbotham, 31 July 2025)",
          sourceUrl: "https://www.csis.org/analysis/lights-out-wargaming-chinese-blockade-taiwan",
          reasoning:
            "It shows Beijing has a coercive option short of invasion that can hurt Taiwan badly, which is why many analysts expect pressure rather than a landing. Directness on 'invasion before 2030' is moderate: a blockade could also be the first stage of an invasion, and the authors stress it could escalate into one.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Can the PLA do it?
    // =========================================================================
    {
      id: "military-capability-window",
      title: "Can the PLA Take Taiwan?",
      short_summary:
        "China has the world's largest navy by ship count and rehearses landings every year. But it has not fought a contested amphibious landing since it lost at Kinmen in 1949, and US intelligence says Chinese officials themselves see an invasion as extremely hard with a high risk of failure. The dispute is whether the PLA can carry and supply enough troops across a defended strait.",
      image_url:
        "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Crossing the Taiwan Strait under fire would be among the hardest military operations ever attempted. China has not fought a contested amphibious landing since its failed assault on Kinmen in 1949. Taiwan has only about 14 beaches suitable for a landing, most backed by cliffs, mountains or cities, and weather limits the main crossing windows to around April and October. The PLA would need air control, sea control, and enough lift to land and supply hundreds of thousands of troops. US intelligence reports that 'Chinese officials recognize that an amphibious invasion of Taiwan would be extremely challenging and carry a high risk of failure, especially in the event of U.S. intervention.' A military whose own leaders judge the operation that risky is unlikely to try it while those doubts last.",
      proponent_rebuttal:
        "Capability is growing on a schedule. The Pentagon counts the PLA Navy as the world's largest by hull count, with more than 370 ships and submarines and a projected 435 by 2030. China has built Type 075 and 076 assault ships since 2019, trains with civilian roll-on/roll-off ferries that can carry vehicles, and has massed short-range missiles opposite Taiwan. US intelligence judges the PLA is making 'steady but uneven progress' on the capabilities it would need to seize Taiwan and defeat US intervention, and Justice Mission 2025 rehearsed the east-coast landing that Taiwan's geography was supposed to rule out. Kinmen in 1949 says little about a force that has spent decades preparing for this one task.",
      crux: {
        id: "amphibious-capacity-assessment",
        title: "The Sealift Test",
        question:
          "Does China have the sealift to carry and supply forces across a contested Taiwan Strait?",
        description:
          "Determine whether China's combined military and dual-use sealift can transport and sustain the forces needed for a contested crossing, and whether that capacity is growing fast enough to close the gap before 2030.",
        methodology:
          "Inventory PLA Navy amphibious ships (Type 071, 075 and 076) and requisitionable civilian roll-on/roll-off ferries, and estimate total first-wave troop and vehicle capacity. Compare against analysts' estimates of the force a contested landing and occupation needs, commonly put at 300,000 to over 1 million troops, and assess whether it can be sustained for a multi-week campaign under attack.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An inventory of PLA amphibious ships (Type 071, 075 and 076) and convertible civilian roll-on/roll-off ferries, with total first-wave troop and vehicle capacity set against analysts' estimates of the force a contested landing needs.",
        },
        cost_to_verify: "$5M (satellite imagery analysis + classified intelligence assessment)",
        falsification: {
          supporter_flip:
            "If an inventory of PLA amphibious ships and convertible civilian ferries showed first-wave capacity far below the roughly 300,000 troops analysts cite as the low end for a contested landing and occupation, capability would remain a binding constraint and an attempt this decade would look much less likely.",
          skeptic_flip:
            "If counts of the PLA Navy's 370+ ships, its Type 075/076 assault ships and dual-use roll-on/roll-off ferries showed sealift growing toward invasion scale on the 2027 timeline U.S. officials attribute to Xi, the buildup would look less defensive.",
          common_ground:
            "Both sides agree a contested Strait crossing would be among the most complex amphibious operations ever attempted, and that China has the world's largest navy by ship count.",
          live_disagreement:
            "Whether China's growing fleet and dual-use sealift can carry and sustain the hundreds of thousands of troops a contested landing needs, given Taiwan's roughly 14 usable beaches and weather windows around April and October.",
        },
      },
      evidence: [
        {
          id: "odni-invasion-high-risk",
          title: "US Intelligence (March 2026): Chinese Officials See an Invasion as 'Extremely Challenging' With 'a High Risk of Failure'",
          description:
            "The 2026 Annual Threat Assessment says 'Chinese officials recognize that an amphibious invasion of Taiwan would be extremely challenging and carry a high risk of failure, especially in the event of U.S. intervention.' It also judges that the PLA 'probably is making steady but uneven progress on capabilities that it would use in any attempt to seize Taiwan and deter—and, if necessary, defeat—U.S. military intervention.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 5,
            directness: 8,
          },
          source: "ODNI, Annual Threat Assessment of the U.S. Intelligence Community (March 2026), China-Taiwan section",
          sourceUrl:
            "https://archive.dni.gov/files/ODNI/documents/assessments/ATA-2026-Unclassified-Report.pdf",
          reasoning:
            "It reports what Chinese decision-makers themselves believe, which bears directly on whether they would try. The same sentence ties the risk to US intervention, so the judgment could change if Beijing came to doubt the US would fight, and its basis is classified.",
        },
        {
          id: "no-amphibious-experience",
          title: "China Has Not Fought a Contested Amphibious Landing Since Kinmen in 1949",
          description:
            "China has not conducted a contested amphibious operation since its failed assault on Kinmen (Quemoy) in 1949. Analysts widely judge a Taiwan Strait crossing would be among the most complex amphibious operations ever attempted, larger and harder than the Normandy landings.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "CSIS, 'The First Battle of the Next War' (Cancian et al., 2023)",
          sourceUrl: "https://www.csis.org/analysis/first-battle-next-war-wargaming-chinese-invasion-taiwan",
          reasoning:
            "The 1949 defeat is documented history, and doctrine treats an opposed amphibious assault as the hardest form of warfare. Lack of combat experience is a real handicap, but every modern military's first war starts without it, so directness is moderate.",
        },
        {
          id: "taiwan-fortification",
          title: "Easton: Taiwan Has About 14 Usable Landing Beaches and Two Main Weather Windows",
          description:
            "Taiwan has only about 14 beaches suitable for an amphibious landing, most bordered by mountains, cliffs or dense urban terrain, and weather and sea state limit major crossing windows to roughly April and October.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Ian Easton, The Chinese Invasion Threat (Project 2049 Institute, 2017), as cited in The Diplomat (2021)",
          sourceUrl: "https://thediplomat.com/2021/05/why-a-taiwan-invasion-would-look-nothing-like-d-day/",
          reasoning:
            "Geography is durable, but the beach count and windows are one analyst's estimates rather than official data, and Justice Mission 2025's east-coast rehearsal suggests the PLA is planning around them.",
        },
        {
          id: "pla-navy-expansion",
          title: "Pentagon: The PLA Navy Is the World's Largest, With 370+ Ships and 435 Projected by 2030",
          description:
            "The Pentagon's 2024 China Military Power Report assesses the PLA Navy as the world's largest by hull count, with a battle force of over 370 ships and submarines, projected to reach about 395 by 2025 and 435 by 2030.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "US DoD, Military and Security Developments Involving the PRC 2024 (annual report to Congress)",
          sourceUrl:
            "https://media.defense.gov/2024/Dec/18/2003615520/-1/-1/0/MILITARY-AND-SECURITY-DEVELOPMENTS-INVOLVING-THE-PEOPLES-REPUBLIC-OF-CHINA-2024.PDF",
          reasoning:
            "Hull counts are verifiable by satellite, but they measure quantity, not amphibious lift or quality; the US Navy keeps advantages in tonnage, carriers and submarines. Fleet size shows growing capacity, not intent.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Would the economic cost stop it?
    // =========================================================================
    {
      id: "economic-interdependence-deterrent",
      title: "Would the Economic Cost Stop It?",
      short_summary:
        "A war over Taiwan would put trillions of dollars of trade at risk and could wreck the chip factories that make Taiwan valuable. Russia invaded Ukraine anyway, despite its gas trade with Europe. The dispute is whether China's far larger exposure deters it, or whether Beijing is sanctions-proofing itself to pay the price.",
      image_url:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Economic interdependence makes invasion irrational. China runs roughly $6 trillion a year in goods trade, much of it with countries that would impose severe sanctions, and an Atlantic Council and Rhodium Group study estimates a Taiwan-crisis sanctions regime could put on the order of $3 trillion in trade and financial flows at immediate risk. China imports much of its oil by sea through chokepoints the US Navy could close. TSMC's then-chairman said in 2022 that an invasion would leave its factories 'not operable', destroying much of the prize. US intelligence warns a protracted war 'risks unprecedented economic costs to the U.S., Chinese, and global economies'. An economic shock on that scale would threaten the Communist Party's hold at home more than Taiwan's status does.",
      proponent_rebuttal:
        "The theory that trade prevents war failed in 2022: Russia supplied about 45% of the EU's gas imports and invaded Ukraine anyway. Xi has put 'national rejuvenation' above growth and has spent a decade cutting China's exposure: stockpiling commodities, building overland energy links, pushing chip self-sufficiency under the 'dual circulation' strategy, and building its own payment system. Beijing may judge short-term pain acceptable for the permanent gain of controlling Taiwan, especially if the global trading order is fragmenting anyway. Authoritarian governments can absorb economic pain that democracies cannot, and the costs would fall on Taiwan's partners too.",
      crux: {
        id: "sanctions-resilience-test",
        title: "The Sanctions Resilience Test",
        question: "Could China's economy withstand five or more years of comprehensive Western sanctions?",
        description:
          "Evaluate whether China has built enough self-sufficiency and sanctions-proofing to withstand a comprehensive Western sanctions regime lasting five years or more, which is what a decision to invade would have to assume.",
        methodology:
          "Map China's import dependencies across critical sectors (energy, food, semiconductors, industrial components). Assess stockpile levels and domestic substitution capacity. Model the GDP effect of a SWIFT cut-off and G7 trade embargo. Compare against Russia's record under sanctions, and assess how ready China's alternative payment systems are.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A map of China's import dependencies in energy, food, semiconductors and industrial components, with stockpiles and domestic substitutes, modelled against a G7 embargo and SWIFT cut-off and compared with Russia's record under sanctions.",
        },
        cost_to_verify: "$2M (economic modeling + supply chain analysis)",
        falsification: {
          supporter_flip:
            "If mapping China's dependencies in energy, food, semiconductors and industrial components showed stockpiles and substitutes far too thin to survive a G7 embargo and SWIFT cut-off for 5+ years, economic self-interest would stand as a strong brake on an attempt this decade.",
          skeptic_flip:
            "If China's 'dual circulation' push (stockpiles, overland energy links, domestic chipmaking, the CIPS payment system) measurably cut its exposure to sanctions, economic deterrence would look weak, much as supplying ~45% of EU gas imports did not stop Russia invading Ukraine in 2022.",
          common_ground:
            "Both sides agree an invasion would bring enormous economic costs, on the order of $3 trillion in trade and financial flows at immediate risk by one estimate, and that China is working to reduce its exposure to sanctions.",
          live_disagreement:
            "Whether sanctions-proofing lets China absorb years of Western sanctions for a strategic prize, as Russia chose to, or whether its far larger trade exposure and the likely loss of TSMC's fabs make invasion irrational.",
        },
      },
      evidence: [
        {
          id: "trade-dependency-scale",
          title: "Atlantic Council and Rhodium: About $3 Trillion in Trade and Financial Flows at Risk in a Taiwan Crisis",
          description:
            "A Taiwan-crisis sanctions regime could put at immediate risk on the order of $3 trillion in trade and financial flows, per an Atlantic Council and Rhodium Group study, with separate Rhodium work estimating over $2 trillion in global activity disrupted by a blockade. China's trade integration is far larger than Russia's was before 2022, which makes it more exposed to such measures.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Atlantic Council GeoEconomics Center & Rhodium Group, 'Sanctioning China in a Taiwan Crisis' (2023); Rhodium, 'Global Economic Disruptions from a Taiwan Conflict'",
          sourceUrl:
            "https://www.atlanticcouncil.org/in-depth-research-reports/report/sanctioning-china-in-a-taiwan-crisis-scenarios-and-risks/",
          reasoning:
            "The figures describe trade and financial flows at risk, not a measured GDP loss, and scenario modelling of this kind carries large uncertainty. It shows the scale of what China would put on the line, not whether its leaders would accept the loss.",
        },
        {
          id: "semiconductor-destruction-paradox",
          title: "TSMC's Chairman (2022): An Invasion Would Leave Its Factories 'Not Operable'",
          description:
            "TSMC's advanced fabs depend on continuous links to US, Japanese and European suppliers and on ultra-pure inputs. Then-chairman Mark Liu said in 2022 that a military invasion would render the factories 'not operable', undercutting the semiconductor prize an invader would seek. US intelligence notes that even without US involvement a conflict would disrupt tech supply chains at significant cost.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "TSMC Chairman Mark Liu, CNN interview (2022), reported by DatacenterDynamics",
          sourceUrl:
            "https://www.datacenterdynamics.com/en/news/tsmc-chairman-on-chinese-invasion-of-taiwan-nobody-can-control-tsmc-by-force/",
          reasoning:
            "The statement is directly sourced, but it comes from an interested party and supports a contested theory (the 'silicon shield'). Beijing's motive is political unification, not chips, so the loss of the fabs may weigh less in its calculation than in Western ones.",
        },
        {
          id: "russia-ukraine-precedent",
          title: "Russia Supplied About 45% of EU Gas Imports and Invaded Ukraine Anyway (2022)",
          description:
            "Russia invaded Ukraine in 2022 despite supplying about 45% of EU gas imports in 2021, undercutting the 'commercial peace' thesis that deep economic ties reliably deter great-power aggression.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source: "European Parliament Research Service, briefing on the economic impact of Russia's war on Ukraine (2024)",
          sourceUrl:
            "https://www.europarl.europa.eu/RegData/etudes/BRIE/2024/757783/EPRS_BRI(2024)757783_EN.pdf",
          reasoning:
            "A recent, documented case of a state accepting huge economic costs for territory. The analogy is imperfect: China's trade stakes are far larger and an amphibious war is far harder than a land invasion, so directness is moderate.",
        },
        {
          id: "china-self-sufficiency-drive",
          title: "China's 'Dual Circulation' Plan Targets Self-Reliance in Chips and Supply Chains",
          description:
            "China's 'dual circulation' strategy, enshrined in the 14th Five-Year Plan (2021-2025), prioritizes domestic supply chains and makes semiconductors a strategic priority. China has also expanded overland energy links and commodity stockpiling to reduce its maritime exposure.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source: "Congressional Research Service, 'China's 14th Five-Year Plan: A First Look' (IF11684)",
          sourceUrl: "https://www.congress.gov/crs-product/IF11684",
          reasoning:
            "The self-reliance goals are official and verifiable. Hedging against sanctions is prudent for any rival of the US and does not by itself indicate preparation for war, so directness is low.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Would the US and its allies fight?
    // =========================================================================
    {
      id: "us-deterrence-credibility",
      title: "Would the US and Its Allies Fight?",
      short_summary:
        "Beijing's biggest question is whether the US would intervene. Washington approved a record $11.1 billion of arms for Taiwan in December 2025, and Japan's prime minister called an attack on Taiwan a possible 'survival-threatening situation'. Then in May 2026 Trump called arms sales 'a very good negotiating chip' and put a $14 billion package on hold. The dispute is whether deterrence would survive a real crisis.",
      image_url:
        "https://images.unsplash.com/photo-1580309237429-661ea0e13f45?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Deterrence is holding, and it is getting stronger. In December 2025 the US notified Congress of eight arms packages for Taiwan worth an estimated $11.1 billion, the largest ever, including 82 HIMARS launchers and 420 ATACMS missiles, and Taiwan's government proposed a NT$1.25 trillion special defence budget. The US has added four bases in the Philippines, rotates Marines through Darwin, and will base submarines in Australia under AUKUS. In November 2025 Japan's prime minister Sanae Takaichi described a Chinese invasion of Taiwan as a 'survival threatening situation' for Japan, a phrase that can legally justify Japanese military action. CSIS's 2023 wargames found the US, Taiwan and Japan defeated the invasion in most runs. Beijing knows it would face a coalition, and its own officials, US intelligence says, tie the risk of failure to US intervention.",
      proponent_rebuttal:
        "No one in Beijing can count on that coalition, and Washington is making it harder to count on. After his May 2026 Beijing summit Trump called arms sales to Taiwan 'a very good negotiating chip' and said of a pending $14 billion package: 'I'm holding that in abeyance and it depends on China.' US policy has never committed to defend Taiwan; President Biden said four times the US would, and each time the White House said policy had not changed. Taiwan's own opposition lawmakers have rejected NT$145.7 billion of defence spending. Even in CSIS's winning runs the US lost about 2 aircraft carriers and 200-400 aircraft in three weeks. A leader who believes Washington might trade Taiwan for a deal, or flinch at those losses against a nuclear power, could decide the window is open.",
      crux: {
        id: "us-commitment-signal-analysis",
        title: "The Commitment Test",
        question: "Would US commitments to Taiwan hold up under the pressure of an actual crisis?",
        description:
          "Assess whether US military posture, arms deliveries, alliance commitments and political signals add up to a deterrent that would survive the decision pressure of a real Taiwan crisis, as Beijing would see it.",
        methodology:
          "Track arms notifications and deliveries to Taiwan, US force posture and basing in the Western Pacific, allied commitments (Japan, the Philippines, Australia), presidential statements, and Taiwan's own defence budgets, and compare stated commitments with follow-through in past crises. Use open-source wargames to estimate what intervention would cost.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Open-source wargame outcomes and US force posture in the Western Pacific, read alongside arms deliveries to Taiwan, allied commitments such as Japan's, and how far stated US commitments held in past crises such as Korea, the Gulf War and the Afghanistan withdrawal.",
        },
        cost_to_verify: "$10M (wargaming + polling + classified intelligence review)",
        falsification: {
          supporter_flip:
            "If arms packages were delivered on schedule, Japan and the Philippines widened their commitments, and US leaders stopped treating Taiwan's arms as a bargaining item, deterrence would make an attempt this decade far less likely.",
          skeptic_flip:
            "If the US traded arms sales to Taiwan for concessions from Beijing, Taiwan's legislature kept cutting defence budgets, and new wargames repeated CSIS's heavy US losses, trust in deterrence would weaken.",
          common_ground:
            "Both sides agree the Taiwan Relations Act obliges the US to supply defensive arms but not to intervene, that Beijing will weigh whether the US would fight, and that a US-China war over Taiwan would be enormously costly for both.",
          live_disagreement:
            "Whether record arms sales, new basing and Japan's stance add up to a deterrent Beijing must respect, or whether a president who calls arms sales a bargaining chip lets Beijing bet the US would stay out.",
        },
      },
      evidence: [
        {
          id: "trump-arms-negotiating-chip",
          title: "Trump (May 2026): Taiwan Arms Sales Are 'a Very Good Negotiating Chip'; $14 Billion Package 'in Abeyance'",
          description:
            "After his 13-15 May 2026 state visit to Beijing, President Trump described arms sales to Taiwan as 'a very good negotiating chip' and said of a pending US$14 billion package: 'I'm holding that in abeyance and it depends on China.' At the summit Xi warned that mishandling Taiwan could lead to 'conflict and confrontation' and push relations into 'a very dangerous situation'. Neither the White House nor China's readout recorded a substantive Trump response on Taiwan. Taiwanese scholar Lim Chuan-tiong argued that using Taiwan as a bargaining chip 'does not necessarily mean sacrificing it'.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Focus Taiwan / Central News Agency (19 May 2026)",
          sourceUrl: "https://focustaiwan.tw/politics/202605190009",
          reasoning:
            "A sitting president's own words tying Taiwan's arms to Beijing's behaviour are a direct signal to the leaders weighing US intervention. It is one statement, the package's fate is not settled on this map, and a bargaining posture is not a decision to stay out of a war.",
        },
        {
          id: "record-arms-package-2025",
          title: "US Notified a Record $11.1 Billion of Arms for Taiwan, Including 82 HIMARS (December 2025)",
          description:
            "On 17 December 2025 the US Defense Security Cooperation Agency announced eight arms packages for Taiwan, estimated at US$11.1 billion in total and notified to Congress after State Department approval, the largest set ever. They include HIMARS rocket systems (the HIMARS sale alone about $4.05 billion, for 82 launchers and 420 ATACMS missiles), M109A7 howitzers, TOW 2B and Javelin anti-tank missiles and anti-armour drones. Five of the packages fall under the NT$1.25 trillion (about US$40 billion) special defence budget Taiwan's government proposed in November 2025 for 2026-2033, pending its legislature.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "ANI via ThePrint (18 December 2025), citing the DSCA, Focus Taiwan and Taiwan's Ministry of National Defense",
          sourceUrl:
            "https://theprint.in/world/us-approves-largest-ever-arms-package-worth-11-1-billion-for-taiwan/2808122",
          reasoning:
            "Concrete, notified sales are a stronger signal than words, and these are the weapons suited to defeating a landing. Notification is not delivery: Taiwan already waits years for earlier orders, and the special budget still needs Taiwan's opposition-led legislature.",
        },
        {
          id: "japan-takaichi-survival-threat",
          title: "Japan's Prime Minister Called a Chinese Invasion of Taiwan a Possible 'Survival Threatening Situation' (November 2025)",
          description:
            "US intelligence reports that China-Japan tensions 'increased significantly in November 2025 following comments made by Japanese Prime Minister Takaichi describing a potential Chinese invasion of Taiwan as a \"survival threatening situation\" for Japan.' The phrase is a possible legal basis for military action under Japan's 2015 security legislation, and the assessment calls the comments 'a significant shift for a sitting Japanese prime minister.' China answered with flight and cultural cancellations and a renewed ban on Japanese seafood, coercion the assessment expects to intensify through 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "ODNI, Annual Threat Assessment of the U.S. Intelligence Community (March 2026), China-East Asia section",
          sourceUrl:
            "https://archive.dni.gov/files/ODNI/documents/assessments/ATA-2026-Unclassified-Report.pdf",
          reasoning:
            "It shows a key ally signalling it could join a defence of Taiwan, which raises the cost Beijing must expect. A prime minister's remark is not a treaty commitment, and Beijing's punishment of Japan is meant to deter exactly such statements.",
        },
        {
          id: "wargame-heavy-losses",
          title: "CSIS (2023): Invasion Usually Defeated, but the US Lost About 2 Carriers and 200-400 Aircraft in Three Weeks",
          description:
            "In CSIS's 2023 wargame, across the base scenarios the US typically lost about 2 aircraft carriers, 10-20 major surface combatants and 200-400 aircraft within roughly three weeks, while in most runs the US, Taiwan and Japan still repelled the invasion at high cost.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "CSIS, 'The First Battle of the Next War' (Cancian, Cancian & Heginbotham, 2023)",
          sourceUrl: "https://www.csis.org/analysis/first-battle-next-war-wargaming-chinese-invasion-taiwan",
          reasoning:
            "Projected losses on that scale could make a US president hesitate, which is what Beijing would bet on. The same wargame shows the invasion usually failing, so the evidence cuts both ways.",
        },
        {
          id: "biden-taiwan-statements",
          title: "Biden Said Four Times the US Would Defend Taiwan; Each Time Officials Said Policy Was Unchanged",
          description:
            "President Biden stated on at least four occasions in 2021-2022 that the US would defend Taiwan militarily, appearing to move beyond strategic ambiguity, though each time the White House clarified that official policy was unchanged.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 4,
          },
          source:
            "Biden public remarks 2021-2022 (Stephanopoulos interview, Kishida press conference, 60 Minutes), with White House clarifications",
          sourceUrl: "https://abcnews.go.com/Politics/biden-us-defend-taiwan-chinese-invasion/story?id=90184808",
          reasoning:
            "The statements and walk-backs are documented. They came from a previous president; with official policy unchanged and the current president treating arms as a bargaining item, they are a weaker signal today, so directness is low.",
        },
        {
          id: "pacific-force-buildup",
          title: "US Added Four Philippine Bases, Darwin Marines and AUKUS Submarine Rotations",
          description:
            "The US has expanded its Marine rotational force in Darwin, signed AUKUS (including a submarine rotational presence in Australia from 2027), secured four additional EDCA sites in the Philippines (2023), and conducts regular Taiwan Strait transits.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 5,
          },
          source: "Congressional Research Service, 'U.S. Defense Infrastructure in the Indo-Pacific' (R47589)",
          sourceUrl: "https://www.congress.gov/crs-product/R47589",
          reasoning:
            "Basing agreements are concrete and harder to reverse than words. They serve general Indo-Pacific positioning and do not by themselves commit the US to fight for Taiwan.",
        },
        {
          id: "taiwan-defense-budget-cut",
          title: "Taiwan's Opposition Lawmakers Rejected NT$145.7 Billion of Defence Spending",
          description:
            "Central News Agency reported on 3 November 2026 that a Cabinet funding request of NT$607.6 billion (US$18.51 billion), including NT$55.9 billion for coastal attack and reconnaissance drones and small one-way unmanned boats and NT$13 billion for a package including a midcourse anti-ballistic missile system, had advanced to committee review. The request follows defence spending of NT$145.7 billion that opposition lawmakers had rejected earlier.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source: "Focus Taiwan / Central News Agency (3 November 2026)",
          sourceUrl: "https://focustaiwan.tw/politics/202611030026",
          reasoning:
            "Taiwan's own willingness to pay for its defence is one of the signals Beijing and Washington both watch, and the cuts show it is contested at home. The government is trying to restore the money, and budget fights in a democracy are not a sign of surrender, so directness on invasion likelihood is low.",
        },
      ],
    },
  ],
  references: [
    {
      title: "ODNI: Annual Threat Assessment of the U.S. Intelligence Community (March 2026)",
      url: "https://archive.dni.gov/files/ODNI/documents/assessments/ATA-2026-Unclassified-Report.pdf",
    },
    {
      title: "Jamestown Foundation: PLA 'Justice Mission 2025' Further Rehearses Taiwan Invasion Operations (January 2026)",
      url: "https://jamestown.org/pla-justice-mission-2025-further-rehearses-taiwan-invasion-operations",
    },
    {
      title: "CSIS: Lights Out? Wargaming a Chinese Blockade of Taiwan (July 2025)",
      url: "https://www.csis.org/analysis/lights-out-wargaming-chinese-blockade-taiwan",
    },
    {
      title: "CSIS: The First Battle of the Next War — Wargaming a Chinese Invasion of Taiwan (2023)",
      url: "https://www.csis.org/analysis/first-battle-next-war-wargaming-chinese-invasion-taiwan",
    },
    {
      title:
        "US Department of Defense: Military and Security Developments Involving the People's Republic of China (2024)",
      url: "https://media.defense.gov/2024/Dec/18/2003615520/-1/-1/0/MILITARY-AND-SECURITY-DEVELOPMENTS-INVOLVING-THE-PEOPLES-REPUBLIC-OF-CHINA-2024.PDF",
    },
    {
      title: "Brookings Institution: How serious is the risk of war over Taiwan? (Bush, Hass & Dollar, 2023)",
      url: "https://www.brookings.edu/articles/how-serious-is-the-risk-of-war-over-taiwan/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is 2027 the year China invades Taiwan?",
      content:
        "US officials say Xi Jinping told the PLA to be ready to take Taiwan by 2027, the PLA's centenary. In March 2026 US intelligence judged Chinese leaders do not currently plan an invasion in 2027 and have no fixed timeline, while the PLA keeps building the plans and forces to do it if ordered. Is 2027 a deadline, or a readiness target that says little about a decision?",
      imageUrl:
        "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "Radio Free Asia: CIA Director Burns on the 2027 PLA readiness timeline (Feb. 2023)",
          url: "https://www.rfa.org/english/news/china/cia-taiwan-invasion-02032023160341.html",
        },
      ],
    },
    {
      id: "q2",
      title: "Could a blockade replace an invasion?",
      content:
        "China's December 2025 'Justice Mission' drill rehearsed blockading Taiwan's ports, and CSIS's 26 blockade wargames found China could inflict serious hardship by targeting Taiwan's energy. But CSIS also found a blockade would not be low-risk or low-cost for Beijing and could escalate into a large war. Is a squeeze more likely than a landing, and would it stay a squeeze?",
      imageUrl:
        "https://images.unsplash.com/photo-1580309237429-661ea0e13f45?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Would the US really defend Taiwan?",
      content:
        "The US approved a record $11.1 billion of arms for Taiwan in December 2025. In May 2026 Trump called such sales 'a very good negotiating chip' and held a $14 billion package 'in abeyance'. The law obliges the US to sell Taiwan defensive arms, not to fight for it. Does that ambiguity deter Beijing, or invite it to bet the US will stay out?",
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
    },
  ],
} satisfies TopicInput;
