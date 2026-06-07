"use client";

import { useState, useCallback } from "react";
import { Preloader } from "@/components/shared/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setHeroVisible(true);
  }, []);

  return (
    <>
      {!heroVisible && <Preloader onComplete={handlePreloaderComplete} />}
      <Hero visible={heroVisible} />
      <About />
    </>
  );
}
