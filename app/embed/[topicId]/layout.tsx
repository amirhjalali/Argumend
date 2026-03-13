import type { Metadata, Viewport } from "next";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "../../globals.css";

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4f1eb",
};

export const metadata: Metadata = {
  title: "ARGUMEND Embed",
  description: "Embeddable argument summary widget by ARGUMEND",
  robots: { index: false, follow: false },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} antialiased bg-[#f4f1eb] text-primary`}
        style={{ margin: 0, padding: 0, minHeight: "auto" }}
      >
        {children}
      </body>
    </html>
  );
}
