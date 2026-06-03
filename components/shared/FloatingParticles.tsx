"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  el: HTMLDivElement;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  opacity: number;
}

export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;
    const container = containerRef.current;
    const isMobile = matchMedia("(pointer: coarse)").matches;
    const count = isMobile ? 6 : 18;
    const speed = isMobile ? 0.5 : 1;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const size = 2 + Math.random() * 4;
      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${["#F9B2D7", "#CFECF3", "#DAF9DE", "#F6FFDC"][Math.floor(Math.random() * 4)]};
        opacity: 0;
        pointer-events: none;
      `;
      container.appendChild(el);
      particlesRef.current.push({
        el,
        x: Math.random() * 100,
        y: Math.random() * 100,
        dx: (Math.random() - 0.5) * 0.15 * speed,
        dy: (-0.04 - Math.random() * 0.06) * speed,
        size,
        opacity: 0.15 + Math.random() * 0.25,
      });
    }

    let startTime = Date.now();
    let hidden = false;

    const onVisibility = () => {
      hidden = document.hidden;
      if (!hidden) startTime = Date.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const animate = () => {
      if (hidden) { rafRef.current = requestAnimationFrame(animate); return; }
      const elapsed = (Date.now() - startTime) / 1000;
      for (const p of particlesRef.current) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -5) { p.y = 105; p.x = Math.random() * 100; }
        if (p.x < -5 || p.x > 105) p.dx *= -1;
        const fade = Math.sin(elapsed * 0.3 + p.x) * 0.5 + 0.5;
        p.el.style.transform = `translate(${p.x}vw, ${p.y}vh)`;
        p.el.style.opacity = String(p.opacity * fade);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafRef.current);
      particlesRef.current.forEach((p) => p.el.remove());
      particlesRef.current = [];
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true" />;
}
