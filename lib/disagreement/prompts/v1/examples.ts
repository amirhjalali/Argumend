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
  {
    name: "stake-explicit-update",
    contentType: "conversation",
    source:
      "Priya: The community center expansion should be canceled because it will exceed ten million dollars.\nTom: The benefits to the neighborhood justify the cost. We should build it.\nPriya: If an independent estimate comes in below seven million, I would support building it.",
    extraction: {
      mainQuestion: "Should the community center expansion be built?",
      participants: [
        { id: "priya", label: "Priya", kind: "named" },
        { id: "tom", label: "Tom", kind: "named" },
      ],
      positions: [
        {
          id: "pos-cancel",
          label: "Cancel the expansion",
          participantIds: ["priya"],
          thesis: "The expansion should be canceled because it will exceed ten million dollars.",
          steelman:
            "A project whose cost estimate is already above ten million dollars is a poor use of community funds.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            {
              quote: "The community center expansion should be canceled because it will exceed ten million dollars.",
              participantId: "priya",
            },
          ],
        },
        {
          id: "pos-build",
          label: "Build it",
          participantIds: ["tom"],
          thesis: "The neighborhood benefits justify the cost, so the expansion should be built.",
          steelman:
            "Community benefits can outweigh a high price tag, and canceling forfeits them entirely.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "The benefits to the neighborhood justify the cost.", participantId: "tom" },
          ],
        },
      ],
      claims: [
        {
          id: "c-cost",
          statement: "The expansion will exceed ten million dollars.",
          participantIds: ["priya"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-cancel", relation: "supports" },
            { positionId: "pos-build", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["priya"],
          disputedByParticipantIds: ["tom"],
          confidence: "medium",
          groundingQuotes: [
            { quote: "it will exceed ten million dollars", participantId: "priya" },
          ],
        },
        {
          id: "c-benefits",
          statement: "The neighborhood benefits justify the cost.",
          participantIds: ["tom"],
          epistemicType: "normative",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-build", relation: "supports" },
            { positionId: "pos-cancel", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["tom"],
          disputedByParticipantIds: ["priya"],
          confidence: "medium",
          groundingQuotes: [
            { quote: "The benefits to the neighborhood justify the cost.", participantId: "tom" },
          ],
        },
      ],
      claimRelations: [],
      commonGroundCandidates: [],
      disagreementCandidates: [
        {
          id: "d-cost",
          question: "Will the expansion exceed ten million dollars?",
          type: "empirical",
          summary: "Priya asserts a ten-million-dollar cost; Tom disputes that cost decides the question.",
          claimIds: ["c-cost"],
          participantStances: [
            { participantId: "priya", positionId: "pos-cancel", stance: "It will exceed ten million." },
            { participantId: "tom", positionId: "pos-build", stance: "Cost does not settle it." },
          ],
          resolutionCondition: "An independent cost estimate.",
          confidence: "high",
          groundingQuotes: [],
        },
      ],
      claimStakeCandidates: [
        {
          id: "stake-cost",
          claimId: "c-cost",
          participantId: "priya",
          positionId: "pos-cancel",
          targetConclusion: "The expansion should be canceled.",
          role: "hinge",
          ifFalseEffect: "withdraw",
          consequence:
            "Priya states she would support building it if an independent estimate came in below seven million dollars.",
          basis: "explicit",
          falsificationCondition:
            "An independent estimate below seven million dollars.",
          groundingQuotes: [
            {
              quote: "If an independent estimate comes in below seven million, I would support building it.",
              participantId: "priya",
            },
          ],
        },
      ],
      caveats: ["The cost figure is asserted, not verified."],
    },
  },
  {
    name: "stake-overdetermined",
    contentType: "conversation",
    source:
      "Rosa: The bridge project should be dropped. It is running forty percent over budget.\nFelix: The budget numbers are wrong; the original audit was rushed.\nRosa: Even if the audit numbers are revised down, I still oppose it because the design is unsafe.",
    extraction: {
      mainQuestion: "Should the bridge project be dropped?",
      participants: [
        { id: "rosa", label: "Rosa", kind: "named" },
        { id: "felix", label: "Felix", kind: "named" },
      ],
      positions: [
        {
          id: "pos-drop",
          label: "Drop the project",
          participantIds: ["rosa"],
          thesis: "The bridge project should be dropped because it is over budget and its design is unsafe.",
          steelman:
            "Independent of the cost dispute, an unsafe design is a reason to stop the project on its own.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "The bridge project should be dropped.", participantId: "rosa" },
          ],
        },
        {
          id: "pos-continue",
          label: "Continue the project",
          participantIds: ["felix"],
          thesis: "The project should continue because the budget objection rests on a flawed audit.",
          steelman:
            "If the rushed audit overstated the overrun, the cost case for dropping the project fails.",
          explicitness: "explicit",
          confidence: "medium",
          groundingQuotes: [
            { quote: "The budget numbers are wrong; the original audit was rushed.", participantId: "felix" },
          ],
        },
      ],
      claims: [
        {
          id: "c-overbudget",
          statement: "The bridge project is running forty percent over budget.",
          participantIds: ["rosa"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-drop", relation: "supports" },
            { positionId: "pos-continue", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["rosa"],
          disputedByParticipantIds: ["felix"],
          confidence: "medium",
          groundingQuotes: [
            { quote: "It is running forty percent over budget.", participantId: "rosa" },
          ],
        },
        {
          id: "c-audit-wrong",
          statement: "The budget numbers are wrong because the original audit was rushed.",
          participantIds: ["felix"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-continue", relation: "supports" },
            { positionId: "pos-drop", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["felix"],
          disputedByParticipantIds: ["rosa"],
          confidence: "medium",
          groundingQuotes: [
            { quote: "The budget numbers are wrong; the original audit was rushed.", participantId: "felix" },
          ],
        },
        {
          id: "c-unsafe-design",
          statement: "The bridge design is unsafe.",
          participantIds: ["rosa"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-drop", relation: "supports" },
            { positionId: "pos-continue", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["rosa"],
          disputedByParticipantIds: [],
          confidence: "medium",
          groundingQuotes: [
            { quote: "the design is unsafe", participantId: "rosa" },
          ],
        },
      ],
      claimRelations: [],
      commonGroundCandidates: [
        {
          statement: "The audit's quality is worth scrutinizing before deciding.",
          participantIds: ["rosa", "felix"],
          basis: "strongly-implied",
          confidence: "low",
          groundingQuotes: [],
        },
      ],
      disagreementCandidates: [
        {
          id: "d-audit",
          question: "Is the bridge project running forty percent over budget?",
          type: "empirical",
          summary: "Rosa cites the overrun; Felix disputes the audit behind it.",
          claimIds: ["c-overbudget"],
          participantStances: [
            { participantId: "rosa", positionId: "pos-drop", stance: "Forty percent over." },
            { participantId: "felix", positionId: "pos-continue", stance: "The audit was rushed." },
          ],
          resolutionCondition: "A redone, independent audit.",
          confidence: "high",
          groundingQuotes: [],
        },
        {
          id: "d-safety",
          question: "Is the bridge design unsafe?",
          type: "empirical",
          summary: "Rosa raises safety as a standalone objection.",
          claimIds: ["c-unsafe-design"],
          participantStances: [
            { participantId: "rosa", positionId: "pos-drop", stance: "The design is unsafe." },
          ],
          resolutionCondition: "An independent engineering review.",
          confidence: "medium",
          groundingQuotes: [],
        },
      ],
      claimStakeCandidates: [
        {
          id: "stake-overbudget",
          claimId: "c-overbudget",
          participantId: "rosa",
          positionId: "pos-drop",
          targetConclusion: "The bridge project should be dropped.",
          role: "material",
          ifFalseEffect: "no-change",
          consequence:
            "Rosa says she would still oppose the project even if the audit numbers were revised down.",
          basis: "explicit",
          alternativeBasis: "The design is unsafe.",
          groundingQuotes: [
            {
              quote: "Even if the audit numbers are revised down, I still oppose it because the design is unsafe.",
              participantId: "rosa",
            },
          ],
        },
      ],
      caveats: ["The overrun figure and the safety claim are asserted, not verified."],
    },
  },
  {
    name: "stake-commitment-gap",
    contentType: "conversation",
    source:
      "Ada: The permit should be denied because the traffic study is flawed.\nBen: The permit should be granted; the study is solid and followed the standard methodology.\nAda: Everyone knows these studies underestimate trips in neighborhoods like this.",
    extraction: {
      mainQuestion: "Should the permit be denied?",
      participants: [
        { id: "ada", label: "Ada", kind: "named" },
        { id: "ben", label: "Ben", kind: "named" },
      ],
      positions: [
        {
          id: "pos-deny",
          label: "Deny the permit",
          participantIds: ["ada"],
          thesis: "The permit should be denied because the traffic study is flawed.",
          steelman:
            "A systematically flawed study cannot support a permitting decision that depends on it.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "The permit should be denied because the traffic study is flawed.", participantId: "ada" },
          ],
        },
        {
          id: "pos-grant",
          label: "Grant the permit",
          participantIds: ["ben"],
          thesis: "The permit should be granted because the study followed standard methodology.",
          steelman:
            "A methodologically standard study is adequate evidence for a permitting decision.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            {
              quote: "The permit should be granted; the study is solid and followed the standard methodology.",
              participantId: "ben",
            },
          ],
        },
      ],
      claims: [
        {
          id: "c-study-flawed",
          statement: "The traffic study is flawed and underestimates trips.",
          participantIds: ["ada"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-deny", relation: "supports" },
            { positionId: "pos-grant", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["ada"],
          disputedByParticipantIds: ["ben"],
          confidence: "medium",
          groundingQuotes: [
            { quote: "these studies underestimate trips in neighborhoods like this", participantId: "ada" },
          ],
        },
        {
          id: "c-study-solid",
          statement: "The traffic study followed the standard methodology.",
          participantIds: ["ben"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-grant", relation: "supports" },
            { positionId: "pos-deny", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["ben"],
          disputedByParticipantIds: ["ada"],
          confidence: "medium",
          groundingQuotes: [
            { quote: "the study is solid and followed the standard methodology", participantId: "ben" },
          ],
        },
      ],
      claimRelations: [],
      commonGroundCandidates: [],
      disagreementCandidates: [
        {
          id: "d-study",
          question: "Does the traffic study underestimate trips?",
          type: "empirical",
          summary: "Ada calls the study flawed; Ben says it followed standard methodology.",
          claimIds: ["c-study-flawed"],
          participantStances: [
            { participantId: "ada", positionId: "pos-deny", stance: "It underestimates trips." },
            { participantId: "ben", positionId: "pos-grant", stance: "It followed the standard methodology." },
          ],
          resolutionCondition: "A re-run of the study with neighborhood-level trip data.",
          confidence: "high",
          groundingQuotes: [],
        },
      ],
      claimStakeCandidates: [
        {
          id: "stake-study",
          claimId: "c-study-flawed",
          participantId: "ada",
          positionId: "pos-deny",
          targetConclusion: "The permit should be denied.",
          role: "hinge",
          ifFalseEffect: "not-stated",
          consequence:
            "The source presents the study as the reason for denial but never states what would change Ada's conclusion if the study were accepted.",
          basis: "unstated",
          groundingQuotes: [
            { quote: "The permit should be denied because the traffic study is flawed.", participantId: "ada" },
          ],
        },
      ],
      caveats: ["The study-quality dispute is asserted from both sides without evidence in the source."],
    },
  },
  {
    name: "stake-rebuttal-only",
    contentType: "conversation",
    source:
      "Iris: Remote work is draining downtown businesses.\nOwen: That is false. Downtown foot traffic fully recovered this spring.\nIris: The recovery is seasonal, not structural.",
    extraction: {
      mainQuestion: "Is remote work draining downtown businesses?",
      participants: [
        { id: "iris", label: "Iris", kind: "named" },
        { id: "owen", label: "Owen", kind: "named" },
      ],
      positions: [
        {
          id: "pos-draining",
          label: "Remote work drains downtown",
          participantIds: ["iris"],
          thesis: "Remote work is draining downtown businesses.",
          steelman:
            "If weekday foot traffic is structurally lower, downtown revenue depends on a workforce that no longer commutes.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "Remote work is draining downtown businesses.", participantId: "iris" },
          ],
        },
        {
          id: "pos-recovered",
          label: "Downtown has recovered",
          participantIds: ["owen"],
          thesis: "Downtown foot traffic has fully recovered, so the draining claim is false.",
          steelman:
            "A full recovery in foot traffic is direct evidence against any ongoing structural decline.",
          explicitness: "explicit",
          confidence: "high",
          groundingQuotes: [
            { quote: "Downtown foot traffic fully recovered this spring.", participantId: "owen" },
          ],
        },
      ],
      claims: [
        {
          id: "c-recovery",
          statement: "Downtown foot traffic fully recovered this spring.",
          participantIds: ["owen"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-recovered", relation: "supports" },
            { positionId: "pos-draining", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["owen"],
          disputedByParticipantIds: ["iris"],
          confidence: "medium",
          groundingQuotes: [
            { quote: "Downtown foot traffic fully recovered this spring.", participantId: "owen" },
          ],
        },
        {
          id: "c-seasonal",
          statement: "The foot-traffic recovery is seasonal, not structural.",
          participantIds: ["iris"],
          epistemicType: "empirical",
          explicitness: "explicit",
          stanceByPosition: [
            { positionId: "pos-draining", relation: "supports" },
            { positionId: "pos-recovered", relation: "opposes" },
          ],
          acceptedByParticipantIds: ["iris"],
          disputedByParticipantIds: ["owen"],
          confidence: "medium",
          groundingQuotes: [{ quote: "The recovery is seasonal, not structural.", participantId: "iris" }],
        },
      ],
      claimRelations: [],
      commonGroundCandidates: [],
      disagreementCandidates: [
        {
          id: "d-recovery",
          question: "Has downtown foot traffic structurally recovered?",
          type: "empirical",
          summary: "Owen cites a full recovery; Iris says it is seasonal.",
          claimIds: ["c-recovery"],
          participantStances: [
            { participantId: "owen", positionId: "pos-recovered", stance: "Fully recovered." },
            { participantId: "iris", positionId: "pos-draining", stance: "Seasonal, not structural." },
          ],
          resolutionCondition: "Year-over-year foot-traffic data across seasons.",
          confidence: "high",
          groundingQuotes: [],
        },
      ],
      claimStakeCandidates: [
        {
          id: "stake-recovery",
          claimId: "c-recovery",
          participantId: "owen",
          targetConclusion: "Remote work is not draining downtown businesses.",
          role: "rebuttal-only",
          ifFalseEffect: "reconsider",
          consequence:
            "Owen offers the recovery only to knock down Iris's premise; the source does not state what positive case would carry his own view if the recovery figure failed.",
          basis: "inferred",
          groundingQuotes: [
            { quote: "That is false.", participantId: "owen" },
          ],
        },
      ],
      caveats: ["Foot-traffic claims are asserted without data in the source."],
    },
  },
];
