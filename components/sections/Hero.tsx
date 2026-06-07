"use client";

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
  return (
    <LazyMotion features={domAnimation}>
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-hidden px-6 sm:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[image:radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[length:20px_20px]" />

      <div className="relative z-10 max-w-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block h-2 w-2 rounded-full bg-accent-primary animate-pulse" />
          <span className="text-sm font-medium tracking-[0.2em] text-text-muted uppercase">
            Student & Developer
          </span>
        </div>

        <h1 className="font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
          <ScrambleText text={site.name} />
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {site.description}
        </p>

        <div className="mt-10 flex items-center gap-6">
          <a
            href="/projects"
            className="group relative inline-flex items-center gap-2 rounded-full border border-border-default px-6 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:border-accent-primary hover:bg-accent-primary/10 hover:text-accent-primary"
          >
            View Projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted underline-offset-4 transition-all duration-200 hover:text-text-primary hover:underline"
          >
            GitHub ↗
          </a>
        </div>

        <div className="mt-16 w-full overflow-hidden border-t border-border-subtle pt-5">
          <div className="marquee-track flex min-w-max gap-0" style={{ animation: "marquee 40s linear infinite" }}>
            <div className="flex shrink-0 items-center gap-0">
              {marqueeItems.map((item, i) => (
                <span key={i} className="flex items-center gap-0">
                  <span className="text-[11px] tracking-[0.15em] text-text-muted uppercase font-medium">
                    {item}
                  </span>
                  {i < marqueeItems.length - 1 && (
                    <span className="mx-5 text-text-muted/30 text-xs">·</span>
                  )}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-0">
              {marqueeItems.map((item, i) => (
                <span key={i} className="flex items-center gap-0">
                  <span className="text-[11px] tracking-[0.15em] text-text-muted uppercase font-medium">
                    {item}
                  </span>
                  {i < marqueeItems.length - 1 && (
                    <span className="mx-5 text-text-muted/30 text-xs">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-text-muted transition-colors hover:text-text-primary"
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
