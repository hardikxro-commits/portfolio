"use client";

import { cn } from "@/lib/utils";

interface TagCloudProps {
  tags: string[];
  onSelect?: (tag: string) => void;
  selected?: string;
  className?: string;
}

export function TagCloud({ tags, onSelect, selected, className }: TagCloudProps) {
  const frequencies = tags.reduce<Record<string, number>>((acc, t) => {
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const uniqueTags = Object.keys(frequencies);
  const maxFreq = Math.max(...Object.values(frequencies), 1);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {uniqueTags.map((tag) => {
        const weight = frequencies[tag] / maxFreq;
        const size = 0.75 + weight * 0.5;
        const isSelected = selected === tag;

        return (
          <button
            key={tag}
            onClick={() => onSelect?.(isSelected ? "" : tag)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
              isSelected
                ? "bg-accent-primary text-black"
                : "bg-bg-tertiary text-text-secondary hover:bg-white/[0.1] hover:text-text-primary"
            )}
            style={{ fontSize: `${size * 0.875}rem` }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
