"use client";

import { type ReactNode, useMemo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "word" | "letter";
  delay?: number;
}

export function AnimatedText({
  text,
  className,
  type = "word",
  delay = 0,
}: AnimatedTextProps) {
  const prefersReduced = useReducedMotion();

  const tokens = useMemo(
    () =>
      type === "word" ? text.split(" ") : text.split(""),
    [text, type],
  );

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.span className={className} variants={container} initial="hidden" animate="visible" aria-label={text}>
        {tokens.map((token, i) => (
          <m.span
            key={`${token}-${i}`}
            variants={child}
            className="inline-block"
            style={{ whiteSpace: type === "word" ? "normal" : undefined }}
          >
            {token}
            {type === "word" && i < tokens.length - 1 ? "\u00A0" : ""}
          </m.span>
        ))}
      </m.span>
    </LazyMotion>
  );
}
