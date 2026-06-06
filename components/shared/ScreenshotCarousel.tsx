"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Screenshot {
  src: string;
  label: string;
}

interface ScreenshotCarouselProps {
  screenshots: Screenshot[];
}

const CARD_W = 240;
const POSITIONS = [
  { scale: 0.28, opacity: 0.15, z: 0, marginL: -68 },
  { scale: 0.58, opacity: 0.50, z: 1, marginL: -48 },
  { scale: 1.00, opacity: 1.00, z: 2, marginL: 0 },
  { scale: 0.58, opacity: 0.50, z: 1, marginL: -48 },
  { scale: 0.28, opacity: 0.15, z: 0, marginL: -68 },
];

export function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  const len = screenshots.length;
  const [current, setCurrent] = useState(0);
  const [pos, setPos] = useState(POSITIONS);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + len) % len);
  }, [len]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % len);
  }, [len]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  if (!len) return null;

  const cards = pos.map((p, i) => {
    const idx = (current + i - 2 + len) % len;
    return { ...p, idx, shot: screenshots[idx] };
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full"
    >
      <div className="relative w-full">
        <div className="flex items-center justify-center">
          <div className="flex items-center" style={{ marginLeft: 68 }}>
            {cards.map((card, i) => (
              <motion.div
                key={card.idx}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  scale: card.scale,
                  opacity: card.opacity,
                  zIndex: card.z,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="shrink-0 cursor-pointer overflow-hidden rounded-2xl"
                style={{
                  width: CARD_W,
                  aspectRatio: "412/915",
                  marginLeft: card.marginL,
                }}
                onClick={() => {
                  if (i !== 2) goTo(card.idx);
                }}
              >
                <img
                  src={card.shot.src}
                  alt={card.shot.label}
                  className="h-full w-full max-w-full object-contain"
                  draggable={false}
                  style={{ height: 'auto' }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-all hover:bg-black/60 active:scale-95"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={next}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-all hover:bg-black/60 active:scale-95"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}
