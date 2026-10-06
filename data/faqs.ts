/**
 * Product questions for /faq and its FAQPage JSON-LD (app/faq/layout.tsx).
 *
 * Only questions about Argumend itself belong here, answered as the product
 * works today. Reference questions ("What is a straw man?") live in the
 * glossary (data/glossaryPageTerms.ts) and the fallacy catalogue
 * (data/fallacies.ts), which own the long explanations. data/faqs.test.ts
 * keeps the list short and fails on retired product vocabulary.
 */
export interface FAQ {
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
}

export const faqs: FAQ[] = [
  {
    question: "What is Argumend?",
    answer:
      "Argumend makes maps of hard questions. Each map sets out the serious positions, the evidence each side reads, and the cruxes: the questions that would move one side or the other if they were answered. It never says who is right. It is a map of the argument, not another place to have one. There is also a paste tool for arguments you are in yourself.",
    linkText: "Browse the maps",
    linkHref: "/topics",
  },
  {
    question: "What is a crux?",
    answer:
      "A crux is the question a fight turns on, and what would settle it. On the map of whether AI will cause mass unemployment, one crux asks: “When AI makes a firm more productive, does it hire fewer people — or just sell more?” Under it, the map says what would settle it: several years of firm-level data linking AI adoption to headcount, output and prices. Some cruxes close with evidence like that; some only when the sides agree on terms or on who decides; and some not at all, because they are about values, and the map says so. A crux is narrower than a big question like “what is the best economic policy?”, which no single finding could answer.",
    linkText: "More on cruxes",
    linkHref: "/concepts/cruxes",
  },
  {
    question: "Why doesn’t Argumend say who is right?",
    answer:
      "Because on most of the questions we map, the fight is not only about facts. Two people can accept every number on a map and still disagree about what matters more, or about what a word means. A verdict would hide that. A map can show which parts of the disagreement evidence could settle, which parts are about values, and the strongest evidence on each side. Where the evidence does point one way, the map says so plainly. It still shows the other side’s best card.",
  },
  {
    question: "How is evidence weighed, and where does it come from?",
    answer:
      "Evidence comes from peer-reviewed research, primary data, official records, expert statements and reputable reporting, and each card names its source. Every card is weighed on four things: how reliable the source is, whether it is independent of the other sources, whether it has been replicated, and how directly it bears on the claim. The same four questions are asked whichever side the card helps, and cards are filed by what they show, not by who cites them. A map shows the cards and their sources, never a score for a card or for a side.",
    linkText: "How maps are made",
    linkHref: "/methodology",
  },
  {
    question:
      "What do “largely converges”, “still divided” and “still thin” mean?",
    answer:
      "They describe the state of the evidence on a map, not the answer to the question. “Largely converges” means there is a lot of good evidence and most of it points one way. “Still divided” means there is a lot of good evidence and it points both ways. “Still thin” means there is not yet enough good evidence to say much, whichever way it leans. In between, a map says which way the evidence leans and that it is moderately evidenced. If a single evidence card could change a map\u2019s reading, the map says so. None of these is the probability that a claim is true, and none is a count of how many experts agree.",
    linkText: "How the older maps read their evidence",
    linkHref: "/methodology#older-maps",
  },
  {
    question: "What does the paste tool do?",
    answer:
      "Paste an argument you are in: a thread, a transcript, an article and its replies. The tool sets out each position, what the sides already agree on, which parts of the disagreement are about facts and which are about values or the meaning of a word, and what the disagreement turns on. It works only from the text you paste. It does not fact-check the claims, guess at anyone’s motives, or say who is right.",
    linkText: "Paste an argument",
    linkHref: "/analyze",
  },
  {
    question: "What happens to the text I paste?",
    answer:
      "It is sent to an AI model to be read, and it is not stored. The line above the button names the provider. The report comes back to your browser. If you choose to publish a report, it is saved at an unlisted link together with the short quotes it uses, and your browser keeps a key that lets you delete it. Please don’t paste private information about other people.",
    linkText: "Privacy",
    linkHref: "/privacy",
  },
  {
    question: "Who makes the maps, and how is AI used?",
    answer:
      "Maps are researched and drafted with help from AI models, then checked against their sources and edited by people before they are published. On most maps, a person scored every evidence card by hand. On the flagship AI maps, the first scores were drafted with a model and every score carries a written reason you can read; a model can also propose that a crux has moved, but nothing reaches the page until a person has reviewed it. The paste tool is different: there, a model reads your text and the report comes straight back to you, which is why it only describes what the text says.",
    linkText: "How maps are made",
    linkHref: "/methodology",
  },
  {
    question: "How are maps kept up to date?",
    answer:
      "Maps are revised when significant new evidence arrives, and each carries the date it was last analyzed or reviewed. The two flagship AI maps, on unemployment and on capitalism, also keep a dated ledger for each crux: what new evidence arrived, and whether it left the question open, narrowed it, resolved it, or showed that evidence alone cannot resolve it.",
    linkText: "Will AI cause mass unemployment?",
    linkHref: "/topics/ai-mass-unemployment",
  },
  {
    question: "Is Argumend biased?",
    answer:
      "The people who make the maps have views, so the method is built to catch them. Every position is stated in its strongest form. Evidence is filed by what it shows rather than by who cites it, and weighed on the same four questions whichever side it helps. When an audit of our own maps found cards filed on the wrong side, we corrected them. Where the evidence does lean one way, the map says so rather than inventing balance. If you think a map is unfair, tell us which card and why.",
    linkText: "Suggest a correction",
    linkHref: "/about#contribute",
  },
  {
    question: "How do I suggest a correction or a new map?",
    answer:
      "Open an issue on Argumend's GitHub; the Contribute section of the About page links to it. For a correction, name the map and the card, say what is wrong (wrong side, weighed too high or too low, out of date, missing) and bring the source. For a new map, the best candidates are questions where serious people disagree and where you can say what evidence would change a mind.",
    linkText: "How to contribute",
    linkHref: "/about#contribute",
  },
  {
    question: "Can I save maps?",
    answer:
      "Yes. The save button on a map keeps it in your browser, on this device, with no account. Your saved maps are listed on the Saved page. They don’t follow you to another device, and clearing this site’s data in your browser removes them.",
    linkText: "Saved maps",
    linkHref: "/saved",
  },
  {
    question: "Is Argumend free?",
    answer:
      "Yes. The maps and the paste tool are free, and you don’t need an account to use either.",
  },
  {
    question: "Can I use Argumend in a classroom?",
    answer:
      "Yes. Students can read a map and name its crux, write down what would change their own mind before reading the evidence, or paste a real argument and see which parts are about facts and which are about values. Browsing needs no account. There are lesson plans and printable worksheets.",
    linkText: "Lesson plans and worksheets",
    linkHref: "/for-educators",
  },
];
