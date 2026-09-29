/**
 * Canonical category + status chip colors.
 *
 * Single source of truth for the small "pill" chips that label a topic's
 * category (policy / technology / science / economics / philosophy) and its
 * status (settled / contested / highly_speculative). Previously these maps were
 * duplicated across SearchModal, /topics, ReadModeView, and the old topic detail view
 * with conflicting palettes — including an off-brand indigo/sky/violet rainbow
 * in search — so the same category rendered different colors in different views.
 *
 * Palette discipline (see CLAUDE.md "Design System"): only the on-brand
 * families are allowed — deep teal (#3a6965), rust (#C4613C), brown (#8B5A3C,
 * the `skeptic` token), and two muted category-only hues: plum (#6b4768) and
 * slate ink (#4a5868). Never amber/tangerine/orange/yellow/indigo/violet/sky.
 *
 * Two colours are reserved and never label a category: crux crimson (#a23b3b)
 * means a crux, and stone means a status chip. Philosophy used to be crimson,
 * so every philosophy card announced a crux it did not have; technology used
 * to be stone, so its chip read as a fourth status.
 *
 * Each value is self-contained for light AND dark mode (bg + text + border),
 * but intentionally omits the `border` *width* utility — every consumer already
 * supplies its own `border` class, so we provide the border *color* only.
 *
 * Green-as-verdict decoupling: no status chip uses green, or any hue. Green
 * reads as "this claim is true," which fights the neutral brand. Status chips
 * are neutral stone (see `statusColors`); the Science category is brown.
 */
import type { TopicCategory, TopicStatus } from "@/lib/schemas/topic";

/**
 * The ONE tone map. Every chip, icon badge, accent rule and category colour in
 * the site resolves to one of these six tones, so a colour means the same thing
 * wherever it appears. `components/ui/Chip` renders `toneStyles[tone].chip`;
 * the `lib/*Meta.ts` taxonomies spread the same fields.
 *
 * There is deliberately no "crux" tone: crimson means a crux, and a crux is
 * drawn by the crux components, never by a category or a label chip.
 *
 *   neutral  stone        tags, kinds, anything without a family
 *   teal     deep #3a6965 institutional, evidence-adjacent families
 *   rust     #C4613C      warm families (never the CTA fill: that is Button)
 *   brown    #8B5A3C      empirical families (the skeptic token)
 *   plum     #6b4768      reflective families (philosophy)
 *   ink      #4a5868      machine families (technology)
 *
 * Brown's dark-mode TEXT is #cfa88a (6.7:1 on its dark tint); skeptic-light
 * #A67350 is 3.6:1 there, so it is kept for icons only.
 */
export type Tone = "neutral" | "teal" | "rust" | "brown" | "plum" | "ink";

export const TONES: readonly Tone[] = ["neutral", "teal", "rust", "brown", "plum", "ink"];

export interface ToneStyle {
  /** Chip: bg + text + border colour (the consumer supplies `border`). */
  readonly chip: string;
  /** Icon badge background. */
  readonly iconBg: string;
  /** Icon colour (non-text: 3:1 is enough). */
  readonly iconText: string;
  /** Small text in the tone (AA on the canvas in both themes). */
  readonly accentText: string;
  /** Hover border tint for cards in this tone. */
  readonly hoverBorder: string;
  /** Static left-border accent. */
  readonly borderAccent: string;
  /** Hairline rule colour. */
  readonly rule: string;
  /** Top-accent border colour. */
  readonly topBorder: string;
  /** Solid dot / marker fill. */
  readonly dot: string;
}

