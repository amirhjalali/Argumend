import type { Topic } from "@/lib/schemas/topic";

export const aiContentLabelingData = {
  id: "ai-content-labeling",
  title: "Mandatory AI Content Labeling",
  meta_claim:
    "AI-generated content should be required by law to carry visible labels or watermarks identifying it as AI-created.",
  status: "contested" as const,
  category: "technology" as const,
  pillars: [
    {
      id: "misinformation-prevention",
      title: "Misinformation Prevention",
      short_summary:
        "Labeling AI content helps the public distinguish real from synthetic media, reducing misinformation spread.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Labels are trivially removable through screenshots, re-encoding, or adversarial attacks on watermarks. Mandatory labeling creates a false sense of security — unlabeled content gets trusted more, while bad actors simply strip the labels.",
      proponent_rebuttal:
        "Even imperfect labeling shifts social norms and creates legal accountability frameworks. The EU AI Act and C2PA standard create infrastructure that makes provenance verifiable at scale. Just as food labeling doesn't prevent all fraud but massively reduces it, content labeling raises the cost of deception.",
      crux: {
        id: "watermark-robustness",
        title: "Watermark Robustness Under Adversarial Conditions",
        description:
          "Testing whether current AI watermarking techniques survive common transformations like screenshotting, compression, cropping, and deliberate adversarial removal attempts.",
        methodology:
          "Apply state-of-the-art watermarks (C2PA, Google SynthID, Meta Stable Signature) to 10,000 AI-generated images and text samples. Subject each to a battery of transformations. Measure detection rate post-transformation.",
        equation:
          "R_{robust} = \\frac{\\text{detected after transform}}{\\text{total watermarked}} \\times 100",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (Large-scale adversarial testing study)",
      },
      evidence: [
        {
          id: "eu-ai-act-provisions",
          title: "EU AI Act Mandates Labeling for Deepfakes",
          description:
            "The EU AI Act (2024) requires that AI-generated or manipulated content (deepfakes) must be clearly labeled. Violations carry fines up to 3% of global revenue.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "European Parliament",
          sourceUrl: "https://artificialintelligenceact.eu",
          reasoning:
            "Major democratic body enacted this after extensive deliberation; sets global precedent.",
        },
        {
          id: "deepfake-detection-rates",
          title: "Human Deepfake Detection Rates Below 50%",
          description:
            "Studies show untrained humans detect AI-generated faces at rates near chance (48-52%). Labels would provide the information humans cannot perceive on their own.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "University of Washington (2023)",
          reasoning:
            "Demonstrates clear need since human perception alone is insufficient.",
        },
        {
          id: "platform-label-experiments",
          title: "Social Media Platform Labeling Experiments",
          description:
            "Meta and YouTube have experimented with AI content labels. Early data shows labeled content receives 10-15% less sharing, suggesting labels influence behavior.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source: "Meta Transparency Center",
          reasoning:
            "Platform self-reported data; independence concerns but directionally informative.",
        },
        {
          id: "watermark-removal-ease",
          title: "Watermarks Can Be Removed or Forged",
          description:
            "Research from University of Maryland demonstrated that visible and invisible watermarks can be removed with high success rates using freely available tools, and false watermarks can be added to real content.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "University of Maryland (2023)",
          reasoning:
            "Peer-reviewed demonstration that technical enforcement has fundamental limitations.",
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
        "Labeling requirements chill creative and educational use of AI tools. Artists using AI assistance, students using writing tools, and journalists using AI transcription would all face compliance burdens. Overly broad mandates could suppress beneficial innovation.",
      proponent_rebuttal:
        "Transparency about authorship is a reasonable baseline that protects informed consent without banning AI use. Disclosing that content is AI-generated is no more burdensome than disclosing paid partnerships or editorial corrections. The right to free expression doesn't include the right to deceive about the nature of content.",
      crux: {
        id: "chilling-effect-measurement",
        title: "Measuring Chilling Effects on Creative AI Use",
        description:
          "Quantifying whether labeling mandates reduce beneficial AI tool adoption in creative, educational, and journalistic contexts.",
        methodology:
          "Compare AI tool adoption rates and creative output in jurisdictions with labeling mandates (EU, China) vs. those without. Survey creators about compliance burden.",
        equation:
          "\\Delta_{adoption} = \\beta_{mandate} + \\beta_{sector} + \\epsilon",
        verification_status: "theoretical" as const,
        cost_to_verify: "$300K (Cross-jurisdictional comparative study)",
      },
      evidence: [
        {
          id: "first-amendment-analyses",
          title: "First Amendment Scholars Divided on Compelled Disclosure",
          description:
            "Legal scholars are split: some argue compelled labeling is unconstitutional compelled speech; others argue it's permissible commercial disclosure like nutrition labels.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 7,
          },
          source: "Harvard Law Review, Stanford CIS",
          reasoning:
            "Genuine constitutional uncertainty creates legal risk for mandates.",
        },
        {
          id: "china-labeling-law",
          title: "China's AI Labeling Law Shows Mixed Results",
          description:
            "China's 2023 regulations requiring AI content labeling have been inconsistently enforced. Domestic platforms comply partially, but enforcement gaps are wide and creative users report self-censoring to avoid scrutiny.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "DigiChina, Stanford",
          reasoning:
            "Real-world implementation data, though China's regulatory context differs significantly from democracies.",
        },
        {
          id: "creator-community-surveys",
          title: "Creator Community Surveys Show Support for Disclosure",
          description:
            "Surveys of digital artists and writers show 62-68% support labeling requirements when applied to commercial and public-facing content, though opposition rises for private or educational use.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Creative Commons, Authors Guild",
          reasoning:
            "Self-reported survey data; reveals nuanced support rather than blanket opposition.",
        },
        {
          id: "informed-consent-precedent",
          title: "Informed Consent Precedents in Other Domains",
          description:
            "Requirements to disclose paid promotions, ghostwriters, and stock photography have not chilled expression in advertising, publishing, or journalism.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 5,
          },
          source: "FTC Endorsement Guidelines",
          reasoning:
            "Analogous precedent, though AI content labeling is broader in scope.",
        },
      ],
    },
  ],
};
