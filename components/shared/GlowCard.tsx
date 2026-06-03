"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "a";
  href?: string;
}

export function GlowCard({
  children,
  className,
  as: Component = "div",
  href,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--x", "50%");
    el.style.setProperty("--y", "50%");
  };

  const classes = cn(
    "group relative overflow-hidden rounded-xl border border-white/[0.06] p-6 transition-all duration-300",
    "hover:border-white/[0.12] hover:-translate-y-1",
    className,
  );

  const inner = (
    <>
      <div className="pointer-events-none absolute inset-0 rounded-xl liquid-glass-card" />
      <div className="pointer-events-none absolute inset-0 rounded-xl liquid-glass-overlay" />
      <div className="pointer-events-none absolute inset-0 rounded-xl liquid-glass-hover liquid-glass-hover-overlay" />
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px at var(--x, 50%) var(--y, 50%), rgba(249, 178, 215, 0.12), transparent)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </>
  );

  if (Component === "a" && href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        style={{ "--x": "50%", "--y": "50%" } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      ref={ref}
      className={classes}
      style={{ "--x": "50%", "--y": "50%" } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {inner}
    </div>
  );
}
