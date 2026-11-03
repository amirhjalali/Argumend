import type { TopicInput } from "@/lib/schemas/topic";

export const cryptocurrencyRegulationData = {
  id: "cryptocurrency-regulation",
  title: "Crypto Regulation: Wall Street's Rules or Its Own?",
  question:
    "Should crypto get its own lighter rulebook, or follow the same rules as stocks and banks?",
  meta_claim:
    "Crypto should be held to the same rules as traditional finance: securities law for tokens sold as investments and bank-grade rules for anyone holding customers' money, not a lighter regime written for the industry.",
  status: "contested" as const,
  category: "economics" as const,
  // As of 3 November 2026: the GENIUS Act (stablecoins) was signed on 18 July
  // 2025 and takes effect on 18 January 2027, with the OCC's final rule out on
  // 21 October 2026; the CLARITY Act (market structure) passed the House on
  // 17 July 2025 but failed a Senate cloture vote 49-50 on 15 September 2026;
  // the SEC proposed "Regulation Crypto Assets" on 18 August 2026 after a
  // March 2026 interpretive release that most tokens are not securities.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "On 15 September 2026 the Senate voted 49–50 against taking up the CLARITY Act, the bill that would split crypto oversight between the SEC and the CFTC, after talks over ethics rules for officials' own crypto holdings broke down. The stablecoin law Congress did pass, the GENIUS Act, takes effect on 18 January 2027. The fight is over whether crypto needs a rulebook of its own, and whom that rulebook would protect.",
    confidence: 92,
    source:
      "Decrypt, 'Clarity Act fails Senate hurdle' (15 September 2026); Office of the Comptroller of the Currency, News Release 2026-92 (21 October 2026)",
    sourceUrl: "https://decrypt.co/378283/clarity-act-fails-senate-hurdle",
  },
  simple_case: [
    "The answer bears on whether a saver who buys a token gets the disclosures a stock buyer gets, whether a dollar stablecoin is as safe as a bank deposit, and whether America's crypto business stays onshore.",
  ],
  aliases: [
    "Should crypto be regulated like traditional financial instruments?",
    "Should cryptocurrency be regulated like traditional finance?",
    "Is the CLARITY Act good for crypto investors?",
    "Is the SEC going too easy on crypto?",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Clarity Act fails Senate hurdle — Decrypt (15 Sept 2026)",
      url: "https://decrypt.co/378283/clarity-act-fails-senate-hurdle",
    },
    {
      title: "Senate fails to advance the CLARITY Act: Top points — DLA Piper (Sept 2026)",
      url: "https://www.dlapiper.com/en/insights/publications/2026/09/senate-fails-to-advance-the-clarity-act",
    },
    {
      title: "OCC Advances U.S. Digital Asset Leadership with Final Rule to Implement GENIUS Act — OCC News Release 2026-92",
      url: "https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html",
    },
    {
      title: "Statement on Regulation Crypto Assets — SEC Chairman Paul Atkins (18 Aug 2026)",
      url: "https://www.sec.gov/newsroom/speeches-statements/atkins-statement-regulation-crypto-assets-081826",
    },
    {
      title: "SEC Cryptocurrency Enforcement: 2025 Update — Cornerstone Research",
      url: "https://www.cornerstone.com/insights/research/sec-cryptocurrency-enforcement-2025-update/",
    },
    {
      title: "The next-generation monetary and financial system — BIS Annual Economic Report 2025, Chapter III",
      url: "https://www.bis.org/publ/arpdf/ar2025e3.htm",
    },
    {
      title: "Crypto-assets (Markets in Crypto-Assets Regulation, MiCA) — European Commission",
      url: "https://finance.ec.europa.eu/digital-finance/crypto-assets_en",
    },
    {
      title: "FTX Collapse: A Summary — Congressional Research Service",
      url: "https://crsreports.congress.gov/product/pdf/IF/IF12301",
    },
    {
      title: "Why Stablecoins Fail: A Look at Terra — Federal Reserve Bank of Richmond",
      url: "https://www.richmondfed.org/publications/research/economic_brief/2022/eb_22-24",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did the FTX collapse prove crypto needs regulation, or that existing oversight failed?",
      content:
        "FTX held licences in the Bahamas, Japan and Australia and still lost over $8 billion of customer money after it was moved to its founder's trading firm, Alameda Research. One reading: crypto lacked the custody and segregation rules a US broker lives under. The other: FTX broke fraud laws that already existed, and its founder was convicted under them. Would bank-and-broker rules have stopped it, or only given customers a false sense of safety?",
    },
    {
      id: "q2",
      title: "Is a stablecoin as safe as a bank deposit?",
      content:
        "From 18 January 2027 the GENIUS Act requires dollar stablecoins to hold 100% reserves in cash or short-term Treasuries, publish their reserves monthly and put holders first in a bankruptcy. They get no deposit insurance, and the Bank for International Settlements says stablecoins 'perform poorly' as the mainstay of a monetary system. Is a fully reserved token safer than a bank, or a run waiting for a trigger?",
    },
    {
      id: "q3",
      title: "Why did the CLARITY Act stall in the Senate?",
      content:
        "The House passed the CLARITY Act 294–134 in July 2025, and the Senate Banking Committee advanced it in May 2026. On 15 September 2026 a vote to take it up failed 49–50. Talks had broken down over stablecoin rewards, illicit-finance safeguards and ethics rules for officials' crypto holdings, including the President's. Bills not enacted by January 2027 must start again in the new Congress.",
    },
    {
      id: "q4",
      title: "Has the SEC stopped policing crypto?",
      content:
        "The SEC brought 13 crypto actions in 2025, down from 33 in 2024, by Cornerstone Research's count, and dropped its case against Coinbase. Its chairman says the old approach was 'regulation by enforcement' that 'actively undermined capital formation', and in 2026 the agency proposed exemptions letting token projects raise up to $75 million a year. Is that the end of an overreach, or a regulator standing down?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The losses — would ordinary financial rules have stopped them?
    // =========================================================================
    {
      id: "consumer-protection-vs-innovation",
      title: "The Losses: Would Ordinary Rules Have Stopped Them?",
      short_summary:
        "FTX lost over $8 billion of customer money in 2022, Terra/Luna erased about $40 billion in a week, and thieves took more than $3.4 billion in 2025, $1.5 billion of it from one exchange, Bybit. One side says these are the harms securities and banking law exist to prevent. The other says licensing did not stop FTX and tough US rules only pushed builders to Dubai and Singapore.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "FTX is the case against, not for, more of the same rules. It held licences in the Bahamas, Japan and Australia, employed compliance staff and lobbied Washington for regulation, and it still collapsed, because its founder took customer money, a crime under laws that already existed and for which he was convicted. Licensing did not catch it. What US policy did do from 2021 to 2024 was sue first and explain later: the SEC brought 46 crypto actions in 2023 alone while refusing to say how a token exchange could register. Firms read the signal. Coinbase opened an international exchange in Bermuda, and Binance, OKX and Crypto.com took licences from Dubai's Virtual Assets Regulatory Authority, a regime written for crypto with anti-money-laundering rules and disclosures. The lesson is not that crypto needs no rules. It is that rules written for a stockbroker in 1934 fit a token network badly, and that builders move toward clear, tailored regimes like the EU's MiCA, not toward chaos.",
      proponent_rebuttal:
        "The losses are not a mystery that needs new theory. FTX lost over $8 billion because it mixed customer money with its owner's trading firm, the exact thing US broker-dealer custody and segregation rules forbid. Terra's UST was sold to retail savers in South Korea and Southeast Asia as a stable dollar with a 20% yield, with no reserves behind it, and about $40 billion vanished in a week. Thieves took $3.8 billion in 2022 and more than $3.4 billion in 2025, $1.5 billion of it from a single exchange, Bybit, and North Korea's hackers took at least $2.02 billion of the 2025 total. Every one of these is a custody, disclosure or reserve failure, and every one has a rule in traditional finance aimed at it. The Securities Act of 1933 was written after a crash for the same reasons. 'Tailored rules' in practice has meant lighter rules, and a market that moves to whichever regulator asks least is running a race to the bottom, not finding the right balance.",
      crux: {
        id: "regulation-innovation-tradeoff",
        title: "The Licensing Test",
        question:
          "Do licensing and custody rules cut crypto customer losses, or just push the business offshore?",
        description:
          "If licensed regimes (MiCA in the EU, Singapore, Dubai's VARA) show lower customer losses per dollar held than unlicensed venues, and builders stay rather than leave, the case for holding crypto to ordinary financial rules is strong. If losses simply follow firms wherever they go, and the main effect of strict rules is to move the business abroad, the trade-off is real.",
        methodology:
          "Compare customer losses from fraud, insolvency and theft per dollar of customer assets across regimes: the US before and after 2025, the EU under MiCA (fully in force from December 2024), Singapore, Dubai and offshore venues with no licensing. Track developer counts, venture funding and new launches in the same places. Separate theft by state hackers, which licensing may not stop, from losses caused by a firm's own misuse of customer money, which custody rules target.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Customer losses per dollar held, split into theft and a firm's own misuse of customer money, measured across MiCA, Singapore, Dubai, the US and unlicensed offshore venues, alongside developer and funding counts in each.",
        },
        cost_to_verify:
          "$500K-1.5M (multi-jurisdiction study; loss data from bankruptcy filings, Chainalysis and regulators)",
        falsification: {
          supporter_flip:
            "If licensed venues under MiCA, Singapore and Dubai lost customers as much per dollar held as unlicensed ones, and the main effect of strict rules was to move developers and funding abroad, the case that ordinary financial rules protect crypto customers would weaken.",
          skeptic_flip:
            "If venues bound by custody and segregation rules lost far less customer money than unlicensed ones, and builders stayed in licensed markets rather than leaving, the claim that such rules mostly drive the business offshore would be hard to hold.",
          common_ground:
            "Both sides agree crypto customers lost billions through FTX, Terra/Luna and hacks, that FTX held licences abroad when it failed, and that its founder was convicted under existing fraud law.",
          live_disagreement:
            "Whether the losses came from missing rules that traditional finance already has, or from crimes no licence would have caught, and so whether stricter rules protect customers or mostly move the business abroad.",
        },
      },
      evidence: [
        {
          id: "ftx-collapse-losses",
          title: "FTX lost over $8 billion of customer money despite licences in three countries (2022)",
          description:
            "In November 2022 FTX, then the third-largest crypto exchange, collapsed after customer funds were found to have been moved to Alameda Research, the trading firm controlled by its founder, Sam Bankman-Fried. Over $8 billion of customer money was missing. FTX held licences in the Bahamas, Japan and Australia and had lobbied Washington for crypto regulation. Bankman-Fried was convicted of fraud in 2023.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Congressional Research Service, 'FTX Collapse: A Summary'; U.S. Department of Justice; SEC",
          sourceUrl: "https://crsreports.congress.gov/product/pdf/IF/IF12301",
          reasoning:
            "Shows the harm the same-rules side points to: mixing customer money with a house trading firm, which US broker custody rules forbid. It cuts both ways, which is why directness is 7: FTX was licensed abroad, and the fraud was caught and punished under laws that already existed.",
        },
        {
          id: "terra-luna-death-spiral",
          title: "Terra/Luna lost about $40 billion in a week; the 'stablecoin' had no reserves (May 2022)",
          description:
            "In May 2022 TerraUSD (UST), an 'algorithmic' stablecoin held at a dollar by minting and burning its sister token Luna rather than by reserves, lost its peg. About $40 billion of market value vanished in under a week. Retail savers in South Korea and Southeast Asia, drawn by the Anchor Protocol's roughly 20% yield on UST, took much of the loss. No regulator had authority to stop its sale.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Federal Reserve Bank of Richmond, Economic Brief 22-24 (2022)",
          sourceUrl: "https://www.richmondfed.org/publications/research/economic_brief/2022/eb_22-24",
          reasoning:
            "A product sold as a safe dollar with no reserve behind it is what reserve rules exist to stop, and the GENIUS Act now bans that design for payment stablecoins. It shows the harm; it does not show which regime, a bank-style one or a crypto-specific one like GENIUS, is the right fix.",
        },
        {
          id: "chainalysis-2025-thefts",
          title: "Thieves took over $3.4 billion in crypto in 2025, $1.5 billion from Bybit alone (Chainalysis)",
          description:
            "Chainalysis counted 'over $3.4 billion in theft from January through early December 2025', with 'the February compromise of Bybit alone accounting for $1.5 billion of that total.' It found that 'North Korean hackers stole at least $2.02 billion in cryptocurrency' in 2025, with DPRK attacks 'accounting for a record 76% of all service compromises.' In 2022 a record $3.8 billion was stolen, $3.1 billion of it from DeFi protocols.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          source: "Chainalysis, 2026 Crypto Crime Report: hacking and stolen funds (18 December 2025)",
          sourceUrl: "https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2026/",
          reasoning:
            "Shows losses are still large three years after FTX. Directness is 5 because most of 2025's theft was by a state hacking unit, which custody and licensing rules may not stop; independence is 6 because Chainalysis sells the surveillance tools its reports argue for.",
        },
        {
          id: "defi-hack-statistics-2022",
          title: "DeFi protocols accounted for $3.1 billion of the record $3.8 billion stolen in 2022",
          description:
            "Chainalysis found that a record $3.8 billion in crypto was stolen in 2022, 82.1% of it, about $3.1 billion, from DeFi protocols; cross-chain bridge hacks made up 64% of that. The largest, the Ronin Bridge hack (about $625 million), was attributed to North Korea's Lazarus Group. DeFi protocols typically have no insurance and no way to recover stolen funds.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 5,
          },
          source: "Chainalysis, '2022 Biggest Year Ever For Crypto Hacking'",
          sourceUrl: "https://www.chainalysis.com/blog/2022-biggest-year-ever-for-crypto-hacking/",
          reasoning:
            "Code exploits are a security failure, not a disclosure failure, so whether securities-style rules would have prevented them is unclear; directness is 5. It does show that users of protocols with no responsible party bear the whole loss.",
        },
        {
          id: "sec-enforcement-action-chilling",
          title: "SEC brought 46 crypto actions in 2023 as Coinbase opened an offshore exchange in Bermuda",
          description:
            "The SEC filed 46 crypto-related enforcement actions in 2023, against exchanges such as Coinbase and Binance.US, token issuers and DeFi projects, without a registration path written for crypto exchanges. Over the same period Coinbase launched an international exchange in Bermuda, Gemini expanded in Singapore and Ripple shifted its focus to markets outside the US. US-based developers cited regulatory uncertainty as a leading concern in industry surveys.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source: "SEC Crypto Assets and Cyber Enforcement Actions; industry developer surveys",
          sourceUrl: "https://www.sec.gov/spotlight/cybersecurity-enforcement-actions",
          reasoning:
            "The timing fits the claim that enforcement without rules pushed firms abroad, but causation is hard to show: firms also move for tax and market access. Independence is 5 because much of the migration evidence comes from the industry itself.",
        },
        {
          id: "dubai-singapore-regulatory-arbitrage",
          title: "Binance, Bybit, OKX and Crypto.com took Dubai licences under a crypto-specific regime",
          description:
            "Dubai's Virtual Assets Regulatory Authority (VARA) and Singapore's Payment Services Act set licensing regimes written for crypto businesses, with anti-money-laundering rules and consumer disclosures but a wider range of permitted activity than the US allowed. Binance, Bybit, OKX and Crypto.com obtained Dubai licences, and Singapore has licensed more than 20 crypto service providers.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "Dubai VARA; Monetary Authority of Singapore",
          sourceUrl: "https://www.vara.ae/en/",
          reasoning:
            "Shows firms choosing a regulated home rather than none: they want rules, just different ones. Whether those regimes protect customers as well as US rules would, or are simply more permissive, is what the crux asks, so directness is 6. Bybit, a VARA licensee, lost $1.5 billion to hackers in 2025.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Is a token a security? The SEC's 2026 answer
    // =========================================================================
    {
      id: "regulatory-framework-design",
      title: "Is a Token a Security? The SEC Changes Its Answer",
      short_summary:
        "Under Gary Gensler the SEC said most tokens were securities under the 1946 Howey test. In March 2026 the SEC, joined by the CFTC, said four kinds of crypto asset are not securities, and in August it proposed exemptions letting token projects raise up to $75 million a year. Courts had split: one judge said XRP sold on exchanges was not a security, another said Howey 'makes no such distinction.'",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The Howey test asks whether buyers expect profits 'from the efforts of others.' For Bitcoin there is no other: no issuer, no company, no board. Ethereum's move to proof-of-stake was carried out by a dispersed community. Forcing every token into securities law produced absurd results, the clearest being SEC v. Ripple, where Judge Analisa Torres ruled in July 2023 that XRP sold to institutions was a security but XRP bought by the public on exchanges was not: the same token, two answers. Coinbase petitioned the SEC in July 2022 to write rules it could register under; the SEC refused and sued it in 2023, then dropped the case in February 2025. In March 2026 the SEC itself, joined by the CFTC, said digital commodities, collectibles, tools and GENIUS-compliant stablecoins are not securities, and its August 2026 proposal offers a safe harbor once an issuer stops the managerial work buyers relied on. That is the regulator conceding the old framework did not fit.",
      proponent_rebuttal:
        "Most tokens were sold the way stocks are: a team raised money, promised to build, and buyers paid in expecting the price to rise from that work. That is Howey's text. Judge Jed Rakoff said so in SEC v. Terraform in July 2023, holding that securities law reaches 'novel devices like the digital assets at issue here' and rejecting the Ripple line between institutional and exchange buyers: 'Howey makes no such distinction between purchasers.' Much of the 'decentralization' is cosmetic, with founders and foundations holding large shares of governance tokens. The SEC's 2026 turn is a change of leadership, not a discovery about the law: the same statute, read by a new chairman who calls past cases 'regulation by enforcement'. An exemption letting a project raise $75 million a year with lighter disclosure gives token buyers less protection than a small-company stock buyer gets, for an asset class with a long record of insider dumping.",
      crux: {
        id: "securities-law-applicability",
        title: "The Howey Test Applicability Assessment",
        question:
          "Do enough tokens fall outside existing securities law to require new, crypto-specific rules?",
        description:
          "If most tokens, at the point of sale, meet all four Howey prongs (investment of money, common enterprise, expectation of profit, from the efforts of others), existing securities law already fits and the push for crypto-specific rules is about lighter treatment. If a large share of real tokens have no identifiable promoter driving their value, a new framework is needed. The SEC's March 2026 release takes the second view; the Terraform ruling the first.",
        methodology:
          "Apply the Howey test to the top 100 tokens by market value, at first sale and in current trading. For each, record whether money was raised from buyers, whether a team or foundation still does the work buyers rely on, and how concentrated token holdings are. Sort them into clearly securities, clearly not, and genuinely ambiguous, and compare the result with the SEC's 2026 categories.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A token-by-token Howey analysis of the top 100 tokens by market value, at first sale and in current trading, counting how many fit, fail or fall into a genuinely ambiguous middle, set beside the SEC's March 2026 categories.",
        },
        cost_to_verify:
          "$300K-800K (legal and economic analysis of the top 100 tokens; sale records and holdings are largely public)",
        falsification: {
          supporter_flip:
            "If a token-by-token Howey analysis of the top 100 found a large middle of tokens with no team or foundation still doing the work buyers rely on, the case that existing securities law fits tokens would weaken, and bespoke rules would look necessary rather than lenient.",
          skeptic_flip:
            "If the same analysis found most top tokens were sold in raises where buyers paid a team expecting its work to lift the price, and that team still held large shares, the claim that tokens fall outside securities law would look like litigation strategy rather than economics.",
          common_ground:
            "Both sides agree some tokens, like a team-promoted coin sold to fund development, plainly meet the Howey test, while Bitcoin, with no issuer, plainly strains it, and that the US had no registration path written for crypto exchanges.",
          live_disagreement:
            "How large the genuinely ambiguous middle is, and so whether the SEC's 2026 categories and exemptions recognize something new or exempt investments from the protection their buyers would otherwise get.",
        },
      },
      evidence: [
        {
          id: "sec-2026-interpretive-release",
          title: "SEC and CFTC: four kinds of crypto asset are not securities (March 2026)",
          description:
            "On 17 March 2026 the SEC issued an interpretive release (No. 33-11412), joined by the CFTC, identifying four categories of crypto asset, 'digital commodities', 'digital collectibles', 'digital tools' and 'payment stablecoins', that will not be treated as securities. Digital securities stay under securities law, and other assets are not securities unless sold as part of an investment contract. A non-security token can leave securities law when the investment contract 'no longer exists or terminates', for instance once the issuer finishes the managerial work it promised.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 4,
            replicability: 6,
            directness: 7,
          },
          source:
            "SEC Release No. 33-11412 (17 March 2026), as summarized by Greenberg Traurig, 'SEC Clarifies Status of Crypto Assets Under Federal Securities Laws' (March 2026)",
          sourceUrl:
            "https://www.gtlaw.com/en/insights/2026/3/sec-clarifies-status-of-crypto-assets-under-federal-securities-laws-signals-potential-exemptive-and-safe-harbor-framework",
          reasoning:
            "The regulator itself now says much of the market falls outside securities law, which is the strongest official support for a separate framework. Independence is 4: it is the view of a commission whose new leadership was appointed to change course, an interpretation can be reversed by the next one, and no court has tested it.",
        },
        {
          id: "sec-regulation-crypto-assets-2026",
          title: "SEC proposes letting token projects raise up to $75 million a year under lighter rules (August 2026)",
          description:
            "On 18 August 2026 the SEC proposed 'Regulation Crypto Assets'. Chairman Paul Atkins described 'a \"startup exemption,\" which would allow for offerings up to $5 million during a four-year period' and 'a \"fundraising exemption\" allowing for offerings of up to $75 million each year', with 'financial statements that must be audited at certain capital raising thresholds.' Under a safe harbor, 'the Commission would no longer deem the non-security crypto asset to be subject to an investment contract' once the issuer certifies 'that it has ceased or terminated all essential managerial efforts.' Atkins said the agency had 'actively undermined capital formation' through 'regulation by enforcement.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 4,
            replicability: 5,
            directness: 6,
          },
          source: "SEC Chairman Paul S. Atkins, 'Statement on Regulation Crypto Assets' (18 August 2026)",
          sourceUrl:
            "https://www.sec.gov/newsroom/speeches-statements/atkins-statement-regulation-crypto-assets-081826",
          reasoning:
            "Shows what a crypto-specific regime looks like in practice: disclosure and audits scaled to the raise, and an exit from securities law. It is a proposal, not a rule, and the chairman's own case for it, so independence is 4. Whether $75 million a year with lighter disclosure protects buyers enough is what the other side disputes.",
        },
        {
          id: "ripple-sec-lawsuit-outcome",
          title: "Ripple ruling: XRP was a security when sold to institutions, not when bought on exchanges (2023)",
          description:
            "In SEC v. Ripple Labs, Judge Analisa Torres ruled in July 2023 that XRP sold directly to institutional investors was a security, because those buyers expected profits from Ripple's efforts, but XRP sold on public exchanges was not, because those buyers did not know they were buying from Ripple. Both sides dropped their appeals in 2025, ending the five-year case and leaving the split ruling in place.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source: "SEC v. Ripple Labs, Inc. (S.D.N.Y.); SEC complaint (2020)",
          sourceUrl: "https://www.sec.gov/litigation/complaints/2020/comp-pr2020-338.pdf",
          reasoning:
            "The same token getting two answers depending on who bought it is the clearest sign that Howey fits tokens awkwardly. Replicability is 5 because another judge in the same court rejected the distinction weeks later, and the case ended by settlement, not appeal.",
        },
        {
          id: "terraform-rakoff-existing-law",
          title: "Judge Rakoff: securities law already reaches 'novel devices' like crypto-assets (SEC v. Terraform, 2023)",
          description:
            "Denying Terraform Labs' and Do Kwon's motion to dismiss on 31 July 2023, Judge Jed Rakoff of the Southern District of New York rejected the argument that crypto needed Congress to speak first. The SEC's move against the tokens, he wrote, 'aligns, in fact, with Congress's expectations that the SEC is to regulate \"virtually any instrument that might be sold as an investment\"', 'including novel devices like the digital assets at issue here', and 'there is no indication that Congress intended to hamstring the SEC's ability to resolve new and difficult questions posed by emerging technologies'. He also rejected the Ripple ruling's line between institutional and secondary-market buyers: 'But Howey makes no such distinction between purchasers.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source:
            "SEC v. Terraform Labs Pte. Ltd. and Do Hyeong Kwon, No. 23-cv-1346 (JSR), Opinion and Order (S.D.N.Y. 31 July 2023), ECF 51",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.nysd.594150/gov.uscourts.nysd.594150.51.0.pdf",
          reasoning:
            "A federal court holding that existing law can govern tokens without crypto-specific rules. Replicability is 5: it came at the pleading stage with the SEC's allegations taken as true, it split from Ripple, and the SEC has since moved the other way, so it is one strong judicial reading rather than settled law.",
        },
        {
          id: "gensler-vs-atkins-sec-approach",
          title: "Post-Gensler SEC shifted from suing crypto firms to writing rules, dropping the Coinbase case (2025)",
          description:
            "Under Chair Gary Gensler (2021-2025) the SEC sued Coinbase in June 2023 as an unregistered exchange, broker and clearing agency, after denying Coinbase's July 2022 petition asking it to write crypto rules. After Gensler left, Acting Chair Mark Uyeda set up a Crypto Task Force, and on 27 February 2025 the Commission dismissed the Coinbase case with no fine, citing that policy work. Chair Paul Atkins, sworn in that April, carried the shift into the 2026 interpretive release and proposed exemptions.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 8,
            directness: 6,
          },
          source: "SEC, Coinbase dismissal release (27 February 2025)",
          sourceUrl: "https://www.sec.gov/newsroom/press-releases/2025-47",
          reasoning:
            "Documents that the SEC dropped a flagship case on policy grounds, not after losing in court. That supports the claim that the old approach lacked a fitting rulebook, but it equally shows how fast a regulator's view of the same statute can swing with a new chairman, which is the other side's point; directness is 6.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Stablecoins and the banking system
    // =========================================================================
    {
      id: "financial-stability-systemic-risk",
      title: "Stablecoins: Safe Digital Dollars or the Next Bank Run?",
      short_summary:
        "Dollar stablecoins hold their reserves mostly in Treasury bills, tying crypto to the market that funds the US government. The GENIUS Act, in force from 18 January 2027, requires 100% reserves and puts holders first in a bankruptcy, but gives no deposit insurance. The 2022 crash barely touched stocks and bonds; the question is whether that would hold for a run on a large stablecoin.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Crypto's worst year so far shows how contained it is. About $2 trillion of crypto market value vanished in 2022, Terra, Celsius, Voyager and FTX all failed, and stock, bond and currency markets showed no measurable contagion; the S&P 500's fall that year came from inflation and rate rises. Silvergate and Signature failed in 2023 from concentrated depositors and interest-rate risk, ordinary bank failures. Congress has now written a stablecoin law that answers the run worry directly, without forcing issuers into bank charters: the GENIUS Act requires 100% reserves in cash or short-term Treasuries, monthly public disclosure of reserves and redemption within two business days under the OCC's final rule, and it puts holders ahead of all other creditors in an insolvency. A fully reserved token with no lending is safer than a bank that lends out deposits. Bolting bank capital rules and deposit-insurance machinery onto it would add cost without adding safety.",
      proponent_rebuttal:
        "A stablecoin is a promise to pay a dollar on demand, which is what a bank deposit is, and history says such promises get runs. USDC lost its peg in March 2023 when $3.3 billion of its reserves were stuck at Silicon Valley Bank. Terra's collapse took down Three Arrows Capital, Celsius, Voyager and, months later, FTX. The link to the core system is now direct: the Bank for International Settlements found stablecoin holdings of US Treasuries 'on par with large jurisdictions and government money market funds', and that 'a $3.5 billion increase in stablecoin market capitalisation can already depress Treasury yields' by 2.5 to 5 basis points. A run would mean forced selling in that market. The BIS concluded that stablecoins 'perform poorly' on the tests for sound money and have been 'the go-to choice for illicit use'. The GENIUS Act's OCC rule sets a capital floor of $5 million, a fraction of what a bank of the same size must hold. 'Too small to matter' was said of subprime in 2006.",
      crux: {
        id: "systemic-risk-threshold",
        title: "The Stablecoin Run Test",
        question:
          "Could a run on a large stablecoin now spread into banks and the Treasury market?",
        description:
          "If a run on a large, fully reserved stablecoin could be met from its reserves without forcing a fire sale of Treasury bills or pulling deposits from banks, GENIUS-style rules are enough and bank-grade regulation is unnecessary. If modelling shows a run would force sales big enough to move Treasury yields or drain bank deposits, stablecoins need the backstops banks have.",
        methodology:
          "Map where the largest stablecoins hold reserves (Treasury bills, repo, bank deposits, money market funds) from their monthly disclosures. Stress-test a run of 10%, 25% and 50% of outstanding coins in a week against Treasury-bill market depth, using the BIS estimate of yield effects, and against the deposit base of the banks holding reserves. Compare with the runs on prime money market funds in 2008 and 2020.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Redemption waves of 10%, 25% and 50% in one week, modelled from issuers' monthly reserve disclosures against how many T-bills dealers can absorb and the deposits of the lenders holding issuers' cash.",
        },
        cost_to_verify:
          "$1-3M (supervisory stress test; reserve disclosures become monthly and public under the GENIUS Act)",
        falsification: {
          supporter_flip:
            "If stress tests showed a run of half a large stablecoin's coins in a week could be paid from reserves without moving Treasury yields or draining bank deposits, the case for bank-grade rules on stablecoins would weaken.",
          skeptic_flip:
            "If stress tests showed a run on one large stablecoin would force Treasury-bill sales big enough to move yields, or pull deposits from the banks that hold its cash, the claim that 100% reserves make stablecoins safe without bank backstops would weaken.",
          common_ground:
            "Both sides agree the 2022 crypto crash caused huge losses inside crypto with little measurable spillover into stock, bond or currency markets, and that stablecoin reserves now tie crypto to the Treasury market.",
          live_disagreement:
            "Whether 100% reserves and a holder-first bankruptcy rule make a stablecoin run harmless, or whether a stablecoin is a deposit in all but name and needs the capital and backstops banks carry.",
        },
      },
      evidence: [
        {
          id: "bis-systemic-risk-warning",
          title: "BIS 2025: stablecoins 'perform poorly' as money, and $3.5 billion of growth can move Treasury yields",
          description:
            "In its Annual Economic Report of 29 June 2025, the Bank for International Settlements said 'stablecoins perform poorly when assessed against the three tests for serving as the mainstay of the monetary system' (singleness, elasticity and integrity), and that they 'have been the go-to choice for illicit use to bypass integrity safeguards.' It found stablecoin investment in US Treasuries 'on par with large jurisdictions and government money market funds', citing evidence that 'a $3.5 billion increase in stablecoin market capitalisation can already depress Treasury yields' by about 2.5 to 5 basis points. Over 99% of stablecoins are dollar-denominated.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Bank for International Settlements, Annual Economic Report 2025, Chapter III, 'The next-generation monetary and financial system' (29 June 2025)",
          sourceUrl: "https://www.bis.org/publ/arpdf/ar2025e3.htm",
          reasoning:
            "The yield effect is a measured link between stablecoin growth and the Treasury market, the channel a run would travel. Independence is 6 because the BIS is the central banks' own body and the same chapter argues for tokenized central-bank money as the alternative; the yield estimate is about inflows, so the size of a run's effect is an extrapolation.",
        },
        {
          id: "genius-act-reserve-rules",
          title: "GENIUS Act: 100% reserves, monthly disclosure and holders first in bankruptcy, in force from January 2027",
          description:
            "President Trump signed the GENIUS Act on 18 July 2025, after the House passed it 308–122 on 17 July. The White House said it requires '100% reserve backing with liquid assets like U.S. dollars or short-term Treasuries', monthly public disclosure of reserve composition, and 'prioritizes stablecoin holders' claims over all other creditors' if an issuer fails. The OCC's final rule of 21 October 2026 requires redemption 'within two business days', notice to the OCC within 24 hours if redemptions exceed 10% of a coin's issuance in a day, stress testing, and a capital floor of $5 million. The law and the rule take effect on 18 January 2027.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source:
            "White House fact sheet on the signing of the GENIUS Act (18 July 2025); House Clerk, Roll Call 200 (17 July 2025); OCC News Release 2026-92 (21 October 2026); Skadden, 'OCC Finalizes GENIUS Act Rule' (October 2026)",
          sourceUrl:
            "https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html",
          reasoning:
            "Shows a crypto-specific regime aimed squarely at run risk, short of a bank charter. It is a rulebook, not a track record: none of it is in force until 2027, and the $5 million capital floor and lack of deposit insurance are exactly what the other side calls too thin; directness is 6.",
        },
        {
          id: "stablecoin-reserve-composition",
          title: "USDC lost its dollar peg when $3.3 billion of reserves were stuck at Silicon Valley Bank (March 2023)",
          description:
            "The largest stablecoins, Tether's USDT and Circle's USDC, hold most of their reserves in US Treasury bills, repo and money market funds, with some cash at banks. In March 2023, when Silicon Valley Bank failed with about $3.3 billion of USDC's reserves on deposit, USDC briefly lost its dollar peg until the government guaranteed SVB's deposits. A sudden run could force issuers to sell Treasury bills quickly.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source: "Tether attestation reports; Circle disclosures; Federal Reserve",
          sourceUrl: "https://tether.to/en/transparency/",
          reasoning:
            "The one real-world run test so far: a fully reserved coin still broke the buck when its bank failed, and recovered only because the government backstopped the bank. Replicability is 6 because Tether's attestations are not full audits, and the episode was small next to today's market.",
        },
        {
          id: "terrausd-collapse-contagion",
          title: "Terra's collapse brought down Three Arrows, Celsius and Voyager within weeks (2022)",
          description:
            "The May 2022 collapse of TerraUSD set off a chain of failures inside crypto: Three Arrows Capital, a hedge fund with about $10 billion under management, became insolvent on its Luna exposure; Voyager Digital and Celsius Network froze customer withdrawals; and confidence in FTX eroded until it failed that November. The chain stayed largely inside crypto.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Bank for International Settlements, Working Paper 1066; Federal Reserve Financial Stability Report",
          sourceUrl: "https://www.bis.org/publ/work1066.htm",
          reasoning:
            "Shows contagion can run fast through leveraged, interlinked crypto firms, the pattern systemic risk takes. Directness is 5 because the chain did not reach banks or Treasury markets, which is the question here.",
        },
        {
          id: "silvergate-signature-bank-failures",
          title: "Crypto-heavy banks Silvergate and Signature failed in March 2023 as crypto deposits fled",
          description:
            "Silvergate Bank wound down voluntarily in March 2023 and Signature Bank was seized by regulators the same month. Both had concentrated crypto-industry deposits that crypto firms pulled after the 2022 crash. Signature's failure was then the third-largest in US history and part of the March 2023 banking panic that also took down Silicon Valley Bank.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source: "FDIC; Federal Reserve",
          sourceUrl: "https://www.fdic.gov/resources/resolutions/bank-failures/",
          reasoning:
            "A real channel from crypto into banks, through deposits. Directness is 6 because both banks also had ordinary weaknesses (interest-rate risk, uninsured and concentrated depositors), so crypto was one cause among several.",
        },
        {
          id: "2022-crash-no-traditional-spillover",
          title: "Crypto lost about $2 trillion in 2022 with no measurable spillover into stocks or bonds",
          description:
            "Crypto market value fell from about $2.9 trillion in November 2021 to under $800 billion by the end of 2022. Stock, bond, interbank and currency markets showed no crypto-driven disruption; the S&P 500's 2022 decline is attributed to inflation and Federal Reserve rate rises. Even the FTX collapse had no detectable effect on traditional asset prices.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "Federal Reserve Financial Stability Report; International Monetary Fund",
          sourceUrl: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
          reasoning:
            "The largest crypto crash so far was a natural experiment, and the wider system shrugged it off. Directness is 7 because 2022's links were smaller than today's: stablecoin Treasury holdings and spot bitcoin ETFs have grown since.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Who writes the rules — conflicts of interest
    // =========================================================================
    {
      id: "conflicts-of-interest",
      title: "Who Writes the Rules, and Who Profits?",
      short_summary:
        "The SEC's crypto cases fell from 33 in 2024 to 13 in 2025. The President pardoned Binance's founder in October 2025, months after an Emirati-backed fund paid $2 billion into Binance in the Trump family venture's stablecoin. The CLARITY Act then stalled in the Senate over ethics rules for officials' own crypto. One side sees a rulebook bent by money; the other, an overdue end to regulation by lawsuit.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The enforcement drop is a policy change voters chose, not a scandal. Cornerstone Research, which counted the fall from 33 SEC crypto actions in 2024 to 13 in 2025, attributes it to 'a shift in enforcement priorities', the same shift the new leadership announced. The dropped cases leaned on a theory, that tokens traded on exchanges are securities, on which federal judges had split, with Ripple rejecting it. The SEC chairman's case is that the old approach 'actively undermined capital formation' and pushed firms abroad, and the remedy is the rulebook it is now writing in public, with comment periods and audits. The CLARITY Act did not fail because the industry owns Congress: it passed the House 294–134, advanced through the Senate Banking Committee with two Democrats, and fell 11 votes short after Republicans offered divestment or blind trusts for officials, language the President approved. Clear rules written by Congress are the opposite of favours handed out case by case.",
      proponent_rebuttal:
        "A lighter rulebook is being written while the people writing it profit from what it governs. In October 2025 the President pardoned Changpeng Zhao, Binance's founder, who had pleaded guilty to federal money-laundering charges in 2023; earlier that year Binance took a $2 billion investment paid in USD1, the stablecoin of the Trump family's World Liberty Financial, which CNBC reported had generated around $4.5 billion since the 2024 election. SEC crypto penalties in 2025 were under 3% of 2024's. When the CLARITY Act reached the Senate floor, its ethics rules covered only new tokens issued by officials, not existing ventures or ongoing memecoins, let officials keep trading crypto, expired on 20 January 2029, and gave enforcement only to a Justice Department run by the President's appointee. Eighteen state attorneys general warned it would 'embolden scammers' and strip their power to protect investors in a field where states have brought more than 330 anti-fraud actions since 2017. Same rules for everyone is the only answer that does not depend on trusting who is in charge.",
      crux: {
        id: "enforcement-retreat-merits",
        title: "The Dropped-Cases Test",
        question:
          "Were the SEC crypto cases dropped since 2025 legally weak, or dropped as a political favour?",
        description:
          "If the cases the SEC dismissed or stopped bringing after January 2025 rested on theories courts had rejected or doubted, the retreat is a correction. If comparable cases were winning in court when they were dropped, and the firms that benefited had financial or political ties to the administration, it is a favour. The values question underneath, whether officials may profit from an industry they regulate, no case file settles.",
        methodology:
          "List every SEC crypto case dismissed, settled for no penalty or closed since January 2025. For each, record the legal theory, how courts had ruled on that theory (Ripple, Terraform, Coinbase motion rulings), the stage reached, and any documented financial or political links between the defendant and administration officials. Compare outcomes for linked and unlinked defendants with the same theory.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A case-by-case record of SEC crypto matters closed since January 2025: the legal theory, how courts had ruled on it, the stage reached, and any documented ties between the defendant and officials, comparing linked and unlinked defendants.",
        },
        cost_to_verify:
          "$50K-200K (court dockets, SEC releases and financial disclosures are public; ties between firms and officials need investigative reporting)",
        falsification: {
          supporter_flip:
            "If the dropped cases mostly rested on the exchange-sales theory a federal judge had rejected in Ripple, and defendants with no ties to officials got the same treatment as those with ties, the charge that the rulebook was bent by money would weaken.",
          skeptic_flip:
            "If cases built on theories courts had upheld were dropped mid-stream, and firms with documented financial links to officials fared better than unlinked firms facing the same theory, the claim that the retreat corrected an overreach would be hard to hold.",
          common_ground:
            "Both sides agree SEC crypto enforcement fell sharply in 2025, that the President pardoned Binance's founder, and that the CLARITY Act stalled in the Senate over ethics rules for officials' crypto holdings.",
          live_disagreement:
            "Whether the retreat from enforcement corrected cases that never fit the law, or eased the way for firms tied to those in power, and whether officials who profit from crypto should help write its rules at all.",
        },
      },
      evidence: [
        {
          id: "cornerstone-2025-enforcement-drop",
          title: "SEC crypto actions fell from 33 in 2024 to 13 in 2025, a 60% drop (Cornerstone Research)",
          description:
            "Cornerstone Research reported on 22 January 2026: 'After bringing a total of 33 cryptocurrency-related actions in 2024, the SEC initiated only 13 actions in 2025.' It said 'This 60% decrease reflects a shift in enforcement priorities.' Five of the 2025 actions were filed before Chair Gary Gensler left in January. Penalties against digital-asset market participants totalled $142 million, under 3% of 2024's total.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Cornerstone Research, 'SEC Cryptocurrency Enforcement: 2025 Update' (22 January 2026)",
          sourceUrl:
            "https://www.cornerstone.com/insights/research/sec-cryptocurrency-enforcement-2025-update/",
          reasoning:
            "An independent count of how far enforcement fell. Directness is 5: a drop in cases is consistent with both readings, a correction of overreach or a regulator standing down, and Cornerstone itself attributes it to changed priorities rather than to the merits of particular cases.",
        },
        {
          id: "cz-pardon-usd1",
          title: "Trump pardoned Binance founder Zhao in October 2025, after Binance took $2 billion in the family venture's stablecoin",
          description:
            "On 23 October 2025 the White House said President Trump had pardoned Changpeng Zhao, Binance's founder, who 'pleaded guilty to federal money laundering charges in 2023', was sentenced to four months and was released in September 2024. Earlier in 2025 Binance received a $2 billion investment 'paid in USD1', the dollar stablecoin of World Liberty Financial, the Trump family's crypto business, with which Binance is involved. CNBC reported World Liberty 'has generated around $4.5 billion since last year's presidential election.' Trump said he did not believe he had met Zhao.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "Engadget, 'Binance founder Changpeng Zhao lands a Trump pardon' (23 October 2025), citing the White House, Reuters and CNBC",
          sourceUrl:
            "https://www.engadget.com/big-tech/binance-founder-changpeng-zhao-lands-a-trump-pardon-174929498.html",
          reasoning:
            "Documents a financial tie between a pardoned crypto executive's firm and the President's family business. It does not show the pardon was bought, which no public record establishes, and a pardon is not an SEC rule, so directness to the rulebook question is 5.",
        },
        {
          id: "clarity-act-senate-stall",
          title: "CLARITY Act passed the House 294–134 but failed in the Senate 49–50 over ethics rules (2025–26)",
          description:
            "The House passed the Digital Asset Market Clarity Act on 17 July 2025 by 294 to 134. It would define the SEC's and CFTC's roles and, Decrypt reported, largely legalize most US crypto activity. The Senate Banking Committee advanced it in May 2026 with all its Republicans and two Democrats. On 15 September 2026 a cloture vote to take it up failed 49–50; all Democrats voting and Republicans Susan Collins, Josh Hawley, Jerry Moran and Thom Tillis (who switched for procedural reasons) voted no. Talks had broken down over stablecoin rewards, illicit-finance safeguards and ethics rules covering the President's crypto interests; Republicans' last offer required covered officials to divest or use a blind trust. DLA Piper noted the ethics provision would have expired on 20 January 2029 and left enforcement to the Justice Department alone.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "House Clerk, Roll Call 199 (17 July 2025); Decrypt, 'Clarity Act fails Senate hurdle' (15 September 2026); DLA Piper, 'Senate fails to advance the CLARITY Act: Top points' (September 2026)",
          sourceUrl: "https://decrypt.co/378283/clarity-act-fails-senate-hurdle",
          reasoning:
            "Shows the crypto-specific rulebook stalled on conflicts of interest, which supports the worry that it was being written around officials' holdings. It cuts the other way too: the bill won large bipartisan House support and Republicans moved toward divestment, so the stall reflects a live negotiation, not proof of capture.",
        },
        {
          id: "state-ags-clarity-warning",
          title: "18 state attorneys general warned the CLARITY Act would 'embolden scammers' (2026)",
          description:
            "A bipartisan group of 18 state attorneys general, led by New York's Letitia James, warned that the Senate bill would 'embolden scammers and potentially strip attorneys general of our authority to protect our states' investors', by letting the SEC override state registration and anti-fraud requirements. States have brought more than 330 digital-asset anti-fraud actions since 2017. Seven Democratic Senate negotiators said the bill 'must be strengthened', and Senator Elizabeth Warren said it 'still fails to adequately protect investors.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source: "DLA Piper, 'Senate fails to advance the CLARITY Act: Top points' (September 2026)",
          sourceUrl:
            "https://www.dlapiper.com/en/insights/publications/2026/09/senate-fails-to-advance-the-clarity-act",
          reasoning:
            "The state count shows existing fraud law was being used against crypto, and preemption would narrow it. Independence is 5: attorneys general are defending their own authority, and the Democratic senators quoted opposed the bill.",
        },
      ],
    },
  ],
} satisfies TopicInput;
