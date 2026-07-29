/**
 * Field-guide taxonomy for /glossary — mirrors `lib/fallacyMeta.ts`. Gives the
 * four existing glossary categories a chapter identity (numeral, color, blurb)
 * and every term its own icon, so the page reads as a reference work rather
 * than 38 indistinguishable paragraphs.
 *
 * Palette discipline (see CLAUDE.md "Design System"): chapter colors reuse the
 * same four on-brand tokens as `lib/fallacyMeta.ts` — deep teal, rust, crux
 * crimson, skeptic brown. Never amber/tangerine/indigo/violet/sky.
 *
 * Where a glossary term names the same concept as a fallacy, it deliberately
 * reuses that fallacy's icon (Red Herring → Fish, Ad Hominem → UserX, …) so the
 * two field guides stay visually consistent.
 */
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  AlertTriangle,
  Award,
  BadgeCheck,
  BookOpen,
  Columns3,
  Eye,
  FastForward,
  Feather,
  Filter,
  Fish,
  Flag,
  FlaskConical,
  Gauge,
  Gavel,
  GitFork,
  GitMerge,
  Glasses,
  HeartHandshake,
  Key,
  Landmark,
  Lightbulb,
  MessageSquareReply,
  Mountain,
  Network,
  Percent,
  PieChart,
  Plane,
  Scale,
  Scissors,
  Shield,
  ShieldQuestion,
  Shuffle,
  SlidersHorizontal,
  Split,
  Spline,
  TrendingDown,
  UserX,
  Weight,
} from "lucide-react";
import type { GlossaryCategory, GlossaryPageTerm } from "@/data/glossaryPageTerms";

export interface GlossaryChapterMeta {
  readonly id: GlossaryCategory;
  /** Roman numeral for the chapter heading. */
  readonly numeral: string;
  readonly label: string;
  readonly description: string;
  /** Chip: bg + text + border, matching the fallacyMeta.ts pattern. */
  readonly chip: string;
  /** Icon badge background. */
  readonly iconBg: string;
  readonly iconText: string;
  /** Hover/accent border tint for entries in this chapter. */
  readonly hoverBorder: string;
  /** Static left-border accent for entry cards. */
  readonly borderAccent: string;
}

export const glossaryChapters: Record<GlossaryCategory, GlossaryChapterMeta> = {
  core: {
    id: "core",
    numeral: "I",
    label: "Core Concepts",
    description:
      "The building blocks of an Argumend map — the claim under test and the structure built around it.",
    chip: "bg-deep/10 dark:bg-deep/20 text-deep dark:text-deep-light border-deep/20 dark:border-deep/40",
    iconBg: "bg-deep/10 dark:bg-deep/20",
    iconText: "text-deep dark:text-deep-light",
    hoverBorder: "hover:border-deep/40",
    borderAccent: "border-l-deep/50",
  },
  reasoning: {
    id: "reasoning",
    numeral: "II",
    label: "Reasoning & Thinking",
    description:
      "How evidence is supposed to move belief — the habits that keep confidence tied to what the evidence actually shows.",
    chip: "bg-rust-50 dark:bg-rust-900/30 text-rust-700 dark:text-rust-300 border-rust-200/60 dark:border-rust-800/40",
    iconBg: "bg-rust-50 dark:bg-rust-900/30",
    iconText: "text-rust-600 dark:text-rust-300",
    hoverBorder: "hover:border-rust-300/60",
    borderAccent: "border-l-rust-400",
  },
  fallacies: {
    id: "fallacies",
    numeral: "III",
    label: "Logical Fallacies & Biases",
    description:
      "The recurring ways reasoning goes wrong — errors of logic and the cognitive shortcuts that make them feel right.",
    chip: "bg-crux/10 dark:bg-crux/20 text-crux dark:text-crux-light border-crux/25 dark:border-crux/40",
    iconBg: "bg-crux/10 dark:bg-crux/20",
    iconText: "text-crux dark:text-crux-light",
    hoverBorder: "hover:border-crux/40",
    borderAccent: "border-l-crux/50",
  },
  methodology: {
    id: "methodology",
    numeral: "IV",
    label: "Argumend Methodology",
    description:
      "How Argumend turns a pile of sources into a number you can argue with.",
    chip: "bg-skeptic/10 dark:bg-skeptic/20 text-skeptic-dark dark:text-skeptic-light border-skeptic/25 dark:border-skeptic/40",
    iconBg: "bg-skeptic/10 dark:bg-skeptic/20",
    iconText: "text-skeptic-dark dark:text-skeptic-light",
    hoverBorder: "hover:border-skeptic/40",
    borderAccent: "border-l-skeptic/50",
  },
};

