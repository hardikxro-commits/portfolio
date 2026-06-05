import { Timeline } from "@/components/sections/Timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description: "My journey so far and where I'm heading.",
};

export default function TimelinePage() {
  return <Timeline />;
}
