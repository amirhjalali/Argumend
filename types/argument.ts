export interface NodeBase {
  id: string;                  // stable slug, unique per topic
  type: "question" | "position" | "claim" | "inference" | "evidence";
  statement: string;           // self-contained; for EVIDENCE this is `finding`
  summary?: string;            // ≤140 chars, Layers 1–2
  tags?: string[];             // content taxonomy ("clerical-work", "care-work", "economics", …)
  provenance: {                // v1.1 — who put this node here
    origin: "source" | "extracted" | "curator";
    modelId?: string;          // when origin = extracted
    sourceRef?: string;        // where in the source material
  };
  createdAt: string;
  updatedAt?: string;
  modelVersion: 2;             // v1.1 schema (v1 was never shipped)
}

export type EpistemicType =
  | "empirical"
  | "predictive"
  | "normative"
  | "definitional"
  | "procedural";

export type ClaimStatus =
  | "uncontested"
  | "broadly_accepted"
  | "contested"
  | "unresolved"
  | "superseded";

export type ResolutionKind =
  | "existing-evidence"
  | "future-observable"
  | "definitional-choice"
  | "value-difference"
  | "authority-allocation";

export interface Claim extends NodeBase {
  type: "claim";
  epistemicType: EpistemicType;
  status: ClaimStatus;
  statusBasis: string;
  implicit?: boolean;
  attributedTo?: string[];     // v1.1 — named holders ("Acemoglu", "UCS") when the map records who argues this
  resolution?: { kind: ResolutionKind;
                 condition: string };
  confidence?: { value: number; basis: string };   // both or neither
  cruxOverride?: "pin" | "suppress";
  overrideBasis?: string;      // v1.1 — required iff cruxOverride set (no longer overloads statusBasis)
}

export interface Position extends NodeBase {
  type: "position";
  label: string;
  constituency: string;
  steelmanBasis: string;       // v1.1 — why this is the strongest credible rendering
  displayRank: number;         // v1.1 — explicit Layer-1 ordering
}

export type WarrantKind =
  | "statistical-generalization"
  | "causal-identification"
  | "analogy"
  | "aggregation-model"
  | "is-to-ought"
  | "normative-principle-application"
  | "authority";

export interface Inference extends NodeBase {
  type: "inference";
  warrant: string;
  warrantImplicit: boolean;
  warrantKind: WarrantKind;
}

export type SourceKind =
  | "peer-reviewed"
  | "government"
  | "institutional"
  | "industry"
  | "advocacy"
  | "journalism"
  | "primary-document"
  | "other";

export type VerificationState =
  | "verified-live"
  | "verified-content"
  | "bot-blocked-assumed-live"
  | "unverified";

export interface Source {
  title: string;
  url?: string;
  author?: string;
  institution?: string;
  publishedAt?: string;
  kind: SourceKind;
  interest?: string;           // the disclosure line; absence = none identified
  verification: VerificationState;
  verifiedAt?: string;         // v1.1 — when verification state was established
}

export interface Evidence extends NodeBase {
  type: "evidence";
  finding: string;             // = statement
  source: Source;
  relevance: string;           // REQUIRED — why this bears on what it evidences
  status?: "current" | "superseded";   // v1.1
  weight?: { sourceReliability: number; independence: number; replicability: number;
             directness: number; weightBasis: string };
  unverifiedFlags?: string[];  // research-layer honesty markers; survive into the UI
}

export interface Question extends NodeBase {
  type: "question";
}

export type ArgumentNode = Question | Position | Claim | Inference | Evidence;

export type EdgeType =
  | "supports"
  | "opposes"
  | "premise_of"
  | "concludes"
  | "undercuts"
  | "evidences"
  | "limits_scope"
  | "qualifies"
  | "depends_on"
  | "contradicts"
  | "supersedes";

export type EvidencePolarity = "supporting" | "challenging" | "qualifying";

export interface ArgumentEdge {
  id: string;
  from: string;
  to: string;
  type: EdgeType;
  polarity?: EvidencePolarity;
  note?: string;
}

export interface ArgumentGraph {
  topicId: string;
  modelVersion: 2;
  // `nodes` is canonical. `question` mirrors the single QUESTION node for
  // callers that need quick access without scanning the graph.
  question: Question;
  nodes: ArgumentNode[];
  edges: ArgumentEdge[];
}
