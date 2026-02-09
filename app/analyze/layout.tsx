import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyze Arguments",
  description:
    "Paste any debate, article, or transcript. AI extracts positions, finds cruxes, and scores argument quality with a multi-judge council. Free and transparent analysis.",
  alternates: {
    canonical: "https://argumend.org/analyze",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
