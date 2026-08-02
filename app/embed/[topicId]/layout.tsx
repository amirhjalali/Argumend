import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1917" },
  ],
};

export const metadata: Metadata = {
  title: "Embed",
  description: "Embeddable argument summary widget by ARGUMEND",
  robots: { index: false, follow: false },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-0 bg-canvas text-primary dark:text-stone-200 dark:bg-[#1a1917]"
      style={{ colorScheme: "light dark" }}
    >
      {children}
    </div>
  );
}
