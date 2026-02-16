import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Topics", href: "/topics" },
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/guides" },
      { label: "Library", href: "/library" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Research", href: "/research" },
      { label: "Concepts", href: "/concepts" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Methodology", href: "/methodology" },
      { label: "For Educators", href: "/for-educators" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About", href: "/about" },
      { label: "Community", href: "/community" },
      { label: "FAQ", href: "/faq" },
      { label: "Perspectives", href: "/perspectives" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#f4f1eb] border-t border-stone-200">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top section: logo + tagline */}
        <div className="mb-10">
          <Link href="/" className="inline-block">
            <span className="font-serif text-xl font-semibold text-stone-700">
              Argumend
            </span>
          </Link>
          <p className="mt-1.5 text-sm text-stone-400">
            Disagree better.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-medium uppercase tracking-wider text-stone-400">
                {column.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-500 transition-colors duration-200 hover:text-[#4f7b77]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex items-center justify-between border-t border-stone-200 pt-6">
          <p className="text-xs text-stone-400">
            &copy; 2026 Argumend. All rights reserved.
          </p>
          <a
            href="https://github.com/amirhjalali/Argumend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 transition-colors hover:text-stone-800"
            aria-label="Argumend on GitHub"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
