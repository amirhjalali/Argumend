import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { DisagreementReportV1, RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";

const REQUEST_ID = "11111111-1111-1111-1111-111111111111";

/** Runs a fixture through the real pipeline with the fake model lane. */
export async function reportFromFixture(name: string): Promise<DisagreementReportV1> {
  const data = JSON.parse(
    readFileSync(join(process.cwd(), "data/evals/disagreement", `${name}.json`), "utf8"),
  ) as {
    source: string;
    contentType: "conversation" | "article" | "freeform";
    extraction: RawDisagreementExtractionV1;
  };
  const bundle = await analyzeDisagreement({
    content: data.source,
    contentType: data.contentType,
    requestId: REQUEST_ID,
    provider: new FakeDisagreementProvider(structuredClone(data.extraction)),
  });
  return bundle.report;
}
