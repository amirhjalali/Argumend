import { concepts } from "@/data/concepts";
import { fallacies } from "@/data/fallacies";
import {
  glossaryPageTerms,
  glossaryTermId,
  type GlossaryPageTerm,
} from "@/data/glossaryPageTerms";
import { firstSentence } from "@/lib/topicPage/legacy";

/**
 * The compact A–Z glossary (2026-09-29). One entry per term: a one-line
 * definition, the rest folded, and a link to the page that owns the long
 * version when one exists (a core idea or a fallacy), so the glossary stops
 * being a second copy of those pages.
 */

/**
 * Old anchors that must keep landing on a renamed term. "Verification Status"
 * became "What Would Settle It" (r4, 2026-10), the label the maps show.
 * "Balance and Weight" (once "Confidence Score") and "Pillar" were retired
 * from the glossary: the maps no longer show either, and the reading of
 * evidence that still exists on the older maps is explained in
 * /methodology#older-maps.
 */
export const GLOSSARY_ANCHOR_ALIASES: Record<string, readonly string[]> = {
  "what-would-settle-it": ["verification-status"],
};

/** Terms whose owner page is not found by name. */
const OWNER_OVERRIDES: Record<string, string> = {
  "Steel-Manning": "/concepts/steel-manning",
  "Double Crux": "/concepts/cruxes",
  "Evidence Weighting": "/concepts/evidence-weighting",
  "Logical Fallacy": "/concepts/fallacies",
  "False Dichotomy": "/fallacies/false-dilemma",
  "Correlation vs. Causation": "/fallacies/false-cause",
};

export interface GlossaryLink {
  href: string;
  label: string;
}

export interface GlossaryEntry {
  term: string;
  /** The stable anchor (`#crux`). */
  id: string;
  /** Extra anchors that land on this entry. */
  aliases: readonly string[];
  /** The first sentence: shown unfolded. */
  summary: string;
  /** The rest of the definition: folded. */
  rest: string;
  example?: GlossaryLink;
  /** The page that owns the long version, or the curated further reading. */
  readMore?: GlossaryLink;
}

const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

const conceptByPath = new Map(concepts.map((c) => [`/concepts/${c.id}`, c.title]));
const fallacyByPath = new Map(fallacies.map((f) => [`/fallacies/${f.slug}`, f.name]));

/** The owner page's path for a term, when a concept or fallacy page owns it. */
export function glossaryOwnerPath(term: GlossaryPageTerm): string | undefined {
  if (OWNER_OVERRIDES[term.term]) return OWNER_OVERRIDES[term.term];
  const curated = term.learnMoreHref;
  if (curated && (conceptByPath.has(curated) || fallacyByPath.has(curated))) return curated;
  const key = normalize(term.term);
  const fallacy = fallacies.find(
    (f) => normalize(f.name) === key || f.aliases.some((alias) => normalize(alias) === key),
  );
  return fallacy ? `/fallacies/${fallacy.slug}` : undefined;
}

function readMoreFor(term: GlossaryPageTerm): GlossaryLink | undefined {
  const owner = glossaryOwnerPath(term);
  if (owner) {
    const concept = conceptByPath.get(owner);
    if (concept) return { href: owner, label: `Read the idea: ${concept}` };
    return { href: owner, label: `Read the fallacy: ${fallacyByPath.get(owner)}` };
  }
  if (term.learnMoreHref) {
    return { href: term.learnMoreHref, label: term.learnMoreText ?? "Read more" };
  }
  return undefined;
}

/** Every glossary term, alphabetical. */
export function glossaryEntries(): GlossaryEntry[] {
  return [...glossaryPageTerms]
    .sort((a, b) => a.term.localeCompare(b.term))
    .map((term) => {
      const id = glossaryTermId(term.term);
      const summary = firstSentence(term.definition);
      return {
        term: term.term,
        id,
        aliases: GLOSSARY_ANCHOR_ALIASES[id] ?? [],
        summary,
        rest: term.definition.slice(summary.length).trim(),
        example:
          term.example && term.exampleHref ? { href: term.exampleHref, label: term.example } : undefined,
        readMore: readMoreFor(term),
      };
    });
}

/** Entries grouped under their first letter, A to Z. */
export function glossaryByLetter(): { letter: string; entries: GlossaryEntry[] }[] {
  const groups = new Map<string, GlossaryEntry[]>();
  for (const entry of glossaryEntries()) {
    const letter = entry.term[0].toUpperCase();
    groups.set(letter, [...(groups.get(letter) ?? []), entry]);
  }
  return [...groups].map(([letter, entries]) => ({ letter, entries }));
}
