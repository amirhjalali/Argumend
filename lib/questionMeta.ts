/**
 * Visual + semantic metadata for /questions.
 *
 * The question catalog is programmatic (~250 entries across ~90 topics), so a
 * hand-mapped per-item taxonomy like `lib/fallacyMeta.ts` doesn't scale here.
 * Instead differentiation comes from two cheap, derivable axes:
 *
 *   1. **Category** carries the *color* — reusing the canonical chips in
 *      `lib/categoryColors.ts` so a policy question is the same deep teal here
 *      as it is on /topics and in search.
 *   2. **Question kind** carries the *shape* — an icon derived from the
 *      question's grammatical form (empirical / normative / predictive /
 *      explanatory). Kinds are deliberately colorless: if both axes carried
 *      color the page would read as a rainbow.
 *
 * Palette discipline (see CLAUDE.md "Design System"): stone/parchment, deep
 * teal (#3a6965), rust (#C4613C), brown (#8B5A3C), crux crimson (#a23b3b).
 * Never amber/tangerine/indigo/violet/sky.
 */
import type { LucideIcon } from "lucide-react";
import {
  Landmark,
  Cpu,
  Microscope,
  LineChart,
  BrainCircuit,
  FlaskConical,
  Scale,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import type { TopicCategory } from "@/lib/schemas/topic";
import { categoryColors, categoryTopBorder } from "@/lib/categoryColors";

// ---------------------------------------------------------------------------
// Axis 1 — category (color)
// ---------------------------------------------------------------------------

export interface QuestionCategoryMeta {
  readonly id: TopicCategory;
  /** Distinct icon for the category, used in the jump-nav and section headers. */
  readonly icon: LucideIcon;
  /** Chip: bg + text + border color, straight from `categoryColors`. */
  readonly chip: string;
  /** Icon badge background. */
  readonly iconBg: string;
  readonly iconText: string;
  /** Accent text color for topic sub-headings inside the section. */
  readonly accentText: string;
  /** Section rule under the chapter heading. */
  readonly ruleBorder: string;
  /** Top-accent border, kept in lockstep with `categoryTopBorder`. */
  readonly topBorder: string;
}

export const questionCategories: Record<TopicCategory, QuestionCategoryMeta> = {
  policy: {
    id: "policy",
    icon: Landmark,
    chip: categoryColors.policy,
    iconBg: "bg-deep/10 dark:bg-deep/20",
    iconText: "text-deep dark:text-deep-light",
    accentText: "text-deep dark:text-deep-light",
    ruleBorder: "border-deep/25",
    topBorder: categoryTopBorder.policy,
  },
  technology: {
    id: "technology",
    icon: Cpu,
    chip: categoryColors.technology,
    iconBg: "bg-stone-100 dark:bg-stone-800/40",
    iconText: "text-stone-600 dark:text-stone-300",
    accentText: "text-stone-600 dark:text-stone-300",
    ruleBorder: "border-stone-300/70",
    topBorder: categoryTopBorder.technology,
  },
  science: {
    id: "science",
    icon: Microscope,
    chip: categoryColors.science,
    iconBg: "bg-skeptic/10 dark:bg-skeptic/20",
    iconText: "text-skeptic-dark dark:text-skeptic-light",
    accentText: "text-skeptic-dark dark:text-skeptic-light",
    ruleBorder: "border-skeptic/25",
    topBorder: categoryTopBorder.science,
  },
  economics: {
    id: "economics",
    icon: LineChart,
    chip: categoryColors.economics,
    iconBg: "bg-rust-50 dark:bg-rust-900/30",
    iconText: "text-rust-600 dark:text-rust-300",
    accentText: "text-rust-700 dark:text-rust-300",
    ruleBorder: "border-rust-200",
    topBorder: categoryTopBorder.economics,
  },
  philosophy: {
    id: "philosophy",
    icon: BrainCircuit,
    chip: categoryColors.philosophy,
    iconBg: "bg-crux/10 dark:bg-crux/20",
    iconText: "text-crux dark:text-crux-light",
    accentText: "text-crux dark:text-crux-light",
    ruleBorder: "border-crux/25",
    topBorder: categoryTopBorder.philosophy,
  },
};

/** Category metadata, falling back to policy for an unknown category string. */
export function getQuestionCategoryMeta(
  category: string
): QuestionCategoryMeta {
  return (
    questionCategories[category as TopicCategory] ?? questionCategories.policy
  );
}

// ---------------------------------------------------------------------------
// Axis 2 — question kind (shape)
// ---------------------------------------------------------------------------

export type QuestionKindId =
  | "empirical"
  | "normative"
  | "predictive"
  | "explanatory";

export interface QuestionKindMeta {
  readonly id: QuestionKindId;
  readonly label: string;
  /** One line explaining what kind of answer this question can even have. */
  readonly description: string;
  readonly icon: LucideIcon;
}

export const questionKinds: Record<QuestionKindId, QuestionKindMeta> = {
  empirical: {
    id: "empirical",
    label: "Empirical",
    description:
      "Asks what is true. Evidence can in principle settle it — the fight is over which evidence counts.",
    icon: FlaskConical,
  },
  normative: {
    id: "normative",
    label: "Normative",
    description:
      "Asks what we should do. Evidence constrains the answer but never fully decides it — values do the rest.",
    icon: Scale,
  },
  predictive: {
    id: "predictive",
    label: "Predictive",
    description:
      "Asks what will happen. No evidence closes it yet; the disagreement is about how the future resolves.",
    icon: TrendingUp,
  },
  explanatory: {
    id: "explanatory",
    label: "Explanatory",
    description:
      "Asks why or how something happens. Rival causal stories usually fit the same facts.",
    icon: GitBranch,
  },
};

export const questionKindOrder: readonly QuestionKindId[] = [
  "empirical",
  "normative",
  "predictive",
  "explanatory",
];

/** Value-laden words that make an "Is X …?" question normative rather than empirical. */
const NORMATIVE_PATTERN =
  /\b(should|ought|must we|justified|justifiable|morally|ethically|unethical|fair|unfair|acceptable|permissible|worth it|deserve|obligated)\b/;

/** Leading interrogatives that signal a forecast rather than a present-tense fact. */
const PREDICTIVE_PATTERN = /^(will|would|could|can|might)\b/;

/** Leading interrogatives that ask for a mechanism or cause. */
const EXPLANATORY_PATTERN = /^(why|how|what|at what|which|who)\b/;

/**
 * Classifies a question by grammatical form. Order matters: the normative test
 * runs first because "Is capital punishment morally justified?" is a values
 * question wearing an empirical question's grammar.
 *
 * Total by construction — anything unmatched falls through to empirical, which
 * is the right default for the "Is/Does/Do/Did …?" bulk of the catalog.
 */
export function classifyQuestion(question: string): QuestionKindMeta {
  const q = question.trim().toLowerCase();

  if (NORMATIVE_PATTERN.test(q)) return questionKinds.normative;
  if (PREDICTIVE_PATTERN.test(q)) return questionKinds.predictive;
  if (EXPLANATORY_PATTERN.test(q)) return questionKinds.explanatory;
  return questionKinds.empirical;
}

/** Convenience: the icon alone, for list rows that don't need the full meta. */
export function getQuestionKindIcon(question: string): LucideIcon {
  return classifyQuestion(question).icon;
}
