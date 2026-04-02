import type { Topic } from "@/lib/schemas/topic";

export const usIranConflictData = {
  id: "us-iran-conflict",
  title: "The US-Iran Conflict",
  meta_claim:
    "US policy toward Iran — combining maximum-pressure sanctions, covert operations, and military deterrence — has made the Middle East safer and advanced American strategic interests.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Nuclear Program & Proliferation Risk
    // =========================================================================
    {
      id: "nuclear-program",
      title: "Nuclear Program & Proliferation Risk",
      short_summary:
        "US withdrawal from the JCPOA and subsequent military strikes aimed to prevent Iranian nuclear breakout, but Iran's enrichment has accelerated from 3.67% to 60% and its stockpile has grown enough for multiple weapons.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "US policy has accelerated, not prevented, nuclear proliferation. Iran was verifiably compliant with the JCPOA when the US unilaterally withdrew in 2018, confirmed by 11 consecutive IAEA reports. Every Iranian escalation — enriching to 20%, then 60%, amassing 408 kg of near-weapons-grade material — occurred after the US reneged on the deal. The June 2025 military strikes on Natanz destroyed facilities but did not eliminate knowledge or centrifuge technology, and by March 2026 the IAEA confirmed the underground Natanz facility remained intact though inaccessible. Maximum pressure created maximum proliferation risk.",
      proponent_rebuttal:
        "The JCPOA had fatal sunset clauses that would have allowed Iran unrestricted enrichment by 2030, and it never addressed ballistic missiles or regional aggression. By 2025, Iran had stockpiled 408 kg of 60% enriched uranium — enough for 7-9 weapons with just three weeks of further enrichment — and the IAEA detected particles at 83.7%. The June 2025 strikes destroyed critical centrifuge cascades and set back Iran's program by years. Without military pressure, Iran would have achieved breakout capability, triggering a regional nuclear arms race among Saudi Arabia, Turkey, and Egypt.",
      crux: {
        id: "jcpoa-compliance-causation",
        title: "The JCPOA Compliance-Causation Test",
        description:
          "The core question is whether Iran's nuclear escalation was caused by US withdrawal from the JCPOA or would have occurred regardless. If the IAEA's 11 consecutive compliance reports were accurate, and Iran only began exceeding limits after the US withdrew and reimposed sanctions, the causal chain points to US policy as the driver of proliferation risk rather than its solution.",
        methodology:
          "Compile the complete timeline of (1) IAEA compliance reports from 2016-2018, (2) the exact date and nature of each Iranian nuclear escalation, (3) the US policy action that preceded each escalation. Cross-reference IAEA inspection data with Iranian government announcements and EU diplomatic records to determine whether any Iranian violations preceded the US withdrawal.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (IAEA reports and diplomatic records are publicly available)",
      },
      evidence: [
        {
          id: "us-jcpoa-withdrawal",
          title: "US Unilateral Withdrawal from JCPOA Despite Verified Compliance (May 2018)",
          description:
            "On May 8, 2018, the US withdrew from the JCPOA despite 11 consecutive IAEA reports confirming Iranian compliance. All other signatories — the UK, France, Germany, Russia, China, and the EU — opposed the withdrawal. The US reimposed maximum-pressure sanctions explicitly aiming to drive Iran's oil exports to zero. Iran continued complying for a full year before beginning its own stepbacks in May 2019.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "Arms Control Association; IAEA; Council on Foreign Relations",
          sourceUrl: "https://www.armscontrol.org/factsheets/status-irans-nuclear-program-1",
          reasoning:
            "IAEA compliance reports are internationally verified documents from an independent UN agency. The unilateral nature of the withdrawal, opposed by all other signatories, is undisputed historical fact. This directly challenges the claim that US policy advanced nonproliferation goals.",
        },
        {
          id: "iran-enrichment-escalation",
          title: "Iran Amasses 408 kg of 60% Enriched Uranium by 2025",
          description:
            "After the US withdrawal, Iran progressively exceeded JCPOA limits: breaching the 300 kg low-enriched uranium cap in 2019, enriching to 20% in January 2021, then 60% in April 2021. By May 2025, Iran had amassed 408.6 kg of 60% enriched uranium — a 50% increase in just three months. The IAEA detected particles at 83.7%. Experts estimate Iran could produce weapons-grade material for 7-9 weapons within three weeks of a political decision.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "IAEA GOV/2025/24; Arms Control Association; Bulletin of the Atomic Scientists",
          sourceUrl: "https://www.iaea.org/sites/default/files/25/06/gov2025-24.pdf",
          reasoning:
            "IAEA data is the gold standard for nuclear monitoring. The rapid stockpiling represents a genuine proliferation threat that proponents cite as justification for military action. However, context matters: this escalation began only after the US withdrew from the deal.",
        },
        {
          id: "june-2025-strikes-nuclear",
          title: "US-Israel Strikes on Natanz, Fordow, and Isfahan (June 2025)",
          description:
            "On June 13, 2025, Israel launched strikes on Iranian nuclear facilities at Natanz, Fordow, and Isfahan with US military support on June 22. Over 200 fighter jets dropped 330+ munitions on approximately 100 targets. The strikes destroyed surface infrastructure and centrifuge halls but the underground Natanz facility survived. By March 2026, the IAEA confirmed the facility remained intact though its entrance buildings were inaccessible.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "IAEA; Bulletin of the Atomic Scientists; CFR Global Conflict Tracker",
          sourceUrl: "https://www.cfr.org/global-conflict-tracker/conflict/confrontation-between-united-states-and-iran",
          reasoning:
            "Proponents argue the strikes degraded Iran's nuclear capability. However, independent assessments note the underground facility survived, Iran retains its enrichment knowledge, and the strikes triggered the formal death of the JCPOA when Iran terminated the agreement in October 2025.",
        },
        {
          id: "iaea-no-weaponization-evidence",
          title: "IAEA and US Intelligence Find No Evidence of Active Weaponization",
          description:
            "Despite Iran's high enrichment levels, neither the IAEA nor US intelligence agencies have found evidence that Iran is actively pursuing a nuclear weapon. The IAEA's May 2025 report noted that Iran's highest officials state nuclear weapons are incompatible with Islamic law. The agency emphasized that Iran is the only non-nuclear-weapon state enriching to 60%, calling it 'a matter of serious concern,' but stopped short of accusing Iran of weaponization.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "IAEA GOV/2025/25; Arms Control Association",
          sourceUrl: "https://www.iaea.org/sites/default/files/25/06/gov2025-25.pdf",
          reasoning:
            "The IAEA is the authoritative independent body for nuclear monitoring. The absence of weaponization evidence undermines the claim that military strikes were necessary to prevent an imminent nuclear weapon, challenging the core justification for US policy.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Regional Proxy Networks
    // =========================================================================
    {
      id: "proxy-warfare",
      title: "Regional Proxy Networks",
      short_summary:
        "Iran funds Hezbollah, the Houthis, Hamas, and Iraqi militias to project power across the Middle East. US policy aims to degrade these networks, but critics argue the proxy threat has grown rather than diminished under maximum pressure.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Maximum pressure has failed to weaken Iran's proxy network and may have strengthened it. Despite decades of sanctions, Hezbollah grew into the most heavily armed non-state actor in the world. The Houthis disrupted global shipping through the Red Sea in 2023-2024, costing billions. Iraqi militias conducted 170+ attacks on US bases between October 2023 and January 2024. Iran's 'Axis of Resistance' strategy was a direct response to US encirclement — 40,000+ troops and dozens of bases ringing Iran — making proxies a rational asymmetric deterrent rather than pure aggression.",
      proponent_rebuttal:
        "Iran spends an estimated $700 million to $1 billion annually funding Hezbollah alone and arms the Houthis, Hamas, and Iraqi militias to destabilize the region. These groups have killed hundreds of Americans, launched thousands of rockets at Israel, and disrupted international shipping. The June 2025 war and February 2026 strikes significantly degraded Iran's ability to coordinate with proxies — notably, Hezbollah and the Houthis largely failed to come to Iran's defense during the 2026 strikes, exposing the fragility of the network. Without US pressure, Iran would project power unchecked across the Levant, Gulf, and Red Sea.",
      crux: {
        id: "proxy-network-degradation",
        title: "The Proxy Network Capacity Assessment",
        description:
          "If US policy has genuinely degraded Iran's proxy capabilities, we should see measurable declines in proxy armament, operational tempo, and territorial control over the period of maximum pressure. If proxy capabilities have instead grown, US policy has failed on its own terms.",
        methodology:
          "Compare proxy group metrics across three periods: pre-maximum-pressure (2015-2018), during JCPOA withdrawal and sanctions (2018-2024), and post-military strikes (2025-2026). Metrics include: Hezbollah rocket inventory, Houthi anti-ship missile launches, Iraqi militia attacks on US bases, and Hamas operational capacity. Use ACLED conflict data, CSIS assessments, and UN Panel of Experts reports.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Comprehensive multi-country conflict analysis requiring classified and open-source intelligence fusion)",
      },
      evidence: [
        {
          id: "tower-22-attack",
          title: "Iran-Backed Militia Kills 3 US Soldiers at Tower 22, Jordan (January 2024)",
          description:
            "An Iranian-backed Iraqi militia drone struck Tower 22, a US military outpost in Jordan near the Syrian border, killing 3 American soldiers and wounding 47. This was one of 170+ attacks on US bases by Iran-aligned groups between October 2023 and January 2024 following the Hamas attack on Israel. The US retaliated with strikes on 85 Iran-affiliated targets across Iraq and Syria.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "PBS News; Department of Defense",
          sourceUrl: "https://www.pbs.org/newshour/world/biden-says-3-u-s-troops-killed-many-injured-in-drone-attack-by-iran-backed-militia-in-jordan",
          reasoning:
            "Demonstrates that Iran-backed forces actively target US personnel, supporting the argument that US military presence and deterrence are necessary. However, Iran denied direct involvement, and the existence of US bases surrounding Iran is itself a contested element of the conflict.",
        },
        {
          id: "houthi-red-sea",
          title: "Houthis Disrupt Global Shipping Despite Years of US Sanctions on Iran",
          description:
            "From November 2023 through 2024, Iran-backed Houthi forces launched over 100 attacks on commercial shipping in the Red Sea, forcing major carriers to reroute around Africa and costing the global economy an estimated $80-100 billion annually. This occurred despite decades of US sanctions on Iran and years of Saudi-led coalition warfare in Yemen, suggesting maximum pressure failed to degrade Houthi capabilities. By 2025, Houthis were manufacturing their own weapons domestically.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "UN Panel of Experts on Yemen; ACLED; Lloyd's of London",
          sourceUrl: "https://acleddata.com/qa/qa-twelve-days-shook-region-inside-iran-israel-war",
          reasoning:
            "The Houthi shipping disruption is one of the most significant proxy operations in modern history, occurring after years of maximum pressure on Iran. The development of domestic weapons manufacturing demonstrates that sanctions failed to cut the supply chain. This directly challenges the claim that US policy has degraded proxy capabilities.",
        },
        {
          id: "proxy-failure-2026",
          title: "Iran's Proxies Largely Sat Out the February 2026 Strikes",
          description:
            "During Operation Epic Fury in February 2026, Iran's proxy network largely failed to mobilize in Tehran's defense. The Houthis refrained from major action, partly to preserve a deal signed with Trump in May 2025. Hezbollah launched limited rocket salvos but did not open a full northern front against Israel. Iraqi militias issued threats but took no significant coordinated action. Foreign Policy assessed that Iran's proxies were 'out for themselves.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Foreign Policy; Long War Journal",
          sourceUrl: "https://foreignpolicy.com/2026/03/02/iran-war-hezbollah-lebabon-houthis-yemen-iraq-proxies/",
          reasoning:
            "The failure of Iran's proxy network to coordinate a meaningful response during the 2026 strikes suggests that years of pressure — combined with the destruction of Hezbollah's leadership in 2024 and the Houthi deal — may have degraded the 'Axis of Resistance' as a cohesive force. However, this may also reflect self-interested calculations by proxy groups rather than a loss of capability.",
        },
        {
          id: "soleimani-assassination-proxy",
          title: "Soleimani Assassination Disrupted but Did Not Destroy Proxy Coordination (2020)",
          description:
            "The January 2020 assassination of IRGC Quds Force commander Qasem Soleimani removed the architect of Iran's proxy strategy. Iran retaliated with ballistic missile strikes on Al-Asad airbase, injuring 100+ US troops. While the FBI confirmed in 2025 that Iran continues to plot revenge — including attempts to assassinate former US officials — proxy operations continued under Soleimani's successor Esmail Qaani. The killing created a lasting Iranian motivation for retaliation without permanently degrading proxy coordination.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "FBI; Brookings Institution; Stimson Center",
          sourceUrl: "https://www.brookings.edu/articles/iran-knows-how-to-bide-its-time-dont-expect-immediate-retaliation-for-soleimani/",
          reasoning:
            "The Soleimani assassination is the highest-profile targeted killing in the US-Iran conflict. Evidence shows it disrupted but did not destroy proxy networks, and it created an enduring Iranian motivation for retaliation that manifested in assassination plots against former US officials. This complicates the claim that targeted killings advance US security.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Sanctions & Economic Pressure
    // =========================================================================
    {
      id: "sanctions-effectiveness",
      title: "Sanctions & Economic Pressure",
      short_summary:
        "US sanctions have crashed Iran's currency, halved its GDP, and caused severe civilian hardship, but Iran continues enriching uranium, funding proxies, and finding covert oil export channels — raising the question of whether economic pressure coerces the regime or only punishes its citizens.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Sanctions have devastated the Iranian population without changing regime behavior. Iran's GDP fell from $600 billion to $356 billion. The rial collapsed from 42,000 to over 1.4 million per dollar. Food inflation exceeds 72%. Six million patients lack adequate medicine, including 40,000 hemophiliacs unable to obtain blood-clotting medication. Meanwhile, the regime continues enriching uranium, funding proxies with an estimated $700 million to $1 billion annually for Hezbollah alone, and finding covert oil export routes through China. Sanctions are collective punishment of 88 million civilians that strengthens regime narratives of victimhood.",
      proponent_rebuttal:
        "Sanctions are a legitimate, non-violent tool of statecraft that targets the regime's ability to fund terrorism and nuclear proliferation. Humanitarian goods like food and medicine are explicitly exempt under OFAC guidelines. Maximum pressure brought Iran to the negotiating table in 2025, demonstrating that economic pain drives diplomatic engagement. Iran diverts resources to proxy militias and nuclear programs rather than civilian welfare — the regime, not sanctions, is responsible for civilian suffering. UN snapback sanctions in late 2025 demonstrated international consensus that Iran's nuclear violations warranted economic consequences.",
      crux: {
        id: "sanctions-civilian-impact",
        title: "The Civilian Impact Assessment",
        description:
          "If sanctions cause civilian mortality and suffering comparable to armed conflict — through denial of medicine, food insecurity, and economic collapse — they constitute de facto economic warfare regardless of humanitarian exemptions on paper. The definitive test is whether humanitarian exemptions function in practice or are nullified by banking over-compliance.",
        methodology:
          "Commission an independent epidemiological study comparing Iranian civilian mortality rates, disease outcomes, and nutritional status before and after each sanctions escalation (2012, 2018, 2025). Cross-reference with WHO, UNICEF, and Iranian health ministry data. Measure the gap between humanitarian goods legally permitted and actually delivered by tracking OFAC license approvals versus actual import volumes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Comprehensive independent epidemiological study requiring on-ground access in Iran)",
      },
      evidence: [
        {
          id: "gdp-currency-collapse",
          title: "Iran's GDP Halved and Currency Collapsed Under Sanctions",
          description:
            "Iran's GDP fell from approximately $600 billion in 2010 to an estimated $356 billion in 2025. Per capita GDP dropped from $8,000 to $5,000 between 2012 and 2024. The rial crashed from 42,000 per dollar to over 1.4 million by early 2026. Food prices rose 72% year-over-year in 2025. The World Bank projects continued economic contraction through 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "World Bank; UK House of Commons Library",
          sourceUrl: "https://thedocs.worldbank.org/en/doc/65cf93926fdb3ea23b72f277fc249a72-0500042021/related/mpo-irn.pdf",
          reasoning:
            "World Bank and international financial data are independently verifiable. Proponents cite this as evidence that sanctions create leverage; critics note the regime has not changed course despite this devastation, meaning sanctions failed their stated objective while destroying civilian livelihoods.",
        },
        {
          id: "medicine-shortages",
          title: "6 Million Patients Face Treatment Shortages Due to Sanctions",
          description:
            "An estimated 6 million Iranian patients face limited treatment access for conditions including hemophilia, cancer, multiple sclerosis, thalassemia, and epilepsy. Approximately 40,000 hemophiliacs cannot obtain blood-clotting medication. Operating theaters have run out of modern anesthetics. Human Rights Watch documented that while humanitarian exemptions exist legally, banks and suppliers refuse to process even exempt transactions for fear of secondary sanctions, creating a de facto blockade on medical supplies.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Human Rights Watch; PMC/NIH peer-reviewed studies; WHO EMRO",
          sourceUrl: "https://www.hrw.org/report/2019/10/29/maximum-pressure/us-economic-sanctions-harm-iranians-right-health",
          reasoning:
            "HRW is an independent international organization, and its findings are corroborated by peer-reviewed medical studies published in NIH journals. The failure of humanitarian exemptions in practice is documented by banking sector compliance data. This directly challenges the claim that sanctions advance American interests without harming civilians.",
        },
        {
          id: "oil-export-evasion",
          title: "Iran Maintains 1.5M Barrels/Day Through Covert Channels to China",
          description:
            "Despite maximum-pressure sanctions, Iran's crude oil exports recovered to approximately 1.5-1.6 million barrels per day by 2024-2025, with 90% going to China through a network of intermediaries, stealth tankers, and intermediary ports. Iran must offer $17/barrel discounts, costing billions in revenue, but the covert trade persists. In 2025, Iran delivered an average of 1.38 million barrels per day to China, declining only 7% from 2024 despite intensified enforcement.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Iran International; Clingendael Institute; US Energy Information Administration",
          sourceUrl: "https://www.clingendael.org/publication/sanctions-without-shock-united-nations-snapback-and-irans-oil-exports",
          reasoning:
            "Oil export tracking data comes from multiple independent sources including ship-tracking firms and energy agencies. The persistence of significant exports despite maximum pressure demonstrates a fundamental limitation of the sanctions regime, undermining claims of effectiveness.",
        },
        {
          id: "sanctions-brought-negotiations",
          title: "Maximum Pressure Brought Iran to Negotiating Table in 2025",
          description:
            "In April 2025, Iran agreed to resume nuclear negotiations with the US following a letter from President Trump to Supreme Leader Khamenei. Five rounds of productive talks followed, brokered by Oman. Proponents argue this demonstrates that economic pressure works: Iran's deteriorating economy created the conditions for diplomatic engagement. Trump set a 60-day deadline, and the talks represented the first direct US-Iran nuclear engagement since the JCPOA.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Arms Control Association; Britannica; Al Jazeera",
          sourceUrl: "https://www.armscontrol.org/2025-05/united-states-and-iran-begin-nuclear-talks",
          reasoning:
            "The resumption of negotiations is a verifiable fact. However, the claim that sanctions caused this is an inference — Iran may have had other motivations. More critically, the negotiations collapsed when Israel struck Iranian nuclear facilities in June 2025 with US support, undermining the argument that pressure-then-diplomacy was the actual strategy.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Iran's War With Israel and the United States - CFR Global Conflict Tracker",
      url: "https://www.cfr.org/global-conflict-tracker/conflict/confrontation-between-united-states-and-iran",
    },
    {
      title: "Status of Iran's Nuclear Program - Arms Control Association",
      url: "https://www.armscontrol.org/factsheets/status-irans-nuclear-program-1",
    },
    {
      title: "An Obituary for the JCPOA - Carnegie Endowment for International Peace",
      url: "https://carnegieendowment.org/posts/2025/10/iran-deal-jcpoa-obituary",
    },
    {
      title: "Maximum Pressure: US Economic Sanctions Harm Iranians' Right to Health - Human Rights Watch",
      url: "https://www.hrw.org/report/2019/10/29/maximum-pressure/us-economic-sanctions-harm-iranians-right-health",
    },
    {
      title: "Neither Preemptive Nor Legal: US-Israeli Strikes on Iran Have Blown Up International Law - The Conversation",
      url: "https://theconversation.com/neither-preemptive-nor-legal-us-israeli-strikes-on-iran-have-blown-up-international-law-277173",
    },
    {
      title: "Iran's Proxy War Paradox: Strategic Gains, Control Issues, and Operational Constraints - Small Wars & Insurgencies",
      url: "https://www.tandfonline.com/doi/full/10.1080/09592318.2025.2512807",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did the US withdrawal from the JCPOA cause Iran's nuclear escalation?",
      content:
        "Iran was verifiably compliant with the JCPOA when the US withdrew in 2018, and its nuclear escalation began afterward. But Iran also conducted undisclosed nuclear work before the deal and enriched to near-weapons-grade levels by 2025. Was the JCPOA genuinely constraining Iran, or merely delaying an inevitable breakout while legitimizing enrichment infrastructure?",
    },
    {
      id: "q2",
      title: "Are sanctions a form of economic warfare against civilians?",
      content:
        "US sanctions have crashed Iran's currency by over 96%, caused 72% food inflation, and left 6 million patients without adequate medicine. Humanitarian exemptions exist on paper but fail in practice due to banking over-compliance. Does the distinction between targeting a regime and devastating its population hold when 88 million civilians bear the consequences?",
    },
    {
      id: "q3",
      title: "Has US military deterrence made the Middle East safer or more dangerous?",
      content:
        "The Soleimani assassination, the Twelve-Day War in June 2025, and Operation Epic Fury in February 2026 have killed thousands and brought the US into direct military confrontation with Iran. Proponents argue deterrence prevents worse outcomes. Critics argue each escalation triggers retaliation — assassination plots, proxy attacks, missile strikes — creating a cycle that has made the region more volatile than before maximum pressure began.",
    },
  ],
};

