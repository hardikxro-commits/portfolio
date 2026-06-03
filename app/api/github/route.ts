import { NextResponse } from "next/server";
import { getGitHubData } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getGitHubData();
    return NextResponse.json(data.stats, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub data unavailable" },
      { status: 503 },
    );
  }
}
