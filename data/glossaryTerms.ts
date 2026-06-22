/**
 * Inline glossary: domain vocabulary used across Argumend, mapped to short,
 * one-sentence definitions for first-time readers. Consumed by
 * <GlossaryTerm> for hover/focus tooltips.
 *
 * Keys are normalized to lowercase. Look up via `getGlossaryDefinition()`,
 * which handles casing, plurals, and common variants (e.g. "steel-man" vs
 * "steelman", "meta-claim" vs "meta claim").
 */

export interface GlossaryEntry {
  /** Canonical display term (used for the tooltip aria label). */
  term: string;
  /** One-sentence, plain-language definition. */
  definition: string;
}

/**
 * Canonical glossary keyed by normalized lowercase term.
 * `aliases` lists alternate spellings/variants that resolve to the same entry.
 */
const GLOSSARY: Array<GlossaryEntry & { aliases?: string[] }> = [
  {
    term: "Pillar",
    definition:
      "A core sub-argument that the overall claim rests on — break it and the claim weakens.",
    aliases: ["pillars"],
  },
  {
    term: "Crux",
    definition:
      "The specific question whose answer would actually change minds and settle the disagreement.",
    aliases: ["cruxes"],
  },
  {
    term: "Steel-man",
    definition:
      "The strongest, most charitable version of an argument you disagree with, stated fairly before you respond to it.",
    aliases: ["steelman", "steel man", "steel-manning", "steelmanning", "steel-manned"],
  },
  {
    term: "Verification status",
    definition:
      "Whether the test that would settle a crux is currently verified, still theoretical, or practically impossible to run.",
    aliases: ["verification-status"],
  },
  {
    term: "Confidence score",
    definition:
      "A 0–100 estimate of how strongly the weight of evidence supports the claim.",
    aliases: ["confidence-score"],
  },
  {
    term: "Meta-claim",
    definition:
      "The single top-level statement under analysis that all the pillars and evidence are weighed against.",
    aliases: ["metaclaim", "meta claim", "meta-claims"],
  },
  {
    term: "Proponent",
    definition:
      "The side arguing in favor of the claim, making the case for why it holds.",
    aliases: ["proponents"],
  },
  {
    term: "Skeptic",
    definition:
      "The side challenging the claim, pressing on its weakest points and demanding stronger evidence.",
    aliases: ["skeptics", "sceptic", "sceptics"],
  },
  {
    term: "Falsifiability",
    definition:
      "Whether a claim rules anything out — if no possible observation could prove it wrong, it tells you nothing about the world.",
    aliases: ["falsifiable", "falsification", "falsify", "unfalsifiable"],
  },
  {
    term: "Double crux",
    definition:
      "A single fact that both sides agree would change their mind — find it and an unwinnable argument becomes one answerable question.",
    aliases: ["double-crux"],
  },
  {
    term: "Burden of proof",
    definition:
      "The obligation to support a claim with evidence — it rests on whoever asserts the claim, not on those who doubt it.",
    aliases: ["burden-of-proof"],
  },
];

/** Normalize a term for lookup: lowercase, collapse whitespace, trim. */
function normalize(term: string): string {
  return term.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * Lookup map built once: every canonical key and alias -> entry.
 * Both " " and "-" separated forms are registered for multi-word keys.
 */
const LOOKUP: Map<string, GlossaryEntry> = (() => {
  const map = new Map<string, GlossaryEntry>();
  const register = (key: string, entry: GlossaryEntry) => {
    const norm = normalize(key);
    if (!map.has(norm)) map.set(norm, entry);
    // Register both space and hyphen variants for multi-word terms.
    const hyphenated = norm.replace(/\s+/g, "-");
    const spaced = norm.replace(/-/g, " ");
    if (!map.has(hyphenated)) map.set(hyphenated, entry);
    if (!map.has(spaced)) map.set(spaced, entry);
  };
  for (const { term, definition, aliases } of GLOSSARY) {
    const entry: GlossaryEntry = { term, definition };
    register(term, entry);
    for (const alias of aliases ?? []) register(alias, entry);
  }
  return map;
})();

/** All canonical terms, for callers that want to scan rendered text. */
export const GLOSSARY_TERMS: GlossaryEntry[] = GLOSSARY.map(({ term, definition }) => ({
  term,
  definition,
}));

/** Resolve a term (any casing/variant) to its glossary entry, or undefined. */
export function getGlossaryEntry(term: string): GlossaryEntry | undefined {
  return LOOKUP.get(normalize(term));
}

/** Resolve a term to just its definition string, or undefined. */
export function getGlossaryDefinition(term: string): string | undefined {
  return getGlossaryEntry(term)?.definition;
}

export default GLOSSARY_TERMS;
