"use client";

import { createElement, useRef } from "react";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { NextStep } from "@/components/learn/ArticleLayout";
import { Chip } from "@/components/ui/Chip";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  getPerspectiveIcon,
  getPerspectiveLens,
  groupScenesByLens,
  perspectiveLenses,
  perspectiveLensOrder,
  type PerspectiveSceneId,
} from "@/lib/perspectiveMeta";
import { articleCrumbs } from "@/lib/learn/sections";

/** Where the story sends a reader next: the map it is really about. */
const NEXT_MAP = {
  href: "/topics/ai-mass-unemployment",
  title: "Will AI cause mass unemployment?",
};

interface Scene {
  /** Typed against the lens taxonomy so every scene keeps a lens and an icon. */
  id: PerspectiveSceneId;
  label?: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  crossed?: string;
}

const scenes: Scene[] = [
  {
    id: "moment",
    title: "The Moment",
    subtitle: "What you see is what happened. Obviously.",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        A busy street corner. Two people. One shoves the other to the ground.
        <br /><br />
        <span className="text-primary dark:text-stone-200 font-semibold">The aggressor. The victim.</span>
        <br />
        It&apos;s obvious who&apos;s at fault.
      </p>
    ),
    imageSrc: "/images/perspectives/moment.jpg",
    imageAlt: "The Aggressor pushing The Victim on a busy street",
  },
  {
    id: "30-seconds",
    label: "30 seconds earlier",
    title: "But Wait",
    subtitle: "What happened just before that moment?",
    crossed: "The aggressor.",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        Rewind. The &ldquo;victim&rdquo; had grabbed the other person&apos;s bag.
        They were trying to take something.
        <br /><br />
        The shove wasn&apos;t aggression—<span className="text-primary dark:text-stone-200 font-semibold">it was defense</span>.
        <br /><br />
        <span className="text-secondary dark:text-stone-400 italic">Who&apos;s the aggressor now?</span>
      </p>
    ),
    imageSrc: "/images/perspectives/rewind.jpg",
    imageAlt: "30 seconds earlier: Struggle over a bag",
  },
  {
    id: "2-minutes",
    label: "2 minutes earlier",
    title: "Context Changes Everything",
    subtitle: "Go back further. The story transforms again.",
    crossed: "Stealing.",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        Two minutes before. The &ldquo;thief&rdquo; is actually the original owner.
        Their bag was snatched. They spotted the thief and grabbed it back.
        <br /><br />
        <span className="text-primary dark:text-stone-200 font-semibold">They weren&apos;t stealing. They were recovering.</span>
        <br /><br />
        The &ldquo;defender&rdquo; was the actual thief, reacting to being caught.
      </p>
    ),
    imageSrc: "/images/perspectives/context.jpg",
    imageAlt: "2 minutes earlier: The pickpocket revealed",
  },
  {
    id: "third-witness",
    label: "Another perspective",
    title: "A Third Witness",
    subtitle: "Same moment. Different eyes. Different truth.",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        A third person saw the incident. They arrived mid-scene.
        <br /><br />
        To them, both people were fighting over a bag.
        <span className="text-primary dark:text-stone-200 font-semibold"> Mutual combat. Both at fault.</span>
        <br /><br />
        They didn&apos;t see who started it. They didn&apos;t see the pickpocket.
        They saw exactly what happened—and understood none of it.
      </p>
    ),
    imageSrc: "/images/perspectives/witness.jpg",
    imageAlt: "Third witness watching from a cafe",
  },
  {
    id: "rumors",
    label: "The telephone game",
    title: "The Rumors Spread",
    subtitle: "By the time it reaches you, what's left of the original?",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        The story travels. Each retelling adds, removes, embellishes.
        <br /><br />
        <span className="text-secondary dark:text-stone-400 italic">&ldquo;I heard someone got attacked...&rdquo;</span>
        <br />
        <span className="text-secondary dark:text-stone-400 italic">&ldquo;My friend said it was a robbery gone wrong...&rdquo;</span>
        <br />
        <span className="text-secondary dark:text-stone-400 italic">&ldquo;Apparently there was a knife involved...&rdquo;</span>
        <br /><br />
        <span className="text-primary dark:text-stone-200 font-semibold">None of this happened.</span> But now it&apos;s part of the story.
      </p>
    ),
    imageSrc: "/images/perspectives/rumors.jpg",
    imageAlt: "Rumors spreading and distorting the truth",
  },
  {
    id: "motivated",
    label: "Hidden agendas",
    title: "The Motivated Actors",
    subtitle: "Everyone tells the story that serves their needs.",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        The same incident. Different storytellers. Different purposes.
        <br /><br />
        The <span className="font-semibold">journalist</span> needs drama: &ldquo;Street violence erupts.&rdquo;
        <br />
        The <span className="font-semibold">friend</span> protects their person: &ldquo;They would never start a fight.&rdquo;
        <br />
        The <span className="font-semibold">shop owner</span> wants them both gone: &ldquo;Troublemakers, both of them.&rdquo;
        <br /><br />
        <span className="text-secondary dark:text-stone-400 italic">None are lying, exactly. All are selecting.</span>
      </p>
    ),
    imageSrc: "/images/perspectives/motivated.jpg",
    imageAlt: "Different perspectives: Journalist, Friend, Shop Owner",
  },
  {
    id: "synthesis",
    title: "You Are Not Your Ideas",
    subtitle: "The lesson",
    content: (
      <div className="text-center">
        <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8 text-primary dark:text-stone-200">
          Every witness told the truth—<em>their</em> truth.
          <br />
          Shaped by when they arrived, what they noticed, who they knew, what they needed.
        </p>
        <p className="text-base md:text-xl lg:text-2xl leading-relaxed text-secondary dark:text-stone-400 mb-8">
          Ideas aren&apos;t identities. They&apos;re lenses.
          <br />
          <span className="font-semibold text-primary dark:text-stone-200">Pick them up. Set them down. Trade them for better ones.</span>
        </p>
        <p className="text-lg md:text-xl text-muted">
          When someone disagrees with you, they&apos;re not attacking <em>you</em>.
          <br />
          They&apos;re offering a view from a different angle.
          <br /><br />
          Maybe they saw something you missed.
        </p>
      </div>
    ),
    imageSrc: "/images/perspectives/synthesis.jpg",
    imageAlt: "Truth emerging from the intersection of perspectives",
  },
];

