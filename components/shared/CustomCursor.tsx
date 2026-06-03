"use client";

import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const prefersReduced = useReducedMotion();
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReduced) return;
    let rafId: number;
    const lerp = () => {
      setRingPos((prev) => ({
        x: prev.x + (x - prev.x) * 0.1,
        y: prev.y + (y - prev.y) * 0.1,
      }));
      rafId = requestAnimationFrame(lerp);
    };
    rafId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(rafId);
  }, [x, y, prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;
    const onHoverStart = () => setIsHoveringLink(true);
    const onHoverEnd = () => setIsHoveringLink(false);

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onHoverStart);
      el.addEventListener("mouseleave", onHoverEnd);
    });
    return () => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverStart);
        el.removeEventListener("mouseleave", onHoverEnd);
      });
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isMobile) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] hidden lg:flex items-center justify-center"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
          width: isHoveringLink ? 20 : 14,
          height: isHoveringLink ? 20 : 14,
          transition: "width 0.2s, height 0.2s",
        }}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
          <path
            d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z"
            fill="#F9B2D7"
            opacity={isHoveringLink ? 0.9 : 0.7}
            style={{ filter: "drop-shadow(0 0 4px rgba(249, 178, 215, 0.5))" }}
          />
        </svg>
      </div>
      <div
        className="pointer-events-none fixed z-[9998] hidden lg:block"
        style={{
          transform: `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`,
          width: isHoveringLink ? 48 : 32,
          height: isHoveringLink ? 48 : 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(249, 178, 215, 0.25)",
          transition: "width 0.25s, height 0.25s",
        }}
      />
    </>
  );
}
