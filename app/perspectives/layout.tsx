import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perspectives — Why You Are Not Your Ideas",
  description:
    "An interactive story about why you are not your ideas. How context, timing, and motivation shape what we see — and why it matters for honest discourse.",
  keywords: ["perspective taking", "cognitive bias", "point of view", "empathy", "discourse", "critical thinking"],
  openGraph: {
    title: "Perspectives — Why You Are Not Your Ideas",
    description: "An interactive story about how context, timing, and motivation shape what we see — and why it matters for honest discourse.",
    url: "https://argumend.org/perspectives",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perspectives — Why You Are Not Your Ideas",
    description: "An interactive story about how context, timing, and motivation shape what we see.",
  },
  alternates: {
    canonical: "https://argumend.org/perspectives",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
