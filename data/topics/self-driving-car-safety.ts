import type { Topic } from "@/lib/schemas/topic";

export const selfDrivingCarSafetyData = {
  id: "self-driving-car-safety",
  title: "Self-Driving Car Safety",
  meta_claim:
    "Autonomous vehicles are already safer than human drivers and should be deployed broadly.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Reinsurer Swiss Re — using its own database of 200+ billion human-driven miles and 500,000+ claims, not Waymo's data — found Waymo's driverless cars had 88% fewer property-damage and 92% fewer bodily-injury liability claims across 25.3 million rider-only miles. The catch most boosters skip: that result is measured almost entirely inside a few geofenced, well-mapped cities at low speeds, not on highways, in snow, or on rural roads where most fatal human miles happen.",
    confidence: 84,
    source:
      "Di Lillo et al., Swiss Re / Waymo (Dec 2024 update), 'Comparative Safety Performance of Autonomous- and Human Drivers'; corroborated by Kusano et al., Traffic Injury Prevention (2025), 56.7M-mile peer-reviewed study (arXiv:2505.01515)",
    sourceUrl: "https://arxiv.org/abs/2505.01515",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The independent evidence is strong: reinsurer Swiss Re, comparing against its own database of 200+ billion human-driven miles, found Waymo's driverless cars had 88% fewer property-damage and 92% fewer bodily-injury liability claims over 25.3 million miles, and separate peer-reviewed work found 85-96% fewer injury crashes — a safety edge produced even by parties other than the AV company.",
    "The honest limitation is that almost all of this data comes from a handful of geofenced, well-mapped, mostly fair-weather cities at low speeds, with remote human agents on call — so 'already safer than human drivers' is established inside that narrow domain, not for highways, snow, or open rural roads where most fatalities occur, and RAND estimated proving general fatality superiority could take hundreds of millions to hundreds of billions of miles.",
    "So the honest debate isn't whether today's robotaxis are safer where they currently drive (the matched evidence says they are) but whether that edge generalizes to all-weather open-road driving, and whether broad deployment can be justified before that open-road proof exists.",
  ],
  last_updated: "2026-06-16",
  tags: ["autonomous-vehicles", "robotaxi", "safety", "waymo", "transportation"],
  pillars: [
    {
      id: "crash-record",
      title: "The Crash Record",
      short_summary:
        "Driverless ride-hailing fleets report large reductions in injury crashes per mile versus human benchmarks — but only inside narrow, mapped service areas.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The headline 'X% safer' figures come overwhelmingly from one operator (Waymo) measuring itself inside geofenced, well-mapped, mostly fair-weather cities at low speeds — not the open-road, all-weather conditions where most human miles and most fatalities occur. Comparing a fleet's voluntarily reported crashes against police-reported human crashes invites selection and underreporting bias that can flatter the machine. The deadliest scenarios (highway speeds, snow, unprotected rural roads) are largely excluded from the operating domain, so 'already safer than human drivers' is not yet established for driving in general.",
      proponent_rebuttal:
        "The reductions survive the obvious objections: peer-reviewed analyses align the human benchmark to the same cities, road types, and vehicle classes the fleet actually drives, correct for ~32% injury-crash underreporting, and still find 80%+ fewer injury crashes across 7.1M and 56.7M rider-only miles. An independent reinsurer (Swiss Re), using its own claims database of 200B+ human miles, found 88-92% fewer liability claims over 25.3M autonomous miles — a result not produced by the AV company. Within the domain where they operate, the safety gap is large and replicated.",
      crux: {
        id: "benchmark-validity",
        title: "Is the Human Benchmark Apples-to-Apples?",
        description:
          "Whether the measured safety advantage reflects a real reduction in risk or an artifact of comparing a narrow, favorable autonomous domain against a broader, underreported human baseline.",
        methodology:
          "Restrict the human comparison to the exact counties, road types, vehicle classes, and reporting thresholds the AV fleet operates in; correct human police data for known underreporting; then compare matched crash rates per mile by crash type (injury, airbag, pedestrian, cyclist).",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (data analysis of public SGO + state crash records)",
        falsification: {
          supporter_flip:
            "If a fully independent re-analysis matched the human baseline to the exact same counties, road types, vehicle classes, and reporting thresholds — and corrected human data for underreporting — and the AV advantage shrank to near zero or reversed, the 'already safer' claim would collapse to a comparison artifact.",
          skeptic_flip:
            "A skeptic who calls it a self-serving comparison should weigh that an independent reinsurer (Swiss Re), using its own 200B+-mile human-claims database that Waymo did not produce, found 88-92% fewer liability claims — a result not generated by the AV company analyzing itself.",
          common_ground:
            "Both sides agree the comparison is only meaningful if the human benchmark is matched to the same cities, road types, speeds, and crash-reporting thresholds the AV fleet actually drives in.",
          live_disagreement:
            "Whether the measured advantage survives a fully apples-to-apples, independently audited matching — including underreporting correction and crash-type breakdown — which an open re-analysis of public SGO and matched state crash records could settle.",
        },
      },
      evidence: [
        {
          id: "waymo-56m-crashtype",
          title: "Waymo: 96% Fewer Injury Crashes at 56.7M Miles (Peer-Reviewed)",
          description:
            "Across 56.7 million rider-only miles, Waymo reported statistically significant reductions versus benchmark human drivers in matched areas — e.g. 96% fewer any-injury intersection crashes and 91% fewer airbag-deployment intersection crashes — with no statistically significant disbenefit in any of 11 crash-type groups.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 8,
            directness: 9,
          },
          source:
            "Kusano, Scanlon, Chen, McMurry, Gode, Victor (2025), Traffic Injury Prevention; open preprint arXiv:2505.01515",
          sourceUrl: "https://arxiv.org/abs/2505.01515",
          reasoning:
            "Peer-reviewed in Traffic Injury Prevention with transparent methodology and confidence intervals (high reliability, replicability, directness). Independence is dropped to 5: the authors are Waymo employees analyzing Waymo data, so the result is verifiable but not from a disinterested party.",
        },
        {
          id: "waymo-7m-peerreviewed",
          title: "Waymo: 80% Fewer Injury Crashes at 7.1M Miles (Peer-Reviewed)",
          description:
            "An earlier study over 7.14 million rider-only miles in Phoenix, San Francisco, and Los Angeles found 80% fewer any-injury-reported crashes and 55% fewer police-reported crashes than matched human benchmarks adjusted for underreporting.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 8,
            directness: 8,
          },
          source:
            "Kusano et al. (2024), Traffic Injury Prevention, DOI 10.1080/15389588.2024.2380786; open preprint arXiv:2312.12675",
          sourceUrl: "https://arxiv.org/abs/2312.12675",
          reasoning:
            "Same methodology family as the 56.7M study, independently peer-reviewed and replicated at a smaller mileage, which corroborates the trend. Independence again capped at 5 because it is operator self-analysis; directness slightly lower as it predates the crash-type breakdown.",
        },
        {
          id: "swissre-claims",
          title: "Swiss Re: 88-92% Fewer Liability Claims Over 25.3M Miles",
          description:
            "Reinsurer Swiss Re compared Waymo's 25.3 million rider-only miles against its own database of 500,000+ claims and 200B+ miles of human exposure, finding 88% fewer property-damage and 92% fewer bodily-injury liability claims (86%/90% fewer versus 2018-2021 vehicles with advanced driver assistance).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Di Lillo, Gode, Zhou, Atzei, Chen, Victor (2024), Swiss Re / Waymo; 'Comparative Safety Performance of Autonomous- and Human Drivers'",
          sourceUrl: "https://waymo.com/blog/2024/12/new-swiss-re-study-waymo/",
          reasoning:
            "Uses Swiss Re's independent insurance-claims dataset rather than Waymo's own crash logs, raising independence to 8. Replicability is 6 because the human exposure database is proprietary to Swiss Re and not fully open for outside re-analysis.",
        },
      ],
    },
    {
      id: "edge-cases",
      title: "Edge Cases and Failure Modes",
      short_summary:
        "Real deployed systems have produced novel, dangerous failures — dragging a pinned pedestrian, and crashing in fog and sun glare — that human drivers rarely make.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Autonomy fails differently than people do, sometimes catastrophically and in ways no human would. A Cruise robotaxi misclassified a post-collision and dragged a pinned pedestrian ~20 feet before the company's fleet was pulled from the road and it admitted to a federal regulator that it had submitted a false report. NHTSA has an open engineering analysis into Tesla's camera-only Full Self-Driving for crashes in reduced visibility, including a pedestrian fatality. 'Average miles between crashes' hides these long-tail failures, and broad deployment multiplies exposure to them faster than the systems are validated.",
      proponent_rebuttal:
        "Novel failures are real but the system response is now visible and governed: NHTSA's Standing General Order forces crash reporting, recalls follow specific software defects, and the worst actor (Cruise) was removed from public roads while its leadership faced federal penalties. Human driving has its own catastrophic long tail — drunk, distracted, and speeding crashes kill ~40,000 people a year in the US — and unlike a human, a fixed software defect can be patched fleet-wide at once. The correct comparison is not 'zero AV failures' but 'fewer and more fixable failures than the human status quo.'",
      crux: {
        id: "tail-risk-accounting",
        title: "Do the Long-Tail Failures Erase the Average Advantage?",
        description:
          "Whether rare but severe autonomous failure modes (mis-handled post-collision maneuvers, blindness in fog/glare) net out below the human baseline once fairly weighted, or whether averages mask unacceptable tail risk at scale.",
        methodology:
          "Catalog every reported severe AV failure (NHTSA SGO, recall reports, ODI investigations), estimate exposure-adjusted rates by severity tier, and compare against severity-matched human rates rather than comparing means alone.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (public NHTSA SGO, recall, and ODI investigation records)",
        falsification: {
          supporter_flip:
            "If exposure-adjusted severe-failure rates (catalogued from NHTSA SGO, recalls, and ODI investigations) showed AVs producing serious-injury or fatal events at or above the severity-matched human rate — not just rare anecdotes — the 'fewer and more fixable failures' defense would fail on the numbers.",
          skeptic_flip:
            "A skeptic pointing to the Cruise dragging incident and the Tesla FSD probe should weigh that human driving has its own catastrophic long tail — roughly 40,000 US deaths a year, ~94% with human error as a critical factor — and that a single fixed software defect can be patched fleet-wide, unlike retraining every human driver.",
          common_ground:
            "Both sides agree autonomous systems have produced genuinely novel, severe failures (the Cruise pedestrian drag; FSD crashes in glare/fog) and that 'average miles between crashes' can hide rare tail events.",
          live_disagreement:
            "Whether severe AV failures, weighted by exposure and severity tier, net out below the severity-matched human baseline — which a complete catalog of reported severe events with per-mile rates, rather than means alone, would resolve.",
        },
      },
      evidence: [
        {
          id: "cruise-recall",
          title: "Cruise Dragged a Pinned Pedestrian; Admitted False Report to NHTSA",
          description:
            "Per NHTSA recall 23E-086, after a human-driven car threw a pedestrian into a Cruise robotaxi's path on Oct 2, 2023, the AV misclassified the collision and pulled over, dragging the pinned pedestrian forward. Cruise recalled 950 ADS units, lost its California driverless permit, and later admitted in federal court to submitting a false report about the incident, paying a $500,000 fine.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "NHTSA Part 573 Safety Recall Report 23E-086 (Nov 7, 2023); US DOJ (N.D. Cal.) deferred prosecution agreement (Nov 2024)",
          sourceUrl: "https://static.nhtsa.gov/odi/rcl/2023/RCLRPT-23E086-7725.PDF",
          reasoning:
            "Official regulatory recall filing plus a federal admission — maximally reliable and independent. Directness is 7 rather than 9 because it is a single severe incident from a now-defunct operator, not a fleet-wide rate, so it bounds rather than measures overall AV risk.",
        },
        {
          id: "tesla-fsd-investigation",
          title: "NHTSA Engineering Analysis: Tesla FSD Crashes in Low Visibility",
          description:
            "NHTSA investigation PE24031 (opened Oct 17, 2024, covering ~2.4M Teslas with FSD) examined crashes where FSD failed to react appropriately to reduced roadway visibility such as sun glare and fog; reporting indicates the probe was upgraded toward a possible recall in 2026 after additional incidents, including a pedestrian fatality.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source:
            "NHTSA ODI Investigation PE24031 (Office of Defects Investigation resume, 2024); contemporaneous reporting on the 2026 escalation",
          sourceUrl: "https://static.nhtsa.gov/odi/inv/2024/INOA-PE24031-23232.pdf",
          reasoning:
            "Primary government investigation document drives high reliability and independence. The 2026 escalation and fatality details are post-cutoff and reported rather than adjudicated, so they are kept attributed and directness is held at 7; FSD is also a supervised (Level 2) system, distinct from driverless robotaxis.",
        },
      ],
    },
    {
      id: "deploy-broadly",
      title: "Deploying Broadly",
      short_summary:
        "Even granting a local safety edge, the 'deploy broadly' half of the claim runs into proof, scale, and human-in-the-loop limits.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "'Already safer' implies a general fact, but RAND showed that statistically proving an AV is safer than humans on fatalities could require hundreds of millions to hundreds of billions of test miles — decades of driving — so the broad claim outruns the evidence. Today's fleets remain geofenced to a handful of cities, lean on remote human fleet-response agents for hard situations, and have not been validated for highways, snow, or rural roads. Broad deployment asks society to scale before the long-mileage proof exists.",
      proponent_rebuttal:
        "Waiting for billions of road miles per design before deploying anything is itself a choice with a body count: human error is the critical factor in ~94% of crashes, and ~40,000 Americans die on roads annually. Statistical proof can be supplemented with simulation, scenario testing, and staged geographic rollout — exactly the path operators are on, expanding city by city after each domain is validated. Remote agents that suggest rather than steer are a safety backstop during scaling, not evidence the cars cannot drive; broad deployment can be incremental and evidence-gated rather than all-at-once.",
      crux: {
        id: "proof-vs-deployment",
        title: "Can Broad Deployment Be Justified Before Open-Road Proof Exists?",
        description:
          "Whether staged rollout plus simulation can ethically substitute for the impractically large road-mileage needed to prove general superiority, or whether 'deploy broadly' demands proof that does not yet exist.",
        methodology:
          "Compare the mileage/time required for statistical proof of fatality-rate superiority (RAND model) against achievable validated-domain expansion rates; weigh counterfactual lives lost from delay against tail risk from premature scale.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (modeling), but full empirical proof is effectively unbounded",
        falsification: {
          supporter_flip:
            "If staged, domain-by-domain expansion plus simulation could be shown to reliably catch the failure modes that only appear in new conditions (highways, snow, rural roads) before scaling — closing the gap RAND identified — then 'deploy broadly, evidence-gated' would be vindicated rather than premature.",
          skeptic_flip:
            "A skeptic invoking RAND's hundreds-of-millions-to-billions-of-miles requirement should weigh the counterfactual body count of delay: human error is a critical factor in ~94% of crashes and ~40,000 Americans die on roads yearly, so indefinite waiting is itself a choice with measurable costs.",
          common_ground:
            "Both sides agree today's fleets are still geofenced to a handful of mapped cities, lean on remote human fleet-response agents, and have not been validated for highways, snow, or rural roads.",
          live_disagreement:
            "Whether validated-domain expansion plus simulation can ethically substitute for the impractically large road mileage needed to prove general fatality-rate superiority — which comparing achievable expansion rates against the RAND statistical model, and tracking real outcomes as domains widen, would test.",
        },
      },
      evidence: [
        {
          id: "rand-miles",
          title: "RAND: Proving AV Safety Could Take Hundreds of Billions of Miles",
          description:
            "RAND's 'Driving to Safety' (Kalra & Paddock, 2016) found autonomous vehicles would need to be driven hundreds of millions, and sometimes hundreds of billions, of miles to demonstrate their fatality and injury reliability versus humans — requiring many decades and possibly hundreds of years of test-driving, so road-testing alone cannot establish broad superiority.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "Kalra & Paddock, 'Driving to Safety,' RAND Corporation report RR1478 (2016)",
          sourceUrl: "https://www.rand.org/pubs/research_reports/RR1478.html",
          reasoning:
            "Independent, peer-reviewed RAND analysis with a transparent statistical model — high reliability and independence. It undercuts the 'already safer (in general)' and 'deploy broadly' framing rather than measuring any specific crash rate, so directness is 7; it argues proof is impractical, not that AVs are unsafe.",
        },
        {
          id: "geofence-remote-ops",
          title: "Fleets Remain Geofenced and Lean on Remote Human Agents",
          description:
            "As of 2025-2026 driverless ride-hailing operated in only a handful of mapped cities (e.g. Phoenix, San Francisco, Los Angeles, Austin), and Waymo's own documentation confirms its vehicles request input from remote human 'fleet response' agents in complex situations — the agents provide guidance while the Waymo Driver remains in control of the vehicle at all times. The reliance on remote assistance was aired publicly at the US Senate Commerce Committee's Feb 4, 2026 hearing on self-driving cars.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source:
            "Waymo, 'How fleet response supports the Waymo Driver' (operational blog); US Senate Commerce Committee hearing 'Hit the Road, Mac: The Future of Self-Driving Cars' (Feb 4, 2026), Waymo Chief Safety Officer testimony",
          sourceUrl: "https://waymo.com/blog/2024/05/fleet-response/",
          reasoning:
            "Establishes the real limit on 'broadly' — narrow geofenced domains plus human-in-the-loop backstops. The remote-agent role comes from Waymo's own disclosure (so independence is lowered to 5), corroborated by Senate hearing testimony rather than a primary safety dataset; it constrains the deployment claim without proving cars are unsafe.",
        },
      ],
    },
  ],
};
