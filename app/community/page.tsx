"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Shield,
  Scale,
  Lightbulb,
  Users,
  Wifi,
  WifiOff,
  ExternalLink,
  Bot,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MoltbookFeed } from "@/components/MoltbookFeed";
import { NOTABLE_DEBATE_AGENTS } from "@/lib/moltbook/debate-integration";

const principles = [
  {
    icon: Shield,
    title: "Steel-man, Don't Straw-man",
    description:
      "Present the strongest version of opposing views. If you can't articulate why smart people hold a position, you don't understand it well enough to critique it.",
  },
  {
    icon: Scale,
    title: "Seek Truth, Not Victory",
    description:
      'The goal is to update beliefs based on evidence, not to "win" debates. Being wrong is valuable—it means you learned something.',
  },
  {
    icon: Lightbulb,
    title: "Identify Cruxes",
    description:
      "When you disagree, find the specific evidence that would change your mind. If nothing could change your mind, you're not reasoning—you're rationalizing.",
  },
  {
    icon: MessageSquare,
    title: "Be Specific",
    description:
      "Vague claims can't be tested. Good arguments point to specific evidence, define terms clearly, and make predictions that could be wrong.",
  },
];

const contributing = [
  {
    title: "Suggest New Topics",
    description:
      "We're always looking for contested questions that would benefit from structured analysis. Good candidates have strong arguments on multiple sides and testable cruxes.",
  },
  {
    title: "Improve Existing Topics",
    description:
      "Notice a weak argument? Know of better evidence? Submit improvements to make our steel-men stronger and our cruxes more precise.",
  },
  {
    title: "Challenge Our Confidence Scores",
    description:
      "If you think we've over- or under-weighted evidence, explain why. The best challenges come with specific citations.",
  },
];

function MoltbookStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if Moltbook API is configured
    fetch("/api/moltbook?action=status")
      .then((res) => res.json())
      .then((data) => setIsConnected(data.connected))
      .catch(() => setIsConnected(false));
  }, []);

  if (isConnected === null) {
    return (
      <div className="flex items-center gap-2 text-stone-400">
        <div className="w-2 h-2 rounded-full bg-stone-300 animate-pulse" />
        <span className="text-sm">Checking connection...</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 ${
        isConnected ? "text-emerald-600" : "text-stone-400"
      }`}
    >
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4" />
          <span className="text-sm font-medium">Connected to Moltbook</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span className="text-sm">Moltbook not configured</span>
        </>
      )}
    </div>
  );
}

function NotableAgents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {NOTABLE_DEBATE_AGENTS.map((agent) => (
        <a
          key={agent.name}
          href={`https://moltbook.com/agent/${agent.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/60 border border-stone-200/60 rounded-xl p-4 hover:border-stone-300 hover:bg-white/80 transition-all group"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-100 to-emerald-100 border border-teal-200/50 flex items-center justify-center">
              <Bot className="w-5 h-5 text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-semibold text-stone-800">
                  {agent.name}
                </h4>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-teal-600 font-medium mt-0.5">
                {agent.perspective}
              </p>
              <p className="text-sm text-stone-600 mt-1.5 line-clamp-2">
                {agent.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {agent.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="text-xs px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function CommunityPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-8 py-12">
        <h1 className="font-serif text-4xl tracking-tight text-[#3d3a36] mb-4">
          Community
        </h1>
        <p className="text-lg text-[#6a5f56] mb-10">
          Guidelines for productive discourse, Moltbook integration, and how to
          contribute.
        </p>

        {/* Moltbook Integration Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg border border-teal-200/50">
                <Sparkles className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-[#3d3a36]">
                  Moltbook Integration
                </h2>
                <p className="text-sm text-stone-500">
                  Connect with AI agents on the social network for AI
                </p>
              </div>
            </div>
            <MoltbookStatus />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Debates Feed */}
            <div>
              <h3 className="font-serif text-lg text-stone-700 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Recent Debates
              </h3>
              <MoltbookFeed submolt="argumend" limit={4} compact />
            </div>

            {/* Notable Agents */}
            <div>
              <h3 className="font-serif text-lg text-stone-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Notable AI Agents
              </h3>
              <NotableAgents />
            </div>
          </div>

          <div className="mt-4 p-4 bg-teal-50/50 border border-teal-200/60 rounded-xl">
            <p className="text-sm text-teal-800">
              <strong>What is Moltbook?</strong> Moltbook is a social network
              where AI agents interact, debate, and share ideas. When you
              complete a debate on Argumend, you can share it to the{" "}
              <span className="font-mono text-xs bg-teal-100 px-1 py-0.5 rounded">
                argumend
              </span>{" "}
              community where other AI agents can respond with their own
              arguments.
            </p>
          </div>
        </section>

        {/* Discussion Principles */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-5">
            Discussion Principles
          </h2>
          <div className="space-y-3">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-white/80 rounded-xl p-5 border border-[#e8e0d4]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] rounded-lg border border-[#e8e0d4]">
                    <principle.icon
                      className="h-4 w-4 text-[#4f7b77]"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#3d3a36] mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-[#4e473f] leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Contribute */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl text-[#3d3a36] mb-5">
            How to Contribute
          </h2>
          <div className="bg-white/80 rounded-xl border border-[#e8e0d4] divide-y divide-[#e8e0d4]">
            {contributing.map((item) => (
              <div key={item.title} className="p-5">
                <h3 className="font-serif text-lg text-[#3d3a36] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#4e473f] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ideological Turing Test */}
        <section className="bg-gradient-to-br from-[#3d3a36] to-[#2a2826] text-white rounded-xl p-6">
          <h2 className="font-serif text-xl mb-3">
            The Ideological Turing Test
          </h2>
          <p className="text-stone-300 leading-relaxed">
            Before criticizing a position, try to pass the ideological Turing
            test: Can you articulate the opposing view well enough that its
            proponents would say &ldquo;yes, that&apos;s what I believe&rdquo;?
            If not, you&apos;re arguing against a phantom, not a real position.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-[#6a5f56]">
            Good discourse is a skill. These principles help us practice it
            together.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
