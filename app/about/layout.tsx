import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";
import { JsonLd } from "@/components/JsonLd";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Most arguments are not about what they seem. Why Argumend exists, the three rules it keeps (crux over verdict, never a winner, voluntary before imposed), how to read a map, how maps are made, and how to help.";

export const metadata: Metadata = {
  title: {
    absolute: "About ARGUMEND — why it exists and how to read a map",
  },
  description: DESCRIPTION,
  keywords: ["about argumend", "argument mapping", "crux", "what would change your mind", "disagree better"],
  openGraph: {
    title: "About ARGUMEND — Disagree better.",
    description: DESCRIPTION,
    url: "https://argumend.org/about",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ARGUMEND",
    description: "Maps of hard questions, built around what would change a mind, never around who won.",
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
          headline: "Disagree better.",
          description: DESCRIPTION,
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
