import Link from "next/link";

export default function DisagreementNotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-serif text-3xl">Report not found</h1>
      <p className="mt-3 text-[var(--text-secondary)]">This diagnosis is missing or was deleted.</p>
      <Link href="/analyze-v2" className="mt-6 inline-block text-[#C4613C] underline">
        Analyze another disagreement
      </Link>
    </main>
  );
}
