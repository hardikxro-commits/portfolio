import { Roadmap } from "@/components/sections/Roadmap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "My structured learning path.",
};

export default function RoadmapPage() {
  return <Roadmap />;
}
