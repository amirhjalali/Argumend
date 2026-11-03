export const aiContentLabelingData = {
  id: "ai-content-labeling",
  title: "Mandatory AI Content Labeling",
  question:
    "Should the law require labels or watermarks on AI-generated content?",
  meta_claim:
    "AI-generated content should be required by law to carry visible labels or watermarks identifying it as AI-created.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "In a 2022 PNAS study, people told AI-generated faces from real ones with 48.2% accuracy, no better than a coin flip. In a 2023 University of Maryland study, researchers removed every invisible image watermark they tested, and showed watermarks could be forged so real photos are flagged as AI-generated. Both findings stand. The fight is over whether a legal labeling mandate can still deter deception without burdening ordinary uses of AI.",
    confidence: 86,
    source:
      "Nightingale & Farid, PNAS (2022); Saberi, Sadasivan, Feizi et al., 'Robustness of AI-Image Detectors' (University of Maryland, ICLR 2024)",
    sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.2120481119",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that no current watermark is unbreakable by a determined adversary, that labels still raise the cost of casual deception, and that narrow disclosure rules for deceptive deepfakes are defensible while an over-broad mandate would sweep in ordinary editing tools.",
    "They split over whether watermarks and C2PA provenance can survive screenshots, compression and deliberate removal at usable rates; and whether mandates like Article 50 of the EU AI Act and China's deep-synthesis rules measurably reduce beneficial and creative uses of AI.",
  ],
  pillars: [
    {
      id: "misinformation-prevention",
      title: "Misinformation Prevention",
      short_summary:
        "Proponents argue labeling AI content helps the public distinguish real from synthetic media; skeptics counter that removable labels may do little to slow misinformation.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "The labels that matter least are the ones adversaries control. Invisible watermarks are removable by diffusion-purification and adversarial attacks (Saberi/Feizi et al. broke every scheme they tested), and metadata-based provenance like C2PA is stripped by any screenshot, re-encode, or upload that drops the signature. Worse, the same techniques let attackers forge labels — flagging genuine images as synthetic. Mandatory labeling can thus create a false sense of security: unlabeled content gets trusted more by default, exactly the inference a motivated bad actor wants, while honest creators bear the compliance cost.",
      proponent_rebuttal:
        "No serious proponent claims watermarks are unbreakable — the point is to raise the cost and default expectation of disclosure, not to make evasion impossible. Cryptographic provenance (C2PA Content Credentials) is signed, not a removable watermark: stripping it removes the proof of authenticity rather than forging it, so absent or broken credentials become a signal in themselves. Paired with platform-side detection and legal accountability under the EU AI Act, even imperfect labeling shifts norms the way nutrition and paid-partnership disclosures did — reducing casual deception without pretending to stop a determined attacker.",
      crux: {
        id: "watermark-robustness",
        title: "Watermark Robustness Under Adversarial Conditions",
        question:
          "Can watermarks survive real-world edits and deliberate removal at usable rates?",
        description:
          "Testing whether current AI watermarking techniques survive common transformations like screenshotting, compression, cropping, and deliberate adversarial removal attempts.",
        methodology:
          "Apply state-of-the-art pixel/signal watermarks (Google SynthID, Meta Stable Signature) and attach C2PA Content Credentials (cryptographic provenance metadata) to 10,000 AI-generated images and text samples. Subject each to a battery of transformations, including diffusion-purification and model-substitution removal attacks. Measure detection rate post-transformation, tracking watermark survival and metadata retention separately.",
        equation:
          "R_{robust} = \\frac{\\text{detected after transform}}{\\text{total watermarked}} \\times 100",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A battery test on thousands of watermarked and C2PA-credentialed AI images and texts, run through screenshots, compression, cropping and known removal attacks, measuring how often the mark is still detected and how often it can be forged.",
        },
        cost_to_verify: "$500K (Large-scale adversarial testing study)",
        falsification: {
          supporter_flip:
            "If new tests extending Saberi and Feizi's work kept breaking and forging every watermark scheme, and C2PA provenance kept dropping on any re-encode or screenshot, a label's absence could not signal genuine content and its presence could be faked, undercutting the case for a mandate.",
          skeptic_flip:
            "If a new generation of watermarks, such as SynthID-style signal embedding, survived screenshots, compression, cropping and the known purification and model-substitution attacks at high detection rates while resisting spoofing, the 'labels are trivially removable' objection would lose its footing.",
          common_ground:
            "Both sides agree no current watermark is unbreakable by a determined adversary, and that labeling raises the cost and default expectation of disclosure for casual, non-adversarial uses.",
          live_disagreement:
            "Whether robustness is improving fast enough that watermarks survive real-world transformations and adversarial removal at usable rates — which only a standardized, large-scale adversarial benchmark (in the spirit of WAVES) tracking survival over time can resolve.",
        },
      },
      evidence: [
        {
          id: "eu-ai-act-provisions",
          title: "EU AI Act Mandates Labeling for Deepfakes",
          description:
            "The EU AI Act (Regulation (EU) 2024/1689), Article 50, requires that AI-generated or manipulated content (deepfakes) be clearly disclosed as artificially generated or manipulated, with these transparency obligations applying from 2 August 2026. The Digital Omnibus amendment, provisionally agreed on 6 May 2026, left that date in place ('2 August 2026 remains an active compliance date', per Gibson Dunn) but gave generative systems already on the market 'a four-month grace period (until 2 December 2026)' for the Article 50(2) machine-readable marking duty. Under Article 99, non-compliance with the Article 50 transparency obligations can carry administrative fines of up to €15 million or 3% of total worldwide annual turnover, whichever is higher.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Regulation (EU) 2024/1689 (EU AI Act), Articles 50 and 99 — Official Journal of the EU; Gibson Dunn, 'EU AI Act Omnibus Agreement' (27 May 2026) for the marking grace period",
          sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401689",
          reasoning:
            "This is the binding primary-source legal text in the Official Journal of the EU, not a third-party explainer; the labeling mandate (Art. 50) and the 3%/€15M penalty tier (Art. 99) are quoted directly from the regulation. An earlier draft attributed this to 'European Parliament' with a third-party explainer URL (artificialintelligenceact.eu); the underlying figures were correct but the attribution was not, so the source has been corrected to the primary text while keeping the high reliability score.",
        },
        {
          id: "deepfake-detection-rates",
          title: "Human Deepfake Detection Rates Near Chance",
          description:
            "In Nightingale & Farid's PNAS study, participants distinguished StyleGAN2-synthesized faces from real ones with an average accuracy of 48.2% — statistically indistinguishable from chance (50%). The study further found AI-synthesized faces were rated, on average, ~7.7% more trustworthy than real faces. This indicates humans cannot reliably perceive AI-generated faces unaided, so labels would supply information perception cannot.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Nightingale, S. J. & Farid, H. (2022), \"AI-synthesized faces are indistinguishable from real faces and more trustworthy,\" PNAS 119(8) — Lancaster University & UC Berkeley",
          sourceUrl: "https://www.pnas.org/doi/10.1073/pnas.2120481119",
          reasoning:
            "Peer-reviewed PNAS study. Demonstrates clear need since human perception alone is at chance. The prior draft mis-attributed this finding to 'University of Washington (2023)'; the actual peer-reviewed source is Nightingale & Farid (2022, PNAS), whose Experiment 1 reported 48.2% accuracy — so the attribution, year, and number have been corrected to the primary source.",
        },
        {
          id: "synthid-text-nature-20m",
          title: "Google's SynthID-Text Watermark Ran on About 20 Million Gemini Responses With No Measurable Drop in User Ratings (Nature, 2024)",
          description:
            "Dathathri et al. (Google DeepMind), in Nature (published 23 October 2024), describe SynthID-Text, a watermark woven into how a language model picks words rather than added afterwards. In a live experiment covering approximately 20 million Gemini responses, differences in users' thumbs-up and thumbs-down ratings between watermarked and unwatermarked answers were 'statistically insignificant, and well within the 95% confidence intervals.' 'Evaluations across multiple LLMs empirically show that SynthID-Text provides improved detectability over comparable methods.' The paper states the limits: 'generative watermarks are weakened by edits to the text, such as through LLM paraphrasing', and it lists 'vulnerability to stealing, spoofing and scrubbing attacks' as open research.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 4,
            replicability: 6,
            directness: 6,
          },
          source:
            "Dathathri et al., 'Scalable watermarking for identifying large language model outputs', Nature 634: 818–823 (2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11499265/",
          reasoning:
            "Peer-reviewed and deployed at production scale, the strongest evidence that a watermark can run on everyday output without degrading it, which answers the 'usable' half of the crux. Independence is 4 because the authors built and sell the system. Directness is 6: it shows detectability for unedited text and concedes paraphrasing weakens it, so it does not show survival against the deliberate removal the skeptics describe.",
        },
        {
          id: "platform-label-experiments",
          title: "Major Platforms Have Deployed AI Content Labels",
          description:
            "Major platforms now apply AI-content labels at scale: Meta announced in April 2024 it would label AI-generated images on Facebook, Instagram and Threads using industry signals (C2PA Content Credentials and IPTC metadata), expanding to an 'AI info' label in May 2024; YouTube introduced (March 2024) a requirement for creators to disclose realistic altered or synthetic media. This demonstrates that provenance-based labeling is operationally feasible across large platforms.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 5,
          },
          source: "Meta Newsroom, \"Our Approach to Labeling AI-Generated Content and Manipulated Media\" (April 5, 2024)",
          sourceUrl: "https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/",
          reasoning:
            "Platform self-reported announcement; independence is low. The prior draft asserted 'labeled content receives 10-15% less sharing' attributed to the Meta Transparency Center — that specific behavioral statistic could not be verified in any Meta or third-party source, so it has been removed. The claim is now narrowed to the verifiable fact that Meta and YouTube deployed AI-content labels, and weights were de-inflated accordingly.",
        },
        {
          id: "watermark-removal-ease",
          title: "Watermarks Can Be Removed or Forged",
          description:
            "University of Maryland researchers (Saberi, Sadasivan, Feizi et al.) showed a fundamental robustness/evasion trade-off in image watermarking: low-perturbation invisible watermarks can be stripped via diffusion-purification attacks, high-perturbation watermarks can be removed via a model-substitution adversarial attack, and watermarks can be spoofed (forged) so real images are falsely flagged as AI-generated. Lead author Soheil Feizi summarized: 'We broke all of them.'",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Saberi, M., Sadasivan, V. S., Rezaei, K., Kumar, A., Chegini, A., Wang, W. & Feizi, S. (2023), \"Robustness of AI-Image Detectors: Fundamental Limits and Practical Attacks,\" arXiv:2310.00076 (University of Maryland)",
          sourceUrl: "https://arxiv.org/abs/2310.00076",
          reasoning:
            "Widely cited preprint (later an ICLR 2024 paper) demonstrating that watermark-based enforcement has fundamental limitations. Source attribution corrected from a bare 'University of Maryland (2023)' to the specific paper. sourceReliability lowered from 9-equivalent because the cited artifact is a preprint, not a journal article; the core removal/forgery findings are nonetheless robust and independently corroborated (e.g., the WAVES benchmark).",
        },
        {
          id: "altay-gilardi-ai-label-skepticism",
          title: "Altay & Gilardi (2024): An 'AI-Generated' Label Cut Belief in True Headlines as Well as False Ones, in Experiments on 4,976 US and UK Adults",
          description:
            "In two preregistered experiments with US and UK participants (N = 4,976), published in PNAS Nexus on 1 October 2024, 'labeling headlines as AI-generated lowered their perceived accuracy and participants' willingness to share them', 'regardless of whether the headlines were true or false, and created by humans or AI.' The effect was 'three times smaller than labeling them as false.' The authors trace it to 'expectations that headlines labeled as AI-generated have been entirely written by AI', so readers discount even accurate, human-checked content that carries the tag.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 3,
          },
          source:
            "Sacha Altay & Fabrizio Gilardi, 'People are skeptical of headlines labeled as AI-generated, even if true or human-made, because they assume full AI automation', PNAS Nexus 3(10): pgae403 (2024)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11443540/",
          reasoning:
            "Preregistered, large and independent. It bears on what a surviving label would accomplish rather than on whether the mark survives, so directness is 3: if labels penalize true content as well as false, robust watermarking buys less misinformation protection than the case for a mandate assumes. The authors found the skepticism only when participants got no definition of AI or a strong one, so better label wording may shrink the effect.",
        },
      ],
    },
    {
      id: "free-expression-impact",
      title: "Free Expression Impact",
      short_summary:
        "Mandatory labeling may burden legitimate creative, educational, and journalistic uses of AI tools.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The hard problem is line-drawing, not disclosure in principle. Where does 'AI-generated' begin — spell-check, autocomplete, AI transcription, a grammar pass, a generated background? Broad mandates sweep in ordinary creative and educational tooling, and compelling expressive (non-commercial) speakers to attach a state-prescribed label invites heightened First Amendment scrutiny, not the deferential review that covers commercial disclosures. The likely result is over-labeling that trains audiences to ignore the tag, plus a chilling effect on creators who fear stigma — a burden that falls hardest on small and independent voices.",
      proponent_rebuttal:
        "A workable mandate targets deception, not assistance: disclosure can be scoped to realistic synthetic media that could mislead about real people or events, leaving spell-check and routine editing untouched. Within that scope, transparency about provenance is a thin, factual requirement — closer to the paid-partnership and material-connection disclosures that have long coexisted with robust expression than to compelled ideological speech. The right to free expression protects the message; it does not include a right to misrepresent whether a depicted event actually happened.",
      crux: {
        id: "chilling-effect-measurement",
        title: "Measuring Chilling Effects on Creative AI Use",
        question:
          "Do labeling mandates measurably reduce beneficial and creative uses of AI?",
        description:
          "Quantifying whether labeling mandates reduce beneficial AI tool adoption in creative, educational, and journalistic contexts.",
        methodology:
          "Compare AI tool adoption rates and creative output in jurisdictions with labeling mandates (EU, China) vs. those without. Survey creators about compliance burden.",
        equation:
          "\\Delta_{adoption} = \\beta_{mandate} + \\beta_{sector} + \\epsilon",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "AI tool adoption and creative output in mandate jurisdictions (the EU, and China since 2023) tracked against places without a mandate, with creator surveys on the compliance burden.",
        },
        cost_to_verify: "$300K (Cross-jurisdictional comparative study)",
        falsification: {
          supporter_flip:
            "If courts applied heightened First Amendment scrutiny to labeling mandates on non-commercial expressive speech, beyond Zauderer's 'purely factual and uncontroversial' commercial disclosures, and independent creators measurably pulled back, the view that labeling is harmless would be hard to hold.",
          skeptic_flip:
            "If data from mandate jurisdictions (the EU after August 2026, China since 2023) showed AI adoption and creative output tracking non-mandate jurisdictions, with compliance limited to deceptive synthetic media rather than routine editing, the chilling-effect objection would weaken.",
          common_ground:
            "Both sides agree narrowly targeted disclosure of deceptive synthetic media is defensible, and that an over-broad mandate sweeping in ordinary editing tools would be both legally riskier and prone to over-labeling that audiences learn to ignore.",
          live_disagreement:
            "Whether real-world labeling mandates measurably reduce beneficial AI adoption and creative output — and where the line between 'AI-generated' and 'AI-assisted' falls in practice — which only a controlled cross-jurisdictional comparison plus creator-burden surveys can settle.",
        },
      },
      evidence: [
        {
          id: "first-amendment-analyses",
          title: "Compelled-Disclosure Doctrine Is Contested for AI Labeling",
          description:
            "Whether mandatory AI labeling survives the First Amendment turns on the compelled-speech doctrine. Under Zauderer v. Office of Disciplinary Counsel (1985), the government may compel 'purely factual and uncontroversial' commercial disclosures reasonably related to preventing consumer deception — the basis for arguing AI labels are permissible (like nutrition or paid-partnership labels). Critics counter that broad mandates on non-commercial expressive content trigger heightened scrutiny and may be unconstitutional compelled speech. Legal commentators disagree on which framework governs.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 6,
          },
          source: "Osman, H., \"Required Deepfake Labeling: Contradicting or Supporting The First Amendment?\", Columbia Undergraduate Law Review (Dec 6, 2025), analyzing Zauderer v. Office of Disciplinary Counsel, 471 U.S. 626 (1985)",
          sourceUrl: "https://www.culawreview.org/journal/required-deepfake-labeling-contradicting-or-supporting-the-first-amendment",
          reasoning:
            "Genuine constitutional uncertainty creates legal risk for mandates. The prior draft attributed the split to 'Harvard Law Review, Stanford CIS' with no URL; no specific articles from those venues matching this framing could be verified, so the source has been replaced with a verifiable law-review analysis that explicitly lays out both sides via the controlling Zauderer standard. sourceReliability lowered (student-edited undergraduate law review rather than a flagship journal), and replicability is low because this is doctrinal argument, not empirical.",
        },
        {
          id: "kohls-v-bonta-label-compelled-speech",
          title: "A Federal Court Held California's Deepfake Label Rule for Parody Was Compelled Speech, Then Struck the Law (Kohls v. Bonta, 2024–25)",
          description:
            "California's AB 2839 (signed 17 September 2024) exempted election-related parody and satire only if it carried a disclaimer 'for the entire duration of a video in text that is no smaller than the largest font size used in the video.' On 2 October 2024 Judge John Mendez of the Eastern District of California enjoined it: for the plaintiff, a creator of AI parody videos, 'this requirement renders his video almost unviewable, obstructing the entirety of the frame', and in a non-commercial setting the rule 'forces parodists and satirists to “speak a particular message” that they would not otherwise speak, which constitutes compelled speech that dilutes their message.' The court let stand an audio-only disclosure at the start, end and every two minutes as 'on its face reasonable and not unduly burdensome.' On 29 August 2025 it entered summary judgment holding the law unconstitutional in its entirety; California appealed to the Ninth Circuit, where the case was pending as of mid-2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source:
            "Kohls v. Bonta, No. 2:24-cv-02527-JAM-CKD (E.D. Cal.), Order granting preliminary injunction, ECF 14 (2 Oct 2024); HLLI case page for the 29 Aug 2025 judgment and appeal",
          sourceUrl: "https://epic.org/wp-content/uploads/2025/04/kohls-v-bonta-court-order-granting-mpi.pdf",
          reasoning:
            "The first US court to rule on an AI label mandate, and it treated a label on expressive content as compelled speech, which is the free-expression burden the crux asks about. One district court, under appeal, and a rule with an unusually heavy design, so replicability is 5. The same order upheld a lighter audio disclosure, which supports the proponents' view that a narrowly drawn label can survive; the case shows design, not disclosure as such, decides the burden.",
        },
        {
          id: "china-labeling-law",
          title: "China Mandated AI Content Labeling From 2023",
          description:
            "China's Provisions on the Administration of Deep Synthesis of Internet Information Services (issued by the CAC, MIIT and MPS on Nov 25, 2022; effective Jan 10, 2023) require providers to add conspicuous labels to deep-synthesis (AI-generated/manipulated) content — text, images, audio, video — that could confuse the public. This establishes that a major jurisdiction has imposed mandatory labeling, offering a real-world precedent, though its enforcement record and effects on creators are not well documented in independent sources.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 6,
          },
          source: "Provisions on the Administration of Deep Synthesis of Internet Information Services (China, effective Jan 10, 2023) — English translation via China Law Translate",
          sourceUrl: "https://www.chinalawtranslate.com/en/deep-synthesis/",
          reasoning:
            "Primary regulatory text (translated). The prior draft asserted the law has been 'inconsistently enforced' and that 'creative users report self-censoring' attributed vaguely to 'DigiChina, Stanford' with no URL; those enforcement-outcome and self-censorship claims could not be verified, so the description was narrowed to the verifiable existence and content of the mandate, the speculative outcomes were flagged as undocumented, and weights were de-inflated. China's regulatory context differs significantly from democracies.",
        },
        {
          id: "creator-community-surveys",
          title: "Creators Broadly Favor Disclosure but Hesitate to Self-Disclose",
          description:
            "Reporting on artists' and writers' attitudes finds a recurring tension: many creators support clear, standardized labeling of AI-assisted work so audiences can make informed choices, yet individual creators are often reluctant to disclose their own AI use for fear of stigma or being seen as cutting corners. The direction of sentiment favors transparency norms, but precise support percentages vary by survey and population.",
          side: "for" as const,
          weight: {
            sourceReliability: 4,
            independence: 5,
            replicability: 4,
            directness: 5,
          },
          source: "\"Artists and writers are often hesitant to disclose they've collaborated with AI — and those fears may be justified,\" The Conversation / FIU (2026)",
          sourceUrl: "https://theconversation.com/artists-and-writers-are-often-hesitant-to-disclose-theyve-collaborated-with-ai-and-those-fears-may-be-justified-275888",
          reasoning:
            "The prior draft cited '62-68% support' attributed to 'Creative Commons, Authors Guild' with no URL; no Creative Commons or Authors Guild survey reporting those figures could be located, so the specific statistic was removed as unverifiable. The claim is now limited to the directional, verifiable finding (support for disclosure norms alongside reluctance to self-disclose) and weights were substantially de-inflated. Reliability remains low: this is journalistic/secondary reporting, not a citable primary survey instrument.",
        },
        {
          id: "informed-consent-precedent",
          title: "Disclosure Precedents in Other Domains",
          description:
            "Mandatory disclosure of material connections is an established, durable norm: the FTC's Endorsement Guides (16 CFR Part 255, revised June 2023) require endorsers to disclose 'material connections' such as paid sponsorships in advertising. Such disclosure regimes have coexisted with robust commercial and editorial expression, suggesting baseline transparency requirements need not chill speech — an analogy proponents extend to AI-content labeling.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source: "FTC Endorsement Guides, 16 CFR Part 255 (revised 2023) — eCFR",
          sourceUrl: "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255",
          reasoning:
            "Source upgraded to the binding primary text (eCFR, 16 CFR Part 255) rather than a bare 'FTC Endorsement Guidelines' label. The Part 255 disclosure regime is verified; the inference that it 'has not chilled expression' is an analogy, not a measured finding, so directness is kept low. The earlier mention of ghostwriter/stock-photography disclosure was trimmed because Part 255 governs endorsements specifically; the precedent now rests on the verifiable material-connection disclosure rule.",
        },
      ],
    },
  ],
};
