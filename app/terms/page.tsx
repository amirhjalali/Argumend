import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalDraftNotice } from "@/components/LegalDraftNotice";
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_LAST_UPDATED,
  LEGAL_LAST_UPDATED_LABEL,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using Argumend: what the service does and does not claim, acceptable use, what happens to text you submit, and the limits of what we warrant. Draft, pending legal review.",
  openGraph: {
    title: "Terms of Service | ARGUMEND",
    description:
      "What Argumend does and does not claim, acceptable use, and the limits of what we warrant.",
    url: "https://argumend.org/terms",
  },
  alternates: {
    canonical: "https://argumend.org/terms",
  },
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

export default function TermsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />

        <h1 className="mb-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-primary dark:text-stone-200">
          Terms of Service
        </h1>
        <p className="mb-8 text-sm text-muted dark:text-stone-500">
          Last updated{" "}
          <time dateTime={LEGAL_LAST_UPDATED}>{LEGAL_LAST_UPDATED_LABEL}</time>
        </p>

        <LegalDraftNotice document="set of terms" lastUpdated={LEGAL_LAST_UPDATED_LABEL} />

        <Section id="agreement" heading="Using Argumend means accepting these terms">
          <p>
            {SITE_NAME} is operated from argumend.org. By using the site — reading a map, running an
            analysis, saving a topic, subscribing to the newsletter — you accept these terms. If you
            do not accept them, please do not use the site.
          </p>
        </Section>

        <Section id="service" heading="What the service is">
          <p>
            Argumend maps disagreements. It lays out the positions people hold, the evidence each
            one rests on, where the two sides genuinely diverge, and what would have to be true for
            someone to change their mind. Some maps are written and reviewed by us; others are
            produced on demand from text you supply.
          </p>
          <p className="font-medium text-primary dark:text-stone-200">
            Argumend does not declare a winner.
          </p>
          <p>
            The analysis tools read the text in front of them. They do not independently verify
            factual claims, they do not establish what anyone privately believes or intends, and
            they do not rule on who is right. A confidence or strength score describes how well an
            argument is evidenced <em>in the material supplied</em>, not how true it is. Treat the
            output as a reading aid and a starting point for your own judgement, not as a finding
            of fact, and not as professional advice of any kind — legal, medical, financial, or
            otherwise.
          </p>
          <p>
            Outputs are generated in part by AI models, which make mistakes: they misattribute
            positions, miss context, and occasionally invent things. You are responsible for
            checking anything you rely on or republish.
          </p>
        </Section>

        <Section id="acceptable-use" heading="Acceptable use">
          <p>When you use Argumend, you agree not to:</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">
              submit other people&rsquo;s private or confidential information, or material you do
              not have the right to share;
            </li>
            <li className="list-disc">
              use the analysis tools to build a dossier on a private individual, or to harass,
              defame, or intimidate anyone;
            </li>
            <li className="list-disc">
              submit unlawful material, or material that infringes someone else&rsquo;s copyright or
              other rights;
            </li>
            <li className="list-disc">
              present Argumend&rsquo;s output as an authoritative verdict, a fact-check, or the work
              of someone other than an automated analysis;
            </li>
            <li className="list-disc">
              scrape, bulk-download, or systematically republish the maps and analyses, or evade the
              rate limits;
            </li>
            <li className="list-disc">
              attempt to disrupt the service, probe it for vulnerabilities without telling us, or
              use it to attack the AI providers behind it.
            </li>
          </ul>
          <p>
            We may remove content, withdraw access, or take down a published report if we think
            these terms have been broken, and we do not have to explain ourselves in advance.
          </p>
        </Section>

        <Section id="your-content" heading="Text you submit">
          <p>
            You keep whatever rights you already have in the text you paste. You do not transfer
            ownership of it to us.
          </p>
          <p>
            You grant Argumend a limited, non-exclusive, worldwide, royalty-free licence to
            process that text for one purpose: running the analysis you asked for and returning the
            result to you. That includes sending it to the AI provider that performs the analysis.
            The licence lasts as long as it takes to serve your request, and it does not let us use
            your text to train models, sell it, or publish it.
          </p>
          <p>
            If you choose to publish a report, you extend that licence for the published report
            only — including the short quotations it contains — so we can host it and serve it to
            anyone holding the link, for as long as you leave it published. Delete the report and
            that extension ends.
          </p>
          <p>
            By submitting text you confirm you are entitled to do so: that it is yours, or public,
            or that you have permission from the people whose words it contains.{" "}
            <Link className={LINK} href="/privacy">
              Our privacy policy
            </Link>{" "}
            explains exactly where the text goes.
          </p>
        </Section>

        <Section id="our-content" heading="Our content">
          <p>
            The maps, written analyses, guides, essays, design, and code that make up Argumend
            belong to us or to our licensors. Quote us, link to us, and cite us freely; please do
            not republish substantial parts wholesale or pass the work off as your own.
          </p>
          <Pending>
            Decide the licence for Argumend&rsquo;s published maps and analyses — all rights
            reserved, or an open licence such as CC BY — and state it here. The repository itself
            carries its own licence file, which is separate from this question.
          </Pending>
        </Section>

        <Section id="accounts" heading="Accounts">
          <p>
            Accounts are optional. If you create one, keep your Google sign-in secure and tell us if
            you think someone else has used it. You may stop using an account at any time; ask us at{" "}
            <a className={LINK} href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
              {LEGAL_CONTACT_EMAIL}
            </a>{" "}
            to delete it. We may suspend or close an account that is being used to break these
            terms.
          </p>
        </Section>

        <Section id="availability" heading="Availability">
          <p>
            Argumend is offered as it is and as it happens to be available. We do not promise it
            will be up, that the AI-backed features will be reachable, or that any particular map or
            feature will continue to exist. Features behind configuration flags may be switched on
            or off without notice, and the AI providers we depend on have outages of their own.
          </p>
        </Section>

        <Section id="disclaimer" heading="Disclaimer of warranties">
          <p>
            To the fullest extent the law allows, Argumend is provided &ldquo;as is&rdquo; and
            &ldquo;as available&rdquo;, without warranties of any kind, express or implied,
            including any implied warranty of merchantability, fitness for a particular purpose,
            non-infringement, accuracy, or uninterrupted operation. We do not warrant that any
            analysis is correct, complete, impartial, or fit for a decision you are about to make.
          </p>
        </Section>

        <Section id="liability" heading="Limitation of liability">
          <p>
            To the fullest extent the law allows, Argumend and the people behind it are not liable
            for indirect, incidental, special, consequential, or punitive damages, or for lost
            profits, lost data, or reputational harm, arising out of your use of the site — whatever
            the legal theory, and even if we were told such damage was possible.
          </p>
          <Pending>
            Set the aggregate liability cap. [A typical formulation is the greater of the amount you
            paid Argumend in the preceding twelve months — currently nothing — and a fixed floor.]
            Also decide whether any consumer rights that cannot be excluded need a carve-out.
          </Pending>
        </Section>

        <Section id="indemnity" heading="Your responsibility for what you submit">
          <p>
            If a third party brings a claim against us because of text you submitted or published —
            for example, someone whose private messages you pasted, or whose copyright you passed on
            — you agree to cover the reasonable costs of dealing with that claim, to the extent it
            arises from what you submitted.
          </p>
          <Pending>
            Confirm the scope of this clause with counsel; a broad indemnity against consumer users
            is unenforceable in several jurisdictions.
          </Pending>
        </Section>

        <Section id="law" heading="Governing law and disputes">
          <Pending>
            Choose the governing law and the forum for disputes, and decide whether to require
            arbitration or leave disputes to the courts. [Jurisdiction placeholder — to be set
            alongside the entity Argumend operates through.]
          </Pending>
        </Section>

        <Section id="changes" heading="Changes to these terms">
          <p>
            We may change these terms. When we do, we update the date at the top of the page, and
            continuing to use Argumend after that means you accept the new version. If a change
            matters — a new AI provider receiving your text, say — we will also change the
            disclosure beside the submit button, which reads from the same list in the source code
            as the privacy policy does.
          </p>
        </Section>

        <Section id="contact" heading="Contact">
          <p>
            Questions about these terms go to{" "}
            <a className={LINK} href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
              {LEGAL_CONTACT_EMAIL}
            </a>
            .
          </p>
          <Pending>
            This address is a placeholder and is not yet a working mailbox. It also needs the
            operating entity&rsquo;s legal name and address, which most jurisdictions require on a
            public terms page.
          </Pending>
        </Section>

        <p className="border-t border-stone-200 pt-8 text-sm text-muted dark:border-[var(--border-divider)] dark:text-stone-500">
          See also our <Link className={LINK} href="/privacy">Privacy Policy</Link> and{" "}
          <Link className={LINK} href="/about">what Argumend is for</Link>.
        </p>
      </div>
    </AppShell>
  );
}
