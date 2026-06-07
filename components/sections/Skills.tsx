"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills, type Skill } from "@/content/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import {
  Leaf,
  Cloud,
  Star,
  TreePine,
  Wind,
  Sparkles,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Leaf size={16} />,
  Backend: <Cloud size={16} />,
  "AI/ML": <Star size={16} />,
  Databases: <TreePine size={16} />,
  DevOps: <Wind size={16} />,
  Tools: <Sparkles size={16} />,
};

const categories = ["Frontend", "Backend", "AI/ML", "Databases", "DevOps", "Tools"] as const;

export function Skills() {
  const [activeTab, setActiveTab] = useState<string>("Frontend");
  const prefersReduced = useReducedMotion();

  const filteredSkills = skills.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div>
        <SectionHeading
          title="Skills & Tools"
          subtitle="Languages, tools, and frameworks I use"
          badge="Tech Stack"
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                activeTab === cat
                  ? "bg-accent-primary text-white shadow-lg"
                  : "bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/80",
              )}
            >
              {categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </div>

        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={prefersReduced ? {} : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="grid gap-4"
            >
              {filteredSkills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} prefersReduced={prefersReduced} />
              ))}
            </m.div>
          </AnimatePresence>
        </LazyMotion>
      </div>
    </section>
  );
}

function SkillBar({
  skill,
  index,
  prefersReduced,
}: {
  skill: Skill;
  index: number;
  prefersReduced: boolean;
}) {
  const isZero = skill.proficiency === 0;

  if (isZero) {
    return (
      <ScrollReveal delay={index * 0.05}>
        <div className="group relative overflow-hidden rounded-lg border border-border-subtle bg-bg-secondary px-5 py-3.5 transition-colors hover:border-border-default">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                <span className="rounded-full border border-dashed border-text-muted/30 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-text-muted">
                  Yet to learn
                </span>
              </div>
              <span className="font-mono text-xs text-text-muted">{skill.proficiency}%</span>
            </div>
            <div className="flex items-center h-3">
              <m.div
                className="h-2 w-2 rounded-full bg-red-500"
                initial={prefersReduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: prefersReduced ? 0 : index * 0.05 }}
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="group relative overflow-hidden rounded-lg border border-border-subtle bg-bg-secondary px-5 py-3.5 transition-colors hover:border-border-default">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">{skill.name}</span>
            <span className="font-mono text-xs text-text-muted">{skill.proficiency}%</span>
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-bg-tertiary/50">
            <m.div
              className="h-full rounded-full bg-accent-primary"
              initial={prefersReduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: prefersReduced ? 0 : index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "left", width: `${skill.proficiency}%` }}
            />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
