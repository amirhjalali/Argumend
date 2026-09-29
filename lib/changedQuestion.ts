/**
 * The north star's question, asked of the reader about themselves: did
 * seeing what the argument turns on change what they thought it was about?
 *
 * One wording and one set of answers, asked in both places it appears: under
 * "Which question would change your mind?" on every map
 * (components/topic/CruxReflection.tsx) and after a paste result
 * (components/paste/NextStep.tsx). Never graded, never compared with anyone.
 */
export const CHANGED_QUESTION = "Did this change what you thought you were arguing about?";

export const CHANGED_CHOICES = [
  { id: "yes", label: "Yes" },
  { id: "somewhat", label: "A little" },
  { id: "no", label: "No" },
] as const;

export type ChangedAnswer = (typeof CHANGED_CHOICES)[number]["id"];
