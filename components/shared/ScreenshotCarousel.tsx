"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [drawerOpen, setDrawerOpen] = useState(false);
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
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

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

  const drawerVariants = {
    enter: { x: "100%" },
    center: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full"
      >
        <div
          className="overflow-hidden rounded-3xl shadow-2xl cursor-pointer bg-bg-secondary"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onClick={() => setDrawerOpen(true)}
          style={{ userSelect: "none" }}
        >
          <div className="relative aspect-[412/915] max-h-[75vh]">
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
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-black/80 hover:scale-110"
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {current < screenshots.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-black/80 hover:scale-110"
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          <div className="border-t border-border-subtle px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-text-primary">
                {slide.label}
              </p>
              <div className="flex items-center gap-1.5">
                {screenshots.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    className="rounded-full"
                    animate={{
                      width: i === current ? 16 : 5,
                      height: 5,
                      backgroundColor: i === current ? "#3b82f6" : "rgba(156,163,175,0.4)",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                onClick={() => setDrawerOpen(false)}
              />

              <motion.div
                variants={drawerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={{ left: 0, right: 0.5 }}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.x > 100 || velocity.x > 100) setDrawerOpen(false);
                }}
                className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-2xl flex-col bg-bg-primary shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-text-primary backdrop-blur-md transition-colors hover:bg-black/20"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-1 items-center justify-center p-6">
                  <div className="relative max-h-[85vh] w-full max-w-sm">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
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
                          />
                        </AnimatePresence>

                        {current > 0 && (
                          <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-black/80 hover:scale-110"
                          >
                            <ChevronLeft size={22} />
                          </button>
                        )}

                        {current < screenshots.length - 1 && (
                          <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-black/80 hover:scale-110"
                          >
                            <ChevronRight size={22} />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="mt-4 text-center text-base text-text-primary">
                      {slide.label}
                    </p>

                    <div className="mt-3 flex items-center justify-center gap-1.5">
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
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
