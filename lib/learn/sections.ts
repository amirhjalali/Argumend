/**
 * The Learn library's one vocabulary.
 *
 * Every article page names its kind with the same eyebrow and sits under the
 * same breadcrumb trail (Home › Learn › Section › Title), and every index
 * page lists the same kinds. Before 2026-09-29 each mini-site (blog, guides,
 * concepts, fallacies, questions) had its own chrome and its own words for
 * this; now they read from here.
 */

export const LEARN_HUB_HREF = "/learn";

export type ArticleKind = "essay" | "guide" | "idea" | "fallacy" | "question";

export interface ArticleKindMeta {
  /** The eyebrow over an article's title, singular: "Guide". */
  readonly eyebrow: string;
  /** The section's name in breadcrumbs and on the hub: "Guides". */
  readonly section: string;
  /** Where the section lives. Guides and ideas are sections of the hub itself. */
  readonly href: string;
}

export const ARTICLE_KINDS: Record<ArticleKind, ArticleKindMeta> = {
  essay: { eyebrow: "Essay", section: "Essays", href: "/blog" },
  guide: { eyebrow: "Guide", section: "Guides", href: `${LEARN_HUB_HREF}#guides` },
  idea: { eyebrow: "Idea", section: "Core ideas", href: `${LEARN_HUB_HREF}#ideas` },
  fallacy: { eyebrow: "Fallacy", section: "Fallacies", href: "/fallacies" },
  question: { eyebrow: "Question", section: "Questions", href: "/questions" },
};

export interface Crumb {
  label: string;
  href?: string;
}

/** Home › Learn › Section › Title, for an article of `kind`. */
export function articleCrumbs(kind: ArticleKind, title: string): Crumb[] {
  const meta = ARTICLE_KINDS[kind];
  return [
    { label: "Home", href: "/" },
    { label: "Learn", href: LEARN_HUB_HREF },
    { label: meta.section, href: meta.href },
    { label: title },
  ];
}

/** Home › Learn › Section, for the index page of a section. */
export function indexCrumbs(section: string): Crumb[] {
  return [
    { label: "Home", href: "/" },
    { label: "Learn", href: LEARN_HUB_HREF },
    { label: section },
  ];
}

/**
 * The hub's sections, in page order. `chip` marks the ones that get a jump
 * chip under the header (at most six).
 */
export const LEARN_HUB_SECTIONS = [
  { id: "start", title: "Start here", chip: true },
  { id: "ideas", title: "Core ideas", chip: true },
  { id: "guides", title: "Guides", chip: true },
  { id: "fallacies", title: "Fallacies", chip: true },
  { id: "glossary", title: "Glossary", chip: true },
  { id: "why", title: "Why this exists", chip: false },
  { id: "teachers", title: "For teachers", chip: false },
  { id: "essays", title: "Essays", chip: true },
] as const;

export type LearnHubSectionId = (typeof LEARN_HUB_SECTIONS)[number]["id"];
