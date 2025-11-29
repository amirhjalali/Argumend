export type TopicStatus = 'settled' | 'contested' | 'highly_speculative';

export type IconName = 'Target' | 'Zap' | 'HelpCircle' | 'Shield' | 'Atom' | 'Telescope' | 'Microscope';

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
}

export interface Topic {
  readonly id: string;
  readonly title: string; // e.g., "The Moon Landing"
  readonly meta_claim: string;
  readonly confidence_score: number; // 0 to 100
  readonly status: TopicStatus;
  readonly pillars: readonly Pillar[];
}
