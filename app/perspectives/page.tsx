"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Clock, Rewind, Users, MessageCircle, Target, Sparkles } from "lucide-react";

interface Scene {
  id: string;
  icon?: React.ReactNode;
  label?: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  illustration: React.ReactNode;
  crossed?: string;
  bgClass: string;
}

const scenes: Scene[] = [
  {
    id: "moment",
    title: "The Moment",
    subtitle: "What you see is what happened. Obviously.",
    content: (
      <p className="text-xl leading-relaxed">
        A busy street corner. Two people. One shoves the other to the ground.
        <br /><br />
        <span className="text-[#3d3a36] font-semibold">The aggressor. The victim.</span>
        <br />
        It&apos;s obvious who&apos;s at fault.
      </p>
    ),
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a67a]/20 to-[#8b7355]/30 rounded-2xl" />
        <div className="relative z-10 text-center">
          <div className="flex items-end justify-center gap-8 mb-8">
            {/* Aggressor figure */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#c4584d]/80 mb-2" />
              <div className="w-12 h-24 rounded-t-full bg-[#c4584d]/60" />
              <span className="mt-3 text-sm font-medium text-[#c4584d]">Aggressor</span>
            </div>
            {/* Push action */}
            <div className="text-4xl text-[#8b7355] -mx-4 mb-12">→</div>
            {/* Victim figure (falling) */}
            <div className="flex flex-col items-center rotate-[25deg] translate-y-4">
              <div className="w-16 h-16 rounded-full bg-[#4f7b77]/80 mb-2" />
              <div className="w-12 h-24 rounded-t-full bg-[#4f7b77]/60" />
              <span className="mt-3 text-sm font-medium text-[#4f7b77] -rotate-[25deg]">Victim</span>
            </div>
          </div>
          <p className="text-sm text-[#6a5f56] italic">&ldquo;I saw the whole thing.&rdquo;</p>
        </div>
      </div>
    ),
    bgClass: "from-[#f5f0e8] to-[#ebe4d8]",
  },
  {
    id: "30-seconds",
    icon: <Rewind className="h-5 w-5" />,
    label: "30 seconds earlier",
    title: "But Wait",
    subtitle: "What happened just before that moment?",
    crossed: "The aggressor.",
    content: (
      <p className="text-xl leading-relaxed">
        Rewind. The &ldquo;victim&rdquo; had grabbed the other person&apos;s bag.
        They were trying to take something.
        <br /><br />
        The shove wasn&apos;t aggression—<span className="text-[#3d3a36] font-semibold">it was defense</span>.
        <br /><br />
        <span className="text-[#6a5f56] italic">Who&apos;s the aggressor now?</span>
      </p>
    ),
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7a9a8a]/20 to-[#5a7a6a]/30 rounded-2xl" />
        <div className="relative z-10 text-center">
          <div className="flex items-end justify-center gap-8 mb-8">
            {/* Person A - defending */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#4f7b77]/80 mb-2" />
              <div className="w-12 h-24 rounded-t-full bg-[#4f7b77]/60" />
              <span className="mt-3 text-sm font-medium text-[#4f7b77]">Defending?</span>
            </div>
            {/* Bag being grabbed */}
            <div className="flex flex-col items-center -mx-4">
              <div className="w-8 h-10 bg-[#8b7355] rounded-md mb-1" />
              <span className="text-xs text-[#6a5f56]">bag</span>
            </div>
            {/* Person B - grabbing */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#c4584d]/80 mb-2" />
              <div className="w-12 h-24 rounded-t-full bg-[#c4584d]/60" />
              <span className="mt-3 text-sm font-medium text-[#c4584d]">Stealing?</span>
            </div>
          </div>
          <p className="text-sm text-[#6a5f56] italic">&ldquo;Wait, I didn&apos;t see that part...&rdquo;</p>
        </div>
      </div>
    ),
    bgClass: "from-[#f0ebe4] to-[#e5ddd0]",
  },
  {
    id: "2-minutes",
    icon: <Rewind className="h-5 w-5" />,
    label: "2 minutes earlier",
    title: "Context Changes Everything",
    subtitle: "Go back further. The story transforms again.",
    crossed: "Stealing.",
    content: (
      <p className="text-xl leading-relaxed">
        Two minutes before. The &ldquo;thief&rdquo; is actually the original owner.
        Their wallet was pickpocketed. They spotted the thief and grabbed it back.
        <br /><br />
        <span className="text-[#3d3a36] font-semibold">They weren&apos;t stealing. They were recovering.</span>
        <br /><br />
        The &ldquo;defender&rdquo; was the actual thief, reacting to being caught.
      </p>
    ),
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a89a7a]/20 to-[#8a7a5a]/30 rounded-2xl" />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Timeline showing the real sequence */}
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl">
              <Clock className="h-6 w-6 text-[#6a5f56] mb-2" />
              <span className="text-xs text-[#6a5f56]">First:</span>
              <span className="text-sm font-medium text-[#c4584d]">Pickpocket</span>
            </div>
            <div className="text-2xl text-[#8b7355]">→</div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl">
              <span className="text-xs text-[#6a5f56]">Then:</span>
              <span className="text-sm font-medium text-[#4f7b77]">Recovery</span>
            </div>
            <div className="text-2xl text-[#8b7355]">→</div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl">
              <span className="text-xs text-[#6a5f56]">Finally:</span>
              <span className="text-sm font-medium text-[#8b7355]">The shove</span>
            </div>
          </div>
          <p className="text-sm text-[#6a5f56] italic">&ldquo;I only arrived at the end...&rdquo;</p>
        </div>
      </div>
    ),
    bgClass: "from-[#ebe6de] to-[#dfd8cc]",
  },
  {
    id: "third-witness",
    icon: <Users className="h-5 w-5" />,
    label: "Another perspective",
    title: "A Third Witness",
    subtitle: "Same moment. Different eyes. Different truth.",
    content: (
      <p className="text-xl leading-relaxed">
        A third person saw the incident. They arrived mid-scene.
        <br /><br />
        To them, both people were fighting over a bag.
        <span className="text-[#3d3a36] font-semibold"> Mutual combat. Both at fault.</span>
        <br /><br />
        They didn&apos;t see who started it. They didn&apos;t see the pickpocket.
        They saw exactly what happened—and understood none of it.
      </p>
    ),
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8a8a9a]/20 to-[#6a6a7a]/30 rounded-2xl" />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-12 mb-8">
            {/* The scene (small) */}
            <div className="flex items-center gap-2 p-4 bg-white/30 rounded-xl opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#4f7b77]/60" />
              <div className="w-4 h-5 bg-[#8b7355] rounded" />
              <div className="w-8 h-8 rounded-full bg-[#c4584d]/60" />
            </div>
            {/* The witness */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#6a6a7a]/80 mb-2 flex items-center justify-center">
                <span className="text-3xl">👁️</span>
              </div>
              <span className="text-sm font-medium text-[#6a6a7a]">Witness C</span>
              <div className="mt-3 p-3 bg-white/50 rounded-lg max-w-48">
                <p className="text-xs text-[#4e473f] italic">
                  &ldquo;They were both grabbing the bag and shoving each other.
                  Looked like a mutual fight to me.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    bgClass: "from-[#e8e4de] to-[#dcd6ce]",
  },
  {
    id: "rumors",
    icon: <MessageCircle className="h-5 w-5" />,
    label: "The telephone game",
    title: "The Rumors Spread",
    subtitle: "By the time it reaches you, what's left of the original?",
    content: (
      <p className="text-xl leading-relaxed">
        The story travels. Each retelling adds, removes, embellishes.
        <br /><br />
        <span className="text-[#6a5f56] italic">&ldquo;I heard someone got attacked...&rdquo;</span>
        <br />
        <span className="text-[#6a5f56] italic">&ldquo;My friend said it was a robbery gone wrong...&rdquo;</span>
        <br />
        <span className="text-[#6a5f56] italic">&ldquo;Apparently there was a knife involved...&rdquo;</span>
        <br /><br />
        <span className="text-[#3d3a36] font-semibold">None of this happened.</span> But now it&apos;s part of the story.
      </p>
    ),
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9a8a7a]/20 to-[#7a6a5a]/30 rounded-2xl" />
        <div className="relative z-10">
          {/* Branching quotes */}
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 bg-white/70 rounded-lg border border-[#ddd5c8] shadow-sm">
              <p className="text-sm text-[#4e473f]">Original: &ldquo;A shove&rdquo;</p>
            </div>
            <div className="text-xl text-[#8b7355]">↓</div>
            <div className="flex gap-4">
              <div className="p-2 bg-white/50 rounded-lg border border-[#ddd5c8] rotate-[-5deg]">
                <p className="text-xs text-[#6a5f56]">&ldquo;A fight&rdquo;</p>
              </div>
              <div className="p-2 bg-white/50 rounded-lg border border-[#ddd5c8] rotate-[3deg]">
                <p className="text-xs text-[#6a5f56]">&ldquo;An attack&rdquo;</p>
              </div>
            </div>
            <div className="text-xl text-[#8b7355]">↓</div>
            <div className="flex gap-3 flex-wrap justify-center max-w-80">
              <div className="p-2 bg-white/30 rounded border border-[#ddd5c8]/50 rotate-[-8deg]">
                <p className="text-[10px] text-[#8a8279]">&ldquo;robbery&rdquo;</p>
              </div>
              <div className="p-2 bg-white/30 rounded border border-[#ddd5c8]/50 rotate-[5deg]">
                <p className="text-[10px] text-[#8a8279]">&ldquo;gang related&rdquo;</p>
              </div>
              <div className="p-2 bg-white/30 rounded border border-[#ddd5c8]/50 rotate-[-3deg]">
                <p className="text-[10px] text-[#8a8279]">&ldquo;a knife&rdquo;</p>
              </div>
              <div className="p-2 bg-white/30 rounded border border-[#ddd5c8]/50 rotate-[7deg]">
                <p className="text-[10px] text-[#8a8279]">&ldquo;hospitalized&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    bgClass: "from-[#e5e0d8] to-[#d8d0c4]",
  },
  {
    id: "motivated",
    icon: <Target className="h-5 w-5" />,
    label: "Hidden agendas",
    title: "The Motivated Actors",
    subtitle: "Everyone tells the story that serves their needs.",
    content: (
      <p className="text-xl leading-relaxed">
        The same incident. Different storytellers. Different purposes.
        <br /><br />
        The <span className="font-semibold">journalist</span> needs drama: &ldquo;Street violence erupts.&rdquo;
        <br />
        The <span className="font-semibold">friend</span> protects their person: &ldquo;They would never start a fight.&rdquo;
        <br />
        The <span className="font-semibold">shop owner</span> wants them both gone: &ldquo;Troublemakers, both of them.&rdquo;
        <br /><br />
        <span className="text-[#6a5f56] italic">None are lying, exactly. All are selecting.</span>
      </p>
    ),
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7a7a8a]/20 to-[#5a5a6a]/30 rounded-2xl" />
        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-6">
            {/* Journalist */}
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl">
              <div className="text-3xl mb-2">📰</div>
              <span className="text-sm font-medium text-[#4e473f]">Journalist</span>
              <p className="text-xs text-[#6a5f56] text-center mt-2 italic">&ldquo;Violence erupts on Main St&rdquo;</p>
            </div>
            {/* Friend */}
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl">
              <div className="text-3xl mb-2">🤝</div>
              <span className="text-sm font-medium text-[#4e473f]">The Friend</span>
              <p className="text-xs text-[#6a5f56] text-center mt-2 italic">&ldquo;They were defending themselves&rdquo;</p>
            </div>
            {/* Shop owner */}
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-xl">
              <div className="text-3xl mb-2">🏪</div>
              <span className="text-sm font-medium text-[#4e473f]">Shop Owner</span>
              <p className="text-xs text-[#6a5f56] text-center mt-2 italic">&ldquo;Both causing trouble&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    ),
    bgClass: "from-[#e0dcd4] to-[#d4cec4]",
  },
  {
    id: "synthesis",
    icon: <Sparkles className="h-5 w-5" />,
    title: "You Are Not Your Ideas",
    subtitle: "The lesson",
    content: (
      <div className="text-center">
        <p className="text-2xl leading-relaxed mb-8 text-[#3d3a36]">
          Every witness told the truth—<em>their</em> truth.
          <br />
          Shaped by when they arrived, what they noticed, who they knew, what they needed.
        </p>
        <p className="text-xl leading-relaxed text-[#4e473f] mb-8">
          Ideas aren&apos;t identities. They&apos;re lenses.
          <br />
          <span className="font-semibold">Pick them up. Set them down. Trade them for better ones.</span>
        </p>
        <p className="text-lg text-[#6a5f56]">
          When someone disagrees with you, they&apos;re not attacking <em>you</em>.
          <br />
          They&apos;re offering a view from a different angle.
          <br /><br />
          Maybe they saw something you missed.
        </p>
      </div>
    ),
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4f7b77]/10 to-[#3d5f5c]/20 rounded-2xl" />
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-6">🔮</div>
          <p className="text-lg font-serif text-[#3d3a36] max-w-64">
            Truth emerges from the intersection of perspectives, not from any single vantage point.
          </p>
        </div>
      </div>
    ),
    bgClass: "from-[#f5f0e8] to-[#ebe6de]",
  },
];

