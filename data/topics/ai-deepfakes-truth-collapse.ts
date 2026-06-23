import type { Topic } from "@/lib/schemas/topic";

export const aiDeepfakesTruthCollapseData = {
  id: "ai-deepfakes-truth-collapse",
  title: "AI Deepfakes & the Collapse of Shared Truth",
  meta_claim:
    "AI-generated deepfake audio, video, and images have advanced to the point where no digital media can be trusted as authentic, fundamentally undermining evidence-based discourse, journalism, and democratic accountability.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The most documented harm from deepfakes so far isn't fake videos fooling people — it's the inverse: the mere existence of the technology lets people dismiss real footage as 'AI fakery.' Researchers call this the 'liar's dividend,' and it has already surfaced in real politics — in Gabon, opponents branded a New Year's video of the ailing President Bongo a 'deepfake' (forensic analysis later found it genuine), and the doubt helped trigger an attempted coup. Meanwhile the best automated detectors hit only about 78% on real 2024 deepfakes, well below the ~90% of expert human analysts.",
    confidence: 84,
    source:
      "Chesney & Citron, 'Deep Fakes' (California Law Review, 2019, coined 'liar's dividend'); Chandra et al., Deepfake-Eval-2024 (arXiv:2503.02857)",
    sourceUrl: "https://arxiv.org/abs/2503.02857",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Generation is racing ahead of detection: voice clones now need only ~3 seconds of sample audio, and on a 2024 in-the-wild benchmark the best automated video detector reached only ~78% accuracy (AUC ≈0.79) — a ~45-50% drop from its score on clean academic datasets — while a deepfaked video call already cost the engineering firm Arup $25 million.",
    "But the apocalypse framing oversells it: expert human analysts still hit ~90%, detection can lean on metadata, provenance, and context rather than pixels alone, and cryptographic provenance (the C2PA standard, now shipping in Leica, Nikon, and Canon cameras) gives trusted sources a verifiable chain of custody — society also navigated doctored photographs for a century before AI.",
    "So the honest debate isn't whether any fake can fool any viewer (it can) but whether verification infrastructure and the 'liar's dividend' move faster than each other — whether trusted-source provenance reaches consequential media before reflexive 'it's a deepfake' distrust becomes the default and erodes accountability irreversibly.",
  ],
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
        "On in-the-wild benchmarks, the best automated detectors now score around 78% on 2024-era deepfakes — well below the ~90% of expert human analysts — and struggle to generalize to new generation methods. Real-time generation in live video calls adds a further challenge. Is this an arms race detection can win with provenance and contextual signals, or is the generator structurally advantaged because it only needs to fool the average observer while detectors must catch everything?",
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
        "The liar's dividend is not hypothetical — it is already operating. In 2023, a candidate in Turkey's presidential election dismissed a genuine sex tape as an AI deepfake, and voters had no way to verify the claim. Donald Trump has suggested that the Access Hollywood tape — authenticated by multiple forensic analyses — could be a deepfake. In Gabon (2018-19), political rivals branded a genuine New Year's video of an ailing President Bongo a 'deepfake,' helping trigger an attempted coup; in Myanmar, a contested confession video was widely dismissed as AI-generated. The pattern is clear: deepfake technology does not need to be used to fabricate evidence; its mere existence provides a universal alibi for anyone caught on camera. This is not a future threat — it is a present reality that is eroding accountability for the powerful at an accelerating rate.",
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
        falsification: {
          supporter_flip:
            "If a systematic database of 'it's a deepfake' claims showed the defense almost never succeeds — that forensic analysis, contextual evidence, and public judgment reliably re-establish authenticity, and that accountability outcomes are no different from the pre-deepfake era — then the liar's dividend would be a rhetorical nuisance, not a structural threat to accountability.",
          skeptic_flip:
            "A skeptic who calls the liar's dividend overblown should weigh that it has already been deployed in live elections (Turkey 2023, Gabon 2018-19) and that its power doesn't require any fake to be made — the mere availability of the technology supplies a universal alibi for anyone caught on camera, which is hard to forensically rebut to a non-expert public.",
          common_ground:
            "Both sides agree the 'it's a deepfake' defense is now being invoked against genuine recordings, and that forensic authentication of specific clips is often technically possible.",
          live_disagreement:
            "Whether the defense measurably deflects accountability for powerful actors at scale — which only a comprehensive, forensically verified case database tracking whether the 'deepfake defense' actually changed outcomes (and whether it's succeeding more often over time) can resolve.",
        },
      },
      evidence: [
        {
          id: "nh-robocall-deepfake-2024",
          title: "AI-Generated Biden Robocall Targeted New Hampshire Primary Voters (2024)",
          description:
            "In January 2024, an AI-generated deepfake audio of President Biden was used in robocalls to New Hampshire voters, falsely telling them not to vote in the Democratic primary. Political consultant Steve Kramer orchestrated the calls; the FCC subsequently ruled AI-generated voice robocalls illegal under existing law, issued a $6 million forfeiture order against Kramer, and fined transmitting carrier Lingo Telecom $1 million, while New Hampshire indicted Kramer on 26 counts. The incident demonstrated that AI deepfakes could directly interfere in democratic elections.",
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
            "Detectors that score over 95% on controlled academic datasets degrade sharply on real-world ('in-the-wild') deepfakes. The Deepfake-Eval-2024 benchmark found the best commercial video detector reaches only ~78% accuracy (AUC ≈0.79) on deepfakes circulated on social media in 2024 — with AUC dropping roughly 45-50% versus older academic benchmarks — and still falls short of the ~90% accuracy of expert human forensic analysts. Detection models trained on one generation method often fail on newer techniques. The generator-detector dynamic is asymmetric: generators need only fool the average human observer, while detectors must generalize to every new generation method. Real-time deepfake generation in video calls adds a further dimension that makes detection at scale harder still.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Deepfake-Eval-2024 (arXiv:2503.02857); peer-reviewed detection-generalization literature",
          sourceUrl: "https://arxiv.org/abs/2503.02857",
          reasoning:
            "The ~78% in-the-wild figure comes from a 2024 multi-modal benchmark of real circulated deepfakes, which is more representative than controlled academic datasets. The generalization gap is replicated across multiple research groups. The 'declining toward random chance' framing is removed as speculative: the same benchmark shows human experts still hit ~90%, and real-world detection adds contextual signals (metadata, source verification) beyond pure visual analysis.",
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
        "Detection cannot win the arms race, and betting society's information integrity on detection is irresponsible. The fundamental problem is mathematical: generative adversarial networks are literally designed to defeat detectors — that is how they are trained. Each improvement in detection creates a training signal for the next generation of generators. Current detection methods work by identifying subtle statistical patterns (frequency domain artifacts, physiological inconsistencies, temporal coherence failures) that generators have not yet learned to eliminate. But there is no physical law preventing generators from eliminating these artifacts — it is simply a matter of computational resources and training data. Real-world results already bear this out: on 2024 in-the-wild benchmarks, the best automated detectors manage only ~78%, far below their >95% scores on controlled datasets, and they generalize poorly to unseen generation methods. Betting society's information integrity on a defender that must win every round against an adversary trained specifically to beat it is a losing structural position.",
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
        falsification: {
          supporter_flip:
            "If a multi-year red-team/blue-team exercise showed that, on the highest-stakes deepfakes, detection combined with metadata, provenance, and witness corroboration reliably stays above ~90% and the gap is not widening, the 'detection structurally loses the arms race' claim would collapse into 'detection needs ongoing investment, not replacement.'",
          skeptic_flip:
            "A skeptic who trusts detection should weigh that generators are literally trained to defeat detectors, that the best automated systems already fell to ~78% on 2024 in-the-wild deepfakes (from >95% on clean datasets), and that detectors must generalize to every new generation method while a generator only has to fool the average observer once.",
          common_ground:
            "Both sides agree pixel-level detection alone is insufficient and that contextual signals (metadata, provenance, source verification, witness accounts) materially raise real-world reliability above naked detector benchmarks.",
          live_disagreement:
            "Whether detection-plus-context can hold a high reliability threshold for consequential media as generators improve, or whether the generator's structural advantage forces a shift to provenance-first trust — which only a sustained, adversarial red-team/blue-team trajectory can settle.",
        },
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
          source: "Microsoft Research (Wang et al., 'Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers,' VALL-E, 2023)",
          sourceUrl: "https://www.microsoft.com/en-us/research/publication/neural-codec-language-models-are-zero-shot-text-to-speech-synthesizers/",
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
        falsification: {
          supporter_flip:
            "If adoption tracking showed C2PA stalling among trusted sources — cameras, wire services, platforms, and governments not converging, or attackers routinely stripping provenance metadata so verified media stays a rare exception while public trust keeps falling — then provenance would arrive too late to be the answer, and the 'build it before trust collapses' bet would have already failed.",
          skeptic_flip:
            "A skeptic who thinks the transition is hopeless should weigh that provenance doesn't need universal adoption to work — only adoption by trusted tiers (BBC, Reuters, AP, official communications), and that professional cameras from Leica, Nikon, and Canon plus the HTTPS-style 'critical sites first' rollout pattern show a credible path for consequential media.",
          common_ground:
            "Both sides agree retrofitting 6+ billion existing devices is impossible, that the installed-base transition takes years, and that provenance only needs to cover consequential media — not every smartphone photo — to be useful.",
          live_disagreement:
            "Whether trusted-source provenance coverage of consequential media outpaces deepfake-driven distrust before that distrust becomes the irreversible default — an empirical race only joint tracking of C2PA adoption curves against public-trust surveys can call.",
        },
      },
      evidence: [
        {
          id: "nikon-canon-c2pa-cameras",
          title: "Professional Cameras Ship with C2PA Provenance (2023-2025)",
          description:
            "Leica's M11-P (October 2023) was the first camera to ship with C2PA Content Credentials built in. Nikon added C2PA support to the Z9 via firmware and field-tested it with Agence France-Presse, and Canon released firmware bringing Content Credentials to the EOS R1 and EOS R5 Mark II in July 2025. These are the cameras used by photojournalists covering wars, elections, and breaking news. The provenance metadata creates a tamper-evident chain of custody from camera sensor to publication. This means the highest-stakes photographic evidence — the images that appear in newspapers and courts — is beginning to carry verifiable provenance.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 7,
          },
          source: "Leica; Nikon; Canon; Content Authenticity Initiative; PetaPixel",
          sourceUrl: "https://contentauthenticity.org/",
          reasoning:
            "Hardware and firmware implementation of C2PA by Leica, Nikon, and Canon demonstrates that provenance infrastructure is moving from specification to deployment. However, much of this support arrived only in 2024-2025 (Canon's bodies in mid-2025), professional cameras represent a tiny fraction of all image capture (smartphones dominate), and the timeline for smartphone adoption remains uncertain, limiting the near-term impact.",
        },
        {
          id: "deepfake-fraud-financial-losses",
          title: "Deloitte Projects Generative-AI Fraud Losses Reaching $40 Billion by 2027",
          description:
            "Deloitte's Center for Financial Services projects that generative-AI-enabled fraud — including CEO voice impersonation scams, fake video conference participants, and synthetic identity fraud — could push US fraud losses to roughly $40 billion by 2027, up from an estimated $12.3 billion in 2023 (a ~32% compound annual growth rate). The risk is already concrete: a Hong Kong finance employee at engineering firm Arup transferred $25 million after a video call with deepfaked versions of the company's CFO and colleagues. These mounting losses create economic incentives for businesses to invest in verification and provenance infrastructure, potentially accelerating adoption beyond what voluntary standards alone would achieve.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Deloitte Center for Financial Services; CNN",
          sourceUrl: "https://www.deloitte.com/us/en/insights/industry/financial-services/deepfake-banking-fraud-risk-on-the-rise.html",
          reasoning:
            "The $40 billion figure is a Deloitte projection for 2027, not a measured 2024 loss — an earlier version of this item conflated it with a measured number, which has been corrected. It is a forward-looking model (conservative scenarios put it closer to $22 billion), so replicability and directness are lower than a settled measurement. The Hong Kong/Arup incident is specifically well-documented (the figure there is $25 million, not billion). Projected fraud losses still establish a real and growing economic incentive for provenance infrastructure.",
        },
      ],
    },
  ],
} satisfies Omit<Topic, "confidence_score">;
