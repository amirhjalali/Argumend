/**
 * Shelf taxonomy for /library — turns the flat "Recommended Reading" list into
 * a browsable set of shelves, and gives every entry its own icon and format
 * label, so the page reads as a real library rather than nine copies of one row
 * stamped with the same external-link glyph.
 *
 * Mirrors the shape of `lib/fallacyMeta.ts` (families -> shelves): ordered
 * chapters with roman numerals, per-item icons, and a grouping helper.
 *
 * Palette discipline (see CLAUDE.md "Design System"): shelf colors reuse the
 * same on-brand tokens as `lib/categoryColors.ts` — deep teal, rust, skeptic
 * brown. Never amber/tangerine/indigo/violet/sky. Crux crimson is deliberately
 * left out here: on /library it would read as "contested", which is the wrong
 * signal for a reading list.
 */
import type { LucideIcon } from "lucide-react";
import {
  BookMarked,
  ScrollText,
  MessagesSquare,
  FlaskConical,
  Stethoscope,
  Globe,
  Brain,
  Binoculars,
  Target,
  Compass,
  Microscope,
  Scale,
} from "lucide-react";

export type LibraryShelfId = "foundations" | "evidence" | "judgment";

export interface LibraryShelfMeta {
  readonly id: LibraryShelfId;
  /** Roman numeral for the shelf heading. */
  readonly numeral: string;
  readonly label: string;
  readonly description: string;
  /** Icon for the shelf heading + jump-nav chip. */
  readonly icon: LucideIcon;
  /** Chip: bg + text + border, matching the categoryColors.ts pattern. */
  readonly chip: string;
  /** Icon badge background. */
  readonly iconBg: string;
  readonly iconText: string;
  /** Hover/accent border tint for cards on this shelf. */
  readonly hoverBorder: string;
}

/** What kind of thing the resource is — a book reads differently to a dataset. */
export type LibraryResourceKind =
  | "Book"
  | "Reference"
  | "Sequence"
  | "Community"
  | "Database"
  | "Dataset";

export interface LibraryResource {
  readonly title: string;
  readonly url: string;
  readonly description: string;
  readonly shelf: LibraryShelfId;
  readonly kind: LibraryResourceKind;
  /** Distinct per-entry icon — no two resources share one. */
  readonly icon: LucideIcon;
}

export const libraryShelves: Record<LibraryShelfId, LibraryShelfMeta> = {
  foundations: {
    id: "foundations",
    numeral: "I",
    label: "Foundations of Reasoning",
    description:
      "Where the vocabulary comes from — what counts as an argument, a premise, or a good reason in the first place.",
    icon: Compass,
    chip: "bg-deep/10 dark:bg-deep/20 text-deep dark:text-deep-light border-deep/20 dark:border-deep/40",
    iconBg: "bg-deep/10 dark:bg-deep/20",
    iconText: "text-deep dark:text-deep-light",
    hoverBorder: "hover:border-deep/40",
  },
  evidence: {
    id: "evidence",
    numeral: "II",
    label: "Evidence & Method",
    description:
      "How claims get tested against the world — falsification, systematic review, and the data that survives both.",
    icon: Microscope,
    chip: "bg-rust-50 dark:bg-rust-900/30 text-rust-700 dark:text-rust-300 border-rust-200/60 dark:border-rust-800/40",
    iconBg: "bg-rust-50 dark:bg-rust-900/30",
    iconText: "text-rust-600 dark:text-rust-300",
    hoverBorder: "hover:border-rust-300/60",
  },
  judgment: {
    id: "judgment",
    numeral: "III",
    label: "Judgment & Calibration",
    description:
      "Why your own reasoning goes wrong, and what measurably reduces the error — bias, motivation, and forecasting track records.",
    icon: Scale,
    chip: "bg-skeptic/10 dark:bg-skeptic/20 text-skeptic-dark dark:text-skeptic-light border-skeptic/25 dark:border-skeptic/40",
    iconBg: "bg-skeptic/10 dark:bg-skeptic/20",
    iconText: "text-skeptic-dark dark:text-skeptic-light",
    hoverBorder: "hover:border-skeptic/40",
  },
};

