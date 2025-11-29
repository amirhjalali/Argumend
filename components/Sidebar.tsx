"use client";

import {
  BookOpen,
  CalendarDays,
  Compass,
  Home,
  Layers3,
  LibraryBig,
  Lightbulb,
  MapPinned,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Topic } from "@/types/logic";

interface SidebarProps {
  topics: Topic[];
  currentTopicId: string;
  onSelectTopic: (topicId: string) => void;
}

type NavItem = {
  label: string;
  description: string;
  icon: LucideIcon;
};

const primaryNav: NavItem[] = [
  {
    label: "Home",
    description: "Personalized frontpage",
    icon: Home,
  },
  {
    label: "All Posts",
    description: "Community firehose",
    icon: Layers3,
  },
  {
    label: "Concepts",
    description: "Core rationality canon",
    icon: Lightbulb,
  },
];

const libraryNav: NavItem[] = [
  {
    label: "Sequences",
    description: "Curated long-form routes",
    icon: LibraryBig,
  },
  {
    label: "Best Of",
    description: "High-signal classics",
    icon: BookOpen,
  },
  {
    label: "Logic Maps",
    description: "Visual blueprints",
    icon: MapPinned,
  },
];

const communityEvents = [
  { name: "Symbolic Regression", date: "Thu Dec 4", location: "Online" },
  { name: "Berkeley Solstice Weekend", date: "Fri Dec 5", location: "Berkeley" },
  { name: "Freiburg Meetup", date: "Mon Dec 1", location: "Freiburg" },
];

export function Sidebar({ topics, currentTopicId, onSelectTopic }: SidebarProps) {
  return (
    <aside className="relative hidden h-full w-[280px] shrink-0 flex-col border-r border-lw-border/70 bg-gradient-to-r from-lw-sand via-lw-veil to-transparent px-6 py-8 text-primary lg:flex">
      <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-r from-transparent via-lw-veil/70 to-transparent pointer-events-none" />

      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white/70 p-3 text-accent-main shadow-lw">
          <Compass className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-primary">ARGUMEND</p>
          <p className="text-[10px] uppercase tracking-[0.35em] text-secondary">Rational Cartography</p>
        </div>
      </div>

      <section className="mt-8 space-y-3">
        {primaryNav.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-start gap-3 rounded-lg border border-transparent bg-white/40 px-3 py-2 text-left shadow-sm transition hover:border-primary/20 hover:bg-white/70"
          >
            <div className="rounded-md bg-white/70 p-2 text-accent-main">
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{item.label}</p>
              <p className="text-xs text-secondary">{item.description}</p>
            </div>
          </button>
        ))}
      </section>

      <section className="mt-8 space-y-3 border-t border-lw-border/70 pt-6">
        {libraryNav.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-start gap-3 rounded-lg border border-transparent px-3 py-2 text-left transition hover:border-primary/20 hover:bg-white/70"
          >
            <div className="rounded-md bg-white/40 p-2 text-secondary">
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">{item.label}</p>
              <p className="text-xs text-muted">{item.description}</p>
            </div>
          </button>
        ))}
      </section>

      <section className="mt-8 border-t border-lw-border/70 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.3em] text-secondary">Logic Maps</p>
          <span className="text-[11px] font-semibold uppercase text-accent-main">Browse</span>
        </div>
        <ul className="space-y-2">
          {topics.map((topic) => {
            const isActive = topic.id === currentTopicId;
            return (
              <li key={topic.id}>
                <button
                  onClick={() => onSelectTopic(topic.id)}
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition ${
                    isActive
                      ? "border-primary bg-white text-primary"
                      : "border-transparent bg-white/40 text-secondary hover:border-lw-border/70 hover:bg-white"
                  }`}
                >
                  <span className="truncate font-semibold">{topic.title}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-muted">view</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-8 border-t border-lw-border/70 pt-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-secondary">
          <CalendarDays className="h-3 w-3" />
          Community Events
        </div>
        <ul className="space-y-3 text-sm text-secondary">
          {communityEvents.map((event) => (
            <li key={event.name} className="rounded-md bg-white/50 px-3 py-2">
              <p className="font-semibold text-primary">{event.name}</p>
              <p className="text-xs uppercase tracking-[0.2em]">
                {event.date} • {event.location}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-auto border-t border-lw-border/70 pt-6 text-xs text-secondary">
        &copy; 2025 ARGUMEND. Rational discourse infrastructure.
      </div>
    </aside>
  );
}