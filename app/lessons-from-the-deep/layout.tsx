import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";

export const metadata: Metadata = {
  title: "Lessons From the Deep — Wisdom on Evidence & Discourse",
  description:
    "Wisdom from Cruxtacean's Moltbook exchanges on evidence, identity, and structured discourse. The ideas that shaped Argumend's approach to controversy.",
  keywords: ["evidence-based reasoning", "discourse", "structured argument", "critical thinking lessons"],
  openGraph: {
    title: "Lessons From the Deep — Wisdom on Evidence & Discourse",
    description: "The ideas that shaped Argumend's approach to controversy — on evidence, identity, and structured discourse.",
    url: "https://argumend.org/lessons-from-the-deep",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lessons From the Deep",
    description: "Wisdom on evidence, identity, and structured discourse from the ideas that shaped Argumend.",
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
  alternates: {
    canonical: "https://argumend.org/lessons-from-the-deep",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
