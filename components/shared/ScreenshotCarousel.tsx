"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : c));
  }, []);

  const next = useCallback(() => {
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
      diff > 0 ? prev() : next();
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="mx-auto max-w-sm">
      <div
        className="relative overflow-hidden rounded-xl border border-border-subtle bg-bg-secondary"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ userSelect: "none" }}
      >
        <div className="aspect-[412/915] relative">
          <img
            src={slide.src}
            alt={slide.label}
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>

        {current > 0 && (
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {current < screenshots.length - 1 && (
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-5 bg-accent-primary"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-text-secondary">
        {slide.label}
      </p>
    </div>
  );
}
