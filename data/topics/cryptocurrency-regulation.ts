import type { Topic } from "@/lib/schemas/topic";

export const cryptocurrencyRegulationData = {
  id: "cryptocurrency-regulation",
  title: "Cryptocurrency Regulation",
  meta_claim:
    "Cryptocurrencies should be regulated like traditional financial instruments",
  status: "contested" as const,
  category: "economics" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "SEC Crypto Assets and Cyber Enforcement Actions",
      url: "https://www.sec.gov/spotlight/cybersecurity-enforcement-actions",
    },
    {
      title: "EU Markets in Crypto-Assets Regulation (MiCA) — European Commission",
      url: "https://finance.ec.europa.eu/digital-finance/digital-assets/markets-crypto-assets-regulation-mica_en",
    },
    {
      title: "FTX Collapse: A Summary — Congressional Research Service",
      url: "https://crsreports.congress.gov/product/pdf/IF/IF12301",
    },
    {
      title: "DeFi Risks, Regulation, and Opportunities — Bank for International Settlements",
      url: "https://www.bis.org/publ/work1066.htm",
    },
    {
      title: "Financial Innovation and Technology for the 21st Century Act (FIT21) — U.S. Congress",
      url: "https://www.congress.gov/bill/118th-congress/house-bill/4763",
    },
    {
      title: "Crypto Crime Report 2023 — Chainalysis",
      url: "https://www.chainalysis.com/blog/crypto-crime-2023/",
    },
    {
      title: "SEC v. Ripple Labs — Court Filing",
      url: "https://www.sec.gov/litigation/complaints/2020/comp-pr2020-338.pdf",
    },
    {
      title: "The Terra/Luna Crash: Lessons for Stablecoin Regulation — Federal Reserve Bank of Chicago",
      url: "https://www.chicagofed.org/publications/chicago-fed-letter/2022/475",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can traditional securities law meaningfully apply to decentralized protocols?",
      content:
        "The SEC insists most crypto tokens are securities under the Howey test, but decentralized protocols have no issuer, no central office, and sometimes no identifiable development team. If a token becomes 'sufficiently decentralized,' who is the responsible party? Does forcing crypto into a securities framework designed for stocks and bonds protect consumers or simply drive innovation to more permissive jurisdictions like Dubai, Singapore, and Switzerland?",
    },
    {
      id: "q2",
      title: "Did the FTX collapse prove that crypto needs regulation, or that existing oversight failed?",
      content:
        "FTX operated under various regulatory licenses, employed a team of compliance officers, and was audited by registered firms — yet it collapsed spectacularly due to alleged fraud. Does this demonstrate that crypto markets need stronger regulation, or that the regulators who approved FTX's operations were simply not equipped to detect fraud in novel financial structures? Would more rules have prevented an alleged criminal enterprise, or would they merely have provided a false sense of security?",
    },
    {
      id: "q3",
      title: "Is 'regulatory arbitrage' a feature or a bug of the global system?",
      content:
        "When the SEC cracked down, Coinbase expanded to Bermuda; Binance relocated multiple times; and Dubai positioned itself as a crypto hub. Critics call this regulatory arbitrage — fleeing accountability. Defenders call it jurisdictional competition that finds the optimal regulatory balance. Does the global nature of crypto make national regulation fundamentally futile, or does it make international coordination essential?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Consumer Protection vs Innovation
    // =========================================================================
    {
      id: "consumer-protection-vs-innovation",
      title: "Consumer Protection vs Innovation",
      short_summary:
        "The crypto industry has produced spectacular consumer losses — FTX's $8 billion collapse, the Terra/Luna death spiral, and thousands of rug pulls collectively costing billions. Proponents of regulation argue these harms demand consumer protection frameworks. Opponents counter that regulation stifles innovation, drives development offshore, and that existing securities law is a poor fit for decentralized technology.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Heavy-handed regulation stifles the most transformative financial innovation since the internet. The United States risks losing its competitive edge as blockchain development migrates to jurisdictions with clearer, more permissive frameworks — Dubai, Singapore, Switzerland, and the UK. The SEC's 'regulation by enforcement' approach, which refuses to provide clear rules and instead sues projects after the fact, has created a hostile environment that punishes legitimate builders while doing nothing to stop actual fraudsters. FTX was regulated in multiple jurisdictions and still collapsed — proving that regulation does not prevent fraud, it merely creates a false sense of security. Innovation in programmable money, decentralized finance, and tokenized assets could democratize access to financial services for billions of unbanked people worldwide. Premature regulation risks freezing the technology in its current form, preventing breakthroughs that could make the financial system faster, cheaper, and more accessible.",
      proponent_rebuttal:
        "The 'innovation' defense has become a shield for an industry that has produced staggering consumer harm. FTX's collapse wiped out $8 billion in customer funds. The Terra/Luna death spiral destroyed $40 billion in value in a week, devastating retail investors across Southeast Asia and South Korea who were promised 'algorithmic stability.' In 2022 alone, DeFi hacks and exploits cost users $3.8 billion. Rug pulls — where developers abandon projects after collecting investor funds — numbered over 117,000 scam tokens deployed in 2022. Traditional financial regulation exists precisely because unregulated markets produce these outcomes: the Securities Act of 1933 was written after the 1929 crash for the same reasons. The crypto industry's call for 'innovation-friendly' regulation is functionally a request for no regulation — the freedom to operate investment products without the disclosure requirements, investor protections, and fiduciary duties that every other financial instrument must meet. Jurisdictions competing to attract crypto firms are engaged in a race to the bottom, not a race to optimal regulation.",
      crux: {
        id: "regulation-innovation-tradeoff",
        title: "The Regulation-Innovation Tradeoff Assessment",
        description:
          "The crux is whether crypto-specific consumer protection regulation can be designed that prevents fraud and protects retail investors without driving legitimate innovation offshore. If regulation can target fraudulent actors while providing clear rules for compliant builders, the innovation concern is addressed. If any meaningful regulation causes measurable capital and talent flight to less regulated jurisdictions, the tradeoff is real and must be weighed against consumer protection benefits.",
        methodology:
          "Compare innovation metrics (developer activity, venture funding, patent filings, new protocol launches) across jurisdictions with varying regulatory stringency — the US (enforcement-led), EU (MiCA framework), Singapore (licensing regime), Dubai (free zone approach), and Switzerland (guidance-based). Track whether regulatory actions correlate with reduced developer activity or merely redirect it. Measure consumer losses (fraud, hacks, rug pulls) in regulated vs. unregulated environments to determine whether regulation actually reduces harm.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Multi-jurisdictional comparative regulatory impact study)",
      },
      evidence: [
        {
          id: "ftx-collapse-losses",
          title: "FTX Collapse Caused $8 Billion in Customer Losses",
          description:
            "In November 2022, FTX — then the third-largest cryptocurrency exchange — collapsed after it was revealed that customer funds had been secretly transferred to Alameda Research, a trading firm controlled by FTX founder Sam Bankman-Fried. Over $8 billion in customer funds were lost. FTX held regulatory licenses in multiple jurisdictions including the Bahamas, Japan, and Australia, and had been actively lobbying for crypto regulation in Washington. The collapse demonstrated that regulatory licensing alone does not prevent fraud, but also that the absence of comprehensive regulation enabled the commingling of customer funds that would have been prohibited under traditional brokerage rules.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "U.S. Department of Justice; SEC; Congressional Research Service",
          sourceUrl: "https://crsreports.congress.gov/product/pdf/IF/IF12301",
          reasoning:
            "The FTX collapse is exhaustively documented through criminal proceedings, bankruptcy filings, and congressional testimony. The $8 billion in losses is a confirmed figure from bankruptcy court. The evidence directly demonstrates consumer harm from insufficient regulatory oversight of crypto exchanges, though skeptics correctly note that FTX held multiple licenses that failed to prevent the fraud.",
        },
        {
          id: "terra-luna-death-spiral",
          title: "Terra/Luna Collapse Destroyed $40 Billion in One Week",
          description:
            "In May 2022, the TerraUSD (UST) algorithmic stablecoin lost its dollar peg and entered a 'death spiral' with its sister token Luna, destroying approximately $40 billion in market value in under a week. The mechanism — which maintained the peg through algorithmic minting and burning rather than asset reserves — had been warned about by economists and crypto researchers, but no regulatory body had authority to prevent its sale to retail investors. Losses disproportionately affected retail investors in South Korea and Southeast Asia who had been attracted by Anchor Protocol's 20% yield on UST deposits.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Federal Reserve Bank of Chicago; Chainalysis; Bloomberg",
          sourceUrl: "https://www.chicagofed.org/publications/chicago-fed-letter/2022/475",
          reasoning:
            "The Terra/Luna collapse is well-documented and provides strong evidence that unregulated stablecoin mechanisms can produce catastrophic consumer losses. The $40 billion figure represents total market cap destruction and is corroborated by multiple independent sources. Directness is high because the failure directly resulted from the absence of stablecoin reserve requirements that regulation could have mandated.",
        },
        {
          id: "defi-hack-statistics-2022",
          title: "DeFi Protocols Lost $3.8 Billion to Hacks and Exploits in 2022",
          description:
            "According to Chainalysis, decentralized finance protocols lost $3.8 billion to hacks and exploits in 2022, up from $1.3 billion in 2021. The largest single incident was the Ronin Bridge hack ($625 million), attributed to North Korea's Lazarus Group. Unlike traditional financial institutions, DeFi protocols typically have no insurance, no customer support, and no mechanism for recovering stolen funds. While some protocols have implemented bug bounty programs and security audits, the code-is-law philosophy means that exploitable vulnerabilities result in irrecoverable losses for users.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Chainalysis 2023 Crypto Crime Report",
          sourceUrl: "https://www.chainalysis.com/blog/crypto-crime-2023/",
          reasoning:
            "Chainalysis is the leading blockchain analytics firm and its crime reports are widely cited by law enforcement and regulators. Independence is slightly lower because Chainalysis has a commercial interest in demonstrating the need for blockchain surveillance tools. Directness is moderate because DeFi hacks involve code vulnerabilities rather than regulatory failures per se, though regulation could mandate security standards and audits.",
        },
        {
          id: "sec-enforcement-action-chilling",
          title: "SEC Enforcement Actions Drove Crypto Projects Offshore",
          description:
            "The SEC filed 46 crypto-related enforcement actions in 2023 alone, targeting exchanges (Coinbase, Binance US), token issuers, and DeFi protocols. In response, multiple major crypto firms relocated operations: Coinbase established an international exchange in Bermuda, Gemini expanded to Singapore, and Ripple shifted focus to markets outside the US. Developer surveys consistently show that US-based crypto developers cite regulatory uncertainty as their primary concern. The Blockchain Association found that US share of global crypto developer activity declined from 40% in 2019 to 29% in 2023.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "SEC Enforcement Division; Blockchain Association; Electric Capital Developer Report",
          sourceUrl: "https://www.sec.gov/spotlight/cybersecurity-enforcement-actions",
          reasoning:
            "The correlation between SEC enforcement and offshore migration is well-documented, but causation is harder to establish — firms may relocate for tax advantages or market access rather than regulatory avoidance. Independence is lower because some sources (Blockchain Association) are industry lobbying groups. However, the decline in US developer share is corroborated by independent developer reports.",
        },
        {
          id: "dubai-singapore-regulatory-arbitrage",
          title: "Dubai and Singapore Attract Crypto Firms with Regulatory Clarity",
          description:
            "Dubai's Virtual Assets Regulatory Authority (VARA) and Singapore's Payment Services Act have created licensing frameworks specifically designed for crypto businesses, offering regulatory clarity that the US lacks. Binance, Bybit, OKX, and Crypto.com have all obtained Dubai licenses, while Singapore has licensed over 20 crypto service providers. These jurisdictions impose anti-money laundering requirements and consumer disclosures while allowing a broader range of crypto activities than the US SEC permits. The resulting 'regulatory arbitrage' has concentrated crypto industry growth outside the United States.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Dubai VARA; Monetary Authority of Singapore; Reuters",
          sourceUrl: "https://www.vara.ae/en/",
          reasoning:
            "The migration of crypto firms to Dubai and Singapore is factually well-established. However, this evidence cuts both ways: it shows that regulation drives firms offshore, but also that the firms are choosing regulated environments over unregulated ones — they want rules, just different rules. The question is whether Dubai/Singapore frameworks are genuinely better or merely more permissive.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Financial Stability & Systemic Risk
    // =========================================================================
    {
      id: "financial-stability-systemic-risk",
      title: "Financial Stability & Systemic Risk",
      short_summary:
        "The crypto industry's growing interconnection with traditional finance — through institutional investment, crypto-friendly banks, and stablecoin integration into payment systems — raises questions about systemic risk. The TerraUSD collapse triggered contagion across crypto markets, and the failures of crypto-exposed banks Silvergate and Signature spilled into the broader banking system. The debate is whether crypto markets are large enough to pose genuine systemic risk or remain a contained sideshow.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Crypto markets remain too small to pose systemic risk to the global financial system. Even at their 2021 peak ($3 trillion total market cap), crypto assets represented less than 1% of global financial assets. The TerraUSD collapse, while devastating to crypto participants, had zero measurable impact on traditional equity markets, bond yields, or interbank lending rates. Stablecoins can self-regulate through market discipline: Tether has maintained its peg through multiple crises despite constant criticism, and USDC's brief depeg during the Silicon Valley Bank crisis self-corrected within days. The failures of Silvergate and Signature Bank were caused by traditional banking mismanagement — concentrated depositor bases and interest rate risk — not by crypto exposure per se. Imposing banking-style systemic risk regulation on an industry that represents a fraction of a percent of global finance would be disproportionate and would stifle growth before the technology can mature.",
      proponent_rebuttal:
        "The argument that crypto is 'too small to matter' mirrors what regulators said about subprime mortgages in 2006. Systemic risk is not purely a function of market size — it is a function of interconnectedness, leverage, and contagion channels. The crypto industry has systematically built these channels: institutional investors now hold significant crypto positions, crypto-friendly banks (Silvergate, Signature, Silicon Valley Bank) served as bridges between crypto and traditional finance, and stablecoins with $130+ billion in circulation are held as reserves in money market funds and Treasury bills. The TerraUSD collapse triggered cascading failures across Three Arrows Capital, Celsius Network, Voyager Digital, and ultimately FTX — demonstrating that contagion within crypto markets can be rapid and catastrophic. The Bank for International Settlements has warned that growing institutional adoption is creating 'systemic risk in the making.' Waiting until crypto is large enough to cause a financial crisis before regulating it is the definition of fighting the last war.",
      crux: {
        id: "systemic-risk-threshold",
        title: "The Systemic Risk Threshold Assessment",
        description:
          "The crux is whether the crypto industry's interconnection with traditional finance has crossed the threshold where a crypto market crisis could trigger broader financial instability. If crypto market shocks remain contained within the crypto ecosystem (as the 2022 crash largely was), systemic risk regulation is premature. If growing institutional exposure and stablecoin integration create transmission channels that could amplify crypto shocks into the traditional financial system, proactive regulation is warranted.",
        methodology:
          "Model contagion pathways between crypto markets and traditional finance by mapping institutional crypto exposures (pension funds, endowments, hedge funds), bank exposures (deposits from crypto firms, loans collateralized by crypto), and stablecoin reserve holdings (Treasury bills, money market funds). Stress-test the system against scenarios: a 90% crypto market crash, a major stablecoin depeg, and simultaneous failure of the top 3 exchanges. Measure whether losses propagate beyond the crypto ecosystem into traditional markets.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Financial system stress test with contagion modeling)",
      },
      evidence: [
        {
          id: "terrausd-collapse-contagion",
          title: "TerraUSD Collapse Triggered Cascading Failures Across Crypto Industry",
          description:
            "The May 2022 collapse of TerraUSD's algorithmic stablecoin mechanism triggered a chain of failures: Three Arrows Capital (a $10 billion crypto hedge fund) became insolvent due to Luna exposure, which caused Voyager Digital and Celsius Network to freeze customer withdrawals, which undermined confidence in FTX, which ultimately collapsed in November 2022. This contagion chain demonstrated that crypto markets, while not yet systemically connected to traditional finance, exhibit the same interconnected fragility that characterizes systemic risk in traditional markets.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Bank for International Settlements; Federal Reserve Financial Stability Report",
          sourceUrl: "https://www.bis.org/publ/work1066.htm",
          reasoning:
            "The contagion chain from TerraUSD to FTX is well-documented through bankruptcy filings and regulatory investigations. However, the contagion remained largely within the crypto ecosystem — traditional financial markets were minimally affected. Directness is moderate because the evidence demonstrates intra-crypto systemic risk but does not conclusively prove that traditional finance would be affected.",
        },
        {
          id: "silvergate-signature-bank-failures",
          title: "Crypto-Exposed Banks Silvergate and Signature Collapsed in 2023",
          description:
            "Silvergate Bank (voluntarily liquidated March 2023) and Signature Bank (seized by FDIC March 2023) both failed due in part to their heavy concentration of crypto industry deposits. When crypto markets crashed in 2022, crypto firms withdrew deposits en masse, creating liquidity crises at both banks. Signature Bank's failure was the third-largest bank failure in US history and contributed to the March 2023 banking panic that also brought down Silicon Valley Bank. These failures demonstrated that crypto market volatility can transmit to the traditional banking system through the deposit channel.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "FDIC; Federal Reserve; Wall Street Journal",
          sourceUrl: "https://www.fdic.gov/resources/resolutions/bank-failures/",
          reasoning:
            "The bank failures are documented through FDIC records and regulatory post-mortems. The connection to crypto market volatility is established, though both banks also had non-crypto vulnerabilities (interest rate risk, concentrated depositor bases). The failures directly demonstrate a contagion channel from crypto to traditional banking, even if crypto exposure was not the sole cause.",
        },
        {
          id: "stablecoin-reserve-composition",
          title: "Stablecoin Reserves Create Hidden Links to Treasury and Money Markets",
          description:
            "The top stablecoins (USDT, USDC, BUSD) collectively hold over $130 billion in reserves, primarily in US Treasury bills and money market funds. Tether alone holds more Treasury bills than many countries. A sudden stablecoin depeg could force rapid liquidation of these reserves, creating selling pressure in Treasury markets during a period when those markets are already under strain from rising interest rates and reduced foreign demand. Circle's USDC briefly lost its peg in March 2023 when $3.3 billion in reserves were trapped at Silicon Valley Bank, demonstrating that stablecoin stability depends on the same banking system it claims to disrupt.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Tether Attestation Reports; Circle Financial Statements; Federal Reserve",
          sourceUrl: "https://tether.to/en/transparency/",
          reasoning:
            "Stablecoin reserve composition is partially documented through attestation reports, though Tether's transparency has been historically questioned. The transmission mechanism (forced liquidation of Treasury holdings during a depeg) is theoretically sound but has not been tested at scale. The USDC/SVB incident provides a real-world data point but at a relatively small scale ($3.3 billion).",
        },
        {
          id: "bis-systemic-risk-warning",
          title: "Bank for International Settlements Warns of 'Systemic Risk in the Making'",
          description:
            "The Bank for International Settlements (BIS), the central bank of central banks, published multiple reports in 2022-2023 warning that growing institutional adoption of crypto assets is creating 'systemic risk in the making.' The BIS identified three transmission channels: direct exposures (institutional investors holding crypto), contagion through confidence effects (crypto crashes undermining broader market sentiment), and operational dependencies (financial institutions relying on crypto infrastructure). The BIS recommended proactive regulation before systemic interconnections deepen.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source: "Bank for International Settlements",
          sourceUrl: "https://www.bis.org/publ/work1066.htm",
          reasoning:
            "The BIS is one of the most authoritative sources on global financial stability, lending high source reliability. However, its warnings are forward-looking assessments rather than evidence of realized systemic risk, which lowers directness and replicability. The BIS also has an institutional interest in supporting central bank authority over monetary systems.",
        },
        {
          id: "2022-crash-no-traditional-spillover",
          title: "The 2022 Crypto Crash Had Minimal Impact on Traditional Markets",
          description:
            "Despite a $2 trillion wipeout in crypto market capitalization during 2022 (from $2.9 trillion in November 2021 to under $800 billion by year-end), traditional equity markets experienced no measurable contagion from crypto losses. The S&P 500's decline in 2022 was driven by Federal Reserve interest rate hikes and inflation, not crypto contagion. Bond markets, interbank lending rates, and currency markets showed no crypto-related disruption. Even the FTX collapse — the most dramatic corporate fraud in crypto history — had no detectable impact on traditional financial asset prices. This suggests that crypto markets remain sufficiently isolated from traditional finance to avoid systemic risk classification.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "Federal Reserve Financial Stability Report; International Monetary Fund",
          sourceUrl: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
          reasoning:
            "This is strong counter-evidence: the largest crypto crash in history failed to produce measurable traditional market contagion. Source reliability and independence are high because Federal Reserve and IMF analyses are produced by institutions with no stake in crypto's success. Directness is high because the 2022 crash was a natural experiment that tested the systemic risk hypothesis and found it wanting — at least for 2022 levels of interconnection.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Regulatory Framework Design
    // =========================================================================
    {
      id: "regulatory-framework-design",
      title: "Regulatory Framework Design",
      short_summary:
        "The fundamental challenge of crypto regulation is jurisdictional: should crypto assets be regulated as securities (SEC), commodities (CFTC), banking products (OCC/FDIC), or something entirely new? The SEC argues most tokens meet the Howey test for investment contracts, while the industry argues that decentralized protocols do not fit 1930s-era securities frameworks. The EU has moved ahead with MiCA, creating the world's first comprehensive crypto regulatory framework, while the US remains mired in turf wars between regulatory agencies.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Existing US securities law, written for stocks and bonds in the 1930s, is fundamentally incompatible with decentralized protocols. The Howey test — which defines a security as an 'investment of money in a common enterprise with an expectation of profits derived from the efforts of others' — breaks down when applied to decentralized networks where there is no 'other' managing the enterprise. Bitcoin has no issuer. Ethereum's transition to proof-of-stake was executed by a decentralized community, not a corporate board. DeFi lending protocols operate autonomously through smart contracts. Forcing these technologies into securities law creates absurd outcomes: the SEC has argued that secondary market sales of tokens are securities transactions, implying that selling a crypto asset on an exchange is equivalent to issuing a stock. The crypto industry needs a bespoke regulatory framework — like the EU's MiCA regulation — that recognizes the unique characteristics of digital assets rather than pretending they are 1930s-era investment contracts.",
      proponent_rebuttal:
        "The claim that crypto assets do not fit existing securities law is a legal strategy, not an economic reality. The vast majority of crypto tokens were sold through initial coin offerings (ICOs) or similar fundraising events where investors gave money to development teams in exchange for tokens, with the expectation that the tokens would increase in value as the team built the project. This is textbook Howey test: investment of money, in a common enterprise, with expectation of profits, from the efforts of others. The 'decentralization' defense is largely cosmetic: most supposedly decentralized protocols are controlled by small teams or foundations that hold majority governance tokens. The Ripple/SEC lawsuit revealed that XRP's value was almost entirely dependent on Ripple Labs' business activities, despite claims of decentralization. The industry's push for 'new frameworks' is not a genuine request for appropriate regulation — it is an attempt to secure weaker rules than those governing equivalent financial products. When a project raises money from investors by promising future returns, it is selling a security, regardless of whether it uses blockchain technology.",
      crux: {
        id: "securities-law-applicability",
        title: "The Howey Test Applicability Assessment",
        description:
          "The crux is whether the Howey test accurately captures the economic reality of crypto token transactions, or whether the unique characteristics of decentralized protocols genuinely require a new legal framework. If most crypto tokens, at the point of sale, meet all four Howey prongs (investment of money, common enterprise, expectation of profits, from efforts of others), then existing securities law applies and the industry's objections are strategic rather than substantive. If genuinely decentralized protocols create situations where no identifiable 'other' drives profits, a new framework is needed.",
        methodology:
          "Conduct a systematic legal analysis of the top 100 crypto tokens by market capitalization, applying the Howey test to each at the point of initial sale and at current trading. For each token, determine: (1) whether funds were raised from investors, (2) whether a common enterprise exists, (3) whether purchasers expect profits, and (4) whether profits derive from an identifiable promoter's efforts. Categorize tokens as 'clearly securities,' 'clearly not securities,' and 'ambiguous.' Assess whether the ambiguous category is large enough to warrant bespoke regulation.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Comprehensive legal analysis with economic assessment of top 100 tokens)",
      },
      evidence: [
        {
          id: "fit21-act-bipartisan",
          title: "FIT21 Act Passed House with Bipartisan Support, Proposing Dual CFTC/SEC Framework",
          description:
            "The Financial Innovation and Technology for the 21st Century Act (FIT21), passed the US House of Representatives in May 2024 with bipartisan support (279-136), proposing to split crypto oversight between the SEC and CFTC. Under FIT21, digital assets would be classified as securities when sold by a centralized entity but would transition to commodity status once the underlying network becomes 'functionally decentralized.' The bill establishes criteria for decentralization including no single entity controlling more than 20% of tokens and no ability to unilaterally alter the blockchain. This represents Congress's most significant attempt to create a bespoke crypto regulatory framework.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "U.S. Congress; Congressional Research Service",
          sourceUrl: "https://www.congress.gov/bill/118th-congress/house-bill/4763",
          reasoning:
            "FIT21's bipartisan passage demonstrates legislative recognition that existing frameworks may be insufficient for crypto regulation. However, the bill had not passed the Senate as of early 2025, and its 'functional decentralization' test was criticized by the SEC as creating a loophole for securities issuers. Independence is slightly lower because the bill was influenced by significant crypto industry lobbying.",
        },
        {
          id: "eu-mica-framework",
          title: "EU MiCA Creates World's First Comprehensive Crypto Regulatory Framework",
          description:
            "The EU's Markets in Crypto-Assets Regulation (MiCA), which took full effect in December 2024, establishes the world's first comprehensive regulatory framework for crypto assets. MiCA creates categories for crypto assets (e-money tokens, asset-referenced tokens, utility tokens), requires issuers to publish white papers, mandates reserve requirements for stablecoins, and imposes licensing requirements for crypto service providers. Early evidence suggests MiCA has attracted crypto firms seeking regulatory clarity — Circle (USDC issuer) obtained a MiCA license and designated its European entity as its primary global hub.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "European Commission; European Securities and Markets Authority",
          sourceUrl: "https://finance.ec.europa.eu/digital-finance/digital-assets/markets-crypto-assets-regulation-mica_en",
          reasoning:
            "MiCA is the most significant evidence that bespoke crypto regulation is both possible and attractive to the industry. The framework's existence directly challenges the SEC's position that existing securities law is sufficient. Source reliability is high because MiCA is official EU law. However, MiCA's effectiveness at preventing fraud and protecting consumers remains untested given its recent implementation.",
        },
        {
          id: "ripple-sec-lawsuit-outcome",
          title: "Ripple/SEC Lawsuit Produced Split Decision on Token Securities Status",
          description:
            "In the landmark SEC v. Ripple Labs case, Judge Analisa Torres ruled in July 2023 that XRP tokens sold to institutional investors constituted securities (because buyers expected profits from Ripple's efforts), but XRP sold on public exchanges to retail investors did not (because retail buyers did not know they were purchasing from Ripple). This split decision — the same token being a security in one context and not in another — highlighted the awkward fit between the Howey test and crypto token markets. The SEC appealed the retail sales ruling, and the case remains a key precedent for whether exchange-traded crypto tokens are securities.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 9,
          },
          source: "U.S. District Court, Southern District of New York; SEC",
          sourceUrl: "https://www.sec.gov/litigation/complaints/2020/comp-pr2020-338.pdf",
          reasoning:
            "The Ripple ruling is the most directly relevant evidence on whether the Howey test works for crypto tokens. The split decision — same token, different classification based on context — directly demonstrates the awkwardness of applying 1930s-era securities law to blockchain tokens. Replicability is lower because the ruling is specific to XRP's particular facts and may not generalize to all tokens.",
        },
        {
          id: "coinbase-wells-notice",
          title: "SEC Sued Coinbase Despite Its Years-Long Effort to Register and Comply",
          description:
            "In June 2023, the SEC sued Coinbase for operating as an unregistered securities exchange, broker, and clearing agency. Coinbase had spent years attempting to work with the SEC, including filing a formal petition for rulemaking in July 2022 requesting that the SEC create crypto-specific rules. The SEC denied the petition and sued instead. Coinbase CEO Brian Armstrong publicly stated that the SEC told Coinbase to 'come in and register' but that when Coinbase attempted to register, there was no registration framework available for crypto exchanges. The case illustrates the 'regulation by enforcement' critique: the SEC demands compliance with rules it has not written.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "SEC; Coinbase SEC Petition; Bloomberg Law",
          sourceUrl: "https://www.sec.gov/litigation/complaints/2023/comp-pr2023-102.pdf",
          reasoning:
            "The Coinbase case directly illustrates the 'regulation by enforcement' critique. However, independence is lower because Coinbase's narrative is self-serving — the SEC disputes that Coinbase genuinely attempted to comply and argues that Coinbase knowingly listed unregistered securities. The truth likely lies between the two accounts, but the absence of a crypto-specific registration pathway is an objective fact.",
        },
        {
          id: "gensler-vs-atkins-sec-approach",
          title: "SEC Leadership Change from Gensler to Atkins Signals Regulatory Shift",
          description:
            "SEC Chair Gary Gensler (2021-2025) pursued an aggressive enforcement approach, filing over 100 crypto-related actions and asserting that nearly all crypto tokens are securities. His successor, Paul Atkins (appointed 2025), has signaled a dramatically different approach: engaging with the crypto industry on rulemaking, establishing a dedicated crypto task force, and potentially withdrawing several pending enforcement actions. This leadership change demonstrates that US crypto regulation is driven more by the ideology of individual regulators than by clear legal frameworks — supporting the argument that bespoke legislation is needed to create durable, consistent rules that survive changes in SEC leadership.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "SEC; Reuters; Wall Street Journal",
          sourceUrl: "https://www.sec.gov/about/commissioners/paul-atkins",
          reasoning:
            "The regulatory whiplash between Gensler and Atkins is well-documented and directly demonstrates the instability of enforcement-based regulation. However, the evidence is recent and Atkins' actual regulatory approach is still evolving. The contrast effectively illustrates why legislation — which survives leadership changes — is preferable to enforcement discretion.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
