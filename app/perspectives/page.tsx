"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Clock, Rewind, Users, MessageCircle, Target, Sparkles, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface Scene {
  id: string;
  icon?: React.ReactNode;
  label?: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  crossed?: string;
  accentColor: string;
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
        <span className="text-primary font-semibold">The aggressor. The victim.</span>
        <br />
        It&apos;s obvious who&apos;s at fault.
      </p>
    ),
    imageSrc: "/images/perspectives/moment.png",
    imageAlt: "The Aggressor pushing The Victim on a busy street",
    accentColor: "#a23b3b",
  },
  {
    id: "30-seconds",
    icon: <Rewind className="h-5 w-5" />,
    label: "30 seconds earlier",
    title: "But Wait",
    subtitle: "What happened just before that moment?",
    crossed: "The aggressor.",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        Rewind. The &ldquo;victim&rdquo; had grabbed the other person&apos;s bag.
        They were trying to take something.
        <br /><br />
        The shove wasn&apos;t aggression—<span className="text-primary font-semibold">it was defense</span>.
        <br /><br />
        <span className="text-secondary italic">Who&apos;s the aggressor now?</span>
      </p>
    ),
    imageSrc: "/images/perspectives/rewind.png",
    imageAlt: "30 seconds earlier: Struggle over a bag",
    accentColor: "#c9a227",
  },
  {
    id: "2-minutes",
    icon: <Rewind className="h-5 w-5" />,
    label: "2 minutes earlier",
    title: "Context Changes Everything",
    subtitle: "Go back further. The story transforms again.",
    crossed: "Stealing.",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        Two minutes before. The &ldquo;thief&rdquo; is actually the original owner.
        Their bag was snatched. They spotted the thief and grabbed it back.
        <br /><br />
        <span className="text-primary font-semibold">They weren&apos;t stealing. They were recovering.</span>
        <br /><br />
        The &ldquo;defender&rdquo; was the actual thief, reacting to being caught.
      </p>
    ),
    imageSrc: "/images/perspectives/context.png",
    imageAlt: "2 minutes earlier: The pickpocket revealed",
    accentColor: "#2d7a6f",
  },
  {
    id: "third-witness",
    icon: <Users className="h-5 w-5" />,
    label: "Another perspective",
    title: "A Third Witness",
    subtitle: "Same moment. Different eyes. Different truth.",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        A third person saw the incident. They arrived mid-scene.
        <br /><br />
        To them, both people were fighting over a bag.
        <span className="text-primary font-semibold"> Mutual combat. Both at fault.</span>
        <br /><br />
        They didn&apos;t see who started it. They didn&apos;t see the pickpocket.
        They saw exactly what happened—and understood none of it.
      </p>
    ),
    imageSrc: "/images/perspectives/witness.png",
    imageAlt: "Third witness watching from a cafe",
    accentColor: "#6b5b95",
  },
  {
    id: "rumors",
    icon: <MessageCircle className="h-5 w-5" />,
    label: "The telephone game",
    title: "The Rumors Spread",
    subtitle: "By the time it reaches you, what's left of the original?",
    content: (
      <p className="text-base md:text-xl lg:text-2xl leading-relaxed">
        The story travels. Each retelling adds, removes, embellishes.
        <br /><br />
        <span className="text-secondary italic">&ldquo;I heard someone got attacked...&rdquo;</span>
        <br />
        <span className="text-secondary italic">&ldquo;My friend said it was a robbery gone wrong...&rdquo;</span>
        <br />
        <span className="text-secondary italic">&ldquo;Apparently there was a knife involved...&rdquo;</span>
        <br /><br />
        <span className="text-primary font-semibold">None of this happened.</span> But now it&apos;s part of the story.
      </p>
    ),
    imageSrc: "/images/perspectives/rumors.png",
    imageAlt: "Rumors spreading and distorting the truth",
    accentColor: "#b85c38",
  },
  {
    id: "motivated",
    icon: <Target className="h-5 w-5" />,
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
        <span className="text-secondary italic">None are lying, exactly. All are selecting.</span>
      </p>
    ),
    imageSrc: "/images/perspectives/motivated.png",
    imageAlt: "Different perspectives: Journalist, Friend, Shop Owner",
    accentColor: "#4a6741",
  },
  {
    id: "synthesis",
    icon: <Sparkles className="h-5 w-5" />,
    title: "You Are Not Your Ideas",
    subtitle: "The lesson",
    content: (
      <div className="text-center">
        <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8 text-primary">
          Every witness told the truth—<em>their</em> truth.
          <br />
          Shaped by when they arrived, what they noticed, who they knew, what they needed.
        </p>
        <p className="text-base md:text-xl lg:text-2xl leading-relaxed text-secondary mb-8">
          Ideas aren&apos;t identities. They&apos;re lenses.
          <br />
          <span className="font-semibold text-primary">Pick them up. Set them down. Trade them for better ones.</span>
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
    imageSrc: "/images/perspectives/synthesis.png",
    imageAlt: "Truth emerging from the intersection of perspectives",
    accentColor: "#2d7a6f",
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

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 md:px-8 py-10 md:py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg,
          ${index === 0 ? '#f5f0e8' : '#ebe6de'} 0%,
          ${index === scenes.length - 1 ? '#f5f0e8' : '#e5ddd0'} 100%)`
      }}
    >
      {/* Accent line decoration */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: scene.accentColor }}
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
          {scene.label && (
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {scene.icon && (
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${scene.accentColor}15` }}
                >
                  <div style={{ color: scene.accentColor }}>{scene.icon}</div>
                </div>
              )}
              <span
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: scene.accentColor }}
              >
                {scene.label}
              </span>
            </motion.div>
          )}

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
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-primary mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {scene.title}
          </motion.h2>

          {scene.subtitle && (
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-secondary mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {scene.subtitle}
            </motion.p>
          )}

          <motion.div
            className="text-secondary"
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
              boxShadow: `0 25px 80px -20px ${scene.accentColor}40`,
              border: `4px solid ${scene.accentColor}20`
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
                background: `linear-gradient(135deg, ${scene.accentColor}00 0%, ${scene.accentColor}40 100%)`
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PerspectivesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <AppShell>
      {/* Hero with parallax */}
      <motion.div
        ref={heroRef}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8f5f0] to-[#f0ebe4] px-4 relative overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.03]"
            style={{ background: "radial-gradient(circle, #2d7a6f 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{ background: "radial-gradient(circle, #c9a227 0%, transparent 70%)" }}
            animate={{ scale: [1.1, 1, 1.1], rotate: [0, -10, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="text-center max-w-4xl relative z-10">
          {/* No-JS fallback: content is visible by default, animations enhance */}
          <div className="animate-fade-in-up">
            <h1 className="display-text text-primary mb-8">
              Perspectives
            </h1>
          </div>

          <p
            className="text-base md:text-xl lg:text-2xl text-secondary mb-12 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            A scroll-driven story about why you are not your ideas—
            <br className="hidden md:inline" />
            and why that&apos;s liberating.
          </p>

          <div
            className="flex flex-col items-center gap-2 text-muted animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="text-sm font-medium tracking-wide">Scroll to begin</span>
            <div className="animate-bounce-slow">
              <ChevronDown className="h-6 w-6" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scenes */}
      {scenes.map((scene, index) => (
        <Scene key={scene.id} scene={scene} index={index} />
      ))}

      {/* CTA */}
      <motion.div
        className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#e5ddd0] to-[#f5f0e8] px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-xl">
          <motion.h2
            className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-primary mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to explore?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-secondary mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            See how different perspectives play out on real topics—
            <br />
            and find where your own views might have blind spots.
          </motion.p>
          <motion.a
            href="/topics"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-main to-evidence text-white rounded-xl font-bold text-lg shadow-lg shadow-accent-main/25 transition-all hover:shadow-xl hover:shadow-accent-main/30 hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Topics
            <ChevronDown className="h-5 w-5 rotate-[-90deg]" />
          </motion.a>
        </div>
      </motion.div>
    </AppShell>
  );
}
