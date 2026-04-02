import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Educators — Teach Critical Thinking with Argument Maps",
  description:
    "Bring structured argument mapping to your classroom. Ready-made lesson plans, cross-curricular integration, and tools to teach critical thinking through evidence-based debate analysis. Free for IB, AP, and A-Level courses.",
  keywords: [
    "critical thinking lesson plans",
    "argument mapping classroom",
    "debate teaching tools",
    "IB Theory of Knowledge",
    "AP Government resources",
    "evidence-based reasoning education",
    "teach critical thinking",
  ],
  openGraph: {
    title: "For Educators — Teach Critical Thinking with Argument Maps",
    description: "Free lesson plans and tools for teaching critical thinking through structured argument mapping.",
    url: "https://argumend.org/for-educators",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Educators — Teach Critical Thinking",
    description: "Free argument mapping tools and lesson plans for classrooms.",
  },
  alternates: {
    canonical: "https://argumend.org/for-educators",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
