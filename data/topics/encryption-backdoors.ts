import type { Topic } from "@/lib/schemas/topic";

export const encryptionBackdoorsData = {
  id: "encryption-backdoors",
  title: "Encryption Backdoors",
  meta_claim:
    'Governments should be able to compel lawful-access ("backdoor") capabilities in encrypted communications.',
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The headline 'going dark' statistic was wrong by about 6×. The FBI told Congress and the National Academies under oath that encryption locked it out of 7,775 devices in 2017 — but in 2018 it admitted a software counting error and put the true number near 1,200. The honest nuance: encryption can still genuinely block some lawful investigations; the dispute is how many cases are actually unsolvable without a built-in backdoor.",
    confidence: 90,
    source:
      "FBI's own 2018 correction, reported by The Washington Post (May 2018); EFF and New America / Open Technology Institute analyses",
    sourceUrl:
      "https://www.eff.org/deeplinks/2018/05/fbi-admits-it-inflated-number-supposedly-unhackable-devices",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Encryption that no warrant can pierce does sometimes leave investigators holding a valid court order they cannot execute, and after Meta switched Messenger to default end-to-end encryption, NCMEC's CyberTipline reports fell by roughly 7 million year-over-year — a real, measurable cost to detecting child abuse.",
    "But the leading technical analyses — the peer-reviewed 'Keys Under Doormats' report by senior cryptographers including RSA's Ron Rivest and Whitfield Diffie — conclude that any mandated access path forces abandonment of forward secrecy, adds complexity that 'is the enemy of security,' and creates concentrated master-key stores that become the highest-value targets on Earth, weakening security for everyone who relies on the same encryption.",
    "So the honest debate isn't 'privacy vs. catching criminals' but whether a third-party access mechanism can be built whose systemic security cost is smaller than the marginal number of serious crimes it actually solves beyond targeted hacking, metadata, and device forensics — a quantity no one has yet been able to demonstrate.",
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
        description:
          "The load-bearing disagreement: does there exist a deployable exceptional-access design whose risk is acceptably bounded, or does every such mechanism necessarily increase systemic risk more than it helps? If a secure design were demonstrated, much of the skeptic case dissolves; if not, the proponent case rests on hope.",
        methodology:
          "Adversarial red-team evaluation of any proposed access architecture: (1) model the threat (nation-state attacker, insider, key-store breach), (2) assess loss of forward secrecy and added complexity, (3) penetration-test reference implementations, (4) compare residual risk against the public-safety benefit. Publish for independent cryptographic review.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (red-team study + reference implementation)",
        falsification: {
          supporter_flip:
            "A skeptic of secure backdoors would have to reconsider if an exceptional-access design survived years of open adversarial red-teaming — preserving forward secrecy, with key custody split and audited — without a demonstrated way to abuse it at scale, the way modern HSM and key-management schemes have held up.",
          skeptic_flip:
            "A proponent should weigh that no proposed design has yet survived independent cryptographic review, that the 1990s Clipper Chip key-escrow scheme was found to contain exploitable flaws, and that lawful-intercept systems themselves get breached (the 2024 Salt Typhoon intrusions hit CALEA wiretap infrastructure) — so 'we can just build it securely' is an unproven engineering claim.",
          common_ground:
            "Both sides agree any exceptional-access mechanism adds an attack surface and that the relevant question is the size of the residual risk, not whether risk is literally zero.",
          live_disagreement:
            "Whether a deployable design exists whose added systemic risk is acceptably bounded — resolvable only by publishing a concrete reference implementation and subjecting it to sustained independent red-team review, which has not yet happened.",
        },
      },
      evidence: [
        {
          id: "keys-under-doormats",
          title: "15 Senior Cryptographers: Exceptional Access Undermines Security",
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
        "The harm is real and measurable. When Meta turned on default end-to-end encryption for Messenger, NCMEC's CyberTipline reports fell sharply — by roughly 7 million year-over-year — which NCMEC attributes largely to encryption blinding the platform to abuse it would otherwise report. End-to-end encryption can render lawfully seized devices and warrant-served accounts unreadable, leaving investigators with valid court orders they cannot execute. Determined offenders coordinate behind encryption that no warrant can pierce.",
      proponent_rebuttal:
        "The 'going dark' threat has been demonstrably overstated, and lawful access is often achievable without weakening encryption for everyone. The FBI repeatedly told Congress it was locked out of ~7,775 devices in 2017; it later admitted the true figure was roughly 1,200, the rest a counting error. Meanwhile targeted lawful hacking — exploiting a specific network rather than mandating a universal backdoor — produced one of the largest crime busts in history (EncroChat). A drop in automated platform reports is not the same as a drop in solvable cases; metadata, device forensics, informants, and targeted exploits remain.",
      crux: {
        id: "marginal-cases-solved",
        title: "Marginal Serious Cases Solved Only via a Mandated Backdoor",
        description:
          "The decisive empirical question: how many serious crimes are actually solved that could NOT have been solved by lawful hacking, metadata, device forensics, or compelled-credential methods — i.e. the marginal value a universal backdoor adds over existing tools — weighed against the security cost it imposes on everyone.",
        methodology:
          "Audit a representative sample of investigations stalled by encryption. For each, determine whether available alternatives (targeted exploit, cloud backups, metadata, lawful compulsion of a passcode) could have succeeded. Estimate the residual set genuinely unsolvable without a built-in backdoor, then weigh against modeled systemic security loss.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (multi-jurisdiction case audit)",
        falsification: {
          supporter_flip:
            "A skeptic of mandated access should change their mind if a rigorous case audit found a substantial, recurring set of serious investigations that genuinely could not be advanced by lawful hacking, cloud backups, metadata, or compelled credentials — i.e. a large marginal value that only a built-in backdoor could deliver.",
          skeptic_flip:
            "A proponent should weigh that the FBI's central 'going dark' statistic was overstated by roughly 6× (7,775 vs. ~1,200 devices), and that the record EncroChat bust (Operation Venetic: 746 UK arrests) came from a targeted exploit of a criminal-only network, not a universal backdoor — so much of the demonstrated payoff comes from lawful hacking rather than mandated access.",
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
            "NCMEC reported about 29.2 million CyberTipline reports in 2024 versus 36.2 million in 2023 — roughly 7 million fewer. NCMEC attributes the decline largely to Meta enabling default end-to-end encryption on Messenger (rolled out from December 2023 through summer 2024), which limits the platform's ability to detect and report child sexual abuse material.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "National Center for Missing & Exploited Children, CyberTipline 2024 data; reporting by NBC News / Associated Press (June 2025)",
          sourceUrl: "https://www.missingkids.org/cybertiplinedata",
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
            "The FBI repeatedly told Congress and the National Academies it could not unlock 7,775 devices in 2017. In 2018 it admitted a software counting error inflated the figure; the true number was roughly 1,200. The Bureau still lacked an accurate count.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Washington Post (May 2018); New America / Open Technology Institute; EFF analysis of the FBI's correction",
          sourceUrl:
            "https://www.eff.org/deeplinks/2018/05/fbi-admits-it-inflated-number-supposedly-unhackable-devices",
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
        description:
          "The pivotal question of governance: can an exceptional-access capability be reliably confined to legitimate, court-authorized use within rights-respecting limits — or does building it inevitably hand the same power to authoritarian governments and thieves, making misuse a matter of when, not if?",
        methodology:
          "Comparative legal-institutional analysis: examine how existing surveillance powers (CALEA, lawful intercept, mutual legal assistance) have been contained or abused across regimes; model whether a backdoor mandate creates pressure other states can exploit; assess transparency and audit mechanisms' track record.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (policy and legal analysis)",
        falsification: {
          supporter_flip:
            "A skeptic of containability should reconsider if comparable surveillance powers (CALEA lawful intercept, financial-records access) showed a long track record of staying confined to court-authorized use under transparency reporting and judicial review, without authoritarian copycat mandates or large-scale theft of the capability.",
          skeptic_flip:
            "A proponent should weigh that democracies already manage abuse-prone tools — wiretaps, search warrants, financial surveillance — through warrants and oversight rather than abolition, and that 'authoritarian regimes want it too' argues for strong democratic governance of access, not for leaving warrant-authorized investigations powerless.",
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
            "In early 2025 the UK issued a secret Technical Capability Notice under the Investigatory Powers Act demanding access to encrypted iCloud data. Rather than build a backdoor, Apple withdrew its Advanced Data Protection end-to-end encryption for UK users — illustrating that a compulsion regime can degrade available security and set cross-border precedent. The order's scope and legal challenge remained contested into 2026.",
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
      ],
    },
  ],
};
