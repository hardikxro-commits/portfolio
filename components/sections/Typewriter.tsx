"use client";

import { useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypewriterProps {
  words: readonly string[];
  className?: string;
}

export function Typewriter({ words, className }: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReduced = useReducedMotion();

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      setCharIndex((i) => i - 1);
    } else {
      setCharIndex((i) => i + 1);
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
  }, [wordIndex, charIndex, isDeleting, words]);

  useEffect(() => {
    if (prefersReduced) return;
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, prefersReduced]);

  if (prefersReduced) {
    return <span className={className}>{words[0]}</span>;
  }

  const displayText = words[wordIndex].slice(0, charIndex);

  return (
    <span className={className}>
      {displayText}
      <span
        className="inline-block w-[2px] h-[1em] bg-accent-primary ml-0.5 align-middle"
        style={{ animation: "blink 0.8s step-end infinite" }}
      />
    </span>
  );
}
