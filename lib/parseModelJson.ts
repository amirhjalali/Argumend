/**
 * Read a complete JSON value, an explicit JSON fence, or the first balanced
 * object/array in provider prose. String contents stay intact.
 * Consumers must still validate the returned value against their schema.
 */
export function parseModelJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    // Providers sometimes add prose or Markdown fences around the payload.
  }

  // A leading container is already the payload, even if prose follows it.
  // Otherwise an explicit JSON block outranks incidental examples in prose.
  if (!/^[\s]*[\[{]/.test(text)) {
    const fence = /(?:^|\n)[ \t]*(`{3,})[ \t]*json[ \t]*\r?(?:\n|$)/i.exec(text);
    if (fence) {
      const contents = text.slice(fence.index + fence[0].length);
      const closing = new RegExp("^[ \\t]*`{" + fence[1].length + ",}[ \\t]*\\r?$", "m").exec(contents);
      if (!closing) return undefined;
      try {
        return JSON.parse(contents.slice(0, closing.index));
      } catch {
        // A malformed authoritative block must not reveal a later fragment.
        return undefined;
      }
    }
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
