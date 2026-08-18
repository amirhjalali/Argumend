import { DISAGREEMENT_LIMITS } from "@/lib/disagreement/constants";

const L = DISAGREEMENT_LIMITS;

export const RAW_EXTRACTION_TOOL = {
  name: "extract_disagreement",
  description:
    "Return the structured disagreement extraction. Use only information from the source.",
  input_schema: {
    type: "object",
    additionalProperties: false,
    required: [
      "mainQuestion",
      "participants",
      "positions",
      "claims",
      "claimRelations",
      "commonGroundCandidates",
      "disagreementCandidates",
      "caveats",
    ],
    properties: {
      mainQuestion: { type: "string", maxLength: L.maxQuestionCharacters },
      participants: {
        type: "array",
        maxItems: L.maxParticipants,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "label", "kind"],
          properties: {
            id: { type: "string" },
            label: { type: "string" },
            kind: { type: "string", enum: ["named", "speaker-label", "author", "implicit"] },
          },
        },
      },
      positions: {
        type: "array",
        maxItems: L.maxPositions,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "id",
            "label",
            "participantIds",
            "thesis",
            "steelman",
            "explicitness",
            "confidence",
            "groundingQuotes",
          ],
          properties: {
            id: { type: "string" },
            label: { type: "string" },
            participantIds: { type: "array", items: { type: "string" } },
            thesis: { type: "string", maxLength: L.maxThesisCharacters },
            steelman: { type: "string", maxLength: L.maxSteelmanCharacters },
            explicitness: { type: "string", enum: ["explicit", "inferred"] },
            confidence: { type: "string", enum: ["low", "medium", "high"] },
            groundingQuotes: {
              type: "array",
              maxItems: L.maxGroundingPerObject,
              items: {
                type: "object",
                additionalProperties: false,
                required: ["quote"],
                properties: {
                  quote: { type: "string", maxLength: L.maxQuoteCharacters },
                  participantId: { type: "string" },
                },
              },
            },
          },
        },
      },
      claims: {
        type: "array",
        maxItems: L.maxClaims,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "id",
            "statement",
            "participantIds",
            "epistemicType",
            "explicitness",
            "stanceByPosition",
            "acceptedByParticipantIds",
            "disputedByParticipantIds",
            "confidence",
            "groundingQuotes",
          ],
          properties: {
            id: { type: "string" },
            statement: { type: "string" },
            participantIds: { type: "array", items: { type: "string" } },
            epistemicType: {
              type: "string",
              enum: ["empirical", "predictive", "normative", "definitional", "procedural"],
            },
            explicitness: { type: "string", enum: ["explicit", "inferred"] },
            stanceByPosition: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["positionId", "relation"],
                properties: {
                  positionId: { type: "string" },
                  relation: { type: "string", enum: ["supports", "opposes"] },
                },
              },
            },
            acceptedByParticipantIds: { type: "array", items: { type: "string" } },
            disputedByParticipantIds: { type: "array", items: { type: "string" } },
            confidence: { type: "string", enum: ["low", "medium", "high"] },
            resolution: {
              type: "object",
              additionalProperties: false,
              required: ["kind", "condition"],
              properties: {
                kind: {
                  type: "string",
                  enum: [
                    "existing-evidence",
                    "future-observable",
                    "definitional-choice",
                    "value-difference",
                    "authority-allocation",
                  ],
                },
                condition: { type: "string" },
              },
            },
            groundingQuotes: {
              type: "array",
              maxItems: L.maxGroundingPerObject,
              items: {
                type: "object",
                additionalProperties: false,
                required: ["quote"],
                properties: {
                  quote: { type: "string", maxLength: L.maxQuoteCharacters },
                  participantId: { type: "string" },
                },
              },
            },
          },
        },
      },
      claimRelations: {
        type: "array",
        maxItems: L.maxClaimRelations,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["fromClaimId", "toClaimId", "type"],
          properties: {
            fromClaimId: { type: "string" },
            toClaimId: { type: "string" },
            type: {
              type: "string",
              enum: ["supports", "opposes", "depends_on", "qualifies", "contradicts", "undercuts"],
            },
          },
        },
      },
      commonGroundCandidates: {
        type: "array",
        maxItems: L.maxCommonGround,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["statement", "participantIds", "basis", "confidence", "groundingQuotes"],
          properties: {
            statement: { type: "string" },
            participantIds: { type: "array", items: { type: "string" } },
            basis: { type: "string", enum: ["explicit", "strongly-implied"] },
            confidence: { type: "string", enum: ["low", "medium", "high"] },
            groundingQuotes: {
              type: "array",
              maxItems: L.maxGroundingPerObject,
              items: {
                type: "object",
                additionalProperties: false,
                required: ["quote"],
                properties: {
                  quote: { type: "string", maxLength: L.maxQuoteCharacters },
                  participantId: { type: "string" },
                },
              },
            },
          },
        },
      },
      disagreementCandidates: {
        type: "array",
        maxItems: L.maxDisagreements,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "id",
            "question",
            "type",
            "summary",
            "claimIds",
            "participantStances",
            "resolutionCondition",
            "confidence",
            "groundingQuotes",
          ],
          properties: {
            id: { type: "string" },
            question: { type: "string" },
            type: {
              type: "string",
              enum: [
                "empirical",
                "causal",
                "predictive",
                "definitional",
                "normative",
                "procedural",
                "priority",
                "trust",
              ],
            },
            summary: { type: "string" },
            claimIds: { type: "array", items: { type: "string" } },
            participantStances: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["participantId", "stance"],
                properties: {
                  participantId: { type: "string" },
                  positionId: { type: "string" },
                  stance: { type: "string" },
                },
              },
            },
            resolutionCondition: { type: "string" },
            confidence: { type: "string", enum: ["low", "medium", "high"] },
            groundingQuotes: {
              type: "array",
              maxItems: L.maxGroundingPerObject,
              items: {
                type: "object",
                additionalProperties: false,
                required: ["quote"],
                properties: {
                  quote: { type: "string", maxLength: L.maxQuoteCharacters },
                  participantId: { type: "string" },
                },
              },
            },
          },
        },
      },
      caveats: { type: "array", items: { type: "string" } },
    },
  },
};
