"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Compass,
  Eye,
  HelpCircle,
  Layers,
  ListChecks,
  Users,
  Map,
  GraduationCap,
  Shell,
  Wifi,
  WifiOff,
  Brain,
} from "lucide-react";
import { topics } from "@/data/topics";

function MoltbookStatusIndicator() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/moltbook?action=status")
      .then((res) => res.json())
      .then((data) => setIsConnected(data.connected))
      .catch(() => setIsConnected(false));
  }, []);

  if (isConnected === null) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-stone-100/80">
        <div className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-pulse" />
        <span className="text-[10px] text-stone-400">Moltbook</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${
        isConnected ? "bg-teal-50/80" : "bg-stone-100/80"
      }`}
      title={isConnected ? "Connected to Moltbook" : "Moltbook not configured"}
    >
      {isConnected ? (
        <Wifi className="w-3 h-3 text-teal-600" />
      ) : (
        <WifiOff className="w-3 h-3 text-stone-400" />
      )}
      <span
        className={`text-[10px] ${
          isConnected ? "text-teal-600" : "text-stone-400"
        }`}
      >
        Moltbook
      </span>
    </div>
  );
}

const PRIMARY_NAV = [
  { label: "Home", icon: Compass, href: "/" },
  { label: "How It Works", icon: Map, href: "/how-it-works" },
  { label: "Guides", icon: GraduationCap, href: "/guides" },
  { label: "All Topics", icon: ListChecks, href: "/topics" },
  { label: "Analyze Content", icon: Brain, href: "/analyze" },
  { label: "Concepts", icon: Layers, href: "/concepts" },
  { label: "Perspectives", icon: Eye, href: "/perspectives" },
  { label: "Library", icon: BookOpen, href: "/library" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "Lessons From the Deep", icon: Shell, href: "/lessons-from-the-deep" },
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
  const router = useRouter();

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
          {PRIMARY_NAV.map(({ label, icon: Icon, href }) => {
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

        {/* Divider */}
        <div className="h-px bg-stone-200/50 mb-5" />

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
                        ? "text-stone-900 font-medium border-l-2 border-[#D4A012] pl-[10px]"
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
          <MoltbookStatusIndicator />
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
