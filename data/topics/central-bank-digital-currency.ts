import type { TopicInput } from "@/lib/schemas/topic";

export const centralBankDigitalCurrencyData = {
  id: "central-bank-digital-currency",
  title: "Central Bank Digital Currencies: Digital Cash or Surveillance Tool?",
  question:
    "Is a digital dollar or digital euro a surveillance tool, or digital cash worth having?",
  meta_claim:
    "Central bank digital currencies are a threat rather than a needed tool: at home they would let governments watch and program how citizens spend, abroad China's digital yuan is a lever against the dollar, and they offer little that mobile money and private digital payments do not already provide.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: the US bars federal agencies from promoting a CBDC
  // (Executive Order 14178, 23 January 2025) and the House passed the
  // Anti-CBDC Surveillance State Act 219-210 on 17 July 2025; the ECB moved to
  // the next phase of the digital euro on 30 October 2025 (pilot from mid-2027,
  // possible first issuance in 2029), the Council set its position on 17
  // December 2025 and Parliament authorised negotiations on 9 July 2026; China
  // reclassified the e-CNY as deposit liabilities in January 2026; mBridge
  // volume reached $55.49 billion (Atlantic Council, May 2026).
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In January 2025 an executive order barred US federal agencies from any action 'to establish, issue, or promote' a central bank digital currency, and in July the House voted 219–210 to ban one. Europe is going the other way: the ECB plans a digital euro pilot from mid-2027 and a possible first issuance in 2029, once EU lawmakers finish the law now in negotiation. The fight is over whether a central bank's digital money can be kept private, and whether anyone needs it.",
    confidence: 92,
    source:
      "White House, Executive Order 14178, 'Strengthening American Leadership in Digital Financial Technology' (23 January 2025); House Clerk, Roll Call 201 (17 July 2025); European Central Bank press release (30 October 2025)",
    sourceUrl:
      "https://www.ecb.europa.eu/press/pr/date/2025/html/ecb.pr251030~8c5b5beef0.en.html",
  },
  simple_case: [
    "The answer bears on what a government could see of everyday spending, on whether Europeans get a public alternative to card networks and dollar stablecoins, and on whether China's digital yuan loosens the dollar's grip on trade.",
    "Both sides accept that today's payments are already watched and that a CBDC's privacy depends on how it is built. They split over whether any design can stay private under political pressure, and whether public digital money offers anything private money does not.",
  ],
  aliases: [
    "Would central bank digital currencies enable unprecedented surveillance?",
    "Would a digital dollar or digital euro let governments watch and control how people spend?",
    "Should central banks issue digital currency?",
    "Is a digital dollar a good idea?",
    "Is the digital euro a surveillance tool?",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "ECB moves to next phase of digital euro project — European Central Bank (30 Oct 2025)",
      url: "https://www.ecb.europa.eu/press/pr/date/2025/html/ecb.pr251030~8c5b5beef0.en.html",
    },
    {
      title: "Digital euro — European Parliament Legislative Train (updated 20 Sept 2026)",
      url: "https://www.europarl.europa.eu/legislative-train/theme-an-economy-that-works-for-people/file-digital-euro",
    },
    {
      title: "Strengthening American Leadership in Digital Financial Technology — Executive Order 14178 (23 Jan 2025)",
      url: "https://www.whitehouse.gov/presidential-actions/2025/01/strengthening-american-leadership-in-digital-financial-technology/",
    },
    {
      title: "Central Bank Digital Currency Tracker — Atlantic Council (May 2026)",
      url: "https://www.atlanticcouncil.org/cbdctracker/",
    },
    {
      title: "The next-generation monetary and financial system — BIS Annual Economic Report 2025, Chapter III",
      url: "https://www.bis.org/publ/arpdf/ar2025e3.htm",
    },
    {
      title: "Central Bank Digital Currencies: Foundational Principles — Bank for International Settlements",
      url: "https://www.bis.org/publ/othp33.htm",
    },
    {
      title: "Nigeria's eNaira, One Year After — IMF Working Paper WP/23/104",
      url: "https://www.elibrary.imf.org/view/journals/001/2023/104/article-A001-en.xml",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Could a CBDC let a government freeze or restrict people's money?",
      content:
        "Money issued by a central bank as code could, in principle, expire, be limited to certain shops or be frozen. China has tested digital-yuan stimulus that expires and can be spent only in set districts. Canada froze about 280 financial products during the 2022 convoy protests through ordinary banks, without court orders. The ECB says a digital euro would have cash-like privacy for small offline payments. Is the risk built into the technology, or a choice each design can refuse?",
    },
    {
      id: "q2",
      title: "Why did the US ban a digital dollar while Europe builds a digital euro?",
      content:
        "Executive Order 14178 of 23 January 2025 prohibits US agencies from any action to 'establish, issue, or promote' a CBDC, and the House passed the Anti-CBDC Surveillance State Act 219–210 in July 2025; the US backs private dollar stablecoins under the GENIUS Act instead. The ECB plans a digital euro pilot from mid-2027 and possible issuance in 2029, arguing Europe needs public digital money of its own. Which bet protects people better?",
    },
    {
      id: "q3",
      title: "Do CBDCs help the unbanked more than mobile money does?",
      content:
        "Kenya's M-Pesa and India's UPI brought hundreds of millions into digital payments without a CBDC. Nigeria's eNaira, launched in October 2021, was used by fewer than 1% of Nigerians by 2023. The Bahamas' SandDollar offers a wallet that needs no ID documents. Only three countries have fully launched a retail CBDC. Does a central bank's money reach people private systems miss?",
    },
    {
      id: "q4",
      title: "Is the digital yuan a threat to the dollar?",
      content:
        "mBridge, a cross-border platform for central-bank digital currencies, handled $55.49 billion of transactions by the Atlantic Council's May 2026 count, with the e-CNY over 95% of settlement. The dollar still dominates reserves, currency trading and trade invoicing. Could CBDC rails let countries trade around US sanctions?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Surveillance & Control
    // =========================================================================
    {
      id: "surveillance-control",
      title: "Can Digital Money From a Central Bank Be Private?",
      short_summary:
        "A CBDC would put a central bank's money in a digital wallet, and code can, in principle, make money expire, limit where it is spent or freeze it. China has tested exactly that with digital-yuan stimulus. The ECB promises cash-like privacy for small offline digital-euro payments, short of full anonymity. The dispute is whether privacy can be built into the system or only promised by rules a later government can change.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The surveillance fears confuse what a CBDC could be with what democracies are building. Designs run from cash-like to fully traced, and the leading one protects privacy by design: the ECB's digital euro would offer offline payments where only payer and payee know the details, minimal identity checks for small amounts, and no way for the ECB to link payments to named people. The European Parliament's economic committee voted 43–14 in June 2026 to negotiate a digital euro that complements cash for online and offline payments. Where voters feared a CBDC, they stopped it: the US barred federal work on one in January 2025. And today's money is already watched. Banks report large and suspicious transactions to governments, card networks log every purchase, and Canada froze protesters' accounts in 2022 through ordinary banks with no CBDC at all. A well-designed CBDC moves who holds the data; it does not create surveillance that does not already exist.",
      proponent_rebuttal:
        "Today's system lets a government investigate you after the fact, with legal process and a bank in the middle. A CBDC lets it write rules into the money itself, ahead of time, with no one in between. China has already done it: digital-yuan stimulus with expiry dates to force spending, and money usable only in set districts or for approved categories. Canada's 2022 freeze of about 280 financial products, under emergency powers and without court orders, shows how fast a democracy reaches for the tool in a crisis; a CBDC would make such freezes instant and precise. The ECB's own design stops short of anonymity even offline, citing money-laundering rules, and its online payments would be about as private as a card. A privacy promise written into law can be rewritten after a terrorist attack or a pandemic. The only protection that lasts is a system where watching is technically impossible, and no central bank has deployed one.",
      crux: {
        id: "privacy-architecture-test",
        title: "The Architectural Privacy Assessment",
        question:
          "Can any CBDC design make surveillance technically impossible, not just restricted by rules?",
        description:
          "If cryptographic designs, such as zero-knowledge proofs or offline bearer tokens, can give transaction privacy that even the central bank cannot break, the surveillance worry becomes a design choice rather than a property of CBDCs. If every design that meets anti-money-laundering law keeps the technical ability to see and block payments, privacy is only as durable as the next government's politics.",
        methodology:
          "Have independent cryptographers and privacy engineers review each published CBDC design, starting with the ECB's digital euro rulebook and the e-CNY's tiered wallets. For each, record whether privacy is enforced by cryptography (the operator cannot see or link payments) or by access controls (it can, but rules say it must not). Test each against three scenarios: a government demand for all transaction data, a pandemic tracing order, and a political crisis targeting opposition funding.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An independent cryptographic review of the digital euro, the e-CNY and other published designs, tested against a government demand for payment records, recording whether the math blocks the operator or only an access rule does.",
        },
        cost_to_verify:
          "$1-3M (technical review with red-team exercises; depends on central banks publishing their designs in full)",
        falsification: {
          supporter_flip:
            "If an independent review found a deployed CBDC design, such as offline bearer tokens built on zero-knowledge proofs, that left the issuing central bank unable to see or freeze individual payments, the claim that CBDCs mean unprecedented surveillance would become a claim about bad designs rather than about CBDCs.",
          skeptic_flip:
            "If every design that meets anti-money-laundering law, including the digital euro's offline mode, turned out to keep the operator's ability to see and block payments, and more pilots tested expiring or restricted money as the e-CNY did, the fears would be hard to dismiss.",
          common_ground:
            "Both sides agree today's financial system is already heavily watched, that China has tested programmable restrictions on digital-yuan stimulus, and that a CBDC's privacy depends on whether protections are built into the cryptography or only written into rules.",
          live_disagreement:
            "Whether any CBDC that obeys anti-money-laundering law can be built so the state cannot watch it, or whether privacy in any such design is a promise the next government can withdraw.",
        },
      },
      evidence: [
        {
          id: "china-digital-yuan-programmability",
          title: "China's digital yuan has been tested with stimulus money that expires and works only in set districts",
          description:
            "China's e-CNY has been piloted with programmable features: stimulus payments with expiry dates that force spending within a set period, money usable only in specific districts or cities, and subsidies limited to approved merchant categories. By December 2025 the retail e-CNY had processed more than 3.4 billion transactions worth about 16.7 trillion renminbi (about $2.3 trillion), and in January 2026 the People's Bank of China reclassified it as deposit liabilities, the Atlantic Council reports.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Atlantic Council, Central Bank Digital Currency Tracker (updated May 2026); People's Bank of China pilot reports",
          sourceUrl: "https://www.atlanticcouncil.org/cbdctracker/",
          reasoning:
            "The one large CBDC in use has done what opponents fear, so directness is high. Independence is 6 because much of what is known comes from Chinese official sources, and China is an authoritarian state whose choices say less about what a democracy's CBDC would do.",
        },
        {
          id: "ecb-digital-euro-privacy",
          title: "ECB's digital euro design: cash-like privacy for small offline payments, but not anonymity",
          description:
            "The European Central Bank's digital euro design gives 'cash-like' privacy to low-value offline payments, where details are known only to payer and payee; tiered identity checks, with less data for small payments; and a commitment that the ECB could not link payments to identified people. It stops short of full anonymity even offline, citing anti-money-laundering and counter-terrorist-financing rules, and online payments would be about as private as card payments. The ECB says 'a digital euro will preserve Europeans' freedom of choice and privacy.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "European Central Bank, digital euro pages and press release of 30 October 2025",
          sourceUrl: "https://www.ecb.europa.eu/euro/digital_euro/html/index.en.html",
          reasoning:
            "The most serious democratic design on the table, with privacy built in for offline use. Independence is 5 because it is the issuer describing its own future system; the law that would bind it is still being negotiated, and its online privacy rests on access rules, not cryptography.",
        },
        {
          id: "ep-econ-digital-euro-2026",
          title: "European Parliament committee voted 43–14 to negotiate a digital euro for online and offline use (June 2026)",
          description:
            "On 23 June 2026 the European Parliament's ECON committee adopted its position on the digital euro proposal 'by 43 votes to 14, with 1 abstention' and opened negotiations with EU governments, which had set their own position on 17 December 2025. The plenary endorsed starting talks on 9 July 2026. The committee's position treats the digital euro as complementary to cash for both online and offline payments. Holding limits had not yet been discussed at political level.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source: "European Parliament, Legislative Train Schedule, 'Digital euro' (updated 20 September 2026)",
          sourceUrl:
            "https://www.europarl.europa.eu/legislative-train/theme-an-economy-that-works-for-people/file-digital-euro",
          reasoning:
            "Shows elected legislators, not only the central bank, setting the rules, which is the democratic check the other side doubts will hold. Directness is 4: a committee vote is not a privacy guarantee, and the final text, including any privacy safeguards, is not yet written.",
        },
        {
          id: "canada-trucker-convoy-financial-freeze",
          title: "Canada froze about 280 financial products worth about $8 million in the 2022 convoy protests, without court orders",
          description:
            "During the 2022 Freedom Convoy protests Canada invoked the Emergencies Act, and its Emergency Economic Measures Order let banks and other providers freeze protesters' funds 'without the need for a court order'. Deputy Prime Minister Chrystia Freeland told Parliament on 14 June 2022 that the measures led to 'the freezing of approximately 280 financial products' as of 21 February, 'for a total of approximately $8,000,000, including $3,800,000 from a payment processor.' This went through the existing banking system, not a CBDC.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 8,
            directness: 5,
          },
          source: "Department of Finance Canada, remarks by the Deputy Prime Minister and Minister of Finance (14 June 2022)",
          sourceUrl: "https://www.canada.ca/en/department-finance/news/2022/06/remarks-by-the-deputy-prime-minister-and-minister-of-finance.html",
          reasoning:
            "The government's own account of a democracy freezing protesters' money without a judge. Independence is 6 because it is the government describing its own action, and directness is 5 because it happened without a CBDC, which cuts both ways: it shows the danger, and that today's system already allows it.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Financial Inclusion & Efficiency
    // =========================================================================
    {
      id: "financial-inclusion-efficiency",
      title: "Does a CBDC Reach People Mobile Money Misses?",
      short_summary:
        "About 1.4 billion adults have no bank account. Supporters of CBDCs say a central bank wallet on a basic phone could reach them and cut remittance fees. But Kenya's M-Pesa and India's UPI brought hundreds of millions into digital payments without a CBDC, Nigeria's eNaira reached fewer than 1% of Nigerians, and only three countries have fully launched a retail CBDC.",
      icon_name: "Users" as const,
      skeptic_premise:
        "CBDCs could matter most to the 1.4 billion adults with no bank account. A central bank wallet on a basic phone needs no branch, no credit history and no minimum balance, and it is public money that cannot fail the way a private provider can. The Bahamas launched its SandDollar in October 2020 after banks closed branches on the outer islands, with a basic wallet that needs no identity documents at all, the barrier that keeps many poor people out of banking. The World Bank puts the average cost of sending a remittance at about 6%, and direct links between CBDCs could improve on that sharply. When US COVID-19 relief went out in 2020, payments took weeks and millions of unbanked people waited longest or never got them; a public wallet could reach everyone in seconds.",
      proponent_rebuttal:
        "The inclusion case for CBDCs is a solution looking for a problem. Kenya's M-Pesa runs on text messages from basic phones, and by 2016 'almost every single household in Kenya' used it; a study in Science (Suri and Jack, 2016) found that among households living on under $1.25 a day, nearly one in ten got enough of a boost to escape extreme poverty. India's UPI handles billions of payments a month through private apps on public rails. Neither needed a CBDC. Where CBDCs were launched for inclusion, people stayed away: Nigeria's eNaira was used by fewer than 1% of Nigerians by 2023 despite cash-withdrawal limits meant to push people onto it, and the SandDollar was less than 1% of Bahamian currency in circulation by 2023. Of 146 countries exploring a CBDC, only three have fully launched one. People are unbanked because of poverty, missing ID and distrust, and a central bank wallet fixes none of those while adding a state ledger of spending.",
      crux: {
        id: "cbdc-vs-existing-inclusion",
        title: "The CBDC vs. Existing Solutions Comparison",
        question:
          "Do CBDCs expand financial inclusion beyond what existing mobile-money systems already do?",
        description:
          "If a CBDC's central-bank backing, light-ID wallets and interoperability reach people that mobile money and bank apps miss, at lower cost, the inclusion case is real. If countries with mature mobile-money systems reach the unbanked as well or better, a CBDC adds the surveillance risk without an offsetting benefit.",
        methodology:
          "Compare inclusion outcomes in CBDC countries (the Bahamas' SandDollar, Nigeria's eNaira, Jamaica's JAM-DEX) with mobile-money leaders (Kenya, India, the Philippines): share of previously unbanked adults now using digital payments, transaction and remittance costs, and how fast emergency payments reach people. Control for income, ID coverage and prior infrastructure.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A comparison of CBDC pilots (the Bahamas' SandDollar, Nigeria's eNaira, Jamaica's JAM-DEX) with mobile-money countries (Kenya, India, Philippines) on unbanked adults reached, transaction and remittance costs, and crisis payment speed.",
        },
        cost_to_verify:
          "$500K-1.5M (multi-country comparative inclusion study)",
        falsification: {
          supporter_flip:
            "If a central-bank-backed, universally interoperable unit delivered crisis payments to every citizen in seconds, where private, fragmented mobile-money networks and weeks-late COVID checks fell short, the inclusion benefits would weigh against the surveillance worry.",
          skeptic_flip:
            "If a controlled multi-country comparison found M-Pesa and India's UPI reaching the unbanked and cutting remittance costs as well as a CBDC, the inclusion rationale would shrink to redundancy, leaving the surveillance and disintermediation risks with no offsetting benefit.",
          common_ground:
            "Both sides agree that financial inclusion is a real and valuable goal and that the unbanked are largely excluded by poverty, missing ID, and distrust rather than by a lack of digital-currency technology.",
          live_disagreement:
            "Whether a CBDC's central-bank backing, light-ID wallets and interoperability reach people that mobile money and bank apps miss, or only duplicate them while adding a state record of spending.",
        },
      },
      evidence: [
        {
          id: "mpesa-financial-inclusion",
          title: "M-Pesa reached almost every Kenyan household by text message and lifted nearly 1 in 10 of the poorest out of extreme poverty, no CBDC needed",
          description:
            "Safaricom's M-Pesa, launched in 2007, runs money transfers and savings over text messages on basic phones; NPR reported in 2016 that 'almost every single household in Kenya uses it.' In the study by Suri and Jack (Science, 2016), among households living on less than $1.25 a day, 'nearly 1 in 10 got enough of a boost to lift them out of extreme poverty', and women-led households with access to many M-Pesa agents 'set aside 22 percent more in savings between 2008 and 2014.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "NPR, Goats and Soda (9 December 2016); Suri & Jack, Science 354:1288 (2016)",
          sourceUrl: "https://www.npr.org/sections/goatsandsoda/2016/12/09/504540392/dial-m-for-money-can-mobile-banking-lift-people-out-of-poverty",
          reasoning:
            "The best-studied case of digital financial inclusion, and it needed no central bank money, which undercuts inclusion as a reason to accept a CBDC. Directness is 7 because Kenya had conditions (one dominant carrier, a large agent network) not every country shares.",
        },
        {
          id: "nigeria-enaira-adoption-struggles",
          title: "Nigeria's eNaira was used by fewer than 1% of Nigerians two years after launch (IMF, 2023)",
          description:
            "Nigeria launched the eNaira in October 2021, one of the first CBDCs in a large economy. Despite heavy promotion, including limits on cash withdrawals meant to push people toward digital money, fewer than 1% of Nigerians were actively using it by 2023. People cited distrust of government and preferred existing mobile money.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "IMF Working Paper WP/23/104, 'Nigeria's eNaira, One Year After' (2023); Central Bank of Nigeria",
          sourceUrl: "https://www.elibrary.imf.org/view/journals/001/2023/104/article-A001-en.xml",
          reasoning:
            "The largest real test of a CBDC built for inclusion, and people stayed away even under pressure. Nigeria's particular trust problems may not generalize to every country.",
        },
        {
          id: "sanddollar-no-id-wallet",
          title: "The Bahamas' SandDollar offers a wallet that needs no ID documents",
          description:
            "Central Bank of The Bahamas staff (Branch, Ward and Wright, Intereconomics, 2023) write that after many international banks wound up their operations on the outer islands, \"leaving the residents there without access to banking services,\" the bank launched the SandDollar in October 2020 \"to provide a payments solution for those who do not have access to banking services.\" Its entry tier targets the missing-ID barrier directly: \"Tier 1, or basic wallet, does not require the user to submit any KYC documents,\" with holdings capped at 500 SandDollars. Uptake has been modest: \"just over 100,000 wallets\" by March 2023, while SandDollars \"still represent less than 1% of the total Bahamian dollars in circulation.\"",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 5,
          },
          source:
            "Branch, Ward & Wright (Central Bank of The Bahamas), 'The Evolution of SandDollar,' Intereconomics 58(4):178–184 (2023)",
          sourceUrl:
            "https://www.intereconomics.eu/contents/year/2023/number/4/article/the-evolution-of-sanddollar.html",
          reasoning:
            "The strongest concrete case for this side is a design feature, not a measured outcome: a central-bank wallet that a person without identity documents can open, aimed at islands that lost their bank branches. It is weighted low. The authors work for the issuing central bank, the article reports wallets rather than how many previously unbanked people now use one, adoption is under 1% of currency in circulation, and nothing in it shows a light-ID tier that a mobile-money provider could not offer.",
        },
        {
          id: "only-three-retail-launches",
          title: "Of 146 countries exploring a CBDC, only three have fully launched one (Atlantic Council, May 2026)",
          description:
            "The Atlantic Council's tracker counts '146 countries & currency unions, representing over 98% of global GDP' exploring a CBDC and a record 77 in development, pilot or launch, with 41 pilot projects. Only three, the Bahamas, Jamaica and Nigeria, have fully launched one. The US is the only G20 country not exploring a CBDC.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 4,
          },
          source: "Atlantic Council, Central Bank Digital Currency Tracker (updated May 2026)",
          sourceUrl: "https://www.atlanticcouncil.org/cbdctracker/",
          reasoning:
            "After a decade of research, few central banks have found a retail CBDC worth launching, and the three that did are small or struggling. Directness is 4: slow launches can reflect caution or politics rather than a lack of benefit, and 77 countries are still moving forward.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Geopolitical Dollar Threat
    // =========================================================================
    {
      id: "geopolitical-dollar-threat",
      title: "Could the Digital Yuan Help Countries Trade Around the Dollar?",
      short_summary:
        "mBridge, a platform linking central banks' digital currencies across borders, has grown from $22 million of pilot payments in 2022 to $55.49 billion, with the digital yuan over 95% of its settlement. Supporters of the dollar's position say that is a rounding error next to the trillions cleared through dollar channels every day; others say it is a working route around US sanctions.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The de-dollarization narrative is vastly overstated. The dollar makes up about 58% of global foreign-exchange reserves, sits on one side of nearly nine in ten currency trades and invoices about half of world trade, a position built over 80 years on deep Treasury markets, enforceable contracts, an open capital account and the Federal Reserve's role as lender of last resort. No CBDC copies those foundations. China keeps capital controls and a politically directed central bank, which is why the yuan's share of reserves stays small whatever technology carries it. mBridge's $55.49 billion of cumulative volume, as counted by the Atlantic Council, is small next to the trillions of dollars that move through SWIFT and dollar clearing every day, and the Bank for International Settlements left the project in October 2024. CBDCs may nibble at the edges of dollar dominance; the dollar's advantages are institutional, not technical.",
      proponent_rebuttal:
        "The trend matters more than the stock. mBridge, built with the BIS and the central banks of China, Hong Kong, Thailand and the UAE, settles payments between central banks without SWIFT or a US bank. It processed about $22 million in its 2022 pilot; by May 2026 the Atlantic Council counted $55.49 billion, a 2,500-fold rise, with the digital yuan over 95% of settlement volume. Saudi Arabia joined as a full participant in June 2024. Russia's partial exclusion from SWIFT after it invaded Ukraine showed every government that fears US sanctions why an alternative is worth building, and the BIS's exit in October 2024 left the platform under the governance of its member central banks, with China's the largest. Sanctions power rests on the dollar system being unavoidable. Each billion that settles outside it makes it less so.",
      crux: {
        id: "cbdc-sanctions-evasion-capacity",
        title: "The Sanctions Evasion Capacity Test",
        question:
          "Can cross-border CBDC payments grow large enough to meaningfully blunt US sanctions?",
        description:
          "If CBDC platforms like mBridge can carry a meaningful share of trade between sanctioned and non-sanctioned countries without touching the dollar, US sanctions power is weakened. If they stay small, limited by liquidity, trust in China's governance and the dollar's network effects, they are a niche alternative.",
        methodology:
          "Track transaction volume and value through mBridge and bilateral CBDC links each year against dollar-based cross-border payments. Identify whether payments involving sanctioned states (Russia, Iran, North Korea) move through these platforms, using customs data, sanctions-enforcement cases and central-bank disclosures. Assess liquidity and settlement reliability against dollar channels.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Three years of transaction volume through mBridge and bilateral CBDC links set against SWIFT, and whether Russia, Iran or North Korea actually settle sanctioned trade through them.",
        },
        cost_to_verify:
          "$200K-600K (international payment-flow analysis with sanctions-evasion assessment)",
        falsification: {
          supporter_flip:
            "If multi-year tracking showed CBDC bridges like mBridge plateauing at volumes trivial next to dollar clearing, and sanctioned states such as Russia and Iran finding no usable workaround through them, the 'geopolitical weapon against the dollar' claim would deflate to a marginal development.",
          skeptic_flip:
            "If mBridge kept growing at anything like its 2,500-fold pace since 2022, and payments involving states shut out of SWIFT turned up on CBDC rails, the trajectory rather than today's small volume would make de-dollarization hard to call overstated.",
          common_ground:
            "Both sides agree the dollar dominates reserves and trade settlement by a wide margin today, that mBridge volume has grown fast from a tiny base, and that any challenge to the dollar would come gradually rather than as a sudden displacement.",
          live_disagreement:
            "Whether CBDC rails can grow from tens of billions to a share of trade large enough to blunt US sanctions, or will stay small because the dollar's advantages are institutional rather than technical.",
        },
      },
      evidence: [
        {
          id: "mbridge-cbdc-project",
          title: "mBridge volume rose 2,500-fold to $55.49 billion, with the digital yuan over 95% of settlement (2026)",
          description:
            "mBridge was built by the BIS Innovation Hub with the central banks of China, Hong Kong, Thailand and the UAE to settle cross-border payments directly between central banks' digital currencies, without SWIFT or the dollar. Its 2022 pilot processed 164 payments worth over $22 million. It reached minimum viable product in mid-2024, Saudi Arabia joined in June 2024, and the BIS withdrew in October 2024. The Atlantic Council's May 2026 tracker calls it the fastest-growing CBDC project in the world: 'Transaction volume on the project surged to $55.49 billion,' a 2,500-fold increase since early 2022, with the e-CNY accounting for over 95% of settlement volume.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Atlantic Council, Central Bank Digital Currency Tracker (updated May 2026); Bank for International Settlements, Project mBridge",
          sourceUrl: "https://www.atlanticcouncil.org/cbdctracker/",
          reasoning:
            "Shows a working, fast-growing payment route outside the dollar system, concentrated on the digital yuan. Volume is still small next to daily dollar clearing, and the figures do not show how much, if any, involves sanctioned trade, which is what the crux asks.",
        },
        {
          id: "dollar-structural-advantages",
          title: "The dollar's reserve role rests on deep Treasury markets and open capital flows a CBDC cannot copy",
          description:
            "The dollar's reserve status rests on things no CBDC technology supplies: the depth and liquidity of the US Treasury market (roughly $28-30 trillion of marketable debt in 2024-2025), contracts enforceable in US courts, the Federal Reserve's role as global lender of last resort and the absence of capital controls. China's capital controls and politically directed central bank limit the yuan as a reserve currency whatever form it takes.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Brookings Institution (Ben S. Bernanke, 'The dollar's international role: An \"exorbitant privilege\"?'); BIS Quarterly Review",
          sourceUrl: "https://www.brookings.edu/articles/the-dollars-international-role-an-exorbitant-privilege-2/",
          reasoning:
            "Standard international economics on why reserve status is institutional. It describes today's advantages; it does not rule out slow erosion at the edges, such as payments among countries that fear sanctions.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: If not a CBDC, what? Public money or private stablecoins
    // =========================================================================
    {
      id: "public-vs-private-digital-money",
      title: "If Not a CBDC, What? Public Digital Money or Private Stablecoins",
      short_summary:
        "The US barred federal work on a CBDC in January 2025 and backed private dollar stablecoins under the GENIUS Act instead. The ECB argues Europe needs public digital money so payments do not depend on US card networks and dollar stablecoins. The Bank for International Settlements says stablecoins 'perform poorly' as the base of a monetary system. The dispute is which is the bigger risk: a state that can see your payments, or money run by private firms.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Refusing a CBDC does not take the state out of digital payments; it hands them to private firms with less accountability. Dollar stablecoins are run by companies answerable to shareholders, not voters, and the Bank for International Settlements found in 2025 that stablecoins 'perform poorly' on the tests for sound money and have been 'the go-to choice for illicit use'. For Europe the stakes are sovereignty: if everyday digital payments run on US card networks and dollar stablecoins, the euro area's money depends on choices made in Washington and by American firms. That is why the ECB moved to the next phase of the digital euro in October 2025, why EU governments and the European Parliament's economic committee have both agreed negotiating positions, and why a pilot is planned for mid-2027. A public digital euro with offline, cash-like privacy, set by law and overseen by elected legislators, is more accountable than either a payment app's terms of service or a foreign stablecoin.",
      proponent_rebuttal:
        "The US chose the safer path. Executive Order 14178 of 23 January 2025 lists protecting 'Americans from the risks of Central Bank Digital Currencies' as policy and prohibits agencies 'from undertaking any action to establish, issue, or promote CBDCs', and the House voted 219–210 in July 2025 to ban one. Private digital dollars keep a layer between the state and the citizen: a bank or stablecoin issuer holds the records, the government has to go through it, and a customer can take money elsewhere. A central bank that issues the money and keeps the ledger has no such middle layer. The GENIUS Act, in force from January 2027, gives private stablecoins 100% reserves and holder-first bankruptcy rules, delivering most of what a CBDC promises on speed and cost without a single government database of what every citizen buys.",
      crux: {
        id: "private-alternative-sufficiency",
        title: "The Private Alternative Test",
        question:
          "Do private stablecoins and instant bank payments deliver what a CBDC promises, without the state ledger?",
        description:
          "If regulated stablecoins and instant bank-payment systems give people fast, cheap, private digital payments, and keep holders safe in a crisis, a CBDC adds surveillance risk for little gain. If private alternatives fail on safety, privacy or reach, or leave a country's payments dependent on foreign firms, public digital money fills a real gap.",
        methodology:
          "Compare, from 2027, the US (GENIUS Act stablecoins, FedNow and private instant payments, no CBDC) with the euro area (digital euro pilot, instant euro payments) on: payment cost and speed, share of payments run by non-domestic firms, how often accounts or wallets are frozen and by what legal process, and how holders fare in any stablecoin or provider failure.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "From 2027, side-by-side data from the US (GENIUS Act stablecoins, FedNow, no CBDC) and the euro area (digital euro pilot) on payment costs, freezes and the legal process behind them, foreign firms' share of payments, and holder losses in any failure.",
        },
        cost_to_verify:
          "$200K-500K (comparative payments study; needs the digital euro pilot and GENIUS Act regime to run for a few years)",
        falsification: {
          supporter_flip:
            "If private stablecoins and instant bank payments in the US proved costly, unsafe in a failure, or as easy for the state to watch and freeze as a CBDC would be, the case that skipping a CBDC protects people would weaken.",
          skeptic_flip:
            "If US stablecoins and instant payments matched the digital euro on cost, speed and safety, and freezes still needed court orders while the digital euro's privacy rules were loosened, the case for public digital money would weaken.",
          common_ground:
            "Both sides agree the US has barred federal work on a CBDC and chosen regulated private stablecoins, while the euro area is moving toward a digital euro pilot in 2027, so the two approaches can be compared.",
          live_disagreement:
            "Whether money run by private firms under a law like the GENIUS Act is safer for privacy and freedom than public digital money overseen by elected legislators, which turns on whom people trust more, the state or private intermediaries.",
        },
      },
      evidence: [
        {
          id: "us-eo-14178-anti-cbdc",
          title: "US executive order bars agencies from any action to 'establish, issue, or promote' a CBDC; House votes 219–210 for a ban (2025)",
          description:
            "Executive Order 14178, signed on 23 January 2025, makes it US policy to take 'measures to protect Americans from the risks of Central Bank Digital Currencies (CBDCs)' and states that, 'Except to the extent required by law', agencies 'are hereby prohibited from undertaking any action to establish, issue, or promote CBDCs'. It defines a CBDC as digital money 'denominated in the national unit of account' that 'is a direct liability of the central bank'. On 17 July 2025 the House passed the Anti-CBDC Surveillance State Act 219–210, the same day it passed the GENIUS Act for private stablecoins 308–122.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 4,
            replicability: 8,
            directness: 5,
          },
          source:
            "White House, Executive Order 14178 (23 January 2025); House Clerk, Roll Calls 200 and 201 (17 July 2025)",
          sourceUrl:
            "https://www.whitehouse.gov/presidential-actions/2025/01/strengthening-american-leadership-in-digital-financial-technology/",
          reasoning:
            "Shows the world's largest economy treating a CBDC as a risk to citizens and choosing private stablecoins instead. Independence is 4 and directness 5: it is a political judgment, not evidence about what a CBDC would do, and the near-even House vote shows Congress split.",
        },
        {
          id: "ecb-next-phase-2025",
          title: "ECB moves to the next phase of the digital euro: pilot from mid-2027, possible issuance in 2029 (October 2025)",
          description:
            "On 30 October 2025 the ECB's Governing Council 'decided to move to the next phase of the digital euro project'. It said 'a pilot exercise and initial transactions could take place as of mid-2027' and the Eurosystem 'should then be ready for a potential first issuance of the digital euro during 2029', 'under the assumption that European co-legislators will adopt the Regulation' in 2026. The decision to issue 'will only be taken once the legislation has been adopted.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 6,
            directness: 4,
          },
          source: "European Central Bank press release (30 October 2025)",
          sourceUrl:
            "https://www.ecb.europa.eu/press/pr/date/2025/html/ecb.pr251030~8c5b5beef0.en.html",
          reasoning:
            "Shows a major democratic central bank judging public digital money worth building, under a law legislators must pass. It is the issuer's own decision and a timeline, not evidence that the digital euro will be private or needed, so independence is 5 and directness 4.",
        },
        {
          id: "bis-stablecoins-perform-poorly",
          title: "BIS 2025: stablecoins 'perform poorly' as the base of a monetary system",
          description:
            "The Bank for International Settlements' Annual Economic Report of 29 June 2025 said 'stablecoins perform poorly when assessed against the three tests for serving as the mainstay of the monetary system': singleness (always worth face value), elasticity and integrity. 'Stablecoins also fare poorly on singleness and elasticity,' it wrote, and 'have been the go-to choice for illicit use to bypass integrity safeguards.' It proposed building on tokenised central bank reserves alongside tokenised bank deposits and government bonds.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 5,
            replicability: 6,
            directness: 5,
          },
          source: "Bank for International Settlements, Annual Economic Report 2025, Chapter III (29 June 2025)",
          sourceUrl: "https://www.bis.org/publ/arpdf/ar2025e3.htm",
          reasoning:
            "An authoritative case that the private alternative is weaker as money. Independence is 5 because the BIS speaks for central banks, which would run any public alternative, and directness is 5 because its proposal is for wholesale tokenised reserves, not a retail CBDC.",
        },
      ],
    },
  ],
} satisfies TopicInput;
