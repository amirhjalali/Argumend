/**
 * Agent Executor
 *
 * Unified execution layer that routes agent requests
 * to the appropriate backend based on agent type.
 * Includes retry logic with exponential backoff and
 * graceful degradation for multi-agent scenarios.
 */

import type {
  AgentConfig,
  AgentResponse,
  AgentExecutionRequest,
} from "./types";

/**
 * Retry a function with exponential backoff.
 * Retries on transient errors (429, 503, 500, network) but not on 400/401/403.
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 2,
  baseDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
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
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

// Lazy initialization to avoid build-time errors
let anthropic: any = null;
let openai: any = null;
let gemini: any = null;

async function getAnthropic() {
  if (!anthropic) {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    anthropic = new Anthropic();
  }
  return anthropic;
}

async function getOpenAI() {
  if (!openai) {
    const OpenAI = (await import("openai")).default;
    openai = new OpenAI();
  }
  return openai;
}

async function getGemini() {
  if (!gemini) {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable is required"
      );
    }
    gemini = new GoogleGenerativeAI(apiKey);
  }
  return gemini;
}

/**
 * Execute with Claude model (with retry)
 */
async function executeWithClaude(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  return withRetry(async () => {
    const client = await getAnthropic();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = response.content.find(
      (block: any) => block.type === "text"
    );
    return textBlock?.text || "";
  });
}

/**
 * Execute with GPT-4 model (with retry)
 */
async function executeWithGPT4(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  return withRetry(async () => {
    const client = await getOpenAI();
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 2048,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    return response.choices[0]?.message?.content || "";
  });
}

/**
 * Execute with Gemini model (with retry)
 */
async function executeWithGemini(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  return withRetry(async () => {
    const client = await getGemini();
    const model = client.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Gemini uses a different format - combine system and user prompts
    const fullPrompt = `${systemPrompt}\n\n---\n\n${userPrompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;

    return response.text() || "";
  });
}

/**
 * Execute with Grok model (with retry)
 */
async function executeWithGrok(
  systemPrompt: string,
  userPrompt: string
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
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Grok API error: HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  });
}

/**
 * Execute with webhook endpoint
 */
async function executeWithWebhook(
  webhookUrl: string,
  systemPrompt: string,
  userPrompt: string,
  timeoutMs: number = 30000
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
      signal: controller.signal,
    });

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
  const { agent, systemPrompt, userPrompt } = request;
  const startTime = Date.now();

  try {
    let content: string;

    switch (agent.type) {
      case "local-llm":
        switch (agent.model) {
          case "claude":
            content = await executeWithClaude(systemPrompt, userPrompt);
            break;
          case "gpt-4":
            content = await executeWithGPT4(systemPrompt, userPrompt);
            break;
          case "gemini":
            content = await executeWithGemini(systemPrompt, userPrompt);
            break;
          case "grok":
            content = await executeWithGrok(systemPrompt, userPrompt);
            break;
          default:
            // Default to Claude
            content = await executeWithClaude(systemPrompt, userPrompt);
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
          agent.timeoutMs
        );
        break;

      case "moltbook":
        // Moltbook agents would be handled through the Moltbook API
        // For now, fall back to local execution
        content = await executeWithClaude(systemPrompt, userPrompt);
        break;

      case "custom":
        // Custom agents use the provided system prompt
        content = await executeWithClaude(
          agent.systemPrompt || systemPrompt,
          userPrompt
        );
        break;

      default:
        throw new Error(`Unknown agent type: ${agent.type}`);
    }

    return {
      content,
      agentId: agent.id,
      latencyMs: Date.now() - startTime,
    };
  } catch (error) {
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
