"use client";

import { BookOpen, ChevronRight } from "lucide-react";
import { Topic } from "@/types/logic";

interface SidebarProps {
  topics: Topic[];
  currentTopicId: string;
  onSelectTopic: (topicId: string) => void;
}

export function Sidebar({ topics, currentTopicId, onSelectTopic }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col shadow-lw z-20">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-serif font-bold text-primary tracking-tight">
            Argumend
          </h1>
        </div>
        <p className="text-xs text-secondary font-sans uppercase tracking-wider pl-7">
          Rational Discourse
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-6 mb-2">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-muted">
            Topics
          </h2>
        </div>
        <ul className="space-y-1">
          {topics.map((topic) => {
            const isActive = topic.id === currentTopicId;
            return (
              <li key={topic.id}>
                <button
                  onClick={() => onSelectTopic(topic.id)}
                  className={`w-full text-left px-6 py-3 flex items-center justify-between group transition-colors
                    ${
                      isActive
                        ? "bg-gray-50 border-l-4 border-accent-main text-primary font-semibold"
                        : "text-secondary hover:bg-gray-50 hover:text-primary border-l-4 border-transparent"
                    }
                  `}
                >
                  <span className="font-sans text-sm truncate">{topic.title}</span>
                  {isActive && <ChevronRight className="h-4 w-4 text-accent-main" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-100">
        <div className="text-xs text-muted font-sans leading-relaxed">
          &copy; 2025 Argumend.<br />
          Inspired by LessWrong.
        </div>
      </div>
    </aside>
  );
}

