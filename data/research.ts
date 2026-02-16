// ──────────────────────────────────────────────────────────────
// Research page data — edit citations and sections here;
// the page component reads from these arrays.
// ──────────────────────────────────────────────────────────────

export interface Citation {
  id: string;
  authors: string[];
  title: string;
  source: string; // journal, book, or organization
  year: number;
  url?: string;
  accessDate?: string;
}

export interface ResearchParagraph {
  text: string;
  citationIds: string[];
}

export interface ResearchSection {
  id: string;
  title: string;
  subtitle: string;
  paragraphs: ResearchParagraph[];
}

// ── Citations ────────────────────────────────────────────────

export const citations: Citation[] = [
  {
    id: "pew-2019",
    authors: ["Pew Research Center"],
    title: "Partisan Antipathy: More Intense, More Personal",
    source: "Pew Research Center",
    year: 2019,
    url: "https://www.pewresearch.org/politics/2019/10/10/partisan-antipathy-more-intense-more-personal/",
    accessDate: "2025-12-01",
  },
  {
    id: "pew-2022",
    authors: ["Pew Research Center"],
    title:
      "As Partisan Hostility Grows, Signs of Frustration With the Two-Party System",
    source: "Pew Research Center",
    year: 2022,
    url: "https://www.pewresearch.org/politics/2022/08/09/as-partisan-hostility-grows-signs-of-frustration-with-the-two-party-system/",
    accessDate: "2025-12-01",
  },
  {
    id: "hidden-tribes",
    authors: ["Hawkins, S.", "Yudkin, D.", "Juan-Torres, M.", "Dixon, T."],
    title: "Hidden Tribes: A Study of America's Polarized Landscape",
    source: "More in Common",
    year: 2018,
    url: "https://hiddentribes.us/",
    accessDate: "2025-12-01",
  },
  {
    id: "pew-2024",
    authors: ["Pew Research Center"],
    title: "Changing Partisan Coalitions in a Politically Divided Nation",
    source: "Pew Research Center",
    year: 2024,
    url: "https://www.pewresearch.org/politics/2024/04/09/changing-partisan-coalitions-in-a-politically-divided-nation/",
    accessDate: "2025-12-01",
  },
  {
    id: "vosoughi-2018",
    authors: ["Vosoughi, S.", "Roy, D.", "Aral, S."],
    title: "The spread of true and false news online",
    source: "Science, 359(6380), 1146–1151",
    year: 2018,
    url: "https://www.science.org/doi/10.1126/science.aap9559",
    accessDate: "2025-12-01",
  },
  {
    id: "lewandowsky-2020",
    authors: [
      "Lewandowsky, S.",
      "Cook, J.",
      "Ecker, U. K. H.",
      "et al.",
    ],
    title: "The Debunking Handbook 2020",
    source: "Databrary",
    year: 2020,
    url: "https://digitalcommons.unl.edu/scholcom/245/",
    accessDate: "2025-12-01",
  },
  {
    id: "pariser-2011",
    authors: ["Pariser, E."],
    title: "The Filter Bubble: What the Internet Is Hiding from You",
    source: "Penguin Press",
    year: 2011,
  },
  {
    id: "bakshy-2015",
    authors: ["Bakshy, E.", "Messing, S.", "Adamic, L. A."],
    title:
      "Exposure to ideologically diverse news and opinion on Facebook",
    source: "Science, 348(6239), 1130–1132",
    year: 2015,
    url: "https://www.science.org/doi/10.1126/science.aaa1160",
    accessDate: "2025-12-01",
  },
  {
    id: "who-2019",
    authors: ["World Health Organization"],
    title: "Ten Threats to Global Health in 2019",
    source: "World Health Organization",
    year: 2019,
    url: "https://www.who.int/news-room/spotlight/ten-threats-to-global-health-in-2019",
    accessDate: "2025-12-01",
  },
  {
    id: "kahneman-1974",
    authors: ["Kahneman, D.", "Tversky, A."],
    title: "Judgment under Uncertainty: Heuristics and Biases",
    source: "Science, 185(4157), 1124–1131",
    year: 1974,
    url: "https://www.science.org/doi/10.1126/science.185.4157.1124",
    accessDate: "2025-12-01",
  },
  {
    id: "tetlock-2015",
    authors: ["Tetlock, P. E.", "Gardner, D."],
    title: "Superforecasting: The Art and Science of Prediction",
    source: "Crown Publishers",
    year: 2015,
  },
  {
    id: "galef-2021",
    authors: ["Galef, J."],
    title:
      "The Scout Mindset: Why Some People See Things Clearly and Others Don't",
    source: "Portfolio / Penguin",
    year: 2021,
  },
  {
    id: "fishkin-2018",
    authors: ["Fishkin, J. S."],
    title: "Democracy When the People Are Thinking: Revitalizing Our Politics Through Public Deliberation",
    source: "Oxford University Press",
    year: 2018,
  },
  {
    id: "fishkin-depolarization",
    authors: ["Fishkin, J. S.", "Diamond, L."],
    title: "This Experiment Has Shown How to Reduce Political Polarization",
    source: "Stanford University / America in One Room",
    year: 2019,
    url: "https://cdd.stanford.edu/americainonroom/",
    accessDate: "2025-12-01",
  },
  {
    id: "cook-2023",
    authors: ["Cook, J.", "Lewandowsky, S.", "Ecker, U. K. H."],
    title: "Misinformation and Its Correction: Cognitive Mechanisms and Recommendations for Mass Communication",
    source: "Psychological Science in the Public Interest",
    year: 2023,
  },
];

