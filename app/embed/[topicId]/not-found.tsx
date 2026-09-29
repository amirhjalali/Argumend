import { TextAction } from "@/components/ui";

export default function EmbedNotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-64 w-full max-w-[600px] items-center px-4 py-8"
    >
      <section aria-labelledby="embed-not-found-title">
        <p className="label-caps">Preview unavailable</p>
        <h1 id="embed-not-found-title" className="mt-2 font-serif text-xl text-primary dark:text-stone-200">
          This map could not be found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-secondary dark:text-stone-400">
          Check the embed link, or open Argumend to find another map.
        </p>
        <TextAction href="https://argumend.org/topics" target="_blank" rel="noopener noreferrer" className="mt-2">
          Open the maps on Argumend →
        </TextAction>
      </section>
    </main>
  );
}
