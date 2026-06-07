"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { site } from "@/content/data/site";
import { ChevronDown } from "lucide-react";

const marqueeItems = [
  "Building Nothing Vault",
  "Learning Jetpack Compose",
  "Reading at 2AM",
  "Based in Mumbai",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (bgRef.current) {
      bgRef.current.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(1.08)`;
    }
    if (contentRef.current) {
      contentRef.current.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${y * -3}deg)`;
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    if (bgRef.current) {
      bgRef.current.style.transform = "scale(1.08)";
    }
    if (contentRef.current) {
      contentRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    }
  }, []);

  const bgOffset = Math.min(scrollY * 0.15, 120);

  return (
    <LazyMotion features={domAnimation}>
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-hidden px-6 sm:px-12 lg:px-20 text-white"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center transition-transform duration-200 ease-out will-change-transform"
        style={{
          backgroundImage: 'url("/images/starry-night.jpg")',
          transform: "scale(1.08)",
          top: -bgOffset,
          height: `calc(100% + ${bgOffset * 2}px)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/45 z-[1]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 z-[2] bg-gradient-to-b from-transparent to-[#FFFDF2]" />

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
          <ScrambleText text={site.name} />
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
    </LazyMotion>
  );
}
