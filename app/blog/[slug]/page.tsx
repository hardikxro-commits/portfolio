import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/content/data/blog";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="group mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to blog
        </Link>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-accent-subtle px-3 py-1 text-xs font-medium text-accent-primary"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="prose prose-invert max-w-none leading-relaxed text-text-secondary"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {post.content}
        </div>
      </div>
    </article>
  );
}
