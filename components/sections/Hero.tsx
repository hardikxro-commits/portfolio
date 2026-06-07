"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  gold: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  length: number;
}

interface HeroProps {
  visible: boolean;
}

export function Hero({ visible }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const rafRef = useRef(0);
  const lastSpawnRef = useRef(0);

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

    const stars: Star[] = [];
    for (let i = 0; i < 320; i++) {
      const gold = Math.random() < 0.18;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.1 + Math.random() * 1.8,
        baseAlpha: gold ? 0.5 + Math.random() * 0.5 : 0.3 + Math.random() * 0.5,
        twinkleSpeed: 0.015 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
        gold,
      });
    }
    starsRef.current = stars;

    const spawnShootingStar = () => {
      const angle = Math.PI / 6 + Math.random() * (Math.PI / 3 - Math.PI / 6);
      const speed = 12 + Math.random() * 8;
      shootingStarsRef.current.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.025 + Math.random() * 0.015,
        length: 80 + Math.random() * 60,
      });
    };

    const draw = (time: number) => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.phase += star.twinkleSpeed;
        const alphaFactor = 0.5 + 0.5 * Math.sin(star.phase);
        const alpha = star.baseAlpha * alphaFactor;
        const color = star.gold
          ? `rgba(196, 163, 90, ${alpha})`
          : `rgba(232, 213, 163, ${alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (star.r > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = star.gold
            ? `rgba(196, 163, 90, 0.05)`
            : `rgba(232, 213, 163, 0.06)`;
          ctx.fill();
        }
      }

      if (time - lastSpawnRef.current > 2200 + Math.random() * 3500) {
        spawnShootingStar();
        lastSpawnRef.current = time;
      }

      const sStars = shootingStarsRef.current;
      for (let i = sStars.length - 1; i >= 0; i--) {
        const s = sStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        if (s.life <= 0) {
          sStars.splice(i, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(
          s.x, s.y,
          s.x - s.vx * (s.length / s.vx),
          s.y - s.vy * (s.length / s.vy)
        );
        grad.addColorStop(0, `rgba(196, 163, 90, ${s.life})`);
        grad.addColorStop(1, "rgba(196, 163, 90, 0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - (s.vx / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.length,
          s.y - (s.vy / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.length
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 240, 232, ${s.life})`;
        ctx.fill();
      }
    };

    lastSpawnRef.current = performance.now();

    const loop = (time: number) => {
      draw(time);
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
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Starry Night background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/starry-night.jpg")',
          filter: "brightness(0.5)",
        }}
      />

      {/* Canvas stars on top */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Content wrapper */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 sm:px-12 lg:px-20">
        {/* Tag line */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#C4A35A]">
            — Student &middot; Developer &middot; Mumbai
          </span>
        </motion.p>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 1.1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display leading-[0.92] text-[#F5F0E8] select-none"
            style={{ fontSize: "clamp(52px, 11vw, 160px)" }}
          >
            HARDIK
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 1.25,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display leading-[0.92] select-none"
            style={{ fontSize: "clamp(52px, 11vw, 160px)", color: "#C4A35A" }}
          >
            NISHAD
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6, ease: "easeOut" }}
          className="font-sans text-[16px] leading-[1.7] max-w-[420px] mt-6"
          style={{ color: "rgba(245,240,232,0.55)" }}
        >
          I write code, build things, and try to get a little better every day.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-4 mt-8"
        >
          <a
            href="/projects"
            className="inline-flex items-center bg-[#C4A35A] text-[#0F0B0A] font-sans text-[12px] font-bold tracking-[0.2em] uppercase px-7 py-[14px] transition-opacity hover:opacity-90"
          >
            View Projects
          </a>
          <a
            href="https://github.com/hardikxro-commits"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-[rgba(196,163,90,0.3)] text-[rgba(245,240,232,0.7)] font-sans text-[12px] font-bold tracking-[0.2em] uppercase px-7 py-[14px] transition-colors hover:border-[#C4A35A]"
          >
            GitHub ↗
          </a>
        </motion.div>
      </div>

      {/* Constellation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute z-20"
        style={{
          right: "clamp(20px, 6vw, 80px)",
          top: "clamp(200px, 35vh, 360px)",
        }}
      >
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
          <circle cx="20" cy="50" r="2" fill="#C4A35A" />
          <circle cx="50" cy="20" r="1.5" fill="#C4A35A" />
          <circle cx="70" cy="60" r="2.5" fill="#C4A35A" />
          <circle cx="100" cy="30" r="1.5" fill="#C4A35A" />
          <circle cx="120" cy="70" r="2" fill="#C4A35A" />
          <circle cx="90" cy="80" r="1.5" fill="#C4A35A" />
          <circle cx="40" cy="75" r="1" fill="#C4A35A" />
          <line x1="20" y1="50" x2="50" y2="20" stroke="#C4A35A" strokeWidth="0.5" opacity="0.6" />
          <line x1="50" y1="20" x2="100" y2="30" stroke="#C4A35A" strokeWidth="0.5" opacity="0.6" />
          <line x1="70" y1="60" x2="20" y2="50" stroke="#C4A35A" strokeWidth="0.5" opacity="0.6" />
          <line x1="70" y1="60" x2="100" y2="30" stroke="#C4A35A" strokeWidth="0.5" opacity="0.6" />
          <line x1="70" y1="60" x2="120" y2="70" stroke="#C4A35A" strokeWidth="0.5" opacity="0.6" />
          <line x1="120" y1="70" x2="100" y2="30" stroke="#C4A35A" strokeWidth="0.5" opacity="0.6" />
          <line x1="70" y1="60" x2="90" y2="80" stroke="#C4A35A" strokeWidth="0.5" opacity="0.6" />
          <line x1="40" y1="75" x2="90" y2="80" stroke="#C4A35A" strokeWidth="0.5" opacity="0.6" />
          <line x1="40" y1="75" x2="20" y2="50" stroke="#C4A35A" strokeWidth="0.5" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.6 }}
        className="absolute bottom-10 left-0 right-0 z-20 flex items-center justify-between px-8 sm:px-12 lg:px-20"
      >
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-[1px] overflow-hidden bg-[rgba(196,163,90,0.3)]">
            <div
              className="absolute left-0 w-full h-full bg-[#C4A35A]"
              style={{ animation: "scroll-line 1.8s ease-in-out infinite" }}
            />
          </div>
          <span className="font-mono text-[10px] tracking-[0.15em] text-[rgba(245,240,232,0.5)]">
            SCROLL
          </span>
        </div>
        <p className="font-mono text-[10px] text-[rgba(245,240,232,0.35)] text-right">
          Mumbai, India / &copy; 2026
        </p>
      </motion.div>
    </section>
  );
}
