import { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE, DEFAULT_SOCIAL_IMAGE_URL } from "@/lib/og";
import { JsonLd } from "@/components/JsonLd";

const TITLE = "Paste an argument — find what it turns on";
const DESCRIPTION =
  "Paste a conversation, an article or your own draft. Argumend finds the map it is already on, the question it turns on, and the strongest evidence on each side. It never says who is right.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["argument map", "crux finder", "what would change your mind", "disagreement", "debate map"],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://argumend.org/analyze",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
  alternates: {
    canonical: "https://argumend.org/analyze",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to find what an argument turns on with Argumend",
  description:
    "Paste an argument and see which Argumend map it is already on, the question it turns on, and the strongest evidence on each side.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Paste the argument",
      text: "Paste a conversation, an article or your own draft.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "See the map it is on",
      text: "Argumend matches the text against its maps and shows the question the map says it turns on, with what would change a supporter's or a skeptic's mind.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Open the map at that question",
      text: "Open the map to read the strongest evidence on each side. Argumend does not say who is right.",
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={howToJsonLd} />
      {children}
    </>
  );
}
