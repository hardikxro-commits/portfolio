"use client";

import { useState, useEffect, useRef, type RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    let rafId: number;
    const throttled = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => handler(e));
    };
    window.addEventListener("mousemove", throttled, { passive: true });
    return () => {
      window.removeEventListener("mousemove", throttled);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return pos;
}

export function useMousePositionRelative(
  ref: RefObject<HTMLElement | null>,
): { x: number; y: number; isInside: boolean } {
  const [state, setState] = useState({ x: 0, y: 0, isInside: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setState({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true,
      });
    };

    const handleMouseLeave = () => {
      setState((s) => ({ ...s, isInside: false }));
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return state;
}
