"use client";

import { useEffect, useState } from "react";
import { Activity, Users, MousePointer2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  clicks: number;
  avgSession: string;
}

export function AnalyticsDashboard({ className }: { className?: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-analytics");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData(null);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className={cn("grid grid-cols-2 gap-4 sm:grid-cols-4", className)}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-bg-tertiary" />
        ))}
      </div>
    );
  }

  const stats: { label: string; value: string | number; icon: typeof Activity }[] = data
    ? [
        { label: "Page Views", value: data.pageViews.toLocaleString(), icon: Activity },
        { label: "Visitors", value: data.uniqueVisitors.toLocaleString(), icon: Users },
        { label: "Interactions", value: data.clicks.toLocaleString(), icon: MousePointer2 },
        { label: "Avg. Session", value: data.avgSession, icon: Clock },
      ]
    : [
        { label: "Page Views", value: "—", icon: Activity },
        { label: "Visitors", value: "—", icon: Users },
        { label: "Interactions", value: "—", icon: MousePointer2 },
        { label: "Avg. Session", value: "—", icon: Clock },
      ];

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border-subtle bg-bg-secondary p-3"
        >
          <stat.icon size={14} className="mb-1 text-text-muted" />
          <p className="font-mono text-lg font-bold text-text-primary">{stat.value}</p>
          <p className="text-[10px] uppercase tracking-wider text-text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
