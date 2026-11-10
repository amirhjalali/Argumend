export const nuclearRenaissanceSmrData = {
  id: "nuclear-renaissance-smr",
  title: "Can Small Modular Reactors Save Nuclear Energy?",
  question:
    "Will small modular reactors be cheap and fast enough to matter by the mid-2030s?",
  meta_claim:
    "Small modular reactors will be built cheaply and quickly enough to supply a meaningful share of clean, round-the-clock power by the mid-2030s.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: Ontario's first BWRX-300 at Darlington is under
  // construction (basemat placed 22 April 2026, operating licence applied
  // for in March 2026, grid target end of 2030); the NRC issued TVA a
  // construction permit for a BWRX-300 at Clinch River in late September
  // 2026 and TerraPower one for Natrium at Kemmerer in March 2026; NuScale
  // holds two NRC approvals but no firm order, three years after its Idaho
  // project was cancelled.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In late September 2026 the US Nuclear Regulatory Commission gave the Tennessee Valley Authority a permit to build a 300-megawatt GE-Hitachi BWRX-300 at Clinch River. The same design is already rising at Ontario's Darlington site, budgeted at C$7.7 billion for the first unit and shared works. Three years earlier, NuScale's flagship Idaho project was cancelled when its estimated cost rose from $5.3 billion to $9.3 billion. No small modular reactor yet supplies a Western grid. The fight is over whether the ones now being built arrive on time and cheap enough to matter.",
    confidence: 88,
    source:
      "World Nuclear News, 'First construction permit issued for BWRX-300 SMR in US' (30 September 2026); World Nuclear News on the Darlington budget (23 May 2025); NuScale/UAMPS joint press release on the cancellation (SEC Form 8-K, November 2023)",
    sourceUrl:
      "https://world-nuclear-news.org/articles/first-construction-permit-issued-for-bwrx300-smr-in-us",
  },
  simple_case: [
    "The answer decides what utilities in Ontario, Tennessee and Wyoming get for the billions their customers will pay back, and whether grids hungry for round-the-clock clean power, for factories and data centres, can count on small reactors in the 2030s or should build something else.",
    "The two sides split over whether later units cost less than the first and end up below wind, solar and storage; whether passive cooling holds in every accident without an operator; and whether Darlington and the US projects behind it connect on schedule.",
  ],
  aliases: [
    "Can small modular reactors deliver clean power at scale within a decade?",
    "Are SMRs always ten years away?",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1591803897498-ef4a8db8e73a?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Canada's first SMR project: How is CAD20.9 billion cost calculated? — World Nuclear News (23 May 2025)",
      url: "https://wnn.world-nuclear.org/articles/what-is-the-budget-for-canadas-first-smr-project",
    },
    {
      title: "North American construction is back, smaller and faster, at OPG's Darlington — Nuclear News (5 June 2026)",
      url: "https://ans.org/news/2026-06-05/article-8047/north-american-construction-is-back-smaller-and-faster-at-opgs-darlington/",
    },
    {
      title: "First construction permit issued for BWRX-300 SMR in US — World Nuclear News (30 September 2026)",
      url: "https://world-nuclear-news.org/articles/first-construction-permit-issued-for-bwrx300-smr-in-us",
    },
    {
      title: "NRC issues construction permit for first Natrium plant — World Nuclear News (March 2026)",
      url: "https://world-nuclear-news.org/articles/nrc-issues-construction-permit-for-first-natrium-plant",
    },
    {
      title: "NuScale US460 Standard Design Approval — US Nuclear Regulatory Commission",
      url: "https://www.nrc.gov/reactors/new-reactors/smr/licensing-activities/current-licensing-reviews/nuscale-us460.html",
    },
    {
      title: "NuScale Power Reports Second Quarter 2026 Results (5 August 2026)",
      url: "https://www.nuscalepower.com/press-releases/2026/nuscale-power-reports-second-quarter-2026-results",
    },
    {
      title: "Criticality for fourth US microreactor meets 4 July deadline — World Nuclear News (7 July 2026)",
      url: "https://world-nuclear-news.org/articles/criticality-for-fourth-us-microreactor-meets-deadline",
    },
    {
      title: "IAEA: Small Modular Reactors",
      url: "https://www.iaea.org/topics/small-modular-reactors",
    },
    {
      title: "NuScale UAMPS Project Cancellation — Reuters (8 November 2023)",
      url: "https://www.reuters.com/business/energy/nuscale-power-terminate-utah-small-nuclear-reactor-project-2023-11-08/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can SMRs achieve economies of mass production?",
      content:
        "Big reactors are one-off megaprojects. Small-reactor builders say making the same design over and over, mostly in factories, will push costs down each time. Ontario Power Generation budgets C$6.1 billion for its first BWRX-300 and about C$4.1 billion for the fourth. Will real costs follow that curve?",
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
        "Critics argue that every dollar spent on small reactors delays wind, solar and batteries that can be built now. Supporters answer that grids still need firm power when the wind drops, and that the first units are being built this decade. Is the bet on SMRs worth what it costs in time and money?",
      imageUrl:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=60",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Cost — the learning-curve bet
    // =========================================================================
    {
      id: "smr-economics",
      title: "Cost: Can Factory-Built Reactors Get Cheap?",
      short_summary:
        "NuScale's first US plant died on cost in 2023. Ontario's Darlington project is the first Western small-reactor plant with a construction budget: C$6.1 billion for the first 300 MW unit, falling to about C$4.1 billion by the fourth. Whether real costs follow that curve, and end below wind, solar and storage, is the economic question.",
      image_url:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Small reactors give up the economies of scale that big ones were built for, and the numbers so far show it. NuScale's Carbon Free Power Project in Idaho was cancelled in November 2023 after its estimated cost rose from $5.3 billion to $9.3 billion and its target power price from $58 to $89 per MWh. Darlington's first unit is budgeted at C$6.1 billion for 300 MW, plus C$1.6 billion of shared works: well over C$20,000 per kilowatt before a single overrun. OPG itself expects power at about 14.9 cents per kWh. Meanwhile Lazard's 2026 analysis still finds renewables 'the most cost-competitive form of new-build generation on an unsubsidized basis.' Every falling-cost figure for small reactors is a budget, not a bill.",
      proponent_rebuttal:
        "First-of-a-kind costs are always the worst, and the case is about the units that follow. OPG's own budget has each Darlington unit cheaper than the last, with the fourth about a third below the first, and the C$20.9 billion envelope includes contingency, interest and escalation. NuScale's project failed on subscriptions from one utility consortium in the inflation of 2022-23, not on a built plant. China's HTR-PM has run commercially since December 2023. And a reactor delivers power at night and in still weather, so the fair comparison is with wind and solar plus the storage, transmission and backup they need at high shares, which the headline renewable cost figures leave out.",
      crux: {
        id: "smr-lcoe-comparison",
        title: "The Unit-by-Unit Cost Test",
        question:
          "Will later small reactors, like Darlington's units 2 to 4, cost less than the first and beat firmed wind and solar?",
        description:
          "Compare the actual achieved cost of the first series of small reactors of one design, unit by unit, against renewables plus storage providing equivalent firm power on the same grid.",
        methodology:
          "Track all-in costs (construction, fuel, operations, decommissioning, waste) for the first four units of one design, starting with Darlington. Check whether each unit costs less than the one before. Compare the resulting price per MWh with wind and solar plus 4-hour and long-duration storage serving the same round-the-clock load in the same region.",
        equation:
          "LCOE_{SMR} = \\frac{\\sum_{t=1}^{T} \\frac{I_t + M_t + F_t + D_t}{(1+r)^t}}{\\sum_{t=1}^{T} \\frac{E_t}{(1+r)^t}}",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "OPG's audited outturn costs for Darlington units 1 to 4 against its C$6.1 billion and C$4.1 billion budgets, and the price per MWh they deliver, set against wind, solar and storage firmed to round-the-clock supply on Ontario's grid.",
        },
        cost_to_verify:
          "$0 (public utility filings, once units 1 to 4 are built in the 2030s)",
        falsification: {
          supporter_flip:
            "If Darlington's units came in over budget and the fourth cost no less than the first, the learning curve the whole small-reactor case rests on would be missing, and NuScale's blowout would look like the rule rather than a first-unit accident.",
          skeptic_flip:
            "If Darlington's four units came in near budget with each cheaper than the last, and their power beat wind and solar firmed to round-the-clock supply in Ontario, the charge that small reactors are uneconomic by design would lose its footing.",
          common_ground:
            "Both sides agree NuScale's Idaho project was cancelled on cost in 2023, that Darlington's falling unit costs are budgets rather than bills, and that no small-reactor design has yet been built in series anywhere in the West.",
          live_disagreement:
            "Whether building the same small reactor four or more times drives its cost below firmed renewables, or whether the first-unit costs are the real price of the class.",
        },
      },
      evidence: [
        {
          id: "opg-darlington-budget",
          title: "OPG Budgets Darlington's Fourth BWRX-300 About a Third Below the First (May 2025)",
          description:
            "Ontario approved a C$20.9 billion budget for four 300 MW BWRX-300 reactors at Darlington in May 2025. The first unit is budgeted at C$6.1 billion plus C$1.6 billion for systems shared by all four; the fourth at about C$4.1 billion, roughly 33% cheaper than the first. OPG calls the first-unit figure a 'release-quality estimate' that 'includes everything needed to build the new nuclear plant', including contingency, interest and escalation, and projects power at about 14.9 cents per kWh, which it says is comparable with renewable alternatives (World Nuclear News, 23 May 2025).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 8,
          },
          source:
            "World Nuclear News, 'Canada's first SMR project: How is CAD20.9 billion cost calculated?' (23 May 2025)",
          sourceUrl:
            "https://wnn.world-nuclear.org/articles/what-is-the-budget-for-canadas-first-smr-project",
          reasoning:
            "The first committed construction budget for a Western small-reactor fleet, and it builds the learning curve in: each unit cheaper than the last. It shows what the owner expects, not what will happen; the falling figures are the project's own estimates, so independence is moderate, and the cost per kilowatt of the first unit (over C$20,000) is the number skeptics point to from the same page.",
        },
        {
          id: "nuscale-cancellation",
          title: "NuScale UAMPS Project Cancelled After Cost Rose From $5.3B to $9.3B (November 2023)",
          description:
            "The most advanced US small-reactor project, the Carbon Free Power Project in Idaho, was terminated on 8 November 2023 by mutual agreement of NuScale and the Utah Associated Municipal Power Systems after the target power price rose to $89/MWh (from $58/MWh in 2021) and the total estimated cost rose about 75%, from $5.3 billion to $9.3 billion, leaving the project short of subscriptions. No unit had been built.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 10,
          },
          source:
            "NuScale Power / UAMPS joint press release (SEC Form 8-K, November 2023); IEEFA cost analysis",
          sourceUrl:
            "https://www.sec.gov/Archives/edgar/data/0001822966/000182296623000256/uampsnuscalejointpressre.htm",
          reasoning:
            "Real cost data from what was then the furthest-along Western small-reactor project, confirmed in an SEC filing. It shows the first-of-a-kind cost risk directly. It does not show what a series of identical units would cost, which is the proponents' claim; no series has been built.",
        },
        {
          id: "china-htr-pm-operational",
          title: "China's HTR-PM Entered Commercial Operation (December 2023)",
          description:
            "China's HTR-PM high-temperature gas-cooled pebble-bed plant at Shidao Bay (twin 100 MWt reactors driving one 210 MWe turbine) entered commercial operation on 6 December 2023, described by China's National Energy Administration as the world's first commercial Generation IV reactor.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source: "World Nuclear News; NucNet (citing China's National Energy Administration)",
          sourceUrl:
            "https://www.world-nuclear-news.org/Articles/Chinese-HTR-PM-Demo-begins-commercial-operation",
          reasoning:
            "Shows a small reactor can be built and run commercially. Its costs are not published, and a state-funded demonstration in China says little about what a Western utility would pay, so directness on the cost question is limited.",
        },
        {
          id: "solar-storage-learning-curve",
          title: "Lazard 2026: Renewables Remain the Cheapest New-Build Power, Unsubsidized",
          description:
            "Lazard's 2026 Levelized Cost of Energy+ report states that 'renewables remain the most cost-competitive form of new-build generation on an unsubsidized basis.' Lazard's earlier editions showed unsubsidized utility-scale solar falling roughly 90% over 2009-2020, from about $359 to $37 per MWh at the midpoint, though declines slowed after 2021 with inflation and supply-chain pressure.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "Lazard, Levelized Cost of Energy+ (2026 edition, and earlier editions for the 2009-2020 trend)",
          sourceUrl:
            "https://www.lazard.com/research-insights/levelized-cost-of-energyplus/",
          reasoning:
            "Sets the bar a small reactor has to clear, and the bar keeps moving. Directness is moderate because standard cost-per-MWh comparisons do not include the storage and backup that wind and solar need to match a reactor's round-the-clock output, which is the proponents' central objection.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 2: Safety and acceptance
    // =========================================================================
    {
      id: "smr-safety-acceptance",
      title: "Safety: Does Passive Cooling Remove the Old Accident Risks?",
      short_summary:
        "Small-reactor designs use gravity and natural circulation to cool the core without pumps, power or operators, aimed at the blackout that melted Fukushima's cores. The NRC has approved two NuScale designs on paper; no Western small reactor has yet run long enough to test the claim, and public consent is a separate hurdle.",
      image_url:
        "https://images.unsplash.com/photo-1591803897498-ef4a8db8e73a?auto=format&fit=crop&w=800&q=60",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The nuclear industry has promised 'inherently safe' designs before, and Fukushima's reactors were once considered state of the art. Small reactors bring their own risks: many more sites to guard, more spent fuel to move, and smaller emergency planning zones that put reactors closer to towns. The Union of Concerned Scientists' Edwin Lyman argues many designs do not clearly improve on large reactors for safety, security or proliferation. A design certified on paper is not a plant with decades of operating experience. And public consent can end a program regardless of engineering: Germany shut down its remaining reactors in 2023.",
      proponent_rebuttal:
        "Passive cooling uses gravity and natural convection to shut down and cool the core without operator action or outside power, which targets the station-blackout failure that drove the Fukushima meltdowns. A smaller core holds less radioactive material, which caps the worst case of any one unit. The NRC certified NuScale's 50 MWe module in 2023, the first small-reactor design to clear that bar, and approved its uprated 77 MWe module in May 2025, two months ahead of schedule. US support for nuclear power reached a decade high of 55% in Gallup's 2023 poll. These are design and licensing arguments; the first plants will supply the operating record.",
      crux: {
        id: "passive-safety-validation",
        title: "The Passive Safety Demonstration",
        question:
          "Do small reactors' passive safety systems keep the core cool with no operator and no outside power?",
        description:
          "Demonstrate that SMR passive safety systems prevent core damage under all credible accident scenarios without operator intervention.",
        methodology:
          "Conduct full-scale loss-of-coolant and station-blackout tests on operating SMR prototypes. Monitor core temperatures, containment integrity, and fission product release over 72+ hours with zero operator action or external power. Compare results to probabilistic risk assessments.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Full-scale integrated tests and regulator review of passive cooling under station blackout and loss-of-coolant scenarios, like the NRC's certification review of NuScale's design, followed by operating experience from the first plants.",
        },
        cost_to_verify:
          "$200M (full-scale prototype testing with instrumentation)",
        falsification: {
          supporter_flip:
            "If full-scale tests showed SMR passive-safety systems failing to prevent core damage without operator action under credible accident scenarios, so that the 'walk-away safe' claim did not hold up, a central selling point over older reactors would fall.",
          skeptic_flip:
            "If full-scale tests and the first years of operation showed passive cooling removing the operator-error and power-loss failures behind older accidents, as the designs claim on paper, the safety case would look like engineering rather than marketing.",
          common_ground:
            "Both sides agree passive-safety designs are intended to prevent the loss-of-coolant and station-blackout failures that drove past accidents, and that this hasn't yet been validated by full-scale testing of operating SMRs.",
          live_disagreement:
            "Whether SMR passive safety actually prevents core damage with zero operator action across all credible scenarios, which only full-scale loss-of-coolant and blackout tests on real prototypes can demonstrate.",
        },
      },
      evidence: [
        {
          id: "nuscale-design-certification",
          title: "NRC Certified NuScale's Small Reactor in 2023 and Approved Its 77 MWe Version in May 2025",
          description:
            "On 19 January 2023 the NRC published a rule certifying NuScale's 50 MWe Power Module design (effective 21 February 2023), the first small-reactor design and only the seventh reactor design ever certified in the US, after a multi-year review of its passive safety systems. In May 2025 the NRC issued a Standard Design Approval for the uprated US460 design, six 77 MWe modules totalling 462 MWe, 'two months ahead of schedule.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "US Nuclear Regulatory Commission / Federal Register design certification rule (January 2023); NRC NuScale US460 review page (Standard Design Approval, May 2025)",
          sourceUrl:
            "https://www.federalregister.gov/documents/2023/01/19/2023-00729/nuscale-small-modular-reactor-design-certification",
          reasoning:
            "An independent regulator reviewed the passive safety case twice and accepted it. A paper review is not operating experience: no NuScale module has been built, so the approval shows the design meets the rules, not how it behaves in a real accident.",
        },
        {
          id: "public-support-rising",
          title: "Gallup 2023: 55% of Americans Favor Nuclear, the Highest in a Decade",
          description:
            "Gallup's March 2023 poll found 55% of Americans favor nuclear energy, the highest in a decade and up from 44% in 2016 (it was roughly tied near 49% around 2019-2020). Climate concerns are shifting attitudes.",
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
            "Independent national pollster. Support for nuclear power in general may not carry over to a reactor in one's own town, and the poll does not ask about small reactors specifically.",
        },
        {
          id: "proliferation-distributed-risk",
          title: "UCS: Many Small-Reactor Designs Do Not Clearly Improve on Large Ones for Safety or Security",
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
            "A specific analysis by a named nuclear-safety expert, but UCS takes a critical stance on nuclear power, so independence is moderate. Proponents answer that smaller cores carry proportionally smaller worst-case releases.",
        },
        {
          id: "fukushima-legacy-distrust",
          title: "Germany Shut Its Last Three Reactors in April 2023, Twelve Years After Fukushima",
          description:
            "Germany accelerated its nuclear phase-out after Fukushima and shut its last three reactors on 15 April 2023. (Italy had already banned domestic nuclear power by referendum, reaffirmed in 2011, and Belgium has repeatedly delayed rather than completed its phase-out.) Local opposition and political reversals have continued to shape nuclear policy across Europe.",
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
            "Shows public consent can end a nuclear program whatever the engineering. It concerns nuclear power in general; opinion data on small reactors in particular is thin, so directness is low.",
        },
      ],
    },
    // =========================================================================
    // PILLAR 3: Schedule — Darlington and the US permits
    // =========================================================================
    {
      id: "smr-deployment-timeline",
      title: "Schedule: Will the First Western Units Connect on Time?",
      short_summary:
        "For the first time, Western small reactors are being built and permitted rather than announced. Darlington's first BWRX-300 targets the grid by the end of 2030; the NRC approved construction permits for TerraPower in March 2026 and TVA in September 2026. Big Western reactors have run years late, and NuScale still has no firm order.",
      image_url:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=60",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Nuclear construction has a long record of late, overbudget plants. Vogtle Units 3 and 4, the only new US reactors in a generation, came online about seven years late at roughly $35 billion against an original estimate near $14 billion, and bankrupted their lead contractor. A construction permit is not a power plant: TVA has announced no construction date for Clinch River, and NuScale, three years after Idaho, reported in August 2026 that it was still in 'discussions' toward a power purchase agreement with TVA. Its Romanian project passed a final investment decision in February 2026 only on confidential conditions, with operation aimed at 'the beginning of the next decade.' The nuclear workforce and regulator are stretched. Darlington is one unit; one unit is not scale.",
      proponent_rebuttal:
        "This time the projects are in the ground. Darlington's first BWRX-300 received its construction licence in April 2025, set its 2.1-million-pound basemat in the reactor shaft on 22 April 2026, and applied for its operating licence in March 2026, with grid connection targeted by the end of 2030. The NRC finished TVA's Clinch River review in 14 months, four months early, and TerraPower's Natrium review in 18 months against a 27-month schedule. Under the DOE's 2026 pilot program, four test reactors reached criticality by the 4 July deadline. Vogtle was a gigawatt-scale custom build; the point of small, repeated designs is to stop building that way.",
      crux: {
        id: "first-commercial-smr-date",
        title: "The First Western Commercial SMR Milestone",
        question:
          "Will Darlington's first BWRX-300 reach Ontario's grid by the end of 2030, as OPG plans?",
        description:
          "Track whether the first Western commercial SMR achieves grid connection by its publicly committed date, and whether the US units permitted in 2026 follow.",
        methodology:
          "Monitor Darlington unit 1 against OPG's targets (construction complete by the end of the decade, grid connection by the end of 2030, approval for units 2 to 4 in 2028), then the US projects with construction permits (TVA Clinch River, TerraPower Kemmerer) against their stated dates. Record construction start, fuel load, criticality, and grid connection against the original commitments.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Record each Western small-reactor project's committed grid-connection date and budget, then mark actual dates as they pass using regulator and utility filings, for projects such as Ontario's Darlington SMR and TVA's Clinch River.",
        },
        cost_to_verify:
          "$0 (public record tracking of announced project milestones)",
        falsification: {
          supporter_flip:
            "If Darlington unit 1 slipped well past 2030, and the TVA and TerraPower units sat on their permits without firm construction dates, small reactors would be repeating the pattern of Vogtle and NuScale, and deployment at scale by the mid-2030s would be out of reach.",
          skeptic_flip:
            "If Darlington unit 1 reached the grid by the end of 2030, and Ontario approved units 2 to 4 in 2028 while the US units began construction on schedule, the charge that small reactors are always ten years away would lose its footing.",
          common_ground:
            "Both sides agree no small modular reactor yet supplies a Western grid, that Darlington unit 1 is the furthest along, and that the large Western reactors of the last two decades, such as Vogtle, ran years late.",
          live_disagreement:
            "Whether the Western small reactors now under construction or permitted connect on their committed dates, or slip the way NuScale and the big reactors did.",
        },
      },
      evidence: [
        {
          id: "opg-darlington-progress",
          title: "Darlington Unit 1 Set Its Basemat in April 2026 and Applied to Operate, Targeting the Grid by End of 2030",
          description:
            "OPG received its licence to construct from the Canadian Nuclear Safety Commission in April 2025 and its final investment decision on 8 May 2025. On 22 April 2026 it lifted the nearly 2.1-million-pound, 37-metre basemat into the 35-metre reactor shaft; the first of eight reactor-building levels is due by the end of 2026, and the operating licence application went to the regulator in late March 2026. OPG targets construction complete by the end of the decade and grid connection by the end of 2030, with approval for units 2 to 4 expected in 2028. 'We got our license to construct in April and our [FID] in May, and we've been off to the races since,' said OPG's Subo Sinnathamby (Nuclear News, 5 June 2026).",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 8,
          },
          source:
            "Nuclear News (American Nuclear Society), 'North American construction is back, smaller and faster, at OPG's Darlington' (5 June 2026); POWER Magazine on the April 2025 licence to construct (8 May 2025)",
          sourceUrl:
            "https://ans.org/news/2026-06-05/article-8047/north-american-construction-is-back-smaller-and-faster-at-opgs-darlington/",
          reasoning:
            "The furthest-along Western small reactor, on schedule at its early milestones. Early civil works are where nuclear projects usually look best; the harder steps (vessel installation, commissioning, fuel load) are ahead, and the schedule figures come from the owner, reported by a trade society, so independence is moderate.",
        },
        {
          id: "tva-clinch-river-permit",
          title: "NRC Issued TVA the First US Permit to Build a BWRX-300, After a 14-Month Review (September 2026)",
          description:
            "In late September 2026 the NRC issued the Tennessee Valley Authority a construction permit for a BWRX-300 at its Clinch River site near Oak Ridge, Tennessee. The review, formally begun in July 2025, took 14 months, four months earlier than scheduled. The NRC said the permit 'paves the way for the nation's first commercial small modular reactor.' The permit allows construction, not operation, and 'no construction date has been announced'; TVA said it 'continues negotiations with industry partners to ensure responsible cost sharing.' In March 2026 the NRC approved a construction permit for TerraPower's 345 MWe sodium-cooled Natrium plant at Kemmerer, Wyoming, finishing a review scheduled for 27 months in 18; TerraPower expects the plant to be complete in 2030.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "World Nuclear News, 'First construction permit issued for BWRX-300 SMR in US' (30 September 2026); World Nuclear News, 'NRC issues construction permit for first Natrium plant' (March 2026)",
          sourceUrl:
            "https://world-nuclear-news.org/articles/first-construction-permit-issued-for-bwrx300-smr-in-us",
          reasoning:
            "Two US reviews finished faster than scheduled answer the charge that licensing alone keeps small reactors a decade away. A permit is not a plant: TVA has no construction date or cost-sharing deal yet, so the card speaks to the regulator's pace, not to when power flows.",
        },
        {
          id: "vogtle-delays-precedent",
          title:
            "Vogtle 3 & 4: Years Late and Roughly Double the Original Estimate",
          description:
            "The only new US reactors in a generation, Vogtle Units 3 and 4, came online in July 2023 and April 2024, about seven years late against an original 2016-2017 schedule. Originally estimated near $14 billion, total project cost reached roughly $35 billion (including about $3.7 billion Westinghouse paid to exit), and lead contractor Westinghouse went bankrupt in 2017.",
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
            "The most recent US record for building reactors, and it is poor. Directness is moderate: Vogtle's AP1000s are large custom builds, the model small reactors claim to replace.",
        },
        {
          id: "nuscale-no-firm-order",
          title: "Three Years After Idaho, NuScale Has No Firm Order; Its Romanian Plant Passed FID Only on Confidential Conditions",
          description:
            "NuScale's second-quarter 2026 results (5 August 2026) report that its partner ENTRA1 Energy 'continues to advance discussions' with TVA toward 'a definitive power purchase agreement'; the release announces no firm reactor order. In Romania, Nuclearelectrica's shareholders approved a final investment decision for a six-module, 462 MWe NuScale plant at Doicești on 12 February 2026, but contingent on conditions described as 'mandatory requirements that condition the feasibility of the project', kept confidential under an eight-year agreement; the aim is operation at 'the beginning of the next decade' (POWER Magazine, 25 February 2026).",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "NuScale Power, Second Quarter 2026 Results (5 August 2026); POWER Magazine on the Doicești final investment decision (25 February 2026)",
          sourceUrl:
            "https://www.nuscalepower.com/press-releases/2026/nuscale-power-reports-second-quarter-2026-results",
          reasoning:
            "The design with the most regulatory approvals still has no plant under construction, which is the skeptics' point about the gap between approvals and steel. It concerns one vendor; GE-Hitachi's design is the one now being built, so the card does not speak for the whole field.",
        },
        {
          id: "doe-pilot-criticality",
          title: "Four DOE-Authorized Test Reactors Reached Criticality by 4 July 2026, Mostly at Zero Power",
          description:
            "Under the DOE pilot program set up by President Trump's May 2025 executive order on reactor testing, which aimed for at least three test reactors to reach criticality by 4 July 2026, Antares Nuclear and Valar Atomics reached criticality in June 2026, Deployable Energy on 1 July and Aalo Atomics at 00:20 on 4 July (World Nuclear News, 7 July 2026). Aalo's run was a zero-power test with a full-scale core load. Energy Secretary Chris Wright said the program had \"surpassed that ask and delivered four.\"",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 3,
          },
          source:
            "World Nuclear News, 'Criticality for fourth US microreactor meets 4 July deadline' (7 July 2026)",
          sourceUrl:
            "https://world-nuclear-news.org/articles/criticality-for-fourth-us-microreactor-meets-deadline",
          reasoning:
            "Shows new US reactor designs can be built and started on a political deadline. Directness is low: these are microreactor tests, mostly at zero power, producing no electricity, and a test reactor reaching criticality is years from a commercial plant on the grid.",
        },
        {
          id: "nrc-workforce-bottleneck",
          title: "DOE: Adding 200 GW of Nuclear by 2050 Would Need About 375,000 More Workers",
          description:
            "Reviewing many simultaneous advanced-reactor applications strains NRC staff capacity, and analysts warn of a looming nuclear-workforce gap: DOE estimates roughly 375,000 additional workers would be needed to add 200 GW of nuclear by 2050, with about 40% of the current workforce eligible to retire within a decade.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 5,
          },
          source:
            "Federation of American Scientists analysis of NRC hiring; DOE workforce estimates",
          sourceUrl: "https://fas.org/publication/new-nuclear-energy-hiring-nrc/",
          reasoning:
            "A real constraint on a fleet build-out. Directness is moderate: the NRC finished its 2026 small-reactor reviews ahead of schedule, so the regulator was not the bottleneck there; the workforce gap bears more on building many plants at once.",
        },
        {
          id: "russia-floating-smr",
          title: "Russia's Akademik Lomonosov Operating Since 2020",
          description:
            "Russia's Akademik Lomonosov, the world's only operating floating nuclear power plant, uses two KLT-40S reactors (about 35 MWe each). It connected to the grid at Pevek in December 2019 and was fully commissioned (declared in commercial operation) in May 2020.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 4,
            directness: 5,
          },
          source: "World Nuclear Association — Nuclear Power in Russia / SMR profile",
          sourceUrl:
            "https://www.world-nuclear.org/information-library/country-profiles/countries-o-s/russia-nuclear-power",
          reasoning:
            "Shows small reactors can be built and run. Russia's state nuclear program works under very different regulatory and economic conditions, and reporting depends heavily on Rosatom, so independence is low and it says little about Western schedules.",
        },
      ],
    },
  ],
};
