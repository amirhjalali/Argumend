import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyze Arguments — AI Argument Analysis Tool",
  description:
    "Paste any debate, article, or transcript. AI extracts positions, finds cruxes, and scores argument quality with a multi-judge council. Free and transparent analysis.",
  keywords: ["argument analysis tool", "AI debate analysis", "logical fallacy detector", "argument quality score", "crux finder"],
  openGraph: {
    title: "Analyze Arguments — AI Argument Analysis Tool",
    description: "AI extracts positions, finds cruxes, and scores argument quality with a multi-judge council. Free and transparent.",
    url: "https://argumend.org/analyze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analyze Arguments — Free AI Analysis Tool",
    description: "Paste any debate or article. AI finds the cruxes and scores argument quality.",
  },
  alternates: {
    canonical: "https://argumend.org/analyze",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
