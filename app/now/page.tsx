import { nowData } from "@/content/data/now";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Hardik is currently learning, building, and focused on.",
};

const timeline = [
  {
    label: "Learning",
    content: (
      <ul className="space-y-2">
        {nowData.currentlyLearning.map((item, i) => (
          <li key={i} className="text-base leading-relaxed text-text-secondary">{item}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Building",
    content: (
      <ul className="space-y-2">
        {nowData.currentProjects.map((p) => (
          <li key={p.name} className="text-base leading-relaxed text-text-secondary">
            <span className="font-semibold text-text-primary">{p.name}</span>
            {" — "}{p.description}
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: "Goals",
    content: (
      <ul className="space-y-2">
        {nowData.currentGoals.map((goal, i) => (
          <li key={i} className="text-base leading-relaxed text-text-secondary">{goal}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Reading",
    content: (
      <ul className="space-y-1.5">
        {nowData.readingList.map((book, i) => (
          <li key={i} className="text-base italic leading-relaxed text-text-muted">&mdash; {book}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Goal",
    content: (
      <p className="font-display text-lg font-bold text-accent-primary">
        &ldquo;{nowData.ultimateGoal}&rdquo;
      </p>
    ),
  },
];

export default function NowPage() {
  return (
    <div className="px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <SectionHeading
          title="Now"
          subtitle="What I'm focused on right now"
          badge="Current"
        />

        <div className="relative mt-12">
          <div className="absolute left-[80px] top-0 h-full w-px bg-border-default" />

          <div className="space-y-10">
            {timeline.map((entry, i) => (
              <div key={i} className="relative flex gap-6">
                <div className="w-[80px] shrink-0 pt-1">
                  <span className="text-sm text-text-muted font-medium tracking-widest uppercase">
                    {entry.label}
                  </span>
                </div>
                <div className="pl-6 flex-1 min-w-0">
                  {entry.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 text-xs text-text-muted">
          Last updated: {nowData.updatedAt}
        </p>
      </div>
    </div>
  );
}
