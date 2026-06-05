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
  const [loaded, setLoaded] = useState(true);
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

    const els = sectionIds
      .map((id) => document.querySelector(`[id="${id}"]`) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    let ticking = false;

    const update = () => {
      ticking = false;
      const viewportMid = window.scrollY + window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;

      els.forEach((el, i) => {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        const mid = (top + bottom) / 2;
        const dist = Math.abs(viewportMid - mid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
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
