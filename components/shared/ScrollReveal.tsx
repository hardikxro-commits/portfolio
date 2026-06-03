"use client";

import { type ReactNode } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
