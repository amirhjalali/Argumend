import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Guides on critical thinking: how to triangulate sources, recognize bias, weigh evidence, and reason well. Foundations for evaluating any argument.",
  alternates: {
    canonical: "https://argumend.org/guides",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
