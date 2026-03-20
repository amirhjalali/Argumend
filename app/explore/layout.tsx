import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Topics | Argumend",
  description:
    "Discover and filter topics across policy, technology, science, economics, and philosophy. Search, sort, and explore evidence-based analyses.",
  keywords: [
    "explore topics",
    "argument map browser",
    "filter debates",
    "controversial topics",
    "evidence-based analysis",
    "critical thinking topics",
  ],
  openGraph: {
    title: "Explore Topics | Argumend",
    description:
      "Discover and filter topics across policy, technology, science, economics, and philosophy. Search, sort, and explore evidence-based analyses.",
    url: "https://argumend.org/explore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Topics | Argumend",
    description:
      "Search and filter 60+ controversial topics with visual argument maps and evidence scoring.",
  },
  alternates: {
    canonical: "https://argumend.org/explore",
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
