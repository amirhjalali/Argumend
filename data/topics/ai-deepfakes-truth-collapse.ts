import type { TopicInput } from "@/lib/schemas/topic";

export const aiDeepfakesTruthCollapseData = {
  id: "ai-deepfakes-truth-collapse",
  title: "AI Deepfakes & the Collapse of Shared Truth",
  question: "Can we still trust what we see online, now that AI can fake anything?",
  aliases: [
    "Have AI deepfakes made it impossible to trust any digital media?",
    "Can you tell a deepfake from a real video?",
  ],
  meta_claim:
    "AI-generated deepfake audio, video, and images have advanced to the point where no digital media can be trusted as authentic, fundamentally undermining evidence-based discourse, journalism, and democratic accountability.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: OpenAI launched Sora 2 (realistic video with
  // synchronized speech) on 30 September 2025 and closed the Sora app on
  // 26 April 2026; the TAKE IT DOWN Act became law on 19 May 2025; Google's
  // Pixel 10 (2025) signs every camera photo with C2PA Content Credentials;
  // the consultant behind the 2024 fake-Biden robocall was fined $6M by the
  // FCC and acquitted by a New Hampshire jury in June 2025.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "AI can now make video with realistic speech from a typed prompt, as OpenAI's Sora 2 did from September 2025. On deepfakes that circulated online in 2024, the best automated detector was right about 78% of the time, against about 90% for expert human analysts. Meanwhile Google's Pixel 10 phones, launched in 2025, cryptographically sign every photo their camera takes. The fight is over whether trust can move from 'seeing is believing' to checkable proof before 'it's a deepfake' becomes an excuse for anything.",
    confidence: 84,
    source:
      "OpenAI, 'Sora 2 is here' (30 September 2025); Chandra et al., Deepfake-Eval-2024 (arXiv:2503.02857); Google Online Security Blog, 'How Pixel and Android are bringing a new level of trust to your images with C2PA Content Credentials' (10 September 2025)",
    sourceUrl: "https://arxiv.org/abs/2503.02857",
  },
  simple_case: [
    "The answer bears on elections, on what courts accept as evidence, on scams that clone a boss's or relative's voice, and on the new US law that makes platforms take down fake nude images within 48 hours.",
    "Fakes already drive scams and harassment. The larger worry on both sides is what happens to real evidence once everyone knows fakes are easy to make.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
  references: [
    {
      title: "Deepfake-Eval-2024: a multi-modal in-the-wild benchmark of deepfakes circulated in 2024 (arXiv:2503.02857)",
      url: "https://arxiv.org/abs/2503.02857",
    },
    {
      title: "Schiff, Schiff & Bueno — The Liar's Dividend, American Political Science Review (2025)",
      url: "https://www.cambridge.org/core/journals/american-political-science-review/article/liars-dividend-can-politicians-claim-misinformation-to-evade-accountability/687FEE54DBD7ED0C96D72B26606AA073",
    },
    {
      title: "Content Authenticity Initiative",
      url: "https://contentauthenticity.org/",
    },
    {
      title: "TAKE IT DOWN Act, Public Law 119-12 (2025) — Congress.gov",
      url: "https://www.congress.gov/bill/119th-congress/senate-bill/146",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Can deepfake detection technology keep pace with generation?",
      content:
        "On deepfakes circulating in 2024, the best automated detectors scored around 78%, below the roughly 90% of expert analysts, and they struggle with new generation methods. Is this a race detection can win with provenance and context, or is the generator built to win, since it only has to fool the average viewer while the detector has to catch everything?",
    },
    {
      id: "q2",
      title: "How should legal systems handle deepfake evidence?",
      content:
        "Courts, journalism and intelligence agencies all depend on audio and video evidence. When any recording can be fabricated, what counts as proof? Should digital media be treated as suspect until it can be verified? What happens to accountability when powerful people can dismiss real evidence as fake?",
    },
    {
      id: "q3",
      title: "Is cryptographic content provenance the solution?",
      content:
        "The C2PA standard lets cameras and phones sign images when they are taken, creating a verifiable chain of custody. Leica, Nikon, Canon and Google's Pixel 10 now ship it. But billions of older devices cannot, and signatures can be stripped. Can provenance spread far enough, fast enough, to matter?",
    },
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Can anyone tell? The detection race.
    // =========================================================================
    {
      id: "detection-arms-race",
      title: "Can Anyone Tell? The Detection Race",
      short_summary:
        "AI video now comes with realistic speech, and voices can be cloned from seconds of audio. Ordinary viewers do little better than chance, and the best automated detectors scored about 78% on real circulating fakes. Expert analysts, using context as well as pixels, do better. Whether detection can stay reliable as generators improve, or trust must move to proof of origin, is the first split.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Detection is not just pixel-peeping, and the fakes that matter get caught. Expert analysts on the Deepfake-Eval-2024 benchmark reached about 90% on real deepfakes circulating online, well above automated tools, because they use context: metadata, the source of the clip, where the person was that day, what witnesses report. The most consequential fakes face the most scrutiny. The fake-Biden robocall sent to New Hampshire voters in January 2024 was exposed and traced within weeks to the consultant who ordered it; the FCC ruled AI-voice robocalls illegal that February and fined him $6 million that September, and the carrier that delivered the calls settled for $1 million. A fake of a politician cannot erase the real politician's schedule. The test is not whether any fake can fool any viewer, but whether a consequential fake survives the scrutiny it will get from motivated, well-resourced analysts, and so far the high-stakes ones mostly have not.",
      proponent_rebuttal:
        "Detection cannot win this race. Generators are trained to remove exactly the flaws detectors look for, and each new detector becomes training data for the next generator. On deepfakes that actually circulated in 2024, the best automated detectors fell from above 95% on clean lab datasets to about 78%, and they generalize poorly to new methods. Ordinary viewers do worse: in a February 2025 test of 2,000 UK and US adults who had been told to look for fakes, 0.1% correctly sorted every real and fake image and video. Voice clones need as little as three seconds of audio, and a finance worker at the engineering firm Arup sent $25 million after a video call with deepfaked colleagues. Since September 2025, consumer apps such as Sora 2 have made realistic video with synchronized speech from a typed prompt. Expert analysis works for the clips that reach experts; most of what reaches a phone screen never does. A defence that must win every round against an attacker trained to beat it is a losing position.",
      crux: {
        id: "detection-reliability-threshold",
        title: "The Detection Reliability Threshold",
        question:
          "Can deepfake detection stay reliable as generators improve, or must trust shift to provenance?",
        description:
          "Whether detection, combined with context and forensic investigation, can stay reliable enough for its most critical uses (evidence in court, intelligence and journalism) as generators improve, or whether trust has to move to provenance: proof of where a file came from.",
        methodology:
          "Run a red-team, blue-team exercise in which leading generators try to fake consequential events (speeches, military actions, corporate announcements) and detection teams use every tool, from pixel analysis and metadata to provenance and witness corroboration. Run it quarterly for three years and track the trend on the high-stakes fakes.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A red-team, blue-team exercise run quarterly for three years, with leading generators faking consequential events and detection teams using every tool from metadata to witness corroboration, tracking accuracy on the high-stakes fakes.",
        },
        cost_to_verify: "$2-5M (multi-year red-team, blue-team detection exercise)",
        falsification: {
          supporter_flip:
            "If a multi-year red-team exercise showed detection plus metadata, provenance and corroboration staying above about 90% on high-stakes fakes, with no widening gap, the claim that detection structurally loses would shrink to 'detection needs investment'.",
          skeptic_flip:
            "If detectors kept slipping on each new generation method, as automated tools fell from above 95% on lab datasets to about 78% on 2024 fakes, while expert accuracy fell too, trust in detection would weaken and provenance would have to carry the load.",
          common_ground:
            "Both sides agree pixel-level detection alone is not enough, that ordinary viewers cannot reliably spot good fakes, and that context such as metadata, source and corroboration raises real-world reliability above detector benchmarks.",
          live_disagreement:
            "Whether detection plus context can stay reliable for consequential media as generators improve, or whether the generator's advantage forces a shift to provenance-first trust, which only a sustained adversarial test can settle.",
        },
      },
      evidence: [
        {
          id: "deepfake-detection-declining-accuracy",
          title: "Deepfake-Eval-2024: Best Automated Detector About 78% Right on Fakes Circulated in 2024, vs. About 90% for Experts",
          description:
            "Detectors that score over 95% on controlled academic datasets degrade sharply on deepfakes found in the wild. The Deepfake-Eval-2024 benchmark, built from deepfakes circulated on social media and deepfake-detection platforms in 2024, found the best commercial video detector reached about 78% accuracy (AUC about 0.79), with AUC dropping roughly 45-50% against older academic benchmarks, still short of the roughly 90% accuracy of expert human forensic analysts. Models trained on one generation method often fail on newer ones.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Chandra et al., 'Deepfake-Eval-2024', arXiv:2503.02857 (2025)",
          sourceUrl: "https://arxiv.org/abs/2503.02857",
          reasoning:
            "Built from real circulated fakes, so more telling than lab datasets. It shows automated detection falling behind, and also that expert analysts using more than pixels still do much better, which is the other side's point.",
        },
        {
          id: "iproov-human-detection",
          title: "iProov Test, February 2025: Of 2,000 Adults Told to Look for Fakes, 0.1% Sorted Every Image and Video Correctly",
          description:
            "Biometrics firm iProov showed 2,000 UK and US consumers a series of real and deepfake images and videos. 'Only 0.1% of participants could accurately distinguish real from fake content across all stimuli', in a study 'where participants were primed to look for deepfakes.' Deepfake videos were harder to identify than images, and 30% of those aged 55 to 64 and 39% of those 65 and over had never heard of deepfakes.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source: "iProov, 'Study Reveals Deepfake Blindspot' (12 February 2025)",
          sourceUrl: "https://www.iproov.com/press/study-reveals-deepfake-blindspot-detect-ai-generated-content",
          reasoning:
            "Shows how badly ordinary viewers do, which is what matters for most everyday media. It comes from a company that sells deepfake detection, and 'all stimuli correct' is a harsh bar that tells us little about average accuracy, so its weight is low.",
        },
        {
          id: "sora-2-realism",
          title: "OpenAI, September 2025: Sora 2 Made Realistic Video With Synchronized Dialogue From a Prompt; App Closed April 2026",
          description:
            "OpenAI released Sora 2 on 30 September 2025, describing it as 'more physically accurate, realistic, and more controllable than prior systems', with 'synchronized dialogue and sound effects', in a consumer app that let users put their own likeness, and permitted friends' likenesses, into generated videos. OpenAI's page now reads: 'as of April 26, 2026, the Sora product is no longer available.'",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 7,
            directness: 5,
          },
          source: "OpenAI, 'Sora 2 is here' (30 September 2025; page updated after the April 2026 discontinuation)",
          sourceUrl: "https://openai.com/index/sora-2/",
          reasoning:
            "Shows realistic video with speech reaching an ordinary phone app. It is the maker's description of capability, not a measure of harm, and the app's closure shows such products can also be withdrawn.",
        },
        {
          id: "ai-voice-cloning-three-seconds",
          title: "Microsoft Research, 2023: VALL-E Cloned a Voice From a Three-Second Sample",
          description:
            "Microsoft's VALL-E research showed a model could synthesize speech in a person's voice from a three-second enrolled recording, preserving the speaker's emotion and acoustic environment. Commercial voice-cloning services have since made short-sample cloning widely available, putting anyone who has spoken publicly within reach of words they never said.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 9,
            directness: 7,
          },
          source: "Wang et al., 'Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers' (VALL-E), Microsoft Research (2023)",
          sourceUrl: "https://www.microsoft.com/en-us/research/publication/neural-codec-language-models-are-zero-shot-text-to-speech-synthesizers/",
          reasoning:
            "A documented, reproducible capability. It describes what can be done, not how often it causes harm.",
        },
        {
          id: "nh-robocall-deepfake-2024",
          title: "Fake-Biden Robocall, New Hampshire 2024: Exposed and Traced Within Weeks; $6M FCC Fine; Jury Acquitted Its Maker",
          description:
            "In January 2024, AI-generated audio of President Biden's voice was robocalled to thousands of New Hampshire households before the primary, urging them to 'save their vote for the November election'. On 8 February 2024 the FCC unanimously ruled that calls using AI-generated voices are 'artificial' under the Telephone Consumer Protection Act. In September 2024 it fined political consultant Steve Kramer $6 million, and the carrier that delivered the calls, Lingo Telecom, settled for $1 million. On 13 June 2025 a New Hampshire jury acquitted Kramer on all 22 counts, including felony counts of suppressing turnout and impersonating a candidate; he had admitted making the calls and told the court he did it to warn about AI's dangers.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 6,
          },
          source:
            "FCC, 'FCC Makes AI-Generated Voices in Robocalls Illegal' (8 February 2024); New Hampshire Public Radio (13 June 2025)",
          sourceUrl: "https://www.nhpr.org/nh-news/2025-06-13/political-operative-fake-biden-robocalls-nh-primary-found-not-guilty",
          reasoning:
            "The best-documented election deepfake in the US, and it cuts both ways. The fake was detected and traced to its maker quickly, which supports the view that consequential fakes get caught. But it reached voters first, and the criminal case failed, so detection did not translate into accountability.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: The liar's dividend. Does 'it's fake' let the guilty escape?
    // =========================================================================
    {
      id: "liars-dividend",
      title: "The Liar's Dividend: Does 'It's a Fake' Let the Guilty Escape?",
      short_summary:
        "Once anything can be faked, anyone caught on camera can claim the recording is fake. That 'liar's dividend' may do more damage than any deepfake. But in large experiments, crying 'deepfake' worked against written reports of a scandal and mostly failed against video. Whether the excuse actually lets powerful people escape accountability is the second split.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The liar's dividend is real but smaller than feared, and the best test of it points that way. In five experiments with more than 15,000 American adults, in the American Political Science Review in 2025, politicians who falsely called a scandal 'fake news' or a deepfake did gain support, but the authors found these claims 'largely ineffective against video evidence' and that they did 'not reduce general trust in media.' Doctored photos and forged documents are older than AI, and courts have always required authentication. The excuse also wears out: a politician who calls every bad clip a deepfake soon stops being believed, and public judgment adjusts. Real recordings rarely stand alone; there are witnesses, other cameras, metadata and the person's own past statements. The danger is real, but it is a reason to build verification, not proof that truth has collapsed.",
      proponent_rebuttal:
        "The excuse is in use, and it works best where it matters most. Powerful figures have already waved away authentic recordings: Donald Trump reportedly told allies in 2017 that the Access Hollywood tape, which he had acknowledged and apologized for, might not be real. The same APSR experiments that found the defence weak against video found it worked against text-based reports, which is how most scandals are first reported, and it beat staying silent or apologizing. The experiments used real scandals, before convincing fakes were common; as fakes spread, a public that has seen many of them has more reason to doubt any one clip. The dividend does not need deepfakes to be used at all. It needs only that everyone knows they exist, and after Sora 2, cloned voices and fake nudes, everyone does. A defence that costs nothing and needs no proof will keep being tried until it works.",
      crux: {
        id: "liars-dividend-impact-measurement",
        title: "The Accountability Impact Assessment",
        question:
          "Does calling real evidence a deepfake actually let powerful people escape accountability?",
        description:
          "Whether the 'it's a deepfake' defence measurably reduces accountability for the powerful. If it has deflected genuine accountability in many documented cases, the threat is concrete; if it rarely succeeds because forensics, context and public judgment separate real from fake, it is more theoretical than practical.",
        methodology:
          "Compile every documented instance from 2020 to 2026 of public figures or institutions claiming real evidence was a deepfake. For each, record whether forensic analysis confirmed authenticity, whether the defence deflected accountability (votes, resignations, prosecutions, approval), and how the outcome compares with similar cases before deepfakes. Track whether successful uses are rising.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A database of every documented case from 2020 to 2026 where a public figure called real evidence a deepfake, recording what forensics found and how the accountability outcome compares with similar cases before deepfakes.",
        },
        cost_to_verify: "$150K-400K (systematic case study analysis with forensic verification)",
        falsification: {
          supporter_flip:
            "If a systematic case database showed the 'it's a deepfake' defence almost never succeeding, with forensics and context re-establishing authenticity and outcomes no different from before deepfakes, the liar's dividend would be a nuisance, not a threat to accountability.",
          skeptic_flip:
            "If tracking showed the defence working in real elections and scandals, and succeeding more often as fakes spread, despite the 2025 experiments, the claim that it is overblown would be hard to hold.",
          common_ground:
            "Both sides agree the 'it's a deepfake' defence is now used against genuine recordings, that it works better against text reports than against video in experiments, and that forensic authentication of specific clips is often possible.",
          live_disagreement:
            "Whether the defence measurably deflects accountability for the powerful at scale, and whether that is growing as fakes spread, which only a forensically verified case database can resolve.",
        },
      },
      evidence: [
        {
          id: "liars-dividend-experiments-video",
          title: "APSR 2025, Five Experiments, 15,000+ Adults: Crying 'Deepfake' Worked Against Text Reports but Largely Failed Against Video",
          description:
            "Kaylyn Jackson Schiff, Daniel Schiff and Natália Bueno ran five survey experiments with over 15,000 American adults, showing them stories about real politicians' scandals followed by responses including false claims that the story was fake news or a deepfake. The false claims raised support for the politician across partisan groups, and did better than staying silent or apologizing. But the authors report that these strategies 'are effective against text-based reports of scandals, but are largely ineffective against video evidence and do not reduce general trust in media.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "Schiff, Schiff & Bueno, 'The Liar's Dividend: Can Politicians Claim Misinformation to Evade Accountability?', American Political Science Review 119(1), 71-90 (February 2025)",
          sourceUrl:
            "https://www.cambridge.org/core/journals/american-political-science-review/article/liars-dividend-can-politicians-claim-misinformation-to-evade-accountability/687FEE54DBD7ED0C96D72B26606AA073",
          reasoning:
            "The largest experimental test, in a leading journal, and the strongest evidence that the dividend is limited for video. It is not a clean win: the dividend was real for text, the measures are survey support rather than votes or prosecutions, and the scandals were real ones from before convincing fakes were common.",
        },
        {
          id: "access-hollywood-deepfake-claim",
          title: "Trump Reportedly Suggested in 2017 That the Access Hollywood Tape Might Not Be Authentic",
          description:
            "After acknowledging and apologizing for the 2005 Access Hollywood tape in 2016, Donald Trump reportedly suggested to allies in 2017 that the tape might not be authentic, although it had been verified by NBC. He did not use the word 'deepfake', but the episode is a first example of a powerful person casting doubt on an authenticated recording.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "The New York Times (28 November 2017)",
          sourceUrl: "https://www.nytimes.com/2017/11/28/us/politics/trump-access-hollywood-tape.html",
          reasoning:
            "Illustrates the dividend before AI made it plausible. It rests on reports of private remarks, the tape predates modern deepfakes, and the doubt did not stick publicly, so directness is limited.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: The fix. Proof of origin, and the law.
    // =========================================================================
    {
      id: "provenance-verification",
      title: "The Fix: Proof of Origin, and the Law",
      short_summary:
        "Instead of spotting fakes, provenance proves where real files came from: cameras and phones sign images when they are taken, under the C2PA standard. Leica, Nikon, Canon and Google's Pixel 10 now do. Billions of older phones cannot, and signatures can be stripped. Congress has made platforms remove fake intimate images within 48 hours. Whether proof of origin spreads faster than distrust is the third split.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "The fix is arriving where it matters first. Provenance does not need every phone; it needs the sources the public relies on. Leica, Nikon and Canon ship cameras that sign photos under the C2PA standard, the cameras photojournalists carry, and in 2025 Google's Pixel 10 became the first phone line with Content Credentials 'built in across every photo created by Pixel Camera', with the camera app at the highest security level the C2PA programme defines. When wire services, newsrooms and governments sign what they publish, the media that matters can be checked even if holiday snaps cannot. That is how HTTPS spread: banks and governments first, then everyone. The law is moving too: the TAKE IT DOWN Act, signed in May 2025, criminalizes publishing non-consensual intimate images, real or AI-made, and requires platforms to remove them within 48 hours of a request. Fraud losses give banks and companies every reason to adopt verification fast.",
      proponent_rebuttal:
        "Provenance is the right long-term idea and far too slow for the problem. Billions of phones in use cannot sign anything, and the turnover of devices takes years; until then, unsigned media is the norm, not the exception. Signatures can be stripped, and a missing signature proves nothing, so an attacker can strip a real file to cast doubt on it. Platforms will not require credentials until most content has them, and device makers will not prioritize them until platforms require them. Meanwhile the damage is happening now: Deloitte projects generative-AI-enabled fraud could push US losses to about $40 billion by 2027, from $12.3 billion in 2023, and a Hong Kong finance worker at Arup sent $25 million after a video call with deepfaked colleagues. The TAKE IT DOWN Act addresses one harm after the fact; it does not restore trust in a video of a war or a speech. Provenance must be built before distrust becomes the default, and it is losing that race.",
      crux: {
        id: "provenance-adoption-timeline",
        title: "The Provenance Adoption Race",
        question:
          "Will trusted content-provenance tools spread faster than deepfake-driven distrust?",
        description:
          "Whether content provenance can reach enough trusted sources (newsrooms, governments, professional and phone cameras, platforms) before distrust of all media becomes the default. If provenance covers consequential media first, the crisis is manageable; if distrust wins the race, rebuilding trust will be hard.",
        methodology:
          "Track C2PA adoption in four groups: camera and phone hardware, news organizations, social platforms (including whether they keep or strip credentials), and government communications. Track public trust in digital media through repeated surveys, and compare the curve with the HTTPS rollout as a model of a voluntary cryptographic standard.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Quarterly tracking of C2PA adoption in cameras, phones, newsrooms, platforms and government channels, alongside surveys of public trust in digital media, including how often provenance metadata gets stripped.",
        },
        cost_to_verify: "$300K-800K (industry adoption tracking with public trust surveys)",
        falsification: {
          supporter_flip:
            "If provenance spread through wire services, official channels, professional cameras and best-selling phones, as HTTPS did from banks outward, while trust in signed media held up, consequential media would stay verifiable and the transition would look far from hopeless.",
          skeptic_flip:
            "If adoption tracking showed C2PA stalling among trusted sources, with platforms stripping credentials or attackers routinely removing them while trust kept falling, the bet on building provenance before distrust hardens would fail.",
          common_ground:
            "Both sides agree older devices cannot be retrofitted, that the transition takes years, that a missing signature proves nothing, and that provenance needs to cover consequential media, not every snapshot, to be useful.",
          live_disagreement:
            "Whether provenance coverage of consequential media outpaces deepfake-driven distrust before that distrust becomes the default, a race only joint tracking of adoption and public trust can call.",
        },
      },
      evidence: [
        {
          id: "pixel-10-c2pa",
          title: "Google, September 2025: Pixel 10 Is the First Phone Line to Sign Every Camera Photo With C2PA Credentials",
          description:
            "Google announced that 'the Pixel 10 lineup is the first to have Content Credentials built in across every photo created by Pixel Camera', that the Pixel Camera app 'achieved Assurance Level 2, the highest security rating currently defined by the C2PA Conformance Program', and that the phones support on-device trusted timestamps so images taken offline can still be verified. It describes a 'private-by-design' certificate approach in which no image can be linked to the person who took it.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 7,
            directness: 7,
          },
          source:
            "Google Online Security Blog, 'How Pixel and Android are bringing a new level of trust to your images with C2PA Content Credentials' (10 September 2025)",
          sourceUrl: "https://security.googleblog.com/2025/09/pixel-android-trusted-images-c2pa-content-credentials.html",
          reasoning:
            "The first sign that provenance is reaching phones, where most images are taken, which weakens the claim that it is limited to professional cameras. It is one phone line with a small market share, described by its maker, and a signature only helps if platforms keep it and viewers check it.",
        },
        {
          id: "nikon-canon-c2pa-cameras",
          title: "Leica, Nikon and Canon Professional Cameras Sign Photos With C2PA Credentials (2023-2025)",
          description:
            "Leica's M11-P (October 2023) was the first camera to ship with C2PA Content Credentials built in. Nikon added C2PA support to the Z9 by firmware and field-tested it with Agence France-Presse, and Canon released firmware bringing Content Credentials to the EOS R1 and EOS R5 Mark II in July 2025. These are cameras photojournalists use to cover wars, elections and breaking news.",
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
            "Provenance moving from specification to the cameras behind the most consequential news photos. Much of it arrived only in 2024-25, and professional cameras are a tiny share of all image capture.",
        },
        {
          id: "c2pa-content-provenance-standard",
          title: "C2PA: An Open Standard for Signing Media at Capture, Backed by Adobe, Microsoft, Google, Camera Makers and Newsrooms",
          description:
            "The Coalition for Content Provenance and Authenticity (C2PA) has developed an open standard that embeds verifiable origin and editing history into digital media. Adobe, Microsoft, Google, Intel, Nikon, Canon, Leica and others have joined. Signed media carries a tamper-evident chain of custody anyone can check, and the standard has been taken up by platforms and publishers including LinkedIn, the BBC and The New York Times.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 7,
            directness: 6,
          },
          source: "C2PA; Adobe Content Authenticity Initiative; Microsoft",
          sourceUrl: "https://c2pa.org/",
          reasoning:
            "The most promising technical answer, with broad industry backing. It verifies new media from signing devices only; it cannot vouch for the billions of existing files and devices without it, and backers describing their own standard are not independent.",
        },
        {
          id: "take-it-down-act",
          title: "TAKE IT DOWN Act, Law Since 19 May 2025: Platforms Must Remove Non-Consensual Intimate Images, Real or AI-Made, Within 48 Hours",
          description:
            "The TAKE IT DOWN Act (Public Law 119-12) 'prohibits the nonconsensual online publication of intimate visual depictions of individuals, both authentic and computer-generated', with criminal penalties including prison. Covered platforms must set up a process for victims to request removal and 'must remove such depictions within 48 hours of notification.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "Congress.gov, S.146, TAKE IT DOWN Act, CRS summary of Public Law 119-12 (19 May 2025)",
          sourceUrl: "https://www.congress.gov/bill/119th-congress/senate-bill/146",
          reasoning:
            "Shows the law adapting to the most common deepfake harm. It addresses harassment after the fact rather than trust in news or evidence, and its effect depends on enforcement, so it bears on the crux only indirectly.",
        },
        {
          id: "deepfake-fraud-financial-losses",
          title: "Deloitte Projects Generative-AI Fraud Could Push US Losses to $40 Billion by 2027, From $12.3 Billion in 2023",
          description:
            "Deloitte's Center for Financial Services projects that generative-AI-enabled fraud, including voice impersonation of executives, fake video-call participants and synthetic identities, could push US fraud losses to about $40 billion by 2027, from an estimated $12.3 billion in 2023, a compound annual growth rate of about 32%. In one documented case, a Hong Kong finance employee at the engineering firm Arup transferred $25 million after a video call with deepfaked versions of the company's CFO and colleagues.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source: "Deloitte Center for Financial Services, 'Deepfake banking and AI fraud risk on the rise'; CNN reporting on the Arup case",
          sourceUrl: "https://www.deloitte.com/us/en/insights/industry/financial-services/deepfake-banking-fraud-risk-on-the-rise.html",
          reasoning:
            "A forward projection, not a measured loss (conservative scenarios are lower), plus one well-documented case. It shows harm arriving faster than provenance, and also a strong financial motive for banks and companies to adopt verification.",
        },
      ],
    },
  ],
} satisfies TopicInput;
