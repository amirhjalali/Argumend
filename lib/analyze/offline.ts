import type {
  ExtractedArgument,
  ExtractedArguments,
  ExtractedPosition,
  PotentialFallacy,
  DetectedBias,
} from "./extractor";
import {
  ABSOLUTE_MARKERS,
  EMOTIONAL_MARKERS,
  EVIDENCE_MARKERS,
  clamp,
  normalize,
  splitSentences,
  countMarkers,
  extractKeywords,
} from "@/lib/textUtils";

type ContentTypeForAnalysis = "transcript" | "article" | "freeform";

const FOR_MARKERS = [
  "proponent", "supporter", "advocate", "benefit", "improve",
  "effective", "reliable", "necessary", "essential", "safer",
  "works", "evidence shows", "reduces", "increase",
];

const AGAINST_MARKERS = [
  "critic", "opponent", "skeptic", "risk", "harm", "danger",
  "expensive", "slow", "uncertain", "fails", "problem",
  "unresolved", "cannot", "can't", "waste", "drawback",
];

function inferTopic(content: string, sentences: string[]): string {
  const source = normalize(content);
  const debateOverMatch = source.match(
    /\b(?:debate|argument|discussion)\s+(?:over|about|on)\s+([^.!?\n]{6,120})/i
  );
  if (debateOverMatch?.[1]) {
    return `Debate over ${debateOverMatch[1].trim()}`;
  }

  const whetherMatch = source.match(/\bwhether\s+([^.!?\n]{6,120})/i);
  if (whetherMatch?.[1]) {
    return `Whether ${whetherMatch[1].trim()}`;
  }

  if (sentences[0]) {
    return sentences[0].slice(0, 110).replace(/[.?!]+$/, "");
  }

  const keywords = extractKeywords(content, 4);
  if (keywords.length > 0) {
    return `Debate about ${keywords.join(" ")}`;
  }

  return "Unspecified argument topic";
}

function classifySentence(sentence: string): "for" | "against" | "neutral" {
  const lower = sentence.toLowerCase();

  let forScore = countMarkers(lower, FOR_MARKERS);
  let againstScore = countMarkers(lower, AGAINST_MARKERS);

  if (lower.startsWith("supporters") || lower.startsWith("proponents")) {
    forScore += 2;
  }
  if (lower.startsWith("critics") || lower.startsWith("opponents") || lower.startsWith("skeptics")) {
    againstScore += 2;
  }

  if (lower.includes("however") || lower.includes("critics counter")) {
    againstScore += 1;
  }
  if (lower.includes("supporters respond")) {
    forScore += 1;
  }

  if (forScore > againstScore) return "for";
  if (againstScore > forScore) return "against";
  return "neutral";
}

function hasEvidenceCue(text: string): boolean {
  const lower = text.toLowerCase();
  if (/\d/.test(lower)) return true;
  return EVIDENCE_MARKERS.some((marker) => lower.includes(marker));
}

function hasAbsoluteCue(text: string): boolean {
  const lower = text.toLowerCase();
  return ABSOLUTE_MARKERS.some((marker) => lower.includes(marker));
}

function buildArgument(claimSentence: string, nearbySentences: string[]): ExtractedArgument {
  const evidence = nearbySentences
    .filter((sentence) => hasEvidenceCue(sentence))
    .slice(0, 2)
    .map((sentence) => sentence.replace(/[.?!]+$/, ""));

  let score = 4;
  if (hasEvidenceCue(claimSentence)) score += 2;
  score += evidence.length;
  if (claimSentence.length > 110) score += 1;
  if (hasAbsoluteCue(claimSentence)) score -= 2;
  score = clamp(score, 1, 10);

  const rationaleParts = [];
  if (evidence.length > 0 || hasEvidenceCue(claimSentence)) {
    rationaleParts.push("Uses concrete evidence or quantitative details.");
  } else {
    rationaleParts.push("Mostly assertive framing with limited direct evidence.");
  }
  if (hasAbsoluteCue(claimSentence)) {
    rationaleParts.push("Contains absolute language that reduces analytical confidence.");
  }

  return {
    claim: claimSentence.replace(/[.?!]+$/, ""),
    evidence: evidence.length > 0 ? evidence : undefined,
    strengthScore: score,
    strengthRationale: rationaleParts.join(" "),
  };
}

