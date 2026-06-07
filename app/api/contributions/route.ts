import { NextResponse } from "next/server";

const GITHUB_USERNAME = "hardikxro-commits";

export const revalidate = 43200;

export async function GET() {
  try {
    const res = await fetch(
      `https://github.com/users/${GITHUB_USERNAME}/contributions`,
      {
        headers: { "User-Agent": "hardiknishad-portfolio" },
        next: { revalidate: 43200 },
      },
    );

    if (!res.ok) throw new Error(`GitHub returned ${res.status}`);

    const html = await res.text();

    const dayRegex = /<rect[^>]*data-date="([^"]*)"[^>]*data-level="([^"]*)"[^>]*data-count="([^"]*)"[^>]*\/?>/g;
    const days: { date: string; count: number; level: number }[] = [];
    let match: RegExpExecArray | null;

    while ((match = dayRegex.exec(html)) !== null) {
      days.push({
        date: match[1],
        level: parseInt(match[2], 10),
        count: parseInt(match[3], 10),
      });
    }

    if (days.length === 0) throw new Error("No contribution data found");

    return NextResponse.json(days, {
      headers: {
        "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Contributions data unavailable" },
      { status: 503 },
    );
  }
}
