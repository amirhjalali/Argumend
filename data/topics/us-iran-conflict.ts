export const usIranConflictData = {
  id: "us-iran-conflict",
  title: "The US-Iran Conflict",
  question:
    "Has US pressure on Iran, up to the 2026 war, made the Middle East safer and served the US?",
  meta_claim:
    "US policy toward Iran — maximum-pressure sanctions, covert operations, the June 2025 strikes and the war the US and Israel began on 28 February 2026 — has made the Middle East safer and advanced American strategic interests.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: the war that began on 28 February 2026 (Operation
  // Epic Fury) killed Ayatollah Ali Khamenei on its first day; Hezbollah
  // entered on 2 March and the Houthis on 28 March; a 7 April ceasefire and
  // the June 2026 Islamabad memorandum both broke down by 8 July; a US naval
  // blockade of Iranian ports has run since 13 April; Qatar and Pakistan are
  // mediating again, and the IAEA still cannot say where Iran's 60% uranium is.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "The US-Israeli war on Iran, begun on 28 February 2026, has outlasted a ceasefire and a memorandum; as of 3 November there is no settlement. On 27 October the IAEA's chief told the UN Security Council it had seen no rebuilding at Iran's bombed nuclear sites, but could not verify the 440 kg of highly enriched uranium Iran held before the attacks. The fight is over what the pressure and the war have bought, and at what cost.",
    confidence: 88,
    source:
      "La Voce di New York, 'IAEA Cannot Verify Status of Iran's 440kg Uranium Stockpile' (29 October 2026), on Rafael Grossi's Security Council briefing of 27 October 2026",
    sourceUrl:
      "https://lavocedinewyork.com/en/un/2026/10/29/iaea-cannot-verify-status-of-irans-440kg-uranium-stockpile/",
  },
  simple_case: [
    "The answer bears on whether the US lifts its blockade for a reopened Strait of Hormuz, on oil prices, and on whether inspectors reach Iran's uranium.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Nuclear Program — set back or out of sight? (the retired
    // iran-war-justification map's threat-assessment pillar was folded in on
    // 2026-10-06; merged into this one on 2026-11-03, and the JCPOA cards
    // moved to the diplomacy pillar)
    // =========================================================================
    {
      id: "nuclear-program",
      title: "Nuclear Program: Set Back or Out of Sight?",
      short_summary:
        "The June 2025 strikes and the 2026 war wrecked Iran's known nuclear sites, and the IAEA has seen no rebuilding. But before the strikes Iran held an estimated 440.9 kg of 60% uranium, and inspectors have not verified it since. Whether the program was stopped, or the threat pushed out of sight — or was overstated as Iraq's was — is sharply disputed.",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Force has not removed the bomb risk; it has hidden it. Iran was verifiably compliant with the JCPOA when the US withdrew in 2018, and every escalation to 60% came afterwards. The June 2025 strikes and the war that began on 28 February 2026 wrecked facilities but not Iran's enrichment knowledge, and in June 2026 the IAEA reported that it 'cannot provide any information on the current size, composition or whereabouts of the stockpile' of enriched uranium. In March 2026 Iranian lawmakers tabled a bill to leave the Nuclear Non-Proliferation Treaty. And the case for war ran through the same institutional incentives that produced the Iraq WMD debacle: there is no public evidence Iran has diverted material to a weaponization track, the 2007 US NIE judged the structured weapons-design effort halted in 2003 with no public assessment reversing that, and in the June 2026 Islamabad memorandum Iran reaffirmed that it 'shall not procure or develop nuclear weapons.' The IAEA's first report after the war began, in June 2026, carried no major changes to its assessment of the program. Producing enough fissile material may have been weeks away, but turning it into a deliverable warhead is plausibly a year or more — the compressed-urgency framing the Senate Intelligence Committee later found 'overstated' in Iraq's case.",
      proponent_rebuttal:
        "The Iraq analogy is a false parallel. In Iraq, inspectors found nothing; in Iran, the IAEA documented about 408 kg of 60% enriched uranium as of May 2025, and estimated 440.9 kg before the June 2025 strikes — enough for about 10 weapons if further enriched — and a 2023 detection of particles at 83.7% at Fordow that has no routine civilian explanation. Iran de-designated experienced inspectors in 2023 and had the JCPOA cameras removed in 2022; since the strikes inspectors have not been let back to the bombed sites, and on 9 September 2026 the IAEA Board reported Iran to the UN Security Council for the first time in 20 years. Force did what the deal could not: the 2026 war hit what was left, including the Khondab heavy water complex near Arak and a yellowcake facility in Yazd in March 2026, and on 27 October 2026 the IAEA's director general told the UN Security Council the agency had identified no repair or rebuilding at the damaged facilities. Waiting for an unambiguous smoking gun could have meant waiting until Iran was already at the threshold.",
      crux: {
        id: "breakout-timeline-verification",
        title: "The Stockpile Verification Test",
        question:
          "Did the strikes set Iran's nuclear program back for good, or push its 60% uranium out of inspectors' sight?",
        description:
          "Determine whether the June 2025 strikes and the 2026 war ended Iran's ability to build a bomb on any relevant timescale, or whether its surviving 60% uranium and know-how still amount to a near-term weapons capability now hidden from inspectors — and whether that capability was understated or inflated in the case for war.",
        methodology:
          "Once inspectors return, compare IAEA verification of Iran's UF6 stockpile (kg at each enrichment level, and where it is held) with the pre-strike estimate of 440.9 kg of 60% uranium, and check whether any enrichment has resumed. Set that against independent technical assessments of the steps required beyond enrichment: conversion to metal, pit fabrication, implosion lens design, warhead miniaturization, and delivery vehicle integration, using timelines from physicists at Princeton's Science & Global Security program and the Federation of American Scientists.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "IAEA inspectors back at Isfahan, Fordow, Natanz and the other bombed sites, verifying how much of the estimated 440.9 kg of 60% uranium survives and where, and whether enrichment has resumed, set against independent estimates of how long the steps from material to deliverable warhead take.",
        },
        cost_to_verify:
          "$0 (IAEA reports are public; independent technical assessments available from FAS and Princeton SGS) — but it needs Iran to let inspectors back",
        falsification: {
          supporter_flip:
            "If inspectors returning to the bombed sites found most of the 60% uranium intact and within Iran's reach, enrichment resumed somewhere undeclared, or Iran left the NPT, the case that force set the program back for good would fail.",
          skeptic_flip:
            "If inspectors found the stockpile buried or destroyed, the sites unrebuilt and no enrichment resumed, the charge that force only hid the program would be hard to hold; if they found evidence of a weaponization effort, so would the charge that the threat was inflated.",
          common_ground:
            "Both sides agree the IAEA estimated Iran held 440.9 kg of 60% uranium before the June 2025 strikes, that inspectors have not verified it since, that the IAEA has identified no rebuilding at the bombed sites, and that turning such material into a deliverable warhead takes longer than enriching it.",
          live_disagreement:
            "Whether the strikes ended Iran's path to a bomb or pushed it out of sight, and whether acting again before an unambiguous sign of weaponization is prudent or repeats the Iraq error of compressed urgency.",
        },
      },
      evidence: [
        {
          id: "june-2025-strikes-nuclear",
          title: "US-Israel Strikes on Natanz, Fordow, and Isfahan (June 2025)",
          description:
            "On June 13, 2025, Israel launched its opening strikes (Operation Rising Lion) on Iranian nuclear and military targets, with over 200 fighter jets reportedly dropping 330+ munitions on roughly 100 targets. The US joined on June 22 with Operation Midnight Hammer, sending seven B-2 bombers and bunker-buster munitions against Fordow, Natanz, and Isfahan. The strikes destroyed surface infrastructure and centrifuge halls, but damage to the deepest underground enrichment halls was disputed, and a leaked US Defense Intelligence Agency assessment judged the setback to be months rather than years. Inspectors were not allowed back to the bombed sites, and in its June 2026 report the IAEA said its 'loss of continuity of knowledge over all previously declared nuclear material at affected facilities in Iran needs to be addressed with the utmost urgency' (Reuters, 5 June 2026).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "IAEA; Bulletin of the Atomic Scientists; CFR Global Conflict Tracker; Reuters via The Korea Times (5 June 2026) for the IAEA's continuity-of-knowledge finding",
          sourceUrl: "https://www.cfr.org/global-conflict-tracker/conflict/confrontation-between-united-states-and-iran",
          reasoning:
            "Proponents argue the strikes degraded Iran's nuclear capability. However, independent assessments note the underground facility survived, Iran retains its enrichment knowledge, and the strikes triggered the formal death of the JCPOA when Iran terminated the agreement in October 2025.",
        },
        {
          id: "iaea-no-weaponization-evidence",
          title: "IAEA and US Intelligence Found No Evidence of Active Weaponization (May 2025)",
          description:
            "Despite Iran's high enrichment levels, as of the IAEA's May 2025 reports neither the agency nor US intelligence agencies had found evidence that Iran was actively pursuing a nuclear weapon. The IAEA's May 2025 report noted that Iran's highest officials state nuclear weapons are incompatible with Islamic law. The agency emphasized that Iran is the only non-nuclear-weapon state enriching to 60%, calling it 'a matter of serious concern,' but stopped short of accusing Iran of weaponization.",
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
        {
          id: "no-rebuilding-2026",
          title: "IAEA Has Seen No Rebuilding at Iran's Bombed Nuclear Sites (27 October 2026)",
          description:
            "Speaking to the UN Security Council on 27 October 2026, IAEA Director General Rafael Grossi said the agency had not identified any repair or rebuilding at the facilities damaged in the 2025 and 2026 attacks, including Fordow, Natanz and several Isfahan sites. The 2026 war widened the damage beyond enrichment: in March 2026 strikes hit the Khondab heavy water complex near Arak and a yellowcake facility in Yazd (Al Jazeera, 28 March 2026). Grossi also cautioned that monitoring from outside cannot establish the actual situation without inspectors on the ground.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "La Voce di New York, 'IAEA Cannot Verify Status of Iran's 440kg Uranium Stockpile' (29 October 2026), on Grossi's Security Council briefing of 27 October 2026; Al Jazeera (28 March 2026) on the Arak and Yazd strikes",
          sourceUrl:
            "https://lavocedinewyork.com/en/un/2026/10/29/iaea-cannot-verify-status-of-irans-440kg-uranium-stockpile/",
          reasoning:
            "Proponents read months without visible reconstruction as proof that force did what the JCPOA could not: it stopped the program physically. Directness is moderate because the IAEA says itself that no rebuilding seen from outside is not the same as verification, and the same briefing said the agency could not account for Iran's highly enriched uranium.",
        },
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
        {
          id: "iaea-stockpile-unknown-2026",
          title: "IAEA Cannot Say How Much 60% Uranium Iran Has or Where It Is (June 2026)",
          description:
            "In its first quarterly report after the war began, sent to member states in June 2026, the IAEA said it 'cannot provide any information on the current size, composition or whereabouts of the stockpile of enriched uranium in Iran or whether Iran has suspended all enrichment-related activities,' and that it was unable to discharge its safeguards responsibilities. Iran had not told the agency what became of its stocks, which the IAEA last estimated at about 440 kg of 60% uranium. On 27 October 2026 Grossi told the UN Security Council the material still had to be verified and that inspectors had been available to return for many months.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "IAEA quarterly report on Iran (June 2026), as reported by the Associated Press via JNS (5 June 2026); La Voce di New York (29 October 2026) on Grossi's Security Council briefing",
          sourceUrl:
            "https://www.jns.org/news/world/iaea-cant-provide-any-information-on-tehrans-enriched-uranium",
          reasoning:
            "This is the IAEA's own measurement gap, not a national intelligence claim, which is what distinguishes it from Iraq in 2002-2003. It supports the view that the threat cannot be waved away. It does not show the material is being used for a weapon, and critics note the war is what pushed inspectors out, so directness is moderate.",
        },
        {
          id: "iaea-board-referral-2026",
          title: "IAEA Board Reports Iran to the UN Security Council, First Time in 20 Years (9 September 2026)",
          description:
            "On 9 September 2026 the IAEA's 35-member Board of Governors voted 23 to 3, with 8 abstentions, to report Iran to the UN Security Council over breaches of its non-proliferation obligations, on a text from the United States, Britain, France and Germany; Russia, China and Niger voted against. The resolution followed a June 2026 resolution telling Iran to declare its remaining enriched uranium and let inspectors verify it. Grossi called the lack of access 'a matter of serious proliferation concern.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "Reuters (Francois Murphy, Vienna) via Al-Monitor, 'IAEA board passes resolution reporting Iran to UN Security Council' (9 September 2026)",
          sourceUrl:
            "https://al-monitor.com/originals/2026/09/iaea-board-passes-resolution-reporting-iran-un-security-council",
          reasoning:
            "A two-thirds Board majority shows the concern is shared well beyond Washington and Jerusalem, which cuts against the claim that the threat is a US invention. Independence and directness are capped: the sponsors are parties to the dispute, Russia and China opposed, and a referral records non-compliance, not evidence of a weapons program.",
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
        "Iran funds Hezbollah, the Houthis, Hamas, and Iraqi militias. In the 2026 war its proxies held back at first, then Hezbollah drew Lebanon in on 2 March and the Houthis joined on 28 March and by October were striking Saudi airports. Whether the network has been degraded or only delayed is disputed.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Maximum pressure has failed to weaken Iran's proxy network and may have strengthened it. Despite decades of sanctions, Hezbollah grew into the most heavily armed non-state actor in the world. The Houthis disrupted global shipping through the Red Sea in 2023-2024, costing billions. Iraqi militias conducted 170+ attacks on US bases between October 2023 and January 2024. And in the 2026 war the proxies still came in: Hezbollah's fire from 2 March brought an Israeli invasion and a war in which Lebanon's health ministry counted 4,358 people killed by 5 September 2026, and Houthi missiles killed at least 13 people at Riyadh's King Khalid International Airport on 10 October 2026. Iran's 'Axis of Resistance' strategy was a direct response to US encirclement — 40,000+ troops and dozens of bases ringing Iran — making proxies a rational asymmetric deterrent rather than pure aggression.",
      proponent_rebuttal:
        "Iran spends an estimated $700 million to $1 billion annually funding Hezbollah alone and arms the Houthis, Hamas, and Iraqi militias to destabilize the region. These groups have killed hundreds of Americans, launched thousands of rockets at Israel, and disrupted international shipping. The June 2025 war and the 2026 war significantly degraded Iran's ability to coordinate with proxies — notably, Hezbollah's first salvo was small and the Houthis waited a month before joining, rather than the coordinated defense Tehran had threatened. After Israel's 2026 campaign in Lebanon, a US-brokered framework of 26 June 2026 made Hezbollah's disarmament the condition for peace in Lebanon, though Hezbollah rejected it. Without US pressure, Iran would project power unchecked across the Levant, Gulf, and Red Sea.",
      crux: {
        id: "proxy-network-degradation",
        title: "The Proxy Network Capacity Assessment",
        question:
          "Have pressure and the 2026 war weakened Iran's proxies, or can they still widen the war?",
        description:
          "If US policy has genuinely degraded Iran's proxy capabilities, we should see measurable declines in proxy armament, operational tempo, and territorial control over the period of maximum pressure and the 2026 war. If the proxies can still open new fronts — as Hezbollah did in Lebanon on 2 March 2026 and the Houthis against Israel and Saudi Arabia — US policy has failed on its own terms.",
        methodology:
          "Compare proxy group metrics across four periods: pre-maximum-pressure (2015-2018), during JCPOA withdrawal and sanctions (2018-2024), after the June 2025 strikes, and during and after the 2026 war. Metrics include: Hezbollah rocket inventory and fire, Houthi missile and drone launches at shipping, Israel and Saudi Arabia, Iraqi militia attacks on US bases, and Hamas operational capacity. Use ACLED conflict data, CSIS assessments, and UN Panel of Experts reports.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Independent counts of weapons seizures, attacks, fighters and territory held by Hezbollah, the Houthis and Iraqi militias, tracked year by year from 2015 through the 2026 war by monitors such as ACLED and UN panels of experts.",
        },
        cost_to_verify:
          "$500K-1M (Comprehensive multi-country conflict analysis requiring classified and open-source intelligence fusion)",
        falsification: {
          supporter_flip:
            "If proxy metrics across 2015-2018, 2018-2024 and 2025-2026 — Hezbollah's rocket inventory, Houthi launches, militia attacks on US bases — showed capacity growing under maximum pressure, and the Houthis kept striking Saudi airports and shipping after a US-Iran deal, the policy would have failed on its own terms.",
          skeptic_flip:
            "If independent counts showed Hezbollah's and the Houthis' 2026 attacks falling well short of what they could do in 2023-2024, and Hezbollah accepting disarmament in Lebanon, the network would look broken by pressure rather than strengthened by it.",
          common_ground:
            "Both sides agree Iran funds Hezbollah at an estimated $700 million to $1 billion a year, that its proxies struck hard in 2023-2024, and that in 2026 they held back at first and then joined the war: Hezbollah on 2 March, the Houthis on 28 March.",
          live_disagreement:
            "Whether the proxies' slow, staggered entry into the 2026 war shows a network degraded by pressure, or whether the Lebanon war and the Houthi strikes on Saudi Arabia show it can still widen any war on Iran.",
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
          title: "Iran's Proxies Held Back in the First Weeks of the February 2026 Strikes",
          description:
            "When the US and Israel began Operation Epic Fury on 28 February 2026, Iran's proxy network did not mount the immediate, coordinated multi-front response Tehran had long threatened. Foreign Policy's 2 March assessment was headlined 'Iran's Proxies Are Out for Themselves for Now': Hezbollah's first barrage was small, Iraqi militias issued threats but held back, and the Houthis, with a May 2025 deal with Trump to protect, stayed out. The restraint was partial and temporary. Hezbollah's 2 March rocket and drone fire, its first claimed attack on Israel since the November 2024 ceasefire, drew Israeli strikes across Lebanon and a wider Lebanon war, and the Houthis joined the war on 28 March by firing ballistic missiles at Israel.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Foreign Policy, Anchal Vohra, 'Iran's Proxies Are Out for Themselves for Now' (2 March 2026); Al Jazeera (2 March 2026) on Hezbollah's fire; Bloomberg (28 March 2026) on the Houthis entering the war",
          sourceUrl: "https://foreignpolicy.com/2026/03/02/iran-war-hezbollah-lebabon-houthis-yemen-iraq-proxies/",
          reasoning:
            "The proxies' slow, staggered entry, rather than the coordinated response Tehran had threatened, suggests that years of pressure — combined with the destruction of Hezbollah's leadership in 2024 and the Houthi deal — may have degraded the 'Axis of Resistance' as a cohesive force. However, Hezbollah and the Houthis did enter the fighting within a month, so the evidence shows weakened coordination, not a network that stayed out; the early delay may also reflect self-interested calculations by proxy groups rather than a loss of capability.",
        },
        {
          id: "hezbollah-donation-appeal-2019",
          title: "Under 2019 sanctions, Hezbollah publicly appealed to its base for money",
          description:
            "In a televised speech in March 2019, as the US tightened sanctions on Iran and on Hezbollah itself, Hassan Nasrallah said: 'I announce today that we are in need of the support of our popular base', adding that the 'financial difficulties that we may face are a result of this (financial) war' (Al Jazeera, 9 March 2019). Bloomberg reported in April 2019 that he was anticipating a US move to tighten sanctions on Iranian oil exports, Hezbollah's main financial and military backer, and that supporters said the group was 'struggling to pay members and has reduced some benefits'. The same report quoted analysts saying tighter sanctions were unlikely to make Iran quickly shrink its regional footprint, and Hezbollah went on to fight Israel in 2023-2024 and again from March 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 4,
          },
          source:
            "Al Jazeera, 'Lebanon's Hezbollah appeals for donations to combat sanctions' (9 March 2019); Bloomberg, 'Hezbollah donation boxes show Trump's sanctions are hurting Iran' (via Gulf News, April 2019)",
          sourceUrl: "https://www.aljazeera.com/news/2019/3/9/lebanons-hezbollah-appeals-for-donations-to-combat-sanctions",
          reasoning:
            "The best direct sign that maximum pressure reached a proxy's finances: the group's own leader said so on television. It is weighted low. Directness is 4 because a cash squeeze is not a loss of fighting capacity, and the crux turns on capacity; replicability is 5 because the 'struggling to pay members' claim comes from supporters quoted in one wire report, not from audited figures. Hezbollah's later wars show the squeeze did not stop it fighting, which the card states.",
        },
        {
          id: "proxies-widen-war-2026",
          title: "Proxies Widened the 2026 War: A Lebanon War and Houthi Strikes on Riyadh",
          description:
            "Hezbollah's fire on 2 March 2026 drew an Israeli air campaign and invasion; Lebanon's health ministry counted 4,358 people killed and 12,359 injured from 2 March to 5 September 2026, and Israel has occupied a 'buffer' zone in southern Lebanon since March (Al Jazeera, 6 September 2026). Two US-brokered agreements were signed in June, but Hezbollah leader Naim Qassem called the 26 June framework, which was contingent on Hezbollah's disarmament, 'null and void.' In Yemen, a Houthi attack on Riyadh's King Khalid International Airport on 10 October 2026 killed at least 13 people and wounded more than 300, and the Houthis kept firing at the Saudi capital on the following days.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Al Jazeera, 'Houthi missile attack targets Saudi capital Riyadh for third day in a row' (12 October 2026); Al Jazeera, 'Nearly 9,000 killed in Israeli attacks on Lebanon since 2023' (6 September 2026), citing Lebanon's health ministry",
          sourceUrl:
            "https://www.aljazeera.com/news/2026/10/12/houthi-missile-attack-targets-saudi-capital-riyadh-for-third-day-in-a-row",
          reasoning:
            "Whatever their early hesitation, two of Iran's partners opened new fronts in 2026, at a heavy cost in Lebanon and Saudi Arabia, which is hard to square with a network broken by pressure. Directness is not higher because the Houthis are fighting their own war for control of Yemen against Saudi-backed forces, and Lebanon's toll is driven by Israeli strikes as much as by Hezbollah's capacity.",
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
    // PILLAR 3: Sanctions & Economic Pressure
    // =========================================================================
    {
      id: "sanctions-effectiveness",
      title: "Sanctions & Economic Pressure",
      short_summary:
        "US sanctions crashed Iran's currency, halved its GDP and caused severe civilian hardship, and since 13 April 2026 a US naval blockade of Iranian ports has cut its oil revenue further. Iran kept funding proxies and exporting oil covertly — so does economic pressure coerce the regime, or mainly punish its citizens?",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Sanctions have devastated the Iranian population without changing regime behavior. Iran's GDP fell from $600 billion to $356 billion. The rial collapsed from 42,000 to over 1.4 million per dollar. Food inflation exceeds 72%. Six million patients lack adequate medicine, including 40,000 hemophiliacs unable to obtain blood-clotting medication. Meanwhile, the regime kept enriching uranium until the 2025 strikes, funding proxies with an estimated $700 million to $1 billion annually for Hezbollah alone, and finding covert oil export routes through China. The 2026 war and blockade deepened the damage: by August 2026 the rial had effectively collapsed and food prices had surged, and on 25 October 2026 Iran's parliament speaker said natural gas consumption across the country had to be cut by 10%. Sanctions are collective punishment of 88 million civilians that strengthens regime narratives of victimhood.",
      proponent_rebuttal:
        "Sanctions are a legitimate, non-violent tool of statecraft that targets the regime's ability to fund terrorism and nuclear proliferation. Humanitarian goods like food and medicine are explicitly exempt under OFAC guidelines. Maximum pressure brought Iran to the negotiating table in 2025, demonstrating that economic pain drives diplomatic engagement. Iran diverts resources to proxy militias and nuclear programs rather than civilian welfare — the regime, not sanctions, is responsible for civilian suffering. UN snapback sanctions in late 2025 demonstrated international consensus that Iran's nuclear violations warranted economic consequences. And in 2026 the blockade became the lever: Iran's offer of 2 November 2026 to reopen the Strait of Hormuz and resume nuclear talks was conditioned first on the US lifting its naval blockade and repealing sanctions.",
      crux: {
        id: "sanctions-civilian-impact",
        title: "The Civilian Impact Assessment",
        question:
          "Does economic pressure on Iran, from sanctions to the 2026 blockade, move its leaders or mainly punish civilians?",
        description:
          "If sanctions and the blockade cause civilian suffering comparable to armed conflict — through denial of medicine, food insecurity, and economic collapse — without changing what Iran's leaders do, they are de facto economic warfare regardless of humanitarian exemptions on paper. Two tests decide it: whether humanitarian exemptions function in practice or are nullified by banking over-compliance, and whether Tehran's negotiating terms move as the pressure bites.",
        methodology:
          "Commission an independent epidemiological study comparing Iranian civilian mortality rates, disease outcomes, and nutritional status before and after each sanctions escalation (2012, 2018, 2025) and the April 2026 blockade. Cross-reference with WHO, UNICEF, and Iranian health ministry data. Measure the gap between humanitarian goods legally permitted and actually delivered by tracking OFAC license approvals versus actual import volumes, and set Iran's negotiating positions in 2025-2026 against its oil revenue over the same months.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Customs and trade records of medicine and food imports into Iran before and after each sanctions round and the 2026 blockade, alongside shortages of specific drugs reported by hospitals and the World Health Organization, records of how many licensed humanitarian payments banks processed or refused, and a record of whether Iran's negotiating terms moved as its oil revenue fell.",
        },
        cost_to_verify:
          "$2-5M (Comprehensive independent epidemiological study requiring on-ground access in Iran)",
        falsification: {
          supporter_flip:
            "If tracking OFAC license approvals against actual imports showed permitted medicine and food largely failing to arrive because banks over-comply, and civilian health worsened after each sanctions escalation, the sanctions would amount to economic warfare on civilians whatever the exemptions say on paper.",
          skeptic_flip:
            "If import tracking showed exempt food and medicine reaching Iran under OFAC guidelines, shortages traced to regime diversion toward proxies and the nuclear program, and pressure yielding talks like the five Oman-brokered rounds of 2025 and Iran's November 2026 offer to reopen Hormuz in return for an end to the blockade, 'collective punishment' would describe the sanctions poorly.",
          common_ground:
            "Both sides agree sanctions have badly damaged Iran's economy — GDP from about $600 billion to $356 billion, the rial from 42,000 to over 1.4 million per dollar — that the 2026 blockade cut its oil revenue further, and that Iranian civilians are suffering, whoever bears the blame.",
          live_disagreement:
            "Whether economic pressure coerces the regime, bringing it to talks and putting lifting the blockade at the top of its demands, or mainly punishes civilians while the regime holds on — which turns on whether humanitarian exemptions deliver and whether Tehran's terms actually move.",
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
          title: "Iran Kept About 1.5M Barrels/Day Flowing Through Covert Channels to China (2024-2025)",
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
            "Oil export tracking data comes from multiple independent sources including ship-tracking firms and energy agencies. The persistence of significant exports despite maximum pressure demonstrates a fundamental limitation of the sanctions regime, undermining claims of effectiveness. The US naval blockade of Iranian ports from 13 April 2026 has since targeted that trade directly; its effect on Iran's terms is on the blockade card.",
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
    // PILLAR 4: Diplomacy and the Way Out (folded in from the retired
    // iran-war-justification map, 2026-10-06)
    // =========================================================================
    {
      id: "diplomatic-alternatives",
      title: "Diplomacy and the Way Out",
      short_summary:
        "Whether diplomacy failed before the war or was sabotaged is still argued. The live question now is what follows: a deal that reopens Hormuz for sanctions relief and settles the nuclear file later, or more force until Iran gives up its uranium. A June 2026 memorandum collapsed by 8 July; talks via Qatar and Pakistan resumed in the autumn.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Diplomacy has not been exhausted — it was deliberately abandoned. The JCPOA was working: Iran was compliant, enrichment was capped at 3.67%, the stockpile was reduced by 98%, and 24/7 IAEA monitoring was in place. The US unilaterally withdrew in 2018 despite verified compliance, reimposed maximum-pressure sanctions, and then assassinated Iran's top general in 2020. Every Iranian escalation followed a US provocation. Diplomatic offramps have repeatedly been floated: proposals for a cap-and-freeze interim understanding in exchange for partial sanctions relief, mediation offers from regional and outside powers, and indirect channels via Oman and Qatar that produced prisoner exchanges. Even the war ran through talks: after 21 hours in Islamabad on 11-12 April 2026 Trump said 'most points were agreed to,' and in June the two governments agreed a 14-point memorandum; each pause was broken by fresh attacks, not by an absence of terms. Declaring diplomacy 'exhausted' — while maximum-pressure sanctions remain in place and after the US walked away from a verified-compliant agreement — is at least as much a political choice as a strategic verdict.",
      proponent_rebuttal:
        "The JCPOA was a temporary pause, not a solution. Its sunset clauses would have allowed Iran unrestricted enrichment by 2030-2031, creating a patient pathway to a bomb with international legitimacy. It never addressed Iran's ballistic missile program, which has since tested missiles capable of reaching Europe. It never addressed Iran's regional aggression, which has intensified. And Iran's record is not clean: the IAEA found undeclared nuclear material at multiple sites that Iran has not credibly explained, and the Mossad's 2018 seizure of Iran's nuclear archive documented a pre-2003 structured weapons-design program (the 'Amad Plan') that Iran had long denied existed — undercutting trust even if it did not show an active post-2003 program. Since JCPOA collapsed, Iran has rejected every diplomatic initiative — the EU's 2022 deal was abandoned after Iran demanded the IRGC be delisted as a terrorist organization, an obvious non-starter. At some point, 'more diplomacy' becomes a euphemism for allowing Iran to reach nuclear weapons capability while talking. It took a war and a blockade to get Iran's written agreement, in the June 2026 Islamabad memorandum, to resolve the disposition of its stockpiled enriched material — at minimum by 'down blending on site under the supervision of the IAEA' — and Vice President Vance said on 2 November 2026 that any deal must include 'a firm commitment and a verifiable commitment' that Iran will not rebuild its program.",
      crux: {
        id: "diplomatic-exhaustion-test",
        title: "The Deal-or-Force Test",
        question:
          "Can a negotiated deal now keep Iran from a bomb, or has only force ever moved Tehran?",
        description:
          "Determine whether a negotiated settlement can secure what the war set out to secure — no Iranian bomb and verified control of its 60% uranium — or whether every diplomatic opening since 2018 has either failed on its merits or come only after force. This requires assessing whether the US negotiated in good faith after 2018, whether Iran's rejections were unreasonable, and why each 2026 pause, from the 7 April ceasefire to the June memorandum, broke down.",
        methodology:
          "Map every formal diplomatic proposal from 2018 to the present, including the 2026 Islamabad talks, the June 2026 memorandum and the Qatari and Pakistani proposals of October-November 2026: who proposed it, the terms offered, each side's response, and the stated reason for rejection or collapse. Cross-reference with contemporaneous statements from US, Iranian, and European officials, and with the record of which side's attacks preceded each breakdown.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "The text and first months of any agreement: a named mechanism and deadline for disposing of the 60% stockpile, the date IAEA inspectors are readmitted, and the record of strikes and attacks at sea after signing, set beside the June 2026 memorandum that broke down within weeks.",
        },
        cost_to_verify:
          "$0 (diplomatic records, UN proceedings, and media reporting are publicly available; the decisive test is whether inspectors return)",
        falsification: {
          supporter_flip:
            "If a deal reached without new strikes put inspectors back at the bombed sites and verified the down-blending of Iran's 60% stockpile, or if the record showed realistic offramps since 2018 undercut by the US rather than rejected by Iran on the merits, the claim that only force moves Tehran would fail.",
          skeptic_flip:
            "If the record of 2026 showed each negotiated pause collapsing because Iran attacked shipping or broke its terms, and Iran's positions moving only under military pressure, as the 2022 revival draft collapsed over its demand to delist the IRGC, the view that diplomacy alone could have done it would weaken.",
          common_ground:
            "Both sides agree the JCPOA capped enrichment at 3.67% under IAEA monitoring while it was in force, that the June 2026 Islamabad memorandum had broken down by 8 July 2026, and that any deal has to account for Iran's 60% uranium.",
          live_disagreement:
            "Whether the way out is a deal that trades Hormuz and sanctions relief now for nuclear terms later, or more pressure until Iran gives up its uranium first — and whether the war made such a deal more reachable or less.",
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
            "After the US withdrawal, Iran progressively exceeded JCPOA limits: breaching the 300 kg low-enriched uranium cap in 2019, enriching to 20% in January 2021, then 60% in April 2021. By May 2025, Iran had amassed 408.6 kg of 60% enriched uranium — a roughly 50% increase since the February 2025 report. The IAEA had earlier detected particles enriched to 83.7% at Fordow in January 2023. By the IAEA's yardstick, about 42 kg of 60% uranium is theoretically enough for one bomb if further enriched to 90%, so the May 2025 stockpile was enough in principle for about nine; IAEA chief Rafael Grossi said it was enough for 'several' bombs if Iran chose to make them.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "IAEA GOV/2025/24, Verification and Monitoring in the Islamic Republic of Iran (31 May 2025); Associated Press via PBS NewsHour (31 May 2025) for the 42 kg yardstick and Grossi's comment",
          sourceUrl: "https://www.iaea.org/sites/default/files/25/06/gov2025-24.pdf",
          reasoning:
            "IAEA data is the gold standard for nuclear monitoring. The rapid stockpiling represents a genuine proliferation threat that proponents cite as justification for military action. However, context matters: this escalation began only after the US withdrew from the deal.",
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
        {
          id: "islamabad-memorandum-2026",
          title: "Islamabad Memorandum: Iran Agreed to Dispose of Its Enriched Stockpile (June 2026)",
          description:
            "The 14-point Islamabad Memorandum of Understanding, which the White House sent to Congress on 18 June 2026, declared an 'immediate and permanent termination of military operations on all fronts,' including Lebanon, and set 60 days to negotiate a final deal. Iran reaffirmed that it 'shall not procure or develop nuclear weapons,' and both sides agreed to resolve the disposition of stockpiled enriched material through a mechanism to be agreed, with the minimum methodology to be 'down blending on site under the supervision of the IAEA'; enrichment itself was left to the final deal. In return the US was to begin removing its naval blockade at once and end it within 30 days, issue waivers for Iranian oil exports, make frozen funds usable and end sanctions on a schedule set in the final deal, while Iran arranged toll-free passage for commercial ships through the Strait of Hormuz for 60 days.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Reuters factbox, 'The 14-point US-Iran pact the White House sent to Congress' (18 June 2026), via ThePrint",
          sourceUrl:
            "https://theprint.in/world/factbox-the-14-point-us-iran-pact-white-house-sent-to-congress/2963924/",
          reasoning:
            "Proponents point out that Iran's written commitment on its 60% material came only after it had been bombed and blockaded, which is the case that force creates diplomatic leverage. Directness is moderate: the memorandum deferred enrichment, it broke down by 8 July 2026, and critics read its sanctions and reconstruction terms as proof that a deal was available without a war.",
        },
        {
          id: "pauses-collapsed-2026",
          title: "Each 2026 Pause Broke Down: The Ceasefire and Memorandum Collapsed by 8 July",
          description:
            "A two-week ceasefire agreed on 7 April 2026 was followed by failed talks in Islamabad on 11-12 April and a US naval blockade of Iranian ports; the June memorandum then gave way on 8 July 2026, when Iranian attacks on commercial shipping in the Strait of Hormuz drew overnight US strikes and Trump said of the ceasefire, 'to me, I think it's over.' By late October 2026 talks were running again through Qatari and Pakistani mediators, and on 2 November Iran offered to reopen Hormuz and resume nuclear talks within two days if its conditions were met, while Trump said the war would end 'one way or the other.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source:
            "E&E News by POLITICO, 'Trump says Iran ceasefire is \"over\"' (8 July 2026); CFR Global Conflict Tracker (updated 23 October 2026) for the 7 April ceasefire; Al Jazeera (2 November 2026) for the latest offer and Trump's remark",
          sourceUrl: "https://www.eenews.net/articles/trump-says-iran-ceasefire-is-over/",
          reasoning:
            "Eight months of strikes, ceasefires and memoranda have not produced a durable settlement, which critics read as proof that force has not delivered what it promised and that the region is less stable, not more. Proponents answer that each breakdown began with Iranian attacks at sea and that Tehran keeps returning to the table because the pressure works, so directness is limited.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 5: Costs, Oil and the Home Front (added 2026-11-03)
    // =========================================================================
    {
      id: "war-costs-and-gains",
      title: "Costs, Oil and the Home Front",
      short_summary:
        "The 2026 war degraded Iran's navy, missile fire and leadership, but Iran choked the Strait of Hormuz, oil stayed near or above $100, and the Pentagon put the US cost at $47.1 billion with 18 service members killed through 16 October 2026. Whether the gains outlast the costs divides analysts, voters and Congress.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Iran lost battles but has made the war expensive for everyone else. Shipping through Hormuz fell from more than 100 ships a day to an average of about five, UKMTO recorded a record 30 attacks on commercial vessels in October 2026 alone, and the US Energy Information Administration expects Brent crude to average $105 a barrel in the last quarter of 2026. The Pentagon puts the US cost at $47.1 billion through 16 October, with 18 service members killed and more than 860 injured. The regime survived its supreme leader's death: Mojtaba Khamenei succeeded his father and Iran's political leadership 'has, however, remained largely the same,' Al Jazeera reported in August 2026. In AP-NORC polling released on 1 October 2026, 69 percent of US adults said the war has not been worth fighting, and the Senate passed a war powers resolution 50 to 48 on 23 June 2026 before narrowly defeating another, 49 to 50, on 24 September.",
      proponent_rebuttal:
        "The military record is lopsided. Within a week of the war's beginning, CSIS's Daniel Byman wrote, Iran's missile attacks 'fell by 90 percent'; the US military says it has sunk over 90 percent of Iran's navy, and Israel has killed over 250 Iranian leaders, including the supreme leader and almost all senior military commanders. The IAEA has identified no rebuilding at Iran's bombed nuclear sites. The blockade has made sanctions relief Iran's first demand, and Iran is offering to reopen Hormuz to get it. Oil markets react to the prospect of a deal — Brent fell 7.4% to $105.03 on 2 November 2026 as Trump said a deal was coming together — which proponents read as the price of finishing the job, not proof the job failed.",
      crux: {
        id: "lasting-gain-test",
        title: "The Lasting-Gain Test",
        question:
          "Will the damage to Iran's military outlast the war's costs, or will Iran rebuild while the costs go on?",
        description:
          "The war's supporters claim durable gains: a crippled navy, missile force and nuclear program and a regime that must bargain. Its critics count costs that are already paid — a choked strait, oil near or above $100, US and regional dead — against gains that may not last if Iran rebuilds. The test is what Iran can still do once the fighting stops.",
        methodology:
          "Track, for at least a year after any settlement: Iran's missile and drone launches and launcher counts from open-source and official tallies; attacks on shipping in and near Hormuz from UKMTO; tanker transits through the strait; IAEA verification of Iran's nuclear sites and material; and Brent prices from the EIA series. Compare each against the pre-war baseline of 2025 and the wartime peak of 2026.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A year of post-war counts of Iran's missile launches and launchers, attacks on shipping recorded by UKMTO, tanker traffic through Hormuz and IAEA-verified nuclear activity, set against the 2025 baseline and Brent prices over the same period.",
        },
        cost_to_verify:
          "$0-1M (shipping, price and IAEA data are public; launcher counts rely on official and open-source military tracking)",
        falsification: {
          supporter_flip:
            "If Hormuz traffic stayed at a fraction of its pre-war level, Iran kept firing at ships and Gulf states into 2027, and inspectors found its 60% uranium intact, the case that the war bought lasting security for its cost would fail.",
          skeptic_flip:
            "If, once a deal reopened Hormuz, Iran's missile fire and attacks on shipping stayed far below their pre-war capacity, its nuclear sites stayed unrebuilt under inspection, and oil fell back toward pre-war prices, the claim that the war's costs bought nothing would be hard to hold.",
          common_ground:
            "Both sides agree Iran's navy, missile fire and leadership took heavy losses, that Hormuz shipping and oil prices have been badly disrupted since 28 February 2026, and that the Pentagon put the US cost at $47.1 billion through 16 October 2026.",
          live_disagreement:
            "Whether the military damage is durable enough to outweigh a choked strait, $100-plus oil and a regime that survived — and whether Congress or the president should decide when the war ends.",
        },
      },
      evidence: [
        {
          id: "military-degradation-2026",
          title: "Iran's Missile Fire Fell 90% in a Week; US Says It Sank Over 90% of Iran's Navy (CSIS, April 2026)",
          description:
            "Writing on 2 April 2026, CSIS's Daniel Byman found that within a week of the war's beginning Iran's missile attacks 'fell by 90 percent due to U.S. and Israeli bombing and suppression efforts,' that Iran had lost many of its missile launchers and weapons production sites, that the US military claims it has sunk over 90 percent of Iran's navy, and that Israel had killed over 250 Iranian leaders, including the supreme leader and almost all its senior military leadership. By August 2026 Trump was claiming that about 82 percent of Iran's ballistic missiles were gone (Al Jazeera, 28 August 2026).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Daniel Byman, 'Who Is Winning the Iran War?', CSIS (2 April 2026); Al Jazeera, 'After six months of war, what have US, Iran gained and lost?' (28 August 2026)",
          sourceUrl: "https://www.csis.org/analysis/who-winning-iran-war",
          reasoning:
            "These are the gains supporters say no sanctions regime could have bought. Independence is capped because the navy and missile figures are US and Israeli claims; Byman himself judged that the regime 'appears to have a firm hold on power' and that Iran's strategy of pushing costs outward was working, and Al Jazeera reported in August that Iran was still firing missiles.",
        },
        {
          id: "blockade-leverage-2026",
          title: "Lifting the Blockade Became Tehran's First Demand (November 2026)",
          description:
            "On 2 November 2026 Iran said its seven-step plan to end the war, covering a swift reopening of the Strait of Hormuz and a return to talks on its nuclear program, could now be carried out within two days rather than a week. Its conditions include the US lifting its naval blockade of Iranian ports, repealing sanctions, guaranteeing an end to strikes and a complete regional ceasefire, especially in Lebanon. Al Jazeera had reported in August 2026 that the blockade cut Iran's oil revenue by at least $6 billion.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Al Jazeera and AP, 'Trump signals progress on Iran deal as Tehran pushes faster ceasefire' (2 November 2026); Al Jazeera (28 August 2026) on the blockade's revenue cost",
          sourceUrl:
            "https://www.aljazeera.com/news/2026/11/2/iran-pushing-accelerated-plan-for-ceasefire-talks-with-us",
          reasoning:
            "That Tehran leads with the blockade and sanctions suggests economic and naval pressure is what it most wants removed — leverage for the US. But Iran's foreign ministry spokesman gave no indication that Tehran had changed its demands, and Hormuz itself is Iran's counter-leverage, so the card shows a bargaining position, not a settled outcome.",
        },
        {
          id: "hormuz-oil-shock-2026",
          title: "Hormuz Traffic Fell From 100+ Ships a Day to About Five; EIA Sees $105 Brent in Late 2026",
          description:
            "After the war began, Iran in effect closed the Strait of Hormuz, which normally carries more than a fifth of the world's oil and natural gas; traffic slumped from more than 100 ships per day to an average of about five (Al Jazeera, 28 August 2026). In its 6 October 2026 Short-Term Energy Outlook the US Energy Information Administration forecast that Brent crude will average $96 a barrel in 2026 and $105 in the fourth quarter, assuming Middle East oil flows 'will remain constrained through the fourth quarter of 2026.' UKMTO recorded 30 attacks on commercial vessels in the region in October 2026, a record (CBS News, 3 November 2026).",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "US Energy Information Administration, Short-Term Energy Outlook (6 October 2026); Al Jazeera (28 August 2026) for Hormuz traffic; CBS News live updates (3 November 2026) for UKMTO's October count",
          sourceUrl: "https://www.eia.gov/outlooks/steo/",
          reasoning:
            "Price and shipping data are independently measured and directly bear on whether the war served US interests: the strait Iran had long threatened to close was closed, and Americans pay for it at the pump. Proponents answer that the disruption ends with a deal the pressure is forcing, so the cost is temporary.",
        },
        {
          id: "us-cost-casualties-2026",
          title: "Pentagon: $47.1 Billion and 18 US Service Members Killed Through 16 October 2026",
          description:
            "A Pentagon estimate shared with Congress put the cost of the war from 28 February to 16 October 2026 at $47.1 billion, more than 60% of it munitions, and congressional officials said the figures are almost certainly on the low side. The Pentagon says 18 service members have been killed and more than 860 injured.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source:
            "Eric Schmitt, The New York Times, via The Philadelphia Inquirer (28 October 2026)",
          sourceUrl:
            "https://www.inquirer.com/news/nation-world/iran-war-cost-rises-pentagon-20261028.html",
          reasoning:
            "Official figures, likely understated, of what the war has cost Americans so far. Whether the cost was worth paying depends on the gains on the other side of this pillar, so directness is moderate.",
        },
        {
          id: "public-opinion-war-powers-2026",
          title: "69% of Americans Say the War Has Not Been Worth Fighting; Congress Split on War Powers",
          description:
            "In an AP-NORC survey of more than 2,000 US adults released on 1 October 2026, 69 percent said the war in Iran has not been worth fighting, five points more than in July, and 71 percent disapproved of how Trump is handling Iran. In Congress, the Senate adopted a House-passed concurrent resolution on Iran 50 to 48 on 23 June 2026, the first such measure to clear both chambers, and on 24 September 2026 narrowly defeated another, 49 to 50, with four Republicans voting yes and one Democrat no.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 3,
          },
          source:
            "Al Jazeera on the AP-NORC poll (1 October 2026); CBS News (23 June 2026) and CNBC (24 September 2026) on the Senate votes",
          sourceUrl:
            "https://www.aljazeera.com/news/2026/10/1/most-americans-say-us-israel-war-on-iran-not-worth-fighting-poll",
          reasoning:
            "Public opinion does not decide whether a war made a region safer, so directness is low. It matters to the 'served US interests' half of the question: a war most voters think was not worth it, fought without a clear vote of Congress, is harder to sustain. Supporters reply that public support for wars often tracks short-run costs such as fuel prices rather than strategic results.",
        },
      ],
    },
  ],
  // The retired iran-war-justification map asked the forward-looking half
  // of the same fight (merged 2026-10-06); its names stay findable here.
  aliases: [
    "Is Military Action Against Iran Justified?",
    "Should the US strike Iran?",
    "Has US pressure on Iran made the Middle East safer and served US interests?",
    "Was the Iran war worth it?",
    "Should the US make a deal with Iran or resume strikes?",
  ],
  references: [
    {
      title: "Trump signals progress on Iran deal as Tehran pushes faster ceasefire - Al Jazeera (2 November 2026)",
      url: "https://www.aljazeera.com/news/2026/11/2/iran-pushing-accelerated-plan-for-ceasefire-talks-with-us",
    },
    {
      title: "Iran War Updates (live, 3 November 2026) - CBS News",
      url: "https://www.cbsnews.com/live-updates/iran-war-us-trump-negotiations-midterms/",
    },
    {
      title: "Iran leader Khamenei killed in massive US and Israeli attack - AFP via Al-Monitor (28 February 2026)",
      url: "https://app.al-monitor.com/originals/2026/02/iran-leader-khamenei-killed-massive-us-and-israeli-attack",
    },
    {
      title: "Factbox: The 14-point US-Iran pact White House sent to Congress - Reuters via ThePrint (18 June 2026)",
      url: "https://theprint.in/world/factbox-the-14-point-us-iran-pact-white-house-sent-to-congress/2963924/",
    },
    {
      title: "IAEA board passes resolution reporting Iran to UN Security Council - Reuters via Al-Monitor (9 September 2026)",
      url: "https://al-monitor.com/originals/2026/09/iaea-board-passes-resolution-reporting-iran-un-security-council",
    },
    {
      title: "IAEA Cannot Verify Status of Iran's 440kg Uranium Stockpile - La Voce di New York (29 October 2026)",
      url: "https://lavocedinewyork.com/en/un/2026/10/29/iaea-cannot-verify-status-of-irans-440kg-uranium-stockpile/",
    },
    {
      title: "After six months of war, what have US, Iran gained and lost? - Al Jazeera (28 August 2026)",
      url: "https://www.aljazeera.com/news/2026/8/28/after-six-months-of-war-what-have-us-iran-gained-and-lost",
    },
    {
      title: "Who Is Winning the Iran War? - Daniel Byman, CSIS (2 April 2026)",
      url: "https://www.csis.org/analysis/who-winning-iran-war",
    },
    {
      title: "Nearly 9,000 killed in Israeli attacks on Lebanon since 2023 - Al Jazeera (6 September 2026)",
      url: "https://www.aljazeera.com/news/2026/9/6/nearly-9000-killed-in-israeli-attacks-on-lebanon-since-2023",
    },
    {
      title: "Senate narrowly votes down resolution calling for end to Iran war - CNBC (24 September 2026)",
      url: "https://www.cnbc.com/2026/09/24/iran-war-powers-senate-vote-fuel.html",
    },
    {
      title: "Senate adopts House-passed Iran resolution in symbolic rebuke of Trump - CBS News (23 June 2026)",
      url: "https://www.cbsnews.com/news/senate-house-pass-iran-war-powers-resolution-trump/",
    },
    {
      title: "Short-Term Energy Outlook (6 October 2026) - US Energy Information Administration",
      url: "https://www.eia.gov/outlooks/steo/",
    },
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
      title: "Has the war made the Middle East safer or more dangerous?",
      content:
        "The Soleimani assassination, the Twelve-Day War in June 2025, and the war the US and Israel began on 28 February 2026 brought the US into direct war with Iran. The 2026 war killed Ayatollah Ali Khamenei on its first day, drew Hezbollah into a Lebanon war on 2 March and the Houthis in on 28 March, and closed the Strait of Hormuz to most shipping. As of 3 November 2026 no settlement is in place. Proponents argue the damage to Iran's navy, missiles and nuclear sites prevents worse outcomes. Critics argue each escalation triggers retaliation — proxy attacks, missile strikes, attacks on shipping — and has made the region more volatile than before maximum pressure began.",
    },
    {
      id: "q4",
      title: "Did the strikes stop an Iranian bomb?",
      content:
        "The June 2025 strikes and the 2026 war hit Fordow, Natanz, Isfahan and more, and the IAEA has seen no rebuilding at the bombed sites. But Iran's nuclear knowledge cannot be bombed away, and since the war began the IAEA has been unable to say where Iran's roughly 440 kg of 60% uranium is. Did the strikes end the program, or push it out of sight — and toward a political decision to weaponize, as some argue Iraq's Osirak strike did in 1981?",
    },
    {
      id: "q5",
      title: "Are we repeating the Iraq WMD intelligence failure?",
      content:
        "The 2003 invasion of Iraq was justified by claims of weapons of mass destruction that turned out to be false. What institutional safeguards exist today to prevent a similar intelligence failure, and are they being applied to the Iran case?",
    },
    {
      id: "q6",
      title: "Should the US take a deal or resume strikes?",
      content:
        "On 2 November 2026 Iran offered to reopen the Strait of Hormuz and resume nuclear talks within two days if the US lifts its naval blockade and sanctions and guarantees an end to strikes; the US says any deal needs a verifiable commitment that Iran will not rebuild its nuclear program. The June 2026 Islamabad memorandum tried a similar trade and broke down by 8 July. Is a deal that reopens Hormuz now and settles the uranium later the better path, or does only renewed pressure get the uranium under inspection?",
    },
  ],
};
