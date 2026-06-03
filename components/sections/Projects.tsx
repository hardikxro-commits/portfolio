"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { featuredProjects } from "@/content/data/projects";
import { GitFork, ExternalLink, ArrowRight } from "lucide-react";

export function Projects() {
  const featured = featuredProjects.filter((p) => p.featured);
  const others = featuredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I&apos;ve built — from idea to deployment"
          badge="Work"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <GlowCard
                as="a"
                href={`/projects/${project.slug}`}
                className="flex flex-col h-full"
              >
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-bg-tertiary">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted transition-colors hover:text-text-primary"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="GitHub repository"
                      >
                        <GitFork size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted transition-colors hover:text-text-primary"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Live demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <span className="ml-auto flex items-center gap-1 text-xs text-accent-primary">
                      Case study <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.06}>
                <GlowCard className="flex flex-col h-full">
                  <h3 className="font-display text-base font-semibold text-text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted transition-colors hover:text-text-primary"
                        aria-label="GitHub repository"
                      >
                        <GitFork size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted transition-colors hover:text-text-primary"
                        aria-label="Live demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <a
              href="https://github.com/hardikxro-commits"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-colors hover:text-accent-hover"
            >
              View all on GitHub
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
