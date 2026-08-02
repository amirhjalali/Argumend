import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";

export const metadata: Metadata = {
  title: "Library — Critical Thinking Resources & Reading List",
  description:
    "Resources for deeper exploration: a cross-category argument-map sampler plus recommended reading on epistemology, scientific method, and critical thinking.",
  keywords: ["critical thinking resources", "epistemology reading list", "scientific method books", "argument mapping resources"],
  openGraph: {
    title: "Library — Critical Thinking Resources & Reading List",
    description: "All Argumend topics with evidence balance and weight, plus recommended reading on epistemology, scientific method, and critical thinking.",
    url: "https://argumend.org/library",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Library — Critical Thinking Resources",
    description: "Curated reading list for epistemology, scientific method, and critical thinking.",
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
  alternates: {
    canonical: "https://argumend.org/library",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
