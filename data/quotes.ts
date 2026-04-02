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
    text: "I cannot teach anybody anything. I can only make them think.",
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
    text: "The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane.",
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
    text: "If you would be a real seeker after truth, it is necessary that at least once in your life you doubt, as far as possible, all things.",
    author: "Rene Descartes",
    role: "Philosopher, Mathematician, 17th century",
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
    text: "Whenever a theory appears to you as the only possible one, take this as a sign that you have neither understood the theory nor the problem which it was intended to solve.",
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
    text: "When you find yourself on the side of the majority, it is time to pause and reflect.",
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
    text: "To know what you know and what you do not know, that is true knowledge.",
    author: "Confucius",
    role: "Philosopher, 5th century BC",
    tag: "perspective",
  },
  {
    text: "Where there is shouting, there is no true knowledge.",
    author: "Leonardo da Vinci",
    role: "Polymath, Renaissance",
    tag: "dialogue",
  },
  {
    text: "You are not entitled to your opinion. You are entitled to your informed opinion. No one is entitled to be ignorant.",
    author: "Harlan Ellison",
    role: "Author, Essayist, 20th century",
    tag: "evidence",
  },
  {
    text: "The measure of intelligence is the ability to change.",
    author: "Albert Einstein",
    role: "Physicist, Nobel Laureate",
    tag: "humility",
  },
  {
    text: "I have no particular talent. I am merely inquisitive.",
    author: "Albert Einstein",
    role: "Physicist, Nobel Laureate",
    tag: "reasoning",
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
