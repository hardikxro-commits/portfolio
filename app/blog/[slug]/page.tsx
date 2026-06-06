import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/content/data/blog";
import { ScreenshotCarousel } from "@/components/shared/ScreenshotCarousel";
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
      <div className="max-w-5xl">
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

        {slug === "building-nothing-vault" ? (
          <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-12">
            <header className="mb-8">
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

            <div className="md:flex md:items-center md:justify-end mb-8">
              <ScreenshotCarousel
                screenshots={[
                  { src: "/nothing-vault/01-folder-name.jpeg", label: "Creating a folder \u2014 enter a name" },
                  { src: "/nothing-vault/02-folder-pin.jpeg", label: "Setting a PIN for the folder" },
                  { src: "/nothing-vault/03-folder-created.jpeg", label: "Option to create another folder" },
                  { src: "/nothing-vault/04-lock-screen.jpeg", label: "Lock screen \u2014 enter your PIN" },
                  { src: "/nothing-vault/05-vault-gallery.jpeg", label: "Vault gallery with no photos yet" },
                  { src: "/nothing-vault/06-import-screen.jpeg", label: "Import photos or videos" },
                  { src: "/nothing-vault/07-gallery-with-photos.jpeg", label: "Gallery with imported photos" },
                  { src: "/nothing-vault/08-photo-viewer.jpeg", label: "Full-screen photo preview" },
                ]}
              />
            </div>
          </div>
        ) : (
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
        )}

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
