export const nuclearProliferationNewArmsRaceData = {
  id: "nuclear-proliferation-new-arms-race",
  title: "The New Nuclear Arms Race",
  meta_claim:
    "The collapse of Cold War-era arms control treaties and simultaneous nuclear modernization by the US, Russia, and China has initiated a new nuclear arms race that makes nuclear conflict more likely than at any point since 1962.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Treaty Collapse
    // =========================================================================
    {
      id: "treaty-collapse",
      title: "Arms Control Treaty Collapse",
      short_summary:
        "The architecture of nuclear arms control built over decades has largely disintegrated. The INF Treaty is dead, New START has expired, the JCPOA was abandoned, and the Comprehensive Test Ban Treaty was never ratified by the US. The question is whether this treaty collapse represents a temporary setback that can be rebuilt or a structural shift toward an ungoverned nuclear order.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "The collapse of Cold War-era arms control treaties does not automatically mean nuclear risk has increased. These treaties were products of a bipolar world that no longer exists. The INF Treaty was already being violated by Russia for years before the US withdrew. New START capped only strategic warheads while ignoring tactical nuclear weapons, new delivery systems, and China's arsenal entirely. The treaties created a false sense of security while failing to address 21st-century threats. What matters is not the existence of treaties but the underlying strategic calculus: nuclear-armed states still face mutual assured destruction, which has prevented nuclear war for 80 years regardless of treaty status. Deterrence works through capability and credibility, not paper agreements.",
      proponent_rebuttal:
        "Arms control treaties did far more than create symbolism — they established verification mechanisms, communication channels, data exchanges, and predictability that reduced the risk of miscalculation. The INF Treaty eliminated an entire class of destabilizing weapons. New START's inspection regime gave each side confidence in the other's force posture, reducing the incentive for worst-case planning. Without these frameworks, both sides must assume the worst about the other's capabilities and intentions, driving arms racing dynamics. Russia has suspended participation in New START (February 2023) and withdrawn from the Comprehensive Nuclear-Test-Ban Treaty (November 2023). The historical record shows that periods without arms control — the late 1950s, the early 1980s — were the most dangerous moments of the nuclear age. We are entering another such period, but now with nine nuclear states instead of two.",
      crux: {
        id: "verification-regime-value",
        title: "The Verification Regime Impact Assessment",
        description:
          "If the loss of treaty verification mechanisms (on-site inspections, data exchanges, notification requirements) demonstrably increases uncertainty about adversary force posture and leads to compensatory force buildup, then treaty collapse directly increases nuclear risk. If states can maintain adequate intelligence about each other's arsenals through national technical means (satellites, signals intelligence) alone, the loss of treaty verification is manageable.",
        methodology:
          "Analyze the correlation between arms control verification regimes and nuclear force sizing decisions by comparing periods with active verification (1991-2023) versus periods without (1949-1972, 2023-present). Measure whether the absence of inspections leads to higher warhead estimates, increased modernization spending, and more aggressive force postures. Interview current and former nuclear planners from US, Russia, and allied nations.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Strategic studies analysis requiring classified data access and expert interviews)",
      },
      evidence: [
        {
          id: "inf-treaty-collapse",
          title: "INF Treaty Terminated After Russian Violations (2019)",
          description:
            "The United States formally withdrew from the Intermediate-Range Nuclear Forces Treaty in August 2019, citing Russia's deployment of the SSC-8 (9M729) ground-launched cruise missile, which exceeded the treaty's 500-5,500 km range limit. Russia denied violating the treaty but had been assessed as non-compliant by the US intelligence community since 2014. The INF Treaty had eliminated 2,692 missiles and an entire class of destabilizing nuclear weapons since 1987. Its collapse freed both the US and Russia to develop and deploy intermediate-range nuclear missiles in Europe and Asia.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source: "State Department; Arms Control Association; Congressional Research Service",
          sourceUrl: "https://www.armscontrol.org/factsheets/INFtreaty",
          reasoning:
            "The treaty's collapse is a documented historical fact. The intelligence assessment of Russian violations is supported by multiple NATO allies. The strategic consequences — freedom to deploy intermediate-range nuclear weapons — directly bear on proliferation risk.",
        },
        {
          id: "new-start-suspended",
          title: "Russia Suspends New START Participation (February 2023)",
          description:
            "In February 2023, President Putin announced Russia's suspension of participation in New START, the last remaining US-Russia nuclear arms control treaty. Russia ceased providing notification of missile tests, refused on-site inspections, and stopped data exchanges on nuclear force posture. New START had capped each side at 1,550 deployed strategic warheads and 700 deployed delivery systems. The treaty expired in February 2026 with no successor agreement under negotiation.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "Kremlin.ru; Arms Control Association; Reuters",
          sourceUrl: "https://www.armscontrol.org/factsheets/NewSTART",
          reasoning:
            "Russia's suspension and the treaty's subsequent expiration are undisputed facts with enormous strategic significance. For the first time since 1972, there are no limits on US or Russian nuclear arsenals and no bilateral verification mechanisms. This directly supports the claim of a new arms race.",
        },
        {
          id: "deterrence-80-year-record",
          title: "Nuclear Deterrence Has Prevented Great Power War for 80 Years",
          description:
            "Since the first nuclear weapons were used in 1945, no nuclear-armed state has engaged in direct military conflict with another nuclear-armed state. The Cold War saw multiple crises (Berlin 1961, Cuba 1962, Able Archer 1983) but none escalated to nuclear exchange. This 80-year record suggests that deterrence — not treaties — is the fundamental mechanism preventing nuclear war. Even during periods of intense arms racing without arms control (1949-1972), deterrence held.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "RAND Corporation; International Security; Brookings Institution",
          sourceUrl: "https://www.rand.org/topics/nuclear-deterrence.html",
          reasoning:
            "The 80-year record of deterrence is a strong empirical observation. However, survivorship bias is a significant concern — we cannot observe the counterfactual worlds where deterrence failed because they would have been catastrophic. Several near-misses (Petrov incident 1983, Norwegian rocket incident 1995) suggest luck has played a role alongside deterrence logic.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Modernization Programs
    // =========================================================================
    {
      id: "modernization-programs",
      title: "Nuclear Modernization & Arsenal Expansion",
      short_summary:
        "All nine nuclear-armed states are simultaneously modernizing their arsenals. The US has committed $2 trillion over 30 years, China is tripling its warhead count, Russia is deploying hypersonic delivery systems, and North Korea has developed solid-fuel ICBMs. The question is whether this represents defensive modernization or an offensive arms race that destabilizes deterrence.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Nuclear modernization is not the same as an arms race. The US nuclear arsenal is built on systems designed in the 1970s-1980s — the Minuteman III ICBM, Ohio-class submarines, and B-52 bomber. Replacing aging systems with modern equivalents maintains deterrent capability without expanding it. The US is not increasing its warhead count; it is replacing delivery systems that are literally older than the people operating them. China's arsenal expansion from ~300 to ~1,000 warheads brings it to rough parity with the US and Russia, which could actually stabilize deterrence by creating a more balanced tripolar structure. Modernization is what responsible nuclear states do to ensure their deterrent remains credible — a degraded deterrent is more dangerous than a modern one.",
      proponent_rebuttal:
        "The scale and nature of current modernization goes far beyond maintenance. The US Sentinel ICBM program, Columbia-class submarine, B-21 Raider bomber, and Long-Range Standoff Weapon represent capabilities qualitatively different from their predecessors — greater accuracy, lower yield options for 'usable' nuclear weapons, and hypersonic delivery that compresses warning times. Russia's Sarmat heavy ICBM, Poseidon nuclear torpedo, and Burevestnik nuclear-powered cruise missile are designed specifically to defeat US missile defenses. China's rapid expansion from ~300 to a projected 1,500 warheads by 2035 is not 'reaching parity' — it is tripling arsenal size while building 300+ new ICBM silos in western China. The Pentagon's 2023 Nuclear Posture Review acknowledged that the US may need to increase its deployed warhead count for the first time since the Cold War to address simultaneous threats from Russia and China.",
      crux: {
        id: "warhead-count-trajectory",
        title: "The Global Warhead Trajectory Analysis",
        description:
          "If total global nuclear warhead counts increase significantly over the next decade (reversing the post-Cold War decline from 70,000 to ~12,500), and if new weapon types create first-strike capabilities or undermine second-strike survivability, then a genuine arms race is underway. If warhead counts remain roughly stable while aging systems are replaced with modern equivalents, this is modernization rather than escalation.",
        methodology:
          "Track annual estimates of deployed and total warhead counts for all nine nuclear states using SIPRI, FAS, and national intelligence assessments. Measure not just warhead counts but qualitative indicators: number of warhead types, delivery system diversity, missile defense deployments, and development of destabilizing first-strike capabilities (hypersonic glide vehicles, MIRVed systems, counterforce accuracy improvements).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K (Annual open-source intelligence analysis plus satellite imagery interpretation)",
      },
      evidence: [
        {
          id: "us-2-trillion-modernization",
          title: "US Commits $2 Trillion to Nuclear Modernization Over 30 Years",
          description:
            "The Congressional Budget Office estimates the US will spend approximately $2 trillion over 30 years (2023-2052) on nuclear weapons modernization, including the Sentinel ICBM ($96B+), Columbia-class submarine ($128B+), B-21 Raider bomber ($80B+), and warhead refurbishment programs. This represents the largest nuclear investment since the Manhattan Project in inflation-adjusted terms. The program simultaneously replaces all three legs of the nuclear triad plus the command-and-control infrastructure.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Congressional Budget Office; Department of Defense",
          sourceUrl: "https://www.cbo.gov/publication/59054",
          reasoning:
            "CBO cost estimates are authoritative and independently produced. The $2 trillion figure directly demonstrates the scale of nuclear investment. However, proponents argue this represents replacement of aging systems rather than expansion, which moderates the directness score.",
        },
        {
          id: "china-warhead-tripling",
          title: "China Projected to Triple Nuclear Warhead Stockpile by 2035",
          description:
            "The Pentagon's 2023 report on Chinese military power assessed that China's nuclear warhead stockpile exceeded 500 in 2023 (up from roughly 200 in 2019) and is on track to reach 1,000 by 2030 and 1,500 by 2035. Satellite imagery has revealed over 300 new ICBM silos under construction in three locations in western China. This is the fastest nuclear expansion by any nation since the US and Soviet Union in the 1950s-1960s and represents a fundamental change in China's historical 'minimum deterrence' posture.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source: "Department of Defense; Federation of American Scientists; CSIS",
          sourceUrl: "https://media.defense.gov/2023/Oct/19/2003323409/-1/-1/1/2023-MILITARY-AND-SECURITY-DEVELOPMENTS-INVOLVING-THE-PEOPLES-REPUBLIC-OF-CHINA.PDF",
          reasoning:
            "The Pentagon report is based on intelligence assessments and satellite imagery. Independence is somewhat lower because US strategic interests may influence threat characterization. However, the satellite imagery of new silo fields has been independently verified by commercial satellite analysts (Federation of American Scientists, James Martin Center). The tripling of China's arsenal directly supports the arms race claim.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: AI & Autonomous Systems
    // =========================================================================
    {
      id: "ai-autonomous-nuclear",
      title: "AI & Autonomous Systems in Nuclear Command",
      short_summary:
        "The integration of artificial intelligence into early warning systems, targeting, and potentially launch authority compresses decision timelines and introduces new risks of algorithmic escalation. Hypersonic weapons reduce warning times from 30 minutes to under 10, potentially requiring automated responses that remove human judgment from nuclear decisions.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "AI integration into nuclear command-and-control is primarily about improving early warning accuracy, not automating launch decisions. The US maintains a strict policy of human-in-the-loop for all nuclear launch authority, and there is no credible evidence that any nuclear state plans to delegate launch authority to AI. Better AI in early warning systems could actually reduce false alarm risks — the Petrov incident in 1983, where a Soviet officer correctly identified a false missile warning, might have been resolved faster with modern AI that could distinguish satellite reflections from actual launches. Hypersonic weapons are concerning but do not fundamentally change deterrence — submarine-based second-strike capabilities ensure that a first strike can always be answered, regardless of delivery speed.",
      proponent_rebuttal:
        "The danger is not deliberate automation of launch authority but the erosion of human decision-making time. Hypersonic glide vehicles traveling at Mach 20+ reduce warning times from the Cold War's 30 minutes to potentially under 10 minutes for regional targets. When decision windows compress below the time needed for human deliberation, there is enormous pressure to pre-delegate authority to automated systems or adopt launch-on-warning postures that increase the risk of catastrophic error. Russia's Perimeter ('Dead Hand') system already provides for automated retaliatory launch under certain conditions. China's integration of AI into military command systems is well-documented. The interaction of AI-enabled targeting, autonomous sensors, and compressed decision timelines creates emergent risks that no one fully understands — risks that are qualitatively different from the Cold War because they involve complex software systems that can fail in unpredictable ways.",
      crux: {
        id: "ai-decision-timeline-compression",
        title: "The Decision Timeline Compression Analysis",
        description:
          "If hypersonic weapons and AI-enabled targeting demonstrably compress nuclear decision timelines below the threshold for reliable human deliberation (estimated at 10-15 minutes minimum for heads of state), and if this compression creates pressure for automated or pre-delegated launch authority, then AI integration genuinely increases nuclear risk. If human-in-the-loop decision-making remains feasible despite faster delivery systems, the AI concern is overstated.",
        methodology:
          "Model decision timelines under various hypersonic attack scenarios using publicly available data on flight times, radar detection capabilities, and national command authority communication chains. Conduct classified tabletop exercises with former nuclear command personnel to assess whether current decision processes can function within compressed timelines. Analyze the history of false alarms to determine whether AI-enhanced warning would reduce or increase false alarm rates.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-10M (Classified wargaming and simulation exercises with expert participants)",
      },
      evidence: [
        {
          id: "hypersonic-warning-time",
          title: "Hypersonic Weapons Reduce Warning Times to Under 10 Minutes",
          description:
            "Hypersonic glide vehicles (HGVs) travel at speeds exceeding Mach 5 and follow unpredictable, maneuverable trajectories that existing missile defense and early warning systems were not designed to track. Russia's Avangard HGV, deployed on the Sarmat ICBM, can reach targets in the continental US in approximately 15-20 minutes on a depressed trajectory — significantly less than the 30-minute warning time for traditional ICBMs on minimum-energy trajectories. For regional targets (US bases in Europe or Asia), warning times could be under 10 minutes. China has tested the DF-ZF HGV, and the US is developing its own hypersonic capabilities.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source: "RAND Corporation; Congressional Research Service; Missile Defense Agency",
          sourceUrl: "https://crsreports.congress.gov/product/pdf/R/R45811",
          reasoning:
            "Flight characteristics of hypersonic weapons are well-studied by credible defense research organizations. The warning time compression is a physics-based conclusion, not speculation. Replicability is somewhat lower because specific capabilities are classified. The connection to nuclear decision-making risk is direct but depends on assumptions about pre-delegation pressure.",
        },
        {
          id: "petrov-false-alarm",
          title: "Petrov Incident: Human Judgment Prevented Nuclear War in 1983",
          description:
            "On September 26, 1983, Soviet early warning systems detected what appeared to be five US ICBM launches. Soviet duty officer Stanislav Petrov judged the warning to be a false alarm based on his intuition that a genuine first strike would involve hundreds of missiles, not five. He was correct — the detection was caused by sunlight reflecting off clouds. Had Petrov followed protocol and reported an incoming attack, Soviet leadership might have launched a retaliatory strike. This incident demonstrates both the value of human judgment in nuclear decision-making and the danger of relying on automated systems.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Bulletin of the Atomic Scientists; BBC; Petrov interviews",
          sourceUrl: "https://thebulletin.org/2023/09/the-petrov-incident-40-years-on/",
          reasoning:
            "The Petrov incident is a well-documented historical case that directly illustrates the tension between automated systems and human judgment in nuclear command. Its relevance to AI integration is strong but indirect — it demonstrates the importance of human judgment in a pre-AI era, not the specific risks of AI-enabled systems.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Arms Control Association — INF Treaty Fact Sheet",
      url: "https://www.armscontrol.org/factsheets/INFtreaty",
    },
    {
      title: "Arms Control Association — New START at a Glance",
      url: "https://www.armscontrol.org/factsheets/NewSTART",
    },
    {
      title: "CBO — Projected Costs of US Nuclear Forces, 2023 to 2032",
      url: "https://www.cbo.gov/publication/59054",
    },
    {
      title: "DoD — 2023 Report on Chinese Military Power",
      url: "https://media.defense.gov/2023/Oct/19/2003323409/-1/-1/1/2023-MILITARY-AND-SECURITY-DEVELOPMENTS-INVOLVING-THE-PEOPLES-REPUBLIC-OF-CHINA.PDF",
    },
    {
      title: "Bulletin of the Atomic Scientists — Doomsday Clock",
      url: "https://thebulletin.org/doomsday-clock/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Has deterrence failed, or is it being stress-tested and holding?",
      content:
        "Russia's tactical nuclear threats in Ukraine, North Korea's expanded arsenal, and Iran's enrichment program all test the limits of nuclear deterrence. Optimists note that deterrence has held for 80 years through far worse crises. Pessimists argue that multiplying the number of nuclear actors, adding AI to command systems, and collapsing arms control treaties changes the equation fundamentally.",
    },
    {
      id: "q2",
      title: "Can arms control be rebuilt in a multipolar world?",
      content:
        "Cold War arms control was bilateral — the US and Soviet Union negotiating one-on-one. A world with nine nuclear states and AI-enabled delivery systems requires fundamentally different frameworks. China has refused to join US-Russia arms talks, arguing its smaller arsenal should not be constrained equally. The question is whether multilateral nuclear governance is achievable or a fantasy.",
    },
    {
      id: "q3",
      title: "Does AI integration into nuclear command increase or decrease risk?",
      content:
        "Better AI in early warning could reduce false alarms like the Petrov incident. But compressed decision timelines from hypersonic weapons create pressure to automate responses, removing the human judgment that has historically prevented catastrophe. The interaction of AI speed with nuclear stakes is genuinely unprecedented.",
    },
  ],
};
