/**
 * Canonical category + status chip colors.
 *
 * Single source of truth for the small "pill" chips that label a topic's
 * category (policy / technology / science / economics / philosophy) and its
 * status (settled / contested / highly_speculative). Previously these maps were
 * duplicated across SearchModal, /topics, ReadModeView, and TopicDetailView
 * with conflicting palettes — including an off-brand indigo/sky/violet rainbow
 * in search — so the same category rendered different colors in different views.
 *
 * Palette discipline (see CLAUDE.md "Design System"): only the on-brand
 * families are allowed — stone/parchment, deep teal (#3a6965), rust (#C4613C),
 * brown (#8B5A3C, the `skeptic` token), and crux crimson (#a23b3b). Never
 * amber/tangerine/orange/yellow/indigo/violet/sky.
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

export const categoryColors: Record<TopicCategory, string> = {
  // Deep teal — institutional / governance
  policy:
    "bg-deep/10 dark:bg-deep/20 text-deep dark:text-accent-text border-deep/20 dark:border-deep/40",
  // Stone — neutral / machine
  technology:
    "bg-stone-100 dark:bg-stone-800/40 text-stone-600 dark:text-stone-300 border-stone-200/60 dark:border-stone-700/40",
  // Brown (skeptic = #8B5A3C) — empirical / earthy. NOT green (see decoupling note).
  science:
    "bg-skeptic/10 dark:bg-skeptic/20 text-skeptic-dark dark:text-[#cfa88a] border-skeptic/25 dark:border-skeptic/40",
  // Rust — markets / warmth
  economics:
    "bg-rust-50 dark:bg-rust-900/30 text-rust-700 dark:text-rust-300 border-rust-200/60 dark:border-rust-800/40",
  // Crux crimson (#a23b3b) — the deep, contested questions
  philosophy:
    "bg-crux/10 dark:bg-crux/20 text-crux dark:text-crux-text border-crux/25 dark:border-crux/40",
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
  policy: "border-t-deep",
  technology: "border-t-stone-400",
  science: "border-t-skeptic", // brown #8B5A3C
  economics: "border-t-rust-400",
  philosophy: "border-t-crux", // crimson #a23b3b
};

/** Tailwind class string for a category chip (bg + text + border color, with dark variants). */
export function getCategoryChipClass(category: TopicCategory): string {
  return categoryColors[category];
}

/** Tailwind class string for a status chip (bg + text + border color, with dark variants). */
export function getStatusChipClass(status: TopicStatus): string {
  return statusColors[status];
}
