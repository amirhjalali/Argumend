import { firstSentence } from "@/lib/topicPage/legacy";

/**
 * The opening of an authored paragraph, verbatim, long enough to say
 * something: the first sentence, plus the next when the first is a short
 * set-up line ("Not all evidence is created equal.").
 */
export function leadSentences(text: string, minLength = 60): string {
  const paragraph = text.split("\n\n")[0].trim();
  const first = firstSentence(paragraph);
  if (first.length >= minLength || first.length === paragraph.length) return first;
  const rest = paragraph.slice(first.length).trim();
  return `${first} ${firstSentence(rest)}`;
}
