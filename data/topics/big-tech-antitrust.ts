import type { Topic } from "@/lib/schemas/topic";

export const bigTechAntitrustData = {
  id: "big-tech-antitrust",
  title: "Breaking Up Big Tech",
  meta_claim:
    "Major technology companies (Google, Apple, Amazon, Meta) should be broken up or heavily regulated to restore competition and protect consumers.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "A federal judge ruled in 2024 that Google is an illegal monopolist — it holds ~90% of search and paid ~$26B in a single year for default placement. The hard part isn't proving dominance; it's that the products are free, so the price-based antitrust framework built for Standard Oil struggles to show 'consumer harm.'",
    confidence: 85,
    source:
      "US v. Google LLC ruling (D.D.C., Aug. 2024); DOJ Antitrust Division; market-share data (Statcounter)",
    sourceUrl:
      "https://www.justice.gov/atr/case/us-and-plaintiff-states-v-google-llc-2020",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The dominance isn't really in dispute: Google holds about 90% of search, Apple and Google together run ~99% of mobile operating systems, and in 2024 a federal judge ruled Google an illegal monopolist that paid ~$26B in one year just to stay the default.",
    "The genuinely hard problem is that these products are free or cheap and genuinely loved — so the century-old antitrust test, which asks 'are prices too high?', barely applies, and you have to argue harm in terms of privacy, lost innovation, and acquired-then-killed rivals instead.",
    "So the honest debate isn't 'are these companies dominant?' (a court says yes) but whether breaking them up would help consumers who like the integrated, free products — or just destroy value while a new framework for 'consumer harm' in zero-price markets is still being invented.",
  ],
  pillars: [
    {
      id: "market-power-competition",
      title: "Market Power & Competition",
      short_summary:
        "Google holds 90% of search, Apple and Google split mobile OS, Amazon handles 40% of e-commerce. Standard Oil had less market share when it was broken up.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Big tech companies got big by building products people love. Network effects are natural, not anti-competitive. Breaking them up would destroy value and convenience for consumers who benefit from integrated ecosystems — choice-experiment estimates put the willingness-to-accept for giving up a free search engine alone at roughly $17,500/year per user. Europe's conduct-based regulation (the DMA) has changed gatekeeper behavior at the margins but has not produced European tech champions, and its early competitive effects look modest.",
      proponent_rebuttal:
        "Google controls roughly 90% of search, Apple and Google together control about 99% of mobile OS, Amazon is both the marketplace and a competitor selling on it. This is textbook monopoly power. There is a documented pattern of incumbents acquiring nascent rivals (Instagram, WhatsApp, Waze), and the 'kill zone' research strand argues such acquisitions can chill venture funding and entry in adjacent segments — though that empirical claim is genuinely contested. The DOJ's antitrust case against Google established it paid about $26B in 2021 to lock in default-search placement — a moat bought with monopoly profits, not organic preference.",
      crux: {
        id: "consumer-harm-measurement",
        title: "Measuring Consumer Harm in Zero-Price Markets",
        description:
          "Determining whether consumers are harmed by tech monopolies when the services are free, requiring new frameworks beyond the traditional price-based antitrust analysis.",
        methodology:
          "Develop and apply a quality-adjusted consumer welfare metric that accounts for privacy loss, reduced innovation, attention extraction, and forgone alternatives. Compare actual market outcomes with counterfactual competitive markets.",
        equation:
          "\\text{Consumer Harm} = \\sum (\\text{Privacy Loss} + \\text{Innovation Deficit} + \\text{Attention Tax}) - \\text{Free Service Value}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Economic modeling and empirical market analysis)",
        falsification: {
          supporter_flip:
            "If a rigorous quality-adjusted welfare measure found consumers are actually better off under the integrated free incumbents than they'd be in a fragmented competitive market — once you net privacy, innovation, and convenience — the case for breakup would weaken to 'dominant but not harmful.'",
          skeptic_flip:
            "A skeptic who says free = no harm should weigh that 'free' hides the price paid in data and attention, that a court found Google bought its dominance with $26B in default deals rather than winning purely on merit, and that acquired-then-shelved rivals are innovation consumers never got.",
          common_ground:
            "Both sides agree these products are dominant and largely free at the point of use, and that the traditional price-based antitrust test fits zero-price markets poorly.",
          live_disagreement:
            "Whether consumers are net harmed in free markets once privacy loss, suppressed innovation, and attention extraction are weighed against the genuine value of the free service — which no agreed welfare metric yet measures.",
        },
      },
      evidence: [
        {
          id: "doj-google-monopoly",
          title: "DOJ v. Google: Court Finds Illegal Monopoly",
          description:
            "On August 5, 2024, Judge Amit Mehta (U.S. District Court, D.C.) ruled that Google is a monopolist that illegally maintained its monopoly in general search services and general search text advertising. The court found Google paid $26.3 billion in 2021 alone for default-search placement. The opinion notes Google holds roughly 89.2% of the general search market (and ~94.9% on mobile).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 10,
          },
          source:
            "U.S. v. Google LLC, No. 1:20-cv-03010-APM, Memorandum Opinion (D.D.C. Aug. 5, 2024), Judge Amit P. Mehta",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1033.0_2.pdf",
          reasoning:
            "A federal court ruling after extensive trial is among the most authoritative forms of evidence. Directly establishes illegal monopoly maintenance.",
        },
        {
          id: "startup-formation-decline",
          title: "Tech Startup Formation Has Declined as Big Tech Grew",
          description:
            "The 'kill zone' hypothesis holds that VC investors avoid funding startups in segments adjacent to a Big Tech platform's products. Kamepalli, Rajan & Zingales (NBER w27146) model and find evidence that acquisitions by Google/Facebook reduced VC funding and entry in the target's space. The effect is genuinely contested: other panel studies (e.g. Prado & Bauer 2022) find small positive average effects of big-tech acquisitions on VC activity. Acquisitions of nascent rivals (Instagram, WhatsApp, Waze) are a documented pattern.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source:
            "Kamepalli, Rajan & Zingales, 'Kill Zone,' NBER Working Paper 27146 (rev. 2020)",
          sourceUrl: "https://www.nber.org/papers/w27146",
          reasoning:
            "The 'kill zone' is a real research strand but findings are mixed — some studies find the opposite sign. Removed the unsourced '40% decline 2010-2022' figure and de-inflated replicability/directness to reflect genuine empirical contestation.",
        },
        {
          id: "eu-dma-early-results",
          title: "EU Digital Markets Act Shows Early Regulatory Impact",
          description:
            "Under the EU's Digital Markets Act, designated gatekeepers had to change conduct from March 2024: Apple enabled third-party app marketplaces and sideloading (iOS 17.4) and alternative payment options, and Google adjusted Search/Android self-preferencing. The DMA is a behavioral/conduct regime — it did not order structural separation of Amazon's marketplace and retail. Early effects on alternative app-store and third-party-payment adoption appear modest, and several gatekeepers face ongoing non-compliance investigations.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 5,
          },
          source: "European Commission — Digital Markets Act (official portal)",
          sourceUrl: "https://digital-markets-act.ec.europa.eu/index_en",
          reasoning:
            "Real-world regulatory experiment with early, modest evidence. Corrected an inaccurate claim that the DMA forced Amazon to split marketplace and retail (it did not); the DMA is conduct regulation, not structural break-up. Directness lowered accordingly.",
        },
        {
          id: "consumer-surplus-integration",
          title: "Platform Integration Creates Substantial Consumer Value",
          description:
            "Online choice-experiment estimates of willingness-to-accept losing free digital services are large: Brynjolfsson et al. (PNAS 2019) found the median U.S. user would need ~$17,500/year to give up search engines, ~$8,400 for email, and ~$3,500 for digital maps. These are per-service WTA figures (not a single combined Google-ecosystem surplus), and the method is debated. The broader point — integrated free services create substantial consumer value — supports caution about break-up.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Brynjolfsson, Collis & Eggers, 'Using massive online choice experiments to measure changes in well-being,' PNAS 116(15), 7250-7255 (2019)",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.1815663116",
          reasoning:
            "Corrected the figure: the cited ~$17.5K is willingness-to-accept for search engines alone, not a combined $15-20K Google-ecosystem surplus per user. WTA estimates are methodologically contested. Removed the unsourced ACSI/Apple claim from the headline number.",
        },
      ],
    },
    {
      id: "data-privacy-democracy",
      title: "Data Privacy & Democracy",
      short_summary:
        "Five companies know more about you than your government does -- your location, purchases, messages, and browsing history. None of them were elected.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Users voluntarily share data in exchange for free services — it's a fair trade. Regulation creates compliance overhead that paradoxically favors incumbents over smaller competitors. Self-regulation and market pressure are already working: Apple's privacy pivot proves consumers can reward privacy-respecting companies.",
      proponent_rebuttal:
        "Surveillance capitalism monetizes personal data without meaningful consent — 'agree to all cookies' is not informed choice. Platform algorithms amplify outrage and division because engagement equals revenue. Political ad micro-targeting undermines democratic discourse by showing different realities to different voters. No individual can meaningfully opt out of the digital economy.",
      crux: {
        id: "informed-consent-data-economy",
        title: "Meaningful Consent in the Data Economy",
        description:
          "The average terms of service is 7,000 words. Nobody reads them. Can you consent to something you have never read?",
        methodology:
          "Survey users on their understanding of data practices, measure the time required to read all privacy policies encountered annually, and test whether informed users would change their behavior.",
        equation:
          "\\text{Consent Quality} = \\frac{\\text{User Understanding}}{\\text{Actual Data Use}} \\times P(\\text{behavior change if informed})",
        verification_status: "theoretical" as const,
        cost_to_verify: "$400K (Large-scale behavioral experiment)",
        falsification: {
          supporter_flip:
            "If experiments showed that fully-informed users — who actually understood the data practices — wouldn't change their behavior, the 'no meaningful consent' argument for regulation would weaken: people would be making an informed trade they're fine with.",
          skeptic_flip:
            "A skeptic who says it's a fair trade should weigh that no one can read the ~7,000-word policies they 'agree' to (reading every policy you encounter yearly would take weeks), and that you can't meaningfully opt out of the digital economy — so 'voluntary consent' is closer to fiction than to a fair trade.",
          common_ground:
            "Both sides agree users do receive real value from free services in exchange for their data.",
          live_disagreement:
            "Whether clicking 'agree' on unread terms is meaningful consent — and whether users who genuinely understood the data economy would change their behavior, which large behavioral experiments could test but mostly haven't.",
        },
      },
      evidence: [
        {
          id: "surveillance-capitalism-analysis",
          title: "Zuboff: Surveillance Capitalism Extracts Behavioral Surplus",
          description:
            "Shoshana Zuboff's analysis documents how tech companies systematically extract 'behavioral surplus' — data beyond what's needed to improve services — to predict and modify human behavior for advertisers. This creates an unprecedented asymmetry of knowledge and power.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Shoshana Zuboff, 'The Age of Surveillance Capitalism' (PublicAffairs, 2019); see also 'Big Other,' Journal of Information Technology 30(1), 75-89 (2015). Zuboff is Professor Emerita, Harvard Business School.",
          sourceUrl: "https://doi.org/10.1057/jit.2015.5",
          reasoning:
            "Influential academic framework from a credible scholar (HBS Professor Emerita). The peer-reviewed 'Big Other' (2015) underpins the popular 2019 book. Theoretical/critical rather than empirical, so weights kept moderate.",
        },
        {
          id: "cambridge-analytica-investigation",
          title: "Cambridge Analytica Exposed Data Misuse at Scale",
          description:
            "The 2018 Cambridge Analytica scandal revealed that Facebook allowed a third-party app to harvest data from 87 million users without consent, which was then used for political micro-targeting. Facebook was fined $5 billion by the FTC — the largest privacy fine in history at the time.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source:
            "FTC press release, 'FTC Imposes $5 Billion Penalty and Sweeping New Privacy Restrictions on Facebook' (July 24, 2019); UK Information Commissioner's Office",
          sourceUrl:
            "https://www.ftc.gov/news-events/news/press-releases/2019/07/ftc-imposes-5-billion-penalty-sweeping-new-privacy-restrictions-facebook",
          reasoning:
            "Well-documented, multi-jurisdictional investigation with regulatory findings. The $5B FTC penalty and the ~87 million-user figure are both confirmed in official sources.",
        },
        {
          id: "apple-privacy-pivot",
          title: "Apple's Privacy Pivot Shows Market Self-Correction",
          description:
            "Apple's App Tracking Transparency (ATT), enforced from April 2021 (iOS 14.5), required apps to ask before tracking users across other apps. Flurry Analytics measured that ~96% of U.S. users left tracking off (only ~4% opted in). Meta itself estimated Apple's iOS changes would reduce its 2022 sales by roughly $10 billion. This is cited as evidence that consumer choice can protect privacy without structural intervention.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "Flurry Analytics (May 2021 ATT opt-in data); Meta Q4 2021 earnings guidance (~$10B 2022 estimate, reported by CNBC)",
          sourceUrl: "https://www.flurry.com/blog/att-opt-in-rate-monthly-updates/",
          reasoning:
            "Corrected source attribution from 'Lotame' to Flurry Analytics (the actual source of the 96% figure). The $10B is Meta's own projection of the 2022 revenue hit, not a measured annual loss. Independence lowered: Apple has competitive motives, and Meta's estimate is self-reported.",
        },
        {
          id: "gdpr-compliance-cost-disparity",
          title: "GDPR Compliance Costs Disproportionately Burden Small Companies",
          description:
            "Peer-reviewed evidence finds GDPR increased market concentration: Johnson, Shriver & Goldberg (Management Science 2023) show websites' use of web-technology vendors fell ~15% after enforcement, while vendor-market concentration rose ~17%, with Google- and Facebook-owned vendors gaining relative share. Compliance costs are also high in absolute terms — a 2017 PwC survey found 88% of large firms spent over $1M and 40% over $10M — a burden that falls hardest on smaller firms as a share of revenue.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Johnson, Shriver & Goldberg, 'Privacy and Market Concentration: Intended and Unintended Consequences of the GDPR,' Management Science 69(10), 5695-5721 (2023); PwC GDPR Readiness Survey (2017)",
          sourceUrl: "https://doi.org/10.1287/mnsc.2023.4709",
          reasoning:
            "Replaced unverified per-firm cost figures ($1.3M / $150K, attributed to DataGrail/IAPP, which I could not confirm) with a peer-reviewed Management Science study directly documenting GDPR-driven concentration toward Google/Facebook, plus the PwC large-firm cost survey. Reliability/independence raised because the core claim is now anchored to peer-reviewed work.",
        },
      ],
    },
  ],
};
