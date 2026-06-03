"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Code2, ArrowRight } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-section)" }}
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="About Me"
          subtitle="A beginner who loves to build and learn out loud"
          align="left"
          badge="Story"
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 space-y-6">
            <ScrollReveal>
              <p className="text-lg leading-relaxed text-text-secondary">
                Hey! I&apos;m <span className="font-medium text-text-primary">Hardik Nishad</span>, 
                a student developer from India who&apos;s taking the first steps into the world 
                of code. I&apos;m driven by curiosity and the thrill of building something 
                from nothing.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-base leading-relaxed text-text-secondary">
                My journey began in June 2025 when I wrote my first HTML tag. Since then, 
                I&apos;ve picked up JavaScript, started exploring Python, and learned to 
                prototype with Framer. I also built my first real project — JobDesDecode, 
                a web tool that decodes job descriptions for job seekers.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base leading-relaxed text-text-secondary">
                I believe the best way to learn is by building. Every project teaches me 
                something new — about code, design, and problem-solving. I&apos;m not an expert, 
                and I don&apos;t pretend to be. I&apos;m just someone who&apos;s genuinely excited 
                about the journey and committed to getting better every day.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="relative border-l-2 border-accent-primary/40 pl-5 italic text-text-secondary">
                <p className="text-base leading-relaxed">
                  &ldquo;The best time to start was yesterday. The next best time is now. 
                  I&apos;m here to learn, build, and grow — one commit at a time.&rdquo;
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
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
                <div className="pointer-events-none absolute inset-0 rounded-xl liquid-glass-card" />
                <div className="pointer-events-none absolute inset-0 rounded-xl liquid-glass-overlay" />
                <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2 text-xs text-text-muted">
                  <Code2 size={14} />
                  <span>about.tsx</span>
                </div>
                <pre className="overflow-x-auto text-xs leading-relaxed text-text-secondary">
                  <code>{`const hardik = {
  role: "Student Developer",
  languages: ["HTML", "JavaScript", "Python"],
  tools: ["VS Code", "Framer", "Git"],
  learning: [
    "CSS",
    "React",
    "Node.js"
  ],
  values: [
    "Curiosity over ego",
    "Build > talk",
    "Growth mindset"
  ],
  goal: "Build products
    that matter"
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
