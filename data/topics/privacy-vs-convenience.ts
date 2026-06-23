import type { Topic } from "@/lib/schemas/topic";

export const privacyVsConvenienceData = {
  id: "privacy-vs-convenience",
  title: "Have We Already Lost the Battle for Digital Privacy?",
  meta_claim:
    "Meaningful digital privacy is no longer achievable for ordinary citizens — the surveillance infrastructure is too embedded in daily life to resist.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Most people say they care deeply about privacy — then click 'agree' on terms nobody reads and trade their data for free apps. That 'privacy paradox' is the real puzzle, compounded by scale: data brokers already hold thousands of data points on nearly every adult, so the live question is whether individual opt-outs do anything, or whether only regulation can.",
    confidence: 80,
    source:
      "FTC, 'Data Brokers' report (2014); privacy-paradox research (Acquisti; Norberg et al.); Pew privacy surveys",
    sourceUrl:
      "https://www.ftc.gov/reports/data-brokers-call-transparency-accountability-report-federal-trade-commission-may-2014",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The starting puzzle is the 'privacy paradox': in surveys people say they care intensely about privacy, but in practice they click 'I agree' on terms of service nobody reads and trade their data for convenient free apps — so revealed behavior and stated values point in opposite directions.",
    "The deeper problem is scale: data brokers already compile thousands of data points on nearly every adult, tracking follows you across sites and devices, and the claim under debate is that the surveillance infrastructure is now too embedded for an ordinary person to meaningfully escape.",
    "So the honest debate isn't 'do people care about privacy?' (they say they do) but whether individual action can do anything against that infrastructure — or whether, like pollution, it's a collective problem that only regulation, not personal opt-outs, can actually address.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Corporate Data Collection
    // =========================================================================
    {
      id: "corporate-data-collection",
      title: "Corporate Data Collection",
      short_summary:
        "Google, Meta, and thousands of data brokers have built a surveillance economy where opting out is functionally impossible. Even privacy-conscious users leave digital footprints through device fingerprinting, shadow profiles, and cross-site tracking. The question is whether individual opt-out mechanisms are meaningful or merely theater when the entire digital infrastructure is designed around data extraction.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Opting out of corporate data collection is a myth. Google controls 92% of global search, Android runs on 72% of smartphones, and Chrome holds 65% of browser market share — creating an inescapable data funnel. Meta maintains 'shadow profiles' on non-users by harvesting contact lists and tracking pixels embedded across 8.4 million websites. Data brokers like Acxiom, Oracle Data Cloud, and LexisNexis aggregate purchase histories, location data, and public records into profiles covering 99% of US adults. Even users who avoid mainstream platforms are tracked through device fingerprinting (which identifies browsers with 99.1% accuracy according to Mozilla research), ultrasonic cross-device tracking, and cell tower triangulation. The $600 billion digital advertising industry has no viable business model without pervasive surveillance — privacy-preserving alternatives generate a fraction of the revenue.",
      proponent_rebuttal:
        "The 'resistance is futile' framing overstates corporate omniscience and understates both the impact of privacy tools and the genuine value users receive in return. Apple's App Tracking Transparency (ATT) framework, introduced in iOS 14.5, caused Meta to lose an estimated $10 billion in annual advertising revenue because, given a clear choice, only a minority of users (roughly 16-25% globally) opted in to cross-app tracking — proof that consumer agency is real when friction is removed. Firefox and Brave have implemented effective anti-fingerprinting measures, and Signal, Proton, and DuckDuckGo show privacy-respecting alternatives can reach scale (Signal at 40+ million users; Brave past 100 million). The data broker industry faces mounting regulatory pressure: the FTC has acted against Kochava, X-Mode, and InMarket for selling precise location data, and GDPR enforcement has produced over 4 billion euros in fines since 2018. There is also a defensible affirmative case that the exchange is, for many users, a fair trade: ad-supported services like search, maps, email, and social platforms are delivered at zero monetary cost to billions who could not or would not pay subscription prices, and targeted advertising funds journalism, open-source software, and free tools. Corporate data collection is extensive but neither inevitable nor purely extractive — it persists because of regulatory choices and a value exchange many users would rationally accept if it were transparent and consensual.",
      crux: {
        id: "opt-out-effectiveness",
        title: "The Opt-Out Effectiveness Test",
        description:
          "Whether an ordinary user, following best-practice privacy guidance, can reduce their corporate data exposure to a level that meaningfully limits profiling. If privacy tools and opt-out mechanisms reduce trackable data by 80%+ across major platforms, individual agency is real. If corporate tracking reconstructs equivalent profiles regardless of user actions, opt-out is theater.",
        methodology:
          "Recruit 200 participants divided into four groups: (1) default settings on mainstream platforms, (2) maximum privacy settings on mainstream platforms, (3) privacy-focused alternatives only (Signal, Brave, DuckDuckGo, ProtonMail), (4) privacy alternatives plus VPN and ad blockers. Over 6 months, use data subject access requests (GDPR/CCPA) to retrieve all data held by Google, Meta, Amazon, and 10 major data brokers for each participant. Compare profile completeness, accuracy, and advertising category assignments across groups. Measure whether privacy-focused behavior produces meaningfully less detailed profiles.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Participant recruitment, DSAR processing, and comparative data analysis)",
        falsification: {
          supporter_flip:
            "If a controlled study showed that diligent users following best-practice privacy guidance achieve dramatically smaller, less accurate corporate profiles than default users, 'privacy is unachievable for ordinary people' would be wrong — individual agency would meaningfully work.",
          skeptic_flip:
            "A skeptic who says 'just use privacy tools' should weigh that cross-site tracking, device fingerprinting, and data-broker aggregation can rebuild much of a profile even for careful users — so personal opt-out may be closer to theater than to real protection.",
          common_ground:
            "Both sides agree privacy tools (Signal, blockers, VPNs) reduce some tracking and that data brokers aggregate information across many sources.",
          live_disagreement:
            "Whether best-practice individual privacy behavior meaningfully shrinks corporate profiling or whether aggregation reconstructs equivalent profiles regardless — which only a controlled data-subject-access study can measure.",
        },
      },
      evidence: [
        {
          id: "apple-att-impact",
          title:
            "Apple ATT Caused $10B Revenue Loss for Meta, Proving Opt-Out Can Bite",
          description:
            "Apple's App Tracking Transparency, launched in April 2021, required apps to ask permission before tracking users across other apps and websites. 75-85% of users declined tracking. Meta reported a $10 billion annual revenue impact in February 2022, and the broader ad-tech industry saw significant disruption. This demonstrated that when opt-out is clear and frictionless, most users choose privacy — and it has real economic consequences for surveillance business models.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "Meta Q4 2021 Earnings Report; Financial Times Analysis",
          sourceUrl:
            "https://www.ft.com/content/4c19e387-ee1a-41d8-8dd2-bc6c302ee58e",
          reasoning:
            "Meta's own financial disclosures confirm the revenue impact, making this highly reliable. Independence is slightly lower because Apple had competitive motivations (its own advertising business). Directly demonstrates that privacy mechanisms can meaningfully disrupt data collection when implemented at the platform level.",
        },
        {
          id: "shadow-profiles",
          title:
            "Meta Maintains Shadow Profiles on Non-Users via Contact Harvesting",
          description:
            "An academic study (Aguiar, Peukert, Schäfer & Ullrich, 2022) estimated that Facebook is able to track roughly 40% of the web browsing time of both users and non-users, partly because users sharing demographic data lets the platform infer details (such as age and gender) about non-users who never consented. Separately, in April 2018 congressional testimony, Mark Zuckerberg acknowledged that Facebook collects data on people who are not signed up. Data broker Acxiom states in its own marketing materials that it reaches over 2.5 billion of the world's consumers, aggregated from public records, purchase data, and digital tracking — most of whom never directly consented.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "Aguiar, Peukert, Schäfer & Ullrich, 'Facebook Shadow Profiles' (arXiv:2202.04131, 2022); Zuckerberg US Congressional Testimony (April 2018); Acxiom Global Data marketing brochure",
          sourceUrl: "https://arxiv.org/abs/2202.04131",
          reasoning:
            "The 'Facebook Shadow Profiles' working paper is independent academic work; its 40% browsing-time tracking figure is the directly verifiable claim. Zuckerberg's 2018 admission is a matter of public record. The Acxiom 2.5 billion figure is the company's own self-reported marketing claim, so reliability is moderate. Weights were lowered from the prior version because earlier attributions (Northeastern/Max Planck, facial recognition in tagged photos) could not be verified. Shadow profiles still demonstrate that individual opt-out is insufficient when others' behavior exposes you.",
        },
        {
          id: "device-fingerprinting-accuracy",
          title:
            "Browser Fingerprinting Identifies Users with 99%+ Accuracy Without Cookies",
          description:
            "Research from INRIA and Mozilla demonstrated that browser fingerprinting — using combinations of screen resolution, installed fonts, WebGL rendering, timezone, language, and dozens of other browser characteristics — can uniquely identify 99.1% of users without any cookies or login state. Even privacy-focused browsers leak enough information through JavaScript APIs to enable cross-site tracking. Google's proposed Privacy Sandbox and Topics API have been criticized by privacy researchers as replacing third-party cookies with first-party tracking that is harder to block.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "INRIA Research; Mozilla Fingerprinting Study; EFF Panopticlick",
          sourceUrl: "https://coveryourtracks.eff.org/",
          reasoning:
            "Academic research from INRIA and EFF's Panopticlick/Cover Your Tracks are independent and technically rigorous. The 99.1% accuracy finding has been replicated. Demonstrates that cookie-based consent mechanisms address only one tracking vector while more invasive methods persist.",
        },
        {
          id: "privacy-tools-adoption",
          title:
            "Privacy Tools Reaching Meaningful Scale: Brave 100M+ MAU, Signal ~40M",
          description:
            "Privacy-focused alternatives have achieved significant adoption. Brave Software announced in October 2025 that its browser had surpassed 100 million monthly active users (reaching 101 million as of September 30, 2025). Signal reported around 40 million monthly active users (2021 figure), and DuckDuckGo has processed roughly 100 million searches per day. These numbers, while small relative to mainstream platforms (Brave's 100M+ vs Chrome's billions; Signal's ~40M vs WhatsApp's 2B+), demonstrate that privacy-preserving tools can reach meaningful scale and that consumer demand for privacy is real.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Brave Software ('Brave passes 100 million monthly active users'); Signal Foundation (2021 figure); DuckDuckGo",
          sourceUrl: "https://brave.com/blog/100m-mau/",
          reasoning:
            "Usage numbers are largely self-reported by the companies, reducing reliability and independence; the Signal figure in particular dates to 2021. The Brave 100M+ MAU claim is verified via Brave's own October 2025 announcement (101M as of September 30, 2025); the prior 'late 2023' date was incorrect. The scale is real but represents a small fraction of total internet users. Directness is moderate because tool adoption doesn't prove effective privacy protection — users of these tools may still be tracked through other vectors.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Government Surveillance
    // =========================================================================
    {
      id: "government-surveillance",
      title: "Government Surveillance",
      short_summary:
        "The Snowden revelations exposed mass surveillance programs of unprecedented scope, but subsequent reforms have been widely criticized as cosmetic. Section 702 of FISA was reauthorized and expanded in 2024. Five Eyes intelligence sharing circumvents national privacy laws. Meanwhile, facial recognition, license plate readers, and cell-site simulators have proliferated at local and federal levels with minimal oversight.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Post-Snowden reforms were largely cosmetic, and government surveillance capacity has expanded, not contracted, since 2013. Section 702 of FISA — the legal authority for warrantless surveillance of foreign communications that sweeps up vast quantities of domestic data — was reauthorized in April 2024 with expanded scope, not reduced. The NSA's upstream collection program continues to scan internet backbone traffic. Five Eyes intelligence sharing (US, UK, Canada, Australia, New Zealand) allows each nation to collect on the others' citizens and share the data, circumventing domestic legal protections. At the local level, over 3,100 US law enforcement agencies use facial recognition technology, often without warrants or public disclosure. Automated license plate readers capture 200+ million plate scans per month in the US alone. Cell-site simulators (Stingrays) are deployed by at least 75 federal, state, and local agencies. The surveillance infrastructure is bipartisan — built under Bush, expanded under Obama, maintained under Trump, and reauthorized under Biden.",
      proponent_rebuttal:
        "The surveillance picture is more nuanced than a simple expansion narrative. The USA FREEDOM Act (2015) ended bulk phone metadata collection under Section 215 — a genuine structural reform. The FISA Court now has amicus curiae advocates for privacy. Apple and Google implemented default device encryption in 2014-2015, which the FBI's own testimony confirms has locked investigators out of thousands of devices. End-to-end encryption in WhatsApp, Signal, and iMessage protects billions of messages from government access without user action. The EU's GDPR has created extraterritorial privacy protections that constrain even US government contractors. Court rulings like Carpenter v. United States (2018) established that cell-site location data requires a warrant, pushing back on warrantless surveillance. The infrastructure exists, but legal, technical, and political constraints have meaningfully limited its use compared to the pre-Snowden era.",
      crux: {
        id: "surveillance-reform-substance",
        title: "The Surveillance Reform Substance Test",
        description:
          "Whether post-Snowden legal reforms and encryption technologies have meaningfully reduced government access to citizens' private communications and data, or whether surveillance agencies have adapted their methods to maintain equivalent capability through alternative legal authorities and technical workarounds.",
        methodology:
          "Analyze declassified FISA Court opinions and annual transparency reports from 2013 to present to track the volume of surveillance orders and targets over time. Compare pre- and post-reform data collection volumes using the limited public disclosures from the Office of the Director of National Intelligence. Audit law enforcement use of facial recognition, cell-site simulators, and data broker purchases (which circumvent warrant requirements) through FOIA requests to 50 major law enforcement agencies. Interview former intelligence community officials and FISA Court judges about the practical impact of reforms on surveillance operations.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (FOIA litigation, comparative legal analysis, and expert interviews across multiple jurisdictions)",
        falsification: {
          supporter_flip:
            "If declassified records showed post-Snowden reforms and encryption genuinely cut government access to private communications, the 'surveillance is inescapable' thesis would weaken on the state side — reform would have substance, not just optics.",
          skeptic_flip:
            "A skeptic who says nothing changed should weigh that agencies can buy the same data from brokers without a warrant and have adapted via alternative legal authorities — so 'the law was reformed' doesn't establish that real surveillance capability actually fell.",
          common_ground:
            "Both sides agree post-Snowden reforms changed the legal framework and that encryption has spread, while law enforcement increasingly buys broker data to sidestep warrants.",
          live_disagreement:
            "Whether reforms and encryption actually reduced government access or whether agencies maintained equivalent capability through workarounds — which only declassified-record and FOIA analysis over time can show.",
        },
      },
      evidence: [
        {
          id: "section-702-reauthorization",
          title:
            "Section 702 Reauthorized and Expanded in 2024 Despite Privacy Concerns",
          description:
            "In April 2024, Congress passed the Reforming Intelligence and Securing America Act (RISAA), reauthorizing Section 702 of the Foreign Intelligence Surveillance Act for two years (sunset April 2026) and rejecting proposals to require warrants for querying Americans' data swept up in foreign intelligence collection. The reauthorized version expanded the statutory definition of 'electronic communications service provider,' which privacy advocates warned could compel a broader set of entities to assist surveillance. Public ODNI transparency reporting on FBI queries of Section 702 data using US-person identifiers has been marked by large year-over-year swings and acknowledged overcounting, illustrating the opacity of these programs.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source:
            "Congressional Research Service, 'FISA Section 702 and the 2024 Reforming Intelligence and Securing America Act' (R48592); Office of the Director of National Intelligence transparency reports",
          sourceUrl: "https://www.congress.gov/crs-product/R48592",
          reasoning:
            "Official government disclosures and congressional records are highly reliable. The reauthorization with expanded scope directly contradicts the narrative that surveillance is being reined in. The FBI query numbers demonstrate the scale of domestic impact from a program nominally targeting foreigners.",
        },
        {
          id: "carpenter-ruling",
          title:
            "Carpenter v. United States (2018): Supreme Court Requires Warrants for Cell Location Data",
          description:
            "In a landmark 5-4 decision, the Supreme Court held in Carpenter v. United States that the government's acquisition of 127 days of historical cell-site location information constituted a search under the Fourth Amendment requiring a warrant. Chief Justice Roberts wrote that individuals maintain a 'reasonable expectation of privacy in the whole of their physical movements' and that cell phone location data provides 'an intimate window into a person's life.' The decision has been applied by lower courts to restrict warrantless access to other digital records, including IP address logs and email metadata.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 9,
            directness: 8,
          },
          source: "Supreme Court of the United States, 585 U.S. 296 (2018)",
          sourceUrl:
            "https://www.supremecourt.gov/opinions/17pdf/16-402_h315.pdf",
          reasoning:
            "A Supreme Court decision is the highest-reliability legal source. The ruling represents a genuine expansion of Fourth Amendment digital privacy protections and has been applied broadly. Directness is slightly reduced because the ruling applies to law enforcement, not intelligence agencies operating under FISA, which has its own legal framework.",
        },
        {
          id: "facial-recognition-proliferation",
          title:
            "3,100+ US Law Enforcement Agencies Use Facial Recognition, Often Without Warrants",
          description:
            "A 2023 Government Accountability Office report found that 20 of 42 surveyed federal agencies used facial recognition technology, while investigative reporting by the Georgetown Center on Privacy & Technology documented that over 3,100 state and local law enforcement agencies have used Clearview AI's facial recognition system alone. Clearview AI scraped over 30 billion photos from social media and the open web without consent. Only a handful of US jurisdictions (San Francisco, Boston, Portland) have banned government facial recognition use. The technology has documented racial bias — NIST testing found error rates up to 100x higher for Black and Asian faces compared to white faces.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "GAO Report GAO-22-106100; Georgetown COPT; NIST FRVT Report",
          sourceUrl: "https://www.gao.gov/products/gao-22-106100",
          reasoning:
            "GAO reports and NIST testing are authoritative government sources. Georgetown's research is based on public records requests and is independently verifiable. The combination of massive adoption, lack of regulation, documented bias, and non-consensual data scraping demonstrates an expanding surveillance infrastructure with minimal accountability.",
        },
        {
          id: "encryption-as-defense",
          title:
            "Default Encryption on Billions of Devices Has Created Real Government Blind Spots",
          description:
            "Since 2014, Apple and Google have implemented default full-disk encryption on iOS and Android devices. End-to-end encryption in iMessage, WhatsApp (2 billion users), and Signal means that even with a lawful warrant, service providers cannot decrypt message contents — the FBI's long-running 'going dark' campaign reflects that these barriers are real. A cautionary note on the headline numbers: in 2017-2018 the FBI repeatedly told Congress it could not access nearly 7,800 locked devices, but the bureau later admitted a programming error caused 'significant over-counting' and the true figure was likely closer to 1,200-2,000 devices. The technical barrier is genuine even if specific government statistics have been overstated.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "The Washington Post, 'FBI repeatedly overstated encryption threat figures to Congress, public' (May 2018); Apple platform security documentation; WhatsApp Encryption Overview",
          sourceUrl:
            "https://www.washingtonpost.com/world/national-security/fbi-repeatedly-overstated-encryption-threat-figures-to-congress-public/2018/05/22/5b68ae90-5dce-11e8-a4a4-c070ef53f315_story.html",
          reasoning:
            "The technical reality of end-to-end encryption is well-established and independently verifiable. Weights were lowered from the prior version because the original 'thousands of devices / 2023 testimony' framing relied on an FBI figure that was publicly retracted as a large overcount (~7,775 claimed vs ~1,200-2,000 actual). Metadata (who contacts whom, when, where) also remains accessible even with content encryption, and governments invest in endpoint exploitation to circumvent it — so encryption is a real but partial blind spot.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Privacy Nihilism vs Regulation
    // =========================================================================
    {
      id: "privacy-nihilism-vs-regulation",
      title: "Privacy Nihilism vs Regulation",
      short_summary:
        "Privacy nihilism — the belief that digital privacy is already dead and resistance is futile — has become widespread, particularly among younger demographics. Yet GDPR enforcement has extracted billions in fines, California's CCPA has created new consumer rights, and privacy-tech companies are growing. The debate is whether regulatory and technical interventions can restore meaningful privacy or whether the surveillance economy is too entrenched to reform.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Privacy regulation is failing to keep pace with surveillance technology, and the regulatory gap is widening, not closing. GDPR, despite 4+ billion euros in fines since 2018, has not fundamentally changed Big Tech's business model — Google and Meta still derive 80%+ of revenue from targeted advertising in EU markets. Cookie consent banners have become the most visible GDPR impact, and research shows that 'dark patterns' in consent interfaces result in 90%+ acceptance rates, rendering the consent framework meaningless. The California CCPA/CPRA covers only California residents, and attempts at federal US privacy legislation have failed repeatedly since 2012. Meanwhile, surveillance capitalism has expanded into new domains: connected cars collect location and driving behavior, smart home devices record conversations, and health apps share intimate data with advertisers. The 'I have nothing to hide' mentality has normalized pervasive data collection, and younger generations treat privacy loss as an acceptable trade for free services. The regulatory toolkit was designed for a previous era and cannot address an economy where data extraction is the fundamental business model.",
      proponent_rebuttal:
        "The 'privacy is dead' narrative confuses 'privacy is difficult' with 'privacy is impossible' — and it serves the interests of companies that profit from surveillance. GDPR has had measurable structural impact beyond fines: the right to data portability has enabled competitor services, the right to erasure has forced companies to build deletion infrastructure, and the requirement for Data Protection Officers has created an institutional privacy constituency within corporations. The Irish DPC's 1.2 billion euro fine against Meta for EU-US data transfers (2023) forced a fundamental restructuring of transatlantic data flows. Beyond GDPR, privacy regulation is expanding globally: Brazil's LGPD, India's Digital Personal Data Protection Act (2023), and Japan's APPI amendments create a regulatory floor covering billions of people. Technical privacy-enhancing technologies — differential privacy, homomorphic encryption, federated learning, and zero-knowledge proofs — are maturing from academic concepts to deployed products. Apple's privacy features have demonstrated that privacy can be a competitive advantage, not just a regulatory burden. The trajectory is toward more privacy protection, not less.",
      crux: {
        id: "regulatory-behavioral-impact",
        title: "The Regulatory Behavioral Impact Test",
        description:
          "Whether privacy regulations (GDPR, CCPA, and successors) have produced measurable reductions in the volume and intrusiveness of personal data collection, or whether they have merely added compliance bureaucracy without changing surveillance practices. If regulated markets show meaningfully smaller data footprints per user compared to unregulated markets, regulation works. If data collection volumes are equivalent regardless of regulatory regime, the approach has failed.",
        methodology:
          "Compare the data profiles held by major platforms (Google, Meta, Amazon) on users in heavily regulated jurisdictions (EU/GDPR) versus minimally regulated jurisdictions (Southeast Asia, parts of Africa) using data subject access requests. Measure profile size, granularity, and advertising category richness. Track the number and type of third-party data sharing partners per user across jurisdictions. Analyze whether GDPR's consent requirements have reduced actual data collection volumes or merely changed the legal basis from consent to 'legitimate interest.' Survey corporate data practices through confidential interviews with data protection officers at 50 major companies.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Cross-jurisdictional DSAR analysis, corporate interviews, and comparative data measurement)",
        falsification: {
          supporter_flip:
            "If cross-jurisdiction data showed platforms hold equally large, granular profiles on users in heavily regulated (GDPR) and unregulated markets — regulation adding paperwork without shrinking data collection — the case that 'only regulation can fix this' would weaken to 'even regulation doesn't.'",
          skeptic_flip:
            "A skeptic who says regulation is just bureaucracy should weigh that GDPR/CCPA could be measurably shrinking data footprints, or merely shifting the legal basis from 'consent' to 'legitimate interest' — an empirical question cross-jurisdiction profile comparisons can answer, not assume.",
          common_ground:
            "Both sides agree privacy regulation has imposed real compliance costs and consent prompts, and that whether it reduced actual data collection is not yet clearly measured.",
          live_disagreement:
            "Whether regulation meaningfully shrinks per-user data collection or merely re-labels its legal basis — which only comparing real profiles across regulated and unregulated jurisdictions can determine.",
        },
      },
      evidence: [
        {
          id: "gdpr-fines-record",
          title:
            "GDPR Has Imposed 4+ Billion Euros in Fines, Including 1.2B Against Meta",
          description:
            "Since enforcement began in May 2018, European data protection authorities have imposed over 4 billion euros in GDPR fines. The largest single fine — 1.2 billion euros against Meta by the Irish Data Protection Commission in May 2023 — concerned the transfer of EU user data to the US without adequate privacy protections. This decision forced the adoption of the EU-US Data Privacy Framework and required Meta to restructure its data processing architecture. Other significant fines include 746 million euros against Amazon (Luxembourg, 2021) and 390 million euros against Meta for behavioral advertising consent violations (Ireland, 2023). These fines represent meaningful financial penalties, not symbolic enforcement.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source:
            "European Data Protection Board; Irish Data Protection Commission; GDPR Enforcement Tracker",
          sourceUrl: "https://www.enforcementtracker.com/",
          reasoning:
            "Official regulatory decisions and fine amounts are a matter of public record and highly reliable. Independence is strong as European DPAs are legally independent bodies. Directness is somewhat limited because fines measure enforcement activity, not whether user privacy has actually improved — Meta continues to derive most EU revenue from targeted advertising despite the fines.",
        },
        {
          id: "dark-patterns-consent",
          title:
            "Dark Patterns in Cookie Consent Result in 90%+ Acceptance Rates",
          description:
            "A widely cited CHI 2020 study by Nouwens, Liccardi, Veale, Karger & Kagal scraped the consent interfaces of the top 10,000 websites in the UK and found that only 11.8% met the minimal requirements of European law, with dark patterns and implied consent ubiquitous. In a paired field experiment (n=40), the authors showed that removing the 'reject all' button from the first page — forcing users through a 'more options' step — substantially increased the share of users who consented, confirming that interface design drives consent outcomes more than user preference. The European Data Protection Board later issued guidelines against deceptive design patterns (03/2022), but enforcement has been uneven, and the consent banner remains widely regarded as GDPR's most visible shortcoming.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "Nouwens, Liccardi, Veale, Karger & Kagal, 'Dark Patterns after the GDPR' (CHI 2020); European Data Protection Board Guidelines 03/2022",
          sourceUrl: "https://dl.acm.org/doi/10.1145/3313831.3376321",
          reasoning:
            "Peer-reviewed academic research (CHI 2020) by independent authors at MIT, UCL, and Aarhus University with a large website sample (n=680 of the top 10,000 UK sites) plus a controlled experiment. The prior version mis-attributed the work to Ruhr University Bochum and the University of Michigan; that attribution has been corrected. The 11.8% figure refers to minimal GDPR compliance, not specifically reject-all prominence. The finding that consent design determines outcomes more than user preference directly undermines the consent-based regulatory model.",
        },
        {
          id: "federal-privacy-law-failure",
          title:
            "US Federal Privacy Legislation Has Failed Repeatedly Since 2012",
          description:
            "The United States still lacks a comprehensive federal privacy law. The American Data Privacy and Protection Act (ADPPA) advanced out of the House Energy and Commerce Committee in July 2022 on a 53-2 bipartisan vote — a rare moment of momentum — but never received a floor vote. House Speaker Nancy Pelosi declined to bring it up over its preemption provisions, which California argued would weaken the CCPA/CPRA. A successor effort, the American Privacy Rights Act, was introduced in 2024 but also stalled. As a result only sector-specific federal laws exist (HIPAA for health, COPPA for children, GLBA for finance), while a growing number of states have enacted their own privacy laws, creating a fragmented patchwork.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "IAPP, 'Pelosi opposes proposed American Data Privacy and Protection Act, seeks new preemption compromise'; Congressional records on ADPPA (H.R. 8152) and the American Privacy Rights Act",
          sourceUrl:
            "https://iapp.org/news/a/pelosi-rejects-proposed-american-data-privacy-and-protection-act-seeks-new-compromise",
          reasoning:
            "Legislative history is a matter of public record and highly reliable. The repeated failure of federal privacy legislation despite broad public support demonstrates structural obstacles to US regulatory reform. The earlier '12 bills since 2012' count and '$100M annual lobbying' figure were dropped because they could not be pinned to a specific verifiable source; the ADPPA 53-2 committee vote and Pelosi's preemption objection are well-documented.",
        },
        {
          id: "global-privacy-expansion",
          title:
            "Privacy Regulation Expanding Globally: ~137 of 194 Countries Have Data Protection Laws",
          description:
            "According to UNCTAD, 137 of 194 countries (about 71%) have enacted data protection and privacy legislation, with another 9% having draft legislation; adoption ranges from roughly 96% in Europe down to about 50% in Africa. India's Digital Personal Data Protection Act (2023) covers more than 1.4 billion people, Brazil's LGPD (2020) established an independent enforcement authority, and several Asian jurisdictions have strengthened frameworks toward EU adequacy. While enforcement quality varies widely, the global trajectory is toward more regulation, not less, and companies increasingly adopt GDPR-level protections as a global baseline.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "UNCTAD, 'Data Protection and Privacy Legislation Worldwide'",
          sourceUrl:
            "https://unctad.org/page/data-protection-and-privacy-legislation-worldwide",
          reasoning:
            "UNCTAD is an authoritative international source. The prior '160+ countries, up from 76 in 2010' figures were corrected to UNCTAD's actual count of 137 of 194 countries (71%). Directness is moderate because the existence of laws does not guarantee effective enforcement — many countries have minimal enforcement capacity — but the trend creates a regulatory ratchet that makes reversal difficult.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Zuboff, S. — The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power (2019)",
      url: "https://shoshanazuboff.com/book/about/",
    },
    {
      title:
        "GDPR Enforcement Tracker — Comprehensive Database of GDPR Fines and Decisions",
      url: "https://www.enforcementtracker.com/",
    },
    {
      title:
        "Snowden, E. — Permanent Record (2019); NSA Surveillance Program Documentation",
      url: "https://www.aclu.org/issues/national-security/privacy-and-surveillance/nsa-surveillance",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is opting out of corporate tracking actually possible?",
      content:
        "Google, Meta, and data brokers have built surveillance infrastructure so pervasive that even non-users are profiled through shadow profiles, device fingerprinting, and cross-site tracking. Apple's ATT showed that when opt-out is frictionless, 80% of users choose privacy. But is using privacy-focused alternatives (Signal, Brave, DuckDuckGo) genuine protection, or does it merely shift tracking from one vector to another while the underlying data economy remains intact?",
    },
    {
      id: "q2",
      title:
        "Have post-Snowden reforms meaningfully constrained government surveillance?",
      content:
        "The USA FREEDOM Act ended bulk metadata collection, the Supreme Court's Carpenter decision required warrants for location data, and default encryption has created real blind spots for investigators. Yet Section 702 was reauthorized and expanded in 2024, facial recognition has proliferated to 3,100+ law enforcement agencies, and Five Eyes intelligence sharing circumvents national privacy laws. Has the balance shifted toward or away from citizen privacy since 2013?",
    },
    {
      id: "q3",
      title:
        "Can regulation restore digital privacy, or is the surveillance economy too entrenched?",
      content:
        "GDPR has imposed billions in fines and forced structural changes like the EU-US Data Privacy Framework. Roughly 137 of 194 countries (about 71%) now have data protection laws, per UNCTAD. But dark patterns render consent banners meaningless, the US still lacks federal privacy legislation, and Big Tech's advertising revenue continues to grow in regulated markets. Is the global regulatory trend sufficient to reverse surveillance capitalism, or is it merely adding compliance costs without changing the fundamental dynamic?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
