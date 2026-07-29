/**
 * Curriculum taxonomy for /guides — groups the flat guide catalog into four
 * tracks and gives every guide its own icon, so the index and detail pages read
 * as a structured course rather than 15 interchangeable cards.
 *
 * This is the /fallacies field-guide pattern (see `lib/fallacyMeta.ts`) applied
 * to guides. Presentation lives here, not in `data/guides.ts`: the data module
 * stays pure prose + metadata, which is why `Guide` no longer carries `icon` or
 * `color`.
 *
 * Palette discipline (see CLAUDE.md "Design System"): track colors reuse the
 * same four on-brand tokens as `lib/categoryColors.ts` and `lib/fallacyMeta.ts`
 * — deep teal, rust, crux crimson, skeptic brown. The previous per-guide hex
 * colors included off-brand indigo (#5b6abf), amber (#b37d1e) and slate
 * (#4a6b8a); those are deliberately gone. Never amber/tangerine/indigo/violet/sky.
 */
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Map,
  Play,
  Target,
  Swords,
  ClipboardCheck,
  Layers,
  Triangle,
  ShieldCheck,
  Scale,
  Percent,
  Gauge,
  Waypoints,
  Brain,
  Binoculars,
  CloudFog,
} from "lucide-react";
import type { Guide } from "@/data/guides";

export type GuideTrackId = "reading" | "evidence" | "uncertainty" | "distortion";

export interface GuideTrackMeta {
  readonly id: GuideTrackId;
  /** Roman numeral for the curriculum chapter heading. */
  readonly numeral: string;
  readonly label: string;
  readonly description: string;
  /** Chip: bg + text + border, matching the categoryColors.ts pattern. */
  readonly chip: string;
  /** Icon badge background. */
  readonly iconBg: string;
  readonly iconText: string;
  /** Hover/accent border tint for cards in this track. */
  readonly hoverBorder: string;
  /** Static left-border accent (e.g. for the key-takeaways panel). */
  readonly borderAccent: string;
  /** Bullet/dot fill for list markers inside a track-colored panel. */
  readonly dotBg: string;
}

export const guideTracks: Record<GuideTrackId, GuideTrackMeta> = {
  reading: {
    id: "reading",
    numeral: "I",
    label: "Reading Arguments",
    description:
      "Start here — how to navigate an argument map, find the claim that actually decides the disagreement, and state the other side at its strongest.",
    chip: "bg-deep/10 dark:bg-deep/20 text-deep dark:text-deep-light border-deep/20 dark:border-deep/40",
    iconBg: "bg-deep/10 dark:bg-deep/20",
    iconText: "text-deep dark:text-deep-light",
    hoverBorder: "hover:border-deep/40",
    borderAccent: "border-l-deep/50",
    dotBg: "bg-deep",
  },
  evidence: {
    id: "evidence",
    numeral: "II",
    label: "Judging Evidence",
    description:
      "How to rank kinds of proof, cross-check independent sources, size up who is talking, and decide what to do when good studies disagree.",
    chip: "bg-rust-50 dark:bg-rust-900/30 text-rust-700 dark:text-rust-300 border-rust-200/60 dark:border-rust-800/40",
    iconBg: "bg-rust-50 dark:bg-rust-900/30",
    iconText: "text-rust-600 dark:text-rust-300",
    hoverBorder: "hover:border-rust-300/60",
    borderAccent: "border-l-rust-400",
    dotBg: "bg-rust-500",
  },
  uncertainty: {
    id: "uncertainty",
    numeral: "III",
    label: "Reasoning Under Uncertainty",
    description:
      "Working with degrees of belief instead of verdicts — updating on new evidence, reading probabilities honestly, and separating correlation from cause.",
    chip: "bg-crux/10 dark:bg-crux/20 text-crux dark:text-crux-light border-crux/25 dark:border-crux/40",
    iconBg: "bg-crux/10 dark:bg-crux/20",
    iconText: "text-crux dark:text-crux-light",
    hoverBorder: "hover:border-crux/40",
    borderAccent: "border-l-crux/50",
    dotBg: "bg-crux",
  },
  distortion: {
    id: "distortion",
    numeral: "IV",
    label: "Resisting Distortion",
    description:
      "The adversarial layer — the biases you bring yourself, and the doubt other people manufacture on purpose.",
    chip: "bg-skeptic/10 dark:bg-skeptic/20 text-skeptic-dark dark:text-skeptic-light border-skeptic/25 dark:border-skeptic/40",
    iconBg: "bg-skeptic/10 dark:bg-skeptic/20",
    iconText: "text-skeptic-dark dark:text-skeptic-light",
    hoverBorder: "hover:border-skeptic/40",
    borderAccent: "border-l-skeptic/50",
    dotBg: "bg-skeptic",
  },
};

