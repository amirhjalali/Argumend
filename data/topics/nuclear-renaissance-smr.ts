import type { Topic } from "@/lib/schemas/topic";

export const nuclearRenaissanceSmrData = {
  id: "nuclear-renaissance-smr",
  title: "Can Small Modular Reactors Save Nuclear Energy?",
  meta_claim:
    "Small modular reactors represent a viable path to carbon-free baseload power that can be deployed at meaningful scale within the next decade — a proposition advocates treat as imminent and skeptics regard as perennially deferred.",
  status: "contested" as const,
  category: "technology" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1591803897498-ef4a8db8e73a?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "IAEA Advances in Small Modular Reactor Technology (2023)",
      url: "https://www.iaea.org/topics/small-modular-reactors",
    },
    {
      title: "NuScale UAMPS Project Cancellation Analysis — Reuters",
      url: "https://www.reuters.com/business/energy/nuscale-power-terminate-utah-small-nuclear-reactor-project-2023-11-08/",
    },
    {
      title: "US DOE: Benefits of Small Modular Reactors",
      url: "https://www.energy.gov/ne/benefits-small-modular-reactors-smrs",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can SMRs achieve economies of mass production?",
      content:
        "Traditional nuclear plants are bespoke megaprojects. SMR advocates claim factory fabrication will drive costs down through standardization and learning curves. Is there evidence this manufacturing model can work for nuclear reactors?",
      imageUrl:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=60",
      references: [
        {
          title: "MIT Future of Nuclear Energy in a Carbon-Constrained World",
          url: "https://energy.mit.edu/research/future-nuclear-energy-carbon-constrained-world/",
        },
      ],
    },
    {
      id: "q2",
      title: "Do SMRs solve the nuclear waste problem?",
      content:
        "Some SMR designs claim to use spent fuel or produce less waste. How do waste profiles of leading SMR designs compare to conventional reactors, and does this meaningfully change the waste storage calculus?",
      imageUrl:
        "https://images.unsplash.com/photo-1591803897498-ef4a8db8e73a?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "q3",
      title: "Are SMRs a distraction from faster renewable deployment?",
      content:
        "Critics argue that every dollar invested in SMRs delays proven renewable+storage solutions. Is the opportunity cost of pursuing SMRs justified given the urgency of decarbonization?",
      imageUrl:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    {
      id: "smr-economics",
      title: "Economics of SMRs",
      short_summary:
        "Whether SMRs can compete on cost with renewables plus storage remains unproven, and NuScale's project cancellation raised serious doubts.",
      image_url:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "SMRs sacrifice the economies of scale that make large reactors viable. NuScale's UAMPS project — the most advanced US SMR effort — was cancelled in 2023 after estimated costs ballooned from $5.3 billion to $9.3 billion, pushing the per-MWh price above competing renewables+storage. Factory fabrication savings remain theoretical; no SMR has been mass-produced. Meanwhile, solar+battery costs continue to plummet along well-established learning curves. SMRs may be permanently uncompetitive.",
      proponent_rebuttal:
        "NuScale's UAMPS cancellation reflected first-of-a-kind costs and one utility consortium's risk tolerance under inflationary 2022-23 conditions, not necessarily an inherent economic flaw in the SMR concept. China's HTR-PM reaching commercial operation shows small-reactor construction is at least technically feasible. The factory-fabrication thesis genuinely hasn't been tested at scale, so comparing a first-of-a-kind unit's cost to mature, mass-produced renewable supply chains stacks the deck. SMRs also deliver firm, dispatchable power that sidesteps integration costs intermittent renewables impose at high penetration — storage, transmission upgrades, and generation overbuild. When those system-level costs are counted, SMRs could be competitive in specific niches, especially industrial process heat and remote or grid-constrained sites where renewables plus storage struggle. The honest caveat: this is a projection. Until a fleet of units posts real LCOE figures, the cost case rests on learning-curve assumptions that the cancellation shows can break down.",
      crux: {
        id: "smr-lcoe-comparison",
        title: "The Levelized Cost Comparison",
        description:
          "Compare the actual achieved LCOE of deployed SMR units against renewables+storage providing equivalent firm power.",
        methodology:
          "Track all-in costs (construction, fuel, O&M, decommissioning, waste) for the first 5 commercially operating SMR plants. Compare to firm renewable power costs (solar/wind + 4-hour and long-duration storage) serving equivalent load profiles in the same regions.",
        equation:
          "LCOE_{SMR} = \\frac{\\sum_{t=1}^{T} \\frac{I_t + M_t + F_t + D_t}{(1+r)^t}}{\\sum_{t=1}^{T} \\frac{E_t}{(1+r)^t}}",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10M (requires operational SMR cost data over 5+ year period)",
      },
      evidence: [
        {
          id: "nuscale-cancellation",
          title: "NuScale UAMPS Project Cancelled After Cost Overruns",
          description:
            "The most advanced US SMR project (the Carbon Free Power Project) was terminated on November 8, 2023, by mutual agreement of NuScale and UAMPS after the target power price rose to $89/MWh (from $58/MWh in 2021) and the total estimated cost rose ~75% from $5.3 billion to $9.3 billion, leaving the project short of subscriptions.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 10,
          },
          source:
            "NuScale Power / UAMPS joint press release (SEC Form 8-K, Nov 2023); IEEFA cost analysis",
          sourceUrl:
            "https://www.sec.gov/Archives/edgar/data/0001822966/000182296623000256/uampsnuscalejointpressre.htm",
          reasoning:
            "Real-world cost data from the furthest-along Western SMR project, confirmed by SEC filing; directly demonstrates economic challenge. Independence slightly reduced because the headline figures originate from the project parties themselves, though corroborated by independent analysts (IEEFA).",
        },
        {
          id: "china-htr-pm-operational",
          title: "China's HTR-PM Achieved Commercial Operation",
          description:
            "China's HTR-PM high-temperature gas-cooled pebble-bed plant at Shidao Bay (twin 100 MWt reactors driving one 210 MWe turbine) entered commercial operation on December 6, 2023, described by China's National Energy Administration as the world's first commercial Generation IV reactor.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "World Nuclear News; NucNet (citing China's National Energy Administration)",
          sourceUrl:
            "https://www.world-nuclear-news.org/Articles/Chinese-HTR-PM-Demo-begins-commercial-operation",
          reasoning:
            "Demonstrates technical feasibility but cost data is opaque; the 'first Gen IV' claim is China's own characterization and the state-funded demonstration project may not reflect true market economics.",
        },
        {
          id: "solar-storage-learning-curve",
          title: "Solar and Battery Costs Have Fallen Dramatically",
          description:
            "Lazard's unsubsidized utility-scale solar LCOE fell roughly 90% over 2009-2020 (from ~$359 to ~$37/MWh midpoint), and lithium-ion battery pack costs have fallen by well over 90% since the early 1990s. Cost declines have slowed since 2021 amid inflation and supply-chain pressures, but solar and wind remain the lowest-LCOE new-build sources in Lazard's analysis.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Lazard Levelized Cost of Energy+ analysis",
          sourceUrl:
            "https://www.lazard.com/research-insights/levelized-cost-of-energyplus/",
          reasoning:
            "Established cost trajectory makes the competitive bar a moving target; SMRs must beat future, not current, renewable costs. Note that recent (post-2021) renewable cost declines have flattened, so the '10-15% annually' framing was overstated and has been corrected; directness lowered because LCOE comparisons rarely include the firming/storage needed to match SMR dispatchability.",
        },
        {
          id: "factory-fabrication-potential",
          title: "Vendors Claim Factory Fabrication Will Cut Costs",
          description:
            "SMR vendors argue that moving most assembly into factory conditions reduces cost and schedule risk; Rolls-Royce SMR, for example, claims roughly 90% of manufacturing and assembly is done in-factory. Specific cost-reduction percentages remain unvalidated vendor projections — no SMR factory has yet operated at scale to confirm them.",
          side: "for" as const,
          weight: {
            sourceReliability: 3,
            independence: 2,
            replicability: 3,
            directness: 4,
          },
          source: "Rolls-Royce SMR (vendor marketing material)",
          sourceUrl: "https://www.rolls-royce-smr.com/our-approach",
          reasoning:
            "Promotional projections from a vendor with a direct financial interest; the prior '30-50%' figure could not be tied to a verifiable independent source and was removed. No SMR factory has operated at scale to validate the claim, so independence and reliability are scored very low.",
        },
      ],
    },
    {
      id: "smr-safety-acceptance",
      title: "Safety and Public Acceptance",
      short_summary:
        "SMR designs incorporate passive safety features that may reduce accident risk, but overcoming decades of nuclear stigma remains a major barrier.",
      image_url:
        "https://images.unsplash.com/photo-1591803897498-ef4a8db8e73a?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The nuclear industry has repeatedly promised 'inherently safe' designs, yet Fukushima involved reactors once considered state-of-the-art. SMRs introduce new risks: more reactor sites mean more potential targets, more spent fuel transport, and distributed waste storage challenges. Public opposition remains deeply entrenched — post-Fukushima, Germany shut down its entire fleet. No amount of passive safety engineering can overcome democratic rejection. Additionally, smaller reactors may require less emergency planning zones, but that means communities are being told to accept reactors closer to population centers.",
      proponent_rebuttal:
        "Modern SMR designs differ meaningfully from legacy reactors. Passive cooling systems use gravity and natural convection — they are engineered to shut down and cool safely without operator action or external power, directly targeting the station-blackout failure mode that drove the Fukushima meltdowns. Some designs operate at lower pressures, reducing the risk of pressure-driven containment breach. The NRC's certification of NuScale's design — the first SMR to clear that bar — capped a years-long technical review by an independent regulator. Polling shows US public support for nuclear has climbed to a decade high (55% in Gallup's 2023 survey, up from 44% in 2016), driven partly by climate urgency. And an SMR's smaller core means a smaller radioactive source term, which physically caps the worst-case consequences of any single unit. The honest caveat: these are design and licensing arguments, not yet validated by a fleet operating long enough to have a track record.",
      crux: {
        id: "passive-safety-validation",
        title: "The Passive Safety Demonstration",
        description:
          "Demonstrate that SMR passive safety systems prevent core damage under all credible accident scenarios without operator intervention.",
        methodology:
          "Conduct full-scale loss-of-coolant and station-blackout tests on operating SMR prototypes. Monitor core temperatures, containment integrity, and fission product release over 72+ hours with zero operator action or external power. Compare results to probabilistic risk assessments.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200M (full-scale prototype testing with instrumentation)",
      },
      evidence: [
        {
          id: "nuscale-design-certification",
          title: "NuScale Received First-Ever US SMR Design Certification",
          description:
            "On January 19, 2023, the NRC published a rule certifying NuScale's 50 MWe Power Module design (effective February 21, 2023) — the first SMR design and only the seventh reactor design ever certified in the US — after a multi-year review of its passive safety systems. (A separate, uprated 77 MWe Standard Design Approval application was submitted later in 2023.)",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "US Nuclear Regulatory Commission / Federal Register design certification rule",
          sourceUrl:
            "https://www.federalregister.gov/documents/2023/01/19/2023-00729/nuscale-small-modular-reactor-design-certification",
          reasoning:
            "Independent regulatory body validated the design through a rigorous rulemaking. Corrected the instrument: the January 2023 action was a Design Certification of the 50 MWe module, not a Standard Design Approval (which was a distinct, later application for the uprated 77 MWe design).",
        },
        {
          id: "public-support-rising",
          title: "Public Support for Nuclear at Record Highs",
          description:
            "Gallup's March 2023 poll found 55% of Americans favor nuclear energy — the highest in a decade and up from 44% in 2016 (it was roughly tied near 49% around 2019-2020). Climate concerns are shifting attitudes.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source: "Gallup (March 2023 Environment poll)",
          sourceUrl:
            "https://news.gallup.com/poll/474650/americans-support-nuclear-energy-highest-decade.aspx",
          reasoning:
            "Independent national pollster. Corrected the baseline: the 44% figure is from 2016, not 2020 (support was near 49% around 2020). Support for nuclear in general may not translate to support for a reactor in one's own community (NIMBY effect).",
        },
        {
          id: "proliferation-distributed-risk",
          title: "More Reactor Sites Increase Distributed Security Risk",
          description:
            "The Union of Concerned Scientists (Edwin Lyman) argues that many SMR designs do not clearly improve on large reactors for safety, security, or proliferation, and that deploying many smaller reactors across more sites multiplies the locations requiring security, spent-fuel management, and emergency planning.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Union of Concerned Scientists — 'Nuclear Power Reactors: Is Smaller Better?' (Edwin Lyman)",
          sourceUrl: "https://www.ucs.org/resources/nuclear-power-reactors-smaller-better",
          reasoning:
            "Sourced to a specific UCS analysis by a named nuclear-safety expert, but UCS is an advocacy organization with a critical stance on nuclear, so independence is moderate. SMR proponents argue smaller sites carry proportionally smaller source terms and risk.",
        },
        {
          id: "fukushima-legacy-distrust",
          title: "Fukushima Legacy Continues to Shape Public Opposition",
          description:
            "Germany accelerated its nuclear phase-out after Fukushima and shut its last three reactors on April 15, 2023. (Italy had already banned domestic nuclear power by referendum, reaffirmed in 2011, and Belgium has repeatedly delayed rather than completed its phase-out.) Local opposition and political reversals have continued to shape nuclear policy across Europe.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 5,
          },
          source:
            "German Federal Office for the Safety of Nuclear Waste Management (BASE); contemporaneous reporting",
          sourceUrl:
            "https://www.base.bund.de/en/nuclear-safety/nuclear-phase-out/nuclear-phase-out_content.html",
          reasoning:
            "Germany's post-Fukushima phase-out is well documented. Corrected an overstatement: Italy's nuclear ban predates Fukushima (referendum-based) and Belgium has repeatedly postponed rather than completed its phase-out, so the original 'moved to phase out entirely' framing was inaccurate. Applies to nuclear generally — SMR-specific opposition data is limited, hence lower directness.",
        },
      ],
    },
    {
      id: "smr-deployment-timeline",
      title: "Deployment Timeline Reality",
      short_summary:
        "Nuclear projects have a long history of delays and cost overruns, and SMR deployment timelines face regulatory, supply chain, and workforce hurdles.",
      image_url:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The nuclear industry has a decades-long track record of overpromising and underdelivering on timelines. Vogtle Units 3 and 4 came online roughly seven years late and at about $35 billion — more than double the original ~$14 billion estimate — and bankrupted their lead contractor along the way. Hinkley Point C in the UK is years behind schedule and well over budget. SMR vendors have repeatedly floated late-2020s commercial dates, yet no Western SMR has broken ground on a commercial plant. NRC licensing still takes years, dedicated SMR fuel supply chains (notably HALEU) are immature, and the nuclear construction workforce has atrophied since the last build-out. On this record, claims of deployment at scale 'within this decade' read as aspirational, not credible.",
      proponent_rebuttal:
        "Vogtle and Hinkley Point C are large, bespoke gigawatt-scale projects — exactly the construction model SMRs are meant to disrupt. The thesis is that shifting work from chaotic on-site construction into controlled factory production cuts the schedule risk that plagues large nuclear builds. Regulators are adapting: the NRC certified NuScale's design, and Canada, the UK, and South Korea are running parallel SMR review processes. The US ADVANCE Act, signed in July 2024, directs the NRC to streamline reviews and cut advanced-reactor fees. Russia's floating Akademik Lomonosov and China's HTR-PM show that non-traditional reactor deployment is achievable outside the standard gigawatt model. Advocates increasingly concede the 2030s — not the 2020s — as the realistic commercial window for Western SMRs, which still leaves room to contribute to mid-century decarbonization. The honest caveat: factory-driven schedule gains remain unproven for nuclear, and a slipping target date is itself the skeptics' core prediction.",
      crux: {
        id: "first-commercial-smr-date",
        title: "The First Western Commercial SMR Milestone",
        description:
          "Track whether the first Western commercial SMR achieves grid connection by its publicly committed date.",
        methodology:
          "Monitor all announced Western SMR projects (NuScale, Rolls-Royce, X-energy, GE-Hitachi BWRX-300, TerraPower Natrium) against their stated timelines. Record construction start, fuel load, criticality, and grid connection dates. Compare to original schedule commitments.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$0 (public record tracking of announced project milestones)",
      },
      evidence: [
        {
          id: "vogtle-delays-precedent",
          title:
            "Vogtle 3 & 4: Years Late and Roughly Double the Original Estimate",
          description:
            "The only new US reactors in a generation, Vogtle Units 3 and 4, came online in July 2023 and April 2024 — about seven years late against an original ~2016/2017 schedule. Originally estimated near $14 billion, total project cost reached roughly $35 billion (including ~$3.7 billion Westinghouse paid to exit), and lead contractor Westinghouse went bankrupt in 2017.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source:
            "US EIA 'Today in Energy'; Georgia Public Broadcasting; contemporaneous filings",
          sourceUrl: "https://www.eia.gov/todayinenergy/detail.php?id=61963",
          reasoning:
            "Directly relevant precedent for US nuclear construction. Corrected the headline: the project ran ~7 years late (not 14 years of construction) and roughly doubled from ~$14B to ~$35B; the original '14 years / $21B over budget' framing conflated metrics. Large bespoke gigawatt projects differ structurally from SMRs.",
        },
        {
          id: "russia-floating-smr",
          title: "Russia's Akademik Lomonosov Operating Since 2020",
          description:
            "The world's only operating floating nuclear power plant, using two KLT-40S reactors (about 35 MWe each), connected to the grid at Pevek in December 2019 and was fully commissioned (declared in commercial operation) in May 2020.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 4,
            directness: 6,
          },
          source: "World Nuclear Association — Nuclear Power in Russia / SMR profile",
          sourceUrl:
            "https://www.world-nuclear.org/information-library/country-profiles/countries-o-s/russia-nuclear-power",
          reasoning:
            "Demonstrates SMR-scale deployment is achievable, but Russia's state nuclear program operates under very different regulatory and economic conditions, and reporting depends heavily on Rosatom; independence kept low.",
        },
        {
          id: "nrc-workforce-bottleneck",
          title: "NRC Licensing Bottleneck and Workforce Shortage",
          description:
            "Reviewing many simultaneous advanced-reactor applications strains NRC staff capacity, and analysts warn of a looming nuclear-workforce gap — DOE estimates roughly 375,000 additional workers would be needed to add 200 GW of nuclear by 2050, with about 40% of the current workforce eligible to retire within a decade. New reactor licensing has historically taken multiple years even under streamlined processes.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "Federation of American Scientists analysis of NRC hiring; DOE workforce estimates",
          sourceUrl: "https://fas.org/publication/new-nuclear-energy-hiring-nrc/",
          reasoning:
            "Institutional capacity constraints are documented and bear on deployment timelines. Replaced the unverifiable 'workforce shrank 30% since 2012' figure with sourced DOE workforce projections; the precise prior number could not be confirmed, so the specific claim was removed and weights lowered.",
        },
        {
          id: "advance-act-acceleration",
          title: "US ADVANCE Act Streamlines Nuclear Licensing",
          description:
            "The ADVANCE Act, signed into law on July 9, 2024 (88-2 Senate, 393-13 House), directs the NRC to reduce licensing fees for advanced-reactor applicants, modernize and accelerate its review processes, and develop streamlined siting (including at retired coal sites). The NRC's FY2025 fee rule cut the advanced-reactor hourly rate by more than 50%.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "US NRC — About the ADVANCE Act",
          sourceUrl: "https://www.nrc.gov/about-nrc/governing-laws/advance-act/about-advance-act",
          reasoning:
            "Legislative action directly addresses regulatory timeline concerns and is now being implemented (FY2025 fee cut), though its ultimate effect on deployment timelines remains to be seen.",
        },
      ],
    },
  ],
};