// ── Sections ─────────────────────────────────────────────────

export const researchSections: ResearchSection[] = [
  {
    id: "polarization-crisis",
    title: "The Polarization Crisis",
    subtitle: "We are not merely disagreeing — we are forgetting how to disagree.",
    paragraphs: [
      {
        text: "In 2019, 79% of Democrats and 83% of Republicans rated the opposing party \"coldly\" — a sharp increase from 61% and 69% just three years earlier. Over half of partisans on each side now view the other party as \"more immoral\" than other Americans.",
        citationIds: ["pew-2019"],
      },
      {
        text: "By 2022, 72% of Republicans and 63% of Democrats said those in the opposing party are more immoral than other Americans — up from 47% and 35% in 2016. Partisan hostility is not only rising; it is accelerating.",
        citationIds: ["pew-2022"],
      },
      {
        text: "Yet beneath this toxic surface lies a more nuanced reality. The Hidden Tribes study, surveying 8,000 Americans, found that 67% belong to an \"Exhausted Majority\" — people who are tired of polarization, hold complex views, and feel they have no voice in the national conversation.",
        citationIds: ["hidden-tribes"],
      },
      {
        text: "The partisan coalitions themselves are shifting. The education gap, the age gap, and the racial composition of each party have all changed dramatically since the 1990s. But the pace of affective polarization — how much we dislike the other side — has outstripped actual policy disagreement.",
        citationIds: ["pew-2024"],
      },
    ],
  },
  {
    id: "information-weaponization",
    title: "Information Weaponization",
    subtitle:
      "Falsehood flies, and the truth comes limping after it.",
    paragraphs: [
      {
        text: "The largest-ever study of online news diffusion, analyzing 126,000 stories spread by 3 million people on Twitter, found that false news reached more people, penetrated deeper into networks, and spread faster than true stories — in every category of information. False political news was the worst offender.",
        citationIds: ["vosoughi-2018"],
      },
      {
        text: "The researchers found that false stories were 70% more likely to be retweeted than true ones. The effect was not driven by bots; it was driven by humans. False news triggered stronger emotions — particularly fear, disgust, and surprise — making it more \"shareable\" than factual reporting.",
        citationIds: ["vosoughi-2018"],
      },
      {
        text: "Correcting misinformation is far harder than spreading it. Research on the \"continued influence effect\" shows that even after a correction is accepted, the original falsehood continues to shape reasoning and memory. A consensus handbook by 22 leading researchers documents the mechanisms and offers evidence-based countermeasures.",
        citationIds: ["lewandowsky-2020"],
      },
    ],
  },
  {
    id: "echo-chambers",
    title: "Echo Chambers & Filter Bubbles",
    subtitle:
      "Algorithms optimize for engagement. Engagement rewards outrage.",
    paragraphs: [
      {
        text: "In 2011, internet activist Eli Pariser coined the term \"filter bubble\" to describe how personalization algorithms create a state of intellectual isolation — where users are primarily exposed to content that confirms their existing worldview, and shielded from perspectives that might challenge it.",
        citationIds: ["pariser-2011"],
      },
      {
        text: "A landmark 2015 study of 10.1 million Facebook users confirmed the effect: the News Feed algorithm reduced exposure to cross-cutting content by roughly 15%, and users' own choices amplified this further — they clicked through to 70% less ideologically diverse content than was available to them.",
        citationIds: ["bakshy-2015"],
      },
      {
        text: "The combined effect of algorithmic curation and human preference creates a feedback loop: platforms serve content that generates engagement, outrage generates engagement, and users become increasingly siloed in ideologically homogeneous information environments.",
        citationIds: ["pariser-2011", "bakshy-2015"],
      },
    ],
  },
  {
    id: "cost-of-bad-arguments",
    title: "The Cost of Bad Arguments",
    subtitle: "Poor epistemics are not an abstract problem — they are a public health crisis.",
    paragraphs: [
      {
        text: "The World Health Organization identified vaccine hesitancy as one of the ten greatest threats to global health in 2019 — before the COVID-19 pandemic amplified the problem. Misinformation about vaccines has proliferated on social media, driving hesitancy faster than interventions can address it.",
        citationIds: ["who-2019"],
      },
      {
        text: "Kahneman and Tversky's foundational research on cognitive biases demonstrated that humans systematically deviate from rational judgment through heuristics like anchoring, availability, and representativeness. These biases are not bugs — they are features of fast, efficient cognition. But in complex policy domains, they lead to predictably poor decisions.",
        citationIds: ["kahneman-1974"],
      },
      {
        text: "The consequences compound. When motivated reasoning meets algorithmic amplification, the result is not just individual error but collective epistemic failure: communities unable to converge on shared facts, institutions stripped of credibility, and democracies struggling to make informed decisions.",
        citationIds: ["kahneman-1974", "vosoughi-2018", "pariser-2011"],
      },
    ],
  },
  {
    id: "what-works",
    title: "What Works",
    subtitle: "The research is clear: structured thinking produces better outcomes.",
    paragraphs: [
      {
        text: "Philip Tetlock's research on forecasting demonstrated that calibrated confidence dramatically improves prediction accuracy. In the Good Judgment Project, ordinary citizens trained in probabilistic thinking outperformed professional intelligence analysts with access to classified information — by 60% in the first year and 78% in the second.",
        citationIds: ["tetlock-2015"],
      },
      {
        text: "Julia Galef's \"Scout Mindset\" framework distinguishes between two epistemic orientations: the \"soldier\" who defends pre-existing beliefs, and the \"scout\" who seeks to build an accurate map of reality. Her research draws on cognitive science to show that the scout mindset — characterized by curiosity, openness to being wrong, and calibrated confidence — leads to systematically better judgments.",
        citationIds: ["galef-2021"],
      },
      {
        text: "Structured deliberation works. Multi-disciplinary research reviews show that when group discussions follow deliberative democracy principles — diverse composition, trained facilitation, and structured interaction — polarization decreases. Stanford's \"America in One Room\" experiment demonstrated measurable depolarization after just a few days of structured discussion among 500+ participants.",
        citationIds: ["fishkin-2018", "fishkin-depolarization"],
      },
    ],
  },
  {
    id: "where-argumend-fits",
    title: "Where Argumend Fits",
    subtitle:
      "We translate research into a tool anyone can use.",
    paragraphs: [
      {
        text: "Argumend implements the evidence-based approaches identified by researchers. Steel-manning — presenting the strongest version of opposing arguments — mirrors the deliberative democracy principle that depolarizes through genuine engagement with the other side. Crux identification forces the kind of structured disagreement that moves debates forward.",
        citationIds: ["fishkin-2018", "galef-2021"],
      },
      {
        text: "Our calibrated confidence scores draw directly from Tetlock's research on superforecasting. Rather than presenting binary conclusions, we estimate uncertainty honestly — because admitting what we don't know is the first step toward knowing more.",
        citationIds: ["tetlock-2015"],
      },
      {
        text: "Source transparency counters the mechanisms that make misinformation sticky. By linking every claim to its evidence, we make it harder for the continued influence effect to take hold — and easier for users to verify, challenge, and update their understanding.",
        citationIds: ["lewandowsky-2020", "vosoughi-2018"],
      },
    ],
  },
];