/** Display order for the curriculum index — chapters I through IV. */
export const guideTrackOrder: readonly GuideTrackId[] = [
  "reading",
  "evidence",
  "uncertainty",
  "distortion",
];

const trackById: Record<string, GuideTrackId> = {
  "how-to-read-an-argument-map": "reading",
  "running-your-first-analysis": "reading",
  "crux-test": "reading",
  "steelmanning-practice": "reading",
  "argument-audit": "reading",

  "evidence-hierarchy": "evidence",
  triangulation: "evidence",
  "evaluating-source-credibility": "evidence",
  "weighing-conflicting-evidence": "evidence",

  "bayesian-thinking": "uncertainty",
  "reading-confidence-like-a-forecaster": "uncertainty",
  "correlation-and-causation": "uncertainty",

  "understanding-bias": "distortion",
  "cognitive-bias-field-guide": "distortion",
  "spotting-manufactured-doubt": "distortion",
};

const iconById: Record<string, LucideIcon> = {
  "how-to-read-an-argument-map": Map,
  "running-your-first-analysis": Play,
  "crux-test": Target,
  "steelmanning-practice": Swords,
  "argument-audit": ClipboardCheck,

  "evidence-hierarchy": Layers,
  triangulation: Triangle,
  "evaluating-source-credibility": ShieldCheck,
  "weighing-conflicting-evidence": Scale,

  "bayesian-thinking": Percent,
  "reading-confidence-like-a-forecaster": Gauge,
  "correlation-and-causation": Waypoints,

  "understanding-bias": Brain,
  "cognitive-bias-field-guide": Binoculars,
  "spotting-manufactured-doubt": CloudFog,
};

/** Track metadata for a guide, falling back to "reading" if unmapped. */
export function getGuideTrack(id: string): GuideTrackMeta {
  return guideTracks[trackById[id] ?? "reading"];
}

/** Distinct icon for a guide, falling back to a generic book. */
export function getGuideIcon(id: string): LucideIcon {
  return iconById[id] ?? BookOpen;
}

/**
 * Groups a guide list by track, preserving `guideTrackOrder`. Tracks with no
 * matching entries are omitted (defensive — shouldn't happen with the full
 * catalog).
 */
export function groupGuidesByTrack(
  list: readonly Guide[]
): { track: GuideTrackMeta; items: Guide[] }[] {
  return guideTrackOrder
    .map((id) => ({
      track: guideTracks[id],
      items: list.filter((g) => (trackById[g.id] ?? "reading") === id),
    }))
    .filter((group) => group.items.length > 0);
}

/**
 * Total reading time across a guide list, in minutes, parsed from the free-text
 * `readTime` ("12 min read"). Entries without a leading number contribute 0 —
 * better an undercount than a hardcoded figure that silently rots as guides are
 * added, which is exactly what happened to the old "Approx. 75 min" line.
 */
export function totalReadingMinutes(list: readonly Guide[]): number {
  return list.reduce((sum, guide) => {
    const minutes = parseInt(guide.readTime, 10);
    return sum + (Number.isNaN(minutes) ? 0 : minutes);
  }, 0);
}