function averageStrength(position: ExtractedPosition | undefined): number | undefined {
  if (!position || position.arguments.length === 0) return undefined;
  const scores = position.arguments
    .map((argument) => argument.strengthScore)
    .filter((score): score is number => score != null);
  if (scores.length === 0) return undefined;
  const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  return Number(avg.toFixed(1));
}

function inferCruxes(
  topic: string,
  forPosition: ExtractedPosition | undefined,
  againstPosition: ExtractedPosition | undefined
): ExtractedArguments["identifiedCruxes"] {
  if (!forPosition && !againstPosition) {
    return [
      {
        description: `What standard of proof should govern claims about ${topic}?`,
        significance: "Agreement on evidence standards is required before any side can convincingly prevail.",
      },
    ];
  }

  const forClaim = forPosition?.arguments[0]?.claim ?? "the proposed benefits";
  const againstClaim = againstPosition?.arguments[0]?.claim ?? "the unresolved risks";

  return [
    {
      description: `Whether ${forClaim.toLowerCase()} outweighs ${againstClaim.toLowerCase()}`,
      significance: "This is the central tradeoff driving disagreement between the two sides.",
    },
    {
      description: "How much confidence is justified by the current evidence quality",
      significance: "Both sides appeal to evidence, but they apply different thresholds for certainty.",
    },
  ];
}

function inferFallacies(sentences: string[]): PotentialFallacy[] {
  const fallacies: PotentialFallacy[] = [];

  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();

    if (
      fallacies.length < 3 &&
      ABSOLUTE_MARKERS.some((marker) => lower.includes(marker))
    ) {
      fallacies.push({
        type: "Hasty Generalization",
        explanation: "The claim uses absolute language that may overgeneralize from limited evidence.",
        quote: sentence.slice(0, 180),
        severity: "possible",
        impact: 4,
      });
    }

    if (
      fallacies.length < 3 &&
      /\beither\b.*\bor\b/.test(lower)
    ) {
      fallacies.push({
        type: "False Dichotomy",
        explanation: "The framing presents a binary choice when additional options may exist.",
        quote: sentence.slice(0, 180),
        severity: "likely",
        impact: 6,
      });
    }

    if (
      fallacies.length < 3 &&
      (lower.includes("everyone knows") || lower.includes("obviously"))
    ) {
      fallacies.push({
        type: "Appeal to Popularity",
        explanation: "The argument leans on perceived consensus instead of direct support.",
        quote: sentence.slice(0, 180),
        severity: "possible",
        impact: 3,
      });
    }
  }

  return fallacies;
}

function inferBiases(
  content: string,
  forPosition: ExtractedPosition | undefined,
  againstPosition: ExtractedPosition | undefined
): DetectedBias[] {
  const biases: DetectedBias[] = [];
  const forCount = forPosition?.arguments.length ?? 0;
  const againstCount = againstPosition?.arguments.length ?? 0;

  if (forCount >= againstCount * 2 && forCount >= 2) {
    biases.push({
      type: "Selection Bias",
      explanation: "The content emphasizes supporting claims more heavily than opposing evidence.",
      affectedSide: "for",
      impact: 6,
    });
  }

  if (againstCount >= forCount * 2 && againstCount >= 2) {
    biases.push({
      type: "Selection Bias",
      explanation: "The content emphasizes objections while giving limited space to supporting evidence.",
      affectedSide: "against",
      impact: 6,
    });
  }

  const lower = content.toLowerCase();
  const emotionalHits = EMOTIONAL_MARKERS.filter((marker) =>
    lower.includes(marker)
  ).length;
  if (emotionalHits >= 2) {
    biases.push({
      type: "Framing Bias",
      explanation: "Emotionally loaded language may steer interpretation beyond the underlying evidence.",
      affectedSide: "both",
      impact: 5,
    });
  }

  return biases.slice(0, 3);
}

function inferSummary(
  topic: string,
  forPosition: ExtractedPosition | undefined,
  againstPosition: ExtractedPosition | undefined
): string {
  const forClaim = forPosition?.arguments[0]?.claim;
  const againstClaim = againstPosition?.arguments[0]?.claim;

  if (forClaim && againstClaim) {
    return `The text presents a structured dispute about ${topic}. The supporting side argues that ${forClaim.toLowerCase()}, while the opposing side argues that ${againstClaim.toLowerCase()}. The disagreement centers on evidence quality, practical risk, and the burden of proof.`;
  }

  if (forClaim) {
    return `The text argues in favor of ${topic}, primarily claiming that ${forClaim.toLowerCase()}. Counterarguments are limited, so confidence in full balance remains moderate.`;
  }

  if (againstClaim) {
    return `The text primarily critiques ${topic}, arguing that ${againstClaim.toLowerCase()}. Supporting counterweight is limited, so the debate structure appears one-sided.`;
  }

  return `The text references ${topic}, but contains limited explicit argumentative structure.`;
}

