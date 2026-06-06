import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Testimonials"
          subtitle="What people have said about working with me"
          badge="Social Proof"
        />

        <div className="rounded-xl border border-dashed border-border-subtle p-12 text-center">
          <p className="text-sm text-text-muted">
            No testimonials yet. If we&apos;ve worked together, I&apos;d love to hear from you.
          </p>
        </div>
      </div>
    </section>
  );
}
