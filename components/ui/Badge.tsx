import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "success";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-accent-subtle text-accent-primary",
        variant === "accent" && "bg-accent-primary text-white",
        variant === "success" && "bg-green-500/10 text-green-400",
        className,
      )}
    >
      {children}
    </span>
  );
}
