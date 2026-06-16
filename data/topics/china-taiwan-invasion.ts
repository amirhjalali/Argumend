import type { Topic } from "@/lib/schemas/topic";

export const chinaTaiwanInvasionData = {
  id: "china-taiwan-invasion",
  title: "Will China Invade Taiwan Before 2030?",
  meta_claim:
    "China will attempt military reunification with Taiwan within this decade, fundamentally reshaping the global order.",
  status: "highly_speculative" as const,
  category: "policy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title:
        "US Department of Defense: Military and Security Developments Involving the People's Republic of China (2023)",
      url: "https://media.defense.gov/2023/Oct/19/2003323409/-1/-1/1/2023-MILITARY-AND-SECURITY-DEVELOPMENTS-INVOLVING-THE-PEOPLES-REPUBLIC-OF-CHINA.PDF",
    },
    {
      title: "CSIS: The First Battle of the Next War — Wargaming a Chinese Invasion of Taiwan",
      url: "https://www.csis.org/analysis/first-battle-next-war-wargaming-chinese-invasion-taiwan",
    },
    {
      title:
        "Brookings Institution: How serious is the risk of war over Taiwan? (Bush, Hass & Dollar, 2023)",
      url: "https://www.brookings.edu/articles/how-serious-is-the-risk-of-war-over-taiwan/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "What is the 2027 centenary deadline theory?",
      content:
        "Xi Jinping reportedly instructed the PLA to be ready for a Taiwan contingency by 2027, the centenary of the People's Liberation Army. Does this represent an actual invasion timeline, or simply a military modernization benchmark?",
      imageUrl:
        "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title:
            "Radio Free Asia: CIA Director Burns on the 2027 PLA readiness timeline (Feb. 2023)",
          url: "https://www.rfa.org/english/news/china/cia-taiwan-invasion-02032023160341.html",
        },
      ],
    },
    {
      id: "q2",
      title: "Could a blockade replace an invasion?",
      content:
        "A full amphibious invasion would be enormously costly. Could China achieve reunification through a naval blockade, economic coercion, or 'gray zone' tactics that fall below the threshold of outright war?",
      imageUrl:
        "https://images.unsplash.com/photo-1580309237429-661ea0e13f45?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "What role do semiconductors play in this conflict?",
      content:
        "Taiwan produces over 90% of the world's most advanced semiconductors via TSMC. Would China risk destroying the very asset it seeks to control, and how does global chip dependency shape the calculus of all parties?",
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "military-capability-window",
      title: "Military Capability Window",
      short_summary:
        "Whether the PLA is building amphibious invasion capability on a specific timeline, and what the 2027 centenary theory actually implies.",
      image_url:
        "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=60",
      icon_name: "Target" as const,
      skeptic_premise:
        "China's military buildup is defensive and modernization-focused, not invasion-oriented. The PLA has never conducted a major amphibious operation, and the Taiwan Strait crossing would be the most complex military operation in history—requiring air superiority, naval dominance, and landing hundreds of thousands of troops on heavily fortified beaches. China's shipbuilding surge includes civilian vessels and coast guard ships, not purpose-built amphibious assault craft at the scale an invasion demands. The 2027 date is a readiness benchmark, not an invasion deadline.",
      proponent_rebuttal:
        "China's military spending has grown rapidly for decades, and the PLA Navy is now the world's largest fleet by hull count. China has built several large amphibious assault ships (Type 075/076) since 2019 and is expanding its sealift capacity through dual-use civilian roll-on/roll-off ferries. The PLA Rocket Force has deployed large numbers of short-range ballistic missiles opposite Taiwan. Xi Jinping has explicitly tied his legacy to reunification, and U.S. officials say he directed the PLA to be capable of taking Taiwan by 2027—the 'Davidson window.' Crucially, those same officials frame 2027 as a readiness benchmark, not a decision to invade; the point is that capability would no longer be the binding constraint. Furthermore, China's demographic decline means its military-age population peaks this decade, so on a capabilities timeline the window may be closing rather than opening.",
      crux: {
        id: "amphibious-capacity-assessment",
        title: "PLA Amphibious Sealift Capacity Assessment",
        description:
          "Determine whether China's combined military and dual-use sealift capacity is sufficient to transport and sustain the forces needed for a contested Taiwan Strait crossing.",
        methodology:
          "Inventory all PLA Navy amphibious vessels (Type 071, 075, 076 classes). Catalog requisitioned civilian RO-RO ferries and their military conversion status. Estimate total first-wave troop and vehicle capacity. Compare against defense analyst estimates of force requirements (commonly cited at roughly 300,000 to 1 million-plus troops for a contested amphibious landing and follow-on occupation). Assess logistics sustainability for a multi-week campaign.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5M (satellite imagery analysis + classified intelligence assessment)",
      },
      evidence: [
        {
          id: "pla-navy-expansion",
          title: "PLA Navy Is Now the World's Largest Fleet",
          description:
            "The Pentagon's 2024 China Military Power Report assesses the PLA Navy as the world's largest by hull count, with a battle force of over 370 ships and submarines, projected to reach ~395 by 2025 and 435 by 2030.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "US DoD, Military and Security Developments Involving the PRC 2024 (annual report to Congress)",
          sourceUrl:
            "https://media.defense.gov/2024/Dec/18/2003615520/-1/-1/0/MILITARY-AND-SECURITY-DEVELOPMENTS-INVOLVING-THE-PEOPLES-REPUBLIC-OF-CHINA-2024.PDF",
          reasoning:
            "Hull count is verifiable via satellite imagery, but the official figure measures battle-force quantity, not tonnage or capability; the U.S. Navy retains advantages in tonnage, carriers, and blue-water reach. Directness lowered because fleet size alone does not establish amphibious-invasion intent.",
        },
        {
          id: "2027-centenary-directive",
          title: "Xi's 2027 PLA Readiness Directive",
          description:
            "Multiple U.S. intelligence officials have stated that Xi Jinping directed the PLA to develop the capability to take Taiwan by 2027, the PLA's centenary.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 3,
            directness: 6,
          },
          source:
            "CIA Director William Burns (Feb. 2023 remarks, reported by Radio Free Asia) and INDOPACOM Commander Adm. John Aquilino (2024 congressional testimony)",
          sourceUrl:
            "https://www.rfa.org/english/news/china/cia-taiwan-invasion-02032023160341.html",
          reasoning:
            "Based on U.S. intelligence assessments, not public statements from China. Burns himself stressed this is a directive on military capability, NOT a decision to invade; a March 2026 U.S. intelligence assessment likewise concluded China is not committed to a 2027 invasion. Replicability and independence kept low because multiple U.S. officials may draw on the same underlying intelligence and the date is contested.",
        },
        {
          id: "no-amphibious-experience",
          title: "PLA Has Zero Modern Amphibious Combat Experience",
          description:
            "China has not conducted a contested amphibious operation since the failed assault on Kinmen (Quemoy) in 1949. Analysts widely judge a Taiwan Strait crossing would be among the most complex amphibious operations ever attempted, larger and harder than the Normandy landings.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "CSIS, 'The First Battle of the Next War' (Cancian et al., 2023)",
          sourceUrl:
            "https://www.csis.org/analysis/first-battle-next-war-wargaming-chinese-invasion-taiwan",
          reasoning:
            "The 1949 Kinmen defeat is documented historical fact, and military doctrine treats opposed amphibious assault as the hardest form of warfare. The 'dwarfing D-Day' framing is softened to 'among the most complex / larger than Normandy' since direct size comparisons are analytic judgments, not settled fact; directness lowered accordingly.",
        },
        {
          id: "taiwan-fortification",
          title: "Taiwan's Geographic and Defensive Advantages",
          description:
            "Taiwan has only about 14 beaches suitable for an amphibious landing, most bordered by mountains, cliffs, or dense urban terrain, and weather/sea-state limits major crossing windows to roughly April and October.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Ian Easton, The Chinese Invasion Threat (Project 2049 Institute, 2017), as cited in widely reported analyses",
          sourceUrl:
            "https://thediplomat.com/2021/05/why-a-taiwan-invasion-would-look-nothing-like-d-day/",
          reasoning:
            "The '14 beaches' and 'April/October only' figures originate with Ian Easton's research, not the CSIS wargame, so attribution is corrected. Geographic constraints are durable, but the precise beach count and seasonal window are analyst estimates rather than official data, so reliability/replicability are set just below maximum.",
        },
      ],
    },
    {
      id: "economic-interdependence-deterrent",
      title: "Economic Interdependence as Deterrent",
      short_summary:
        "Whether the massive economic costs of an invasion—sanctions, trade disruption, and semiconductor supply destruction—would deter China from military action.",
      image_url:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Economic interdependence makes invasion irrational. China runs roughly $6 trillion in annual goods trade, much of it with nations that would impose severe sanctions, and an Atlantic Council/Rhodium study estimates a Taiwan-crisis sanctions regime could put on the order of $3 trillion in trade and financial flows at immediate risk. A Taiwan conflict could trigger sanctions exceeding those imposed on Russia, and China imports a large share of its oil by sea through chokepoints the U.S. Navy could interdict. TSMC's then-chairman argued in 2022 that an invasion would render the fabs 'not operable,' eliminating much of the semiconductor prize. The resulting economic shock could threaten CCP domestic legitimacy far more than the Taiwan issue itself.",
      proponent_rebuttal:
        "The 'economic interdependence prevents war' thesis failed spectacularly with Russia's invasion of Ukraine in 2022—Russia was deeply integrated into European energy markets yet invaded anyway. Xi has explicitly prioritized 'national rejuvenation' over economic growth and has been systematically reducing China's vulnerabilities: stockpiling commodities, building overland energy pipelines, developing domestic semiconductor capacity (though still far behind), and creating alternative financial systems (CIPS). China's leadership may calculate that short-term economic pain is acceptable for the permanent strategic gain of controlling Taiwan, especially if they believe the economic order is already fragmenting. Authoritarian regimes can absorb economic pain that democracies cannot.",
      crux: {
        id: "sanctions-resilience-test",
        title: "China Sanctions Resilience Assessment",
        description:
          "Evaluate whether China has built sufficient economic self-sufficiency and sanctions-proofing to withstand a comprehensive Western sanctions regime lasting 5+ years.",
        methodology:
          "Map China's import dependencies across critical sectors (energy, food, semiconductors, industrial components). Assess stockpile levels and domestic substitution capacity. Model GDP impact of full SWIFT disconnection and trade embargo by G7 nations. Compare against Russia's sanctions resilience as a baseline. Evaluate China's alternative financial infrastructure (CIPS, digital yuan) readiness.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2M (economic modeling + supply chain analysis)",
      },
      evidence: [
        {
          id: "russia-ukraine-precedent",
          title: "Russia-Ukraine Precedent: Economic Ties Did Not Prevent War",
          description:
            "Russia invaded Ukraine in 2022 despite supplying ~45% of EU gas imports in 2021, undercutting the liberal 'commercial peace' thesis that deep economic interdependence reliably deters great-power aggression.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "European Parliament research on the economic impact of Russia's war on Ukraine; commercial-peace-theory analyses",
          sourceUrl:
            "https://www.europarl.europa.eu/RegData/etudes/BRIE/2024/757783/EPRS_BRI(2024)757783_EN.pdf",
          reasoning:
            "Direct, well-documented historical precedent. Analogy is imperfect: China-Taiwan involves far greater economic stakes and a vastly harder amphibious-military problem than Russia-Ukraine, so directness is kept moderate.",
        },
        {
          id: "china-self-sufficiency-drive",
          title: "China's 'Dual Circulation' Self-Sufficiency Campaign",
          description:
            "China's 'dual circulation' strategy, enshrined in the 14th Five-Year Plan (2021-2025), prioritizes domestic supply chains and names semiconductors a strategic priority, targeting ~50% self-sufficiency in chipmaking. China has also expanded overland energy links and commodity stockpiling to reduce maritime exposure.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source:
            "Congressional Research Service, 'China's 14th Five-Year Plan: A First Look' (IF11684)",
          sourceUrl: "https://www.congress.gov/crs-product/IF11684",
          reasoning:
            "The dual-circulation and semiconductor self-reliance goals are official and verifiable. The stockpiling/pipeline elements are general strategic hedging not explicitly tied to the Plan, so the broader claim is de-inflated and directness kept very low: self-sufficiency efforts do not by themselves indicate invasion preparation.",
        },
        {
          id: "semiconductor-destruction-paradox",
          title: "TSMC Fabs Would Be Destroyed in a Conflict",
          description:
            "TSMC's advanced fabs depend on continuous real-time links to Western, Japanese, and U.S. suppliers and ultra-pure inputs. Then-chairman Mark Liu said in 2022 that a military invasion would render the factories 'not operable,' undercutting the semiconductor prize an invader would seek.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "TSMC Chairman Mark Liu, CNN interview, 2022 ('silicon shield' argument)",
          sourceUrl:
            "https://www.datacenterdynamics.com/en/news/tsmc-chairman-on-chinese-invasion-of-taiwan-nobody-can-control-tsmc-by-force/",
          reasoning:
            "Liu's 'not operable' statement is directly sourced. But it is an interested party's assertion and a contested strategic theory ('silicon shield'), not an independently verified engineering fact, so reliability/independence are lowered from the prior overstated levels.",
        },
        {
          id: "trade-dependency-scale",
          title: "China's Trade Exposure Far Exceeds Russia's Pre-Invasion Position",
          description:
            "A Taiwan-crisis sanctions regime could put at immediate risk on the order of $3 trillion in trade and financial flows, per an Atlantic Council/Rhodium Group study, with separate Rhodium work estimating over $2 trillion in global activity disrupted by a blockade. China's far larger trade integration than Russia's makes it more, not less, exposed to such measures.",
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
            "Corrected: the prior '10-25% GDP crash' figure and the specific '$3.6T trade / $3.2T assets' numbers were not supported by the cited sources and have been removed. The sourced figures describe trade/financial flows at risk (~$3T), not a precise GDP-loss percentage; such scenario modeling carries large uncertainty, so replicability and directness are de-inflated.",
        },
      ],
    },
    {
      id: "us-deterrence-credibility",
      title: "US Deterrence Credibility",
      short_summary:
        "Whether the United States would actually intervene militarily to defend Taiwan, and whether strategic ambiguity strengthens or weakens deterrence.",
      image_url:
        "https://images.unsplash.com/photo-1580309237429-661ea0e13f45?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "U.S. deterrence is credible and has kept the peace for 75 years. The Taiwan Relations Act obligates the U.S. to provide Taiwan with defensive arms, and multiple presidents (including Biden on four occasions) have stated the U.S. would defend Taiwan. The U.S. maintains the world's most powerful military with extensive Pacific basing and alliance networks. AUKUS, the Quad, and strengthened alliances with Japan, the Philippines, and South Korea create a formidable deterrent coalition. China knows that a failed invasion or a conflict with the U.S. would be catastrophic for the CCP's legitimacy.",
      proponent_rebuttal:
        "Strategic ambiguity is deliberately vague—the U.S. has never formally committed to Taiwan's defense, and the Taiwan Relations Act does not require military intervention. The U.S. abandoned Afghanistan after 20 years and has shown inconsistent commitment to allies. American public appetite for a major war with a nuclear-armed power over an island 7,000 miles away is highly uncertain. The U.S. military's own wargames show heavy losses in a Taiwan scenario, including potentially multiple aircraft carriers. China may calculate that the U.S. will ultimately choose self-preservation over Taiwan, especially if China can present a fait accompli before American forces can fully mobilize. Nuclear escalation risks further complicate the U.S. decision calculus.",
      crux: {
        id: "us-commitment-signal-analysis",
        title: "U.S. Commitment Credibility Signal Analysis",
        description:
          "Assess whether U.S. military posture, alliance commitments, and political signals constitute a credible deterrent that would survive the decision pressure of an actual Taiwan crisis.",
        methodology:
          "Analyze U.S. force deployments and pre-positioning in the Western Pacific. Review classified and open-source wargame outcomes. Survey Congressional authorization likelihood under various scenarios. Model decision dynamics under nuclear escalation risk. Compare stated commitments against historical follow-through in analogous crises (Korean War, Gulf War, Afghanistan withdrawal).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10M (wargaming + polling + classified intelligence review)",
      },
      evidence: [
        {
          id: "biden-taiwan-statements",
          title: "Multiple Presidential Statements of Defense Commitment",
          description:
            "President Biden stated on at least four separate occasions (2021-2022) that the U.S. would defend Taiwan militarily, appearing to move beyond strategic ambiguity, though each time the White House clarified that official policy was unchanged.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "Biden public remarks 2021-2022 (Stephanopoulos interview, Kishida presser, Sept. 2022, 60 Minutes), with subsequent White House clarifications",
          sourceUrl:
            "https://abcnews.go.com/Politics/biden-us-defend-taiwan-chinese-invasion/story?id=90184808",
          reasoning:
            "The four statements and the repeated walkbacks are well-documented; Biden himself said the policy 'has not changed.' This ambiguity means the statements are a weaker deterrence signal than they first appear, so directness is lowered. Scored 'against' invasion likelihood since credible deterrence reduces invasion probability.",
        },
        {
          id: "pacific-force-buildup",
          title: "U.S. Pacific Military Buildup and Alliance Strengthening",
          description:
            "The U.S. has expanded its Marine Rotational Force in Darwin, signed AUKUS (including a future submarine rotational presence in Australia from 2027), secured four additional EDCA basing sites in the Philippines (2023), and conducts regular Taiwan Strait transits.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 6,
          },
          source:
            "Congressional Research Service, 'U.S. Defense Infrastructure in the Indo-Pacific' (R47589)",
          sourceUrl: "https://www.congress.gov/crs-product/R47589",
          reasoning:
            "These deployments and basing agreements are concrete, publicly documented signals, more credible than verbal commitments. Directness lowered because posture improvements are general Indo-Pacific positioning and do not, by themselves, prove a binding commitment to fight for Taiwan.",
        },
        {
          id: "wargame-heavy-losses",
          title: "U.S. Wargames Project Heavy Losses in Taiwan Scenarios",
          description:
            "In CSIS's 2023 wargame, across the base scenarios the U.S. typically lost about 2 aircraft carriers, 10-20 major surface combatants, and 200-400 aircraft within roughly three weeks—while still, in most runs, repelling the invasion at high cost.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "CSIS, 'The First Battle of the Next War' (Cancian, Cancian & Heginbotham, 2023)",
          sourceUrl:
            "https://www.csis.org/analysis/first-battle-next-war-wargaming-chinese-invasion-taiwan",
          reasoning:
            "Loss figures (2 carriers, 10-20 surface ships, 200-400 aircraft over ~3 weeks) match the CSIS report. Projected heavy losses could deter U.S. intervention, but the same wargame shows the U.S./Taiwan/Japan usually defeating the invasion—so the evidence cuts both ways, and directness toward higher invasion likelihood is moderate.",
        },
        {
          id: "afghanistan-credibility-gap",
          title: "Afghanistan Withdrawal Raised Allied Credibility Concerns",
          description:
            "The chaotic August 2021 U.S. withdrawal from Afghanistan prompted commentary—from allies, adversaries, and U.S. analysts alike—questioning American staying power, though officials argued it freed resources to focus on the Indo-Pacific.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 3,
          },
          source:
            "Congressional Research Service, 'U.S. Military Withdrawal and Taliban Takeover in Afghanistan: Frequently Asked Questions' (R46879)",
          sourceUrl: "https://www.congress.gov/crs-product/R46879",
          reasoning:
            "The withdrawal is documented fact, but its bearing on Taiwan is an inferential, contested narrative—Taiwan is a far higher strategic priority and the alliance context differs entirely. Weights de-inflated: this is interpretive credibility signaling, not direct evidence about invasion likelihood, hence very low directness.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
