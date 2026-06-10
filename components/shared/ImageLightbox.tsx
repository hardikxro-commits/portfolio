"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface LightboxImage {
  src: string;
  label?: string;
}

export function ImageLightbox({
  images,
  index,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const prevRef = useRef(index);

  useEffect(() => {
    prevRef.current = index;
    setCurrent(index);
  }, [index]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
      if (e.key === "ArrowRight") setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    },
    [images.length, onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!images.length) return null;

  const img = images[current];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/[0.1] p-2 text-text-primary transition-colors hover:bg-white/[0.2]"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
            }}
            className="absolute left-4 z-10 rounded-full bg-white/[0.1] p-2 text-text-primary transition-colors hover:bg-white/[0.2]"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
            }}
            className="absolute right-4 z-10 rounded-full bg-white/[0.1] p-2 text-text-primary transition-colors hover:bg-white/[0.2]"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        className="relative max-h-[85vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={img.src}
          alt={img.label ?? ""}
          width={1200}
          height={800}
          className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain"
          priority
        />
        {img.label && (
          <p className="mt-2 text-center text-sm text-text-secondary">
            {img.label}
          </p>
        )}
        {images.length > 1 && (
          <p className="mt-1 text-center text-xs text-text-muted">
            {current + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  );
}
