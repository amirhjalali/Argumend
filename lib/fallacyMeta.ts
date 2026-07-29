/**
 * Field-guide taxonomy for /fallacies — groups the flat fallacy catalog into
 * four families and gives every entry its own icon, so the index and detail
 * pages read as a real specimen guide rather than 22 copies of one card.
 *
 * Palette discipline (see CLAUDE.md "Design System"): family colors reuse the
 * same four on-brand tokens as `lib/categoryColors.ts` — deep teal, rust,
 * skeptic brown, crux crimson. Never amber/tangerine/indigo/violet/sky.
 */
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  UserX,
  Shuffle,
  ArrowRightLeft,
  Fish,
  HeartCrack,
  Users,
  Award,
  Rabbit,
  Link2,
  Plane,
  Filter,
  FastForward,
  Leaf,
  GitFork,
  TrendingDown,
  Repeat,
  Landmark,
  Split,
  ShieldX,
  Goal,
  HelpCircle,
  Anchor,
} from "lucide-react";
import type { Fallacy } from "@/data/fallacies";

export type FallacyFamilyId = "diversion" | "evidence" | "structure" | "unfalsifiable";

export interface FallacyFamilyMeta {
  readonly id: FallacyFamilyId;
  /** Roman numeral for the field-guide chapter heading. */
  readonly numeral: string;
  readonly label: string;
  readonly description: string;
  /** Chip: bg + text + border, matching the categoryColors.ts pattern. */
  readonly chip: string;
  /** Icon badge background. */
  readonly iconBg: string;
  readonly iconText: string;
  /** Hover/accent border tint for cards in this family. */
  readonly hoverBorder: string;
  /** Static left-border accent (e.g. for the "Why It Misleads" panel). */
  readonly borderAccent: string;
}

export const fallacyFamilies: Record<FallacyFamilyId, FallacyFamilyMeta> = {
  diversion: {
    id: "diversion",
    numeral: "I",
    label: "Diversion",
    description:
      "Dodges the argument — attacking, distracting, or appealing to feeling instead of engaging the claim.",
    chip: "bg-rust-50 dark:bg-rust-900/30 text-rust-700 dark:text-rust-300 border-rust-200/60 dark:border-rust-800/40",
    iconBg: "bg-rust-50 dark:bg-rust-900/30",
    iconText: "text-rust-600 dark:text-rust-300",
    hoverBorder: "hover:border-rust-300/60",
    borderAccent: "border-l-rust-400",
  },
  evidence: {
    id: "evidence",
    numeral: "II",
    label: "Authority & Evidence",
    description:
      "Misuses sources, samples, or data — treating weak or selective evidence as if it settled the question.",
    chip: "bg-deep/10 dark:bg-deep/20 text-deep dark:text-deep-light border-deep/20 dark:border-deep/40",
    iconBg: "bg-deep/10 dark:bg-deep/20",
    iconText: "text-deep dark:text-deep-light",
    hoverBorder: "hover:border-deep/40",
    borderAccent: "border-l-deep/50",
  },
  structure: {
    id: "structure",
    numeral: "III",
    label: "False Structure",
    description:
      "Rigs the logical architecture itself — false choices, closed loops, and definitions that shift mid-argument.",
    chip: "bg-crux/10 dark:bg-crux/20 text-crux dark:text-crux-light border-crux/25 dark:border-crux/40",
    iconBg: "bg-crux/10 dark:bg-crux/20",
    iconText: "text-crux dark:text-crux-light",
    hoverBorder: "hover:border-crux/40",
    borderAccent: "border-l-crux/50",
  },
  unfalsifiable: {
    id: "unfalsifiable",
    numeral: "IV",
    label: "Moving Targets",
    description:
      "Dodges falsification — redefining terms or shifting the standard of proof whenever it's actually met.",
    chip: "bg-skeptic/10 dark:bg-skeptic/20 text-skeptic-dark dark:text-skeptic-light border-skeptic/25 dark:border-skeptic/40",
    iconBg: "bg-skeptic/10 dark:bg-skeptic/20",
    iconText: "text-skeptic-dark dark:text-skeptic-light",
    hoverBorder: "hover:border-skeptic/40",
    borderAccent: "border-l-skeptic/50",
  },
};

/** Display order for the field-guide index — chapters I through IV. */
export const fallacyFamilyOrder: readonly FallacyFamilyId[] = [
  "diversion",
  "evidence",
  "structure",
  "unfalsifiable",
];

const familyBySlug: Record<string, FallacyFamilyId> = {
  "ad-hominem": "diversion",
  "straw-man": "diversion",
  whataboutism: "diversion",
  "red-herring": "diversion",
  "appeal-to-emotion": "diversion",
  bandwagon: "diversion",

  "appeal-to-authority": "evidence",
  "hasty-generalization": "evidence",
  "false-cause": "evidence",
  "survivorship-bias": "evidence",
  "cherry-picking": "evidence",
  "gish-gallop": "evidence",
  "appeal-to-nature": "evidence",

  "false-dilemma": "structure",
  "slippery-slope": "structure",
  "circular-reasoning": "structure",
  "motte-and-bailey": "structure",
  equivocation: "structure",

  "no-true-scotsman": "unfalsifiable",
  "moving-the-goalposts": "unfalsifiable",
  "appeal-to-ignorance": "unfalsifiable",
  "sunk-cost": "unfalsifiable",
};

const iconBySlug: Record<string, LucideIcon> = {
  "ad-hominem": UserX,
  "straw-man": Shuffle,
  whataboutism: ArrowRightLeft,
  "red-herring": Fish,
  "appeal-to-emotion": HeartCrack,
  bandwagon: Users,

  "appeal-to-authority": Award,
  "hasty-generalization": Rabbit,
  "false-cause": Link2,
  "survivorship-bias": Plane,
  "cherry-picking": Filter,
  "gish-gallop": FastForward,
  "appeal-to-nature": Leaf,

  "false-dilemma": GitFork,
  "slippery-slope": TrendingDown,
  "circular-reasoning": Repeat,
  "motte-and-bailey": Landmark,
  equivocation: Split,

  "no-true-scotsman": ShieldX,
  "moving-the-goalposts": Goal,
  "appeal-to-ignorance": HelpCircle,
  "sunk-cost": Anchor,
};

/** Family metadata for a fallacy, falling back to "diversion" if unmapped. */
export function getFallacyFamily(slug: string): FallacyFamilyMeta {
  return fallacyFamilies[familyBySlug[slug] ?? "diversion"];
}

/** Distinct icon for a fallacy, falling back to a generic warning triangle. */
export function getFallacyIcon(slug: string): LucideIcon {
  return iconBySlug[slug] ?? AlertTriangle;
}

/**
 * Groups a fallacy list by family, preserving `fallacyFamilyOrder`. Families
 * with no matching entries are omitted (defensive — shouldn't happen with the
 * full catalog).
 */
export function groupFallaciesByFamily(
  list: readonly Fallacy[]
): { family: FallacyFamilyMeta; items: Fallacy[] }[] {
  return fallacyFamilyOrder
    .map((id) => ({
      family: fallacyFamilies[id],
      items: list.filter((f) => (familyBySlug[f.slug] ?? "diversion") === id),
    }))
    .filter((group) => group.items.length > 0);
}
