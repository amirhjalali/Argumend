import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concepts",
  description:
    "Understand the key concepts behind ARGUMEND: pillars, cruxes, confidence scores, and verification status. The framework for structured argumentation and evidence-based reasoning.",
  alternates: {
    canonical: "https://argumend.org/concepts",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
