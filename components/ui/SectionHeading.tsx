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
        <span className="inline-flex items-center gap-1 rounded-full border border-accent-border bg-accent-subtle px-3 py-1 text-xs font-medium text-accent-primary mb-4">
          {badge}
          <ChevronRight className="h-3 w-3" />
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
