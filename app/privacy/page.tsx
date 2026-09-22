import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalDraftNotice } from "@/components/LegalDraftNotice";
import {
  ANALYZE_JUDGING_PROVIDER_IDS,
  ANALYZE_SOURCE_PROVIDER_IDS,
  ALL_AI_PROVIDER_IDS,
  DIAGNOSIS_PROVIDER_IDS,
  AI_PROVIDERS,
  formatProviderList,
  providers,
} from "@/lib/aiProviders";
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_LAST_UPDATED,
  LEGAL_LAST_UPDATED_LABEL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Argumend collects, what happens to text you paste into the analysis tools, which AI providers receive it, and how long anything is kept. Draft, pending legal review.",
  openGraph: {
    title: "Privacy Policy | ARGUMEND",
    description:
      "What happens to the text you paste into Argumend, which AI providers receive it, and what we store.",
    url: "https://argumend.org/privacy",
  },
  alternates: {
    canonical: "https://argumend.org/privacy",
  },
};

/** Which providers can see which kind of material, for the processor table. */
const PROVIDER_ROLES: Record<string, string> = {
  typesafe: "Disagreement diagnosis and map replies (when that lane is enabled)",
  anthropic:
    "Disagreement diagnosis, live argument extraction, and one seat on the judge council",
  openai: "Judge council only — receives extracted arguments, not your raw text",
  google: "Judge council only — receives extracted arguments, not your raw text",
  xai: "Judge council, only when a request explicitly asks for it",
};

/**
 * Legal pages underline their links permanently. The site's `.link-underline`
 * reveals the rule on hover, which is right for editorial prose and wrong
 * here: on a policy page a visitor has to be able to see, at a glance, which
 * words lead to the provider that will receive their text.
 */
const LINK = "text-deep underline underline-offset-2 hover:text-deep-dark dark:text-deep-light dark:hover:text-stone-200";

