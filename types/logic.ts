export type TopicStatus = 'settled' | 'contested' | 'highly_speculative';

export interface Crux {
  id: string;
  title: string; // e.g., "The Retroreflector Test"
  description: string; // The explanation of the test
  methodology: string; // Step-by-step verification method
  equation?: string; // LaTeX string if applicable
  verification_status: 'verified' | 'theoretical' | 'impossible';
  cost_to_verify: string; // e.g. "$0 (Data Analysis)" or "$50M (New Probe)"
}

export interface Pillar {
  id: string;
  title: string; // e.g., "The Physical Trace"
  short_summary: string;
  icon_name: string; // mapping to Lucide icon
  skeptic_premise: string; // Steel-manned argument against
  proponent_rebuttal: string; // The scientific defense
  crux: Crux; // The definitive way to solve this specific pillar
}

export interface Topic {
  id: string;
  title: string; // e.g., "The Moon Landing"
  meta_claim: string;
  confidence_score: number; // 0 to 100
  status: TopicStatus;
  pillars: Pillar[];
}
