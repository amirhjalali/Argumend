export const selfDrivingCarSafetyData = {
  id: "self-driving-car-safety",
  title: "Self-Driving Car Safety",
  question: "Are self-driving cars safer than human drivers?",
  aliases: [
    "Are self-driving cars already safer than humans and ready for broad use?",
    "Are robotaxis safe?",
    "Is Waymo safer than human drivers?",
  ],
  meta_claim:
    "Driverless cars are already safer than human drivers where they operate, and they should be allowed to spread to more cities and roads.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: Waymo's safety hub covers 271.3M rider-only miles
  // through June 2026 in five metros; Waymo counted 14 cities with fully
  // driverless rides on 1 September 2026 and has carried riders on freeways
  // since November 2025; NHTSA's crash-report data run to 15 September 2026;
  // Waymo recalled 3,067 vehicles over school-bus passing in December 2025.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "Through June 2026, Waymo's driverless cars covered 271 million miles in five US metro areas, and by the company's count had 95% fewer serious-injury crashes than human drivers would have had over the same miles on the same streets. By September Waymo was carrying passengers with no one at the wheel in 14 cities, and on freeways since November 2025. The fight is over whether one company's record on city streets proves the robots safer, and whether it will hold as they spread to the highways, weather and towns where most road deaths happen.",
    confidence: 84,
    source:
      "Waymo Safety Impact data hub (rider-only miles through June 2026); Waymo, 'Welcoming our first riders in Denver, San Diego, and Tampa' (1 September 2026); Waymo, 'Taking riders further, safely, with freeways' (12 November 2025)",
    sourceUrl: "https://waymo.com/safety/impact/",
  },
  simple_case: [
    "About 40,000 Americans die on the roads each year. The answer bears on whether cities let robotaxis in, whether states and Congress loosen the rules for cars with no steering wheel, and whether the companies' own crash numbers are enough to go on.",
  ],
  tags: ["autonomous-vehicles", "robotaxi", "safety", "waymo", "transportation"],
  pillars: [
    // =========================================================================
    // PILLAR 1: The record so far. Is the comparison fair?
    // =========================================================================
    {
      id: "crash-record",
      title: "The Record So Far: Is the Comparison Fair?",
      short_summary:
        "Waymo's peer-reviewed studies and an insurer's claims data find large cuts in injury crashes per mile. Almost all of it comes from one company, measuring itself, on city streets in a few metro areas. Whether the edge survives a fully like-for-like, independent check is the first split.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The headline numbers come almost entirely from one company measuring itself. Waymo's safety hub, its peer-reviewed papers and its claims study with Swiss Re are all Waymo-authored or Waymo-funded, and they cover surface streets in five metro areas, mostly in good weather; Waymo says it has 'only limited miles on freeways' and leaves them out. The human benchmark is built from police reports and insurance data adjusted with assumptions about crashes nobody reports, and small changes in those assumptions move the result. Outside researchers who compared crash rates on San Francisco streets found driverless Waymo below human Uber drivers but driverless Cruise above them, and said the samples were too small to conclude anything. NHTSA publishes every driverless crash report it receives, more than 1,280 from Waymo between June 2025 and September 2026, but it says its own data 'are not normalized': without independent mileage, nobody outside the company can compute the rate. 'Safer than humans' is a claim no regulator has checked.",
      proponent_rebuttal:
        "The result survives the obvious objections. Waymo's peer-reviewed studies match the human benchmark to the same counties, road types and vehicle classes the fleet drives, correct for unreported crashes, and still find large reductions: 80% fewer injury crashes over 7.1 million miles, and over 56.7 million miles significant reductions in most crash types with no significant increase in any of 11. Swiss Re, the reinsurer, ran Waymo's 25.3 million miles against its own database of more than 500,000 claims and 200 billion human-driven miles and found 88% fewer property-damage and 92% fewer bodily-injury claims; that comparison uses the insurer's data, not Waymo's crash logs. Through June 2026 the record covered 271 million miles, 82% fewer injury crashes and 95% fewer serious ones. Every one of those crashes is reported to NHTSA under a federal order, and the narratives are published. A comparison that keeps coming out the same way across four analyses and nearly 40 times more miles is not an artifact.",
      crux: {
        id: "benchmark-validity",
        title: "Is the Human Benchmark Apples-to-Apples?",
        question:
          "Does self-driving cars' safety edge survive a truly like-for-like, independently audited comparison?",
        description:
          "Whether the measured safety advantage reflects a real reduction in risk, or partly an artifact of comparing a narrow, favourable driverless domain against a broader, under-reported human baseline that the operator itself constructs.",
        methodology:
          "Restrict the human comparison to the exact counties, road types, vehicle classes, times of day and reporting thresholds the fleet operates in; correct human police data for known under-reporting; then compare matched crash rates per mile by crash type (injury, airbag, pedestrian, cyclist). Have it run by a party without a stake, using mileage the operator discloses to the regulator.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "An independent re-analysis, using mileage disclosed to NHTSA, that matches the human baseline to the fleet's exact counties, road types, times of day and reporting thresholds, corrects human data for under-reporting, and compares crash rates per mile by crash type.",
        },
        cost_to_verify: "$0 (public NHTSA crash reports and state crash records), but needs mileage the operators hold",
        falsification: {
          supporter_flip:
            "If a fully independent re-analysis matched the human baseline on counties, road types, times of day and reporting thresholds and found the driverless advantage near zero or reversed, 'safer than humans' would look like a comparison artifact.",
          skeptic_flip:
            "If regulators or more independent insurers, using their own data rather than the operator's, repeated the large cuts in injury crashes Swiss Re found, the edge would be hard to dismiss as self-serving.",
          common_ground:
            "Both sides agree the comparison means something only if the human benchmark is matched to the same streets, speeds, times and reporting thresholds the fleet drives, and that almost all the published analysis so far is by or with Waymo.",
          live_disagreement:
            "Whether the measured advantage survives a fully like-for-like, independently audited matching, including under-reporting correction and crash-type breakdown, which an open re-analysis of NHTSA reports and matched state crash records could settle.",
        },
      },
      evidence: [
        {
          id: "waymo-56m-crashtype",
          title: "Waymo, Peer-Reviewed (2025): Fewer Crashes in Most Types Over 56.7 Million Miles, No Type Worse",
          description:
            "Across 56.7 million rider-only miles, Waymo researchers reported statistically significant reductions against benchmark human drivers in matched areas, for example 96% fewer any-injury intersection crashes and 91% fewer airbag-deployment intersection crashes, and no statistically significant disbenefit in any of 11 crash-type groups.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 8,
            directness: 9,
          },
          source:
            "Kusano, Scanlon, Chen, McMurry, Gode & Victor (2025), Traffic Injury Prevention; open preprint arXiv:2505.01515",
          sourceUrl: "https://arxiv.org/abs/2505.01515",
          reasoning:
            "Peer-reviewed, with transparent methods and confidence intervals. The authors are Waymo employees analysing Waymo data, so it is checkable but not disinterested. It covers city streets in the cities where Waymo drove, not roads in general.",
        },
        {
          id: "swissre-claims",
          title: "Swiss Re: 88% Fewer Property-Damage and 92% Fewer Injury Claims Over 25.3 Million Miles",
          description:
            "Reinsurer Swiss Re compared Waymo's 25.3 million rider-only miles against its own database of more than 500,000 claims and 200 billion miles of human exposure, finding 88% fewer property-damage and 92% fewer bodily-injury liability claims (86% and 90% fewer against 2018-2021 cars with driver-assistance features).",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Di Lillo, Gode, Zhou, Atzei, Chen & Victor (2024), Swiss Re with Waymo, 'Comparative Safety Performance of Autonomous- and Human Drivers'",
          sourceUrl: "https://waymo.com/blog/2024/12/new-swiss-re-study-waymo/",
          reasoning:
            "The human side comes from an insurer's claims data rather than Waymo's crash logs, which makes it the most independent comparison published. Waymo co-authored it, and Swiss Re's database is proprietary, so outsiders cannot re-run it.",
        },
        {
          id: "waymo-7m-peerreviewed",
          title: "Waymo, Peer-Reviewed (2024): 80% Fewer Injury Crashes Over 7.1 Million Miles",
          description:
            "An earlier study over 7.14 million rider-only miles in Phoenix, San Francisco and Los Angeles found 80% fewer any-injury-reported crashes and 55% fewer police-reported crashes than matched human benchmarks adjusted for under-reporting.",
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
            "Same method as the 56.7-million-mile study at an eighth of the mileage, and the result held as miles grew. Same limit on independence: operator self-analysis.",
        },
        {
          id: "nhtsa-sgo-not-normalized",
          title: "NHTSA Crash Reports, June 2025–September 2026: 1,283 From Waymo, 78 From Zoox, 36 From Tesla, None Per Mile",
          description:
            "Under its amended Standing General Order (effective 16 June 2025), NHTSA publishes every crash report from driverless-system operators. In the file covering 16 June 2025 to 15 September 2026, Waymo filed 1,283 distinct reports, Avride 91, Zoox 78 and Tesla 36 (Argumend's count of the latest version of each report). Most were property damage only; Waymo's include two fatal crashes; its narratives describe an SUV striking a pedestrian who was thrown into the slowing Waymo (Dallas, August 2026), and a motorcyclist who hit the back of a slowing Waymo and was then struck by a passing car (Tempe, September 2025). NHTSA cautions that 'summary incident report data are not normalized', that reports 'may be incomplete or unverified', and that one crash may produce several reports.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source:
            "NHTSA, Standing General Order on Crash Reporting, ADS incident report data (16 June 2025 to 15 September 2026)",
          sourceUrl:
            "https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting",
          reasoning:
            "The only independent public record of driverless crashes, and it is complete by law. But it has no mileage, so it cannot say who is safer: Waymo files far more reports because it drives far more. The narratives are written by the operators. It supports the point that no outside body can yet compute crash rates, not that the cars are unsafe.",
        },
        {
          id: "chen-shladover-sf",
          title: "Outside Researchers, San Francisco: Driverless Waymo Crashed Less Per Mile Than Uber Drivers, Driverless Cruise More",
          description:
            "Chen and Shladover (2024 preprint) compared crashes per million miles on San Francisco streets, freeways excluded, across Uber human driving (CPUC 2020 report), supervised testing (California DMV, December 2020 to November 2022) and driverless Waymo and Cruise operations (March 2022 to August 2023). Driverless Waymo had a lower rate than Uber human driving; driverless Cruise had a higher one. The authors write that the data samples are 'not yet large enough to support conclusions' about whether the systems are more or less safe than human drivers there.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Chen & Shladover, 'Initial Indications of Safety of Driverless Automated Driving Systems', arXiv:2403.14648 (February 2024)",
          sourceUrl: "https://arxiv.org/abs/2403.14648",
          reasoning:
            "Built by outside researchers on state records, in one city. It cuts against reading one operator's record as 'self-driving cars are safer': the result split by company. It is a preprint on far fewer miles than Waymo's later data, so it bounds rather than overturns the operator studies.",
        },
        {
          id: "tesla-fsd-report",
          title: "Tesla Says Its Supervised FSD Has 9x Fewer Major Collisions Than Manual Driving Over 17 Billion Miles",
          description:
            "Tesla's FSD (Supervised) Vehicle Safety Report counts more than 17 billion miles driven with the system and claims '9x fewer major collisions' (airbag deployments) and 7x fewer minor ones than Teslas driven manually. A collision counts as FSD-engaged if the system was active within five seconds before it, and Tesla says it 'does not attribute fault'. FSD (Supervised) requires a human driver watching the road; Tesla's driverless robotaxi miles are not published.",
          side: "for" as const,
          weight: {
            sourceReliability: 4,
            independence: 2,
            replicability: 3,
            directness: 4,
          },
          source: "Tesla, 'Full Self-Driving (Supervised) Vehicle Safety Report' (accessed November 2026)",
          sourceUrl: "https://www.tesla.com/fsd/safety",
          reasoning:
            "Huge mileage, but self-reported with no outside review, and not matched: drivers switch FSD on for easier roads and conditions, so the comparison with manual driving is not like-for-like. It is a supervised system, so it speaks to human-plus-machine driving, not to cars with no one at the wheel.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: How they fail. Rare, severe and new kinds of crash.
    // =========================================================================
    {
      id: "edge-cases",
      title: "How They Fail: Rare, Strange and Sometimes Severe",
      short_summary:
        "Driverless cars fail in ways people rarely do: dragging a pinned pedestrian, ignoring a stop arm, missing hazards in glare and fog. Whether those rare failures cancel out the average advantage, once weighted by how often and how badly they happen, is the second split.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Software fails differently from people, sometimes in ways no attentive human would. In October 2023 a Cruise robotaxi, after a human-driven car threw a pedestrian into its path, misread the crash and pulled over, dragging her about 20 feet; Cruise lost its permit and later admitted submitting a false report to federal regulators. In December 2025 Waymo recalled 3,067 vehicles because its software 'may cause the vehicle to pass a stopped school bus even when the red lights are flashing'. In January 2026 a Waymo hit a child who stepped out from behind an SUV near a Santa Monica school, and NHTSA said it would open an investigation. NHTSA has also investigated Tesla's FSD for crashes in sun glare and fog, including a pedestrian death. A single software flaw is copied across every car at once, and averages over millions of uneventful miles can hide exactly those failures. As fleets grow from thousands of cars to hundreds of thousands, so does the exposure.",
      proponent_rebuttal:
        "Human driving has a far worse long tail: drunk, distracted, sleepy and speeding drivers kill about 40,000 Americans a year. Waymo's own analysis of 37,654 fatal crashes in 2023 found that over 77% involved impairment, speeding or an unbelted occupant, risks a driverless car does not take. The failures that make news are visible because the system makes them visible: every crash is reported to NHTSA, recalls follow specific defects, and the fix reaches the whole fleet at once. Waymo's fix was on every affected car by 17 November 2025, before the recall was even filed. In Santa Monica the car braked from about 17 mph to under 6 mph before contact, and Waymo's model says an attentive human would have hit the child at about 14 mph. The worst operator, Cruise, was taken off the road. And in the band where catastrophic failures would show up, serious injury or worse, Waymo's record through June 2026 is 95% below the human benchmark, not above it.",
      crux: {
        id: "tail-risk-accounting",
        title: "Do the Long-Tail Failures Erase the Average Advantage?",
        question:
          "Do rare but severe self-driving failures erase the average safety advantage?",
        description:
          "Whether rare but severe driverless failure modes (mishandled post-crash manoeuvres, ignored stop arms, blindness in glare or fog) net out below the human baseline once weighted fairly by severity, or whether averages mask unacceptable tail risk as fleets scale.",
        methodology:
          "Catalogue every reported severe driverless failure (NHTSA crash reports, recall filings, defect investigations), estimate exposure-adjusted rates by severity tier, and compare them with severity-matched human rates rather than comparing averages alone. Track whether recalls fix failure classes or whether new ones keep appearing as fleets enter new cities.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "A catalogue of every reported severe driverless failure from NHTSA crash reports, recalls and defect investigations, turned into exposure-adjusted rates by severity tier and compared with severity-matched human rates as fleets grow.",
        },
        cost_to_verify: "$0 (public NHTSA crash, recall and investigation records), plus operator mileage",
        falsification: {
          supporter_flip:
            "If exposure-adjusted rates of serious-injury and fatal crashes, built from NHTSA records, came out at or above the severity-matched human rate as fleets grew, the 'fewer and more fixable failures' defence would fail on the numbers.",
          skeptic_flip:
            "If severity-matched comparisons kept finding serious and fatal crashes well below the human rate as the fleets grew, and each recall closed its failure class for good, rare failures would look unlikely to erase the average edge.",
          common_ground:
            "Both sides agree driverless systems have produced new kinds of severe failure, such as the Cruise drag and Waymo's stop-arm recall, that a software fix reaches the whole fleet at once, and that averages over millions of miles can hide rare events.",
          live_disagreement:
            "Whether severe driverless failures, weighted by exposure and severity, net out below the severity-matched human baseline, and whether new failure classes keep appearing as the fleets enter new places.",
        },
      },
      evidence: [
        {
          id: "waymo-serious-injury-tier",
          title: "Waymo Through June 2026: 95% Fewer Serious-Injury-or-Worse Crashes Over 271 Million Miles",
          description:
            "Waymo's safety hub, through June 2026, covers 271.3 million rider-only miles in the Los Angeles, San Francisco Bay Area, Phoenix, Austin and Atlanta areas. Against an average human driver over the same distance on the same streets, it reports 95% fewer serious-injury-or-worse crashes (55 fewer), 82% fewer injury crashes, 93% fewer pedestrian-injury crashes and 86% fewer cyclist-injury crashes. It states that for fatal crashes alone 'there is not enough Waymo VMT to detect statistical significance', and that it has 'only limited miles on freeways, so we focus on surface streets, only.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 7,
            directness: 7,
          },
          source: "Waymo Safety Impact data hub (rider-only miles through June 2026)",
          sourceUrl: "https://waymo.com/safety/impact/",
          reasoning:
            "Speaks to the severity tier this crux is about: where tail failures would show, the rate is lower, not higher. It is the operator's own analysis, deaths are still too rare to measure, and freeways and the newer cities are left out, so it bounds a catastrophic failure mode rather than ruling one out.",
        },
        {
          id: "waymo-school-bus-recall",
          title: "Waymo Recalled 3,067 Cars in December 2025 for Passing Stopped School Buses",
          description:
            "Waymo's recall 25E-084, opened under NHTSA investigation PE25013, covered 3,067 vehicles running its fifth-generation driving system on software before the 5 November 2025 release: 'The software may cause the vehicle to pass a stopped school bus even when the red lights are flashing and/or stop arm is extended.' NHTSA's summary gives the consequence as an increased 'risk of crash with a pedestrian'. The remedy was a software update; 'all affected vehicles were repaired by November 17, 2025.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "NHTSA recall 25E-084 (Waymo LLC, received 8 December 2025; investigation PE25013), NHTSA recalls database",
          sourceUrl: "https://api.nhtsa.gov/recalls/campaignNumber?campaignNumber=25E084",
          reasoning:
            "A federal record of a fleet-wide failure on one of the most protected manoeuvres on US roads, by the operator with the best record. It cuts both ways: the same record shows the fix reaching every car within days, which no recall of human drivers could do. No injury is recorded in the filing.",
        },
        {
          id: "cruise-recall",
          title: "Cruise Robotaxi Dragged a Pinned Pedestrian in 2023; Company Admitted a False Report to NHTSA",
          description:
            "Per NHTSA recall 23E-086, after a human-driven car threw a pedestrian into a Cruise robotaxi's path on 2 October 2023, the car misclassified the collision and pulled over, dragging the pinned pedestrian forward. Cruise recalled 950 vehicles, lost its California driverless permit, and later admitted in federal court to submitting a false report about the incident, paying a $500,000 fine. GM later shut the Cruise robotaxi business.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source:
            "NHTSA Part 573 Safety Recall Report 23E-086 (7 November 2023); US Department of Justice (N.D. Cal.) deferred prosecution agreement (November 2024)",
          sourceUrl: "https://static.nhtsa.gov/odi/rcl/2023/RCLRPT-23E086-7725.PDF",
          reasoning:
            "An official recall filing plus a federal admission. It shows a failure no human driver would make, and an operator hiding it. It is a single incident from a defunct operator, not a fleet-wide rate.",
        },
        {
          id: "waymo-santa-monica-child",
          title: "Waymo Hit a Child Near a Santa Monica School in January 2026; NHTSA Said It Would Investigate",
          description:
            "On 23 January 2026 a Waymo struck a young pedestrian who stepped into the road from behind a tall SUV in Santa Monica. Waymo says the car 'braked hard, reducing speed from approximately 17 mph to under 6 mph before contact was made'; the child stood up and walked to the sidewalk, and Waymo called 911. Waymo says its peer-reviewed model shows an attentive human driver would have hit the child at about 14 mph, and that 'NHTSA has indicated to us that they intend to open an investigation into this incident.'",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source: "Waymo, 'A commitment to transparency and road safety' (28 January 2026)",
          sourceUrl: "https://waymo.com/blog/2026/01/a-commitment-to-transparency-and-road-safety/",
          reasoning:
            "A real collision with a child near a school, in exactly the setting critics worry about. Every detail here is Waymo's own account, including the human counterfactual, which is a model estimate. The outcome of NHTSA's inquiry is not public in this record.",
        },
        {
          id: "tesla-fsd-investigation",
          title: "NHTSA Opened an Investigation in October 2024 Into Tesla FSD Crashes in Glare and Fog, Including a Death",
          description:
            "NHTSA investigation PE24031 (opened 17 October 2024, covering about 2.4 million Teslas with FSD) examined crashes in which FSD failed to respond appropriately to reduced roadway visibility such as sun glare, fog or airborne dust, including one in which a pedestrian was killed.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source: "NHTSA Office of Defects Investigation, PE24031 opening resume (October 2024)",
          sourceUrl: "https://static.nhtsa.gov/odi/inv/2024/INOA-PE24031-23232.pdf",
          reasoning:
            "A primary federal investigation document. FSD is a supervised driver-assistance system, so it speaks to camera-only automation with a human expected to intervene, not to driverless robotaxis; directness is lowered for that reason.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Spreading out. How much proof before broad use?
    // =========================================================================
    {
      id: "deploy-broadly",
      title: "Spreading Out: How Much Proof Before Broad Use?",
      short_summary:
        "The fleets are leaving their first cities: Waymo carried passengers in 14 cities by September 2026 and onto freeways from November 2025, and plans Tokyo and London. Proving a lower death rate statistically would take hundreds of millions of miles or more. Whether step-by-step expansion is enough proof, given the lives lost to waiting, is a value fork as much as a data question.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "'Safer' is being claimed for places the record does not cover. RAND showed that proving a driverless car beats humans on fatalities could take hundreds of millions to hundreds of billions of miles. Waymo's published safety data still cover five metro areas and surface streets only; the company says it has 'only limited miles on freeways', where it began carrying passengers in November 2025, and its 2026 cities, from Miami and Houston to Denver and Las Vegas, have no published record yet. The cars still call on remote human 'fleet response' agents for help in hard situations. Much of the US death toll happens at speed, at night and on rural roads, conditions that are thin in the record. Expanding faster than the evidence turns millions of people into an experiment they did not choose, and a single bad crash in a new city could set back trust in the technology for years.",
      proponent_rebuttal:
        "Waiting for perfect proof has its own body count. RAND modelled hundreds of futures and found that allowing wide use once driverless cars are just 10% safer than human drivers could save thousands of lives over 15 years, and possibly hundreds of thousands over 30, compared with waiting until they are 75% or 90% safer. The industry is not jumping: Waymo has expanded city by city, adding freeways in three metros first, and its 2026 launches opened by invitation before opening to everyone. Remote agents give the car information; Waymo says its driver 'is in control of the vehicle at all times'. Waymo's own research on 37,654 fatal crashes in 2023 found that over 77% involved impairment, speeding or seat-belt non-use, the failures a machine does not make, and that even sober drivers face three to four times the fatal-crash risk at night. Each new city adds miles to the record. Staged expansion is how the proof RAND says road tests alone cannot deliver soon gets built.",
      crux: {
        id: "proof-vs-deployment",
        title: "Can Broad Deployment Be Justified Before Open-Road Proof Exists?",
        question:
          "Can simulation and step-by-step expansion justify broad deployment before road miles prove it safer?",
        description:
          "Whether staged rollout plus simulation can stand in for the impractically large road mileage needed to prove a lower death rate, or whether broad deployment demands proof that does not yet exist. How much evidence to demand first, given the lives lost to delay, is a value choice.",
        methodology:
          "Compare the mileage and time needed for statistical proof of a lower fatality rate (RAND's model) with the pace at which operators validate new cities and road types; track whether safety outcomes in each new domain (freeways, new climates, new cities) match the record from the first ones; weigh lives lost to delay against tail risk from premature scale.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Published crash rates for each new domain as fleets enter it, such as freeways, snow and the 2026 cities, set against the record from the first five metros, showing whether staged expansion catches new failures before scale. How much evidence to require first, given lives lost to delay, is a value choice.",
        },
        cost_to_verify: "$0 (modelling and NHTSA crash data), but full statistical proof takes years of miles",
        falsification: {
          supporter_flip:
            "If staged expansion kept missing failure modes that appear only in new conditions, such as freeways, snow or new cities, until after scaling, 'deploy broadly, step by step' would look premature.",
          skeptic_flip:
            "If crash rates in each new city and on freeways matched the record from the first metros, and studies found waiting for RAND's mileage cost more lives than staged deployment, indefinite waiting would look like the costlier choice.",
          common_ground:
            "Both sides agree statistical proof of a lower fatality rate needs far more miles than any fleet has driven, that published safety data cover only a few metros and surface streets, and that delay also costs lives.",
          live_disagreement:
            "How much evidence to demand before driverless cars spread to new cities and road types, given lives lost both to premature scale and to waiting, which is partly a value choice data alone cannot make.",
        },
      },
      evidence: [
        {
          id: "rand-cost-of-waiting",
          title: "RAND (2017): Allowing Cars 10% Safer Than Humans Could Save Thousands of Lives Versus Waiting for 75–90%",
          description:
            "RAND's 'The Enemy of the Good' (Kalra & Groves, 2017) estimated road deaths under hundreds of plausible futures. It found that allowing wide use of autonomous vehicles once they are 10 percent better than current American drivers could prevent thousands of road fatalities over 15 years, and possibly hundreds of thousands over 30 years, compared with waiting until they are 75 or 90 percent better.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 5,
            directness: 6,
          },
          source:
            "Kalra & Groves, 'The Enemy of the Good: Estimating the Cost of Waiting for Nearly Perfect Autonomous Vehicles', RAND Corporation (2017); RAND news release, 7 November 2017",
          sourceUrl: "https://www.eurekalert.org/news-releases/805563",
          reasoning:
            "Independent modelling aimed squarely at this crux's value question, the price of delay. It is a model, not a measurement, and it assumes the 10% edge is known, which RAND's own earlier work says road miles alone cannot prove soon.",
        },
        {
          id: "waymo-fatal-crash-factors",
          title: "Waymo Research (2026): Over 77% of 2023 US Fatal Crashes Involved Impairment, Speeding or No Seat Belt",
          description:
            "Analysing 37,654 fatal cases in the 2023 federal FARS database, Waymo researchers found 'over 77% of all fatal cases involved at least one' of impairment, speeding or seat-belt or helmet non-use, and 'only 8.2% of fatal cases involved strictly human behavior factors alone'. A second study, accepted by the Journal of Safety Research, estimated that removing alcohol-involved drivers lowers the urban fatal-crash involvement rate by 23%, and that 'even for 100% sober drivers, nighttime fatal crash risk remains 3.1 to 3.9 times higher than daytime risk.'",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 6,
            directness: 5,
          },
          source: "Waymo, 'Sober driving benchmarks' (8 October 2026), summarizing a Journal of Safety Research paper and an IRCOBI paper",
          sourceUrl: "https://waymo.com/blog/2026/10/sober-driving-benchmarks/",
          reasoning:
            "Shows how much of the human death toll comes from behaviours a machine does not have, which is the stake in waiting. It is research by the operator with the most to gain, and it says what driverless cars could address, not what they have achieved on the roads where those deaths happen.",
        },
        {
          id: "rand-miles",
          title: "RAND (2016): Proving a Lower Death Rate Could Take Hundreds of Millions to Hundreds of Billions of Miles",
          description:
            "RAND's 'Driving to Safety' (Kalra & Paddock, 2016) found autonomous vehicles would need to be driven hundreds of millions, and sometimes hundreds of billions, of miles to demonstrate their fatality and injury reliability against humans, which would take many decades of test driving, so road testing alone cannot establish broad superiority.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 7,
          },
          source: "Kalra & Paddock, 'Driving to Safety', RAND Corporation report RR1478 (2016)",
          sourceUrl: "https://www.rand.org/pubs/research_reports/RR1478.html",
          reasoning:
            "Independent, with a transparent statistical model. It argues that proof is impractical, not that driverless cars are unsafe. Deaths are still too rare in Waymo's 271 million miles to measure on their own.",
        },
        {
          id: "waymo-freeways-limited-data",
          title: "Waymo Has Carried Riders on Freeways Since November 2025 but Publishes Safety Data for City Streets Only",
          description:
            "On 12 November 2025 Waymo began 'welcoming riders to use Waymo on freeways across the San Francisco Bay Area, Phoenix, and Los Angeles'. Its safety hub, through June 2026, still says: 'We currently only have limited miles on freeways, so we focus on surface streets, only.' By 1 September 2026 Waymo counted '14 cities where we're providing riders fully autonomous trips', while the hub's comparisons draw on five metro areas.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 7,
            directness: 7,
          },
          source:
            "Waymo, 'Taking riders further, safely, with freeways' (12 November 2025); Waymo Safety Impact data hub (through June 2026); Waymo, 'Welcoming our first riders in Denver, San Diego, and Tampa' (1 September 2026)",
          sourceUrl: "https://waymo.com/blog/2025/11/taking-riders-further-safely-with-freeways/",
          reasoning:
            "Waymo's own pages show deployment running ahead of the published safety record: freeways and most new cities are not in the comparison yet. That is how staged expansion works, which is the other side's point, but it means the 'safer' claim covers less ground than the service does.",
        },
        {
          id: "geofence-remote-ops",
          title: "Driverless Fleets Still Lean on Remote Human Agents for Hard Situations",
          description:
            "Waymo's documentation says its vehicles request input from remote human 'fleet response' agents in complex situations; the agents provide information while the Waymo Driver 'is in control of the vehicle at all times.' The reliance on remote assistance was aired at the US Senate Commerce Committee's 4 February 2026 hearing on self-driving cars, where Waymo's chief safety officer testified.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source:
            "Waymo, 'How fleet response supports the Waymo Driver' (May 2024); US Senate Commerce Committee hearing 'Hit the Road, Mac: The Future of Self-Driving Cars' (4 February 2026)",
          sourceUrl: "https://waymo.com/blog/2024/05/fleet-response/",
          reasoning:
            "Shows a human backstop behind 'driverless' service, which matters for how far and how fast fleets can scale. It does not show the cars are unsafe: agents advise rather than steer, and the dependence may shrink as the software improves.",
        },
      ],
    },
  ],
};
