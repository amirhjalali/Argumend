import type { Topic } from "@/lib/schemas/topic";

export const nuclearWeaponsAbolitionData = {
  id: "nuclear-weapons-abolition",
  title: "Should Nuclear Weapons Be Abolished?",
  meta_claim:
    "Nuclear deterrence has prevented major wars between great powers, and complete nuclear abolition would make the world less safe rather than more.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: The Long Peace & Deterrence Theory
    // =========================================================================
    {
      id: "deterrence-long-peace",
      title: "The Long Peace & Deterrence Theory",
      short_summary:
        "Nuclear-armed great powers have not fought a direct war since 1945 — the longest such period in modern history. Deterrence theorists attribute this to mutually assured destruction, while critics argue the correlation is spurious and that nuclear weapons have brought humanity closer to extinction through accidents and crises.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The claim that nuclear weapons prevented great power war is unfalsifiable and likely wrong. The 'Long Peace' coincided with the creation of the United Nations, unprecedented economic interdependence through globalization, the spread of democracy, and the exhaustion of European imperial rivalries — any of which could explain the absence of major war. Attributing peace to nuclear weapons is post hoc reasoning. Meanwhile, nuclear deterrence has repeatedly failed to prevent wars between nuclear and non-nuclear states (Korea, Vietnam, Afghanistan, the Falklands), and the theory assumes perfect rationality from leaders — an assumption contradicted by the Cuban Missile Crisis, the 1983 Able Archer incident, and the 1995 Norwegian rocket incident, all of which brought the world to the brink of nuclear war through miscalculation rather than rational strategy.",
      proponent_rebuttal:
        "No theory can be 'proven' in international relations, but the nuclear peace hypothesis has powerful explanatory logic: when both sides in a conflict face total annihilation from escalation, the cost of war exceeds any conceivable benefit, making major war irrational. This is not merely theoretical — Soviet archives reveal that during the Berlin crises of 1948 and 1961, Soviet leaders explicitly cited nuclear consequences as the reason for restraint. The Korean War remained limited precisely because nuclear escalation was feared. India and Pakistan have fought four wars before 1998 (when both tested nuclear weapons) and zero since, despite multiple crises (Kargil 1999, Mumbai 2008, Pulwama 2019). The alternative explanations (UN, trade, democracy) existed during WWI and WWII as well — the League of Nations, extensive pre-WWI trade, and the democratic peace theory all failed to prevent those wars.",
      crux: {
        id: "nuclear-peace-causation",
        title: "The Nuclear Peace Counterfactual Test",
        description:
          "The core dispute is whether nuclear weapons caused the Long Peace or merely coincided with it. This is fundamentally a counterfactual question: would the US and Soviet Union have fought a major war between 1945 and 1991 absent nuclear weapons? If the answer is yes, nuclear deterrence has prevented the deadliest wars in human history. If no, nuclear weapons are an unnecessary existential risk.",
        methodology:
          "Historical counterfactual analysis using multiple methods: (1) Examine declassified Soviet and American war planning documents to determine whether military options were explicitly rejected due to nuclear risk. (2) Statistical analysis comparing conflict frequency between nuclear dyads, nuclear-conventional dyads, and conventional-only dyads since 1945. (3) Case-study analysis of crises where decision-makers cited nuclear weapons as the decisive factor in choosing restraint (Berlin 1948/1961, Cuban Missile Crisis, Kargil 1999).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Archival research across US, Russian, and Indian declassified records with quantitative analysis)",
      },
      evidence: [
        {
          id: "long-peace-statistic",
          title: "No Direct War Between Nuclear Great Powers Since 1945 — Longest Period in Modern History",
          description:
            "The period since 1945 represents the longest stretch without direct military conflict between the world's major powers in recorded modern history. Prior to the nuclear age, great power wars occurred on average every 20-30 years: the Napoleonic Wars (1803-1815), Crimean War (1853-1856), Franco-Prussian War (1870-1871), World War I (1914-1918), and World War II (1939-1945). The 80+ year absence of great power war since 1945 is statistically anomalous by pre-nuclear historical standards. Political scientist John Lewis Gaddis coined the term 'Long Peace' in 1986 to describe this phenomenon.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 7,
          },
          source: "John Lewis Gaddis, 'The Long Peace' (1987); Correlates of War Project",
          sourceUrl: "https://correlatesofwar.org/",
          reasoning:
            "The historical record of great power peace since 1945 is an undeniable fact, earning high reliability and replicability scores. However, directness is lower because correlation does not establish causation — multiple factors changed simultaneously in 1945 (nuclear weapons, UN, decolonization, bipolarity), making it impossible to isolate the nuclear variable from historical data alone.",
        },
        {
          id: "india-pakistan-nuclear",
          title: "India-Pakistan: Four Wars Before Nuclear Weapons, Zero Since (1947-present)",
          description:
            "India and Pakistan fought four wars before both became nuclear-armed: 1947, 1965, 1971, and the Kargil conflict in 1999 (which occurred during the year after Pakistan's nuclear tests, when deterrence doctrine was not yet established). Since both countries achieved secure second-strike capability in the early 2000s, they have experienced multiple severe crises — the 2001 Parliament attack, 2008 Mumbai attacks, and 2019 Pulwama crisis — without escalation to full-scale war. During Kargil, Pakistani Prime Minister Nawaz Sharif explicitly cited nuclear escalation risk as the reason for withdrawal.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Stimson Center; Carnegie Endowment for International Peace; Chari et al. (2007)",
          sourceUrl: "https://carnegieendowment.org/research/2007/01/four-crises-and-a-peace-process?lang=en",
          reasoning:
            "The India-Pakistan case provides the closest thing to a natural experiment in nuclear deterrence — the same two adversaries, similar disputes, different outcomes before and after nuclearization. The evidence is strong but not conclusive: India's conventional military superiority also grew over this period, and both countries matured politically. The stability-instability paradox also applies — nuclear weapons prevented major war but may have enabled sub-conventional conflict.",
        },
        {
          id: "cuban-missile-crisis",
          title: "Cuban Missile Crisis: Nuclear Weapons Nearly Caused the Very Catastrophe They Were Supposed to Prevent (1962)",
          description:
            "The October 1962 Cuban Missile Crisis brought the world closer to nuclear war than any other event in history. Declassified records reveal that the situation was far more dangerous than policymakers realized at the time: Soviet submarine B-59 commander Valentin Savitsky ordered a nuclear torpedo launch that was vetoed only by flotilla commander Vasili Arkhipov; Soviet forces in Cuba had tactical nuclear weapons with pre-authorized use; and US reconnaissance flights that Kennedy did not authorize nearly triggered Soviet anti-aircraft fire. A 2002 Havana conference with surviving participants concluded the world avoided nuclear war largely through luck, not rational deterrence.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "National Security Archive, George Washington University; Allison & Zelikow (1999)",
          sourceUrl: "https://nsarchive.gwu.edu/briefing-book/cuba/2022-10-17/cuban-missile-crisis-60",
          reasoning:
            "Declassified primary sources from all three governments provide the highest-quality evidence. The crisis demonstrates that nuclear deterrence, rather than preventing catastrophe, nearly caused it. The revelation that survival depended on the independent judgment of a single submarine officer (Arkhipov) fatally undermines the rational deterrence model. This is the strongest piece of evidence that nuclear weapons pose existential risk rather than ensuring safety.",
        },
        {
          id: "able-archer-1983",
          title: "Able Archer 83: NATO Exercise Nearly Triggered Soviet Nuclear First Strike",
          description:
            "In November 1983, NATO conducted Able Archer 83, a routine nuclear war simulation exercise. Declassified Soviet intelligence reports reveal that the KGB and GRU interpreted the exercise as potential cover for an actual first strike, placing Soviet nuclear forces on heightened alert. Soviet leader Yuri Andropov, influenced by the KGB's Operation RYAN (which sought indicators of Western attack preparations), seriously considered a preemptive nuclear strike. Only the cautious assessment of Soviet double-agent Oleg Gordievsky, relayed to British intelligence, alerted the West to the danger. A 2015 US National Intelligence Board review concluded that 'the risk of nuclear war was greater during Able Archer than previously recognized.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "National Security Archive; CIA FOIA releases; Jones (2016), 'Able Archer 83'",
          sourceUrl: "https://nsarchive.gwu.edu/briefing-book/nuclear-vault/2018-10-24/nuclear-war-scare-1983",
          reasoning:
            "Declassified intelligence from both sides confirms the severity of the incident. Able Archer demonstrates that nuclear war can be triggered by misperception during routine activities, not just during crises. The fact that survival depended on the information from a single double-agent underscores the fragility of the deterrence system.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Feasibility of Abolition
    // =========================================================================
    {
      id: "abolition-feasibility",
      title: "Feasibility of Abolition",
      short_summary:
        "The Treaty on the Prohibition of Nuclear Weapons (2021) has 70+ state parties, but no nuclear-armed state has joined. The knowledge to build nuclear weapons cannot be abolished, creating a fundamental 'breakout' problem that makes verified complete elimination nearly impossible.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Complete nuclear abolition is a noble aspiration that is practically impossible and potentially dangerous. The knowledge to build nuclear weapons cannot be un-invented. In a world where all states disarmed, the first state to secretly rebuild even a small arsenal would gain unprecedented strategic advantage — creating powerful incentives to cheat. Verification of zero nuclear weapons is orders of magnitude harder than verifying arms reduction (the difference between counting weapons and proving a negative). Even the most intrusive verification regime could not guarantee that a state had not hidden warheads or fissile material. The nuclear-armed states — the US, Russia, China, UK, France, India, Pakistan, Israel, and North Korea — unanimously refuse to disarm, making the Treaty on the Prohibition of Nuclear Weapons a symbolic gesture by non-nuclear states that cannot compel compliance.",
      proponent_rebuttal:
        "The 'knowledge cannot be abolished' argument proves too much — it would also argue against chemical and biological weapons abolition, both of which have been largely achieved through the CWC and BWC despite the knowledge remaining available. The TPNW, which entered into force in 2021 with 70+ state parties, creates a legal norm and stigma framework comparable to how the Anti-Personnel Mine Ban Treaty (1997) reduced mine use by 80% despite major military powers never joining. Verification is challenging but not impossible: the IAEA already monitors nuclear material worldwide, and emerging technologies (satellite imagery, environmental sampling, xenon detection) could form the basis of a comprehensive verification regime. The breakout problem exists but can be managed through latent deterrence — states could maintain the infrastructure to rapidly rebuild if a violation were detected, creating deterrence without deployed weapons.",
      crux: {
        id: "breakout-verification",
        title: "The Verification and Breakout Problem",
        description:
          "The feasibility of abolition hinges on whether a verification regime can be designed that would detect clandestine nuclear weapons rebuilding with sufficient speed and confidence to allow a response before the cheating state gains decisive advantage. If verification can guarantee detection within the 'breakout timeline' (the time needed to assemble a weapon from hidden materials), abolition is feasible. If not, disarmed states would be permanently vulnerable.",
        methodology:
          "Commission an independent technical study by the IAEA, the Comprehensive Nuclear-Test-Ban Treaty Organization (CTBTO), and national laboratories (e.g., Sandia, AWE) to determine: (1) The minimum breakout timeline for reconstituting a nuclear weapon from hidden fissile material, (2) The detection probability of clandestine enrichment or reprocessing using best available technology (environmental sampling, satellite monitoring, xenon detection), (3) The verification regime cost and institutional requirements for a zero-weapons world.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-20M (Multi-institutional technical verification feasibility study)",
      },
      evidence: [
        {
          id: "tpnw-entry-force",
          title: "Treaty on the Prohibition of Nuclear Weapons Enters into Force with 70+ Parties (2021)",
          description:
            "The TPNW, adopted in 2017 and entering into force on January 22, 2021, comprehensively prohibits the development, testing, production, stockpiling, transfer, use, and threat of use of nuclear weapons. As of 2025, 70 states have ratified and 93 have signed. However, no nuclear-armed state has joined, and all NATO members (except the Netherlands, which voted against during negotiations) boycotted the negotiations. The treaty creates a legal norm but lacks enforcement mechanisms. Proponents cite the Anti-Personnel Mine Ban Treaty as a precedent where stigmatization eventually changed behavior even among non-signatory states.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "United Nations Office for Disarmament Affairs; ICAN (International Campaign to Abolish Nuclear Weapons)",
          sourceUrl: "https://treaties.unoda.org/t/tpnw",
          reasoning:
            "The treaty's existence is unambiguous fact. However, its direct impact on abolition is limited by the absence of all nuclear-armed states. The evidence is scored 'against' the meta-claim because the treaty represents a global majority arguing that nuclear weapons should be abolished, directly contesting the claim that deterrence makes the world safer. The lack of nuclear-state participation also demonstrates the practical barriers to abolition.",
        },
        {
          id: "nuclear-near-misses",
          title: "At Least 13 Documented Near-Miss Nuclear Incidents Since 1945",
          description:
            "Researchers have documented at least 13 incidents since 1945 where nuclear weapons were nearly launched due to technical malfunction, miscommunication, or miscalculation. Beyond the Cuban Missile Crisis and Able Archer, these include: the 1979 NORAD false alarm (training tape mistaken for Soviet attack), the 1980 NORAD computer chip failure (simulating 2,200 incoming missiles), the 1983 Soviet satellite false alarm (Stanislav Petrov correctly judged a satellite warning as false), and the 1995 Norwegian rocket incident (Boris Yeltsin activated the nuclear briefcase for the first time). A 2023 study in Science & Global Security estimated the cumulative probability of nuclear war from near-misses at approximately 1-2% per decade during the Cold War.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Union of Concerned Scientists; Bulletin of the Atomic Scientists; Science & Global Security",
          sourceUrl: "https://thebulletin.org/2023/01/timeline-of-close-calls/",
          reasoning:
            "Each near-miss is documented from declassified sources. The cumulative probability argument is powerful: even a small annual risk of accidental nuclear war, compounded over decades, yields a substantial total risk. This directly challenges the meta-claim that nuclear deterrence makes the world safer — if deterrence works 99% of the time but fails once, the consequence is civilization-ending.",
        },
        {
          id: "chemical-biological-precedent",
          title: "Chemical and Biological Weapons Largely Eliminated Despite Knowledge Persistence",
          description:
            "The Chemical Weapons Convention (1993) and Biological Weapons Convention (1972) have achieved near-complete elimination of two categories of weapons of mass destruction despite the knowledge to produce them remaining widely available. 193 states are party to the CWC, and 98% of declared chemical weapons stockpiles have been verifiably destroyed. Chemical weapons use has been reduced to rare violations by pariah states (Syria) and assassination operations (Russia's Novichok). The BWC, despite lacking a formal verification mechanism, has maintained a strong norm against biological weapons development. Critics note that nuclear weapons are fundamentally different — they provide a unique strategic advantage that chemical and biological weapons do not.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Organisation for the Prohibition of Chemical Weapons (OPCW); Arms Control Association",
          sourceUrl: "https://www.opcw.org/our-work/demilitarisation",
          reasoning:
            "The CWC/BWC precedent demonstrates that weapons can be abolished even when the knowledge persists. However, the analogy is imperfect: chemical and biological weapons provide limited strategic advantage compared to conventional alternatives, whereas nuclear weapons provide unique deterrent value. The directness score is lower because the strategic asymmetry between nuclear and chemical/biological weapons limits the analogy's applicability.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Humanitarian & Existential Risk
    // =========================================================================
    {
      id: "humanitarian-existential-risk",
      title: "Humanitarian & Existential Risk",
      short_summary:
        "Even a 'limited' nuclear exchange would cause catastrophic humanitarian consequences including nuclear winter and global famine, making nuclear weapons an existential risk to civilization — but deterrence advocates argue this very horror is precisely what prevents their use.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The humanitarian horror of nuclear weapons is precisely what makes them work as deterrents — and this is a feature, not a bug. Deterrence theorists from Bernard Brodie to Kenneth Waltz have argued that the uniquely catastrophic nature of nuclear weapons is the mechanism by which they prevent war. If nuclear weapons were somehow made 'humane,' they would lose their deterrent effect and wars would become more likely. The 80 years of non-use is not luck but rather the predictable outcome of rational states confronting the prospect of civilizational destruction. Reducing the horror of nuclear weapons through abolition would make major war thinkable again — and conventional great power wars killed 80+ million people in the first half of the 20th century.",
      proponent_rebuttal:
        "The humanitarian consequences of nuclear weapons use are so severe that no political objective can justify the risk. A 2022 study in Nature Food modeled the effects of a 'limited' nuclear war between India and Pakistan (100 Hiroshima-sized weapons) and found it would inject 5-47 million tonnes of soot into the stratosphere, reducing global food production by 7-50% for 5-10 years and potentially causing 2 billion deaths from famine alone — dwarfing the direct casualties. A full US-Russia exchange would end civilization. The existential risk argument is not about probability but expected value: even a 1% chance per century of an event that kills billions and potentially causes human extinction represents the largest risk humanity has ever created. No deterrence benefit can justify this expected cost when alternatives exist.",
      crux: {
        id: "nuclear-winter-lethality",
        title: "The Nuclear Winter Severity Assessment",
        description:
          "If nuclear winter models are accurate — even a limited exchange would cause global famine killing billions — then the humanitarian risk of nuclear weapons outweighs any conceivable deterrence benefit, because the weapons' existence creates a permanent nonzero probability of civilizational collapse. If nuclear winter models are significantly overstated, the humanitarian argument weakens and the deterrence calculus shifts.",
        methodology:
          "Commission independent climate modeling teams to simulate nuclear winter scenarios using state-of-the-art earth system models (CESM, GFDL, UKESM) with updated nuclear arsenal data. Model three scenarios: (1) Regional exchange (India-Pakistan, 100 weapons), (2) Limited US-Russia exchange (500 weapons), (3) Full US-Russia exchange (3,000+ weapons). Measure soot injection, temperature change, precipitation change, growing season length, and crop yield impacts. Cross-validate across at least 4 independent modeling centers.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Multi-center climate modeling study with agricultural impact assessment)",
      },
      evidence: [
        {
          id: "nuclear-winter-nature-food",
          title: "Limited Nuclear War Could Cause 2 Billion Famine Deaths from Nuclear Winter (2022)",
          description:
            "A 2022 study published in Nature Food used state-of-the-art climate and crop models to simulate the global food impact of six nuclear war scenarios. Even the smallest scenario — a regional India-Pakistan exchange of 100 Hiroshima-sized weapons — would inject enough soot into the stratosphere to reduce global caloric production by 7% in the first year, affecting 2 billion people with food insecurity. A full US-Russia exchange (4,400 weapons) would reduce global food production by 90% for 3-4 years, potentially causing the deaths of over 5 billion people from famine alone — in addition to the hundreds of millions killed directly. The study concluded that nuclear weapons pose a threat to global food security regardless of where they are detonated.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source: "Nature Food; Xia et al. (2022); Rutgers University",
          sourceUrl: "https://doi.org/10.1038/s43016-022-00573-0",
          reasoning:
            "Published in a top-tier Nature journal using validated climate and agricultural models. The finding that even a 'limited' exchange threatens billions of lives is devastating for the deterrence argument. However, nuclear winter models have been criticized for potentially overestimating soot lofting and underestimating atmospheric self-cleaning. Independent replication with updated models is essential for validation.",
        },
        {
          id: "deterrence-80-years",
          title: "80 Years of Nuclear Non-Use Represents Unprecedented Record of Deterrence Success",
          description:
            "Since the atomic bombings of Hiroshima and Nagasaki in August 1945, nuclear weapons have not been used in conflict for over 80 years. This period encompasses the entire Cold War, the dissolution of the Soviet Union, multiple regional wars, and numerous crises between nuclear-armed states. Deterrence theorists argue this 80-year record — during a period of intense geopolitical rivalry that would almost certainly have produced major war in the pre-nuclear era — constitutes strong empirical evidence that nuclear deterrence works. Kenneth Waltz's 'more may be better' thesis argues that nuclear proliferation to additional responsible states could extend this peace further.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source: "Kenneth Waltz, 'The Spread of Nuclear Weapons' (2003); International Security",
          sourceUrl: "https://doi.org/10.7551/mitpress/6677.001.0001",
          reasoning:
            "The 80-year non-use record is an undeniable historical fact. However, attributing it to deterrence rather than other factors (norms, international institutions, changing economic incentives) is an inference. The 'success' of deterrence also cannot be separated from the near-misses that nearly ended in catastrophe. A system that works until it fails catastrophically is not necessarily a successful system — it may simply be a lucky one.",
        },
        {
          id: "humanitarian-consequences-icrc",
          title: "ICRC: No Adequate Humanitarian Response Exists for Nuclear Detonation in a City",
          description:
            "The International Committee of the Red Cross — the world's foremost authority on humanitarian consequences of armed conflict — has stated unequivocally that no adequate humanitarian response exists for the detonation of a nuclear weapon in a populated area. A single modern thermonuclear warhead detonated over a major city would immediately kill 500,000 to 2 million people, overwhelm all medical infrastructure within hundreds of kilometers, create radioactive fallout affecting millions more, and render the area uninhabitable for years. The ICRC's 2011 resolution called on all states to ensure that nuclear weapons 'are never again used, regardless of the views held on their legality' and was reaffirmed in 2024.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "International Committee of the Red Cross (ICRC); 31st International Conference Resolution (2011)",
          sourceUrl: "https://www.icrc.org/en/document/nuclear-weapons",
          reasoning:
            "The ICRC is among the most respected and independent humanitarian organizations in the world. Its assessment that no humanitarian response is possible for nuclear weapon use is based on decades of expertise in conflict medicine and disaster response. This evidence is devastating for any argument that nuclear weapons can be used or retained 'responsibly' — the consequences of failure are unmanageable.",
        },
      ],
    },
  ],
  references: [
    {
      title: "The Long Peace: Elements of Stability in the Postwar International System — John Lewis Gaddis (1987)",
      url: "https://www.jstor.org/stable/2538951",
    },
    {
      title: "Treaty on the Prohibition of Nuclear Weapons — United Nations (2021)",
      url: "https://treaties.unoda.org/t/tpnw",
    },
    {
      title: "Nuclear Famine: Two Billion People at Risk — International Physicians for the Prevention of Nuclear War (2022)",
      url: "https://doi.org/10.1038/s43016-022-00573-0",
    },
    {
      title: "The Spread of Nuclear Weapons: An Enduring Debate — Kenneth Waltz & Scott Sagan (2003)",
      url: "https://doi.org/10.7551/mitpress/6677.001.0001",
    },
    {
      title: "Bulletin of the Atomic Scientists: Nuclear Close Calls Timeline",
      url: "https://thebulletin.org/2023/01/timeline-of-close-calls/",
    },
    {
      title: "ICRC Position on Nuclear Weapons",
      url: "https://www.icrc.org/en/document/nuclear-weapons",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Has nuclear deterrence prevented great power war, or is the 'Long Peace' explained by other factors?",
      content:
        "The 80-year absence of direct war between major nuclear powers is unprecedented. But the same period saw the creation of international institutions, unprecedented economic interdependence, decolonization, and the spread of democracy. Isolating the nuclear variable from these confounders is extremely difficult. Soviet archival evidence suggests nuclear risks influenced some specific decisions, but whether this generalizes to the entire period is uncertain.",
    },
    {
      id: "q2",
      title: "Is the existential risk of nuclear weapons acceptable given the deterrence benefit?",
      content:
        "Even if nuclear deterrence has prevented major war, at least 13 documented near-misses have brought humanity to the brink of nuclear catastrophe. The expected value calculation depends on the probability of deterrence failure per decade — if it is even 1%, the compounding risk over centuries makes eventual nuclear use a near-certainty. Is trading a lower annual probability of conventional war for a permanent nonzero probability of civilizational extinction a rational trade?",
    },
    {
      id: "q3",
      title: "Can nuclear weapons be verifiably abolished, or does the knowledge problem make abolition impossible?",
      content:
        "The knowledge to build nuclear weapons cannot be eliminated. In a disarmed world, any state that secretly rebuilt a small arsenal would gain enormous strategic advantage, creating powerful incentives to cheat. Can verification technology (satellite monitoring, environmental sampling, on-site inspection) close this gap sufficiently to make a zero-weapons world stable? The CWC and BWC provide partial precedents, but the strategic uniqueness of nuclear weapons limits the analogy.",
    },
  ],
};
