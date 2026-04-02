import type { Topic } from "@/lib/schemas/topic";

export const centralBankDigitalCurrencyData = {
  id: "central-bank-digital-currency",
  title: "Central Bank Digital Currencies",
  meta_claim:
    "Central Bank Digital Currencies (CBDCs) represent the most significant expansion of government financial surveillance in history, enabling programmable money that can restrict how, when, and where citizens spend.",
  status: "contested" as const,
  category: "economics" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Central Bank Digital Currencies: Foundational Principles — Bank for International Settlements",
      url: "https://www.bis.org/publ/othp33.htm",
    },
    {
      title: "Money and Payments: The U.S. Dollar in the Age of Digital Transformation — Federal Reserve",
      url: "https://www.federalreserve.gov/publications/money-and-payments-discussion-paper.htm",
    },
    {
      title: "The Rise of Digital Money — International Monetary Fund",
      url: "https://www.imf.org/en/Publications/fintech-notes/Issues/2019/07/12/The-Rise-of-Digital-Money-47097",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Do CBDCs enable unprecedented financial surveillance and control?",
      content:
        "Programmable money could expire, be restricted to certain merchants, or be frozen without due process. Central banks could theoretically implement negative interest rates on individual holdings, restrict purchases of disfavored goods, or cut off individuals from the financial system entirely. Is this a realistic threat or a paranoid misunderstanding of CBDC design?",
    },
    {
      id: "q2",
      title: "Could CBDCs eliminate bank runs and improve monetary policy?",
      content:
        "Direct central bank accounts would make bank runs structurally impossible and enable precise, targeted stimulus delivery — depositing money directly into citizen accounts during crises. Could CBDCs make the financial system fundamentally safer and monetary policy more effective?",
    },
    {
      id: "q3",
      title: "Is the digital yuan a geopolitical weapon against dollar dominance?",
      content:
        "China's CBDC has 260+ million users and is being integrated into cross-border payment systems. Could CBDC-to-CBDC settlement networks bypass SWIFT and enable sanctions evasion, threatening the US dollar's reserve currency status and America's most powerful geopolitical tool?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Surveillance & Control
    // =========================================================================
    {
      id: "surveillance-control",
      title: "Financial Surveillance & Programmable Money",
      short_summary:
        "CBDCs give central banks visibility into every transaction in the economy and the technical capability to program restrictions on money itself — expiration dates, merchant limitations, spending caps, and individual freezes. The question is whether adequate privacy safeguards can be designed and whether they will survive political pressure.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The surveillance fears are overblown and technologically illiterate. CBDC designs range from fully anonymous (like digital cash) to fully surveilled, and most serious proposals incorporate privacy protections. The European Central Bank's digital euro proposal includes offline payment capability and anonymity for small transactions, modeled on cash. The Federal Reserve's research explicitly states that any US CBDC would protect consumer privacy. Moreover, the current financial system already offers near-total surveillance — banks report transactions to governments, credit card companies track every purchase, and the IRS can access any financial account. CBDCs would not introduce surveillance that does not already exist; they would merely change which institution has access.",
      proponent_rebuttal:
        "The difference between current financial surveillance and CBDC surveillance is the difference between a government that can investigate you and a government that can control you. Current systems allow authorities to monitor transactions after the fact with legal process — CBDCs enable pre-emptive, automated restrictions built into the money itself. China's digital yuan has already been programmed with expiration dates (forcing spending by a deadline) and geographic restrictions (limiting spending to specific districts). The Bank of England's consultation paper explicitly discusses 'programmable money' that could restrict purchases. Privacy protections promised during the design phase will not survive a major terrorist attack, financial crisis, or public health emergency — governments will demand access, and CBDC architecture makes it trivially easy to comply. The only reliable privacy protection is architectural: systems designed so that surveillance is technically impossible, not merely prohibited by policy.",
      crux: {
        id: "privacy-architecture-test",
        title: "The Architectural Privacy Assessment",
        description:
          "The crux is whether CBDC systems can be designed with privacy protections that are architecturally enforced (technically impossible to surveil) rather than merely policy-enforced (prohibited by rules that can be changed). If cryptographic techniques like zero-knowledge proofs can provide transaction privacy that not even the central bank can break, the surveillance concern is addressed. If all proposed designs retain the technical capability for surveillance, privacy protections are only as durable as political will.",
        methodology:
          "Convene a panel of cryptographers, central bank technologists, and privacy engineers to assess all proposed CBDC architectures. For each design, determine whether privacy is enforced cryptographically (making surveillance technically impossible) or by access controls (making surveillance policy-dependent). Test each architecture against threat scenarios: terrorist attack (government demands transaction data), pandemic (government wants to track spending patterns), political crisis (government targets opposition funding).",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$1-3M (Technical architecture review with cryptographic analysis and red team exercises)",
      },
      evidence: [
        {
          id: "china-digital-yuan-programmability",
          title: "China's Digital Yuan Implements Programmable Restrictions",
          description:
            "China's e-CNY (digital yuan) has been tested with programmable features including expiration dates on stimulus payments (forcing spending within a set period), geographic restrictions (limiting spending to specific districts or cities), and merchant category restrictions (directing government subsidies only to approved categories). While presented as tools for targeted stimulus, these capabilities demonstrate that CBDCs can restrict how, when, and where money is spent — capabilities that no previous form of money has offered a central authority.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "People's Bank of China; Brookings Institution; Atlantic Council CBDC Tracker",
          sourceUrl: "https://www.atlanticcouncil.org/cbdctracker/",
          reasoning:
            "The digital yuan's programmable features are well-documented and represent real-world implementation of the surveillance concerns, giving this evidence high directness. Source reliability is slightly lower because comprehensive information about the digital yuan's capabilities comes partly from Chinese state media, which may not disclose all features or limitations.",
        },
        {
          id: "ecb-digital-euro-privacy",
          title: "ECB Digital Euro Proposal Includes Privacy Protections and Offline Payments",
          description:
            "The European Central Bank's digital euro proposal (2023) explicitly incorporates privacy protections, including anonymity for low-value offline transactions (similar to cash), tiered identity verification (minimal data for small payments, full verification for large amounts), and a clear statement that the ECB would not have access to individual transaction data. The design is intended to provide 'cash-like' privacy in the digital realm.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "European Central Bank",
          sourceUrl: "https://www.ecb.europa.eu/euro/digital_euro/html/index.en.html",
          reasoning:
            "The ECB's privacy proposal comes from a highly credible institution, but independence is lower because it is essentially the issuer's own promise about future behavior. The key uncertainty is whether these privacy commitments will survive pressure from law enforcement, tax authorities, and anti-money-laundering regulators who will push for greater access.",
        },
        {
          id: "canada-trucker-convoy-financial-freeze",
          title: "Canada Froze Bank Accounts During Trucker Convoy Protests (2022)",
          description:
            "During the 2022 Freedom Convoy protests, the Canadian government invoked the Emergencies Act and directed banks to freeze the accounts of individuals associated with the protests without court orders. Over 200 accounts were frozen. While this occurred through the existing banking system (not a CBDC), it demonstrated that governments will use financial system access as a tool of political control during crises — and that existing legal protections can be overridden under emergency powers. A CBDC would make such freezes instantaneous, automated, and far more granular.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Government of Canada; Reuters; Financial Times",
          sourceUrl: "https://www.reuters.com/world/americas/canada-freeze-more-than-200-financial-products-linked-protests-2022-02-21/",
          reasoning:
            "The Canadian account freezes are well-documented and demonstrate the political will to use financial system access for crowd control. While this happened through the existing banking system, it directly illustrates the kind of action that would be easier, faster, and more precise with a CBDC — making it relevant evidence for the surveillance concern.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Financial Inclusion & Efficiency
    // =========================================================================
    {
      id: "financial-inclusion-efficiency",
      title: "Financial Inclusion & Monetary Policy Efficiency",
      short_summary:
        "1.4 billion adults globally lack access to basic financial services. CBDCs could provide universal account access, eliminate remittance fees, and enable direct stimulus delivery during crises. The question is whether these benefits require a CBDC or can be achieved through simpler means.",
      icon_name: "Users" as const,
      skeptic_premise:
        "CBDCs could be transformative for the 1.4 billion unbanked adults worldwide. In developing countries, a CBDC accessible through a basic mobile phone would bypass the need for bank branches, credit histories, and minimum balance requirements. The World Bank estimates that remittance fees consume $48 billion annually from migrant workers — money sent home to developing nations at an average cost of 6.3%. CBDC-to-CBDC cross-border payments could reduce this to near-zero. During COVID-19, stimulus payments in the US took weeks to reach citizens and millions of unbanked individuals never received them. A CBDC could deliver payments to every citizen within seconds, enabling faster and more effective crisis response.",
      proponent_rebuttal:
        "The financial inclusion argument for CBDCs is a solution in search of a problem. Mobile money systems like M-Pesa in Kenya have already brought 96% of Kenyan adults into the financial system without any central bank digital currency — using simple SMS-based technology on basic feature phones. India's UPI (Unified Payments Interface) processes over 10 billion transactions per month through private payment apps built on public infrastructure, again without a CBDC. The existing technology for financial inclusion is proven, deployed, and does not require governments to rebuild the monetary system. The unbanked are not unbanked because of a lack of digital currency — they are unbanked because of poverty, lack of identification documents, and distrust of financial institutions. A CBDC does not solve any of these root causes.",
      crux: {
        id: "cbdc-vs-existing-inclusion",
        title: "The CBDC vs. Existing Solutions Comparison",
        description:
          "The crux is whether a CBDC provides financial inclusion benefits that cannot be achieved through existing mobile money and digital payment systems. If a CBDC's unique characteristics (central bank backing, programmability, interoperability) provide measurable improvements in inclusion, access, and cost over existing alternatives, the case for CBDCs is strengthened. If existing systems already achieve comparable results, the CBDC adds risk without proportionate benefit.",
        methodology:
          "Conduct a comparative analysis of financial inclusion outcomes in countries with active CBDC pilots (Bahamas' Sand Dollar, Nigeria's eNaira, Jamaica's JAM-DEX) versus countries with advanced mobile money ecosystems (Kenya, India, Philippines). Measure: percentage of previously unbanked adults reached, transaction costs, remittance fees, crisis response speed, and user satisfaction. Control for pre-existing financial infrastructure and economic development level.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Multi-country comparative financial inclusion study)",
      },
      evidence: [
        {
          id: "mpesa-financial-inclusion",
          title: "M-Pesa Achieved 96% Financial Inclusion in Kenya Without a CBDC",
          description:
            "Safaricom's M-Pesa mobile money system, launched in 2007, brought financial services to 96% of Kenyan adults using simple SMS technology on basic feature phones. The system processes over $300 billion annually, has reduced poverty by an estimated 2% of GDP, and has been replicated across Africa, South Asia, and beyond. This demonstrates that transformative financial inclusion does not require a CBDC or even smartphone technology — it requires an accessible, trusted, interoperable payment platform.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "World Bank; MIT; Safaricom Annual Report",
          sourceUrl: "https://www.worldbank.org/en/news/feature/2021/06/24/in-kenya-and-beyond-mobile-money-is-changing-lives",
          reasoning:
            "M-Pesa is the best-documented example of mobile financial inclusion, studied extensively by independent researchers. It directly challenges the claim that CBDCs are necessary for financial inclusion by showing that the private sector achieved comparable results with simpler technology.",
        },
        {
          id: "nigeria-enaira-adoption-struggles",
          title: "Nigeria's eNaira CBDC Has Struggled with Adoption Despite Heavy Promotion",
          description:
            "Nigeria launched the eNaira in October 2021, making it one of the first major economies to deploy a CBDC. Despite aggressive promotion including restricting ATM cash withdrawals to push adoption, fewer than 1% of Nigerians actively used the eNaira by 2023. Citizens expressed distrust of government financial surveillance and preferred existing mobile money systems. The Nigerian experience suggests that the financial inclusion benefits of CBDCs may be more theoretical than practical when citizens do not trust the issuing government.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Bloomberg; Central Bank of Nigeria; Quartz Africa",
          sourceUrl: "https://www.bloomberg.com/news/articles/2023-06-15/nigeria-s-enaira-fails-to-gain-users-despite-cash-curbs",
          reasoning:
            "Nigeria's eNaira provides the strongest real-world counter-evidence to CBDC financial inclusion claims. The very low adoption rate despite government pressure directly demonstrates that a CBDC does not automatically solve financial inclusion. However, Nigeria's specific governance trust issues may not generalize to all countries.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Geopolitical Dollar Threat
    // =========================================================================
    {
      id: "geopolitical-dollar-threat",
      title: "Geopolitical Implications & Dollar Dominance",
      short_summary:
        "Cross-border CBDC settlement systems like mBridge could enable countries to trade without using the US dollar or SWIFT, potentially undermining America's sanctions power and the dollar's reserve currency status. The question is whether this represents an existential threat to US financial hegemony or an incremental development.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "CBDCs pose a genuine threat to dollar dominance. China's digital yuan has over 260 million wallet users and is being integrated into cross-border payment projects including mBridge — a multi-CBDC platform developed with the BIS that enables direct currency-to-currency settlement without routing through SWIFT or the dollar. If major trading partners can settle oil, commodity, and trade payments in digital yuan or through CBDC bridges, the US loses its most powerful geopolitical tool: the ability to exclude adversaries from the global financial system through sanctions. Russia's partial exclusion from SWIFT after invading Ukraine has accelerated interest in CBDC alternatives among countries that fear similar treatment, including India, Saudi Arabia, Brazil, and South Africa.",
      proponent_rebuttal:
        "The de-dollarization narrative is vastly overstated. The US dollar accounts for 59% of global foreign exchange reserves, 88% of foreign exchange transactions, and is the invoicing currency for roughly half of global trade — a dominance built over 80 years of institutional trust, deep capital markets, rule of law, and military power. No CBDC can replicate these foundations. China's digital yuan is primarily used domestically for small retail transactions, not international trade settlement. The mBridge project is a pilot with limited participants, and even its full deployment would not change the fundamental reasons countries hold dollar reserves: US Treasury market depth, the legal enforceability of dollar-denominated contracts, and the Federal Reserve's role as global lender of last resort. CBDCs may nibble at the margins of dollar dominance, but the structural advantages of the dollar system are not technical — they are institutional.",
      crux: {
        id: "cbdc-sanctions-evasion-capacity",
        title: "The Sanctions Evasion Capacity Test",
        description:
          "The crux is whether CBDC-based cross-border payment systems can provide a viable alternative to SWIFT and dollar settlement at sufficient scale to meaningfully reduce the effectiveness of US financial sanctions. If countries under sanctions can route significant trade volumes through CBDC bridges without using the dollar, US sanctions power is genuinely threatened. If CBDC bridges remain limited by network effects, liquidity constraints, and geopolitical risks, they represent marginal alternatives at best.",
        methodology:
          "Track the volume and value of transactions processed through CBDC-based cross-border settlement systems (mBridge, bilateral CBDC arrangements) over a 3-year period. Compare the growth trajectory against dollar-based SWIFT transactions. Analyze whether sanctioned countries (Russia, Iran, North Korea) are successfully using CBDC-based systems to circumvent sanctions. Assess the liquidity, settlement reliability, and counterparty risk of CBDC bridges compared to dollar settlement.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-600K (International financial flow analysis with sanctions evasion assessment)",
      },
      evidence: [
        {
          id: "mbridge-cbdc-project",
          title: "mBridge: Multi-CBDC Cross-Border Payment Platform in Development",
          description:
            "The mBridge project, initiated by the BIS Innovation Hub with the central banks of China, Hong Kong, Thailand, and the UAE, is developing a multi-CBDC platform for cross-border payments that settles transactions directly between central banks without routing through SWIFT or the dollar. The platform has processed test transactions worth over $22 million and aims to reduce cross-border settlement from 3-5 days to seconds. Saudi Arabia joined as a participant in 2024, signaling interest from major oil-producing nations in dollar alternatives.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "Bank for International Settlements; Atlantic Council",
          sourceUrl: "https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm",
          reasoning:
            "mBridge is the most advanced multi-CBDC cross-border project and is backed by major central banks. However, test transaction volumes ($22M) are minuscule compared to daily SWIFT volumes ($5 trillion+), and the project remains in pilot phase. Saudi Arabia's participation is significant but does not guarantee they will actually price oil in non-dollar currencies.",
        },
        {
          id: "dollar-structural-advantages",
          title: "Dollar Dominance Rests on Institutional Foundations CBDCs Cannot Replicate",
          description:
            "The US dollar's reserve currency status is supported by factors that no CBDC can replicate: the depth and liquidity of US Treasury markets ($25 trillion outstanding), the legal enforceability of dollar contracts under US courts, the Federal Reserve's role as global lender of last resort, 80 years of institutional trust, and the absence of capital controls. China's capital controls, opaque legal system, and politicized central bank make the digital yuan fundamentally unsuitable as a reserve currency regardless of its technical capabilities.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Federal Reserve; BIS Quarterly Review; Brookings Institution",
          sourceUrl: "https://www.brookings.edu/articles/the-dollar-and-the-future-of-the-international-monetary-system/",
          reasoning:
            "The structural analysis of dollar dominance is well-established in international economics literature. The institutional foundations — legal system, capital market depth, central bank credibility — are not technical capabilities that can be replicated by CBDC technology. However, the argument addresses current structural advantages, and long-term erosion through gradual diversification remains a possibility.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
