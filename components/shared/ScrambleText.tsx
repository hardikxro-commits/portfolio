"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DURATION = 1000;

export function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const start = performance.now();

    const scramble = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          const revealAt = (i + 1) / text.length;
          if (progress > revealAt) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);

      if (progress < 1) {
        requestAnimationFrame(scramble);
      } else {
        setDisplay(text);
      }
    };

    requestAnimationFrame(scramble);
  }, [text]);

  return <>{display}</>;
}
