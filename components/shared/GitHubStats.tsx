"use client";

import { useEffect, useState } from "react";
import { GitFork, Star, GitCommit, GitPullRequest } from "lucide-react";
import { cn } from "@/lib/utils";

interface GitHubStatsData {
  repos: number;
  stars: number;
  commits: number;
  contributions: number;
}

export function GitHubStats({ className }: { className?: string }) {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contributions")
      .then((r) => r.json())
      .then((data) => {
        setStats({
          repos: data.totalRepos ?? 12,
          stars: data.totalStars ?? 0,
          commits: data.totalCommits ?? 0,
          contributions: data.totalContributions ?? 0,
        });
      })
      .catch(() => {
        setStats({ repos: 12, stars: 0, commits: 0, contributions: 0 });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <div className={cn("flex gap-6", className)}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 w-20 animate-pulse rounded-lg bg-bg-tertiary" />
        ))}
      </div>
    );
  }

  const items = [
    { label: "Repos", value: stats.repos, icon: GitFork },
    { label: "Stars", value: stats.stars, icon: Star },
    { label: "Commits", value: stats.commits, icon: GitCommit },
    { label: "Contributions", value: stats.contributions, icon: GitPullRequest },
  ];

  return (
    <div className={cn("flex flex-wrap gap-4 sm:gap-6", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <item.icon size={14} className="text-text-muted" />
          <div>
            <span className="font-mono text-sm font-bold text-text-primary">
              {item.value}
            </span>
            <span className="ml-1.5 text-[10px] uppercase tracking-wider text-text-muted">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
