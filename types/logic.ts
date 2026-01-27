export type TopicStatus = 'settled' | 'contested' | 'highly_speculative';

export type IconName = 'Target' | 'Zap' | 'HelpCircle' | 'Shield' | 'Atom' | 'Telescope' | 'Microscope' | 'Scale' | 'Gavel' | 'FileText' | 'Users' | 'AlertTriangle';

export type ArgumentView = 'logic-map' | 'scales';

export interface EvidenceWeight {
  readonly sourceReliability: number; // 0-10: Track record, peer review, expertise
  readonly independence: number; // 0-10: Free from conflicts, corroborated
  readonly replicability: number; // 0-10: Can others verify? Reproduced?
  readonly directness: number; // 0-10: How directly addresses claim?
}

export interface Evidence {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly side: 'for' | 'against';
  readonly weight: EvidenceWeight;
  readonly source?: string;
  readonly sourceUrl?: string;
  readonly reasoning?: string; // Why these weights were assigned
}

export interface Crux {
  readonly id: string;
  readonly title: string; // e.g., "The Retroreflector Test"
  readonly description: string; // The explanation of the test
  readonly methodology: string; // Step-by-step verification method
  readonly equation?: string; // LaTeX string if applicable
  readonly verification_status: 'verified' | 'theoretical' | 'impossible';
  readonly cost_to_verify: string; // e.g. "$0 (Data Analysis)" or "$50M (New Probe)"
}

export interface Pillar {
  readonly id: string;
  readonly title: string; // e.g., "The Physical Trace"
  readonly short_summary: string;
  readonly image_url?: string;
  readonly icon_name: IconName; // mapping to Lucide icon
  readonly skeptic_premise: string; // Steel-manned argument against
  readonly proponent_rebuttal: string; // The scientific defense
  readonly crux: Crux; // The definitive way to solve this specific pillar
  readonly evidence?: readonly Evidence[]; // Evidence for scales view
}

export interface Topic {
  readonly id: string;
  readonly title: string; // e.g., "The Moon Landing"
  readonly meta_claim: string;
  readonly confidence_score: number; // 0 to 100
  readonly status: TopicStatus;
  readonly pillars: readonly Pillar[];
  readonly evidence?: readonly Evidence[]; // Topic-level evidence for scales view
}

// Utility functions for evidence calculations
export function calculateEvidenceScore(weight: EvidenceWeight): number {
  return weight.sourceReliability + weight.independence + weight.replicability + weight.directness;
}

export function getVerdictLabel(confidenceScore: number): string {
  if (confidenceScore >= 95) return 'Established beyond reasonable doubt';
  if (confidenceScore >= 75) return 'Preponderance of evidence supports';
  if (confidenceScore >= 50) return 'Evidence leans toward, but contested';
  return 'Insufficient evidence';
}
