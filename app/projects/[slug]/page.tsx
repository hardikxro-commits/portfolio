import { notFound } from "next/navigation";
import { ArrowLeft, GitFork, ExternalLink, Download, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { featuredProjects } from "@/content/data/projects";
import { ScreenshotCarousel } from "@/components/shared/ScreenshotCarousel";
import type { Metadata } from "next";

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <article className="px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="max-w-5xl">
        <Link
          href="/#projects"
          className="group mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back to projects
        </Link>

        <div className={`${hasScreenshots ? "md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] md:gap-8 md:items-start" : ""}`}>
          <div className={`${hasScreenshots ? "md:min-w-0" : ""}`}>
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-xl leading-relaxed text-text-secondary">
                {project.longDescription || project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-accent-subtle px-3 py-1 text-xs font-medium text-accent-primary"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {project.githubUrl && (
                  <Button href={project.githubUrl} variant="outline">
                    <GitFork size={14} />
                    Source Code
                  </Button>
                )}
                {project.liveUrl && (
                  <Button href={project.liveUrl} variant="primary">
                    <ExternalLink size={14} />
                    Live Demo
                  </Button>
                )}
                {project.downloadUrl && (
                  <Button href={project.downloadUrl} variant="primary">
                    <Download size={14} />
                    Download APK
                  </Button>
                )}
              </div>

              <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-bg-tertiary max-w-sm">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            </div>

            {project.challenges && project.challenges.length > 0 && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-text-primary mb-4">
                  Challenges
                </h2>
                <ul className="space-y-3">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex gap-3 text-base text-text-secondary">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-[10px] font-medium text-accent-primary">
                        {i + 1}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-4">
                  What I Learned
                </h2>
                <ul className="space-y-3">
                  {project.learnings.map((l, i) => (
                    <li key={i} className="flex gap-3 text-base text-text-secondary">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-[10px] font-medium text-green-400">
                        &#10003;
                      </span>
                      {l}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {hasScreenshots && (
            <div className="hidden md:block md:sticky md:top-24 md:self-start md:min-w-0 md:overflow-hidden md:max-w-full">
              <ScreenshotCarousel screenshots={project.screenshots!} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