function Scene({ scene, isVisible }: { scene: Scene; isVisible: boolean }) {
  return (
    <div
      className={`min-h-[100vh] flex items-center justify-center px-4 py-16 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-40"
      } bg-gradient-to-b ${scene.bgClass}`}
    >
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text content */}
        <div className="order-2 md:order-1">
          {scene.label && (
            <div className="flex items-center gap-2 mb-4">
              {scene.icon && (
                <div className="p-2 bg-[#4f7b77]/10 rounded-lg text-[#4f7b77]">
                  {scene.icon}
                </div>
              )}
              <span className="text-sm font-medium uppercase tracking-[0.15em] text-[#4f7b77]">
                {scene.label}
              </span>
            </div>
          )}

          {scene.crossed && (
            <p className="text-lg text-[#9a918a] line-through decoration-[#c4584d]/60 decoration-2 mb-2">
              {scene.crossed}
            </p>
          )}

          <h2 className="font-serif text-4xl md:text-5xl text-[#3d3a36] mb-3">
            {scene.title}
          </h2>

          {scene.subtitle && (
            <p className="text-xl text-[#6a5f56] mb-6">{scene.subtitle}</p>
          )}

          <div className="text-[#4e473f]">{scene.content}</div>
        </div>

        {/* Illustration */}
        <div className="order-1 md:order-2 h-72 md:h-96">
          {scene.illustration}
        </div>
      </div>
    </div>
  );
}

