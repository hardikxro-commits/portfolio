"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const sectionBackgrounds: Record<string, string> = {
  hero: "/images/hero-bg.jpg",
  about: "/images/backgrounds/chihiro039.jpg",
  skills: "/images/backgrounds/chihiro002.jpg",
  roadmap: "/images/backgrounds/chihiro045.jpg",
  projects: "/images/backgrounds/chihiro042.jpg",
  timeline: "/images/backgrounds/chihiro007.jpg",
  testimonials: "/images/backgrounds/chihiro003.jpg",
  contact: "/images/backgrounds/chihiro011.jpg",
};

const pageBackgrounds: Record<string, string> = {
  "/now": "/images/naruto-team.avif",
  "/blog": "/images/backgrounds/chihiro035.jpg",
};

const sectionIds = Object.keys(sectionBackgrounds);

export function BackgroundTransition() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const homePage = pathname === "/";

  useEffect(() => {
    const urls = homePage
      ? Object.values(sectionBackgrounds)
      : Object.values(pageBackgrounds);
    let loadedCount = 0;
    urls.forEach((url, i) => {
      const img = new Image();
      const onload = () => {
        loadedCount++;
        if (loadedCount >= urls.length) setLoaded(true);
      };
      img.onload = onload;
      img.onerror = onload;
      img.src = url;
      imagesRef.current[i] = img;
    });
  }, [homePage]);

  useEffect(() => {
    if (!homePage) return;

    const observers: IntersectionObserver[] = [];
    let bestIndex = 0;

    sectionIds.forEach((id, index) => {
      const els = document.querySelectorAll(`[id="${id}"]`);
      const el = els[0] as HTMLElement | null;
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              bestIndex = index;
              setActiveIndex(index);
              break;
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    const handleScroll = () => {
      setActiveIndex(bestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [homePage]);

  const currentSrc = homePage
    ? Object.values(sectionBackgrounds)[activeIndex]
    : pageBackgrounds[pathname] || "/images/backgrounds/howl007.jpg";

  return (
    <div className="fixed inset-0 -z-20" aria-hidden="true">
      {homePage ? (
        Object.values(sectionBackgrounds).map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: loaded && activeIndex === i ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover brightness-[0.25] saturate-[0.6]"
              loading={i < 3 ? "eager" : "lazy"}
            />
          </div>
        ))
      ) : (
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <img
            src={currentSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.25] saturate-[0.6]"
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F0B0A]/75 via-[#0F0B0A]/30 to-[#0F0B0A]" />
    </div>
  );
}
