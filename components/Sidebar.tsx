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
    <aside className="relative hidden h-full w-[300px] shrink-0 flex-col bg-gradient-to-r from-lw-sand/95 via-lw-veil/80 to-transparent px-8 py-10 text-primary shadow-[inset_-20px_0_35px_rgba(255,255,255,0.35)] backdrop-blur-xl lg:flex">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent via-lw-veil/70 to-transparent" />

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
            className="flex w-full items-start gap-3 rounded-2xl border border-white/20 bg-white/70 px-4 py-3 text-left shadow-lw transition hover:border-primary/30 hover:bg-white"
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

      <section className="mt-8 space-y-3 border-t border-white/40 pt-6">
        {libraryNav.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-white/40 px-4 py-2.5 text-left transition hover:border-primary/30 hover:bg-white/70"
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

      <section className="mt-8 border-t border-white/35 pt-6">
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
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-2 text-left text-sm transition ${
                    isActive
                      ? "border-primary bg-white text-primary shadow-lw"
                      : "border-white/20 bg-white/50 text-secondary hover:border-primary/30 hover:bg-white"
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

      <section className="mt-8 border-t border-white/35 pt-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-secondary">
          <CalendarDays className="h-3 w-3" />
          Community Events
        </div>
        <ul className="space-y-3 text-sm text-secondary">
          {communityEvents.map((event) => (
            <li key={event.name} className="rounded-xl border border-white/30 bg-white/60 px-4 py-2.5 shadow-lw">
              <p className="font-semibold text-primary leading-tight">{event.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-secondary/80">
                {event.date} • {event.location}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-auto border-t border-white/35 pt-6 text-xs text-secondary">
        &copy; 2025 ARGUMEND. Rational discourse infrastructure.
      </div>
    </aside>
  );
}