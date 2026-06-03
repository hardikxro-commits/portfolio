"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timeline } from "@/content/data/timeline";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  GitFork,
  Award,
  Briefcase,
  Target,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  GitFork,
  Award,
  Briefcase,
  Target,
  Sparkles,
  Rocket: Sparkles,
  Brain: Sparkles,
  FileCode: GitFork,
  Cloud: Sparkles,
  Globe: GitFork,
  Code2: GitFork,
  Terminal: GitFork,
};

const typeColors: Record<string, string> = {
  education: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  project: "border-accent-border bg-accent-subtle text-accent-primary",
  certification: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  career: "border-green-500/30 bg-green-500/10 text-green-400",
  goal: "border-purple-500/30 bg-purple-500/10 text-purple-400",
};

export function Timeline() {
  return (
    <section id="timeline" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Timeline"
          subtitle="My journey so far — and where I&apos;m heading"
          badge="History"
        />

        <div className="relative">
          <div className="absolute left-[23px] top-0 h-full w-px bg-border-default md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {timeline.map((event, i) => {
              const Icon = iconMap[event.icon] || Sparkles;
              const isLeft = i % 2 === 0;

              return (
                <ScrollReveal key={`${event.date}-${event.title}`} delay={i * 0.07}>
                  <div
                    className={cn(
                      "relative flex items-start gap-5 md:gap-0",
                      isLeft ? "md:flex-row" : "md:flex-row-reverse",
                    )}
                  >
                    <div
                      className={cn(
                        "flex w-full md:w-1/2",
                        isLeft ? "md:pr-10 md:text-right" : "md:pl-10",
                      )}
                    >
                      <div className="flex-1">
                        <span className="font-mono text-[11px] text-text-muted">
                          {event.date}
                        </span>
                        <h3 className="mt-0.5 text-sm font-semibold text-text-primary">
                          {event.title}
                        </h3>
                        <p className="text-xs text-text-secondary">{event.subtitle}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute left-[15px] top-1 z-10 md:relative md:left-auto md:flex md:w-10 md:justify-center">
                      <div
                        className={cn(
                          "flex h-[18px] w-[18px] items-center justify-center rounded-full border-2",
                          typeColors[event.type] || "border-border-default bg-bg-tertiary",
                        )}
                      >
                        <Icon size={8} />
                      </div>
                    </div>

                    <div className="hidden w-1/2 md:block" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
