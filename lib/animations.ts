import { type Variants } from "framer-motion";

export const DURATIONS = {
  instant: 0.05,
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
  slower: 0.8,
  xslow: 1.2,
} as const;

export const EASINGS = {
  out: [0.22, 1, 0.36, 1] as const,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.slow, ease: EASINGS.out },
  },
};
