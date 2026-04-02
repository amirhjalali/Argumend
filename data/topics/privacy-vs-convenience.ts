import type { Topic } from "@/lib/schemas/topic";

export const privacyVsConvenienceData = {
  id: "privacy-vs-convenience",
  title: "Have We Already Lost the Battle for Digital Privacy?",
  meta_claim:
    "Meaningful digital privacy is no longer achievable for ordinary citizens — the surveillance infrastructure is too embedded in daily life to resist.",
  status: "contested" as const,
  category: "technology" as const,
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
        "The 'resistance is futile' framing overstates corporate omniscience and understates the impact of privacy tools and regulation. Apple's App Tracking Transparency (ATT) framework, introduced in iOS 14.5, caused Meta to lose an estimated $10 billion in annual advertising revenue because 75-85% of users opted out of cross-app tracking when given a clear choice. Firefox and Brave browser have implemented effective anti-fingerprinting measures. Signal, ProtonMail, and DuckDuckGo demonstrate that privacy-respecting alternatives can achieve scale — Signal has 40+ million users. The data broker industry faces increasing regulatory pressure: the FTC has taken enforcement action against Kochava, X-Mode, and InMarket for selling precise location data. GDPR enforcement has resulted in over 4 billion euros in fines since 2018. Corporate data collection is extensive but not inevitable — it persists because of regulatory choices, not technological destiny.",
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
            "Research from Northeastern University and Max Planck Institute demonstrated that Facebook constructs detailed profiles on individuals who have never created accounts, using contact lists uploaded by other users, tracking pixels on third-party websites, and facial recognition in tagged photos. A 2018 congressional inquiry confirmed that Facebook collected data on non-users. Data broker Acxiom claims to hold profiles on 2.5 billion consumers globally, aggregated from public records, purchase data, and digital tracking — most of whom never consented to data collection.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Northeastern University / Max Planck Research; US Congressional Hearing Testimony (2018)",
          reasoning:
            "Academic research and congressional testimony are credible independent sources. Shadow profiles directly demonstrate that individual opt-out choices are insufficient when the social graph exposes you through others' behavior. This is the strongest evidence that privacy is not purely an individual choice.",
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
            "Privacy Tools Reaching Meaningful Scale: Signal 40M+, Brave 60M+ Monthly Users",
          description:
            "Privacy-focused alternatives have achieved significant adoption: Signal has over 40 million monthly active users, Brave browser has 60+ million monthly users, DuckDuckGo processes 100+ million daily searches, and ProtonMail serves 100+ million accounts. Ad blocker usage exceeds 40% of internet users globally. These numbers, while small relative to mainstream platforms, demonstrate that privacy-preserving tools can reach scale and that consumer demand for privacy is real and growing.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Signal Foundation; Brave Software; DuckDuckGo; Proton Technologies",
          reasoning:
            "Usage numbers are self-reported by companies, slightly reducing reliability. The scale is real but represents a small fraction of total internet users (Signal's 40M vs WhatsApp's 2B). Directness is moderate because tool adoption doesn't prove effective privacy protection — users of these tools may still be tracked through other vectors.",
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
      },
      evidence: [
        {
          id: "section-702-reauthorization",
          title:
            "Section 702 Reauthorized and Expanded in 2024 Despite Privacy Concerns",
          description:
            "In April 2024, Congress reauthorized Section 702 of the Foreign Intelligence Surveillance Act for two years, rejecting proposals to require warrants for querying Americans' data swept up in foreign intelligence collection. The reauthorized version expanded the definition of 'electronic communications service provider,' potentially compelling more companies to assist surveillance. The ODNI's annual transparency report disclosed that the FBI conducted 204,090 queries of Section 702 data using US person identifiers in 2022 — later revised downward after an audit found 'significant overcounting,' illustrating the opacity of these programs.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 9,
          },
          source:
            "Office of the Director of National Intelligence; Congressional Research Service; FISA Court Public Opinions",
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
            "Since 2014, Apple and Google have implemented default full-disk encryption on iOS and Android devices. End-to-end encryption in iMessage, WhatsApp (2 billion users), and Signal means that even with a lawful warrant, service providers cannot decrypt message contents. FBI Director Christopher Wray testified in 2023 that the bureau was unable to access data on thousands of devices despite having legal authority. The 'going dark' problem is real — encryption has created genuine technical barriers to surveillance that no legal authority can overcome without device-level access.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source:
            "FBI Congressional Testimony; Apple Security Documentation; WhatsApp Technical White Paper",
          reasoning:
            "FBI testimony about investigative limitations is a credible admission against interest. The technical reality of end-to-end encryption is well-established and independently verifiable. However, metadata (who contacts whom, when, and where) remains accessible even with content encryption, and governments have invested heavily in endpoint exploitation (device hacking) to circumvent encryption.",
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
            "Research from Ruhr University Bochum and the University of Michigan found that the design of cookie consent interfaces dramatically affects user choices: when 'reject all' is as easy as 'accept all,' rejection rates reach 60-80%. But most implementations use dark patterns — pre-checked boxes, hidden reject options, and confusing multi-step flows — resulting in 90%+ acceptance rates. A 2022 study of the top 10,000 websites found that only 11.8% offered a reject-all option equal in prominence to the accept-all button. The European Data Protection Board issued guidelines against dark patterns in 2022, but enforcement has been slow, and the consent banner experience remains widely regarded as GDPR's most visible failure.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "Ruhr University Bochum; University of Michigan; European Data Protection Board Guidelines 03/2022",
          reasoning:
            "Academic research with large sample sizes from independent universities. The finding that consent design determines outcomes more than user preferences directly undermines the consent-based regulatory model. Replicability is strong as multiple studies reach similar conclusions. Demonstrates that regulation can be rendered ineffective through implementation choices.",
        },
        {
          id: "federal-privacy-law-failure",
          title:
            "US Federal Privacy Legislation Has Failed Repeatedly Since 2012",
          description:
            "The United States remains the only major democracy without comprehensive federal privacy legislation. Since the Obama administration's 2012 Consumer Privacy Bill of Rights, at least 12 major federal privacy bills have been introduced and failed, including the American Data Privacy and Protection Act (ADPPA) in 2022, which had rare bipartisan support but stalled over preemption disputes with California. As of 2026, only sector-specific laws exist (HIPAA for health, COPPA for children, GLBA for finance). Meanwhile, 19 states have enacted their own privacy laws, creating a fragmented patchwork that is difficult for consumers to navigate and for companies to comply with. The lobbying expenditure of tech companies on privacy legislation exceeds $100 million annually.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "Congressional Research Service; International Association of Privacy Professionals (IAPP); OpenSecrets Lobbying Data",
          reasoning:
            "Legislative history is a matter of public record and highly reliable. The repeated failure of federal privacy legislation despite broad public support (polls consistently show 70-80% favoring stronger privacy laws) demonstrates the structural obstacles to regulatory reform in the US. The lobbying data from OpenSecrets illustrates the industry opposition dimension.",
        },
        {
          id: "global-privacy-expansion",
          title:
            "Privacy Regulation Expanding Globally: 160+ Countries Now Have Data Protection Laws",
          description:
            "According to the UNCTAD, over 160 countries have enacted data protection and privacy legislation as of 2024, up from 76 in 2010. India's Digital Personal Data Protection Act (2023) covers 1.4 billion people. Brazil's LGPD (2020) has established an independent enforcement authority. Japan, South Korea, and Thailand have strengthened their privacy frameworks to achieve EU adequacy decisions. The African Union's Malabo Convention has driven adoption across the continent. While enforcement quality varies widely, the global trajectory is unambiguously toward more regulation, not less. Companies are increasingly adopting GDPR-level protections as a global baseline to avoid managing jurisdiction-specific compliance.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "UNCTAD Data Protection Legislation Database; World Bank Digital Development Reports",
          sourceUrl:
            "https://unctad.org/page/data-protection-and-privacy-legislation-worldwide",
          reasoning:
            "UNCTAD and World Bank are authoritative international sources. The global expansion of privacy legislation is an objective fact. Directness is moderate because the existence of laws does not guarantee effective enforcement — many of the 160+ countries have minimal enforcement capacity. However, the trend creates a regulatory ratchet that makes reversal difficult.",
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
        "GDPR has imposed billions in fines and forced structural changes like the EU-US Data Privacy Framework. Over 160 countries now have data protection laws. But dark patterns render consent banners meaningless, the US still lacks federal privacy legislation, and Big Tech's advertising revenue continues to grow in regulated markets. Is the global regulatory trend sufficient to reverse surveillance capitalism, or is it merely adding compliance costs without changing the fundamental dynamic?",
    },
  ],
} satisfies Omit<Topic, "confidence_score"> & {
  confidence_score?: number;
};
