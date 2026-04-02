import type { Topic } from "@/lib/schemas/topic";

export const governmentPlatformBansData = {
  id: "government-platform-bans",
  title: "Government Bans on Social Media Platforms",
  meta_claim:
    "Governments are justified in banning or forcing the divestiture of foreign-owned social media platforms like TikTok on national security grounds, even at the cost of restricting free expression for millions of citizens.",
  status: "contested" as const,
  category: "policy" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Protecting Americans from Foreign Adversary Controlled Applications Act — Congress.gov",
      url: "https://www.congress.gov/bill/118th-congress/house-bill/7521",
    },
    {
      title: "Internet Shutdowns and Social Media Bans Around the World — Freedom House",
      url: "https://freedomhouse.org/report/freedom-net",
    },
    {
      title: "Platform Governance and National Security — Brookings Institution",
      url: "https://www.brookings.edu/articles/the-geopolitics-of-platform-governance/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is the national security threat from foreign-owned platforms real or pretextual?",
      content:
        "ByteDance's relationship with the CCP, data routing through Oracle, and the precedent of other countries banning TikTok suggest real concerns — but US tech companies collect equivalent data and face no similar restrictions. Is this security policy or protectionism?",
    },
    {
      id: "q2",
      title: "Does banning a social media platform violate free speech principles?",
      content:
        "The Supreme Court upheld the TikTok ban-or-sell law, but the tension between national security and free expression remains unresolved. Should governments have the power to decide which communication platforms their citizens can use?",
    },
    {
      id: "q3",
      title: "Should the principle extend to any foreign-owned platform?",
      content:
        "If TikTok is banned because of Chinese ownership, what about Telegram (UAE-based), platforms with Saudi investment, or European-owned services? Where is the principled line between adversary-nation concerns and general techno-nationalism?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: National Security Data Threat
    // =========================================================================
    {
      id: "national-security-data-threat",
      title: "National Security & Data Sovereignty",
      short_summary:
        "Foreign-owned platforms with 100+ million domestic users create potential intelligence collection and influence operation capabilities for adversary governments. The core question is whether corporate data protections can withstand state-level coercion from authoritarian governments with legal authority to compel cooperation.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The national security justification for platform bans is selectively applied and ultimately pretextual. US-based companies like Meta, Google, and Amazon collect far more data on Americans than TikTok, and the US government itself accesses this data through FISA Section 702, National Security Letters, and commercial data purchases. No public evidence demonstrates that China has accessed TikTok user data or weaponized the algorithm. The real motivation is geopolitical competition — preventing a Chinese company from dominating a market that American companies want to control. If data privacy were the genuine concern, Congress would pass comprehensive privacy legislation rather than targeting one company's nationality.",
      proponent_rebuttal:
        "The distinction is not between data collection and no data collection — it is between data accessible to a democratic government with judicial oversight and data accessible to an authoritarian state with no legal constraints. China's 2017 National Intelligence Law compels all Chinese organizations to cooperate with intelligence operations — ByteDance cannot legally refuse. The 2022 Forbes investigation confirmed that ByteDance employees in China accessed US journalists' location data through TikTok. India banned TikTok in 2020 citing security concerns, as have government devices in the EU, UK, Canada, and Australia. The consistent assessment across allied democracies is that adversary-controlled platforms represent a genuine structural risk that corporate promises cannot mitigate.",
      crux: {
        id: "adversary-access-verification",
        title: "The Adversary Access Audit",
        description:
          "The decisive question is whether adversary governments can compel access to user data or algorithmic manipulation on platforms owned by entities under their jurisdiction, despite corporate safeguards. If independent audits demonstrate that data isolation and algorithmic independence are technically achievable and verifiable, the security case weakens. If structural access persists despite mitigation, bans may be justified.",
        methodology:
          "Commission independent technical audits of platform data architectures by security-cleared teams with no commercial relationship to any party. Audit should map all data flows between domestic and foreign servers, test algorithmic manipulation capabilities from foreign engineering teams, and assess whether access controls can be bypassed under legal compulsion in the platform's home jurisdiction.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$10-30M (Multi-platform independent security audit requiring cleared personnel)",
      },
      evidence: [
        {
          id: "india-tiktok-ban-precedent",
          title: "India Banned TikTok and 58 Chinese Apps Citing National Security (2020)",
          description:
            "In June 2020, India banned TikTok and 58 other Chinese apps following border clashes with China, citing national security and data sovereignty concerns. TikTok had 200 million users in India at the time. Indian domestic alternatives rapidly filled the market gap, and the Indian government reported no significant adverse effects on digital innovation. The ban has remained in effect for over five years, serving as the largest-scale precedent for a democracy banning a foreign social media platform.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Ministry of Electronics and Information Technology, India; Reuters",
          sourceUrl: "https://www.reuters.com/technology/india-extends-ban-tiktok-other-chinese-apps-citing-security-2021-01-26/",
          reasoning:
            "India's ban provides a real-world precedent showing that a democracy can ban a foreign platform without catastrophic consequences. Independence is moderate because India's decision was partly motivated by geopolitical tensions rather than pure security assessment. Directness is moderate because India's experience may not translate perfectly to the US market.",
        },
        {
          id: "allied-government-device-bans",
          title: "EU, UK, Canada, and Australia Ban TikTok on Government Devices",
          description:
            "Between 2022 and 2023, the European Commission, UK Parliament, Canadian government, and Australian government all banned TikTok on official devices, citing cybersecurity concerns. The European Commission stated the ban was necessary to protect against 'potential data collection and misuse.' These decisions were made independently by security agencies across allied democracies with access to classified intelligence assessments.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "European Commission; BBC; Government of Canada",
          sourceUrl: "https://www.bbc.com/news/technology-64804870",
          reasoning:
            "The convergent assessment across multiple allied security agencies strongly suggests a genuine security concern rather than US-specific protectionism. However, device bans are a much less restrictive measure than consumer bans, so the directness of this evidence for justifying a complete ban is moderate.",
        },
        {
          id: "us-data-broker-hypocrisy",
          title: "US Data Brokers Sell Equivalent Data Without Restriction",
          description:
            "American data brokers like Acxiom, CoreLogic, and LexisNexis collect and sell detailed personal data on hundreds of millions of Americans — including location history, purchasing behavior, health information, and political affiliation — to any buyer, including foreign governments and their proxies. A 2023 Duke University study found that data brokers readily sold sensitive data on active-duty military personnel. If the concern is adversary access to American data, the data broker industry is a far larger vulnerability than any single social media app.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "Duke University Sanford School of Public Policy; FTC",
          sourceUrl: "https://techpolicy.sanford.duke.edu/data-brokers-and-the-sale-of-data-on-us-military-personnel/",
          reasoning:
            "This evidence directly challenges the consistency of the national security justification. If adversary access to American data is the concern, the unregulated data broker industry represents a far larger vulnerability. The selective focus on TikTok while ignoring data brokers suggests the motivation is not purely security-driven.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Free Speech & Democratic Precedent
    // =========================================================================
    {
      id: "free-speech-democratic-precedent",
      title: "Free Speech & Democratic Precedent",
      short_summary:
        "Banning a communication platform used by hundreds of millions of citizens sets a precedent for government control over information channels. The question is whether national security exceptions to free speech principles can be contained or will inevitably expand.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Platform bans are censorship regardless of the stated justification. Authoritarian regimes ban platforms for 'national security' — China bans Facebook, Russia bans Twitter, Iran bans Telegram — and we correctly identify these as speech suppression. When democracies ban platforms, we cannot claim the principle is different simply because we trust our own government's motives. The precedent is the mechanism: once a government establishes the power to ban a communication platform, that power will be used against domestic platforms when politically convenient. The Supreme Court's deference to national security claims in TikTok v. Garland mirrors the same deference that enabled Japanese internment and mass surveillance programs.",
      proponent_rebuttal:
        "The comparison to authoritarian censorship is categorically wrong. China bans Facebook because the Chinese government wants to control what its citizens can say. The US TikTok legislation targets foreign adversary ownership, not speech content — Americans would remain free to say identical things on any other platform. The legislation explicitly offers divestiture as an alternative to a ban, which would preserve the platform under non-adversary ownership. Furthermore, the argument that any restriction on a communication channel is inherently censorship proves too much: it would prohibit foreign ownership restrictions on broadcast media, which have existed under FCC rules since 1934 without sliding into authoritarianism.",
      crux: {
        id: "precedent-expansion-test",
        title: "The Precedent Containment Assessment",
        description:
          "The crux is whether the legal and political precedent of banning a foreign-owned platform can be contained to genuine adversary-nation security threats, or will inevitably expand to justify government restrictions on any platform the state finds inconvenient. If historical analysis shows that narrow security exceptions tend to stay narrow, the precedent concern is manageable. If they consistently expand, the free speech risk may outweigh the security benefit.",
        methodology:
          "Conduct a comprehensive historical analysis of government powers initially justified by national security that subsequently expanded beyond their original scope. Examine FISA (1978 to post-9/11 mass surveillance), material support statutes, and broadcasting ownership restrictions. Assess whether legislative safeguards (sunset provisions, judicial review requirements) successfully contained scope expansion. Compare with democracies that have banned platforms (India) to measure downstream effects on broader press freedom.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Historical legal analysis with comparative international study)",
      },
      evidence: [
        {
          id: "scotus-tiktok-ruling-2025",
          title: "Supreme Court Upholds TikTok Ban-or-Sell Law (January 2025)",
          description:
            "The Supreme Court unanimously upheld the Protecting Americans from Foreign Adversary Controlled Applications Act, accepting the government's national security rationale for requiring ByteDance to divest TikTok's US operations. The majority opinion held that the law targeted foreign adversary control rather than speech content. However, Justice Sotomayor warned in her concurrence that the ruling failed to apply rigorous First Amendment scrutiny and could justify banning any foreign-owned communication platform.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "Supreme Court of the United States",
          sourceUrl: "https://www.supremecourt.gov/opinions/24pdf/24-656_ca7d.pdf",
          reasoning:
            "The Supreme Court's ruling is the highest legal authority on this question and directly validates the constitutionality of platform bans for national security. The unanimous decision gives it maximum legal weight, though the Sotomayor concurrence signals potential vulnerability in future cases.",
        },
        {
          id: "fisa-scope-expansion",
          title: "FISA Surveillance Powers Expanded Far Beyond Original Scope",
          description:
            "The Foreign Intelligence Surveillance Act was enacted in 1978 as a narrow tool for monitoring foreign spies. By 2013, the Snowden revelations showed it had expanded into a mass surveillance program collecting metadata on virtually all American phone calls and internet activity. This trajectory — from narrow security exception to broad government power — is exactly what free speech advocates fear will happen with platform ban authority.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 7,
          },
          source: "The Guardian; Edward Snowden disclosures; Church Committee records",
          sourceUrl: "https://www.theguardian.com/world/interactive/2013/nov/01/snowden-nsa-files-surveillance-revelations-decoded",
          reasoning:
            "The FISA precedent is well-documented and directly illustrates the pattern of security powers expanding beyond their original scope. The directness score is moderate because FISA concerns surveillance authority, not platform bans specifically, and the analogy may not hold perfectly.",
        },
        {
          id: "fcc-foreign-ownership-rules",
          title: "FCC Foreign Ownership Restrictions on Broadcast Media Since 1934",
          description:
            "The Communications Act of 1934 restricts foreign ownership of broadcast licenses to 25%, a rule that has been in effect for 90 years without expanding into broader censorship. This provides a counter-example to the 'precedent expansion' concern — a targeted foreign ownership restriction in media that remained narrow for nearly a century. Proponents argue that platform ownership restrictions are a natural extension of this established principle.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "Federal Communications Commission; Congressional Research Service",
          sourceUrl: "https://www.fcc.gov/consumers/guides/foreign-ownership-broadcast-cable-and-common-carrier",
          reasoning:
            "This is strong evidence that foreign ownership restrictions in media can exist without sliding into censorship. However, the analogy is imperfect because broadcast licensing is fundamentally different from banning an internet platform — broadcasting requires scarce spectrum while internet access does not.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Selective Enforcement & Geopolitical Competition
    // =========================================================================
    {
      id: "selective-enforcement",
      title: "Selective Enforcement & Geopolitical Competition",
      short_summary:
        "Platform bans target foreign-owned services while domestic companies collecting equivalent data face no comparable restrictions. This selectivity suggests the real driver may be economic competition and geopolitical rivalry rather than genuine security concerns.",
      icon_name: "Target" as const,
      skeptic_premise:
        "The selective enforcement pattern reveals the true motivation. Meta spent over $30 million lobbying during TikTok ban legislation while its Instagram Reels product — a direct TikTok clone — stood to capture billions in redirected ad revenue. Former Meta policy staff held positions in the congressional offices that drafted the bill. US tech companies collect equivalent or more data on Americans, share it with advertisers worldwide, and face no ownership restrictions. The argument that Chinese data access is uniquely dangerous ignores that the NSA's PRISM program demonstrates the US government accesses American tech company data on a massive scale. The real concern is that a Chinese company is outcompeting American companies in a market they want to dominate.",
      proponent_rebuttal:
        "Noting that domestic companies also collect data does not negate the distinct threat of adversary government access. The difference between Meta collecting data and ByteDance collecting data is not the data — it is who can compel access. Mark Zuckerberg cannot be legally compelled by the Chinese Communist Party to hand over user data or manipulate the algorithm to serve Chinese strategic interests; ByteDance can. China bans all American social media platforms — there is zero reciprocity. The selective enforcement critique amounts to arguing that because we have not solved every data privacy problem, we cannot address the most acute one. The appropriate response is both: pass comprehensive privacy legislation AND restrict adversary control of major platforms.",
      crux: {
        id: "competitive-motive-test",
        title: "The Competitive Motive Analysis",
        description:
          "The crux is whether the platform ban is primarily motivated by genuine national security concerns or by economic protectionism serving domestic tech companies. If lobbying records, legislative history, and post-ban market outcomes show that the primary beneficiaries are domestic competitors rather than national security, the selective enforcement critique is validated.",
        methodology:
          "Analyze the complete lobbying record of the ban legislation, mapping financial contributions and personnel connections between domestic tech companies and the legislators who drafted and voted for the bill. Compare the pre-ban and post-ban market share, ad revenue, and user metrics of Meta, Google, and Snap to quantify the competitive benefit. Survey the classified intelligence briefings (through cleared researchers) to assess whether the security case rests on substantive intelligence or speculative risk assessments.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Lobbying analysis, market study, and cleared intelligence review)",
      },
      evidence: [
        {
          id: "meta-lobbying-tiktok-ban",
          title: "Meta Spent $30M+ Lobbying During TikTok Ban Legislation",
          description:
            "OpenSecrets data shows Meta spent over $30 million on federal lobbying in 2023-2024, with TikTok regulation among its top priorities. Meta-funded groups including the American Edge Project ran campaigns highlighting TikTok's Chinese ownership. Instagram Reels — launched specifically to compete with TikTok — stood to capture the majority of TikTok's $12 billion US ad revenue if the ban took effect.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "OpenSecrets; The Wall Street Journal",
          sourceUrl: "https://www.opensecrets.org/federal-lobbying/clients/summary?id=D000070667",
          reasoning:
            "Lobbying disclosures are public records with high reliability. The correlation between Meta's advocacy and the ban legislation is documented, though lobbying alone does not prove that security concerns are pretextual — legislators may have been influenced by both security briefings and industry pressure simultaneously.",
        },
        {
          id: "china-reciprocity-reality",
          title: "China Bans All Major American Social Media Platforms",
          description:
            "China's Great Firewall blocks Facebook, Instagram, YouTube, Google, Twitter/X, WhatsApp, and virtually all major American social media platforms. Chinese users cannot access these services without circumventing government censorship. Chinese companies operate freely in Western markets while Western companies are completely excluded from China's 1 billion internet users — a structural asymmetry that gives Chinese tech firms significant competitive advantages.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 6,
          },
          source: "Council on Foreign Relations; Freedom House",
          sourceUrl: "https://www.cfr.org/backgrounder/media-censorship-china",
          reasoning:
            "The asymmetry in market access is factually indisputable. However, the directness score is lower because the reciprocity argument is about trade fairness rather than national security — the stated justification for the ban. Using trade reciprocity to justify a security measure conflates two different policy rationales.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
