import type { Metadata } from "next";
import { site } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me.",
};

export default function ContactPage() {
  return (
    <div className="px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="max-w-prose">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Get in Touch
        </h1>

        <p className="mt-6 text-base leading-relaxed text-text-secondary">
          I reply to everything, usually within a day or two. No pitch decks, no
          cold outreach templates — just say what&apos;s on your mind.
        </p>

        <div className="mt-8">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-border-default px-6 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:border-accent-primary hover:bg-accent-primary/10 hover:text-accent-primary"
          >
            {site.email} →
          </a>
        </div>
      </div>
    </div>
  );
}
