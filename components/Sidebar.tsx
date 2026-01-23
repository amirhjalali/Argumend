"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Compass,
  Eye,
  HelpCircle,
  Layers,
  ListChecks,
  Users,
  Map,
} from "lucide-react";
import { topics } from "@/data/topics";

const PRIMARY_NAV = [
  { label: "Home", icon: Compass, href: "/" },
  { label: "How It Works", icon: Map, href: "/how-it-works" },
  { label: "All Topics", icon: ListChecks, href: "/topics" },
  { label: "Concepts", icon: Layers, href: "/concepts" },
  { label: "Perspectives", icon: Eye, href: "/perspectives" },
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
    <aside className="relative flex h-full w-[260px] flex-col bg-[#f8f5ef] text-primary border-r border-stone-200/70">

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5">
        {/* Primary Navigation */}
        <nav className="space-y-0.5 pb-5">
          {PRIMARY_NAV.map(({ label, icon: Icon, href }) => {
            const isActive = isActiveRoute(href);
            return (
              <Link
                key={label}
                href={href}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[14px] transition-colors ${
                  isActive
                    ? "bg-stone-100 text-stone-900 font-medium"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
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

        {/* Divider */}
        <div className="h-px bg-stone-200 mb-5" />

        {/* Featured Topics */}
        <section className="pb-5">
          <p className="text-[11px] font-medium text-stone-400 px-3 mb-3 tracking-wide">
            Topics
          </p>

          <ul className="space-y-0.5">
            {topics.map((topic) => {
              const isSelected = currentTopicId === topic.id;
              return (
                <li key={topic.id}>
                  <button
                    onClick={() => handleTopicClick(topic.id)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ${
                      isSelected
                        ? "bg-stone-100 text-stone-900"
                        : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
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
        </section>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-stone-200">
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
          <span className="text-[10px] font-mono text-stone-300">
            v1.0
          </span>
        </div>
      </div>
    </aside>
  );
}
