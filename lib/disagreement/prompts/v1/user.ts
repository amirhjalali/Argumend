import type { DisagreementContentType } from "@/types/disagreement";

export function buildDisagreementUserPrompt(input: {
  content: string;
  contentType: DisagreementContentType;
}): string {
  return [
    `Input type: ${input.contentType}`,
    "Extract participants, positions, claims, common ground, and disagreements from the source.",
    "Copy quotes verbatim. Do not invent speakers or opponents.",
    "",
    "<source>",
    input.content,
    "</source>",
  ].join("\n");
}
