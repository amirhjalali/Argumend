"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Topic } from "@/types/logic";
import {
  LWBookIcon,
  LWCommunityIcon,
  LWListIcon,
  LWQuestionIcon,
  LWSunIcon,
} from "@/components/icons/LessWrongGlyphs";

interface SidebarProps {
  topics: Topic[];
  currentTopicId: string;
  onSelectTopic: (topicId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const iconRail = [
  { label: "Home", icon: LWSunIcon },
  { label: "All Posts", icon: LWListIcon },
  { label: "Library", icon: LWBookIcon },
  { label: "Community", icon: LWCommunityIcon },
  { label: "About", icon: LWQuestionIcon },
];

const primaryNav = ["Home", "All Posts", "Concepts"];

const libraryNav = [
  { label: "Library", variant: "section" as const },
  { label: "Best of LessWrong" },
  { label: "Sequence Highlights" },
  { label: "Rationality: A-Z" },
  { label: "The Codex" },
  { label: "HPMOR" },
];

const communityEvents = [
  { name: "Symbolic Regression, Sparsific...", date: "Thu Dec 4", location: "Online" },
  { name: "Berkeley Solstice Weekend", date: "Fri Dec 5", location: "Berkeley" },
  { name: "12/01/25 Monday Social 7pm-...", date: "Mon Dec 1", location: "Houston" },
  { name: "Freiburg - If Anyone Builds It, ...", date: "Fri Dec 5", location: "Freiburg im Breisgau" },
];

const footerLinks = ["Subscribe (RSS/Email)", "LW the Album", "Leaderboard", "About", "FAQ"];

export function Sidebar(props: SidebarProps) {
  const { isOpen = false, onClose } = props;

  return (
    <>
      <aside className="relative hidden h-full w-[350px] flex-shrink-0 border-r border-[#E3DAC7] bg-[#F6F1E5] lg:flex">
        <SidebarContent {...props} />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/15 backdrop-blur-xs lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[300px] bg-[#F6F1E5] shadow-[12px_0_35px_rgba(17,15,12,0.18)] border-r border-[#E3DAC7] lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              <SidebarContent {...props} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({
  topics,
  currentTopicId,
  onSelectTopic,
  onClose,
}: SidebarProps) {
  const handleTopicSelect = (topicId: string) => {
    onSelectTopic(topicId);
    onClose?.();
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex w-[86px] flex-col items-center gap-4 border-r border-[#E3DAC7] bg-gradient-to-b from-[#FBF7F0] to-[#F2ECE1] py-8">
        {iconRail.map((item) => (
          <button
            type="button"
            key={item.label}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#E4DCCB] bg-white/60 text-[#7B7260] shadow-inner transition hover:bg-white hover:text-[#1E1C19]"
          >
            <item.icon className="h-5 w-5" />
            <span className="sr-only">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col bg-[#F6F1E5]">
        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-8">
          <nav className="space-y-3">
            {primaryNav.map((label) => (
              <button
                type="button"
                key={label}
                className="w-full text-left text-[15px] font-semibold tracking-wide text-[#1F1D1A] transition hover:text-black"
              >
                {label}
              </button>
            ))}
          </nav>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#9C9181]">
              Library
            </p>
            <nav className="space-y-1 text-sm">
              {libraryNav.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  className={`w-full text-left transition ${
                    item.variant === "section"
                      ? "font-semibold text-[#1F1D1A]"
                      : "pl-4 text-[#7F7567] hover:text-[#1F1D1A]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#9C9181]" strokeWidth={1.8} />
              <span className="text-[15px] font-semibold text-[#1F1D1A]">Community Events</span>
            </div>
            <ul className="space-y-3">
              {communityEvents.map((event) => (
                <li key={event.name}>
                  <p className="text-sm font-semibold text-[#1F1D1A] leading-snug">{event.name}</p>
                  <p className="text-xs text-[#8C8374]">
                    {event.date} • {event.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#E4DCCB] pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#9C9181]">
              Logic Maps
            </p>
            <ul className="space-y-2">
              {topics.map((topic) => {
                const isActive = topic.id === currentTopicId;
                return (
                  <li key={topic.id}>
                    <button
                      type="button"
                      onClick={() => handleTopicSelect(topic.id)}
                      className={`w-full text-left text-sm transition ${
                        isActive
                          ? "text-[#1F1D1A] font-semibold"
                          : "text-[#7F7567] hover:text-[#1F1D1A]"
                      }`}
                    >
                      {topic.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-2 text-sm text-[#8C8374]">
            {footerLinks.map((link) => (
              <button
                type="button"
                key={link}
                className="block w-full text-left transition hover:text-[#1F1D1A]"
              >
                {link}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E1D7C6] px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1C1B19] font-serif text-lg text-white">
              N
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1F1D1A]">
                Nebulous
              </p>
              <p className="text-xs text-[#8C8374]">View profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

