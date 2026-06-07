"use client";

import { useMemo } from "react";

const COLS = 52;
const ROWS = 7;
const LEVELS = 5;

const LEVEL_COLORS = [
  "bg-bg-primary",
  "rgba(0,0,0,0.04)",
  "rgba(0,0,0,0.12)",
  "rgba(0,0,0,0.25)",
  "rgba(0,0,0,0.45)",
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function ActivityHeatmap() {
  const cells = useMemo(() => {
    const rng = seededRandom(42);
    const grid: number[][] = [];
    for (let c = 0; c < COLS; c++) {
      const col: number[] = [];
      for (let r = 0; r < ROWS; r++) {
        const val = rng();
        if (val > 0.7) col.push(4);
        else if (val > 0.5) col.push(3);
        else if (val > 0.35) col.push(2);
        else if (val > 0.2) col.push(1);
        else col.push(0);
      }
      grid.push(col);
    }
    return grid;
  }, []);

  const total = cells.flat().filter((v) => v > 0).length;

  return (
    <div className="mt-5">
      <div className="flex gap-[2px]">
        {cells.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[2px]">
            {col.map((level, ri) => (
              <div
                key={ri}
                className="h-[4px] w-[4px] rounded-[1px]"
                style={{
                  backgroundColor:
                    level === 0
                      ? "transparent"
                      : LEVEL_COLORS[level] || LEVEL_COLORS[0],
                }}
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
