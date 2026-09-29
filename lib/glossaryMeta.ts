/**
 * Field-guide taxonomy for /glossary — mirrors `lib/fallacyMeta.ts`. Gives the
 * four existing glossary categories a chapter identity (numeral, color, blurb)
 * and every term its own icon, so the page reads as a reference work rather
 * than 38 indistinguishable paragraphs.
 *
 * Palette discipline (see CLAUDE.md "Design System"): chapter colors reuse the
 * same four on-brand tokens as `lib/fallacyMeta.ts` — deep teal, rust, plum
 * skeptic brown, via `toneStyles` (crimson means a crux, never a chapter). Never amber/tangerine/indigo/violet/sky.
 *
 * Where a glossary term names the same concept as a fallacy, it deliberately
 * reuses that fallacy's icon (Red Herring → Fish, Ad Hominem → UserX, …) so the
 * two field guides stay visually consistent.
 */
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  AlertTriangle,
  ArrowDownUp,
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  CheckCheck,
  Columns3,
  Diff,
  EqualNot,
  Eye,
  EyeOff,
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
  Quote,
  Repeat2,
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
import { toneStyles } from "@/lib/categoryColors";

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
    chip: toneStyles.teal.chip,
    iconBg: toneStyles.teal.iconBg,
    iconText: toneStyles.teal.iconText,
    hoverBorder: toneStyles.teal.hoverBorder,
    borderAccent: toneStyles.teal.borderAccent,
  },
  reasoning: {
    id: "reasoning",
    numeral: "II",
    label: "Reasoning & Thinking",
    description:
      "How evidence is supposed to move belief — the habits that keep confidence tied to what the evidence actually shows.",
    chip: toneStyles.rust.chip,
    iconBg: toneStyles.rust.iconBg,
    iconText: toneStyles.rust.iconText,
    hoverBorder: toneStyles.rust.hoverBorder,
    borderAccent: toneStyles.rust.borderAccent,
  },
  fallacies: {
    id: "fallacies",
    numeral: "III",
    label: "Logical Fallacies & Biases",
    description:
      "The recurring ways reasoning goes wrong — errors of logic and the cognitive shortcuts that make them feel right.",
    chip: toneStyles.plum.chip,
    iconBg: toneStyles.plum.iconBg,
    iconText: toneStyles.plum.iconText,
    hoverBorder: toneStyles.plum.hoverBorder,
    borderAccent: toneStyles.plum.borderAccent,
  },
  methodology: {
    id: "methodology",
    numeral: "IV",
    label: "Argumend Methodology",
    description:
      "How a map weighs its sources and describes the state of the evidence.",
    chip: toneStyles.brown.chip,
    iconBg: toneStyles.brown.iconBg,
    iconText: toneStyles.brown.iconText,
    hoverBorder: toneStyles.brown.hoverBorder,
    borderAccent: toneStyles.brown.borderAccent,
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
  "Balance and Weight": Gauge,
  "Meta-Claim": Flag,
  Pillar: Columns3,
  "Skeptic Premise": ShieldQuestion,
  "Proponent Rebuttal": MessageSquareReply,
  "Verification Status": BadgeCheck,
  "Facts and Values": Diff,

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
  "Validity and Soundness": CheckCheck,
  "Deductive and Inductive Reasoning": ArrowDownUp,
  "Anecdotal Evidence": Quote,
  Denialism: EyeOff,

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
  "Cognitive Bias": Brain,
  "False Equivalence": EqualNot,
  "Fallacy Fallacy": Repeat2,

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
