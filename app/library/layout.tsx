import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Resources for deeper exploration: all ARGUMEND topics with confidence scores, plus recommended reading on epistemology, scientific method, and critical thinking.",
  alternates: {
    canonical: "https://argumend.org/library",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
