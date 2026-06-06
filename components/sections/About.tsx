"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Code2, ArrowRight } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl">
        <SectionHeading
          title="About Me"
          subtitle="Just a student who started coding and hasn't stopped"
          badge="Story"
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 space-y-6">
            <ScrollReveal>
              <p className="text-lg leading-relaxed text-text-secondary">
                Hey, I&apos;m <span className="font-medium text-text-primary">Hardik Nishad</span>
                — a student from Mumbai, India. I&apos;m in SYJC right now, studying Physics,
                Chemistry, Math, and Biology.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-base leading-relaxed text-text-secondary">
                I started coding in 2025. Not because I had some grand plan — I just
                looked around and saw people my age building cool stuff while I hadn&apos;t
                even started yet. That was enough.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base leading-relaxed text-text-secondary">
                These days I&apos;m not tied to any one thing. I have ideas at 3 AM, random
                app concepts, websites I want to try building. I&apos;m learning how to turn
                those into real things.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="relative border-l-2 border-accent-primary/40 pl-5 text-text-secondary">
                <p className="text-base leading-relaxed">
                  No big mission. No revolution. No five-year plan. I just like making
                  things. That&apos;s really it.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-base leading-relaxed text-text-secondary">
                Down the line I want to study Computer Science and see where this whole
                thing takes me.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <a
                href="/now"
                className="group inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-colors hover:text-accent-hover"
              >
                What I&apos;m working on now
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
  location: "Mumbai, India",
  studying: "SYJC — PCMB",
  learning: ["HTML", "JavaScript", "Python"],
  tools: ["VS Code", "Framer", "Git"],
  startedCoding: "2025",
  why: "Felt left behind, wanted to catch up",
  goal: "Study CS, build random ideas"
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
