"use client";

import { type ReactNode, useCallback, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const elRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced || !elRef.current) return;
      const rect = elRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      const maxDist = 100;
      const strength = Math.max(0, 1 - dist / maxDist);
      const offsetX = x * 0.15 * strength;
      const offsetY = y * 0.15 * strength;

      elRef.current.style.setProperty("will-change", "transform");
      elRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    },
    [prefersReduced],
  );

  const handleMouseLeave = useCallback(() => {
    if (!elRef.current) return;
    elRef.current.style.transform = "translate(0, 0)";
    elRef.current.style.removeProperty("will-change");
  }, []);

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200",
    variant === "primary" &&
      "bg-accent-primary text-white hover:bg-accent-hover shadow-lg shadow-accent-glow",
    variant === "ghost" &&
      "border border-white/[0.06] text-text-secondary hover:border-white/[0.12] hover:text-text-primary liquid-glass",
    className,
  );

  const commonProps = {
    ref: elRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: classes,
  };

  if (href) {
    return <a href={href} {...commonProps}>{children}</a>;
  }

  return <button onClick={onClick} {...commonProps}>{children}</button>;
}
