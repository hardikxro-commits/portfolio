"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/content/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const sectionIds = ["hero", "about", "skills", "projects"];

const menuVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.96 },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const scrollY = Number(document.body.dataset.scrollY || 0);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      const scrollY = Number(document.body.dataset.scrollY || 0);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;
    const firstLink = menuRef.current.querySelector("a");
    firstLink?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={cn(
        "transition-all duration-500",
        scrolled ? "max-w-4xl px-3 pt-2 sm:pt-3" : "max-w-7xl px-4 sm:px-6 lg:px-8 pt-4",
      )}>
        <div
          className={cn(
            "relative overflow-hidden transition-all duration-500",
            scrolled
              ? "rounded-2xl border border-accent-border/60 liquid-glass-nav shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "rounded-none bg-transparent",
          )}
        >
          {/* Gold accent line on top when scrolled */}
          {scrolled && (
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C4A35A]/50 to-transparent" />
          )}
          <nav className="relative z-50 flex items-center justify-between px-4 py-2.5 sm:px-5">
            <a
              href="/"
              className="font-display text-lg font-bold tracking-tight text-[#F5F0E8]"
            >
              <span className="italic font-medium">H</span>
              <span className="gold-gradient-text">N</span>
            </a>

            <div className="hidden items-center md:flex">
              <div className="flex items-center gap-0.5 rounded-xl bg-[rgba(196,163,90,0.04)] border border-[rgba(196,163,90,0.08)] px-1 py-0.5">
                {site.navLinks.map((link) => {
                  const sectionId = link.href.replace("/#", "");
                  const isActive = sectionIds.includes(sectionId) && activeSection === sectionId;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-[rgba(196,163,90,0.12)] text-[#C4A35A]"
                          : "text-text-secondary hover:text-[#C4A35A] hover:bg-[rgba(196,163,90,0.06)]"
                      )}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                ref={toggleRef}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-50 rounded-lg p-2 text-text-secondary hover:text-[#C4A35A] md:hidden transition-colors duration-200"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col items-start gap-6 px-4 pt-28 md:hidden liquid-glass-nav"
          >
            {/* Gold accent line */}
            <div className="w-12 h-px bg-gradient-to-r from-[#C4A35A] to-transparent mb-2" />
            {site.navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-display text-text-secondary transition-colors hover:text-[#C4A35A]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
