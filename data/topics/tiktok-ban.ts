import type { Topic } from "@/lib/schemas/topic";

export const tiktokBanData = {
  id: "tiktok-ban",
  title: "Should TikTok Be Banned?",
  meta_claim:
    "TikTok poses a genuine national security threat through Chinese government data access and algorithmic influence, justifying a government ban or forced sale.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Data Privacy & National Security
    // =========================================================================
    {
      id: "data-privacy-national-security",
      title: "Data Privacy & National Security",
      short_summary:
        "TikTok collects extensive user data on 170+ million Americans. The core dispute is whether ByteDance can meaningfully resist Chinese government demands for that data under China's 2017 National Intelligence Law, and whether Project Texas (Oracle-hosted US data) actually resolves the risk.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The national security threat is speculative and politically motivated. No publicly available evidence demonstrates that the Chinese government has accessed TikTok user data or weaponized the algorithm against US interests. Project Texas, TikTok's $1.5 billion initiative to store US data on Oracle servers with independent oversight, was designed to address exactly these concerns. The US government collects far more data on its own citizens through Section 702 FISA surveillance and commercial data brokers than China could plausibly obtain through TikTok. If data privacy is the real concern, Congress should pass comprehensive privacy legislation rather than singling out one company.",
      proponent_rebuttal:
        "China's 2017 National Intelligence Law requires all Chinese organizations to 'support, assist, and cooperate with national intelligence work' — ByteDance cannot legally refuse a government data request regardless of corporate promises. In 2022, Forbes reported that ByteDance employees in China accessed US journalists' location data through TikTok to track leaks. Internal documents revealed a 'Committee' of Chinese Communist Party members within ByteDance influencing content decisions. Project Texas cannot address algorithmic manipulation because the recommendation algorithm — TikTok's core product — is developed and maintained in Beijing. The app collects keystroke patterns, biometric identifiers, clipboard contents, and browsing history on 170 million Americans, creating an intelligence goldmine.",
      crux: {
        id: "data-access-evidence",
        title: "The Data Access Audit",
        description:
          "The decisive question is whether ByteDance employees in China can currently access individualized US user data despite Project Texas safeguards. If a fully independent technical audit shows that data isolation is complete and no backdoors exist, the national security argument weakens substantially. If access channels remain, even after $1.5 billion in mitigation, the structural risk is confirmed.",
        methodology:
          "Commission a fully independent technical audit of TikTok's data architecture by a team with Top Secret clearances and no commercial relationship with ByteDance or Oracle. The audit should map every data flow between US servers and Beijing-based systems, test whether the recommendation algorithm can be used as a covert data exfiltration channel, and verify that Project Texas access controls cannot be bypassed by ByteDance engineers with privileged credentials.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-15M (Independent security audit requiring cleared personnel and full source code access)",
      },
      evidence: [
        {
          id: "bytedance-journalist-tracking",
          title: "ByteDance Employees Tracked US Journalists via TikTok Data (2022)",
          description:
            "In December 2022, Forbes reported that ByteDance employees in China used TikTok to access the location data of Forbes journalists who were reporting on the company, in an attempt to identify internal leakers. ByteDance confirmed the surveillance, fired the employees involved, and acknowledged the breach. This occurred while TikTok was publicly assuring Congress that US data was protected from Chinese access.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "Forbes; ByteDance internal investigation",
          sourceUrl: "https://www.forbes.com/sites/emilybaker-white/2022/12/22/tiktok-tracks-forbes-journalists-bytedance/",
          reasoning:
            "ByteDance itself confirmed this incident, making it highly reliable. It directly demonstrates that Chinese-based employees accessed individualized US user data for surveillance purposes, which is the core national security concern. However, it represents unauthorized employee behavior rather than a confirmed Chinese government operation.",
        },
        {
          id: "project-texas-investment",
          title: "TikTok's $1.5 Billion Project Texas Data Isolation Initiative",
          description:
            "TikTok invested over $1.5 billion in Project Texas, a partnership with Oracle to host all US user data on domestic servers with independent access controls. The project includes a new US-based entity, TikTok US Data Security (USDS), with 2,500+ employees operating independently from ByteDance. Oracle conducts source code reviews of any updates before deployment. CFIUS reviewed the arrangement but never formally approved or rejected it before Congress passed the ban-or-sell legislation.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "TikTok USDS; Oracle; Reuters",
          sourceUrl: "https://usds.tiktok.com/",
          reasoning:
            "Project Texas represents a substantial, verifiable technical mitigation effort. However, critics note that the recommendation algorithm — which determines what 170 million Americans see — is still developed in Beijing, and algorithm manipulation cannot be audited through data storage controls alone. Independence score is lower because the primary source is TikTok itself.",
        },
        {
          id: "china-national-intelligence-law",
          title: "China's 2017 National Intelligence Law Compels Corporate Cooperation",
          description:
            "Article 7 of China's 2017 National Intelligence Law states: 'All organizations and citizens shall support, assist, and cooperate with national intelligence work.' Article 14 grants intelligence agencies authority to require institutions to provide 'necessary support, assistance, and cooperation.' Legal scholars note that ByteDance, as a Chinese company, cannot legally refuse a government demand for data or algorithmic cooperation, regardless of its corporate structure or US-based subsidiaries.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 10,
            directness: 7,
          },
          source: "National People's Congress of China; Congressional Research Service; Brookings Institution",
          sourceUrl: "https://crsreports.congress.gov/product/pdf/IF/IF12452",
          reasoning:
            "The law itself is publicly available and its text is unambiguous. However, directness is somewhat lower because the existence of the legal authority does not prove it has been exercised against TikTok specifically. China also argues the law applies to intelligence work specifically, not blanket corporate data access.",
        },
        {
          id: "no-public-evidence-government-access",
          title: "No Public Evidence of Chinese Government Accessing TikTok User Data",
          description:
            "Despite years of investigation, no US intelligence agency has publicly presented evidence that the Chinese government has accessed TikTok's US user data or directed algorithmic manipulation. The FBI and NSA have expressed concern about the 'potential' for abuse but have not documented actual instances. Classified briefings reportedly contain additional information, but the public case rests on theoretical risk rather than demonstrated exploitation.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source: "Senate Intelligence Committee hearings; FBI Director testimony; ACLU",
          sourceUrl: "https://www.aclu.org/news/free-speech/the-tiktok-ban-threatens-everyones-free-speech",
          reasoning:
            "The absence of public evidence is significant but not conclusive — intelligence agencies may have classified evidence they cannot share. The replicability score is lower because classified information is not independently verifiable. This evidence directly challenges the urgency of the claimed threat.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Free Speech & First Amendment
    // =========================================================================
    {
      id: "free-speech-rights",
      title: "Free Speech & First Amendment",
      short_summary:
        "Banning TikTok would silence the speech of 170 million American users and set a precedent for government control over which platforms citizens can use. The Supreme Court upheld the ban in January 2025, but the ruling remains deeply controversial among First Amendment scholars.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "A TikTok ban is unprecedented government censorship of a platform used by 170 million Americans for political speech, journalism, small business marketing, and creative expression. The Supreme Court's January 2025 ruling in TikTok v. Garland upheld the Protecting Americans from Foreign Adversary Controlled Applications Act, but the decision prioritized national security deference over rigorous First Amendment scrutiny. Justice Sotomayor's dissent warned that the majority 'failed to apply the demanding First Amendment standard' and that the precedent could justify banning any foreign-owned communication platform. Content creators, journalists, and small businesses that built livelihoods on TikTok face devastating economic consequences.",
      proponent_rebuttal:
        "The ban targets foreign adversary ownership and control, not speech content. Americans would remain free to express identical content on Instagram Reels, YouTube Shorts, or any other platform. The Supreme Court correctly held that national security interests in preventing a foreign adversary from controlling a mass communication channel justify the ownership restriction. Congress offered a clear alternative — divestiture — that would preserve the platform while removing the security risk. This is not censorship; it is preventing a hostile government from operating a surveillance and influence tool disguised as a social media app inside American borders.",
      crux: {
        id: "first-amendment-precedent",
        title: "The Platform Substitutability Test",
        description:
          "If TikTok users can migrate their content, audiences, and economic activity to alternative platforms without significant loss, the free speech harm of a ban is minimal. If TikTok's unique algorithm and community create speech opportunities that cannot be replicated elsewhere, the ban destroys a distinct speech forum.",
        methodology:
          "Track a representative sample of 10,000 TikTok creators across income levels, follower counts, and content categories. Measure their audience reach, engagement rates, and income on alternative platforms (Instagram Reels, YouTube Shorts, Clapper) over 12 months post-ban. Compare with their TikTok metrics to quantify the actual speech and economic impact of platform loss.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$200K-500K (Longitudinal study of creator migration outcomes)",
      },
      evidence: [
        {
          id: "scotus-upholds-ban",
          title: "Supreme Court Upholds TikTok Ban in TikTok v. Garland (January 2025)",
          description:
            "On January 17, 2025, the Supreme Court unanimously upheld the Protecting Americans from Foreign Adversary Controlled Applications Act, which required ByteDance to divest TikTok's US operations or face a ban. The Court held that the law addressed a national security concern — foreign adversary control of a mass communication platform — rather than targeting speech content. However, Justice Sotomayor's concurrence raised concerns about the majority's lenient First Amendment analysis, and legal scholars remain divided on whether the precedent could justify broader government control over foreign-owned platforms.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 10,
            directness: 9,
          },
          source: "Supreme Court of the United States; SCOTUSblog",
          sourceUrl: "https://www.supremecourt.gov/opinions/24pdf/24-656_ca7d.pdf",
          reasoning:
            "A Supreme Court opinion is the highest legal authority in the US. The ruling directly addresses the constitutionality of the ban. However, legal scholars note that the Court applied an unusually deferential standard to the government's national security claims rather than strict scrutiny.",
        },
        {
          id: "creator-economic-impact",
          title: "7 Million Businesses and Creators Depend on TikTok for Income",
          description:
            "Oxford Economics estimated that TikTok contributed $24.2 billion to US GDP in 2023 and supported over 224,000 jobs. An estimated 7 million US businesses use TikTok for marketing and sales, including many small businesses that cannot afford traditional advertising. TikTok's algorithm uniquely favors small creators over established accounts, making it the only major platform where a new user's content can reach millions organically.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "Oxford Economics (commissioned by TikTok); Small Business Administration",
          sourceUrl: "https://newsroom.tiktok.com/en-us/oxford-economics-report-us-2023",
          reasoning:
            "The economic impact data comes from a TikTok-commissioned study, significantly lowering independence. However, the directional finding — that millions of businesses depend on the platform — is corroborated by independent surveys and SBA data. The unique algorithmic advantage for small creators is widely documented.",
        },
        {
          id: "sotomayor-dissent-precedent",
          title: "Justice Sotomayor Warns Ban Sets Dangerous Censorship Precedent",
          description:
            "In her concurrence/partial dissent in TikTok v. Garland, Justice Sotomayor wrote that the Court 'fails to appreciate the gravity of what it allows' and that banning an entire communication platform 'without proof of an actual problem, cannot be squared with the First Amendment.' She warned that the reasoning could justify banning any foreign-owned media outlet, messaging app, or news organization if the government asserts a national security rationale. First Amendment scholars at Columbia, Harvard, and Stanford filed amicus briefs echoing these concerns.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 10,
            directness: 8,
          },
          source: "Supreme Court of the United States; Columbia Knight First Amendment Institute",
          sourceUrl: "https://knightcolumbia.org/content/tiktok-amicus-brief",
          reasoning:
            "A Supreme Court Justice's opinion and amicus briefs from leading First Amendment institutions carry maximum authority. The precedent concern is a legal argument about future implications rather than a factual claim about current harm, which slightly lowers directness.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Competition & Market Dynamics
    // =========================================================================
    {
      id: "competition-market-dynamics",
      title: "Competition & Market Dynamics",
      short_summary:
        "TikTok's ban would eliminate the strongest competitor to Meta and Google in short-form video, potentially entrenching domestic monopolies. Critics argue the ban is protectionism disguised as national security; proponents argue fair competition requires a level regulatory playing field.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The TikTok ban is Silicon Valley protectionism wrapped in national security language. Meta spent over $30 million lobbying Congress during the ban legislation, and former Meta employees hold key positions in the congressional offices that drafted the bill. Instagram Reels — Meta's direct TikTok clone — stands to capture the majority of TikTok's ad revenue and user base. Banning the most innovative competitor in social media rewards domestic monopolists and reduces incentives for innovation. If the US bans apps based on their country of origin, other nations will retaliate by banning American tech companies, fragmenting the global internet.",
      proponent_rebuttal:
        "Fair competition requires a level playing field. TikTok operates in the US while American social media companies are banned in China — there is no reciprocity. ByteDance benefits from Chinese government subsidies, operates under different privacy and labor standards, and faces no content moderation requirements comparable to US platforms. A forced sale would preserve TikTok's technology and user base under American ownership, maintaining competition while eliminating the foreign control risk. This is not protectionism; it is ensuring that competitors in the American market play by American rules.",
      crux: {
        id: "market-concentration-test",
        title: "The Post-Ban Market Concentration Analysis",
        description:
          "If a TikTok ban leads to measurably increased market concentration in social media — higher Meta/Google market share, reduced ad competition, slower innovation — it would confirm that the ban's primary effect was anticompetitive regardless of its stated rationale. If alternative platforms absorb TikTok's users and competition remains robust, the anticompetitive concern is overstated.",
        methodology:
          "Track social media market concentration using the Herfindahl-Hirschman Index (HHI) across key metrics: monthly active users, digital ad revenue share, creator monetization rates, and algorithmic recommendation innovation. Compare 12-month pre-ban and post-ban periods. Simultaneously track lobbying expenditures by Meta and Google to correlate industry advocacy with legislative outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$100K-300K (Market analysis using publicly available financial data and lobbying disclosures)",
      },
      evidence: [
        {
          id: "meta-lobbying-expenditure",
          title: "Meta Spent $30M+ Lobbying During TikTok Ban Legislation",
          description:
            "OpenSecrets data shows Meta spent over $30 million on federal lobbying in 2023-2024, with TikTok regulation among its top priorities. Meta-funded groups including American Edge Project ran campaigns highlighting TikTok's Chinese ownership. Former Meta policy staff moved to congressional offices involved in drafting the Protecting Americans from Foreign Adversary Controlled Applications Act. Meta CEO Mark Zuckerberg publicly called TikTok a national security threat while Instagram Reels — launched specifically to compete with TikTok — stood to gain the most from a ban.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 9,
            directness: 7,
          },
          source: "OpenSecrets; The Wall Street Journal; Politico",
          sourceUrl: "https://www.opensecrets.org/federal-lobbying/clients/summary?id=D000070667",
          reasoning:
            "Lobbying disclosures are public records with high reliability. The correlation between Meta's lobbying and the ban legislation is documented, though correlation does not prove the ban was solely motivated by competitive interests. Directness is lower because lobbying influence on legislation is indirect.",
        },
        {
          id: "china-reciprocity-argument",
          title: "China Bans Facebook, Instagram, YouTube, and Google — No Reciprocity",
          description:
            "China's Great Firewall blocks Facebook, Instagram, YouTube, Google, Twitter/X, WhatsApp, and virtually all major American social media platforms. Chinese users cannot access these services without circumventing government censorship. Yet TikTok operates freely in the US market with 170 million users. Proponents argue this asymmetry gives Chinese companies an unfair competitive advantage — accessing the American market while denying American companies access to China's 1 billion internet users.",
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
            "The factual claim about China blocking US platforms is indisputable and independently verifiable. However, directness is moderate because the reciprocity argument is about trade fairness, not national security — the stated rationale for the ban. Banning TikTok for reciprocity reasons would be a trade policy decision, not a security one.",
        },
        {
          id: "forced-sale-preserves-competition",
          title: "Forced Divestiture Could Preserve TikTok While Removing Security Risk",
          description:
            "The legislation does not mandate a ban — it requires ByteDance to sell TikTok's US operations to a non-adversary owner. Multiple bidders emerged, including consortiums involving Frank McCourt's Project Liberty, former Treasury Secretary Steven Mnuchin, and tech investor Bobby Kotick. A successful divestiture would preserve TikTok's technology, user base, and competitive pressure on Meta and Google while removing the foreign adversary ownership concern. However, China indicated it would block the sale of TikTok's algorithm, potentially making divestiture technically impossible.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Reuters; The New York Times; Bloomberg",
          sourceUrl: "https://www.reuters.com/technology/tiktok-ban-us-what-you-need-know-2025-01-13/",
          reasoning:
            "The divestiture option is a factual part of the legislation that potentially resolves both security and competition concerns. However, China's potential blocking of algorithm transfer introduces significant uncertainty about whether divestiture is practically achievable, and a TikTok without its recommendation algorithm would be a fundamentally different product.",
        },
      ],
    },
  ],
  references: [
    {
      title: "TikTok v. Garland — Supreme Court Opinion (January 2025)",
      url: "https://www.supremecourt.gov/opinions/24pdf/24-656_ca7d.pdf",
    },
    {
      title: "Protecting Americans from Foreign Adversary Controlled Applications Act — Congress.gov",
      url: "https://www.congress.gov/bill/118th-congress/house-bill/7521",
    },
    {
      title: "TikTok US Data Security (Project Texas) — Official Site",
      url: "https://usds.tiktok.com/",
    },
    {
      title: "China's National Intelligence Law and the Limits of Corporate Compliance — CRS",
      url: "https://crsreports.congress.gov/product/pdf/IF/IF12452",
    },
    {
      title: "The TikTok Ban Threatens Everyone's Free Speech — ACLU",
      url: "https://www.aclu.org/news/free-speech/the-tiktok-ban-threatens-everyones-free-speech",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Is the national security threat real or hypothetical?",
      content:
        "No public evidence shows China has accessed TikTok data or manipulated its algorithm. But China's National Intelligence Law legally compels cooperation, and ByteDance employees were caught tracking journalists. Should policy be based on demonstrated harm or credible structural risk?",
    },
    {
      id: "q2",
      title: "Does banning a platform used by 170 million people violate the First Amendment?",
      content:
        "The Supreme Court upheld the ban, but Justice Sotomayor warned it sets a precedent for government-directed platform shutdowns. If the government can ban TikTok for potential foreign influence, what stops it from targeting other foreign-owned media it considers threatening?",
    },
    {
      id: "q3",
      title: "Is this really about security or about protecting American tech monopolies?",
      content:
        "Meta spent $30 million lobbying during the ban legislation while Instagram Reels stood to capture TikTok's users and ad revenue. China bans all American social media. Is a TikTok ban principled national security policy, protectionist trade retaliation, or a gift to domestic monopolists?",
    },
  ],
};