function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-8">
      <h2 className="mb-4 font-serif text-2xl sm:text-3xl text-primary dark:text-stone-200">
        {heading}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-secondary dark:text-stone-400">
        {children}
      </div>
    </section>
  );
}

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-stone-300 bg-[#faf8f5] px-4 py-3 text-sm dark:border-[var(--border-default)] dark:bg-[var(--bg-card)] text-secondary dark:text-stone-400">
      <span className="font-semibold text-primary dark:text-stone-200">
        [Pending founder decision]
      </span>{" "}
      {children}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />

        <h1 className="mb-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-primary dark:text-stone-200">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-muted dark:text-stone-500">
          Last updated{" "}
          <time dateTime={LEGAL_LAST_UPDATED}>{LEGAL_LAST_UPDATED_LABEL}</time>
        </p>

        <LegalDraftNotice document="privacy policy" lastUpdated={LEGAL_LAST_UPDATED_LABEL} />

        <Section id="short-version" heading="The short version">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#3a6965]" />
              <span>
                Argumend does not keep the text you paste into its analysis tools. There is no
                column in our database that holds it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#C4613C]" />
              <span>
                When an AI-backed mode is switched on, that text is sent to an outside AI provider.
                We name every provider it can reach below, and all of them process it in the United
                States.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#8B5A3C]" />
              <span>
                We do not remove names or other identifying details from what you paste. Please do
                not paste other people&rsquo;s private information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#a23b3b]" />
              <span>
                You can browse the whole site — every argument map, every topic — without an
                account, and nothing you read is tied to your name.
              </span>
            </li>
          </ul>
        </Section>

        <Section id="pasted-text" heading="Text you paste into Argumend">
          <p>
            Three surfaces accept text from you. They behave differently, and each one tells you
            which mode it is running in before you submit.
          </p>

          <h3 className="pt-2 font-semibold text-primary dark:text-stone-200">
            /analyze — the argument extractor
          </h3>
          <p>
            By default Argumend runs offline: a programmatic parser on our own server reads the
            text, and nothing is sent to any AI model. The badge under the box says so. When live
            analysis is switched on by configuration, the text is sent to{" "}
            {formatProviderList(ANALYZE_SOURCE_PROVIDER_IDS)} for extraction, and the badge changes
            to say that too.
          </p>
          <p>
            Either way we do not store the text itself. When a database is connected, we do store
            the <em>result</em> of the extraction — the topic, a summary, the positions with their
            claims and evidence, the cruxes, any flagged fallacies, and the confidence and strength
            scores. Those fields can contain wording close to your original. Recent results are
            listed publicly at <Link className={LINK} href="/analyses">/analyses</Link>,
            without any link to who submitted them.
          </p>
          <p>
            If you tick &ldquo;Include AI Judgment&rdquo; and live judging is switched on, the
            extracted arguments — not your raw text — go to the judge council:{" "}
            {formatProviderList(ANALYZE_JUDGING_PROVIDER_IDS)}.
          </p>

          <h3 className="pt-2 font-semibold text-primary dark:text-stone-200">
            /analyze-v2 — the disagreement diagnosis
          </h3>
          <p>
            This tool sends your text to an AI provider —{" "}
            {formatProviderList(DIAGNOSIS_PROVIDER_IDS)} — which returns a structured reading of
            it. Argumend holds the text only for as long as the request takes and then discards it;
            the report comes back to your browser. The consent line above the button says the same
            thing at the moment you submit.
          </p>
          <p>
            The report quotes your text. Those quotes are short excerpts checked back against what
            you submitted, and they sit inside the report rather than in a stored copy of the
            source.
          </p>
          <p>
            Publishing a report is a separate, deliberate step. When publishing is configured and
            you press Publish and then confirm, the report and its argument graph — including those
            quotes — are saved and served at an unlisted <code>/d/&lt;id&gt;</code> address that
            anyone with the link can open. Your browser keeps a management key for that report, and
            the delete control on the page uses it to take the report down.
          </p>
          <p>
            If you send feedback on a report (&ldquo;this misrepresents me&rdquo;), we store your
            rating, any correction you type, which section it was about, and a one-way hash of an
            anonymous session identifier so the same browser cannot vote twice. We do not store an
            account or an email with it.
          </p>

          <h3 className="pt-2 font-semibold text-primary dark:text-stone-200">
            Map replies — not live yet
          </h3>
          <p>
            A tool that maps a reply against an existing argument map is in development and
            switched off by default. It carries its own disclosure above its submit button, naming
            TypeSafe AI directly because that is the only company it can reach. It is also the one
            tool here that redacts before it sends: email addresses, phone numbers and @handles are
            replaced with placeholders, and every speaker is renamed &ldquo;Speaker 1&rdquo;,
            &ldquo;Speaker 2&rdquo; and so on. Nothing it produces is written down — no database
            row, no file, no cache.
          </p>

          <h3 className="pt-2 font-semibold text-primary dark:text-stone-200">
            What we do not do to your text
          </h3>
          <p>
            This is about the analysis tools. The map reply tool above is the one exception: it
            replaces email addresses, phone numbers and @handles and renames every speaker before
            it sends anything, which is redaction of the obvious rather than anonymisation —
            prose can identify a person without containing a single handle — so the warning below
            applies to it too.
          </p>
          <p>
            We do not strip names, handles, email addresses, or any other identifier out of what
            you paste. It reaches the provider as you wrote it. So please do not paste other
            people&rsquo;s private information — medical details, contact details, private messages,
            or anything a person would not want a third-party AI company to receive. If you are
            analysing a conversation someone else took part in, remove what identifies them first.
          </p>
        </Section>

        <Section id="providers" heading="Who else sees your text">
          <p>
            Every provider below is an independent company with its own privacy policy and its own
            retention practices. Once your text reaches one of them, their terms — not ours —
            govern what happens to it, including how long they keep it. Not all of them publish a
            retention period.
          </p>
          <div className="overflow-x-auto rounded-xl border border-stone-200/60 dark:border-[var(--border-default)]">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="bg-[#faf8f5] dark:bg-[var(--bg-card)]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-primary dark:text-stone-200">
                    Provider
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-primary dark:text-stone-200">
                    What it can receive
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-primary dark:text-stone-200">
                    Processed in
                  </th>
                </tr>
              </thead>
              <tbody>
                {providers(ALL_AI_PROVIDER_IDS).map((provider) => (
                  <tr
                    key={provider.id}
                    className="border-t border-stone-200/60 align-top dark:border-[var(--border-default)]"
                  >
                    <th scope="row" className="px-4 py-3 font-medium text-primary dark:text-stone-200">
                      <a
                        className={LINK}
                        href={provider.privacyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {provider.name}
                      </a>
                    </th>
                    <td className="px-4 py-3 text-secondary dark:text-stone-400">
                      {PROVIDER_ROLES[provider.id]}
                    </td>
                    <td className="px-4 py-3 text-secondary dark:text-stone-400">
                      {provider.processingRegion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            In full, {AI_PROVIDERS.typesafe.name} is TypeSafe AI, Inc. Which provider a given
            deployment actually calls is a configuration choice; the disclosure shown next to the
            submit button is the one that applies to the run you are about to start.
          </p>
          <p>
            Beyond the AI providers, Argumend is hosted on infrastructure operated by our hosting
            provider, and uses Google Analytics when analytics are configured. Both necessarily see
            the network requests your browser makes.
          </p>
          <Pending>
            Name the hosting provider and any other sub-processor (email, error tracking) here, and
            decide whether a formal sub-processor list with change notice is needed.
          </Pending>
        </Section>

        <Section id="accounts" heading="Accounts and sign-in">
          <p>
            Accounts are optional and are switched off in the default deployment. When they are
            enabled, the only way to sign in is with Google. We then store what Google returns —
            your name, email address, whether the email is verified, and your profile image URL —
            along with the Google account identifier, the OAuth tokens that keep the connection
            alive, and a session record with an expiry.
          </p>
          <p>
            Signed in, you can save topics and subscribe to them. We store the topic identifier and
            the time you saved or subscribed, against your user record. Anonymous topic views are
            counted for the trending list; if you happen to be signed in, that view row carries your
            user identifier, and it is detached if your account is deleted.
          </p>
        </Section>

        <Section id="newsletter" heading="Newsletter">
          <p>
            If you give us your email address, we store the address, which part of the site you
            signed up from, and the times you subscribed and unsubscribed. We use it to send
            Argumend&rsquo;s own updates. We do not sell it or pass it to advertisers.
          </p>
          <Pending>
            There is no self-serve unsubscribe endpoint yet — only a column that records one. Wire
            an unsubscribe link before the first send, and confirm which service will do the
            sending.
          </Pending>
        </Section>

        <Section id="analytics" heading="Analytics and cookies">
          <p>
            When a Google Analytics measurement ID is configured, Argumend loads Google Analytics 4.
            It records page views as you navigate and a small set of product events: a topic
            viewed, a view switched, a node expanded, a share clicked, a newsletter signup, and
            whether an analysis started, finished, or failed.
          </p>
          <p>
            Those events never carry the text you pasted. Length is reported as a coarse bucket,
            response time as a coarse bucket, and a diagnosis contributes only its pattern name and
            the number of positions and cruxes found.
          </p>
          <p>
            Google Analytics sets its own cookies and receives your IP address as part of the
            request; Google&rsquo;s privacy policy governs what it does with them. Signing in sets a
            session cookie. Everything else Argumend remembers about you — your light or dark
            theme, whether the sidebar is open, a report&rsquo;s management key, text handed from
            the home page to the analyzer — is stored in your own browser and never sent to us.
          </p>
          <Pending>
            Argumend does not currently show a cookie banner or ask for analytics consent before
            loading Google Analytics. If the site expects visitors in the EU or the UK, that needs
            to change, and this section needs to describe the choice they are given.
          </Pending>
        </Section>

        <Section id="logs" heading="Server logs, rate limits, and abuse prevention">
          <p>
            To stop one network flooding the analysis tools, we count requests per IP address. That
            counter lives in the memory of the running server, not in a database, and it disappears
            when the server restarts. The diagnosis tool hashes the IP address before using it as a
            counter key, so the raw address is not what is held.
          </p>
          <p>
            Our own request logs record a request identifier, which provider and model answered, the
            prompt version, how long it took, how many characters were submitted, and how many
            quotes failed grounding. They do not record the text. Errors pass through a sanitiser
            that strips credentials and connection strings before anything is written.
          </p>
          <Pending>
            Confirm what the hosting provider retains in its own access logs, and for how long.
          </Pending>
        </Section>

        <Section id="retention" heading="How long we keep things">
          <ul className="space-y-2 pl-5">
            <li className="list-disc">
              <strong className="text-primary dark:text-stone-200">Text you paste:</strong> not
              retained.
            </li>
            <li className="list-disc">
              <strong className="text-primary dark:text-stone-200">Extracted analyses:</strong> kept
              until deleted, when a database is connected.
            </li>
            <li className="list-disc">
              <strong className="text-primary dark:text-stone-200">Published reports:</strong> kept
              until you delete one with your management key, or we remove it.
            </li>
            <li className="list-disc">
              <strong className="text-primary dark:text-stone-200">Account and newsletter data:</strong>{" "}
              kept until the account is deleted or the address unsubscribes.
            </li>
            <li className="list-disc">
              <strong className="text-primary dark:text-stone-200">Analytics:</strong> kept for
              whatever period is set in Google Analytics.
            </li>
          </ul>
          <Pending>
            No automatic deletion job exists for any of the above, and no retention period has been
            chosen. Set one, then replace this section with the schedule.
          </Pending>
        </Section>

        <Section id="rights" heading="Your choices">
          <ul className="space-y-2 pl-5">
            <li className="list-disc">
              Use the offline analyzer, which sends nothing to an AI provider.
            </li>
            <li className="list-disc">Do not paste anything you would not want a third party to read.</li>
            <li className="list-disc">
              Delete a published report yourself, from the report page, in the browser you published
              it from.
            </li>
            <li className="list-disc">
              Ask us for a copy of, or the deletion of, any account or newsletter data we hold, at{" "}
              <a className={LINK} href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
                {LEGAL_CONTACT_EMAIL}
              </a>
              .
            </li>
            <li className="list-disc">
              Block analytics with any standard content blocker; the site works normally without it.
            </li>
          </ul>
          <Pending>
            {LEGAL_CONTACT_EMAIL} is a placeholder and is not yet a working mailbox. Decide the real
            contact route, and decide whether Argumend needs the specific GDPR and CCPA rights
            language (access, portability, erasure, objection, appeal) that this draft does not yet
            contain.
          </Pending>
        </Section>

        <Section id="children" heading="Children">
          <p>
            Argumend is not directed at children and we do not knowingly collect personal
            information from them. If you believe a child has sent us information, write to{" "}
            <a className={LINK} href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
              {LEGAL_CONTACT_EMAIL}
            </a>{" "}
            and we will remove it.
          </p>
          <Pending>Confirm the age threshold that applies to the site&rsquo;s audience.</Pending>
        </Section>

        <Section id="changes" heading="Changes to this policy">
          <p>
            When this policy changes we update the date at the top of the page. If a change means
            your text would reach a provider that is not named here, the disclosure beside the
            submit button changes at the same time — both read from the same list in the source
            code, so one cannot be updated without the other.
          </p>
        </Section>

        <p className="border-t border-stone-200 pt-8 text-sm text-muted dark:border-[var(--border-divider)] dark:text-stone-500">
          See also our <Link className={LINK} href="/terms">Terms of Service</Link> and{" "}
          <Link className={LINK} href="/about">what Argumend is for</Link>.
        </p>
      </div>
    </AppShell>
  );
}
