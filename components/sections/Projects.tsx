"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Portfolio Platform",
    description:
      "A modern portfolio website built with Next.js, featuring a luxurious dark theme with gold accents, animated star field, and responsive design.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/hardikxro-commits",
    live: "https://hardiknishad.dev",
  },
  {
    title: "Open Source Contributions",
    description:
      "Active contributor to various open source projects. Focused on improving documentation, fixing bugs, and adding features to community tools.",
    tags: ["Open Source", "Git", "Collaboration"],
    github: "https://github.com/hardikxro-commits",
  },
  {
    title: "Web Application",
    description:
      "Full-stack web application demonstrating modern development practices with clean architecture and thoughtful user experience design.",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    github: "https://github.com/hardikxro-commits",
  },
  {
    title: "API Service",
    description:
      "RESTful API service built with performance and scalability in mind, featuring comprehensive documentation and error handling.",
    tags: ["Python", "FastAPI", "Redis", "Docker"],
    github: "https://github.com/hardikxro-commits",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent-primary">
            03 &mdash; PROJECTS
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-text-primary"
        >
          Selected <span className="gold-gradient-text">works</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group relative rounded-xl border border-accent-border/10 bg-accent-subtle/5 p-8 transition-all duration-500 hover:border-accent-border/30 hover:bg-accent-subtle/10"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-xl text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-accent-border/20 text-text-muted transition-all duration-300 hover:border-accent-primary hover:text-accent-primary"
                  >
                    <GitFork className="h-4 w-4" />
                  </Link>
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-accent-border/20 text-text-muted transition-all duration-300 hover:border-accent-primary hover:text-accent-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
              <p className="mb-6 font-sans text-sm leading-relaxed text-text-muted">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent-border/10 bg-accent-subtle/5 px-2.5 py-0.5 font-mono text-[10px] text-text-muted"
                  >
                    {tag}
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
