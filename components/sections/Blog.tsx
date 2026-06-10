"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    title: "Building with Next.js 16",
    excerpt:
      "Exploring the latest features in Next.js 16 and how they improve the developer experience for modern web applications.",
    date: "Jun 10, 2026",
    readTime: "5 min read",
    slug: "building-with-nextjs-16",
  },
  {
    title: "The Art of Clean Code",
    excerpt:
      "Thoughts on writing maintainable, readable code that stands the test of time and helps teams move faster.",
    date: "May 28, 2026",
    readTime: "4 min read",
    slug: "art-of-clean-code",
  },
  {
    title: "Getting Started with Open Source",
    excerpt:
      "A practical guide for developers who want to start contributing to open source projects but don't know where to begin.",
    date: "May 15, 2026",
    readTime: "6 min read",
    slug: "getting-started-open-source",
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

export function Blog() {
  return (
    <section id="blog" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent-primary">
            04 &mdash; BLOG
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-text-primary"
        >
          Latest <span className="gold-gradient-text">writings</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              variants={cardVariants}
              className="group relative rounded-xl border border-accent-border/10 bg-accent-subtle/5 p-8 transition-all duration-500 hover:border-accent-border/30 hover:bg-accent-subtle/10"
            >
              <div className="mb-4 flex items-center gap-4 font-mono text-[10px] tracking-wider text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>

              <h3 className="font-display text-lg text-text-primary mb-3 transition-colors duration-300 group-hover:text-accent-primary">
                {post.title}
              </h3>

              <p className="mb-6 font-sans text-sm leading-relaxed text-text-muted">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-[11px] font-sans font-medium tracking-wider uppercase text-accent-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                Read More <ArrowRight className="h-3 w-3" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
