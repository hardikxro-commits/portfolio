"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("opencode_preloaded")) {
      setVisible(false);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const hide = () => {
      sessionStorage.setItem("opencode_preloaded", "true");
      timeout = setTimeout(() => setVisible(false), 400);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
    }

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-500">
      <div className="relative flex items-center justify-center">
        <div
          className="absolute h-20 w-20 rounded-full border border-white/10"
          style={{ animation: "preloader-spin 3s linear infinite" }}
        />
        <div
          className="absolute h-14 w-14 rounded-full border-t border-white/30"
          style={{ animation: "preloader-spin 2s linear infinite reverse" }}
        />
        <span className="font-display text-2xl font-bold tracking-tight text-white/80">
          H
        </span>
      </div>
      <p className="mt-12 text-xs tracking-[0.3em] text-white/30 uppercase">
        Loading
      </p>
    </div>
  );
}
