import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Explore Topics — 109+ Controversial Issues Analyzed",
  description:
    "Browse 109+ controversial topics with visual argument maps. From AI regulation to climate change, see steel-manned arguments, weighted evidence, and crux questions for each side.",
  keywords: [
    "controversial topics",
    "argument mapping",
    "both sides of the argument",
    "debate analysis",
    "evidence-based analysis",
    "critical thinking topics",
  ],
  openGraph: {
    title: "Explore 109+ Controversial Topics — Argumend",
    description: "Visual argument maps for the most debated issues. See both sides, weigh the evidence, find what actually matters.",
    url: "https://argumend.org/topics",
    siteName: "ARGUMEND",
    images: [
      {
        url: `https://argumend.org/api/og?title=${encodeURIComponent("Explore Topics")}&subtitle=${encodeURIComponent("109+ controversial issues analyzed with argument maps")}`,
        width: 1200,
        height: 630,
        alt: "Explore 109+ Controversial Topics on Argumend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore 109+ Controversial Topics — Argumend",
    description: "Visual argument maps for the most debated issues. See both sides.",
    images: [`https://argumend.org/api/og?title=${encodeURIComponent("Explore Topics")}&subtitle=${encodeURIComponent("109+ controversial issues analyzed with argument maps")}`],
  },
  alternates: {
    canonical: "https://argumend.org/topics",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
