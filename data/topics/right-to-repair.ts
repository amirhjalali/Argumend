import type { Topic } from "@/lib/schemas/topic";

export const rightToRepairData = {
  id: "right-to-repair",
  title: "Right to Repair",
  meta_claim:
    "Right-to-repair laws benefit consumers without significantly harming innovation or safety.",
  status: "contested" as const,
  category: "policy" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "When the FTC actually investigated the industry's reasons for blocking independent repair — safety, security, protecting their intellectual property — it found 'scant evidence' for any of them, and 'no empirical evidence' that independent shops mishandle customer data more than authorized ones. The real surprise isn't that repair restrictions exist; it's that even an unfriendly federal regulator, after taking sworn input from the manufacturers themselves, concluded the safety story mostly doesn't hold up — for ordinary electronics. The genuine exception is networked, safety-critical systems like cars and medical devices.",
    confidence: 88,
    source:
      "US FTC, 'Nixing the Fix: An FTC Report to Congress on Repair Restrictions' (May 2021); US PIRG, 'Repair Saves Families Big' (2021)",
    sourceUrl:
      "https://www.ftc.gov/reports/nixing-fix-ftc-report-congress-repair-restrictions",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Manufacturers make repair artificially hard — restricting parts, tools, and diagnostics — and it costs you real money: US PIRG estimates repairing rather than replacing four common devices (phones, laptops, fridges, washing machines) would cut average household ownership cost by about $330/yr (~22%), and the FTC found manufacturers' safety/security excuses for blocking repair to be largely unsupported.",
    "But the savings figure comes from advocacy-group arithmetic that ignores how firms react, and a peer-reviewed Management Science model shows that once manufacturers adjust new-product prices and durability, right-to-repair can produce a 'lose-lose-lose' outcome — and for networked safety-critical systems like cars, regulators flagged genuine cyber-tampering risk.",
    "So the honest debate isn't 'is repair good or bad' but 'how do you scope it' — the consumer and e-waste case is strong for ordinary electronics where the FTC found no safety basis for restrictions, while the real fight is whether a blanket mandate creates new risks in cars and medical devices that need carved-out security standards.",
  ],
  last_updated: "2026-06-16",
  tags: ["right-to-repair", "consumer-protection", "antitrust", "e-waste", "cybersecurity"],
  pillars: [
    {
      id: "consumer-benefit",
      title: "Consumer Benefit",
      short_summary:
        "Repair restrictions raise the cost of ownership; advocates estimate large household savings, but manufacturers' strategic price responses can erode them.",
      icon_name: "Users" as const,
      skeptic_premise:
        "The headline savings figures come from advocacy groups using simple replace-vs-repair arithmetic that ignores how firms react. A peer-reviewed Management Science model shows that once manufacturers respond strategically, right-to-repair can produce a 'lose-lose-lose' outcome: for premium goods, longer-lived products let firms raise new-product prices, cutting consumer surplus, while cheaper goods get flooded into the market and discarded. The net effect on the average consumer is theoretically ambiguous and can be negative.",
      proponent_rebuttal:
        "Repair monopolies are a real, measured cost: the US FTC's 2021 report to Congress found manufacturers restrict repair 'in numerous ways' and that those restrictions are 'not supported by the record.' Independent and self-repair are routinely far cheaper than authorized service, and even conservative bottom-up estimates put household savings in the hundreds of dollars per year. The Management Science result is a model of one possible equilibrium, not an empirical finding that consumers lose in practice.",
      crux: {
        id: "net-consumer-surplus",
        title: "Net Consumer Surplus After Firm Response",
        description:
          "Does the average consumer end up better off once manufacturers adjust new-product prices, parts pricing, and product durability in response to a right-to-repair mandate?",
        methodology:
          "Use natural experiments from staggered state laws (e.g., New York 2023, Minnesota, California 2024) and the Massachusetts auto law to compare device prices, repair prices, replacement frequency, and total cost of ownership before vs. after enactment, against control states. Difference-in-differences on retail and repair-cost panel data.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$300K (multi-state panel data analysis)",
        falsification: {
          supporter_flip:
            "If difference-in-differences on states that enacted right-to-repair (New York 2023, Minnesota, California 2024) showed device prices rising and total cost of ownership flat or higher relative to control states once firms adjusted — the predicted 'lose-lose-lose' equilibrium — the household-savings case would collapse from 'hundreds of dollars saved' to 'no measurable consumer benefit.'",
          skeptic_flip:
            "A skeptic leaning on the Management Science model should weigh that it is one theoretical equilibrium, not a measurement, and that an independent regulator (the FTC) found repair restrictions raise costs with 'scant evidence' of offsetting justification — so the burden is on showing the strategic-pricing harm actually dominates in the real data.",
          common_ground:
            "Both sides agree repair monopolies impose a real cost on consumers and that manufacturers will respond strategically to a mandate; the dispute is the sign and size of the net effect.",
          live_disagreement:
            "Whether the average consumer's total cost of ownership falls or rises after firms re-optimize prices, parts pricing, and durability — resolvable only by post-enactment retail/repair panel data against control states, which does not yet span enough years.",
        },
      },
      evidence: [
        {
          id: "pirg-savings",
          title: "Repair Could Save US Households ~$330/yr",
          description:
            "US PIRG's 'Repair Saves Families Big' analysis estimates that repairing rather than replacing four common device categories (smartphones, laptops, refrigerators, washing machines) would cut average household ownership cost by about $330/yr (~22%), or roughly $40 billion nationally.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 6,
            directness: 8,
          },
          source:
            "US PIRG Education Fund, 'Repair Saves Families Big' (2021)",
          sourceUrl: "https://pirg.org/resources/repair-saves-families-big/",
          reasoning:
            "Directly on point and methodology is transparent (replacement cost / lifespan vs. repair-extended lifespan), but PIRG is an advocacy organization (low independence) and the estimate assumes repairs are available and cost-effective, ignoring manufacturer price responses. Critics (e.g., CEI) dispute the magnitude. Moderate-to-low weights reflect this.",
        },
        {
          id: "ftc-no-justification",
          title: "FTC: Repair Restrictions 'Not Supported by the Record'",
          description:
            "The FTC's 2021 report to Congress, 'Nixing the Fix,' concluded after a public record and workshop that manufacturers limit repair in numerous ways and that 'there is scant evidence to support manufacturers' justifications for repair restrictions.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "US Federal Trade Commission, 'Nixing the Fix: An FTC Report to Congress on Repair Restrictions' (May 2021)",
          sourceUrl:
            "https://www.ftc.gov/reports/nixing-fix-ftc-report-congress-repair-restrictions",
          reasoning:
            "An independent federal agency reviewing an adversarial public record found manufacturers' anti-repair justifications largely unsupported, and the FTC voted unanimously to step up enforcement. High reliability and independence. Directness is strong on the 'consumers are harmed by restrictions' claim; replicability is moderate because it is a policy assessment, not a controlled study.",
        },
      ],
    },
    {
      id: "innovation-impact",
      title: "Impact on Innovation",
      short_summary:
        "Manufacturers warn that forced parts/IP access dulls incentives to innovate; the strongest counter-evidence is that firms have complied while still innovating.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "Repair mandates can force disclosure of proprietary diagnostics, firmware, and parts, weakening the intellectual-property and after-sales-service advantages that fund R&D. Industry analyses (e.g., the National Association of Manufacturers) argue compelled access raises rivals' costs of doing business, invites counterfeit and substandard parts, and reduces the return on investing in tightly integrated, hard-to-copy designs.",
      proponent_rebuttal:
        "The natural experiment has already run: Apple, a long-time opponent, formally backed California's SB 244 in 2023 and now runs a Self Service Repair program while continuing to ship new products and features — evidence that repair access and innovation coexist. A formal microeconomic model in the Journal of Regulatory Economics finds right-to-repair primarily 'raises rivals' costs' for incumbents seeking to monopolize service, and that under plausible conditions it raises social welfare rather than suppressing innovation.",
      crux: {
        id: "innovation-after-mandate",
        title: "Do R&D and Product Quality Fall After a Mandate?",
        description:
          "Following a binding right-to-repair law, do affected manufacturers measurably reduce R&D spending, patenting, or new-product introduction relative to comparable unaffected firms?",
        methodology:
          "Event study around the EU repair rules and US state laws: track firm-level R&D intensity, patent filings, and product-release cadence for covered vs. uncovered product lines, controlling for sector trends.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$150K (firm-level R&D / patent panel analysis)",
        falsification: {
          supporter_flip:
            "If an event study around the EU repair rules and US state laws showed covered manufacturers measurably cutting R&D intensity, patent filings, or new-product cadence relative to comparable unaffected firms, the 'repair and innovation coexist' claim would fail and the industry's incentive-dulling warning would be vindicated.",
          skeptic_flip:
            "A skeptic citing the trade association's harm argument should weigh that Apple — a long-time opponent — formally backed California SB 244 and now runs a Self Service Repair program while still shipping new products and features, which is revealed-preference evidence that a leading innovator judged it can live with a mandate.",
          common_ground:
            "Both sides agree that compelled access to parts, tools, and proprietary information changes manufacturers' incentives at the margin; the dispute is whether that change is large enough to depress actual innovation output.",
          live_disagreement:
            "Whether binding right-to-repair laws produce a detectable drop in firm-level R&D, patenting, or product introduction versus controls — answerable by a firm-level R&D/patent panel around the EU and US state enactments, which has not yet been run.",
        },
      },
      evidence: [
        {
          id: "apple-sb244",
          title: "Apple Backed CA Right-to-Repair After Opposing It",
          description:
            "In August 2023 Apple sent a letter supporting California SB 244, saying the bill 'strikes the right balance' between consumer choice and protecting privacy, data security, and manufacturers' IP — a reversal after years of opposition, and consistent with continuing to innovate while providing repair access via its Self Service Repair program.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Apple letter to Sen. Eggman supporting CA SB 244; reported by CNBC and EFF (Aug 2023)",
          sourceUrl:
            "https://www.eff.org/deeplinks/2023/08/apple-long-critic-right-repair-comes-out-support-california-bill",
          reasoning:
            "A leading innovator concluding it can live with a repair mandate is meaningful real-world evidence that the law need not kill innovation. But it is one firm's revealed preference under public pressure (not independent measurement of R&D effects), and Apple supported a specific bill with IP/security carve-outs — so directness and replicability are moderate.",
        },
        {
          id: "regulatory-econ-raising-rivals-costs",
          title: "Model: RTR Can Raise Welfare, Not Just Suppress It",
          description:
            "A 2025 Journal of Regulatory Economics paper, 'Raising rivals' costs and right to repair laws,' models RTR as primarily countering incumbents' attempts to monopolize aftermarket service and finds conditions under which it raises social welfare rather than chilling innovation.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Dortz & Wagner, 'Raising rivals' costs and right to repair laws: Separating the sheep from the goats?,' Journal of Regulatory Economics (2025)",
          sourceUrl: "https://link.springer.com/article/10.1007/s11149-025-09490-z",
          reasoning:
            "Peer-reviewed economic modeling that pushes back on the 'innovation will collapse' narrative. Directness and replicability are moderate because it is an analytical model with assumption-dependent conclusions, not empirical estimation of innovation outcomes.",
        },
        {
          id: "nam-economic-downsides",
          title: "Industry: Forced Access Imposes Economic Costs",
          description:
            "The National Association of Manufacturers' 2023 paper 'The Economic Downsides of Right-to-Repair' argues mandated access to parts, tools, and proprietary information raises manufacturers' costs, exposes IP, and risks unsafe counterfeit parts entering the repair stream.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 2,
            replicability: 4,
            directness: 6,
          },
          source:
            "National Association of Manufacturers, 'The Economic Downsides of \"Right-to-Repair\"' (Dec 2023)",
          sourceUrl:
            "https://documents.nam.org/COMM/NAM-3740-Right%20to%20Repair%20Paper%20R4%20V1%20FIN.pdf",
          reasoning:
            "Articulates the strongest version of the innovation-harm argument, but the author is the manufacturers' trade association — a directly conflicted party (very low independence) presenting argument rather than independent measurement. Included to steelman the 'against' side, weighted low accordingly.",
        },
      ],
    },
    {
      id: "safety-cybersecurity",
      title: "Safety & Cybersecurity",
      short_summary:
        "The sharpest real risk is connected/safety-critical systems (cars, medical devices); for ordinary electronics regulators found no evidence independent repair is less safe.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "For safety-critical, networked products the risk is concrete. On Massachusetts' 2020 auto telematics law, NHTSA warned that requiring 'remote, real-time, bi-directional' access to vehicle systems and a standardized open interface would force removal of access controls and increase the attack surface for remote tampering with safety-critical functions. Medical-device makers raise parallel patient-safety and FDA-compliance concerns. A poorly bounded mandate could trade consumer savings for new physical and cyber risk.",
      proponent_rebuttal:
        "For the vast majority of consumer electronics, the safety/security objection is unsupported: the FTC found 'no empirical evidence' that independent repair shops are more likely than authorized shops to compromise or misuse customer data, and that with proper parts and information they are equally able to manage cybersecurity. The car and medical-device concerns are real but are arguments for carefully scoped rules and security standards on safety-critical systems — not against right-to-repair as a category.",
      crux: {
        id: "scope-vs-blanket",
        title: "Scoped Safety Carve-Outs vs. Blanket Mandate",
        description:
          "Is the safety/cybersecurity risk inherent to right-to-repair, or is it confined to safety-critical networked systems and solvable with scoped standards while general electronics repair stays low-risk?",
        methodology:
          "Compare incident data (data breaches, safety failures) from jurisdictions/products with repair access vs. without; assess whether laws with safety carve-outs (medical, vehicle cybersecurity standards) show different risk profiles than blanket laws.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$200K (incident-data and statutory comparison)",
        falsification: {
          supporter_flip:
            "If incident data showed jurisdictions or product categories with repair access suffering materially more data breaches or safety failures than those without — even for ordinary, non-networked electronics — the FTC's 'no empirical evidence' finding would be overturned and the blanket-risk objection would gain real support.",
          skeptic_flip:
            "A skeptic warning of cyber risk should weigh that the FTC found 'no empirical evidence' independent shops are less secure for general consumer devices, and that NHTSA's concern was specifically about one aggressive auto-telematics provision forcing open standardized access — not about repair access as a category.",
          common_ground:
            "Both sides agree the sharpest, concrete risk is concentrated in networked, safety-critical systems (vehicles, medical devices), and that general consumer-electronics repair is comparatively low-risk.",
          live_disagreement:
            "Whether scoped safety carve-outs and security standards fully neutralize the risk while leaving general repair open — or whether the risk is inherent to broad mandates — resolvable by comparing incident profiles of laws with carve-outs against blanket laws.",
        },
      },
      evidence: [
        {
          id: "ftc-no-cyber-evidence",
          title: "FTC: No Evidence Independent Repair Is Less Secure",
          description:
            "The FTC's 'Nixing the Fix' report concluded: 'The record contains no empirical evidence to suggest that independent repair shops are more or less likely than authorized repair shops to compromise or misuse customer data,' and that with appropriate parts and information they are equally capable of minimizing cybersecurity risks.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 9,
          },
          source:
            "US FTC, 'Nixing the Fix: An FTC Report to Congress on Repair Restrictions' (May 2021)",
          sourceUrl:
            "https://www.ftc.gov/reports/nixing-fix-ftc-report-congress-repair-restrictions",
          reasoning:
            "An independent federal regulator explicitly examined and rejected the cybersecurity-harm argument for general consumer devices after taking record evidence from manufacturers. Very directly addresses the 'without harming safety' clause. Replicability is moderate because it is a record-based finding rather than a controlled study.",
        },
        {
          id: "nhtsa-telematics-cyber",
          title: "NHTSA: Auto Telematics Mandate Raises Cyber/Safety Risk",
          description:
            "In a July 2020 letter on Massachusetts Question 1, NHTSA warned the measure would force manufacturers to provide standardized 'remote, real-time, bi-directional' access to safety-critical vehicle systems, that this 'increases the scale of risks' of a successful cyberattack, and could require removing access controls — raising the risk of remote tampering with vehicles.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "NHTSA (Deputy Administrator J. Owens) letter to MA Joint Committee, July 20, 2020; reported by The Boston Globe and Ballotpedia",
          sourceUrl:
            "https://ballotpedia.org/Massachusetts_Question_1,_%22Right_to_Repair_Law%22_Vehicle_Data_Access_Requirement_Initiative_(2020)",
          reasoning:
            "A safety regulator identifying a concrete mechanism (forced open, standardized access to safety-critical systems) by which a specific repair mandate could raise cyber/physical risk. It is real and authoritative, but is about one aggressive telematics provision, not repair access generally, and NHTSA's stance was itself politically contested. Solid but bounded weight.",
        },
      ],
    },
  ],
};
