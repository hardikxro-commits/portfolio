"use client";

import { site } from "@/content/data/site";
import { GitFork, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border-subtle bg-bg-primary">
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:justify-between">
          <div>
            <a
              href="/"
              className="font-display text-lg font-bold tracking-tight text-text-primary"
            >
              HN<span className="text-accent-primary">.</span>
            </a>
            <p className="mt-1 text-sm text-text-muted italic">
              &ldquo;{site.tagline}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-4">
            {site.footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-text-primary"
              aria-label="GitHub"
            >
              <GitFork size={18} />
            </a>

            <a
              href={`mailto:${site.email}`}
              className="text-text-muted transition-colors hover:text-text-primary"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border-subtle pt-6 text-xs text-text-muted">
          &copy; {year} {site.name}.
        </div>
      </div>
    </footer>
  );
}
