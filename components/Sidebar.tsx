"use client";

import {
  BookOpen,
  Compass,
  Globe,
  HelpCircle,
  Layers,
  ListChecks,
  Menu,
  Users,
  X,
} from "lucide-react";

const PRIMARY_NAV = [
  { label: "Home", icon: Compass, active: true },
  { label: "All Posts", icon: ListChecks },
  { label: "Concepts", icon: Layers },
  { label: "Library", icon: BookOpen },
  { label: "Community", icon: Users },
  { label: "About", icon: HelpCircle },
];

const LIBRARY_LINKS = [
  "Sequence Highlights",
  "Rationality: A-Z",
  "The Codex",
  "HPMOR",
];

const FOOTER_LINKS = ["Leaderboard", "About", "FAQ"];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const handleOverlayClick = () => {
    if (isOpen) onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/25 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleOverlayClick}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col bg-transparent p-6 text-primary transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-secondary">
            <Menu className="h-4 w-4" />
            Menu
          </div>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-full border border-white/60 bg-white/70 p-2 text-secondary transition hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-1 pb-8">
          {PRIMARY_NAV.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`group flex w-full items-center gap-3 rounded-md px-1 py-2 text-lg font-serif tracking-tight transition-colors focus-visible:outline-none ${
                active ? "text-primary" : "text-[#6a5f56] hover:text-primary"
              }`}
              type="button"
            >
              <Icon className="h-5 w-5 text-inherit" strokeWidth={1.4} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <section className="pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ada395]">
            Library
          </p>
          <ul className="mt-3 space-y-2 text-base text-[#4e473f]">
            {LIBRARY_LINKS.map((link) => (
              <li
                key={link}
                className="cursor-pointer font-serif tracking-tight hover:text-primary"
              >
                {link}
              </li>
            ))}
          </ul>
        </section>

        <hr className="my-6 border-t border-white/20" />

        <ul className="space-y-2 text-sm text-[#4f4a44]">
          {FOOTER_LINKS.map((link) => (
            <li
              key={link}
              className="cursor-pointer font-sans tracking-wide text-[#6f655c] hover:text-primary"
            >
              {link}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

