"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Screenshot {
  src: string;
  label: string;
}

interface ScreenshotCarouselProps {
  screenshots: Screenshot[];
}

export function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const [direction, setDirection] = useState(0);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c > 0 ? c - 1 : c));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c < screenshots.length - 1 ? c + 1 : c));
  }, [screenshots.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  if (!screenshots.length) return null;

  const slide = screenshots[current];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 50) {
      setDirection(diff > 0 ? -1 : 1);
      diff > 0 ? prev() : next();
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const variants = {
    enter: (d: number) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -80, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto max-w-[340px]"
    >
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ userSelect: "none" }}
      >
        <div className="relative aspect-[412/915]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={current}
              src={slide.src}
              alt={slide.label}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-contain"
              draggable={false}
            />
          </AnimatePresence>

          {current > 0 && (
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-black/80 hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {current < screenshots.length - 1 && (
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-black/80 hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {screenshots.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full"
            animate={{
              width: i === current ? 20 : 6,
              height: 6,
              backgroundColor: i === current ? "#3b82f6" : "rgba(156,163,175,0.4)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <motion.p
        key={current}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-3 text-center text-sm text-text-secondary"
      >
        {slide.label}
      </motion.p>
    </motion.div>
  );
}
