"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MessageSquareQuote } from "lucide-react";

const placeholderTestimonials = [
  {
    name: "Coming Soon",
    role: "Future collaborator",
    text: "Testimonials from colleagues, clients, and mentors will appear here.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Testimonials"
          subtitle="What people say about working with me"
          badge="Social Proof"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {placeholderTestimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="flex flex-col items-center justify-center rounded-xl border border-border-default bg-bg-secondary p-10 text-center">
                <MessageSquareQuote size={32} className="mb-4 text-text-muted" />
                <p className="text-sm leading-relaxed text-text-muted italic max-w-xs">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 h-10 w-10 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted font-display text-sm">
                  ?
                </div>
                <p className="mt-2 text-sm font-medium text-text-muted">{t.name}</p>
                <p className="text-xs text-text-muted">{t.role}</p>
              </div>
            </ScrollReveal>
          ))}

          {Array.from({ length: 2 }).map((_, i) => (
            <ScrollReveal key={`empty-${i}`} delay={0.2 + i * 0.1}>
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle bg-bg-secondary/30 p-10 text-center">
                <div className="h-10 w-10 rounded-full border border-dashed border-border-default flex items-center justify-center text-text-muted">
                  <MessageSquareQuote size={16} />
                </div>
                <p className="mt-3 text-xs text-text-muted">
                  Your testimonial could be here
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
