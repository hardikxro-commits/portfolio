"use client";

import { motion } from "framer-motion";
import { Code2, Layers, GitFork } from "lucide-react";

const stats = [
  { icon: Code2, value: "3+", label: "Years Coding" },
  { icon: Layers, value: "50+", label: "Projects" },
  { icon: GitFork, value: "100%", label: "Open Source" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp} className="mb-4">
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent-primary">
            01 &mdash; ABOUT
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-text-primary"
        >
          Crafting code with
          <br />
          <span className="gold-gradient-text">purpose & precision</span>
        </motion.h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-sans text-[15px] leading-[1.9] text-text-secondary">
              Hey, I&apos;m Hardik. I write code, build things, and try to get a little better 
              every day. My journey into development started with curiosity and has grown into 
              a full-fledged passion for creating meaningful digital experiences.
            </p>
            <p className="font-sans text-[15px] leading-[1.9] text-text-muted">
              Based in Mumbai, India, I focus on full-stack development with a love for clean 
              architecture, thoughtful design, and performant applications. I believe the best 
              code is the code that serves people well.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-gradient-to-r from-accent-primary to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.15em] text-text-muted">
                STUDENT &middot; DEVELOPER &middot; MUMBAI
              </span>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + i * 0.1,
                }}
                className="group flex items-center gap-6 rounded-xl border border-accent-border/10 bg-accent-subtle/5 p-6 transition-all duration-300 hover:border-accent-border/30 hover:bg-accent-subtle/10"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-accent-border/20 bg-accent-subtle/10">
                  <stat.icon className="h-6 w-6 text-accent-primary" />
                </div>
                <div>
                  <div className="font-display text-3xl tracking-tight text-text-primary">
                    {stat.value}
                  </div>
                  <div className="font-sans text-sm text-text-muted">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
