import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library — Critical Thinking Resources & Reading List",
  description:
    "Resources for deeper exploration: all ARGUMEND topics with confidence scores, plus recommended reading on epistemology, scientific method, and critical thinking.",
  keywords: ["critical thinking resources", "epistemology reading list", "scientific method books", "argument mapping resources"],
  openGraph: {
    title: "Library — Critical Thinking Resources & Reading List",
    description: "All Argumend topics with confidence scores, plus recommended reading on epistemology, scientific method, and critical thinking.",
    url: "https://argumend.org/library",
  },
  twitter: {
    card: "summary_large_image",
    title: "Library — Critical Thinking Resources",
    description: "Curated reading list for epistemology, scientific method, and critical thinking.",
  },
  alternates: {
    canonical: "https://argumend.org/library",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
