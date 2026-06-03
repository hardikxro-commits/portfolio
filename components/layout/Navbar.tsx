"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={cn(
        "mx-auto transition-all duration-500",
        scrolled ? "max-w-4xl px-3 pt-2 sm:pt-3" : "max-w-7xl px-4 sm:px-6 lg:px-8 pt-4",
      )}>
        <div
          className={cn(
            "relative overflow-hidden transition-all duration-500",
            scrolled
              ? "rounded-2xl border border-white/[0.06] liquid-glass-nav shadow-2xl shadow-black/40"
              : "rounded-none bg-transparent",
          )}
        >
          <nav className="relative z-10 flex items-center justify-between px-4 py-2.5 sm:px-5">
            <a
              href="/"
              className={cn(
                "font-display text-lg font-bold tracking-tight text-text-primary transition-all duration-300",
                scrolled ? "" : "",
              )}
            >
              HN<span className="text-accent-primary">.</span>
            </a>

            <div className="hidden items-center md:flex">
              <div className="flex items-center gap-0.5 rounded-xl bg-white/[0.03] px-1 py-0.5">
                {site.navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:text-text-primary hover:bg-white/[0.06]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 rounded-lg p-2 text-text-secondary hover:text-text-primary md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden liquid-glass-nav">
          {site.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
