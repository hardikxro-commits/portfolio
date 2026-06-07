"use client";

import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { site } from "@/content/data/site";
import { ChevronDown } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/shared/HeroScene").then((m) => ({ default: m.HeroScene })), {
  ssr: false,
});

const marqueeItems = [
  "Building Nothing Vault",
  "Learning Jetpack Compose",
  "Reading at 2AM",
  "Based in Mumbai",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (contentRef.current) {
      contentRef.current.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${y * -2}deg)`;
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-hidden px-6 sm:px-12 lg:px-20 text-white"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <HeroScene />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-black/30" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: "perspective(800px) rotateY(0deg) rotateX(0deg)" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
          <span className="text-sm font-medium tracking-[0.2em] text-white/70 uppercase">
            Student & Developer
          </span>
        </div>

        <h1 className="font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl text-white">
          {site.name}
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          {site.description}
        </p>

        <div className="mt-10 flex items-center gap-6">
          <a
            href="/projects"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            View Projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 underline-offset-4 transition-all duration-200 hover:text-white hover:underline"
          >
            GitHub ↗
          </a>
        </div>

        <div className="mt-16 w-full overflow-hidden border-t border-white/10 pt-5">
          <div className="marquee-track flex min-w-max gap-0" style={{ animation: "marquee 40s linear infinite" }}>
            <div className="flex shrink-0 items-center gap-0">
              {marqueeItems.map((item, i) => (
                <span key={i} className="flex items-center gap-0">
                  <span className="text-[11px] tracking-[0.15em] text-white/50 uppercase font-medium">
                    {item}
                  </span>
                  {i < marqueeItems.length - 1 && (
                    <span className="mx-5 text-white/20 text-xs">·</span>
                  )}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-0">
              {marqueeItems.map((item, i) => (
                <span key={i} className="flex items-center gap-0">
                  <span className="text-[11px] tracking-[0.15em] text-white/50 uppercase font-medium">
                    {item}
                  </span>
                  {i < marqueeItems.length - 1 && (
                    <span className="mx-5 text-white/20 text-xs">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-white/50 transition-colors hover:text-white"
          style={{ animation: "bounce-arrow 2s ease-in-out infinite" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
          <ChevronDown size={14} />
        </a>
      </div>
    </section>
  );
}
