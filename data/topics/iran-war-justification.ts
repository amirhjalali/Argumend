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
      title: "IAEA Board of Governors Report on Iran (2024)",
      url: "https://www.iaea.org/newscenter/focus/iran",
    },
    {
      title:
        "Congressional Research Service: Iran's Nuclear Program — Status (2024)",
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
        "Iran insists its nuclear program is peaceful. The IAEA has detected enrichment to 83.7% — far beyond civilian needs — but has not formally concluded Iran has a weapons program. How should we interpret the gap between technical capability and declared intent?",
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
        "The case for imminent nuclear threat is built on the same institutional incentives that produced the Iraq WMD debacle. Iran has enriched to 60% and the IAEA detected particles at 83.7%, but enrichment capability is not the same as a weapons program. Iran has not diverted material to a weaponization track, has no known warhead design program since 2003 (per the US NIE), and has allowed — however grudgingly — IAEA inspections. The 'breakout timeline' framing is misleading: converting enriched uranium to a deliverable weapon requires warhead engineering, miniaturization, and missile integration that would take years, not weeks. We heard the same urgency about Iraq, and the intelligence was fabricated.",
      proponent_rebuttal:
        "The Iraq analogy is a false parallel. In Iraq, inspectors found nothing; in Iran, the IAEA has documented 408 kg of 60% enriched uranium — enough for multiple weapons with minimal further enrichment — and detected particles at 83.7%, which has no civilian explanation. Iran kicked out experienced IAEA inspectors in 2023, destroyed monitoring cameras, and refused to answer questions about undeclared nuclear material at multiple sites. Unlike Iraq, the evidence is not from intelligence agencies alone but from the IAEA itself, an independent international body. The breakout timeline is measured in weeks, and every month of delay gives Iran more fissile material. Waiting for a smoking gun means waiting for a nuclear test.",
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
            "The IAEA's quarterly reports document Iran's stockpile of highly enriched uranium at levels with no plausible civilian use. Particles enriched to 83.7% were detected at Fordow — just below the 90% weapons-grade threshold.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 8,
          },
          source: "IAEA Board of Governors Reports (2023-2024)",
          sourceUrl: "https://www.iaea.org/newscenter/focus/iran",
          reasoning:
            "IAEA is an independent international body with on-the-ground inspectors. Data is measured, not estimated. However, enrichment capability alone does not equal a weapon — directness is slightly reduced because the claim is about justifying military action, not just enrichment levels.",
        },
        {
          id: "inspector-expulsion",
          title:
            "Iran Expelled Experienced IAEA Inspectors and Destroyed Cameras (2023)",
          description:
            "Iran designated multiple experienced IAEA inspectors as persona non grata and removed monitoring cameras installed under the JCPOA, creating significant gaps in the international community's ability to verify the program's status.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "IAEA Director General Reports; Reuters",
          reasoning:
            "Obstructing inspections is concerning but does not itself prove weaponization. Could indicate a weapons program or could be political retaliation for US sanctions. Directness is moderate.",
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
            "Senate Select Committee on Intelligence (2004); Chilcot Inquiry (2016)",
          reasoning:
            "The Iraq precedent is historically verified and directly relevant as an institutional warning. However, directness is limited because the Iran case involves different evidence sources (IAEA vs national intelligence) and different factual circumstances.",
        },
        {
          id: "nie-no-weapons-program",
          title:
            "US National Intelligence Estimate: Iran Halted Weapons Program in 2003",
          description:
            "The 2007 US NIE assessed with high confidence that Iran halted its nuclear weapons design work in 2003. Subsequent assessments have not reversed this finding, though they note Iran has kept the option open. There is no public US intelligence assessment concluding Iran has restarted a dedicated weapons program.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 4,
            directness: 7,
          },
          source: "US Office of the Director of National Intelligence (2007)",
          reasoning:
            "The NIE is from the same intelligence community that got Iraq wrong, which cuts both ways — they may have overcorrected. Independence is low since it is a US government product. But directness is high because it directly addresses whether Iran has a weapons program.",
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
        "Military strikes would not weaken Iran's proxy network — they would supercharge it. Hezbollah has 150,000+ rockets aimed at Israel, the Houthis have demonstrated the ability to disrupt global shipping through the Red Sea, and Iranian-backed militias in Iraq and Syria would target US bases hosting 2,500+ troops. A strike on Iran would unite the 'Axis of Resistance' in a coordinated multi-front retaliation, potentially drawing in the US, Israel, and Gulf states into a regional war. The 2006 Lebanon War showed that even a month-long Israeli offensive could not dismantle Hezbollah. Iran's proxy strategy is specifically designed to make a conventional military attack catastrophically costly.",
      proponent_rebuttal:
        "Iran's proxy network is already waging war across the region without any military strikes as provocation. Hezbollah launched attacks on Israel on October 8, 2023 — one day after Hamas's massacre — killing civilians and displacing 60,000+ Israelis from northern communities. The Houthis have attacked commercial shipping with over 100 strikes since November 2023, disrupting 15% of global trade. Iranian-backed militias in Iraq and Syria have attacked US forces over 180 times since October 2023. Deterrence has failed. These proxies are funded by Iranian oil revenue and armed through the IRGC's Quds Force. Degrading Iran's military-industrial base and command infrastructure would reduce the material and strategic support sustaining these groups, even if it does not eliminate them overnight.",
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
            "Iranian Proxies Launched 300+ Attacks on US and Allied Forces Since October 2023",
          description:
            "Hezbollah opened a second front against Israel, Houthis attacked global shipping with 100+ strikes, and Iraqi militias targeted US bases over 180 times — all coordinated through Iran's IRGC Quds Force, demonstrating the existing cost of inaction.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "US Central Command; UN Panel of Experts on Yemen",
          reasoning:
            "Attack counts are well-documented by military and UN sources. Directness is moderate because the evidence shows the problem exists, but does not prove that military strikes on Iran would solve it.",
        },
        {
          id: "houthi-shipping-disruption",
          title:
            "Houthi Red Sea Attacks Disrupted 15% of Global Trade Despite US-UK Strikes",
          description:
            "Despite months of US and UK airstrikes on Houthi positions in Yemen, the group continued launching anti-ship missiles and drones. Major shipping lines rerouted around the Cape of Good Hope, adding 10-14 days to voyages and increasing freight costs by 300%.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source: "Lloyd's List; Maersk; US Naval Institute",
          reasoning:
            "This is direct evidence that military strikes on a proxy did not degrade its operational capability. Highly relevant to the question of whether striking Iran itself would reduce proxy threats. The Houthis demonstrated resilience against sustained bombardment.",
        },
        {
          id: "hezbollah-arsenal-growth",
          title:
            "Hezbollah's Arsenal Grew From 10,000 Rockets (2006) to 150,000+ (2024) Despite Israeli Operations",
          description:
            "After the 2006 Lebanon War, Israel declared it had significantly degraded Hezbollah's capabilities. In the 18 years since, Hezbollah's rocket arsenal grew 15x, added precision-guided munitions, and expanded to include anti-ship missiles and drones — all supplied through Iranian logistics networks via Syria.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Center for Strategic and International Studies (CSIS); IDF",
          reasoning:
            "Historical evidence that military action against proxies (and even against supply lines) did not prevent arsenal growth. Directness is high because it directly tests the theory that force degrades proxy capability.",
        },
        {
          id: "quds-force-command",
          title:
            "IRGC Quds Force Provides Strategic Command, Weapons, and $700M+ Annual Funding to Proxies",
          description:
            "The Quds Force under the late Qasem Soleimani (killed 2020) and his successor Esmail Qaani coordinates operations across all Iranian proxies. US Treasury and UN reports document $700M+ annually to Hezbollah alone, plus advanced weapons transfers including precision-guidance kits, drone technology, and anti-ship missiles.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "US Treasury OFAC; UN Panel of Experts",
          reasoning:
            "Funding and weapons transfer documentation is solid but exact figures are estimates. The killing of Soleimani in 2020 did not collapse proxy operations, which somewhat undercuts the argument that degrading command infrastructure would be decisive.",
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
        "Diplomacy has not been exhausted — it was deliberately abandoned. The JCPOA was working: Iran was compliant, enrichment was capped at 3.67%, the stockpile was reduced by 98%, and 24/7 IAEA monitoring was in place. The US unilaterally withdrew in 2018 despite verified compliance, reimposed maximum-pressure sanctions, and then assassinated Iran's top general in 2020. Every Iranian escalation followed a US provocation. Multiple diplomatic offramps remain: the EU has proposed an interim deal freezing enrichment at 60% in exchange for partial sanctions relief, China and Russia have offered mediation, and even Iran's current government has signaled willingness to negotiate. Declaring diplomacy 'exhausted' after sabotaging the most successful nonproliferation agreement in decades is not a strategic assessment — it is a pretext for war.",
      proponent_rebuttal:
        "The JCPOA was a temporary pause, not a solution. Its sunset clauses would have allowed Iran unrestricted enrichment by 2030-2031, creating a patient pathway to a bomb with international legitimacy. It never addressed Iran's ballistic missile program, which has since tested missiles capable of reaching Europe. It never addressed Iran's regional aggression, which has intensified. And Iran was caught cheating: the IAEA discovered undeclared nuclear material at multiple sites that Iran refused to explain, and the Mossad's 2018 seizure of Iran's nuclear archive revealed a structured weapons design program that Iran denied existed. Since JCPOA collapsed, Iran has rejected every diplomatic initiative — the EU's 2022 deal was abandoned after Iran demanded the IRGC be delisted as a terrorist organization, an obvious non-starter. At some point, 'more diplomacy' becomes a euphemism for allowing Iran to reach nuclear weapons capability while talking.",
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
            "Key JCPOA restrictions on enrichment levels and centrifuge numbers expire between 2025-2031. Critics argue this created a 'patient pathway' to a bomb with international legitimacy, making the deal fundamentally flawed regardless of short-term compliance.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 6,
          },
          source: "Brookings Institution; Foundation for Defense of Democracies",
          reasoning:
            "The sunset clauses are a real structural weakness in the JCPOA. However, directness is moderate because the clauses were designed to be renegotiated as confidence-building progressed — the deal was meant to be a floor, not a ceiling.",
        },
        {
          id: "failed-post-jcpoa-diplomacy",
          title:
            "Multiple Post-JCPOA Diplomatic Initiatives Have Stalled (2019-2024)",
          description:
            "The EU proposed an interim deal in 2022 that would freeze enrichment at 60% in exchange for partial sanctions relief. Negotiations collapsed after Iran demanded IRGC delisting. The Biden administration's indirect talks through Oman produced no agreement. China and Qatar mediation efforts in 2023-2024 yielded temporary prisoner exchanges but no nuclear deal.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "European External Action Service; Reuters; Al Jazeera",
          reasoning:
            "Multiple failed initiatives are documented, but 'failure' must be contextualized: diplomacy was attempted under maximum-pressure sanctions, which Iran argues makes good-faith negotiation impossible. The question is whether these were genuine attempts or performative.",
        },
        {
          id: "historical-diplomatic-success",
          title:
            "Historical Precedent: Diplomacy Resolved Comparable Nuclear Crises (Libya 2003, South Africa 1989)",
          description:
            "Libya voluntarily dismantled its nuclear program through diplomatic engagement in 2003. South Africa abandoned its six completed nuclear weapons through negotiated transition in 1989-1991. Both cases demonstrate that nuclear proliferation can be reversed without military action when the right incentives and security guarantees are offered.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 5,
          },
          source: "Nuclear Threat Initiative (NTI); Arms Control Association",
          reasoning:
            "Historical precedents are real but replicability is low — Libya and South Africa had very different strategic contexts. Gaddafi's fate after disarmament (overthrown and killed in 2011) is now cited by Iran as a reason not to disarm, which complicates this evidence.",
        },
      ],
    },
  ],
};
