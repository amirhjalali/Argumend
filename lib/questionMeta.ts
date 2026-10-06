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
 * teal (#3a6965), rust (#C4613C), brown (#8B5A3C), plum (#6b4768), slate ink (#4a5868), via `toneStyles`.
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
import { categoryColors, categoryTopBorder, toneStyles } from "@/lib/categoryColors";

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
    iconBg: toneStyles.teal.iconBg,
    iconText: toneStyles.teal.iconText,
    accentText: toneStyles.teal.accentText,
    ruleBorder: toneStyles.teal.rule,
    topBorder: categoryTopBorder.policy,
  },
  technology: {
    id: "technology",
    icon: Cpu,
    chip: categoryColors.technology,
    iconBg: toneStyles.ink.iconBg,
    iconText: toneStyles.ink.iconText,
    accentText: toneStyles.ink.accentText,
    ruleBorder: toneStyles.ink.rule,
    topBorder: categoryTopBorder.technology,
  },
  science: {
    id: "science",
    icon: Microscope,
    chip: categoryColors.science,
    iconBg: toneStyles.brown.iconBg,
    iconText: toneStyles.brown.iconText,
    accentText: toneStyles.brown.accentText,
    ruleBorder: toneStyles.brown.rule,
    topBorder: categoryTopBorder.science,
  },
  economics: {
    id: "economics",
    icon: LineChart,
    chip: categoryColors.economics,
    iconBg: toneStyles.rust.iconBg,
    iconText: toneStyles.rust.iconText,
    accentText: toneStyles.rust.accentText,
    ruleBorder: toneStyles.rust.rule,
    topBorder: categoryTopBorder.economics,
  },
  philosophy: {
    id: "philosophy",
    icon: BrainCircuit,
    chip: categoryColors.philosophy,
    iconBg: toneStyles.plum.iconBg,
    iconText: toneStyles.plum.iconText,
    accentText: toneStyles.plum.accentText,
    ruleBorder: toneStyles.plum.rule,
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
  /** The kind in plain words, as a question page's opening line: "A question of fact." */
  readonly plain: string;
  /** One line explaining what kind of answer this question can even have. */
  readonly description: string;
  readonly icon: LucideIcon;
}

export const questionKinds: Record<QuestionKindId, QuestionKindMeta> = {
  empirical: {
    id: "empirical",
    plain: "A question of fact.",
    label: "Empirical",
    description:
      "Asks what is true. Evidence can in principle settle it — the fight is over which evidence counts.",
    icon: FlaskConical,
  },
  normative: {
    id: "normative",
    plain: "A question of value.",
    label: "Normative",
    description:
      "Asks what we should do, or how much one thing should count against another. Evidence constrains the answer but never fully decides it — values do the rest.",
    icon: Scale,
  },
  predictive: {
    id: "predictive",
    plain: "A question about the future.",
    label: "Predictive",
    description:
      "Asks what will happen. No evidence closes it yet; the disagreement is about how the future resolves.",
    icon: TrendingUp,
  },
  explanatory: {
    id: "explanatory",
    plain: "A question of cause.",
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
 *
 * `firstCruxStanding` is the map's own data: when the first crux its question
 * page turns on is a standing value difference (`settle.kind`
 * "value-difference" — nothing empirical settles it), a question that reads
 * as one of fact ("Is nuclear energy safe?") is labelled a question of value,
 * so the label never promises a settlement the crux below it rules out.
 */
export function classifyQuestion(
  question: string,
  firstCruxStanding?: string,
): QuestionKindMeta {
  const q = question.trim().toLowerCase();

  if (NORMATIVE_PATTERN.test(q)) return questionKinds.normative;
  if (PREDICTIVE_PATTERN.test(q)) return questionKinds.predictive;
  if (EXPLANATORY_PATTERN.test(q)) return questionKinds.explanatory;
  if (firstCruxStanding === "value-difference") return questionKinds.normative;
  return questionKinds.empirical;
}

/** Convenience: the icon alone, for list rows that don't need the full meta. */
export function getQuestionKindIcon(question: string): LucideIcon {
  return classifyQuestion(question).icon;
}
