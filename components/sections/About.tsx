"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Code2, ArrowRight } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="About Me"
          subtitle="An aspiring developer driven by curiosity"
          align="left"
          badge="Story"
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 space-y-6">
            <ScrollReveal>
              <p className="text-lg leading-relaxed text-text-secondary">
                Hey! I&apos;m <span className="font-medium text-text-primary">Hardik Nishad</span>,
                an aspiring developer from Mumbai, India. I&apos;m currently an SYJC student
                studying PCMB (Physics, Chemistry, Mathematics, Biology).
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-base leading-relaxed text-text-secondary">
                I started my programming journey last year in 2025 — not because I had a
                grand vision, but because I felt left behind watching my generation build
                incredible things while I hadn&apos;t even started.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base leading-relaxed text-text-secondary">
                Today, I&apos;m not tied to any particular project. I&apos;m learning to bring my
                imagination to life — those 3 AM thoughts, the random ideas, the apps and
                websites that pop into my head. I want to build all of them.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="relative border-l-2 border-accent-primary/40 pl-5 italic text-text-secondary">
                <p className="text-base leading-relaxed">
                  No grand motive. No revolution. No five-year plan. I just want to make
                  things — driven by nothing but sheer curiosity.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-base leading-relaxed text-text-secondary">
                Down the line, I&apos;m looking forward to studying Computer Science and
                seeing where this journey takes me.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <a
                href="/now"
                className="group inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-colors hover:text-accent-hover"
              >
                See what I&apos;m working on now
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2">
            <ScrollReveal delay={0.3}>
              <div className="sticky top-24 relative overflow-hidden rounded-xl border border-white/[0.06] p-5">
                <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2 text-xs text-text-muted">
                  <Code2 size={14} />
                  <span>about.tsx</span>
                </div>
                <pre className="overflow-x-auto text-xs leading-relaxed text-text-secondary">
                  <code>{`const hardik = {
  role: "Aspiring Developer",
  location: "Mumbai, India",
  education: "SYJC — PCMB",
  languages: ["HTML", "JavaScript", "Python"],
  tools: ["VS Code", "Framer", "Git"],
  started: "2025",
  motive: "Sheer curiosity",
  dream: "Build every
    3 AM thought",
  goal: "Study CSE"
};`}</code>
                </pre>
              </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
