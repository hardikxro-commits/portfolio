"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeButtonProps {
  className?: string;
}

export function ResumeButton({ className }: ResumeButtonProps) {
  return (
    <a
      href="/resume.pdf"
      download
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-accent-primary px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:bg-accent-hover active:scale-[0.97]",
        className
      )}
    >
      <Download size={14} />
      Resume
    </a>
  );
}
