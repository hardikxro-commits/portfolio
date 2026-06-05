"use client";

import { useEffect, useState } from "react";

export function BackgroundTransition() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setOffsetY(window.scrollY * 0.3);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offsetY}px) scale(1.1)`,
          willChange: "transform",
        }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover brightness-[0.25] saturate-[0.6]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F0B0A]/75 via-[#0F0B0A]/30 to-[#0F0B0A]" />
    </div>
  );
}
