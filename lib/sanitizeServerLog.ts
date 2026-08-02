const REDACTED = "[redacted]";
const REDACTED_DATABASE_URL = "[redacted database URL]";

const SENSITIVE_KEY =
  /^(?:api[_-]?key|access[_-]?token|auth(?:orization)?|bearer|client[_-]?secret|password|secret|token)$/i;

function stringifyUnknown(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.message;
  if (value === null || value === undefined) return String(value);
  if (typeof value !== "object") return String(value);

  const seen = new WeakSet<object>();
  try {
    return JSON.stringify(value, (key, nested) => {
      if (key && SENSITIVE_KEY.test(key)) return REDACTED;
      if (typeof nested === "bigint") return nested.toString();
      if (nested instanceof Error) {
        return {
          name: nested.name,
          message: nested.message,
        };
      }
      if (nested && typeof nested === "object") {
        if (seen.has(nested)) return "[circular]";
        seen.add(nested);
      }
      return nested;
    });
  } catch {
    return Object.prototype.toString.call(value);
  }
}

/**
 * Convert an unknown diagnostic value to useful text while removing common
 * server credentials. This is for logs only; it does not shape API responses.
 */
export function sanitizeServerLog(value: unknown): string {
  return stringifyUnknown(value)
    // Drizzle includes bound values after a `params:` marker. Those values can
    // contain private analysis/debate text even though the SQL itself is safe
    // to retain for diagnosis.
    .replace(/(\nparams:\s*)[^\n]*/gi, `$1${REDACTED}`)
    .replace(/\bpostgres(?:ql)?:\/\/[^\s"'<>]+/gi, REDACTED_DATABASE_URL)
    .replace(
      /(\bAuthorization\s*[:=]\s*)(?:(?:Bearer|Basic)\s+)?[^\s,"';}]+/gi,
      `$1${REDACTED}`,
    )
    .replace(/\bBearer\s+[A-Za-z0-9._~+/=-]+/gi, `Bearer ${REDACTED}`)
    .replace(
      /(["']?(?:api[_-]?key|access[_-]?token|client[_-]?secret|password|secret|token)["']?\s*[:=]\s*["']?)([^\s,"';}]+)/gi,
      `$1${REDACTED}`,
    )
    .replace(
      /\b(?:sk-(?:ant-api\d{2}-|proj-)?|xai-|ghp_|github_pat_|glpat-)[A-Za-z0-9_-]{16,}\b/g,
      REDACTED,
    )
    .replace(/\bAIza[A-Za-z0-9_-]{20,}\b/g, REDACTED)
    .replace(/\bAKIA[0-9A-Z]{16}\b/g, REDACTED);
}
