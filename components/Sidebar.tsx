"use client";

import Link from "next/link";
import {
  BookOpen,
  Compass,
  HelpCircle,
  Layers,
  ListChecks,
  Users,
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


  const handleTopicClick = (id: string) => {
    onTopicSelect(id);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <aside
      className="flex h-full w-[240px] flex-col bg-sidebar p-6 text-primary border-r border-stone-200"
    >


      <nav className="space-y-1 pb-8">
        {PRIMARY_NAV.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group flex w-full items-center gap-3 rounded-md px-1 py-2 text-lg font-serif tracking-tight transition-colors text-[#6a5f56] hover:text-primary"
          >
            <Icon className="h-5 w-5 text-inherit" strokeWidth={1.4} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <section className="pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ada395]">
          Featured Topics
        </p>
        <ul className="mt-3 space-y-2 text-base text-[#4e473f]">
          {topics.map((topic) => (
            <li
              key={topic.id}
              className={`cursor-pointer font-serif tracking-tight transition-colors hover:text-primary ${currentTopicId === topic.id ? "text-primary font-medium" : ""
                }`}
              onClick={() => handleTopicClick(topic.id)}
            >
              {topic.title}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-auto pt-6 border-t border-stone-200">
        <ul className="space-y-2 text-sm">
          {FOOTER_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="font-sans tracking-wide text-[#6f655c] hover:text-primary transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
