import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Critical Thinking Guides — Learn to Evaluate Arguments & Evidence",
  description:
    "Six in-depth guides on critical thinking: triangulation, bias recognition, evidence hierarchy, argument mapping, source credibility, and AI analysis. Build the reasoning skills to evaluate any claim.",
  keywords: [
    "critical thinking guides",
    "how to evaluate evidence",
    "triangulation sources",
    "cognitive bias guide",
    "evidence hierarchy",
    "argument mapping tutorial",
    "source credibility",
    "reasoning skills",
    "logic and reasoning",
    "evaluate arguments",
  ],
  alternates: {
    canonical: "https://argumend.org/guides",
  },
  openGraph: {
    title: "Critical Thinking Guides — Argumend",
    description:
      "Six in-depth guides on triangulation, bias, evidence hierarchy, argument maps, source credibility, and AI analysis. Build reasoning skills that last.",
    url: "https://argumend.org/guides",
    type: "website",
    siteName: "ARGUMEND",
  },
  twitter: {
    card: "summary_large_image",
    title: "Critical Thinking Guides — Argumend",
    description:
      "Six in-depth guides on triangulation, bias, evidence hierarchy, argument maps, source credibility, and AI analysis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
