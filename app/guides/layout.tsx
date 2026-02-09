import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Foundational guides on critical thinking: how to triangulate sources, recognize bias, weigh evidence, and find truth. The art of reasoning well before evaluating any specific topic.",
  alternates: {
    canonical: "https://argumend.org/guides",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
