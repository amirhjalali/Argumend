export const encryptionBackdoorsData = {
  id: "encryption-backdoors",
  title: "Encryption Backdoors",
  question: "Should governments be able to compel encryption backdoors?",
  meta_claim:
    'Governments should be able to compel lawful-access ("backdoor") capabilities in encrypted communications.',
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The FBI told Congress and the public that encryption locked it out of 7,775 devices in 2017; after it found programming errors in the count, an internal FBI estimate reported by The Washington Post in May 2018 put the true number near 1,200. Both figures are on the record. The fight is over how many of the cases that remain cannot be solved without a built-in way in, and whether any such way in can be kept from attackers.",
    confidence: 90,
    source:
      "The Washington Post (22 May 2018), as reported by CSO Online, \"FBI 'Going Dark' whopper: Locked out of only 1,200 phones, not 7,775\" (23 May 2018)",
    sourceUrl:
      "https://www.csoonline.com/article/565476/fbi-going-dark-whopper-locked-out-of-only-1200-phones-not-7775.html",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that any exceptional-access mechanism adds an attack surface, so the question is how large the leftover risk is; that encryption sometimes blocks lawful investigations, as the roughly 7 million drop in NCMEC CyberTipline reports after Meta encrypted Messenger reflects; and that such a capability would be valuable to authoritarian governments and attackers.",
    "They split over whether a lawful-access design can keep that added risk acceptably small; how many serious crimes could be solved only with a mandated backdoor, once targeted hacking, metadata and device forensics are counted; and whether such a capability can be confined to legitimate use or will spread to other governments and thieves.",
  ],
  last_updated: "2026-06-16",
  tags: ["encryption", "privacy", "surveillance", "security", "law-enforcement"],
  pillars: [
    {
      id: "security-feasibility",
      title: "Can a Backdoor Be Secure?",
      short_summary:
        "The core technical question: can a third-party access mechanism be built into strong encryption without creating a vulnerability that everyone — including criminals and hostile states — can exploit?",
      icon_name: "Shield" as const,
      skeptic_premise:
        "A guaranteed access path is itself an attack surface. Mandating exceptional access reintroduces complexity that 'is the enemy of security,' forces abandonment of forward secrecy (so a single key compromise exposes years of past traffic), and creates concentrated stores of master keys that become the highest-value targets on Earth. No one has demonstrated a design that gives one government access without weakening the system for all the law-abiding users, businesses, and journalists who depend on the same encryption. The 1990s Clipper Chip key-escrow scheme was found to contain exploitable flaws, illustrating how hard 'secure' exceptional access is in practice.",
      proponent_rebuttal:
        "Encryption already accommodates managed access in regulated contexts (enterprise key management, lawful interception of telephony, escrowed recovery keys) without total collapse. The claim that ANY access mechanism is catastrophically insecure is an engineering assertion, not a theorem — exceptional access could be narrowly scoped, hardware-protected, audited, and split across custodians. The choice is not 'perfect security vs. a backdoor' but 'an absolute warrant-proof zone vs. a governed, court-supervised access regime' comparable to the lawful-intercept obligations that already exist for phone networks.",
      crux: {
        id: "exceptional-access-design",
        title: "A Demonstrably Secure Exceptional-Access Design",
        question:
          "Can a lawful-access design exist whose added security risk is acceptably small?",
        description:
          "The load-bearing disagreement: does there exist a deployable exceptional-access design whose risk is acceptably bounded, or does every such mechanism necessarily increase systemic risk more than it helps? If a secure design were demonstrated, much of the skeptic case dissolves; if not, the proponent case rests on hope.",
        methodology:
          "Adversarial red-team evaluation of any proposed access architecture: (1) model the threat (nation-state attacker, insider, key-store breach), (2) assess loss of forward secrecy and added complexity, (3) penetration-test reference implementations, (4) compare residual risk against the public-safety benefit. Publish for independent cryptographic review.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Years of open adversarial red-teaming and independent cryptographic review of a published access design, with reference implementations penetration-tested against nation-state, insider and key-store-breach threats.",
        },
        cost_to_verify: "$2M (red-team study + reference implementation)",
        falsification: {
          supporter_flip:
            "If new lawful-access designs failed independent cryptographic review the way the 1990s Clipper Chip escrow scheme did, and intercept systems kept being breached as in the 2024 Salt Typhoon intrusions into CALEA wiretaps, 'we can just build it securely' would be hard to hold.",
          skeptic_flip:
            "If an exceptional-access design survived years of open adversarial red-teaming, keeping forward secrecy with split, audited key custody and no shown way to abuse it at scale, in the manner of modern HSM key-management schemes, the case that secure backdoors cannot exist would weaken.",
          common_ground:
            "Both sides agree any exceptional-access path adds an attack surface and that the relevant question is the size of the residual risk, not whether risk is literally zero.",
          live_disagreement:
            "Whether a deployable design exists whose added systemic risk is acceptably bounded — resolvable only by publishing a concrete reference implementation and subjecting it to sustained independent red-team review, which has not yet happened.",
        },
      },
      evidence: [
        {
          id: "keys-under-doormats",
          title: "15 Security Experts: Exceptional Access Undermines Security",
          description:
            "The peer-reviewed 'Keys Under Doormats' report concludes that mandating government exceptional access would force abandonment of forward secrecy, sharply increase system complexity ('the enemy of security'), and create concentrated high-value targets — raising risk for all users. Authors include RSA co-inventor Ron Rivest and public-key cryptography co-inventor Whitfield Diffie.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source:
            "Abelson, Anderson, Bellovin, Diffie, Rivest, Schneier et al., 'Keys under doormats: mandating insecurity by requiring government access to all data and communications,' Journal of Cybersecurity 1(1), Oxford University Press, 2015",
          sourceUrl: "https://academic.oup.com/cybersecurity/article/1/1/69/2367066",
          reasoning:
            "Peer-reviewed in a respected journal and authored by many of the field's most senior cryptographers. Independent of any vendor. Directly addresses the feasibility crux. Slightly lower replicability because the core claim is an engineering/risk argument rather than a reproducible experiment.",
        },
        {
          id: "client-side-scanning-risks",
          title: "Client-Side Scanning Fails as a 'Middle Ground'",
          description:
            "The 'Bugs in Our Pockets' report evaluates client-side scanning — the leading proposal to give authorities visibility while preserving encryption — and concludes it 'neither guarantees efficacious crime prevention nor prevents surveillance,' can be evaded and abused, and introduces serious security and privacy risks for all of society.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Abelson, Anderson, Bellovin, Landau, Rivest, Schneier, Troncoso et al., 'Bugs in Our Pockets: The Risks of Client-Side Scanning,' 2021 (later in Journal of Cybersecurity, 2024)",
          sourceUrl: "https://arxiv.org/abs/2110.07450",
          reasoning:
            "Detailed technical analysis by leading cryptographers of the specific 'compromise' architecture most often proposed. Independent. Directly rebuts the proponent claim that a narrowly scoped scanner can square the circle. Replicability moderate because conclusions are analytic.",
        },
        {
          id: "lawful-intercept-precedent",
          title: "Telephony Already Carries a Mandated Lawful-Intercept Obligation",
          description:
            "Under the US Communications Assistance for Law Enforcement Act (CALEA, 1994), telecommunications carriers are legally required to build interception capability into their networks for court-authorized wiretaps — an existing, decades-old example of compelled lawful access operating at national scale.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Communications Assistance for Law Enforcement Act (CALEA), 47 U.S.C. ch. 9; FCC CALEA overview",
          sourceUrl: "https://www.fcc.gov/calea",
          reasoning:
            "Establishes that compelled lawful-access mandates are not unprecedented and can be administered with judicial oversight. Directness is moderate: CALEA governs interception of carrier-controlled traffic, not the harder case of end-to-end-encrypted content, and CALEA networks have themselves been breached (e.g. the 2024 Salt Typhoon intrusions), which cuts both ways.",
        },
      ],
    },
    {
      id: "public-safety-benefit",
      title: "Does Lawful Access Actually Solve Crimes?",
      short_summary:
        "Whether compelled access meaningfully improves investigations of terrorism, child exploitation, and organized crime — or whether the 'going dark' threat is overstated and criminals simply migrate to other tools.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The 'going dark' threat has been demonstrably overstated, and lawful access is often achievable without weakening encryption for everyone. The FBI repeatedly told Congress it was locked out of ~7,775 devices in 2017; after it admitted programming errors in the count, an internal estimate put the true figure near 1,200. Meanwhile targeted lawful hacking — exploiting a specific network rather than mandating a universal backdoor — produced one of the largest crime busts in history (EncroChat). A drop in automated platform reports is not the same as a drop in solvable cases; metadata, device forensics, informants, and targeted exploits remain.",
      proponent_rebuttal:
        "The harm is real and measurable. When Meta turned on default end-to-end encryption for Messenger, NCMEC's CyberTipline reports fell sharply — by roughly 7 million year-over-year — which NCMEC attributes largely to encryption blinding the platform to abuse it would otherwise report. End-to-end encryption can render lawfully seized devices and warrant-served accounts unreadable, leaving investigators with valid court orders they cannot execute. Determined offenders coordinate behind encryption that no warrant can pierce.",
      crux: {
        id: "marginal-cases-solved",
        title: "Marginal Serious Cases Solved Only via a Mandated Backdoor",
        question:
          "How many serious crimes could be solved only with a mandated backdoor?",
        description:
          "The decisive empirical question: how many serious crimes are actually solved that could NOT have been solved by lawful hacking, metadata, device forensics, or compelled-credential methods — i.e. the marginal value a universal backdoor adds over existing tools — weighed against the security cost it imposes on everyone.",
        methodology:
          "Audit a representative sample of investigations stalled by encryption. For each, determine whether available alternatives (targeted exploit, cloud backups, metadata, lawful compulsion of a passcode) could have succeeded. Estimate the residual set genuinely unsolvable without a built-in backdoor, then weigh against modeled systemic security loss.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An audit of a representative sample of investigations stalled by encryption, checking for each whether a targeted exploit, cloud backups, metadata or a compelled passcode could have advanced it, leaving the residual only a backdoor would reach.",
        },
        cost_to_verify: "$1M (multi-jurisdiction case audit)",
        falsification: {
          supporter_flip:
            "If audits confirmed the FBI's 'going dark' count overstated about six times (7,775 versus ~1,200 devices), and big cases like the EncroChat bust (746 UK arrests) kept coming from targeted hacking rather than universal access, the payoff from a mandated backdoor would look small.",
          skeptic_flip:
            "If a rigorous case audit found a large, recurring set of serious investigations that lawful hacking, cloud backups, metadata and compelled credentials could not advance, a built-in backdoor would look like it offered real value nothing else could.",
          common_ground:
            "Both sides agree encryption sometimes blocks lawful investigations and that the NCMEC report drop after Meta's E2E rollout reflects a real loss of automated abuse detection.",
          live_disagreement:
            "The size of the residual set of serious crimes solvable ONLY via a mandated backdoor, net of existing tools — pinnable only by auditing a representative sample of encryption-stalled investigations for available alternatives.",
        },
      },
      evidence: [
        {
          id: "ncmec-encryption-drop",
          title: "Meta E2E Encryption Coincided With Sharp Drop in Abuse Reports",
          description:
            "NCMEC's CyberTipline received 36.2 million reports in 2023 and 20.5 million in 2024; counting 'bundled' reports as separate incidents, NBC News put the 2024 total at about 29.2 million, 'a drop of roughly 19%', with Meta 'reporting 6.9 million fewer incidents than in 2023'. NCMEC's chief legal officer Yiota Souras said its analytics suggest that 'Meta's drop in reports was almost entirely due to instituting end-to-end encryption on Facebook and Messenger.' NCMEC's own write-up also names bundling and fewer submissions from some providers as factors.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "NBC News, 'Child exploitation watchdog says Meta encryption led to sharp decrease in tips and reports' (8 May 2025); NCMEC, 'NCMEC Releases New Data: 2024 in Numbers' (8 May 2025)",
          sourceUrl: "https://www.nbcnews.com/tech/security/child-exploitation-watchdog-says-meta-encryption-led-sharp-decrease-ti-rcna205548",
          reasoning:
            "NCMEC is the authoritative US clearinghouse, so the report counts are reliable and the finding directly bears on the public-safety benefit. Weights are moderated because the link to encryption is correlational/attributional (other factors and reporting changes contribute), not a controlled measurement.",
        },
        {
          id: "encrochat-venetic",
          title: "Lawful Access to Encrypted Comms Drove a Record Crime Bust",
          description:
            "After French and Dutch police infiltrated the EncroChat encrypted phone network in 2020, the UK's Operation Venetic produced 746 arrests, £54M in criminal cash seized, 77 firearms, over 2 tonnes of Class A/B drugs, and mitigation of 200+ threats to life — demonstrating the public-safety value when investigators can read criminal communications.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "UK National Crime Agency, 'Operation Venetic' announcement (2020)",
          sourceUrl: "https://www.nationalcrimeagency.gov.uk/news/operation-venetic",
          reasoning:
            "Official law-enforcement source with concrete, verifiable outcome figures. Directness is moderate because EncroChat was accessed by a targeted exploit of a criminal-only network — i.e. lawful hacking, not a mandated universal backdoor — so it supports the value of lawful access more than the specific 'compel backdoors' mechanism.",
        },
        {
          id: "fbi-overcount",
          title: "FBI Overstated 'Going Dark' Locked Devices by ~6x",
          description:
            "FBI Director Christopher Wray repeatedly cited 7,775 (often rounded to 7,800) as the number of encrypted devices the FBI could not access in fiscal 2017. In May 2018 the FBI said 'programming errors resulted in significant over-counting', and The Washington Post reported an internal estimate of about 1,200. The FBI said the actual number would be set by an audit still under way.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "CSO Online, \"FBI 'Going Dark' whopper: Locked out of only 1,200 phones, not 7,775\" (23 May 2018), reporting The Washington Post (22 May 2018); EFF, 'FBI Admits It Inflated Number of Supposedly Unhackable Devices' (May 2018)",
          sourceUrl:
            "https://www.csoonline.com/article/565476/fbi-going-dark-whopper-locked-out-of-only-1200-phones-not-7775.html",
          reasoning:
            "Well-documented, widely confirmed admission by the FBI itself, undermining the central statistic used to justify mandated access. Directly relevant to whether the 'going dark' harm is as large as claimed. Independent reporting and advocacy corroborate the same figures.",
        },
      ],
    },
    {
      id: "governance-rights",
      title: "Who Holds the Keys, and Who Else Demands Them?",
      short_summary:
        "Even a technically workable backdoor raises a governance problem: a capability built for one democracy's courts becomes a capability that every government — and every attacker who steals it — will demand.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A lawful-access capability cannot be confined to 'the good guys.' Once a vendor builds it for one government, authoritarian states will demand the same access for dissidents and journalists, and the mechanism itself can be stolen or abused. The UK's secret order to Apple under the Investigatory Powers Act — which led Apple to withdraw its Advanced Data Protection encryption from UK users rather than build a backdoor — shows how a single jurisdiction's compulsion can degrade security for users and trigger global precedent and conflict-of-laws problems.",
      proponent_rebuttal:
        "Every powerful tool — wiretaps, financial surveillance, search warrants — carries abuse potential, and democracies manage that risk through warrants, judicial review, transparency reporting, and oversight rather than by abolishing the capability. The fact that authoritarian regimes want access is an argument for strong democratic governance of it, not for leaving warrant-authorized investigations powerless. Apple already complies with lawful data requests in many jurisdictions; the disagreement is about scope and oversight, not whether lawful access can ever be legitimate.",
      crux: {
        id: "containability",
        title: "Containability of a Lawful-Access Capability",
        question:
          "Can a mandated access capability be confined to legitimate use, or will it spread to others?",
        description:
          "The pivotal question of governance: can an exceptional-access capability be reliably confined to legitimate, court-authorized use within rights-respecting limits — or does building it inevitably hand the same power to authoritarian governments and thieves, making misuse a matter of when, not if?",
        methodology:
          "Comparative legal-institutional analysis: examine how existing surveillance powers (CALEA, lawful intercept, mutual legal assistance) have been contained or abused across regimes; model whether a backdoor mandate creates pressure other states can exploit; assess transparency and audit mechanisms' track record.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "The track record of comparable powers such as CALEA lawful intercept and financial-records access: whether they stayed confined to court-authorized use under transparency reporting, or spread through copycat mandates and breaches.",
        },
        cost_to_verify: "$0 (policy and legal analysis)",
        falsification: {
          supporter_flip:
            "If comparable powers such as CALEA intercept kept escaping court-authorized use, through copycat mandates or breaches like the 2024 Salt Typhoon intrusions, and compulsion kept producing exits like Apple withdrawing Advanced Data Protection in the UK, mandated access would look hard to contain.",
          skeptic_flip:
            "If comparable surveillance powers (CALEA lawful intercept, financial-records access) showed a long record of staying within court-authorized use under transparency reporting and judicial review, without copycat mandates or large-scale theft, the containability objection would weaken.",
          common_ground:
            "Both sides agree a lawful-access capability is valuable to authoritarian governments and attackers, and that judicial oversight and transparency reporting are necessary (if not necessarily sufficient) safeguards.",
          live_disagreement:
            "Whether a mandated capability can be reliably confined to legitimate use or inevitably proliferates to other regimes and thieves — informed by how powers like CALEA and mutual legal assistance, and cases like the UK's secret order to Apple, have actually been contained or abused across regimes.",
        },
      },
      evidence: [
        {
          id: "uk-apple-tcn",
          title: "UK Order Forced Apple to Pull Encryption Rather Than Build a Backdoor",
          description:
            "In early 2025 the UK issued a secret Technical Capability Notice under the Investigatory Powers Act demanding access to encrypted iCloud data. Rather than build a backdoor, Apple withdrew its Advanced Data Protection end-to-end encryption for UK users — illustrating that a compulsion regime can degrade available security and set cross-border precedent. In October 2025 the Financial Times reported a new UK order limited to British users; Apple's tribunal challenge had been scheduled for a January 2026 hearing.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "EFF analysis (Oct 2025) and Financial Times reporting on the UK Technical Capability Notice to Apple under the Investigatory Powers Act",
          sourceUrl:
            "https://www.eff.org/deeplinks/2025/10/uk-still-trying-backdoor-encryption-apple-users",
          reasoning:
            "A concrete, contemporary case showing how compelled-access powers play out. Source reliability is moderate because key facts originate from a secret order known mainly through reporting and advocacy; the 2025-2026 status is attributed and hedged rather than treated as settled fact.",
        },
        {
          id: "nas-framework",
          title: "National Academies: No Free Lunch, But a Structured Trade-off",
          description:
            "The 2018 National Academies report 'Decrypting the Encryption Debate' frames exceptional access as a genuine values trade-off rather than a solved problem, laying out the competing needs of law enforcement, cybersecurity, privacy, and the international landscape — and stops short of endorsing mandated access.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "National Academies of Sciences, Engineering, and Medicine, 'Decrypting the Encryption Debate: A Framework for Decision Makers' (2018)",
          sourceUrl: "https://nap.nationalacademies.org/read/25010/chapter/2",
          reasoning:
            "Authoritative, balanced, independent consensus study. Coded 'against' because its careful framing declines to endorse a mandate and emphasizes the unresolved security and governance costs, but it genuinely steelmans both sides — hence moderate directness.",
        },
        {
          id: "wiretap-report-judicial-authorization",
          title: "Every U.S. criminal wiretap is authorized by a judge and counted in public: 2,297 in 2024",
          description:
            "The interception power proponents point to as a model is governed case by case and in public. The federal courts' annual Wiretap Report covers every wiretap 'reported properly to the Administrative Office of the U.S. Courts': 'A total of 2,297 wiretaps were reported as authorized in 2024', 1,290 by federal judges and 1,007 by state judges, with follow-up reports on outcomes ('As of December 31, 2024, a total of 5,463 persons had been arrested ... and 717 persons had been convicted'). Proponents argue a lawful-access mandate for encrypted services could sit inside the same machinery of per-case warrants and published counts. The report shows that oversight of use exists; it says nothing about whether the underlying capability stays safe from others, and the skeptics' counterexample is the 2024 Salt Typhoon campaign, in which, the FBI and CISA said on 13 November 2024, PRC-affiliated hackers carried out 'the copying of certain information that was subject to U.S. law enforcement requests pursuant to court orders'.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 3,
          },
          source: "Administrative Office of the U.S. Courts, Wiretap Report 2024; FBI and CISA joint statement on PRC targeting of commercial telecommunications (13 November 2024)",
          sourceUrl: "https://www.uscourts.gov/data-news/reports/statistical-reports/wiretap-reports/wiretap-report-2024",
          reasoning:
            "Official court statistics, reliable and published every year. Directness is 3, and the weight is low on purpose: the crux asks whether a mandated capability can be kept from authoritarian governments and thieves, and a count of authorized intercepts shows only that legitimate use is supervised, not that the capability is contained. It is included as the strongest documented record of the governance model proponents propose; a record of containment (no copycat mandates, no theft) would need evidence this report does not contain.",
        },
      ],
    },
  ],
};
