/**
 * FAQPage structured data for a legacy map's "Common questions" fold.
 *
 * Each authored question carries `content`: the context behind it, which is
 * often written as the question restated ("Can we ensure…, or is
 * misalignment inevitable?") and sometimes as evidence on both sides that
 * ends by asking the question again. A question is not an answer, so the
 * Answer text is only the declarative sentences of that context, with the
 * closing question(s) removed. An entry whose context has no declarative
 * sentence is left out: there is nothing honest to put in `acceptedAnswer`.
 *
 * The Answer text is always a verbatim span of the visible fold (Google only
 * accepts FAQ markup for visible content), and it is the map's own context,
 * never a verdict: it names no winner and adds no words.
 */

export interface FaqSourceQuestion {
  title: string;
  content: string;
}

/** Sentence ends: terminal punctuation (plus closing quotes/brackets), then a capital or opening quote. */
const SENTENCE_BREAK = /(?<=[.!?]["”’')\]]*)\s+(?=["“‘'(]?[A-Z0-9])/g;
const ENDS_AS_QUESTION = /\?["”’')\]]*$/;

/**
 * The declarative part of a question's context, or null when the context is
 * only a question (or questions). Returned as a slice of the original text.
 */
export function faqAnswerText(content: string): string | null {
  const text = content.trim();
  // End offset of every sentence, in order.
  const ends = [...text.matchAll(SENTENCE_BREAK)].map((match) => match.index);
  ends.push(text.length);
  let start = 0;
  const sentences = ends.map((end) => {
    const sentence = { end, text: text.slice(start, end).trim() };
    start = end;
    return sentence;
  });
  while (sentences.length > 0 && ENDS_AS_QUESTION.test(sentences[sentences.length - 1].text)) {
    sentences.pop();
  }
  if (sentences.length === 0) return null;
  return text.slice(0, sentences[sentences.length - 1].end).trim();
}

/** The FAQPage JSON-LD for a map's questions, or null when none has an answer. */
export function buildTopicFaqPage(
  questions: ReadonlyArray<FaqSourceQuestion> | undefined,
): Record<string, unknown> | null {
  const entries = (questions ?? []).flatMap((question) => {
    const text = faqAnswerText(question.content);
    return text
      ? [
          {
            "@type": "Question",
            name: question.title,
            acceptedAnswer: { "@type": "Answer", text },
          },
        ]
      : [];
  });
  if (entries.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries,
  };
}
