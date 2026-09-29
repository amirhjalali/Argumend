import { Metadata } from "next";
import { MAP_COUNT_LABEL as L } from "@/data/topicIndex";
import { buildGenericOgUrl } from "@/lib/og";

const SOCIAL_IMAGE = buildGenericOgUrl({
  title: "Maps",
  subtitle: `${L} contested questions, mapped to what they turn on`,
});

const SOCIAL_TITLE = `Maps — ${L} contested questions | ARGUMEND`;
const SOCIAL_DESCRIPTION =
  "Argument maps of contested questions: each side's case, the evidence, and what would settle it.";

export const metadata: Metadata = {
  // A plain string here would reset the root "%s | ARGUMEND" template for
  // every page under /topics/, which is why map titles went out bare. The
  // default is /topics' own title; its children keep the site suffix.
  title: {
    default: `Maps — ${L} contested questions`,
    template: "%s | ARGUMEND",
  },
  description:
    `Browse ${L} argument maps of contested questions, from AI and jobs to climate change: each side's strongest case, the evidence weighed, and the questions the argument turns on.`,
  keywords: [
    "controversial topics",
    "argument mapping",
    "both sides of the argument",
    "debate analysis",
    "evidence-based analysis",
    "critical thinking topics",
  ],
  openGraph: {
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    url: "https://argumend.org/topics",
    siteName: "ARGUMEND",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: `${L} maps of contested questions on Argumend`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  alternates: {
    canonical: "https://argumend.org/topics",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
