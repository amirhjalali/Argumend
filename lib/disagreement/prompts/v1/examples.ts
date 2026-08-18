import type { RawDisagreementExtractionV1 } from "@/types/disagreement";

export interface DisagreementFewShotExample {
  name: string;
  contentType: "conversation" | "article" | "freeform";
  source: string;
  extraction: RawDisagreementExtractionV1;
}

export const DISAGREEMENT_FEW_SHOT_EXAMPLES: DisagreementFewShotExample[] = [
  {
    name: "clear-empirical",
    contentType: "conversation",
    source:
      "Maya: The uninsured rate is about 8 percent.\nNoah: No, it is closer to 15 percent when you count the underinsured.",
    extraction: {
      mainQuestion: "What share of people lack adequate health insurance?",
      participants: [
        { id: "maya", label: "Maya", kind: "named" },
        { id: "noah", label: "Noah", kind: "named" },
      ],
      positions: [
        {
          id: "pos-uninsured-8",
          label: "Uninsured near 8 percent",
          participantIds: ["maya"],
          thesis: "The uninsured rate is about 8 percent.",
          steelman: "Official uninsured estimates are near 8 percent.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [{ quote: "The uninsured rate is about 8 percent.", participantId: "maya" }],
        },
        {
          id: "pos-underinsured",
          label: "Count the underinsured",
          participantIds: ["noah"],
          thesis: "The relevant rate is closer to 15 percent including the underinsured.",
          steelman: "A broader coverage gap is nearer 15 percent.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "it is closer to 15 percent when you count the underinsured", participantId: "noah" },
          ],
        },
      ],
      claims: [
        {
          id: "c-rate",
          statement: "About 8 percent of people are uninsured.",
          participantIds: ["maya"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-uninsured-8", relation: "supports" },
            { positionId: "pos-underinsured", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["maya"],
          disputedByParticipantIds: ["noah"],
          confidence: "high",
          groundingQuotes: [{ quote: "The uninsured rate is about 8 percent.", participantId: "maya" }],
        },
        {
          id: "c-under",
          statement: "The relevant coverage gap is closer to 15 percent when underinsurance is counted.",
          participantIds: ["noah"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-underinsured", relation: "supports" },
            { positionId: "pos-uninsured-8", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["noah"],
          disputedByParticipantIds: ["maya"],
          confidence: "high",
          groundingQuotes: [
            { quote: "it is closer to 15 percent when you count the underinsured", participantId: "noah" },
          ],
        },
      ],
      claimRelations: [],
      commonGroundCandidates: [
        {
          statement: "Health coverage rates are the relevant measurement.",
          participantIds: ["maya", "noah"],
          basis: "strongly-implied",
          confidence: "medium",
          groundingQuotes: [],
        },
      ],
      disagreementCandidates: [
        {
          id: "d-rate",
          question: "What is the uninsured or underinsured rate?",
          type: "empirical",
          summary: "They cite different coverage numbers and populations.",
          claimIds: ["c-rate"],
          participantStances: [
            { participantId: "maya", positionId: "pos-uninsured-8", stance: "About 8 percent." },
            { participantId: "noah", positionId: "pos-underinsured", stance: "Closer to 15 percent." },
          ],
          resolutionCondition: "Agree on the population and official series.",
          confidence: "high",
          groundingQuotes: [],
        },
      ],
      caveats: ["Numbers were asserted in the source, not checked."],
    },
  },
  {
    name: "causal-same-facts",
    contentType: "conversation",
    source:
      "Alex: Immigration is destroying wages for working-class Americans.\nBlair: That's complete nonsense. Immigrants grow the economy and create jobs.",
    extraction: {
      mainQuestion: "Does immigration lower wages for close substitutes?",
      participants: [
        { id: "alex", label: "Alex", kind: "named" },
        { id: "blair", label: "Blair", kind: "named" },
      ],
      positions: [
        {
          id: "pos-supply",
          label: "Labor supply lowers wages",
          participantIds: ["alex"],
          thesis: "Immigration destroys wages for working-class Americans.",
          steelman: "Added low-skill labor supply reduces wages among substitutes.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "Immigration is destroying wages for working-class Americans.", participantId: "alex" },
          ],
        },
        {
          id: "pos-demand",
          label: "Growth offsets supply",
          participantIds: ["blair"],
          thesis: "Immigrants grow the economy and create jobs.",
          steelman: "Demand and complementarity offset any supply effect.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "Immigrants grow the economy and create jobs.", participantId: "blair" },
          ],
        },
      ],
      claims: [
        {
          id: "c-wage",
          statement: "Immigration reduces wages among working-class natives.",
          participantIds: ["alex"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-supply", relation: "supports" },
            { positionId: "pos-demand", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["alex"],
          disputedByParticipantIds: ["blair"],
          confidence: "medium",
          groundingQuotes: [
            { quote: "Immigration is destroying wages for working-class Americans.", participantId: "alex" },
          ],
        },
        {
          id: "c-growth",
          statement: "Immigrants grow the economy and create jobs for natives.",
          participantIds: ["blair"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-demand", relation: "supports" },
            { positionId: "pos-supply", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["blair"],
          disputedByParticipantIds: ["alex"],
          confidence: "medium",
          groundingQuotes: [
            { quote: "Immigrants grow the economy and create jobs.", participantId: "blair" },
          ],
        },
      ],
      claimRelations: [],
      commonGroundCandidates: [
        {
          statement: "Native workers' economic outcomes matter.",
          participantIds: ["alex", "blair"],
          basis: "strongly-implied",
          confidence: "medium",
          groundingQuotes: [],
        },
      ],
      disagreementCandidates: [
        {
          id: "d-cause",
          question: "Does immigration's labor-supply effect outweigh demand and complementarity?",
          type: "causal",
          summary: "They accept that jobs and wages matter and dispute the mechanism.",
          claimIds: ["c-wage"],
          participantStances: [
            { participantId: "alex", positionId: "pos-supply", stance: "Supply dominates." },
            { participantId: "blair", positionId: "pos-demand", stance: "Growth dominates." },
          ],
          resolutionCondition: "Identified wage effects for close substitutes.",
          confidence: "high",
          groundingQuotes: [],
        },
      ],
      caveats: ["Causal claims were not independently verified."],
    },
  },
  {
    name: "definition-mismatch",
    contentType: "conversation",
    source:
      "Rin: Capitalism requires private ownership of the means of production.\nSam: Capitalism is any market with prices, including worker co-ops.",
    extraction: {
      mainQuestion: "What does capitalism mean in this exchange?",
      participants: [
        { id: "rin", label: "Rin", kind: "named" },
        { id: "sam", label: "Sam", kind: "named" },
      ],
      positions: [
        {
          id: "pos-ownership",
          label: "Ownership definition",
          participantIds: ["rin"],
          thesis: "Capitalism requires private ownership of the means of production.",
          steelman: "The term names a property regime, not any priced market.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            {
              quote: "Capitalism requires private ownership of the means of production.",
              participantId: "rin",
            },
          ],
        },
        {
          id: "pos-markets",
          label: "Market definition",
          participantIds: ["sam"],
          thesis: "Capitalism is any market with prices, including worker co-ops.",
          steelman: "Priced markets are sufficient for the label.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "Capitalism is any market with prices, including worker co-ops.", participantId: "sam" },
          ],
        },
      ],
      claims: [
        {
          id: "c-def",
          statement: "Capitalism requires private ownership of the means of production.",
          participantIds: ["rin"],
          epistemicType: "definitional",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-ownership", relation: "supports" },
            { positionId: "pos-markets", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["rin"],
          disputedByParticipantIds: ["sam"],
          confidence: "high",
          groundingQuotes: [
            {
              quote: "Capitalism requires private ownership of the means of production.",
              participantId: "rin",
            },
          ],
        },
        {
          id: "c-market",
          statement: "Capitalism is any market with prices, including worker co-ops.",
          participantIds: ["sam"],
          epistemicType: "definitional",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-markets", relation: "supports" },
            { positionId: "pos-ownership", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["sam"],
          disputedByParticipantIds: ["rin"],
          confidence: "high",
          groundingQuotes: [
            { quote: "Capitalism is any market with prices, including worker co-ops.", participantId: "sam" },
          ],
        },
      ],
      claimRelations: [],
      commonGroundCandidates: [],
      disagreementCandidates: [
        {
          id: "d-def",
          question: "What does 'capitalism' refer to here?",
          type: "definitional",
          summary: "They use the same word for different institutions.",
          claimIds: ["c-def"],
          participantStances: [
            { participantId: "rin", positionId: "pos-ownership", stance: "Property regime." },
            { participantId: "sam", positionId: "pos-markets", stance: "Any priced market." },
          ],
          resolutionCondition: "Agree on a stipulated definition.",
          confidence: "high",
          groundingQuotes: [],
        },
      ],
      caveats: ["This is a definition dispute, not a fact-check."],
    },
  },
  {
    name: "value-conflict",
    contentType: "conversation",
    source:
      "Priya: Preventing one false negative is worth ten false positives.\nOwen: I will not accept locking up ten innocents to catch one guilty person.",
    extraction: {
      mainQuestion: "How should false positives and false negatives be weighted?",
      participants: [
        { id: "priya", label: "Priya", kind: "named" },
        { id: "owen", label: "Owen", kind: "named" },
      ],
      positions: [
        {
          id: "pos-prevent",
          label: "Prevent missed harm",
          participantIds: ["priya"],
          thesis: "Preventing one false negative is worth ten false positives.",
          steelman: "Avoiding a missed harm can justify a high false-positive burden.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "Preventing one false negative is worth ten false positives.", participantId: "priya" },
          ],
        },
        {
          id: "pos-innocent",
          label: "Protect the innocent",
          participantIds: ["owen"],
          thesis: "Locking up ten innocents to catch one guilty person is unacceptable.",
          steelman: "False punishment of innocents outweighs catching one additional guilty person.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            {
              quote: "I will not accept locking up ten innocents to catch one guilty person.",
              participantId: "owen",
            },
          ],
        },
      ],
      claims: [
        {
          id: "c-weight",
          statement: "Preventing one false negative is worth ten false positives.",
          participantIds: ["priya"],
          epistemicType: "normative",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-prevent", relation: "supports" },
            { positionId: "pos-innocent", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["priya"],
          disputedByParticipantIds: ["owen"],
          confidence: "high",
          resolution: {
            kind: "value-difference",
            condition: "The parties would have to change how they weight errors.",
          },
          groundingQuotes: [
            { quote: "Preventing one false negative is worth ten false positives.", participantId: "priya" },
          ],
        },
        {
          id: "c-innocent",
          statement: "Locking up ten innocents to catch one guilty person is unacceptable.",
          participantIds: ["owen"],
          epistemicType: "normative",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-innocent", relation: "supports" },
            { positionId: "pos-prevent", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["owen"],
          disputedByParticipantIds: ["priya"],
          confidence: "high",
          groundingQuotes: [
            {
              quote: "I will not accept locking up ten innocents to catch one guilty person.",
              participantId: "owen",
            },
          ],
        },
      ],
      claimRelations: [],
      commonGroundCandidates: [
        {
          statement: "Error tradeoffs in punishment are morally important.",
          participantIds: ["priya", "owen"],
          basis: "strongly-implied",
          confidence: "medium",
          groundingQuotes: [],
        },
      ],
      disagreementCandidates: [
        {
          id: "d-value",
          question: "Is preventing one false negative worth ten false positives?",
          type: "normative",
          summary: "They accept the tradeoff framing and reject each other's weights.",
          claimIds: ["c-weight"],
          participantStances: [
            { participantId: "priya", positionId: "pos-prevent", stance: "Yes." },
            { participantId: "owen", positionId: "pos-innocent", stance: "No." },
          ],
          resolutionCondition: "Make the value weights explicit; data will not settle them.",
          confidence: "high",
          groundingQuotes: [],
        },
      ],
      caveats: ["No factual study can assign these weights."],
    },
  },
  {
    name: "one-sided-article",
    contentType: "article",
    source:
      "The city should add protected bike lanes on Oak Street. Injury data from last year shows drivers struck cyclists at three unmarked crossings. A lane would separate traffic and cut those collisions.",
    extraction: {
      mainQuestion: "Should Oak Street get protected bike lanes?",
      participants: [{ id: "author", label: "Author", kind: "author" }],
      positions: [
        {
          id: "pos-lanes",
          label: "Add protected lanes",
          participantIds: ["author"],
          thesis: "The city should add protected bike lanes on Oak Street.",
          steelman: "Protected lanes would separate traffic and reduce collisions at unmarked crossings.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "The city should add protected bike lanes on Oak Street.", participantId: "author" },
          ],
        },
      ],
      claims: [
        {
          id: "c-collisions",
          statement: "Drivers struck cyclists at three unmarked crossings last year.",
          participantIds: ["author"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [{ positionId: "pos-lanes", relation: "supports" }],
          acceptedByParticipantIds: ["author"],
          disputedByParticipantIds: [],
          confidence: "medium",
          groundingQuotes: [
            { quote: "drivers struck cyclists at three unmarked crossings", participantId: "author" },
          ],
        },
      ],
      claimRelations: [],
      commonGroundCandidates: [],
      disagreementCandidates: [],
      caveats: ["No opposing position appears in the source. None was invented."],
    },
  },
  {
    name: "insufficient-context",
    contentType: "freeform",
    source: "lol same. anyway see you at 8. bring chips if you can.",
    extraction: {
      mainQuestion: "What is being discussed?",
      participants: [{ id: "speaker", label: "Speaker", kind: "implicit" }],
      positions: [],
      claims: [],
      claimRelations: [],
      commonGroundCandidates: [],
      disagreementCandidates: [],
      caveats: ["The text is not an argument."],
    },
  },
];