export default function PerspectivesPage() {
  const [visibleScenes, setVisibleScenes] = useState<Set<string>>(new Set());
  const sceneRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-scene-id");
          if (id) {
            setVisibleScenes((prev) => {
              const next = new Set(prev);
              if (entry.isIntersecting) {
                next.add(id);
              }
              return next;
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    sceneRefs.current.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AppShell>
      {/* Hero */}
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#f5f0e8] to-[#f0ebe4] px-4">
        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-5xl md:text-6xl text-[#3d3a36] mb-6">
            Perspectives
          </h1>
          <p className="text-xl text-[#6a5f56] mb-8">
            A scroll-driven story about why you are not your ideas—<br className="hidden md:inline" />
            and why that&apos;s liberating.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#9a918a]">
            <span className="text-sm">Scroll to begin</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* Scenes */}
      {scenes.map((scene) => (
        <div
          key={scene.id}
          ref={(el) => {
            if (el) sceneRefs.current.set(scene.id, el);
          }}
          data-scene-id={scene.id}
        >
          <Scene scene={scene} isVisible={visibleScenes.has(scene.id)} />
        </div>
      ))}

      {/* CTA */}
      <div className="min-h-[50vh] flex items-center justify-center bg-gradient-to-b from-[#ebe6de] to-[#f5f0e8] px-4">
        <div className="text-center max-w-xl">
          <h2 className="font-serif text-3xl text-[#3d3a36] mb-4">
            Ready to explore?
          </h2>
          <p className="text-lg text-[#6a5f56] mb-8">
            See how different perspectives play out on real topics—<br />
            and find where your own views might have blind spots.
          </p>
          <a
            href="/topics"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4f7b77] text-white rounded-lg font-medium hover:bg-[#3d5f5c] transition-colors"
          >
            Explore Topics
          </a>
        </div>
      </div>
    </AppShell>
  );
}
