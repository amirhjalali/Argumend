import type { TopicInput } from "@/lib/schemas/topic";

export const privacyVsConvenienceData = {
  id: "privacy-vs-convenience",
  title: "Have We Already Lost the Battle for Digital Privacy?",
  question: "Have we already lost the battle for digital privacy?",
  meta_claim:
    "Meaningful digital privacy is no longer achievable for ordinary citizens: the surveillance infrastructure is too embedded in daily life to resist.",
  status: "contested" as const,
  category: "technology" as const,
  last_updated: "2026-11-23",
  tags: ["privacy", "surveillance", "data", "regulation", "encryption"],
  // ── Stage 1: the opening contrast shown above everything ──
  keystone_fact: {
    statement:
      "When Apple asked iOS users directly before cross-app tracking, most said no, cutting Meta's annual ad revenue by an estimated $10 billion, and in June 2026 the House rejected a short-term extension of FISA Section 702 by 198 to 218, after which the statute lapsed. Yet browser fingerprinting uniquely identifies 89.4% of tested modern browsers without cookies, and FISA Court certifications approved in March 2026 were reported to keep Section 702 surveillance running into 2027 anyway. The fight is whether opt-outs, encryption, and laws actually shrink exposure, or only move where collection happens.",
    confidence: 82,
    source:
      "Meta Q4 2021 Earnings / Financial Times (2022); Laperdrix et al., IEEE S&P (2016); CRS R48592 (2024 law); Roll Call, June 11, 2026 (House vote)",
    sourceUrl: "https://doi.org/10.1109/SP.2016.57",
  },
  // ── Stage 2: the honest two-paragraph orientation ──
  simple_case: [
    "Both sides accept that privacy tools like Signal, ad blockers, and privacy browsers cut some tracking while data brokers aggregate information from many sources; that legal reforms and default encryption have spread even as agencies use broker data and court certifications to maintain reach; and that privacy laws like GDPR and FTC broker bans have imposed real compliance costs and consent prompts.",
    "They split over whether careful privacy habits shrink corporate profiling or aggregation rebuilds the profile anyway; whether legal limits and encryption reduced government surveillance or agencies routed around them; and whether regulation shrinks how much data is collected per user or mostly relabels its legal basis.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Corporate Data Collection
    // =========================================================================
    {
      id: "corporate-data-collection",
      title: "Corporate Data Collection",
      short_summary:
        "Apple's App Tracking Transparency wiped billions from targeted ad revenue and privacy tools now serve tens of millions, yet shadow profiles on non-users and cookie-free browser fingerprinting still track people who never opted in.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The 'resistance is futile' framing overstates corporate omniscience and understates both the impact of privacy tools and the value many users consciously trade for free services. Apple's App Tracking Transparency (ATT) in iOS 14.5 prompted a large majority of iOS users to decline cross-app tracking and cost Meta an estimated $10 billion in annual ad revenue, demonstrating that when opt-out is clear and low-friction, consumer agency has real financial bite. Privacy-respecting alternatives have reached meaningful scale: Brave passed 100 million monthly active users in late 2025, and Signal disclosed roughly 40 million monthly users. Regulators have also moved against location brokers, with the FTC finalizing bans on sensitive location-data sales against X-Mode/Outlogic (2024) and Gravy Analytics/Venntel (January 2025). Meanwhile, ad-supported search, maps, and email remain free to billions who would not pay subscriptions, suggesting the core task is transparent consent and firm boundaries rather than surrendering.",
      proponent_rebuttal:
        "Individual opt-out cannot beat an economy built around passive aggregation. Academic research by Aguiar and colleagues (2022) estimated that Facebook can track roughly 40% of web browsing time for both users and non-users, and infer demographic attributes of people who never signed up, a collection practice Mark Zuckerberg acknowledged in 2018 congressional testimony. Blocking cookies does not stop identification: Eckersley's EFF Panopticlick study found 83.6% of tested browsers unique (94.2% with Flash or Java), and Laperdrix et al. (IEEE S&P 2016) found 89.4% of modern browser configurations uniquely fingerprintable via Canvas, WebGL, and system traits. Even when one platform adds friction like Apple ATT, ad-tech firms shift toward first-party data graphs and third-party brokers whose dossiers assemble purchase, location, and public-record trails without direct consent.",
      crux: {
        id: "opt-out-effectiveness",
        title: "The Opt-Out Effectiveness Test",
        question:
          "Can careful privacy habits shrink corporate profiling, or does data aggregation rebuild the profile anyway?",
        description:
          "Whether an ordinary person following best-practice privacy guidance meaningfully shrinks their corporate data profile, or whether cross-site tracking, fingerprinting, and broker aggregation reconstruct an equivalent profile regardless.",
        methodology:
          "Recruit 200 participants divided into four groups: (1) default settings on mainstream platforms, (2) maximum privacy settings on mainstream platforms, (3) privacy-focused alternatives (Signal, Brave, DuckDuckGo, ProtonMail), and (4) privacy alternatives plus VPN and content blockers. Over 6 months, use GDPR/CCPA data subject access requests to inspect profiles held by major platforms and data brokers and compare completeness and targeting accuracy across groups.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A six-month study of 200 people on default settings, maximum privacy settings, privacy-focused alternatives, or alternatives plus VPN and ad blockers, using GDPR and CCPA access requests to compare the profiles companies end up holding.",
        },
        cost_to_verify:
          "$200K-500K (Participant recruitment, DSAR processing, and comparative profile analysis)",
        falsification: {
          supporter_flip:
            "If a controlled access-request study showed that diligent users following best-practice privacy guidance end up with dramatically smaller, less accurate corporate profiles than default users, the claim that privacy is unachievable for ordinary people would weaken substantially.",
          skeptic_flip:
            "If access-request tests found cross-site tracking, browser fingerprinting, and broker aggregation rebuilding most of a careful user's profile anyway, relying on individual privacy tools would look closer to theater than real protection.",
          common_ground:
            "Both sides accept that privacy tools like Signal, ad blockers, and privacy browsers block some tracking vectors and that data brokers aggregate records across many sources.",
          live_disagreement:
            "Whether best-practice individual privacy habits meaningfully shrink corporate profiles or whether passive aggregation reconstructs comparable profiles regardless.",
        },
      },
      evidence: [
        {
          id: "apple-att-impact",
          title:
            "Apple ATT (2021–2022): Most iOS Users Declined Tracking, Costing Meta an Estimated $10B Annually",
          description:
            "Apple's App Tracking Transparency, launched in iOS 14.5 in April 2021, required apps to ask explicit permission before tracking users across third-party apps and websites. A large majority of iOS users declined cross-app tracking, and in February 2022 Meta disclosed an estimated $10 billion annual revenue headwind. Scope limit: this was a platform-level default shift by Apple, which also operates its own ad business, rather than pure user self-defense, and it did not stop first-party tracking inside apps.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 9,
          },
          source: "Meta Platforms Q4 2021 Earnings Call (Feb 2022); Financial Times",
          sourceUrl:
            "https://www.ft.com/content/4c19e387-ee1a-41d8-8dd2-bc6c302ee58e",
          reasoning:
            "Meta's investor disclosure is high-reliability financial evidence that clear, low-friction opt-out controls can sharply disrupt cross-app tracking economics, even though Apple had competitive incentives alongside privacy goals.",
        },
        {
          id: "shadow-profiles",
          title:
            "Academic Study (2022): Facebook Can Track ~40% of Non-User Web Browsing and Infer Attributes",
          description:
            "In a 2022 working paper ('Facebook Shadow Profiles'), Aguiar, Peukert, Schäfer, and Ullrich estimated that Facebook can track roughly 40% of web browsing time for both account holders and non-users, and that demographic sharing by users enables the platform to infer attributes like age and gender for people who never signed up. Separately, in April 2018 congressional testimony, Mark Zuckerberg acknowledged that Facebook collects data on non-users. Scope limit: estimates browsing-time reach and attribute inference prior to newer browser anti-tracking defaults.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source:
            "Aguiar, Peukert, Schäfer & Ullrich, 'Facebook Shadow Profiles' (arXiv:2202.04131, 2022); Zuckerberg U.S. Congressional Testimony (April 2018)",
          sourceUrl: "https://arxiv.org/abs/2202.04131",
          reasoning:
            "Independent empirical work combined with on-the-record congressional testimony demonstrates a structural limit of individual consent: other people's data sharing and embedded third-party trackers profile non-users who never opted in.",
        },
        {
          id: "device-fingerprinting-accuracy",
          title:
            "IEEE S&P (2016) & EFF (2010): 83.6% to 89.4% of Tested Browsers Are Uniquely Identifiable Without Cookies",
          description:
            "Peter Eckersley's landmark 2010 EFF Panopticlick study found that 83.6% of tested browser configurations were unique (94.2% when Flash or Java plugins were enabled). Even as plugins were phased out, Pierre Laperdrix, Walter Rudametkin, and Benoit Baudry (IEEE Symposium on Security and Privacy, 2016) analyzed modern browsers through the AmIUnique project and found 89.4% of collected fingerprints remained unique using attributes like HTML5 Canvas, WebGL, fonts, and screen geometry, allowing identification without cookies. Scope limit: volunteer study visitors skew more technically diverse than typical consumers, and privacy browsers have since added fingerprint randomization.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "Laperdrix, Rudametkin & Baudry, 'Beauty and the Beast: Diverting Modern Web Browsers to Build Unique Browser Fingerprints,' IEEE S&P (2016); Eckersley, EFF (2010)",
          sourceUrl: "https://doi.org/10.1109/SP.2016.57",
          reasoning:
            "Peer-reviewed computer-security research establishes that blocking third-party cookies alone does not prevent cross-site identification, though ongoing browser defenses make uniqueness a moving target.",
        },
        {
          id: "privacy-tools-adoption",
          title:
            "Privacy Alternatives Reaching Scale: Brave Passed 100M Monthly Users (2025); Signal ~40M",
          description:
            "Privacy-focused alternatives have moved beyond tiny niches: Brave Software announced in October 2025 that its browser surpassed 100 million monthly active users (101 million as of September 30, 2025), while Signal disclosed roughly 40 million monthly active users in 2021. Scope limit: both numbers are company self-reports, remain a small slice of global Chrome and WhatsApp usage, and show consumer demand rather than proving immunity from server-side or broker tracking.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Brave Software, 'Brave passes 100 million monthly active users' (Oct 2025); Signal Foundation (2021)",
          sourceUrl: "https://brave.com/blog/100m-mau/",
          reasoning:
            "Self-reported adoption shows privacy tools can sustain mainstream scale, though market share remains small compared with dominant platforms and adoption alone does not measure total exposure reduction.",
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
        "Default encryption, the Supreme Court's Carpenter warrant ruling, and the House's June 2026 rejection of a short-term Section 702 extension show real pushback, yet FISA Court certifications were reported to keep collection running into 2027, and 18 of 24 major federal agencies reported using facial recognition.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The surveillance picture is more nuanced than a one-way slide into total state visibility. Congress ended bulk phone metadata collection under Section 215 in the 2015 USA FREEDOM Act, and in June 2026 the House rejected a short-term extension of FISA Section 702 by 198 to 218, with 19 Republicans opposed, some citing warrantless-search concerns, and Democratic opposition also tied to the president's pick of Bill Pulte as acting Director of National Intelligence, after which the statute lapsed. In Carpenter v. United States (2018), the Supreme Court held that historical cell-site location data requires a Fourth Amendment warrant. Technically, default full-disk encryption on iOS and Android plus end-to-end encryption in iMessage, WhatsApp, and Signal have created real blind spots that service providers cannot unlock even with a court order. Government surveillance capability remains vast, but legal, political, and cryptographic pushback has produced tangible limits.",
      proponent_rebuttal:
        "Even visible legislative victories rarely shut down state collection. When Congress reauthorized FISA Section 702 in April 2024 (RISAA), it rejected a warrant requirement for U.S.-person queries and widened which entities can be compelled to assist surveillance, and even after the statute lapsed in June 2026, yearlong FISA Court certifications approved in March 2026 were reported to keep surveillance running into 2027. Meanwhile, Carpenter was explicitly framed as a narrow ruling that left real-time tracking, tower dumps, and commercial data-broker purchases unresolved, and the U.S. Government Accountability Office found that 18 of the 24 largest federal agencies reported using facial recognition technology (GAO-21-526), and that 14 of 42 federal agencies employing law-enforcement officers reported using it to support criminal investigations, all of them via systems owned by non-federal entities (GAO-21-518). When one authority tightens, agencies shift to court certifications, commercial brokers, or newer biometric tools.",
      crux: {
        id: "surveillance-reform-substance",
        title: "The Surveillance Reform Substance Test",
        question:
          "Did surveillance reforms and encryption reduce government access, or did agencies find workarounds?",
        description:
          "Whether post-Snowden legal reforms, Supreme Court rulings, and default encryption meaningfully cut government access to citizens' private data, or whether agencies maintained equivalent reach through court certifications, commercial broker purchases, and biometric tools.",
        methodology:
          "Track declassified FISA Court opinions and ODNI transparency reports from 2013 onward alongside FOIA audits of federal and local law-enforcement use of facial recognition, cell-site simulators, and commercial data-broker purchases.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Declassified FISA Court opinions, transparency reports and ODNI disclosures from 2013 on, tracking the volume of orders and targets, together with audits of police use of facial recognition, cell-site simulators and data bought from brokers.",
        },
        cost_to_verify:
          "$500K-1.5M (FOIA litigation, comparative legal analysis, and transparency-report audit)",
        falsification: {
          supporter_flip:
            "If declassified records and FOIA audits showed that legal limits, warrant rules, and default encryption genuinely reduced total government access to private communications and location trails without equivalent broker workarounds, the claim that state surveillance is unstoppable would weaken.",
          skeptic_flip:
            "If records showed agencies routinely buying comparable location and communications metadata from commercial brokers without warrants and sustaining collection through standing court certifications despite statutory lapses, legal reform would look far thinner than it reads on paper.",
          common_ground:
            "Both sides accept that post-Snowden reforms changed parts of surveillance law and that default encryption has spread widely, while agencies also rely on commercial data brokers and biometric tools.",
          live_disagreement:
            "Whether legal reforms and encryption actually reduced net government access or whether agencies maintained equivalent reach through legal and commercial workarounds.",
        },
      },
      evidence: [
        {
          id: "section-702-reauthorization",
          title:
            "FISA Section 702 (2024–2026): Statute Lapsed in June 2026, Yet Court Certifications Kept Surveillance Active Into 2027",
          description:
            "In April 2024 Congress passed the Reforming Intelligence and Securing America Act (RISAA), extending Section 702 for two years without a U.S.-person query warrant requirement and widening the definition of covered service providers. On June 11, 2026 the House rejected a short-term extension of the authority by 198 to 218. Nineteen Republicans voted against it, and Democratic opposition was also tied to the president's pick of Bill Pulte as acting Director of National Intelligence. The statute then lapsed. Yet because the Foreign Intelligence Surveillance Court was reported to have approved yearlong certifications in March 2026, collection was widely expected to continue into 2027. Whether Congress has since reauthorized the authority was not confirmed as of November 2026. The vote shows legislative resistance and how entrenched the surveillance operations remain.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source:
            "Roll Call, 'House vote puts surveillance authority on path to lapse' (June 11, 2026); Congressional Research Service (R48592) for the 2024 law",
          sourceUrl:
            "https://rollcall.com/2026/06/11/house-vote-puts-surveillance-authority-on-path-to-lapse/",
          reasoning:
            "Contemporaneous reporting on the vote, together with the reported yearlong certifications, shows why surveillance skeptics remain unconvinced by statutory sunsets: a failed extension vote and a lapse were not expected to halt collection under existing FISA Court certifications. The certification term comes from press reports, not a court record.",
        },
        {
          id: "carpenter-ruling",
          title:
            "Carpenter v. United States (2018): Supreme Court Required Warrants for Historical Cell-Site Location",
          description:
            "In a 5–4 decision, the Supreme Court ruled in Carpenter v. United States that acquiring 127 days of historical cell-site location information is a Fourth Amendment search requiring a warrant, recognizing a 'reasonable expectation of privacy in the whole of their physical movements.' Scope limit: Chief Justice Roberts explicitly called the ruling 'a narrow one,' leaving real-time tracking, tower dumps, security cameras, intelligence authorities, and commercially purchased broker records unaddressed.",
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
            "Binding Supreme Court precedent proves constitutional privacy protections can adapt to digital location records, though its express narrowness leaves broker purchases and foreign-intelligence collection contested.",
        },
        {
          id: "facial-recognition-proliferation",
          title:
            "GAO Audits (2021): 18 of 24 Largest Federal Agencies Reported Using Facial Recognition",
          description:
            "In GAO-21-526 (August 2021), the U.S. Government Accountability Office reported that 18 of the 24 agencies it surveyed (the Chief Financial Officers Act agencies) reported using facial recognition technology in fiscal year 2020, most often for digital access and domestic law enforcement. In GAO-21-518 (June 2021), a survey of 42 federal agencies that employ law-enforcement officers found that 20 reported owning facial recognition systems or using systems owned by other entities, and that 14 reported using the technology to support criminal investigations, all 14 through systems owned by non-federal entities. GAO's June 2022 testimony (GAO-22-106100) restates both sets of findings. Scope limit: covers federal agencies rather than state or local police, and bundles routine device/building authentication with investigative searches.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 8,
          },
          source:
            "U.S. Government Accountability Office, GAO-21-526, 'Facial Recognition Technology: Current and Planned Uses by Federal Agencies' (Aug 2021); GAO-21-518 (Jun 2021); restated in testimony GAO-22-106100 (Jun 2022)",
          sourceUrl: "https://www.gao.gov/products/gao-21-526",
          reasoning:
            "Authoritative federal audit confirming broad adoption of biometric identification across U.S. government agencies, while keeping routine access control distinct from criminal investigation uses.",
        },
        {
          id: "encryption-as-defense",
          title:
            "Default Device & Messaging Encryption Creates Real Content Blind Spots for Investigators",
          description:
            "Since 2014, Apple and Google have enabled default device encryption on iOS and Android, and end-to-end encryption in iMessage, WhatsApp, and Signal prevents service providers from decrypting message contents even under warrant. Although the FBI initially told Congress in 2017–2018 it could not access nearly 7,800 locked devices before admitting a programming error inflated the count (with the true figure closer to 1,200–2,000), the technical barrier to content decryption is genuine. Scope limit: encryption shields message content, not metadata (who contacted whom and when) or endpoint compromise.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "The Washington Post (May 22, 2018), citing FBI disclosure; Apple Platform Security & WhatsApp Encryption documentation",
          sourceUrl:
            "https://www.washingtonpost.com/world/national-security/fbi-repeatedly-overstated-encryption-threat-figures-to-congress-public/2018/05/22/5b68ae90-5dce-11e8-a4a4-c070ef53f315_story.html",
          reasoning:
            "Even after correcting the FBI's overcount, widespread default encryption represents a major technical gain for user privacy since 2013, though metadata and endpoint access remain open flanks.",
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
        "Roughly 71% of countries now have data-protection laws, GDPR has levied billions in fines, and the FTC has banned major brokers from selling sensitive location data, yet U.S. federal legislation keeps stalling and dark-pattern cookie banners undermine consent.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The 'privacy is dead' narrative confuses hard enforcement with impossible enforcement. Globally, UNCTAD tracks 137 of 194 countries (71%) with enacted data-protection legislation, including Brazil's LGPD and India's Digital Personal Data Protection Act (2023). In Europe, regulators have moved beyond token warnings, imposing a €1.2 billion fine on Meta over EU-U.S. transfers (May 2023) and €746 million on Amazon (2021), while in the United States, the FTC finalized landmark bans prohibiting location brokers X-Mode/Outlogic (2024) and Gravy Analytics/Venntel (January 2025) from selling sensitive geolocation data without verifiable consent. Paired with privacy-enhancing technologies like differential privacy and zero-knowledge proofs, the regulatory and technical floor is steadily rising.",
      proponent_rebuttal:
        "Passing laws and levying fines has not dismantled surveillance business models. In a peer-reviewed CHI 2020 audit of consent pop-ups across the top 10,000 UK websites, Nouwens and colleagues found only 11.8% met minimal European legal requirements, and removing a first-page 'reject all' button boosted consent rates by 22–23 percentage points, turning GDPR's consent model into interface theater. In the United States, comprehensive federal privacy legislation has repeatedly stalled: the bipartisan American Data Privacy and Protection Act passed committee 53–2 in 2022 only to die over state preemption, and the 2024 American Privacy Rights Act stalled as well, leaving a fragmented state patchwork while connected cars, smart appliances, and ad-tech brokers keep expanding collection.",
      crux: {
        id: "regulatory-behavioral-impact",
        title: "The Regulatory Behavioral Impact Test",
        question:
          "Does privacy regulation shrink how much data is collected per user, or just relabel its legal basis?",
        description:
          "Whether privacy laws and enforcement orders measurably shrink the volume and granularity of personal data held per user, or mainly add compliance paperwork and consent banners without reducing collection.",
        methodology:
          "Compare profiles held by major platforms (Google, Meta, Amazon) and data brokers on matched users in heavily regulated jurisdictions (EU/GDPR) versus lightly regulated markets using data subject access requests, measuring profile size, granularity, and third-party sharing partners.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Data access requests filed with Google, Meta and Amazon by users in the EU and in lightly regulated markets, comparing profile size, granularity and the number of third-party sharing partners per user.",
        },
        cost_to_verify:
          "$300K-800K (Cross-jurisdictional DSAR study and comparative profile measurement)",
        falsification: {
          supporter_flip:
            "If cross-jurisdiction access requests found profiles measurably smaller under GDPR, CCPA, and FTC broker orders, rather than the same data relabeled from 'consent' to 'legitimate interest', the claim that regulation is mostly bureaucracy would weaken.",
          skeptic_flip:
            "If cross-jurisdiction data showed platforms holding equally large, granular profiles on users in heavily regulated and lightly regulated markets, the case that regulation meaningfully shrinks data collection would lose much of its force.",
          common_ground:
            "Both sides accept that privacy laws have created real compliance costs, major fines, and ubiquitous consent prompts, and that net reductions in per-user data volume remain poorly measured.",
          live_disagreement:
            "Whether privacy regulation meaningfully shrinks per-user data collection or largely relabels its legal basis without changing underlying collection volumes.",
        },
      },
      evidence: [
        {
          id: "gdpr-fines-record",
          title:
            "FTC Location-Broker Bans (2024–2025) & Billion-Euro GDPR Fines Show Regulators Can Bite",
          description:
            "On January 14, 2025, the Federal Trade Commission finalized an order prohibiting location data broker Gravy Analytics and its government-contracting subsidiary Venntel from selling or disclosing sensitive geolocation data (visits to medical clinics, houses of worship, and similar sites) without verifiable consent, following its January 2024 ban against X-Mode/Outlogic. In Europe, data-protection authorities have levied billions of euros in GDPR fines since 2018, including €1.2 billion against Meta (May 2023) over EU-U.S. transfers and €746 million against Amazon (2021). Scope limit: enforcement orders penalize specific violations rather than proving per-user data collection fell economy-wide.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source:
            "Federal Trade Commission (Jan 14, 2025), Gravy Analytics / Venntel Final Order; European Data Protection Board / Irish DPC",
          sourceUrl:
            "https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-order-prohibiting-gravy-analytics-venntel-selling-sensitive-location-data",
          reasoning:
            "Binding FTC bans on major sensitive-location brokers and billion-euro GDPR penalties show regulators can impose structural restrictions, not merely symbolic fines, though direct impact on aggregate per-user profiling remains contested.",
        },
        {
          id: "dark-patterns-consent",
          title:
            "CHI 2020 Audit: Only 11.8% of UK Cookie Pop-Ups Met Minimal GDPR Rules; Hiding 'Reject' Boosted Consent 22–23 Points",
          description:
            "In a peer-reviewed CHI 2020 study ('Dark Patterns after the GDPR'), Nouwens, Liccardi, Veale, Karger, and Kagal scraped the five most popular consent-management platforms across the top 10,000 UK websites (n=680 implementations) and found only 11.8% met minimal European legal requirements. In a paired field experiment, removing a first-page opt-out/reject button increased consent acceptance by 22–23 percentage points, while showing granular controls on the first page reduced consent by 8–20 percentage points. Scope limit: measured 2019–2020 implementations before later European Data Protection Board dark-pattern guidelines (03/2022).",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source:
            "Nouwens, Liccardi, Veale, Karger & Kagal, 'Dark Patterns after the GDPR,' CHI 2020",
          sourceUrl: "https://dl.acm.org/doi/10.1145/3313831.3376321",
          reasoning:
            "Independent peer-reviewed audit plus controlled field experiment demonstrates that interface design systematically overrides user privacy preferences under notice-and-consent laws.",
        },
        {
          id: "federal-privacy-law-failure",
          title:
            "U.S. Federal Privacy Bills Repeatedly Stalled: ADPPA Died After 53–2 Vote (2022) and APRA Stalled (2024)",
          description:
            "The United States still has no comprehensive federal privacy statute. The bipartisan American Data Privacy and Protection Act (H.R. 8152) cleared the House Energy and Commerce Committee 53–2 in July 2022 but never received a floor vote after preemption objections tied to California's CCPA/CPRA, and the 2024 American Privacy Rights Act likewise stalled. Federal statutory rules remain limited to specific sectors (HIPAA, COPPA, GLBA), leaving general consumer privacy to state laws and targeted FTC enforcement.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "IAPP; U.S. Congressional records on ADPPA (H.R. 8152, 2022) and the American Privacy Rights Act (2024)",
          sourceUrl:
            "https://iapp.org/news/a/pelosi-rejects-proposed-american-data-privacy-and-protection-act-seeks-new-compromise",
          reasoning:
            "Well-documented legislative impasse shows how hard it is to pass comprehensive baseline privacy rules in the world's largest ad-tech market, even when bipartisan committee votes pass overwhelmingly.",
        },
        {
          id: "global-privacy-expansion",
          title:
            "UNCTAD Tracker: 137 of 194 Countries (~71%) Have Enacted Data-Protection Legislation",
          description:
            "According to UN Trade and Development (UNCTAD), 137 of 194 countries (roughly 71%) have enacted data-protection and privacy legislation, with another 9% holding draft bills, including Brazil's LGPD and India's Digital Personal Data Protection Act (2023). Scope limit: enacting a statute on paper does not ensure strong enforcement agencies or measurably smaller corporate profiles.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "UNCTAD, 'Data Protection and Privacy Legislation Worldwide'",
          sourceUrl:
            "https://unctad.org/page/data-protection-and-privacy-legislation-worldwide",
          reasoning:
            "Authoritative global tally showing privacy legislation is spreading rather than retreating, though directness is moderate because enforcement strength varies sharply across jurisdictions.",
        },
      ],
    },
  ],
  references: [
    {
      title:
        "Laperdrix, Rudametkin & Baudry: Beauty and the Beast: Diverting Modern Web Browsers to Build Unique Browser Fingerprints, IEEE S&P (2016)",
      url: "https://doi.org/10.1109/SP.2016.57",
    },
    {
      title:
        "Nouwens, Liccardi, Veale, Karger & Kagal: Dark Patterns after the GDPR, CHI (2020)",
      url: "https://dl.acm.org/doi/10.1145/3313831.3376321",
    },
    {
      title:
        "FTC: Final Order Prohibiting Gravy Analytics, Venntel from Selling Sensitive Location Data (Jan 2025)",
      url: "https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-order-prohibiting-gravy-analytics-venntel-selling-sensitive-location-data",
    },
    {
      title:
        "Roll Call: House vote puts surveillance authority on path to lapse (June 11, 2026)",
      url: "https://rollcall.com/2026/06/11/house-vote-puts-surveillance-authority-on-path-to-lapse/",
    },
    {
      title:
        "Congressional Research Service: FISA Section 702 and the 2024 Reforming Intelligence and Securing America Act (R48592)",
      url: "https://www.congress.gov/crs-product/R48592",
    },
    {
      title:
        "U.S. Government Accountability Office: Facial Recognition Technology: Current and Planned Uses by Federal Agencies (GAO-21-526)",
      url: "https://www.gao.gov/products/gao-21-526",
    },
    {
      title:
        "U.S. Government Accountability Office: Facial Recognition Technology: Federal Law Enforcement Agencies Should Better Assess Privacy and Other Risks (GAO-21-518)",
      url: "https://www.gao.gov/products/gao-21-518",
    },
    {
      title:
        "U.S. Government Accountability Office: Facial Recognition Technology: Federal Agencies' Use and Related Privacy Protections (GAO-22-106100, testimony)",
      url: "https://www.gao.gov/products/gao-22-106100",
    },
    {
      title:
        "Supreme Court of the United States: Carpenter v. United States, 585 U.S. 296 (2018)",
      url: "https://www.supremecourt.gov/opinions/17pdf/16-402_h315.pdf",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is opting out of corporate tracking actually possible?",
      content:
        "Apple's App Tracking Transparency showed that when opt-out is frictionless, most users decline cross-app tracking and ad-tech revenues take a real hit. Yet shadow-profile research (Aguiar et al., 2022) and browser-fingerprinting studies (Laperdrix et al., 2016) show that platforms can still track non-users and identify 89.4% of tested browsers without cookies, leaving open how much individual privacy tools shrink real-world profiles.",
    },
    {
      id: "q2",
      title:
        "Have post-Snowden reforms meaningfully constrained government surveillance?",
      content:
        "Default device encryption, the Supreme Court's Carpenter warrant ruling, and the House's June 2026 rejection of a short-term Section 702 extension show genuine legal and technical resistance. At the same time, March 2026 FISA Court certifications were reported to keep Section 702 collection running into 2027, and 18 of 24 major federal agencies reported using facial recognition (GAO-21-526).",
    },
    {
      id: "q3",
      title:
        "Can regulation restore digital privacy, or does it mostly change paperwork?",
      content:
        "Roughly 71% of countries now have data-protection laws (UNCTAD), Europe has levied billion-euro GDPR fines, and the FTC banned major brokers like X-Mode and Gravy Analytics/Venntel from selling sensitive location data. Yet CHI 2020 research found only 11.8% of UK cookie banners met minimal legal standards, and comprehensive U.S. federal privacy bills have repeatedly stalled.",
    },
  ],
} satisfies TopicInput;
