import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
    variant === "primary" &&
      "bg-accent-primary text-[#080706] hover:shadow-[0_0_24px_rgba(196,163,90,0.25)] active:scale-[0.98]",
    variant === "ghost" &&
      "text-text-secondary hover:text-accent-primary hover:bg-accent-subtle",
    variant === "outline" &&
      "border border-accent-border/50 bg-transparent text-text-secondary hover:border-accent-primary hover:text-accent-primary",
    size === "sm" && "px-3 py-1.5 text-xs",
    size === "md" && "px-5 py-2.5 text-sm",
    size === "lg" && "px-7 py-3 text-base",
    disabled && "opacity-50 pointer-events-none",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
