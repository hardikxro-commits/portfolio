import { nowData } from "@/content/data/now";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Target, Code2, Bookmark, Crown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Hardik is currently learning, building, and focused on.",
};

export default function NowPage() {
  return (
    <div className="px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Now"
          subtitle="What I'm focused on right now"
          badge="Current"
          align="left"
        />

        <div className="space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle text-accent-primary">
                <BookOpen size={16} />
              </div>
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Currently Learning
              </h2>
            </div>
            <ul className="space-y-3">
              {nowData.currentlyLearning.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-secondary">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-[10px] font-medium text-accent-primary">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Code2 size={16} />
              </div>
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Current Projects
              </h2>
            </div>
            <div className="space-y-4">
              {nowData.currentProjects.map((project) => (
                <div
                  key={project.name}
                  className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-bg-secondary p-4"
                >
                  <div className="relative z-10"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-text-primary">
                      {project.name}
                    </h3>
                    <Badge
                      variant={
                        project.status === "Building MVP" ? "accent" : "default"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    {project.description}
                  </p>
                  </div>
                </div>
                ))}
              </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                <Target size={16} />
              </div>
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Current Goals
              </h2>
            </div>
            <ul className="space-y-3">
              {nowData.currentGoals.map((goal, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-secondary">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-[10px] font-medium text-green-400">
                    &#10003;
                  </span>
                  {goal}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Bookmark size={16} />
              </div>
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Reading List
              </h2>
            </div>
            <ul className="space-y-2">
              {nowData.readingList.map((book, i) => (
                <li key={i} className="text-sm italic text-text-muted">
                  &mdash; {book}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Crown size={16} />
              </div>
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Ultimate Goal
              </h2>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-bg-secondary p-6 text-center">
              <div className="relative z-10">
                <p className="font-display text-xl font-bold text-amber-400">
                  &ldquo;{nowData.ultimateGoal}&rdquo;
                </p>
              </div>
            </div>
          </section>
        </div>

        <p className="mt-12 text-xs text-text-muted">
          Last updated: {nowData.updatedAt}
        </p>
      </div>
    </div>
  );
}
