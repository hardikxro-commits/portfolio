"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { site } from "@/content/data/site";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <LazyMotion features={domAnimation}>
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-hidden px-6 sm:px-12 lg:px-20"
    >
      <div className="relative z-10 max-w-3xl">
        <p className="text-sm font-medium tracking-[0.2em] text-text-muted uppercase">
          Student
        </p>

        <h1 className="mt-4 font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
          {site.name}
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
          {site.description}
        </p>

        <div className="mt-10 flex items-center gap-6">
          <a
            href="/projects"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-accent-primary hover:bg-accent-primary/10 hover:text-accent-primary"
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
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="flex flex-col items-center gap-1 text-text-muted transition-colors hover:text-text-primary"
          style={{ animation: "bounce-arrow 2s ease-in-out infinite" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </a>
      </div>
    </section>
    </LazyMotion>
  );
}
