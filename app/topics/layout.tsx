import { Metadata } from "next";
import { TOPIC_COUNT_LABEL as L } from "@/data/topicIndex";
import { buildGenericOgUrl } from "@/lib/og";

const SOCIAL_IMAGE = buildGenericOgUrl({
  title: "Explore Topics",
  subtitle: `${L} controversial issues analyzed with argument maps`,
});

export const metadata: Metadata = {
  title: `Explore Topics — ${L} Controversial Issues Analyzed`,
  description:
    `Browse ${L} controversial topics with visual argument maps. From AI regulation to climate change, see steel-manned arguments, weighted evidence, and crux questions for each side.`,
  keywords: [
    "controversial topics",
    "argument mapping",
    "both sides of the argument",
    "debate analysis",
    "evidence-based analysis",
    "critical thinking topics",
  ],
  openGraph: {
    title: `Explore ${L} Controversial Topics — Argumend`,
    description: "Visual argument maps for the most debated issues. See both sides, weigh the evidence, find what actually matters.",
    url: "https://argumend.org/topics",
    siteName: "ARGUMEND",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: `Explore ${L} Controversial Topics on Argumend`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Explore ${L} Controversial Topics — Argumend`,
    description: "Visual argument maps for the most debated issues. See both sides.",
    images: [SOCIAL_IMAGE],
  },
  alternates: {
    canonical: "https://argumend.org/topics",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
