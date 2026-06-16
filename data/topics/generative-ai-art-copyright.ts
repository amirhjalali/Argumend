import type { Topic } from "@/lib/schemas/topic";

export const generativeAiArtCopyrightData = {
  id: "generative-ai-art-copyright",
  title: "AI Training & Copyright",
  meta_claim:
    "Training generative AI on copyrighted works without permission is unfair and should be unlawful.",
  status: "contested" as const,
  category: "technology" as const,
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
        "Models are built by copying hundreds of thousands of authors' and artists' works without consent, credit, or payment, then sold commercially. When the underlying copies are pirated, even courts that bless training call it infringement: Anthropic agreed to pay roughly $1.5B over books it downloaded from LibGen/PiLiMi — one of the largest publicly reported copyright recoveries in US history. Creators argue that taking the fruit of someone's labor to build a competing commercial product, without offering them the chance to say no or be paid, is the textbook definition of unfair.",
      proponent_rebuttal:
        "Copyright never granted a right to control all learning from a work — humans read, study, and are influenced by copyrighted material without a license, and intermediate copying for a new purpose has repeatedly been held lawful (e.g., Google's full-text book scanning). The harm the law recognizes is unauthorized acquisition (piracy) and substitution, not learning itself: the same Anthropic judge who approved the $1.5B piracy settlement separately held that training on lawfully obtained books was 'exceedingly transformative' fair use. A fast-growing licensing market shows consent can be obtained without an outright ban.",
      crux: {
        id: "acquisition-vs-learning",
        title: "Acquisition vs. Learning",
        description:
          "Is the objectionable act acquiring the works (which can be done lawfully by purchase or license) or the act of statistical training itself? Courts so far punish the former and largely permit the latter.",
        methodology:
          "Separate the two steps: (1) audit how training corpora were obtained (purchased, licensed, scraped, or pirated); (2) assess whether the trained model's outputs substitute for the originals. Compare verdicts where data was pirated vs. lawfully acquired.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (court records & dataset provenance analysis)",
      },
      evidence: [
        {
          id: "anthropic-settlement",
          title: "Anthropic Pays ~$1.5B Over Pirated Training Books",
          description:
            "In Bartz v. Anthropic, Anthropic agreed to pay about $1.5 billion (roughly $3,000 per work across ~500,000 works) to settle claims it downloaded pirated books from LibGen/PiLiMi to build a training library — reportedly one of the largest copyright recoveries in US history.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Copyright Alliance, 'What to Know About the $1.5 Billion Bartz v. Anthropic Settlement' (2025); NPR reporting (Sept. 5, 2025)",
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
            "Rights holders are licensing training data voluntarily: News Corp's deal with OpenAI is reportedly valued at over $250M, and Shutterstock's data-licensing/AI business (with a Contributor Fund paying artists) projected ~$138M revenue for 2024 — evidence consent is achievable through markets, not prohibition.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source:
            "Shutterstock investor releases; Similarweb / CB Insights summaries of 2024 AI data-licensing deals",
          sourceUrl:
            "https://www.similarweb.com/blog/daas/data-analysis/data-licensing-deals/",
          reasoning:
            "Shows a functioning consent mechanism exists, undercutting the claim that a legal ban is the only remedy. Lower weights reflect that aggregator/news reporting is less authoritative than court records and that deal values are partly self-reported.",
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
        "Generative models trained on creators' work now flood the same markets those creators sell into, depressing demand for human work. Surveys of professional creators already report lost commissions and falling rates, and the US Copyright Office concluded that AI training 'threatens significant potential harm to the market for or value of copyrighted works,' including lost sales, lost licensing revenue, and 'market dilution' by AI outputs in the style of the training data.",
      proponent_rebuttal:
        "Copyright protects against substitution of specific works, not against new competition or stylistic influence — styles and ideas are not copyrightable. Self-reported survey losses conflate AI training with broader market shifts and AI tools generally, and cannot isolate the effect of unlicensed training. The remedy for market harm the law actually recognizes is licensing (now emerging) and output controls, not a blanket prohibition on learning from works.",
      crux: {
        id: "market-substitution-test",
        title: "The Market-Substitution Test",
        description:
          "Fair use turns on whether the use usurps demand for the original or its licensing market. The load-bearing question is whether observed creator income losses are caused by unlicensed training specifically, versus AI tools and market dynamics generally.",
        methodology:
          "Run controlled/quasi-experimental labor-market studies isolating exposure to generative-AI outputs; measure changes in commissions, rates, and licensing revenue against matched non-exposed creators. Distinguish harm from substitution vs. harm from style competition (non-actionable).",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1-3M (longitudinal creator labor-market study)",
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
          sourceUrl: "https://www.copyright.gov/ai/",
          reasoning:
            "Authoritative federal agency analysis of the fourth fair-use factor. It is a legal/policy assessment, not an empirical study, and the Office stops short of recommending new law — so it supports the 'harm' premise without proving unlawfulness.",
        },
        {
          id: "soa-illustrator-survey",
          title: "Creators Report Lost Work and Income",
          description:
            "A 2024 Society of Authors survey (~787 respondents) found about a quarter of illustrators (26%) and a third of translators (36%) had already lost work to generative AI, and over a third of illustrators (37%) said their income had decreased because of it.",
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
      ],
    },
    {
      id: "legality-fair-use",
      title: "Is It Already Unlawful?",
      short_summary:
        "Under existing copyright law, is unlicensed training infringement that should be banned, or transformative fair use courts are increasingly affirming?",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "At least one federal court has already rejected the fair-use defense for AI training: in Thomson Reuters v. Ross (2025), the court held that copying Westlaw headnotes to train an AI competitor was not transformative and not fair use. Where models memorize and regurgitate inputs verbatim — as the New York Times demonstrated with GPT-4 outputs — the 'learning, not copying' framing collapses, supporting a clear rule that unlicensed training is unlawful.",
      proponent_rebuttal:
        "The leading generative-AI rulings cut the other way: Bartz v. Anthropic and Kadrey v. Meta both held that training large language models on copyrighted text was transformative fair use, and the Copyright Office itself says highly transformative, general-purpose training often favors fair use. Thomson Reuters involved a direct market competitor copying a curated database — not general-purpose generative training — and memorization/regurgitation is an output problem the law already addresses as infringement, without banning training itself.",
      crux: {
        id: "transformative-use-test",
        title: "The Transformativeness Test",
        description:
          "Fair use hinges on whether training serves a new, non-substitutive purpose. The split between Thomson Reuters (not fair use) and Bartz/Kadrey (fair use) is the load-bearing legal disagreement that would actually move the outcome.",
        methodology:
          "Track how appellate courts (and ultimately the Supreme Court) resolve the transformativeness and market-effect factors for general-purpose generative training vs. competitor-database copying; measure whether outputs substitute for specific inputs.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$0 (await appellate rulings; doctrinal analysis)",
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
            "In Bartz v. Anthropic (June 23, 2025), Judge Alsup held that training LLMs on lawfully obtained books was 'exceedingly transformative' fair use; a parallel ruling in Kadrey v. Meta also found training fair use. Both confine liability to how data was obtained, not the act of training.",
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
            "Two recent federal rulings directly on generative-AI training found it transformative and lawful, strongly cutting against the claim that unlicensed training should be unlawful. High directness; these are the most on-point decisions to date, though all are district-level and under appeal.",
        },
        {
          id: "nyt-memorization",
          title: "Models Can Regurgitate Training Text Verbatim",
          description:
            "The New York Times' 2023 complaint against OpenAI included exhibits showing GPT-4 reproducing long passages of Times articles near-verbatim when prompted, evidence that some models memorize and can output copies of training inputs.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 6,
          },
          source:
            "The New York Times Company v. Microsoft & OpenAI complaint (S.D.N.Y. 2023), Exhibit J; independent memorization studies",
          sourceUrl:
            "https://arxiv.org/abs/2412.06370",
          reasoning:
            "Demonstrates that the 'learning, not copying' defense has limits. Weights are moderate-to-low: the complaint's examples used adversarial prompting that OpenAI disputes, and verbatim regurgitation is an output/substitution issue, distinct from whether the training step itself is lawful.",
        },
      ],
    },
  ],
};
