import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Educators",
  description:
    "Bring structured argument mapping to your classroom. Ready-made lesson plans, cross-curricular integration, and tools to teach critical thinking through evidence-based debate analysis.",
  alternates: {
    canonical: "https://argumend.org/for-educators",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
