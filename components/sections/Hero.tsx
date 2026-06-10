"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroBadge from "@/components/ui/hero-badge";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight, GitFork } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface HeroProps {
  visible: boolean;
}

export function Hero({ visible }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Array<{ x: number; y: number; r: number; baseAlpha: number; twinkleSpeed: number; phase: number; gold: boolean }> = [];
    for (let i = 0; i < 200; i++) {
      const gold = Math.random() < 0.15;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.3 + Math.random() * 1.5,
        baseAlpha: gold ? 0.4 + Math.random() * 0.6 : 0.2 + Math.random() * 0.4,
        twinkleSpeed: 0.01 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
        gold,
      });
    }

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.phase += star.twinkleSpeed;
        const alpha = star.baseAlpha * (0.5 + 0.5 * Math.sin(star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.gold
          ? `rgba(196, 163, 90, ${alpha})`
          : `rgba(232, 213, 163, ${alpha * 0.6})`;
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#080706]/40 via-transparent to-[#080706]/80" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
        >
          <HeroBadge
            text="Just building things and learning along the way."
            variant="default"
            size="sm"
          />
        </motion.div>

        <div className="mt-8 text-center">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.7 }}
              className="font-display italic leading-[0.85] text-[#F5F0E8] select-none"
              style={{ fontSize: "clamp(48px, 10vw, 140px)", fontWeight: 500 }}
            >
              Hardik
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.85 }}
              className="font-display leading-[0.85] select-none gold-gradient-text"
              style={{ fontSize: "clamp(48px, 10vw, 140px)", fontWeight: 700 }}
            >
              Nishad
            </motion.h1>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 1.2 }}
          className="mt-6 max-w-lg text-center font-sans text-[15px] leading-relaxed text-text-muted"
        >
          I write code, build things, and try to get a little better every day. Student & Developer based in India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 1.4 }}
          className="mt-10 flex items-center gap-4"
        >
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-accent-primary text-[#080706] hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(196,163,90,0.3)]"
            )}
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="https://github.com/hardikxro-commits"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 border-accent-border text-text-secondary hover:text-accent-primary hover:border-accent-primary"
            )}
          >
            <GitFork className="h-4 w-4" /> GitHub
          </Link>
        </motion.div>
      </div>

      {/* Constellation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute z-10"
        style={{
          right: "clamp(20px, 6vw, 80px)",
          top: "clamp(200px, 35vh, 360px)",
        }}
      >
        <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
          <circle cx="20" cy="50" r="2.5" fill="#C4A35A" opacity="0.8" />
          <circle cx="50" cy="20" r="2" fill="#C4A35A" opacity="0.6" />
          <circle cx="80" cy="65" r="3" fill="#E8D4A3" opacity="0.9" />
          <circle cx="110" cy="30" r="2" fill="#C4A35A" opacity="0.6" />
          <circle cx="135" cy="75" r="2.5" fill="#C4A35A" opacity="0.7" />
          <circle cx="100" cy="90" r="2" fill="#D4B96E" opacity="0.5" />
          <circle cx="50" cy="80" r="1.5" fill="#C4A35A" opacity="0.5" />
          <circle cx="30" cy="30" r="1.5" fill="#E8D4A3" opacity="0.4" />
          <line x1="20" y1="50" x2="50" y2="20" stroke="#C4A35A" strokeWidth="0.5" opacity="0.4" />
          <line x1="50" y1="20" x2="110" y2="30" stroke="#C4A35A" strokeWidth="0.5" opacity="0.4" />
          <line x1="80" y1="65" x2="20" y2="50" stroke="#C4A35A" strokeWidth="0.5" opacity="0.4" />
          <line x1="80" y1="65" x2="110" y2="30" stroke="#C4A35A" strokeWidth="0.5" opacity="0.4" />
          <line x1="80" y1="65" x2="135" y2="75" stroke="#C4A35A" strokeWidth="0.5" opacity="0.4" />
          <line x1="135" y1="75" x2="110" y2="30" stroke="#C4A35A" strokeWidth="0.5" opacity="0.4" />
          <line x1="80" y1="65" x2="100" y2="90" stroke="#C4A35A" strokeWidth="0.5" opacity="0.4" />
          <line x1="50" y1="80" x2="100" y2="90" stroke="#C4A35A" strokeWidth="0.5" opacity="0.4" />
          <line x1="50" y1="80" x2="20" y2="50" stroke="#C4A35A" strokeWidth="0.5" opacity="0.4" />
          <line x1="30" y1="30" x2="20" y2="50" stroke="#C4A35A" strokeWidth="0.5" opacity="0.3" />
          <line x1="30" y1="30" x2="50" y2="20" stroke="#C4A35A" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 left-0 right-0 z-10 flex items-center justify-between px-8 sm:px-12 lg:px-20"
      >
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-[1px] overflow-hidden bg-accent-border/30">
            <div className="absolute left-0 w-full h-full bg-gradient-to-b from-accent-primary to-transparent animate-[scroll-line_1.8s_ease-in-out_infinite]" />
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted/50">
            SCROLL
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[9px] text-text-muted/30">Mumbai, India</span>
          <span className="font-mono text-[9px] text-text-muted/30">&copy; 2026</span>
        </div>
      </motion.div>
    </section>
  );
}
