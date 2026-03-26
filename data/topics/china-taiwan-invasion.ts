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
        "Brookings Institution: How to Prevent a War Over Taiwan",
      url: "https://www.brookings.edu/articles/how-to-prevent-a-war-over-taiwan/",
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
          title: "CIA Director Burns on the 2027 Timeline",
          url: "https://www.cbsnews.com/news/cia-director-william-burns-china-taiwan-2027/",
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
        "China's military spending has grown at double-digit rates for decades, and the PLA Navy is now the world's largest fleet by hull count. China has built six large amphibious assault ships (Type 075/076) since 2019 and is rapidly expanding its sealift capacity through dual-use civilian roll-on/roll-off ferries. The PLA Rocket Force has deployed over 1,500 short-range ballistic missiles opposite Taiwan. Xi Jinping has explicitly tied his legacy to reunification and told the PLA to be 'ready' by 2027. U.S. intelligence assessments from multiple directors consistently cite this window. Furthermore, China's demographic decline means its military-age population peaks this decade—the capability window may be closing, not opening.",
      crux: {
        id: "amphibious-capacity-assessment",
        title: "PLA Amphibious Sealift Capacity Assessment",
        description:
          "Determine whether China's combined military and dual-use sealift capacity is sufficient to transport and sustain the forces needed for a contested Taiwan Strait crossing.",
        methodology:
          "Inventory all PLA Navy amphibious vessels (Type 071, 075, 076 classes). Catalog requisitioned civilian RO-RO ferries and their military conversion status. Estimate total first-wave troop and vehicle capacity. Compare against defense analyst estimates of minimum force requirements (typically 1-2 million troops for a contested amphibious landing). Assess logistics sustainability for a multi-week campaign.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5M (satellite imagery analysis + classified intelligence assessment)",
      },
      evidence: [
        {
          id: "pla-navy-expansion",
          title: "PLA Navy Is Now the World's Largest Fleet",
          description:
            "China's navy surpassed 370 battle force ships by 2024, exceeding the U.S. Navy, with a focus on amphibious assault ships and missile-equipped surface combatants.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "US Office of Naval Intelligence",
          reasoning:
            "Hull count is verifiable via satellite imagery, though raw numbers don't account for tonnage or capability gaps with the U.S. fleet.",
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
          source: "CIA Director William Burns, INDOPACOM Commander Aquilino",
          reasoning:
            "Based on intelligence assessments, not public statements from China. 'Capability by' does not necessarily mean 'will invade by.' Independence score lowered because multiple U.S. officials may share the same underlying intelligence.",
        },
        {
          id: "no-amphibious-experience",
          title: "PLA Has Zero Modern Amphibious Combat Experience",
          description:
            "China has not conducted a contested amphibious operation since the failed assault on Kinmen (Quemoy) in 1949. The Taiwan Strait crossing would require the most complex amphibious operation in history, dwarfing D-Day.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          reasoning:
            "Historical fact. Military doctrine universally acknowledges that amphibious operations are the most difficult form of warfare. The PLA's lack of combat experience is a significant operational risk.",
        },
        {
          id: "taiwan-fortification",
          title: "Taiwan's Geographic and Defensive Advantages",
          description:
            "Taiwan has only 14 suitable landing beaches, a mountainous interior, and has been fortifying its defenses for 75 years. Prevailing weather limits crossing windows to April-October.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "CSIS Taiwan Strait wargame analysis",
          reasoning:
            "Geographic constraints are immutable. Taiwan's defensive preparations are well-documented and continually improving with increased defense spending.",
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
        "Economic interdependence makes invasion irrational. China's economy depends on $3.6 trillion in annual trade, much of it with nations that would impose severe sanctions. A Taiwan conflict would trigger the most devastating sanctions regime in history, far exceeding those imposed on Russia. China imports 70% of its oil by sea through chokepoints the U.S. Navy controls. TSMC's fabs would be destroyed or rendered inoperable in a conflict, eliminating the semiconductor prize. The economic catastrophe would threaten CCP domestic legitimacy far more than the Taiwan issue.",
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
            "Russia invaded Ukraine in 2022 despite deep economic integration with Europe, demonstrating that economic interdependence does not guarantee peace when a leader prioritizes territorial ambitions.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          reasoning:
            "Direct historical precedent, though China-Taiwan involves far greater economic stakes and military complexity than Russia-Ukraine.",
        },
        {
          id: "china-self-sufficiency-drive",
          title: "China's 'Dual Circulation' Self-Sufficiency Campaign",
          description:
            "Since 2020, China has invested hundreds of billions in domestic semiconductor production, built strategic commodity stockpiles, and expanded overland energy pipelines to reduce maritime trade vulnerability.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source: "China's 14th Five-Year Plan, public investment data",
          reasoning:
            "Self-sufficiency efforts are real and verifiable, but could reflect general strategic hedging rather than invasion preparation specifically.",
        },
        {
          id: "semiconductor-destruction-paradox",
          title: "TSMC Fabs Would Be Destroyed in a Conflict",
          description:
            "TSMC's advanced fabrication facilities require years to build, ultra-pure inputs, and Western equipment maintenance. They would almost certainly be damaged or rendered inoperable during an invasion, destroying the semiconductor prize China seeks.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Semiconductor industry analysts, TSMC leadership statements",
          reasoning:
            "Known as the 'silicon shield' argument. TSMC chairman has publicly stated the fabs cannot function in a war zone. This creates a paradox where invasion destroys the asset motivating it.",
        },
        {
          id: "trade-dependency-scale",
          title: "China's Trade Dependency Dwarfs Russia's Pre-Invasion Exposure",
          description:
            "China's $3.6 trillion annual trade and $3.2 trillion in foreign-held assets create an economic exposure orders of magnitude larger than Russia's pre-2022 position. Comprehensive sanctions would crash China's GDP by an estimated 10-25%.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "IMF trade data, Rhodium Group analysis",
          reasoning:
            "Economic modeling involves significant uncertainty, but the scale of China's trade exposure is well-documented and far exceeds historical precedents.",
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
            "President Biden stated on four separate occasions that the U.S. would defend Taiwan militarily, moving beyond traditional strategic ambiguity despite staff walkbacks.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 8,
            directness: 7,
          },
          source: "White House press conferences, 2021-2023",
          reasoning:
            "Presidential statements carry weight but were repeatedly walked back by staff, creating ambiguity about whether they represent actual policy or gaffes. Scored 'against' invasion likelihood since strong deterrence signals reduce invasion probability.",
        },
        {
          id: "pacific-force-buildup",
          title: "U.S. Pacific Military Buildup and Alliance Strengthening",
          description:
            "The U.S. has expanded Marine rotational presence in Australia, signed AUKUS, secured new Philippine basing agreements, and increased freedom of navigation operations in the Taiwan Strait.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "U.S. Department of Defense, allied government statements",
          reasoning:
            "Concrete military actions are more credible signals than verbal commitments. The scope of Pacific realignment suggests genuine preparation for a Taiwan contingency.",
        },
        {
          id: "wargame-heavy-losses",
          title: "U.S. Wargames Project Heavy Losses in Taiwan Scenarios",
          description:
            "CSIS and Pentagon wargames consistently show the U.S. suffering significant losses in a Taiwan defense scenario, including 2 aircraft carriers, 10-20 major surface combatants, and hundreds of aircraft in the first weeks.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "CSIS wargame report (2023), Congressional testimonies",
          reasoning:
            "Projected heavy losses could undermine U.S. willingness to intervene. However, wargames also generally show the U.S. and allies successfully repelling the invasion despite losses.",
        },
        {
          id: "afghanistan-credibility-gap",
          title: "Afghanistan Withdrawal Raised Allied Credibility Concerns",
          description:
            "The chaotic U.S. withdrawal from Afghanistan in 2021 raised global questions about American commitment to allies and willingness to sustain costly military engagements.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 4,
          },
          reasoning:
            "The Afghanistan analogy is imperfect—Taiwan is far more strategically important and the alliance context is different. However, the credibility signal was noted by both allies and adversaries.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
