export type NodeVariant =
  | "meta"
  | "pillar"
  | "skeptic"
  | "proponent"
  | "crux"
  | "evidence"
  | "question"; // Added for logic map questions

export type ChildSlot = "left" | "center" | "right";

export interface CruxDetail {
  description: string;
  methodology: string;
  equation?: string;
  status: string;
  cost: string;
}

export interface ConceptData {
  targetId: string;
  title: string;
  description: string;
  image?: string;
}

export interface Reference {
  title: string;
  url?: string;
  source?: string;
}

export interface EvidenceData {
  side: "for" | "against";
  score: number; // Total weight score (0-40)
  source?: string;
  sourceUrl?: string;
}

export interface LogicNodeData {
  variant: NodeVariant;
  title: string;
  content?: string;
  subtitle?: string;
  score?: number;
  detail?: CruxDetail;
  concepts?: Record<string, ConceptData>;
  imageUrl?: string; // Added for screenshot look
  references?: Reference[]; // Added for screenshot look
  hasChildren?: boolean; // Added for leaf node logic
  hasEvidence?: boolean; // For pillars with evidence
  evidenceData?: EvidenceData; // For evidence nodes
  [key: string]: unknown;
}

export interface BlueprintChildLink {
  id: string;
  slot: ChildSlot;
}

export interface BlueprintNode extends LogicNodeData {
  id: string;
  children?: BlueprintChildLink[];
  hasEvidence?: boolean;
}
