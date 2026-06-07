"use client";

import { useState, useCallback, useEffect } from "react";
import { Preloader } from "@/components/shared/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setHeroVisible(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 z-[9999] bg-[#0F0B0A]" />;
  }

  return (
    <>
      {!heroVisible && <Preloader onComplete={handlePreloaderComplete} />}
      <Hero visible={heroVisible} />
      <About />
    </>
  );
}
