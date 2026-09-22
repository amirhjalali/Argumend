/**
 * Stage one of topic selection: a lexical shortlist over the topic index.
 *
 * 156 options is not a question a Choice can answer well — the probe review's
 * round 1 already showed an eleven-way Choice underperforming decomposed
 * Nouls. So a cheap, deterministic BM25 narrows the field to eight, and Jev
 * makes one real decision among those eight plus "none".
 *
 * Recall is the only thing that matters here: if the right map is not in the
 * eight, no amount of model quality can recover it. Two things earn their
 * keep. Light suffix stemming, because a thread says "immigrants" where a map
 * says "immigration", and those did not match at all before. And the
 * search-phrasing catalogues (`lib/questions`, `data/is-claims`), because they
 * carry the words readers actually use for a topic, which the one-sentence
 * meta_claim often does not. On the four real transcripts in the probe
 * harness, those two changes moved the Piers Morgan immigration clip from rank
 * 17 to rank 7 while leaving the other three at rank 1.
 *
 * No network, no model, no new dependency: it runs in a few milliseconds on
 * the in-memory index and is fully reproducible in tests.
 */
import { isClaims } from "@/data/is-claims";
import { topicSummaries, type TopicSummary } from "@/data/topicIndex";
import { getAllQuestionVariations } from "@/lib/questions";
import { MAP_REPLY_LIMITS } from "./constants";

export interface PrefilterCandidate {
  id: string;
  title: string;
  metaClaim: string;
  /** BM25 score, rounded. Comparable within one call, not across calls. */
  score: number;
}

export interface PrefilterOptions {
  limit?: number;
  /** Defaults to the full topic index; tests pass a small slice. */
  summaries?: readonly TopicSummary[];
}

/**
 * Common English plus the words that appear in almost every map's framing
 * ("should", "policy", "people"), which otherwise pull every query toward the
 * same handful of topics.
 */
const STOPWORDS = new Set([
  "a", "about", "above", "actually", "after", "again", "against", "all", "also", "am", "an",
  "and", "another", "any", "anyone", "are", "argue", "argument", "around", "as", "at", "back",
  "be", "because", "been", "before", "being", "below", "best", "better", "between", "both",
  "but", "by", "can", "cannot", "come", "could", "did", "do", "does", "doing", "done", "dont",
  "down", "each", "else", "even", "ever", "every", "everyone", "few", "for", "from", "get",
  "give", "go", "going", "good", "got", "had", "has", "have", "having", "he", "her", "here",
  "hers", "him", "his", "how", "i", "if", "im", "in", "into", "is", "it", "its", "just",
  "keep", "know", "less", "let", "like", "little", "look", "lot", "made", "make", "many",
  "may", "me", "mean", "might", "more", "most", "much", "must", "my", "need", "never", "new",
  "no", "not", "nothing", "now", "of", "off", "on", "once", "one", "only", "or", "other",
  "our", "out", "over", "own", "people", "person", "point", "policy", "put", "really",
  "right", "said", "same", "say", "says", "see", "she", "should", "so", "some", "someone",
  "something", "still", "such", "sure", "take", "than", "that", "the", "their", "them",
  "then", "there", "these", "they", "thing", "things", "think", "this", "those", "though",
  "thought", "through", "time", "to", "too", "under", "until", "up", "us", "use", "used",
  "very", "want", "was", "way", "we", "well", "went", "were", "what", "when", "where",
  "which", "while", "who", "whole", "why", "will", "with", "without", "would", "yes", "yet",
  "you", "your", "youre",
]);

/**
 * Longest suffix first, so "nationalization" loses "ization" rather than "s".
 * Deliberately conservative: a stem must keep at least four characters, which
 * stops "policy" and "police" collapsing into each other.
 */
const SUFFIXES = [
  "ational", "ization", "isation", "iveness", "ability", "ibility",
  "ations", "ition", "ation", "ities", "ants", "ness", "ment", "ions",
  "ant", "ing", "ity", "ive", "ers", "ion", "al", "ed", "es", "er", "ly", "s",
];

