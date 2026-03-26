import type { Topic } from "@/lib/schemas/topic";

export const nuclearRenaissanceSmrData = {
  id: "nuclear-renaissance-smr",
  title: "Can Small Modular Reactors Save Nuclear Energy?",
  meta_claim:
    "Small modular reactors represent a viable path to carbon-free baseload power that can be deployed at scale within this decade.",
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
        "NuScale's cancellation reflected first-of-a-kind costs and a specific utility consortium's risk tolerance, not an inherent economic flaw. South Korea's SMART reactor and China's HTR-PM demonstrate that SMR construction is feasible. Factory fabrication hasn't been tried at scale yet — comparing first-unit costs to mature renewable supply chains is misleading. SMRs provide firm, dispatchable baseload power that avoids the integration costs of intermittent renewables (grid storage, transmission upgrades, overbuilding). When system-level costs are included, SMRs may be competitive, especially for industrial heat and remote applications where renewables falter.",
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
            "The most advanced US SMR project was terminated in November 2023 after costs rose 76% to $9.3 billion, making power uncompetitive at $89/MWh.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 10,
          },
          source: "NuScale Power, Utah Associated Municipal Power Systems",
          reasoning:
            "Real-world cost data from the furthest-along Western SMR project; directly demonstrates economic challenge.",
        },
        {
          id: "china-htr-pm-operational",
          title: "China's HTR-PM Achieved Commercial Operation",
          description:
            "China's high-temperature gas-cooled reactor at Shidao Bay began commercial operation in December 2023, becoming the world's first operational Generation IV SMR.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "China National Nuclear Corporation, World Nuclear News",
          reasoning:
            "Demonstrates technical feasibility but cost data is opaque; state-funded project may not reflect true market economics.",
        },
        {
          id: "solar-storage-learning-curve",
          title: "Solar+Storage Costs Declining 10-15% Annually",
          description:
            "Utility-scale solar LCOE dropped 90% since 2010; lithium-ion battery costs fell 97% since 1991. Combined solar+4hr storage now bids below $50/MWh in many markets.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Lazard LCOE Analysis, BloombergNEF",
          reasoning:
            "Established cost trajectory makes the competitive bar a moving target; SMRs must beat future, not current, renewable costs.",
        },
        {
          id: "factory-fabrication-potential",
          title: "Factory Fabrication Could Cut Construction Costs 30-50%",
          description:
            "Engineering analyses suggest modular factory assembly of reactor components could reduce labor costs by 30-50% compared to stick-built construction, following shipbuilding and aerospace precedents.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 3,
            directness: 4,
          },
          source: "DOE Office of Nuclear Energy, Rolls-Royce SMR projections",
          reasoning:
            "Theoretical projections from vendors with financial interests; no SMR factory has operated at scale to validate claims.",
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
        "Modern SMR designs are fundamentally different from legacy reactors. Passive cooling systems use gravity and natural convection — they require no operator action or external power to shut down safely, directly addressing the failure mode that caused Fukushima. Some designs operate at atmospheric pressure, eliminating the risk of pressure-driven containment breach. The NRC's approval of NuScale's design certification — the first SMR to achieve this — followed the most rigorous safety review in US history. Polling shows public support for nuclear energy has reached record highs (60%+ in US Gallup polls), driven by climate urgency. SMRs' smaller size also means smaller source terms and physically limited maximum accident consequences.",
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
            "In January 2023, the NRC issued the first-ever Standard Design Approval for an SMR, after a multi-year review confirming passive safety systems meet all regulatory requirements.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "US Nuclear Regulatory Commission",
          reasoning:
            "Independent regulatory body validated safety claims through rigorous review process.",
        },
        {
          id: "public-support-rising",
          title: "Public Support for Nuclear at Record Highs",
          description:
            "Gallup polling shows 55% of Americans favor nuclear energy as of 2023, up from 44% in 2020. Climate concerns are shifting attitudes, especially among younger demographics.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "Gallup, Pew Research Center",
          reasoning:
            "Broad polling data, though support for nuclear in general may not translate to support for a reactor in one's community (NIMBY effect).",
        },
        {
          id: "proliferation-distributed-risk",
          title: "More Reactor Sites Increase Distributed Security Risk",
          description:
            "Deploying dozens of smaller reactors across many sites increases the number of locations requiring security, spent fuel management, and emergency planning — spreading nuclear risk rather than concentrating it.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Union of Concerned Scientists, Nuclear proliferation analysts",
          reasoning:
            "Legitimate security and logistics concern, though SMR proponents argue smaller sites have proportionally smaller risk profiles.",
        },
        {
          id: "fukushima-legacy-distrust",
          title: "Fukushima Legacy Continues to Shape Public Opposition",
          description:
            "Post-Fukushima, Germany, Belgium, and Italy moved to phase out nuclear entirely. Local opposition has blocked or delayed projects in the US, UK, and EU despite national policy support.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "World Nuclear Association, national energy policy records",
          reasoning:
            "Documented political reality, though applies to nuclear generally — SMR-specific opposition data is limited.",
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
        "The nuclear industry has a decades-long track record of overpromising and underdelivering on timelines. Vogtle Units 3 and 4 took 14 years and cost $35 billion — more than double the original estimate. Hinkley Point C in the UK is years behind schedule. SMR proponents promised commercial units by 2029, but no Western SMR has broken ground on a commercial plant. NRC licensing alone takes 3-5 years, fuel supply chains don't exist yet, and the nuclear workforce has atrophied. Claims of deployment 'within this decade' are aspirational, not credible.",
      proponent_rebuttal:
        "Vogtle and Hinkley Point C are large, bespoke gigawatt-scale projects — exactly the construction model SMRs are designed to disrupt. SMRs shift work from chaotic construction sites to controlled factory environments, reducing the schedule risk that plagues large nuclear builds. The NRC has streamlined its review process and approved NuScale's design in record time. Multiple nations are fast-tracking SMR licensing: Canada, the UK, and South Korea have parallel review processes underway. The US ADVANCE Act (2024) further accelerated NRC timelines and reduced fees. Russia's floating SMR (Akademik Lomonosov) and China's HTR-PM prove that non-traditional reactor deployment is achievable. The 2030s, not 2020s, is the realistic commercial window — and that still arrives in time to contribute to mid-century decarbonization goals.",
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
            "Vogtle 3 & 4: 7 Years Late and $19B Over Budget",
          description:
            "The only new US nuclear units in a generation took 14 years to complete (2009-2023) at $35 billion, more than doubling the $14 billion estimate, bankrupting Westinghouse in the process.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "Georgia Public Service Commission, Southern Company filings",
          reasoning:
            "Directly relevant precedent for US nuclear construction, though large-scale projects differ structurally from SMRs.",
        },
        {
          id: "russia-floating-smr",
          title: "Russia's Akademik Lomonosov Operating Since 2020",
          description:
            "The world's first floating nuclear power plant, using two KLT-40S reactors (35 MWe each), has been supplying power to Pevek, Russia since May 2020.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 4,
            directness: 6,
          },
          source: "Rosatom, World Nuclear Association",
          reasoning:
            "Demonstrates SMR-scale deployment is achievable, but Russian state nuclear program operates under very different regulatory and economic conditions.",
        },
        {
          id: "nrc-workforce-bottleneck",
          title: "NRC Licensing Bottleneck and Workforce Shortage",
          description:
            "The NRC has limited staff to review multiple simultaneous SMR applications. The US nuclear workforce shrank 30% since 2012. New reactor licensing typically requires 3-5 years of review even with streamlined processes.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "NRC Annual Reports, Nuclear Energy Institute workforce studies",
          reasoning:
            "Institutional capacity constraints are well-documented and directly impact deployment timelines.",
        },
        {
          id: "advance-act-acceleration",
          title: "US ADVANCE Act Streamlines Nuclear Licensing",
          description:
            "The ADVANCE Act signed in 2024 reduces NRC licensing fees, creates milestone-based review schedules, and directs the NRC to develop a regulatory framework specifically for advanced reactors within 2 years.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "US Congress, NRC implementation guidance",
          reasoning:
            "Legislative action directly addresses regulatory timeline concerns, though implementation effectiveness remains to be seen.",
        },
      ],
    },
  ],
};
