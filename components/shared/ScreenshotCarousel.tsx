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

const CARD_W = 130;
const ASPECT = 412 / 915;
const CARD_H = CARD_W / ASPECT;

const POSITIONS = [
  { left: "-8%", scale: 0.35, opacity: 0.15, z: 0 },
  { left: "20%", scale: 0.64, opacity: 0.50, z: 1 },
  { left: "50%", scale: 1.00, opacity: 1.00, z: 2 },
  { left: "80%", scale: 0.64, opacity: 0.50, z: 1 },
  { left: "108%", scale: 0.35, opacity: 0.15, z: 0 },
];

export function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  const len = screenshots.length;
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const cards = POSITIONS.map((pos, i) => {
    const idx = (current + i - 2 + len) % len;
    const shot = screenshots[idx];
    return { ...pos, idx, shot };
  });

  const handleSwipe = useCallback((e: React.MouseEvent, end: boolean) => {
    if (!end) return;
    const diff = e.clientX - dragStart.current;
    if (Math.abs(diff) > 40) {
      diff > 0 ? prev() : next();
    }
  }, [prev, next]);

  const dragStart = useRef(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full"
    >
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: CARD_H + 16 }}
        onMouseDown={(e) => { dragStart.current = e.clientX; }}
        onMouseUp={(e) => handleSwipe(e, true)}
        onMouseLeave={(e) => handleSwipe(e, true)}
      >
        <AnimatePresence mode="popLayout">
          {cards.map((card) => (
            <motion.div
              key={card.idx}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                left: card.left,
                scale: card.scale,
                opacity: card.opacity,
                zIndex: card.z,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer overflow-hidden rounded-2xl"
              style={{ width: CARD_W, aspectRatio: "412/915" }}
              onClick={() => {
                const clickIdx = cards.indexOf(card);
                if (clickIdx !== 2) goTo(card.idx);
              }}
            >
              <img
                src={card.shot.src}
                alt={card.shot.label}
                className="h-full w-full object-contain"
                draggable={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-all hover:bg-black/60"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-all hover:bg-black/60"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
