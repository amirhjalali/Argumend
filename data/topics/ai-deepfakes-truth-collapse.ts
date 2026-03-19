import type { Topic } from "@/lib/schemas/topic";

export const aiDeepfakesTruthCollapseData = {
  id: "ai-deepfakes-truth-collapse",
  title: "AI Deepfakes & the Collapse of Shared Truth",
  meta_claim:
    "AI-generated deepfake audio, video, and images have advanced to the point where no digital media can be trusted as authentic, fundamentally undermining evidence-based discourse, journalism, and democratic accountability.",
  status: "contested" as const,
  category: "technology" as const,
  imageUrl:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Deepfakes and the New Disinformation War — Foreign Affairs",
      url: "https://www.foreignaffairs.com/articles/world/2018-12-11/deepfakes-and-new-disinformation-war",
    },
    {
      title: "Content Authenticity Initiative — Adobe",
      url: "https://contentauthenticity.org/",
    },
    {
      title: "The State of Deepfakes 2024 — Sensity AI",
      url: "https://sensity.ai/reports/",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can deepfake detection technology keep pace with generation?",
      content:
        "Detection accuracy for state-of-the-art deepfakes has fallen to 70-80% and continues declining as generation improves. Real-time generation makes detection at scale impossible. Is this an arms race detection can win, or is the generator permanently advantaged — as in cryptography, where the encoder always has the advantage?",
    },
    {
      id: "q2",
      title: "How should legal systems handle deepfake evidence?",
      content:
        "Courts, journalism, and intelligence agencies all depend on audio/video evidence. When any recording can be fabricated, what constitutes proof? Should all digital media be considered suspect until cryptographically verified? What happens to accountability when powerful actors can dismiss real evidence as fake?",
    },
    {
      id: "q3",
      title: "Is cryptographic content provenance the solution?",
      content:
        "The C2PA standard enables camera-level digital signing that creates a verifiable chain of custody for media. Adobe, Microsoft, and major camera manufacturers have signed on. But adoption barriers are massive — billions of existing devices lack the capability, and spoofing risks remain. Can provenance infrastructure be built before trust collapses entirely?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: The Liar's Dividend
    // =========================================================================
    {
      id: "liars-dividend",
      title: "The Liar's Dividend",
      short_summary:
        "When anyone can claim that real evidence is a deepfake, accountability collapses. The 'liar's dividend' describes how the mere existence of deepfake technology allows guilty parties to dismiss genuine evidence as fabricated. This second-order effect may be more damaging than deepfakes themselves.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The liar's dividend is not hypothetical — it is already operating. In 2023, a candidate in Turkey's presidential election dismissed a genuine sex tape as an AI deepfake, and voters had no way to verify the claim. Donald Trump has suggested that the Access Hollywood tape — authenticated by multiple forensic analyses — could be a deepfake. Military officials in Myanmar and Gabon have dismissed real evidence of atrocities as AI-generated. The pattern is clear: deepfake technology does not need to be used to fabricate evidence; its mere existence provides a universal alibi for anyone caught on camera. This is not a future threat — it is a present reality that is eroding accountability for the powerful at an accelerating rate.",
      proponent_rebuttal:
        "The liar's dividend concern is real but overstated as an existential threat to truth. Society has always navigated claims of fabricated evidence — doctored photographs existed long before AI, and courts have always required authentication. The legal system is adapting: forensic analysis can still detect many deepfakes, chain-of-custody documentation strengthens evidence admissibility, and the C2PA content provenance standard is being adopted by major hardware and software companies. Moreover, the liar's dividend is self-limiting: if every politician dismisses every unfavorable recording as a deepfake, the defense loses credibility. Public trust calibrates over time. The real challenge is building verification infrastructure fast enough, not the impossibility of maintaining truth in a deepfake era.",
      crux: {
        id: "liars-dividend-impact-measurement",
        title: "The Accountability Impact Assessment",
        description:
          "The crux is whether the liar's dividend measurably reduces accountability for powerful actors. If analysis shows that the 'it's a deepfake' defense has successfully deflected genuine accountability in a significant number of documented cases, the threat is concrete. If the defense rarely succeeds because forensic analysis, contextual evidence, and public judgment can distinguish real from fake, the threat is more theoretical than practical.",
        methodology:
          "Compile a comprehensive database of all documented instances where public figures or institutions have claimed that real evidence was a deepfake (2020-2026). For each case, track: whether forensic analysis confirmed authenticity, whether the deepfake defense succeeded in deflecting accountability, and whether the outcome was different from pre-deepfake-era comparable cases. Assess whether the frequency of successful 'deepfake defense' claims is increasing over time.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$150K-400K (Systematic case study analysis with forensic verification)",
      },
      evidence: [
        {
          id: "nh-robocall-deepfake-2024",
          title: "AI-Generated Biden Robocall Targeted New Hampshire Primary Voters (2024)",
          description:
            "In January 2024, an AI-generated deepfake audio of President Biden was used in robocalls to New Hampshire voters, falsely telling them not to vote in the Democratic primary. The deepfake was convincing enough that many voters could not distinguish it from Biden's real voice. The incident led to an FCC ruling making AI-generated voice robocalls illegal and demonstrated that AI deepfakes could directly interfere in democratic elections.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 9,
          },
          source: "Federal Communications Commission; The New York Times; NBC News",
          sourceUrl: "https://www.nytimes.com/2024/02/09/technology/ai-robocall-biden-new-hampshire.html",
          reasoning:
            "This is a well-documented, high-profile case of deepfake technology directly used to interfere in a democratic election. The FCC response confirms the seriousness of the incident. It directly demonstrates that AI deepfakes can be deployed at scale to undermine democratic processes.",
        },
        {
          id: "access-hollywood-deepfake-claim",
          title: "Trump Suggested Access Hollywood Tape Could Be a Deepfake (2017)",
          description:
            "After initially acknowledging the authenticity of the 2005 Access Hollywood tape, Donald Trump reportedly suggested to allies in 2017 that the tape might not be authentic — despite the tape being verified by NBC, confirmed by multiple witnesses, and authenticated by forensic analysis. While Trump did not use the term 'deepfake' (the technology was nascent), the incident presaged the liar's dividend: powerful individuals dismissing authenticated recordings as potentially fabricated.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "The New York Times; Washington Post",
          sourceUrl: "https://www.nytimes.com/2017/11/28/us/politics/trump-access-hollywood-tape.html",
          reasoning:
            "The incident illustrates the liar's dividend concept before deepfake technology was widely available. However, the evidence is based on reports of private statements rather than public declarations, and the tape predates modern AI deepfake capability, making the directness score lower.",
        },
        {
          id: "deepfake-detection-declining-accuracy",
          title: "Deepfake Detection Accuracy Declining as Generation Improves",
          description:
            "Academic benchmarks show that deepfake detection accuracy has declined from over 95% for early GAN-based deepfakes (2019) to approximately 70-80% for state-of-the-art diffusion-based deepfakes (2024-2025). Detection models trained on one generation method often fail on newer techniques. The generator-detector arms race is fundamentally asymmetric: generators need only fool the average human observer, while detectors must catch every fake — a much harder task. Real-time deepfake generation in video calls adds a new dimension that makes detection at scale functionally impossible.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "IEEE Conference on Computer Vision; MIT Media Lab; Sensity AI",
          sourceUrl: "https://sensity.ai/reports/",
          reasoning:
            "Academic detection benchmarks are rigorous and peer-reviewed. The declining accuracy trend is consistent across multiple research groups. However, benchmarks test detection under controlled conditions — real-world detection has additional contextual signals (metadata, source verification) that can improve accuracy beyond pure visual analysis.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Detection Arms Race
    // =========================================================================
    {
      id: "detection-arms-race",
      title: "The Detection Arms Race",
      short_summary:
        "Current deepfake detection relies on identifying statistical artifacts that generators leave behind. But detection is fundamentally disadvantaged: generators are trained against detectors, and each new generation method defeats models trained on previous ones. The question is whether detection can ever achieve the reliability needed for legal, journalistic, and intelligence applications.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Detection cannot win the arms race, and betting society's information integrity on detection is irresponsible. The fundamental problem is mathematical: generative adversarial networks are literally designed to defeat detectors — that is how they are trained. Each improvement in detection creates a training signal for the next generation of generators. Current detection methods work by identifying subtle statistical patterns (frequency domain artifacts, physiological inconsistencies, temporal coherence failures) that generators have not yet learned to eliminate. But there is no physical law preventing generators from eliminating these artifacts — it is simply a matter of computational resources and training data. The trajectory is clear: detection accuracy will continue declining toward 50% (random chance) as generation technology improves.",
      proponent_rebuttal:
        "The detection pessimism overstates the case. Detection is not limited to pixel-level analysis — it can incorporate metadata analysis, provenance tracking, behavioral pattern detection, and cross-referencing with known authentic sources. A deepfake of a politician saying something cannot erase the real politician's schedule, witness accounts, or communication patterns. Furthermore, the most consequential deepfakes — those that could influence elections, move markets, or trigger military responses — will face the most scrutiny and the most sophisticated detection. The relevant standard is not 'can any deepfake fool any detector' but 'can a consequential deepfake survive the scrutiny it will receive from motivated, well-resourced analysts.' Human judgment, combined with technological tools and contextual analysis, provides a much stronger defense than pure technical detection alone.",
      crux: {
        id: "detection-reliability-threshold",
        title: "The Detection Reliability Threshold",
        description:
          "The crux is whether deepfake detection can maintain sufficient reliability for its most critical use cases: legal evidence authentication, intelligence analysis, and journalism. If detection accuracy for high-stakes deepfakes (when combined with contextual analysis and forensic investigation) remains above 90%, the information integrity crisis is manageable. If detection becomes unreliable even with maximum effort, the shift to provenance-based trust becomes urgent.",
        methodology:
          "Create a red team/blue team exercise where leading deepfake generators attempt to create undetectable deepfakes of consequential events (political speeches, military actions, corporate announcements), and leading detection teams attempt to identify them using all available tools (visual analysis, metadata, provenance, behavioral analysis, witness corroboration). Run quarterly for 3 years to track the trajectory. This would be the most rigorous assessment of real-world detection capability.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$2-5M (Multi-year red team/blue team detection reliability exercise)",
      },
      evidence: [
        {
          id: "c2pa-content-provenance-standard",
          title: "C2PA Content Provenance Standard Adopted by Major Tech Companies",
          description:
            "The Coalition for Content Provenance and Authenticity (C2PA) has developed an open standard for cryptographic content provenance that embeds verifiable origin and editing history into digital media at the point of capture. Adobe, Microsoft, Google, Intel, Nikon, Canon, Leica, and others have joined the initiative. C2PA-enabled cameras digitally sign images at creation, creating a chain of custody that can be verified by anyone. The standard is being integrated into media platforms including LinkedIn, BBC, and The New York Times.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source: "C2PA; Adobe Content Authenticity Initiative; Microsoft",
          sourceUrl: "https://c2pa.org/",
          reasoning:
            "C2PA represents the most promising technical approach to content authentication, with broad industry adoption. However, it solves the provenance problem for new content created on C2PA-enabled devices — it cannot retroactively verify existing media or content from devices without the standard. The gap between current adoption and the billions of existing non-C2PA devices limits near-term effectiveness.",
        },
        {
          id: "ai-voice-cloning-three-seconds",
          title: "AI Voice Cloning Requires Only 3 Seconds of Audio Sample",
          description:
            "Modern AI voice cloning systems (Microsoft VALL-E, ElevenLabs, Respeecher) can create convincing voice clones from as little as 3 seconds of sample audio. The cloned voice can generate arbitrary speech in real-time with emotional inflection, accent, and speaking style matching. This makes anyone who has ever spoken publicly — politicians, executives, military leaders, journalists — vulnerable to having words put in their mouth. Audio deepfakes are particularly dangerous because humans overweight audio cues in credibility assessments.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 8,
          },
          source: "Microsoft Research; MIT Technology Review; Sensity AI",
          sourceUrl: "https://www.technologyreview.com/2023/01/09/1066502/voice-clone-ai-three-seconds/",
          reasoning:
            "The technical capability is well-documented and independently verifiable — anyone can test voice cloning services. The 3-second threshold is specific and concerning because virtually every public figure has that much audio available. The directness score reflects that this describes capability, not demonstrated widespread harm.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Provenance & Verification Infrastructure
    // =========================================================================
    {
      id: "provenance-verification",
      title: "Provenance & Verification Infrastructure",
      short_summary:
        "Rather than trying to detect fakes, the provenance approach seeks to verify authenticity by creating cryptographic chains of custody from the point of media capture. The C2PA standard and Content Authenticity Initiative represent this approach, but adoption barriers are enormous and the transition period is dangerous.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Content provenance is the right long-term approach, but the transition is more complex than advocates acknowledge. There are currently over 6 billion smartphones worldwide, virtually none of which have C2PA capability. Retrofitting provenance into existing devices is impossible — it requires hardware-level cryptographic signing chips. Even with all new devices supporting C2PA from today, the installed base turnover would take 5-10 years. During this transition, media without provenance metadata would be the norm, not the exception — and attackers could strip provenance metadata from authentic content to cast doubt on it. The chicken-and-egg problem is also severe: platforms will not require provenance until most content has it, and device manufacturers will not prioritize it until platforms require it.",
      proponent_rebuttal:
        "The transition challenge is real but the trajectory is positive. The critical insight is that provenance does not need universal adoption to be useful — it needs adoption by trusted sources. When the BBC, New York Times, Reuters, and AP wire service images carry C2PA provenance, and when official government communications are cryptographically signed, the most consequential media can be verified even if personal smartphone photos are not. This 'trusted tier' approach mirrors how HTTPS adoption proceeded: critical sites (banks, government, e-commerce) adopted first, creating a norm that eventually became universal. Camera manufacturers Nikon, Canon, and Leica have already implemented C2PA in professional cameras, prioritizing the devices used by journalists and official photographers. The infrastructure does not need to be complete to be valuable — it needs to be built before the trust collapse becomes irreversible.",
      crux: {
        id: "provenance-adoption-timeline",
        title: "The Provenance Adoption Race",
        description:
          "The crux is whether content provenance infrastructure can achieve sufficient adoption among trusted sources (news organizations, government, professional photography) before the deepfake detection gap becomes so severe that public trust in all media collapses irreversibly. If provenance adoption outpaces deepfake generation capability for consequential content, the information integrity crisis is manageable. If deepfake-driven distrust becomes the default before provenance is widespread, rebuilding trust will be extraordinarily difficult.",
        methodology:
          "Track C2PA adoption across four categories: (1) camera hardware (professional and consumer), (2) news organizations, (3) social media platforms, and (4) government communications. Simultaneously track public trust in digital media through quarterly surveys. Model the intersection point where provenance coverage of consequential media becomes sufficient to maintain public trust. Conduct historical comparison with HTTPS adoption as an analog for voluntary cryptographic standard rollout.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$300K-800K (Industry adoption tracking with public trust survey component)",
      },
      evidence: [
        {
          id: "nikon-canon-c2pa-cameras",
          title: "Nikon and Canon Ship Professional Cameras with C2PA Provenance (2024)",
          description:
            "Nikon's Z9 and Canon's EOS R1 professional cameras now include C2PA-compliant digital signing that cryptographically authenticates images at the point of capture. These are the cameras used by photojournalists covering wars, elections, and breaking news. The provenance metadata creates a tamper-evident chain of custody from camera sensor to publication. Leica has also announced C2PA support for its M-series cameras. This means the highest-stakes photographic evidence — the images that appear in newspapers and courts — is beginning to carry verifiable provenance.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Nikon; Canon; Content Authenticity Initiative; PetaPixel",
          sourceUrl: "https://contentauthenticity.org/",
          reasoning:
            "Hardware implementation of C2PA by the two largest camera manufacturers demonstrates that provenance infrastructure is moving from specification to deployment. However, professional cameras represent a tiny fraction of all image capture (smartphones dominate), and the timeline for smartphone adoption remains uncertain, limiting the near-term impact.",
        },
        {
          id: "deepfake-fraud-financial-losses",
          title: "Deepfake Fraud Cost Businesses $25 Billion in 2024",
          description:
            "Deloitte estimated that deepfake-enabled fraud — including CEO voice impersonation scams, fake video conference participants, and synthetic identity fraud — cost businesses approximately $25 billion in 2024. A Hong Kong finance employee transferred $25 million after a video call with deepfaked versions of the company's CFO and colleagues. These financial losses create concrete economic incentives for businesses to invest in verification and provenance infrastructure, potentially accelerating adoption beyond what voluntary standards alone would achieve.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Deloitte; CNN; South China Morning Post",
          sourceUrl: "https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk/index.html",
          reasoning:
            "The $25 billion loss figure from Deloitte provides a concrete measure of deepfake harm beyond theoretical information integrity concerns. The Hong Kong incident is specifically well-documented. However, fraud loss estimates vary widely across sources and may include losses that are only partially attributable to deepfake technology.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
