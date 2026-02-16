export interface Quote {
  text: string;
  author: string;
  role: string;
  tag: string;
}

export const quotes: Quote[] = [
  // Already on about page
  {
    text: "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
    author: "Richard Feynman",
    role: "Physicist, Nobel Laureate",
    tag: "humility",
  },
  {
    text: "The ability to destroy your ideas rapidly instead of slowly when the occasion is right is one of the most valuable qualities you can acquire.",
    author: "Charlie Munger",
    role: "Investor, Polymath",
    tag: "humility",
  },
  {
    text: "A wise man proportions his belief to the evidence.",
    author: "David Hume",
    role: "Philosopher, 18th century",
    tag: "evidence",
  },

  // Socrates & Ancient Greek
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    role: "Philosopher, 5th century BC",
    tag: "humility",
  },
  {
    text: "Strong minds discuss ideas, average minds discuss events, weak minds discuss people.",
    author: "Socrates",
    role: "Philosopher, 5th century BC",
    tag: "dialogue",
  },
  {
    text: "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
    author: "Aristotle",
    role: "Philosopher, 4th century BC",
    tag: "open-mindedness",
  },

  // Stoics
  {
    text: "We have two ears and one mouth so that we can listen twice as much as we speak.",
    author: "Epictetus",
    role: "Stoic Philosopher, 1st century",
    tag: "dialogue",
  },
  {
    text: "It is impossible for a man to learn what he thinks he already knows.",
    author: "Epictetus",
    role: "Stoic Philosopher, 1st century",
    tag: "humility",
  },
  {
    text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
    author: "Marcus Aurelius",
    role: "Roman Emperor, Stoic Philosopher",
    tag: "perspective",
  },
  {
    text: "If someone is able to show me that what I think or do is not right, I will happily change. For I seek the truth.",
    author: "Marcus Aurelius",
    role: "Roman Emperor, Stoic Philosopher",
    tag: "humility",
  },
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    role: "Stoic Philosopher, 1st century",
    tag: "reasoning",
  },
  {
    text: "It is not that we have a short time to live, but that we waste a great deal of it on things that do not matter.",
    author: "Seneca",
    role: "Stoic Philosopher, 1st century",
    tag: "reasoning",
  },

  // Enlightenment & Modern Philosophy
  {
    text: "He who knows only his own side of the case knows little of that.",
    author: "John Stuart Mill",
    role: "Philosopher, Economist, 19th century",
    tag: "dialogue",
  },
  {
    text: "The peculiar evil of silencing the expression of an opinion is that it is robbing the human race.",
    author: "John Stuart Mill",
    role: "Philosopher, Economist, 19th century",
    tag: "dialogue",
  },
  {
    text: "In so far as a scientific statement speaks about reality, it must be falsifiable; and in so far as it is not falsifiable, it does not speak about reality.",
    author: "Karl Popper",
    role: "Philosopher of Science, 20th century",
    tag: "evidence",
  },
  {
    text: "True ignorance is not the absence of knowledge, but the refusal to acquire it.",
    author: "Karl Popper",
    role: "Philosopher of Science, 20th century",
    tag: "humility",
  },
  {
    text: "I think we ought always to entertain our opinions with some measure of doubt.",
    author: "Bertrand Russell",
    role: "Philosopher, Logician, Nobel Laureate",
    tag: "humility",
  },
  {
    text: "The fundamental cause of the trouble is that in the modern world the stupid are cocksure while the intelligent are full of doubt.",
    author: "Bertrand Russell",
    role: "Philosopher, Logician, Nobel Laureate",
    tag: "humility",
  },

  // Science & Psychology
  {
    text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    author: "Marie Curie",
    role: "Physicist, Chemist, Nobel Laureate",
    tag: "reasoning",
  },
  {
    text: "A reliable way to make people believe in falsehoods is frequent repetition, because familiarity is not easily distinguished from truth.",
    author: "Daniel Kahneman",
    role: "Psychologist, Nobel Laureate",
    tag: "reasoning",
  },
  {
    text: "Our comforting conviction that the world makes sense rests on a secure foundation: our almost unlimited ability to ignore our ignorance.",
    author: "Daniel Kahneman",
    role: "Psychologist, Nobel Laureate",
    tag: "humility",
  },

  // More modern thinkers
  {
    text: "The test of a first-rate intelligence is the ability to hold two opposing ideas in mind at the same time and still retain the ability to function.",
    author: "F. Scott Fitzgerald",
    role: "Author, 20th century",
    tag: "open-mindedness",
  },
  {
    text: "It ain't what you don't know that gets you into trouble. It's what you know for sure that just ain't so.",
    author: "Mark Twain",
    role: "Author, Humorist, 19th century",
    tag: "humility",
  },
  {
    text: "Doubt is not a pleasant condition, but certainty is absurd.",
    author: "Voltaire",
    role: "Philosopher, Writer, 18th century",
    tag: "humility",
  },
  {
    text: "The eye sees only what the mind is prepared to comprehend.",
    author: "Henri Bergson",
    role: "Philosopher, Nobel Laureate",
    tag: "perspective",
  },
  {
    text: "Where there is shouting, there is no true knowledge.",
    author: "Leonardo da Vinci",
    role: "Polymath, Renaissance",
    tag: "dialogue",
  },
];

/**
 * Get a deterministic quote for a given date.
 * Uses day-of-year to cycle through quotes so each day shows a different one.
 */
export function getQuoteOfTheDay(date: Date = new Date()): Quote {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return quotes[dayOfYear % quotes.length];
}
