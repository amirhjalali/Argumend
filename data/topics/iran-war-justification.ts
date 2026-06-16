import type { Topic } from "@/lib/schemas/topic";

export const iranWarJustificationData = {
  id: "iran-war-justification",
  title: "Is Military Action Against Iran Justified?",
  meta_claim:
    "Military strikes against Iran's nuclear and military infrastructure are a justified response to regional aggression and nuclear proliferation risks.",
  status: "contested" as const,
  category: "policy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1590076215667-875c2d76b849?auto=format&fit=crop&w=800&q=60",
  references: [
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
      title: "Is Iran's nuclear program really a weapons program?",
      content:
        "Iran insists its nuclear program is peaceful. Iran enriches to 60% — far beyond civilian needs — and the IAEA recorded a transient 2023 detection of particles at 83.7% at Fordow, yet has not formally concluded Iran has a weapons program. How should we interpret the gap between technical capability and declared intent?",
    },
    {
      id: "q2",
      title: "Would strikes actually prevent an Iranian bomb?",
      content:
        "Iran's nuclear knowledge cannot be bombed away. Key facilities like Fordow are buried deep underground. Would military strikes delay the program by years, or would they accelerate a political decision to weaponize — as happened with Iraq's Osirak strike in 1981?",
    },
    {
      id: "q3",
      title: "Are we repeating the Iraq WMD intelligence failure?",
      content:
        "The 2003 invasion of Iraq was justified by claims of weapons of mass destruction that turned out to be false. What institutional safeguards exist today to prevent a similar intelligence failure, and are they being applied to the Iran case?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Nuclear Threat Assessment
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
        description:
          "Determine whether Iran's current enrichment capacity and stockpile constitute a genuine near-term weapons capability, or whether the gap between enriched material and a deliverable nuclear weapon is being understated to build a case for war.",
        methodology:
          "Cross-reference IAEA quarterly reports on Iran's UF6 stockpile (kg at each enrichment level) with independent technical assessments of the steps required beyond enrichment: conversion to metal, pit fabrication, implosion lens design, warhead miniaturization, and delivery vehicle integration. Compare the publicly known state of Iran's program against the timelines estimated by physicists at Princeton's Science & Global Security program and the Federation of American Scientists.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$0 (IAEA reports are public; independent technical assessments available from FAS and Princeton SGS)",
      },
      evidence: [
        {
          id: "iaea-enrichment-data",
          title:
            "IAEA Confirms 408 kg of 60% Enriched Uranium and 83.7% Particles",
          description:
            "The IAEA's quarterly verification reports document Iran's growing stockpile of highly enriched uranium at levels with no plausible civilian use. The 408.6 kg figure (of 60% HEU, in uranium mass) is from the IAEA's May 2025 report; particles enriched to 83.7% were detected at Fordow in early 2023 — just below the 90% weapons-grade threshold. Iran told the IAEA these were 'unintended fluctuations' during a cascade reconfiguration, an explanation the agency assessed as not inconsistent with its findings.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 7,
          },
          source:
            "IAEA Board of Governors Reports (GOV/2025/24, May 2025; quarterly reports 2023)",
          sourceUrl: "https://www.iaea.org/sites/default/files/25/06/gov2025-24.pdf",
          reasoning:
            "IAEA is an independent international body with on-the-ground inspectors; the stockpile data is measured, not estimated. Note the 408 kg and 83.7% figures are from different reports (2025 and 2023 respectively), and the 83.7% particles were a transient detection Iran attributed to a cascade reconfiguration. Enrichment capability alone does not equal a weapon — directness is reduced because the claim is marshalled to justify military action, not just to describe enrichment levels.",
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
      ],
    },
    // =========================================================================
    // PILLAR 2: Regional Destabilization
    // =========================================================================
    {
      id: "regional-destabilization",
      title: "Regional Destabilization",
      short_summary:
        "Iran funds and arms proxy forces across the Middle East — Hezbollah, Hamas, the Houthis, and Iraqi militias — but whether military strikes would reduce this threat or ignite a wider regional war is the central strategic question.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Military strikes would not weaken Iran's proxy network — they risk supercharging it. Hezbollah is estimated to hold on the order of 130,000-150,000 rockets and missiles aimed at Israel (CSIS puts it near 130,000; Israeli officials say ~150,000), the Houthis have demonstrated the ability to disrupt traffic through one of the world's busiest shipping chokepoints, and Iranian-backed militias in Iraq and Syria can target US bases hosting roughly 2,500 troops. A strike on Iran could unite the 'Axis of Resistance' in coordinated multi-front retaliation, potentially drawing the US, Israel, and Gulf states into a regional war. The 2006 Lebanon War showed that even a month-long Israeli offensive could not dismantle Hezbollah, and a decade of strikes on supply lines did not stop its arsenal from growing. Iran's proxy strategy is specifically designed to make a conventional attack catastrophically costly — which is precisely why containment and deterrence, not a strike that gives the proxies their casus belli, may be the lower-risk path.",
      proponent_rebuttal:
        "Iran's proxy network is already waging war across the region without any military strikes as provocation. Hezbollah opened fire on Israel on October 8, 2023 — one day after Hamas's massacre — eventually displacing 60,000+ Israelis from northern communities. The Houthis have launched well over 100 attacks on commercial shipping since November 2023, against a Red Sea/Suez route that normally carries roughly 12% of global maritime trade, forcing mass rerouting around Africa. Iranian-backed militias in Iraq and Syria have attacked US forces more than 180 times since October 2023, killing three soldiers at Tower 22. Deterrence has plainly failed at the current posture. These proxies are funded by Iranian revenue and armed through the IRGC's Quds Force, so degrading Iran's military-industrial base and command infrastructure would raise the cost of sustaining them — the honest claim is attrition and deterrence-restoration, not that one strike eliminates the threat overnight.",
      crux: {
        id: "proxy-dependency-test",
        title: "The Proxy Dependency Test",
        description:
          "Determine whether Iran's proxy forces are operationally dependent on continued Iranian material support (weapons, funding, training), such that degrading Iran's military capacity would meaningfully reduce proxy capabilities — or whether these groups have achieved sufficient autonomy to sustain operations independently.",
        methodology:
          "Analyze the supply chain for advanced proxy weapons systems (Hezbollah's precision-guided missiles, Houthi anti-ship ballistic missiles, Iraqi militia drones). Map the proportion of funding, weapons components, and strategic direction that flows from Iran's IRGC Quds Force vs. indigenous production and local revenue. Examine historical cases where state sponsors were weakened — did proxy capability decline (e.g., PLO after losing Beirut 1982) or persist (e.g., Taliban after losing Afghan state support)?",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K (open-source intelligence analysis + captured weapons forensics + satellite imagery)",
      },
      evidence: [
        {
          id: "proxy-attacks-escalation",
          title:
            "Iranian Proxies Attacked US Forces 180+ Times Since October 2023, Plus Hezbollah and Houthi Fronts",
          description:
            "Iran-aligned militias attacked US forces in Iraq, Syria, and Jordan more than 180 times between October 2023 and early 2024 (killing three US soldiers at Tower 22), Hezbollah opened a second front against Israel, and the Houthis attacked Red Sea shipping — activity broadly coordinated through Iran's IRGC Quds Force, demonstrating an existing cost of inaction.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "US Institute of Peace, Iran Primer 'Timeline of Proxy Attacks'; US Central Command statements",
          sourceUrl:
            "https://iranprimer.usip.org/blog/2024/feb/01/timeline-proxy-attacks-iraq-syria-and-jordan",
          reasoning:
            "Corrected: the prior '300+' headline conflated distinct counts; the well-documented figure is 180+ attacks on US forces (Oct 2023–early 2024), separate from Houthi shipping and Hezbollah fronts. Directness is moderate because the evidence shows the problem exists but does not prove that striking Iran itself would reduce it.",
        },
        {
          id: "houthi-shipping-disruption",
          title:
            "Houthi Red Sea Attacks Disrupted a Route Carrying ~12% of Global Trade Despite US-UK Strikes",
          description:
            "Despite months of US and UK airstrikes on Houthi positions in Yemen, the group continued launching anti-ship missiles and drones (190+ attacks by late 2024). Major shipping lines rerouted around the Cape of Good Hope — the Red Sea/Suez route normally carries about 12% of global maritime trade — adding roughly 10-14 days to Asia-Europe voyages and sharply raising freight rates (Asia-Europe rates rose on the order of 40-60% in early 2024).",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Wikipedia 'Houthi attacks on commercial vessels' (citing IMF PortWatch, Maplecroft, Coface); industry freight-rate reporting",
          sourceUrl:
            "https://en.wikipedia.org/wiki/Houthi_attacks_on_commercial_vessels",
          reasoning:
            "Corrected: ~12% of global trade transits the route (it was not all 'disrupted'), and freight costs rose roughly 40-60% on key lanes, not a flat 300%. This remains direct evidence that strikes on a proxy did not degrade its operational capability — relevant to whether striking Iran would reduce proxy threats. Slightly de-inflated because the cited synthesis is secondary rather than a single primary maritime authority.",
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
        {
          id: "quds-force-command",
          title:
            "IRGC Quds Force Provides Strategic Command, Weapons, and $700M+ Annual Funding to Proxies",
          description:
            "The Quds Force under the late Qasem Soleimani (killed 2020) and his successor Esmail Qaani coordinates operations across Iranian proxies. A senior US Treasury official (Under Secretary Sigal Mandelker) estimated in 2018 that Iran provides Hezbollah more than $700 million per year, alongside weapons transfers including precision-guidance kits, drones, and anti-ship missiles documented in US sanctions actions.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source:
            "US Treasury Under Secretary Sigal Mandelker, remarks at FDD (2018), as reported by The National",
          sourceUrl:
            "https://www.thenationalnews.com/world/the-americas/iran-pays-hezbollah-700-million-a-year-us-official-says-1.737347",
          reasoning:
            "Corrected attribution: the $700M figure is a 2018 estimate by a single US official, not a measured Treasury/UN audit, so independence and replicability are de-inflated. The killing of Soleimani in 2020 did not collapse proxy operations, which undercuts the argument that degrading command infrastructure would be decisive — directness lowered.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 3: Diplomatic Alternatives
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
        description:
          "Determine whether all realistic diplomatic pathways have been genuinely pursued and failed on their merits — or whether diplomatic failure was engineered by parties who preferred a military option. This requires assessing whether the US negotiated in good faith after 2018 and whether Iran's rejections of subsequent proposals were unreasonable.",
        methodology:
          "Map every formal diplomatic proposal from 2018-present, including the party that proposed it, the specific terms offered, the response from each side, and the stated reason for rejection. Cross-reference with contemporaneous statements from US, Iranian, and European officials to determine whether rejections were based on substantive objections or preconditions designed to prevent agreement. Apply the standard used in international law for 'exhaustion of remedies' — have all reasonable alternatives been attempted in good faith?",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$0 (diplomatic records, UN proceedings, and media reporting are publicly available)",
      },
      evidence: [
        {
          id: "jcpoa-compliance-record",
          title:
            "Iran Was IAEA-Verified Compliant With JCPOA When US Withdrew (2016-2018)",
          description:
            "The IAEA issued 11 consecutive reports confirming Iran's compliance with JCPOA limits: enrichment capped at 3.67%, stockpile reduced by 98%, and all monitoring protocols in place. The US withdrew despite this compliance record, and all other signatories opposed the decision.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 10,
            directness: 9,
          },
          source: "IAEA; Arms Control Association",
          sourceUrl:
            "https://www.armscontrol.org/factsheets/status-irans-nuclear-program-1",
          reasoning:
            "IAEA compliance verification is the gold standard for nuclear monitoring. This directly addresses whether diplomacy was given a fair chance. Directness is very high because it shows diplomacy was working at the moment it was abandoned.",
        },
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
};
