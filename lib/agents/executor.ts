/**
 * Agent Executor
 *
 * Unified execution layer that routes agent requests
 * to the appropriate backend based on agent type.
 * Includes retry logic with exponential backoff and
 * graceful degradation for multi-agent scenarios.
 */

import type {
  AgentResponse,
  AgentExecutionRequest,
} from "./types";

/**
 * Retry a function with exponential backoff.
 * Retries on transient errors (429, 503, 500, network) but not on 400/401/403.
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  signal?: AbortSignal,
  maxRetries: number = 2,
  baseDelayMs: number = 1000,
): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      signal?.throwIfAborted();
      const result = await fn();
      signal?.throwIfAborted();
      return result;
    } catch (error) {
      signal?.throwIfAborted();
      lastError = error instanceof Error ? error : new Error(String(error));
      const msg = lastError.message.toLowerCase();

      // Don't retry on auth/validation errors
      const isNonRetryable =
        msg.includes("401") ||
        msg.includes("403") ||
        msg.includes("400") ||
        msg.includes("api key") ||
        msg.includes("environment variable");

      if (isNonRetryable || attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff: 1s, 2s, 4s...
      const delay = baseDelayMs * Math.pow(2, attempt);
      await new Promise<void>((resolve, reject) => {
        const onAbort = () => {
          clearTimeout(timer);
          reject(signal?.reason);
        };
        const timer = setTimeout(() => {
          signal?.removeEventListener("abort", onAbort);
          resolve();
        }, delay);
        signal?.addEventListener("abort", onAbort, { once: true });
      });
    }
  }
  throw lastError;
}

// Lazy initialization to avoid build-time errors
import type Anthropic from "@anthropic-ai/sdk";
import type OpenAI from "openai";
import type { GoogleGenerativeAI } from "@google/generative-ai";

let anthropic: Anthropic | null = null;
let openai: OpenAI | null = null;
let gemini: GoogleGenerativeAI | null = null;

async function getAnthropic(): Promise<Anthropic> {
  if (!anthropic) {
    const AnthropicClass = (await import("@anthropic-ai/sdk")).default;
    anthropic = new AnthropicClass();
  }
  return anthropic;
}

async function getOpenAI(): Promise<OpenAI> {
  if (!openai) {
    const OpenAIClass = (await import("openai")).default;
    openai = new OpenAIClass();
  }
  return openai;
}

async function getGemini(): Promise<GoogleGenerativeAI> {
  if (!gemini) {
    const { GoogleGenerativeAI: GoogleAIClass } = await import("@google/generative-ai");
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable is required"
      );
    }
    gemini = new GoogleAIClass(apiKey);
  }
  return gemini;
}

/**
 * Execute with Claude model (with retry)
 */
async function executeWithClaude(
  systemPrompt: string,
  userPrompt: string,
  signal?: AbortSignal,
): Promise<string> {
  return withRetry(async () => {
    const client = await getAnthropic();
    signal?.throwIfAborted();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }, { signal });

    const textBlock = response.content.find(
      (block) => block.type === "text"
    );
    return textBlock && "text" in textBlock ? textBlock.text : "";
  }, signal);
}

/**
 * Execute with an OpenAI model (with retry)
 */
async function executeWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
  requestedModel: "gpt-4" | "gpt-5",
  signal?: AbortSignal,
): Promise<string> {
  return withRetry(async () => {
    const client = await getOpenAI();
    signal?.throwIfAborted();
    const response = await client.chat.completions.create({
      model: requestedModel === "gpt-5" ? "gpt-5" : "gpt-4o",
      max_tokens: 2048,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }, { signal });

    return response.choices[0]?.message?.content || "";
  }, signal);
}

/**
 * Execute with Gemini model (with retry)
 */
async function executeWithGemini(
  systemPrompt: string,
  userPrompt: string,
  signal?: AbortSignal,
): Promise<string> {
  return withRetry(async () => {
    const client = await getGemini();
    signal?.throwIfAborted();
    const model = client.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Gemini uses a different format - combine system and user prompts
    const fullPrompt = `${systemPrompt}\n\n---\n\n${userPrompt}`;
    const result = await model.generateContent(fullPrompt, { signal });
    const response = await result.response;

    return response.text() || "";
  }, signal);
}

/**
 * Execute with Grok model (with retry)
 */
async function executeWithGrok(
  systemPrompt: string,
  userPrompt: string,
  signal?: AbortSignal,
): Promise<string> {
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
  if (!apiKey) {
    throw new Error(
      "XAI_API_KEY or GROK_API_KEY environment variable is required"
    );
  }

  return withRetry(async () => {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2048,
      }),
      signal,
    });
    signal?.throwIfAborted();

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Grok API error: HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  }, signal);
}

/**
 * Execute with webhook endpoint
 */
async function executeWithWebhook(
  webhookUrl: string,
  systemPrompt: string,
  userPrompt: string,
  timeoutMs: number = 30000,
  signal?: AbortSignal,
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemPrompt,
        userPrompt,
      }),
      signal: signal ? AbortSignal.any([controller.signal, signal]) : controller.signal,
    });
    signal?.throwIfAborted();

    if (!response.ok) {
      throw new Error(`Webhook error: HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.content || data.response || data.text || "";
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Execute an agent request
 */
export async function executeAgent(
  request: AgentExecutionRequest
): Promise<AgentResponse> {
  const { agent, systemPrompt, userPrompt, signal } = request;
  const startTime = Date.now();

  try {
    signal?.throwIfAborted();
    let content: string;

    switch (agent.type) {
      case "local-llm":
        switch (agent.model) {
          case "claude":
            content = await executeWithClaude(systemPrompt, userPrompt, signal);
            break;
          case "gpt-4":
          case "gpt-5":
            content = await executeWithOpenAI(systemPrompt, userPrompt, agent.model, signal);
            break;
          case "gemini":
            content = await executeWithGemini(systemPrompt, userPrompt, signal);
            break;
          case "grok":
            content = await executeWithGrok(systemPrompt, userPrompt, signal);
            break;
          default:
            // Default to Claude
            content = await executeWithClaude(systemPrompt, userPrompt, signal);
        }
        break;

      case "webhook":
        if (!agent.webhookUrl) {
          throw new Error("Webhook URL required for webhook agent type");
        }
        content = await executeWithWebhook(
          agent.webhookUrl,
          systemPrompt,
          userPrompt,
          agent.timeoutMs,
          signal,
        );
        break;

      case "moltbook":
        // Moltbook agents would be handled through the Moltbook API
        // For now, fall back to local execution
        content = await executeWithClaude(systemPrompt, userPrompt, signal);
        break;

      case "custom":
        // Custom agents use the provided system prompt
        content = await executeWithClaude(
          agent.systemPrompt || systemPrompt,
          userPrompt,
          signal,
        );
        break;

      default:
        throw new Error(`Unknown agent type: ${agent.type}`);
    }

    signal?.throwIfAborted();
    return {
      content,
      agentId: agent.id,
      latencyMs: Date.now() - startTime,
    };
  } catch (error) {
    signal?.throwIfAborted();
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      content: "",
      agentId: agent.id,
      latencyMs: Date.now() - startTime,
      error: message,
    };
  }
}

/**
 * Execute multiple agents in parallel
 */
export async function executeAgentsInParallel(
  requests: AgentExecutionRequest[]
): Promise<AgentResponse[]> {
  return Promise.all(requests.map(executeAgent));
}
