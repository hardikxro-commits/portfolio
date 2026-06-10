import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/content/data/blog";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

export function Blog() {
  return (
    <section id="blog" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div>
        <SectionHeading
          title="Blog"
          subtitle="Random thoughts and things I&apos;ve learned while building stuff"
          badge="Writing"
        />

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <a
                href={`/blog/${post.slug}`}
                className="group relative block overflow-hidden rounded-xl border border-accent-border/10 bg-bg-secondary/60 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300 has-hover:hover:border-accent-border/30 has-hover:hover:-translate-y-0.5 has-hover:hover:shadow-[0_0_30px_rgba(196,163,90,0.06)]"
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={12} />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-semibold text-text-primary transition-colors group-hover:text-accent-primary">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {post.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="default" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent-primary">
                      Read more <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
