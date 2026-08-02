import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";
import { JsonLd } from "@/components/JsonLd";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "About ARGUMEND — Our Mission to Transform How People Disagree",
  },
  description:
    "ARGUMEND maps controversial topics visually with steel-manned arguments, crux identification, and two-axis balance and weight scoring. Learn about our mission to transform how people disagree.",
  keywords: ["about argumend", "argument mapping platform", "critical thinking tool", "evidence-based reasoning"],
  openGraph: {
    title: "About ARGUMEND — Our Mission",
    description: "We map controversial topics visually so you can see both sides, weigh the evidence, and find what matters.",
    url: "https://argumend.org/about",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ARGUMEND",
    description: "Our mission to transform how people disagree — with evidence, not volume.",
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
  alternates: {
    canonical: "https://argumend.org/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Argumend",
          headline: "About ARGUMEND",
          description:
            "ARGUMEND maps controversial topics visually with steel-manned arguments, crux identification, and two-axis balance and weight scoring.",
          url: "https://argumend.org/about",
          mainEntity: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
          },
        }}
      />
    </>
  );
}
