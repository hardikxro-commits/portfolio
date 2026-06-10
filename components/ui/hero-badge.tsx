"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroBadgeProps {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "px-3 py-1 text-[10px]",
  md: "px-4 py-1.5 text-[11px]",
  lg: "px-5 py-2 text-xs",
};

const variantClasses = {
  default: "bg-accent-primary/10 text-accent-primary border border-accent-border",
  outline: "border border-accent-border text-accent-primary",
  ghost: "text-text-muted hover:text-accent-primary",
};

export default function HeroBadge({
  href,
  text,
  icon,
  endIcon,
  variant = "default",
  size = "md",
  className,
}: HeroBadgeProps) {
  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-sans font-medium tracking-wider uppercase transition-colors duration-300",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {icon && <span className="w-3 h-3">{icon}</span>}
      {text}
      {endIcon && <span className="w-3 h-3">{endIcon}</span>}
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
