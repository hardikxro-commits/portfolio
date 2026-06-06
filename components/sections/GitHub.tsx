"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/Badge";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import type { GitHubStats } from "@/lib/github";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function GitHub() {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-text-muted">GitHub data temporarily unavailable.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="GitHub Dashboard"
          subtitle="My GitHub activity and coding stats"
          badge="Code"
        />

        {data ? <GitHubContent data={data} /> : <GitHubSkeleton />}
      </div>
    </section>
  );
}

function GitHubContent({ data }: { data: GitHubStats }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Commits" value={data.totalCommits} />
        <StatCard label="Pull Requests" value={data.totalPRs} />
        <StatCard label="Issues" value={data.totalIssues} />
        <StatCard label="Day Streak" value={data.currentStreak} suffix="days" />
      </div>

      <div className="rounded-xl border border-border-default bg-bg-secondary p-5">
        <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-text-muted">
          Contributions (Last Year)
        </h3>
        <ContributionGraph days={data.contributions} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border-default bg-bg-secondary p-5">
          <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-text-muted">
            Top Repositories
          </h3>
          <div className="space-y-4">
            {data.topRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-border-subtle p-3.5 transition-colors hover:border-accent-border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 size={14} className="text-text-muted" />
                    <span className="text-sm font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {repo.description && (
                  <p className="mt-1 text-xs text-text-secondary line-clamp-1">
                    {repo.description}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-3 text-xs text-text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-accent-primary" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star size={12} />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} />
                    {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border-default bg-bg-secondary p-5">
          <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-text-muted">
            Languages
          </h3>
          <LanguageDonut languages={data.languages} />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const startCounting = useCallback(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
          observerRef.current?.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [startCounting]);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border-default bg-bg-secondary p-4 text-center"
    >
      <div className="font-display text-2xl font-bold text-text-primary">
        {count.toLocaleString()}
        {suffix ? ` ${suffix}` : "+"}
      </div>
      <div className="mt-1 text-xs text-text-muted">{label}</div>
    </div>
  );
}

function ContributionGraph({ days }: { days: GitHubStats["contributions"] }) {
  const weeks: GitHubStats["contributions"][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const levelColors = [
    "bg-bg-tertiary",
    "bg-green-900/40",
    "bg-green-700/50",
    "bg-green-500/60",
    "bg-green-400/80",
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[2px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[2px]">
            {week.map((day, di) => (
              <div
                key={di}
                className={`h-[10px] w-[10px] rounded-sm ${levelColors[day.level]}`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageDonut({ languages }: { languages: Record<string, number> }) {
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(languages).sort(([, a], [, b]) => b - a);
  const colors = [
    "#F9B2D7",
    "#CFECF3",
    "#DAF9DE",
    "#F6FFDC",
    "#e89ec5",
    "#b5dde5",
    "#c5e8c9",
  ];

  const conicGradient = sorted
    .map(([, count], i) => {
      const pct = (count / total) * 100;
      const start = sorted
        .slice(0, i)
        .reduce((a, [, c]) => a + (c / total) * 100, 0);
      return `${colors[i % colors.length]} ${start}% ${start + pct}%`;
    })
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div
        className="h-32 w-32 shrink-0 rounded-full"
        style={{
          background: `conic-gradient(${conicGradient})`,
        }}
      />
      <div className="flex flex-wrap gap-2">
        {sorted.map(([lang, count], i) => (
          <div key={lang} className="flex items-center gap-1.5 text-xs text-text-muted">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            {lang} ({Math.round((count / total) * 100)}%)
          </div>
        ))}
      </div>
    </div>
  );
}

function GitHubSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-32 rounded-xl" />
      <div className="grid grid-cols-2 gap-6">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    </div>
  );
}
