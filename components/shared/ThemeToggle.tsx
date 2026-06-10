"use client";

import { useTheme } from "@/components/shared/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="rounded-lg p-2 text-text-secondary transition-colors duration-200 hover:text-accent-primary hover:bg-[rgba(196,163,90,0.08)]"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
