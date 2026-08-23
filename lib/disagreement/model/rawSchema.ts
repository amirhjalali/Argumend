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
            label: { type: "string", maxLength: L.maxThesisCharacters },
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
            label: { type: "string", maxLength: L.maxThesisCharacters },
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
            statement: { type: "string", maxLength: L.maxSummaryCharacters },
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
                condition: { type: "string", maxLength: L.maxSummaryCharacters },
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
      claimStakeCandidates: {
        type: "array",
        maxItems: L.maxClaimStakes,
        // Not listed in `required`: older fixtures and providers predate
        // stakes, and the Zod layer supplies an empty default.
        description: `For each MAJOR claim, what conclusion it is used to affect and what changes if it is false. At most ${L.maxClaimStakes} entries; omit for minor claims.`,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "id",
            "claimId",
            "participantId",
            "targetConclusion",
            "role",
            "ifFalseEffect",
            "consequence",
            "basis",
            "groundingQuotes",
          ],
          properties: {
            id: { type: "string" },
            claimId: { type: "string" },
            participantId: { type: "string" },
            positionId: { type: "string" },
            targetConclusion: { type: "string", maxLength: L.maxThesisCharacters },
            role: {
              type: "string",
              enum: ["hinge", "material", "supporting", "context", "rebuttal-only", "unclear"],
            },
            ifFalseEffect: {
              type: "string",
              enum: [
                "withdraw",
                "substantially-weaken",
                "somewhat-weaken",
                "reconsider",
                "no-change",
                "not-stated",
              ],
            },
            consequence: {
              type: "string",
              maxLength: L.maxStakeConsequenceCharacters,
              description:
                "What changes for the target conclusion if the claim is false, as stated or implied by the source. If the source does not say, write that no update is stated.",
            },
            basis: { type: "string", enum: ["explicit", "inferred", "unstated"] },
            falsificationCondition: { type: "string", maxLength: L.maxSummaryCharacters },
            alternativeBasis: {
              type: "string",
              maxLength: L.maxSummaryCharacters,
              description:
                "Another stated reason that would keep the conclusion standing even if this claim fails.",
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
      commonGroundCandidates: {
        type: "array",
        maxItems: L.maxCommonGround,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["statement", "participantIds", "basis", "confidence", "groundingQuotes"],
          properties: {
            statement: { type: "string", maxLength: L.maxSummaryCharacters },
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
            question: { type: "string", maxLength: L.maxQuestionCharacters },
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
            summary: { type: "string", maxLength: L.maxSummaryCharacters },
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
                  stance: { type: "string", maxLength: L.maxSummaryCharacters },
                },
              },
            },
            resolutionCondition: { type: "string", maxLength: L.maxSummaryCharacters },
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
      caveats: {
        type: "array",
        maxItems: 12,
        // The combined budget cannot be expressed in JSON Schema, so it is
        // stated here where the model will actually read it.
        description: `Each at most ${L.maxSummaryCharacters} characters, and at most ${L.maxCaveatsCombinedCharacters} characters in total across all caveats.`,
        items: { type: "string", maxLength: L.maxSummaryCharacters },
      },
    },
  },
};
