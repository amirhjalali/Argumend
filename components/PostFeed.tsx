"use client";

import { useMemo, useState } from "react";
import { Sparkles, Settings2 } from "lucide-react";

type FeedPost = {
  id: string;
  score: number;
  title: string;
  authors: string;
  age: string;
  comments: number;
  tag?: string;
};

const feedTabs = [
  { id: "latest", label: "Latest" },
  { id: "enriched", label: "Enriched" },
  { id: "recommended", label: "Recommended" },
];

const featuredPosts: FeedPost[] = [
  {
    id: "welcome",
    score: 502,
    title: "Welcome to ARGUMEND!",
    authors: "Ruby, Raemon, RobertM, habryka",
    age: "6y",
    comments: 76,
    tag: "Pinned",
  },
  {
    id: "misalignment",
    score: 241,
    title: "Natural emergent misalignment from reward hacking",
    authors: "evhub, Monte M, Benjamin Wright, Jonas S",
    age: "3d",
    comments: 31,
    tag: "Enriched",
  },
  {
    id: "colds",
    score: 227,
    title: "How Colds Spread",
    authors: "RobertM",
    age: "7d",
    comments: 27,
  },
  {
    id: "succession",
    score: 210,
    title: "The Memetics of AI Successionism",
    authors: "Jan_Kulveit",
    age: "9d",
    comments: 49,
  },
  {
    id: "solstice",
    score: 55,
    title: "Solstice Season 2025: Ritual Roundup & Megameetups",
    authors: "Raemon",
    age: "23d",
    comments: 12,
    tag: "Events",
  },
  {
    id: "scope",
    score: 367,
    title: "Scope Insensitivity",
    authors: "Eliezer Yudkowsky",
    age: "19y",
    comments: 71,
  },
  {
    id: "alignment",
    score: 244,
    title: "Alignment remains a hard, unsolved problem",
    authors: "evhub",
    age: "8d",
    comments: 52,
  },
  {
    id: "bullshit",
    score: 107,
    title: "Why people like your quick bullshit takes better than high-effort posts",
    authors: "eukaryote",
    age: "22h",
    comments: 10,
  },
  {
    id: "gemini",
    score: 161,
    title: "Gemini 3 is Evaluation-Paranoid and Contaminated",
    authors: "Alice Blair",
    age: "9d",
    comments: 34,
  },
  {
    id: "company-man",
    score: 764,
    title: "The Company Man",
    authors: "Tomás B.",
    age: "2mo",
    comments: 73,
  },
];

export function PostFeed() {
  const [activeTab, setActiveTab] = useState(feedTabs[1].id);

  const posts = useMemo(() => {
    return featuredPosts;
  }, [activeTab]);

  return (
    <section className="hidden lg:flex h-full w-[430px] shrink-0 flex-col border-r border-lw-border/70 bg-white/75 px-6 pb-6 pt-8 backdrop-blur-lg">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted">Feed</p>
          <h2 className="font-serif text-2xl text-primary">Enriched posts curated for you</h2>
        </div>
        <button className="rounded-full border border-lw-border/80 p-2 text-secondary transition hover:text-primary">
          <Settings2 className="h-4 w-4" />
        </button>
      </header>

      <div className="mb-6 flex gap-2">
        {feedTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "border-primary bg-primary text-white"
                : "border-transparent bg-lw-parchment/60 text-secondary hover:border-lw-border/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="flex-1 space-y-1 overflow-y-auto pr-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="group rounded-lg border border-transparent px-3 py-3 transition hover:border-lw-border hover:bg-white"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-semibold text-muted">Score</span>
                <span className="text-xl font-bold text-accent-main">{post.score}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-serif text-lg text-primary">{post.title}</p>
                  {post.tag && (
                    <span className="rounded-full bg-accent-main/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-main">
                      {post.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  {post.authors} • {post.age}
                </p>
              </div>

              <div className="text-right text-xs font-semibold text-muted">
                <p>Discuss</p>
                <p className="text-lg text-primary">{post.comments}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/40">
        <Sparkles className="h-4 w-4" />
        Load more discoveries
      </button>
    </section>
  );
}

