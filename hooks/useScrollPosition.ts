"use client";

import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    let prev = 0;
    const onScroll = () => {
      const curr = window.scrollY;
      setScrollY(curr);
      setDirection(curr > prev ? "down" : "up");
      prev = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const atTop = scrollY < 10;
  const atBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;

  return { scrollY, direction, atTop, atBottom };
}
