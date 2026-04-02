"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
  Compass,
  Eye,
  FileText,
  GraduationCap,
  HelpCircle,
  History,
  LayoutDashboard,
  Layers,
  ListChecks,
  Map,
  Network,
  Newspaper,
  Scale,
  Shell,
  Users,
} from "lucide-react";
import { topicSummaries } from "@/data/topicIndex";
import { TrendingTopics } from "@/components/TrendingTopics";
import { ThemeToggle } from "@/components/ThemeToggle";

const PRIMARY_NAV = [
  { label: "Home", icon: Compass, href: "/" },
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", noPrefetch: true },
  { label: "Analyze Text", icon: Brain, href: "/analyze", highlight: true },
  { label: "Recent Analyses", icon: History, href: "/analyses", noPrefetch: true },
  { label: "Explore Topics", icon: ListChecks, href: "/topics" },
  { label: "Compare Topics", icon: ArrowLeftRight, href: "/topics/compare" },
  { label: "Explore Map", icon: Network, href: "/explore" },
  { label: "How It Works", icon: Map, href: "/how-it-works" },
  { label: "About", icon: HelpCircle, href: "/about" },
];

const LEARN_NAV = [
  { label: "Blog", icon: Newspaper, href: "/blog" },
  { label: "Research", icon: FileText, href: "/research" },
  { label: "Guides", icon: GraduationCap, href: "/guides" },
  { label: "Concepts", icon: Layers, href: "/concepts" },
  { label: "Perspectives", icon: Eye, href: "/perspectives" },
  { label: "Library", icon: BookOpen, href: "/library" },
  { label: "Lessons From the Deep", icon: Shell, href: "/lessons-from-the-deep" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "For Educators", icon: GraduationCap, href: "/for-educators" },
  { label: "Methodology", icon: Scale, href: "/methodology" },
  { label: "Glossary", icon: BookOpen, href: "/glossary" },
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
    <nav aria-label="Main navigation" className="relative flex h-full w-[260px] flex-col bg-[#f4f1eb] dark:bg-[#1a1917] md:bg-transparent text-primary shadow-lg md:shadow-none">
      {/* Mobile close button - appears at top of sidebar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-stone-200/50 dark:border-[#3d3a36]/50">
        <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Menu</span>
        <button
          onClick={onClose}
          className="flex items-center justify-center h-11 w-11 -mr-2 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#302e2a] transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5">
        {/* Primary Navigation */}
        <div className="space-y-0.5 pb-5" role="list" aria-label="Primary navigation">
          {PRIMARY_NAV.map(({ label, icon: Icon, href, highlight, noPrefetch }) => {
            const isActive = isActiveRoute(href);
            return (
              <Link
                key={label}
                href={href}
                prefetch={noPrefetch ? false : undefined}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 min-h-[44px] text-[14px] transition-colors ${
                  isActive
                    ? "text-stone-900 dark:text-stone-100 font-medium border-l-2 border-stone-800 dark:border-stone-200 pl-[10px]"
                    : highlight
                    ? "text-rust-700 dark:text-rust-400 hover:text-rust-800 dark:hover:text-rust-300 hover:bg-rust-50/50 dark:hover:bg-rust-900/30 font-medium"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50/50 dark:hover:bg-[#302e2a]/50"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-stone-700 dark:text-stone-300" : highlight ? "text-rust-500 dark:text-rust-400" : "text-stone-400"
                  }`}
                  strokeWidth={1.8}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Trending This Week */}
        <TrendingTopics />

        {/* Learn & Explore collapsible section */}
        <div className="pb-5">
          <button
            onClick={() => setLearnOpen(!learnOpen)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 min-h-[44px] text-[11px] font-medium text-stone-400 tracking-wide hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
            aria-expanded={learnOpen}
            aria-controls="learn-explore-menu"
            aria-label="Learn & Explore"
          >
            {learnOpen ? (
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.8} />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            )}
            <span>Learn &amp; Explore</span>
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-200 ease-out ${
              learnOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div id="learn-explore-menu" className="mt-0.5 space-y-0.5 pl-3 overflow-hidden" role="list" aria-label="Learn & Explore">
              {LEARN_NAV.map(({ label, icon: Icon, href }) => {
                const isActive = isActiveRoute(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    tabIndex={learnOpen ? 0 : -1}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 min-h-[44px] text-[14px] transition-colors ${
                      isActive
                        ? "text-stone-900 dark:text-stone-100 font-medium border-l-2 border-stone-800 dark:border-stone-200 pl-[10px]"
                        : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50/50 dark:hover:bg-[#302e2a]/50"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-stone-700 dark:text-stone-300" : "text-stone-400"
                      }`}
                      strokeWidth={1.8}
                    />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-200/50 dark:bg-[#3d3a36]/50 mb-5" />

        {/* Featured Topics (limited to 8) */}
        <section className="pb-5" aria-labelledby="sidebar-topics-heading">
          <h2 id="sidebar-topics-heading" className="text-[11px] font-medium text-stone-400 px-3 mb-3 tracking-wide">
            Topics
          </h2>

          <ul className="space-y-0.5">
            {topicSummaries.slice(0, 8).map((topic) => {
              const isSelected = currentTopicId === topic.id;
              return (
                <li key={topic.id}>
                  <button
                    onClick={() => handleTopicClick(topic.id)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2.5 min-h-[44px] text-left transition-colors ${
                      isSelected
                        ? "text-stone-900 dark:text-stone-100 font-medium border-l-2 border-rust-500 pl-[10px]"
                        : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50/50 dark:hover:bg-[#302e2a]/50"
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

          {topicSummaries.length > 8 && (
            <Link
              href="/topics"
              className="flex items-center gap-1 px-3 py-2.5 min-h-[44px] mt-1 text-[13px] font-medium text-deep hover:text-deep-dark transition-colors"
            >
              View all {topicSummaries.length} topics
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </section>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-stone-200/50 dark:border-[#3d3a36]/50 space-y-2">
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-3">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[12px] text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
        <div className="text-center">
          <span className="text-[10px] font-mono text-stone-500">
            v1.0
          </span>
        </div>
      </div>
    </nav>
  );
}
