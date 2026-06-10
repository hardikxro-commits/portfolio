import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "a";
  href?: string;
}

export function GlowCard({
  children,
  className,
  as: Component = "div",
  href,
}: GlowCardProps) {
  const classes = cn(
    "relative overflow-hidden rounded-xl border border-accent-border/15 p-6 transition-all duration-300 bg-bg-secondary/80 backdrop-blur-sm",
    "has-hover:hover:border-accent-border/40 has-hover:hover:-translate-y-1 has-hover:hover:shadow-[0_0_40px_rgba(196,163,90,0.08)]",
    className,
  );

  const inner = <div className="relative z-10">{children}</div>;

  if (Component === "a" && href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return <div className={classes}>{inner}</div>;
}
