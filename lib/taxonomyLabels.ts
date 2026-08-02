const ACRONYMS = new Map([
  ["adhd", "ADHD"],
  ["ai", "AI"],
  ["fcc", "FCC"],
  ["gmo", "GMO"],
  ["hiv", "HIV"],
  ["iter", "ITER"],
  ["mmt", "MMT"],
  ["mond", "MOND"],
  ["ssri", "SSRI"],
]);

const LOWERCASE_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "vs",
]);

/** Turn stored taxonomy keys into reader-facing labels without mangling acronyms. */
export function formatTaxonomyLabel(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (normalized === "covid-19") return "COVID-19";
  if (normalized === "e-waste") return "E-Waste";

  return normalized
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      const acronym = ACRONYMS.get(word);
      if (acronym) return acronym;
      if (index > 0 && LOWERCASE_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
