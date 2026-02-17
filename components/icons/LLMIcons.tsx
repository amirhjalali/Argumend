/**
 * Brand-accurate SVG icons for AI model providers.
 *
 * Issue #8: Extracted from DebateView.tsx:13-43
 */

import type { LLMModel } from "@/types/logic";

export interface LLMIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ClaudeIcon({ className, style }: LLMIconProps) {
  // Claude's starburst logo - using official PNG
  return (
    <img
      src="/icons/claude.png"
      alt="Claude"
      className={className}
      style={{ width: "1em", height: "1em", ...style }}
    />
  );
}

export function OpenAIIcon({ className, style }: LLMIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

export function GeminiIcon({ className, style }: LLMIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12" />
    </svg>
  );
}

export function GrokIcon({ className, style }: LLMIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M13.982 10.622 20.54 3h-1.554l-5.693 6.618L8.745 3H3.5l6.876 10.007L3.5 21h1.554l6.012-6.989L15.868 21h5.245l-7.131-10.378Zm-2.128 2.474-.697-.997-5.543-7.93H8l4.474 6.4.697.996 5.815 8.318h-2.387l-4.745-6.787Z" />
    </svg>
  );
}

/**
 * Configuration for each LLM option.
 */
export interface LLMOption {
  id: LLMModel;
  name: string;
  fullName: string;
  color: string;
  bgLight: string;
  Icon: React.FC<LLMIconProps>;
}

/**
 * All available LLM options with their styling configuration.
 */
export const LLM_OPTIONS: LLMOption[] = [
  {
    id: "claude",
    name: "Claude",
    fullName: "Claude Sonnet 4",
    color: "#C4613C",
    bgLight: "#fdf5f2",
    Icon: ClaudeIcon,
  },
  {
    id: "gpt-4",
    name: "GPT-4o",
    fullName: "GPT-4o",
    color: "#10B981",
    bgLight: "#D1FAE5",
    Icon: OpenAIIcon,
  },
  {
    id: "gemini",
    name: "Gemini",
    fullName: "Gemini 1.5 Pro",
    color: "#4285F4",
    bgLight: "#DBEAFE",
    Icon: GeminiIcon,
  },
  {
    id: "grok",
    name: "Grok",
    fullName: "Grok 2 Latest",
    color: "#1C1C1E",
    bgLight: "#E5E5E5",
    Icon: GrokIcon,
  },
];

/**
 * Get LLM option by model ID.
 */
export function getLLMOption(modelId: LLMModel): LLMOption | undefined {
  return LLM_OPTIONS.find((llm) => llm.id === modelId);
}

/**
 * Get the icon component for a model ID with fallback to Claude.
 */
export function getLLMIcon(modelId: LLMModel): React.FC<LLMIconProps> {
  return getLLMOption(modelId)?.Icon ?? ClaudeIcon;
}

/**
 * Stable component that renders the correct icon for a model ID.
 * Use this instead of getLLMIcon() during render to avoid
 * react-compiler "Cannot create components during render" errors.
 */
export function LLMIconRenderer({
  modelId,
  className,
  style,
}: LLMIconProps & { modelId: LLMModel }) {
  const option = getLLMOption(modelId);
  if (!option) return <ClaudeIcon className={className} style={style} />;

  switch (option.id) {
    case "claude":
      return <ClaudeIcon className={className} style={style} />;
    case "gpt-4":
      return <OpenAIIcon className={className} style={style} />;
    case "gemini":
      return <GeminiIcon className={className} style={style} />;
    case "grok":
      return <GrokIcon className={className} style={style} />;
    default:
      return <ClaudeIcon className={className} style={style} />;
  }
}