/** Display order for the chapters — I through IV. */
export const glossaryChapterOrder: readonly GlossaryCategory[] = [
  "core",
  "reasoning",
  "fallacies",
  "methodology",
];

/** One distinct icon per glossary term, keyed by canonical term name. */
const iconByTerm: Record<string, LucideIcon> = {
  // I. Core Concepts
  "Argument Mapping": Network,
  "Steel-Manning": Shield,
  Crux: Key,
  "Confidence Score": Gauge,
  "Meta-Claim": Flag,
  Pillar: Columns3,
  "Skeptic Premise": ShieldQuestion,
  "Proponent Rebuttal": MessageSquareReply,
  "Verification Status": BadgeCheck,

  // II. Reasoning & Thinking
  "Bayesian Reasoning": Percent,
  Falsifiability: FlaskConical,
  "Double Crux": GitMerge,
  "Burden of Proof": Scale,
  "Motivated Reasoning": Gavel,
  "Occam's Razor": Scissors,
  "Inference to the Best Explanation": Lightbulb,
  Calibration: SlidersHorizontal,
  "Correlation vs. Causation": Spline,
  "Principle of Charity": HeartHandshake,
  "Epistemic Humility": Feather,

  // III. Logical Fallacies & Biases
  "Confirmation Bias": Glasses,
  "Dunning-Kruger Effect": Mountain,
  "Base Rate Neglect": PieChart,
  "Logical Fallacy": AlertTriangle,
  "Ad Hominem": UserX,
  "Straw Man": Shuffle,
  "False Dichotomy": GitFork,
  "Appeal to Authority": Award,
  Anchoring: Anchor,
  "Availability Heuristic": Eye,
  "Gish Gallop": FastForward,
  "Cherry-Picking": Filter,
  "Survivorship Bias": Plane,
  "Motte-and-Bailey": Landmark,
  "Red Herring": Fish,
  "Slippery Slope": TrendingDown,
  Equivocation: Split,

  // IV. Argumend Methodology
  "Evidence Weighting": Weight,
};

/** Chapter metadata for a category. */
export function getGlossaryChapter(category: GlossaryCategory): GlossaryChapterMeta {
  return glossaryChapters[category];
}

/**
 * Distinct icon for a term. The fallback is deliberately an icon no term uses,
 * so an unmapped term is visibly (and testably) distinguishable.
 */
export function getGlossaryTermIcon(term: string): LucideIcon {
  return iconByTerm[term] ?? BookOpen;
}

/** The fallback icon, exported so tests can assert nothing silently hits it. */
export const GLOSSARY_FALLBACK_ICON: LucideIcon = BookOpen;

/**
 * Groups terms into chapters, preserving `glossaryChapterOrder`. Terms are
 * sorted alphabetically within each chapter so the page reads like a reference
 * work. Empty chapters are omitted.
 */
export function groupTermsByChapter(
  list: readonly GlossaryPageTerm[]
): { chapter: GlossaryChapterMeta; items: GlossaryPageTerm[] }[] {
  return glossaryChapterOrder
    .map((id) => ({
      chapter: glossaryChapters[id],
      items: list
        .filter((t) => t.category === id)
        .sort((a, b) => a.term.localeCompare(b.term)),
    }))
    .filter((group) => group.items.length > 0);
}
