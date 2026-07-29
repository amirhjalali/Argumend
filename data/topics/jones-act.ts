import type { Topic } from "@/lib/schemas/topic";

export const jonesActData = {
  id: "jones-act",
  title: "Repealing the Jones Act",
  meta_claim:
    "The Jones Act's requirement that cargo moving between U.S. ports travel on ships that are U.S.-built, U.S.-flagged, and U.S.-crewed imposes large and measurable economic costs — inflated domestic shipping prices, a shrunken merchant fleet, freight pushed onto trucks and rail, and disproportionate harm to Puerto Rico, Hawaii, Alaska, and Guam — that outweigh its claimed national-security and maritime-industry benefits, so it should be repealed or substantially reformed.",
  status: "contested" as const,
  category: "economics" as const,
  references: [
    {
      title:
        "Puerto Rico: Characteristics of the Island's Maritime Trade and Potential Effects of Modifying the Jones Act (GAO-13-260, 2013)",
      url: "https://www.gao.gov/products/gao-13-260",
    },
    {
      title:
        "The Jones Act: A Burden America Can No Longer Bear (Grabow, Manak & Ikenson, Cato Institute Policy Analysis No. 845, 2018)",
      url: "https://www.cato.org/policy-analysis/jones-act-burden-america-can-no-longer-bear",
    },
    {
      title:
        "Shipping Under the Jones Act: Legislative and Regulatory Background (Congressional Research Service, R45725)",
      url: "https://crsreports.congress.gov/product/pdf/R/R45725",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "How big is the cost, really?",
      content:
        "Estimates of the Jones Act's annual burden range from a few hundred million to several billion dollars, and much of that spread is methodological. This map separates the parts that are measured (prices to Puerto Rico, ship-construction premiums) from the parts that require modeling a counterfactual we can't directly observe.",
    },
    {
      id: "q2",
      title: "Does it actually buy national security?",
      content:
        "The strongest case for the Act is that it sustains a domestic shipbuilding base and a pool of mariners for wartime sealift. That claim is testable: the oceangoing Jones Act fleet has shrunk to under a hundred ships, and the reserve sealift force's own readiness exercises have posted troubling numbers.",
    },
    {
      id: "q3",
      title: "Why has it survived for a century?",
      content:
        "A 1920 law with few academic defenders and broad economist opposition persists because its benefits are concentrated on a small, organized coalition of shipyards and maritime unions while its costs are spread thinly across every consumer. That asymmetry is itself part of the argument.",
    },
  ],
  pillars: [
    {
      id: "cost-premium",
      title: "The Domestic Shipping Cost Premium",
      short_summary:
        "U.S.-built ships cost several times the world price and the protected fleet has withered — so domestic waterborne freight is far more expensive than it would be at world rates.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The headline cost figures are counterfactual guesses, not observed prices. Nobody can watch the world in which the Jones Act was repealed, so estimates depend on assumptions about how far foreign-rate benchmarks apply, whether foreign carriers would actually serve thin domestic routes, and how quickly a deregulated fleet would re-form. The GAO looked hard at Puerto Rico and concluded the net effect of repeal was genuinely uncertain.",
      proponent_rebuttal:
        "Two pieces of the cost are directly observed, not modeled. A U.S.-built oceangoing ship costs roughly four to five times its foreign-built equivalent, and the number of privately owned oceangoing Jones Act ships has fallen to under a hundred vessels — a fleet too small and too old to be cheap. Independent bodies from the U.S. International Trade Commission to the OECD have repeatedly estimated net welfare gains from liberalization. The uncertainty is about the exact magnitude, not the sign.",
      crux: {
        id: "counterfactual-cost-test",
        title: "The Counterfactual Cost Test",
        description:
          "Estimate what domestic waterborne freight would cost under repeal by benchmarking against foreign-flag rates on comparable routes and against U.S.-flag international rates, then net out the observed premium. A large, robust premium implies real deadweight loss; a small or fragile one vindicates the skeptic.",
        methodology:
          "Assemble U.S.-built vs. world ship-construction prices (MARAD/industry data), U.S.-flag vs. foreign-flag operating-cost gaps, and domestic vs. comparable foreign-route freight rates. Model repeal scenarios with a range of foreign-carrier entry assumptions, as USITC-style CGE welfare studies do, and report a range rather than a point estimate.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$150K (CGE welfare model + freight-rate data assembly)",
      },
      evidence: [
        {
          id: "cato-burden",
          title: "Cato: the Act is a net burden",
          description:
            "Grabow, Manak & Ikenson (Cato, 2018) synthesize the shipbuilding-cost premium, the shrinking fleet, and higher domestic freight rates to argue the Jones Act imposes large, diffuse costs on the U.S. economy while protecting a small industry.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 9,
          },
          source: "Grabow, Manak & Ikenson, Cato Institute Policy Analysis No. 845 (2018)",
          reasoning:
            "Careful, well-sourced, and directly on the meta-claim — but authored by a think tank with an explicit free-trade prior, so independence is discounted.",
        },
        {
          id: "ship-build-premium",
          title: "U.S.-built ships cost several times the world price",
          description:
            "A U.S.-built oceangoing commercial ship costs on the order of four to five times an equivalent built in Asia or Europe — a gap widely cited from MARAD and industry construction data and central to why the domestic fleet is so small.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Maritime Administration (MARAD) / industry shipbuilding cost data",
          reasoning:
            "The multiple is directly observed and widely reproduced; the exact ratio varies by vessel type and year, so the specific figure carries some uncertainty.",
        },
        {
          id: "usitc-welfare",
          title: "USITC: liberalization yields welfare gains",
          description:
            "In successive editions of 'The Economic Effects of Significant U.S. Import Restraints,' the U.S. International Trade Commission modeled coastwise-shipping (Jones Act) liberalization and estimated net annual economic welfare gains — on the order of hundreds of millions to over a billion dollars in the editions that covered it.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "U.S. International Trade Commission, 'Economic Effects of Significant U.S. Import Restraints'",
          reasoning:
            "An independent federal agency using standard CGE methods on exactly this question; the exact dollar figure and edition should be verified before quoting.",
        },
        {
          id: "gao-uncertain",
          title: "GAO: the net effect is genuinely uncertain",
          description:
            "GAO's 2013 study of Puerto Rico declined to put a firm number on the cost of the Jones Act, warning that repeal effects depend on how foreign carriers, freight rates, and service reliability would actually respond — the honest steelman against confident cost claims.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source: "U.S. Government Accountability Office, GAO-13-260 (2013)",
          sourceUrl: "https://www.gao.gov/products/gao-13-260",
          reasoning:
            "Highly credible and independent; it constrains the magnitude of the cost claim without endorsing the Act, which is why it counts against overconfidence rather than against repeal outright.",
        },
      ],
    },
    {
      id: "noncontiguous-harm",
      title: "Disproportionate Harm to Noncontiguous Jurisdictions",
      short_summary:
        "Puerto Rico, Hawaii, Alaska, and Guam depend on seaborne supply and have no rail or truck alternative — so they bear the Act's costs most heavily.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Places like Puerto Rico can and do import from foreign ports on foreign ships; the Act only binds cargo moving from the U.S. mainland. Higher landed costs there reflect distance, small market size, and port economics as much as the law. The GAO found shippers themselves feared that repeal could leave thin island routes with less reliable, not cheaper, service.",
      proponent_rebuttal:
        "The noncontiguous jurisdictions are exactly where the Act bites hardest because they have no highway or rail substitute for a ship. The New York Fed's 2012 competitiveness report noted it cost roughly twice as much to ship a container from the U.S. mainland to Puerto Rico as from a nearby foreign port, and Hawaii and Alaska pay similar premiums on food and fuel. When the only legal carrier is a scarce, expensive U.S.-built vessel, captive consumers absorb the markup.",
      crux: {
        id: "island-price-gap",
        title: "The Captive-Route Price Gap",
        description:
          "Compare the delivered cost of identical goods shipped to a noncontiguous U.S. jurisdiction from the mainland (Jones Act–bound) versus from a comparable nearby foreign port (not bound). A persistent gap after controlling for distance and volume isolates the Act's price effect on captive consumers.",
        methodology:
          "Match container and bulk shipments to Puerto Rico, Hawaii, and Guam against foreign-origin shipments of like goods over like distances; control for volume, fuel, and port fees; attribute the residual delivered-cost gap to the U.S.-build/flag/crew requirement.",
        verification_status: "verified" as const,
        cost_to_verify: "$0–$50K (customs, PIERS/port, and freight-rate data)",
      },
      evidence: [
        {
          id: "nyfed-pr",
          title: "NY Fed: shipping to Puerto Rico costs ~2x a foreign port",
          description:
            "The Federal Reserve Bank of New York's 2012 report on Puerto Rico's economy observed that Jones Act shipping made it substantially more expensive — on the order of twice as much — to bring goods from the U.S. mainland than from nearby non-U.S. ports.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Federal Reserve Bank of New York, Report on the Competitiveness of Puerto Rico's Economy (2012)",
          reasoning:
            "Independent central-bank analysis directly on the captive-route premium; the exact multiple should be confirmed against the report text.",
        },
        {
          id: "grabow-islands",
          title: "Island economies pay a structural surcharge",
          description:
            "Cato's Jones Act work documents higher food, fuel, and construction-material costs in Puerto Rico, Hawaii, and Alaska tied to the limited, costly pool of Jones Act–qualified vessels serving them.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 8,
          },
          source: "Colin Grabow, Cato Institute (Jones Act research)",
          reasoning:
            "Directly on point and consistent with other sources, but from an advocacy-leaning source, so independence is discounted.",
        },
        {
          id: "maria-waiver",
          title: "The Hurricane Maria waiver episode",
          description:
            "After Hurricane Maria in 2017, the federal government temporarily waived the Jones Act for Puerto Rico to speed relief shipments — a tacit acknowledgment that the requirement raised the cost or slowed the flow of supplies to the island in a crisis.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "DHS/Customs and Border Protection Jones Act waiver (2017)",
          reasoning:
            "Suggestive real-world signal, but a short emergency waiver is weaker evidence of steady-state cost than direct price comparisons.",
        },
        {
          id: "gao-service-reliability",
          title: "Repeal could reduce service reliability",
          description:
            "GAO-13-260 reported that some Puerto Rico shippers valued the frequent, dedicated service Jones Act carriers provide and feared foreign carriers might serve the route less reliably or reroute capacity elsewhere if the Act were lifted.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 5,
            directness: 6,
          },
          source: "U.S. Government Accountability Office, GAO-13-260 (2013)",
          reasoning:
            "A credible, source-grounded caution — though it reflects shipper expectations rather than measured post-repeal outcomes.",
        },
      ],
    },
    {
      id: "modal-distortion",
      title: "Freight Distortion Toward Road and Rail",
      short_summary:
        "By making coastal shipping artificially expensive, the Act pushes cargo onto trucks and trains — raising emissions, congestion, and road wear.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The U.S. underuses coastal shipping mostly because of geography, port infrastructure, transit time, and the sheer efficiency of its rail and interstate networks — not primarily the Jones Act. Attributing the modal split to one 1920 statute overstates its reach and ignores that trucks and rail win on speed and door-to-door reach regardless.",
      proponent_rebuttal:
        "Waterborne freight is the most fuel-efficient mode per ton-mile by a wide margin, yet the U.S. moves a far smaller share of domestic freight by short-sea shipping than comparable coastlines in Europe. Raising the cost of the greenest mode predictably diverts cargo to trucks — more diesel, more highway congestion, more pavement damage — an environmental cost the Act's defenders rarely price in.",
      crux: {
        id: "modal-shift-test",
        title: "The Modal-Shift and Emissions Test",
        description:
          "Estimate how much domestic freight would shift from truck/rail to coastal shipping if waterborne rates fell to world levels, then convert the shift into changes in fuel use, CO2, and congestion. A large elastic shift implies the Act carries a real environmental and infrastructure cost.",
        methodology:
          "Combine mode-choice elasticities with per-ton-mile emissions factors (EPA/BTS) and a repeal-scenario coastal rate. Compare the U.S. short-sea freight share against European cabotage-liberalized coastlines as an upper-bound benchmark.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$100K (freight mode-choice modeling)",
      },
      evidence: [
        {
          id: "water-efficiency",
          title: "Water is the most efficient freight mode per ton-mile",
          description:
            "Federal transportation data consistently rank inland and coastal shipping as far more fuel-efficient and lower-emission per ton-mile than trucking, so diverting cargo off the water raises the carbon and fuel intensity of freight.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "U.S. DOT Bureau of Transportation Statistics / EPA modal emissions data",
          reasoning:
            "Well-established modal efficiency facts, but the link from the Act to a specific quantity of diverted freight is indirect.",
        },
        {
          id: "shortsea-underuse",
          title: "U.S. short-sea shipping is underdeveloped",
          description:
            "The United States moves a strikingly small share of domestic freight by coastal 'short-sea' shipping compared with liberalized European coastlines, a gap analysts attribute in part to the cost structure the Jones Act imposes.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "OECD / International Transport Forum cabotage analysis",
          reasoning:
            "Consistent cross-national pattern, but disentangling the Act from geography and infrastructure is the hard, unresolved step.",
        },
        {
          id: "geography-confound",
          title: "Geography and infrastructure explain much of the split",
          description:
            "The U.S. has an unusually dense, cheap rail and interstate network and long overland corridors where trucks and trains dominate on speed and reach — much of the low coastal-freight share would persist even without the Act.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          reasoning:
            "A fair confounder that trims the environmental claim; it limits, but does not erase, the Act's modal effect.",
        },
      ],
    },
    {
      id: "national-security",
      title: "National Security & Sealift Readiness",
      short_summary:
        "The Act's strongest defense: it preserves shipyards and mariners for wartime. But the fleet has shrunk anyway and sealift readiness audits have posted alarming numbers.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "A nation that cannot build ships or crew them in wartime is strategically exposed. The Jones Act sustains domestic shipyards, a base of oceangoing U.S. mariners, and vessels that can be requisitioned for military sealift — capabilities markets alone would not provide and that are extraordinarily costly to rebuild once lost. This is a genuine public good, and defense planners have long treated the merchant marine as a fourth arm of national logistics.",
      proponent_rebuttal:
        "The security case is real in theory but weak in practice: a century of protection has coincided with the collapse of the oceangoing Jones Act fleet to under a hundred ships and a documented shortage of the very mariners a sealift surge would need. When the reserve sealift force ran a no-notice 'turbo activation' exercise, a large share of ships failed to get underway mission-capable. Most military sealift already rides on foreign-built ships in the government-owned reserve, and allies like Australia meet security needs without cabotage this strict. Protection has bought a shrinking, aging base — not readiness.",
      crux: {
        id: "sealift-readiness-audit",
        title: "The Sealift-Readiness Audit",
        description:
          "Test directly whether today's Jones Act fleet and mariner pool actually meet Department of Defense sealift requirements. If the protected fleet cannot surge on demand, the security rationale fails on its own terms, independent of the economics.",
        methodology:
          "Use MARAD/TRANSCOM readiness exercises (no-notice 'turbo activations'), Ready Reserve Force mission-capable rates, the certified mariner-availability gap, and the count and age of oceangoing Jones Act ships to measure whether requirements are met — then ask whether the Act, versus targeted subsidies, is what sustains them.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (GAO, MARAD, and TRANSCOM readiness reports)",
      },
      evidence: [
        {
          id: "turbo-activation",
          title: "Reserve sealift 'turbo activation' posted low readiness",
          description:
            "A 2019 no-notice turbo activation of the government's reserve sealift fleet found that only a minority of ships achieved full mission-capable readiness to get underway — a stark signal that the sealift base is not in the shape the security rationale assumes.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source: "Maritime Administration (MARAD) / U.S. Transportation Command sealift readiness exercise (2019)",
          reasoning:
            "A concrete, government-run stress test directly on readiness; the exact mission-capable percentage should be verified before quoting.",
        },
        {
          id: "fleet-collapse",
          title: "The oceangoing Jones Act fleet has collapsed",
          description:
            "The number of large, privately owned oceangoing Jones Act–qualified ships has fallen to under a hundred vessels, down from many hundreds mid-century — evidence that a century of protection has not preserved a robust fleet.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Maritime Administration (MARAD) fleet statistics",
          reasoning:
            "Directly undercuts the 'the Act sustains the fleet' premise; the precise current vessel count should be confirmed against MARAD data.",
        },
        {
          id: "mariner-shortage",
          title: "A documented mariner shortage",
          description:
            "MARAD and TRANSCOM have warned of a shortfall of the credentialed oceangoing mariners needed to crew both the commercial fleet and activated sealift ships in a prolonged mobilization — the labor side of the readiness gap.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "MARAD / U.S. Transportation Command mariner-availability assessments",
          reasoning:
            "Credible official concern; the specific size of the gap has been estimated in the low thousands but should be verified.",
        },
        {
          id: "security-public-good",
          title: "The merchant marine is a genuine defense asset",
          description:
            "Defense logistics has historically relied on a domestic merchant marine and shipbuilding base for wartime sealift and repair capacity — a strategic capability that is slow and expensive to reconstitute if allowed to disappear, which is the core reason the Act has bipartisan defense support.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 7,
          },
          source: "U.S. Department of Defense / Maritime Administration policy statements",
          reasoning:
            "A real and important rationale, but it argues for sustaining capability, not necessarily via cabotage — and much of it is assertion rather than measured outcome.",
        },
      ],
    },
    {
      id: "political-economy",
      title: "Political Economy: Concentrated Gains, Diffuse Costs",
      short_summary:
        "A 1920 law with few academic defenders survives because a small, organized coalition captures the benefits while costs are spread across every consumer.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The Act's persistence across a century of Congresses and administrations is itself evidence that it serves interests worth weighing — union jobs, shipyard communities, and a strategic industry that a democracy has repeatedly chosen to protect. Calling that 'capture' dismisses legitimate stakeholders who would bear concentrated, immediate losses from repeal.",
      proponent_rebuttal:
        "The Act is a textbook illustration of concentrated benefits and diffuse costs: a few shipyards and maritime unions gain visibly and organize to defend the law, while the far larger cost is smeared thinly across consumers who never attribute their higher prices to it. That asymmetry — not a favorable cost-benefit verdict — best explains why a statute opposed by most economists endures. The remedy for the displaced is targeted transition support, not a permanent economy-wide tax.",
      crux: {
        id: "distributional-ledger",
        title: "The Distributional Ledger",
        description:
          "Lay the Act's costs and benefits on a single ledger: the concentrated, identifiable gains to shipyards, vessel owners, and mariners versus the diffuse, per-household cost to consumers and downstream industries. If aggregate costs exceed benefits while benefits are far more concentrated, the public-choice explanation holds.",
        methodology:
          "Quantify beneficiary employment and revenue in protected shipyards and carriers against economy-wide consumer and industrial cost estimates; compare the per-beneficiary stake to the per-consumer burden to gauge organizational asymmetry, and price a buy-out/transition package as the reform alternative.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$75K (distributional incidence study)",
      },
      evidence: [
        {
          id: "economist-consensus",
          title: "Broad economist opposition",
          description:
            "Analyses across the ideological spectrum — from Cato to the Mercatus Center to independent trade economists — converge on the Jones Act as a net-negative protectionist measure, a rare degree of consensus on a live policy question.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Grennes (Mercatus, 2017); Cato Jones Act research; trade-economics literature",
          reasoning:
            "Reflects a genuine breadth of expert agreement, though it is a survey of opinion rather than a single decisive measurement.",
        },
        {
          id: "concentrated-lobby",
          title: "A small, organized beneficiary coalition",
          description:
            "The Act's defense is led by a compact set of shipyards, vessel operators, and maritime labor unions whose per-member stake is large and immediate — the organizational profile public-choice theory predicts will defeat diffuse consumer interests.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Public-choice analysis of maritime protectionism",
          reasoning:
            "A well-supported structural read of the politics; it explains persistence but does not by itself prove the Act is welfare-reducing.",
        },
        {
          id: "legitimate-stakeholders",
          title: "Real jobs and communities are at stake",
          description:
            "Repeal would impose concentrated, immediate losses on shipyard towns and mariner households — legitimate interests that democratic politics may reasonably weigh above diffuse consumer savings, and that would require costly transition support to offset.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          reasoning:
            "A fair rebuttal on distributional grounds, though it concedes the aggregate cost and argues about who bears adjustment rather than about net welfare.",
        },
      ],
    },
  ],
};
