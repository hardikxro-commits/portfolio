"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { featuredProjects } from "@/content/data/projects";
import { GitFork, ExternalLink, Download, ArrowRight, CalendarDays } from "lucide-react";

export function Projects() {
  const featured = featuredProjects.filter((p) => p.featured);
  const others = featuredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div>
        <SectionHeading
          title="Projects"
          subtitle="Stuff I&apos;ve built, from idea to shipping"
          badge="Work"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {featured.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <GlowCard
                as="a"
                href={`/projects/${project.slug}`}
                className="flex flex-col h-full group"
              >
                <div className="relative mb-5 aspect-video overflow-hidden rounded-lg bg-bg-tertiary">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-1 flex flex-col px-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg font-semibold text-text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-text-muted ml-auto">
                      <CalendarDays size={11} />
                      {project.date}
                    </span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="default" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                    <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View case study <ArrowRight size={12} />
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border-subtle flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitFork size={13} />
                        Source
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={13} />
                        Live
                      </a>
                    )}
                    {project.downloadUrl && (
                      <a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download size={13} />
                        APK
                      </a>
                    )}
                    <span className="sm:hidden ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent-primary">
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
                <GlowCard className="flex flex-col h-full group">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {project.title}
                    </h3>
                    <span className="text-[10px] text-text-muted ml-auto">{project.date}</span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="default" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-3">
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
           <div className="mt-12">
            <a
              href="https://github.com/hardikxro-commits"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
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