/** Display order for the shelves — I through III. */
export const libraryShelfOrder: readonly LibraryShelfId[] = [
  "foundations",
  "evidence",
  "judgment",
];

/**
 * The catalog. Order here is canonical — it drives the "No. 01" catalog numbers
 * on the cards, so a given resource keeps its number regardless of layout.
 */
export const libraryResources: readonly LibraryResource[] = [
  {
    title: "Stanford Encyclopedia of Philosophy",
    url: "https://plato.stanford.edu/",
    description: "Peer-reviewed reference entries on essentially every concept we use.",
    shelf: "foundations",
    kind: "Reference",
    icon: BookMarked,
  },
  {
    title: "Rationality: From AI to Zombies",
    url: "https://www.readthesequences.com/",
    description: "Eliezer Yudkowsky's foundational sequence on belief and evidence.",
    shelf: "foundations",
    kind: "Sequence",
    icon: ScrollText,
  },
  {
    title: "LessWrong",
    url: "https://www.lesswrong.com/",
    description: "A working community that argues about reasoning in public.",
    shelf: "foundations",
    kind: "Community",
    icon: MessagesSquare,
  },
  {
    title: "The Logic of Scientific Discovery",
    url: "https://en.wikipedia.org/wiki/The_Logic_of_Scientific_Discovery",
    description: "Karl Popper on falsification — what makes a claim testable at all.",
    shelf: "evidence",
    kind: "Book",
    icon: FlaskConical,
  },
  {
    title: "Cochrane Library",
    url: "https://www.cochranelibrary.com/",
    description: "Systematic reviews of healthcare interventions, with evidence graded.",
    shelf: "evidence",
    kind: "Database",
    icon: Stethoscope,
  },
  {
    title: "Our World in Data",
    url: "https://ourworldindata.org/",
    description: "Sourced long-run data on the problems people argue about most.",
    shelf: "evidence",
    kind: "Dataset",
    icon: Globe,
  },
  {
    title: "Thinking, Fast and Slow",
    url: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
    description: "Daniel Kahneman on the systematic ways intuition misfires.",
    shelf: "judgment",
    kind: "Book",
    icon: Brain,
  },
  {
    title: "The Scout Mindset",
    url: "https://www.juliagalef.com/book/",
    description: "Julia Galef on wanting to see clearly rather than to win.",
    shelf: "judgment",
    kind: "Book",
    icon: Binoculars,
  },
  {
    title: "Superforecasting",
    url: "https://en.wikipedia.org/wiki/Superforecasting",
    description: "Philip Tetlock on who actually predicts well, and why.",
    shelf: "judgment",
    kind: "Book",
    icon: Target,
  },
];

/** Shelf metadata for an id, falling back to "foundations" if unmapped. */
export function getLibraryShelf(id: string): LibraryShelfMeta {
  return libraryShelves[id as LibraryShelfId] ?? libraryShelves.foundations;
}

/**
 * Groups resources by shelf, preserving `libraryShelfOrder`. Shelves with no
 * matching entries are omitted (defensive — shouldn't happen with the full
 * catalog).
 */
export function groupResourcesByShelf(
  list: readonly LibraryResource[] = libraryResources
): { shelf: LibraryShelfMeta; items: LibraryResource[] }[] {
  return libraryShelfOrder
    .map((id) => ({
      shelf: libraryShelves[id],
      items: list.filter((r) => r.shelf === id),
    }))
    .filter((group) => group.items.length > 0);
}

/**
 * Canonical catalog number (1-based) for each resource, keyed by title. Used
 * for the "No. 04" stamps on the cards.
 */
export const libraryCatalogNumbers: ReadonlyMap<string, number> = new Map(
  libraryResources.map((r, i) => [r.title, i + 1])
);
