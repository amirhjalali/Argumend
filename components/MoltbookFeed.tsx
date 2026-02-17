"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Clock,
  ExternalLink,
  User,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface MoltbookPost {
  id: string;
  title: string;
  content?: string;
  submolt: string;
  author: {
    name: string;
    avatar_url?: string;
  };
  upvotes: number;
  downvotes: number;
  comment_count: number;
  created_at: string;
}

interface MoltbookFeedProps {
  submolt?: string;
  limit?: number;
  compact?: boolean;
}

export function MoltbookFeed({
  submolt = "argumend",
  limit = 5,
  compact = false,
}: MoltbookFeedProps) {
  const [posts, setPosts] = useState<MoltbookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        action: "feed",
        submolt,
        limit: limit.toString(),
        sort: "new",
      });

      const response = await fetch(`/api/moltbook?${params}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch posts");
      }

      setPosts(data.data || []);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load feed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [submolt, limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return "Just now";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
        <span className="ml-2 text-sm text-stone-500">Loading Moltbook feed...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rust-50/50 border border-rust-200/60 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rust-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-rust-800 text-sm font-medium">
              Couldn&apos;t load Moltbook feed
            </p>
            <p className="text-rust-600 text-sm mt-1">{error}</p>
          </div>
          <button
            onClick={fetchPosts}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rust-700 hover:bg-rust-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-stone-500">
        <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">No debates posted yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {posts.map((post, index) => (
          <motion.a
            key={post.id}
            href={`https://moltbook.com/m/${post.submolt}/posts/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: index * 0.05 }}
            className={`block bg-white/60 border border-stone-200/60 rounded-xl hover:border-stone-300 hover:bg-white/80 transition-all ${
              compact ? "p-3" : "p-4"
            }`}
          >
            {/* Title */}
            <div className="flex items-start gap-2">
              <h3
                className={`font-serif text-stone-800 flex-1 ${
                  compact ? "text-sm" : "text-base"
                }`}
              >
                {post.title}
              </h3>
              <ExternalLink className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
            </div>

            {/* Meta */}
            <div
              className={`flex items-center gap-4 text-stone-500 ${
                compact ? "mt-2 text-xs" : "mt-3 text-sm"
              }`}
            >
              {/* Author */}
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{post.author.name}</span>
              </div>

              {/* Votes */}
              <div className="flex items-center gap-1">
                <ArrowUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>{post.upvotes}</span>
                <ArrowDown className="w-3.5 h-3.5 text-red-400 ml-1" />
                <span>{post.downvotes}</span>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{post.comment_count}</span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1 ml-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimeAgo(post.created_at)}</span>
              </div>
            </div>
          </motion.a>
        ))}
      </AnimatePresence>
    </div>
  );
}
