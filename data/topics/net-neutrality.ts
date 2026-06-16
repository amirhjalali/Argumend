import type { Topic } from "@/lib/schemas/topic";

export const netNeutralityData = {
  id: "net-neutrality",
  title: "Net Neutrality",
  meta_claim:
    "Net-neutrality regulation is necessary to protect an open, competitive internet.",
  status: "contested" as const,
  category: "technology" as const,
  last_updated: "2026-06-16",
  tags: ["net-neutrality", "broadband", "fcc", "internet", "regulation"],
  pillars: [
    {
      id: "isp-behavior",
      title: "ISP Behavior Without Rules",
      short_summary:
        "Whether broadband providers actually block, throttle, or discriminate against traffic when no neutrality rules constrain them.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The 'open internet' is not actually under threat, so prophylactic common-carrier regulation solves a hypothetical problem. The documented violations are a short list spread over two decades, most were resolved by public pressure, FTC competition law, or transparency rules rather than Title II, and several involved legitimate network-management or business-model disputes. Heavy ex-ante regulation imposes real compliance costs to guard against abuses that competition and antitrust already deter.",
      proponent_rebuttal:
        "ISPs have repeatedly blocked or degraded lawful traffic when they had the incentive and no enforceable rule stopped them: Madison River blocked Vonage VoIP (2005), Comcast secretly throttled BitTorrent (FCC found a violation in 2008), AT&T blocked FaceTime on cheaper plans (2012), and multiple ISPs let Netflix interconnection congest in 2013-2014. Broadband is highly concentrated — many Americans have one or two wireline options — so market discipline is weak and clear, enforceable rules are the reliable backstop.",
      crux: {
        id: "violation-frequency",
        title: "Do Violations Recur Without Enforceable Rules?",
        description:
          "The load-bearing disagreement is whether documented blocking/throttling reflects a structural incentive that recurs whenever rules lapse, or a handful of one-off episodes already deterred by competition and antitrust.",
        methodology:
          "Build a longitudinal catalog of confirmed traffic-discrimination incidents, tag each by (1) whether a binding rule was in force, (2) how it was resolved (regulation, FTC/antitrust, public pressure), and (3) market concentration in the affected area. Compare incident rates across regulated vs. deregulated periods (2015-2017 vs. before/after).",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (public FCC/court records analysis)",
      },
      evidence: [
        {
          id: "comcast-bittorrent-order",
          title: "FCC Found Comcast Secretly Throttled BitTorrent",
          description:
            "In its 2008 Memorandum Opinion and Order (FCC 08-183), the FCC found Comcast had selectively blocked/degraded peer-to-peer traffic without disclosure and ordered it to stop. A concrete, officially adjudicated case of an ISP discriminating against lawful traffic.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "FCC Memorandum Opinion and Order, FCC 08-183 (Aug. 20, 2008), Formal Complaint of Free Press and Public Knowledge Against Comcast",
          sourceUrl:
            "https://www.fcc.gov/document/formal-complaint-free-press-and-public-knowledge-broadband-industry",
          reasoning:
            "Official agency adjudication with a documented factual record. Directness is tempered because the D.C. Circuit later (Comcast v. FCC, 2010) vacated the order on jurisdictional grounds — the throttling finding stands, but it shows rules' fragility as much as their necessity.",
        },
        {
          id: "violation-history",
          title: "Multiple Documented Blocking/Throttling Episodes",
          description:
            "Beyond Comcast: Madison River blocked Vonage VoIP (2005, FCC consent decree); AT&T disabled FaceTime unless users bought pricier plans (2012); and ISPs let Netflix interconnection congest until paid-peering deals were struck (2013-2014). A recurring pattern across providers.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source:
            "Free Press, 'Net Neutrality Violations: A History of Abuse'; corroborated by contemporaneous FCC filings and reporting (TechCrunch, NBC News)",
          sourceUrl:
            "https://www.freepress.net/blog/net-neutrality-violations-history-abuse",
          reasoning:
            "Free Press is a pro-regulation advocate, so source reliability/independence are discounted — but the underlying incidents (Madison River consent decree, AT&T FaceTime, Netflix peering) are independently documented and not seriously disputed.",
        },
        {
          id: "competition-law-alternative",
          title: "Other Countries Police Broadband Without Ex-Ante Rules",
          description:
            "Australia and New Zealand rely on ex-post competition law rather than common-carrier net-neutrality rules, and the US FTC policed broadband under competition/consumer-protection law except during 2015-2017 — suggesting antitrust and transparency can substitute for prophylactic regulation.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Garrett, Setenareski, Peres, Bona & Duarte Jr., 'A survey of Network Neutrality regulations worldwide', Computer Law & Security Review (2022)",
          sourceUrl:
            "https://www.sciencedirect.com/science/article/pii/S0267364922000024",
          reasoning:
            "Descriptive comparative work showing viable alternatives, but it does not establish that competition law produces equally open outcomes; causal claims are weaker than the documented-violation record, hence moderate weights.",
        },
      ],
    },
    {
      id: "investment-effects",
      title: "Effect on Broadband Investment",
      short_summary:
        "Whether classifying ISPs as common carriers chills the capital investment needed to build and upgrade networks.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Treating broadband as a Title II utility deters network investment. A peer-reviewed OECD panel study finds net-neutrality rules cut new fiber investment by roughly 22-25%, and slower investment ultimately harms consumers far more than the rare blocking incident — undermining the very 'open, competitive internet' the regulation claims to protect. Regulatory uncertainty from repeated FCC reversals compounds the chilling effect.",
      proponent_rebuttal:
        "The investment-collapse claim is empirically contested. Aggregate ISP capital spending was about 5% higher in the two years after the 2015 Title II Open Internet Order than the two years before, with cable network and fiber-to-the-home investment rising sharply — and ISP executives told investors Title II was not constraining their buildout. The internet stayed open and investment continued; the predicted catastrophe did not materialize during the 2015-2017 rules.",
      crux: {
        id: "investment-counterfactual",
        title: "The Investment Counterfactual",
        description:
          "Both sides cite real capex figures; the disagreement is the counterfactual — what investment WOULD have been absent the rules — and which metric (aggregate spend vs. new fiber connections, nominal vs. inflation-adjusted) is the right denominator.",
        methodology:
          "Use difference-in-differences / instrumental-variable panel estimation across countries adopting rules at different times, isolating net-neutrality timing from macro conditions; cross-check against firm-level capex disclosures and investor calls in the US 2014-2018 window.",
        verification_status: "verified" as const,
        cost_to_verify: "$50K (econometric panel analysis)",
      },
      evidence: [
        {
          id: "oecd-fiber-study",
          title: "Peer-Reviewed Study: Rules Cut Fiber Investment ~22-25%",
          description:
            "Briglauer, Cambini, Gugler & Stocker (European Journal of Law and Economics, 2023) use a 32-country OECD panel (2000-2021) with instrumental-variable estimation and find net-neutrality regulations associated with a significant 22-25% decrease in new fiber investment.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "Briglauer, Cambini, Gugler & Stocker, 'Net neutrality and high-speed broadband networks: evidence from OECD countries', European Journal of Law and Economics (2023), DOI 10.1007/s10657-022-09754-5",
          sourceUrl: "https://doi.org/10.1007/s10657-022-09754-5",
          reasoning:
            "Peer-reviewed, IV identification, transparent OECD data — the strongest single causal estimate against the meta-claim. Discounted slightly because the authors explicitly disclaim measuring net welfare, and the magnitude depends on the instruments chosen.",
        },
        {
          id: "free-press-investment",
          title: "Aggregate Capex Rose After 2015 Title II Order",
          description:
            "Free Press's analysis of ISP financial disclosures found aggregate capital investment ~5% higher in the two years after the 2015 Open Internet Order than the two prior years, with cable physical-network investment up sharply — and executives telling investors Title II was not deterring buildout.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 6,
            directness: 7,
          },
          source:
            "S. Derek Turner / Free Press, 'It's Working: How the Internet Access and Online Video Markets Are Thriving in the Title II Era' (2017)",
          sourceUrl:
            "https://www.freepress.net/news/its-working-free-press-documents-historic-levels-investment-and-innovation-fccs-2015-open",
          reasoning:
            "Directly rebuts the investment-chill narrative using audited capex disclosures, but Free Press is a pro-regulation advocate and critics note the aggregate figures aren't inflation-adjusted and lack a counterfactual — hence low independence/reliability despite the underlying data being real.",
        },
      ],
    },
    {
      id: "legal-authority",
      title: "Legal Authority and Durability",
      short_summary:
        "Whether the FCC even has the statutory power to impose neutrality rules, and whether the internet stays open without them.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "After Loper Bright ended Chevron deference, the Sixth Circuit (Jan. 2025) held the FCC lacks authority to classify broadband as a Title II telecommunications service and set the 2024 order aside in full. If the strongest legal vehicle for net-neutrality rules is unlawful, and the internet has remained open under the resulting light-touch regime, then sweeping FCC regulation is neither necessary nor durable — Congress, not the agency, should decide.",
      proponent_rebuttal:
        "A court ruling on agency authority addresses who may write the rules, not whether open-internet protections are needed. The Sixth Circuit decided a statutory-interpretation question post-Loper Bright; it did not find that blocking and throttling are harmless. The same decision leaves open congressional action, and proponents argue the prior violations show that without an enforceable rule somewhere, the incentive to discriminate returns once scrutiny fades.",
      crux: {
        id: "open-without-rules",
        title: "Does the Internet Stay Open Without Federal Rules?",
        description:
          "The decisive question is empirical, not legal: across the deregulated 2018-2025 window, did measurable, harmful, non-transparent traffic discrimination increase — or did competition, transparency rules, and reputational pressure keep the internet effectively open?",
        methodology:
          "Monitor for confirmed blocking/throttling/paid-prioritization of lawful traffic during 2018-2025 using network-measurement tools (e.g., Wehe-style tests) and FTC/state-AG enforcement records; compare against the rules-in-force 2015-2017 baseline.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (public enforcement records + measurement data)",
      },
      evidence: [
        {
          id: "sixth-circuit-ruling",
          title: "Court: FCC Lacks Authority for Title II Net-Neutrality Rules",
          description:
            "In CTIA v. FCC (6th Cir., Jan. 2, 2025), a unanimous panel applied Loper Bright, held broadband is an 'information service' the FCC cannot regulate under Title II, and set aside the 2024 Safeguarding Order in full — leaving the light-touch framework in place.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "U.S. Court of Appeals for the Sixth Circuit, In re MCP No. 185 / CTIA v. FCC, No. 24-3508 (Jan. 2, 2025); summarized by Gibson Dunn",
          sourceUrl:
            "https://www.gibsondunn.com/sixth-circuit-strikes-down-fcc-net-neutrality-order/",
          reasoning:
            "A binding appellate ruling vacating the rules is strong evidence the regulation isn't legally durable. Directness is moderate: it speaks to FCC authority and statutory reading, not directly to whether open-internet protections are substantively warranted.",
        },
        {
          id: "broadband-concentration",
          title: "Limited Broadband Competition Weakens Market Discipline",
          description:
            "Many US households have only one or two wireline broadband providers at the higher speed tiers, per FCC deployment data — limited competition reduces the market pressure that would otherwise punish an ISP for blocking or throttling, strengthening the case for a rule-based backstop.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "FCC broadband deployment / National Broadband Map data on provider availability by location",
          sourceUrl: "https://broadbandmap.fcc.gov/",
          reasoning:
            "Government availability data is reliable and supports the structural argument that weak competition makes rules more necessary. Directness is moderate because availability counts don't by themselves prove discrimination would occur — they show why deterrents are weaker.",
        },
      ],
    },
  ],
};
