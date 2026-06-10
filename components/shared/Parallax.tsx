"use client";

import { type ReactNode, useRef } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScrollPosition();

  const y = ref.current
    ? (ref.current.getBoundingClientRect().top + scrollY - scrollY) * speed
    : 0;

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translateY(${y}px)` }}
    >
      {children}
    </div>
  );
}
