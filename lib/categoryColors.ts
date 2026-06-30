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
 * Green-as-verdict decoupling: "Settled" status deliberately does NOT reuse a
 * green/science treatment. Green reads as "this claim is true," which fights the
 * neutral brand. Settled gets a calm deep-teal "resolved" treatment, and the
 * Science category is brown — so the two never share a color.
 */
import type { TopicCategory, TopicStatus } from "@/lib/schemas/topic";

export const categoryColors: Record<TopicCategory, string> = {
  // Deep teal — institutional / governance
  policy:
    "bg-deep/10 dark:bg-deep/20 text-deep dark:text-deep-light border-deep/20 dark:border-deep/40",
  // Stone — neutral / machine
  technology:
    "bg-stone-100 dark:bg-stone-800/40 text-stone-600 dark:text-stone-300 border-stone-200/60 dark:border-stone-700/40",
  // Brown (skeptic = #8B5A3C) — empirical / earthy. NOT green (see decoupling note).
  science:
    "bg-skeptic/10 dark:bg-skeptic/20 text-skeptic-dark dark:text-skeptic-light border-skeptic/25 dark:border-skeptic/40",
  // Rust — markets / warmth
  economics:
    "bg-rust-50 dark:bg-rust-900/30 text-rust-700 dark:text-rust-300 border-rust-200/60 dark:border-rust-800/40",
  // Crux crimson (#a23b3b) — the deep, contested questions
  philosophy:
    "bg-crux/10 dark:bg-crux/20 text-crux dark:text-crux-light border-crux/25 dark:border-crux/40",
};

export const statusColors: Record<TopicStatus, string> = {
  // Deep teal "resolved" — calm and settled, never green.
  settled:
    "bg-deep/10 dark:bg-deep/20 text-deep dark:text-deep-light border-deep/20 dark:border-deep/40",
  // Rust — an active, live disagreement.
  contested:
    "bg-rust-50 dark:bg-rust-900/30 text-rust-700 dark:text-rust-300 border-rust-200/60 dark:border-rust-800/40",
  // Stone — faint and uncertain.
  highly_speculative:
    "bg-stone-100 dark:bg-stone-800/40 text-stone-600 dark:text-stone-300 border-stone-200/60 dark:border-stone-700/40",
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
