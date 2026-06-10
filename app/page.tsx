"use client";

import { useState, useCallback } from "react";
import { Preloader } from "@/components/shared/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

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
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
}
