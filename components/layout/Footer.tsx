"use client";

import { site } from "@/content/data/site";
import { GitFork, Mail, Globe, User } from "lucide-react";
import { Tooltip } from "@/components/shared/Tooltip";

const socialLinks = [
  {
    href: site.github,
    icon: GitFork,
    label: "GitHub",
    color: "hover:text-[#f0f0f0]",
  },
  {
    href: `https://x.com/hardiknishad`,
    icon: Globe,
    label: "Twitter / X",
    color: "hover:text-[#E7E9EA]",
  },
  {
    href: `https://linkedin.com/in/${site.name.toLowerCase().replace(" ", "")}`,
    icon: User,
    label: "LinkedIn",
    color: "hover:text-[#0A66C2]",
  },
  {
    href: `mailto:${site.email}`,
    icon: Mail,
    label: "Email",
    color: "hover:text-[#EA4335]",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-accent-border/10 bg-bg-primary">
      {/* Gold accent top line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 md:flex-row md:justify-between">
          <div>
            <a
              href="/"
              className="font-display text-xl font-bold tracking-tight text-text-primary"
            >
              <span className="italic font-medium">H</span>
              <span className="gold-gradient-text">N</span>
            </a>
            <p className="mt-2 text-sm text-text-secondary/60 italic max-w-xs leading-relaxed">
              &ldquo;{site.tagline}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-6">
            {site.footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <Tooltip key={link.href} content={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-text-muted transition-all duration-200 ${link.color} hover:text-accent-primary hover:-translate-y-0.5`}
                  aria-label={link.label}
                >
                  <link.icon size={16} />
                </a>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-accent-border/10 pt-6 flex items-center justify-between">
          <p className="text-xs text-text-muted/60">
            &copy; {year} {site.name}.
          </p>
          <p className="text-[10px] text-text-muted/40 font-mono">
            crafted with care
          </p>
        </div>
      </div>
    </footer>
  );
}
