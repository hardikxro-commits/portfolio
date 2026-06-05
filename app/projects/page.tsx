import { Projects } from "@/components/sections/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built — from idea to deployment.",
};

export default function ProjectsPage() {
  return <Projects />;
}
