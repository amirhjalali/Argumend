export const generativeAiArtCopyrightData = {
  id: "generative-ai-art-copyright",
  title: "AI Training & Copyright",
  question:
    "Should training AI on copyrighted work without permission be unlawful?",
  meta_claim:
    "Training generative AI on copyrighted works without permission is unfair and should be unlawful.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "In Bartz v. Anthropic, the judge held that training on lawfully bought books was fair use, calling it 'exceedingly transformative'. Anthropic then agreed to pay about $1.5 billion, roughly $3,000 per work, for books it had downloaded from pirate libraries like LibGen. Both rulings stand. The fight is over whether training without permission is fair use in every court, and whether AI outputs take the market of the works they learned from.",
    confidence: 88,
    source:
      "Bartz v. Anthropic, Judge Alsup (N.D. Cal.), fair-use ruling of June 23, 2025 and settlement announced Sept. 5, 2025, as reported by NPR; Copyright Alliance and Authors Guild settlement explainers (2025)",
    sourceUrl:
      "https://www.npr.org/2025/09/05/nx-s1-5529404/anthropic-settlement-authors-copyright-ai",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "Both sides accept that pirating works to build a training corpus is wrong, that licensing beats unauthorized scraping where it is feasible, that fair use turns on transformativeness and whether a use usurps the original's market, and that the split among district courts, from Bartz v. Anthropic to Thomson Reuters v. Ross, is unresolved.",
    "They split over whether the wrong lies in how training data was acquired or in training on it at all; whether creators' lost work and income comes from unlicensed training specifically or from generative-AI competition in general; and whether training general-purpose models is transformative fair use or unlawful copying, which appellate courts have yet to decide.",
  ],
  last_updated: "2026-06-16",
  tags: ["copyright", "generative-ai", "fair-use", "intellectual-property", "law"],
  pillars: [
    {
      id: "fairness-consent",
      title: "Consent & Fairness",
      short_summary:
        "Was ingesting copyrighted works without asking permission an unfair taking, or the same kind of unlicensed 'reading' the law has long tolerated?",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Copyright never granted a right to control all learning from a work — humans read, study, and are influenced by copyrighted material without a license, and intermediate copying for a new purpose has repeatedly been held lawful (e.g., Google's full-text book scanning). The harm the law recognizes is unauthorized acquisition (piracy) and substitution, not learning itself: the same Anthropic judge who approved the $1.5B piracy settlement separately held that training on lawfully obtained books was 'exceedingly transformative' fair use. A fast-growing licensing market shows consent can be obtained without an outright ban.",
      proponent_rebuttal:
        "Models are built by copying hundreds of thousands of authors' and artists' works without consent, credit, or payment, then sold commercially. When the underlying copies are pirated, even courts that bless training call it infringement: Anthropic agreed to pay roughly $1.5B over books it downloaded from LibGen/PiLiMi — one of the largest publicly reported copyright recoveries in US history. Creators argue that taking the fruit of someone's labor to build a competing commercial product, without offering them the chance to say no or be paid, is the textbook definition of unfair.",
      crux: {
        id: "acquisition-vs-learning",
        title: "Acquisition vs. Learning",
        question:
          "Is the wrong in how training data was acquired, or in training on it at all?",
        description:
          "Is the objectionable act acquiring the works (which can be done lawfully by purchase or license) or the act of statistical training itself? Courts so far punish the former and largely permit the latter.",
        methodology:
          "Separate the two steps: (1) audit how training corpora were obtained (purchased, licensed, scraped, or pirated); (2) assess whether the trained model's outputs substitute for the originals. Compare verdicts where data was pirated vs. lawfully acquired.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Court verdicts compared by how the training data was obtained (purchased, licensed, scraped or pirated), alongside audits of whether each model's outputs substitute for the originals.",
        },
        cost_to_verify: "$0 (court records & dataset provenance analysis)",
        falsification: {
          supporter_flip:
            "If appellate courts held that training on lawfully purchased or licensed works is not an unfair taking, so liability turned on piracy alone, and the emerging licensing market let creators consent and be paid, the case against training as such would narrow to how data was acquired.",
          skeptic_flip:
            "If more cases like Anthropic's ~$1.5B payment turned on pirated acquisition, and courts treated industrial-scale scraping as different from one person reading one borrowed book, 'it's just learning' would no longer answer the legal or moral question.",
          common_ground:
            "Both sides agree that pirating works to build a training corpus is wrongful, and that consent obtained through licensing is preferable to unauthorized scraping where it is feasible.",
          live_disagreement:
            "Whether the objectionable act is acquisition (curable by purchase/license) or statistical training itself — resolvable by tracking whether courts ever penalize training on lawfully obtained works, and whether voluntary licensing markets scale to cover the bulk of training data.",
        },
      },
      evidence: [
        {
          id: "anthropic-settlement",
          title: "Anthropic Pays ~$1.5B Over Pirated Training Books",
          description:
            "In Bartz v. Anthropic, Anthropic agreed to pay about $1.5 billion (roughly $3,000 per work across ~500,000 works) to settle claims it downloaded pirated books from LibGen/PiLiMi to build a training library. The settlement motion called it 'the largest publicly reported copyright recovery in history.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Copyright Alliance, 'Top 5 Things You Need to Know About Participating in the $1.5 Billion Bartz v. Anthropic Settlement' (Oct. 28, 2025); NPR reporting (Sept. 5, 2025)",
          sourceUrl:
            "https://copyrightalliance.org/participating-bartz-v-anthropic-settlement/",
          reasoning:
            "Real, documented settlement showing that unauthorized acquisition of works for training carries massive liability. It is strong on the 'unfair taking' point, but note it punishes piracy specifically, not training per se — so it is directly relevant yet not dispositive of whether all unlicensed training is unlawful.",
        },
        {
          id: "google-books-precedent",
          title: "Full-Text Scanning Held Transformative Fair Use",
          description:
            "In Authors Guild v. Google (2d Cir. 2015), the court held that Google copying entire books to build a searchable index was 'highly transformative' fair use because it served a new purpose and did not substitute for the originals — a precedent for unlicensed intermediate copying.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "Authors Guild v. Google, Inc., 804 F.3d 202 (2d Cir. 2015)",
          sourceUrl:
            "https://law.justia.com/cases/federal/appellate-courts/ca2/13-4829/13-4829-2015-10-16.html",
          reasoning:
            "Binding appellate precedent that copying whole works without permission can be fair use when transformative and non-substitutive. Directness is moderate because AI training differs from search indexing, but it is the closest established analogy courts cite.",
        },
        {
          id: "licensing-market",
          title: "A Licensing Market Is Forming Without a Ban",
          description:
            "Rights holders are licensing training data voluntarily: News Corp's five-year deal with OpenAI (May 2024) is reportedly valued at over $250M, Reddit's deal with Google at about $60M a year, and Shutterstock's chief executive said its licensing business with AI companies produced $104M in revenue in 2023 — evidence consent is achievable through markets, not prohibition.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Similarweb, 'Top 10 Data Licensing Deals That Powered AI Innovation In 2024' (Jan. 3, 2025); Bloomberg News, 'Shutterstock's AI-Licensing Business Generated $104 Million' (June 4, 2024)",
          sourceUrl:
            "https://www.similarweb.com/blog/daas/data-analysis/data-licensing-deals/",
          reasoning:
            "Shows a functioning consent mechanism exists, undercutting the claim that a legal ban is the only remedy. Lower weights reflect that aggregator/news reporting is less authoritative than court records and that deal values are partly self-reported. An earlier version gave Shutterstock's AI licensing as about $138M for 2024; that figure was the company's 2024 projection for a whole business unit that includes AI licensing, so it is replaced with the $104M its chief executive reported for 2023.",
        },
      ],
    },
    {
      id: "market-harm",
      title: "Market Harm to Creators",
      short_summary:
        "Does training-fueled AI demonstrably displace creators' income and markets — the decisive 'fourth factor' in fair-use law?",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "Copyright protects against substitution of specific works, not against new competition or stylistic influence — styles and ideas are not copyrightable. Self-reported survey losses conflate AI training with broader market shifts and AI tools generally, and cannot isolate the effect of unlicensed training. The remedy for market harm the law actually recognizes is licensing (now emerging) and output controls, not a blanket prohibition on learning from works.",
      proponent_rebuttal:
        "Generative models trained on creators' work now flood the same markets those creators sell into, depressing demand for human work. Surveys of professional creators already report lost commissions and falling rates, and the US Copyright Office concluded that AI training 'threatens significant potential harm to the market for or value of copyrighted works,' including lost sales, lost licensing revenue, and 'market dilution' by AI outputs in the style of the training data.",
      crux: {
        id: "market-substitution-test",
        title: "The Market-Substitution Test",
        question:
          "Are creators losing income because of unlicensed training, or because of AI tools and markets generally?",
        description:
          "Fair use turns on whether the use usurps demand for the original or its licensing market. The load-bearing question is whether observed creator income losses are caused by unlicensed training specifically, versus AI tools and market dynamics generally.",
        methodology:
          "Run controlled/quasi-experimental labor-market studies isolating exposure to generative-AI outputs; measure changes in commissions, rates, and licensing revenue against matched non-exposed creators. Distinguish harm from substitution vs. harm from style competition (non-actionable).",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Labor-market studies comparing creators exposed to generative-AI outputs with matched unexposed creators, tracking commissions, rates and licensing revenue, and separating loss from substitution from loss to style competition.",
        },
        cost_to_verify: "$1-3M (longitudinal creator labor-market study)",
        falsification: {
          supporter_flip:
            "If controlled labor-market studies traced creator income losses to AI tools and broader market shifts rather than to unlicensed training, or to non-actionable style competition rather than substitution for protected works, the market-harm case for a ban would weaken.",
          skeptic_flip:
            "If more studies replicated the Upwork finding of ~3.7% fewer jobs and ~9.4% lower earnings for image freelancers after image models launched, and tied it to the lost sales and 'market dilution' the Copyright Office describes, 'general market churn' would no longer explain the losses.",
          common_ground:
            "Both sides agree fair use turns on the fourth factor — whether the use usurps demand for the original or its licensing market — and that styles and ideas themselves are not copyrightable.",
          live_disagreement:
            "Whether observed creator income losses are caused by unlicensed training specifically versus generative-AI tools and market dynamics broadly — resolvable only by quasi-experimental studies isolating exposure and distinguishing substitution from non-actionable style competition.",
        },
      },
      evidence: [
        {
          id: "copyright-office-market-harm",
          title: "Copyright Office: Training Threatens the Market",
          description:
            "The US Copyright Office's May 2025 Part 3 report concluded the copying involved in AI training threatens significant potential harm to the market for copyrighted works, citing lost sales, lost licensing opportunities, and 'market dilution' from AI outputs that compete in the style of training works.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 8,
          },
          source:
            "US Copyright Office, 'Copyright and Artificial Intelligence, Part 3: Generative AI Training' (pre-publication, May 9, 2025)",
          sourceUrl:
            "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-3-Generative-AI-Training-Report-Pre-Publication-Version.pdf",
          reasoning:
            "Authoritative federal agency analysis of the fourth fair-use factor. It is a legal/policy assessment, not an empirical study, and the Office stops short of recommending new law — so it supports the 'harm' premise without proving unlawfulness.",
        },
        {
          id: "soa-illustrator-survey",
          title: "Creators Report Lost Work and Income",
          description:
            "A January 2024 Society of Authors survey (787 responses) found a quarter of illustrators (26%) and over a third of translators (36%) had already lost work to generative AI, and over a third of illustrators (37%) said the income from their work had decreased in value because of it.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source:
            "Society of Authors AI Survey 2024 (reported by The Bookseller, European Writers' Council)",
          sourceUrl: "https://europeanwriterscouncil.eu/soa-survey-uk-ai-2024/",
          reasoning:
            "Real survey of working creators showing measured harm. Weights are moderate-to-low: it is self-reported, non-random, and cannot isolate harm from unlicensed training specifically versus AI tools and market shifts generally.",
        },
        {
          id: "freelancer-earnings-study",
          title: "Image AI Reduced Freelancer Jobs & Earnings",
          description:
            "A peer-reviewed study of Upwork (Hui, Reshef & Zhou) found that after the release of image-generation models (DALL·E 2, Midjourney), affected image-related freelancers saw about a 3.7% drop in monthly jobs and a 9.4% drop in earnings — with no protection for top performers.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Hui, Reshef & Zhou, 'The Short-Term Effects of Generative Artificial Intelligence on Employment: Evidence from an Online Labor Market,' Organization Science (2024)",
          sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4527336",
          reasoning:
            "Quasi-experimental, peer-reviewed labor-market evidence is stronger than surveys for causation. Directness is moderate because it measures exposure to AI tools/outputs generally, not to unlicensed training specifically, and effects are short-run.",
        },
        {
          id: "kadrey-no-market-harm-record",
          title: "Kadrey v. Meta: Thirteen Authors Offered No Evidence That Training Hurt Their Sales (2025)",
          description:
            "Granting Meta summary judgment on fair use on 25 June 2025, Judge Vince Chhabria (N.D. Cal.) found that \"The plaintiffs presented no empirical evidence to the contrary—no evidence that the copying has already caused market harm, and no evidence that the copying is likely to cause market harm in the future.\" He held that \"Llama is not capable of generating enough text from the plaintiffs’ books to matter, and the plaintiffs are not entitled to the market for licensing their works as AI training data,\" and noted that the right comparison for market dilution \"isn’t to a world with no LLMs, but to a world where LLMs weren’t trained on copyrighted books.\" He also called dilution \"the potentially winning argument\" and wrote that the ruling \"stands only for the proposition that these plaintiffs made the wrong arguments and failed to develop a record in support of the right one.\"",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Kadrey v. Meta Platforms, Inc., No. 23-cv-03417-VC, Dkt. 598 (N.D. Cal. June 25, 2025), order on cross-motions for partial summary judgment",
          sourceUrl:
            "https://storage.courtlistener.com/recap/gov.uscourts.cand.415175/gov.uscourts.cand.415175.598.0.pdf",
          reasoning:
            "A full court record in which plaintiffs had to show that training, not AI generally, cost them sales, and produced no such evidence; the court also drew the crux's own line between harm from training and harm from AI's existence. Weighted moderately: it is a district-court ruling on thirteen authors, mostly fiction writers, and a text model, not visual artists; a missing record is not proof of no harm; and the same judge wrote that training on copyrighted books \"would seem, in most circumstances,\" to make a model better able to dilute those books' market.",
        },
      ],
    },
    {
      id: "legality-fair-use",
      title: "Is It Already Unlawful?",
      short_summary:
        "Under existing copyright law, is unlicensed training infringement that should be banned, or transformative fair use courts are increasingly affirming?",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "The leading generative-AI rulings cut the other way: Bartz v. Anthropic and Kadrey v. Meta both held that training large language models on copyrighted text was transformative fair use, and the Copyright Office itself says highly transformative, general-purpose training often favors fair use. Thomson Reuters involved a direct market competitor copying a curated database — not general-purpose generative training — and memorization/regurgitation is an output problem the law already addresses as infringement, without banning training itself.",
      proponent_rebuttal:
        "At least one federal court has already rejected the fair-use defense for AI training: in Thomson Reuters v. Ross (2025), the court held that copying Westlaw headnotes to train an AI competitor was not transformative and not fair use. Where models memorize and regurgitate inputs verbatim — as the New York Times demonstrated with GPT-4 outputs — the 'learning, not copying' framing collapses, supporting a clear rule that unlicensed training is unlawful.",
      crux: {
        id: "transformative-use-test",
        title: "The Transformativeness Test",
        question:
          "Is training general-purpose AI on copyrighted work transformative fair use, or unlawful copying?",
        description:
          "Fair use hinges on whether training serves a new, non-substitutive purpose. The split between Thomson Reuters (not fair use) and Bartz/Kadrey (fair use) is the load-bearing legal disagreement that would actually move the outcome.",
        methodology:
          "Track how appellate courts (and ultimately the Supreme Court) resolve the transformativeness and market-effect factors for general-purpose generative training vs. competitor-database copying; measure whether outputs substitute for specific inputs.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Appellate rulings, and in time the Supreme Court's, on transformativeness and market effect for general-purpose training, set beside Thomson Reuters v. Ross and Bartz and Kadrey, with tests of whether outputs substitute for specific inputs.",
        },
        cost_to_verify: "$0 (await appellate rulings; doctrinal analysis)",
        falsification: {
          supporter_flip:
            "If appellate courts or the Supreme Court affirmed that general-purpose generative training is transformative fair use, confining Thomson Reuters v. Ross to a non-generative competitor copying a curated database, the view that such training is unlawful under current law would lose its footing.",
          skeptic_flip:
            "If appeals courts reversed the district-level Bartz and Kadrey rulings, more courts followed Thomson Reuters in rejecting fair use for training, or verbatim regurgitation like the NYT exhibits recurred, the 'learning, not copying' framing would collapse for those models.",
          common_ground:
            "Both sides agree the case turns on transformativeness and market effect, that verbatim regurgitation of inputs is infringement the law already addresses, and that the current district-court split is not yet settled.",
          live_disagreement:
            "Whether general-purpose generative training is transformative fair use or unlawful copying — resolvable as appellate courts (and ultimately the Supreme Court) decide the transformativeness and market-effect factors and distinguish competitor-database copying from open-domain training.",
        },
      },
      evidence: [
        {
          id: "thomson-reuters-ruling",
          title: "Court Rejected Fair Use for AI Training (Ross)",
          description:
            "In Thomson Reuters v. Ross Intelligence (D. Del., Feb. 2025), Judge Bibas granted partial summary judgment for Thomson Reuters, holding that using Westlaw headnotes to train a competing legal-research AI was not transformative and not fair use — the first US ruling rejecting fair use for AI training.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Thomson Reuters Enterprise Centre GmbH v. Ross Intelligence Inc. (D. Del. Feb. 11, 2025); Davis Wright Tremaine analysis",
          sourceUrl:
            "https://www.dwt.com/blogs/artificial-intelligence-law-advisor/2025/02/reuters-ross-court-ruling-ai-copyright-fair-use",
          reasoning:
            "A real federal ruling that unlicensed training can be infringement. Directness is tempered because Ross involved non-generative AI copying a direct competitor's curated database, which courts have distinguished from general-purpose generative training.",
        },
        {
          id: "bartz-kadrey-fair-use",
          title: "Courts Held LLM Training Is Transformative Fair Use",
          description:
            "In Bartz v. Anthropic (June 23, 2025), Judge Alsup held that using books to train LLMs was 'exceedingly transformative' fair use, while denying summary judgment on the pirated copies Anthropic had downloaded and sending that issue to trial. Two days later in Kadrey v. Meta, Judge Chhabria also granted summary judgment on fair use for training, on the ground that the plaintiffs had shown no market harm. Bartz confines liability to how the books were obtained; Kadrey is narrower, stating that the ruling 'does not stand for the proposition that Meta's use of copyrighted materials to train its language models is lawful.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source:
            "Bartz v. Anthropic (N.D. Cal. June 23, 2025); Wiggin and Dana analysis; Kadrey v. Meta (N.D. Cal. 2025)",
          sourceUrl:
            "https://www.wiggin.com/publication/bartz-v-anthropic-first-court-decision-on-fair-use-defense-in-llm-training/",
          reasoning:
            "Two federal rulings directly on generative-AI training found it transformative fair use on the records before them, cutting against the claim that unlicensed training is unlawful. High directness; these are the most on-point decisions to date. Both are district-court rulings: Bartz ended in a settlement rather than appellate review, and the Kadrey judge limited his ruling to the thirteen plaintiffs and the arguments they made.",
        },
        {
          id: "nyt-memorization",
          title: "Models Can Regurgitate Training Text Verbatim",
          description:
            "The New York Times' December 2023 complaint against Microsoft and OpenAI included Exhibit J, one hundred examples of GPT-4 output reproducing passages of Times articles near-verbatim when prompted, evidence that some models memorize and can output copies of training inputs. A 2024 independent study extracted some of those articles again with prompt attacks and found that larger models memorize more, with OpenAI's models less prone to it than models from Meta, Mistral and Anthropic.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source:
            "The New York Times Company v. Microsoft Corp., No. 23-CV-11195 (S.D.N.Y. filed Dec. 27, 2023), Exhibit J, as described in Freeman, Rippe, Debenedetti & Andriushchenko, 'Exploring Memorization and Copyright Violation in Frontier LLMs' (arXiv:2412.06370, 2024)",
          sourceUrl:
            "https://arxiv.org/abs/2412.06370",
          reasoning:
            "Demonstrates that the 'learning, not copying' defense has limits. Weights are moderate-to-low: the complaint's examples used adversarial prompting that OpenAI disputes, and verbatim regurgitation is an output/substitution issue, distinct from whether the training step itself is lawful.",
        },
      ],
    },
  ],
};
