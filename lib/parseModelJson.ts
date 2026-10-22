/**
 * Read a complete JSON value, or the first balanced object/array in provider
 * prose. String contents, including escaped quotes and braces, stay intact.
 * Consumers must still validate the returned value against their schema.
 */
export function parseModelJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    // Providers sometimes add prose or Markdown fences around the payload.
  }

  let start = -1;
  const openings: string[] = [];
  let inString = false;
  let escaped = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (start < 0) {
      if (char !== "{" && char !== "[") continue;
      start = index;
      openings.push(char);
      continue;
    }

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }

    if (char === '"') {
      inString = true;
    } else if (char === "{" || char === "[") {
      openings.push(char);
    } else if (char === "}" || char === "]") {
      const expectedOpening = char === "}" ? "{" : "[";
      // Do not recover a nested fragment from a malformed outer container.
      if (openings.pop() !== expectedOpening) return undefined;
      if (openings.length > 0) continue;
      try {
        return JSON.parse(text.slice(start, index + 1));
      } catch {
        // A balanced prose aside such as {example} can precede the payload.
        start = -1;
      }
    }
  }

  return undefined;
}
