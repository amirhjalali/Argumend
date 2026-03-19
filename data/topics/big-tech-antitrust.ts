import type { Topic } from "@/lib/schemas/topic";

export const bigTechAntitrustData = {
  id: "big-tech-antitrust",
  title: "Breaking Up Big Tech",
  meta_claim:
    "Major technology companies (Google, Apple, Amazon, Meta) should be broken up or heavily regulated to restore competition and protect consumers.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "market-power-competition",
      title: "Market Power & Competition",
      short_summary:
        "Google holds 90% of search, Apple and Google split mobile OS, Amazon handles 40% of e-commerce. Standard Oil had less market share when it was broken up.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Big tech companies got big by building products people love. Network effects are natural, not anti-competitive. Breaking them up would destroy value and convenience for consumers who benefit from integrated ecosystems. European regulation hasn't produced European tech champions — it has just added bureaucracy.",
      proponent_rebuttal:
        "Google controls 90%+ of search, Apple and Google control 99% of mobile OS, Amazon is both the marketplace and the competitor on it. This is textbook monopoly power. Startup formation has declined as incumbents acquire or copy every competitive threat. The DOJ's antitrust case against Google found it paid $26B annually to maintain its search default — that's not organic preference, it's a moat bought with monopoly profits.",
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
      },
      evidence: [
        {
          id: "doj-google-monopoly",
          title: "DOJ v. Google: Court Finds Illegal Monopoly",
          description:
            "In August 2024, a federal judge ruled that Google illegally maintained a monopoly in search and search advertising. The court found Google paid $26.3 billion in 2021 alone to be the default search engine, foreclosing competition. Google controls 89.2% of general search and 94.9% on mobile.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 10,
          },
          source: "U.S. District Court, DOJ Antitrust Division",
          reasoning:
            "A federal court ruling after extensive trial is among the most authoritative forms of evidence. Directly establishes illegal monopoly maintenance.",
        },
        {
          id: "startup-formation-decline",
          title: "Tech Startup Formation Has Declined as Big Tech Grew",
          description:
            "Research shows venture capital investment in startups competing with Big Tech's core businesses declined by 40% between 2010-2022. The 'kill zone' effect — where investors avoid funding companies that compete with platform giants — is well documented. Acquisition of nascent competitors (Instagram, WhatsApp, Waze) removes future competition.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "National Bureau of Economic Research, Stigler Center",
          reasoning:
            "Multiple independent sources document the investment decline, though causation versus correlation is debated.",
        },
        {
          id: "eu-dma-early-results",
          title: "EU Digital Markets Act Shows Early Regulatory Impact",
          description:
            "The EU's Digital Markets Act (2024) forced Apple to allow sideloading, Google to unbundle search from Android, and Amazon to separate marketplace and retail divisions in Europe. Early data shows modest increases in alternative app store usage and third-party payment adoption.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "European Commission, DMA compliance reports",
          reasoning:
            "Real-world regulatory experiment providing early evidence that structural intervention can open markets, though long-term effects are uncertain.",
        },
        {
          id: "consumer-surplus-integration",
          title: "Platform Integration Creates Substantial Consumer Value",
          description:
            "Estimates suggest Google's free services (Search, Maps, Gmail, YouTube) generate $15,000-$20,000 in annual consumer surplus per user. Apple's integrated ecosystem (hardware, software, services) consistently scores highest in customer satisfaction. Breaking up these ecosystems would destroy the integration that consumers value.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "Brynjolfsson et al., MIT; American Customer Satisfaction Index",
          reasoning:
            "Consumer surplus estimates are methodologically contested, and partly funded by industry. But the directness of the consumer value argument is clear.",
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
          source: "Shoshana Zuboff, Harvard Business School",
          reasoning:
            "Influential academic framework from a credible institution. Somewhat theoretical but grounded in extensive documentation of industry practices.",
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
          source: "FTC, UK Information Commissioner's Office, Senate Intelligence Committee",
          reasoning:
            "Well-documented, multi-jurisdictional investigation with regulatory findings. Directly demonstrates data misuse and democratic manipulation.",
        },
        {
          id: "apple-privacy-pivot",
          title: "Apple's Privacy Pivot Shows Market Self-Correction",
          description:
            "Apple's App Tracking Transparency (ATT) feature, launched in 2021, allowed users to opt out of cross-app tracking. 96% of US users opted out, costing Meta an estimated $10B in annual revenue. This demonstrates that market competition and consumer choice can protect privacy without government intervention.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Apple, Lotame, Financial Times analysis",
          reasoning:
            "Compelling example of market-driven privacy protection. Independence somewhat limited because Apple has its own competitive motives for restricting competitors' data access.",
        },
        {
          id: "gdpr-compliance-cost-disparity",
          title: "GDPR Compliance Costs Disproportionately Burden Small Companies",
          description:
            "Studies show GDPR compliance costs averaged $1.3M for large companies but $150K for small companies — a far larger burden as a percentage of revenue. Google and Facebook's EU market share actually increased post-GDPR as smaller competitors struggled with compliance overhead.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "DataGrail, IAPP (International Association of Privacy Professionals)",
          reasoning:
            "Credible data on the unintended consequences of regulation. Directly relevant to whether antitrust regulation could backfire.",
        },
      ],
    },
  ],
};
