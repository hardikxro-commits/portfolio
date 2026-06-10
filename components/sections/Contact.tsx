"use client";

import { motion } from "framer-motion";
import { Mail, GitFork, MapPin, Send } from "lucide-react";
import Link from "next/link";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "hardikxro@gmail.com",
    href: "mailto:hardikxro@gmail.com",
  },
  {
    icon: GitFork,
    label: "GitHub",
    value: "@hardikxro-commits",
    href: "https://github.com/hardikxro-commits",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mumbai, India",
    href: null,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent-primary">
            05 &mdash; CONTACT
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-text-primary"
        >
          Get in <span className="gold-gradient-text">touch</span>
        </motion.h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-sans text-[15px] leading-relaxed text-text-secondary">
              Have a project in mind or just want to say hello? I&apos;m always 
              open to interesting conversations and new opportunities.
            </p>

            <div className="space-y-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                const content = (
                  <div className="flex items-center gap-4 rounded-xl border border-accent-border/10 bg-accent-subtle/5 p-4 transition-all duration-300 hover:border-accent-border/30">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent-border/20 bg-accent-subtle/10">
                      <Icon className="h-5 w-5 text-accent-primary" />
                    </div>
                    <div>
                      <div className="font-sans text-xs text-text-muted">
                        {link.label}
                      </div>
                      <div className="font-sans text-sm text-text-primary">
                        {link.value}
                      </div>
                    </div>
                  </div>
                );

                return link.href ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={link.label}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="rounded-xl border border-accent-border/10 bg-accent-subtle/5 p-8"
          >
            <h3 className="font-display text-xl text-text-primary mb-6">
              Send a message
            </h3>
            <form
              action={`mailto:hardikxro@gmail.com`}
              method="GET"
              encType="text/plain"
              className="space-y-5"
            >
              <div>
                <label className="block font-sans text-xs text-text-muted mb-2 tracking-wider uppercase">
                  Your Email
                </label>
                <input
                  type="email"
                  name="body"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-accent-border/15 bg-accent-subtle/5 px-4 py-3 font-sans text-sm text-text-primary placeholder-text-muted/50 outline-none transition-all duration-300 focus:border-accent-primary/50 focus:bg-accent-subtle/10"
                />
              </div>
              <div>
                <label className="block font-sans text-xs text-text-muted mb-2 tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  name="body"
                  rows={4}
                  placeholder="Your message..."
                  className="w-full resize-none rounded-lg border border-accent-border/15 bg-accent-subtle/5 px-4 py-3 font-sans text-sm text-text-primary placeholder-text-muted/50 outline-none transition-all duration-300 focus:border-accent-primary/50 focus:bg-accent-subtle/10"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-primary px-6 py-3 font-sans text-sm font-semibold text-[#080706] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(196,163,90,0.3)]"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
