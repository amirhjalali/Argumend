import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about ARGUMEND: how confidence scores work, what cruxes are, how topics are chosen, and how structured argument mapping differs from traditional debate.",
  alternates: {
    canonical: "https://argumend.org/faq",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Argumend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Argumend is a platform for exploring controversial topics through structured logical analysis. We break down complex debates into foundational pillars, identify the cruxes where disagreements hinge, and estimate confidence levels based on available evidence.",
      },
    },
    {
      "@type": "Question",
      name: "How are confidence scores calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Confidence scores reflect the weight of evidence and expert consensus on a topic. For curated topics, the confidence score is a weighted composite of all evidence items across the topic\u2019s analytical pillars. Each evidence item is scored on four dimensions\u2014source reliability, independence, replicability, and directness. For user-submitted analyses, the AI judge council assigns strength scores on a 1\u201310 scale based on logical coherence, evidentiary support, and rhetorical quality.",
      },
    },
    {
      "@type": "Question",
      name: "What is a 'crux'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A crux is the specific piece of evidence or test that would resolve a disagreement. If two people disagree about a topic, their crux is the precise question where finding the answer would change one or both of their minds. Identifying cruxes transforms abstract debates into concrete, testable questions.",
      },
    },
    {
      "@type": "Question",
      name: "Why only three pillars per topic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three pillars strike a balance between comprehensiveness and focus. More pillars often overlap or dilute the core arguments. Three forces us to identify the truly foundational considerations\u2014the arguments that, if resolved, would settle the broader question.",
      },
    },
    {
      "@type": "Question",
      name: "How do you choose which topics to cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We prioritize topics that (1) have genuine uncertainty or public controversy, (2) can be broken into testable claims, and (3) benefit from structured analysis. We avoid topics that are purely matters of value or preference, focusing instead on empirical and logical questions.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'steel-manning' mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel-manning is the opposite of straw-manning. Instead of attacking a weak version of an argument, we present the strongest possible version. This ensures intellectual honesty\u2014if we can defeat the best version of an opposing view, our position is much stronger.",
      },
    },
    {
      "@type": "Question",
      name: "Can I suggest a topic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We welcome topic suggestions from the community. Good candidates are claims that (1) have strong arguments on multiple sides, (2) involve empirical or logical questions rather than pure opinion, (3) have testable cruxes, and (4) would benefit from structured breakdown.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from Wikipedia or debate forums?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wikipedia aims for neutral summary; we aim for structured argumentation. Debate forums are adversarial; we seek convergence on truth. Our unique contribution is the pillar/crux framework that forces precision about what evidence would resolve disagreements.",
      },
    },
    {
      "@type": "Question",
      name: "Do you take a side on controversial topics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We report confidence scores based on evidence, which sometimes favors one side. But we always present the strongest version of minority positions. Our goal isn't to declare winners but to clarify where disagreements actually lie and what evidence would settle them.",
      },
    },
    {
      "@type": "Question",
      name: "How does the AI judge council work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you submit text for analysis, we run it through a council of multiple large language models\u2014each acting as an independent judge. Every judge scores the arguments on structured rubrics covering logical strength, evidence quality, and rhetorical fairness. We then aggregate the scores, flag disagreements between judges, and report whether there is consensus.",
      },
    },
    {
      "@type": "Question",
      name: "Is Argumend politically biased?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work hard to avoid political bias. Our methodology is designed around evidence and logical structure, not ideology. Every topic presents the strongest steel-manned version of each position. Confidence scores follow the weight of evidence, which may sometimes align with one political perspective\u2014but that reflects the evidence, not editorial preference.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Argumend in my classroom?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes\u2014we actively encourage educational use. Argumend is a valuable tool for teaching critical thinking, argument analysis, and evidence evaluation. Teachers can use curated topics to illustrate how complex debates decompose into testable claims, or have students submit their own texts for AI-powered analysis.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
}
