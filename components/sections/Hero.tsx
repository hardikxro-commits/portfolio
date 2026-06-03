"use client";

import { useEffect } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { site } from "@/content/data/site";
import { GitFork, ChevronDown } from "lucide-react";
import { Typewriter } from "./Typewriter";
import { AvailabilityBadge } from "./AvailabilityBadge";

export function Hero() {
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-1, 1], [-12, 12]);
  const rotateY = useTransform(springX, [-1, 1], [12, -12]);
  const translateX = useTransform(springX, [-1, 1], [-60, 60]);
  const translateY = useTransform(springY, [-1, 1], [-40, 40]);
  const scale = useTransform(springX, [-1, 1], [0.95, 1.05]);

  useEffect(() => {
    if (prefersReduced) return;
    const handler = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [prefersReduced, mouseX, mouseY]);
  return (
    <LazyMotion features={domAnimation}>
    <section id="hero" className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      <div className="pointer-events-none absolute bottom-8 left-4 z-0 hidden md:block" style={{ perspective: 800 }}>
        <m.img
          src="/images/noface.svg"
          alt=""
          aria-hidden="true"
          className="h-auto w-36 select-none opacity-15 lg:w-48 xl:w-56"
          style={{
            filter: "drop-shadow(0 0 20px rgba(249, 178, 215, 0.15))",
            rotateX: prefersReduced ? 0 : rotateX,
            rotateY: prefersReduced ? 0 : rotateY,
            scale: prefersReduced ? 1 : scale,
            x: prefersReduced ? 0 : translateX,
            y: prefersReduced ? 0 : translateY,
          }}
        />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <ScrollReveal delay={0}>
          <AvailabilityBadge />
        </ScrollReveal>

        <h1 className="mt-6 font-display font-bold leading-tight tracking-tight"
          style={{
            fontSize: "var(--text-hero, clamp(2.75rem, 7vw, 5.5rem))",
            background: "var(--gradient-text)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <AnimatedText text={site.name} type="letter" />
        </h1>

        <ScrollReveal delay={0.2}>
          <p className="mt-4 text-lg text-text-secondary sm:text-xl">
            <Typewriter words={site.taglineRoles} />
          </p>
          <p className="mt-2 text-base text-text-muted">
            {site.tagline}
          </p>
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ScrollReveal delay={0.3}>
            <MagneticButton href="/#projects" variant="primary">
              View Projects
            </MagneticButton>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <MagneticButton href="/blog" variant="ghost">
              Read Blog
            </MagneticButton>
          </ScrollReveal>
        </div>

        <div className="mt-8 flex items-center gap-5">
          <ScrollReveal delay={0.5}>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-all duration-200 hover:text-text-primary hover:-translate-y-0.5"
              aria-label="GitHub"
            >
              <GitFork size={20} />
            </a>
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="flex flex-col items-center gap-1 text-text-muted transition-colors hover:text-text-primary"
          style={{ animation: "bounce-arrow 2s ease-in-out infinite" }}
        >
          <span className="text-xs">Scroll</span>
          <ChevronDown size={16} />
        </a>
      </div>
    </section>
    </LazyMotion>
  );
}
