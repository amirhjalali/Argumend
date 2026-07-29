/**
 * Method taxonomy for /concepts — groups the flat concept list into the three
 * stages of Argumend's method and gives every entry its own icon, so the index
 * and detail pages read as a sequenced method rather than six interchangeable
 * cards in one accent color.
 *
 * Mirrors `lib/fallacyMeta.ts`. Two deliberate differences: concepts are a
 * pipeline (frame → weigh → stress-test) rather than a catalog, so stages are
 * ordered by when they apply and there are no catalog numbers — six entries
 * don't need a specimen index.
 *
 * Palette discipline (see CLAUDE.md "Design System"): stage colors reuse the
 * on-brand tokens — rust, deep teal, crux crimson. Never amber/tangerine/
 * indigo/violet/sky.
 */
import type { LucideIcon } from "lucide-react";
import { BookOpen, Shield, Columns3, Scale, Gauge, Target, SearchX } from "lucide-react";
import type { Concept } from "@/data/concepts";

export type ConceptStageId = "framing" | "weighing" | "testing";

export interface ConceptStageMeta {
  readonly id: ConceptStageId;
  /** Roman numeral for the stage heading. */
  readonly numeral: string;
  readonly label: string;
  readonly description: string;
  /** Chip: bg + text + border, matching the categoryColors.ts pattern. */
  readonly chip: string;
  /** Icon badge background. */
  readonly iconBg: string;
  readonly iconText: string;
  /** Hover/accent border tint for cards in this stage. */
  readonly hoverBorder: string;
  /** Static left-border accent (e.g. for the "Key Points" panel). */
  readonly borderAccent: string;
}

export const conceptStages: Record<ConceptStageId, ConceptStageMeta> = {
  framing: {
    id: "framing",
    numeral: "I",
    label: "Framing the Disagreement",
    description:
      "How a debate gets represented before anything is judged — the strongest version of each side, split into the arguments that actually carry the weight.",
    chip: "bg-rust-50 dark:bg-rust-900/30 text-rust-700 dark:text-rust-300 border-rust-200/60 dark:border-rust-800/40",
    iconBg: "bg-rust-50 dark:bg-rust-900/30",
    iconText: "text-rust-600 dark:text-rust-300",
    hoverBorder: "hover:border-rust-300/60",
    borderAccent: "border-l-rust-400",
  },
  weighing: {
    id: "weighing",
    numeral: "II",
    label: "Weighing the Evidence",
    description:
      "How evidence becomes an auditable number — scoring each source on its own merits, then turning the balance into a confidence you can check.",
    chip: "bg-deep/10 dark:bg-deep/20 text-deep dark:text-deep-light border-deep/20 dark:border-deep/40",
    iconBg: "bg-deep/10 dark:bg-deep/20",
    iconText: "text-deep dark:text-deep-light",
    hoverBorder: "hover:border-deep/40",
    borderAccent: "border-l-deep/50",
  },
  testing: {
    id: "testing",
    numeral: "III",
    label: "Stress-Testing the Reasoning",
    description:
      "What would settle the question — and what should never have counted as evidence in the first place.",
    chip: "bg-crux/10 dark:bg-crux/20 text-crux dark:text-crux-light border-crux/25 dark:border-crux/40",
    iconBg: "bg-crux/10 dark:bg-crux/20",
    iconText: "text-crux dark:text-crux-light",
    hoverBorder: "hover:border-crux/40",
    borderAccent: "border-l-crux/50",
  },
};

/** Display order for the index — stages I through III, in method order. */
export const conceptStageOrder: readonly ConceptStageId[] = ["framing", "weighing", "testing"];

const stageById: Record<string, ConceptStageId> = {
  "steel-manning": "framing",
  pillars: "framing",

  "evidence-weighting": "weighing",
  "confidence-calibration": "weighing",

  cruxes: "testing",
  fallacies: "testing",
};

const iconById: Record<string, LucideIcon> = {
  "steel-manning": Shield,
  pillars: Columns3,

  "evidence-weighting": Scale,
  "confidence-calibration": Gauge,

  cruxes: Target,
  fallacies: SearchX,
};

/** Stage metadata for a concept, falling back to "framing" if unmapped. */
export function getConceptStage(id: string): ConceptStageMeta {
  return conceptStages[stageById[id] ?? "framing"];
}

/** Distinct icon for a concept, falling back to a generic book. */
export function getConceptIcon(id: string): LucideIcon {
  return iconById[id] ?? BookOpen;
}

/**
 * Groups a concept list by stage, preserving `conceptStageOrder`. Stages with
 * no matching entries are omitted (defensive — shouldn't happen with the full
 * list).
 */
export function groupConceptsByStage(
  list: readonly Concept[]
): { stage: ConceptStageMeta; items: Concept[] }[] {
  return conceptStageOrder
    .map((id) => ({
      stage: conceptStages[id],
      items: list.filter((c) => (stageById[c.id] ?? "framing") === id),
    }))
    .filter((group) => group.items.length > 0);
}