export const toneStyles: Record<Tone, ToneStyle> = {
  neutral: {
    chip: "bg-stone-100 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 border-stone-300/70 dark:border-stone-600/60",
    iconBg: "bg-stone-100 dark:bg-stone-800/40",
    iconText: "text-stone-600 dark:text-stone-300",
    accentText: "text-stone-600 dark:text-stone-300",
    hoverBorder: "hover:border-stone-400/60",
    borderAccent: "border-l-stone-400",
    rule: "border-stone-300/70",
    topBorder: "border-t-stone-400",
    dot: "bg-stone-400",
  },
  teal: {
    chip: "bg-deep/10 dark:bg-deep/20 text-deep dark:text-accent-text border-deep/20 dark:border-deep/40",
    iconBg: "bg-deep/10 dark:bg-deep/20",
    iconText: "text-deep dark:text-accent-text",
    accentText: "text-deep dark:text-accent-text",
    hoverBorder: "hover:border-deep/40",
    borderAccent: "border-l-deep/50",
    rule: "border-deep/25",
    topBorder: "border-t-deep",
    dot: "bg-deep",
  },
  rust: {
    chip: "bg-rust-50 dark:bg-rust-900/30 text-rust-700 dark:text-rust-300 border-rust-200/60 dark:border-rust-800/40",
    iconBg: "bg-rust-50 dark:bg-rust-900/30",
    iconText: "text-rust-600 dark:text-rust-300",
    accentText: "text-rust-700 dark:text-rust-300",
    hoverBorder: "hover:border-rust-300/60",
    borderAccent: "border-l-rust-400",
    rule: "border-rust-200",
    topBorder: "border-t-rust-400",
    dot: "bg-rust-500",
  },
  brown: {
    chip: "bg-skeptic/10 dark:bg-skeptic/20 text-skeptic-dark dark:text-[#cfa88a] border-skeptic/25 dark:border-skeptic/40",
    iconBg: "bg-skeptic/10 dark:bg-skeptic/20",
    iconText: "text-skeptic-dark dark:text-skeptic-light",
    accentText: "text-skeptic-dark dark:text-[#cfa88a]",
    hoverBorder: "hover:border-skeptic/40",
    borderAccent: "border-l-skeptic/50",
    rule: "border-skeptic/25",
    topBorder: "border-t-skeptic",
    dot: "bg-skeptic",
  },
  // Plum (#6b4768): 5.90:1 light, 6.20:1 dark on its tint.
  plum: {
    chip: "bg-plum/10 dark:bg-plum/20 text-plum dark:text-plum-light border-plum/25 dark:border-plum/40",
    iconBg: "bg-plum/10 dark:bg-plum/20",
    iconText: "text-plum dark:text-plum-light",
    accentText: "text-plum dark:text-plum-light",
    hoverBorder: "hover:border-plum/40",
    borderAccent: "border-l-plum/50",
    rule: "border-plum/25",
    topBorder: "border-t-plum",
    dot: "bg-plum",
  },
  // Slate ink (#4a5868): 5.61:1 light, 6.63:1 dark on its tint. Cool where
  // stone status chips are warm, so it can't be read as a status.
  ink: {
    chip: "bg-ink/10 dark:bg-ink/20 text-ink dark:text-ink-light border-ink/25 dark:border-ink/40",
    iconBg: "bg-ink/10 dark:bg-ink/20",
    iconText: "text-ink dark:text-ink-light",
    accentText: "text-ink dark:text-ink-light",
    hoverBorder: "hover:border-ink/40",
    borderAccent: "border-l-ink/50",
    rule: "border-ink/25",
    topBorder: "border-t-ink",
    dot: "bg-ink",
  },
};

/**
 * Which tone each topic category wears. Teal is institutional / governance,
 * ink is machine, brown is empirical (NOT green, see the decoupling note),
 * rust is markets, plum is reflective (not crimson: crimson means a crux).
 */
export const categoryTone: Record<TopicCategory, Tone> = {
  policy: "teal",
  technology: "ink",
  science: "brown",
  economics: "rust",
  philosophy: "plum",
};

export const categoryColors: Record<TopicCategory, string> = {
  policy: toneStyles[categoryTone.policy].chip,
  technology: toneStyles[categoryTone.technology].chip,
  science: toneStyles[categoryTone.science].chip,
  economics: toneStyles[categoryTone.economics].chip,
  philosophy: toneStyles[categoryTone.philosophy].chip,
};

/**
 * Status chips are ONE neutral stone family, told apart by fill, outline and
 * weight rather than hue. A hue here borrows a meaning it does not have: rust
 * is the proponent side and the page's CTA, teal is evidence, crimson is a
 * crux, and a status chip sits right beside a category chip that may use any
 * of them. Status is not a verdict, so it carries no signal colour.
 *
 *   settled             solid stone fill, semibold  (12.5:1 light / 12.0:1 dark)
 *   contested           outline only, no fill       ( 9.1:1 light / 14.0:1 dark)
 *   highly_speculative  faint fill, dashed outline  ( 6.9:1 light /  6.6:1 dark)
 */
export const statusColors: Record<TopicStatus, string> = {
  settled:
    "font-semibold bg-stone-200/70 dark:bg-stone-700/60 text-stone-800 dark:text-stone-100 border-stone-300/80 dark:border-stone-600/60",
  contested:
    "bg-transparent text-stone-700 dark:text-stone-200 border-stone-500/70 dark:border-stone-400/70",
  highly_speculative:
    "border-dashed bg-stone-100/60 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 border-stone-400/70 dark:border-stone-600/70",
};

/**
 * Top-accent border color for topic cards, keyed by category. Kept in lockstep
 * with `categoryColors` so a card's accent stripe matches its category chip —
 * the same category reads as the same color everywhere.
 */
export const categoryTopBorder: Record<TopicCategory, string> = {
  policy: toneStyles[categoryTone.policy].topBorder,
  technology: toneStyles[categoryTone.technology].topBorder,
  science: toneStyles[categoryTone.science].topBorder,
  economics: toneStyles[categoryTone.economics].topBorder,
  philosophy: toneStyles[categoryTone.philosophy].topBorder,
};

/** Tailwind class string for a category chip (bg + text + border color, with dark variants). */
export function getCategoryChipClass(category: TopicCategory): string {
  return categoryColors[category];
}

/** Tailwind class string for a status chip (bg + text + border color, with dark variants). */
export function getStatusChipClass(status: TopicStatus): string {
  return statusColors[status];
}
