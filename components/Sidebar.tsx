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
import { topics } from "@/data/topics";

const PRIMARY_NAV = [
  { label: "Home", icon: Compass, active: true },
  { label: "All Posts", icon: ListChecks },
  { label: "Concepts", icon: Layers },
  { label: "Library", icon: BookOpen },
  { label: "Community", icon: Users },
  { label: "About", icon: HelpCircle },
];

const FOOTER_LINKS = ["Leaderboard", "About", "FAQ"];

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
      className="flex h-full w-[240px] flex-col bg-transparent p-6 text-primary"
    >


      <nav className="space-y-1 pb-8">
        {PRIMARY_NAV.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`group flex w-full items-center gap-3 rounded-md px-1 py-2 text-lg font-serif tracking-tight transition-colors focus-visible:outline-none ${active ? "text-primary" : "text-[#6a5f56] hover:text-primary"
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
          Featured Debates
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
  );
}
