"use client";

import { useState, useCallback, useEffect } from "react";
import { Preloader } from "@/components/shared/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setHeroVisible(true);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-[99999] bg-[#0F0B0A] transition-opacity duration-500"
        style={{
          opacity: mounted ? 0 : 1,
          pointerEvents: mounted ? "none" : "auto",
        }}
      />
      {!heroVisible && <Preloader onComplete={handlePreloaderComplete} />}
      <Hero visible={heroVisible} />
      {mounted && <About />}
    </>
  );
}
