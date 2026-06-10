"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Terminal,
  Globe,
  Box,
} from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Python", "REST APIs", "GraphQL"],
  },
  {
    icon: Database,
    title: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    icon: Terminal,
    title: "DevOps",
    skills: ["Docker", "Git", "Cloudflare", "Linux"],
  },
  {
    icon: Globe,
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    icon: Box,
    title: "Tools",
    skills: ["VS Code", "Figma", "Postman", "Linear"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent-primary">
            02 &mdash; SKILLS
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-text-primary"
        >
          Technologies I{" "}
          <span className="gold-gradient-text">work with</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="group rounded-xl border border-accent-border/10 bg-accent-subtle/5 p-6 transition-all duration-500 hover:border-accent-border/30 hover:bg-accent-subtle/10"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-accent-border/20 bg-accent-subtle/10">
                <category.icon className="h-5 w-5 text-accent-primary" />
              </div>
              <h3 className="font-display text-lg text-text-primary mb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-accent-border/15 bg-accent-subtle/5 px-3 py-1 font-mono text-[11px] text-text-muted transition-colors duration-300 group-hover:border-accent-border/30 group-hover:text-accent-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