// Animated strikethrough component
function AnimatedStrikethrough({ text, isVisible }: { text: string; isVisible: boolean }) {
  return (
    <span className="relative inline-block">
      <span className="text-xl text-muted">{text}</span>
      <motion.span
        className="absolute left-0 top-1/2 h-[3px] bg-crux/70 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: isVisible ? "100%" : 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />
    </span>
  );
}

// Scene component with staggered animations
function Scene({ scene, index }: { scene: Scene; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const isEven = index % 2 === 0;
  const lens = getPerspectiveLens(scene.id);
  const accent = lens.accent;

  return (
    <div
      ref={ref}
      id={scene.id}
      className="min-h-[100svh] flex items-center justify-center px-4 md:px-8 py-10 md:py-20 relative overflow-hidden"
      // Theme-aware: the canvas fading into the overlay tone, so the scenes
      // follow dark mode instead of staying parchment on a dark page.
      style={{
        background: `linear-gradient(180deg,
          rgb(var(--bg-canvas-rgb)) 0%,
          rgb(var(--bg-overlay-rgb) / ${index === scenes.length - 1 ? 0.35 : 0.7}) 100%)`,
      }}
    >
      {/* Accent line decoration */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: accent }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Text content */}
        <motion.div
          className={`${isEven ? "md:order-1" : "md:order-2"}`}
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (isEven ? -60 : 60) }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${accent}15` }}
            >
              {/* createElement, not <Icon />: a capitalized local would be a
                  new component identity on every render (react-hooks/static-components). */}
              {createElement(getPerspectiveIcon(scene.id), {
                className: "h-5 w-5",
                style: { color: accent },
                strokeWidth: 1.8,
              })}
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                {scene.label ?? lens.label}
              </span>
              <span className="font-serif text-xs text-muted tracking-wide">
                {scene.label ? `Lens ${lens.numeral} · ${lens.label}` : `Lens ${lens.numeral}`}
              </span>
            </div>
          </motion.div>

          {scene.crossed && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AnimatedStrikethrough text={scene.crossed} isVisible={isInView} />
            </motion.div>
          )}

          <motion.h2
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-primary dark:text-stone-200 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {scene.title}
          </motion.h2>

          {scene.subtitle && (
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-secondary dark:text-stone-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {scene.subtitle}
            </motion.p>
          )}

          <motion.div
            className="text-secondary dark:text-stone-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {scene.content}
          </motion.div>
        </motion.div>

        {/* Illustration with parallax */}
        <motion.div
          className={`${isEven ? "md:order-2" : "md:order-1"} h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px]`}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{
            opacity: isInView ? 1 : 0,
            scale: isInView ? 1 : 0.9,
            y: isInView ? 0 : 40
          }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div
            className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
            style={{
              boxShadow: `0 25px 80px -20px ${accent}40`,
              border: `4px solid ${accent}20`
            }}
          >
            <Image
              src={scene.imageSrc}
              alt={scene.imageAlt}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOM8V+qBwAEQAHeYfXo2AAAAABJRU5ErkJggg=="
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `linear-gradient(135deg, ${accent}00 0%, ${accent}40 100%)`
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PerspectivesPage() {
  const lensGroups = groupScenesByLens(scenes);

  return (
    <AppShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Perspectives",
          description:
            "A scroll-driven story about why you are not your ideas, and why that is liberating.",
          url: "https://argumend.org/perspectives",
          isPartOf: {
            "@type": "WebSite",
            name: "ARGUMEND",
            url: "https://argumend.org",
          },
        }}
      />
      <PageContainer width="reading" className="!pb-10">
        <PageHeader
          breadcrumbs={articleCrumbs("essay", "Perspectives")}
          eyebrow="Essay"
          title="Perspectives"
          lede="One street fight, told five ways: a short scroll story about why you are not your ideas, and why that is a relief."
          className="!mb-0"
        >
          {/* The four lenses the story walks through, as a jump list. */}
          <nav aria-label="The four lenses">
            <ul className="flex flex-wrap gap-2">
              {perspectiveLensOrder.map((id) => {
                const lens = perspectiveLenses[id];
                const first = lensGroups.find((g) => g.lens.id === id)?.items[0];
                return (
                  <li key={id}>
                    <Chip href={`#${first?.id ?? ""}`} className="px-3.5 text-[0.8125rem]">
                      {lens.label}
                    </Chip>
                  </li>
                );
              })}
            </ul>
          </nav>
        </PageHeader>
      </PageContainer>

      {/* Scenes */}
      {scenes.map((scene, index) => (
        <Scene key={scene.id} scene={scene} index={index} />
      ))}

      <PageContainer width="reading" className="!pt-0">
        <NextStep map={NEXT_MAP} label="Try the lenses on a real map" />
      </PageContainer>
    </AppShell>
  );
}
