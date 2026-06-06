"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { roadmap } from "@/content/data/roadmap";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Play } from "lucide-react";

export function Roadmap() {
  return (
    <section id="roadmap" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-4xl">
        <SectionHeading
          title="Learning Roadmap"
          subtitle="What I&apos;m planning to learn next"
          badge="Journey"
        />

        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-border-default md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {roadmap.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.06}>
                <div
                  className={cn(
                    "relative flex items-start gap-5 md:gap-0",
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                  )}
                >
                  <div
                    className={cn(
                      "flex w-full items-start gap-5 md:w-1/2",
                      i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12",
                    )}
                  >
                    <div
                      className={cn(
                        "relative flex-1 overflow-hidden rounded-lg border p-4 transition-all duration-300",
                        item.status === "completed"
                          ? "border-green-500/20 bg-green-500/5"
                          : item.status === "current"
                            ? "border-accent-border bg-accent-subtle"
                            : "border-border-subtle bg-bg-secondary",
                      )}
                    >
                      <span
                        className={cn(
                          "mb-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                          item.status === "completed"
                            ? "bg-green-500/10 text-green-400"
                            : item.status === "current"
                              ? "bg-accent-primary/10 text-accent-primary"
                              : "bg-bg-tertiary text-text-muted",
                        )}
                      >
                        {item.status}
                      </span>
                      <h3
                        className={cn(
                          "mt-1 text-sm font-semibold",
                          item.status === "future" && "text-text-muted",
                          item.status === "completed" && "text-green-300",
                          item.status === "current" && "text-text-primary",
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-text-secondary">
                        {item.category}
                      </p>
                      {item.description && (
                        <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="absolute left-6 top-2 z-10 md:relative md:left-auto md:flex md:w-10 md:justify-center">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border text-[10px]",
                        item.status === "completed"
                          ? "border-green-500/40 bg-green-500/10 text-green-400"
                          : item.status === "current"
                            ? "border-accent-border bg-accent-primary/10 text-accent-primary"
                            : "border-border-default bg-bg-tertiary text-text-muted",
                      )}
                    >
                      {item.status === "completed" ? (
                        <CheckCircle2 size={14} />
                      ) : item.status === "current" ? (
                        <Play size={12} />
                      ) : (
                        <Circle size={14} />
                      )}
                    </div>
                  </div>

                  <div className="hidden w-1/2 md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
