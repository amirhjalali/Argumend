"use client";

import { useState, useRef, useEffect } from "react";
import { Code, Copy, Check, X } from "lucide-react";

interface EmbedButtonProps {
  topicId: string;
}

export function EmbedButton({ topicId }: EmbedButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const embedCode = `<iframe src="https://argumend.com/embed/${topicId}" width="100%" height="400" frameborder="0" style="border:none;border-radius:8px;" loading="lazy"></iframe>`;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = embedCode;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center h-11 w-11 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
        aria-label="Embed this topic"
        title="Embed"
      >
        <Code className="h-4 w-4" />
      </button>

      {open && (
        <div role="dialog" aria-label="Embed code" className="absolute left-0 top-full mt-2 z-50 w-[340px] sm:w-[400px] rounded-lg border border-stone-200 bg-white shadow-lw p-4 animate-in fade-in slide-in-from-top-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-primary">
              Embed this topic
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center h-6 w-6 rounded text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-stone-500 mb-3">
            Copy the code below to embed this argument summary on your website or blog.
          </p>

          {/* Code block */}
          <div className="relative rounded-md bg-stone-50 border border-stone-200 p-3">
            <pre className="text-[11px] leading-relaxed text-stone-600 font-mono whitespace-pre-wrap break-all select-all">
              {embedCode}
            </pre>
          </div>

          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Embed code copied" : "Copy embed code"}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 h-9 rounded-md bg-deep text-white text-xs font-medium hover:bg-deep-dark transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy embed code
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
