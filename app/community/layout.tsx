import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";

export const metadata: Metadata = {
  title: { absolute: "Community — Join the Argumend Movement" },
  description:
    "Join the ARGUMEND community. Suggest new topics, improve existing arguments, challenge evidence assessments, and practice the art of disagreeing well.",
  keywords: ["critical thinking community", "argument mapping community", "debate community", "evidence-based discourse"],
  openGraph: {
    title: "Community — Join the Argumend Movement",
    description: "Suggest topics, improve arguments, challenge evidence assessments, and practice the art of disagreeing well.",
    url: "https://argumend.org/community",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community — Join the Argumend Movement",
    description: "Practice the art of disagreeing well. Join the Argumend community.",
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
  alternates: {
    canonical: "https://argumend.org/community",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