export function stem(token: string): string {
  if (token.length <= 4) return token;
  if (token.endsWith("ies") && token.length > 5) return `${token.slice(0, -3)}y`;

  let stemmed = token;
  for (const suffix of SUFFIXES) {
    if (stemmed.endsWith(suffix) && stemmed.length - suffix.length >= 4) {
      stemmed = stemmed.slice(0, -suffix.length);
      break;
    }
  }

  // Drop a trailing silent "e" so "culture" meets "cultural" and "house" meets
  // "housing". Kept off vowel+e endings, where it changes the word.
  if (stemmed.length > 4 && stemmed.endsWith("e") && !/[aeiou]e$/.test(stemmed)) {
    stemmed = stemmed.slice(0, -1);
  }
  return stemmed;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[‘’“”]/g, "'")
    .split(/[^a-z0-9']+/)
    .map((token) => token.replace(/^'+|'+$/g, ""))
    // Stopwords are matched unstemmed, then the survivors are stemmed.
    .filter((token) => token.length >= 2 && !STOPWORDS.has(token))
    .map(stem)
    .filter((token) => token.length >= 2 && !STOPWORDS.has(token));
}

/** The reader-facing phrasings for each topic, from the two search catalogues. */
let phrasings: Map<string, string> | null = null;

function phrasingsByTopic(): Map<string, string> {
  if (phrasings) return phrasings;
  const collected = new Map<string, string[]>();
  const push = (topicId: string, text: string) => {
    const list = collected.get(topicId) ?? [];
    list.push(text);
    collected.set(topicId, list);
  };
  for (const variation of getAllQuestionVariations(topicSummaries)) {
    push(variation.topicId, variation.question);
  }
  for (const claim of isClaims) {
    push(claim.topicId, `${claim.question} ${claim.claim}`);
  }
  phrasings = new Map([...collected].map(([id, parts]) => [id, parts.join(" ")]));
  return phrasings;
}

/** The title counts twice: it is the shortest, most on-topic field a map has. */
function documentTokens(summary: TopicSummary): string[] {
  const title = tokenize(summary.title);
  return [
    ...title,
    ...title,
    ...tokenize(summary.meta_claim),
    ...tokenize(`${summary.tags.join(" ")} ${summary.id.replace(/-/g, " ")}`),
    ...tokenize(phrasingsByTopic().get(summary.id) ?? ""),
  ];
}

interface IndexedDocument {
  summary: TopicSummary;
  termFrequency: Map<string, number>;
  length: number;
}

interface Index {
  documents: IndexedDocument[];
  documentFrequency: Map<string, number>;
  averageLength: number;
}

function buildIndex(summaries: readonly TopicSummary[]): Index {
  const documentFrequency = new Map<string, number>();
  const documents = summaries.map((summary) => {
    const tokens = documentTokens(summary);
    const termFrequency = new Map<string, number>();
    for (const token of tokens) {
      termFrequency.set(token, (termFrequency.get(token) ?? 0) + 1);
    }
    for (const term of termFrequency.keys()) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
    return { summary, termFrequency, length: tokens.length };
  });

  const totalLength = documents.reduce((sum, document) => sum + document.length, 0);
  return {
    documents,
    documentFrequency,
    averageLength: documents.length > 0 ? totalLength / documents.length : 0,
  };
}

let defaultIndex: Index | null = null;

function indexFor(summaries: readonly TopicSummary[] | undefined): Index {
  if (summaries) return buildIndex(summaries);
  defaultIndex ??= buildIndex(topicSummaries);
  return defaultIndex;
}

const K1 = 1.4;
const B = 0.75;

/** Okapi BM25, with query-term frequency damped so one repeated word cannot win alone. */
export function prefilterTopics(
  text: string,
  options: PrefilterOptions = {},
): PrefilterCandidate[] {
  const limit = options.limit ?? MAP_REPLY_LIMITS.prefilterCandidates;
  const index = indexFor(options.summaries);
  if (index.documents.length === 0) return [];

  const queryFrequency = new Map<string, number>();
  for (const token of tokenize(text)) {
    queryFrequency.set(token, (queryFrequency.get(token) ?? 0) + 1);
  }
  if (queryFrequency.size === 0) return [];

  const total = index.documents.length;
  const scored = index.documents.map((document) => {
    let score = 0;
    for (const [term, queryCount] of queryFrequency) {
      const frequency = document.termFrequency.get(term);
      if (!frequency) continue;
      const documentCount = index.documentFrequency.get(term) ?? 0;
      const idf = Math.log(1 + (total - documentCount + 0.5) / (documentCount + 0.5));
      const denominator =
        frequency + K1 * (1 - B + (B * document.length) / (index.averageLength || 1));
      score += idf * ((frequency * (K1 + 1)) / denominator) * (1 + Math.log(queryCount));
    }
    return { summary: document.summary, score };
  });

  return scored
    .filter((entry) => entry.score > 0)
    // Ties broken by id so the shortlist is stable run to run.
    .sort((a, b) => b.score - a.score || a.summary.id.localeCompare(b.summary.id))
    .slice(0, limit)
    .map((entry) => ({
      id: entry.summary.id,
      title: entry.summary.title,
      metaClaim: entry.summary.meta_claim,
      score: Math.round(entry.score * 1000) / 1000,
    }));
}
