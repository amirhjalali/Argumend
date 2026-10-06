export const usIranConflictData = {
  id: "us-iran-conflict",
  title: "The US-Iran Conflict",
  question:
    "Has US pressure on Iran made the Middle East safer and served US interests?",
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
        "US policy has accelerated, not prevented, nuclear proliferation. Iran was verifiably compliant with the JCPOA when the US unilaterally withdrew in 2018, confirmed by 11 consecutive IAEA reports. Every Iranian escalation — enriching to 20%, then 60%, amassing 408 kg of near-weapons-grade material — occurred after the US reneged on the deal. The June 2025 military strikes on Natanz destroyed facilities but did not eliminate Iran's enrichment knowledge or centrifuge expertise, and by early 2026 the IAEA had lost continuity of knowledge over the program, leaving residual underground capacity contested. Maximum pressure, critics argue, created maximum proliferation risk.",
      proponent_rebuttal:
        "The JCPOA had fatal sunset clauses that would have allowed Iran unrestricted enrichment by 2030, and it never addressed ballistic missiles or regional aggression. By 2025, Iran had stockpiled 408 kg of 60% enriched uranium — enough for 7-9 weapons with just three weeks of further enrichment — and the IAEA detected particles at 83.7%. The June 2025 strikes destroyed critical centrifuge cascades and set back Iran's program by years. Without military pressure, Iran would have achieved breakout capability, triggering a regional nuclear arms race among Saudi Arabia, Turkey, and Egypt.",
      crux: {
        id: "jcpoa-compliance-causation",
        title: "The JCPOA Compliance-Causation Test",
        question:
          "Did Iran's nuclear escalation result from the US leaving the nuclear deal, or would it have happened anyway?",
        description:
          "The core question is whether Iran's nuclear escalation was caused by US withdrawal from the JCPOA or would have occurred regardless. If the IAEA's 11 consecutive compliance reports were accurate, and Iran only began exceeding limits after the US withdrew and reimposed sanctions, the causal chain points to US policy as the driver of proliferation risk rather than its solution.",
        methodology:
          "Compile the complete timeline of (1) IAEA compliance reports from 2016-2018, (2) the exact date and nature of each Iranian nuclear escalation, (3) the US policy action that preceded each escalation. Cross-reference IAEA inspection data with Iranian government announcements and EU diplomatic records to determine whether any Iranian violations preceded the US withdrawal.",
        verification_status: "impossible" as const,
        settle: {
          condition:
            "No test can rerun the years after 2018 with the deal intact; evidence can only narrow it. A full timeline of IAEA compliance reports from 2016 to 2018, each Iranian escalation and the US action before it would show whether any violation came before the withdrawal.",
        },
        cost_to_verify:
          "$0 (IAEA reports and diplomatic records are publicly available)",
        falsification: {
          supporter_flip:
            "If the full timeline of IAEA reports and Iranian escalations confirmed that every escalation followed a US action, and the June 2025 strikes left Iran's enrichment knowledge and underground capacity largely intact, the case that pressure prevented breakout would weaken.",
          skeptic_flip:
            "If Iran's path to 408 kg of 60% uranium, with particles detected at 83.7%, turned out to match what the JCPOA's sunset clauses would have allowed by 2030 anyway, with missiles never covered, the escalation would look less like a product of the US withdrawal.",
          common_ground:
            "Both sides agree Iran went from 3.67% enrichment to 60% and amassed about 408 kg of 60% uranium, and that its breaches of JCPOA limits began after the US withdrew in 2018.",
          live_disagreement:
            "Whether Iran's escalation was caused by the US leaving a deal Iran was complying with, or would have come anyway as the sunset clauses expired — and whether the 2025 strikes set the program back years or left capacity the IAEA can no longer see.",
        },
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
            "After the US withdrawal, Iran progressively exceeded JCPOA limits: breaching the 300 kg low-enriched uranium cap in 2019, enriching to 20% in January 2021, then 60% in April 2021. By May 2025, Iran had amassed 408.6 kg of 60% enriched uranium — a roughly 50% increase since the February 2025 report. The IAEA had earlier detected particles enriched to 83.7% at Fordow in January 2023. Experts estimate Iran could produce weapons-grade material for up to 9 weapons within weeks of a political decision.",
          side: "against" as const,
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
            "On June 13, 2025, Israel launched its opening strikes (Operation Rising Lion) on Iranian nuclear and military targets, with over 200 fighter jets reportedly dropping 330+ munitions on roughly 100 targets. The US joined on June 22 with Operation Midnight Hammer, sending seven B-2 bombers and bunker-buster munitions against Fordow, Natanz, and Isfahan. The strikes destroyed surface infrastructure and centrifuge halls, but damage to the deepest underground enrichment halls was disputed, and a leaked US Defense Intelligence Agency assessment judged the setback to be months rather than years. As of early 2026, the IAEA had lost continuity of knowledge over much of Iran's program, and the extent of residual underground capacity remained contested.",
          side: "against" as const,
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
    // PILLAR 2: Nuclear Threat Assessment (folded in from the retired
    // iran-war-justification map, 2026-10-06)
    // =========================================================================
    {
      id: "nuclear-threat-assessment",
      title: "Nuclear Threat Assessment",
      short_summary:
        "Iran has enriched uranium to near-weapons-grade levels and expanded its stockpile, but whether this constitutes an imminent threat requiring military action — or exaggerated intelligence echoing Iraq — remains sharply disputed.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "The case for an imminent nuclear threat runs through the same institutional incentives that produced the Iraq WMD debacle. Iran has enriched to 60% and the IAEA detected a transient batch of particles at 83.7%, but enrichment capability is not the same as a weapons program. There is no public evidence Iran has diverted material to a weaponization track, the 2007 US NIE judged the structured weapons-design effort halted in 2003 with no public assessment reversing that, and Iran — however grudgingly — still operates under IAEA safeguards. The 'breakout timeline' conflates two different clocks: producing enough fissile material may be weeks away, but converting it into a deliverable warhead (metal conversion, pit fabrication, implosion design, miniaturization, missile integration) is plausibly a year or more. We heard the same compressed-urgency framing about Iraq, and the Senate Intelligence Committee later found those estimates 'overstated' and 'not supported by the intelligence.'",
      proponent_rebuttal:
        "The Iraq analogy is a false parallel. In Iraq, inspectors found nothing; in Iran, the IAEA documented about 408 kg of 60% enriched uranium as of May 2025 — enough fissile material for multiple weapons with further enrichment — and a 2023 detection of particles at 83.7% at Fordow that has no routine civilian explanation. In September 2023 Iran de-designated several of the agency's most experienced inspectors, and it had already had the JCPOA monitoring cameras removed in 2022, leaving real verification gaps; questions about undeclared nuclear material at several sites remain unresolved. Unlike Iraq, the core measurements come from the IAEA itself, an independent international body, not from national intelligence alone. The fissile-material breakout timeline is now measured in weeks even if weaponization would take longer, and every month of delay adds to the stockpile. Waiting for an unambiguous smoking gun could mean waiting until Iran is already at the threshold.",
      crux: {
        id: "breakout-timeline-verification",
        title: "The Breakout Timeline Verification",
        question:
          "Is Iran near a deliverable nuclear weapon, or is the gap from enriched uranium to a bomb understated?",
        description:
          "Determine whether Iran's current enrichment capacity and stockpile constitute a genuine near-term weapons capability, or whether the gap between enriched material and a deliverable nuclear weapon is being understated to build a case for war.",
        methodology:
          "Cross-reference IAEA quarterly reports on Iran's UF6 stockpile (kg at each enrichment level) with independent technical assessments of the steps required beyond enrichment: conversion to metal, pit fabrication, implosion lens design, warhead miniaturization, and delivery vehicle integration. Compare the publicly known state of Iran's program against the timelines estimated by physicists at Princeton's Science & Global Security program and the Federation of American Scientists.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "IAEA quarterly figures on Iran's uranium stockpile at each enrichment level, set against independent technical estimates of how long the later steps take: conversion to metal, pit fabrication, implosion design, miniaturization and missile integration.",
        },
        cost_to_verify:
          "$0 (IAEA reports are public; independent technical assessments available from FAS and Princeton SGS)",
        falsification: {
          supporter_flip:
            "If independent technical assessments found the steps beyond enrichment — metal conversion, pit fabrication, implosion design, miniaturization, missile integration — would take Iran well over a year, with no sign of material diverted to a weaponization track, the case that the threat is near enough to justify strikes would weaken.",
          skeptic_flip:
            "If further IAEA reporting, rather than national intelligence alone, kept finding a stockpile on the scale of May 2025's 408 kg of 60% uranium, particles near 83.7% at Fordow, and verification gaps since cameras and inspectors were removed, the Iraq-style inflation charge would be hard to hold.",
          common_ground:
            "Both sides agree Iran holds about 408 kg of 60% enriched uranium and could produce enough fissile material within weeks, while turning it into a deliverable warhead would take longer.",
          live_disagreement:
            "How close Iran is to a deliverable weapon rather than to fissile material alone, and whether acting before an unambiguous sign of weaponization is prudent or repeats the Iraq error of compressed urgency.",
        },
      },
      evidence: [
        {
          id: "inspector-expulsion",
          title:
            "Iran Withdrew Designations of Experienced IAEA Inspectors (2023) and Removed JCPOA Cameras (2022)",
          description:
            "In September 2023 Iran withdrew the designations of several of the IAEA's most experienced inspectors — about a third of the core group assigned to Iran — which Director General Grossi called an 'unprecedented and disproportionate' measure (though formally permitted under the NPT Safeguards Agreement). Separately, in June 2022 the IAEA removed its JCPOA surveillance and monitoring equipment at Iran's request. Together these created significant gaps in the agency's ability to verify the program's status.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "IAEA Director General's Statement on Verification in Iran (16 Sept 2023)",
          sourceUrl:
            "https://www.iaea.org/newscenter/pressreleases/iaea-director-generals-statement-on-verification-in-iran-0",
          reasoning:
            "Corrected: the inspectors were de-designated (a step permitted under the safeguards agreement), not declared 'persona non grata,' and the camera removal was 2022, not 2023. Obstructing monitoring is concerning but does not itself prove weaponization — it could reflect a weapons program or political retaliation over the JCPOA's collapse and sanctions. Directness lowered accordingly.",
        },
        {
          id: "iraq-wmd-precedent",
          title:
            "Iraq WMD Intelligence Failure Demonstrates Institutional Bias Toward Threat Inflation",
          description:
            "In 2003, US and UK intelligence agencies assessed with 'high confidence' that Iraq possessed WMDs and active nuclear, chemical, and biological weapons programs. Every major claim was wrong. The Chilcot Inquiry and Senate Intelligence Committee reports documented how intelligence was shaped to fit a predetermined policy conclusion.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 6,
          },
          source:
            "Senate Select Committee on Intelligence Report on the U.S. Intelligence Community's Prewar Intelligence Assessments on Iraq (S. Rept. 108-301, 2004); Iraq (Chilcot) Inquiry (2016)",
          sourceUrl:
            "https://www.congress.gov/committee-report/108th-congress/senate-report/301/1",
          reasoning:
            "The Iraq precedent is historically verified — the Senate report found prewar WMD estimates 'overstated' and 'not supported by the intelligence' — and is directly relevant as an institutional warning. However, directness is limited because the Iran case rests on different evidence sources (IAEA on-site measurement vs. national intelligence and defector reporting) and different factual circumstances.",
        },
        {
          id: "nie-no-weapons-program",
          title:
            "US National Intelligence Estimate: Iran Halted Weapons Program in 2003",
          description:
            "The November 2007 US NIE 'Iran: Nuclear Intentions and Capabilities' judged with high confidence that Tehran halted its nuclear weapons program in fall 2003, with moderate confidence it had not restarted as of mid-2007. (The 'weapons program' was narrowly defined to exclude declared enrichment work, a definition critics dispute.) Subsequent assessments have not formally reversed this finding, though they note Iran has kept the option open. There is no public US intelligence assessment concluding Iran has restarted a dedicated weaponization program.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source:
            "Office of the Director of National Intelligence, National Intelligence Estimate, Iran: Nuclear Intentions and Capabilities (Nov 2007), declassified key judgments",
          sourceUrl:
            "https://www.armscontrol.org/issue-briefs/2010-08/iran-nuclear-nie-2007-revise-reject-reiterate",
          reasoning:
            "The NIE is from the same intelligence community that got Iraq wrong, which cuts both ways. Independence is low since it is a US government product, and the 'high confidence' headline rested on a narrow definition of 'weapons program' that excluded enrichment — so directness and reliability are de-inflated. Citation points to the Arms Control Association issue brief, which reproduces the declassified key judgments (the primary ODNI/CIA document is not reliably web-accessible).",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Regional Proxy Networks
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
        question:
          "Have Iran's proxy forces weakened or grown stronger during the period of maximum pressure?",
        description:
          "If US policy has genuinely degraded Iran's proxy capabilities, we should see measurable declines in proxy armament, operational tempo, and territorial control over the period of maximum pressure. If proxy capabilities have instead grown, US policy has failed on its own terms.",
        methodology:
          "Compare proxy group metrics across three periods: pre-maximum-pressure (2015-2018), during JCPOA withdrawal and sanctions (2018-2024), and post-military strikes (2025-2026). Metrics include: Hezbollah rocket inventory, Houthi anti-ship missile launches, Iraqi militia attacks on US bases, and Hamas operational capacity. Use ACLED conflict data, CSIS assessments, and UN Panel of Experts reports.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Comprehensive multi-country conflict analysis requiring classified and open-source intelligence fusion)",
        falsification: {
          supporter_flip:
            "If proxy metrics across 2015-2018, 2018-2024 and 2025-2026 — Hezbollah's rocket inventory, Houthi anti-ship launches, militia attacks on US bases — showed capacity growing under maximum pressure, the policy would have failed on its own terms.",
          skeptic_flip:
            "If Iran's proxies again largely failed to mobilize when Iran itself came under attack, as during the February 2026 strikes when the Houthis held back and Hezbollah fired only limited salvos, the network would look fragile rather than strengthened.",
          common_ground:
            "Both sides agree Iran funds Hezbollah at an estimated $700 million to $1 billion a year, and that its proxies struck hard in 2023-2024, with 170+ attacks on US bases and Red Sea attacks that rerouted global shipping.",
          live_disagreement:
            "Whether maximum pressure and the 2025-2026 strikes have degraded Iran's proxy network, as its absence in February 2026 suggests, or whether the network grew under pressure as a rational deterrent to US encirclement.",
        },
      },
      evidence: [
        {
          id: "tower-22-attack",
          title: "Iran-Backed Militia Kills 3 US Soldiers at Tower 22, Jordan (January 2024)",
          description:
            "An Iranian-backed Iraqi militia drone struck Tower 22, a US military outpost in Jordan near the Syrian border, killing 3 American soldiers and wounding 47. This was one of 170+ attacks on US bases by Iran-aligned groups between October 2023 and January 2024 following the Hamas attack on Israel. The US retaliated with strikes on 85 Iran-affiliated targets across Iraq and Syria.",
          side: "against" as const,
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
        {
          id: "hezbollah-arsenal-growth",
          title:
            "Hezbollah's Arsenal Grew From ~15,000 Rockets (2006) to an Estimated 120,000-150,000 Despite Israeli Operations",
          description:
            "After the 2006 Lebanon War, Israel declared it had significantly degraded Hezbollah's capabilities. In the years since, estimates of Hezbollah's rocket and missile arsenal rose roughly ten-fold — CSIS puts it around 130,000, with broader estimates spanning 120,000-200,000 — adding precision-guided munitions and longer-range systems supplied through Iranian logistics networks via Syria.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source:
            "CSIS Missile Threat, 'Missiles and Rockets of Hezbollah'",
          sourceUrl: "https://missilethreat.csis.org/country/hezbollahs-rocket-arsenal/",
          reasoning:
            "Corrected: the 2006 baseline was roughly 15,000-20,000 rockets (not 10,000), and the upper figure is an estimate (CSIS ~130,000; Israeli officials say ~150,000; full range 120,000-200,000) rather than a verified count, so independence and replicability are de-inflated. Still solid historical evidence that force against proxies and supply lines did not prevent arsenal growth — directness remains high.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Sanctions & Economic Pressure
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
        question:
          "Do humanitarian exemptions to Iran sanctions work in practice, or does bank over-compliance nullify them?",
        description:
          "If sanctions cause civilian mortality and suffering comparable to armed conflict — through denial of medicine, food insecurity, and economic collapse — they constitute de facto economic warfare regardless of humanitarian exemptions on paper. The definitive test is whether humanitarian exemptions function in practice or are nullified by banking over-compliance.",
        methodology:
          "Commission an independent epidemiological study comparing Iranian civilian mortality rates, disease outcomes, and nutritional status before and after each sanctions escalation (2012, 2018, 2025). Cross-reference with WHO, UNICEF, and Iranian health ministry data. Measure the gap between humanitarian goods legally permitted and actually delivered by tracking OFAC license approvals versus actual import volumes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Comprehensive independent epidemiological study requiring on-ground access in Iran)",
        falsification: {
          supporter_flip:
            "If tracking OFAC license approvals against actual imports showed permitted medicine and food largely failing to arrive because banks over-comply, and civilian health worsened after each sanctions escalation, the sanctions would amount to economic warfare on civilians whatever the exemptions say on paper.",
          skeptic_flip:
            "If import tracking showed exempt food and medicine reaching Iran under OFAC guidelines, shortages traced to regime diversion toward proxies and the nuclear program, and pressure yielding talks like the five Oman-brokered rounds of 2025, 'collective punishment' would describe the sanctions poorly.",
          common_ground:
            "Both sides agree sanctions have badly damaged Iran's economy — GDP from about $600 billion to $356 billion, the rial from 42,000 to over 1.4 million per dollar — and that Iranian civilians are suffering, whoever bears the blame.",
          live_disagreement:
            "Whether sanctions coerce the regime, bringing it to talks, or mainly punish civilians while it keeps enriching and funding proxies — which turns on whether humanitarian exemptions actually deliver in practice.",
        },
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

    // =========================================================================
    // PILLAR 5: Diplomatic Alternatives (folded in from the retired
    // iran-war-justification map, 2026-10-06)
    // =========================================================================
    {
      id: "diplomatic-alternatives",
      title: "Diplomatic Alternatives",
      short_summary:
        "The question of whether diplomacy has been 'exhausted' depends on whether the JCPOA's collapse is seen as proof that diplomacy failed — or proof that it was sabotaged before it could succeed.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Diplomacy has not been exhausted — it was deliberately abandoned. The JCPOA was working: Iran was compliant, enrichment was capped at 3.67%, the stockpile was reduced by 98%, and 24/7 IAEA monitoring was in place. The US unilaterally withdrew in 2018 despite verified compliance, reimposed maximum-pressure sanctions, and then assassinated Iran's top general in 2020. Every Iranian escalation followed a US provocation. Diplomatic offramps have repeatedly been floated: proposals for a cap-and-freeze interim understanding in exchange for partial sanctions relief, mediation offers from regional and outside powers, and indirect channels via Oman and Qatar that produced prisoner exchanges. Declaring diplomacy 'exhausted' — while maximum-pressure sanctions remain in place and after the US walked away from a verified-compliant agreement — is at least as much a political choice as a strategic verdict.",
      proponent_rebuttal:
        "The JCPOA was a temporary pause, not a solution. Its sunset clauses would have allowed Iran unrestricted enrichment by 2030-2031, creating a patient pathway to a bomb with international legitimacy. It never addressed Iran's ballistic missile program, which has since tested missiles capable of reaching Europe. It never addressed Iran's regional aggression, which has intensified. And Iran's record is not clean: the IAEA found undeclared nuclear material at multiple sites that Iran has not credibly explained, and the Mossad's 2018 seizure of Iran's nuclear archive documented a pre-2003 structured weapons-design program (the 'Amad Plan') that Iran had long denied existed — undercutting trust even if it did not show an active post-2003 program. Since JCPOA collapsed, Iran has rejected every diplomatic initiative — the EU's 2022 deal was abandoned after Iran demanded the IRGC be delisted as a terrorist organization, an obvious non-starter. At some point, 'more diplomacy' becomes a euphemism for allowing Iran to reach nuclear weapons capability while talking.",
      crux: {
        id: "diplomatic-exhaustion-test",
        title: "The Diplomatic Exhaustion Test",
        question:
          "Has diplomacy with Iran been genuinely exhausted, or was it undermined before it could succeed?",
        description:
          "Determine whether all realistic diplomatic pathways have been genuinely pursued and failed on their merits — or whether diplomatic failure was engineered by parties who preferred a military option. This requires assessing whether the US negotiated in good faith after 2018 and whether Iran's rejections of subsequent proposals were unreasonable.",
        methodology:
          "Map every formal diplomatic proposal from 2018-present, including the party that proposed it, the specific terms offered, the response from each side, and the stated reason for rejection. Cross-reference with contemporaneous statements from US, Iranian, and European officials to determine whether rejections were based on substantive objections or preconditions designed to prevent agreement. Apply the standard used in international law for 'exhaustion of remedies' — have all reasonable alternatives been attempted in good faith?",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A record of every formal proposal since 2018 with its terms, each side's response and the stated reason for rejection, checked against what US, Iranian and European officials said at the time.",
        },
        cost_to_verify:
          "$0 (diplomatic records, UN proceedings, and media reporting are publicly available)",
        falsification: {
          supporter_flip:
            "If mapping every formal proposal since 2018 showed realistic offramps — a cap-and-freeze interim deal, talks via Oman or Qatar — left unpursued or undercut by the US rather than rejected by Iran on the merits, the claim that diplomacy was exhausted would fail.",
          skeptic_flip:
            "If a full record of the talks confirmed that the 2022 EU-led revival draft collapsed over Iran's demand to delist the IRGC, and that a revived JCPOA would still expire around 2030-2031 without covering missiles, the view that diplomacy was abandoned would weaken.",
          common_ground:
            "Both sides agree the JCPOA capped enrichment at 3.67% under IAEA monitoring while it was in force, and that its core limits were set to lapse around 2030-2031.",
          live_disagreement:
            "Whether diplomacy failed on its merits — sunset clauses, missiles and Iran's rejections — or was abandoned when the US left a deal Iran was complying with, and whether offramps like a cap-and-freeze deal remain realistic.",
        },
      },
      evidence: [
        {
          id: "sunset-clauses",
          title:
            "JCPOA Sunset Clauses Would Allow Unrestricted Enrichment by 2030-2031",
          description:
            "Key JCPOA restrictions phase out on a staggered schedule: limits on first-generation centrifuge numbers and advanced-centrifuge R&D begin lapsing around 2025-2028, while the 3.67% enrichment cap and 300 kg stockpile limit run until roughly 2030-2031. Critics argue this created a 'patient pathway' to a bomb with international legitimacy, making the deal fundamentally flawed regardless of short-term compliance.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source:
            "Arms Control Association, 'The Joint Comprehensive Plan of Action (JCPOA) at a Glance'; USIP Iran Primer explainer on sunset timing",
          sourceUrl:
            "https://www.armscontrol.org/factsheets/joint-comprehensive-plan-action-jcpoa-glance",
          reasoning:
            "The staggered sunset clauses are a real, document-verifiable structural feature of the JCPOA (enrichment/stockpile limits to ~2030-2031). Directness is moderate because the clauses were designed to be revisited as confidence-building progressed — proponents read them as a floor to renegotiate, critics as an expiry date.",
        },
        {
          id: "failed-post-jcpoa-diplomacy",
          title:
            "Multiple Post-JCPOA Diplomatic Initiatives Have Stalled (2019-2024)",
          description:
            "EU-coordinated talks to revive the JCPOA reached a near-final draft in 2022 but collapsed in mid-2022, with Iran's demand that the IRGC be removed from the US Foreign Terrorist Organization list emerging as a central obstacle that the Biden administration refused. Subsequent indirect US-Iran talks via Oman, and later Qatari mediation, yielded prisoner exchanges and informal understandings but no restored nuclear agreement.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "USIP Iran Primer, 'Iran Deal: The IRGC is the Final Hurdle' (2022); contemporaneous reporting",
          sourceUrl:
            "https://iranprimer.usip.org/blog/2022/apr/07/iran-deal-irgc-final-hurdle",
          reasoning:
            "Corrected: the 2022 effort was a JCPOA-revival negotiation that stalled over the IRGC delisting demand — not specifically an 'interim deal freezing enrichment at 60%' (that framing conflated later informal proposals). Failure must be contextualized: talks proceeded under maximum-pressure sanctions, which Iran argues prevents good-faith bargaining, so whether these were genuine or performative remains the contested question.",
        },
        {
          id: "historical-diplomatic-success",
          title:
            "Historical Precedent: Diplomacy Resolved Comparable Nuclear Crises (Libya 2003, South Africa 1989)",
          description:
            "Libya agreed in December 2003 to eliminate its WMD programs — including an early-stage nuclear weapons effort — through US/UK diplomatic engagement. South Africa built six nuclear weapons during apartheid, then voluntarily abandoned the program in 1989 and dismantled the devices by 1991. Both cases show nuclear proliferation can be reversed without military action when incentives and security/political conditions align.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 5,
          },
          source:
            "Nuclear Threat Initiative (NTI), 'Nuclear Disarmament South Africa'",
          sourceUrl:
            "https://www.nti.org/analysis/articles/south-africa-nuclear-disarmament/",
          reasoning:
            "Historical precedents are real but replicability is low — Libya (a nascent program) and South Africa (an indigenous arsenal abandoned amid the end of apartheid) had very different strategic contexts from Iran's. Gaddafi's overthrow and death in 2011 after disarming is now cited by Iran as a reason not to disarm, which further complicates the analogy.",
        },
      ],
    },
  ],
  // The retired iran-war-justification map asked the forward-looking half
  // of the same fight (merged 2026-10-06); its names stay findable here.
  aliases: [
    "Is Military Action Against Iran Justified?",
    "Should the US strike Iran?",
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
    {
      title:
        "IAEA Board of Governors Report GOV/2025/24 — Verification and Monitoring in Iran (31 May 2025)",
      url: "https://www.iaea.org/sites/default/files/25/06/gov2025-24.pdf",
    },
    {
      title: "IAEA Focus: Verification and Monitoring in Iran (latest reports)",
      url: "https://www.iaea.org/newscenter/focus/iran",
    },
    {
      title: "Congressional Research Service: Iran's Nuclear Program — Status (RL34544)",
      url: "https://crsreports.congress.gov/product/pdf/RL/RL34544",
    },
    {
      title:
        "International Crisis Group: The Iran-US Standoff — Risks and Offramps",
      url: "https://www.crisisgroup.org/middle-east-north-africa/gulf-and-arabian-peninsula/iran",
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
    {
      id: "q4",
      title: "Would strikes actually prevent an Iranian bomb?",
      content:
        "Iran's nuclear knowledge cannot be bombed away. Key facilities like Fordow are buried deep underground. Would military strikes delay the program by years, or would they accelerate a political decision to weaponize — as happened with Iraq's Osirak strike in 1981?",
    },
    {
      id: "q5",
      title: "Are we repeating the Iraq WMD intelligence failure?",
      content:
        "The 2003 invasion of Iraq was justified by claims of weapons of mass destruction that turned out to be false. What institutional safeguards exist today to prevent a similar intelligence failure, and are they being applied to the Iran case?",
    },
  ],
};
