import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-accent-border/20 bg-bg-secondary/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent-border/40 hover:shadow-[0_0_30px_rgba(196,163,90,0.06)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
