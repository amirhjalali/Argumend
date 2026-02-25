import { Metadata } from "next";

export const revalidate = 86400; // ISR: 24 hours

export const metadata: Metadata = {
  title: "Explore Topics",
  description:
    "Browse 38 controversial topics with visual argument maps. Filter by confidence level and status. Steel-manned arguments and crux questions for each.",
  alternates: {
    canonical: "https://argumend.org/topics",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
