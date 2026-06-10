import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  badge?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  badge,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {badge && (
        <span className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-subtle px-4 py-1 text-xs font-medium text-accent-primary mb-5">
          <span className="w-1 h-1 rounded-full bg-accent-primary" />
          {badge}
          <ChevronRight className="h-3 w-3" />
        </span>
      )}
      <div className="relative">
        <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-accent-primary to-transparent mt-4" />
      </div>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-text-secondary max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
