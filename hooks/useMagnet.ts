"use client";

import { useRef, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useMagnet() {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      const maxDist = 100;
      const strength = Math.max(0, 1 - dist / maxDist);
      const offsetX = x * 0.15 * strength;
      const offsetY = y * 0.15 * strength;

      ref.current.style.setProperty("will-change", "transform");
      ref.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    },
    [prefersReduced],
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
    ref.current.style.removeProperty("will-change");
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
