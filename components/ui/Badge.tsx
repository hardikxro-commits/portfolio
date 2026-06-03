import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "success" | "cyan";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-accent-subtle text-accent-primary border border-accent-border",
        variant === "accent" && "bg-accent-subtle text-accent-primary",
        variant === "success" && "bg-green-500/10 text-green-400 border border-green-500/20",
        variant === "cyan" && "bg-cyan-500/10 text-accent-cyan border border-cyan-500/20",
        className,
      )}
    >
      {children}
    </span>
  );
}
