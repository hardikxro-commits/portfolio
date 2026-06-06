"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/data/site";
import { Mail, GitFork, Send, CheckCircle2, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, access_key: "f8c9b1cb-198e-4fe0-9173-cb262bc266cc" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl">
        <SectionHeading
          title="Get in Touch"
          subtitle="I&apos;m looking for internships and cool projects to work on"
          badge="Contact"
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ScrollReveal>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      {...register("name")}
                      className="w-full rounded-lg border border-border-default bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent-border focus:ring-1 focus:ring-accent-primary/30"
                      placeholder="Your name"
                      inputMode="text"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="w-full rounded-lg border border-border-default bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent-border focus:ring-1 focus:ring-accent-primary/30"
                      placeholder="you@example.com"
                      inputMode="email"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-1.5">
                    Subject
                  </label>
                    <input
                      id="subject"
                      {...register("subject")}
                      className="w-full rounded-lg border border-border-default bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent-border focus:ring-1 focus:ring-accent-primary/30"
                      placeholder="What's this about?"
                      inputMode="text"
                    />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1.5">
                    Message
                  </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      className="w-full resize-none sm:resize-y rounded-lg border border-border-default bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent-border focus:ring-1 focus:ring-accent-primary/30"
                      placeholder="Tell me about your project, idea, or opportunity..."
                    />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </Button>

                {status === "success" && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
                    <CheckCircle2 size={16} />
                    Message sent! I&apos;ll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                    <AlertCircle size={16} />
                    Something went wrong. Please try emailing me directly.
                  </div>
                )}
              </form>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-bg-secondary p-5">
                  <div className="relative z-10">
                  <h3 className="text-sm font-medium text-text-primary">Let&apos;s collaborate</h3>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    Got a project idea, an internship opening, or just want to say hi? 
                    I&apos;d love to hear from you.
                  </p>
                  </div>
                  </div>

                <div className="space-y-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-white/[0.06] bg-bg-secondary p-3.5 text-sm text-text-secondary transition-colors hover:border-white/[0.12] hover:text-text-primary"
                  >
                    <Mail size={16} className="text-accent-primary" />
                    <span className="relative z-10">{site.email}</span>
                  </a>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-white/[0.06] bg-bg-secondary p-3.5 text-sm text-text-secondary transition-colors hover:border-white/[0.12] hover:text-text-primary"
                  >
                    <GitFork size={16} className="text-accent-primary" />
                    <span>GitHub</span>
                  </a>

                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
