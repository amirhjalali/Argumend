import { Metadata } from "next";

export const revalidate = 86400; // ISR: 24 hours

export const metadata: Metadata = {
  title: "Explore Topics — 60+ Controversial Issues Analyzed",
  description:
    "Browse 60+ controversial topics with visual argument maps. From AI regulation to climate change, see steel-manned arguments, weighted evidence, and crux questions for each side.",
  keywords: [
    "controversial topics",
    "argument mapping",
    "both sides of the argument",
    "debate analysis",
    "evidence-based analysis",
    "critical thinking topics",
  ],
  openGraph: {
    title: "Explore 60+ Controversial Topics — Argumend",
    description: "Visual argument maps for the most debated issues. See both sides, weigh the evidence, find what actually matters.",
    url: "https://argumend.org/topics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore 60+ Controversial Topics — Argumend",
    description: "Visual argument maps for the most debated issues. See both sides.",
  },
  alternates: {
    canonical: "https://argumend.org/topics",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
