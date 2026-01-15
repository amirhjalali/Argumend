"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Compass,
  HelpCircle,
  Layers,
  ListChecks,
  Users,
  ChevronRight,
  Zap,
} from "lucide-react";
import { topics } from "@/data/topics";

const PRIMARY_NAV = [
  { label: "Home", icon: Compass, href: "/" },
  { label: "All Topics", icon: ListChecks, href: "/topics" },
  { label: "Concepts", icon: Layers, href: "/concepts" },
  { label: "Library", icon: BookOpen, href: "/library" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "About", icon: HelpCircle, href: "/about" },
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

  const handleTopicClick = (id: string) => {
    onTopicSelect(id);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="relative flex h-full w-[260px] flex-col bg-gradient-to-b from-[#faf7f2] to-[#f5f1ea] text-primary">
      {/* Subtle right border with gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#e8e0d4] via-[#ddd5c8] to-[#e8e0d4]" />

      {/* Inner shadow for depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_-8px_0_16px_-8px_rgba(0,0,0,0.03)]" />

      <div className="relative flex-1 overflow-y-auto overflow-x-hidden px-5 py-6">
        {/* Primary Navigation */}
        <nav className="space-y-0.5 pb-6">
          {PRIMARY_NAV.map(({ label, icon: Icon, href }) => {
            const isActive = isActiveRoute(href);
            return (
              <Link
                key={label}
                href={href}
                className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#4f7b77]/10 text-[#3d5f5c]"
                    : "text-[#6d645c] hover:bg-[#ebe6de] hover:text-primary"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-[#4f7b77]" />
                )}

                <Icon
                  className={`h-[18px] w-[18px] transition-colors duration-200 ${
                    isActive ? "text-[#4f7b77]" : "text-[#9a918a] group-hover:text-[#6d645c]"
                  }`}
                  strokeWidth={1.8}
                />
                <span className="font-sans">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#ddd5c8] to-transparent mb-6" />

        {/* Featured Topics */}
        <section className="pb-6">
          <div className="flex items-center gap-2 px-3 mb-4">
            <Zap className="h-3.5 w-3.5 text-[#b39664]" strokeWidth={2} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a09689]">
              Featured Topics
            </p>
          </div>

          <ul className="space-y-1">
            {topics.map((topic) => {
              const isSelected = currentTopicId === topic.id;
              return (
                <li key={topic.id}>
                  <button
                    onClick={() => handleTopicClick(topic.id)}
                    className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-[#b39664]/10 text-[#8a7340]"
                        : "text-[#5a5347] hover:bg-[#ebe6de] hover:text-primary"
                    }`}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-[#b39664]" />
                    )}

                    <span className="font-serif text-[15px] tracking-tight flex-1 truncate">
                      {topic.title}
                    </span>

                    {/* Confidence badge */}
                    <span className={`flex-shrink-0 text-[11px] font-mono tabular-nums ${
                      isSelected ? "text-[#b39664]" : "text-[#a09689]"
                    }`}>
                      {topic.confidence_score}%
                    </span>

                    {/* Hover arrow */}
                    <ChevronRight
                      className={`h-3.5 w-3.5 transition-all duration-200 ${
                        isSelected
                          ? "text-[#b39664] opacity-100"
                          : "text-[#a09689] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Footer */}
      <div className="relative px-5 py-4 border-t border-[#e8e0d4] bg-[#f5f1ea]/80">
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-4">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[13px] font-medium text-[#9a918a] hover:text-[#6d645c] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="text-[10px] font-mono text-[#bdb5ab] tracking-wider">
            v1.0
          </span>
        </div>
      </div>
    </aside>
  );
}
