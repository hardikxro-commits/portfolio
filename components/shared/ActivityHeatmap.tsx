"use client";

import { useEffect, useState } from "react";

const COLS = 52;
const ROWS = 7;

const LEVEL_COLORS = [
  "transparent",
  "rgba(255,255,255,0.04)",
  "rgba(255,255,255,0.12)",
  "rgba(255,255,255,0.25)",
  "rgba(255,255,255,0.45)",
];

interface DayData {
  date: string;
  count: number;
  level: number;
}

export function ActivityHeatmap() {
  const [days, setDays] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contributions")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setDays(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-5">
        <div className="flex gap-[2px] opacity-30">
          {Array.from({ length: 52 }).map((_, ci) => (
            <div key={ci} className="flex flex-col gap-[2px]">
              {Array.from({ length: 7 }).map((_, ri) => (
                <div
                  key={ri}
                  className="h-[4px] w-[4px] rounded-[1px]"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (days.length === 0) return null;

  const grid: number[][] = [];
  let dayIndex = 0;
  for (let c = 0; c < COLS; c++) {
    const col: number[] = [];
    for (let r = 0; r < ROWS; r++) {
      const day = days[dayIndex];
      col.push(day ? day.level : 0);
      dayIndex++;
    }
    grid.push(col);
  }

  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="mt-5">
      <div className="flex gap-[2px]">
        {grid.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[2px]">
            {col.map((level, ri) => (
              <div
                key={ri}
                className="h-[4px] w-[4px] rounded-[1px]"
                style={{ backgroundColor: LEVEL_COLORS[level] || LEVEL_COLORS[0] }}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-text-muted tracking-wider uppercase">
        {total} contributions this year
      </p>
    </div>
  );
}