function inferConfidence(
  content: string,
  forPosition: ExtractedPosition | undefined,
  againstPosition: ExtractedPosition | undefined
): number {
  let confidence = 0.35;
  const forCount = forPosition?.arguments.length ?? 0;
  const againstCount = againstPosition?.arguments.length ?? 0;
  const total = forCount + againstCount;

  confidence += Math.min(total * 0.08, 0.25);
  if (forCount > 0 && againstCount > 0) confidence += 0.25;
  if (content.length < 500) confidence -= 0.08;
  if (total === 0) confidence -= 0.2;

  return Number(clamp(confidence, 0.15, 0.95).toFixed(2));
}

function buildPositions(sentences: string[]): ExtractedPosition[] {
  const forSentences: string[] = [];
  const againstSentences: string[] = [];

  for (const sentence of sentences) {
    const side = classifySentence(sentence);
    if (side === "for") {
      forSentences.push(sentence);
    } else if (side === "against") {
      againstSentences.push(sentence);
    }
  }

  const positions: ExtractedPosition[] = [];

  if (forSentences.length > 0) {
    const argumentsFor = forSentences.slice(0, 4).map((sentence, index) =>
      buildArgument(sentence, forSentences.slice(Math.max(0, index - 1), index + 2))
    );
    positions.push({
      side: "for",
      speaker: "Proponent",
      arguments: argumentsFor,
    });
  }

  if (againstSentences.length > 0) {
    const argumentsAgainst = againstSentences.slice(0, 4).map((sentence, index) =>
      buildArgument(
        sentence,
        againstSentences.slice(Math.max(0, index - 1), index + 2)
      )
    );
    positions.push({
      side: "against",
      speaker: "Skeptic",
      arguments: argumentsAgainst,
    });
  }

  if (positions.length === 1) {
    const implicitSide = positions[0].side === "for" ? "against" : "for";
    positions.push({
      side: implicitSide,
      speaker: implicitSide === "for" ? "Proponent" : "Skeptic",
      arguments: [
        {
          claim:
            implicitSide === "for"
              ? "A plausible supporting case exists but is underdeveloped in the provided text."
              : "A plausible counterargument exists but is underdeveloped in the provided text.",
          strengthScore: 3,
          strengthRationale:
            "Synthesized as an implicit missing side because the source text is one-sided.",
        },
      ],
    });
  }

  if (positions.length === 0) {
    positions.push(
      {
        side: "for",
        speaker: "Proponent",
        arguments: [
          {
            claim: "The text hints at a supporting thesis but does not make it explicit.",
            strengthScore: 2,
            strengthRationale: "Low confidence due to lack of explicit claims.",
          },
        ],
      },
      {
        side: "against",
        speaker: "Skeptic",
        arguments: [
          {
            claim: "The text also leaves core objections implicit rather than explicit.",
            strengthScore: 2,
            strengthRationale: "Low confidence due to lack of explicit counterclaims.",
          },
        ],
      }
    );
  }

  return positions;
}

export function extractArgumentsOffline(
  content: string,
  _contentType: ContentTypeForAnalysis = "freeform"
): ExtractedArguments {
  const normalized = normalize(content);
  const sentences = splitSentences(normalized);
  const topic = inferTopic(normalized, sentences);
  const positions = buildPositions(sentences);
  const forPosition = positions.find((position) => position.side === "for");
  const againstPosition = positions.find((position) => position.side === "against");

  const extracted: ExtractedArguments = {
    topic,
    positions,
    identifiedCruxes: inferCruxes(topic, forPosition, againstPosition),
    potentialFallacies: inferFallacies(sentences),
    detectedBiases: inferBiases(normalized, forPosition, againstPosition),
    summary: inferSummary(topic, forPosition, againstPosition),
    confidence: inferConfidence(normalized, forPosition, againstPosition),
    forStrength: averageStrength(forPosition),
    againstStrength: averageStrength(againstPosition),
  };

  return extracted;
}
