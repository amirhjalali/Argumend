"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
  Compass,
  Eye,
  GraduationCap,
  HelpCircle,
  History,
  Layers,
  ListChecks,
  Map,
  Newspaper,
  Scale,
  Shell,
  Users,
} from "lucide-react";
import { topics } from "@/data/topics";

const PRIMARY_NAV = [
  { label: "Home", icon: Compass, href: "/" },
  { label: "Analyze Text", icon: Brain, href: "/analyze", highlight: true },
  { label: "Recent Analyses", icon: History, href: "/analyses" },
  { label: "Explore Topics", icon: ListChecks, href: "/topics" },
  { label: "How It Works", icon: Map, href: "/how-it-works" },
  { label: "About", icon: HelpCircle, href: "/about" },
];

const LEARN_NAV = [
  { label: "Blog", icon: Newspaper, href: "/blog" },
  { label: "Guides", icon: GraduationCap, href: "/guides" },
  { label: "Concepts", icon: Layers, href: "/concepts" },
  { label: "Perspectives", icon: Eye, href: "/perspectives" },
  { label: "Library", icon: BookOpen, href: "/library" },
  { label: "Lessons From the Deep", icon: Shell, href: "/lessons-from-the-deep" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "For Educators", icon: GraduationCap, href: "/for-educators" },
  { label: "Methodology", icon: Scale, href: "/methodology" },
];

const FOOTER_LINKS = [
  { label: "FAQ", href: "/faq" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopicId: string;
  onTopicSelect: (id: string) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  currentTopicId,
  onTopicSelect,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [learnOpen, setLearnOpen] = useState(false);

  const handleTopicClick = (id: string) => {
    onTopicSelect(id);
    // Navigate to home if not already there
    if (pathname !== "/") {
      router.push("/");
    }
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="relative flex h-full w-[260px] flex-col bg-[#f4f1eb] md:bg-transparent text-primary shadow-lg md:shadow-none">
      {/* Mobile close button - appears at top of sidebar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-stone-200/50">
        <span className="text-sm font-medium text-stone-600">Menu</span>
        <button
          onClick={onClose}
          className="p-2 -m-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5">
        {/* Primary Navigation */}
        <nav className="space-y-0.5 pb-5">
          {PRIMARY_NAV.map(({ label, icon: Icon, href, highlight }) => {
            const isActive = isActiveRoute(href);
            return (
              <Link
                key={label}
                href={href}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[14px] transition-colors ${
                  isActive
                    ? "text-stone-900 font-medium border-l-2 border-stone-800 pl-[10px]"
                    : highlight
                    ? "text-rust-700 hover:text-rust-800 hover:bg-rust-50/50 font-medium"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-50/50"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-stone-700" : highlight ? "text-rust-500" : "text-stone-400"
                  }`}
                  strokeWidth={1.8}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Learn & Explore collapsible section */}
        <div className="pb-5">
          <button
            onClick={() => setLearnOpen(!learnOpen)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-[11px] font-medium text-stone-400 tracking-wide hover:text-stone-600 transition-colors"
          >
            {learnOpen ? (
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.8} />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            )}
            <span>Learn &amp; Explore</span>
          </button>

          {learnOpen && (
            <nav className="mt-0.5 space-y-0.5 pl-3">
              {LEARN_NAV.map(({ label, icon: Icon, href }) => {
                const isActive = isActiveRoute(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[14px] transition-colors ${
                      isActive
                        ? "text-stone-900 font-medium border-l-2 border-stone-800 pl-[10px]"
                        : "text-stone-500 hover:text-stone-800 hover:bg-stone-50/50"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-stone-700" : "text-stone-400"
                      }`}
                      strokeWidth={1.8}
                    />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-200/50 mb-5" />

        {/* Featured Topics (limited to 8) */}
        <section className="pb-5">
          <p className="text-[11px] font-medium text-stone-400 px-3 mb-3 tracking-wide">
            Topics
          </p>

          <ul className="space-y-0.5">
            {topics.slice(0, 8).map((topic) => {
              const isSelected = currentTopicId === topic.id;
              return (
                <li key={topic.id}>
                  <button
                    onClick={() => handleTopicClick(topic.id)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ${
                      isSelected
                        ? "text-stone-900 font-medium border-l-2 border-rust-500 pl-[10px]"
                        : "text-stone-500 hover:text-stone-800 hover:bg-stone-50/50"
                    }`}
                  >
                    <span className="font-serif text-[14px] flex-1 truncate">
                      {topic.title}
                    </span>

                    <span className="flex-shrink-0 text-[11px] font-mono tabular-nums text-stone-400">
                      {topic.confidence_score}%
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {topics.length > 8 && (
            <Link
              href="/topics"
              className="flex items-center gap-1 px-3 mt-2 text-[13px] font-medium text-deep hover:text-deep-dark transition-colors"
            >
              View all {topics.length} topics
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </section>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-stone-200/50 space-y-2">
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-3">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[12px] text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Moltbook paused — re-enable after core product is solid (ENG-25) */}
        </div>
        <div className="text-center">
          <span className="text-[10px] font-mono text-stone-300">
            v1.0
          </span>
        </div>
      </div>
    </aside>
  );
}
