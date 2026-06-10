"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BlogTOCProps {
  headings: { id: string; text: string; level: number }[];
  className?: string;
}

export function BlogTOC({ headings, className }: BlogTOCProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className={cn("space-y-1", className)} aria-label="Table of contents">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
        On this page
      </p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          style={{ paddingLeft: `${(h.level - 2) * 12}px` }}
          className={cn(
            "block text-xs transition-colors duration-200",
            activeId === h.id
              ? "text-text-primary font-medium"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
