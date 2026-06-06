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
    <div className="mx-auto max-w-[280px]">
      <div
        className="relative rounded-[2.5rem] border-[3px] border-gray-700 bg-gray-800 shadow-2xl"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ userSelect: "none" }}
      >
        <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-gray-800">
          <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-gray-600" />
        </div>

        <div className="m-[3px] overflow-hidden rounded-[2.2rem] bg-black">
          <div className="relative aspect-[412/915]">
            <img
              src={slide.src}
              alt={slide.label}
              className="h-full w-full object-contain"
              draggable={false}
            />

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

          <div className="flex items-center justify-center gap-1.5 px-4 pb-3 pt-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current
                    ? "h-1.5 w-5 bg-accent-primary"
                    : "h-1.5 w-1.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-text-secondary">
        {slide.label}
      </p>
    </div>
  );
}
